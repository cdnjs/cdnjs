// angular-formly version 3.3.0 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["ngFormly"] = factory(require("angular"));
	else
		root["ngFormly"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_7__) {
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
	
	var ngModuleName = "formly";
	var angular = __webpack_require__(2);
	var ngModule = angular.module(ngModuleName, []);
	
	__webpack_require__(3)(ngModule);
	__webpack_require__(4)(ngModule);
	__webpack_require__(5)(ngModule);
	__webpack_require__(6)(ngModule);
	
	module.exports = ngModuleName;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// some versions of angular don't export the angular module properly,
	// so we get it from window in this case.
	var angular = __webpack_require__(7);
	if (!angular.version) {
	  angular = window.angular;
	}
	module.exports = angular;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(8)(ngModule);
	  __webpack_require__(9)(ngModule);
	  __webpack_require__(10)(ngModule);
	  __webpack_require__(11)(ngModule);
	  __webpack_require__(12)(ngModule);
	  __webpack_require__(13)(ngModule);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(14)(ngModule);
	  __webpack_require__(15)(ngModule);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(16)(ngModule);
	  __webpack_require__(17)(ngModule);
	  __webpack_require__(18)(ngModule);
	  __webpack_require__(19)(ngModule);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(20)(ngModule);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	
	  var apiCheck = __webpack_require__(22);
	  apiCheck.config.output = {
	    prefix: "angular-formly:",
	    docsBaseUrl: "https://github.com/formly-js/angular-formly/blob/" + ("3.3.0") + "/other/ERRORS_AND_WARNINGS.md#"
	  };
	
	  ngModule.constant("apiCheck", apiCheck);
	
	  var fieldOptionsApi = apiCheck.shape({
	    type: apiCheck.any.optional,
	    template: apiCheck.any.optional,
	    templateUrl: apiCheck.any.optional,
	    key: apiCheck.any.optional,
	    model: apiCheck.any.optional,
	    expressionProperties: apiCheck.any.optional,
	    data: apiCheck.any.optional,
	    templateOptions: apiCheck.any.optional,
	    wrapper: apiCheck.any.optional,
	    modelOptions: apiCheck.any.optional,
	    watcher: apiCheck.any.optional,
	    validators: apiCheck.any.optional,
	    noFormControl: apiCheck.bool.optional,
	    hide: apiCheck.bool.optional,
	    ngModelAttrs: apiCheck.any.optional,
	    optionsTypes: apiCheck.any.optional,
	    link: apiCheck.any.optional,
	    controller: apiCheck.any.optional,
	    validation: apiCheck.any.optional,
	    formControl: apiCheck.any.optional,
	    value: apiCheck.any.optional,
	    runExpressions: apiCheck.any.optional
	  });
	
	  var typeOptionsApi = apiCheck.shape({
	    name: apiCheck.string,
	    template: apiCheck.shape.ifNot("templateUrl", apiCheck.string).optional,
	    templateUrl: apiCheck.shape.ifNot("template", apiCheck.string).optional,
	    controller: apiCheck.oneOfType([apiCheck.func, apiCheck.string, apiCheck.array]).optional,
	    link: apiCheck.func.optional,
	    defaultOptions: apiCheck.oneOfType([apiCheck.func, fieldOptionsApi]).optional,
	    "extends": apiCheck.string.optional,
	    wrapper: apiCheck.oneOfType([apiCheck.arrayOf(apiCheck.string), apiCheck.string]).optional,
	    data: apiCheck.object.optional,
	    validateOptions: apiCheck.func.optional,
	    overwriteOk: apiCheck.bool.optional
	  });
	
	  typeOptionsApi.strict = true;
	
	  ngModule.constant("formlyApiTypes", {
	    typeOptionsApi: typeOptionsApi, fieldOptionsApi: fieldOptionsApi
	  });
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(2);
	
	module.exports = function (ngModule) {
	  ngModule.provider("formlyUsability", ["formlyVersion", function (formlyVersion) {
	    var _this = this;
	
	    var errorsAndWarningsUrlPrefix = "https://github.com/formly-js/angular-formly/blob/" + formlyVersion + "/other/ERRORS_AND_WARNINGS.md#";
	    angular.extend(this, {
	      getFormlyError: getFormlyError,
	      getFieldError: getFieldError,
	      checkWrapper: checkWrapper,
	      checkWrapperTemplate: checkWrapperTemplate,
	      checkAllowedProperties: checkAllowedProperties,
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
	      if (wrapper.template && wrapper.templateUrl) {
	        throw getFormlyError("Template wrappers can only have a templateUrl or a template. " + ("This one provided both: " + JSON.stringify(wrapper)));
	      }
	      if (!wrapper.template && !wrapper.templateUrl) {
	        throw getFormlyError("Template wrappers must have one of a templateUrl or a template. " + ("This one provided neither: " + JSON.stringify(wrapper)));
	      }
	    }
	
	    function checkWrapperTemplate(template, additionalInfo) {
	      var formlyTransclude = "<formly-transclude></formly-transclude>";
	      if (template.indexOf(formlyTransclude) === -1) {
	        throw getFormlyError("Template wrapper templates must use \"" + formlyTransclude + "\" somewhere in them. " + ("This one does not have \"<formly-transclude></formly-transclude>\" in it: " + template) + "\n" + ("Additional information: " + JSON.stringify(additionalInfo)));
	      }
	    }
	
	    function checkAllowedProperties(allowedProperties, obj, context) {
	      var extraProps = Object.keys(obj).filter(function (prop) {
	        return allowedProperties.indexOf(prop) === -1;
	      });
	      if (extraProps.length) {
	        var extraPropsJSON = JSON.stringify(extraProps.join(", "));
	        var allowedPropsJSON = JSON.stringify(allowedProperties.join(", "));
	        throw getFieldError("you-have-specified-properties-for-context-that-are-not-allowed", ["You have specified properties for " + context + " that are not allowed: " + extraPropsJSON, "Allowed properties are: " + allowedPropsJSON].join("\n"), obj);
	      }
	    }
	  }]);
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(2);
	var utils = __webpack_require__(21);
	
	module.exports = function (ngModule) {
	  ngModule.provider("formlyConfig", formlyConfig);
	
	  formlyConfig.tests = false ? require("./formlyConfig.test")(ngModule) : null;
	
	  function formlyConfig(formlyUsabilityProvider, formlyApiTypes, apiCheck) {
	    var _this2 = this;
	
	    var typeMap = {};
	    var templateWrappersMap = {};
	    var defaultWrapperName = "default";
	    var _this = this;
	    var getError = formlyUsabilityProvider.getFormlyError;
	    var allowedTypeProperties = ["name", "template", "templateUrl", "controller", "link", "defaultOptions", "extends", "wrapper", "data", "validateOptions", "overwriteOk"];
	
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
	      apiCheck["throw"](formlyApiTypes.typeOptionsApi, arguments, {
	        prefix: "formlyConfig.setType",
	        url: "settype-validation-failed"
	      });
	      if (!options.overwriteOk) {
	        checkOverwrite(options.name, typeMap, options, "types");
	      } else {
	        options.overwriteOk = undefined;
	      }
	      formlyUsabilityProvider.checkAllowedProperties(allowedTypeProperties, options);
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
	  formlyConfig.$inject = ["formlyUsabilityProvider", "formlyApiTypes", "apiCheck"];
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyVersion", ("3.3.0"));
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyErrorAndWarningsUrlPrefix", "https://github.com/formly-js/angular-formly/wiki/Errors-and-Warnings#");
	};

/***/ },
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var utils = __webpack_require__(21);
	
	module.exports = function (ngModule) {
	  ngModule.factory("formlyUtil", formlyUtil);
	
	  formlyUtil.tests = false ? require("./formlyUtil.test")(ngModule) : null;
	
	  function formlyUtil() {
	    return utils;
	  }
	};

/***/ },
/* 15 */
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
/* 16 */
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(2);
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyField", formlyField);
	
	  formlyField.tests = false ? require("./formly-field.test")(ngModule) : null;
	
	  function formlyField($http, $q, $compile, $templateCache, formlyConfig, formlyValidationMessages, formlyUtil, formlyUsability, formlyWarn) {
	    return {
	      restrict: "AE",
	      transclude: true,
	      scope: {
	        options: "=",
	        model: "=",
	        formId: "=?",
	        index: "=?",
	        fields: "=?",
	        form: "=?"
	      },
	      controller: ["$scope", "$timeout", "$parse", "$controller", function fieldController($scope, $timeout, $parse, $controller) {
	        var opts = $scope.options;
	        var fieldType = opts.type && formlyConfig.getType(opts.type);
	        simplifyLife(opts);
	        mergeFieldOptionsWithTypeDefaults(opts, fieldType);
	        apiCheck(opts);
	        // set field id to link labels and fields
	        $scope.id = formlyUtil.getFieldId($scope.formId, opts, $scope.index);
	
	        // initalization
	        extendOptionsWithDefaults(opts, $scope.index);
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
	        throw formlyUsability.getFieldError("template-type-type-not-supported", "template type '" + options.type + "' not supported. On element:", options);
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
	
	        wrapper.forEach(formlyUsability.checkWrapper);
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
	
	    function apiCheck(options) {
	      var templateOptions = getTemplateOptionsCount(options);
	      if (templateOptions === 0) {
	        throw formlyUsability.getFieldError("you-must-provide-one-of-type-template-or-templateurl-for-a-field", "You must provide one of type, template, or templateUrl for a field", options);
	      } else if (templateOptions > 1) {
	        throw formlyUsability.getFieldError("you-must-only-provide-a-type-template-or-templateurl-for-a-field", "You must only provide a type, template, or templateUrl for a field", options);
	      }
	
	      // check that only allowed properties are provided
	      var allowedProperties = ["type", "template", "templateUrl", "key", "model", "expressionProperties", "data", "templateOptions", "wrapper", "modelOptions", "watcher", "validators", "noFormControl", "hide", "ngModelAttrs", "optionsTypes", "link", "controller", "validation",
	      // things we add to the field after the fact are ok
	      "formControl", "value", "runExpressions"];
	      formlyUsability.checkAllowedProperties(allowedProperties, options);
	
	      // validate with the type
	      var type = options.type && formlyConfig.getType(options.type);
	      if (type && type.validateOptions) {
	        type.validateOptions(options);
	      }
	
	      function getTemplateOptionsCount(options) {
	        var templateOptions = 0;
	        templateOptions += angular.isDefined(options.template) ? 1 : 0;
	        templateOptions += angular.isDefined(options.type) ? 1 : 0;
	        templateOptions += angular.isDefined(options.templateUrl) ? 1 : 0;
	        return templateOptions;
	      }
	    }
	  }
	  formlyField.$inject = ["$http", "$q", "$compile", "$templateCache", "formlyConfig", "formlyValidationMessages", "formlyUtil", "formlyUsability", "formlyWarn"];
	
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
	var angular = __webpack_require__(2);
	
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
	        return "\n          <" + rootEl + " class=\"formly\"\n                   name=\"form\"\n                   role=\"form\">\n            <div formly-field\n                 ng-repeat=\"field in fields track by $index\"\n                 ng-if=\"!field.hide\"\n                 class=\"formly-field {{field.type ? 'formly-field-' + field.type : ''}}\"\n                 options=\"field\"\n                 model=\"field.model || model\"\n                 fields=\"fields\"\n                 form=\"form\"\n                 form-id=\"formId\"\n                 index=\"$index\">\n            </div>\n            <div ng-transclude></div>\n          </" + rootEl + ">\n        ";
	      },
	      replace: true,
	      transclude: true,
	      scope: {
	        fields: "=",
	        model: "=?", // we'll do our own warning to help with migrations
	        form: "=?"
	      },
	      controller: ["$scope", function controller($scope) {
	        $scope.formId = "formly_" + currentFormId++;
	
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
	        // enforce the model attribute because we're making it optional to help with migrations
	        if (!attrs.hasOwnProperty("model")) {
	          throw formlyUsability.getFormlyError("The \"model\" attribute is required on a formly-form.");
	        }
	      }
	    };
	  }
	  formlyForm.$inject = ["formlyUsability"];
	};

/***/ },
/* 19 */
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
/* 20 */
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
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(2);
	
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

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	// apiCheck.js v1.0.0 built with ♥ by Kent C. Dodds (ó ì_í)=óò=(ì_í ò)
	
	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
			module.exports = factory();
		else if(typeof define === 'function' && define.amd)
			define(factory);
		else if(typeof exports === 'object')
			exports["apiCheck"] = factory();
		else
			root["apiCheck"] = factory();
	})(this, function() {
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
	/*!******************!*\
	  !*** ./index.js ***!
	  \******************/
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		module.exports = __webpack_require__(/*! ./apiCheck */ 1);
	
	/***/ },
	/* 1 */
	/*!*********************!*\
	  !*** ./apiCheck.js ***!
	  \*********************/
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		var _require = __webpack_require__(/*! ./apiCheckUtil */ 2);
		
		var each = _require.each;
		var arrayify = _require.arrayify;
		var getCheckerDisplay = _require.getCheckerDisplay;
		var typeOf = _require.typeOf;
		
		var checkers = __webpack_require__(/*! ./checkers */ 3);
		var disabled = false;
		
		module.exports = apiCheck;
		
		var additionalProperties = {
		  "throw": getApiCheck(true),
		  warn: getApiCheck(false),
		  disable: function () {
		    return disabled = true;
		  },
		  enable: function () {
		    return disabled = false;
		  },
		  getErrorMessage: getErrorMessage,
		  handleErrorMessage: handleErrorMessage,
		  config: {
		    output: {
		      prefix: "",
		      suffix: "",
		      docsBaseUrl: ""
		    }
		  }
		};
		
		each(additionalProperties, function (wrapper, name) {
		  return module.exports[name] = wrapper;
		});
		each(checkers, function (checker, name) {
		  return module.exports[name] = checker;
		});
		
		function apiCheck(api, args, output) {
		  /* jshint maxcomplexity:6 */
		  var success;
		  if (disabled) {
		    return null;
		  }
		  if (!args) {
		    throw new Error("apiCheck failed: Must pass arguments to check");
		  }
		  args = Array.prototype.slice.call(args);
		  if (checkers.array(api)) {
		    success = checkEnoughArgs(api, args) && checkMultiArgApi(api, args);
		  } else if (checkers.func(api)) {
		    success = api(args[0]);
		  } else {
		    throw new Error("apiCheck failed: Must pass an array or a function");
		  }
		  return success ? null : module.exports.getErrorMessage(api, args, output);
		}
		
		function checkMultiArgApi(api, args) {
		  var success = true;
		  var checkerIndex = 0;
		  var argIndex = 0;
		  var arg, checker, res;
		  /* jshint -W084 */
		  while (arg = args[argIndex++]) {
		    checker = api[checkerIndex++];
		    res = checker(arg);
		    if (!res && !checker.isOptional) {
		      return false;
		    } else if (!res) {
		      argIndex--;
		    }
		  }
		  return success;
		}
		
		function checkEnoughArgs(api, args) {
		  var requiredArgs = api.filter(function (a) {
		    return !a.isOptional;
		  });
		  return args.length >= requiredArgs.length;
		}
		
		function getApiCheck(shouldThrow) {
		  return function apiCheckWrapper(api, args, output) {
		    if (disabled) {
		      return null;
		    }
		    var message = apiCheck(api, args, output);
		    module.exports.handleErrorMessage(message, shouldThrow);
		  };
		}
		
		function handleErrorMessage(message, shouldThrow) {
		  if (shouldThrow && message) {
		    throw new Error(message);
		  } else if (message) {
		    console.warn(message);
		  }
		}
		
		function getErrorMessage(api, args) {
		  var output = arguments[2] === undefined ? {} : arguments[2];
		
		  /* jshint maxcomplexity:7 */
		  var gOut = module.exports.config.output || {};
		  var prefix = ("" + (gOut.prefix || "") + " " + (output.prefix || "")).trim();
		  var suffix = ("" + (output.suffix || "") + " " + (gOut.suffix || "")).trim();
		  var url = gOut.docsBaseUrl && output.url && ("" + gOut.docsBaseUrl + "" + output.url).trim();
		  return ("" + prefix + " " + buildMessageFromApiAndArgs(api, args) + " " + suffix + " " + (url || "")).trim();
		}
		
		function buildMessageFromApiAndArgs(api, args) {
		  api = arrayify(api);
		  args = arrayify(args);
		  var apiTypes = api.map(function (checker) {
		    return getCheckerDisplay(checker);
		  }).join(", ");
		  var passedTypes = args.length ? "`" + args.map(getArgDisplay).join(", ") + "`" : "nothing";
		  return "apiCheck failed! You passed: " + passedTypes + " and should have passed: `" + apiTypes + "`";
		}
		
		var stringifyable = {
		  Object: getDisplay,
		  Array: getDisplay
		};
		
		function getDisplay(obj) {
		  var argDisplay = {};
		  each(obj, function (v, k) {
		    return argDisplay[k] = getArgDisplay(v);
		  });
		  return JSON.stringify(obj, function (k, v) {
		    return argDisplay[k] || v;
		  });
		}
		
		function getArgDisplay(arg) {
		  var cName = arg && arg.constructor && arg.constructor.name;
		  return cName ? stringifyable[cName] ? stringifyable[cName](arg) : cName : arg === null ? "null" : typeOf(arg);
		}
	
	/***/ },
	/* 2 */
	/*!*************************!*\
	  !*** ./apiCheckUtil.js ***!
	  \*************************/
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		module.exports = { each: each, copy: copy, typeOf: typeOf, arrayify: arrayify, getCheckerDisplay: getCheckerDisplay };
		
		function copy(obj) {
		  var daCopy = Array.isArray(obj) ? [] : {};
		  each(obj, function (val, key) {
		    return daCopy[key] = val;
		  });
		  return daCopy;
		}
		
		function typeOf(obj) {
		  if (Array.isArray(obj)) {
		    return "array";
		  } else if (obj instanceof RegExp) {
		    return "object";
		  } else {
		    return typeof obj;
		  }
		}
		
		function getCheckerDisplay(checker) {
		  return (checker.type || checker.displayName || checker.name) + (checker.isOptional ? " (optional)" : "");
		}
		
		function arrayify(obj) {
		  if (!obj) {
		    return [];
		  } else if (Array.isArray(obj)) {
		    return obj;
		  } else {
		    return [obj];
		  }
		}
		
		function each(obj, iterator, context) {
		  if (Array.isArray(obj)) {
		    return eachArry.apply(undefined, arguments);
		  } else {
		    return eachObj.apply(undefined, arguments);
		  }
		}
		
		function eachObj(obj, iterator, context) {
		  var ret;
		  var hasOwn = Object.prototype.hasOwnProperty;
		  for (var key in obj) {
		    if (hasOwn.call(obj, key)) {
		      ret = iterator.call(context, obj[key], key, obj);
		      if (ret === false) {
		        return ret;
		      }
		    }
		  }
		  return true;
		}
		
		function eachArry(obj, iterator, context) {
		  var ret;
		  var length = obj.length;
		  for (var i = 0; i < length; i++) {
		    ret = iterator.call(context, obj[i], i, obj);
		    if (ret === false) {
		      return ret;
		    }
		  }
		  return true;
		}
	
	/***/ },
	/* 3 */
	/*!*********************!*\
	  !*** ./checkers.js ***!
	  \*********************/
	/***/ function(module, exports, __webpack_require__) {
	
		"use strict";
		
		var _require = __webpack_require__(/*! ./apiCheckUtil */ 2);
		
		var typeOf = _require.typeOf;
		var each = _require.each;
		var copy = _require.copy;
		var getCheckerDisplay = _require.getCheckerDisplay;
		
		var checkers = module.exports = {
		  array: getTypeOfChecker("Array"),
		  bool: getTypeOfChecker("Boolean"),
		  func: getTypeOfChecker("Function"),
		  number: getTypeOfChecker("Number"),
		  string: getTypeOfChecker("String"),
		  object: getObjectChecker(),
		
		  instanceOf: instanceCheckGetter,
		  oneOf: oneOfCheckGetter,
		  oneOfType: oneOfTypeCheckGetter,
		
		  arrayOf: arrayOfCheckGetter,
		  objectOf: objectOfCheckGetter,
		
		  shape: getShapeCheckGetter(),
		
		  any: anyCheckGetter()
		};
		
		each(checkers, function (checker) {
		  checker.displayName = "apiCheck `" + checker.type + "` type checker";
		});
		
		function getTypeOfChecker(type) {
		  var lType = type.toLowerCase();
		  function typeOfChecker(val) {
		    return typeOf(val) === lType;
		  }
		
		  typeOfChecker.type = type;
		  makeOptional(typeOfChecker);
		  return typeOfChecker;
		}
		
		function getObjectChecker() {
		  function objectNullOkChecker(val) {
		    return typeOf(val) === "object";
		  }
		  objectNullOkChecker.type = "Object[null ok]";
		  makeOptional(objectNullOkChecker);
		  function objectChecker(val) {
		    return val !== null && objectNullOkChecker(val);
		  }
		  objectChecker.type = "Object";
		  makeOptional(objectChecker);
		  objectChecker.nullOk = objectNullOkChecker;
		
		  return objectChecker;
		}
		
		function instanceCheckGetter(classToCheck) {
		  function instanceChecker(val) {
		    return val instanceof classToCheck;
		  }
		
		  instanceChecker.type = classToCheck.name;
		  makeOptional(instanceChecker);
		  return instanceChecker;
		}
		
		function oneOfCheckGetter(enums) {
		  function oneOfChecker(val) {
		    return enums.some(function (enm) {
		      return enm === val;
		    });
		  }
		
		  oneOfChecker.type = "enum[" + enums.join(", ") + "]";
		  makeOptional(oneOfChecker);
		  return oneOfChecker;
		}
		
		function oneOfTypeCheckGetter(checkers) {
		  function oneOfTypeChecker(val) {
		    return checkers.some(function (checker) {
		      return checker(val);
		    });
		  }
		
		  oneOfTypeChecker.type = checkers.map(getCheckerDisplay).join(" or ");
		  makeOptional(oneOfTypeChecker);
		  return oneOfTypeChecker;
		}
		
		function arrayOfCheckGetter(checker) {
		  function arrayOfChecker(val) {
		    return checkers.array(val) && val.every(checker);
		  }
		
		  arrayOfChecker.type = "arrayOf[" + getCheckerDisplay(checker) + "]";
		  makeOptional(arrayOfChecker);
		  return arrayOfChecker;
		}
		
		function objectOfCheckGetter(checker) {
		  function objectOfChecker(val) {
		    return checkers.object(val) && each(val, checker);
		  }
		
		  objectOfChecker.type = "objectOf[" + getCheckerDisplay(checker) + "]";
		  makeOptional(objectOfChecker);
		  return objectOfChecker;
		}
		
		function getShapeCheckGetter() {
		  function shapeCheckGetter(shape) {
		    function shapeChecker(val) {
		      return checkers.object(val) && each(shape, function (checker, prop) {
		        if (!val.hasOwnProperty(prop) && checker.isOptional) {
		          return true;
		        } else {
		          return checker(val[prop], prop, val);
		        }
		      }) && (!shapeChecker.strict || each(val, function (prop, name) {
		        return shape.hasOwnProperty(name);
		      }));
		    }
		
		    var copiedShape = copy(shape);
		    each(copiedShape, function (val, prop) {
		      copiedShape[prop] = getCheckerDisplay(val);
		    });
		    shapeChecker.type = "shape(" + JSON.stringify(copiedShape) + ")";
		    makeOptional(shapeChecker);
		    return shapeChecker;
		  }
		
		  shapeCheckGetter.ifNot = function ifNot(otherProps, propChecker) {
		    if (!Array.isArray(otherProps)) {
		      otherProps = [otherProps];
		    }
		    function ifNotChecker(prop, propName, obj) {
		      var propExists = obj && obj.hasOwnProperty(propName);
		      var otherPropsExist = otherProps.some(function (otherProp) {
		        return obj && obj.hasOwnProperty(otherProp);
		      });
		      return propExists !== otherPropsExist && (!propExists || propExists && propChecker(prop) && !otherPropsExist);
		    }
		    ifNotChecker.type = "ifNot[" + otherProps.join(", ") + "]";
		    makeOptional(ifNotChecker);
		    return ifNotChecker;
		  };
		
		  shapeCheckGetter.onlyIf = function onlyIf(otherProps, propChecker) {
		    if (!Array.isArray(otherProps)) {
		      otherProps = [otherProps];
		    }
		    function onlyIfChecker(prop, propName, obj) {
		      return otherProps.every(function (prop) {
		        return obj.hasOwnProperty(prop);
		      }) && propChecker(prop);
		    }
		    onlyIfChecker.type = "onlyIf[" + otherProps.join(", ") + "]";
		    makeOptional(onlyIfChecker);
		    return onlyIfChecker;
		  };
		
		  return shapeCheckGetter;
		}
		
		function anyCheckGetter() {
		  function anyChecker() {
		    return true;
		  }
		
		  anyChecker.type = "any";
		  makeOptional(anyChecker);
		  return anyChecker;
		}
		
		function makeOptional(checker) {
		  checker.optional = function optionalCheck() {
		    return checker.apply(undefined, arguments);
		  };
		  checker.optional.isOptional = true;
		  checker.optional.type = checker.type;
		  checker.optional.displayName = checker.displayName;
		}
	
	/***/ }
	/******/ ])
	});
	
	//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlOGM3MDdiMDBhMTg1NTQ5OTU4MCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVjay5qcyIsIndlYnBhY2s6Ly8vLi9hcGlDaGVja1V0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vY2hlY2tlcnMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7Ozs7OztBQ3RDQSxPQUFNLENBQUMsT0FBTyxHQUFHLG1CQUFPLENBQUMsbUJBQVksQ0FBQyxDOzs7Ozs7Ozs7OztnQkNBWSxtQkFBTyxDQUFDLHVCQUFnQixDQUFDOztLQUF0RSxJQUFJLFlBQUosSUFBSTtLQUFFLFFBQVEsWUFBUixRQUFRO0tBQUUsaUJBQWlCLFlBQWpCLGlCQUFpQjtLQUFFLE1BQU0sWUFBTixNQUFNOztBQUM5QyxLQUFJLFFBQVEsR0FBRyxtQkFBTyxDQUFDLG1CQUFZLENBQUMsQ0FBQztBQUNyQyxLQUFJLFFBQVEsR0FBRyxLQUFLLENBQUM7O0FBRXJCLE9BQU0sQ0FBQyxPQUFPLEdBQUcsUUFBUSxDQUFDOztBQUUxQixLQUFJLG9CQUFvQixHQUFHO0FBQ3pCLFlBQU8sV0FBVyxDQUFDLElBQUksQ0FBQztBQUN4QixPQUFJLEVBQUUsV0FBVyxDQUFDLEtBQUssQ0FBQztBQUN4QixVQUFPLEVBQUU7WUFBTSxRQUFR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dGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KCk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcImFwaUNoZWNrXCJdID0gZmFjdG9yeSgpO1xuXHRlbHNlXG5cdFx0cm9vdFtcImFwaUNoZWNrXCJdID0gZmFjdG9yeSgpO1xufSkodGhpcywgZnVuY3Rpb24oKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZThjNzA3YjAwYTE4NTU0OTk1ODBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vYXBpQ2hlY2snKTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2luZGV4LmpzXG4gKiovIiwibGV0IHtlYWNoLCBhcnJheWlmeSwgZ2V0Q2hlY2tlckRpc3BsYXksIHR5cGVPZn0gPSByZXF1aXJlKCcuL2FwaUNoZWNrVXRpbCcpO1xubGV0IGNoZWNrZXJzID0gcmVxdWlyZSgnLi9jaGVja2VycycpO1xubGV0IGRpc2FibGVkID0gZmFsc2U7XG5cbm1vZHVsZS5leHBvcnRzID0gYXBpQ2hlY2s7XG5cbmxldCBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHtcbiAgdGhyb3c6IGdldEFwaUNoZWNrKHRydWUpLFxuICB3YXJuOiBnZXRBcGlDaGVjayhmYWxzZSksXG4gIGRpc2FibGU6ICgpID0+IGRpc2FibGVkID0gdHJ1ZSxcbiAgZW5hYmxlOiAoKSA9PiBkaXNhYmxlZCA9IGZhbHNlLFxuICBnZXRFcnJvck1lc3NhZ2UsXG4gIGhhbmRsZUVycm9yTWVzc2FnZSxcbiAgY29uZmlnOiB7XG4gICAgb3V0cHV0OiB7XG4gICAgICBwcmVmaXg6ICcnLFxuICAgICAgc3VmZml4OiAnJyxcbiAgICAgIGRvY3NCYXNlVXJsOiAnJ1xuICAgIH1cbiAgfVxufTtcblxuZWFjaChhZGRpdGlvbmFsUHJvcGVydGllcywgKHdyYXBwZXIsIG5hbWUpID0+IG1vZHVsZS5leHBvcnRzW25hbWVdID0gd3JhcHBlcik7XG5lYWNoKGNoZWNrZXJzLCAoY2hlY2tlciwgbmFtZSkgPT4gbW9kdWxlLmV4cG9ydHNbbmFtZV0gPSBjaGVja2VyKTtcblxuXG5cbmZ1bmN0aW9uIGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KSB7XG4gIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgdmFyIHN1Y2Nlc3M7XG4gIGlmIChkaXNhYmxlZCkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG4gIGlmICghYXJncykge1xuICAgIHRocm93IG5ldyBFcnJvcignYXBpQ2hlY2sgZmFpbGVkOiBNdXN0IHBhc3MgYXJndW1lbnRzIHRvIGNoZWNrJyk7XG4gIH1cbiAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuICBpZiAoY2hlY2tlcnMuYXJyYXkoYXBpKSkge1xuICAgIHN1Y2Nlc3MgPSBjaGVja0Vub3VnaEFyZ3MoYXBpLCBhcmdzKSAmJiBjaGVja011bHRpQXJnQXBpKGFwaSwgYXJncyk7XG4gIH0gZWxzZSBpZiAoY2hlY2tlcnMuZnVuYyhhcGkpKSB7XG4gICAgc3VjY2VzcyA9IGFwaShhcmdzWzBdKTtcbiAgfSBlbHNlIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2FwaUNoZWNrIGZhaWxlZDogTXVzdCBwYXNzIGFuIGFycmF5IG9yIGEgZnVuY3Rpb24nKTtcbiAgfVxuICByZXR1cm4gc3VjY2VzcyA/IG51bGwgOiBtb2R1bGUuZXhwb3J0cy5nZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBvdXRwdXQpO1xufVxuXG5mdW5jdGlvbiBjaGVja011bHRpQXJnQXBpKGFwaSwgYXJncykge1xuICB2YXIgc3VjY2VzcyA9IHRydWU7XG4gIHZhciBjaGVja2VySW5kZXggPSAwO1xuICB2YXIgYXJnSW5kZXggPSAwO1xuICB2YXIgYXJnLCBjaGVja2VyLCByZXM7XG4gIC8qIGpzaGludCAtVzA4NCAqL1xuICB3aGlsZShhcmcgPSBhcmdzW2FyZ0luZGV4KytdKSB7XG4gICAgY2hlY2tlciA9IGFwaVtjaGVja2VySW5kZXgrK107XG4gICAgcmVzID0gY2hlY2tlcihhcmcpO1xuICAgIGlmICghcmVzICYmICFjaGVja2VyLmlzT3B0aW9uYWwpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9IGVsc2UgaWYgKCFyZXMpIHtcbiAgICAgIGFyZ0luZGV4LS07XG4gICAgfVxuICB9XG4gIHJldHVybiBzdWNjZXNzO1xufVxuXG5mdW5jdGlvbiBjaGVja0Vub3VnaEFyZ3MoYXBpLCBhcmdzKSB7XG4gIHZhciByZXF1aXJlZEFyZ3MgPSBhcGkuZmlsdGVyKGEgPT4gIWEuaXNPcHRpb25hbCk7XG4gIHJldHVybiBhcmdzLmxlbmd0aCA+PSByZXF1aXJlZEFyZ3MubGVuZ3RoO1xufVxuXG5cbmZ1bmN0aW9uIGdldEFwaUNoZWNrKHNob3VsZFRocm93KSB7XG4gIHJldHVybiBmdW5jdGlvbiBhcGlDaGVja1dyYXBwZXIoYXBpLCBhcmdzLCBvdXRwdXQpIHtcbiAgICBpZiAoZGlzYWJsZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB2YXIgbWVzc2FnZSA9IGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KTtcbiAgICBtb2R1bGUuZXhwb3J0cy5oYW5kbGVFcnJvck1lc3NhZ2UobWVzc2FnZSwgc2hvdWxkVGhyb3cpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBoYW5kbGVFcnJvck1lc3NhZ2UobWVzc2FnZSwgc2hvdWxkVGhyb3cpIHtcbiAgaWYgKHNob3VsZFRocm93ICYmIG1lc3NhZ2UpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IobWVzc2FnZSk7XG4gIH0gZWxzZSBpZiAobWVzc2FnZSkge1xuICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBvdXRwdXQgPSB7fSkge1xuICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gIHZhciBnT3V0ID0gbW9kdWxlLmV4cG9ydHMuY29uZmlnLm91dHB1dCB8fCB7fTtcbiAgdmFyIHByZWZpeCA9IGAke2dPdXQucHJlZml4IHx8ICcnfSAke291dHB1dC5wcmVmaXggfHwgJyd9YC50cmltKCk7XG4gIHZhciBzdWZmaXggPSBgJHtvdXRwdXQuc3VmZml4IHx8ICcnfSAke2dPdXQuc3VmZml4IHx8ICcnfWAudHJpbSgpO1xuICB2YXIgdXJsID0gZ091dC5kb2NzQmFzZVVybCAmJiBvdXRwdXQudXJsICYmIGAke2dPdXQuZG9jc0Jhc2VVcmx9JHtvdXRwdXQudXJsfWAudHJpbSgpO1xuICByZXR1cm4gYCR7cHJlZml4fSAke2J1aWxkTWVzc2FnZUZyb21BcGlBbmRBcmdzKGFwaSwgYXJncyl9ICR7c3VmZml4fSAke3VybCB8fCAnJ31gLnRyaW0oKTtcbn1cblxuZnVuY3Rpb24gYnVpbGRNZXNzYWdlRnJvbUFwaUFuZEFyZ3MoYXBpLCBhcmdzKSB7XG4gIGFwaSA9IGFycmF5aWZ5KGFwaSk7XG4gIGFyZ3MgPSBhcnJheWlmeShhcmdzKTtcbiAgdmFyIGFwaVR5cGVzID0gYXBpLm1hcChjaGVja2VyID0+IHtcbiAgICByZXR1cm4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcik7XG4gIH0pLmpvaW4oJywgJyk7XG4gIHZhciBwYXNzZWRUeXBlcyA9IGFyZ3MubGVuZ3RoID8gJ2AnICsgYXJncy5tYXAoZ2V0QXJnRGlzcGxheSkuam9pbignLCAnKSArICdgJyA6ICdub3RoaW5nJztcbiAgcmV0dXJuICdhcGlDaGVjayBmYWlsZWQhIFlvdSBwYXNzZWQ6ICcgKyBwYXNzZWRUeXBlcyArICcgYW5kIHNob3VsZCBoYXZlIHBhc3NlZDogYCcgKyBhcGlUeXBlcyArICdgJztcbn1cblxudmFyIHN0cmluZ2lmeWFibGUgPSB7XG4gIE9iamVjdDogZ2V0RGlzcGxheSxcbiAgQXJyYXk6IGdldERpc3BsYXlcbn07XG5cbmZ1bmN0aW9uIGdldERpc3BsYXkob2JqKSB7XG4gIHZhciBhcmdEaXNwbGF5ID0ge307XG4gIGVhY2gob2JqLCAodixrKSA9PiBhcmdEaXNwbGF5W2tdID0gZ2V0QXJnRGlzcGxheSh2KSk7XG4gIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIChrLCB2KSA9PiBhcmdEaXNwbGF5W2tdIHx8IHYpO1xufVxuXG5mdW5jdGlvbiBnZXRBcmdEaXNwbGF5KGFyZykge1xuICB2YXIgY05hbWUgPSBhcmcgJiYgYXJnLmNvbnN0cnVjdG9yICYmIGFyZy5jb25zdHJ1Y3Rvci5uYW1lO1xuICByZXR1cm4gY05hbWUgPyBzdHJpbmdpZnlhYmxlW2NOYW1lXSA/IHN0cmluZ2lmeWFibGVbY05hbWVdKGFyZykgOiBjTmFtZSA6IGFyZyA9PT0gbnVsbCA/ICdudWxsJyA6IHR5cGVPZihhcmcpO1xufVxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYXBpQ2hlY2suanNcbiAqKi8iLCJcblxubW9kdWxlLmV4cG9ydHMgPSB7ZWFjaCwgY29weSwgdHlwZU9mLCBhcnJheWlmeSwgZ2V0Q2hlY2tlckRpc3BsYXl9O1xuXG5mdW5jdGlvbiBjb3B5KG9iaikge1xuICB2YXIgZGFDb3B5ID0gQXJyYXkuaXNBcnJheShvYmopID8gW10gOiB7fTtcbiAgZWFjaChvYmosICh2YWwsIGtleSkgPT4gZGFDb3B5W2tleV0gPSB2YWwpO1xuICByZXR1cm4gZGFDb3B5O1xufVxuXG5cbmZ1bmN0aW9uIHR5cGVPZihvYmopIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiAnYXJyYXknO1xuICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuICAgIHJldHVybiAnb2JqZWN0JztcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gdHlwZW9mIG9iajtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKSB7XG4gIHJldHVybiAoY2hlY2tlci50eXBlIHx8IGNoZWNrZXIuZGlzcGxheU5hbWUgfHwgY2hlY2tlci5uYW1lKSArIChjaGVja2VyLmlzT3B0aW9uYWwgPyAnIChvcHRpb25hbCknIDogJycpO1xufVxuXG5mdW5jdGlvbiBhcnJheWlmeShvYmopIHtcbiAgaWYgKCFvYmopIHtcbiAgICByZXR1cm4gW107XG4gIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShvYmopKSB7XG4gICAgcmV0dXJuIG9iajtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gW29ial07XG4gIH1cbn1cblxuXG5mdW5jdGlvbiBlYWNoKG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuICAgIHJldHVybiBlYWNoQXJyeSguLi5hcmd1bWVudHMpO1xuICB9IGVsc2Uge1xuICAgIHJldHVybiBlYWNoT2JqKC4uLmFyZ3VtZW50cyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZWFjaE9iaihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG4gIHZhciByZXQ7XG4gIHZhciBoYXNPd24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5O1xuICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG4gICAgaWYgKGhhc093bi5jYWxsKG9iaiwga2V5KSkge1xuICAgICAgcmV0ID0gaXRlcmF0b3IuY2FsbChjb250ZXh0LCBvYmpba2V5XSwga2V5LCBvYmopO1xuICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcbiAgICAgICAgcmV0dXJuIHJldDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGVhY2hBcnJ5KG9iaiwgaXRlcmF0b3IsIGNvbnRleHQpIHtcbiAgdmFyIHJldDtcbiAgdmFyIGxlbmd0aCA9IG9iai5sZW5ndGg7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICByZXQgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcbiAgICBpZiAocmV0ID09PSBmYWxzZSkge1xuICAgICAgcmV0dXJuIHJldDtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHRydWU7XG59XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9hcGlDaGVja1V0aWwuanNcbiAqKi8iLCJ2YXIge3R5cGVPZiwgZWFjaCwgY29weSwgZ2V0Q2hlY2tlckRpc3BsYXl9ID0gcmVxdWlyZSgnLi9hcGlDaGVja1V0aWwnKTtcbnZhciBjaGVja2VycyA9IG1vZHVsZS5leHBvcnRzID0ge1xuICBhcnJheTogZ2V0VHlwZU9mQ2hlY2tlcignQXJyYXknKSxcbiAgYm9vbDogZ2V0VHlwZU9mQ2hlY2tlcignQm9vbGVhbicpLFxuICBmdW5jOiBnZXRUeXBlT2ZDaGVja2VyKCdGdW5jdGlvbicpLFxuICBudW1iZXI6IGdldFR5cGVPZkNoZWNrZXIoJ051bWJlcicpLFxuICBzdHJpbmc6IGdldFR5cGVPZkNoZWNrZXIoJ1N0cmluZycpLFxuICBvYmplY3Q6IGdldE9iamVjdENoZWNrZXIoKSxcblxuICBpbnN0YW5jZU9mOiBpbnN0YW5jZUNoZWNrR2V0dGVyLFxuICBvbmVPZjogb25lT2ZDaGVja0dldHRlcixcbiAgb25lT2ZUeXBlOiBvbmVPZlR5cGVDaGVja0dldHRlcixcblxuICBhcnJheU9mOiBhcnJheU9mQ2hlY2tHZXR0ZXIsXG4gIG9iamVjdE9mOiBvYmplY3RPZkNoZWNrR2V0dGVyLFxuXG4gIHNoYXBlOiBnZXRTaGFwZUNoZWNrR2V0dGVyKCksXG5cbiAgYW55OiBhbnlDaGVja0dldHRlcigpXG59O1xuXG5lYWNoKGNoZWNrZXJzLCBjaGVja2VyID0+IHtcbiAgY2hlY2tlci5kaXNwbGF5TmFtZSA9IGBhcGlDaGVjayBcXGAke2NoZWNrZXIudHlwZX1cXGAgdHlwZSBjaGVja2VyYDtcbn0pO1xuXG5cbmZ1bmN0aW9uIGdldFR5cGVPZkNoZWNrZXIodHlwZSkge1xuICB2YXIgbFR5cGUgPSB0eXBlLnRvTG93ZXJDYXNlKCk7XG4gIGZ1bmN0aW9uIHR5cGVPZkNoZWNrZXIodmFsKSB7XG4gICAgcmV0dXJuIHR5cGVPZih2YWwpID09PSBsVHlwZTtcbiAgfVxuXG4gIHR5cGVPZkNoZWNrZXIudHlwZSA9IHR5cGU7XG4gIG1ha2VPcHRpb25hbCh0eXBlT2ZDaGVja2VyKTtcbiAgcmV0dXJuIHR5cGVPZkNoZWNrZXI7XG59XG5cbmZ1bmN0aW9uIGdldE9iamVjdENoZWNrZXIoKSB7XG4gIGZ1bmN0aW9uIG9iamVjdE51bGxPa0NoZWNrZXIodmFsKSB7XG4gICAgcmV0dXJuIHR5cGVPZih2YWwpID09PSAnb2JqZWN0JztcbiAgfVxuICBvYmplY3ROdWxsT2tDaGVja2VyLnR5cGUgPSAnT2JqZWN0W251bGwgb2tdJztcbiAgbWFrZU9wdGlvbmFsKG9iamVjdE51bGxPa0NoZWNrZXIpO1xuICBmdW5jdGlvbiBvYmplY3RDaGVja2VyKHZhbCkge1xuICAgIHJldHVybiB2YWwgIT09IG51bGwgJiYgb2JqZWN0TnVsbE9rQ2hlY2tlcih2YWwpO1xuICB9XG4gIG9iamVjdENoZWNrZXIudHlwZSA9ICdPYmplY3QnO1xuICBtYWtlT3B0aW9uYWwob2JqZWN0Q2hlY2tlcik7XG4gIG9iamVjdENoZWNrZXIubnVsbE9rID0gb2JqZWN0TnVsbE9rQ2hlY2tlcjtcblxuICByZXR1cm4gb2JqZWN0Q2hlY2tlcjtcbn1cblxuXG5mdW5jdGlvbiBpbnN0YW5jZUNoZWNrR2V0dGVyKGNsYXNzVG9DaGVjaykge1xuICBmdW5jdGlvbiBpbnN0YW5jZUNoZWNrZXIodmFsKSB7XG4gICAgcmV0dXJuIHZhbCBpbnN0YW5jZW9mIGNsYXNzVG9DaGVjaztcbiAgfVxuXG4gIGluc3RhbmNlQ2hlY2tlci50eXBlID0gY2xhc3NUb0NoZWNrLm5hbWU7XG4gIG1ha2VPcHRpb25hbChpbnN0YW5jZUNoZWNrZXIpO1xuICByZXR1cm4gaW5zdGFuY2VDaGVja2VyO1xufVxuXG5mdW5jdGlvbiBvbmVPZkNoZWNrR2V0dGVyKGVudW1zKSB7XG4gIGZ1bmN0aW9uIG9uZU9mQ2hlY2tlcih2YWwpIHtcbiAgICByZXR1cm4gZW51bXMuc29tZShlbm0gPT4gZW5tID09PSB2YWwpO1xuICB9XG5cbiAgb25lT2ZDaGVja2VyLnR5cGUgPSBgZW51bVske2VudW1zLmpvaW4oJywgJyl9XWA7XG4gIG1ha2VPcHRpb25hbChvbmVPZkNoZWNrZXIpO1xuICByZXR1cm4gb25lT2ZDaGVja2VyO1xufVxuXG5mdW5jdGlvbiBvbmVPZlR5cGVDaGVja0dldHRlcihjaGVja2Vycykge1xuICBmdW5jdGlvbiBvbmVPZlR5cGVDaGVja2VyKHZhbCkge1xuICAgIHJldHVybiBjaGVja2Vycy5zb21lKGNoZWNrZXIgPT4gY2hlY2tlcih2YWwpKTtcbiAgfVxuXG4gIG9uZU9mVHlwZUNoZWNrZXIudHlwZSA9IGNoZWNrZXJzLm1hcChnZXRDaGVja2VyRGlzcGxheSkuam9pbignIG9yICcpO1xuICBtYWtlT3B0aW9uYWwob25lT2ZUeXBlQ2hlY2tlcik7XG4gIHJldHVybiBvbmVPZlR5cGVDaGVja2VyO1xufVxuXG5mdW5jdGlvbiBhcnJheU9mQ2hlY2tHZXR0ZXIoY2hlY2tlcikge1xuICBmdW5jdGlvbiBhcnJheU9mQ2hlY2tlcih2YWwpIHtcbiAgICByZXR1cm4gY2hlY2tlcnMuYXJyYXkodmFsKSAmJiB2YWwuZXZlcnkoY2hlY2tlcik7XG4gIH1cblxuICBhcnJheU9mQ2hlY2tlci50eXBlID0gYGFycmF5T2ZbJHtnZXRDaGVja2VyRGlzcGxheShjaGVja2VyKX1dYDtcbiAgbWFrZU9wdGlvbmFsKGFycmF5T2ZDaGVja2VyKTtcbiAgcmV0dXJuIGFycmF5T2ZDaGVja2VyO1xufVxuXG5mdW5jdGlvbiBvYmplY3RPZkNoZWNrR2V0dGVyKGNoZWNrZXIpIHtcbiAgZnVuY3Rpb24gb2JqZWN0T2ZDaGVja2VyKHZhbCkge1xuICAgIHJldHVybiBjaGVja2Vycy5vYmplY3QodmFsKSAmJiBlYWNoKHZhbCwgY2hlY2tlcik7XG4gIH1cblxuICBvYmplY3RPZkNoZWNrZXIudHlwZSA9IGBvYmplY3RPZlske2dldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpfV1gO1xuICBtYWtlT3B0aW9uYWwob2JqZWN0T2ZDaGVja2VyKTtcbiAgcmV0dXJuIG9iamVjdE9mQ2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gZ2V0U2hhcGVDaGVja0dldHRlcigpIHtcbiAgZnVuY3Rpb24gc2hhcGVDaGVja0dldHRlcihzaGFwZSkge1xuICAgIGZ1bmN0aW9uIHNoYXBlQ2hlY2tlcih2YWwpIHtcbiAgICAgIHJldHVybiBjaGVja2Vycy5vYmplY3QodmFsKSAmJiBlYWNoKHNoYXBlLCAoY2hlY2tlciwgcHJvcCkgPT4ge1xuICAgICAgICAgIGlmICghdmFsLmhhc093blByb3BlcnR5KHByb3ApICYmIGNoZWNrZXIuaXNPcHRpb25hbCkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHJldHVybiBjaGVja2VyKHZhbFtwcm9wXSwgcHJvcCwgdmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pICYmICghc2hhcGVDaGVja2VyLnN0cmljdCB8fCBlYWNoKHZhbCwgKHByb3AsIG5hbWUpID0+IHtcbiAgICAgICAgICByZXR1cm4gc2hhcGUuaGFzT3duUHJvcGVydHkobmFtZSk7XG4gICAgICAgIH0pKTtcbiAgICB9XG5cbiAgICB2YXIgY29waWVkU2hhcGUgPSBjb3B5KHNoYXBlKTtcbiAgICBlYWNoKGNvcGllZFNoYXBlLCAodmFsLCBwcm9wKSA9PiB7XG4gICAgICBjb3BpZWRTaGFwZVtwcm9wXSA9IGdldENoZWNrZXJEaXNwbGF5KHZhbCk7XG4gICAgfSk7XG4gICAgc2hhcGVDaGVja2VyLnR5cGUgPSBgc2hhcGUoJHtKU09OLnN0cmluZ2lmeShjb3BpZWRTaGFwZSl9KWA7XG4gICAgbWFrZU9wdGlvbmFsKHNoYXBlQ2hlY2tlcik7XG4gICAgcmV0dXJuIHNoYXBlQ2hlY2tlcjtcbiAgfVxuXG4gIHNoYXBlQ2hlY2tHZXR0ZXIuaWZOb3QgPSBmdW5jdGlvbiBpZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuICAgIGlmICghQXJyYXkuaXNBcnJheShvdGhlclByb3BzKSkge1xuICAgICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgICB9XG4gICAgZnVuY3Rpb24gaWZOb3RDaGVja2VyKHByb3AsIHByb3BOYW1lLCBvYmopIHtcbiAgICAgIHZhciBwcm9wRXhpc3RzID0gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wTmFtZSk7XG4gICAgICB2YXIgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKG90aGVyUHJvcCA9PiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCkpO1xuICAgICAgcmV0dXJuIChwcm9wRXhpc3RzICE9PSBvdGhlclByb3BzRXhpc3QpICYmICghcHJvcEV4aXN0cyB8fCBwcm9wRXhpc3RzICYmIHByb3BDaGVja2VyKHByb3ApICYmICFvdGhlclByb3BzRXhpc3QpO1xuXG4gICAgfVxuICAgIGlmTm90Q2hlY2tlci50eXBlID0gYGlmTm90WyR7b3RoZXJQcm9wcy5qb2luKCcsICcpfV1gO1xuICAgIG1ha2VPcHRpb25hbChpZk5vdENoZWNrZXIpO1xuICAgIHJldHVybiBpZk5vdENoZWNrZXI7XG4gIH07XG5cbiAgc2hhcGVDaGVja0dldHRlci5vbmx5SWYgPSBmdW5jdGlvbiBvbmx5SWYob3RoZXJQcm9wcywgcHJvcENoZWNrZXIpIHtcbiAgICBpZiAoIUFycmF5LmlzQXJyYXkob3RoZXJQcm9wcykpIHtcbiAgICAgIG90aGVyUHJvcHMgPSBbb3RoZXJQcm9wc107XG4gICAgfVxuICAgIGZ1bmN0aW9uIG9ubHlJZkNoZWNrZXIocHJvcCwgcHJvcE5hbWUsIG9iaikge1xuICAgICAgcmV0dXJuIG90aGVyUHJvcHMuZXZlcnkocHJvcCA9PiBvYmouaGFzT3duUHJvcGVydHkocHJvcCkpICYmIHByb3BDaGVja2VyKHByb3ApO1xuICAgIH1cbiAgICBvbmx5SWZDaGVja2VyLnR5cGUgPSBgb25seUlmWyR7b3RoZXJQcm9wcy5qb2luKCcsICcpfV1gO1xuICAgIG1ha2VPcHRpb25hbChvbmx5SWZDaGVja2VyKTtcbiAgICByZXR1cm4gb25seUlmQ2hlY2tlcjtcbiAgfTtcblxuICByZXR1cm4gc2hhcGVDaGVja0dldHRlcjtcbn1cblxuZnVuY3Rpb24gYW55Q2hlY2tHZXR0ZXIoKSB7XG4gIGZ1bmN0aW9uIGFueUNoZWNrZXIoKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhbnlDaGVja2VyLnR5cGUgPSAnYW55JztcbiAgbWFrZU9wdGlvbmFsKGFueUNoZWNrZXIpO1xuICByZXR1cm4gYW55Q2hlY2tlcjtcbn1cblxuZnVuY3Rpb24gbWFrZU9wdGlvbmFsKGNoZWNrZXIpIHtcbiAgY2hlY2tlci5vcHRpb25hbCA9IGZ1bmN0aW9uIG9wdGlvbmFsQ2hlY2soKSB7XG4gICAgcmV0dXJuIGNoZWNrZXIoLi4uYXJndW1lbnRzKTtcbiAgfTtcbiAgY2hlY2tlci5vcHRpb25hbC5pc09wdGlvbmFsID0gdHJ1ZTtcbiAgY2hlY2tlci5vcHRpb25hbC50eXBlID0gY2hlY2tlci50eXBlO1xuICBjaGVja2VyLm9wdGlvbmFsLmRpc3BsYXlOYW1lID0gY2hlY2tlci5kaXNwbGF5TmFtZTtcbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2NoZWNrZXJzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiYXBpQ2hlY2suanMifQ==

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlYzBiMWY5N2IzNjlhNGRjNTg3MSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vYW5ndWxhci1maXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5VHlwZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seVVzYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlWZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvZm9ybWx5VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9mb3JtbHlXYXJuLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWZpZWxkLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktZm9jdXMuanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2Zvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yLmpzIiwid2VicGFjazovLy8uL290aGVyL3V0aWxzLmpzIiwid2VicGFjazovLy8uLi9+L2FwaS1jaGVjay9kaXN0L2FwaUNoZWNrLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O0FDdENBOztBQUVBLHlDOzs7Ozs7QUNGQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUEsK0I7Ozs7OztBQ1hBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCOzs7Ozs7QUNSQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ1RBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ0xBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNQQTs7QUFFQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDSkEsZ0Q7Ozs7OztBQ0FBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7O0FBRUg7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsSUFBRzs7QUFFSDs7QUFFQTtBQUNBO0FBQ0EsSUFBRztBQUNILEc7Ozs7OztBQ3hEQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHOzs7Ozs7QUN4RUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBb0MsaUJBQWlCO0FBQ3JELHFDQUFvQyxpQkFBaUI7QUFDckQ7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWCxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFD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QTtBQUNBOztBQUVBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEdBQUU7O0FBRUY7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE9BQU07QUFDTjs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxXQUFVO0FBQ1Y7QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBLFNBQVE7QUFDUjs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxPQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFNBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxTQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLEVBQUM7O0FBRUQsNENBQTJDLCtxOUIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImFuZ3VsYXJcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibmdGb3JtbHlcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJuZ0Zvcm1seVwiXSA9IGZhY3Rvcnkocm9vdFtcImFuZ3VsYXJcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBlYzBiMWY5N2IzNjlhNGRjNTg3MVxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2luZGV4LmNvbW1vblwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG5nTW9kdWxlTmFtZSA9IFwiZm9ybWx5XCI7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCIuL2FuZ3VsYXItZml4XCIpO1xudmFyIG5nTW9kdWxlID0gYW5ndWxhci5tb2R1bGUobmdNb2R1bGVOYW1lLCBbXSk7XG5cbnJlcXVpcmUoXCIuL3Byb3ZpZGVyc1wiKShuZ01vZHVsZSk7XG5yZXF1aXJlKFwiLi9zZXJ2aWNlc1wiKShuZ01vZHVsZSk7XG5yZXF1aXJlKFwiLi9kaXJlY3RpdmVzXCIpKG5nTW9kdWxlKTtcbnJlcXVpcmUoXCIuL3J1blwiKShuZ01vZHVsZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGVOYW1lO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9pbmRleC5jb21tb24uanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gc29tZSB2ZXJzaW9ucyBvZiBhbmd1bGFyIGRvbid0IGV4cG9ydCB0aGUgYW5ndWxhciBtb2R1bGUgcHJvcGVybHksXG4vLyBzbyB3ZSBnZXQgaXQgZnJvbSB3aW5kb3cgaW4gdGhpcyBjYXNlLlxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbmlmICghYW5ndWxhci52ZXJzaW9uKSB7XG4gIGFuZ3VsYXIgPSB3aW5kb3cuYW5ndWxhcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYW5ndWxhci1maXgvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgcmVxdWlyZShcIi4vZm9ybWx5VHlwZXNcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHlVc2FiaWxpdHlcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHlDb25maWdcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHlWZXJzaW9uXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeFwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seVZhbGlkYXRpb25NZXNzYWdlc1wiKShuZ01vZHVsZSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgcmVxdWlyZShcIi4vZm9ybWx5VXRpbFwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seVdhcm5cIikobmdNb2R1bGUpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2VydmljZXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgcmVxdWlyZShcIi4vZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5LWZpZWxkXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5LWZvcm1cIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHktZm9jdXNcIikobmdNb2R1bGUpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGlyZWN0aXZlcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICByZXF1aXJlKFwiLi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvclwiKShuZ01vZHVsZSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9ydW4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcblxuICB2YXIgYXBpQ2hlY2sgPSByZXF1aXJlKFwiYXBpLWNoZWNrXCIpO1xuICBhcGlDaGVjay5jb25maWcub3V0cHV0ID0ge1xuICAgIHByZWZpeDogXCJhbmd1bGFyLWZvcm1seTpcIixcbiAgICBkb2NzQmFzZVVybDogXCJodHRwczovL2dpdGh1Yi5jb20vZm9ybWx5LWpzL2FuZ3VsYXItZm9ybWx5L2Jsb2IvXCIgKyBWRVJTSU9OICsgXCIvb3RoZXIvRVJST1JTX0FORF9XQVJOSU5HUy5tZCNcIlxuICB9O1xuXG4gIG5nTW9kdWxlLmNvbnN0YW50KFwiYXBpQ2hlY2tcIiwgYXBpQ2hlY2spO1xuXG4gIHZhciBmaWVsZE9wdGlvbnNBcGkgPSBhcGlDaGVjay5zaGFwZSh7XG4gICAgdHlwZTogYXBpQ2hlY2suYW55Lm9wdGlvbmFsLFxuICAgIHRlbXBsYXRlOiBhcGlDaGVjay5hbnkub3B0aW9uYWwsXG4gICAgdGVtcGxhdGVVcmw6IGFwaUNoZWNrLmFueS5vcHRpb25hbCxcbiAgICBrZXk6IGFwaUNoZWNrLmFueS5vcHRpb25hbCxcbiAgICBtb2RlbDogYXBpQ2hlY2suYW55Lm9wdGlvbmFsLFxuICAgIGV4cHJlc3Npb25Qcm9wZXJ0aWVzOiBhcGlDaGVjay5hbnkub3B0aW9uYWwsXG4gICAgZGF0YTogYXBpQ2hlY2suYW55Lm9wdGlvbmFsLFxuICAgIHRlbXBsYXRlT3B0aW9uczogYXBpQ2hlY2suYW55Lm9wdGlvbmFsLFxuICAgIHdyYXBwZXI6IGFwaUNoZWNrLmFueS5vcHRpb25hbCxcbiAgICBtb2RlbE9wdGlvbnM6IGFwaUNoZWNrLmFueS5vcHRpb25hbCxcbiAgICB3YXRjaGVyOiBhcGlDaGVjay5hbnkub3B0aW9uYWwsXG4gICAgdmFsaWRhdG9yczogYXBpQ2hlY2suYW55Lm9wdGlvbmFsLFxuICAgIG5vRm9ybUNvbnRyb2w6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgaGlkZTogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgICBuZ01vZGVsQXR0cnM6IGFwaUNoZWNrLmFueS5vcHRpb25hbCxcbiAgICBvcHRpb25zVHlwZXM6IGFwaUNoZWNrLmFueS5vcHRpb25hbCxcbiAgICBsaW5rOiBhcGlDaGVjay5hbnkub3B0aW9uYWwsXG4gICAgY29udHJvbGxlcjogYXBpQ2hlY2suYW55Lm9wdGlvbmFsLFxuICAgIHZhbGlkYXRpb246IGFwaUNoZWNrLmFueS5vcHRpb25hbCxcbiAgICBmb3JtQ29udHJvbDogYXBpQ2hlY2suYW55Lm9wdGlvbmFsLFxuICAgIHZhbHVlOiBhcGlDaGVjay5hbnkub3B0aW9uYWwsXG4gICAgcnVuRXhwcmVzc2lvbnM6IGFwaUNoZWNrLmFueS5vcHRpb25hbFxuICB9KTtcblxuICB2YXIgdHlwZU9wdGlvbnNBcGkgPSBhcGlDaGVjay5zaGFwZSh7XG4gICAgbmFtZTogYXBpQ2hlY2suc3RyaW5nLFxuICAgIHRlbXBsYXRlOiBhcGlDaGVjay5zaGFwZS5pZk5vdChcInRlbXBsYXRlVXJsXCIsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgdGVtcGxhdGVVcmw6IGFwaUNoZWNrLnNoYXBlLmlmTm90KFwidGVtcGxhdGVcIiwgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICBjb250cm9sbGVyOiBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLmZ1bmMsIGFwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suYXJyYXldKS5vcHRpb25hbCxcbiAgICBsaW5rOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICAgIGRlZmF1bHRPcHRpb25zOiBhcGlDaGVjay5vbmVPZlR5cGUoW2FwaUNoZWNrLmZ1bmMsIGZpZWxkT3B0aW9uc0FwaV0pLm9wdGlvbmFsLFxuICAgIFwiZXh0ZW5kc1wiOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gICAgd3JhcHBlcjogYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5hcnJheU9mKGFwaUNoZWNrLnN0cmluZyksIGFwaUNoZWNrLnN0cmluZ10pLm9wdGlvbmFsLFxuICAgIGRhdGE6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgICB2YWxpZGF0ZU9wdGlvbnM6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgb3ZlcndyaXRlT2s6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWxcbiAgfSk7XG5cbiAgdHlwZU9wdGlvbnNBcGkuc3RyaWN0ID0gdHJ1ZTtcblxuICBuZ01vZHVsZS5jb25zdGFudChcImZvcm1seUFwaVR5cGVzXCIsIHtcbiAgICB0eXBlT3B0aW9uc0FwaTogdHlwZU9wdGlvbnNBcGksIGZpZWxkT3B0aW9uc0FwaTogZmllbGRPcHRpb25zQXBpXG4gIH0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHJvdmlkZXJzL2Zvcm1seVR5cGVzLmpzXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5wcm92aWRlcihcImZvcm1seVVzYWJpbGl0eVwiLCBbXCJmb3JtbHlWZXJzaW9uXCIsIGZ1bmN0aW9uIChmb3JtbHlWZXJzaW9uKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcblxuICAgIHZhciBlcnJvcnNBbmRXYXJuaW5nc1VybFByZWZpeCA9IFwiaHR0cHM6Ly9naXRodWIuY29tL2Zvcm1seS1qcy9hbmd1bGFyLWZvcm1seS9ibG9iL1wiICsgZm9ybWx5VmVyc2lvbiArIFwiL290aGVyL0VSUk9SU19BTkRfV0FSTklOR1MubWQjXCI7XG4gICAgYW5ndWxhci5leHRlbmQodGhpcywge1xuICAgICAgZ2V0Rm9ybWx5RXJyb3I6IGdldEZvcm1seUVycm9yLFxuICAgICAgZ2V0RmllbGRFcnJvcjogZ2V0RmllbGRFcnJvcixcbiAgICAgIGNoZWNrV3JhcHBlcjogY2hlY2tXcmFwcGVyLFxuICAgICAgY2hlY2tXcmFwcGVyVGVtcGxhdGU6IGNoZWNrV3JhcHBlclRlbXBsYXRlLFxuICAgICAgY2hlY2tBbGxvd2VkUHJvcGVydGllczogY2hlY2tBbGxvd2VkUHJvcGVydGllcyxcbiAgICAgICRnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0RmllbGRFcnJvcihlcnJvckluZm9TbHVnLCBtZXNzYWdlLCBmaWVsZCkge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICAgIGZpZWxkID0gbWVzc2FnZTtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9ySW5mb1NsdWc7XG4gICAgICAgIGVycm9ySW5mb1NsdWcgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkgKyAoXCIgRmllbGQgZGVmaW5pdGlvbjogXCIgKyBhbmd1bGFyLnRvSnNvbihmaWVsZCkpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGb3JtbHlFcnJvcihlcnJvckluZm9TbHVnLCBtZXNzYWdlKSB7XG4gICAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9ySW5mb1NsdWc7XG4gICAgICAgIGVycm9ySW5mb1NsdWcgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSB7XG4gICAgICB2YXIgdXJsID0gXCJcIjtcbiAgICAgIGlmIChlcnJvckluZm9TbHVnICE9PSBudWxsKSB7XG4gICAgICAgIHVybCA9IFwiXCIgKyBlcnJvcnNBbmRXYXJuaW5nc1VybFByZWZpeCArIFwiXCIgKyBlcnJvckluZm9TbHVnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFwiRm9ybWx5IEVycm9yOiBcIiArIG1lc3NhZ2UgKyBcIi4gXCIgKyB1cmw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyKHdyYXBwZXIpIHtcbiAgICAgIGlmICh3cmFwcGVyLnRlbXBsYXRlICYmIHdyYXBwZXIudGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXCJUZW1wbGF0ZSB3cmFwcGVycyBjYW4gb25seSBoYXZlIGEgdGVtcGxhdGVVcmwgb3IgYSB0ZW1wbGF0ZS4gXCIgKyAoXCJUaGlzIG9uZSBwcm92aWRlZCBib3RoOiBcIiArIEpTT04uc3RyaW5naWZ5KHdyYXBwZXIpKSk7XG4gICAgICB9XG4gICAgICBpZiAoIXdyYXBwZXIudGVtcGxhdGUgJiYgIXdyYXBwZXIudGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXCJUZW1wbGF0ZSB3cmFwcGVycyBtdXN0IGhhdmUgb25lIG9mIGEgdGVtcGxhdGVVcmwgb3IgYSB0ZW1wbGF0ZS4gXCIgKyAoXCJUaGlzIG9uZSBwcm92aWRlZCBuZWl0aGVyOiBcIiArIEpTT04uc3RyaW5naWZ5KHdyYXBwZXIpKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyVGVtcGxhdGUodGVtcGxhdGUsIGFkZGl0aW9uYWxJbmZvKSB7XG4gICAgICB2YXIgZm9ybWx5VHJhbnNjbHVkZSA9IFwiPGZvcm1seS10cmFuc2NsdWRlPjwvZm9ybWx5LXRyYW5zY2x1ZGU+XCI7XG4gICAgICBpZiAodGVtcGxhdGUuaW5kZXhPZihmb3JtbHlUcmFuc2NsdWRlKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXCJUZW1wbGF0ZSB3cmFwcGVyIHRlbXBsYXRlcyBtdXN0IHVzZSBcXFwiXCIgKyBmb3JtbHlUcmFuc2NsdWRlICsgXCJcXFwiIHNvbWV3aGVyZSBpbiB0aGVtLiBcIiArIChcIlRoaXMgb25lIGRvZXMgbm90IGhhdmUgXFxcIjxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPlxcXCIgaW4gaXQ6IFwiICsgdGVtcGxhdGUpICsgXCJcXG5cIiArIChcIkFkZGl0aW9uYWwgaW5mb3JtYXRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkoYWRkaXRpb25hbEluZm8pKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tBbGxvd2VkUHJvcGVydGllcyhhbGxvd2VkUHJvcGVydGllcywgb2JqLCBjb250ZXh0KSB7XG4gICAgICB2YXIgZXh0cmFQcm9wcyA9IE9iamVjdC5rZXlzKG9iaikuZmlsdGVyKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgIHJldHVybiBhbGxvd2VkUHJvcGVydGllcy5pbmRleE9mKHByb3ApID09PSAtMTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGV4dHJhUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBleHRyYVByb3BzSlNPTiA9IEpTT04uc3RyaW5naWZ5KGV4dHJhUHJvcHMuam9pbihcIiwgXCIpKTtcbiAgICAgICAgdmFyIGFsbG93ZWRQcm9wc0pTT04gPSBKU09OLnN0cmluZ2lmeShhbGxvd2VkUHJvcGVydGllcy5qb2luKFwiLCBcIikpO1xuICAgICAgICB0aHJvdyBnZXRGaWVsZEVycm9yKFwieW91LWhhdmUtc3BlY2lmaWVkLXByb3BlcnRpZXMtZm9yLWNvbnRleHQtdGhhdC1hcmUtbm90LWFsbG93ZWRcIiwgW1wiWW91IGhhdmUgc3BlY2lmaWVkIHByb3BlcnRpZXMgZm9yIFwiICsgY29udGV4dCArIFwiIHRoYXQgYXJlIG5vdCBhbGxvd2VkOiBcIiArIGV4dHJhUHJvcHNKU09OLCBcIkFsbG93ZWQgcHJvcGVydGllcyBhcmU6IFwiICsgYWxsb3dlZFByb3BzSlNPTl0uam9pbihcIlxcblwiKSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG4gIH1dKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHkuanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhci1maXhcIik7XG52YXIgdXRpbHMgPSByZXF1aXJlKFwiLi4vb3RoZXIvdXRpbHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLnByb3ZpZGVyKFwiZm9ybWx5Q29uZmlnXCIsIGZvcm1seUNvbmZpZyk7XG5cbiAgZm9ybWx5Q29uZmlnLnRlc3RzID0gT05fVEVTVCA/IHJlcXVpcmUoXCIuL2Zvcm1seUNvbmZpZy50ZXN0XCIpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5Q29uZmlnKGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLCBmb3JtbHlBcGlUeXBlcywgYXBpQ2hlY2spIHtcbiAgICB2YXIgX3RoaXMyID0gdGhpcztcblxuICAgIHZhciB0eXBlTWFwID0ge307XG4gICAgdmFyIHRlbXBsYXRlV3JhcHBlcnNNYXAgPSB7fTtcbiAgICB2YXIgZGVmYXVsdFdyYXBwZXJOYW1lID0gXCJkZWZhdWx0XCI7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZ2V0RXJyb3IgPSBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5nZXRGb3JtbHlFcnJvcjtcbiAgICB2YXIgYWxsb3dlZFR5cGVQcm9wZXJ0aWVzID0gW1wibmFtZVwiLCBcInRlbXBsYXRlXCIsIFwidGVtcGxhdGVVcmxcIiwgXCJjb250cm9sbGVyXCIsIFwibGlua1wiLCBcImRlZmF1bHRPcHRpb25zXCIsIFwiZXh0ZW5kc1wiLCBcIndyYXBwZXJcIiwgXCJkYXRhXCIsIFwidmFsaWRhdGVPcHRpb25zXCIsIFwib3ZlcndyaXRlT2tcIl07XG5cbiAgICBhbmd1bGFyLmV4dGVuZCh0aGlzLCB7XG4gICAgICBzZXRUeXBlOiBzZXRUeXBlLFxuICAgICAgZ2V0VHlwZTogZ2V0VHlwZSxcbiAgICAgIHNldFdyYXBwZXI6IHNldFdyYXBwZXIsXG4gICAgICBnZXRXcmFwcGVyOiBnZXRXcmFwcGVyLFxuICAgICAgZ2V0V3JhcHBlckJ5VHlwZTogZ2V0V3JhcHBlckJ5VHlwZSxcbiAgICAgIHJlbW92ZVdyYXBwZXJCeU5hbWU6IHJlbW92ZVdyYXBwZXJCeU5hbWUsXG4gICAgICByZW1vdmVXcmFwcGVyc0ZvclR5cGU6IHJlbW92ZVdyYXBwZXJzRm9yVHlwZSxcbiAgICAgIGRpc2FibGVXYXJuaW5nczogZmFsc2UsXG4gICAgICBleHRyYXM6IHtcbiAgICAgICAgZGlzYWJsZU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yOiBmYWxzZSxcbiAgICAgICAgbmdNb2RlbEF0dHJzTWFuaXB1bGF0b3JQcmVmZXJCb3VuZDogZmFsc2VcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZU1hbmlwdWxhdG9yczoge1xuICAgICAgICBwcmVXcmFwcGVyOiBbXSxcbiAgICAgICAgcG9zdFdyYXBwZXI6IFtdXG4gICAgICB9LFxuICAgICAgJGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gc2V0VHlwZShvcHRpb25zKSB7XG4gICAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChvcHRpb25zLCBzZXRUeXBlKTtcbiAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICBjaGVja1R5cGUob3B0aW9ucyk7XG4gICAgICAgIGlmIChvcHRpb25zW1wiZXh0ZW5kc1wiXSkge1xuICAgICAgICAgIGV4dGVuZFR5cGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHR5cGVNYXBbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBnZXRFcnJvcihcIllvdSBtdXN0IHByb3ZpZGUgYW4gb2JqZWN0IG9yIGFycmF5IGZvciBzZXRUeXBlLiBZb3UgcHJvdmlkZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKG9wdGlvbnMpIHtcbiAgICAgIGFwaUNoZWNrW1widGhyb3dcIl0oZm9ybWx5QXBpVHlwZXMudHlwZU9wdGlvbnNBcGksIGFyZ3VtZW50cywge1xuICAgICAgICBwcmVmaXg6IFwiZm9ybWx5Q29uZmlnLnNldFR5cGVcIixcbiAgICAgICAgdXJsOiBcInNldHR5cGUtdmFsaWRhdGlvbi1mYWlsZWRcIlxuICAgICAgfSk7XG4gICAgICBpZiAoIW9wdGlvbnMub3ZlcndyaXRlT2spIHtcbiAgICAgICAgY2hlY2tPdmVyd3JpdGUob3B0aW9ucy5uYW1lLCB0eXBlTWFwLCBvcHRpb25zLCBcInR5cGVzXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5vdmVyd3JpdGVPayA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLmNoZWNrQWxsb3dlZFByb3BlcnRpZXMoYWxsb3dlZFR5cGVQcm9wZXJ0aWVzLCBvcHRpb25zKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmRUeXBlT3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICB2YXIgZXh0ZW5kc1R5cGUgPSBnZXRUeXBlKG9wdGlvbnNbXCJleHRlbmRzXCJdLCB0cnVlLCBvcHRpb25zKTtcbiAgICAgIGV4dGVuZFR5cGVDb250cm9sbGVyRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgICAgZXh0ZW5kVHlwZUxpbmtGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgICBleHRlbmRUeXBlVmFsaWRhdGVPcHRpb25zRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgICAgZXh0ZW5kVHlwZURlZmF1bHRPcHRpb25zKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2Uob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZFR5cGVDb250cm9sbGVyRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICAgIHZhciBleHRlbmRzQ3RybCA9IGV4dGVuZHNUeXBlLmNvbnRyb2xsZXI7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNDdHJsKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgb3B0aW9uc0N0cmwgPSBvcHRpb25zLmNvbnRyb2xsZXI7XG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9uc0N0cmwpKSB7XG4gICAgICAgIG9wdGlvbnMuY29udHJvbGxlciA9IGZ1bmN0aW9uICgkc2NvcGUsICRjb250cm9sbGVyKSB7XG4gICAgICAgICAgJGNvbnRyb2xsZXIoZXh0ZW5kc0N0cmwsIHsgJHNjb3BlOiAkc2NvcGUgfSk7XG4gICAgICAgICAgJGNvbnRyb2xsZXIob3B0aW9uc0N0cmwsIHsgJHNjb3BlOiAkc2NvcGUgfSk7XG4gICAgICAgIH07XG4gICAgICAgIG9wdGlvbnMuY29udHJvbGxlci4kaW5qZWN0ID0gW1wiJHNjb3BlXCIsIFwiJGNvbnRyb2xsZXJcIl07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLmNvbnRyb2xsZXIgPSBleHRlbmRzQ3RybDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmRUeXBlTGlua0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgICB2YXIgZXh0ZW5kc0ZuID0gZXh0ZW5kc1R5cGUubGluaztcbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0ZuKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgb3B0aW9uc0ZuID0gb3B0aW9ucy5saW5rO1xuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnNGbikpIHtcbiAgICAgICAgb3B0aW9ucy5saW5rID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgIGV4dGVuZHNGbi5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgICAgICAgb3B0aW9uc0ZuLmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcbiAgICAgICAgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMubGluayA9IGV4dGVuZHNGbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmRUeXBlVmFsaWRhdGVPcHRpb25zRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICAgIHZhciBleHRlbmRzRm4gPSBleHRlbmRzVHlwZS52YWxpZGF0ZU9wdGlvbnM7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNGbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIG9wdGlvbnNGbiA9IG9wdGlvbnMudmFsaWRhdGVPcHRpb25zO1xuICAgICAgdmFyIG9yaWdpbmFsRGVmYXVsdE9wdGlvbnMgPSBvcHRpb25zLmRlZmF1bHRPcHRpb25zO1xuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnNGbikpIHtcbiAgICAgICAgb3B0aW9ucy52YWxpZGF0ZU9wdGlvbnMgPSBmdW5jdGlvbiAob3B0aW9ucykge1xuICAgICAgICAgIG9wdGlvbnNGbihvcHRpb25zKTtcbiAgICAgICAgICB2YXIgbWVyZ2VkT3B0aW9ucyA9IGFuZ3VsYXIuY29weShvcHRpb25zKTtcbiAgICAgICAgICB2YXIgZGVmYXVsdE9wdGlvbnMgPSBvcmlnaW5hbERlZmF1bHRPcHRpb25zO1xuICAgICAgICAgIGlmIChkZWZhdWx0T3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihkZWZhdWx0T3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgZGVmYXVsdE9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucyhtZXJnZWRPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UobWVyZ2VkT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBleHRlbmRzRm4obWVyZ2VkT3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLnZhbGlkYXRlT3B0aW9ucyA9IGV4dGVuZHNGbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmRUeXBlRGVmYXVsdE9wdGlvbnMob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICAgIHZhciBleHRlbmRzRE8gPSBleHRlbmRzVHlwZS5kZWZhdWx0T3B0aW9ucztcbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZXh0ZW5kc0RPKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgb3B0aW9uc0RPID0gb3B0aW9ucy5kZWZhdWx0T3B0aW9ucztcbiAgICAgIHZhciBvcHRpb25zRE9Jc0ZuID0gYW5ndWxhci5pc0Z1bmN0aW9uKG9wdGlvbnNETyk7XG4gICAgICB2YXIgZXh0ZW5kc0RPSXNGbiA9IGFuZ3VsYXIuaXNGdW5jdGlvbihleHRlbmRzRE8pO1xuICAgICAgaWYgKGV4dGVuZHNET0lzRm4pIHtcbiAgICAgICAgb3B0aW9ucy5kZWZhdWx0T3B0aW9ucyA9IGZ1bmN0aW9uIGRlZmF1bHRPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgICAgICB2YXIgZXh0ZW5kc0RlZmF1bHRPcHRpb25zID0gZXh0ZW5kc0RPKG9wdGlvbnMpO1xuICAgICAgICAgIHZhciBtZXJnZWREZWZhdWx0T3B0aW9ucyA9IHt9O1xuICAgICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UobWVyZ2VkRGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMsIGV4dGVuZHNEZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgaWYgKG9wdGlvbnNET0lzRm4pIHtcbiAgICAgICAgICAgIHJldHVybiBvcHRpb25zRE8obWVyZ2VkRGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKGV4dGVuZHNEZWZhdWx0T3B0aW9ucywgb3B0aW9uc0RPKTtcbiAgICAgICAgICAgIHJldHVybiBleHRlbmRzRGVmYXVsdE9wdGlvbnM7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zRE9Jc0ZuKSB7XG4gICAgICAgIG9wdGlvbnMuZGVmYXVsdE9wdGlvbnMgPSBmdW5jdGlvbiBkZWZhdWx0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgICAgdmFyIG5ld0RlZmF1bHRPcHRpb25zID0ge307XG4gICAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShuZXdEZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgZXh0ZW5kc0RPKTtcbiAgICAgICAgICByZXR1cm4gb3B0aW9uc0RPKG5ld0RlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUeXBlKG5hbWUsIHRocm93RXJyb3IsIGVycm9yQ29udGV4dCkge1xuICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICB2YXIgdHlwZSA9IHR5cGVNYXBbbmFtZV07XG4gICAgICBpZiAoIXR5cGUgJiYgdGhyb3dFcnJvciA9PT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBnZXRFcnJvcihcIlRoZXJlIGlzIG5vIHR5cGUgYnkgdGhlIG5hbWUgb2YgXFxcIlwiICsgbmFtZSArIFwiXFxcIjogXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvckNvbnRleHQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFdyYXBwZXIoX3gsIF94Mikge1xuICAgICAgdmFyIF9hZ2FpbiA9IHRydWU7XG5cbiAgICAgIF9mdW5jdGlvbjogd2hpbGUgKF9hZ2Fpbikge1xuICAgICAgICBfYWdhaW4gPSBmYWxzZTtcbiAgICAgICAgdmFyIG9wdGlvbnMgPSBfeCxcbiAgICAgICAgICAgIG5hbWUgPSBfeDI7XG5cbiAgICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgICAgIHJldHVybiBvcHRpb25zLm1hcChmdW5jdGlvbiAod3JhcHBlck9wdGlvbnMpIHtcbiAgICAgICAgICAgIHJldHVybiBzZXRXcmFwcGVyKHdyYXBwZXJPcHRpb25zKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgICAgb3B0aW9ucy50eXBlcyA9IGdldE9wdGlvbnNUeXBlcyhvcHRpb25zKTtcbiAgICAgICAgICBvcHRpb25zLm5hbWUgPSBnZXRPcHRpb25zTmFtZShvcHRpb25zLCBuYW1lKTtcbiAgICAgICAgICBjaGVja1dyYXBwZXJBUEkob3B0aW9ucyk7XG4gICAgICAgICAgdGVtcGxhdGVXcmFwcGVyc01hcFtvcHRpb25zLm5hbWVdID0gb3B0aW9ucztcbiAgICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzU3RyaW5nKG9wdGlvbnMpKSB7XG4gICAgICAgICAgX3ggPSB7XG4gICAgICAgICAgICB0ZW1wbGF0ZTogb3B0aW9ucyxcbiAgICAgICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgICB9O1xuICAgICAgICAgIF9hZ2FpbiA9IHRydWU7XG4gICAgICAgICAgY29udGludWUgX2Z1bmN0aW9uO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T3B0aW9uc1R5cGVzKG9wdGlvbnMpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKG9wdGlvbnMudHlwZXMpKSB7XG4gICAgICAgIHJldHVybiBbb3B0aW9ucy50eXBlc107XG4gICAgICB9XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudHlwZXMpKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnR5cGVzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9wdGlvbnNOYW1lKG9wdGlvbnMsIG5hbWUpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLm5hbWUgfHwgbmFtZSB8fCBvcHRpb25zLnR5cGVzLmpvaW4oXCIgXCIpIHx8IGRlZmF1bHRXcmFwcGVyTmFtZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dyYXBwZXJBUEkob3B0aW9ucykge1xuICAgICAgZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuY2hlY2tXcmFwcGVyKG9wdGlvbnMpO1xuICAgICAgaWYgKG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICAgICAgZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuY2hlY2tXcmFwcGVyVGVtcGxhdGUob3B0aW9ucy50ZW1wbGF0ZSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBpZiAoIW9wdGlvbnMub3ZlcndyaXRlT2spIHtcbiAgICAgICAgY2hlY2tPdmVyd3JpdGUob3B0aW9ucy5uYW1lLCB0ZW1wbGF0ZVdyYXBwZXJzTWFwLCBvcHRpb25zLCBcInRlbXBsYXRlV3JhcHBlcnNcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgb3B0aW9ucy5vdmVyd3JpdGVPaztcbiAgICAgIH1cbiAgICAgIGNoZWNrV3JhcHBlclR5cGVzKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrV3JhcHBlclR5cGVzKG9wdGlvbnMpIHtcbiAgICAgIHZhciBzaG91bGRUaHJvdyA9ICFhbmd1bGFyLmlzQXJyYXkob3B0aW9ucy50eXBlcykgfHwgIW9wdGlvbnMudHlwZXMuZXZlcnkoYW5ndWxhci5pc1N0cmluZyk7XG4gICAgICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICAgICAgdGhyb3cgZ2V0RXJyb3IoXCJBdHRlbXB0ZWQgdG8gY3JlYXRlIGEgdGVtcGxhdGUgd3JhcHBlciB3aXRoIHR5cGVzIHRoYXQgaXMgbm90IGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3NcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tPdmVyd3JpdGUocHJvcGVydHksIG9iamVjdCwgbmV3VmFsdWUsIG9iamVjdE5hbWUpIHtcbiAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgIHdhcm4oW1wiQXR0ZW1wdGluZyB0byBvdmVyd3JpdGUgXCIgKyBwcm9wZXJ0eSArIFwiIG9uIFwiICsgb2JqZWN0TmFtZSArIFwiIHdoaWNoIGlzIGN1cnJlbnRseVwiLCBcIlwiICsgSlNPTi5zdHJpbmdpZnkob2JqZWN0W3Byb3BlcnR5XSkgKyBcIiB3aXRoIFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpLCBcIlRvIHN1cHJlc3MgdGhpcyB3YXJuaW5nLCBzcGVjaWZ5IHRoZSBwcm9wZXJ0eSBcXFwib3ZlcndyaXRlT2s6IHRydWVcXFwiXCJdLmpvaW4oXCIgXCIpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXcmFwcGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWUgfHwgZGVmYXVsdFdyYXBwZXJOYW1lXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXcmFwcGVyQnlUeXBlKHR5cGUpIHtcbiAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICAgIHZhciB3cmFwcGVycyA9IFtdO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiB0ZW1wbGF0ZVdyYXBwZXJzTWFwKSB7XG4gICAgICAgIGlmICh0ZW1wbGF0ZVdyYXBwZXJzTWFwLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgaWYgKHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0udHlwZXMgJiYgdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXS50eXBlcy5pbmRleE9mKHR5cGUpICE9PSAtMSkge1xuICAgICAgICAgICAgd3JhcHBlcnMucHVzaCh0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3cmFwcGVycztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVXcmFwcGVyQnlOYW1lKG5hbWUpIHtcbiAgICAgIHZhciB3cmFwcGVyID0gdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXTtcbiAgICAgIGRlbGV0ZSB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdO1xuICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlV3JhcHBlcnNGb3JUeXBlKHR5cGUpIHtcbiAgICAgIHZhciB3cmFwcGVycyA9IGdldFdyYXBwZXJCeVR5cGUodHlwZSk7XG4gICAgICBpZiAoIXdyYXBwZXJzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghYW5ndWxhci5pc0FycmF5KHdyYXBwZXJzKSkge1xuICAgICAgICByZXR1cm4gcmVtb3ZlV3JhcHBlckJ5TmFtZSh3cmFwcGVycy5uYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyYXBwZXJzLmZvckVhY2goZnVuY3Rpb24gKHdyYXBwZXIpIHtcbiAgICAgICAgICByZXR1cm4gcmVtb3ZlV3JhcHBlckJ5TmFtZSh3cmFwcGVyLm5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHdyYXBwZXJzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgICBpZiAoIV90aGlzLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZm9ybWx5Q29uZmlnLiRpbmplY3QgPSBbXCJmb3JtbHlVc2FiaWxpdHlQcm92aWRlclwiLCBcImZvcm1seUFwaVR5cGVzXCIsIFwiYXBpQ2hlY2tcIl07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5jb25zdGFudChcImZvcm1seVZlcnNpb25cIiwgVkVSU0lPTik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5VmVyc2lvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuY29uc3RhbnQoXCJmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4XCIsIFwiaHR0cHM6Ly9naXRodWIuY29tL2Zvcm1seS1qcy9hbmd1bGFyLWZvcm1seS93aWtpL0Vycm9ycy1hbmQtV2FybmluZ3MjXCIpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHJvdmlkZXJzL2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXguanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmZhY3RvcnkoXCJmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXNcIiwgZnVuY3Rpb24gKCkge1xuXG4gICAgdmFyIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcyA9IHtcbiAgICAgIGFkZFRlbXBsYXRlT3B0aW9uVmFsdWVNZXNzYWdlOiBhZGRUZW1wbGF0ZU9wdGlvblZhbHVlTWVzc2FnZSxcbiAgICAgIGFkZFN0cmluZ01lc3NhZ2U6IGFkZFN0cmluZ01lc3NhZ2UsXG4gICAgICBtZXNzYWdlczoge31cbiAgICB9O1xuXG4gICAgcmV0dXJuIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcztcblxuICAgIGZ1bmN0aW9uIGFkZFRlbXBsYXRlT3B0aW9uVmFsdWVNZXNzYWdlKG5hbWUsIHByb3AsIHByZWZpeCwgc3VmZml4LCBhbHRlcm5hdGUpIHtcbiAgICAgIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlc1tuYW1lXSA9IHRlbXBsYXRlT3B0aW9uVmFsdWUocHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkU3RyaW5nTWVzc2FnZShuYW1lLCBzdHJpbmcpIHtcbiAgICAgIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlc1tuYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdGVtcGxhdGVPcHRpb25WYWx1ZShwcm9wLCBwcmVmaXgsIHN1ZmZpeCwgYWx0ZXJuYXRlKSB7XG4gICAgICByZXR1cm4gZnVuY3Rpb24gZ2V0VmFsaWRhdGlvbk1lc3NhZ2Uodmlld1ZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSkge1xuICAgICAgICBpZiAoc2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbcHJvcF0pIHtcbiAgICAgICAgICByZXR1cm4gXCJcIiArIHByZWZpeCArIFwiIFwiICsgc2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbcHJvcF0gKyBcIiBcIiArIHN1ZmZpeDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYWx0ZXJuYXRlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKFwiLi4vb3RoZXIvdXRpbHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmZhY3RvcnkoXCJmb3JtbHlVdGlsXCIsIGZvcm1seVV0aWwpO1xuXG4gIGZvcm1seVV0aWwudGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZShcIi4vZm9ybWx5VXRpbC50ZXN0XCIpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5VXRpbCgpIHtcbiAgICByZXR1cm4gdXRpbHM7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NlcnZpY2VzL2Zvcm1seVV0aWwuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdG9Db25zdW1hYmxlQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7IGlmIChBcnJheS5pc0FycmF5KGFycikpIHsgZm9yICh2YXIgaSA9IDAsIGFycjIgPSBBcnJheShhcnIubGVuZ3RoKTsgaSA8IGFyci5sZW5ndGg7IGkrKykgYXJyMltpXSA9IGFycltpXTsgcmV0dXJuIGFycjI7IH0gZWxzZSB7IHJldHVybiBBcnJheS5mcm9tKGFycik7IH0gfTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZmFjdG9yeShcImZvcm1seVdhcm5cIiwgW1wiZm9ybWx5Q29uZmlnXCIsIFwiZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeFwiLCBcIiRsb2dcIiwgZnVuY3Rpb24gKGZvcm1seUNvbmZpZywgZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCwgJGxvZykge1xuICAgIHJldHVybiBmdW5jdGlvbiB3YXJuKCkge1xuICAgICAgaWYgKCFmb3JtbHlDb25maWcuZGlzYWJsZVdhcm5pbmdzKSB7XG4gICAgICAgIHZhciBhcmdzID0gQXJyYXkucHJvdG90eXBlLnNsaWNlLmNhbGwoYXJndW1lbnRzKTtcbiAgICAgICAgdmFyIHdhcm5JbmZvU2x1ZyA9IGFyZ3Muc2hpZnQoKTtcbiAgICAgICAgYXJncy51bnNoaWZ0KFwiRm9ybWx5IFdhcm5pbmc6XCIpO1xuICAgICAgICBhcmdzLnB1c2goXCJcIiArIGZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXggKyBcIlwiICsgd2FybkluZm9TbHVnKTtcbiAgICAgICAgJGxvZy53YXJuLmFwcGx5KCRsb2csIF90b0NvbnN1bWFibGVBcnJheShhcmdzKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2VydmljZXMvZm9ybWx5V2Fybi5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKFwiZm9ybWx5Q3VzdG9tVmFsaWRhdGlvblwiLCBmb3JtbHlDdXN0b21WYWxpZGF0aW9uKTtcblxuICBmb3JtbHlDdXN0b21WYWxpZGF0aW9uLnRlc3RzID0gT05fVEVTVCA/IHJlcXVpcmUoXCIuL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi50ZXN0XCIpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbihmb3JtbHlVdGlsLCAkcSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXF1aXJlOiBcIm5nTW9kZWxcIixcbiAgICAgIGxpbms6IGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsLCBhdHRycywgY3RybCkge1xuICAgICAgICB2YXIgdmFsaWRhdG9ycyA9IHNjb3BlLiRldmFsKGF0dHJzLmZvcm1seUN1c3RvbVZhbGlkYXRpb24pO1xuICAgICAgICBpZiAoIXZhbGlkYXRvcnMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY2hlY2tWYWxpZGF0b3JzKHZhbGlkYXRvcnMpO1xuICAgICAgICBzY29wZS5vcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgPSBzY29wZS5vcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgfHwge307XG5cbiAgICAgICAgdmFyIHVzZU5ld1ZhbGlkYXRvcnNBcGkgPSBjdHJsLmhhc093blByb3BlcnR5KFwiJHZhbGlkYXRvcnNcIikgJiYgIWF0dHJzLmhhc093blByb3BlcnR5KFwidXNlUGFyc2Vyc1wiKTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvcnMsIGZ1bmN0aW9uICh2YWxpZGF0b3IsIG5hbWUpIHtcbiAgICAgICAgICB2YXIgbWVzc2FnZSA9IHZhbGlkYXRvci5tZXNzYWdlO1xuICAgICAgICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICAgICAgICBzY29wZS5vcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0gPSBmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHJldHVybiBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIG1lc3NhZ2UsIGN0cmwuJG1vZGVsVmFsdWUsIGN0cmwuJHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YWxpZGF0b3IgPSBhbmd1bGFyLmlzT2JqZWN0KHZhbGlkYXRvcikgPyB2YWxpZGF0b3IuZXhwcmVzc2lvbiA6IHZhbGlkYXRvcjtcbiAgICAgICAgICB2YXIgaXNQb3NzaWJseUFzeW5jID0gIWFuZ3VsYXIuaXNTdHJpbmcodmFsaWRhdG9yKTtcbiAgICAgICAgICBpZiAodXNlTmV3VmFsaWRhdG9yc0FwaSkge1xuICAgICAgICAgICAgc2V0dXBXaXRoVmFsaWRhdG9ycygpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBzZXR1cFdpdGhQYXJzZXJzKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgZnVuY3Rpb24gc2V0dXBXaXRoVmFsaWRhdG9ycygpIHtcbiAgICAgICAgICAgIHZhciB2YWxpZGF0b3JDb2xsZWN0aW9uID0gaXNQb3NzaWJseUFzeW5jID8gXCIkYXN5bmNWYWxpZGF0b3JzXCIgOiBcIiR2YWxpZGF0b3JzXCI7XG4gICAgICAgICAgICBjdHJsW3ZhbGlkYXRvckNvbGxlY3Rpb25dW25hbWVdID0gZnVuY3Rpb24gKG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIHZhbGlkYXRvciwgbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKGlzUG9zc2libHlBc3luYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc1Byb21pc2VMaWtlKHZhbHVlKSA/IHZhbHVlIDogdmFsdWUgPyAkcS53aGVuKHZhbHVlKSA6ICRxLnJlamVjdCh2YWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIHNldHVwV2l0aFBhcnNlcnMoKSB7XG4gICAgICAgICAgICB2YXIgaW5GbGlnaHRWYWxpZGF0b3IgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgICBjdHJsLiRwYXJzZXJzLnVuc2hpZnQoZnVuY3Rpb24gKHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgaXNWYWxpZCA9IGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgdmFsaWRhdG9yLCBjdHJsLiRtb2RlbFZhbHVlLCB2aWV3VmFsdWUpO1xuICAgICAgICAgICAgICBpZiAoaXNQcm9taXNlTGlrZShpc1ZhbGlkKSkge1xuICAgICAgICAgICAgICAgIGN0cmwuJHBlbmRpbmcgPSBjdHJsLiRwZW5kaW5nIHx8IHt9O1xuICAgICAgICAgICAgICAgIGN0cmwuJHBlbmRpbmdbbmFtZV0gPSB0cnVlO1xuICAgICAgICAgICAgICAgIGluRmxpZ2h0VmFsaWRhdG9yID0gaXNWYWxpZDtcbiAgICAgICAgICAgICAgICBpc1ZhbGlkLnRoZW4oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgaWYgKGluRmxpZ2h0VmFsaWRhdG9yID09PSBpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KG5hbWUsIHRydWUpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgaWYgKGluRmxpZ2h0VmFsaWRhdG9yID09PSBpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KG5hbWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVtcImZpbmFsbHlcIl0oZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKGN0cmwuJHBlbmRpbmcpLmxlbmd0aCA9PT0gMSkge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY3RybC4kcGVuZGluZztcbiAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIGRlbGV0ZSBjdHJsLiRwZW5kaW5nW25hbWVdO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KG5hbWUsIGlzVmFsaWQpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIHJldHVybiB2aWV3VmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBpc1Byb21pc2VMaWtlKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBhbmd1bGFyLmlzRnVuY3Rpb24ob2JqLnRoZW4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrVmFsaWRhdG9ycyh2YWxpZGF0b3JzKSB7XG4gICAgICB2YXIgYWxsb3dlZFByb3BlcnRpZXMgPSBbXCJleHByZXNzaW9uXCIsIFwibWVzc2FnZVwiXTtcbiAgICAgIHZhciB2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMgPSB7fTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3JzLCBmdW5jdGlvbiAodmFsaWRhdG9yLCBuYW1lKSB7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHZhbGlkYXRvcikpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV4dHJhUHJvcHMgPSBbXTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvciwgZnVuY3Rpb24gKHYsIGtleSkge1xuICAgICAgICAgIGlmIChhbGxvd2VkUHJvcGVydGllcy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICBleHRyYVByb3BzLnB1c2goa2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZXh0cmFQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICB2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHNbbmFtZV0gPSBleHRyYVByb3BzO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChPYmplY3Qua2V5cyh2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMpLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoW1wiVmFsaWRhdG9ycyBhcmUgb25seSBhbGxvd2VkIHRvIGJlIGZ1bmN0aW9ucyBvciBvYmplY3RzIHRoYXQgaGF2ZSBcIiArIGFsbG93ZWRQcm9wZXJ0aWVzLmpvaW4oXCIsIFwiKSArIFwiLlwiLCBcIllvdSBwcm92aWRlZCBzb21lIGV4dHJhIHByb3BlcnRpZXM6IFwiICsgSlNPTi5zdHJpbmdpZnkodmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzKV0uam9pbihcIiBcIikpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmb3JtbHlDdXN0b21WYWxpZGF0aW9uLiRpbmplY3QgPSBbXCJmb3JtbHlVdGlsXCIsIFwiJHFcIl07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kaXJlY3RpdmVzL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhci1maXhcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmRpcmVjdGl2ZShcImZvcm1seUZpZWxkXCIsIGZvcm1seUZpZWxkKTtcblxuICBmb3JtbHlGaWVsZC50ZXN0cyA9IE9OX1RFU1QgPyByZXF1aXJlKFwiLi9mb3JtbHktZmllbGQudGVzdFwiKShuZ01vZHVsZSkgOiBudWxsO1xuXG4gIGZ1bmN0aW9uIGZvcm1seUZpZWxkKCRodHRwLCAkcSwgJGNvbXBpbGUsICR0ZW1wbGF0ZUNhY2hlLCBmb3JtbHlDb25maWcsIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcywgZm9ybWx5VXRpbCwgZm9ybWx5VXNhYmlsaXR5LCBmb3JtbHlXYXJuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiBcIkFFXCIsXG4gICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgb3B0aW9uczogXCI9XCIsXG4gICAgICAgIG1vZGVsOiBcIj1cIixcbiAgICAgICAgZm9ybUlkOiBcIj0/XCIsXG4gICAgICAgIGluZGV4OiBcIj0/XCIsXG4gICAgICAgIGZpZWxkczogXCI9P1wiLFxuICAgICAgICBmb3JtOiBcIj0/XCJcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBbXCIkc2NvcGVcIiwgXCIkdGltZW91dFwiLCBcIiRwYXJzZVwiLCBcIiRjb250cm9sbGVyXCIsIGZ1bmN0aW9uIGZpZWxkQ29udHJvbGxlcigkc2NvcGUsICR0aW1lb3V0LCAkcGFyc2UsICRjb250cm9sbGVyKSB7XG4gICAgICAgIHZhciBvcHRzID0gJHNjb3BlLm9wdGlvbnM7XG4gICAgICAgIHZhciBmaWVsZFR5cGUgPSBvcHRzLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0cy50eXBlKTtcbiAgICAgICAgc2ltcGxpZnlMaWZlKG9wdHMpO1xuICAgICAgICBtZXJnZUZpZWxkT3B0aW9uc1dpdGhUeXBlRGVmYXVsdHMob3B0cywgZmllbGRUeXBlKTtcbiAgICAgICAgYXBpQ2hlY2sob3B0cyk7XG4gICAgICAgIC8vIHNldCBmaWVsZCBpZCB0byBsaW5rIGxhYmVscyBhbmQgZmllbGRzXG4gICAgICAgICRzY29wZS5pZCA9IGZvcm1seVV0aWwuZ2V0RmllbGRJZCgkc2NvcGUuZm9ybUlkLCBvcHRzLCAkc2NvcGUuaW5kZXgpO1xuXG4gICAgICAgIC8vIGluaXRhbGl6YXRpb25cbiAgICAgICAgZXh0ZW5kT3B0aW9uc1dpdGhEZWZhdWx0cyhvcHRzLCAkc2NvcGUuaW5kZXgpO1xuICAgICAgICBydW5FeHByZXNzaW9ucygpO1xuICAgICAgICBzZXRGb3JtQ29udHJvbCgkc2NvcGUsIG9wdHMpO1xuICAgICAgICBhZGRNb2RlbFdhdGNoZXIoJHNjb3BlLCBvcHRzKTtcbiAgICAgICAgYWRkVmFsaWRhdGlvbk1lc3NhZ2VzKG9wdHMpO1xuICAgICAgICAvLyBzaW1wbGlmeSB0aGluZ3NcbiAgICAgICAgLy8gY3JlYXRlICRzY29wZS50byBzbyB0ZW1wbGF0ZSBhdXRob3JzIGNhbiByZWZlcmVuY2UgdG8gaW5zdGVhZCBvZiAkc2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNcbiAgICAgICAgJHNjb3BlLnRvID0gJHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zO1xuICAgICAgICBpbnZva2VDb250cm9sbGVycygkc2NvcGUsIG9wdHMsIGZpZWxkVHlwZSk7XG5cbiAgICAgICAgLy8gZnVuY3Rpb24gZGVmaW5pdGlvbnNcbiAgICAgICAgZnVuY3Rpb24gcnVuRXhwcmVzc2lvbnMoKSB7XG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gbXVzdCBydW4gb24gbmV4dCB0aWNrIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBjdXJyZW50IHZhbHVlIGlzIGNvcnJlY3QuXG4gICAgICAgICAgICB2YXIgZmllbGQgPSAkc2NvcGUub3B0aW9ucztcbiAgICAgICAgICAgIHZhciBjdXJyZW50VmFsdWUgPSB2YWx1ZUdldHRlclNldHRlcigpO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGZpZWxkLmV4cHJlc3Npb25Qcm9wZXJ0aWVzLCBmdW5jdGlvbiBydW5FeHByZXNzaW9uKGV4cHJlc3Npb24sIHByb3ApIHtcbiAgICAgICAgICAgICAgdmFyIHNldHRlciA9ICRwYXJzZShwcm9wKS5hc3NpZ247XG4gICAgICAgICAgICAgIHZhciBwcm9taXNlID0gJHEud2hlbihmb3JtbHlVdGlsLmZvcm1seUV2YWwoJHNjb3BlLCBleHByZXNzaW9uLCBjdXJyZW50VmFsdWUpKTtcbiAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHNldHRlcihmaWVsZCwgdmFsdWUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdmFsdWVHZXR0ZXJTZXR0ZXIobmV3VmFsKSB7XG4gICAgICAgICAgaWYgKCEkc2NvcGUubW9kZWwgfHwgISRzY29wZS5vcHRpb25zLmtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQobmV3VmFsKSkge1xuICAgICAgICAgICAgJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV0gPSBuZXdWYWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNpbXBsaWZ5TGlmZShvcHRpb25zKSB7XG4gICAgICAgICAgLy8gYWRkIGEgZmV3IGVtcHR5IG9iamVjdHMgKGlmIHRoZXkgZG9uJ3QgYWxyZWFkeSBleGlzdCkgc28geW91IGRvbid0IGhhdmUgdG8gdW5kZWZpbmVkIGNoZWNrIGV2ZXJ5d2hlcmVcbiAgICAgICAgICBmb3JtbHlVdGlsLnJldmVyc2VEZWVwTWVyZ2Uob3B0aW9ucywge1xuICAgICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgICB0ZW1wbGF0ZU9wdGlvbnM6IHt9LFxuICAgICAgICAgICAgdmFsaWRhdGlvbjoge31cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1lcmdlRmllbGRPcHRpb25zV2l0aFR5cGVEZWZhdWx0cyhvcHRpb25zLCB0eXBlKSB7XG4gICAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgIG1lcmdlT3B0aW9ucyhvcHRpb25zLCB0eXBlLmRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHByb3Blck9yZGVyID0gYXJyYXlpZnkob3B0aW9ucy5vcHRpb25zVHlwZXMpLnJldmVyc2UoKTsgLy8gc28gdGhlIHJpZ2h0IHRoaW5ncyBhcmUgb3ZlcnJpZGRlblxuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChwcm9wZXJPcmRlciwgZnVuY3Rpb24gKHR5cGVOYW1lKSB7XG4gICAgICAgICAgICBtZXJnZU9wdGlvbnMob3B0aW9ucywgZm9ybWx5Q29uZmlnLmdldFR5cGUodHlwZU5hbWUsIHRydWUsIG9wdGlvbnMpLmRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1lcmdlT3B0aW9ucyhvcHRpb25zLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAoZXh0cmFPcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGV4dHJhT3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgZXh0cmFPcHRpb25zID0gZXh0cmFPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9ybWx5VXRpbC5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIGV4dHJhT3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZXh0ZW5kT3B0aW9uc1dpdGhEZWZhdWx0cyhvcHRpb25zLCBpbmRleCkge1xuICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKG9wdGlvbnMsIHtcbiAgICAgICAgICAgIC8vIGF0dGFjaCB0aGUga2V5IGluIGNhc2UgdGhlIGZvcm1seS1maWVsZCBkaXJlY3RpdmUgaXMgdXNlZCBkaXJlY3RseVxuICAgICAgICAgICAga2V5OiBvcHRpb25zLmtleSB8fCBpbmRleCB8fCAwLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlR2V0dGVyU2V0dGVyLFxuICAgICAgICAgICAgcnVuRXhwcmVzc2lvbnM6IHJ1bkV4cHJlc3Npb25zXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbml0aWFsaXphdGlvbiBmdW5jdGlvbnNcbiAgICAgICAgZnVuY3Rpb24gc2V0Rm9ybUNvbnRyb2woc2NvcGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5ub0Zvcm1Db250cm9sKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBzdG9wV2FpdGluZ0ZvckRlc3Ryb3k7XG4gICAgICAgICAgdmFyIG1heFRpbWUgPSAyMDAwO1xuICAgICAgICAgIHZhciBpbnRlcnZhbFRpbWUgPSA1O1xuICAgICAgICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICAgICAgICB2YXIgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdGVyYXRpb25zKys7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMua2V5KSkge1xuICAgICAgICAgICAgICByZXR1cm4gY2xlYW5VcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGZvcm1Db250cm9sID0gc2NvcGUuZm9ybSAmJiBzY29wZS5mb3JtW3Njb3BlLmlkXTtcbiAgICAgICAgICAgIGlmIChmb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgICBvcHRpb25zLmZvcm1Db250cm9sID0gZm9ybUNvbnRyb2w7XG4gICAgICAgICAgICAgIHNjb3BlLmZjID0gZm9ybUNvbnRyb2w7XG4gICAgICAgICAgICAgIGFkZFNob3dNZXNzYWdlc1dhdGNoZXIoc2NvcGUsIG9wdGlvbnMpO1xuICAgICAgICAgICAgICBjbGVhblVwKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGludGVydmFsVGltZSAqIGl0ZXJhdGlvbnMgPiBtYXhUaW1lKSB7XG4gICAgICAgICAgICAgIGZvcm1seVdhcm4oXCJjb3VsZG50LXNldC10aGUtZm9ybWNvbnRyb2wtYWZ0ZXItdGltZW1zXCIsIFwiQ291bGRuJ3Qgc2V0IHRoZSBmb3JtQ29udHJvbCBhZnRlciBcIiArIG1heFRpbWUgKyBcIm1zXCIsIHNjb3BlKTtcbiAgICAgICAgICAgICAgY2xlYW5VcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGludGVydmFsVGltZSk7XG4gICAgICAgICAgc3RvcFdhaXRpbmdGb3JEZXN0cm95ID0gc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgY2xlYW5VcCk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBjbGVhblVwKCkge1xuICAgICAgICAgICAgc3RvcFdhaXRpbmdGb3JEZXN0cm95KCk7XG4gICAgICAgICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRNb2RlbFdhdGNoZXIoc2NvcGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5tb2RlbCkge1xuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKFwib3B0aW9ucy5tb2RlbFwiLCBydW5FeHByZXNzaW9ucywgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkU2hvd01lc3NhZ2VzV2F0Y2hlcihzY29wZSwgb3B0aW9ucykge1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5zaG93ID09PSBcImJvb2xlYW5cIikge1xuICAgICAgICAgICAgICByZXR1cm4gc2NvcGUuZmMuJGludmFsaWQgJiYgc2NvcGUub3B0aW9ucy52YWxpZGF0aW9uLnNob3c7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICByZXR1cm4gc2NvcGUuZmMuJGludmFsaWQgJiYgc2NvcGUuZmMuJHRvdWNoZWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgZnVuY3Rpb24gKHNob3cpIHtcbiAgICAgICAgICAgIG9wdGlvbnMudmFsaWRhdGlvbi5lcnJvckV4aXN0c0FuZFNob3VsZEJlVmlzaWJsZSA9IHNob3c7XG4gICAgICAgICAgICBzY29wZS5zaG93RXJyb3IgPSBzaG93O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkVmFsaWRhdGlvbk1lc3NhZ2VzKG9wdGlvbnMpIHtcbiAgICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgPSBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgfHwge307XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlcywgZnVuY3Rpb24gKGV4cHJlc3Npb24sIG5hbWUpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzW25hbWVdKSB7XG4gICAgICAgICAgICAgIG9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlc1tuYW1lXSA9IGZ1bmN0aW9uICh2aWV3VmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgZXhwcmVzc2lvbiwgbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGludm9rZUNvbnRyb2xsZXJzKHNjb3BlKSB7XG4gICAgICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuICAgICAgICAgIHZhciB0eXBlID0gYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1syXTtcblxuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChbdHlwZS5jb250cm9sbGVyLCBvcHRpb25zLmNvbnRyb2xsZXJdLCBmdW5jdGlvbiAoY29udHJvbGxlcikge1xuICAgICAgICAgICAgaWYgKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgICAgJGNvbnRyb2xsZXIoY29udHJvbGxlciwgeyAkc2NvcGU6IHNjb3BlIH0pO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uIGZpZWxkTGluayhzY29wZSwgZWwpIHtcbiAgICAgICAgdmFyIHR5cGUgPSBzY29wZS5vcHRpb25zLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUoc2NvcGUub3B0aW9ucy50eXBlKTtcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XG4gICAgICAgIHZhciB0aHVzbHkgPSB0aGlzO1xuICAgICAgICBnZXRGaWVsZFRlbXBsYXRlKHNjb3BlLm9wdGlvbnMpLnRoZW4ocnVuTWFuaXB1bGF0b3JzKGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wcmVXcmFwcGVyKSkudGhlbih0cmFuc2NsdWRlSW5XcmFwcGVycyhzY29wZS5vcHRpb25zKSkudGhlbihydW5NYW5pcHVsYXRvcnMoZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnBvc3RXcmFwcGVyKSkudGhlbihzZXRFbGVtZW50VGVtcGxhdGUpW1wiY2F0Y2hcIl0oZnVuY3Rpb24gKGVycm9yKSB7XG4gICAgICAgICAgZm9ybWx5V2FybihcInRoZXJlLXdhcy1hLXByb2JsZW0tc2V0dGluZy10aGUtdGVtcGxhdGUtZm9yLXRoaXMtZmllbGRcIiwgXCJUaGVyZSB3YXMgYSBwcm9ibGVtIHNldHRpbmcgdGhlIHRlbXBsYXRlIGZvciB0aGlzIGZpZWxkIFwiLCBzY29wZS5vcHRpb25zLCBlcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNldEVsZW1lbnRUZW1wbGF0ZSh0ZW1wbGF0ZUVsKSB7XG4gICAgICAgICAgZWwuaHRtbChhc0h0bWwodGVtcGxhdGVFbCkpO1xuICAgICAgICAgICRjb21waWxlKGVsLmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgICBpZiAodHlwZSAmJiB0eXBlLmxpbmspIHtcbiAgICAgICAgICAgIHR5cGUubGluay5hcHBseSh0aHVzbHksIGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2NvcGUub3B0aW9ucy5saW5rKSB7XG4gICAgICAgICAgICBzY29wZS5vcHRpb25zLmxpbmsuYXBwbHkodGh1c2x5LCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBydW5NYW5pcHVsYXRvcnMobWFuaXB1bGF0b3JzKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHJ1bk1hbmlwdWxhdG9yc09uVGVtcGxhdGUodGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHZhciBjaGFpbiA9ICRxLndoZW4odGVtcGxhdGUpO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKG1hbmlwdWxhdG9ycywgZnVuY3Rpb24gKG1hbmlwdWxhdG9yKSB7XG4gICAgICAgICAgICAgIGNoYWluID0gY2hhaW4udGhlbihmdW5jdGlvbiAodGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gJHEud2hlbihtYW5pcHVsYXRvcih0ZW1wbGF0ZSwgc2NvcGUub3B0aW9ucywgc2NvcGUpKS50aGVuKGZ1bmN0aW9uIChuZXdUZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNTdHJpbmcobmV3VGVtcGxhdGUpID8gbmV3VGVtcGxhdGUgOiBhc0h0bWwobmV3VGVtcGxhdGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYXNIdG1sKGVsKSB7XG4gICAgICB2YXIgd3JhcHBlciA9IGFuZ3VsYXIuZWxlbWVudChcIjxhPjwvYT5cIik7XG4gICAgICByZXR1cm4gd3JhcHBlci5hcHBlbmQoZWwpLmh0bWwoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZFRlbXBsYXRlKG9wdGlvbnMpIHtcbiAgICAgIHZhciB0eXBlID0gZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0aW9ucy50eXBlLCB0cnVlLCBvcHRpb25zKTtcbiAgICAgIHZhciB0ZW1wbGF0ZSA9IG9wdGlvbnMudGVtcGxhdGUgfHwgdHlwZSAmJiB0eXBlLnRlbXBsYXRlO1xuICAgICAgdmFyIHRlbXBsYXRlVXJsID0gb3B0aW9ucy50ZW1wbGF0ZVVybCB8fCB0eXBlICYmIHR5cGUudGVtcGxhdGVVcmw7XG4gICAgICBpZiAoIXRlbXBsYXRlICYmICF0ZW1wbGF0ZVVybCkge1xuICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0RmllbGRFcnJvcihcInRlbXBsYXRlLXR5cGUtdHlwZS1ub3Qtc3VwcG9ydGVkXCIsIFwidGVtcGxhdGUgdHlwZSAnXCIgKyBvcHRpb25zLnR5cGUgKyBcIicgbm90IHN1cHBvcnRlZC4gT24gZWxlbWVudDpcIiwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZ2V0VGVtcGxhdGUodGVtcGxhdGUgfHwgdGVtcGxhdGVVcmwsICF0ZW1wbGF0ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0VGVtcGxhdGUodGVtcGxhdGUsIGlzVXJsKSB7XG4gICAgICBpZiAoIWlzVXJsKSB7XG4gICAgICAgIHJldHVybiAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBodHRwT3B0aW9ucyA9IHsgY2FjaGU6ICR0ZW1wbGF0ZUNhY2hlIH07XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQodGVtcGxhdGUsIGh0dHBPcHRpb25zKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIGZvcm1seVdhcm4oXCJwcm9ibGVtLWxvYWRpbmctdGVtcGxhdGUtZm9yLXRlbXBsYXRldXJsXCIsIFwiUHJvYmxlbSBsb2FkaW5nIHRlbXBsYXRlIGZvciBcIiArIHRlbXBsYXRlLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zY2x1ZGVJbldyYXBwZXJzKG9wdGlvbnMpIHtcbiAgICAgIHZhciB3cmFwcGVyID0gZ2V0V3JhcHBlck9wdGlvbihvcHRpb25zKTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRyYW5zY2x1ZGVUZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgICBpZiAoIXdyYXBwZXIubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuICRxLndoZW4odGVtcGxhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgd3JhcHBlci5mb3JFYWNoKGZvcm1seVVzYWJpbGl0eS5jaGVja1dyYXBwZXIpO1xuICAgICAgICB2YXIgcHJvbWlzZXMgPSB3cmFwcGVyLm1hcChmdW5jdGlvbiAodykge1xuICAgICAgICAgIHJldHVybiBnZXRUZW1wbGF0ZSh3LnRlbXBsYXRlIHx8IHcudGVtcGxhdGVVcmwsICF3LnRlbXBsYXRlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAkcS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24gKHdyYXBwZXJzVGVtcGxhdGVzKSB7XG4gICAgICAgICAgd3JhcHBlcnNUZW1wbGF0ZXMuZm9yRWFjaChmdW5jdGlvbiAod3JhcHBlclRlbXBsYXRlLCBpbmRleCkge1xuICAgICAgICAgICAgZm9ybWx5VXNhYmlsaXR5LmNoZWNrV3JhcHBlclRlbXBsYXRlKHdyYXBwZXJUZW1wbGF0ZSwgd3JhcHBlcltpbmRleF0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLnJldmVyc2UoKTsgLy8gd3JhcHBlciAwIGlzIHdyYXBwZWQgaW4gd3JhcHBlciAxIGFuZCBzbyBvbi4uLlxuICAgICAgICAgIHZhciB0b3RhbFdyYXBwZXIgPSB3cmFwcGVyc1RlbXBsYXRlcy5zaGlmdCgpO1xuICAgICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLmZvckVhY2goZnVuY3Rpb24gKHdyYXBwZXJUZW1wbGF0ZSkge1xuICAgICAgICAgICAgdG90YWxXcmFwcGVyID0gZG9UcmFuc2NsdXNpb24odG90YWxXcmFwcGVyLCB3cmFwcGVyVGVtcGxhdGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBkb1RyYW5zY2x1c2lvbih0b3RhbFdyYXBwZXIsIHRlbXBsYXRlKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRvVHJhbnNjbHVzaW9uKHdyYXBwZXIsIHRlbXBsYXRlKSB7XG4gICAgICB2YXIgc3VwZXJXcmFwcGVyID0gYW5ndWxhci5lbGVtZW50KFwiPGE+PC9hPlwiKTsgLy8gdGhpcyBhbGxvd3MgcGVvcGxlIG5vdCBoYXZlIHRvIGhhdmUgYSBzaW5nbGUgcm9vdCBpbiB3cmFwcGVyc1xuICAgICAgc3VwZXJXcmFwcGVyLmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgIHZhciB0cmFuc2NsdWRlRWwgPSBzdXBlcldyYXBwZXIuZmluZChcImZvcm1seS10cmFuc2NsdWRlXCIpO1xuICAgICAgdHJhbnNjbHVkZUVsLnJlcGxhY2VXaXRoKHRlbXBsYXRlKTtcbiAgICAgIHJldHVybiBzdXBlcldyYXBwZXIuaHRtbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdyYXBwZXJPcHRpb24ob3B0aW9ucykge1xuICAgICAgdmFyIHdyYXBwZXIgPSBvcHRpb25zLndyYXBwZXI7XG4gICAgICAvLyBleHBsaWNpdCBudWxsIG1lYW5zIG5vIHdyYXBwZXJcbiAgICAgIGlmICh3cmFwcGVyID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cblxuICAgICAgLy8gbm90aGluZyBzcGVjaWZpZWQgbWVhbnMgdXNlIHRoZSBkZWZhdWx0IHdyYXBwZXIgZm9yIHRoZSB0eXBlXG4gICAgICBpZiAoIXdyYXBwZXIpIHtcbiAgICAgICAgLy8gZ2V0IGFsbCB3cmFwcGVycyB0aGF0IHNwZWNpZnkgdGhleSBhcHBseSB0byB0aGlzIHR5cGVcbiAgICAgICAgd3JhcHBlciA9IGFycmF5aWZ5KGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyQnlUeXBlKG9wdGlvbnMudHlwZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3JhcHBlciA9IGFycmF5aWZ5KHdyYXBwZXIpLm1hcChmb3JtbHlDb25maWcuZ2V0V3JhcHBlcik7XG4gICAgICB9XG5cbiAgICAgIC8vIGdldCBhbGwgd3JhcHBlcnMgZm9yIHRoYXQgdGhpcyB0eXBlIHNwZWNpZmllZCB0aGF0IGl0IHVzZXMuXG4gICAgICB2YXIgdHlwZSA9IGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSwgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgICBpZiAodHlwZSAmJiB0eXBlLndyYXBwZXIpIHtcbiAgICAgICAgdmFyIHR5cGVXcmFwcGVycyA9IGFycmF5aWZ5KHR5cGUud3JhcHBlcikubWFwKGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKTtcbiAgICAgICAgd3JhcHBlciA9IHdyYXBwZXIuY29uY2F0KHR5cGVXcmFwcGVycyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFkZCB0aGUgZGVmYXVsdCB3cmFwcGVyIGxhc3RcbiAgICAgIHZhciBkZWZhdWx0V3JhcHBlciA9IGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKCk7XG4gICAgICBpZiAoZGVmYXVsdFdyYXBwZXIpIHtcbiAgICAgICAgd3JhcHBlci5wdXNoKGRlZmF1bHRXcmFwcGVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwaUNoZWNrKG9wdGlvbnMpIHtcbiAgICAgIHZhciB0ZW1wbGF0ZU9wdGlvbnMgPSBnZXRUZW1wbGF0ZU9wdGlvbnNDb3VudChvcHRpb25zKTtcbiAgICAgIGlmICh0ZW1wbGF0ZU9wdGlvbnMgPT09IDApIHtcbiAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXCJ5b3UtbXVzdC1wcm92aWRlLW9uZS1vZi10eXBlLXRlbXBsYXRlLW9yLXRlbXBsYXRldXJsLWZvci1hLWZpZWxkXCIsIFwiWW91IG11c3QgcHJvdmlkZSBvbmUgb2YgdHlwZSwgdGVtcGxhdGUsIG9yIHRlbXBsYXRlVXJsIGZvciBhIGZpZWxkXCIsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIGlmICh0ZW1wbGF0ZU9wdGlvbnMgPiAxKSB7XG4gICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFwieW91LW11c3Qtb25seS1wcm92aWRlLWEtdHlwZS10ZW1wbGF0ZS1vci10ZW1wbGF0ZXVybC1mb3ItYS1maWVsZFwiLCBcIllvdSBtdXN0IG9ubHkgcHJvdmlkZSBhIHR5cGUsIHRlbXBsYXRlLCBvciB0ZW1wbGF0ZVVybCBmb3IgYSBmaWVsZFwiLCBvcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgdGhhdCBvbmx5IGFsbG93ZWQgcHJvcGVydGllcyBhcmUgcHJvdmlkZWRcbiAgICAgIHZhciBhbGxvd2VkUHJvcGVydGllcyA9IFtcInR5cGVcIiwgXCJ0ZW1wbGF0ZVwiLCBcInRlbXBsYXRlVXJsXCIsIFwia2V5XCIsIFwibW9kZWxcIiwgXCJleHByZXNzaW9uUHJvcGVydGllc1wiLCBcImRhdGFcIiwgXCJ0ZW1wbGF0ZU9wdGlvbnNcIiwgXCJ3cmFwcGVyXCIsIFwibW9kZWxPcHRpb25zXCIsIFwid2F0Y2hlclwiLCBcInZhbGlkYXRvcnNcIiwgXCJub0Zvcm1Db250cm9sXCIsIFwiaGlkZVwiLCBcIm5nTW9kZWxBdHRyc1wiLCBcIm9wdGlvbnNUeXBlc1wiLCBcImxpbmtcIiwgXCJjb250cm9sbGVyXCIsIFwidmFsaWRhdGlvblwiLFxuICAgICAgLy8gdGhpbmdzIHdlIGFkZCB0byB0aGUgZmllbGQgYWZ0ZXIgdGhlIGZhY3QgYXJlIG9rXG4gICAgICBcImZvcm1Db250cm9sXCIsIFwidmFsdWVcIiwgXCJydW5FeHByZXNzaW9uc1wiXTtcbiAgICAgIGZvcm1seVVzYWJpbGl0eS5jaGVja0FsbG93ZWRQcm9wZXJ0aWVzKGFsbG93ZWRQcm9wZXJ0aWVzLCBvcHRpb25zKTtcblxuICAgICAgLy8gdmFsaWRhdGUgd2l0aCB0aGUgdHlwZVxuICAgICAgdmFyIHR5cGUgPSBvcHRpb25zLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0aW9ucy50eXBlKTtcbiAgICAgIGlmICh0eXBlICYmIHR5cGUudmFsaWRhdGVPcHRpb25zKSB7XG4gICAgICAgIHR5cGUudmFsaWRhdGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRUZW1wbGF0ZU9wdGlvbnNDb3VudChvcHRpb25zKSB7XG4gICAgICAgIHZhciB0ZW1wbGF0ZU9wdGlvbnMgPSAwO1xuICAgICAgICB0ZW1wbGF0ZU9wdGlvbnMgKz0gYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy50ZW1wbGF0ZSkgPyAxIDogMDtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zICs9IGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudHlwZSkgPyAxIDogMDtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zICs9IGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudGVtcGxhdGVVcmwpID8gMSA6IDA7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZU9wdGlvbnM7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZvcm1seUZpZWxkLiRpbmplY3QgPSBbXCIkaHR0cFwiLCBcIiRxXCIsIFwiJGNvbXBpbGVcIiwgXCIkdGVtcGxhdGVDYWNoZVwiLCBcImZvcm1seUNvbmZpZ1wiLCBcImZvcm1seVZhbGlkYXRpb25NZXNzYWdlc1wiLCBcImZvcm1seVV0aWxcIiwgXCJmb3JtbHlVc2FiaWxpdHlcIiwgXCJmb3JtbHlXYXJuXCJdO1xuXG4gIGZ1bmN0aW9uIGFycmF5aWZ5KG9iaikge1xuICAgIGlmIChvYmogJiYgIWFuZ3VsYXIuaXNBcnJheShvYmopKSB7XG4gICAgICBvYmogPSBbb2JqXTtcbiAgICB9IGVsc2UgaWYgKCFvYmopIHtcbiAgICAgIG9iaiA9IFtdO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kaXJlY3RpdmVzL2Zvcm1seS1maWVsZC5qc1xuICoqIG1vZHVsZSBpZCA9IDE3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF90b0NvbnN1bWFibGVBcnJheSA9IGZ1bmN0aW9uIChhcnIpIHsgaWYgKEFycmF5LmlzQXJyYXkoYXJyKSkgeyBmb3IgKHZhciBpID0gMCwgYXJyMiA9IEFycmF5KGFyci5sZW5ndGgpOyBpIDwgYXJyLmxlbmd0aDsgaSsrKSBhcnIyW2ldID0gYXJyW2ldOyByZXR1cm4gYXJyMjsgfSBlbHNlIHsgcmV0dXJuIEFycmF5LmZyb20oYXJyKTsgfSB9O1xuXG52YXIgX3NsaWNlID0gQXJyYXkucHJvdG90eXBlLnNsaWNlO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhci1maXhcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmRpcmVjdGl2ZShcImZvcm1seUZvcm1cIiwgZm9ybWx5Rm9ybSk7XG5cbiAgZm9ybWx5Rm9ybS50ZXN0cyA9IE9OX1RFU1QgPyByZXF1aXJlKFwiLi9mb3JtbHktZm9ybS50ZXN0XCIpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5Rm9ybShmb3JtbHlVc2FiaWxpdHkpIHtcbiAgICB2YXIgY3VycmVudEZvcm1JZCA9IDE7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiBcIkVcIixcbiAgICAgIHRlbXBsYXRlOiBmdW5jdGlvbiB0ZW1wbGF0ZShlbCwgYXR0cnMpIHtcbiAgICAgICAgLyoganNoaW50IC1XMDMzICovIC8vIHRoaXMgYmVjYXVzZSBqc2hpbnQgaXMgYnJva2VuIEkgZ3Vlc3MuLi5cbiAgICAgICAgdmFyIHJvb3RFbCA9IGF0dHJzLnJvb3RFbCB8fCBcIm5nLWZvcm1cIjtcbiAgICAgICAgcmV0dXJuIFwiXFxuICAgICAgICAgIDxcIiArIHJvb3RFbCArIFwiIGNsYXNzPVxcXCJmb3JtbHlcXFwiXFxuICAgICAgICAgICAgICAgICAgIG5hbWU9XFxcImZvcm1cXFwiXFxuICAgICAgICAgICAgICAgICAgIHJvbGU9XFxcImZvcm1cXFwiPlxcbiAgICAgICAgICAgIDxkaXYgZm9ybWx5LWZpZWxkXFxuICAgICAgICAgICAgICAgICBuZy1yZXBlYXQ9XFxcImZpZWxkIGluIGZpZWxkcyB0cmFjayBieSAkaW5kZXhcXFwiXFxuICAgICAgICAgICAgICAgICBuZy1pZj1cXFwiIWZpZWxkLmhpZGVcXFwiXFxuICAgICAgICAgICAgICAgICBjbGFzcz1cXFwiZm9ybWx5LWZpZWxkIHt7ZmllbGQudHlwZSA/ICdmb3JtbHktZmllbGQtJyArIGZpZWxkLnR5cGUgOiAnJ319XFxcIlxcbiAgICAgICAgICAgICAgICAgb3B0aW9ucz1cXFwiZmllbGRcXFwiXFxuICAgICAgICAgICAgICAgICBtb2RlbD1cXFwiZmllbGQubW9kZWwgfHwgbW9kZWxcXFwiXFxuICAgICAgICAgICAgICAgICBmaWVsZHM9XFxcImZpZWxkc1xcXCJcXG4gICAgICAgICAgICAgICAgIGZvcm09XFxcImZvcm1cXFwiXFxuICAgICAgICAgICAgICAgICBmb3JtLWlkPVxcXCJmb3JtSWRcXFwiXFxuICAgICAgICAgICAgICAgICBpbmRleD1cXFwiJGluZGV4XFxcIj5cXG4gICAgICAgICAgICA8L2Rpdj5cXG4gICAgICAgICAgICA8ZGl2IG5nLXRyYW5zY2x1ZGU+PC9kaXY+XFxuICAgICAgICAgIDwvXCIgKyByb290RWwgKyBcIj5cXG4gICAgICAgIFwiO1xuICAgICAgfSxcbiAgICAgIHJlcGxhY2U6IHRydWUsXG4gICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgZmllbGRzOiBcIj1cIixcbiAgICAgICAgbW9kZWw6IFwiPT9cIiwgLy8gd2UnbGwgZG8gb3VyIG93biB3YXJuaW5nIHRvIGhlbHAgd2l0aCBtaWdyYXRpb25zXG4gICAgICAgIGZvcm06IFwiPT9cIlxuICAgICAgfSxcbiAgICAgIGNvbnRyb2xsZXI6IFtcIiRzY29wZVwiLCBmdW5jdGlvbiBjb250cm9sbGVyKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUuZm9ybUlkID0gXCJmb3JtbHlfXCIgKyBjdXJyZW50Rm9ybUlkKys7XG5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGF0dGFjaEtleSk7IC8vIGF0dGFjaGVzIGEga2V5IGJhc2VkIG9uIHRoZSBpbmRleCBpZiBhIGtleSBpc24ndCBzcGVjaWZpZWRcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIHNldHVwV2F0Y2hlcnMpOyAvLyBzZXR1cCB3YXRjaGVycyBmb3IgYWxsIGZpZWxkc1xuXG4gICAgICAgIC8vIHdhdGNoIHRoZSBtb2RlbCBhbmQgZXZhbHVhdGUgd2F0Y2ggZXhwcmVzc2lvbnMgdGhhdCBkZXBlbmQgb24gaXQuXG4gICAgICAgICRzY29wZS4kd2F0Y2goXCJtb2RlbFwiLCBmdW5jdGlvbiBvblJlc3VsdFVwZGF0ZShuZXdSZXN1bHQpIHtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAvKmpzaGludCAtVzAzMCAqL1xuICAgICAgICAgICAgZmllbGQucnVuRXhwcmVzc2lvbnMgJiYgZmllbGQucnVuRXhwcmVzc2lvbnMobmV3UmVzdWx0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gYXR0YWNoS2V5KGZpZWxkLCBpbmRleCkge1xuICAgICAgICAgIGZpZWxkLmtleSA9IGZpZWxkLmtleSB8fCBpbmRleCB8fCAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0dXBXYXRjaGVycyhmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGZpZWxkLndhdGNoZXIpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciB3YXRjaGVycyA9IGZpZWxkLndhdGNoZXI7XG4gICAgICAgICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkod2F0Y2hlcnMpKSB7XG4gICAgICAgICAgICB3YXRjaGVycyA9IFt3YXRjaGVyc107XG4gICAgICAgICAgfVxuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh3YXRjaGVycywgZnVuY3Rpb24gKHdhdGNoZXIpIHtcbiAgICAgICAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQod2F0Y2hlci5saXN0ZW5lcikpIHtcbiAgICAgICAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXCJhbGwtZmllbGQtd2F0Y2hlcnMtbXVzdC1oYXZlLWEtbGlzdGVuZXJcIiwgXCJBbGwgZmllbGQgd2F0Y2hlcnMgbXVzdCBoYXZlIGEgbGlzdGVuZXJcIiwgZmllbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHdhdGNoRXhwcmVzc2lvbiA9IGdldFdhdGNoRXhwcmVzc2lvbih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpO1xuICAgICAgICAgICAgdmFyIHdhdGNoTGlzdGVuZXIgPSBnZXRXYXRjaExpc3RlbmVyKHdhdGNoZXIsIGZpZWxkLCBpbmRleCk7XG5cbiAgICAgICAgICAgIHZhciB0eXBlID0gd2F0Y2hlci50eXBlIHx8IFwiJHdhdGNoXCI7XG4gICAgICAgICAgICB3YXRjaGVyLnN0b3BXYXRjaGluZyA9ICRzY29wZVt0eXBlXSh3YXRjaEV4cHJlc3Npb24sIHdhdGNoTGlzdGVuZXIsIHdhdGNoZXIud2F0Y2hEZWVwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFdhdGNoRXhwcmVzc2lvbih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICB2YXIgd2F0Y2hFeHByZXNzaW9uID0gd2F0Y2hlci5leHByZXNzaW9uIHx8IFwibW9kZWxbJ1wiICsgZmllbGQua2V5ICsgXCInXVwiO1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24od2F0Y2hFeHByZXNzaW9uKSkge1xuICAgICAgICAgICAgLy8gd3JhcCB0aGUgZmllbGQncyB3YXRjaCBleHByZXNzaW9uIHNvIHdlIGNhbiBjYWxsIGl0IHdpdGggdGhlIGZpZWxkIGFzIHRoZSBmaXJzdCBhcmdcbiAgICAgICAgICAgIC8vIGFuZCB0aGUgc3RvcCBmdW5jdGlvbiBhcyB0aGUgbGFzdCBhcmcgYXMgYSBoZWxwZXJcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbEV4cHJlc3Npb24gPSB3YXRjaEV4cHJlc3Npb247XG4gICAgICAgICAgICB3YXRjaEV4cHJlc3Npb24gPSBmdW5jdGlvbiBmb3JtbHlXYXRjaEV4cHJlc3Npb24oKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gbW9kaWZ5QXJncy5hcHBseSh1bmRlZmluZWQsIFt3YXRjaGVyLCBpbmRleF0uY29uY2F0KF9zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRXhwcmVzc2lvbi5hcHBseSh1bmRlZmluZWQsIF90b0NvbnN1bWFibGVBcnJheShhcmdzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2F0Y2hFeHByZXNzaW9uLmRpc3BsYXlOYW1lID0gXCJGb3JtbHkgV2F0Y2ggRXhwcmVzc2lvbiBmb3IgZmllbGQgZm9yIFwiICsgZmllbGQua2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gd2F0Y2hFeHByZXNzaW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0V2F0Y2hMaXN0ZW5lcih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICB2YXIgd2F0Y2hMaXN0ZW5lciA9IHdhdGNoZXIubGlzdGVuZXI7XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih3YXRjaExpc3RlbmVyKSkge1xuICAgICAgICAgICAgLy8gd3JhcCB0aGUgZmllbGQncyB3YXRjaCBsaXN0ZW5lciBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgICAvLyBhbmQgdGhlIHN0b3AgZnVuY3Rpb24gYXMgdGhlIGxhc3QgYXJnIGFzIGEgaGVscGVyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxMaXN0ZW5lciA9IHdhdGNoTGlzdGVuZXI7XG4gICAgICAgICAgICB3YXRjaExpc3RlbmVyID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hMaXN0ZW5lcigpIHtcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBtb2RpZnlBcmdzLmFwcGx5KHVuZGVmaW5lZCwgW3dhdGNoZXIsIGluZGV4XS5jb25jYXQoX3NsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxMaXN0ZW5lci5hcHBseSh1bmRlZmluZWQsIF90b0NvbnN1bWFibGVBcnJheShhcmdzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2F0Y2hMaXN0ZW5lci5kaXNwbGF5TmFtZSA9IFwiRm9ybWx5IFdhdGNoIExpc3RlbmVyIGZvciBmaWVsZCBmb3IgXCIgKyBmaWVsZC5rZXk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB3YXRjaExpc3RlbmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbW9kaWZ5QXJncyh3YXRjaGVyLCBpbmRleCkge1xuICAgICAgICAgIGZvciAodmFyIF9sZW4gPSBhcmd1bWVudHMubGVuZ3RoLCBvcmlnaW5hbEFyZ3MgPSBBcnJheShfbGVuID4gMiA/IF9sZW4gLSAyIDogMCksIF9rZXkgPSAyOyBfa2V5IDwgX2xlbjsgX2tleSsrKSB7XG4gICAgICAgICAgICBvcmlnaW5hbEFyZ3NbX2tleSAtIDJdID0gYXJndW1lbnRzW19rZXldO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBbJHNjb3BlLmZpZWxkc1tpbmRleF1dLmNvbmNhdChvcmlnaW5hbEFyZ3MsIFt3YXRjaGVyLnN0b3BXYXRjaGluZ10pO1xuICAgICAgICB9XG4gICAgICB9XSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsLCBhdHRycykge1xuICAgICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoXCJyZXN1bHRcIikpIHtcbiAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0Rm9ybWx5RXJyb3IoXCJUaGUgXFxcInJlc3VsdFxcXCIgYXR0cmlidXRlIG9uIGEgZm9ybWx5LWZvcm0gaXMgbm8gbG9uZ2VyIHZhbGlkLiBVc2UgXFxcIm1vZGVsXFxcIiBpbnN0ZWFkXCIpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhdHRycy5uYW1lICE9PSBcImZvcm1cIikge1xuICAgICAgICAgIC8vIHRoZW4gdGhleSBzcGVjaWZpZWQgdGhlaXIgb3duIG5hbWVcbiAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0Rm9ybWx5RXJyb3IoXCJUaGUgXFxcIm5hbWVcXFwiIGF0dHJpYnV0ZSBvbiBhIGZvcm1seS1mb3JtIGlzIG5vIGxvbmdlciB2YWxpZC4gVXNlIFxcXCJmb3JtXFxcIiBpbnN0ZWFkXCIpO1xuICAgICAgICB9XG4gICAgICAgIC8vIGVuZm9yY2UgdGhlIG1vZGVsIGF0dHJpYnV0ZSBiZWNhdXNlIHdlJ3JlIG1ha2luZyBpdCBvcHRpb25hbCB0byBoZWxwIHdpdGggbWlncmF0aW9uc1xuICAgICAgICBpZiAoIWF0dHJzLmhhc093blByb3BlcnR5KFwibW9kZWxcIikpIHtcbiAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0Rm9ybWx5RXJyb3IoXCJUaGUgXFxcIm1vZGVsXFxcIiBhdHRyaWJ1dGUgaXMgcmVxdWlyZWQgb24gYSBmb3JtbHktZm9ybS5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZvcm1seUZvcm0uJGluamVjdCA9IFtcImZvcm1seVVzYWJpbGl0eVwiXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0uanNcbiAqKiBtb2R1bGUgaWQgPSAxOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmRpcmVjdGl2ZShcImZvcm1seUZvY3VzXCIsIFtcIiR0aW1lb3V0XCIsIFwiJGRvY3VtZW50XCIsIGZ1bmN0aW9uICgkdGltZW91dCwgJGRvY3VtZW50KSB7XG4gICAgLyoganNoaW50IC1XMDUyICovXG4gICAgcmV0dXJuIHtcbiAgICAgIGxpbms6IGZ1bmN0aW9uIGxpbmsoc2NvcGUsIGVsZW1lbnQsIGF0dHJzKSB7XG4gICAgICAgIHZhciBwcmV2aW91c0VsID0gbnVsbDtcbiAgICAgICAgdmFyIGVsID0gZWxlbWVudFswXTtcbiAgICAgICAgdmFyIGRvYyA9ICRkb2N1bWVudFswXTtcbiAgICAgICAgYXR0cnMuJG9ic2VydmUoXCJmb3JtbHlGb2N1c1wiLCBmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICBpZiAodmFsdWUgPT09IFwidHJ1ZVwiKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICAgIHByZXZpb3VzRWwgPSBkb2MuYWN0aXZlRWxlbWVudDtcbiAgICAgICAgICAgICAgZWwuZm9jdXMoKTtcbiAgICAgICAgICAgIH0sIH4gfmF0dHJzLmZvY3VzV2FpdCk7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWx1ZSA9PT0gXCJmYWxzZVwiKSB7XG4gICAgICAgICAgICBpZiAoZG9jLmFjdGl2ZUVsZW1lbnQgPT09IGVsKSB7XG4gICAgICAgICAgICAgIGVsLmJsdXIoKTtcbiAgICAgICAgICAgICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KFwicmVmb2N1c1wiKSAmJiBwcmV2aW91c0VsKSB7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNFbC5mb2N1cygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kaXJlY3RpdmVzL2Zvcm1seS1mb2N1cy5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUucnVuKGFkZEZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKTtcblxuICBmdW5jdGlvbiBhZGRGb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcihmb3JtbHlDb25maWcpIHtcbiAgICBpZiAoZm9ybWx5Q29uZmlnLmV4dHJhcy5kaXNhYmxlTmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnByZVdyYXBwZXIucHVzaChuZ01vZGVsQXR0cnNNYW5pcHVsYXRvcik7XG5cbiAgICBmdW5jdGlvbiBuZ01vZGVsQXR0cnNNYW5pcHVsYXRvcih0ZW1wbGF0ZSwgb3B0aW9ucywgc2NvcGUpIHtcbiAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgICAgIHZhciBlbCA9IGFuZ3VsYXIuZWxlbWVudChcIjxhPjwvYT5cIik7XG4gICAgICB2YXIgZGF0YSA9IG9wdGlvbnMuZGF0YTtcbiAgICAgIGlmIChkYXRhLm5vVG91Y2h5KSB7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgIH1cbiAgICAgIGVsLmFwcGVuZCh0ZW1wbGF0ZSk7XG4gICAgICB2YXIgbW9kZWxFbHMgPSBhbmd1bGFyLmVsZW1lbnQoZWxbMF0ucXVlcnlTZWxlY3RvckFsbChcIltuZy1tb2RlbF1cIikpO1xuICAgICAgaWYgKCFtb2RlbEVscyB8fCAhbW9kZWxFbHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgIH1cblxuICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCBcImlkXCIsIHNjb3BlLmlkKTtcbiAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbEVscywgXCJuYW1lXCIsIHNjb3BlLmlkKTtcblxuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudmFsaWRhdG9ycykpIHtcbiAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCBcImZvcm1seS1jdXN0b20tdmFsaWRhdGlvblwiLCBcIm9wdGlvbnMudmFsaWRhdG9yc1wiKTtcbiAgICAgIH1cbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLm1vZGVsT3B0aW9ucykpIHtcbiAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCBcIm5nLW1vZGVsLW9wdGlvbnNcIiwgXCJvcHRpb25zLm1vZGVsT3B0aW9uc1wiKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubW9kZWxPcHRpb25zLmdldHRlclNldHRlcikge1xuICAgICAgICAgIG1vZGVsRWxzLmF0dHIoXCJuZy1tb2RlbFwiLCBcIm9wdGlvbnMudmFsdWVcIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGFkZFRlbXBsYXRlT3B0aW9uc0F0dHJzKCk7XG5cbiAgICAgIHJldHVybiBlbC5odG1sKCk7XG5cbiAgICAgIGZ1bmN0aW9uIGFkZFRlbXBsYXRlT3B0aW9uc0F0dHJzKCkge1xuICAgICAgICBpZiAoIW9wdGlvbnMudGVtcGxhdGVPcHRpb25zICYmICFvcHRpb25zLmV4cHJlc3Npb25Qcm9wZXJ0aWVzKSB7XG4gICAgICAgICAgLy8gbm8gbmVlZCB0byBydW4gdGhlc2UgaWYgdGhlcmUgYXJlIG5vIHRlbXBsYXRlT3B0aW9ucyBvciBleHByZXNzaW9uUHJvcGVydGllc1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB2YXIgdG8gPSBvcHRpb25zLnRlbXBsYXRlT3B0aW9ucyB8fCB7fTtcbiAgICAgICAgdmFyIGVwID0gb3B0aW9ucy5leHByZXNzaW9uUHJvcGVydGllcyB8fCB7fTtcblxuICAgICAgICB2YXIgbmdNb2RlbEF0dHJpYnV0ZXMgPSBnZXRCdWlsdGluQXR0cmlidXRlcygpO1xuXG4gICAgICAgIC8vIGV4dGVuZCB3aXRoIHRoZSB1c2VyJ3Mgc3BlY2lmaWNhdGlvbnMgd2lubmluZ1xuICAgICAgICBhbmd1bGFyLmV4dGVuZChuZ01vZGVsQXR0cmlidXRlcywgb3B0aW9ucy5uZ01vZGVsQXR0cnMpO1xuXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChuZ01vZGVsQXR0cmlidXRlcywgZnVuY3Rpb24gKHZhbCwgbmFtZSkge1xuICAgICAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjEwICovXG4gICAgICAgICAgdmFyIGF0dHJWYWwgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdmFyIGF0dHJOYW1lID0gdW5kZWZpbmVkO1xuICAgICAgICAgIHZhciByZWYgPSBcIm9wdGlvbnMudGVtcGxhdGVPcHRpb25zWydcIiArIG5hbWUgKyBcIiddXCI7XG4gICAgICAgICAgdmFyIHRvVmFsID0gdG9bbmFtZV07XG4gICAgICAgICAgdmFyIGVwVmFsID0gZ2V0RXBWYWx1ZShlcCwgbmFtZSk7XG5cbiAgICAgICAgICB2YXIgaW5UbyA9IGFuZ3VsYXIuaXNEZWZpbmVkKHRvVmFsKTtcbiAgICAgICAgICB2YXIgaW5FcCA9IGFuZ3VsYXIuaXNEZWZpbmVkKGVwVmFsKTtcbiAgICAgICAgICBpZiAodmFsLnZhbHVlKSB7XG4gICAgICAgICAgICAvLyBJIHJlYWxpemUgdGhpcyBsb29rcyBiYWNrd2FyZHMsIGJ1dCBpdCdzIHJpZ2h0LCB0cnVzdCBtZS4uLlxuICAgICAgICAgICAgYXR0ck5hbWUgPSB2YWwudmFsdWU7XG4gICAgICAgICAgICBhdHRyVmFsID0gbmFtZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbC5leHByZXNzaW9uICYmIGluVG8pIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmV4cHJlc3Npb247XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyh0b1tuYW1lXSkpIHtcbiAgICAgICAgICAgICAgYXR0clZhbCA9IFwiJGV2YWwoXCIgKyByZWYgKyBcIilcIjtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRvW25hbWVdKSkge1xuICAgICAgICAgICAgICBhdHRyVmFsID0gXCJcIiArIHJlZiArIFwiKG1vZGVsW29wdGlvbnMua2V5XSwgb3B0aW9ucywgdGhpcywgJGV2ZW50KVwiO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwib3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnMuXCIgKyBuYW1lICsgXCIgbXVzdCBiZSBhIHN0cmluZyBvciBmdW5jdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShvcHRpb25zKSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWwuYm91bmQgJiYgaW5FcCkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYm91bmQ7XG4gICAgICAgICAgICBhdHRyVmFsID0gcmVmO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmFsLmF0dHJpYnV0ZSAmJiBpbkVwKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5hdHRyaWJ1dGU7XG4gICAgICAgICAgICBhdHRyVmFsID0gXCJ7e1wiICsgcmVmICsgXCJ9fVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmFsLmF0dHJpYnV0ZSAmJiBpblRvKSB7XG4gICAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5hdHRyaWJ1dGU7XG4gICAgICAgICAgICBhdHRyVmFsID0gdG9WYWw7XG4gICAgICAgICAgfSBlbHNlIGlmICh2YWwuYm91bmQgJiYgaW5Ubykge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYm91bmQ7XG4gICAgICAgICAgICBhdHRyVmFsID0gcmVmO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQoYXR0ck5hbWUpICYmIGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJWYWwpKSB7XG4gICAgICAgICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxFbHMsIGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBnZXRCdWlsdGluQXR0cmlidXRlcygpIHtcbiAgICAgICAgdmFyIG5nTW9kZWxBdHRyaWJ1dGVzID0ge1xuICAgICAgICAgIGZvY3VzOiB7XG4gICAgICAgICAgICBhdHRyaWJ1dGU6IFwiZm9ybWx5LWZvY3VzXCJcbiAgICAgICAgICB9XG4gICAgICAgIH07XG4gICAgICAgIHZhciBib3VuZE9ubHkgPSBbXTtcbiAgICAgICAgdmFyIGJvdGhBdHRyaWJ1dGVBbmRCb3VuZCA9IFtcInJlcXVpcmVkXCIsIFwiZGlzYWJsZWRcIiwgXCJwYXR0ZXJuXCIsIFwibWlubGVuZ3RoXCJdO1xuICAgICAgICB2YXIgZXhwcmVzc2lvbk9ubHkgPSBbXCJjaGFuZ2VcIiwgXCJrZXlkb3duXCIsIFwia2V5dXBcIiwgXCJrZXlwcmVzc1wiLCBcImNsaWNrXCIsIFwiZm9jdXNcIiwgXCJibHVyXCJdO1xuICAgICAgICB2YXIgYXR0cmlidXRlT25seSA9IFtcInBsYWNlaG9sZGVyXCIsIFwibWluXCIsIFwibWF4XCIsIFwidGFiaW5kZXhcIiwgXCJ0eXBlXCJdO1xuICAgICAgICBpZiAoZm9ybWx5Q29uZmlnLmV4dHJhcy5uZ01vZGVsQXR0cnNNYW5pcHVsYXRvclByZWZlckJvdW5kKSB7XG4gICAgICAgICAgYm91bmRPbmx5LnB1c2goXCJtYXhsZW5ndGhcIik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm90aEF0dHJpYnV0ZUFuZEJvdW5kLnB1c2goXCJtYXhsZW5ndGhcIik7XG4gICAgICAgIH1cblxuICAgICAgICBhbmd1bGFyLmZvckVhY2goYm91bmRPbmx5LCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW2l0ZW1dID0geyBib3VuZDogXCJuZy1cIiArIGl0ZW0gfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKGJvdGhBdHRyaWJ1dGVBbmRCb3VuZCwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgICBuZ01vZGVsQXR0cmlidXRlc1tpdGVtXSA9IHsgYXR0cmlidXRlOiBpdGVtLCBib3VuZDogXCJuZy1cIiArIGl0ZW0gfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKGV4cHJlc3Npb25Pbmx5LCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIHZhciBwcm9wTmFtZSA9IFwib25cIiArIGl0ZW0uc3Vic3RyKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBpdGVtLnN1YnN0cigxKTtcbiAgICAgICAgICBuZ01vZGVsQXR0cmlidXRlc1twcm9wTmFtZV0gPSB7IGV4cHJlc3Npb246IFwibmctXCIgKyBpdGVtIH07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChhdHRyaWJ1dGVPbmx5LCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW2l0ZW1dID0geyBhdHRyaWJ1dGU6IGl0ZW0gfTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiBuZ01vZGVsQXR0cmlidXRlcztcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0RXBWYWx1ZShlcCwgbmFtZSkge1xuICAgICAgICByZXR1cm4gZXBbXCJ0ZW1wbGF0ZU9wdGlvbnMuXCIgKyBuYW1lXSB8fCBlcFtcInRlbXBsYXRlT3B0aW9uc1snXCIgKyBuYW1lICsgXCInXVwiXSB8fCBlcFtcInRlbXBsYXRlT3B0aW9uc1tcXFwiXCIgKyBuYW1lICsgXCJcXFwiXVwiXTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gYWRkSWZOb3RQcmVzZW50KGVsLCBhdHRyLCB2YWwpIHtcbiAgICAgICAgaWYgKCFlbC5hdHRyKGF0dHIpKSB7XG4gICAgICAgICAgZWwuYXR0cihhdHRyLCB2YWwpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGFkZEZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yLiRpbmplY3QgPSBbXCJmb3JtbHlDb25maWdcIl07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9ydW4vZm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgZm9ybWx5RXZhbDogZm9ybWx5RXZhbCwgZ2V0RmllbGRJZDogZ2V0RmllbGRJZCwgcmV2ZXJzZURlZXBNZXJnZTogcmV2ZXJzZURlZXBNZXJnZSB9O1xuXG5mdW5jdGlvbiBmb3JtbHlFdmFsKHNjb3BlLCBleHByZXNzaW9uLCBtb2RlbFZhbHVlLCB2aWV3VmFsdWUpIHtcbiAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihleHByZXNzaW9uKSkge1xuICAgIHJldHVybiBleHByZXNzaW9uKHZpZXdWYWx1ZSB8fCBtb2RlbFZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNjb3BlLiRldmFsKGV4cHJlc3Npb24sIHtcbiAgICAgICR2aWV3VmFsdWU6IHZpZXdWYWx1ZSB8fCBtb2RlbFZhbHVlLFxuICAgICAgJG1vZGVsVmFsdWU6IG1vZGVsVmFsdWVcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRGaWVsZElkKGZvcm1JZCwgb3B0aW9ucywgaW5kZXgpIHtcbiAgdmFyIHR5cGUgPSBvcHRpb25zLnR5cGU7XG4gIGlmICghdHlwZSAmJiBvcHRpb25zLnRlbXBsYXRlKSB7XG4gICAgdHlwZSA9IFwidGVtcGxhdGVcIjtcbiAgfSBlbHNlIGlmICghdHlwZSAmJiBvcHRpb25zLnRlbXBsYXRlVXJsKSB7XG4gICAgdHlwZSA9IFwidGVtcGxhdGVVcmxcIjtcbiAgfVxuXG4gIHJldHVybiBbZm9ybUlkLCB0eXBlLCBvcHRpb25zLmtleSwgaW5kZXhdLmpvaW4oXCJfXCIpO1xufVxuXG5mdW5jdGlvbiByZXZlcnNlRGVlcE1lcmdlKGRlc3QpIHtcbiAgYW5ndWxhci5mb3JFYWNoKGFyZ3VtZW50cywgZnVuY3Rpb24gKHNyYywgaW5kZXgpIHtcbiAgICBpZiAoIWluZGV4KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGFuZ3VsYXIuZm9yRWFjaChzcmMsIGZ1bmN0aW9uICh2YWwsIHByb3ApIHtcbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQoZGVzdFtwcm9wXSkpIHtcbiAgICAgICAgZGVzdFtwcm9wXSA9IGFuZ3VsYXIuY29weSh2YWwpO1xuICAgICAgfSBlbHNlIGlmIChvYmpBbmRTYW1lVHlwZShkZXN0W3Byb3BdLCB2YWwpKSB7XG4gICAgICAgIHJldmVyc2VEZWVwTWVyZ2UoZGVzdFtwcm9wXSwgdmFsKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9iakFuZFNhbWVUeXBlKG9iajEsIG9iajIpIHtcbiAgcmV0dXJuIGFuZ3VsYXIuaXNPYmplY3Qob2JqMSkgJiYgYW5ndWxhci5pc09iamVjdChvYmoyKSAmJiBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqMSkgPT09IE9iamVjdC5nZXRQcm90b3R5cGVPZihvYmoyKTtcbn1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vb3RoZXIvdXRpbHMuanNcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiLy8gYXBpQ2hlY2suanMgdjEuMC4wIGJ1aWx0IHdpdGgg4pmlIGJ5IEtlbnQgQy4gRG9kZHMgKMOzIMOsX8OtKT3Ds8OyPSjDrF/DrSDDsilcblxuKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeSgpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJhcGlDaGVja1wiXSA9IGZhY3RvcnkoKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJhcGlDaGVja1wiXSA9IGZhY3RvcnkoKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKCkge1xucmV0dXJuIC8qKioqKiovIChmdW5jdGlvbihtb2R1bGVzKSB7IC8vIHdlYnBhY2tCb290c3RyYXBcbi8qKioqKiovIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuLyoqKioqKi8gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbi8qKioqKiovIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbi8qKioqKiovIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbi8qKioqKiovIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuLyoqKioqKi8gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbi8qKioqKiovIFx0XHRcdGV4cG9ydHM6IHt9LFxuLyoqKioqKi8gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuLyoqKioqKi8gXHRcdFx0bG9hZGVkOiBmYWxzZVxuLyoqKioqKi8gXHRcdH07XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuLyoqKioqKi8gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuLyoqKioqKi9cbi8qKioqKiovIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4vKioqKioqLyBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG4vKioqKioqL1xuLyoqKioqKi8gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4vKioqKioqLyBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuLyoqKioqKi8gXHR9XG4vKioqKioqL1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbi8qKioqKiovIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcbi8qKioqKiovXG4vKioqKioqLyBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4vKioqKioqLyBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG4vKioqKioqL1xuLyoqKioqKi8gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuLyoqKioqKi8gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuLyoqKioqKi9cbi8qKioqKiovIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vKioqKioqLyBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuLyoqKioqKi8gfSlcbi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKiovXG4vKioqKioqLyAoW1xuLyogMCAqL1xuLyohKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vaW5kZXguanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXHRcblx0bW9kdWxlLmV4cG9ydHMgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL2FwaUNoZWNrICovIDEpO1xuXG4vKioqLyB9LFxuLyogMSAqL1xuLyohKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vYXBpQ2hlY2suanMgKioqIVxuICBcXCoqKioqKioqKioqKioqKioqKioqKi9cbi8qKiovIGZ1bmN0aW9uKG1vZHVsZSwgZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXykge1xuXG5cdFwidXNlIHN0cmljdFwiO1xuXHRcblx0dmFyIF9yZXF1aXJlID0gX193ZWJwYWNrX3JlcXVpcmVfXygvKiEgLi9hcGlDaGVja1V0aWwgKi8gMik7XG5cdFxuXHR2YXIgZWFjaCA9IF9yZXF1aXJlLmVhY2g7XG5cdHZhciBhcnJheWlmeSA9IF9yZXF1aXJlLmFycmF5aWZ5O1xuXHR2YXIgZ2V0Q2hlY2tlckRpc3BsYXkgPSBfcmVxdWlyZS5nZXRDaGVja2VyRGlzcGxheTtcblx0dmFyIHR5cGVPZiA9IF9yZXF1aXJlLnR5cGVPZjtcblx0XG5cdHZhciBjaGVja2VycyA9IF9fd2VicGFja19yZXF1aXJlX18oLyohIC4vY2hlY2tlcnMgKi8gMyk7XG5cdHZhciBkaXNhYmxlZCA9IGZhbHNlO1xuXHRcblx0bW9kdWxlLmV4cG9ydHMgPSBhcGlDaGVjaztcblx0XG5cdHZhciBhZGRpdGlvbmFsUHJvcGVydGllcyA9IHtcblx0ICBcInRocm93XCI6IGdldEFwaUNoZWNrKHRydWUpLFxuXHQgIHdhcm46IGdldEFwaUNoZWNrKGZhbHNlKSxcblx0ICBkaXNhYmxlOiBmdW5jdGlvbiAoKSB7XG5cdCAgICByZXR1cm4gZGlzYWJsZWQgPSB0cnVlO1xuXHQgIH0sXG5cdCAgZW5hYmxlOiBmdW5jdGlvbiAoKSB7XG5cdCAgICByZXR1cm4gZGlzYWJsZWQgPSBmYWxzZTtcblx0ICB9LFxuXHQgIGdldEVycm9yTWVzc2FnZTogZ2V0RXJyb3JNZXNzYWdlLFxuXHQgIGhhbmRsZUVycm9yTWVzc2FnZTogaGFuZGxlRXJyb3JNZXNzYWdlLFxuXHQgIGNvbmZpZzoge1xuXHQgICAgb3V0cHV0OiB7XG5cdCAgICAgIHByZWZpeDogXCJcIixcblx0ICAgICAgc3VmZml4OiBcIlwiLFxuXHQgICAgICBkb2NzQmFzZVVybDogXCJcIlxuXHQgICAgfVxuXHQgIH1cblx0fTtcblx0XG5cdGVhY2goYWRkaXRpb25hbFByb3BlcnRpZXMsIGZ1bmN0aW9uICh3cmFwcGVyLCBuYW1lKSB7XG5cdCAgcmV0dXJuIG1vZHVsZS5leHBvcnRzW25hbWVdID0gd3JhcHBlcjtcblx0fSk7XG5cdGVhY2goY2hlY2tlcnMsIGZ1bmN0aW9uIChjaGVja2VyLCBuYW1lKSB7XG5cdCAgcmV0dXJuIG1vZHVsZS5leHBvcnRzW25hbWVdID0gY2hlY2tlcjtcblx0fSk7XG5cdFxuXHRmdW5jdGlvbiBhcGlDaGVjayhhcGksIGFyZ3MsIG91dHB1dCkge1xuXHQgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cblx0ICB2YXIgc3VjY2Vzcztcblx0ICBpZiAoZGlzYWJsZWQpIHtcblx0ICAgIHJldHVybiBudWxsO1xuXHQgIH1cblx0ICBpZiAoIWFyZ3MpIHtcblx0ICAgIHRocm93IG5ldyBFcnJvcihcImFwaUNoZWNrIGZhaWxlZDogTXVzdCBwYXNzIGFyZ3VtZW50cyB0byBjaGVja1wiKTtcblx0ICB9XG5cdCAgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3MpO1xuXHQgIGlmIChjaGVja2Vycy5hcnJheShhcGkpKSB7XG5cdCAgICBzdWNjZXNzID0gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncykgJiYgY2hlY2tNdWx0aUFyZ0FwaShhcGksIGFyZ3MpO1xuXHQgIH0gZWxzZSBpZiAoY2hlY2tlcnMuZnVuYyhhcGkpKSB7XG5cdCAgICBzdWNjZXNzID0gYXBpKGFyZ3NbMF0pO1xuXHQgIH0gZWxzZSB7XG5cdCAgICB0aHJvdyBuZXcgRXJyb3IoXCJhcGlDaGVjayBmYWlsZWQ6IE11c3QgcGFzcyBhbiBhcnJheSBvciBhIGZ1bmN0aW9uXCIpO1xuXHQgIH1cblx0ICByZXR1cm4gc3VjY2VzcyA/IG51bGwgOiBtb2R1bGUuZXhwb3J0cy5nZXRFcnJvck1lc3NhZ2UoYXBpLCBhcmdzLCBvdXRwdXQpO1xuXHR9XG5cdFxuXHRmdW5jdGlvbiBjaGVja011bHRpQXJnQXBpKGFwaSwgYXJncykge1xuXHQgIHZhciBzdWNjZXNzID0gdHJ1ZTtcblx0ICB2YXIgY2hlY2tlckluZGV4ID0gMDtcblx0ICB2YXIgYXJnSW5kZXggPSAwO1xuXHQgIHZhciBhcmcsIGNoZWNrZXIsIHJlcztcblx0ICAvKiBqc2hpbnQgLVcwODQgKi9cblx0ICB3aGlsZSAoYXJnID0gYXJnc1thcmdJbmRleCsrXSkge1xuXHQgICAgY2hlY2tlciA9IGFwaVtjaGVja2VySW5kZXgrK107XG5cdCAgICByZXMgPSBjaGVja2VyKGFyZyk7XG5cdCAgICBpZiAoIXJlcyAmJiAhY2hlY2tlci5pc09wdGlvbmFsKSB7XG5cdCAgICAgIHJldHVybiBmYWxzZTtcblx0ICAgIH0gZWxzZSBpZiAoIXJlcykge1xuXHQgICAgICBhcmdJbmRleC0tO1xuXHQgICAgfVxuXHQgIH1cblx0ICByZXR1cm4gc3VjY2Vzcztcblx0fVxuXHRcblx0ZnVuY3Rpb24gY2hlY2tFbm91Z2hBcmdzKGFwaSwgYXJncykge1xuXHQgIHZhciByZXF1aXJlZEFyZ3MgPSBhcGkuZmlsdGVyKGZ1bmN0aW9uIChhKSB7XG5cdCAgICByZXR1cm4gIWEuaXNPcHRpb25hbDtcblx0ICB9KTtcblx0ICByZXR1cm4gYXJncy5sZW5ndGggPj0gcmVxdWlyZWRBcmdzLmxlbmd0aDtcblx0fVxuXHRcblx0ZnVuY3Rpb24gZ2V0QXBpQ2hlY2soc2hvdWxkVGhyb3cpIHtcblx0ICByZXR1cm4gZnVuY3Rpb24gYXBpQ2hlY2tXcmFwcGVyKGFwaSwgYXJncywgb3V0cHV0KSB7XG5cdCAgICBpZiAoZGlzYWJsZWQpIHtcblx0ICAgICAgcmV0dXJuIG51bGw7XG5cdCAgICB9XG5cdCAgICB2YXIgbWVzc2FnZSA9IGFwaUNoZWNrKGFwaSwgYXJncywgb3V0cHV0KTtcblx0ICAgIG1vZHVsZS5leHBvcnRzLmhhbmRsZUVycm9yTWVzc2FnZShtZXNzYWdlLCBzaG91bGRUaHJvdyk7XG5cdCAgfTtcblx0fVxuXHRcblx0ZnVuY3Rpb24gaGFuZGxlRXJyb3JNZXNzYWdlKG1lc3NhZ2UsIHNob3VsZFRocm93KSB7XG5cdCAgaWYgKHNob3VsZFRocm93ICYmIG1lc3NhZ2UpIHtcblx0ICAgIHRocm93IG5ldyBFcnJvcihtZXNzYWdlKTtcblx0ICB9IGVsc2UgaWYgKG1lc3NhZ2UpIHtcblx0ICAgIGNvbnNvbGUud2FybihtZXNzYWdlKTtcblx0ICB9XG5cdH1cblx0XG5cdGZ1bmN0aW9uIGdldEVycm9yTWVzc2FnZShhcGksIGFyZ3MpIHtcblx0ICB2YXIgb3V0cHV0ID0gYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1syXTtcblx0XG5cdCAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuXHQgIHZhciBnT3V0ID0gbW9kdWxlLmV4cG9ydHMuY29uZmlnLm91dHB1dCB8fCB7fTtcblx0ICB2YXIgcHJlZml4ID0gKFwiXCIgKyAoZ091dC5wcmVmaXggfHwgXCJcIikgKyBcIiBcIiArIChvdXRwdXQucHJlZml4IHx8IFwiXCIpKS50cmltKCk7XG5cdCAgdmFyIHN1ZmZpeCA9IChcIlwiICsgKG91dHB1dC5zdWZmaXggfHwgXCJcIikgKyBcIiBcIiArIChnT3V0LnN1ZmZpeCB8fCBcIlwiKSkudHJpbSgpO1xuXHQgIHZhciB1cmwgPSBnT3V0LmRvY3NCYXNlVXJsICYmIG91dHB1dC51cmwgJiYgKFwiXCIgKyBnT3V0LmRvY3NCYXNlVXJsICsgXCJcIiArIG91dHB1dC51cmwpLnRyaW0oKTtcblx0ICByZXR1cm4gKFwiXCIgKyBwcmVmaXggKyBcIiBcIiArIGJ1aWxkTWVzc2FnZUZyb21BcGlBbmRBcmdzKGFwaSwgYXJncykgKyBcIiBcIiArIHN1ZmZpeCArIFwiIFwiICsgKHVybCB8fCBcIlwiKSkudHJpbSgpO1xuXHR9XG5cdFxuXHRmdW5jdGlvbiBidWlsZE1lc3NhZ2VGcm9tQXBpQW5kQXJncyhhcGksIGFyZ3MpIHtcblx0ICBhcGkgPSBhcnJheWlmeShhcGkpO1xuXHQgIGFyZ3MgPSBhcnJheWlmeShhcmdzKTtcblx0ICB2YXIgYXBpVHlwZXMgPSBhcGkubWFwKGZ1bmN0aW9uIChjaGVja2VyKSB7XG5cdCAgICByZXR1cm4gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcik7XG5cdCAgfSkuam9pbihcIiwgXCIpO1xuXHQgIHZhciBwYXNzZWRUeXBlcyA9IGFyZ3MubGVuZ3RoID8gXCJgXCIgKyBhcmdzLm1hcChnZXRBcmdEaXNwbGF5KS5qb2luKFwiLCBcIikgKyBcImBcIiA6IFwibm90aGluZ1wiO1xuXHQgIHJldHVybiBcImFwaUNoZWNrIGZhaWxlZCEgWW91IHBhc3NlZDogXCIgKyBwYXNzZWRUeXBlcyArIFwiIGFuZCBzaG91bGQgaGF2ZSBwYXNzZWQ6IGBcIiArIGFwaVR5cGVzICsgXCJgXCI7XG5cdH1cblx0XG5cdHZhciBzdHJpbmdpZnlhYmxlID0ge1xuXHQgIE9iamVjdDogZ2V0RGlzcGxheSxcblx0ICBBcnJheTogZ2V0RGlzcGxheVxuXHR9O1xuXHRcblx0ZnVuY3Rpb24gZ2V0RGlzcGxheShvYmopIHtcblx0ICB2YXIgYXJnRGlzcGxheSA9IHt9O1xuXHQgIGVhY2gob2JqLCBmdW5jdGlvbiAodiwgaykge1xuXHQgICAgcmV0dXJuIGFyZ0Rpc3BsYXlba10gPSBnZXRBcmdEaXNwbGF5KHYpO1xuXHQgIH0pO1xuXHQgIHJldHVybiBKU09OLnN0cmluZ2lmeShvYmosIGZ1bmN0aW9uIChrLCB2KSB7XG5cdCAgICByZXR1cm4gYXJnRGlzcGxheVtrXSB8fCB2O1xuXHQgIH0pO1xuXHR9XG5cdFxuXHRmdW5jdGlvbiBnZXRBcmdEaXNwbGF5KGFyZykge1xuXHQgIHZhciBjTmFtZSA9IGFyZyAmJiBhcmcuY29uc3RydWN0b3IgJiYgYXJnLmNvbnN0cnVjdG9yLm5hbWU7XG5cdCAgcmV0dXJuIGNOYW1lID8gc3RyaW5naWZ5YWJsZVtjTmFtZV0gPyBzdHJpbmdpZnlhYmxlW2NOYW1lXShhcmcpIDogY05hbWUgOiBhcmcgPT09IG51bGwgPyBcIm51bGxcIiA6IHR5cGVPZihhcmcpO1xuXHR9XG5cbi8qKiovIH0sXG4vKiAyICovXG4vKiEqKioqKioqKioqKioqKioqKioqKioqKioqISpcXFxuICAhKioqIC4vYXBpQ2hlY2tVdGlsLmpzICoqKiFcbiAgXFwqKioqKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdFxuXHRtb2R1bGUuZXhwb3J0cyA9IHsgZWFjaDogZWFjaCwgY29weTogY29weSwgdHlwZU9mOiB0eXBlT2YsIGFycmF5aWZ5OiBhcnJheWlmeSwgZ2V0Q2hlY2tlckRpc3BsYXk6IGdldENoZWNrZXJEaXNwbGF5IH07XG5cdFxuXHRmdW5jdGlvbiBjb3B5KG9iaikge1xuXHQgIHZhciBkYUNvcHkgPSBBcnJheS5pc0FycmF5KG9iaikgPyBbXSA6IHt9O1xuXHQgIGVhY2gob2JqLCBmdW5jdGlvbiAodmFsLCBrZXkpIHtcblx0ICAgIHJldHVybiBkYUNvcHlba2V5XSA9IHZhbDtcblx0ICB9KTtcblx0ICByZXR1cm4gZGFDb3B5O1xuXHR9XG5cdFxuXHRmdW5jdGlvbiB0eXBlT2Yob2JqKSB7XG5cdCAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuXHQgICAgcmV0dXJuIFwiYXJyYXlcIjtcblx0ICB9IGVsc2UgaWYgKG9iaiBpbnN0YW5jZW9mIFJlZ0V4cCkge1xuXHQgICAgcmV0dXJuIFwib2JqZWN0XCI7XG5cdCAgfSBlbHNlIHtcblx0ICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuXHQgIH1cblx0fVxuXHRcblx0ZnVuY3Rpb24gZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcikge1xuXHQgIHJldHVybiAoY2hlY2tlci50eXBlIHx8IGNoZWNrZXIuZGlzcGxheU5hbWUgfHwgY2hlY2tlci5uYW1lKSArIChjaGVja2VyLmlzT3B0aW9uYWwgPyBcIiAob3B0aW9uYWwpXCIgOiBcIlwiKTtcblx0fVxuXHRcblx0ZnVuY3Rpb24gYXJyYXlpZnkob2JqKSB7XG5cdCAgaWYgKCFvYmopIHtcblx0ICAgIHJldHVybiBbXTtcblx0ICB9IGVsc2UgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuXHQgICAgcmV0dXJuIG9iajtcblx0ICB9IGVsc2Uge1xuXHQgICAgcmV0dXJuIFtvYmpdO1xuXHQgIH1cblx0fVxuXHRcblx0ZnVuY3Rpb24gZWFjaChvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG5cdCAgaWYgKEFycmF5LmlzQXJyYXkob2JqKSkge1xuXHQgICAgcmV0dXJuIGVhY2hBcnJ5LmFwcGx5KHVuZGVmaW5lZCwgYXJndW1lbnRzKTtcblx0ICB9IGVsc2Uge1xuXHQgICAgcmV0dXJuIGVhY2hPYmouYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuXHQgIH1cblx0fVxuXHRcblx0ZnVuY3Rpb24gZWFjaE9iaihvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG5cdCAgdmFyIHJldDtcblx0ICB2YXIgaGFzT3duID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eTtcblx0ICBmb3IgKHZhciBrZXkgaW4gb2JqKSB7XG5cdCAgICBpZiAoaGFzT3duLmNhbGwob2JqLCBrZXkpKSB7XG5cdCAgICAgIHJldCA9IGl0ZXJhdG9yLmNhbGwoY29udGV4dCwgb2JqW2tleV0sIGtleSwgb2JqKTtcblx0ICAgICAgaWYgKHJldCA9PT0gZmFsc2UpIHtcblx0ICAgICAgICByZXR1cm4gcmV0O1xuXHQgICAgICB9XG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiB0cnVlO1xuXHR9XG5cdFxuXHRmdW5jdGlvbiBlYWNoQXJyeShvYmosIGl0ZXJhdG9yLCBjb250ZXh0KSB7XG5cdCAgdmFyIHJldDtcblx0ICB2YXIgbGVuZ3RoID0gb2JqLmxlbmd0aDtcblx0ICBmb3IgKHZhciBpID0gMDsgaSA8IGxlbmd0aDsgaSsrKSB7XG5cdCAgICByZXQgPSBpdGVyYXRvci5jYWxsKGNvbnRleHQsIG9ialtpXSwgaSwgb2JqKTtcblx0ICAgIGlmIChyZXQgPT09IGZhbHNlKSB7XG5cdCAgICAgIHJldHVybiByZXQ7XG5cdCAgICB9XG5cdCAgfVxuXHQgIHJldHVybiB0cnVlO1xuXHR9XG5cbi8qKiovIH0sXG4vKiAzICovXG4vKiEqKioqKioqKioqKioqKioqKioqKiohKlxcXG4gICEqKiogLi9jaGVja2Vycy5qcyAqKiohXG4gIFxcKioqKioqKioqKioqKioqKioqKioqL1xuLyoqKi8gZnVuY3Rpb24obW9kdWxlLCBleHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKSB7XG5cblx0XCJ1c2Ugc3RyaWN0XCI7XG5cdFxuXHR2YXIgX3JlcXVpcmUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKC8qISAuL2FwaUNoZWNrVXRpbCAqLyAyKTtcblx0XG5cdHZhciB0eXBlT2YgPSBfcmVxdWlyZS50eXBlT2Y7XG5cdHZhciBlYWNoID0gX3JlcXVpcmUuZWFjaDtcblx0dmFyIGNvcHkgPSBfcmVxdWlyZS5jb3B5O1xuXHR2YXIgZ2V0Q2hlY2tlckRpc3BsYXkgPSBfcmVxdWlyZS5nZXRDaGVja2VyRGlzcGxheTtcblx0XG5cdHZhciBjaGVja2VycyA9IG1vZHVsZS5leHBvcnRzID0ge1xuXHQgIGFycmF5OiBnZXRUeXBlT2ZDaGVja2VyKFwiQXJyYXlcIiksXG5cdCAgYm9vbDogZ2V0VHlwZU9mQ2hlY2tlcihcIkJvb2xlYW5cIiksXG5cdCAgZnVuYzogZ2V0VHlwZU9mQ2hlY2tlcihcIkZ1bmN0aW9uXCIpLFxuXHQgIG51bWJlcjogZ2V0VHlwZU9mQ2hlY2tlcihcIk51bWJlclwiKSxcblx0ICBzdHJpbmc6IGdldFR5cGVPZkNoZWNrZXIoXCJTdHJpbmdcIiksXG5cdCAgb2JqZWN0OiBnZXRPYmplY3RDaGVja2VyKCksXG5cdFxuXHQgIGluc3RhbmNlT2Y6IGluc3RhbmNlQ2hlY2tHZXR0ZXIsXG5cdCAgb25lT2Y6IG9uZU9mQ2hlY2tHZXR0ZXIsXG5cdCAgb25lT2ZUeXBlOiBvbmVPZlR5cGVDaGVja0dldHRlcixcblx0XG5cdCAgYXJyYXlPZjogYXJyYXlPZkNoZWNrR2V0dGVyLFxuXHQgIG9iamVjdE9mOiBvYmplY3RPZkNoZWNrR2V0dGVyLFxuXHRcblx0ICBzaGFwZTogZ2V0U2hhcGVDaGVja0dldHRlcigpLFxuXHRcblx0ICBhbnk6IGFueUNoZWNrR2V0dGVyKClcblx0fTtcblx0XG5cdGVhY2goY2hlY2tlcnMsIGZ1bmN0aW9uIChjaGVja2VyKSB7XG5cdCAgY2hlY2tlci5kaXNwbGF5TmFtZSA9IFwiYXBpQ2hlY2sgYFwiICsgY2hlY2tlci50eXBlICsgXCJgIHR5cGUgY2hlY2tlclwiO1xuXHR9KTtcblx0XG5cdGZ1bmN0aW9uIGdldFR5cGVPZkNoZWNrZXIodHlwZSkge1xuXHQgIHZhciBsVHlwZSA9IHR5cGUudG9Mb3dlckNhc2UoKTtcblx0ICBmdW5jdGlvbiB0eXBlT2ZDaGVja2VyKHZhbCkge1xuXHQgICAgcmV0dXJuIHR5cGVPZih2YWwpID09PSBsVHlwZTtcblx0ICB9XG5cdFxuXHQgIHR5cGVPZkNoZWNrZXIudHlwZSA9IHR5cGU7XG5cdCAgbWFrZU9wdGlvbmFsKHR5cGVPZkNoZWNrZXIpO1xuXHQgIHJldHVybiB0eXBlT2ZDaGVja2VyO1xuXHR9XG5cdFxuXHRmdW5jdGlvbiBnZXRPYmplY3RDaGVja2VyKCkge1xuXHQgIGZ1bmN0aW9uIG9iamVjdE51bGxPa0NoZWNrZXIodmFsKSB7XG5cdCAgICByZXR1cm4gdHlwZU9mKHZhbCkgPT09IFwib2JqZWN0XCI7XG5cdCAgfVxuXHQgIG9iamVjdE51bGxPa0NoZWNrZXIudHlwZSA9IFwiT2JqZWN0W251bGwgb2tdXCI7XG5cdCAgbWFrZU9wdGlvbmFsKG9iamVjdE51bGxPa0NoZWNrZXIpO1xuXHQgIGZ1bmN0aW9uIG9iamVjdENoZWNrZXIodmFsKSB7XG5cdCAgICByZXR1cm4gdmFsICE9PSBudWxsICYmIG9iamVjdE51bGxPa0NoZWNrZXIodmFsKTtcblx0ICB9XG5cdCAgb2JqZWN0Q2hlY2tlci50eXBlID0gXCJPYmplY3RcIjtcblx0ICBtYWtlT3B0aW9uYWwob2JqZWN0Q2hlY2tlcik7XG5cdCAgb2JqZWN0Q2hlY2tlci5udWxsT2sgPSBvYmplY3ROdWxsT2tDaGVja2VyO1xuXHRcblx0ICByZXR1cm4gb2JqZWN0Q2hlY2tlcjtcblx0fVxuXHRcblx0ZnVuY3Rpb24gaW5zdGFuY2VDaGVja0dldHRlcihjbGFzc1RvQ2hlY2spIHtcblx0ICBmdW5jdGlvbiBpbnN0YW5jZUNoZWNrZXIodmFsKSB7XG5cdCAgICByZXR1cm4gdmFsIGluc3RhbmNlb2YgY2xhc3NUb0NoZWNrO1xuXHQgIH1cblx0XG5cdCAgaW5zdGFuY2VDaGVja2VyLnR5cGUgPSBjbGFzc1RvQ2hlY2submFtZTtcblx0ICBtYWtlT3B0aW9uYWwoaW5zdGFuY2VDaGVja2VyKTtcblx0ICByZXR1cm4gaW5zdGFuY2VDaGVja2VyO1xuXHR9XG5cdFxuXHRmdW5jdGlvbiBvbmVPZkNoZWNrR2V0dGVyKGVudW1zKSB7XG5cdCAgZnVuY3Rpb24gb25lT2ZDaGVja2VyKHZhbCkge1xuXHQgICAgcmV0dXJuIGVudW1zLnNvbWUoZnVuY3Rpb24gKGVubSkge1xuXHQgICAgICByZXR1cm4gZW5tID09PSB2YWw7XG5cdCAgICB9KTtcblx0ICB9XG5cdFxuXHQgIG9uZU9mQ2hlY2tlci50eXBlID0gXCJlbnVtW1wiICsgZW51bXMuam9pbihcIiwgXCIpICsgXCJdXCI7XG5cdCAgbWFrZU9wdGlvbmFsKG9uZU9mQ2hlY2tlcik7XG5cdCAgcmV0dXJuIG9uZU9mQ2hlY2tlcjtcblx0fVxuXHRcblx0ZnVuY3Rpb24gb25lT2ZUeXBlQ2hlY2tHZXR0ZXIoY2hlY2tlcnMpIHtcblx0ICBmdW5jdGlvbiBvbmVPZlR5cGVDaGVja2VyKHZhbCkge1xuXHQgICAgcmV0dXJuIGNoZWNrZXJzLnNvbWUoZnVuY3Rpb24gKGNoZWNrZXIpIHtcblx0ICAgICAgcmV0dXJuIGNoZWNrZXIodmFsKTtcblx0ICAgIH0pO1xuXHQgIH1cblx0XG5cdCAgb25lT2ZUeXBlQ2hlY2tlci50eXBlID0gY2hlY2tlcnMubWFwKGdldENoZWNrZXJEaXNwbGF5KS5qb2luKFwiIG9yIFwiKTtcblx0ICBtYWtlT3B0aW9uYWwob25lT2ZUeXBlQ2hlY2tlcik7XG5cdCAgcmV0dXJuIG9uZU9mVHlwZUNoZWNrZXI7XG5cdH1cblx0XG5cdGZ1bmN0aW9uIGFycmF5T2ZDaGVja0dldHRlcihjaGVja2VyKSB7XG5cdCAgZnVuY3Rpb24gYXJyYXlPZkNoZWNrZXIodmFsKSB7XG5cdCAgICByZXR1cm4gY2hlY2tlcnMuYXJyYXkodmFsKSAmJiB2YWwuZXZlcnkoY2hlY2tlcik7XG5cdCAgfVxuXHRcblx0ICBhcnJheU9mQ2hlY2tlci50eXBlID0gXCJhcnJheU9mW1wiICsgZ2V0Q2hlY2tlckRpc3BsYXkoY2hlY2tlcikgKyBcIl1cIjtcblx0ICBtYWtlT3B0aW9uYWwoYXJyYXlPZkNoZWNrZXIpO1xuXHQgIHJldHVybiBhcnJheU9mQ2hlY2tlcjtcblx0fVxuXHRcblx0ZnVuY3Rpb24gb2JqZWN0T2ZDaGVja0dldHRlcihjaGVja2VyKSB7XG5cdCAgZnVuY3Rpb24gb2JqZWN0T2ZDaGVja2VyKHZhbCkge1xuXHQgICAgcmV0dXJuIGNoZWNrZXJzLm9iamVjdCh2YWwpICYmIGVhY2godmFsLCBjaGVja2VyKTtcblx0ICB9XG5cdFxuXHQgIG9iamVjdE9mQ2hlY2tlci50eXBlID0gXCJvYmplY3RPZltcIiArIGdldENoZWNrZXJEaXNwbGF5KGNoZWNrZXIpICsgXCJdXCI7XG5cdCAgbWFrZU9wdGlvbmFsKG9iamVjdE9mQ2hlY2tlcik7XG5cdCAgcmV0dXJuIG9iamVjdE9mQ2hlY2tlcjtcblx0fVxuXHRcblx0ZnVuY3Rpb24gZ2V0U2hhcGVDaGVja0dldHRlcigpIHtcblx0ICBmdW5jdGlvbiBzaGFwZUNoZWNrR2V0dGVyKHNoYXBlKSB7XG5cdCAgICBmdW5jdGlvbiBzaGFwZUNoZWNrZXIodmFsKSB7XG5cdCAgICAgIHJldHVybiBjaGVja2Vycy5vYmplY3QodmFsKSAmJiBlYWNoKHNoYXBlLCBmdW5jdGlvbiAoY2hlY2tlciwgcHJvcCkge1xuXHQgICAgICAgIGlmICghdmFsLmhhc093blByb3BlcnR5KHByb3ApICYmIGNoZWNrZXIuaXNPcHRpb25hbCkge1xuXHQgICAgICAgICAgcmV0dXJuIHRydWU7XG5cdCAgICAgICAgfSBlbHNlIHtcblx0ICAgICAgICAgIHJldHVybiBjaGVja2VyKHZhbFtwcm9wXSwgcHJvcCwgdmFsKTtcblx0ICAgICAgICB9XG5cdCAgICAgIH0pICYmICghc2hhcGVDaGVja2VyLnN0cmljdCB8fCBlYWNoKHZhbCwgZnVuY3Rpb24gKHByb3AsIG5hbWUpIHtcblx0ICAgICAgICByZXR1cm4gc2hhcGUuaGFzT3duUHJvcGVydHkobmFtZSk7XG5cdCAgICAgIH0pKTtcblx0ICAgIH1cblx0XG5cdCAgICB2YXIgY29waWVkU2hhcGUgPSBjb3B5KHNoYXBlKTtcblx0ICAgIGVhY2goY29waWVkU2hhcGUsIGZ1bmN0aW9uICh2YWwsIHByb3ApIHtcblx0ICAgICAgY29waWVkU2hhcGVbcHJvcF0gPSBnZXRDaGVja2VyRGlzcGxheSh2YWwpO1xuXHQgICAgfSk7XG5cdCAgICBzaGFwZUNoZWNrZXIudHlwZSA9IFwic2hhcGUoXCIgKyBKU09OLnN0cmluZ2lmeShjb3BpZWRTaGFwZSkgKyBcIilcIjtcblx0ICAgIG1ha2VPcHRpb25hbChzaGFwZUNoZWNrZXIpO1xuXHQgICAgcmV0dXJuIHNoYXBlQ2hlY2tlcjtcblx0ICB9XG5cdFxuXHQgIHNoYXBlQ2hlY2tHZXR0ZXIuaWZOb3QgPSBmdW5jdGlvbiBpZk5vdChvdGhlclByb3BzLCBwcm9wQ2hlY2tlcikge1xuXHQgICAgaWYgKCFBcnJheS5pc0FycmF5KG90aGVyUHJvcHMpKSB7XG5cdCAgICAgIG90aGVyUHJvcHMgPSBbb3RoZXJQcm9wc107XG5cdCAgICB9XG5cdCAgICBmdW5jdGlvbiBpZk5vdENoZWNrZXIocHJvcCwgcHJvcE5hbWUsIG9iaikge1xuXHQgICAgICB2YXIgcHJvcEV4aXN0cyA9IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcE5hbWUpO1xuXHQgICAgICB2YXIgb3RoZXJQcm9wc0V4aXN0ID0gb3RoZXJQcm9wcy5zb21lKGZ1bmN0aW9uIChvdGhlclByb3ApIHtcblx0ICAgICAgICByZXR1cm4gb2JqICYmIG9iai5oYXNPd25Qcm9wZXJ0eShvdGhlclByb3ApO1xuXHQgICAgICB9KTtcblx0ICAgICAgcmV0dXJuIHByb3BFeGlzdHMgIT09IG90aGVyUHJvcHNFeGlzdCAmJiAoIXByb3BFeGlzdHMgfHwgcHJvcEV4aXN0cyAmJiBwcm9wQ2hlY2tlcihwcm9wKSAmJiAhb3RoZXJQcm9wc0V4aXN0KTtcblx0ICAgIH1cblx0ICAgIGlmTm90Q2hlY2tlci50eXBlID0gXCJpZk5vdFtcIiArIG90aGVyUHJvcHMuam9pbihcIiwgXCIpICsgXCJdXCI7XG5cdCAgICBtYWtlT3B0aW9uYWwoaWZOb3RDaGVja2VyKTtcblx0ICAgIHJldHVybiBpZk5vdENoZWNrZXI7XG5cdCAgfTtcblx0XG5cdCAgc2hhcGVDaGVja0dldHRlci5vbmx5SWYgPSBmdW5jdGlvbiBvbmx5SWYob3RoZXJQcm9wcywgcHJvcENoZWNrZXIpIHtcblx0ICAgIGlmICghQXJyYXkuaXNBcnJheShvdGhlclByb3BzKSkge1xuXHQgICAgICBvdGhlclByb3BzID0gW290aGVyUHJvcHNdO1xuXHQgICAgfVxuXHQgICAgZnVuY3Rpb24gb25seUlmQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgb2JqKSB7XG5cdCAgICAgIHJldHVybiBvdGhlclByb3BzLmV2ZXJ5KGZ1bmN0aW9uIChwcm9wKSB7XG5cdCAgICAgICAgcmV0dXJuIG9iai5oYXNPd25Qcm9wZXJ0eShwcm9wKTtcblx0ICAgICAgfSkgJiYgcHJvcENoZWNrZXIocHJvcCk7XG5cdCAgICB9XG5cdCAgICBvbmx5SWZDaGVja2VyLnR5cGUgPSBcIm9ubHlJZltcIiArIG90aGVyUHJvcHMuam9pbihcIiwgXCIpICsgXCJdXCI7XG5cdCAgICBtYWtlT3B0aW9uYWwob25seUlmQ2hlY2tlcik7XG5cdCAgICByZXR1cm4gb25seUlmQ2hlY2tlcjtcblx0ICB9O1xuXHRcblx0ICByZXR1cm4gc2hhcGVDaGVja0dldHRlcjtcblx0fVxuXHRcblx0ZnVuY3Rpb24gYW55Q2hlY2tHZXR0ZXIoKSB7XG5cdCAgZnVuY3Rpb24gYW55Q2hlY2tlcigpIHtcblx0ICAgIHJldHVybiB0cnVlO1xuXHQgIH1cblx0XG5cdCAgYW55Q2hlY2tlci50eXBlID0gXCJhbnlcIjtcblx0ICBtYWtlT3B0aW9uYWwoYW55Q2hlY2tlcik7XG5cdCAgcmV0dXJuIGFueUNoZWNrZXI7XG5cdH1cblx0XG5cdGZ1bmN0aW9uIG1ha2VPcHRpb25hbChjaGVja2VyKSB7XG5cdCAgY2hlY2tlci5vcHRpb25hbCA9IGZ1bmN0aW9uIG9wdGlvbmFsQ2hlY2soKSB7XG5cdCAgICByZXR1cm4gY2hlY2tlci5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG5cdCAgfTtcblx0ICBjaGVja2VyLm9wdGlvbmFsLmlzT3B0aW9uYWwgPSB0cnVlO1xuXHQgIGNoZWNrZXIub3B0aW9uYWwudHlwZSA9IGNoZWNrZXIudHlwZTtcblx0ICBjaGVja2VyLm9wdGlvbmFsLmRpc3BsYXlOYW1lID0gY2hlY2tlci5kaXNwbGF5TmFtZTtcblx0fVxuXG4vKioqLyB9XG4vKioqKioqLyBdKVxufSk7XG5cbi8vIyBzb3VyY2VNYXBwaW5nVVJMPWRhdGE6YXBwbGljYXRpb24vanNvbjtiYXNlNjQsZXlKMlpYSnphVzl1SWpvekxDSnpiM1Z5WTJWeklqcGJJbmRsWW5CaFkyczZMeTh2ZDJWaWNHRmpheTkxYm1sMlpYSnpZV3hOYjJSMWJHVkVaV1pwYm1sMGFXOXVJaXdpZDJWaWNHRmphem92THk5M1pXSndZV05yTDJKdmIzUnpkSEpoY0NCbE9HTTNNRGRpTURCaE1UZzFOVFE1T1RVNE1DSXNJbmRsWW5CaFkyczZMeTh2TGk5cGJtUmxlQzVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTloY0dsRGFHVmpheTVxY3lJc0luZGxZbkJoWTJzNkx5OHZMaTloY0dsRGFHVmphMVYwYVd3dWFuTWlMQ0ozWldKd1lXTnJPaTh2THk0dlkyaGxZMnRsY25NdWFuTWlYU3dpYm1GdFpYTWlPbHRkTENKdFlYQndhVzVuY3lJNklqczdRVUZCUVR0QlFVTkJPMEZCUTBFN1FVRkRRVHRCUVVOQk8wRkJRMEU3UVVGRFFUdEJRVU5CTzBGQlEwRTdRVUZEUVN4RFFVRkRPMEZCUTBRc1R6dEJRMVpCTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHM3UVVGRlFUdEJRVU5CTzBGQlEwRTdPMEZCUlVFN1FVRkRRVHRCUVVOQkxIVkNRVUZsTzBGQlEyWTdRVUZEUVR0QlFVTkJPenRCUVVWQk8wRkJRMEU3TzBGQlJVRTdRVUZEUVRzN1FVRkZRVHRCUVVOQk8wRkJRMEU3T3p0QlFVZEJPMEZCUTBFN08wRkJSVUU3UVVGRFFUczdRVUZGUVR0QlFVTkJPenRCUVVWQk8wRkJRMEVzZDBNN096czdPenM3T3pzN096dEJRM1JEUVN4UFFVRk5MRU5CUVVNc1QwRkJUeXhIUVVGSExHMUNRVUZQTEVOQlFVTXNiVUpCUVZrc1EwRkJReXhET3pzN096czdPenM3T3p0blFrTkJXU3h0UWtGQlR5eERRVUZETEhWQ1FVRm5RaXhEUVVGRE96dExRVUYwUlN4SlFVRkpMRmxCUVVvc1NVRkJTVHRMUVVGRkxGRkJRVkVzV1VGQlVpeFJRVUZSTzB0QlFVVXNhVUpCUVdsQ0xGbEJRV3BDTEdsQ1FVRnBRanRMUVVGRkxFMUJRVTBzV1VGQlRpeE5RVUZOT3p0QlFVTTVReXhMUVVGSkxGRkJRVkVzUjBGQlJ5eHRRa0ZCVHl4RFFVRkRMRzFDUVVGWkxFTkJRVU1zUTBGQlF6dEJRVU55UXl4TFFVRkpMRkZCUVZFc1IwRkJSeXhMUVVGTExFTkJRVU03TzBGQlJYSkNMRTlCUVUwc1EwRkJReXhQUVVGUExFZEJRVWNzVVVGQlVTeERRVUZET3p0QlFVVXhRaXhMUVVGSkxHOUNRVUZ2UWl4SFFVRkhPMEZCUTNwQ0xGbEJRVThzVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXp0QlFVTjRRaXhQUVVGSkxFVkJRVVVzVjBGQlZ5eERRVUZETEV0QlFVc3NRMEZCUXp0QlFVTjRRaXhWUVVGUExFVkJRVVU3V1VGQlRTeFJRVUZSTEVkQlFVY3NTVUZCU1R0SlFVRkJPMEZCUXpsQ0xGTkJRVTBzUlVGQlJUdFpRVUZOTEZGQlFWRXNSMEZCUnl4TFFVRkxPMGxCUVVFN1FVRkRPVUlzYTBKQlFXVXNSVUZCWml4bFFVRmxPMEZCUTJZc2NVSkJRV3RDTEVWQlFXeENMR3RDUVVGclFqdEJRVU5zUWl4VFFVRk5MRVZCUVVVN1FVRkRUaXhYUVVGTkxFVkJRVVU3UVVGRFRpeGhRVUZOTEVWQlFVVXNSVUZCUlR0QlFVTldMR0ZCUVUwc1JVRkJSU3hGUVVGRk8wRkJRMVlzYTBKQlFWY3NSVUZCUlN4RlFVRkZPMDFCUTJoQ08wbEJRMFk3UlVGRFJpeERRVUZET3p0QlFVVkdMRXRCUVVrc1EwRkJReXh2UWtGQmIwSXNSVUZCUlN4VlFVRkRMRTlCUVU4c1JVRkJSU3hKUVVGSk8xVkJRVXNzVFVGQlRTeERRVUZETEU5QlFVOHNRMEZCUXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhQUVVGUE8wVkJRVUVzUTBGQlF5eERRVUZETzBGQlF6bEZMRXRCUVVrc1EwRkJReXhSUVVGUkxFVkJRVVVzVlVGQlF5eFBRVUZQTEVWQlFVVXNTVUZCU1R0VlFVRkxMRTFCUVUwc1EwRkJReXhQUVVGUExFTkJRVU1zU1VGQlNTeERRVUZETEVkQlFVY3NUMEZCVHp0RlFVRkJMRU5CUVVNc1EwRkJRenM3UVVGSmJFVXNWVUZCVXl4UlFVRlJMRU5CUVVNc1IwRkJSeXhGUVVGRkxFbEJRVWtzUlVGQlJTeE5RVUZOTEVWQlFVVTdPMEZCUlc1RExFOUJRVWtzVDBGQlR5eERRVUZETzBGQlExb3NUMEZCU1N4UlFVRlJMRVZCUVVVN1FVRkRXaXhaUVVGUExFbEJRVWtzUTBGQlF6dEpRVU5pTzBGQlEwUXNUMEZCU1N4RFFVRkRMRWxCUVVrc1JVRkJSVHRCUVVOVUxGZEJRVTBzU1VGQlNTeExRVUZMTEVOQlFVTXNLME5CUVN0RExFTkJRVU1zUTBGQlF6dEpRVU5zUlR0QlFVTkVMRTlCUVVrc1IwRkJSeXhMUVVGTExFTkJRVU1zVTBGQlV5eERRVUZETEV0QlFVc3NRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFTkJRVU03UVVGRGVFTXNUMEZCU1N4UlFVRlJMRU5CUVVNc1MwRkJTeXhEUVVGRExFZEJRVWNzUTBGQlF5eEZRVUZGTzBGQlEzWkNMRmxCUVU4c1IwRkJSeXhsUVVGbExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4SlFVRkpMR2RDUVVGblFpeERRVUZETEVkQlFVY3NSVUZCUlN4SlFVRkpMRU5CUVVNc1EwRkJRenRKUVVOeVJTeE5RVUZOTEVsQlFVa3NVVUZCVVN4RFFVRkRMRWxCUVVrc1EwRkJReXhIUVVGSExFTkJRVU1zUlVGQlJUdEJRVU0zUWl4WlFVRlBMRWRCUVVjc1IwRkJSeXhEUVVGRExFbEJRVWtzUTBGQlF5eERRVUZETEVOQlFVTXNRMEZCUXl4RFFVRkRPMGxCUTNoQ0xFMUJRVTA3UVVGRFRDeFhRVUZOTEVsQlFVa3NTMEZCU3l4RFFVRkRMRzFFUVVGdFJDeERRVUZETEVOQlFVTTdTVUZEZEVVN1FVRkRSQ3hWUVVGUExFOUJRVThzUjBGQlJ5eEpRVUZKTEVkQlFVY3NUVUZCVFN4RFFVRkRMRTlCUVU4c1EwRkJReXhsUVVGbExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NSVUZCUlN4TlFVRk5MRU5CUVVNc1EwRkJRenRGUVVNelJUczdRVUZGUkN4VlFVRlRMR2RDUVVGblFpeERRVUZETEVkQlFVY3NSVUZCUlN4SlFVRkpMRVZCUVVVN1FVRkRia01zVDBGQlNTeFBRVUZQTEVkQlFVY3NTVUZCU1N4RFFVRkRPMEZCUTI1Q0xFOUJRVWtzV1VGQldTeEhRVUZITEVOQlFVTXNRMEZCUXp0QlFVTnlRaXhQUVVGSkxGRkJRVkVzUjBGQlJ5eERRVUZETEVOQlFVTTdRVUZEYWtJc1QwRkJTU3hIUVVGSExFVkJRVVVzVDBGQlR5eEZRVUZGTEVkQlFVY3NRMEZCUXpzN1FVRkZkRUlzVlVGQlRTeEhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRkZCUVZFc1JVRkJSU3hEUVVGRExFVkJRVVU3UVVGRE5VSXNXVUZCVHl4SFFVRkhMRWRCUVVjc1EwRkJReXhaUVVGWkxFVkJRVVVzUTBGQlF5eERRVUZETzBGQlF6bENMRkZCUVVjc1IwRkJSeXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVOQlFVTTdRVUZEYmtJc1UwRkJTU3hEUVVGRExFZEJRVWNzU1VGQlNTeERRVUZETEU5QlFVOHNRMEZCUXl4VlFVRlZMRVZCUVVVN1FVRkRMMElzWTBGQlR5eExRVUZMTEVOQlFVTTdUVUZEWkN4TlFVRk5MRWxCUVVrc1EwRkJReXhIUVVGSExFVkJRVVU3UVVGRFppeGxRVUZSTEVWQlFVVXNRMEZCUXp0TlFVTmFPMGxCUTBZN1FVRkRSQ3hWUVVGUExFOUJRVThzUTBGQlF6dEZRVU5vUWpzN1FVRkZSQ3hWUVVGVExHVkJRV1VzUTBGQlF5eEhRVUZITEVWQlFVVXNTVUZCU1N4RlFVRkZPMEZCUTJ4RExFOUJRVWtzV1VGQldTeEhRVUZITEVkQlFVY3NRMEZCUXl4TlFVRk5MRU5CUVVNc1YwRkJRenRaUVVGSkxFTkJRVU1zUTBGQlF5eERRVUZETEZWQlFWVTdTVUZCUVN4RFFVRkRMRU5CUVVNN1FVRkRiRVFzVlVGQlR5eEpRVUZKTEVOQlFVTXNUVUZCVFN4SlFVRkpMRmxCUVZrc1EwRkJReXhOUVVGTkxFTkJRVU03UlVGRE0wTTdPMEZCUjBRc1ZVRkJVeXhYUVVGWExFTkJRVU1zVjBGQlZ5eEZRVUZGTzBGQlEyaERMRlZCUVU4c1UwRkJVeXhsUVVGbExFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NSVUZCUlN4TlFVRk5MRVZCUVVVN1FVRkRha1FzVTBGQlNTeFJRVUZSTEVWQlFVVTdRVUZEV2l4alFVRlBMRWxCUVVrc1EwRkJRenROUVVOaU8wRkJRMFFzVTBGQlNTeFBRVUZQTEVkQlFVY3NVVUZCVVN4RFFVRkRMRWRCUVVjc1JVRkJSU3hKUVVGSkxFVkJRVVVzVFVGQlRTeERRVUZETEVOQlFVTTdRVUZETVVNc1YwRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eHJRa0ZCYTBJc1EwRkJReXhQUVVGUExFVkJRVVVzVjBGQlZ5eERRVUZETEVOQlFVTTdTVUZEZWtRc1EwRkJRenRGUVVOSU96dEJRVVZFTEZWQlFWTXNhMEpCUVd0Q0xFTkJRVU1zVDBGQlR5eEZRVUZGTEZkQlFWY3NSVUZCUlR0QlFVTm9SQ3hQUVVGSkxGZEJRVmNzU1VGQlNTeFBRVUZQTEVWQlFVVTdRVUZETVVJc1YwRkJUU3hKUVVGSkxFdEJRVXNzUTBGQlF5eFBRVUZQTEVOQlFVTXNRMEZCUXp0SlFVTXhRaXhOUVVGTkxFbEJRVWtzVDBGQlR5eEZRVUZGTzBGQlEyeENMRmxCUVU4c1EwRkJReXhKUVVGSkxFTkJRVU1zVDBGQlR5eERRVUZETEVOQlFVTTdTVUZEZGtJN1JVRkRSanM3UVVGRlJDeFZRVUZUTEdWQlFXVXNRMEZCUXl4SFFVRkhMRVZCUVVVc1NVRkJTU3hGUVVGbE8wOUJRV0lzVFVGQlRTeG5RMEZCUnl4RlFVRkZPenM3UVVGRk4wTXNUMEZCU1N4SlFVRkpMRWRCUVVjc1RVRkJUU3hEUVVGRExFOUJRVThzUTBGQlF5eE5RVUZOTEVOQlFVTXNUVUZCVFN4SlFVRkpMRVZCUVVVc1EwRkJRenRCUVVNNVF5eFBRVUZKTEUxQlFVMHNSMEZCUnl4UFFVRkhMRWxCUVVrc1EwRkJReXhOUVVGTkxFbEJRVWtzUlVGQlJTeFhRVUZKTEUxQlFVMHNRMEZCUXl4TlFVRk5MRWxCUVVrc1JVRkJSU3hIUVVGSExFbEJRVWtzUlVGQlJTeERRVUZETzBGQlEyeEZMRTlCUVVrc1RVRkJUU3hIUVVGSExFOUJRVWNzVFVGQlRTeERRVUZETEUxQlFVMHNTVUZCU1N4RlFVRkZMRmRCUVVrc1NVRkJTU3hEUVVGRExFMUJRVTBzU1VGQlNTeEZRVUZGTEVkQlFVY3NTVUZCU1N4RlFVRkZMRU5CUVVNN1FVRkRiRVVzVDBGQlNTeEhRVUZITEVkQlFVY3NTVUZCU1N4RFFVRkRMRmRCUVZjc1NVRkJTU3hOUVVGTkxFTkJRVU1zUjBGQlJ5eEpRVUZKTEUxQlFVY3NTVUZCU1N4RFFVRkRMRmRCUVZjc1VVRkJSeXhOUVVGTkxFTkJRVU1zUjBGQlJ5eEZRVUZITEVsQlFVa3NSVUZCUlN4RFFVRkRPMEZCUTNSR0xGVkJRVThzVFVGQlJ5eE5RVUZOTEZOQlFVa3NNRUpCUVRCQ0xFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NRMEZCUXl4VFFVRkpMRTFCUVUwc1ZVRkJTU3hIUVVGSExFbEJRVWtzUlVGQlJTeEhRVUZITEVsQlFVa3NSVUZCUlN4RFFVRkRPMFZCUXpOR096dEJRVVZFTEZWQlFWTXNNRUpCUVRCQ0xFTkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NSVUZCUlR0QlFVTTNReXhOUVVGSExFZEJRVWNzVVVGQlVTeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMEZCUTNCQ0xFOUJRVWtzUjBGQlJ5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRU5CUVVNN1FVRkRkRUlzVDBGQlNTeFJRVUZSTEVkQlFVY3NSMEZCUnl4RFFVRkRMRWRCUVVjc1EwRkJReXhwUWtGQlR5eEZRVUZKTzBGQlEyaERMRmxCUVU4c2FVSkJRV2xDTEVOQlFVTXNUMEZCVHl4RFFVRkRMRU5CUVVNN1NVRkRia01zUTBGQlF5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1EwRkJRenRCUVVOa0xFOUJRVWtzVjBGQlZ5eEhRVUZITEVsQlFVa3NRMEZCUXl4TlFVRk5MRWRCUVVjc1IwRkJSeXhIUVVGSExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNZVUZCWVN4RFFVRkRMRU5CUVVNc1NVRkJTU3hEUVVGRExFbEJRVWtzUTBGQlF5eEhRVUZITEVkQlFVY3NSMEZCUnl4VFFVRlRMRU5CUVVNN1FVRkRNMFlzVlVGQlR5d3JRa0ZCSzBJc1IwRkJSeXhYUVVGWExFZEJRVWNzTkVKQlFUUkNMRWRCUVVjc1VVRkJVU3hIUVVGSExFZEJRVWNzUTBGQlF6dEZRVU4wUnpzN1FVRkZSQ3hMUVVGSkxHRkJRV0VzUjBGQlJ6dEJRVU5zUWl4VFFVRk5MRVZCUVVVc1ZVRkJWVHRCUVVOc1FpeFJRVUZMTEVWQlFVVXNWVUZCVlR0RlFVTnNRaXhEUVVGRE96dEJRVVZHTEZWQlFWTXNWVUZCVlN4RFFVRkRMRWRCUVVjc1JVRkJSVHRCUVVOMlFpeFBRVUZKTEZWQlFWVXNSMEZCUnl4RlFVRkZMRU5CUVVNN1FVRkRjRUlzVDBGQlNTeERRVUZETEVkQlFVY3NSVUZCUlN4VlFVRkRMRU5CUVVNc1JVRkJReXhEUVVGRE8xbEJRVXNzVlVGQlZTeERRVUZETEVOQlFVTXNRMEZCUXl4SFFVRkhMR0ZCUVdFc1EwRkJReXhEUVVGRExFTkJRVU03U1VGQlFTeERRVUZETEVOQlFVTTdRVUZEY2tRc1ZVRkJUeXhKUVVGSkxFTkJRVU1zVTBGQlV5eERRVUZETEVkQlFVY3NSVUZCUlN4VlFVRkRMRU5CUVVNc1JVRkJSU3hEUVVGRE8xbEJRVXNzVlVGQlZTeERRVUZETEVOQlFVTXNRMEZCUXl4SlFVRkpMRU5CUVVNN1NVRkJRU3hEUVVGRExFTkJRVU03UlVGRE1VUTdPMEZCUlVRc1ZVRkJVeXhoUVVGaExFTkJRVU1zUjBGQlJ5eEZRVUZGTzBGQlF6RkNMRTlCUVVrc1MwRkJTeXhIUVVGSExFZEJRVWNzU1VGQlNTeEhRVUZITEVOQlFVTXNWMEZCVnl4SlFVRkpMRWRCUVVjc1EwRkJReXhYUVVGWExFTkJRVU1zU1VGQlNTeERRVUZETzBGQlF6TkVMRlZCUVU4c1MwRkJTeXhIUVVGSExHRkJRV0VzUTBGQlF5eExRVUZMTEVOQlFVTXNSMEZCUnl4aFFVRmhMRU5CUVVNc1MwRkJTeXhEUVVGRExFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NTMEZCU3l4SFFVRkhMRWRCUVVjc1MwRkJTeXhKUVVGSkxFZEJRVWNzVFVGQlRTeEhRVUZITEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1EwRkJRenM3T3pzN096czdPenM3TzBGRGRraG9TQ3hQUVVGTkxFTkJRVU1zVDBGQlR5eEhRVUZITEVWQlFVTXNTVUZCU1N4RlFVRktMRWxCUVVrc1JVRkJSU3hKUVVGSkxFVkJRVW9zU1VGQlNTeEZRVUZGTEUxQlFVMHNSVUZCVGl4TlFVRk5MRVZCUVVVc1VVRkJVU3hGUVVGU0xGRkJRVkVzUlVGQlJTeHBRa0ZCYVVJc1JVRkJha0lzYVVKQlFXbENMRVZCUVVNc1EwRkJRenM3UVVGRmJrVXNWVUZCVXl4SlFVRkpMRU5CUVVNc1IwRkJSeXhGUVVGRk8wRkJRMnBDTEU5QlFVa3NUVUZCVFN4SFFVRkhMRXRCUVVzc1EwRkJReXhQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETEVkQlFVY3NSVUZCUlN4SFFVRkhMRVZCUVVVc1EwRkJRenRCUVVNeFF5eFBRVUZKTEVOQlFVTXNSMEZCUnl4RlFVRkZMRlZCUVVNc1IwRkJSeXhGUVVGRkxFZEJRVWM3V1VGQlN5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWRCUVVjc1IwRkJSenRKUVVGQkxFTkJRVU1zUTBGQlF6dEJRVU16UXl4VlFVRlBMRTFCUVUwc1EwRkJRenRGUVVObU96dEJRVWRFTEZWQlFWTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1JVRkJSVHRCUVVOdVFpeFBRVUZKTEV0QlFVc3NRMEZCUXl4UFFVRlBMRU5CUVVNc1IwRkJSeXhEUVVGRExFVkJRVVU3UVVGRGRFSXNXVUZCVHl4UFFVRlBMRU5CUVVNN1NVRkRhRUlzVFVGQlRTeEpRVUZKTEVkQlFVY3NXVUZCV1N4TlFVRk5MRVZCUVVVN1FVRkRhRU1zV1VGQlR5eFJRVUZSTEVOQlFVTTdTVUZEYWtJc1RVRkJUVHRCUVVOTUxGbEJRVThzVDBGQlR5eEhRVUZITEVOQlFVTTdTVUZEYmtJN1JVRkRSanM3UVVGRlJDeFZRVUZUTEdsQ1FVRnBRaXhEUVVGRExFOUJRVThzUlVGQlJUdEJRVU5zUXl4VlFVRlBMRU5CUVVNc1QwRkJUeXhEUVVGRExFbEJRVWtzU1VGQlNTeFBRVUZQTEVOQlFVTXNWMEZCVnl4SlFVRkpMRTlCUVU4c1EwRkJReXhKUVVGSkxFdEJRVXNzVDBGQlR5eERRVUZETEZWQlFWVXNSMEZCUnl4aFFVRmhMRWRCUVVjc1JVRkJSU3hEUVVGRExFTkJRVU03UlVGRE1VYzdPMEZCUlVRc1ZVRkJVeXhSUVVGUkxFTkJRVU1zUjBGQlJ5eEZRVUZGTzBGQlEzSkNMRTlCUVVrc1EwRkJReXhIUVVGSExFVkJRVVU3UVVGRFVpeFpRVUZQTEVWQlFVVXNRMEZCUXp0SlFVTllMRTFCUVUwc1NVRkJTU3hMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEVkQlFVY3NRMEZCUXl4RlFVRkZPMEZCUXpkQ0xGbEJRVThzUjBGQlJ5eERRVUZETzBsQlExb3NUVUZCVFR0QlFVTk1MRmxCUVU4c1EwRkJReXhIUVVGSExFTkJRVU1zUTBGQlF6dEpRVU5rTzBWQlEwWTdPMEZCUjBRc1ZVRkJVeXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEZGQlFWRXNSVUZCUlN4UFFVRlBMRVZCUVVVN1FVRkRjRU1zVDBGQlNTeExRVUZMTEVOQlFVTXNUMEZCVHl4RFFVRkRMRWRCUVVjc1EwRkJReXhGUVVGRk8wRkJRM1JDTEZsQlFVOHNVVUZCVVN4clFrRkJTU3hUUVVGVExFTkJRVU1zUTBGQlF6dEpRVU12UWl4TlFVRk5PMEZCUTB3c1dVRkJUeXhQUVVGUExHdENRVUZKTEZOQlFWTXNRMEZCUXl4RFFVRkRPMGxCUXpsQ08wVkJRMFk3TzBGQlJVUXNWVUZCVXl4UFFVRlBMRU5CUVVNc1IwRkJSeXhGUVVGRkxGRkJRVkVzUlVGQlJTeFBRVUZQTEVWQlFVVTdRVUZEZGtNc1QwRkJTU3hIUVVGSExFTkJRVU03UVVGRFVpeFBRVUZKTEUxQlFVMHNSMEZCUnl4TlFVRk5MRU5CUVVNc1UwRkJVeXhEUVVGRExHTkJRV01zUTBGQlF6dEJRVU0zUXl4UlFVRkxMRWxCUVVrc1IwRkJSeXhKUVVGSkxFZEJRVWNzUlVGQlJUdEJRVU51UWl4VFFVRkpMRTFCUVUwc1EwRkJReXhKUVVGSkxFTkJRVU1zUjBGQlJ5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RlFVRkZPMEZCUTNwQ0xGVkJRVWNzUjBGQlJ5eFJRVUZSTEVOQlFVTXNTVUZCU1N4RFFVRkRMRTlCUVU4c1JVRkJSU3hIUVVGSExFTkJRVU1zUjBGQlJ5eERRVUZETEVWQlFVVXNSMEZCUnl4RlFVRkZMRWRCUVVjc1EwRkJReXhEUVVGRE8wRkJRMnBFTEZkQlFVa3NSMEZCUnl4TFFVRkxMRXRCUVVzc1JVRkJSVHRCUVVOcVFpeG5Ra0ZCVHl4SFFVRkhMRU5CUVVNN1VVRkRXanROUVVOR08wbEJRMFk3UVVGRFJDeFZRVUZQTEVsQlFVa3NRMEZCUXp0RlFVTmlPenRCUVVWRUxGVkJRVk1zVVVGQlVTeERRVUZETEVkQlFVY3NSVUZCUlN4UlFVRlJMRVZCUVVVc1QwRkJUeXhGUVVGRk8wRkJRM2hETEU5QlFVa3NSMEZCUnl4RFFVRkRPMEZCUTFJc1QwRkJTU3hOUVVGTkxFZEJRVWNzUjBGQlJ5eERRVUZETEUxQlFVMHNRMEZCUXp0QlFVTjRRaXhSUVVGTExFbEJRVWtzUTBGQlF5eEhRVUZITEVOQlFVTXNSVUZCUlN4RFFVRkRMRWRCUVVjc1RVRkJUU3hGUVVGRkxFTkJRVU1zUlVGQlJTeEZRVUZGTzBGQlF5OUNMRkZCUVVjc1IwRkJSeXhSUVVGUkxFTkJRVU1zU1VGQlNTeERRVUZETEU5QlFVOHNSVUZCUlN4SFFVRkhMRU5CUVVNc1EwRkJReXhEUVVGRExFVkJRVVVzUTBGQlF5eEZRVUZGTEVkQlFVY3NRMEZCUXl4RFFVRkRPMEZCUXpkRExGTkJRVWtzUjBGQlJ5eExRVUZMTEV0QlFVc3NSVUZCUlR0QlFVTnFRaXhqUVVGUExFZEJRVWNzUTBGQlF6dE5RVU5hTzBsQlEwWTdRVUZEUkN4VlFVRlBMRWxCUVVrc1EwRkJRenM3T3pzN096czdPenM3TzJkQ1EyNUZaME1zYlVKQlFVOHNRMEZCUXl4MVFrRkJaMElzUTBGQlF6czdTMEZCYkVVc1RVRkJUU3haUVVGT0xFMUJRVTA3UzBGQlJTeEpRVUZKTEZsQlFVb3NTVUZCU1R0TFFVRkZMRWxCUVVrc1dVRkJTaXhKUVVGSk8wdEJRVVVzYVVKQlFXbENMRmxCUVdwQ0xHbENRVUZwUWpzN1FVRkRNVU1zUzBGQlNTeFJRVUZSTEVkQlFVY3NUVUZCVFN4RFFVRkRMRTlCUVU4c1IwRkJSenRCUVVNNVFpeFJRVUZMTEVWQlFVVXNaMEpCUVdkQ0xFTkJRVU1zVDBGQlR5eERRVUZETzBGQlEyaERMRTlCUVVrc1JVRkJSU3huUWtGQlowSXNRMEZCUXl4VFFVRlRMRU5CUVVNN1FVRkRha01zVDBGQlNTeEZRVUZGTEdkQ1FVRm5RaXhEUVVGRExGVkJRVlVzUTBGQlF6dEJRVU5zUXl4VFFVRk5MRVZCUVVVc1owSkJRV2RDTEVOQlFVTXNVVUZCVVN4RFFVRkRPMEZCUTJ4RExGTkJRVTBzUlVGQlJTeG5Ra0ZCWjBJc1EwRkJReXhSUVVGUkxFTkJRVU03UVVGRGJFTXNVMEZCVFN4RlFVRkZMR2RDUVVGblFpeEZRVUZGT3p0QlFVVXhRaXhoUVVGVkxFVkJRVVVzYlVKQlFXMUNPMEZCUXk5Q0xGRkJRVXNzUlVGQlJTeG5Ra0ZCWjBJN1FVRkRka0lzV1VGQlV5eEZRVUZGTEc5Q1FVRnZRanM3UVVGRkwwSXNWVUZCVHl4RlFVRkZMR3RDUVVGclFqdEJRVU16UWl4WFFVRlJMRVZCUVVVc2JVSkJRVzFDT3p0QlFVVTNRaXhSUVVGTExFVkJRVVVzYlVKQlFXMUNMRVZCUVVVN08wRkJSVFZDTEUxQlFVY3NSVUZCUlN4alFVRmpMRVZCUVVVN1JVRkRkRUlzUTBGQlF6czdRVUZGUml4TFFVRkpMRU5CUVVNc1VVRkJVU3hGUVVGRkxHbENRVUZQTEVWQlFVazdRVUZEZUVJc1ZVRkJUeXhEUVVGRExGZEJRVmNzYTBKQlFXbENMRTlCUVU4c1EwRkJReXhKUVVGSkxHMUNRVUZwUWl4RFFVRkRPMFZCUTI1RkxFTkJRVU1zUTBGQlF6czdRVUZIU0N4VlFVRlRMR2RDUVVGblFpeERRVUZETEVsQlFVa3NSVUZCUlR0QlFVTTVRaXhQUVVGSkxFdEJRVXNzUjBGQlJ5eEpRVUZKTEVOQlFVTXNWMEZCVnl4RlFVRkZMRU5CUVVNN1FVRkRMMElzV1VGQlV5eGhRVUZoTEVOQlFVTXNSMEZCUnl4RlFVRkZPMEZCUXpGQ0xGbEJRVThzVFVGQlRTeERRVUZETEVkQlFVY3NRMEZCUXl4TFFVRkxMRXRCUVVzc1EwRkJRenRKUVVNNVFqczdRVUZGUkN4blFrRkJZU3hEUVVGRExFbEJRVWtzUjBGQlJ5eEpRVUZKTEVOQlFVTTdRVUZETVVJc1pVRkJXU3hEUVVGRExHRkJRV0VzUTBGQlF5eERRVUZETzBGQlF6VkNMRlZCUVU4c1lVRkJZU3hEUVVGRE8wVkJRM1JDT3p0QlFVVkVMRlZCUVZNc1owSkJRV2RDTEVkQlFVYzdRVUZETVVJc1dVRkJVeXh0UWtGQmJVSXNRMEZCUXl4SFFVRkhMRVZCUVVVN1FVRkRhRU1zV1VGQlR5eE5RVUZOTEVOQlFVTXNSMEZCUnl4RFFVRkRMRXRCUVVzc1VVRkJVU3hEUVVGRE8wbEJRMnBETzBGQlEwUXNjMEpCUVcxQ0xFTkJRVU1zU1VGQlNTeEhRVUZITEdsQ1FVRnBRaXhEUVVGRE8wRkJRemRETEdWQlFWa3NRMEZCUXl4dFFrRkJiVUlzUTBGQlF5eERRVUZETzBGQlEyeERMRmxCUVZNc1lVRkJZU3hEUVVGRExFZEJRVWNzUlVGQlJUdEJRVU14UWl4WlFVRlBMRWRCUVVjc1MwRkJTeXhKUVVGSkxFbEJRVWtzYlVKQlFXMUNMRU5CUVVNc1IwRkJSeXhEUVVGRExFTkJRVU03U1VGRGFrUTdRVUZEUkN4blFrRkJZU3hEUVVGRExFbEJRVWtzUjBGQlJ5eFJRVUZSTEVOQlFVTTdRVUZET1VJc1pVRkJXU3hEUVVGRExHRkJRV0VzUTBGQlF5eERRVUZETzBGQlF6VkNMR2RDUVVGaExFTkJRVU1zVFVGQlRTeEhRVUZITEcxQ1FVRnRRaXhEUVVGRE96dEJRVVV6UXl4VlFVRlBMR0ZCUVdFc1EwRkJRenRGUVVOMFFqczdRVUZIUkN4VlFVRlRMRzFDUVVGdFFpeERRVUZETEZsQlFWa3NSVUZCUlR0QlFVTjZReXhaUVVGVExHVkJRV1VzUTBGQlF5eEhRVUZITEVWQlFVVTdRVUZETlVJc1dVRkJUeXhIUVVGSExGbEJRVmtzV1VGQldTeERRVUZETzBsQlEzQkRPenRCUVVWRUxHdENRVUZsTEVOQlFVTXNTVUZCU1N4SFFVRkhMRmxCUVZrc1EwRkJReXhKUVVGSkxFTkJRVU03UVVGRGVrTXNaVUZCV1N4RFFVRkRMR1ZCUVdVc1EwRkJReXhEUVVGRE8wRkJRemxDTEZWQlFVOHNaVUZCWlN4RFFVRkRPMFZCUTNoQ096dEJRVVZFTEZWQlFWTXNaMEpCUVdkQ0xFTkJRVU1zUzBGQlN5eEZRVUZGTzBGQlF5OUNMRmxCUVZNc1dVRkJXU3hEUVVGRExFZEJRVWNzUlVGQlJUdEJRVU42UWl4WlFVRlBMRXRCUVVzc1EwRkJReXhKUVVGSkxFTkJRVU1zWVVGQlJ6dGpRVUZKTEVkQlFVY3NTMEZCU3l4SFFVRkhPMDFCUVVFc1EwRkJReXhEUVVGRE8wbEJRM1pET3p0QlFVVkVMR1ZCUVZrc1EwRkJReXhKUVVGSkxHRkJRVmNzUzBGQlN5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1RVRkJSeXhEUVVGRE8wRkJRMmhFTEdWQlFWa3NRMEZCUXl4WlFVRlpMRU5CUVVNc1EwRkJRenRCUVVNelFpeFZRVUZQTEZsQlFWa3NRMEZCUXp0RlFVTnlRanM3UVVGRlJDeFZRVUZUTEc5Q1FVRnZRaXhEUVVGRExGRkJRVkVzUlVGQlJUdEJRVU4wUXl4WlFVRlRMR2RDUVVGblFpeERRVUZETEVkQlFVY3NSVUZCUlR0QlFVTTNRaXhaUVVGUExGRkJRVkVzUTBGQlF5eEpRVUZKTEVOQlFVTXNhVUpCUVU4N1kwRkJTU3hQUVVGUExFTkJRVU1zUjBGQlJ5eERRVUZETzAxQlFVRXNRMEZCUXl4RFFVRkRPMGxCUXk5RE96dEJRVVZFTEcxQ1FVRm5RaXhEUVVGRExFbEJRVWtzUjBGQlJ5eFJRVUZSTEVOQlFVTXNSMEZCUnl4RFFVRkRMR2xDUVVGcFFpeERRVUZETEVOQlFVTXNTVUZCU1N4RFFVRkRMRTFCUVUwc1EwRkJReXhEUVVGRE8wRkJRM0pGTEdWQlFWa3NRMEZCUXl4blFrRkJaMElzUTBGQlF5eERRVUZETzBGQlF5OUNMRlZCUVU4c1owSkJRV2RDTEVOQlFVTTdSVUZEZWtJN08wRkJSVVFzVlVGQlV5eHJRa0ZCYTBJc1EwRkJReXhQUVVGUExFVkJRVVU3UVVGRGJrTXNXVUZCVXl4alFVRmpMRU5CUVVNc1IwRkJSeXhGUVVGRk8wRkJRek5DTEZsQlFVOHNVVUZCVVN4RFFVRkRMRXRCUVVzc1EwRkJReXhIUVVGSExFTkJRVU1zU1VGQlNTeEhRVUZITEVOQlFVTXNTMEZCU3l4RFFVRkRMRTlCUVU4c1EwRkJReXhEUVVGRE8wbEJRMnhFT3p0QlFVVkVMR2xDUVVGakxFTkJRVU1zU1VGQlNTeG5Ra0ZCWXl4cFFrRkJhVUlzUTBGQlF5eFBRVUZQTEVOQlFVTXNUVUZCUnl4RFFVRkRPMEZCUXk5RUxHVkJRVmtzUTBGQlF5eGpRVUZqTEVOQlFVTXNRMEZCUXp0QlFVTTNRaXhWUVVGUExHTkJRV01zUTBGQlF6dEZRVU4yUWpzN1FVRkZSQ3hWUVVGVExHMUNRVUZ0UWl4RFFVRkRMRTlCUVU4c1JVRkJSVHRCUVVOd1F5eFpRVUZUTEdWQlFXVXNRMEZCUXl4SFFVRkhMRVZCUVVVN1FVRkROVUlzV1VGQlR5eFJRVUZSTEVOQlFVTXNUVUZCVFN4RFFVRkRMRWRCUVVjc1EwRkJReXhKUVVGSkxFbEJRVWtzUTBGQlF5eEhRVUZITEVWQlFVVXNUMEZCVHl4RFFVRkRMRU5CUVVNN1NVRkRia1E3TzBGQlJVUXNhMEpCUVdVc1EwRkJReXhKUVVGSkxHbENRVUZsTEdsQ1FVRnBRaXhEUVVGRExFOUJRVThzUTBGQlF5eE5RVUZITEVOQlFVTTdRVUZEYWtVc1pVRkJXU3hEUVVGRExHVkJRV1VzUTBGQlF5eERRVUZETzBGQlF6bENMRlZCUVU4c1pVRkJaU3hEUVVGRE8wVkJRM2hDT3p0QlFVVkVMRlZCUVZNc2JVSkJRVzFDTEVkQlFVYzdRVUZETjBJc1dVRkJVeXhuUWtGQlowSXNRMEZCUXl4TFFVRkxMRVZCUVVVN1FVRkRMMElzWTBGQlV5eFpRVUZaTEVOQlFVTXNSMEZCUnl4RlFVRkZPMEZCUTNwQ0xHTkJRVThzVVVGQlVTeERRVUZETEUxQlFVMHNRMEZCUXl4SFFVRkhMRU5CUVVNc1NVRkJTU3hKUVVGSkxFTkJRVU1zUzBGQlN5eEZRVUZGTEZWQlFVTXNUMEZCVHl4RlFVRkZMRWxCUVVrc1JVRkJTenRCUVVNeFJDeGhRVUZKTEVOQlFVTXNSMEZCUnl4RFFVRkRMR05CUVdNc1EwRkJReXhKUVVGSkxFTkJRVU1zU1VGQlNTeFBRVUZQTEVOQlFVTXNWVUZCVlN4RlFVRkZPMEZCUTI1RUxHdENRVUZQTEVsQlFVa3NRMEZCUXp0VlFVTmlMRTFCUVUwN1FVRkRUQ3hyUWtGQlR5eFBRVUZQTEVOQlFVTXNSMEZCUnl4RFFVRkRMRWxCUVVrc1EwRkJReXhGUVVGRkxFbEJRVWtzUlVGQlJTeEhRVUZITEVOQlFVTXNRMEZCUXp0VlFVTjBRenRSUVVOR0xFTkJRVU1zUzBGQlN5eERRVUZETEZsQlFWa3NRMEZCUXl4TlFVRk5MRWxCUVVrc1NVRkJTU3hEUVVGRExFZEJRVWNzUlVGQlJTeFZRVUZETEVsQlFVa3NSVUZCUlN4SlFVRkpMRVZCUVVzN1FVRkRka1FzWjBKQlFVOHNTMEZCU3l4RFFVRkRMR05CUVdNc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dFJRVU51UXl4RFFVRkRMRU5CUVVNc1EwRkJRenROUVVOUU96dEJRVVZFTEZOQlFVa3NWMEZCVnl4SFFVRkhMRWxCUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zUTBGQlF6dEJRVU01UWl4VFFVRkpMRU5CUVVNc1YwRkJWeXhGUVVGRkxGVkJRVU1zUjBGQlJ5eEZRVUZGTEVsQlFVa3NSVUZCU3p0QlFVTXZRaXhyUWtGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4SFFVRkhMR2xDUVVGcFFpeERRVUZETEVkQlFVY3NRMEZCUXl4RFFVRkRPMDFCUXpWRExFTkJRVU1zUTBGQlF6dEJRVU5JTEdsQ1FVRlpMRU5CUVVNc1NVRkJTU3hqUVVGWkxFbEJRVWtzUTBGQlF5eFRRVUZUTEVOQlFVTXNWMEZCVnl4RFFVRkRMRTFCUVVjc1EwRkJRenRCUVVNMVJDeHBRa0ZCV1N4RFFVRkRMRmxCUVZrc1EwRkJReXhEUVVGRE8wRkJRek5DTEZsQlFVOHNXVUZCV1N4RFFVRkRPMGxCUTNKQ096dEJRVVZFTEcxQ1FVRm5RaXhEUVVGRExFdEJRVXNzUjBGQlJ5eFRRVUZUTEV0QlFVc3NRMEZCUXl4VlFVRlZMRVZCUVVVc1YwRkJWeXhGUVVGRk8wRkJReTlFTEZOQlFVa3NRMEZCUXl4TFFVRkxMRU5CUVVNc1QwRkJUeXhEUVVGRExGVkJRVlVzUTBGQlF5eEZRVUZGTzBGQlF6bENMR2xDUVVGVkxFZEJRVWNzUTBGQlF5eFZRVUZWTEVOQlFVTXNRMEZCUXp0TlFVTXpRanRCUVVORUxHTkJRVk1zV1VGQldTeERRVUZETEVsQlFVa3NSVUZCUlN4UlFVRlJMRVZCUVVVc1IwRkJSeXhGUVVGRk8wRkJRM3BETEZkQlFVa3NWVUZCVlN4SFFVRkhMRWRCUVVjc1NVRkJTU3hIUVVGSExFTkJRVU1zWTBGQll5eERRVUZETEZGQlFWRXNRMEZCUXl4RFFVRkRPMEZCUTNKRUxGZEJRVWtzWlVGQlpTeEhRVUZITEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUVVNc2JVSkJRVk03WjBKQlFVa3NSMEZCUnl4SlFVRkpMRWRCUVVjc1EwRkJReXhqUVVGakxFTkJRVU1zVTBGQlV5eERRVUZETzFGQlFVRXNRMEZCUXl4RFFVRkRPMEZCUTNwR0xHTkJRVkVzVlVGQlZTeExRVUZMTEdWQlFXVXNTMEZCVFN4RFFVRkRMRlZCUVZVc1NVRkJTU3hWUVVGVkxFbEJRVWtzVjBGQlZ5eERRVUZETEVsQlFVa3NRMEZCUXl4SlFVRkpMRU5CUVVNc1pVRkJaU3hEUVVGRExFTkJRVU03VFVGRmFrZzdRVUZEUkN4cFFrRkJXU3hEUVVGRExFbEJRVWtzWTBGQldTeFZRVUZWTEVOQlFVTXNTVUZCU1N4RFFVRkRMRWxCUVVrc1EwRkJReXhOUVVGSExFTkJRVU03UVVGRGRFUXNhVUpCUVZrc1EwRkJReXhaUVVGWkxFTkJRVU1zUTBGQlF6dEJRVU16UWl4WlFVRlBMRmxCUVZrc1EwRkJRenRKUVVOeVFpeERRVUZET3p0QlFVVkdMRzFDUVVGblFpeERRVUZETEUxQlFVMHNSMEZCUnl4VFFVRlRMRTFCUVUwc1EwRkJReXhWUVVGVkxFVkJRVVVzVjBGQlZ5eEZRVUZGTzBGQlEycEZMRk5CUVVrc1EwRkJReXhMUVVGTExFTkJRVU1zVDBGQlR5eERRVUZETEZWQlFWVXNRMEZCUXl4RlFVRkZPMEZCUXpsQ0xHbENRVUZWTEVkQlFVY3NRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenROUVVNelFqdEJRVU5FTEdOQlFWTXNZVUZCWVN4RFFVRkRMRWxCUVVrc1JVRkJSU3hSUVVGUkxFVkJRVVVzUjBGQlJ5eEZRVUZGTzBGQlF6RkRMR05CUVU4c1ZVRkJWU3hEUVVGRExFdEJRVXNzUTBGQlF5eGpRVUZKTzJkQ1FVRkpMRWRCUVVjc1EwRkJReXhqUVVGakxFTkJRVU1zU1VGQlNTeERRVUZETzFGQlFVRXNRMEZCUXl4SlFVRkpMRmRCUVZjc1EwRkJReXhKUVVGSkxFTkJRVU1zUTBGQlF6dE5RVU5vUmp0QlFVTkVMR3RDUVVGaExFTkJRVU1zU1VGQlNTeGxRVUZoTEZWQlFWVXNRMEZCUXl4SlFVRkpMRU5CUVVNc1NVRkJTU3hEUVVGRExFMUJRVWNzUTBGQlF6dEJRVU40UkN4cFFrRkJXU3hEUVVGRExHRkJRV0VzUTBGQlF5eERRVUZETzBGQlF6VkNMRmxCUVU4c1lVRkJZU3hEUVVGRE8wbEJRM1JDTEVOQlFVTTdPMEZCUlVZc1ZVRkJUeXhuUWtGQlowSXNRMEZCUXp0RlFVTjZRanM3UVVGRlJDeFZRVUZUTEdOQlFXTXNSMEZCUnp0QlFVTjRRaXhaUVVGVExGVkJRVlVzUjBGQlJ6dEJRVU53UWl4WlFVRlBMRWxCUVVrc1EwRkJRenRKUVVOaU96dEJRVVZFTEdGQlFWVXNRMEZCUXl4SlFVRkpMRWRCUVVjc1MwRkJTeXhEUVVGRE8wRkJRM2hDTEdWQlFWa3NRMEZCUXl4VlFVRlZMRU5CUVVNc1EwRkJRenRCUVVONlFpeFZRVUZQTEZWQlFWVXNRMEZCUXp0RlFVTnVRanM3UVVGRlJDeFZRVUZUTEZsQlFWa3NRMEZCUXl4UFFVRlBMRVZCUVVVN1FVRkROMElzVlVGQlR5eERRVUZETEZGQlFWRXNSMEZCUnl4VFFVRlRMR0ZCUVdFc1IwRkJSenRCUVVNeFF5eFpRVUZQTEU5QlFVOHNhMEpCUVVrc1UwRkJVeXhEUVVGRExFTkJRVU03U1VGRE9VSXNRMEZCUXp0QlFVTkdMRlZCUVU4c1EwRkJReXhSUVVGUkxFTkJRVU1zVlVGQlZTeEhRVUZITEVsQlFVa3NRMEZCUXp0QlFVTnVReXhWUVVGUExFTkJRVU1zVVVGQlVTeERRVUZETEVsQlFVa3NSMEZCUnl4UFFVRlBMRU5CUVVNc1NVRkJTU3hEUVVGRE8wRkJRM0pETEZWQlFVOHNRMEZCUXl4UlFVRlJMRU5CUVVNc1YwRkJWeXhIUVVGSExFOUJRVThzUTBGQlF5eFhRVUZYTEVOQlFVTWlMQ0p6YjNWeVkyVnpRMjl1ZEdWdWRDSTZXeUlvWm5WdVkzUnBiMjRnZDJWaWNHRmphMVZ1YVhabGNuTmhiRTF2WkhWc1pVUmxabWx1YVhScGIyNG9jbTl2ZEN3Z1ptRmpkRzl5ZVNrZ2UxeHVYSFJwWmloMGVYQmxiMllnWlhod2IzSjBjeUE5UFQwZ0oyOWlhbVZqZENjZ0ppWWdkSGx3Wlc5bUlHMXZaSFZzWlNBOVBUMGdKMjlpYW1WamRDY3BYRzVjZEZ4MGJXOWtkV3hsTG1WNGNHOXlkSE1nUFNCbVlXTjBiM0o1S0NrN1hHNWNkR1ZzYzJVZ2FXWW9kSGx3Wlc5bUlHUmxabWx1WlNBOVBUMGdKMloxYm1OMGFXOXVKeUFtSmlCa1pXWnBibVV1WVcxa0tWeHVYSFJjZEdSbFptbHVaU2htWVdOMGIzSjVLVHRjYmx4MFpXeHpaU0JwWmloMGVYQmxiMllnWlhod2IzSjBjeUE5UFQwZ0oyOWlhbVZqZENjcFhHNWNkRngwWlhod2IzSjBjMXRjSW1Gd2FVTm9aV05yWENKZElEMGdabUZqZEc5eWVTZ3BPMXh1WEhSbGJITmxYRzVjZEZ4MGNtOXZkRnRjSW1Gd2FVTm9aV05yWENKZElEMGdabUZqZEc5eWVTZ3BPMXh1ZlNrb2RHaHBjeXdnWm5WdVkzUnBiMjRvS1NCN1hHNXlaWFIxY200Z1hHNWNibHh1THlvcUlGZEZRbEJCUTBzZ1JrOVBWRVZTSUNvcVhHNGdLaW9nZDJWaWNHRmpheTkxYm1sMlpYSnpZV3hOYjJSMWJHVkVaV1pwYm1sMGFXOXVYRzRnS2lvdklpd2lJRngwTHk4Z1ZHaGxJRzF2WkhWc1pTQmpZV05vWlZ4dUlGeDBkbUZ5SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE1nUFNCN2ZUdGNibHh1SUZ4MEx5OGdWR2hsSUhKbGNYVnBjbVVnWm5WdVkzUnBiMjVjYmlCY2RHWjFibU4wYVc5dUlGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOG9iVzlrZFd4bFNXUXBJSHRjYmx4dUlGeDBYSFF2THlCRGFHVmpheUJwWmlCdGIyUjFiR1VnYVhNZ2FXNGdZMkZqYUdWY2JpQmNkRngwYVdZb2FXNXpkR0ZzYkdWa1RXOWtkV3hsYzF0dGIyUjFiR1ZKWkYwcFhHNGdYSFJjZEZ4MGNtVjBkWEp1SUdsdWMzUmhiR3hsWkUxdlpIVnNaWE5iYlc5a2RXeGxTV1JkTG1WNGNHOXlkSE03WEc1Y2JpQmNkRngwTHk4Z1EzSmxZWFJsSUdFZ2JtVjNJRzF2WkhWc1pTQW9ZVzVrSUhCMWRDQnBkQ0JwYm5SdklIUm9aU0JqWVdOb1pTbGNiaUJjZEZ4MGRtRnlJRzF2WkhWc1pTQTlJR2x1YzNSaGJHeGxaRTF2WkhWc1pYTmJiVzlrZFd4bFNXUmRJRDBnZTF4dUlGeDBYSFJjZEdWNGNHOXlkSE02SUh0OUxGeHVJRngwWEhSY2RHbGtPaUJ0YjJSMWJHVkpaQ3hjYmlCY2RGeDBYSFJzYjJGa1pXUTZJR1poYkhObFhHNGdYSFJjZEgwN1hHNWNiaUJjZEZ4MEx5OGdSWGhsWTNWMFpTQjBhR1VnYlc5a2RXeGxJR1oxYm1OMGFXOXVYRzRnWEhSY2RHMXZaSFZzWlhOYmJXOWtkV3hsU1dSZExtTmhiR3dvYlc5a2RXeGxMbVY0Y0c5eWRITXNJRzF2WkhWc1pTd2diVzlrZFd4bExtVjRjRzl5ZEhNc0lGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHBPMXh1WEc0Z1hIUmNkQzh2SUVac1lXY2dkR2hsSUcxdlpIVnNaU0JoY3lCc2IyRmtaV1JjYmlCY2RGeDBiVzlrZFd4bExteHZZV1JsWkNBOUlIUnlkV1U3WEc1Y2JpQmNkRngwTHk4Z1VtVjBkWEp1SUhSb1pTQmxlSEJ2Y25SeklHOW1JSFJvWlNCdGIyUjFiR1ZjYmlCY2RGeDBjbVYwZFhKdUlHMXZaSFZzWlM1bGVIQnZjblJ6TzF4dUlGeDBmVnh1WEc1Y2JpQmNkQzh2SUdWNGNHOXpaU0IwYUdVZ2JXOWtkV3hsY3lCdlltcGxZM1FnS0Y5ZmQyVmljR0ZqYTE5dGIyUjFiR1Z6WDE4cFhHNGdYSFJmWDNkbFluQmhZMnRmY21WeGRXbHlaVjlmTG0wZ1BTQnRiMlIxYkdWek8xeHVYRzRnWEhRdkx5QmxlSEJ2YzJVZ2RHaGxJRzF2WkhWc1pTQmpZV05vWlZ4dUlGeDBYMTkzWldKd1lXTnJYM0psY1hWcGNtVmZYeTVqSUQwZ2FXNXpkR0ZzYkdWa1RXOWtkV3hsY3p0Y2JseHVJRngwTHk4Z1gxOTNaV0p3WVdOclgzQjFZbXhwWTE5d1lYUm9YMTljYmlCY2RGOWZkMlZpY0dGamExOXlaWEYxYVhKbFgxOHVjQ0E5SUZ3aVhDSTdYRzVjYmlCY2RDOHZJRXh2WVdRZ1pXNTBjbmtnYlc5a2RXeGxJR0Z1WkNCeVpYUjFjbTRnWlhod2IzSjBjMXh1SUZ4MGNtVjBkWEp1SUY5ZmQyVmljR0ZqYTE5eVpYRjFhWEpsWDE4b01DazdYRzVjYmx4dUx5b3FJRmRGUWxCQlEwc2dSazlQVkVWU0lDb3FYRzRnS2lvZ2QyVmljR0ZqYXk5aWIyOTBjM1J5WVhBZ1pUaGpOekEzWWpBd1lURTROVFUwT1RrMU9EQmNiaUFxS2k4aUxDSnRiMlIxYkdVdVpYaHdiM0owY3lBOUlISmxjWFZwY21Vb0p5NHZZWEJwUTJobFkyc25LVHRjYmx4dVhHNWNiaThxS2lCWFJVSlFRVU5MSUVaUFQxUkZVaUFxS2x4dUlDb3FJQzR1TDM0dmFuTm9hVzUwTFd4dllXUmxjaUV1TDJsdVpHVjRMbXB6WEc0Z0tpb3ZJaXdpYkdWMElIdGxZV05vTENCaGNuSmhlV2xtZVN3Z1oyVjBRMmhsWTJ0bGNrUnBjM0JzWVhrc0lIUjVjR1ZQWm4wZ1BTQnlaWEYxYVhKbEtDY3VMMkZ3YVVOb1pXTnJWWFJwYkNjcE8xeHViR1YwSUdOb1pXTnJaWEp6SUQwZ2NtVnhkV2x5WlNnbkxpOWphR1ZqYTJWeWN5Y3BPMXh1YkdWMElHUnBjMkZpYkdWa0lEMGdabUZzYzJVN1hHNWNibTF2WkhWc1pTNWxlSEJ2Y25SeklEMGdZWEJwUTJobFkyczdYRzVjYm14bGRDQmhaR1JwZEdsdmJtRnNVSEp2Y0dWeWRHbGxjeUE5SUh0Y2JpQWdkR2h5YjNjNklHZGxkRUZ3YVVOb1pXTnJLSFJ5ZFdVcExGeHVJQ0IzWVhKdU9pQm5aWFJCY0dsRGFHVmpheWhtWVd4elpTa3NYRzRnSUdScGMyRmliR1U2SUNncElEMCtJR1JwYzJGaWJHVmtJRDBnZEhKMVpTeGNiaUFnWlc1aFlteGxPaUFvS1NBOVBpQmthWE5oWW14bFpDQTlJR1poYkhObExGeHVJQ0JuWlhSRmNuSnZjazFsYzNOaFoyVXNYRzRnSUdoaGJtUnNaVVZ5Y205eVRXVnpjMkZuWlN4Y2JpQWdZMjl1Wm1sbk9pQjdYRzRnSUNBZ2IzVjBjSFYwT2lCN1hHNGdJQ0FnSUNCd2NtVm1hWGc2SUNjbkxGeHVJQ0FnSUNBZ2MzVm1abWw0T2lBbkp5eGNiaUFnSUNBZ0lHUnZZM05DWVhObFZYSnNPaUFuSjF4dUlDQWdJSDFjYmlBZ2ZWeHVmVHRjYmx4dVpXRmphQ2hoWkdScGRHbHZibUZzVUhKdmNHVnlkR2xsY3l3Z0tIZHlZWEJ3WlhJc0lHNWhiV1VwSUQwK0lHMXZaSFZzWlM1bGVIQnZjblJ6VzI1aGJXVmRJRDBnZDNKaGNIQmxjaWs3WEc1bFlXTm9LR05vWldOclpYSnpMQ0FvWTJobFkydGxjaXdnYm1GdFpTa2dQVDRnYlc5a2RXeGxMbVY0Y0c5eWRITmJibUZ0WlYwZ1BTQmphR1ZqYTJWeUtUdGNibHh1WEc1Y2JtWjFibU4wYVc5dUlHRndhVU5vWldOcktHRndhU3dnWVhKbmN5d2diM1YwY0hWMEtTQjdYRzRnSUM4cUlHcHphR2x1ZENCdFlYaGpiMjF3YkdWNGFYUjVPallnS2k5Y2JpQWdkbUZ5SUhOMVkyTmxjM003WEc0Z0lHbG1JQ2hrYVhOaFlteGxaQ2tnZTF4dUlDQWdJSEpsZEhWeWJpQnVkV3hzTzF4dUlDQjlYRzRnSUdsbUlDZ2hZWEpuY3lrZ2UxeHVJQ0FnSUhSb2NtOTNJRzVsZHlCRmNuSnZjaWduWVhCcFEyaGxZMnNnWm1GcGJHVmtPaUJOZFhOMElIQmhjM01nWVhKbmRXMWxiblJ6SUhSdklHTm9aV05ySnlrN1hHNGdJSDFjYmlBZ1lYSm5jeUE5SUVGeWNtRjVMbkJ5YjNSdmRIbHdaUzV6YkdsalpTNWpZV3hzS0dGeVozTXBPMXh1SUNCcFppQW9ZMmhsWTJ0bGNuTXVZWEp5WVhrb1lYQnBLU2tnZTF4dUlDQWdJSE4xWTJObGMzTWdQU0JqYUdWamEwVnViM1ZuYUVGeVozTW9ZWEJwTENCaGNtZHpLU0FtSmlCamFHVmphMDExYkhScFFYSm5RWEJwS0dGd2FTd2dZWEpuY3lrN1hHNGdJSDBnWld4elpTQnBaaUFvWTJobFkydGxjbk11Wm5WdVl5aGhjR2twS1NCN1hHNGdJQ0FnYzNWalkyVnpjeUE5SUdGd2FTaGhjbWR6V3pCZEtUdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQjBhSEp2ZHlCdVpYY2dSWEp5YjNJb0oyRndhVU5vWldOcklHWmhhV3hsWkRvZ1RYVnpkQ0J3WVhOeklHRnVJR0Z5Y21GNUlHOXlJR0VnWm5WdVkzUnBiMjRuS1R0Y2JpQWdmVnh1SUNCeVpYUjFjbTRnYzNWalkyVnpjeUEvSUc1MWJHd2dPaUJ0YjJSMWJHVXVaWGh3YjNKMGN5NW5aWFJGY25KdmNrMWxjM05oWjJVb1lYQnBMQ0JoY21kekxDQnZkWFJ3ZFhRcE8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCamFHVmphMDExYkhScFFYSm5RWEJwS0dGd2FTd2dZWEpuY3lrZ2UxeHVJQ0IyWVhJZ2MzVmpZMlZ6Y3lBOUlIUnlkV1U3WEc0Z0lIWmhjaUJqYUdWamEyVnlTVzVrWlhnZ1BTQXdPMXh1SUNCMllYSWdZWEpuU1c1a1pYZ2dQU0F3TzF4dUlDQjJZWElnWVhKbkxDQmphR1ZqYTJWeUxDQnlaWE03WEc0Z0lDOHFJR3B6YUdsdWRDQXRWekE0TkNBcUwxeHVJQ0IzYUdsc1pTaGhjbWNnUFNCaGNtZHpXMkZ5WjBsdVpHVjRLeXRkS1NCN1hHNGdJQ0FnWTJobFkydGxjaUE5SUdGd2FWdGphR1ZqYTJWeVNXNWtaWGdySzEwN1hHNGdJQ0FnY21WeklEMGdZMmhsWTJ0bGNpaGhjbWNwTzF4dUlDQWdJR2xtSUNnaGNtVnpJQ1ltSUNGamFHVmphMlZ5TG1selQzQjBhVzl1WVd3cElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCbVlXeHpaVHRjYmlBZ0lDQjlJR1ZzYzJVZ2FXWWdLQ0Z5WlhNcElIdGNiaUFnSUNBZ0lHRnlaMGx1WkdWNExTMDdYRzRnSUNBZ2ZWeHVJQ0I5WEc0Z0lISmxkSFZ5YmlCemRXTmpaWE56TzF4dWZWeHVYRzVtZFc1amRHbHZiaUJqYUdWamEwVnViM1ZuYUVGeVozTW9ZWEJwTENCaGNtZHpLU0I3WEc0Z0lIWmhjaUJ5WlhGMWFYSmxaRUZ5WjNNZ1BTQmhjR2t1Wm1sc2RHVnlLR0VnUFQ0Z0lXRXVhWE5QY0hScGIyNWhiQ2s3WEc0Z0lISmxkSFZ5YmlCaGNtZHpMbXhsYm1kMGFDQStQU0J5WlhGMWFYSmxaRUZ5WjNNdWJHVnVaM1JvTzF4dWZWeHVYRzVjYm1aMWJtTjBhVzl1SUdkbGRFRndhVU5vWldOcktITm9iM1ZzWkZSb2NtOTNLU0I3WEc0Z0lISmxkSFZ5YmlCbWRXNWpkR2x2YmlCaGNHbERhR1ZqYTFkeVlYQndaWElvWVhCcExDQmhjbWR6TENCdmRYUndkWFFwSUh0Y2JpQWdJQ0JwWmlBb1pHbHpZV0pzWldRcElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCdWRXeHNPMXh1SUNBZ0lIMWNiaUFnSUNCMllYSWdiV1Z6YzJGblpTQTlJR0Z3YVVOb1pXTnJLR0Z3YVN3Z1lYSm5jeXdnYjNWMGNIVjBLVHRjYmlBZ0lDQnRiMlIxYkdVdVpYaHdiM0owY3k1b1lXNWtiR1ZGY25KdmNrMWxjM05oWjJVb2JXVnpjMkZuWlN3Z2MyaHZkV3hrVkdoeWIzY3BPMXh1SUNCOU8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCb1lXNWtiR1ZGY25KdmNrMWxjM05oWjJVb2JXVnpjMkZuWlN3Z2MyaHZkV3hrVkdoeWIzY3BJSHRjYmlBZ2FXWWdLSE5vYjNWc1pGUm9jbTkzSUNZbUlHMWxjM05oWjJVcElIdGNiaUFnSUNCMGFISnZkeUJ1WlhjZ1JYSnliM0lvYldWemMyRm5aU2s3WEc0Z0lIMGdaV3h6WlNCcFppQW9iV1Z6YzJGblpTa2dlMXh1SUNBZ0lHTnZibk52YkdVdWQyRnliaWh0WlhOellXZGxLVHRjYmlBZ2ZWeHVmVnh1WEc1bWRXNWpkR2x2YmlCblpYUkZjbkp2Y2sxbGMzTmhaMlVvWVhCcExDQmhjbWR6TENCdmRYUndkWFFnUFNCN2ZTa2dlMXh1SUNBdktpQnFjMmhwYm5RZ2JXRjRZMjl0Y0d4bGVHbDBlVG8zSUNvdlhHNGdJSFpoY2lCblQzVjBJRDBnYlc5a2RXeGxMbVY0Y0c5eWRITXVZMjl1Wm1sbkxtOTFkSEIxZENCOGZDQjdmVHRjYmlBZ2RtRnlJSEJ5WldacGVDQTlJR0FrZTJkUGRYUXVjSEpsWm1sNElIeDhJQ2NuZlNBa2UyOTFkSEIxZEM1d2NtVm1hWGdnZkh3Z0p5ZDlZQzUwY21sdEtDazdYRzRnSUhaaGNpQnpkV1ptYVhnZ1BTQmdKSHR2ZFhSd2RYUXVjM1ZtWm1sNElIeDhJQ2NuZlNBa2UyZFBkWFF1YzNWbVptbDRJSHg4SUNjbmZXQXVkSEpwYlNncE8xeHVJQ0IyWVhJZ2RYSnNJRDBnWjA5MWRDNWtiMk56UW1GelpWVnliQ0FtSmlCdmRYUndkWFF1ZFhKc0lDWW1JR0FrZTJkUGRYUXVaRzlqYzBKaGMyVlZjbXg5Skh0dmRYUndkWFF1ZFhKc2ZXQXVkSEpwYlNncE8xeHVJQ0J5WlhSMWNtNGdZQ1I3Y0hKbFptbDRmU0FrZTJKMWFXeGtUV1Z6YzJGblpVWnliMjFCY0dsQmJtUkJjbWR6S0dGd2FTd2dZWEpuY3lsOUlDUjdjM1ZtWm1sNGZTQWtlM1Z5YkNCOGZDQW5KMzFnTG5SeWFXMG9LVHRjYm4xY2JseHVablZ1WTNScGIyNGdZblZwYkdSTlpYTnpZV2RsUm5KdmJVRndhVUZ1WkVGeVozTW9ZWEJwTENCaGNtZHpLU0I3WEc0Z0lHRndhU0E5SUdGeWNtRjVhV1o1S0dGd2FTazdYRzRnSUdGeVozTWdQU0JoY25KaGVXbG1lU2hoY21kektUdGNiaUFnZG1GeUlHRndhVlI1Y0dWeklEMGdZWEJwTG0xaGNDaGphR1ZqYTJWeUlEMCtJSHRjYmlBZ0lDQnlaWFIxY200Z1oyVjBRMmhsWTJ0bGNrUnBjM0JzWVhrb1kyaGxZMnRsY2lrN1hHNGdJSDBwTG1wdmFXNG9KeXdnSnlrN1hHNGdJSFpoY2lCd1lYTnpaV1JVZVhCbGN5QTlJR0Z5WjNNdWJHVnVaM1JvSUQ4Z0oyQW5JQ3NnWVhKbmN5NXRZWEFvWjJWMFFYSm5SR2x6Y0d4aGVTa3VhbTlwYmlnbkxDQW5LU0FySUNkZ0p5QTZJQ2R1YjNSb2FXNW5KenRjYmlBZ2NtVjBkWEp1SUNkaGNHbERhR1ZqYXlCbVlXbHNaV1FoSUZsdmRTQndZWE56WldRNklDY2dLeUJ3WVhOelpXUlVlWEJsY3lBcklDY2dZVzVrSUhOb2IzVnNaQ0JvWVhabElIQmhjM05sWkRvZ1lDY2dLeUJoY0dsVWVYQmxjeUFySUNkZ0p6dGNibjFjYmx4dWRtRnlJSE4wY21sdVoybG1lV0ZpYkdVZ1BTQjdYRzRnSUU5aWFtVmpkRG9nWjJWMFJHbHpjR3hoZVN4Y2JpQWdRWEp5WVhrNklHZGxkRVJwYzNCc1lYbGNibjA3WEc1Y2JtWjFibU4wYVc5dUlHZGxkRVJwYzNCc1lYa29iMkpxS1NCN1hHNGdJSFpoY2lCaGNtZEVhWE53YkdGNUlEMGdlMzA3WEc0Z0lHVmhZMmdvYjJKcUxDQW9kaXhyS1NBOVBpQmhjbWRFYVhOd2JHRjVXMnRkSUQwZ1oyVjBRWEpuUkdsemNHeGhlU2gyS1NrN1hHNGdJSEpsZEhWeWJpQktVMDlPTG5OMGNtbHVaMmxtZVNodlltb3NJQ2hyTENCMktTQTlQaUJoY21kRWFYTndiR0Y1VzJ0ZElIeDhJSFlwTzF4dWZWeHVYRzVtZFc1amRHbHZiaUJuWlhSQmNtZEVhWE53YkdGNUtHRnlaeWtnZTF4dUlDQjJZWElnWTA1aGJXVWdQU0JoY21jZ0ppWWdZWEpuTG1OdmJuTjBjblZqZEc5eUlDWW1JR0Z5Wnk1amIyNXpkSEoxWTNSdmNpNXVZVzFsTzF4dUlDQnlaWFIxY200Z1kwNWhiV1VnUHlCemRISnBibWRwWm5saFlteGxXMk5PWVcxbFhTQS9JSE4wY21sdVoybG1lV0ZpYkdWYlkwNWhiV1ZkS0dGeVp5a2dPaUJqVG1GdFpTQTZJR0Z5WnlBOVBUMGdiblZzYkNBL0lDZHVkV3hzSnlBNklIUjVjR1ZQWmloaGNtY3BPMXh1ZlZ4dVhHNWNibHh1THlvcUlGZEZRbEJCUTBzZ1JrOVBWRVZTSUNvcVhHNGdLaW9nTGk0dmZpOXFjMmhwYm5RdGJHOWhaR1Z5SVM0dllYQnBRMmhsWTJzdWFuTmNiaUFxS2k4aUxDSmNibHh1Ylc5a2RXeGxMbVY0Y0c5eWRITWdQU0I3WldGamFDd2dZMjl3ZVN3Z2RIbHdaVTltTENCaGNuSmhlV2xtZVN3Z1oyVjBRMmhsWTJ0bGNrUnBjM0JzWVhsOU8xeHVYRzVtZFc1amRHbHZiaUJqYjNCNUtHOWlhaWtnZTF4dUlDQjJZWElnWkdGRGIzQjVJRDBnUVhKeVlYa3VhWE5CY25KaGVTaHZZbW9wSUQ4Z1cxMGdPaUI3ZlR0Y2JpQWdaV0ZqYUNodlltb3NJQ2gyWVd3c0lHdGxlU2tnUFQ0Z1pHRkRiM0I1VzJ0bGVWMGdQU0IyWVd3cE8xeHVJQ0J5WlhSMWNtNGdaR0ZEYjNCNU8xeHVmVnh1WEc1Y2JtWjFibU4wYVc5dUlIUjVjR1ZQWmlodlltb3BJSHRjYmlBZ2FXWWdLRUZ5Y21GNUxtbHpRWEp5WVhrb2IySnFLU2tnZTF4dUlDQWdJSEpsZEhWeWJpQW5ZWEp5WVhrbk8xeHVJQ0I5SUdWc2MyVWdhV1lnS0c5aWFpQnBibk4wWVc1alpXOW1JRkpsWjBWNGNDa2dlMXh1SUNBZ0lISmxkSFZ5YmlBbmIySnFaV04wSnp0Y2JpQWdmU0JsYkhObElIdGNiaUFnSUNCeVpYUjFjbTRnZEhsd1pXOW1JRzlpYWp0Y2JpQWdmVnh1ZlZ4dVhHNW1kVzVqZEdsdmJpQm5aWFJEYUdWamEyVnlSR2x6Y0d4aGVTaGphR1ZqYTJWeUtTQjdYRzRnSUhKbGRIVnliaUFvWTJobFkydGxjaTUwZVhCbElIeDhJR05vWldOclpYSXVaR2x6Y0d4aGVVNWhiV1VnZkh3Z1kyaGxZMnRsY2k1dVlXMWxLU0FySUNoamFHVmphMlZ5TG1selQzQjBhVzl1WVd3Z1B5QW5JQ2h2Y0hScGIyNWhiQ2tuSURvZ0p5Y3BPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQmhjbkpoZVdsbWVTaHZZbW9wSUh0Y2JpQWdhV1lnS0NGdlltb3BJSHRjYmlBZ0lDQnlaWFIxY200Z1cxMDdYRzRnSUgwZ1pXeHpaU0JwWmlBb1FYSnlZWGt1YVhOQmNuSmhlU2h2WW1vcEtTQjdYRzRnSUNBZ2NtVjBkWEp1SUc5aWFqdGNiaUFnZlNCbGJITmxJSHRjYmlBZ0lDQnlaWFIxY200Z1cyOWlhbDA3WEc0Z0lIMWNibjFjYmx4dVhHNW1kVzVqZEdsdmJpQmxZV05vS0c5aWFpd2dhWFJsY21GMGIzSXNJR052Ym5SbGVIUXBJSHRjYmlBZ2FXWWdLRUZ5Y21GNUxtbHpRWEp5WVhrb2IySnFLU2tnZTF4dUlDQWdJSEpsZEhWeWJpQmxZV05vUVhKeWVTZ3VMaTVoY21kMWJXVnVkSE1wTzF4dUlDQjlJR1ZzYzJVZ2UxeHVJQ0FnSUhKbGRIVnliaUJsWVdOb1QySnFLQzR1TG1GeVozVnRaVzUwY3lrN1hHNGdJSDFjYm4xY2JseHVablZ1WTNScGIyNGdaV0ZqYUU5aWFpaHZZbW9zSUdsMFpYSmhkRzl5TENCamIyNTBaWGgwS1NCN1hHNGdJSFpoY2lCeVpYUTdYRzRnSUhaaGNpQm9ZWE5QZDI0Z1BTQlBZbXBsWTNRdWNISnZkRzkwZVhCbExtaGhjMDkzYmxCeWIzQmxjblI1TzF4dUlDQm1iM0lnS0haaGNpQnJaWGtnYVc0Z2IySnFLU0I3WEc0Z0lDQWdhV1lnS0doaGMwOTNiaTVqWVd4c0tHOWlhaXdnYTJWNUtTa2dlMXh1SUNBZ0lDQWdjbVYwSUQwZ2FYUmxjbUYwYjNJdVkyRnNiQ2hqYjI1MFpYaDBMQ0J2WW1wYmEyVjVYU3dnYTJWNUxDQnZZbW9wTzF4dUlDQWdJQ0FnYVdZZ0tISmxkQ0E5UFQwZ1ptRnNjMlVwSUh0Y2JpQWdJQ0FnSUNBZ2NtVjBkWEp1SUhKbGREdGNiaUFnSUNBZ0lIMWNiaUFnSUNCOVhHNGdJSDFjYmlBZ2NtVjBkWEp1SUhSeWRXVTdYRzU5WEc1Y2JtWjFibU4wYVc5dUlHVmhZMmhCY25KNUtHOWlhaXdnYVhSbGNtRjBiM0lzSUdOdmJuUmxlSFFwSUh0Y2JpQWdkbUZ5SUhKbGREdGNiaUFnZG1GeUlHeGxibWQwYUNBOUlHOWlhaTVzWlc1bmRHZzdYRzRnSUdadmNpQW9kbUZ5SUdrZ1BTQXdPeUJwSUR3Z2JHVnVaM1JvT3lCcEt5c3BJSHRjYmlBZ0lDQnlaWFFnUFNCcGRHVnlZWFJ2Y2k1allXeHNLR052Ym5SbGVIUXNJRzlpYWx0cFhTd2dhU3dnYjJKcUtUdGNiaUFnSUNCcFppQW9jbVYwSUQwOVBTQm1ZV3h6WlNrZ2UxeHVJQ0FnSUNBZ2NtVjBkWEp1SUhKbGREdGNiaUFnSUNCOVhHNGdJSDFjYmlBZ2NtVjBkWEp1SUhSeWRXVTdYRzU5WEc1Y2JseHVYRzR2S2lvZ1YwVkNVRUZEU3lCR1QwOVVSVklnS2lwY2JpQXFLaUF1TGk5K0wycHphR2x1ZEMxc2IyRmtaWEloTGk5aGNHbERhR1ZqYTFWMGFXd3Vhbk5jYmlBcUtpOGlMQ0oyWVhJZ2UzUjVjR1ZQWml3Z1pXRmphQ3dnWTI5d2VTd2daMlYwUTJobFkydGxja1JwYzNCc1lYbDlJRDBnY21WeGRXbHlaU2duTGk5aGNHbERhR1ZqYTFWMGFXd25LVHRjYm5aaGNpQmphR1ZqYTJWeWN5QTlJRzF2WkhWc1pTNWxlSEJ2Y25SeklEMGdlMXh1SUNCaGNuSmhlVG9nWjJWMFZIbHdaVTltUTJobFkydGxjaWduUVhKeVlYa25LU3hjYmlBZ1ltOXZiRG9nWjJWMFZIbHdaVTltUTJobFkydGxjaWduUW05dmJHVmhiaWNwTEZ4dUlDQm1kVzVqT2lCblpYUlVlWEJsVDJaRGFHVmphMlZ5S0NkR2RXNWpkR2x2YmljcExGeHVJQ0J1ZFcxaVpYSTZJR2RsZEZSNWNHVlBaa05vWldOclpYSW9KMDUxYldKbGNpY3BMRnh1SUNCemRISnBibWM2SUdkbGRGUjVjR1ZQWmtOb1pXTnJaWElvSjFOMGNtbHVaeWNwTEZ4dUlDQnZZbXBsWTNRNklHZGxkRTlpYW1WamRFTm9aV05yWlhJb0tTeGNibHh1SUNCcGJuTjBZVzVqWlU5bU9pQnBibk4wWVc1alpVTm9aV05yUjJWMGRHVnlMRnh1SUNCdmJtVlBaam9nYjI1bFQyWkRhR1ZqYTBkbGRIUmxjaXhjYmlBZ2IyNWxUMlpVZVhCbE9pQnZibVZQWmxSNWNHVkRhR1ZqYTBkbGRIUmxjaXhjYmx4dUlDQmhjbkpoZVU5bU9pQmhjbkpoZVU5bVEyaGxZMnRIWlhSMFpYSXNYRzRnSUc5aWFtVmpkRTltT2lCdlltcGxZM1JQWmtOb1pXTnJSMlYwZEdWeUxGeHVYRzRnSUhOb1lYQmxPaUJuWlhSVGFHRndaVU5vWldOclIyVjBkR1Z5S0Nrc1hHNWNiaUFnWVc1NU9pQmhibmxEYUdWamEwZGxkSFJsY2lncFhHNTlPMXh1WEc1bFlXTm9LR05vWldOclpYSnpMQ0JqYUdWamEyVnlJRDArSUh0Y2JpQWdZMmhsWTJ0bGNpNWthWE53YkdGNVRtRnRaU0E5SUdCaGNHbERhR1ZqYXlCY1hHQWtlMk5vWldOclpYSXVkSGx3WlgxY1hHQWdkSGx3WlNCamFHVmphMlZ5WUR0Y2JuMHBPMXh1WEc1Y2JtWjFibU4wYVc5dUlHZGxkRlI1Y0dWUFprTm9aV05yWlhJb2RIbHdaU2tnZTF4dUlDQjJZWElnYkZSNWNHVWdQU0IwZVhCbExuUnZURzkzWlhKRFlYTmxLQ2s3WEc0Z0lHWjFibU4wYVc5dUlIUjVjR1ZQWmtOb1pXTnJaWElvZG1Gc0tTQjdYRzRnSUNBZ2NtVjBkWEp1SUhSNWNHVlBaaWgyWVd3cElEMDlQU0JzVkhsd1pUdGNiaUFnZlZ4dVhHNGdJSFI1Y0dWUFprTm9aV05yWlhJdWRIbHdaU0E5SUhSNWNHVTdYRzRnSUcxaGEyVlBjSFJwYjI1aGJDaDBlWEJsVDJaRGFHVmphMlZ5S1R0Y2JpQWdjbVYwZFhKdUlIUjVjR1ZQWmtOb1pXTnJaWEk3WEc1OVhHNWNibVoxYm1OMGFXOXVJR2RsZEU5aWFtVmpkRU5vWldOclpYSW9LU0I3WEc0Z0lHWjFibU4wYVc5dUlHOWlhbVZqZEU1MWJHeFBhME5vWldOclpYSW9kbUZzS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFI1Y0dWUFppaDJZV3dwSUQwOVBTQW5iMkpxWldOMEp6dGNiaUFnZlZ4dUlDQnZZbXBsWTNST2RXeHNUMnREYUdWamEyVnlMblI1Y0dVZ1BTQW5UMkpxWldOMFcyNTFiR3dnYjJ0ZEp6dGNiaUFnYldGclpVOXdkR2x2Ym1Gc0tHOWlhbVZqZEU1MWJHeFBhME5vWldOclpYSXBPMXh1SUNCbWRXNWpkR2x2YmlCdlltcGxZM1JEYUdWamEyVnlLSFpoYkNrZ2UxeHVJQ0FnSUhKbGRIVnliaUIyWVd3Z0lUMDlJRzUxYkd3Z0ppWWdiMkpxWldOMFRuVnNiRTlyUTJobFkydGxjaWgyWVd3cE8xeHVJQ0I5WEc0Z0lHOWlhbVZqZEVOb1pXTnJaWEl1ZEhsd1pTQTlJQ2RQWW1wbFkzUW5PMXh1SUNCdFlXdGxUM0IwYVc5dVlXd29iMkpxWldOMFEyaGxZMnRsY2lrN1hHNGdJRzlpYW1WamRFTm9aV05yWlhJdWJuVnNiRTlySUQwZ2IySnFaV04wVG5Wc2JFOXJRMmhsWTJ0bGNqdGNibHh1SUNCeVpYUjFjbTRnYjJKcVpXTjBRMmhsWTJ0bGNqdGNibjFjYmx4dVhHNW1kVzVqZEdsdmJpQnBibk4wWVc1alpVTm9aV05yUjJWMGRHVnlLR05zWVhOelZHOURhR1ZqYXlrZ2UxeHVJQ0JtZFc1amRHbHZiaUJwYm5OMFlXNWpaVU5vWldOclpYSW9kbUZzS1NCN1hHNGdJQ0FnY21WMGRYSnVJSFpoYkNCcGJuTjBZVzVqWlc5bUlHTnNZWE56Vkc5RGFHVmphenRjYmlBZ2ZWeHVYRzRnSUdsdWMzUmhibU5sUTJobFkydGxjaTUwZVhCbElEMGdZMnhoYzNOVWIwTm9aV05yTG01aGJXVTdYRzRnSUcxaGEyVlBjSFJwYjI1aGJDaHBibk4wWVc1alpVTm9aV05yWlhJcE8xeHVJQ0J5WlhSMWNtNGdhVzV6ZEdGdVkyVkRhR1ZqYTJWeU8xeHVmVnh1WEc1bWRXNWpkR2x2YmlCdmJtVlBaa05vWldOclIyVjBkR1Z5S0dWdWRXMXpLU0I3WEc0Z0lHWjFibU4wYVc5dUlHOXVaVTltUTJobFkydGxjaWgyWVd3cElIdGNiaUFnSUNCeVpYUjFjbTRnWlc1MWJYTXVjMjl0WlNobGJtMGdQVDRnWlc1dElEMDlQU0IyWVd3cE8xeHVJQ0I5WEc1Y2JpQWdiMjVsVDJaRGFHVmphMlZ5TG5SNWNHVWdQU0JnWlc1MWJWc2tlMlZ1ZFcxekxtcHZhVzRvSnl3Z0p5bDlYV0E3WEc0Z0lHMWhhMlZQY0hScGIyNWhiQ2h2Ym1WUFprTm9aV05yWlhJcE8xeHVJQ0J5WlhSMWNtNGdiMjVsVDJaRGFHVmphMlZ5TzF4dWZWeHVYRzVtZFc1amRHbHZiaUJ2Ym1WUFpsUjVjR1ZEYUdWamEwZGxkSFJsY2loamFHVmphMlZ5Y3lrZ2UxeHVJQ0JtZFc1amRHbHZiaUJ2Ym1WUFpsUjVjR1ZEYUdWamEyVnlLSFpoYkNrZ2UxeHVJQ0FnSUhKbGRIVnliaUJqYUdWamEyVnljeTV6YjIxbEtHTm9aV05yWlhJZ1BUNGdZMmhsWTJ0bGNpaDJZV3dwS1R0Y2JpQWdmVnh1WEc0Z0lHOXVaVTltVkhsd1pVTm9aV05yWlhJdWRIbHdaU0E5SUdOb1pXTnJaWEp6TG0xaGNDaG5aWFJEYUdWamEyVnlSR2x6Y0d4aGVTa3VhbTlwYmlnbklHOXlJQ2NwTzF4dUlDQnRZV3RsVDNCMGFXOXVZV3dvYjI1bFQyWlVlWEJsUTJobFkydGxjaWs3WEc0Z0lISmxkSFZ5YmlCdmJtVlBabFI1Y0dWRGFHVmphMlZ5TzF4dWZWeHVYRzVtZFc1amRHbHZiaUJoY25KaGVVOW1RMmhsWTJ0SFpYUjBaWElvWTJobFkydGxjaWtnZTF4dUlDQm1kVzVqZEdsdmJpQmhjbkpoZVU5bVEyaGxZMnRsY2loMllXd3BJSHRjYmlBZ0lDQnlaWFIxY200Z1kyaGxZMnRsY25NdVlYSnlZWGtvZG1Gc0tTQW1KaUIyWVd3dVpYWmxjbmtvWTJobFkydGxjaWs3WEc0Z0lIMWNibHh1SUNCaGNuSmhlVTltUTJobFkydGxjaTUwZVhCbElEMGdZR0Z5Y21GNVQyWmJKSHRuWlhSRGFHVmphMlZ5UkdsemNHeGhlU2hqYUdWamEyVnlLWDFkWUR0Y2JpQWdiV0ZyWlU5d2RHbHZibUZzS0dGeWNtRjVUMlpEYUdWamEyVnlLVHRjYmlBZ2NtVjBkWEp1SUdGeWNtRjVUMlpEYUdWamEyVnlPMXh1ZlZ4dVhHNW1kVzVqZEdsdmJpQnZZbXBsWTNSUFprTm9aV05yUjJWMGRHVnlLR05vWldOclpYSXBJSHRjYmlBZ1puVnVZM1JwYjI0Z2IySnFaV04wVDJaRGFHVmphMlZ5S0haaGJDa2dlMXh1SUNBZ0lISmxkSFZ5YmlCamFHVmphMlZ5Y3k1dlltcGxZM1FvZG1Gc0tTQW1KaUJsWVdOb0tIWmhiQ3dnWTJobFkydGxjaWs3WEc0Z0lIMWNibHh1SUNCdlltcGxZM1JQWmtOb1pXTnJaWEl1ZEhsd1pTQTlJR0J2WW1wbFkzUlBabHNrZTJkbGRFTm9aV05yWlhKRWFYTndiR0Y1S0dOb1pXTnJaWElwZlYxZ08xeHVJQ0J0WVd0bFQzQjBhVzl1WVd3b2IySnFaV04wVDJaRGFHVmphMlZ5S1R0Y2JpQWdjbVYwZFhKdUlHOWlhbVZqZEU5bVEyaGxZMnRsY2p0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnWjJWMFUyaGhjR1ZEYUdWamEwZGxkSFJsY2lncElIdGNiaUFnWm5WdVkzUnBiMjRnYzJoaGNHVkRhR1ZqYTBkbGRIUmxjaWh6YUdGd1pTa2dlMXh1SUNBZ0lHWjFibU4wYVc5dUlITm9ZWEJsUTJobFkydGxjaWgyWVd3cElIdGNiaUFnSUNBZ0lISmxkSFZ5YmlCamFHVmphMlZ5Y3k1dlltcGxZM1FvZG1Gc0tTQW1KaUJsWVdOb0tITm9ZWEJsTENBb1kyaGxZMnRsY2l3Z2NISnZjQ2tnUFQ0Z2UxeHVJQ0FnSUNBZ0lDQWdJR2xtSUNnaGRtRnNMbWhoYzA5M2JsQnliM0JsY25SNUtIQnliM0FwSUNZbUlHTm9aV05yWlhJdWFYTlBjSFJwYjI1aGJDa2dlMXh1SUNBZ0lDQWdJQ0FnSUNBZ2NtVjBkWEp1SUhSeWRXVTdYRzRnSUNBZ0lDQWdJQ0FnZlNCbGJITmxJSHRjYmlBZ0lDQWdJQ0FnSUNBZ0lISmxkSFZ5YmlCamFHVmphMlZ5S0haaGJGdHdjbTl3WFN3Z2NISnZjQ3dnZG1Gc0tUdGNiaUFnSUNBZ0lDQWdJQ0I5WEc0Z0lDQWdJQ0FnSUgwcElDWW1JQ2doYzJoaGNHVkRhR1ZqYTJWeUxuTjBjbWxqZENCOGZDQmxZV05vS0haaGJDd2dLSEJ5YjNBc0lHNWhiV1VwSUQwK0lIdGNiaUFnSUNBZ0lDQWdJQ0J5WlhSMWNtNGdjMmhoY0dVdWFHRnpUM2R1VUhKdmNHVnlkSGtvYm1GdFpTazdYRzRnSUNBZ0lDQWdJSDBwS1R0Y2JpQWdJQ0I5WEc1Y2JpQWdJQ0IyWVhJZ1kyOXdhV1ZrVTJoaGNHVWdQU0JqYjNCNUtITm9ZWEJsS1R0Y2JpQWdJQ0JsWVdOb0tHTnZjR2xsWkZOb1lYQmxMQ0FvZG1Gc0xDQndjbTl3S1NBOVBpQjdYRzRnSUNBZ0lDQmpiM0JwWldSVGFHRndaVnR3Y205d1hTQTlJR2RsZEVOb1pXTnJaWEpFYVhOd2JHRjVLSFpoYkNrN1hHNGdJQ0FnZlNrN1hHNGdJQ0FnYzJoaGNHVkRhR1ZqYTJWeUxuUjVjR1VnUFNCZ2MyaGhjR1VvSkh0S1UwOU9Mbk4wY21sdVoybG1lU2hqYjNCcFpXUlRhR0Z3WlNsOUtXQTdYRzRnSUNBZ2JXRnJaVTl3ZEdsdmJtRnNLSE5vWVhCbFEyaGxZMnRsY2lrN1hHNGdJQ0FnY21WMGRYSnVJSE5vWVhCbFEyaGxZMnRsY2p0Y2JpQWdmVnh1WEc0Z0lITm9ZWEJsUTJobFkydEhaWFIwWlhJdWFXWk9iM1FnUFNCbWRXNWpkR2x2YmlCcFprNXZkQ2h2ZEdobGNsQnliM0J6TENCd2NtOXdRMmhsWTJ0bGNpa2dlMXh1SUNBZ0lHbG1JQ2doUVhKeVlYa3VhWE5CY25KaGVTaHZkR2hsY2xCeWIzQnpLU2tnZTF4dUlDQWdJQ0FnYjNSb1pYSlFjbTl3Y3lBOUlGdHZkR2hsY2xCeWIzQnpYVHRjYmlBZ0lDQjlYRzRnSUNBZ1puVnVZM1JwYjI0Z2FXWk9iM1JEYUdWamEyVnlLSEJ5YjNBc0lIQnliM0JPWVcxbExDQnZZbW9wSUh0Y2JpQWdJQ0FnSUhaaGNpQndjbTl3UlhocGMzUnpJRDBnYjJKcUlDWW1JRzlpYWk1b1lYTlBkMjVRY205d1pYSjBlU2h3Y205d1RtRnRaU2s3WEc0Z0lDQWdJQ0IyWVhJZ2IzUm9aWEpRY205d2MwVjRhWE4wSUQwZ2IzUm9aWEpRY205d2N5NXpiMjFsS0c5MGFHVnlVSEp2Y0NBOVBpQnZZbW9nSmlZZ2IySnFMbWhoYzA5M2JsQnliM0JsY25SNUtHOTBhR1Z5VUhKdmNDa3BPMXh1SUNBZ0lDQWdjbVYwZFhKdUlDaHdjbTl3UlhocGMzUnpJQ0U5UFNCdmRHaGxjbEJ5YjNCelJYaHBjM1FwSUNZbUlDZ2hjSEp2Y0VWNGFYTjBjeUI4ZkNCd2NtOXdSWGhwYzNSeklDWW1JSEJ5YjNCRGFHVmphMlZ5S0hCeWIzQXBJQ1ltSUNGdmRHaGxjbEJ5YjNCelJYaHBjM1FwTzF4dVhHNGdJQ0FnZlZ4dUlDQWdJR2xtVG05MFEyaGxZMnRsY2k1MGVYQmxJRDBnWUdsbVRtOTBXeVI3YjNSb1pYSlFjbTl3Y3k1cWIybHVLQ2NzSUNjcGZWMWdPMXh1SUNBZ0lHMWhhMlZQY0hScGIyNWhiQ2hwWms1dmRFTm9aV05yWlhJcE8xeHVJQ0FnSUhKbGRIVnliaUJwWms1dmRFTm9aV05yWlhJN1hHNGdJSDA3WEc1Y2JpQWdjMmhoY0dWRGFHVmphMGRsZEhSbGNpNXZibXg1U1dZZ1BTQm1kVzVqZEdsdmJpQnZibXg1U1dZb2IzUm9aWEpRY205d2N5d2djSEp2Y0VOb1pXTnJaWElwSUh0Y2JpQWdJQ0JwWmlBb0lVRnljbUY1TG1selFYSnlZWGtvYjNSb1pYSlFjbTl3Y3lrcElIdGNiaUFnSUNBZ0lHOTBhR1Z5VUhKdmNITWdQU0JiYjNSb1pYSlFjbTl3YzEwN1hHNGdJQ0FnZlZ4dUlDQWdJR1oxYm1OMGFXOXVJRzl1YkhsSlprTm9aV05yWlhJb2NISnZjQ3dnY0hKdmNFNWhiV1VzSUc5aWFpa2dlMXh1SUNBZ0lDQWdjbVYwZFhKdUlHOTBhR1Z5VUhKdmNITXVaWFpsY25rb2NISnZjQ0E5UGlCdlltb3VhR0Z6VDNkdVVISnZjR1Z5ZEhrb2NISnZjQ2twSUNZbUlIQnliM0JEYUdWamEyVnlLSEJ5YjNBcE8xeHVJQ0FnSUgxY2JpQWdJQ0J2Ym14NVNXWkRhR1ZqYTJWeUxuUjVjR1VnUFNCZ2IyNXNlVWxtV3lSN2IzUm9aWEpRY205d2N5NXFiMmx1S0Njc0lDY3BmVjFnTzF4dUlDQWdJRzFoYTJWUGNIUnBiMjVoYkNodmJteDVTV1pEYUdWamEyVnlLVHRjYmlBZ0lDQnlaWFIxY200Z2IyNXNlVWxtUTJobFkydGxjanRjYmlBZ2ZUdGNibHh1SUNCeVpYUjFjbTRnYzJoaGNHVkRhR1ZqYTBkbGRIUmxjanRjYm4xY2JseHVablZ1WTNScGIyNGdZVzU1UTJobFkydEhaWFIwWlhJb0tTQjdYRzRnSUdaMWJtTjBhVzl1SUdGdWVVTm9aV05yWlhJb0tTQjdYRzRnSUNBZ2NtVjBkWEp1SUhSeWRXVTdYRzRnSUgxY2JseHVJQ0JoYm5sRGFHVmphMlZ5TG5SNWNHVWdQU0FuWVc1NUp6dGNiaUFnYldGclpVOXdkR2x2Ym1Gc0tHRnVlVU5vWldOclpYSXBPMXh1SUNCeVpYUjFjbTRnWVc1NVEyaGxZMnRsY2p0Y2JuMWNibHh1Wm5WdVkzUnBiMjRnYldGclpVOXdkR2x2Ym1Gc0tHTm9aV05yWlhJcElIdGNiaUFnWTJobFkydGxjaTV2Y0hScGIyNWhiQ0E5SUdaMWJtTjBhVzl1SUc5d2RHbHZibUZzUTJobFkyc29LU0I3WEc0Z0lDQWdjbVYwZFhKdUlHTm9aV05yWlhJb0xpNHVZWEpuZFcxbGJuUnpLVHRjYmlBZ2ZUdGNiaUFnWTJobFkydGxjaTV2Y0hScGIyNWhiQzVwYzA5d2RHbHZibUZzSUQwZ2RISjFaVHRjYmlBZ1kyaGxZMnRsY2k1dmNIUnBiMjVoYkM1MGVYQmxJRDBnWTJobFkydGxjaTUwZVhCbE8xeHVJQ0JqYUdWamEyVnlMbTl3ZEdsdmJtRnNMbVJwYzNCc1lYbE9ZVzFsSUQwZ1kyaGxZMnRsY2k1a2FYTndiR0Y1VG1GdFpUdGNibjFjYmx4dVhHNWNiaThxS2lCWFJVSlFRVU5MSUVaUFQxUkZVaUFxS2x4dUlDb3FJQzR1TDM0dmFuTm9hVzUwTFd4dllXUmxjaUV1TDJOb1pXTnJaWEp6TG1welhHNGdLaW92SWwwc0luTnZkWEpqWlZKdmIzUWlPaUlpTENKbWFXeGxJam9pWVhCcFEyaGxZMnN1YW5NaWZRPT1cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4uL34vYXBpLWNoZWNrL2Rpc3QvYXBpQ2hlY2suanNcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZm9ybWx5LmpzIn0=