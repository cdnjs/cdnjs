// angular-formly version 4.2.0 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

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
	
	module.exports = "https://github.com/formly-js/angular-formly/blob/" + ("4.2.0") + "/other/ERRORS_AND_WARNINGS.md#";

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
	  __webpack_require__(18)(ngModule);
	  __webpack_require__(19)(ngModule);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(20)(ngModule);
	  __webpack_require__(21)(ngModule);
	  __webpack_require__(22)(ngModule);
	  __webpack_require__(23)(ngModule);
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(16)(ngModule);
	  __webpack_require__(17)(ngModule);
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
	  ngModule.constant("formlyVersion", ("4.2.0"));
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyErrorAndWarningsUrlPrefix", "https://github.com/formly-js/angular-formly/blob/" + ("4.2.0") + "/other/ERRORS_AND_WARNINGS.md#");
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
/* 17 */
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
/* 18 */
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
/* 19 */
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
/* 20 */
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
/* 21 */
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
/* 22 */
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
/* 23 */
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA4MjkyOWVmNDU3OWMwYmFjN2NjNiIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImFwaUNoZWNrXCIsXCJhbWRcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanMyXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzXCI6XCJhcGktY2hlY2tcIn0iLCJ3ZWJwYWNrOi8vLy4vb3RoZXIvZG9jc0Jhc2VVcmwuanMiLCJ3ZWJwYWNrOi8vLy4vYW5ndWxhci1maXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2luZGV4LmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2luZGV4LmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5QXBpQ2hlY2suanMiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seVVzYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlWZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMuanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2Zvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yLmpzIiwid2VicGFjazovLy8uL3J1bi9mb3JtbHlDdXN0b21UYWdzLmpzIiwid2VicGFjazovLy8uL3NlcnZpY2VzL2Zvcm1seVV0aWwuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvZm9ybWx5V2Fybi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1maWVsZC5qcyIsIndlYnBhY2s6Ly8vLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWZvY3VzLmpzIiwid2VicGFjazovLy8uL290aGVyL3V0aWxzLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7Ozs7QUN0Q0EsT0FBTSxDQUFDLE9BQU8sR0FBRyxtQkFBTyxDQUFDLENBQWdCLENBQUMsQzs7Ozs7Ozs7QUNBMUMsS0FBTSxRQUFRLEdBQUcsbUJBQU8sQ0FBQyxDQUFXLENBQUMsQ0FBQztBQUN0QyxLQUFJLENBQUMsUUFBUSxFQUFFO0FBQ2IsU0FBTSxJQUFJLEtBQUssQ0FDYixzRUFBc0UsR0FDcEUsbUJBQU8sQ0FBQyxDQUFxQixDQUFDLEdBQUcsZ0NBQWdDLENBQ3BFLENBQUM7RUFDSDtBQUNELEtBQU0sWUFBWSxHQUFHLFFBQVEsQ0FBQztBQUM5QixLQUFNLE9BQU8sR0FBRyxtQkFBTyxDQUFDLENBQWUsQ0FBQyxDQUFDO0FBQ3pDLEtBQU0sUUFBUSxHQUFHLE9BQU8sQ0FBQyxNQUFNLENBQUMsWUFBWSxFQUFFLEVB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QUFJLENBQUMsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNuQztNQUNGLENBQUMsQ0FBQztJQUNKLENBQUMsQ0FBQztFQUNKOztBQUVELFVBQVMsY0FBYyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUU7QUFDbEMsVUFBTyxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQ3JELE1BQU0sQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEtBQUssTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsQ0FBQztFQUMvRDs7O0FBR0QsVUFBUyxjQUFjLENBQUMsRUFBRSxFQUFFLFFBQVEsRUFBRTtBQUNwQyxPQUFJLENBQUMsRUFBRSxDQUFDLElBQUksRUFBRTs7QUFDWixPQUFFLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsQ0FBQztJQUMxQjs7QUFFRCxPQUFJLEVBQUUsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEtBQUssUUFBUSxDQUFDLFdBQVcsRUFBRSxFQUFFO0FBQ2xELFlBQU8sRUFBRSxDQUFDO0lBQ1g7O0FBRUQsT0FBSSxDQUFDLEdBQUcsRUFBRSxDQUFDLFFBQVEsRUFBRSxDQUFDO0FBQ3RCLFFBQUksSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtBQUNyQyxTQUFJLElBQUksR0FBRyxjQUFjLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0FBQzFDLFNBQUksSUFBSSxFQUFFO0FBQ1IsY0FBTyxJQUFJLENBQUM7TUFDYjtJQUNGIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwiYXBpLWNoZWNrXCIpLCByZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhcGktY2hlY2tcIiwgXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5nRm9ybWx5XCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYXBpLWNoZWNrXCIpLCByZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wibmdGb3JtbHlcIl0gPSBmYWN0b3J5KHJvb3RbXCJhcGlDaGVja1wiXSwgcm9vdFtcImFuZ3VsYXJcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOV9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgODI5MjllZjQ1NzljMGJhYzdjYzZcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoJy4vaW5kZXguY29tbW9uJyk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5qc1xuICoqLyIsImNvbnN0IGFwaUNoZWNrID0gcmVxdWlyZSgnYXBpLWNoZWNrJyk7XG5pZiAoIWFwaUNoZWNrKSB7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAnYW5ndWxhci1mb3JtbHkgcmVxdWlyZXMgdGhlIGxpYnJhcnkgYXBpQ2hlY2suanMhIFBsZWFzZSBpbmNsdWRlIGl0ISAnICtcbiAgICAgIHJlcXVpcmUoJy4vb3RoZXIvZG9jc0Jhc2VVcmwnKSArICdhcGljaGVja2pzLWRlcGVuZGVuY3ktcmVxdWlyZWQnXG4gICk7XG59XG5jb25zdCBuZ01vZHVsZU5hbWUgPSAnZm9ybWx5JztcbmNvbnN0IGFuZ3VsYXIgPSByZXF1aXJlKCcuL2FuZ3VsYXItZml4Jyk7XG5jb25zdCBuZ01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5nTW9kdWxlTmFtZSwgW10pO1xuXG5yZXF1aXJlKCcuL3Byb3ZpZGVycycpKG5nTW9kdWxlKTtcbnJlcXVpcmUoJy4vc2VydmljZXMnKShuZ01vZHVsZSk7XG5yZXF1aXJlKCcuL2RpcmVjdGl2ZXMnKShuZ01vZHVsZSk7XG5yZXF1aXJlKCcuL3J1bicpKG5nTW9kdWxlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZU5hbWU7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9pbmRleC5jb21tb24uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiYXBpQ2hlY2tcIixcImFtZFwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qczJcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanNcIjpcImFwaS1jaGVja1wifVxuICoqIG1vZHVsZSBpZCA9IDJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImV4cG9ydCBkZWZhdWx0IGBodHRwczovL2dpdGh1Yi5jb20vZm9ybWx5LWpzL2FuZ3VsYXItZm9ybWx5L2Jsb2IvJHtWRVJTSU9OfS9vdGhlci9FUlJPUlNfQU5EX1dBUk5JTkdTLm1kI2A7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9vdGhlci9kb2NzQmFzZVVybC5qc1xuICoqLyIsIi8vIHNvbWUgdmVyc2lvbnMgb2YgYW5ndWxhciBkb24ndCBleHBvcnQgdGhlIGFuZ3VsYXIgbW9kdWxlIHByb3Blcmx5LFxuLy8gc28gd2UgZ2V0IGl0IGZyb20gd2luZG93IGluIHRoaXMgY2FzZS5cbnZhciBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhcicpO1xuaWYgKCFhbmd1bGFyLnZlcnNpb24pIHtcbiAgYW5ndWxhciA9IHdpbmRvdy5hbmd1bGFyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vYW5ndWxhci1maXgvaW5kZXguanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgcmVxdWlyZSgnLi9mb3JtbHlBcGlDaGVjaycpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZSgnLi9mb3JtbHlVc2FiaWxpdHknKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoJy4vZm9ybWx5Q29uZmlnJykobmdNb2R1bGUpO1xuICByZXF1aXJlKCcuL2Zvcm1seVZlcnNpb24nKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoJy4vZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeCcpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZSgnLi9mb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMnKShuZ01vZHVsZSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIHJlcXVpcmUoJy4vZm9ybWx5VXRpbCcpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZSgnLi9mb3JtbHlXYXJuJykobmdNb2R1bGUpO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3NlcnZpY2VzL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIHJlcXVpcmUoJy4vZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uJykobmdNb2R1bGUpO1xuICByZXF1aXJlKCcuL2Zvcm1seS1maWVsZCcpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZSgnLi9mb3JtbHktZm9ybScpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZSgnLi9mb3JtbHktZm9jdXMnKShuZ01vZHVsZSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9pbmRleC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICByZXF1aXJlKCcuL2Zvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yJykobmdNb2R1bGUpO1xuICByZXF1aXJlKCcuL2Zvcm1seUN1c3RvbVRhZ3MnKShuZ01vZHVsZSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcnVuL2luZGV4LmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzlfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhclwiXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG5cbiAgbGV0IGFwaUNoZWNrID0gcmVxdWlyZSgnYXBpLWNoZWNrJykoe1xuICAgIG91dHB1dDoge1xuICAgICAgcHJlZml4OiAnYW5ndWxhci1mb3JtbHk6JyxcbiAgICAgIGRvY3NCYXNlVXJsOiByZXF1aXJlKCcuLi9vdGhlci9kb2NzQmFzZVVybCcpXG4gICAgfVxuICB9KTtcblxuICBmdW5jdGlvbiBzaGFwZVJlcXVpcmVkSWZOb3Qob3RoZXJQcm9wcywgcHJvcENoZWNrZXIpIHtcbiAgICBpZiAoIWFuZ3VsYXIuaXNBcnJheShvdGhlclByb3BzKSkge1xuICAgICAgb3RoZXJQcm9wcyA9IFtvdGhlclByb3BzXTtcbiAgICB9XG4gICAgY29uc3QgdHlwZSA9IGBzcGVjaWZpZWQgaWYgdGhlc2UgYXJlIG5vdCBzcGVjaWZpZWQ6IFxcYCR7b3RoZXJQcm9wcy5qb2luKCcsICcpfVxcYCAob3RoZXJ3aXNlIGl0J3Mgb3B0aW9uYWwpYDtcbiAgICBmdW5jdGlvbiBzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uKHByb3AsIHByb3BOYW1lLCBsb2NhdGlvbiwgb2JqKSB7XG4gICAgICB2YXIgcHJvcEV4aXN0cyA9IG9iaiAmJiBvYmouaGFzT3duUHJvcGVydHkocHJvcE5hbWUpO1xuICAgICAgdmFyIG90aGVyUHJvcHNFeGlzdCA9IG90aGVyUHJvcHMuc29tZShmdW5jdGlvbiAob3RoZXJQcm9wKSB7XG4gICAgICAgIHJldHVybiBvYmogJiYgb2JqLmhhc093blByb3BlcnR5KG90aGVyUHJvcCk7XG4gICAgICB9KTtcbiAgICAgIC8vY29uc29sZS5sb2cocHJvcE5hbWUsIHByb3BFeGlzdHMsIHByb3AsIG90aGVyUHJvcHNFeGlzdCwgb3RoZXJQcm9wcy5qb2luKCcsICcpKTtcbiAgICAgIGlmICghb3RoZXJQcm9wc0V4aXN0ICYmICFwcm9wRXhpc3RzKSB7XG4gICAgICAgIHJldHVybiBhcGlDaGVjay51dGlscy5nZXRFcnJvcihwcm9wTmFtZSwgbG9jYXRpb24sIHR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChwcm9wRXhpc3RzKSB7XG4gICAgICAgIHJldHVybiBwcm9wQ2hlY2tlcihwcm9wLCBwcm9wTmFtZSwgbG9jYXRpb24sIG9iaik7XG4gICAgICB9XG4gICAgfVxuICAgIHNoYXBlUmVxdWlyZWRJZk5vdERlZmluaXRpb24udHlwZSA9IHR5cGU7XG4gICAgYXBpQ2hlY2sudXRpbHMuY2hlY2tlckhlbHBlcnMuc2V0dXBDaGVja2VyKHNoYXBlUmVxdWlyZWRJZk5vdERlZmluaXRpb24pO1xuICAgIHJldHVybiBzaGFwZVJlcXVpcmVkSWZOb3REZWZpbml0aW9uO1xuICB9XG5cbiAgbmdNb2R1bGUuY29uc3RhbnQoJ2Zvcm1seUFwaUNoZWNrJywgYXBpQ2hlY2spO1xuICBpZiAoT05fVEVTVCkge1xuICAgIHJlcXVpcmUoJy4vZm9ybWx5QXBpQ2hlY2sudGVzdCcpKG5nTW9kdWxlKTtcbiAgfVxuXG4gIGxldCBmb3JtbHlFeHByZXNzaW9uID0gYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmZ1bmNdKTtcbiAgbGV0IHNwZWNpZnlXcmFwcGVyVHlwZSA9IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgYXBpQ2hlY2sub25lT2YoW251bGxdKSwgYXBpQ2hlY2sudHlwZU9yQXJyYXlPZihhcGlDaGVjay5zdHJpbmcpXG4gIF0pO1xuXG4gIGNvbnN0IGFwaUNoZWNrUHJvcGVydHkgPSBhcGlDaGVjay5vYmplY3RPZihhcGlDaGVjay5mdW5jKTtcblxuICBjb25zdCBhcGlDaGVja0luc3RhbmNlUHJvcGVydHkgPSBhcGlDaGVjay5zaGFwZS5vbmx5SWYoJ2FwaUNoZWNrJywgYXBpQ2hlY2suZnVuYy53aXRoUHJvcGVydGllcyh7XG4gICAgd2FybjogYXBpQ2hlY2suZnVuYyxcbiAgICB0aHJvdzogYXBpQ2hlY2suZnVuYyxcbiAgICBzaGFwZTogYXBpQ2hlY2suZnVuY1xuICB9KSk7XG5cbiAgY29uc3QgYXBpQ2hlY2tGdW5jdGlvblByb3BlcnR5ID0gYXBpQ2hlY2suc2hhcGUub25seUlmKCdhcGlDaGVjaycsIGFwaUNoZWNrLm9uZU9mKFsndGhyb3cnLCAnd2FybiddKSk7XG5cbiAgY29uc3QgZm9ybWx5V3JhcHBlclR5cGUgPSBhcGlDaGVjay5zaGFwZSh7XG4gICAgbmFtZTogc2hhcGVSZXF1aXJlZElmTm90KCd0eXBlcycsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgdGVtcGxhdGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZVVybCcsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgdGVtcGxhdGVVcmw6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZScsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgdHlwZXM6IGFwaUNoZWNrLnR5cGVPckFycmF5T2YoYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICBvdmVyd3JpdGVPazogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgICB2YWxpZGF0ZU9wdGlvbnM6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgYXBpQ2hlY2s6IGFwaUNoZWNrUHJvcGVydHkub3B0aW9uYWwsXG4gICAgYXBpQ2hlY2tJbnN0YW5jZTogYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5Lm9wdGlvbmFsLFxuICAgIGFwaUNoZWNrRnVuY3Rpb246IGFwaUNoZWNrRnVuY3Rpb25Qcm9wZXJ0eS5vcHRpb25hbCxcbiAgICBhcGlDaGVja09wdGlvbnM6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbFxuICB9KS5zdHJpY3Q7XG5cbiAgbGV0IGZpZWxkT3B0aW9uc0FwaVNoYXBlID0ge1xuICAgIHR5cGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KFsndGVtcGxhdGUnLCAndGVtcGxhdGVVcmwnXSwgYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICB0ZW1wbGF0ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoWyd0eXBlJywgJ3RlbXBsYXRlVXJsJ10sIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgdGVtcGxhdGVVcmw6IGFwaUNoZWNrLnNoYXBlLmlmTm90KFsndHlwZScsICd0ZW1wbGF0ZSddLCBhcGlDaGVjay5zdHJpbmcpLm9wdGlvbmFsLFxuICAgIGtleTogYXBpQ2hlY2sub25lT2ZUeXBlKFthcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLm51bWJlcl0pLFxuICAgIG1vZGVsOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gICAgZXhwcmVzc2lvblByb3BlcnRpZXM6IGFwaUNoZWNrLm9iamVjdE9mKGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICBmb3JtbHlFeHByZXNzaW9uLFxuICAgICAgYXBpQ2hlY2suc2hhcGUoe1xuICAgICAgICBleHByZXNzaW9uOiBmb3JtbHlFeHByZXNzaW9uLFxuICAgICAgICBtZXNzYWdlOiBmb3JtbHlFeHByZXNzaW9uLm9wdGlvbmFsXG4gICAgICB9KS5zdHJpY3RcbiAgICBdKSkub3B0aW9uYWwsXG4gICAgZGF0YTogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICAgIHRlbXBsYXRlT3B0aW9uczogYXBpQ2hlY2sub2JqZWN0Lm9wdGlvbmFsLFxuICAgIHdyYXBwZXI6IHNwZWNpZnlXcmFwcGVyVHlwZS5vcHRpb25hbCxcbiAgICBtb2RlbE9wdGlvbnM6IGFwaUNoZWNrLnNoYXBlKHtcbiAgICAgIHVwZGF0ZU9uOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gICAgICBkZWJvdW5jZTogYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICAgICAgYXBpQ2hlY2sub2JqZWN0LCBhcGlDaGVjay5zdHJpbmdcbiAgICAgIF0pLm9wdGlvbmFsLFxuICAgICAgYWxsb3dJbnZhbGlkOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsLFxuICAgICAgZ2V0dGVyU2V0dGVyOiBhcGlDaGVjay5ib29sLm9wdGlvbmFsLFxuICAgICAgdGltZXpvbmU6IGFwaUNoZWNrLnN0cmluZy5vcHRpb25hbFxuICAgIH0pLm9wdGlvbmFsLFxuICAgIHdhdGNoZXI6IGFwaUNoZWNrLnR5cGVPckFycmF5T2YoXG4gICAgICBhcGlDaGVjay5zaGFwZSh7XG4gICAgICAgIGV4cHJlc3Npb246IGZvcm1seUV4cHJlc3Npb24ub3B0aW9uYWwsXG4gICAgICAgIGxpc3RlbmVyOiBmb3JtbHlFeHByZXNzaW9uXG4gICAgICB9KVxuICAgICkub3B0aW9uYWwsXG4gICAgdmFsaWRhdG9yczogYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICAgIGZvcm1seUV4cHJlc3Npb24sIGFwaUNoZWNrLnNoYXBlKHtcbiAgICAgICAgZXhwcmVzc2lvbjogZm9ybWx5RXhwcmVzc2lvbixcbiAgICAgICAgbWVzc2FnZTogZm9ybWx5RXhwcmVzc2lvbi5vcHRpb25hbFxuICAgICAgfSkuc3RyaWN0XG4gICAgXSkpLm9wdGlvbmFsLFxuICAgIG5vRm9ybUNvbnRyb2w6IGFwaUNoZWNrLmJvb2wub3B0aW9uYWwsXG4gICAgaGlkZTogYXBpQ2hlY2suYm9vbC5vcHRpb25hbCxcbiAgICBuZ01vZGVsQXR0cnM6IGFwaUNoZWNrLm9iamVjdE9mKGFwaUNoZWNrLnNoYXBlKHtcbiAgICAgIGV4cHJlc3Npb246IGFwaUNoZWNrLnNoYXBlLmlmTm90KFsndmFsdWUnLCAnYXR0cmlidXRlJywgJ2JvdW5kJ10sIGFwaUNoZWNrLmFueSkub3B0aW9uYWwsXG4gICAgICB2YWx1ZTogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ2V4cHJlc3Npb24nLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsLFxuICAgICAgYXR0cmlidXRlOiBhcGlDaGVjay5zaGFwZS5pZk5vdCgnZXhwcmVzc2lvbicsIGFwaUNoZWNrLmFueSkub3B0aW9uYWwsXG4gICAgICBib3VuZDogYXBpQ2hlY2suc2hhcGUuaWZOb3QoJ2V4cHJlc3Npb24nLCBhcGlDaGVjay5hbnkpLm9wdGlvbmFsXG4gICAgfSkuc3RyaWN0KS5vcHRpb25hbCxcbiAgICBvcHRpb25zVHlwZXM6IGFwaUNoZWNrLnR5cGVPckFycmF5T2YoYXBpQ2hlY2suc3RyaW5nKS5vcHRpb25hbCxcbiAgICBsaW5rOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICAgIGNvbnRyb2xsZXI6IGFwaUNoZWNrLm9uZU9mVHlwZShbXG4gICAgICBhcGlDaGVjay5zdHJpbmcsIGFwaUNoZWNrLmZ1bmMsIGFwaUNoZWNrLmFycmF5XG4gICAgXSkub3B0aW9uYWwsXG4gICAgdmFsaWRhdGlvbjogYXBpQ2hlY2suc2hhcGUoe1xuICAgICAgc2hvdzogYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICAgICAgYXBpQ2hlY2suYm9vbCwgYXBpQ2hlY2sub25lT2YoW251bGxdKVxuICAgICAgXSkub3B0aW9uYWwsXG4gICAgICBtZXNzYWdlczogYXBpQ2hlY2sub2JqZWN0T2YoYXBpQ2hlY2suZnVuYykub3B0aW9uYWwsXG4gICAgICBlcnJvckV4aXN0c0FuZFNob3VsZEJlVmlzaWJsZTogYXBpQ2hlY2suYm9vbC5vcHRpb25hbFxuICAgIH0pLm9wdGlvbmFsLFxuICAgIGZvcm1Db250cm9sOiBhcGlDaGVjay5vYmplY3Qub3B0aW9uYWwsXG4gICAgdmFsdWU6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgcnVuRXhwcmVzc2lvbnM6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWxcbiAgfTtcblxuICBsZXQgZm9ybWx5RmllbGRPcHRpb25zID0gYXBpQ2hlY2suc2hhcGUoZmllbGRPcHRpb25zQXBpU2hhcGUpLnN0cmljdDtcblxuICBsZXQgdHlwZU9wdGlvbnNEZWZhdWx0T3B0aW9ucyA9IGFuZ3VsYXIuY29weShmaWVsZE9wdGlvbnNBcGlTaGFwZSk7XG4gIHR5cGVPcHRpb25zRGVmYXVsdE9wdGlvbnMua2V5ID0gYXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsO1xuXG4gIGxldCBmb3JtbHlUeXBlT3B0aW9ucyA9IGFwaUNoZWNrLnNoYXBlKHtcbiAgICBuYW1lOiBhcGlDaGVjay5zdHJpbmcsXG4gICAgdGVtcGxhdGU6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZVVybCcsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgdGVtcGxhdGVVcmw6IGFwaUNoZWNrLnNoYXBlLmlmTm90KCd0ZW1wbGF0ZScsIGFwaUNoZWNrLnN0cmluZykub3B0aW9uYWwsXG4gICAgY29udHJvbGxlcjogYXBpQ2hlY2sub25lT2ZUeXBlKFtcbiAgICAgIGFwaUNoZWNrLmZ1bmMsIGFwaUNoZWNrLnN0cmluZywgYXBpQ2hlY2suYXJyYXlcbiAgICBdKS5vcHRpb25hbCxcbiAgICBsaW5rOiBhcGlDaGVjay5mdW5jLm9wdGlvbmFsLFxuICAgIGRlZmF1bHRPcHRpb25zOiBhcGlDaGVjay5vbmVPZlR5cGUoW1xuICAgICAgYXBpQ2hlY2suZnVuYywgYXBpQ2hlY2suc2hhcGUodHlwZU9wdGlvbnNEZWZhdWx0T3B0aW9ucylcbiAgICBdKS5vcHRpb25hbCxcbiAgICBleHRlbmRzOiBhcGlDaGVjay5zdHJpbmcub3B0aW9uYWwsXG4gICAgd3JhcHBlcjogc3BlY2lmeVdyYXBwZXJUeXBlLm9wdGlvbmFsLFxuICAgIGRhdGE6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgICB2YWxpZGF0ZU9wdGlvbnM6IGFwaUNoZWNrLmZ1bmMub3B0aW9uYWwsXG4gICAgYXBpQ2hlY2s6IGFwaUNoZWNrUHJvcGVydHkub3B0aW9uYWwsXG4gICAgYXBpQ2hlY2tJbnN0YW5jZTogYXBpQ2hlY2tJbnN0YW5jZVByb3BlcnR5Lm9wdGlvbmFsLFxuICAgIGFwaUNoZWNrRnVuY3Rpb246IGFwaUNoZWNrRnVuY3Rpb25Qcm9wZXJ0eS5vcHRpb25hbCxcbiAgICBhcGlDaGVja09wdGlvbnM6IGFwaUNoZWNrLm9iamVjdC5vcHRpb25hbCxcbiAgICBvdmVyd3JpdGVPazogYXBpQ2hlY2suYm9vbC5vcHRpb25hbFxuICB9KS5zdHJpY3Q7XG5cbiAgYW5ndWxhci5leHRlbmQoYXBpQ2hlY2ssIHtcbiAgICBmb3JtbHlUeXBlT3B0aW9ucywgZm9ybWx5RmllbGRPcHRpb25zLCBmb3JtbHlFeHByZXNzaW9uLCBmb3JtbHlXcmFwcGVyVHlwZVxuICB9KTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9wcm92aWRlcnMvZm9ybWx5QXBpQ2hlY2suanNcbiAqKi8iLCJ2YXIgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXItZml4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICBuZ01vZHVsZS5wcm92aWRlcignZm9ybWx5VXNhYmlsaXR5JywgZnVuY3Rpb24oZm9ybWx5VmVyc2lvbiwgZm9ybWx5QXBpQ2hlY2spIHtcbiAgICB2YXIgZXJyb3JzQW5kV2FybmluZ3NVcmxQcmVmaXggPVxuICAgICAgYGh0dHBzOi8vZ2l0aHViLmNvbS9mb3JtbHktanMvYW5ndWxhci1mb3JtbHkvYmxvYi8ke2Zvcm1seVZlcnNpb259L290aGVyL0VSUk9SU19BTkRfV0FSTklOR1MubWQjYDtcbiAgICBhbmd1bGFyLmV4dGVuZCh0aGlzLCB7XG4gICAgICBnZXRGb3JtbHlFcnJvcjogZ2V0Rm9ybWx5RXJyb3IsXG4gICAgICBnZXRGaWVsZEVycm9yOiBnZXRGaWVsZEVycm9yLFxuICAgICAgY2hlY2tXcmFwcGVyOiBjaGVja1dyYXBwZXIsXG4gICAgICBjaGVja1dyYXBwZXJUZW1wbGF0ZTogY2hlY2tXcmFwcGVyVGVtcGxhdGUsXG4gICAgICAkZ2V0OiAoKSA9PiB0aGlzXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZEVycm9yKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UsIGZpZWxkKSB7XG4gICAgICBpZiAoYXJndW1lbnRzLmxlbmd0aCA8IDMpIHtcbiAgICAgICAgZmllbGQgPSBtZXNzYWdlO1xuICAgICAgICBtZXNzYWdlID0gZXJyb3JJbmZvU2x1ZztcbiAgICAgICAgZXJyb3JJbmZvU2x1ZyA9IG51bGw7XG4gICAgICB9XG4gICAgICByZXR1cm4gbmV3IEVycm9yKGdldEVycm9yTWVzc2FnZShlcnJvckluZm9TbHVnLCBtZXNzYWdlKSArIGAgRmllbGQgZGVmaW5pdGlvbjogJHthbmd1bGFyLnRvSnNvbihmaWVsZCl9YCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Rm9ybWx5RXJyb3IoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkge1xuICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvckluZm9TbHVnO1xuICAgICAgICBlcnJvckluZm9TbHVnID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgRXJyb3IoZ2V0RXJyb3JNZXNzYWdlKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkge1xuICAgICAgbGV0IHVybCA9ICcnO1xuICAgICAgaWYgKGVycm9ySW5mb1NsdWcgIT09IG51bGwpIHtcbiAgICAgICAgdXJsID0gYCR7ZXJyb3JzQW5kV2FybmluZ3NVcmxQcmVmaXh9JHtlcnJvckluZm9TbHVnfWA7XG4gICAgICB9XG4gICAgICByZXR1cm4gYEZvcm1seSBFcnJvcjogJHttZXNzYWdlfS4gJHt1cmx9YDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dyYXBwZXIod3JhcHBlcikge1xuICAgICAgZm9ybWx5QXBpQ2hlY2sudGhyb3coZm9ybWx5QXBpQ2hlY2suZm9ybWx5V3JhcHBlclR5cGUsIGFyZ3VtZW50cywge1xuICAgICAgICBwcmVmaXg6ICdmb3JtbHlDb25maWcuc2V0V3JhcHBlcicsXG4gICAgICAgIHVybFN1ZmZpeDogJ3NldHdyYXBwZXItdmFsaWRhdGlvbi1mYWlsZWQnXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dyYXBwZXJUZW1wbGF0ZSh0ZW1wbGF0ZSwgYWRkaXRpb25hbEluZm8pIHtcbiAgICAgIHZhciBmb3JtbHlUcmFuc2NsdWRlID0gJzxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPic7XG4gICAgICBpZiAodGVtcGxhdGUuaW5kZXhPZihmb3JtbHlUcmFuc2NsdWRlKSA9PT0gLTEpIHtcbiAgICAgICAgdGhyb3cgZ2V0Rm9ybWx5RXJyb3IoXG4gICAgICAgICAgYFRlbXBsYXRlIHdyYXBwZXIgdGVtcGxhdGVzIG11c3QgdXNlIFwiJHtmb3JtbHlUcmFuc2NsdWRlfVwiIHNvbWV3aGVyZSBpbiB0aGVtLiBgICtcbiAgICAgICAgICBgVGhpcyBvbmUgZG9lcyBub3QgaGF2ZSBcIjxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPlwiIGluIGl0OiAke3RlbXBsYXRlfWAgKyAnXFxuJyArXG4gICAgICAgICAgYEFkZGl0aW9uYWwgaW5mb3JtYXRpb246ICR7SlNPTi5zdHJpbmdpZnkoYWRkaXRpb25hbEluZm8pfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3Byb3ZpZGVycy9mb3JtbHlVc2FiaWxpdHkuanNcbiAqKi8iLCJjb25zdCBhbmd1bGFyID0gcmVxdWlyZSgnYW5ndWxhci1maXgnKTtcbmNvbnN0IHV0aWxzID0gcmVxdWlyZSgnLi4vb3RoZXIvdXRpbHMnKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLnByb3ZpZGVyKCdmb3JtbHlDb25maWcnLCBmb3JtbHlDb25maWcpO1xuXG4gIGZvcm1seUNvbmZpZy50ZXN0cyA9IE9OX1RFU1QgPyByZXF1aXJlKCcuL2Zvcm1seUNvbmZpZy50ZXN0JykobmdNb2R1bGUpIDogbnVsbDtcblxuICBmdW5jdGlvbiBmb3JtbHlDb25maWcoZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIsIGZvcm1seUFwaUNoZWNrKSB7XG5cbiAgICB2YXIgdHlwZU1hcCA9IHt9O1xuICAgIHZhciB0ZW1wbGF0ZVdyYXBwZXJzTWFwID0ge307XG4gICAgdmFyIGRlZmF1bHRXcmFwcGVyTmFtZSA9ICdkZWZhdWx0JztcbiAgICB2YXIgX3RoaXMgPSB0aGlzO1xuICAgIHZhciBnZXRFcnJvciA9IGZvcm1seVVzYWJpbGl0eVByb3ZpZGVyLmdldEZvcm1seUVycm9yO1xuXG4gICAgYW5ndWxhci5leHRlbmQodGhpcywge1xuICAgICAgc2V0VHlwZSxcbiAgICAgIGdldFR5cGUsXG4gICAgICBzZXRXcmFwcGVyLFxuICAgICAgZ2V0V3JhcHBlcixcbiAgICAgIGdldFdyYXBwZXJCeVR5cGUsXG4gICAgICByZW1vdmVXcmFwcGVyQnlOYW1lLFxuICAgICAgcmVtb3ZlV3JhcHBlcnNGb3JUeXBlLFxuICAgICAgZGlzYWJsZVdhcm5pbmdzOiBmYWxzZSxcbiAgICAgIGV4dHJhczoge1xuICAgICAgICBkaXNhYmxlTmdNb2RlbEF0dHJzTWFuaXB1bGF0b3I6IGZhbHNlLFxuICAgICAgICBuZ01vZGVsQXR0cnNNYW5pcHVsYXRvclByZWZlckJvdW5kOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIHRlbXBsYXRlTWFuaXB1bGF0b3JzOiB7XG4gICAgICAgIHByZVdyYXBwZXI6IFtdLFxuICAgICAgICBwb3N0V3JhcHBlcjogW11cbiAgICAgIH0sXG4gICAgICAkZ2V0OiAoKSA9PiB0aGlzXG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzZXRUeXBlKG9wdGlvbnMpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKG9wdGlvbnMsIHNldFR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgIGNoZWNrVHlwZShvcHRpb25zKTtcbiAgICAgICAgaWYgKG9wdGlvbnMuZXh0ZW5kcykge1xuICAgICAgICAgIGV4dGVuZFR5cGVPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICB9XG4gICAgICAgIHR5cGVNYXBbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBnZXRFcnJvcihgWW91IG11c3QgcHJvdmlkZSBhbiBvYmplY3Qgb3IgYXJyYXkgZm9yIHNldFR5cGUuIFlvdSBwcm92aWRlZDogJHtKU09OLnN0cmluZ2lmeShhcmd1bWVudHMpfWApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrVHlwZShvcHRpb25zKSB7XG4gICAgICBmb3JtbHlBcGlDaGVjay50aHJvdyhmb3JtbHlBcGlDaGVjay5mb3JtbHlUeXBlT3B0aW9ucywgYXJndW1lbnRzLCB7XG4gICAgICAgIHByZWZpeDogJ2Zvcm1seUNvbmZpZy5zZXRUeXBlJyxcbiAgICAgICAgdXJsOiAnc2V0dHlwZS12YWxpZGF0aW9uLWZhaWxlZCdcbiAgICAgIH0pO1xuICAgICAgaWYgKCFvcHRpb25zLm92ZXJ3cml0ZU9rKSB7XG4gICAgICAgIGNoZWNrT3ZlcndyaXRlKG9wdGlvbnMubmFtZSwgdHlwZU1hcCwgb3B0aW9ucywgJ3R5cGVzJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLm92ZXJ3cml0ZU9rID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZFR5cGVPcHRpb25zKG9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IGV4dGVuZHNUeXBlID0gZ2V0VHlwZShvcHRpb25zLmV4dGVuZHMsIHRydWUsIG9wdGlvbnMpO1xuICAgICAgZXh0ZW5kVHlwZUNvbnRyb2xsZXJGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgICBleHRlbmRUeXBlTGlua0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKTtcbiAgICAgIGV4dGVuZFR5cGVWYWxpZGF0ZU9wdGlvbnNGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgICBleHRlbmRUeXBlRGVmYXVsdE9wdGlvbnMob3B0aW9ucywgZXh0ZW5kc1R5cGUpO1xuICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShvcHRpb25zLCBleHRlbmRzVHlwZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kVHlwZUNvbnRyb2xsZXJGdW5jdGlvbihvcHRpb25zLCBleHRlbmRzVHlwZSkge1xuICAgICAgY29uc3QgZXh0ZW5kc0N0cmwgPSBleHRlbmRzVHlwZS5jb250cm9sbGVyO1xuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzQ3RybCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9uc0N0cmwgPSBvcHRpb25zLmNvbnRyb2xsZXI7XG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9uc0N0cmwpKSB7XG4gICAgICAgIG9wdGlvbnMuY29udHJvbGxlciA9IGZ1bmN0aW9uKCRzY29wZSwgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgICAkY29udHJvbGxlcihleHRlbmRzQ3RybCwgeyRzY29wZX0pO1xuICAgICAgICAgICRjb250cm9sbGVyKG9wdGlvbnNDdHJsLCB7JHNjb3BlfSk7XG4gICAgICAgIH07XG4gICAgICAgIG9wdGlvbnMuY29udHJvbGxlci4kaW5qZWN0ID0gWyckc2NvcGUnLCAnJGNvbnRyb2xsZXInXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIG9wdGlvbnMuY29udHJvbGxlciA9IGV4dGVuZHNDdHJsO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGV4dGVuZFR5cGVMaW5rRnVuY3Rpb24ob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICAgIGNvbnN0IGV4dGVuZHNGbiA9IGV4dGVuZHNUeXBlLmxpbms7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNGbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9uc0ZuID0gb3B0aW9ucy5saW5rO1xuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnNGbikpIHtcbiAgICAgICAgb3B0aW9ucy5saW5rID0gZnVuY3Rpb24oKSB7XG4gICAgICAgICAgZXh0ZW5kc0ZuKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgICAgb3B0aW9uc0ZuKC4uLmFyZ3VtZW50cyk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLmxpbmsgPSBleHRlbmRzRm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZXh0ZW5kVHlwZVZhbGlkYXRlT3B0aW9uc0Z1bmN0aW9uKG9wdGlvbnMsIGV4dGVuZHNUeXBlKSB7XG4gICAgICBjb25zdCBleHRlbmRzRm4gPSBleHRlbmRzVHlwZS52YWxpZGF0ZU9wdGlvbnM7XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGV4dGVuZHNGbikpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3Qgb3B0aW9uc0ZuID0gb3B0aW9ucy52YWxpZGF0ZU9wdGlvbnM7XG4gICAgICBjb25zdCBvcmlnaW5hbERlZmF1bHRPcHRpb25zID0gb3B0aW9ucy5kZWZhdWx0T3B0aW9ucztcbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zRm4pKSB7XG4gICAgICAgIG9wdGlvbnMudmFsaWRhdGVPcHRpb25zID0gZnVuY3Rpb24ob3B0aW9ucykge1xuICAgICAgICAgIG9wdGlvbnNGbihvcHRpb25zKTtcbiAgICAgICAgICBsZXQgbWVyZ2VkT3B0aW9ucyA9IGFuZ3VsYXIuY29weShvcHRpb25zKTtcbiAgICAgICAgICBsZXQgZGVmYXVsdE9wdGlvbnMgPSBvcmlnaW5hbERlZmF1bHRPcHRpb25zO1xuICAgICAgICAgIGlmIChkZWZhdWx0T3B0aW9ucykge1xuICAgICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihkZWZhdWx0T3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgZGVmYXVsdE9wdGlvbnMgPSBkZWZhdWx0T3B0aW9ucyhtZXJnZWRPcHRpb25zKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UobWVyZ2VkT3B0aW9ucywgZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBleHRlbmRzRm4obWVyZ2VkT3B0aW9ucyk7XG4gICAgICAgIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBvcHRpb25zLnZhbGlkYXRlT3B0aW9ucyA9IGV4dGVuZHNGbjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBleHRlbmRUeXBlRGVmYXVsdE9wdGlvbnMob3B0aW9ucywgZXh0ZW5kc1R5cGUpIHtcbiAgICAgIGNvbnN0IGV4dGVuZHNETyA9IGV4dGVuZHNUeXBlLmRlZmF1bHRPcHRpb25zO1xuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChleHRlbmRzRE8pKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9wdGlvbnNETyA9IG9wdGlvbnMuZGVmYXVsdE9wdGlvbnM7XG4gICAgICBjb25zdCBvcHRpb25zRE9Jc0ZuID0gYW5ndWxhci5pc0Z1bmN0aW9uKG9wdGlvbnNETyk7XG4gICAgICBjb25zdCBleHRlbmRzRE9Jc0ZuID0gYW5ndWxhci5pc0Z1bmN0aW9uKGV4dGVuZHNETyk7XG4gICAgICBpZiAoZXh0ZW5kc0RPSXNGbikge1xuICAgICAgICBvcHRpb25zLmRlZmF1bHRPcHRpb25zID0gZnVuY3Rpb24gZGVmYXVsdE9wdGlvbnMob3B0aW9ucykge1xuICAgICAgICAgIGNvbnN0IGV4dGVuZHNEZWZhdWx0T3B0aW9ucyA9IGV4dGVuZHNETyhvcHRpb25zKTtcbiAgICAgICAgICBjb25zdCBtZXJnZWREZWZhdWx0T3B0aW9ucyA9IHt9O1xuICAgICAgICAgIHV0aWxzLnJldmVyc2VEZWVwTWVyZ2UobWVyZ2VkRGVmYXVsdE9wdGlvbnMsIG9wdGlvbnMsIGV4dGVuZHNEZWZhdWx0T3B0aW9ucyk7XG4gICAgICAgICAgbGV0IGV4dGVuZGVyT3B0aW9uc0RlZmF1bHRPcHRpb25zID0gb3B0aW9uc0RPO1xuICAgICAgICAgIGlmIChvcHRpb25zRE9Jc0ZuKSB7XG4gICAgICAgICAgICBleHRlbmRlck9wdGlvbnNEZWZhdWx0T3B0aW9ucyA9IGV4dGVuZGVyT3B0aW9uc0RlZmF1bHRPcHRpb25zKG1lcmdlZERlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShleHRlbmRzRGVmYXVsdE9wdGlvbnMsIGV4dGVuZGVyT3B0aW9uc0RlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICByZXR1cm4gZXh0ZW5kc0RlZmF1bHRPcHRpb25zO1xuICAgICAgICB9O1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zRE9Jc0ZuKSB7XG4gICAgICAgIG9wdGlvbnMuZGVmYXVsdE9wdGlvbnMgPSBmdW5jdGlvbiBkZWZhdWx0T3B0aW9ucyhvcHRpb25zKSB7XG4gICAgICAgICAgbGV0IG5ld0RlZmF1bHRPcHRpb25zID0ge307XG4gICAgICAgICAgdXRpbHMucmV2ZXJzZURlZXBNZXJnZShuZXdEZWZhdWx0T3B0aW9ucywgb3B0aW9ucywgZXh0ZW5kc0RPKTtcbiAgICAgICAgICByZXR1cm4gb3B0aW9uc0RPKG5ld0RlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUeXBlKG5hbWUsIHRocm93RXJyb3IsIGVycm9yQ29udGV4dCkge1xuICAgICAgaWYgKCFuYW1lKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICB2YXIgdHlwZSA9IHR5cGVNYXBbbmFtZV07XG4gICAgICBpZiAoIXR5cGUgJiYgdGhyb3dFcnJvciA9PT0gdHJ1ZSkge1xuICAgICAgICB0aHJvdyBnZXRFcnJvcihcbiAgICAgICAgICBgVGhlcmUgaXMgbm8gdHlwZSBieSB0aGUgbmFtZSBvZiBcIiR7bmFtZX1cIjogJHtKU09OLnN0cmluZ2lmeShlcnJvckNvbnRleHQpfWBcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiB0eXBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHNldFdyYXBwZXIob3B0aW9ucywgbmFtZSkge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNBcnJheShvcHRpb25zKSkge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy5tYXAod3JhcHBlck9wdGlvbnMgPT4gc2V0V3JhcHBlcih3cmFwcGVyT3B0aW9ucykpO1xuICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgIG9wdGlvbnMudHlwZXMgPSBnZXRPcHRpb25zVHlwZXMob3B0aW9ucyk7XG4gICAgICAgIG9wdGlvbnMubmFtZSA9IGdldE9wdGlvbnNOYW1lKG9wdGlvbnMsIG5hbWUpO1xuICAgICAgICBjaGVja1dyYXBwZXJBUEkob3B0aW9ucyk7XG4gICAgICAgIHRlbXBsYXRlV3JhcHBlcnNNYXBbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnM7XG4gICAgICAgIHJldHVybiBvcHRpb25zO1xuICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzU3RyaW5nKG9wdGlvbnMpKSB7XG4gICAgICAgIHJldHVybiBzZXRXcmFwcGVyKHtcbiAgICAgICAgICB0ZW1wbGF0ZTogb3B0aW9ucyxcbiAgICAgICAgICBuYW1lXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9wdGlvbnNUeXBlcyhvcHRpb25zKSB7XG4gICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyhvcHRpb25zLnR5cGVzKSkge1xuICAgICAgICByZXR1cm4gW29wdGlvbnMudHlwZXNdO1xuICAgICAgfVxuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnR5cGVzKSkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gb3B0aW9ucy50eXBlcztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRPcHRpb25zTmFtZShvcHRpb25zLCBuYW1lKSB7XG4gICAgICByZXR1cm4gb3B0aW9ucy5uYW1lIHx8IG5hbWUgfHwgb3B0aW9ucy50eXBlcy5qb2luKCcgJykgfHwgZGVmYXVsdFdyYXBwZXJOYW1lO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrV3JhcHBlckFQSShvcHRpb25zKSB7XG4gICAgICBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5jaGVja1dyYXBwZXIob3B0aW9ucyk7XG4gICAgICBpZiAob3B0aW9ucy50ZW1wbGF0ZSkge1xuICAgICAgICBmb3JtbHlVc2FiaWxpdHlQcm92aWRlci5jaGVja1dyYXBwZXJUZW1wbGF0ZShvcHRpb25zLnRlbXBsYXRlLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIGlmICghb3B0aW9ucy5vdmVyd3JpdGVPaykge1xuICAgICAgICBjaGVja092ZXJ3cml0ZShvcHRpb25zLm5hbWUsIHRlbXBsYXRlV3JhcHBlcnNNYXAsIG9wdGlvbnMsICd0ZW1wbGF0ZVdyYXBwZXJzJyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgb3B0aW9ucy5vdmVyd3JpdGVPaztcbiAgICAgIH1cbiAgICAgIGNoZWNrV3JhcHBlclR5cGVzKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrV3JhcHBlclR5cGVzKG9wdGlvbnMpIHtcbiAgICAgIGxldCBzaG91bGRUaHJvdyA9ICFhbmd1bGFyLmlzQXJyYXkob3B0aW9ucy50eXBlcykgfHwgIW9wdGlvbnMudHlwZXMuZXZlcnkoYW5ndWxhci5pc1N0cmluZyk7XG4gICAgICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICAgICAgdGhyb3cgZ2V0RXJyb3IoYEF0dGVtcHRlZCB0byBjcmVhdGUgYSB0ZW1wbGF0ZSB3cmFwcGVyIHdpdGggdHlwZXMgdGhhdCBpcyBub3QgYSBzdHJpbmcgb3IgYW4gYXJyYXkgb2Ygc3RyaW5nc2ApO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrT3ZlcndyaXRlKHByb3BlcnR5LCBvYmplY3QsIG5ld1ZhbHVlLCBvYmplY3ROYW1lKSB7XG4gICAgICBpZiAob2JqZWN0Lmhhc093blByb3BlcnR5KHByb3BlcnR5KSkge1xuICAgICAgICB3YXJuKFtcbiAgICAgICAgICBgQXR0ZW1wdGluZyB0byBvdmVyd3JpdGUgJHtwcm9wZXJ0eX0gb24gJHtvYmplY3ROYW1lfSB3aGljaCBpcyBjdXJyZW50bHlgLFxuICAgICAgICAgIGAke0pTT04uc3RyaW5naWZ5KG9iamVjdFtwcm9wZXJ0eV0pfSB3aXRoICR7SlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpfWAsXG4gICAgICAgICAgYFRvIHN1cHJlc3MgdGhpcyB3YXJuaW5nLCBzcGVjaWZ5IHRoZSBwcm9wZXJ0eSBcIm92ZXJ3cml0ZU9rOiB0cnVlXCJgXG4gICAgICAgIF0uam9pbignICcpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXcmFwcGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWUgfHwgZGVmYXVsdFdyYXBwZXJOYW1lXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXcmFwcGVyQnlUeXBlKHR5cGUpIHtcbiAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICAgIHZhciB3cmFwcGVycyA9IFtdO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiB0ZW1wbGF0ZVdyYXBwZXJzTWFwKSB7XG4gICAgICAgIGlmICh0ZW1wbGF0ZVdyYXBwZXJzTWFwLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgaWYgKHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0udHlwZXMgJiYgdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXS50eXBlcy5pbmRleE9mKHR5cGUpICE9PSAtMSkge1xuICAgICAgICAgICAgd3JhcHBlcnMucHVzaCh0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIHJldHVybiB3cmFwcGVycztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZW1vdmVXcmFwcGVyQnlOYW1lKG5hbWUpIHtcbiAgICAgIHZhciB3cmFwcGVyID0gdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXTtcbiAgICAgIGRlbGV0ZSB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdO1xuICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlV3JhcHBlcnNGb3JUeXBlKHR5cGUpIHtcbiAgICAgIHZhciB3cmFwcGVycyA9IGdldFdyYXBwZXJCeVR5cGUodHlwZSk7XG4gICAgICBpZiAoIXdyYXBwZXJzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmICghYW5ndWxhci5pc0FycmF5KHdyYXBwZXJzKSkge1xuICAgICAgICByZXR1cm4gcmVtb3ZlV3JhcHBlckJ5TmFtZSh3cmFwcGVycy5uYW1lKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyYXBwZXJzLmZvckVhY2goKHdyYXBwZXIpID0+IHJlbW92ZVdyYXBwZXJCeU5hbWUod3JhcHBlci5uYW1lKSk7XG4gICAgICAgIHJldHVybiB3cmFwcGVycztcbiAgICAgIH1cbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgICBpZiAoIV90aGlzLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgICBjb25zb2xlLndhcm4oLi4uYXJndW1lbnRzKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuXG5cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLmNvbnN0YW50KCdmb3JtbHlWZXJzaW9uJywgVkVSU0lPTik7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seVZlcnNpb24uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUuY29uc3RhbnQoXG4gICAgJ2Zvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXgnLFxuICAgIGBodHRwczovL2dpdGh1Yi5jb20vZm9ybWx5LWpzL2FuZ3VsYXItZm9ybWx5L2Jsb2IvJHtWRVJTSU9OfS9vdGhlci9FUlJPUlNfQU5EX1dBUk5JTkdTLm1kI2BcbiAgKTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9wcm92aWRlcnMvZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeC5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICBuZ01vZHVsZS5mYWN0b3J5KCdmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMnLCBmdW5jdGlvbigpIHtcblxuICAgIHZhciBmb3JtbHlWYWxpZGF0aW9uTWVzc2FnZXMgPSB7XG4gICAgICBhZGRUZW1wbGF0ZU9wdGlvblZhbHVlTWVzc2FnZSxcbiAgICAgIGFkZFN0cmluZ01lc3NhZ2UsXG4gICAgICBtZXNzYWdlczoge31cbiAgICB9O1xuXG4gICAgcmV0dXJuIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcztcblxuICAgIGZ1bmN0aW9uIGFkZFRlbXBsYXRlT3B0aW9uVmFsdWVNZXNzYWdlKG5hbWUsIHByb3AsIHByZWZpeCwgc3VmZml4LCBhbHRlcm5hdGUpIHtcbiAgICAgIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlc1tuYW1lXSA9IHRlbXBsYXRlT3B0aW9uVmFsdWUocHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYWRkU3RyaW5nTWVzc2FnZShuYW1lLCBzdHJpbmcpIHtcbiAgICAgIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlc1tuYW1lXSA9ICgpID0+IHN0cmluZztcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIHRlbXBsYXRlT3B0aW9uVmFsdWUocHJvcCwgcHJlZml4LCBzdWZmaXgsIGFsdGVybmF0ZSkge1xuICAgICAgcmV0dXJuIGZ1bmN0aW9uIGdldFZhbGlkYXRpb25NZXNzYWdlKHZpZXdWYWx1ZSwgbW9kZWxWYWx1ZSwgc2NvcGUpIHtcbiAgICAgICAgaWYgKHNjb3BlLm9wdGlvbnMudGVtcGxhdGVPcHRpb25zW3Byb3BdKSB7XG4gICAgICAgICAgcmV0dXJuIGAke3ByZWZpeH0gJHtzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9uc1twcm9wXX0gJHtzdWZmaXh9YDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gYWx0ZXJuYXRlO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcHJvdmlkZXJzL2Zvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5qc1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICBuZ01vZHVsZS5ydW4oYWRkRm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IpO1xuXG4gIGZ1bmN0aW9uIGFkZEZvcm1seU5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKGZvcm1seUNvbmZpZykge1xuICAgIGlmIChmb3JtbHlDb25maWcuZXh0cmFzLmRpc2FibGVOZ01vZGVsQXR0cnNNYW5pcHVsYXRvcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlci5wdXNoKG5nTW9kZWxBdHRyc01hbmlwdWxhdG9yKTtcblxuXG4gICAgZnVuY3Rpb24gbmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IodGVtcGxhdGUsIG9wdGlvbnMsIHNjb3BlKSB7XG4gICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo3ICovXG4gICAgICB2YXIgZWwgPSBhbmd1bGFyLmVsZW1lbnQoJzxhPjwvYT4nKTtcbiAgICAgIHZhciBkYXRhID0gb3B0aW9ucy5kYXRhO1xuICAgICAgaWYgKGRhdGEubm9Ub3VjaHkpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgfVxuICAgICAgZWwuYXBwZW5kKHRlbXBsYXRlKTtcbiAgICAgIHZhciBtb2RlbEVscyA9IGFuZ3VsYXIuZWxlbWVudChlbFswXS5xdWVyeVNlbGVjdG9yQWxsKCdbbmctbW9kZWxdJykpO1xuICAgICAgaWYgKCFtb2RlbEVscyB8fCAhbW9kZWxFbHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgIH1cblxuICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCAnaWQnLCBzY29wZS5pZCk7XG4gICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxFbHMsICduYW1lJywgc2NvcGUuaWQpO1xuXG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy52YWxpZGF0b3JzKSkge1xuICAgICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxFbHMsICdmb3JtbHktY3VzdG9tLXZhbGlkYXRpb24nLCAnb3B0aW9ucy52YWxpZGF0b3JzJyk7XG4gICAgICB9XG4gICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy5tb2RlbE9wdGlvbnMpKSB7XG4gICAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbEVscywgJ25nLW1vZGVsLW9wdGlvbnMnLCAnb3B0aW9ucy5tb2RlbE9wdGlvbnMnKTtcbiAgICAgICAgaWYgKG9wdGlvbnMubW9kZWxPcHRpb25zLmdldHRlclNldHRlcikge1xuICAgICAgICAgIG1vZGVsRWxzLmF0dHIoJ25nLW1vZGVsJywgJ29wdGlvbnMudmFsdWUnKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYWRkVGVtcGxhdGVPcHRpb25zQXR0cnMoKTtcblxuICAgICAgcmV0dXJuIGVsLmh0bWwoKTtcblxuXG4gICAgICBmdW5jdGlvbiBhZGRUZW1wbGF0ZU9wdGlvbnNBdHRycygpIHtcbiAgICAgICAgaWYgKCFvcHRpb25zLnRlbXBsYXRlT3B0aW9ucyAmJiAhb3B0aW9ucy5leHByZXNzaW9uUHJvcGVydGllcykge1xuICAgICAgICAgIC8vIG5vIG5lZWQgdG8gcnVuIHRoZXNlIGlmIHRoZXJlIGFyZSBubyB0ZW1wbGF0ZU9wdGlvbnMgb3IgZXhwcmVzc2lvblByb3BlcnRpZXNcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdG8gPSBvcHRpb25zLnRlbXBsYXRlT3B0aW9ucyB8fCB7fTtcbiAgICAgICAgY29uc3QgZXAgPSBvcHRpb25zLmV4cHJlc3Npb25Qcm9wZXJ0aWVzIHx8IHt9O1xuXG4gICAgICAgIGxldCBuZ01vZGVsQXR0cmlidXRlcyA9IGdldEJ1aWx0aW5BdHRyaWJ1dGVzKCk7XG5cbiAgICAgICAgLy8gZXh0ZW5kIHdpdGggdGhlIHVzZXIncyBzcGVjaWZpY2F0aW9ucyB3aW5uaW5nXG4gICAgICAgIGFuZ3VsYXIuZXh0ZW5kKG5nTW9kZWxBdHRyaWJ1dGVzLCBvcHRpb25zLm5nTW9kZWxBdHRycyk7XG5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKG5nTW9kZWxBdHRyaWJ1dGVzLCAodmFsLCBuYW1lKSA9PiB7XG4gICAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6MTAgKi9cbiAgICAgICAgICBsZXQgYXR0clZhbDtcbiAgICAgICAgICBsZXQgYXR0ck5hbWU7XG4gICAgICAgICAgY29uc3QgcmVmID0gYG9wdGlvbnMudGVtcGxhdGVPcHRpb25zWycke25hbWV9J11gO1xuICAgICAgICAgIGNvbnN0IHRvVmFsID0gdG9bbmFtZV07XG4gICAgICAgICAgY29uc3QgZXBWYWwgPSBnZXRFcFZhbHVlKGVwLCBuYW1lKTtcblxuICAgICAgICAgIGNvbnN0IGluVG8gPSBhbmd1bGFyLmlzRGVmaW5lZCh0b1ZhbCk7XG4gICAgICAgICAgY29uc3QgaW5FcCA9IGFuZ3VsYXIuaXNEZWZpbmVkKGVwVmFsKTtcbiAgICAgICAgICBpZiAodmFsLnZhbHVlKSB7XG4gICAgICAgICAgICAvLyBJIHJlYWxpemUgdGhpcyBsb29rcyBiYWNrd2FyZHMsIGJ1dCBpdCdzIHJpZ2h0LCB0cnVzdCBtZS4uLlxuICAgICAgICAgICAgYXR0ck5hbWUgPSB2YWwudmFsdWU7XG4gICAgICAgICAgICBhdHRyVmFsID0gbmFtZTtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbC5leHByZXNzaW9uICYmIGluVG8pIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmV4cHJlc3Npb247XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc1N0cmluZyh0b1tuYW1lXSkpIHtcbiAgICAgICAgICAgICAgYXR0clZhbCA9IGAkZXZhbCgke3JlZn0pYDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHRvW25hbWVdKSkge1xuICAgICAgICAgICAgICBhdHRyVmFsID0gYCR7cmVmfShtb2RlbFtvcHRpb25zLmtleV0sIG9wdGlvbnMsIHRoaXMsICRldmVudClgO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBvcHRpb25zLnRlbXBsYXRlT3B0aW9ucy4ke25hbWV9IG11c3QgYmUgYSBzdHJpbmcgb3IgZnVuY3Rpb246ICR7SlNPTi5zdHJpbmdpZnkob3B0aW9ucyl9YFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0gZWxzZSBpZiAodmFsLmJvdW5kICYmIGluRXApIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmJvdW5kO1xuICAgICAgICAgICAgYXR0clZhbCA9IHJlZjtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbC5hdHRyaWJ1dGUgJiYgaW5FcCkge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYXR0cmlidXRlO1xuICAgICAgICAgICAgYXR0clZhbCA9IGB7eyR7cmVmfX19YDtcbiAgICAgICAgICB9IGVsc2UgaWYgKHZhbC5hdHRyaWJ1dGUgJiYgaW5Ubykge1xuICAgICAgICAgICAgYXR0ck5hbWUgPSB2YWwuYXR0cmlidXRlO1xuICAgICAgICAgICAgYXR0clZhbCA9IHRvVmFsO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmFsLmJvdW5kICYmIGluVG8pIHtcbiAgICAgICAgICAgIGF0dHJOYW1lID0gdmFsLmJvdW5kO1xuICAgICAgICAgICAgYXR0clZhbCA9IHJlZjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKGF0dHJOYW1lKSAmJiBhbmd1bGFyLmlzRGVmaW5lZChhdHRyVmFsKSkge1xuICAgICAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCBhdHRyTmFtZSwgYXR0clZhbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZnVuY3Rpb24gZ2V0QnVpbHRpbkF0dHJpYnV0ZXMoKSB7XG4gICAgICAgIGxldCBuZ01vZGVsQXR0cmlidXRlcyA9IHtcbiAgICAgICAgICBmb2N1czoge1xuICAgICAgICAgICAgYXR0cmlidXRlOiAnZm9ybWx5LWZvY3VzJ1xuICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYm91bmRPbmx5ID0gW107XG4gICAgICAgIGNvbnN0IGJvdGhBdHRyaWJ1dGVBbmRCb3VuZCA9IFsncmVxdWlyZWQnLCAnZGlzYWJsZWQnLCAncGF0dGVybicsICdtaW5sZW5ndGgnXTtcbiAgICAgICAgY29uc3QgZXhwcmVzc2lvbk9ubHkgPSBbJ2NoYW5nZScsICdrZXlkb3duJywgJ2tleXVwJywgJ2tleXByZXNzJywgJ2NsaWNrJywgJ2ZvY3VzJywgJ2JsdXInXTtcbiAgICAgICAgY29uc3QgYXR0cmlidXRlT25seSA9IFsncGxhY2Vob2xkZXInLCAnbWluJywgJ21heCcsICd0YWJpbmRleCcsICd0eXBlJ107XG4gICAgICAgIGlmIChmb3JtbHlDb25maWcuZXh0cmFzLm5nTW9kZWxBdHRyc01hbmlwdWxhdG9yUHJlZmVyQm91bmQpIHtcbiAgICAgICAgICBib3VuZE9ubHkucHVzaCgnbWF4bGVuZ3RoJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgYm90aEF0dHJpYnV0ZUFuZEJvdW5kLnB1c2goJ21heGxlbmd0aCcpO1xuICAgICAgICB9XG5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKGJvdW5kT25seSwgaXRlbSA9PiB7XG4gICAgICAgICAgbmdNb2RlbEF0dHJpYnV0ZXNbaXRlbV0gPSB7Ym91bmQ6ICduZy0nICsgaXRlbX07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChib3RoQXR0cmlidXRlQW5kQm91bmQsIGl0ZW0gPT4ge1xuICAgICAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW2l0ZW1dID0ge2F0dHJpYnV0ZTogaXRlbSwgYm91bmQ6ICduZy0nICsgaXRlbX07XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaChleHByZXNzaW9uT25seSwgaXRlbSA9PiB7XG4gICAgICAgICAgdmFyIHByb3BOYW1lID0gJ29uJyArIGl0ZW0uc3Vic3RyKDAsIDEpLnRvVXBwZXJDYXNlKCkgKyBpdGVtLnN1YnN0cigxKTtcbiAgICAgICAgICBuZ01vZGVsQXR0cmlidXRlc1twcm9wTmFtZV0gPSB7ZXhwcmVzc2lvbjogJ25nLScgKyBpdGVtfTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKGF0dHJpYnV0ZU9ubHksIGl0ZW0gPT4ge1xuICAgICAgICAgIG5nTW9kZWxBdHRyaWJ1dGVzW2l0ZW1dID0ge2F0dHJpYnV0ZTogaXRlbX07XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm4gbmdNb2RlbEF0dHJpYnV0ZXM7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldEVwVmFsdWUoZXAsIG5hbWUpIHtcbiAgICAgICAgcmV0dXJuIGVwWyd0ZW1wbGF0ZU9wdGlvbnMuJyArIG5hbWVdIHx8XG4gICAgICAgICAgZXBbYHRlbXBsYXRlT3B0aW9uc1snJHtuYW1lfSddYF0gfHxcbiAgICAgICAgICBlcFtgdGVtcGxhdGVPcHRpb25zW1wiJHtuYW1lfVwiXWBdO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRJZk5vdFByZXNlbnQoZWwsIGF0dHIsIHZhbCkge1xuICAgICAgICBpZiAoIWVsLmF0dHIoYXR0cikpIHtcbiAgICAgICAgICBlbC5hdHRyKGF0dHIsIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9ydW4vZm9ybWx5TmdNb2RlbEF0dHJzTWFuaXB1bGF0b3IuanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUucnVuKGFkZEN1c3RvbVRhZ3MpO1xuXG4gIGZ1bmN0aW9uIGFkZEN1c3RvbVRhZ3MoJGRvY3VtZW50KSB7XG5cbiAgICBpZiAoJGRvY3VtZW50ICYmICRkb2N1bWVudC5nZXQpIHtcbiAgICAgIC8vSUU4IGNoZWNrIC0+XG4gICAgICAvLyBodHRwOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzEwOTY0OTY2L2RldGVjdC1pZS12ZXJzaW9uLXByaW9yLXRvLXY5LWluLWphdmFzY3JpcHQvMTA5NjUyMDMjMTA5NjUyMDNcbiAgICAgIHZhciBkb2N1bWVudCA9ICRkb2N1bWVudC5nZXQoMCk7XG4gICAgICB2YXIgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICBkaXYuaW5uZXJIVE1MID0gJzwhLS1baWYgbHQgSUUgOV0+PGk+PC9pPjwhW2VuZGlmXS0tPic7XG4gICAgICB2YXIgaXNJZUxlc3NUaGFuOSA9IChkaXYuZ2V0RWxlbWVudHNCeVRhZ05hbWUoJ2knKS5sZW5ndGggPT09IDEpO1xuXG4gICAgICBpZiAoaXNJZUxlc3NUaGFuOSkge1xuICAgICAgICAvL2FkZCB0aGUgY3VzdG9tIGVsZW1lbnRzIHRoYXQgd2UgbmVlZCBmb3IgZm9ybWx5XG4gICAgICAgIHZhciBjdXN0b21FbGVtZW50cyA9XG4gICAgICAgICAgWydmb3JtbHktZmllbGQnLCAnZm9ybWx5LWZvcm0nLCAnZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uJywgJ2Zvcm1seS1mb2N1cycsICdmb3JtbHktdHJhbnNwb3NlJ107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjdXN0b21FbGVtZW50cy5sZW5ndGg7IGkrKykge1xuICAgICAgICAgIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoY3VzdG9tRWxlbWVudHNbaV0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vcnVuL2Zvcm1seUN1c3RvbVRhZ3MuanNcbiAqKi8iLCJjb25zdCB1dGlscyA9IHJlcXVpcmUoJy4uL290aGVyL3V0aWxzJyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICBuZ01vZHVsZS5mYWN0b3J5KCdmb3JtbHlVdGlsJywgZm9ybWx5VXRpbCk7XG5cbiAgZm9ybWx5VXRpbC50ZXN0cyA9IE9OX1RFU1QgPyByZXF1aXJlKCcuL2Zvcm1seVV0aWwudGVzdCcpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5VXRpbCgpIHtcbiAgICByZXR1cm4gdXRpbHM7XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9zZXJ2aWNlcy9mb3JtbHlVdGlsLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLmZhY3RvcnkoJ2Zvcm1seVdhcm4nLCBmdW5jdGlvbiAoZm9ybWx5Q29uZmlnLCBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LCAkbG9nKSB7XG4gICAgcmV0dXJuIGZ1bmN0aW9uIHdhcm4oKSB7XG4gICAgICBpZiAoIWZvcm1seUNvbmZpZy5kaXNhYmxlV2FybmluZ3MpIHtcbiAgICAgICAgdmFyIGFyZ3MgPSBBcnJheS5wcm90b3R5cGUuc2xpY2UuY2FsbChhcmd1bWVudHMpO1xuICAgICAgICB2YXIgd2FybkluZm9TbHVnID0gYXJncy5zaGlmdCgpO1xuICAgICAgICBhcmdzLnVuc2hpZnQoJ0Zvcm1seSBXYXJuaW5nOicpO1xuICAgICAgICBhcmdzLnB1c2goYCR7Zm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeH0ke3dhcm5JbmZvU2x1Z31gKTtcbiAgICAgICAgJGxvZy53YXJuKC4uLmFyZ3MpO1xuICAgICAgfVxuICAgIH07XG4gIH0pO1xufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL3NlcnZpY2VzL2Zvcm1seVdhcm4uanNcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKCdmb3JtbHlDdXN0b21WYWxpZGF0aW9uJywgZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbik7XG5cbiAgZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbi50ZXN0cyA9IE9OX1RFU1QgPyByZXF1aXJlKCcuL2Zvcm1seS1jdXN0b20tdmFsaWRhdGlvbi50ZXN0JykobmdNb2R1bGUpIDogbnVsbDtcblxuICBmdW5jdGlvbiBmb3JtbHlDdXN0b21WYWxpZGF0aW9uKGZvcm1seVV0aWwsICRxKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICByZXF1aXJlOiAnbmdNb2RlbCcsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWwsIGF0dHJzLCBjdHJsKSB7XG4gICAgICAgIHZhciB2YWxpZGF0b3JzID0gc2NvcGUuJGV2YWwoYXR0cnMuZm9ybWx5Q3VzdG9tVmFsaWRhdGlvbik7XG4gICAgICAgIGlmICghdmFsaWRhdG9ycykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjaGVja1ZhbGlkYXRvcnModmFsaWRhdG9ycyk7XG4gICAgICAgIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlcyA9IHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlcyB8fCB7fTtcblxuXG4gICAgICAgIHZhciB1c2VOZXdWYWxpZGF0b3JzQXBpID0gY3RybC5oYXNPd25Qcm9wZXJ0eSgnJHZhbGlkYXRvcnMnKSAmJiAhYXR0cnMuaGFzT3duUHJvcGVydHkoJ3VzZVBhcnNlcnMnKTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvcnMsIGZ1bmN0aW9uKHZhbGlkYXRvciwgbmFtZSkge1xuICAgICAgICAgIHZhciBtZXNzYWdlID0gdmFsaWRhdG9yLm1lc3NhZ2U7XG4gICAgICAgICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgICAgICAgIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlc1tuYW1lXSA9ICgpID0+IHtcbiAgICAgICAgICAgICAgcmV0dXJuIGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgbWVzc2FnZSwgY3RybC4kbW9kZWxWYWx1ZSwgY3RybC4kdmlld1ZhbHVlKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhbGlkYXRvciA9IGFuZ3VsYXIuaXNPYmplY3QodmFsaWRhdG9yKSA/IHZhbGlkYXRvci5leHByZXNzaW9uIDogdmFsaWRhdG9yO1xuICAgICAgICAgIHZhciBpc1Bvc3NpYmx5QXN5bmMgPSAhYW5ndWxhci5pc1N0cmluZyh2YWxpZGF0b3IpO1xuICAgICAgICAgIGlmICh1c2VOZXdWYWxpZGF0b3JzQXBpKSB7XG4gICAgICAgICAgICBzZXR1cFdpdGhWYWxpZGF0b3JzKCk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNldHVwV2l0aFBhcnNlcnMoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBmdW5jdGlvbiBzZXR1cFdpdGhWYWxpZGF0b3JzKCkge1xuICAgICAgICAgICAgdmFyIHZhbGlkYXRvckNvbGxlY3Rpb24gPSBpc1Bvc3NpYmx5QXN5bmMgPyAnJGFzeW5jVmFsaWRhdG9ycycgOiAnJHZhbGlkYXRvcnMnO1xuICAgICAgICAgICAgY3RybFt2YWxpZGF0b3JDb2xsZWN0aW9uXVtuYW1lXSA9IGZ1bmN0aW9uKG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSkge1xuICAgICAgICAgICAgICB2YXIgdmFsdWUgPSBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIHZhbGlkYXRvciwgbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgaWYgKGlzUG9zc2libHlBc3luYykge1xuICAgICAgICAgICAgICAgIHJldHVybiBpc1Byb21pc2VMaWtlKHZhbHVlKSA/IHZhbHVlIDogdmFsdWUgPyAkcS53aGVuKHZhbHVlKSA6ICRxLnJlamVjdCh2YWx1ZSk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGZ1bmN0aW9uIHNldHVwV2l0aFBhcnNlcnMoKSB7XG4gICAgICAgICAgICBsZXQgaW5GbGlnaHRWYWxpZGF0b3I7XG4gICAgICAgICAgICBjdHJsLiRwYXJzZXJzLnVuc2hpZnQoZnVuY3Rpb24odmlld1ZhbHVlKSB7XG4gICAgICAgICAgICAgIHZhciBpc1ZhbGlkID0gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCB2YWxpZGF0b3IsIGN0cmwuJG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChpc1Byb21pc2VMaWtlKGlzVmFsaWQpKSB7XG4gICAgICAgICAgICAgICAgY3RybC4kcGVuZGluZyA9IGN0cmwuJHBlbmRpbmcgfHwge307XG4gICAgICAgICAgICAgICAgY3RybC4kcGVuZGluZ1tuYW1lXSA9IHRydWU7XG4gICAgICAgICAgICAgICAgaW5GbGlnaHRWYWxpZGF0b3IgPSBpc1ZhbGlkO1xuICAgICAgICAgICAgICAgIGlzVmFsaWQudGhlbigoKSA9PiB7XG4gICAgICAgICAgICAgICAgICBpZiAoaW5GbGlnaHRWYWxpZGF0b3IgPT09IGlzVmFsaWQpIHtcbiAgICAgICAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkobmFtZSwgdHJ1ZSk7XG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSkuY2F0Y2goKCkgPT4ge1xuICAgICAgICAgICAgICAgICAgaWYgKGluRmxpZ2h0VmFsaWRhdG9yID09PSBpc1ZhbGlkKSB7XG4gICAgICAgICAgICAgICAgICAgIGN0cmwuJHNldFZhbGlkaXR5KG5hbWUsIGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KS5maW5hbGx5KCgpID0+IHtcbiAgICAgICAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhjdHJsLiRwZW5kaW5nKS5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgICAgICAgICAgICAgZGVsZXRlIGN0cmwuJHBlbmRpbmc7XG4gICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBkZWxldGUgY3RybC4kcGVuZGluZ1tuYW1lXTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHJsLiRzZXRWYWxpZGl0eShuYW1lLCBpc1ZhbGlkKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICByZXR1cm4gdmlld1ZhbHVlO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gaXNQcm9taXNlTGlrZShvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgYW5ndWxhci5pc0Z1bmN0aW9uKG9iai50aGVuKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1ZhbGlkYXRvcnModmFsaWRhdG9ycykge1xuICAgICAgdmFyIGFsbG93ZWRQcm9wZXJ0aWVzID0gWydleHByZXNzaW9uJywgJ21lc3NhZ2UnXTtcbiAgICAgIHZhciB2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMgPSB7fTtcbiAgICAgIGFuZ3VsYXIuZm9yRWFjaCh2YWxpZGF0b3JzLCAodmFsaWRhdG9yLCBuYW1lKSA9PiB7XG4gICAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKHZhbGlkYXRvcikpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdmFyIGV4dHJhUHJvcHMgPSBbXTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvciwgKHYsIGtleSkgPT4ge1xuICAgICAgICAgIGlmIChhbGxvd2VkUHJvcGVydGllcy5pbmRleE9mKGtleSkgPT09IC0xKSB7XG4gICAgICAgICAgICBleHRyYVByb3BzLnB1c2goa2V5KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgICBpZiAoZXh0cmFQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgICB2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHNbbmFtZV0gPSBleHRyYVByb3BzO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICAgIGlmIChPYmplY3Qua2V5cyh2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMpLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoW1xuICAgICAgICAgIGBWYWxpZGF0b3JzIGFyZSBvbmx5IGFsbG93ZWQgdG8gYmUgZnVuY3Rpb25zIG9yIG9iamVjdHMgdGhhdCBoYXZlICR7YWxsb3dlZFByb3BlcnRpZXMuam9pbignLCAnKX0uYCxcbiAgICAgICAgICBgWW91IHByb3ZpZGVkIHNvbWUgZXh0cmEgcHJvcGVydGllczogJHtKU09OLnN0cmluZ2lmeSh2YWxpZGF0b3JzV2l0aEV4dHJhUHJvcHMpfWBcbiAgICAgICAgXS5qb2luKCcgJykpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufTtcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLmpzXG4gKiovIiwibGV0IGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyLWZpeCcpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlID0+IHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKCdmb3JtbHlGaWVsZCcsIGZvcm1seUZpZWxkKTtcblxuICBmb3JtbHlGaWVsZC50ZXN0cyA9IE9OX1RFU1QgPyByZXF1aXJlKCcuL2Zvcm1seS1maWVsZC50ZXN0JykobmdNb2R1bGUpIDogbnVsbDtcblxuICAvKipcbiAgICogQG5nZG9jIGRpcmVjdGl2ZVxuICAgKiBAbmFtZSBmb3JtbHlGaWVsZFxuICAgKiBAcmVzdHJpY3QgQUVcbiAgICovXG4gIGZ1bmN0aW9uIGZvcm1seUZpZWxkKCRodHRwLCAkcSwgJGNvbXBpbGUsICR0ZW1wbGF0ZUNhY2hlLCBmb3JtbHlDb25maWcsIGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcywgZm9ybWx5QXBpQ2hlY2ssXG4gICAgICAgICAgICAgICAgICAgICAgIGZvcm1seVV0aWwsIGZvcm1seVVzYWJpbGl0eSwgZm9ybWx5V2Fybikge1xuICAgIHJldHVybiB7XG4gICAgICByZXN0cmljdDogJ0FFJyxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICBzY29wZToge1xuICAgICAgICBvcHRpb25zOiAnPScsXG4gICAgICAgIG1vZGVsOiAnPScsXG4gICAgICAgIGZvcm1JZDogJz0/JyxcbiAgICAgICAgaW5kZXg6ICc9PycsXG4gICAgICAgIGZpZWxkczogJz0/JyxcbiAgICAgICAgZm9ybVN0YXRlOiAnPT8nLFxuICAgICAgICBmb3JtOiAnPT8nXG4gICAgICB9LFxuICAgICAgY29udHJvbGxlcjogZnVuY3Rpb24gZmllbGRDb250cm9sbGVyKCRzY29wZSwgJHRpbWVvdXQsICRwYXJzZSwgJGNvbnRyb2xsZXIpIHtcbiAgICAgICAgdmFyIG9wdHMgPSAkc2NvcGUub3B0aW9ucztcbiAgICAgICAgdmFyIGZpZWxkVHlwZSA9IG9wdHMudHlwZSAmJiBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRzLnR5cGUpO1xuICAgICAgICBzaW1wbGlmeUxpZmUob3B0cyk7XG4gICAgICAgIG1lcmdlRmllbGRPcHRpb25zV2l0aFR5cGVEZWZhdWx0cyhvcHRzLCBmaWVsZFR5cGUpO1xuICAgICAgICBleHRlbmRPcHRpb25zV2l0aERlZmF1bHRzKG9wdHMsICRzY29wZS5pbmRleCk7XG4gICAgICAgIGNoZWNrQXBpKG9wdHMpO1xuICAgICAgICAvLyBzZXQgZmllbGQgaWQgdG8gbGluayBsYWJlbHMgYW5kIGZpZWxkc1xuICAgICAgICAkc2NvcGUuaWQgPSBmb3JtbHlVdGlsLmdldEZpZWxkSWQoJHNjb3BlLmZvcm1JZCwgb3B0cywgJHNjb3BlLmluZGV4KTtcblxuICAgICAgICAvLyBpbml0YWxpemF0aW9uXG4gICAgICAgIHJ1bkV4cHJlc3Npb25zKCk7XG4gICAgICAgIHNldEZvcm1Db250cm9sKCRzY29wZSwgb3B0cyk7XG4gICAgICAgIGFkZE1vZGVsV2F0Y2hlcigkc2NvcGUsIG9wdHMpO1xuICAgICAgICBhZGRWYWxpZGF0aW9uTWVzc2FnZXMob3B0cyk7XG4gICAgICAgIC8vIHNpbXBsaWZ5IHRoaW5nc1xuICAgICAgICAvLyBjcmVhdGUgJHNjb3BlLnRvIHNvIHRlbXBsYXRlIGF1dGhvcnMgY2FuIHJlZmVyZW5jZSB0byBpbnN0ZWFkIG9mICRzY29wZS5vcHRpb25zLnRlbXBsYXRlT3B0aW9uc1xuICAgICAgICAkc2NvcGUudG8gPSAkc2NvcGUub3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnM7XG4gICAgICAgIGludm9rZUNvbnRyb2xsZXJzKCRzY29wZSwgb3B0cywgZmllbGRUeXBlKTtcblxuICAgICAgICAvLyBmdW5jdGlvbiBkZWZpbml0aW9uc1xuICAgICAgICBmdW5jdGlvbiBydW5FeHByZXNzaW9ucygpIHtcbiAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHsgLy8gbXVzdCBydW4gb24gbmV4dCB0aWNrIHRvIG1ha2Ugc3VyZSB0aGF0IHRoZSBjdXJyZW50IHZhbHVlIGlzIGNvcnJlY3QuXG4gICAgICAgICAgICB2YXIgZmllbGQgPSAkc2NvcGUub3B0aW9ucztcbiAgICAgICAgICAgIHZhciBjdXJyZW50VmFsdWUgPSB2YWx1ZUdldHRlclNldHRlcigpO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGZpZWxkLmV4cHJlc3Npb25Qcm9wZXJ0aWVzLCBmdW5jdGlvbiBydW5FeHByZXNzaW9uKGV4cHJlc3Npb24sIHByb3ApIHtcbiAgICAgICAgICAgICAgdmFyIHNldHRlciA9ICRwYXJzZShwcm9wKS5hc3NpZ247XG4gICAgICAgICAgICAgIHZhciBwcm9taXNlID0gJHEud2hlbihmb3JtbHlVdGlsLmZvcm1seUV2YWwoJHNjb3BlLCBleHByZXNzaW9uLCBjdXJyZW50VmFsdWUpKTtcbiAgICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uKHZhbHVlKSB7XG4gICAgICAgICAgICAgICAgc2V0dGVyKGZpZWxkLCB2YWx1ZSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiB2YWx1ZUdldHRlclNldHRlcihuZXdWYWwpIHtcbiAgICAgICAgICBpZiAoISRzY29wZS5tb2RlbCB8fCAhJHNjb3BlLm9wdGlvbnMua2V5KSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChuZXdWYWwpKSB7XG4gICAgICAgICAgICAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XSA9IG5ld1ZhbDtcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuICRzY29wZS5tb2RlbFskc2NvcGUub3B0aW9ucy5rZXldO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2ltcGxpZnlMaWZlKG9wdGlvbnMpIHtcbiAgICAgICAgICAvLyBhZGQgYSBmZXcgZW1wdHkgb2JqZWN0cyAoaWYgdGhleSBkb24ndCBhbHJlYWR5IGV4aXN0KSBzbyB5b3UgZG9uJ3QgaGF2ZSB0byB1bmRlZmluZWQgY2hlY2sgZXZlcnl3aGVyZVxuICAgICAgICAgIGZvcm1seVV0aWwucmV2ZXJzZURlZXBNZXJnZShvcHRpb25zLCB7XG4gICAgICAgICAgICBkYXRhOiB7fSxcbiAgICAgICAgICAgIHRlbXBsYXRlT3B0aW9uczoge30sXG4gICAgICAgICAgICB2YWxpZGF0aW9uOiB7fVxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbWVyZ2VGaWVsZE9wdGlvbnNXaXRoVHlwZURlZmF1bHRzKG9wdGlvbnMsIHR5cGUpIHtcbiAgICAgICAgICBpZiAodHlwZSkge1xuICAgICAgICAgICAgbWVyZ2VPcHRpb25zKG9wdGlvbnMsIHR5cGUuZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgcHJvcGVyT3JkZXIgPSBhcnJheWlmeShvcHRpb25zLm9wdGlvbnNUeXBlcykucmV2ZXJzZSgpOyAvLyBzbyB0aGUgcmlnaHQgdGhpbmdzIGFyZSBvdmVycmlkZGVuXG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHByb3Blck9yZGVyLCB0eXBlTmFtZSA9PiB7XG4gICAgICAgICAgICBtZXJnZU9wdGlvbnMob3B0aW9ucywgZm9ybWx5Q29uZmlnLmdldFR5cGUodHlwZU5hbWUsIHRydWUsIG9wdGlvbnMpLmRlZmF1bHRPcHRpb25zKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1lcmdlT3B0aW9ucyhvcHRpb25zLCBleHRyYU9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAoZXh0cmFPcHRpb25zKSB7XG4gICAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKGV4dHJhT3B0aW9ucykpIHtcbiAgICAgICAgICAgICAgZXh0cmFPcHRpb25zID0gZXh0cmFPcHRpb25zKG9wdGlvbnMpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZm9ybWx5VXRpbC5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIGV4dHJhT3B0aW9ucyk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZXh0ZW5kT3B0aW9uc1dpdGhEZWZhdWx0cyhvcHRpb25zLCBpbmRleCkge1xuICAgICAgICAgIGFuZ3VsYXIuZXh0ZW5kKG9wdGlvbnMsIHtcbiAgICAgICAgICAgIC8vIGF0dGFjaCB0aGUga2V5IGluIGNhc2UgdGhlIGZvcm1seS1maWVsZCBkaXJlY3RpdmUgaXMgdXNlZCBkaXJlY3RseVxuICAgICAgICAgICAga2V5OiBvcHRpb25zLmtleSB8fCBpbmRleCB8fCAwLFxuICAgICAgICAgICAgdmFsdWU6IHZhbHVlR2V0dGVyU2V0dGVyLFxuICAgICAgICAgICAgcnVuRXhwcmVzc2lvbnM6IHJ1bkV4cHJlc3Npb25zXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBpbml0aWFsaXphdGlvbiBmdW5jdGlvbnNcbiAgICAgICAgZnVuY3Rpb24gc2V0Rm9ybUNvbnRyb2woc2NvcGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5ub0Zvcm1Db250cm9sKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHNjb3BlLiR3YXRjaCgnZm9ybVtcIicgKyBzY29wZS5pZCArICdcIl0nLCBmdW5jdGlvbihmb3JtQ29udHJvbCkge1xuICAgICAgICAgICAgaWYgKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICAgIHNjb3BlLmZjID0gZm9ybUNvbnRyb2w7IC8vIHNob3J0Y3V0IGZvciB0ZW1wbGF0ZSBhdXRob3JzXG4gICAgICAgICAgICAgIHNjb3BlLm9wdGlvbnMuZm9ybUNvbnRyb2wgPSBmb3JtQ29udHJvbDtcbiAgICAgICAgICAgICAgYWRkU2hvd01lc3NhZ2VzV2F0Y2hlcihzY29wZSwgb3B0aW9ucyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBhZGRNb2RlbFdhdGNoZXIoc2NvcGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICBpZiAob3B0aW9ucy5tb2RlbCkge1xuICAgICAgICAgICAgc2NvcGUuJHdhdGNoKCdvcHRpb25zLm1vZGVsJywgcnVuRXhwcmVzc2lvbnMsIHRydWUpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGFkZFNob3dNZXNzYWdlc1dhdGNoZXIoc2NvcGUsIG9wdGlvbnMpIHtcbiAgICAgICAgICBzY29wZS4kd2F0Y2goZnVuY3Rpb24oKSB7XG4gICAgICAgICAgICBpZiAodHlwZW9mIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5zaG93ID09PSAnYm9vbGVhbicpIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmZjLiRpbnZhbGlkICYmIHNjb3BlLm9wdGlvbnMudmFsaWRhdGlvbi5zaG93O1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHNjb3BlLmZjLiRpbnZhbGlkICYmIHNjb3BlLmZjLiR0b3VjaGVkO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGZ1bmN0aW9uKHNob3cpIHtcbiAgICAgICAgICAgIG9wdGlvbnMudmFsaWRhdGlvbi5lcnJvckV4aXN0c0FuZFNob3VsZEJlVmlzaWJsZSA9IHNob3c7XG4gICAgICAgICAgICBzY29wZS5zaG93RXJyb3IgPSBzaG93OyAvLyBzaG9ydGN1dCBmb3IgdGVtcGxhdGUgYXV0aG9yc1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gYWRkVmFsaWRhdGlvbk1lc3NhZ2VzKG9wdGlvbnMpIHtcbiAgICAgICAgICBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgPSBvcHRpb25zLnZhbGlkYXRpb24ubWVzc2FnZXMgfHwge307XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGZvcm1seVZhbGlkYXRpb25NZXNzYWdlcy5tZXNzYWdlcywgZnVuY3Rpb24gKGV4cHJlc3Npb24sIG5hbWUpIHtcbiAgICAgICAgICAgIGlmICghb3B0aW9ucy52YWxpZGF0aW9uLm1lc3NhZ2VzW25hbWVdKSB7XG4gICAgICAgICAgICAgIG9wdGlvbnMudmFsaWRhdGlvbi5tZXNzYWdlc1tuYW1lXSA9IGZ1bmN0aW9uICh2aWV3VmFsdWUsIG1vZGVsVmFsdWUsIHNjb3BlKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGZvcm1seVV0aWwuZm9ybWx5RXZhbChzY29wZSwgZXhwcmVzc2lvbiwgbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGludm9rZUNvbnRyb2xsZXJzKHNjb3BlLCBvcHRpb25zID0ge30sIHR5cGUgPSB7fSkge1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaChbdHlwZS5jb250cm9sbGVyLCBvcHRpb25zLmNvbnRyb2xsZXJdLCBjb250cm9sbGVyID0+IHtcbiAgICAgICAgICAgIGlmIChjb250cm9sbGVyKSB7XG4gICAgICAgICAgICAgICRjb250cm9sbGVyKGNvbnRyb2xsZXIsIHskc2NvcGU6IHNjb3BlfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbiBmaWVsZExpbmsoc2NvcGUsIGVsKSB7XG4gICAgICAgIHZhciB0eXBlID0gc2NvcGUub3B0aW9ucy50eXBlICYmIGZvcm1seUNvbmZpZy5nZXRUeXBlKHNjb3BlLm9wdGlvbnMudHlwZSk7XG4gICAgICAgIHZhciBhcmdzID0gYXJndW1lbnRzO1xuICAgICAgICB2YXIgdGh1c2x5ID0gdGhpcztcbiAgICAgICAgZ2V0RmllbGRUZW1wbGF0ZShzY29wZS5vcHRpb25zKVxuICAgICAgICAgIC50aGVuKHJ1bk1hbmlwdWxhdG9ycyhmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlcikpXG4gICAgICAgICAgLnRoZW4odHJhbnNjbHVkZUluV3JhcHBlcnMoc2NvcGUub3B0aW9ucykpXG4gICAgICAgICAgLnRoZW4ocnVuTWFuaXB1bGF0b3JzKGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wb3N0V3JhcHBlcikpXG4gICAgICAgICAgLnRoZW4oc2V0RWxlbWVudFRlbXBsYXRlKVxuICAgICAgICAgIC5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgICAgICBmb3JtbHlXYXJuKFxuICAgICAgICAgICAgICAndGhlcmUtd2FzLWEtcHJvYmxlbS1zZXR0aW5nLXRoZS10ZW1wbGF0ZS1mb3ItdGhpcy1maWVsZCcsXG4gICAgICAgICAgICAgICdUaGVyZSB3YXMgYSBwcm9ibGVtIHNldHRpbmcgdGhlIHRlbXBsYXRlIGZvciB0aGlzIGZpZWxkICcsXG4gICAgICAgICAgICAgIHNjb3BlLm9wdGlvbnMsXG4gICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNldEVsZW1lbnRUZW1wbGF0ZSh0ZW1wbGF0ZUVsKSB7XG4gICAgICAgICAgZWwuaHRtbChhc0h0bWwodGVtcGxhdGVFbCkpO1xuICAgICAgICAgICRjb21waWxlKGVsLmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgICBpZiAodHlwZSAmJiB0eXBlLmxpbmspIHtcbiAgICAgICAgICAgIHR5cGUubGluay5hcHBseSh0aHVzbHksIGFyZ3MpO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoc2NvcGUub3B0aW9ucy5saW5rKSB7XG4gICAgICAgICAgICBzY29wZS5vcHRpb25zLmxpbmsuYXBwbHkodGh1c2x5LCBhcmdzKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBydW5NYW5pcHVsYXRvcnMobWFuaXB1bGF0b3JzKSB7XG4gICAgICAgICAgcmV0dXJuIGZ1bmN0aW9uIHJ1bk1hbmlwdWxhdG9yc09uVGVtcGxhdGUodGVtcGxhdGUpIHtcbiAgICAgICAgICAgIHZhciBjaGFpbiA9ICRxLndoZW4odGVtcGxhdGUpO1xuICAgICAgICAgICAgYW5ndWxhci5mb3JFYWNoKG1hbmlwdWxhdG9ycywgbWFuaXB1bGF0b3IgPT4ge1xuICAgICAgICAgICAgICBjaGFpbiA9IGNoYWluLnRoZW4odGVtcGxhdGUgPT4ge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKG1hbmlwdWxhdG9yKHRlbXBsYXRlLCBzY29wZS5vcHRpb25zLCBzY29wZSkpLnRoZW4obmV3VGVtcGxhdGUgPT4ge1xuICAgICAgICAgICAgICAgICAgcmV0dXJuIGFuZ3VsYXIuaXNTdHJpbmcobmV3VGVtcGxhdGUpID8gbmV3VGVtcGxhdGUgOiBhc0h0bWwobmV3VGVtcGxhdGUpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuIGNoYWluO1xuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gYXNIdG1sKGVsKSB7XG4gICAgICB2YXIgd3JhcHBlciA9IGFuZ3VsYXIuZWxlbWVudCgnPGE+PC9hPicpO1xuICAgICAgcmV0dXJuIHdyYXBwZXIuYXBwZW5kKGVsKS5odG1sKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RmllbGRUZW1wbGF0ZShvcHRpb25zKSB7XG4gICAgICBsZXQgdHlwZSA9IGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSwgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgICBsZXQgdGVtcGxhdGUgPSBvcHRpb25zLnRlbXBsYXRlIHx8IHR5cGUgJiYgdHlwZS50ZW1wbGF0ZTtcbiAgICAgIGxldCB0ZW1wbGF0ZVVybCA9IG9wdGlvbnMudGVtcGxhdGVVcmwgfHwgdHlwZSAmJiB0eXBlLnRlbXBsYXRlVXJsO1xuICAgICAgaWYgKCF0ZW1wbGF0ZSAmJiAhdGVtcGxhdGVVcmwpIHtcbiAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXG4gICAgICAgICAgJ3R5cGUtdHlwZS1oYXMtbm8tdGVtcGxhdGUnLFxuICAgICAgICAgIGBUeXBlICcke29wdGlvbnMudHlwZX0nIGhhcyBub3QgdGVtcGxhdGUuIE9uIGVsZW1lbnQ6YCwgb3B0aW9uc1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGdldFRlbXBsYXRlKHRlbXBsYXRlIHx8IHRlbXBsYXRlVXJsLCAhdGVtcGxhdGUpO1xuICAgIH1cblxuXG4gICAgZnVuY3Rpb24gZ2V0VGVtcGxhdGUodGVtcGxhdGUsIGlzVXJsKSB7XG4gICAgICBpZiAoIWlzVXJsKSB7XG4gICAgICAgIHJldHVybiAkcS53aGVuKHRlbXBsYXRlKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBodHRwT3B0aW9ucyA9IHtjYWNoZTogJHRlbXBsYXRlQ2FjaGV9O1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHRlbXBsYXRlLCBodHRwT3B0aW9ucykudGhlbihmdW5jdGlvbihyZXNwb25zZSkge1xuICAgICAgICAgIHJldHVybiByZXNwb25zZS5kYXRhO1xuICAgICAgICB9KS5jYXRjaChmdW5jdGlvbihlcnJvcikge1xuICAgICAgICAgIGZvcm1seVdhcm4oXG4gICAgICAgICAgICAncHJvYmxlbS1sb2FkaW5nLXRlbXBsYXRlLWZvci10ZW1wbGF0ZXVybCcsXG4gICAgICAgICAgICAnUHJvYmxlbSBsb2FkaW5nIHRlbXBsYXRlIGZvciAnICsgdGVtcGxhdGUsXG4gICAgICAgICAgICBlcnJvclxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHRyYW5zY2x1ZGVJbldyYXBwZXJzKG9wdGlvbnMpIHtcbiAgICAgIGxldCB3cmFwcGVyID0gZ2V0V3JhcHBlck9wdGlvbihvcHRpb25zKTtcblxuICAgICAgcmV0dXJuIGZ1bmN0aW9uIHRyYW5zY2x1ZGVUZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgICBpZiAoIXdyYXBwZXIubGVuZ3RoKSB7XG4gICAgICAgICAgcmV0dXJuICRxLndoZW4odGVtcGxhdGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgd3JhcHBlci5mb3JFYWNoKCh3cmFwcGVyKSA9PiB7XG4gICAgICAgICAgZm9ybWx5VXNhYmlsaXR5LmNoZWNrV3JhcHBlcih3cmFwcGVyLCBvcHRpb25zKTtcbiAgICAgICAgICB3cmFwcGVyLnZhbGlkYXRlT3B0aW9ucyAmJiB3cmFwcGVyLnZhbGlkYXRlT3B0aW9ucyhvcHRpb25zKTtcbiAgICAgICAgICBydW5BcGlDaGVjayh3cmFwcGVyLCBvcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICAgIGxldCBwcm9taXNlcyA9IHdyYXBwZXIubWFwKHcgPT4gZ2V0VGVtcGxhdGUody50ZW1wbGF0ZSB8fCB3LnRlbXBsYXRlVXJsLCAhdy50ZW1wbGF0ZSkpO1xuICAgICAgICByZXR1cm4gJHEuYWxsKHByb21pc2VzKS50aGVuKHdyYXBwZXJzVGVtcGxhdGVzID0+IHtcbiAgICAgICAgICB3cmFwcGVyc1RlbXBsYXRlcy5mb3JFYWNoKCh3cmFwcGVyVGVtcGxhdGUsIGluZGV4KSA9PiB7XG4gICAgICAgICAgICBmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyVGVtcGxhdGUod3JhcHBlclRlbXBsYXRlLCB3cmFwcGVyW2luZGV4XSk7XG4gICAgICAgICAgfSk7XG4gICAgICAgICAgd3JhcHBlcnNUZW1wbGF0ZXMucmV2ZXJzZSgpOyAvLyB3cmFwcGVyIDAgaXMgd3JhcHBlZCBpbiB3cmFwcGVyIDEgYW5kIHNvIG9uLi4uXG4gICAgICAgICAgbGV0IHRvdGFsV3JhcHBlciA9IHdyYXBwZXJzVGVtcGxhdGVzLnNoaWZ0KCk7XG4gICAgICAgICAgd3JhcHBlcnNUZW1wbGF0ZXMuZm9yRWFjaCh3cmFwcGVyVGVtcGxhdGUgPT4ge1xuICAgICAgICAgICAgdG90YWxXcmFwcGVyID0gZG9UcmFuc2NsdXNpb24odG90YWxXcmFwcGVyLCB3cmFwcGVyVGVtcGxhdGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiBkb1RyYW5zY2x1c2lvbih0b3RhbFdyYXBwZXIsIHRlbXBsYXRlKTtcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGRvVHJhbnNjbHVzaW9uKHdyYXBwZXIsIHRlbXBsYXRlKSB7XG4gICAgICBsZXQgc3VwZXJXcmFwcGVyID0gYW5ndWxhci5lbGVtZW50KCc8YT48L2E+Jyk7IC8vIHRoaXMgYWxsb3dzIHBlb3BsZSBub3QgaGF2ZSB0byBoYXZlIGEgc2luZ2xlIHJvb3QgaW4gd3JhcHBlcnNcbiAgICAgIHN1cGVyV3JhcHBlci5hcHBlbmQod3JhcHBlcik7XG4gICAgICBsZXQgdHJhbnNjbHVkZUVsID0gc3VwZXJXcmFwcGVyLmZpbmQoJ2Zvcm1seS10cmFuc2NsdWRlJyk7XG4gICAgICBpZiAoIXRyYW5zY2x1ZGVFbC5sZW5ndGgpIHtcbiAgICAgICAgLy90cnkgaXQgdXNpbmcgb3VyIGN1c3RvbSBmaW5kIGZ1bmN0aW9uXG4gICAgICAgIHRyYW5zY2x1ZGVFbCA9IGZvcm1seVV0aWwuZmluZEJ5Tm9kZU5hbWUoc3VwZXJXcmFwcGVyLCAnZm9ybWx5LXRyYW5zY2x1ZGUnKTtcbiAgICAgIH1cbiAgICAgIHRyYW5zY2x1ZGVFbC5yZXBsYWNlV2l0aCh0ZW1wbGF0ZSk7XG4gICAgICByZXR1cm4gc3VwZXJXcmFwcGVyLmh0bWwoKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXcmFwcGVyT3B0aW9uKG9wdGlvbnMpIHtcbiAgICAgIGxldCB3cmFwcGVyID0gb3B0aW9ucy53cmFwcGVyO1xuICAgICAgLy8gZXhwbGljaXQgbnVsbCBtZWFucyBubyB3cmFwcGVyXG4gICAgICBpZiAod3JhcHBlciA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gW107XG4gICAgICB9XG5cbiAgICAgIC8vIG5vdGhpbmcgc3BlY2lmaWVkIG1lYW5zIHVzZSB0aGUgZGVmYXVsdCB3cmFwcGVyIGZvciB0aGUgdHlwZVxuICAgICAgaWYgKCF3cmFwcGVyKSB7XG4gICAgICAgIC8vIGdldCBhbGwgd3JhcHBlcnMgdGhhdCBzcGVjaWZ5IHRoZXkgYXBwbHkgdG8gdGhpcyB0eXBlXG4gICAgICAgIHdyYXBwZXIgPSBhcnJheWlmeShmb3JtbHlDb25maWcuZ2V0V3JhcHBlckJ5VHlwZShvcHRpb25zLnR5cGUpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdyYXBwZXIgPSBhcnJheWlmeSh3cmFwcGVyKS5tYXAoZm9ybWx5Q29uZmlnLmdldFdyYXBwZXIpO1xuICAgICAgfVxuXG4gICAgICAvLyBnZXQgYWxsIHdyYXBwZXJzIGZvciB0aGF0IHRoaXMgdHlwZSBzcGVjaWZpZWQgdGhhdCBpdCB1c2VzLlxuICAgICAgdmFyIHR5cGUgPSBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRpb25zLnR5cGUsIHRydWUsIG9wdGlvbnMpO1xuICAgICAgaWYgKHR5cGUgJiYgdHlwZS53cmFwcGVyKSB7XG4gICAgICAgIGxldCB0eXBlV3JhcHBlcnMgPSBhcnJheWlmeSh0eXBlLndyYXBwZXIpLm1hcChmb3JtbHlDb25maWcuZ2V0V3JhcHBlcik7XG4gICAgICAgIHdyYXBwZXIgPSB3cmFwcGVyLmNvbmNhdCh0eXBlV3JhcHBlcnMpO1xuICAgICAgfVxuXG4gICAgICAvLyBhZGQgdGhlIGRlZmF1bHQgd3JhcHBlciBsYXN0XG4gICAgICB2YXIgZGVmYXVsdFdyYXBwZXIgPSBmb3JtbHlDb25maWcuZ2V0V3JhcHBlcigpO1xuICAgICAgaWYgKGRlZmF1bHRXcmFwcGVyKSB7XG4gICAgICAgIHdyYXBwZXIucHVzaChkZWZhdWx0V3JhcHBlcik7XG4gICAgICB9XG4gICAgICByZXR1cm4gd3JhcHBlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja0FwaShvcHRpb25zKSB7XG4gICAgICBmb3JtbHlBcGlDaGVjay50aHJvdyhmb3JtbHlBcGlDaGVjay5mb3JtbHlGaWVsZE9wdGlvbnMsIGFyZ3VtZW50cywge1xuICAgICAgICBwcmVmaXg6ICdmb3JtbHktZmllbGQgZGlyZWN0aXZlJyxcbiAgICAgICAgdXJsOiAnZm9ybWx5LWZpZWxkLWRpcmVjdGl2ZS12YWxpZGF0aW9uLWZhaWxlZCdcbiAgICAgIH0pO1xuICAgICAgLy8gdmFsaWRhdGUgd2l0aCB0aGUgdHlwZVxuICAgICAgY29uc3QgdHlwZSA9IG9wdGlvbnMudHlwZSAmJiBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRpb25zLnR5cGUpO1xuICAgICAgaWYgKHR5cGUpIHtcbiAgICAgICAgaWYgKHR5cGUudmFsaWRhdGVPcHRpb25zKSB7XG4gICAgICAgICAgdHlwZS52YWxpZGF0ZU9wdGlvbnMob3B0aW9ucyk7XG4gICAgICAgIH1cbiAgICAgICAgcnVuQXBpQ2hlY2sodHlwZSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcnVuQXBpQ2hlY2soe2FwaUNoZWNrLCBhcGlDaGVja0luc3RhbmNlLCBhcGlDaGVja0Z1bmN0aW9uLCBhcGlDaGVja09wdGlvbnN9LCBvcHRpb25zKSB7XG4gICAgICBpZiAoIWFwaUNoZWNrKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGluc3RhbmNlID0gYXBpQ2hlY2tJbnN0YW5jZSB8fCBmb3JtbHlBcGlDaGVjaztcbiAgICAgIGNvbnN0IGZuID0gYXBpQ2hlY2tGdW5jdGlvbiB8fCAnd2Fybic7XG4gICAgICBjb25zdCBzaGFwZSA9IGluc3RhbmNlLnNoYXBlKGFwaUNoZWNrKTtcbiAgICAgIGluc3RhbmNlW2ZuXShzaGFwZSwgW29wdGlvbnNdLCBhcGlDaGVja09wdGlvbnMgfHwge1xuICAgICAgICBwcmVmaXg6IGBmb3JtbHktZmllbGQgJHtuYW1lfWAsXG4gICAgICAgIHVybDogZm9ybWx5QXBpQ2hlY2suY29uZmlnLm91dHB1dC5kb2NzQmFzZVVybCArICdmb3JtbHktZmllbGQtdHlwZS1hcGljaGVjay1mYWlsZWQnXG4gICAgICB9KTtcbiAgICB9XG5cbiAgfVxuXG4gIGZ1bmN0aW9uIGFycmF5aWZ5KG9iaikge1xuICAgIGlmIChvYmogJiYgIWFuZ3VsYXIuaXNBcnJheShvYmopKSB7XG4gICAgICBvYmogPSBbb2JqXTtcbiAgICB9IGVsc2UgaWYgKCFvYmopIHtcbiAgICAgIG9iaiA9IFtdO1xuICAgIH1cbiAgICByZXR1cm4gb2JqO1xuICB9XG59O1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi4vfi9qc2hpbnQtbG9hZGVyIS4vZGlyZWN0aXZlcy9mb3JtbHktZmllbGQuanNcbiAqKi8iLCJsZXQgYW5ndWxhciA9IHJlcXVpcmUoJ2FuZ3VsYXItZml4Jyk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGUgPT4ge1xuICBuZ01vZHVsZS5kaXJlY3RpdmUoJ2Zvcm1seUZvcm0nLCBmb3JtbHlGb3JtKTtcblxuICBmb3JtbHlGb3JtLnRlc3RzID0gT05fVEVTVCA/IHJlcXVpcmUoJy4vZm9ybWx5LWZvcm0udGVzdCcpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgLyoqXG4gICAqIEBuZ2RvYyBkaXJlY3RpdmVcbiAgICogQG5hbWUgZm9ybWx5Rm9ybVxuICAgKiBAcmVzdHJpY3QgRVxuICAgKi9cbiAgZnVuY3Rpb24gZm9ybWx5Rm9ybShmb3JtbHlVc2FiaWxpdHkpIHtcbiAgICB2YXIgY3VycmVudEZvcm1JZCA9IDE7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnRScsXG4gICAgICB0ZW1wbGF0ZTogZnVuY3Rpb24oZWwsIGF0dHJzKSB7XG4gICAgICAgIC8qIGpzaGludCAtVzAzMyAqLyAvLyB0aGlzIGJlY2F1c2UganNoaW50IGlzIGJyb2tlbiBJIGd1ZXNzLi4uXG4gICAgICAgIHZhciByb290RWwgPSBhdHRycy5yb290RWwgfHwgJ25nLWZvcm0nO1xuICAgICAgICByZXR1cm4gYFxuICAgICAgICAgIDwke3Jvb3RFbH0gY2xhc3M9XCJmb3JtbHlcIlxuICAgICAgICAgICAgICAgICAgIG5hbWU9XCJmb3JtXCJcbiAgICAgICAgICAgICAgICAgICByb2xlPVwiZm9ybVwiPlxuICAgICAgICAgICAgPGRpdiBmb3JtbHktZmllbGRcbiAgICAgICAgICAgICAgICAgbmctcmVwZWF0PVwiZmllbGQgaW4gZmllbGRzIHRyYWNrIGJ5ICRpbmRleFwiXG4gICAgICAgICAgICAgICAgIG5nLWlmPVwiIWZpZWxkLmhpZGVcIlxuICAgICAgICAgICAgICAgICBjbGFzcz1cImZvcm1seS1maWVsZCB7e2ZpZWxkLnR5cGUgPyAnZm9ybWx5LWZpZWxkLScgKyBmaWVsZC50eXBlIDogJyd9fVwiXG4gICAgICAgICAgICAgICAgIG9wdGlvbnM9XCJmaWVsZFwiXG4gICAgICAgICAgICAgICAgIG1vZGVsPVwiZmllbGQubW9kZWwgfHwgbW9kZWxcIlxuICAgICAgICAgICAgICAgICBmaWVsZHM9XCJmaWVsZHNcIlxuICAgICAgICAgICAgICAgICBmb3JtPVwiZm9ybVwiXG4gICAgICAgICAgICAgICAgIGZvcm0taWQ9XCJmb3JtSWRcIlxuICAgICAgICAgICAgICAgICBmb3JtLXN0YXRlPVwib3B0aW9ucy5mb3JtU3RhdGVcIlxuICAgICAgICAgICAgICAgICBpbmRleD1cIiRpbmRleFwiPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8ZGl2IG5nLXRyYW5zY2x1ZGU+PC9kaXY+XG4gICAgICAgICAgPC8ke3Jvb3RFbH0+XG4gICAgICAgIGA7XG4gICAgICB9LFxuICAgICAgcmVwbGFjZTogdHJ1ZSxcbiAgICAgIHRyYW5zY2x1ZGU6IHRydWUsXG4gICAgICBzY29wZToge1xuICAgICAgICBmaWVsZHM6ICc9JyxcbiAgICAgICAgbW9kZWw6ICc9JywgLy8gd2UnbGwgZG8gb3VyIG93biB3YXJuaW5nIHRvIGhlbHAgd2l0aCBtaWdyYXRpb25zXG4gICAgICAgIGZvcm06ICc9PycsXG4gICAgICAgIG9wdGlvbnM6ICc9PydcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBmdW5jdGlvbigkc2NvcGUpIHtcbiAgICAgICAgJHNjb3BlLmZvcm1JZCA9IGBmb3JtbHlfJHtjdXJyZW50Rm9ybUlkKyt9YDtcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMgPSAkc2NvcGUub3B0aW9ucyB8fCB7fTtcbiAgICAgICAgJHNjb3BlLm9wdGlvbnMuZm9ybVN0YXRlID0gJHNjb3BlLm9wdGlvbnMuZm9ybVN0YXRlIHx8IHt9O1xuXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBhdHRhY2hLZXkpOyAvLyBhdHRhY2hlcyBhIGtleSBiYXNlZCBvbiB0aGUgaW5kZXggaWYgYSBrZXkgaXNuJ3Qgc3BlY2lmaWVkXG4gICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBzZXR1cFdhdGNoZXJzKTsgLy8gc2V0dXAgd2F0Y2hlcnMgZm9yIGFsbCBmaWVsZHNcblxuICAgICAgICAvLyB3YXRjaCB0aGUgbW9kZWwgYW5kIGV2YWx1YXRlIHdhdGNoIGV4cHJlc3Npb25zIHRoYXQgZGVwZW5kIG9uIGl0LlxuICAgICAgICAkc2NvcGUuJHdhdGNoKCdtb2RlbCcsIGZ1bmN0aW9uIG9uUmVzdWx0VXBkYXRlKG5ld1Jlc3VsdCkge1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUuZmllbGRzLCBmdW5jdGlvbihmaWVsZCkge1xuICAgICAgICAgICAgLypqc2hpbnQgLVcwMzAgKi9cbiAgICAgICAgICAgIGZpZWxkLnJ1bkV4cHJlc3Npb25zICYmIGZpZWxkLnJ1bkV4cHJlc3Npb25zKG5ld1Jlc3VsdCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sIHRydWUpO1xuXG4gICAgICAgIGZ1bmN0aW9uIGF0dGFjaEtleShmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICBmaWVsZC5rZXkgPSBmaWVsZC5rZXkgfHwgaW5kZXggfHwgMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldHVwV2F0Y2hlcnMoZmllbGQsIGluZGV4KSB7XG4gICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChmaWVsZC53YXRjaGVyKSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgd2F0Y2hlcnMgPSBmaWVsZC53YXRjaGVyO1xuICAgICAgICAgIGlmICghYW5ndWxhci5pc0FycmF5KHdhdGNoZXJzKSkge1xuICAgICAgICAgICAgd2F0Y2hlcnMgPSBbd2F0Y2hlcnNdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2god2F0Y2hlcnMsIGZ1bmN0aW9uKHdhdGNoZXIpIHtcbiAgICAgICAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQod2F0Y2hlci5saXN0ZW5lcikpIHtcbiAgICAgICAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXG4gICAgICAgICAgICAgICAgJ2FsbC1maWVsZC13YXRjaGVycy1tdXN0LWhhdmUtYS1saXN0ZW5lcicsXG4gICAgICAgICAgICAgICAgJ0FsbCBmaWVsZCB3YXRjaGVycyBtdXN0IGhhdmUgYSBsaXN0ZW5lcicsIGZpZWxkXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgd2F0Y2hFeHByZXNzaW9uID0gZ2V0V2F0Y2hFeHByZXNzaW9uKHdhdGNoZXIsIGZpZWxkLCBpbmRleCk7XG4gICAgICAgICAgICB2YXIgd2F0Y2hMaXN0ZW5lciA9IGdldFdhdGNoTGlzdGVuZXIod2F0Y2hlciwgZmllbGQsIGluZGV4KTtcblxuICAgICAgICAgICAgdmFyIHR5cGUgPSB3YXRjaGVyLnR5cGUgfHwgJyR3YXRjaCc7XG4gICAgICAgICAgICB3YXRjaGVyLnN0b3BXYXRjaGluZyA9ICRzY29wZVt0eXBlXSh3YXRjaEV4cHJlc3Npb24sIHdhdGNoTGlzdGVuZXIsIHdhdGNoZXIud2F0Y2hEZWVwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFdhdGNoRXhwcmVzc2lvbih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICB2YXIgd2F0Y2hFeHByZXNzaW9uID0gd2F0Y2hlci5leHByZXNzaW9uIHx8IGBtb2RlbFsnJHtmaWVsZC5rZXl9J11gO1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24od2F0Y2hFeHByZXNzaW9uKSkge1xuICAgICAgICAgICAgLy8gd3JhcCB0aGUgZmllbGQncyB3YXRjaCBleHByZXNzaW9uIHNvIHdlIGNhbiBjYWxsIGl0IHdpdGggdGhlIGZpZWxkIGFzIHRoZSBmaXJzdCBhcmdcbiAgICAgICAgICAgIC8vIGFuZCB0aGUgc3RvcCBmdW5jdGlvbiBhcyB0aGUgbGFzdCBhcmcgYXMgYSBoZWxwZXJcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbEV4cHJlc3Npb24gPSB3YXRjaEV4cHJlc3Npb247XG4gICAgICAgICAgICB3YXRjaEV4cHJlc3Npb24gPSBmdW5jdGlvbiBmb3JtbHlXYXRjaEV4cHJlc3Npb24oKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gbW9kaWZ5QXJncyh3YXRjaGVyLCBpbmRleCwgLi4uYXJndW1lbnRzKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRXhwcmVzc2lvbiguLi5hcmdzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3YXRjaEV4cHJlc3Npb24uZGlzcGxheU5hbWUgPSBgRm9ybWx5IFdhdGNoIEV4cHJlc3Npb24gZm9yIGZpZWxkIGZvciAke2ZpZWxkLmtleX1gO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gd2F0Y2hFeHByZXNzaW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gZ2V0V2F0Y2hMaXN0ZW5lcih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICB2YXIgd2F0Y2hMaXN0ZW5lciA9IHdhdGNoZXIubGlzdGVuZXI7XG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbih3YXRjaExpc3RlbmVyKSkge1xuICAgICAgICAgICAgLy8gd3JhcCB0aGUgZmllbGQncyB3YXRjaCBsaXN0ZW5lciBzbyB3ZSBjYW4gY2FsbCBpdCB3aXRoIHRoZSBmaWVsZCBhcyB0aGUgZmlyc3QgYXJnXG4gICAgICAgICAgICAvLyBhbmQgdGhlIHN0b3AgZnVuY3Rpb24gYXMgdGhlIGxhc3QgYXJnIGFzIGEgaGVscGVyXG4gICAgICAgICAgICB2YXIgb3JpZ2luYWxMaXN0ZW5lciA9IHdhdGNoTGlzdGVuZXI7XG4gICAgICAgICAgICB3YXRjaExpc3RlbmVyID0gZnVuY3Rpb24gZm9ybWx5V2F0Y2hMaXN0ZW5lcigpIHtcbiAgICAgICAgICAgICAgdmFyIGFyZ3MgPSBtb2RpZnlBcmdzKHdhdGNoZXIsIGluZGV4LCAuLi5hcmd1bWVudHMpO1xuICAgICAgICAgICAgICByZXR1cm4gb3JpZ2luYWxMaXN0ZW5lciguLi5hcmdzKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3YXRjaExpc3RlbmVyLmRpc3BsYXlOYW1lID0gYEZvcm1seSBXYXRjaCBMaXN0ZW5lciBmb3IgZmllbGQgZm9yICR7ZmllbGQua2V5fWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB3YXRjaExpc3RlbmVyO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbW9kaWZ5QXJncyh3YXRjaGVyLCBpbmRleCwgLi4ub3JpZ2luYWxBcmdzKSB7XG4gICAgICAgICAgcmV0dXJuIFskc2NvcGUuZmllbGRzW2luZGV4XSwgLi4ub3JpZ2luYWxBcmdzLCB3YXRjaGVyLnN0b3BXYXRjaGluZ107XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWwsIGF0dHJzKSB7XG4gICAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eSgncmVzdWx0JykpIHtcbiAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0Rm9ybWx5RXJyb3IoXG4gICAgICAgICAgICAnVGhlIFwicmVzdWx0XCIgYXR0cmlidXRlIG9uIGEgZm9ybWx5LWZvcm0gaXMgbm8gbG9uZ2VyIHZhbGlkLiBVc2UgXCJtb2RlbFwiIGluc3RlYWQnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0cnMubmFtZSAhPT0gJ2Zvcm0nKSB7IC8vIHRoZW4gdGhleSBzcGVjaWZpZWQgdGhlaXIgb3duIG5hbWVcbiAgICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0Rm9ybWx5RXJyb3IoXG4gICAgICAgICAgICAnVGhlIFwibmFtZVwiIGF0dHJpYnV0ZSBvbiBhIGZvcm1seS1mb3JtIGlzIG5vIGxvbmdlciB2YWxpZC4gVXNlIFwiZm9ybVwiIGluc3RlYWQnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9kaXJlY3RpdmVzL2Zvcm1seS1mb3JtLmpzXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZSA9PiB7XG4gIG5nTW9kdWxlLmRpcmVjdGl2ZSgnZm9ybWx5Rm9jdXMnLCBmdW5jdGlvbigkdGltZW91dCwgJGRvY3VtZW50KSB7XG4gICAgLyoganNoaW50IC1XMDUyICovXG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiAnQScsXG4gICAgICBsaW5rOiBmdW5jdGlvbihzY29wZSwgZWxlbWVudCwgYXR0cnMpIHtcbiAgICAgICAgdmFyIHByZXZpb3VzRWwgPSBudWxsO1xuICAgICAgICB2YXIgZWwgPSBlbGVtZW50WzBdO1xuICAgICAgICB2YXIgZG9jID0gJGRvY3VtZW50WzBdO1xuICAgICAgICBhdHRycy4kb2JzZXJ2ZSgnZm9ybWx5Rm9jdXMnLCBmdW5jdGlvbih2YWx1ZSkge1xuICAgICAgICAgIGlmICh2YWx1ZSA9PT0gJ3RydWUnKSB7XG4gICAgICAgICAgICAkdGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICAgICAgcHJldmlvdXNFbCA9IGRvYy5hY3RpdmVFbGVtZW50O1xuICAgICAgICAgICAgICBlbC5mb2N1cygpO1xuICAgICAgICAgICAgfSwgfn5hdHRycy5mb2N1c1dhaXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09ICdmYWxzZScpIHtcbiAgICAgICAgICAgIGlmIChkb2MuYWN0aXZlRWxlbWVudCA9PT0gZWwpIHtcbiAgICAgICAgICAgICAgZWwuYmx1cigpO1xuICAgICAgICAgICAgICBpZiAoYXR0cnMuaGFzT3duUHJvcGVydHkoJ3JlZm9jdXMnKSAmJiBwcmV2aW91c0VsKSB7XG4gICAgICAgICAgICAgICAgcHJldmlvdXNFbC5mb2N1cygpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9KTtcbn07XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuLi9+L2pzaGludC1sb2FkZXIhLi9kaXJlY3RpdmVzL2Zvcm1seS1mb2N1cy5qc1xuICoqLyIsImNvbnN0IGFuZ3VsYXIgPSByZXF1aXJlKCdhbmd1bGFyLWZpeCcpO1xuXG5leHBvcnQgZGVmYXVsdCB7Zm9ybWx5RXZhbCwgZ2V0RmllbGRJZCwgcmV2ZXJzZURlZXBNZXJnZSwgZmluZEJ5Tm9kZU5hbWV9O1xuXG5mdW5jdGlvbiBmb3JtbHlFdmFsKHNjb3BlLCBleHByZXNzaW9uLCBtb2RlbFZhbHVlLCB2aWV3VmFsdWUpIHtcbiAgaWYgKGFuZ3VsYXIuaXNGdW5jdGlvbihleHByZXNzaW9uKSkge1xuICAgIHJldHVybiBleHByZXNzaW9uKHZpZXdWYWx1ZSB8fCBtb2RlbFZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSk7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHNjb3BlLiRldmFsKGV4cHJlc3Npb24sIHtcbiAgICAgICR2aWV3VmFsdWU6IHZpZXdWYWx1ZSB8fCBtb2RlbFZhbHVlLFxuICAgICAgJG1vZGVsVmFsdWU6IG1vZGVsVmFsdWVcbiAgICB9KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRGaWVsZElkKGZvcm1JZCwgb3B0aW9ucywgaW5kZXgpIHtcbiAgdmFyIHR5cGUgPSBvcHRpb25zLnR5cGU7XG4gIGlmICghdHlwZSAmJiBvcHRpb25zLnRlbXBsYXRlKSB7XG4gICAgdHlwZSA9ICd0ZW1wbGF0ZSc7XG4gIH0gZWxzZSBpZiAoIXR5cGUgJiYgb3B0aW9ucy50ZW1wbGF0ZVVybCkge1xuICAgIHR5cGUgPSAndGVtcGxhdGVVcmwnO1xuICB9XG5cbiAgcmV0dXJuIFtmb3JtSWQsIHR5cGUsIG9wdGlvbnMua2V5LCBpbmRleF0uam9pbignXycpO1xufVxuXG5cbmZ1bmN0aW9uIHJldmVyc2VEZWVwTWVyZ2UoZGVzdCkge1xuICBhbmd1bGFyLmZvckVhY2goYXJndW1lbnRzLCAoc3JjLCBpbmRleCkgPT4ge1xuICAgIGlmICghaW5kZXgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgYW5ndWxhci5mb3JFYWNoKHNyYywgKHZhbCwgcHJvcCkgPT4ge1xuICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZChkZXN0W3Byb3BdKSkge1xuICAgICAgICBkZXN0W3Byb3BdID0gYW5ndWxhci5jb3B5KHZhbCk7XG4gICAgICB9IGVsc2UgaWYgKG9iakFuZFNhbWVUeXBlKGRlc3RbcHJvcF0sIHZhbCkpIHtcbiAgICAgICAgcmV2ZXJzZURlZXBNZXJnZShkZXN0W3Byb3BdLCB2YWwpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gb2JqQW5kU2FtZVR5cGUob2JqMSwgb2JqMikge1xuICByZXR1cm4gYW5ndWxhci5pc09iamVjdChvYmoxKSAmJiBhbmd1bGFyLmlzT2JqZWN0KG9iajIpICYmXG4gICAgT2JqZWN0LmdldFByb3RvdHlwZU9mKG9iajEpID09PSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yob2JqMik7XG59XG5cbi8vcmVjdXJzZSBkb3duIGEgbm9kZSB0cmVlIHRvIGZpbmQgYSBub2RlIHdpdGggbWF0Y2hpbmcgbm9kZU5hbWUsIGZvciBjdXN0b20gdGFncyBqUXVlcnkuZmluZCBkb2Vzbid0IHdvcmsgaW4gSUU4XG5mdW5jdGlvbiBmaW5kQnlOb2RlTmFtZShlbCwgbm9kZU5hbWUpIHtcbiAgaWYgKCFlbC5wcm9wKSB7IC8vIG5vdCBhIGpRdWVyeSBvciBqcUxpdGUgb2JqZWN0IC0+IHdyYXAgaXRcbiAgICBlbCA9IGFuZ3VsYXIuZWxlbWVudChlbCk7XG4gIH1cblxuICBpZiAoZWwucHJvcCgnbm9kZU5hbWUnKSA9PT0gbm9kZU5hbWUudG9VcHBlckNhc2UoKSkge1xuICAgIHJldHVybiBlbDtcbiAgfVxuXG4gIHZhciBjID0gZWwuY2hpbGRyZW4oKTtcbiAgZm9yKHZhciBpID0gMDsgYyAmJiBpIDwgYy5sZW5ndGg7IGkrKykge1xuICAgIHZhciBub2RlID0gZmluZEJ5Tm9kZU5hbWUoY1tpXSwgbm9kZU5hbWUpO1xuICAgIGlmIChub2RlKSB7XG4gICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4uL34vanNoaW50LWxvYWRlciEuL290aGVyL3V0aWxzLmpzXG4gKiovIl0sInNvdXJjZVJvb3QiOiIiLCJmaWxlIjoiZm9ybWx5LmpzIn0=