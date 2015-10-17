// angular-formly version 3.2.1 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

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
	  __webpack_require__(10)(ngModule);
	  __webpack_require__(11)(ngModule);
	  __webpack_require__(12)(ngModule);
	  __webpack_require__(13)(ngModule);
	  __webpack_require__(14)(ngModule);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(8)(ngModule);
	  __webpack_require__(9)(ngModule);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(15)(ngModule);
	  __webpack_require__(16)(ngModule);
	  __webpack_require__(17)(ngModule);
	  __webpack_require__(18)(ngModule);
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(19)(ngModule);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var utils = __webpack_require__(20);
	
	module.exports = function (ngModule) {
	  ngModule.factory("formlyUtil", formlyUtil);
	
	  formlyUtil.tests = false ? require("./formlyUtil.test")(ngModule) : null;
	
	  function formlyUtil() {
	    return utils;
	  }
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toArray = function (arr) { return Array.isArray(arr) ? arr : Array.from(arr); };
	
	module.exports = function (ngModule) {
	  ngModule.factory("formlyWarn", ["formlyConfig", "formlyErrorAndWarningsUrlPrefix", "$log", function (formlyConfig, formlyErrorAndWarningsUrlPrefix, $log) {
	    return function warn() {
	      if (!formlyConfig.disableWarnings) {
	        var args = Array.prototype.slice.call(arguments);
	        var warnInfoSlug = args.shift();
	        args.unshift("Formly Warning:");
	        args.push("" + formlyErrorAndWarningsUrlPrefix + "" + warnInfoSlug);
	        $log.warn.apply($log, _toArray(args));
	      }
	    };
	  }]);
	};

/***/ },
/* 10 */
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
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(2);
	var utils = __webpack_require__(20);
	
	module.exports = function (ngModule) {
	  ngModule.provider("formlyConfig", formlyConfig);
	
	  formlyConfig.tests = false ? require("./formlyConfig.test")(ngModule) : null;
	
	  function formlyConfig(formlyUsabilityProvider) {
	    var _this2 = this;
	
	
	    var typeMap = {};
	    var templateWrappersMap = {};
	    var defaultWrapperName = "default";
	    var _this = this;
	    var getError = formlyUsabilityProvider.getFormlyError;
	    var allowedTypeProperties = ["name", "template", "templateUrl", "controller", "link", "defaultOptions", "extends", "wrapper", "data"];
	
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
	        disableNgModelAttrsManipulator: false
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
	      if (!options.name) {
	        throw getError("You must provide a name for setType. You provided: " + JSON.stringify(arguments));
	      } else if (!options.defaultOptions && !options.template && !options.templateUrl && !options["extends"]) {
	        throw getError("You must provide defaultOptions, extends OR a template OR templateUrl for setType. " + ("You provided none of these: " + JSON.stringify(arguments)));
	      } else if (options.template && options.templateUrl) {
	        throw getError("You must provide at most a template OR templateUrl for setType. " + ("You provided both: " + JSON.stringify(arguments)));
	      }
	      if (!options.overwriteOk) {
	        checkOverwrite(options.name, typeMap, options, "types");
	      } else {
	        delete options.overwriteOk;
	      }
	      formlyUsabilityProvider.checkAllowedProperties(allowedTypeProperties, options);
	    }
	
	    function extendTypeOptions(options) {
	      var extendsType = getType(options["extends"], true, options);
	      extendTypeControllerFunction(options, extendsType);
	      extendTypeLinkFunction(options, extendsType);
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
	          if (optionsDOIsFn) {
	            return optionsDO(extendsDefaultOptions);
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
	
	    function setWrapper(options, name) {
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
	        return setWrapper({
	          template: options,
	          name: name
	        });
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
	  formlyConfig.$inject = ["formlyUsabilityProvider"];
	
	
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyVersion", ("3.2.1"));
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyErrorAndWarningsUrlPrefix", "https://github.com/formly-js/angular-formly/wiki/Errors-and-Warnings#");
	};

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyCustomValidation", formlyCustomValidation);
	
	  formlyCustomValidation.tests = false ? require("./formly-custom-validation.test")(ngModule) : null;
	
	  function formlyCustomValidation(formlyUtil, $q) {
	    return {
	      require: "ngModel",
	      link: function (scope, el, attrs, ctrl) {
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
/* 16 */
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
	        addShowMessagesWatcher($scope, opts);
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
	          var expression = "options.formControl.$invalid && (options.formControl.$touched || options.validation.show)";
	          scope.$watch(expression, function (show) {
	            options.validation.errorExistsAndShouldBeVisible = show;
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
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toArray = function (arr) { return Array.isArray(arr) ? arr : Array.from(arr); };
	
	var _slice = Array.prototype.slice;
	var angular = __webpack_require__(2);
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyForm", formlyForm);
	
	  formlyForm.tests = false ? require("./formly-form.test")(ngModule) : null;
	
	  function formlyForm(formlyUsability) {
	    var currentFormId = 1;
	    return {
	      restrict: "E",
	      template: function (el, attrs) {
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
	      controller: ["$scope", function ($scope) {
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
	              return originalExpression.apply(undefined, _toArray(args));
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
	              return originalListener.apply(undefined, _toArray(args));
	            };
	            watchListener.displayName = "Formly Watch Listener for field for " + field.key;
	          }
	          return watchListener;
	        }
	
	        function modifyArgs(watcher, index) {
	          for (var _len = arguments.length, originalArgs = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
	            originalArgs[_key - 2] = arguments[_key];
	          }
	
	          return [$scope.fields[index]].concat(_toArray(originalArgs), [watcher.stopWatching]);
	        }
	      }],
	      link: function (scope, el, attrs) {
	        if (attrs.hasOwnProperty("result")) {
	          throw formlyUsability.getFormlyError("The \"result\" attribute on a formly-form is no longer valid. Use \"model\" instead");
	        }
	        if (attrs.name !== "form") {
	          // then they specified their own name
	          throw formlyUsability.getFormlyError("The \"name\" attribute on a formly-form is no longer valid. Use \"form\" instead");
	        }
	        // enforce the model attribute because we're making it optional to help with migrations
	        if (!attrs.hasOwnProperty("model") || !scope.model) {
	          throw formlyUsability.getFormlyError("The \"model\" attribute is required on a formly-form.");
	        }
	      }
	    };
	  }
	  formlyForm.$inject = ["formlyUsability"];
	};

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyFocus", ["$timeout", "$document", function ($timeout, $document) {
	    /* jshint -W052 */
	    return {
	      link: function (scope, element, attrs) {
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.run(addFormlyNgModelAttrsManipulator);
	
	  function addFormlyNgModelAttrsManipulator(formlyConfig) {
	    if (formlyConfig.extras.disableNgModelAttrsManipulator) {
	      return;
	    }
	    formlyConfig.templateManipulators.preWrapper.push(ngModelAttrsManipulator);
	  }
	  addFormlyNgModelAttrsManipulator.$inject = ["formlyConfig"];
	
	
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
	        /* jshint maxcomplexity:9 */
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
	      var bothAttributeAndBound = ["required", "disabled", "pattern", "maxlength", "minlength"];
	      var expressionOnly = ["change", "keydown", "keyup", "keypress", "click", "focus", "blur"];
	      var attributeOnly = ["placeholder", "min", "max", "tabindex", "type"];
	
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
	};

/***/ },
/* 20 */
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

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhZjQ2NzlhMTkyNTMwOTAyYzQwYSIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vYW5ndWxhci1maXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9mb3JtbHlVdGlsLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2Zvcm1seVdhcm4uanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seVVzYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlWZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktY3VzdG9tLXZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktZmllbGQuanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb2N1cy5qcyIsIndlYnBhY2s6Ly8vLi9ydW4vZm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IuanMiLCJ3ZWJwYWNrOi8vLy4vb3RoZXIvdXRpbHMuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUN0Q0E7O0FBRUEseUM7Ozs7OztBQ0ZBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQjs7Ozs7O0FDWEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEI7Ozs7OztBQ1JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ1JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ0xBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNQQTs7QUFFQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDSkEsZ0Q7Ozs7OztBQ0FBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDWkE7O0FBRUEsZ0NBQStCLG1EQUFtRDs7QUFFbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHOzs7Ozs7QUNoQkE7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSxJQUFHO0FBQ0gsRzs7Ozs7O0FDeEVBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsTUFBSzs7QUFFTDtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxxQ0FBb0MsaUJBQWlCO0FBQ3JELHFDQUFvQyxpQkFBaUI7QUFDckQ7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLEc7Ozs7OztBQ3BRQTs7QUFFQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDSkE7O0FBRUE7QUFDQTtBQUNBLEc7Ozs7OztBQ0pBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHOzs7Ozs7QUNqQ0E7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsZ0JBQWU7QUFDZjtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakI7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCO0FBQ0E7QUFDQSxvQkFBbUI7QUFDbkI7QUFDQTtBQUNBLGtCQUFpQjtBQUNqQixnQkFBZTtBQUNmO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQzNHQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZTtBQUNmLGNBQWE7QUFDYixZQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLHFCQUFvQjtBQUNwQixnQ0FBK0I7QUFDL0I7QUFDQSxZQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxzRUFBcUU7QUFDckU7QUFDQTtBQUNBLFlBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7O0FBRUE7QUFDQSx3REFBdUQ7QUFDdkQscURBQW9EO0FBQ3BEO0FBQ0E7QUFDQSx3Q0FBdUMsZ0JBQWdCO0FBQ3ZEO0FBQ0EsWUFBVztBQUNYO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakIsZ0JBQWU7QUFDZixjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWCx1Q0FBc0M7QUFDdEM7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQSxxREFBb0Q7QUFDcEQ7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQzVVQTs7QUFFQSxnQ0FBK0IsbURBQW1EOztBQUVsRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxtVEFBa1QsZ0RBQWdEO0FBQ2xXLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQSxtREFBa0Q7QUFDbEQsdURBQXNEOztBQUV0RDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYLFVBQVM7O0FBRVQ7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFlBQVc7QUFDWDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxxR0FBb0csYUFBYTtBQUNqSDtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUN4SEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRzs7Ozs7O0FDNUJBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1g7QUFDQSxZQUFXO0FBQ1g7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0Esd0JBQXVCLGFBQWE7QUFDcEMsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQSxvQ0FBbUM7QUFDbkMsUUFBTzs7QUFFUDtBQUNBO0FBQ0Esd0NBQXVDO0FBQ3ZDLFFBQU87O0FBRVA7QUFDQSxvQ0FBbUM7QUFDbkMsUUFBTztBQUNQO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ25JQTs7QUFFQTs7QUFFQSxtQkFBa0I7OztBQUdsQjtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0g7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0wsSUFBRztBQUNIOztBQUVBO0FBQ0E7QUFDQSxFIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5nRm9ybWx5XCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibmdGb3JtbHlcIl0gPSBmYWN0b3J5KHJvb3RbXCJhbmd1bGFyXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfN19fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgYWY0Njc5YTE5MjUzMDkwMmM0MGFcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9pbmRleC5jb21tb25cIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBuZ01vZHVsZU5hbWUgPSBcImZvcm1seVwiO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiLi9hbmd1bGFyLWZpeFwiKTtcbnZhciBuZ01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5nTW9kdWxlTmFtZSwgW10pO1xuXG5yZXF1aXJlKFwiLi9wcm92aWRlcnNcIikobmdNb2R1bGUpO1xucmVxdWlyZShcIi4vc2VydmljZXNcIikobmdNb2R1bGUpO1xucmVxdWlyZShcIi4vZGlyZWN0aXZlc1wiKShuZ01vZHVsZSk7XG5yZXF1aXJlKFwiLi9ydW5cIikobmdNb2R1bGUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlTmFtZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguY29tbW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbi8vIHNvbWUgdmVyc2lvbnMgb2YgYW5ndWxhciBkb24ndCBleHBvcnQgdGhlIGFuZ3VsYXIgbW9kdWxlIHByb3Blcmx5LFxuLy8gc28gd2UgZ2V0IGl0IGZyb20gd2luZG93IGluIHRoaXMgY2FzZS5cbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXJcIik7XG5pZiAoIWFuZ3VsYXIudmVyc2lvbikge1xuICBhbmd1bGFyID0gd2luZG93LmFuZ3VsYXI7XG59XG5tb2R1bGUuZXhwb3J0cyA9IGFuZ3VsYXI7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2FuZ3VsYXItZml4L2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seVVzYWJpbGl0eVwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seUNvbmZpZ1wiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seVZlcnNpb25cIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4XCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzXCIpKG5nTW9kdWxlKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Byb3ZpZGVycy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICByZXF1aXJlKFwiLi9mb3JtbHlVdGlsXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5V2FyblwiKShuZ01vZHVsZSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zZXJ2aWNlcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICByZXF1aXJlKFwiLi9mb3JtbHktY3VzdG9tLXZhbGlkYXRpb25cIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHktZmllbGRcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHktZm9ybVwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seS1mb2N1c1wiKShuZ01vZHVsZSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9kaXJlY3RpdmVzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yXCIpKG5nTW9kdWxlKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3J1bi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgdXRpbHMgPSByZXF1aXJlKFwiLi4vb3RoZXIvdXRpbHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmZhY3RvcnkoXCJmb3JtbHlVdGlsXCIsIGZvcm1seVV0aWwpO1xuXG4gIGZvcm1seVV0aWwudGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZShcIi4vZm9ybWx5VXRpbC50ZXN0XCIpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5VXRpbCgpIHtcbiAgICByZXR1cm4gdXRpbHM7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NlcnZpY2VzL2Zvcm1seVV0aWwuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIF90b0FycmF5ID0gZnVuY3Rpb24gKGFycikgeyByZXR1cm4gQXJyYXkuaXNBcnJheShhcnIpID8gYXJyIDogQXJyYXkuZnJvbShhcnIpOyB9O1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5mYWN0b3J5KFwiZm9ybWx5V2FyblwiLCBbXCJmb3JtbHlDb25maWdcIiwgXCJmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4XCIsIFwiJGxvZ1wiLCBmdW5jdGlvbiAoZm9ybWx5Q29uZmlnLCBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LCAkbG9nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgICBpZiAoIWZvcm1seUNvbmZpZy5kaXNhYmxlV2FybmluZ3MpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICB2YXIgd2FybkluZm9TbHVnID0gYXJncy5zaGlmdCgpO1xuICAgICAgICBhcmdzLnVuc2hpZnQoXCJGb3JtbHkgV2FybmluZzpcIik7XG4gICAgICAgIGFyZ3MucHVzaChcIlwiICsgZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCArIFwiXCIgKyB3YXJuSW5mb1NsdWcpO1xuICAgICAgICAkbG9nLndhcm4uYXBwbHkoJGxvZywgX3RvQXJyYXkoYXJncykpO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NlcnZpY2VzL2Zvcm1seVdhcm4uanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhci1maXhcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLnByb3ZpZGVyKFwiZm9ybWx5VXNhYmlsaXR5XCIsIFtcImZvcm1seVZlcnNpb25cIiwgZnVuY3Rpb24gKGZvcm1seVZlcnNpb24pIHtcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBlcnJvcnNBbmRXYXJuaW5nc1VybFByZWZpeCA9IFwiaHR0cHM6Ly9naXRodWIuY29tL2Zvcm1seS1qcy9hbmd1bGFyLWZvcm1seS9ibG9iL1wiICsgZm9ybWx5VmVyc2lvbiArIFwiL290aGVyL0VSUk9SU19BTkRfV0FSTklOR1MubWQjXCI7XG4gICAgYW5ndWxhci5leHRlbmQodGhpcywge1xuICAgICAgZ2V0Rm9ybWx5RXJyb3I6IGdldEZvcm1seUVycm9yLFxuICAgICAgZ2V0RmllbGRFcnJvcjogZ2V0RmllbGRFcnJvcixcbiAgICAgIGNoZWNrV3JhcHBlcjogY2hlY2tXcmFwcGVyLFxuICAgICAgY2hlY2tXcmFwcGVyVGVtcGxhdGU6IGNoZWNrV3JhcHBlclRlbXBsYXRlLFxuICAgICAgY2hlY2tBbGxvd2VkUHJvcGVydGllczogY2hlY2tBbGxvd2VkUHJvcGVydGllcyxcbiAgICAgICRnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0RmllbGRFcnJvcihlcnJvckluZm9TbHVnLCBtZXNzYWdlLCBmaWVsZCkge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICAgIGZpZWxkID0gbWVzc2FnZTtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9ySW5mb1NsdWc7XG4gICAgICAgIGVycm9ySW5mb1NsdWcgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkgKyAoXCIgRmllbGQgZGVmaW5pdGlvbjogXCIgKyBhbmd1bGFyLnRvSnNvbihmaWVsZCkpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGb3JtbHlFcnJvcihlcnJvckluZm9TbHVnLCBtZXNzYWdlKSB7XG4gICAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9ySW5mb1NsdWc7XG4gICAgICAgIGVycm9ySW5mb1NsdWcgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSB7XG4gICAgICB2YXIgdXJsID0gXCJcIjtcbiAgICAgIGlmIChlcnJvckluZm9TbHVnICE9PSBudWxsKSB7XG4gICAgICAgIHVybCA9IFwiXCIgKyBlcnJvcnNBbmRXYXJuaW5nc1VybFByZWZpeCArIFwiXCIgKyBlcnJvckluZm9TbHVnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFwiRm9ybWx5IEVycm9yOiBcIiArIG1lc3NhZ2UgKyBcIi4gXCIgKyB1cmw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyKHdyYXBwZXIpIHtcbiAgICAgIGlmICh3cmFwcGVyLnRlbXBsYXRlICYmIHdyYXBwZXIudGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXCJUZW1wbGF0ZSB3cmFwcGVycyBjYW4gb25seSBoYXZlIGEgdGVtcGxhdGVVcmwgb3IgYSB0ZW1wbGF0ZS4gXCIgKyAoXCJUaGlzIG9uZSBwcm92aWRlZCBib3RoOiBcIiArIEpTT04uc3RyaW5naWZ5KHdyYXBwZXIpKSk7XG4gICAgICB9XG4gICAgICBpZiAoIXdyYXBwZXIudGVtcGxhdGUgJiYgIXdyYXBwZXIudGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXCJUZW1wbGF0ZSB3cmFwcGVycyBtdXN0IGhhdmUgb25lIG9mIGEgdGVtcGxhdGVVcmwgb3IgYSB0ZW1wbGF0ZS4gXCIgKyAoXCJUaGlzIG9uZSBwcm92aWRlZCBuZWl0aGVyOiBcIiArIEpTT04uc3RyaW5naWZ5KHdyYXBwZXIpKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyVGVtcGxhdGUodGVtcGxhdGUsIGFkZGl0aW9uYWxJbmZvKSB7XG4gICAgICB2YXIgZm9ybWx5VHJhbnNjbHVkZSA9IFwiPGZvcm1seS10cmFuc2NsdWRlPjwvZm9ybWx5LXRyYW5zY2x1ZGU+XCI7XG4gICAgICBpZiAodGVtcGxhdGUuaW5kZXhPZihmb3JtbHlUcmFuc2NsdWRlKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXCJUZW1wbGF0ZSB3cmFwcGVyIHRlbXBsYXRlcyBtdXN0IHVzZSBcXFwiXCIgKyBmb3JtbHlUcmFuc2NsdWRlICsgXCJcXFwiIHNvbWV3aGVyZSBpbiB0aGVtLiBcIiArIChcIlRoaXMgb25lIGRvZXMgbm90IGhhdmUgXFxcIjxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPlxcXCIgaW4gaXQ6IFwiICsgdGVtcGxhdGUpICsgXCJcXG5cIiArIChcIkFkZGl0aW9uYWwgaW5mb3JtYXRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkoYWRkaXRpb25hbEluZm8pKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tBbGxvd2VkUHJvcGVydGllcyhhbGxvd2VkUHJvcGVydGllcywgb2JqLCBjb250ZXh0KSB7XG4gICAgICB2YXIgZXh0cmFQcm9wcyA9IE9iamVjdC5rZXlzKG9iaikuZmlsdGVyKGZ1bmN0aW9uIChwcm9wKSB7XG4gICAgICAgIHJldHVybiBhbGxvd2VkUHJvcGVydGllcy5pbmRleE9mKHByb3ApID09PSAtMTtcbiAgICAgIH0pO1xuICAgICAgaWYgKGV4dHJhUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgIHZhciBleHRyYVByb3BzSlNPTiA9IEpTT04uc3RyaW5naWZ5KGV4dHJhUHJvcHMuam9pbihcIiwgXCIpKTtcbiAgICAgICAgdmFyIGFsbG93ZWRQcm9wc0pTT04gPSBKU09OLnN0cmluZ2lmeShhbGxvd2VkUHJvcGVydGllcy5qb2luKFwiLCBcIikpO1xuICAgICAgICB0aHJvdyBnZXRGaWVsZEVycm9yKFwieW91LWhhdmUtc3BlY2lmaWVkLXByb3BlcnRpZXMtZm9yLWNvbnRleHQtdGhhdC1hcmUtbm90LWFsbG93ZWRcIiwgW1wiWW91IGhhdmUgc3BlY2lmaWVkIHByb3BlcnRpZXMgZm9yIFwiICsgY29udGV4dCArIFwiIHRoYXQgYXJlIG5vdCBhbGxvd2VkOiBcIiArIGV4dHJhUHJvcHNKU09OLCBcIkFsbG93ZWQgcHJvcGVydGllcyBhcmU6IFwiICsgYWxsb3dlZFByb3BzSlNPTl0uam9pbihcIlxcblwiKSwgb2JqKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgfV0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHJvdmlkZXJzL2Zvcm1seVVzYWJpbGl0eS5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhci1maXhcIik7XG52YXIgdXRpbHMgPSByZXF1aXJlKFwiLi4vb3RoZXIvdXRpbHNcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLnByb3ZpZGVyKFwiZm9ybWx5Q29uZmlnXCIsIGZvcm1seUNvbmZpZyk7XG5cbiAgZm9ybWx5Q29uZmlnLnRlc3RzID0gT05fVEVTVCA/IHJlcXVpcmUoXCIuL2Zvcm1seUNvbmZpZy50ZXN0XCIpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5Q29uZmlnKGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cblxuICAgIHZhciB0eXBlTWFwID0ge307XG4gICAgdmFyIHRlbXBsYXRlV3JhcHBlcnNNYXAgPSB7fTtcbiAgICB2YXIgZGVmYXVsdFdyYXBwZXJOYW1lID0gXCJkZWZhdWx0XCI7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZ2V0RXJyb3IgPSBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5nZXRGb3JtbHlFcnJvcjtcbiAgICB2YXIgYWxsb3dlZFR5cGVQcm9wZXJ0aWVzID0gW1wibmFtZVwiLCBcInRlbXBsYXRlXCIsIFwidGVtcGxhdGVVcmxcIiwgXCJjb250cm9sbGVyXCIsIFwibGlua1wiLCBcImRlZmF1bHRPcHRpb25zXCIsIFwiZXh0ZW5kc1wiLCBcIndyYXBwZXJcIiwgXCJkYXRhXCJdO1xuXG4gICAgYW5ndWxhci5leHRlbmQodGhpcywge1xuICAgICAgc2V0VHlwZTogc2V0VHlwZSxcbiAgICAgIGdldFR5cGU6IGdldFR5cGUsXG4gICAgICBzZXRXcmFwcGVyOiBzZXRXcmFwcGVyLFxuICAgICAgZ2V0V3JhcHBlcjogZ2V0V3JhcHBlcixcbiAgICAgIGdldFdyYXBwZXJCeVR5cGU6IGdldFdyYXBwZXJCeVR5cGUsXG4gICAgICByZW1vdmVXcmFwcGVyQnlOYW1lOiByZW1vdmVXcmFwcGVyQnlOYW1lLFxuICAgICAgcmVtb3ZlV3JhcHBlcnNGb3JUeXBlOiByZW1vdmVXcmFwcGVyc0ZvclR5cGUsXG4gICAgICBkaXNhYmxlV2FybmluZ3M6IGZhbHNlLFxuICAgICAgZXh0cmFzOiB7XG4gICAgICAgIGRpc2FibGVOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcjogZmFsc2VcbiAgICAgIH0sXG4gICAgICB0ZW1wbGF0ZU1hbmlwdWxhdG9yczoge1xuICAgICAgICBwcmVXcmFwcGVyOiBbXSxcbiAgICAgICAgcG9zdFdyYXBwZXI6IFtdXG4gICAgICB9LFxuICAgICAgJGdldDogZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gX3RoaXMyO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gc2V0VHlwZShvcHRpb25zKSB7XG4gICAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChvcHRpb25zLCBzZXRUeXBlKTtcbiAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICBjaGVja1R5cGUob3B0aW9ucyk7XG4gICAgICAgIGlmIChvcHRpb25zW1wiZXh0ZW5kc1wiXSkge1xuICAgICAgICAgIGV4dGVuZFR5cGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHR5cGVNYXBbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBnZXRFcnJvcihcIllvdSBtdXN0IHByb3ZpZGUgYW4gb2JqZWN0IG9yIGFycmF5IGZvciBzZXRUeXBlLiBZb3UgcHJvdmlkZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKG9wdGlvbnMpIHtcbiAgICAgIGlmICghb3B0aW9ucy5uYW1lKSB7XG4gICAgICAgIHRocm93IGdldEVycm9yKFwiWW91IG11c3QgcHJvdmlkZSBhIG5hbWUgZm9yIHNldFR5cGUuIFlvdSBwcm92aWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeShhcmd1bWVudHMpKTtcbiAgICAgIH0gZWxzZSBpZiAoIW9wdGlvbnMuZGVmYXVsdE9wdGlvbnMgJiYgIW9wdGlvbnMudGVtcGxhdGUgJiYgIW9wdGlvbnMudGVtcGxhdGVVcmwgJiYgIW9wdGlvbnNbXCJleHRlbmRzXCJdKSB7XG4gICAgICAgIHRocm93IGdldEVycm9yKFwiWW91IG11c3QgcHJvdmlkZSBkZWZhdWx0T3B0aW9ucywgZXh0ZW5kcyBPUiBhIHRlbXBsYXRlIE9SIHRlbXBsYXRlVXJsIGZvciBzZXRUeXBlLiBcIiArIChcIllvdSBwcm92aWRlZCBub25lIG9mIHRoZXNlOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50cykpKTtcbiAgICAgIH0gZWxzZSBpZiAob3B0aW9ucy50ZW1wbGF0ZSAmJiBvcHRpb25zLnRlbXBsYXRlVXJsKSB7XG4gICAgICAgIHRocm93IGdldEVycm9yKFwiWW91IG11c3QgcHJvdmlkZSBhdCBtb3N0IGEgdGVtcGxhdGUgT1IgdGVtcGxhdGVVcmwgZm9yIHNldFR5cGUuIFwiICsgKFwiWW91IHByb3ZpZGVkIGJvdGg6IFwiICsgSlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzKSkpO1xuICAgICAgfVxuICAgICAgaWYgKCFvcHRpb25zLm92ZXJ3cml0ZU9rKSB7XG4gICAgICAgIGNoZWNrT3ZlcndyaXRlKG9wdGlvbnMubmFtZSwgdHlwZU1hcCwgb3B0aW9ucywgXCJ0eXBlc1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLm92ZXJ3cml0ZU9rO1xuICAgICAgfVxuICAgICAgZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuY2hlY2tBbGxvd2VkUHJvcGVydGllcyhhbGxvd2VkVHlwZVByb3BlcnRpZXMsIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZFR5cGVPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgIHZhciBleHRlbmRzVHlwZSA9IGdldFR5cGUob3B0aW9uc1tcImV4dGVuZHNcIl0sIHRydWUsIG9wdGlvbnMpO1xuICAgICAgZXh0ZW5kVHlwZUNvbnRyb2xsZXJGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgICBleHRlbmRUeXBlTGlua0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICAgIGV4dGVuZFR5cGVEZWZhdWx0T3B0aW9ucyhvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmRUeXBlQ29udHJvbGxlckZ1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgICB2YXIgZXh0ZW5kc0N0cmwgPSBleHRlbmRzVHlwZS5jb250cm9sbGVyO1xuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzQ3RybCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIG9wdGlvbnNDdHJsID0gb3B0aW9ucy5jb250cm9sbGVyO1xuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnNDdHJsKSkge1xuICAgICAgICBvcHRpb25zLmNvbnRyb2xsZXIgPSBmdW5jdGlvbiAoJHNjb3BlLCAkY29udHJvbGxlcikge1xuICAgICAgICAgICRjb250cm9sbGVyKGV4dGVuZHNDdHJsLCB7ICRzY29wZTogJHNjb3BlIH0pO1xuICAgICAgICAgICRjb250cm9sbGVyKG9wdGlvbnNDdHJsLCB7ICRzY29wZTogJHNjb3BlIH0pO1xuICAgICAgICB9O1xuICAgICAgICBvcHRpb25zLmNvbnRyb2xsZXIuJGluamVjdCA9IFtcIiRzY29wZVwiLCBcIiRjb250cm9sbGVyXCJdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3B0aW9ucy5jb250cm9sbGVyID0gZXh0ZW5kc0N0cmw7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kVHlwZUxpbmtGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgICAgdmFyIGV4dGVuZHNGbiA9IGV4dGVuZHNUeXBlLmxpbms7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNGbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIG9wdGlvbnNGbiA9IG9wdGlvbnMubGluaztcbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zRm4pKSB7XG4gICAgICAgIG9wdGlvbnMubGluayA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICBleHRlbmRzRm4uYXBwbHkodW5kZWZpbmVkLCBhcmd1bWVudHMpO1xuICAgICAgICAgIG9wdGlvbnNGbi5hcHBseSh1bmRlZmluZWQsIGFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLmxpbmsgPSBleHRlbmRzRm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kVHlwZURlZmF1bHRPcHRpb25zKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgICB2YXIgZXh0ZW5kc0RPID0gZXh0ZW5kc1R5cGUuZGVmYXVsdE9wdGlvbnM7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNETykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIG9wdGlvbnNETyA9IG9wdGlvbnMuZGVmYXVsdE9wdGlvbnM7XG4gICAgICB2YXIgb3B0aW9uc0RPSXNGbiA9IGFuZ3VsYXIuaXNGdW5jdGlvbihvcHRpb25zRE8pO1xuICAgICAgdmFyIGV4dGVuZHNET0lzRm4gPSBhbmd1bGFyLmlzRnVuY3Rpb24oZXh0ZW5kc0RPKTtcbiAgICAgIGlmIChleHRlbmRzRE9Jc0ZuKSB7XG4gICAgICAgIG9wdGlvbnMuZGVmYXVsdE9wdGlvbnMgPSBmdW5jdGlvbiBkZWZhdWx0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgICAgdmFyIGV4dGVuZHNEZWZhdWx0T3B0aW9ucyA9IGV4dGVuZHNETyhvcHRpb25zKTtcbiAgICAgICAgICBpZiAob3B0aW9uc0RPSXNGbikge1xuICAgICAgICAgICAgcmV0dXJuIG9wdGlvbnNETyhleHRlbmRzRGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICB1dGlscy5yZXZlcnNlRGVlcE1lcmdlKGV4dGVuZHNEZWZhdWx0T3B0aW9ucywgb3B0aW9uc0RPKTtcbiAgICAgICAgICAgIHJldHVybiBleHRlbmRzRGVmYXVsdE9wdGlvbnM7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zRE9Jc0ZuKSB7XG4gICAgICAgIG9wdGlvbnMuZGVmYXVsdE9wdGlvbnMgPSBmdW5jdGlvbiBkZWZhdWx0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgICAgdmFyIG5ld0RlZmF1bHRPcHRpb25zID0ge307XG4gICAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShuZXdEZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgZXh0ZW5kc0RPKTtcbiAgICAgICAgICByZXR1cm4gb3B0aW9uc0RPKG5ld0RlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUeXBlKG5hbWUsIHRocm93RXJyb3IsIGVycm9yQ29udGV4dCkge1xuICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICB2YXIgdHlwZSA9IHR5cGVNYXBbbmFtZV07XG4gICAgICBpZiAoIXR5cGUgJiYgdGhyb3dFcnJvciA9PT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBnZXRFcnJvcihcIlRoZXJlIGlzIG5vIHR5cGUgYnkgdGhlIG5hbWUgb2YgXFxcIlwiICsgbmFtZSArIFwiXFxcIjogXCIgKyBKU09OLnN0cmluZ2lmeShlcnJvckNvbnRleHQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFdyYXBwZXIob3B0aW9ucywgbmFtZSkge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5tYXAoZnVuY3Rpb24gKHdyYXBwZXJPcHRpb25zKSB7XG4gICAgICAgICAgcmV0dXJuIHNldFdyYXBwZXIod3JhcHBlck9wdGlvbnMpO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc09iamVjdChvcHRpb25zKSkge1xuICAgICAgICBvcHRpb25zLnR5cGVzID0gZ2V0T3B0aW9uc1R5cGVzKG9wdGlvbnMpO1xuICAgICAgICBvcHRpb25zLm5hbWUgPSBnZXRPcHRpb25zTmFtZShvcHRpb25zLCBuYW1lKTtcbiAgICAgICAgY2hlY2tXcmFwcGVyQVBJKG9wdGlvbnMpO1xuICAgICAgICB0ZW1wbGF0ZVdyYXBwZXJzTWFwW29wdGlvbnMubmFtZV0gPSBvcHRpb25zO1xuICAgICAgICByZXR1cm4gb3B0aW9ucztcbiAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc1N0cmluZyhvcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gc2V0V3JhcHBlcih7XG4gICAgICAgICAgdGVtcGxhdGU6IG9wdGlvbnMsXG4gICAgICAgICAgbmFtZTogbmFtZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRPcHRpb25zVHlwZXMob3B0aW9ucykge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcob3B0aW9ucy50eXBlcykpIHtcbiAgICAgICAgcmV0dXJuIFtvcHRpb25zLnR5cGVzXTtcbiAgICAgIH1cbiAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy50eXBlcykpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMudHlwZXM7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T3B0aW9uc05hbWUob3B0aW9ucywgbmFtZSkge1xuICAgICAgcmV0dXJuIG9wdGlvbnMubmFtZSB8fCBuYW1lIHx8IG9wdGlvbnMudHlwZXMuam9pbihcIiBcIikgfHwgZGVmYXVsdFdyYXBwZXJOYW1lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrV3JhcHBlckFQSShvcHRpb25zKSB7XG4gICAgICBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5jaGVja1dyYXBwZXIob3B0aW9ucyk7XG4gICAgICBpZiAob3B0aW9ucy50ZW1wbGF0ZSkge1xuICAgICAgICBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5jaGVja1dyYXBwZXJUZW1wbGF0ZShvcHRpb25zLnRlbXBsYXRlLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGlmICghb3B0aW9ucy5vdmVyd3JpdGVPaykge1xuICAgICAgICBjaGVja092ZXJ3cml0ZShvcHRpb25zLm5hbWUsIHRlbXBsYXRlV3JhcHBlcnNNYXAsIG9wdGlvbnMsIFwidGVtcGxhdGVXcmFwcGVyc1wiKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRlbGV0ZSBvcHRpb25zLm92ZXJ3cml0ZU9rO1xuICAgICAgfVxuICAgICAgY2hlY2tXcmFwcGVyVHlwZXMob3B0aW9ucyk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyVHlwZXMob3B0aW9ucykge1xuICAgICAgdmFyIHNob3VsZFRocm93ID0gIWFuZ3VsYXIuaXNBcnJheShvcHRpb25zLnR5cGVzKSB8fCAhb3B0aW9ucy50eXBlcy5ldmVyeShhbmd1bGFyLmlzU3RyaW5nKTtcbiAgICAgIGlmIChzaG91bGRUaHJvdykge1xuICAgICAgICB0aHJvdyBnZXRFcnJvcihcIkF0dGVtcHRlZCB0byBjcmVhdGUgYSB0ZW1wbGF0ZSB3cmFwcGVyIHdpdGggdHlwZXMgdGhhdCBpcyBub3QgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5nc1wiKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja092ZXJ3cml0ZShwcm9wZXJ0eSwgb2JqZWN0LCBuZXdWYWx1ZSwgb2JqZWN0TmFtZSkge1xuICAgICAgaWYgKG9iamVjdC5oYXNPd25Qcm9wZXJ0eShwcm9wZXJ0eSkpIHtcbiAgICAgICAgd2FybihbXCJBdHRlbXB0aW5nIHRvIG92ZXJ3cml0ZSBcIiArIHByb3BlcnR5ICsgXCIgb24gXCIgKyBvYmplY3ROYW1lICsgXCIgd2hpY2ggaXMgY3VycmVudGx5XCIsIFwiXCIgKyBKU09OLnN0cmluZ2lmeShvYmplY3RbcHJvcGVydHldKSArIFwiIHdpdGggXCIgKyBKU09OLnN0cmluZ2lmeShuZXdWYWx1ZSksIFwiVG8gc3VwcmVzcyB0aGlzIHdhcm5pbmcsIHNwZWNpZnkgdGhlIHByb3BlcnR5IFxcXCJvdmVyd3JpdGVPazogdHJ1ZVxcXCJcIl0uam9pbihcIiBcIikpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdyYXBwZXIobmFtZSkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZSB8fCBkZWZhdWx0V3JhcHBlck5hbWVdO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdyYXBwZXJCeVR5cGUodHlwZSkge1xuICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgdmFyIHdyYXBwZXJzID0gW107XG4gICAgICBmb3IgKHZhciBuYW1lIGluIHRlbXBsYXRlV3JhcHBlcnNNYXApIHtcbiAgICAgICAgaWYgKHRlbXBsYXRlV3JhcHBlcnNNYXAuaGFzT3duUHJvcGVydHkobmFtZSkpIHtcbiAgICAgICAgICBpZiAodGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXS50eXBlcyAmJiB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdLnR5cGVzLmluZGV4T2YodHlwZSkgIT09IC0xKSB7XG4gICAgICAgICAgICB3cmFwcGVycy5wdXNoKHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgcmV0dXJuIHdyYXBwZXJzO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVdyYXBwZXJCeU5hbWUobmFtZSkge1xuICAgICAgdmFyIHdyYXBwZXIgPSB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdO1xuICAgICAgZGVsZXRlIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV07XG4gICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVXcmFwcGVyc0ZvclR5cGUodHlwZSkge1xuICAgICAgdmFyIHdyYXBwZXJzID0gZ2V0V3JhcHBlckJ5VHlwZSh0eXBlKTtcbiAgICAgIGlmICghd3JhcHBlcnMpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkod3JhcHBlcnMpKSB7XG4gICAgICAgIHJldHVybiByZW1vdmVXcmFwcGVyQnlOYW1lKHdyYXBwZXJzLm5hbWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3JhcHBlcnMuZm9yRWFjaChmdW5jdGlvbiAod3JhcHBlcikge1xuICAgICAgICAgIHJldHVybiByZW1vdmVXcmFwcGVyQnlOYW1lKHdyYXBwZXIubmFtZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gd3JhcHBlcnM7XG4gICAgICB9XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB3YXJuKCkge1xuICAgICAgaWYgKCFfdGhpcy5kaXNhYmxlV2FybmluZ3MpIHtcbiAgICAgICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZvcm1seUNvbmZpZy4kaW5qZWN0ID0gW1wiZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXJcIl07XG5cblxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHJvdmlkZXJzL2Zvcm1seUNvbmZpZy5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuY29uc3RhbnQoXCJmb3JtbHlWZXJzaW9uXCIsIFZFUlNJT04pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHJvdmlkZXJzL2Zvcm1seVZlcnNpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmNvbnN0YW50KFwiZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeFwiLCBcImh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtbHktanMvYW5ndWxhci1mb3JtbHkvd2lraS9FcnJvcnMtYW5kLVdhcm5pbmdzI1wiKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Byb3ZpZGVycy9mb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5mYWN0b3J5KFwiZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzXCIsIGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzID0ge1xuICAgICAgYWRkVGVtcGxhdGVPcHRpb25WYWx1ZU1lc3NhZ2U6IGFkZFRlbXBsYXRlT3B0aW9uVmFsdWVNZXNzYWdlLFxuICAgICAgYWRkU3RyaW5nTWVzc2FnZTogYWRkU3RyaW5nTWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VzOiB7fVxuICAgIH07XG5cbiAgICByZXR1cm4gZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzO1xuXG4gICAgZnVuY3Rpb24gYWRkVGVtcGxhdGVPcHRpb25WYWx1ZU1lc3NhZ2UobmFtZSwgcHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSkge1xuICAgICAgZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLm1lc3NhZ2VzW25hbWVdID0gdGVtcGxhdGVPcHRpb25WYWx1ZShwcm9wLCBwcmVmaXgsIHN1ZmZpeCwgYWx0ZXJuYXRlKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRTdHJpbmdNZXNzYWdlKG5hbWUsIHN0cmluZykge1xuICAgICAgZm9ybWx5VmFsaWRhdGlvbk1lc3NhZ2VzLm1lc3NhZ2VzW25hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICByZXR1cm4gc3RyaW5nO1xuICAgICAgfTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHRlbXBsYXRlT3B0aW9uVmFsdWUocHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGdldFZhbGlkYXRpb25NZXNzYWdlKHZpZXdWYWx1ZSwgbW9kZWxWYWx1ZSwgc2NvcGUpIHtcbiAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zW3Byb3BdKSB7XG4gICAgICAgICAgcmV0dXJuIFwiXCIgKyBwcmVmaXggKyBcIiBcIiArIHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zW3Byb3BdICsgXCIgXCIgKyBzdWZmaXg7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmV0dXJuIGFsdGVybmF0ZTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG4gIH0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHJvdmlkZXJzL2Zvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKFwiZm9ybWx5Q3VzdG9tVmFsaWRhdGlvblwiLCBmb3JtbHlDdXN0b21WYWxpZGF0aW9uKTtcblxuICBmb3JtbHlDdXN0b21WYWxpZGF0aW9uLnRlc3RzID0gT05fVEVTVCA/IHJlcXVpcmUoXCIuL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi50ZXN0XCIpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbihmb3JtbHlVdGlsLCAkcSkge1xuICAgIHJldHVybiB7XG4gICAgICByZXF1aXJlOiBcIm5nTW9kZWxcIixcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWwsIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIHZhciB2YWxpZGF0b3JzID0gc2NvcGUuJGV2YWwoYXR0cnMuZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbik7XG4gICAgICAgIGlmICghdmFsaWRhdG9ycykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjaGVja1ZhbGlkYXRvcnModmFsaWRhdG9ycyk7XG4gICAgICAgIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlcyA9IHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlcyB8fCB7fTtcblxuXG4gICAgICAgIHZhciB1c2VOZXdWYWxpZGF0b3JzQXBpID0gY3RybC5oYXNPd25Qcm9wZXJ0eShcIiR2YWxpZGF0b3JzXCIpICYmICFhdHRycy5oYXNPd25Qcm9wZXJ0eShcInVzZVBhcnNlcnNcIik7XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3JzLCBmdW5jdGlvbiAodmFsaWRhdG9yLCBuYW1lKSB7XG4gICAgICAgICAgdmFyIG1lc3NhZ2UgPSB2YWxpZGF0b3IubWVzc2FnZTtcbiAgICAgICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICAgICAgc2NvcGUub3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzW25hbWVdID0gZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICByZXR1cm4gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCBtZXNzYWdlLCBjdHJsLiRtb2RlbFZhbHVlLCBjdHJsLiR2aWV3VmFsdWUpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFsaWRhdG9yID0gYW5ndWxhci5pc09iamVjdCh2YWxpZGF0b3IpID8gdmFsaWRhdG9yLmV4cHJlc3Npb24gOiB2YWxpZGF0b3I7XG4gICAgICAgICAgdmFyIGlzUG9zc2libHlBc3luYyA9ICFhbmd1bGFyLmlzU3RyaW5nKHZhbGlkYXRvcik7XG4gICAgICAgICAgaWYgKHVzZU5ld1ZhbGlkYXRvcnNBcGkpIHtcbiAgICAgICAgICAgIHNldHVwV2l0aFZhbGlkYXRvcnMoKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgc2V0dXBXaXRoUGFyc2VycygpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIHNldHVwV2l0aFZhbGlkYXRvcnMoKSB7XG4gICAgICAgICAgICB2YXIgdmFsaWRhdG9yQ29sbGVjdGlvbiA9IGlzUG9zc2libHlBc3luYyA/IFwiJGFzeW5jVmFsaWRhdG9yc1wiIDogXCIkdmFsaWRhdG9yc1wiO1xuICAgICAgICAgICAgY3RybFt2YWxpZGF0b3JDb2xsZWN0aW9uXVtuYW1lXSA9IGZ1bmN0aW9uIChtb2RlbFZhbHVlLCB2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCB2YWxpZGF0b3IsIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChpc1Bvc3NpYmx5QXN5bmMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNQcm9taXNlTGlrZSh2YWx1ZSkgPyB2YWx1ZSA6IHZhbHVlID8gJHEud2hlbih2YWx1ZSkgOiAkcS5yZWplY3QodmFsdWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBzZXR1cFdpdGhQYXJzZXJzKCkge1xuICAgICAgICAgICAgdmFyIGluRmxpZ2h0VmFsaWRhdG9yID0gdW5kZWZpbmVkO1xuICAgICAgICAgICAgY3RybC4kcGFyc2Vycy51bnNoaWZ0KGZ1bmN0aW9uICh2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIHZhbGlkYXRvciwgY3RybC4kbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKGlzUHJvbWlzZUxpa2UoaXNWYWxpZCkpIHtcbiAgICAgICAgICAgICAgICBjdHJsLiRwZW5kaW5nID0gY3RybC4kcGVuZGluZyB8fCB7fTtcbiAgICAgICAgICAgICAgICBjdHJsLiRwZW5kaW5nW25hbWVdID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBpbkZsaWdodFZhbGlkYXRvciA9IGlzVmFsaWQ7XG4gICAgICAgICAgICAgICAgaXNWYWxpZC50aGVuKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChpbkZsaWdodFZhbGlkYXRvciA9PT0gaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShuYW1lLCB0cnVlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChpbkZsaWdodFZhbGlkYXRvciA9PT0gaXNWYWxpZCkge1xuICAgICAgICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShuYW1lLCBmYWxzZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSlbXCJmaW5hbGx5XCJdKGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhjdHJsLiRwZW5kaW5nKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGN0cmwuJHBlbmRpbmc7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY3RybC4kcGVuZGluZ1tuYW1lXTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShuYW1lLCBpc1ZhbGlkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdmlld1ZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaXNQcm9taXNlTGlrZShvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgYW5ndWxhci5pc0Z1bmN0aW9uKG9iai50aGVuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1ZhbGlkYXRvcnModmFsaWRhdG9ycykge1xuICAgICAgdmFyIGFsbG93ZWRQcm9wZXJ0aWVzID0gW1wiZXhwcmVzc2lvblwiLCBcIm1lc3NhZ2VcIl07XG4gICAgICB2YXIgdmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzID0ge307XG4gICAgICBhbmd1bGFyLmZvckVhY2godmFsaWRhdG9ycywgZnVuY3Rpb24gKHZhbGlkYXRvciwgbmFtZSkge1xuICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyh2YWxpZGF0b3IpKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHZhciBleHRyYVByb3BzID0gW107XG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3IsIGZ1bmN0aW9uICh2LCBrZXkpIHtcbiAgICAgICAgICBpZiAoYWxsb3dlZFByb3BlcnRpZXMuaW5kZXhPZihrZXkpID09PSAtMSkge1xuICAgICAgICAgICAgZXh0cmFQcm9wcy5wdXNoKGtleSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgICAgaWYgKGV4dHJhUHJvcHMubGVuZ3RoKSB7XG4gICAgICAgICAgdmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzW25hbWVdID0gZXh0cmFQcm9wcztcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBpZiAoT2JqZWN0LmtleXModmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzKS5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFtcIlZhbGlkYXRvcnMgYXJlIG9ubHkgYWxsb3dlZCB0byBiZSBmdW5jdGlvbnMgb3Igb2JqZWN0cyB0aGF0IGhhdmUgXCIgKyBhbGxvd2VkUHJvcGVydGllcy5qb2luKFwiLCBcIikgKyBcIi5cIiwgXCJZb3UgcHJvdmlkZWQgc29tZSBleHRyYSBwcm9wZXJ0aWVzOiBcIiArIEpTT04uc3RyaW5naWZ5KHZhbGlkYXRvcnNXaXRoRXh0cmFQcm9wcyldLmpvaW4oXCIgXCIpKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbi4kaW5qZWN0ID0gW1wiZm9ybWx5VXRpbFwiLCBcIiRxXCJdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGlyZWN0aXZlcy9mb3JtbHktY3VzdG9tLXZhbGlkYXRpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5kaXJlY3RpdmUoXCJmb3JtbHlGaWVsZFwiLCBmb3JtbHlGaWVsZCk7XG5cbiAgZm9ybWx5RmllbGQudGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZShcIi4vZm9ybWx5LWZpZWxkLnRlc3RcIikobmdNb2R1bGUpIDogbnVsbDtcblxuICBmdW5jdGlvbiBmb3JtbHlGaWVsZCgkaHR0cCwgJHEsICRjb21waWxlLCAkdGVtcGxhdGVDYWNoZSwgZm9ybWx5Q29uZmlnLCBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMsIGZvcm1seVV0aWwsIGZvcm1seVVzYWJpbGl0eSwgZm9ybWx5V2Fybikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogXCJBRVwiLFxuICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIG9wdGlvbnM6IFwiPVwiLFxuICAgICAgICBtb2RlbDogXCI9XCIsXG4gICAgICAgIGZvcm1JZDogXCI9P1wiLFxuICAgICAgICBpbmRleDogXCI9P1wiLFxuICAgICAgICBmaWVsZHM6IFwiPT9cIixcbiAgICAgICAgZm9ybTogXCI9P1wiXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogW1wiJHNjb3BlXCIsIFwiJHRpbWVvdXRcIiwgXCIkcGFyc2VcIiwgXCIkY29udHJvbGxlclwiLCBmdW5jdGlvbiBmaWVsZENvbnRyb2xsZXIoJHNjb3BlLCAkdGltZW91dCwgJHBhcnNlLCAkY29udHJvbGxlcikge1xuICAgICAgICB2YXIgb3B0cyA9ICRzY29wZS5vcHRpb25zO1xuICAgICAgICB2YXIgZmllbGRUeXBlID0gb3B0cy50eXBlICYmIGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdHMudHlwZSk7XG4gICAgICAgIHNpbXBsaWZ5TGlmZShvcHRzKTtcbiAgICAgICAgbWVyZ2VGaWVsZE9wdGlvbnNXaXRoVHlwZURlZmF1bHRzKG9wdHMsIGZpZWxkVHlwZSk7XG4gICAgICAgIGFwaUNoZWNrKG9wdHMpO1xuICAgICAgICAvLyBzZXQgZmllbGQgaWQgdG8gbGluayBsYWJlbHMgYW5kIGZpZWxkc1xuICAgICAgICAkc2NvcGUuaWQgPSBmb3JtbHlVdGlsLmdldEZpZWxkSWQoJHNjb3BlLmZvcm1JZCwgb3B0cywgJHNjb3BlLmluZGV4KTtcblxuICAgICAgICAvLyBpbml0YWxpemF0aW9uXG4gICAgICAgIGV4dGVuZE9wdGlvbnNXaXRoRGVmYXVsdHMob3B0cywgJHNjb3BlLmluZGV4KTtcbiAgICAgICAgcnVuRXhwcmVzc2lvbnMoKTtcbiAgICAgICAgc2V0Rm9ybUNvbnRyb2woJHNjb3BlLCBvcHRzKTtcbiAgICAgICAgYWRkTW9kZWxXYXRjaGVyKCRzY29wZSwgb3B0cyk7XG4gICAgICAgIGFkZFNob3dNZXNzYWdlc1dhdGNoZXIoJHNjb3BlLCBvcHRzKTtcbiAgICAgICAgYWRkVmFsaWRhdGlvbk1lc3NhZ2VzKG9wdHMpO1xuICAgICAgICAvLyBzaW1wbGlmeSB0aGluZ3NcbiAgICAgICAgLy8gY3JlYXRlICRzY29wZS50byBzbyB0ZW1wbGF0ZSBhdXRob3JzIGNhbiByZWZlcmVuY2UgdG8gaW5zdGVhZCBvZiAkc2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNcbiAgICAgICAgJHNjb3BlLnRvID0gJHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zO1xuICAgICAgICBpbnZva2VDb250cm9sbGVycygkc2NvcGUsIG9wdHMsIGZpZWxkVHlwZSk7XG5cbiAgICAgICAgLy8gZnVuY3Rpb24gZGVmaW5pdGlvbnNcbiAgICAgICAgZnVuY3Rpb24gcnVuRXhwcmVzc2lvbnMoKSB7XG4gICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgLy8gbXVzdCBydW4gb24gbmV4dCB0aWNrIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBjdXJyZW50IHZhbHVlIGlzIGNvcnJlY3QuXG4gICAgICAgICAgICB2YXIgZmllbGQgPSAkc2NvcGUub3B0aW9ucztcbiAgICAgICAgICAgIHZhciBjdXJyZW50VmFsdWUgPSB2YWx1ZUdldHRlclNldHRlcigpO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGZpZWxkLmV4cHJlc3Npb25Qcm9wZXJ0aWVzLCBmdW5jdGlvbiBydW5FeHByZXNzaW9uKGV4cHJlc3Npb24sIHByb3ApIHtcbiAgICAgICAgICAgICAgdmFyIHNldHRlciA9ICRwYXJzZShwcm9wKS5hc3NpZ247XG4gICAgICAgICAgICAgIHZhciBwcm9taXNlID0gJHEud2hlbihmb3JtbHlVdGlsLmZvcm1seUV2YWwoJHNjb3BlLCBleHByZXNzaW9uLCBjdXJyZW50VmFsdWUpKTtcbiAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICAgIHNldHRlcihmaWVsZCwgdmFsdWUpO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdmFsdWVHZXR0ZXJTZXR0ZXIobmV3VmFsKSB7XG4gICAgICAgICAgaWYgKCEkc2NvcGUubW9kZWwgfHwgISRzY29wZS5vcHRpb25zLmtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQobmV3VmFsKSkge1xuICAgICAgICAgICAgJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV0gPSBuZXdWYWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNpbXBsaWZ5TGlmZShvcHRpb25zKSB7XG4gICAgICAgICAgLy8gYWRkIGEgZmV3IGVtcHR5IG9iamVjdHMgKGlmIHRoZXkgZG9uJ3QgYWxyZWFkeSBleGlzdCkgc28geW91IGRvbid0IGhhdmUgdG8gdW5kZWZpbmVkIGNoZWNrIGV2ZXJ5d2hlcmVcbiAgICAgICAgICBmb3JtbHlVdGlsLnJldmVyc2VEZWVwTWVyZ2Uob3B0aW9ucywge1xuICAgICAgICAgICAgZGF0YToge30sXG4gICAgICAgICAgICB0ZW1wbGF0ZU9wdGlvbnM6IHt9LFxuICAgICAgICAgICAgdmFsaWRhdGlvbjoge31cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1lcmdlRmllbGRPcHRpb25zV2l0aFR5cGVEZWZhdWx0cyhvcHRpb25zLCB0eXBlKSB7XG4gICAgICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgICAgIG1lcmdlT3B0aW9ucyhvcHRpb25zLCB0eXBlLmRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdmFyIHByb3Blck9yZGVyID0gYXJyYXlpZnkob3B0aW9ucy5vcHRpb25zVHlwZXMpLnJldmVyc2UoKTsgLy8gc28gdGhlIHJpZ2h0IHRoaW5ncyBhcmUgb3ZlcnJpZGRlblxuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChwcm9wZXJPcmRlciwgZnVuY3Rpb24gKHR5cGVOYW1lKSB7XG4gICAgICAgICAgICBtZXJnZU9wdGlvbnMob3B0aW9ucywgZm9ybWx5Q29uZmlnLmdldFR5cGUodHlwZU5hbWUsIHRydWUsIG9wdGlvbnMpLmRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1lcmdlT3B0aW9ucyhvcHRpb25zLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAoZXh0cmFPcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGV4dHJhT3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgZXh0cmFPcHRpb25zID0gZXh0cmFPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9ybWx5VXRpbC5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIGV4dHJhT3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZXh0ZW5kT3B0aW9uc1dpdGhEZWZhdWx0cyhvcHRpb25zLCBpbmRleCkge1xuICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKG9wdGlvbnMsIHtcbiAgICAgICAgICAgIC8vIGF0dGFjaCB0aGUga2V5IGluIGNhc2UgdGhlIGZvcm1seS1maWVsZCBkaXJlY3RpdmUgaXMgdXNlZCBkaXJlY3RseVxuICAgICAgICAgICAga2V5OiBvcHRpb25zLmtleSB8fCBpbmRleCB8fCAwLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlR2V0dGVyU2V0dGVyLFxuICAgICAgICAgICAgcnVuRXhwcmVzc2lvbnM6IHJ1bkV4cHJlc3Npb25zXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbml0aWFsaXphdGlvbiBmdW5jdGlvbnNcbiAgICAgICAgZnVuY3Rpb24gc2V0Rm9ybUNvbnRyb2woc2NvcGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5ub0Zvcm1Db250cm9sKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBzdG9wV2FpdGluZ0ZvckRlc3Ryb3k7XG4gICAgICAgICAgdmFyIG1heFRpbWUgPSAyMDAwO1xuICAgICAgICAgIHZhciBpbnRlcnZhbFRpbWUgPSA1O1xuICAgICAgICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICAgICAgICB2YXIgaW50ZXJ2YWwgPSBzZXRJbnRlcnZhbChmdW5jdGlvbiAoKSB7XG4gICAgICAgICAgICBpdGVyYXRpb25zKys7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMua2V5KSkge1xuICAgICAgICAgICAgICByZXR1cm4gY2xlYW5VcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIGZvcm1Db250cm9sID0gc2NvcGUuZm9ybSAmJiBzY29wZS5mb3JtW3Njb3BlLmlkXTtcbiAgICAgICAgICAgIGlmIChmb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgICBvcHRpb25zLmZvcm1Db250cm9sID0gZm9ybUNvbnRyb2w7XG4gICAgICAgICAgICAgIHNjb3BlLmZjID0gZm9ybUNvbnRyb2w7XG4gICAgICAgICAgICAgIGNsZWFuVXAoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW50ZXJ2YWxUaW1lICogaXRlcmF0aW9ucyA+IG1heFRpbWUpIHtcbiAgICAgICAgICAgICAgZm9ybWx5V2FybihcImNvdWxkbnQtc2V0LXRoZS1mb3JtY29udHJvbC1hZnRlci10aW1lbXNcIiwgXCJDb3VsZG4ndCBzZXQgdGhlIGZvcm1Db250cm9sIGFmdGVyIFwiICsgbWF4VGltZSArIFwibXNcIiwgc2NvcGUpO1xuICAgICAgICAgICAgICBjbGVhblVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSwgaW50ZXJ2YWxUaW1lKTtcbiAgICAgICAgICBzdG9wV2FpdGluZ0ZvckRlc3Ryb3kgPSBzY29wZS4kb24oXCIkZGVzdHJveVwiLCBjbGVhblVwKTtcblxuICAgICAgICAgIGZ1bmN0aW9uIGNsZWFuVXAoKSB7XG4gICAgICAgICAgICBzdG9wV2FpdGluZ0ZvckRlc3Ryb3koKTtcbiAgICAgICAgICAgIGNsZWFySW50ZXJ2YWwoaW50ZXJ2YWwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZE1vZGVsV2F0Y2hlcihzY29wZSwgb3B0aW9ucykge1xuICAgICAgICAgIGlmIChvcHRpb25zLm1vZGVsKSB7XG4gICAgICAgICAgICBzY29wZS4kd2F0Y2goXCJvcHRpb25zLm1vZGVsXCIsIHJ1bkV4cHJlc3Npb25zLCB0cnVlKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRTaG93TWVzc2FnZXNXYXRjaGVyKHNjb3BlLCBvcHRpb25zKSB7XG4gICAgICAgICAgdmFyIGV4cHJlc3Npb24gPSBcIm9wdGlvbnMuZm9ybUNvbnRyb2wuJGludmFsaWQgJiYgKG9wdGlvbnMuZm9ybUNvbnRyb2wuJHRvdWNoZWQgfHwgb3B0aW9ucy52YWxpZGF0aW9uLnNob3cpXCI7XG4gICAgICAgICAgc2NvcGUuJHdhdGNoKGV4cHJlc3Npb24sIGZ1bmN0aW9uIChzaG93KSB7XG4gICAgICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24uZXJyb3JFeGlzdHNBbmRTaG91bGRCZVZpc2libGUgPSBzaG93O1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkVmFsaWRhdGlvbk1lc3NhZ2VzKG9wdGlvbnMpIHtcbiAgICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgPSBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgfHwge307XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlcywgZnVuY3Rpb24gKGV4cHJlc3Npb24sIG5hbWUpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzW25hbWVdKSB7XG4gICAgICAgICAgICAgIG9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlc1tuYW1lXSA9IGZ1bmN0aW9uICh2aWV3VmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgZXhwcmVzc2lvbiwgbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGludm9rZUNvbnRyb2xsZXJzKHNjb3BlKSB7XG4gICAgICAgICAgdmFyIG9wdGlvbnMgPSBhcmd1bWVudHNbMV0gPT09IHVuZGVmaW5lZCA/IHt9IDogYXJndW1lbnRzWzFdO1xuICAgICAgICAgIHZhciB0eXBlID0gYXJndW1lbnRzWzJdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1syXTtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goW3R5cGUuY29udHJvbGxlciwgb3B0aW9ucy5jb250cm9sbGVyXSwgZnVuY3Rpb24gKGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAgIGlmIChjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICRjb250cm9sbGVyKGNvbnRyb2xsZXIsIHsgJHNjb3BlOiBzY29wZSB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfV0sXG4gICAgICBsaW5rOiBmdW5jdGlvbiBmaWVsZExpbmsoc2NvcGUsIGVsKSB7XG4gICAgICAgIHZhciB0eXBlID0gc2NvcGUub3B0aW9ucy50eXBlICYmIGZvcm1seUNvbmZpZy5nZXRUeXBlKHNjb3BlLm9wdGlvbnMudHlwZSk7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICB2YXIgdGh1c2x5ID0gdGhpcztcbiAgICAgICAgZ2V0RmllbGRUZW1wbGF0ZShzY29wZS5vcHRpb25zKS50aGVuKHJ1bk1hbmlwdWxhdG9ycyhmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlcikpLnRoZW4odHJhbnNjbHVkZUluV3JhcHBlcnMoc2NvcGUub3B0aW9ucykpLnRoZW4ocnVuTWFuaXB1bGF0b3JzKGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wb3N0V3JhcHBlcikpLnRoZW4oc2V0RWxlbWVudFRlbXBsYXRlKVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIGZvcm1seVdhcm4oXCJ0aGVyZS13YXMtYS1wcm9ibGVtLXNldHRpbmctdGhlLXRlbXBsYXRlLWZvci10aGlzLWZpZWxkXCIsIFwiVGhlcmUgd2FzIGEgcHJvYmxlbSBzZXR0aW5nIHRoZSB0ZW1wbGF0ZSBmb3IgdGhpcyBmaWVsZCBcIiwgc2NvcGUub3B0aW9ucywgZXJyb3IpO1xuICAgICAgICB9KTtcblxuICAgICAgICBmdW5jdGlvbiBzZXRFbGVtZW50VGVtcGxhdGUodGVtcGxhdGVFbCkge1xuICAgICAgICAgIGVsLmh0bWwoYXNIdG1sKHRlbXBsYXRlRWwpKTtcbiAgICAgICAgICAkY29tcGlsZShlbC5jb250ZW50cygpKShzY29wZSk7XG4gICAgICAgICAgaWYgKHR5cGUgJiYgdHlwZS5saW5rKSB7XG4gICAgICAgICAgICB0eXBlLmxpbmsuYXBwbHkodGh1c2x5LCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMubGluaykge1xuICAgICAgICAgICAgc2NvcGUub3B0aW9ucy5saW5rLmFwcGx5KHRodXNseSwgYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gcnVuTWFuaXB1bGF0b3JzKG1hbmlwdWxhdG9ycykge1xuICAgICAgICAgIHJldHVybiBmdW5jdGlvbiBydW5NYW5pcHVsYXRvcnNPblRlbXBsYXRlKHRlbXBsYXRlKSB7XG4gICAgICAgICAgICB2YXIgY2hhaW4gPSAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChtYW5pcHVsYXRvcnMsIGZ1bmN0aW9uIChtYW5pcHVsYXRvcikge1xuICAgICAgICAgICAgICBjaGFpbiA9IGNoYWluLnRoZW4oZnVuY3Rpb24gKHRlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuICRxLndoZW4obWFuaXB1bGF0b3IodGVtcGxhdGUsIHNjb3BlLm9wdGlvbnMsIHNjb3BlKSkudGhlbihmdW5jdGlvbiAobmV3VGVtcGxhdGUpIHtcbiAgICAgICAgICAgICAgICAgIHJldHVybiBhbmd1bGFyLmlzU3RyaW5nKG5ld1RlbXBsYXRlKSA/IG5ld1RlbXBsYXRlIDogYXNIdG1sKG5ld1RlbXBsYXRlKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBjaGFpbjtcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGFzSHRtbChlbCkge1xuICAgICAgdmFyIHdyYXBwZXIgPSBhbmd1bGFyLmVsZW1lbnQoXCI8YT48L2E+XCIpO1xuICAgICAgcmV0dXJuIHdyYXBwZXIuYXBwZW5kKGVsKS5odG1sKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RmllbGRUZW1wbGF0ZShvcHRpb25zKSB7XG4gICAgICB2YXIgdHlwZSA9IGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSwgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgICB2YXIgdGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlIHx8IHR5cGUgJiYgdHlwZS50ZW1wbGF0ZTtcbiAgICAgIHZhciB0ZW1wbGF0ZVVybCA9IG9wdGlvbnMudGVtcGxhdGVVcmwgfHwgdHlwZSAmJiB0eXBlLnRlbXBsYXRlVXJsO1xuICAgICAgaWYgKCF0ZW1wbGF0ZSAmJiAhdGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXCJ0ZW1wbGF0ZS10eXBlLXR5cGUtbm90LXN1cHBvcnRlZFwiLCBcInRlbXBsYXRlIHR5cGUgJ1wiICsgb3B0aW9ucy50eXBlICsgXCInIG5vdCBzdXBwb3J0ZWQuIE9uIGVsZW1lbnQ6XCIsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldFRlbXBsYXRlKHRlbXBsYXRlIHx8IHRlbXBsYXRlVXJsLCAhdGVtcGxhdGUpO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gZ2V0VGVtcGxhdGUodGVtcGxhdGUsIGlzVXJsKSB7XG4gICAgICBpZiAoIWlzVXJsKSB7XG4gICAgICAgIHJldHVybiAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHZhciBodHRwT3B0aW9ucyA9IHsgY2FjaGU6ICR0ZW1wbGF0ZUNhY2hlIH07XG4gICAgICAgIHJldHVybiAkaHR0cC5nZXQodGVtcGxhdGUsIGh0dHBPcHRpb25zKS50aGVuKGZ1bmN0aW9uIChyZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIGZvcm1seVdhcm4oXCJwcm9ibGVtLWxvYWRpbmctdGVtcGxhdGUtZm9yLXRlbXBsYXRldXJsXCIsIFwiUHJvYmxlbSBsb2FkaW5nIHRlbXBsYXRlIGZvciBcIiArIHRlbXBsYXRlLCBlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zY2x1ZGVJbldyYXBwZXJzKG9wdGlvbnMpIHtcbiAgICAgIHZhciB3cmFwcGVyID0gZ2V0V3JhcHBlck9wdGlvbihvcHRpb25zKTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRyYW5zY2x1ZGVUZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgICBpZiAoIXdyYXBwZXIubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuICRxLndoZW4odGVtcGxhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgd3JhcHBlci5mb3JFYWNoKGZvcm1seVVzYWJpbGl0eS5jaGVja1dyYXBwZXIpO1xuICAgICAgICB2YXIgcHJvbWlzZXMgPSB3cmFwcGVyLm1hcChmdW5jdGlvbiAodykge1xuICAgICAgICAgIHJldHVybiBnZXRUZW1wbGF0ZSh3LnRlbXBsYXRlIHx8IHcudGVtcGxhdGVVcmwsICF3LnRlbXBsYXRlKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiAkcS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24gKHdyYXBwZXJzVGVtcGxhdGVzKSB7XG4gICAgICAgICAgd3JhcHBlcnNUZW1wbGF0ZXMuZm9yRWFjaChmdW5jdGlvbiAod3JhcHBlclRlbXBsYXRlLCBpbmRleCkge1xuICAgICAgICAgICAgZm9ybWx5VXNhYmlsaXR5LmNoZWNrV3JhcHBlclRlbXBsYXRlKHdyYXBwZXJUZW1wbGF0ZSwgd3JhcHBlcltpbmRleF0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLnJldmVyc2UoKTsgLy8gd3JhcHBlciAwIGlzIHdyYXBwZWQgaW4gd3JhcHBlciAxIGFuZCBzbyBvbi4uLlxuICAgICAgICAgIHZhciB0b3RhbFdyYXBwZXIgPSB3cmFwcGVyc1RlbXBsYXRlcy5zaGlmdCgpO1xuICAgICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLmZvckVhY2goZnVuY3Rpb24gKHdyYXBwZXJUZW1wbGF0ZSkge1xuICAgICAgICAgICAgdG90YWxXcmFwcGVyID0gZG9UcmFuc2NsdXNpb24odG90YWxXcmFwcGVyLCB3cmFwcGVyVGVtcGxhdGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBkb1RyYW5zY2x1c2lvbih0b3RhbFdyYXBwZXIsIHRlbXBsYXRlKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRvVHJhbnNjbHVzaW9uKHdyYXBwZXIsIHRlbXBsYXRlKSB7XG4gICAgICB2YXIgc3VwZXJXcmFwcGVyID0gYW5ndWxhci5lbGVtZW50KFwiPGE+PC9hPlwiKTsgLy8gdGhpcyBhbGxvd3MgcGVvcGxlIG5vdCBoYXZlIHRvIGhhdmUgYSBzaW5nbGUgcm9vdCBpbiB3cmFwcGVyc1xuICAgICAgc3VwZXJXcmFwcGVyLmFwcGVuZCh3cmFwcGVyKTtcbiAgICAgIHZhciB0cmFuc2NsdWRlRWwgPSBzdXBlcldyYXBwZXIuZmluZChcImZvcm1seS10cmFuc2NsdWRlXCIpO1xuICAgICAgdHJhbnNjbHVkZUVsLnJlcGxhY2VXaXRoKHRlbXBsYXRlKTtcbiAgICAgIHJldHVybiBzdXBlcldyYXBwZXIuaHRtbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFdyYXBwZXJPcHRpb24ob3B0aW9ucykge1xuICAgICAgdmFyIHdyYXBwZXIgPSBvcHRpb25zLndyYXBwZXI7XG4gICAgICAvLyBleHBsaWNpdCBudWxsIG1lYW5zIG5vIHdyYXBwZXJcbiAgICAgIGlmICh3cmFwcGVyID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cblxuICAgICAgLy8gbm90aGluZyBzcGVjaWZpZWQgbWVhbnMgdXNlIHRoZSBkZWZhdWx0IHdyYXBwZXIgZm9yIHRoZSB0eXBlXG4gICAgICBpZiAoIXdyYXBwZXIpIHtcbiAgICAgICAgLy8gZ2V0IGFsbCB3cmFwcGVycyB0aGF0IHNwZWNpZnkgdGhleSBhcHBseSB0byB0aGlzIHR5cGVcbiAgICAgICAgd3JhcHBlciA9IGFycmF5aWZ5KGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyQnlUeXBlKG9wdGlvbnMudHlwZSkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd3JhcHBlciA9IGFycmF5aWZ5KHdyYXBwZXIpLm1hcChmb3JtbHlDb25maWcuZ2V0V3JhcHBlcik7XG4gICAgICB9XG5cbiAgICAgIC8vIGdldCBhbGwgd3JhcHBlcnMgZm9yIHRoYXQgdGhpcyB0eXBlIHNwZWNpZmllZCB0aGF0IGl0IHVzZXMuXG4gICAgICB2YXIgdHlwZSA9IGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSwgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgICBpZiAodHlwZSAmJiB0eXBlLndyYXBwZXIpIHtcbiAgICAgICAgdmFyIHR5cGVXcmFwcGVycyA9IGFycmF5aWZ5KHR5cGUud3JhcHBlcikubWFwKGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKTtcbiAgICAgICAgd3JhcHBlciA9IHdyYXBwZXIuY29uY2F0KHR5cGVXcmFwcGVycyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGFkZCB0aGUgZGVmYXVsdCB3cmFwcGVyIGxhc3RcbiAgICAgIHZhciBkZWZhdWx0V3JhcHBlciA9IGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKCk7XG4gICAgICBpZiAoZGVmYXVsdFdyYXBwZXIpIHtcbiAgICAgICAgd3JhcHBlci5wdXNoKGRlZmF1bHRXcmFwcGVyKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFwaUNoZWNrKG9wdGlvbnMpIHtcbiAgICAgIHZhciB0ZW1wbGF0ZU9wdGlvbnMgPSBnZXRUZW1wbGF0ZU9wdGlvbnNDb3VudChvcHRpb25zKTtcbiAgICAgIGlmICh0ZW1wbGF0ZU9wdGlvbnMgPT09IDApIHtcbiAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXCJ5b3UtbXVzdC1wcm92aWRlLW9uZS1vZi10eXBlLXRlbXBsYXRlLW9yLXRlbXBsYXRldXJsLWZvci1hLWZpZWxkXCIsIFwiWW91IG11c3QgcHJvdmlkZSBvbmUgb2YgdHlwZSwgdGVtcGxhdGUsIG9yIHRlbXBsYXRlVXJsIGZvciBhIGZpZWxkXCIsIG9wdGlvbnMpO1xuICAgICAgfSBlbHNlIGlmICh0ZW1wbGF0ZU9wdGlvbnMgPiAxKSB7XG4gICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFwieW91LW11c3Qtb25seS1wcm92aWRlLWEtdHlwZS10ZW1wbGF0ZS1vci10ZW1wbGF0ZXVybC1mb3ItYS1maWVsZFwiLCBcIllvdSBtdXN0IG9ubHkgcHJvdmlkZSBhIHR5cGUsIHRlbXBsYXRlLCBvciB0ZW1wbGF0ZVVybCBmb3IgYSBmaWVsZFwiLCBvcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgLy8gY2hlY2sgdGhhdCBvbmx5IGFsbG93ZWQgcHJvcGVydGllcyBhcmUgcHJvdmlkZWRcbiAgICAgIHZhciBhbGxvd2VkUHJvcGVydGllcyA9IFtcInR5cGVcIiwgXCJ0ZW1wbGF0ZVwiLCBcInRlbXBsYXRlVXJsXCIsIFwia2V5XCIsIFwibW9kZWxcIiwgXCJleHByZXNzaW9uUHJvcGVydGllc1wiLCBcImRhdGFcIiwgXCJ0ZW1wbGF0ZU9wdGlvbnNcIiwgXCJ3cmFwcGVyXCIsIFwibW9kZWxPcHRpb25zXCIsIFwid2F0Y2hlclwiLCBcInZhbGlkYXRvcnNcIiwgXCJub0Zvcm1Db250cm9sXCIsIFwiaGlkZVwiLCBcIm5nTW9kZWxBdHRyc1wiLCBcIm9wdGlvbnNUeXBlc1wiLCBcImxpbmtcIiwgXCJjb250cm9sbGVyXCIsIFwidmFsaWRhdGlvblwiLFxuICAgICAgLy8gdGhpbmdzIHdlIGFkZCB0byB0aGUgZmllbGQgYWZ0ZXIgdGhlIGZhY3QgYXJlIG9rXG4gICAgICBcImZvcm1Db250cm9sXCIsIFwidmFsdWVcIiwgXCJydW5FeHByZXNzaW9uc1wiXTtcbiAgICAgIGZvcm1seVVzYWJpbGl0eS5jaGVja0FsbG93ZWRQcm9wZXJ0aWVzKGFsbG93ZWRQcm9wZXJ0aWVzLCBvcHRpb25zKTtcblxuICAgICAgZnVuY3Rpb24gZ2V0VGVtcGxhdGVPcHRpb25zQ291bnQob3B0aW9ucykge1xuICAgICAgICB2YXIgdGVtcGxhdGVPcHRpb25zID0gMDtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zICs9IGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudGVtcGxhdGUpID8gMSA6IDA7XG4gICAgICAgIHRlbXBsYXRlT3B0aW9ucyArPSBhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnR5cGUpID8gMSA6IDA7XG4gICAgICAgIHRlbXBsYXRlT3B0aW9ucyArPSBhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnRlbXBsYXRlVXJsKSA/IDEgOiAwO1xuICAgICAgICByZXR1cm4gdGVtcGxhdGVPcHRpb25zO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmb3JtbHlGaWVsZC4kaW5qZWN0ID0gW1wiJGh0dHBcIiwgXCIkcVwiLCBcIiRjb21waWxlXCIsIFwiJHRlbXBsYXRlQ2FjaGVcIiwgXCJmb3JtbHlDb25maWdcIiwgXCJmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXNcIiwgXCJmb3JtbHlVdGlsXCIsIFwiZm9ybWx5VXNhYmlsaXR5XCIsIFwiZm9ybWx5V2FyblwiXTtcblxuICBmdW5jdGlvbiBhcnJheWlmeShvYmopIHtcbiAgICBpZiAob2JqICYmICFhbmd1bGFyLmlzQXJyYXkob2JqKSkge1xuICAgICAgb2JqID0gW29ial07XG4gICAgfSBlbHNlIGlmICghb2JqKSB7XG4gICAgICBvYmogPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGlyZWN0aXZlcy9mb3JtbHktZmllbGQuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdG9BcnJheSA9IGZ1bmN0aW9uIChhcnIpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyKSA/IGFyciA6IEFycmF5LmZyb20oYXJyKTsgfTtcblxudmFyIF9zbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5kaXJlY3RpdmUoXCJmb3JtbHlGb3JtXCIsIGZvcm1seUZvcm0pO1xuXG4gIGZvcm1seUZvcm0udGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZShcIi4vZm9ybWx5LWZvcm0udGVzdFwiKShuZ01vZHVsZSkgOiBudWxsO1xuXG4gIGZ1bmN0aW9uIGZvcm1seUZvcm0oZm9ybWx5VXNhYmlsaXR5KSB7XG4gICAgdmFyIGN1cnJlbnRGb3JtSWQgPSAxO1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogXCJFXCIsXG4gICAgICB0ZW1wbGF0ZTogZnVuY3Rpb24gKGVsLCBhdHRycykge1xuICAgICAgICAvKiBqc2hpbnQgLVcwMzMgKi8gLy8gdGhpcyBiZWNhdXNlIGpzaGludCBpcyBicm9rZW4gSSBndWVzcy4uLlxuICAgICAgICB2YXIgcm9vdEVsID0gYXR0cnMucm9vdEVsIHx8IFwibmctZm9ybVwiO1xuICAgICAgICByZXR1cm4gXCJcXG4gICAgICAgICAgPFwiICsgcm9vdEVsICsgXCIgY2xhc3M9XFxcImZvcm1seVxcXCJcXG4gICAgICAgICAgICAgICAgICAgbmFtZT1cXFwiZm9ybVxcXCJcXG4gICAgICAgICAgICAgICAgICAgcm9sZT1cXFwiZm9ybVxcXCI+XFxuICAgICAgICAgICAgPGRpdiBmb3JtbHktZmllbGRcXG4gICAgICAgICAgICAgICAgIG5nLXJlcGVhdD1cXFwiZmllbGQgaW4gZmllbGRzIHRyYWNrIGJ5ICRpbmRleFxcXCJcXG4gICAgICAgICAgICAgICAgIG5nLWlmPVxcXCIhZmllbGQuaGlkZVxcXCJcXG4gICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJmb3JtbHktZmllbGQge3tmaWVsZC50eXBlID8gJ2Zvcm1seS1maWVsZC0nICsgZmllbGQudHlwZSA6ICcnfX1cXFwiXFxuICAgICAgICAgICAgICAgICBvcHRpb25zPVxcXCJmaWVsZFxcXCJcXG4gICAgICAgICAgICAgICAgIG1vZGVsPVxcXCJmaWVsZC5tb2RlbCB8fCBtb2RlbFxcXCJcXG4gICAgICAgICAgICAgICAgIGZpZWxkcz1cXFwiZmllbGRzXFxcIlxcbiAgICAgICAgICAgICAgICAgZm9ybT1cXFwiZm9ybVxcXCJcXG4gICAgICAgICAgICAgICAgIGZvcm0taWQ9XFxcImZvcm1JZFxcXCJcXG4gICAgICAgICAgICAgICAgIGluZGV4PVxcXCIkaW5kZXhcXFwiPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgbmctdHJhbnNjbHVkZT48L2Rpdj5cXG4gICAgICAgICAgPC9cIiArIHJvb3RFbCArIFwiPlxcbiAgICAgICAgXCI7XG4gICAgICB9LFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICBzY29wZToge1xuICAgICAgICBmaWVsZHM6IFwiPVwiLFxuICAgICAgICBtb2RlbDogXCI9P1wiLCAvLyB3ZSdsbCBkbyBvdXIgb3duIHdhcm5pbmcgdG8gaGVscCB3aXRoIG1pZ3JhdGlvbnNcbiAgICAgICAgZm9ybTogXCI9P1wiXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogW1wiJHNjb3BlXCIsIGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLmZvcm1JZCA9IFwiZm9ybWx5X1wiICsgY3VycmVudEZvcm1JZCsrO1xuXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBhdHRhY2hLZXkpOyAvLyBhdHRhY2hlcyBhIGtleSBiYXNlZCBvbiB0aGUgaW5kZXggaWYgYSBrZXkgaXNuJ3Qgc3BlY2lmaWVkXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBzZXR1cFdhdGNoZXJzKTsgLy8gc2V0dXAgd2F0Y2hlcnMgZm9yIGFsbCBmaWVsZHNcblxuICAgICAgICAvLyB3YXRjaCB0aGUgbW9kZWwgYW5kIGV2YWx1YXRlIHdhdGNoIGV4cHJlc3Npb25zIHRoYXQgZGVwZW5kIG9uIGl0LlxuICAgICAgICAkc2NvcGUuJHdhdGNoKFwibW9kZWxcIiwgZnVuY3Rpb24gb25SZXN1bHRVcGRhdGUobmV3UmVzdWx0KSB7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgICAgLypqc2hpbnQgLVcwMzAgKi9cbiAgICAgICAgICAgIGZpZWxkLnJ1bkV4cHJlc3Npb25zICYmIGZpZWxkLnJ1bkV4cHJlc3Npb25zKG5ld1Jlc3VsdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGF0dGFjaEtleShmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICBmaWVsZC5rZXkgPSBmaWVsZC5rZXkgfHwgaW5kZXggfHwgMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldHVwV2F0Y2hlcnMoZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChmaWVsZC53YXRjaGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgd2F0Y2hlcnMgPSBmaWVsZC53YXRjaGVyO1xuICAgICAgICAgIGlmICghYW5ndWxhci5pc0FycmF5KHdhdGNoZXJzKSkge1xuICAgICAgICAgICAgd2F0Y2hlcnMgPSBbd2F0Y2hlcnNdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2god2F0Y2hlcnMsIGZ1bmN0aW9uICh3YXRjaGVyKSB7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKHdhdGNoZXIubGlzdGVuZXIpKSB7XG4gICAgICAgICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFwiYWxsLWZpZWxkLXdhdGNoZXJzLW11c3QtaGF2ZS1hLWxpc3RlbmVyXCIsIFwiQWxsIGZpZWxkIHdhdGNoZXJzIG11c3QgaGF2ZSBhIGxpc3RlbmVyXCIsIGZpZWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB3YXRjaEV4cHJlc3Npb24gPSBnZXRXYXRjaEV4cHJlc3Npb24od2F0Y2hlciwgZmllbGQsIGluZGV4KTtcbiAgICAgICAgICAgIHZhciB3YXRjaExpc3RlbmVyID0gZ2V0V2F0Y2hMaXN0ZW5lcih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpO1xuXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHdhdGNoZXIudHlwZSB8fCBcIiR3YXRjaFwiO1xuICAgICAgICAgICAgd2F0Y2hlci5zdG9wV2F0Y2hpbmcgPSAkc2NvcGVbdHlwZV0od2F0Y2hFeHByZXNzaW9uLCB3YXRjaExpc3RlbmVyLCB3YXRjaGVyLndhdGNoRGVlcCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRXYXRjaEV4cHJlc3Npb24od2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgdmFyIHdhdGNoRXhwcmVzc2lvbiA9IHdhdGNoZXIuZXhwcmVzc2lvbiB8fCBcIm1vZGVsWydcIiArIGZpZWxkLmtleSArIFwiJ11cIjtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHdhdGNoRXhwcmVzc2lvbikpIHtcbiAgICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggZXhwcmVzc2lvbiBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgICAvLyBhbmQgdGhlIHN0b3AgZnVuY3Rpb24gYXMgdGhlIGxhc3QgYXJnIGFzIGEgaGVscGVyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxFeHByZXNzaW9uID0gd2F0Y2hFeHByZXNzaW9uO1xuICAgICAgICAgICAgd2F0Y2hFeHByZXNzaW9uID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hFeHByZXNzaW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IG1vZGlmeUFyZ3MuYXBwbHkodW5kZWZpbmVkLCBbd2F0Y2hlciwgaW5kZXhdLmNvbmNhdChfc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEV4cHJlc3Npb24uYXBwbHkodW5kZWZpbmVkLCBfdG9BcnJheShhcmdzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2F0Y2hFeHByZXNzaW9uLmRpc3BsYXlOYW1lID0gXCJGb3JtbHkgV2F0Y2ggRXhwcmVzc2lvbiBmb3IgZmllbGQgZm9yIFwiICsgZmllbGQua2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gd2F0Y2hFeHByZXNzaW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0V2F0Y2hMaXN0ZW5lcih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICB2YXIgd2F0Y2hMaXN0ZW5lciA9IHdhdGNoZXIubGlzdGVuZXI7XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih3YXRjaExpc3RlbmVyKSkge1xuICAgICAgICAgICAgLy8gd3JhcCB0aGUgZmllbGQncyB3YXRjaCBsaXN0ZW5lciBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgICAvLyBhbmQgdGhlIHN0b3AgZnVuY3Rpb24gYXMgdGhlIGxhc3QgYXJnIGFzIGEgaGVscGVyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxMaXN0ZW5lciA9IHdhdGNoTGlzdGVuZXI7XG4gICAgICAgICAgICB3YXRjaExpc3RlbmVyID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hMaXN0ZW5lcigpIHtcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBtb2RpZnlBcmdzLmFwcGx5KHVuZGVmaW5lZCwgW3dhdGNoZXIsIGluZGV4XS5jb25jYXQoX3NsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxMaXN0ZW5lci5hcHBseSh1bmRlZmluZWQsIF90b0FycmF5KGFyZ3MpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3YXRjaExpc3RlbmVyLmRpc3BsYXlOYW1lID0gXCJGb3JtbHkgV2F0Y2ggTGlzdGVuZXIgZm9yIGZpZWxkIGZvciBcIiArIGZpZWxkLmtleTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHdhdGNoTGlzdGVuZXI7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtb2RpZnlBcmdzKHdhdGNoZXIsIGluZGV4KSB7XG4gICAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG9yaWdpbmFsQXJncyA9IEFycmF5KF9sZW4gPiAyID8gX2xlbiAtIDIgOiAwKSwgX2tleSA9IDI7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICAgIG9yaWdpbmFsQXJnc1tfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIFskc2NvcGUuZmllbGRzW2luZGV4XV0uY29uY2F0KF90b0FycmF5KG9yaWdpbmFsQXJncyksIFt3YXRjaGVyLnN0b3BXYXRjaGluZ10pO1xuICAgICAgICB9XG4gICAgICB9XSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWwsIGF0dHJzKSB7XG4gICAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShcInJlc3VsdFwiKSkge1xuICAgICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGb3JtbHlFcnJvcihcIlRoZSBcXFwicmVzdWx0XFxcIiBhdHRyaWJ1dGUgb24gYSBmb3JtbHktZm9ybSBpcyBubyBsb25nZXIgdmFsaWQuIFVzZSBcXFwibW9kZWxcXFwiIGluc3RlYWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLm5hbWUgIT09IFwiZm9ybVwiKSB7XG4gICAgICAgICAgLy8gdGhlbiB0aGV5IHNwZWNpZmllZCB0aGVpciBvd24gbmFtZVxuICAgICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGb3JtbHlFcnJvcihcIlRoZSBcXFwibmFtZVxcXCIgYXR0cmlidXRlIG9uIGEgZm9ybWx5LWZvcm0gaXMgbm8gbG9uZ2VyIHZhbGlkLiBVc2UgXFxcImZvcm1cXFwiIGluc3RlYWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZW5mb3JjZSB0aGUgbW9kZWwgYXR0cmlidXRlIGJlY2F1c2Ugd2UncmUgbWFraW5nIGl0IG9wdGlvbmFsIHRvIGhlbHAgd2l0aCBtaWdyYXRpb25zXG4gICAgICAgIGlmICghYXR0cnMuaGFzT3duUHJvcGVydHkoXCJtb2RlbFwiKSB8fCAhc2NvcGUubW9kZWwpIHtcbiAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0Rm9ybWx5RXJyb3IoXCJUaGUgXFxcIm1vZGVsXFxcIiBhdHRyaWJ1dGUgaXMgcmVxdWlyZWQgb24gYSBmb3JtbHktZm9ybS5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZvcm1seUZvcm0uJGluamVjdCA9IFtcImZvcm1seVVzYWJpbGl0eVwiXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0uanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmRpcmVjdGl2ZShcImZvcm1seUZvY3VzXCIsIFtcIiR0aW1lb3V0XCIsIFwiJGRvY3VtZW50XCIsIGZ1bmN0aW9uICgkdGltZW91dCwgJGRvY3VtZW50KSB7XG4gICAgLyoganNoaW50IC1XMDUyICovXG4gICAgcmV0dXJuIHtcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzRWwgPSBudWxsO1xuICAgICAgICB2YXIgZWwgPSBlbGVtZW50WzBdO1xuICAgICAgICB2YXIgZG9jID0gJGRvY3VtZW50WzBdO1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZShcImZvcm1seUZvY3VzXCIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcHJldmlvdXNFbCA9IGRvYy5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICAgICAgfSwgfiB+YXR0cnMuZm9jdXNXYWl0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBcImZhbHNlXCIpIHtcbiAgICAgICAgICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCA9PT0gZWwpIHtcbiAgICAgICAgICAgICAgZWwuYmx1cigpO1xuICAgICAgICAgICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoXCJyZWZvY3VzXCIpICYmIHByZXZpb3VzRWwpIHtcbiAgICAgICAgICAgICAgICBwcmV2aW91c0VsLmZvY3VzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvY3VzLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5ydW4oYWRkRm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IpO1xuXG4gIGZ1bmN0aW9uIGFkZEZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKGZvcm1seUNvbmZpZykge1xuICAgIGlmIChmb3JtbHlDb25maWcuZXh0cmFzLmRpc2FibGVOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlci5wdXNoKG5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKTtcbiAgfVxuICBhZGRGb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvci4kaW5qZWN0ID0gW1wiZm9ybWx5Q29uZmlnXCJdO1xuXG5cbiAgZnVuY3Rpb24gbmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IodGVtcGxhdGUsIG9wdGlvbnMsIHNjb3BlKSB7XG4gICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICAgIHZhciBlbCA9IGFuZ3VsYXIuZWxlbWVudChcIjxhPjwvYT5cIik7XG4gICAgdmFyIGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgaWYgKGRhdGEubm9Ub3VjaHkpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG4gICAgZWwuYXBwZW5kKHRlbXBsYXRlKTtcbiAgICB2YXIgbW9kZWxFbHMgPSBhbmd1bGFyLmVsZW1lbnQoZWxbMF0ucXVlcnlTZWxlY3RvckFsbChcIltuZy1tb2RlbF1cIikpO1xuICAgIGlmICghbW9kZWxFbHMgfHwgIW1vZGVsRWxzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cblxuICAgIGFkZElmTm90UHJlc2VudChtb2RlbEVscywgXCJpZFwiLCBzY29wZS5pZCk7XG4gICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCBcIm5hbWVcIiwgc2NvcGUuaWQpO1xuXG4gICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudmFsaWRhdG9ycykpIHtcbiAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbEVscywgXCJmb3JtbHktY3VzdG9tLXZhbGlkYXRpb25cIiwgXCJvcHRpb25zLnZhbGlkYXRvcnNcIik7XG4gICAgfVxuICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLm1vZGVsT3B0aW9ucykpIHtcbiAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbEVscywgXCJuZy1tb2RlbC1vcHRpb25zXCIsIFwib3B0aW9ucy5tb2RlbE9wdGlvbnNcIik7XG4gICAgICBpZiAob3B0aW9ucy5tb2RlbE9wdGlvbnMuZ2V0dGVyU2V0dGVyKSB7XG4gICAgICAgIG1vZGVsRWxzLmF0dHIoXCJuZy1tb2RlbFwiLCBcIm9wdGlvbnMudmFsdWVcIik7XG4gICAgICB9XG4gICAgfVxuICAgIGFkZFRlbXBsYXRlT3B0aW9uc0F0dHJzKCk7XG5cbiAgICByZXR1cm4gZWwuaHRtbCgpO1xuXG5cbiAgICBmdW5jdGlvbiBhZGRUZW1wbGF0ZU9wdGlvbnNBdHRycygpIHtcbiAgICAgIGlmICghb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnMgJiYgIW9wdGlvbnMuZXhwcmVzc2lvblByb3BlcnRpZXMpIHtcbiAgICAgICAgLy8gbm8gbmVlZCB0byBydW4gdGhlc2UgaWYgdGhlcmUgYXJlIG5vIHRlbXBsYXRlT3B0aW9ucyBvciBleHByZXNzaW9uUHJvcGVydGllc1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB2YXIgdG8gPSBvcHRpb25zLnRlbXBsYXRlT3B0aW9ucyB8fCB7fTtcbiAgICAgIHZhciBlcCA9IG9wdGlvbnMuZXhwcmVzc2lvblByb3BlcnRpZXMgfHwge307XG5cbiAgICAgIHZhciBuZ01vZGVsQXR0cmlidXRlcyA9IGdldEJ1aWx0aW5BdHRyaWJ1dGVzKCk7XG5cbiAgICAgIC8vIGV4dGVuZCB3aXRoIHRoZSB1c2VyJ3Mgc3BlY2lmaWNhdGlvbnMgd2lubmluZ1xuICAgICAgYW5ndWxhci5leHRlbmQobmdNb2RlbEF0dHJpYnV0ZXMsIG9wdGlvbnMubmdNb2RlbEF0dHJzKTtcblxuICAgICAgYW5ndWxhci5mb3JFYWNoKG5nTW9kZWxBdHRyaWJ1dGVzLCBmdW5jdGlvbiAodmFsLCBuYW1lKSB7XG4gICAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjkgKi9cbiAgICAgICAgdmFyIGF0dHJWYWwgPSB1bmRlZmluZWQ7XG4gICAgICAgIHZhciBhdHRyTmFtZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdmFyIHJlZiA9IFwib3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbJ1wiICsgbmFtZSArIFwiJ11cIjtcbiAgICAgICAgdmFyIHRvVmFsID0gdG9bbmFtZV07XG4gICAgICAgIHZhciBlcFZhbCA9IGdldEVwVmFsdWUoZXAsIG5hbWUpO1xuXG4gICAgICAgIHZhciBpblRvID0gYW5ndWxhci5pc0RlZmluZWQodG9WYWwpO1xuICAgICAgICB2YXIgaW5FcCA9IGFuZ3VsYXIuaXNEZWZpbmVkKGVwVmFsKTtcbiAgICAgICAgaWYgKHZhbC52YWx1ZSkge1xuICAgICAgICAgIC8vIEkgcmVhbGl6ZSB0aGlzIGxvb2tzIGJhY2t3YXJkcywgYnV0IGl0J3MgcmlnaHQsIHRydXN0IG1lLi4uXG4gICAgICAgICAgYXR0ck5hbWUgPSB2YWwudmFsdWU7XG4gICAgICAgICAgYXR0clZhbCA9IG5hbWU7XG4gICAgICAgIH0gZWxzZSBpZiAodmFsLmV4cHJlc3Npb24gJiYgaW5Ubykge1xuICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmV4cHJlc3Npb247XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNTdHJpbmcodG9bbmFtZV0pKSB7XG4gICAgICAgICAgICBhdHRyVmFsID0gXCIkZXZhbChcIiArIHJlZiArIFwiKVwiO1xuICAgICAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRvW25hbWVdKSkge1xuICAgICAgICAgICAgYXR0clZhbCA9IFwiXCIgKyByZWYgKyBcIihtb2RlbFtvcHRpb25zLmtleV0sIG9wdGlvbnMsIHRoaXMsICRldmVudClcIjtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFwib3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnMuXCIgKyBuYW1lICsgXCIgbXVzdCBiZSBhIHN0cmluZyBvciBmdW5jdGlvbjogXCIgKyBKU09OLnN0cmluZ2lmeShvcHRpb25zKSk7XG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHZhbC5ib3VuZCAmJiBpbkVwKSB7XG4gICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYm91bmQ7XG4gICAgICAgICAgYXR0clZhbCA9IHJlZjtcbiAgICAgICAgfSBlbHNlIGlmICh2YWwuYXR0cmlidXRlICYmIGluRXApIHtcbiAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5hdHRyaWJ1dGU7XG4gICAgICAgICAgYXR0clZhbCA9IFwie3tcIiArIHJlZiArIFwifX1cIjtcbiAgICAgICAgfSBlbHNlIGlmICh2YWwuYXR0cmlidXRlICYmIGluVG8pIHtcbiAgICAgICAgICBhdHRyTmFtZSA9IHZhbC5hdHRyaWJ1dGU7XG4gICAgICAgICAgYXR0clZhbCA9IHRvVmFsO1xuICAgICAgICB9XG4gICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChhdHRyTmFtZSkgJiYgYW5ndWxhci5pc0RlZmluZWQoYXR0clZhbCkpIHtcbiAgICAgICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxFbHMsIGF0dHJOYW1lLCBhdHRyVmFsKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0QnVpbHRpbkF0dHJpYnV0ZXMoKSB7XG4gICAgICB2YXIgbmdNb2RlbEF0dHJpYnV0ZXMgPSB7XG4gICAgICAgIGZvY3VzOiB7XG4gICAgICAgICAgYXR0cmlidXRlOiBcImZvcm1seS1mb2N1c1wiXG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgICB2YXIgYm90aEF0dHJpYnV0ZUFuZEJvdW5kID0gW1wicmVxdWlyZWRcIiwgXCJkaXNhYmxlZFwiLCBcInBhdHRlcm5cIiwgXCJtYXhsZW5ndGhcIiwgXCJtaW5sZW5ndGhcIl07XG4gICAgICB2YXIgZXhwcmVzc2lvbk9ubHkgPSBbXCJjaGFuZ2VcIiwgXCJrZXlkb3duXCIsIFwia2V5dXBcIiwgXCJrZXlwcmVzc1wiLCBcImNsaWNrXCIsIFwiZm9jdXNcIiwgXCJibHVyXCJdO1xuICAgICAgdmFyIGF0dHJpYnV0ZU9ubHkgPSBbXCJwbGFjZWhvbGRlclwiLCBcIm1pblwiLCBcIm1heFwiLCBcInRhYmluZGV4XCIsIFwidHlwZVwiXTtcblxuICAgICAgYW5ndWxhci5mb3JFYWNoKGJvdGhBdHRyaWJ1dGVBbmRCb3VuZCwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7IGF0dHJpYnV0ZTogaXRlbSwgYm91bmQ6IFwibmctXCIgKyBpdGVtIH07XG4gICAgICB9KTtcblxuICAgICAgYW5ndWxhci5mb3JFYWNoKGV4cHJlc3Npb25Pbmx5LCBmdW5jdGlvbiAoaXRlbSkge1xuICAgICAgICB2YXIgcHJvcE5hbWUgPSBcIm9uXCIgKyBpdGVtLnN1YnN0cigwLCAxKS50b1VwcGVyQ2FzZSgpICsgaXRlbS5zdWJzdHIoMSk7XG4gICAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW3Byb3BOYW1lXSA9IHsgZXhwcmVzc2lvbjogXCJuZy1cIiArIGl0ZW0gfTtcbiAgICAgIH0pO1xuXG4gICAgICBhbmd1bGFyLmZvckVhY2goYXR0cmlidXRlT25seSwgZnVuY3Rpb24gKGl0ZW0pIHtcbiAgICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7IGF0dHJpYnV0ZTogaXRlbSB9O1xuICAgICAgfSk7XG4gICAgICByZXR1cm4gbmdNb2RlbEF0dHJpYnV0ZXM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RXBWYWx1ZShlcCwgbmFtZSkge1xuICAgICAgcmV0dXJuIGVwW1widGVtcGxhdGVPcHRpb25zLlwiICsgbmFtZV0gfHwgZXBbXCJ0ZW1wbGF0ZU9wdGlvbnNbJ1wiICsgbmFtZSArIFwiJ11cIl0gfHwgZXBbXCJ0ZW1wbGF0ZU9wdGlvbnNbXFxcIlwiICsgbmFtZSArIFwiXFxcIl1cIl07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkSWZOb3RQcmVzZW50KGVsLCBhdHRyLCB2YWwpIHtcbiAgICAgIGlmICghZWwuYXR0cihhdHRyKSkge1xuICAgICAgICBlbC5hdHRyKGF0dHIsIHZhbCk7XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9ydW4vZm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IuanNcbiAqKiBtb2R1bGUgaWQgPSAxOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHsgZm9ybWx5RXZhbDogZm9ybWx5RXZhbCwgZ2V0RmllbGRJZDogZ2V0RmllbGRJZCwgcmV2ZXJzZURlZXBNZXJnZTogcmV2ZXJzZURlZXBNZXJnZSB9O1xuXG5cbmZ1bmN0aW9uIGZvcm1seUV2YWwoc2NvcGUsIGV4cHJlc3Npb24sIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSkge1xuICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGV4cHJlc3Npb24pKSB7XG4gICAgcmV0dXJuIGV4cHJlc3Npb24odmlld1ZhbHVlIHx8IG1vZGVsVmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKTtcbiAgfSBlbHNlIHtcbiAgICByZXR1cm4gc2NvcGUuJGV2YWwoZXhwcmVzc2lvbiwge1xuICAgICAgJHZpZXdWYWx1ZTogdmlld1ZhbHVlIHx8IG1vZGVsVmFsdWUsXG4gICAgICAkbW9kZWxWYWx1ZTogbW9kZWxWYWx1ZVxuICAgIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIGdldEZpZWxkSWQoZm9ybUlkLCBvcHRpb25zLCBpbmRleCkge1xuICB2YXIgdHlwZSA9IG9wdGlvbnMudHlwZTtcbiAgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICB0eXBlID0gXCJ0ZW1wbGF0ZVwiO1xuICB9IGVsc2UgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGVVcmwpIHtcbiAgICB0eXBlID0gXCJ0ZW1wbGF0ZVVybFwiO1xuICB9XG5cbiAgcmV0dXJuIFtmb3JtSWQsIHR5cGUsIG9wdGlvbnMua2V5LCBpbmRleF0uam9pbihcIl9cIik7XG59XG5cblxuZnVuY3Rpb24gcmV2ZXJzZURlZXBNZXJnZShkZXN0KSB7XG4gIGFuZ3VsYXIuZm9yRWFjaChhcmd1bWVudHMsIGZ1bmN0aW9uIChzcmMsIGluZGV4KSB7XG4gICAgaWYgKCFpbmRleCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBhbmd1bGFyLmZvckVhY2goc3JjLCBmdW5jdGlvbiAodmFsLCBwcm9wKSB7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGRlc3RbcHJvcF0pKSB7XG4gICAgICAgIGRlc3RbcHJvcF0gPSBhbmd1bGFyLmNvcHkodmFsKTtcbiAgICAgIH0gZWxzZSBpZiAob2JqQW5kU2FtZVR5cGUoZGVzdFtwcm9wXSwgdmFsKSkge1xuICAgICAgICByZXZlcnNlRGVlcE1lcmdlKGRlc3RbcHJvcF0sIHZhbCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvYmpBbmRTYW1lVHlwZShvYmoxLCBvYmoyKSB7XG4gIHJldHVybiBhbmd1bGFyLmlzT2JqZWN0KG9iajEpICYmIGFuZ3VsYXIuaXNPYmplY3Qob2JqMikgJiYgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iajEpID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqMik7XG59XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL290aGVyL3V0aWxzLmpzXG4gKiogbW9kdWxlIGlkID0gMjBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyJdLCJzb3VyY2VSb290IjoiIiwiZmlsZSI6ImZvcm1seS5qcyJ9