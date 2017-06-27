// angular-formly-templates-bootstrap version 4.0.9 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("angular-formly"), require("api-check"), require("angular"));
	else if(typeof define === 'function' && define.amd)
		define(["angular-formly", "api-check", "angular"], factory);
	else if(typeof exports === 'object')
		exports["ngFormlyTemplatesBootstrap"] = factory(require("angular-formly"), require("api-check"), require("angular"));
	else
		root["ngFormlyTemplatesBootstrap"] = factory(root["ngFormly"], root["apiCheck"], root["angular"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_8__) {
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
	
	var ngModuleName = "formlyBootstrap";
	var angular = __webpack_require__(4);
	var ngModule = angular.module(ngModuleName, [__webpack_require__(2)]);
	ngModule.constant("formlyBootstrapApiCheck", __webpack_require__(3)({
	  output: {
	    prefix: "angular-formly-bootstrap"
	  }
	}));
	ngModule.constant("formlyBootstrapVersion", ("4.0.9"));
	
	__webpack_require__(5)(ngModule);
	__webpack_require__(6)(ngModule);
	__webpack_require__(7)(ngModule);
	
	module.exports = ngModuleName;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	// some versions of angular don't export the angular module properly,
	// so we get it from window in this case.
	"use strict";
	
	var angular = __webpack_require__(8);
	if (!angular.version) {
	  angular = window.angular;
	}
	module.exports = angular;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.config(addWrappers);
	
	  function addWrappers(formlyConfigProvider, formlyBootstrapApiCheck) {
	    var c = formlyBootstrapApiCheck;
	    formlyConfigProvider.setWrapper([{
	      name: "bootstrapLabel",
	      template: __webpack_require__(17),
	      apiCheck: {
	        templateOptions: c.shape({
	          label: c.string,
	          required: c.bool.optional
	        })
	      },
	      apiCheckInstance: c
	    }, { name: "bootstrapHasError", template: __webpack_require__(18) }]);
	  }
	  addWrappers.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
	};

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  __webpack_require__(9)(ngModule);
	  __webpack_require__(10)(ngModule);
	  __webpack_require__(11)(ngModule);
	  __webpack_require__(12)(ngModule);
	  __webpack_require__(13)(ngModule);
	  __webpack_require__(14)(ngModule);
	};

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _interopRequire = function (obj) { return obj && obj.__esModule ? obj["default"] : obj; };
	
	var addons = _interopRequire(__webpack_require__(15));
	
	var description = _interopRequire(__webpack_require__(16));
	
	module.exports = function (ngModule) {
	  addons(ngModule);
	  description(ngModule);
	};
	
	//export default ngModule => {
	//  require('./addons')(ngModule);
	//  require('./description')(ngModule);
	//};
	//

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.config(addCheckboxType);
	
	  function addCheckboxType(formlyConfigProvider, formlyBootstrapApiCheck) {
	    var c = formlyBootstrapApiCheck;
	    formlyConfigProvider.setType({
	      name: "checkbox",
	      template: __webpack_require__(19),
	      wrapper: ["bootstrapHasError"],
	      apiCheck: {
	        templateOptions: c.shape({
	          label: c.string
	        })
	      },
	      apiCheckInstance: c
	    });
	  }
	  addCheckboxType.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
	};

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.config(addCheckboxType);
	
	  function addCheckboxType(formlyConfigProvider, formlyBootstrapApiCheck) {
	    var c = formlyBootstrapApiCheck;
	    formlyConfigProvider.setType({
	      name: "multiCheckbox",
	      template: __webpack_require__(20),
	      wrapper: ["bootstrapLabel", "bootstrapHasError"],
	      defaultOptions: {
	        noFormControl: false
	      },
	      apiCheck: {
	        templateOptions: c.shape({
	          options: c.arrayOf(c.object),
	          labelProp: c.string.optional,
	          valueProp: c.string.optional
	        })
	      },
	      apiCheckInstance: c,
	      controller: /* @ngInject */["$scope", function controller($scope) {
	        var to = $scope.to;
	        var opts = $scope.options;
	        $scope.multiCheckbox = {
	          checked: [],
	          change: setModel
	        };
	
	        // initialize the checkboxes check property
	        var modelValue = $scope.model[opts.key];
	        if (angular.isArray(modelValue)) {
	          (function () {
	            var valueProp = to.valueProp || "value";
	            angular.forEach(to.options, function (v, index) {
	              $scope.multiCheckbox.checked[index] = modelValue.indexOf(v[valueProp]) !== -1;
	            });
	          })();
	        }
	
	        function setModel() {
	          $scope.model[opts.key] = [];
	          angular.forEach($scope.multiCheckbox.checked, function (checkbox, index) {
	            if (checkbox) {
	              $scope.model[opts.key].push(to.options[index][to.valueProp || "value"]);
	            }
	          });
	        }
	      }]
	    });
	  }
	  addCheckboxType.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
	};

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.config(addInputType);
	
	  function addInputType(formlyConfigProvider) {
	    formlyConfigProvider.setType({
	      name: "input",
	      template: "<input class=\"form-control\" ng-model=\"model[options.key]\">",
	      wrapper: ["bootstrapLabel", "bootstrapHasError"]
	    });
	  }
	  addInputType.$inject = ["formlyConfigProvider"];
	};

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.config(addRadioType);
	
	  function addRadioType(formlyConfigProvider, formlyBootstrapApiCheck) {
	    var c = formlyBootstrapApiCheck;
	    formlyConfigProvider.setType({
	      name: "radio",
	      template: __webpack_require__(21),
	      wrapper: ["bootstrapLabel", "bootstrapHasError"],
	      defaultOptions: {
	        noFormControl: false
	      },
	      apiCheck: {
	        templateOptions: c.shape({
	          options: c.arrayOf(c.object),
	          labelProp: c.string.optional,
	          valueProp: c.string.optional
	        })
	      },
	      apiCheckInstance: c
	    });
	  }
	  addRadioType.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
	};

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.config(addSelectType);
	
	  function addSelectType(formlyConfigProvider, formlyBootstrapApiCheck) {
	    var c = formlyBootstrapApiCheck;
	    formlyConfigProvider.setType({
	      name: "select",
	      template: __webpack_require__(22),
	      wrapper: ["bootstrapLabel", "bootstrapHasError"],
	      apiCheck: {
	        templateOptions: c.shape({
	          options: c.arrayOf(c.object),
	          labelProp: c.string.optional,
	          valueProp: c.string.optional,
	          groupProp: c.string.optional
	        })
	      },
	      apiCheckInstance: c
	    });
	  }
	  addSelectType.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
	};

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.config(addTextareaType);
	
	  function addTextareaType(formlyConfigProvider, formlyBootstrapApiCheck) {
	    var c = formlyBootstrapApiCheck;
	    formlyConfigProvider.setType({
	      name: "textarea",
	      template: "<textarea class=\"form-control\" ng-model=\"model[options.key]\"></textarea>",
	      wrapper: ["bootstrapLabel", "bootstrapHasError"],
	      defaultOptions: {
	        ngModelAttrs: {
	          rows: { attribute: "rows" },
	          cols: { attribute: "cols" }
	        }
	      },
	      apiCheck: {
	        templateOptions: c.shape({
	          rows: c.number.optional,
	          cols: c.number.optional
	        })
	      },
	      apiCheckInstance: c
	    });
	  }
	  addTextareaType.$inject = ["formlyConfigProvider", "formlyBootstrapApiCheck"];
	};

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.run(addAddonsManipulator);
	
	  function addAddonsManipulator(formlyConfig, formlyBootstrapApiCheck) {
	    var addonTemplate = __webpack_require__(23);
	    var addonChecker = formlyBootstrapApiCheck.shape({
	      "class": formlyBootstrapApiCheck.string.optional,
	      text: formlyBootstrapApiCheck.string.optional
	    }).strict.optional;
	    var api = formlyBootstrapApiCheck.shape({
	      templateOptions: formlyBootstrapApiCheck.shape({
	        addonLeft: addonChecker,
	        addonRight: addonChecker
	      })
	    });
	    formlyConfig.templateManipulators.preWrapper.push(function (template, options) {
	      if (options.type !== "input" || !options.templateOptions.addonLeft && !options.templateOptions.addonRight) {
	        return template;
	      }
	      formlyBootstrapApiCheck.warn([api], [options]);
	      return addonTemplate.replace("<formly-transclude></formly-transclude>", template);
	    });
	  }
	  addAddonsManipulator.$inject = ["formlyConfig", "formlyBootstrapApiCheck"];
	};

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	module.exports = function (ngModule) {
	  ngModule.run(addDescriptionManipulator);
	
	  function addDescriptionManipulator(formlyConfig) {
	    formlyConfig.templateManipulators.preWrapper.push(function ariaDescribedBy(template, options, scope) {
	      if (angular.isDefined(options.templateOptions.description)) {
	        var el = document.createElement("div");
	        el.appendChild(angular.element(template)[0]);
	        el.appendChild(angular.element("<p id=\"" + scope.id + "_description\"" + "class=\"help-block\"" + "ng-if=\"to.description\">" + "{{to.description}}" + "</p>")[0]);
	        var modelEls = angular.element(el.querySelectorAll("[ng-model]"));
	        if (modelEls) {
	          modelEls.attr("aria-describedby", scope.id + "_description");
	        }
	        return el.innerHTML;
	      } else {
	        return template;
	      }
	    });
	  }
	  addDescriptionManipulator.$inject = ["formlyConfig"];
	};

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div>\n  <label for=\"{{id}}\" class=\"control-label\">\n    {{to.label}}\n    {{to.required ? '*' : ''}}\n  </label>\n  <formly-transclude></formly-transclude>\n</div>\n"

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"form-group\" ng-class=\"{'has-error': showError}\">\n  <formly-transclude></formly-transclude>\n</div>\n"

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"checkbox\">\n\t<label>\n\t\t<input type=\"checkbox\"\n           class=\"formly-field-checkbox\"\n\t\t       ng-model=\"model[options.key]\">\n\t\t{{to.label}}\n\t\t{{to.required ? '*' : ''}}\n\t</label>\n</div>\n"

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"radio-group\">\n  <div ng-repeat=\"(key, option) in to.options\" class=\"checkbox\">\n    <label>\n      <input type=\"checkbox\"\n             id=\"{{id + '_'+ $index}}\"\n             ng-model=\"multiCheckbox.checked[$index]\"\n             ng-change=\"multiCheckbox.change()\">\n      {{option[to.labelProp || 'name']}}\n    </label>\n  </div>\n</div>\n"

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div class=\"radio-group\">\n  <div ng-repeat=\"(key, option) in to.options\" class=\"radio\">\n    <label>\n      <input type=\"radio\"\n             id=\"{{id + '_'+ $index}}\"\n             tabindex=\"0\"\n             ng-value=\"option[to.valueProp || 'value']\"\n             ng-model=\"model[options.key]\">\n      {{option[to.labelProp || 'name']}}\n    </label>\n  </div>\n</div>\n"

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<select class=\"form-control\"\n        ng-model=\"model[options.key]\"\n        ng-options=\"option[to.valueProp || 'value'] as option[to.labelProp || 'name'] group by option[to.groupProp || 'group'] for option in to.options\">\n</select>\n"

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	module.exports = "<div ng-class=\"{'input-group': to.addonLeft || to.addonRight}\">\n    <div class=\"input-group-addon\" ng-if=\"to.addonLeft\">\n        <i class=\"{{to.addonLeft.class}}\" ng-if=\"to.addonLeft.class\"></i>\n        <span ng-if=\"to.addonLeft.text\">{{to.addonLeft.text}}</span>\n    </div>\n    <formly-transclude></formly-transclude>\n    <div class=\"input-group-addon\" ng-if=\"to.addonRight\">\n        <i class=\"{{to.addonRight.class}}\" ng-if=\"to.addonRight.class\"></i>\n        <span ng-if=\"to.addonRight.text\">{{to.addonRight.text}}</span>\n    </div>\n</div>"

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCA1YWRhMDkxYjQxYzM5NDA0ZThjNyIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIm5nRm9ybWx5XCIsXCJhbWRcIjpcImFuZ3VsYXItZm9ybWx5XCIsXCJjb21tb25qczJcIjpcImFuZ3VsYXItZm9ybWx5XCIsXCJjb21tb25qc1wiOlwiYW5ndWxhci1mb3JtbHlcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImFwaUNoZWNrXCIsXCJhbWRcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanMyXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzXCI6XCJhcGktY2hlY2tcIn0iLCJ3ZWJwYWNrOi8vLy4vYW5ndWxhci1maXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vd3JhcHBlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi90eXBlcy9jaGVja2JveC5qcyIsIndlYnBhY2s6Ly8vLi90eXBlcy9tdWx0aUNoZWNrYm94LmpzIiwid2VicGFjazovLy8uL3R5cGVzL2lucHV0LmpzIiwid2VicGFjazovLy8uL3R5cGVzL3JhZGlvLmpzIiwid2VicGFjazovLy8uL3R5cGVzL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi90eXBlcy90ZXh0YXJlYS5qcyIsIndlYnBhY2s6Ly8vLi9ydW4vYWRkb25zLmpzIiwid2VicGFjazovLy8uL3J1bi9kZXNjcmlwdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi93cmFwcGVycy9sYWJlbC5odG1sIiwid2VicGFjazovLy8uL3dyYXBwZXJzL2hhcy1lcnJvci5odG1sIiwid2VicGFjazovLy8uL3R5cGVzL2NoZWNrYm94Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdHlwZXMvbXVsdGlDaGVja2JveC5odG1sIiwid2VicGFjazovLy8uL3R5cGVzL3JhZGlvLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdHlwZXMvc2VsZWN0Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vcnVuL2FkZG9ucy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7O0FDdENBOztBQUVBLHlDOzs7Ozs7QUNGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsK0I7Ozs7OztBQ2hCQSxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCOzs7Ozs7QUNSQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQSxNQUFLLEdBQUcsK0RBQW1FO0FBQzNFO0FBQ0E7QUFDQSxHOzs7Ozs7QUNwQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNUQTs7QUFFQSx1Q0FBc0MscURBQXFEOztBQUUzRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ2pCQSxnRDs7Ozs7O0FDQUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxHOzs7Ozs7QUNwQkE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxjQUFhO0FBQ2IsWUFBVztBQUNYOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBLEc7Ozs7OztBQ3JEQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEc7Ozs7OztBQ2JBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRzs7Ozs7O0FDekJBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRzs7Ozs7O0FDdkJBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGtCQUFpQixvQkFBb0I7QUFDckMsa0JBQWlCO0FBQ2pCO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0EsRzs7Ozs7O0FDM0JBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLE1BQUs7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxHOzs7Ozs7QUMxQkE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsNklBQTRJLGdCQUFnQjtBQUM1SjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEc7Ozs7OztBQ3RCQSwyQ0FBMEMsSUFBSSxtQ0FBbUMsVUFBVSxRQUFRLHdCQUF3QixrRTs7Ozs7O0FDQTNILHlEQUF3RCx1QkFBdUIseUQ7Ozs7OztBQ0EvRSxxTEFBb0wsVUFBVSxRQUFRLHdCQUF3Qix1Qjs7Ozs7O0FDQTlOLHVMQUFzTCxrQkFBa0IseUhBQXlILGdDQUFnQyxtQzs7Ozs7O0FDQWpXLGlMQUFnTCxrQkFBa0IsbUpBQW1KLGdDQUFnQyxtQzs7Ozs7O0FDQXJYLHFROzs7Ozs7QUNBQSxvQ0FBbUMsNkNBQTZDLHdGQUF3RixvQkFBb0Isa0ZBQWtGLG1CQUFtQixzSkFBc0oscUJBQXFCLG9GQUFvRixvQkFBb0IsNEIiLCJmaWxlIjoiYW5ndWxhci1mb3JtbHktdGVtcGxhdGVzLWJvb3RzdHJhcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiB3ZWJwYWNrVW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvbihyb290LCBmYWN0b3J5KSB7XG5cdGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0JyAmJiB0eXBlb2YgbW9kdWxlID09PSAnb2JqZWN0Jylcblx0XHRtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkocmVxdWlyZShcImFuZ3VsYXItZm9ybWx5XCIpLCByZXF1aXJlKFwiYXBpLWNoZWNrXCIpLCByZXF1aXJlKFwiYW5ndWxhclwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShbXCJhbmd1bGFyLWZvcm1seVwiLCBcImFwaS1jaGVja1wiLCBcImFuZ3VsYXJcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wibmdGb3JtbHlUZW1wbGF0ZXNCb290c3RyYXBcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyLWZvcm1seVwiKSwgcmVxdWlyZShcImFwaS1jaGVja1wiKSwgcmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIm5nRm9ybWx5VGVtcGxhdGVzQm9vdHN0cmFwXCJdID0gZmFjdG9yeShyb290W1wibmdGb3JtbHlcIl0sIHJvb3RbXCJhcGlDaGVja1wiXSwgcm9vdFtcImFuZ3VsYXJcIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX18sIF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgNWFkYTA5MWI0MWMzOTQwNGU4YzdcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiLi9pbmRleC5jb21tb25cIik7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBuZ01vZHVsZU5hbWUgPSBcImZvcm1seUJvb3RzdHJhcFwiO1xudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiLi9hbmd1bGFyLWZpeFwiKTtcbnZhciBuZ01vZHVsZSA9IGFuZ3VsYXIubW9kdWxlKG5nTW9kdWxlTmFtZSwgW3JlcXVpcmUoXCJhbmd1bGFyLWZvcm1seVwiKV0pO1xubmdNb2R1bGUuY29uc3RhbnQoXCJmb3JtbHlCb290c3RyYXBBcGlDaGVja1wiLCByZXF1aXJlKFwiYXBpLWNoZWNrXCIpKHtcbiAgb3V0cHV0OiB7XG4gICAgcHJlZml4OiBcImFuZ3VsYXItZm9ybWx5LWJvb3RzdHJhcFwiXG4gIH1cbn0pKTtcbm5nTW9kdWxlLmNvbnN0YW50KFwiZm9ybWx5Qm9vdHN0cmFwVmVyc2lvblwiLCBWRVJTSU9OKTtcblxucmVxdWlyZShcIi4vd3JhcHBlcnNcIikobmdNb2R1bGUpO1xucmVxdWlyZShcIi4vdHlwZXNcIikobmdNb2R1bGUpO1xucmVxdWlyZShcIi4vcnVuXCIpKG5nTW9kdWxlKTtcblxubW9kdWxlLmV4cG9ydHMgPSBuZ01vZHVsZU5hbWU7XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL2luZGV4LmNvbW1vbi5qc1xuICoqIG1vZHVsZSBpZCA9IDFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8yX187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJuZ0Zvcm1seVwiLFwiYW1kXCI6XCJhbmd1bGFyLWZvcm1seVwiLFwiY29tbW9uanMyXCI6XCJhbmd1bGFyLWZvcm1seVwiLFwiY29tbW9uanNcIjpcImFuZ3VsYXItZm9ybWx5XCJ9XG4gKiogbW9kdWxlIGlkID0gMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcImFwaUNoZWNrXCIsXCJhbWRcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanMyXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzXCI6XCJhcGktY2hlY2tcIn1cbiAqKiBtb2R1bGUgaWQgPSAzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCIvLyBzb21lIHZlcnNpb25zIG9mIGFuZ3VsYXIgZG9uJ3QgZXhwb3J0IHRoZSBhbmd1bGFyIG1vZHVsZSBwcm9wZXJseSxcbi8vIHNvIHdlIGdldCBpdCBmcm9tIHdpbmRvdyBpbiB0aGlzIGNhc2UuXG5cInVzZSBzdHJpY3RcIjtcblxudmFyIGFuZ3VsYXIgPSByZXF1aXJlKFwiYW5ndWxhclwiKTtcbmlmICghYW5ndWxhci52ZXJzaW9uKSB7XG4gIGFuZ3VsYXIgPSB3aW5kb3cuYW5ndWxhcjtcbn1cbm1vZHVsZS5leHBvcnRzID0gYW5ndWxhcjtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vYW5ndWxhci1maXgvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA0XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuY29uZmlnKGFkZFdyYXBwZXJzKTtcblxuICBmdW5jdGlvbiBhZGRXcmFwcGVycyhmb3JtbHlDb25maWdQcm92aWRlciwgZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2spIHtcbiAgICB2YXIgYyA9IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrO1xuICAgIGZvcm1seUNvbmZpZ1Byb3ZpZGVyLnNldFdyYXBwZXIoW3tcbiAgICAgIG5hbWU6IFwiYm9vdHN0cmFwTGFiZWxcIixcbiAgICAgIHRlbXBsYXRlOiByZXF1aXJlKFwiLi9sYWJlbC5odG1sXCIpLFxuICAgICAgYXBpQ2hlY2s6IHtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zOiBjLnNoYXBlKHtcbiAgICAgICAgICBsYWJlbDogYy5zdHJpbmcsXG4gICAgICAgICAgcmVxdWlyZWQ6IGMuYm9vbC5vcHRpb25hbFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGFwaUNoZWNrSW5zdGFuY2U6IGNcbiAgICB9LCB7IG5hbWU6IFwiYm9vdHN0cmFwSGFzRXJyb3JcIiwgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2hhcy1lcnJvci5odG1sXCIpIH1dKTtcbiAgfVxuICBhZGRXcmFwcGVycy4kaW5qZWN0ID0gW1wiZm9ybWx5Q29uZmlnUHJvdmlkZXJcIiwgXCJmb3JtbHlCb290c3RyYXBBcGlDaGVja1wiXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3dyYXBwZXJzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIHJlcXVpcmUoXCIuL2NoZWNrYm94XCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vbXVsdGlDaGVja2JveFwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL2lucHV0XCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vcmFkaW9cIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9zZWxlY3RcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi90ZXh0YXJlYVwiKShuZ01vZHVsZSk7XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG52YXIgX2ludGVyb3BSZXF1aXJlID0gZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gb2JqICYmIG9iai5fX2VzTW9kdWxlID8gb2JqW1wiZGVmYXVsdFwiXSA6IG9iajsgfTtcblxudmFyIGFkZG9ucyA9IF9pbnRlcm9wUmVxdWlyZShyZXF1aXJlKFwiLi9hZGRvbnNcIikpO1xuXG52YXIgZGVzY3JpcHRpb24gPSBfaW50ZXJvcFJlcXVpcmUocmVxdWlyZShcIi4vZGVzY3JpcHRpb25cIikpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBhZGRvbnMobmdNb2R1bGUpO1xuICBkZXNjcmlwdGlvbihuZ01vZHVsZSk7XG59O1xuXG4vL2V4cG9ydCBkZWZhdWx0IG5nTW9kdWxlID0+IHtcbi8vICByZXF1aXJlKCcuL2FkZG9ucycpKG5nTW9kdWxlKTtcbi8vICByZXF1aXJlKCcuL2Rlc2NyaXB0aW9uJykobmdNb2R1bGUpO1xuLy99O1xuLy9cblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vcnVuL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gN1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzhfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIFwiYW5ndWxhclwiXG4gKiogbW9kdWxlIGlkID0gOFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmNvbmZpZyhhZGRDaGVja2JveFR5cGUpO1xuXG4gIGZ1bmN0aW9uIGFkZENoZWNrYm94VHlwZShmb3JtbHlDb25maWdQcm92aWRlciwgZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2spIHtcbiAgICB2YXIgYyA9IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrO1xuICAgIGZvcm1seUNvbmZpZ1Byb3ZpZGVyLnNldFR5cGUoe1xuICAgICAgbmFtZTogXCJjaGVja2JveFwiLFxuICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2NoZWNrYm94Lmh0bWxcIiksXG4gICAgICB3cmFwcGVyOiBbXCJib290c3RyYXBIYXNFcnJvclwiXSxcbiAgICAgIGFwaUNoZWNrOiB7XG4gICAgICAgIHRlbXBsYXRlT3B0aW9uczogYy5zaGFwZSh7XG4gICAgICAgICAgbGFiZWw6IGMuc3RyaW5nXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgYXBpQ2hlY2tJbnN0YW5jZTogY1xuICAgIH0pO1xuICB9XG4gIGFkZENoZWNrYm94VHlwZS4kaW5qZWN0ID0gW1wiZm9ybWx5Q29uZmlnUHJvdmlkZXJcIiwgXCJmb3JtbHlCb290c3RyYXBBcGlDaGVja1wiXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3R5cGVzL2NoZWNrYm94LmpzXG4gKiogbW9kdWxlIGlkID0gOVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmNvbmZpZyhhZGRDaGVja2JveFR5cGUpO1xuXG4gIGZ1bmN0aW9uIGFkZENoZWNrYm94VHlwZShmb3JtbHlDb25maWdQcm92aWRlciwgZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2spIHtcbiAgICB2YXIgYyA9IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrO1xuICAgIGZvcm1seUNvbmZpZ1Byb3ZpZGVyLnNldFR5cGUoe1xuICAgICAgbmFtZTogXCJtdWx0aUNoZWNrYm94XCIsXG4gICAgICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vbXVsdGlDaGVja2JveC5odG1sXCIpLFxuICAgICAgd3JhcHBlcjogW1wiYm9vdHN0cmFwTGFiZWxcIiwgXCJib290c3RyYXBIYXNFcnJvclwiXSxcbiAgICAgIGRlZmF1bHRPcHRpb25zOiB7XG4gICAgICAgIG5vRm9ybUNvbnRyb2w6IGZhbHNlXG4gICAgICB9LFxuICAgICAgYXBpQ2hlY2s6IHtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zOiBjLnNoYXBlKHtcbiAgICAgICAgICBvcHRpb25zOiBjLmFycmF5T2YoYy5vYmplY3QpLFxuICAgICAgICAgIGxhYmVsUHJvcDogYy5zdHJpbmcub3B0aW9uYWwsXG4gICAgICAgICAgdmFsdWVQcm9wOiBjLnN0cmluZy5vcHRpb25hbFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGFwaUNoZWNrSW5zdGFuY2U6IGMsXG4gICAgICBjb250cm9sbGVyOiAvKiBAbmdJbmplY3QgKi9bXCIkc2NvcGVcIiwgZnVuY3Rpb24gY29udHJvbGxlcigkc2NvcGUpIHtcbiAgICAgICAgdmFyIHRvID0gJHNjb3BlLnRvO1xuICAgICAgICB2YXIgb3B0cyA9ICRzY29wZS5vcHRpb25zO1xuICAgICAgICAkc2NvcGUubXVsdGlDaGVja2JveCA9IHtcbiAgICAgICAgICBjaGVja2VkOiBbXSxcbiAgICAgICAgICBjaGFuZ2U6IHNldE1vZGVsXG4gICAgICAgIH07XG5cbiAgICAgICAgLy8gaW5pdGlhbGl6ZSB0aGUgY2hlY2tib3hlcyBjaGVjayBwcm9wZXJ0eVxuICAgICAgICB2YXIgbW9kZWxWYWx1ZSA9ICRzY29wZS5tb2RlbFtvcHRzLmtleV07XG4gICAgICAgIGlmIChhbmd1bGFyLmlzQXJyYXkobW9kZWxWYWx1ZSkpIHtcbiAgICAgICAgICAoZnVuY3Rpb24gKCkge1xuICAgICAgICAgICAgdmFyIHZhbHVlUHJvcCA9IHRvLnZhbHVlUHJvcCB8fCBcInZhbHVlXCI7XG4gICAgICAgICAgICBhbmd1bGFyLmZvckVhY2godG8ub3B0aW9ucywgZnVuY3Rpb24gKHYsIGluZGV4KSB7XG4gICAgICAgICAgICAgICRzY29wZS5tdWx0aUNoZWNrYm94LmNoZWNrZWRbaW5kZXhdID0gbW9kZWxWYWx1ZS5pbmRleE9mKHZbdmFsdWVQcm9wXSkgIT09IC0xO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSkoKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHNldE1vZGVsKCkge1xuICAgICAgICAgICRzY29wZS5tb2RlbFtvcHRzLmtleV0gPSBbXTtcbiAgICAgICAgICBhbmd1bGFyLmZvckVhY2goJHNjb3BlLm11bHRpQ2hlY2tib3guY2hlY2tlZCwgZnVuY3Rpb24gKGNoZWNrYm94LCBpbmRleCkge1xuICAgICAgICAgICAgaWYgKGNoZWNrYm94KSB7XG4gICAgICAgICAgICAgICRzY29wZS5tb2RlbFtvcHRzLmtleV0ucHVzaCh0by5vcHRpb25zW2luZGV4XVt0by52YWx1ZVByb3AgfHwgXCJ2YWx1ZVwiXSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1dXG4gICAgfSk7XG4gIH1cbiAgYWRkQ2hlY2tib3hUeXBlLiRpbmplY3QgPSBbXCJmb3JtbHlDb25maWdQcm92aWRlclwiLCBcImZvcm1seUJvb3RzdHJhcEFwaUNoZWNrXCJdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdHlwZXMvbXVsdGlDaGVja2JveC5qc1xuICoqIG1vZHVsZSBpZCA9IDEwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuY29uZmlnKGFkZElucHV0VHlwZSk7XG5cbiAgZnVuY3Rpb24gYWRkSW5wdXRUeXBlKGZvcm1seUNvbmZpZ1Byb3ZpZGVyKSB7XG4gICAgZm9ybWx5Q29uZmlnUHJvdmlkZXIuc2V0VHlwZSh7XG4gICAgICBuYW1lOiBcImlucHV0XCIsXG4gICAgICB0ZW1wbGF0ZTogXCI8aW5wdXQgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCIgbmctbW9kZWw9XFxcIm1vZGVsW29wdGlvbnMua2V5XVxcXCI+XCIsXG4gICAgICB3cmFwcGVyOiBbXCJib290c3RyYXBMYWJlbFwiLCBcImJvb3RzdHJhcEhhc0Vycm9yXCJdXG4gICAgfSk7XG4gIH1cbiAgYWRkSW5wdXRUeXBlLiRpbmplY3QgPSBbXCJmb3JtbHlDb25maWdQcm92aWRlclwiXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3R5cGVzL2lucHV0LmpzXG4gKiogbW9kdWxlIGlkID0gMTFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5jb25maWcoYWRkUmFkaW9UeXBlKTtcblxuICBmdW5jdGlvbiBhZGRSYWRpb1R5cGUoZm9ybWx5Q29uZmlnUHJvdmlkZXIsIGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrKSB7XG4gICAgdmFyIGMgPSBmb3JtbHlCb290c3RyYXBBcGlDaGVjaztcbiAgICBmb3JtbHlDb25maWdQcm92aWRlci5zZXRUeXBlKHtcbiAgICAgIG5hbWU6IFwicmFkaW9cIixcbiAgICAgIHRlbXBsYXRlOiByZXF1aXJlKFwiLi9yYWRpby5odG1sXCIpLFxuICAgICAgd3JhcHBlcjogW1wiYm9vdHN0cmFwTGFiZWxcIiwgXCJib290c3RyYXBIYXNFcnJvclwiXSxcbiAgICAgIGRlZmF1bHRPcHRpb25zOiB7XG4gICAgICAgIG5vRm9ybUNvbnRyb2w6IGZhbHNlXG4gICAgICB9LFxuICAgICAgYXBpQ2hlY2s6IHtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zOiBjLnNoYXBlKHtcbiAgICAgICAgICBvcHRpb25zOiBjLmFycmF5T2YoYy5vYmplY3QpLFxuICAgICAgICAgIGxhYmVsUHJvcDogYy5zdHJpbmcub3B0aW9uYWwsXG4gICAgICAgICAgdmFsdWVQcm9wOiBjLnN0cmluZy5vcHRpb25hbFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGFwaUNoZWNrSW5zdGFuY2U6IGNcbiAgICB9KTtcbiAgfVxuICBhZGRSYWRpb1R5cGUuJGluamVjdCA9IFtcImZvcm1seUNvbmZpZ1Byb3ZpZGVyXCIsIFwiZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2tcIl07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy9yYWRpby5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuY29uZmlnKGFkZFNlbGVjdFR5cGUpO1xuXG4gIGZ1bmN0aW9uIGFkZFNlbGVjdFR5cGUoZm9ybWx5Q29uZmlnUHJvdmlkZXIsIGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrKSB7XG4gICAgdmFyIGMgPSBmb3JtbHlCb290c3RyYXBBcGlDaGVjaztcbiAgICBmb3JtbHlDb25maWdQcm92aWRlci5zZXRUeXBlKHtcbiAgICAgIG5hbWU6IFwic2VsZWN0XCIsXG4gICAgICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vc2VsZWN0Lmh0bWxcIiksXG4gICAgICB3cmFwcGVyOiBbXCJib290c3RyYXBMYWJlbFwiLCBcImJvb3RzdHJhcEhhc0Vycm9yXCJdLFxuICAgICAgYXBpQ2hlY2s6IHtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zOiBjLnNoYXBlKHtcbiAgICAgICAgICBvcHRpb25zOiBjLmFycmF5T2YoYy5vYmplY3QpLFxuICAgICAgICAgIGxhYmVsUHJvcDogYy5zdHJpbmcub3B0aW9uYWwsXG4gICAgICAgICAgdmFsdWVQcm9wOiBjLnN0cmluZy5vcHRpb25hbCxcbiAgICAgICAgICBncm91cFByb3A6IGMuc3RyaW5nLm9wdGlvbmFsXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgYXBpQ2hlY2tJbnN0YW5jZTogY1xuICAgIH0pO1xuICB9XG4gIGFkZFNlbGVjdFR5cGUuJGluamVjdCA9IFtcImZvcm1seUNvbmZpZ1Byb3ZpZGVyXCIsIFwiZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2tcIl07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy9zZWxlY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmNvbmZpZyhhZGRUZXh0YXJlYVR5cGUpO1xuXG4gIGZ1bmN0aW9uIGFkZFRleHRhcmVhVHlwZShmb3JtbHlDb25maWdQcm92aWRlciwgZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2spIHtcbiAgICB2YXIgYyA9IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrO1xuICAgIGZvcm1seUNvbmZpZ1Byb3ZpZGVyLnNldFR5cGUoe1xuICAgICAgbmFtZTogXCJ0ZXh0YXJlYVwiLFxuICAgICAgdGVtcGxhdGU6IFwiPHRleHRhcmVhIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIG5nLW1vZGVsPVxcXCJtb2RlbFtvcHRpb25zLmtleV1cXFwiPjwvdGV4dGFyZWE+XCIsXG4gICAgICB3cmFwcGVyOiBbXCJib290c3RyYXBMYWJlbFwiLCBcImJvb3RzdHJhcEhhc0Vycm9yXCJdLFxuICAgICAgZGVmYXVsdE9wdGlvbnM6IHtcbiAgICAgICAgbmdNb2RlbEF0dHJzOiB7XG4gICAgICAgICAgcm93czogeyBhdHRyaWJ1dGU6IFwicm93c1wiIH0sXG4gICAgICAgICAgY29sczogeyBhdHRyaWJ1dGU6IFwiY29sc1wiIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFwaUNoZWNrOiB7XG4gICAgICAgIHRlbXBsYXRlT3B0aW9uczogYy5zaGFwZSh7XG4gICAgICAgICAgcm93czogYy5udW1iZXIub3B0aW9uYWwsXG4gICAgICAgICAgY29sczogYy5udW1iZXIub3B0aW9uYWxcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBhcGlDaGVja0luc3RhbmNlOiBjXG4gICAgfSk7XG4gIH1cbiAgYWRkVGV4dGFyZWFUeXBlLiRpbmplY3QgPSBbXCJmb3JtbHlDb25maWdQcm92aWRlclwiLCBcImZvcm1seUJvb3RzdHJhcEFwaUNoZWNrXCJdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdHlwZXMvdGV4dGFyZWEuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLnJ1bihhZGRBZGRvbnNNYW5pcHVsYXRvcik7XG5cbiAgZnVuY3Rpb24gYWRkQWRkb25zTWFuaXB1bGF0b3IoZm9ybWx5Q29uZmlnLCBmb3JtbHlCb290c3RyYXBBcGlDaGVjaykge1xuICAgIHZhciBhZGRvblRlbXBsYXRlID0gcmVxdWlyZShcIi4vYWRkb25zLmh0bWxcIik7XG4gICAgdmFyIGFkZG9uQ2hlY2tlciA9IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLnNoYXBlKHtcbiAgICAgIFwiY2xhc3NcIjogZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsLFxuICAgICAgdGV4dDogZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsXG4gICAgfSkuc3RyaWN0Lm9wdGlvbmFsO1xuICAgIHZhciBhcGkgPSBmb3JtbHlCb290c3RyYXBBcGlDaGVjay5zaGFwZSh7XG4gICAgICB0ZW1wbGF0ZU9wdGlvbnM6IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLnNoYXBlKHtcbiAgICAgICAgYWRkb25MZWZ0OiBhZGRvbkNoZWNrZXIsXG4gICAgICAgIGFkZG9uUmlnaHQ6IGFkZG9uQ2hlY2tlclxuICAgICAgfSlcbiAgICB9KTtcbiAgICBmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlci5wdXNoKGZ1bmN0aW9uICh0ZW1wbGF0ZSwgb3B0aW9ucykge1xuICAgICAgaWYgKG9wdGlvbnMudHlwZSAhPT0gXCJpbnB1dFwiIHx8ICFvcHRpb25zLnRlbXBsYXRlT3B0aW9ucy5hZGRvbkxlZnQgJiYgIW9wdGlvbnMudGVtcGxhdGVPcHRpb25zLmFkZG9uUmlnaHQpIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgfVxuICAgICAgZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2sud2FybihbYXBpXSwgW29wdGlvbnNdKTtcbiAgICAgIHJldHVybiBhZGRvblRlbXBsYXRlLnJlcGxhY2UoXCI8Zm9ybWx5LXRyYW5zY2x1ZGU+PC9mb3JtbHktdHJhbnNjbHVkZT5cIiwgdGVtcGxhdGUpO1xuICAgIH0pO1xuICB9XG4gIGFkZEFkZG9uc01hbmlwdWxhdG9yLiRpbmplY3QgPSBbXCJmb3JtbHlDb25maWdcIiwgXCJmb3JtbHlCb290c3RyYXBBcGlDaGVja1wiXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3J1bi9hZGRvbnMuanNcbiAqKiBtb2R1bGUgaWQgPSAxNVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLnJ1bihhZGREZXNjcmlwdGlvbk1hbmlwdWxhdG9yKTtcblxuICBmdW5jdGlvbiBhZGREZXNjcmlwdGlvbk1hbmlwdWxhdG9yKGZvcm1seUNvbmZpZykge1xuICAgIGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wcmVXcmFwcGVyLnB1c2goZnVuY3Rpb24gYXJpYURlc2NyaWJlZEJ5KHRlbXBsYXRlLCBvcHRpb25zLCBzY29wZSkge1xuICAgICAgaWYgKGFuZ3VsYXIuaXNEZWZpbmVkKG9wdGlvbnMudGVtcGxhdGVPcHRpb25zLmRlc2NyaXB0aW9uKSkge1xuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xuICAgICAgICBlbC5hcHBlbmRDaGlsZChhbmd1bGFyLmVsZW1lbnQodGVtcGxhdGUpWzBdKTtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQoYW5ndWxhci5lbGVtZW50KFwiPHAgaWQ9XFxcIlwiICsgc2NvcGUuaWQgKyBcIl9kZXNjcmlwdGlvblxcXCJcIiArIFwiY2xhc3M9XFxcImhlbHAtYmxvY2tcXFwiXCIgKyBcIm5nLWlmPVxcXCJ0by5kZXNjcmlwdGlvblxcXCI+XCIgKyBcInt7dG8uZGVzY3JpcHRpb259fVwiICsgXCI8L3A+XCIpWzBdKTtcbiAgICAgICAgdmFyIG1vZGVsRWxzID0gYW5ndWxhci5lbGVtZW50KGVsLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbbmctbW9kZWxdXCIpKTtcbiAgICAgICAgaWYgKG1vZGVsRWxzKSB7XG4gICAgICAgICAgbW9kZWxFbHMuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIiwgc2NvcGUuaWQgKyBcIl9kZXNjcmlwdGlvblwiKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZWwuaW5uZXJIVE1MO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGFkZERlc2NyaXB0aW9uTWFuaXB1bGF0b3IuJGluamVjdCA9IFtcImZvcm1seUNvbmZpZ1wiXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3J1bi9kZXNjcmlwdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdj5cXG4gIDxsYWJlbCBmb3I9XFxcInt7aWR9fVxcXCIgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWxcXFwiPlxcbiAgICB7e3RvLmxhYmVsfX1cXG4gICAge3t0by5yZXF1aXJlZCA/ICcqJyA6ICcnfX1cXG4gIDwvbGFiZWw+XFxuICA8Zm9ybWx5LXRyYW5zY2x1ZGU+PC9mb3JtbHktdHJhbnNjbHVkZT5cXG48L2Rpdj5cXG5cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93cmFwcGVycy9sYWJlbC5odG1sXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBuZy1jbGFzcz1cXFwieydoYXMtZXJyb3InOiBzaG93RXJyb3J9XFxcIj5cXG4gIDxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPlxcbjwvZGl2PlxcblwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3dyYXBwZXJzL2hhcy1lcnJvci5odG1sXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJjaGVja2JveFxcXCI+XFxuXFx0PGxhYmVsPlxcblxcdFxcdDxpbnB1dCB0eXBlPVxcXCJjaGVja2JveFxcXCJcXG4gICAgICAgICAgIGNsYXNzPVxcXCJmb3JtbHktZmllbGQtY2hlY2tib3hcXFwiXFxuXFx0XFx0ICAgICAgIG5nLW1vZGVsPVxcXCJtb2RlbFtvcHRpb25zLmtleV1cXFwiPlxcblxcdFxcdHt7dG8ubGFiZWx9fVxcblxcdFxcdHt7dG8ucmVxdWlyZWQgPyAnKicgOiAnJ319XFxuXFx0PC9sYWJlbD5cXG48L2Rpdj5cXG5cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy9jaGVja2JveC5odG1sXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJyYWRpby1ncm91cFxcXCI+XFxuICA8ZGl2IG5nLXJlcGVhdD1cXFwiKGtleSwgb3B0aW9uKSBpbiB0by5vcHRpb25zXFxcIiBjbGFzcz1cXFwiY2hlY2tib3hcXFwiPlxcbiAgICA8bGFiZWw+XFxuICAgICAgPGlucHV0IHR5cGU9XFxcImNoZWNrYm94XFxcIlxcbiAgICAgICAgICAgICBpZD1cXFwie3tpZCArICdfJysgJGluZGV4fX1cXFwiXFxuICAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJtdWx0aUNoZWNrYm94LmNoZWNrZWRbJGluZGV4XVxcXCJcXG4gICAgICAgICAgICAgbmctY2hhbmdlPVxcXCJtdWx0aUNoZWNrYm94LmNoYW5nZSgpXFxcIj5cXG4gICAgICB7e29wdGlvblt0by5sYWJlbFByb3AgfHwgJ25hbWUnXX19XFxuICAgIDwvbGFiZWw+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy9tdWx0aUNoZWNrYm94Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcInJhZGlvLWdyb3VwXFxcIj5cXG4gIDxkaXYgbmctcmVwZWF0PVxcXCIoa2V5LCBvcHRpb24pIGluIHRvLm9wdGlvbnNcXFwiIGNsYXNzPVxcXCJyYWRpb1xcXCI+XFxuICAgIDxsYWJlbD5cXG4gICAgICA8aW5wdXQgdHlwZT1cXFwicmFkaW9cXFwiXFxuICAgICAgICAgICAgIGlkPVxcXCJ7e2lkICsgJ18nKyAkaW5kZXh9fVxcXCJcXG4gICAgICAgICAgICAgdGFiaW5kZXg9XFxcIjBcXFwiXFxuICAgICAgICAgICAgIG5nLXZhbHVlPVxcXCJvcHRpb25bdG8udmFsdWVQcm9wIHx8ICd2YWx1ZSddXFxcIlxcbiAgICAgICAgICAgICBuZy1tb2RlbD1cXFwibW9kZWxbb3B0aW9ucy5rZXldXFxcIj5cXG4gICAgICB7e29wdGlvblt0by5sYWJlbFByb3AgfHwgJ25hbWUnXX19XFxuICAgIDwvbGFiZWw+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy9yYWRpby5odG1sXG4gKiogbW9kdWxlIGlkID0gMjFcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8c2VsZWN0IGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiXFxuICAgICAgICBuZy1tb2RlbD1cXFwibW9kZWxbb3B0aW9ucy5rZXldXFxcIlxcbiAgICAgICAgbmctb3B0aW9ucz1cXFwib3B0aW9uW3RvLnZhbHVlUHJvcCB8fCAndmFsdWUnXSBhcyBvcHRpb25bdG8ubGFiZWxQcm9wIHx8ICduYW1lJ10gZ3JvdXAgYnkgb3B0aW9uW3RvLmdyb3VwUHJvcCB8fCAnZ3JvdXAnXSBmb3Igb3B0aW9uIGluIHRvLm9wdGlvbnNcXFwiPlxcbjwvc2VsZWN0PlxcblwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3R5cGVzL3NlbGVjdC5odG1sXG4gKiogbW9kdWxlIGlkID0gMjJcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IG5nLWNsYXNzPVxcXCJ7J2lucHV0LWdyb3VwJzogdG8uYWRkb25MZWZ0IHx8IHRvLmFkZG9uUmlnaHR9XFxcIj5cXG4gICAgPGRpdiBjbGFzcz1cXFwiaW5wdXQtZ3JvdXAtYWRkb25cXFwiIG5nLWlmPVxcXCJ0by5hZGRvbkxlZnRcXFwiPlxcbiAgICAgICAgPGkgY2xhc3M9XFxcInt7dG8uYWRkb25MZWZ0LmNsYXNzfX1cXFwiIG5nLWlmPVxcXCJ0by5hZGRvbkxlZnQuY2xhc3NcXFwiPjwvaT5cXG4gICAgICAgIDxzcGFuIG5nLWlmPVxcXCJ0by5hZGRvbkxlZnQudGV4dFxcXCI+e3t0by5hZGRvbkxlZnQudGV4dH19PC9zcGFuPlxcbiAgICA8L2Rpdj5cXG4gICAgPGZvcm1seS10cmFuc2NsdWRlPjwvZm9ybWx5LXRyYW5zY2x1ZGU+XFxuICAgIDxkaXYgY2xhc3M9XFxcImlucHV0LWdyb3VwLWFkZG9uXFxcIiBuZy1pZj1cXFwidG8uYWRkb25SaWdodFxcXCI+XFxuICAgICAgICA8aSBjbGFzcz1cXFwie3t0by5hZGRvblJpZ2h0LmNsYXNzfX1cXFwiIG5nLWlmPVxcXCJ0by5hZGRvblJpZ2h0LmNsYXNzXFxcIj48L2k+XFxuICAgICAgICA8c3BhbiBuZy1pZj1cXFwidG8uYWRkb25SaWdodC50ZXh0XFxcIj57e3RvLmFkZG9uUmlnaHQudGV4dH19PC9zcGFuPlxcbiAgICA8L2Rpdj5cXG48L2Rpdj5cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9ydW4vYWRkb25zLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAyM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIl0sInNvdXJjZVJvb3QiOiIifQ==