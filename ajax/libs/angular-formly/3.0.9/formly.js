// angular-formly version 3.0.9 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

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
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(13)(ngModule);
	  __webpack_require__(14)(ngModule);
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
	
	var angular = __webpack_require__(2);
	
	module.exports = function (ngModule) {
	  ngModule.provider("formlyUsability", function () {
	    var _this = this;
	    var errorsAndWarningsUrlPrefix = "https://github.com/formly-js/angular-formly/wiki/Errors-and-Warnings#";
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
	  });
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(2);
	
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
	        typeMap[options.name] = options;
	      } else {
	        throw getError("You must provide an object or array for setType. You provided: " + JSON.stringify(arguments));
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
	
	    function checkType(options) {
	      if (!options.name) {
	        throw getError("You must provide a name for setType. You provided: " + JSON.stringify(arguments));
	      } else if (!options.defaultOptions && !options.template && !options.templateUrl) {
	        throw getError("You must provide defaultOptions OR a template OR templateUrl for setType. " + ("You provided none of these: " + JSON.stringify(arguments)));
	      } else if (options.template && options.templateUrl) {
	        throw getError("You must provide at most a template OR templateUrl for setType. " + ("You provided both: " + JSON.stringify(arguments)));
	      }
	      if (!options.overwriteOk) {
	        checkOverwrite(options.name, typeMap, options, "types");
	      } else {
	        delete options.overwriteOk;
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
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyVersion", ("3.0.9"));
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyErrorAndWarningsUrlPrefix", "https://github.com/formly-js/angular-formly/wiki/Errors-and-Warnings#");
	};

/***/ },
/* 12 */
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slice = Array.prototype.slice;
	var angular = __webpack_require__(2);
	
	module.exports = function (ngModule) {
	  ngModule.factory("formlyUtil", function () {
	    var objectPrototype = Object.getPrototypeOf({});
	    var arrayPrototype = Object.getPrototypeOf([]);
	    return {
	      formlyEval: formlyEval,
	      getFieldId: getFieldId,
	      reverseDeepMerge: reverseDeepMerge
	    };
	
	    function formlyEval(scope, expression, modelValue, viewValue) {
	      if (angular.isFunction(expression)) {
	        return expression(viewValue, modelValue, scope);
	      } else {
	        return scope.$eval(expression, {
	          $viewValue: viewValue,
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
	
	    function reverseDeepMerge() {
	      var realRes = arguments[0];
	      var res = {};
	      angular.forEach([].concat(_slice.call(arguments)).reverse(), function (src) {
	        if (!src) {
	          return;
	        }
	        angular.forEach(src, function (val, prop) {
	          /* jshint maxcomplexity:7 */
	          if (typeof val === "object" && val !== null && (Object.getPrototypeOf(val) === objectPrototype || Object.getPrototypeOf(val) === arrayPrototype)) {
	            var deepRes = res[prop];
	            if (!deepRes && angular.isArray(val)) {
	              deepRes = [];
	            } else if (!deepRes) {
	              deepRes = {};
	            }
	            res[prop] = reverseDeepMerge(deepRes, val);
	          } else if (angular.isDefined(val)) {
	            res[prop] = val;
	          }
	        });
	      });
	      angular.forEach(realRes, function (val, prop) {
	        delete realRes[prop];
	      });
	      angular.forEach(res, function (val, prop) {
	        realRes[prop] = val;
	      });
	      res = realRes;
	      return res;
	    }
	
	  });
	};

/***/ },
/* 14 */
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
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyCustomValidation", ["formlyUtil", "$q", function (formlyUtil, $q) {
	    return {
	      require: "ngModel",
	      link: function (scope, el, attrs, ctrl) {
	        var validators = scope.$eval(attrs.formlyCustomValidation);
	        if (!validators) {
	          return;
	        }
	        checkValidators(validators);
	        scope.options.validation.messages = scope.options.validation.messages || {};
	
	        // setup watchers and parsers
	        var hasValidators = ctrl.hasOwnProperty("$validators");
	        angular.forEach(validators, function (validator, name) {
	          var message = validator.message;
	          if (message) {
	            scope.options.validation.messages[name] = function () {
	              return formlyUtil.formlyEval(scope, message, ctrl.$modelValue, ctrl.$viewValue);
	            };
	          }
	          validator = angular.isObject(validator) ? validator.expression : validator;
	          if (hasValidators) {
	            var isPossiblyAsync = !angular.isString(validator);
	            var validatorCollection = isPossiblyAsync ? "$asyncValidators" : "$validators";
	            ctrl[validatorCollection][name] = function (modelValue, viewValue) {
	              var value = formlyUtil.formlyEval(scope, validator, modelValue, viewValue);
	              if (isPossiblyAsync) {
	                return isPromiseLike(value) ? value : value ? $q.when(value) : $q.reject(value);
	              } else {
	                return value;
	              }
	            };
	          } else {
	            ctrl.$parsers.unshift(function (viewValue) {
	              var isValid = formlyUtil.formlyEval(scope, validator, ctrl.$modelValue, viewValue);
	              ctrl.$setValidity(name, isValid);
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
	  }]);
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
	      controller: ["$scope", "$interval", "$timeout", "$parse", "$controller", function fieldController($scope, $interval, $timeout, $parse, $controller) {
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
	        setFormControl($scope, opts, $interval);
	        addModelWatcher($scope, opts);
	        addShowMessagesWatcher($scope, opts);
	        addValidationMessages(opts);
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
	        function setFormControl(scope, options, $interval) {
	          if (options.noFormControl) {
	            return;
	          }
	          var stopWaitingForDestroy;
	          var maxTime = 2000;
	          var intervalTime = 5;
	          var iterations = 0;
	          var interval = $interval(function () {
	            iterations++;
	            if (!angular.isDefined(options.key)) {
	              return cleanUp();
	            }
	            var formControl = scope.form && scope.form[scope.id];
	            if (formControl) {
	              options.formControl = formControl;
	              cleanUp();
	            } else if (intervalTime * iterations > maxTime) {
	              formlyWarn("couldnt-set-the-formcontrol-after-timems", "Couldn't set the formControl after " + maxTime + "ms", scope);
	              cleanUp();
	            }
	          }, intervalTime);
	          stopWaitingForDestroy = scope.$on("$destroy", cleanUp);
	
	          function cleanUp() {
	            stopWaitingForDestroy();
	            $interval.cancel(interval);
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
	        return;
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
	      var extraProps = Object.keys(options).filter(function (prop) {
	        return allowedProperties.indexOf(prop) === -1;
	      });
	      if (extraProps.length) {
	        throw formlyUsability.getFieldError("you-have-specified-field-properties-that-are-not-allowed", "You have specified field properties that are not allowed: " + JSON.stringify(extraProps.join(", ")), options);
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
	    addNgModelAttrs(options.ngModelAttrs);
	
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
	      // if the field has specified values for these, then we want to add the attributes and watch them for changes.
	      var boundAttributes = angular.extend(data.ngModelBoundAttributes || {}, {
	        "ng-disabled": "disabled",
	        "ng-required": "required",
	        "ng-pattern": "pattern",
	        "ng-maxlength": "maxlength",
	        "ng-minlength": "minlength"
	      });
	      var invokedAttributes = angular.extend(data.ngModelInvokedAttributes || {}, {
	        "ng-change": "onChange",
	        "ng-keydown": "onKeydown",
	        "ng-keyup": "onKeyup",
	        "ng-keypress": "onKeypress",
	        "ng-click": "onClick",
	        "ng-focus": "onFocus",
	        "ng-blur": "onBlur"
	      });
	      // attributes are wrapped in curly braces
	      var attributes = angular.extend(data.ngModelAttributes || {}, {
	        "formly-focus": "focus",
	        placeholder: "placeholder",
	        min: "min",
	        max: "max",
	        tabindex: "tabindex",
	        type: "type"
	      });
	
	      addDefinedAttributes(modelEls, boundAttributes, options);
	      addDefinedAttributes(modelEls, attributes, options, "{{", "}}");
	      addDefinedAttributes(modelEls, invokedAttributes, options, function (val) {
	        return angular.isFunction(val) ? "" : "$eval(";
	      }, function (val) {
	        return angular.isFunction(val) ? "(model[options.key], options, this, $event)" : ")";
	      });
	    }
	
	    function addNgModelAttrs(ngModelAttrs) {
	      ngModelAttrs = ngModelAttrs || {};
	      angular.forEach(ngModelAttrs.bound, function (val, attr) {
	        addIfNotPresent(modelEls, attr, "options.ngModelAttrs.bound['" + attr + "']");
	      });
	      angular.forEach(ngModelAttrs.unbound, function (val, attr) {
	        addIfNotPresent(modelEls, attr, scope.$eval(val));
	      });
	    }
	
	    function addDefinedAttributes(els, attrs, options) {
	      var prefix = arguments[3] === undefined ? "" : arguments[3];
	      var suffix = arguments[4] === undefined ? "" : arguments[4];
	      /* jshint maxcomplexity:6 */
	      var to = options.templateOptions;
	      var ep = options.expressionProperties;
	      if (!to && !ep) {
	        return; // no reason to iterate if these don't exist...
	      } else {
	        to = to || {};
	        ep = ep || {};
	      }
	      angular.forEach(attrs, function (val, attrName) {
	        // if it's defined as a property on template options, or if it's an expression property,
	        // then we'll add the attribute (and hence the watchers)
	        if (angular.isDefined(to[val]) || angular.isDefined(ep["templateOptions." + val])) {
	          var valPrefix = angular.isFunction(prefix) ? prefix(to[val]) : prefix;
	          var valSuffix = angular.isFunction(suffix) ? suffix(to[val]) : suffix;
	          addIfNotPresent(els, "" + attrName, "" + valPrefix + "options.templateOptions['" + val + "']" + valSuffix);
	        }
	      });
	    }
	
	    function addIfNotPresent(el, attr, val) {
	      if (!el.attr(attr)) {
	        el.attr(attr, val);
	      }
	    }
	  }
	};

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBhMmQ1NzM0ZGVmOGI5ZGY5MGUwZCIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vLy4vYW5ndWxhci1maXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5VXNhYmlsaXR5LmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlDb25maWcuanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seVZlcnNpb24uanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXguanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9mb3JtbHlVdGlsLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2Zvcm1seVdhcm4uanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktY3VzdG9tLXZhbGlkYXRpb24uanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktZmllbGQuanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktZm9ybS5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb2N1cy5qcyIsIndlYnBhY2s6Ly8vLi9ydW4vZm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0Esd0M7Ozs7Ozs7QUN0Q0E7O0FBRUEseUM7Ozs7OztBQ0ZBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQSwrQjs7Ozs7O0FDWEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEI7Ozs7OztBQ1JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ1JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ0xBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNQQTs7QUFFQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDSkEsZ0Q7Ozs7OztBQ0FBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHOzs7Ozs7QUMzREE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLEc7Ozs7OztBQzFMQTs7QUFF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QUFDWDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsSUFBRztBQUNILEc7Ozs7OztBQzVCQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0EsNkVBQTRFO0FBQzVFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1AsaUZBQWdGO0FBQ2hGO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsbUVBQWtFO0FBQ2xFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87O0FBRVA7QUFDQSw4REFBNkQsTUFBTTtBQUNuRTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxnQkFBZTtBQUNmLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEciLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKTtcblx0ZWxzZSBpZih0eXBlb2YgZGVmaW5lID09PSAnZnVuY3Rpb24nICYmIGRlZmluZS5hbWQpXG5cdFx0ZGVmaW5lKFtcImFuZ3VsYXJcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibmdGb3JtbHlcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJuZ0Zvcm1seVwiXSA9IGZhY3Rvcnkocm9vdFtcImFuZ3VsYXJcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV83X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBhMmQ1NzM0ZGVmOGI5ZGY5MGUwZFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2luZGV4LmNvbW1vblwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG5nTW9kdWxlTmFtZSA9IFwiZm9ybWx5XCI7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCIuL2FuZ3VsYXItZml4XCIpO1xudmFyIG5nTW9kdWxlID0gYW5ndWxhci5tb2R1bGUobmdNb2R1bGVOYW1lLCBbXSk7XG5cbnJlcXVpcmUoXCIuL3Byb3ZpZGVyc1wiKShuZ01vZHVsZSk7XG5yZXF1aXJlKFwiLi9zZXJ2aWNlc1wiKShuZ01vZHVsZSk7XG5yZXF1aXJlKFwiLi9kaXJlY3RpdmVzXCIpKG5nTW9kdWxlKTtcbnJlcXVpcmUoXCIuL3J1blwiKShuZ01vZHVsZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGVOYW1lO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9pbmRleC5jb21tb24uanNcbiAqKiBtb2R1bGUgaWQgPSAxXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxuLy8gc29tZSB2ZXJzaW9ucyBvZiBhbmd1bGFyIGRvbid0IGV4cG9ydCB0aGUgYW5ndWxhciBtb2R1bGUgcHJvcGVybHksXG4vLyBzbyB3ZSBnZXQgaXQgZnJvbSB3aW5kb3cgaW4gdGhpcyBjYXNlLlxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbmlmICghYW5ndWxhci52ZXJzaW9uKSB7XG4gIGFuZ3VsYXIgPSB3aW5kb3cuYW5ndWxhcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYW5ndWxhci1maXgvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgcmVxdWlyZShcIi4vZm9ybWx5VXNhYmlsaXR5XCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5Q29uZmlnXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5VmVyc2lvblwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXhcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXNcIikobmdNb2R1bGUpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHJvdmlkZXJzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seVV0aWxcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHlXYXJuXCIpKG5nTW9kdWxlKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3NlcnZpY2VzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvblwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seS1maWVsZFwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seS1mb3JtXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5LWZvY3VzXCIpKG5nTW9kdWxlKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgcmVxdWlyZShcIi4vZm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3JcIikobmdNb2R1bGUpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcnVuL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzdfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhclwiXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5wcm92aWRlcihcImZvcm1seVVzYWJpbGl0eVwiLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZXJyb3JzQW5kV2FybmluZ3NVcmxQcmVmaXggPSBcImh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtbHktanMvYW5ndWxhci1mb3JtbHkvd2lraS9FcnJvcnMtYW5kLVdhcm5pbmdzI1wiO1xuICAgIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsIHtcbiAgICAgIGdldEZvcm1seUVycm9yOiBnZXRGb3JtbHlFcnJvcixcbiAgICAgIGdldEZpZWxkRXJyb3I6IGdldEZpZWxkRXJyb3IsXG4gICAgICBjaGVja1dyYXBwZXI6IGNoZWNrV3JhcHBlcixcbiAgICAgIGNoZWNrV3JhcHBlclRlbXBsYXRlOiBjaGVja1dyYXBwZXJUZW1wbGF0ZSxcbiAgICAgICRnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZ2V0RmllbGRFcnJvcihlcnJvckluZm9TbHVnLCBtZXNzYWdlLCBmaWVsZCkge1xuICAgICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPCAzKSB7XG4gICAgICAgIGZpZWxkID0gbWVzc2FnZTtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9ySW5mb1NsdWc7XG4gICAgICAgIGVycm9ySW5mb1NsdWcgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkgKyAoXCIgRmllbGQgZGVmaW5pdGlvbjogXCIgKyBhbmd1bGFyLnRvSnNvbihmaWVsZCkpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGb3JtbHlFcnJvcihlcnJvckluZm9TbHVnLCBtZXNzYWdlKSB7XG4gICAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgICAgbWVzc2FnZSA9IGVycm9ySW5mb1NsdWc7XG4gICAgICAgIGVycm9ySW5mb1NsdWcgPSBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIG5ldyBFcnJvcihnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSB7XG4gICAgICB2YXIgdXJsID0gXCJcIjtcbiAgICAgIGlmIChlcnJvckluZm9TbHVnICE9PSBudWxsKSB7XG4gICAgICAgIHVybCA9IFwiXCIgKyBlcnJvcnNBbmRXYXJuaW5nc1VybFByZWZpeCArIFwiXCIgKyBlcnJvckluZm9TbHVnO1xuICAgICAgfVxuICAgICAgcmV0dXJuIFwiRm9ybWx5IEVycm9yOiBcIiArIG1lc3NhZ2UgKyBcIi4gXCIgKyB1cmw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyKHdyYXBwZXIpIHtcbiAgICAgIGlmICh3cmFwcGVyLnRlbXBsYXRlICYmIHdyYXBwZXIudGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXCJUZW1wbGF0ZSB3cmFwcGVycyBjYW4gb25seSBoYXZlIGEgdGVtcGxhdGVVcmwgb3IgYSB0ZW1wbGF0ZS4gXCIgKyAoXCJUaGlzIG9uZSBwcm92aWRlZCBib3RoOiBcIiArIEpTT04uc3RyaW5naWZ5KHdyYXBwZXIpKSk7XG4gICAgICB9XG4gICAgICBpZiAoIXdyYXBwZXIudGVtcGxhdGUgJiYgIXdyYXBwZXIudGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXCJUZW1wbGF0ZSB3cmFwcGVycyBtdXN0IGhhdmUgb25lIG9mIGEgdGVtcGxhdGVVcmwgb3IgYSB0ZW1wbGF0ZS4gXCIgKyAoXCJUaGlzIG9uZSBwcm92aWRlZCBuZWl0aGVyOiBcIiArIEpTT04uc3RyaW5naWZ5KHdyYXBwZXIpKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyVGVtcGxhdGUodGVtcGxhdGUsIGFkZGl0aW9uYWxJbmZvKSB7XG4gICAgICB2YXIgZm9ybWx5VHJhbnNjbHVkZSA9IFwiPGZvcm1seS10cmFuc2NsdWRlPjwvZm9ybWx5LXRyYW5zY2x1ZGU+XCI7XG4gICAgICBpZiAodGVtcGxhdGUuaW5kZXhPZihmb3JtbHlUcmFuc2NsdWRlKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXCJUZW1wbGF0ZSB3cmFwcGVyIHRlbXBsYXRlcyBtdXN0IHVzZSBcXFwiXCIgKyBmb3JtbHlUcmFuc2NsdWRlICsgXCJcXFwiIHNvbWV3aGVyZSBpbiB0aGVtLiBcIiArIChcIlRoaXMgb25lIGRvZXMgbm90IGhhdmUgXFxcIjxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPlxcXCIgaW4gaXQ6IFwiICsgdGVtcGxhdGUpICsgXCJcXG5cIiArIChcIkFkZGl0aW9uYWwgaW5mb3JtYXRpb246IFwiICsgSlNPTi5zdHJpbmdpZnkoYWRkaXRpb25hbEluZm8pKSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHkuanNcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhci1maXhcIik7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLnByb3ZpZGVyKFwiZm9ybWx5Q29uZmlnXCIsIGZvcm1seUNvbmZpZyk7XG5cbiAgZm9ybWx5Q29uZmlnLnRlc3RzID0gT05fVEVTVCA/IHJlcXVpcmUoXCIuL2Zvcm1seUNvbmZpZy50ZXN0XCIpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5Q29uZmlnKGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyKSB7XG4gICAgdmFyIF90aGlzMiA9IHRoaXM7XG5cblxuICAgIHZhciB0eXBlTWFwID0ge307XG4gICAgdmFyIHRlbXBsYXRlV3JhcHBlcnNNYXAgPSB7fTtcbiAgICB2YXIgZGVmYXVsdFdyYXBwZXJOYW1lID0gXCJkZWZhdWx0XCI7XG4gICAgdmFyIF90aGlzID0gdGhpcztcbiAgICB2YXIgZ2V0RXJyb3IgPSBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5nZXRGb3JtbHlFcnJvcjtcblxuICAgIGFuZ3VsYXIuZXh0ZW5kKHRoaXMsIHtcbiAgICAgIHNldFR5cGU6IHNldFR5cGUsXG4gICAgICBnZXRUeXBlOiBnZXRUeXBlLFxuICAgICAgc2V0V3JhcHBlcjogc2V0V3JhcHBlcixcbiAgICAgIGdldFdyYXBwZXI6IGdldFdyYXBwZXIsXG4gICAgICBnZXRXcmFwcGVyQnlUeXBlOiBnZXRXcmFwcGVyQnlUeXBlLFxuICAgICAgcmVtb3ZlV3JhcHBlckJ5TmFtZTogcmVtb3ZlV3JhcHBlckJ5TmFtZSxcbiAgICAgIHJlbW92ZVdyYXBwZXJzRm9yVHlwZTogcmVtb3ZlV3JhcHBlcnNGb3JUeXBlLFxuICAgICAgZGlzYWJsZVdhcm5pbmdzOiBmYWxzZSxcbiAgICAgIGV4dHJhczoge1xuICAgICAgICBkaXNhYmxlTmdNb2RlbEF0dHJzTWFuaXB1bGF0b3I6IGZhbHNlXG4gICAgICB9LFxuICAgICAgdGVtcGxhdGVNYW5pcHVsYXRvcnM6IHtcbiAgICAgICAgcHJlV3JhcHBlcjogW10sXG4gICAgICAgIHBvc3RXcmFwcGVyOiBbXVxuICAgICAgfSxcbiAgICAgICRnZXQ6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIF90aGlzMjtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIHNldFR5cGUob3B0aW9ucykge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgICBhbmd1bGFyLmZvckVhY2gob3B0aW9ucywgc2V0VHlwZSk7XG4gICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgICAgY2hlY2tUeXBlKG9wdGlvbnMpO1xuICAgICAgICB0eXBlTWFwW29wdGlvbnMubmFtZV0gPSBvcHRpb25zO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZ2V0RXJyb3IoXCJZb3UgbXVzdCBwcm92aWRlIGFuIG9iamVjdCBvciBhcnJheSBmb3Igc2V0VHlwZS4gWW91IHByb3ZpZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50cykpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFR5cGUobmFtZSwgdGhyb3dFcnJvciwgZXJyb3JDb250ZXh0KSB7XG4gICAgICBpZiAoIW5hbWUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICAgIHZhciB0eXBlID0gdHlwZU1hcFtuYW1lXTtcbiAgICAgIGlmICghdHlwZSAmJiB0aHJvd0Vycm9yID09PSB0cnVlKSB7XG4gICAgICAgIHRocm93IGdldEVycm9yKFwiVGhlcmUgaXMgbm8gdHlwZSBieSB0aGUgbmFtZSBvZiBcXFwiXCIgKyBuYW1lICsgXCJcXFwiOiBcIiArIEpTT04uc3RyaW5naWZ5KGVycm9yQ29udGV4dCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHR5cGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tUeXBlKG9wdGlvbnMpIHtcbiAgICAgIGlmICghb3B0aW9ucy5uYW1lKSB7XG4gICAgICAgIHRocm93IGdldEVycm9yKFwiWW91IG11c3QgcHJvdmlkZSBhIG5hbWUgZm9yIHNldFR5cGUuIFlvdSBwcm92aWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeShhcmd1bWVudHMpKTtcbiAgICAgIH0gZWxzZSBpZiAoIW9wdGlvbnMuZGVmYXVsdE9wdGlvbnMgJiYgIW9wdGlvbnMudGVtcGxhdGUgJiYgIW9wdGlvbnMudGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdGhyb3cgZ2V0RXJyb3IoXCJZb3UgbXVzdCBwcm92aWRlIGRlZmF1bHRPcHRpb25zIE9SIGEgdGVtcGxhdGUgT1IgdGVtcGxhdGVVcmwgZm9yIHNldFR5cGUuIFwiICsgKFwiWW91IHByb3ZpZGVkIG5vbmUgb2YgdGhlc2U6IFwiICsgSlNPTi5zdHJpbmdpZnkoYXJndW1lbnRzKSkpO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLnRlbXBsYXRlICYmIG9wdGlvbnMudGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdGhyb3cgZ2V0RXJyb3IoXCJZb3UgbXVzdCBwcm92aWRlIGF0IG1vc3QgYSB0ZW1wbGF0ZSBPUiB0ZW1wbGF0ZVVybCBmb3Igc2V0VHlwZS4gXCIgKyAoXCJZb3UgcHJvdmlkZWQgYm90aDogXCIgKyBKU09OLnN0cmluZ2lmeShhcmd1bWVudHMpKSk7XG4gICAgICB9XG4gICAgICBpZiAoIW9wdGlvbnMub3ZlcndyaXRlT2spIHtcbiAgICAgICAgY2hlY2tPdmVyd3JpdGUob3B0aW9ucy5uYW1lLCB0eXBlTWFwLCBvcHRpb25zLCBcInR5cGVzXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIG9wdGlvbnMub3ZlcndyaXRlT2s7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gc2V0V3JhcHBlcihvcHRpb25zLCBuYW1lKSB7XG4gICAgICBpZiAoYW5ndWxhci5pc0FycmF5KG9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLm1hcChmdW5jdGlvbiAod3JhcHBlck9wdGlvbnMpIHtcbiAgICAgICAgICByZXR1cm4gc2V0V3JhcHBlcih3cmFwcGVyT3B0aW9ucyk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgIG9wdGlvbnMudHlwZXMgPSBnZXRPcHRpb25zVHlwZXMob3B0aW9ucyk7XG4gICAgICAgIG9wdGlvbnMubmFtZSA9IGdldE9wdGlvbnNOYW1lKG9wdGlvbnMsIG5hbWUpO1xuICAgICAgICBjaGVja1dyYXBwZXJBUEkob3B0aW9ucyk7XG4gICAgICAgIHRlbXBsYXRlV3JhcHBlcnNNYXBbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzU3RyaW5nKG9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiBzZXRXcmFwcGVyKHtcbiAgICAgICAgICB0ZW1wbGF0ZTogb3B0aW9ucyxcbiAgICAgICAgICBuYW1lOiBuYW1lXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9wdGlvbnNUeXBlcyhvcHRpb25zKSB7XG4gICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhvcHRpb25zLnR5cGVzKSkge1xuICAgICAgICByZXR1cm4gW29wdGlvbnMudHlwZXNdO1xuICAgICAgfVxuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnR5cGVzKSkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy50eXBlcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRPcHRpb25zTmFtZShvcHRpb25zLCBuYW1lKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5uYW1lIHx8IG5hbWUgfHwgb3B0aW9ucy50eXBlcy5qb2luKFwiIFwiKSB8fCBkZWZhdWx0V3JhcHBlck5hbWU7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tXcmFwcGVyQVBJKG9wdGlvbnMpIHtcbiAgICAgIGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLmNoZWNrV3JhcHBlcihvcHRpb25zKTtcbiAgICAgIGlmIChvcHRpb25zLnRlbXBsYXRlKSB7XG4gICAgICAgIGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLmNoZWNrV3JhcHBlclRlbXBsYXRlKG9wdGlvbnMudGVtcGxhdGUsIG9wdGlvbnMpO1xuICAgICAgfVxuICAgICAgaWYgKCFvcHRpb25zLm92ZXJ3cml0ZU9rKSB7XG4gICAgICAgIGNoZWNrT3ZlcndyaXRlKG9wdGlvbnMubmFtZSwgdGVtcGxhdGVXcmFwcGVyc01hcCwgb3B0aW9ucywgXCJ0ZW1wbGF0ZVdyYXBwZXJzXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIG9wdGlvbnMub3ZlcndyaXRlT2s7XG4gICAgICB9XG4gICAgICBjaGVja1dyYXBwZXJUeXBlcyhvcHRpb25zKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dyYXBwZXJUeXBlcyhvcHRpb25zKSB7XG4gICAgICB2YXIgc2hvdWxkVGhyb3cgPSAhYW5ndWxhci5pc0FycmF5KG9wdGlvbnMudHlwZXMpIHx8ICFvcHRpb25zLnR5cGVzLmV2ZXJ5KGFuZ3VsYXIuaXNTdHJpbmcpO1xuICAgICAgaWYgKHNob3VsZFRocm93KSB7XG4gICAgICAgIHRocm93IGdldEVycm9yKFwiQXR0ZW1wdGVkIHRvIGNyZWF0ZSBhIHRlbXBsYXRlIHdyYXBwZXIgd2l0aCB0eXBlcyB0aGF0IGlzIG5vdCBhIHN0cmluZyBvciBhbiBhcnJheSBvZiBzdHJpbmdzXCIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrT3ZlcndyaXRlKHByb3BlcnR5LCBvYmplY3QsIG5ld1ZhbHVlLCBvYmplY3ROYW1lKSB7XG4gICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICB3YXJuKFtcIkF0dGVtcHRpbmcgdG8gb3ZlcndyaXRlIFwiICsgcHJvcGVydHkgKyBcIiBvbiBcIiArIG9iamVjdE5hbWUgKyBcIiB3aGljaCBpcyBjdXJyZW50bHlcIiwgXCJcIiArIEpTT04uc3RyaW5naWZ5KG9iamVjdFtwcm9wZXJ0eV0pICsgXCIgd2l0aCBcIiArIEpTT04uc3RyaW5naWZ5KG5ld1ZhbHVlKSwgXCJUbyBzdXByZXNzIHRoaXMgd2FybmluZywgc3BlY2lmeSB0aGUgcHJvcGVydHkgXFxcIm92ZXJ3cml0ZU9rOiB0cnVlXFxcIlwiXS5qb2luKFwiIFwiKSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0V3JhcHBlcihuYW1lKSB7XG4gICAgICByZXR1cm4gdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lIHx8IGRlZmF1bHRXcmFwcGVyTmFtZV07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0V3JhcHBlckJ5VHlwZSh0eXBlKSB7XG4gICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgICB2YXIgd3JhcHBlcnMgPSBbXTtcbiAgICAgIGZvciAodmFyIG5hbWUgaW4gdGVtcGxhdGVXcmFwcGVyc01hcCkge1xuICAgICAgICBpZiAodGVtcGxhdGVXcmFwcGVyc01hcC5oYXNPd25Qcm9wZXJ0eShuYW1lKSkge1xuICAgICAgICAgIGlmICh0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdLnR5cGVzICYmIHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0udHlwZXMuaW5kZXhPZih0eXBlKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHdyYXBwZXJzLnB1c2godGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgICByZXR1cm4gd3JhcHBlcnM7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlV3JhcHBlckJ5TmFtZShuYW1lKSB7XG4gICAgICB2YXIgd3JhcHBlciA9IHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV07XG4gICAgICBkZWxldGUgdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXTtcbiAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVdyYXBwZXJzRm9yVHlwZSh0eXBlKSB7XG4gICAgICB2YXIgd3JhcHBlcnMgPSBnZXRXcmFwcGVyQnlUeXBlKHR5cGUpO1xuICAgICAgaWYgKCF3cmFwcGVycykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNBcnJheSh3cmFwcGVycykpIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZVdyYXBwZXJCeU5hbWUod3JhcHBlcnMubmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3cmFwcGVycy5mb3JFYWNoKGZ1bmN0aW9uICh3cmFwcGVyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlbW92ZVdyYXBwZXJCeU5hbWUod3JhcHBlci5uYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB3cmFwcGVycztcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgICBpZiAoIV90aGlzLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgICBjb25zb2xlLndhcm4uYXBwbHkoY29uc29sZSwgYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZm9ybWx5Q29uZmlnLiRpbmplY3QgPSBbXCJmb3JtbHlVc2FiaWxpdHlQcm92aWRlclwiXTtcblxuXG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmNvbnN0YW50KFwiZm9ybWx5VmVyc2lvblwiLCBWRVJTSU9OKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Byb3ZpZGVycy9mb3JtbHlWZXJzaW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5jb25zdGFudChcImZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXhcIiwgXCJodHRwczovL2dpdGh1Yi5jb20vZm9ybWx5LWpzL2FuZ3VsYXItZm9ybWx5L3dpa2kvRXJyb3JzLWFuZC1XYXJuaW5ncyNcIik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeC5qc1xuICoqIG1vZHVsZSBpZCA9IDExXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZmFjdG9yeShcImZvcm1seVZhbGlkYXRpb25NZXNzYWdlc1wiLCBmdW5jdGlvbiAoKSB7XG4gICAgdmFyIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcyA9IHtcbiAgICAgIGFkZFRlbXBsYXRlT3B0aW9uVmFsdWVNZXNzYWdlOiBhZGRUZW1wbGF0ZU9wdGlvblZhbHVlTWVzc2FnZSxcbiAgICAgIGFkZFN0cmluZ01lc3NhZ2U6IGFkZFN0cmluZ01lc3NhZ2UsXG4gICAgICBtZXNzYWdlczoge31cbiAgICB9O1xuXG4gICAgcmV0dXJuIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcztcblxuICAgIGZ1bmN0aW9uIGFkZFRlbXBsYXRlT3B0aW9uVmFsdWVNZXNzYWdlKG5hbWUsIHByb3AsIHByZWZpeCwgc3VmZml4LCBhbHRlcm5hdGUpIHtcbiAgICAgIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlc1tuYW1lXSA9IHRlbXBsYXRlT3B0aW9uVmFsdWUocHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkU3RyaW5nTWVzc2FnZShuYW1lLCBzdHJpbmcpIHtcbiAgICAgIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlc1tuYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgcmV0dXJuIHN0cmluZztcbiAgICAgIH07XG4gICAgfVxuXG5cbiAgICBmdW5jdGlvbiB0ZW1wbGF0ZU9wdGlvblZhbHVlKHByb3AsIHByZWZpeCwgc3VmZml4LCBhbHRlcm5hdGUpIHtcbiAgICAgIHJldHVybiBmdW5jdGlvbiBnZXRWYWxpZGF0aW9uTWVzc2FnZSh2aWV3VmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKSB7XG4gICAgICAgIGlmIChzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9uc1twcm9wXSkge1xuICAgICAgICAgIHJldHVybiBcIlwiICsgcHJlZml4ICsgXCIgXCIgKyBzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9uc1twcm9wXSArIFwiIFwiICsgc3VmZml4O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiBhbHRlcm5hdGU7XG4gICAgICAgIH1cbiAgICAgIH07XG4gICAgfVxuICB9KTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3Byb3ZpZGVycy9mb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyLWZpeFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZmFjdG9yeShcImZvcm1seVV0aWxcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBvYmplY3RQcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoe30pO1xuICAgIHZhciBhcnJheVByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihbXSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZvcm1seUV2YWw6IGZvcm1seUV2YWwsXG4gICAgICBnZXRGaWVsZElkOiBnZXRGaWVsZElkLFxuICAgICAgcmV2ZXJzZURlZXBNZXJnZTogcmV2ZXJzZURlZXBNZXJnZVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBmb3JtbHlFdmFsKHNjb3BlLCBleHByZXNzaW9uLCBtb2RlbFZhbHVlLCB2aWV3VmFsdWUpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZXhwcmVzc2lvbikpIHtcbiAgICAgICAgcmV0dXJuIGV4cHJlc3Npb24odmlld1ZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2NvcGUuJGV2YWwoZXhwcmVzc2lvbiwge1xuICAgICAgICAgICR2aWV3VmFsdWU6IHZpZXdWYWx1ZSxcbiAgICAgICAgICAkbW9kZWxWYWx1ZTogbW9kZWxWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZElkKGZvcm1JZCwgb3B0aW9ucywgaW5kZXgpIHtcbiAgICAgIHZhciB0eXBlID0gb3B0aW9ucy50eXBlO1xuICAgICAgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICAgICAgdHlwZSA9IFwidGVtcGxhdGVcIjtcbiAgICAgIH0gZWxzZSBpZiAoIXR5cGUgJiYgb3B0aW9ucy50ZW1wbGF0ZVVybCkge1xuICAgICAgICB0eXBlID0gXCJ0ZW1wbGF0ZVVybFwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW2Zvcm1JZCwgdHlwZSwgb3B0aW9ucy5rZXksIGluZGV4XS5qb2luKFwiX1wiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXZlcnNlRGVlcE1lcmdlKCkge1xuICAgICAgdmFyIHJlYWxSZXMgPSBhcmd1bWVudHNbMF07XG4gICAgICB2YXIgcmVzID0ge307XG4gICAgICBhbmd1bGFyLmZvckVhY2goW10uY29uY2F0KF9zbGljZS5jYWxsKGFyZ3VtZW50cykpLnJldmVyc2UoKSwgZnVuY3Rpb24gKHNyYykge1xuICAgICAgICBpZiAoIXNyYykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhbmd1bGFyLmZvckVhY2goc3JjLCBmdW5jdGlvbiAodmFsLCBwcm9wKSB7XG4gICAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiICYmIHZhbCAhPT0gbnVsbCAmJiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbCkgPT09IG9iamVjdFByb3RvdHlwZSB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsKSA9PT0gYXJyYXlQcm90b3R5cGUpKSB7XG4gICAgICAgICAgICB2YXIgZGVlcFJlcyA9IHJlc1twcm9wXTtcbiAgICAgICAgICAgIGlmICghZGVlcFJlcyAmJiBhbmd1bGFyLmlzQXJyYXkodmFsKSkge1xuICAgICAgICAgICAgICBkZWVwUmVzID0gW107XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFkZWVwUmVzKSB7XG4gICAgICAgICAgICAgIGRlZXBSZXMgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc1twcm9wXSA9IHJldmVyc2VEZWVwTWVyZ2UoZGVlcFJlcywgdmFsKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHZhbCkpIHtcbiAgICAgICAgICAgIHJlc1twcm9wXSA9IHZhbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBhbmd1bGFyLmZvckVhY2gocmVhbFJlcywgZnVuY3Rpb24gKHZhbCwgcHJvcCkge1xuICAgICAgICBkZWxldGUgcmVhbFJlc1twcm9wXTtcbiAgICAgIH0pO1xuICAgICAgYW5ndWxhci5mb3JFYWNoKHJlcywgZnVuY3Rpb24gKHZhbCwgcHJvcCkge1xuICAgICAgICByZWFsUmVzW3Byb3BdID0gdmFsO1xuICAgICAgfSk7XG4gICAgICByZXMgPSByZWFsUmVzO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgfSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zZXJ2aWNlcy9mb3JtbHlVdGlsLmpzXG4gKiogbW9kdWxlIGlkID0gMTNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3RvQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7IHJldHVybiBBcnJheS5pc0FycmF5KGFycikgPyBhcnIgOiBBcnJheS5mcm9tKGFycik7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmZhY3RvcnkoXCJmb3JtbHlXYXJuXCIsIFtcImZvcm1seUNvbmZpZ1wiLCBcImZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXhcIiwgXCIkbG9nXCIsIGZ1bmN0aW9uIChmb3JtbHlDb25maWcsIGZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXgsICRsb2cpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gd2FybigpIHtcbiAgICAgIGlmICghZm9ybWx5Q29uZmlnLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciB3YXJuSW5mb1NsdWcgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIGFyZ3MudW5zaGlmdChcIkZvcm1seSBXYXJuaW5nOlwiKTtcbiAgICAgICAgYXJncy5wdXNoKFwiXCIgKyBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4ICsgXCJcIiArIHdhcm5JbmZvU2x1Zyk7XG4gICAgICAgICRsb2cud2Fybi5hcHBseSgkbG9nLCBfdG9BcnJheShhcmdzKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2VydmljZXMvZm9ybWx5V2Fybi5qc1xuICoqIG1vZHVsZSBpZCA9IDE0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKFwiZm9ybWx5Q3VzdG9tVmFsaWRhdGlvblwiLCBbXCJmb3JtbHlVdGlsXCIsIFwiJHFcIiwgZnVuY3Rpb24gKGZvcm1seVV0aWwsICRxKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlcXVpcmU6IFwibmdNb2RlbFwiLFxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCwgYXR0cnMsIGN0cmwpIHtcbiAgICAgICAgdmFyIHZhbGlkYXRvcnMgPSBzY29wZS4kZXZhbChhdHRycy5mb3JtbHlDdXN0b21WYWxpZGF0aW9uKTtcbiAgICAgICAgaWYgKCF2YWxpZGF0b3JzKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNoZWNrVmFsaWRhdG9ycyh2YWxpZGF0b3JzKTtcbiAgICAgICAgc2NvcGUub3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzID0gc2NvcGUub3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzIHx8IHt9O1xuXG4gICAgICAgIC8vIHNldHVwIHdhdGNoZXJzIGFuZCBwYXJzZXJzXG4gICAgICAgIHZhciBoYXNWYWxpZGF0b3JzID0gY3RybC5oYXNPd25Qcm9wZXJ0eShcIiR2YWxpZGF0b3JzXCIpO1xuICAgICAgICBhbmd1bGFyLmZvckVhY2godmFsaWRhdG9ycywgZnVuY3Rpb24gKHZhbGlkYXRvciwgbmFtZSkge1xuICAgICAgICAgIHZhciBtZXNzYWdlID0gdmFsaWRhdG9yLm1lc3NhZ2U7XG4gICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlc1tuYW1lXSA9IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgbWVzc2FnZSwgY3RybC4kbW9kZWxWYWx1ZSwgY3RybC4kdmlld1ZhbHVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbGlkYXRvciA9IGFuZ3VsYXIuaXNPYmplY3QodmFsaWRhdG9yKSA/IHZhbGlkYXRvci5leHByZXNzaW9uIDogdmFsaWRhdG9yO1xuICAgICAgICAgIGlmIChoYXNWYWxpZGF0b3JzKSB7XG4gICAgICAgICAgICB2YXIgaXNQb3NzaWJseUFzeW5jID0gIWFuZ3VsYXIuaXNTdHJpbmcodmFsaWRhdG9yKTtcbiAgICAgICAgICAgIHZhciB2YWxpZGF0b3JDb2xsZWN0aW9uID0gaXNQb3NzaWJseUFzeW5jID8gXCIkYXN5bmNWYWxpZGF0b3JzXCIgOiBcIiR2YWxpZGF0b3JzXCI7XG4gICAgICAgICAgICBjdHJsW3ZhbGlkYXRvckNvbGxlY3Rpb25dW25hbWVdID0gZnVuY3Rpb24gKG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIHZhbGlkYXRvciwgbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKGlzUG9zc2libHlBc3luYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc1Byb21pc2VMaWtlKHZhbHVlKSA/IHZhbHVlIDogdmFsdWUgPyAkcS53aGVuKHZhbHVlKSA6ICRxLnJlamVjdCh2YWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjdHJsLiRwYXJzZXJzLnVuc2hpZnQoZnVuY3Rpb24gKHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgaXNWYWxpZCA9IGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgdmFsaWRhdG9yLCBjdHJsLiRtb2RlbFZhbHVlLCB2aWV3VmFsdWUpO1xuICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShuYW1lLCBpc1ZhbGlkKTtcbiAgICAgICAgICAgICAgcmV0dXJuIHZpZXdWYWx1ZTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgICBmdW5jdGlvbiBpc1Byb21pc2VMaWtlKG9iaikge1xuICAgICAgcmV0dXJuIG9iaiAmJiBhbmd1bGFyLmlzRnVuY3Rpb24ob2JqLnRoZW4pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrVmFsaWRhdG9ycyh2YWxpZGF0b3JzKSB7XG4gICAgICB2YXIgYWxsb3dlZFByb3BlcnRpZXMgPSBbXCJleHByZXNzaW9uXCIsIFwibWVzc2FnZVwiXTtcbiAgICAgIHZhciB2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMgPSB7fTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3JzLCBmdW5jdGlvbiAodmFsaWRhdG9yLCBuYW1lKSB7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHZhbGlkYXRvcikpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV4dHJhUHJvcHMgPSBbXTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvciwgZnVuY3Rpb24gKHYsIGtleSkge1xuICAgICAgICAgIGlmIChhbGxvd2VkUHJvcGVydGllcy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICBleHRyYVByb3BzLnB1c2goa2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZXh0cmFQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICB2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHNbbmFtZV0gPSBleHRyYVByb3BzO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChPYmplY3Qua2V5cyh2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMpLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoW1wiVmFsaWRhdG9ycyBhcmUgb25seSBhbGxvd2VkIHRvIGJlIGZ1bmN0aW9ucyBvciBvYmplY3RzIHRoYXQgaGF2ZSBcIiArIGFsbG93ZWRQcm9wZXJ0aWVzLmpvaW4oXCIsIFwiKSArIFwiLlwiLCBcIllvdSBwcm92aWRlZCBzb21lIGV4dHJhIHByb3BlcnRpZXM6IFwiICsgSlNPTi5zdHJpbmdpZnkodmFsaWRhdG9yc1dpdGhFeHRyYVByb3BzKV0uam9pbihcIiBcIikpO1xuICAgICAgfVxuICAgIH1cbiAgfV0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGlyZWN0aXZlcy9mb3JtbHktY3VzdG9tLXZhbGlkYXRpb24uanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5kaXJlY3RpdmUoXCJmb3JtbHlGaWVsZFwiLCBmb3JtbHlGaWVsZCk7XG5cbiAgZm9ybWx5RmllbGQudGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZShcIi4vZm9ybWx5LWZpZWxkLnRlc3RcIikobmdNb2R1bGUpIDogbnVsbDtcblxuICBmdW5jdGlvbiBmb3JtbHlGaWVsZCgkaHR0cCwgJHEsICRjb21waWxlLCAkdGVtcGxhdGVDYWNoZSwgZm9ybWx5Q29uZmlnLCBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMsIGZvcm1seVV0aWwsIGZvcm1seVVzYWJpbGl0eSwgZm9ybWx5V2Fybikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogXCJBRVwiLFxuICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIG9wdGlvbnM6IFwiPVwiLFxuICAgICAgICBtb2RlbDogXCI9XCIsXG4gICAgICAgIGZvcm1JZDogXCI9P1wiLFxuICAgICAgICBpbmRleDogXCI9P1wiLFxuICAgICAgICBmaWVsZHM6IFwiPT9cIixcbiAgICAgICAgZm9ybTogXCI9P1wiXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogW1wiJHNjb3BlXCIsIFwiJGludGVydmFsXCIsIFwiJHRpbWVvdXRcIiwgXCIkcGFyc2VcIiwgXCIkY29udHJvbGxlclwiLCBmdW5jdGlvbiBmaWVsZENvbnRyb2xsZXIoJHNjb3BlLCAkaW50ZXJ2YWwsICR0aW1lb3V0LCAkcGFyc2UsICRjb250cm9sbGVyKSB7XG4gICAgICAgIHZhciBvcHRzID0gJHNjb3BlLm9wdGlvbnM7XG4gICAgICAgIHZhciBmaWVsZFR5cGUgPSBvcHRzLnR5cGUgJiYgZm9ybWx5Q29uZmlnLmdldFR5cGUob3B0cy50eXBlKTtcbiAgICAgICAgc2ltcGxpZnlMaWZlKG9wdHMpO1xuICAgICAgICBtZXJnZUZpZWxkT3B0aW9uc1dpdGhUeXBlRGVmYXVsdHMob3B0cywgZmllbGRUeXBlKTtcbiAgICAgICAgYXBpQ2hlY2sob3B0cyk7XG4gICAgICAgIC8vIHNldCBmaWVsZCBpZCB0byBsaW5rIGxhYmVscyBhbmQgZmllbGRzXG4gICAgICAgICRzY29wZS5pZCA9IGZvcm1seVV0aWwuZ2V0RmllbGRJZCgkc2NvcGUuZm9ybUlkLCBvcHRzLCAkc2NvcGUuaW5kZXgpO1xuXG4gICAgICAgIC8vIGluaXRhbGl6YXRpb25cbiAgICAgICAgZXh0ZW5kT3B0aW9uc1dpdGhEZWZhdWx0cyhvcHRzLCAkc2NvcGUuaW5kZXgpO1xuICAgICAgICBydW5FeHByZXNzaW9ucygpO1xuICAgICAgICBzZXRGb3JtQ29udHJvbCgkc2NvcGUsIG9wdHMsICRpbnRlcnZhbCk7XG4gICAgICAgIGFkZE1vZGVsV2F0Y2hlcigkc2NvcGUsIG9wdHMpO1xuICAgICAgICBhZGRTaG93TWVzc2FnZXNXYXRjaGVyKCRzY29wZSwgb3B0cyk7XG4gICAgICAgIGFkZFZhbGlkYXRpb25NZXNzYWdlcyhvcHRzKTtcbiAgICAgICAgaW52b2tlQ29udHJvbGxlcnMoJHNjb3BlLCBvcHRzLCBmaWVsZFR5cGUpO1xuXG4gICAgICAgIC8vIGZ1bmN0aW9uIGRlZmluaXRpb25zXG4gICAgICAgIGZ1bmN0aW9uIHJ1bkV4cHJlc3Npb25zKCkge1xuICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIC8vIG11c3QgcnVuIG9uIG5leHQgdGljayB0byBtYWtlIHN1cmUgdGhhdCB0aGUgY3VycmVudCB2YWx1ZSBpcyBjb3JyZWN0LlxuICAgICAgICAgICAgdmFyIGZpZWxkID0gJHNjb3BlLm9wdGlvbnM7XG4gICAgICAgICAgICB2YXIgY3VycmVudFZhbHVlID0gdmFsdWVHZXR0ZXJTZXR0ZXIoKTtcbiAgICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChmaWVsZC5leHByZXNzaW9uUHJvcGVydGllcywgZnVuY3Rpb24gcnVuRXhwcmVzc2lvbihleHByZXNzaW9uLCBwcm9wKSB7XG4gICAgICAgICAgICAgIHZhciBzZXR0ZXIgPSAkcGFyc2UocHJvcCkuYXNzaWduO1xuICAgICAgICAgICAgICB2YXIgcHJvbWlzZSA9ICRxLndoZW4oZm9ybWx5VXRpbC5mb3JtbHlFdmFsKCRzY29wZSwgZXhwcmVzc2lvbiwgY3VycmVudFZhbHVlKSk7XG4gICAgICAgICAgICAgIHByb21pc2UudGhlbihmdW5jdGlvbiAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICBzZXR0ZXIoZmllbGQsIHZhbHVlKTtcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHZhbHVlR2V0dGVyU2V0dGVyKG5ld1ZhbCkge1xuICAgICAgICAgIGlmICghJHNjb3BlLm1vZGVsIHx8ICEkc2NvcGUub3B0aW9ucy5rZXkpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG5ld1ZhbCkpIHtcbiAgICAgICAgICAgICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldID0gbmV3VmFsO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV07XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBzaW1wbGlmeUxpZmUob3B0aW9ucykge1xuICAgICAgICAgIC8vIGFkZCBhIGZldyBlbXB0eSBvYmplY3RzIChpZiB0aGV5IGRvbid0IGFscmVhZHkgZXhpc3QpIHNvIHlvdSBkb24ndCBoYXZlIHRvIHVuZGVmaW5lZCBjaGVjayBldmVyeXdoZXJlXG4gICAgICAgICAgZm9ybWx5VXRpbC5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIHtcbiAgICAgICAgICAgIGRhdGE6IHt9LFxuICAgICAgICAgICAgdGVtcGxhdGVPcHRpb25zOiB7fSxcbiAgICAgICAgICAgIHZhbGlkYXRpb246IHt9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtZXJnZUZpZWxkT3B0aW9uc1dpdGhUeXBlRGVmYXVsdHMob3B0aW9ucywgdHlwZSkge1xuICAgICAgICAgIGlmICh0eXBlKSB7XG4gICAgICAgICAgICBtZXJnZU9wdGlvbnMob3B0aW9ucywgdHlwZS5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBwcm9wZXJPcmRlciA9IGFycmF5aWZ5KG9wdGlvbnMub3B0aW9uc1R5cGVzKS5yZXZlcnNlKCk7IC8vIHNvIHRoZSByaWdodCB0aGluZ3MgYXJlIG92ZXJyaWRkZW5cbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2gocHJvcGVyT3JkZXIsIGZ1bmN0aW9uICh0eXBlTmFtZSkge1xuICAgICAgICAgICAgbWVyZ2VPcHRpb25zKG9wdGlvbnMsIGZvcm1seUNvbmZpZy5nZXRUeXBlKHR5cGVOYW1lLCB0cnVlLCBvcHRpb25zKS5kZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtZXJnZU9wdGlvbnMob3B0aW9ucywgZXh0cmFPcHRpb25zKSB7XG4gICAgICAgICAgaWYgKGV4dHJhT3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihleHRyYU9wdGlvbnMpKSB7XG4gICAgICAgICAgICAgIGV4dHJhT3B0aW9ucyA9IGV4dHJhT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGZvcm1seVV0aWwucmV2ZXJzZURlZXBNZXJnZShvcHRpb25zLCBleHRyYU9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGV4dGVuZE9wdGlvbnNXaXRoRGVmYXVsdHMob3B0aW9ucywgaW5kZXgpIHtcbiAgICAgICAgICBhbmd1bGFyLmV4dGVuZChvcHRpb25zLCB7XG4gICAgICAgICAgICAvLyBhdHRhY2ggdGhlIGtleSBpbiBjYXNlIHRoZSBmb3JtbHktZmllbGQgZGlyZWN0aXZlIGlzIHVzZWQgZGlyZWN0bHlcbiAgICAgICAgICAgIGtleTogb3B0aW9ucy5rZXkgfHwgaW5kZXggfHwgMCxcbiAgICAgICAgICAgIHZhbHVlOiB2YWx1ZUdldHRlclNldHRlcixcbiAgICAgICAgICAgIHJ1bkV4cHJlc3Npb25zOiBydW5FeHByZXNzaW9uc1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gaW5pdGlhbGl6YXRpb24gZnVuY3Rpb25zXG4gICAgICAgIGZ1bmN0aW9uIHNldEZvcm1Db250cm9sKHNjb3BlLCBvcHRpb25zLCAkaW50ZXJ2YWwpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5ub0Zvcm1Db250cm9sKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciBzdG9wV2FpdGluZ0ZvckRlc3Ryb3k7XG4gICAgICAgICAgdmFyIG1heFRpbWUgPSAyMDAwO1xuICAgICAgICAgIHZhciBpbnRlcnZhbFRpbWUgPSA1O1xuICAgICAgICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICAgICAgICB2YXIgaW50ZXJ2YWwgPSAkaW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXRlcmF0aW9ucysrO1xuICAgICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLmtleSkpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIGNsZWFuVXAoKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciBmb3JtQ29udHJvbCA9IHNjb3BlLmZvcm0gJiYgc2NvcGUuZm9ybVtzY29wZS5pZF07XG4gICAgICAgICAgICBpZiAoZm9ybUNvbnRyb2wpIHtcbiAgICAgICAgICAgICAgb3B0aW9ucy5mb3JtQ29udHJvbCA9IGZvcm1Db250cm9sO1xuICAgICAgICAgICAgICBjbGVhblVwKCk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGludGVydmFsVGltZSAqIGl0ZXJhdGlvbnMgPiBtYXhUaW1lKSB7XG4gICAgICAgICAgICAgIGZvcm1seVdhcm4oXCJjb3VsZG50LXNldC10aGUtZm9ybWNvbnRyb2wtYWZ0ZXItdGltZW1zXCIsIFwiQ291bGRuJ3Qgc2V0IHRoZSBmb3JtQ29udHJvbCBhZnRlciBcIiArIG1heFRpbWUgKyBcIm1zXCIsIHNjb3BlKTtcbiAgICAgICAgICAgICAgY2xlYW5VcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGludGVydmFsVGltZSk7XG4gICAgICAgICAgc3RvcFdhaXRpbmdGb3JEZXN0cm95ID0gc2NvcGUuJG9uKFwiJGRlc3Ryb3lcIiwgY2xlYW5VcCk7XG5cbiAgICAgICAgICBmdW5jdGlvbiBjbGVhblVwKCkge1xuICAgICAgICAgICAgc3RvcFdhaXRpbmdGb3JEZXN0cm95KCk7XG4gICAgICAgICAgICAkaW50ZXJ2YWwuY2FuY2VsKGludGVydmFsKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRNb2RlbFdhdGNoZXIoc2NvcGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5tb2RlbCkge1xuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKFwib3B0aW9ucy5tb2RlbFwiLCBydW5FeHByZXNzaW9ucywgdHJ1ZSk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkU2hvd01lc3NhZ2VzV2F0Y2hlcihzY29wZSwgb3B0aW9ucykge1xuICAgICAgICAgIHZhciBleHByZXNzaW9uID0gXCJvcHRpb25zLmZvcm1Db250cm9sLiRpbnZhbGlkICYmIChvcHRpb25zLmZvcm1Db250cm9sLiR0b3VjaGVkIHx8IG9wdGlvbnMudmFsaWRhdGlvbi5zaG93KVwiO1xuICAgICAgICAgIHNjb3BlLiR3YXRjaChleHByZXNzaW9uLCBmdW5jdGlvbiAoc2hvdykge1xuICAgICAgICAgICAgb3B0aW9ucy52YWxpZGF0aW9uLmVycm9yRXhpc3RzQW5kU2hvdWxkQmVWaXNpYmxlID0gc2hvdztcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZFZhbGlkYXRpb25NZXNzYWdlcyhvcHRpb25zKSB7XG4gICAgICAgICAgb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzID0gb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzIHx8IHt9O1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMubWVzc2FnZXMsIGZ1bmN0aW9uIChleHByZXNzaW9uLCBuYW1lKSB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlc1tuYW1lXSkge1xuICAgICAgICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXNbbmFtZV0gPSBmdW5jdGlvbiAodmlld1ZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIGV4cHJlc3Npb24sIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBpbnZva2VDb250cm9sbGVycyhzY29wZSkge1xuICAgICAgICAgIHZhciBvcHRpb25zID0gYXJndW1lbnRzWzFdID09PSB1bmRlZmluZWQgPyB7fSA6IGFyZ3VtZW50c1sxXTtcbiAgICAgICAgICB2YXIgdHlwZSA9IGFyZ3VtZW50c1syXSA9PT0gdW5kZWZpbmVkID8ge30gOiBhcmd1bWVudHNbMl07XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKFt0eXBlLmNvbnRyb2xsZXIsIG9wdGlvbnMuY29udHJvbGxlcl0sIGZ1bmN0aW9uIChjb250cm9sbGVyKSB7XG4gICAgICAgICAgICBpZiAoY29udHJvbGxlcikge1xuICAgICAgICAgICAgICAkY29udHJvbGxlcihjb250cm9sbGVyLCB7ICRzY29wZTogc2NvcGUgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1dLFxuICAgICAgbGluazogZnVuY3Rpb24gZmllbGRMaW5rKHNjb3BlLCBlbCkge1xuICAgICAgICB2YXIgdHlwZSA9IHNjb3BlLm9wdGlvbnMudHlwZSAmJiBmb3JtbHlDb25maWcuZ2V0VHlwZShzY29wZS5vcHRpb25zLnR5cGUpO1xuICAgICAgICB2YXIgYXJncyA9IGFyZ3VtZW50cztcbiAgICAgICAgdmFyIHRodXNseSA9IHRoaXM7XG4gICAgICAgIGdldEZpZWxkVGVtcGxhdGUoc2NvcGUub3B0aW9ucykudGhlbihydW5NYW5pcHVsYXRvcnMoZm9ybWx5Q29uZmlnLnRlbXBsYXRlTWFuaXB1bGF0b3JzLnByZVdyYXBwZXIpKS50aGVuKHRyYW5zY2x1ZGVJbldyYXBwZXJzKHNjb3BlLm9wdGlvbnMpKS50aGVuKHJ1bk1hbmlwdWxhdG9ycyhmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucG9zdFdyYXBwZXIpKS50aGVuKHNldEVsZW1lbnRUZW1wbGF0ZSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICBmb3JtbHlXYXJuKFwidGhlcmUtd2FzLWEtcHJvYmxlbS1zZXR0aW5nLXRoZS10ZW1wbGF0ZS1mb3ItdGhpcy1maWVsZFwiLCBcIlRoZXJlIHdhcyBhIHByb2JsZW0gc2V0dGluZyB0aGUgdGVtcGxhdGUgZm9yIHRoaXMgZmllbGQgXCIsIHNjb3BlLm9wdGlvbnMsIGVycm9yKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0RWxlbWVudFRlbXBsYXRlKHRlbXBsYXRlRWwpIHtcbiAgICAgICAgICBlbC5odG1sKGFzSHRtbCh0ZW1wbGF0ZUVsKSk7XG4gICAgICAgICAgJGNvbXBpbGUoZWwuY29udGVudHMoKSkoc2NvcGUpO1xuICAgICAgICAgIGlmICh0eXBlICYmIHR5cGUubGluaykge1xuICAgICAgICAgICAgdHlwZS5saW5rLmFwcGx5KHRodXNseSwgYXJncyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChzY29wZS5vcHRpb25zLmxpbmspIHtcbiAgICAgICAgICAgIHNjb3BlLm9wdGlvbnMubGluay5hcHBseSh0aHVzbHksIGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJ1bk1hbmlwdWxhdG9ycyhtYW5pcHVsYXRvcnMpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gcnVuTWFuaXB1bGF0b3JzT25UZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgdmFyIGNoYWluID0gJHEud2hlbih0ZW1wbGF0ZSk7XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2gobWFuaXB1bGF0b3JzLCBmdW5jdGlvbiAobWFuaXB1bGF0b3IpIHtcbiAgICAgICAgICAgICAgY2hhaW4gPSBjaGFpbi50aGVuKGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKG1hbmlwdWxhdG9yKHRlbXBsYXRlLCBzY29wZS5vcHRpb25zLCBzY29wZSkpLnRoZW4oZnVuY3Rpb24gKG5ld1RlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc1N0cmluZyhuZXdUZW1wbGF0ZSkgPyBuZXdUZW1wbGF0ZSA6IGFzSHRtbChuZXdUZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhc0h0bWwoZWwpIHtcbiAgICAgIHZhciB3cmFwcGVyID0gYW5ndWxhci5lbGVtZW50KFwiPGE+PC9hPlwiKTtcbiAgICAgIHJldHVybiB3cmFwcGVyLmFwcGVuZChlbCkuaHRtbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZpZWxkVGVtcGxhdGUob3B0aW9ucykge1xuICAgICAgdmFyIHR5cGUgPSBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRpb25zLnR5cGUsIHRydWUsIG9wdGlvbnMpO1xuICAgICAgdmFyIHRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZSB8fCB0eXBlICYmIHR5cGUudGVtcGxhdGU7XG4gICAgICB2YXIgdGVtcGxhdGVVcmwgPSBvcHRpb25zLnRlbXBsYXRlVXJsIHx8IHR5cGUgJiYgdHlwZS50ZW1wbGF0ZVVybDtcbiAgICAgIGlmICghdGVtcGxhdGUgJiYgIXRlbXBsYXRlVXJsKSB7XG4gICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFwidGVtcGxhdGUtdHlwZS10eXBlLW5vdC1zdXBwb3J0ZWRcIiwgXCJ0ZW1wbGF0ZSB0eXBlICdcIiArIG9wdGlvbnMudHlwZSArIFwiJyBub3Qgc3VwcG9ydGVkLiBPbiBlbGVtZW50OlwiLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRUZW1wbGF0ZSh0ZW1wbGF0ZSB8fCB0ZW1wbGF0ZVVybCwgIXRlbXBsYXRlKTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGdldFRlbXBsYXRlKHRlbXBsYXRlLCBpc1VybCkge1xuICAgICAgaWYgKCFpc1VybCkge1xuICAgICAgICByZXR1cm4gJHEud2hlbih0ZW1wbGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaHR0cE9wdGlvbnMgPSB7IGNhY2hlOiAkdGVtcGxhdGVDYWNoZSB9O1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHRlbXBsYXRlLCBodHRwT3B0aW9ucykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICBmb3JtbHlXYXJuKFwicHJvYmxlbS1sb2FkaW5nLXRlbXBsYXRlLWZvci10ZW1wbGF0ZXVybFwiLCBcIlByb2JsZW0gbG9hZGluZyB0ZW1wbGF0ZSBmb3IgXCIgKyB0ZW1wbGF0ZSwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2NsdWRlSW5XcmFwcGVycyhvcHRpb25zKSB7XG4gICAgICB2YXIgd3JhcHBlciA9IGdldFdyYXBwZXJPcHRpb24ob3B0aW9ucyk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiB0cmFuc2NsdWRlVGVtcGxhdGUodGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCF3cmFwcGVyLmxlbmd0aCkge1xuICAgICAgICAgIHJldHVybiAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHdyYXBwZXIuZm9yRWFjaChmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyKTtcbiAgICAgICAgdmFyIHByb21pc2VzID0gd3JhcHBlci5tYXAoZnVuY3Rpb24gKHcpIHtcbiAgICAgICAgICByZXR1cm4gZ2V0VGVtcGxhdGUody50ZW1wbGF0ZSB8fCB3LnRlbXBsYXRlVXJsLCAhdy50ZW1wbGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gJHEuYWxsKHByb21pc2VzKS50aGVuKGZ1bmN0aW9uICh3cmFwcGVyc1RlbXBsYXRlcykge1xuICAgICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLmZvckVhY2goZnVuY3Rpb24gKHdyYXBwZXJUZW1wbGF0ZSwgaW5kZXgpIHtcbiAgICAgICAgICAgIGZvcm1seVVzYWJpbGl0eS5jaGVja1dyYXBwZXJUZW1wbGF0ZSh3cmFwcGVyVGVtcGxhdGUsIHdyYXBwZXJbaW5kZXhdKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICB3cmFwcGVyc1RlbXBsYXRlcy5yZXZlcnNlKCk7IC8vIHdyYXBwZXIgMCBpcyB3cmFwcGVkIGluIHdyYXBwZXIgMSBhbmQgc28gb24uLi5cbiAgICAgICAgICB2YXIgdG90YWxXcmFwcGVyID0gd3JhcHBlcnNUZW1wbGF0ZXMuc2hpZnQoKTtcbiAgICAgICAgICB3cmFwcGVyc1RlbXBsYXRlcy5mb3JFYWNoKGZ1bmN0aW9uICh3cmFwcGVyVGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHRvdGFsV3JhcHBlciA9IGRvVHJhbnNjbHVzaW9uKHRvdGFsV3JhcHBlciwgd3JhcHBlclRlbXBsYXRlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm4gZG9UcmFuc2NsdXNpb24odG90YWxXcmFwcGVyLCB0ZW1wbGF0ZSk7XG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkb1RyYW5zY2x1c2lvbih3cmFwcGVyLCB0ZW1wbGF0ZSkge1xuICAgICAgdmFyIHN1cGVyV3JhcHBlciA9IGFuZ3VsYXIuZWxlbWVudChcIjxhPjwvYT5cIik7IC8vIHRoaXMgYWxsb3dzIHBlb3BsZSBub3QgaGF2ZSB0byBoYXZlIGEgc2luZ2xlIHJvb3QgaW4gd3JhcHBlcnNcbiAgICAgIHN1cGVyV3JhcHBlci5hcHBlbmQod3JhcHBlcik7XG4gICAgICB2YXIgdHJhbnNjbHVkZUVsID0gc3VwZXJXcmFwcGVyLmZpbmQoXCJmb3JtbHktdHJhbnNjbHVkZVwiKTtcbiAgICAgIHRyYW5zY2x1ZGVFbC5yZXBsYWNlV2l0aCh0ZW1wbGF0ZSk7XG4gICAgICByZXR1cm4gc3VwZXJXcmFwcGVyLmh0bWwoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXcmFwcGVyT3B0aW9uKG9wdGlvbnMpIHtcbiAgICAgIHZhciB3cmFwcGVyID0gb3B0aW9ucy53cmFwcGVyO1xuICAgICAgLy8gZXhwbGljaXQgbnVsbCBtZWFucyBubyB3cmFwcGVyXG4gICAgICBpZiAod3JhcHBlciA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIG5vdGhpbmcgc3BlY2lmaWVkIG1lYW5zIHVzZSB0aGUgZGVmYXVsdCB3cmFwcGVyIGZvciB0aGUgdHlwZVxuICAgICAgaWYgKCF3cmFwcGVyKSB7XG4gICAgICAgIC8vIGdldCBhbGwgd3JhcHBlcnMgdGhhdCBzcGVjaWZ5IHRoZXkgYXBwbHkgdG8gdGhpcyB0eXBlXG4gICAgICAgIHdyYXBwZXIgPSBhcnJheWlmeShmb3JtbHlDb25maWcuZ2V0V3JhcHBlckJ5VHlwZShvcHRpb25zLnR5cGUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyYXBwZXIgPSBhcnJheWlmeSh3cmFwcGVyKS5tYXAoZm9ybWx5Q29uZmlnLmdldFdyYXBwZXIpO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgYWxsIHdyYXBwZXJzIGZvciB0aGF0IHRoaXMgdHlwZSBzcGVjaWZpZWQgdGhhdCBpdCB1c2VzLlxuICAgICAgdmFyIHR5cGUgPSBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRpb25zLnR5cGUsIHRydWUsIG9wdGlvbnMpO1xuICAgICAgaWYgKHR5cGUgJiYgdHlwZS53cmFwcGVyKSB7XG4gICAgICAgIHZhciB0eXBlV3JhcHBlcnMgPSBhcnJheWlmeSh0eXBlLndyYXBwZXIpLm1hcChmb3JtbHlDb25maWcuZ2V0V3JhcHBlcik7XG4gICAgICAgIHdyYXBwZXIgPSB3cmFwcGVyLmNvbmNhdCh0eXBlV3JhcHBlcnMpO1xuICAgICAgfVxuXG4gICAgICAvLyBhZGQgdGhlIGRlZmF1bHQgd3JhcHBlciBsYXN0XG4gICAgICB2YXIgZGVmYXVsdFdyYXBwZXIgPSBmb3JtbHlDb25maWcuZ2V0V3JhcHBlcigpO1xuICAgICAgaWYgKGRlZmF1bHRXcmFwcGVyKSB7XG4gICAgICAgIHdyYXBwZXIucHVzaChkZWZhdWx0V3JhcHBlcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhcGlDaGVjayhvcHRpb25zKSB7XG4gICAgICB2YXIgdGVtcGxhdGVPcHRpb25zID0gZ2V0VGVtcGxhdGVPcHRpb25zQ291bnQob3B0aW9ucyk7XG4gICAgICBpZiAodGVtcGxhdGVPcHRpb25zID09PSAwKSB7XG4gICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFwieW91LW11c3QtcHJvdmlkZS1vbmUtb2YtdHlwZS10ZW1wbGF0ZS1vci10ZW1wbGF0ZXVybC1mb3ItYS1maWVsZFwiLCBcIllvdSBtdXN0IHByb3ZpZGUgb25lIG9mIHR5cGUsIHRlbXBsYXRlLCBvciB0ZW1wbGF0ZVVybCBmb3IgYSBmaWVsZFwiLCBvcHRpb25zKTtcbiAgICAgIH0gZWxzZSBpZiAodGVtcGxhdGVPcHRpb25zID4gMSkge1xuICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0RmllbGRFcnJvcihcInlvdS1tdXN0LW9ubHktcHJvdmlkZS1hLXR5cGUtdGVtcGxhdGUtb3ItdGVtcGxhdGV1cmwtZm9yLWEtZmllbGRcIiwgXCJZb3UgbXVzdCBvbmx5IHByb3ZpZGUgYSB0eXBlLCB0ZW1wbGF0ZSwgb3IgdGVtcGxhdGVVcmwgZm9yIGEgZmllbGRcIiwgb3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNoZWNrIHRoYXQgb25seSBhbGxvd2VkIHByb3BlcnRpZXMgYXJlIHByb3ZpZGVkXG4gICAgICB2YXIgYWxsb3dlZFByb3BlcnRpZXMgPSBbXCJ0eXBlXCIsIFwidGVtcGxhdGVcIiwgXCJ0ZW1wbGF0ZVVybFwiLCBcImtleVwiLCBcIm1vZGVsXCIsIFwiZXhwcmVzc2lvblByb3BlcnRpZXNcIiwgXCJkYXRhXCIsIFwidGVtcGxhdGVPcHRpb25zXCIsIFwid3JhcHBlclwiLCBcIm1vZGVsT3B0aW9uc1wiLCBcIndhdGNoZXJcIiwgXCJ2YWxpZGF0b3JzXCIsIFwibm9Gb3JtQ29udHJvbFwiLCBcImhpZGVcIiwgXCJuZ01vZGVsQXR0cnNcIiwgXCJvcHRpb25zVHlwZXNcIiwgXCJsaW5rXCIsIFwiY29udHJvbGxlclwiLCBcInZhbGlkYXRpb25cIixcbiAgICAgIC8vIHRoaW5ncyB3ZSBhZGQgdG8gdGhlIGZpZWxkIGFmdGVyIHRoZSBmYWN0IGFyZSBva1xuICAgICAgXCJmb3JtQ29udHJvbFwiLCBcInZhbHVlXCIsIFwicnVuRXhwcmVzc2lvbnNcIl07XG4gICAgICB2YXIgZXh0cmFQcm9wcyA9IE9iamVjdC5rZXlzKG9wdGlvbnMpLmZpbHRlcihmdW5jdGlvbiAocHJvcCkge1xuICAgICAgICByZXR1cm4gYWxsb3dlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wKSA9PT0gLTE7XG4gICAgICB9KTtcbiAgICAgIGlmIChleHRyYVByb3BzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0RmllbGRFcnJvcihcInlvdS1oYXZlLXNwZWNpZmllZC1maWVsZC1wcm9wZXJ0aWVzLXRoYXQtYXJlLW5vdC1hbGxvd2VkXCIsIFwiWW91IGhhdmUgc3BlY2lmaWVkIGZpZWxkIHByb3BlcnRpZXMgdGhhdCBhcmUgbm90IGFsbG93ZWQ6IFwiICsgSlNPTi5zdHJpbmdpZnkoZXh0cmFQcm9wcy5qb2luKFwiLCBcIikpLCBvcHRpb25zKTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0VGVtcGxhdGVPcHRpb25zQ291bnQob3B0aW9ucykge1xuICAgICAgICB2YXIgdGVtcGxhdGVPcHRpb25zID0gMDtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zICs9IGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudGVtcGxhdGUpID8gMSA6IDA7XG4gICAgICAgIHRlbXBsYXRlT3B0aW9ucyArPSBhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnR5cGUpID8gMSA6IDA7XG4gICAgICAgIHRlbXBsYXRlT3B0aW9ucyArPSBhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnRlbXBsYXRlVXJsKSA/IDEgOiAwO1xuICAgICAgICByZXR1cm4gdGVtcGxhdGVPcHRpb25zO1xuICAgICAgfVxuICAgIH1cbiAgfVxuICBmb3JtbHlGaWVsZC4kaW5qZWN0ID0gW1wiJGh0dHBcIiwgXCIkcVwiLCBcIiRjb21waWxlXCIsIFwiJHRlbXBsYXRlQ2FjaGVcIiwgXCJmb3JtbHlDb25maWdcIiwgXCJmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXNcIiwgXCJmb3JtbHlVdGlsXCIsIFwiZm9ybWx5VXNhYmlsaXR5XCIsIFwiZm9ybWx5V2FyblwiXTtcblxuICBmdW5jdGlvbiBhcnJheWlmeShvYmopIHtcbiAgICBpZiAob2JqICYmICFhbmd1bGFyLmlzQXJyYXkob2JqKSkge1xuICAgICAgb2JqID0gW29ial07XG4gICAgfSBlbHNlIGlmICghb2JqKSB7XG4gICAgICBvYmogPSBbXTtcbiAgICB9XG4gICAgcmV0dXJuIG9iajtcbiAgfVxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGlyZWN0aXZlcy9mb3JtbHktZmllbGQuanNcbiAqKiBtb2R1bGUgaWQgPSAxNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfdG9BcnJheSA9IGZ1bmN0aW9uIChhcnIpIHsgcmV0dXJuIEFycmF5LmlzQXJyYXkoYXJyKSA/IGFyciA6IEFycmF5LmZyb20oYXJyKTsgfTtcblxudmFyIF9zbGljZSA9IEFycmF5LnByb3RvdHlwZS5zbGljZTtcbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5kaXJlY3RpdmUoXCJmb3JtbHlGb3JtXCIsIGZvcm1seUZvcm0pO1xuXG4gIGZvcm1seUZvcm0udGVzdHMgPSBPTl9URVNUID8gcmVxdWlyZShcIi4vZm9ybWx5LWZvcm0udGVzdFwiKShuZ01vZHVsZSkgOiBudWxsO1xuXG4gIGZ1bmN0aW9uIGZvcm1seUZvcm0oZm9ybWx5VXNhYmlsaXR5KSB7XG4gICAgdmFyIGN1cnJlbnRGb3JtSWQgPSAxO1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogXCJFXCIsXG4gICAgICB0ZW1wbGF0ZTogZnVuY3Rpb24gKGVsLCBhdHRycykge1xuICAgICAgICAvKiBqc2hpbnQgLVcwMzMgKi8gLy8gdGhpcyBiZWNhdXNlIGpzaGludCBpcyBicm9rZW4gSSBndWVzcy4uLlxuICAgICAgICB2YXIgcm9vdEVsID0gYXR0cnMucm9vdEVsIHx8IFwibmctZm9ybVwiO1xuICAgICAgICByZXR1cm4gXCJcXG4gICAgICAgICAgPFwiICsgcm9vdEVsICsgXCIgY2xhc3M9XFxcImZvcm1seVxcXCJcXG4gICAgICAgICAgICAgICAgICAgbmFtZT1cXFwiZm9ybVxcXCJcXG4gICAgICAgICAgICAgICAgICAgcm9sZT1cXFwiZm9ybVxcXCI+XFxuICAgICAgICAgICAgPGRpdiBmb3JtbHktZmllbGRcXG4gICAgICAgICAgICAgICAgIG5nLXJlcGVhdD1cXFwiZmllbGQgaW4gZmllbGRzIHRyYWNrIGJ5ICRpbmRleFxcXCJcXG4gICAgICAgICAgICAgICAgIG5nLWlmPVxcXCIhZmllbGQuaGlkZVxcXCJcXG4gICAgICAgICAgICAgICAgIGNsYXNzPVxcXCJmb3JtbHktZmllbGQge3tmaWVsZC50eXBlID8gJ2Zvcm1seS1maWVsZC0nICsgZmllbGQudHlwZSA6ICcnfX1cXFwiXFxuICAgICAgICAgICAgICAgICBvcHRpb25zPVxcXCJmaWVsZFxcXCJcXG4gICAgICAgICAgICAgICAgIG1vZGVsPVxcXCJmaWVsZC5tb2RlbCB8fCBtb2RlbFxcXCJcXG4gICAgICAgICAgICAgICAgIGZpZWxkcz1cXFwiZmllbGRzXFxcIlxcbiAgICAgICAgICAgICAgICAgZm9ybT1cXFwiZm9ybVxcXCJcXG4gICAgICAgICAgICAgICAgIGZvcm0taWQ9XFxcImZvcm1JZFxcXCJcXG4gICAgICAgICAgICAgICAgIGluZGV4PVxcXCIkaW5kZXhcXFwiPlxcbiAgICAgICAgICAgIDwvZGl2PlxcbiAgICAgICAgICAgIDxkaXYgbmctdHJhbnNjbHVkZT48L2Rpdj5cXG4gICAgICAgICAgPC9cIiArIHJvb3RFbCArIFwiPlxcbiAgICAgICAgXCI7XG4gICAgICB9LFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICBzY29wZToge1xuICAgICAgICBmaWVsZHM6IFwiPVwiLFxuICAgICAgICBtb2RlbDogXCI9P1wiLCAvLyB3ZSdsbCBkbyBvdXIgb3duIHdhcm5pbmcgdG8gaGVscCB3aXRoIG1pZ3JhdGlvbnNcbiAgICAgICAgZm9ybTogXCI9P1wiXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogW1wiJHNjb3BlXCIsIGZ1bmN0aW9uICgkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLmZvcm1JZCA9IFwiZm9ybWx5X1wiICsgY3VycmVudEZvcm1JZCsrO1xuXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBhdHRhY2hLZXkpOyAvLyBhdHRhY2hlcyBhIGtleSBiYXNlZCBvbiB0aGUgaW5kZXggaWYgYSBrZXkgaXNuJ3Qgc3BlY2lmaWVkXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBzZXR1cFdhdGNoZXJzKTsgLy8gc2V0dXAgd2F0Y2hlcnMgZm9yIGFsbCBmaWVsZHNcblxuICAgICAgICAvLyB3YXRjaCB0aGUgbW9kZWwgYW5kIGV2YWx1YXRlIHdhdGNoIGV4cHJlc3Npb25zIHRoYXQgZGVwZW5kIG9uIGl0LlxuICAgICAgICAkc2NvcGUuJHdhdGNoKFwibW9kZWxcIiwgZnVuY3Rpb24gb25SZXN1bHRVcGRhdGUobmV3UmVzdWx0KSB7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGZ1bmN0aW9uIChmaWVsZCkge1xuICAgICAgICAgICAgLypqc2hpbnQgLVcwMzAgKi9cbiAgICAgICAgICAgIGZpZWxkLnJ1bkV4cHJlc3Npb25zICYmIGZpZWxkLnJ1bkV4cHJlc3Npb25zKG5ld1Jlc3VsdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGF0dGFjaEtleShmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICBmaWVsZC5rZXkgPSBmaWVsZC5rZXkgfHwgaW5kZXggfHwgMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldHVwV2F0Y2hlcnMoZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChmaWVsZC53YXRjaGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgd2F0Y2hlcnMgPSBmaWVsZC53YXRjaGVyO1xuICAgICAgICAgIGlmICghYW5ndWxhci5pc0FycmF5KHdhdGNoZXJzKSkge1xuICAgICAgICAgICAgd2F0Y2hlcnMgPSBbd2F0Y2hlcnNdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2god2F0Y2hlcnMsIGZ1bmN0aW9uICh3YXRjaGVyKSB7XG4gICAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKHdhdGNoZXIubGlzdGVuZXIpKSB7XG4gICAgICAgICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFwiYWxsLWZpZWxkLXdhdGNoZXJzLW11c3QtaGF2ZS1hLWxpc3RlbmVyXCIsIFwiQWxsIGZpZWxkIHdhdGNoZXJzIG11c3QgaGF2ZSBhIGxpc3RlbmVyXCIsIGZpZWxkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHZhciB3YXRjaEV4cHJlc3Npb24gPSBnZXRXYXRjaEV4cHJlc3Npb24od2F0Y2hlciwgZmllbGQsIGluZGV4KTtcbiAgICAgICAgICAgIHZhciB3YXRjaExpc3RlbmVyID0gZ2V0V2F0Y2hMaXN0ZW5lcih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpO1xuXG4gICAgICAgICAgICB2YXIgdHlwZSA9IHdhdGNoZXIudHlwZSB8fCBcIiR3YXRjaFwiO1xuICAgICAgICAgICAgd2F0Y2hlci5zdG9wV2F0Y2hpbmcgPSAkc2NvcGVbdHlwZV0od2F0Y2hFeHByZXNzaW9uLCB3YXRjaExpc3RlbmVyLCB3YXRjaGVyLndhdGNoRGVlcCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRXYXRjaEV4cHJlc3Npb24od2F0Y2hlciwgZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgdmFyIHdhdGNoRXhwcmVzc2lvbiA9IHdhdGNoZXIuZXhwcmVzc2lvbiB8fCBcIm1vZGVsWydcIiArIGZpZWxkLmtleSArIFwiJ11cIjtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHdhdGNoRXhwcmVzc2lvbikpIHtcbiAgICAgICAgICAgIC8vIHdyYXAgdGhlIGZpZWxkJ3Mgd2F0Y2ggZXhwcmVzc2lvbiBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgICAvLyBhbmQgdGhlIHN0b3AgZnVuY3Rpb24gYXMgdGhlIGxhc3QgYXJnIGFzIGEgaGVscGVyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxFeHByZXNzaW9uID0gd2F0Y2hFeHByZXNzaW9uO1xuICAgICAgICAgICAgd2F0Y2hFeHByZXNzaW9uID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hFeHByZXNzaW9uKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IG1vZGlmeUFyZ3MuYXBwbHkodW5kZWZpbmVkLCBbd2F0Y2hlciwgaW5kZXhdLmNvbmNhdChfc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbEV4cHJlc3Npb24uYXBwbHkodW5kZWZpbmVkLCBfdG9BcnJheShhcmdzKSk7XG4gICAgICAgICAgICB9O1xuICAgICAgICAgICAgd2F0Y2hFeHByZXNzaW9uLmRpc3BsYXlOYW1lID0gXCJGb3JtbHkgV2F0Y2ggRXhwcmVzc2lvbiBmb3IgZmllbGQgZm9yIFwiICsgZmllbGQua2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gd2F0Y2hFeHByZXNzaW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0V2F0Y2hMaXN0ZW5lcih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICB2YXIgd2F0Y2hMaXN0ZW5lciA9IHdhdGNoZXIubGlzdGVuZXI7XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih3YXRjaExpc3RlbmVyKSkge1xuICAgICAgICAgICAgLy8gd3JhcCB0aGUgZmllbGQncyB3YXRjaCBsaXN0ZW5lciBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgICAvLyBhbmQgdGhlIHN0b3AgZnVuY3Rpb24gYXMgdGhlIGxhc3QgYXJnIGFzIGEgaGVscGVyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxMaXN0ZW5lciA9IHdhdGNoTGlzdGVuZXI7XG4gICAgICAgICAgICB3YXRjaExpc3RlbmVyID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hMaXN0ZW5lcigpIHtcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBtb2RpZnlBcmdzLmFwcGx5KHVuZGVmaW5lZCwgW3dhdGNoZXIsIGluZGV4XS5jb25jYXQoX3NsaWNlLmNhbGwoYXJndW1lbnRzKSkpO1xuICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxMaXN0ZW5lci5hcHBseSh1bmRlZmluZWQsIF90b0FycmF5KGFyZ3MpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3YXRjaExpc3RlbmVyLmRpc3BsYXlOYW1lID0gXCJGb3JtbHkgV2F0Y2ggTGlzdGVuZXIgZm9yIGZpZWxkIGZvciBcIiArIGZpZWxkLmtleTtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIHdhdGNoTGlzdGVuZXI7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBtb2RpZnlBcmdzKHdhdGNoZXIsIGluZGV4KSB7XG4gICAgICAgICAgZm9yICh2YXIgX2xlbiA9IGFyZ3VtZW50cy5sZW5ndGgsIG9yaWdpbmFsQXJncyA9IEFycmF5KF9sZW4gPiAyID8gX2xlbiAtIDIgOiAwKSwgX2tleSA9IDI7IF9rZXkgPCBfbGVuOyBfa2V5KyspIHtcbiAgICAgICAgICAgIG9yaWdpbmFsQXJnc1tfa2V5IC0gMl0gPSBhcmd1bWVudHNbX2tleV07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIFskc2NvcGUuZmllbGRzW2luZGV4XV0uY29uY2F0KF90b0FycmF5KG9yaWdpbmFsQXJncyksIFt3YXRjaGVyLnN0b3BXYXRjaGluZ10pO1xuICAgICAgICB9XG4gICAgICB9XSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWwsIGF0dHJzKSB7XG4gICAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShcInJlc3VsdFwiKSkge1xuICAgICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGb3JtbHlFcnJvcihcIlRoZSBcXFwicmVzdWx0XFxcIiBhdHRyaWJ1dGUgb24gYSBmb3JtbHktZm9ybSBpcyBubyBsb25nZXIgdmFsaWQuIFVzZSBcXFwibW9kZWxcXFwiIGluc3RlYWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGF0dHJzLm5hbWUgIT09IFwiZm9ybVwiKSB7XG4gICAgICAgICAgLy8gdGhlbiB0aGV5IHNwZWNpZmllZCB0aGVpciBvd24gbmFtZVxuICAgICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGb3JtbHlFcnJvcihcIlRoZSBcXFwibmFtZVxcXCIgYXR0cmlidXRlIG9uIGEgZm9ybWx5LWZvcm0gaXMgbm8gbG9uZ2VyIHZhbGlkLiBVc2UgXFxcImZvcm1cXFwiIGluc3RlYWRcIik7XG4gICAgICAgIH1cbiAgICAgICAgLy8gZW5mb3JjZSB0aGUgbW9kZWwgYXR0cmlidXRlIGJlY2F1c2Ugd2UncmUgbWFraW5nIGl0IG9wdGlvbmFsIHRvIGhlbHAgd2l0aCBtaWdyYXRpb25zXG4gICAgICAgIGlmICghYXR0cnMuaGFzT3duUHJvcGVydHkoXCJtb2RlbFwiKSB8fCAhc2NvcGUubW9kZWwpIHtcbiAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0Rm9ybWx5RXJyb3IoXCJUaGUgXFxcIm1vZGVsXFxcIiBhdHRyaWJ1dGUgaXMgcmVxdWlyZWQgb24gYSBmb3JtbHktZm9ybS5cIik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuICB9XG4gIGZvcm1seUZvcm0uJGluamVjdCA9IFtcImZvcm1seVVzYWJpbGl0eVwiXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0uanNcbiAqKiBtb2R1bGUgaWQgPSAxN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmRpcmVjdGl2ZShcImZvcm1seUZvY3VzXCIsIFtcIiR0aW1lb3V0XCIsIFwiJGRvY3VtZW50XCIsIGZ1bmN0aW9uICgkdGltZW91dCwgJGRvY3VtZW50KSB7XG4gICAgLyoganNoaW50IC1XMDUyICovXG4gICAgcmV0dXJuIHtcbiAgICAgIGxpbms6IGZ1bmN0aW9uIChzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzRWwgPSBudWxsO1xuICAgICAgICB2YXIgZWwgPSBlbGVtZW50WzBdO1xuICAgICAgICB2YXIgZG9jID0gJGRvY3VtZW50WzBdO1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZShcImZvcm1seUZvY3VzXCIsIGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gXCJ0cnVlXCIpIHtcbiAgICAgICAgICAgICR0aW1lb3V0KGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgICAgcHJldmlvdXNFbCA9IGRvYy5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICAgICAgfSwgfiB+YXR0cnMuZm9jdXNXYWl0KTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbHVlID09PSBcImZhbHNlXCIpIHtcbiAgICAgICAgICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCA9PT0gZWwpIHtcbiAgICAgICAgICAgICAgZWwuYmx1cigpO1xuICAgICAgICAgICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoXCJyZWZvY3VzXCIpICYmIHByZXZpb3VzRWwpIHtcbiAgICAgICAgICAgICAgICBwcmV2aW91c0VsLmZvY3VzKCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gIH1dKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvY3VzLmpzXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5ydW4oYWRkRm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IpO1xuXG4gIGZ1bmN0aW9uIGFkZEZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKGZvcm1seUNvbmZpZykge1xuICAgIGlmIChmb3JtbHlDb25maWcuZXh0cmFzLmRpc2FibGVOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlci5wdXNoKG5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKTtcbiAgfVxuICBhZGRGb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvci4kaW5qZWN0ID0gW1wiZm9ybWx5Q29uZmlnXCJdO1xuXG5cbiAgZnVuY3Rpb24gbmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IodGVtcGxhdGUsIG9wdGlvbnMsIHNjb3BlKSB7XG4gICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICAgIHZhciBlbCA9IGFuZ3VsYXIuZWxlbWVudChcIjxhPjwvYT5cIik7XG4gICAgdmFyIGRhdGEgPSBvcHRpb25zLmRhdGE7XG4gICAgaWYgKGRhdGEubm9Ub3VjaHkpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICB9XG4gICAgZWwuYXBwZW5kKHRlbXBsYXRlKTtcbiAgICB2YXIgbW9kZWxFbHMgPSBhbmd1bGFyLmVsZW1lbnQoZWxbMF0ucXVlcnlTZWxlY3RvckFsbChcIltuZy1tb2RlbF1cIikpO1xuICAgIGlmICghbW9kZWxFbHMgfHwgIW1vZGVsRWxzLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgIH1cbiAgICBhZGROZ01vZGVsQXR0cnMob3B0aW9ucy5uZ01vZGVsQXR0cnMpO1xuXG4gICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCBcImlkXCIsIHNjb3BlLmlkKTtcbiAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxFbHMsIFwibmFtZVwiLCBzY29wZS5pZCk7XG5cbiAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy52YWxpZGF0b3JzKSkge1xuICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCBcImZvcm1seS1jdXN0b20tdmFsaWRhdGlvblwiLCBcIm9wdGlvbnMudmFsaWRhdG9yc1wiKTtcbiAgICB9XG4gICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMubW9kZWxPcHRpb25zKSkge1xuICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCBcIm5nLW1vZGVsLW9wdGlvbnNcIiwgXCJvcHRpb25zLm1vZGVsT3B0aW9uc1wiKTtcbiAgICAgIGlmIChvcHRpb25zLm1vZGVsT3B0aW9ucy5nZXR0ZXJTZXR0ZXIpIHtcbiAgICAgICAgbW9kZWxFbHMuYXR0cihcIm5nLW1vZGVsXCIsIFwib3B0aW9ucy52YWx1ZVwiKTtcbiAgICAgIH1cbiAgICB9XG4gICAgYWRkVGVtcGxhdGVPcHRpb25zQXR0cnMoKTtcblxuICAgIHJldHVybiBlbC5odG1sKCk7XG5cblxuICAgIGZ1bmN0aW9uIGFkZFRlbXBsYXRlT3B0aW9uc0F0dHJzKCkge1xuICAgICAgLy8gaWYgdGhlIGZpZWxkIGhhcyBzcGVjaWZpZWQgdmFsdWVzIGZvciB0aGVzZSwgdGhlbiB3ZSB3YW50IHRvIGFkZCB0aGUgYXR0cmlidXRlcyBhbmQgd2F0Y2ggdGhlbSBmb3IgY2hhbmdlcy5cbiAgICAgIHZhciBib3VuZEF0dHJpYnV0ZXMgPSBhbmd1bGFyLmV4dGVuZChkYXRhLm5nTW9kZWxCb3VuZEF0dHJpYnV0ZXMgfHwge30sIHtcbiAgICAgICAgXCJuZy1kaXNhYmxlZFwiOiBcImRpc2FibGVkXCIsXG4gICAgICAgIFwibmctcmVxdWlyZWRcIjogXCJyZXF1aXJlZFwiLFxuICAgICAgICBcIm5nLXBhdHRlcm5cIjogXCJwYXR0ZXJuXCIsXG4gICAgICAgIFwibmctbWF4bGVuZ3RoXCI6IFwibWF4bGVuZ3RoXCIsXG4gICAgICAgIFwibmctbWlubGVuZ3RoXCI6IFwibWlubGVuZ3RoXCJcbiAgICAgIH0pO1xuICAgICAgdmFyIGludm9rZWRBdHRyaWJ1dGVzID0gYW5ndWxhci5leHRlbmQoZGF0YS5uZ01vZGVsSW52b2tlZEF0dHJpYnV0ZXMgfHwge30sIHtcbiAgICAgICAgXCJuZy1jaGFuZ2VcIjogXCJvbkNoYW5nZVwiLFxuICAgICAgICBcIm5nLWtleWRvd25cIjogXCJvbktleWRvd25cIixcbiAgICAgICAgXCJuZy1rZXl1cFwiOiBcIm9uS2V5dXBcIixcbiAgICAgICAgXCJuZy1rZXlwcmVzc1wiOiBcIm9uS2V5cHJlc3NcIixcbiAgICAgICAgXCJuZy1jbGlja1wiOiBcIm9uQ2xpY2tcIixcbiAgICAgICAgXCJuZy1mb2N1c1wiOiBcIm9uRm9jdXNcIixcbiAgICAgICAgXCJuZy1ibHVyXCI6IFwib25CbHVyXCJcbiAgICAgIH0pO1xuICAgICAgLy8gYXR0cmlidXRlcyBhcmUgd3JhcHBlZCBpbiBjdXJseSBicmFjZXNcbiAgICAgIHZhciBhdHRyaWJ1dGVzID0gYW5ndWxhci5leHRlbmQoZGF0YS5uZ01vZGVsQXR0cmlidXRlcyB8fCB7fSwge1xuICAgICAgICBcImZvcm1seS1mb2N1c1wiOiBcImZvY3VzXCIsXG4gICAgICAgIHBsYWNlaG9sZGVyOiBcInBsYWNlaG9sZGVyXCIsXG4gICAgICAgIG1pbjogXCJtaW5cIixcbiAgICAgICAgbWF4OiBcIm1heFwiLFxuICAgICAgICB0YWJpbmRleDogXCJ0YWJpbmRleFwiLFxuICAgICAgICB0eXBlOiBcInR5cGVcIlxuICAgICAgfSk7XG5cbiAgICAgIGFkZERlZmluZWRBdHRyaWJ1dGVzKG1vZGVsRWxzLCBib3VuZEF0dHJpYnV0ZXMsIG9wdGlvbnMpO1xuICAgICAgYWRkRGVmaW5lZEF0dHJpYnV0ZXMobW9kZWxFbHMsIGF0dHJpYnV0ZXMsIG9wdGlvbnMsIFwie3tcIiwgXCJ9fVwiKTtcbiAgICAgIGFkZERlZmluZWRBdHRyaWJ1dGVzKG1vZGVsRWxzLCBpbnZva2VkQXR0cmlidXRlcywgb3B0aW9ucywgZnVuY3Rpb24gKHZhbCkge1xuICAgICAgICByZXR1cm4gYW5ndWxhci5pc0Z1bmN0aW9uKHZhbCkgPyBcIlwiIDogXCIkZXZhbChcIjtcbiAgICAgIH0sIGZ1bmN0aW9uICh2YWwpIHtcbiAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNGdW5jdGlvbih2YWwpID8gXCIobW9kZWxbb3B0aW9ucy5rZXldLCBvcHRpb25zLCB0aGlzLCAkZXZlbnQpXCIgOiBcIilcIjtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZE5nTW9kZWxBdHRycyhuZ01vZGVsQXR0cnMpIHtcbiAgICAgIG5nTW9kZWxBdHRycyA9IG5nTW9kZWxBdHRycyB8fCB7fTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChuZ01vZGVsQXR0cnMuYm91bmQsIGZ1bmN0aW9uICh2YWwsIGF0dHIpIHtcbiAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCBhdHRyLCBcIm9wdGlvbnMubmdNb2RlbEF0dHJzLmJvdW5kWydcIiArIGF0dHIgKyBcIiddXCIpO1xuICAgICAgfSk7XG4gICAgICBhbmd1bGFyLmZvckVhY2gobmdNb2RlbEF0dHJzLnVuYm91bmQsIGZ1bmN0aW9uICh2YWwsIGF0dHIpIHtcbiAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCBhdHRyLCBzY29wZS4kZXZhbCh2YWwpKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZERlZmluZWRBdHRyaWJ1dGVzKGVscywgYXR0cnMsIG9wdGlvbnMpIHtcbiAgICAgIHZhciBwcmVmaXggPSBhcmd1bWVudHNbM10gPT09IHVuZGVmaW5lZCA/IFwiXCIgOiBhcmd1bWVudHNbM107XG4gICAgICB2YXIgc3VmZml4ID0gYXJndW1lbnRzWzRdID09PSB1bmRlZmluZWQgPyBcIlwiIDogYXJndW1lbnRzWzRdO1xuICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgdmFyIHRvID0gb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnM7XG4gICAgICB2YXIgZXAgPSBvcHRpb25zLmV4cHJlc3Npb25Qcm9wZXJ0aWVzO1xuICAgICAgaWYgKCF0byAmJiAhZXApIHtcbiAgICAgICAgcmV0dXJuOyAvLyBubyByZWFzb24gdG8gaXRlcmF0ZSBpZiB0aGVzZSBkb24ndCBleGlzdC4uLlxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdG8gPSB0byB8fCB7fTtcbiAgICAgICAgZXAgPSBlcCB8fCB7fTtcbiAgICAgIH1cbiAgICAgIGFuZ3VsYXIuZm9yRWFjaChhdHRycywgZnVuY3Rpb24gKHZhbCwgYXR0ck5hbWUpIHtcbiAgICAgICAgLy8gaWYgaXQncyBkZWZpbmVkIGFzIGEgcHJvcGVydHkgb24gdGVtcGxhdGUgb3B0aW9ucywgb3IgaWYgaXQncyBhbiBleHByZXNzaW9uIHByb3BlcnR5LFxuICAgICAgICAvLyB0aGVuIHdlJ2xsIGFkZCB0aGUgYXR0cmlidXRlIChhbmQgaGVuY2UgdGhlIHdhdGNoZXJzKVxuICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQodG9bdmFsXSkgfHwgYW5ndWxhci5pc0RlZmluZWQoZXBbXCJ0ZW1wbGF0ZU9wdGlvbnMuXCIgKyB2YWxdKSkge1xuICAgICAgICAgIHZhciB2YWxQcmVmaXggPSBhbmd1bGFyLmlzRnVuY3Rpb24ocHJlZml4KSA/IHByZWZpeCh0b1t2YWxdKSA6IHByZWZpeDtcbiAgICAgICAgICB2YXIgdmFsU3VmZml4ID0gYW5ndWxhci5pc0Z1bmN0aW9uKHN1ZmZpeCkgPyBzdWZmaXgodG9bdmFsXSkgOiBzdWZmaXg7XG4gICAgICAgICAgYWRkSWZOb3RQcmVzZW50KGVscywgXCJcIiArIGF0dHJOYW1lLCBcIlwiICsgdmFsUHJlZml4ICsgXCJvcHRpb25zLnRlbXBsYXRlT3B0aW9uc1snXCIgKyB2YWwgKyBcIiddXCIgKyB2YWxTdWZmaXgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBhZGRJZk5vdFByZXNlbnQoZWwsIGF0dHIsIHZhbCkge1xuICAgICAgaWYgKCFlbC5hdHRyKGF0dHIpKSB7XG4gICAgICAgIGVsLmF0dHIoYXR0ciwgdmFsKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3J1bi9mb3JtbHlOZ01vZGVsQXR0cnNNYW5pcHVsYXRvci5qc1xuICoqIG1vZHVsZSBpZCA9IDE5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJmb3JtbHkuanMifQ==