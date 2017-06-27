// angular-formly version 6.4.0-beta.3 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

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
	ngModule.constant("formlyVersion", ("6.4.0-beta.3")); // <-- webpack variable
	
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
	  form: apiCheck.object.optional
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
	
	module.exports = "https://github.com/formly-js/angular-formly/blob/" + ("6.4.0-beta.3") + "/other/ERRORS_AND_WARNINGS.md#";

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
	        checkFieldGroupApi(scope.options);
	        el.addClass("formly-field-group");
	        setElementTemplate("\n          <formly-form model=\"model\"\n                       fields=\"options.fieldGroup\"\n                       options=\"options.options\"\n                       form=\"options.form\"\n                       class=\"" + scope.options.className + "\"\n                       is-field-group>\n          </formly-form>\n        ");
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
	        angular.forEach($scope.fields, function runFieldExpressionProperties(field) {
	          /*jshint -W030 */
	          var model = field.model || $scope.model;
	          field.runExpressions && field.runExpressions(model);
	          if (field.hideExpression) {
	            var val = model[field.key];
	            field.hide = formlyUtil.formlyEval($scope, field.hideExpression, val, val);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBiZDUxNWFlOWQyNmE2MzQwMzg2OSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seUFwaUNoZWNrLmpzIiwid2VicGFjazovLy8uL290aGVyL2RvY3NCYXNlVXJsLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2Zvcm1seVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvZm9ybWx5V2Fybi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1maWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb2N1cy5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmpzIiwid2VicGFjazovLy8uL3J1bi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvci5qcyIsIndlYnBhY2s6Ly8vLi9ydW4vZm9ybWx5Q3VzdG9tVGFncy5qcyIsIndlYnBhY2s6Ly8vLi9hbmd1bGFyLWZpeC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiYXBpQ2hlY2tcIixcImFtZFwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qczJcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanNcIjpcImFwaS1jaGVja1wifSIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vb3RoZXIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7O0tDdENPLEtBQUssdUNBQU0sQ0FBZ0I7O2tCQUNuQixLQUFLLEM7Ozs7Ozs7Ozs7S0NEYixPQUFPLHVDQUFNLEVBQWE7O0tBRTFCLGNBQWMsdUNBQU0sQ0FBNEI7O0tBQ2hELCtCQUErQix1Q0FBTSxDQUFxQjs7S0FDMUQsZUFBZSx1Q0FBTSxDQUE2Qjs7S0FDbEQsWUFBWSx1Q0FBTSxDQUEwQjs7S0FDNUMsd0JBQXdCLHVDQUFNLENBQXNDOztLQUNwRSxVQUFVLHVDQUFNLENBQXVCOztLQUN2QyxVQUFVLHVDQUFNLENBQXVCOztLQUV2QyxzQkFBc0IsdUNBQU0sQ0FBdUM7O0tBQ25FLFdBQVcsdUNBQU0sRUFBMkI7O0tBQzVDLFdBQVcsdUNBQU0sRUFBMkI7O0tBQzVDLFVBQVUsdUNBQU0sRUFBMEI7O0tBRTFDLDZCQUE2Qix1Q0FBTSxFQUFxQzs7S0FDeEUsZ0JBQWdCLHVDQUFNLEVBQXdCOztBQUVyRCxLQUFNLFlBQVksR0FBRyxRQUFRLENBQUM7O2tCQUVmLFlBQVk7O0FBRTNCLEtBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVsRCxTQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO0FBQ3BELFNBQVEsQ0FBQyxRQUFRLENBQUMs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QU8sU0FBUyxnQkFBZ0IsR0FBRztBQUNqQyxTQUFJLElBQUksR0FBRyxTQUFTLENBQUM7QUFDckIsUUFBRyxDQUFDLE9BQU8sQ0FBQyxZQUFFO2NBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDO01BQUEsQ0FBQyxDQUFDO0lBQ3pDLENBQUMiLCJmaWxlIjoiZm9ybWx5LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYXBpLWNoZWNrXCIpLCByZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhcGktY2hlY2tcIiwgXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5nRm9ybWx5XCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYXBpLWNoZWNrXCIpLCByZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibmdGb3JtbHlcIl0gPSBmYWN0b3J5KHJvb3RbXCJhcGlDaGVja1wiXSwgcm9vdFtcImFuZ3VsYXJcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8xNl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE3X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGJkNTE1YWU5ZDI2YTYzNDAzODY5XG4gKiovIiwiaW1wb3J0IGluZGV4IGZyb20gJy4vaW5kZXguY29tbW9uJztcbmV4cG9ydCBkZWZhdWx0IGluZGV4O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanNcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5cbmltcG9ydCBmb3JtbHlBcGlDaGVjayBmcm9tICcuL3Byb3ZpZGVycy9mb3JtbHlBcGlDaGVjayc7XG5pbXBvcnQgZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCBmcm9tICcuL290aGVyL2RvY3NCYXNlVXJsJztcbmltcG9ydCBmb3JtbHlVc2FiaWxpdHkgZnJvbSAnLi9wcm92aWRlcnMvZm9ybWx5VXNhYmlsaXR5JztcbmltcG9ydCBmb3JtbHlDb25maWcgZnJvbSAnLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnJztcbmltcG9ydCBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMgZnJvbSAnLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzJztcbmltcG9ydCBmb3JtbHlVdGlsIGZyb20gJy4vc2VydmljZXMvZm9ybWx5VXRpbCc7XG5pbXBvcnQgZm9ybWx5V2FybiBmcm9tICcuL3NlcnZpY2VzL2Zvcm1seVdhcm4nO1xuXG5pbXBvcnQgZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbiBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uJztcbmltcG9ydCBmb3JtbHlGaWVsZCBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybWx5LWZpZWxkJztcbmltcG9ydCBmb3JtbHlGb2N1cyBmcm9tICcuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvY3VzJztcbmltcG9ydCBmb3JtbHlGb3JtIGZyb20gJy4vZGlyZWN0aXZlcy9mb3JtbHktZm9ybSc7XG5cbmltcG9ydCBmb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvciBmcm9tICcuL3J1bi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcic7XG5pbXBvcnQgZm9ybWx5Q3VzdG9tVGFncyBmcm9tICcuL3J1bi9mb3JtbHlDdXN0b21UYWdzJztcblxuY29uc3QgbmdNb2R1bGVOYW1lID0gJ2Zvcm1seSc7XG5cbmV4cG9ydCBkZWZhdWx0IG5nTW9kdWxlTmFtZTtcblxuY29uc3QgbmdNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShuZ01vZHVsZU5hbWUsIFtdKTtcblxubmdNb2R1bGUuY29uc3RhbnQoJ2Zvcm1seUFwaUNoZWNrJywgZm9ybWx5QXBpQ2hlY2spO1xubmdNb2R1bGUuY29uc3RhbnQoJ2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXgnLCBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4KTtcbm5nTW9kdWxlLmNvbnN0YW50KCdmb3JtbHlWZXJzaW9uJywgVkVSU0lPTik7IC8vIDwtLSB3ZWJwYWNrIHZhcmlhYmxlXG5cbm5nTW9kdWxlLnByb3ZpZGVyKCdmb3JtbHlVc2FiaWxpdHknLCBmb3JtbHlVc2FiaWxpdHkpO1xubmdNb2R1bGUucHJvdmlkZXIoJ2Zvcm1seUNvbmZpZycsIGZvcm1seUNvbmZpZyk7XG5cbm5nTW9kdWxlLmZhY3RvcnkoJ2Zvcm1seVZhbGlkYXRpb25NZXNzYWdlcycsIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcyk7XG5uZ01vZHVsZS5mYWN0b3J5KCdmb3JtbHlVdGlsJywgZm9ybWx5VXRpbCk7XG5uZ01vZHVsZS5mYWN0b3J5KCdmb3JtbHlXYXJuJywgZm9ybWx5V2Fybik7XG5cbm5nTW9kdWxlLmRpcmVjdGl2ZSgnZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbicsIGZvcm1seUN1c3RvbVZhbGlkYXRpb24pO1xubmdNb2R1bGUuZGlyZWN0aXZlKCdmb3JtbHlGaWVsZCcsIGZvcm1seUZpZWxkKTtcbm5nTW9kdWxlLmRpcmVjdGl2ZSgnZm9ybWx5Rm9jdXMnLCBmb3JtbHlGb2N1cyk7XG5uZ01vZHVsZS5kaXJlY3RpdmUoJ2Zvcm1seUZvcm0nLCBmb3JtbHlGb3JtKTtcblxubmdNb2R1bGUucnVuKGZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKTtcbm5nTW9kdWxlLnJ1bihmb3JtbHlDdXN0b21UYWdzKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2luZGV4LmNvbW1vbi5qc1xuICoqLyIsImltcG9ydCBhcGlDaGVja0ZhY3RvcnkgZnJvbSAnYXBpLWNoZWNrJztcblxubGV0IGFwaUNoZWNrID0gYXBpQ2hlY2tGYWN0b3J5KHtcbiAgb3V0cHV0OiB7XG4gICAgcHJlZml4OiAnYW5ndWxhci1mb3JtbHk6JyxcbiAgICBkb2NzQmFzZVVybDogcmVxdWlyZSgnLi4vb3RoZXIvZG9jc0Jhc2VVcmwnKVxuICB9XG59KTtcblxuZnVuY3Rpb24gc2hhcGVSZXF1aXJlZElmTm90KG90aGVyUHJvcHMsIHByb3BDaGVja2VyKSB7XG4gIGlmICghYW5ndWxhci5pc0FycmF5KG90aGVyUHJvcHMpKSB7XG4gICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgfVxuICBjb25zdCB0eXBlID0gYHNwZWNpZmllZCBpZiB0aGVzZSBhcmUgbm90IHNwZWNpZmllZDogXFxgJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XFxgIChvdGhlcndpc2UgaXQncyBvcHRpb25hbClgO1xuICBmdW5jdGlvbiBzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgdmFyIHByb3BFeGlzdHMgPSBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KHByb3BOYW1lKTtcbiAgICB2YXIgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKGZ1bmN0aW9uIChvdGhlclByb3ApIHtcbiAgICAgIHJldHVybiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCk7XG4gICAgfSk7XG4gICAgaWYgKCFvdGhlclByb3BzRXhpc3QgJiYgIXByb3BFeGlzdHMpIHtcbiAgICAgIHJldHVybiBhcGlDaGVjay51dGlscy5nZXRFcnJvcihwcm9wTmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgIH0gZWxzZSBpZiAocHJvcEV4aXN0cykge1xuICAgICAgcmV0dXJuIHByb3BDaGVja2VyKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICB9XG4gIH1cbiAgc2hhcGVSZXF1aXJlZElmTm90RGVmaW5pdGlvbi50eXBlID0gdHlwZTtcbiAgcmV0dXJuIGFwaUNoZWNrLnV0aWxzLmNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uKTtcbn1cblxubGV0IGZvcm1seUV4cHJlc3Npb24gPSBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suZnVuY10pO1xubGV0IHNwZWNpZnlXcmFwcGVyVHlwZSA9IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gIGFwaUNoZWNrLm9uZU9mKFtudWxsXSksIGFwaUNoZWNrLnR5cGVPckFycmF5T2YoYXBpQ2hlY2suc3RyaW5nKVxuXSk7XG5cbmNvbnN0IGFwaUNoZWNrUHJvcGVydHkgPSBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5mdW5jKTtcblxuY29uc3QgYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5ID0gYXBpQ2hlY2suc2hhcGUub25seUlmKCdhcGlDaGVjaycsIGFwaUNoZWNrLmZ1bmMud2l0aFByb3BlcnRpZXMoe1xuICB3YXJuOiBhcGlDaGVjay5mdW5jLFxuICB0aHJvdzogYXBpQ2hlY2suZnVuYyxcbiAgc2hhcGU6IGFwaUNoZWNrLmZ1bmNcbn0pKTtcblxuY29uc3QgYXBpQ2hlY2tGdW5jdGlvblByb3BlcnR5ID0gYXBpQ2hlY2suc2hhcGUub25seUlmKCdhcGlDaGVjaycsIGFwaUNoZWNrLm9uZU9mKFsndGhyb3cnLCAnd2FybiddKSk7XG5cbmNvbnN0IGZvcm1seVdyYXBwZXJUeXBlID0gYXBpQ2hlY2suc2hhcGUoe1xuICBuYW1lOiBzaGFwZVJlcXVpcmVkSWZOb3QoJ3R5cGVzJywgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgdGVtcGxhdGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZVVybCcsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gIHRlbXBsYXRlVXJsOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgndGVtcGxhdGUnLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICB0eXBlczogYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICBvdmVyd3JpdGVPazogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgdmFsaWRhdGVPcHRpb25zOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICBhcGlDaGVjazogYXBpQ2hlY2tQcm9wZXJ0eS5vcHRpb25hbCxcbiAgYXBpQ2hlY2tJbnN0YW5jZTogYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5Lm9wdGlvbmFsLFxuICBhcGlDaGVja0Z1bmN0aW9uOiBhcGlDaGVja0Z1bmN0aW9uUHJvcGVydHkub3B0aW9uYWwsXG4gIGFwaUNoZWNrT3B0aW9uczogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsXG59KS5zdHJpY3Q7XG5cbmNvbnN0IGV4cHJlc3Npb25Qcm9wZXJ0aWVzID0gYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgZm9ybWx5RXhwcmVzc2lvbixcbiAgYXBpQ2hlY2suc2hhcGUoe1xuICAgIGV4cHJlc3Npb246IGZvcm1seUV4cHJlc3Npb24sXG4gICAgbWVzc2FnZTogZm9ybWx5RXhwcmVzc2lvbi5vcHRpb25hbFxuICB9KS5zdHJpY3Rcbl0pKTtcblxubGV0IGZpZWxkT3B0aW9uc0FwaVNoYXBlID0ge1xuICAkJGhhc2hLZXk6IGFwaUNoZWNrLmFueS5vcHRpb25hbCxcbiAgdHlwZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoWyd0ZW1wbGF0ZScsICd0ZW1wbGF0ZVVybCddLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICB0ZW1wbGF0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoXG4gICAgWyd0eXBlJywgJ3RlbXBsYXRlVXJsJ10sXG4gICAgYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmZ1bmNdKVxuICApLm9wdGlvbmFsLFxuICB0ZW1wbGF0ZVVybDogYXBpQ2hlY2suc2hhcGUuaWZOb3QoXG4gICAgWyd0eXBlJywgJ3RlbXBsYXRlJ10sXG4gICAgYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmZ1bmNdKVxuICApLm9wdGlvbmFsLFxuICBrZXk6IGFwaUNoZWNrLm9uZU9mVHlwZShbYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5udW1iZXJdKS5vcHRpb25hbCxcbiAgbW9kZWw6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgY2xhc3NOYW1lOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gIGV4cHJlc3Npb25Qcm9wZXJ0aWVzOiBleHByZXNzaW9uUHJvcGVydGllcy5vcHRpb25hbCxcbiAgZGF0YTogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICB0ZW1wbGF0ZU9wdGlvbnM6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgd3JhcHBlcjogc3BlY2lmeVdyYXBwZXJUeXBlLm9wdGlvbmFsLFxuICBtb2RlbE9wdGlvbnM6IGFwaUNoZWNrLnNoYXBlKHtcbiAgICB1cGRhdGVPbjogYXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsLFxuICAgIGRlYm91bmNlOiBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgICAgYXBpQ2hlY2sub2JqZWN0LCBhcGlDaGVjay5zdHJpbmdcbiAgICBdKS5vcHRpb25hbCxcbiAgICBhbGxvd0ludmFsaWQ6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgZ2V0dGVyU2V0dGVyOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsLFxuICAgIHRpbWV6b25lOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWxcbiAgfSkub3B0aW9uYWwsXG4gIHdhdGNoZXI6IGFwaUNoZWNrLnR5cGVPckFycmF5T2YoXG4gICAgYXBpQ2hlY2suc2hhcGUoe1xuICAgICAgZXhwcmVzc2lvbjogZm9ybWx5RXhwcmVzc2lvbi5vcHRpb25hbCxcbiAgICAgIGxpc3RlbmVyOiBmb3JtbHlFeHByZXNzaW9uXG4gICAgfSlcbiAgKS5vcHRpb25hbCxcbiAgdmFsaWRhdG9yczogYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICBmb3JtbHlFeHByZXNzaW9uLCBhcGlDaGVjay5zaGFwZSh7XG4gICAgICBleHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLFxuICAgICAgbWVzc2FnZTogZm9ybWx5RXhwcmVzc2lvbi5vcHRpb25hbFxuICAgIH0pLnN0cmljdFxuICBdKSkub3B0aW9uYWwsXG4gIG5vRm9ybUNvbnRyb2w6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gIGhpZGU6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gIGhpZGVFeHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLm9wdGlvbmFsLFxuICBuZ01vZGVsQXR0cnM6IGFwaUNoZWNrLm9iamVjdE9mKGFwaUNoZWNrLnNoYXBlKHtcbiAgICBleHByZXNzaW9uOiBhcGlDaGVjay5zaGFwZS5pZk5vdChbJ3ZhbHVlJywgJ2F0dHJpYnV0ZScsICdib3VuZCddLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsLFxuICAgIHZhbHVlOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgnZXhwcmVzc2lvbicsIGFwaUNoZWNrLmFueSkub3B0aW9uYWwsXG4gICAgYXR0cmlidXRlOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgnZXhwcmVzc2lvbicsIGFwaUNoZWNrLmFueSkub3B0aW9uYWwsXG4gICAgYm91bmQ6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCdleHByZXNzaW9uJywgYXBpQ2hlY2suYW55KS5vcHRpb25hbFxuICB9KS5zdHJpY3QpLm9wdGlvbmFsLFxuICBvcHRpb25zVHlwZXM6IGFwaUNoZWNrLnR5cGVPckFycmF5T2YoYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgbGluazogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgY29udHJvbGxlcjogYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICBhcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmZ1bmMsIGFwaUNoZWNrLmFycmF5XG4gIF0pLm9wdGlvbmFsLFxuICB2YWxpZGF0aW9uOiBhcGlDaGVjay5zaGFwZSh7XG4gICAgc2hvdzogYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICAgIGFwaUNoZWNrLmJvb2wsIGFwaUNoZWNrLm9uZU9mKFtudWxsXSlcbiAgICBdKS5vcHRpb25hbCxcbiAgICBtZXNzYWdlczogYXBpQ2hlY2sub2JqZWN0T2YoZm9ybWx5RXhwcmVzc2lvbikub3B0aW9uYWwsXG4gICAgZXJyb3JFeGlzdHNBbmRTaG91bGRCZVZpc2libGU6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWxcbiAgfSkub3B0aW9uYWwsXG4gIGZvcm1Db250cm9sOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gIHZhbHVlOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICBydW5FeHByZXNzaW9uczogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgcmVzZXRNb2RlbDogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgdXBkYXRlSW5pdGlhbFZhbHVlOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICBpbml0aWFsVmFsdWU6IGFwaUNoZWNrLmFueS5vcHRpb25hbCxcbiAgZGVmYXVsdFZhbHVlOiBhcGlDaGVjay5hbnkub3B0aW9uYWxcbn07XG5cblxubGV0IGZvcm1seUZpZWxkT3B0aW9ucyA9IGFwaUNoZWNrLnNoYXBlKGZpZWxkT3B0aW9uc0FwaVNoYXBlKS5zdHJpY3Q7XG5cblxuY29uc3QgZm9ybU9wdGlvbnNBcGkgPSBhcGlDaGVjay5zaGFwZSh7XG4gIGZvcm1TdGF0ZTogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICByZXNldE1vZGVsOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICB1cGRhdGVJbml0aWFsVmFsdWU6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIHJlbW92ZUNocm9tZUF1dG9Db21wbGV0ZTogYXBpQ2hlY2suYm9vbC5vcHRpb25hbFxufSkuc3RyaWN0O1xuXG5cbmNvbnN0IGZpZWxkR3JvdXAgPSBhcGlDaGVjay5zaGFwZSh7XG4gICQkaGFzaEtleTogYXBpQ2hlY2suYW55Lm9wdGlvbmFsLFxuICBmaWVsZEdyb3VwOiBhcGlDaGVjay5hcnJheU9mKGZvcm1seUZpZWxkT3B0aW9ucyksXG4gIGNsYXNzTmFtZTogYXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsLFxuICBvcHRpb25zOiBmb3JtT3B0aW9uc0FwaS5vcHRpb25hbCxcbiAgaGlkZTogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgaGlkZUV4cHJlc3Npb246IGZvcm1seUV4cHJlc3Npb24ub3B0aW9uYWwsXG4gIG1vZGVsOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gIGZvcm06IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbFxufSkuc3RyaWN0O1xuXG5sZXQgdHlwZU9wdGlvbnNEZWZhdWx0T3B0aW9ucyA9IGFuZ3VsYXIuY29weShmaWVsZE9wdGlvbnNBcGlTaGFwZSk7XG50eXBlT3B0aW9uc0RlZmF1bHRPcHRpb25zLmtleSA9IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbDtcblxubGV0IGZvcm1seVR5cGVPcHRpb25zID0gYXBpQ2hlY2suc2hhcGUoe1xuICBuYW1lOiBhcGlDaGVjay5zdHJpbmcsXG4gIHRlbXBsYXRlOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgndGVtcGxhdGVVcmwnLCBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suZnVuY10pKS5vcHRpb25hbCxcbiAgdGVtcGxhdGVVcmw6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZScsIGFwaUNoZWNrLm9uZU9mVHlwZShbYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5mdW5jXSkpLm9wdGlvbmFsLFxuICBjb250cm9sbGVyOiBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgIGFwaUNoZWNrLmZ1bmMsIGFwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suYXJyYXlcbiAgXSkub3B0aW9uYWwsXG4gIGxpbms6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIGRlZmF1bHRPcHRpb25zOiBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgIGFwaUNoZWNrLmZ1bmMsIGFwaUNoZWNrLnNoYXBlKHR5cGVPcHRpb25zRGVmYXVsdE9wdGlvbnMpXG4gIF0pLm9wdGlvbmFsLFxuICBleHRlbmRzOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gIHdyYXBwZXI6IHNwZWNpZnlXcmFwcGVyVHlwZS5vcHRpb25hbCxcbiAgZGF0YTogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICB2YWxpZGF0ZU9wdGlvbnM6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gIGFwaUNoZWNrOiBhcGlDaGVja1Byb3BlcnR5Lm9wdGlvbmFsLFxuICBhcGlDaGVja0luc3RhbmNlOiBhcGlDaGVja0luc3RhbmNlUHJvcGVydHkub3B0aW9uYWwsXG4gIGFwaUNoZWNrRnVuY3Rpb246IGFwaUNoZWNrRnVuY3Rpb25Qcm9wZXJ0eS5vcHRpb25hbCxcbiAgYXBpQ2hlY2tPcHRpb25zOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gIG92ZXJ3cml0ZU9rOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsXG59KS5zdHJpY3Q7XG5hbmd1bGFyLmV4dGVuZChhcGlDaGVjaywge1xuICBmb3JtbHlUeXBlT3B0aW9ucywgZm9ybWx5RmllbGRPcHRpb25zLCBmb3JtbHlFeHByZXNzaW9uLCBmb3JtbHlXcmFwcGVyVHlwZSwgZmllbGRHcm91cCwgZm9ybU9wdGlvbnNBcGlcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCBhcGlDaGVjaztcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9mb3JtbHlBcGlDaGVjay5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGBodHRwczovL2dpdGh1Yi5jb20vZm9ybWx5LWpzL2FuZ3VsYXItZm9ybWx5L2Jsb2IvJHtWRVJTSU9OfS9vdGhlci9FUlJPUlNfQU5EX1dBUk5JTkdTLm1kI2A7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9vdGhlci9kb2NzQmFzZVVybC5qc1xuICoqLyIsImltcG9ydCBhbmd1bGFyIGZyb20gJ2FuZ3VsYXItZml4JztcblxuZXhwb3J0IGRlZmF1bHQgZm9ybWx5VXNhYmlsaXR5O1xuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGZvcm1seVVzYWJpbGl0eShmb3JtbHlBcGlDaGVjaywgZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCkge1xuICBhbmd1bGFyLmV4dGVuZCh0aGlzLCB7XG4gICAgZ2V0Rm9ybWx5RXJyb3I6IGdldEZvcm1seUVycm9yLFxuICAgIGdldEZpZWxkRXJyb3I6IGdldEZpZWxkRXJyb3IsXG4gICAgY2hlY2tXcmFwcGVyOiBjaGVja1dyYXBwZXIsXG4gICAgY2hlY2tXcmFwcGVyVGVtcGxhdGU6IGNoZWNrV3JhcHBlclRlbXBsYXRlLFxuICAgICRnZXQ6ICgpID0+IHRoaXNcbiAgfSk7XG5cbiAgZnVuY3Rpb24gZ2V0RmllbGRFcnJvcihlcnJvckluZm9TbHVnLCBtZXNzYWdlLCBmaWVsZCkge1xuICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgZmllbGQgPSBtZXNzYWdlO1xuICAgICAgbWVzc2FnZSA9IGVycm9ySW5mb1NsdWc7XG4gICAgICBlcnJvckluZm9TbHVnID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkgKyBgIEZpZWxkIGRlZmluaXRpb246ICR7YW5ndWxhci50b0pzb24oZmllbGQpfWApO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0Rm9ybWx5RXJyb3IoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkge1xuICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgbWVzc2FnZSA9IGVycm9ySW5mb1NsdWc7XG4gICAgICBlcnJvckluZm9TbHVnID0gbnVsbDtcbiAgICB9XG4gICAgcmV0dXJuIG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0RXJyb3JNZXNzYWdlKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpIHtcbiAgICBsZXQgdXJsID0gJyc7XG4gICAgaWYgKGVycm9ySW5mb1NsdWcgIT09IG51bGwpIHtcbiAgICAgIHVybCA9IGAke2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXh9JHtlcnJvckluZm9TbHVnfWA7XG4gICAgfVxuICAgIHJldHVybiBgRm9ybWx5IEVycm9yOiAke21lc3NhZ2V9LiAke3VybH1gO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyKHdyYXBwZXIpIHtcbiAgICBmb3JtbHlBcGlDaGVjay50aHJvdyhmb3JtbHlBcGlDaGVjay5mb3JtbHlXcmFwcGVyVHlwZSwgd3JhcHBlciwge1xuICAgICAgcHJlZml4OiAnZm9ybWx5Q29uZmlnLnNldFdyYXBwZXInLFxuICAgICAgdXJsU3VmZml4OiAnc2V0d3JhcHBlci12YWxpZGF0aW9uLWZhaWxlZCdcbiAgICB9KTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrV3JhcHBlclRlbXBsYXRlKHRlbXBsYXRlLCBhZGRpdGlvbmFsSW5mbykge1xuICAgIHZhciBmb3JtbHlUcmFuc2NsdWRlID0gJzxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPic7XG4gICAgaWYgKHRlbXBsYXRlLmluZGV4T2YoZm9ybWx5VHJhbnNjbHVkZSkgPT09IC0xKSB7XG4gICAgICB0aHJvdyBnZXRGb3JtbHlFcnJvcihcbiAgICAgICAgYFRlbXBsYXRlIHdyYXBwZXIgdGVtcGxhdGVzIG11c3QgdXNlIFwiJHtmb3JtbHlUcmFuc2NsdWRlfVwiIHNvbWV3aGVyZSBpbiB0aGVtLiBgICtcbiAgICAgICAgYFRoaXMgb25lIGRvZXMgbm90IGhhdmUgXCI8Zm9ybWx5LXRyYW5zY2x1ZGU+PC9mb3JtbHktdHJhbnNjbHVkZT5cIiBpbiBpdDogJHt0ZW1wbGF0ZX1gICsgJ1xcbicgK1xuICAgICAgICBgQWRkaXRpb25hbCBpbmZvcm1hdGlvbjogJHtKU09OLnN0cmluZ2lmeShhZGRpdGlvbmFsSW5mbyl9YFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHkuanNcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5pbXBvcnQgdXRpbHMgZnJvbSAnLi4vb3RoZXIvdXRpbHMnO1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtbHlDb25maWc7XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5Q29uZmlnKGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLCBmb3JtbHlBcGlDaGVjaykge1xuXG4gIHZhciB0eXBlTWFwID0ge307XG4gIHZhciB0ZW1wbGF0ZVdyYXBwZXJzTWFwID0ge307XG4gIHZhciBkZWZhdWx0V3JhcHBlck5hbWUgPSAnZGVmYXVsdCc7XG4gIHZhciBfdGhpcyA9IHRoaXM7XG4gIHZhciBnZXRFcnJvciA9IGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLmdldEZvcm1seUVycm9yO1xuXG4gIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsIHtcbiAgICBzZXRUeXBlLFxuICAgIGdldFR5cGUsXG4gICAgc2V0V3JhcHBlcixcbiAgICBnZXRXcmFwcGVyLFxuICAgIGdldFdyYXBwZXJCeVR5cGUsXG4gICAgcmVtb3ZlV3JhcHBlckJ5TmFtZSxcbiAgICByZW1vdmVXcmFwcGVyc0ZvclR5cGUsXG4gICAgZGlzYWJsZVdhcm5pbmdzOiBmYWxzZSxcbiAgICBleHRyYXM6IHtcbiAgICAgIGRpc2FibGVOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcjogZmFsc2UsXG4gICAgICBuZ01vZGVsQXR0cnNNYW5pcHVsYXRvclByZWZlclVuYm91bmQ6IGZhbHNlLFxuICAgICAgcmVtb3ZlQ2hyb21lQXV0b0NvbXBsZXRlOiBmYWxzZSxcbiAgICAgIGRlZmF1bHRIaWRlRGlyZWN0aXZlOiAnbmctaWYnXG4gICAgfSxcbiAgICB0ZW1wbGF0ZU1hbmlwdWxhdG9yczoge1xuICAgICAgcHJlV3JhcHBlcjogW10sXG4gICAgICBwb3N0V3JhcHBlcjogW11cbiAgICB9LFxuICAgICRnZXQ6ICgpID0+IHRoaXNcbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2V0VHlwZShvcHRpb25zKSB7XG4gICAgaWYgKGFuZ3VsYXIuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgYW5ndWxhci5mb3JFYWNoKG9wdGlvbnMsIHNldFR5cGUpO1xuICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgY2hlY2tUeXBlKG9wdGlvbnMpO1xuICAgICAgaWYgKG9wdGlvbnMuZXh0ZW5kcykge1xuICAgICAgICBleHRlbmRUeXBlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHR5cGVNYXBbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGdldEVycm9yKGBZb3UgbXVzdCBwcm92aWRlIGFuIG9iamVjdCBvciBhcnJheSBmb3Igc2V0VHlwZS4gWW91IHByb3ZpZGVkOiAke0pTT04uc3RyaW5naWZ5KGFyZ3VtZW50cyl9YCk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tUeXBlKG9wdGlvbnMpIHtcbiAgICBmb3JtbHlBcGlDaGVjay50aHJvdyhmb3JtbHlBcGlDaGVjay5mb3JtbHlUeXBlT3B0aW9ucywgb3B0aW9ucywge1xuICAgICAgcHJlZml4OiAnZm9ybWx5Q29uZmlnLnNldFR5cGUnLFxuICAgICAgdXJsOiAnc2V0dHlwZS12YWxpZGF0aW9uLWZhaWxlZCdcbiAgICB9KTtcbiAgICBpZiAoIW9wdGlvbnMub3ZlcndyaXRlT2spIHtcbiAgICAgIGNoZWNrT3ZlcndyaXRlKG9wdGlvbnMubmFtZSwgdHlwZU1hcCwgb3B0aW9ucywgJ3R5cGVzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMub3ZlcndyaXRlT2sgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZXh0ZW5kVHlwZU9wdGlvbnMob3B0aW9ucykge1xuICAgIGNvbnN0IGV4dGVuZHNUeXBlID0gZ2V0VHlwZShvcHRpb25zLmV4dGVuZHMsIHRydWUsIG9wdGlvbnMpO1xuICAgIGV4dGVuZFR5cGVDb250cm9sbGVyRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgIGV4dGVuZFR5cGVMaW5rRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgIGV4dGVuZFR5cGVWYWxpZGF0ZU9wdGlvbnNGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgZXh0ZW5kVHlwZURlZmF1bHRPcHRpb25zKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZFR5cGVDb250cm9sbGVyRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICBjb25zdCBleHRlbmRzQ3RybCA9IGV4dGVuZHNUeXBlLmNvbnRyb2xsZXI7XG4gICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzQ3RybCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9uc0N0cmwgPSBvcHRpb25zLmNvbnRyb2xsZXI7XG4gICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnNDdHJsKSkge1xuICAgICAgb3B0aW9ucy5jb250cm9sbGVyID0gZnVuY3Rpb24gKCRzY29wZSwgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgJGNvbnRyb2xsZXIoZXh0ZW5kc0N0cmwsIHskc2NvcGV9KTtcbiAgICAgICAgJGNvbnRyb2xsZXIob3B0aW9uc0N0cmwsIHskc2NvcGV9KTtcbiAgICAgIH07XG4gICAgICBvcHRpb25zLmNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRjb250cm9sbGVyJ107XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMuY29udHJvbGxlciA9IGV4dGVuZHNDdHJsO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZFR5cGVMaW5rRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICBjb25zdCBleHRlbmRzRm4gPSBleHRlbmRzVHlwZS5saW5rO1xuICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0ZuKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zRm4gPSBvcHRpb25zLmxpbms7XG4gICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnNGbikpIHtcbiAgICAgIG9wdGlvbnMubGluayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgZXh0ZW5kc0ZuKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIG9wdGlvbnNGbiguLi5hcmd1bWVudHMpO1xuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgb3B0aW9ucy5saW5rID0gZXh0ZW5kc0ZuO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZFR5cGVWYWxpZGF0ZU9wdGlvbnNGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgIGNvbnN0IGV4dGVuZHNGbiA9IGV4dGVuZHNUeXBlLnZhbGlkYXRlT3B0aW9ucztcbiAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNGbikpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3Qgb3B0aW9uc0ZuID0gb3B0aW9ucy52YWxpZGF0ZU9wdGlvbnM7XG4gICAgY29uc3Qgb3JpZ2luYWxEZWZhdWx0T3B0aW9ucyA9IG9wdGlvbnMuZGVmYXVsdE9wdGlvbnM7XG4gICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnNGbikpIHtcbiAgICAgIG9wdGlvbnMudmFsaWRhdGVPcHRpb25zID0gZnVuY3Rpb24gKG9wdGlvbnMpIHtcbiAgICAgICAgb3B0aW9uc0ZuKG9wdGlvbnMpO1xuICAgICAgICBsZXQgbWVyZ2VkT3B0aW9ucyA9IGFuZ3VsYXIuY29weShvcHRpb25zKTtcbiAgICAgICAgbGV0IGRlZmF1bHRPcHRpb25zID0gb3JpZ2luYWxEZWZhdWx0T3B0aW9ucztcbiAgICAgICAgaWYgKGRlZmF1bHRPcHRpb25zKSB7XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihkZWZhdWx0T3B0aW9ucykpIHtcbiAgICAgICAgICAgIGRlZmF1bHRPcHRpb25zID0gZGVmYXVsdE9wdGlvbnMobWVyZ2VkT3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UobWVyZ2VkT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIGV4dGVuZHNGbihtZXJnZWRPcHRpb25zKTtcbiAgICAgIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIG9wdGlvbnMudmFsaWRhdGVPcHRpb25zID0gZXh0ZW5kc0ZuO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGV4dGVuZFR5cGVEZWZhdWx0T3B0aW9ucyhvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgIGNvbnN0IGV4dGVuZHNETyA9IGV4dGVuZHNUeXBlLmRlZmF1bHRPcHRpb25zO1xuICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0RPKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBvcHRpb25zRE8gPSBvcHRpb25zLmRlZmF1bHRPcHRpb25zO1xuICAgIGNvbnN0IG9wdGlvbnNET0lzRm4gPSBhbmd1bGFyLmlzRnVuY3Rpb24ob3B0aW9uc0RPKTtcbiAgICBjb25zdCBleHRlbmRzRE9Jc0ZuID0gYW5ndWxhci5pc0Z1bmN0aW9uKGV4dGVuZHNETyk7XG4gICAgaWYgKGV4dGVuZHNET0lzRm4pIHtcbiAgICAgIG9wdGlvbnMuZGVmYXVsdE9wdGlvbnMgPSBmdW5jdGlvbiBkZWZhdWx0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgIGNvbnN0IGV4dGVuZHNEZWZhdWx0T3B0aW9ucyA9IGV4dGVuZHNETyhvcHRpb25zKTtcbiAgICAgICAgY29uc3QgbWVyZ2VkRGVmYXVsdE9wdGlvbnMgPSB7fTtcbiAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShtZXJnZWREZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgZXh0ZW5kc0RlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgbGV0IGV4dGVuZGVyT3B0aW9uc0RlZmF1bHRPcHRpb25zID0gb3B0aW9uc0RPO1xuICAgICAgICBpZiAob3B0aW9uc0RPSXNGbikge1xuICAgICAgICAgIGV4dGVuZGVyT3B0aW9uc0RlZmF1bHRPcHRpb25zID0gZXh0ZW5kZXJPcHRpb25zRGVmYXVsdE9wdGlvbnMobWVyZ2VkRGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UoZXh0ZW5kc0RlZmF1bHRPcHRpb25zLCBleHRlbmRlck9wdGlvbnNEZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIHJldHVybiBleHRlbmRzRGVmYXVsdE9wdGlvbnM7XG4gICAgICB9O1xuICAgIH0gZWxzZSBpZiAob3B0aW9uc0RPSXNGbikge1xuICAgICAgb3B0aW9ucy5kZWZhdWx0T3B0aW9ucyA9IGZ1bmN0aW9uIGRlZmF1bHRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgbGV0IG5ld0RlZmF1bHRPcHRpb25zID0ge307XG4gICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UobmV3RGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMsIGV4dGVuZHNETyk7XG4gICAgICAgIHJldHVybiBvcHRpb25zRE8obmV3RGVmYXVsdE9wdGlvbnMpO1xuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRUeXBlKG5hbWUsIHRocm93RXJyb3IsIGVycm9yQ29udGV4dCkge1xuICAgIGlmICghbmFtZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgdmFyIHR5cGUgPSB0eXBlTWFwW25hbWVdO1xuICAgIGlmICghdHlwZSAmJiB0aHJvd0Vycm9yID09PSB0cnVlKSB7XG4gICAgICB0aHJvdyBnZXRFcnJvcihcbiAgICAgICAgYFRoZXJlIGlzIG5vIHR5cGUgYnkgdGhlIG5hbWUgb2YgXCIke25hbWV9XCI6ICR7SlNPTi5zdHJpbmdpZnkoZXJyb3JDb250ZXh0KX1gXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gdHlwZTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBzZXRXcmFwcGVyKG9wdGlvbnMsIG5hbWUpIHtcbiAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5tYXAod3JhcHBlck9wdGlvbnMgPT4gc2V0V3JhcHBlcih3cmFwcGVyT3B0aW9ucykpO1xuICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgb3B0aW9ucy50eXBlcyA9IGdldE9wdGlvbnNUeXBlcyhvcHRpb25zKTtcbiAgICAgIG9wdGlvbnMubmFtZSA9IGdldE9wdGlvbnNOYW1lKG9wdGlvbnMsIG5hbWUpO1xuICAgICAgY2hlY2tXcmFwcGVyQVBJKG9wdGlvbnMpO1xuICAgICAgdGVtcGxhdGVXcmFwcGVyc01hcFtvcHRpb25zLm5hbWVdID0gb3B0aW9ucztcbiAgICAgIHJldHVybiBvcHRpb25zO1xuICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc1N0cmluZyhvcHRpb25zKSkge1xuICAgICAgcmV0dXJuIHNldFdyYXBwZXIoe1xuICAgICAgICB0ZW1wbGF0ZTogb3B0aW9ucyxcbiAgICAgICAgbmFtZVxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gZ2V0T3B0aW9uc1R5cGVzKG9wdGlvbnMpIHtcbiAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhvcHRpb25zLnR5cGVzKSkge1xuICAgICAgcmV0dXJuIFtvcHRpb25zLnR5cGVzXTtcbiAgICB9XG4gICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnR5cGVzKSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy50eXBlcztcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRPcHRpb25zTmFtZShvcHRpb25zLCBuYW1lKSB7XG4gICAgcmV0dXJuIG9wdGlvbnMubmFtZSB8fCBuYW1lIHx8IG9wdGlvbnMudHlwZXMuam9pbignICcpIHx8IGRlZmF1bHRXcmFwcGVyTmFtZTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrV3JhcHBlckFQSShvcHRpb25zKSB7XG4gICAgZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuY2hlY2tXcmFwcGVyKG9wdGlvbnMpO1xuICAgIGlmIChvcHRpb25zLnRlbXBsYXRlKSB7XG4gICAgICBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5jaGVja1dyYXBwZXJUZW1wbGF0ZShvcHRpb25zLnRlbXBsYXRlLCBvcHRpb25zKTtcbiAgICB9XG4gICAgaWYgKCFvcHRpb25zLm92ZXJ3cml0ZU9rKSB7XG4gICAgICBjaGVja092ZXJ3cml0ZShvcHRpb25zLm5hbWUsIHRlbXBsYXRlV3JhcHBlcnNNYXAsIG9wdGlvbnMsICd0ZW1wbGF0ZVdyYXBwZXJzJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlbGV0ZSBvcHRpb25zLm92ZXJ3cml0ZU9rO1xuICAgIH1cbiAgICBjaGVja1dyYXBwZXJUeXBlcyhvcHRpb25zKTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrV3JhcHBlclR5cGVzKG9wdGlvbnMpIHtcbiAgICBsZXQgc2hvdWxkVGhyb3cgPSAhYW5ndWxhci5pc0FycmF5KG9wdGlvbnMudHlwZXMpIHx8ICFvcHRpb25zLnR5cGVzLmV2ZXJ5KGFuZ3VsYXIuaXNTdHJpbmcpO1xuICAgIGlmIChzaG91bGRUaHJvdykge1xuICAgICAgdGhyb3cgZ2V0RXJyb3IoYEF0dGVtcHRlZCB0byBjcmVhdGUgYSB0ZW1wbGF0ZSB3cmFwcGVyIHdpdGggdHlwZXMgdGhhdCBpcyBub3QgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5nc2ApO1xuICAgIH1cbiAgfVxuXG4gIGZ1bmN0aW9uIGNoZWNrT3ZlcndyaXRlKHByb3BlcnR5LCBvYmplY3QsIG5ld1ZhbHVlLCBvYmplY3ROYW1lKSB7XG4gICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgIHdhcm4oW1xuICAgICAgICBgQXR0ZW1wdGluZyB0byBvdmVyd3JpdGUgJHtwcm9wZXJ0eX0gb24gJHtvYmplY3ROYW1lfSB3aGljaCBpcyBjdXJyZW50bHlgLFxuICAgICAgICBgJHtKU09OLnN0cmluZ2lmeShvYmplY3RbcHJvcGVydHldKX0gd2l0aCAke0pTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKX1gLFxuICAgICAgICBgVG8gc3VwcmVzcyB0aGlzIHdhcm5pbmcsIHNwZWNpZnkgdGhlIHByb3BlcnR5IFwib3ZlcndyaXRlT2s6IHRydWVcImBcbiAgICAgIF0uam9pbignICcpKTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiBnZXRXcmFwcGVyKG5hbWUpIHtcbiAgICByZXR1cm4gdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lIHx8IGRlZmF1bHRXcmFwcGVyTmFtZV07XG4gIH1cblxuICBmdW5jdGlvbiBnZXRXcmFwcGVyQnlUeXBlKHR5cGUpIHtcbiAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgdmFyIHdyYXBwZXJzID0gW107XG4gICAgZm9yICh2YXIgbmFtZSBpbiB0ZW1wbGF0ZVdyYXBwZXJzTWFwKSB7XG4gICAgICBpZiAodGVtcGxhdGVXcmFwcGVyc01hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICBpZiAodGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXS50eXBlcyAmJiB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdLnR5cGVzLmluZGV4T2YodHlwZSkgIT09IC0xKSB7XG4gICAgICAgICAgd3JhcHBlcnMucHVzaCh0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gd3JhcHBlcnM7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVXcmFwcGVyQnlOYW1lKG5hbWUpIHtcbiAgICB2YXIgd3JhcHBlciA9IHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV07XG4gICAgZGVsZXRlIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV07XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cblxuICBmdW5jdGlvbiByZW1vdmVXcmFwcGVyc0ZvclR5cGUodHlwZSkge1xuICAgIHZhciB3cmFwcGVycyA9IGdldFdyYXBwZXJCeVR5cGUodHlwZSk7XG4gICAgaWYgKCF3cmFwcGVycykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoIWFuZ3VsYXIuaXNBcnJheSh3cmFwcGVycykpIHtcbiAgICAgIHJldHVybiByZW1vdmVXcmFwcGVyQnlOYW1lKHdyYXBwZXJzLm5hbWUpO1xuICAgIH0gZWxzZSB7XG4gICAgICB3cmFwcGVycy5mb3JFYWNoKCh3cmFwcGVyKSA9PiByZW1vdmVXcmFwcGVyQnlOYW1lKHdyYXBwZXIubmFtZSkpO1xuICAgICAgcmV0dXJuIHdyYXBwZXJzO1xuICAgIH1cbiAgfVxuXG5cbiAgZnVuY3Rpb24gd2FybigpIHtcbiAgICBpZiAoIV90aGlzLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgY29uc29sZS53YXJuKC4uLmFyZ3VtZW50cyk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzO1xuXG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzKCkge1xuXG4gIHZhciB2YWxpZGF0aW9uTWVzc2FnZXMgPSB7XG4gICAgYWRkVGVtcGxhdGVPcHRpb25WYWx1ZU1lc3NhZ2UsXG4gICAgYWRkU3RyaW5nTWVzc2FnZSxcbiAgICBtZXNzYWdlczoge31cbiAgfTtcblxuICByZXR1cm4gdmFsaWRhdGlvbk1lc3NhZ2VzO1xuXG4gIGZ1bmN0aW9uIGFkZFRlbXBsYXRlT3B0aW9uVmFsdWVNZXNzYWdlKG5hbWUsIHByb3AsIHByZWZpeCwgc3VmZml4LCBhbHRlcm5hdGUpIHtcbiAgICB2YWxpZGF0aW9uTWVzc2FnZXMubWVzc2FnZXNbbmFtZV0gPSB0ZW1wbGF0ZU9wdGlvblZhbHVlKHByb3AsIHByZWZpeCwgc3VmZml4LCBhbHRlcm5hdGUpO1xuICB9XG5cbiAgZnVuY3Rpb24gYWRkU3RyaW5nTWVzc2FnZShuYW1lLCBzdHJpbmcpIHtcbiAgICB2YWxpZGF0aW9uTWVzc2FnZXMubWVzc2FnZXNbbmFtZV0gPSAoKSA9PiBzdHJpbmc7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIHRlbXBsYXRlT3B0aW9uVmFsdWUocHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSkge1xuICAgIHJldHVybiBmdW5jdGlvbiBnZXRWYWxpZGF0aW9uTWVzc2FnZSh2aWV3VmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKSB7XG4gICAgICBpZiAoc2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbcHJvcF0pIHtcbiAgICAgICAgcmV0dXJuIGAke3ByZWZpeH0gJHtzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9uc1twcm9wXX0gJHtzdWZmaXh9YDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBhbHRlcm5hdGU7XG4gICAgICB9XG4gICAgfTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5qc1xuICoqLyIsImltcG9ydCB1dGlscyBmcm9tICcuLi9vdGhlci91dGlscyc7XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1seVV0aWw7XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5VXRpbCgpIHtcbiAgcmV0dXJuIHV0aWxzO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vc2VydmljZXMvZm9ybWx5VXRpbC5qc1xuICoqLyIsImV4cG9ydCBkZWZhdWx0IGZvcm1seVdhcm47XG5cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5V2Fybihmb3JtbHlDb25maWcsIGZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXgsICRsb2cpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgaWYgKCFmb3JtbHlDb25maWcuZGlzYWJsZVdhcm5pbmdzKSB7XG4gICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICB2YXIgd2FybkluZm9TbHVnID0gYXJncy5zaGlmdCgpO1xuICAgICAgYXJncy51bnNoaWZ0KCdGb3JtbHkgV2FybmluZzonKTtcbiAgICAgIGFyZ3MucHVzaChgJHtmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4fSR7d2FybkluZm9TbHVnfWApO1xuICAgICAgJGxvZy53YXJuKC4uLmFyZ3MpO1xuICAgIH1cbiAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3NlcnZpY2VzL2Zvcm1seVdhcm4uanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmb3JtbHlDdXN0b21WYWxpZGF0aW9uO1xuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGZvcm1seUN1c3RvbVZhbGlkYXRpb24oZm9ybWx5VXRpbCwgJHEpIHtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0EnLFxuICAgIHJlcXVpcmU6ICduZ01vZGVsJyxcbiAgICBsaW5rOiBmdW5jdGlvbiBmb3JtbHlDdXN0b21WYWxpZGF0aW9uTGluayhzY29wZSwgZWwsIGF0dHJzLCBjdHJsKSB7XG4gICAgICBjb25zdCBvcHRzID0gc2NvcGUub3B0aW9ucztcbiAgICAgIGlmIChvcHRzLnZhbGlkYXRvcnMpIHtcbiAgICAgICAgY2hlY2tWYWxpZGF0b3JzKG9wdHMudmFsaWRhdG9ycyk7XG4gICAgICB9XG4gICAgICBvcHRzLnZhbGlkYXRpb24ubWVzc2FnZXMgPSBvcHRzLnZhbGlkYXRpb24ubWVzc2FnZXMgfHwge307XG4gICAgICBhbmd1bGFyLmZvckVhY2gob3B0cy52YWxpZGF0aW9uLm1lc3NhZ2VzLCAobWVzc2FnZSwga2V5KSA9PiB7XG4gICAgICAgIG9wdHMudmFsaWRhdGlvbi5tZXNzYWdlc1trZXldID0gKCkgPT4ge1xuICAgICAgICAgIHJldHVybiBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIG1lc3NhZ2UsIGN0cmwuJG1vZGVsVmFsdWUsIGN0cmwuJHZpZXdWYWx1ZSk7XG4gICAgICAgIH07XG4gICAgICB9KTtcblxuXG4gICAgICB2YXIgdXNlTmV3VmFsaWRhdG9yc0FwaSA9IGN0cmwuaGFzT3duUHJvcGVydHkoJyR2YWxpZGF0b3JzJykgJiYgIWF0dHJzLmhhc093blByb3BlcnR5KCd1c2VQYXJzZXJzJyk7XG4gICAgICBhbmd1bGFyLmZvckVhY2gob3B0cy52YWxpZGF0b3JzLCBmdW5jdGlvbiBhZGRWYWxpZGF0b3JUb1BpcGVsaW5lKHZhbGlkYXRvciwgbmFtZSkge1xuICAgICAgICB2YXIgbWVzc2FnZSA9IHZhbGlkYXRvci5tZXNzYWdlO1xuICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgIG9wdHMudmFsaWRhdGlvbi5tZXNzYWdlc1tuYW1lXSA9ICgpID0+IHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIG1lc3NhZ2UsIGN0cmwuJG1vZGVsVmFsdWUsIGN0cmwuJHZpZXdWYWx1ZSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgICB2YWxpZGF0b3IgPSBhbmd1bGFyLmlzT2JqZWN0KHZhbGlkYXRvcikgPyB2YWxpZGF0b3IuZXhwcmVzc2lvbiA6IHZhbGlkYXRvcjtcbiAgICAgICAgdmFyIGlzUG9zc2libHlBc3luYyA9ICFhbmd1bGFyLmlzU3RyaW5nKHZhbGlkYXRvcik7XG4gICAgICAgIGlmICh1c2VOZXdWYWxpZGF0b3JzQXBpKSB7XG4gICAgICAgICAgc2V0dXBXaXRoVmFsaWRhdG9ycygpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHNldHVwV2l0aFBhcnNlcnMoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldHVwV2l0aFZhbGlkYXRvcnMoKSB7XG4gICAgICAgICAgdmFyIHZhbGlkYXRvckNvbGxlY3Rpb24gPSBpc1Bvc3NpYmx5QXN5bmMgPyAnJGFzeW5jVmFsaWRhdG9ycycgOiAnJHZhbGlkYXRvcnMnO1xuICAgICAgICAgIGN0cmxbdmFsaWRhdG9yQ29sbGVjdGlvbl1bbmFtZV0gPSBmdW5jdGlvbiBldmFsVmFsaWRpdHkobW9kZWxWYWx1ZSwgdmlld1ZhbHVlKSB7XG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIHZhbGlkYXRvciwgbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpc1Bvc3NpYmx5QXN5bmMpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGlzUHJvbWlzZUxpa2UodmFsdWUpID8gdmFsdWUgOiB2YWx1ZSA/ICRxLndoZW4odmFsdWUpIDogJHEucmVqZWN0KHZhbHVlKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9O1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0dXBXaXRoUGFyc2VycygpIHtcbiAgICAgICAgICBsZXQgaW5GbGlnaHRWYWxpZGF0b3I7XG4gICAgICAgICAgY3RybC4kcGFyc2Vycy51bnNoaWZ0KGZ1bmN0aW9uIGV2YWxWYWxpZGl0eU9mUGFyc2VyKHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIHZhbGlkYXRvciwgY3RybC4kbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgIGlmIChpc1Byb21pc2VMaWtlKGlzVmFsaWQpKSB7XG4gICAgICAgICAgICAgIGN0cmwuJHBlbmRpbmcgPSBjdHJsLiRwZW5kaW5nIHx8IHt9O1xuICAgICAgICAgICAgICBjdHJsLiRwZW5kaW5nW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgaW5GbGlnaHRWYWxpZGF0b3IgPSBpc1ZhbGlkO1xuICAgICAgICAgICAgICBpc1ZhbGlkLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgIGlmIChpbkZsaWdodFZhbGlkYXRvciA9PT0gaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkobmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KS5jYXRjaCgoKSA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGluRmxpZ2h0VmFsaWRhdG9yID09PSBpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShuYW1lLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoY3RybC4kcGVuZGluZykubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICBkZWxldGUgY3RybC4kcGVuZGluZztcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIGN0cmwuJHBlbmRpbmdbbmFtZV07XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KG5hbWUsIGlzVmFsaWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHZpZXdWYWx1ZTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGlzUHJvbWlzZUxpa2Uob2JqKSB7XG4gICAgcmV0dXJuIG9iaiAmJiBhbmd1bGFyLmlzRnVuY3Rpb24ob2JqLnRoZW4pO1xuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tWYWxpZGF0b3JzKHZhbGlkYXRvcnMpIHtcbiAgICB2YXIgYWxsb3dlZFByb3BlcnRpZXMgPSBbJ2V4cHJlc3Npb24nLCAnbWVzc2FnZSddO1xuICAgIHZhciB2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMgPSB7fTtcbiAgICBhbmd1bGFyLmZvckVhY2godmFsaWRhdG9ycywgKHZhbGlkYXRvciwgbmFtZSkgPT4ge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcodmFsaWRhdG9yKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgZXh0cmFQcm9wcyA9IFtdO1xuICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvciwgKHYsIGtleSkgPT4ge1xuICAgICAgICBpZiAoYWxsb3dlZFByb3BlcnRpZXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgIGV4dHJhUHJvcHMucHVzaChrZXkpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChleHRyYVByb3BzLmxlbmd0aCkge1xuICAgICAgICB2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHNbbmFtZV0gPSBleHRyYVByb3BzO1xuICAgICAgfVxuICAgIH0pO1xuICAgIGlmIChPYmplY3Qua2V5cyh2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMpLmxlbmd0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFtcbiAgICAgICAgYFZhbGlkYXRvcnMgYXJlIG9ubHkgYWxsb3dlZCB0byBiZSBmdW5jdGlvbnMgb3Igb2JqZWN0cyB0aGF0IGhhdmUgJHthbGxvd2VkUHJvcGVydGllcy5qb2luKCcsICcpfS5gLFxuICAgICAgICBgWW91IHByb3ZpZGVkIHNvbWUgZXh0cmEgcHJvcGVydGllczogJHtKU09OLnN0cmluZ2lmeSh2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMpfWBcbiAgICAgIF0uam9pbignICcpKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLmpzXG4gKiovIiwiaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhci1maXgnO1xuXG5leHBvcnQgZGVmYXVsdCBmb3JtbHlGaWVsZDtcblxuLyoqXG4gKiBAbmdkb2MgZGlyZWN0aXZlXG4gKiBAbmFtZSBmb3JtbHlGaWVsZFxuICogQHJlc3RyaWN0IEFFXG4gKi9cbi8vIEBuZ0luamVjdFxuZnVuY3Rpb24gZm9ybWx5RmllbGQoJGh0dHAsICRxLCAkY29tcGlsZSwgJHRlbXBsYXRlQ2FjaGUsIGZvcm1seUNvbmZpZywgZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLCBmb3JtbHlBcGlDaGVjayxcbiAgICAgICAgICAgICAgICAgICAgIGZvcm1seVV0aWwsIGZvcm1seVVzYWJpbGl0eSwgZm9ybWx5V2Fybikge1xuICBjb25zdCB7YXJyYXlpZnl9ID0gZm9ybWx5VXRpbDtcblxuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQUUnLFxuICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgc2NvcGU6IHtcbiAgICAgIG9wdGlvbnM6ICc9JyxcbiAgICAgIG1vZGVsOiAnPScsXG4gICAgICBmb3JtSWQ6ICdAJyxcbiAgICAgIGluZGV4OiAnPT8nLFxuICAgICAgZmllbGRzOiAnPT8nLFxuICAgICAgZm9ybVN0YXRlOiAnPT8nLFxuICAgICAgZm9ybTogJz0/J1xuICAgIH0sXG4gICAgY29udHJvbGxlcjogLyogQG5nSW5qZWN0ICovIGZ1bmN0aW9uIEZvcm1seUZpZWxkQ29udHJvbGxlcigkc2NvcGUsICR0aW1lb3V0LCAkcGFyc2UsICRjb250cm9sbGVyKSB7XG4gICAgICAvKiBqc2hpbnQgbWF4c3RhdGVtZW50czozMSAqL1xuICAgICAgaWYgKCRzY29wZS5vcHRpb25zLmZpZWxkR3JvdXApIHtcbiAgICAgICAgc2V0dXBGaWVsZEdyb3VwKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdmFyIG9wdHMgPSAkc2NvcGUub3B0aW9ucztcbiAgICAgIHZhciBmaWVsZFR5cGUgPSBvcHRzLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0cy50eXBlKTtcbiAgICAgIHNpbXBsaWZ5TGlmZShvcHRzKTtcbiAgICAgIG1lcmdlRmllbGRPcHRpb25zV2l0aFR5cGVEZWZhdWx0cyhvcHRzLCBmaWVsZFR5cGUpO1xuICAgICAgZXh0ZW5kT3B0aW9uc1dpdGhEZWZhdWx0cyhvcHRzLCAkc2NvcGUuaW5kZXgpO1xuICAgICAgY2hlY2tBcGkob3B0cyk7XG4gICAgICAvLyBzZXQgZmllbGQgaWQgdG8gbGluayBsYWJlbHMgYW5kIGZpZWxkc1xuICAgICAgJHNjb3BlLmlkID0gZm9ybWx5VXRpbC5nZXRGaWVsZElkKCRzY29wZS5mb3JtSWQsIG9wdHMsICRzY29wZS5pbmRleCk7XG5cbiAgICAgIC8vIGluaXRhbGl6YXRpb25cbiAgICAgIHNldERlZmF1bHRWYWx1ZSgpO1xuICAgICAgc2V0SW5pdGlhbFZhbHVlKCk7XG4gICAgICBydW5FeHByZXNzaW9ucygpO1xuICAgICAgYWRkTW9kZWxXYXRjaGVyKCRzY29wZSwgb3B0cyk7XG4gICAgICBhZGRWYWxpZGF0aW9uTWVzc2FnZXMob3B0cyk7XG4gICAgICAvLyBzaW1wbGlmeSB0aGluZ3NcbiAgICAgIC8vIGNyZWF0ZSAkc2NvcGUudG8gc28gdGVtcGxhdGUgYXV0aG9ycyBjYW4gcmVmZXJlbmNlIHRvIGluc3RlYWQgb2YgJHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zXG4gICAgICAkc2NvcGUudG8gPSAkc2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnM7XG4gICAgICBpbnZva2VDb250cm9sbGVycygkc2NvcGUsIG9wdHMsIGZpZWxkVHlwZSk7XG5cbiAgICAgIC8vIGZ1bmN0aW9uIGRlZmluaXRpb25zXG4gICAgICBmdW5jdGlvbiBydW5FeHByZXNzaW9ucygpIHtcbiAgICAgICAgLy8gbXVzdCBydW4gb24gbmV4dCB0aWNrIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBjdXJyZW50IHZhbHVlIGlzIGNvcnJlY3QuXG4gICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb25zT25OZXh0VGljaygpIHtcbiAgICAgICAgICB2YXIgZmllbGQgPSAkc2NvcGUub3B0aW9ucztcbiAgICAgICAgICB2YXIgY3VycmVudFZhbHVlID0gdmFsdWVHZXR0ZXJTZXR0ZXIoKTtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goZmllbGQuZXhwcmVzc2lvblByb3BlcnRpZXMsIGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb24oZXhwcmVzc2lvbiwgcHJvcCkge1xuICAgICAgICAgICAgdmFyIHNldHRlciA9ICRwYXJzZShwcm9wKS5hc3NpZ247XG4gICAgICAgICAgICB2YXIgcHJvbWlzZSA9ICRxLndoZW4oZm9ybWx5VXRpbC5mb3JtbHlFdmFsKCRzY29wZSwgZXhwcmVzc2lvbiwgY3VycmVudFZhbHVlKSk7XG4gICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24gc2V0RmllbGRWYWx1ZSh2YWx1ZSkge1xuICAgICAgICAgICAgICBzZXR0ZXIoZmllbGQsIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdmFsdWVHZXR0ZXJTZXR0ZXIobmV3VmFsKSB7XG4gICAgICAgIGlmICghJHNjb3BlLm1vZGVsIHx8ICEkc2NvcGUub3B0aW9ucy5rZXkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG5ld1ZhbCkpIHtcbiAgICAgICAgICAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XSA9IG5ld1ZhbDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIHNpbXBsaWZ5TGlmZShvcHRpb25zKSB7XG4gICAgICAgIC8vIGFkZCBhIGZldyBlbXB0eSBvYmplY3RzIChpZiB0aGV5IGRvbid0IGFscmVhZHkgZXhpc3QpIHNvIHlvdSBkb24ndCBoYXZlIHRvIHVuZGVmaW5lZCBjaGVjayBldmVyeXdoZXJlXG4gICAgICAgIGZvcm1seVV0aWwucmV2ZXJzZURlZXBNZXJnZShvcHRpb25zLCB7XG4gICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgdGVtcGxhdGVPcHRpb25zOiB7fSxcbiAgICAgICAgICB2YWxpZGF0aW9uOiB7fVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0RGVmYXVsdFZhbHVlKCkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0cy5kZWZhdWx0VmFsdWUpICYmICFhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUubW9kZWxbb3B0cy5rZXldKSkge1xuICAgICAgICAgICRzY29wZS5tb2RlbFtvcHRzLmtleV0gPSBvcHRzLmRlZmF1bHRWYWx1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXRJbml0aWFsVmFsdWUoKSB7XG4gICAgICAgIG9wdHMuaW5pdGlhbFZhbHVlID0gJHNjb3BlLm1vZGVsICYmICRzY29wZS5tb2RlbFtvcHRzLmtleV07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG1lcmdlRmllbGRPcHRpb25zV2l0aFR5cGVEZWZhdWx0cyhvcHRpb25zLCB0eXBlKSB7XG4gICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgbWVyZ2VPcHRpb25zKG9wdGlvbnMsIHR5cGUuZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHZhciBwcm9wZXJPcmRlciA9IGFycmF5aWZ5KG9wdGlvbnMub3B0aW9uc1R5cGVzKS5yZXZlcnNlKCk7IC8vIHNvIHRoZSByaWdodCB0aGluZ3MgYXJlIG92ZXJyaWRkZW5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHByb3Blck9yZGVyLCB0eXBlTmFtZSA9PiB7XG4gICAgICAgICAgbWVyZ2VPcHRpb25zKG9wdGlvbnMsIGZvcm1seUNvbmZpZy5nZXRUeXBlKHR5cGVOYW1lLCB0cnVlLCBvcHRpb25zKS5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBtZXJnZU9wdGlvbnMob3B0aW9ucywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgIGlmIChleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGV4dHJhT3B0aW9ucykpIHtcbiAgICAgICAgICAgIGV4dHJhT3B0aW9ucyA9IGV4dHJhT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZm9ybWx5VXRpbC5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIGV4dHJhT3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZXh0ZW5kT3B0aW9uc1dpdGhEZWZhdWx0cyhvcHRpb25zLCBpbmRleCkge1xuICAgICAgICBjb25zdCBrZXkgPSBvcHRpb25zLmtleSB8fCBpbmRleCB8fCAwO1xuICAgICAgICBhbmd1bGFyLmV4dGVuZChvcHRpb25zLCB7XG4gICAgICAgICAgLy8gYXR0YWNoIHRoZSBrZXkgaW4gY2FzZSB0aGUgZm9ybWx5LWZpZWxkIGRpcmVjdGl2ZSBpcyB1c2VkIGRpcmVjdGx5XG4gICAgICAgICAga2V5LFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZUdldHRlclNldHRlcixcbiAgICAgICAgICBydW5FeHByZXNzaW9ucyxcbiAgICAgICAgICByZXNldE1vZGVsLFxuICAgICAgICAgIHVwZGF0ZUluaXRpYWxWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gaW5pdGlhbGl6YXRpb24gZnVuY3Rpb25zXG4gICAgICBmdW5jdGlvbiBhZGRNb2RlbFdhdGNoZXIoc2NvcGUsIG9wdGlvbnMpIHtcbiAgICAgICAgaWYgKG9wdGlvbnMubW9kZWwpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goJ29wdGlvbnMubW9kZWwnLCBydW5FeHByZXNzaW9ucywgdHJ1ZSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gcmVzZXRNb2RlbCgpIHtcbiAgICAgICAgJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV0gPSAkc2NvcGUub3B0aW9ucy5pbml0aWFsVmFsdWU7XG4gICAgICAgIGlmICgkc2NvcGUub3B0aW9ucy5mb3JtQ29udHJvbCkge1xuICAgICAgICAgICRzY29wZS5vcHRpb25zLmZvcm1Db250cm9sLiRzZXRWaWV3VmFsdWUoJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV0pO1xuICAgICAgICAgICRzY29wZS5vcHRpb25zLmZvcm1Db250cm9sLiRyZW5kZXIoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB1cGRhdGVJbml0aWFsVmFsdWUoKSB7XG4gICAgICAgICRzY29wZS5vcHRpb25zLmluaXRpYWxWYWx1ZSA9ICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRWYWxpZGF0aW9uTWVzc2FnZXMob3B0aW9ucykge1xuICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgPSBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgfHwge307XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMubWVzc2FnZXMsIGZ1bmN0aW9uIGNyZWF0ZUZ1bmN0aW9uRm9yTWVzc2FnZShleHByZXNzaW9uLCBuYW1lKSB7XG4gICAgICAgICAgaWYgKCFvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0pIHtcbiAgICAgICAgICAgIG9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlc1tuYW1lXSA9IGZ1bmN0aW9uIGV2YWx1YXRlTWVzc2FnZSh2aWV3VmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIGV4cHJlc3Npb24sIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGludm9rZUNvbnRyb2xsZXJzKHNjb3BlLCBvcHRpb25zID0ge30sIHR5cGUgPSB7fSkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goW3R5cGUuY29udHJvbGxlciwgb3B0aW9ucy5jb250cm9sbGVyXSwgY29udHJvbGxlciA9PiB7XG4gICAgICAgICAgaWYgKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICRjb250cm9sbGVyKGNvbnRyb2xsZXIsIHskc2NvcGU6IHNjb3BlfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0dXBGaWVsZEdyb3VwKCkge1xuICAgICAgICAkc2NvcGUub3B0aW9ucy5vcHRpb25zID0gJHNjb3BlLm9wdGlvbnMub3B0aW9ucyB8fCB7fTtcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMub3B0aW9ucy5mb3JtU3RhdGUgPSAkc2NvcGUuZm9ybVN0YXRlO1xuICAgICAgfVxuICAgIH0sXG4gICAgbGluazogZnVuY3Rpb24gZmllbGRMaW5rKHNjb3BlLCBlbCkge1xuICAgICAgaWYgKHNjb3BlLm9wdGlvbnMuZmllbGRHcm91cCkge1xuICAgICAgICBjaGVja0ZpZWxkR3JvdXBBcGkoc2NvcGUub3B0aW9ucyk7XG4gICAgICAgIGVsLmFkZENsYXNzKCdmb3JtbHktZmllbGQtZ3JvdXAnKTtcbiAgICAgICAgc2V0RWxlbWVudFRlbXBsYXRlKGBcbiAgICAgICAgICA8Zm9ybWx5LWZvcm0gbW9kZWw9XCJtb2RlbFwiXG4gICAgICAgICAgICAgICAgICAgICAgIGZpZWxkcz1cIm9wdGlvbnMuZmllbGRHcm91cFwiXG4gICAgICAgICAgICAgICAgICAgICAgIG9wdGlvbnM9XCJvcHRpb25zLm9wdGlvbnNcIlxuICAgICAgICAgICAgICAgICAgICAgICBmb3JtPVwib3B0aW9ucy5mb3JtXCJcbiAgICAgICAgICAgICAgICAgICAgICAgY2xhc3M9XCIke3Njb3BlLm9wdGlvbnMuY2xhc3NOYW1lfVwiXG4gICAgICAgICAgICAgICAgICAgICAgIGlzLWZpZWxkLWdyb3VwPlxuICAgICAgICAgIDwvZm9ybWx5LWZvcm0+XG4gICAgICAgIGApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGFkZENsYXNzZXMoKTtcblxuICAgICAgdmFyIHR5cGUgPSBzY29wZS5vcHRpb25zLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUoc2NvcGUub3B0aW9ucy50eXBlKTtcbiAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgdmFyIHRodXNseSA9IHRoaXM7XG4gICAgICBnZXRGaWVsZFRlbXBsYXRlKHNjb3BlLm9wdGlvbnMpXG4gICAgICAgIC50aGVuKHJ1bk1hbmlwdWxhdG9ycyhmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlcikpXG4gICAgICAgIC50aGVuKHRyYW5zY2x1ZGVJbldyYXBwZXJzKHNjb3BlLm9wdGlvbnMpKVxuICAgICAgICAudGhlbihydW5NYW5pcHVsYXRvcnMoZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnBvc3RXcmFwcGVyKSlcbiAgICAgICAgLnRoZW4oc2V0RWxlbWVudFRlbXBsYXRlKVxuICAgICAgICAudGhlbih3YXRjaEZvcm1Db250cm9sKVxuICAgICAgICAudGhlbihjYWxsTGlua0Z1bmN0aW9ucylcbiAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICBmb3JtbHlXYXJuKFxuICAgICAgICAgICAgJ3RoZXJlLXdhcy1hLXByb2JsZW0tc2V0dGluZy10aGUtdGVtcGxhdGUtZm9yLXRoaXMtZmllbGQnLFxuICAgICAgICAgICAgJ1RoZXJlIHdhcyBhIHByb2JsZW0gc2V0dGluZyB0aGUgdGVtcGxhdGUgZm9yIHRoaXMgZmllbGQgJyxcbiAgICAgICAgICAgIHNjb3BlLm9wdGlvbnMsXG4gICAgICAgICAgICBlcnJvclxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICBmdW5jdGlvbiBhZGRDbGFzc2VzKCkge1xuICAgICAgICBpZiAoc2NvcGUub3B0aW9ucy5jbGFzc05hbWUpIHtcbiAgICAgICAgICBlbC5hZGRDbGFzcyhzY29wZS5vcHRpb25zLmNsYXNzTmFtZSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMudHlwZSkge1xuICAgICAgICAgIGVsLmFkZENsYXNzKGBmb3JtbHktZmllbGQtJHtzY29wZS5vcHRpb25zLnR5cGV9YCk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0RWxlbWVudFRlbXBsYXRlKHRlbXBsYXRlU3RyaW5nKSB7XG4gICAgICAgIGVsLmh0bWwoYXNIdG1sKHRlbXBsYXRlU3RyaW5nKSk7XG4gICAgICAgICRjb21waWxlKGVsLmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlU3RyaW5nO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiB3YXRjaEZvcm1Db250cm9sKHRlbXBsYXRlU3RyaW5nKSB7XG4gICAgICAgIGxldCBzdG9wV2F0Y2hpbmdGaWVsZCA9IGFuZ3VsYXIubm9vcDtcbiAgICAgICAgbGV0IHN0b3BXYXRjaGluZ1Nob3dFcnJvciA9IGFuZ3VsYXIubm9vcDtcbiAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMubm9Gb3JtQ29udHJvbCkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0ZW1wbGF0ZUVsID0gYW5ndWxhci5lbGVtZW50KGA8ZGl2PiR7dGVtcGxhdGVTdHJpbmd9PC9kaXY+YCk7XG4gICAgICAgIGNvbnN0IG5nTW9kZWxOb2RlID0gdGVtcGxhdGVFbFswXS5xdWVyeVNlbGVjdG9yKCdbbmctbW9kZWxdJyk7XG4gICAgICAgIGlmIChuZ01vZGVsTm9kZSAmJiBuZ01vZGVsTm9kZS5uYW1lKSB7XG4gICAgICAgICAgd2F0Y2hGaWVsZE5hbWVPckV4aXN0ZW5jZShuZ01vZGVsTm9kZS5uYW1lKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHdhdGNoRmllbGROYW1lT3JFeGlzdGVuY2UobmFtZSkge1xuICAgICAgICAgIGNvbnN0IG5hbWVFeHByZXNzaW9uUmVnZXggPSAvXFx7XFx7KC4qPyl9fS87XG4gICAgICAgICAgY29uc3QgbmFtZUV4cHJlc3Npb24gPSBuYW1lRXhwcmVzc2lvblJlZ2V4LmV4ZWMobmFtZSk7XG4gICAgICAgICAgaWYgKG5hbWVFeHByZXNzaW9uKSB7XG4gICAgICAgICAgICB3YXRjaEZpZWxkTmFtZShuYW1lRXhwcmVzc2lvblsxXSk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHdhdGNoRmllbGRFeGlzdGVuY2UobmFtZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gd2F0Y2hGaWVsZE5hbWUoZXhwcmVzc2lvbikge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChleHByZXNzaW9uLCBmdW5jdGlvbiBvbmVGaWVsZE5hbWVDaGFuZ2UobmFtZSkge1xuICAgICAgICAgICAgaWYgKG5hbWUpIHtcbiAgICAgICAgICAgICAgc3RvcFdhdGNoaW5nRmllbGQoKTtcbiAgICAgICAgICAgICAgd2F0Y2hGaWVsZEV4aXN0ZW5jZShuYW1lKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHdhdGNoRmllbGRFeGlzdGVuY2UobmFtZSkge1xuICAgICAgICAgIHN0b3BXYXRjaGluZ0ZpZWxkID0gc2NvcGUuJHdhdGNoKGBmb3JtW1wiJHtuYW1lfVwiXWAsIGZ1bmN0aW9uIGZvcm1Db250cm9sQ2hhbmdlKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICBpZiAoZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgc2NvcGUuZmMgPSBmb3JtQ29udHJvbDsgLy8gc2hvcnRjdXQgZm9yIHRlbXBsYXRlIGF1dGhvcnNcbiAgICAgICAgICAgICAgc2NvcGUub3B0aW9ucy5mb3JtQ29udHJvbCA9IGZvcm1Db250cm9sO1xuICAgICAgICAgICAgICBzdG9wV2F0Y2hpbmdTaG93RXJyb3IoKTtcbiAgICAgICAgICAgICAgYWRkU2hvd01lc3NhZ2VzV2F0Y2hlcigpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkU2hvd01lc3NhZ2VzV2F0Y2hlcigpIHtcbiAgICAgICAgICBzdG9wV2F0Y2hpbmdTaG93RXJyb3IgPSBzY29wZS4kd2F0Y2goZnVuY3Rpb24gd2F0Y2hTaG93VmFsaWRhdGlvbkNoYW5nZSgpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NvcGUub3B0aW9ucy52YWxpZGF0aW9uLnNob3cgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICByZXR1cm4gc2NvcGUuZmMuJGludmFsaWQgJiYgc2NvcGUub3B0aW9ucy52YWxpZGF0aW9uLnNob3c7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBsZXQgbm9Ub3VjaGVkQnV0RGlydHkgPSAoYW5ndWxhci5pc1VuZGVmaW5lZChzY29wZS5mYy4kdG91Y2hlZCkgJiYgc2NvcGUuZmMuJGRpcnR5KTtcbiAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmZjLiRpbnZhbGlkICYmIChzY29wZS5mYy4kdG91Y2hlZCB8fCBub1RvdWNoZWRCdXREaXJ0eSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24gb25TaG93VmFsaWRhdGlvbkNoYW5nZShzaG93KSB7XG4gICAgICAgICAgICBzY29wZS5vcHRpb25zLnZhbGlkYXRpb24uZXJyb3JFeGlzdHNBbmRTaG91bGRCZVZpc2libGUgPSBzaG93O1xuICAgICAgICAgICAgc2NvcGUuc2hvd0Vycm9yID0gc2hvdzsgLy8gc2hvcnRjdXQgZm9yIHRlbXBsYXRlIGF1dGhvcnNcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBjYWxsTGlua0Z1bmN0aW9ucygpIHtcbiAgICAgICAgaWYgKHR5cGUgJiYgdHlwZS5saW5rKSB7XG4gICAgICAgICAgdHlwZS5saW5rLmFwcGx5KHRodXNseSwgYXJncyk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMubGluaykge1xuICAgICAgICAgIHNjb3BlLm9wdGlvbnMubGluay5hcHBseSh0aHVzbHksIGFyZ3MpO1xuICAgICAgICB9XG4gICAgICB9XG5cblxuICAgICAgZnVuY3Rpb24gcnVuTWFuaXB1bGF0b3JzKG1hbmlwdWxhdG9ycykge1xuICAgICAgICByZXR1cm4gZnVuY3Rpb24gcnVuTWFuaXB1bGF0b3JzT25UZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgICAgIHZhciBjaGFpbiA9ICRxLndoZW4odGVtcGxhdGUpO1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChtYW5pcHVsYXRvcnMsIG1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgICAgIGNoYWluID0gY2hhaW4udGhlbih0ZW1wbGF0ZSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKG1hbmlwdWxhdG9yKHRlbXBsYXRlLCBzY29wZS5vcHRpb25zLCBzY29wZSkpLnRoZW4obmV3VGVtcGxhdGUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzU3RyaW5nKG5ld1RlbXBsYXRlKSA/IG5ld1RlbXBsYXRlIDogYXNIdG1sKG5ld1RlbXBsYXRlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuICB9O1xuXG4gIGZ1bmN0aW9uIGFzSHRtbChlbCkge1xuICAgIHZhciB3cmFwcGVyID0gYW5ndWxhci5lbGVtZW50KCc8YT48L2E+Jyk7XG4gICAgcmV0dXJuIHdyYXBwZXIuYXBwZW5kKGVsKS5odG1sKCk7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRGaWVsZFRlbXBsYXRlKG9wdGlvbnMpIHtcbiAgICBsZXQgdHlwZSA9IGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSwgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgbGV0IHRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZSB8fCB0eXBlICYmIHR5cGUudGVtcGxhdGU7XG4gICAgbGV0IHRlbXBsYXRlVXJsID0gb3B0aW9ucy50ZW1wbGF0ZVVybCB8fCB0eXBlICYmIHR5cGUudGVtcGxhdGVVcmw7XG4gICAgaWYgKCF0ZW1wbGF0ZSAmJiAhdGVtcGxhdGVVcmwpIHtcbiAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFxuICAgICAgICAndHlwZS10eXBlLWhhcy1uby10ZW1wbGF0ZScsXG4gICAgICAgIGBUeXBlICcke29wdGlvbnMudHlwZX0nIGhhcyBub3QgdGVtcGxhdGUuIE9uIGVsZW1lbnQ6YCwgb3B0aW9uc1xuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZ2V0VGVtcGxhdGUodGVtcGxhdGUgfHwgdGVtcGxhdGVVcmwsICF0ZW1wbGF0ZSwgb3B0aW9ucyk7XG4gIH1cblxuXG4gIGZ1bmN0aW9uIGdldFRlbXBsYXRlKHRlbXBsYXRlLCBpc1VybCwgb3B0aW9ucykge1xuICAgIGxldCB0ZW1wbGF0ZVByb21pc2U7XG4gICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0ZW1wbGF0ZSkpIHtcbiAgICAgIHRlbXBsYXRlUHJvbWlzZSA9ICRxLndoZW4odGVtcGxhdGUob3B0aW9ucykpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0ZW1wbGF0ZVByb21pc2UgPSAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzVXJsKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGVQcm9taXNlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgaHR0cE9wdGlvbnMgPSB7Y2FjaGU6ICR0ZW1wbGF0ZUNhY2hlfTtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZVByb21pc2VcbiAgICAgICAgLnRoZW4oKHVybCkgPT4gJGh0dHAuZ2V0KHVybCwgaHR0cE9wdGlvbnMpKVxuICAgICAgICAudGhlbigocmVzcG9uc2UpID0+IHJlc3BvbnNlLmRhdGEpXG4gICAgICAgIC5jYXRjaChmdW5jdGlvbiBoYW5kbGVFcnJvckdldHRpbmdBVGVtcGxhdGUoZXJyb3IpIHtcbiAgICAgICAgICBmb3JtbHlXYXJuKFxuICAgICAgICAgICAgJ3Byb2JsZW0tbG9hZGluZy10ZW1wbGF0ZS1mb3ItdGVtcGxhdGV1cmwnLFxuICAgICAgICAgICAgJ1Byb2JsZW0gbG9hZGluZyB0ZW1wbGF0ZSBmb3IgJyArIHRlbXBsYXRlLFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBmdW5jdGlvbiB0cmFuc2NsdWRlSW5XcmFwcGVycyhvcHRpb25zKSB7XG4gICAgbGV0IHdyYXBwZXIgPSBnZXRXcmFwcGVyT3B0aW9uKG9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIGZ1bmN0aW9uIHRyYW5zY2x1ZGVUZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgaWYgKCF3cmFwcGVyLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gJHEud2hlbih0ZW1wbGF0ZSk7XG4gICAgICB9XG5cbiAgICAgIHdyYXBwZXIuZm9yRWFjaCgod3JhcHBlcikgPT4ge1xuICAgICAgICBmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyKHdyYXBwZXIsIG9wdGlvbnMpO1xuICAgICAgICB3cmFwcGVyLnZhbGlkYXRlT3B0aW9ucyAmJiB3cmFwcGVyLnZhbGlkYXRlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgcnVuQXBpQ2hlY2sod3JhcHBlciwgb3B0aW9ucyk7XG4gICAgICB9KTtcbiAgICAgIGxldCBwcm9taXNlcyA9IHdyYXBwZXIubWFwKHcgPT4gZ2V0VGVtcGxhdGUody50ZW1wbGF0ZSB8fCB3LnRlbXBsYXRlVXJsLCAhdy50ZW1wbGF0ZSkpO1xuICAgICAgcmV0dXJuICRxLmFsbChwcm9taXNlcykudGhlbih3cmFwcGVyc1RlbXBsYXRlcyA9PiB7XG4gICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLmZvckVhY2goKHdyYXBwZXJUZW1wbGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICBmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyVGVtcGxhdGUod3JhcHBlclRlbXBsYXRlLCB3cmFwcGVyW2luZGV4XSk7XG4gICAgICAgIH0pO1xuICAgICAgICB3cmFwcGVyc1RlbXBsYXRlcy5yZXZlcnNlKCk7IC8vIHdyYXBwZXIgMCBpcyB3cmFwcGVkIGluIHdyYXBwZXIgMSBhbmQgc28gb24uLi5cbiAgICAgICAgbGV0IHRvdGFsV3JhcHBlciA9IHdyYXBwZXJzVGVtcGxhdGVzLnNoaWZ0KCk7XG4gICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLmZvckVhY2god3JhcHBlclRlbXBsYXRlID0+IHtcbiAgICAgICAgICB0b3RhbFdyYXBwZXIgPSBkb1RyYW5zY2x1c2lvbih0b3RhbFdyYXBwZXIsIHdyYXBwZXJUZW1wbGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gZG9UcmFuc2NsdXNpb24odG90YWxXcmFwcGVyLCB0ZW1wbGF0ZSk7XG4gICAgICB9KTtcbiAgICB9O1xuICB9XG5cbiAgZnVuY3Rpb24gZG9UcmFuc2NsdXNpb24od3JhcHBlciwgdGVtcGxhdGUpIHtcbiAgICBsZXQgc3VwZXJXcmFwcGVyID0gYW5ndWxhci5lbGVtZW50KCc8YT48L2E+Jyk7IC8vIHRoaXMgYWxsb3dzIHBlb3BsZSBub3QgaGF2ZSB0byBoYXZlIGEgc2luZ2xlIHJvb3QgaW4gd3JhcHBlcnNcbiAgICBzdXBlcldyYXBwZXIuYXBwZW5kKHdyYXBwZXIpO1xuICAgIGxldCB0cmFuc2NsdWRlRWwgPSBzdXBlcldyYXBwZXIuZmluZCgnZm9ybWx5LXRyYW5zY2x1ZGUnKTtcbiAgICBpZiAoIXRyYW5zY2x1ZGVFbC5sZW5ndGgpIHtcbiAgICAgIC8vdHJ5IGl0IHVzaW5nIG91ciBjdXN0b20gZmluZCBmdW5jdGlvblxuICAgICAgdHJhbnNjbHVkZUVsID0gZm9ybWx5VXRpbC5maW5kQnlOb2RlTmFtZShzdXBlcldyYXBwZXIsICdmb3JtbHktdHJhbnNjbHVkZScpO1xuICAgIH1cbiAgICB0cmFuc2NsdWRlRWwucmVwbGFjZVdpdGgodGVtcGxhdGUpO1xuICAgIHJldHVybiBzdXBlcldyYXBwZXIuaHRtbCgpO1xuICB9XG5cbiAgZnVuY3Rpb24gZ2V0V3JhcHBlck9wdGlvbihvcHRpb25zKSB7XG4gICAgbGV0IHdyYXBwZXIgPSBvcHRpb25zLndyYXBwZXI7XG4gICAgLy8gZXhwbGljaXQgbnVsbCBtZWFucyBubyB3cmFwcGVyXG4gICAgaWYgKHdyYXBwZXIgPT09IG51bGwpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICAvLyBub3RoaW5nIHNwZWNpZmllZCBtZWFucyB1c2UgdGhlIGRlZmF1bHQgd3JhcHBlciBmb3IgdGhlIHR5cGVcbiAgICBpZiAoIXdyYXBwZXIpIHtcbiAgICAgIC8vIGdldCBhbGwgd3JhcHBlcnMgdGhhdCBzcGVjaWZ5IHRoZXkgYXBwbHkgdG8gdGhpcyB0eXBlXG4gICAgICB3cmFwcGVyID0gYXJyYXlpZnkoZm9ybWx5Q29uZmlnLmdldFdyYXBwZXJCeVR5cGUob3B0aW9ucy50eXBlKSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHdyYXBwZXIgPSBhcnJheWlmeSh3cmFwcGVyKS5tYXAoZm9ybWx5Q29uZmlnLmdldFdyYXBwZXIpO1xuICAgIH1cblxuICAgIC8vIGdldCBhbGwgd3JhcHBlcnMgZm9yIHRoYXQgdGhpcyB0eXBlIHNwZWNpZmllZCB0aGF0IGl0IHVzZXMuXG4gICAgdmFyIHR5cGUgPSBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRpb25zLnR5cGUsIHRydWUsIG9wdGlvbnMpO1xuICAgIGlmICh0eXBlICYmIHR5cGUud3JhcHBlcikge1xuICAgICAgbGV0IHR5cGVXcmFwcGVycyA9IGFycmF5aWZ5KHR5cGUud3JhcHBlcikubWFwKGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKTtcbiAgICAgIHdyYXBwZXIgPSB3cmFwcGVyLmNvbmNhdCh0eXBlV3JhcHBlcnMpO1xuICAgIH1cblxuICAgIC8vIGFkZCB0aGUgZGVmYXVsdCB3cmFwcGVyIGxhc3RcbiAgICB2YXIgZGVmYXVsdFdyYXBwZXIgPSBmb3JtbHlDb25maWcuZ2V0V3JhcHBlcigpO1xuICAgIGlmIChkZWZhdWx0V3JhcHBlcikge1xuICAgICAgd3JhcHBlci5wdXNoKGRlZmF1bHRXcmFwcGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIHdyYXBwZXI7XG4gIH1cblxuICBmdW5jdGlvbiBjaGVja0FwaShvcHRpb25zKSB7XG4gICAgZm9ybWx5QXBpQ2hlY2sudGhyb3coZm9ybWx5QXBpQ2hlY2suZm9ybWx5RmllbGRPcHRpb25zLCBvcHRpb25zLCB7XG4gICAgICBwcmVmaXg6ICdmb3JtbHktZmllbGQgZGlyZWN0aXZlJyxcbiAgICAgIHVybDogJ2Zvcm1seS1maWVsZC1kaXJlY3RpdmUtdmFsaWRhdGlvbi1mYWlsZWQnXG4gICAgfSk7XG4gICAgLy8gdmFsaWRhdGUgd2l0aCB0aGUgdHlwZVxuICAgIGNvbnN0IHR5cGUgPSBvcHRpb25zLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0aW9ucy50eXBlKTtcbiAgICBpZiAodHlwZSkge1xuICAgICAgaWYgKHR5cGUudmFsaWRhdGVPcHRpb25zKSB7XG4gICAgICAgIHR5cGUudmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcnVuQXBpQ2hlY2sodHlwZSwgb3B0aW9ucyk7XG4gICAgfVxuICB9XG5cbiAgZnVuY3Rpb24gY2hlY2tGaWVsZEdyb3VwQXBpKG9wdGlvbnMpIHtcbiAgICBmb3JtbHlBcGlDaGVjay50aHJvdyhmb3JtbHlBcGlDaGVjay5maWVsZEdyb3VwLCBvcHRpb25zLCB7XG4gICAgICBwcmVmaXg6ICdmb3JtbHktZmllbGQgZGlyZWN0aXZlJyxcbiAgICAgIHVybDogJ2Zvcm1seS1maWVsZC1kaXJlY3RpdmUtdmFsaWRhdGlvbi1mYWlsZWQnXG4gICAgfSk7XG4gIH1cblxuICBmdW5jdGlvbiBydW5BcGlDaGVjayh7YXBpQ2hlY2ssIGFwaUNoZWNrSW5zdGFuY2UsIGFwaUNoZWNrRnVuY3Rpb24sIGFwaUNoZWNrT3B0aW9uc30sIG9wdGlvbnMpIHtcbiAgICBpZiAoIWFwaUNoZWNrKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGluc3RhbmNlID0gYXBpQ2hlY2tJbnN0YW5jZSB8fCBmb3JtbHlBcGlDaGVjaztcbiAgICBjb25zdCBmbiA9IGFwaUNoZWNrRnVuY3Rpb24gfHwgJ3dhcm4nO1xuICAgIGNvbnN0IHNoYXBlID0gaW5zdGFuY2Uuc2hhcGUoYXBpQ2hlY2spO1xuICAgIGluc3RhbmNlW2ZuXShzaGFwZSwgb3B0aW9ucywgYXBpQ2hlY2tPcHRpb25zIHx8IHtcbiAgICAgICAgcHJlZml4OiBgZm9ybWx5LWZpZWxkICR7bmFtZX1gLFxuICAgICAgICB1cmw6IGZvcm1seUFwaUNoZWNrLmNvbmZpZy5vdXRwdXQuZG9jc0Jhc2VVcmwgKyAnZm9ybWx5LWZpZWxkLXR5cGUtYXBpY2hlY2stZmFpbGVkJ1xuICAgICAgfSk7XG4gIH1cblxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9mb3JtbHktZmllbGQuanNcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBmb3JtbHlGb2N1cztcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlGb2N1cygkdGltZW91dCwgJGRvY3VtZW50KSB7XG4gIC8qIGpzaGludCAtVzA1MiAqL1xuICByZXR1cm4ge1xuICAgIHJlc3RyaWN0OiAnQScsXG4gICAgbGluazogZnVuY3Rpb24gZm9ybWx5Rm9jdXNMaW5rKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgdmFyIHByZXZpb3VzRWwgPSBudWxsO1xuICAgICAgdmFyIGVsID0gZWxlbWVudFswXTtcbiAgICAgIHZhciBkb2MgPSAkZG9jdW1lbnRbMF07XG4gICAgICBhdHRycy4kb2JzZXJ2ZSgnZm9ybWx5Rm9jdXMnLCBmdW5jdGlvbiByZXNwb25kVG9Gb2N1c0V4cHJlc3Npb25DaGFuZ2UodmFsdWUpIHtcbiAgICAgICAgaWYgKHZhbHVlID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiBzZXRFbGVtZW50Rm9jdXMoKSB7XG4gICAgICAgICAgICBwcmV2aW91c0VsID0gZG9jLmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICAgIH0sIH5+YXR0cnMuZm9jdXNXYWl0KTtcbiAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJ2ZhbHNlJykge1xuICAgICAgICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCA9PT0gZWwpIHtcbiAgICAgICAgICAgIGVsLmJsdXIoKTtcbiAgICAgICAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eSgncmVmb2N1cycpICYmIHByZXZpb3VzRWwpIHtcbiAgICAgICAgICAgICAgcHJldmlvdXNFbC5mb2N1cygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuICB9O1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9mb3JtbHktZm9jdXMuanNcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGZvcm1seUZvcm07XG5cbi8qKlxuICogQG5nZG9jIGRpcmVjdGl2ZVxuICogQG5hbWUgZm9ybWx5Rm9ybVxuICogQHJlc3RyaWN0IEVcbiAqL1xuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBmb3JtbHlGb3JtKGZvcm1seVVzYWJpbGl0eSwgJHBhcnNlLCBmb3JtbHlBcGlDaGVjaywgZm9ybWx5Q29uZmlnKSB7XG4gIHZhciBjdXJyZW50Rm9ybUlkID0gMTtcbiAgcmV0dXJuIHtcbiAgICByZXN0cmljdDogJ0UnLFxuICAgIHRlbXBsYXRlOiBmdW5jdGlvbiBmb3JtbHlGb3JtR2V0VGVtcGxhdGUoZWwsIGF0dHJzKSB7XG4gICAgICAvKiBqc2hpbnQgLVcwMzMgKi8gLy8gdGhpcyBiZWNhdXNlIGpzaGludCBpcyBicm9rZW4gSSBndWVzcy4uLlxuICAgICAgY29uc3Qgcm9vdEVsID0gZ2V0Um9vdEVsKCk7XG4gICAgICBjb25zdCBmb3JtSWQgPSBgZm9ybWx5XyR7Y3VycmVudEZvcm1JZCsrfWA7XG4gICAgICBsZXQgcGFyZW50Rm9ybUF0dHJpYnV0ZXM7XG4gICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoJ2lzRmllbGRHcm91cCcpICYmIGVsLnBhcmVudCgpLnBhcmVudCgpLmhhc0NsYXNzKCdmb3JtbHknKSkge1xuICAgICAgICBwYXJlbnRGb3JtQXR0cmlidXRlcyA9IGNvcHlBdHRyaWJ1dGVzKGVsLnBhcmVudCgpLnBhcmVudCgpWzBdLmF0dHJpYnV0ZXMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGBcbiAgICAgICAgPCR7cm9vdEVsfSBjbGFzcz1cImZvcm1seVwiXG4gICAgICAgICAgICAgICAgIG5hbWU9XCIke2dldEZvcm1OYW1lKCl9XCJcbiAgICAgICAgICAgICAgICAgcm9sZT1cImZvcm1cIiAke3BhcmVudEZvcm1BdHRyaWJ1dGVzfT5cbiAgICAgICAgICA8ZGl2IGZvcm1seS1maWVsZFxuICAgICAgICAgICAgICAgbmctcmVwZWF0PVwiZmllbGQgaW4gZmllbGRzICR7Z2V0VHJhY2tCeSgpfVwiXG4gICAgICAgICAgICAgICAke2dldEhpZGVEaXJlY3RpdmUoKX09XCIhZmllbGQuaGlkZVwiXG4gICAgICAgICAgICAgICBjbGFzcz1cImZvcm1seS1maWVsZFwiXG4gICAgICAgICAgICAgICBvcHRpb25zPVwiZmllbGRcIlxuICAgICAgICAgICAgICAgbW9kZWw9XCJmaWVsZC5tb2RlbCB8fCBtb2RlbFwiXG4gICAgICAgICAgICAgICBmaWVsZHM9XCJmaWVsZHNcIlxuICAgICAgICAgICAgICAgZm9ybT1cIiR7Zm9ybUlkfVwiXG4gICAgICAgICAgICAgICBmb3JtLWlkPVwiJHtmb3JtSWR9XCJcbiAgICAgICAgICAgICAgIGZvcm0tc3RhdGU9XCJvcHRpb25zLmZvcm1TdGF0ZVwiXG4gICAgICAgICAgICAgICBpbmRleD1cIiRpbmRleFwiPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgbmctdHJhbnNjbHVkZT48L2Rpdj5cbiAgICAgICAgPC8ke3Jvb3RFbH0+XG4gICAgICBgO1xuXG4gICAgICBmdW5jdGlvbiBnZXRSb290RWwoKSB7XG4gICAgICAgIHJldHVybiBhdHRycy5yb290RWwgfHwgJ25nLWZvcm0nO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRIaWRlRGlyZWN0aXZlKCkge1xuICAgICAgICByZXR1cm4gYXR0cnMuaGlkZURpcmVjdGl2ZSB8fCBmb3JtbHlDb25maWcuZXh0cmFzLmRlZmF1bHRIaWRlRGlyZWN0aXZlIHx8ICduZy1pZic7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldFRyYWNrQnkoKSB7XG4gICAgICAgIGlmICghYXR0cnMudHJhY2tCeSkge1xuICAgICAgICAgIHJldHVybiAnJztcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYHRyYWNrIGJ5ICR7YXR0cnMudHJhY2tCeX1gO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldEZvcm1OYW1lKCkge1xuICAgICAgICBsZXQgZm9ybU5hbWUgPSBmb3JtSWQ7XG4gICAgICAgIGNvbnN0IGJpbmROYW1lID0gYXR0cnMuYmluZE5hbWU7XG4gICAgICAgIGlmIChiaW5kTmFtZSkge1xuICAgICAgICAgIGlmIChhbmd1bGFyLnZlcnNpb24ubWlub3IgPCAzKSB7XG4gICAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0Rm9ybWx5RXJyb3IoJ2JpbmQtbmFtZSBhdHRyaWJ1dGUgb24gZm9ybWx5LWZvcm0gbm90IGFsbG93ZWQgaW4gPiBhbmd1bGFyIDEuMycpO1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyB3ZSBjYW4gZG8gYSBvbmUtdGltZSBiaW5kaW5nIGhlcmUgYmVjYXVzZSB3ZSBrbm93IHdlJ3JlIGluIDEuMy54IHRlcnJpdG9yeVxuICAgICAgICAgIGZvcm1OYW1lID0gYHt7OjonZm9ybWx5XycgKyAke2JpbmROYW1lfX19YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZm9ybU5hbWU7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGNvcHlBdHRyaWJ1dGVzKGF0dHJpYnV0ZXMpIHtcbiAgICAgICAgY29uc3QgZXhjbHVkZWQgPSBbJ21vZGVsJywgJ2Zvcm0nLCAnZmllbGRzJywgJ29wdGlvbnMnLCAnbmFtZScsICdyb2xlJywgJ2NsYXNzJ107XG4gICAgICAgIGNvbnN0IGFycmF5QXR0cnMgPSBbXTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKGF0dHJpYnV0ZXMsICh7bm9kZU5hbWUsIG5vZGVWYWx1ZX0pID0+IHtcbiAgICAgICAgICBpZiAobm9kZU5hbWUgIT09ICd1bmRlZmluZWQnICYmIGV4Y2x1ZGVkLmluZGV4T2Yobm9kZU5hbWUpID09PSAtMSkge1xuICAgICAgICAgICAgYXJyYXlBdHRycy5wdXNoKGAke3RvS2ViYWJDYXNlKG5vZGVOYW1lKX09XCIke25vZGVWYWx1ZX1cImApO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBhcnJheUF0dHJzLmpvaW4oJyAnKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdG9LZWJhYkNhc2Uoc3RyaW5nKSB7XG4gICAgICAgIGlmIChzdHJpbmcpIHtcbiAgICAgICAgICByZXR1cm4gc3RyaW5nLnJlcGxhY2UoLyhbQS1aXSkvZywgJDEgPT4gJy0nICsgJDEudG9Mb3dlckNhc2UoKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuICcnO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSxcbiAgICByZXBsYWNlOiB0cnVlLFxuICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgc2NvcGU6IHtcbiAgICAgIGZpZWxkczogJz0nLFxuICAgICAgbW9kZWw6ICc9JyxcbiAgICAgIGZvcm06ICc9PycsXG4gICAgICBvcHRpb25zOiAnPT8nXG4gICAgfSxcbiAgICBjb250cm9sbGVyOiAvKiBAbmdJbmplY3QgKi8gZnVuY3Rpb24gRm9ybWx5Rm9ybUNvbnRyb2xsZXIoJHNjb3BlLCBmb3JtbHlVdGlsKSB7XG4gICAgICBzZXR1cE9wdGlvbnMoKTtcbiAgICAgICRzY29wZS5tb2RlbCA9ICRzY29wZS5tb2RlbCB8fCB7fTtcbiAgICAgICRzY29wZS5maWVsZHMgPSAkc2NvcGUuZmllbGRzIHx8IFtdO1xuXG4gICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgYXR0YWNoS2V5KTsgLy8gYXR0YWNoZXMgYSBrZXkgYmFzZWQgb24gdGhlIGluZGV4IGlmIGEga2V5IGlzbid0IHNwZWNpZmllZFxuICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIHNldHVwV2F0Y2hlcnMpOyAvLyBzZXR1cCB3YXRjaGVycyBmb3IgYWxsIGZpZWxkc1xuXG4gICAgICAvLyB3YXRjaCB0aGUgbW9kZWwgYW5kIGV2YWx1YXRlIHdhdGNoIGV4cHJlc3Npb25zIHRoYXQgZGVwZW5kIG9uIGl0LlxuICAgICAgJHNjb3BlLiR3YXRjaCgnbW9kZWwnLCBvbk1vZGVsT3JGb3JtU3RhdGVDaGFuZ2UsIHRydWUpO1xuICAgICAgaWYgKCRzY29wZS5vcHRpb25zLmZvcm1TdGF0ZSkge1xuICAgICAgICAkc2NvcGUuJHdhdGNoKCdvcHRpb25zLmZvcm1TdGF0ZScsIG9uTW9kZWxPckZvcm1TdGF0ZUNoYW5nZSwgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIG9uTW9kZWxPckZvcm1TdGF0ZUNoYW5nZSgpIHtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGZ1bmN0aW9uIHJ1bkZpZWxkRXhwcmVzc2lvblByb3BlcnRpZXMoZmllbGQpIHtcbiAgICAgICAgICAvKmpzaGludCAtVzAzMCAqL1xuICAgICAgICAgIGNvbnN0IG1vZGVsID0gZmllbGQubW9kZWwgfHwgJHNjb3BlLm1vZGVsO1xuICAgICAgICAgIGZpZWxkLnJ1bkV4cHJlc3Npb25zICYmIGZpZWxkLnJ1bkV4cHJlc3Npb25zKG1vZGVsKTtcbiAgICAgICAgICBpZiAoZmllbGQuaGlkZUV4cHJlc3Npb24pIHtcbiAgICAgICAgICAgIGNvbnN0IHZhbCA9IG1vZGVsW2ZpZWxkLmtleV07XG4gICAgICAgICAgICBmaWVsZC5oaWRlID0gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKCRzY29wZSwgZmllbGQuaGlkZUV4cHJlc3Npb24sIHZhbCwgdmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBzZXR1cE9wdGlvbnMoKSB7XG4gICAgICAgIGZvcm1seUFwaUNoZWNrLnRocm93KFxuICAgICAgICAgIFtmb3JtbHlBcGlDaGVjay5mb3JtT3B0aW9uc0FwaS5vcHRpb25hbF0sIFskc2NvcGUub3B0aW9uc10sIHtwcmVmaXg6ICdmb3JtbHktZm9ybSBvcHRpb25zIGNoZWNrJ31cbiAgICAgICAgKTtcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMgPSAkc2NvcGUub3B0aW9ucyB8fCB7fTtcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMuZm9ybVN0YXRlID0gJHNjb3BlLm9wdGlvbnMuZm9ybVN0YXRlIHx8IHt9O1xuXG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKCRzY29wZS5vcHRpb25zLCB7XG4gICAgICAgICAgdXBkYXRlSW5pdGlhbFZhbHVlLFxuICAgICAgICAgIHJlc2V0TW9kZWxcbiAgICAgICAgfSk7XG5cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gdXBkYXRlSW5pdGlhbFZhbHVlKCkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgZmllbGQgPT4ge1xuICAgICAgICAgIGlmIChpc0ZpZWxkR3JvdXAoZmllbGQpKSB7XG4gICAgICAgICAgICBmaWVsZC5vcHRpb25zLnVwZGF0ZUluaXRpYWxWYWx1ZSgpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmaWVsZC51cGRhdGVJbml0aWFsVmFsdWUoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiByZXNldE1vZGVsKCkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgZmllbGQgPT4ge1xuICAgICAgICAgIGlmIChpc0ZpZWxkR3JvdXAoZmllbGQpKSB7XG4gICAgICAgICAgICBmaWVsZC5vcHRpb25zLnJlc2V0TW9kZWwoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZmllbGQucmVzZXRNb2RlbCgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGF0dGFjaEtleShmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKCFpc0ZpZWxkR3JvdXAoZmllbGQpKSB7XG4gICAgICAgICAgZmllbGQua2V5ID0gZmllbGQua2V5IHx8IGluZGV4IHx8IDA7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gc2V0dXBXYXRjaGVycyhmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgaWYgKGlzRmllbGRHcm91cChmaWVsZCkgfHwgIWFuZ3VsYXIuaXNEZWZpbmVkKGZpZWxkLndhdGNoZXIpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciB3YXRjaGVycyA9IGZpZWxkLndhdGNoZXI7XG4gICAgICAgIGlmICghYW5ndWxhci5pc0FycmF5KHdhdGNoZXJzKSkge1xuICAgICAgICAgIHdhdGNoZXJzID0gW3dhdGNoZXJzXTtcbiAgICAgICAgfVxuICAgICAgICBhbmd1bGFyLmZvckVhY2god2F0Y2hlcnMsIGZ1bmN0aW9uIHNldHVwV2F0Y2hlcih3YXRjaGVyKSB7XG4gICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZCh3YXRjaGVyLmxpc3RlbmVyKSkge1xuICAgICAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXG4gICAgICAgICAgICAgICdhbGwtZmllbGQtd2F0Y2hlcnMtbXVzdC1oYXZlLWEtbGlzdGVuZXInLFxuICAgICAgICAgICAgICAnQWxsIGZpZWxkIHdhdGNoZXJzIG11c3QgaGF2ZSBhIGxpc3RlbmVyJywgZmllbGRcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciB3YXRjaEV4cHJlc3Npb24gPSBnZXRXYXRjaEV4cHJlc3Npb24od2F0Y2hlciwgZmllbGQsIGluZGV4KTtcbiAgICAgICAgICB2YXIgd2F0Y2hMaXN0ZW5lciA9IGdldFdhdGNoTGlzdGVuZXIod2F0Y2hlciwgZmllbGQsIGluZGV4KTtcblxuICAgICAgICAgIHZhciB0eXBlID0gd2F0Y2hlci50eXBlIHx8ICckd2F0Y2gnO1xuICAgICAgICAgIHdhdGNoZXIuc3RvcFdhdGNoaW5nID0gJHNjb3BlW3R5cGVdKHdhdGNoRXhwcmVzc2lvbiwgd2F0Y2hMaXN0ZW5lciwgd2F0Y2hlci53YXRjaERlZXApO1xuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0V2F0Y2hFeHByZXNzaW9uKHdhdGNoZXIsIGZpZWxkLCBpbmRleCkge1xuICAgICAgICB2YXIgd2F0Y2hFeHByZXNzaW9uID0gd2F0Y2hlci5leHByZXNzaW9uIHx8IGBtb2RlbFsnJHtmaWVsZC5rZXl9J11gO1xuICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHdhdGNoRXhwcmVzc2lvbikpIHtcbiAgICAgICAgICAvLyB3cmFwIHRoZSBmaWVsZCdzIHdhdGNoIGV4cHJlc3Npb24gc28gd2UgY2FuIGNhbGwgaXQgd2l0aCB0aGUgZmllbGQgYXMgdGhlIGZpcnN0IGFyZ1xuICAgICAgICAgIC8vIGFuZCB0aGUgc3RvcCBmdW5jdGlvbiBhcyB0aGUgbGFzdCBhcmcgYXMgYSBoZWxwZXJcbiAgICAgICAgICB2YXIgb3JpZ2luYWxFeHByZXNzaW9uID0gd2F0Y2hFeHByZXNzaW9uO1xuICAgICAgICAgIHdhdGNoRXhwcmVzc2lvbiA9IGZ1bmN0aW9uIGZvcm1seVdhdGNoRXhwcmVzc2lvbigpIHtcbiAgICAgICAgICAgIHZhciBhcmdzID0gbW9kaWZ5QXJncyh3YXRjaGVyLCBpbmRleCwgLi4uYXJndW1lbnRzKTtcbiAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEV4cHJlc3Npb24oLi4uYXJncyk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICB3YXRjaEV4cHJlc3Npb24uZGlzcGxheU5hbWUgPSBgRm9ybWx5IFdhdGNoIEV4cHJlc3Npb24gZm9yIGZpZWxkIGZvciAke2ZpZWxkLmtleX1gO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB3YXRjaEV4cHJlc3Npb247XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldFdhdGNoTGlzdGVuZXIod2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgIHZhciB3YXRjaExpc3RlbmVyID0gd2F0Y2hlci5saXN0ZW5lcjtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih3YXRjaExpc3RlbmVyKSkge1xuICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggbGlzdGVuZXIgc28gd2UgY2FuIGNhbGwgaXQgd2l0aCB0aGUgZmllbGQgYXMgdGhlIGZpcnN0IGFyZ1xuICAgICAgICAgIC8vIGFuZCB0aGUgc3RvcCBmdW5jdGlvbiBhcyB0aGUgbGFzdCBhcmcgYXMgYSBoZWxwZXJcbiAgICAgICAgICB2YXIgb3JpZ2luYWxMaXN0ZW5lciA9IHdhdGNoTGlzdGVuZXI7XG4gICAgICAgICAgd2F0Y2hMaXN0ZW5lciA9IGZ1bmN0aW9uIGZvcm1seVdhdGNoTGlzdGVuZXIoKSB7XG4gICAgICAgICAgICB2YXIgYXJncyA9IG1vZGlmeUFyZ3Mod2F0Y2hlciwgaW5kZXgsIC4uLmFyZ3VtZW50cyk7XG4gICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxMaXN0ZW5lciguLi5hcmdzKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIHdhdGNoTGlzdGVuZXIuZGlzcGxheU5hbWUgPSBgRm9ybWx5IFdhdGNoIExpc3RlbmVyIGZvciBmaWVsZCBmb3IgJHtmaWVsZC5rZXl9YDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gd2F0Y2hMaXN0ZW5lcjtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gbW9kaWZ5QXJncyh3YXRjaGVyLCBpbmRleCwgLi4ub3JpZ2luYWxBcmdzKSB7XG4gICAgICAgIHJldHVybiBbJHNjb3BlLmZpZWxkc1tpbmRleF0sIC4uLm9yaWdpbmFsQXJncywgd2F0Y2hlci5zdG9wV2F0Y2hpbmddO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBpc0ZpZWxkR3JvdXAoZmllbGQpIHtcbiAgICAgICAgcmV0dXJuIGZpZWxkICYmICEhZmllbGQuZmllbGRHcm91cDtcbiAgICAgIH1cbiAgICB9LFxuICAgIGxpbmsoc2NvcGUsIGVsLCBhdHRycykge1xuICAgICAgaWYgKGF0dHJzLmZvcm0pIHtcbiAgICAgICAgY29uc3QgZm9ybUlkID0gYXR0cnMubmFtZTtcbiAgICAgICAgJHBhcnNlKGF0dHJzLmZvcm0pLmFzc2lnbihzY29wZS4kcGFyZW50LCBzY29wZVtmb3JtSWRdKTtcbiAgICAgIH1cblxuICAgICAgLy8gY2hyb21lIGF1dG9jb21wbGV0ZSBsYW1lbmVzc1xuICAgICAgLy8gc2VlIGh0dHBzOi8vY29kZS5nb29nbGUuY29tL3AvY2hyb21pdW0vaXNzdWVzL2RldGFpbD9pZD00NjgxNTMjYzE0XG4gICAgICAvLyDhg5oo4LKg55uK4LKg4YOaKSAgICjila/CsOKWocKwKeKVr++4tSDilLvilIHilLsgICAgKOKXnuKAuOKXn++8mylcbiAgICAgIGNvbnN0IGdsb2JhbCA9IGZvcm1seUNvbmZpZy5leHRyYXMucmVtb3ZlQ2hyb21lQXV0b0NvbXBsZXRlID09PSB0cnVlO1xuICAgICAgY29uc3Qgb2ZmSW5zdGFuY2UgPSBzY29wZS5vcHRpb25zICYmIHNjb3BlLm9wdGlvbnMucmVtb3ZlQ2hyb21lQXV0b0NvbXBsZXRlID09PSBmYWxzZTtcbiAgICAgIGNvbnN0IG9uSW5zdGFuY2UgPSBzY29wZS5vcHRpb25zICYmIHNjb3BlLm9wdGlvbnMucmVtb3ZlQ2hyb21lQXV0b0NvbXBsZXRlID09PSB0cnVlO1xuICAgICAgaWYgKChnbG9iYWwgJiYgIW9mZkluc3RhbmNlKSB8fCBvbkluc3RhbmNlKSB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdhdXRvY29tcGxldGUnLCAnYWRkcmVzcy1sZXZlbDQnKTtcbiAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdoaWRkZW4nLCB0cnVlKTtcbiAgICAgICAgZWxbMF0uYXBwZW5kQ2hpbGQoaW5wdXQpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0uanNcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IGFkZEZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yO1xuXG4vLyBAbmdJbmplY3RcbmZ1bmN0aW9uIGFkZEZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKGZvcm1seUNvbmZpZykge1xuICBpZiAoZm9ybWx5Q29uZmlnLmV4dHJhcy5kaXNhYmxlTmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnByZVdyYXBwZXIucHVzaChuZ01vZGVsQXR0cnNNYW5pcHVsYXRvcik7XG5cblxuICBmdW5jdGlvbiBuZ01vZGVsQXR0cnNNYW5pcHVsYXRvcih0ZW1wbGF0ZSwgb3B0aW9ucywgc2NvcGUpIHtcbiAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgdmFyIGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgaWYgKGRhdGEuc2tpcE5nTW9kZWxBdHRyc01hbmlwdWxhdG9yID09PSB0cnVlKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgfVxuICAgIGVsLmlubmVySFRNTCA9IHRlbXBsYXRlO1xuICAgIHZhciBtb2RlbE5vZGVzID0gZWwucXVlcnlTZWxlY3RvckFsbCgnW25nLW1vZGVsXScpO1xuICAgIGlmICghbW9kZWxOb2RlcyB8fCAhbW9kZWxOb2Rlcy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG5cbiAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxOb2RlcywgJ2lkJywgc2NvcGUuaWQpO1xuICAgIGFkZElmTm90UHJlc2VudChtb2RlbE5vZGVzLCAnbmFtZScsIHNjb3BlLmlkKTtcblxuICAgIGFkZFZhbGlkYXRpb24oKTtcbiAgICBhZGRNb2RlbE9wdGlvbnMoKTtcbiAgICBhZGRUZW1wbGF0ZU9wdGlvbnNBdHRycygpO1xuXG5cbiAgICByZXR1cm4gZWwuaW5uZXJIVE1MO1xuXG5cbiAgICBmdW5jdGlvbiBhZGRWYWxpZGF0aW9uKCkge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudmFsaWRhdG9ycykgfHwgYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzKSkge1xuICAgICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxOb2RlcywgJ2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbicsICcnKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRNb2RlbE9wdGlvbnMoKSB7XG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy5tb2RlbE9wdGlvbnMpKSB7XG4gICAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbE5vZGVzLCAnbmctbW9kZWwtb3B0aW9ucycsICdvcHRpb25zLm1vZGVsT3B0aW9ucycpO1xuICAgICAgICBpZiAob3B0aW9ucy5tb2RlbE9wdGlvbnMuZ2V0dGVyU2V0dGVyKSB7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKG1vZGVsTm9kZXMsIG5vZGUgPT4ge1xuICAgICAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoJ25nLW1vZGVsJywgJ29wdGlvbnMudmFsdWUnKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFRlbXBsYXRlT3B0aW9uc0F0dHJzKCkge1xuICAgICAgaWYgKCFvcHRpb25zLnRlbXBsYXRlT3B0aW9ucyAmJiAhb3B0aW9ucy5leHByZXNzaW9uUHJvcGVydGllcykge1xuICAgICAgICAvLyBubyBuZWVkIHRvIHJ1biB0aGVzZSBpZiB0aGVyZSBhcmUgbm8gdGVtcGxhdGVPcHRpb25zIG9yIGV4cHJlc3Npb25Qcm9wZXJ0aWVzXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHRvID0gb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnMgfHwge307XG4gICAgICBjb25zdCBlcCA9IG9wdGlvbnMuZXhwcmVzc2lvblByb3BlcnRpZXMgfHwge307XG5cbiAgICAgIGxldCBuZ01vZGVsQXR0cmlidXRlcyA9IGdldEJ1aWx0SW5BdHRyaWJ1dGVzKCk7XG5cbiAgICAgIC8vIGV4dGVuZCB3aXRoIHRoZSB1c2VyJ3Mgc3BlY2lmaWNhdGlvbnMgd2lubmluZ1xuICAgICAgYW5ndWxhci5leHRlbmQobmdNb2RlbEF0dHJpYnV0ZXMsIG9wdGlvbnMubmdNb2RlbEF0dHJzKTtcblxuICAgICAgLy8gRmVlbCBmcmVlIHRvIG1ha2UgdGhpcyBtb3JlIHNpbXBsZSA6LSlcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChuZ01vZGVsQXR0cmlidXRlcywgKHZhbCwgbmFtZSkgPT4ge1xuICAgICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eToxNCAqL1xuICAgICAgICBsZXQgYXR0clZhbDtcbiAgICAgICAgbGV0IGF0dHJOYW1lO1xuICAgICAgICBjb25zdCByZWYgPSBgb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbJyR7bmFtZX0nXWA7XG4gICAgICAgIGNvbnN0IHRvVmFsID0gdG9bbmFtZV07XG4gICAgICAgIGNvbnN0IGVwVmFsID0gZ2V0RXBWYWx1ZShlcCwgbmFtZSk7XG5cbiAgICAgICAgY29uc3QgaW5UbyA9IGFuZ3VsYXIuaXNEZWZpbmVkKHRvVmFsKTtcbiAgICAgICAgY29uc3QgaW5FcCA9IGFuZ3VsYXIuaXNEZWZpbmVkKGVwVmFsKTtcbiAgICAgICAgaWYgKHZhbC52YWx1ZSkge1xuICAgICAgICAgIC8vIEkgcmVhbGl6ZSB0aGlzIGxvb2tzIGJhY2t3YXJkcywgYnV0IGl0J3MgcmlnaHQsIHRydXN0IG1lLi4uXG4gICAgICAgICAgYXR0ck5hbWUgPSB2YWwudmFsdWU7XG4gICAgICAgICAgYXR0clZhbCA9IG5hbWU7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsLmV4cHJlc3Npb24gJiYgaW5Ubykge1xuICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmV4cHJlc3Npb247XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcodG9bbmFtZV0pKSB7XG4gICAgICAgICAgICBhdHRyVmFsID0gYCRldmFsKCR7cmVmfSlgO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRvW25hbWVdKSkge1xuICAgICAgICAgICAgYXR0clZhbCA9IGAke3JlZn0obW9kZWxbb3B0aW9ucy5rZXldLCBvcHRpb25zLCB0aGlzLCAkZXZlbnQpYDtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICBgb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnMuJHtuYW1lfSBtdXN0IGJlIGEgc3RyaW5nIG9yIGZ1bmN0aW9uOiAke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHZhbC5ib3VuZCAmJiBpbkVwKSB7XG4gICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYm91bmQ7XG4gICAgICAgICAgYXR0clZhbCA9IHJlZjtcbiAgICAgICAgfSBlbHNlIGlmICgodmFsLmF0dHJpYnV0ZSB8fCB2YWwuYm9vbGVhbikgJiYgaW5FcCkge1xuICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmF0dHJpYnV0ZSB8fCB2YWwuYm9vbGVhbjtcbiAgICAgICAgICBhdHRyVmFsID0gYHt7JHtyZWZ9fX1gO1xuICAgICAgICB9IGVsc2UgaWYgKHZhbC5hdHRyaWJ1dGUgJiYgaW5Ubykge1xuICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmF0dHJpYnV0ZTtcbiAgICAgICAgICBhdHRyVmFsID0gdG9WYWw7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsLmJvb2xlYW4pIHtcbiAgICAgICAgICBpZiAoaW5UbyAmJiAhaW5FcCAmJiB0b1ZhbCkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYm9vbGVhbjtcbiAgICAgICAgICAgIGF0dHJWYWwgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAvLyBqc2hpbnQgLVcwMzVcbiAgICAgICAgICAgIC8vIGVtcHR5IHRvIGlsbHVzdHJhdGUgdGhhdCBhIGJvb2xlYW4gd2lsbCBub3QgYmUgYWRkZWQgdmlhIHZhbC5ib3VuZFxuICAgICAgICAgICAgLy8gaWYgeW91IHdhbnQgaXQgYWRkZWQgdmlhIHZhbC5ib3VuZCwgdGhlbiBwdXQgaXQgaW4gZXhwcmVzc2lvblByb3BlcnRpZXNcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAodmFsLmJvdW5kICYmIGluVG8pIHtcbiAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5ib3VuZDtcbiAgICAgICAgICBhdHRyVmFsID0gcmVmO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJOYW1lKSAmJiBhbmd1bGFyLmlzRGVmaW5lZChhdHRyVmFsKSkge1xuICAgICAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbE5vZGVzLCBhdHRyTmFtZSwgYXR0clZhbCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIFV0aWxpdHkgZnVuY3Rpb25zXG4gIGZ1bmN0aW9uIGdldEJ1aWx0SW5BdHRyaWJ1dGVzKCkge1xuICAgIGxldCBuZ01vZGVsQXR0cmlidXRlcyA9IHtcbiAgICAgIGZvY3VzOiB7XG4gICAgICAgIGF0dHJpYnV0ZTogJ2Zvcm1seS1mb2N1cydcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IGJvdW5kT25seSA9IFtdO1xuICAgIGNvbnN0IGJvdGhCb29sZWFuQW5kQm91bmQgPSBbJ3JlcXVpcmVkJywgJ2Rpc2FibGVkJ107XG4gICAgY29uc3QgYm90aEF0dHJpYnV0ZUFuZEJvdW5kID0gWydwYXR0ZXJuJywgJ21pbmxlbmd0aCddO1xuICAgIGNvbnN0IGV4cHJlc3Npb25Pbmx5ID0gWydjaGFuZ2UnLCAna2V5ZG93bicsICdrZXl1cCcsICdrZXlwcmVzcycsICdjbGljaycsICdmb2N1cycsICdibHVyJ107XG4gICAgY29uc3QgYXR0cmlidXRlT25seSA9IFsncGxhY2Vob2xkZXInLCAnbWluJywgJ21heCcsICd0YWJpbmRleCcsICd0eXBlJ107XG4gICAgaWYgKGZvcm1seUNvbmZpZy5leHRyYXMubmdNb2RlbEF0dHJzTWFuaXB1bGF0b3JQcmVmZXJVbmJvdW5kKSB7XG4gICAgICBib3RoQXR0cmlidXRlQW5kQm91bmQucHVzaCgnbWF4bGVuZ3RoJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGJvdW5kT25seS5wdXNoKCdtYXhsZW5ndGgnKTtcbiAgICB9XG5cbiAgICBhbmd1bGFyLmZvckVhY2goYm91bmRPbmx5LCBpdGVtID0+IHtcbiAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW2l0ZW1dID0ge2JvdW5kOiAnbmctJyArIGl0ZW19O1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5mb3JFYWNoKGJvdGhCb29sZWFuQW5kQm91bmQsIGl0ZW0gPT4ge1xuICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7Ym9vbGVhbjogaXRlbSwgYm91bmQ6ICduZy0nICsgaXRlbX07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLmZvckVhY2goYm90aEF0dHJpYnV0ZUFuZEJvdW5kLCBpdGVtID0+IHtcbiAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW2l0ZW1dID0ge2F0dHJpYnV0ZTogaXRlbSwgYm91bmQ6ICduZy0nICsgaXRlbX07XG4gICAgfSk7XG5cbiAgICBhbmd1bGFyLmZvckVhY2goZXhwcmVzc2lvbk9ubHksIGl0ZW0gPT4ge1xuICAgICAgdmFyIHByb3BOYW1lID0gJ29uJyArIGl0ZW0uc3Vic3RyKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBpdGVtLnN1YnN0cigxKTtcbiAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW3Byb3BOYW1lXSA9IHtleHByZXNzaW9uOiAnbmctJyArIGl0ZW19O1xuICAgIH0pO1xuXG4gICAgYW5ndWxhci5mb3JFYWNoKGF0dHJpYnV0ZU9ubHksIGl0ZW0gPT4ge1xuICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7YXR0cmlidXRlOiBpdGVtfTtcbiAgICB9KTtcbiAgICByZXR1cm4gbmdNb2RlbEF0dHJpYnV0ZXM7XG4gIH1cblxuICBmdW5jdGlvbiBnZXRFcFZhbHVlKGVwLCBuYW1lKSB7XG4gICAgcmV0dXJuIGVwWyd0ZW1wbGF0ZU9wdGlvbnMuJyArIG5hbWVdIHx8XG4gICAgICBlcFtgdGVtcGxhdGVPcHRpb25zWycke25hbWV9J11gXSB8fFxuICAgICAgZXBbYHRlbXBsYXRlT3B0aW9uc1tcIiR7bmFtZX1cIl1gXTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGFkZElmTm90UHJlc2VudChub2RlcywgYXR0ciwgdmFsKSB7XG4gICAgYW5ndWxhci5mb3JFYWNoKG5vZGVzLCBub2RlID0+IHtcbiAgICAgIGlmICghbm9kZS5nZXRBdHRyaWJ1dGUoYXR0cikpIHtcbiAgICAgICAgbm9kZS5zZXRBdHRyaWJ1dGUoYXR0ciwgdmFsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcnVuL2Zvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yLmpzXG4gKiovIiwiZXhwb3J0IGRlZmF1bHQgYWRkQ3VzdG9tVGFncztcblxuLy8gQG5nSW5qZWN0XG5mdW5jdGlvbiBhZGRDdXN0b21UYWdzKCRkb2N1bWVudCkge1xuICBpZiAoJGRvY3VtZW50ICYmICRkb2N1bWVudC5nZXQpIHtcbiAgICAvL0lFOCBjaGVjayAtPlxuICAgIC8vIGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvMTA5NjQ5NjYvZGV0ZWN0LWllLXZlcnNpb24tcHJpb3ItdG8tdjktaW4tamF2YXNjcmlwdC8xMDk2NTIwMyMxMDk2NTIwM1xuICAgIGNvbnN0IGRvY3VtZW50ID0gJGRvY3VtZW50LmdldCgwKTtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgbHQgSUUgOV0+PGk+PC9pPjwhW2VuZGlmXS0tPic7XG4gICAgY29uc3QgaXNJZUxlc3NUaGFuOSA9IChkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2knKS5sZW5ndGggPT09IDEpO1xuXG4gICAgaWYgKGlzSWVMZXNzVGhhbjkpIHtcbiAgICAgIC8vYWRkIHRoZSBjdXN0b20gZWxlbWVudHMgdGhhdCB3ZSBuZWVkIGZvciBmb3JtbHlcbiAgICAgIGNvbnN0IGN1c3RvbUVsZW1lbnRzID0gW1xuICAgICAgICAnZm9ybWx5LWZpZWxkJywgJ2Zvcm1seS1mb3JtJywgJ2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbicsICdmb3JtbHktZm9jdXMnLCAnZm9ybWx5LXRyYW5zcG9zZSdcbiAgICAgIF07XG4gICAgICBhbmd1bGFyLmZvckVhY2goY3VzdG9tRWxlbWVudHMsIGVsID0+IHtcbiAgICAgICAgZG9jdW1lbnQuY3JlYXRlRWxlbWVudChlbCk7XG4gICAgICB9KTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3J1bi9mb3JtbHlDdXN0b21UYWdzLmpzXG4gKiovIiwiLy8gc29tZSB2ZXJzaW9ucyBvZiBhbmd1bGFyIGRvbid0IGV4cG9ydCB0aGUgYW5ndWxhciBtb2R1bGUgcHJvcGVybHksXG4vLyBzbyB3ZSBnZXQgaXQgZnJvbSB3aW5kb3cgaW4gdGhpcyBjYXNlLlxuaW1wb3J0IGFuZ3VsYXIgZnJvbSAnYW5ndWxhcic7XG5pZiAoIWFuZ3VsYXIudmVyc2lvbikge1xuICBhbmd1bGFyID0gd2luZG93LmFuZ3VsYXI7XG59XG5leHBvcnQgZGVmYXVsdCBhbmd1bGFyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYW5ndWxhci1maXgvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMTZfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImFwaUNoZWNrXCIsXCJhbWRcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanMyXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzXCI6XCJhcGktY2hlY2tcIn1cbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzE3X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgYW5ndWxhciBmcm9tICdhbmd1bGFyLWZpeCc7XG5cbmV4cG9ydCBkZWZhdWx0IHtmb3JtbHlFdmFsLCBnZXRGaWVsZElkLCByZXZlcnNlRGVlcE1lcmdlLCBmaW5kQnlOb2RlTmFtZSwgYXJyYXlpZnksIGV4dGVuZEZ1bmN0aW9ufTtcblxuZnVuY3Rpb24gZm9ybWx5RXZhbChzY29wZSwgZXhwcmVzc2lvbiwgJG1vZGVsVmFsdWUsICR2aWV3VmFsdWUpIHtcbiAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihleHByZXNzaW9uKSkge1xuICAgIHJldHVybiBleHByZXNzaW9uKCR2aWV3VmFsdWUsICRtb2RlbFZhbHVlLCBzY29wZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNjb3BlLiRldmFsKGV4cHJlc3Npb24sIHskdmlld1ZhbHVlLCAkbW9kZWxWYWx1ZX0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkSWQoZm9ybUlkLCBvcHRpb25zLCBpbmRleCkge1xuICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICB0eXBlID0gJ3RlbXBsYXRlJztcbiAgfSBlbHNlIGlmICghdHlwZSAmJiBvcHRpb25zLnRlbXBsYXRlVXJsKSB7XG4gICAgdHlwZSA9ICd0ZW1wbGF0ZVVybCc7XG4gIH1cblxuICByZXR1cm4gW2Zvcm1JZCwgdHlwZSwgb3B0aW9ucy5rZXksIGluZGV4XS5qb2luKCdfJyk7XG59XG5cblxuZnVuY3Rpb24gcmV2ZXJzZURlZXBNZXJnZShkZXN0KSB7XG4gIGFuZ3VsYXIuZm9yRWFjaChhcmd1bWVudHMsIChzcmMsIGluZGV4KSA9PiB7XG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhbmd1bGFyLmZvckVhY2goc3JjLCAodmFsLCBwcm9wKSA9PiB7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGRlc3RbcHJvcF0pKSB7XG4gICAgICAgIGRlc3RbcHJvcF0gPSBhbmd1bGFyLmNvcHkodmFsKTtcbiAgICAgIH0gZWxzZSBpZiAob2JqQW5kU2FtZVR5cGUoZGVzdFtwcm9wXSwgdmFsKSkge1xuICAgICAgICByZXZlcnNlRGVlcE1lcmdlKGRlc3RbcHJvcF0sIHZhbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvYmpBbmRTYW1lVHlwZShvYmoxLCBvYmoyKSB7XG4gIHJldHVybiBhbmd1bGFyLmlzT2JqZWN0KG9iajEpICYmIGFuZ3VsYXIuaXNPYmplY3Qob2JqMikgJiZcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqMSkgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmoyKTtcbn1cblxuLy9yZWN1cnNlIGRvd24gYSBub2RlIHRyZWUgdG8gZmluZCBhIG5vZGUgd2l0aCBtYXRjaGluZyBub2RlTmFtZSwgZm9yIGN1c3RvbSB0YWdzIGpRdWVyeS5maW5kIGRvZXNuJ3Qgd29yayBpbiBJRThcbmZ1bmN0aW9uIGZpbmRCeU5vZGVOYW1lKGVsLCBub2RlTmFtZSkge1xuICBpZiAoIWVsLnByb3ApIHsgLy8gbm90IGEgalF1ZXJ5IG9yIGpxTGl0ZSBvYmplY3QgLT4gd3JhcCBpdFxuICAgIGVsID0gYW5ndWxhci5lbGVtZW50KGVsKTtcbiAgfVxuXG4gIGlmIChlbC5wcm9wKCdub2RlTmFtZScpID09PSBub2RlTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgdmFyIGMgPSBlbC5jaGlsZHJlbigpO1xuICBmb3IodmFyIGkgPSAwOyBjICYmIGkgPCBjLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG5vZGUgPSBmaW5kQnlOb2RlTmFtZShjW2ldLCBub2RlTmFtZSk7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgfVxufVxuXG5cbmZ1bmN0aW9uIGFycmF5aWZ5KG9iaikge1xuICBpZiAob2JqICYmICFhbmd1bGFyLmlzQXJyYXkob2JqKSkge1xuICAgIG9iaiA9IFtvYmpdO1xuICB9IGVsc2UgaWYgKCFvYmopIHtcbiAgICBvYmogPSBbXTtcbiAgfVxuICByZXR1cm4gb2JqO1xufVxuXG5cbmZ1bmN0aW9uIGV4dGVuZEZ1bmN0aW9uKC4uLmZucykge1xuICByZXR1cm4gZnVuY3Rpb24gZXh0ZW5kZWRGdW5jdGlvbigpIHtcbiAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICBmbnMuZm9yRWFjaChmbiA9PiBmbi5hcHBseShudWxsLCBhcmdzKSk7XG4gIH07XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9vdGhlci91dGlscy5qc1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=