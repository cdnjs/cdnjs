// angular-formly version 3.0.1 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular"], factory);
	else if(typeof exports === 'object')
		exports["ngFormly"] = factory(require("angular"));
	else
		root["ngFormly"] = factory(root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_5__) {
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
	
	var ngModuleName = "formly";
	
	var angular = __webpack_require__(1);
	var ngModule = angular.module(ngModuleName, []);
	
	__webpack_require__(2)(ngModule);
	__webpack_require__(3)(ngModule);
	__webpack_require__(4)(ngModule);
	
	module.exports = ngModuleName;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	// some versions of angular don't export the angular module properly,
	// so we get it from window in this case.
	var angular = __webpack_require__(5);
	if (!angular.version) {
	  angular = window.angular;
	}
	module.exports = angular;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(6)(ngModule);
	  __webpack_require__(7)(ngModule);
	  __webpack_require__(8)(ngModule);
	  __webpack_require__(9)(ngModule);
	};

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(14)(ngModule);
	  __webpack_require__(15)(ngModule);
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(10)(ngModule);
	  __webpack_require__(11)(ngModule);
	  __webpack_require__(12)(ngModule);
	  __webpack_require__(13)(ngModule);
	};

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(1);
	
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
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(1);
	
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
	      templateManipulators: {
	        preWrapper: [ngModelAttrsManipulator],
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
	      if (wrappers.length === 1) {
	        return wrappers[0];
	      } else if (wrappers.length > 1) {
	        return wrappers;
	      }
	      // otherwise nothing
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
	
	    function ngModelAttrsManipulator(template, options, scope) {
	      /* jshint maxcomplexity:7 */
	      var el = angular.element("<a></a>");
	      var data = options.data || {};
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
	
	      if (options.validators) {
	        addIfNotPresent(modelEls, "formly-custom-validation", "options.validators");
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
	          "ng-minlength": "minlength",
	          "ng-change": "change",
	          "ng-keydown": "keydown",
	          "ng-keyup": "keyup",
	          "ng-keypress": "keypress"
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
	
	        addDefinedAttributes(modelEls, boundAttributes, options, false);
	        addDefinedAttributes(modelEls, attributes, options, true);
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
	
	      function addDefinedAttributes(els, attrs, options, isExpression) {
	        /* jshint maxcomplexity:6 */
	        var to = options.templateOptions;
	        var ep = options.expressionProperties;
	        if (!to && !ep) {
	          return; // no reason to iterate if these don't exist...
	        } else {
	          to = to || {};
	          ep = ep || {};
	        }
	        var valPrefix = isExpression ? "{{" : "";
	        var valSuffix = isExpression ? "}}" : "";
	        angular.forEach(attrs, function (val, attrName) {
	          // if it's defined as a property on template options, or if it's an expression property,
	          // then we'll add the attribute (and hence the watchers)
	          if (angular.isDefined(to[val]) || angular.isDefined(ep["templateOptions." + val])) {
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
	
	    function warn() {
	      if (!_this.disableWarnings) {
	        console.warn.apply(console, arguments);
	      }
	    }
	  }
	  formlyConfig.$inject = ["formlyUsabilityProvider"];
	
	
	};

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyVersion", ("3.0.1"));
	};

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.constant("formlyErrorAndWarningsUrlPrefix", "https://github.com/formly-js/angular-formly/wiki/Errors-and-Warnings#");
	};

/***/ },
/* 10 */
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
	
	        // setup watchers and parsers
	        var hasValidators = ctrl.hasOwnProperty("$validators");
	        angular.forEach(validators, function (validator, name) {
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
	  }]);
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var angular = __webpack_require__(1);
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyField", formlyField);
	
	  formlyField.tests = false ? require("./formly-field.test")(ngModule) : null;
	
	  function formlyField($http, $q, $compile, $templateCache, formlyConfig, formlyUtil, formlyUsability, formlyWarn) {
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
	      controller: ["$scope", "$interval", "$parse", function fieldController($scope, $interval, $parse) {
	        /* jshint maxcomplexity:6 */
	        mergeFieldOptionsWithTypeDefaults($scope.options);
	        apiCheck($scope.options);
	        // set field id to link labels and fields
	        $scope.id = formlyUtil.getFieldId($scope.formId, $scope.options, $scope.index);
	
	        angular.extend($scope.options, {
	          // attach the key in case the formly-field directive is used directly
	          key: $scope.options.key || $scope.index || 0,
	          value: valueGetterSetter,
	          runExpressions: runExpressions,
	          modelOptions: $scope.options.modelOptions || {
	            getterSetter: true,
	            allowInvalid: true
	          }
	        });
	
	        // initalization
	        runExpressions();
	        if (!$scope.options.noFormControl) {
	          setFormControl();
	        }
	        if ($scope.options.model) {
	          $scope.$watch("options.model", runExpressions, true);
	        }
	
	        // function definitions
	        function runExpressions() {
	          var field = $scope.options;
	          var currentValue = valueGetterSetter();
	          angular.forEach(field.expressionProperties, function runExpression(expression, prop) {
	            var setter = $parse(prop).assign;
	            var promise = $q.when(formlyUtil.formlyEval($scope, expression, currentValue));
	            promise.then(function (value) {
	              setter(field, value);
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
	
	        function setFormControl() {
	          var stopWaitingForDestroy;
	          var maxTime = 2000;
	          var intervalTime = 5;
	          var iterations = 0;
	          var interval = $interval(function () {
	            iterations++;
	            if (!angular.isDefined($scope.options.key)) {
	              return cleanUp();
	            }
	            var formControl = $scope.form && $scope.form[$scope.id];
	            if (formControl) {
	              $scope.options.formControl = formControl;
	              cleanUp();
	            } else if (intervalTime * iterations > maxTime) {
	              formlyWarn("couldnt-set-the-formcontrol-after-timems", "Couldn't set the formControl after " + maxTime + "ms", $scope);
	              cleanUp();
	            }
	          }, intervalTime);
	          stopWaitingForDestroy = $scope.$on("$destroy", cleanUp);
	
	          function cleanUp() {
	            stopWaitingForDestroy();
	            $interval.cancel(interval);
	          }
	        }
	
	        function mergeFieldOptionsWithTypeDefaults(options) {
	          var type = formlyConfig.getType(options.type, true, options);
	          if (type && type.defaultOptions) {
	            formlyUtil.reverseDeepMerge(options, type.defaultOptions);
	          }
	          var properOrder = arrayify(options.optionsTypes).reverse(); // so the right things are overridden
	          angular.forEach(properOrder, function (typeName) {
	            formlyUtil.reverseDeepMerge(options, formlyConfig.getType(typeName, true, options).defaultOptions);
	          });
	        }
	      }],
	      link: function fieldLink(scope, el) {
	        getFieldTemplate(scope.options).then(runManipulators(formlyConfig.templateManipulators.preWrapper)).then(transcludeInWrappers(scope.options)).then(runManipulators(formlyConfig.templateManipulators.postWrapper)).then(setElementTemplate)["catch"](function (error) {
	          formlyWarn("There was a problem setting the template for this field ", scope.options, error);
	        });
	
	        function setElementTemplate(templateEl) {
	          el.html(asHtml(templateEl));
	          $compile(el.contents())(scope);
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
	        if (!wrapper) {
	          return $q.when(template);
	        } else if (angular.isArray(wrapper)) {
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
	        } else {
	          formlyUsability.checkWrapper(wrapper);
	          var t = wrapper.template || wrapper.templateUrl;
	          return getTemplate(t, !wrapper.template).then(function (wrapperTemplate) {
	            formlyUsability.checkWrapperTemplate(wrapperTemplate, wrapper);
	            return doTransclusion(wrapperTemplate, template);
	          });
	        }
	      };
	    }
	
	    function doTransclusion(wrapper, template) {
	      var wrapperEl = angular.element(wrapper);
	      var transcludeEl = wrapperEl.find("formly-transclude");
	      transcludeEl.replaceWith(template);
	      return asHtml(wrapperEl);
	    }
	
	    function getWrapperOption(options) {
	      /* jshint maxcomplexity:9 */
	      var templateOption = options.wrapper;
	      // explicit null means no wrapper
	      if (templateOption === null) {
	        return "";
	      }
	      var wrapper = templateOption;
	      // nothing specified means use the default wrapper for the type
	      if (!templateOption) {
	        wrapper = formlyConfig.getWrapperByType(options.type);
	      } else if (angular.isString(templateOption)) {
	        // string means it's a type
	        wrapper = formlyConfig.getWrapper(templateOption);
	      } else if (angular.isArray(templateOption)) {
	        // array means wrap the wrappers
	        wrapper = templateOption.map(function (wrapperName) {
	          return formlyConfig.getWrapper(wrapperName);
	        });
	      }
	      wrapper = arrayify(wrapper);
	      var defaultWrapper = formlyConfig.getWrapper();
	      var type = formlyConfig.getType(options.type, true, options);
	      if (type && type.wrapper) {
	        var typeWrappers = arrayify(type.wrapper).map(formlyConfig.getWrapper);
	        wrapper = wrapper.concat(typeWrappers);
	      }
	      if (defaultWrapper) {
	        wrapper.push(defaultWrapper);
	      }
	      if (wrapper.length > 1) {
	        return wrapper;
	      } else if (wrapper.length === 1) {
	        return wrapper[0];
	      }
	      // otherwise return nothing
	    }
	
	    function apiCheck(options) {
	      var templateOptions = getTemplateOptionsCount(options);
	      if (templateOptions === 0) {
	        throw formlyUsability.getFieldError("you-must-provide-one-of-type-template-or-templateurl-for-a-field", "You must provide one of type, template, or templateUrl for a field", options);
	      } else if (templateOptions > 1) {
	        throw formlyUsability.getFieldError("you-must-only-provide-a-type-template-or-templateurl-for-a-field", "You must only provide a type, template, or templateUrl for a field", options);
	      }
	
	      // check that only allowed properties are provided
	      var allowedProperties = ["type", "template", "templateUrl", "key", "model", "expressionProperties", "data", "templateOptions", "wrapper", "modelOptions", "watcher", "validators", "noFormControl", "hide", "ngModelAttrs", "optionsTypes",
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
	  formlyField.$inject = ["$http", "$q", "$compile", "$templateCache", "formlyConfig", "formlyUtil", "formlyUsability", "formlyWarn"];
	
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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _toArray = function (arr) { return Array.isArray(arr) ? arr : Array.from(arr); };
	
	var _slice = Array.prototype.slice;
	var angular = __webpack_require__(1);
	
	module.exports = function (ngModule) {
	  ngModule.directive("formlyForm", formlyForm);
	
	  formlyForm.tests = false ? require("./formly-form.test")(ngModule) : null;
	
	  function formlyForm(formlyUsability) {
	    var currentFormId = 1;
	    return {
	      restrict: "E",
	      template: __webpack_require__(16),
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
/* 13 */
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
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _slice = Array.prototype.slice;
	var angular = __webpack_require__(1);
	
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
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<ng-form class=\"formly\"\n         name=\"form\"\n         role=\"form\">\n  <div formly-field\n       ng-repeat=\"field in fields track by $index\"\n       ng-if=\"!field.hide\"\n       class=\"formly-field {{field.type ? 'formly-field-' + field.type : ''}}\"\n       options=\"field\"\n       model=\"field.model || model\"\n       fields=\"fields\"\n       form=\"form\"\n       form-id=\"formId\"\n       index=\"$index\">\n  </div>\n  <div ng-transclude></div>\n</ng-form>\n"

/***/ }
/******/ ])
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA0OGFiNzIyNmU2ZWQ4OTk2YTI2MyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9hbmd1bGFyLWZpeC9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9pbmRleC5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJhbmd1bGFyXCIiLCJ3ZWJwYWNrOi8vLy4vcHJvdmlkZXJzL2Zvcm1seVVzYWJpbGl0eS5qcyIsIndlYnBhY2s6Ly8vLi9wcm92aWRlcnMvZm9ybWx5Q29uZmlnLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlWZXJzaW9uLmpzIiwid2VicGFjazovLy8uL3Byb3ZpZGVycy9mb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4LmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWZpZWxkLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0uanMiLCJ3ZWJwYWNrOi8vLy4vZGlyZWN0aXZlcy9mb3JtbHktZm9jdXMuanMiLCJ3ZWJwYWNrOi8vLy4vc2VydmljZXMvZm9ybWx5VXRpbC5qcyIsIndlYnBhY2s6Ly8vLi9zZXJ2aWNlcy9mb3JtbHlXYXJuLmpzIiwid2VicGFjazovLy8uL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0uaHRtbCJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQSx3Qzs7Ozs7OztBQ3RDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSwrQjs7Ozs7O0FDWEE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsMEI7Ozs7OztBQ1JBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNQQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNMQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDUEEsZ0Q7Ozs7OztBQ0FBOztBQUVBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7O0FBRUw7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHOzs7Ozs7QUMzREE7O0FBRUE7O0FBRUE7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxNQUFLOztBQUVMO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBLCtFQUE4RTtBQUM5RTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQSxxRUFBb0U7QUFDcEU7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esa0JBQWlCO0FBQ2pCLFVBQVM7QUFDVDtBQUNBO0FBQ0E7QUFDQSwyQ0FBMEM7QUFDMUMsMkNBQTBDO0FBQzFDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVDs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBLEc7Ozs7OztBQ2xSQTs7QUFFQTtBQUNBO0FBQ0EsRzs7Ozs7O0FDSkE7O0FBRUE7QUFDQTtBQUNBLEc7Ozs7OztBQ0pBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGdCQUFlO0FBQ2Y7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxJQUFHO0FBQ0gsRzs7Ozs7O0FDeENBOztBQUVBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixZQUFXO0FBQ1g7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0EsWUFBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLHNFQUFxRTtBQUNyRTtBQUNBO0FBQ0EsWUFBVztBQUNYO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBLFVBQVM7O0FBRVQ7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUI7QUFDakIsZ0JBQWU7QUFDZixjQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCw0QkFBMkI7QUFDM0I7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBLFVBQVM7QUFDVDtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IseUNBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYjtBQUNBLFlBQVc7QUFDWCxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ3hSQTs7QUFFQSxnQ0FBK0IsbURBQW1EOztBQUVsRjtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBOztBQUVBLG1EQUFrRDtBQUNsRCx1REFBc0Q7O0FBRXREO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFXO0FBQ1gsVUFBUzs7QUFFVDtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsWUFBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLHFHQUFvRyxhQUFhO0FBQ2pIO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ3BIQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGNBQWE7QUFDYixZQUFXO0FBQ1g7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1Q7QUFDQTtBQUNBLElBQUc7QUFDSCxHOzs7Ozs7QUM1QkE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsbURBQWtEO0FBQ2xEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNUO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsY0FBYTtBQUNiO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxRQUFPO0FBQ1A7QUFDQTtBQUNBOztBQUVBLElBQUc7QUFDSCxHOzs7Ozs7QUN0RUE7O0FBRUEsZ0NBQStCLG1EQUFtRDs7QUFFbEY7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLElBQUc7QUFDSCxHOzs7Ozs7QUNoQkEsc09BQXFPLGdEQUFnRCw4TiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiYW5ndWxhclwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJuZ0Zvcm1seVwiXSA9IGZhY3RvcnkocmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5nRm9ybWx5XCJdID0gZmFjdG9yeShyb290W1wiYW5ndWxhclwiXSk7XG59KSh0aGlzLCBmdW5jdGlvbihfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzVfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svYm9vdHN0cmFwIDQ4YWI3MjI2ZTZlZDg5OTZhMjYzXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBuZ01vZHVsZU5hbWUgPSBcImZvcm1seVwiO1xuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyLWZpeFwiKTtcbnZhciBuZ01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5nTW9kdWxlTmFtZSwgW10pO1xuXG5yZXF1aXJlKFwiLi9wcm92aWRlcnNcIikobmdNb2R1bGUpO1xucmVxdWlyZShcIi4vc2VydmljZXNcIikobmdNb2R1bGUpO1xucmVxdWlyZShcIi4vZGlyZWN0aXZlc1wiKShuZ01vZHVsZSk7XG5cbm1vZHVsZS5leHBvcnRzID0gbmdNb2R1bGVOYW1lO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBzb21lIHZlcnNpb25zIG9mIGFuZ3VsYXIgZG9uJ3QgZXhwb3J0IHRoZSBhbmd1bGFyIG1vZHVsZSBwcm9wZXJseSxcbi8vIHNvIHdlIGdldCBpdCBmcm9tIHdpbmRvdyBpbiB0aGlzIGNhc2UuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xuaWYgKCFhbmd1bGFyLnZlcnNpb24pIHtcbiAgYW5ndWxhciA9IHdpbmRvdy5hbmd1bGFyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hbmd1bGFyLWZpeC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICByZXF1aXJlKFwiLi9mb3JtbHlVc2FiaWxpdHlcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHlDb25maWdcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHlWZXJzaW9uXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeFwiKShuZ01vZHVsZSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgcmVxdWlyZShcIi4vZm9ybWx5VXRpbFwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2Zvcm1seVdhcm5cIikobmdNb2R1bGUpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2VydmljZXMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgcmVxdWlyZShcIi4vZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5LWZpZWxkXCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vZm9ybWx5LWZvcm1cIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9mb3JtbHktZm9jdXNcIikobmdNb2R1bGUpO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGlyZWN0aXZlcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV81X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCBcImFuZ3VsYXJcIlxuICoqIG1vZHVsZSBpZCA9IDVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyLWZpeFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUucHJvdmlkZXIoXCJmb3JtbHlVc2FiaWxpdHlcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIGVycm9yc0FuZFdhcm5pbmdzVXJsUHJlZml4ID0gXCJodHRwczovL2dpdGh1Yi5jb20vZm9ybWx5LWpzL2FuZ3VsYXItZm9ybWx5L3dpa2kvRXJyb3JzLWFuZC1XYXJuaW5ncyNcIjtcbiAgICBhbmd1bGFyLmV4dGVuZCh0aGlzLCB7XG4gICAgICBnZXRGb3JtbHlFcnJvcjogZ2V0Rm9ybWx5RXJyb3IsXG4gICAgICBnZXRGaWVsZEVycm9yOiBnZXRGaWVsZEVycm9yLFxuICAgICAgY2hlY2tXcmFwcGVyOiBjaGVja1dyYXBwZXIsXG4gICAgICBjaGVja1dyYXBwZXJUZW1wbGF0ZTogY2hlY2tXcmFwcGVyVGVtcGxhdGUsXG4gICAgICAkZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpcztcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGZ1bmN0aW9uIGdldEZpZWxkRXJyb3IoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSwgZmllbGQpIHtcbiAgICAgIGlmIChhcmd1bWVudHMubGVuZ3RoIDwgMykge1xuICAgICAgICBmaWVsZCA9IG1lc3NhZ2U7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvckluZm9TbHVnO1xuICAgICAgICBlcnJvckluZm9TbHVnID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgRXJyb3IoZ2V0RXJyb3JNZXNzYWdlKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpICsgKFwiIEZpZWxkIGRlZmluaXRpb246IFwiICsgYW5ndWxhci50b0pzb24oZmllbGQpKSk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0Rm9ybWx5RXJyb3IoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkge1xuICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgIG1lc3NhZ2UgPSBlcnJvckluZm9TbHVnO1xuICAgICAgICBlcnJvckluZm9TbHVnID0gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgRXJyb3IoZ2V0RXJyb3JNZXNzYWdlKGVycm9ySW5mb1NsdWcsIG1lc3NhZ2UpKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRFcnJvck1lc3NhZ2UoZXJyb3JJbmZvU2x1ZywgbWVzc2FnZSkge1xuICAgICAgdmFyIHVybCA9IFwiXCI7XG4gICAgICBpZiAoZXJyb3JJbmZvU2x1ZyAhPT0gbnVsbCkge1xuICAgICAgICB1cmwgPSBcIlwiICsgZXJyb3JzQW5kV2FybmluZ3NVcmxQcmVmaXggKyBcIlwiICsgZXJyb3JJbmZvU2x1ZztcbiAgICAgIH1cbiAgICAgIHJldHVybiBcIkZvcm1seSBFcnJvcjogXCIgKyBtZXNzYWdlICsgXCIuIFwiICsgdXJsO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrV3JhcHBlcih3cmFwcGVyKSB7XG4gICAgICBpZiAod3JhcHBlci50ZW1wbGF0ZSAmJiB3cmFwcGVyLnRlbXBsYXRlVXJsKSB7XG4gICAgICAgIHRocm93IGdldEZvcm1seUVycm9yKFwiVGVtcGxhdGUgd3JhcHBlcnMgY2FuIG9ubHkgaGF2ZSBhIHRlbXBsYXRlVXJsIG9yIGEgdGVtcGxhdGUuIFwiICsgKFwiVGhpcyBvbmUgcHJvdmlkZWQgYm90aDogXCIgKyBKU09OLnN0cmluZ2lmeSh3cmFwcGVyKSkpO1xuICAgICAgfVxuICAgICAgaWYgKCF3cmFwcGVyLnRlbXBsYXRlICYmICF3cmFwcGVyLnRlbXBsYXRlVXJsKSB7XG4gICAgICAgIHRocm93IGdldEZvcm1seUVycm9yKFwiVGVtcGxhdGUgd3JhcHBlcnMgbXVzdCBoYXZlIG9uZSBvZiBhIHRlbXBsYXRlVXJsIG9yIGEgdGVtcGxhdGUuIFwiICsgKFwiVGhpcyBvbmUgcHJvdmlkZWQgbmVpdGhlcjogXCIgKyBKU09OLnN0cmluZ2lmeSh3cmFwcGVyKSkpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrV3JhcHBlclRlbXBsYXRlKHRlbXBsYXRlLCBhZGRpdGlvbmFsSW5mbykge1xuICAgICAgdmFyIGZvcm1seVRyYW5zY2x1ZGUgPSBcIjxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPlwiO1xuICAgICAgaWYgKHRlbXBsYXRlLmluZGV4T2YoZm9ybWx5VHJhbnNjbHVkZSkgPT09IC0xKSB7XG4gICAgICAgIHRocm93IGdldEZvcm1seUVycm9yKFwiVGVtcGxhdGUgd3JhcHBlciB0ZW1wbGF0ZXMgbXVzdCB1c2UgXFxcIlwiICsgZm9ybWx5VHJhbnNjbHVkZSArIFwiXFxcIiBzb21ld2hlcmUgaW4gdGhlbS4gXCIgKyAoXCJUaGlzIG9uZSBkb2VzIG5vdCBoYXZlIFxcXCI8Zm9ybWx5LXRyYW5zY2x1ZGU+PC9mb3JtbHktdHJhbnNjbHVkZT5cXFwiIGluIGl0OiBcIiArIHRlbXBsYXRlKSArIFwiXFxuXCIgKyAoXCJBZGRpdGlvbmFsIGluZm9ybWF0aW9uOiBcIiArIEpTT04uc3RyaW5naWZ5KGFkZGl0aW9uYWxJbmZvKSkpO1xuICAgICAgfVxuICAgIH1cbiAgfSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5VXNhYmlsaXR5LmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBhbmd1bGFyID0gcmVxdWlyZShcImFuZ3VsYXItZml4XCIpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5wcm92aWRlcihcImZvcm1seUNvbmZpZ1wiLCBmb3JtbHlDb25maWcpO1xuXG4gIGZvcm1seUNvbmZpZy50ZXN0cyA9IE9OX1RFU1QgPyByZXF1aXJlKFwiLi9mb3JtbHlDb25maWcudGVzdFwiKShuZ01vZHVsZSkgOiBudWxsO1xuXG4gIGZ1bmN0aW9uIGZvcm1seUNvbmZpZyhmb3JtbHlVc2FiaWxpdHlQcm92aWRlcikge1xuICAgIHZhciBfdGhpczIgPSB0aGlzO1xuXG5cbiAgICB2YXIgdHlwZU1hcCA9IHt9O1xuICAgIHZhciB0ZW1wbGF0ZVdyYXBwZXJzTWFwID0ge307XG4gICAgdmFyIGRlZmF1bHRXcmFwcGVyTmFtZSA9IFwiZGVmYXVsdFwiO1xuICAgIHZhciBfdGhpcyA9IHRoaXM7XG4gICAgdmFyIGdldEVycm9yID0gZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuZ2V0Rm9ybWx5RXJyb3I7XG5cbiAgICBhbmd1bGFyLmV4dGVuZCh0aGlzLCB7XG4gICAgICBzZXRUeXBlOiBzZXRUeXBlLFxuICAgICAgZ2V0VHlwZTogZ2V0VHlwZSxcbiAgICAgIHNldFdyYXBwZXI6IHNldFdyYXBwZXIsXG4gICAgICBnZXRXcmFwcGVyOiBnZXRXcmFwcGVyLFxuICAgICAgZ2V0V3JhcHBlckJ5VHlwZTogZ2V0V3JhcHBlckJ5VHlwZSxcbiAgICAgIHJlbW92ZVdyYXBwZXJCeU5hbWU6IHJlbW92ZVdyYXBwZXJCeU5hbWUsXG4gICAgICByZW1vdmVXcmFwcGVyc0ZvclR5cGU6IHJlbW92ZVdyYXBwZXJzRm9yVHlwZSxcbiAgICAgIGRpc2FibGVXYXJuaW5nczogZmFsc2UsXG4gICAgICB0ZW1wbGF0ZU1hbmlwdWxhdG9yczoge1xuICAgICAgICBwcmVXcmFwcGVyOiBbbmdNb2RlbEF0dHJzTWFuaXB1bGF0b3JdLFxuICAgICAgICBwb3N0V3JhcHBlcjogW11cbiAgICAgIH0sXG4gICAgICAkZ2V0OiBmdW5jdGlvbiAoKSB7XG4gICAgICAgIHJldHVybiBfdGhpczI7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBmdW5jdGlvbiBzZXRUeXBlKG9wdGlvbnMpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKG9wdGlvbnMsIHNldFR5cGUpO1xuICAgICAgfSBlbHNlIGlmIChhbmd1bGFyLmlzT2JqZWN0KG9wdGlvbnMpKSB7XG4gICAgICAgIGNoZWNrVHlwZShvcHRpb25zKTtcbiAgICAgICAgdHlwZU1hcFtvcHRpb25zLm5hbWVdID0gb3B0aW9ucztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGdldEVycm9yKFwiWW91IG11c3QgcHJvdmlkZSBhbiBvYmplY3Qgb3IgYXJyYXkgZm9yIHNldFR5cGUuIFlvdSBwcm92aWRlZDogXCIgKyBKU09OLnN0cmluZ2lmeShhcmd1bWVudHMpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRUeXBlKG5hbWUsIHRocm93RXJyb3IsIGVycm9yQ29udGV4dCkge1xuICAgICAgdmFyIHR5cGUgPSB0eXBlTWFwW25hbWVdO1xuICAgICAgaWYgKCF0eXBlICYmIHRocm93RXJyb3IgPT09IHRydWUpIHtcbiAgICAgICAgdGhyb3cgZ2V0RXJyb3IoXCJUaGVyZSBpcyBubyB0eXBlIGJ5IHRoZSBuYW1lIG9mIFxcXCJcIiArIG5hbWUgKyBcIlxcXCI6IFwiICsgSlNPTi5zdHJpbmdpZnkoZXJyb3JDb250ZXh0KSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gdHlwZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1R5cGUob3B0aW9ucykge1xuICAgICAgaWYgKCFvcHRpb25zLm5hbWUpIHtcbiAgICAgICAgdGhyb3cgZ2V0RXJyb3IoXCJZb3UgbXVzdCBwcm92aWRlIGEgbmFtZSBmb3Igc2V0VHlwZS4gWW91IHByb3ZpZGVkOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50cykpO1xuICAgICAgfSBlbHNlIGlmICghb3B0aW9ucy5kZWZhdWx0T3B0aW9ucyAmJiAhb3B0aW9ucy50ZW1wbGF0ZSAmJiAhb3B0aW9ucy50ZW1wbGF0ZVVybCkge1xuICAgICAgICB0aHJvdyBnZXRFcnJvcihcIllvdSBtdXN0IHByb3ZpZGUgZGVmYXVsdE9wdGlvbnMgT1IgYSB0ZW1wbGF0ZSBPUiB0ZW1wbGF0ZVVybCBmb3Igc2V0VHlwZS4gXCIgKyAoXCJZb3UgcHJvdmlkZWQgbm9uZSBvZiB0aGVzZTogXCIgKyBKU09OLnN0cmluZ2lmeShhcmd1bWVudHMpKSk7XG4gICAgICB9IGVsc2UgaWYgKG9wdGlvbnMudGVtcGxhdGUgJiYgb3B0aW9ucy50ZW1wbGF0ZVVybCkge1xuICAgICAgICB0aHJvdyBnZXRFcnJvcihcIllvdSBtdXN0IHByb3ZpZGUgYXQgbW9zdCBhIHRlbXBsYXRlIE9SIHRlbXBsYXRlVXJsIGZvciBzZXRUeXBlLiBcIiArIChcIllvdSBwcm92aWRlZCBib3RoOiBcIiArIEpTT04uc3RyaW5naWZ5KGFyZ3VtZW50cykpKTtcbiAgICAgIH1cbiAgICAgIGlmICghb3B0aW9ucy5vdmVyd3JpdGVPaykge1xuICAgICAgICBjaGVja092ZXJ3cml0ZShvcHRpb25zLm5hbWUsIHR5cGVNYXAsIG9wdGlvbnMsIFwidHlwZXNcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgb3B0aW9ucy5vdmVyd3JpdGVPaztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBzZXRXcmFwcGVyKG9wdGlvbnMsIG5hbWUpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkob3B0aW9ucykpIHtcbiAgICAgICAgcmV0dXJuIG9wdGlvbnMubWFwKGZ1bmN0aW9uICh3cmFwcGVyT3B0aW9ucykge1xuICAgICAgICAgIHJldHVybiBzZXRXcmFwcGVyKHdyYXBwZXJPcHRpb25zKTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNPYmplY3Qob3B0aW9ucykpIHtcbiAgICAgICAgb3B0aW9ucy50eXBlcyA9IGdldE9wdGlvbnNUeXBlcyhvcHRpb25zKTtcbiAgICAgICAgb3B0aW9ucy5uYW1lID0gZ2V0T3B0aW9uc05hbWUob3B0aW9ucywgbmFtZSk7XG4gICAgICAgIGNoZWNrV3JhcHBlckFQSShvcHRpb25zKTtcbiAgICAgICAgdGVtcGxhdGVXcmFwcGVyc01hcFtvcHRpb25zLm5hbWVdID0gb3B0aW9ucztcbiAgICAgICAgcmV0dXJuIG9wdGlvbnM7XG4gICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNTdHJpbmcob3B0aW9ucykpIHtcbiAgICAgICAgcmV0dXJuIHNldFdyYXBwZXIoe1xuICAgICAgICAgIHRlbXBsYXRlOiBvcHRpb25zLFxuICAgICAgICAgIG5hbWU6IG5hbWVcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0T3B0aW9uc1R5cGVzKG9wdGlvbnMpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzU3RyaW5nKG9wdGlvbnMudHlwZXMpKSB7XG4gICAgICAgIHJldHVybiBbb3B0aW9ucy50eXBlc107XG4gICAgICB9XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudHlwZXMpKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJldHVybiBvcHRpb25zLnR5cGVzO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldE9wdGlvbnNOYW1lKG9wdGlvbnMsIG5hbWUpIHtcbiAgICAgIHJldHVybiBvcHRpb25zLm5hbWUgfHwgbmFtZSB8fCBvcHRpb25zLnR5cGVzLmpvaW4oXCIgXCIpIHx8IGRlZmF1bHRXcmFwcGVyTmFtZTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjaGVja1dyYXBwZXJBUEkob3B0aW9ucykge1xuICAgICAgZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuY2hlY2tXcmFwcGVyKG9wdGlvbnMpO1xuICAgICAgaWYgKG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICAgICAgZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXIuY2hlY2tXcmFwcGVyVGVtcGxhdGUob3B0aW9ucy50ZW1wbGF0ZSwgb3B0aW9ucyk7XG4gICAgICB9XG4gICAgICBpZiAoIW9wdGlvbnMub3ZlcndyaXRlT2spIHtcbiAgICAgICAgY2hlY2tPdmVyd3JpdGUob3B0aW9ucy5uYW1lLCB0ZW1wbGF0ZVdyYXBwZXJzTWFwLCBvcHRpb25zLCBcInRlbXBsYXRlV3JhcHBlcnNcIik7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkZWxldGUgb3B0aW9ucy5vdmVyd3JpdGVPaztcbiAgICAgIH1cbiAgICAgIGNoZWNrV3JhcHBlclR5cGVzKG9wdGlvbnMpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNoZWNrV3JhcHBlclR5cGVzKG9wdGlvbnMpIHtcbiAgICAgIHZhciBzaG91bGRUaHJvdyA9ICFhbmd1bGFyLmlzQXJyYXkob3B0aW9ucy50eXBlcykgfHwgIW9wdGlvbnMudHlwZXMuZXZlcnkoYW5ndWxhci5pc1N0cmluZyk7XG4gICAgICBpZiAoc2hvdWxkVGhyb3cpIHtcbiAgICAgICAgdGhyb3cgZ2V0RXJyb3IoXCJBdHRlbXB0ZWQgdG8gY3JlYXRlIGEgdGVtcGxhdGUgd3JhcHBlciB3aXRoIHR5cGVzIHRoYXQgaXMgbm90IGEgc3RyaW5nIG9yIGFuIGFycmF5IG9mIHN0cmluZ3NcIik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tPdmVyd3JpdGUocHJvcGVydHksIG9iamVjdCwgbmV3VmFsdWUsIG9iamVjdE5hbWUpIHtcbiAgICAgIGlmIChvYmplY3QuaGFzT3duUHJvcGVydHkocHJvcGVydHkpKSB7XG4gICAgICAgIHdhcm4oW1wiQXR0ZW1wdGluZyB0byBvdmVyd3JpdGUgXCIgKyBwcm9wZXJ0eSArIFwiIG9uIFwiICsgb2JqZWN0TmFtZSArIFwiIHdoaWNoIGlzIGN1cnJlbnRseVwiLCBcIlwiICsgSlNPTi5zdHJpbmdpZnkob2JqZWN0W3Byb3BlcnR5XSkgKyBcIiB3aXRoIFwiICsgSlNPTi5zdHJpbmdpZnkobmV3VmFsdWUpLCBcIlRvIHN1cHJlc3MgdGhpcyB3YXJuaW5nLCBzcGVjaWZ5IHRoZSBwcm9wZXJ0eSBcXFwib3ZlcndyaXRlT2s6IHRydWVcXFwiXCJdLmpvaW4oXCIgXCIpKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXcmFwcGVyKG5hbWUpIHtcbiAgICAgIHJldHVybiB0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWUgfHwgZGVmYXVsdFdyYXBwZXJOYW1lXTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXcmFwcGVyQnlUeXBlKHR5cGUpIHtcbiAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjYgKi9cbiAgICAgIHZhciB3cmFwcGVycyA9IFtdO1xuICAgICAgZm9yICh2YXIgbmFtZSBpbiB0ZW1wbGF0ZVdyYXBwZXJzTWFwKSB7XG4gICAgICAgIGlmICh0ZW1wbGF0ZVdyYXBwZXJzTWFwLmhhc093blByb3BlcnR5KG5hbWUpKSB7XG4gICAgICAgICAgaWYgKHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV0udHlwZXMgJiYgdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXS50eXBlcy5pbmRleE9mKHR5cGUpICE9PSAtMSkge1xuICAgICAgICAgICAgd3JhcHBlcnMucHVzaCh0ZW1wbGF0ZVdyYXBwZXJzTWFwW25hbWVdKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICAgIGlmICh3cmFwcGVycy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBwZXJzWzBdO1xuICAgICAgfSBlbHNlIGlmICh3cmFwcGVycy5sZW5ndGggPiAxKSB7XG4gICAgICAgIHJldHVybiB3cmFwcGVycztcbiAgICAgIH1cbiAgICAgIC8vIG90aGVyd2lzZSBub3RoaW5nXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcmVtb3ZlV3JhcHBlckJ5TmFtZShuYW1lKSB7XG4gICAgICB2YXIgd3JhcHBlciA9IHRlbXBsYXRlV3JhcHBlcnNNYXBbbmFtZV07XG4gICAgICBkZWxldGUgdGVtcGxhdGVXcmFwcGVyc01hcFtuYW1lXTtcbiAgICAgIHJldHVybiB3cmFwcGVyO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlbW92ZVdyYXBwZXJzRm9yVHlwZSh0eXBlKSB7XG4gICAgICB2YXIgd3JhcHBlcnMgPSBnZXRXcmFwcGVyQnlUeXBlKHR5cGUpO1xuICAgICAgaWYgKCF3cmFwcGVycykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIWFuZ3VsYXIuaXNBcnJheSh3cmFwcGVycykpIHtcbiAgICAgICAgcmV0dXJuIHJlbW92ZVdyYXBwZXJCeU5hbWUod3JhcHBlcnMubmFtZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB3cmFwcGVycy5mb3JFYWNoKGZ1bmN0aW9uICh3cmFwcGVyKSB7XG4gICAgICAgICAgcmV0dXJuIHJlbW92ZVdyYXBwZXJCeU5hbWUod3JhcHBlci5uYW1lKTtcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB3cmFwcGVycztcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBuZ01vZGVsQXR0cnNNYW5pcHVsYXRvcih0ZW1wbGF0ZSwgb3B0aW9ucywgc2NvcGUpIHtcbiAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjcgKi9cbiAgICAgIHZhciBlbCA9IGFuZ3VsYXIuZWxlbWVudChcIjxhPjwvYT5cIik7XG4gICAgICB2YXIgZGF0YSA9IG9wdGlvbnMuZGF0YSB8fCB7fTtcbiAgICAgIGlmIChkYXRhLm5vVG91Y2h5KSB7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgIH1cbiAgICAgIGVsLmFwcGVuZCh0ZW1wbGF0ZSk7XG4gICAgICB2YXIgbW9kZWxFbHMgPSBhbmd1bGFyLmVsZW1lbnQoZWxbMF0ucXVlcnlTZWxlY3RvckFsbChcIltuZy1tb2RlbF1cIikpO1xuICAgICAgaWYgKCFtb2RlbEVscyB8fCAhbW9kZWxFbHMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgIH1cbiAgICAgIGFkZE5nTW9kZWxBdHRycyhvcHRpb25zLm5nTW9kZWxBdHRycyk7XG5cbiAgICAgIGFkZElmTm90UHJlc2VudChtb2RlbEVscywgXCJpZFwiLCBzY29wZS5pZCk7XG4gICAgICBhZGRJZk5vdFByZXNlbnQobW9kZWxFbHMsIFwibmFtZVwiLCBzY29wZS5pZCk7XG5cbiAgICAgIGlmIChvcHRpb25zLnZhbGlkYXRvcnMpIHtcbiAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCBcImZvcm1seS1jdXN0b20tdmFsaWRhdGlvblwiLCBcIm9wdGlvbnMudmFsaWRhdG9yc1wiKTtcbiAgICAgIH1cbiAgICAgIGFkZFRlbXBsYXRlT3B0aW9uc0F0dHJzKCk7XG5cbiAgICAgIHJldHVybiBlbC5odG1sKCk7XG5cblxuICAgICAgZnVuY3Rpb24gYWRkVGVtcGxhdGVPcHRpb25zQXR0cnMoKSB7XG4gICAgICAgIC8vIGlmIHRoZSBmaWVsZCBoYXMgc3BlY2lmaWVkIHZhbHVlcyBmb3IgdGhlc2UsIHRoZW4gd2Ugd2FudCB0byBhZGQgdGhlIGF0dHJpYnV0ZXMgYW5kIHdhdGNoIHRoZW0gZm9yIGNoYW5nZXMuXG4gICAgICAgIHZhciBib3VuZEF0dHJpYnV0ZXMgPSBhbmd1bGFyLmV4dGVuZChkYXRhLm5nTW9kZWxCb3VuZEF0dHJpYnV0ZXMgfHwge30sIHtcbiAgICAgICAgICBcIm5nLWRpc2FibGVkXCI6IFwiZGlzYWJsZWRcIixcbiAgICAgICAgICBcIm5nLXJlcXVpcmVkXCI6IFwicmVxdWlyZWRcIixcbiAgICAgICAgICBcIm5nLXBhdHRlcm5cIjogXCJwYXR0ZXJuXCIsXG4gICAgICAgICAgXCJuZy1tYXhsZW5ndGhcIjogXCJtYXhsZW5ndGhcIixcbiAgICAgICAgICBcIm5nLW1pbmxlbmd0aFwiOiBcIm1pbmxlbmd0aFwiLFxuICAgICAgICAgIFwibmctY2hhbmdlXCI6IFwiY2hhbmdlXCIsXG4gICAgICAgICAgXCJuZy1rZXlkb3duXCI6IFwia2V5ZG93blwiLFxuICAgICAgICAgIFwibmcta2V5dXBcIjogXCJrZXl1cFwiLFxuICAgICAgICAgIFwibmcta2V5cHJlc3NcIjogXCJrZXlwcmVzc1wiXG4gICAgICAgIH0pO1xuICAgICAgICAvLyBhdHRyaWJ1dGVzIGFyZSB3cmFwcGVkIGluIGN1cmx5IGJyYWNlc1xuICAgICAgICB2YXIgYXR0cmlidXRlcyA9IGFuZ3VsYXIuZXh0ZW5kKGRhdGEubmdNb2RlbEF0dHJpYnV0ZXMgfHwge30sIHtcbiAgICAgICAgICBcImZvcm1seS1mb2N1c1wiOiBcImZvY3VzXCIsXG4gICAgICAgICAgcGxhY2Vob2xkZXI6IFwicGxhY2Vob2xkZXJcIixcbiAgICAgICAgICBtaW46IFwibWluXCIsXG4gICAgICAgICAgbWF4OiBcIm1heFwiLFxuICAgICAgICAgIHRhYmluZGV4OiBcInRhYmluZGV4XCIsXG4gICAgICAgICAgdHlwZTogXCJ0eXBlXCJcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYWRkRGVmaW5lZEF0dHJpYnV0ZXMobW9kZWxFbHMsIGJvdW5kQXR0cmlidXRlcywgb3B0aW9ucywgZmFsc2UpO1xuICAgICAgICBhZGREZWZpbmVkQXR0cmlidXRlcyhtb2RlbEVscywgYXR0cmlidXRlcywgb3B0aW9ucywgdHJ1ZSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFkZE5nTW9kZWxBdHRycyhuZ01vZGVsQXR0cnMpIHtcbiAgICAgICAgbmdNb2RlbEF0dHJzID0gbmdNb2RlbEF0dHJzIHx8IHt9O1xuICAgICAgICBhbmd1bGFyLmZvckVhY2gobmdNb2RlbEF0dHJzLmJvdW5kLCBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCBhdHRyLCBcIm9wdGlvbnMubmdNb2RlbEF0dHJzLmJvdW5kWydcIiArIGF0dHIgKyBcIiddXCIpO1xuICAgICAgICB9KTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKG5nTW9kZWxBdHRycy51bmJvdW5kLCBmdW5jdGlvbiAodmFsLCBhdHRyKSB7XG4gICAgICAgICAgYWRkSWZOb3RQcmVzZW50KG1vZGVsRWxzLCBhdHRyLCBzY29wZS4kZXZhbCh2YWwpKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGFkZERlZmluZWRBdHRyaWJ1dGVzKGVscywgYXR0cnMsIG9wdGlvbnMsIGlzRXhwcmVzc2lvbikge1xuICAgICAgICAvKiBqc2hpbnQgbWF4Y29tcGxleGl0eTo2ICovXG4gICAgICAgIHZhciB0byA9IG9wdGlvbnMudGVtcGxhdGVPcHRpb25zO1xuICAgICAgICB2YXIgZXAgPSBvcHRpb25zLmV4cHJlc3Npb25Qcm9wZXJ0aWVzO1xuICAgICAgICBpZiAoIXRvICYmICFlcCkge1xuICAgICAgICAgIHJldHVybjsgLy8gbm8gcmVhc29uIHRvIGl0ZXJhdGUgaWYgdGhlc2UgZG9uJ3QgZXhpc3QuLi5cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICB0byA9IHRvIHx8IHt9O1xuICAgICAgICAgIGVwID0gZXAgfHwge307XG4gICAgICAgIH1cbiAgICAgICAgdmFyIHZhbFByZWZpeCA9IGlzRXhwcmVzc2lvbiA/IFwie3tcIiA6IFwiXCI7XG4gICAgICAgIHZhciB2YWxTdWZmaXggPSBpc0V4cHJlc3Npb24gPyBcIn19XCIgOiBcIlwiO1xuICAgICAgICBhbmd1bGFyLmZvckVhY2goYXR0cnMsIGZ1bmN0aW9uICh2YWwsIGF0dHJOYW1lKSB7XG4gICAgICAgICAgLy8gaWYgaXQncyBkZWZpbmVkIGFzIGEgcHJvcGVydHkgb24gdGVtcGxhdGUgb3B0aW9ucywgb3IgaWYgaXQncyBhbiBleHByZXNzaW9uIHByb3BlcnR5LFxuICAgICAgICAgIC8vIHRoZW4gd2UnbGwgYWRkIHRoZSBhdHRyaWJ1dGUgKGFuZCBoZW5jZSB0aGUgd2F0Y2hlcnMpXG4gICAgICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHRvW3ZhbF0pIHx8IGFuZ3VsYXIuaXNEZWZpbmVkKGVwW1widGVtcGxhdGVPcHRpb25zLlwiICsgdmFsXSkpIHtcbiAgICAgICAgICAgIGFkZElmTm90UHJlc2VudChlbHMsIFwiXCIgKyBhdHRyTmFtZSwgXCJcIiArIHZhbFByZWZpeCArIFwib3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnNbJ1wiICsgdmFsICsgXCInXVwiICsgdmFsU3VmZml4KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBmdW5jdGlvbiBhZGRJZk5vdFByZXNlbnQoZWwsIGF0dHIsIHZhbCkge1xuICAgICAgICBpZiAoIWVsLmF0dHIoYXR0cikpIHtcbiAgICAgICAgICBlbC5hdHRyKGF0dHIsIHZhbCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB3YXJuKCkge1xuICAgICAgaWYgKCFfdGhpcy5kaXNhYmxlV2FybmluZ3MpIHtcbiAgICAgICAgY29uc29sZS53YXJuLmFwcGx5KGNvbnNvbGUsIGFyZ3VtZW50cyk7XG4gICAgICB9XG4gICAgfVxuICB9XG4gIGZvcm1seUNvbmZpZy4kaW5qZWN0ID0gW1wiZm9ybWx5VXNhYmlsaXR5UHJvdmlkZXJcIl07XG5cblxufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcHJvdmlkZXJzL2Zvcm1seUNvbmZpZy5qc1xuICoqIG1vZHVsZSBpZCA9IDdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5jb25zdGFudChcImZvcm1seVZlcnNpb25cIiwgVkVSU0lPTik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5VmVyc2lvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDhcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5jb25zdGFudChcImZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXhcIiwgXCJodHRwczovL2dpdGh1Yi5jb20vZm9ybWx5LWpzL2FuZ3VsYXItZm9ybWx5L3dpa2kvRXJyb3JzLWFuZC1XYXJuaW5ncyNcIik7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9wcm92aWRlcnMvZm9ybWx5RXJyb3JBbmRXYXJuaW5nc1VybFByZWZpeC5qc1xuICoqIG1vZHVsZSBpZCA9IDlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5kaXJlY3RpdmUoXCJmb3JtbHlDdXN0b21WYWxpZGF0aW9uXCIsIFtcImZvcm1seVV0aWxcIiwgXCIkcVwiLCBmdW5jdGlvbiAoZm9ybWx5VXRpbCwgJHEpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcmVxdWlyZTogXCJuZ01vZGVsXCIsXG4gICAgICBsaW5rOiBmdW5jdGlvbiAoc2NvcGUsIGVsLCBhdHRycywgY3RybCkge1xuICAgICAgICB2YXIgdmFsaWRhdG9ycyA9IHNjb3BlLiRldmFsKGF0dHJzLmZvcm1seUN1c3RvbVZhbGlkYXRpb24pO1xuICAgICAgICBpZiAoIXZhbGlkYXRvcnMpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBzZXR1cCB3YXRjaGVycyBhbmQgcGFyc2Vyc1xuICAgICAgICB2YXIgaGFzVmFsaWRhdG9ycyA9IGN0cmwuaGFzT3duUHJvcGVydHkoXCIkdmFsaWRhdG9yc1wiKTtcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKHZhbGlkYXRvcnMsIGZ1bmN0aW9uICh2YWxpZGF0b3IsIG5hbWUpIHtcbiAgICAgICAgICBpZiAoaGFzVmFsaWRhdG9ycykge1xuICAgICAgICAgICAgdmFyIGlzUG9zc2libHlBc3luYyA9ICFhbmd1bGFyLmlzU3RyaW5nKHZhbGlkYXRvcik7XG4gICAgICAgICAgICB2YXIgdmFsaWRhdG9yQ29sbGVjdGlvbiA9IGlzUG9zc2libHlBc3luYyA/IFwiJGFzeW5jVmFsaWRhdG9yc1wiIDogXCIkdmFsaWRhdG9yc1wiO1xuICAgICAgICAgICAgY3RybFt2YWxpZGF0b3JDb2xsZWN0aW9uXVtuYW1lXSA9IGZ1bmN0aW9uIChtb2RlbFZhbHVlLCB2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIHZhbHVlID0gZm9ybWx5VXRpbC5mb3JtbHlFdmFsKHNjb3BlLCB2YWxpZGF0b3IsIG1vZGVsVmFsdWUsIHZpZXdWYWx1ZSk7XG4gICAgICAgICAgICAgIGlmIChpc1Bvc3NpYmx5QXN5bmMpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gaXNQcm9taXNlTGlrZSh2YWx1ZSkgPyB2YWx1ZSA6IHZhbHVlID8gJHEud2hlbih2YWx1ZSkgOiAkcS5yZWplY3QodmFsdWUpO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY3RybC4kcGFyc2Vycy51bnNoaWZ0KGZ1bmN0aW9uICh2aWV3VmFsdWUpIHtcbiAgICAgICAgICAgICAgdmFyIGlzVmFsaWQgPSBmb3JtbHlVdGlsLmZvcm1seUV2YWwoc2NvcGUsIHZhbGlkYXRvciwgY3RybC4kbW9kZWxWYWx1ZSwgdmlld1ZhbHVlKTtcbiAgICAgICAgICAgICAgY3RybC4kc2V0VmFsaWRpdHkobmFtZSwgaXNWYWxpZCk7XG4gICAgICAgICAgICAgIHJldHVybiB2aWV3VmFsdWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH07XG4gICAgZnVuY3Rpb24gaXNQcm9taXNlTGlrZShvYmopIHtcbiAgICAgIHJldHVybiBvYmogJiYgYW5ndWxhci5pc0Z1bmN0aW9uKG9iai50aGVuKTtcbiAgICB9XG4gIH1dKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvZm9ybWx5LWN1c3RvbS12YWxpZGF0aW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyLWZpeFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKFwiZm9ybWx5RmllbGRcIiwgZm9ybWx5RmllbGQpO1xuXG4gIGZvcm1seUZpZWxkLnRlc3RzID0gT05fVEVTVCA/IHJlcXVpcmUoXCIuL2Zvcm1seS1maWVsZC50ZXN0XCIpKG5nTW9kdWxlKSA6IG51bGw7XG5cbiAgZnVuY3Rpb24gZm9ybWx5RmllbGQoJGh0dHAsICRxLCAkY29tcGlsZSwgJHRlbXBsYXRlQ2FjaGUsIGZvcm1seUNvbmZpZywgZm9ybWx5VXRpbCwgZm9ybWx5VXNhYmlsaXR5LCBmb3JtbHlXYXJuKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHJlc3RyaWN0OiBcIkFFXCIsXG4gICAgICB0cmFuc2NsdWRlOiB0cnVlLFxuICAgICAgc2NvcGU6IHtcbiAgICAgICAgb3B0aW9uczogXCI9XCIsXG4gICAgICAgIG1vZGVsOiBcIj1cIixcbiAgICAgICAgZm9ybUlkOiBcIj0/XCIsXG4gICAgICAgIGluZGV4OiBcIj0/XCIsXG4gICAgICAgIGZpZWxkczogXCI9P1wiLFxuICAgICAgICBmb3JtOiBcIj0/XCJcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBbXCIkc2NvcGVcIiwgXCIkaW50ZXJ2YWxcIiwgXCIkcGFyc2VcIiwgZnVuY3Rpb24gZmllbGRDb250cm9sbGVyKCRzY29wZSwgJGludGVydmFsLCAkcGFyc2UpIHtcbiAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NiAqL1xuICAgICAgICBtZXJnZUZpZWxkT3B0aW9uc1dpdGhUeXBlRGVmYXVsdHMoJHNjb3BlLm9wdGlvbnMpO1xuICAgICAgICBhcGlDaGVjaygkc2NvcGUub3B0aW9ucyk7XG4gICAgICAgIC8vIHNldCBmaWVsZCBpZCB0byBsaW5rIGxhYmVscyBhbmQgZmllbGRzXG4gICAgICAgICRzY29wZS5pZCA9IGZvcm1seVV0aWwuZ2V0RmllbGRJZCgkc2NvcGUuZm9ybUlkLCAkc2NvcGUub3B0aW9ucywgJHNjb3BlLmluZGV4KTtcblxuICAgICAgICBhbmd1bGFyLmV4dGVuZCgkc2NvcGUub3B0aW9ucywge1xuICAgICAgICAgIC8vIGF0dGFjaCB0aGUga2V5IGluIGNhc2UgdGhlIGZvcm1seS1maWVsZCBkaXJlY3RpdmUgaXMgdXNlZCBkaXJlY3RseVxuICAgICAgICAgIGtleTogJHNjb3BlLm9wdGlvbnMua2V5IHx8ICRzY29wZS5pbmRleCB8fCAwLFxuICAgICAgICAgIHZhbHVlOiB2YWx1ZUdldHRlclNldHRlcixcbiAgICAgICAgICBydW5FeHByZXNzaW9uczogcnVuRXhwcmVzc2lvbnMsXG4gICAgICAgICAgbW9kZWxPcHRpb25zOiAkc2NvcGUub3B0aW9ucy5tb2RlbE9wdGlvbnMgfHwge1xuICAgICAgICAgICAgZ2V0dGVyU2V0dGVyOiB0cnVlLFxuICAgICAgICAgICAgYWxsb3dJbnZhbGlkOiB0cnVlXG4gICAgICAgICAgfVxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBpbml0YWxpemF0aW9uXG4gICAgICAgIHJ1bkV4cHJlc3Npb25zKCk7XG4gICAgICAgIGlmICghJHNjb3BlLm9wdGlvbnMubm9Gb3JtQ29udHJvbCkge1xuICAgICAgICAgIHNldEZvcm1Db250cm9sKCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCRzY29wZS5vcHRpb25zLm1vZGVsKSB7XG4gICAgICAgICAgJHNjb3BlLiR3YXRjaChcIm9wdGlvbnMubW9kZWxcIiwgcnVuRXhwcmVzc2lvbnMsIHRydWUpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gZnVuY3Rpb24gZGVmaW5pdGlvbnNcbiAgICAgICAgZnVuY3Rpb24gcnVuRXhwcmVzc2lvbnMoKSB7XG4gICAgICAgICAgdmFyIGZpZWxkID0gJHNjb3BlLm9wdGlvbnM7XG4gICAgICAgICAgdmFyIGN1cnJlbnRWYWx1ZSA9IHZhbHVlR2V0dGVyU2V0dGVyKCk7XG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKGZpZWxkLmV4cHJlc3Npb25Qcm9wZXJ0aWVzLCBmdW5jdGlvbiBydW5FeHByZXNzaW9uKGV4cHJlc3Npb24sIHByb3ApIHtcbiAgICAgICAgICAgIHZhciBzZXR0ZXIgPSAkcGFyc2UocHJvcCkuYXNzaWduO1xuICAgICAgICAgICAgdmFyIHByb21pc2UgPSAkcS53aGVuKGZvcm1seVV0aWwuZm9ybWx5RXZhbCgkc2NvcGUsIGV4cHJlc3Npb24sIGN1cnJlbnRWYWx1ZSkpO1xuICAgICAgICAgICAgcHJvbWlzZS50aGVuKGZ1bmN0aW9uICh2YWx1ZSkge1xuICAgICAgICAgICAgICBzZXR0ZXIoZmllbGQsIHZhbHVlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gdmFsdWVHZXR0ZXJTZXR0ZXIobmV3VmFsKSB7XG4gICAgICAgICAgaWYgKCEkc2NvcGUubW9kZWwgfHwgISRzY29wZS5vcHRpb25zLmtleSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0RlZmluZWQobmV3VmFsKSkge1xuICAgICAgICAgICAgJHNjb3BlLm1vZGVsWyRzY29wZS5vcHRpb25zLmtleV0gPSBuZXdWYWw7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAkc2NvcGUubW9kZWxbJHNjb3BlLm9wdGlvbnMua2V5XTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldEZvcm1Db250cm9sKCkge1xuICAgICAgICAgIHZhciBzdG9wV2FpdGluZ0ZvckRlc3Ryb3k7XG4gICAgICAgICAgdmFyIG1heFRpbWUgPSAyMDAwO1xuICAgICAgICAgIHZhciBpbnRlcnZhbFRpbWUgPSA1O1xuICAgICAgICAgIHZhciBpdGVyYXRpb25zID0gMDtcbiAgICAgICAgICB2YXIgaW50ZXJ2YWwgPSAkaW50ZXJ2YWwoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgaXRlcmF0aW9ucysrO1xuICAgICAgICAgICAgaWYgKCFhbmd1bGFyLmlzRGVmaW5lZCgkc2NvcGUub3B0aW9ucy5rZXkpKSB7XG4gICAgICAgICAgICAgIHJldHVybiBjbGVhblVwKCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB2YXIgZm9ybUNvbnRyb2wgPSAkc2NvcGUuZm9ybSAmJiAkc2NvcGUuZm9ybVskc2NvcGUuaWRdO1xuICAgICAgICAgICAgaWYgKGZvcm1Db250cm9sKSB7XG4gICAgICAgICAgICAgICRzY29wZS5vcHRpb25zLmZvcm1Db250cm9sID0gZm9ybUNvbnRyb2w7XG4gICAgICAgICAgICAgIGNsZWFuVXAoKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW50ZXJ2YWxUaW1lICogaXRlcmF0aW9ucyA+IG1heFRpbWUpIHtcbiAgICAgICAgICAgICAgZm9ybWx5V2FybihcImNvdWxkbnQtc2V0LXRoZS1mb3JtY29udHJvbC1hZnRlci10aW1lbXNcIiwgXCJDb3VsZG4ndCBzZXQgdGhlIGZvcm1Db250cm9sIGFmdGVyIFwiICsgbWF4VGltZSArIFwibXNcIiwgJHNjb3BlKTtcbiAgICAgICAgICAgICAgY2xlYW5VcCgpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH0sIGludGVydmFsVGltZSk7XG4gICAgICAgICAgc3RvcFdhaXRpbmdGb3JEZXN0cm95ID0gJHNjb3BlLiRvbihcIiRkZXN0cm95XCIsIGNsZWFuVXApO1xuXG4gICAgICAgICAgZnVuY3Rpb24gY2xlYW5VcCgpIHtcbiAgICAgICAgICAgIHN0b3BXYWl0aW5nRm9yRGVzdHJveSgpO1xuICAgICAgICAgICAgJGludGVydmFsLmNhbmNlbChpbnRlcnZhbCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gbWVyZ2VGaWVsZE9wdGlvbnNXaXRoVHlwZURlZmF1bHRzKG9wdGlvbnMpIHtcbiAgICAgICAgICB2YXIgdHlwZSA9IGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSwgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgICAgICAgaWYgKHR5cGUgJiYgdHlwZS5kZWZhdWx0T3B0aW9ucykge1xuICAgICAgICAgICAgZm9ybWx5VXRpbC5yZXZlcnNlRGVlcE1lcmdlKG9wdGlvbnMsIHR5cGUuZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIH1cbiAgICAgICAgICB2YXIgcHJvcGVyT3JkZXIgPSBhcnJheWlmeShvcHRpb25zLm9wdGlvbnNUeXBlcykucmV2ZXJzZSgpOyAvLyBzbyB0aGUgcmlnaHQgdGhpbmdzIGFyZSBvdmVycmlkZGVuXG4gICAgICAgICAgYW5ndWxhci5mb3JFYWNoKHByb3Blck9yZGVyLCBmdW5jdGlvbiAodHlwZU5hbWUpIHtcbiAgICAgICAgICAgIGZvcm1seVV0aWwucmV2ZXJzZURlZXBNZXJnZShvcHRpb25zLCBmb3JtbHlDb25maWcuZ2V0VHlwZSh0eXBlTmFtZSwgdHJ1ZSwgb3B0aW9ucykuZGVmYXVsdE9wdGlvbnMpO1xuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XSxcbiAgICAgIGxpbms6IGZ1bmN0aW9uIGZpZWxkTGluayhzY29wZSwgZWwpIHtcbiAgICAgICAgZ2V0RmllbGRUZW1wbGF0ZShzY29wZS5vcHRpb25zKS50aGVuKHJ1bk1hbmlwdWxhdG9ycyhmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlcikpLnRoZW4odHJhbnNjbHVkZUluV3JhcHBlcnMoc2NvcGUub3B0aW9ucykpLnRoZW4ocnVuTWFuaXB1bGF0b3JzKGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wb3N0V3JhcHBlcikpLnRoZW4oc2V0RWxlbWVudFRlbXBsYXRlKVtcImNhdGNoXCJdKGZ1bmN0aW9uIChlcnJvcikge1xuICAgICAgICAgIGZvcm1seVdhcm4oXCJUaGVyZSB3YXMgYSBwcm9ibGVtIHNldHRpbmcgdGhlIHRlbXBsYXRlIGZvciB0aGlzIGZpZWxkIFwiLCBzY29wZS5vcHRpb25zLCBlcnJvcik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGZ1bmN0aW9uIHNldEVsZW1lbnRUZW1wbGF0ZSh0ZW1wbGF0ZUVsKSB7XG4gICAgICAgICAgZWwuaHRtbChhc0h0bWwodGVtcGxhdGVFbCkpO1xuICAgICAgICAgICRjb21waWxlKGVsLmNvbnRlbnRzKCkpKHNjb3BlKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHJ1bk1hbmlwdWxhdG9ycyhtYW5pcHVsYXRvcnMpIHtcbiAgICAgICAgICByZXR1cm4gZnVuY3Rpb24gcnVuTWFuaXB1bGF0b3JzT25UZW1wbGF0ZSh0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgdmFyIGNoYWluID0gJHEud2hlbih0ZW1wbGF0ZSk7XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2gobWFuaXB1bGF0b3JzLCBmdW5jdGlvbiAobWFuaXB1bGF0b3IpIHtcbiAgICAgICAgICAgICAgY2hhaW4gPSBjaGFpbi50aGVuKGZ1bmN0aW9uICh0ZW1wbGF0ZSkge1xuICAgICAgICAgICAgICAgIHJldHVybiAkcS53aGVuKG1hbmlwdWxhdG9yKHRlbXBsYXRlLCBzY29wZS5vcHRpb25zLCBzY29wZSkpLnRoZW4oZnVuY3Rpb24gKG5ld1RlbXBsYXRlKSB7XG4gICAgICAgICAgICAgICAgICByZXR1cm4gYW5ndWxhci5pc1N0cmluZyhuZXdUZW1wbGF0ZSkgPyBuZXdUZW1wbGF0ZSA6IGFzSHRtbChuZXdUZW1wbGF0ZSk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICByZXR1cm4gY2hhaW47XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBhc0h0bWwoZWwpIHtcbiAgICAgIHZhciB3cmFwcGVyID0gYW5ndWxhci5lbGVtZW50KFwiPGE+PC9hPlwiKTtcbiAgICAgIHJldHVybiB3cmFwcGVyLmFwcGVuZChlbCkuaHRtbCgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldEZpZWxkVGVtcGxhdGUob3B0aW9ucykge1xuICAgICAgdmFyIHR5cGUgPSBmb3JtbHlDb25maWcuZ2V0VHlwZShvcHRpb25zLnR5cGUsIHRydWUsIG9wdGlvbnMpO1xuICAgICAgdmFyIHRlbXBsYXRlID0gb3B0aW9ucy50ZW1wbGF0ZSB8fCB0eXBlICYmIHR5cGUudGVtcGxhdGU7XG4gICAgICB2YXIgdGVtcGxhdGVVcmwgPSBvcHRpb25zLnRlbXBsYXRlVXJsIHx8IHR5cGUgJiYgdHlwZS50ZW1wbGF0ZVVybDtcbiAgICAgIGlmICghdGVtcGxhdGUgJiYgIXRlbXBsYXRlVXJsKSB7XG4gICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGaWVsZEVycm9yKFwidGVtcGxhdGUtdHlwZS10eXBlLW5vdC1zdXBwb3J0ZWRcIiwgXCJ0ZW1wbGF0ZSB0eXBlICdcIiArIG9wdGlvbnMudHlwZSArIFwiJyBub3Qgc3VwcG9ydGVkLiBPbiBlbGVtZW50OlwiLCBvcHRpb25zKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBnZXRUZW1wbGF0ZSh0ZW1wbGF0ZSB8fCB0ZW1wbGF0ZVVybCwgIXRlbXBsYXRlKTtcbiAgICB9XG5cblxuICAgIGZ1bmN0aW9uIGdldFRlbXBsYXRlKHRlbXBsYXRlLCBpc1VybCkge1xuICAgICAgaWYgKCFpc1VybCkge1xuICAgICAgICByZXR1cm4gJHEud2hlbih0ZW1wbGF0ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB2YXIgaHR0cE9wdGlvbnMgPSB7IGNhY2hlOiAkdGVtcGxhdGVDYWNoZSB9O1xuICAgICAgICByZXR1cm4gJGh0dHAuZ2V0KHRlbXBsYXRlLCBodHRwT3B0aW9ucykudGhlbihmdW5jdGlvbiAocmVzcG9uc2UpIHtcbiAgICAgICAgICByZXR1cm4gcmVzcG9uc2UuZGF0YTtcbiAgICAgICAgfSlbXCJjYXRjaFwiXShmdW5jdGlvbiAoZXJyb3IpIHtcbiAgICAgICAgICBmb3JtbHlXYXJuKFwicHJvYmxlbS1sb2FkaW5nLXRlbXBsYXRlLWZvci10ZW1wbGF0ZXVybFwiLCBcIlByb2JsZW0gbG9hZGluZyB0ZW1wbGF0ZSBmb3IgXCIgKyB0ZW1wbGF0ZSwgZXJyb3IpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiB0cmFuc2NsdWRlSW5XcmFwcGVycyhvcHRpb25zKSB7XG4gICAgICB2YXIgd3JhcHBlciA9IGdldFdyYXBwZXJPcHRpb24ob3B0aW9ucyk7XG5cbiAgICAgIHJldHVybiBmdW5jdGlvbiB0cmFuc2NsdWRlVGVtcGxhdGUodGVtcGxhdGUpIHtcbiAgICAgICAgaWYgKCF3cmFwcGVyKSB7XG4gICAgICAgICAgcmV0dXJuICRxLndoZW4odGVtcGxhdGUpO1xuICAgICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNBcnJheSh3cmFwcGVyKSkge1xuICAgICAgICAgIHdyYXBwZXIuZm9yRWFjaChmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyKTtcbiAgICAgICAgICB2YXIgcHJvbWlzZXMgPSB3cmFwcGVyLm1hcChmdW5jdGlvbiAodykge1xuICAgICAgICAgICAgcmV0dXJuIGdldFRlbXBsYXRlKHcudGVtcGxhdGUgfHwgdy50ZW1wbGF0ZVVybCwgIXcudGVtcGxhdGUpO1xuICAgICAgICAgIH0pO1xuICAgICAgICAgIHJldHVybiAkcS5hbGwocHJvbWlzZXMpLnRoZW4oZnVuY3Rpb24gKHdyYXBwZXJzVGVtcGxhdGVzKSB7XG4gICAgICAgICAgICB3cmFwcGVyc1RlbXBsYXRlcy5mb3JFYWNoKGZ1bmN0aW9uICh3cmFwcGVyVGVtcGxhdGUsIGluZGV4KSB7XG4gICAgICAgICAgICAgIGZvcm1seVVzYWJpbGl0eS5jaGVja1dyYXBwZXJUZW1wbGF0ZSh3cmFwcGVyVGVtcGxhdGUsIHdyYXBwZXJbaW5kZXhdKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgd3JhcHBlcnNUZW1wbGF0ZXMucmV2ZXJzZSgpOyAvLyB3cmFwcGVyIDAgaXMgd3JhcHBlZCBpbiB3cmFwcGVyIDEgYW5kIHNvIG9uLi4uXG4gICAgICAgICAgICB2YXIgdG90YWxXcmFwcGVyID0gd3JhcHBlcnNUZW1wbGF0ZXMuc2hpZnQoKTtcbiAgICAgICAgICAgIHdyYXBwZXJzVGVtcGxhdGVzLmZvckVhY2goZnVuY3Rpb24gKHdyYXBwZXJUZW1wbGF0ZSkge1xuICAgICAgICAgICAgICB0b3RhbFdyYXBwZXIgPSBkb1RyYW5zY2x1c2lvbih0b3RhbFdyYXBwZXIsIHdyYXBwZXJUZW1wbGF0ZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHJldHVybiBkb1RyYW5zY2x1c2lvbih0b3RhbFdyYXBwZXIsIHRlbXBsYXRlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyKHdyYXBwZXIpO1xuICAgICAgICAgIHZhciB0ID0gd3JhcHBlci50ZW1wbGF0ZSB8fCB3cmFwcGVyLnRlbXBsYXRlVXJsO1xuICAgICAgICAgIHJldHVybiBnZXRUZW1wbGF0ZSh0LCAhd3JhcHBlci50ZW1wbGF0ZSkudGhlbihmdW5jdGlvbiAod3JhcHBlclRlbXBsYXRlKSB7XG4gICAgICAgICAgICBmb3JtbHlVc2FiaWxpdHkuY2hlY2tXcmFwcGVyVGVtcGxhdGUod3JhcHBlclRlbXBsYXRlLCB3cmFwcGVyKTtcbiAgICAgICAgICAgIHJldHVybiBkb1RyYW5zY2x1c2lvbih3cmFwcGVyVGVtcGxhdGUsIHRlbXBsYXRlKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBkb1RyYW5zY2x1c2lvbih3cmFwcGVyLCB0ZW1wbGF0ZSkge1xuICAgICAgdmFyIHdyYXBwZXJFbCA9IGFuZ3VsYXIuZWxlbWVudCh3cmFwcGVyKTtcbiAgICAgIHZhciB0cmFuc2NsdWRlRWwgPSB3cmFwcGVyRWwuZmluZChcImZvcm1seS10cmFuc2NsdWRlXCIpO1xuICAgICAgdHJhbnNjbHVkZUVsLnJlcGxhY2VXaXRoKHRlbXBsYXRlKTtcbiAgICAgIHJldHVybiBhc0h0bWwod3JhcHBlckVsKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRXcmFwcGVyT3B0aW9uKG9wdGlvbnMpIHtcbiAgICAgIC8qIGpzaGludCBtYXhjb21wbGV4aXR5OjkgKi9cbiAgICAgIHZhciB0ZW1wbGF0ZU9wdGlvbiA9IG9wdGlvbnMud3JhcHBlcjtcbiAgICAgIC8vIGV4cGxpY2l0IG51bGwgbWVhbnMgbm8gd3JhcHBlclxuICAgICAgaWYgKHRlbXBsYXRlT3B0aW9uID09PSBudWxsKSB7XG4gICAgICAgIHJldHVybiBcIlwiO1xuICAgICAgfVxuICAgICAgdmFyIHdyYXBwZXIgPSB0ZW1wbGF0ZU9wdGlvbjtcbiAgICAgIC8vIG5vdGhpbmcgc3BlY2lmaWVkIG1lYW5zIHVzZSB0aGUgZGVmYXVsdCB3cmFwcGVyIGZvciB0aGUgdHlwZVxuICAgICAgaWYgKCF0ZW1wbGF0ZU9wdGlvbikge1xuICAgICAgICB3cmFwcGVyID0gZm9ybWx5Q29uZmlnLmdldFdyYXBwZXJCeVR5cGUob3B0aW9ucy50eXBlKTtcbiAgICAgIH0gZWxzZSBpZiAoYW5ndWxhci5pc1N0cmluZyh0ZW1wbGF0ZU9wdGlvbikpIHtcbiAgICAgICAgLy8gc3RyaW5nIG1lYW5zIGl0J3MgYSB0eXBlXG4gICAgICAgIHdyYXBwZXIgPSBmb3JtbHlDb25maWcuZ2V0V3JhcHBlcih0ZW1wbGF0ZU9wdGlvbik7XG4gICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNBcnJheSh0ZW1wbGF0ZU9wdGlvbikpIHtcbiAgICAgICAgLy8gYXJyYXkgbWVhbnMgd3JhcCB0aGUgd3JhcHBlcnNcbiAgICAgICAgd3JhcHBlciA9IHRlbXBsYXRlT3B0aW9uLm1hcChmdW5jdGlvbiAod3JhcHBlck5hbWUpIHtcbiAgICAgICAgICByZXR1cm4gZm9ybWx5Q29uZmlnLmdldFdyYXBwZXIod3JhcHBlck5hbWUpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHdyYXBwZXIgPSBhcnJheWlmeSh3cmFwcGVyKTtcbiAgICAgIHZhciBkZWZhdWx0V3JhcHBlciA9IGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKCk7XG4gICAgICB2YXIgdHlwZSA9IGZvcm1seUNvbmZpZy5nZXRUeXBlKG9wdGlvbnMudHlwZSwgdHJ1ZSwgb3B0aW9ucyk7XG4gICAgICBpZiAodHlwZSAmJiB0eXBlLndyYXBwZXIpIHtcbiAgICAgICAgdmFyIHR5cGVXcmFwcGVycyA9IGFycmF5aWZ5KHR5cGUud3JhcHBlcikubWFwKGZvcm1seUNvbmZpZy5nZXRXcmFwcGVyKTtcbiAgICAgICAgd3JhcHBlciA9IHdyYXBwZXIuY29uY2F0KHR5cGVXcmFwcGVycyk7XG4gICAgICB9XG4gICAgICBpZiAoZGVmYXVsdFdyYXBwZXIpIHtcbiAgICAgICAgd3JhcHBlci5wdXNoKGRlZmF1bHRXcmFwcGVyKTtcbiAgICAgIH1cbiAgICAgIGlmICh3cmFwcGVyLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgcmV0dXJuIHdyYXBwZXI7XG4gICAgICB9IGVsc2UgaWYgKHdyYXBwZXIubGVuZ3RoID09PSAxKSB7XG4gICAgICAgIHJldHVybiB3cmFwcGVyWzBdO1xuICAgICAgfVxuICAgICAgLy8gb3RoZXJ3aXNlIHJldHVybiBub3RoaW5nXG4gICAgfVxuXG4gICAgZnVuY3Rpb24gYXBpQ2hlY2sob3B0aW9ucykge1xuICAgICAgdmFyIHRlbXBsYXRlT3B0aW9ucyA9IGdldFRlbXBsYXRlT3B0aW9uc0NvdW50KG9wdGlvbnMpO1xuICAgICAgaWYgKHRlbXBsYXRlT3B0aW9ucyA9PT0gMCkge1xuICAgICAgICB0aHJvdyBmb3JtbHlVc2FiaWxpdHkuZ2V0RmllbGRFcnJvcihcInlvdS1tdXN0LXByb3ZpZGUtb25lLW9mLXR5cGUtdGVtcGxhdGUtb3ItdGVtcGxhdGV1cmwtZm9yLWEtZmllbGRcIiwgXCJZb3UgbXVzdCBwcm92aWRlIG9uZSBvZiB0eXBlLCB0ZW1wbGF0ZSwgb3IgdGVtcGxhdGVVcmwgZm9yIGEgZmllbGRcIiwgb3B0aW9ucyk7XG4gICAgICB9IGVsc2UgaWYgKHRlbXBsYXRlT3B0aW9ucyA+IDEpIHtcbiAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXCJ5b3UtbXVzdC1vbmx5LXByb3ZpZGUtYS10eXBlLXRlbXBsYXRlLW9yLXRlbXBsYXRldXJsLWZvci1hLWZpZWxkXCIsIFwiWW91IG11c3Qgb25seSBwcm92aWRlIGEgdHlwZSwgdGVtcGxhdGUsIG9yIHRlbXBsYXRlVXJsIGZvciBhIGZpZWxkXCIsIG9wdGlvbnMpO1xuICAgICAgfVxuXG4gICAgICAvLyBjaGVjayB0aGF0IG9ubHkgYWxsb3dlZCBwcm9wZXJ0aWVzIGFyZSBwcm92aWRlZFxuICAgICAgdmFyIGFsbG93ZWRQcm9wZXJ0aWVzID0gW1widHlwZVwiLCBcInRlbXBsYXRlXCIsIFwidGVtcGxhdGVVcmxcIiwgXCJrZXlcIiwgXCJtb2RlbFwiLCBcImV4cHJlc3Npb25Qcm9wZXJ0aWVzXCIsIFwiZGF0YVwiLCBcInRlbXBsYXRlT3B0aW9uc1wiLCBcIndyYXBwZXJcIiwgXCJtb2RlbE9wdGlvbnNcIiwgXCJ3YXRjaGVyXCIsIFwidmFsaWRhdG9yc1wiLCBcIm5vRm9ybUNvbnRyb2xcIiwgXCJoaWRlXCIsIFwibmdNb2RlbEF0dHJzXCIsIFwib3B0aW9uc1R5cGVzXCIsXG4gICAgICAvLyB0aGluZ3Mgd2UgYWRkIHRvIHRoZSBmaWVsZCBhZnRlciB0aGUgZmFjdCBhcmUgb2tcbiAgICAgIFwiZm9ybUNvbnRyb2xcIiwgXCJ2YWx1ZVwiLCBcInJ1bkV4cHJlc3Npb25zXCJdO1xuICAgICAgdmFyIGV4dHJhUHJvcHMgPSBPYmplY3Qua2V5cyhvcHRpb25zKS5maWx0ZXIoZnVuY3Rpb24gKHByb3ApIHtcbiAgICAgICAgcmV0dXJuIGFsbG93ZWRQcm9wZXJ0aWVzLmluZGV4T2YocHJvcCkgPT09IC0xO1xuICAgICAgfSk7XG4gICAgICBpZiAoZXh0cmFQcm9wcy5sZW5ndGgpIHtcbiAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXCJ5b3UtaGF2ZS1zcGVjaWZpZWQtZmllbGQtcHJvcGVydGllcy10aGF0LWFyZS1ub3QtYWxsb3dlZFwiLCBcIllvdSBoYXZlIHNwZWNpZmllZCBmaWVsZCBwcm9wZXJ0aWVzIHRoYXQgYXJlIG5vdCBhbGxvd2VkOiBcIiArIEpTT04uc3RyaW5naWZ5KGV4dHJhUHJvcHMuam9pbihcIiwgXCIpKSwgb3B0aW9ucyk7XG4gICAgICB9XG5cbiAgICAgIGZ1bmN0aW9uIGdldFRlbXBsYXRlT3B0aW9uc0NvdW50KG9wdGlvbnMpIHtcbiAgICAgICAgdmFyIHRlbXBsYXRlT3B0aW9ucyA9IDA7XG4gICAgICAgIHRlbXBsYXRlT3B0aW9ucyArPSBhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnRlbXBsYXRlKSA/IDEgOiAwO1xuICAgICAgICB0ZW1wbGF0ZU9wdGlvbnMgKz0gYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy50eXBlKSA/IDEgOiAwO1xuICAgICAgICB0ZW1wbGF0ZU9wdGlvbnMgKz0gYW5ndWxhci5pc0RlZmluZWQob3B0aW9ucy50ZW1wbGF0ZVVybCkgPyAxIDogMDtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlT3B0aW9ucztcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgZm9ybWx5RmllbGQuJGluamVjdCA9IFtcIiRodHRwXCIsIFwiJHFcIiwgXCIkY29tcGlsZVwiLCBcIiR0ZW1wbGF0ZUNhY2hlXCIsIFwiZm9ybWx5Q29uZmlnXCIsIFwiZm9ybWx5VXRpbFwiLCBcImZvcm1seVVzYWJpbGl0eVwiLCBcImZvcm1seVdhcm5cIl07XG5cbiAgZnVuY3Rpb24gYXJyYXlpZnkob2JqKSB7XG4gICAgaWYgKG9iaiAmJiAhYW5ndWxhci5pc0FycmF5KG9iaikpIHtcbiAgICAgIG9iaiA9IFtvYmpdO1xuICAgIH0gZWxzZSBpZiAoIW9iaikge1xuICAgICAgb2JqID0gW107XG4gICAgfVxuICAgIHJldHVybiBvYmo7XG4gIH1cbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvZm9ybWx5LWZpZWxkLmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3RvQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7IHJldHVybiBBcnJheS5pc0FycmF5KGFycikgPyBhcnIgOiBBcnJheS5mcm9tKGFycik7IH07XG5cbnZhciBfc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyLWZpeFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKFwiZm9ybWx5Rm9ybVwiLCBmb3JtbHlGb3JtKTtcblxuICBmb3JtbHlGb3JtLnRlc3RzID0gT05fVEVTVCA/IHJlcXVpcmUoXCIuL2Zvcm1seS1mb3JtLnRlc3RcIikobmdNb2R1bGUpIDogbnVsbDtcblxuICBmdW5jdGlvbiBmb3JtbHlGb3JtKGZvcm1seVVzYWJpbGl0eSkge1xuICAgIHZhciBjdXJyZW50Rm9ybUlkID0gMTtcbiAgICByZXR1cm4ge1xuICAgICAgcmVzdHJpY3Q6IFwiRVwiLFxuICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2Zvcm1seS1mb3JtLmh0bWxcIiksXG4gICAgICByZXBsYWNlOiB0cnVlLFxuICAgICAgdHJhbnNjbHVkZTogdHJ1ZSxcbiAgICAgIHNjb3BlOiB7XG4gICAgICAgIGZpZWxkczogXCI9XCIsXG4gICAgICAgIG1vZGVsOiBcIj0/XCIsIC8vIHdlJ2xsIGRvIG91ciBvd24gd2FybmluZyB0byBoZWxwIHdpdGggbWlncmF0aW9uc1xuICAgICAgICBmb3JtOiBcIj0/XCJcbiAgICAgIH0sXG4gICAgICBjb250cm9sbGVyOiBbXCIkc2NvcGVcIiwgZnVuY3Rpb24gKCRzY29wZSkge1xuICAgICAgICAkc2NvcGUuZm9ybUlkID0gXCJmb3JtbHlfXCIgKyBjdXJyZW50Rm9ybUlkKys7XG5cbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIGF0dGFjaEtleSk7IC8vIGF0dGFjaGVzIGEga2V5IGJhc2VkIG9uIHRoZSBpbmRleCBpZiBhIGtleSBpc24ndCBzcGVjaWZpZWRcbiAgICAgICAgYW5ndWxhci5mb3JFYWNoKCRzY29wZS5maWVsZHMsIHNldHVwV2F0Y2hlcnMpOyAvLyBzZXR1cCB3YXRjaGVycyBmb3IgYWxsIGZpZWxkc1xuXG4gICAgICAgIC8vIHdhdGNoIHRoZSBtb2RlbCBhbmQgZXZhbHVhdGUgd2F0Y2ggZXhwcmVzc2lvbnMgdGhhdCBkZXBlbmQgb24gaXQuXG4gICAgICAgICRzY29wZS4kd2F0Y2goXCJtb2RlbFwiLCBmdW5jdGlvbiBvblJlc3VsdFVwZGF0ZShuZXdSZXN1bHQpIHtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLmZpZWxkcywgZnVuY3Rpb24gKGZpZWxkKSB7XG4gICAgICAgICAgICAvKmpzaGludCAtVzAzMCAqL1xuICAgICAgICAgICAgZmllbGQucnVuRXhwcmVzc2lvbnMgJiYgZmllbGQucnVuRXhwcmVzc2lvbnMobmV3UmVzdWx0KTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSwgdHJ1ZSk7XG5cbiAgICAgICAgZnVuY3Rpb24gYXR0YWNoS2V5KGZpZWxkLCBpbmRleCkge1xuICAgICAgICAgIGZpZWxkLmtleSA9IGZpZWxkLmtleSB8fCBpbmRleCB8fCAwO1xuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0dXBXYXRjaGVycyhmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICBpZiAoIWFuZ3VsYXIuaXNEZWZpbmVkKGZpZWxkLndhdGNoZXIpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHZhciB3YXRjaGVycyA9IGZpZWxkLndhdGNoZXI7XG4gICAgICAgICAgaWYgKCFhbmd1bGFyLmlzQXJyYXkod2F0Y2hlcnMpKSB7XG4gICAgICAgICAgICB3YXRjaGVycyA9IFt3YXRjaGVyc107XG4gICAgICAgICAgfVxuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCh3YXRjaGVycywgZnVuY3Rpb24gKHdhdGNoZXIpIHtcbiAgICAgICAgICAgIGlmICghYW5ndWxhci5pc0RlZmluZWQod2F0Y2hlci5saXN0ZW5lcikpIHtcbiAgICAgICAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZpZWxkRXJyb3IoXCJhbGwtZmllbGQtd2F0Y2hlcnMtbXVzdC1oYXZlLWEtbGlzdGVuZXJcIiwgXCJBbGwgZmllbGQgd2F0Y2hlcnMgbXVzdCBoYXZlIGEgbGlzdGVuZXJcIiwgZmllbGQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdmFyIHdhdGNoRXhwcmVzc2lvbiA9IGdldFdhdGNoRXhwcmVzc2lvbih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpO1xuICAgICAgICAgICAgdmFyIHdhdGNoTGlzdGVuZXIgPSBnZXRXYXRjaExpc3RlbmVyKHdhdGNoZXIsIGZpZWxkLCBpbmRleCk7XG5cbiAgICAgICAgICAgIHZhciB0eXBlID0gd2F0Y2hlci50eXBlIHx8IFwiJHdhdGNoXCI7XG4gICAgICAgICAgICB3YXRjaGVyLnN0b3BXYXRjaGluZyA9ICRzY29wZVt0eXBlXSh3YXRjaEV4cHJlc3Npb24sIHdhdGNoTGlzdGVuZXIsIHdhdGNoZXIud2F0Y2hEZWVwKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGdldFdhdGNoRXhwcmVzc2lvbih3YXRjaGVyLCBmaWVsZCwgaW5kZXgpIHtcbiAgICAgICAgICB2YXIgd2F0Y2hFeHByZXNzaW9uID0gd2F0Y2hlci5leHByZXNzaW9uIHx8IFwibW9kZWxbJ1wiICsgZmllbGQua2V5ICsgXCInXVwiO1xuICAgICAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24od2F0Y2hFeHByZXNzaW9uKSkge1xuICAgICAgICAgICAgLy8gd3JhcCB0aGUgZmllbGQncyB3YXRjaCBleHByZXNzaW9uIHNvIHdlIGNhbiBjYWxsIGl0IHdpdGggdGhlIGZpZWxkIGFzIHRoZSBmaXJzdCBhcmdcbiAgICAgICAgICAgIC8vIGFuZCB0aGUgc3RvcCBmdW5jdGlvbiBhcyB0aGUgbGFzdCBhcmcgYXMgYSBoZWxwZXJcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbEV4cHJlc3Npb24gPSB3YXRjaEV4cHJlc3Npb247XG4gICAgICAgICAgICB3YXRjaEV4cHJlc3Npb24gPSBmdW5jdGlvbiBmb3JtbHlXYXRjaEV4cHJlc3Npb24oKSB7XG4gICAgICAgICAgICAgIHZhciBhcmdzID0gbW9kaWZ5QXJncy5hcHBseSh1bmRlZmluZWQsIFt3YXRjaGVyLCBpbmRleF0uY29uY2F0KF9zbGljZS5jYWxsKGFyZ3VtZW50cykpKTtcbiAgICAgICAgICAgICAgcmV0dXJuIG9yaWdpbmFsRXhwcmVzc2lvbi5hcHBseSh1bmRlZmluZWQsIF90b0FycmF5KGFyZ3MpKTtcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICB3YXRjaEV4cHJlc3Npb24uZGlzcGxheU5hbWUgPSBcIkZvcm1seSBXYXRjaCBFeHByZXNzaW9uIGZvciBmaWVsZCBmb3IgXCIgKyBmaWVsZC5rZXk7XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB3YXRjaEV4cHJlc3Npb247XG4gICAgICAgIH1cblxuICAgICAgICBmdW5jdGlvbiBnZXRXYXRjaExpc3RlbmVyKHdhdGNoZXIsIGZpZWxkLCBpbmRleCkge1xuICAgICAgICAgIHZhciB3YXRjaExpc3RlbmVyID0gd2F0Y2hlci5saXN0ZW5lcjtcbiAgICAgICAgICBpZiAoYW5ndWxhci5pc0Z1bmN0aW9uKHdhdGNoTGlzdGVuZXIpKSB7XG4gICAgICAgICAgICAvLyB3cmFwIHRoZSBmaWVsZCdzIHdhdGNoIGxpc3RlbmVyIHNvIHdlIGNhbiBjYWxsIGl0IHdpdGggdGhlIGZpZWxkIGFzIHRoZSBmaXJzdCBhcmdcbiAgICAgICAgICAgIC8vIGFuZCB0aGUgc3RvcCBmdW5jdGlvbiBhcyB0aGUgbGFzdCBhcmcgYXMgYSBoZWxwZXJcbiAgICAgICAgICAgIHZhciBvcmlnaW5hbExpc3RlbmVyID0gd2F0Y2hMaXN0ZW5lcjtcbiAgICAgICAgICAgIHdhdGNoTGlzdGVuZXIgPSBmdW5jdGlvbiBmb3JtbHlXYXRjaExpc3RlbmVyKCkge1xuICAgICAgICAgICAgICB2YXIgYXJncyA9IG1vZGlmeUFyZ3MuYXBwbHkodW5kZWZpbmVkLCBbd2F0Y2hlciwgaW5kZXhdLmNvbmNhdChfc2xpY2UuY2FsbChhcmd1bWVudHMpKSk7XG4gICAgICAgICAgICAgIHJldHVybiBvcmlnaW5hbExpc3RlbmVyLmFwcGx5KHVuZGVmaW5lZCwgX3RvQXJyYXkoYXJncykpO1xuICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIHdhdGNoTGlzdGVuZXIuZGlzcGxheU5hbWUgPSBcIkZvcm1seSBXYXRjaCBMaXN0ZW5lciBmb3IgZmllbGQgZm9yIFwiICsgZmllbGQua2V5O1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gd2F0Y2hMaXN0ZW5lcjtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIG1vZGlmeUFyZ3Mod2F0Y2hlciwgaW5kZXgpIHtcbiAgICAgICAgICBmb3IgKHZhciBfbGVuID0gYXJndW1lbnRzLmxlbmd0aCwgb3JpZ2luYWxBcmdzID0gQXJyYXkoX2xlbiA+IDIgPyBfbGVuIC0gMiA6IDApLCBfa2V5ID0gMjsgX2tleSA8IF9sZW47IF9rZXkrKykge1xuICAgICAgICAgICAgb3JpZ2luYWxBcmdzW19rZXkgLSAyXSA9IGFyZ3VtZW50c1tfa2V5XTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gWyRzY29wZS5maWVsZHNbaW5kZXhdXS5jb25jYXQoX3RvQXJyYXkob3JpZ2luYWxBcmdzKSwgW3dhdGNoZXIuc3RvcFdhdGNoaW5nXSk7XG4gICAgICAgIH1cbiAgICAgIH1dLFxuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbCwgYXR0cnMpIHtcbiAgICAgICAgaWYgKGF0dHJzLmhhc093blByb3BlcnR5KFwicmVzdWx0XCIpKSB7XG4gICAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZvcm1seUVycm9yKFwiVGhlIFxcXCJyZXN1bHRcXFwiIGF0dHJpYnV0ZSBvbiBhIGZvcm1seS1mb3JtIGlzIG5vIGxvbmdlciB2YWxpZC4gVXNlIFxcXCJtb2RlbFxcXCIgaW5zdGVhZFwiKTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoYXR0cnMubmFtZSAhPT0gXCJmb3JtXCIpIHtcbiAgICAgICAgICAvLyB0aGVuIHRoZXkgc3BlY2lmaWVkIHRoZWlyIG93biBuYW1lXG4gICAgICAgICAgdGhyb3cgZm9ybWx5VXNhYmlsaXR5LmdldEZvcm1seUVycm9yKFwiVGhlIFxcXCJuYW1lXFxcIiBhdHRyaWJ1dGUgb24gYSBmb3JtbHktZm9ybSBpcyBubyBsb25nZXIgdmFsaWQuIFVzZSBcXFwiZm9ybVxcXCIgaW5zdGVhZFwiKTtcbiAgICAgICAgfVxuICAgICAgICAvLyBlbmZvcmNlIHRoZSBtb2RlbCBhdHRyaWJ1dGUgYmVjYXVzZSB3ZSdyZSBtYWtpbmcgaXQgb3B0aW9uYWwgdG8gaGVscCB3aXRoIG1pZ3JhdGlvbnNcbiAgICAgICAgaWYgKCFhdHRycy5oYXNPd25Qcm9wZXJ0eShcIm1vZGVsXCIpIHx8ICFzY29wZS5tb2RlbCkge1xuICAgICAgICAgIHRocm93IGZvcm1seVVzYWJpbGl0eS5nZXRGb3JtbHlFcnJvcihcIlRoZSBcXFwibW9kZWxcXFwiIGF0dHJpYnV0ZSBpcyByZXF1aXJlZCBvbiBhIGZvcm1seS1mb3JtLlwiKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH07XG4gIH1cbiAgZm9ybWx5Rm9ybS4kaW5qZWN0ID0gW1wiZm9ybWx5VXNhYmlsaXR5XCJdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGlyZWN0aXZlcy9mb3JtbHktZm9ybS5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZGlyZWN0aXZlKFwiZm9ybWx5Rm9jdXNcIiwgW1wiJHRpbWVvdXRcIiwgXCIkZG9jdW1lbnRcIiwgZnVuY3Rpb24gKCR0aW1lb3V0LCAkZG9jdW1lbnQpIHtcbiAgICAvKiBqc2hpbnQgLVcwNTIgKi9cbiAgICByZXR1cm4ge1xuICAgICAgbGluazogZnVuY3Rpb24gKHNjb3BlLCBlbGVtZW50LCBhdHRycykge1xuICAgICAgICB2YXIgcHJldmlvdXNFbCA9IG51bGw7XG4gICAgICAgIHZhciBlbCA9IGVsZW1lbnRbMF07XG4gICAgICAgIHZhciBkb2MgPSAkZG9jdW1lbnRbMF07XG4gICAgICAgIGF0dHJzLiRvYnNlcnZlKFwiZm9ybWx5Rm9jdXNcIiwgZnVuY3Rpb24gKHZhbHVlKSB7XG4gICAgICAgICAgaWYgKHZhbHVlID09PSBcInRydWVcIikge1xuICAgICAgICAgICAgJHRpbWVvdXQoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgICBwcmV2aW91c0VsID0gZG9jLmFjdGl2ZUVsZW1lbnQ7XG4gICAgICAgICAgICAgIGVsLmZvY3VzKCk7XG4gICAgICAgICAgICB9LCB+IH5hdHRycy5mb2N1c1dhaXQpO1xuICAgICAgICAgIH0gZWxzZSBpZiAodmFsdWUgPT09IFwiZmFsc2VcIikge1xuICAgICAgICAgICAgaWYgKGRvYy5hY3RpdmVFbGVtZW50ID09PSBlbCkge1xuICAgICAgICAgICAgICBlbC5ibHVyKCk7XG4gICAgICAgICAgICAgIGlmIChhdHRycy5oYXNPd25Qcm9wZXJ0eShcInJlZm9jdXNcIikgJiYgcHJldmlvdXNFbCkge1xuICAgICAgICAgICAgICAgIHByZXZpb3VzRWwuZm9jdXMoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vZGlyZWN0aXZlcy9mb3JtbHktZm9jdXMuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfc2xpY2UgPSBBcnJheS5wcm90b3R5cGUuc2xpY2U7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyLWZpeFwiKTtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuZmFjdG9yeShcImZvcm1seVV0aWxcIiwgZnVuY3Rpb24gKCkge1xuICAgIHZhciBvYmplY3RQcm90b3R5cGUgPSBPYmplY3QuZ2V0UHJvdG90eXBlT2Yoe30pO1xuICAgIHZhciBhcnJheVByb3RvdHlwZSA9IE9iamVjdC5nZXRQcm90b3R5cGVPZihbXSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGZvcm1seUV2YWw6IGZvcm1seUV2YWwsXG4gICAgICBnZXRGaWVsZElkOiBnZXRGaWVsZElkLFxuICAgICAgcmV2ZXJzZURlZXBNZXJnZTogcmV2ZXJzZURlZXBNZXJnZVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBmb3JtbHlFdmFsKHNjb3BlLCBleHByZXNzaW9uLCBtb2RlbFZhbHVlLCB2aWV3VmFsdWUpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzRnVuY3Rpb24oZXhwcmVzc2lvbikpIHtcbiAgICAgICAgcmV0dXJuIGV4cHJlc3Npb24odmlld1ZhbHVlLCBtb2RlbFZhbHVlLCBzY29wZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gc2NvcGUuJGV2YWwoZXhwcmVzc2lvbiwge1xuICAgICAgICAgICR2aWV3VmFsdWU6IHZpZXdWYWx1ZSxcbiAgICAgICAgICAkbW9kZWxWYWx1ZTogbW9kZWxWYWx1ZVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRGaWVsZElkKGZvcm1JZCwgb3B0aW9ucywgaW5kZXgpIHtcbiAgICAgIHZhciB0eXBlID0gb3B0aW9ucy50eXBlO1xuICAgICAgaWYgKCF0eXBlICYmIG9wdGlvbnMudGVtcGxhdGUpIHtcbiAgICAgICAgdHlwZSA9IFwidGVtcGxhdGVcIjtcbiAgICAgIH0gZWxzZSBpZiAoIXR5cGUgJiYgb3B0aW9ucy50ZW1wbGF0ZVVybCkge1xuICAgICAgICB0eXBlID0gXCJ0ZW1wbGF0ZVVybFwiO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW2Zvcm1JZCwgdHlwZSwgb3B0aW9ucy5rZXksIGluZGV4XS5qb2luKFwiX1wiKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiByZXZlcnNlRGVlcE1lcmdlKCkge1xuICAgICAgdmFyIHJlYWxSZXMgPSBhcmd1bWVudHNbMF07XG4gICAgICB2YXIgcmVzID0ge307XG4gICAgICBhbmd1bGFyLmZvckVhY2goW10uY29uY2F0KF9zbGljZS5jYWxsKGFyZ3VtZW50cykpLnJldmVyc2UoKSwgZnVuY3Rpb24gKHNyYykge1xuICAgICAgICBpZiAoIXNyYykge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBhbmd1bGFyLmZvckVhY2goc3JjLCBmdW5jdGlvbiAodmFsLCBwcm9wKSB7XG4gICAgICAgICAgLyoganNoaW50IG1heGNvbXBsZXhpdHk6NyAqL1xuICAgICAgICAgIGlmICh0eXBlb2YgdmFsID09PSBcIm9iamVjdFwiICYmIHZhbCAhPT0gbnVsbCAmJiAoT2JqZWN0LmdldFByb3RvdHlwZU9mKHZhbCkgPT09IG9iamVjdFByb3RvdHlwZSB8fCBPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsKSA9PT0gYXJyYXlQcm90b3R5cGUpKSB7XG4gICAgICAgICAgICB2YXIgZGVlcFJlcyA9IHJlc1twcm9wXTtcbiAgICAgICAgICAgIGlmICghZGVlcFJlcyAmJiBhbmd1bGFyLmlzQXJyYXkodmFsKSkge1xuICAgICAgICAgICAgICBkZWVwUmVzID0gW107XG4gICAgICAgICAgICB9IGVsc2UgaWYgKCFkZWVwUmVzKSB7XG4gICAgICAgICAgICAgIGRlZXBSZXMgPSB7fTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc1twcm9wXSA9IHJldmVyc2VEZWVwTWVyZ2UoZGVlcFJlcywgdmFsKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKHZhbCkpIHtcbiAgICAgICAgICAgIHJlc1twcm9wXSA9IHZhbDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgICBhbmd1bGFyLmZvckVhY2gocmVhbFJlcywgZnVuY3Rpb24gKHZhbCwgcHJvcCkge1xuICAgICAgICBkZWxldGUgcmVhbFJlc1twcm9wXTtcbiAgICAgIH0pO1xuICAgICAgYW5ndWxhci5mb3JFYWNoKHJlcywgZnVuY3Rpb24gKHZhbCwgcHJvcCkge1xuICAgICAgICByZWFsUmVzW3Byb3BdID0gdmFsO1xuICAgICAgfSk7XG4gICAgICByZXMgPSByZWFsUmVzO1xuICAgICAgcmV0dXJuIHJlcztcbiAgICB9XG5cbiAgfSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9zZXJ2aWNlcy9mb3JtbHlVdGlsLmpzXG4gKiogbW9kdWxlIGlkID0gMTRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX3RvQXJyYXkgPSBmdW5jdGlvbiAoYXJyKSB7IHJldHVybiBBcnJheS5pc0FycmF5KGFycikgPyBhcnIgOiBBcnJheS5mcm9tKGFycik7IH07XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmZhY3RvcnkoXCJmb3JtbHlXYXJuXCIsIFtcImZvcm1seUNvbmZpZ1wiLCBcImZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXhcIiwgXCIkbG9nXCIsIGZ1bmN0aW9uIChmb3JtbHlDb25maWcsIGZvcm1seUVycm9yQW5kV2FybmluZ3NVcmxQcmVmaXgsICRsb2cpIHtcbiAgICByZXR1cm4gZnVuY3Rpb24gd2FybigpIHtcbiAgICAgIGlmICghZm9ybWx5Q29uZmlnLmRpc2FibGVXYXJuaW5ncykge1xuICAgICAgICB2YXIgYXJncyA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGFyZ3VtZW50cyk7XG4gICAgICAgIHZhciB3YXJuSW5mb1NsdWcgPSBhcmdzLnNoaWZ0KCk7XG4gICAgICAgIGFyZ3MudW5zaGlmdChcIkZvcm1seSBXYXJuaW5nOlwiKTtcbiAgICAgICAgYXJncy5wdXNoKFwiXCIgKyBmb3JtbHlFcnJvckFuZFdhcm5pbmdzVXJsUHJlZml4ICsgXCJcIiArIHdhcm5JbmZvU2x1Zyk7XG4gICAgICAgICRsb2cud2Fybi5hcHBseSgkbG9nLCBfdG9BcnJheShhcmdzKSk7XG4gICAgICB9XG4gICAgfTtcbiAgfV0pO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vc2VydmljZXMvZm9ybWx5V2Fybi5qc1xuICoqIG1vZHVsZSBpZCA9IDE1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPG5nLWZvcm0gY2xhc3M9XFxcImZvcm1seVxcXCJcXG4gICAgICAgICBuYW1lPVxcXCJmb3JtXFxcIlxcbiAgICAgICAgIHJvbGU9XFxcImZvcm1cXFwiPlxcbiAgPGRpdiBmb3JtbHktZmllbGRcXG4gICAgICAgbmctcmVwZWF0PVxcXCJmaWVsZCBpbiBmaWVsZHMgdHJhY2sgYnkgJGluZGV4XFxcIlxcbiAgICAgICBuZy1pZj1cXFwiIWZpZWxkLmhpZGVcXFwiXFxuICAgICAgIGNsYXNzPVxcXCJmb3JtbHktZmllbGQge3tmaWVsZC50eXBlID8gJ2Zvcm1seS1maWVsZC0nICsgZmllbGQudHlwZSA6ICcnfX1cXFwiXFxuICAgICAgIG9wdGlvbnM9XFxcImZpZWxkXFxcIlxcbiAgICAgICBtb2RlbD1cXFwiZmllbGQubW9kZWwgfHwgbW9kZWxcXFwiXFxuICAgICAgIGZpZWxkcz1cXFwiZmllbGRzXFxcIlxcbiAgICAgICBmb3JtPVxcXCJmb3JtXFxcIlxcbiAgICAgICBmb3JtLWlkPVxcXCJmb3JtSWRcXFwiXFxuICAgICAgIGluZGV4PVxcXCIkaW5kZXhcXFwiPlxcbiAgPC9kaXY+XFxuICA8ZGl2IG5nLXRyYW5zY2x1ZGU+PC9kaXY+XFxuPC9uZy1mb3JtPlxcblwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2RpcmVjdGl2ZXMvZm9ybWx5LWZvcm0uaHRtbFxuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJmb3JtbHkuanMifQ==