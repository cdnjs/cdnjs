// angular-formly version 4.1.0 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("api-check"), require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["api-check", "angular"], factory);
	else if(typeof exports === 'object')
		exports["ngFormly"] = factory(require("api-check"), require("angular"));
	else
		root["ngFormly"] = factory(root["apiCheck"], root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_9__) {
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
	
	module.exports = __webpack_require__(1);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var apiCheck = __webpack_require__(2);
	if (!apiCheck) {
	  throw new Error("angular-formly requires the library apiCheck.js! Please include it! " + __webpack_require__(3) + "apicheckjs-dependency-required");
	}
	var ngModuleName = "formly";
	var angular = __webpack_require__(4);
	var ngModule = angular.module(ngModuleName, []);
	
	__webpack_require__(5)(ngModule);
	__webpack_require__(6)(ngModule);
	__webpack_require__(7)(ngModule);
	__webpack_require__(8)(ngModule);
	
	module.exports = ngModuleName;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = "https://github.com/formly-js/angular-formly/blob/" + ("4.1.0") + "/other/ERRORS_AND_WARNINGS.md#";

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// some versions of angular don't export the angular module properly,
	// so we get it from window in this case.
	var angular = __webpack_require__(9);
	if (!angular.version) {
	  angular = window.angular;
	}
	module.exports = angular;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(10)(ngModule);
	  __webpack_require__(11)(ngModule);
	  __webpack_require__(12)(ngModule);
	  __webpack_require__(13)(ngModule);
	  __webpack_require__(14)(ngModule);
	  __webpack_require__(15)(ngModule);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(16)(ngModule);
	  __webpack_require__(17)(ngModule);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(18)(ngModule);
	  __webpack_require__(19)(ngModule);
	  __webpack_require__(20)(ngModule);
	  __webpack_require__(21)(ngModule);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(22)(ngModule);
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	
	  var apiCheck = __webpack_require__(2)({
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
	      //console.log(propName, propExists, prop, otherPropsExist, otherProps.join(', '));
	      if (!otherPropsExist && !propExists) {
	        return apiCheck.utils.getError(propName, location, type);
	      } else if (propExists) {
	        return propChecker(prop, propName, location, obj);
	      }
	    }
	    shapeRequiredIfNotDefinition.type = type;
	    apiCheck.utils.checkerHelpers.setupChecker(shapeRequiredIfNotDefinition);
	    return shapeRequiredIfNotDefinition;
	  }
	
	  ngModule.constant("formlyApiCheck", apiCheck);
	  if (false) {
	    require("./formlyApiCheck.test")(ngModule);
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
	      messages: apiCheck.objectOf(apiCheck.func).optional,
	      errorExistsAndShouldBeVisible: apiCheck.bool.optional
	    }).optional,
	    formControl: apiCheck.object.optional,
	    value: apiCheck.func.optional,
	    runExpressions: apiCheck.func.optional
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
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(4);
	
	module.exports = function (ngModule) {
	  ngModule.provider("formlyUsability", ["formlyVersion", "formlyApiCheck", function (formlyVersion, formlyApiCheck) {
	    var _this = this;
	
	    var errorsAndWarningsUrlPrefix = "https://github.com/formly-js/angular-formly/blob/" + formlyVersion + "/other/ERRORS_AND_WARNINGS.md#";
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
	        url = "" + errorsAndWarningsUrlPrefix + "" + errorInfoSlug;
	      }
	      return "Formly Error: " + message + ". " + url;
	    }
	
	    function checkWrapper(wrapper) {
	      formlyApiCheck["throw"](formlyApiCheck.formlyWrapperType, arguments, {
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
	  }]);
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(4);
	var utils = __webpack_require__(23);
	
	module.exports = function (ngModule) {
	  ngModule.provider("formlyConfig", formlyConfig);
	
	  formlyConfig.tests = false ? require("./formlyConfig.test")(ngModule) : null;
	
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
	        ngModelAttrsManipulatorPreferBound: false
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
	      formlyApiCheck["throw"](formlyApiCheck.formlyTypeOptions, arguments, {
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
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyVersion", ("4.1.0"));
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyErrorAndWarningsUrlPrefix", "https://github.com/formly-js/angular-formly/blob/" + ("4.1.0") + "/other/ERRORS_AND_WARNINGS.md#");
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.factory("formlyValidationMessages", function () {
	
	    var formlyValidationMessages = {
	      addTemplateOptionValueMessage: addTemplateOptionValueMessage,
	      addStringMessage: addStringMessage,
	      messages: {}
	    };
	
	    return formlyValidationMessages;
	
	    function addTemplateOptionValueMessage(name, prop, prefix, suffix, alternate) {
	      formlyValidationMessages.messages[name] = templateOptionValue(prop, prefix, suffix, alternate);
	    }
	
	    function addStringMessage(name, string) {
	      formlyValidationMessages.messages[name] = function () {
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
	  });
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var utils = __webpack_require__(23);
	
	module.exports = function (ngModule) {
	  ngModule.factory("formlyUtil", formlyUtil);
	
	  formlyUtil.tests = false ? require("./formlyUtil.test")(ngModule) : null;
	
	  function formlyUtil() {
	    return utils;
	  }
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	module.exports = function (ngModule) {
	  ngModule.factory("formlyWarn", ["formlyConfig", "formlyErrorAndWarningsUrlPrefix", "$log", function (formlyConfig, formlyErrorAndWarningsUrlPrefix, $log) {
	    return function warn() {
	      if (!formlyConfig.disableWarnings) {
	        var args = Array.prototype.slice.call(arguments);
	        var warnInfoSlug = args.shift();
	        args.unshift("Formly Warning:");
	        args.push("" + formlyErrorAndWarningsUrlPrefix + "" + warnInfoSlug);
	        $log.warn.apply($log, _toConsumableArray(args));
	      }
	    };
	  }]);
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyCustomValidation", formlyCustomValidation);
	
	  formlyCustomValidation.tests = false ? require("./formly-custom-validation.test")(ngModule) : null;
	
	  function formlyCustomValidation(formlyUtil, $q) {
	    return {
	      restrict: "A",
	      require: "ngModel",
	      link: function link(scope, el, attrs, ctrl) {
	        var validators = scope.$eval(attrs.formlyCustomValidation);
	        if (!validators) {
	          return;
	        }
	        checkValidators(validators);
	        scope.options.validation.messages = scope.options.validation.messages || {};
	
	        var useNewValidatorsApi = ctrl.hasOwnProperty("$validators") && !attrs.hasOwnProperty("useParsers");
	        angular.forEach(validators, function (validator, name) {
	          var message = validator.message;
	          if (message) {
	            scope.options.validation.messages[name] = function () {
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
	};

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(4);
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyField", formlyField);
	
	  formlyField.tests = false ? require("./formly-field.test")(ngModule) : null;
	
	  /**
	   * @ngdoc directive
	   * @name formlyField
	   * @restrict AE
	   */
	  function formlyField($http, $q, $compile, $templateCache, formlyConfig, formlyValidationMessages, formlyApiCheck, formlyUtil, formlyUsability, formlyWarn) {
	    return {
	      restrict: "AE",
	      transclude: true,
	      scope: {
	        options: "=",
	        model: "=",
	        formId: "=?",
	        index: "=?",
	        fields: "=?",
	        formState: "=?",
	        form: "=?"
	      },
	      controller: ["$scope", "$timeout", "$parse", "$controller", function fieldController($scope, $timeout, $parse, $controller) {
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
	          angular.extend(options, {
	            // attach the key in case the formly-field directive is used directly
	            key: options.key || index || 0,
	            value: valueGetterSetter,
	            runExpressions: runExpressions
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
	              return scope.fc.$invalid && scope.fc.$touched;
	            }
	          }, function (show) {
	            options.validation.errorExistsAndShouldBeVisible = show;
	            scope.showError = show; // shortcut for template authors
	          });
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
	      formlyApiCheck["throw"](formlyApiCheck.formlyFieldOptions, arguments, {
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
	      instance[fn](shape, [options], apiCheckOptions || {
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
	};

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };
	
	var _slice = Array.prototype.slice;
	var angular = __webpack_require__(4);
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyForm", formlyForm);
	
	  formlyForm.tests = false ? require("./formly-form.test")(ngModule) : null;
	
	  /**
	   * @ngdoc directive
	   * @name formlyForm
	   * @restrict E
	   */
	  function formlyForm(formlyUsability) {
	    var currentFormId = 1;
	    return {
	      restrict: "E",
	      template: function template(el, attrs) {
	        /* jshint -W033 */ // this because jshint is broken I guess...
	        var rootEl = attrs.rootEl || "ng-form";
	        return "\n          <" + rootEl + " class=\"formly\"\n                   name=\"form\"\n                   role=\"form\">\n            <div formly-field\n                 ng-repeat=\"field in fields track by $index\"\n                 ng-if=\"!field.hide\"\n                 class=\"formly-field {{field.type ? 'formly-field-' + field.type : ''}}\"\n                 options=\"field\"\n                 model=\"field.model || model\"\n                 fields=\"fields\"\n                 form=\"form\"\n                 form-id=\"formId\"\n                 form-state=\"options.formState\"\n                 index=\"$index\">\n            </div>\n            <div ng-transclude></div>\n          </" + rootEl + ">\n        ";
	      },
	      replace: true,
	      transclude: true,
	      scope: {
	        fields: "=",
	        model: "=", // we'll do our own warning to help with migrations
	        form: "=?",
	        options: "=?"
	      },
	      controller: ["$scope", function controller($scope) {
	        $scope.formId = "formly_" + currentFormId++;
	        $scope.options = $scope.options || {};
	        $scope.options.formState = $scope.options.formState || {};
	
	        angular.forEach($scope.fields, attachKey); // attaches a key based on the index if a key isn't specified
	        angular.forEach($scope.fields, setupWatchers); // setup watchers for all fields
	
	        // watch the model and evaluate watch expressions that depend on it.
	        $scope.$watch("model", function onResultUpdate(newResult) {
	          angular.forEach($scope.fields, function (field) {
	            /*jshint -W030 */
	            field.runExpressions && field.runExpressions(newResult);
	          });
	        }, true);
	
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
	      }],
	      link: function link(scope, el, attrs) {
	        if (attrs.hasOwnProperty("result")) {
	          throw formlyUsability.getFormlyError("The \"result\" attribute on a formly-form is no longer valid. Use \"model\" instead");
	        }
	        if (attrs.name !== "form") {
	          // then they specified their own name
	          throw formlyUsability.getFormlyError("The \"name\" attribute on a formly-form is no longer valid. Use \"form\" instead");
	        }
	      }
	    };
	  }
	  formlyForm.$inject = ["formlyUsability"];
	};

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyFocus", ["$timeout", "$document", function ($timeout, $document) {
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
	  }]);
	};

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.run(addFormlyNgModelAttrsManipulator);
	
	  function addFormlyNgModelAttrsManipulator(formlyConfig) {
	    if (formlyConfig.extras.disableNgModelAttrsManipulator) {
	      return;
	    }
	    formlyConfig.templateManipulators.preWrapper.push(ngModelAttrsManipulator);
	
	    function ngModelAttrsManipulator(template, options, scope) {
	      /* jshint maxcomplexity:7 */
	      var el = angular.element("<a></a>");
	      var data = options.data;
	      if (data.noTouchy) {
	        return template;
	      }
	      el.append(template);
	      var modelEls = angular.element(el[0].querySelectorAll("[ng-model]"));
	      if (!modelEls || !modelEls.length) {
	        return template;
	      }
	
	      addIfNotPresent(modelEls, "id", scope.id);
	      addIfNotPresent(modelEls, "name", scope.id);
	
	      if (angular.isDefined(options.validators)) {
	        addIfNotPresent(modelEls, "formly-custom-validation", "options.validators");
	      }
	      if (angular.isDefined(options.modelOptions)) {
	        addIfNotPresent(modelEls, "ng-model-options", "options.modelOptions");
	        if (options.modelOptions.getterSetter) {
	          modelEls.attr("ng-model", "options.value");
	        }
	      }
	      addTemplateOptionsAttrs();
	
	      return el.html();
	
	      function addTemplateOptionsAttrs() {
	        if (!options.templateOptions && !options.expressionProperties) {
	          // no need to run these if there are no templateOptions or expressionProperties
	          return;
	        }
	        var to = options.templateOptions || {};
	        var ep = options.expressionProperties || {};
	
	        var ngModelAttributes = getBuiltinAttributes();
	
	        // extend with the user's specifications winning
	        angular.extend(ngModelAttributes, options.ngModelAttrs);
	
	        angular.forEach(ngModelAttributes, function (val, name) {
	          /* jshint maxcomplexity:10 */
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
	          } else if (val.attribute && inEp) {
	            attrName = val.attribute;
	            attrVal = "{{" + ref + "}}";
	          } else if (val.attribute && inTo) {
	            attrName = val.attribute;
	            attrVal = toVal;
	          } else if (val.bound && inTo) {
	            attrName = val.bound;
	            attrVal = ref;
	          }
	          if (angular.isDefined(attrName) && angular.isDefined(attrVal)) {
	            addIfNotPresent(modelEls, attrName, attrVal);
	          }
	        });
	      }
	
	      function getBuiltinAttributes() {
	        var ngModelAttributes = {
	          focus: {
	            attribute: "formly-focus"
	          }
	        };
	        var boundOnly = [];
	        var bothAttributeAndBound = ["required", "disabled", "pattern", "minlength"];
	        var expressionOnly = ["change", "keydown", "keyup", "keypress", "click", "focus", "blur"];
	        var attributeOnly = ["placeholder", "min", "max", "tabindex", "type"];
	        if (formlyConfig.extras.ngModelAttrsManipulatorPreferBound) {
	          boundOnly.push("maxlength");
	        } else {
	          bothAttributeAndBound.push("maxlength");
	        }
	
	        angular.forEach(boundOnly, function (item) {
	          ngModelAttributes[item] = { bound: "ng-" + item };
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
	
	      function addIfNotPresent(el, attr, val) {
	        if (!el.attr(attr)) {
	          el.attr(attr, val);
	        }
	      }
	    }
	  }
	  addFormlyNgModelAttrsManipulator.$inject = ["formlyConfig"];
	};

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(4);
	
	module.exports = { formlyEval: formlyEval, getFieldId: getFieldId, reverseDeepMerge: reverseDeepMerge };
	
	function formlyEval(scope, expression, modelValue, viewValue) {
	  if (angular.isFunction(expression)) {
	    return expression(viewValue || modelValue, modelValue, scope);
	  } else {
	    return scope.$eval(expression, {
	      $viewValue: viewValue || modelValue,
	      $modelValue: modelValue
	    });
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

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA5YTdiMmRhNDg1ODM5MTE4MzNmNyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImFwaUNoZWNrXCIsXCJhbWRcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanMyXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzXCI6XCJhcGktY2hlY2tcIn0iLCJ3ZWJwYWNrOi8vLy4vb3RoZXIvZG9jc0Jhc2VVcmwuanMiLCJ3ZWJwYWNrOi8vLy4vYW5ndWxhci1maXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5QXBpQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seVVzYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlWZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvZm9ybWx5VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9mb3JtbHlXYXJuLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWZpZWxkLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktZm9jdXMuanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2Zvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yLmpzIiwid2VicGFjazovLy8uL290aGVyL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7Ozs7QUN0Q0EsT0FBTSxDQUFDLE9BQU8sR0FBRyxtQkFBTyxDQUFDLENBQWdCLENBQUMsQzs7Ozs7Ozs7QUNBMUMsS0FBTSxRQUFRLEdBQUcsbUJBQU8sQ0FBQyxDQUFXLENBQUMsQ0FBQztBQUN0QyxLQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2IsU0FBTSxJQUFJLEtBQUssQ0FDYixzRUFBc0UsR0FDcEUsbUJBQU8sQ0FBQyxDQUFxQixDQUFDLEdBQUcsZ0NBQWdDLENBQ3BFLENBQUM7RUFDSDtBQUNELEtBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQztBQUM5QixLQUFNLE9BQU8sR0FBRyxtQkFBTyxDQUFDLENBQWUsQ0FBQyxDQUFDO0FBQ3pDLEtBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVBQUUsQ0FBQyxDQUFDOztBQUVsRCxvQkFBTyxDQUFDLENBQWEsQ0FB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QixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQztNQUNGLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztFQUNKOztBQUVELFVBQVMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDbEMsVUFBTyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQ3JELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFwaS1jaGVja1wiKSwgcmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiYXBpLWNoZWNrXCIsIFwiYW5ndWxhclwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJuZ0Zvcm1seVwiXSA9IGZhY3RvcnkocmVxdWlyZShcImFwaS1jaGVja1wiKSwgcmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5nRm9ybWx5XCJdID0gZmFjdG9yeShyb290W1wiYXBpQ2hlY2tcIl0sIHJvb3RbXCJhbmd1bGFyXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDlhN2IyZGE0ODU4MzkxMTgzM2Y3XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2luZGV4LmNvbW1vbicpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanNcbiAqKi8iLCJjb25zdCBhcGlDaGVjayA9IHJlcXVpcmUoJ2FwaS1jaGVjaycpO1xuaWYgKCFhcGlDaGVjaykge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ2FuZ3VsYXItZm9ybWx5IHJlcXVpcmVzIHRoZSBsaWJyYXJ5IGFwaUNoZWNrLmpzISBQbGVhc2UgaW5jbHVkZSBpdCEgJyArXG4gICAgICByZXF1aXJlKCcuL290aGVyL2RvY3NCYXNlVXJsJykgKyAnYXBpY2hlY2tqcy1kZXBlbmRlbmN5LXJlcXVpcmVkJ1xuICApO1xufVxuY29uc3QgbmdNb2R1bGVOYW1lID0gJ2Zvcm1seSc7XG5jb25zdCBhbmd1bGFyID0gcmVxdWlyZSgnLi9hbmd1bGFyLWZpeCcpO1xuY29uc3QgbmdNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShuZ01vZHVsZU5hbWUsIFtdKTtcblxucmVxdWlyZSgnLi9wcm92aWRlcnMnKShuZ01vZHVsZSk7XG5yZXF1aXJlKCcuL3NlcnZpY2VzJykobmdNb2R1bGUpO1xucmVxdWlyZSgnLi9kaXJlY3RpdmVzJykobmdNb2R1bGUpO1xucmVxdWlyZSgnLi9ydW4nKShuZ01vZHVsZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGVOYW1lO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguY29tbW9uLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImFwaUNoZWNrXCIsXCJhbWRcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanMyXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzXCI6XCJhcGktY2hlY2tcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBgaHR0cHM6Ly9naXRodWIuY29tL2Zvcm1seS1qcy9hbmd1bGFyLWZvcm1seS9ibG9iLyR7VkVSU0lPTn0vb3RoZXIvRVJST1JTX0FORF9XQVJOSU5HUy5tZCNgO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vb3RoZXIvZG9jc0Jhc2VVcmwuanNcbiAqKi8iLCIvLyBzb21lIHZlcnNpb25zIG9mIGFuZ3VsYXIgZG9uJ3QgZXhwb3J0IHRoZSBhbmd1bGFyIG1vZHVsZSBwcm9wZXJseSxcbi8vIHNvIHdlIGdldCBpdCBmcm9tIHdpbmRvdyBpbiB0aGlzIGNhc2UuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbmlmICghYW5ndWxhci52ZXJzaW9uKSB7XG4gIGFuZ3VsYXIgPSB3aW5kb3cuYW5ndWxhcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2FuZ3VsYXItZml4L2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIHJlcXVpcmUoJy4vZm9ybWx5QXBpQ2hlY2snKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoJy4vZm9ybWx5VXNhYmlsaXR5JykobmdNb2R1bGUpO1xuICByZXF1aXJlKCcuL2Zvcm1seUNvbmZpZycpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZSgnLi9mb3JtbHlWZXJzaW9uJykobmdNb2R1bGUpO1xuICByZXF1aXJlKCcuL2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXgnKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoJy4vZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzJykobmdNb2R1bGUpO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICByZXF1aXJlKCcuL2Zvcm1seVV0aWwnKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoJy4vZm9ybWx5V2FybicpKG5nTW9kdWxlKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9zZXJ2aWNlcy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICByZXF1aXJlKCcuL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbicpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZSgnLi9mb3JtbHktZmllbGQnKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoJy4vZm9ybWx5LWZvcm0nKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoJy4vZm9ybWx5LWZvY3VzJykobmdNb2R1bGUpO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgcmVxdWlyZSgnLi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcicpKG5nTW9kdWxlKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9ydW4vaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOV9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcblxuICBsZXQgYXBpQ2hlY2sgPSByZXF1aXJlKCdhcGktY2hlY2snKSh7XG4gICAgb3V0cHV0OiB7XG4gICAgICBwcmVmaXg6ICdhbmd1bGFyLWZvcm1seTonLFxuICAgICAgZG9jc0Jhc2VVcmw6IHJlcXVpcmUoJy4uL290aGVyL2RvY3NCYXNlVXJsJylcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNoYXBlUmVxdWlyZWRJZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIGlmICghYW5ndWxhci5pc0FycmF5KG90aGVyUHJvcHMpKSB7XG4gICAgICBvdGhlclByb3BzID0gW290aGVyUHJvcHNdO1xuICAgIH1cbiAgICBjb25zdCB0eXBlID0gYHNwZWNpZmllZCBpZiB0aGVzZSBhcmUgbm90IHNwZWNpZmllZDogXFxgJHtvdGhlclByb3BzLmpvaW4oJywgJyl9XFxgIChvdGhlcndpc2UgaXQncyBvcHRpb25hbClgO1xuICAgIGZ1bmN0aW9uIHNoYXBlUmVxdWlyZWRJZk5vdERlZmluaXRpb24ocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopIHtcbiAgICAgIHZhciBwcm9wRXhpc3RzID0gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgICB2YXIgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKGZ1bmN0aW9uIChvdGhlclByb3ApIHtcbiAgICAgICAgcmV0dXJuIG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkob3RoZXJQcm9wKTtcbiAgICAgIH0pO1xuICAgICAgLy9jb25zb2xlLmxvZyhwcm9wTmFtZSwgcHJvcEV4aXN0cywgcHJvcCwgb3RoZXJQcm9wc0V4aXN0LCBvdGhlclByb3BzLmpvaW4oJywgJykpO1xuICAgICAgaWYgKCFvdGhlclByb3BzRXhpc3QgJiYgIXByb3BFeGlzdHMpIHtcbiAgICAgICAgcmV0dXJuIGFwaUNoZWNrLnV0aWxzLmdldEVycm9yKHByb3BOYW1lLCBsb2NhdGlvbiwgdHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKHByb3BFeGlzdHMpIHtcbiAgICAgICAgcmV0dXJuIHByb3BDaGVja2VyKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gICAgc2hhcGVSZXF1aXJlZElmTm90RGVmaW5pdGlvbi50eXBlID0gdHlwZTtcbiAgICBhcGlDaGVjay51dGlscy5jaGVja2VySGVscGVycy5zZXR1cENoZWNrZXIoc2hhcGVSZXF1aXJlZElmTm90RGVmaW5pdGlvbik7XG4gICAgcmV0dXJuIHNoYXBlUmVxdWlyZWRJZk5vdERlZmluaXRpb247XG4gIH1cblxuICBuZ01vZHVsZS5jb25zdGFudCgnZm9ybWx5QXBpQ2hlY2snLCBhcGlDaGVjayk7XG4gIGlmIChPTl9URVNUKSB7XG4gICAgcmVxdWlyZSgnLi9mb3JtbHlBcGlDaGVjay50ZXN0JykobmdNb2R1bGUpO1xuICB9XG5cbiAgbGV0IGZvcm1seUV4cHJlc3Npb24gPSBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suZnVuY10pO1xuICBsZXQgc3BlY2lmeVdyYXBwZXJUeXBlID0gYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICBhcGlDaGVjay5vbmVPZihbbnVsbF0pLCBhcGlDaGVjay50eXBlT3JBcnJheU9mKGFwaUNoZWNrLnN0cmluZylcbiAgXSk7XG5cbiAgY29uc3QgYXBpQ2hlY2tQcm9wZXJ0eSA9IGFwaUNoZWNrLm9iamVjdE9mKGFwaUNoZWNrLmZ1bmMpO1xuXG4gIGNvbnN0IGFwaUNoZWNrSW5zdGFuY2VQcm9wZXJ0eSA9IGFwaUNoZWNrLnNoYXBlLm9ubHlJZignYXBpQ2hlY2snLCBhcGlDaGVjay5mdW5jLndpdGhQcm9wZXJ0aWVzKHtcbiAgICB3YXJuOiBhcGlDaGVjay5mdW5jLFxuICAgIHRocm93OiBhcGlDaGVjay5mdW5jLFxuICAgIHNoYXBlOiBhcGlDaGVjay5mdW5jXG4gIH0pKTtcblxuICBjb25zdCBhcGlDaGVja0Z1bmN0aW9uUHJvcGVydHkgPSBhcGlDaGVjay5zaGFwZS5vbmx5SWYoJ2FwaUNoZWNrJywgYXBpQ2hlY2sub25lT2YoWyd0aHJvdycsICd3YXJuJ10pKTtcblxuICBjb25zdCBmb3JtbHlXcmFwcGVyVHlwZSA9IGFwaUNoZWNrLnNoYXBlKHtcbiAgICBuYW1lOiBzaGFwZVJlcXVpcmVkSWZOb3QoJ3R5cGVzJywgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICB0ZW1wbGF0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ3RlbXBsYXRlVXJsJywgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICB0ZW1wbGF0ZVVybDogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ3RlbXBsYXRlJywgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICB0eXBlczogYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIG92ZXJ3cml0ZU9rOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsLFxuICAgIHZhbGlkYXRlT3B0aW9uczogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICBhcGlDaGVjazogYXBpQ2hlY2tQcm9wZXJ0eS5vcHRpb25hbCxcbiAgICBhcGlDaGVja0luc3RhbmNlOiBhcGlDaGVja0luc3RhbmNlUHJvcGVydHkub3B0aW9uYWwsXG4gICAgYXBpQ2hlY2tGdW5jdGlvbjogYXBpQ2hlY2tGdW5jdGlvblByb3BlcnR5Lm9wdGlvbmFsLFxuICAgIGFwaUNoZWNrT3B0aW9uczogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsXG4gIH0pLnN0cmljdDtcblxuICBsZXQgZmllbGRPcHRpb25zQXBpU2hhcGUgPSB7XG4gICAgdHlwZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoWyd0ZW1wbGF0ZScsICd0ZW1wbGF0ZVVybCddLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIHRlbXBsYXRlOiBhcGlDaGVjay5zaGFwZS5pZk5vdChbJ3R5cGUnLCAndGVtcGxhdGVVcmwnXSwgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICB0ZW1wbGF0ZVVybDogYXBpQ2hlY2suc2hhcGUuaWZOb3QoWyd0eXBlJywgJ3RlbXBsYXRlJ10sIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAga2V5OiBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2subnVtYmVyXSksXG4gICAgbW9kZWw6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgICBleHByZXNzaW9uUHJvcGVydGllczogYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICAgIGZvcm1seUV4cHJlc3Npb24sXG4gICAgICBhcGlDaGVjay5zaGFwZSh7XG4gICAgICAgIGV4cHJlc3Npb246IGZvcm1seUV4cHJlc3Npb24sXG4gICAgICAgIG1lc3NhZ2U6IGZvcm1seUV4cHJlc3Npb24ub3B0aW9uYWxcbiAgICAgIH0pLnN0cmljdFxuICAgIF0pKS5vcHRpb25hbCxcbiAgICBkYXRhOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gICAgdGVtcGxhdGVPcHRpb25zOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gICAgd3JhcHBlcjogc3BlY2lmeVdyYXBwZXJUeXBlLm9wdGlvbmFsLFxuICAgIG1vZGVsT3B0aW9uczogYXBpQ2hlY2suc2hhcGUoe1xuICAgICAgdXBkYXRlT246IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbCxcbiAgICAgIGRlYm91bmNlOiBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgICAgICBhcGlDaGVjay5vYmplY3QsIGFwaUNoZWNrLnN0cmluZ1xuICAgICAgXSkub3B0aW9uYWwsXG4gICAgICBhbGxvd0ludmFsaWQ6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgICBnZXR0ZXJTZXR0ZXI6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgICB0aW1lem9uZTogYXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsXG4gICAgfSkub3B0aW9uYWwsXG4gICAgd2F0Y2hlcjogYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihcbiAgICAgIGFwaUNoZWNrLnNoYXBlKHtcbiAgICAgICAgZXhwcmVzc2lvbjogZm9ybWx5RXhwcmVzc2lvbi5vcHRpb25hbCxcbiAgICAgICAgbGlzdGVuZXI6IGZvcm1seUV4cHJlc3Npb25cbiAgICAgIH0pXG4gICAgKS5vcHRpb25hbCxcbiAgICB2YWxpZGF0b3JzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgICAgZm9ybWx5RXhwcmVzc2lvbiwgYXBpQ2hlY2suc2hhcGUoe1xuICAgICAgICBleHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLFxuICAgICAgICBtZXNzYWdlOiBmb3JtbHlFeHByZXNzaW9uLm9wdGlvbmFsXG4gICAgICB9KS5zdHJpY3RcbiAgICBdKSkub3B0aW9uYWwsXG4gICAgbm9Gb3JtQ29udHJvbDogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgICBoaWRlOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsLFxuICAgIG5nTW9kZWxBdHRyczogYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2suc2hhcGUoe1xuICAgICAgZXhwcmVzc2lvbjogYXBpQ2hlY2suc2hhcGUuaWZOb3QoWyd2YWx1ZScsICdhdHRyaWJ1dGUnLCAnYm91bmQnXSwgYXBpQ2hlY2suYW55KS5vcHRpb25hbCxcbiAgICAgIHZhbHVlOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgnZXhwcmVzc2lvbicsIGFwaUNoZWNrLmFueSkub3B0aW9uYWwsXG4gICAgICBhdHRyaWJ1dGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCdleHByZXNzaW9uJywgYXBpQ2hlY2suYW55KS5vcHRpb25hbCxcbiAgICAgIGJvdW5kOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgnZXhwcmVzc2lvbicsIGFwaUNoZWNrLmFueSkub3B0aW9uYWxcbiAgICB9KS5zdHJpY3QpLm9wdGlvbmFsLFxuICAgIG9wdGlvbnNUeXBlczogYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIGxpbms6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgY29udHJvbGxlcjogYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICAgIGFwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suZnVuYywgYXBpQ2hlY2suYXJyYXlcbiAgICBdKS5vcHRpb25hbCxcbiAgICB2YWxpZGF0aW9uOiBhcGlDaGVjay5zaGFwZSh7XG4gICAgICBzaG93OiBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgICAgICBhcGlDaGVjay5ib29sLCBhcGlDaGVjay5vbmVPZihbbnVsbF0pXG4gICAgICBdKS5vcHRpb25hbCxcbiAgICAgIG1lc3NhZ2VzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5mdW5jKS5vcHRpb25hbCxcbiAgICAgIGVycm9yRXhpc3RzQW5kU2hvdWxkQmVWaXNpYmxlOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsXG4gICAgfSkub3B0aW9uYWwsXG4gICAgZm9ybUNvbnRyb2w6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgICB2YWx1ZTogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICBydW5FeHByZXNzaW9uczogYXBpQ2hlY2suZnVuYy5vcHRpb25hbFxuICB9O1xuXG4gIGxldCBmb3JtbHlGaWVsZE9wdGlvbnMgPSBhcGlDaGVjay5zaGFwZShmaWVsZE9wdGlvbnNBcGlTaGFwZSkuc3RyaWN0O1xuXG4gIGxldCB0eXBlT3B0aW9uc0RlZmF1bHRPcHRpb25zID0gYW5ndWxhci5jb3B5KGZpZWxkT3B0aW9uc0FwaVNoYXBlKTtcbiAgdHlwZU9wdGlvbnNEZWZhdWx0T3B0aW9ucy5rZXkgPSBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWw7XG5cbiAgbGV0IGZvcm1seVR5cGVPcHRpb25zID0gYXBpQ2hlY2suc2hhcGUoe1xuICAgIG5hbWU6IGFwaUNoZWNrLnN0cmluZyxcbiAgICB0ZW1wbGF0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ3RlbXBsYXRlVXJsJywgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICB0ZW1wbGF0ZVVybDogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ3RlbXBsYXRlJywgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICBjb250cm9sbGVyOiBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgICAgYXBpQ2hlY2suZnVuYywgYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5hcnJheVxuICAgIF0pLm9wdGlvbmFsLFxuICAgIGxpbms6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgZGVmYXVsdE9wdGlvbnM6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICBhcGlDaGVjay5mdW5jLCBhcGlDaGVjay5zaGFwZSh0eXBlT3B0aW9uc0RlZmF1bHRPcHRpb25zKVxuICAgIF0pLm9wdGlvbmFsLFxuICAgIGV4dGVuZHM6IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbCxcbiAgICB3cmFwcGVyOiBzcGVjaWZ5V3JhcHBlclR5cGUub3B0aW9uYWwsXG4gICAgZGF0YTogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICAgIHZhbGlkYXRlT3B0aW9uczogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICBhcGlDaGVjazogYXBpQ2hlY2tQcm9wZXJ0eS5vcHRpb25hbCxcbiAgICBhcGlDaGVja0luc3RhbmNlOiBhcGlDaGVja0luc3RhbmNlUHJvcGVydHkub3B0aW9uYWwsXG4gICAgYXBpQ2hlY2tGdW5jdGlvbjogYXBpQ2hlY2tGdW5jdGlvblByb3BlcnR5Lm9wdGlvbmFsLFxuICAgIGFwaUNoZWNrT3B0aW9uczogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICAgIG92ZXJ3cml0ZU9rOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsXG4gIH0pLnN0cmljdDtcblxuICBhbmd1bGFyLmV4dGVuZChhcGlDaGVjaywge1xuICAgIGZvcm1seVR5cGVPcHRpb25zLCBmb3JtbHlGaWVsZE9wdGlvbnMsIGZvcm1seUV4cHJlc3Npb24sIGZvcm1seVdyYXBwZXJUeXBlXG4gIH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9mb3JtbHlBcGlDaGVjay5qc1xuICoqLyIsInZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhci1maXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLnByb3ZpZGVyKCdmb3JtbHlVc2FiaWxpdHknLCBmdW5jdGlvbihmb3JtbHlWZXJzaW9uLCBmb3JtbHlBcGlDaGVjaykge1xuICAgIHZhciBlcnJvcnNBbmRXYXJuaW5nc1VybFByZWZpeCA9XG4gICAgICBgaHR0cHM6Ly9naXRodWIuY29tL2Zvcm1seS1qcy9hbmd1bGFyLWZvcm1seS9ibG9iLyR7Zm9ybWx5VmVyc2lvbn0vb3RoZXIvRVJST1JTX0FORF9XQVJOSU5HUy5tZCNgO1xuICAgIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsIHtcbiAgICAgIGdldEZvcm1seUVycm9yOiBnZXRGb3JtbHlFcnJvcixcbiAgICAgIGdldEZpZWxkRXJyb3I6IGdldEZpZWxkRXJyb3IsXG4gICAgICBjaGVja1dyYXBwZXI6IGNoZWNrV3JhcHBlcixcbiAgICAgIGNoZWNrV3JhcHBlclRlbXBsYXRlOiBjaGVja1dyYXBwZXJUZW1wbGF0ZSxcbiAgICAgICRnZXQ6ICgpID0+IHRoaXNcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGdldEZpZWxkRXJyb3IoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSwgZmllbGQpIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgICBmaWVsZCA9IG1lc3NhZ2U7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvckluZm9TbHVnO1xuICAgICAgICBlcnJvckluZm9TbHVnID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgRXJyb3IoZ2V0RXJyb3JNZXNzYWdlKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpICsgYCBGaWVsZCBkZWZpbml0aW9uOiAke2FuZ3VsYXIudG9Kc29uKGZpZWxkKX1gKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGb3JtbHlFcnJvcihlcnJvckluZm9TbHVnLCBtZXNzYWdlKSB7XG4gICAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9ySW5mb1NsdWc7XG4gICAgICAgIGVycm9ySW5mb1NsdWcgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSB7XG4gICAgICBsZXQgdXJsID0gJyc7XG4gICAgICBpZiAoZXJyb3JJbmZvU2x1ZyAhPT0gbnVsbCkge1xuICAgICAgICB1cmwgPSBgJHtlcnJvcnNBbmRXYXJuaW5nc1VybFByZWZpeH0ke2Vycm9ySW5mb1NsdWd9YDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBgRm9ybWx5IEVycm9yOiAke21lc3NhZ2V9LiAke3VybH1gO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrV3JhcHBlcih3cmFwcGVyKSB7XG4gICAgICBmb3JtbHlBcGlDaGVjay50aHJvdyhmb3JtbHlBcGlDaGVjay5mb3JtbHlXcmFwcGVyVHlwZSwgYXJndW1lbnRzLCB7XG4gICAgICAgIHByZWZpeDogJ2Zvcm1seUNvbmZpZy5zZXRXcmFwcGVyJyxcbiAgICAgICAgdXJsU3VmZml4OiAnc2V0d3JhcHBlci12YWxpZGF0aW9uLWZhaWxlZCdcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrV3JhcHBlclRlbXBsYXRlKHRlbXBsYXRlLCBhZGRpdGlvbmFsSW5mbykge1xuICAgICAgdmFyIGZvcm1seVRyYW5zY2x1ZGUgPSAnPGZvcm1seS10cmFuc2NsdWRlPjwvZm9ybWx5LXRyYW5zY2x1ZGU+JztcbiAgICAgIGlmICh0ZW1wbGF0ZS5pbmRleE9mKGZvcm1seVRyYW5zY2x1ZGUpID09PSAtMSkge1xuICAgICAgICB0aHJvdyBnZXRGb3JtbHlFcnJvcihcbiAgICAgICAgICBgVGVtcGxhdGUgd3JhcHBlciB0ZW1wbGF0ZXMgbXVzdCB1c2UgXCIke2Zvcm1seVRyYW5zY2x1ZGV9XCIgc29tZXdoZXJlIGluIHRoZW0uIGAgK1xuICAgICAgICAgIGBUaGlzIG9uZSBkb2VzIG5vdCBoYXZlIFwiPGZvcm1seS10cmFuc2NsdWRlPjwvZm9ybWx5LXRyYW5zY2x1ZGU+XCIgaW4gaXQ6ICR7dGVtcGxhdGV9YCArICdcXG4nICtcbiAgICAgICAgICBgQWRkaXRpb25hbCBpbmZvcm1hdGlvbjogJHtKU09OLnN0cmluZ2lmeShhZGRpdGlvbmFsSW5mbyl9YFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seVVzYWJpbGl0eS5qc1xuICoqLyIsImNvbnN0IGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyLWZpeCcpO1xuY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuLi9vdGhlci91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUucHJvdmlkZXIoJ2Zvcm1seUNvbmZpZycsIGZvcm1seUNvbmZpZyk7XG5cbiAgZm9ybWx5Q29uZmlnLnRlc3RzID0gT05fVEVTVCA/IHJlcXVpcmUoJy4vZm9ybWx5Q29uZmlnLnRlc3QnKShuZ01vZHVsZSkgOiBudWxsO1xuXG4gIGZ1bmN0aW9uIGZvcm1seUNvbmZpZyhmb3JtbHlVc2FiaWxpdHlQcm92aWRlciwgZm9ybWx5QXBpQ2hlY2spIHtcblxuICAgIHZhciB0eXBlTWFwID0ge307XG4gICAgdmFyIHRlbXBsYXRlV3JhcHBlcnNNYXAgPSB7fTtcbiAgICB2YXIgZGVmYXVsdFdyYXBwZXJOYW1lID0gJ2RlZmF1bHQnO1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIGdldEVycm9yID0gZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuZ2V0Rm9ybWx5RXJyb3I7XG5cbiAgICBhbmd1bGFyLmV4dGVuZCh0aGlzLCB7XG4gICAgICBzZXRUeXBlLFxuICAgICAgZ2V0VHlwZSxcbiAgICAgIHNldFdyYXBwZXIsXG4gICAgICBnZXRXcmFwcGVyLFxuICAgICAgZ2V0V3JhcHBlckJ5VHlwZSxcbiAgICAgIHJlbW92ZVdyYXBwZXJCeU5hbWUsXG4gICAgICByZW1vdmVXcmFwcGVyc0ZvclR5cGUsXG4gICAgICBkaXNhYmxlV2FybmluZ3M6IGZhbHNlLFxuICAgICAgZXh0cmFzOiB7XG4gICAgICAgIGRpc2FibGVOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcjogZmFsc2UsXG4gICAgICAgIG5nTW9kZWxBdHRyc01hbmlwdWxhdG9yUHJlZmVyQm91bmQ6IGZhbHNlXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVNYW5pcHVsYXRvcnM6IHtcbiAgICAgICAgcHJlV3JhcHBlcjogW10sXG4gICAgICAgIHBvc3RXcmFwcGVyOiBbXVxuICAgICAgfSxcbiAgICAgICRnZXQ6ICgpID0+IHRoaXNcbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHNldFR5cGUob3B0aW9ucykge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2gob3B0aW9ucywgc2V0VHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgICAgY2hlY2tUeXBlKG9wdGlvbnMpO1xuICAgICAgICBpZiAob3B0aW9ucy5leHRlbmRzKSB7XG4gICAgICAgICAgZXh0ZW5kVHlwZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdHlwZU1hcFtvcHRpb25zLm5hbWVdID0gb3B0aW9ucztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGdldEVycm9yKGBZb3UgbXVzdCBwcm92aWRlIGFuIG9iamVjdCBvciBhcnJheSBmb3Igc2V0VHlwZS4gWW91IHByb3ZpZGVkOiAke0pTT04uc3RyaW5naWZ5KGFyZ3VtZW50cyl9YCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKG9wdGlvbnMpIHtcbiAgICAgIGZvcm1seUFwaUNoZWNrLnRocm93KGZvcm1seUFwaUNoZWNrLmZvcm1seVR5cGVPcHRpb25zLCBhcmd1bWVudHMsIHtcbiAgICAgICAgcHJlZml4OiAnZm9ybWx5Q29uZmlnLnNldFR5cGUnLFxuICAgICAgICB1cmw6ICdzZXR0eXBlLXZhbGlkYXRpb24tZmFpbGVkJ1xuICAgICAgfSk7XG4gICAgICBpZiAoIW9wdGlvbnMub3ZlcndyaXRlT2spIHtcbiAgICAgICAgY2hlY2tPdmVyd3JpdGUob3B0aW9ucy5uYW1lLCB0eXBlTWFwLCBvcHRpb25zLCAndHlwZXMnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMub3ZlcndyaXRlT2sgPSB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kVHlwZU9wdGlvbnMob3B0aW9ucykge1xuICAgICAgY29uc3QgZXh0ZW5kc1R5cGUgPSBnZXRUeXBlKG9wdGlvbnMuZXh0ZW5kcywgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgICBleHRlbmRUeXBlQ29udHJvbGxlckZ1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICAgIGV4dGVuZFR5cGVMaW5rRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgICAgZXh0ZW5kVHlwZVZhbGlkYXRlT3B0aW9uc0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICAgIGV4dGVuZFR5cGVEZWZhdWx0T3B0aW9ucyhvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmRUeXBlQ29udHJvbGxlckZ1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgICBjb25zdCBleHRlbmRzQ3RybCA9IGV4dGVuZHNUeXBlLmNvbnRyb2xsZXI7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNDdHJsKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zQ3RybCA9IG9wdGlvbnMuY29udHJvbGxlcjtcbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zQ3RybCkpIHtcbiAgICAgICAgb3B0aW9ucy5jb250cm9sbGVyID0gZnVuY3Rpb24oJHNjb3BlLCAkY29udHJvbGxlcikge1xuICAgICAgICAgICRjb250cm9sbGVyKGV4dGVuZHNDdHJsLCB7JHNjb3BlfSk7XG4gICAgICAgICAgJGNvbnRyb2xsZXIob3B0aW9uc0N0cmwsIHskc2NvcGV9KTtcbiAgICAgICAgfTtcbiAgICAgICAgb3B0aW9ucy5jb250cm9sbGVyLiRpbmplY3QgPSBbJyRzY29wZScsICckY29udHJvbGxlciddO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5jb250cm9sbGVyID0gZXh0ZW5kc0N0cmw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kVHlwZUxpbmtGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgICAgY29uc3QgZXh0ZW5kc0ZuID0gZXh0ZW5kc1R5cGUubGluaztcbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0ZuKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zRm4gPSBvcHRpb25zLmxpbms7XG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9uc0ZuKSkge1xuICAgICAgICBvcHRpb25zLmxpbmsgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgICBleHRlbmRzRm4oLi4uYXJndW1lbnRzKTtcbiAgICAgICAgICBvcHRpb25zRm4oLi4uYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMubGluayA9IGV4dGVuZHNGbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmRUeXBlVmFsaWRhdGVPcHRpb25zRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICAgIGNvbnN0IGV4dGVuZHNGbiA9IGV4dGVuZHNUeXBlLnZhbGlkYXRlT3B0aW9ucztcbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0ZuKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zRm4gPSBvcHRpb25zLnZhbGlkYXRlT3B0aW9ucztcbiAgICAgIGNvbnN0IG9yaWdpbmFsRGVmYXVsdE9wdGlvbnMgPSBvcHRpb25zLmRlZmF1bHRPcHRpb25zO1xuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnNGbikpIHtcbiAgICAgICAgb3B0aW9ucy52YWxpZGF0ZU9wdGlvbnMgPSBmdW5jdGlvbihvcHRpb25zKSB7XG4gICAgICAgICAgb3B0aW9uc0ZuKG9wdGlvbnMpO1xuICAgICAgICAgIGxldCBtZXJnZWRPcHRpb25zID0gYW5ndWxhci5jb3B5KG9wdGlvbnMpO1xuICAgICAgICAgIGxldCBkZWZhdWx0T3B0aW9ucyA9IG9yaWdpbmFsRGVmYXVsdE9wdGlvbnM7XG4gICAgICAgICAgaWYgKGRlZmF1bHRPcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGRlZmF1bHRPcHRpb25zKSkge1xuICAgICAgICAgICAgICBkZWZhdWx0T3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zKG1lcmdlZE9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShtZXJnZWRPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGV4dGVuZHNGbihtZXJnZWRPcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMudmFsaWRhdGVPcHRpb25zID0gZXh0ZW5kc0ZuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZFR5cGVEZWZhdWx0T3B0aW9ucyhvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgICAgY29uc3QgZXh0ZW5kc0RPID0gZXh0ZW5kc1R5cGUuZGVmYXVsdE9wdGlvbnM7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNETykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9uc0RPID0gb3B0aW9ucy5kZWZhdWx0T3B0aW9ucztcbiAgICAgIGNvbnN0IG9wdGlvbnNET0lzRm4gPSBhbmd1bGFyLmlzRnVuY3Rpb24ob3B0aW9uc0RPKTtcbiAgICAgIGNvbnN0IGV4dGVuZHNET0lzRm4gPSBhbmd1bGFyLmlzRnVuY3Rpb24oZXh0ZW5kc0RPKTtcbiAgICAgIGlmIChleHRlbmRzRE9Jc0ZuKSB7XG4gICAgICAgIG9wdGlvbnMuZGVmYXVsdE9wdGlvbnMgPSBmdW5jdGlvbiBkZWZhdWx0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgICAgY29uc3QgZXh0ZW5kc0RlZmF1bHRPcHRpb25zID0gZXh0ZW5kc0RPKG9wdGlvbnMpO1xuICAgICAgICAgIGNvbnN0IG1lcmdlZERlZmF1bHRPcHRpb25zID0ge307XG4gICAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShtZXJnZWREZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgZXh0ZW5kc0RlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICBsZXQgZXh0ZW5kZXJPcHRpb25zRGVmYXVsdE9wdGlvbnMgPSBvcHRpb25zRE87XG4gICAgICAgICAgaWYgKG9wdGlvbnNET0lzRm4pIHtcbiAgICAgICAgICAgIGV4dGVuZGVyT3B0aW9uc0RlZmF1bHRPcHRpb25zID0gZXh0ZW5kZXJPcHRpb25zRGVmYXVsdE9wdGlvbnMobWVyZ2VkRGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKGV4dGVuZHNEZWZhdWx0T3B0aW9ucywgZXh0ZW5kZXJPcHRpb25zRGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIHJldHVybiBleHRlbmRzRGVmYXVsdE9wdGlvbnM7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnNET0lzRm4pIHtcbiAgICAgICAgb3B0aW9ucy5kZWZhdWx0T3B0aW9ucyA9IGZ1bmN0aW9uIGRlZmF1bHRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgICBsZXQgbmV3RGVmYXVsdE9wdGlvbnMgPSB7fTtcbiAgICAgICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKG5ld0RlZmF1bHRPcHRpb25zLCBvcHRpb25zLCBleHRlbmRzRE8pO1xuICAgICAgICAgIHJldHVybiBvcHRpb25zRE8obmV3RGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFR5cGUobmFtZSwgdGhyb3dFcnJvciwgZXJyb3JDb250ZXh0KSB7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHZhciB0eXBlID0gdHlwZU1hcFtuYW1lXTtcbiAgICAgIGlmICghdHlwZSAmJiB0aHJvd0Vycm9yID09PSB0cnVlKSB7XG4gICAgICAgIHRocm93IGdldEVycm9yKFxuICAgICAgICAgIGBUaGVyZSBpcyBubyB0eXBlIGJ5IHRoZSBuYW1lIG9mIFwiJHtuYW1lfVwiOiAke0pTT04uc3RyaW5naWZ5KGVycm9yQ29udGV4dCl9YFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0V3JhcHBlcihvcHRpb25zLCBuYW1lKSB7XG4gICAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLm1hcCh3cmFwcGVyT3B0aW9ucyA9PiBzZXRXcmFwcGVyKHdyYXBwZXJPcHRpb25zKSk7XG4gICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgICAgb3B0aW9ucy50eXBlcyA9IGdldE9wdGlvbnNUeXBlcyhvcHRpb25zKTtcbiAgICAgICAgb3B0aW9ucy5uYW1lID0gZ2V0T3B0aW9uc05hbWUob3B0aW9ucywgbmFtZSk7XG4gICAgICAgIGNoZWNrV3JhcHBlckFQSShvcHRpb25zKTtcbiAgICAgICAgdGVtcGxhdGVXcmFwcGVyc01hcFtvcHRpb25zLm5hbWVdID0gb3B0aW9ucztcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNTdHJpbmcob3B0aW9ucykpIHtcbiAgICAgICAgcmV0dXJuIHNldFdyYXBwZXIoe1xuICAgICAgICAgIHRlbXBsYXRlOiBvcHRpb25zLFxuICAgICAgICAgIG5hbWVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T3B0aW9uc1R5cGVzKG9wdGlvbnMpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKG9wdGlvbnMudHlwZXMpKSB7XG4gICAgICAgIHJldHVybiBbb3B0aW9ucy50eXBlc107XG4gICAgICB9XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudHlwZXMpKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnR5cGVzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9wdGlvbnNOYW1lKG9wdGlvbnMsIG5hbWUpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLm5hbWUgfHwgbmFtZSB8fCBvcHRpb25zLnR5cGVzLmpvaW4oJyAnKSB8fCBkZWZhdWx0V3JhcHBlck5hbWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyQVBJKG9wdGlvbnMpIHtcbiAgICAgIGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLmNoZWNrV3JhcHBlcihvcHRpb25zKTtcbiAgICAgIGlmIChvcHRpb25zLnRlbXBsYXRlKSB7XG4gICAgICAgIGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLmNoZWNrV3JhcHBlclRlbXBsYXRlKG9wdGlvbnMudGVtcGxhdGUsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgaWYgKCFvcHRpb25zLm92ZXJ3cml0ZU9rKSB7XG4gICAgICAgIGNoZWNrT3ZlcndyaXRlKG9wdGlvbnMubmFtZSwgdGVtcGxhdGVXcmFwcGVyc01hcCwgb3B0aW9ucywgJ3RlbXBsYXRlV3JhcHBlcnMnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLm92ZXJ3cml0ZU9rO1xuICAgICAgfVxuICAgICAgY2hlY2tXcmFwcGVyVHlwZXMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyVHlwZXMob3B0aW9ucykge1xuICAgICAgbGV0IHNob3VsZFRocm93ID0gIWFuZ3VsYXIuaXNBcnJheShvcHRpb25zLnR5cGVzKSB8fCAhb3B0aW9ucy50eXBlcy5ldmVyeShhbmd1bGFyLmlzU3RyaW5nKTtcbiAgICAgIGlmIChzaG91bGRUaHJvdykge1xuICAgICAgICB0aHJvdyBnZXRFcnJvcihgQXR0ZW1wdGVkIHRvIGNyZWF0ZSBhIHRlbXBsYXRlIHdyYXBwZXIgd2l0aCB0eXBlcyB0aGF0IGlzIG5vdCBhIHN0cmluZyBvciBhbiBhcnJheSBvZiBzdHJpbmdzYCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tPdmVyd3JpdGUocHJvcGVydHksIG9iamVjdCwgbmV3VmFsdWUsIG9iamVjdE5hbWUpIHtcbiAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgIHdhcm4oW1xuICAgICAgICAgIGBBdHRlbXB0aW5nIHRvIG92ZXJ3cml0ZSAke3Byb3BlcnR5fSBvbiAke29iamVjdE5hbWV9IHdoaWNoIGlzIGN1cnJlbnRseWAsXG4gICAgICAgICAgYCR7SlNPTi5zdHJpbmdpZnkob2JqZWN0W3Byb3BlcnR5XSl9IHdpdGggJHtKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSl9YCxcbiAgICAgICAgICBgVG8gc3VwcmVzcyB0aGlzIHdhcm5pbmcsIHNwZWNpZnkgdGhlIHByb3BlcnR5IFwib3ZlcndyaXRlT2s6IHRydWVcImBcbiAgICAgICAgXS5qb2luKCcgJykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdyYXBwZXIobmFtZSkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZSB8fCBkZWZhdWx0V3JhcHBlck5hbWVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdyYXBwZXJCeVR5cGUodHlwZSkge1xuICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgdmFyIHdyYXBwZXJzID0gW107XG4gICAgICBmb3IgKHZhciBuYW1lIGluIHRlbXBsYXRlV3JhcHBlcnNNYXApIHtcbiAgICAgICAgaWYgKHRlbXBsYXRlV3JhcHBlcnNNYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBpZiAodGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXS50eXBlcyAmJiB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdLnR5cGVzLmluZGV4T2YodHlwZSkgIT09IC0xKSB7XG4gICAgICAgICAgICB3cmFwcGVycy5wdXNoKHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHdyYXBwZXJzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVdyYXBwZXJCeU5hbWUobmFtZSkge1xuICAgICAgdmFyIHdyYXBwZXIgPSB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdO1xuICAgICAgZGVsZXRlIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV07XG4gICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVXcmFwcGVyc0ZvclR5cGUodHlwZSkge1xuICAgICAgdmFyIHdyYXBwZXJzID0gZ2V0V3JhcHBlckJ5VHlwZSh0eXBlKTtcbiAgICAgIGlmICghd3JhcHBlcnMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkod3JhcHBlcnMpKSB7XG4gICAgICAgIHJldHVybiByZW1vdmVXcmFwcGVyQnlOYW1lKHdyYXBwZXJzLm5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3JhcHBlcnMuZm9yRWFjaCgod3JhcHBlcikgPT4gcmVtb3ZlV3JhcHBlckJ5TmFtZSh3cmFwcGVyLm5hbWUpKTtcbiAgICAgICAgcmV0dXJuIHdyYXBwZXJzO1xuICAgICAgfVxuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gd2FybigpIHtcbiAgICAgIGlmICghX3RoaXMuZGlzYWJsZVdhcm5pbmdzKSB7XG4gICAgICAgIGNvbnNvbGUud2FybiguLi5hcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG5cblxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9mb3JtbHlDb25maWcuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUuY29uc3RhbnQoJ2Zvcm1seVZlcnNpb24nLCBWRVJTSU9OKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9wcm92aWRlcnMvZm9ybWx5VmVyc2lvbi5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICBuZ01vZHVsZS5jb25zdGFudChcbiAgICAnZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCcsXG4gICAgYGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtbHktanMvYW5ndWxhci1mb3JtbHkvYmxvYi8ke1ZFUlNJT059L290aGVyL0VSUk9SU19BTkRfV0FSTklOR1MubWQjYFxuICApO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9mb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLmZhY3RvcnkoJ2Zvcm1seVZhbGlkYXRpb25NZXNzYWdlcycsIGZ1bmN0aW9uKCkge1xuXG4gICAgdmFyIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcyA9IHtcbiAgICAgIGFkZFRlbXBsYXRlT3B0aW9uVmFsdWVNZXNzYWdlLFxuICAgICAgYWRkU3RyaW5nTWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VzOiB7fVxuICAgIH07XG5cbiAgICByZXR1cm4gZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzO1xuXG4gICAgZnVuY3Rpb24gYWRkVGVtcGxhdGVPcHRpb25WYWx1ZU1lc3NhZ2UobmFtZSwgcHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSkge1xuICAgICAgZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLm1lc3NhZ2VzW25hbWVdID0gdGVtcGxhdGVPcHRpb25WYWx1ZShwcm9wLCBwcmVmaXgsIHN1ZmZpeCwgYWx0ZXJuYXRlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRTdHJpbmdNZXNzYWdlKG5hbWUsIHN0cmluZykge1xuICAgICAgZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLm1lc3NhZ2VzW25hbWVdID0gKCkgPT4gc3RyaW5nO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gdGVtcGxhdGVPcHRpb25WYWx1ZShwcm9wLCBwcmVmaXgsIHN1ZmZpeCwgYWx0ZXJuYXRlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gZ2V0VmFsaWRhdGlvbk1lc3NhZ2Uodmlld1ZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSkge1xuICAgICAgICBpZiAoc2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbcHJvcF0pIHtcbiAgICAgICAgICByZXR1cm4gYCR7cHJlZml4fSAke3Njb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zW3Byb3BdfSAke3N1ZmZpeH1gO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBhbHRlcm5hdGU7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLmpzXG4gKiovIiwiY29uc3QgdXRpbHMgPSByZXF1aXJlKCcuLi9vdGhlci91dGlscycpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUuZmFjdG9yeSgnZm9ybWx5VXRpbCcsIGZvcm1seVV0aWwpO1xuXG4gIGZvcm1seVV0aWwudGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZSgnLi9mb3JtbHlVdGlsLnRlc3QnKShuZ01vZHVsZSkgOiBudWxsO1xuXG4gIGZ1bmN0aW9uIGZvcm1seVV0aWwoKSB7XG4gICAgcmV0dXJuIHV0aWxzO1xuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vc2VydmljZXMvZm9ybWx5VXRpbC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICBuZ01vZHVsZS5mYWN0b3J5KCdmb3JtbHlXYXJuJywgZnVuY3Rpb24gKGZvcm1seUNvbmZpZywgZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCwgJGxvZykge1xuICAgIHJldHVybiBmdW5jdGlvbiB3YXJuKCkge1xuICAgICAgaWYgKCFmb3JtbHlDb25maWcuZGlzYWJsZVdhcm5pbmdzKSB7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgdmFyIHdhcm5JbmZvU2x1ZyA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgYXJncy51bnNoaWZ0KCdGb3JtbHkgV2FybmluZzonKTtcbiAgICAgICAgYXJncy5wdXNoKGAke2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXh9JHt3YXJuSW5mb1NsdWd9YCk7XG4gICAgICAgICRsb2cud2FybiguLi5hcmdzKTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9zZXJ2aWNlcy9mb3JtbHlXYXJuLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLmRpcmVjdGl2ZSgnZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbicsIGZvcm1seUN1c3RvbVZhbGlkYXRpb24pO1xuXG4gIGZvcm1seUN1c3RvbVZhbGlkYXRpb24udGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZSgnLi9mb3JtbHktY3VzdG9tLXZhbGlkYXRpb24udGVzdCcpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbihmb3JtbHlVdGlsLCAkcSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgcmVxdWlyZTogJ25nTW9kZWwnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsLCBhdHRycywgY3RybCkge1xuICAgICAgICB2YXIgdmFsaWRhdG9ycyA9IHNjb3BlLiRldmFsKGF0dHJzLmZvcm1seUN1c3RvbVZhbGlkYXRpb24pO1xuICAgICAgICBpZiAoIXZhbGlkYXRvcnMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2hlY2tWYWxpZGF0b3JzKHZhbGlkYXRvcnMpO1xuICAgICAgICBzY29wZS5vcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgPSBzY29wZS5vcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgfHwge307XG5cblxuICAgICAgICB2YXIgdXNlTmV3VmFsaWRhdG9yc0FwaSA9IGN0cmwuaGFzT3duUHJvcGVydHkoJyR2YWxpZGF0b3JzJykgJiYgIWF0dHJzLmhhc093blByb3BlcnR5KCd1c2VQYXJzZXJzJyk7XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3JzLCBmdW5jdGlvbih2YWxpZGF0b3IsIG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHZhbGlkYXRvci5tZXNzYWdlO1xuICAgICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICBzY29wZS5vcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0gPSAoKSA9PiB7XG4gICAgICAgICAgICAgIHJldHVybiBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIG1lc3NhZ2UsIGN0cmwuJG1vZGVsVmFsdWUsIGN0cmwuJHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWxpZGF0b3IgPSBhbmd1bGFyLmlzT2JqZWN0KHZhbGlkYXRvcikgPyB2YWxpZGF0b3IuZXhwcmVzc2lvbiA6IHZhbGlkYXRvcjtcbiAgICAgICAgICB2YXIgaXNQb3NzaWJseUFzeW5jID0gIWFuZ3VsYXIuaXNTdHJpbmcodmFsaWRhdG9yKTtcbiAgICAgICAgICBpZiAodXNlTmV3VmFsaWRhdG9yc0FwaSkge1xuICAgICAgICAgICAgc2V0dXBXaXRoVmFsaWRhdG9ycygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXR1cFdpdGhQYXJzZXJzKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gc2V0dXBXaXRoVmFsaWRhdG9ycygpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZGF0b3JDb2xsZWN0aW9uID0gaXNQb3NzaWJseUFzeW5jID8gJyRhc3luY1ZhbGlkYXRvcnMnIDogJyR2YWxpZGF0b3JzJztcbiAgICAgICAgICAgIGN0cmxbdmFsaWRhdG9yQ29sbGVjdGlvbl1bbmFtZV0gPSBmdW5jdGlvbihtb2RlbFZhbHVlLCB2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCB2YWxpZGF0b3IsIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChpc1Bvc3NpYmx5QXN5bmMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNQcm9taXNlTGlrZSh2YWx1ZSkgPyB2YWx1ZSA6IHZhbHVlID8gJHEud2hlbih2YWx1ZSkgOiAkcS5yZWplY3QodmFsdWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBzZXR1cFdpdGhQYXJzZXJzKCkge1xuICAgICAgICAgICAgbGV0IGluRmxpZ2h0VmFsaWRhdG9yO1xuICAgICAgICAgICAgY3RybC4kcGFyc2Vycy51bnNoaWZ0KGZ1bmN0aW9uKHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgaXNWYWxpZCA9IGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgdmFsaWRhdG9yLCBjdHJsLiRtb2RlbFZhbHVlLCB2aWV3VmFsdWUpO1xuICAgICAgICAgICAgICBpZiAoaXNQcm9taXNlTGlrZShpc1ZhbGlkKSkge1xuICAgICAgICAgICAgICAgIGN0cmwuJHBlbmRpbmcgPSBjdHJsLiRwZW5kaW5nIHx8IHt9O1xuICAgICAgICAgICAgICAgIGN0cmwuJHBlbmRpbmdbbmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGluRmxpZ2h0VmFsaWRhdG9yID0gaXNWYWxpZDtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkLnRoZW4oKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGluRmxpZ2h0VmFsaWRhdG9yID09PSBpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KG5hbWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pLmNhdGNoKCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChpbkZsaWdodFZhbGlkYXRvciA9PT0gaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShuYW1lLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuZmluYWxseSgoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoY3RybC4kcGVuZGluZykubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjdHJsLiRwZW5kaW5nO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGN0cmwuJHBlbmRpbmdbbmFtZV07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkobmFtZSwgaXNWYWxpZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHZpZXdWYWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGlzUHJvbWlzZUxpa2Uob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIGFuZ3VsYXIuaXNGdW5jdGlvbihvYmoudGhlbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tWYWxpZGF0b3JzKHZhbGlkYXRvcnMpIHtcbiAgICAgIHZhciBhbGxvd2VkUHJvcGVydGllcyA9IFsnZXhwcmVzc2lvbicsICdtZXNzYWdlJ107XG4gICAgICB2YXIgdmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzID0ge307XG4gICAgICBhbmd1bGFyLmZvckVhY2godmFsaWRhdG9ycywgKHZhbGlkYXRvciwgbmFtZSkgPT4ge1xuICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyh2YWxpZGF0b3IpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBleHRyYVByb3BzID0gW107XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3IsICh2LCBrZXkpID0+IHtcbiAgICAgICAgICBpZiAoYWxsb3dlZFByb3BlcnRpZXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgZXh0cmFQcm9wcy5wdXNoKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGV4dHJhUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgdmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzW25hbWVdID0gZXh0cmFQcm9wcztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoT2JqZWN0LmtleXModmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzKS5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFtcbiAgICAgICAgICBgVmFsaWRhdG9ycyBhcmUgb25seSBhbGxvd2VkIHRvIGJlIGZ1bmN0aW9ucyBvciBvYmplY3RzIHRoYXQgaGF2ZSAke2FsbG93ZWRQcm9wZXJ0aWVzLmpvaW4oJywgJyl9LmAsXG4gICAgICAgICAgYFlvdSBwcm92aWRlZCBzb21lIGV4dHJhIHByb3BlcnRpZXM6ICR7SlNPTi5zdHJpbmdpZnkodmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzKX1gXG4gICAgICAgIF0uam9pbignICcpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9kaXJlY3RpdmVzL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi5qc1xuICoqLyIsImxldCBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhci1maXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLmRpcmVjdGl2ZSgnZm9ybWx5RmllbGQnLCBmb3JtbHlGaWVsZCk7XG5cbiAgZm9ybWx5RmllbGQudGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZSgnLi9mb3JtbHktZmllbGQudGVzdCcpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAgICogQG5hbWUgZm9ybWx5RmllbGRcbiAgICogQHJlc3RyaWN0IEFFXG4gICAqL1xuICBmdW5jdGlvbiBmb3JtbHlGaWVsZCgkaHR0cCwgJHEsICRjb21waWxlLCAkdGVtcGxhdGVDYWNoZSwgZm9ybWx5Q29uZmlnLCBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMsIGZvcm1seUFwaUNoZWNrLFxuICAgICAgICAgICAgICAgICAgICAgICBmb3JtbHlVdGlsLCBmb3JtbHlVc2FiaWxpdHksIGZvcm1seVdhcm4pIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBRScsXG4gICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgb3B0aW9uczogJz0nLFxuICAgICAgICBtb2RlbDogJz0nLFxuICAgICAgICBmb3JtSWQ6ICc9PycsXG4gICAgICAgIGluZGV4OiAnPT8nLFxuICAgICAgICBmaWVsZHM6ICc9PycsXG4gICAgICAgIGZvcm1TdGF0ZTogJz0/JyxcbiAgICAgICAgZm9ybTogJz0/J1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uIGZpZWxkQ29udHJvbGxlcigkc2NvcGUsICR0aW1lb3V0LCAkcGFyc2UsICRjb250cm9sbGVyKSB7XG4gICAgICAgIHZhciBvcHRzID0gJHNjb3BlLm9wdGlvbnM7XG4gICAgICAgIHZhciBmaWVsZFR5cGUgPSBvcHRzLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0cy50eXBlKTtcbiAgICAgICAgc2ltcGxpZnlMaWZlKG9wdHMpO1xuICAgICAgICBtZXJnZUZpZWxkT3B0aW9uc1dpdGhUeXBlRGVmYXVsdHMob3B0cywgZmllbGRUeXBlKTtcbiAgICAgICAgZXh0ZW5kT3B0aW9uc1dpdGhEZWZhdWx0cyhvcHRzLCAkc2NvcGUuaW5kZXgpO1xuICAgICAgICBjaGVja0FwaShvcHRzKTtcbiAgICAgICAgLy8gc2V0IGZpZWxkIGlkIHRvIGxpbmsgbGFiZWxzIGFuZCBmaWVsZHNcbiAgICAgICAgJHNjb3BlLmlkID0gZm9ybWx5VXRpbC5nZXRGaWVsZElkKCRzY29wZS5mb3JtSWQsIG9wdHMsICRzY29wZS5pbmRleCk7XG5cbiAgICAgICAgLy8gaW5pdGFsaXphdGlvblxuICAgICAgICBydW5FeHByZXNzaW9ucygpO1xuICAgICAgICBzZXRGb3JtQ29udHJvbCgkc2NvcGUsIG9wdHMpO1xuICAgICAgICBhZGRNb2RlbFdhdGNoZXIoJHNjb3BlLCBvcHRzKTtcbiAgICAgICAgYWRkVmFsaWRhdGlvbk1lc3NhZ2VzKG9wdHMpO1xuICAgICAgICAvLyBzaW1wbGlmeSB0aGluZ3NcbiAgICAgICAgLy8gY3JlYXRlICRzY29wZS50byBzbyB0ZW1wbGF0ZSBhdXRob3JzIGNhbiByZWZlcmVuY2UgdG8gaW5zdGVhZCBvZiAkc2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNcbiAgICAgICAgJHNjb3BlLnRvID0gJHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zO1xuICAgICAgICBpbnZva2VDb250cm9sbGVycygkc2NvcGUsIG9wdHMsIGZpZWxkVHlwZSk7XG5cbiAgICAgICAgLy8gZnVuY3Rpb24gZGVmaW5pdGlvbnNcbiAgICAgICAgZnVuY3Rpb24gcnVuRXhwcmVzc2lvbnMoKSB7XG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7IC8vIG11c3QgcnVuIG9uIG5leHQgdGljayB0byBtYWtlIHN1cmUgdGhhdCB0aGUgY3VycmVudCB2YWx1ZSBpcyBjb3JyZWN0LlxuICAgICAgICAgICAgdmFyIGZpZWxkID0gJHNjb3BlLm9wdGlvbnM7XG4gICAgICAgICAgICB2YXIgY3VycmVudFZhbHVlID0gdmFsdWVHZXR0ZXJTZXR0ZXIoKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChmaWVsZC5leHByZXNzaW9uUHJvcGVydGllcywgZnVuY3Rpb24gcnVuRXhwcmVzc2lvbihleHByZXNzaW9uLCBwcm9wKSB7XG4gICAgICAgICAgICAgIHZhciBzZXR0ZXIgPSAkcGFyc2UocHJvcCkuYXNzaWduO1xuICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9ICRxLndoZW4oZm9ybWx5VXRpbC5mb3JtbHlFdmFsKCRzY29wZSwgZXhwcmVzc2lvbiwgY3VycmVudFZhbHVlKSk7XG4gICAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHNldHRlcihmaWVsZCwgdmFsdWUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdmFsdWVHZXR0ZXJTZXR0ZXIobmV3VmFsKSB7XG4gICAgICAgICAgaWYgKCEkc2NvcGUubW9kZWwgfHwgISRzY29wZS5vcHRpb25zLmtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQobmV3VmFsKSkge1xuICAgICAgICAgICAgJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV0gPSBuZXdWYWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNpbXBsaWZ5TGlmZShvcHRpb25zKSB7XG4gICAgICAgICAgLy8gYWRkIGEgZmV3IGVtcHR5IG9iamVjdHMgKGlmIHRoZXkgZG9uJ3QgYWxyZWFkeSBleGlzdCkgc28geW91IGRvbid0IGhhdmUgdG8gdW5kZWZpbmVkIGNoZWNrIGV2ZXJ5d2hlcmVcbiAgICAgICAgICBmb3JtbHlVdGlsLnJldmVyc2VEZWVwTWVyZ2Uob3B0aW9ucywge1xuICAgICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgICB0ZW1wbGF0ZU9wdGlvbnM6IHt9LFxuICAgICAgICAgICAgdmFsaWRhdGlvbjoge31cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1lcmdlRmllbGRPcHRpb25zV2l0aFR5cGVEZWZhdWx0cyhvcHRpb25zLCB0eXBlKSB7XG4gICAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgIG1lcmdlT3B0aW9ucyhvcHRpb25zLCB0eXBlLmRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHByb3Blck9yZGVyID0gYXJyYXlpZnkob3B0aW9ucy5vcHRpb25zVHlwZXMpLnJldmVyc2UoKTsgLy8gc28gdGhlIHJpZ2h0IHRoaW5ncyBhcmUgb3ZlcnJpZGRlblxuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChwcm9wZXJPcmRlciwgdHlwZU5hbWUgPT4ge1xuICAgICAgICAgICAgbWVyZ2VPcHRpb25zKG9wdGlvbnMsIGZvcm1seUNvbmZpZy5nZXRUeXBlKHR5cGVOYW1lLCB0cnVlLCBvcHRpb25zKS5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtZXJnZU9wdGlvbnMob3B0aW9ucywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgICAgaWYgKGV4dHJhT3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihleHRyYU9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgIGV4dHJhT3B0aW9ucyA9IGV4dHJhT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm1seVV0aWwucmV2ZXJzZURlZXBNZXJnZShvcHRpb25zLCBleHRyYU9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGV4dGVuZE9wdGlvbnNXaXRoRGVmYXVsdHMob3B0aW9ucywgaW5kZXgpIHtcbiAgICAgICAgICBhbmd1bGFyLmV4dGVuZChvcHRpb25zLCB7XG4gICAgICAgICAgICAvLyBhdHRhY2ggdGhlIGtleSBpbiBjYXNlIHRoZSBmb3JtbHktZmllbGQgZGlyZWN0aXZlIGlzIHVzZWQgZGlyZWN0bHlcbiAgICAgICAgICAgIGtleTogb3B0aW9ucy5rZXkgfHwgaW5kZXggfHwgMCxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZUdldHRlclNldHRlcixcbiAgICAgICAgICAgIHJ1bkV4cHJlc3Npb25zOiBydW5FeHByZXNzaW9uc1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaW5pdGlhbGl6YXRpb24gZnVuY3Rpb25zXG4gICAgICAgIGZ1bmN0aW9uIHNldEZvcm1Db250cm9sKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMubm9Gb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzY29wZS4kd2F0Y2goJ2Zvcm1bXCInICsgc2NvcGUuaWQgKyAnXCJdJywgZnVuY3Rpb24oZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgIGlmIChmb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgICBzY29wZS5mYyA9IGZvcm1Db250cm9sOyAvLyBzaG9ydGN1dCBmb3IgdGVtcGxhdGUgYXV0aG9yc1xuICAgICAgICAgICAgICBzY29wZS5vcHRpb25zLmZvcm1Db250cm9sID0gZm9ybUNvbnRyb2w7XG4gICAgICAgICAgICAgIGFkZFNob3dNZXNzYWdlc1dhdGNoZXIoc2NvcGUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkTW9kZWxXYXRjaGVyKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMubW9kZWwpIHtcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaCgnb3B0aW9ucy5tb2RlbCcsIHJ1bkV4cHJlc3Npb25zLCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRTaG93TWVzc2FnZXNXYXRjaGVyKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzY29wZS5vcHRpb25zLnZhbGlkYXRpb24uc2hvdyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgICAgICAgICAgIHJldHVybiBzY29wZS5mYy4kaW52YWxpZCAmJiBzY29wZS5vcHRpb25zLnZhbGlkYXRpb24uc2hvdztcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHJldHVybiBzY29wZS5mYy4kaW52YWxpZCAmJiBzY29wZS5mYy4kdG91Y2hlZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBmdW5jdGlvbihzaG93KSB7XG4gICAgICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24uZXJyb3JFeGlzdHNBbmRTaG91bGRCZVZpc2libGUgPSBzaG93O1xuICAgICAgICAgICAgc2NvcGUuc2hvd0Vycm9yID0gc2hvdzsgLy8gc2hvcnRjdXQgZm9yIHRlbXBsYXRlIGF1dGhvcnNcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZFZhbGlkYXRpb25NZXNzYWdlcyhvcHRpb25zKSB7XG4gICAgICAgICAgb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzID0gb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzIHx8IHt9O1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMubWVzc2FnZXMsIGZ1bmN0aW9uIChleHByZXNzaW9uLCBuYW1lKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlc1tuYW1lXSkge1xuICAgICAgICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0gPSBmdW5jdGlvbiAodmlld1ZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIGV4cHJlc3Npb24sIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpbnZva2VDb250cm9sbGVycyhzY29wZSwgb3B0aW9ucyA9IHt9LCB0eXBlID0ge30pIHtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goW3R5cGUuY29udHJvbGxlciwgb3B0aW9ucy5jb250cm9sbGVyXSwgY29udHJvbGxlciA9PiB7XG4gICAgICAgICAgICBpZiAoY29udHJvbGxlcikge1xuICAgICAgICAgICAgICAkY29udHJvbGxlcihjb250cm9sbGVyLCB7JHNjb3BlOiBzY29wZX0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbGluazogZnVuY3Rpb24gZmllbGRMaW5rKHNjb3BlLCBlbCkge1xuICAgICAgICB2YXIgdHlwZSA9IHNjb3BlLm9wdGlvbnMudHlwZSAmJiBmb3JtbHlDb25maWcuZ2V0VHlwZShzY29wZS5vcHRpb25zLnR5cGUpO1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgdmFyIHRodXNseSA9IHRoaXM7XG4gICAgICAgIGdldEZpZWxkVGVtcGxhdGUoc2NvcGUub3B0aW9ucylcbiAgICAgICAgICAudGhlbihydW5NYW5pcHVsYXRvcnMoZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnByZVdyYXBwZXIpKVxuICAgICAgICAgIC50aGVuKHRyYW5zY2x1ZGVJbldyYXBwZXJzKHNjb3BlLm9wdGlvbnMpKVxuICAgICAgICAgIC50aGVuKHJ1bk1hbmlwdWxhdG9ycyhmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucG9zdFdyYXBwZXIpKVxuICAgICAgICAgIC50aGVuKHNldEVsZW1lbnRUZW1wbGF0ZSlcbiAgICAgICAgICAuY2F0Y2goZXJyb3IgPT4ge1xuICAgICAgICAgICAgZm9ybWx5V2FybihcbiAgICAgICAgICAgICAgJ3RoZXJlLXdhcy1hLXByb2JsZW0tc2V0dGluZy10aGUtdGVtcGxhdGUtZm9yLXRoaXMtZmllbGQnLFxuICAgICAgICAgICAgICAnVGhlcmUgd2FzIGEgcHJvYmxlbSBzZXR0aW5nIHRoZSB0ZW1wbGF0ZSBmb3IgdGhpcyBmaWVsZCAnLFxuICAgICAgICAgICAgICBzY29wZS5vcHRpb25zLFxuICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBzZXRFbGVtZW50VGVtcGxhdGUodGVtcGxhdGVFbCkge1xuICAgICAgICAgIGVsLmh0bWwoYXNIdG1sKHRlbXBsYXRlRWwpKTtcbiAgICAgICAgICAkY29tcGlsZShlbC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgaWYgKHR5cGUgJiYgdHlwZS5saW5rKSB7XG4gICAgICAgICAgICB0eXBlLmxpbmsuYXBwbHkodGh1c2x5LCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMubGluaykge1xuICAgICAgICAgICAgc2NvcGUub3B0aW9ucy5saW5rLmFwcGx5KHRodXNseSwgYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcnVuTWFuaXB1bGF0b3JzKG1hbmlwdWxhdG9ycykge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBydW5NYW5pcHVsYXRvcnNPblRlbXBsYXRlKHRlbXBsYXRlKSB7XG4gICAgICAgICAgICB2YXIgY2hhaW4gPSAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChtYW5pcHVsYXRvcnMsIG1hbmlwdWxhdG9yID0+IHtcbiAgICAgICAgICAgICAgY2hhaW4gPSBjaGFpbi50aGVuKHRlbXBsYXRlID0+IHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihtYW5pcHVsYXRvcih0ZW1wbGF0ZSwgc2NvcGUub3B0aW9ucywgc2NvcGUpKS50aGVuKG5ld1RlbXBsYXRlID0+IHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzU3RyaW5nKG5ld1RlbXBsYXRlKSA/IG5ld1RlbXBsYXRlIDogYXNIdG1sKG5ld1RlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFzSHRtbChlbCkge1xuICAgICAgdmFyIHdyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJzxhPjwvYT4nKTtcbiAgICAgIHJldHVybiB3cmFwcGVyLmFwcGVuZChlbCkuaHRtbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZpZWxkVGVtcGxhdGUob3B0aW9ucykge1xuICAgICAgbGV0IHR5cGUgPSBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRpb25zLnR5cGUsIHRydWUsIG9wdGlvbnMpO1xuICAgICAgbGV0IHRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZSB8fCB0eXBlICYmIHR5cGUudGVtcGxhdGU7XG4gICAgICBsZXQgdGVtcGxhdGVVcmwgPSBvcHRpb25zLnRlbXBsYXRlVXJsIHx8IHR5cGUgJiYgdHlwZS50ZW1wbGF0ZVVybDtcbiAgICAgIGlmICghdGVtcGxhdGUgJiYgIXRlbXBsYXRlVXJsKSB7XG4gICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFxuICAgICAgICAgICd0eXBlLXR5cGUtaGFzLW5vLXRlbXBsYXRlJyxcbiAgICAgICAgICBgVHlwZSAnJHtvcHRpb25zLnR5cGV9JyBoYXMgbm90IHRlbXBsYXRlLiBPbiBlbGVtZW50OmAsIG9wdGlvbnNcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRUZW1wbGF0ZSh0ZW1wbGF0ZSB8fCB0ZW1wbGF0ZVVybCwgIXRlbXBsYXRlKTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGdldFRlbXBsYXRlKHRlbXBsYXRlLCBpc1VybCkge1xuICAgICAgaWYgKCFpc1VybCkge1xuICAgICAgICByZXR1cm4gJHEud2hlbih0ZW1wbGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgaHR0cE9wdGlvbnMgPSB7Y2FjaGU6ICR0ZW1wbGF0ZUNhY2hlfTtcbiAgICAgICAgcmV0dXJuICRodHRwLmdldCh0ZW1wbGF0ZSwgaHR0cE9wdGlvbnMpLnRoZW4oZnVuY3Rpb24ocmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSkuY2F0Y2goZnVuY3Rpb24oZXJyb3IpIHtcbiAgICAgICAgICBmb3JtbHlXYXJuKFxuICAgICAgICAgICAgJ3Byb2JsZW0tbG9hZGluZy10ZW1wbGF0ZS1mb3ItdGVtcGxhdGV1cmwnLFxuICAgICAgICAgICAgJ1Byb2JsZW0gbG9hZGluZyB0ZW1wbGF0ZSBmb3IgJyArIHRlbXBsYXRlLFxuICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2NsdWRlSW5XcmFwcGVycyhvcHRpb25zKSB7XG4gICAgICBsZXQgd3JhcHBlciA9IGdldFdyYXBwZXJPcHRpb24ob3B0aW9ucyk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiB0cmFuc2NsdWRlVGVtcGxhdGUodGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCF3cmFwcGVyLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdyYXBwZXIuZm9yRWFjaCgod3JhcHBlcikgPT4ge1xuICAgICAgICAgIGZvcm1seVVzYWJpbGl0eS5jaGVja1dyYXBwZXIod3JhcHBlciwgb3B0aW9ucyk7XG4gICAgICAgICAgd3JhcHBlci52YWxpZGF0ZU9wdGlvbnMgJiYgd3JhcHBlci52YWxpZGF0ZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgcnVuQXBpQ2hlY2sod3JhcHBlciwgb3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgICBsZXQgcHJvbWlzZXMgPSB3cmFwcGVyLm1hcCh3ID0+IGdldFRlbXBsYXRlKHcudGVtcGxhdGUgfHwgdy50ZW1wbGF0ZVVybCwgIXcudGVtcGxhdGUpKTtcbiAgICAgICAgcmV0dXJuICRxLmFsbChwcm9taXNlcykudGhlbih3cmFwcGVyc1RlbXBsYXRlcyA9PiB7XG4gICAgICAgICAgd3JhcHBlcnNUZW1wbGF0ZXMuZm9yRWFjaCgod3JhcHBlclRlbXBsYXRlLCBpbmRleCkgPT4ge1xuICAgICAgICAgICAgZm9ybWx5VXNhYmlsaXR5LmNoZWNrV3JhcHBlclRlbXBsYXRlKHdyYXBwZXJUZW1wbGF0ZSwgd3JhcHBlcltpbmRleF0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLnJldmVyc2UoKTsgLy8gd3JhcHBlciAwIGlzIHdyYXBwZWQgaW4gd3JhcHBlciAxIGFuZCBzbyBvbi4uLlxuICAgICAgICAgIGxldCB0b3RhbFdyYXBwZXIgPSB3cmFwcGVyc1RlbXBsYXRlcy5zaGlmdCgpO1xuICAgICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLmZvckVhY2god3JhcHBlclRlbXBsYXRlID0+IHtcbiAgICAgICAgICAgIHRvdGFsV3JhcHBlciA9IGRvVHJhbnNjbHVzaW9uKHRvdGFsV3JhcHBlciwgd3JhcHBlclRlbXBsYXRlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gZG9UcmFuc2NsdXNpb24odG90YWxXcmFwcGVyLCB0ZW1wbGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkb1RyYW5zY2x1c2lvbih3cmFwcGVyLCB0ZW1wbGF0ZSkge1xuICAgICAgbGV0IHN1cGVyV3JhcHBlciA9IGFuZ3VsYXIuZWxlbWVudCgnPGE+PC9hPicpOyAvLyB0aGlzIGFsbG93cyBwZW9wbGUgbm90IGhhdmUgdG8gaGF2ZSBhIHNpbmdsZSByb290IGluIHdyYXBwZXJzXG4gICAgICBzdXBlcldyYXBwZXIuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgbGV0IHRyYW5zY2x1ZGVFbCA9IHN1cGVyV3JhcHBlci5maW5kKCdmb3JtbHktdHJhbnNjbHVkZScpO1xuICAgICAgdHJhbnNjbHVkZUVsLnJlcGxhY2VXaXRoKHRlbXBsYXRlKTtcbiAgICAgIHJldHVybiBzdXBlcldyYXBwZXIuaHRtbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdyYXBwZXJPcHRpb24ob3B0aW9ucykge1xuICAgICAgbGV0IHdyYXBwZXIgPSBvcHRpb25zLndyYXBwZXI7XG4gICAgICAvLyBleHBsaWNpdCBudWxsIG1lYW5zIG5vIHdyYXBwZXJcbiAgICAgIGlmICh3cmFwcGVyID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cblxuICAgICAgLy8gbm90aGluZyBzcGVjaWZpZWQgbWVhbnMgdXNlIHRoZSBkZWZhdWx0IHdyYXBwZXIgZm9yIHRoZSB0eXBlXG4gICAgICBpZiAoIXdyYXBwZXIpIHtcbiAgICAgICAgLy8gZ2V0IGFsbCB3cmFwcGVycyB0aGF0IHNwZWNpZnkgdGhleSBhcHBseSB0byB0aGlzIHR5cGVcbiAgICAgICAgd3JhcHBlciA9IGFycmF5aWZ5KGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyQnlUeXBlKG9wdGlvbnMudHlwZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3JhcHBlciA9IGFycmF5aWZ5KHdyYXBwZXIpLm1hcChmb3JtbHlDb25maWcuZ2V0V3JhcHBlcik7XG4gICAgICB9XG5cbiAgICAgIC8vIGdldCBhbGwgd3JhcHBlcnMgZm9yIHRoYXQgdGhpcyB0eXBlIHNwZWNpZmllZCB0aGF0IGl0IHVzZXMuXG4gICAgICB2YXIgdHlwZSA9IGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSwgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgICBpZiAodHlwZSAmJiB0eXBlLndyYXBwZXIpIHtcbiAgICAgICAgbGV0IHR5cGVXcmFwcGVycyA9IGFycmF5aWZ5KHR5cGUud3JhcHBlcikubWFwKGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKTtcbiAgICAgICAgd3JhcHBlciA9IHdyYXBwZXIuY29uY2F0KHR5cGVXcmFwcGVycyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFkZCB0aGUgZGVmYXVsdCB3cmFwcGVyIGxhc3RcbiAgICAgIHZhciBkZWZhdWx0V3JhcHBlciA9IGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKCk7XG4gICAgICBpZiAoZGVmYXVsdFdyYXBwZXIpIHtcbiAgICAgICAgd3JhcHBlci5wdXNoKGRlZmF1bHRXcmFwcGVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrQXBpKG9wdGlvbnMpIHtcbiAgICAgIGZvcm1seUFwaUNoZWNrLnRocm93KGZvcm1seUFwaUNoZWNrLmZvcm1seUZpZWxkT3B0aW9ucywgYXJndW1lbnRzLCB7XG4gICAgICAgIHByZWZpeDogJ2Zvcm1seS1maWVsZCBkaXJlY3RpdmUnLFxuICAgICAgICB1cmw6ICdmb3JtbHktZmllbGQtZGlyZWN0aXZlLXZhbGlkYXRpb24tZmFpbGVkJ1xuICAgICAgfSk7XG4gICAgICAvLyB2YWxpZGF0ZSB3aXRoIHRoZSB0eXBlXG4gICAgICBjb25zdCB0eXBlID0gb3B0aW9ucy50eXBlICYmIGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSk7XG4gICAgICBpZiAodHlwZSkge1xuICAgICAgICBpZiAodHlwZS52YWxpZGF0ZU9wdGlvbnMpIHtcbiAgICAgICAgICB0eXBlLnZhbGlkYXRlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBydW5BcGlDaGVjayh0eXBlLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5BcGlDaGVjayh7YXBpQ2hlY2ssIGFwaUNoZWNrSW5zdGFuY2UsIGFwaUNoZWNrRnVuY3Rpb24sIGFwaUNoZWNrT3B0aW9uc30sIG9wdGlvbnMpIHtcbiAgICAgIGlmICghYXBpQ2hlY2spIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgaW5zdGFuY2UgPSBhcGlDaGVja0luc3RhbmNlIHx8IGZvcm1seUFwaUNoZWNrO1xuICAgICAgY29uc3QgZm4gPSBhcGlDaGVja0Z1bmN0aW9uIHx8ICd3YXJuJztcbiAgICAgIGNvbnN0IHNoYXBlID0gaW5zdGFuY2Uuc2hhcGUoYXBpQ2hlY2spO1xuICAgICAgaW5zdGFuY2VbZm5dKHNoYXBlLCBbb3B0aW9uc10sIGFwaUNoZWNrT3B0aW9ucyB8fCB7XG4gICAgICAgIHByZWZpeDogYGZvcm1seS1maWVsZCAke25hbWV9YCxcbiAgICAgICAgdXJsOiBmb3JtbHlBcGlDaGVjay5jb25maWcub3V0cHV0LmRvY3NCYXNlVXJsICsgJ2Zvcm1seS1maWVsZC10eXBlLWFwaWNoZWNrLWZhaWxlZCdcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gYXJyYXlpZnkob2JqKSB7XG4gICAgaWYgKG9iaiAmJiAhYW5ndWxhci5pc0FycmF5KG9iaikpIHtcbiAgICAgIG9iaiA9IFtvYmpdO1xuICAgIH0gZWxzZSBpZiAoIW9iaikge1xuICAgICAgb2JqID0gW107XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9kaXJlY3RpdmVzL2Zvcm1seS1maWVsZC5qc1xuICoqLyIsImxldCBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhci1maXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLmRpcmVjdGl2ZSgnZm9ybWx5Rm9ybScsIGZvcm1seUZvcm0pO1xuXG4gIGZvcm1seUZvcm0udGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZSgnLi9mb3JtbHktZm9ybS50ZXN0JykobmdNb2R1bGUpIDogbnVsbDtcblxuICAvKipcbiAgICogQG5nZG9jIGRpcmVjdGl2ZVxuICAgKiBAbmFtZSBmb3JtbHlGb3JtXG4gICAqIEByZXN0cmljdCBFXG4gICAqL1xuICBmdW5jdGlvbiBmb3JtbHlGb3JtKGZvcm1seVVzYWJpbGl0eSkge1xuICAgIHZhciBjdXJyZW50Rm9ybUlkID0gMTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdFJyxcbiAgICAgIHRlbXBsYXRlOiBmdW5jdGlvbihlbCwgYXR0cnMpIHtcbiAgICAgICAgLyoganNoaW50IC1XMDMzICovIC8vIHRoaXMgYmVjYXVzZSBqc2hpbnQgaXMgYnJva2VuIEkgZ3Vlc3MuLi5cbiAgICAgICAgdmFyIHJvb3RFbCA9IGF0dHJzLnJvb3RFbCB8fCAnbmctZm9ybSc7XG4gICAgICAgIHJldHVybiBgXG4gICAgICAgICAgPCR7cm9vdEVsfSBjbGFzcz1cImZvcm1seVwiXG4gICAgICAgICAgICAgICAgICAgbmFtZT1cImZvcm1cIlxuICAgICAgICAgICAgICAgICAgIHJvbGU9XCJmb3JtXCI+XG4gICAgICAgICAgICA8ZGl2IGZvcm1seS1maWVsZFxuICAgICAgICAgICAgICAgICBuZy1yZXBlYXQ9XCJmaWVsZCBpbiBmaWVsZHMgdHJhY2sgYnkgJGluZGV4XCJcbiAgICAgICAgICAgICAgICAgbmctaWY9XCIhZmllbGQuaGlkZVwiXG4gICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybWx5LWZpZWxkIHt7ZmllbGQudHlwZSA/ICdmb3JtbHktZmllbGQtJyArIGZpZWxkLnR5cGUgOiAnJ319XCJcbiAgICAgICAgICAgICAgICAgb3B0aW9ucz1cImZpZWxkXCJcbiAgICAgICAgICAgICAgICAgbW9kZWw9XCJmaWVsZC5tb2RlbCB8fCBtb2RlbFwiXG4gICAgICAgICAgICAgICAgIGZpZWxkcz1cImZpZWxkc1wiXG4gICAgICAgICAgICAgICAgIGZvcm09XCJmb3JtXCJcbiAgICAgICAgICAgICAgICAgZm9ybS1pZD1cImZvcm1JZFwiXG4gICAgICAgICAgICAgICAgIGZvcm0tc3RhdGU9XCJvcHRpb25zLmZvcm1TdGF0ZVwiXG4gICAgICAgICAgICAgICAgIGluZGV4PVwiJGluZGV4XCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgbmctdHJhbnNjbHVkZT48L2Rpdj5cbiAgICAgICAgICA8LyR7cm9vdEVsfT5cbiAgICAgICAgYDtcbiAgICAgIH0sXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIGZpZWxkczogJz0nLFxuICAgICAgICBtb2RlbDogJz0nLCAvLyB3ZSdsbCBkbyBvdXIgb3duIHdhcm5pbmcgdG8gaGVscCB3aXRoIG1pZ3JhdGlvbnNcbiAgICAgICAgZm9ybTogJz0/JyxcbiAgICAgICAgb3B0aW9uczogJz0/J1xuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IGZ1bmN0aW9uKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUuZm9ybUlkID0gYGZvcm1seV8ke2N1cnJlbnRGb3JtSWQrK31gO1xuICAgICAgICAkc2NvcGUub3B0aW9ucyA9ICRzY29wZS5vcHRpb25zIHx8IHt9O1xuICAgICAgICAkc2NvcGUub3B0aW9ucy5mb3JtU3RhdGUgPSAkc2NvcGUub3B0aW9ucy5mb3JtU3RhdGUgfHwge307XG5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGF0dGFjaEtleSk7IC8vIGF0dGFjaGVzIGEga2V5IGJhc2VkIG9uIHRoZSBpbmRleCBpZiBhIGtleSBpc24ndCBzcGVjaWZpZWRcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIHNldHVwV2F0Y2hlcnMpOyAvLyBzZXR1cCB3YXRjaGVycyBmb3IgYWxsIGZpZWxkc1xuXG4gICAgICAgIC8vIHdhdGNoIHRoZSBtb2RlbCBhbmQgZXZhbHVhdGUgd2F0Y2ggZXhwcmVzc2lvbnMgdGhhdCBkZXBlbmQgb24gaXQuXG4gICAgICAgICRzY29wZS4kd2F0Y2goJ21vZGVsJywgZnVuY3Rpb24gb25SZXN1bHRVcGRhdGUobmV3UmVzdWx0KSB7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGZ1bmN0aW9uKGZpZWxkKSB7XG4gICAgICAgICAgICAvKmpzaGludCAtVzAzMCAqL1xuICAgICAgICAgICAgZmllbGQucnVuRXhwcmVzc2lvbnMgJiYgZmllbGQucnVuRXhwcmVzc2lvbnMobmV3UmVzdWx0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gYXR0YWNoS2V5KGZpZWxkLCBpbmRleCkge1xuICAgICAgICAgIGZpZWxkLmtleSA9IGZpZWxkLmtleSB8fCBpbmRleCB8fCAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0dXBXYXRjaGVycyhmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGZpZWxkLndhdGNoZXIpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciB3YXRjaGVycyA9IGZpZWxkLndhdGNoZXI7XG4gICAgICAgICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkod2F0Y2hlcnMpKSB7XG4gICAgICAgICAgICB3YXRjaGVycyA9IFt3YXRjaGVyc107XG4gICAgICAgICAgfVxuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh3YXRjaGVycywgZnVuY3Rpb24od2F0Y2hlcikge1xuICAgICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZCh3YXRjaGVyLmxpc3RlbmVyKSkge1xuICAgICAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0RmllbGRFcnJvcihcbiAgICAgICAgICAgICAgICAnYWxsLWZpZWxkLXdhdGNoZXJzLW11c3QtaGF2ZS1hLWxpc3RlbmVyJyxcbiAgICAgICAgICAgICAgICAnQWxsIGZpZWxkIHdhdGNoZXJzIG11c3QgaGF2ZSBhIGxpc3RlbmVyJywgZmllbGRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB3YXRjaEV4cHJlc3Npb24gPSBnZXRXYXRjaEV4cHJlc3Npb24od2F0Y2hlciwgZmllbGQsIGluZGV4KTtcbiAgICAgICAgICAgIHZhciB3YXRjaExpc3RlbmVyID0gZ2V0V2F0Y2hMaXN0ZW5lcih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpO1xuXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHdhdGNoZXIudHlwZSB8fCAnJHdhdGNoJztcbiAgICAgICAgICAgIHdhdGNoZXIuc3RvcFdhdGNoaW5nID0gJHNjb3BlW3R5cGVdKHdhdGNoRXhwcmVzc2lvbiwgd2F0Y2hMaXN0ZW5lciwgd2F0Y2hlci53YXRjaERlZXApO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0V2F0Y2hFeHByZXNzaW9uKHdhdGNoZXIsIGZpZWxkLCBpbmRleCkge1xuICAgICAgICAgIHZhciB3YXRjaEV4cHJlc3Npb24gPSB3YXRjaGVyLmV4cHJlc3Npb24gfHwgYG1vZGVsWycke2ZpZWxkLmtleX0nXWA7XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih3YXRjaEV4cHJlc3Npb24pKSB7XG4gICAgICAgICAgICAvLyB3cmFwIHRoZSBmaWVsZCdzIHdhdGNoIGV4cHJlc3Npb24gc28gd2UgY2FuIGNhbGwgaXQgd2l0aCB0aGUgZmllbGQgYXMgdGhlIGZpcnN0IGFyZ1xuICAgICAgICAgICAgLy8gYW5kIHRoZSBzdG9wIGZ1bmN0aW9uIGFzIHRoZSBsYXN0IGFyZyBhcyBhIGhlbHBlclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsRXhwcmVzc2lvbiA9IHdhdGNoRXhwcmVzc2lvbjtcbiAgICAgICAgICAgIHdhdGNoRXhwcmVzc2lvbiA9IGZ1bmN0aW9uIGZvcm1seVdhdGNoRXhwcmVzc2lvbigpIHtcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBtb2RpZnlBcmdzKHdhdGNoZXIsIGluZGV4LCAuLi5hcmd1bWVudHMpO1xuICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxFeHByZXNzaW9uKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdhdGNoRXhwcmVzc2lvbi5kaXNwbGF5TmFtZSA9IGBGb3JtbHkgV2F0Y2ggRXhwcmVzc2lvbiBmb3IgZmllbGQgZm9yICR7ZmllbGQua2V5fWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB3YXRjaEV4cHJlc3Npb247XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRXYXRjaExpc3RlbmVyKHdhdGNoZXIsIGZpZWxkLCBpbmRleCkge1xuICAgICAgICAgIHZhciB3YXRjaExpc3RlbmVyID0gd2F0Y2hlci5saXN0ZW5lcjtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHdhdGNoTGlzdGVuZXIpKSB7XG4gICAgICAgICAgICAvLyB3cmFwIHRoZSBmaWVsZCdzIHdhdGNoIGxpc3RlbmVyIHNvIHdlIGNhbiBjYWxsIGl0IHdpdGggdGhlIGZpZWxkIGFzIHRoZSBmaXJzdCBhcmdcbiAgICAgICAgICAgIC8vIGFuZCB0aGUgc3RvcCBmdW5jdGlvbiBhcyB0aGUgbGFzdCBhcmcgYXMgYSBoZWxwZXJcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbExpc3RlbmVyID0gd2F0Y2hMaXN0ZW5lcjtcbiAgICAgICAgICAgIHdhdGNoTGlzdGVuZXIgPSBmdW5jdGlvbiBmb3JtbHlXYXRjaExpc3RlbmVyKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IG1vZGlmeUFyZ3Mod2F0Y2hlciwgaW5kZXgsIC4uLmFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbExpc3RlbmVyKC4uLmFyZ3MpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdhdGNoTGlzdGVuZXIuZGlzcGxheU5hbWUgPSBgRm9ybWx5IFdhdGNoIExpc3RlbmVyIGZvciBmaWVsZCBmb3IgJHtmaWVsZC5rZXl9YDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHdhdGNoTGlzdGVuZXI7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtb2RpZnlBcmdzKHdhdGNoZXIsIGluZGV4LCAuLi5vcmlnaW5hbEFyZ3MpIHtcbiAgICAgICAgICByZXR1cm4gWyRzY29wZS5maWVsZHNbaW5kZXhdLCAuLi5vcmlnaW5hbEFyZ3MsIHdhdGNoZXIuc3RvcFdhdGNoaW5nXTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbCwgYXR0cnMpIHtcbiAgICAgICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KCdyZXN1bHQnKSkge1xuICAgICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGb3JtbHlFcnJvcihcbiAgICAgICAgICAgICdUaGUgXCJyZXN1bHRcIiBhdHRyaWJ1dGUgb24gYSBmb3JtbHktZm9ybSBpcyBubyBsb25nZXIgdmFsaWQuIFVzZSBcIm1vZGVsXCIgaW5zdGVhZCdcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy5uYW1lICE9PSAnZm9ybScpIHsgLy8gdGhlbiB0aGV5IHNwZWNpZmllZCB0aGVpciBvd24gbmFtZVxuICAgICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGb3JtbHlFcnJvcihcbiAgICAgICAgICAgICdUaGUgXCJuYW1lXCIgYXR0cmlidXRlIG9uIGEgZm9ybWx5LWZvcm0gaXMgbm8gbG9uZ2VyIHZhbGlkLiBVc2UgXCJmb3JtXCIgaW5zdGVhZCdcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKCdmb3JtbHlGb2N1cycsIGZ1bmN0aW9uKCR0aW1lb3V0LCAkZG9jdW1lbnQpIHtcbiAgICAvKiBqc2hpbnQgLVcwNTIgKi9cbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6ICdBJyxcbiAgICAgIGxpbms6IGZ1bmN0aW9uKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgcHJldmlvdXNFbCA9IG51bGw7XG4gICAgICAgIHZhciBlbCA9IGVsZW1lbnRbMF07XG4gICAgICAgIHZhciBkb2MgPSAkZG9jdW1lbnRbMF07XG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKCdmb3JtbHlGb2N1cycsIGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSAndHJ1ZScpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkge1xuICAgICAgICAgICAgICBwcmV2aW91c0VsID0gZG9jLmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgICAgICB9LCB+fmF0dHJzLmZvY3VzV2FpdCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gJ2ZhbHNlJykge1xuICAgICAgICAgICAgaWYgKGRvYy5hY3RpdmVFbGVtZW50ID09PSBlbCkge1xuICAgICAgICAgICAgICBlbC5ibHVyKCk7XG4gICAgICAgICAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eSgncmVmb2N1cycpICYmIHByZXZpb3VzRWwpIHtcbiAgICAgICAgICAgICAgICBwcmV2aW91c0VsLmZvY3VzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvY3VzLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLnJ1bihhZGRGb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcik7XG5cbiAgZnVuY3Rpb24gYWRkRm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IoZm9ybWx5Q29uZmlnKSB7XG4gICAgaWYgKGZvcm1seUNvbmZpZy5leHRyYXMuZGlzYWJsZU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wcmVXcmFwcGVyLnB1c2gobmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IpO1xuXG5cbiAgICBmdW5jdGlvbiBuZ01vZGVsQXR0cnNNYW5pcHVsYXRvcih0ZW1wbGF0ZSwgb3B0aW9ucywgc2NvcGUpIHtcbiAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgICAgIHZhciBlbCA9IGFuZ3VsYXIuZWxlbWVudCgnPGE+PC9hPicpO1xuICAgICAgdmFyIGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgICBpZiAoZGF0YS5ub1RvdWNoeSkge1xuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgICB9XG4gICAgICBlbC5hcHBlbmQodGVtcGxhdGUpO1xuICAgICAgdmFyIG1vZGVsRWxzID0gYW5ndWxhci5lbGVtZW50KGVsWzBdLnF1ZXJ5U2VsZWN0b3JBbGwoJ1tuZy1tb2RlbF0nKSk7XG4gICAgICBpZiAoIW1vZGVsRWxzIHx8ICFtb2RlbEVscy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgfVxuXG4gICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxFbHMsICdpZCcsIHNjb3BlLmlkKTtcbiAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbEVscywgJ25hbWUnLCBzY29wZS5pZCk7XG5cbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnZhbGlkYXRvcnMpKSB7XG4gICAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbEVscywgJ2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbicsICdvcHRpb25zLnZhbGlkYXRvcnMnKTtcbiAgICAgIH1cbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLm1vZGVsT3B0aW9ucykpIHtcbiAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCAnbmctbW9kZWwtb3B0aW9ucycsICdvcHRpb25zLm1vZGVsT3B0aW9ucycpO1xuICAgICAgICBpZiAob3B0aW9ucy5tb2RlbE9wdGlvbnMuZ2V0dGVyU2V0dGVyKSB7XG4gICAgICAgICAgbW9kZWxFbHMuYXR0cignbmctbW9kZWwnLCAnb3B0aW9ucy52YWx1ZScpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBhZGRUZW1wbGF0ZU9wdGlvbnNBdHRycygpO1xuXG4gICAgICByZXR1cm4gZWwuaHRtbCgpO1xuXG5cbiAgICAgIGZ1bmN0aW9uIGFkZFRlbXBsYXRlT3B0aW9uc0F0dHJzKCkge1xuICAgICAgICBpZiAoIW9wdGlvbnMudGVtcGxhdGVPcHRpb25zICYmICFvcHRpb25zLmV4cHJlc3Npb25Qcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgLy8gbm8gbmVlZCB0byBydW4gdGhlc2UgaWYgdGhlcmUgYXJlIG5vIHRlbXBsYXRlT3B0aW9ucyBvciBleHByZXNzaW9uUHJvcGVydGllc1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0byA9IG9wdGlvbnMudGVtcGxhdGVPcHRpb25zIHx8IHt9O1xuICAgICAgICBjb25zdCBlcCA9IG9wdGlvbnMuZXhwcmVzc2lvblByb3BlcnRpZXMgfHwge307XG5cbiAgICAgICAgbGV0IG5nTW9kZWxBdHRyaWJ1dGVzID0gZ2V0QnVpbHRpbkF0dHJpYnV0ZXMoKTtcblxuICAgICAgICAvLyBleHRlbmQgd2l0aCB0aGUgdXNlcidzIHNwZWNpZmljYXRpb25zIHdpbm5pbmdcbiAgICAgICAgYW5ndWxhci5leHRlbmQobmdNb2RlbEF0dHJpYnV0ZXMsIG9wdGlvbnMubmdNb2RlbEF0dHJzKTtcblxuICAgICAgICBhbmd1bGFyLmZvckVhY2gobmdNb2RlbEF0dHJpYnV0ZXMsICh2YWwsIG5hbWUpID0+IHtcbiAgICAgICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eToxMCAqL1xuICAgICAgICAgIGxldCBhdHRyVmFsO1xuICAgICAgICAgIGxldCBhdHRyTmFtZTtcbiAgICAgICAgICBjb25zdCByZWYgPSBgb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbJyR7bmFtZX0nXWA7XG4gICAgICAgICAgY29uc3QgdG9WYWwgPSB0b1tuYW1lXTtcbiAgICAgICAgICBjb25zdCBlcFZhbCA9IGdldEVwVmFsdWUoZXAsIG5hbWUpO1xuXG4gICAgICAgICAgY29uc3QgaW5UbyA9IGFuZ3VsYXIuaXNEZWZpbmVkKHRvVmFsKTtcbiAgICAgICAgICBjb25zdCBpbkVwID0gYW5ndWxhci5pc0RlZmluZWQoZXBWYWwpO1xuICAgICAgICAgIGlmICh2YWwudmFsdWUpIHtcbiAgICAgICAgICAgIC8vIEkgcmVhbGl6ZSB0aGlzIGxvb2tzIGJhY2t3YXJkcywgYnV0IGl0J3MgcmlnaHQsIHRydXN0IG1lLi4uXG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC52YWx1ZTtcbiAgICAgICAgICAgIGF0dHJWYWwgPSBuYW1lO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmFsLmV4cHJlc3Npb24gJiYgaW5Ubykge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSB2YWwuZXhwcmVzc2lvbjtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHRvW25hbWVdKSkge1xuICAgICAgICAgICAgICBhdHRyVmFsID0gYCRldmFsKCR7cmVmfSlgO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odG9bbmFtZV0pKSB7XG4gICAgICAgICAgICAgIGF0dHJWYWwgPSBgJHtyZWZ9KG1vZGVsW29wdGlvbnMua2V5XSwgb3B0aW9ucywgdGhpcywgJGV2ZW50KWA7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgYG9wdGlvbnMudGVtcGxhdGVPcHRpb25zLiR7bmFtZX0gbXVzdCBiZSBhIHN0cmluZyBvciBmdW5jdGlvbjogJHtKU09OLnN0cmluZ2lmeShvcHRpb25zKX1gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWwuYm91bmQgJiYgaW5FcCkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYm91bmQ7XG4gICAgICAgICAgICBhdHRyVmFsID0gcmVmO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmFsLmF0dHJpYnV0ZSAmJiBpbkVwKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5hdHRyaWJ1dGU7XG4gICAgICAgICAgICBhdHRyVmFsID0gYHt7JHtyZWZ9fX1gO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmFsLmF0dHJpYnV0ZSAmJiBpblRvKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5hdHRyaWJ1dGU7XG4gICAgICAgICAgICBhdHRyVmFsID0gdG9WYWw7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWwuYm91bmQgJiYgaW5Ubykge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYm91bmQ7XG4gICAgICAgICAgICBhdHRyVmFsID0gcmVmO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0ck5hbWUpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJWYWwpKSB7XG4gICAgICAgICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxFbHMsIGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRCdWlsdGluQXR0cmlidXRlcygpIHtcbiAgICAgICAgbGV0IG5nTW9kZWxBdHRyaWJ1dGVzID0ge1xuICAgICAgICAgIGZvY3VzOiB7XG4gICAgICAgICAgICBhdHRyaWJ1dGU6ICdmb3JtbHktZm9jdXMnXG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBib3VuZE9ubHkgPSBbXTtcbiAgICAgICAgY29uc3QgYm90aEF0dHJpYnV0ZUFuZEJvdW5kID0gWydyZXF1aXJlZCcsICdkaXNhYmxlZCcsICdwYXR0ZXJuJywgJ21pbmxlbmd0aCddO1xuICAgICAgICBjb25zdCBleHByZXNzaW9uT25seSA9IFsnY2hhbmdlJywgJ2tleWRvd24nLCAna2V5dXAnLCAna2V5cHJlc3MnLCAnY2xpY2snLCAnZm9jdXMnLCAnYmx1ciddO1xuICAgICAgICBjb25zdCBhdHRyaWJ1dGVPbmx5ID0gWydwbGFjZWhvbGRlcicsICdtaW4nLCAnbWF4JywgJ3RhYmluZGV4JywgJ3R5cGUnXTtcbiAgICAgICAgaWYgKGZvcm1seUNvbmZpZy5leHRyYXMubmdNb2RlbEF0dHJzTWFuaXB1bGF0b3JQcmVmZXJCb3VuZCkge1xuICAgICAgICAgIGJvdW5kT25seS5wdXNoKCdtYXhsZW5ndGgnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBib3RoQXR0cmlidXRlQW5kQm91bmQucHVzaCgnbWF4bGVuZ3RoJyk7XG4gICAgICAgIH1cblxuICAgICAgICBhbmd1bGFyLmZvckVhY2goYm91bmRPbmx5LCBpdGVtID0+IHtcbiAgICAgICAgICBuZ01vZGVsQXR0cmlidXRlc1tpdGVtXSA9IHtib3VuZDogJ25nLScgKyBpdGVtfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKGJvdGhBdHRyaWJ1dGVBbmRCb3VuZCwgaXRlbSA9PiB7XG4gICAgICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7YXR0cmlidXRlOiBpdGVtLCBib3VuZDogJ25nLScgKyBpdGVtfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKGV4cHJlc3Npb25Pbmx5LCBpdGVtID0+IHtcbiAgICAgICAgICB2YXIgcHJvcE5hbWUgPSAnb24nICsgaXRlbS5zdWJzdHIoMCwgMSkudG9VcHBlckNhc2UoKSArIGl0ZW0uc3Vic3RyKDEpO1xuICAgICAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW3Byb3BOYW1lXSA9IHtleHByZXNzaW9uOiAnbmctJyArIGl0ZW19O1xuICAgICAgICB9KTtcblxuICAgICAgICBhbmd1bGFyLmZvckVhY2goYXR0cmlidXRlT25seSwgaXRlbSA9PiB7XG4gICAgICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7YXR0cmlidXRlOiBpdGVtfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZ01vZGVsQXR0cmlidXRlcztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0RXBWYWx1ZShlcCwgbmFtZSkge1xuICAgICAgICByZXR1cm4gZXBbJ3RlbXBsYXRlT3B0aW9ucy4nICsgbmFtZV0gfHxcbiAgICAgICAgICBlcFtgdGVtcGxhdGVPcHRpb25zWycke25hbWV9J11gXSB8fFxuICAgICAgICAgIGVwW2B0ZW1wbGF0ZU9wdGlvbnNbXCIke25hbWV9XCJdYF07XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFkZElmTm90UHJlc2VudChlbCwgYXR0ciwgdmFsKSB7XG4gICAgICAgIGlmICghZWwuYXR0cihhdHRyKSkge1xuICAgICAgICAgIGVsLmF0dHIoYXR0ciwgdmFsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3J1bi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvci5qc1xuICoqLyIsImNvbnN0IGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyLWZpeCcpO1xuXG5leHBvcnQgZGVmYXVsdCB7Zm9ybWx5RXZhbCwgZ2V0RmllbGRJZCwgcmV2ZXJzZURlZXBNZXJnZX07XG5cbmZ1bmN0aW9uIGZvcm1seUV2YWwoc2NvcGUsIGV4cHJlc3Npb24sIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSkge1xuICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGV4cHJlc3Npb24pKSB7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24odmlld1ZhbHVlIHx8IG1vZGVsVmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc2NvcGUuJGV2YWwoZXhwcmVzc2lvbiwge1xuICAgICAgJHZpZXdWYWx1ZTogdmlld1ZhbHVlIHx8IG1vZGVsVmFsdWUsXG4gICAgICAkbW9kZWxWYWx1ZTogbW9kZWxWYWx1ZVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkSWQoZm9ybUlkLCBvcHRpb25zLCBpbmRleCkge1xuICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICB0eXBlID0gJ3RlbXBsYXRlJztcbiAgfSBlbHNlIGlmICghdHlwZSAmJiBvcHRpb25zLnRlbXBsYXRlVXJsKSB7XG4gICAgdHlwZSA9ICd0ZW1wbGF0ZVVybCc7XG4gIH1cblxuICByZXR1cm4gW2Zvcm1JZCwgdHlwZSwgb3B0aW9ucy5rZXksIGluZGV4XS5qb2luKCdfJyk7XG59XG5cblxuZnVuY3Rpb24gcmV2ZXJzZURlZXBNZXJnZShkZXN0KSB7XG4gIGFuZ3VsYXIuZm9yRWFjaChhcmd1bWVudHMsIChzcmMsIGluZGV4KSA9PiB7XG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhbmd1bGFyLmZvckVhY2goc3JjLCAodmFsLCBwcm9wKSA9PiB7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGRlc3RbcHJvcF0pKSB7XG4gICAgICAgIGRlc3RbcHJvcF0gPSBhbmd1bGFyLmNvcHkodmFsKTtcbiAgICAgIH0gZWxzZSBpZiAob2JqQW5kU2FtZVR5cGUoZGVzdFtwcm9wXSwgdmFsKSkge1xuICAgICAgICByZXZlcnNlRGVlcE1lcmdlKGRlc3RbcHJvcF0sIHZhbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvYmpBbmRTYW1lVHlwZShvYmoxLCBvYmoyKSB7XG4gIHJldHVybiBhbmd1bGFyLmlzT2JqZWN0KG9iajEpICYmIGFuZ3VsYXIuaXNPYmplY3Qob2JqMikgJiZcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqMSkgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmoyKTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL290aGVyL3V0aWxzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZm9ybWx5LmpzIn0=