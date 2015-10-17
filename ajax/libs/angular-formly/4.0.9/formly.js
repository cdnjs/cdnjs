// angular-formly version 4.0.9 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

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
	
	module.exports = "https://github.com/formly-js/angular-formly/blob/" + ("4.0.9") + "/other/ERRORS_AND_WARNINGS.md#";

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
	  __webpack_require__(12)(ngModule);
	  __webpack_require__(13)(ngModule);
	  __webpack_require__(14)(ngModule);
	  __webpack_require__(15)(ngModule);
	  __webpack_require__(16)(ngModule);
	  __webpack_require__(17)(ngModule);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(10)(ngModule);
	  __webpack_require__(11)(ngModule);
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
	
	var utils = __webpack_require__(23);
	
	module.exports = function (ngModule) {
	  ngModule.factory("formlyUtil", formlyUtil);
	
	  formlyUtil.tests = false ? require("./formlyUtil.test")(ngModule) : null;
	
	  function formlyUtil() {
	    return utils;
	  }
	};

/***/ },
/* 11 */
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
/* 12 */
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
/* 13 */
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
/* 14 */
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
	          if (optionsDOIsFn) {
	            return optionsDO(mergedDefaultOptions);
	          } else {
	            utils.reverseDeepMerge(extendsDefaultOptions, optionsDO);
	            return extendsDefaultOptions;
	          }
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyVersion", ("4.0.9"));
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyErrorAndWarningsUrlPrefix", "https://github.com/formly-js/angular-formly/blob/" + ("4.0.9") + "/other/ERRORS_AND_WARNINGS.md#");
	};

/***/ },
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyCustomValidation", formlyCustomValidation);
	
	  formlyCustomValidation.tests = false ? require("./formly-custom-validation.test")(ngModule) : null;
	
	  function formlyCustomValidation(formlyUtil, $q) {
	    return {
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
	          var stopWaitingForDestroy;
	          var maxTime = 2000;
	          var intervalTime = 5;
	          var iterations = 0;
	          var interval = setInterval(function () {
	            iterations++;
	            if (!angular.isDefined(options.key)) {
	              return cleanUp();
	            }
	            var formControl = scope.form && scope.form[scope.id];
	            if (formControl) {
	              options.formControl = formControl;
	              scope.fc = formControl;
	              addShowMessagesWatcher(scope, options);
	              cleanUp();
	            } else if (intervalTime * iterations > maxTime) {
	              formlyWarn("couldnt-set-the-formcontrol-after-timems", "Couldn't set the formControl after " + maxTime + "ms", scope);
	              cleanUp();
	            }
	          }, intervalTime);
	          stopWaitingForDestroy = scope.$on("$destroy", cleanUp);
	
	          function cleanUp() {
	            stopWaitingForDestroy();
	            clearInterval(interval);
	          }
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
	            scope.showError = show;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA2YmZkNDBmZWM3NGQ4MjY3MDkyNCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImFwaUNoZWNrXCIsXCJhbWRcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanMyXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzXCI6XCJhcGktY2hlY2tcIn0iLCJ3ZWJwYWNrOi8vLy4vb3RoZXIvZG9jc0Jhc2VVcmwuanMiLCJ3ZWJwYWNrOi8vLy4vYW5ndWxhci1maXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9mb3JtbHlVdGlsLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2Zvcm1seVdhcm4uanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seUFwaUNoZWNrLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHkuanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seUNvbmZpZy5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5VmVyc2lvbi5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeC5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWZpZWxkLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktZm9jdXMuanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2Zvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yLmpzIiwid2VicGFjazovLy8uL290aGVyL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O0FDdENBOztBQUVBLHlDOzs7Ozs7QUNGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQjs7Ozs7O0FDZkEsZ0Q7Ozs7OztBQ0FBOztBQUVBLHFIOzs7Ozs7QUNGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSwwQjs7Ozs7O0FDUkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNUQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNMQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDUEE7O0FBRUE7QUFDQTtBQUNBLEc7Ozs7OztBQ0pBLGdEOzs7Ozs7QUNBQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ1pBOztBQUVBLDBDQUF5QywwQkFBMEIsMENBQTBDLGdCQUFnQix1QkFBdUIsYUFBYSxFQUFFLE9BQU8sd0JBQXdCLEVBQUU7O0FBRXBNO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRzs7Ozs7O0FDaEJBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHOztBQUVIO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRzs7Ozs7O0FDM0lBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRztBQUNILEc7Ozs7OztBQzFEQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EscUNBQW9DLGlCQUFpQjtBQUNyRCxxQ0FBb0MsaUJBQWlCO0FBQ3JEO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1gsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ2xTQTs7QUFFQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDSkE7O0FBRUE7QUFDQTtB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ZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFwaS1jaGVja1wiKSwgcmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiYXBpLWNoZWNrXCIsIFwiYW5ndWxhclwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJuZ0Zvcm1seVwiXSA9IGZhY3RvcnkocmVxdWlyZShcImFwaS1jaGVja1wiKSwgcmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5nRm9ybWx5XCJdID0gZmFjdG9yeShyb290W1wiYXBpQ2hlY2tcIl0sIHJvb3RbXCJhbmd1bGFyXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDZiZmQ0MGZlYzc0ZDgyNjcwOTI0XG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gcmVxdWlyZShcIi4vaW5kZXguY29tbW9uXCIpO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYXBpQ2hlY2sgPSByZXF1aXJlKFwiYXBpLWNoZWNrXCIpO1xuaWYgKCFhcGlDaGVjaykge1xuICB0aHJvdyBuZXcgRXJyb3IoXCJhbmd1bGFyLWZvcm1seSByZXF1aXJlcyB0aGUgbGlicmFyeSBhcGlDaGVjay5qcyEgUGxlYXNlIGluY2x1ZGUgaXQhIFwiICsgcmVxdWlyZShcIi4vb3RoZXIvZG9jc0Jhc2VVcmxcIikgKyBcImFwaWNoZWNranMtZGVwZW5kZW5jeS1yZXF1aXJlZFwiKTtcbn1cbnZhciBuZ01vZHVsZU5hbWUgPSBcImZvcm1seVwiO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiLi9hbmd1bGFyLWZpeFwiKTtcbnZhciBuZ01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5nTW9kdWxlTmFtZSwgW10pO1xuXG5yZXF1aXJlKFwiLi9wcm92aWRlcnNcIikobmdNb2R1bGUpO1xucmVxdWlyZShcIi4vc2VydmljZXNcIikobmdNb2R1bGUpO1xucmVxdWlyZShcIi4vZGlyZWN0aXZlc1wiKShuZ01vZHVsZSk7XG5yZXF1aXJlKFwiLi9ydW5cIikobmdNb2R1bGUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlTmFtZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguY29tbW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImFwaUNoZWNrXCIsXCJhbWRcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanMyXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzXCI6XCJhcGktY2hlY2tcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBcImh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtbHktanMvYW5ndWxhci1mb3JtbHkvYmxvYi9cIiArIFZFUlNJT04gKyBcIi9vdGhlci9FUlJPUlNfQU5EX1dBUk5JTkdTLm1kI1wiO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9vdGhlci9kb2NzQmFzZVVybC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBzb21lIHZlcnNpb25zIG9mIGFuZ3VsYXIgZG9uJ3QgZXhwb3J0IHRoZSBhbmd1bGFyIG1vZHVsZSBwcm9wZXJseSxcbi8vIHNvIHdlIGdldCBpdCBmcm9tIHdpbmRvdyBpbiB0aGlzIGNhc2UuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xuaWYgKCFhbmd1bGFyLnZlcnNpb24pIHtcbiAgYW5ndWxhciA9IHdpbmRvdy5hbmd1bGFyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hbmd1bGFyLWZpeC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICByZXF1aXJlKFwiLi9mb3JtbHlBcGlDaGVja1wiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seVVzYWJpbGl0eVwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seUNvbmZpZ1wiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seVZlcnNpb25cIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4XCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzXCIpKG5nTW9kdWxlKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Byb3ZpZGVycy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICByZXF1aXJlKFwiLi9mb3JtbHlVdGlsXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5V2FyblwiKShuZ01vZHVsZSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zZXJ2aWNlcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICByZXF1aXJlKFwiLi9mb3JtbHktY3VzdG9tLXZhbGlkYXRpb25cIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHktZmllbGRcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHktZm9ybVwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seS1mb2N1c1wiKShuZ01vZHVsZSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kaXJlY3RpdmVzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yXCIpKG5nTW9kdWxlKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3J1bi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV85X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKFwiLi4vb3RoZXIvdXRpbHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmZhY3RvcnkoXCJmb3JtbHlVdGlsXCIsIGZvcm1seVV0aWwpO1xuXG4gIGZvcm1seVV0aWwudGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZShcIi4vZm9ybWx5VXRpbC50ZXN0XCIpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5VXRpbCgpIHtcbiAgICByZXR1cm4gdXRpbHM7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NlcnZpY2VzL2Zvcm1seVV0aWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdG9Db25zdW1hYmxlQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgYXJyMltpXSA9IGFycltpXTsgcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZmFjdG9yeShcImZvcm1seVdhcm5cIiwgW1wiZm9ybWx5Q29uZmlnXCIsIFwiZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeFwiLCBcIiRsb2dcIiwgZnVuY3Rpb24gKGZvcm1seUNvbmZpZywgZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCwgJGxvZykge1xuICAgIHJldHVybiBmdW5jdGlvbiB3YXJuKCkge1xuICAgICAgaWYgKCFmb3JtbHlDb25maWcuZGlzYWJsZVdhcm5pbmdzKSB7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgdmFyIHdhcm5JbmZvU2x1ZyA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgYXJncy51bnNoaWZ0KFwiRm9ybWx5IFdhcm5pbmc6XCIpO1xuICAgICAgICBhcmdzLnB1c2goXCJcIiArIGZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXggKyBcIlwiICsgd2FybkluZm9TbHVnKTtcbiAgICAgICAgJGxvZy53YXJuLmFwcGx5KCRsb2csIF90b0NvbnN1bWFibGVBcnJheShhcmdzKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2VydmljZXMvZm9ybWx5V2Fybi5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcblxuICB2YXIgYXBpQ2hlY2sgPSByZXF1aXJlKFwiYXBpLWNoZWNrXCIpKHtcbiAgICBvdXRwdXQ6IHtcbiAgICAgIHByZWZpeDogXCJhbmd1bGFyLWZvcm1seTpcIixcbiAgICAgIGRvY3NCYXNlVXJsOiByZXF1aXJlKFwiLi4vb3RoZXIvZG9jc0Jhc2VVcmxcIilcbiAgICB9XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIHNoYXBlUmVxdWlyZWRJZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIGlmICghYW5ndWxhci5pc0FycmF5KG90aGVyUHJvcHMpKSB7XG4gICAgICBvdGhlclByb3BzID0gW290aGVyUHJvcHNdO1xuICAgIH1cbiAgICB2YXIgdHlwZSA9IFwic3BlY2lmaWVkIGlmIHRoZXNlIGFyZSBub3Qgc3BlY2lmaWVkOiBgXCIgKyBvdGhlclByb3BzLmpvaW4oXCIsIFwiKSArIFwiYCAob3RoZXJ3aXNlIGl0J3Mgb3B0aW9uYWwpXCI7XG4gICAgZnVuY3Rpb24gc2hhcGVSZXF1aXJlZElmTm90RGVmaW5pdGlvbihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgICAgdmFyIHByb3BFeGlzdHMgPSBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KHByb3BOYW1lKTtcbiAgICAgIHZhciBvdGhlclByb3BzRXhpc3QgPSBvdGhlclByb3BzLnNvbWUoZnVuY3Rpb24gKG90aGVyUHJvcCkge1xuICAgICAgICByZXR1cm4gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShvdGhlclByb3ApO1xuICAgICAgfSk7XG4gICAgICAvL2NvbnNvbGUubG9nKHByb3BOYW1lLCBwcm9wRXhpc3RzLCBwcm9wLCBvdGhlclByb3BzRXhpc3QsIG90aGVyUHJvcHMuam9pbignLCAnKSk7XG4gICAgICBpZiAoIW90aGVyUHJvcHNFeGlzdCAmJiAhcHJvcEV4aXN0cykge1xuICAgICAgICByZXR1cm4gYXBpQ2hlY2sudXRpbHMuZ2V0RXJyb3IocHJvcE5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvcEV4aXN0cykge1xuICAgICAgICByZXR1cm4gcHJvcENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgICBzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uLnR5cGUgPSB0eXBlO1xuICAgIGFwaUNoZWNrLnV0aWxzLmNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uKTtcbiAgICByZXR1cm4gc2hhcGVSZXF1aXJlZElmTm90RGVmaW5pdGlvbjtcbiAgfVxuXG4gIG5nTW9kdWxlLmNvbnN0YW50KFwiZm9ybWx5QXBpQ2hlY2tcIiwgYXBpQ2hlY2spO1xuICBpZiAoT05fVEVTVCkge1xuICAgIHJlcXVpcmUoXCIuL2Zvcm1seUFwaUNoZWNrLnRlc3RcIikobmdNb2R1bGUpO1xuICB9XG5cbiAgdmFyIGZvcm1seUV4cHJlc3Npb24gPSBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suZnVuY10pO1xuICB2YXIgc3BlY2lmeVdyYXBwZXJUeXBlID0gYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5vbmVPZihbbnVsbF0pLCBhcGlDaGVjay50eXBlT3JBcnJheU9mKGFwaUNoZWNrLnN0cmluZyldKTtcblxuICB2YXIgYXBpQ2hlY2tQcm9wZXJ0eSA9IGFwaUNoZWNrLm9iamVjdE9mKGFwaUNoZWNrLmZ1bmMpO1xuXG4gIHZhciBhcGlDaGVja0luc3RhbmNlUHJvcGVydHkgPSBhcGlDaGVjay5zaGFwZS5vbmx5SWYoXCJhcGlDaGVja1wiLCBhcGlDaGVjay5mdW5jLndpdGhQcm9wZXJ0aWVzKHtcbiAgICB3YXJuOiBhcGlDaGVjay5mdW5jLFxuICAgIFwidGhyb3dcIjogYXBpQ2hlY2suZnVuYyxcbiAgICBzaGFwZTogYXBpQ2hlY2suZnVuY1xuICB9KSk7XG5cbiAgdmFyIGFwaUNoZWNrRnVuY3Rpb25Qcm9wZXJ0eSA9IGFwaUNoZWNrLnNoYXBlLm9ubHlJZihcImFwaUNoZWNrXCIsIGFwaUNoZWNrLm9uZU9mKFtcInRocm93XCIsIFwid2FyblwiXSkpO1xuXG4gIHZhciBmb3JtbHlXcmFwcGVyVHlwZSA9IGFwaUNoZWNrLnNoYXBlKHtcbiAgICBuYW1lOiBzaGFwZVJlcXVpcmVkSWZOb3QoXCJ0eXBlc1wiLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIHRlbXBsYXRlOiBhcGlDaGVjay5zaGFwZS5pZk5vdChcInRlbXBsYXRlVXJsXCIsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgdGVtcGxhdGVVcmw6IGFwaUNoZWNrLnNoYXBlLmlmTm90KFwidGVtcGxhdGVcIiwgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICB0eXBlczogYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIG92ZXJ3cml0ZU9rOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsLFxuICAgIHZhbGlkYXRlT3B0aW9uczogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICBhcGlDaGVjazogYXBpQ2hlY2tQcm9wZXJ0eS5vcHRpb25hbCxcbiAgICBhcGlDaGVja0luc3RhbmNlOiBhcGlDaGVja0luc3RhbmNlUHJvcGVydHkub3B0aW9uYWwsXG4gICAgYXBpQ2hlY2tGdW5jdGlvbjogYXBpQ2hlY2tGdW5jdGlvblByb3BlcnR5Lm9wdGlvbmFsLFxuICAgIGFwaUNoZWNrT3B0aW9uczogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsXG4gIH0pLnN0cmljdDtcblxuICB2YXIgZmllbGRPcHRpb25zQXBpU2hhcGUgPSB7XG4gICAgdHlwZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoW1widGVtcGxhdGVcIiwgXCJ0ZW1wbGF0ZVVybFwiXSwgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICB0ZW1wbGF0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoW1widHlwZVwiLCBcInRlbXBsYXRlVXJsXCJdLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIHRlbXBsYXRlVXJsOiBhcGlDaGVjay5zaGFwZS5pZk5vdChbXCJ0eXBlXCIsIFwidGVtcGxhdGVcIl0sIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAga2V5OiBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2subnVtYmVyXSksXG4gICAgbW9kZWw6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgICBleHByZXNzaW9uUHJvcGVydGllczogYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2sub25lT2ZUeXBlKFtmb3JtbHlFeHByZXNzaW9uLCBhcGlDaGVjay5zaGFwZSh7XG4gICAgICBleHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLFxuICAgICAgbWVzc2FnZTogZm9ybWx5RXhwcmVzc2lvbi5vcHRpb25hbFxuICAgIH0pLnN0cmljdF0pKS5vcHRpb25hbCxcbiAgICBkYXRhOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gICAgdGVtcGxhdGVPcHRpb25zOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gICAgd3JhcHBlcjogc3BlY2lmeVdyYXBwZXJUeXBlLm9wdGlvbmFsLFxuICAgIG1vZGVsT3B0aW9uczogYXBpQ2hlY2suc2hhcGUoe1xuICAgICAgdXBkYXRlT246IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbCxcbiAgICAgIGRlYm91bmNlOiBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLm9iamVjdCwgYXBpQ2hlY2suc3RyaW5nXSkub3B0aW9uYWwsXG4gICAgICBhbGxvd0ludmFsaWQ6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgICBnZXR0ZXJTZXR0ZXI6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgICB0aW1lem9uZTogYXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsXG4gICAgfSkub3B0aW9uYWwsXG4gICAgd2F0Y2hlcjogYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihhcGlDaGVjay5zaGFwZSh7XG4gICAgICBleHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLm9wdGlvbmFsLFxuICAgICAgbGlzdGVuZXI6IGZvcm1seUV4cHJlc3Npb25cbiAgICB9KSkub3B0aW9uYWwsXG4gICAgdmFsaWRhdG9yczogYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2sub25lT2ZUeXBlKFtmb3JtbHlFeHByZXNzaW9uLCBhcGlDaGVjay5zaGFwZSh7XG4gICAgICBleHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLFxuICAgICAgbWVzc2FnZTogZm9ybWx5RXhwcmVzc2lvbi5vcHRpb25hbFxuICAgIH0pLnN0cmljdF0pKS5vcHRpb25hbCxcbiAgICBub0Zvcm1Db250cm9sOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsLFxuICAgIGhpZGU6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgbmdNb2RlbEF0dHJzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5zaGFwZSh7XG4gICAgICBleHByZXNzaW9uOiBhcGlDaGVjay5zaGFwZS5pZk5vdChbXCJ2YWx1ZVwiLCBcImF0dHJpYnV0ZVwiLCBcImJvdW5kXCJdLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsLFxuICAgICAgdmFsdWU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KFwiZXhwcmVzc2lvblwiLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsLFxuICAgICAgYXR0cmlidXRlOiBhcGlDaGVjay5zaGFwZS5pZk5vdChcImV4cHJlc3Npb25cIiwgYXBpQ2hlY2suYW55KS5vcHRpb25hbCxcbiAgICAgIGJvdW5kOiBhcGlDaGVjay5zaGFwZS5pZk5vdChcImV4cHJlc3Npb25cIiwgYXBpQ2hlY2suYW55KS5vcHRpb25hbFxuICAgIH0pLnN0cmljdCkub3B0aW9uYWwsXG4gICAgb3B0aW9uc1R5cGVzOiBhcGlDaGVjay50eXBlT3JBcnJheU9mKGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgbGluazogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICBjb250cm9sbGVyOiBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suZnVuYywgYXBpQ2hlY2suYXJyYXldKS5vcHRpb25hbCxcbiAgICB2YWxpZGF0aW9uOiBhcGlDaGVjay5zaGFwZSh7XG4gICAgICBzaG93OiBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLmJvb2wsIGFwaUNoZWNrLm9uZU9mKFtudWxsXSldKS5vcHRpb25hbCxcbiAgICAgIG1lc3NhZ2VzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5mdW5jKS5vcHRpb25hbCxcbiAgICAgIGVycm9yRXhpc3RzQW5kU2hvdWxkQmVWaXNpYmxlOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsXG4gICAgfSkub3B0aW9uYWwsXG4gICAgZm9ybUNvbnRyb2w6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgICB2YWx1ZTogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICBydW5FeHByZXNzaW9uczogYXBpQ2hlY2suZnVuYy5vcHRpb25hbFxuICB9O1xuXG4gIHZhciBmb3JtbHlGaWVsZE9wdGlvbnMgPSBhcGlDaGVjay5zaGFwZShmaWVsZE9wdGlvbnNBcGlTaGFwZSkuc3RyaWN0O1xuXG4gIHZhciB0eXBlT3B0aW9uc0RlZmF1bHRPcHRpb25zID0gYW5ndWxhci5jb3B5KGZpZWxkT3B0aW9uc0FwaVNoYXBlKTtcbiAgdHlwZU9wdGlvbnNEZWZhdWx0T3B0aW9ucy5rZXkgPSBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWw7XG5cbiAgdmFyIGZvcm1seVR5cGVPcHRpb25zID0gYXBpQ2hlY2suc2hhcGUoe1xuICAgIG5hbWU6IGFwaUNoZWNrLnN0cmluZyxcbiAgICB0ZW1wbGF0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoXCJ0ZW1wbGF0ZVVybFwiLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIHRlbXBsYXRlVXJsOiBhcGlDaGVjay5zaGFwZS5pZk5vdChcInRlbXBsYXRlXCIsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgY29udHJvbGxlcjogYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5mdW5jLCBhcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmFycmF5XSkub3B0aW9uYWwsXG4gICAgbGluazogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICBkZWZhdWx0T3B0aW9uczogYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5mdW5jLCBhcGlDaGVjay5zaGFwZSh0eXBlT3B0aW9uc0RlZmF1bHRPcHRpb25zKV0pLm9wdGlvbmFsLFxuICAgIFwiZXh0ZW5kc1wiOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gICAgd3JhcHBlcjogc3BlY2lmeVdyYXBwZXJUeXBlLm9wdGlvbmFsLFxuICAgIGRhdGE6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgICB2YWxpZGF0ZU9wdGlvbnM6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgYXBpQ2hlY2s6IGFwaUNoZWNrUHJvcGVydHkub3B0aW9uYWwsXG4gICAgYXBpQ2hlY2tJbnN0YW5jZTogYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5Lm9wdGlvbmFsLFxuICAgIGFwaUNoZWNrRnVuY3Rpb246IGFwaUNoZWNrRnVuY3Rpb25Qcm9wZXJ0eS5vcHRpb25hbCxcbiAgICBhcGlDaGVja09wdGlvbnM6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgICBvdmVyd3JpdGVPazogYXBpQ2hlY2suYm9vbC5vcHRpb25hbFxuICB9KS5zdHJpY3Q7XG5cbiAgYW5ndWxhci5leHRlbmQoYXBpQ2hlY2ssIHtcbiAgICBmb3JtbHlUeXBlT3B0aW9uczogZm9ybWx5VHlwZU9wdGlvbnMsIGZvcm1seUZpZWxkT3B0aW9uczogZm9ybWx5RmllbGRPcHRpb25zLCBmb3JtbHlFeHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLCBmb3JtbHlXcmFwcGVyVHlwZTogZm9ybWx5V3JhcHBlclR5cGVcbiAgfSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5QXBpQ2hlY2suanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5wcm92aWRlcihcImZvcm1seVVzYWJpbGl0eVwiLCBbXCJmb3JtbHlWZXJzaW9uXCIsIFwiZm9ybWx5QXBpQ2hlY2tcIiwgZnVuY3Rpb24gKGZvcm1seVZlcnNpb24sIGZvcm1seUFwaUNoZWNrKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBlcnJvcnNBbmRXYXJuaW5nc1VybFByZWZpeCA9IFwiaHR0cHM6Ly9naXRodWIuY29tL2Zvcm1seS1qcy9hbmd1bGFyLWZvcm1seS9ibG9iL1wiICsgZm9ybWx5VmVyc2lvbiArIFwiL290aGVyL0VSUk9SU19BTkRfV0FSTklOR1MubWQjXCI7XG4gICAgYW5ndWxhci5leHRlbmQodGhpcywge1xuICAgICAgZ2V0Rm9ybWx5RXJyb3I6IGdldEZvcm1seUVycm9yLFxuICAgICAgZ2V0RmllbGRFcnJvcjogZ2V0RmllbGRFcnJvcixcbiAgICAgIGNoZWNrV3JhcHBlcjogY2hlY2tXcmFwcGVyLFxuICAgICAgY2hlY2tXcmFwcGVyVGVtcGxhdGU6IGNoZWNrV3JhcHBlclRlbXBsYXRlLFxuICAgICAgJGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXM7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZEVycm9yKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UsIGZpZWxkKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgZmllbGQgPSBtZXNzYWdlO1xuICAgICAgICBtZXNzYWdlID0gZXJyb3JJbmZvU2x1ZztcbiAgICAgICAgZXJyb3JJbmZvU2x1ZyA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSArIChcIiBGaWVsZCBkZWZpbml0aW9uOiBcIiArIGFuZ3VsYXIudG9Kc29uKGZpZWxkKSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZvcm1seUVycm9yKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpIHtcbiAgICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3JJbmZvU2x1ZztcbiAgICAgICAgZXJyb3JJbmZvU2x1ZyA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RXJyb3JNZXNzYWdlKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpIHtcbiAgICAgIHZhciB1cmwgPSBcIlwiO1xuICAgICAgaWYgKGVycm9ySW5mb1NsdWcgIT09IG51bGwpIHtcbiAgICAgICAgdXJsID0gXCJcIiArIGVycm9yc0FuZFdhcm5pbmdzVXJsUHJlZml4ICsgXCJcIiArIGVycm9ySW5mb1NsdWc7XG4gICAgICB9XG4gICAgICByZXR1cm4gXCJGb3JtbHkgRXJyb3I6IFwiICsgbWVzc2FnZSArIFwiLiBcIiArIHVybDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dyYXBwZXIod3JhcHBlcikge1xuICAgICAgZm9ybWx5QXBpQ2hlY2tbXCJ0aHJvd1wiXShmb3JtbHlBcGlDaGVjay5mb3JtbHlXcmFwcGVyVHlwZSwgYXJndW1lbnRzLCB7XG4gICAgICAgIHByZWZpeDogXCJmb3JtbHlDb25maWcuc2V0V3JhcHBlclwiLFxuICAgICAgICB1cmxTdWZmaXg6IFwic2V0d3JhcHBlci12YWxpZGF0aW9uLWZhaWxlZFwiXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dyYXBwZXJUZW1wbGF0ZSh0ZW1wbGF0ZSwgYWRkaXRpb25hbEluZm8pIHtcbiAgICAgIHZhciBmb3JtbHlUcmFuc2NsdWRlID0gXCI8Zm9ybWx5LXRyYW5zY2x1ZGU+PC9mb3JtbHktdHJhbnNjbHVkZT5cIjtcbiAgICAgIGlmICh0ZW1wbGF0ZS5pbmRleE9mKGZvcm1seVRyYW5zY2x1ZGUpID09PSAtMSkge1xuICAgICAgICB0aHJvdyBnZXRGb3JtbHlFcnJvcihcIlRlbXBsYXRlIHdyYXBwZXIgdGVtcGxhdGVzIG11c3QgdXNlIFxcXCJcIiArIGZvcm1seVRyYW5zY2x1ZGUgKyBcIlxcXCIgc29tZXdoZXJlIGluIHRoZW0uIFwiICsgKFwiVGhpcyBvbmUgZG9lcyBub3QgaGF2ZSBcXFwiPGZvcm1seS10cmFuc2NsdWRlPjwvZm9ybWx5LXRyYW5zY2x1ZGU+XFxcIiBpbiBpdDogXCIgKyB0ZW1wbGF0ZSkgKyBcIlxcblwiICsgKFwiQWRkaXRpb25hbCBpbmZvcm1hdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShhZGRpdGlvbmFsSW5mbykpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHkuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xudmFyIHV0aWxzID0gcmVxdWlyZShcIi4uL290aGVyL3V0aWxzXCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5wcm92aWRlcihcImZvcm1seUNvbmZpZ1wiLCBmb3JtbHlDb25maWcpO1xuXG4gIGZvcm1seUNvbmZpZy50ZXN0cyA9IE9OX1RFU1QgPyByZXF1aXJlKFwiLi9mb3JtbHlDb25maWcudGVzdFwiKShuZ01vZHVsZSkgOiBudWxsO1xuXG4gIGZ1bmN0aW9uIGZvcm1seUNvbmZpZyhmb3JtbHlVc2FiaWxpdHlQcm92aWRlciwgZm9ybWx5QXBpQ2hlY2spIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciB0eXBlTWFwID0ge307XG4gICAgdmFyIHRlbXBsYXRlV3JhcHBlcnNNYXAgPSB7fTtcbiAgICB2YXIgZGVmYXVsdFdyYXBwZXJOYW1lID0gXCJkZWZhdWx0XCI7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZ2V0RXJyb3IgPSBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5nZXRGb3JtbHlFcnJvcjtcblxuICAgIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsIHtcbiAgICAgIHNldFR5cGU6IHNldFR5cGUsXG4gICAgICBnZXRUeXBlOiBnZXRUeXBlLFxuICAgICAgc2V0V3JhcHBlcjogc2V0V3JhcHBlcixcbiAgICAgIGdldFdyYXBwZXI6IGdldFdyYXBwZXIsXG4gICAgICBnZXRXcmFwcGVyQnlUeXBlOiBnZXRXcmFwcGVyQnlUeXBlLFxuICAgICAgcmVtb3ZlV3JhcHBlckJ5TmFtZTogcmVtb3ZlV3JhcHBlckJ5TmFtZSxcbiAgICAgIHJlbW92ZVdyYXBwZXJzRm9yVHlwZTogcmVtb3ZlV3JhcHBlcnNGb3JUeXBlLFxuICAgICAgZGlzYWJsZVdhcm5pbmdzOiBmYWxzZSxcbiAgICAgIGV4dHJhczoge1xuICAgICAgICBkaXNhYmxlTmdNb2RlbEF0dHJzTWFuaXB1bGF0b3I6IGZhbHNlLFxuICAgICAgICBuZ01vZGVsQXR0cnNNYW5pcHVsYXRvclByZWZlckJvdW5kOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlTWFuaXB1bGF0b3JzOiB7XG4gICAgICAgIHByZVdyYXBwZXI6IFtdLFxuICAgICAgICBwb3N0V3JhcHBlcjogW11cbiAgICAgIH0sXG4gICAgICAkZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzZXRUeXBlKG9wdGlvbnMpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKG9wdGlvbnMsIHNldFR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgIGNoZWNrVHlwZShvcHRpb25zKTtcbiAgICAgICAgaWYgKG9wdGlvbnNbXCJleHRlbmRzXCJdKSB7XG4gICAgICAgICAgZXh0ZW5kVHlwZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgdHlwZU1hcFtvcHRpb25zLm5hbWVdID0gb3B0aW9ucztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGdldEVycm9yKFwiWW91IG11c3QgcHJvdmlkZSBhbiBvYmplY3Qgb3IgYXJyYXkgZm9yIHNldFR5cGUuIFlvdSBwcm92aWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeShhcmd1bWVudHMpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUob3B0aW9ucykge1xuICAgICAgZm9ybWx5QXBpQ2hlY2tbXCJ0aHJvd1wiXShmb3JtbHlBcGlDaGVjay5mb3JtbHlUeXBlT3B0aW9ucywgYXJndW1lbnRzLCB7XG4gICAgICAgIHByZWZpeDogXCJmb3JtbHlDb25maWcuc2V0VHlwZVwiLFxuICAgICAgICB1cmw6IFwic2V0dHlwZS12YWxpZGF0aW9uLWZhaWxlZFwiXG4gICAgICB9KTtcbiAgICAgIGlmICghb3B0aW9ucy5vdmVyd3JpdGVPaykge1xuICAgICAgICBjaGVja092ZXJ3cml0ZShvcHRpb25zLm5hbWUsIHR5cGVNYXAsIG9wdGlvbnMsIFwidHlwZXNcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLm92ZXJ3cml0ZU9rID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZFR5cGVPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgIHZhciBleHRlbmRzVHlwZSA9IGdldFR5cGUob3B0aW9uc1tcImV4dGVuZHNcIl0sIHRydWUsIG9wdGlvbnMpO1xuICAgICAgZXh0ZW5kVHlwZUNvbnRyb2xsZXJGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgICBleHRlbmRUeXBlTGlua0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICAgIGV4dGVuZFR5cGVWYWxpZGF0ZU9wdGlvbnNGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgICBleHRlbmRUeXBlRGVmYXVsdE9wdGlvbnMob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kVHlwZUNvbnRyb2xsZXJGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgICAgdmFyIGV4dGVuZHNDdHJsID0gZXh0ZW5kc1R5cGUuY29udHJvbGxlcjtcbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0N0cmwpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBvcHRpb25zQ3RybCA9IG9wdGlvbnMuY29udHJvbGxlcjtcbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zQ3RybCkpIHtcbiAgICAgICAgb3B0aW9ucy5jb250cm9sbGVyID0gZnVuY3Rpb24gKCRzY29wZSwgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAkY29udHJvbGxlcihleHRlbmRzQ3RybCwgeyAkc2NvcGU6ICRzY29wZSB9KTtcbiAgICAgICAgICAkY29udHJvbGxlcihvcHRpb25zQ3RybCwgeyAkc2NvcGU6ICRzY29wZSB9KTtcbiAgICAgICAgfTtcbiAgICAgICAgb3B0aW9ucy5jb250cm9sbGVyLiRpbmplY3QgPSBbXCIkc2NvcGVcIiwgXCIkY29udHJvbGxlclwiXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMuY29udHJvbGxlciA9IGV4dGVuZHNDdHJsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZFR5cGVMaW5rRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICAgIHZhciBleHRlbmRzRm4gPSBleHRlbmRzVHlwZS5saW5rO1xuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzRm4pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBvcHRpb25zRm4gPSBvcHRpb25zLmxpbms7XG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9uc0ZuKSkge1xuICAgICAgICBvcHRpb25zLmxpbmsgPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgZXh0ZW5kc0ZuLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgICAgICAgICBvcHRpb25zRm4uYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5saW5rID0gZXh0ZW5kc0ZuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZFR5cGVWYWxpZGF0ZU9wdGlvbnNGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgICAgdmFyIGV4dGVuZHNGbiA9IGV4dGVuZHNUeXBlLnZhbGlkYXRlT3B0aW9ucztcbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0ZuKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgb3B0aW9uc0ZuID0gb3B0aW9ucy52YWxpZGF0ZU9wdGlvbnM7XG4gICAgICB2YXIgb3JpZ2luYWxEZWZhdWx0T3B0aW9ucyA9IG9wdGlvbnMuZGVmYXVsdE9wdGlvbnM7XG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9uc0ZuKSkge1xuICAgICAgICBvcHRpb25zLnZhbGlkYXRlT3B0aW9ucyA9IGZ1bmN0aW9uIChvcHRpb25zKSB7XG4gICAgICAgICAgb3B0aW9uc0ZuKG9wdGlvbnMpO1xuICAgICAgICAgIHZhciBtZXJnZWRPcHRpb25zID0gYW5ndWxhci5jb3B5KG9wdGlvbnMpO1xuICAgICAgICAgIHZhciBkZWZhdWx0T3B0aW9ucyA9IG9yaWdpbmFsRGVmYXVsdE9wdGlvbnM7XG4gICAgICAgICAgaWYgKGRlZmF1bHRPcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGRlZmF1bHRPcHRpb25zKSkge1xuICAgICAgICAgICAgICBkZWZhdWx0T3B0aW9ucyA9IGRlZmF1bHRPcHRpb25zKG1lcmdlZE9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShtZXJnZWRPcHRpb25zLCBkZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGV4dGVuZHNGbihtZXJnZWRPcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMudmFsaWRhdGVPcHRpb25zID0gZXh0ZW5kc0ZuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZFR5cGVEZWZhdWx0T3B0aW9ucyhvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgICAgdmFyIGV4dGVuZHNETyA9IGV4dGVuZHNUeXBlLmRlZmF1bHRPcHRpb25zO1xuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzRE8pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHZhciBvcHRpb25zRE8gPSBvcHRpb25zLmRlZmF1bHRPcHRpb25zO1xuICAgICAgdmFyIG9wdGlvbnNET0lzRm4gPSBhbmd1bGFyLmlzRnVuY3Rpb24ob3B0aW9uc0RPKTtcbiAgICAgIHZhciBleHRlbmRzRE9Jc0ZuID0gYW5ndWxhci5pc0Z1bmN0aW9uKGV4dGVuZHNETyk7XG4gICAgICBpZiAoZXh0ZW5kc0RPSXNGbikge1xuICAgICAgICBvcHRpb25zLmRlZmF1bHRPcHRpb25zID0gZnVuY3Rpb24gZGVmYXVsdE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICAgIHZhciBleHRlbmRzRGVmYXVsdE9wdGlvbnMgPSBleHRlbmRzRE8ob3B0aW9ucyk7XG4gICAgICAgICAgdmFyIG1lcmdlZERlZmF1bHRPcHRpb25zID0ge307XG4gICAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShtZXJnZWREZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgZXh0ZW5kc0RlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICBpZiAob3B0aW9uc0RPSXNGbikge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnNETyhtZXJnZWREZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UoZXh0ZW5kc0RlZmF1bHRPcHRpb25zLCBvcHRpb25zRE8pO1xuICAgICAgICAgICAgcmV0dXJuIGV4dGVuZHNEZWZhdWx0T3B0aW9ucztcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnNET0lzRm4pIHtcbiAgICAgICAgb3B0aW9ucy5kZWZhdWx0T3B0aW9ucyA9IGZ1bmN0aW9uIGRlZmF1bHRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgICB2YXIgbmV3RGVmYXVsdE9wdGlvbnMgPSB7fTtcbiAgICAgICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKG5ld0RlZmF1bHRPcHRpb25zLCBvcHRpb25zLCBleHRlbmRzRE8pO1xuICAgICAgICAgIHJldHVybiBvcHRpb25zRE8obmV3RGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFR5cGUobmFtZSwgdGhyb3dFcnJvciwgZXJyb3JDb250ZXh0KSB7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHZhciB0eXBlID0gdHlwZU1hcFtuYW1lXTtcbiAgICAgIGlmICghdHlwZSAmJiB0aHJvd0Vycm9yID09PSB0cnVlKSB7XG4gICAgICAgIHRocm93IGdldEVycm9yKFwiVGhlcmUgaXMgbm8gdHlwZSBieSB0aGUgbmFtZSBvZiBcXFwiXCIgKyBuYW1lICsgXCJcXFwiOiBcIiArIEpTT04uc3RyaW5naWZ5KGVycm9yQ29udGV4dCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0V3JhcHBlcihfeCwgX3gyKSB7XG4gICAgICB2YXIgX2FnYWluID0gdHJ1ZTtcblxuICAgICAgX2Z1bmN0aW9uOiB3aGlsZSAoX2FnYWluKSB7XG4gICAgICAgIF9hZ2FpbiA9IGZhbHNlO1xuICAgICAgICB2YXIgb3B0aW9ucyA9IF94LFxuICAgICAgICAgICAgbmFtZSA9IF94MjtcblxuICAgICAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnMubWFwKGZ1bmN0aW9uICh3cmFwcGVyT3B0aW9ucykge1xuICAgICAgICAgICAgcmV0dXJuIHNldFdyYXBwZXIod3JhcHBlck9wdGlvbnMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgICAgICBvcHRpb25zLnR5cGVzID0gZ2V0T3B0aW9uc1R5cGVzKG9wdGlvbnMpO1xuICAgICAgICAgIG9wdGlvbnMubmFtZSA9IGdldE9wdGlvbnNOYW1lKG9wdGlvbnMsIG5hbWUpO1xuICAgICAgICAgIGNoZWNrV3JhcHBlckFQSShvcHRpb25zKTtcbiAgICAgICAgICB0ZW1wbGF0ZVdyYXBwZXJzTWFwW29wdGlvbnMubmFtZV0gPSBvcHRpb25zO1xuICAgICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNTdHJpbmcob3B0aW9ucykpIHtcbiAgICAgICAgICBfeCA9IHtcbiAgICAgICAgICAgIHRlbXBsYXRlOiBvcHRpb25zLFxuICAgICAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICAgIH07XG4gICAgICAgICAgX2FnYWluID0gdHJ1ZTtcbiAgICAgICAgICBjb250aW51ZSBfZnVuY3Rpb247XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRPcHRpb25zVHlwZXMob3B0aW9ucykge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcob3B0aW9ucy50eXBlcykpIHtcbiAgICAgICAgcmV0dXJuIFtvcHRpb25zLnR5cGVzXTtcbiAgICAgIH1cbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy50eXBlcykpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudHlwZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T3B0aW9uc05hbWUob3B0aW9ucywgbmFtZSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubmFtZSB8fCBuYW1lIHx8IG9wdGlvbnMudHlwZXMuam9pbihcIiBcIikgfHwgZGVmYXVsdFdyYXBwZXJOYW1lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrV3JhcHBlckFQSShvcHRpb25zKSB7XG4gICAgICBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5jaGVja1dyYXBwZXIob3B0aW9ucyk7XG4gICAgICBpZiAob3B0aW9ucy50ZW1wbGF0ZSkge1xuICAgICAgICBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5jaGVja1dyYXBwZXJUZW1wbGF0ZShvcHRpb25zLnRlbXBsYXRlLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGlmICghb3B0aW9ucy5vdmVyd3JpdGVPaykge1xuICAgICAgICBjaGVja092ZXJ3cml0ZShvcHRpb25zLm5hbWUsIHRlbXBsYXRlV3JhcHBlcnNNYXAsIG9wdGlvbnMsIFwidGVtcGxhdGVXcmFwcGVyc1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLm92ZXJ3cml0ZU9rO1xuICAgICAgfVxuICAgICAgY2hlY2tXcmFwcGVyVHlwZXMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyVHlwZXMob3B0aW9ucykge1xuICAgICAgdmFyIHNob3VsZFRocm93ID0gIWFuZ3VsYXIuaXNBcnJheShvcHRpb25zLnR5cGVzKSB8fCAhb3B0aW9ucy50eXBlcy5ldmVyeShhbmd1bGFyLmlzU3RyaW5nKTtcbiAgICAgIGlmIChzaG91bGRUaHJvdykge1xuICAgICAgICB0aHJvdyBnZXRFcnJvcihcIkF0dGVtcHRlZCB0byBjcmVhdGUgYSB0ZW1wbGF0ZSB3cmFwcGVyIHdpdGggdHlwZXMgdGhhdCBpcyBub3QgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5nc1wiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja092ZXJ3cml0ZShwcm9wZXJ0eSwgb2JqZWN0LCBuZXdWYWx1ZSwgb2JqZWN0TmFtZSkge1xuICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgd2FybihbXCJBdHRlbXB0aW5nIHRvIG92ZXJ3cml0ZSBcIiArIHByb3BlcnR5ICsgXCIgb24gXCIgKyBvYmplY3ROYW1lICsgXCIgd2hpY2ggaXMgY3VycmVudGx5XCIsIFwiXCIgKyBKU09OLnN0cmluZ2lmeShvYmplY3RbcHJvcGVydHldKSArIFwiIHdpdGggXCIgKyBKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSksIFwiVG8gc3VwcmVzcyB0aGlzIHdhcm5pbmcsIHNwZWNpZnkgdGhlIHByb3BlcnR5IFxcXCJvdmVyd3JpdGVPazogdHJ1ZVxcXCJcIl0uam9pbihcIiBcIikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdyYXBwZXIobmFtZSkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZSB8fCBkZWZhdWx0V3JhcHBlck5hbWVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdyYXBwZXJCeVR5cGUodHlwZSkge1xuICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgdmFyIHdyYXBwZXJzID0gW107XG4gICAgICBmb3IgKHZhciBuYW1lIGluIHRlbXBsYXRlV3JhcHBlcnNNYXApIHtcbiAgICAgICAgaWYgKHRlbXBsYXRlV3JhcHBlcnNNYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBpZiAodGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXS50eXBlcyAmJiB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdLnR5cGVzLmluZGV4T2YodHlwZSkgIT09IC0xKSB7XG4gICAgICAgICAgICB3cmFwcGVycy5wdXNoKHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHdyYXBwZXJzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVdyYXBwZXJCeU5hbWUobmFtZSkge1xuICAgICAgdmFyIHdyYXBwZXIgPSB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdO1xuICAgICAgZGVsZXRlIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV07XG4gICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVXcmFwcGVyc0ZvclR5cGUodHlwZSkge1xuICAgICAgdmFyIHdyYXBwZXJzID0gZ2V0V3JhcHBlckJ5VHlwZSh0eXBlKTtcbiAgICAgIGlmICghd3JhcHBlcnMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkod3JhcHBlcnMpKSB7XG4gICAgICAgIHJldHVybiByZW1vdmVXcmFwcGVyQnlOYW1lKHdyYXBwZXJzLm5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3JhcHBlcnMuZm9yRWFjaChmdW5jdGlvbiAod3JhcHBlcikge1xuICAgICAgICAgIHJldHVybiByZW1vdmVXcmFwcGVyQnlOYW1lKHdyYXBwZXIubmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gd3JhcHBlcnM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gd2FybigpIHtcbiAgICAgIGlmICghX3RoaXMuZGlzYWJsZVdhcm5pbmdzKSB7XG4gICAgICAgIGNvbnNvbGUud2Fybi5hcHBseShjb25zb2xlLCBhcmd1bWVudHMpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmb3JtbHlDb25maWcuJGluamVjdCA9IFtcImZvcm1seVVzYWJpbGl0eVByb3ZpZGVyXCIsIFwiZm9ybWx5QXBpQ2hlY2tcIl07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5jb25zdGFudChcImZvcm1seVZlcnNpb25cIiwgVkVSU0lPTik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5VmVyc2lvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuY29uc3RhbnQoXCJmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4XCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL2Zvcm1seS1qcy9hbmd1bGFyLWZvcm1seS9ibG9iL1wiICsgVkVSU0lPTiArIFwiL290aGVyL0VSUk9SU19BTkRfV0FSTklOR1MubWQjXCIpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHJvdmlkZXJzL2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXguanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmZhY3RvcnkoXCJmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXNcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcyA9IHtcbiAgICAgIGFkZFRlbXBsYXRlT3B0aW9uVmFsdWVNZXNzYWdlOiBhZGRUZW1wbGF0ZU9wdGlvblZhbHVlTWVzc2FnZSxcbiAgICAgIGFkZFN0cmluZ01lc3NhZ2U6IGFkZFN0cmluZ01lc3NhZ2UsXG4gICAgICBtZXNzYWdlczoge31cbiAgICB9O1xuXG4gICAgcmV0dXJuIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcztcblxuICAgIGZ1bmN0aW9uIGFkZFRlbXBsYXRlT3B0aW9uVmFsdWVNZXNzYWdlKG5hbWUsIHByb3AsIHByZWZpeCwgc3VmZml4LCBhbHRlcm5hdGUpIHtcbiAgICAgIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlc1tuYW1lXSA9IHRlbXBsYXRlT3B0aW9uVmFsdWUocHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkU3RyaW5nTWVzc2FnZShuYW1lLCBzdHJpbmcpIHtcbiAgICAgIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlc1tuYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGVtcGxhdGVPcHRpb25WYWx1ZShwcm9wLCBwcmVmaXgsIHN1ZmZpeCwgYWx0ZXJuYXRlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gZ2V0VmFsaWRhdGlvbk1lc3NhZ2Uodmlld1ZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSkge1xuICAgICAgICBpZiAoc2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbcHJvcF0pIHtcbiAgICAgICAgICByZXR1cm4gXCJcIiArIHByZWZpeCArIFwiIFwiICsgc2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbcHJvcF0gKyBcIiBcIiArIHN1ZmZpeDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYWx0ZXJuYXRlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLmpzXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5kaXJlY3RpdmUoXCJmb3JtbHlDdXN0b21WYWxpZGF0aW9uXCIsIGZvcm1seUN1c3RvbVZhbGlkYXRpb24pO1xuXG4gIGZvcm1seUN1c3RvbVZhbGlkYXRpb24udGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZShcIi4vZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLnRlc3RcIikobmdNb2R1bGUpIDogbnVsbDtcblxuICBmdW5jdGlvbiBmb3JtbHlDdXN0b21WYWxpZGF0aW9uKGZvcm1seVV0aWwsICRxKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlcXVpcmU6IFwibmdNb2RlbFwiLFxuICAgICAgbGluazogZnVuY3Rpb24gbGluayhzY29wZSwgZWwsIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIHZhciB2YWxpZGF0b3JzID0gc2NvcGUuJGV2YWwoYXR0cnMuZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbik7XG4gICAgICAgIGlmICghdmFsaWRhdG9ycykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjaGVja1ZhbGlkYXRvcnModmFsaWRhdG9ycyk7XG4gICAgICAgIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlcyA9IHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlcyB8fCB7fTtcblxuICAgICAgICB2YXIgdXNlTmV3VmFsaWRhdG9yc0FwaSA9IGN0cmwuaGFzT3duUHJvcGVydHkoXCIkdmFsaWRhdG9yc1wiKSAmJiAhYXR0cnMuaGFzT3duUHJvcGVydHkoXCJ1c2VQYXJzZXJzXCIpO1xuICAgICAgICBhbmd1bGFyLmZvckVhY2godmFsaWRhdG9ycywgZnVuY3Rpb24gKHZhbGlkYXRvciwgbmFtZSkge1xuICAgICAgICAgIHZhciBtZXNzYWdlID0gdmFsaWRhdG9yLm1lc3NhZ2U7XG4gICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlc1tuYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgbWVzc2FnZSwgY3RybC4kbW9kZWxWYWx1ZSwgY3RybC4kdmlld1ZhbHVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbGlkYXRvciA9IGFuZ3VsYXIuaXNPYmplY3QodmFsaWRhdG9yKSA/IHZhbGlkYXRvci5leHByZXNzaW9uIDogdmFsaWRhdG9yO1xuICAgICAgICAgIHZhciBpc1Bvc3NpYmx5QXN5bmMgPSAhYW5ndWxhci5pc1N0cmluZyh2YWxpZGF0b3IpO1xuICAgICAgICAgIGlmICh1c2VOZXdWYWxpZGF0b3JzQXBpKSB7XG4gICAgICAgICAgICBzZXR1cFdpdGhWYWxpZGF0b3JzKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldHVwV2l0aFBhcnNlcnMoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBzZXR1cFdpdGhWYWxpZGF0b3JzKCkge1xuICAgICAgICAgICAgdmFyIHZhbGlkYXRvckNvbGxlY3Rpb24gPSBpc1Bvc3NpYmx5QXN5bmMgPyBcIiRhc3luY1ZhbGlkYXRvcnNcIiA6IFwiJHZhbGlkYXRvcnNcIjtcbiAgICAgICAgICAgIGN0cmxbdmFsaWRhdG9yQ29sbGVjdGlvbl1bbmFtZV0gPSBmdW5jdGlvbiAobW9kZWxWYWx1ZSwgdmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhciB2YWx1ZSA9IGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgdmFsaWRhdG9yLCBtb2RlbFZhbHVlLCB2aWV3VmFsdWUpO1xuICAgICAgICAgICAgICBpZiAoaXNQb3NzaWJseUFzeW5jKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGlzUHJvbWlzZUxpa2UodmFsdWUpID8gdmFsdWUgOiB2YWx1ZSA/ICRxLndoZW4odmFsdWUpIDogJHEucmVqZWN0KHZhbHVlKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gc2V0dXBXaXRoUGFyc2VycygpIHtcbiAgICAgICAgICAgIHZhciBpbkZsaWdodFZhbGlkYXRvciA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGN0cmwuJHBhcnNlcnMudW5zaGlmdChmdW5jdGlvbiAodmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCB2YWxpZGF0b3IsIGN0cmwuJG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChpc1Byb21pc2VMaWtlKGlzVmFsaWQpKSB7XG4gICAgICAgICAgICAgICAgY3RybC4kcGVuZGluZyA9IGN0cmwuJHBlbmRpbmcgfHwge307XG4gICAgICAgICAgICAgICAgY3RybC4kcGVuZGluZ1tuYW1lXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaW5GbGlnaHRWYWxpZGF0b3IgPSBpc1ZhbGlkO1xuICAgICAgICAgICAgICAgIGlzVmFsaWQudGhlbihmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoaW5GbGlnaHRWYWxpZGF0b3IgPT09IGlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkobmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoaW5GbGlnaHRWYWxpZGF0b3IgPT09IGlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkobmFtZSwgZmFsc2UpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pW1wiZmluYWxseVwiXShmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgICAgICBpZiAoT2JqZWN0LmtleXMoY3RybC4kcGVuZGluZykubGVuZ3RoID09PSAxKSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjdHJsLiRwZW5kaW5nO1xuICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGN0cmwuJHBlbmRpbmdbbmFtZV07XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkobmFtZSwgaXNWYWxpZCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgcmV0dXJuIHZpZXdWYWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGlzUHJvbWlzZUxpa2Uob2JqKSB7XG4gICAgICByZXR1cm4gb2JqICYmIGFuZ3VsYXIuaXNGdW5jdGlvbihvYmoudGhlbik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tWYWxpZGF0b3JzKHZhbGlkYXRvcnMpIHtcbiAgICAgIHZhciBhbGxvd2VkUHJvcGVydGllcyA9IFtcImV4cHJlc3Npb25cIiwgXCJtZXNzYWdlXCJdO1xuICAgICAgdmFyIHZhbGlkYXRvcnNXaXRoRXh0cmFQcm9wcyA9IHt9O1xuICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvcnMsIGZ1bmN0aW9uICh2YWxpZGF0b3IsIG5hbWUpIHtcbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcodmFsaWRhdG9yKSkge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgZXh0cmFQcm9wcyA9IFtdO1xuICAgICAgICBhbmd1bGFyLmZvckVhY2godmFsaWRhdG9yLCBmdW5jdGlvbiAodiwga2V5KSB7XG4gICAgICAgICAgaWYgKGFsbG93ZWRQcm9wZXJ0aWVzLmluZGV4T2Yoa2V5KSA9PT0gLTEpIHtcbiAgICAgICAgICAgIGV4dHJhUHJvcHMucHVzaChrZXkpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChleHRyYVByb3BzLmxlbmd0aCkge1xuICAgICAgICAgIHZhbGlkYXRvcnNXaXRoRXh0cmFQcm9wc1tuYW1lXSA9IGV4dHJhUHJvcHM7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKE9iamVjdC5rZXlzKHZhbGlkYXRvcnNXaXRoRXh0cmFQcm9wcykubGVuZ3RoKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihbXCJWYWxpZGF0b3JzIGFyZSBvbmx5IGFsbG93ZWQgdG8gYmUgZnVuY3Rpb25zIG9yIG9iamVjdHMgdGhhdCBoYXZlIFwiICsgYWxsb3dlZFByb3BlcnRpZXMuam9pbihcIiwgXCIpICsgXCIuXCIsIFwiWW91IHByb3ZpZGVkIHNvbWUgZXh0cmEgcHJvcGVydGllczogXCIgKyBKU09OLnN0cmluZ2lmeSh2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMpXS5qb2luKFwiIFwiKSk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZvcm1seUN1c3RvbVZhbGlkYXRpb24uJGluamVjdCA9IFtcImZvcm1seVV0aWxcIiwgXCIkcVwiXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyLWZpeFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKFwiZm9ybWx5RmllbGRcIiwgZm9ybWx5RmllbGQpO1xuXG4gIGZvcm1seUZpZWxkLnRlc3RzID0gT05fVEVTVCA/IHJlcXVpcmUoXCIuL2Zvcm1seS1maWVsZC50ZXN0XCIpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5RmllbGQoJGh0dHAsICRxLCAkY29tcGlsZSwgJHRlbXBsYXRlQ2FjaGUsIGZvcm1seUNvbmZpZywgZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLCBmb3JtbHlBcGlDaGVjaywgZm9ybWx5VXRpbCwgZm9ybWx5VXNhYmlsaXR5LCBmb3JtbHlXYXJuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiBcIkFFXCIsXG4gICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgb3B0aW9uczogXCI9XCIsXG4gICAgICAgIG1vZGVsOiBcIj1cIixcbiAgICAgICAgZm9ybUlkOiBcIj0/XCIsXG4gICAgICAgIGluZGV4OiBcIj0/XCIsXG4gICAgICAgIGZpZWxkczogXCI9P1wiLFxuICAgICAgICBmb3JtU3RhdGU6IFwiPT9cIixcbiAgICAgICAgZm9ybTogXCI9P1wiXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogW1wiJHNjb3BlXCIsIFwiJHRpbWVvdXRcIiwgXCIkcGFyc2VcIiwgXCIkY29udHJvbGxlclwiLCBmdW5jdGlvbiBmaWVsZENvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJHBhcnNlLCAkY29udHJvbGxlcikge1xuICAgICAgICB2YXIgb3B0cyA9ICRzY29wZS5vcHRpb25zO1xuICAgICAgICB2YXIgZmllbGRUeXBlID0gb3B0cy50eXBlICYmIGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdHMudHlwZSk7XG4gICAgICAgIHNpbXBsaWZ5TGlmZShvcHRzKTtcbiAgICAgICAgbWVyZ2VGaWVsZE9wdGlvbnNXaXRoVHlwZURlZmF1bHRzKG9wdHMsIGZpZWxkVHlwZSk7XG4gICAgICAgIGV4dGVuZE9wdGlvbnNXaXRoRGVmYXVsdHMob3B0cywgJHNjb3BlLmluZGV4KTtcbiAgICAgICAgY2hlY2tBcGkob3B0cyk7XG4gICAgICAgIC8vIHNldCBmaWVsZCBpZCB0byBsaW5rIGxhYmVscyBhbmQgZmllbGRzXG4gICAgICAgICRzY29wZS5pZCA9IGZvcm1seVV0aWwuZ2V0RmllbGRJZCgkc2NvcGUuZm9ybUlkLCBvcHRzLCAkc2NvcGUuaW5kZXgpO1xuXG4gICAgICAgIC8vIGluaXRhbGl6YXRpb25cbiAgICAgICAgcnVuRXhwcmVzc2lvbnMoKTtcbiAgICAgICAgc2V0Rm9ybUNvbnRyb2woJHNjb3BlLCBvcHRzKTtcbiAgICAgICAgYWRkTW9kZWxXYXRjaGVyKCRzY29wZSwgb3B0cyk7XG4gICAgICAgIGFkZFZhbGlkYXRpb25NZXNzYWdlcyhvcHRzKTtcbiAgICAgICAgLy8gc2ltcGxpZnkgdGhpbmdzXG4gICAgICAgIC8vIGNyZWF0ZSAkc2NvcGUudG8gc28gdGVtcGxhdGUgYXV0aG9ycyBjYW4gcmVmZXJlbmNlIHRvIGluc3RlYWQgb2YgJHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zXG4gICAgICAgICRzY29wZS50byA9ICRzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9ucztcbiAgICAgICAgaW52b2tlQ29udHJvbGxlcnMoJHNjb3BlLCBvcHRzLCBmaWVsZFR5cGUpO1xuXG4gICAgICAgIC8vIGZ1bmN0aW9uIGRlZmluaXRpb25zXG4gICAgICAgIGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb25zKCkge1xuICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIG11c3QgcnVuIG9uIG5leHQgdGljayB0byBtYWtlIHN1cmUgdGhhdCB0aGUgY3VycmVudCB2YWx1ZSBpcyBjb3JyZWN0LlxuICAgICAgICAgICAgdmFyIGZpZWxkID0gJHNjb3BlLm9wdGlvbnM7XG4gICAgICAgICAgICB2YXIgY3VycmVudFZhbHVlID0gdmFsdWVHZXR0ZXJTZXR0ZXIoKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChmaWVsZC5leHByZXNzaW9uUHJvcGVydGllcywgZnVuY3Rpb24gcnVuRXhwcmVzc2lvbihleHByZXNzaW9uLCBwcm9wKSB7XG4gICAgICAgICAgICAgIHZhciBzZXR0ZXIgPSAkcGFyc2UocHJvcCkuYXNzaWduO1xuICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9ICRxLndoZW4oZm9ybWx5VXRpbC5mb3JtbHlFdmFsKCRzY29wZSwgZXhwcmVzc2lvbiwgY3VycmVudFZhbHVlKSk7XG4gICAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzZXR0ZXIoZmllbGQsIHZhbHVlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHZhbHVlR2V0dGVyU2V0dGVyKG5ld1ZhbCkge1xuICAgICAgICAgIGlmICghJHNjb3BlLm1vZGVsIHx8ICEkc2NvcGUub3B0aW9ucy5rZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG5ld1ZhbCkpIHtcbiAgICAgICAgICAgICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldID0gbmV3VmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV07XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzaW1wbGlmeUxpZmUob3B0aW9ucykge1xuICAgICAgICAgIC8vIGFkZCBhIGZldyBlbXB0eSBvYmplY3RzIChpZiB0aGV5IGRvbid0IGFscmVhZHkgZXhpc3QpIHNvIHlvdSBkb24ndCBoYXZlIHRvIHVuZGVmaW5lZCBjaGVjayBldmVyeXdoZXJlXG4gICAgICAgICAgZm9ybWx5VXRpbC5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIHtcbiAgICAgICAgICAgIGRhdGE6IHt9LFxuICAgICAgICAgICAgdGVtcGxhdGVPcHRpb25zOiB7fSxcbiAgICAgICAgICAgIHZhbGlkYXRpb246IHt9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtZXJnZUZpZWxkT3B0aW9uc1dpdGhUeXBlRGVmYXVsdHMob3B0aW9ucywgdHlwZSkge1xuICAgICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICBtZXJnZU9wdGlvbnMob3B0aW9ucywgdHlwZS5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBwcm9wZXJPcmRlciA9IGFycmF5aWZ5KG9wdGlvbnMub3B0aW9uc1R5cGVzKS5yZXZlcnNlKCk7IC8vIHNvIHRoZSByaWdodCB0aGluZ3MgYXJlIG92ZXJyaWRkZW5cbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2gocHJvcGVyT3JkZXIsIGZ1bmN0aW9uICh0eXBlTmFtZSkge1xuICAgICAgICAgICAgbWVyZ2VPcHRpb25zKG9wdGlvbnMsIGZvcm1seUNvbmZpZy5nZXRUeXBlKHR5cGVOYW1lLCB0cnVlLCBvcHRpb25zKS5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtZXJnZU9wdGlvbnMob3B0aW9ucywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgICAgaWYgKGV4dHJhT3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihleHRyYU9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgIGV4dHJhT3B0aW9ucyA9IGV4dHJhT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm1seVV0aWwucmV2ZXJzZURlZXBNZXJnZShvcHRpb25zLCBleHRyYU9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGV4dGVuZE9wdGlvbnNXaXRoRGVmYXVsdHMob3B0aW9ucywgaW5kZXgpIHtcbiAgICAgICAgICBhbmd1bGFyLmV4dGVuZChvcHRpb25zLCB7XG4gICAgICAgICAgICAvLyBhdHRhY2ggdGhlIGtleSBpbiBjYXNlIHRoZSBmb3JtbHktZmllbGQgZGlyZWN0aXZlIGlzIHVzZWQgZGlyZWN0bHlcbiAgICAgICAgICAgIGtleTogb3B0aW9ucy5rZXkgfHwgaW5kZXggfHwgMCxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZUdldHRlclNldHRlcixcbiAgICAgICAgICAgIHJ1bkV4cHJlc3Npb25zOiBydW5FeHByZXNzaW9uc1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaW5pdGlhbGl6YXRpb24gZnVuY3Rpb25zXG4gICAgICAgIGZ1bmN0aW9uIHNldEZvcm1Db250cm9sKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMubm9Gb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgc3RvcFdhaXRpbmdGb3JEZXN0cm95O1xuICAgICAgICAgIHZhciBtYXhUaW1lID0gMjAwMDtcbiAgICAgICAgICB2YXIgaW50ZXJ2YWxUaW1lID0gNTtcbiAgICAgICAgICB2YXIgaXRlcmF0aW9ucyA9IDA7XG4gICAgICAgICAgdmFyIGludGVydmFsID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXRlcmF0aW9ucysrO1xuICAgICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLmtleSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNsZWFuVXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBmb3JtQ29udHJvbCA9IHNjb3BlLmZvcm0gJiYgc2NvcGUuZm9ybVtzY29wZS5pZF07XG4gICAgICAgICAgICBpZiAoZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgb3B0aW9ucy5mb3JtQ29udHJvbCA9IGZvcm1Db250cm9sO1xuICAgICAgICAgICAgICBzY29wZS5mYyA9IGZvcm1Db250cm9sO1xuICAgICAgICAgICAgICBhZGRTaG93TWVzc2FnZXNXYXRjaGVyKHNjb3BlLCBvcHRpb25zKTtcbiAgICAgICAgICAgICAgY2xlYW5VcCgpO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChpbnRlcnZhbFRpbWUgKiBpdGVyYXRpb25zID4gbWF4VGltZSkge1xuICAgICAgICAgICAgICBmb3JtbHlXYXJuKFwiY291bGRudC1zZXQtdGhlLWZvcm1jb250cm9sLWFmdGVyLXRpbWVtc1wiLCBcIkNvdWxkbid0IHNldCB0aGUgZm9ybUNvbnRyb2wgYWZ0ZXIgXCIgKyBtYXhUaW1lICsgXCJtc1wiLCBzY29wZSk7XG4gICAgICAgICAgICAgIGNsZWFuVXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LCBpbnRlcnZhbFRpbWUpO1xuICAgICAgICAgIHN0b3BXYWl0aW5nRm9yRGVzdHJveSA9IHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIGNsZWFuVXApO1xuXG4gICAgICAgICAgZnVuY3Rpb24gY2xlYW5VcCgpIHtcbiAgICAgICAgICAgIHN0b3BXYWl0aW5nRm9yRGVzdHJveSgpO1xuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpbnRlcnZhbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkTW9kZWxXYXRjaGVyKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgICAgICAgaWYgKG9wdGlvbnMubW9kZWwpIHtcbiAgICAgICAgICAgIHNjb3BlLiR3YXRjaChcIm9wdGlvbnMubW9kZWxcIiwgcnVuRXhwcmVzc2lvbnMsIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZFNob3dNZXNzYWdlc1dhdGNoZXIoc2NvcGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaWYgKHR5cGVvZiBzY29wZS5vcHRpb25zLnZhbGlkYXRpb24uc2hvdyA9PT0gXCJib29sZWFuXCIpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmZjLiRpbnZhbGlkICYmIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5zaG93O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmZjLiRpbnZhbGlkICYmIHNjb3BlLmZjLiR0b3VjaGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZ1bmN0aW9uIChzaG93KSB7XG4gICAgICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24uZXJyb3JFeGlzdHNBbmRTaG91bGRCZVZpc2libGUgPSBzaG93O1xuICAgICAgICAgICAgc2NvcGUuc2hvd0Vycm9yID0gc2hvdztcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZFZhbGlkYXRpb25NZXNzYWdlcyhvcHRpb25zKSB7XG4gICAgICAgICAgb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzID0gb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzIHx8IHt9O1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMubWVzc2FnZXMsIGZ1bmN0aW9uIChleHByZXNzaW9uLCBuYW1lKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlc1tuYW1lXSkge1xuICAgICAgICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0gPSBmdW5jdGlvbiAodmlld1ZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIGV4cHJlc3Npb24sIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpbnZva2VDb250cm9sbGVycyhzY29wZSkge1xuICAgICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICB2YXIgdHlwZSA9IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMl07XG5cbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goW3R5cGUuY29udHJvbGxlciwgb3B0aW9ucy5jb250cm9sbGVyXSwgZnVuY3Rpb24gKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIGlmIChjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICRjb250cm9sbGVyKGNvbnRyb2xsZXIsIHsgJHNjb3BlOiBzY29wZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfV0sXG4gICAgICBsaW5rOiBmdW5jdGlvbiBmaWVsZExpbmsoc2NvcGUsIGVsKSB7XG4gICAgICAgIHZhciB0eXBlID0gc2NvcGUub3B0aW9ucy50eXBlICYmIGZvcm1seUNvbmZpZy5nZXRUeXBlKHNjb3BlLm9wdGlvbnMudHlwZSk7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICB2YXIgdGh1c2x5ID0gdGhpcztcbiAgICAgICAgZ2V0RmllbGRUZW1wbGF0ZShzY29wZS5vcHRpb25zKS50aGVuKHJ1bk1hbmlwdWxhdG9ycyhmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlcikpLnRoZW4odHJhbnNjbHVkZUluV3JhcHBlcnMoc2NvcGUub3B0aW9ucykpLnRoZW4ocnVuTWFuaXB1bGF0b3JzKGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wb3N0V3JhcHBlcikpLnRoZW4oc2V0RWxlbWVudFRlbXBsYXRlKVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIGZvcm1seVdhcm4oXCJ0aGVyZS13YXMtYS1wcm9ibGVtLXNldHRpbmctdGhlLXRlbXBsYXRlLWZvci10aGlzLWZpZWxkXCIsIFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBzZXR0aW5nIHRoZSB0ZW1wbGF0ZSBmb3IgdGhpcyBmaWVsZCBcIiwgc2NvcGUub3B0aW9ucywgZXJyb3IpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBzZXRFbGVtZW50VGVtcGxhdGUodGVtcGxhdGVFbCkge1xuICAgICAgICAgIGVsLmh0bWwoYXNIdG1sKHRlbXBsYXRlRWwpKTtcbiAgICAgICAgICAkY29tcGlsZShlbC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgaWYgKHR5cGUgJiYgdHlwZS5saW5rKSB7XG4gICAgICAgICAgICB0eXBlLmxpbmsuYXBwbHkodGh1c2x5LCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMubGluaykge1xuICAgICAgICAgICAgc2NvcGUub3B0aW9ucy5saW5rLmFwcGx5KHRodXNseSwgYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcnVuTWFuaXB1bGF0b3JzKG1hbmlwdWxhdG9ycykge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBydW5NYW5pcHVsYXRvcnNPblRlbXBsYXRlKHRlbXBsYXRlKSB7XG4gICAgICAgICAgICB2YXIgY2hhaW4gPSAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChtYW5pcHVsYXRvcnMsIGZ1bmN0aW9uIChtYW5pcHVsYXRvcikge1xuICAgICAgICAgICAgICBjaGFpbiA9IGNoYWluLnRoZW4oZnVuY3Rpb24gKHRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4obWFuaXB1bGF0b3IodGVtcGxhdGUsIHNjb3BlLm9wdGlvbnMsIHNjb3BlKSkudGhlbihmdW5jdGlvbiAobmV3VGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzU3RyaW5nKG5ld1RlbXBsYXRlKSA/IG5ld1RlbXBsYXRlIDogYXNIdG1sKG5ld1RlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFzSHRtbChlbCkge1xuICAgICAgdmFyIHdyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoXCI8YT48L2E+XCIpO1xuICAgICAgcmV0dXJuIHdyYXBwZXIuYXBwZW5kKGVsKS5odG1sKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RmllbGRUZW1wbGF0ZShvcHRpb25zKSB7XG4gICAgICB2YXIgdHlwZSA9IGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSwgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgICB2YXIgdGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlIHx8IHR5cGUgJiYgdHlwZS50ZW1wbGF0ZTtcbiAgICAgIHZhciB0ZW1wbGF0ZVVybCA9IG9wdGlvbnMudGVtcGxhdGVVcmwgfHwgdHlwZSAmJiB0eXBlLnRlbXBsYXRlVXJsO1xuICAgICAgaWYgKCF0ZW1wbGF0ZSAmJiAhdGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXCJ0eXBlLXR5cGUtaGFzLW5vLXRlbXBsYXRlXCIsIFwiVHlwZSAnXCIgKyBvcHRpb25zLnR5cGUgKyBcIicgaGFzIG5vdCB0ZW1wbGF0ZS4gT24gZWxlbWVudDpcIiwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0VGVtcGxhdGUodGVtcGxhdGUgfHwgdGVtcGxhdGVVcmwsICF0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VGVtcGxhdGUodGVtcGxhdGUsIGlzVXJsKSB7XG4gICAgICBpZiAoIWlzVXJsKSB7XG4gICAgICAgIHJldHVybiAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBodHRwT3B0aW9ucyA9IHsgY2FjaGU6ICR0ZW1wbGF0ZUNhY2hlIH07XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQodGVtcGxhdGUsIGh0dHBPcHRpb25zKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIGZvcm1seVdhcm4oXCJwcm9ibGVtLWxvYWRpbmctdGVtcGxhdGUtZm9yLXRlbXBsYXRldXJsXCIsIFwiUHJvYmxlbSBsb2FkaW5nIHRlbXBsYXRlIGZvciBcIiArIHRlbXBsYXRlLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zY2x1ZGVJbldyYXBwZXJzKG9wdGlvbnMpIHtcbiAgICAgIHZhciB3cmFwcGVyID0gZ2V0V3JhcHBlck9wdGlvbihvcHRpb25zKTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRyYW5zY2x1ZGVUZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgICBpZiAoIXdyYXBwZXIubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuICRxLndoZW4odGVtcGxhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgd3JhcHBlci5mb3JFYWNoKGZ1bmN0aW9uICh3cmFwcGVyKSB7XG4gICAgICAgICAgZm9ybWx5VXNhYmlsaXR5LmNoZWNrV3JhcHBlcih3cmFwcGVyLCBvcHRpb25zKTtcbiAgICAgICAgICB3cmFwcGVyLnZhbGlkYXRlT3B0aW9ucyAmJiB3cmFwcGVyLnZhbGlkYXRlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICBydW5BcGlDaGVjayh3cmFwcGVyLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHZhciBwcm9taXNlcyA9IHdyYXBwZXIubWFwKGZ1bmN0aW9uICh3KSB7XG4gICAgICAgICAgcmV0dXJuIGdldFRlbXBsYXRlKHcudGVtcGxhdGUgfHwgdy50ZW1wbGF0ZVVybCwgIXcudGVtcGxhdGUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuICRxLmFsbChwcm9taXNlcykudGhlbihmdW5jdGlvbiAod3JhcHBlcnNUZW1wbGF0ZXMpIHtcbiAgICAgICAgICB3cmFwcGVyc1RlbXBsYXRlcy5mb3JFYWNoKGZ1bmN0aW9uICh3cmFwcGVyVGVtcGxhdGUsIGluZGV4KSB7XG4gICAgICAgICAgICBmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyVGVtcGxhdGUod3JhcHBlclRlbXBsYXRlLCB3cmFwcGVyW2luZGV4XSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgd3JhcHBlcnNUZW1wbGF0ZXMucmV2ZXJzZSgpOyAvLyB3cmFwcGVyIDAgaXMgd3JhcHBlZCBpbiB3cmFwcGVyIDEgYW5kIHNvIG9uLi4uXG4gICAgICAgICAgdmFyIHRvdGFsV3JhcHBlciA9IHdyYXBwZXJzVGVtcGxhdGVzLnNoaWZ0KCk7XG4gICAgICAgICAgd3JhcHBlcnNUZW1wbGF0ZXMuZm9yRWFjaChmdW5jdGlvbiAod3JhcHBlclRlbXBsYXRlKSB7XG4gICAgICAgICAgICB0b3RhbFdyYXBwZXIgPSBkb1RyYW5zY2x1c2lvbih0b3RhbFdyYXBwZXIsIHdyYXBwZXJUZW1wbGF0ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGRvVHJhbnNjbHVzaW9uKHRvdGFsV3JhcHBlciwgdGVtcGxhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG9UcmFuc2NsdXNpb24od3JhcHBlciwgdGVtcGxhdGUpIHtcbiAgICAgIHZhciBzdXBlcldyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoXCI8YT48L2E+XCIpOyAvLyB0aGlzIGFsbG93cyBwZW9wbGUgbm90IGhhdmUgdG8gaGF2ZSBhIHNpbmdsZSByb290IGluIHdyYXBwZXJzXG4gICAgICBzdXBlcldyYXBwZXIuYXBwZW5kKHdyYXBwZXIpO1xuICAgICAgdmFyIHRyYW5zY2x1ZGVFbCA9IHN1cGVyV3JhcHBlci5maW5kKFwiZm9ybWx5LXRyYW5zY2x1ZGVcIik7XG4gICAgICB0cmFuc2NsdWRlRWwucmVwbGFjZVdpdGgodGVtcGxhdGUpO1xuICAgICAgcmV0dXJuIHN1cGVyV3JhcHBlci5odG1sKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0V3JhcHBlck9wdGlvbihvcHRpb25zKSB7XG4gICAgICB2YXIgd3JhcHBlciA9IG9wdGlvbnMud3JhcHBlcjtcbiAgICAgIC8vIGV4cGxpY2l0IG51bGwgbWVhbnMgbm8gd3JhcHBlclxuICAgICAgaWYgKHdyYXBwZXIgPT09IG51bGwpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuXG4gICAgICAvLyBub3RoaW5nIHNwZWNpZmllZCBtZWFucyB1c2UgdGhlIGRlZmF1bHQgd3JhcHBlciBmb3IgdGhlIHR5cGVcbiAgICAgIGlmICghd3JhcHBlcikge1xuICAgICAgICAvLyBnZXQgYWxsIHdyYXBwZXJzIHRoYXQgc3BlY2lmeSB0aGV5IGFwcGx5IHRvIHRoaXMgdHlwZVxuICAgICAgICB3cmFwcGVyID0gYXJyYXlpZnkoZm9ybWx5Q29uZmlnLmdldFdyYXBwZXJCeVR5cGUob3B0aW9ucy50eXBlKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3cmFwcGVyID0gYXJyYXlpZnkod3JhcHBlcikubWFwKGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKTtcbiAgICAgIH1cblxuICAgICAgLy8gZ2V0IGFsbCB3cmFwcGVycyBmb3IgdGhhdCB0aGlzIHR5cGUgc3BlY2lmaWVkIHRoYXQgaXQgdXNlcy5cbiAgICAgIHZhciB0eXBlID0gZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0aW9ucy50eXBlLCB0cnVlLCBvcHRpb25zKTtcbiAgICAgIGlmICh0eXBlICYmIHR5cGUud3JhcHBlcikge1xuICAgICAgICB2YXIgdHlwZVdyYXBwZXJzID0gYXJyYXlpZnkodHlwZS53cmFwcGVyKS5tYXAoZm9ybWx5Q29uZmlnLmdldFdyYXBwZXIpO1xuICAgICAgICB3cmFwcGVyID0gd3JhcHBlci5jb25jYXQodHlwZVdyYXBwZXJzKTtcbiAgICAgIH1cblxuICAgICAgLy8gYWRkIHRoZSBkZWZhdWx0IHdyYXBwZXIgbGFzdFxuICAgICAgdmFyIGRlZmF1bHRXcmFwcGVyID0gZm9ybWx5Q29uZmlnLmdldFdyYXBwZXIoKTtcbiAgICAgIGlmIChkZWZhdWx0V3JhcHBlcikge1xuICAgICAgICB3cmFwcGVyLnB1c2goZGVmYXVsdFdyYXBwZXIpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tBcGkob3B0aW9ucykge1xuICAgICAgZm9ybWx5QXBpQ2hlY2tbXCJ0aHJvd1wiXShmb3JtbHlBcGlDaGVjay5mb3JtbHlGaWVsZE9wdGlvbnMsIGFyZ3VtZW50cywge1xuICAgICAgICBwcmVmaXg6IFwiZm9ybWx5LWZpZWxkIGRpcmVjdGl2ZVwiLFxuICAgICAgICB1cmw6IFwiZm9ybWx5LWZpZWxkLWRpcmVjdGl2ZS12YWxpZGF0aW9uLWZhaWxlZFwiXG4gICAgICB9KTtcbiAgICAgIC8vIHZhbGlkYXRlIHdpdGggdGhlIHR5cGVcbiAgICAgIHZhciB0eXBlID0gb3B0aW9ucy50eXBlICYmIGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSk7XG4gICAgICBpZiAodHlwZSkge1xuICAgICAgICBpZiAodHlwZS52YWxpZGF0ZU9wdGlvbnMpIHtcbiAgICAgICAgICB0eXBlLnZhbGlkYXRlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBydW5BcGlDaGVjayh0eXBlLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5BcGlDaGVjayhfcmVmLCBvcHRpb25zKSB7XG4gICAgICB2YXIgYXBpQ2hlY2sgPSBfcmVmLmFwaUNoZWNrO1xuICAgICAgdmFyIGFwaUNoZWNrSW5zdGFuY2UgPSBfcmVmLmFwaUNoZWNrSW5zdGFuY2U7XG4gICAgICB2YXIgYXBpQ2hlY2tGdW5jdGlvbiA9IF9yZWYuYXBpQ2hlY2tGdW5jdGlvbjtcbiAgICAgIHZhciBhcGlDaGVja09wdGlvbnMgPSBfcmVmLmFwaUNoZWNrT3B0aW9ucztcblxuICAgICAgaWYgKCFhcGlDaGVjaykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgaW5zdGFuY2UgPSBhcGlDaGVja0luc3RhbmNlIHx8IGZvcm1seUFwaUNoZWNrO1xuICAgICAgdmFyIGZuID0gYXBpQ2hlY2tGdW5jdGlvbiB8fCBcIndhcm5cIjtcbiAgICAgIHZhciBzaGFwZSA9IGluc3RhbmNlLnNoYXBlKGFwaUNoZWNrKTtcbiAgICAgIGluc3RhbmNlW2ZuXShzaGFwZSwgW29wdGlvbnNdLCBhcGlDaGVja09wdGlvbnMgfHwge1xuICAgICAgICBwcmVmaXg6IFwiZm9ybWx5LWZpZWxkIFwiICsgbmFtZSxcbiAgICAgICAgdXJsOiBmb3JtbHlBcGlDaGVjay5jb25maWcub3V0cHV0LmRvY3NCYXNlVXJsICsgXCJmb3JtbHktZmllbGQtdHlwZS1hcGljaGVjay1mYWlsZWRcIlxuICAgICAgfSk7XG4gICAgfVxuICB9XG4gIGZvcm1seUZpZWxkLiRpbmplY3QgPSBbXCIkaHR0cFwiLCBcIiRxXCIsIFwiJGNvbXBpbGVcIiwgXCIkdGVtcGxhdGVDYWNoZVwiLCBcImZvcm1seUNvbmZpZ1wiLCBcImZvcm1seVZhbGlkYXRpb25NZXNzYWdlc1wiLCBcImZvcm1seUFwaUNoZWNrXCIsIFwiZm9ybWx5VXRpbFwiLCBcImZvcm1seVVzYWJpbGl0eVwiLCBcImZvcm1seVdhcm5cIl07XG5cbiAgZnVuY3Rpb24gYXJyYXlpZnkob2JqKSB7XG4gICAgaWYgKG9iaiAmJiAhYW5ndWxhci5pc0FycmF5KG9iaikpIHtcbiAgICAgIG9iaiA9IFtvYmpdO1xuICAgIH0gZWxzZSBpZiAoIW9iaikge1xuICAgICAgb2JqID0gW107XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvZm9ybWx5LWZpZWxkLmpzXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3RvQ29uc3VtYWJsZUFycmF5ID0gZnVuY3Rpb24gKGFycikgeyBpZiAoQXJyYXkuaXNBcnJheShhcnIpKSB7IGZvciAodmFyIGkgPSAwLCBhcnIyID0gQXJyYXkoYXJyLmxlbmd0aCk7IGkgPCBhcnIubGVuZ3RoOyBpKyspIGFycjJbaV0gPSBhcnJbaV07IHJldHVybiBhcnIyOyB9IGVsc2UgeyByZXR1cm4gQXJyYXkuZnJvbShhcnIpOyB9IH07XG5cbnZhciBfc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyLWZpeFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKFwiZm9ybWx5Rm9ybVwiLCBmb3JtbHlGb3JtKTtcblxuICBmb3JtbHlGb3JtLnRlc3RzID0gT05fVEVTVCA/IHJlcXVpcmUoXCIuL2Zvcm1seS1mb3JtLnRlc3RcIikobmdNb2R1bGUpIDogbnVsbDtcblxuICBmdW5jdGlvbiBmb3JtbHlGb3JtKGZvcm1seVVzYWJpbGl0eSkge1xuICAgIHZhciBjdXJyZW50Rm9ybUlkID0gMTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6IFwiRVwiLFxuICAgICAgdGVtcGxhdGU6IGZ1bmN0aW9uIHRlbXBsYXRlKGVsLCBhdHRycykge1xuICAgICAgICAvKiBqc2hpbnQgLVcwMzMgKi8gLy8gdGhpcyBiZWNhdXNlIGpzaGludCBpcyBicm9rZW4gSSBndWVzcy4uLlxuICAgICAgICB2YXIgcm9vdEVsID0gYXR0cnMucm9vdEVsIHx8IFwibmctZm9ybVwiO1xuICAgICAgICByZXR1cm4gXCJcXG4gICAgICAgICAgPFwiICsgcm9vdEVsICsgXCIgY2xhc3M9XFxcImZvcm1seVxcXCJcXG4gICAgICAgICAgICAgICAgICAgbmFtZT1cXFwiZm9ybVxcXCJcXG4gICAgICAgICAgICAgICAgICAgcm9sZT1cXFwiZm9ybVxcXCI+XFxuICAgICAgICAgICAgPGRpdiBmb3JtbHktZmllbGRcXG4gICAgICAgICAgICAgICAgIG5nLXJlcGVhdD1cXFwiZmllbGQgaW4gZmllbGRzIHRyYWNrIGJ5ICRpbmRleFxcXCJcXG4gICAgICAgICAgICAgICAgIG5nLWlmPVxcXCIhZmllbGQuaGlkZVxcXCJcXG4gICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJmb3JtbHktZmllbGQge3tmaWVsZC50eXBlID8gJ2Zvcm1seS1maWVsZC0nICsgZmllbGQudHlwZSA6ICcnfX1cXFwiXFxuICAgICAgICAgICAgICAgICBvcHRpb25zPVxcXCJmaWVsZFxcXCJcXG4gICAgICAgICAgICAgICAgIG1vZGVsPVxcXCJmaWVsZC5tb2RlbCB8fCBtb2RlbFxcXCJcXG4gICAgICAgICAgICAgICAgIGZpZWxkcz1cXFwiZmllbGRzXFxcIlxcbiAgICAgICAgICAgICAgICAgZm9ybT1cXFwiZm9ybVxcXCJcXG4gICAgICAgICAgICAgICAgIGZvcm0taWQ9XFxcImZvcm1JZFxcXCJcXG4gICAgICAgICAgICAgICAgIGZvcm0tc3RhdGU9XFxcIm9wdGlvbnMuZm9ybVN0YXRlXFxcIlxcbiAgICAgICAgICAgICAgICAgaW5kZXg9XFxcIiRpbmRleFxcXCI+XFxuICAgICAgICAgICAgPC9kaXY+XFxuICAgICAgICAgICAgPGRpdiBuZy10cmFuc2NsdWRlPjwvZGl2PlxcbiAgICAgICAgICA8L1wiICsgcm9vdEVsICsgXCI+XFxuICAgICAgICBcIjtcbiAgICAgIH0sXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIGZpZWxkczogXCI9XCIsXG4gICAgICAgIG1vZGVsOiBcIj1cIiwgLy8gd2UnbGwgZG8gb3VyIG93biB3YXJuaW5nIHRvIGhlbHAgd2l0aCBtaWdyYXRpb25zXG4gICAgICAgIGZvcm06IFwiPT9cIixcbiAgICAgICAgb3B0aW9uczogXCI9P1wiXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogW1wiJHNjb3BlXCIsIGZ1bmN0aW9uIGNvbnRyb2xsZXIoJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5mb3JtSWQgPSBcImZvcm1seV9cIiArIGN1cnJlbnRGb3JtSWQrKztcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMgPSAkc2NvcGUub3B0aW9ucyB8fCB7fTtcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMuZm9ybVN0YXRlID0gJHNjb3BlLm9wdGlvbnMuZm9ybVN0YXRlIHx8IHt9O1xuXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBhdHRhY2hLZXkpOyAvLyBhdHRhY2hlcyBhIGtleSBiYXNlZCBvbiB0aGUgaW5kZXggaWYgYSBrZXkgaXNuJ3Qgc3BlY2lmaWVkXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBzZXR1cFdhdGNoZXJzKTsgLy8gc2V0dXAgd2F0Y2hlcnMgZm9yIGFsbCBmaWVsZHNcblxuICAgICAgICAvLyB3YXRjaCB0aGUgbW9kZWwgYW5kIGV2YWx1YXRlIHdhdGNoIGV4cHJlc3Npb25zIHRoYXQgZGVwZW5kIG9uIGl0LlxuICAgICAgICAkc2NvcGUuJHdhdGNoKFwibW9kZWxcIiwgZnVuY3Rpb24gb25SZXN1bHRVcGRhdGUobmV3UmVzdWx0KSB7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgICAgLypqc2hpbnQgLVcwMzAgKi9cbiAgICAgICAgICAgIGZpZWxkLnJ1bkV4cHJlc3Npb25zICYmIGZpZWxkLnJ1bkV4cHJlc3Npb25zKG5ld1Jlc3VsdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGF0dGFjaEtleShmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICBmaWVsZC5rZXkgPSBmaWVsZC5rZXkgfHwgaW5kZXggfHwgMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldHVwV2F0Y2hlcnMoZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChmaWVsZC53YXRjaGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgd2F0Y2hlcnMgPSBmaWVsZC53YXRjaGVyO1xuICAgICAgICAgIGlmICghYW5ndWxhci5pc0FycmF5KHdhdGNoZXJzKSkge1xuICAgICAgICAgICAgd2F0Y2hlcnMgPSBbd2F0Y2hlcnNdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2god2F0Y2hlcnMsIGZ1bmN0aW9uICh3YXRjaGVyKSB7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKHdhdGNoZXIubGlzdGVuZXIpKSB7XG4gICAgICAgICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFwiYWxsLWZpZWxkLXdhdGNoZXJzLW11c3QtaGF2ZS1hLWxpc3RlbmVyXCIsIFwiQWxsIGZpZWxkIHdhdGNoZXJzIG11c3QgaGF2ZSBhIGxpc3RlbmVyXCIsIGZpZWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB3YXRjaEV4cHJlc3Npb24gPSBnZXRXYXRjaEV4cHJlc3Npb24od2F0Y2hlciwgZmllbGQsIGluZGV4KTtcbiAgICAgICAgICAgIHZhciB3YXRjaExpc3RlbmVyID0gZ2V0V2F0Y2hMaXN0ZW5lcih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpO1xuXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHdhdGNoZXIudHlwZSB8fCBcIiR3YXRjaFwiO1xuICAgICAgICAgICAgd2F0Y2hlci5zdG9wV2F0Y2hpbmcgPSAkc2NvcGVbdHlwZV0od2F0Y2hFeHByZXNzaW9uLCB3YXRjaExpc3RlbmVyLCB3YXRjaGVyLndhdGNoRGVlcCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRXYXRjaEV4cHJlc3Npb24od2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgdmFyIHdhdGNoRXhwcmVzc2lvbiA9IHdhdGNoZXIuZXhwcmVzc2lvbiB8fCBcIm1vZGVsWydcIiArIGZpZWxkLmtleSArIFwiJ11cIjtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHdhdGNoRXhwcmVzc2lvbikpIHtcbiAgICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggZXhwcmVzc2lvbiBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgICAvLyBhbmQgdGhlIHN0b3AgZnVuY3Rpb24gYXMgdGhlIGxhc3QgYXJnIGFzIGEgaGVscGVyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxFeHByZXNzaW9uID0gd2F0Y2hFeHByZXNzaW9uO1xuICAgICAgICAgICAgd2F0Y2hFeHByZXNzaW9uID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hFeHByZXNzaW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IG1vZGlmeUFyZ3MuYXBwbHkodW5kZWZpbmVkLCBbd2F0Y2hlciwgaW5kZXhdLmNvbmNhdChfc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEV4cHJlc3Npb24uYXBwbHkodW5kZWZpbmVkLCBfdG9Db25zdW1hYmxlQXJyYXkoYXJncykpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdhdGNoRXhwcmVzc2lvbi5kaXNwbGF5TmFtZSA9IFwiRm9ybWx5IFdhdGNoIEV4cHJlc3Npb24gZm9yIGZpZWxkIGZvciBcIiArIGZpZWxkLmtleTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHdhdGNoRXhwcmVzc2lvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFdhdGNoTGlzdGVuZXIod2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgdmFyIHdhdGNoTGlzdGVuZXIgPSB3YXRjaGVyLmxpc3RlbmVyO1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24od2F0Y2hMaXN0ZW5lcikpIHtcbiAgICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggbGlzdGVuZXIgc28gd2UgY2FuIGNhbGwgaXQgd2l0aCB0aGUgZmllbGQgYXMgdGhlIGZpcnN0IGFyZ1xuICAgICAgICAgICAgLy8gYW5kIHRoZSBzdG9wIGZ1bmN0aW9uIGFzIHRoZSBsYXN0IGFyZyBhcyBhIGhlbHBlclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsTGlzdGVuZXIgPSB3YXRjaExpc3RlbmVyO1xuICAgICAgICAgICAgd2F0Y2hMaXN0ZW5lciA9IGZ1bmN0aW9uIGZvcm1seVdhdGNoTGlzdGVuZXIoKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gbW9kaWZ5QXJncy5hcHBseSh1bmRlZmluZWQsIFt3YXRjaGVyLCBpbmRleF0uY29uY2F0KF9zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsTGlzdGVuZXIuYXBwbHkodW5kZWZpbmVkLCBfdG9Db25zdW1hYmxlQXJyYXkoYXJncykpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdhdGNoTGlzdGVuZXIuZGlzcGxheU5hbWUgPSBcIkZvcm1seSBXYXRjaCBMaXN0ZW5lciBmb3IgZmllbGQgZm9yIFwiICsgZmllbGQua2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gd2F0Y2hMaXN0ZW5lcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1vZGlmeUFyZ3Mod2F0Y2hlciwgaW5kZXgpIHtcbiAgICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgb3JpZ2luYWxBcmdzID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgICAgb3JpZ2luYWxBcmdzW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gWyRzY29wZS5maWVsZHNbaW5kZXhdXS5jb25jYXQob3JpZ2luYWxBcmdzLCBbd2F0Y2hlci5zdG9wV2F0Y2hpbmddKTtcbiAgICAgICAgfVxuICAgICAgfV0sXG4gICAgICBsaW5rOiBmdW5jdGlvbiBsaW5rKHNjb3BlLCBlbCwgYXR0cnMpIHtcbiAgICAgICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KFwicmVzdWx0XCIpKSB7XG4gICAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZvcm1seUVycm9yKFwiVGhlIFxcXCJyZXN1bHRcXFwiIGF0dHJpYnV0ZSBvbiBhIGZvcm1seS1mb3JtIGlzIG5vIGxvbmdlciB2YWxpZC4gVXNlIFxcXCJtb2RlbFxcXCIgaW5zdGVhZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0cnMubmFtZSAhPT0gXCJmb3JtXCIpIHtcbiAgICAgICAgICAvLyB0aGVuIHRoZXkgc3BlY2lmaWVkIHRoZWlyIG93biBuYW1lXG4gICAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZvcm1seUVycm9yKFwiVGhlIFxcXCJuYW1lXFxcIiBhdHRyaWJ1dGUgb24gYSBmb3JtbHktZm9ybSBpcyBubyBsb25nZXIgdmFsaWQuIFVzZSBcXFwiZm9ybVxcXCIgaW5zdGVhZFwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbiAgZm9ybWx5Rm9ybS4kaW5qZWN0ID0gW1wiZm9ybWx5VXNhYmlsaXR5XCJdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGlyZWN0aXZlcy9mb3JtbHktZm9ybS5qc1xuICoqIG1vZHVsZSBpZCA9IDIwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKFwiZm9ybWx5Rm9jdXNcIiwgW1wiJHRpbWVvdXRcIiwgXCIkZG9jdW1lbnRcIiwgZnVuY3Rpb24gKCR0aW1lb3V0LCAkZG9jdW1lbnQpIHtcbiAgICAvKiBqc2hpbnQgLVcwNTIgKi9cbiAgICByZXR1cm4ge1xuICAgICAgbGluazogZnVuY3Rpb24gbGluayhzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzRWwgPSBudWxsO1xuICAgICAgICB2YXIgZWwgPSBlbGVtZW50WzBdO1xuICAgICAgICB2YXIgZG9jID0gJGRvY3VtZW50WzBdO1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZShcImZvcm1seUZvY3VzXCIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcHJldmlvdXNFbCA9IGRvYy5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICAgICAgfSwgfiB+YXR0cnMuZm9jdXNXYWl0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBcImZhbHNlXCIpIHtcbiAgICAgICAgICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCA9PT0gZWwpIHtcbiAgICAgICAgICAgICAgZWwuYmx1cigpO1xuICAgICAgICAgICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoXCJyZWZvY3VzXCIpICYmIHByZXZpb3VzRWwpIHtcbiAgICAgICAgICAgICAgICBwcmV2aW91c0VsLmZvY3VzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvY3VzLmpzXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5ydW4oYWRkRm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IpO1xuXG4gIGZ1bmN0aW9uIGFkZEZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKGZvcm1seUNvbmZpZykge1xuICAgIGlmIChmb3JtbHlDb25maWcuZXh0cmFzLmRpc2FibGVOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlci5wdXNoKG5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKTtcblxuICAgIGZ1bmN0aW9uIG5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKHRlbXBsYXRlLCBvcHRpb25zLCBzY29wZSkge1xuICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICAgICAgdmFyIGVsID0gYW5ndWxhci5lbGVtZW50KFwiPGE+PC9hPlwiKTtcbiAgICAgIHZhciBkYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgICAgaWYgKGRhdGEubm9Ub3VjaHkpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgfVxuICAgICAgZWwuYXBwZW5kKHRlbXBsYXRlKTtcbiAgICAgIHZhciBtb2RlbEVscyA9IGFuZ3VsYXIuZWxlbWVudChlbFswXS5xdWVyeVNlbGVjdG9yQWxsKFwiW25nLW1vZGVsXVwiKSk7XG4gICAgICBpZiAoIW1vZGVsRWxzIHx8ICFtb2RlbEVscy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgfVxuXG4gICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxFbHMsIFwiaWRcIiwgc2NvcGUuaWQpO1xuICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCBcIm5hbWVcIiwgc2NvcGUuaWQpO1xuXG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy52YWxpZGF0b3JzKSkge1xuICAgICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxFbHMsIFwiZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uXCIsIFwib3B0aW9ucy52YWxpZGF0b3JzXCIpO1xuICAgICAgfVxuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMubW9kZWxPcHRpb25zKSkge1xuICAgICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxFbHMsIFwibmctbW9kZWwtb3B0aW9uc1wiLCBcIm9wdGlvbnMubW9kZWxPcHRpb25zXCIpO1xuICAgICAgICBpZiAob3B0aW9ucy5tb2RlbE9wdGlvbnMuZ2V0dGVyU2V0dGVyKSB7XG4gICAgICAgICAgbW9kZWxFbHMuYXR0cihcIm5nLW1vZGVsXCIsIFwib3B0aW9ucy52YWx1ZVwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWRkVGVtcGxhdGVPcHRpb25zQXR0cnMoKTtcblxuICAgICAgcmV0dXJuIGVsLmh0bWwoKTtcblxuICAgICAgZnVuY3Rpb24gYWRkVGVtcGxhdGVPcHRpb25zQXR0cnMoKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnMgJiYgIW9wdGlvbnMuZXhwcmVzc2lvblByb3BlcnRpZXMpIHtcbiAgICAgICAgICAvLyBubyBuZWVkIHRvIHJ1biB0aGVzZSBpZiB0aGVyZSBhcmUgbm8gdGVtcGxhdGVPcHRpb25zIG9yIGV4cHJlc3Npb25Qcm9wZXJ0aWVzXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciB0byA9IG9wdGlvbnMudGVtcGxhdGVPcHRpb25zIHx8IHt9O1xuICAgICAgICB2YXIgZXAgPSBvcHRpb25zLmV4cHJlc3Npb25Qcm9wZXJ0aWVzIHx8IHt9O1xuXG4gICAgICAgIHZhciBuZ01vZGVsQXR0cmlidXRlcyA9IGdldEJ1aWx0aW5BdHRyaWJ1dGVzKCk7XG5cbiAgICAgICAgLy8gZXh0ZW5kIHdpdGggdGhlIHVzZXIncyBzcGVjaWZpY2F0aW9ucyB3aW5uaW5nXG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKG5nTW9kZWxBdHRyaWJ1dGVzLCBvcHRpb25zLm5nTW9kZWxBdHRycyk7XG5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKG5nTW9kZWxBdHRyaWJ1dGVzLCBmdW5jdGlvbiAodmFsLCBuYW1lKSB7XG4gICAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6MTAgKi9cbiAgICAgICAgICB2YXIgYXR0clZhbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICB2YXIgYXR0ck5hbWUgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdmFyIHJlZiA9IFwib3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbJ1wiICsgbmFtZSArIFwiJ11cIjtcbiAgICAgICAgICB2YXIgdG9WYWwgPSB0b1tuYW1lXTtcbiAgICAgICAgICB2YXIgZXBWYWwgPSBnZXRFcFZhbHVlKGVwLCBuYW1lKTtcblxuICAgICAgICAgIHZhciBpblRvID0gYW5ndWxhci5pc0RlZmluZWQodG9WYWwpO1xuICAgICAgICAgIHZhciBpbkVwID0gYW5ndWxhci5pc0RlZmluZWQoZXBWYWwpO1xuICAgICAgICAgIGlmICh2YWwudmFsdWUpIHtcbiAgICAgICAgICAgIC8vIEkgcmVhbGl6ZSB0aGlzIGxvb2tzIGJhY2t3YXJkcywgYnV0IGl0J3MgcmlnaHQsIHRydXN0IG1lLi4uXG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC52YWx1ZTtcbiAgICAgICAgICAgIGF0dHJWYWwgPSBuYW1lO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmFsLmV4cHJlc3Npb24gJiYgaW5Ubykge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSB2YWwuZXhwcmVzc2lvbjtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHRvW25hbWVdKSkge1xuICAgICAgICAgICAgICBhdHRyVmFsID0gXCIkZXZhbChcIiArIHJlZiArIFwiKVwiO1xuICAgICAgICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24odG9bbmFtZV0pKSB7XG4gICAgICAgICAgICAgIGF0dHJWYWwgPSBcIlwiICsgcmVmICsgXCIobW9kZWxbb3B0aW9ucy5rZXldLCBvcHRpb25zLCB0aGlzLCAkZXZlbnQpXCI7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJvcHRpb25zLnRlbXBsYXRlT3B0aW9ucy5cIiArIG5hbWUgKyBcIiBtdXN0IGJlIGEgc3RyaW5nIG9yIGZ1bmN0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbC5ib3VuZCAmJiBpbkVwKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5ib3VuZDtcbiAgICAgICAgICAgIGF0dHJWYWwgPSByZWY7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWwuYXR0cmlidXRlICYmIGluRXApIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmF0dHJpYnV0ZTtcbiAgICAgICAgICAgIGF0dHJWYWwgPSBcInt7XCIgKyByZWYgKyBcIn19XCI7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWwuYXR0cmlidXRlICYmIGluVG8pIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmF0dHJpYnV0ZTtcbiAgICAgICAgICAgIGF0dHJWYWwgPSB0b1ZhbDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbC5ib3VuZCAmJiBpblRvKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5ib3VuZDtcbiAgICAgICAgICAgIGF0dHJWYWwgPSByZWY7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdHRyTmFtZSkgJiYgYW5ndWxhci5pc0RlZmluZWQoYXR0clZhbCkpIHtcbiAgICAgICAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbEVscywgYXR0ck5hbWUsIGF0dHJWYWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldEJ1aWx0aW5BdHRyaWJ1dGVzKCkge1xuICAgICAgICB2YXIgbmdNb2RlbEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgICAgZm9jdXM6IHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZTogXCJmb3JtbHktZm9jdXNcIlxuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgdmFyIGJvdW5kT25seSA9IFtdO1xuICAgICAgICB2YXIgYm90aEF0dHJpYnV0ZUFuZEJvdW5kID0gW1wicmVxdWlyZWRcIiwgXCJkaXNhYmxlZFwiLCBcInBhdHRlcm5cIiwgXCJtaW5sZW5ndGhcIl07XG4gICAgICAgIHZhciBleHByZXNzaW9uT25seSA9IFtcImNoYW5nZVwiLCBcImtleWRvd25cIiwgXCJrZXl1cFwiLCBcImtleXByZXNzXCIsIFwiY2xpY2tcIiwgXCJmb2N1c1wiLCBcImJsdXJcIl07XG4gICAgICAgIHZhciBhdHRyaWJ1dGVPbmx5ID0gW1wicGxhY2Vob2xkZXJcIiwgXCJtaW5cIiwgXCJtYXhcIiwgXCJ0YWJpbmRleFwiLCBcInR5cGVcIl07XG4gICAgICAgIGlmIChmb3JtbHlDb25maWcuZXh0cmFzLm5nTW9kZWxBdHRyc01hbmlwdWxhdG9yUHJlZmVyQm91bmQpIHtcbiAgICAgICAgICBib3VuZE9ubHkucHVzaChcIm1heGxlbmd0aFwiKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBib3RoQXR0cmlidXRlQW5kQm91bmQucHVzaChcIm1heGxlbmd0aFwiKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChib3VuZE9ubHksIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7IGJvdW5kOiBcIm5nLVwiICsgaXRlbSB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBhbmd1bGFyLmZvckVhY2goYm90aEF0dHJpYnV0ZUFuZEJvdW5kLCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW2l0ZW1dID0geyBhdHRyaWJ1dGU6IGl0ZW0sIGJvdW5kOiBcIm5nLVwiICsgaXRlbSB9O1xuICAgICAgICB9KTtcblxuICAgICAgICBhbmd1bGFyLmZvckVhY2goZXhwcmVzc2lvbk9ubHksIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgdmFyIHByb3BOYW1lID0gXCJvblwiICsgaXRlbS5zdWJzdHIoMCwgMSkudG9VcHBlckNhc2UoKSArIGl0ZW0uc3Vic3RyKDEpO1xuICAgICAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW3Byb3BOYW1lXSA9IHsgZXhwcmVzc2lvbjogXCJuZy1cIiArIGl0ZW0gfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKGF0dHJpYnV0ZU9ubHksIGZ1bmN0aW9uIChpdGVtKSB7XG4gICAgICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7IGF0dHJpYnV0ZTogaXRlbSB9O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5nTW9kZWxBdHRyaWJ1dGVzO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRFcFZhbHVlKGVwLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiBlcFtcInRlbXBsYXRlT3B0aW9ucy5cIiArIG5hbWVdIHx8IGVwW1widGVtcGxhdGVPcHRpb25zWydcIiArIG5hbWUgKyBcIiddXCJdIHx8IGVwW1widGVtcGxhdGVPcHRpb25zW1xcXCJcIiArIG5hbWUgKyBcIlxcXCJdXCJdO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRJZk5vdFByZXNlbnQoZWwsIGF0dHIsIHZhbCkge1xuICAgICAgICBpZiAoIWVsLmF0dHIoYXR0cikpIHtcbiAgICAgICAgICBlbC5hdHRyKGF0dHIsIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgYWRkRm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IuJGluamVjdCA9IFtcImZvcm1seUNvbmZpZ1wiXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3J1bi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDIyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhci1maXhcIik7XG5cbm1vZHVsZS5leHBvcnRzID0geyBmb3JtbHlFdmFsOiBmb3JtbHlFdmFsLCBnZXRGaWVsZElkOiBnZXRGaWVsZElkLCByZXZlcnNlRGVlcE1lcmdlOiByZXZlcnNlRGVlcE1lcmdlIH07XG5cbmZ1bmN0aW9uIGZvcm1seUV2YWwoc2NvcGUsIGV4cHJlc3Npb24sIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSkge1xuICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGV4cHJlc3Npb24pKSB7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24odmlld1ZhbHVlIHx8IG1vZGVsVmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc2NvcGUuJGV2YWwoZXhwcmVzc2lvbiwge1xuICAgICAgJHZpZXdWYWx1ZTogdmlld1ZhbHVlIHx8IG1vZGVsVmFsdWUsXG4gICAgICAkbW9kZWxWYWx1ZTogbW9kZWxWYWx1ZVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkSWQoZm9ybUlkLCBvcHRpb25zLCBpbmRleCkge1xuICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICB0eXBlID0gXCJ0ZW1wbGF0ZVwiO1xuICB9IGVsc2UgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGVVcmwpIHtcbiAgICB0eXBlID0gXCJ0ZW1wbGF0ZVVybFwiO1xuICB9XG5cbiAgcmV0dXJuIFtmb3JtSWQsIHR5cGUsIG9wdGlvbnMua2V5LCBpbmRleF0uam9pbihcIl9cIik7XG59XG5cbmZ1bmN0aW9uIHJldmVyc2VEZWVwTWVyZ2UoZGVzdCkge1xuICBhbmd1bGFyLmZvckVhY2goYXJndW1lbnRzLCBmdW5jdGlvbiAoc3JjLCBpbmRleCkge1xuICAgIGlmICghaW5kZXgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYW5ndWxhci5mb3JFYWNoKHNyYywgZnVuY3Rpb24gKHZhbCwgcHJvcCkge1xuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChkZXN0W3Byb3BdKSkge1xuICAgICAgICBkZXN0W3Byb3BdID0gYW5ndWxhci5jb3B5KHZhbCk7XG4gICAgICB9IGVsc2UgaWYgKG9iakFuZFNhbWVUeXBlKGRlc3RbcHJvcF0sIHZhbCkpIHtcbiAgICAgICAgcmV2ZXJzZURlZXBNZXJnZShkZXN0W3Byb3BdLCB2YWwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gb2JqQW5kU2FtZVR5cGUob2JqMSwgb2JqMikge1xuICByZXR1cm4gYW5ndWxhci5pc09iamVjdChvYmoxKSAmJiBhbmd1bGFyLmlzT2JqZWN0KG9iajIpICYmIE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmoxKSA9PT0gT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iajIpO1xufVxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9vdGhlci91dGlscy5qc1xuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJmb3JtbHkuanMifQ==