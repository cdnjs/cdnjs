// angular-formly version 5.0.1 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

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
	
	module.exports = "https://github.com/formly-js/angular-formly/blob/" + ("5.0.1") + "/other/ERRORS_AND_WARNINGS.md#";

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
	  __webpack_require__(20)(ngModule);
	  __webpack_require__(21)(ngModule);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(16)(ngModule);
	  __webpack_require__(17)(ngModule);
	  __webpack_require__(18)(ngModule);
	  __webpack_require__(19)(ngModule);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(22)(ngModule);
	  __webpack_require__(23)(ngModule);
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
	var utils = __webpack_require__(24);
	
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
	  ngModule.constant("formlyVersion", ("5.0.1"));
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyErrorAndWarningsUrlPrefix", "https://github.com/formly-js/angular-formly/blob/" + ("5.0.1") + "/other/ERRORS_AND_WARNINGS.md#");
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
/* 17 */
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
	        formId: "@",
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
/* 18 */
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
	  function formlyForm(formlyUsability, $parse) {
	    var currentFormId = 1;
	    return {
	      restrict: "E",
	      template: function template(el, attrs) {
	        /* jshint -W033 */ // this because jshint is broken I guess...
	        var rootEl = attrs.rootEl || "ng-form";
	        var formName = "formly_" + currentFormId++;
	        return "\n          <" + rootEl + " class=\"formly\"\n                   name=\"" + formName + "\"\n                   role=\"form\">\n            <div formly-field\n                 ng-repeat=\"field in fields track by $index\"\n                 ng-if=\"!field.hide\"\n                 class=\"formly-field {{field.type ? 'formly-field-' + field.type : ''}}\"\n                 options=\"field\"\n                 model=\"field.model || model\"\n                 fields=\"fields\"\n                 form=\"" + formName + "\"\n                 form-id=\"" + formName + "\"\n                 form-state=\"options.formState\"\n                 index=\"$index\">\n            </div>\n            <div ng-transclude></div>\n          </" + rootEl + ">\n        ";
	      },
	      replace: true,
	      transclude: true,
	      scope: {
	        fields: "=",
	        model: "=",
	        form: "=?",
	        options: "=?"
	      },
	      controller: ["$scope", function controller($scope) {
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
	        var formId = attrs.name;
	        $parse(attrs.form).assign(scope.$parent, formId);
	      }
	    };
	  }
	  formlyForm.$inject = ["formlyUsability", "$parse"];
	};

/***/ },
/* 19 */
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var utils = __webpack_require__(24);
	
	module.exports = function (ngModule) {
	  ngModule.factory("formlyUtil", formlyUtil);
	
	  formlyUtil.tests = false ? require("./formlyUtil.test")(ngModule) : null;
	
	  function formlyUtil() {
	    return utils;
	  }
	};

/***/ },
/* 21 */
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
	
	module.exports = function (ngModule) {
	  ngModule.run(addCustomTags);
	
	  function addCustomTags($document) {
	
	    if ($document && $document.get) {
	      //IE8 check ->
	      // http://stackoverflow.com/questions/10964966/detect-ie-version-prior-to-v9-in-javascript/10965203#10965203
	      var document = $document.get(0);
	      var div = document.createElement("div");
	      div.innerHTML = "<!--[if lt IE 9]><i></i><![endif]-->";
	      var isIeLessThan9 = div.getElementsByTagName("i").length === 1;
	
	      if (isIeLessThan9) {
	        //add the custom elements that we need for formly
	        var customElements = ["formly-field", "formly-form", "formly-custom-validation", "formly-focus", "formly-transpose"];
	
	        for (var i = 0; i < customElements.length; i++) {
	          document.createElement(customElements[i]);
	        }
	      }
	    }
	  }
	  addCustomTags.$inject = ["$document"];
	};

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(4);
	
	module.exports = { formlyEval: formlyEval, getFieldId: getFieldId, reverseDeepMerge: reverseDeepMerge, findByNodeName: findByNodeName };
	
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhMTgwMGY4MGI5ZjdiMGZhOTQ2MCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImFwaUNoZWNrXCIsXCJhbWRcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanMyXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzXCI6XCJhcGktY2hlY2tcIn0iLCJ3ZWJwYWNrOi8vLy4vb3RoZXIvZG9jc0Jhc2VVcmwuanMiLCJ3ZWJwYWNrOi8vLy4vYW5ndWxhci1maXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5QXBpQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seVVzYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlWZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktY3VzdG9tLXZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktZmllbGQuanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb2N1cy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9mb3JtbHlVdGlsLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2Zvcm1seVdhcm4uanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2Zvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yLmpzIiwid2VicGFjazovLy8uL3J1bi9mb3JtbHlDdXN0b21UYWdzLmpzIiwid2VicGFjazovLy8uL290aGVyL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7Ozs7QUN0Q0EsT0FBTSxDQUFDLE9BQU8sR0FBRyxtQkFBTyxDQUFDLENBQWdCLENBQUMsQzs7Ozs7Ozs7QUNBMUMsS0FBTSxRQUFRLEdBQUcsbUJBQU8sQ0FBQyxDQUFXLENBQUMsQ0FBQztBQUN0QyxLQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2IsU0FBTSxJQUFJLEtBQUssQ0FDYixzRUFBc0UsR0FDcEUsbUJBQU8sQ0FBQyxDQUFxQixDQUFDLEdBQUcsZ0NBQWdDLENBQ3BFLENBQUM7RUFDSDtBQUNELEtBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQztBQUM5QixLQUFNLE9BQU8sR0FBRyxtQkFBTyxDQUFDLENBQWUsQ0FBQyxDQUFDO0FBQ3pDLEtBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVB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RixDQUFDLENBQUM7SUFDSixDQUFDLENBQUM7RUFDSjs7QUFFRCxVQUFTLGNBQWMsQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFO0FBQ2xDLFVBQU8sT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUNyRCxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxLQUFLLE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLENBQUM7RUFDL0Q7OztBQUdELFVBQVMsY0FBYyxDQUFDLEVBQUUsRUFBRSxRQUFRLEVBQUU7QUFDcEMsT0FBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEVBQUU7O0FBQ1osT0FBRSxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLENBQUM7SUFDMUI7O0FBRUQsT0FBSSxFQUFFLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxLQUFLLFFBQVEsQ0FBQyxXQUFXLEVBQUUsRUFBRTtBQUNsRCxZQUFPLEVBQUUsQ0FBQztJQUNYOztBQUVELE9BQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxRQUFRLEVBQUUsQ0FBQztBQUN0QixRQUFJLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7QUFDckMsU0FBSSxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFBRSxRQUFRLENBQUMsQ0FBQztBQUMxQyxTQUFJLElBQUksRUFBRTtBQUNSLGNBQU8sSUFBSSxDQUFDO01BQ2I7SUFDRiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFwaS1jaGVja1wiKSwgcmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiYXBpLWNoZWNrXCIsIFwiYW5ndWxhclwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJuZ0Zvcm1seVwiXSA9IGZhY3RvcnkocmVxdWlyZShcImFwaS1jaGVja1wiKSwgcmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5nRm9ybWx5XCJdID0gZmFjdG9yeShyb290W1wiYXBpQ2hlY2tcIl0sIHJvb3RbXCJhbmd1bGFyXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIGExODAwZjgwYjlmN2IwZmE5NDYwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKCcuL2luZGV4LmNvbW1vbicpO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguanNcbiAqKi8iLCJjb25zdCBhcGlDaGVjayA9IHJlcXVpcmUoJ2FwaS1jaGVjaycpO1xuaWYgKCFhcGlDaGVjaykge1xuICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgJ2FuZ3VsYXItZm9ybWx5IHJlcXVpcmVzIHRoZSBsaWJyYXJ5IGFwaUNoZWNrLmpzISBQbGVhc2UgaW5jbHVkZSBpdCEgJyArXG4gICAgICByZXF1aXJlKCcuL290aGVyL2RvY3NCYXNlVXJsJykgKyAnYXBpY2hlY2tqcy1kZXBlbmRlbmN5LXJlcXVpcmVkJ1xuICApO1xufVxuY29uc3QgbmdNb2R1bGVOYW1lID0gJ2Zvcm1seSc7XG5jb25zdCBhbmd1bGFyID0gcmVxdWlyZSgnLi9hbmd1bGFyLWZpeCcpO1xuY29uc3QgbmdNb2R1bGUgPSBhbmd1bGFyLm1vZHVsZShuZ01vZHVsZU5hbWUsIFtdKTtcblxucmVxdWlyZSgnLi9wcm92aWRlcnMnKShuZ01vZHVsZSk7XG5yZXF1aXJlKCcuL3NlcnZpY2VzJykobmdNb2R1bGUpO1xucmVxdWlyZSgnLi9kaXJlY3RpdmVzJykobmdNb2R1bGUpO1xucmVxdWlyZSgnLi9ydW4nKShuZ01vZHVsZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGVOYW1lO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vaW5kZXguY29tbW9uLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImFwaUNoZWNrXCIsXCJhbWRcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanMyXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzXCI6XCJhcGktY2hlY2tcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJleHBvcnQgZGVmYXVsdCBgaHR0cHM6Ly9naXRodWIuY29tL2Zvcm1seS1qcy9hbmd1bGFyLWZvcm1seS9ibG9iLyR7VkVSU0lPTn0vb3RoZXIvRVJST1JTX0FORF9XQVJOSU5HUy5tZCNgO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vb3RoZXIvZG9jc0Jhc2VVcmwuanNcbiAqKi8iLCIvLyBzb21lIHZlcnNpb25zIG9mIGFuZ3VsYXIgZG9uJ3QgZXhwb3J0IHRoZSBhbmd1bGFyIG1vZHVsZSBwcm9wZXJseSxcbi8vIHNvIHdlIGdldCBpdCBmcm9tIHdpbmRvdyBpbiB0aGlzIGNhc2UuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXInKTtcbmlmICghYW5ndWxhci52ZXJzaW9uKSB7XG4gIGFuZ3VsYXIgPSB3aW5kb3cuYW5ndWxhcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhcjtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2FuZ3VsYXItZml4L2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIHJlcXVpcmUoJy4vZm9ybWx5QXBpQ2hlY2snKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoJy4vZm9ybWx5VXNhYmlsaXR5JykobmdNb2R1bGUpO1xuICByZXF1aXJlKCcuL2Zvcm1seUNvbmZpZycpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZSgnLi9mb3JtbHlWZXJzaW9uJykobmdNb2R1bGUpO1xuICByZXF1aXJlKCcuL2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXgnKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoJy4vZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzJykobmdNb2R1bGUpO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICByZXF1aXJlKCcuL2Zvcm1seVV0aWwnKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoJy4vZm9ybWx5V2FybicpKG5nTW9kdWxlKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9zZXJ2aWNlcy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICByZXF1aXJlKCcuL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbicpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZSgnLi9mb3JtbHktZmllbGQnKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoJy4vZm9ybWx5LWZvcm0nKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoJy4vZm9ybWx5LWZvY3VzJykobmdNb2R1bGUpO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgcmVxdWlyZSgnLi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcicpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZSgnLi9mb3JtbHlDdXN0b21UYWdzJykobmdNb2R1bGUpO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3J1bi9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV85X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuXG4gIGxldCBhcGlDaGVjayA9IHJlcXVpcmUoJ2FwaS1jaGVjaycpKHtcbiAgICBvdXRwdXQ6IHtcbiAgICAgIHByZWZpeDogJ2FuZ3VsYXItZm9ybWx5OicsXG4gICAgICBkb2NzQmFzZVVybDogcmVxdWlyZSgnLi4vb3RoZXIvZG9jc0Jhc2VVcmwnKVxuICAgIH1cbiAgfSk7XG5cbiAgZnVuY3Rpb24gc2hhcGVSZXF1aXJlZElmTm90KG90aGVyUHJvcHMsIHByb3BDaGVja2VyKSB7XG4gICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkob3RoZXJQcm9wcykpIHtcbiAgICAgIG90aGVyUHJvcHMgPSBbb3RoZXJQcm9wc107XG4gICAgfVxuICAgIGNvbnN0IHR5cGUgPSBgc3BlY2lmaWVkIGlmIHRoZXNlIGFyZSBub3Qgc3BlY2lmaWVkOiBcXGAke290aGVyUHJvcHMuam9pbignLCAnKX1cXGAgKG90aGVyd2lzZSBpdCdzIG9wdGlvbmFsKWA7XG4gICAgZnVuY3Rpb24gc2hhcGVSZXF1aXJlZElmTm90RGVmaW5pdGlvbihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaikge1xuICAgICAgdmFyIHByb3BFeGlzdHMgPSBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KHByb3BOYW1lKTtcbiAgICAgIHZhciBvdGhlclByb3BzRXhpc3QgPSBvdGhlclByb3BzLnNvbWUoZnVuY3Rpb24gKG90aGVyUHJvcCkge1xuICAgICAgICByZXR1cm4gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShvdGhlclByb3ApO1xuICAgICAgfSk7XG4gICAgICAvL2NvbnNvbGUubG9nKHByb3BOYW1lLCBwcm9wRXhpc3RzLCBwcm9wLCBvdGhlclByb3BzRXhpc3QsIG90aGVyUHJvcHMuam9pbignLCAnKSk7XG4gICAgICBpZiAoIW90aGVyUHJvcHNFeGlzdCAmJiAhcHJvcEV4aXN0cykge1xuICAgICAgICByZXR1cm4gYXBpQ2hlY2sudXRpbHMuZ2V0RXJyb3IocHJvcE5hbWUsIGxvY2F0aW9uLCB0eXBlKTtcbiAgICAgIH0gZWxzZSBpZiAocHJvcEV4aXN0cykge1xuICAgICAgICByZXR1cm4gcHJvcENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIGxvY2F0aW9uLCBvYmopO1xuICAgICAgfVxuICAgIH1cbiAgICBzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uLnR5cGUgPSB0eXBlO1xuICAgIGFwaUNoZWNrLnV0aWxzLmNoZWNrZXJIZWxwZXJzLnNldHVwQ2hlY2tlcihzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uKTtcbiAgICByZXR1cm4gc2hhcGVSZXF1aXJlZElmTm90RGVmaW5pdGlvbjtcbiAgfVxuXG4gIG5nTW9kdWxlLmNvbnN0YW50KCdmb3JtbHlBcGlDaGVjaycsIGFwaUNoZWNrKTtcbiAgaWYgKE9OX1RFU1QpIHtcbiAgICByZXF1aXJlKCcuL2Zvcm1seUFwaUNoZWNrLnRlc3QnKShuZ01vZHVsZSk7XG4gIH1cblxuICBsZXQgZm9ybWx5RXhwcmVzc2lvbiA9IGFwaUNoZWNrLm9uZU9mVHlwZShbYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5mdW5jXSk7XG4gIGxldCBzcGVjaWZ5V3JhcHBlclR5cGUgPSBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgIGFwaUNoZWNrLm9uZU9mKFtudWxsXSksIGFwaUNoZWNrLnR5cGVPckFycmF5T2YoYXBpQ2hlY2suc3RyaW5nKVxuICBdKTtcblxuICBjb25zdCBhcGlDaGVja1Byb3BlcnR5ID0gYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2suZnVuYyk7XG5cbiAgY29uc3QgYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5ID0gYXBpQ2hlY2suc2hhcGUub25seUlmKCdhcGlDaGVjaycsIGFwaUNoZWNrLmZ1bmMud2l0aFByb3BlcnRpZXMoe1xuICAgIHdhcm46IGFwaUNoZWNrLmZ1bmMsXG4gICAgdGhyb3c6IGFwaUNoZWNrLmZ1bmMsXG4gICAgc2hhcGU6IGFwaUNoZWNrLmZ1bmNcbiAgfSkpO1xuXG4gIGNvbnN0IGFwaUNoZWNrRnVuY3Rpb25Qcm9wZXJ0eSA9IGFwaUNoZWNrLnNoYXBlLm9ubHlJZignYXBpQ2hlY2snLCBhcGlDaGVjay5vbmVPZihbJ3Rocm93JywgJ3dhcm4nXSkpO1xuXG4gIGNvbnN0IGZvcm1seVdyYXBwZXJUeXBlID0gYXBpQ2hlY2suc2hhcGUoe1xuICAgIG5hbWU6IHNoYXBlUmVxdWlyZWRJZk5vdCgndHlwZXMnLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIHRlbXBsYXRlOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgndGVtcGxhdGVVcmwnLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIHRlbXBsYXRlVXJsOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgndGVtcGxhdGUnLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIHR5cGVzOiBhcGlDaGVjay50eXBlT3JBcnJheU9mKGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgb3ZlcndyaXRlT2s6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgdmFsaWRhdGVPcHRpb25zOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICAgIGFwaUNoZWNrOiBhcGlDaGVja1Byb3BlcnR5Lm9wdGlvbmFsLFxuICAgIGFwaUNoZWNrSW5zdGFuY2U6IGFwaUNoZWNrSW5zdGFuY2VQcm9wZXJ0eS5vcHRpb25hbCxcbiAgICBhcGlDaGVja0Z1bmN0aW9uOiBhcGlDaGVja0Z1bmN0aW9uUHJvcGVydHkub3B0aW9uYWwsXG4gICAgYXBpQ2hlY2tPcHRpb25zOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWxcbiAgfSkuc3RyaWN0O1xuXG4gIGxldCBmaWVsZE9wdGlvbnNBcGlTaGFwZSA9IHtcbiAgICB0eXBlOiBhcGlDaGVjay5zaGFwZS5pZk5vdChbJ3RlbXBsYXRlJywgJ3RlbXBsYXRlVXJsJ10sIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgdGVtcGxhdGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KFsndHlwZScsICd0ZW1wbGF0ZVVybCddLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIHRlbXBsYXRlVXJsOiBhcGlDaGVjay5zaGFwZS5pZk5vdChbJ3R5cGUnLCAndGVtcGxhdGUnXSwgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICBrZXk6IGFwaUNoZWNrLm9uZU9mVHlwZShbYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5udW1iZXJdKSxcbiAgICBtb2RlbDogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICAgIGV4cHJlc3Npb25Qcm9wZXJ0aWVzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgICAgZm9ybWx5RXhwcmVzc2lvbixcbiAgICAgIGFwaUNoZWNrLnNoYXBlKHtcbiAgICAgICAgZXhwcmVzc2lvbjogZm9ybWx5RXhwcmVzc2lvbixcbiAgICAgICAgbWVzc2FnZTogZm9ybWx5RXhwcmVzc2lvbi5vcHRpb25hbFxuICAgICAgfSkuc3RyaWN0XG4gICAgXSkpLm9wdGlvbmFsLFxuICAgIGRhdGE6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgICB0ZW1wbGF0ZU9wdGlvbnM6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgICB3cmFwcGVyOiBzcGVjaWZ5V3JhcHBlclR5cGUub3B0aW9uYWwsXG4gICAgbW9kZWxPcHRpb25zOiBhcGlDaGVjay5zaGFwZSh7XG4gICAgICB1cGRhdGVPbjogYXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsLFxuICAgICAgZGVib3VuY2U6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICAgIGFwaUNoZWNrLm9iamVjdCwgYXBpQ2hlY2suc3RyaW5nXG4gICAgICBdKS5vcHRpb25hbCxcbiAgICAgIGFsbG93SW52YWxpZDogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgICAgIGdldHRlclNldHRlcjogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgICAgIHRpbWV6b25lOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWxcbiAgICB9KS5vcHRpb25hbCxcbiAgICB3YXRjaGVyOiBhcGlDaGVjay50eXBlT3JBcnJheU9mKFxuICAgICAgYXBpQ2hlY2suc2hhcGUoe1xuICAgICAgICBleHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLm9wdGlvbmFsLFxuICAgICAgICBsaXN0ZW5lcjogZm9ybWx5RXhwcmVzc2lvblxuICAgICAgfSlcbiAgICApLm9wdGlvbmFsLFxuICAgIHZhbGlkYXRvcnM6IGFwaUNoZWNrLm9iamVjdE9mKGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICBmb3JtbHlFeHByZXNzaW9uLCBhcGlDaGVjay5zaGFwZSh7XG4gICAgICAgIGV4cHJlc3Npb246IGZvcm1seUV4cHJlc3Npb24sXG4gICAgICAgIG1lc3NhZ2U6IGZvcm1seUV4cHJlc3Npb24ub3B0aW9uYWxcbiAgICAgIH0pLnN0cmljdFxuICAgIF0pKS5vcHRpb25hbCxcbiAgICBub0Zvcm1Db250cm9sOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsLFxuICAgIGhpZGU6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgbmdNb2RlbEF0dHJzOiBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5zaGFwZSh7XG4gICAgICBleHByZXNzaW9uOiBhcGlDaGVjay5zaGFwZS5pZk5vdChbJ3ZhbHVlJywgJ2F0dHJpYnV0ZScsICdib3VuZCddLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsLFxuICAgICAgdmFsdWU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCdleHByZXNzaW9uJywgYXBpQ2hlY2suYW55KS5vcHRpb25hbCxcbiAgICAgIGF0dHJpYnV0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ2V4cHJlc3Npb24nLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsLFxuICAgICAgYm91bmQ6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCdleHByZXNzaW9uJywgYXBpQ2hlY2suYW55KS5vcHRpb25hbFxuICAgIH0pLnN0cmljdCkub3B0aW9uYWwsXG4gICAgb3B0aW9uc1R5cGVzOiBhcGlDaGVjay50eXBlT3JBcnJheU9mKGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgbGluazogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICBjb250cm9sbGVyOiBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgICAgYXBpQ2hlY2suc3RyaW5nLCBhcGlDaGVjay5mdW5jLCBhcGlDaGVjay5hcnJheVxuICAgIF0pLm9wdGlvbmFsLFxuICAgIHZhbGlkYXRpb246IGFwaUNoZWNrLnNoYXBlKHtcbiAgICAgIHNob3c6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICAgIGFwaUNoZWNrLmJvb2wsIGFwaUNoZWNrLm9uZU9mKFtudWxsXSlcbiAgICAgIF0pLm9wdGlvbmFsLFxuICAgICAgbWVzc2FnZXM6IGFwaUNoZWNrLm9iamVjdE9mKGFwaUNoZWNrLmZ1bmMpLm9wdGlvbmFsLFxuICAgICAgZXJyb3JFeGlzdHNBbmRTaG91bGRCZVZpc2libGU6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWxcbiAgICB9KS5vcHRpb25hbCxcbiAgICBmb3JtQ29udHJvbDogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICAgIHZhbHVlOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICAgIHJ1bkV4cHJlc3Npb25zOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsXG4gIH07XG5cbiAgbGV0IGZvcm1seUZpZWxkT3B0aW9ucyA9IGFwaUNoZWNrLnNoYXBlKGZpZWxkT3B0aW9uc0FwaVNoYXBlKS5zdHJpY3Q7XG5cbiAgbGV0IHR5cGVPcHRpb25zRGVmYXVsdE9wdGlvbnMgPSBhbmd1bGFyLmNvcHkoZmllbGRPcHRpb25zQXBpU2hhcGUpO1xuICB0eXBlT3B0aW9uc0RlZmF1bHRPcHRpb25zLmtleSA9IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbDtcblxuICBsZXQgZm9ybWx5VHlwZU9wdGlvbnMgPSBhcGlDaGVjay5zaGFwZSh7XG4gICAgbmFtZTogYXBpQ2hlY2suc3RyaW5nLFxuICAgIHRlbXBsYXRlOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgndGVtcGxhdGVVcmwnLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIHRlbXBsYXRlVXJsOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgndGVtcGxhdGUnLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIGNvbnRyb2xsZXI6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICBhcGlDaGVjay5mdW5jLCBhcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmFycmF5XG4gICAgXSkub3B0aW9uYWwsXG4gICAgbGluazogYXBpQ2hlY2suZnVuYy5vcHRpb25hbCxcbiAgICBkZWZhdWx0T3B0aW9uczogYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICAgIGFwaUNoZWNrLmZ1bmMsIGFwaUNoZWNrLnNoYXBlKHR5cGVPcHRpb25zRGVmYXVsdE9wdGlvbnMpXG4gICAgXSkub3B0aW9uYWwsXG4gICAgZXh0ZW5kczogYXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsLFxuICAgIHdyYXBwZXI6IHNwZWNpZnlXcmFwcGVyVHlwZS5vcHRpb25hbCxcbiAgICBkYXRhOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gICAgdmFsaWRhdGVPcHRpb25zOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICAgIGFwaUNoZWNrOiBhcGlDaGVja1Byb3BlcnR5Lm9wdGlvbmFsLFxuICAgIGFwaUNoZWNrSW5zdGFuY2U6IGFwaUNoZWNrSW5zdGFuY2VQcm9wZXJ0eS5vcHRpb25hbCxcbiAgICBhcGlDaGVja0Z1bmN0aW9uOiBhcGlDaGVja0Z1bmN0aW9uUHJvcGVydHkub3B0aW9uYWwsXG4gICAgYXBpQ2hlY2tPcHRpb25zOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gICAgb3ZlcndyaXRlT2s6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWxcbiAgfSkuc3RyaWN0O1xuXG4gIGFuZ3VsYXIuZXh0ZW5kKGFwaUNoZWNrLCB7XG4gICAgZm9ybWx5VHlwZU9wdGlvbnMsIGZvcm1seUZpZWxkT3B0aW9ucywgZm9ybWx5RXhwcmVzc2lvbiwgZm9ybWx5V3JhcHBlclR5cGVcbiAgfSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seUFwaUNoZWNrLmpzXG4gKiovIiwidmFyIGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyLWZpeCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUucHJvdmlkZXIoJ2Zvcm1seVVzYWJpbGl0eScsIGZ1bmN0aW9uKGZvcm1seVZlcnNpb24sIGZvcm1seUFwaUNoZWNrKSB7XG4gICAgdmFyIGVycm9yc0FuZFdhcm5pbmdzVXJsUHJlZml4ID1cbiAgICAgIGBodHRwczovL2dpdGh1Yi5jb20vZm9ybWx5LWpzL2FuZ3VsYXItZm9ybWx5L2Jsb2IvJHtmb3JtbHlWZXJzaW9ufS9vdGhlci9FUlJPUlNfQU5EX1dBUk5JTkdTLm1kI2A7XG4gICAgYW5ndWxhci5leHRlbmQodGhpcywge1xuICAgICAgZ2V0Rm9ybWx5RXJyb3I6IGdldEZvcm1seUVycm9yLFxuICAgICAgZ2V0RmllbGRFcnJvcjogZ2V0RmllbGRFcnJvcixcbiAgICAgIGNoZWNrV3JhcHBlcjogY2hlY2tXcmFwcGVyLFxuICAgICAgY2hlY2tXcmFwcGVyVGVtcGxhdGU6IGNoZWNrV3JhcHBlclRlbXBsYXRlLFxuICAgICAgJGdldDogKCkgPT4gdGhpc1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0RmllbGRFcnJvcihlcnJvckluZm9TbHVnLCBtZXNzYWdlLCBmaWVsZCkge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICAgIGZpZWxkID0gbWVzc2FnZTtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9ySW5mb1NsdWc7XG4gICAgICAgIGVycm9ySW5mb1NsdWcgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkgKyBgIEZpZWxkIGRlZmluaXRpb246ICR7YW5ndWxhci50b0pzb24oZmllbGQpfWApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZvcm1seUVycm9yKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpIHtcbiAgICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICBtZXNzYWdlID0gZXJyb3JJbmZvU2x1ZztcbiAgICAgICAgZXJyb3JJbmZvU2x1ZyA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RXJyb3JNZXNzYWdlKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpIHtcbiAgICAgIGxldCB1cmwgPSAnJztcbiAgICAgIGlmIChlcnJvckluZm9TbHVnICE9PSBudWxsKSB7XG4gICAgICAgIHVybCA9IGAke2Vycm9yc0FuZFdhcm5pbmdzVXJsUHJlZml4fSR7ZXJyb3JJbmZvU2x1Z31gO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGBGb3JtbHkgRXJyb3I6ICR7bWVzc2FnZX0uICR7dXJsfWA7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyKHdyYXBwZXIpIHtcbiAgICAgIGZvcm1seUFwaUNoZWNrLnRocm93KGZvcm1seUFwaUNoZWNrLmZvcm1seVdyYXBwZXJUeXBlLCBhcmd1bWVudHMsIHtcbiAgICAgICAgcHJlZml4OiAnZm9ybWx5Q29uZmlnLnNldFdyYXBwZXInLFxuICAgICAgICB1cmxTdWZmaXg6ICdzZXR3cmFwcGVyLXZhbGlkYXRpb24tZmFpbGVkJ1xuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyVGVtcGxhdGUodGVtcGxhdGUsIGFkZGl0aW9uYWxJbmZvKSB7XG4gICAgICB2YXIgZm9ybWx5VHJhbnNjbHVkZSA9ICc8Zm9ybWx5LXRyYW5zY2x1ZGU+PC9mb3JtbHktdHJhbnNjbHVkZT4nO1xuICAgICAgaWYgKHRlbXBsYXRlLmluZGV4T2YoZm9ybWx5VHJhbnNjbHVkZSkgPT09IC0xKSB7XG4gICAgICAgIHRocm93IGdldEZvcm1seUVycm9yKFxuICAgICAgICAgIGBUZW1wbGF0ZSB3cmFwcGVyIHRlbXBsYXRlcyBtdXN0IHVzZSBcIiR7Zm9ybWx5VHJhbnNjbHVkZX1cIiBzb21ld2hlcmUgaW4gdGhlbS4gYCArXG4gICAgICAgICAgYFRoaXMgb25lIGRvZXMgbm90IGhhdmUgXCI8Zm9ybWx5LXRyYW5zY2x1ZGU+PC9mb3JtbHktdHJhbnNjbHVkZT5cIiBpbiBpdDogJHt0ZW1wbGF0ZX1gICsgJ1xcbicgK1xuICAgICAgICAgIGBBZGRpdGlvbmFsIGluZm9ybWF0aW9uOiAke0pTT04uc3RyaW5naWZ5KGFkZGl0aW9uYWxJbmZvKX1gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9wcm92aWRlcnMvZm9ybWx5VXNhYmlsaXR5LmpzXG4gKiovIiwiY29uc3QgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXItZml4Jyk7XG5jb25zdCB1dGlscyA9IHJlcXVpcmUoJy4uL290aGVyL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICBuZ01vZHVsZS5wcm92aWRlcignZm9ybWx5Q29uZmlnJywgZm9ybWx5Q29uZmlnKTtcblxuICBmb3JtbHlDb25maWcudGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZSgnLi9mb3JtbHlDb25maWcudGVzdCcpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5Q29uZmlnKGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLCBmb3JtbHlBcGlDaGVjaykge1xuXG4gICAgdmFyIHR5cGVNYXAgPSB7fTtcbiAgICB2YXIgdGVtcGxhdGVXcmFwcGVyc01hcCA9IHt9O1xuICAgIHZhciBkZWZhdWx0V3JhcHBlck5hbWUgPSAnZGVmYXVsdCc7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZ2V0RXJyb3IgPSBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5nZXRGb3JtbHlFcnJvcjtcblxuICAgIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsIHtcbiAgICAgIHNldFR5cGUsXG4gICAgICBnZXRUeXBlLFxuICAgICAgc2V0V3JhcHBlcixcbiAgICAgIGdldFdyYXBwZXIsXG4gICAgICBnZXRXcmFwcGVyQnlUeXBlLFxuICAgICAgcmVtb3ZlV3JhcHBlckJ5TmFtZSxcbiAgICAgIHJlbW92ZVdyYXBwZXJzRm9yVHlwZSxcbiAgICAgIGRpc2FibGVXYXJuaW5nczogZmFsc2UsXG4gICAgICBleHRyYXM6IHtcbiAgICAgICAgZGlzYWJsZU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yOiBmYWxzZSxcbiAgICAgICAgbmdNb2RlbEF0dHJzTWFuaXB1bGF0b3JQcmVmZXJCb3VuZDogZmFsc2VcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZU1hbmlwdWxhdG9yczoge1xuICAgICAgICBwcmVXcmFwcGVyOiBbXSxcbiAgICAgICAgcG9zdFdyYXBwZXI6IFtdXG4gICAgICB9LFxuICAgICAgJGdldDogKCkgPT4gdGhpc1xuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gc2V0VHlwZShvcHRpb25zKSB7XG4gICAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChvcHRpb25zLCBzZXRUeXBlKTtcbiAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICBjaGVja1R5cGUob3B0aW9ucyk7XG4gICAgICAgIGlmIChvcHRpb25zLmV4dGVuZHMpIHtcbiAgICAgICAgICBleHRlbmRUeXBlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICB0eXBlTWFwW29wdGlvbnMubmFtZV0gPSBvcHRpb25zO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZ2V0RXJyb3IoYFlvdSBtdXN0IHByb3ZpZGUgYW4gb2JqZWN0IG9yIGFycmF5IGZvciBzZXRUeXBlLiBZb3UgcHJvdmlkZWQ6ICR7SlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzKX1gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUob3B0aW9ucykge1xuICAgICAgZm9ybWx5QXBpQ2hlY2sudGhyb3coZm9ybWx5QXBpQ2hlY2suZm9ybWx5VHlwZU9wdGlvbnMsIGFyZ3VtZW50cywge1xuICAgICAgICBwcmVmaXg6ICdmb3JtbHlDb25maWcuc2V0VHlwZScsXG4gICAgICAgIHVybDogJ3NldHR5cGUtdmFsaWRhdGlvbi1mYWlsZWQnXG4gICAgICB9KTtcbiAgICAgIGlmICghb3B0aW9ucy5vdmVyd3JpdGVPaykge1xuICAgICAgICBjaGVja092ZXJ3cml0ZShvcHRpb25zLm5hbWUsIHR5cGVNYXAsIG9wdGlvbnMsICd0eXBlcycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5vdmVyd3JpdGVPayA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmRUeXBlT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICBjb25zdCBleHRlbmRzVHlwZSA9IGdldFR5cGUob3B0aW9ucy5leHRlbmRzLCB0cnVlLCBvcHRpb25zKTtcbiAgICAgIGV4dGVuZFR5cGVDb250cm9sbGVyRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgICAgZXh0ZW5kVHlwZUxpbmtGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgICBleHRlbmRUeXBlVmFsaWRhdGVPcHRpb25zRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgICAgZXh0ZW5kVHlwZURlZmF1bHRPcHRpb25zKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2Uob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZFR5cGVDb250cm9sbGVyRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICAgIGNvbnN0IGV4dGVuZHNDdHJsID0gZXh0ZW5kc1R5cGUuY29udHJvbGxlcjtcbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0N0cmwpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnNDdHJsID0gb3B0aW9ucy5jb250cm9sbGVyO1xuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnNDdHJsKSkge1xuICAgICAgICBvcHRpb25zLmNvbnRyb2xsZXIgPSBmdW5jdGlvbigkc2NvcGUsICRjb250cm9sbGVyKSB7XG4gICAgICAgICAgJGNvbnRyb2xsZXIoZXh0ZW5kc0N0cmwsIHskc2NvcGV9KTtcbiAgICAgICAgICAkY29udHJvbGxlcihvcHRpb25zQ3RybCwgeyRzY29wZX0pO1xuICAgICAgICB9O1xuICAgICAgICBvcHRpb25zLmNvbnRyb2xsZXIuJGluamVjdCA9IFsnJHNjb3BlJywgJyRjb250cm9sbGVyJ107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLmNvbnRyb2xsZXIgPSBleHRlbmRzQ3RybDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmRUeXBlTGlua0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgICBjb25zdCBleHRlbmRzRm4gPSBleHRlbmRzVHlwZS5saW5rO1xuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzRm4pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnNGbiA9IG9wdGlvbnMubGluaztcbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zRm4pKSB7XG4gICAgICAgIG9wdGlvbnMubGluayA9IGZ1bmN0aW9uKCkge1xuICAgICAgICAgIGV4dGVuZHNGbiguLi5hcmd1bWVudHMpO1xuICAgICAgICAgIG9wdGlvbnNGbiguLi5hcmd1bWVudHMpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5saW5rID0gZXh0ZW5kc0ZuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZFR5cGVWYWxpZGF0ZU9wdGlvbnNGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgICAgY29uc3QgZXh0ZW5kc0ZuID0gZXh0ZW5kc1R5cGUudmFsaWRhdGVPcHRpb25zO1xuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzRm4pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnNGbiA9IG9wdGlvbnMudmFsaWRhdGVPcHRpb25zO1xuICAgICAgY29uc3Qgb3JpZ2luYWxEZWZhdWx0T3B0aW9ucyA9IG9wdGlvbnMuZGVmYXVsdE9wdGlvbnM7XG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9uc0ZuKSkge1xuICAgICAgICBvcHRpb25zLnZhbGlkYXRlT3B0aW9ucyA9IGZ1bmN0aW9uKG9wdGlvbnMpIHtcbiAgICAgICAgICBvcHRpb25zRm4ob3B0aW9ucyk7XG4gICAgICAgICAgbGV0IG1lcmdlZE9wdGlvbnMgPSBhbmd1bGFyLmNvcHkob3B0aW9ucyk7XG4gICAgICAgICAgbGV0IGRlZmF1bHRPcHRpb25zID0gb3JpZ2luYWxEZWZhdWx0T3B0aW9ucztcbiAgICAgICAgICBpZiAoZGVmYXVsdE9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZGVmYXVsdE9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgIGRlZmF1bHRPcHRpb25zID0gZGVmYXVsdE9wdGlvbnMobWVyZ2VkT3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKG1lcmdlZE9wdGlvbnMsIGRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgZXh0ZW5kc0ZuKG1lcmdlZE9wdGlvbnMpO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy52YWxpZGF0ZU9wdGlvbnMgPSBleHRlbmRzRm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kVHlwZURlZmF1bHRPcHRpb25zKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgICBjb25zdCBleHRlbmRzRE8gPSBleHRlbmRzVHlwZS5kZWZhdWx0T3B0aW9ucztcbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0RPKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBvcHRpb25zRE8gPSBvcHRpb25zLmRlZmF1bHRPcHRpb25zO1xuICAgICAgY29uc3Qgb3B0aW9uc0RPSXNGbiA9IGFuZ3VsYXIuaXNGdW5jdGlvbihvcHRpb25zRE8pO1xuICAgICAgY29uc3QgZXh0ZW5kc0RPSXNGbiA9IGFuZ3VsYXIuaXNGdW5jdGlvbihleHRlbmRzRE8pO1xuICAgICAgaWYgKGV4dGVuZHNET0lzRm4pIHtcbiAgICAgICAgb3B0aW9ucy5kZWZhdWx0T3B0aW9ucyA9IGZ1bmN0aW9uIGRlZmF1bHRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgICBjb25zdCBleHRlbmRzRGVmYXVsdE9wdGlvbnMgPSBleHRlbmRzRE8ob3B0aW9ucyk7XG4gICAgICAgICAgY29uc3QgbWVyZ2VkRGVmYXVsdE9wdGlvbnMgPSB7fTtcbiAgICAgICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKG1lcmdlZERlZmF1bHRPcHRpb25zLCBvcHRpb25zLCBleHRlbmRzRGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIGxldCBleHRlbmRlck9wdGlvbnNEZWZhdWx0T3B0aW9ucyA9IG9wdGlvbnNETztcbiAgICAgICAgICBpZiAob3B0aW9uc0RPSXNGbikge1xuICAgICAgICAgICAgZXh0ZW5kZXJPcHRpb25zRGVmYXVsdE9wdGlvbnMgPSBleHRlbmRlck9wdGlvbnNEZWZhdWx0T3B0aW9ucyhtZXJnZWREZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UoZXh0ZW5kc0RlZmF1bHRPcHRpb25zLCBleHRlbmRlck9wdGlvbnNEZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgcmV0dXJuIGV4dGVuZHNEZWZhdWx0T3B0aW9ucztcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9uc0RPSXNGbikge1xuICAgICAgICBvcHRpb25zLmRlZmF1bHRPcHRpb25zID0gZnVuY3Rpb24gZGVmYXVsdE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICAgIGxldCBuZXdEZWZhdWx0T3B0aW9ucyA9IHt9O1xuICAgICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UobmV3RGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMsIGV4dGVuZHNETyk7XG4gICAgICAgICAgcmV0dXJuIG9wdGlvbnNETyhuZXdEZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VHlwZShuYW1lLCB0aHJvd0Vycm9yLCBlcnJvckNvbnRleHQpIHtcbiAgICAgIGlmICghbmFtZSkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgdmFyIHR5cGUgPSB0eXBlTWFwW25hbWVdO1xuICAgICAgaWYgKCF0eXBlICYmIHRocm93RXJyb3IgPT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgZ2V0RXJyb3IoXG4gICAgICAgICAgYFRoZXJlIGlzIG5vIHR5cGUgYnkgdGhlIG5hbWUgb2YgXCIke25hbWV9XCI6ICR7SlNPTi5zdHJpbmdpZnkoZXJyb3JDb250ZXh0KX1gXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRXcmFwcGVyKG9wdGlvbnMsIG5hbWUpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMubWFwKHdyYXBwZXJPcHRpb25zID0+IHNldFdyYXBwZXIod3JhcHBlck9wdGlvbnMpKTtcbiAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICBvcHRpb25zLnR5cGVzID0gZ2V0T3B0aW9uc1R5cGVzKG9wdGlvbnMpO1xuICAgICAgICBvcHRpb25zLm5hbWUgPSBnZXRPcHRpb25zTmFtZShvcHRpb25zLCBuYW1lKTtcbiAgICAgICAgY2hlY2tXcmFwcGVyQVBJKG9wdGlvbnMpO1xuICAgICAgICB0ZW1wbGF0ZVdyYXBwZXJzTWFwW29wdGlvbnMubmFtZV0gPSBvcHRpb25zO1xuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc1N0cmluZyhvcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gc2V0V3JhcHBlcih7XG4gICAgICAgICAgdGVtcGxhdGU6IG9wdGlvbnMsXG4gICAgICAgICAgbmFtZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRPcHRpb25zVHlwZXMob3B0aW9ucykge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcob3B0aW9ucy50eXBlcykpIHtcbiAgICAgICAgcmV0dXJuIFtvcHRpb25zLnR5cGVzXTtcbiAgICAgIH1cbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy50eXBlcykpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudHlwZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T3B0aW9uc05hbWUob3B0aW9ucywgbmFtZSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubmFtZSB8fCBuYW1lIHx8IG9wdGlvbnMudHlwZXMuam9pbignICcpIHx8IGRlZmF1bHRXcmFwcGVyTmFtZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dyYXBwZXJBUEkob3B0aW9ucykge1xuICAgICAgZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuY2hlY2tXcmFwcGVyKG9wdGlvbnMpO1xuICAgICAgaWYgKG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICAgICAgZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuY2hlY2tXcmFwcGVyVGVtcGxhdGUob3B0aW9ucy50ZW1wbGF0ZSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBpZiAoIW9wdGlvbnMub3ZlcndyaXRlT2spIHtcbiAgICAgICAgY2hlY2tPdmVyd3JpdGUob3B0aW9ucy5uYW1lLCB0ZW1wbGF0ZVdyYXBwZXJzTWFwLCBvcHRpb25zLCAndGVtcGxhdGVXcmFwcGVycycpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIG9wdGlvbnMub3ZlcndyaXRlT2s7XG4gICAgICB9XG4gICAgICBjaGVja1dyYXBwZXJUeXBlcyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dyYXBwZXJUeXBlcyhvcHRpb25zKSB7XG4gICAgICBsZXQgc2hvdWxkVGhyb3cgPSAhYW5ndWxhci5pc0FycmF5KG9wdGlvbnMudHlwZXMpIHx8ICFvcHRpb25zLnR5cGVzLmV2ZXJ5KGFuZ3VsYXIuaXNTdHJpbmcpO1xuICAgICAgaWYgKHNob3VsZFRocm93KSB7XG4gICAgICAgIHRocm93IGdldEVycm9yKGBBdHRlbXB0ZWQgdG8gY3JlYXRlIGEgdGVtcGxhdGUgd3JhcHBlciB3aXRoIHR5cGVzIHRoYXQgaXMgbm90IGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3NgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja092ZXJ3cml0ZShwcm9wZXJ0eSwgb2JqZWN0LCBuZXdWYWx1ZSwgb2JqZWN0TmFtZSkge1xuICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgd2FybihbXG4gICAgICAgICAgYEF0dGVtcHRpbmcgdG8gb3ZlcndyaXRlICR7cHJvcGVydHl9IG9uICR7b2JqZWN0TmFtZX0gd2hpY2ggaXMgY3VycmVudGx5YCxcbiAgICAgICAgICBgJHtKU09OLnN0cmluZ2lmeShvYmplY3RbcHJvcGVydHldKX0gd2l0aCAke0pTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKX1gLFxuICAgICAgICAgIGBUbyBzdXByZXNzIHRoaXMgd2FybmluZywgc3BlY2lmeSB0aGUgcHJvcGVydHkgXCJvdmVyd3JpdGVPazogdHJ1ZVwiYFxuICAgICAgICBdLmpvaW4oJyAnKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0V3JhcHBlcihuYW1lKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lIHx8IGRlZmF1bHRXcmFwcGVyTmFtZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0V3JhcHBlckJ5VHlwZSh0eXBlKSB7XG4gICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgICB2YXIgd3JhcHBlcnMgPSBbXTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gdGVtcGxhdGVXcmFwcGVyc01hcCkge1xuICAgICAgICBpZiAodGVtcGxhdGVXcmFwcGVyc01hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIGlmICh0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdLnR5cGVzICYmIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0udHlwZXMuaW5kZXhPZih0eXBlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHdyYXBwZXJzLnB1c2godGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd3JhcHBlcnM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlV3JhcHBlckJ5TmFtZShuYW1lKSB7XG4gICAgICB2YXIgd3JhcHBlciA9IHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV07XG4gICAgICBkZWxldGUgdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXTtcbiAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVdyYXBwZXJzRm9yVHlwZSh0eXBlKSB7XG4gICAgICB2YXIgd3JhcHBlcnMgPSBnZXRXcmFwcGVyQnlUeXBlKHR5cGUpO1xuICAgICAgaWYgKCF3cmFwcGVycykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNBcnJheSh3cmFwcGVycykpIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZVdyYXBwZXJCeU5hbWUod3JhcHBlcnMubmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3cmFwcGVycy5mb3JFYWNoKCh3cmFwcGVyKSA9PiByZW1vdmVXcmFwcGVyQnlOYW1lKHdyYXBwZXIubmFtZSkpO1xuICAgICAgICByZXR1cm4gd3JhcHBlcnM7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB3YXJuKCkge1xuICAgICAgaWYgKCFfdGhpcy5kaXNhYmxlV2FybmluZ3MpIHtcbiAgICAgICAgY29uc29sZS53YXJuKC4uLmFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cblxuXG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seUNvbmZpZy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICBuZ01vZHVsZS5jb25zdGFudCgnZm9ybWx5VmVyc2lvbicsIFZFUlNJT04pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9mb3JtbHlWZXJzaW9uLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLmNvbnN0YW50KFxuICAgICdmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4JyxcbiAgICBgaHR0cHM6Ly9naXRodWIuY29tL2Zvcm1seS1qcy9hbmd1bGFyLWZvcm1seS9ibG9iLyR7VkVSU0lPTn0vb3RoZXIvRVJST1JTX0FORF9XQVJOSU5HUy5tZCNgXG4gICk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUuZmFjdG9yeSgnZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzJywgZnVuY3Rpb24oKSB7XG5cbiAgICB2YXIgZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzID0ge1xuICAgICAgYWRkVGVtcGxhdGVPcHRpb25WYWx1ZU1lc3NhZ2UsXG4gICAgICBhZGRTdHJpbmdNZXNzYWdlLFxuICAgICAgbWVzc2FnZXM6IHt9XG4gICAgfTtcblxuICAgIHJldHVybiBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXM7XG5cbiAgICBmdW5jdGlvbiBhZGRUZW1wbGF0ZU9wdGlvblZhbHVlTWVzc2FnZShuYW1lLCBwcm9wLCBwcmVmaXgsIHN1ZmZpeCwgYWx0ZXJuYXRlKSB7XG4gICAgICBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMubWVzc2FnZXNbbmFtZV0gPSB0ZW1wbGF0ZU9wdGlvblZhbHVlKHByb3AsIHByZWZpeCwgc3VmZml4LCBhbHRlcm5hdGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZFN0cmluZ01lc3NhZ2UobmFtZSwgc3RyaW5nKSB7XG4gICAgICBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMubWVzc2FnZXNbbmFtZV0gPSAoKSA9PiBzdHJpbmc7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB0ZW1wbGF0ZU9wdGlvblZhbHVlKHByb3AsIHByZWZpeCwgc3VmZml4LCBhbHRlcm5hdGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBnZXRWYWxpZGF0aW9uTWVzc2FnZSh2aWV3VmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKSB7XG4gICAgICAgIGlmIChzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9uc1twcm9wXSkge1xuICAgICAgICAgIHJldHVybiBgJHtwcmVmaXh9ICR7c2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbcHJvcF19ICR7c3VmZml4fWA7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGFsdGVybmF0ZTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9mb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKCdmb3JtbHlDdXN0b21WYWxpZGF0aW9uJywgZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbik7XG5cbiAgZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbi50ZXN0cyA9IE9OX1RFU1QgPyByZXF1aXJlKCcuL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi50ZXN0JykobmdNb2R1bGUpIDogbnVsbDtcblxuICBmdW5jdGlvbiBmb3JtbHlDdXN0b21WYWxpZGF0aW9uKGZvcm1seVV0aWwsICRxKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWwsIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIHZhciB2YWxpZGF0b3JzID0gc2NvcGUuJGV2YWwoYXR0cnMuZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbik7XG4gICAgICAgIGlmICghdmFsaWRhdG9ycykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjaGVja1ZhbGlkYXRvcnModmFsaWRhdG9ycyk7XG4gICAgICAgIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlcyA9IHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlcyB8fCB7fTtcblxuXG4gICAgICAgIHZhciB1c2VOZXdWYWxpZGF0b3JzQXBpID0gY3RybC5oYXNPd25Qcm9wZXJ0eSgnJHZhbGlkYXRvcnMnKSAmJiAhYXR0cnMuaGFzT3duUHJvcGVydHkoJ3VzZVBhcnNlcnMnKTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvcnMsIGZ1bmN0aW9uKHZhbGlkYXRvciwgbmFtZSkge1xuICAgICAgICAgIHZhciBtZXNzYWdlID0gdmFsaWRhdG9yLm1lc3NhZ2U7XG4gICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlc1tuYW1lXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgbWVzc2FnZSwgY3RybC4kbW9kZWxWYWx1ZSwgY3RybC4kdmlld1ZhbHVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbGlkYXRvciA9IGFuZ3VsYXIuaXNPYmplY3QodmFsaWRhdG9yKSA/IHZhbGlkYXRvci5leHByZXNzaW9uIDogdmFsaWRhdG9yO1xuICAgICAgICAgIHZhciBpc1Bvc3NpYmx5QXN5bmMgPSAhYW5ndWxhci5pc1N0cmluZyh2YWxpZGF0b3IpO1xuICAgICAgICAgIGlmICh1c2VOZXdWYWxpZGF0b3JzQXBpKSB7XG4gICAgICAgICAgICBzZXR1cFdpdGhWYWxpZGF0b3JzKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldHVwV2l0aFBhcnNlcnMoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBzZXR1cFdpdGhWYWxpZGF0b3JzKCkge1xuICAgICAgICAgICAgdmFyIHZhbGlkYXRvckNvbGxlY3Rpb24gPSBpc1Bvc3NpYmx5QXN5bmMgPyAnJGFzeW5jVmFsaWRhdG9ycycgOiAnJHZhbGlkYXRvcnMnO1xuICAgICAgICAgICAgY3RybFt2YWxpZGF0b3JDb2xsZWN0aW9uXVtuYW1lXSA9IGZ1bmN0aW9uKG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIHZhbGlkYXRvciwgbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKGlzUG9zc2libHlBc3luYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc1Byb21pc2VMaWtlKHZhbHVlKSA/IHZhbHVlIDogdmFsdWUgPyAkcS53aGVuKHZhbHVlKSA6ICRxLnJlamVjdCh2YWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIHNldHVwV2l0aFBhcnNlcnMoKSB7XG4gICAgICAgICAgICBsZXQgaW5GbGlnaHRWYWxpZGF0b3I7XG4gICAgICAgICAgICBjdHJsLiRwYXJzZXJzLnVuc2hpZnQoZnVuY3Rpb24odmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCB2YWxpZGF0b3IsIGN0cmwuJG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChpc1Byb21pc2VMaWtlKGlzVmFsaWQpKSB7XG4gICAgICAgICAgICAgICAgY3RybC4kcGVuZGluZyA9IGN0cmwuJHBlbmRpbmcgfHwge307XG4gICAgICAgICAgICAgICAgY3RybC4kcGVuZGluZ1tuYW1lXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaW5GbGlnaHRWYWxpZGF0b3IgPSBpc1ZhbGlkO1xuICAgICAgICAgICAgICAgIGlzVmFsaWQudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoaW5GbGlnaHRWYWxpZGF0b3IgPT09IGlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkobmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGluRmxpZ2h0VmFsaWRhdG9yID09PSBpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KG5hbWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhjdHJsLiRwZW5kaW5nKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGN0cmwuJHBlbmRpbmc7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY3RybC4kcGVuZGluZ1tuYW1lXTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShuYW1lLCBpc1ZhbGlkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdmlld1ZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaXNQcm9taXNlTGlrZShvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgYW5ndWxhci5pc0Z1bmN0aW9uKG9iai50aGVuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1ZhbGlkYXRvcnModmFsaWRhdG9ycykge1xuICAgICAgdmFyIGFsbG93ZWRQcm9wZXJ0aWVzID0gWydleHByZXNzaW9uJywgJ21lc3NhZ2UnXTtcbiAgICAgIHZhciB2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMgPSB7fTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3JzLCAodmFsaWRhdG9yLCBuYW1lKSA9PiB7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHZhbGlkYXRvcikpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV4dHJhUHJvcHMgPSBbXTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvciwgKHYsIGtleSkgPT4ge1xuICAgICAgICAgIGlmIChhbGxvd2VkUHJvcGVydGllcy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICBleHRyYVByb3BzLnB1c2goa2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZXh0cmFQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICB2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHNbbmFtZV0gPSBleHRyYVByb3BzO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChPYmplY3Qua2V5cyh2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMpLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoW1xuICAgICAgICAgIGBWYWxpZGF0b3JzIGFyZSBvbmx5IGFsbG93ZWQgdG8gYmUgZnVuY3Rpb25zIG9yIG9iamVjdHMgdGhhdCBoYXZlICR7YWxsb3dlZFByb3BlcnRpZXMuam9pbignLCAnKX0uYCxcbiAgICAgICAgICBgWW91IHByb3ZpZGVkIHNvbWUgZXh0cmEgcHJvcGVydGllczogJHtKU09OLnN0cmluZ2lmeSh2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMpfWBcbiAgICAgICAgXS5qb2luKCcgJykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLmpzXG4gKiovIiwibGV0IGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyLWZpeCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKCdmb3JtbHlGaWVsZCcsIGZvcm1seUZpZWxkKTtcblxuICBmb3JtbHlGaWVsZC50ZXN0cyA9IE9OX1RFU1QgPyByZXF1aXJlKCcuL2Zvcm1seS1maWVsZC50ZXN0JykobmdNb2R1bGUpIDogbnVsbDtcblxuICAvKipcbiAgICogQG5nZG9jIGRpcmVjdGl2ZVxuICAgKiBAbmFtZSBmb3JtbHlGaWVsZFxuICAgKiBAcmVzdHJpY3QgQUVcbiAgICovXG4gIGZ1bmN0aW9uIGZvcm1seUZpZWxkKCRodHRwLCAkcSwgJGNvbXBpbGUsICR0ZW1wbGF0ZUNhY2hlLCBmb3JtbHlDb25maWcsIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcywgZm9ybWx5QXBpQ2hlY2ssXG4gICAgICAgICAgICAgICAgICAgICAgIGZvcm1seVV0aWwsIGZvcm1seVVzYWJpbGl0eSwgZm9ybWx5V2Fybikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICBzY29wZToge1xuICAgICAgICBvcHRpb25zOiAnPScsXG4gICAgICAgIG1vZGVsOiAnPScsXG4gICAgICAgIGZvcm1JZDogJ0AnLFxuICAgICAgICBpbmRleDogJz0/JyxcbiAgICAgICAgZmllbGRzOiAnPT8nLFxuICAgICAgICBmb3JtU3RhdGU6ICc9PycsXG4gICAgICAgIGZvcm06ICc9PydcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbiBmaWVsZENvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJHBhcnNlLCAkY29udHJvbGxlcikge1xuICAgICAgICB2YXIgb3B0cyA9ICRzY29wZS5vcHRpb25zO1xuICAgICAgICB2YXIgZmllbGRUeXBlID0gb3B0cy50eXBlICYmIGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdHMudHlwZSk7XG4gICAgICAgIHNpbXBsaWZ5TGlmZShvcHRzKTtcbiAgICAgICAgbWVyZ2VGaWVsZE9wdGlvbnNXaXRoVHlwZURlZmF1bHRzKG9wdHMsIGZpZWxkVHlwZSk7XG4gICAgICAgIGV4dGVuZE9wdGlvbnNXaXRoRGVmYXVsdHMob3B0cywgJHNjb3BlLmluZGV4KTtcbiAgICAgICAgY2hlY2tBcGkob3B0cyk7XG4gICAgICAgIC8vIHNldCBmaWVsZCBpZCB0byBsaW5rIGxhYmVscyBhbmQgZmllbGRzXG4gICAgICAgICRzY29wZS5pZCA9IGZvcm1seVV0aWwuZ2V0RmllbGRJZCgkc2NvcGUuZm9ybUlkLCBvcHRzLCAkc2NvcGUuaW5kZXgpO1xuXG4gICAgICAgIC8vIGluaXRhbGl6YXRpb25cbiAgICAgICAgcnVuRXhwcmVzc2lvbnMoKTtcbiAgICAgICAgc2V0Rm9ybUNvbnRyb2woJHNjb3BlLCBvcHRzKTtcbiAgICAgICAgYWRkTW9kZWxXYXRjaGVyKCRzY29wZSwgb3B0cyk7XG4gICAgICAgIGFkZFZhbGlkYXRpb25NZXNzYWdlcyhvcHRzKTtcbiAgICAgICAgLy8gc2ltcGxpZnkgdGhpbmdzXG4gICAgICAgIC8vIGNyZWF0ZSAkc2NvcGUudG8gc28gdGVtcGxhdGUgYXV0aG9ycyBjYW4gcmVmZXJlbmNlIHRvIGluc3RlYWQgb2YgJHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zXG4gICAgICAgICRzY29wZS50byA9ICRzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9ucztcbiAgICAgICAgaW52b2tlQ29udHJvbGxlcnMoJHNjb3BlLCBvcHRzLCBmaWVsZFR5cGUpO1xuXG4gICAgICAgIC8vIGZ1bmN0aW9uIGRlZmluaXRpb25zXG4gICAgICAgIGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb25zKCkge1xuICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uKCkgeyAvLyBtdXN0IHJ1biBvbiBuZXh0IHRpY2sgdG8gbWFrZSBzdXJlIHRoYXQgdGhlIGN1cnJlbnQgdmFsdWUgaXMgY29ycmVjdC5cbiAgICAgICAgICAgIHZhciBmaWVsZCA9ICRzY29wZS5vcHRpb25zO1xuICAgICAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IHZhbHVlR2V0dGVyU2V0dGVyKCk7XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2goZmllbGQuZXhwcmVzc2lvblByb3BlcnRpZXMsIGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb24oZXhwcmVzc2lvbiwgcHJvcCkge1xuICAgICAgICAgICAgICB2YXIgc2V0dGVyID0gJHBhcnNlKHByb3ApLmFzc2lnbjtcbiAgICAgICAgICAgICAgdmFyIHByb21pc2UgPSAkcS53aGVuKGZvcm1seVV0aWwuZm9ybWx5RXZhbCgkc2NvcGUsIGV4cHJlc3Npb24sIGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICAgICAgICBwcm9taXNlLnRoZW4oZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzZXR0ZXIoZmllbGQsIHZhbHVlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHZhbHVlR2V0dGVyU2V0dGVyKG5ld1ZhbCkge1xuICAgICAgICAgIGlmICghJHNjb3BlLm1vZGVsIHx8ICEkc2NvcGUub3B0aW9ucy5rZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG5ld1ZhbCkpIHtcbiAgICAgICAgICAgICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldID0gbmV3VmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV07XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzaW1wbGlmeUxpZmUob3B0aW9ucykge1xuICAgICAgICAgIC8vIGFkZCBhIGZldyBlbXB0eSBvYmplY3RzIChpZiB0aGV5IGRvbid0IGFscmVhZHkgZXhpc3QpIHNvIHlvdSBkb24ndCBoYXZlIHRvIHVuZGVmaW5lZCBjaGVjayBldmVyeXdoZXJlXG4gICAgICAgICAgZm9ybWx5VXRpbC5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIHtcbiAgICAgICAgICAgIGRhdGE6IHt9LFxuICAgICAgICAgICAgdGVtcGxhdGVPcHRpb25zOiB7fSxcbiAgICAgICAgICAgIHZhbGlkYXRpb246IHt9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtZXJnZUZpZWxkT3B0aW9uc1dpdGhUeXBlRGVmYXVsdHMob3B0aW9ucywgdHlwZSkge1xuICAgICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICBtZXJnZU9wdGlvbnMob3B0aW9ucywgdHlwZS5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBwcm9wZXJPcmRlciA9IGFycmF5aWZ5KG9wdGlvbnMub3B0aW9uc1R5cGVzKS5yZXZlcnNlKCk7IC8vIHNvIHRoZSByaWdodCB0aGluZ3MgYXJlIG92ZXJyaWRkZW5cbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2gocHJvcGVyT3JkZXIsIHR5cGVOYW1lID0+IHtcbiAgICAgICAgICAgIG1lcmdlT3B0aW9ucyhvcHRpb25zLCBmb3JtbHlDb25maWcuZ2V0VHlwZSh0eXBlTmFtZSwgdHJ1ZSwgb3B0aW9ucykuZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbWVyZ2VPcHRpb25zKG9wdGlvbnMsIGV4dHJhT3B0aW9ucykge1xuICAgICAgICAgIGlmIChleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZXh0cmFPcHRpb25zKSkge1xuICAgICAgICAgICAgICBleHRyYU9wdGlvbnMgPSBleHRyYU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBmb3JtbHlVdGlsLnJldmVyc2VEZWVwTWVyZ2Uob3B0aW9ucywgZXh0cmFPcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBleHRlbmRPcHRpb25zV2l0aERlZmF1bHRzKG9wdGlvbnMsIGluZGV4KSB7XG4gICAgICAgICAgYW5ndWxhci5leHRlbmQob3B0aW9ucywge1xuICAgICAgICAgICAgLy8gYXR0YWNoIHRoZSBrZXkgaW4gY2FzZSB0aGUgZm9ybWx5LWZpZWxkIGRpcmVjdGl2ZSBpcyB1c2VkIGRpcmVjdGx5XG4gICAgICAgICAgICBrZXk6IG9wdGlvbnMua2V5IHx8IGluZGV4IHx8IDAsXG4gICAgICAgICAgICB2YWx1ZTogdmFsdWVHZXR0ZXJTZXR0ZXIsXG4gICAgICAgICAgICBydW5FeHByZXNzaW9uczogcnVuRXhwcmVzc2lvbnNcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIGluaXRpYWxpemF0aW9uIGZ1bmN0aW9uc1xuICAgICAgICBmdW5jdGlvbiBzZXRGb3JtQ29udHJvbChzY29wZSwgb3B0aW9ucykge1xuICAgICAgICAgIGlmIChvcHRpb25zLm5vRm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKCdmb3JtW1wiJyArIHNjb3BlLmlkICsgJ1wiXScsIGZ1bmN0aW9uKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICBpZiAoZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgc2NvcGUuZmMgPSBmb3JtQ29udHJvbDsgLy8gc2hvcnRjdXQgZm9yIHRlbXBsYXRlIGF1dGhvcnNcbiAgICAgICAgICAgICAgc2NvcGUub3B0aW9ucy5mb3JtQ29udHJvbCA9IGZvcm1Db250cm9sO1xuICAgICAgICAgICAgICBhZGRTaG93TWVzc2FnZXNXYXRjaGVyKHNjb3BlLCBvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZE1vZGVsV2F0Y2hlcihzY29wZSwgb3B0aW9ucykge1xuICAgICAgICAgIGlmIChvcHRpb25zLm1vZGVsKSB7XG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goJ29wdGlvbnMubW9kZWwnLCBydW5FeHByZXNzaW9ucywgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkU2hvd01lc3NhZ2VzV2F0Y2hlcihzY29wZSwgb3B0aW9ucykge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgIGlmICh0eXBlb2Ygc2NvcGUub3B0aW9ucy52YWxpZGF0aW9uLnNob3cgPT09ICdib29sZWFuJykge1xuICAgICAgICAgICAgICByZXR1cm4gc2NvcGUuZmMuJGludmFsaWQgJiYgc2NvcGUub3B0aW9ucy52YWxpZGF0aW9uLnNob3c7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gc2NvcGUuZmMuJGludmFsaWQgJiYgc2NvcGUuZmMuJHRvdWNoZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24oc2hvdykge1xuICAgICAgICAgICAgb3B0aW9ucy52YWxpZGF0aW9uLmVycm9yRXhpc3RzQW5kU2hvdWxkQmVWaXNpYmxlID0gc2hvdztcbiAgICAgICAgICAgIHNjb3BlLnNob3dFcnJvciA9IHNob3c7IC8vIHNob3J0Y3V0IGZvciB0ZW1wbGF0ZSBhdXRob3JzXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRWYWxpZGF0aW9uTWVzc2FnZXMob3B0aW9ucykge1xuICAgICAgICAgIG9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlcyA9IG9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlcyB8fCB7fTtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLm1lc3NhZ2VzLCBmdW5jdGlvbiAoZXhwcmVzc2lvbiwgbmFtZSkge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0pIHtcbiAgICAgICAgICAgICAgb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzW25hbWVdID0gZnVuY3Rpb24gKHZpZXdWYWx1ZSwgbW9kZWxWYWx1ZSwgc2NvcGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCBleHByZXNzaW9uLCBtb2RlbFZhbHVlLCB2aWV3VmFsdWUpO1xuICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gaW52b2tlQ29udHJvbGxlcnMoc2NvcGUsIG9wdGlvbnMgPSB7fSwgdHlwZSA9IHt9KSB7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKFt0eXBlLmNvbnRyb2xsZXIsIG9wdGlvbnMuY29udHJvbGxlcl0sIGNvbnRyb2xsZXIgPT4ge1xuICAgICAgICAgICAgaWYgKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgJGNvbnRyb2xsZXIoY29udHJvbGxlciwgeyRzY29wZTogc2NvcGV9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uIGZpZWxkTGluayhzY29wZSwgZWwpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBzY29wZS5vcHRpb25zLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUoc2NvcGUub3B0aW9ucy50eXBlKTtcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIHZhciB0aHVzbHkgPSB0aGlzO1xuICAgICAgICBnZXRGaWVsZFRlbXBsYXRlKHNjb3BlLm9wdGlvbnMpXG4gICAgICAgICAgLnRoZW4ocnVuTWFuaXB1bGF0b3JzKGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wcmVXcmFwcGVyKSlcbiAgICAgICAgICAudGhlbih0cmFuc2NsdWRlSW5XcmFwcGVycyhzY29wZS5vcHRpb25zKSlcbiAgICAgICAgICAudGhlbihydW5NYW5pcHVsYXRvcnMoZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnBvc3RXcmFwcGVyKSlcbiAgICAgICAgICAudGhlbihzZXRFbGVtZW50VGVtcGxhdGUpXG4gICAgICAgICAgLmNhdGNoKGVycm9yID0+IHtcbiAgICAgICAgICAgIGZvcm1seVdhcm4oXG4gICAgICAgICAgICAgICd0aGVyZS13YXMtYS1wcm9ibGVtLXNldHRpbmctdGhlLXRlbXBsYXRlLWZvci10aGlzLWZpZWxkJyxcbiAgICAgICAgICAgICAgJ1RoZXJlIHdhcyBhIHByb2JsZW0gc2V0dGluZyB0aGUgdGVtcGxhdGUgZm9yIHRoaXMgZmllbGQgJyxcbiAgICAgICAgICAgICAgc2NvcGUub3B0aW9ucyxcbiAgICAgICAgICAgICAgZXJyb3JcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0RWxlbWVudFRlbXBsYXRlKHRlbXBsYXRlRWwpIHtcbiAgICAgICAgICBlbC5odG1sKGFzSHRtbCh0ZW1wbGF0ZUVsKSk7XG4gICAgICAgICAgJGNvbXBpbGUoZWwuY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgIGlmICh0eXBlICYmIHR5cGUubGluaykge1xuICAgICAgICAgICAgdHlwZS5saW5rLmFwcGx5KHRodXNseSwgYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzY29wZS5vcHRpb25zLmxpbmspIHtcbiAgICAgICAgICAgIHNjb3BlLm9wdGlvbnMubGluay5hcHBseSh0aHVzbHksIGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJ1bk1hbmlwdWxhdG9ycyhtYW5pcHVsYXRvcnMpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gcnVuTWFuaXB1bGF0b3JzT25UZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgdmFyIGNoYWluID0gJHEud2hlbih0ZW1wbGF0ZSk7XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2gobWFuaXB1bGF0b3JzLCBtYW5pcHVsYXRvciA9PiB7XG4gICAgICAgICAgICAgIGNoYWluID0gY2hhaW4udGhlbih0ZW1wbGF0ZSA9PiB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4obWFuaXB1bGF0b3IodGVtcGxhdGUsIHNjb3BlLm9wdGlvbnMsIHNjb3BlKSkudGhlbihuZXdUZW1wbGF0ZSA9PiB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc1N0cmluZyhuZXdUZW1wbGF0ZSkgPyBuZXdUZW1wbGF0ZSA6IGFzSHRtbChuZXdUZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhc0h0bWwoZWwpIHtcbiAgICAgIHZhciB3cmFwcGVyID0gYW5ndWxhci5lbGVtZW50KCc8YT48L2E+Jyk7XG4gICAgICByZXR1cm4gd3JhcHBlci5hcHBlbmQoZWwpLmh0bWwoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZFRlbXBsYXRlKG9wdGlvbnMpIHtcbiAgICAgIGxldCB0eXBlID0gZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0aW9ucy50eXBlLCB0cnVlLCBvcHRpb25zKTtcbiAgICAgIGxldCB0ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGUgfHwgdHlwZSAmJiB0eXBlLnRlbXBsYXRlO1xuICAgICAgbGV0IHRlbXBsYXRlVXJsID0gb3B0aW9ucy50ZW1wbGF0ZVVybCB8fCB0eXBlICYmIHR5cGUudGVtcGxhdGVVcmw7XG4gICAgICBpZiAoIXRlbXBsYXRlICYmICF0ZW1wbGF0ZVVybCkge1xuICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0RmllbGRFcnJvcihcbiAgICAgICAgICAndHlwZS10eXBlLWhhcy1uby10ZW1wbGF0ZScsXG4gICAgICAgICAgYFR5cGUgJyR7b3B0aW9ucy50eXBlfScgaGFzIG5vdCB0ZW1wbGF0ZS4gT24gZWxlbWVudDpgLCBvcHRpb25zXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0VGVtcGxhdGUodGVtcGxhdGUgfHwgdGVtcGxhdGVVcmwsICF0ZW1wbGF0ZSk7XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiBnZXRUZW1wbGF0ZSh0ZW1wbGF0ZSwgaXNVcmwpIHtcbiAgICAgIGlmICghaXNVcmwpIHtcbiAgICAgICAgcmV0dXJuICRxLndoZW4odGVtcGxhdGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGh0dHBPcHRpb25zID0ge2NhY2hlOiAkdGVtcGxhdGVDYWNoZX07XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQodGVtcGxhdGUsIGh0dHBPcHRpb25zKS50aGVuKGZ1bmN0aW9uKHJlc3BvbnNlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3BvbnNlLmRhdGE7XG4gICAgICAgIH0pLmNhdGNoKGZ1bmN0aW9uKGVycm9yKSB7XG4gICAgICAgICAgZm9ybWx5V2FybihcbiAgICAgICAgICAgICdwcm9ibGVtLWxvYWRpbmctdGVtcGxhdGUtZm9yLXRlbXBsYXRldXJsJyxcbiAgICAgICAgICAgICdQcm9ibGVtIGxvYWRpbmcgdGVtcGxhdGUgZm9yICcgKyB0ZW1wbGF0ZSxcbiAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdHJhbnNjbHVkZUluV3JhcHBlcnMob3B0aW9ucykge1xuICAgICAgbGV0IHdyYXBwZXIgPSBnZXRXcmFwcGVyT3B0aW9uKG9wdGlvbnMpO1xuXG4gICAgICByZXR1cm4gZnVuY3Rpb24gdHJhbnNjbHVkZVRlbXBsYXRlKHRlbXBsYXRlKSB7XG4gICAgICAgIGlmICghd3JhcHBlci5sZW5ndGgpIHtcbiAgICAgICAgICByZXR1cm4gJHEud2hlbih0ZW1wbGF0ZSk7XG4gICAgICAgIH1cblxuICAgICAgICB3cmFwcGVyLmZvckVhY2goKHdyYXBwZXIpID0+IHtcbiAgICAgICAgICBmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyKHdyYXBwZXIsIG9wdGlvbnMpO1xuICAgICAgICAgIHdyYXBwZXIudmFsaWRhdGVPcHRpb25zICYmIHdyYXBwZXIudmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgIHJ1bkFwaUNoZWNrKHdyYXBwZXIsIG9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgICAgbGV0IHByb21pc2VzID0gd3JhcHBlci5tYXAodyA9PiBnZXRUZW1wbGF0ZSh3LnRlbXBsYXRlIHx8IHcudGVtcGxhdGVVcmwsICF3LnRlbXBsYXRlKSk7XG4gICAgICAgIHJldHVybiAkcS5hbGwocHJvbWlzZXMpLnRoZW4od3JhcHBlcnNUZW1wbGF0ZXMgPT4ge1xuICAgICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLmZvckVhY2goKHdyYXBwZXJUZW1wbGF0ZSwgaW5kZXgpID0+IHtcbiAgICAgICAgICAgIGZvcm1seVVzYWJpbGl0eS5jaGVja1dyYXBwZXJUZW1wbGF0ZSh3cmFwcGVyVGVtcGxhdGUsIHdyYXBwZXJbaW5kZXhdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB3cmFwcGVyc1RlbXBsYXRlcy5yZXZlcnNlKCk7IC8vIHdyYXBwZXIgMCBpcyB3cmFwcGVkIGluIHdyYXBwZXIgMSBhbmQgc28gb24uLi5cbiAgICAgICAgICBsZXQgdG90YWxXcmFwcGVyID0gd3JhcHBlcnNUZW1wbGF0ZXMuc2hpZnQoKTtcbiAgICAgICAgICB3cmFwcGVyc1RlbXBsYXRlcy5mb3JFYWNoKHdyYXBwZXJUZW1wbGF0ZSA9PiB7XG4gICAgICAgICAgICB0b3RhbFdyYXBwZXIgPSBkb1RyYW5zY2x1c2lvbih0b3RhbFdyYXBwZXIsIHdyYXBwZXJUZW1wbGF0ZSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgcmV0dXJuIGRvVHJhbnNjbHVzaW9uKHRvdGFsV3JhcHBlciwgdGVtcGxhdGUpO1xuICAgICAgICB9KTtcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZG9UcmFuc2NsdXNpb24od3JhcHBlciwgdGVtcGxhdGUpIHtcbiAgICAgIGxldCBzdXBlcldyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoJzxhPjwvYT4nKTsgLy8gdGhpcyBhbGxvd3MgcGVvcGxlIG5vdCBoYXZlIHRvIGhhdmUgYSBzaW5nbGUgcm9vdCBpbiB3cmFwcGVyc1xuICAgICAgc3VwZXJXcmFwcGVyLmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgIGxldCB0cmFuc2NsdWRlRWwgPSBzdXBlcldyYXBwZXIuZmluZCgnZm9ybWx5LXRyYW5zY2x1ZGUnKTtcbiAgICAgIGlmICghdHJhbnNjbHVkZUVsLmxlbmd0aCkge1xuICAgICAgICAvL3RyeSBpdCB1c2luZyBvdXIgY3VzdG9tIGZpbmQgZnVuY3Rpb25cbiAgICAgICAgdHJhbnNjbHVkZUVsID0gZm9ybWx5VXRpbC5maW5kQnlOb2RlTmFtZShzdXBlcldyYXBwZXIsICdmb3JtbHktdHJhbnNjbHVkZScpO1xuICAgICAgfVxuICAgICAgdHJhbnNjbHVkZUVsLnJlcGxhY2VXaXRoKHRlbXBsYXRlKTtcbiAgICAgIHJldHVybiBzdXBlcldyYXBwZXIuaHRtbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdyYXBwZXJPcHRpb24ob3B0aW9ucykge1xuICAgICAgbGV0IHdyYXBwZXIgPSBvcHRpb25zLndyYXBwZXI7XG4gICAgICAvLyBleHBsaWNpdCBudWxsIG1lYW5zIG5vIHdyYXBwZXJcbiAgICAgIGlmICh3cmFwcGVyID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cblxuICAgICAgLy8gbm90aGluZyBzcGVjaWZpZWQgbWVhbnMgdXNlIHRoZSBkZWZhdWx0IHdyYXBwZXIgZm9yIHRoZSB0eXBlXG4gICAgICBpZiAoIXdyYXBwZXIpIHtcbiAgICAgICAgLy8gZ2V0IGFsbCB3cmFwcGVycyB0aGF0IHNwZWNpZnkgdGhleSBhcHBseSB0byB0aGlzIHR5cGVcbiAgICAgICAgd3JhcHBlciA9IGFycmF5aWZ5KGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyQnlUeXBlKG9wdGlvbnMudHlwZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3JhcHBlciA9IGFycmF5aWZ5KHdyYXBwZXIpLm1hcChmb3JtbHlDb25maWcuZ2V0V3JhcHBlcik7XG4gICAgICB9XG5cbiAgICAgIC8vIGdldCBhbGwgd3JhcHBlcnMgZm9yIHRoYXQgdGhpcyB0eXBlIHNwZWNpZmllZCB0aGF0IGl0IHVzZXMuXG4gICAgICB2YXIgdHlwZSA9IGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSwgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgICBpZiAodHlwZSAmJiB0eXBlLndyYXBwZXIpIHtcbiAgICAgICAgbGV0IHR5cGVXcmFwcGVycyA9IGFycmF5aWZ5KHR5cGUud3JhcHBlcikubWFwKGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKTtcbiAgICAgICAgd3JhcHBlciA9IHdyYXBwZXIuY29uY2F0KHR5cGVXcmFwcGVycyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFkZCB0aGUgZGVmYXVsdCB3cmFwcGVyIGxhc3RcbiAgICAgIHZhciBkZWZhdWx0V3JhcHBlciA9IGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKCk7XG4gICAgICBpZiAoZGVmYXVsdFdyYXBwZXIpIHtcbiAgICAgICAgd3JhcHBlci5wdXNoKGRlZmF1bHRXcmFwcGVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrQXBpKG9wdGlvbnMpIHtcbiAgICAgIGZvcm1seUFwaUNoZWNrLnRocm93KGZvcm1seUFwaUNoZWNrLmZvcm1seUZpZWxkT3B0aW9ucywgYXJndW1lbnRzLCB7XG4gICAgICAgIHByZWZpeDogJ2Zvcm1seS1maWVsZCBkaXJlY3RpdmUnLFxuICAgICAgICB1cmw6ICdmb3JtbHktZmllbGQtZGlyZWN0aXZlLXZhbGlkYXRpb24tZmFpbGVkJ1xuICAgICAgfSk7XG4gICAgICAvLyB2YWxpZGF0ZSB3aXRoIHRoZSB0eXBlXG4gICAgICBjb25zdCB0eXBlID0gb3B0aW9ucy50eXBlICYmIGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSk7XG4gICAgICBpZiAodHlwZSkge1xuICAgICAgICBpZiAodHlwZS52YWxpZGF0ZU9wdGlvbnMpIHtcbiAgICAgICAgICB0eXBlLnZhbGlkYXRlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgfVxuICAgICAgICBydW5BcGlDaGVjayh0eXBlLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW5BcGlDaGVjayh7YXBpQ2hlY2ssIGFwaUNoZWNrSW5zdGFuY2UsIGFwaUNoZWNrRnVuY3Rpb24sIGFwaUNoZWNrT3B0aW9uc30sIG9wdGlvbnMpIHtcbiAgICAgIGlmICghYXBpQ2hlY2spIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgaW5zdGFuY2UgPSBhcGlDaGVja0luc3RhbmNlIHx8IGZvcm1seUFwaUNoZWNrO1xuICAgICAgY29uc3QgZm4gPSBhcGlDaGVja0Z1bmN0aW9uIHx8ICd3YXJuJztcbiAgICAgIGNvbnN0IHNoYXBlID0gaW5zdGFuY2Uuc2hhcGUoYXBpQ2hlY2spO1xuICAgICAgaW5zdGFuY2VbZm5dKHNoYXBlLCBbb3B0aW9uc10sIGFwaUNoZWNrT3B0aW9ucyB8fCB7XG4gICAgICAgIHByZWZpeDogYGZvcm1seS1maWVsZCAke25hbWV9YCxcbiAgICAgICAgdXJsOiBmb3JtbHlBcGlDaGVjay5jb25maWcub3V0cHV0LmRvY3NCYXNlVXJsICsgJ2Zvcm1seS1maWVsZC10eXBlLWFwaWNoZWNrLWZhaWxlZCdcbiAgICAgIH0pO1xuICAgIH1cblxuICB9XG5cbiAgZnVuY3Rpb24gYXJyYXlpZnkob2JqKSB7XG4gICAgaWYgKG9iaiAmJiAhYW5ndWxhci5pc0FycmF5KG9iaikpIHtcbiAgICAgIG9iaiA9IFtvYmpdO1xuICAgIH0gZWxzZSBpZiAoIW9iaikge1xuICAgICAgb2JqID0gW107XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9kaXJlY3RpdmVzL2Zvcm1seS1maWVsZC5qc1xuICoqLyIsImxldCBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhci1maXgnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLmRpcmVjdGl2ZSgnZm9ybWx5Rm9ybScsIGZvcm1seUZvcm0pO1xuXG4gIGZvcm1seUZvcm0udGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZSgnLi9mb3JtbHktZm9ybS50ZXN0JykobmdNb2R1bGUpIDogbnVsbDtcblxuICAvKipcbiAgICogQG5nZG9jIGRpcmVjdGl2ZVxuICAgKiBAbmFtZSBmb3JtbHlGb3JtXG4gICAqIEByZXN0cmljdCBFXG4gICAqL1xuICBmdW5jdGlvbiBmb3JtbHlGb3JtKGZvcm1seVVzYWJpbGl0eSwgJHBhcnNlKSB7XG4gICAgdmFyIGN1cnJlbnRGb3JtSWQgPSAxO1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0UnLFxuICAgICAgdGVtcGxhdGU6IGZ1bmN0aW9uKGVsLCBhdHRycykge1xuICAgICAgICAvKiBqc2hpbnQgLVcwMzMgKi8gLy8gdGhpcyBiZWNhdXNlIGpzaGludCBpcyBicm9rZW4gSSBndWVzcy4uLlxuICAgICAgICBjb25zdCByb290RWwgPSBhdHRycy5yb290RWwgfHwgJ25nLWZvcm0nO1xuICAgICAgICBjb25zdCBmb3JtTmFtZSA9IGBmb3JtbHlfJHtjdXJyZW50Rm9ybUlkKyt9YDtcbiAgICAgICAgcmV0dXJuIGBcbiAgICAgICAgICA8JHtyb290RWx9IGNsYXNzPVwiZm9ybWx5XCJcbiAgICAgICAgICAgICAgICAgICBuYW1lPVwiJHtmb3JtTmFtZX1cIlxuICAgICAgICAgICAgICAgICAgIHJvbGU9XCJmb3JtXCI+XG4gICAgICAgICAgICA8ZGl2IGZvcm1seS1maWVsZFxuICAgICAgICAgICAgICAgICBuZy1yZXBlYXQ9XCJmaWVsZCBpbiBmaWVsZHMgdHJhY2sgYnkgJGluZGV4XCJcbiAgICAgICAgICAgICAgICAgbmctaWY9XCIhZmllbGQuaGlkZVwiXG4gICAgICAgICAgICAgICAgIGNsYXNzPVwiZm9ybWx5LWZpZWxkIHt7ZmllbGQudHlwZSA/ICdmb3JtbHktZmllbGQtJyArIGZpZWxkLnR5cGUgOiAnJ319XCJcbiAgICAgICAgICAgICAgICAgb3B0aW9ucz1cImZpZWxkXCJcbiAgICAgICAgICAgICAgICAgbW9kZWw9XCJmaWVsZC5tb2RlbCB8fCBtb2RlbFwiXG4gICAgICAgICAgICAgICAgIGZpZWxkcz1cImZpZWxkc1wiXG4gICAgICAgICAgICAgICAgIGZvcm09XCIke2Zvcm1OYW1lfVwiXG4gICAgICAgICAgICAgICAgIGZvcm0taWQ9XCIke2Zvcm1OYW1lfVwiXG4gICAgICAgICAgICAgICAgIGZvcm0tc3RhdGU9XCJvcHRpb25zLmZvcm1TdGF0ZVwiXG4gICAgICAgICAgICAgICAgIGluZGV4PVwiJGluZGV4XCI+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxkaXYgbmctdHJhbnNjbHVkZT48L2Rpdj5cbiAgICAgICAgICA8LyR7cm9vdEVsfT5cbiAgICAgICAgYDtcbiAgICAgIH0sXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIGZpZWxkczogJz0nLFxuICAgICAgICBtb2RlbDogJz0nLFxuICAgICAgICBmb3JtOiAnPT8nLFxuICAgICAgICBvcHRpb25zOiAnPT8nXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24oJHNjb3BlKSB7XG4gICAgICAgICRzY29wZS5vcHRpb25zID0gJHNjb3BlLm9wdGlvbnMgfHwge307XG4gICAgICAgICRzY29wZS5vcHRpb25zLmZvcm1TdGF0ZSA9ICRzY29wZS5vcHRpb25zLmZvcm1TdGF0ZSB8fCB7fTtcblxuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgYXR0YWNoS2V5KTsgLy8gYXR0YWNoZXMgYSBrZXkgYmFzZWQgb24gdGhlIGluZGV4IGlmIGEga2V5IGlzbid0IHNwZWNpZmllZFxuICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgc2V0dXBXYXRjaGVycyk7IC8vIHNldHVwIHdhdGNoZXJzIGZvciBhbGwgZmllbGRzXG5cbiAgICAgICAgLy8gd2F0Y2ggdGhlIG1vZGVsIGFuZCBldmFsdWF0ZSB3YXRjaCBleHByZXNzaW9ucyB0aGF0IGRlcGVuZCBvbiBpdC5cbiAgICAgICAgJHNjb3BlLiR3YXRjaCgnbW9kZWwnLCBmdW5jdGlvbiBvblJlc3VsdFVwZGF0ZShuZXdSZXN1bHQpIHtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgZnVuY3Rpb24oZmllbGQpIHtcbiAgICAgICAgICAgIC8qanNoaW50IC1XMDMwICovXG4gICAgICAgICAgICBmaWVsZC5ydW5FeHByZXNzaW9ucyAmJiBmaWVsZC5ydW5FeHByZXNzaW9ucyhuZXdSZXN1bHQpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9LCB0cnVlKTtcblxuICAgICAgICBmdW5jdGlvbiBhdHRhY2hLZXkoZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgZmllbGQua2V5ID0gZmllbGQua2V5IHx8IGluZGV4IHx8IDA7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzZXR1cFdhdGNoZXJzKGZpZWxkLCBpbmRleCkge1xuICAgICAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZmllbGQud2F0Y2hlcikpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHdhdGNoZXJzID0gZmllbGQud2F0Y2hlcjtcbiAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNBcnJheSh3YXRjaGVycykpIHtcbiAgICAgICAgICAgIHdhdGNoZXJzID0gW3dhdGNoZXJzXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHdhdGNoZXJzLCBmdW5jdGlvbih3YXRjaGVyKSB7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKHdhdGNoZXIubGlzdGVuZXIpKSB7XG4gICAgICAgICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFxuICAgICAgICAgICAgICAgICdhbGwtZmllbGQtd2F0Y2hlcnMtbXVzdC1oYXZlLWEtbGlzdGVuZXInLFxuICAgICAgICAgICAgICAgICdBbGwgZmllbGQgd2F0Y2hlcnMgbXVzdCBoYXZlIGEgbGlzdGVuZXInLCBmaWVsZFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHdhdGNoRXhwcmVzc2lvbiA9IGdldFdhdGNoRXhwcmVzc2lvbih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpO1xuICAgICAgICAgICAgdmFyIHdhdGNoTGlzdGVuZXIgPSBnZXRXYXRjaExpc3RlbmVyKHdhdGNoZXIsIGZpZWxkLCBpbmRleCk7XG5cbiAgICAgICAgICAgIHZhciB0eXBlID0gd2F0Y2hlci50eXBlIHx8ICckd2F0Y2gnO1xuICAgICAgICAgICAgd2F0Y2hlci5zdG9wV2F0Y2hpbmcgPSAkc2NvcGVbdHlwZV0od2F0Y2hFeHByZXNzaW9uLCB3YXRjaExpc3RlbmVyLCB3YXRjaGVyLndhdGNoRGVlcCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRXYXRjaEV4cHJlc3Npb24od2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgdmFyIHdhdGNoRXhwcmVzc2lvbiA9IHdhdGNoZXIuZXhwcmVzc2lvbiB8fCBgbW9kZWxbJyR7ZmllbGQua2V5fSddYDtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHdhdGNoRXhwcmVzc2lvbikpIHtcbiAgICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggZXhwcmVzc2lvbiBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgICAvLyBhbmQgdGhlIHN0b3AgZnVuY3Rpb24gYXMgdGhlIGxhc3QgYXJnIGFzIGEgaGVscGVyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxFeHByZXNzaW9uID0gd2F0Y2hFeHByZXNzaW9uO1xuICAgICAgICAgICAgd2F0Y2hFeHByZXNzaW9uID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hFeHByZXNzaW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IG1vZGlmeUFyZ3Mod2F0Y2hlciwgaW5kZXgsIC4uLmFyZ3VtZW50cyk7XG4gICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEV4cHJlc3Npb24oLi4uYXJncyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2F0Y2hFeHByZXNzaW9uLmRpc3BsYXlOYW1lID0gYEZvcm1seSBXYXRjaCBFeHByZXNzaW9uIGZvciBmaWVsZCBmb3IgJHtmaWVsZC5rZXl9YDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHdhdGNoRXhwcmVzc2lvbjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFdhdGNoTGlzdGVuZXIod2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgdmFyIHdhdGNoTGlzdGVuZXIgPSB3YXRjaGVyLmxpc3RlbmVyO1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24od2F0Y2hMaXN0ZW5lcikpIHtcbiAgICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggbGlzdGVuZXIgc28gd2UgY2FuIGNhbGwgaXQgd2l0aCB0aGUgZmllbGQgYXMgdGhlIGZpcnN0IGFyZ1xuICAgICAgICAgICAgLy8gYW5kIHRoZSBzdG9wIGZ1bmN0aW9uIGFzIHRoZSBsYXN0IGFyZyBhcyBhIGhlbHBlclxuICAgICAgICAgICAgdmFyIG9yaWdpbmFsTGlzdGVuZXIgPSB3YXRjaExpc3RlbmVyO1xuICAgICAgICAgICAgd2F0Y2hMaXN0ZW5lciA9IGZ1bmN0aW9uIGZvcm1seVdhdGNoTGlzdGVuZXIoKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gbW9kaWZ5QXJncyh3YXRjaGVyLCBpbmRleCwgLi4uYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsTGlzdGVuZXIoLi4uYXJncyk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2F0Y2hMaXN0ZW5lci5kaXNwbGF5TmFtZSA9IGBGb3JtbHkgV2F0Y2ggTGlzdGVuZXIgZm9yIGZpZWxkIGZvciAke2ZpZWxkLmtleX1gO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gd2F0Y2hMaXN0ZW5lcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1vZGlmeUFyZ3Mod2F0Y2hlciwgaW5kZXgsIC4uLm9yaWdpbmFsQXJncykge1xuICAgICAgICAgIHJldHVybiBbJHNjb3BlLmZpZWxkc1tpbmRleF0sIC4uLm9yaWdpbmFsQXJncywgd2F0Y2hlci5zdG9wV2F0Y2hpbmddO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgbGluayhzY29wZSwgZWwsIGF0dHJzKSB7XG4gICAgICAgIGNvbnN0IGZvcm1JZCA9IGF0dHJzLm5hbWU7XG4gICAgICAgICRwYXJzZShhdHRycy5mb3JtKS5hc3NpZ24oc2NvcGUuJHBhcmVudCwgZm9ybUlkKTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9mb3JtbHktZm9ybS5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICBuZ01vZHVsZS5kaXJlY3RpdmUoJ2Zvcm1seUZvY3VzJywgZnVuY3Rpb24oJHRpbWVvdXQsICRkb2N1bWVudCkge1xuICAgIC8qIGpzaGludCAtVzA1MiAqL1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0EnLFxuICAgICAgbGluazogZnVuY3Rpb24oc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBwcmV2aW91c0VsID0gbnVsbDtcbiAgICAgICAgdmFyIGVsID0gZWxlbWVudFswXTtcbiAgICAgICAgdmFyIGRvYyA9ICRkb2N1bWVudFswXTtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoJ2Zvcm1seUZvY3VzJywgZnVuY3Rpb24odmFsdWUpIHtcbiAgICAgICAgICBpZiAodmFsdWUgPT09ICd0cnVlJykge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICAgIHByZXZpb3VzRWwgPSBkb2MuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIH5+YXR0cnMuZm9jdXNXYWl0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSAnZmFsc2UnKSB7XG4gICAgICAgICAgICBpZiAoZG9jLmFjdGl2ZUVsZW1lbnQgPT09IGVsKSB7XG4gICAgICAgICAgICAgIGVsLmJsdXIoKTtcbiAgICAgICAgICAgICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KCdyZWZvY3VzJykgJiYgcHJldmlvdXNFbCkge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzRWwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9mb3JtbHktZm9jdXMuanNcbiAqKi8iLCJjb25zdCB1dGlscyA9IHJlcXVpcmUoJy4uL290aGVyL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICBuZ01vZHVsZS5mYWN0b3J5KCdmb3JtbHlVdGlsJywgZm9ybWx5VXRpbCk7XG5cbiAgZm9ybWx5VXRpbC50ZXN0cyA9IE9OX1RFU1QgPyByZXF1aXJlKCcuL2Zvcm1seVV0aWwudGVzdCcpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5VXRpbCgpIHtcbiAgICByZXR1cm4gdXRpbHM7XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9zZXJ2aWNlcy9mb3JtbHlVdGlsLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLmZhY3RvcnkoJ2Zvcm1seVdhcm4nLCBmdW5jdGlvbiAoZm9ybWx5Q29uZmlnLCBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LCAkbG9nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgICBpZiAoIWZvcm1seUNvbmZpZy5kaXNhYmxlV2FybmluZ3MpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICB2YXIgd2FybkluZm9TbHVnID0gYXJncy5zaGlmdCgpO1xuICAgICAgICBhcmdzLnVuc2hpZnQoJ0Zvcm1seSBXYXJuaW5nOicpO1xuICAgICAgICBhcmdzLnB1c2goYCR7Zm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeH0ke3dhcm5JbmZvU2x1Z31gKTtcbiAgICAgICAgJGxvZy53YXJuKC4uLmFyZ3MpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3NlcnZpY2VzL2Zvcm1seVdhcm4uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUucnVuKGFkZEZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKTtcblxuICBmdW5jdGlvbiBhZGRGb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcihmb3JtbHlDb25maWcpIHtcbiAgICBpZiAoZm9ybWx5Q29uZmlnLmV4dHJhcy5kaXNhYmxlTmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnByZVdyYXBwZXIucHVzaChuZ01vZGVsQXR0cnNNYW5pcHVsYXRvcik7XG5cblxuICAgIGZ1bmN0aW9uIG5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKHRlbXBsYXRlLCBvcHRpb25zLCBzY29wZSkge1xuICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICAgICAgdmFyIGVsID0gYW5ndWxhci5lbGVtZW50KCc8YT48L2E+Jyk7XG4gICAgICB2YXIgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgIGlmIChkYXRhLm5vVG91Y2h5KSB7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgIH1cbiAgICAgIGVsLmFwcGVuZCh0ZW1wbGF0ZSk7XG4gICAgICB2YXIgbW9kZWxFbHMgPSBhbmd1bGFyLmVsZW1lbnQoZWxbMF0ucXVlcnlTZWxlY3RvckFsbCgnW25nLW1vZGVsXScpKTtcbiAgICAgIGlmICghbW9kZWxFbHMgfHwgIW1vZGVsRWxzLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgICB9XG5cbiAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbEVscywgJ2lkJywgc2NvcGUuaWQpO1xuICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCAnbmFtZScsIHNjb3BlLmlkKTtcblxuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudmFsaWRhdG9ycykpIHtcbiAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCAnZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uJywgJ29wdGlvbnMudmFsaWRhdG9ycycpO1xuICAgICAgfVxuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMubW9kZWxPcHRpb25zKSkge1xuICAgICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxFbHMsICduZy1tb2RlbC1vcHRpb25zJywgJ29wdGlvbnMubW9kZWxPcHRpb25zJyk7XG4gICAgICAgIGlmIChvcHRpb25zLm1vZGVsT3B0aW9ucy5nZXR0ZXJTZXR0ZXIpIHtcbiAgICAgICAgICBtb2RlbEVscy5hdHRyKCduZy1tb2RlbCcsICdvcHRpb25zLnZhbHVlJyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFkZFRlbXBsYXRlT3B0aW9uc0F0dHJzKCk7XG5cbiAgICAgIHJldHVybiBlbC5odG1sKCk7XG5cblxuICAgICAgZnVuY3Rpb24gYWRkVGVtcGxhdGVPcHRpb25zQXR0cnMoKSB7XG4gICAgICAgIGlmICghb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnMgJiYgIW9wdGlvbnMuZXhwcmVzc2lvblByb3BlcnRpZXMpIHtcbiAgICAgICAgICAvLyBubyBuZWVkIHRvIHJ1biB0aGVzZSBpZiB0aGVyZSBhcmUgbm8gdGVtcGxhdGVPcHRpb25zIG9yIGV4cHJlc3Npb25Qcm9wZXJ0aWVzXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHRvID0gb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnMgfHwge307XG4gICAgICAgIGNvbnN0IGVwID0gb3B0aW9ucy5leHByZXNzaW9uUHJvcGVydGllcyB8fCB7fTtcblxuICAgICAgICBsZXQgbmdNb2RlbEF0dHJpYnV0ZXMgPSBnZXRCdWlsdGluQXR0cmlidXRlcygpO1xuXG4gICAgICAgIC8vIGV4dGVuZCB3aXRoIHRoZSB1c2VyJ3Mgc3BlY2lmaWNhdGlvbnMgd2lubmluZ1xuICAgICAgICBhbmd1bGFyLmV4dGVuZChuZ01vZGVsQXR0cmlidXRlcywgb3B0aW9ucy5uZ01vZGVsQXR0cnMpO1xuXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChuZ01vZGVsQXR0cmlidXRlcywgKHZhbCwgbmFtZSkgPT4ge1xuICAgICAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjEwICovXG4gICAgICAgICAgbGV0IGF0dHJWYWw7XG4gICAgICAgICAgbGV0IGF0dHJOYW1lO1xuICAgICAgICAgIGNvbnN0IHJlZiA9IGBvcHRpb25zLnRlbXBsYXRlT3B0aW9uc1snJHtuYW1lfSddYDtcbiAgICAgICAgICBjb25zdCB0b1ZhbCA9IHRvW25hbWVdO1xuICAgICAgICAgIGNvbnN0IGVwVmFsID0gZ2V0RXBWYWx1ZShlcCwgbmFtZSk7XG5cbiAgICAgICAgICBjb25zdCBpblRvID0gYW5ndWxhci5pc0RlZmluZWQodG9WYWwpO1xuICAgICAgICAgIGNvbnN0IGluRXAgPSBhbmd1bGFyLmlzRGVmaW5lZChlcFZhbCk7XG4gICAgICAgICAgaWYgKHZhbC52YWx1ZSkge1xuICAgICAgICAgICAgLy8gSSByZWFsaXplIHRoaXMgbG9va3MgYmFja3dhcmRzLCBidXQgaXQncyByaWdodCwgdHJ1c3QgbWUuLi5cbiAgICAgICAgICAgIGF0dHJOYW1lID0gdmFsLnZhbHVlO1xuICAgICAgICAgICAgYXR0clZhbCA9IG5hbWU7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWwuZXhwcmVzc2lvbiAmJiBpblRvKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5leHByZXNzaW9uO1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcodG9bbmFtZV0pKSB7XG4gICAgICAgICAgICAgIGF0dHJWYWwgPSBgJGV2YWwoJHtyZWZ9KWA7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih0b1tuYW1lXSkpIHtcbiAgICAgICAgICAgICAgYXR0clZhbCA9IGAke3JlZn0obW9kZWxbb3B0aW9ucy5rZXldLCBvcHRpb25zLCB0aGlzLCAkZXZlbnQpYDtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICAgICBgb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnMuJHtuYW1lfSBtdXN0IGJlIGEgc3RyaW5nIG9yIGZ1bmN0aW9uOiAke0pTT04uc3RyaW5naWZ5KG9wdGlvbnMpfWBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbC5ib3VuZCAmJiBpbkVwKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5ib3VuZDtcbiAgICAgICAgICAgIGF0dHJWYWwgPSByZWY7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWwuYXR0cmlidXRlICYmIGluRXApIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmF0dHJpYnV0ZTtcbiAgICAgICAgICAgIGF0dHJWYWwgPSBge3ske3JlZn19fWA7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWwuYXR0cmlidXRlICYmIGluVG8pIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmF0dHJpYnV0ZTtcbiAgICAgICAgICAgIGF0dHJWYWwgPSB0b1ZhbDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbC5ib3VuZCAmJiBpblRvKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5ib3VuZDtcbiAgICAgICAgICAgIGF0dHJWYWwgPSByZWY7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdHRyTmFtZSkgJiYgYW5ndWxhci5pc0RlZmluZWQoYXR0clZhbCkpIHtcbiAgICAgICAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbEVscywgYXR0ck5hbWUsIGF0dHJWYWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldEJ1aWx0aW5BdHRyaWJ1dGVzKCkge1xuICAgICAgICBsZXQgbmdNb2RlbEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgICAgZm9jdXM6IHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZTogJ2Zvcm1seS1mb2N1cydcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGJvdW5kT25seSA9IFtdO1xuICAgICAgICBjb25zdCBib3RoQXR0cmlidXRlQW5kQm91bmQgPSBbJ3JlcXVpcmVkJywgJ2Rpc2FibGVkJywgJ3BhdHRlcm4nLCAnbWlubGVuZ3RoJ107XG4gICAgICAgIGNvbnN0IGV4cHJlc3Npb25Pbmx5ID0gWydjaGFuZ2UnLCAna2V5ZG93bicsICdrZXl1cCcsICdrZXlwcmVzcycsICdjbGljaycsICdmb2N1cycsICdibHVyJ107XG4gICAgICAgIGNvbnN0IGF0dHJpYnV0ZU9ubHkgPSBbJ3BsYWNlaG9sZGVyJywgJ21pbicsICdtYXgnLCAndGFiaW5kZXgnLCAndHlwZSddO1xuICAgICAgICBpZiAoZm9ybWx5Q29uZmlnLmV4dHJhcy5uZ01vZGVsQXR0cnNNYW5pcHVsYXRvclByZWZlckJvdW5kKSB7XG4gICAgICAgICAgYm91bmRPbmx5LnB1c2goJ21heGxlbmd0aCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGJvdGhBdHRyaWJ1dGVBbmRCb3VuZC5wdXNoKCdtYXhsZW5ndGgnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChib3VuZE9ubHksIGl0ZW0gPT4ge1xuICAgICAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW2l0ZW1dID0ge2JvdW5kOiAnbmctJyArIGl0ZW19O1xuICAgICAgICB9KTtcblxuICAgICAgICBhbmd1bGFyLmZvckVhY2goYm90aEF0dHJpYnV0ZUFuZEJvdW5kLCBpdGVtID0+IHtcbiAgICAgICAgICBuZ01vZGVsQXR0cmlidXRlc1tpdGVtXSA9IHthdHRyaWJ1dGU6IGl0ZW0sIGJvdW5kOiAnbmctJyArIGl0ZW19O1xuICAgICAgICB9KTtcblxuICAgICAgICBhbmd1bGFyLmZvckVhY2goZXhwcmVzc2lvbk9ubHksIGl0ZW0gPT4ge1xuICAgICAgICAgIHZhciBwcm9wTmFtZSA9ICdvbicgKyBpdGVtLnN1YnN0cigwLCAxKS50b1VwcGVyQ2FzZSgpICsgaXRlbS5zdWJzdHIoMSk7XG4gICAgICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbcHJvcE5hbWVdID0ge2V4cHJlc3Npb246ICduZy0nICsgaXRlbX07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChhdHRyaWJ1dGVPbmx5LCBpdGVtID0+IHtcbiAgICAgICAgICBuZ01vZGVsQXR0cmlidXRlc1tpdGVtXSA9IHthdHRyaWJ1dGU6IGl0ZW19O1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIG5nTW9kZWxBdHRyaWJ1dGVzO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRFcFZhbHVlKGVwLCBuYW1lKSB7XG4gICAgICAgIHJldHVybiBlcFsndGVtcGxhdGVPcHRpb25zLicgKyBuYW1lXSB8fFxuICAgICAgICAgIGVwW2B0ZW1wbGF0ZU9wdGlvbnNbJyR7bmFtZX0nXWBdIHx8XG4gICAgICAgICAgZXBbYHRlbXBsYXRlT3B0aW9uc1tcIiR7bmFtZX1cIl1gXTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkSWZOb3RQcmVzZW50KGVsLCBhdHRyLCB2YWwpIHtcbiAgICAgICAgaWYgKCFlbC5hdHRyKGF0dHIpKSB7XG4gICAgICAgICAgZWwuYXR0cihhdHRyLCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcnVuL2Zvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLnJ1bihhZGRDdXN0b21UYWdzKTtcblxuICBmdW5jdGlvbiBhZGRDdXN0b21UYWdzKCRkb2N1bWVudCkge1xuXG4gICAgaWYgKCRkb2N1bWVudCAmJiAkZG9jdW1lbnQuZ2V0KSB7XG4gICAgICAvL0lFOCBjaGVjayAtPlxuICAgICAgLy8gaHR0cDovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8xMDk2NDk2Ni9kZXRlY3QtaWUtdmVyc2lvbi1wcmlvci10by12OS1pbi1qYXZhc2NyaXB0LzEwOTY1MjAzIzEwOTY1MjAzXG4gICAgICB2YXIgZG9jdW1lbnQgPSAkZG9jdW1lbnQuZ2V0KDApO1xuICAgICAgdmFyIGRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgZGl2LmlubmVySFRNTCA9ICc8IS0tW2lmIGx0IElFIDldPjxpPjwvaT48IVtlbmRpZl0tLT4nO1xuICAgICAgdmFyIGlzSWVMZXNzVGhhbjkgPSAoZGl2LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdpJykubGVuZ3RoID09PSAxKTtcblxuICAgICAgaWYgKGlzSWVMZXNzVGhhbjkpIHtcbiAgICAgICAgLy9hZGQgdGhlIGN1c3RvbSBlbGVtZW50cyB0aGF0IHdlIG5lZWQgZm9yIGZvcm1seVxuICAgICAgICB2YXIgY3VzdG9tRWxlbWVudHMgPVxuICAgICAgICAgIFsnZm9ybWx5LWZpZWxkJywgJ2Zvcm1seS1mb3JtJywgJ2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbicsICdmb3JtbHktZm9jdXMnLCAnZm9ybWx5LXRyYW5zcG9zZSddO1xuXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY3VzdG9tRWxlbWVudHMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBkb2N1bWVudC5jcmVhdGVFbGVtZW50KGN1c3RvbUVsZW1lbnRzW2ldKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3J1bi9mb3JtbHlDdXN0b21UYWdzLmpzXG4gKiovIiwiY29uc3QgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXItZml4Jyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtmb3JtbHlFdmFsLCBnZXRGaWVsZElkLCByZXZlcnNlRGVlcE1lcmdlLCBmaW5kQnlOb2RlTmFtZX07XG5cbmZ1bmN0aW9uIGZvcm1seUV2YWwoc2NvcGUsIGV4cHJlc3Npb24sIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSkge1xuICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGV4cHJlc3Npb24pKSB7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24odmlld1ZhbHVlIHx8IG1vZGVsVmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc2NvcGUuJGV2YWwoZXhwcmVzc2lvbiwge1xuICAgICAgJHZpZXdWYWx1ZTogdmlld1ZhbHVlIHx8IG1vZGVsVmFsdWUsXG4gICAgICAkbW9kZWxWYWx1ZTogbW9kZWxWYWx1ZVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkSWQoZm9ybUlkLCBvcHRpb25zLCBpbmRleCkge1xuICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICB0eXBlID0gJ3RlbXBsYXRlJztcbiAgfSBlbHNlIGlmICghdHlwZSAmJiBvcHRpb25zLnRlbXBsYXRlVXJsKSB7XG4gICAgdHlwZSA9ICd0ZW1wbGF0ZVVybCc7XG4gIH1cblxuICByZXR1cm4gW2Zvcm1JZCwgdHlwZSwgb3B0aW9ucy5rZXksIGluZGV4XS5qb2luKCdfJyk7XG59XG5cblxuZnVuY3Rpb24gcmV2ZXJzZURlZXBNZXJnZShkZXN0KSB7XG4gIGFuZ3VsYXIuZm9yRWFjaChhcmd1bWVudHMsIChzcmMsIGluZGV4KSA9PiB7XG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhbmd1bGFyLmZvckVhY2goc3JjLCAodmFsLCBwcm9wKSA9PiB7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGRlc3RbcHJvcF0pKSB7XG4gICAgICAgIGRlc3RbcHJvcF0gPSBhbmd1bGFyLmNvcHkodmFsKTtcbiAgICAgIH0gZWxzZSBpZiAob2JqQW5kU2FtZVR5cGUoZGVzdFtwcm9wXSwgdmFsKSkge1xuICAgICAgICByZXZlcnNlRGVlcE1lcmdlKGRlc3RbcHJvcF0sIHZhbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvYmpBbmRTYW1lVHlwZShvYmoxLCBvYmoyKSB7XG4gIHJldHVybiBhbmd1bGFyLmlzT2JqZWN0KG9iajEpICYmIGFuZ3VsYXIuaXNPYmplY3Qob2JqMikgJiZcbiAgICBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqMSkgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmoyKTtcbn1cblxuLy9yZWN1cnNlIGRvd24gYSBub2RlIHRyZWUgdG8gZmluZCBhIG5vZGUgd2l0aCBtYXRjaGluZyBub2RlTmFtZSwgZm9yIGN1c3RvbSB0YWdzIGpRdWVyeS5maW5kIGRvZXNuJ3Qgd29yayBpbiBJRThcbmZ1bmN0aW9uIGZpbmRCeU5vZGVOYW1lKGVsLCBub2RlTmFtZSkge1xuICBpZiAoIWVsLnByb3ApIHsgLy8gbm90IGEgalF1ZXJ5IG9yIGpxTGl0ZSBvYmplY3QgLT4gd3JhcCBpdFxuICAgIGVsID0gYW5ndWxhci5lbGVtZW50KGVsKTtcbiAgfVxuXG4gIGlmIChlbC5wcm9wKCdub2RlTmFtZScpID09PSBub2RlTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgcmV0dXJuIGVsO1xuICB9XG5cbiAgdmFyIGMgPSBlbC5jaGlsZHJlbigpO1xuICBmb3IodmFyIGkgPSAwOyBjICYmIGkgPCBjLmxlbmd0aDsgaSsrKSB7XG4gICAgdmFyIG5vZGUgPSBmaW5kQnlOb2RlTmFtZShjW2ldLCBub2RlTmFtZSk7XG4gICAgaWYgKG5vZGUpIHtcbiAgICAgIHJldHVybiBub2RlO1xuICAgIH1cbiAgfVxufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vb3RoZXIvdXRpbHMuanNcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJmb3JtbHkuanMifQ==