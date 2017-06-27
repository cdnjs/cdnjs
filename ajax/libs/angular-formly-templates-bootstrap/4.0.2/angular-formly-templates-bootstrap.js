// angular-formly-templates-bootstrap version 4.0.2 built with ♥ by Astrism <astrisms@gmail.com>, Kent C. Dodds <kent@doddsfamily.us> (ó ì_í)=óò=(ì_í ò)

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
	ngModule.constant("formlyBootstrapVersion", ("4.0.2"));
	
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

	"use strict";
	
	// some versions of angular don't export the angular module properly,
	// so we get it from window in this case.
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
	    formlyConfig.templateManipulators.preWrapper.push(function (template, options) {
	      if (options.type !== "input" || !options.templateOptions.addonLeft && !options.templateOptions.addonRight) {
	        return template;
	      }
	      formlyBootstrapApiCheck.warn(formlyBootstrapApiCheck.shape({
	        templateOptions: formlyBootstrapApiCheck.shape({
	          addonLeft: addonChecker,
	          addonRight: addonChecker
	        })
	      }), { length: 1, 0: options });
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
	      if (angular.isDefined(options.templateOptions.description) && options.type !== "radio" && options.type !== "checkbox") {
	        var el = document.createElement("div");
	        el.appendChild(angular.element(template)[0]);
	        var modelEls = angular.element(el.querySelectorAll("[ng-model]"));
	        if (modelEls) {
	          el.appendChild(angular.element("<p id=\"" + scope.id + "_description\"" + "class=\"help-block\"" + "ng-if=\"to.description\">" + "{{to.description}}" + "</p>")[0]);
	          modelEls.attr("aria-describedby", scope.id + "_description");
	          return el.innerHTML;
	        } else {
	          return template;
	        }
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

	module.exports = "<div class=\"radio-group\">\n  <div ng-repeat=\"(key, option) in to.options\" class=\"radio\">\n    <label>\n      <input type=\"radio\"\n             id=\"{{id + '_'+ $index}}\"\n             ng-value=\"option[to.valueProp || 'value']\"\n             ng-model=\"model[options.key]\">\n      {{option[to.labelProp || 'name']}}\n    </label>\n  </div>\n</div>\n"

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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlYzQzMGRkYTNlOTRlOGNkZTM2MiIsIndlYnBhY2s6Ly8vLi9pbmRleC5qcyIsIndlYnBhY2s6Ly8vLi9pbmRleC5jb21tb24uanMiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcIm5nRm9ybWx5XCIsXCJhbWRcIjpcImFuZ3VsYXItZm9ybWx5XCIsXCJjb21tb25qczJcIjpcImFuZ3VsYXItZm9ybWx5XCIsXCJjb21tb25qc1wiOlwiYW5ndWxhci1mb3JtbHlcIn0iLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIHtcInJvb3RcIjpcImFwaUNoZWNrXCIsXCJhbWRcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanMyXCI6XCJhcGktY2hlY2tcIixcImNvbW1vbmpzXCI6XCJhcGktY2hlY2tcIn0iLCJ3ZWJwYWNrOi8vLy4vYW5ndWxhci1maXgvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vd3JhcHBlcnMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vdHlwZXMvaW5kZXguanMiLCJ3ZWJwYWNrOi8vLy4vcnVuL2luZGV4LmpzIiwid2VicGFjazovLy9leHRlcm5hbCBcImFuZ3VsYXJcIiIsIndlYnBhY2s6Ly8vLi90eXBlcy9jaGVja2JveC5qcyIsIndlYnBhY2s6Ly8vLi90eXBlcy9tdWx0aUNoZWNrYm94LmpzIiwid2VicGFjazovLy8uL3R5cGVzL2lucHV0LmpzIiwid2VicGFjazovLy8uL3R5cGVzL3JhZGlvLmpzIiwid2VicGFjazovLy8uL3R5cGVzL3NlbGVjdC5qcyIsIndlYnBhY2s6Ly8vLi90eXBlcy90ZXh0YXJlYS5qcyIsIndlYnBhY2s6Ly8vLi9ydW4vYWRkb25zLmpzIiwid2VicGFjazovLy8uL3J1bi9kZXNjcmlwdGlvbi5qcyIsIndlYnBhY2s6Ly8vLi93cmFwcGVycy9sYWJlbC5odG1sIiwid2VicGFjazovLy8uL3dyYXBwZXJzL2hhcy1lcnJvci5odG1sIiwid2VicGFjazovLy8uL3R5cGVzL2NoZWNrYm94Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdHlwZXMvbXVsdGlDaGVja2JveC5odG1sIiwid2VicGFjazovLy8uL3R5cGVzL3JhZGlvLmh0bWwiLCJ3ZWJwYWNrOi8vLy4vdHlwZXMvc2VsZWN0Lmh0bWwiLCJ3ZWJwYWNrOi8vLy4vcnVuL2FkZG9ucy5odG1sIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBLHdDOzs7Ozs7O0FDdENBOztBQUVBLHlDOzs7Ozs7QUNGQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEVBQUM7QUFDRDs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEsK0I7Ozs7OztBQ2hCQSxnRDs7Ozs7O0FDQUEsZ0Q7Ozs7OztBQ0FBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLDBCOzs7Ozs7QUNSQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQSxNQUFLLEdBQUcsK0RBQW1FO0FBQzNFO0FBQ0E7QUFDQSxHOzs7Ozs7QUNwQkE7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxHOzs7Ozs7QUNUQTs7QUFFQSx1Q0FBc0MscURBQXFEOztBQUUzRjs7QUFFQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLEc7Ozs7OztBQ2pCQSxnRDs7Ozs7O0FDQUE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFTO0FBQ1QsUUFBTztBQUNQO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxHOzs7Ozs7QUNwQkE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsVUFBUztBQUNULFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFlBQVc7QUFDWDtBQUNBLFFBQU87QUFDUCxNQUFLO0FBQ0w7QUFDQTtBQUNBLEc7Ozs7OztBQ3ZDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEc7Ozs7OztBQ2JBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEc7Ozs7OztBQ3RCQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEc7Ozs7OztBQ3ZCQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxrQkFBaUIsb0JBQW9CO0FBQ3JDLGtCQUFpQjtBQUNqQjtBQUNBLFFBQU87QUFDUDtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPO0FBQ1A7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEc7Ozs7OztBQzNCQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVM7QUFDVCxRQUFPLElBQUksd0JBQXdCO0FBQ25DO0FBQ0EsTUFBSztBQUNMO0FBQ0E7QUFDQSxHOzs7Ozs7QUN6QkE7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLCtJQUE4SSxnQkFBZ0I7QUFDOUo7QUFDQTtBQUNBLFVBQVM7QUFDVDtBQUNBO0FBQ0EsUUFBTztBQUNQO0FBQ0E7QUFDQSxNQUFLO0FBQ0w7QUFDQTtBQUNBLEc7Ozs7OztBQ3hCQSwyQ0FBMEMsSUFBSSxtQ0FBbUMsVUFBVSxRQUFRLHdCQUF3QixrRTs7Ozs7O0FDQTNILHlEQUF3RCx1QkFBdUIseUQ7Ozs7OztBQ0EvRSxxTEFBb0wsVUFBVSxRQUFRLHdCQUF3Qix1Qjs7Ozs7O0FDQTlOLHVMQUFzTCxrQkFBa0IseUhBQXlILGdDQUFnQyxtQzs7Ozs7O0FDQWpXLGlMQUFnTCxrQkFBa0Isc0hBQXNILGdDQUFnQyxtQzs7Ozs7O0FDQXhWLHFROzs7Ozs7QUNBQSxvQ0FBbUMsNkNBQTZDLHdGQUF3RixvQkFBb0Isa0ZBQWtGLG1CQUFtQixzSkFBc0oscUJBQXFCLG9GQUFvRixvQkFBb0IsNEIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJhbmd1bGFyLWZvcm1seVwiKSwgcmVxdWlyZShcImFwaS1jaGVja1wiKSwgcmVxdWlyZShcImFuZ3VsYXJcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoW1wiYW5ndWxhci1mb3JtbHlcIiwgXCJhcGktY2hlY2tcIiwgXCJhbmd1bGFyXCJdLCBmYWN0b3J5KTtcblx0ZWxzZSBpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcpXG5cdFx0ZXhwb3J0c1tcIm5nRm9ybWx5VGVtcGxhdGVzQm9vdHN0cmFwXCJdID0gZmFjdG9yeShyZXF1aXJlKFwiYW5ndWxhci1mb3JtbHlcIiksIHJlcXVpcmUoXCJhcGktY2hlY2tcIiksIHJlcXVpcmUoXCJhbmd1bGFyXCIpKTtcblx0ZWxzZVxuXHRcdHJvb3RbXCJuZ0Zvcm1seVRlbXBsYXRlc0Jvb3RzdHJhcFwiXSA9IGZhY3Rvcnkocm9vdFtcIm5nRm9ybWx5XCJdLCByb290W1wiYXBpQ2hlY2tcIl0sIHJvb3RbXCJhbmd1bGFyXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMl9fLCBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzNfXywgX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV84X18pIHtcbnJldHVybiBcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL3VuaXZlcnNhbE1vZHVsZURlZmluaXRpb25cbiAqKi8iLCIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSlcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcblxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0ZXhwb3J0czoge30sXG4gXHRcdFx0aWQ6IG1vZHVsZUlkLFxuIFx0XHRcdGxvYWRlZDogZmFsc2VcbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubG9hZGVkID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXygwKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCBlYzQzMGRkYTNlOTRlOGNkZTM2MlxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCIuL2luZGV4LmNvbW1vblwiKTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSAwXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxudmFyIG5nTW9kdWxlTmFtZSA9IFwiZm9ybWx5Qm9vdHN0cmFwXCI7XG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCIuL2FuZ3VsYXItZml4XCIpO1xudmFyIG5nTW9kdWxlID0gYW5ndWxhci5tb2R1bGUobmdNb2R1bGVOYW1lLCBbcmVxdWlyZShcImFuZ3VsYXItZm9ybWx5XCIpXSk7XG5uZ01vZHVsZS5jb25zdGFudChcImZvcm1seUJvb3RzdHJhcEFwaUNoZWNrXCIsIHJlcXVpcmUoXCJhcGktY2hlY2tcIikoe1xuICBvdXRwdXQ6IHtcbiAgICBwcmVmaXg6IFwiYW5ndWxhci1mb3JtbHktYm9vdHN0cmFwXCJcbiAgfVxufSkpO1xubmdNb2R1bGUuY29uc3RhbnQoXCJmb3JtbHlCb290c3RyYXBWZXJzaW9uXCIsIFZFUlNJT04pO1xuXG5yZXF1aXJlKFwiLi93cmFwcGVyc1wiKShuZ01vZHVsZSk7XG5yZXF1aXJlKFwiLi90eXBlc1wiKShuZ01vZHVsZSk7XG5yZXF1aXJlKFwiLi9ydW5cIikobmdNb2R1bGUpO1xuXG5tb2R1bGUuZXhwb3J0cyA9IG5nTW9kdWxlTmFtZTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vaW5kZXguY29tbW9uLmpzXG4gKiogbW9kdWxlIGlkID0gMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzJfXztcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIGV4dGVybmFsIHtcInJvb3RcIjpcIm5nRm9ybWx5XCIsXCJhbWRcIjpcImFuZ3VsYXItZm9ybWx5XCIsXCJjb21tb25qczJcIjpcImFuZ3VsYXItZm9ybWx5XCIsXCJjb21tb25qc1wiOlwiYW5ndWxhci1mb3JtbHlcIn1cbiAqKiBtb2R1bGUgaWQgPSAyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfM19fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwiYXBpQ2hlY2tcIixcImFtZFwiOlwiYXBpLWNoZWNrXCIsXCJjb21tb25qczJcIjpcImFwaS1jaGVja1wiLFwiY29tbW9uanNcIjpcImFwaS1jaGVja1wifVxuICoqIG1vZHVsZSBpZCA9IDNcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG4vLyBzb21lIHZlcnNpb25zIG9mIGFuZ3VsYXIgZG9uJ3QgZXhwb3J0IHRoZSBhbmd1bGFyIG1vZHVsZSBwcm9wZXJseSxcbi8vIHNvIHdlIGdldCBpdCBmcm9tIHdpbmRvdyBpbiB0aGlzIGNhc2UuXG52YXIgYW5ndWxhciA9IHJlcXVpcmUoXCJhbmd1bGFyXCIpO1xuaWYgKCFhbmd1bGFyLnZlcnNpb24pIHtcbiAgYW5ndWxhciA9IHdpbmRvdy5hbmd1bGFyO1xufVxubW9kdWxlLmV4cG9ydHMgPSBhbmd1bGFyO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9hbmd1bGFyLWZpeC9pbmRleC5qc1xuICoqIG1vZHVsZSBpZCA9IDRcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5jb25maWcoYWRkV3JhcHBlcnMpO1xuXG4gIGZ1bmN0aW9uIGFkZFdyYXBwZXJzKGZvcm1seUNvbmZpZ1Byb3ZpZGVyLCBmb3JtbHlCb290c3RyYXBBcGlDaGVjaykge1xuICAgIHZhciBjID0gZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2s7XG4gICAgZm9ybWx5Q29uZmlnUHJvdmlkZXIuc2V0V3JhcHBlcihbe1xuICAgICAgbmFtZTogXCJib290c3RyYXBMYWJlbFwiLFxuICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL2xhYmVsLmh0bWxcIiksXG4gICAgICBhcGlDaGVjazoge1xuICAgICAgICB0ZW1wbGF0ZU9wdGlvbnM6IGMuc2hhcGUoe1xuICAgICAgICAgIGxhYmVsOiBjLnN0cmluZyxcbiAgICAgICAgICByZXF1aXJlZDogYy5ib29sLm9wdGlvbmFsXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgYXBpQ2hlY2tJbnN0YW5jZTogY1xuICAgIH0sIHsgbmFtZTogXCJib290c3RyYXBIYXNFcnJvclwiLCB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vaGFzLWVycm9yLmh0bWxcIikgfV0pO1xuICB9XG4gIGFkZFdyYXBwZXJzLiRpbmplY3QgPSBbXCJmb3JtbHlDb25maWdQcm92aWRlclwiLCBcImZvcm1seUJvb3RzdHJhcEFwaUNoZWNrXCJdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vd3JhcHBlcnMvaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA1XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgcmVxdWlyZShcIi4vY2hlY2tib3hcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9tdWx0aUNoZWNrYm94XCIpKG5nTW9kdWxlKTtcbiAgcmVxdWlyZShcIi4vaW5wdXRcIikobmdNb2R1bGUpO1xuICByZXF1aXJlKFwiLi9yYWRpb1wiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL3NlbGVjdFwiKShuZ01vZHVsZSk7XG4gIHJlcXVpcmUoXCIuL3RleHRhcmVhXCIpKG5nTW9kdWxlKTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3R5cGVzL2luZGV4LmpzXG4gKiogbW9kdWxlIGlkID0gNlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbnZhciBfaW50ZXJvcFJlcXVpcmUgPSBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBvYmogJiYgb2JqLl9fZXNNb2R1bGUgPyBvYmpbXCJkZWZhdWx0XCJdIDogb2JqOyB9O1xuXG52YXIgYWRkb25zID0gX2ludGVyb3BSZXF1aXJlKHJlcXVpcmUoXCIuL2FkZG9uc1wiKSk7XG5cbnZhciBkZXNjcmlwdGlvbiA9IF9pbnRlcm9wUmVxdWlyZShyZXF1aXJlKFwiLi9kZXNjcmlwdGlvblwiKSk7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIGFkZG9ucyhuZ01vZHVsZSk7XG4gIGRlc2NyaXB0aW9uKG5nTW9kdWxlKTtcbn07XG5cbi8vZXhwb3J0IGRlZmF1bHQgbmdNb2R1bGUgPT4ge1xuLy8gIHJlcXVpcmUoJy4vYWRkb25zJykobmdNb2R1bGUpO1xuLy8gIHJlcXVpcmUoJy4vZGVzY3JpcHRpb24nKShuZ01vZHVsZSk7XG4vL307XG4vL1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9ydW4vaW5kZXguanNcbiAqKiBtb2R1bGUgaWQgPSA3XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfOF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwgXCJhbmd1bGFyXCJcbiAqKiBtb2R1bGUgaWQgPSA4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuY29uZmlnKGFkZENoZWNrYm94VHlwZSk7XG5cbiAgZnVuY3Rpb24gYWRkQ2hlY2tib3hUeXBlKGZvcm1seUNvbmZpZ1Byb3ZpZGVyLCBmb3JtbHlCb290c3RyYXBBcGlDaGVjaykge1xuICAgIHZhciBjID0gZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2s7XG4gICAgZm9ybWx5Q29uZmlnUHJvdmlkZXIuc2V0VHlwZSh7XG4gICAgICBuYW1lOiBcImNoZWNrYm94XCIsXG4gICAgICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vY2hlY2tib3guaHRtbFwiKSxcbiAgICAgIHdyYXBwZXI6IFtcImJvb3RzdHJhcEhhc0Vycm9yXCJdLFxuICAgICAgYXBpQ2hlY2s6IHtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zOiBjLnNoYXBlKHtcbiAgICAgICAgICBsYWJlbDogYy5zdHJpbmdcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBhcGlDaGVja0luc3RhbmNlOiBjXG4gICAgfSk7XG4gIH1cbiAgYWRkQ2hlY2tib3hUeXBlLiRpbmplY3QgPSBbXCJmb3JtbHlDb25maWdQcm92aWRlclwiLCBcImZvcm1seUJvb3RzdHJhcEFwaUNoZWNrXCJdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdHlwZXMvY2hlY2tib3guanNcbiAqKiBtb2R1bGUgaWQgPSA5XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuY29uZmlnKGFkZENoZWNrYm94VHlwZSk7XG5cbiAgZnVuY3Rpb24gYWRkQ2hlY2tib3hUeXBlKGZvcm1seUNvbmZpZ1Byb3ZpZGVyLCBmb3JtbHlCb290c3RyYXBBcGlDaGVjaykge1xuICAgIHZhciBjID0gZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2s7XG4gICAgZm9ybWx5Q29uZmlnUHJvdmlkZXIuc2V0VHlwZSh7XG4gICAgICBuYW1lOiBcIm11bHRpQ2hlY2tib3hcIixcbiAgICAgIHRlbXBsYXRlOiByZXF1aXJlKFwiLi9tdWx0aUNoZWNrYm94Lmh0bWxcIiksXG4gICAgICB3cmFwcGVyOiBbXCJib290c3RyYXBMYWJlbFwiLCBcImJvb3RzdHJhcEhhc0Vycm9yXCJdLFxuICAgICAgYXBpQ2hlY2s6IHtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zOiBjLnNoYXBlKHtcbiAgICAgICAgICBvcHRpb25zOiBjLmFycmF5T2YoYy5vYmplY3QpLFxuICAgICAgICAgIGxhYmVsUHJvcDogYy5zdHJpbmcub3B0aW9uYWwsXG4gICAgICAgICAgdmFsdWVQcm9wOiBjLnN0cmluZy5vcHRpb25hbFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGFwaUNoZWNrSW5zdGFuY2U6IGMsXG4gICAgICBjb250cm9sbGVyOiAvKiBAbmdJbmplY3QgKi9bXCIkc2NvcGVcIiwgZnVuY3Rpb24gY29udHJvbGxlcigkc2NvcGUpIHtcbiAgICAgICAgdmFyIHRvID0gJHNjb3BlLnRvO1xuICAgICAgICB2YXIgb3B0cyA9ICRzY29wZS5vcHRpb25zO1xuICAgICAgICAkc2NvcGUubXVsdGlDaGVja2JveCA9IHtcbiAgICAgICAgICBjaGVja2VkOiBbXSxcbiAgICAgICAgICBjaGFuZ2U6IHNldE1vZGVsXG4gICAgICAgIH07XG5cbiAgICAgICAgZnVuY3Rpb24gc2V0TW9kZWwoKSB7XG4gICAgICAgICAgJHNjb3BlLm1vZGVsW29wdHMua2V5XSA9IFtdO1xuICAgICAgICAgIGFuZ3VsYXIuZm9yRWFjaCgkc2NvcGUubXVsdGlDaGVja2JveC5jaGVja2VkLCBmdW5jdGlvbiAoY2hlY2tib3gsIGluZGV4KSB7XG4gICAgICAgICAgICBpZiAoY2hlY2tib3gpIHtcbiAgICAgICAgICAgICAgJHNjb3BlLm1vZGVsW29wdHMua2V5XS5wdXNoKHRvLm9wdGlvbnNbaW5kZXhdW3RvLnZhbHVlUHJvcCB8fCBcInZhbHVlXCJdKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfV1cbiAgICB9KTtcbiAgfVxuICBhZGRDaGVja2JveFR5cGUuJGluamVjdCA9IFtcImZvcm1seUNvbmZpZ1Byb3ZpZGVyXCIsIFwiZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2tcIl07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy9tdWx0aUNoZWNrYm94LmpzXG4gKiogbW9kdWxlIGlkID0gMTBcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5jb25maWcoYWRkSW5wdXRUeXBlKTtcblxuICBmdW5jdGlvbiBhZGRJbnB1dFR5cGUoZm9ybWx5Q29uZmlnUHJvdmlkZXIpIHtcbiAgICBmb3JtbHlDb25maWdQcm92aWRlci5zZXRUeXBlKHtcbiAgICAgIG5hbWU6IFwiaW5wdXRcIixcbiAgICAgIHRlbXBsYXRlOiBcIjxpbnB1dCBjbGFzcz1cXFwiZm9ybS1jb250cm9sXFxcIiBuZy1tb2RlbD1cXFwibW9kZWxbb3B0aW9ucy5rZXldXFxcIj5cIixcbiAgICAgIHdyYXBwZXI6IFtcImJvb3RzdHJhcExhYmVsXCIsIFwiYm9vdHN0cmFwSGFzRXJyb3JcIl1cbiAgICB9KTtcbiAgfVxuICBhZGRJbnB1dFR5cGUuJGluamVjdCA9IFtcImZvcm1seUNvbmZpZ1Byb3ZpZGVyXCJdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdHlwZXMvaW5wdXQuanNcbiAqKiBtb2R1bGUgaWQgPSAxMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmNvbmZpZyhhZGRSYWRpb1R5cGUpO1xuXG4gIGZ1bmN0aW9uIGFkZFJhZGlvVHlwZShmb3JtbHlDb25maWdQcm92aWRlciwgZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2spIHtcbiAgICB2YXIgYyA9IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrO1xuICAgIGZvcm1seUNvbmZpZ1Byb3ZpZGVyLnNldFR5cGUoe1xuICAgICAgbmFtZTogXCJyYWRpb1wiLFxuICAgICAgdGVtcGxhdGU6IHJlcXVpcmUoXCIuL3JhZGlvLmh0bWxcIiksXG4gICAgICB3cmFwcGVyOiBbXCJib290c3RyYXBMYWJlbFwiLCBcImJvb3RzdHJhcEhhc0Vycm9yXCJdLFxuICAgICAgYXBpQ2hlY2s6IHtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zOiBjLnNoYXBlKHtcbiAgICAgICAgICBvcHRpb25zOiBjLmFycmF5T2YoYy5vYmplY3QpLFxuICAgICAgICAgIGxhYmVsUHJvcDogYy5zdHJpbmcub3B0aW9uYWwsXG4gICAgICAgICAgdmFsdWVQcm9wOiBjLnN0cmluZy5vcHRpb25hbFxuICAgICAgICB9KVxuICAgICAgfSxcbiAgICAgIGFwaUNoZWNrSW5zdGFuY2U6IGNcbiAgICB9KTtcbiAgfVxuICBhZGRSYWRpb1R5cGUuJGluamVjdCA9IFtcImZvcm1seUNvbmZpZ1Byb3ZpZGVyXCIsIFwiZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2tcIl07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy9yYWRpby5qc1xuICoqIG1vZHVsZSBpZCA9IDEyXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJcInVzZSBzdHJpY3RcIjtcblxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbiAobmdNb2R1bGUpIHtcbiAgbmdNb2R1bGUuY29uZmlnKGFkZFNlbGVjdFR5cGUpO1xuXG4gIGZ1bmN0aW9uIGFkZFNlbGVjdFR5cGUoZm9ybWx5Q29uZmlnUHJvdmlkZXIsIGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrKSB7XG4gICAgdmFyIGMgPSBmb3JtbHlCb290c3RyYXBBcGlDaGVjaztcbiAgICBmb3JtbHlDb25maWdQcm92aWRlci5zZXRUeXBlKHtcbiAgICAgIG5hbWU6IFwic2VsZWN0XCIsXG4gICAgICB0ZW1wbGF0ZTogcmVxdWlyZShcIi4vc2VsZWN0Lmh0bWxcIiksXG4gICAgICB3cmFwcGVyOiBbXCJib290c3RyYXBMYWJlbFwiLCBcImJvb3RzdHJhcEhhc0Vycm9yXCJdLFxuICAgICAgYXBpQ2hlY2s6IHtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zOiBjLnNoYXBlKHtcbiAgICAgICAgICBvcHRpb25zOiBjLmFycmF5T2YoYy5vYmplY3QpLFxuICAgICAgICAgIGxhYmVsUHJvcDogYy5zdHJpbmcub3B0aW9uYWwsXG4gICAgICAgICAgdmFsdWVQcm9wOiBjLnN0cmluZy5vcHRpb25hbCxcbiAgICAgICAgICBncm91cFByb3A6IGMuc3RyaW5nLm9wdGlvbmFsXG4gICAgICAgIH0pXG4gICAgICB9LFxuICAgICAgYXBpQ2hlY2tJbnN0YW5jZTogY1xuICAgIH0pO1xuICB9XG4gIGFkZFNlbGVjdFR5cGUuJGluamVjdCA9IFtcImZvcm1seUNvbmZpZ1Byb3ZpZGVyXCIsIFwiZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2tcIl07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy9zZWxlY3QuanNcbiAqKiBtb2R1bGUgaWQgPSAxM1xuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLmNvbmZpZyhhZGRUZXh0YXJlYVR5cGUpO1xuXG4gIGZ1bmN0aW9uIGFkZFRleHRhcmVhVHlwZShmb3JtbHlDb25maWdQcm92aWRlciwgZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2spIHtcbiAgICB2YXIgYyA9IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrO1xuICAgIGZvcm1seUNvbmZpZ1Byb3ZpZGVyLnNldFR5cGUoe1xuICAgICAgbmFtZTogXCJ0ZXh0YXJlYVwiLFxuICAgICAgdGVtcGxhdGU6IFwiPHRleHRhcmVhIGNsYXNzPVxcXCJmb3JtLWNvbnRyb2xcXFwiIG5nLW1vZGVsPVxcXCJtb2RlbFtvcHRpb25zLmtleV1cXFwiPjwvdGV4dGFyZWE+XCIsXG4gICAgICB3cmFwcGVyOiBbXCJib290c3RyYXBMYWJlbFwiLCBcImJvb3RzdHJhcEhhc0Vycm9yXCJdLFxuICAgICAgZGVmYXVsdE9wdGlvbnM6IHtcbiAgICAgICAgbmdNb2RlbEF0dHJzOiB7XG4gICAgICAgICAgcm93czogeyBhdHRyaWJ1dGU6IFwicm93c1wiIH0sXG4gICAgICAgICAgY29sczogeyBhdHRyaWJ1dGU6IFwiY29sc1wiIH1cbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIGFwaUNoZWNrOiB7XG4gICAgICAgIHRlbXBsYXRlT3B0aW9uczogYy5zaGFwZSh7XG4gICAgICAgICAgcm93czogYy5udW1iZXIub3B0aW9uYWwsXG4gICAgICAgICAgY29sczogYy5udW1iZXIub3B0aW9uYWxcbiAgICAgICAgfSlcbiAgICAgIH0sXG4gICAgICBhcGlDaGVja0luc3RhbmNlOiBjXG4gICAgfSk7XG4gIH1cbiAgYWRkVGV4dGFyZWFUeXBlLiRpbmplY3QgPSBbXCJmb3JtbHlDb25maWdQcm92aWRlclwiLCBcImZvcm1seUJvb3RzdHJhcEFwaUNoZWNrXCJdO1xufTtcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdHlwZXMvdGV4dGFyZWEuanNcbiAqKiBtb2R1bGUgaWQgPSAxNFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwiXCJ1c2Ugc3RyaWN0XCI7XG5cbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24gKG5nTW9kdWxlKSB7XG4gIG5nTW9kdWxlLnJ1bihhZGRBZGRvbnNNYW5pcHVsYXRvcik7XG5cbiAgZnVuY3Rpb24gYWRkQWRkb25zTWFuaXB1bGF0b3IoZm9ybWx5Q29uZmlnLCBmb3JtbHlCb290c3RyYXBBcGlDaGVjaykge1xuICAgIHZhciBhZGRvblRlbXBsYXRlID0gcmVxdWlyZShcIi4vYWRkb25zLmh0bWxcIik7XG4gICAgdmFyIGFkZG9uQ2hlY2tlciA9IGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLnNoYXBlKHtcbiAgICAgIFwiY2xhc3NcIjogZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsLFxuICAgICAgdGV4dDogZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2suc3RyaW5nLm9wdGlvbmFsXG4gICAgfSkuc3RyaWN0Lm9wdGlvbmFsO1xuICAgIGZvcm1seUNvbmZpZy50ZW1wbGF0ZU1hbmlwdWxhdG9ycy5wcmVXcmFwcGVyLnB1c2goZnVuY3Rpb24gKHRlbXBsYXRlLCBvcHRpb25zKSB7XG4gICAgICBpZiAob3B0aW9ucy50eXBlICE9PSBcImlucHV0XCIgfHwgIW9wdGlvbnMudGVtcGxhdGVPcHRpb25zLmFkZG9uTGVmdCAmJiAhb3B0aW9ucy50ZW1wbGF0ZU9wdGlvbnMuYWRkb25SaWdodCkge1xuICAgICAgICByZXR1cm4gdGVtcGxhdGU7XG4gICAgICB9XG4gICAgICBmb3JtbHlCb290c3RyYXBBcGlDaGVjay53YXJuKGZvcm1seUJvb3RzdHJhcEFwaUNoZWNrLnNoYXBlKHtcbiAgICAgICAgdGVtcGxhdGVPcHRpb25zOiBmb3JtbHlCb290c3RyYXBBcGlDaGVjay5zaGFwZSh7XG4gICAgICAgICAgYWRkb25MZWZ0OiBhZGRvbkNoZWNrZXIsXG4gICAgICAgICAgYWRkb25SaWdodDogYWRkb25DaGVja2VyXG4gICAgICAgIH0pXG4gICAgICB9KSwgeyBsZW5ndGg6IDEsIDA6IG9wdGlvbnMgfSk7XG4gICAgICByZXR1cm4gYWRkb25UZW1wbGF0ZS5yZXBsYWNlKFwiPGZvcm1seS10cmFuc2NsdWRlPjwvZm9ybWx5LXRyYW5zY2x1ZGU+XCIsIHRlbXBsYXRlKTtcbiAgICB9KTtcbiAgfVxuICBhZGRBZGRvbnNNYW5pcHVsYXRvci4kaW5qZWN0ID0gW1wiZm9ybWx5Q29uZmlnXCIsIFwiZm9ybWx5Qm9vdHN0cmFwQXBpQ2hlY2tcIl07XG59O1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi9ydW4vYWRkb25zLmpzXG4gKiogbW9kdWxlIGlkID0gMTVcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIlwidXNlIHN0cmljdFwiO1xuXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uIChuZ01vZHVsZSkge1xuICBuZ01vZHVsZS5ydW4oYWRkRGVzY3JpcHRpb25NYW5pcHVsYXRvcik7XG5cbiAgZnVuY3Rpb24gYWRkRGVzY3JpcHRpb25NYW5pcHVsYXRvcihmb3JtbHlDb25maWcpIHtcbiAgICBmb3JtbHlDb25maWcudGVtcGxhdGVNYW5pcHVsYXRvcnMucHJlV3JhcHBlci5wdXNoKGZ1bmN0aW9uIGFyaWFEZXNjcmliZWRCeSh0ZW1wbGF0ZSwgb3B0aW9ucywgc2NvcGUpIHtcbiAgICAgIGlmIChhbmd1bGFyLmlzRGVmaW5lZChvcHRpb25zLnRlbXBsYXRlT3B0aW9ucy5kZXNjcmlwdGlvbikgJiYgb3B0aW9ucy50eXBlICE9PSBcInJhZGlvXCIgJiYgb3B0aW9ucy50eXBlICE9PSBcImNoZWNrYm94XCIpIHtcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcbiAgICAgICAgZWwuYXBwZW5kQ2hpbGQoYW5ndWxhci5lbGVtZW50KHRlbXBsYXRlKVswXSk7XG4gICAgICAgIHZhciBtb2RlbEVscyA9IGFuZ3VsYXIuZWxlbWVudChlbC5xdWVyeVNlbGVjdG9yQWxsKFwiW25nLW1vZGVsXVwiKSk7XG4gICAgICAgIGlmIChtb2RlbEVscykge1xuICAgICAgICAgIGVsLmFwcGVuZENoaWxkKGFuZ3VsYXIuZWxlbWVudChcIjxwIGlkPVxcXCJcIiArIHNjb3BlLmlkICsgXCJfZGVzY3JpcHRpb25cXFwiXCIgKyBcImNsYXNzPVxcXCJoZWxwLWJsb2NrXFxcIlwiICsgXCJuZy1pZj1cXFwidG8uZGVzY3JpcHRpb25cXFwiPlwiICsgXCJ7e3RvLmRlc2NyaXB0aW9ufX1cIiArIFwiPC9wPlwiKVswXSk7XG4gICAgICAgICAgbW9kZWxFbHMuYXR0cihcImFyaWEtZGVzY3JpYmVkYnlcIiwgc2NvcGUuaWQgKyBcIl9kZXNjcmlwdGlvblwiKTtcbiAgICAgICAgICByZXR1cm4gZWwuaW5uZXJIVE1MO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJldHVybiB0ZW1wbGF0ZTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcmV0dXJuIHRlbXBsYXRlO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG4gIGFkZERlc2NyaXB0aW9uTWFuaXB1bGF0b3IuJGluamVjdCA9IFtcImZvcm1seUNvbmZpZ1wiXTtcbn07XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3J1bi9kZXNjcmlwdGlvbi5qc1xuICoqIG1vZHVsZSBpZCA9IDE2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJtb2R1bGUuZXhwb3J0cyA9IFwiPGRpdj5cXG4gIDxsYWJlbCBmb3I9XFxcInt7aWR9fVxcXCIgY2xhc3M9XFxcImNvbnRyb2wtbGFiZWxcXFwiPlxcbiAgICB7e3RvLmxhYmVsfX1cXG4gICAge3t0by5yZXF1aXJlZCA/ICcqJyA6ICcnfX1cXG4gIDwvbGFiZWw+XFxuICA8Zm9ybWx5LXRyYW5zY2x1ZGU+PC9mb3JtbHktdHJhbnNjbHVkZT5cXG48L2Rpdj5cXG5cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi93cmFwcGVycy9sYWJlbC5odG1sXG4gKiogbW9kdWxlIGlkID0gMTdcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJmb3JtLWdyb3VwXFxcIiBuZy1jbGFzcz1cXFwieydoYXMtZXJyb3InOiBzaG93RXJyb3J9XFxcIj5cXG4gIDxmb3JtbHktdHJhbnNjbHVkZT48L2Zvcm1seS10cmFuc2NsdWRlPlxcbjwvZGl2PlxcblwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3dyYXBwZXJzL2hhcy1lcnJvci5odG1sXG4gKiogbW9kdWxlIGlkID0gMThcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJjaGVja2JveFxcXCI+XFxuXFx0PGxhYmVsPlxcblxcdFxcdDxpbnB1dCB0eXBlPVxcXCJjaGVja2JveFxcXCJcXG4gICAgICAgICAgIGNsYXNzPVxcXCJmb3JtbHktZmllbGQtY2hlY2tib3hcXFwiXFxuXFx0XFx0ICAgICAgIG5nLW1vZGVsPVxcXCJtb2RlbFtvcHRpb25zLmtleV1cXFwiPlxcblxcdFxcdHt7dG8ubGFiZWx9fVxcblxcdFxcdHt7dG8ucmVxdWlyZWQgPyAnKicgOiAnJ319XFxuXFx0PC9sYWJlbD5cXG48L2Rpdj5cXG5cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy9jaGVja2JveC5odG1sXG4gKiogbW9kdWxlIGlkID0gMTlcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gXCI8ZGl2IGNsYXNzPVxcXCJyYWRpby1ncm91cFxcXCI+XFxuICA8ZGl2IG5nLXJlcGVhdD1cXFwiKGtleSwgb3B0aW9uKSBpbiB0by5vcHRpb25zXFxcIiBjbGFzcz1cXFwiY2hlY2tib3hcXFwiPlxcbiAgICA8bGFiZWw+XFxuICAgICAgPGlucHV0IHR5cGU9XFxcImNoZWNrYm94XFxcIlxcbiAgICAgICAgICAgICBpZD1cXFwie3tpZCArICdfJysgJGluZGV4fX1cXFwiXFxuICAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJtdWx0aUNoZWNrYm94LmNoZWNrZWRbJGluZGV4XVxcXCJcXG4gICAgICAgICAgICAgbmctY2hhbmdlPVxcXCJtdWx0aUNoZWNrYm94LmNoYW5nZSgpXFxcIj5cXG4gICAgICB7e29wdGlvblt0by5sYWJlbFByb3AgfHwgJ25hbWUnXX19XFxuICAgIDwvbGFiZWw+XFxuICA8L2Rpdj5cXG48L2Rpdj5cXG5cIlxuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogLi90eXBlcy9tdWx0aUNoZWNrYm94Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAyMFxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgY2xhc3M9XFxcInJhZGlvLWdyb3VwXFxcIj5cXG4gIDxkaXYgbmctcmVwZWF0PVxcXCIoa2V5LCBvcHRpb24pIGluIHRvLm9wdGlvbnNcXFwiIGNsYXNzPVxcXCJyYWRpb1xcXCI+XFxuICAgIDxsYWJlbD5cXG4gICAgICA8aW5wdXQgdHlwZT1cXFwicmFkaW9cXFwiXFxuICAgICAgICAgICAgIGlkPVxcXCJ7e2lkICsgJ18nKyAkaW5kZXh9fVxcXCJcXG4gICAgICAgICAgICAgbmctdmFsdWU9XFxcIm9wdGlvblt0by52YWx1ZVByb3AgfHwgJ3ZhbHVlJ11cXFwiXFxuICAgICAgICAgICAgIG5nLW1vZGVsPVxcXCJtb2RlbFtvcHRpb25zLmtleV1cXFwiPlxcbiAgICAgIHt7b3B0aW9uW3RvLmxhYmVsUHJvcCB8fCAnbmFtZSddfX1cXG4gICAgPC9sYWJlbD5cXG4gIDwvZGl2PlxcbjwvZGl2PlxcblwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3R5cGVzL3JhZGlvLmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAyMVxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxzZWxlY3QgY2xhc3M9XFxcImZvcm0tY29udHJvbFxcXCJcXG4gICAgICAgIG5nLW1vZGVsPVxcXCJtb2RlbFtvcHRpb25zLmtleV1cXFwiXFxuICAgICAgICBuZy1vcHRpb25zPVxcXCJvcHRpb25bdG8udmFsdWVQcm9wIHx8ICd2YWx1ZSddIGFzIG9wdGlvblt0by5sYWJlbFByb3AgfHwgJ25hbWUnXSBncm91cCBieSBvcHRpb25bdG8uZ3JvdXBQcm9wIHx8ICdncm91cCddIGZvciBvcHRpb24gaW4gdG8ub3B0aW9uc1xcXCI+XFxuPC9zZWxlY3Q+XFxuXCJcblxuXG4vKioqKioqKioqKioqKioqKipcbiAqKiBXRUJQQUNLIEZPT1RFUlxuICoqIC4vdHlwZXMvc2VsZWN0Lmh0bWxcbiAqKiBtb2R1bGUgaWQgPSAyMlxuICoqIG1vZHVsZSBjaHVua3MgPSAwXG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBcIjxkaXYgbmctY2xhc3M9XFxcInsnaW5wdXQtZ3JvdXAnOiB0by5hZGRvbkxlZnQgfHwgdG8uYWRkb25SaWdodH1cXFwiPlxcbiAgICA8ZGl2IGNsYXNzPVxcXCJpbnB1dC1ncm91cC1hZGRvblxcXCIgbmctaWY9XFxcInRvLmFkZG9uTGVmdFxcXCI+XFxuICAgICAgICA8aSBjbGFzcz1cXFwie3t0by5hZGRvbkxlZnQuY2xhc3N9fVxcXCIgbmctaWY9XFxcInRvLmFkZG9uTGVmdC5jbGFzc1xcXCI+PC9pPlxcbiAgICAgICAgPHNwYW4gbmctaWY9XFxcInRvLmFkZG9uTGVmdC50ZXh0XFxcIj57e3RvLmFkZG9uTGVmdC50ZXh0fX08L3NwYW4+XFxuICAgIDwvZGl2PlxcbiAgICA8Zm9ybWx5LXRyYW5zY2x1ZGU+PC9mb3JtbHktdHJhbnNjbHVkZT5cXG4gICAgPGRpdiBjbGFzcz1cXFwiaW5wdXQtZ3JvdXAtYWRkb25cXFwiIG5nLWlmPVxcXCJ0by5hZGRvblJpZ2h0XFxcIj5cXG4gICAgICAgIDxpIGNsYXNzPVxcXCJ7e3RvLmFkZG9uUmlnaHQuY2xhc3N9fVxcXCIgbmctaWY9XFxcInRvLmFkZG9uUmlnaHQuY2xhc3NcXFwiPjwvaT5cXG4gICAgICAgIDxzcGFuIG5nLWlmPVxcXCJ0by5hZGRvblJpZ2h0LnRleHRcXFwiPnt7dG8uYWRkb25SaWdodC50ZXh0fX08L3NwYW4+XFxuICAgIDwvZGl2PlxcbjwvZGl2PlwiXG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiAuL3J1bi9hZGRvbnMuaHRtbFxuICoqIG1vZHVsZSBpZCA9IDIzXG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iXSwic291cmNlUm9vdCI6IiIsImZpbGUiOiJhbmd1bGFyLWZvcm1seS10ZW1wbGF0ZXMtYm9vdHN0cmFwLmpzIn0=