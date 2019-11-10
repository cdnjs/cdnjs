/*!
* surveyjs - Survey JavaScript library v0.10.0
* (c) Andrew Telnov - http://surveyjs.org/
* License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("knockout"));
	else if(typeof define === 'function' && define.amd)
		define("Survey", ["knockout"], factory);
	else if(typeof exports === 'object')
		exports["Survey"] = factory(require("knockout"));
	else
		root["Survey"] = factory(root["ko"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_36__) {
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
	
	exports.__esModule = true;
	exports.__extends = exports.SurveyTemplateText = exports.SurveyWindow = exports.QuestionText = exports.QuestionRating = exports.QuestionRadiogroup = exports.QuestionMultipleText = exports.QuestionMultipleTextImplementor = exports.MultipleTextItem = exports.QuestionMatrixDynamic = exports.QuestionMatrixDynamicImplementor = exports.QuestionMatrixDropdown = exports.QuestionMatrix = exports.MatrixRow = exports.QuestionHtml = exports.QuestionFile = exports.QuestionDropdown = exports.QuestionComment = exports.QuestionCheckbox = exports.QuestionCheckboxBaseImplementor = exports.QuestionSelectBaseImplementor = exports.QuestionImplementor = exports.QuestionImplementorBase = exports.Page = exports.QuestionRow = exports.Survey = exports.defaultStandardCss = undefined;
	
	var _model = __webpack_require__(1);
	
	Object.keys(_model).forEach(function (key) {
	  if (key === "default" || key === "__esModule") return;
	  Object.defineProperty(exports, key, {
	    enumerable: true,
	    get: function get() {
	      return _model[key];
	    }
	  });
	});
	
	var _cssstandard = __webpack_require__(34);
	
	Object.defineProperty(exports, "defaultStandardCss", {
	  enumerable: true,
	  get: function get() {
	    return _cssstandard.defaultStandardCss;
	  }
	});
	
	var _kosurvey = __webpack_require__(35);
	
	Object.defineProperty(exports, "Survey", {
	  enumerable: true,
	  get: function get() {
	    return _kosurvey.Survey;
	  }
	});
	
	var _kopage = __webpack_require__(37);
	
	Object.defineProperty(exports, "QuestionRow", {
	  enumerable: true,
	  get: function get() {
	    return _kopage.QuestionRow;
	  }
	});
	Object.defineProperty(exports, "Page", {
	  enumerable: true,
	  get: function get() {
	    return _kopage.Page;
	  }
	});
	
	var _koquestionbase = __webpack_require__(39);
	
	Object.defineProperty(exports, "QuestionImplementorBase", {
	  enumerable: true,
	  get: function get() {
	    return _koquestionbase.QuestionImplementorBase;
	  }
	});
	
	var _koquestion = __webpack_require__(40);
	
	Object.defineProperty(exports, "QuestionImplementor", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion.QuestionImplementor;
	  }
	});
	
	var _koquestion_baseselect = __webpack_require__(41);
	
	Object.defineProperty(exports, "QuestionSelectBaseImplementor", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_baseselect.QuestionSelectBaseImplementor;
	  }
	});
	Object.defineProperty(exports, "QuestionCheckboxBaseImplementor", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_baseselect.QuestionCheckboxBaseImplementor;
	  }
	});
	
	var _koquestion_checkbox = __webpack_require__(42);
	
	Object.defineProperty(exports, "QuestionCheckbox", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_checkbox.QuestionCheckbox;
	  }
	});
	
	var _koquestion_comment = __webpack_require__(43);
	
	Object.defineProperty(exports, "QuestionComment", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_comment.QuestionComment;
	  }
	});
	
	var _koquestion_dropdown = __webpack_require__(44);
	
	Object.defineProperty(exports, "QuestionDropdown", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_dropdown.QuestionDropdown;
	  }
	});
	
	var _koquestion_file = __webpack_require__(45);
	
	Object.defineProperty(exports, "QuestionFile", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_file.QuestionFile;
	  }
	});
	
	var _koquestion_html = __webpack_require__(46);
	
	Object.defineProperty(exports, "QuestionHtml", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_html.QuestionHtml;
	  }
	});
	
	var _koquestion_matrix = __webpack_require__(47);
	
	Object.defineProperty(exports, "MatrixRow", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_matrix.MatrixRow;
	  }
	});
	Object.defineProperty(exports, "QuestionMatrix", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_matrix.QuestionMatrix;
	  }
	});
	
	var _koquestion_matrixdropdown = __webpack_require__(48);
	
	Object.defineProperty(exports, "QuestionMatrixDropdown", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_matrixdropdown.QuestionMatrixDropdown;
	  }
	});
	
	var _koquestion_matrixdynamic = __webpack_require__(49);
	
	Object.defineProperty(exports, "QuestionMatrixDynamicImplementor", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_matrixdynamic.QuestionMatrixDynamicImplementor;
	  }
	});
	Object.defineProperty(exports, "QuestionMatrixDynamic", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_matrixdynamic.QuestionMatrixDynamic;
	  }
	});
	
	var _koquestion_multipletext = __webpack_require__(50);
	
	Object.defineProperty(exports, "MultipleTextItem", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_multipletext.MultipleTextItem;
	  }
	});
	Object.defineProperty(exports, "QuestionMultipleTextImplementor", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_multipletext.QuestionMultipleTextImplementor;
	  }
	});
	Object.defineProperty(exports, "QuestionMultipleText", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_multipletext.QuestionMultipleText;
	  }
	});
	
	var _koquestion_radiogroup = __webpack_require__(51);
	
	Object.defineProperty(exports, "QuestionRadiogroup", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_radiogroup.QuestionRadiogroup;
	  }
	});
	
	var _koquestion_rating = __webpack_require__(52);
	
	Object.defineProperty(exports, "QuestionRating", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_rating.QuestionRating;
	  }
	});
	
	var _koquestion_text = __webpack_require__(53);
	
	Object.defineProperty(exports, "QuestionText", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_text.QuestionText;
	  }
	});
	
	var _koSurveyWindow = __webpack_require__(54);
	
	Object.defineProperty(exports, "SurveyWindow", {
	  enumerable: true,
	  get: function get() {
	    return _koSurveyWindow.SurveyWindow;
	  }
	});
	
	var _templateText = __webpack_require__(56);
	
	Object.defineProperty(exports, "SurveyTemplateText", {
	  enumerable: true,
	  get: function get() {
	    return _templateText.SurveyTemplateText;
	  }
	});
	
	var _extends = __webpack_require__(3);
	
	Object.defineProperty(exports, "__extends", {
	  enumerable: true,
	  get: function get() {
	    return _extends.__extends;
	  }
	});
	
	__webpack_require__(57);
	
	__webpack_require__(62);

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	
	var _validator = __webpack_require__(2);
	
	Object.defineProperty(exports, "AnswerCountValidator", {
	  enumerable: true,
	  get: function get() {
	    return _validator.AnswerCountValidator;
	  }
	});
	Object.defineProperty(exports, "EmailValidator", {
	  enumerable: true,
	  get: function get() {
	    return _validator.EmailValidator;
	  }
	});
	Object.defineProperty(exports, "NumericValidator", {
	  enumerable: true,
	  get: function get() {
	    return _validator.NumericValidator;
	  }
	});
	Object.defineProperty(exports, "RegexValidator", {
	  enumerable: true,
	  get: function get() {
	    return _validator.RegexValidator;
	  }
	});
	Object.defineProperty(exports, "SurveyValidator", {
	  enumerable: true,
	  get: function get() {
	    return _validator.SurveyValidator;
	  }
	});
	Object.defineProperty(exports, "TextValidator", {
	  enumerable: true,
	  get: function get() {
	    return _validator.TextValidator;
	  }
	});
	Object.defineProperty(exports, "ValidatorResult", {
	  enumerable: true,
	  get: function get() {
	    return _validator.ValidatorResult;
	  }
	});
	Object.defineProperty(exports, "ValidatorRunner", {
	  enumerable: true,
	  get: function get() {
	    return _validator.ValidatorRunner;
	  }
	});
	
	var _base = __webpack_require__(4);
	
	Object.defineProperty(exports, "Base", {
	  enumerable: true,
	  get: function get() {
	    return _base.Base;
	  }
	});
	Object.defineProperty(exports, "Event", {
	  enumerable: true,
	  get: function get() {
	    return _base.Event;
	  }
	});
	Object.defineProperty(exports, "ItemValue", {
	  enumerable: true,
	  get: function get() {
	    return _base.ItemValue;
	  }
	});
	Object.defineProperty(exports, "SurveyError", {
	  enumerable: true,
	  get: function get() {
	    return _base.SurveyError;
	  }
	});
	
	var _choicesRestfull = __webpack_require__(8);
	
	Object.defineProperty(exports, "ChoicesRestfull", {
	  enumerable: true,
	  get: function get() {
	    return _choicesRestfull.ChoicesRestfull;
	  }
	});
	
	var _conditions = __webpack_require__(9);
	
	Object.defineProperty(exports, "Condition", {
	  enumerable: true,
	  get: function get() {
	    return _conditions.Condition;
	  }
	});
	Object.defineProperty(exports, "ConditionNode", {
	  enumerable: true,
	  get: function get() {
	    return _conditions.ConditionNode;
	  }
	});
	Object.defineProperty(exports, "ConditionRunner", {
	  enumerable: true,
	  get: function get() {
	    return _conditions.ConditionRunner;
	  }
	});
	
	var _conditionsParser = __webpack_require__(10);
	
	Object.defineProperty(exports, "ConditionsParser", {
	  enumerable: true,
	  get: function get() {
	    return _conditionsParser.ConditionsParser;
	  }
	});
	
	var _error = __webpack_require__(5);
	
	Object.defineProperty(exports, "CustomError", {
	  enumerable: true,
	  get: function get() {
	    return _error.CustomError;
	  }
	});
	Object.defineProperty(exports, "ExceedSizeError", {
	  enumerable: true,
	  get: function get() {
	    return _error.ExceedSizeError;
	  }
	});
	Object.defineProperty(exports, "RequreNumericError", {
	  enumerable: true,
	  get: function get() {
	    return _error.RequreNumericError;
	  }
	});
	
	var _jsonobject = __webpack_require__(7);
	
	Object.defineProperty(exports, "JsonError", {
	  enumerable: true,
	  get: function get() {
	    return _jsonobject.JsonError;
	  }
	});
	Object.defineProperty(exports, "JsonIncorrectTypeError", {
	  enumerable: true,
	  get: function get() {
	    return _jsonobject.JsonIncorrectTypeError;
	  }
	});
	Object.defineProperty(exports, "JsonMetadata", {
	  enumerable: true,
	  get: function get() {
	    return _jsonobject.JsonMetadata;
	  }
	});
	Object.defineProperty(exports, "JsonMetadataClass", {
	  enumerable: true,
	  get: function get() {
	    return _jsonobject.JsonMetadataClass;
	  }
	});
	Object.defineProperty(exports, "JsonMissingTypeError", {
	  enumerable: true,
	  get: function get() {
	    return _jsonobject.JsonMissingTypeError;
	  }
	});
	Object.defineProperty(exports, "JsonMissingTypeErrorBase", {
	  enumerable: true,
	  get: function get() {
	    return _jsonobject.JsonMissingTypeErrorBase;
	  }
	});
	Object.defineProperty(exports, "JsonObject", {
	  enumerable: true,
	  get: function get() {
	    return _jsonobject.JsonObject;
	  }
	});
	Object.defineProperty(exports, "JsonObjectProperty", {
	  enumerable: true,
	  get: function get() {
	    return _jsonobject.JsonObjectProperty;
	  }
	});
	Object.defineProperty(exports, "JsonRequiredPropertyError", {
	  enumerable: true,
	  get: function get() {
	    return _jsonobject.JsonRequiredPropertyError;
	  }
	});
	Object.defineProperty(exports, "JsonUnknownPropertyError", {
	  enumerable: true,
	  get: function get() {
	    return _jsonobject.JsonUnknownPropertyError;
	  }
	});
	
	var _question_matrixdropdownbase = __webpack_require__(11);
	
	Object.defineProperty(exports, "MatrixDropdownCell", {
	  enumerable: true,
	  get: function get() {
	    return _question_matrixdropdownbase.MatrixDropdownCell;
	  }
	});
	Object.defineProperty(exports, "MatrixDropdownColumn", {
	  enumerable: true,
	  get: function get() {
	    return _question_matrixdropdownbase.MatrixDropdownColumn;
	  }
	});
	Object.defineProperty(exports, "MatrixDropdownRowModelBase", {
	  enumerable: true,
	  get: function get() {
	    return _question_matrixdropdownbase.MatrixDropdownRowModelBase;
	  }
	});
	Object.defineProperty(exports, "QuestionMatrixDropdownModelBase", {
	  enumerable: true,
	  get: function get() {
	    return _question_matrixdropdownbase.QuestionMatrixDropdownModelBase;
	  }
	});
	
	var _question_matrixdropdown = __webpack_require__(17);
	
	Object.defineProperty(exports, "MatrixDropdownRowModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_matrixdropdown.MatrixDropdownRowModel;
	  }
	});
	Object.defineProperty(exports, "QuestionMatrixDropdownModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_matrixdropdown.QuestionMatrixDropdownModel;
	  }
	});
	
	var _question_matrixdynamic = __webpack_require__(18);
	
	Object.defineProperty(exports, "MatrixDynamicRowModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_matrixdynamic.MatrixDynamicRowModel;
	  }
	});
	Object.defineProperty(exports, "QuestionMatrixDynamicModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_matrixdynamic.QuestionMatrixDynamicModel;
	  }
	});
	
	var _question_matrix = __webpack_require__(19);
	
	Object.defineProperty(exports, "MatrixRowModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_matrix.MatrixRowModel;
	  }
	});
	Object.defineProperty(exports, "QuestionMatrixModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_matrix.QuestionMatrixModel;
	  }
	});
	
	var _question_multipletext = __webpack_require__(20);
	
	Object.defineProperty(exports, "MultipleTextItemModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_multipletext.MultipleTextItemModel;
	  }
	});
	Object.defineProperty(exports, "QuestionMultipleTextModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_multipletext.QuestionMultipleTextModel;
	  }
	});
	
	var _page = __webpack_require__(21);
	
	Object.defineProperty(exports, "PageModel", {
	  enumerable: true,
	  get: function get() {
	    return _page.PageModel;
	  }
	});
	Object.defineProperty(exports, "QuestionRowModel", {
	  enumerable: true,
	  get: function get() {
	    return _page.QuestionRowModel;
	  }
	});
	
	var _question = __webpack_require__(12);
	
	Object.defineProperty(exports, "Question", {
	  enumerable: true,
	  get: function get() {
	    return _question.Question;
	  }
	});
	
	var _questionbase = __webpack_require__(13);
	
	Object.defineProperty(exports, "QuestionBase", {
	  enumerable: true,
	  get: function get() {
	    return _questionbase.QuestionBase;
	  }
	});
	
	var _question_baseselect = __webpack_require__(15);
	
	Object.defineProperty(exports, "QuestionCheckboxBase", {
	  enumerable: true,
	  get: function get() {
	    return _question_baseselect.QuestionCheckboxBase;
	  }
	});
	Object.defineProperty(exports, "QuestionSelectBase", {
	  enumerable: true,
	  get: function get() {
	    return _question_baseselect.QuestionSelectBase;
	  }
	});
	
	var _question_checkbox = __webpack_require__(22);
	
	Object.defineProperty(exports, "QuestionCheckboxModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_checkbox.QuestionCheckboxModel;
	  }
	});
	
	var _question_comment = __webpack_require__(23);
	
	Object.defineProperty(exports, "QuestionCommentModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_comment.QuestionCommentModel;
	  }
	});
	
	var _question_dropdown = __webpack_require__(24);
	
	Object.defineProperty(exports, "QuestionDropdownModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_dropdown.QuestionDropdownModel;
	  }
	});
	
	var _questionfactory = __webpack_require__(16);
	
	Object.defineProperty(exports, "QuestionFactory", {
	  enumerable: true,
	  get: function get() {
	    return _questionfactory.QuestionFactory;
	  }
	});
	
	var _question_file = __webpack_require__(25);
	
	Object.defineProperty(exports, "QuestionFileModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_file.QuestionFileModel;
	  }
	});
	
	var _question_html = __webpack_require__(26);
	
	Object.defineProperty(exports, "QuestionHtmlModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_html.QuestionHtmlModel;
	  }
	});
	
	var _question_radiogroup = __webpack_require__(27);
	
	Object.defineProperty(exports, "QuestionRadiogroupModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_radiogroup.QuestionRadiogroupModel;
	  }
	});
	
	var _question_rating = __webpack_require__(28);
	
	Object.defineProperty(exports, "QuestionRatingModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_rating.QuestionRatingModel;
	  }
	});
	
	var _question_text = __webpack_require__(29);
	
	Object.defineProperty(exports, "QuestionTextModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_text.QuestionTextModel;
	  }
	});
	
	var _survey = __webpack_require__(30);
	
	Object.defineProperty(exports, "SurveyModel", {
	  enumerable: true,
	  get: function get() {
	    return _survey.SurveyModel;
	  }
	});
	
	var _trigger = __webpack_require__(32);
	
	Object.defineProperty(exports, "SurveyTrigger", {
	  enumerable: true,
	  get: function get() {
	    return _trigger.SurveyTrigger;
	  }
	});
	Object.defineProperty(exports, "SurveyTriggerComplete", {
	  enumerable: true,
	  get: function get() {
	    return _trigger.SurveyTriggerComplete;
	  }
	});
	Object.defineProperty(exports, "SurveyTriggerSetValue", {
	  enumerable: true,
	  get: function get() {
	    return _trigger.SurveyTriggerSetValue;
	  }
	});
	Object.defineProperty(exports, "SurveyTriggerVisible", {
	  enumerable: true,
	  get: function get() {
	    return _trigger.SurveyTriggerVisible;
	  }
	});
	Object.defineProperty(exports, "Trigger", {
	  enumerable: true,
	  get: function get() {
	    return _trigger.Trigger;
	  }
	});
	
	var _surveyWindow = __webpack_require__(33);
	
	Object.defineProperty(exports, "SurveyWindowModel", {
	  enumerable: true,
	  get: function get() {
	    return _surveyWindow.SurveyWindowModel;
	  }
	});
	
	var _textPreProcessor = __webpack_require__(14);
	
	Object.defineProperty(exports, "TextPreProcessor", {
	  enumerable: true,
	  get: function get() {
	    return _textPreProcessor.TextPreProcessor;
	  }
	});
	
	var _dxSurveyService = __webpack_require__(31);
	
	Object.defineProperty(exports, "dxSurveyService", {
	  enumerable: true,
	  get: function get() {
	    return _dxSurveyService.dxSurveyService;
	  }
	});
	
	var _surveyStrings = __webpack_require__(6);
	
	Object.defineProperty(exports, "surveyLocalization", {
	  enumerable: true,
	  get: function get() {
	    return _surveyStrings.surveyLocalization;
	  }
	});
	Object.defineProperty(exports, "surveyStrings", {
	  enumerable: true,
	  get: function get() {
	    return _surveyStrings.surveyStrings;
	  }
	});

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.EmailValidator = exports.RegexValidator = exports.AnswerCountValidator = exports.TextValidator = exports.NumericValidator = exports.ValidatorRunner = exports.SurveyValidator = exports.ValidatorResult = undefined;
	
	var _base = __webpack_require__(4);
	
	var _error = __webpack_require__(5);
	
	var _surveyStrings = __webpack_require__(6);
	
	var _jsonobject = __webpack_require__(7);
	
	var ValidatorResult = exports.ValidatorResult = function () {
	    function ValidatorResult(value, error) {
	        if (error === void 0) {
	            error = null;
	        }
	        this.value = value;
	        this.error = error;
	    }
	    return ValidatorResult;
	}();
	var SurveyValidator = exports.SurveyValidator = function (_super) {
	    __extends(SurveyValidator, _super);
	    function SurveyValidator() {
	        _super.call(this);
	        this.text = "";
	    }
	    SurveyValidator.prototype.getErrorText = function (name) {
	        if (this.text) return this.text;
	        return this.getDefaultErrorText(name);
	    };
	    SurveyValidator.prototype.getDefaultErrorText = function (name) {
	        return "";
	    };
	    SurveyValidator.prototype.validate = function (value, name) {
	        if (name === void 0) {
	            name = null;
	        }
	        return null;
	    };
	    return SurveyValidator;
	}(_base.Base);
	var ValidatorRunner = exports.ValidatorRunner = function () {
	    function ValidatorRunner() {}
	    ValidatorRunner.prototype.run = function (owner) {
	        for (var i = 0; i < owner.validators.length; i++) {
	            var validatorResult = owner.validators[i].validate(owner.value, owner.getValidatorTitle());
	            if (validatorResult != null) {
	                if (validatorResult.error) return validatorResult.error;
	                if (validatorResult.value) {
	                    owner.value = validatorResult.value;
	                }
	            }
	        }
	        return null;
	    };
	    return ValidatorRunner;
	}();
	var NumericValidator = exports.NumericValidator = function (_super) {
	    __extends(NumericValidator, _super);
	    function NumericValidator(minValue, maxValue) {
	        if (minValue === void 0) {
	            minValue = null;
	        }
	        if (maxValue === void 0) {
	            maxValue = null;
	        }
	        _super.call(this);
	        this.minValue = minValue;
	        this.maxValue = maxValue;
	    }
	    NumericValidator.prototype.getType = function () {
	        return "numericvalidator";
	    };
	    NumericValidator.prototype.validate = function (value, name) {
	        if (name === void 0) {
	            name = null;
	        }
	        if (!value || !this.isNumber(value)) {
	            return new ValidatorResult(null, new _error.RequreNumericError());
	        }
	        var result = new ValidatorResult(parseFloat(value));
	        if (this.minValue && this.minValue > result.value) {
	            result.error = new _error.CustomError(this.getErrorText(name));
	            return result;
	        }
	        if (this.maxValue && this.maxValue < result.value) {
	            result.error = new _error.CustomError(this.getErrorText(name));
	            return result;
	        }
	        return typeof value === 'number' ? null : result;
	    };
	    NumericValidator.prototype.getDefaultErrorText = function (name) {
	        var vName = name ? name : "value";
	        if (this.minValue && this.maxValue) {
	            return _surveyStrings.surveyLocalization.getString("numericMinMax")["format"](vName, this.minValue, this.maxValue);
	        } else {
	            if (this.minValue) {
	                return _surveyStrings.surveyLocalization.getString("numericMin")["format"](vName, this.minValue);
	            }
	            return _surveyStrings.surveyLocalization.getString("numericMax")["format"](vName, this.maxValue);
	        }
	    };
	    NumericValidator.prototype.isNumber = function (value) {
	        return !isNaN(parseFloat(value)) && isFinite(value);
	    };
	    return NumericValidator;
	}(SurveyValidator);
	var TextValidator = exports.TextValidator = function (_super) {
	    __extends(TextValidator, _super);
	    function TextValidator(minLength) {
	        if (minLength === void 0) {
	            minLength = 0;
	        }
	        _super.call(this);
	        this.minLength = minLength;
	    }
	    TextValidator.prototype.getType = function () {
	        return "textvalidator";
	    };
	    TextValidator.prototype.validate = function (value, name) {
	        if (name === void 0) {
	            name = null;
	        }
	        if (this.minLength <= 0) return;
	        if (value.length < this.minLength) {
	            return new ValidatorResult(null, new _error.CustomError(this.getErrorText(name)));
	        }
	        return null;
	    };
	    TextValidator.prototype.getDefaultErrorText = function (name) {
	        return _surveyStrings.surveyLocalization.getString("textMinLength")["format"](this.minLength);
	    };
	    return TextValidator;
	}(SurveyValidator);
	var AnswerCountValidator = exports.AnswerCountValidator = function (_super) {
	    __extends(AnswerCountValidator, _super);
	    function AnswerCountValidator(minCount, maxCount) {
	        if (minCount === void 0) {
	            minCount = null;
	        }
	        if (maxCount === void 0) {
	            maxCount = null;
	        }
	        _super.call(this);
	        this.minCount = minCount;
	        this.maxCount = maxCount;
	    }
	    AnswerCountValidator.prototype.getType = function () {
	        return "answercountvalidator";
	    };
	    AnswerCountValidator.prototype.validate = function (value, name) {
	        if (name === void 0) {
	            name = null;
	        }
	        if (value == null || value.constructor != Array) return null;
	        var count = value.length;
	        if (this.minCount && count < this.minCount) {
	            return new ValidatorResult(null, new _error.CustomError(this.getErrorText(_surveyStrings.surveyLocalization.getString("minSelectError")["format"](this.minCount))));
	        }
	        if (this.maxCount && count > this.maxCount) {
	            return new ValidatorResult(null, new _error.CustomError(this.getErrorText(_surveyStrings.surveyLocalization.getString("maxSelectError")["format"](this.maxCount))));
	        }
	        return null;
	    };
	    AnswerCountValidator.prototype.getDefaultErrorText = function (name) {
	        return name;
	    };
	    return AnswerCountValidator;
	}(SurveyValidator);
	var RegexValidator = exports.RegexValidator = function (_super) {
	    __extends(RegexValidator, _super);
	    function RegexValidator(regex) {
	        if (regex === void 0) {
	            regex = null;
	        }
	        _super.call(this);
	        this.regex = regex;
	    }
	    RegexValidator.prototype.getType = function () {
	        return "regexvalidator";
	    };
	    RegexValidator.prototype.validate = function (value, name) {
	        if (name === void 0) {
	            name = null;
	        }
	        if (!this.regex || !value) return null;
	        var re = new RegExp(this.regex);
	        if (re.test(value)) return null;
	        return new ValidatorResult(value, new _error.CustomError(this.getErrorText(name)));
	    };
	    return RegexValidator;
	}(SurveyValidator);
	var EmailValidator = exports.EmailValidator = function (_super) {
	    __extends(EmailValidator, _super);
	    function EmailValidator() {
	        _super.call(this);
	        this.re = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
	    }
	    EmailValidator.prototype.getType = function () {
	        return "emailvalidator";
	    };
	    EmailValidator.prototype.validate = function (value, name) {
	        if (name === void 0) {
	            name = null;
	        }
	        if (!value) return null;
	        if (this.re.test(value)) return null;
	        return new ValidatorResult(value, new _error.CustomError(this.getErrorText(name)));
	    };
	    EmailValidator.prototype.getDefaultErrorText = function (name) {
	        return _surveyStrings.surveyLocalization.getString("invalidEmail");
	    };
	    return EmailValidator;
	}(SurveyValidator);
	_jsonobject.JsonObject.metaData.addClass("surveyvalidator", ["text"]);
	_jsonobject.JsonObject.metaData.addClass("numericvalidator", ["minValue:number", "maxValue:number"], function () {
	    return new NumericValidator();
	}, "surveyvalidator");
	_jsonobject.JsonObject.metaData.addClass("textvalidator", ["minLength:number"], function () {
	    return new TextValidator();
	}, "surveyvalidator");
	_jsonobject.JsonObject.metaData.addClass("answercountvalidator", ["minCount:number", "maxCount:number"], function () {
	    return new AnswerCountValidator();
	}, "surveyvalidator");
	_jsonobject.JsonObject.metaData.addClass("regexvalidator", ["regex"], function () {
	    return new RegexValidator();
	}, "surveyvalidator");
	_jsonobject.JsonObject.metaData.addClass("emailvalidator", [], function () {
	    return new EmailValidator();
	}, "surveyvalidator");
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {'use strict';
	
	exports.__esModule = true;
	exports.__extends = __extends;
	function __extends(d, b) {
	    for (var p in b) {
	        if (b.hasOwnProperty(p)) d[p] = b[p];
	    }function __() {
	        this.constructor = d;
	    }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	}
	if (typeof module !== 'undefined' && module.exports) {
	    exports = module.exports = __extends;
	}
	exports.__extends = __extends;
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var ItemValue = exports.ItemValue = function () {
	    function ItemValue(value, text) {
	        if (text === void 0) {
	            text = null;
	        }
	        this.text = text;
	        this.value = value;
	    }
	    ItemValue.setData = function (items, values) {
	        items.length = 0;
	        for (var i = 0; i < values.length; i++) {
	            var value = values[i];
	            var item = new ItemValue(null);
	            if (typeof value.value !== 'undefined') {
	                item.text = typeof value.hasText !== 'undefined' ? value.itemText : value["text"];
	                item.value = value["value"];
	            } else {
	                item.value = value;
	            }
	            items.push(item);
	        }
	    };
	    ItemValue.getData = function (items) {
	        var result = new Array();
	        for (var i = 0; i < items.length; i++) {
	            var item = items[i];
	            if (item.hasText) {
	                result.push({ value: item.value, text: item.text });
	            } else {
	                result.push(item.value);
	            }
	        }
	        return result;
	    };
	    ItemValue.prototype.getType = function () {
	        return "itemvalue";
	    };
	    Object.defineProperty(ItemValue.prototype, "value", {
	        get: function get() {
	            return this.itemValue;
	        },
	        set: function set(newValue) {
	            this.itemValue = newValue;
	            if (!this.itemValue) return;
	            var str = this.itemValue.toString();
	            var index = str.indexOf(ItemValue.Separator);
	            if (index > -1) {
	                this.itemValue = str.slice(0, index);
	                this.text = str.slice(index + 1);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ItemValue.prototype, "hasText", {
	        get: function get() {
	            return this.itemText ? true : false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ItemValue.prototype, "text", {
	        get: function get() {
	            if (this.hasText) return this.itemText;
	            if (this.value) return this.value.toString();
	            return null;
	        },
	        set: function set(newText) {
	            this.itemText = newText;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ItemValue.Separator = '|';
	    return ItemValue;
	}();
	var Base = exports.Base = function () {
	    function Base() {}
	    Base.prototype.getType = function () {
	        throw new Error('This method is abstract');
	    };
	    return Base;
	}();
	var SurveyError = exports.SurveyError = function () {
	    function SurveyError() {}
	    SurveyError.prototype.getText = function () {
	        throw new Error('This method is abstract');
	    };
	    return SurveyError;
	}();
	var Event = exports.Event = function () {
	    function Event() {}
	    Object.defineProperty(Event.prototype, "isEmpty", {
	        get: function get() {
	            return this.callbacks == null || this.callbacks.length == 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Event.prototype.fire = function (sender, options) {
	        if (this.callbacks == null) return;
	        for (var i = 0; i < this.callbacks.length; i++) {
	            var callResult = this.callbacks[i](sender, options);
	        }
	    };
	    Event.prototype.add = function (func) {
	        if (this.callbacks == null) {
	            this.callbacks = new Array();
	        }
	        this.callbacks.push(func);
	    };
	    Event.prototype.remove = function (func) {
	        if (this.callbacks == null) return;
	        var index = this.callbacks.indexOf(func, 0);
	        if (index != undefined) {
	            this.callbacks.splice(index, 1);
	        }
	    };
	    return Event;
	}();

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.CustomError = exports.ExceedSizeError = exports.RequreNumericError = exports.AnswerRequiredError = undefined;
	
	var _surveyStrings = __webpack_require__(6);
	
	var _base = __webpack_require__(4);
	
	var AnswerRequiredError = exports.AnswerRequiredError = function (_super) {
	    __extends(AnswerRequiredError, _super);
	    function AnswerRequiredError() {
	        _super.call(this);
	    }
	    AnswerRequiredError.prototype.getText = function () {
	        return _surveyStrings.surveyLocalization.getString("requiredError");
	    };
	    return AnswerRequiredError;
	}(_base.SurveyError);
	var RequreNumericError = exports.RequreNumericError = function (_super) {
	    __extends(RequreNumericError, _super);
	    function RequreNumericError() {
	        _super.call(this);
	    }
	    RequreNumericError.prototype.getText = function () {
	        return _surveyStrings.surveyLocalization.getString("numericError");
	    };
	    return RequreNumericError;
	}(_base.SurveyError);
	var ExceedSizeError = exports.ExceedSizeError = function (_super) {
	    __extends(ExceedSizeError, _super);
	    function ExceedSizeError(maxSize) {
	        _super.call(this);
	        this.maxSize = maxSize;
	    }
	    ExceedSizeError.prototype.getText = function () {
	        return _surveyStrings.surveyLocalization.getString("exceedMaxSize")["format"](this.getTextSize());
	    };
	    ExceedSizeError.prototype.getTextSize = function () {
	        var sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
	        var fixed = [0, 0, 2, 3, 3];
	        if (this.maxSize == 0) return '0 Byte';
	        var i = Math.floor(Math.log(this.maxSize) / Math.log(1024));
	        var value = this.maxSize / Math.pow(1024, i);
	        return value.toFixed(fixed[i]) + ' ' + sizes[i];
	    };
	    return ExceedSizeError;
	}(_base.SurveyError);
	var CustomError = exports.CustomError = function (_super) {
	    __extends(CustomError, _super);
	    function CustomError(text) {
	        _super.call(this);
	        this.text = text;
	    }
	    CustomError.prototype.getText = function () {
	        return this.text;
	    };
	    return CustomError;
	}(_base.SurveyError);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 6 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var surveyLocalization = exports.surveyLocalization = {
	    currentLocale: "",
	    locales: {},
	    getString: function getString(strName) {
	        var loc = this.currentLocale ? this.locales[this.currentLocale] : surveyStrings;
	        if (!loc || !loc[strName]) loc = surveyStrings;
	        return loc[strName];
	    },
	    getLocales: function getLocales() {
	        var res = [];
	        res.push("");
	        for (var key in this.locales) {
	            res.push(key);
	        }
	        res.sort();
	        return res;
	    }
	};
	var surveyStrings = exports.surveyStrings = {
	    pagePrevText: "Previous",
	    pageNextText: "Next",
	    completeText: "Complete",
	    otherItemText: "Other (describe)",
	    progressText: "Page {0} of {1}",
	    emptySurvey: "There is no any visible page or visible question in the survey.",
	    completingSurvey: "Thank You for Completing the Survey!",
	    loadingSurvey: "Survey is loading from the server...",
	    optionsCaption: "Choose...",
	    requiredError: "Please answer the question.",
	    requiredInAllRowsError: "Please answer questions in all rows.",
	    numericError: "The value should be a numeric.",
	    textMinLength: "Please enter at least {0} symbols.",
	    minRowCountError: "Please fill at least {0} rows.",
	    minSelectError: "Please select at least {0} variants.",
	    maxSelectError: "Please select not more than {0} variants.",
	    numericMinMax: "The '{0}' should be equal or more than {1} and equal or less than {2}",
	    numericMin: "The '{0}' should be equal or more than {1}",
	    numericMax: "The '{0}' should be equal or less than {1}",
	    invalidEmail: "Please enter a valid e-mail.",
	    urlRequestError: "The request return error '{0}'. {1}",
	    urlGetChoicesError: "The request returns empty data or the 'path' property is incorrect",
	    exceedMaxSize: "The file size should not exceed {0}.",
	    otherRequiredError: "Please enter the others value.",
	    uploadingFile: "Your file is uploading. Please wait several seconds and try again.",
	    addRow: "Add Row",
	    removeRow: "Remove"
	};
	surveyLocalization.locales["en"] = surveyStrings;
	if (!String.prototype["format"]) {
	    String.prototype["format"] = function () {
	        var args = arguments;
	        return this.replace(/{(\d+)}/g, function (match, number) {
	            return typeof args[number] != 'undefined' ? args[number] : match;
	        });
	    };
	}

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var JsonObjectProperty = exports.JsonObjectProperty = function () {
	    function JsonObjectProperty(name) {
	        this.name = name;
	        this.typeValue = null;
	        this.choicesValue = null;
	        this.choicesfunc = null;
	        this.className = null;
	        this.classNamePart = null;
	        this.baseClassName = null;
	        this.defaultValue = null;
	        this.onGetValue = null;
	    }
	    Object.defineProperty(JsonObjectProperty.prototype, "type", {
	        get: function get() {
	            return this.typeValue ? this.typeValue : "string";
	        },
	        set: function set(value) {
	            this.typeValue = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(JsonObjectProperty.prototype, "hasToUseGetValue", {
	        get: function get() {
	            return this.onGetValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    JsonObjectProperty.prototype.isDefaultValue = function (value) {
	        return this.defaultValue ? this.defaultValue == value : !value;
	    };
	    JsonObjectProperty.prototype.getValue = function (obj) {
	        if (this.onGetValue) return this.onGetValue(obj);
	        return null;
	    };
	    Object.defineProperty(JsonObjectProperty.prototype, "hasToUseSetValue", {
	        get: function get() {
	            return this.onSetValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    JsonObjectProperty.prototype.setValue = function (obj, value, jsonConv) {
	        if (this.onSetValue) {
	            this.onSetValue(obj, value, jsonConv);
	        }
	    };
	    JsonObjectProperty.prototype.getObjType = function (objType) {
	        if (!this.classNamePart) return objType;
	        return objType.replace(this.classNamePart, "");
	    };
	    JsonObjectProperty.prototype.getClassName = function (className) {
	        return this.classNamePart && className.indexOf(this.classNamePart) < 0 ? className + this.classNamePart : className;
	    };
	    Object.defineProperty(JsonObjectProperty.prototype, "choices", {
	        get: function get() {
	            if (this.choicesValue != null) return this.choicesValue;
	            if (this.choicesfunc != null) return this.choicesfunc();
	            return null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    JsonObjectProperty.prototype.setChoices = function (value, valueFunc) {
	        this.choicesValue = value;
	        this.choicesfunc = valueFunc;
	    };
	    return JsonObjectProperty;
	}();
	var JsonMetadataClass = exports.JsonMetadataClass = function () {
	    function JsonMetadataClass(name, properties, creator, parentName) {
	        if (creator === void 0) {
	            creator = null;
	        }
	        if (parentName === void 0) {
	            parentName = null;
	        }
	        this.name = name;
	        this.creator = creator;
	        this.parentName = parentName;
	        this.properties = null;
	        this.requiredProperties = null;
	        this.properties = new Array();
	        for (var i = 0; i < properties.length; i++) {
	            var prop = this.createProperty(properties[i]);
	            if (prop) {
	                this.properties.push(prop);
	            }
	        }
	    }
	    JsonMetadataClass.prototype.find = function (name) {
	        for (var i = 0; i < this.properties.length; i++) {
	            if (this.properties[i].name == name) return this.properties[i];
	        }
	        return null;
	    };
	    JsonMetadataClass.prototype.createProperty = function (propInfo) {
	        var propertyName = typeof propInfo === "string" ? propInfo : propInfo.name;
	        if (!propertyName) return;
	        var propertyType = null;
	        var typeIndex = propertyName.indexOf(JsonMetadataClass.typeSymbol);
	        if (typeIndex > -1) {
	            propertyType = propertyName.substring(typeIndex + 1);
	            propertyName = propertyName.substring(0, typeIndex);
	        }
	        propertyName = this.getPropertyName(propertyName);
	        var prop = new JsonObjectProperty(propertyName);
	        if (propertyType) {
	            prop.type = propertyType;
	        }
	        if ((typeof propInfo === "undefined" ? "undefined" : _typeof(propInfo)) === "object") {
	            if (propInfo.type) {
	                prop.type = propInfo.type;
	            }
	            if (propInfo.default) {
	                prop.defaultValue = propInfo.default;
	            }
	            if (propInfo.isRequired) {
	                this.makePropertyRequired(prop.name);
	            }
	            if (propInfo.choices) {
	                var choicesFunc = typeof propInfo.choices === "function" ? propInfo.choices : null;
	                var choicesValue = typeof propInfo.choices !== "function" ? propInfo.choices : null;
	                prop.setChoices(choicesValue, choicesFunc);
	            }
	            if (propInfo.onGetValue) {
	                prop.onGetValue = propInfo.onGetValue;
	            }
	            if (propInfo.onSetValue) {
	                prop.onSetValue = propInfo.onSetValue;
	            }
	            if (propInfo.className) {
	                prop.className = propInfo.className;
	            }
	            if (propInfo.baseClassName) {
	                prop.baseClassName = propInfo.baseClassName;
	            }
	            if (propInfo.classNamePart) {
	                prop.classNamePart = propInfo.classNamePart;
	            }
	        }
	        return prop;
	    };
	    JsonMetadataClass.prototype.getPropertyName = function (propertyName) {
	        if (propertyName.length == 0 || propertyName[0] != JsonMetadataClass.requiredSymbol) return propertyName;
	        propertyName = propertyName.slice(1);
	        this.makePropertyRequired(propertyName);
	        return propertyName;
	    };
	    JsonMetadataClass.prototype.makePropertyRequired = function (propertyName) {
	        if (!this.requiredProperties) {
	            this.requiredProperties = new Array();
	        }
	        this.requiredProperties.push(propertyName);
	    };
	    JsonMetadataClass.requiredSymbol = '!';
	    JsonMetadataClass.typeSymbol = ':';
	    return JsonMetadataClass;
	}();
	var JsonMetadata = exports.JsonMetadata = function () {
	    function JsonMetadata() {
	        this.classes = {};
	        this.childrenClasses = {};
	        this.classProperties = {};
	        this.classRequiredProperties = {};
	    }
	    JsonMetadata.prototype.addClass = function (name, properties, creator, parentName) {
	        if (creator === void 0) {
	            creator = null;
	        }
	        if (parentName === void 0) {
	            parentName = null;
	        }
	        var metaDataClass = new JsonMetadataClass(name, properties, creator, parentName);
	        this.classes[name] = metaDataClass;
	        if (parentName) {
	            var children = this.childrenClasses[parentName];
	            if (!children) {
	                this.childrenClasses[parentName] = [];
	            }
	            this.childrenClasses[parentName].push(metaDataClass);
	        }
	        return metaDataClass;
	    };
	    JsonMetadata.prototype.overrideClassCreatore = function (name, creator) {
	        var metaDataClass = this.findClass(name);
	        if (metaDataClass) {
	            metaDataClass.creator = creator;
	        }
	    };
	    JsonMetadata.prototype.getProperties = function (name) {
	        var properties = this.classProperties[name];
	        if (!properties) {
	            properties = new Array();
	            this.fillProperties(name, properties);
	            this.classProperties[name] = properties;
	        }
	        return properties;
	    };
	    JsonMetadata.prototype.createClass = function (name) {
	        var metaDataClass = this.findClass(name);
	        if (!metaDataClass) return null;
	        return metaDataClass.creator();
	    };
	    JsonMetadata.prototype.getChildrenClasses = function (name, canBeCreated) {
	        if (canBeCreated === void 0) {
	            canBeCreated = false;
	        }
	        var result = [];
	        this.fillChildrenClasses(name, canBeCreated, result);
	        return result;
	    };
	    JsonMetadata.prototype.getRequiredProperties = function (name) {
	        var properties = this.classRequiredProperties[name];
	        if (!properties) {
	            properties = new Array();
	            this.fillRequiredProperties(name, properties);
	            this.classRequiredProperties[name] = properties;
	        }
	        return properties;
	    };
	    JsonMetadata.prototype.fillChildrenClasses = function (name, canBeCreated, result) {
	        var children = this.childrenClasses[name];
	        if (!children) return;
	        for (var i = 0; i < children.length; i++) {
	            if (!canBeCreated || children[i].creator) {
	                result.push(children[i]);
	            }
	            this.fillChildrenClasses(children[i].name, canBeCreated, result);
	        }
	    };
	    JsonMetadata.prototype.findClass = function (name) {
	        return this.classes[name];
	    };
	    JsonMetadata.prototype.fillProperties = function (name, list) {
	        var metaDataClass = this.findClass(name);
	        if (!metaDataClass) return;
	        if (metaDataClass.parentName) {
	            this.fillProperties(metaDataClass.parentName, list);
	        }
	        for (var i = 0; i < metaDataClass.properties.length; i++) {
	            this.addProperty(metaDataClass.properties[i], list, list.length);
	        }
	    };
	    JsonMetadata.prototype.addProperty = function (property, list, endIndex) {
	        var index = -1;
	        for (var i = 0; i < endIndex; i++) {
	            if (list[i].name == property.name) {
	                index = i;
	                break;
	            }
	        }
	        if (index < 0) {
	            list.push(property);
	        } else {
	            list[index] = property;
	        }
	    };
	    JsonMetadata.prototype.fillRequiredProperties = function (name, list) {
	        var metaDataClass = this.findClass(name);
	        if (!metaDataClass) return;
	        if (metaDataClass.requiredProperties) {
	            Array.prototype.push.apply(list, metaDataClass.requiredProperties);
	        }
	        if (metaDataClass.parentName) {
	            this.fillRequiredProperties(metaDataClass.parentName, list);
	        }
	    };
	    return JsonMetadata;
	}();
	var JsonError = exports.JsonError = function () {
	    function JsonError(type, message) {
	        this.type = type;
	        this.message = message;
	        this.description = "";
	        this.at = -1;
	    }
	    JsonError.prototype.getFullDescription = function () {
	        return this.message + (this.description ? "\n" + this.description : "");
	    };
	    return JsonError;
	}();
	var JsonUnknownPropertyError = exports.JsonUnknownPropertyError = function (_super) {
	    __extends(JsonUnknownPropertyError, _super);
	    function JsonUnknownPropertyError(propertyName, className) {
	        _super.call(this, "unknownproperty", "The property '" + propertyName + "' in class '" + className + "' is unknown.");
	        this.propertyName = propertyName;
	        this.className = className;
	        var properties = JsonObject.metaData.getProperties(className);
	        if (properties) {
	            this.description = "The list of available properties are: ";
	            for (var i = 0; i < properties.length; i++) {
	                if (i > 0) this.description += ", ";
	                this.description += properties[i].name;
	            }
	            this.description += '.';
	        }
	    }
	    return JsonUnknownPropertyError;
	}(JsonError);
	var JsonMissingTypeErrorBase = exports.JsonMissingTypeErrorBase = function (_super) {
	    __extends(JsonMissingTypeErrorBase, _super);
	    function JsonMissingTypeErrorBase(baseClassName, type, message) {
	        _super.call(this, type, message);
	        this.baseClassName = baseClassName;
	        this.type = type;
	        this.message = message;
	        this.description = "The following types are available: ";
	        var types = JsonObject.metaData.getChildrenClasses(baseClassName, true);
	        for (var i = 0; i < types.length; i++) {
	            if (i > 0) this.description += ", ";
	            this.description += "'" + types[i].name + "'";
	        }
	        this.description += ".";
	    }
	    return JsonMissingTypeErrorBase;
	}(JsonError);
	var JsonMissingTypeError = exports.JsonMissingTypeError = function (_super) {
	    __extends(JsonMissingTypeError, _super);
	    function JsonMissingTypeError(propertyName, baseClassName) {
	        _super.call(this, baseClassName, "missingtypeproperty", "The property type is missing in the object. Please take a look at property: '" + propertyName + "'.");
	        this.propertyName = propertyName;
	        this.baseClassName = baseClassName;
	    }
	    return JsonMissingTypeError;
	}(JsonMissingTypeErrorBase);
	var JsonIncorrectTypeError = exports.JsonIncorrectTypeError = function (_super) {
	    __extends(JsonIncorrectTypeError, _super);
	    function JsonIncorrectTypeError(propertyName, baseClassName) {
	        _super.call(this, baseClassName, "incorrecttypeproperty", "The property type is incorrect in the object. Please take a look at property: '" + propertyName + "'.");
	        this.propertyName = propertyName;
	        this.baseClassName = baseClassName;
	    }
	    return JsonIncorrectTypeError;
	}(JsonMissingTypeErrorBase);
	var JsonRequiredPropertyError = exports.JsonRequiredPropertyError = function (_super) {
	    __extends(JsonRequiredPropertyError, _super);
	    function JsonRequiredPropertyError(propertyName, className) {
	        _super.call(this, "requiredproperty", "The property '" + propertyName + "' is required in class '" + className + "'.");
	        this.propertyName = propertyName;
	        this.className = className;
	    }
	    return JsonRequiredPropertyError;
	}(JsonError);
	var JsonObject = exports.JsonObject = function () {
	    function JsonObject() {
	        this.errors = new Array();
	    }
	    Object.defineProperty(JsonObject, "metaData", {
	        get: function get() {
	            return JsonObject.metaDataValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    JsonObject.prototype.toJsonObject = function (obj) {
	        return this.toJsonObjectCore(obj, null);
	    };
	    JsonObject.prototype.toObject = function (jsonObj, obj) {
	        if (!jsonObj) return;
	        var properties = null;
	        if (obj.getType) {
	            properties = JsonObject.metaData.getProperties(obj.getType());
	        }
	        if (!properties) return;
	        for (var key in jsonObj) {
	            if (key == JsonObject.typePropertyName) continue;
	            if (key == JsonObject.positionPropertyName) {
	                obj[key] = jsonObj[key];
	                continue;
	            }
	            var property = this.findProperty(properties, key);
	            if (!property) {
	                this.addNewError(new JsonUnknownPropertyError(key.toString(), obj.getType()), jsonObj);
	                continue;
	            }
	            this.valueToObj(jsonObj[key], obj, key, property);
	        }
	    };
	    JsonObject.prototype.toJsonObjectCore = function (obj, property) {
	        if (!obj.getType) return obj;
	        var result = {};
	        if (property != null && !property.className) {
	            result[JsonObject.typePropertyName] = property.getObjType(obj.getType());
	        }
	        var properties = JsonObject.metaData.getProperties(obj.getType());
	        for (var i = 0; i < properties.length; i++) {
	            this.valueToJson(obj, result, properties[i]);
	        }
	        return result;
	    };
	    JsonObject.prototype.valueToJson = function (obj, result, property) {
	        var value = null;
	        if (property.hasToUseGetValue) {
	            value = property.getValue(obj);
	        } else {
	            value = obj[property.name];
	        }
	        if (property.isDefaultValue(value)) return;
	        if (this.isValueArray(value)) {
	            var arrValue = [];
	            for (var i = 0; i < value.length; i++) {
	                arrValue.push(this.toJsonObjectCore(value[i], property));
	            }
	            value = arrValue.length > 0 ? arrValue : null;
	        } else {
	            value = this.toJsonObjectCore(value, property);
	        }
	        if (!property.isDefaultValue(value)) {
	            result[property.name] = value;
	        }
	    };
	    JsonObject.prototype.valueToObj = function (value, obj, key, property) {
	        if (value == null) return;
	        if (property != null && property.hasToUseSetValue) {
	            property.setValue(obj, value, this);
	            return;
	        }
	        if (this.isValueArray(value)) {
	            this.valueToArray(value, obj, key, property);
	            return;
	        }
	        var newObj = this.createNewObj(value, property);
	        if (newObj.newObj) {
	            this.toObject(value, newObj.newObj);
	            value = newObj.newObj;
	        }
	        if (!newObj.error) {
	            obj[key] = value;
	        }
	    };
	    JsonObject.prototype.isValueArray = function (value) {
	        return value.constructor.toString().indexOf("Array") > -1;
	    };
	    JsonObject.prototype.createNewObj = function (value, property) {
	        var result = { newObj: null, error: null };
	        var className = value[JsonObject.typePropertyName];
	        if (!className && property != null && property.className) {
	            className = property.className;
	        }
	        className = property.getClassName(className);
	        result.newObj = className ? JsonObject.metaData.createClass(className) : null;
	        result.error = this.checkNewObjectOnErrors(result.newObj, value, property, className);
	        return result;
	    };
	    JsonObject.prototype.checkNewObjectOnErrors = function (newObj, value, property, className) {
	        var error = null;
	        if (newObj) {
	            var requiredProperties = JsonObject.metaData.getRequiredProperties(className);
	            if (requiredProperties) {
	                for (var i = 0; i < requiredProperties.length; i++) {
	                    if (!value[requiredProperties[i]]) {
	                        error = new JsonRequiredPropertyError(requiredProperties[i], className);
	                        break;
	                    }
	                }
	            }
	        } else {
	            if (property.baseClassName) {
	                if (!className) {
	                    error = new JsonMissingTypeError(property.name, property.baseClassName);
	                } else {
	                    error = new JsonIncorrectTypeError(property.name, property.baseClassName);
	                }
	            }
	        }
	        if (error) {
	            this.addNewError(error, value);
	        }
	        return error;
	    };
	    JsonObject.prototype.addNewError = function (error, jsonObj) {
	        if (jsonObj && jsonObj[JsonObject.positionPropertyName]) {
	            error.at = jsonObj[JsonObject.positionPropertyName].start;
	        }
	        this.errors.push(error);
	    };
	    JsonObject.prototype.valueToArray = function (value, obj, key, property) {
	        if (!this.isValueArray(obj[key])) {
	            obj[key] = [];
	        }
	        for (var i = 0; i < value.length; i++) {
	            var newValue = this.createNewObj(value[i], property);
	            if (newValue.newObj) {
	                obj[key].push(newValue.newObj);
	                this.toObject(value[i], newValue.newObj);
	            } else {
	                if (!newValue.error) {
	                    obj[key].push(value[i]);
	                }
	            }
	        }
	    };
	    JsonObject.prototype.findProperty = function (properties, key) {
	        if (!properties) return null;
	        for (var i = 0; i < properties.length; i++) {
	            if (properties[i].name == key) return properties[i];
	        }
	        return null;
	    };
	    JsonObject.typePropertyName = "type";
	    JsonObject.positionPropertyName = "pos";
	    JsonObject.metaDataValue = new JsonMetadata();
	    return JsonObject;
	}();
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.ChoicesRestfull = undefined;
	
	var _base = __webpack_require__(4);
	
	var _jsonobject = __webpack_require__(7);
	
	var _surveyStrings = __webpack_require__(6);
	
	var _error = __webpack_require__(5);
	
	var ChoicesRestfull = exports.ChoicesRestfull = function (_super) {
	    __extends(ChoicesRestfull, _super);
	    function ChoicesRestfull() {
	        _super.call(this);
	        this.url = "";
	        this.path = "";
	        this.valueName = "";
	        this.titleName = "";
	        this.error = null;
	    }
	    ChoicesRestfull.prototype.run = function () {
	        if (!this.url || !this.getResultCallback) return;
	        this.error = null;
	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', this.url);
	        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	        var self = this;
	        xhr.onload = function () {
	            if (xhr.status == 200) {
	                self.onLoad(JSON.parse(xhr.response));
	            } else {
	                self.onError(xhr.statusText, xhr.responseText);
	            }
	        };
	        xhr.send();
	    };
	    ChoicesRestfull.prototype.getType = function () {
	        return "choicesByUrl";
	    };
	    Object.defineProperty(ChoicesRestfull.prototype, "isEmpty", {
	        get: function get() {
	            return !this.url && !this.path && !this.valueName && !this.titleName;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ChoicesRestfull.prototype.setData = function (json) {
	        this.clear();
	        if (json.url) this.url = json.url;
	        if (json.path) this.path = json.path;
	        if (json.valueName) this.valueName = json.valueName;
	        if (json.titleName) this.titleName = json.titleName;
	    };
	    ChoicesRestfull.prototype.clear = function () {
	        this.url = "";
	        this.path = "";
	        this.valueName = "";
	        this.titleName = "";
	    };
	    ChoicesRestfull.prototype.onLoad = function (result) {
	        var items = [];
	        result = this.getResultAfterPath(result);
	        if (result && result["length"]) {
	            for (var i = 0; i < result.length; i++) {
	                var itemValue = result[i];
	                if (!itemValue) continue;
	                var value = this.getValue(itemValue);
	                var title = this.getTitle(itemValue);
	                items.push(new _base.ItemValue(value, title));
	            }
	        } else {
	            this.error = new _error.CustomError(_surveyStrings.surveyLocalization.getString("urlGetChoicesError"));
	        }
	        this.getResultCallback(items);
	    };
	    ChoicesRestfull.prototype.onError = function (status, response) {
	        this.error = new _error.CustomError(_surveyStrings.surveyLocalization.getString("urlRequestError")["format"](status, response));
	        this.getResultCallback([]);
	    };
	    ChoicesRestfull.prototype.getResultAfterPath = function (result) {
	        if (!result) return result;
	        if (!this.path) return result;
	        var pathes = this.getPathes();
	        for (var i = 0; i < pathes.length; i++) {
	            result = result[pathes[i]];
	            if (!result) return null;
	        }
	        return result;
	    };
	    ChoicesRestfull.prototype.getPathes = function () {
	        var pathes = [];
	        if (this.path.indexOf(';') > -1) {
	            pathes = this.path.split(';');
	        } else {
	            pathes = this.path.split(',');
	        }
	        if (pathes.length == 0) pathes.push(this.path);
	        return pathes;
	    };
	    ChoicesRestfull.prototype.getValue = function (item) {
	        if (this.valueName) return item[this.valueName];
	        var len = Object.keys(item).length;
	        if (len < 1) return null;
	        return item[Object.keys(item)[0]];
	    };
	    ChoicesRestfull.prototype.getTitle = function (item) {
	        if (!this.titleName) return null;
	        return item[this.titleName];
	    };
	    return ChoicesRestfull;
	}(_base.Base);
	_jsonobject.JsonObject.metaData.addClass("choicesByUrl", ["url", "path", "valueName", "titleName"], function () {
	    return new ChoicesRestfull();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.ConditionRunner = exports.ConditionNode = exports.Condition = undefined;
	
	var _conditionsParser = __webpack_require__(10);
	
	var Condition = exports.Condition = function () {
	    function Condition() {
	        this.opValue = "equal";
	    }
	    Object.defineProperty(Condition, "operators", {
	        get: function get() {
	            if (Condition.operatorsValue != null) return Condition.operatorsValue;
	            Condition.operatorsValue = {
	                empty: function empty(left, right) {
	                    return !left;
	                },
	                notempty: function notempty(left, right) {
	                    return !!left;
	                },
	                equal: function equal(left, right) {
	                    return left == right;
	                },
	                notequal: function notequal(left, right) {
	                    return left != right;
	                },
	                contains: function contains(left, right) {
	                    return left && left["indexOf"] && left.indexOf(right) > -1;
	                },
	                notcontains: function notcontains(left, right) {
	                    return !left || !left["indexOf"] || left.indexOf(right) == -1;
	                },
	                greater: function greater(left, right) {
	                    return left > right;
	                },
	                less: function less(left, right) {
	                    return left < right;
	                },
	                greaterorequal: function greaterorequal(left, right) {
	                    return left >= right;
	                },
	                lessorequal: function lessorequal(left, right) {
	                    return left <= right;
	                }
	            };
	            return Condition.operatorsValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Condition.prototype, "operator", {
	        get: function get() {
	            return this.opValue;
	        },
	        set: function set(value) {
	            if (!value) return;
	            value = value.toLowerCase();
	            if (!Condition.operators[value]) return;
	            this.opValue = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Condition.prototype.perform = function (left, right) {
	        if (left === void 0) {
	            left = null;
	        }
	        if (right === void 0) {
	            right = null;
	        }
	        if (!left) left = this.left;
	        if (!right) right = this.right;
	        return Condition.operators[this.operator](this.getPureValue(left), this.getPureValue(right));
	    };
	    Condition.prototype.getPureValue = function (val) {
	        if (!val || typeof val != "string") return val;
	        var str = "";
	        if (val.length > 0 && (val[0] == "'" || val[0] == '"')) val = val.substr(1);
	        var len = val.length;
	        if (len > 0 && (val[len - 1] == "'" || val[len - 1] == '"')) val = val.substr(0, len - 1);
	        return val;
	    };
	    Condition.operatorsValue = null;
	    return Condition;
	}();
	var ConditionNode = exports.ConditionNode = function () {
	    function ConditionNode() {
	        this.connectiveValue = "and";
	        this.children = [];
	    }
	    Object.defineProperty(ConditionNode.prototype, "connective", {
	        get: function get() {
	            return this.connectiveValue;
	        },
	        set: function set(value) {
	            if (!value) return;
	            value = value.toLowerCase();
	            if (value == "&" || value == "&&") value = "and";
	            if (value == "|" || value == "||") value = "or";
	            if (value != "and" && value != "or") return;
	            this.connectiveValue = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(ConditionNode.prototype, "isEmpty", {
	        get: function get() {
	            return this.children.length == 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ConditionNode.prototype.clear = function () {
	        this.children = [];
	        this.connective = "and";
	    };
	    return ConditionNode;
	}();
	var ConditionRunner = exports.ConditionRunner = function () {
	    function ConditionRunner(expression) {
	        this.root = new ConditionNode();
	        this.expression = expression;
	    }
	    Object.defineProperty(ConditionRunner.prototype, "expression", {
	        get: function get() {
	            return this.expressionValue;
	        },
	        set: function set(value) {
	            if (this.expression == value) return;
	            this.expressionValue = value;
	            new _conditionsParser.ConditionsParser().parse(this.expressionValue, this.root);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ConditionRunner.prototype.run = function (values) {
	        this.values = values;
	        return this.runNode(this.root);
	    };
	    ConditionRunner.prototype.runNode = function (node) {
	        var onFirstFail = node.connective == "and";
	        for (var i = 0; i < node.children.length; i++) {
	            var res = this.runNodeCondition(node.children[i]);
	            if (!res && onFirstFail) return false;
	            if (res && !onFirstFail) return true;
	        }
	        return onFirstFail;
	    };
	    ConditionRunner.prototype.runNodeCondition = function (value) {
	        if (!value) return false;
	        if (value["children"]) return this.runNode(value);
	        if (value["left"]) return this.runCondition(value);
	        return false;
	    };
	    ConditionRunner.prototype.runCondition = function (condition) {
	        var left = condition.left;
	        var name = this.getValueName(left);
	        if (name) {
	            if (!(name in this.values)) return false;
	            left = this.values[name];
	        }
	        var right = condition.right;
	        name = this.getValueName(right);
	        if (name) {
	            if (!(name in this.values)) return false;
	            right = this.values[name];
	        }
	        return condition.perform(left, right);
	    };
	    ConditionRunner.prototype.getValueName = function (nodeValue) {
	        if (!nodeValue) return null;
	        if (typeof nodeValue !== 'string') return null;
	        if (nodeValue.length < 3 || nodeValue[0] != '{' || nodeValue[nodeValue.length - 1] != '}') return null;
	        return nodeValue.substr(1, nodeValue.length - 2);
	    };
	    return ConditionRunner;
	}();

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.ConditionsParser = undefined;
	
	var _conditions = __webpack_require__(9);
	
	var ConditionsParser = exports.ConditionsParser = function () {
	    function ConditionsParser() {}
	    ConditionsParser.prototype.parse = function (text, root) {
	        this.text = text;
	        this.root = root;
	        this.root.clear();
	        this.at = 0;
	        this.length = this.text.length;
	        var res = this.parseText();
	        return res;
	    };
	    ConditionsParser.prototype.toString = function (root) {
	        this.root = root;
	        return this.nodeToString(root);
	    };
	    ConditionsParser.prototype.toStringCore = function (value) {
	        if (!value) return "";
	        if (value["children"]) return this.nodeToString(value);
	        if (value["left"]) return this.conditionToString(value);
	        return "";
	    };
	    ConditionsParser.prototype.nodeToString = function (node) {
	        if (node.isEmpty) return "";
	        var res = "";
	        for (var i = 0; i < node.children.length; i++) {
	            var nodeText = this.toStringCore(node.children[i]);
	            if (nodeText) {
	                if (res) res += ' ' + node.connective + ' ';
	                res += nodeText;
	            }
	        }
	        if (node != this.root && node.children.length > 1) {
	            res = '(' + res + ')';
	        }
	        return res;
	    };
	    ConditionsParser.prototype.conditionToString = function (condition) {
	        if (!condition.right || !condition.operator) return "";
	        var left = condition.left;
	        if (left && !this.isNumeric(left)) left = "'" + left + "'";
	        var res = left + ' ' + this.operationToString(condition.operator);
	        if (this.isNoRightOperation(condition.operator)) return res;
	        var right = condition.right;
	        if (right && !this.isNumeric(right)) right = "'" + right + "'";
	        return res + ' ' + right;
	    };
	    ConditionsParser.prototype.operationToString = function (op) {
	        if (op == "equal") return "=";
	        if (op == "notequal") return "!=";
	        if (op == "greater") return ">";
	        if (op == "less") return "<";
	        if (op == "greaterorequal") return ">=";
	        if (op == "lessorequal") return "<=";
	        return op;
	    };
	    ConditionsParser.prototype.isNumeric = function (value) {
	        var val = parseFloat(value);
	        if (isNaN(val)) return false;
	        return isFinite(val);
	    };
	    ConditionsParser.prototype.parseText = function () {
	        this.node = this.root;
	        this.expressionNodes = [];
	        this.expressionNodes.push(this.node);
	        var res = this.readConditions();
	        return res && this.at >= this.length;
	    };
	    ConditionsParser.prototype.readConditions = function () {
	        var res = this.readCondition();
	        if (!res) return res;
	        var connective = this.readConnective();
	        if (connective) {
	            this.addConnective(connective);
	            return this.readConditions();
	        }
	        return true;
	    };
	    ConditionsParser.prototype.readCondition = function () {
	        if (!this.readExpression()) return false;
	        var left = this.readString();
	        if (!left) return false;
	        var op = this.readOperator();
	        if (!op) return false;
	        var c = new _conditions.Condition();
	        c.left = left;
	        c.operator = op;
	        if (!this.isNoRightOperation(op)) {
	            var right = this.readString();
	            if (!right) return false;
	            c.right = right;
	        }
	        this.addCondition(c);
	        return true;
	    };
	    ConditionsParser.prototype.readExpression = function () {
	        this.skip();
	        if (this.at >= this.length || this.ch != '(') return true;
	        this.at++;
	        this.pushExpression();
	        var res = this.readConditions();
	        if (res) {
	            this.skip();
	            res = this.ch == ')';
	            this.at++;
	            this.popExpression();
	        }
	        return res;
	    };
	    Object.defineProperty(ConditionsParser.prototype, "ch", {
	        get: function get() {
	            return this.text.charAt(this.at);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ConditionsParser.prototype.skip = function () {
	        while (this.at < this.length && this.isSpace(this.ch)) {
	            this.at++;
	        }
	    };
	    ConditionsParser.prototype.isSpace = function (c) {
	        return c == ' ' || c == '\n' || c == '\t' || c == '\r';
	    };
	    ConditionsParser.prototype.isQuotes = function (c) {
	        return c == "'" || c == '"';
	    };
	    ConditionsParser.prototype.isOperatorChar = function (c) {
	        return c == '>' || c == '<' || c == '=' || c == '!';
	    };
	    ConditionsParser.prototype.isBrackets = function (c) {
	        return c == '(' || c == ')';
	    };
	    ConditionsParser.prototype.readString = function () {
	        this.skip();
	        if (this.at >= this.length) return null;
	        var start = this.at;
	        var hasQuotes = this.isQuotes(this.ch);
	        if (hasQuotes) this.at++;
	        var isFirstOpCh = this.isOperatorChar(this.ch);
	        while (this.at < this.length) {
	            if (!hasQuotes && this.isSpace(this.ch)) break;
	            if (this.isQuotes(this.ch)) {
	                if (hasQuotes) this.at++;
	                break;
	            }
	            if (!hasQuotes) {
	                if (isFirstOpCh != this.isOperatorChar(this.ch)) break;
	                if (this.isBrackets(this.ch)) break;
	            }
	            this.at++;
	        }
	        if (this.at <= start) return null;
	        var res = this.text.substr(start, this.at - start);
	        if (res) {
	            if (res.length > 1 && this.isQuotes(res[0])) {
	                var len = res.length - 1;
	                if (this.isQuotes(res[res.length - 1])) len--;
	                res = res.substr(1, len);
	            }
	        }
	        return res;
	    };
	    ConditionsParser.prototype.isNoRightOperation = function (op) {
	        return op == "empty" || op == "notempty";
	    };
	    ConditionsParser.prototype.readOperator = function () {
	        var op = this.readString();
	        if (!op) return null;
	        op = op.toLowerCase();
	        if (op == '>') op = "greater";
	        if (op == '<') op = "less";
	        if (op == '>=' || op == '=>') op = "greaterorequal";
	        if (op == '<=' || op == '=<') op = "lessorequal";
	        if (op == '=' || op == '==') op = "equal";
	        if (op == '<>' || op == '!=') op = "notequal";
	        if (op == 'contain') op = "contains";
	        if (op == 'notcontain') op = "notcontains";
	        return op;
	    };
	    ConditionsParser.prototype.readConnective = function () {
	        var con = this.readString();
	        if (!con) return null;
	        con = con.toLowerCase();
	        if (con == "&" || con == "&&") con = "and";
	        if (con == "|" || con == "||") con = "or";
	        if (con != "and" && con != "or") con = null;
	        return con;
	    };
	    ConditionsParser.prototype.pushExpression = function () {
	        var node = new _conditions.ConditionNode();
	        this.expressionNodes.push(node);
	        this.node = node;
	    };
	    ConditionsParser.prototype.popExpression = function () {
	        var node = this.expressionNodes.pop();
	        this.node = this.expressionNodes[this.expressionNodes.length - 1];
	        this.node.children.push(node);
	    };
	    ConditionsParser.prototype.addCondition = function (c) {
	        this.node.children.push(c);
	    };
	    ConditionsParser.prototype.addConnective = function (con) {
	        if (this.node.children.length < 2) {
	            this.node.connective = con;
	        } else {
	            if (this.node.connective != con) {
	                var oldCon = this.node.connective;
	                var oldChildren = this.node.children;
	                this.node.clear();
	                this.node.connective = con;
	                var oldNode = new _conditions.ConditionNode();
	                oldNode.connective = oldCon;
	                oldNode.children = oldChildren;
	                this.node.children.push(oldNode);
	                var newNode = new _conditions.ConditionNode();
	                this.node.children.push(newNode);
	                this.node = newNode;
	            }
	        }
	    };
	    return ConditionsParser;
	}();

/***/ },
/* 11 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMatrixDropdownModelBase = exports.MatrixDropdownRowModelBase = exports.MatrixDropdownCell = exports.MatrixDropdownColumn = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _question = __webpack_require__(12);
	
	var _base = __webpack_require__(4);
	
	var _surveyStrings = __webpack_require__(6);
	
	var _question_baseselect = __webpack_require__(15);
	
	var _questionfactory = __webpack_require__(16);
	
	var MatrixDropdownColumn = exports.MatrixDropdownColumn = function (_super) {
	    __extends(MatrixDropdownColumn, _super);
	    function MatrixDropdownColumn(name, title) {
	        if (title === void 0) {
	            title = null;
	        }
	        _super.call(this);
	        this.name = name;
	        this.choicesValue = [];
	        this.isRequired = false;
	        this.hasOther = false;
	        this.minWidth = "";
	        this.cellType = "default";
	        this.colCountValue = -1;
	    }
	    MatrixDropdownColumn.prototype.getType = function () {
	        return "matrixdropdowncolumn";
	    };
	    Object.defineProperty(MatrixDropdownColumn.prototype, "title", {
	        get: function get() {
	            return this.titleValue ? this.titleValue : this.name;
	        },
	        set: function set(value) {
	            this.titleValue = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MatrixDropdownColumn.prototype, "choices", {
	        get: function get() {
	            return this.choicesValue;
	        },
	        set: function set(newValue) {
	            _base.ItemValue.setData(this.choicesValue, newValue);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MatrixDropdownColumn.prototype, "colCount", {
	        get: function get() {
	            return this.colCountValue;
	        },
	        set: function set(value) {
	            if (value < -1 || value > 4) return;
	            this.colCountValue = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return MatrixDropdownColumn;
	}(_base.Base);
	var MatrixDropdownCell = exports.MatrixDropdownCell = function () {
	    function MatrixDropdownCell(column, row, data) {
	        this.column = column;
	        this.row = row;
	        this.questionValue = data.createQuestion(this.row, this.column);
	        this.questionValue.setData(row);
	    }
	    Object.defineProperty(MatrixDropdownCell.prototype, "question", {
	        get: function get() {
	            return this.questionValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MatrixDropdownCell.prototype, "value", {
	        get: function get() {
	            return this.question.value;
	        },
	        set: function set(value) {
	            this.question.value = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return MatrixDropdownCell;
	}();
	var MatrixDropdownRowModelBase = exports.MatrixDropdownRowModelBase = function () {
	    function MatrixDropdownRowModelBase(data, value) {
	        this.rowValues = {};
	        this.rowComments = {};
	        this.isSettingValue = false;
	        this.cells = [];
	        this.data = data;
	        this.value = value;
	        this.buildCells();
	    }
	    Object.defineProperty(MatrixDropdownRowModelBase.prototype, "rowName", {
	        get: function get() {
	            return null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MatrixDropdownRowModelBase.prototype, "value", {
	        get: function get() {
	            return this.rowValues;
	        },
	        set: function set(value) {
	            this.isSettingValue = true;
	            this.rowValues = {};
	            if (value != null) {
	                for (var key in value) {
	                    this.rowValues[key] = value[key];
	                }
	            }
	            for (var i = 0; i < this.cells.length; i++) {
	                this.cells[i].question.onSurveyValueChanged(this.getValue(this.cells[i].column.name));
	            }
	            this.isSettingValue = false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MatrixDropdownRowModelBase.prototype.getValue = function (name) {
	        return this.rowValues[name];
	    };
	    MatrixDropdownRowModelBase.prototype.setValue = function (name, newValue) {
	        if (this.isSettingValue) return;
	        if (newValue === "") newValue = null;
	        if (newValue != null) {
	            this.rowValues[name] = newValue;
	        } else {
	            delete this.rowValues[name];
	        }
	        this.data.onRowChanged(this, this.value);
	    };
	    MatrixDropdownRowModelBase.prototype.getComment = function (name) {
	        return this.rowComments[name];
	    };
	    MatrixDropdownRowModelBase.prototype.setComment = function (name, newValue) {
	        this.rowComments[name] = newValue;
	    };
	    Object.defineProperty(MatrixDropdownRowModelBase.prototype, "isEmpty", {
	        get: function get() {
	            var val = this.value;
	            if (!val) return true;
	            for (var key in val) {
	                return false;
	            }return true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MatrixDropdownRowModelBase.prototype.buildCells = function () {
	        var columns = this.data.columns;
	        for (var i = 0; i < columns.length; i++) {
	            var column = columns[i];
	            this.cells.push(this.createCell(column));
	        }
	    };
	    MatrixDropdownRowModelBase.prototype.createCell = function (column) {
	        return new MatrixDropdownCell(column, this, this.data);
	    };
	    return MatrixDropdownRowModelBase;
	}();
	var QuestionMatrixDropdownModelBase = exports.QuestionMatrixDropdownModelBase = function (_super) {
	    __extends(QuestionMatrixDropdownModelBase, _super);
	    function QuestionMatrixDropdownModelBase(name) {
	        _super.call(this, name);
	        this.name = name;
	        this.columnsValue = [];
	        this.choicesValue = [];
	        this.isRowChanging = false;
	        this.cellTypeValue = "dropdown";
	        this.columnColCountValue = 0;
	        this.columnMinWidth = "";
	        this.horizontalScroll = false;
	    }
	    QuestionMatrixDropdownModelBase.prototype.getType = function () {
	        return "matrixdropdownbase";
	    };
	    Object.defineProperty(QuestionMatrixDropdownModelBase.prototype, "columns", {
	        get: function get() {
	            return this.columnsValue;
	        },
	        set: function set(value) {
	            this.columnsValue = value;
	            this.fireCallback(this.columnsChangedCallback);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionMatrixDropdownModelBase.prototype, "cellType", {
	        get: function get() {
	            return this.cellTypeValue;
	        },
	        set: function set(newValue) {
	            if (this.cellType == newValue) return;
	            this.cellTypeValue = newValue;
	            this.fireCallback(this.updateCellsCallbak);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionMatrixDropdownModelBase.prototype, "columnColCount", {
	        get: function get() {
	            return this.columnColCountValue;
	        },
	        set: function set(value) {
	            if (value < 0 || value > 4) return;
	            this.columnColCountValue = value;
	            this.fireCallback(this.updateCellsCallbak);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionMatrixDropdownModelBase.prototype.getColumnTitle = function (column) {
	        var result = column.title;
	        if (column.isRequired && this.survey) {
	            var requireText = this.survey.requiredText;
	            if (requireText) requireText += " ";
	            result = requireText + result;
	        }
	        return result;
	    };
	    QuestionMatrixDropdownModelBase.prototype.getColumnWidth = function (column) {
	        return column.minWidth ? column.minWidth : this.columnMinWidth;
	    };
	    Object.defineProperty(QuestionMatrixDropdownModelBase.prototype, "choices", {
	        get: function get() {
	            return this.choicesValue;
	        },
	        set: function set(newValue) {
	            _base.ItemValue.setData(this.choicesValue, newValue);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionMatrixDropdownModelBase.prototype, "optionsCaption", {
	        get: function get() {
	            return this.optionsCaptionValue ? this.optionsCaptionValue : _surveyStrings.surveyLocalization.getString("optionsCaption");
	        },
	        set: function set(newValue) {
	            this.optionsCaptionValue = newValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionMatrixDropdownModelBase.prototype.addColumn = function (name, title) {
	        if (title === void 0) {
	            title = null;
	        }
	        var column = new MatrixDropdownColumn(name, title);
	        this.columnsValue.push(column);
	        return column;
	    };
	    Object.defineProperty(QuestionMatrixDropdownModelBase.prototype, "visibleRows", {
	        get: function get() {
	            this.generatedVisibleRows = this.generateRows();
	            return this.generatedVisibleRows;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionMatrixDropdownModelBase.prototype.generateRows = function () {
	        return null;
	    };
	    QuestionMatrixDropdownModelBase.prototype.createMatrixRow = function (name, text, value) {
	        return null;
	    };
	    QuestionMatrixDropdownModelBase.prototype.createNewValue = function (curValue) {
	        return !curValue ? {} : curValue;
	    };
	    QuestionMatrixDropdownModelBase.prototype.getRowValue = function (row, questionValue, create) {
	        if (create === void 0) {
	            create = false;
	        }
	        var result = questionValue[row.rowName] ? questionValue[row.rowName] : null;
	        if (!result && create) {
	            result = {};
	            questionValue[row.rowName] = result;
	        }
	        return result;
	    };
	    QuestionMatrixDropdownModelBase.prototype.onValueChanged = function () {
	        if (this.isRowChanging || !this.generatedVisibleRows || this.generatedVisibleRows.length == 0) return;
	        this.isRowChanging = true;
	        var val = this.createNewValue(this.value);
	        for (var i = 0; i < this.generatedVisibleRows.length; i++) {
	            var row = this.generatedVisibleRows[i];
	            this.generatedVisibleRows[i].value = this.getRowValue(row, val);
	        }
	        this.isRowChanging = false;
	    };
	    QuestionMatrixDropdownModelBase.prototype.hasErrors = function (fireCallback) {
	        if (fireCallback === void 0) {
	            fireCallback = true;
	        }
	        var errosInColumns = this.hasErrorInColumns(fireCallback);
	        return _super.prototype.hasErrors.call(this, fireCallback) || errosInColumns;
	    };
	    QuestionMatrixDropdownModelBase.prototype.hasErrorInColumns = function (fireCallback) {
	        if (!this.generatedVisibleRows) return false;
	        var res = false;
	        for (var colIndex = 0; colIndex < this.columns.length; colIndex++) {
	            for (var i = 0; i < this.generatedVisibleRows.length; i++) {
	                var cells = this.generatedVisibleRows[i].cells;
	                res = cells && cells[colIndex] && cells[colIndex].question && cells[colIndex].question.hasErrors(fireCallback) || res;
	            }
	        }
	        return res;
	    };
	    //IMatrixDropdownData
	    QuestionMatrixDropdownModelBase.prototype.createQuestion = function (row, column) {
	        var question = this.createQuestionCore(row, column);
	        question.name = column.name;
	        question.isRequired = column.isRequired;
	        question.hasOther = column.hasOther;
	        if (column.hasOther) {
	            if (question instanceof _question_baseselect.QuestionSelectBase) {
	                question.storeOthersAsComment = false;
	            }
	        }
	        return question;
	    };
	    QuestionMatrixDropdownModelBase.prototype.createQuestionCore = function (row, column) {
	        var cellType = column.cellType == "default" ? this.cellType : column.cellType;
	        var name = this.getQuestionName(row, column);
	        if (cellType == "checkbox") return this.createCheckbox(name, column);
	        if (cellType == "radiogroup") return this.createRadiogroup(name, column);
	        if (cellType == "text") return this.createText(name, column);
	        if (cellType == "comment") return this.createComment(name, column);
	        return this.createDropdown(name, column);
	    };
	    QuestionMatrixDropdownModelBase.prototype.getQuestionName = function (row, column) {
	        return row.rowName + "_" + column.name;
	    };
	    QuestionMatrixDropdownModelBase.prototype.getColumnChoices = function (column) {
	        return column.choices && column.choices.length > 0 ? column.choices : this.choices;
	    };
	    QuestionMatrixDropdownModelBase.prototype.getColumnOptionsCaption = function (column) {
	        return column.optionsCaption ? column.optionsCaption : this.optionsCaption;
	    };
	    QuestionMatrixDropdownModelBase.prototype.createDropdown = function (name, column) {
	        var q = this.createCellQuestion("dropdown", name);
	        q.choices = this.getColumnChoices(column);
	        q.optionsCaption = this.getColumnOptionsCaption(column);
	        return q;
	    };
	    QuestionMatrixDropdownModelBase.prototype.createCheckbox = function (name, column) {
	        var q = this.createCellQuestion("checkbox", name);
	        q.choices = this.getColumnChoices(column);
	        q.colCount = column.colCount > -1 ? column.colCount : this.columnColCount;
	        return q;
	    };
	    QuestionMatrixDropdownModelBase.prototype.createRadiogroup = function (name, column) {
	        var q = this.createCellQuestion("radiogroup", name);
	        q.choices = this.getColumnChoices(column);
	        q.colCount = column.colCount > -1 ? column.colCount : this.columnColCount;
	        return q;
	    };
	    QuestionMatrixDropdownModelBase.prototype.createText = function (name, column) {
	        return this.createCellQuestion("text", name);
	    };
	    QuestionMatrixDropdownModelBase.prototype.createComment = function (name, column) {
	        return this.createCellQuestion("comment", name);
	    };
	    QuestionMatrixDropdownModelBase.prototype.createCellQuestion = function (questionType, name) {
	        return _questionfactory.QuestionFactory.Instance.createQuestion(questionType, name);
	    };
	    QuestionMatrixDropdownModelBase.prototype.deleteRowValue = function (newValue, row) {
	        delete newValue[row.rowName];
	        return Object.keys(newValue).length == 0 ? null : newValue;
	    };
	    QuestionMatrixDropdownModelBase.prototype.onRowChanged = function (row, newRowValue) {
	        var newValue = this.createNewValue(this.value);
	        var rowValue = this.getRowValue(row, newValue, true);
	        for (var key in rowValue) {
	            delete rowValue[key];
	        }if (newRowValue) {
	            newRowValue = JSON.parse(JSON.stringify(newRowValue));
	            for (var key in newRowValue) {
	                rowValue[key] = newRowValue[key];
	            }
	        }
	        if (Object.keys(rowValue).length == 0) {
	            newValue = this.deleteRowValue(newValue, row);
	        }
	        this.isRowChanging = true;
	        this.setNewValue(newValue);
	        this.isRowChanging = false;
	    };
	    return QuestionMatrixDropdownModelBase;
	}(_question.Question);
	_jsonobject.JsonObject.metaData.addClass("matrixdropdowncolumn", ["name", { name: "title", onGetValue: function onGetValue(obj) {
	        return obj.titleValue;
	    } }, { name: "choices:itemvalues", onGetValue: function onGetValue(obj) {
	        return _base.ItemValue.getData(obj.choices);
	    }, onSetValue: function onSetValue(obj, value) {
	        obj.choices = value;
	    } }, "optionsCaption", { name: "cellType", default: "default", choices: ["default", "dropdown", "checkbox", "radiogroup", "text", "comment"] }, { name: "colCount", default: -1, choices: [-1, 0, 1, 2, 3, 4] }, "isRequired:boolean", "hasOther:boolean", "minWidth"], function () {
	    return new MatrixDropdownColumn("");
	});
	_jsonobject.JsonObject.metaData.addClass("matrixdropdownbase", [{ name: "columns:matrixdropdowncolumns", className: "matrixdropdowncolumn" }, "horizontalScroll:boolean", { name: "choices:itemvalues", onGetValue: function onGetValue(obj) {
	        return _base.ItemValue.getData(obj.choices);
	    }, onSetValue: function onSetValue(obj, value) {
	        obj.choices = value;
	    } }, { name: "optionsCaption", onGetValue: function onGetValue(obj) {
	        return obj.optionsCaptionValue;
	    } }, { name: "cellType", default: "dropdown", choices: ["dropdown", "checkbox", "radiogroup", "text", "comment"] }, { name: "columnColCount", default: 0, choices: [0, 1, 2, 3, 4] }, "columnMinWidth"], function () {
	    return new QuestionMatrixDropdownModelBase("");
	}, "question");
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {'use strict';
	
	exports.__esModule = true;
	exports.Question = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionbase = __webpack_require__(13);
	
	var _surveyStrings = __webpack_require__(6);
	
	var _error = __webpack_require__(5);
	
	var _validator = __webpack_require__(2);
	
	var _textPreProcessor = __webpack_require__(14);
	
	var Question = exports.Question = function (_super) {
	    __extends(Question, _super);
	    function Question(name) {
	        _super.call(this, name);
	        this.name = name;
	        this.titleValue = null;
	        this.isRequiredValue = false;
	        this.hasCommentValue = false;
	        this.hasOtherValue = false;
	        this.commentTextValue = "";
	        this.errors = [];
	        this.validators = new Array();
	        this.isValueChangedInSurvey = false;
	    }
	    Object.defineProperty(Question.prototype, "hasTitle", {
	        get: function get() {
	            return true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Question.prototype, "title", {
	        get: function get() {
	            return this.titleValue ? this.titleValue : this.name;
	        },
	        set: function set(newValue) {
	            this.titleValue = newValue;
	            this.fireCallback(this.titleChangedCallback);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Question.prototype, "processedTitle", {
	        get: function get() {
	            return this.survey != null ? this.survey.processText(this.title) : this.title;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Question.prototype, "fullTitle", {
	        get: function get() {
	            if (this.survey && this.survey.questionTitleTemplate) {
	                if (!this.textPreProcessor) {
	                    var self = this;
	                    this.textPreProcessor = new _textPreProcessor.TextPreProcessor();
	                    this.textPreProcessor.onHasValue = function (name) {
	                        return self.canProcessedTextValues(name.toLowerCase());
	                    };
	                    this.textPreProcessor.onProcess = function (name) {
	                        return self.getProcessedTextValue(name);
	                    };
	                }
	                return this.textPreProcessor.process(this.survey.questionTitleTemplate);
	            }
	            var requireText = this.requiredText;
	            if (requireText) requireText += " ";
	            var no = this.no;
	            if (no) no += ". ";
	            return no + requireText + this.processedTitle;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Question.prototype.canProcessedTextValues = function (name) {
	        return name == "no" || name == "title" || name == "require";
	    };
	    Question.prototype.getProcessedTextValue = function (name) {
	        if (name == "no") return this.no;
	        if (name == "title") return this.processedTitle;
	        if (name == "require") return this.requiredText;
	        return null;
	    };
	    Question.prototype.supportComment = function () {
	        return false;
	    };
	    Question.prototype.supportOther = function () {
	        return false;
	    };
	    Object.defineProperty(Question.prototype, "isRequired", {
	        get: function get() {
	            return this.isRequiredValue;
	        },
	        set: function set(val) {
	            if (this.isRequired == val) return;
	            this.isRequiredValue = val;
	            this.fireCallback(this.titleChangedCallback);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Question.prototype, "hasComment", {
	        get: function get() {
	            return this.hasCommentValue;
	        },
	        set: function set(val) {
	            if (!this.supportComment()) return;
	            this.hasCommentValue = val;
	            if (this.hasComment) this.hasOther = false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Question.prototype, "commentText", {
	        get: function get() {
	            return this.commentTextValue ? this.commentTextValue : _surveyStrings.surveyLocalization.getString("otherItemText");
	        },
	        set: function set(value) {
	            this.commentTextValue = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Question.prototype, "hasOther", {
	        get: function get() {
	            return this.hasOtherValue;
	        },
	        set: function set(val) {
	            if (!this.supportOther() || this.hasOther == val) return;
	            this.hasOtherValue = val;
	            if (this.hasOther) this.hasComment = false;
	            this.hasOtherChanged();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Question.prototype.hasOtherChanged = function () {};
	    Object.defineProperty(Question.prototype, "no", {
	        get: function get() {
	            if (this.visibleIndex < 0) return "";
	            var startIndex = 1;
	            var isNumeric = true;
	            var str = "";
	            if (this.survey && this.survey.questionStartIndex) {
	                str = this.survey.questionStartIndex;
	                if (parseInt(str)) startIndex = parseInt(str);else if (str.length == 1) isNumeric = false;
	            }
	            if (isNumeric) return (this.visibleIndex + startIndex).toString();
	            return String.fromCharCode(str.charCodeAt(0) + this.visibleIndex);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Question.prototype.onSetData = function () {
	        _super.prototype.onSetData.call(this);
	        this.onSurveyValueChanged(this.value);
	    };
	    Object.defineProperty(Question.prototype, "value", {
	        get: function get() {
	            return this.valueFromData(this.getValueCore());
	        },
	        set: function set(newValue) {
	            this.setNewValue(newValue);
	            this.fireCallback(this.valueChangedCallback);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Question.prototype, "comment", {
	        get: function get() {
	            return this.getComment();
	        },
	        set: function set(newValue) {
	            if (this.comment == newValue) return;
	            this.setComment(newValue);
	            this.fireCallback(this.commentChangedCallback);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Question.prototype.getComment = function () {
	        return this.data != null ? this.data.getComment(this.name) : this.questionComment;
	    };
	    Question.prototype.setComment = function (newValue) {
	        this.setNewComment(newValue);
	    };
	    Question.prototype.isEmpty = function () {
	        return this.value == null;
	    };
	    Question.prototype.hasErrors = function (fireCallback) {
	        if (fireCallback === void 0) {
	            fireCallback = true;
	        }
	        this.checkForErrors(fireCallback);
	        return this.errors.length > 0;
	    };
	    Object.defineProperty(Question.prototype, "requiredText", {
	        get: function get() {
	            return this.survey != null && this.isRequired ? this.survey.requiredText : "";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Question.prototype.checkForErrors = function (fireCallback) {
	        var errorLength = this.errors ? this.errors.length : 0;
	        this.errors = [];
	        this.onCheckForErrors(this.errors);
	        if (this.errors.length == 0 && this.value) {
	            var error = this.runValidators();
	            if (error) {
	                this.errors.push(error);
	            }
	        }
	        if (this.survey && this.errors.length == 0) {
	            var error = this.survey.validateQuestion(this.name);
	            if (error) {
	                this.errors.push(error);
	            }
	        }
	        if (fireCallback && (errorLength != this.errors.length || errorLength > 0)) {
	            this.fireCallback(this.errorsChangedCallback);
	        }
	    };
	    Question.prototype.onCheckForErrors = function (errors) {
	        if (this.hasRequiredError()) {
	            this.errors.push(new _error.AnswerRequiredError());
	        }
	    };
	    Question.prototype.hasRequiredError = function () {
	        return this.isRequired && this.isEmpty();
	    };
	    Question.prototype.runValidators = function () {
	        return new _validator.ValidatorRunner().run(this);
	    };
	    Question.prototype.setNewValue = function (newValue) {
	        this.setNewValueInData(newValue);
	        this.onValueChanged();
	    };
	    Question.prototype.setNewValueInData = function (newValue) {
	        if (!this.isValueChangedInSurvey) {
	            newValue = this.valueToData(newValue);
	            this.setValueCore(newValue);
	        }
	    };
	    Question.prototype.getValueCore = function () {
	        return this.data != null ? this.data.getValue(this.name) : this.questionValue;
	    };
	    Question.prototype.setValueCore = function (newValue) {
	        if (this.data != null) {
	            this.data.setValue(this.name, newValue);
	        } else {
	            this.questionValue = newValue;
	        }
	    };
	    Question.prototype.valueFromData = function (val) {
	        return val;
	    };
	    Question.prototype.valueToData = function (val) {
	        return val;
	    };
	    Question.prototype.onValueChanged = function () {};
	    Question.prototype.setNewComment = function (newValue) {
	        if (this.data != null) {
	            this.data.setComment(this.name, newValue);
	        } else this.questionComment = newValue;
	    };
	    //IQuestion
	    Question.prototype.onSurveyValueChanged = function (newValue) {
	        this.isValueChangedInSurvey = true;
	        this.value = this.valueFromData(newValue);
	        this.fireCallback(this.commentChangedCallback);
	        this.isValueChangedInSurvey = false;
	    };
	    //IValidatorOwner
	    Question.prototype.getValidatorTitle = function () {
	        return null;
	    };
	    return Question;
	}(_questionbase.QuestionBase);
	_jsonobject.JsonObject.metaData.addClass("question", [{ name: "title:text", onGetValue: function onGetValue(obj) {
	        return obj.titleValue;
	    } }, { name: "commentText", onGetValue: function onGetValue(obj) {
	        return obj.commentTextValue;
	    } }, "isRequired:boolean", { name: "validators:validators", baseClassName: "surveyvalidator", classNamePart: "validator" }], null, "questionbase");
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {'use strict';
	
	exports.__esModule = true;
	exports.QuestionBase = undefined;
	
	var _base = __webpack_require__(4);
	
	var _jsonobject = __webpack_require__(7);
	
	var _conditions = __webpack_require__(9);
	
	var QuestionBase = exports.QuestionBase = function (_super) {
	    __extends(QuestionBase, _super);
	    function QuestionBase(name) {
	        _super.call(this);
	        this.name = name;
	        this.conditionRunner = null;
	        this.visibleIf = "";
	        this.visibleValue = true;
	        this.startWithNewLine = true;
	        this.visibleIndexValue = -1;
	        this.width = "";
	        this.renderWidthValue = "";
	        this.rightIndentValue = 0;
	        this.indent = 0;
	        this.idValue = QuestionBase.getQuestionId();
	        this.onCreating();
	    }
	    QuestionBase.getQuestionId = function () {
	        return "sq_" + QuestionBase.questionCounter++;
	    };
	    Object.defineProperty(QuestionBase.prototype, "visible", {
	        get: function get() {
	            return this.visibleValue;
	        },
	        set: function set(val) {
	            if (val == this.visible) return;
	            this.visibleValue = val;
	            this.fireCallback(this.visibilityChangedCallback);
	            this.fireCallback(this.rowVisibilityChangedCallback);
	            if (this.survey) {
	                this.survey.questionVisibilityChanged(this, this.visible);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionBase.prototype, "visibleIndex", {
	        get: function get() {
	            return this.visibleIndexValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionBase.prototype.hasErrors = function (fireCallback) {
	        if (fireCallback === void 0) {
	            fireCallback = true;
	        }
	        return false;
	    };
	    Object.defineProperty(QuestionBase.prototype, "hasTitle", {
	        get: function get() {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionBase.prototype, "hasComment", {
	        get: function get() {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionBase.prototype, "id", {
	        get: function get() {
	            return this.idValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionBase.prototype, "renderWidth", {
	        get: function get() {
	            return this.renderWidthValue;
	        },
	        set: function set(val) {
	            if (val == this.renderWidth) return;
	            this.renderWidthValue = val;
	            this.fireCallback(this.renderWidthChangedCallback);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionBase.prototype, "rightIndent", {
	        get: function get() {
	            return this.rightIndentValue;
	        },
	        set: function set(val) {
	            if (val == this.rightIndent) return;
	            this.rightIndentValue = val;
	            this.fireCallback(this.renderWidthChangedCallback);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionBase.prototype.focus = function () {
	        var el = document.getElementById(this.id);
	        if (!el || !el.scrollIntoView) return;
	        var elemTop = el.getBoundingClientRect().top;
	        if (elemTop < 0) {
	            el.scrollIntoView();
	            this.fireCallback(this.focusCallback);
	        }
	    };
	    QuestionBase.prototype.setData = function (newValue) {
	        this.data = newValue;
	        this.survey = newValue && newValue["questionAdded"] ? newValue : null;
	        this.onSetData();
	    };
	    QuestionBase.prototype.fireCallback = function (callback) {
	        if (callback) callback();
	    };
	    QuestionBase.prototype.onSetData = function () {};
	    QuestionBase.prototype.onCreating = function () {};
	    QuestionBase.prototype.runCondition = function (values) {
	        if (!this.visibleIf) return;
	        if (!this.conditionRunner) this.conditionRunner = new _conditions.ConditionRunner(this.visibleIf);
	        this.conditionRunner.expression = this.visibleIf;
	        this.visible = this.conditionRunner.run(values);
	    };
	    //IQuestion
	    QuestionBase.prototype.onSurveyValueChanged = function (newValue) {};
	    QuestionBase.prototype.onSurveyLoad = function () {};
	    QuestionBase.prototype.setVisibleIndex = function (value) {
	        if (this.visibleIndexValue == value) return;
	        this.visibleIndexValue = value;
	        this.fireCallback(this.visibleIndexChangedCallback);
	    };
	    QuestionBase.prototype.supportGoNextPageAutomatic = function () {
	        return false;
	    };
	    QuestionBase.questionCounter = 100;
	    return QuestionBase;
	}(_base.Base);
	_jsonobject.JsonObject.metaData.addClass("questionbase", ["!name", { name: "visible:boolean", default: true }, "visibleIf:text", { name: "width" }, { name: "startWithNewLine:boolean", default: true }, { name: "indent:number", default: 0, choices: [0, 1, 2, 3] }]);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var TextPreProcessorItem = exports.TextPreProcessorItem = function () {
	    function TextPreProcessorItem() {}
	    return TextPreProcessorItem;
	}();
	var TextPreProcessor = exports.TextPreProcessor = function () {
	    function TextPreProcessor() {}
	    TextPreProcessor.prototype.process = function (text) {
	        if (!text) return text;
	        if (!this.onProcess) return text;
	        var items = this.getItems(text);
	        for (var i = items.length - 1; i >= 0; i--) {
	            var item = items[i];
	            var name = this.getName(text.substring(item.start + 1, item.end));
	            if (!this.canProcessName(name)) continue;
	            if (this.onHasValue && !this.onHasValue(name)) continue;
	            var value = this.onProcess(name);
	            if (value == null) value = "";
	            text = text.substr(0, item.start) + value + text.substr(item.end + 1);
	        }
	        return text;
	    };
	    TextPreProcessor.prototype.getItems = function (text) {
	        var items = [];
	        var length = text.length;
	        var start = -1;
	        var ch = '';
	        for (var i = 0; i < length; i++) {
	            ch = text[i];
	            if (ch == '{') start = i;
	            if (ch == '}') {
	                if (start > -1) {
	                    var item = new TextPreProcessorItem();
	                    item.start = start;
	                    item.end = i;
	                    items.push(item);
	                }
	                start = -1;
	            }
	        }
	        return items;
	    };
	    TextPreProcessor.prototype.getName = function (name) {
	        if (!name) return;
	        return name.trim();
	    };
	    TextPreProcessor.prototype.canProcessName = function (name) {
	        if (!name) return false;
	        for (var i = 0; i < name.length; i++) {
	            var ch = name[i];
	            //TODO
	            if (ch == ' ' || ch == '-' || ch == '&') return false;
	        }
	        return true;
	    };
	    return TextPreProcessor;
	}();

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionCheckboxBase = exports.QuestionSelectBase = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _question = __webpack_require__(12);
	
	var _base = __webpack_require__(4);
	
	var _surveyStrings = __webpack_require__(6);
	
	var _error = __webpack_require__(5);
	
	var _choicesRestfull = __webpack_require__(8);
	
	var QuestionSelectBase = exports.QuestionSelectBase = function (_super) {
	    __extends(QuestionSelectBase, _super);
	    function QuestionSelectBase(name) {
	        _super.call(this, name);
	        this.otherItem = new _base.ItemValue("other", _surveyStrings.surveyLocalization.getString("otherItemText"));
	        this.choicesFromUrl = null;
	        this.choicesValues = new Array();
	        this.otherErrorText = null;
	        this.storeOthersAsComment = true;
	        this.choicesOrderValue = "none";
	        this.isSettingComment = false;
	        this.choicesByUrl = this.createRestfull();
	        var self = this;
	        this.choicesByUrl.getResultCallback = function (items) {
	            self.onLoadChoicesFromUrl(items);
	        };
	    }
	    Object.defineProperty(QuestionSelectBase.prototype, "isOtherSelected", {
	        get: function get() {
	            return this.getStoreOthersAsComment() ? this.getHasOther(this.value) : this.getHasOther(this.cachedValue);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionSelectBase.prototype.getHasOther = function (val) {
	        return val == this.otherItem.value;
	    };
	    QuestionSelectBase.prototype.createRestfull = function () {
	        return new _choicesRestfull.ChoicesRestfull();
	    };
	    QuestionSelectBase.prototype.getComment = function () {
	        if (this.getStoreOthersAsComment()) return _super.prototype.getComment.call(this);
	        return this.commentValue;
	    };
	    QuestionSelectBase.prototype.setComment = function (newValue) {
	        if (this.getStoreOthersAsComment()) _super.prototype.setComment.call(this, newValue);else {
	            if (!this.isSettingComment && newValue != this.commentValue) {
	                this.isSettingComment = true;
	                this.commentValue = newValue;
	                if (this.isOtherSelected) {
	                    this.setNewValueInData(this.cachedValue);
	                }
	                this.isSettingComment = false;
	            }
	        }
	    };
	    QuestionSelectBase.prototype.valueFromData = function (val) {
	        if (this.getStoreOthersAsComment()) return _super.prototype.valueFromData.call(this, val);
	        this.cachedValue = this.valueFromDataCore(val);
	        return this.cachedValue;
	    };
	    QuestionSelectBase.prototype.valueToData = function (val) {
	        if (this.getStoreOthersAsComment()) return _super.prototype.valueToData.call(this, val);
	        this.cachedValue = val;
	        return this.valueToDataCore(val);
	    };
	    QuestionSelectBase.prototype.valueFromDataCore = function (val) {
	        if (!this.hasUnknownValue(val)) return val;
	        if (val == this.otherItem.value) return val;
	        this.comment = val;
	        return this.otherItem.value;
	    };
	    QuestionSelectBase.prototype.valueToDataCore = function (val) {
	        if (val == this.otherItem.value && this.getComment()) {
	            val = this.getComment();
	        }
	        return val;
	    };
	    QuestionSelectBase.prototype.hasUnknownValue = function (val) {
	        if (!val) return false;
	        var items = this.activeChoices;
	        for (var i = 0; i < items.length; i++) {
	            if (items[i].value == val) return false;
	        }
	        return true;
	    };
	    Object.defineProperty(QuestionSelectBase.prototype, "choices", {
	        get: function get() {
	            return this.choicesValues;
	        },
	        set: function set(newValue) {
	            _base.ItemValue.setData(this.choicesValues, newValue);
	            this.fireCallback(this.choicesChangedCallback);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionSelectBase.prototype.hasOtherChanged = function () {
	        this.fireCallback(this.choicesChangedCallback);
	    };
	    Object.defineProperty(QuestionSelectBase.prototype, "choicesOrder", {
	        get: function get() {
	            return this.choicesOrderValue;
	        },
	        set: function set(newValue) {
	            if (newValue == this.choicesOrderValue) return;
	            this.choicesOrderValue = newValue;
	            this.fireCallback(this.choicesChangedCallback);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionSelectBase.prototype, "otherText", {
	        get: function get() {
	            return this.otherItem.text;
	        },
	        set: function set(value) {
	            this.otherItem.text = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionSelectBase.prototype, "visibleChoices", {
	        get: function get() {
	            if (!this.hasOther && this.choicesOrder == "none") return this.activeChoices;
	            var result = this.sortVisibleChoices(this.activeChoices.slice());
	            if (this.hasOther) {
	                result.push(this.otherItem);
	            }
	            return result;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionSelectBase.prototype, "activeChoices", {
	        get: function get() {
	            return this.choicesFromUrl ? this.choicesFromUrl : this.choices;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionSelectBase.prototype.supportComment = function () {
	        return true;
	    };
	    QuestionSelectBase.prototype.supportOther = function () {
	        return true;
	    };
	    QuestionSelectBase.prototype.onCheckForErrors = function (errors) {
	        _super.prototype.onCheckForErrors.call(this, errors);
	        if (!this.isOtherSelected || this.comment) return;
	        var text = this.otherErrorText;
	        if (!text) {
	            text = _surveyStrings.surveyLocalization.getString("otherRequiredError");
	        }
	        errors.push(new _error.CustomError(text));
	    };
	    QuestionSelectBase.prototype.getStoreOthersAsComment = function () {
	        return this.storeOthersAsComment && (this.survey != null ? this.survey.storeOthersAsComment : true);
	    };
	    QuestionSelectBase.prototype.onSurveyLoad = function () {
	        if (this.choicesByUrl) this.choicesByUrl.run();
	    };
	    QuestionSelectBase.prototype.onLoadChoicesFromUrl = function (array) {
	        var errorCount = this.errors.length;
	        this.errors = [];
	        if (this.choicesByUrl && this.choicesByUrl.error) {
	            this.errors.push(this.choicesByUrl.error);
	        }
	        if (errorCount > 0 || this.errors.length > 0) {
	            this.fireCallback(this.errorsChangedCallback);
	        }
	        var newChoices = null;
	        if (array && array.length > 0) {
	            newChoices = new Array();
	            _base.ItemValue.setData(newChoices, array);
	        }
	        this.choicesFromUrl = newChoices;
	        this.fireCallback(this.choicesChangedCallback);
	    };
	    QuestionSelectBase.prototype.sortVisibleChoices = function (array) {
	        var order = this.choicesOrder.toLowerCase();
	        if (order == "asc") return this.sortArray(array, 1);
	        if (order == "desc") return this.sortArray(array, -1);
	        if (order == "random") return this.randomizeArray(array);
	        return array;
	    };
	    QuestionSelectBase.prototype.sortArray = function (array, mult) {
	        return array.sort(function (a, b) {
	            if (a.text < b.text) return -1 * mult;
	            if (a.text > b.text) return 1 * mult;
	            return 0;
	        });
	    };
	    QuestionSelectBase.prototype.randomizeArray = function (array) {
	        for (var i = array.length - 1; i > 0; i--) {
	            var j = Math.floor(Math.random() * (i + 1));
	            var temp = array[i];
	            array[i] = array[j];
	            array[j] = temp;
	        }
	        return array;
	    };
	    return QuestionSelectBase;
	}(_question.Question);
	var QuestionCheckboxBase = exports.QuestionCheckboxBase = function (_super) {
	    __extends(QuestionCheckboxBase, _super);
	    function QuestionCheckboxBase(name) {
	        _super.call(this, name);
	        this.name = name;
	        this.colCountValue = 1;
	    }
	    Object.defineProperty(QuestionCheckboxBase.prototype, "colCount", {
	        get: function get() {
	            return this.colCountValue;
	        },
	        set: function set(value) {
	            if (value < 0 || value > 4) return;
	            this.colCountValue = value;
	            this.fireCallback(this.colCountChangedCallback);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return QuestionCheckboxBase;
	}(QuestionSelectBase);
	_jsonobject.JsonObject.metaData.addClass("selectbase", ["hasComment:boolean", "hasOther:boolean", { name: "choices:itemvalues", onGetValue: function onGetValue(obj) {
	        return _base.ItemValue.getData(obj.choices);
	    }, onSetValue: function onSetValue(obj, value) {
	        obj.choices = value;
	    } }, { name: "choicesOrder", default: "none", choices: ["none", "asc", "desc", "random"] }, { name: "choicesByUrl:restfull", className: "ChoicesRestfull", onGetValue: function onGetValue(obj) {
	        return obj.choicesByUrl.isEmpty ? null : obj.choicesByUrl;
	    }, onSetValue: function onSetValue(obj, value) {
	        obj.choicesByUrl.setData(value);
	    } }, { name: "otherText", default: _surveyStrings.surveyLocalization.getString("otherItemText") }, "otherErrorText", { name: "storeOthersAsComment:boolean", default: true }], null, "question");
	_jsonobject.JsonObject.metaData.addClass("checkboxbase", [{ name: "colCount:number", default: 1, choices: [0, 1, 2, 3, 4] }], null, "selectbase");
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 16 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var QuestionFactory = exports.QuestionFactory = function () {
	    function QuestionFactory() {
	        this.creatorHash = {};
	    }
	    QuestionFactory.prototype.registerQuestion = function (questionType, questionCreator) {
	        this.creatorHash[questionType] = questionCreator;
	    };
	    QuestionFactory.prototype.getAllTypes = function () {
	        var result = new Array();
	        for (var key in this.creatorHash) {
	            result.push(key);
	        }
	        return result.sort();
	    };
	    QuestionFactory.prototype.createQuestion = function (questionType, name) {
	        var creator = this.creatorHash[questionType];
	        if (creator == null) return null;
	        return creator(name);
	    };
	    QuestionFactory.Instance = new QuestionFactory();
	    QuestionFactory.DefaultChoices = ["one", "two|second value", "three|third value"];
	    return QuestionFactory;
	}();

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMatrixDropdownModel = exports.MatrixDropdownRowModel = undefined;
	
	var _question_matrixdropdownbase = __webpack_require__(11);
	
	var _jsonobject = __webpack_require__(7);
	
	var _base = __webpack_require__(4);
	
	var _questionfactory = __webpack_require__(16);
	
	var MatrixDropdownRowModel = exports.MatrixDropdownRowModel = function (_super) {
	    __extends(MatrixDropdownRowModel, _super);
	    function MatrixDropdownRowModel(name, text, data, value) {
	        _super.call(this, data, value);
	        this.name = name;
	        this.text = text;
	    }
	    Object.defineProperty(MatrixDropdownRowModel.prototype, "rowName", {
	        get: function get() {
	            return this.name;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return MatrixDropdownRowModel;
	}(_question_matrixdropdownbase.MatrixDropdownRowModelBase);
	var QuestionMatrixDropdownModel = exports.QuestionMatrixDropdownModel = function (_super) {
	    __extends(QuestionMatrixDropdownModel, _super);
	    function QuestionMatrixDropdownModel(name) {
	        _super.call(this, name);
	        this.name = name;
	        this.rowsValue = [];
	    }
	    QuestionMatrixDropdownModel.prototype.getType = function () {
	        return "matrixdropdown";
	    };
	    Object.defineProperty(QuestionMatrixDropdownModel.prototype, "rows", {
	        get: function get() {
	            return this.rowsValue;
	        },
	        set: function set(newValue) {
	            _base.ItemValue.setData(this.rowsValue, newValue);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionMatrixDropdownModel.prototype.generateRows = function () {
	        var result = new Array();
	        if (!this.rows || this.rows.length === 0) return result;
	        var val = this.value;
	        if (!val) val = {};
	        for (var i = 0; i < this.rows.length; i++) {
	            if (!this.rows[i].value) continue;
	            result.push(this.createMatrixRow(this.rows[i].value, this.rows[i].text, val[this.rows[i].value]));
	        }
	        return result;
	    };
	    QuestionMatrixDropdownModel.prototype.createMatrixRow = function (name, text, value) {
	        return new MatrixDropdownRowModel(name, text, this, value);
	    };
	    return QuestionMatrixDropdownModel;
	}(_question_matrixdropdownbase.QuestionMatrixDropdownModelBase);
	_jsonobject.JsonObject.metaData.addClass("matrixdropdown", [{ name: "rows:itemvalues", onGetValue: function onGetValue(obj) {
	        return _base.ItemValue.getData(obj.rows);
	    }, onSetValue: function onSetValue(obj, value) {
	        obj.rows = value;
	    } }], function () {
	    return new QuestionMatrixDropdownModel("");
	}, "matrixdropdownbase");
	_questionfactory.QuestionFactory.Instance.registerQuestion("matrixdropdown", function (name) {
	    var q = new QuestionMatrixDropdownModel(name);q.choices = [1, 2, 3, 4, 5];q.rows = ["Row 1", "Row 2"];q.addColumn("Column 1");q.addColumn("Column 2");q.addColumn("Column 3");return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMatrixDynamicModel = exports.MatrixDynamicRowModel = undefined;
	
	var _question_matrixdropdownbase = __webpack_require__(11);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var _surveyStrings = __webpack_require__(6);
	
	var _error = __webpack_require__(5);
	
	var MatrixDynamicRowModel = exports.MatrixDynamicRowModel = function (_super) {
	    __extends(MatrixDynamicRowModel, _super);
	    function MatrixDynamicRowModel(index, data, value) {
	        _super.call(this, data, value);
	        this.index = index;
	    }
	    Object.defineProperty(MatrixDynamicRowModel.prototype, "rowName", {
	        get: function get() {
	            return "row" + this.index;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return MatrixDynamicRowModel;
	}(_question_matrixdropdownbase.MatrixDropdownRowModelBase);
	var QuestionMatrixDynamicModel = exports.QuestionMatrixDynamicModel = function (_super) {
	    __extends(QuestionMatrixDynamicModel, _super);
	    function QuestionMatrixDynamicModel(name) {
	        _super.call(this, name);
	        this.name = name;
	        this.rowCounter = 0;
	        this.rowCountValue = 2;
	        this.addRowTextValue = null;
	        this.removeRowTextValue = null;
	        this.minRowCount = 0;
	    }
	    QuestionMatrixDynamicModel.prototype.getType = function () {
	        return "matrixdynamic";
	    };
	    Object.defineProperty(QuestionMatrixDynamicModel.prototype, "rowCount", {
	        get: function get() {
	            return this.rowCountValue;
	        },
	        set: function set(val) {
	            if (val < 0 || val > QuestionMatrixDynamicModel.MaxRowCount) return;
	            this.rowCountValue = val;
	            if (this.value && this.value.length > val) {
	                var qVal = this.value;
	                qVal.splice(val);
	                this.value = qVal;
	            }
	            this.fireCallback(this.rowCountChangedCallback);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionMatrixDynamicModel.prototype.addRow = function () {
	        if (this.generatedVisibleRows) {
	            this.generatedVisibleRows.push(this.createMatrixRow(null));
	        }
	        this.rowCount++;
	    };
	    QuestionMatrixDynamicModel.prototype.removeRow = function (index) {
	        if (index < 0 || index >= this.rowCount) return;
	        if (this.generatedVisibleRows && index < this.generatedVisibleRows.length) {
	            this.generatedVisibleRows.splice(index, 1);
	        }
	        if (this.value) {
	            var val = this.createNewValue(this.value);
	            val.splice(index, 1);
	            val = this.deleteRowValue(val, null);
	            this.value = val;
	        }
	        this.rowCount--;
	    };
	    Object.defineProperty(QuestionMatrixDynamicModel.prototype, "addRowText", {
	        get: function get() {
	            return this.addRowTextValue ? this.addRowTextValue : _surveyStrings.surveyLocalization.getString("addRow");
	        },
	        set: function set(value) {
	            this.addRowTextValue = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionMatrixDynamicModel.prototype, "removeRowText", {
	        get: function get() {
	            return this.removeRowTextValue ? this.removeRowTextValue : _surveyStrings.surveyLocalization.getString("removeRow");
	        },
	        set: function set(value) {
	            this.removeRowTextValue = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionMatrixDynamicModel.prototype, "cachedVisibleRows", {
	        get: function get() {
	            if (this.generatedVisibleRows && this.generatedVisibleRows.length == this.rowCount) return this.generatedVisibleRows;
	            return this.visibleRows;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionMatrixDynamicModel.prototype.onCheckForErrors = function (errors) {
	        _super.prototype.onCheckForErrors.call(this, errors);
	        if (this.hasErrorInRows()) {
	            errors.push(new _error.CustomError(_surveyStrings.surveyLocalization.getString("minRowCountError")["format"](this.minRowCount)));
	        }
	    };
	    QuestionMatrixDynamicModel.prototype.hasErrorInRows = function () {
	        if (this.minRowCount <= 0 || !this.generatedVisibleRows) return false;
	        var res = false;
	        var setRowCount = 0;
	        for (var rowIndex = 0; rowIndex < this.generatedVisibleRows.length; rowIndex++) {
	            var row = this.generatedVisibleRows[rowIndex];
	            if (!row.isEmpty) setRowCount++;
	        }
	        return setRowCount < this.minRowCount;
	    };
	    QuestionMatrixDynamicModel.prototype.generateRows = function () {
	        var result = new Array();
	        if (this.rowCount === 0) return result;
	        var val = this.createNewValue(this.value);
	        for (var i = 0; i < this.rowCount; i++) {
	            result.push(this.createMatrixRow(this.getRowValueByIndex(val, i)));
	        }
	        return result;
	    };
	    QuestionMatrixDynamicModel.prototype.createMatrixRow = function (value) {
	        return new MatrixDynamicRowModel(this.rowCounter++, this, value);
	    };
	    QuestionMatrixDynamicModel.prototype.createNewValue = function (curValue) {
	        var result = curValue;
	        if (!result) result = [];
	        var r = [];
	        if (result.length > this.rowCount) result.splice(this.rowCount - 1);
	        for (var i = result.length; i < this.rowCount; i++) {
	            result.push({});
	        }
	        return result;
	    };
	    QuestionMatrixDynamicModel.prototype.deleteRowValue = function (newValue, row) {
	        var isEmpty = true;
	        for (var i = 0; i < newValue.length; i++) {
	            if (Object.keys(newValue[i]).length > 0) {
	                isEmpty = false;
	                break;
	            }
	        }
	        return isEmpty ? null : newValue;
	    };
	    QuestionMatrixDynamicModel.prototype.getRowValueByIndex = function (questionValue, index) {
	        return index >= 0 && index < questionValue.length ? questionValue[index] : null;
	    };
	    QuestionMatrixDynamicModel.prototype.getRowValue = function (row, questionValue, create) {
	        if (create === void 0) {
	            create = false;
	        }
	        return this.getRowValueByIndex(questionValue, this.generatedVisibleRows.indexOf(row));
	    };
	    QuestionMatrixDynamicModel.MaxRowCount = 100;
	    return QuestionMatrixDynamicModel;
	}(_question_matrixdropdownbase.QuestionMatrixDropdownModelBase);
	_jsonobject.JsonObject.metaData.addClass("matrixdynamic", [{ name: "rowCount:number", default: 2 }, { name: "minRowCount:number", default: 0 }, { name: "addRowText", onGetValue: function onGetValue(obj) {
	        return obj.addRowTextValue;
	    } }, { name: "removeRowText", onGetValue: function onGetValue(obj) {
	        return obj.removeRowTextValue;
	    } }], function () {
	    return new QuestionMatrixDynamicModel("");
	}, "matrixdropdownbase");
	_questionfactory.QuestionFactory.Instance.registerQuestion("matrixdynamic", function (name) {
	    var q = new QuestionMatrixDynamicModel(name);q.choices = [1, 2, 3, 4, 5];q.addColumn("Column 1");q.addColumn("Column 2");q.addColumn("Column 3");return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMatrixModel = exports.MatrixRowModel = undefined;
	
	var _base = __webpack_require__(4);
	
	var _question = __webpack_require__(12);
	
	var _jsonobject = __webpack_require__(7);
	
	var _surveyStrings = __webpack_require__(6);
	
	var _error = __webpack_require__(5);
	
	var _questionfactory = __webpack_require__(16);
	
	var MatrixRowModel = exports.MatrixRowModel = function (_super) {
	    __extends(MatrixRowModel, _super);
	    function MatrixRowModel(name, text, fullName, data, value) {
	        _super.call(this);
	        this.name = name;
	        this.text = text;
	        this.fullName = fullName;
	        this.data = data;
	        this.rowValue = value;
	    }
	    Object.defineProperty(MatrixRowModel.prototype, "value", {
	        get: function get() {
	            return this.rowValue;
	        },
	        set: function set(newValue) {
	            this.rowValue = newValue;
	            if (this.data) this.data.onMatrixRowChanged(this);
	            this.onValueChanged();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MatrixRowModel.prototype.onValueChanged = function () {};
	    return MatrixRowModel;
	}(_base.Base);
	var QuestionMatrixModel = exports.QuestionMatrixModel = function (_super) {
	    __extends(QuestionMatrixModel, _super);
	    function QuestionMatrixModel(name) {
	        _super.call(this, name);
	        this.name = name;
	        this.columnsValue = [];
	        this.rowsValue = [];
	        this.isRowChanging = false;
	        this.isAllRowRequired = false;
	    }
	    QuestionMatrixModel.prototype.getType = function () {
	        return "matrix";
	    };
	    Object.defineProperty(QuestionMatrixModel.prototype, "hasRows", {
	        get: function get() {
	            return this.rowsValue.length > 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionMatrixModel.prototype, "columns", {
	        get: function get() {
	            return this.columnsValue;
	        },
	        set: function set(newValue) {
	            _base.ItemValue.setData(this.columnsValue, newValue);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionMatrixModel.prototype, "rows", {
	        get: function get() {
	            return this.rowsValue;
	        },
	        set: function set(newValue) {
	            _base.ItemValue.setData(this.rowsValue, newValue);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionMatrixModel.prototype, "visibleRows", {
	        get: function get() {
	            var result = new Array();
	            var val = this.value;
	            if (!val) val = {};
	            for (var i = 0; i < this.rows.length; i++) {
	                if (!this.rows[i].value) continue;
	                result.push(this.createMatrixRow(this.rows[i].value, this.rows[i].text, this.name + '_' + this.rows[i].value.toString(), val[this.rows[i].value]));
	            }
	            if (result.length == 0) {
	                result.push(this.createMatrixRow(null, "", this.name, val));
	            }
	            this.generatedVisibleRows = result;
	            return result;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionMatrixModel.prototype.onCheckForErrors = function (errors) {
	        _super.prototype.onCheckForErrors.call(this, errors);
	        if (this.hasErrorInRows()) {
	            this.errors.push(new _error.CustomError(_surveyStrings.surveyLocalization.getString("requiredInAllRowsError")));
	        }
	    };
	    QuestionMatrixModel.prototype.hasErrorInRows = function () {
	        if (!this.isAllRowRequired) return false;
	        var rows = this.generatedVisibleRows;
	        if (!rows) rows = this.visibleRows;
	        if (!rows) return false;
	        for (var i = 0; i < rows.length; i++) {
	            var val = rows[i].value;
	            if (!val) return true;
	        }
	        return false;
	    };
	    QuestionMatrixModel.prototype.createMatrixRow = function (name, text, fullName, value) {
	        return new MatrixRowModel(name, text, fullName, this, value);
	    };
	    QuestionMatrixModel.prototype.onValueChanged = function () {
	        if (this.isRowChanging || !this.generatedVisibleRows || this.generatedVisibleRows.length == 0) return;
	        this.isRowChanging = true;
	        var val = this.value;
	        if (!val) val = {};
	        if (this.rows.length == 0) {
	            this.generatedVisibleRows[0].value = val;
	        } else {
	            for (var i = 0; i < this.generatedVisibleRows.length; i++) {
	                var row = this.generatedVisibleRows[i];
	                var rowVal = val[row.name] ? val[row.name] : null;
	                this.generatedVisibleRows[i].value = rowVal;
	            }
	        }
	        this.isRowChanging = false;
	    };
	    //IMatrixData
	    QuestionMatrixModel.prototype.onMatrixRowChanged = function (row) {
	        if (this.isRowChanging) return;
	        this.isRowChanging = true;
	        if (!this.hasRows) {
	            this.setNewValue(row.value);
	        } else {
	            var newValue = this.value;
	            if (!newValue) {
	                newValue = {};
	            }
	            newValue[row.name] = row.value;
	            this.setNewValue(newValue);
	        }
	        this.isRowChanging = false;
	    };
	    return QuestionMatrixModel;
	}(_question.Question);
	_jsonobject.JsonObject.metaData.addClass("matrix", [{ name: "columns:itemvalues", onGetValue: function onGetValue(obj) {
	        return _base.ItemValue.getData(obj.columns);
	    }, onSetValue: function onSetValue(obj, value) {
	        obj.columns = value;
	    } }, { name: "rows:itemvalues", onGetValue: function onGetValue(obj) {
	        return _base.ItemValue.getData(obj.rows);
	    }, onSetValue: function onSetValue(obj, value) {
	        obj.rows = value;
	    } }], function () {
	    return new QuestionMatrixModel("");
	}, "question");
	_questionfactory.QuestionFactory.Instance.registerQuestion("matrix", function (name) {
	    var q = new QuestionMatrixModel(name);q.rows = ["Row 1", "Row 2"];q.columns = ["Column 1", "Column 2", "Column 3"];return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMultipleTextModel = exports.MultipleTextItemModel = undefined;
	
	var _base = __webpack_require__(4);
	
	var _validator = __webpack_require__(2);
	
	var _question = __webpack_require__(12);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var MultipleTextItemModel = exports.MultipleTextItemModel = function (_super) {
	    __extends(MultipleTextItemModel, _super);
	    function MultipleTextItemModel(name, title) {
	        if (name === void 0) {
	            name = null;
	        }
	        if (title === void 0) {
	            title = null;
	        }
	        _super.call(this);
	        this.name = name;
	        this.validators = new Array();
	        this.title = title;
	    }
	    MultipleTextItemModel.prototype.getType = function () {
	        return "multipletextitem";
	    };
	    MultipleTextItemModel.prototype.setData = function (data) {
	        this.data = data;
	    };
	    Object.defineProperty(MultipleTextItemModel.prototype, "title", {
	        get: function get() {
	            return this.titleValue ? this.titleValue : this.name;
	        },
	        set: function set(newText) {
	            this.titleValue = newText;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(MultipleTextItemModel.prototype, "value", {
	        get: function get() {
	            return this.data ? this.data.getMultipleTextValue(this.name) : null;
	        },
	        set: function set(value) {
	            if (this.data != null) {
	                this.data.setMultipleTextValue(this.name, value);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    MultipleTextItemModel.prototype.onValueChanged = function (newValue) {};
	    //IValidatorOwner
	    MultipleTextItemModel.prototype.getValidatorTitle = function () {
	        return this.title;
	    };
	    return MultipleTextItemModel;
	}(_base.Base);
	var QuestionMultipleTextModel = exports.QuestionMultipleTextModel = function (_super) {
	    __extends(QuestionMultipleTextModel, _super);
	    function QuestionMultipleTextModel(name) {
	        _super.call(this, name);
	        this.name = name;
	        this.colCountValue = 1;
	        this.itemSize = 25;
	        this.itemsValues = new Array();
	        this.isMultipleItemValueChanging = false;
	        var self = this;
	        this.items.push = function (value) {
	            value.setData(self);
	            var result = Array.prototype.push.call(this, value);
	            self.fireCallback(self.colCountChangedCallback);
	            return result;
	        };
	    }
	    QuestionMultipleTextModel.prototype.getType = function () {
	        return "multipletext";
	    };
	    Object.defineProperty(QuestionMultipleTextModel.prototype, "items", {
	        get: function get() {
	            return this.itemsValues;
	        },
	        set: function set(value) {
	            this.itemsValues = value;
	            this.fireCallback(this.colCountChangedCallback);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionMultipleTextModel.prototype.AddItem = function (name, title) {
	        if (title === void 0) {
	            title = null;
	        }
	        var item = this.createTextItem(name, title);
	        this.items.push(item);
	        return item;
	    };
	    Object.defineProperty(QuestionMultipleTextModel.prototype, "colCount", {
	        get: function get() {
	            return this.colCountValue;
	        },
	        set: function set(value) {
	            if (value < 1 || value > 4) return;
	            this.colCountValue = value;
	            this.fireCallback(this.colCountChangedCallback);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionMultipleTextModel.prototype.getRows = function () {
	        var colCount = this.colCount;
	        var items = this.items;
	        var rows = [];
	        var index = 0;
	        for (var i = 0; i < items.length; i++) {
	            if (index == 0) {
	                rows.push([]);
	            }
	            rows[rows.length - 1].push(items[i]);
	            index++;
	            if (index >= colCount) {
	                index = 0;
	            }
	        }
	        return rows;
	    };
	    QuestionMultipleTextModel.prototype.onValueChanged = function () {
	        _super.prototype.onValueChanged.call(this);
	        this.onItemValueChanged();
	    };
	    QuestionMultipleTextModel.prototype.createTextItem = function (name, title) {
	        return new MultipleTextItemModel(name, title);
	    };
	    QuestionMultipleTextModel.prototype.onItemValueChanged = function () {
	        if (this.isMultipleItemValueChanging) return;
	        for (var i = 0; i < this.items.length; i++) {
	            var itemValue = null;
	            if (this.value && this.items[i].name in this.value) {
	                itemValue = this.value[this.items[i].name];
	            }
	            this.items[i].onValueChanged(itemValue);
	        }
	    };
	    QuestionMultipleTextModel.prototype.runValidators = function () {
	        var error = _super.prototype.runValidators.call(this);
	        if (error != null) return error;
	        for (var i = 0; i < this.items.length; i++) {
	            error = new _validator.ValidatorRunner().run(this.items[i]);
	            if (error != null) return error;
	        }
	        return null;
	    };
	    //IMultipleTextData
	    QuestionMultipleTextModel.prototype.getMultipleTextValue = function (name) {
	        if (!this.value) return null;
	        return this.value[name];
	    };
	    QuestionMultipleTextModel.prototype.setMultipleTextValue = function (name, value) {
	        this.isMultipleItemValueChanging = true;
	        var newValue = this.value;
	        if (!newValue) {
	            newValue = {};
	        }
	        newValue[name] = value;
	        this.setNewValue(newValue);
	        this.isMultipleItemValueChanging = false;
	    };
	    return QuestionMultipleTextModel;
	}(_question.Question);
	_jsonobject.JsonObject.metaData.addClass("multipletextitem", ["name", { name: "title", onGetValue: function onGetValue(obj) {
	        return obj.titleValue;
	    } }, { name: "validators:validators", baseClassName: "surveyvalidator", classNamePart: "validator" }], function () {
	    return new MultipleTextItemModel("");
	});
	_jsonobject.JsonObject.metaData.addClass("multipletext", [{ name: "!items:textitems", className: "multipletextitem" }, { name: "itemSize:number", default: 25 }, { name: "colCount:number", default: 1, choices: [1, 2, 3, 4] }], function () {
	    return new QuestionMultipleTextModel("");
	}, "question");
	_questionfactory.QuestionFactory.Instance.registerQuestion("multipletext", function (name) {
	    var q = new QuestionMultipleTextModel(name);q.AddItem("text1");q.AddItem("text2");return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.PageModel = exports.QuestionRowModel = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _base = __webpack_require__(4);
	
	var _conditions = __webpack_require__(9);
	
	var _questionfactory = __webpack_require__(16);
	
	var QuestionRowModel = exports.QuestionRowModel = function () {
	    function QuestionRowModel(page, question) {
	        this.page = page;
	        this.question = question;
	        this.visibleValue = false;
	        this.questions = [];
	        var self = this;
	        this.question.rowVisibilityChangedCallback = function () {
	            self.onRowVisibilityChanged();
	        };
	    }
	    Object.defineProperty(QuestionRowModel.prototype, "visible", {
	        get: function get() {
	            return this.visibleValue;
	        },
	        set: function set(val) {
	            if (val == this.visible) return;
	            this.visibleValue = val;
	            this.onVisibleChanged();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionRowModel.prototype.updateVisible = function () {
	        this.visible = this.calcVisible();
	        this.setWidth();
	    };
	    QuestionRowModel.prototype.addQuestion = function (q) {
	        this.questions.push(q);
	        this.updateVisible();
	    };
	    QuestionRowModel.prototype.onVisibleChanged = function () {
	        if (this.visibilityChangedCallback) this.visibilityChangedCallback();
	    };
	    QuestionRowModel.prototype.setWidth = function () {
	        var visCount = this.getVisibleCount();
	        if (visCount == 0) return;
	        var counter = 0;
	        for (var i = 0; i < this.questions.length; i++) {
	            if (this.isQuestionVisible(this.questions[i])) {
	                this.questions[i].renderWidth = this.question.width ? this.question.width : Math.floor(100 / visCount) + '%';
	                this.questions[i].rightIndent = counter < visCount - 1 ? 1 : 0;
	                counter++;
	            }
	        }
	    };
	    QuestionRowModel.prototype.onRowVisibilityChanged = function () {
	        this.page.onRowVisibilityChanged(this);
	    };
	    QuestionRowModel.prototype.getVisibleCount = function () {
	        var res = 0;
	        for (var i = 0; i < this.questions.length; i++) {
	            if (this.isQuestionVisible(this.questions[i])) res++;
	        }
	        return res;
	    };
	    QuestionRowModel.prototype.isQuestionVisible = function (q) {
	        return this.page.isQuestionVisible(q);
	    };
	    QuestionRowModel.prototype.calcVisible = function () {
	        return this.getVisibleCount() > 0;
	    };
	    return QuestionRowModel;
	}();
	var PageModel = exports.PageModel = function (_super) {
	    __extends(PageModel, _super);
	    function PageModel(name) {
	        if (name === void 0) {
	            name = "";
	        }
	        _super.call(this);
	        this.name = name;
	        this.rowValues = null;
	        this.conditionRunner = null;
	        this.questions = new Array();
	        this.data = null;
	        this.visibleIf = "";
	        this.title = "";
	        this.visibleIndex = -1;
	        this.numValue = -1;
	        this.visibleValue = true;
	        var self = this;
	        this.questions.push = function (value) {
	            if (self.data != null) {
	                value.setData(self.data);
	            }
	            return Array.prototype.push.call(this, value);
	        };
	    }
	    Object.defineProperty(PageModel.prototype, "rows", {
	        get: function get() {
	            this.rowValues = this.buildRows();
	            return this.rowValues;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PageModel.prototype, "isActive", {
	        get: function get() {
	            return !this.data || this.data.currentPage == this;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PageModel.prototype.isQuestionVisible = function (question) {
	        return question.visible || this.isDesignMode;
	    };
	    PageModel.prototype.createRow = function (question) {
	        return new QuestionRowModel(this, question);
	    };
	    Object.defineProperty(PageModel.prototype, "isDesignMode", {
	        get: function get() {
	            return this.data && this.data.isDesignMode;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PageModel.prototype.buildRows = function () {
	        var result = new Array();
	        var lastRowVisibleIndex = -1;
	        var self = this;
	        for (var i = 0; i < this.questions.length; i++) {
	            var q = this.questions[i];
	            result.push(this.createRow(q));
	            if (q.startWithNewLine) {
	                lastRowVisibleIndex = i;
	                result[i].addQuestion(q);
	            } else {
	                if (lastRowVisibleIndex < 0) lastRowVisibleIndex = i;
	                result[lastRowVisibleIndex].addQuestion(q);
	            }
	        }
	        for (var i = 0; i < result.length; i++) {
	            result[i].setWidth();
	        }
	        return result;
	    };
	    PageModel.prototype.onRowVisibilityChanged = function (row) {
	        if (!this.isActive || !this.rowValues) return;
	        var index = this.rowValues.indexOf(row);
	        for (var i = index; i >= 0; i--) {
	            if (this.rowValues[i].questions.indexOf(row.question) > -1) {
	                this.rowValues[i].updateVisible();
	                break;
	            }
	        }
	    };
	    Object.defineProperty(PageModel.prototype, "processedTitle", {
	        get: function get() {
	            return this.data != null ? this.data.processText(this.title) : this.title;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PageModel.prototype, "num", {
	        get: function get() {
	            return this.numValue;
	        },
	        set: function set(value) {
	            if (this.numValue == value) return;
	            this.numValue = value;
	            this.onNumChanged(value);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(PageModel.prototype, "visible", {
	        get: function get() {
	            return this.visibleValue;
	        },
	        set: function set(value) {
	            if (value === this.visible) return;
	            this.visibleValue = value;
	            if (this.data != null) {
	                this.data.pageVisibilityChanged(this, this.visible);
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PageModel.prototype.getType = function () {
	        return "page";
	    };
	    Object.defineProperty(PageModel.prototype, "isVisible", {
	        get: function get() {
	            if (!this.visible) return false;
	            for (var i = 0; i < this.questions.length; i++) {
	                if (this.questions[i].visible) return true;
	            }
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PageModel.prototype.addQuestion = function (question, index) {
	        if (index === void 0) {
	            index = -1;
	        }
	        if (question == null) return;
	        if (index < 0 || index >= this.questions.length) {
	            this.questions.push(question);
	        } else {
	            this.questions.splice(index, 0, question);
	        }
	        if (this.data != null) {
	            question.setData(this.data);
	            this.data.questionAdded(question, index);
	        }
	    };
	    PageModel.prototype.addNewQuestion = function (questionType, name) {
	        var question = _questionfactory.QuestionFactory.Instance.createQuestion(questionType, name);
	        this.addQuestion(question);
	        return question;
	    };
	    PageModel.prototype.removeQuestion = function (question) {
	        var index = this.questions.indexOf(question);
	        if (index < 0) return;
	        this.questions.splice(index, 1);
	        if (this.data != null) this.data.questionRemoved(question);
	    };
	    PageModel.prototype.scrollToFirstQuestion = function () {
	        for (var i = 0; i < this.questions.length; i++) {
	            if (this.questions[i].visible) {
	                this.questions[i].focus();
	                break;
	            }
	        }
	    };
	    PageModel.prototype.hasErrors = function (fireCallback, focuseOnFirstError) {
	        if (fireCallback === void 0) {
	            fireCallback = true;
	        }
	        if (focuseOnFirstError === void 0) {
	            focuseOnFirstError = false;
	        }
	        var result = false;
	        var firstErrorQuestion = null;
	        for (var i = 0; i < this.questions.length; i++) {
	            if (this.questions[i].visible && this.questions[i].hasErrors(fireCallback)) {
	                if (focuseOnFirstError && firstErrorQuestion == null) {
	                    firstErrorQuestion = this.questions[i];
	                }
	                result = true;
	            }
	        }
	        if (firstErrorQuestion) firstErrorQuestion.focus();
	        return result;
	    };
	    PageModel.prototype.addQuestionsToList = function (list, visibleOnly) {
	        if (visibleOnly === void 0) {
	            visibleOnly = false;
	        }
	        if (visibleOnly && !this.visible) return;
	        for (var i = 0; i < this.questions.length; i++) {
	            if (visibleOnly && !this.questions[i].visible) continue;
	            list.push(this.questions[i]);
	        }
	    };
	    PageModel.prototype.runCondition = function (values) {
	        if (!this.visibleIf) return;
	        if (!this.conditionRunner) this.conditionRunner = new _conditions.ConditionRunner(this.visibleIf);
	        this.conditionRunner.expression = this.visibleIf;
	        this.visible = this.conditionRunner.run(values);
	    };
	    PageModel.prototype.onNumChanged = function (value) {};
	    return PageModel;
	}(_base.Base);
	_jsonobject.JsonObject.metaData.addClass("page", ["name", { name: "questions", baseClassName: "question" }, { name: "visible:boolean", default: true }, "visibleIf", "title"], function () {
	    return new PageModel();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionCheckboxModel = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var _question_baseselect = __webpack_require__(15);
	
	var QuestionCheckboxModel = exports.QuestionCheckboxModel = function (_super) {
	    __extends(QuestionCheckboxModel, _super);
	    function QuestionCheckboxModel(name) {
	        _super.call(this, name);
	        this.name = name;
	    }
	    QuestionCheckboxModel.prototype.getHasOther = function (val) {
	        if (!val) return false;
	        return val.indexOf(this.otherItem.value) >= 0;
	    };
	    QuestionCheckboxModel.prototype.valueFromDataCore = function (val) {
	        if (!val || !val.length) return val;
	        for (var i = 0; i < val.length; i++) {
	            if (val[i] == this.otherItem.value) return val;
	            if (this.hasUnknownValue(val[i])) {
	                this.comment = val[i];
	                var newVal = val.slice();
	                newVal[i] = this.otherItem.value;
	                return newVal;
	            }
	        }
	        return val;
	    };
	    QuestionCheckboxModel.prototype.valueToDataCore = function (val) {
	        if (!val || !val.length) return val;
	        for (var i = 0; i < val.length; i++) {
	            if (val[i] == this.otherItem.value) {
	                if (this.getComment()) {
	                    var newVal = val.slice();
	                    newVal[i] = this.getComment();
	                    return newVal;
	                }
	            }
	        }
	        return val;
	    };
	    QuestionCheckboxModel.prototype.getType = function () {
	        return "checkbox";
	    };
	    return QuestionCheckboxModel;
	}(_question_baseselect.QuestionCheckboxBase);
	_jsonobject.JsonObject.metaData.addClass("checkbox", [], function () {
	    return new QuestionCheckboxModel("");
	}, "checkboxbase");
	_questionfactory.QuestionFactory.Instance.registerQuestion("checkbox", function (name) {
	    var q = new QuestionCheckboxModel(name);q.choices = _questionfactory.QuestionFactory.DefaultChoices;return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionCommentModel = undefined;
	
	var _question = __webpack_require__(12);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var QuestionCommentModel = exports.QuestionCommentModel = function (_super) {
	    __extends(QuestionCommentModel, _super);
	    function QuestionCommentModel(name) {
	        _super.call(this, name);
	        this.name = name;
	        this.rows = 4;
	        this.cols = 50;
	    }
	    QuestionCommentModel.prototype.getType = function () {
	        return "comment";
	    };
	    QuestionCommentModel.prototype.isEmpty = function () {
	        return _super.prototype.isEmpty.call(this) || this.value == "";
	    };
	    return QuestionCommentModel;
	}(_question.Question);
	_jsonobject.JsonObject.metaData.addClass("comment", [{ name: "cols:number", default: 50 }, { name: "rows:number", default: 4 }], function () {
	    return new QuestionCommentModel("");
	}, "question");
	_questionfactory.QuestionFactory.Instance.registerQuestion("comment", function (name) {
	    return new QuestionCommentModel(name);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionDropdownModel = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var _question_baseselect = __webpack_require__(15);
	
	var _surveyStrings = __webpack_require__(6);
	
	var QuestionDropdownModel = exports.QuestionDropdownModel = function (_super) {
	    __extends(QuestionDropdownModel, _super);
	    function QuestionDropdownModel(name) {
	        _super.call(this, name);
	        this.name = name;
	    }
	    Object.defineProperty(QuestionDropdownModel.prototype, "optionsCaption", {
	        get: function get() {
	            return this.optionsCaptionValue ? this.optionsCaptionValue : _surveyStrings.surveyLocalization.getString("optionsCaption");
	        },
	        set: function set(newValue) {
	            this.optionsCaptionValue = newValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionDropdownModel.prototype.getType = function () {
	        return "dropdown";
	    };
	    QuestionDropdownModel.prototype.supportGoNextPageAutomatic = function () {
	        return true;
	    };
	    return QuestionDropdownModel;
	}(_question_baseselect.QuestionSelectBase);
	_jsonobject.JsonObject.metaData.addClass("dropdown", [{ name: "optionsCaption", onGetValue: function onGetValue(obj) {
	        return obj.optionsCaptionValue;
	    } }], function () {
	    return new QuestionDropdownModel("");
	}, "selectbase");
	_questionfactory.QuestionFactory.Instance.registerQuestion("dropdown", function (name) {
	    var q = new QuestionDropdownModel(name);q.choices = _questionfactory.QuestionFactory.DefaultChoices;return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionFileModel = undefined;
	
	var _question = __webpack_require__(12);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var _error = __webpack_require__(5);
	
	var _surveyStrings = __webpack_require__(6);
	
	var QuestionFileModel = exports.QuestionFileModel = function (_super) {
	    __extends(QuestionFileModel, _super);
	    function QuestionFileModel(name) {
	        _super.call(this, name);
	        this.name = name;
	        this.showPreviewValue = false;
	        this.isUploading = false;
	    }
	    QuestionFileModel.prototype.getType = function () {
	        return "file";
	    };
	    Object.defineProperty(QuestionFileModel.prototype, "showPreview", {
	        get: function get() {
	            return this.showPreviewValue;
	        },
	        set: function set(value) {
	            this.showPreviewValue = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionFileModel.prototype.loadFile = function (file) {
	        var self = this;
	        if (this.survey && !this.survey.uploadFile(this.name, file, this.storeDataAsText, function (status) {
	            self.isUploading = status == "uploading";
	        })) return;
	        this.setFileValue(file);
	    };
	    QuestionFileModel.prototype.setFileValue = function (file) {
	        if (!FileReader) return;
	        if (!this.showPreview && !this.storeDataAsText) return;
	        if (this.checkFileForErrors(file)) return;
	        var fileReader = new FileReader();
	        var self = this;
	        fileReader.onload = function (e) {
	            if (self.showPreview) {
	                self.previewValue = self.isFileImage(file) ? fileReader.result : null;
	                self.fireCallback(self.previewValueLoadedCallback);
	            }
	            if (self.storeDataAsText) {
	                self.value = fileReader.result;
	            }
	        };
	        fileReader.readAsDataURL(file);
	    };
	    QuestionFileModel.prototype.onCheckForErrors = function (errors) {
	        _super.prototype.onCheckForErrors.call(this, errors);
	        if (this.isUploading) {
	            this.errors.push(new _error.CustomError(_surveyStrings.surveyLocalization.getString("uploadingFile")));
	        }
	    };
	    QuestionFileModel.prototype.checkFileForErrors = function (file) {
	        var errorLength = this.errors ? this.errors.length : 0;
	        this.errors = [];
	        if (this.maxSize > 0 && file.size > this.maxSize) {
	            this.errors.push(new _error.ExceedSizeError(this.maxSize));
	        }
	        if (errorLength != this.errors.length || this.errors.length > 0) {
	            this.fireCallback(this.errorsChangedCallback);
	        }
	        return this.errors.length > 0;
	    };
	    QuestionFileModel.prototype.isFileImage = function (file) {
	        if (!file || !file.type) return;
	        var str = file.type.toLowerCase();
	        return str.indexOf("image") == 0;
	    };
	    return QuestionFileModel;
	}(_question.Question);
	_jsonobject.JsonObject.metaData.addClass("file", ["showPreview:boolean", "imageHeight", "imageWidth", "storeDataAsText:boolean", "maxSize:number"], function () {
	    return new QuestionFileModel("");
	}, "question");
	_questionfactory.QuestionFactory.Instance.registerQuestion("file", function (name) {
	    return new QuestionFileModel(name);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionHtmlModel = undefined;
	
	var _questionbase = __webpack_require__(13);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var QuestionHtmlModel = exports.QuestionHtmlModel = function (_super) {
	    __extends(QuestionHtmlModel, _super);
	    function QuestionHtmlModel(name) {
	        _super.call(this, name);
	        this.name = name;
	    }
	    QuestionHtmlModel.prototype.getType = function () {
	        return "html";
	    };
	    Object.defineProperty(QuestionHtmlModel.prototype, "html", {
	        get: function get() {
	            return this.htmlValue;
	        },
	        set: function set(value) {
	            this.htmlValue = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionHtmlModel.prototype, "processedHtml", {
	        get: function get() {
	            return this.survey ? this.survey.processHtml(this.html) : this.html;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return QuestionHtmlModel;
	}(_questionbase.QuestionBase);
	_jsonobject.JsonObject.metaData.addClass("html", ["html:html"], function () {
	    return new QuestionHtmlModel("");
	}, "questionbase");
	_questionfactory.QuestionFactory.Instance.registerQuestion("html", function (name) {
	    return new QuestionHtmlModel(name);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionRadiogroupModel = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var _question_baseselect = __webpack_require__(15);
	
	var QuestionRadiogroupModel = exports.QuestionRadiogroupModel = function (_super) {
	    __extends(QuestionRadiogroupModel, _super);
	    function QuestionRadiogroupModel(name) {
	        _super.call(this, name);
	        this.name = name;
	    }
	    QuestionRadiogroupModel.prototype.getType = function () {
	        return "radiogroup";
	    };
	    QuestionRadiogroupModel.prototype.supportGoNextPageAutomatic = function () {
	        return true;
	    };
	    return QuestionRadiogroupModel;
	}(_question_baseselect.QuestionCheckboxBase);
	_jsonobject.JsonObject.metaData.addClass("radiogroup", [], function () {
	    return new QuestionRadiogroupModel("");
	}, "checkboxbase");
	_questionfactory.QuestionFactory.Instance.registerQuestion("radiogroup", function (name) {
	    var q = new QuestionRadiogroupModel(name);q.choices = _questionfactory.QuestionFactory.DefaultChoices;return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionRatingModel = undefined;
	
	var _base = __webpack_require__(4);
	
	var _question = __webpack_require__(12);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var QuestionRatingModel = exports.QuestionRatingModel = function (_super) {
	    __extends(QuestionRatingModel, _super);
	    function QuestionRatingModel(name) {
	        _super.call(this, name);
	        this.name = name;
	        this.rates = [];
	        this.mininumRateDescription = null;
	        this.maximumRateDescription = null;
	    }
	    Object.defineProperty(QuestionRatingModel.prototype, "rateValues", {
	        get: function get() {
	            return this.rates;
	        },
	        set: function set(newValue) {
	            _base.ItemValue.setData(this.rates, newValue);
	            this.fireCallback(this.rateValuesChangedCallback);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionRatingModel.prototype, "visibleRateValues", {
	        get: function get() {
	            if (this.rateValues.length > 0) return this.rateValues;
	            return QuestionRatingModel.defaultRateValues;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionRatingModel.prototype.getType = function () {
	        return "rating";
	    };
	    QuestionRatingModel.prototype.supportComment = function () {
	        return true;
	    };
	    QuestionRatingModel.prototype.supportOther = function () {
	        return true;
	    };
	    QuestionRatingModel.prototype.supportGoNextPageAutomatic = function () {
	        return true;
	    };
	    QuestionRatingModel.defaultRateValues = [];
	    return QuestionRatingModel;
	}(_question.Question);
	_base.ItemValue.setData(QuestionRatingModel.defaultRateValues, [1, 2, 3, 4, 5]);
	_jsonobject.JsonObject.metaData.addClass("rating", ["hasComment:boolean", { name: "rateValues:itemvalues", onGetValue: function onGetValue(obj) {
	        return _base.ItemValue.getData(obj.rateValues);
	    }, onSetValue: function onSetValue(obj, value) {
	        obj.rateValues = value;
	    } }, "mininumRateDescription", "maximumRateDescription"], function () {
	    return new QuestionRatingModel("");
	}, "question");
	_questionfactory.QuestionFactory.Instance.registerQuestion("rating", function (name) {
	    return new QuestionRatingModel(name);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionTextModel = undefined;
	
	var _questionfactory = __webpack_require__(16);
	
	var _jsonobject = __webpack_require__(7);
	
	var _question = __webpack_require__(12);
	
	var QuestionTextModel = exports.QuestionTextModel = function (_super) {
	    __extends(QuestionTextModel, _super);
	    function QuestionTextModel(name) {
	        _super.call(this, name);
	        this.name = name;
	        this.size = 25;
	    }
	    QuestionTextModel.prototype.getType = function () {
	        return "text";
	    };
	    QuestionTextModel.prototype.isEmpty = function () {
	        return _super.prototype.isEmpty.call(this) || this.value == "";
	    };
	    QuestionTextModel.prototype.supportGoNextPageAutomatic = function () {
	        return true;
	    };
	    return QuestionTextModel;
	}(_question.Question);
	_jsonobject.JsonObject.metaData.addClass("text", [{ name: "size:number", default: 25 }], function () {
	    return new QuestionTextModel("");
	}, "question");
	_questionfactory.QuestionFactory.Instance.registerQuestion("text", function (name) {
	    return new QuestionTextModel(name);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyModel = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _jsonobject = __webpack_require__(7);
	
	var _base = __webpack_require__(4);
	
	var _page = __webpack_require__(21);
	
	var _textPreProcessor = __webpack_require__(14);
	
	var _dxSurveyService = __webpack_require__(31);
	
	var _surveyStrings = __webpack_require__(6);
	
	var _error = __webpack_require__(5);
	
	var SurveyModel = exports.SurveyModel = function (_super) {
	    __extends(SurveyModel, _super);
	    function SurveyModel(jsonObj) {
	        if (jsonObj === void 0) {
	            jsonObj = null;
	        }
	        _super.call(this);
	        this.surveyId = null;
	        this.surveyPostId = null;
	        this.clientId = null;
	        this.cookieName = null;
	        this.sendResultOnPageNext = false;
	        this.commentPrefix = "-Comment";
	        this.title = "";
	        this.showNavigationButtons = true;
	        this.showTitle = true;
	        this.showPageTitles = true;
	        this.completedHtml = "";
	        this.requiredText = "*";
	        this.questionStartIndex = "";
	        this.questionTitleTemplate = "";
	        this.showProgressBar = "off";
	        this.storeOthersAsComment = true;
	        this.goNextPageAutomatic = false;
	        this.pages = new Array();
	        this.triggers = new Array();
	        this.clearInvisibleValues = false;
	        this.currentPageValue = null;
	        this.valuesHash = {};
	        this.variablesHash = {};
	        this.showPageNumbersValue = false;
	        this.showQuestionNumbersValue = "on";
	        this.questionTitleLocationValue = "top";
	        this.localeValue = "";
	        this.isCompleted = false;
	        this.isLoading = false;
	        this.processedTextValues = {};
	        this.onComplete = new _base.Event();
	        this.onCurrentPageChanged = new _base.Event();
	        this.onValueChanged = new _base.Event();
	        this.onVisibleChanged = new _base.Event();
	        this.onPageVisibleChanged = new _base.Event();
	        this.onQuestionAdded = new _base.Event();
	        this.onQuestionRemoved = new _base.Event();
	        this.onValidateQuestion = new _base.Event();
	        this.onProcessHtml = new _base.Event();
	        this.onSendResult = new _base.Event();
	        this.onGetResult = new _base.Event();
	        this.onUploadFile = new _base.Event();
	        this.jsonErrors = null;
	        this.mode = "normal";
	        var self = this;
	        this.textPreProcessor = new _textPreProcessor.TextPreProcessor();
	        this.textPreProcessor.onHasValue = function (name) {
	            return self.processedTextValues[name.toLowerCase()];
	        };
	        this.textPreProcessor.onProcess = function (name) {
	            return self.getProcessedTextValue(name);
	        };
	        this.pages.push = function (value) {
	            value.data = self;
	            return Array.prototype.push.call(this, value);
	        };
	        this.triggers.push = function (value) {
	            value.setOwner(self);
	            return Array.prototype.push.call(this, value);
	        };
	        this.updateProcessedTextValues();
	        this.onBeforeCreating();
	        if (jsonObj) {
	            this.setJsonObject(jsonObj);
	            if (this.surveyId) {
	                this.loadSurveyFromService(this.surveyId);
	            }
	        }
	        this.onCreating();
	    }
	    SurveyModel.prototype.getType = function () {
	        return "survey";
	    };
	    Object.defineProperty(SurveyModel.prototype, "locale", {
	        get: function get() {
	            return this.localeValue;
	        },
	        set: function set(value) {
	            this.localeValue = value;
	            _surveyStrings.surveyLocalization.currentLocale = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyModel.prototype.getLocString = function (str) {
	        return _surveyStrings.surveyLocalization.getString(str);
	    };
	    Object.defineProperty(SurveyModel.prototype, "emptySurveyText", {
	        get: function get() {
	            return this.getLocString("emptySurvey");
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "pagePrevText", {
	        get: function get() {
	            return this.pagePrevTextValue ? this.pagePrevTextValue : this.getLocString("pagePrevText");
	        },
	        set: function set(newValue) {
	            this.pagePrevTextValue = newValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "pageNextText", {
	        get: function get() {
	            return this.pageNextTextValue ? this.pageNextTextValue : this.getLocString("pageNextText");
	        },
	        set: function set(newValue) {
	            this.pageNextTextValue = newValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "completeText", {
	        get: function get() {
	            return this.completeTextValue ? this.completeTextValue : this.getLocString("completeText");
	        },
	        set: function set(newValue) {
	            this.completeTextValue = newValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "showPageNumbers", {
	        get: function get() {
	            return this.showPageNumbersValue;
	        },
	        set: function set(value) {
	            if (value === this.showPageNumbers) return;
	            this.showPageNumbersValue = value;
	            this.updateVisibleIndexes();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "showQuestionNumbers", {
	        get: function get() {
	            return this.showQuestionNumbersValue;
	        },
	        set: function set(value) {
	            if (value === this.showQuestionNumbers) return;
	            this.showQuestionNumbersValue = value;
	            this.updateVisibleIndexes();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    ;
	    Object.defineProperty(SurveyModel.prototype, "questionTitleLocation", {
	        get: function get() {
	            return this.questionTitleLocationValue;
	        },
	        set: function set(value) {
	            if (value === this.questionTitleLocationValue) return;
	            this.questionTitleLocationValue = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    ;
	    ;
	    Object.defineProperty(SurveyModel.prototype, "data", {
	        get: function get() {
	            var result = {};
	            for (var key in this.valuesHash) {
	                result[key] = this.valuesHash[key];
	            }
	            return result;
	        },
	        set: function set(data) {
	            this.valuesHash = {};
	            if (data) {
	                for (var key in data) {
	                    this.valuesHash[key] = data[key];
	                    this.checkTriggers(key, data[key], false);
	                }
	            }
	            this.notifyAllQuestionsOnValueChanged();
	            this.runConditions();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "comments", {
	        get: function get() {
	            var result = {};
	            for (var key in this.valuesHash) {
	                if (key.indexOf(this.commentPrefix) > 0) {
	                    result[key] = this.valuesHash[key];
	                }
	            }
	            return result;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "visiblePages", {
	        get: function get() {
	            if (this.isDesignMode) return this.pages;
	            var result = new Array();
	            for (var i = 0; i < this.pages.length; i++) {
	                if (this.pages[i].isVisible) {
	                    result.push(this.pages[i]);
	                }
	            }
	            return result;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "isEmpty", {
	        get: function get() {
	            return this.pages.length == 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "PageCount", {
	        get: function get() {
	            return this.pages.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "visiblePageCount", {
	        get: function get() {
	            return this.visiblePages.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "currentPage", {
	        get: function get() {
	            var vPages = this.visiblePages;
	            if (this.currentPageValue != null) {
	                if (vPages.indexOf(this.currentPageValue) < 0) {
	                    this.currentPage = null;
	                }
	            }
	            if (this.currentPageValue == null && vPages.length > 0) {
	                this.currentPage = vPages[0];
	            }
	            return this.currentPageValue;
	        },
	        set: function set(value) {
	            var vPages = this.visiblePages;
	            if (value != null && vPages.indexOf(value) < 0) return;
	            if (value == this.currentPageValue) return;
	            var oldValue = this.currentPageValue;
	            this.currentPageValue = value;
	            this.currentPageChanged(value, oldValue);
	            if (this.currentPageValue) {
	                this.currentPageValue.scrollToFirstQuestion();
	            }
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "state", {
	        get: function get() {
	            if (this.isLoading) return "loading";
	            if (this.isCompleted) return "completed";
	            return this.currentPage ? "running" : "empty";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyModel.prototype.clear = function () {
	        this.data = null;
	        this.variablesHash = {};
	        this.isCompleted = false;
	        if (this.visiblePageCount > 0) {
	            this.currentPage = this.visiblePages[0];
	        }
	    };
	    SurveyModel.prototype.mergeValues = function (src, dest) {
	        if (!dest || !src) return;
	        for (var key in src) {
	            var value = src[key];
	            if (value && (typeof value === "undefined" ? "undefined" : _typeof(value)) === 'object') {
	                if (!dest[key]) dest[key] = {};
	                this.mergeValues(value, dest[key]);
	            } else {
	                dest[key] = value;
	            }
	        }
	    };
	    SurveyModel.prototype.currentPageChanged = function (newValue, oldValue) {
	        this.onCurrentPageChanged.fire(this, { 'oldCurrentPage': oldValue, 'newCurrentPage': newValue });
	    };
	    SurveyModel.prototype.getProgress = function () {
	        if (this.currentPage == null) return 0;
	        var index = this.visiblePages.indexOf(this.currentPage) + 1;
	        return Math.ceil(index * 100 / this.visiblePageCount);
	    };
	    Object.defineProperty(SurveyModel.prototype, "isDesignMode", {
	        get: function get() {
	            return this.mode == "designer";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "hasCookie", {
	        get: function get() {
	            if (!this.cookieName) return false;
	            var cookies = document.cookie;
	            return cookies && cookies.indexOf(this.cookieName + "=true") > -1;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyModel.prototype.setCookie = function () {
	        if (!this.cookieName) return;
	        document.cookie = this.cookieName + "=true; expires=Fri, 31 Dec 9999 0:0:0 GMT";
	    };
	    SurveyModel.prototype.deleteCookie = function () {
	        if (!this.cookieName) return;
	        document.cookie = this.cookieName + "=;";
	    };
	    SurveyModel.prototype.nextPage = function () {
	        if (this.isLastPage) return false;
	        if (this.isCurrentPageHasErrors) return false;
	        this.checkOnPageTriggers();
	        if (this.sendResultOnPageNext && this.clientId) {
	            this.sendResult(this.surveyPostId, this.clientId, true);
	        }
	        var vPages = this.visiblePages;
	        var index = vPages.indexOf(this.currentPage);
	        this.currentPage = vPages[index + 1];
	        return true;
	    };
	    Object.defineProperty(SurveyModel.prototype, "isCurrentPageHasErrors", {
	        get: function get() {
	            if (this.currentPage == null) return true;
	            return this.currentPage.hasErrors(true, true);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyModel.prototype.prevPage = function () {
	        if (this.isFirstPage) return false;
	        var vPages = this.visiblePages;
	        var index = vPages.indexOf(this.currentPage);
	        this.currentPage = vPages[index - 1];
	    };
	    SurveyModel.prototype.completeLastPage = function () {
	        if (this.isCurrentPageHasErrors) return false;
	        this.doComplete();
	        return true;
	    };
	    Object.defineProperty(SurveyModel.prototype, "isFirstPage", {
	        get: function get() {
	            if (this.currentPage == null) return true;
	            return this.visiblePages.indexOf(this.currentPage) == 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "isLastPage", {
	        get: function get() {
	            if (this.currentPage == null) return true;
	            var vPages = this.visiblePages;
	            return vPages.indexOf(this.currentPage) == vPages.length - 1;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyModel.prototype.doComplete = function () {
	        if (this.clearInvisibleValues) {
	            this.clearInvisibleQuestionValues();
	        }
	        this.setCookie();
	        this.setCompleted();
	        this.onComplete.fire(this, null);
	        if (this.surveyPostId) {
	            this.sendResult();
	        }
	    };
	    SurveyModel.prototype.setCompleted = function () {
	        this.isCompleted = true;
	    };
	    Object.defineProperty(SurveyModel.prototype, "processedCompletedHtml", {
	        get: function get() {
	            if (this.completedHtml) {
	                return this.processHtml(this.completedHtml);
	            }
	            return "<h3>" + this.getLocString("completingSurvey") + "</h3>";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "processedLoadingHtml", {
	        get: function get() {
	            return "<h3>" + this.getLocString("loadingSurvey") + "</h3>";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "progressText", {
	        get: function get() {
	            if (this.currentPage == null) return "";
	            var vPages = this.visiblePages;
	            var index = vPages.indexOf(this.currentPage) + 1;
	            return this.getLocString("progressText")["format"](index, vPages.length);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyModel.prototype.uploadFile = function (name, file, storeDataAsText, uploadingCallback) {
	        var accept = true;
	        this.onUploadFile.fire(this, { name: name, file: file, accept: accept });
	        if (!accept) return false;
	        if (!storeDataAsText && this.surveyPostId) {
	            this.uploadFileCore(name, file, uploadingCallback);
	        }
	        return true;
	    };
	    SurveyModel.prototype.uploadFileCore = function (name, file, uploadingCallback) {
	        var self = this;
	        if (uploadingCallback) uploadingCallback("uploading");
	        new _dxSurveyService.dxSurveyService().sendFile(this.surveyPostId, file, function (success, response) {
	            if (uploadingCallback) uploadingCallback(success ? "success" : "error");
	            if (success) {
	                self.setValue(name, response);
	            }
	        });
	    };
	    SurveyModel.prototype.getPage = function (index) {
	        return this.pages[index];
	    };
	    SurveyModel.prototype.addPage = function (page) {
	        if (page == null) return;
	        this.pages.push(page);
	        this.updateVisibleIndexes();
	    };
	    SurveyModel.prototype.addNewPage = function (name) {
	        var page = this.createNewPage(name);
	        this.addPage(page);
	        return page;
	    };
	    SurveyModel.prototype.removePage = function (page) {
	        var index = this.pages.indexOf(page);
	        if (index < 0) return;
	        this.pages.splice(index, 1);
	        if (this.currentPageValue == page) {
	            this.currentPage = this.pages.length > 0 ? this.pages[0] : null;
	        }
	        this.updateVisibleIndexes();
	    };
	    SurveyModel.prototype.getQuestionByName = function (name, caseInsensitive) {
	        if (caseInsensitive === void 0) {
	            caseInsensitive = false;
	        }
	        var questions = this.getAllQuestions();
	        if (caseInsensitive) name = name.toLowerCase();
	        for (var i = 0; i < questions.length; i++) {
	            var questionName = questions[i].name;
	            if (caseInsensitive) questionName = questionName.toLowerCase();
	            if (questionName == name) return questions[i];
	        }
	        return null;
	    };
	    SurveyModel.prototype.getQuestionsByNames = function (names, caseInsensitive) {
	        if (caseInsensitive === void 0) {
	            caseInsensitive = false;
	        }
	        var result = [];
	        if (!names) return result;
	        for (var i = 0; i < names.length; i++) {
	            if (!names[i]) continue;
	            var question = this.getQuestionByName(names[i], caseInsensitive);
	            if (question) result.push(question);
	        }
	        return result;
	    };
	    SurveyModel.prototype.getPageByQuestion = function (question) {
	        for (var i = 0; i < this.pages.length; i++) {
	            var page = this.pages[i];
	            if (page.questions.indexOf(question) > -1) return page;
	        }
	        return null;
	    };
	    SurveyModel.prototype.getPageByName = function (name) {
	        for (var i = 0; i < this.pages.length; i++) {
	            if (this.pages[i].name == name) return this.pages[i];
	        }
	        return null;
	    };
	    SurveyModel.prototype.getPagesByNames = function (names) {
	        var result = [];
	        if (!names) return result;
	        for (var i = 0; i < names.length; i++) {
	            if (!names[i]) continue;
	            var page = this.getPageByName(names[i]);
	            if (page) result.push(page);
	        }
	        return result;
	    };
	    SurveyModel.prototype.getAllQuestions = function (visibleOnly) {
	        if (visibleOnly === void 0) {
	            visibleOnly = false;
	        }
	        var result = new Array();
	        for (var i = 0; i < this.pages.length; i++) {
	            this.pages[i].addQuestionsToList(result, visibleOnly);
	        }
	        return result;
	    };
	    SurveyModel.prototype.createNewPage = function (name) {
	        return new _page.PageModel(name);
	    };
	    SurveyModel.prototype.notifyQuestionOnValueChanged = function (name, newValue) {
	        var questions = this.getAllQuestions();
	        var question = null;
	        for (var i = 0; i < questions.length; i++) {
	            if (questions[i].name != name) continue;
	            question = questions[i];
	            this.doSurveyValueChanged(question, newValue);
	        }
	        this.onValueChanged.fire(this, { 'name': name, 'question': question, 'value': newValue });
	    };
	    SurveyModel.prototype.notifyAllQuestionsOnValueChanged = function () {
	        var questions = this.getAllQuestions();
	        for (var i = 0; i < questions.length; i++) {
	            this.doSurveyValueChanged(questions[i], this.getValue(questions[i].name));
	        }
	    };
	    SurveyModel.prototype.doSurveyValueChanged = function (question, newValue) {
	        question.onSurveyValueChanged(newValue);
	    };
	    SurveyModel.prototype.checkOnPageTriggers = function () {
	        var questions = this.getCurrentPageQuestions();
	        for (var i = 0; i < questions.length; i++) {
	            var question = questions[i];
	            var value = this.getValue(question.name);
	            this.checkTriggers(question.name, value, true);
	        }
	    };
	    SurveyModel.prototype.getCurrentPageQuestions = function () {
	        var result = [];
	        var page = this.currentPage;
	        if (!page) return result;
	        for (var i = 0; i < page.questions.length; i++) {
	            var question = page.questions[i];
	            if (!question.visible || !question.name) continue;
	            result.push(question);
	        }
	        return result;
	    };
	    SurveyModel.prototype.checkTriggers = function (name, newValue, isOnNextPage) {
	        for (var i = 0; i < this.triggers.length; i++) {
	            var trigger = this.triggers[i];
	            if (trigger.name == name && trigger.isOnNextPage == isOnNextPage) {
	                trigger.check(newValue);
	            }
	        }
	    };
	    SurveyModel.prototype.doQuestionsOnLoad = function () {
	        var questions = this.getAllQuestions(false);
	        for (var i = 0; i < questions.length; i++) {
	            questions[i].onSurveyLoad();
	        }
	    };
	    SurveyModel.prototype.runConditions = function () {
	        this.runConditionsForList(this.getAllQuestions(false));
	        this.runConditionsForList(this.pages);
	    };
	    SurveyModel.prototype.runConditionsForList = function (list) {
	        for (var i = 0; i < list.length; i++) {
	            list[i].runCondition(this.valuesHash);
	        }
	    };
	    SurveyModel.prototype.sendResult = function (postId, clientId, isPartialCompleted) {
	        if (postId === void 0) {
	            postId = null;
	        }
	        if (clientId === void 0) {
	            clientId = null;
	        }
	        if (isPartialCompleted === void 0) {
	            isPartialCompleted = false;
	        }
	        if (!postId && this.surveyPostId) {
	            postId = this.surveyPostId;
	        }
	        if (!postId) return;
	        if (clientId) {
	            this.clientId = clientId;
	        }
	        var self = this;
	        new _dxSurveyService.dxSurveyService().sendResult(postId, this.data, function (success, response) {
	            self.onSendResult.fire(self, { success: success, response: response });
	        }, this.clientId, isPartialCompleted);
	    };
	    SurveyModel.prototype.getResult = function (resultId, name) {
	        var self = this;
	        new _dxSurveyService.dxSurveyService().getResult(resultId, name, function (success, data, dataList, response) {
	            self.onGetResult.fire(self, { success: success, data: data, dataList: dataList, response: response });
	        });
	    };
	    SurveyModel.prototype.loadSurveyFromService = function (surveyId) {
	        if (surveyId === void 0) {
	            surveyId = null;
	        }
	        if (surveyId) {
	            this.surveyId = surveyId;
	        }
	        var self = this;
	        this.isLoading = true;
	        this.onLoadingSurveyFromService();
	        new _dxSurveyService.dxSurveyService().loadSurvey(this.surveyId, function (success, result, response) {
	            self.isLoading = false;
	            if (success && result) {
	                self.setJsonObject(result);
	                self.notifyAllQuestionsOnValueChanged();
	                self.onLoadSurveyFromService();
	            }
	        });
	    };
	    SurveyModel.prototype.onLoadingSurveyFromService = function () {};
	    SurveyModel.prototype.onLoadSurveyFromService = function () {};
	    SurveyModel.prototype.updateVisibleIndexes = function () {
	        this.updatePageVisibleIndexes(this.showPageNumbers);
	        if (this.showQuestionNumbers == "onPage") {
	            var visPages = this.visiblePages;
	            for (var i = 0; i < visPages.length; i++) {
	                this.updateQuestionVisibleIndexes(visPages[i].questions, true);
	            }
	        } else {
	            this.updateQuestionVisibleIndexes(this.getAllQuestions(false), this.showQuestionNumbers == "on");
	        }
	    };
	    SurveyModel.prototype.updatePageVisibleIndexes = function (showIndex) {
	        var index = 0;
	        for (var i = 0; i < this.pages.length; i++) {
	            this.pages[i].visibleIndex = this.pages[i].visible ? index++ : -1;
	            this.pages[i].num = showIndex && this.pages[i].visible ? this.pages[i].visibleIndex + 1 : -1;
	        }
	    };
	    SurveyModel.prototype.updateQuestionVisibleIndexes = function (questions, showIndex) {
	        var index = 0;
	        for (var i = 0; i < questions.length; i++) {
	            questions[i].setVisibleIndex(showIndex && questions[i].visible && questions[i].hasTitle ? index++ : -1);
	        }
	    };
	    SurveyModel.prototype.setJsonObject = function (jsonObj) {
	        if (!jsonObj) return;
	        this.jsonErrors = null;
	        var jsonConverter = new _jsonobject.JsonObject();
	        jsonConverter.toObject(jsonObj, this);
	        if (jsonConverter.errors.length > 0) {
	            this.jsonErrors = jsonConverter.errors;
	        }
	        this.updateProcessedTextValues();
	        if (this.hasCookie) {
	            this.doComplete();
	        }
	        this.doQuestionsOnLoad();
	        this.runConditions();
	        this.updateVisibleIndexes();
	    };
	    SurveyModel.prototype.onBeforeCreating = function () {};
	    SurveyModel.prototype.onCreating = function () {};
	    SurveyModel.prototype.updateProcessedTextValues = function () {
	        this.processedTextValues = {};
	        var self = this;
	        this.processedTextValues["pageno"] = function (name) {
	            return self.currentPage != null ? self.visiblePages.indexOf(self.currentPage) + 1 : 0;
	        };
	        this.processedTextValues["pagecount"] = function (name) {
	            return self.visiblePageCount;
	        };
	        var questions = this.getAllQuestions();
	        for (var i = 0; i < questions.length; i++) {
	            this.addQuestionToProcessedTextValues(questions[i]);
	        }
	    };
	    SurveyModel.prototype.addQuestionToProcessedTextValues = function (question) {
	        this.processedTextValues[question.name.toLowerCase()] = "question";
	    };
	    SurveyModel.prototype.getProcessedTextValue = function (name) {
	        var name = name.toLowerCase();
	        var val = this.processedTextValues[name];
	        if (!val) return null;
	        if (val == "question") {
	            var question = this.getQuestionByName(name, true);
	            return question != null ? this.getValue(question.name) : null;
	        }
	        if (val == "value") {
	            return this.getValue(name);
	        }
	        if (val == "variable") {
	            return this.getVariable(name);
	        }
	        return val(name);
	    };
	    SurveyModel.prototype.clearInvisibleQuestionValues = function () {
	        var questions = this.getAllQuestions();
	        for (var i = 0; i < questions.length; i++) {
	            if (questions[i].visible) continue;
	            this.setValue(questions[i].name, null);
	        }
	    };
	    SurveyModel.prototype.getVariable = function (name) {
	        if (!name) return null;
	        return this.variablesHash[name];
	    };
	    SurveyModel.prototype.setVariable = function (name, newValue) {
	        if (!name) return;
	        this.variablesHash[name] = newValue;
	        this.processedTextValues[name.toLowerCase()] = "variable";
	    };
	    //ISurvey data
	    SurveyModel.prototype.getUnbindValue = function (value) {
	        if (value && value instanceof Object) {
	            //do not return the same object instance!!!
	            return JSON.parse(JSON.stringify(value));
	        }
	        return value;
	    };
	    SurveyModel.prototype.getValue = function (name) {
	        if (!name || name.length == 0) return null;
	        var value = this.valuesHash[name];
	        return this.getUnbindValue(value);
	    };
	    SurveyModel.prototype.setValue = function (name, newValue) {
	        if (this.isValueEqual(name, newValue)) return;
	        if (newValue == "" || newValue == null) {
	            delete this.valuesHash[name];
	        } else {
	            newValue = this.getUnbindValue(newValue);
	            this.valuesHash[name] = newValue;
	            this.processedTextValues[name.toLowerCase()] = "value";
	        }
	        this.notifyQuestionOnValueChanged(name, newValue);
	        this.checkTriggers(name, newValue, false);
	        this.runConditions();
	        this.tryGoNextPageAutomatic(name);
	    };
	    SurveyModel.prototype.isValueEqual = function (name, newValue) {
	        if (newValue == "") newValue = null;
	        var oldValue = this.getValue(name);
	        if (newValue === null || oldValue === null) return newValue === oldValue;
	        return this.isTwoValueEquals(newValue, oldValue);
	    };
	    SurveyModel.prototype.isTwoValueEquals = function (x, y) {
	        if (x === y) return true;
	        if (!(x instanceof Object) || !(y instanceof Object)) return false;
	        for (var p in x) {
	            if (!x.hasOwnProperty(p)) continue;
	            if (!y.hasOwnProperty(p)) return false;
	            if (x[p] === y[p]) continue;
	            if (_typeof(x[p]) !== "object") return false;
	            if (!this.isTwoValueEquals(x[p], y[p])) return false;
	        }
	        for (p in y) {
	            if (y.hasOwnProperty(p) && !x.hasOwnProperty(p)) return false;
	        }
	        return true;
	    };
	    SurveyModel.prototype.tryGoNextPageAutomatic = function (name) {
	        if (!this.goNextPageAutomatic || !this.currentPage) return;
	        var question = this.getQuestionByName(name);
	        if (question && !question.supportGoNextPageAutomatic()) return;
	        var questions = this.getCurrentPageQuestions();
	        for (var i = 0; i < questions.length; i++) {
	            if (!this.getValue(questions[i].name)) return;
	        }
	        if (!this.currentPage.hasErrors(false, false)) {
	            if (!this.isLastPage) {
	                this.nextPage();
	            } else {
	                this.doComplete();
	            }
	        }
	    };
	    SurveyModel.prototype.getComment = function (name) {
	        var result = this.data[name + this.commentPrefix];
	        if (result == null) result = "";
	        return result;
	    };
	    SurveyModel.prototype.setComment = function (name, newValue) {
	        name = name + this.commentPrefix;
	        if (newValue == "" || newValue == null) {
	            delete this.valuesHash[name];
	        } else {
	            this.valuesHash[name] = newValue;
	            this.tryGoNextPageAutomatic(name);
	        }
	    };
	    SurveyModel.prototype.questionVisibilityChanged = function (question, newValue) {
	        this.updateVisibleIndexes();
	        this.onVisibleChanged.fire(this, { 'question': question, 'name': question.name, 'visible': newValue });
	    };
	    SurveyModel.prototype.pageVisibilityChanged = function (page, newValue) {
	        this.updateVisibleIndexes();
	        this.onPageVisibleChanged.fire(this, { 'page': page, 'visible': newValue });
	    };
	    SurveyModel.prototype.questionAdded = function (question, index) {
	        this.updateVisibleIndexes();
	        this.addQuestionToProcessedTextValues(question);
	        this.onQuestionAdded.fire(this, { 'question': question, 'name': question.name, 'index': index });
	    };
	    SurveyModel.prototype.questionRemoved = function (question) {
	        this.updateVisibleIndexes();
	        this.onQuestionRemoved.fire(this, { 'question': question, 'name': question.name });
	    };
	    SurveyModel.prototype.validateQuestion = function (name) {
	        if (this.onValidateQuestion.isEmpty) return null;
	        var options = { name: name, value: this.getValue(name), error: null };
	        this.onValidateQuestion.fire(this, options);
	        return options.error ? new _error.CustomError(options.error) : null;
	    };
	    SurveyModel.prototype.processHtml = function (html) {
	        var options = { html: html };
	        this.onProcessHtml.fire(this, options);
	        return this.processText(options.html);
	    };
	    SurveyModel.prototype.processText = function (text) {
	        return this.textPreProcessor.process(text);
	    };
	    //ISurveyTriggerOwner
	    SurveyModel.prototype.getObjects = function (pages, questions) {
	        var result = [];
	        Array.prototype.push.apply(result, this.getPagesByNames(pages));
	        Array.prototype.push.apply(result, this.getQuestionsByNames(questions));
	        return result;
	    };
	    SurveyModel.prototype.setTriggerValue = function (name, value, isVariable) {
	        if (!name) return;
	        if (isVariable) {
	            this.setVariable(name, value);
	        } else {
	            this.setValue(name, value);
	        }
	    };
	    return SurveyModel;
	}(_base.Base);
	_jsonobject.JsonObject.metaData.addClass("survey", [{ name: "locale", choices: function choices() {
	        return _surveyStrings.surveyLocalization.getLocales();
	    } }, "title", "completedHtml:html", { name: "pages", className: "page" }, { name: "questions", baseClassName: "question", onGetValue: function onGetValue(obj) {
	        return null;
	    }, onSetValue: function onSetValue(obj, value, jsonConverter) {
	        var page = obj.addNewPage("");jsonConverter.toObject({ questions: value }, page);
	    } }, { name: "triggers:triggers", baseClassName: "surveytrigger", classNamePart: "trigger" }, "surveyId", "surveyPostId", "cookieName", "sendResultOnPageNext:boolean", { name: "showNavigationButtons:boolean", default: true }, { name: "showTitle:boolean", default: true }, { name: "showPageTitles:boolean", default: true }, "showPageNumbers:boolean", { name: "showQuestionNumbers", default: "on", choices: ["on", "onPage", "off"] }, { name: "questionTitleLocation", default: "top", choices: ["top", "bottom"] }, { name: "showProgressBar", default: "off", choices: ["off", "top", "bottom"] }, { name: "storeOthersAsComment:boolean", default: true }, "goNextPageAutomatic:boolean", "clearInvisibleValues:boolean", { name: "pagePrevText", onGetValue: function onGetValue(obj) {
	        return obj.pagePrevTextValue;
	    } }, { name: "pageNextText", onGetValue: function onGetValue(obj) {
	        return obj.pageNextTextValue;
	    } }, { name: "completeText", onGetValue: function onGetValue(obj) {
	        return obj.completeTextValue;
	    } }, { name: "requiredText", default: "*" }, "questionStartIndex", "questionTitleTemplate"]);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 31 */
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var dxSurveyService = exports.dxSurveyService = function () {
	    //public static serviceUrl: string = "http://localhost:50488/api/Survey";
	    function dxSurveyService() {}
	    dxSurveyService.prototype.loadSurvey = function (surveyId, onLoad) {
	        var xhr = new XMLHttpRequest();
	        xhr.open('GET', dxSurveyService.serviceUrl + '/getSurvey?surveyId=' + surveyId);
	        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	        xhr.onload = function () {
	            var result = JSON.parse(xhr.response);
	            onLoad(xhr.status == 200, result, xhr.response);
	        };
	        xhr.send();
	    };
	    dxSurveyService.prototype.sendResult = function (postId, result, onSendResult, clientId, isPartialCompleted) {
	        if (clientId === void 0) {
	            clientId = null;
	        }
	        if (isPartialCompleted === void 0) {
	            isPartialCompleted = false;
	        }
	        var xhr = new XMLHttpRequest();
	        xhr.open('POST', dxSurveyService.serviceUrl + '/post/');
	        xhr.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
	        var data = { postId: postId, surveyResult: JSON.stringify(result) };
	        if (clientId) data['clientId'] = clientId;
	        if (isPartialCompleted) data['isPartialCompleted'] = true;
	        var dataStringify = JSON.stringify(data);
	        var self = this;
	        xhr.onload = xhr.onerror = function () {
	            if (!onSendResult) return;
	            onSendResult(xhr.status == 200, xhr.response);
	        };
	        xhr.send(dataStringify);
	    };
	    dxSurveyService.prototype.sendFile = function (postId, file, onSendFile) {
	        var xhr = new XMLHttpRequest();
	        xhr.onload = xhr.onerror = function () {
	            if (!onSendFile) return;
	            onSendFile(xhr.status == 200, JSON.parse(xhr.response));
	        };
	        xhr.open("POST", dxSurveyService.serviceUrl + '/upload/', true);
	        var formData = new FormData();
	        formData.append("file", file);
	        formData.append("postId", postId);
	        xhr.send(formData);
	    };
	    dxSurveyService.prototype.getResult = function (resultId, name, onGetResult) {
	        var xhr = new XMLHttpRequest();
	        var data = 'resultId=' + resultId + '&name=' + name;
	        xhr.open('GET', dxSurveyService.serviceUrl + '/getResult?' + data);
	        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	        var self = this;
	        xhr.onload = function () {
	            var result = null;
	            var list = null;
	            if (xhr.status == 200) {
	                result = JSON.parse(xhr.response);
	                list = [];
	                for (var key in result.QuestionResult) {
	                    var el = { name: key, value: result.QuestionResult[key] };
	                    list.push(el);
	                }
	            }
	            onGetResult(xhr.status == 200, result, list, xhr.response);
	        };
	        xhr.send();
	    };
	    dxSurveyService.prototype.isCompleted = function (resultId, clientId, onIsCompleted) {
	        var xhr = new XMLHttpRequest();
	        var data = 'resultId=' + resultId + '&clientId=' + clientId;
	        xhr.open('GET', dxSurveyService.serviceUrl + '/isCompleted?' + data);
	        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
	        var self = this;
	        xhr.onload = function () {
	            var result = null;
	            if (xhr.status == 200) {
	                result = JSON.parse(xhr.response);
	            }
	            onIsCompleted(xhr.status == 200, result, xhr.response);
	        };
	        xhr.send();
	    };
	    dxSurveyService.serviceUrl = "https://dxsurveyapi.azurewebsites.net/api/Survey";
	    return dxSurveyService;
	}();

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyTriggerSetValue = exports.SurveyTriggerComplete = exports.SurveyTriggerVisible = exports.SurveyTrigger = exports.Trigger = undefined;
	
	var _base = __webpack_require__(4);
	
	var _jsonobject = __webpack_require__(7);
	
	var Trigger = exports.Trigger = function (_super) {
	    __extends(Trigger, _super);
	    function Trigger() {
	        _super.call(this);
	        this.opValue = "equal";
	    }
	    Object.defineProperty(Trigger, "operators", {
	        get: function get() {
	            if (Trigger.operatorsValue != null) return Trigger.operatorsValue;
	            Trigger.operatorsValue = {
	                empty: function empty(value, expectedValue) {
	                    return !value;
	                },
	                notempty: function notempty(value, expectedValue) {
	                    return !!value;
	                },
	                equal: function equal(value, expectedValue) {
	                    return value == expectedValue;
	                },
	                notequal: function notequal(value, expectedValue) {
	                    return value != expectedValue;
	                },
	                contains: function contains(value, expectedValue) {
	                    return value && value["indexOf"] && value.indexOf(expectedValue) > -1;
	                },
	                notcontains: function notcontains(value, expectedValue) {
	                    return !value || !value["indexOf"] || value.indexOf(expectedValue) == -1;
	                },
	                greater: function greater(value, expectedValue) {
	                    return value > expectedValue;
	                },
	                less: function less(value, expectedValue) {
	                    return value < expectedValue;
	                },
	                greaterorequal: function greaterorequal(value, expectedValue) {
	                    return value >= expectedValue;
	                },
	                lessorequal: function lessorequal(value, expectedValue) {
	                    return value <= expectedValue;
	                }
	            };
	            return Trigger.operatorsValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Trigger.prototype, "operator", {
	        get: function get() {
	            return this.opValue;
	        },
	        set: function set(value) {
	            if (!value) return;
	            value = value.toLowerCase();
	            if (!Trigger.operators[value]) return;
	            this.opValue = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Trigger.prototype.check = function (value) {
	        if (Trigger.operators[this.operator](value, this.value)) {
	            this.onSuccess();
	        } else {
	            this.onFailure();
	        }
	    };
	    Trigger.prototype.onSuccess = function () {};
	    Trigger.prototype.onFailure = function () {};
	    Trigger.operatorsValue = null;
	    return Trigger;
	}(_base.Base);
	var SurveyTrigger = exports.SurveyTrigger = function (_super) {
	    __extends(SurveyTrigger, _super);
	    function SurveyTrigger() {
	        _super.call(this);
	        this.owner = null;
	    }
	    SurveyTrigger.prototype.setOwner = function (owner) {
	        this.owner = owner;
	    };
	    Object.defineProperty(SurveyTrigger.prototype, "isOnNextPage", {
	        get: function get() {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return SurveyTrigger;
	}(Trigger);
	var SurveyTriggerVisible = exports.SurveyTriggerVisible = function (_super) {
	    __extends(SurveyTriggerVisible, _super);
	    function SurveyTriggerVisible() {
	        _super.call(this);
	        this.pages = [];
	        this.questions = [];
	    }
	    SurveyTriggerVisible.prototype.getType = function () {
	        return "visibletrigger";
	    };
	    SurveyTriggerVisible.prototype.onSuccess = function () {
	        this.onTrigger(this.onItemSuccess);
	    };
	    SurveyTriggerVisible.prototype.onFailure = function () {
	        this.onTrigger(this.onItemFailure);
	    };
	    SurveyTriggerVisible.prototype.onTrigger = function (func) {
	        if (!this.owner) return;
	        var objects = this.owner.getObjects(this.pages, this.questions);
	        for (var i = 0; i < objects.length; i++) {
	            func(objects[i]);
	        }
	    };
	    SurveyTriggerVisible.prototype.onItemSuccess = function (item) {
	        item.visible = true;
	    };
	    SurveyTriggerVisible.prototype.onItemFailure = function (item) {
	        item.visible = false;
	    };
	    return SurveyTriggerVisible;
	}(SurveyTrigger);
	var SurveyTriggerComplete = exports.SurveyTriggerComplete = function (_super) {
	    __extends(SurveyTriggerComplete, _super);
	    function SurveyTriggerComplete() {
	        _super.call(this);
	    }
	    SurveyTriggerComplete.prototype.getType = function () {
	        return "completetrigger";
	    };
	    Object.defineProperty(SurveyTriggerComplete.prototype, "isOnNextPage", {
	        get: function get() {
	            return true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyTriggerComplete.prototype.onSuccess = function () {
	        if (this.owner) this.owner.doComplete();
	    };
	    return SurveyTriggerComplete;
	}(SurveyTrigger);
	var SurveyTriggerSetValue = exports.SurveyTriggerSetValue = function (_super) {
	    __extends(SurveyTriggerSetValue, _super);
	    function SurveyTriggerSetValue() {
	        _super.call(this);
	    }
	    SurveyTriggerSetValue.prototype.getType = function () {
	        return "setvaluetrigger";
	    };
	    SurveyTriggerSetValue.prototype.onSuccess = function () {
	        if (!this.setToName || !this.owner) return;
	        this.owner.setTriggerValue(this.setToName, this.setValue, this.isVariable);
	    };
	    return SurveyTriggerSetValue;
	}(SurveyTrigger);
	_jsonobject.JsonObject.metaData.addClass("trigger", ["operator", "!value"]);
	_jsonobject.JsonObject.metaData.addClass("surveytrigger", ["!name"], null, "trigger");
	_jsonobject.JsonObject.metaData.addClass("visibletrigger", ["pages", "questions"], function () {
	    return new SurveyTriggerVisible();
	}, "surveytrigger");
	_jsonobject.JsonObject.metaData.addClass("completetrigger", [], function () {
	    return new SurveyTriggerComplete();
	}, "surveytrigger");
	_jsonobject.JsonObject.metaData.addClass("setvaluetrigger", ["!setToName", "setValue", "isVariable:boolean"], function () {
	    return new SurveyTriggerSetValue();
	}, "surveytrigger");
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyWindowModel = undefined;
	
	var _base = __webpack_require__(4);
	
	var _survey = __webpack_require__(30);
	
	var SurveyWindowModel = exports.SurveyWindowModel = function (_super) {
	    __extends(SurveyWindowModel, _super);
	    function SurveyWindowModel(jsonObj) {
	        _super.call(this);
	        this.surveyValue = this.createSurvey(jsonObj);
	        this.surveyValue.showTitle = false;
	        this.windowElement = document.createElement("div");
	    }
	    SurveyWindowModel.prototype.getType = function () {
	        return "window";
	    };
	    Object.defineProperty(SurveyWindowModel.prototype, "survey", {
	        get: function get() {
	            return this.surveyValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyWindowModel.prototype, "isShowing", {
	        get: function get() {
	            return this.isShowingValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyWindowModel.prototype, "isExpanded", {
	        get: function get() {
	            return this.isExpandedValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyWindowModel.prototype, "title", {
	        get: function get() {
	            return this.titleValue ? this.titleValue : this.survey.title;
	        },
	        set: function set(value) {
	            this.titleValue = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyWindowModel.prototype.expand = function () {
	        this.expandcollapse(true);
	    };
	    SurveyWindowModel.prototype.collapse = function () {
	        this.expandcollapse(false);
	    };
	    SurveyWindowModel.prototype.createSurvey = function (jsonObj) {
	        return new _survey.SurveyModel(jsonObj);
	    };
	    SurveyWindowModel.prototype.expandcollapse = function (value) {
	        this.isExpandedValue = value;
	    };
	    SurveyWindowModel.surveyElementName = "windowSurveyJS";
	    return SurveyWindowModel;
	}(_base.Base);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 34 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var surveyCss = exports.surveyCss = {
	    currentType: "",
	    getCss: function getCss() {
	        var loc = this.currentType ? this[this.currentType] : defaultStandardCss;
	        if (!loc) loc = defaultStandardCss;
	        return loc;
	    }
	};
	var defaultStandardCss = exports.defaultStandardCss = {
	    root: "sv_main",
	    header: "",
	    body: "sv_body",
	    footer: "sv_nav",
	    navigationButton: "", navigation: { complete: "", prev: "", next: "" },
	    progress: "sv_progress", progressBar: "",
	    pageTitle: "sv_p_title",
	    row: "sv_row",
	    question: { root: "sv_q", title: "sv_q_title", comment: "", indent: 20 },
	    error: { root: "sv_q_erbox", icon: "", item: "" },
	    checkbox: { root: "sv_qcbc", item: "sv_q_checkbox", other: "sv_q_other" },
	    comment: "",
	    dropdown: "",
	    matrix: { root: "sv_q_matrix" },
	    matrixdropdown: { root: "sv_q_matrix" },
	    matrixdynamic: { root: "table", button: "" },
	    multipletext: { root: "", itemTitle: "", itemValue: "" },
	    radiogroup: { root: "sv_qcbc", item: "sv_q_radiogroup", other: "sv_q_other" },
	    rating: { root: "sv_q_rating", item: "sv_q_rating_item" },
	    text: "",
	    window: {
	        root: "sv_window", body: "sv_window_content",
	        header: {
	            root: "sv_window_title", title: "", button: "", buttonExpanded: "", buttonCollapsed: ""
	        }
	    }
	};
	surveyCss["standard"] = defaultStandardCss;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.Survey = undefined;
	
	var _knockout = __webpack_require__(36);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _survey = __webpack_require__(30);
	
	var _base = __webpack_require__(4);
	
	var _kopage = __webpack_require__(37);
	
	var _cssstandard = __webpack_require__(34);
	
	var _templateKo = __webpack_require__(38);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var Survey = exports.Survey = function (_super) {
	    __extends(Survey, _super);
	    function Survey(jsonObj, renderedElement, css) {
	        if (jsonObj === void 0) {
	            jsonObj = null;
	        }
	        if (renderedElement === void 0) {
	            renderedElement = null;
	        }
	        if (css === void 0) {
	            css = null;
	        }
	        _super.call(this, jsonObj);
	        this.onRendered = new _base.Event();
	        if (css) {
	            this.css = css;
	        }
	        if (renderedElement) {
	            this.renderedElement = renderedElement;
	        }
	        if (typeof ko === 'undefined') throw new Error('knockoutjs library is not loaded.');
	        this.render(renderedElement);
	    }
	    Object.defineProperty(Survey, "cssType", {
	        get: function get() {
	            return _cssstandard.surveyCss.currentType;
	        },
	        set: function set(value) {
	            _cssstandard.surveyCss.currentType = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Survey.prototype, "cssNavigationComplete", {
	        get: function get() {
	            return this.getNavigationCss(this.css.navigationButton, this.css.navigation.complete);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Survey.prototype, "cssNavigationPrev", {
	        get: function get() {
	            return this.getNavigationCss(this.css.navigationButton, this.css.navigation.prev);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Survey.prototype, "cssNavigationNext", {
	        get: function get() {
	            return this.getNavigationCss(this.css.navigationButton, this.css.navigation.next);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Survey.prototype.getNavigationCss = function (main, btn) {
	        var res = "";
	        if (main) res = main;
	        if (btn) res += ' ' + btn;
	        return res;
	    };
	    Object.defineProperty(Survey.prototype, "css", {
	        get: function get() {
	            return _cssstandard.surveyCss.getCss();
	        },
	        set: function set(value) {
	            this.mergeValues(value, this.css);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Survey.prototype.render = function (element) {
	        if (element === void 0) {
	            element = null;
	        }
	        var self = this;
	        if (element && typeof element == "string") {
	            element = document.getElementById(element);
	        }
	        if (element) {
	            this.renderedElement = element;
	        }
	        element = this.renderedElement;
	        if (!element) return;
	        element.innerHTML = this.getTemplate();
	        self.applyBinding();
	        self.onRendered.fire(self, {});
	    };
	    Survey.prototype.loadSurveyFromService = function (surveyId, renderedElement) {
	        if (surveyId === void 0) {
	            surveyId = null;
	        }
	        if (renderedElement === void 0) {
	            renderedElement = null;
	        }
	        if (renderedElement) {
	            this.renderedElement = renderedElement;
	        }
	        _super.prototype.loadSurveyFromService.call(this, surveyId);
	    };
	    Survey.prototype.setCompleted = function () {
	        _super.prototype.setCompleted.call(this);
	        this.updateKoCurrentPage();
	    };
	    Survey.prototype.createNewPage = function (name) {
	        return new _kopage.Page(name);
	    };
	    Survey.prototype.getTemplate = function () {
	        return _templateKo.koTemplate.html;
	    };
	    Survey.prototype.onBeforeCreating = function () {
	        var self = this;
	        this.dummyObservable = ko.observable(0);
	        this.koCurrentPage = ko.computed(function () {
	            self.dummyObservable();return self.currentPage;
	        });
	        this.koIsFirstPage = ko.computed(function () {
	            self.dummyObservable();return self.isFirstPage;
	        });
	        this.koIsLastPage = ko.computed(function () {
	            self.dummyObservable();return self.isLastPage;
	        });
	        this.koProgressText = ko.computed(function () {
	            self.dummyObservable();return self.progressText;
	        });
	        this.koProgress = ko.computed(function () {
	            self.dummyObservable();return self.getProgress();
	        });
	        this.koState = ko.computed(function () {
	            self.dummyObservable();return self.state;
	        });
	    };
	    Survey.prototype.currentPageChanged = function (newValue, oldValue) {
	        this.updateKoCurrentPage();
	        _super.prototype.currentPageChanged.call(this, newValue, oldValue);
	    };
	    Survey.prototype.onLoadSurveyFromService = function () {
	        this.render();
	    };
	    Survey.prototype.onLoadingSurveyFromService = function () {
	        this.render();
	    };
	    Survey.prototype.applyBinding = function () {
	        if (!this.renderedElement) return;
	        this.updateKoCurrentPage();
	        ko.cleanNode(this.renderedElement);
	        ko.applyBindings(this, this.renderedElement);
	    };
	    Survey.prototype.updateKoCurrentPage = function () {
	        this.dummyObservable(this.dummyObservable() + 1);
	    };
	    return Survey;
	}(_survey.SurveyModel);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 36 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_36__;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.Page = exports.QuestionRow = undefined;
	
	var _knockout = __webpack_require__(36);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _page = __webpack_require__(21);
	
	var _jsonobject = __webpack_require__(7);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var QuestionRow = exports.QuestionRow = function (_super) {
	    __extends(QuestionRow, _super);
	    function QuestionRow(page, question) {
	        _super.call(this, page, question);
	        this.page = page;
	        this.question = question;
	        this.koVisible = ko.observable(this.visible);
	    }
	    QuestionRow.prototype.onVisibleChanged = function () {
	        this.koVisible(this.visible);
	    };
	    QuestionRow.prototype.koAfterRender = function (el, con) {
	        for (var i = 0; i < el.length; i++) {
	            var tEl = el[i];
	            var nName = tEl.nodeName;
	            if (nName == "#text") tEl.data = "";
	        }
	    };
	    return QuestionRow;
	}(_page.QuestionRowModel);
	var Page = exports.Page = function (_super) {
	    __extends(Page, _super);
	    function Page(name) {
	        if (name === void 0) {
	            name = "";
	        }
	        _super.call(this, name);
	        this.koNo = ko.observable("");
	        this.onCreating();
	    }
	    Page.prototype.createRow = function (question) {
	        return new QuestionRow(this, question);
	    };
	    Page.prototype.onCreating = function () {};
	    Page.prototype.onNumChanged = function (value) {
	        this.koNo(value > 0 ? value + ". " : "");
	    };
	    return Page;
	}(_page.PageModel);
	_jsonobject.JsonObject.metaData.overrideClassCreatore("page", function () {
	    return new Page();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 38 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var koTemplate = exports.koTemplate = { html: "" };
	koTemplate.html = '<script type="text/html" id="survey-comment">  <input data-bind="value:$data.question.koComment, visible:$data.visible, css: $root.css.question.comment" /></script><div data-bind="css: $root.css.root">    <div data-bind="visible: (title.length > 0) && showTitle && koState() != \'completed\', css: $root.css.header">        <h3 data-bind="text:title"></h3>    </div>    <!-- ko if: koState() == "running" -->    <div data-bind="css: $root.css.body">        <div data-bind="visible: showProgressBar ==\'top\', template: { name: \'survey-progress\', data: $data }"></div>        <div data-bind="template: { name: \'survey-page\', data: koCurrentPage }"></div>        <div style="margin-top:10px" data-bind="visible: showProgressBar ==\'bottom\', template: { name: \'survey-progress\', data: $data }"></div>    </div>    <div data-bind="visible: showNavigationButtons && !isDesignMode, css: $root.css.footer">        <input type="button" data-bind="value: pagePrevText, click: prevPage, visible: !koIsFirstPage(), css: $root.cssNavigationPrev" />        <input type="button" data-bind="value: pageNextText, click: nextPage, visible: !koIsLastPage(), css: $root.cssNavigationNext" />        <input type="button" data-bind="value: completeText, click: completeLastPage, visible: koIsLastPage(), css: $root.cssNavigationComplete" />    </div>    <!-- /ko -->    <!-- ko if: koState() == "completed" -->    <div data-bind="html: processedCompletedHtml"></div>    <!-- /ko -->    <!-- ko if: koState() == "loading" -->    <div data-bind="html: processedLoadingHtml"></div>    <!-- /ko -->    <!-- ko if: koState() == "empty" -->    <div data-bind="text:emptySurveyText, css: $root.css.body"></div>    <!-- /ko --></div><script type="text/html" id="survey-page">    <h4 data-bind="visible: (title.length > 0) && data.showPageTitles, text: koNo() + processedTitle, css: $root.css.pageTitle"></h4>    <!-- ko foreach: { data: rows, as: \'row\'} -->    <div data-bind="visible: row.koVisible, css: $root.css.row">        <!-- ko foreach: { data: row.questions, as: \'question\' , afterRender: row.koAfterRender } -->            <!-- ko template: { name: \'survey-question\', data: question } --><!-- /ko -->        <!-- /ko -->    </div>    <!-- /ko --></script><script type="text/html" id="survey-progress">    <div style="width:60%;" data-bind="css: $root.css.progress">        <div data-bind="css: $root.css.progressBar, style:{width: koProgress() + \'%\'}"             role="progressbar" aria-valuemin="0"             aria-valuemax="100">            <span data-bind="text:koProgressText"></span>        </div>    </div></script><script type="text/html" id="survey-question-checkbox">    <form data-bind="css: $root.css.checkbox.root">        <!-- ko foreach: { data: question.koVisibleChoices, as: \'item\', afterRender: question.koAfterRender}  -->        <div data-bind="style:{width: question.koWidth, \'margin-right\': question.colCount == 0 ? \'5px\': \'0px\'}, css: $root.css.checkbox.item">            <label data-bind="css: $root.css.checkbox.item">                <input type="checkbox" data-bind="attr: {name: question.name, value: item.value}, checked: question.koValue" />                <span data-bind="text: item.text"></span>            </label>            <div data-bind="visible: question.hasOther && ($index() == question.koVisibleChoices().length-1)">                <div data-bind="template: { name: \'survey-comment\', data: {\'question\': question, \'visible\': question.koOtherVisible } }, css: $root.css.checkbox.other"></div>            </div>        </div>        <!-- /ko -->    </form></script><script type="text/html" id="survey-question-comment">    <textarea type="text" data-bind="attr: {cols: question.cols, rows: question.rows}, value:question.koValue, css: $root.css.comment" /></script><script type="text/html" id="survey-question-dropdown">    <select data-bind="options: question.koVisibleChoices, optionsText: \'text\', optionsValue: \'value\', value: question.koValue, optionsCaption: question.optionsCaption, css: $root.css.dropdown"></select>    <div data-bind="visible: question.hasOther">        <div data-bind="template: { name: \'survey-comment\', data: {\'question\': question, \'visible\': question.koOtherVisible } }"></div>    </div></script><script type="text/html" id="survey-question-errors">    <div role="alert" data-bind="visible: koErrors().length > 0, foreach: { data: koErrors, as: \'error\'}, css: $root.css.error.root">        <div>            <span aria-hidden="true" data-bind="css: $root.css.error.icon"></span>            <span data-bind="text:error.getText(), css: $root.css.error.item"></span>        </div>    </div></script><script type="text/html" id="survey-question-file">    <input type="file" data-bind="event: {change: dochange}">    <div>        <img data-bind="attr: { src: question.koData, height: question.imageHeight, width: question.imageWidth }, visible: question.koHasValue">    </div></script><script type="text/html" id="survey-question-html">    <div data-bind="html: question.processedHtml"></div></script><script type="text/html" id="survey-question-matrix">    <table data-bind="css: $root.css.matrix.root">        <thead>            <tr>                <th data-bind="visible: question.hasRows"></th>                <!-- ko foreach: question.columns -->                <th data-bind="text:$data.text"></th>                <!-- /ko -->            </tr>        </thead>        <tbody>            <!-- ko foreach: { data: question.visibleRows, as: \'row\' } -->            <tr>                <td data-bind="visible: question.hasRows, text:row.text"></td>                <!-- ko foreach: question.columns -->                <td>                    <input type="radio" data-bind="attr: {name: row.fullName, value: $data.value}, checked: row.koValue"/>                </td>                <!-- /ko -->            </tr>            <!-- /ko -->        </tbody>    </table></script><script type="text/html" id="survey-question-matrixdropdown">    <div data-bind="style: {overflowX: question.horizontalScroll? \'scroll\': \'\'}">        <table data-bind="css: $root.css.matrixdropdown.root">            <thead>                <tr>                    <th></th>                    <!-- ko foreach: question.columns -->                    <th data-bind="text: question.getColumnTitle($data), style: { minWidth: question.getColumnWidth($data) }"></th>                    <!-- /ko -->                </tr>            </thead>            <tbody>                <!-- ko foreach: { data: question.visibleRows, as: \'row\' } -->                <tr>                    <td data-bind="text:row.text"></td>                    <!-- ko foreach: row.cells-->                    <td>                        <!-- ko template: { name: \'survey-question-\' + $data.question.getType(), data: $data.question, as: \'question\' } -->                        <!-- /ko -->                    </td>                    <!-- /ko -->                </tr>                <!-- /ko -->            </tbody>        </table>    </div></script><script type="text/html" id="survey-question-matrixdynamic">    <div data-bind="style: {overflowX: question.horizontalScroll? \'scroll\': \'\'}">        <table data-bind="css: $root.css.matrixdynamic.root">            <thead>                <tr>                    <!-- ko foreach: question.columns -->                    <th data-bind="text: question.getColumnTitle($data), style: { minWidth: question.getColumnWidth($data) }"></th>                    <!-- /ko -->                    <th></th>                </tr>            </thead>            <tbody>                <!-- ko foreach: { data: question.koRows, as: \'row\' } -->                <tr>                    <!-- ko foreach: row.cells-->                    <td>                        <!-- ko template: { name: \'survey-question-errors\', data: $data.question } -->                        <!-- /ko -->                        <!-- ko template: { name: \'survey-question-\' + $data.question.getType(), data: $data.question, as: \'question\' } -->                        <!-- /ko -->                    </td>                    <!-- /ko -->                    <td><input type="button" data-bind="click:question.koRemoveRowClick, css: $root.css.matrixdynamic.button, value: question.removeRowText" /></td>                </tr>                <!-- /ko -->            </tbody>        </table>    </div>    <input type="button" data-bind="click:question.koAddRowClick, css: $root.css.matrixdynamic.button, value: question.addRowText" /></script><script type="text/html" id="survey-question-multipletext">    <table data-bind="css: $root.css.multipletext.root, foreach: { data:  question.koRows, as: \'row\' }">        <tr data-bind="foreach: { data: row, as: \'item\' }">            <td data-bind="text: item.title, css: $root.css.multipletext.itemTitle"></td>            <td><input type="text" style="float:left" data-bind="attr: {size: question.itemSize}, value: item.koValue, css: $root.css.multipletext.itemValue" /></td>        </tr>    </table></script><script type="text/html" id="survey-question-radiogroup">    <form data-bind="css: $root.css.radiogroup.root">        <!-- ko foreach: { data: question.koVisibleChoices, as: \'item\', afterRender: question.koAfterRender}  -->        <div  data-bind="style:{width: question.koWidth, \'margin-right\': question.colCount == 0 ? \'5px\': \'0px\'}, css: $root.css.radiogroup.item">            <label data-bind="css: $root.css.radiogroup.item">                <input type="radio" data-bind="attr: {name: question.name, value: item.value}, checked: question.koValue" />                <span data-bind="text: item.text"></span>            </label>            <div data-bind="visible: question.hasOther && ($index() == question.koVisibleChoices().length-1)">                <div data-bind="template: { name: \'survey-comment\', data: {\'question\': question, \'visible\': question.koOtherVisible}}, css: $root.css.radiogroup.other"></div>            </div>        </div>        <!-- /ko -->    </form></script><script type="text/html" id="survey-question-rating">    <div data-toggle="buttons" data-bind="css: $root.css.rating.root">        <!-- ko foreach: question.koVisibleRateValues -->        <label data-bind="css: question.koGetCss($data)">            <input type="radio"                    data-bind="attr: {name: question.name, id: question.name + $index(), value: $data.value}, event: { change: question.koChange}" />            <span data-bind="visible: $index() == 0, text: question.mininumRateDescription"></span>            <span data-bind="text: $data.text"></span>            <span data-bind="visible: $index() == (question.koVisibleRateValues().length-1), text: question.maximumRateDescription"></span>        </label>        <!-- /ko -->    </div>    <div data-bind="visible: question.hasOther">        <div data-bind="template: { name: \'survey-comment\', data: {\'question\': question } }"></div>    </div></script><script type="text/html" id="survey-question-text">    <input type="text" data-bind="attr: {size: question.size}, value:question.koValue, css: $root.css.text"/></script><script type="text/html" id="survey-question">    <div style="vertical-align:top" data-bind="css: $root.css.question.root, style: {display: question.koVisible() ? \'inline-block\': \'none\', marginLeft: question.koMarginLeft, paddingRight: question.koPaddingRight, width: question.koRenderWidth }, attr: {id: id}">        <!-- ko if: question.hasTitle -->        <h5 data-bind="visible: $root.questionTitleLocation == \'top\', text: question.koTitle(), css: $root.css.question.title"></h5>        <!-- /ko -->        <!-- ko template: { name: \'survey-question-errors\', data: question } -->        <!-- /ko -->        <!-- ko template: { name: \'survey-question-\' + question.getType(), data: question } -->        <!-- /ko -->        <div data-bind="visible: question.hasComment">            <div data-bind="text:question.commentText"></div>            <div data-bind="template: { name: \'survey-comment\', data: {\'question\': question, \'visible\': true } }"></div>        </div>        <!-- ko if: question.hasTitle -->        <h5 data-bind="visible: $root.questionTitleLocation == \'bottom\', text: question.koTitle(), css: $root.css.question.title"></h5>        <!-- /ko -->    </div></script>';

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.QuestionImplementorBase = undefined;
	
	var _knockout = __webpack_require__(36);
	
	var ko = _interopRequireWildcard(_knockout);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var QuestionImplementorBase = exports.QuestionImplementorBase = function () {
	    function QuestionImplementorBase(question) {
	        this.question = question;
	        var self = this;
	        question.visibilityChangedCallback = function () {
	            self.onVisibilityChanged();
	        };
	        question.renderWidthChangedCallback = function () {
	            self.onRenderWidthChanged();
	        };
	        this.koVisible = ko.observable(this.question.visible);
	        this.koRenderWidth = ko.observable(this.question.renderWidth);
	        this.koErrors = ko.observableArray();
	        this.koMarginLeft = ko.pureComputed(function () {
	            self.koRenderWidth();return self.getIndentSize(self.question.indent);
	        });
	        this.koPaddingRight = ko.observable(self.getIndentSize(self.question.rightIndent));
	        this.question["koVisible"] = this.koVisible;
	        this.question["koRenderWidth"] = this.koRenderWidth;
	        this.question["koErrors"] = this.koErrors;
	        this.question["koMarginLeft"] = this.koMarginLeft;
	        this.question["koPaddingRight"] = this.koPaddingRight;
	    }
	    QuestionImplementorBase.prototype.onVisibilityChanged = function () {
	        this.koVisible(this.question.visible);
	    };
	    QuestionImplementorBase.prototype.onRenderWidthChanged = function () {
	        this.koRenderWidth(this.question.renderWidth);
	        this.koPaddingRight(this.getIndentSize(this.question.rightIndent));
	    };
	    QuestionImplementorBase.prototype.getIndentSize = function (indent) {
	        if (indent < 1) return "";
	        if (!this.question["data"]) return "";
	        var css = this.question["data"]["css"];
	        if (!css) return "";
	        return indent * css.question.indent + "px";
	    };
	    return QuestionImplementorBase;
	}();

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionImplementor = undefined;
	
	var _knockout = __webpack_require__(36);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _koquestionbase = __webpack_require__(39);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var QuestionImplementor = exports.QuestionImplementor = function (_super) {
	    __extends(QuestionImplementor, _super);
	    function QuestionImplementor(question) {
	        _super.call(this, question);
	        this.question = question;
	        this.isUpdating = false;
	        var self = this;
	        question.valueChangedCallback = function () {
	            self.onValueChanged();
	        };
	        question.commentChangedCallback = function () {
	            self.onCommentChanged();
	        };
	        question.errorsChangedCallback = function () {
	            self.onErrorsChanged();
	        };
	        question.titleChangedCallback = function () {
	            self.onVisibleIndexChanged();
	        };
	        question.visibleIndexChangedCallback = function () {
	            self.onVisibleIndexChanged();
	        };
	        this.koDummy = ko.observable(0);
	        this.koValue = this.createkoValue();
	        this.koComment = ko.observable(this.question.comment);
	        this.koTitle = ko.pureComputed(function () {
	            self.koDummy();return self.question.fullTitle;
	        });
	        this.koErrors(this.question.errors);
	        this.koValue.subscribe(function (newValue) {
	            self.updateValue(newValue);
	        });
	        this.koComment.subscribe(function (newValue) {
	            self.updateComment(newValue);
	        });
	        this.question["koValue"] = this.koValue;
	        this.question["koComment"] = this.koComment;
	        this.question["koTitle"] = this.koTitle;
	    }
	    QuestionImplementor.prototype.onValueChanged = function () {
	        if (this.isUpdating) return;
	        this.setkoValue(this.question.value);
	    };
	    QuestionImplementor.prototype.onCommentChanged = function () {
	        if (this.isUpdating) return;
	        this.koComment(this.question.comment);
	    };
	    QuestionImplementor.prototype.onVisibilityChanged = function () {
	        this.koVisible(this.question.visible);
	    };
	    QuestionImplementor.prototype.onVisibleIndexChanged = function () {
	        this.koDummy(this.koDummy() + 1);
	    };
	    QuestionImplementor.prototype.onErrorsChanged = function () {
	        this.koErrors(this.question.errors);
	    };
	    QuestionImplementor.prototype.createkoValue = function () {
	        return ko.observable(this.question.value);
	    };
	    QuestionImplementor.prototype.setkoValue = function (newValue) {
	        this.koValue(newValue);
	    };
	    QuestionImplementor.prototype.updateValue = function (newValue) {
	        this.isUpdating = true;
	        this.question.value = newValue;
	        this.isUpdating = false;
	    };
	    QuestionImplementor.prototype.updateComment = function (newValue) {
	        this.isUpdating = true;
	        this.question.comment = newValue;
	        this.isUpdating = false;
	    };
	    QuestionImplementor.prototype.getNo = function () {
	        return this.question.visibleIndex > -1 ? this.question.visibleIndex + 1 + ". " : "";
	    };
	    return QuestionImplementor;
	}(_koquestionbase.QuestionImplementorBase);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionCheckboxBaseImplementor = exports.QuestionSelectBaseImplementor = undefined;
	
	var _knockout = __webpack_require__(36);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _koquestion = __webpack_require__(40);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var QuestionSelectBaseImplementor = exports.QuestionSelectBaseImplementor = function (_super) {
	    __extends(QuestionSelectBaseImplementor, _super);
	    function QuestionSelectBaseImplementor(question) {
	        _super.call(this, question);
	        var self = this;
	        this.koOtherVisible = ko.computed(function () {
	            self.koValue();return self.isOtherSelected;
	        });
	        this.koVisibleChoices = ko.observableArray(self.question.visibleChoices);
	        question.choicesChangedCallback = function () {
	            self.koVisibleChoices(self.question.visibleChoices);
	        };
	        this.question["koOtherVisible"] = this.koOtherVisible;
	        this.question["koVisibleChoices"] = this.koVisibleChoices;
	    }
	    Object.defineProperty(QuestionSelectBaseImplementor.prototype, "isOtherSelected", {
	        get: function get() {
	            return this.question.isOtherSelected;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return QuestionSelectBaseImplementor;
	}(_koquestion.QuestionImplementor);
	var QuestionCheckboxBaseImplementor = exports.QuestionCheckboxBaseImplementor = function (_super) {
	    __extends(QuestionCheckboxBaseImplementor, _super);
	    function QuestionCheckboxBaseImplementor(question) {
	        _super.call(this, question);
	        this.koWidth = ko.observable(this.colWidth);
	        this.question["koWidth"] = this.koWidth;
	        this.question["koAfterRender"] = this.koAfterRender;
	        var self = this;
	        this.question.colCountChangedCallback = function () {
	            self.onColCountChanged();
	        };
	    }
	    QuestionCheckboxBaseImplementor.prototype.onColCountChanged = function () {
	        this.question["koWidth"] = ko.observable(this.colWidth);
	    };
	    Object.defineProperty(QuestionCheckboxBaseImplementor.prototype, "colWidth", {
	        get: function get() {
	            var colCount = this.question.colCount;
	            return colCount > 0 ? 100 / colCount + '%' : "";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionCheckboxBaseImplementor.prototype.koAfterRender = function (el, con) {
	        var tEl = el[0];
	        if (tEl.nodeName == "#text") tEl.data = "";
	        tEl = el[el.length - 1];
	        if (tEl.nodeName == "#text") tEl.data = "";
	    };
	    return QuestionCheckboxBaseImplementor;
	}(QuestionSelectBaseImplementor);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionCheckbox = undefined;
	
	var _knockout = __webpack_require__(36);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _koquestion_baseselect = __webpack_require__(41);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var _question_checkbox = __webpack_require__(22);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var QuestionCheckboxImplementor = function (_super) {
	    __extends(QuestionCheckboxImplementor, _super);
	    function QuestionCheckboxImplementor(question) {
	        _super.call(this, question);
	    }
	    QuestionCheckboxImplementor.prototype.createkoValue = function () {
	        return this.question.value ? ko.observableArray(this.question.value) : ko.observableArray();
	    };
	    QuestionCheckboxImplementor.prototype.setkoValue = function (newValue) {
	        if (newValue) {
	            this.koValue([].concat(newValue));
	        } else {
	            this.koValue([]);
	        }
	    };
	    return QuestionCheckboxImplementor;
	}(_koquestion_baseselect.QuestionCheckboxBaseImplementor);
	var QuestionCheckbox = exports.QuestionCheckbox = function (_super) {
	    __extends(QuestionCheckbox, _super);
	    function QuestionCheckbox(name) {
	        _super.call(this, name);
	        this.name = name;
	        new QuestionCheckboxImplementor(this);
	    }
	    return QuestionCheckbox;
	}(_question_checkbox.QuestionCheckboxModel);
	_jsonobject.JsonObject.metaData.overrideClassCreatore("checkbox", function () {
	    return new QuestionCheckbox("");
	});
	_questionfactory.QuestionFactory.Instance.registerQuestion("checkbox", function (name) {
	    var q = new QuestionCheckbox(name);q.choices = _questionfactory.QuestionFactory.DefaultChoices;return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionComment = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var _question_comment = __webpack_require__(23);
	
	var _koquestion = __webpack_require__(40);
	
	var QuestionComment = exports.QuestionComment = function (_super) {
	    __extends(QuestionComment, _super);
	    function QuestionComment(name) {
	        _super.call(this, name);
	        this.name = name;
	        new _koquestion.QuestionImplementor(this);
	    }
	    return QuestionComment;
	}(_question_comment.QuestionCommentModel);
	_jsonobject.JsonObject.metaData.overrideClassCreatore("comment", function () {
	    return new QuestionComment("");
	});
	_questionfactory.QuestionFactory.Instance.registerQuestion("comment", function (name) {
	    return new QuestionComment(name);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionDropdown = undefined;
	
	var _question_dropdown = __webpack_require__(24);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var _koquestion_baseselect = __webpack_require__(41);
	
	var QuestionDropdown = exports.QuestionDropdown = function (_super) {
	    __extends(QuestionDropdown, _super);
	    function QuestionDropdown(name) {
	        _super.call(this, name);
	        this.name = name;
	        new _koquestion_baseselect.QuestionSelectBaseImplementor(this);
	    }
	    return QuestionDropdown;
	}(_question_dropdown.QuestionDropdownModel);
	_jsonobject.JsonObject.metaData.overrideClassCreatore("dropdown", function () {
	    return new QuestionDropdown("");
	});
	_questionfactory.QuestionFactory.Instance.registerQuestion("dropdown", function (name) {
	    var q = new QuestionDropdown(name);q.choices = _questionfactory.QuestionFactory.DefaultChoices;return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionFile = exports.QuestionFileImplementor = undefined;
	
	var _knockout = __webpack_require__(36);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var _question_file = __webpack_require__(25);
	
	var _koquestion = __webpack_require__(40);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var QuestionFileImplementor = exports.QuestionFileImplementor = function (_super) {
	    __extends(QuestionFileImplementor, _super);
	    function QuestionFileImplementor(question) {
	        _super.call(this, question);
	        var self = this;
	        this.koDataUpdater = ko.observable(0);
	        this.koData = ko.computed(function () {
	            self.koDataUpdater();return self.question.previewValue;
	        });
	        this.koHasValue = ko.observable(false);
	        this.question["koData"] = this.koData;
	        this.question["koHasValue"] = this.koHasValue;
	        this.question.previewValueLoadedCallback = function () {
	            self.onLoadPreview();
	        };
	        this.question["dochange"] = function (data, event) {
	            var src = event.target || event.srcElement;self.onChange(src);
	        };
	    }
	    QuestionFileImplementor.prototype.onChange = function (src) {
	        if (!window["FileReader"]) return;
	        if (!src || !src.files || src.files.length < 1) return;
	        this.question.loadFile(src.files[0]);
	    };
	    QuestionFileImplementor.prototype.onLoadPreview = function () {
	        this.koDataUpdater(this.koDataUpdater() + 1);
	        this.koHasValue(true);
	    };
	    return QuestionFileImplementor;
	}(_koquestion.QuestionImplementor);
	var QuestionFile = exports.QuestionFile = function (_super) {
	    __extends(QuestionFile, _super);
	    function QuestionFile(name) {
	        _super.call(this, name);
	        this.name = name;
	        new QuestionFileImplementor(this);
	    }
	    return QuestionFile;
	}(_question_file.QuestionFileModel);
	_jsonobject.JsonObject.metaData.overrideClassCreatore("file", function () {
	    return new QuestionFile("");
	});
	_questionfactory.QuestionFactory.Instance.registerQuestion("file", function (name) {
	    return new QuestionFile(name);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionHtml = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var _koquestionbase = __webpack_require__(39);
	
	var _question_html = __webpack_require__(26);
	
	var QuestionHtml = exports.QuestionHtml = function (_super) {
	    __extends(QuestionHtml, _super);
	    function QuestionHtml(name) {
	        _super.call(this, name);
	        this.name = name;
	        new _koquestionbase.QuestionImplementorBase(this);
	    }
	    return QuestionHtml;
	}(_question_html.QuestionHtmlModel);
	_jsonobject.JsonObject.metaData.overrideClassCreatore("html", function () {
	    return new QuestionHtml("");
	});
	_questionfactory.QuestionFactory.Instance.registerQuestion("html", function (name) {
	    return new QuestionHtml(name);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMatrix = exports.MatrixRow = undefined;
	
	var _knockout = __webpack_require__(36);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _question_matrix = __webpack_require__(19);
	
	var _koquestion = __webpack_require__(40);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var MatrixRow = exports.MatrixRow = function (_super) {
	    __extends(MatrixRow, _super);
	    function MatrixRow(name, text, fullName, data, value) {
	        _super.call(this, name, text, fullName, data, value);
	        this.name = name;
	        this.text = text;
	        this.fullName = fullName;
	        this.isValueUpdating = false;
	        this.koValue = ko.observable(this.value);
	        var self = this;
	        this.koValue.subscribe(function (newValue) {
	            if (self.isValueUpdating) true;
	            self.value = newValue;
	        });
	    }
	    MatrixRow.prototype.onValueChanged = function () {
	        this.isValueUpdating = true;
	        this.koValue(this.value);
	        this.isValueUpdating = false;
	    };
	    return MatrixRow;
	}(_question_matrix.MatrixRowModel);
	var QuestionMatrix = exports.QuestionMatrix = function (_super) {
	    __extends(QuestionMatrix, _super);
	    function QuestionMatrix(name) {
	        _super.call(this, name);
	        this.name = name;
	        new _koquestion.QuestionImplementor(this);
	    }
	    QuestionMatrix.prototype.createMatrixRow = function (name, text, fullName, value) {
	        return new MatrixRow(name, text, fullName, this, value);
	    };
	    return QuestionMatrix;
	}(_question_matrix.QuestionMatrixModel);
	_jsonobject.JsonObject.metaData.overrideClassCreatore("matrix", function () {
	    return new QuestionMatrix("");
	});
	_questionfactory.QuestionFactory.Instance.registerQuestion("matrix", function (name) {
	    var q = new QuestionMatrix(name);q.rows = ["Row 1", "Row 2"];q.columns = ["Column 1", "Column 2", "Column 3"];return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMatrixDropdown = undefined;
	
	var _question_matrixdropdown = __webpack_require__(17);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var _koquestion = __webpack_require__(40);
	
	var QuestionMatrixDropdown = exports.QuestionMatrixDropdown = function (_super) {
	    __extends(QuestionMatrixDropdown, _super);
	    function QuestionMatrixDropdown(name) {
	        _super.call(this, name);
	        this.name = name;
	        new _koquestion.QuestionImplementor(this);
	    }
	    return QuestionMatrixDropdown;
	}(_question_matrixdropdown.QuestionMatrixDropdownModel);
	_jsonobject.JsonObject.metaData.overrideClassCreatore("matrixdropdown", function () {
	    return new QuestionMatrixDropdown("");
	});
	_questionfactory.QuestionFactory.Instance.registerQuestion("matrixdropdown", function (name) {
	    var q = new QuestionMatrixDropdown(name);q.choices = [1, 2, 3, 4, 5];q.rows = ["Row 1", "Row 2"];q.addColumn("Column 1");q.addColumn("Column 2");q.addColumn("Column 3");return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMatrixDynamic = exports.QuestionMatrixDynamicImplementor = undefined;
	
	var _knockout = __webpack_require__(36);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var _koquestion = __webpack_require__(40);
	
	var _question_matrixdynamic = __webpack_require__(18);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var QuestionMatrixDynamicImplementor = exports.QuestionMatrixDynamicImplementor = function (_super) {
	    __extends(QuestionMatrixDynamicImplementor, _super);
	    function QuestionMatrixDynamicImplementor(question) {
	        _super.call(this, question);
	        this.koRecalc = ko.observable(0);
	        this.koRows = ko.pureComputed(function () {
	            this.koRecalc();
	            return this.question.cachedVisibleRows;
	        }, this);
	        this.koOverflowX = ko.pureComputed(function () {
	            return this.question.horizontalScroll ? "scroll" : "none";
	        }, this);
	        this.question["koRows"] = this.koRows;
	        var self = this;
	        this.koAddRowClick = function () {
	            self.addRow();
	        };
	        this.koRemoveRowClick = function (data) {
	            self.removeRow(data);
	        };
	        this.question["koAddRowClick"] = this.koAddRowClick;
	        this.question["koRemoveRowClick"] = this.koRemoveRowClick;
	        this.question["koOverflowX"] = this.koOverflowX;
	        this.question.rowCountChangedCallback = function () {
	            self.onRowCountChanged();
	        };
	        this.question.columnsChangedCallback = function () {
	            self.onColumnChanged();
	        };
	        this.question.updateCellsCallbak = function () {
	            self.onUpdateCells();
	        };
	    }
	    QuestionMatrixDynamicImplementor.prototype.onUpdateCells = function () {
	        //Genereate rows again.
	        var rows = this.question["generatedVisibleRows"];
	        var columns = this.question.columns;
	        if (rows && rows.length > 0 && columns && columns.length > 0) this.onColumnChanged();
	    };
	    QuestionMatrixDynamicImplementor.prototype.onColumnChanged = function () {
	        var rows = this.question.visibleRows;
	        this.onRowCountChanged();
	    };
	    QuestionMatrixDynamicImplementor.prototype.onRowCountChanged = function () {
	        this.koRecalc(this.koRecalc() + 1);
	    };
	    QuestionMatrixDynamicImplementor.prototype.addRow = function () {
	        this.question.addRow();
	    };
	    QuestionMatrixDynamicImplementor.prototype.removeRow = function (row) {
	        var rows = this.question.cachedVisibleRows;
	        var index = rows.indexOf(row);
	        if (index > -1) {
	            this.question.removeRow(index);
	        }
	    };
	    return QuestionMatrixDynamicImplementor;
	}(_koquestion.QuestionImplementor);
	var QuestionMatrixDynamic = exports.QuestionMatrixDynamic = function (_super) {
	    __extends(QuestionMatrixDynamic, _super);
	    function QuestionMatrixDynamic(name) {
	        _super.call(this, name);
	        this.name = name;
	        new QuestionMatrixDynamicImplementor(this);
	    }
	    return QuestionMatrixDynamic;
	}(_question_matrixdynamic.QuestionMatrixDynamicModel);
	_jsonobject.JsonObject.metaData.overrideClassCreatore("matrixdynamic", function () {
	    return new QuestionMatrixDynamic("");
	});
	_questionfactory.QuestionFactory.Instance.registerQuestion("matrixdynamic", function (name) {
	    var q = new QuestionMatrixDynamic(name);q.choices = [1, 2, 3, 4, 5];q.rowCount = 2;q.addColumn("Column 1");q.addColumn("Column 2");q.addColumn("Column 3");return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMultipleText = exports.QuestionMultipleTextImplementor = exports.MultipleTextItem = undefined;
	
	var _knockout = __webpack_require__(36);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _question_multipletext = __webpack_require__(20);
	
	var _koquestion = __webpack_require__(40);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var MultipleTextItem = exports.MultipleTextItem = function (_super) {
	    __extends(MultipleTextItem, _super);
	    function MultipleTextItem(name, title) {
	        if (name === void 0) {
	            name = null;
	        }
	        if (title === void 0) {
	            title = null;
	        }
	        _super.call(this, name, title);
	        this.name = name;
	        this.isKOValueUpdating = false;
	        this.koValue = ko.observable(this.value);
	        var self = this;
	        this.koValue.subscribe(function (newValue) {
	            if (!self.isKOValueUpdating) {
	                self.value = newValue;
	            }
	        });
	    }
	    MultipleTextItem.prototype.onValueChanged = function (newValue) {
	        this.isKOValueUpdating = true;
	        this.koValue(newValue);
	        this.isKOValueUpdating = false;
	    };
	    return MultipleTextItem;
	}(_question_multipletext.MultipleTextItemModel);
	var QuestionMultipleTextImplementor = exports.QuestionMultipleTextImplementor = function (_super) {
	    __extends(QuestionMultipleTextImplementor, _super);
	    function QuestionMultipleTextImplementor(question) {
	        _super.call(this, question);
	        this.koRows = ko.observableArray(this.question.getRows());
	        this.question["koRows"] = this.koRows;
	        this.onColCountChanged();
	        var self = this;
	        this.question.colCountChangedCallback = function () {
	            self.onColCountChanged();
	        };
	    }
	    QuestionMultipleTextImplementor.prototype.onColCountChanged = function () {
	        this.koRows(this.question.getRows());
	    };
	    return QuestionMultipleTextImplementor;
	}(_koquestion.QuestionImplementor);
	var QuestionMultipleText = exports.QuestionMultipleText = function (_super) {
	    __extends(QuestionMultipleText, _super);
	    function QuestionMultipleText(name) {
	        _super.call(this, name);
	        this.name = name;
	        new QuestionMultipleTextImplementor(this);
	    }
	    QuestionMultipleText.prototype.createTextItem = function (name, title) {
	        return new MultipleTextItem(name, title);
	    };
	    return QuestionMultipleText;
	}(_question_multipletext.QuestionMultipleTextModel);
	_jsonobject.JsonObject.metaData.overrideClassCreatore("multipletextitem", function () {
	    return new MultipleTextItem("");
	});
	_jsonobject.JsonObject.metaData.overrideClassCreatore("multipletext", function () {
	    return new QuestionMultipleText("");
	});
	_questionfactory.QuestionFactory.Instance.registerQuestion("multipletext", function (name) {
	    var q = new QuestionMultipleText(name);q.AddItem("text1");q.AddItem("text2");return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionRadiogroup = undefined;
	
	var _question_radiogroup = __webpack_require__(27);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var _koquestion_baseselect = __webpack_require__(41);
	
	var QuestionRadiogroup = exports.QuestionRadiogroup = function (_super) {
	    __extends(QuestionRadiogroup, _super);
	    function QuestionRadiogroup(name) {
	        _super.call(this, name);
	        this.name = name;
	        new _koquestion_baseselect.QuestionCheckboxBaseImplementor(this);
	    }
	    return QuestionRadiogroup;
	}(_question_radiogroup.QuestionRadiogroupModel);
	_jsonobject.JsonObject.metaData.overrideClassCreatore("radiogroup", function () {
	    return new QuestionRadiogroup("");
	});
	_questionfactory.QuestionFactory.Instance.registerQuestion("radiogroup", function (name) {
	    var q = new QuestionRadiogroup(name);q.choices = _questionfactory.QuestionFactory.DefaultChoices;return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionRating = undefined;
	
	var _knockout = __webpack_require__(36);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _koquestion = __webpack_require__(40);
	
	var _question_rating = __webpack_require__(28);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var QuestionRatingImplementor = function (_super) {
	    __extends(QuestionRatingImplementor, _super);
	    function QuestionRatingImplementor(question) {
	        _super.call(this, question);
	        this.koVisibleRateValues = ko.observableArray(this.getValues());
	        this.question["koVisibleRateValues"] = this.koVisibleRateValues;
	        var self = this;
	        this.koChange = function (val) {
	            self.koValue(val.itemValue);
	        };
	        this.question["koChange"] = this.koChange;
	        this.question.rateValuesChangedCallback = function () {
	            self.onRateValuesChanged();
	        };
	        this.question["koGetCss"] = function (val) {
	            var css = self.question.itemCss;
	            return self.question["koValue"]() == val.value ? css + " active" : css;
	        };
	    }
	    QuestionRatingImplementor.prototype.onRateValuesChanged = function () {
	        this.koVisibleRateValues(this.getValues());
	    };
	    QuestionRatingImplementor.prototype.getValues = function () {
	        return this.question.visibleRateValues;
	    };
	    return QuestionRatingImplementor;
	}(_koquestion.QuestionImplementor);
	var QuestionRating = exports.QuestionRating = function (_super) {
	    __extends(QuestionRating, _super);
	    function QuestionRating(name) {
	        _super.call(this, name);
	        this.name = name;
	        new QuestionRatingImplementor(this);
	    }
	    QuestionRating.prototype.onSetData = function () {
	        this.itemCss = this.data["css"].rating.item;
	    };
	    return QuestionRating;
	}(_question_rating.QuestionRatingModel);
	_jsonobject.JsonObject.metaData.overrideClassCreatore("rating", function () {
	    return new QuestionRating("");
	});
	_questionfactory.QuestionFactory.Instance.registerQuestion("rating", function (name) {
	    return new QuestionRating(name);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionText = undefined;
	
	var _question_text = __webpack_require__(29);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(16);
	
	var _koquestion = __webpack_require__(40);
	
	var QuestionText = exports.QuestionText = function (_super) {
	    __extends(QuestionText, _super);
	    function QuestionText(name) {
	        _super.call(this, name);
	        this.name = name;
	        new _koquestion.QuestionImplementor(this);
	    }
	    return QuestionText;
	}(_question_text.QuestionTextModel);
	_jsonobject.JsonObject.metaData.overrideClassCreatore("text", function () {
	    return new QuestionText("");
	});
	_questionfactory.QuestionFactory.Instance.registerQuestion("text", function (name) {
	    return new QuestionText(name);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyWindow = undefined;
	
	var _knockout = __webpack_require__(36);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _surveyWindow = __webpack_require__(33);
	
	var _kosurvey = __webpack_require__(35);
	
	var _templateWindowKo = __webpack_require__(55);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyWindow = exports.SurveyWindow = function (_super) {
	    __extends(SurveyWindow, _super);
	    function SurveyWindow(jsonObj) {
	        _super.call(this, jsonObj);
	        this.koExpanded = ko.observable(false);
	        this.koExpandedCss = ko.observable(this.getButtonCss());
	        var self = this;
	        this.doExpand = function () {
	            self.changeExpanded();
	        };
	        this.survey.onComplete.add(function (sender) {
	            self.onComplete();self.koExpandedCss(self.getButtonCss());
	        });
	    }
	    SurveyWindow.prototype.createSurvey = function (jsonObj) {
	        return new _kosurvey.Survey(jsonObj);
	    };
	    SurveyWindow.prototype.expandcollapse = function (value) {
	        _super.prototype.expandcollapse.call(this, value);
	        this.koExpanded(this.isExpandedValue);
	    };
	    Object.defineProperty(SurveyWindow.prototype, "template", {
	        get: function get() {
	            return this.templateValue ? this.templateValue : this.getDefaultTemplate();
	        },
	        set: function set(value) {
	            this.templateValue = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyWindow.prototype.show = function () {
	        this.windowElement.innerHTML = this.template;
	        ko.cleanNode(this.windowElement);
	        ko.applyBindings(this, this.windowElement);
	        document.body.appendChild(this.windowElement);
	        this.survey.render(SurveyWindow.surveyElementName);
	        this.isShowingValue = true;
	    };
	    SurveyWindow.prototype.getDefaultTemplate = function () {
	        return _templateWindowKo.koTemplate.html;
	    };
	    SurveyWindow.prototype.hide = function () {
	        document.body.removeChild(this.windowElement);
	        this.windowElement.innerHTML = "";
	        this.isShowingValue = false;
	    };
	    Object.defineProperty(SurveyWindow.prototype, "css", {
	        get: function get() {
	            return this.survey["css"];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyWindow.prototype.changeExpanded = function () {
	        this.expandcollapse(!this.isExpanded);
	    };
	    SurveyWindow.prototype.onComplete = function () {
	        this.hide();
	    };
	    SurveyWindow.prototype.getButtonCss = function () {
	        return this.koExpanded() ? this.css.window.header.buttonCollapsed : this.css.window.header.buttonExpanded;
	    };
	    return SurveyWindow;
	}(_surveyWindow.SurveyWindowModel);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 55 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var koTemplate = exports.koTemplate = { html: "" };
	koTemplate.html = '<div style="position: fixed; bottom: 3px; right: 10px;" data-bind="css: $root.css.window.root">    <div data-bind="css: $root.css.window.header.root">        <a href="#" data-bind="click:doExpand" style="width:100%">            <span style="padding-right:10px" data-bind="text:title, css: $root.css.window.header.title"></span>            <span aria-hidden="true" data-bind="css: koExpandedCss"></span>        </a>    </div>    <div data-bind="visible:koExpanded, css: $root.css.window.body">        <div id="windowSurveyJS"></div>    </div></div>';

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.SurveyTemplateText = undefined;
	
	var _templateKo = __webpack_require__(38);
	
	var SurveyTemplateText = exports.SurveyTemplateText = function () {
	    function SurveyTemplateText() {}
	    SurveyTemplateText.prototype.replaceText = function (replaceText, id, questionType) {
	        if (questionType === void 0) {
	            questionType = null;
	        }
	        id = this.getId(id, questionType);
	        var pos = this.text.indexOf(id);
	        if (pos < 0) return;
	        pos = this.text.indexOf('>', pos);
	        if (pos < 0) return;
	        var startPos = pos + 1;
	        var endString = "</script>";
	        pos = this.text.indexOf(endString, startPos);
	        if (pos < 0) return;
	        this.text = this.text.substr(0, startPos) + replaceText + this.text.substr(pos);
	    };
	    SurveyTemplateText.prototype.getId = function (id, questionType) {
	        var result = 'id="survey-' + id;
	        if (questionType) {
	            result += "-" + questionType;
	        }
	        return result + '"';
	    };
	    Object.defineProperty(SurveyTemplateText.prototype, "text", {
	        get: function get() {
	            return _templateKo.koTemplate.html;
	        },
	        set: function set(value) {
	            _templateKo.koTemplate.html = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return SurveyTemplateText;
	}();

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(58);
	
	__webpack_require__(59);
	
	__webpack_require__(60);
	
	__webpack_require__(61);

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.russianSurveyStrings = undefined;
	
	var _surveyStrings = __webpack_require__(6);
	
	var russianSurveyStrings = exports.russianSurveyStrings = {
	    pagePrevText: "Назад",
	    pageNextText: "Далее",
	    completeText: "Готово",
	    progressText: "Страница {0} из {1}",
	    emptySurvey: "Нет ни одного вопроса.",
	    completingSurvey: "Благодарим Вас за заполнение анкеты!",
	    loadingSurvey: "Загрузка с сервера...",
	    otherItemText: "Другое (пожалуйста, опишите)",
	    optionsCaption: "Выбрать...",
	    requiredError: "Пожалуйста, ответьте на вопрос.",
	    numericError: "Ответ должен быть числом.",
	    textMinLength: "Пожалуйста, введите хотя бы {0} символов.",
	    minSelectError: "Пожалуйста, выберите хотя бы {0} вариантов.",
	    maxSelectError: "Пожалуйста, выберите не более {0} вариантов.",
	    numericMinMax: "'{0}' должно быть равным или больше, чем {1}, и равным или меньше, чем {2}",
	    numericMin: "'{0}' должно быть равным или больше, чем {1}",
	    numericMax: "'{0}' должно быть равным или меньше, чем {1}",
	    invalidEmail: "Пожалуйста, введите действительный адрес электронной почты.",
	    otherRequiredError: "Пожалуйста, введите данные в поле \"Другое\""
	};
	_surveyStrings.surveyLocalization.locales["ru"] = russianSurveyStrings;

/***/ },
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.frenchSurveyStrings = undefined;
	
	var _surveyStrings = __webpack_require__(6);
	
	var frenchSurveyStrings = exports.frenchSurveyStrings = {
	    pagePrevText: "Pr\xE9c\xE9dent",
	    pageNextText: "Suivant",
	    completeText: "Terminer",
	    otherItemText: "Autre (pr\xE9ciser)",
	    progressText: "Page {0} sur {1}",
	    emptySurvey: "Il n'y a ni page visible ni question visible dans ce questionnaire",
	    completingSurvey: "Merci d'avoir r\xE9pondu au questionnaire!",
	    loadingSurvey: "Le questionnaire est en cours de chargement...",
	    optionsCaption: "Choisissez...",
	    requiredError: "La r\xE9ponse \xE0 cette question est obligatoire.",
	    numericError: "La r\xE9ponse doit \xEAtre un nombre.",
	    textMinLength: "Merci d'entrer au moins {0} symboles.",
	    minSelectError: "Merci de s\xE9lectionner au moins {0}r\xE9ponses.",
	    maxSelectError: "Merci de s\xE9lectionner au plus {0}r\xE9ponses.",
	    numericMinMax: "Votre r\xE9ponse '{0}' doit \xEAtresup\xE9rieure ou \xE9gale \xE0 {1} et inf\xE9rieure ou\xE9gale \xE0 {2}",
	    numericMin: "Votre r\xE9ponse '{0}' doit \xEAtresup\xE9rieure ou \xE9gale \xE0 {1}",
	    numericMax: "Votre r\xE9ponse '{0}' doit \xEAtreinf\xE9rieure ou \xE9gale \xE0 {1}",
	    invalidEmail: "Merci d'entrer une adresse mail valide.",
	    exceedMaxSize: "La taille du fichier ne doit pas exc\xE9der {0}.",
	    otherRequiredError: "Merci de pr\xE9ciser le champ 'Autre'."
	};
	_surveyStrings.surveyLocalization.locales["fr"] = frenchSurveyStrings;

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.finnishSurveyStrings = undefined;
	
	var _surveyStrings = __webpack_require__(6);
	
	var finnishSurveyStrings = exports.finnishSurveyStrings = {
	    pagePrevText: "Edellinen",
	    pageNextText: "Seuraava",
	    completeText: "Valmis",
	    otherItemText: "Muu (kuvaile)",
	    progressText: "Sivu {0}/{1}",
	    emptySurvey: "Tässä kyselyssä ei ole yhtäkään näkyvillä olevaa sivua tai kysymystä.",
	    completingSurvey: "Kiitos kyselyyn vastaamisesta!",
	    loadingSurvey: "Kyselyä ladataan palvelimelta...",
	    optionsCaption: "Valitse...",
	    requiredError: "Vastaa kysymykseen, kiitos.",
	    numericError: "Arvon tulee olla numeerinen.",
	    textMinLength: "Ole hyvä ja syötä vähintään {0} merkkiä.",
	    minSelectError: "Ole hyvä ja valitse vähintään {0} vaihtoehtoa.",
	    maxSelectError: "Ole hyvä ja valitse enintään {0} vaihtoehtoa.",
	    numericMinMax: "'{0}' täytyy olla enemmän tai yhtä suuri kuin {1} ja vähemmän tai yhtä suuri kuin {2}",
	    numericMin: "'{0}' täytyy olla enemmän tai yhtä suuri kuin {1}",
	    numericMax: "'{0}' täytyy olla vähemmän tai yhtä suuri kuin {1}",
	    invalidEmail: "Syötä validi sähköpostiosoite.",
	    otherRequiredError: "Ole hyvä ja syötä \"Muu (kuvaile)\""
	};
	_surveyStrings.surveyLocalization.locales["fi"] = finnishSurveyStrings;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.germanSurveyStrings = undefined;
	
	var _surveyStrings = __webpack_require__(6);
	
	var germanSurveyStrings = exports.germanSurveyStrings = {
	    pagePrevText: "Zurück",
	    pageNextText: "Weiter",
	    completeText: "Fertig",
	    progressText: "Seite {0} von {1}",
	    emptySurvey: "Es gibt keine sichtbare Frage.",
	    completingSurvey: "Vielen Dank für das Ausfüllen des Fragebogens!",
	    loadingSurvey: "Der Fragebogen wird vom Server geladen...",
	    otherItemText: "Benutzerdefinierte Antwort...",
	    optionsCaption: "Wählen...",
	    requiredError: "Bitte antworten Sie auf die Frage.",
	    numericError: "Der Wert sollte eine Zahl sein.",
	    textMinLength: "Bitte geben Sie mindestens {0} Symbole.",
	    minSelectError: "Bitte wählen Sie mindestens {0} Varianten.",
	    maxSelectError: "Bitte wählen Sie nicht mehr als {0} Varianten.",
	    numericMinMax: "'{0}' solte gleich oder größer sein als {1} und gleich oder kleiner als {2}",
	    numericMin: "'{0}' solte gleich oder größer sein als {1}",
	    numericMax: "'{0}' solte gleich oder kleiner als {1}",
	    invalidEmail: "Bitte geben Sie eine gültige Email-Adresse ein.",
	    exceedMaxSize: "Die Dateigröße soll nicht mehr als {0}.",
	    otherRequiredError: "Bitte geben Sie einen Wert für Ihre benutzerdefinierte Antwort ein."
	};
	_surveyStrings.surveyLocalization.locales["de"] = germanSurveyStrings;

/***/ },
/* 62 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(63);

/***/ },
/* 63 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.defaultBootstrapCss = undefined;
	
	var _cssstandard = __webpack_require__(34);
	
	var defaultBootstrapCss = exports.defaultBootstrapCss = {
	    root: "",
	    header: "panel-heading",
	    body: "panel-body",
	    footer: "panel-footer",
	    navigationButton: "", navigation: { complete: "", prev: "", next: "" },
	    progress: "progress center-block", progressBar: "progress-bar",
	    pageTitle: "",
	    row: "",
	    question: { root: "", title: "", comment: "form-control", indent: 20 },
	    error: { root: "alert alert-danger", icon: "glyphicon glyphicon-exclamation-sign", item: "" },
	    checkbox: { root: "form-inline", item: "checkbox", other: "" },
	    comment: "form-control",
	    dropdown: "form-control",
	    matrix: { root: "table" },
	    matrixdropdown: { root: "table" },
	    matrixdynamic: { root: "table", button: "button" },
	    multipletext: { root: "table", itemTitle: "", itemValue: "form-control" },
	    radiogroup: { root: "form-inline", item: "radio", other: "" },
	    rating: { root: "btn-group", item: "btn btn-default" },
	    text: "form-control",
	    window: {
	        root: "modal-content", body: "modal-body",
	        header: {
	            root: "modal-header panel-title", title: "pull-left", button: "glyphicon pull-right",
	            buttonExpanded: "glyphicon pull-right glyphicon-chevron-up", buttonCollapsed: "glyphicon pull-right glyphicon-chevron-down"
	        }
	    }
	};
	_cssstandard.surveyCss["bootstrap"] = defaultBootstrapCss;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCAxMTUwNzliMWJiYTNiODRiNmEyYiIsIndlYnBhY2s6Ly8vLi9zcmMvZW50cmllcy9rby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50cmllcy9jaHVua3MvbW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0ZW5kcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1cnZleVN0cmluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzb25vYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nob2ljZXNSZXN0ZnVsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZGl0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZGl0aW9uc1BhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb25fbWF0cml4ZHJvcGRvd25iYXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb25iYXNlLnRzIiwid2VicGFjazovLy8uL3NyYy90ZXh0UHJlUHJvY2Vzc29yLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9iYXNlc2VsZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbmZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX21hdHJpeGRyb3Bkb3duLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9tYXRyaXhkeW5hbWljLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9tYXRyaXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX211bHRpcGxldGV4dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb25fY2hlY2tib3gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX2NvbW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX2Ryb3Bkb3duLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9maWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9odG1sLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9yYWRpb2dyb3VwLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9yYXRpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX3RleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1cnZleS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZHhTdXJ2ZXlTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy90cmlnZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9zdXJ2ZXlXaW5kb3cudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZmF1bHRDc3MvY3Nzc3RhbmRhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvc3VydmV5LnRzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJrb1wiLFwiY29tbW9uanMyXCI6XCJrbm9ja291dFwiLFwiY29tbW9uanNcIjpcImtub2Nrb3V0XCIsXCJhbWRcIjpcImtub2Nrb3V0XCJ9Iiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3BhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L3RlbXBsYXRlLmtvLmh0bWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25iYXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX2Jhc2VzZWxlY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fY2hlY2tib3gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fY29tbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMva25vY2tvdXQva29xdWVzdGlvbl9kcm9wZG93bi50cyIsIndlYnBhY2s6Ly8vLi9zcmMva25vY2tvdXQva29xdWVzdGlvbl9maWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX2h0bWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fbWF0cml4LnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX21hdHJpeGRyb3Bkb3duLnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX21hdHJpeGR5bmFtaWMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fbXVsdGlwbGV0ZXh0LnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX3JhZGlvZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fcmF0aW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX3RleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvU3VydmV5V2luZG93LnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC90ZW1wbGF0ZS53aW5kb3cua28uaHRtbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMva25vY2tvdXQvdGVtcGxhdGVUZXh0LnRzIiwid2VicGFjazovLy8uL3NyYy9lbnRyaWVzL2NodW5rcy9sb2NhbGl6YXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvY2FsaXphdGlvbi9ydXNzaWFuLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2NhbGl6YXRpb24vZnJlbmNoLnRzIiwid2VicGFjazovLy8uL3NyYy9sb2NhbGl6YXRpb24vZmlubmlzaC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9jYWxpemF0aW9uL2dlcm1hbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50cmllcy9jaHVua3MvY3NzRnJhbWV3b3Jrcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVmYXVsdENzcy9jc3Nib290c3RyYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsQ0FBQztBQUNELE87QUNWQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSx1QkFBZTtBQUNmO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7Ozs7Ozs7Ozs7OztBQ3JDK0I7Ozs7Ozs7Ozs7Ozs7Ozt5QkFNOEI7Ozs7Ozs7OztzQkFNN0Q7Ozs7Ozs7OztvQkFBbUI7Ozs7OztvQkFDbkI7Ozs7Ozs7Ozs0QkFDQTs7Ozs7Ozs7O3dCQUNBOzs7Ozs7Ozs7bUNBQ0E7Ozs7OzttQ0FDQTs7Ozs7Ozs7O2lDQUNBOzs7Ozs7Ozs7Z0NBQ0E7Ozs7Ozs7OztpQ0FDQTs7Ozs7Ozs7OzZCQUNBOzs7Ozs7Ozs7NkJBQ0E7Ozs7Ozs7OzsrQkFBaUI7Ozs7OzsrQkFDakI7Ozs7Ozs7Ozt1Q0FDQTs7Ozs7Ozs7O3NDQUNvQzs7Ozs7O3NDQUdwQzs7Ozs7Ozs7O3FDQUNvQjs7Ozs7O3FDQUFpQzs7Ozs7O3FDQUdyRDs7Ozs7Ozs7O21DQUNBOzs7Ozs7Ozs7K0JBQ0E7Ozs7Ozs7Ozs2QkFDQTs7Ozs7Ozs7OzRCQUNBOzs7Ozs7Ozs7MEJBRUE7Ozs7Ozs7OztxQkFBcUM7Ozs7QUFoQ3JDOztBQUtBLHlCOzs7Ozs7Ozs7Ozs7Ozs7dUJDWHdCOzs7Ozs7dUJBQWdCOzs7Ozs7dUJBQWtCOzs7Ozs7dUJBQWdCOzs7Ozs7dUJBQ3ZEOzs7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QUFnQjtBQUNsQixhQUFFLEVBQU0sTUFBVztBQUNYLHFCQUFFLEVBQU0sTUFBVztBQUNwQixvQkFBRSxFQUFNLE1BQVMsU0FBUSxRQUFZO0FBQ3RDLG1CQUFFLEVBQU0sTUFBUyxTQUFXLFdBQUksSUFBVyxXQUFrQjtBQUMvRCxpQkFBRSxFQUFNLE1BQWUsZUFBTSxNQUFTLFNBQU8sT0FBTTtBQUN2RCxhQUFFLEVBQU0sTUFBYSxhQUFNLE1BQXFCO0FBQ2xELFdBQWdCO0FBQ2Q7QUFDRSxlQUFpQixpQkFBTSxNQUFjO0FBQ25DO0FBQ0UsbUJBQTRCLDRCQUFPLE9BQWEsYUFBUSxRQUF3QjtBQUN0RSw2QkFBNkMsNkNBQWlCLGlCQUd0RjtBQUxjO0FBRko7QUF0QnFCO0FBOEJ4Qix3QkFBYSxlQUF1QixvQiIsImZpbGUiOiJzdXJ2ZXkua28uanMiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gd2VicGFja1VuaXZlcnNhbE1vZHVsZURlZmluaXRpb24ocm9vdCwgZmFjdG9yeSkge1xuXHRpZih0eXBlb2YgZXhwb3J0cyA9PT0gJ29iamVjdCcgJiYgdHlwZW9mIG1vZHVsZSA9PT0gJ29iamVjdCcpXG5cdFx0bW9kdWxlLmV4cG9ydHMgPSBmYWN0b3J5KHJlcXVpcmUoXCJrbm9ja291dFwiKSk7XG5cdGVsc2UgaWYodHlwZW9mIGRlZmluZSA9PT0gJ2Z1bmN0aW9uJyAmJiBkZWZpbmUuYW1kKVxuXHRcdGRlZmluZShcIlN1cnZleVwiLCBbXCJrbm9ja291dFwiXSwgZmFjdG9yeSk7XG5cdGVsc2UgaWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnKVxuXHRcdGV4cG9ydHNbXCJTdXJ2ZXlcIl0gPSBmYWN0b3J5KHJlcXVpcmUoXCJrbm9ja291dFwiKSk7XG5cdGVsc2Vcblx0XHRyb290W1wiU3VydmV5XCJdID0gZmFjdG9yeShyb290W1wia29cIl0pO1xufSkodGhpcywgZnVuY3Rpb24oX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zNl9fKSB7XG5yZXR1cm4gXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uXG4gKiovIiwiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pXG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG5cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGV4cG9ydHM6IHt9LFxuIFx0XHRcdGlkOiBtb2R1bGVJZCxcbiBcdFx0XHRsb2FkZWQ6IGZhbHNlXG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmxvYWRlZCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oMCk7XG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiB3ZWJwYWNrL2Jvb3RzdHJhcCAxMTUwNzliMWJiYTNiODRiNmEyYlxuICoqLyIsIi8vIG1vZGVsXHJcbmV4cG9ydCAqIGZyb20gXCIuL2NodW5rcy9tb2RlbFwiO1xyXG5cclxuLy8gbG9jYWxpemF0aW9uXHJcbmltcG9ydCAnLi9jaHVua3MvbG9jYWxpemF0aW9uJztcclxuXHJcbi8vIGNzcyBzdGFuZGFyZFxyXG5leHBvcnQge2RlZmF1bHRTdGFuZGFyZENzc30gZnJvbSBcIi4uL2RlZmF1bHRDc3MvY3Nzc3RhbmRhcmRcIjtcclxuLy9jc3MgZnJhbWV3b3Jrc1xyXG5pbXBvcnQgJy4vY2h1bmtzL2Nzc0ZyYW1ld29ya3MnO1xyXG5cclxuLy8ga25vY2tvdXRcclxuZXhwb3J0IHtTdXJ2ZXl9IGZyb20gXCIuLi9rbm9ja291dC9rb3N1cnZleVwiO1xyXG5leHBvcnQge1F1ZXN0aW9uUm93LCBQYWdlfSBmcm9tIFwiLi4va25vY2tvdXQva29wYWdlXCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25JbXBsZW1lbnRvckJhc2V9IGZyb20gXCIuLi9rbm9ja291dC9rb3F1ZXN0aW9uYmFzZVwiO1xyXG5leHBvcnQge1F1ZXN0aW9uSW1wbGVtZW50b3J9IGZyb20gXCIuLi9rbm9ja291dC9rb3F1ZXN0aW9uXCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25TZWxlY3RCYXNlSW1wbGVtZW50b3J9IGZyb20gXCIuLi9rbm9ja291dC9rb3F1ZXN0aW9uX2Jhc2VzZWxlY3RcIjtcclxuZXhwb3J0IHtRdWVzdGlvbkNoZWNrYm94QmFzZUltcGxlbWVudG9yfSBmcm9tIFwiLi4va25vY2tvdXQva29xdWVzdGlvbl9iYXNlc2VsZWN0XCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25DaGVja2JveH0gZnJvbSBcIi4uL2tub2Nrb3V0L2tvcXVlc3Rpb25fY2hlY2tib3hcIjtcclxuZXhwb3J0IHtRdWVzdGlvbkNvbW1lbnR9IGZyb20gXCIuLi9rbm9ja291dC9rb3F1ZXN0aW9uX2NvbW1lbnRcIjtcclxuZXhwb3J0IHtRdWVzdGlvbkRyb3Bkb3dufSBmcm9tIFwiLi4va25vY2tvdXQva29xdWVzdGlvbl9kcm9wZG93blwiO1xyXG5leHBvcnQge1F1ZXN0aW9uRmlsZX0gZnJvbSBcIi4uL2tub2Nrb3V0L2tvcXVlc3Rpb25fZmlsZVwiO1xyXG5leHBvcnQge1F1ZXN0aW9uSHRtbH0gZnJvbSBcIi4uL2tub2Nrb3V0L2tvcXVlc3Rpb25faHRtbFwiO1xyXG5leHBvcnQge01hdHJpeFJvdywgUXVlc3Rpb25NYXRyaXh9IGZyb20gXCIuLi9rbm9ja291dC9rb3F1ZXN0aW9uX21hdHJpeFwiO1xyXG5leHBvcnQge1F1ZXN0aW9uTWF0cml4RHJvcGRvd259IGZyb20gXCIuLi9rbm9ja291dC9rb3F1ZXN0aW9uX21hdHJpeGRyb3Bkb3duXCI7XHJcbmV4cG9ydCB7XHJcbiAgICBRdWVzdGlvbk1hdHJpeER5bmFtaWNJbXBsZW1lbnRvcixcclxuICAgIFF1ZXN0aW9uTWF0cml4RHluYW1pY1xyXG59IGZyb20gXCIuLi9rbm9ja291dC9rb3F1ZXN0aW9uX21hdHJpeGR5bmFtaWNcIjtcclxuZXhwb3J0IHtcclxuICAgIE11bHRpcGxlVGV4dEl0ZW0sIFF1ZXN0aW9uTXVsdGlwbGVUZXh0SW1wbGVtZW50b3IsXHJcbiAgICBRdWVzdGlvbk11bHRpcGxlVGV4dFxyXG59IGZyb20gXCIuLi9rbm9ja291dC9rb3F1ZXN0aW9uX211bHRpcGxldGV4dFwiO1xyXG5leHBvcnQge1F1ZXN0aW9uUmFkaW9ncm91cH0gZnJvbSBcIi4uL2tub2Nrb3V0L2tvcXVlc3Rpb25fcmFkaW9ncm91cFwiO1xyXG5leHBvcnQge1F1ZXN0aW9uUmF0aW5nfSBmcm9tIFwiLi4va25vY2tvdXQva29xdWVzdGlvbl9yYXRpbmdcIjtcclxuZXhwb3J0IHtRdWVzdGlvblRleHR9IGZyb20gXCIuLi9rbm9ja291dC9rb3F1ZXN0aW9uX3RleHRcIjtcclxuZXhwb3J0IHtTdXJ2ZXlXaW5kb3d9IGZyb20gXCIuLi9rbm9ja291dC9rb1N1cnZleVdpbmRvd1wiO1xyXG5leHBvcnQge1N1cnZleVRlbXBsYXRlVGV4dH0gZnJvbSBcIi4uL2tub2Nrb3V0L3RlbXBsYXRlVGV4dFwiO1xyXG5cclxuZXhwb3J0IHtfX2V4dGVuZHN9IGZyb20gXCIuLi9leHRlbmRzXCI7XHJcblxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9lbnRyaWVzL2tvLnRzXG4gKiovIiwiZXhwb3J0IHtcclxuICAgIEFuc3dlckNvdW50VmFsaWRhdG9yLCBFbWFpbFZhbGlkYXRvciwgTnVtZXJpY1ZhbGlkYXRvciwgUmVnZXhWYWxpZGF0b3IsXHJcbiAgICBTdXJ2ZXlWYWxpZGF0b3IsIFRleHRWYWxpZGF0b3IsIFZhbGlkYXRvclJlc3VsdCwgVmFsaWRhdG9yUnVubmVyXHJcbn0gZnJvbSBcIi4uLy4uL3ZhbGlkYXRvclwiO1xyXG5leHBvcnQge0Jhc2UsIEV2ZW50LCBJdGVtVmFsdWUsIFN1cnZleUVycm9yLCBJU3VydmV5fSBmcm9tIFwiLi4vLi4vYmFzZVwiO1xyXG5leHBvcnQge0Nob2ljZXNSZXN0ZnVsbH0gZnJvbSBcIi4uLy4uL2Nob2ljZXNSZXN0ZnVsbFwiO1xyXG5leHBvcnQge0NvbmRpdGlvbiwgQ29uZGl0aW9uTm9kZSwgQ29uZGl0aW9uUnVubmVyfSBmcm9tIFwiLi4vLi4vY29uZGl0aW9uc1wiO1xyXG5leHBvcnQge0NvbmRpdGlvbnNQYXJzZXJ9IGZyb20gXCIuLi8uLi9jb25kaXRpb25zUGFyc2VyXCI7XHJcbmV4cG9ydCB7Q3VzdG9tRXJyb3IsIEV4Y2VlZFNpemVFcnJvciwgUmVxdXJlTnVtZXJpY0Vycm9yfSBmcm9tIFwiLi4vLi4vZXJyb3JcIjtcclxuZXhwb3J0IHtcclxuICAgIEpzb25FcnJvciwgSnNvbkluY29ycmVjdFR5cGVFcnJvciwgSnNvbk1ldGFkYXRhLCBKc29uTWV0YWRhdGFDbGFzcyxcclxuICAgIEpzb25NaXNzaW5nVHlwZUVycm9yLCBKc29uTWlzc2luZ1R5cGVFcnJvckJhc2UsIEpzb25PYmplY3QsIEpzb25PYmplY3RQcm9wZXJ0eSxcclxuICAgIEpzb25SZXF1aXJlZFByb3BlcnR5RXJyb3IsIEpzb25Vbmtub3duUHJvcGVydHlFcnJvclxyXG59IGZyb20gXCIuLi8uLi9qc29ub2JqZWN0XCI7XHJcbmV4cG9ydCB7XHJcbiAgICBNYXRyaXhEcm9wZG93bkNlbGwsIE1hdHJpeERyb3Bkb3duQ29sdW1uLCBNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZSxcclxuICAgIFF1ZXN0aW9uTWF0cml4RHJvcGRvd25Nb2RlbEJhc2VcclxufSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25fbWF0cml4ZHJvcGRvd25iYXNlXCI7XHJcbmV4cG9ydCB7TWF0cml4RHJvcGRvd25Sb3dNb2RlbCwgUXVlc3Rpb25NYXRyaXhEcm9wZG93bk1vZGVsfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25fbWF0cml4ZHJvcGRvd25cIjtcclxuZXhwb3J0IHtNYXRyaXhEeW5hbWljUm93TW9kZWwsIFF1ZXN0aW9uTWF0cml4RHluYW1pY01vZGVsfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25fbWF0cml4ZHluYW1pY1wiO1xyXG5leHBvcnQge01hdHJpeFJvd01vZGVsLCBRdWVzdGlvbk1hdHJpeE1vZGVsfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25fbWF0cml4XCI7XHJcbmV4cG9ydCB7TXVsdGlwbGVUZXh0SXRlbU1vZGVsLCBRdWVzdGlvbk11bHRpcGxlVGV4dE1vZGVsfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25fbXVsdGlwbGV0ZXh0XCI7XHJcbmV4cG9ydCB7UGFnZU1vZGVsLCBRdWVzdGlvblJvd01vZGVsfSBmcm9tIFwiLi4vLi4vcGFnZVwiO1xyXG5leHBvcnQge1F1ZXN0aW9ufSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25cIjtcclxuZXhwb3J0IHtRdWVzdGlvbkJhc2V9IGZyb20gXCIuLi8uLi9xdWVzdGlvbmJhc2VcIjtcclxuZXhwb3J0IHtRdWVzdGlvbkNoZWNrYm94QmFzZSwgUXVlc3Rpb25TZWxlY3RCYXNlfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25fYmFzZXNlbGVjdFwiO1xyXG5leHBvcnQge1F1ZXN0aW9uQ2hlY2tib3hNb2RlbH0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX2NoZWNrYm94XCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25Db21tZW50TW9kZWx9IGZyb20gXCIuLi8uLi9xdWVzdGlvbl9jb21tZW50XCI7XHJcbmV4cG9ydCB7IFF1ZXN0aW9uRHJvcGRvd25Nb2RlbH0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX2Ryb3Bkb3duXCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25GaWxlTW9kZWx9IGZyb20gXCIuLi8uLi9xdWVzdGlvbl9maWxlXCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25IdG1sTW9kZWx9IGZyb20gXCIuLi8uLi9xdWVzdGlvbl9odG1sXCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25SYWRpb2dyb3VwTW9kZWx9IGZyb20gXCIuLi8uLi9xdWVzdGlvbl9yYWRpb2dyb3VwXCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25SYXRpbmdNb2RlbH0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX3JhdGluZ1wiO1xyXG5leHBvcnQge1F1ZXN0aW9uVGV4dE1vZGVsfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25fdGV4dFwiO1xyXG5leHBvcnQge1N1cnZleU1vZGVsfSBmcm9tIFwiLi4vLi4vc3VydmV5XCI7XHJcbmV4cG9ydCB7XHJcbiAgICBTdXJ2ZXlUcmlnZ2VyLCBTdXJ2ZXlUcmlnZ2VyQ29tcGxldGUsIFN1cnZleVRyaWdnZXJTZXRWYWx1ZSwgU3VydmV5VHJpZ2dlclZpc2libGUsXHJcbiAgICBUcmlnZ2VyXHJcbn0gZnJvbSBcIi4uLy4uL3RyaWdnZXJcIjtcclxuZXhwb3J0IHtTdXJ2ZXlXaW5kb3dNb2RlbH0gZnJvbSBcIi4uLy4uL3N1cnZleVdpbmRvd1wiO1xyXG5leHBvcnQge1RleHRQcmVQcm9jZXNzb3J9IGZyb20gXCIuLi8uLi90ZXh0UHJlUHJvY2Vzc29yXCI7XHJcblxyXG5leHBvcnQge2R4U3VydmV5U2VydmljZX0gZnJvbSBcIi4uLy4uL2R4U3VydmV5U2VydmljZVwiO1xyXG5leHBvcnQge3N1cnZleUxvY2FsaXphdGlvbiwgc3VydmV5U3RyaW5nc30gZnJvbSBcIi4uLy4uL3N1cnZleVN0cmluZ3NcIjtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9lbnRyaWVzL2NodW5rcy9tb2RlbC50c1xuICoqLyIsImltcG9ydCB7QmFzZSwgU3VydmV5RXJyb3J9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtDdXN0b21FcnJvciwgUmVxdXJlTnVtZXJpY0Vycm9yfSBmcm9tIFwiLi9lcnJvclwiO1xyXG5pbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4vc3VydmV5U3RyaW5nc1wiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gJy4vanNvbm9iamVjdCc7XHJcblxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yUmVzdWx0IHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB2YWx1ZTogYW55LCBwdWJsaWMgZXJyb3I6IFN1cnZleUVycm9yID0gbnVsbCkge1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3VydmV5VmFsaWRhdG9yIGV4dGVuZHMgQmFzZSB7XHJcbiAgICBwdWJsaWMgdGV4dDogc3RyaW5nID0gXCJcIjtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0RXJyb3JUZXh0KG5hbWU6IHN0cmluZykgOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLnRleHQpIHJldHVybiB0aGlzLnRleHQ7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0RGVmYXVsdEVycm9yVGV4dChuYW1lKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXREZWZhdWx0RXJyb3JUZXh0KG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdmFsaWRhdGUodmFsdWU6IGFueSwgbmFtZTogc3RyaW5nID0gbnVsbCk6IFZhbGlkYXRvclJlc3VsdCB7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJVmFsaWRhdG9yT3duZXIge1xyXG4gICAgdmFsaWRhdG9yczogQXJyYXk8U3VydmV5VmFsaWRhdG9yPjtcclxuICAgIHZhbHVlOiBhbnk7XHJcbiAgICBnZXRWYWxpZGF0b3JUaXRsZSgpOiBzdHJpbmc7XHJcbn1cclxuZXhwb3J0IGNsYXNzIFZhbGlkYXRvclJ1bm5lciB7XHJcbiAgICBwdWJsaWMgcnVuKG93bmVyOiBJVmFsaWRhdG9yT3duZXIpOiBTdXJ2ZXlFcnJvciB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBvd25lci52YWxpZGF0b3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWxpZGF0b3JSZXN1bHQgPSBvd25lci52YWxpZGF0b3JzW2ldLnZhbGlkYXRlKG93bmVyLnZhbHVlLCBvd25lci5nZXRWYWxpZGF0b3JUaXRsZSgpKTtcclxuICAgICAgICAgICAgaWYgKHZhbGlkYXRvclJlc3VsdCAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRhdG9yUmVzdWx0LmVycm9yKSByZXR1cm4gdmFsaWRhdG9yUmVzdWx0LmVycm9yO1xyXG4gICAgICAgICAgICAgICAgaWYgKHZhbGlkYXRvclJlc3VsdC52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIG93bmVyLnZhbHVlID0gdmFsaWRhdG9yUmVzdWx0LnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTnVtZXJpY1ZhbGlkYXRvciBleHRlbmRzIFN1cnZleVZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbWluVmFsdWU6IG51bWJlciA9IG51bGwsIHB1YmxpYyBtYXhWYWx1ZTogbnVtYmVyID0gbnVsbCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJudW1lcmljdmFsaWRhdG9yXCI7IH1cclxuICAgIHB1YmxpYyB2YWxpZGF0ZSh2YWx1ZTogYW55LCBuYW1lOiBzdHJpbmcgPSBudWxsKTogVmFsaWRhdG9yUmVzdWx0IHtcclxuICAgICAgICBpZiAoIXZhbHVlIHx8ICF0aGlzLmlzTnVtYmVyKHZhbHVlKSkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZhbGlkYXRvclJlc3VsdChudWxsLCBuZXcgUmVxdXJlTnVtZXJpY0Vycm9yKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IFZhbGlkYXRvclJlc3VsdChwYXJzZUZsb2F0KHZhbHVlKSk7XHJcbiAgICAgICAgaWYgKHRoaXMubWluVmFsdWUgJiYgdGhpcy5taW5WYWx1ZSA+IHJlc3VsdC52YWx1ZSkge1xyXG4gICAgICAgICAgICByZXN1bHQuZXJyb3IgPSBuZXcgQ3VzdG9tRXJyb3IodGhpcy5nZXRFcnJvclRleHQobmFtZSkpO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5tYXhWYWx1ZSAmJiB0aGlzLm1heFZhbHVlIDwgcmVzdWx0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lcnJvciA9IG5ldyBDdXN0b21FcnJvcih0aGlzLmdldEVycm9yVGV4dChuYW1lKSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJykgPyBudWxsIDogcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldERlZmF1bHRFcnJvclRleHQobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIHZOYW1lID0gbmFtZSA/IG5hbWUgOiBcInZhbHVlXCI7XHJcbiAgICAgICAgaWYgKHRoaXMubWluVmFsdWUgJiYgdGhpcy5tYXhWYWx1ZSkge1xyXG4gICAgICAgICAgICByZXR1cm4gc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcIm51bWVyaWNNaW5NYXhcIilbXCJmb3JtYXRcIl0odk5hbWUsIHRoaXMubWluVmFsdWUsIHRoaXMubWF4VmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm1pblZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcIm51bWVyaWNNaW5cIilbXCJmb3JtYXRcIl0odk5hbWUsIHRoaXMubWluVmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHJldHVybiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwibnVtZXJpY01heFwiKVtcImZvcm1hdFwiXSh2TmFtZSwgdGhpcy5tYXhWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc051bWJlcih2YWx1ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAhaXNOYU4ocGFyc2VGbG9hdCh2YWx1ZSkpICYmIGlzRmluaXRlKHZhbHVlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRWYWxpZGF0b3IgZXh0ZW5kcyBTdXJ2ZXlWYWxpZGF0b3Ige1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG1pbkxlbmd0aDogbnVtYmVyID0gMCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJ0ZXh0dmFsaWRhdG9yXCI7IH1cclxuICAgIHB1YmxpYyB2YWxpZGF0ZSh2YWx1ZTogYW55LCBuYW1lOiBzdHJpbmcgPSBudWxsKTogVmFsaWRhdG9yUmVzdWx0IHtcclxuICAgICAgICBpZiAodGhpcy5taW5MZW5ndGggPD0gMCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh2YWx1ZS5sZW5ndGggPCB0aGlzLm1pbkxlbmd0aCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZhbGlkYXRvclJlc3VsdChudWxsLCBuZXcgQ3VzdG9tRXJyb3IodGhpcy5nZXRFcnJvclRleHQobmFtZSkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdEVycm9yVGV4dChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICByZXR1cm4gc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcInRleHRNaW5MZW5ndGhcIilbXCJmb3JtYXRcIl0odGhpcy5taW5MZW5ndGgpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQW5zd2VyQ291bnRWYWxpZGF0b3IgZXh0ZW5kcyBTdXJ2ZXlWYWxpZGF0b3Ige1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG1pbkNvdW50OiBudW1iZXIgPSBudWxsLCBwdWJsaWMgbWF4Q291bnQ6IG51bWJlciA9IG51bGwpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIFwiYW5zd2VyY291bnR2YWxpZGF0b3JcIjsgfVxyXG4gICAgcHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIG5hbWU6IHN0cmluZyA9IG51bGwpOiBWYWxpZGF0b3JSZXN1bHQge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PSBudWxsIHx8IHZhbHVlLmNvbnN0cnVjdG9yICE9IEFycmF5KSByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgY291bnQgPSB2YWx1ZS5sZW5ndGg7XHJcbiAgICAgICAgaWYgKHRoaXMubWluQ291bnQgJiYgY291bnQgPCB0aGlzLm1pbkNvdW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmFsaWRhdG9yUmVzdWx0KG51bGwsIG5ldyBDdXN0b21FcnJvcih0aGlzLmdldEVycm9yVGV4dChzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwibWluU2VsZWN0RXJyb3JcIilbXCJmb3JtYXRcIl0odGhpcy5taW5Db3VudCkpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1heENvdW50ICYmIGNvdW50ID4gdGhpcy5tYXhDb3VudCkge1xyXG4gICAgICAgICAgICByZXR1cm4gbmV3IFZhbGlkYXRvclJlc3VsdChudWxsLCBuZXcgQ3VzdG9tRXJyb3IodGhpcy5nZXRFcnJvclRleHQoc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcIm1heFNlbGVjdEVycm9yXCIpW1wiZm9ybWF0XCJdKHRoaXMubWF4Q291bnQpKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXREZWZhdWx0RXJyb3JUZXh0KG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBuYW1lO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUmVnZXhWYWxpZGF0b3IgZXh0ZW5kcyBTdXJ2ZXlWYWxpZGF0b3Ige1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHJlZ2V4OiBzdHJpbmcgPSBudWxsKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7IHJldHVybiBcInJlZ2V4dmFsaWRhdG9yXCI7IH1cclxuICAgIHB1YmxpYyB2YWxpZGF0ZSh2YWx1ZTogYW55LCBuYW1lOiBzdHJpbmcgPSBudWxsKTogVmFsaWRhdG9yUmVzdWx0IHtcclxuICAgICAgICBpZiAoIXRoaXMucmVnZXggfHwgIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgcmUgPSBuZXcgUmVnRXhwKHRoaXMucmVnZXgpO1xyXG4gICAgICAgIGlmIChyZS50ZXN0KHZhbHVlKSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWYWxpZGF0b3JSZXN1bHQodmFsdWUsIG5ldyBDdXN0b21FcnJvcih0aGlzLmdldEVycm9yVGV4dChuYW1lKSkpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBFbWFpbFZhbGlkYXRvciBleHRlbmRzIFN1cnZleVZhbGlkYXRvciB7XHJcbiAgICBwcml2YXRlIHJlID0gL14oKFtePD4oKVxcW1xcXVxcLiw7Olxcc0BcXFwiXSsoXFwuW148PigpXFxbXFxdXFwuLDs6XFxzQFxcXCJdKykqKXwoXFxcIi4rXFxcIikpQCgoW148PigpW1xcXVxcLiw7Olxcc0BcXFwiXStcXC4pK1tePD4oKVtcXF1cXC4sOzpcXHNAXFxcIl17Mix9KSQvaTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJlbWFpbHZhbGlkYXRvclwiOyB9XHJcbiAgICBwdWJsaWMgdmFsaWRhdGUodmFsdWU6IGFueSwgbmFtZTogc3RyaW5nID0gbnVsbCk6IFZhbGlkYXRvclJlc3VsdCB7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgaWYgKHRoaXMucmUudGVzdCh2YWx1ZSkpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiBuZXcgVmFsaWRhdG9yUmVzdWx0KHZhbHVlLCBuZXcgQ3VzdG9tRXJyb3IodGhpcy5nZXRFcnJvclRleHQobmFtZSkpKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXREZWZhdWx0RXJyb3JUZXh0KG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwiaW52YWxpZEVtYWlsXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwic3VydmV5dmFsaWRhdG9yXCIsIFtcInRleHRcIl0pO1xyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwibnVtZXJpY3ZhbGlkYXRvclwiLCBbXCJtaW5WYWx1ZTpudW1iZXJcIiwgXCJtYXhWYWx1ZTpudW1iZXJcIl0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBOdW1lcmljVmFsaWRhdG9yKCk7IH0sIFwic3VydmV5dmFsaWRhdG9yXCIpO1xyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwidGV4dHZhbGlkYXRvclwiLCBbXCJtaW5MZW5ndGg6bnVtYmVyXCJdLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgVGV4dFZhbGlkYXRvcigpOyB9LCBcInN1cnZleXZhbGlkYXRvclwiKTtcclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcImFuc3dlcmNvdW50dmFsaWRhdG9yXCIsIFtcIm1pbkNvdW50Om51bWJlclwiLCBcIm1heENvdW50Om51bWJlclwiXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IEFuc3dlckNvdW50VmFsaWRhdG9yKCk7IH0sIFwic3VydmV5dmFsaWRhdG9yXCIpO1xyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwicmVnZXh2YWxpZGF0b3JcIiwgW1wicmVnZXhcIl0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBSZWdleFZhbGlkYXRvcigpOyB9LCBcInN1cnZleXZhbGlkYXRvclwiKTtcclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcImVtYWlsdmFsaWRhdG9yXCIsIFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgRW1haWxWYWxpZGF0b3IoKTsgfSwgXCJzdXJ2ZXl2YWxpZGF0b3JcIik7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvdmFsaWRhdG9yLnRzXG4gKiovIiwiZXhwb3J0IGZ1bmN0aW9uIF9fZXh0ZW5kcyAoZCwgYikge1xyXG4gICAgZm9yICh2YXIgcCBpbiBiKSBpZiAoYi5oYXNPd25Qcm9wZXJ0eShwKSkgZFtwXSA9IGJbcF07XHJcbiAgICBmdW5jdGlvbiBfXygpIHsgdGhpcy5jb25zdHJ1Y3RvciA9IGQ7IH1cclxuICAgIGQucHJvdG90eXBlID0gYiA9PT0gbnVsbCA/IE9iamVjdC5jcmVhdGUoYikgOiAoX18ucHJvdG90eXBlID0gYi5wcm90b3R5cGUsIG5ldyBfXygpKTtcclxufVxyXG5cclxuaWYgKHR5cGVvZiBtb2R1bGUgIT09ICd1bmRlZmluZWQnICYmIG1vZHVsZS5leHBvcnRzKSB7XHJcbiAgICBleHBvcnRzID0gbW9kdWxlLmV4cG9ydHMgPSBfX2V4dGVuZHM7XHJcbn1cclxuXHJcbmV4cG9ydHMuX19leHRlbmRzID0gX19leHRlbmRzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2V4dGVuZHMudHNcbiAqKi8iLCJleHBvcnQgaW50ZXJmYWNlIEhhc2hUYWJsZTxUPiB7XHJcbiAgICBba2V5OiBzdHJpbmddOiBUO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN1cnZleURhdGEge1xyXG4gICAgZ2V0VmFsdWUobmFtZTogc3RyaW5nKTogYW55O1xyXG4gICAgc2V0VmFsdWUobmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55KTtcclxuICAgIGdldENvbW1lbnQobmFtZTogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgc2V0Q29tbWVudChuYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN1cnZleSBleHRlbmRzIElTdXJ2ZXlEYXRhIHtcclxuICAgIGN1cnJlbnRQYWdlOiBJUGFnZTtcclxuICAgIHBhZ2VWaXNpYmlsaXR5Q2hhbmdlZChwYWdlOiBJUGFnZSwgbmV3VmFsdWU6IGJvb2xlYW4pO1xyXG4gICAgcXVlc3Rpb25WaXNpYmlsaXR5Q2hhbmdlZChxdWVzdGlvbjogSVF1ZXN0aW9uLCBuZXdWYWx1ZTogYm9vbGVhbik7XHJcbiAgICBxdWVzdGlvbkFkZGVkKHF1ZXN0aW9uOiBJUXVlc3Rpb24sIGluZGV4OiBudW1iZXIpO1xyXG4gICAgcXVlc3Rpb25SZW1vdmVkKHF1ZXN0aW9uOiBJUXVlc3Rpb24pO1xyXG4gICAgdmFsaWRhdGVRdWVzdGlvbihuYW1lOiBzdHJpbmcpOiBTdXJ2ZXlFcnJvcjtcclxuICAgIHByb2Nlc3NIdG1sKGh0bWw6IHN0cmluZyk6IHN0cmluZztcclxuICAgIHByb2Nlc3NUZXh0KHRleHQ6IHN0cmluZyk6IHN0cmluZztcclxuICAgIGlzRGVzaWduTW9kZTogYm9vbGVhbjtcclxuICAgIHJlcXVpcmVkVGV4dDogc3RyaW5nO1xyXG4gICAgcXVlc3Rpb25TdGFydEluZGV4OiBzdHJpbmc7XHJcbiAgICBxdWVzdGlvblRpdGxlVGVtcGxhdGU6IHN0cmluZztcclxuICAgIHN0b3JlT3RoZXJzQXNDb21tZW50OiBib29sZWFuO1xyXG4gICAgdXBsb2FkRmlsZShuYW1lOiBzdHJpbmcsIGZpbGU6IEZpbGUsIHN0b3JlRGF0YUFzVGV4dDogYm9vbGVhbiwgdXBsb2FkaW5nQ2FsbGJhY2s6IChzdGF0dXM6IHN0cmluZykgPT4gYW55KTogYm9vbGVhbjtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElDb25kaXRpb25SdW5uZXIge1xyXG4gICAgcnVuQ29uZGl0aW9uKHZhbHVlczogSGFzaFRhYmxlPGFueT4pO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSVF1ZXN0aW9uIGV4dGVuZHMgSUNvbmRpdGlvblJ1bm5lciB7XHJcbiAgICBuYW1lOiBzdHJpbmc7XHJcbiAgICB2aXNpYmxlOiBib29sZWFuO1xyXG4gICAgaGFzVGl0bGU6IGJvb2xlYW47XHJcbiAgICBzZXRWaXNpYmxlSW5kZXgodmFsdWU6IG51bWJlcik7XHJcbiAgICBvblN1cnZleVZhbHVlQ2hhbmdlZChuZXdWYWx1ZTogYW55KTtcclxuICAgIG9uU3VydmV5TG9hZCgpO1xyXG4gICAgc3VwcG9ydEdvTmV4dFBhZ2VBdXRvbWF0aWMoKTogYm9vbGVhbjtcclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElQYWdlIGV4dGVuZHMgSUNvbmRpdGlvblJ1bm5lciB7XHJcbiAgICB2aXNpYmxlOiBib29sZWFuO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSXRlbVZhbHVlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgU2VwYXJhdG9yID0gJ3wnO1xyXG4gICAgcHVibGljIHN0YXRpYyBzZXREYXRhKGl0ZW1zOiBBcnJheTxJdGVtVmFsdWU+LCB2YWx1ZXM6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBpdGVtcy5sZW5ndGggPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHZhbHVlc1tpXTtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBuZXcgSXRlbVZhbHVlKG51bGwpO1xyXG4gICAgICAgICAgICBpZiAodHlwZW9mICh2YWx1ZS52YWx1ZSkgIT09ICd1bmRlZmluZWQnKSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnRleHQgPSB0eXBlb2YgKHZhbHVlLmhhc1RleHQpICE9PSAndW5kZWZpbmVkJyA/IHZhbHVlLml0ZW1UZXh0IDogdmFsdWVbXCJ0ZXh0XCJdO1xyXG4gICAgICAgICAgICAgICAgaXRlbS52YWx1ZSA9IHZhbHVlW1widmFsdWVcIl07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldERhdGEoaXRlbXM6IEFycmF5PEl0ZW1WYWx1ZT4pOiBhbnkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gaXRlbXNbaV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmhhc1RleHQpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHsgdmFsdWU6IGl0ZW0udmFsdWUsIHRleHQ6IGl0ZW0udGV4dCB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0udmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGl0ZW1WYWx1ZTogYW55O1xyXG4gICAgcHJpdmF0ZSBpdGVtVGV4dDogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IodmFsdWU6IGFueSwgdGV4dDogc3RyaW5nID0gbnVsbCkge1xyXG4gICAgICAgIHRoaXMudGV4dCA9IHRleHQ7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIFwiaXRlbXZhbHVlXCI7IH1cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogYW55IHsgcmV0dXJuIHRoaXMuaXRlbVZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLml0ZW1WYWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIGlmICghdGhpcy5pdGVtVmFsdWUpIHJldHVybjtcclxuICAgICAgICB2YXIgc3RyOiBzdHJpbmcgPSB0aGlzLml0ZW1WYWx1ZS50b1N0cmluZygpO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHN0ci5pbmRleE9mKEl0ZW1WYWx1ZS5TZXBhcmF0b3IpO1xyXG4gICAgICAgIGlmIChpbmRleCA+IC0xKSB7XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbVZhbHVlID0gc3RyLnNsaWNlKDAsIGluZGV4KTtcclxuICAgICAgICAgICAgdGhpcy50ZXh0ID0gc3RyLnNsaWNlKGluZGV4ICsgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBoYXNUZXh0KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5pdGVtVGV4dCA/IHRydWUgOiBmYWxzZTsgfVxyXG4gICAgcHVibGljIGdldCB0ZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzVGV4dCkgcmV0dXJuIHRoaXMuaXRlbVRleHQ7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUpIHJldHVybiB0aGlzLnZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IHRleHQobmV3VGV4dDogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5pdGVtVGV4dCA9IG5ld1RleHQ7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBCYXNlIHtcclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBhYnN0cmFjdCcpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlFcnJvciB7XHJcbiAgICBwdWJsaWMgZ2V0VGV4dCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGhpcyBtZXRob2QgaXMgYWJzdHJhY3QnKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50PFQgZXh0ZW5kcyBGdW5jdGlvbiwgT3B0aW9ucz4gIHtcclxuICAgIHByaXZhdGUgY2FsbGJhY2tzOiBBcnJheTxUPjtcclxuICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuY2FsbGJhY2tzID09IG51bGwgfHwgdGhpcy5jYWxsYmFja3MubGVuZ3RoID09IDA7IH1cclxuICAgIHB1YmxpYyBmaXJlKHNlbmRlcjogYW55LCBvcHRpb25zOiBPcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tzID09IG51bGwpIHJldHVybjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2FsbGJhY2tzLmxlbmd0aDsgaSArKykge1xyXG4gICAgICAgICAgICB2YXIgY2FsbFJlc3VsdCA9IHRoaXMuY2FsbGJhY2tzW2ldKHNlbmRlciwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGQoZnVuYzogVCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzID0gbmV3IEFycmF5PFQ+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goZnVuYyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVtb3ZlKGZ1bmM6IFQpIHtcclxuICAgICAgICBpZiAodGhpcy5jYWxsYmFja3MgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuY2FsbGJhY2tzLmluZGV4T2YoZnVuYywgMCk7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2Jhc2UudHNcbiAqKi8iLCJpbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSAnLi9zdXJ2ZXlTdHJpbmdzJztcclxuaW1wb3J0IHtTdXJ2ZXlFcnJvcn0gZnJvbSBcIi4vYmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFuc3dlclJlcXVpcmVkRXJyb3IgZXh0ZW5kcyBTdXJ2ZXlFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJyZXF1aXJlZEVycm9yXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBSZXF1cmVOdW1lcmljRXJyb3IgZXh0ZW5kcyBTdXJ2ZXlFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFRleHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcIm51bWVyaWNFcnJvclwiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgRXhjZWVkU2l6ZUVycm9yIGV4dGVuZHMgU3VydmV5RXJyb3Ige1xyXG4gICAgcHJpdmF0ZSBtYXhTaXplOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihtYXhTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubWF4U2l6ZSA9IG1heFNpemU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VGV4dCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwiZXhjZWVkTWF4U2l6ZVwiKVtcImZvcm1hdFwiXSh0aGlzLmdldFRleHRTaXplKCkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRUZXh0U2l6ZSgpIHtcclxuICAgICAgICB2YXIgc2l6ZXMgPSBbJ0J5dGVzJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJ107XHJcbiAgICAgICAgdmFyIGZpeGVkID0gWzAsIDAsIDIsIDMsIDNdO1xyXG4gICAgICAgIGlmICh0aGlzLm1heFNpemUgPT0gMCkgcmV0dXJuICcwIEJ5dGUnO1xyXG4gICAgICAgIHZhciBpID0gTWF0aC5mbG9vcihNYXRoLmxvZyh0aGlzLm1heFNpemUpIC8gTWF0aC5sb2coMTAyNCkpO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMubWF4U2l6ZSAvIE1hdGgucG93KDEwMjQsIGkpO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS50b0ZpeGVkKGZpeGVkW2ldKSArICcgJyArIHNpemVzW2ldO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tRXJyb3IgZXh0ZW5kcyBTdXJ2ZXlFcnJvciB7XHJcbiAgICBwcml2YXRlIHRleHQ6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dDtcclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2Vycm9yLnRzXG4gKiovIiwiZXhwb3J0IHZhciBzdXJ2ZXlMb2NhbGl6YXRpb24gPSB7XHJcbiAgICBjdXJyZW50TG9jYWxlOiBcIlwiLFxyXG4gICAgbG9jYWxlczoge30sXHJcbiAgICBnZXRTdHJpbmc6IGZ1bmN0aW9uIChzdHJOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgbG9jID0gdGhpcy5jdXJyZW50TG9jYWxlID8gdGhpcy5sb2NhbGVzW3RoaXMuY3VycmVudExvY2FsZV0gOiBzdXJ2ZXlTdHJpbmdzO1xyXG4gICAgICAgIGlmICghbG9jIHx8ICFsb2Nbc3RyTmFtZV0pIGxvYyA9IHN1cnZleVN0cmluZ3M7XHJcbiAgICAgICAgcmV0dXJuIGxvY1tzdHJOYW1lXTtcclxuICAgIH0sXHJcbiAgICBnZXRMb2NhbGVzOiBmdW5jdGlvbiAoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgdmFyIHJlcyA9IFtdO1xyXG4gICAgICAgIHJlcy5wdXNoKFwiXCIpO1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmxvY2FsZXMpIHtcclxuICAgICAgICAgICAgcmVzLnB1c2goa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzLnNvcnQoKTtcclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgdmFyIHN1cnZleVN0cmluZ3MgPSB7XHJcbiAgICBwYWdlUHJldlRleHQ6IFwiUHJldmlvdXNcIixcclxuICAgIHBhZ2VOZXh0VGV4dDogXCJOZXh0XCIsXHJcbiAgICBjb21wbGV0ZVRleHQ6IFwiQ29tcGxldGVcIixcclxuICAgIG90aGVySXRlbVRleHQ6IFwiT3RoZXIgKGRlc2NyaWJlKVwiLFxyXG4gICAgcHJvZ3Jlc3NUZXh0OiBcIlBhZ2UgezB9IG9mIHsxfVwiLFxyXG4gICAgZW1wdHlTdXJ2ZXk6IFwiVGhlcmUgaXMgbm8gYW55IHZpc2libGUgcGFnZSBvciB2aXNpYmxlIHF1ZXN0aW9uIGluIHRoZSBzdXJ2ZXkuXCIsXHJcbiAgICBjb21wbGV0aW5nU3VydmV5OiBcIlRoYW5rIFlvdSBmb3IgQ29tcGxldGluZyB0aGUgU3VydmV5IVwiLFxyXG4gICAgbG9hZGluZ1N1cnZleTogXCJTdXJ2ZXkgaXMgbG9hZGluZyBmcm9tIHRoZSBzZXJ2ZXIuLi5cIixcclxuICAgIG9wdGlvbnNDYXB0aW9uOiBcIkNob29zZS4uLlwiLFxyXG4gICAgcmVxdWlyZWRFcnJvcjogXCJQbGVhc2UgYW5zd2VyIHRoZSBxdWVzdGlvbi5cIixcclxuICAgIHJlcXVpcmVkSW5BbGxSb3dzRXJyb3I6IFwiUGxlYXNlIGFuc3dlciBxdWVzdGlvbnMgaW4gYWxsIHJvd3MuXCIsXHJcbiAgICBudW1lcmljRXJyb3I6IFwiVGhlIHZhbHVlIHNob3VsZCBiZSBhIG51bWVyaWMuXCIsXHJcbiAgICB0ZXh0TWluTGVuZ3RoOiBcIlBsZWFzZSBlbnRlciBhdCBsZWFzdCB7MH0gc3ltYm9scy5cIixcclxuICAgIG1pblJvd0NvdW50RXJyb3I6IFwiUGxlYXNlIGZpbGwgYXQgbGVhc3QgezB9IHJvd3MuXCIsXHJcbiAgICBtaW5TZWxlY3RFcnJvcjogXCJQbGVhc2Ugc2VsZWN0IGF0IGxlYXN0IHswfSB2YXJpYW50cy5cIixcclxuICAgIG1heFNlbGVjdEVycm9yOiBcIlBsZWFzZSBzZWxlY3Qgbm90IG1vcmUgdGhhbiB7MH0gdmFyaWFudHMuXCIsXHJcbiAgICBudW1lcmljTWluTWF4OiBcIlRoZSAnezB9JyBzaG91bGQgYmUgZXF1YWwgb3IgbW9yZSB0aGFuIHsxfSBhbmQgZXF1YWwgb3IgbGVzcyB0aGFuIHsyfVwiLFxyXG4gICAgbnVtZXJpY01pbjogXCJUaGUgJ3swfScgc2hvdWxkIGJlIGVxdWFsIG9yIG1vcmUgdGhhbiB7MX1cIixcclxuICAgIG51bWVyaWNNYXg6IFwiVGhlICd7MH0nIHNob3VsZCBiZSBlcXVhbCBvciBsZXNzIHRoYW4gezF9XCIsXHJcbiAgICBpbnZhbGlkRW1haWw6IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZS1tYWlsLlwiLFxyXG4gICAgdXJsUmVxdWVzdEVycm9yOiBcIlRoZSByZXF1ZXN0IHJldHVybiBlcnJvciAnezB9Jy4gezF9XCIsXHJcbiAgICB1cmxHZXRDaG9pY2VzRXJyb3I6IFwiVGhlIHJlcXVlc3QgcmV0dXJucyBlbXB0eSBkYXRhIG9yIHRoZSAncGF0aCcgcHJvcGVydHkgaXMgaW5jb3JyZWN0XCIsXHJcbiAgICBleGNlZWRNYXhTaXplOiBcIlRoZSBmaWxlIHNpemUgc2hvdWxkIG5vdCBleGNlZWQgezB9LlwiLFxyXG4gICAgb3RoZXJSZXF1aXJlZEVycm9yOiBcIlBsZWFzZSBlbnRlciB0aGUgb3RoZXJzIHZhbHVlLlwiLFxyXG4gICAgdXBsb2FkaW5nRmlsZTogXCJZb3VyIGZpbGUgaXMgdXBsb2FkaW5nLiBQbGVhc2Ugd2FpdCBzZXZlcmFsIHNlY29uZHMgYW5kIHRyeSBhZ2Fpbi5cIixcclxuICAgIGFkZFJvdzogXCJBZGQgUm93XCIsXHJcbiAgICByZW1vdmVSb3c6IFwiUmVtb3ZlXCJcclxufTtcclxuc3VydmV5TG9jYWxpemF0aW9uLmxvY2FsZXNbXCJlblwiXSA9IHN1cnZleVN0cmluZ3M7XHJcblxyXG5pZiAoIVN0cmluZy5wcm90b3R5cGVbXCJmb3JtYXRcIl0pIHtcclxuICAgIFN0cmluZy5wcm90b3R5cGVbXCJmb3JtYXRcIl0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgveyhcXGQrKX0vZywgZnVuY3Rpb24gKG1hdGNoLCBudW1iZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBhcmdzW251bWJlcl0gIT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICAgICAgICAgID8gYXJnc1tudW1iZXJdXHJcbiAgICAgICAgICAgICAgICA6IG1hdGNoXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc3VydmV5U3RyaW5ncy50c1xuICoqLyIsImltcG9ydCB7SGFzaFRhYmxlfSBmcm9tICcuL2Jhc2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25PYmplY3RQcm9wZXJ0eSB7XHJcbiAgICBwcml2YXRlIHR5cGVWYWx1ZTogc3RyaW5nID0gbnVsbDtcclxuICAgIHByaXZhdGUgY2hvaWNlc1ZhbHVlOiBBcnJheTxhbnk+ID0gbnVsbDtcclxuICAgIHByaXZhdGUgY2hvaWNlc2Z1bmM6ICgpID0+IEFycmF5PGFueT4gPSBudWxsO1xyXG4gICAgcHVibGljIGNsYXNzTmFtZTogc3RyaW5nID0gbnVsbDtcclxuICAgIHB1YmxpYyBjbGFzc05hbWVQYXJ0OiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHVibGljIGJhc2VDbGFzc05hbWU6IHN0cmluZyA9IG51bGw7XHJcbiAgICBwdWJsaWMgZGVmYXVsdFZhbHVlOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIG9uR2V0VmFsdWU6IChvYmo6IGFueSkgPT4gYW55ID0gbnVsbDtcclxuICAgIHB1YmxpYyBvblNldFZhbHVlOiAob2JqOiBhbnksIHZhbHVlOiBhbnksIGpzb25Db252OiBKc29uT2JqZWN0KSA9PiBhbnlcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudHlwZVZhbHVlID8gdGhpcy50eXBlVmFsdWUgOiBcInN0cmluZ1wiOyB9XHJcbiAgICBwdWJsaWMgc2V0IHR5cGUodmFsdWU6IHN0cmluZykgeyB0aGlzLnR5cGVWYWx1ZSA9IHZhbHVlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGhhc1RvVXNlR2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLm9uR2V0VmFsdWU7IH1cclxuICAgIHB1YmxpYyBpc0RlZmF1bHRWYWx1ZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmRlZmF1bHRWYWx1ZSkgPyAodGhpcy5kZWZhdWx0VmFsdWUgPT0gdmFsdWUpIDogISh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VmFsdWUob2JqOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLm9uR2V0VmFsdWUpIHJldHVybiB0aGlzLm9uR2V0VmFsdWUob2JqKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaGFzVG9Vc2VTZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMub25TZXRWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldFZhbHVlKG9iajogYW55LCB2YWx1ZTogYW55LCBqc29uQ29udjogSnNvbk9iamVjdCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9uU2V0VmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5vblNldFZhbHVlKG9iaiwgdmFsdWUsIGpzb25Db252KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0T2JqVHlwZShvYmpUeXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2xhc3NOYW1lUGFydCkgcmV0dXJuIG9ialR5cGU7XHJcbiAgICAgICAgcmV0dXJuIG9ialR5cGUucmVwbGFjZSh0aGlzLmNsYXNzTmFtZVBhcnQsIFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldENsYXNzTmFtZShjbGFzc05hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmNsYXNzTmFtZVBhcnQgJiYgY2xhc3NOYW1lLmluZGV4T2YodGhpcy5jbGFzc05hbWVQYXJ0KSA8IDApID8gY2xhc3NOYW1lICsgdGhpcy5jbGFzc05hbWVQYXJ0IDogY2xhc3NOYW1lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBjaG9pY2VzKCk6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNob2ljZXNWYWx1ZSAhPSBudWxsKSByZXR1cm4gdGhpcy5jaG9pY2VzVmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hvaWNlc2Z1bmMgIT0gbnVsbCkgcmV0dXJuIHRoaXMuY2hvaWNlc2Z1bmMoKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRDaG9pY2VzKHZhbHVlOiBBcnJheTxhbnk+LCB2YWx1ZUZ1bmM6ICgpID0+IEFycmF5PGFueT4pIHtcclxuICAgICAgICB0aGlzLmNob2ljZXNWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuY2hvaWNlc2Z1bmMgPSB2YWx1ZUZ1bmM7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIEpzb25NZXRhZGF0YUNsYXNzIHtcclxuICAgIHN0YXRpYyByZXF1aXJlZFN5bWJvbCA9ICchJztcclxuICAgIHN0YXRpYyB0eXBlU3ltYm9sID0gJzonO1xyXG4gICAgcHJvcGVydGllczogQXJyYXk8SnNvbk9iamVjdFByb3BlcnR5PiA9IG51bGw7XHJcbiAgICByZXF1aXJlZFByb3BlcnRpZXM6IEFycmF5PHN0cmluZz4gPSBudWxsO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHJvcGVydGllczogQXJyYXk8YW55PiwgcHVibGljIGNyZWF0b3I6ICgpID0+IGFueSA9IG51bGwsIHB1YmxpYyBwYXJlbnROYW1lOiBzdHJpbmcgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gbmV3IEFycmF5PEpzb25PYmplY3RQcm9wZXJ0eT4oKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHByb3AgPSB0aGlzLmNyZWF0ZVByb3BlcnR5KHByb3BlcnRpZXNbaV0pO1xyXG4gICAgICAgICAgICBpZiAocHJvcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gocHJvcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZmluZChuYW1lOiBzdHJpbmcpOiBKc29uT2JqZWN0UHJvcGVydHkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXNbaV0ubmFtZSA9PSBuYW1lKSByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY3JlYXRlUHJvcGVydHkocHJvcEluZm86IGFueSk6IEpzb25PYmplY3RQcm9wZXJ0eSB7XHJcbiAgICAgICAgdmFyIHByb3BlcnR5TmFtZSA9IHR5cGVvZiBwcm9wSW5mbyA9PT0gXCJzdHJpbmdcIiA/IHByb3BJbmZvIDogcHJvcEluZm8ubmFtZTtcclxuICAgICAgICBpZiAoIXByb3BlcnR5TmFtZSkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBwcm9wZXJ0eVR5cGUgPSBudWxsO1xyXG4gICAgICAgIHZhciB0eXBlSW5kZXggPSBwcm9wZXJ0eU5hbWUuaW5kZXhPZihKc29uTWV0YWRhdGFDbGFzcy50eXBlU3ltYm9sKTtcclxuICAgICAgICBpZiAodHlwZUluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgcHJvcGVydHlUeXBlID0gcHJvcGVydHlOYW1lLnN1YnN0cmluZyh0eXBlSW5kZXggKyAxKTtcclxuICAgICAgICAgICAgcHJvcGVydHlOYW1lID0gcHJvcGVydHlOYW1lLnN1YnN0cmluZygwLCB0eXBlSW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBwcm9wZXJ0eU5hbWUgPSB0aGlzLmdldFByb3BlcnR5TmFtZShwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgIHZhciBwcm9wID0gbmV3IEpzb25PYmplY3RQcm9wZXJ0eShwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgIGlmIChwcm9wZXJ0eVR5cGUpIHtcclxuICAgICAgICAgICAgcHJvcC50eXBlID0gcHJvcGVydHlUeXBlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodHlwZW9mIHByb3BJbmZvID09PSBcIm9iamVjdFwiKSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wSW5mby50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wLnR5cGUgPSBwcm9wSW5mby50eXBlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9wSW5mby5kZWZhdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wLmRlZmF1bHRWYWx1ZSA9IHByb3BJbmZvLmRlZmF1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByb3BJbmZvLmlzUmVxdWlyZWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubWFrZVByb3BlcnR5UmVxdWlyZWQocHJvcC5uYW1lKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvcEluZm8uY2hvaWNlcykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNob2ljZXNGdW5jID0gdHlwZW9mIHByb3BJbmZvLmNob2ljZXMgPT09IFwiZnVuY3Rpb25cIiA/IHByb3BJbmZvLmNob2ljZXMgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgdmFyIGNob2ljZXNWYWx1ZSA9IHR5cGVvZiBwcm9wSW5mby5jaG9pY2VzICE9PSBcImZ1bmN0aW9uXCIgPyBwcm9wSW5mby5jaG9pY2VzIDogbnVsbDtcclxuICAgICAgICAgICAgICAgIHByb3Auc2V0Q2hvaWNlcyhjaG9pY2VzVmFsdWUsIGNob2ljZXNGdW5jKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvcEluZm8ub25HZXRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcHJvcC5vbkdldFZhbHVlID0gcHJvcEluZm8ub25HZXRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvcEluZm8ub25TZXRWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgcHJvcC5vblNldFZhbHVlID0gcHJvcEluZm8ub25TZXRWYWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvcEluZm8uY2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wLmNsYXNzTmFtZSA9IHByb3BJbmZvLmNsYXNzTmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvcEluZm8uYmFzZUNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgcHJvcC5iYXNlQ2xhc3NOYW1lID0gcHJvcEluZm8uYmFzZUNsYXNzTmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvcEluZm8uY2xhc3NOYW1lUGFydCkge1xyXG4gICAgICAgICAgICAgICAgcHJvcC5jbGFzc05hbWVQYXJ0ID0gcHJvcEluZm8uY2xhc3NOYW1lUGFydDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvcDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0UHJvcGVydHlOYW1lKHByb3BlcnR5TmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAocHJvcGVydHlOYW1lLmxlbmd0aCA9PSAwIHx8IHByb3BlcnR5TmFtZVswXSAhPSBKc29uTWV0YWRhdGFDbGFzcy5yZXF1aXJlZFN5bWJvbCkgcmV0dXJuIHByb3BlcnR5TmFtZTtcclxuICAgICAgICBwcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWUuc2xpY2UoMSk7XHJcbiAgICAgICAgdGhpcy5tYWtlUHJvcGVydHlSZXF1aXJlZChwcm9wZXJ0eU5hbWUpO1xyXG4gICAgICAgIHJldHVybiBwcm9wZXJ0eU5hbWU7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG1ha2VQcm9wZXJ0eVJlcXVpcmVkKHByb3BlcnR5TmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJlcXVpcmVkUHJvcGVydGllcykge1xyXG4gICAgICAgICAgICB0aGlzLnJlcXVpcmVkUHJvcGVydGllcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucmVxdWlyZWRQcm9wZXJ0aWVzLnB1c2gocHJvcGVydHlOYW1lKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgSnNvbk1ldGFkYXRhIHtcclxuICAgIHByaXZhdGUgY2xhc3NlczogSGFzaFRhYmxlPEpzb25NZXRhZGF0YUNsYXNzPiA9IHt9O1xyXG4gICAgcHJpdmF0ZSBjaGlsZHJlbkNsYXNzZXM6IEhhc2hUYWJsZTxBcnJheTxKc29uTWV0YWRhdGFDbGFzcz4+ID0ge307XHJcbiAgICBwcml2YXRlIGNsYXNzUHJvcGVydGllczogSGFzaFRhYmxlPEFycmF5PEpzb25PYmplY3RQcm9wZXJ0eT4+ID0ge307XHJcbiAgICBwcml2YXRlIGNsYXNzUmVxdWlyZWRQcm9wZXJ0aWVzOiBIYXNoVGFibGU8QXJyYXk8c3RyaW5nPj4gPSB7fTtcclxuICAgIHB1YmxpYyBhZGRDbGFzcyhuYW1lOiBzdHJpbmcsIHByb3BlcnRpZXM6IEFycmF5PGFueT4sIGNyZWF0b3I6ICgpID0+IGFueSA9IG51bGwsIHBhcmVudE5hbWU6IHN0cmluZyA9IG51bGwpOiBKc29uTWV0YWRhdGFDbGFzcyB7XHJcbiAgICAgICAgdmFyIG1ldGFEYXRhQ2xhc3MgPSBuZXcgSnNvbk1ldGFkYXRhQ2xhc3MobmFtZSwgcHJvcGVydGllcywgY3JlYXRvciwgcGFyZW50TmFtZSk7XHJcbiAgICAgICAgdGhpcy5jbGFzc2VzW25hbWVdID0gbWV0YURhdGFDbGFzcztcclxuICAgICAgICBpZiAocGFyZW50TmFtZSkge1xyXG4gICAgICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuQ2xhc3Nlc1twYXJlbnROYW1lXTtcclxuICAgICAgICAgICAgaWYgKCFjaGlsZHJlbikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGlsZHJlbkNsYXNzZXNbcGFyZW50TmFtZV0gPSBbXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmNoaWxkcmVuQ2xhc3Nlc1twYXJlbnROYW1lXS5wdXNoKG1ldGFEYXRhQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbWV0YURhdGFDbGFzcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBvdmVycmlkZUNsYXNzQ3JlYXRvcmUobmFtZTogc3RyaW5nLCBjcmVhdG9yOiAoKSA9PiBhbnkpIHtcclxuICAgICAgICB2YXIgbWV0YURhdGFDbGFzcyA9IHRoaXMuZmluZENsYXNzKG5hbWUpO1xyXG4gICAgICAgIGlmIChtZXRhRGF0YUNsYXNzKSB7XHJcbiAgICAgICAgICAgIG1ldGFEYXRhQ2xhc3MuY3JlYXRvciA9IGNyZWF0b3I7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFByb3BlcnRpZXMobmFtZTogc3RyaW5nKTogQXJyYXk8SnNvbk9iamVjdFByb3BlcnR5PiB7XHJcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSB0aGlzLmNsYXNzUHJvcGVydGllc1tuYW1lXTtcclxuICAgICAgICBpZiAoIXByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgcHJvcGVydGllcyA9IG5ldyBBcnJheTxKc29uT2JqZWN0UHJvcGVydHk+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsbFByb3BlcnRpZXMobmFtZSwgcHJvcGVydGllcyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NQcm9wZXJ0aWVzW25hbWVdID0gcHJvcGVydGllcztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHByb3BlcnRpZXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY3JlYXRlQ2xhc3MobmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICB2YXIgbWV0YURhdGFDbGFzcyA9IHRoaXMuZmluZENsYXNzKG5hbWUpO1xyXG4gICAgICAgIGlmICghbWV0YURhdGFDbGFzcykgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIG1ldGFEYXRhQ2xhc3MuY3JlYXRvcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldENoaWxkcmVuQ2xhc3NlcyhuYW1lOiBzdHJpbmcsIGNhbkJlQ3JlYXRlZDogYm9vbGVhbiA9IGZhbHNlKTogQXJyYXk8SnNvbk1ldGFkYXRhQ2xhc3M+IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICAgICAgdGhpcy5maWxsQ2hpbGRyZW5DbGFzc2VzKG5hbWUsIGNhbkJlQ3JlYXRlZCwgcmVzdWx0KTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFJlcXVpcmVkUHJvcGVydGllcyhuYW1lOiBzdHJpbmcpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICB2YXIgcHJvcGVydGllcyA9IHRoaXMuY2xhc3NSZXF1aXJlZFByb3BlcnRpZXNbbmFtZV07XHJcbiAgICAgICAgaWYgKCFwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHByb3BlcnRpZXMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgICAgICB0aGlzLmZpbGxSZXF1aXJlZFByb3BlcnRpZXMobmFtZSwgcHJvcGVydGllcyk7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NSZXF1aXJlZFByb3BlcnRpZXNbbmFtZV0gPSBwcm9wZXJ0aWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcclxuICAgIH1cclxuICAgIHByaXZhdGUgZmlsbENoaWxkcmVuQ2xhc3NlcyhuYW1lOiBzdHJpbmcsIGNhbkJlQ3JlYXRlZDogYm9vbGVhbiwgcmVzdWx0OiBBcnJheTxKc29uTWV0YWRhdGFDbGFzcz4pIHtcclxuICAgICAgICB2YXIgY2hpbGRyZW4gPSB0aGlzLmNoaWxkcmVuQ2xhc3Nlc1tuYW1lXTtcclxuICAgICAgICBpZiAoIWNoaWxkcmVuKSByZXR1cm47XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBjaGlsZHJlbi5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIWNhbkJlQ3JlYXRlZCB8fCBjaGlsZHJlbltpXS5jcmVhdG9yKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQucHVzaChjaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy5maWxsQ2hpbGRyZW5DbGFzc2VzKGNoaWxkcmVuW2ldLm5hbWUsIGNhbkJlQ3JlYXRlZCwgcmVzdWx0KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGZpbmRDbGFzcyhuYW1lOiBzdHJpbmcpOiBKc29uTWV0YWRhdGFDbGFzcyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2xhc3Nlc1tuYW1lXTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZmlsbFByb3BlcnRpZXMobmFtZTogc3RyaW5nLCBsaXN0OiBBcnJheTxKc29uT2JqZWN0UHJvcGVydHk+KSB7XHJcbiAgICAgICAgdmFyIG1ldGFEYXRhQ2xhc3MgPSB0aGlzLmZpbmRDbGFzcyhuYW1lKTtcclxuICAgICAgICBpZiAoIW1ldGFEYXRhQ2xhc3MpIHJldHVybjtcclxuICAgICAgICBpZiAobWV0YURhdGFDbGFzcy5wYXJlbnROYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsbFByb3BlcnRpZXMobWV0YURhdGFDbGFzcy5wYXJlbnROYW1lLCBsaXN0KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBtZXRhRGF0YUNsYXNzLnByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRQcm9wZXJ0eShtZXRhRGF0YUNsYXNzLnByb3BlcnRpZXNbaV0sIGxpc3QsIGxpc3QubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFkZFByb3BlcnR5KHByb3BlcnR5OiBKc29uT2JqZWN0UHJvcGVydHksIGxpc3Q6IEFycmF5PEpzb25PYmplY3RQcm9wZXJ0eT4sIGVuZEluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSAtMTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGVuZEluZGV4OyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGxpc3RbaV0ubmFtZSA9PSBwcm9wZXJ0eS5uYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaW5kZXggPCAwKSB7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaChwcm9wZXJ0eSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBsaXN0W2luZGV4XSA9IHByb3BlcnR5O1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgZmlsbFJlcXVpcmVkUHJvcGVydGllcyhuYW1lOiBzdHJpbmcsIGxpc3Q6IEFycmF5PHN0cmluZz4pIHtcclxuICAgICAgICB2YXIgbWV0YURhdGFDbGFzcyA9IHRoaXMuZmluZENsYXNzKG5hbWUpO1xyXG4gICAgICAgIGlmICghbWV0YURhdGFDbGFzcykgcmV0dXJuO1xyXG4gICAgICAgIGlmIChtZXRhRGF0YUNsYXNzLnJlcXVpcmVkUHJvcGVydGllcykge1xyXG4gICAgICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShsaXN0LCBtZXRhRGF0YUNsYXNzLnJlcXVpcmVkUHJvcGVydGllcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChtZXRhRGF0YUNsYXNzLnBhcmVudE5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5maWxsUmVxdWlyZWRQcm9wZXJ0aWVzKG1ldGFEYXRhQ2xhc3MucGFyZW50TmFtZSwgbGlzdCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBKc29uRXJyb3Ige1xyXG4gICAgcHVibGljIGRlc2NyaXB0aW9uOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIGF0OiBOdW1iZXIgPSAtMTtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyB0eXBlOiBzdHJpbmcsIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRGdWxsRGVzY3JpcHRpb24oKSA6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubWVzc2FnZSArICh0aGlzLmRlc2NyaXB0aW9uID8gXCJcXG5cIiArIHRoaXMuZGVzY3JpcHRpb24gOiBcIlwiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgSnNvblVua25vd25Qcm9wZXJ0eUVycm9yIGV4dGVuZHMgSnNvbkVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHVibGljIGNsYXNzTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoXCJ1bmtub3ducHJvcGVydHlcIiwgXCJUaGUgcHJvcGVydHkgJ1wiICsgcHJvcGVydHlOYW1lICsgXCInIGluIGNsYXNzICdcIiArIGNsYXNzTmFtZSArIFwiJyBpcyB1bmtub3duLlwiKTtcclxuICAgICAgICB2YXIgcHJvcGVydGllcyA9IEpzb25PYmplY3QubWV0YURhdGEuZ2V0UHJvcGVydGllcyhjbGFzc05hbWUpO1xyXG4gICAgICAgIGlmIChwcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gPSBcIlRoZSBsaXN0IG9mIGF2YWlsYWJsZSBwcm9wZXJ0aWVzIGFyZTogXCI7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgaWYgKGkgPiAwKSB0aGlzLmRlc2NyaXB0aW9uICs9IFwiLCBcIjtcclxuICAgICAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gKz0gcHJvcGVydGllc1tpXS5uYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gKz0gJy4nO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgSnNvbk1pc3NpbmdUeXBlRXJyb3JCYXNlIGV4dGVuZHMgSnNvbkVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBiYXNlQ2xhc3NOYW1lOiBzdHJpbmcsIHB1YmxpYyB0eXBlOiBzdHJpbmcsIHB1YmxpYyBtZXNzYWdlOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcih0eXBlLCBtZXNzYWdlKTtcclxuICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJUaGUgZm9sbG93aW5nIHR5cGVzIGFyZSBhdmFpbGFibGU6IFwiO1xyXG4gICAgICAgIHZhciB0eXBlcyA9IEpzb25PYmplY3QubWV0YURhdGEuZ2V0Q2hpbGRyZW5DbGFzc2VzKGJhc2VDbGFzc05hbWUsIHRydWUpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdHlwZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGkgPiAwKSB0aGlzLmRlc2NyaXB0aW9uICs9IFwiLCBcIjtcclxuICAgICAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiArPSBcIidcIiArIHR5cGVzW2ldLm5hbWUgKyBcIidcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiArPSBcIi5cIjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgSnNvbk1pc3NpbmdUeXBlRXJyb3IgZXh0ZW5kcyBKc29uTWlzc2luZ1R5cGVFcnJvckJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHByb3BlcnR5TmFtZTogc3RyaW5nLCBwdWJsaWMgYmFzZUNsYXNzTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoYmFzZUNsYXNzTmFtZSwgXCJtaXNzaW5ndHlwZXByb3BlcnR5XCIsIFwiVGhlIHByb3BlcnR5IHR5cGUgaXMgbWlzc2luZyBpbiB0aGUgb2JqZWN0LiBQbGVhc2UgdGFrZSBhIGxvb2sgYXQgcHJvcGVydHk6ICdcIiArIHByb3BlcnR5TmFtZSArIFwiJy5cIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIEpzb25JbmNvcnJlY3RUeXBlRXJyb3IgZXh0ZW5kcyBKc29uTWlzc2luZ1R5cGVFcnJvckJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHByb3BlcnR5TmFtZTogc3RyaW5nLCBwdWJsaWMgYmFzZUNsYXNzTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoYmFzZUNsYXNzTmFtZSwgXCJpbmNvcnJlY3R0eXBlcHJvcGVydHlcIiwgXCJUaGUgcHJvcGVydHkgdHlwZSBpcyBpbmNvcnJlY3QgaW4gdGhlIG9iamVjdC4gUGxlYXNlIHRha2UgYSBsb29rIGF0IHByb3BlcnR5OiAnXCIgKyBwcm9wZXJ0eU5hbWUgKyBcIicuXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBKc29uUmVxdWlyZWRQcm9wZXJ0eUVycm9yIGV4dGVuZHMgSnNvbkVycm9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHVibGljIGNsYXNzTmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoXCJyZXF1aXJlZHByb3BlcnR5XCIsIFwiVGhlIHByb3BlcnR5ICdcIiArIHByb3BlcnR5TmFtZSArIFwiJyBpcyByZXF1aXJlZCBpbiBjbGFzcyAnXCIgKyBjbGFzc05hbWUgKyBcIicuXCIpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgSnNvbk9iamVjdCB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyB0eXBlUHJvcGVydHlOYW1lID0gXCJ0eXBlXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwb3NpdGlvblByb3BlcnR5TmFtZSA9IFwicG9zXCI7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBtZXRhRGF0YVZhbHVlID0gbmV3IEpzb25NZXRhZGF0YSgpO1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgbWV0YURhdGEoKSB7IHJldHVybiBKc29uT2JqZWN0Lm1ldGFEYXRhVmFsdWU7IH1cclxuICAgIHB1YmxpYyBlcnJvcnMgPSBuZXcgQXJyYXk8SnNvbkVycm9yPigpO1xyXG4gICAgcHVibGljIHRvSnNvbk9iamVjdChvYmo6IGFueSk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudG9Kc29uT2JqZWN0Q29yZShvYmosIG51bGwpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHRvT2JqZWN0KGpzb25PYmo6IGFueSwgb2JqOiBhbnkpIHtcclxuICAgICAgICBpZiAoIWpzb25PYmopIHJldHVybjtcclxuICAgICAgICB2YXIgcHJvcGVydGllcyA9IG51bGw7XHJcbiAgICAgICAgaWYgKG9iai5nZXRUeXBlKSB7XHJcbiAgICAgICAgICAgIHByb3BlcnRpZXMgPSBKc29uT2JqZWN0Lm1ldGFEYXRhLmdldFByb3BlcnRpZXMob2JqLmdldFR5cGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghcHJvcGVydGllcykgcmV0dXJuO1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBqc29uT2JqKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gSnNvbk9iamVjdC50eXBlUHJvcGVydHlOYW1lKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKGtleSA9PSBKc29uT2JqZWN0LnBvc2l0aW9uUHJvcGVydHlOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBvYmpba2V5XSA9IGpzb25PYmpba2V5XTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHZhciBwcm9wZXJ0eSA9IHRoaXMuZmluZFByb3BlcnR5KHByb3BlcnRpZXMsIGtleSk7XHJcbiAgICAgICAgICAgIGlmICghcHJvcGVydHkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuYWRkTmV3RXJyb3IobmV3IEpzb25Vbmtub3duUHJvcGVydHlFcnJvcihrZXkudG9TdHJpbmcoKSwgb2JqLmdldFR5cGUoKSksIGpzb25PYmopO1xyXG4gICAgICAgICAgICAgICAgY29udGludWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgdGhpcy52YWx1ZVRvT2JqKGpzb25PYmpba2V5XSwgb2JqLCBrZXksIHByb3BlcnR5KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdG9Kc29uT2JqZWN0Q29yZShvYmo6IGFueSwgcHJvcGVydHk6IEpzb25PYmplY3RQcm9wZXJ0eSk6IGFueSB7XHJcbiAgICAgICAgaWYgKCFvYmouZ2V0VHlwZSkgcmV0dXJuIG9iajtcclxuICAgICAgICB2YXIgcmVzdWx0ID0ge307XHJcbiAgICAgICAgaWYgKHByb3BlcnR5ICE9IG51bGwgJiYgKCFwcm9wZXJ0eS5jbGFzc05hbWUpKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtKc29uT2JqZWN0LnR5cGVQcm9wZXJ0eU5hbWVdID0gcHJvcGVydHkuZ2V0T2JqVHlwZShvYmouZ2V0VHlwZSgpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBKc29uT2JqZWN0Lm1ldGFEYXRhLmdldFByb3BlcnRpZXMob2JqLmdldFR5cGUoKSk7XHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVRvSnNvbihvYmosIHJlc3VsdCwgcHJvcGVydGllc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdmFsdWVUb0pzb24ob2JqOiBhbnksIHJlc3VsdDogYW55LCBwcm9wZXJ0eTogSnNvbk9iamVjdFByb3BlcnR5KSB7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gbnVsbDtcclxuICAgICAgICBpZiAocHJvcGVydHkuaGFzVG9Vc2VHZXRWYWx1ZSkge1xyXG4gICAgICAgICAgICB2YWx1ZSA9IHByb3BlcnR5LmdldFZhbHVlKG9iaik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBvYmpbcHJvcGVydHkubmFtZV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwcm9wZXJ0eS5pc0RlZmF1bHRWYWx1ZSh2YWx1ZSkpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbHVlQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnJWYWx1ZSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJWYWx1ZS5wdXNoKHRoaXMudG9Kc29uT2JqZWN0Q29yZSh2YWx1ZVtpXSwgcHJvcGVydHkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWx1ZSA9IGFyclZhbHVlLmxlbmd0aCA+IDAgPyBhcnJWYWx1ZSA6IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnRvSnNvbk9iamVjdENvcmUodmFsdWUsIHByb3BlcnR5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFwcm9wZXJ0eS5pc0RlZmF1bHRWYWx1ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0W3Byb3BlcnR5Lm5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHZhbHVlVG9PYmoodmFsdWU6IGFueSwgb2JqOiBhbnksIGtleTogYW55LCBwcm9wZXJ0eTogSnNvbk9iamVjdFByb3BlcnR5KSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybjtcclxuICAgICAgICBpZiAocHJvcGVydHkgIT0gbnVsbCAmJiBwcm9wZXJ0eS5oYXNUb1VzZVNldFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHByb3BlcnR5LnNldFZhbHVlKG9iaiwgdmFsdWUsIHRoaXMpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsdWVBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVRvQXJyYXkodmFsdWUsIG9iaiwga2V5LCBwcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld09iaiA9IHRoaXMuY3JlYXRlTmV3T2JqKHZhbHVlLCBwcm9wZXJ0eSk7XHJcbiAgICAgICAgaWYgKG5ld09iai5uZXdPYmopIHtcclxuICAgICAgICAgICAgdGhpcy50b09iamVjdCh2YWx1ZSwgbmV3T2JqLm5ld09iaik7XHJcbiAgICAgICAgICAgIHZhbHVlID0gbmV3T2JqLm5ld09iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFuZXdPYmouZXJyb3IpIHtcclxuICAgICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzVmFsdWVBcnJheSh2YWx1ZTogYW55KTogYm9vbGVhbiB7IHJldHVybiB2YWx1ZS5jb25zdHJ1Y3Rvci50b1N0cmluZygpLmluZGV4T2YoXCJBcnJheVwiKSA+IC0xOyB9XHJcbiAgICBwcml2YXRlIGNyZWF0ZU5ld09iaih2YWx1ZTogYW55LCBwcm9wZXJ0eTogSnNvbk9iamVjdFByb3BlcnR5KTogYW55IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0geyBuZXdPYmo6IG51bGwsIGVycm9yOiBudWxsIH07XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IHZhbHVlW0pzb25PYmplY3QudHlwZVByb3BlcnR5TmFtZV07XHJcbiAgICAgICAgaWYgKCFjbGFzc05hbWUgJiYgcHJvcGVydHkgIT0gbnVsbCAmJiBwcm9wZXJ0eS5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lID0gcHJvcGVydHkuY2xhc3NOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjbGFzc05hbWUgPSBwcm9wZXJ0eS5nZXRDbGFzc05hbWUoY2xhc3NOYW1lKTtcclxuICAgICAgICByZXN1bHQubmV3T2JqID0gKGNsYXNzTmFtZSkgPyBKc29uT2JqZWN0Lm1ldGFEYXRhLmNyZWF0ZUNsYXNzKGNsYXNzTmFtZSkgOiBudWxsO1xyXG4gICAgICAgIHJlc3VsdC5lcnJvciA9IHRoaXMuY2hlY2tOZXdPYmplY3RPbkVycm9ycyhyZXN1bHQubmV3T2JqLCB2YWx1ZSwgcHJvcGVydHksIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY2hlY2tOZXdPYmplY3RPbkVycm9ycyhuZXdPYmo6IGFueSwgdmFsdWU6IGFueSwgcHJvcGVydHk6IEpzb25PYmplY3RQcm9wZXJ0eSwgY2xhc3NOYW1lOiBzdHJpbmcpOiBKc29uRXJyb3Ige1xyXG4gICAgICAgIHZhciBlcnJvciA9IG51bGw7XHJcbiAgICAgICAgaWYgKG5ld09iaikge1xyXG4gICAgICAgICAgICB2YXIgcmVxdWlyZWRQcm9wZXJ0aWVzID0gSnNvbk9iamVjdC5tZXRhRGF0YS5nZXRSZXF1aXJlZFByb3BlcnRpZXMoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgaWYgKHJlcXVpcmVkUHJvcGVydGllcykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbHVlW3JlcXVpcmVkUHJvcGVydGllc1tpXV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgSnNvblJlcXVpcmVkUHJvcGVydHlFcnJvcihyZXF1aXJlZFByb3BlcnRpZXNbaV0sIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eS5iYXNlQ2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEpzb25NaXNzaW5nVHlwZUVycm9yKHByb3BlcnR5Lm5hbWUsIHByb3BlcnR5LmJhc2VDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IG5ldyBKc29uSW5jb3JyZWN0VHlwZUVycm9yKHByb3BlcnR5Lm5hbWUsIHByb3BlcnR5LmJhc2VDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLmFkZE5ld0Vycm9yKGVycm9yLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgYWRkTmV3RXJyb3IoZXJyb3I6IEpzb25FcnJvciwganNvbk9iajogYW55KSB7XHJcbiAgICAgICAgaWYgKGpzb25PYmogJiYganNvbk9ialtKc29uT2JqZWN0LnBvc2l0aW9uUHJvcGVydHlOYW1lXSkge1xyXG4gICAgICAgICAgICBlcnJvci5hdCA9IGpzb25PYmpbSnNvbk9iamVjdC5wb3NpdGlvblByb3BlcnR5TmFtZV0uc3RhcnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXJyb3JzLnB1c2goZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB2YWx1ZVRvQXJyYXkodmFsdWU6IEFycmF5PGFueT4sIG9iajogYW55LCBrZXk6IGFueSwgcHJvcGVydHk6IEpzb25PYmplY3RQcm9wZXJ0eSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbHVlQXJyYXkob2JqW2tleV0pKSB7XHJcbiAgICAgICAgICAgIG9ialtrZXldID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gdGhpcy5jcmVhdGVOZXdPYmoodmFsdWVbaV0sIHByb3BlcnR5KTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlLm5ld09iaikge1xyXG4gICAgICAgICAgICAgICAgb2JqW2tleV0ucHVzaChuZXdWYWx1ZS5uZXdPYmopO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b09iamVjdCh2YWx1ZVtpXSwgbmV3VmFsdWUubmV3T2JqKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghbmV3VmFsdWUuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpba2V5XS5wdXNoKHZhbHVlW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgZmluZFByb3BlcnR5KHByb3BlcnRpZXM6IEFycmF5PEpzb25PYmplY3RQcm9wZXJ0eT4sIGtleTogYW55KTogSnNvbk9iamVjdFByb3BlcnR5IHtcclxuICAgICAgICBpZiAoIXByb3BlcnRpZXMpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocHJvcGVydGllc1tpXS5uYW1lID09IGtleSkgcmV0dXJuIHByb3BlcnRpZXNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanNvbm9iamVjdC50c1xuICoqLyIsImltcG9ydCB7QmFzZSwgSXRlbVZhbHVlLCBTdXJ2ZXlFcnJvcn0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuL3N1cnZleVN0cmluZ3NcIjtcclxuaW1wb3J0IHtDdXN0b21FcnJvcn0gZnJvbSBcIi4vZXJyb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDaG9pY2VzUmVzdGZ1bGwgZXh0ZW5kcyBCYXNlIHtcclxuICAgIHB1YmxpYyB1cmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgcGF0aDogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyB2YWx1ZU5hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgdGl0bGVOYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIGdldFJlc3VsdENhbGxiYWNrOiAoaXRlbXM6IEFycmF5PEl0ZW1WYWx1ZT4pID0+IHZvaWQ7XHJcbiAgICBwdWJsaWMgZXJyb3I6IFN1cnZleUVycm9yID0gbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcnVuKCkge1xyXG4gICAgICAgIGlmICghdGhpcy51cmwgfHwgIXRoaXMuZ2V0UmVzdWx0Q2FsbGJhY2spIHJldHVybjtcclxuICAgICAgICB0aGlzLmVycm9yID0gbnVsbDtcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHRoaXMudXJsKTtcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYub25Mb2FkKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm9uRXJyb3IoeGhyLnN0YXR1c1RleHQsIHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIFwiY2hvaWNlc0J5VXJsXCI7IH1cclxuICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMudXJsICYmICF0aGlzLnBhdGggJiYgIXRoaXMudmFsdWVOYW1lICYmICF0aGlzLnRpdGxlTmFtZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXREYXRhKGpzb246IGFueSkge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICBpZiAoanNvbi51cmwpIHRoaXMudXJsID0ganNvbi51cmw7XHJcbiAgICAgICAgaWYgKGpzb24ucGF0aCkgdGhpcy5wYXRoID0ganNvbi5wYXRoO1xyXG4gICAgICAgIGlmIChqc29uLnZhbHVlTmFtZSkgdGhpcy52YWx1ZU5hbWUgPSBqc29uLnZhbHVlTmFtZTtcclxuICAgICAgICBpZiAoanNvbi50aXRsZU5hbWUpIHRoaXMudGl0bGVOYW1lID0ganNvbi50aXRsZU5hbWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMucGF0aCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy52YWx1ZU5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMudGl0bGVOYW1lID0gXCJcIjtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkxvYWQocmVzdWx0OiBhbnkpIHtcclxuICAgICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgICByZXN1bHQgPSB0aGlzLmdldFJlc3VsdEFmdGVyUGF0aChyZXN1bHQpO1xyXG4gICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0W1wibGVuZ3RoXCJdKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbVZhbHVlID0gcmVzdWx0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtVmFsdWUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5nZXRWYWx1ZShpdGVtVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gdGhpcy5nZXRUaXRsZShpdGVtVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaChuZXcgSXRlbVZhbHVlKHZhbHVlLCB0aXRsZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9IG5ldyBDdXN0b21FcnJvcihzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwidXJsR2V0Q2hvaWNlc0Vycm9yXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRSZXN1bHRDYWxsYmFjayhpdGVtcyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uRXJyb3Ioc3RhdHVzOiBzdHJpbmcsIHJlc3BvbnNlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmVycm9yID0gbmV3IEN1c3RvbUVycm9yKHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJ1cmxSZXF1ZXN0RXJyb3JcIilbXCJmb3JtYXRcIl0oc3RhdHVzLCByZXNwb25zZSkpO1xyXG4gICAgICAgIHRoaXMuZ2V0UmVzdWx0Q2FsbGJhY2soW10pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRSZXN1bHRBZnRlclBhdGgocmVzdWx0OiBhbnkpIHtcclxuICAgICAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICBpZiAoIXRoaXMucGF0aCkgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB2YXIgcGF0aGVzID0gdGhpcy5nZXRQYXRoZXMoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGhlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHRbcGF0aGVzW2ldXTtcclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRQYXRoZXMoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgdmFyIHBhdGhlcyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLnBhdGguaW5kZXhPZignOycpID4gLTEpIHtcclxuICAgICAgICAgICAgcGF0aGVzID0gdGhpcy5wYXRoLnNwbGl0KCc7Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGF0aGVzID0gdGhpcy5wYXRoLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXRoZXMubGVuZ3RoID09IDApIHBhdGhlcy5wdXNoKHRoaXMucGF0aCk7XHJcbiAgICAgICAgcmV0dXJuIHBhdGhlcztcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0VmFsdWUoaXRlbTogYW55KTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZU5hbWUpIHJldHVybiBpdGVtW3RoaXMudmFsdWVOYW1lXTtcclxuICAgICAgICB2YXIgbGVuID0gT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW4gPCAxKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gaXRlbVtPYmplY3Qua2V5cyhpdGVtKVswXV07XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldFRpdGxlKGl0ZW06IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRpdGxlTmFtZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1bdGhpcy50aXRsZU5hbWVdO1xyXG4gICAgfVxyXG59XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJjaG9pY2VzQnlVcmxcIiwgW1widXJsXCIsIFwicGF0aFwiLCBcInZhbHVlTmFtZVwiLCBcInRpdGxlTmFtZVwiXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENob2ljZXNSZXN0ZnVsbCgpOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jaG9pY2VzUmVzdGZ1bGwudHNcbiAqKi8iLCJpbXBvcnQge0hhc2hUYWJsZX0gZnJvbSAnLi9iYXNlJztcclxuaW1wb3J0IHtDb25kaXRpb25zUGFyc2VyfSBmcm9tICcuL2NvbmRpdGlvbnNQYXJzZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbiB7XHJcbiAgICBzdGF0aWMgb3BlcmF0b3JzVmFsdWU6IEhhc2hUYWJsZTxGdW5jdGlvbj4gPSBudWxsO1xyXG4gICAgc3RhdGljIGdldCBvcGVyYXRvcnMoKSB7XHJcbiAgICAgICAgaWYgKENvbmRpdGlvbi5vcGVyYXRvcnNWYWx1ZSAhPSBudWxsKSByZXR1cm4gQ29uZGl0aW9uLm9wZXJhdG9yc1ZhbHVlO1xyXG4gICAgICAgIENvbmRpdGlvbi5vcGVyYXRvcnNWYWx1ZSA9IHtcclxuICAgICAgICAgICAgZW1wdHk6IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gIWxlZnQ7IH0sXHJcbiAgICAgICAgICAgIG5vdGVtcHR5OiBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHsgcmV0dXJuICEoIWxlZnQpOyB9LFxyXG4gICAgICAgICAgICBlcXVhbDogZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiBsZWZ0ID09IHJpZ2h0OyB9LFxyXG4gICAgICAgICAgICBub3RlcXVhbDogZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiBsZWZ0ICE9IHJpZ2h0OyB9LFxyXG4gICAgICAgICAgICBjb250YWluczogZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiBsZWZ0ICYmIGxlZnRbXCJpbmRleE9mXCJdICYmIGxlZnQuaW5kZXhPZihyaWdodCkgPiAtMTsgfSxcclxuICAgICAgICAgICAgbm90Y29udGFpbnM6IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gIWxlZnQgfHwgIWxlZnRbXCJpbmRleE9mXCJdIHx8IGxlZnQuaW5kZXhPZihyaWdodCkgPT0gLTE7IH0sXHJcbiAgICAgICAgICAgIGdyZWF0ZXI6IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gbGVmdCA+IHJpZ2h0OyB9LFxyXG4gICAgICAgICAgICBsZXNzOiBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHsgcmV0dXJuIGxlZnQgPCByaWdodDsgfSxcclxuICAgICAgICAgICAgZ3JlYXRlcm9yZXF1YWw6IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gbGVmdCA+PSByaWdodDsgfSxcclxuICAgICAgICAgICAgbGVzc29yZXF1YWw6IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gbGVmdCA8PSByaWdodDsgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIENvbmRpdGlvbi5vcGVyYXRvcnNWYWx1ZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb3BWYWx1ZTogc3RyaW5nID0gXCJlcXVhbFwiO1xyXG4gICAgcHVibGljIGxlZnQ6IGFueTtcclxuICAgIHB1YmxpYyByaWdodDogYW55O1xyXG4gICAgcHVibGljIGdldCBvcGVyYXRvcigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IG9wZXJhdG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmICghQ29uZGl0aW9uLm9wZXJhdG9yc1t2YWx1ZV0pIHJldHVybjtcclxuICAgICAgICB0aGlzLm9wVmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBwZXJmb3JtKGxlZnQ6IGFueSA9IG51bGwsIHJpZ2h0OiBhbnkgPSBudWxsKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCFsZWZ0KSBsZWZ0ID0gdGhpcy5sZWZ0O1xyXG4gICAgICAgIGlmICghcmlnaHQpIHJpZ2h0ID0gdGhpcy5yaWdodDtcclxuXHJcbiAgICAgICAgcmV0dXJuIENvbmRpdGlvbi5vcGVyYXRvcnNbdGhpcy5vcGVyYXRvcl0odGhpcy5nZXRQdXJlVmFsdWUobGVmdCksIHRoaXMuZ2V0UHVyZVZhbHVlKHJpZ2h0KSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldFB1cmVWYWx1ZSh2YWw6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKCF2YWwgfHwgKHR5cGVvZiB2YWwgIT0gXCJzdHJpbmdcIikpIHJldHVybiB2YWw7XHJcbiAgICAgICAgdmFyIHN0ciA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHZhbC5sZW5ndGggPiAwICYmICh2YWxbMF0gPT0gXCInXCIgfHwgdmFsWzBdID09ICdcIicpKSAgdmFsID0gdmFsLnN1YnN0cigxKTtcclxuICAgICAgICB2YXIgbGVuID0gdmFsLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuID4gMCAmJiAodmFsW2xlbiAtIDFdID09IFwiJ1wiIHx8IHZhbFtsZW4gLSAxXSA9PSAnXCInKSkgIHZhbCA9IHZhbC5zdWJzdHIoMCwgbGVuIC0gMSk7XHJcbiAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uTm9kZSB7XHJcbiAgICBwcml2YXRlIGNvbm5lY3RpdmVWYWx1ZTogc3RyaW5nID0gXCJhbmRcIjtcclxuICAgIHB1YmxpYyBjaGlsZHJlbjogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbm5lY3RpdmUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuY29ubmVjdGl2ZVZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGNvbm5lY3RpdmUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybjtcclxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IFwiJlwiIHx8IHZhbHVlID09IFwiJiZcIikgdmFsdWUgPSBcImFuZFwiO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PSBcInxcIiB8fCB2YWx1ZSA9PSBcInx8XCIpIHZhbHVlID0gXCJvclwiO1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPSBcImFuZFwiICYmIHZhbHVlICE9IFwib3JcIikgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGl2ZVZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzRW1wdHkoKSB7IHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PSAwOyB9XHJcbiAgICBwdWJsaWMgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGl2ZSA9IFwiYW5kXCI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIENvbmRpdGlvblJ1bm5lciB7XHJcbiAgICBwcml2YXRlIGV4cHJlc3Npb25WYWx1ZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByb290OiBDb25kaXRpb25Ob2RlO1xyXG4gICAgcHJpdmF0ZSB2YWx1ZXM6IEhhc2hUYWJsZTxhbnk+O1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGV4cHJlc3Npb246IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucm9vdCA9IG5ldyBDb25kaXRpb25Ob2RlKCk7XHJcbiAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgZXhwcmVzc2lvbigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5leHByZXNzaW9uVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgZXhwcmVzc2lvbih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXhwcmVzc2lvbiA9PSB2YWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuZXhwcmVzc2lvblZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgbmV3IENvbmRpdGlvbnNQYXJzZXIoKS5wYXJzZSh0aGlzLmV4cHJlc3Npb25WYWx1ZSwgdGhpcy5yb290KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBydW4odmFsdWVzOiBIYXNoVGFibGU8YW55Pik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJ1bk5vZGUodGhpcy5yb290KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcnVuTm9kZShub2RlOiBDb25kaXRpb25Ob2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIG9uRmlyc3RGYWlsID0gbm9kZS5jb25uZWN0aXZlID09IFwiYW5kXCI7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciByZXMgPSB0aGlzLnJ1bk5vZGVDb25kaXRpb24obm9kZS5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgIGlmICghcmVzICYmIG9uRmlyc3RGYWlsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgIW9uRmlyc3RGYWlsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9uRmlyc3RGYWlsO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBydW5Ob2RlQ29uZGl0aW9uKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHZhbHVlW1wiY2hpbGRyZW5cIl0pIHJldHVybiB0aGlzLnJ1bk5vZGUodmFsdWUpO1xyXG4gICAgICAgIGlmICh2YWx1ZVtcImxlZnRcIl0pIHJldHVybiB0aGlzLnJ1bkNvbmRpdGlvbih2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBydW5Db25kaXRpb24oY29uZGl0aW9uOiBDb25kaXRpb24pOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgbGVmdCA9IGNvbmRpdGlvbi5sZWZ0O1xyXG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5nZXRWYWx1ZU5hbWUobGVmdCk7XHJcbiAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCEobmFtZSBpbiB0aGlzLnZhbHVlcykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgbGVmdCA9IHRoaXMudmFsdWVzW25hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmlnaHQgPSBjb25kaXRpb24ucmlnaHQ7XHJcbiAgICAgICAgbmFtZSA9IHRoaXMuZ2V0VmFsdWVOYW1lKHJpZ2h0KTtcclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIShuYW1lIGluIHRoaXMudmFsdWVzKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICByaWdodCA9IHRoaXMudmFsdWVzW25hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29uZGl0aW9uLnBlcmZvcm0obGVmdCwgcmlnaHQpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRWYWx1ZU5hbWUobm9kZVZhbHVlOiBhbnkpIHtcclxuICAgICAgICBpZiAoIW5vZGVWYWx1ZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlVmFsdWUgIT09ICdzdHJpbmcnKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBpZiAobm9kZVZhbHVlLmxlbmd0aCA8IDMgfHwgbm9kZVZhbHVlWzBdICE9ICd7JyB8fCBub2RlVmFsdWVbbm9kZVZhbHVlLmxlbmd0aCAtIDFdICE9ICd9JykgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIG5vZGVWYWx1ZS5zdWJzdHIoMSwgbm9kZVZhbHVlLmxlbmd0aCAtIDIpO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29uZGl0aW9ucy50c1xuICoqLyIsImltcG9ydCB7Q29uZGl0aW9uLCBDb25kaXRpb25Ob2RlfSBmcm9tIFwiLi9jb25kaXRpb25zXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uc1BhcnNlciB7XHJcbiAgICBwcml2YXRlIHRleHQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgcm9vdDogQ29uZGl0aW9uTm9kZTtcclxuICAgIHByaXZhdGUgZXhwcmVzc2lvbk5vZGVzOiBBcnJheTxDb25kaXRpb25Ob2RlPjtcclxuICAgIHByaXZhdGUgbm9kZTogQ29uZGl0aW9uTm9kZTtcclxuICAgIHByaXZhdGUgYXQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGFyc2UodGV4dDogc3RyaW5nLCByb290OiBDb25kaXRpb25Ob2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICB0aGlzLnJvb3QgPSByb290O1xyXG4gICAgICAgIHRoaXMucm9vdC5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuYXQgPSAwO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy50ZXh0Lmxlbmd0aDtcclxuICAgICAgICB2YXIgcmVzID0gdGhpcy5wYXJzZVRleHQoKTtcclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHRvU3RyaW5nKHJvb3Q6IENvbmRpdGlvbk5vZGUpOiBzdHJpbmcge1xyXG4gICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZVRvU3RyaW5nKHJvb3QpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB0b1N0cmluZ0NvcmUodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgaWYgKHZhbHVlW1wiY2hpbGRyZW5cIl0pIHJldHVybiB0aGlzLm5vZGVUb1N0cmluZyh2YWx1ZSk7XHJcbiAgICAgICAgaWYgKHZhbHVlW1wibGVmdFwiXSkgcmV0dXJuIHRoaXMuY29uZGl0aW9uVG9TdHJpbmcodmFsdWUpO1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBub2RlVG9TdHJpbmcobm9kZTogQ29uZGl0aW9uTm9kZSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKG5vZGUuaXNFbXB0eSkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgdmFyIHJlcyA9IFwiXCI7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlVGV4dCA9IHRoaXMudG9TdHJpbmdDb3JlKG5vZGUuY2hpbGRyZW5baV0pO1xyXG4gICAgICAgICAgICBpZiAobm9kZVRleHQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMpIHJlcyArPSAnICcgKyBub2RlLmNvbm5lY3RpdmUgKyAnICc7XHJcbiAgICAgICAgICAgICAgICByZXMgKz0gbm9kZVRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUgIT0gdGhpcy5yb290ICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICByZXMgPSAnKCcgKyByZXMgKyAnKSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNvbmRpdGlvblRvU3RyaW5nKGNvbmRpdGlvbjogQ29uZGl0aW9uKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIWNvbmRpdGlvbi5yaWdodCB8fCAhY29uZGl0aW9uLm9wZXJhdG9yKSByZXR1cm4gXCJcIjtcclxuICAgICAgICB2YXIgbGVmdCA9IGNvbmRpdGlvbi5sZWZ0O1xyXG4gICAgICAgIGlmIChsZWZ0ICYmICF0aGlzLmlzTnVtZXJpYyhsZWZ0KSkgbGVmdCA9IFwiJ1wiICsgbGVmdCArIFwiJ1wiO1xyXG4gICAgICAgIHZhciByZXMgPSBsZWZ0ICsgJyAnICsgdGhpcy5vcGVyYXRpb25Ub1N0cmluZyhjb25kaXRpb24ub3BlcmF0b3IpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzTm9SaWdodE9wZXJhdGlvbihjb25kaXRpb24ub3BlcmF0b3IpKSByZXR1cm4gcmVzO1xyXG4gICAgICAgIHZhciByaWdodCA9IGNvbmRpdGlvbi5yaWdodDtcclxuICAgICAgICBpZiAocmlnaHQgJiYgIXRoaXMuaXNOdW1lcmljKHJpZ2h0KSkgcmlnaHQgPSBcIidcIiArIHJpZ2h0ICsgXCInXCI7XHJcbiAgICAgICAgcmV0dXJuIHJlcyArICcgJyArIHJpZ2h0O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvcGVyYXRpb25Ub1N0cmluZyhvcDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAob3AgPT0gXCJlcXVhbFwiKSByZXR1cm4gXCI9XCI7XHJcbiAgICAgICAgaWYgKG9wID09IFwibm90ZXF1YWxcIikgcmV0dXJuIFwiIT1cIjtcclxuICAgICAgICBpZiAob3AgPT0gXCJncmVhdGVyXCIpIHJldHVybiBcIj5cIjtcclxuICAgICAgICBpZiAob3AgPT0gXCJsZXNzXCIpIHJldHVybiBcIjxcIjtcclxuICAgICAgICBpZiAob3AgPT0gXCJncmVhdGVyb3JlcXVhbFwiKSByZXR1cm4gXCI+PVwiO1xyXG4gICAgICAgIGlmIChvcCA9PSBcImxlc3NvcmVxdWFsXCIpIHJldHVybiBcIjw9XCI7XHJcbiAgICAgICAgcmV0dXJuIG9wO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc051bWVyaWModmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciB2YWwgPSBwYXJzZUZsb2F0KHZhbHVlKTtcclxuICAgICAgICBpZiAoaXNOYU4odmFsKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBpc0Zpbml0ZSh2YWwpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBwYXJzZVRleHQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5yb290O1xyXG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbk5vZGVzID0gW107XHJcbiAgICAgICAgdGhpcy5leHByZXNzaW9uTm9kZXMucHVzaCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIHZhciByZXMgPSB0aGlzLnJlYWRDb25kaXRpb25zKCk7XHJcbiAgICAgICAgcmV0dXJuIHJlcyAmJiB0aGlzLmF0ID49IHRoaXMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSByZWFkQ29uZGl0aW9ucygpOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgcmVzID0gdGhpcy5yZWFkQ29uZGl0aW9uKCk7XHJcbiAgICAgICAgaWYgKCFyZXMpIHJldHVybiByZXM7XHJcbiAgICAgICAgdmFyIGNvbm5lY3RpdmUgPSB0aGlzLnJlYWRDb25uZWN0aXZlKCk7XHJcbiAgICAgICAgaWYgKGNvbm5lY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRDb25uZWN0aXZlKGNvbm5lY3RpdmUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkQ29uZGl0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcmVhZENvbmRpdGlvbigpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMucmVhZEV4cHJlc3Npb24oKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciBsZWZ0ID0gdGhpcy5yZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKCFsZWZ0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIG9wID0gdGhpcy5yZWFkT3BlcmF0b3IoKTtcclxuICAgICAgICBpZiAoIW9wKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIGMgPSBuZXcgQ29uZGl0aW9uKCk7XHJcbiAgICAgICAgYy5sZWZ0ID0gbGVmdDsgYy5vcGVyYXRvciA9IG9wO1xyXG4gICAgICAgIGlmICghdGhpcy5pc05vUmlnaHRPcGVyYXRpb24ob3ApKSB7XHJcbiAgICAgICAgICAgIHZhciByaWdodCA9IHRoaXMucmVhZFN0cmluZygpO1xyXG4gICAgICAgICAgICBpZiAoIXJpZ2h0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGMucmlnaHQgPSByaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRDb25kaXRpb24oYyk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJlYWRFeHByZXNzaW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMuc2tpcCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmF0ID49IHRoaXMubGVuZ3RoIHx8IHRoaXMuY2ggIT0gJygnKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF0Kys7XHJcbiAgICAgICAgdGhpcy5wdXNoRXhwcmVzc2lvbigpO1xyXG4gICAgICAgIHZhciByZXMgPSB0aGlzLnJlYWRDb25kaXRpb25zKCk7XHJcbiAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICB0aGlzLnNraXAoKTtcclxuICAgICAgICAgICAgcmVzID0gdGhpcy5jaCA9PSAnKSc7XHJcbiAgICAgICAgICAgIHRoaXMuYXQrKztcclxuICAgICAgICAgICAgdGhpcy5wb3BFeHByZXNzaW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldCBjaCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy50ZXh0LmNoYXJBdCh0aGlzLmF0KTsgfVxyXG4gICAgcHJpdmF0ZSBza2lwKCkge1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmF0IDwgdGhpcy5sZW5ndGggJiYgdGhpcy5pc1NwYWNlKHRoaXMuY2gpKSB0aGlzLmF0Kys7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzU3BhY2UoYzogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGMgPT0gJyAnIHx8IGMgPT0gJ1xcbicgfHwgYyA9PSAnXFx0JyB8fCBjID09ICdcXHInO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc1F1b3RlcyhjOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gYyA9PSBcIidcIiB8fCBjID09ICdcIidcclxuICAgIH1cclxuICAgIHByaXZhdGUgaXNPcGVyYXRvckNoYXIoYzogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGMgPT0gJz4nIHx8IGMgPT0gJzwnIHx8IGMgPT0gJz0nIHx8IGMgPT0gJyEnO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc0JyYWNrZXRzKGM6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBjID09ICcoJyB8fCBjID09ICcpJztcclxuICAgIH1cclxuICAgIHByaXZhdGUgcmVhZFN0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgIHRoaXMuc2tpcCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmF0ID49IHRoaXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLmF0O1xyXG4gICAgICAgIHZhciBoYXNRdW90ZXMgPSB0aGlzLmlzUXVvdGVzKHRoaXMuY2gpO1xyXG4gICAgICAgIGlmIChoYXNRdW90ZXMpIHRoaXMuYXQrKztcclxuICAgICAgICB2YXIgaXNGaXJzdE9wQ2ggPSB0aGlzLmlzT3BlcmF0b3JDaGFyKHRoaXMuY2gpO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmF0IDwgdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKCFoYXNRdW90ZXMgJiYgdGhpcy5pc1NwYWNlKHRoaXMuY2gpKSBicmVhaztcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNRdW90ZXModGhpcy5jaCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChoYXNRdW90ZXMpIHRoaXMuYXQrKztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaGFzUXVvdGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNGaXJzdE9wQ2ggIT0gdGhpcy5pc09wZXJhdG9yQ2hhcih0aGlzLmNoKSkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0JyYWNrZXRzKHRoaXMuY2gpKSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmF0Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmF0IDw9IHN0YXJ0KSByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgcmVzID0gdGhpcy50ZXh0LnN1YnN0cihzdGFydCwgdGhpcy5hdCAtIHN0YXJ0KTtcclxuICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMubGVuZ3RoID4gMSAmJiB0aGlzLmlzUXVvdGVzKHJlc1swXSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsZW4gPSByZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzUXVvdGVzKHJlc1tyZXMubGVuZ3RoIC0gMV0pKSBsZW4tLTtcclxuICAgICAgICAgICAgICAgIHJlcyA9IHJlcy5zdWJzdHIoMSwgbGVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc05vUmlnaHRPcGVyYXRpb24ob3A6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBvcCA9PSBcImVtcHR5XCIgfHwgb3AgPT0gXCJub3RlbXB0eVwiO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSByZWFkT3BlcmF0b3IoKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgb3AgPSB0aGlzLnJlYWRTdHJpbmcoKTtcclxuICAgICAgICBpZiAoIW9wKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBvcCA9IG9wLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKG9wID09ICc+Jykgb3AgPSBcImdyZWF0ZXJcIjtcclxuICAgICAgICBpZiAob3AgPT0gJzwnKSBvcCA9IFwibGVzc1wiO1xyXG4gICAgICAgIGlmIChvcCA9PSAnPj0nIHx8IG9wID09ICc9PicpIG9wID0gXCJncmVhdGVyb3JlcXVhbFwiO1xyXG4gICAgICAgIGlmIChvcCA9PSAnPD0nIHx8IG9wID09ICc9PCcpIG9wID0gXCJsZXNzb3JlcXVhbFwiO1xyXG4gICAgICAgIGlmIChvcCA9PSAnPScgfHwgb3AgPT0gJz09Jykgb3AgPSBcImVxdWFsXCI7XHJcbiAgICAgICAgaWYgKG9wID09ICc8PicgfHwgb3AgPT0gJyE9Jykgb3AgPSBcIm5vdGVxdWFsXCI7XHJcbiAgICAgICAgaWYgKG9wID09ICdjb250YWluJykgb3AgPSBcImNvbnRhaW5zXCI7XHJcbiAgICAgICAgaWYgKG9wID09ICdub3Rjb250YWluJykgb3AgPSBcIm5vdGNvbnRhaW5zXCI7XHJcbiAgICAgICAgcmV0dXJuIG9wO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSByZWFkQ29ubmVjdGl2ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBjb24gPSB0aGlzLnJlYWRTdHJpbmcoKTtcclxuICAgICAgICBpZiAoIWNvbikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgY29uID0gY29uLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKGNvbiA9PSBcIiZcIiB8fCBjb24gPT0gXCImJlwiKSBjb24gPSBcImFuZFwiO1xyXG4gICAgICAgIGlmIChjb24gPT0gXCJ8XCIgfHwgY29uID09IFwifHxcIikgY29uID0gXCJvclwiO1xyXG4gICAgICAgIGlmIChjb24gIT0gXCJhbmRcIiAmJiBjb24gIT0gXCJvclwiKSBjb24gPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBjb247XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHB1c2hFeHByZXNzaW9uKCkge1xyXG4gICAgICAgIHZhciBub2RlID0gbmV3IENvbmRpdGlvbk5vZGUoKTtcclxuICAgICAgICB0aGlzLmV4cHJlc3Npb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHBvcEV4cHJlc3Npb24oKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmV4cHJlc3Npb25Ob2Rlcy5wb3AoKTtcclxuICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLmV4cHJlc3Npb25Ob2Rlc1t0aGlzLmV4cHJlc3Npb25Ob2Rlcy5sZW5ndGggLSAxXTtcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW4ucHVzaChub2RlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgYWRkQ29uZGl0aW9uKGM6IENvbmRpdGlvbikge1xyXG4gICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbi5wdXNoKGMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBhZGRDb25uZWN0aXZlKGNvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZHJlbi5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5jb25uZWN0aXZlID0gY29uO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuY29ubmVjdGl2ZSAhPSBjb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBvbGRDb24gPSB0aGlzLm5vZGUuY29ubmVjdGl2ZTtcclxuICAgICAgICAgICAgICAgIHZhciBvbGRDaGlsZHJlbiA9IHRoaXMubm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNvbm5lY3RpdmUgPSBjb247XHJcbiAgICAgICAgICAgICAgICB2YXIgb2xkTm9kZSA9IG5ldyBDb25kaXRpb25Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICBvbGROb2RlLmNvbm5lY3RpdmUgPSBvbGRDb247XHJcbiAgICAgICAgICAgICAgICBvbGROb2RlLmNoaWxkcmVuID0gb2xkQ2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW4ucHVzaChvbGROb2RlKTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gbmV3IENvbmRpdGlvbk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbi5wdXNoKG5ld05vZGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlID0gbmV3Tm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvbmRpdGlvbnNQYXJzZXIudHNcbiAqKi8iLCJpbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4vcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtCYXNlLCBJdGVtVmFsdWUsIElTdXJ2ZXlEYXRhLCBIYXNoVGFibGV9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuL3N1cnZleVN0cmluZ3NcIjtcclxuaW1wb3J0IHtRdWVzdGlvblNlbGVjdEJhc2V9IGZyb20gXCIuL3F1ZXN0aW9uX2Jhc2VzZWxlY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkRyb3Bkb3duTW9kZWx9IGZyb20gXCIuL3F1ZXN0aW9uX2Ryb3Bkb3duXCI7XHJcbmltcG9ydCB7UXVlc3Rpb25DaGVja2JveE1vZGVsfSBmcm9tIFwiLi9xdWVzdGlvbl9jaGVja2JveFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uUmFkaW9ncm91cE1vZGVsfSBmcm9tIFwiLi9xdWVzdGlvbl9yYWRpb2dyb3VwXCI7XHJcbmltcG9ydCB7UXVlc3Rpb25UZXh0TW9kZWx9IGZyb20gXCIuL3F1ZXN0aW9uX3RleHRcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkNvbW1lbnRNb2RlbH0gZnJvbSBcIi4vcXVlc3Rpb25fY29tbWVudFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNYXRyaXhEcm9wZG93bkRhdGEge1xyXG4gICAgb25Sb3dDaGFuZ2VkKGNlbGw6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlLCBuZXdSb3dWYWx1ZTogYW55KTtcclxuICAgIGNvbHVtbnM6IEFycmF5PE1hdHJpeERyb3Bkb3duQ29sdW1uPjtcclxuICAgIGNyZWF0ZVF1ZXN0aW9uKHJvdzogTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UsIGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBRdWVzdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hdHJpeERyb3Bkb3duQ29sdW1uIGV4dGVuZHMgQmFzZSB7XHJcbiAgICBwcml2YXRlIGNob2ljZXNWYWx1ZTogSXRlbVZhbHVlW10gPSBbXTtcclxuICAgIHByaXZhdGUgdGl0bGVWYWx1ZTogc3RyaW5nO1xyXG4gICAgcHVibGljIG9wdGlvbnNDYXB0aW9uOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgaXNSZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGhhc090aGVyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgbWluV2lkdGg6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgY2VsbFR5cGU6IHN0cmluZyA9IFwiZGVmYXVsdFwiO1xyXG4gICAgcHJpdmF0ZSBjb2xDb3VudFZhbHVlOiBudW1iZXIgPSAtMTtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcgPSBudWxsKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCkgeyByZXR1cm4gXCJtYXRyaXhkcm9wZG93bmNvbHVtblwiIH1cclxuICAgIHB1YmxpYyBnZXQgdGl0bGUoKSB7IHJldHVybiB0aGlzLnRpdGxlVmFsdWUgPyB0aGlzLnRpdGxlVmFsdWUgOiB0aGlzLm5hbWU7IH1cclxuICAgIHB1YmxpYyBzZXQgdGl0bGUodmFsdWU6IHN0cmluZykgeyB0aGlzLnRpdGxlVmFsdWUgPSB2YWx1ZTsgfVxyXG4gICAgcHVibGljIGdldCBjaG9pY2VzKCk6IEFycmF5PGFueT4geyByZXR1cm4gdGhpcy5jaG9pY2VzVmFsdWU7IH1cclxuICAgIHB1YmxpYyBnZXQgY29sQ291bnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY29sQ291bnRWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBjb2xDb3VudCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgLTEgfHwgdmFsdWUgPiA0KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jb2xDb3VudFZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGNob2ljZXMobmV3VmFsdWU6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBJdGVtVmFsdWUuc2V0RGF0YSh0aGlzLmNob2ljZXNWYWx1ZSwgbmV3VmFsdWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWF0cml4RHJvcGRvd25DZWxsIHtcclxuICAgIHByaXZhdGUgcXVlc3Rpb25WYWx1ZTogUXVlc3Rpb247XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY29sdW1uOiBNYXRyaXhEcm9wZG93bkNvbHVtbiwgcHVibGljIHJvdzogTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UsIGRhdGE6IElNYXRyaXhEcm9wZG93bkRhdGEpIHtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uVmFsdWUgPSBkYXRhLmNyZWF0ZVF1ZXN0aW9uKHRoaXMucm93LCB0aGlzLmNvbHVtbik7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvblZhbHVlLnNldERhdGEocm93KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcXVlc3Rpb24oKTogUXVlc3Rpb24geyByZXR1cm4gdGhpcy5xdWVzdGlvblZhbHVlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLnF1ZXN0aW9uLnZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZSBpbXBsZW1lbnRzIElTdXJ2ZXlEYXRhIHtcclxuICAgIHByb3RlY3RlZCBkYXRhOiBJTWF0cml4RHJvcGRvd25EYXRhO1xyXG4gICAgcHJpdmF0ZSByb3dWYWx1ZXM6IEhhc2hUYWJsZTxhbnk+ID0ge307XHJcbiAgICBwcml2YXRlIHJvd0NvbW1lbnRzOiBIYXNoVGFibGU8YW55PiA9IHt9O1xyXG4gICAgcHJpdmF0ZSBpc1NldHRpbmdWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBjZWxsczogQXJyYXk8TWF0cml4RHJvcGRvd25DZWxsPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IElNYXRyaXhEcm9wZG93bkRhdGEsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmJ1aWxkQ2VsbHMoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcm93TmFtZSgpIHsgcmV0dXJuIG51bGw7IH1cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLnJvd1ZhbHVlczsgfVxyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5pc1NldHRpbmdWYWx1ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yb3dWYWx1ZXMgPSB7fTtcclxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm93VmFsdWVzW2tleV0gPSB2YWx1ZVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnF1ZXN0aW9uLm9uU3VydmV5VmFsdWVDaGFuZ2VkKHRoaXMuZ2V0VmFsdWUodGhpcy5jZWxsc1tpXS5jb2x1bW4ubmFtZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzU2V0dGluZ1ZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VmFsdWUobmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3dWYWx1ZXNbbmFtZV07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0VmFsdWUobmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTZXR0aW5nVmFsdWUpIHJldHVybjtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPT09IFwiXCIpIG5ld1ZhbHVlID0gbnVsbDtcclxuICAgICAgICBpZiAobmV3VmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnJvd1ZhbHVlc1tuYW1lXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnJvd1ZhbHVlc1tuYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhLm9uUm93Q2hhbmdlZCh0aGlzLCB0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRDb21tZW50KG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm93Q29tbWVudHNbbmFtZV07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Q29tbWVudChuYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJvd0NvbW1lbnRzW25hbWVdID0gbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzRW1wdHkoKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgaWYgKCF2YWwpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB2YWwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgYnVpbGRDZWxscygpIHtcclxuICAgICAgICB2YXIgY29sdW1ucyA9IHRoaXMuZGF0YS5jb2x1bW5zO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29sdW1ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY29sdW1uID0gY29sdW1uc1tpXTtcclxuICAgICAgICAgICAgdGhpcy5jZWxscy5wdXNoKHRoaXMuY3JlYXRlQ2VsbChjb2x1bW4pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlQ2VsbChjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogTWF0cml4RHJvcGRvd25DZWxsIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeERyb3Bkb3duQ2VsbChjb2x1bW4sIHRoaXMsIHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWxCYXNlIGV4dGVuZHMgUXVlc3Rpb24gaW1wbGVtZW50cyBJTWF0cml4RHJvcGRvd25EYXRhIHtcclxuICAgIHByaXZhdGUgY29sdW1uc1ZhbHVlOiBBcnJheTxNYXRyaXhEcm9wZG93bkNvbHVtbj4gPSBbXTtcclxuICAgIHByaXZhdGUgY2hvaWNlc1ZhbHVlOiBJdGVtVmFsdWVbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBvcHRpb25zQ2FwdGlvblZhbHVlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGlzUm93Q2hhbmdpbmcgPSBmYWxzZTtcclxuICAgIHByb3RlY3RlZCBnZW5lcmF0ZWRWaXNpYmxlUm93czogQXJyYXk8TWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2U+O1xyXG4gICAgcHJpdmF0ZSBjZWxsVHlwZVZhbHVlOiBzdHJpbmcgPSBcImRyb3Bkb3duXCI7XHJcbiAgICBwcml2YXRlIGNvbHVtbkNvbENvdW50VmFsdWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgY29sdW1uTWluV2lkdGg6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgaG9yaXpvbnRhbFNjcm9sbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGNvbHVtbnNDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcbiAgICBwdWJsaWMgdXBkYXRlQ2VsbHNDYWxsYmFrOiAoKSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwibWF0cml4ZHJvcGRvd25iYXNlXCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbHVtbnMoKTogQXJyYXk8TWF0cml4RHJvcGRvd25Db2x1bW4+IHsgcmV0dXJuIHRoaXMuY29sdW1uc1ZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGNvbHVtbnModmFsdWU6IEFycmF5PE1hdHJpeERyb3Bkb3duQ29sdW1uPikge1xyXG4gICAgICAgIHRoaXMuY29sdW1uc1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy5jb2x1bW5zQ2hhbmdlZENhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY2VsbFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuY2VsbFR5cGVWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBjZWxsVHlwZShuZXdWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2VsbFR5cGUgPT0gbmV3VmFsdWUpIHJldHVybjtcclxuICAgICAgICB0aGlzLmNlbGxUeXBlVmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLnVwZGF0ZUNlbGxzQ2FsbGJhayk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbHVtbkNvbENvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNvbHVtbkNvbENvdW50VmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgY29sdW1uQ29sQ291bnQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPiA0KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jb2x1bW5Db2xDb3VudFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy51cGRhdGVDZWxsc0NhbGxiYWspO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldENvbHVtblRpdGxlKGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBjb2x1bW4udGl0bGU7XHJcbiAgICAgICAgaWYgKGNvbHVtbi5pc1JlcXVpcmVkICYmIHRoaXMuc3VydmV5KSB7XHJcbiAgICAgICAgICAgIHZhciByZXF1aXJlVGV4dCA9IHRoaXMuc3VydmV5LnJlcXVpcmVkVGV4dDtcclxuICAgICAgICAgICAgaWYgKHJlcXVpcmVUZXh0KSByZXF1aXJlVGV4dCArPSBcIiBcIjtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVxdWlyZVRleHQgKyByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Q29sdW1uV2lkdGgoY29sdW1uOiBNYXRyaXhEcm9wZG93bkNvbHVtbik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGNvbHVtbi5taW5XaWR0aCA/IGNvbHVtbi5taW5XaWR0aCA6IHRoaXMuY29sdW1uTWluV2lkdGg7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNob2ljZXMoKTogQXJyYXk8YW55PiB7IHJldHVybiB0aGlzLmNob2ljZXNWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBjaG9pY2VzKG5ld1ZhbHVlOiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgSXRlbVZhbHVlLnNldERhdGEodGhpcy5jaG9pY2VzVmFsdWUsIG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgb3B0aW9uc0NhcHRpb24oKSB7IHJldHVybiAodGhpcy5vcHRpb25zQ2FwdGlvblZhbHVlKSA/IHRoaXMub3B0aW9uc0NhcHRpb25WYWx1ZSA6IHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJvcHRpb25zQ2FwdGlvblwiKTsgfVxyXG4gICAgcHVibGljIHNldCBvcHRpb25zQ2FwdGlvbihuZXdWYWx1ZTogc3RyaW5nKSB7IHRoaXMub3B0aW9uc0NhcHRpb25WYWx1ZSA9IG5ld1ZhbHVlOyB9XHJcbiAgICBwdWJsaWMgYWRkQ29sdW1uKG5hbWU6IHN0cmluZywgdGl0bGU6IHN0cmluZyA9IG51bGwpOiBNYXRyaXhEcm9wZG93bkNvbHVtbiB7XHJcbiAgICAgICAgdmFyIGNvbHVtbiA9IG5ldyBNYXRyaXhEcm9wZG93bkNvbHVtbihuYW1lLCB0aXRsZSk7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5zVmFsdWUucHVzaChjb2x1bW4pO1xyXG4gICAgICAgIHJldHVybiBjb2x1bW47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB2aXNpYmxlUm93cygpOiBBcnJheTxNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZT4ge1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MgPSB0aGlzLmdlbmVyYXRlUm93cygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdlbmVyYXRlUm93cygpOiBBcnJheTxNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZT4geyByZXR1cm4gbnVsbDsgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZU1hdHJpeFJvdyhuYW1lOiBhbnksIHRleHQ6IHN0cmluZywgdmFsdWU6IGFueSk6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVOZXdWYWx1ZShjdXJWYWx1ZTogYW55KTogYW55IHsgcmV0dXJuICFjdXJWYWx1ZSA/IHt9IDogY3VyVmFsdWU7IH1cclxuICAgIHByb3RlY3RlZCBnZXRSb3dWYWx1ZShyb3c6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlLCBxdWVzdGlvblZhbHVlOiBhbnksIGNyZWF0ZTogYm9vbGVhbiA9IGZhbHNlKTogYW55IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gcXVlc3Rpb25WYWx1ZVtyb3cucm93TmFtZV0gPyBxdWVzdGlvblZhbHVlW3Jvdy5yb3dOYW1lXSA6IG51bGw7XHJcbiAgICAgICAgaWYgKCFyZXN1bHQgJiYgY3JlYXRlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICBxdWVzdGlvblZhbHVlW3Jvdy5yb3dOYW1lXSA9IHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblZhbHVlQ2hhbmdlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1Jvd0NoYW5naW5nIHx8ICEodGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cykgfHwgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cy5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNSb3dDaGFuZ2luZyA9IHRydWU7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMuY3JlYXRlTmV3VmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzW2ldO1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzW2ldLnZhbHVlID0gdGhpcy5nZXRSb3dWYWx1ZShyb3csIHZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNSb3dDaGFuZ2luZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGhhc0Vycm9ycyhmaXJlQ2FsbGJhY2s6IGJvb2xlYW4gPSB0cnVlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIGVycm9zSW5Db2x1bW5zID0gdGhpcy5oYXNFcnJvckluQ29sdW1ucyhmaXJlQ2FsbGJhY2spO1xyXG4gICAgICAgIHJldHVybiBzdXBlci5oYXNFcnJvcnMoZmlyZUNhbGxiYWNrKSB8fCBlcnJvc0luQ29sdW1ucztcclxuICAgIH1cclxuICAgIHByaXZhdGUgaGFzRXJyb3JJbkNvbHVtbnMoZmlyZUNhbGxiYWNrOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIHJlcyA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAodmFyIGNvbEluZGV4ID0gMDsgY29sSW5kZXggPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyBjb2xJbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNlbGxzID0gdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93c1tpXS5jZWxscztcclxuICAgICAgICAgICAgICAgIHJlcyA9IGNlbGxzICYmIGNlbGxzW2NvbEluZGV4XSAmJiBjZWxsc1tjb2xJbmRleF0ucXVlc3Rpb24gJiYgY2VsbHNbY29sSW5kZXhdLnF1ZXN0aW9uLmhhc0Vycm9ycyhmaXJlQ2FsbGJhY2spIHx8IHJlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG4gICAgLy9JTWF0cml4RHJvcGRvd25EYXRhXHJcbiAgICBwdWJsaWMgY3JlYXRlUXVlc3Rpb24ocm93OiBNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZSwgY29sdW1uOiBNYXRyaXhEcm9wZG93bkNvbHVtbik6IFF1ZXN0aW9uIHtcclxuICAgICAgICB2YXIgcXVlc3Rpb24gPSB0aGlzLmNyZWF0ZVF1ZXN0aW9uQ29yZShyb3csIGNvbHVtbik7XHJcbiAgICAgICAgcXVlc3Rpb24ubmFtZSA9IGNvbHVtbi5uYW1lO1xyXG4gICAgICAgIHF1ZXN0aW9uLmlzUmVxdWlyZWQgPSBjb2x1bW4uaXNSZXF1aXJlZDtcclxuICAgICAgICBxdWVzdGlvbi5oYXNPdGhlciA9IGNvbHVtbi5oYXNPdGhlcjtcclxuICAgICAgICBpZiAoY29sdW1uLmhhc090aGVyKSB7XHJcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbiBpbnN0YW5jZW9mIFF1ZXN0aW9uU2VsZWN0QmFzZSkge1xyXG4gICAgICAgICAgICAgICAgKDxRdWVzdGlvblNlbGVjdEJhc2U+cXVlc3Rpb24pLnN0b3JlT3RoZXJzQXNDb21tZW50ID0gZmFsc2U7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVF1ZXN0aW9uQ29yZShyb3c6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlLCBjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogUXVlc3Rpb24ge1xyXG4gICAgICAgIHZhciBjZWxsVHlwZSA9IGNvbHVtbi5jZWxsVHlwZSA9PSBcImRlZmF1bHRcIiA/IHRoaXMuY2VsbFR5cGUgOiBjb2x1bW4uY2VsbFR5cGU7XHJcbiAgICAgICAgdmFyIG5hbWUgPSB0aGlzLmdldFF1ZXN0aW9uTmFtZShyb3csIGNvbHVtbik7XHJcbiAgICAgICAgaWYgKGNlbGxUeXBlID09IFwiY2hlY2tib3hcIikgcmV0dXJuIHRoaXMuY3JlYXRlQ2hlY2tib3gobmFtZSwgY29sdW1uKTtcclxuICAgICAgICBpZiAoY2VsbFR5cGUgPT0gXCJyYWRpb2dyb3VwXCIpIHJldHVybiB0aGlzLmNyZWF0ZVJhZGlvZ3JvdXAobmFtZSwgY29sdW1uKTtcclxuICAgICAgICBpZiAoY2VsbFR5cGUgPT0gXCJ0ZXh0XCIpIHJldHVybiB0aGlzLmNyZWF0ZVRleHQobmFtZSwgY29sdW1uKTtcclxuICAgICAgICBpZiAoY2VsbFR5cGUgPT0gXCJjb21tZW50XCIpIHJldHVybiB0aGlzLmNyZWF0ZUNvbW1lbnQobmFtZSwgY29sdW1uKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVEcm9wZG93bihuYW1lLCBjb2x1bW4pO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldFF1ZXN0aW9uTmFtZShyb3c6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlLCBjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogc3RyaW5nIHsgcmV0dXJuIHJvdy5yb3dOYW1lICsgXCJfXCIgKyBjb2x1bW4ubmFtZTsgfVxyXG4gICAgcHJvdGVjdGVkIGdldENvbHVtbkNob2ljZXMoY29sdW1uOiBNYXRyaXhEcm9wZG93bkNvbHVtbik6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIHJldHVybiBjb2x1bW4uY2hvaWNlcyAmJiBjb2x1bW4uY2hvaWNlcy5sZW5ndGggPiAwID8gY29sdW1uLmNob2ljZXMgOiB0aGlzLmNob2ljZXM7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29sdW1uT3B0aW9uc0NhcHRpb24oY29sdW1uOiBNYXRyaXhEcm9wZG93bkNvbHVtbik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGNvbHVtbi5vcHRpb25zQ2FwdGlvbiA/IGNvbHVtbi5vcHRpb25zQ2FwdGlvbiA6IHRoaXMub3B0aW9uc0NhcHRpb247XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlRHJvcGRvd24obmFtZTogc3RyaW5nLCBjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogUXVlc3Rpb25Ecm9wZG93bk1vZGVsIHtcclxuICAgICAgICB2YXIgcSA9IDxRdWVzdGlvbkRyb3Bkb3duTW9kZWw+dGhpcy5jcmVhdGVDZWxsUXVlc3Rpb24oXCJkcm9wZG93blwiLCBuYW1lKTtcclxuICAgICAgICBxLmNob2ljZXMgPSB0aGlzLmdldENvbHVtbkNob2ljZXMoY29sdW1uKTtcclxuICAgICAgICBxLm9wdGlvbnNDYXB0aW9uID0gdGhpcy5nZXRDb2x1bW5PcHRpb25zQ2FwdGlvbihjb2x1bW4pO1xyXG4gICAgICAgIHJldHVybiBxO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUNoZWNrYm94KG5hbWU6IHN0cmluZywgY29sdW1uOiBNYXRyaXhEcm9wZG93bkNvbHVtbik6IFF1ZXN0aW9uQ2hlY2tib3hNb2RlbCB7XHJcbiAgICAgICAgdmFyIHEgPSA8UXVlc3Rpb25DaGVja2JveE1vZGVsPnRoaXMuY3JlYXRlQ2VsbFF1ZXN0aW9uKFwiY2hlY2tib3hcIiwgbmFtZSk7XHJcbiAgICAgICAgcS5jaG9pY2VzID0gdGhpcy5nZXRDb2x1bW5DaG9pY2VzKGNvbHVtbik7XHJcbiAgICAgICAgcS5jb2xDb3VudCA9IGNvbHVtbi5jb2xDb3VudCA+IC0gMSA/IGNvbHVtbi5jb2xDb3VudCA6IHRoaXMuY29sdW1uQ29sQ291bnQ7XHJcbiAgICAgICAgcmV0dXJuIHE7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlUmFkaW9ncm91cChuYW1lOiBzdHJpbmcsIGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBRdWVzdGlvblJhZGlvZ3JvdXBNb2RlbCB7XHJcbiAgICAgICAgdmFyIHEgPSA8UXVlc3Rpb25SYWRpb2dyb3VwTW9kZWw+dGhpcy5jcmVhdGVDZWxsUXVlc3Rpb24oXCJyYWRpb2dyb3VwXCIsIG5hbWUpO1xyXG4gICAgICAgIHEuY2hvaWNlcyA9IHRoaXMuZ2V0Q29sdW1uQ2hvaWNlcyhjb2x1bW4pO1xyXG4gICAgICAgIHEuY29sQ291bnQgPSBjb2x1bW4uY29sQ291bnQgPiAtIDEgPyBjb2x1bW4uY29sQ291bnQgOiB0aGlzLmNvbHVtbkNvbENvdW50O1xyXG4gICAgICAgIHJldHVybiBxO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRleHQobmFtZTogc3RyaW5nLCBjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogUXVlc3Rpb25UZXh0TW9kZWwge1xyXG4gICAgICAgIHJldHVybiA8UXVlc3Rpb25UZXh0TW9kZWw+dGhpcy5jcmVhdGVDZWxsUXVlc3Rpb24oXCJ0ZXh0XCIsIG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUNvbW1lbnQobmFtZTogc3RyaW5nLCBjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogUXVlc3Rpb25Db21tZW50TW9kZWwge1xyXG4gICAgICAgIHJldHVybiA8UXVlc3Rpb25Db21tZW50TW9kZWw+dGhpcy5jcmVhdGVDZWxsUXVlc3Rpb24oXCJjb21tZW50XCIsIG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZUNlbGxRdWVzdGlvbihxdWVzdGlvblR5cGU6IHN0cmluZywgbmFtZTogc3RyaW5nKTogUXVlc3Rpb24ge1xyXG4gICAgICAgIHJldHVybiA8UXVlc3Rpb24+UXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLmNyZWF0ZVF1ZXN0aW9uKHF1ZXN0aW9uVHlwZSwgbmFtZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZGVsZXRlUm93VmFsdWUobmV3VmFsdWU6IGFueSwgcm93OiBNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZSk6IGFueSB7XHJcbiAgICAgICAgZGVsZXRlIG5ld1ZhbHVlW3Jvdy5yb3dOYW1lXTtcclxuICAgICAgICByZXR1cm4gT2JqZWN0LmtleXMobmV3VmFsdWUpLmxlbmd0aCA9PSAwID8gbnVsbCA6IG5ld1ZhbHVlO1xyXG4gICAgfVxyXG4gICAgb25Sb3dDaGFuZ2VkKHJvdzogTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UsIG5ld1Jvd1ZhbHVlOiBhbnkpIHtcclxuICAgICAgICB2YXIgbmV3VmFsdWUgPSB0aGlzLmNyZWF0ZU5ld1ZhbHVlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgIHZhciByb3dWYWx1ZSA9IHRoaXMuZ2V0Um93VmFsdWUocm93LCBuZXdWYWx1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHJvd1ZhbHVlKSBkZWxldGUgcm93VmFsdWVba2V5XTtcclxuICAgICAgICBpZiAobmV3Um93VmFsdWUpIHtcclxuICAgICAgICAgICAgbmV3Um93VmFsdWUgPSBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KG5ld1Jvd1ZhbHVlKSk7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiBuZXdSb3dWYWx1ZSkgcm93VmFsdWVba2V5XSA9IG5ld1Jvd1ZhbHVlW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChPYmplY3Qua2V5cyhyb3dWYWx1ZSkubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmRlbGV0ZVJvd1ZhbHVlKG5ld1ZhbHVlLCByb3cpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzUm93Q2hhbmdpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMuc2V0TmV3VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgICAgIHRoaXMuaXNSb3dDaGFuZ2luZyA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwibWF0cml4ZHJvcGRvd25jb2x1bW5cIiwgW1wibmFtZVwiLCB7IG5hbWU6IFwidGl0bGVcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmoudGl0bGVWYWx1ZTsgfSB9LFxyXG4gICAgICAgIHsgbmFtZTogXCJjaG9pY2VzOml0ZW12YWx1ZXNcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBJdGVtVmFsdWUuZ2V0RGF0YShvYmouY2hvaWNlcyk7IH0sIG9uU2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSwgdmFsdWU6IGFueSkgeyBvYmouY2hvaWNlcyA9IHZhbHVlOyB9fSxcclxuICAgICAgICBcIm9wdGlvbnNDYXB0aW9uXCIsIHsgbmFtZTogXCJjZWxsVHlwZVwiLCBkZWZhdWx0OiBcImRlZmF1bHRcIiwgY2hvaWNlczogW1wiZGVmYXVsdFwiLCBcImRyb3Bkb3duXCIsIFwiY2hlY2tib3hcIiwgXCJyYWRpb2dyb3VwXCIsIFwidGV4dFwiLCBcImNvbW1lbnRcIl0gfSxcclxuICAgICAgICB7IG5hbWU6IFwiY29sQ291bnRcIiwgZGVmYXVsdDogLTEsIGNob2ljZXM6IFstMSwgMCwgMSwgMiwgMywgNF0gfSwgXCJpc1JlcXVpcmVkOmJvb2xlYW5cIiwgXCJoYXNPdGhlcjpib29sZWFuXCIsIFwibWluV2lkdGhcIl0sXHJcbiAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTWF0cml4RHJvcGRvd25Db2x1bW4oXCJcIik7IH0pO1xyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcIm1hdHJpeGRyb3Bkb3duYmFzZVwiLCBbeyBuYW1lOiBcImNvbHVtbnM6bWF0cml4ZHJvcGRvd25jb2x1bW5zXCIsIGNsYXNzTmFtZTogXCJtYXRyaXhkcm9wZG93bmNvbHVtblwiIH0sXHJcbiAgICAgICAgXCJob3Jpem9udGFsU2Nyb2xsOmJvb2xlYW5cIixcclxuICAgICAgICB7IG5hbWU6IFwiY2hvaWNlczppdGVtdmFsdWVzXCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gSXRlbVZhbHVlLmdldERhdGEob2JqLmNob2ljZXMpOyB9LCBvblNldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnksIHZhbHVlOiBhbnkpIHsgb2JqLmNob2ljZXMgPSB2YWx1ZTsgfX0sXHJcbiAgICAgICAgeyBuYW1lOiBcIm9wdGlvbnNDYXB0aW9uXCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gb2JqLm9wdGlvbnNDYXB0aW9uVmFsdWU7IH0gfSxcclxuICAgICAgICB7IG5hbWU6IFwiY2VsbFR5cGVcIiwgZGVmYXVsdDogXCJkcm9wZG93blwiLCBjaG9pY2VzOiBbXCJkcm9wZG93blwiLCBcImNoZWNrYm94XCIsIFwicmFkaW9ncm91cFwiLCBcInRleHRcIiwgXCJjb21tZW50XCJdIH0sXHJcbiAgICAgICAgeyBuYW1lOiBcImNvbHVtbkNvbENvdW50XCIsIGRlZmF1bHQ6IDAsIGNob2ljZXM6IFswLCAxLCAyLCAzLCA0XSB9LCBcImNvbHVtbk1pbldpZHRoXCJdLFxyXG4gICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uTWF0cml4RHJvcGRvd25Nb2RlbEJhc2UoXCJcIik7IH0sIFwicXVlc3Rpb25cIik7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fbWF0cml4ZHJvcGRvd25iYXNlLnRzXG4gKiovIiwiaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tICcuL2pzb25vYmplY3QnO1xyXG5pbXBvcnQge1F1ZXN0aW9uQmFzZX0gZnJvbSAnLi9xdWVzdGlvbmJhc2UnO1xyXG5pbXBvcnQge1N1cnZleUVycm9yfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tIFwiLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcbmltcG9ydCB7QW5zd2VyUmVxdWlyZWRFcnJvcn0gZnJvbSBcIi4vZXJyb3JcIjtcclxuaW1wb3J0IHtTdXJ2ZXlWYWxpZGF0b3IsIElWYWxpZGF0b3JPd25lciwgVmFsaWRhdG9yUnVubmVyfSBmcm9tIFwiLi92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHtUZXh0UHJlUHJvY2Vzc29yfSBmcm9tIFwiLi90ZXh0UHJlUHJvY2Vzc29yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb24gZXh0ZW5kcyBRdWVzdGlvbkJhc2UgaW1wbGVtZW50cyBJVmFsaWRhdG9yT3duZXIge1xyXG4gICAgcHJpdmF0ZSB0aXRsZVZhbHVlOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBxdWVzdGlvblZhbHVlOiBhbnk7XHJcbiAgICBwcml2YXRlIHF1ZXN0aW9uQ29tbWVudDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBpc1JlcXVpcmVkVmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaGFzQ29tbWVudFZhbHVlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIGhhc090aGVyVmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgY29tbWVudFRleHRWYWx1ZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgdGV4dFByZVByb2Nlc3NvcjogVGV4dFByZVByb2Nlc3NvcjtcclxuICAgIGVycm9yczogQXJyYXk8U3VydmV5RXJyb3I+ID0gW107XHJcbiAgICB2YWxpZGF0b3JzOiBBcnJheTxTdXJ2ZXlWYWxpZGF0b3I+ID0gbmV3IEFycmF5PFN1cnZleVZhbGlkYXRvcj4oKTtcclxuICAgIHZhbHVlQ2hhbmdlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgY29tbWVudENoYW5nZWRDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuICAgIGVycm9yc0NoYW5nZWRDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuICAgIHRpdGxlQ2hhbmdlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaGFzVGl0bGUoKTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IHRpdGxlKCk6IHN0cmluZyB7IHJldHVybiAodGhpcy50aXRsZVZhbHVlKSA/IHRoaXMudGl0bGVWYWx1ZSA6IHRoaXMubmFtZTsgfVxyXG4gICAgcHVibGljIHNldCB0aXRsZShuZXdWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy50aXRsZVZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy50aXRsZUNoYW5nZWRDYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHByb2Nlc3NlZFRpdGxlKCkgeyByZXR1cm4gdGhpcy5zdXJ2ZXkgIT0gbnVsbCA/IHRoaXMuc3VydmV5LnByb2Nlc3NUZXh0KHRoaXMudGl0bGUpIDogdGhpcy50aXRsZTsgfVxyXG4gICAgcHVibGljIGdldCBmdWxsVGl0bGUoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5zdXJ2ZXkgJiYgdGhpcy5zdXJ2ZXkucXVlc3Rpb25UaXRsZVRlbXBsYXRlKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy50ZXh0UHJlUHJvY2Vzc29yKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRQcmVQcm9jZXNzb3IgPSBuZXcgVGV4dFByZVByb2Nlc3NvcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0UHJlUHJvY2Vzc29yLm9uSGFzVmFsdWUgPSBmdW5jdGlvbiAobmFtZTogc3RyaW5nKSB7IHJldHVybiBzZWxmLmNhblByb2Nlc3NlZFRleHRWYWx1ZXMobmFtZS50b0xvd2VyQ2FzZSgpKTsgfTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dFByZVByb2Nlc3Nvci5vblByb2Nlc3MgPSBmdW5jdGlvbiAobmFtZTogc3RyaW5nKSB7IHJldHVybiBzZWxmLmdldFByb2Nlc3NlZFRleHRWYWx1ZShuYW1lKTsgfTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy50ZXh0UHJlUHJvY2Vzc29yLnByb2Nlc3ModGhpcy5zdXJ2ZXkucXVlc3Rpb25UaXRsZVRlbXBsYXRlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJlcXVpcmVUZXh0ID0gdGhpcy5yZXF1aXJlZFRleHQ7XHJcbiAgICAgICAgaWYgKHJlcXVpcmVUZXh0KSByZXF1aXJlVGV4dCArPSBcIiBcIjtcclxuICAgICAgICB2YXIgbm8gPSB0aGlzLm5vO1xyXG4gICAgICAgIGlmIChubykgbm8gKz0gXCIuIFwiO1xyXG4gICAgICAgIHJldHVybiBubyArIHJlcXVpcmVUZXh0ICsgdGhpcy5wcm9jZXNzZWRUaXRsZTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjYW5Qcm9jZXNzZWRUZXh0VmFsdWVzKG5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBuYW1lID09IFwibm9cIiB8fCBuYW1lID09IFwidGl0bGVcIiB8fCBuYW1lID09IFwicmVxdWlyZVwiO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldFByb2Nlc3NlZFRleHRWYWx1ZShuYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGlmIChuYW1lID09IFwibm9cIikgcmV0dXJuIHRoaXMubm87XHJcbiAgICAgICAgaWYgKG5hbWUgPT0gXCJ0aXRsZVwiKSByZXR1cm4gdGhpcy5wcm9jZXNzZWRUaXRsZTtcclxuICAgICAgICBpZiAobmFtZSA9PSBcInJlcXVpcmVcIikgcmV0dXJuIHRoaXMucmVxdWlyZWRUZXh0O1xyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN1cHBvcnRDb21tZW50KCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cclxuICAgIHB1YmxpYyBzdXBwb3J0T3RoZXIoKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgcHVibGljIGdldCBpc1JlcXVpcmVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5pc1JlcXVpcmVkVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgaXNSZXF1aXJlZCh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodGhpcy5pc1JlcXVpcmVkID09IHZhbCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNSZXF1aXJlZFZhbHVlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMudGl0bGVDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBoYXNDb21tZW50KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5oYXNDb21tZW50VmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgaGFzQ29tbWVudCh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoIXRoaXMuc3VwcG9ydENvbW1lbnQoKSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaGFzQ29tbWVudFZhbHVlID0gdmFsO1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0NvbW1lbnQpIHRoaXMuaGFzT3RoZXIgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY29tbWVudFRleHQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuY29tbWVudFRleHRWYWx1ZSA/IHRoaXMuY29tbWVudFRleHRWYWx1ZSA6IHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJvdGhlckl0ZW1UZXh0XCIpOyB9XHJcbiAgICBwdWJsaWMgc2V0IGNvbW1lbnRUZXh0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmNvbW1lbnRUZXh0VmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaGFzT3RoZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmhhc090aGVyVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgaGFzT3RoZXIodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRPdGhlcigpIHx8IHRoaXMuaGFzT3RoZXIgPT0gdmFsKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5oYXNPdGhlclZhbHVlID0gdmFsO1xyXG4gICAgICAgIGlmICh0aGlzLmhhc090aGVyKSB0aGlzLmhhc0NvbW1lbnQgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLmhhc090aGVyQ2hhbmdlZCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGhhc090aGVyQ2hhbmdlZCgpIHsgfVxyXG4gICAgcHJvdGVjdGVkIGdldCBubygpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLnZpc2libGVJbmRleCA8IDApIHJldHVybiBcIlwiO1xyXG4gICAgICAgIHZhciBzdGFydEluZGV4ID0gMTtcclxuICAgICAgICB2YXIgaXNOdW1lcmljID0gdHJ1ZTtcclxuICAgICAgICB2YXIgc3RyID0gXCJcIjtcclxuICAgICAgICBpZiAodGhpcy5zdXJ2ZXkgJiYgdGhpcy5zdXJ2ZXkucXVlc3Rpb25TdGFydEluZGV4KSB7XHJcbiAgICAgICAgICAgIHN0ciA9IHRoaXMuc3VydmV5LnF1ZXN0aW9uU3RhcnRJbmRleDtcclxuICAgICAgICAgICAgaWYgKHBhcnNlSW50KHN0cikpIHN0YXJ0SW5kZXggPSBwYXJzZUludChzdHIpO1xyXG4gICAgICAgICAgICBlbHNlIGlmIChzdHIubGVuZ3RoID09IDEpIGlzTnVtZXJpYyA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoaXNOdW1lcmljKSByZXR1cm4gKHRoaXMudmlzaWJsZUluZGV4ICsgc3RhcnRJbmRleCkudG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gU3RyaW5nLmZyb21DaGFyQ29kZShzdHIuY2hhckNvZGVBdCgwKSArIHRoaXMudmlzaWJsZUluZGV4KTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblNldERhdGEoKSB7XHJcbiAgICAgICAgc3VwZXIub25TZXREYXRhKCk7XHJcbiAgICAgICAgdGhpcy5vblN1cnZleVZhbHVlQ2hhbmdlZCh0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZUZyb21EYXRhKHRoaXMuZ2V0VmFsdWVDb3JlKCkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCB2YWx1ZShuZXdWYWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXROZXdWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy52YWx1ZUNoYW5nZWRDYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1lbnQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZ2V0Q29tbWVudCgpOyB9XHJcbiAgICBwdWJsaWMgc2V0IGNvbW1lbnQobmV3VmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmNvbW1lbnQgPT0gbmV3VmFsdWUpIHJldHVybjtcclxuICAgICAgICB0aGlzLnNldENvbW1lbnQobmV3VmFsdWUpO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMuY29tbWVudENoYW5nZWRDYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29tbWVudCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5kYXRhICE9IG51bGwgPyB0aGlzLmRhdGEuZ2V0Q29tbWVudCh0aGlzLm5hbWUpIDogdGhpcy5xdWVzdGlvbkNvbW1lbnQ7IH1cclxuICAgIHByb3RlY3RlZCBzZXRDb21tZW50KG5ld1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnNldE5ld0NvbW1lbnQobmV3VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzRW1wdHkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnZhbHVlID09IG51bGw7IH1cclxuICAgIHB1YmxpYyBoYXNFcnJvcnMoZmlyZUNhbGxiYWNrOiBib29sZWFuID0gdHJ1ZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMuY2hlY2tGb3JFcnJvcnMoZmlyZUNhbGxiYWNrKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5lcnJvcnMubGVuZ3RoID4gMDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcmVxdWlyZWRUZXh0KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnN1cnZleSAhPSBudWxsICYmIHRoaXMuaXNSZXF1aXJlZCA/IHRoaXMuc3VydmV5LnJlcXVpcmVkVGV4dCA6IFwiXCI7IH1cclxuICAgIHByaXZhdGUgY2hlY2tGb3JFcnJvcnMoZmlyZUNhbGxiYWNrOiBib29sZWFuKSB7XHJcbiAgICAgICAgdmFyIGVycm9yTGVuZ3RoID0gdGhpcy5lcnJvcnMgPyB0aGlzLmVycm9ycy5sZW5ndGggOiAwO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gW107XHJcbiAgICAgICAgdGhpcy5vbkNoZWNrRm9yRXJyb3JzKHRoaXMuZXJyb3JzKTtcclxuICAgICAgICBpZiAodGhpcy5lcnJvcnMubGVuZ3RoID09IDAgJiYgdGhpcy52YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgZXJyb3IgPSB0aGlzLnJ1blZhbGlkYXRvcnMoKTtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9ycy5wdXNoKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy5zdXJ2ZXkgJiYgdGhpcy5lcnJvcnMubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gdGhpcy5zdXJ2ZXkudmFsaWRhdGVRdWVzdGlvbih0aGlzLm5hbWUpO1xyXG4gICAgICAgICAgICBpZiAoZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuZXJyb3JzLnB1c2goZXJyb3IpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmaXJlQ2FsbGJhY2sgJiYgKGVycm9yTGVuZ3RoICE9IHRoaXMuZXJyb3JzLmxlbmd0aCB8fCBlcnJvckxlbmd0aCA+IDApKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMuZXJyb3JzQ2hhbmdlZENhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25DaGVja0ZvckVycm9ycyhlcnJvcnM6IEFycmF5PFN1cnZleUVycm9yPikge1xyXG4gICAgICAgIGlmICh0aGlzLmhhc1JlcXVpcmVkRXJyb3IoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9ycy5wdXNoKG5ldyBBbnN3ZXJSZXF1aXJlZEVycm9yKCkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBoYXNSZXF1aXJlZEVycm9yKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzUmVxdWlyZWQgJiYgdGhpcy5pc0VtcHR5KCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcnVuVmFsaWRhdG9ycygpOiBTdXJ2ZXlFcnJvciB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWYWxpZGF0b3JSdW5uZXIoKS5ydW4odGhpcyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzVmFsdWVDaGFuZ2VkSW5TdXJ2ZXkgPSBmYWxzZTtcclxuICAgIHByb3RlY3RlZCBzZXROZXdWYWx1ZShuZXdWYWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXROZXdWYWx1ZUluRGF0YShuZXdWYWx1ZSk7XHJcbiAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHNldE5ld1ZhbHVlSW5EYXRhKG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNWYWx1ZUNoYW5nZWRJblN1cnZleSkge1xyXG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMudmFsdWVUb0RhdGEobmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlQ29yZShuZXdWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRWYWx1ZUNvcmUoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YSAhPSBudWxsID8gdGhpcy5kYXRhLmdldFZhbHVlKHRoaXMubmFtZSkgOiB0aGlzLnF1ZXN0aW9uVmFsdWU7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNldFZhbHVlQ29yZShuZXdWYWx1ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZXRWYWx1ZSh0aGlzLm5hbWUsIG5ld1ZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uVmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdmFsdWVGcm9tRGF0YSh2YWw6IGFueSk6IGFueSB7IHJldHVybiB2YWw7IH1cclxuICAgIHByb3RlY3RlZCB2YWx1ZVRvRGF0YSh2YWw6IGFueSk6IGFueSB7IHJldHVybiB2YWw7IH1cclxuICAgIHByb3RlY3RlZCBvblZhbHVlQ2hhbmdlZCgpIHsgfVxyXG4gICAgcHJvdGVjdGVkIHNldE5ld0NvbW1lbnQobmV3VmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2V0Q29tbWVudCh0aGlzLm5hbWUsIG5ld1ZhbHVlKTtcclxuICAgICAgICB9IGVsc2UgdGhpcy5xdWVzdGlvbkNvbW1lbnQgPSBuZXdWYWx1ZTtcclxuICAgIH1cclxuICAgIC8vSVF1ZXN0aW9uXHJcbiAgICBvblN1cnZleVZhbHVlQ2hhbmdlZChuZXdWYWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5pc1ZhbHVlQ2hhbmdlZEluU3VydmV5ID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdGhpcy52YWx1ZUZyb21EYXRhKG5ld1ZhbHVlKTtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmNvbW1lbnRDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgICAgIHRoaXMuaXNWYWx1ZUNoYW5nZWRJblN1cnZleSA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy9JVmFsaWRhdG9yT3duZXJcclxuICAgIGdldFZhbGlkYXRvclRpdGxlKCk6IHN0cmluZyB7IHJldHVybiBudWxsOyB9XHJcbn1cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcInF1ZXN0aW9uXCIsIFt7IG5hbWU6IFwidGl0bGU6dGV4dFwiLCBvbkdldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnkpIHsgcmV0dXJuIG9iai50aXRsZVZhbHVlOyB9IH0sXHJcbiAgICB7IG5hbWU6IFwiY29tbWVudFRleHRcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmouY29tbWVudFRleHRWYWx1ZTsgfSB9LFxyXG4gICAgXCJpc1JlcXVpcmVkOmJvb2xlYW5cIiwgeyBuYW1lOiBcInZhbGlkYXRvcnM6dmFsaWRhdG9yc1wiLCBiYXNlQ2xhc3NOYW1lOiBcInN1cnZleXZhbGlkYXRvclwiLCBjbGFzc05hbWVQYXJ0OiBcInZhbGlkYXRvclwifV0sIG51bGwsIFwicXVlc3Rpb25iYXNlXCIpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3F1ZXN0aW9uLnRzXG4gKiovIiwiaW1wb3J0IHtCYXNlLCBJUXVlc3Rpb24sIElDb25kaXRpb25SdW5uZXIsIElTdXJ2ZXlEYXRhLCBJU3VydmV5LCBIYXNoVGFibGV9IGZyb20gJy4vYmFzZSc7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSAnLi9qc29ub2JqZWN0JztcclxuaW1wb3J0IHtDb25kaXRpb25SdW5uZXJ9IGZyb20gJy4vY29uZGl0aW9ucyc7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25CYXNlIGV4dGVuZHMgQmFzZSBpbXBsZW1lbnRzIElRdWVzdGlvbiwgSUNvbmRpdGlvblJ1bm5lciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBxdWVzdGlvbkNvdW50ZXIgPSAxMDA7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRRdWVzdGlvbklkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwic3FfXCIgKyBRdWVzdGlvbkJhc2UucXVlc3Rpb25Db3VudGVyKys7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZGF0YTogSVN1cnZleURhdGE7XHJcbiAgICBwcm90ZWN0ZWQgc3VydmV5OiBJU3VydmV5O1xyXG4gICAgcHJpdmF0ZSBjb25kaXRpb25SdW5uZXI6IENvbmRpdGlvblJ1bm5lciA9IG51bGw7XHJcbiAgICBwdWJsaWMgdmlzaWJsZUlmOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBpZFZhbHVlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHZpc2libGVWYWx1ZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgc3RhcnRXaXRoTmV3TGluZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwcml2YXRlIHZpc2libGVJbmRleFZhbHVlOiBudW1iZXIgPSAtMTtcclxuICAgIHB1YmxpYyB3aWR0aDogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgcmVuZGVyV2lkdGhWYWx1ZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgcmlnaHRJbmRlbnRWYWx1ZTogbnVtYmVyID0gMDtcclxuICAgIHB1YmxpYyBpbmRlbnQ6IG51bWJlciA9IDA7XHJcbiAgICBmb2N1c0NhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgcmVuZGVyV2lkdGhDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcbiAgICByb3dWaXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgdmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuICAgIHZpc2libGVJbmRleENoYW5nZWRDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmlkVmFsdWUgPSBRdWVzdGlvbkJhc2UuZ2V0UXVlc3Rpb25JZCgpO1xyXG4gICAgICAgIHRoaXMub25DcmVhdGluZygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy52aXNpYmxlVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgdmlzaWJsZSh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodmFsID09IHRoaXMudmlzaWJsZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZVZhbHVlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMudmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjayk7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy5yb3dWaXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrKTtcclxuICAgICAgICBpZiAodGhpcy5zdXJ2ZXkpIHtcclxuICAgICAgICAgICAgdGhpcy5zdXJ2ZXkucXVlc3Rpb25WaXNpYmlsaXR5Q2hhbmdlZCg8SVF1ZXN0aW9uPnRoaXMsIHRoaXMudmlzaWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCB2aXNpYmxlSW5kZXgoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMudmlzaWJsZUluZGV4VmFsdWU7IH1cclxuICAgIHB1YmxpYyBoYXNFcnJvcnMoZmlyZUNhbGxiYWNrOiBib29sZWFuID0gdHJ1ZSk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cclxuICAgIHB1YmxpYyBnZXQgaGFzVGl0bGUoKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgcHVibGljIGdldCBoYXNDb21tZW50KCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuaWRWYWx1ZTsgfVxyXG4gICAgcHVibGljIGdldCByZW5kZXJXaWR0aCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5yZW5kZXJXaWR0aFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHJlbmRlcldpZHRoKHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PSB0aGlzLnJlbmRlcldpZHRoKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5yZW5kZXJXaWR0aFZhbHVlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMucmVuZGVyV2lkdGhDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCByaWdodEluZGVudCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5yaWdodEluZGVudFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHJpZ2h0SW5kZW50KHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PSB0aGlzLnJpZ2h0SW5kZW50KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5yaWdodEluZGVudFZhbHVlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMucmVuZGVyV2lkdGhDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGZvY3VzKCkge1xyXG4gICAgICAgIHZhciBlbCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKHRoaXMuaWQpO1xyXG4gICAgICAgIGlmICghZWwgfHwgIWVsLnNjcm9sbEludG9WaWV3KSByZXR1cm47XHJcbiAgICAgICAgdmFyIGVsZW1Ub3AgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcbiAgICAgICAgaWYgKGVsZW1Ub3AgPCAwKSB7XHJcbiAgICAgICAgICAgIGVsLnNjcm9sbEludG9WaWV3KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMuZm9jdXNDYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgc2V0RGF0YShuZXdWYWx1ZTogSVN1cnZleURhdGEpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLnN1cnZleSA9IChuZXdWYWx1ZSAmJiBuZXdWYWx1ZVtcInF1ZXN0aW9uQWRkZWRcIl0pID8gPElTdXJ2ZXk+bmV3VmFsdWUgOiBudWxsO1xyXG4gICAgICAgIHRoaXMub25TZXREYXRhKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZmlyZUNhbGxiYWNrKGNhbGxiYWNrOiAoKSA9PiB2b2lkKSB7XHJcbiAgICAgICAgaWYgKGNhbGxiYWNrKSBjYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uU2V0RGF0YSgpIHsgfVxyXG4gICAgcHJvdGVjdGVkIG9uQ3JlYXRpbmcoKSB7IH1cclxuICAgIHB1YmxpYyBydW5Db25kaXRpb24odmFsdWVzOiBIYXNoVGFibGU8YW55Pikge1xyXG4gICAgICAgIGlmICghdGhpcy52aXNpYmxlSWYpIHJldHVybjtcclxuICAgICAgICBpZiAoIXRoaXMuY29uZGl0aW9uUnVubmVyKSB0aGlzLmNvbmRpdGlvblJ1bm5lciA9IG5ldyBDb25kaXRpb25SdW5uZXIodGhpcy52aXNpYmxlSWYpO1xyXG4gICAgICAgIHRoaXMuY29uZGl0aW9uUnVubmVyLmV4cHJlc3Npb24gPSB0aGlzLnZpc2libGVJZjtcclxuICAgICAgICB0aGlzLnZpc2libGUgPSB0aGlzLmNvbmRpdGlvblJ1bm5lci5ydW4odmFsdWVzKTtcclxuICAgIH1cclxuICAgIC8vSVF1ZXN0aW9uXHJcbiAgICBvblN1cnZleVZhbHVlQ2hhbmdlZChuZXdWYWx1ZTogYW55KSB7XHJcbiAgICB9XHJcbiAgICBvblN1cnZleUxvYWQoKSB7XHJcbiAgICB9XHJcbiAgICBzZXRWaXNpYmxlSW5kZXgodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLnZpc2libGVJbmRleFZhbHVlID09IHZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy52aXNpYmxlSW5kZXhWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMudmlzaWJsZUluZGV4Q2hhbmdlZENhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIHN1cHBvcnRHb05leHRQYWdlQXV0b21hdGljKCkgeyByZXR1cm4gZmFsc2U7IH1cclxufVxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwicXVlc3Rpb25iYXNlXCIsIFtcIiFuYW1lXCIsIHsgbmFtZTogXCJ2aXNpYmxlOmJvb2xlYW5cIiwgZGVmYXVsdDogdHJ1ZSB9LCBcInZpc2libGVJZjp0ZXh0XCIsXHJcbiAgICB7IG5hbWU6IFwid2lkdGhcIiB9LCB7IG5hbWU6IFwic3RhcnRXaXRoTmV3TGluZTpib29sZWFuXCIsIGRlZmF1bHQ6IHRydWV9LCB7bmFtZTogXCJpbmRlbnQ6bnVtYmVyXCIsIGRlZmF1bHQ6IDAsIGNob2ljZXM6IFswLCAxLCAyLCAzXX1dKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbmJhc2UudHNcbiAqKi8iLCJleHBvcnQgY2xhc3MgVGV4dFByZVByb2Nlc3Nvckl0ZW0ge1xyXG4gICAgcHVibGljIHN0YXJ0OiBudW1iZXI7XHJcbiAgICBwdWJsaWMgZW5kOiBudW1iZXI7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBUZXh0UHJlUHJvY2Vzc29yIHtcclxuICAgIHB1YmxpYyBvblByb2Nlc3M6IChuYW1lOiBzdHJpbmcpID0+IGFueTtcclxuICAgIHB1YmxpYyBvbkhhc1ZhbHVlOiAobmFtZTogc3RyaW5nKSA9PiBib29sZWFuO1xyXG4gICAgY29uc3RydWN0b3IoKSB7IH1cclxuICAgIHB1YmxpYyBwcm9jZXNzKHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCF0ZXh0KSByZXR1cm4gdGV4dDtcclxuICAgICAgICBpZiAoIXRoaXMub25Qcm9jZXNzKSByZXR1cm4gdGV4dDtcclxuICAgICAgICB2YXIgaXRlbXMgPSB0aGlzLmdldEl0ZW1zKHRleHQpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBpdGVtcy5sZW5ndGggLSAxOyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IGl0ZW1zW2ldO1xyXG4gICAgICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0TmFtZSh0ZXh0LnN1YnN0cmluZyhpdGVtLnN0YXJ0ICsgMSwgaXRlbS5lbmQpKTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmNhblByb2Nlc3NOYW1lKG5hbWUpKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMub25IYXNWYWx1ZSAmJiAhdGhpcy5vbkhhc1ZhbHVlKG5hbWUpKSBjb250aW51ZTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5vblByb2Nlc3MobmFtZSk7XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSA9PSBudWxsKSB2YWx1ZSA9IFwiXCI7XHJcbiAgICAgICAgICAgIHRleHQgPSB0ZXh0LnN1YnN0cigwLCBpdGVtLnN0YXJ0KSArIHZhbHVlICsgdGV4dC5zdWJzdHIoaXRlbS5lbmQgKyAxKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRleHQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldEl0ZW1zKHRleHQ6IHN0cmluZyk6IEFycmF5PFRleHRQcmVQcm9jZXNzb3JJdGVtPiB7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gW107XHJcbiAgICAgICAgdmFyIGxlbmd0aCA9IHRleHQubGVuZ3RoO1xyXG4gICAgICAgIHZhciBzdGFydCA9IC0xO1xyXG4gICAgICAgIHZhciBjaCA9ICcnO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgY2ggPSB0ZXh0W2ldO1xyXG4gICAgICAgICAgICBpZiAoY2ggPT0gJ3snKSBzdGFydCA9IGk7XHJcbiAgICAgICAgICAgIGlmIChjaCA9PSAnfScpIHtcclxuICAgICAgICAgICAgICAgIGlmIChzdGFydCA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIGl0ZW0gPSBuZXcgVGV4dFByZVByb2Nlc3Nvckl0ZW0oKTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLnN0YXJ0ID0gc3RhcnQ7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbS5lbmQgPSBpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBzdGFydCA9IC0xO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpdGVtcztcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0TmFtZShuYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghbmFtZSkgcmV0dXJuO1xyXG4gICAgICAgIHJldHVybiBuYW1lLnRyaW0oKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY2FuUHJvY2Vzc05hbWUobmFtZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCFuYW1lKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBuYW1lLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaCA9IG5hbWVbaV07XHJcbiAgICAgICAgICAgIC8vVE9ET1xyXG4gICAgICAgICAgICBpZiAoY2ggPT0gJyAnIHx8IGNoID09ICctJyB8fCBjaCA9PSAnJicpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90ZXh0UHJlUHJvY2Vzc29yLnRzXG4gKiovIiwiaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7SXRlbVZhbHVlLCBTdXJ2ZXlFcnJvcn0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4vc3VydmV5U3RyaW5nc1wiO1xyXG5pbXBvcnQge0N1c3RvbUVycm9yfSBmcm9tIFwiLi9lcnJvclwiO1xyXG5pbXBvcnQge0Nob2ljZXNSZXN0ZnVsbH0gZnJvbSBcIi4vY2hvaWNlc1Jlc3RmdWxsXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25TZWxlY3RCYXNlIGV4dGVuZHMgUXVlc3Rpb24ge1xyXG4gICAgcHJpdmF0ZSBjb21tZW50VmFsdWU6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBjYWNoZWRWYWx1ZTogYW55O1xyXG4gICAgb3RoZXJJdGVtOiBJdGVtVmFsdWUgPSBuZXcgSXRlbVZhbHVlKFwib3RoZXJcIiwgc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcIm90aGVySXRlbVRleHRcIikpO1xyXG4gICAgcHJpdmF0ZSBjaG9pY2VzRnJvbVVybDogQXJyYXk8SXRlbVZhbHVlPiA9IG51bGw7XHJcbiAgICBwcml2YXRlIGNob2ljZXNWYWx1ZXM6IEFycmF5PEl0ZW1WYWx1ZT4gPSBuZXcgQXJyYXk8SXRlbVZhbHVlPigpO1xyXG4gICAgcHVibGljIGNob2ljZXNCeVVybDogQ2hvaWNlc1Jlc3RmdWxsO1xyXG4gICAgcHVibGljIG90aGVyRXJyb3JUZXh0OiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHVibGljIHN0b3JlT3RoZXJzQXNDb21tZW50OiBib29sZWFuID0gdHJ1ZTtcclxuICAgIGNob2ljZXNPcmRlclZhbHVlOiBzdHJpbmcgPSBcIm5vbmVcIjtcclxuICAgIGNob2ljZXNDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcbiAgICBjb25zdHJ1Y3RvcihuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICB0aGlzLmNob2ljZXNCeVVybCA9IHRoaXMuY3JlYXRlUmVzdGZ1bGwoKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5jaG9pY2VzQnlVcmwuZ2V0UmVzdWx0Q2FsbGJhY2sgPSBmdW5jdGlvbiAoaXRlbXM6IEFycmF5PEl0ZW1WYWx1ZT4pIHsgc2VsZi5vbkxvYWRDaG9pY2VzRnJvbVVybChpdGVtcykgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXNPdGhlclNlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFN0b3JlT3RoZXJzQXNDb21tZW50KCkgPyB0aGlzLmdldEhhc090aGVyKHRoaXMudmFsdWUpIDogdGhpcy5nZXRIYXNPdGhlcih0aGlzLmNhY2hlZFZhbHVlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXRIYXNPdGhlcih2YWw6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB2YWwgPT0gdGhpcy5vdGhlckl0ZW0udmFsdWU7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlUmVzdGZ1bGwoKTogQ2hvaWNlc1Jlc3RmdWxsIHsgcmV0dXJuIG5ldyBDaG9pY2VzUmVzdGZ1bGwoKTsgfVxyXG4gICAgcHJvdGVjdGVkIGdldENvbW1lbnQoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5nZXRTdG9yZU90aGVyc0FzQ29tbWVudCgpKSByZXR1cm4gc3VwZXIuZ2V0Q29tbWVudCgpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNvbW1lbnRWYWx1ZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaXNTZXR0aW5nQ29tbWVudDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJvdGVjdGVkIHNldENvbW1lbnQobmV3VmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh0aGlzLmdldFN0b3JlT3RoZXJzQXNDb21tZW50KCkpXHJcbiAgICAgICAgICAgIHN1cGVyLnNldENvbW1lbnQobmV3VmFsdWUpXHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1NldHRpbmdDb21tZW50ICYmIG5ld1ZhbHVlICE9IHRoaXMuY29tbWVudFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2V0dGluZ0NvbW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tZW50VmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3RoZXJTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TmV3VmFsdWVJbkRhdGEodGhpcy5jYWNoZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2V0dGluZ0NvbW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCB2YWx1ZUZyb21EYXRhKHZhbDogYW55KTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy5nZXRTdG9yZU90aGVyc0FzQ29tbWVudCgpKSByZXR1cm4gc3VwZXIudmFsdWVGcm9tRGF0YSh2YWwpO1xyXG4gICAgICAgIHRoaXMuY2FjaGVkVmFsdWUgPSB0aGlzLnZhbHVlRnJvbURhdGFDb3JlKHZhbCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkVmFsdWU7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdmFsdWVUb0RhdGEodmFsOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLmdldFN0b3JlT3RoZXJzQXNDb21tZW50KCkpIHJldHVybiBzdXBlci52YWx1ZVRvRGF0YSh2YWwpO1xyXG4gICAgICAgIHRoaXMuY2FjaGVkVmFsdWUgPSB2YWw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVUb0RhdGFDb3JlKHZhbCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdmFsdWVGcm9tRGF0YUNvcmUodmFsOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmICghdGhpcy5oYXNVbmtub3duVmFsdWUodmFsKSkgcmV0dXJuIHZhbDtcclxuICAgICAgICBpZiAodmFsID09IHRoaXMub3RoZXJJdGVtLnZhbHVlKSByZXR1cm4gdmFsO1xyXG4gICAgICAgIHRoaXMuY29tbWVudCA9IHZhbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5vdGhlckl0ZW0udmFsdWU7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdmFsdWVUb0RhdGFDb3JlKHZhbDogYW55KTogYW55IHtcclxuICAgICAgICBpZiAodmFsID09IHRoaXMub3RoZXJJdGVtLnZhbHVlICYmIHRoaXMuZ2V0Q29tbWVudCgpKSB7XHJcbiAgICAgICAgICAgIHZhbCA9IHRoaXMuZ2V0Q29tbWVudCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGhhc1Vua25vd25WYWx1ZSh2YWw6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdmFsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy5hY3RpdmVDaG9pY2VzO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW1zW2ldLnZhbHVlID09IHZhbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGdldCBjaG9pY2VzKCk6IEFycmF5PGFueT4geyByZXR1cm4gdGhpcy5jaG9pY2VzVmFsdWVzOyB9XHJcbiAgICBzZXQgY2hvaWNlcyhuZXdWYWx1ZTogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIEl0ZW1WYWx1ZS5zZXREYXRhKHRoaXMuY2hvaWNlc1ZhbHVlcywgbmV3VmFsdWUpO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMuY2hvaWNlc0NoYW5nZWRDYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgaGFzT3RoZXJDaGFuZ2VkKCkge1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMuY2hvaWNlc0NoYW5nZWRDYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBnZXQgY2hvaWNlc09yZGVyKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmNob2ljZXNPcmRlclZhbHVlOyB9XHJcbiAgICBzZXQgY2hvaWNlc09yZGVyKG5ld1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPT0gdGhpcy5jaG9pY2VzT3JkZXJWYWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY2hvaWNlc09yZGVyVmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmNob2ljZXNDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgZ2V0IG90aGVyVGV4dCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vdGhlckl0ZW0udGV4dDsgfVxyXG4gICAgc2V0IG90aGVyVGV4dCh2YWx1ZTogc3RyaW5nKSB7IHRoaXMub3RoZXJJdGVtLnRleHQgPSB2YWx1ZTsgfVxyXG4gICAgZ2V0IHZpc2libGVDaG9pY2VzKCk6IEFycmF5PEl0ZW1WYWx1ZT4ge1xyXG4gICAgICAgIGlmICghdGhpcy5oYXNPdGhlciAmJiB0aGlzLmNob2ljZXNPcmRlciA9PSBcIm5vbmVcIikgcmV0dXJuIHRoaXMuYWN0aXZlQ2hvaWNlcztcclxuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5zb3J0VmlzaWJsZUNob2ljZXModGhpcy5hY3RpdmVDaG9pY2VzLnNsaWNlKCkpO1xyXG4gICAgICAgIGlmICh0aGlzLmhhc090aGVyKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMub3RoZXJJdGVtKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0IGFjdGl2ZUNob2ljZXMoKTogQXJyYXk8SXRlbVZhbHVlPiB7IHJldHVybiB0aGlzLmNob2ljZXNGcm9tVXJsID8gdGhpcy5jaG9pY2VzRnJvbVVybCA6IHRoaXMuY2hvaWNlczsgfVxyXG4gICAgcHVibGljIHN1cHBvcnRDb21tZW50KCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgcHVibGljIHN1cHBvcnRPdGhlcigpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cclxuICAgIHByb3RlY3RlZCBvbkNoZWNrRm9yRXJyb3JzKGVycm9yczogQXJyYXk8U3VydmV5RXJyb3I+KSB7XHJcbiAgICAgICAgc3VwZXIub25DaGVja0ZvckVycm9ycyhlcnJvcnMpO1xyXG4gICAgICAgIGlmICghdGhpcy5pc090aGVyU2VsZWN0ZWQgfHwgdGhpcy5jb21tZW50KSByZXR1cm47XHJcbiAgICAgICAgdmFyIHRleHQgPSB0aGlzLm90aGVyRXJyb3JUZXh0O1xyXG4gICAgICAgIGlmICghdGV4dCkge1xyXG4gICAgICAgICAgICB0ZXh0ID0gc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcIm90aGVyUmVxdWlyZWRFcnJvclwiKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZXJyb3JzLnB1c2gobmV3IEN1c3RvbUVycm9yKHRleHQpKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXRTdG9yZU90aGVyc0FzQ29tbWVudCgpIHsgcmV0dXJuIHRoaXMuc3RvcmVPdGhlcnNBc0NvbW1lbnQgJiYgKHRoaXMuc3VydmV5ICE9IG51bGwgPyB0aGlzLnN1cnZleS5zdG9yZU90aGVyc0FzQ29tbWVudCA6IHRydWUpOyB9XHJcbiAgICBvblN1cnZleUxvYWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hvaWNlc0J5VXJsKSB0aGlzLmNob2ljZXNCeVVybC5ydW4oKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Mb2FkQ2hvaWNlc0Zyb21VcmwoYXJyYXk6IEFycmF5PEl0ZW1WYWx1ZT4pIHtcclxuICAgICAgICB2YXIgZXJyb3JDb3VudCA9IHRoaXMuZXJyb3JzLmxlbmd0aDtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLmNob2ljZXNCeVVybCAmJiB0aGlzLmNob2ljZXNCeVVybC5lcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9ycy5wdXNoKHRoaXMuY2hvaWNlc0J5VXJsLmVycm9yKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVycm9yQ291bnQgPiAwIHx8IHRoaXMuZXJyb3JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy5lcnJvcnNDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgbmV3Q2hvaWNlcyA9IG51bGw7XHJcbiAgICAgICAgaWYgKGFycmF5ICYmIGFycmF5Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgbmV3Q2hvaWNlcyA9IG5ldyBBcnJheTxJdGVtVmFsdWU+KCk7XHJcbiAgICAgICAgICAgIEl0ZW1WYWx1ZS5zZXREYXRhKG5ld0Nob2ljZXMsIGFycmF5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5jaG9pY2VzRnJvbVVybCA9IG5ld0Nob2ljZXM7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy5jaG9pY2VzQ2hhbmdlZENhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc29ydFZpc2libGVDaG9pY2VzKGFycmF5OiBBcnJheTxJdGVtVmFsdWU+KTogQXJyYXk8SXRlbVZhbHVlPiB7XHJcbiAgICAgICAgdmFyIG9yZGVyID0gdGhpcy5jaG9pY2VzT3JkZXIudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAob3JkZXIgPT0gXCJhc2NcIikgcmV0dXJuIHRoaXMuc29ydEFycmF5KGFycmF5LCAxKTtcclxuICAgICAgICBpZiAob3JkZXIgPT0gXCJkZXNjXCIpIHJldHVybiB0aGlzLnNvcnRBcnJheShhcnJheSwgLTEpO1xyXG4gICAgICAgIGlmIChvcmRlciA9PSBcInJhbmRvbVwiKSByZXR1cm4gdGhpcy5yYW5kb21pemVBcnJheShhcnJheSk7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzb3J0QXJyYXkoYXJyYXk6IEFycmF5PEl0ZW1WYWx1ZT4sIG11bHQ6IG51bWJlcik6IEFycmF5PEl0ZW1WYWx1ZT4ge1xyXG4gICAgICAgIHJldHVybiBhcnJheS5zb3J0KGZ1bmN0aW9uIChhLCBiKSB7XHJcbiAgICAgICAgICAgIGlmIChhLnRleHQgPCBiLnRleHQpIHJldHVybiAtMSAqIG11bHQ7XHJcbiAgICAgICAgICAgIGlmIChhLnRleHQgPiBiLnRleHQpIHJldHVybiAxICogbXVsdDtcclxuICAgICAgICAgICAgcmV0dXJuIDA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJhbmRvbWl6ZUFycmF5KGFycmF5OiBBcnJheTxJdGVtVmFsdWU+KTogQXJyYXk8SXRlbVZhbHVlPiB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGFycmF5Lmxlbmd0aCAtIDE7IGkgPiAwOyBpLS0pIHtcclxuICAgICAgICAgICAgdmFyIGogPSBNYXRoLmZsb29yKE1hdGgucmFuZG9tKCkgKiAoaSArIDEpKTtcclxuICAgICAgICAgICAgdmFyIHRlbXAgPSBhcnJheVtpXTtcclxuICAgICAgICAgICAgYXJyYXlbaV0gPSBhcnJheVtqXTtcclxuICAgICAgICAgICAgYXJyYXlbal0gPSB0ZW1wO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNoZWNrYm94QmFzZSBleHRlbmRzIFF1ZXN0aW9uU2VsZWN0QmFzZSB7XHJcbiAgICBwcml2YXRlIGNvbENvdW50VmFsdWU6IG51bWJlciA9IDE7XHJcbiAgICBjb2xDb3VudENoYW5nZWRDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY29sQ291bnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY29sQ291bnRWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBjb2xDb3VudCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+IDQpIHJldHVybjtcclxuICAgICAgICB0aGlzLmNvbENvdW50VmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmNvbENvdW50Q2hhbmdlZENhbGxiYWNrKTtcclxuICAgIH1cclxufVxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwic2VsZWN0YmFzZVwiLCBbXCJoYXNDb21tZW50OmJvb2xlYW5cIiwgXCJoYXNPdGhlcjpib29sZWFuXCIsXHJcbiAgICB7IG5hbWU6IFwiY2hvaWNlczppdGVtdmFsdWVzXCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gSXRlbVZhbHVlLmdldERhdGEob2JqLmNob2ljZXMpOyB9LCBvblNldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnksIHZhbHVlOiBhbnkpIHsgb2JqLmNob2ljZXMgPSB2YWx1ZTsgfX0sXHJcbiAgICB7IG5hbWU6IFwiY2hvaWNlc09yZGVyXCIsIGRlZmF1bHQ6IFwibm9uZVwiLCBjaG9pY2VzOiBbXCJub25lXCIsIFwiYXNjXCIsIFwiZGVzY1wiLCBcInJhbmRvbVwiXSB9LFxyXG4gICAgeyBuYW1lOiBcImNob2ljZXNCeVVybDpyZXN0ZnVsbFwiLCBjbGFzc05hbWU6IFwiQ2hvaWNlc1Jlc3RmdWxsXCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gb2JqLmNob2ljZXNCeVVybC5pc0VtcHR5ID8gbnVsbCA6IG9iai5jaG9pY2VzQnlVcmw7IH0sIG9uU2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSwgdmFsdWU6IGFueSkgeyBvYmouY2hvaWNlc0J5VXJsLnNldERhdGEodmFsdWUpOyB9IH0sXHJcbiAgICB7IG5hbWU6IFwib3RoZXJUZXh0XCIsIGRlZmF1bHQ6IHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJvdGhlckl0ZW1UZXh0XCIpIH0sIFwib3RoZXJFcnJvclRleHRcIixcclxuICAgIHsgbmFtZTogXCJzdG9yZU90aGVyc0FzQ29tbWVudDpib29sZWFuXCIsIGRlZmF1bHQ6IHRydWV9XSwgbnVsbCwgXCJxdWVzdGlvblwiKTtcclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJjaGVja2JveGJhc2VcIiwgW3sgbmFtZTogXCJjb2xDb3VudDpudW1iZXJcIiwgZGVmYXVsdDogMSwgY2hvaWNlczogWzAsIDEsIDIsIDMsIDRdIH1dLCBudWxsLCBcInNlbGVjdGJhc2VcIik7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fYmFzZXNlbGVjdC50c1xuICoqLyIsImltcG9ydCB7UXVlc3Rpb25CYXNlfSBmcm9tICcuL3F1ZXN0aW9uYmFzZSc7XHJcbmltcG9ydCB7SGFzaFRhYmxlfSBmcm9tIFwiLi9iYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25GYWN0b3J5IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgSW5zdGFuY2U6IFF1ZXN0aW9uRmFjdG9yeSA9IG5ldyBRdWVzdGlvbkZhY3RvcnkoKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgRGVmYXVsdENob2ljZXMgPSBbXCJvbmVcIiwgXCJ0d298c2Vjb25kIHZhbHVlXCIsIFwidGhyZWV8dGhpcmQgdmFsdWVcIl07XHJcbiAgICBwcml2YXRlIGNyZWF0b3JIYXNoOiBIYXNoVGFibGU8KG5hbWU6IHN0cmluZykgPT4gUXVlc3Rpb25CYXNlPiA9IHt9O1xyXG5cclxuICAgIHB1YmxpYyByZWdpc3RlclF1ZXN0aW9uKHF1ZXN0aW9uVHlwZTogc3RyaW5nLCBxdWVzdGlvbkNyZWF0b3I6IChuYW1lOiBzdHJpbmcpID0+IFF1ZXN0aW9uQmFzZSkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRvckhhc2hbcXVlc3Rpb25UeXBlXSA9IHF1ZXN0aW9uQ3JlYXRvcjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBbGxUeXBlcygpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiB0aGlzLmNyZWF0b3JIYXNoKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQuc29ydCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNyZWF0ZVF1ZXN0aW9uKHF1ZXN0aW9uVHlwZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBRdWVzdGlvbkJhc2Uge1xyXG4gICAgICAgIHZhciBjcmVhdG9yID0gdGhpcy5jcmVhdG9ySGFzaFtxdWVzdGlvblR5cGVdO1xyXG4gICAgICAgIGlmIChjcmVhdG9yID09IG51bGwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiBjcmVhdG9yKG5hbWUpO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25mYWN0b3J5LnRzXG4gKiovIiwiaW1wb3J0IHtRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWxCYXNlLFxyXG4gICAgTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UsXHJcbiAgICBJTWF0cml4RHJvcGRvd25EYXRhXHJcbn0gZnJvbSBcIi4vcXVlc3Rpb25fbWF0cml4ZHJvcGRvd25iYXNlXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge0l0ZW1WYWx1ZX0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWF0cml4RHJvcGRvd25Sb3dNb2RlbCBleHRlbmRzIE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBhbnksIHB1YmxpYyB0ZXh0OiBzdHJpbmcsIGRhdGE6IElNYXRyaXhEcm9wZG93bkRhdGEsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihkYXRhLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHJvd05hbWUoKSB7IHJldHVybiB0aGlzLm5hbWU7IH1cclxufVxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25NYXRyaXhEcm9wZG93bk1vZGVsIGV4dGVuZHMgUXVlc3Rpb25NYXRyaXhEcm9wZG93bk1vZGVsQmFzZSBpbXBsZW1lbnRzIElNYXRyaXhEcm9wZG93bkRhdGEge1xyXG4gICAgcHJpdmF0ZSByb3dzVmFsdWU6IEl0ZW1WYWx1ZVtdID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJtYXRyaXhkcm9wZG93blwiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCByb3dzKCk6IEFycmF5PGFueT4geyByZXR1cm4gdGhpcy5yb3dzVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgcm93cyhuZXdWYWx1ZTogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIEl0ZW1WYWx1ZS5zZXREYXRhKHRoaXMucm93c1ZhbHVlLCBuZXdWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2VuZXJhdGVSb3dzKCk6IEFycmF5PE1hdHJpeERyb3Bkb3duUm93TW9kZWw+IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5PE1hdHJpeERyb3Bkb3duUm93TW9kZWw+KCk7XHJcbiAgICAgICAgaWYgKCF0aGlzLnJvd3MgfHwgdGhpcy5yb3dzLmxlbmd0aCA9PT0gMCkgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB2YXIgdmFsID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBpZiAoIXZhbCkgdmFsID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnJvd3NbaV0udmFsdWUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmNyZWF0ZU1hdHJpeFJvdyh0aGlzLnJvd3NbaV0udmFsdWUsIHRoaXMucm93c1tpXS50ZXh0LCB2YWxbdGhpcy5yb3dzW2ldLnZhbHVlXSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZU1hdHJpeFJvdyhuYW1lOiBhbnksIHRleHQ6IHN0cmluZywgdmFsdWU6IGFueSk6IE1hdHJpeERyb3Bkb3duUm93TW9kZWwge1xyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4RHJvcGRvd25Sb3dNb2RlbChuYW1lLCB0ZXh0LCB0aGlzLCB2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJtYXRyaXhkcm9wZG93blwiLCBbeyBuYW1lOiBcInJvd3M6aXRlbXZhbHVlc1wiLCBvbkdldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnkpIHsgcmV0dXJuIEl0ZW1WYWx1ZS5nZXREYXRhKG9iai5yb3dzKTsgfSwgb25TZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55LCB2YWx1ZTogYW55KSB7IG9iai5yb3dzID0gdmFsdWU7IH19XSxcclxuICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWwoXCJcIik7IH0sIFwibWF0cml4ZHJvcGRvd25iYXNlXCIpO1xyXG5cclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJtYXRyaXhkcm9wZG93blwiLCAobmFtZSkgPT4geyB2YXIgcSA9IG5ldyBRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWwobmFtZSk7IHEuY2hvaWNlcyA9IFsxLCAyLCAzLCA0LCA1XTsgcS5yb3dzID0gW1wiUm93IDFcIiwgXCJSb3cgMlwiXTsgcS5hZGRDb2x1bW4oXCJDb2x1bW4gMVwiKTsgcS5hZGRDb2x1bW4oXCJDb2x1bW4gMlwiKTsgcS5hZGRDb2x1bW4oXCJDb2x1bW4gM1wiKTsgcmV0dXJuIHE7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3F1ZXN0aW9uX21hdHJpeGRyb3Bkb3duLnRzXG4gKiovIiwiaW1wb3J0IHtRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWxCYXNlLFxyXG4gICAgTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UsIElNYXRyaXhEcm9wZG93bkRhdGFcclxufSBmcm9tIFwiLi9xdWVzdGlvbl9tYXRyaXhkcm9wZG93bmJhc2VcIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuL3N1cnZleVN0cmluZ3NcIjtcclxuaW1wb3J0IHtTdXJ2ZXlFcnJvcn0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQge0N1c3RvbUVycm9yfSBmcm9tIFwiLi9lcnJvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hdHJpeER5bmFtaWNSb3dNb2RlbCBleHRlbmRzIE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBpbmRleDogbnVtYmVyLCBkYXRhOiBJTWF0cml4RHJvcGRvd25EYXRhLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoZGF0YSwgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCByb3dOYW1lKCkgeyByZXR1cm4gXCJyb3dcIiArIHRoaXMuaW5kZXg7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTWF0cml4RHluYW1pY01vZGVsIGV4dGVuZHMgUXVlc3Rpb25NYXRyaXhEcm9wZG93bk1vZGVsQmFzZSBpbXBsZW1lbnRzIElNYXRyaXhEcm9wZG93bkRhdGEge1xyXG4gICAgc3RhdGljIE1heFJvd0NvdW50ID0gMTAwO1xyXG4gICAgcHJpdmF0ZSByb3dDb3VudGVyID0gMDtcclxuICAgIHByaXZhdGUgcm93Q291bnRWYWx1ZTogbnVtYmVyID0gMjtcclxuICAgIHByaXZhdGUgYWRkUm93VGV4dFZhbHVlOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSByZW1vdmVSb3dUZXh0VmFsdWU6IHN0cmluZyA9IG51bGw7XHJcbiAgICBwdWJsaWMgbWluUm93Q291bnQgPSAwO1xyXG4gICAgcHVibGljIHJvd0NvdW50Q2hhbmdlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJtYXRyaXhkeW5hbWljXCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHJvd0NvdW50KCkgeyByZXR1cm4gdGhpcy5yb3dDb3VudFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHJvd0NvdW50KHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHZhbCA8IDAgfHwgdmFsID4gUXVlc3Rpb25NYXRyaXhEeW5hbWljTW9kZWwuTWF4Um93Q291bnQpIHJldHVybjtcclxuICAgICAgICB0aGlzLnJvd0NvdW50VmFsdWUgPSB2YWw7XHJcbiAgICAgICAgaWYgKHRoaXMudmFsdWUgJiYgdGhpcy52YWx1ZS5sZW5ndGggPiB2YWwpIHtcclxuICAgICAgICAgICAgdmFyIHFWYWwgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgICAgICBxVmFsLnNwbGljZSh2YWwpO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gcVZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy5yb3dDb3VudENoYW5nZWRDYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkUm93KCkge1xyXG4gICAgICAgIGlmICh0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MucHVzaCh0aGlzLmNyZWF0ZU1hdHJpeFJvdyhudWxsKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMucm93Q291bnQrKztcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW1vdmVSb3coaW5kZXg6IG51bWJlcikge1xyXG4gICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gdGhpcy5yb3dDb3VudCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzICYmIGluZGV4IDwgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodGhpcy52YWx1ZSkge1xyXG4gICAgICAgICAgICB2YXIgdmFsID0gdGhpcy5jcmVhdGVOZXdWYWx1ZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICAgICAgdmFsLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIHZhbCA9IHRoaXMuZGVsZXRlUm93VmFsdWUodmFsLCBudWxsKTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHZhbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb3dDb3VudC0tO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBhZGRSb3dUZXh0KCkgeyByZXR1cm4gdGhpcy5hZGRSb3dUZXh0VmFsdWUgPyB0aGlzLmFkZFJvd1RleHRWYWx1ZSA6IHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJhZGRSb3dcIik7IH1cclxuICAgIHB1YmxpYyBzZXQgYWRkUm93VGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5hZGRSb3dUZXh0VmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcmVtb3ZlUm93VGV4dCgpIHsgcmV0dXJuIHRoaXMucmVtb3ZlUm93VGV4dFZhbHVlID8gdGhpcy5yZW1vdmVSb3dUZXh0VmFsdWUgOiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwicmVtb3ZlUm93XCIpOyB9XHJcbiAgICBwdWJsaWMgc2V0IHJlbW92ZVJvd1RleHQodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucmVtb3ZlUm93VGV4dFZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNhY2hlZFZpc2libGVSb3dzKCk6IEFycmF5PE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MgJiYgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cy5sZW5ndGggPT0gdGhpcy5yb3dDb3VudCkgcmV0dXJuIHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3M7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZVJvd3M7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25DaGVja0ZvckVycm9ycyhlcnJvcnM6IEFycmF5PFN1cnZleUVycm9yPikge1xyXG4gICAgICAgIHN1cGVyLm9uQ2hlY2tGb3JFcnJvcnMoZXJyb3JzKTtcclxuICAgICAgICBpZiAodGhpcy5oYXNFcnJvckluUm93cygpKSB7XHJcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKG5ldyBDdXN0b21FcnJvcihzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwibWluUm93Q291bnRFcnJvclwiKVtcImZvcm1hdFwiXSh0aGlzLm1pblJvd0NvdW50KSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgaGFzRXJyb3JJblJvd3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMubWluUm93Q291bnQgPD0gMCB8fCAhdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciByZXMgPSBmYWxzZTtcclxuICAgICAgICB2YXIgc2V0Um93Q291bnQgPSAwO1xyXG4gICAgICAgIGZvciAodmFyIHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzLmxlbmd0aDsgcm93SW5kZXgrKykge1xyXG4gICAgICAgICAgICB2YXIgcm93ID0gdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93c1tyb3dJbmRleF07XHJcbiAgICAgICAgICAgIGlmICghcm93LmlzRW1wdHkpIHNldFJvd0NvdW50Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXRSb3dDb3VudCA8IHRoaXMubWluUm93Q291bnQ7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2VuZXJhdGVSb3dzKCk6IEFycmF5PE1hdHJpeER5bmFtaWNSb3dNb2RlbD4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXk8TWF0cml4RHluYW1pY1Jvd01vZGVsPigpO1xyXG4gICAgICAgIGlmICh0aGlzLnJvd0NvdW50ID09PSAwKSByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLmNyZWF0ZU5ld1ZhbHVlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5yb3dDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuY3JlYXRlTWF0cml4Um93KHRoaXMuZ2V0Um93VmFsdWVCeUluZGV4KHZhbCwgaSkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVNYXRyaXhSb3codmFsdWU6IGFueSk6IE1hdHJpeER5bmFtaWNSb3dNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXhEeW5hbWljUm93TW9kZWwodGhpcy5yb3dDb3VudGVyICsrLCB0aGlzLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlTmV3VmFsdWUoY3VyVmFsdWU6IGFueSk6IGFueSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IGN1clZhbHVlO1xyXG4gICAgICAgIGlmICghcmVzdWx0KSByZXN1bHQgPSBbXTtcclxuICAgICAgICB2YXIgciA9IFtdO1xyXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gdGhpcy5yb3dDb3VudCkgcmVzdWx0LnNwbGljZSh0aGlzLnJvd0NvdW50IC0gMSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IHJlc3VsdC5sZW5ndGg7IGkgPCB0aGlzLnJvd0NvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goe30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGRlbGV0ZVJvd1ZhbHVlKG5ld1ZhbHVlOiBhbnksIHJvdzogTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UpOiBhbnkge1xyXG4gICAgICAgIHZhciBpc0VtcHR5ID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ld1ZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhuZXdWYWx1ZVtpXSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzRW1wdHkgPyBudWxsIDogbmV3VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSb3dWYWx1ZUJ5SW5kZXgocXVlc3Rpb25WYWx1ZTogYW55LCBpbmRleDogbnVtYmVyKTogYW55IHtcclxuICAgICAgICByZXR1cm4gaW5kZXggPj0gMCAmJiBpbmRleCA8IHF1ZXN0aW9uVmFsdWUubGVuZ3RoID8gcXVlc3Rpb25WYWx1ZVtpbmRleF0gOiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldFJvd1ZhbHVlKHJvdzogTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UsIHF1ZXN0aW9uVmFsdWU6IGFueSwgY3JlYXRlOiBib29sZWFuID0gZmFsc2UpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFJvd1ZhbHVlQnlJbmRleChxdWVzdGlvblZhbHVlLCB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzLmluZGV4T2Yocm93KSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJtYXRyaXhkeW5hbWljXCIsIFt7IG5hbWU6IFwicm93Q291bnQ6bnVtYmVyXCIsIGRlZmF1bHQ6IDIgfSwgeyBuYW1lOiBcIm1pblJvd0NvdW50Om51bWJlclwiLCBkZWZhdWx0OiAwIH0sXHJcbiAgICAgICAgeyBuYW1lOiBcImFkZFJvd1RleHRcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmouYWRkUm93VGV4dFZhbHVlOyB9IH0sXHJcbiAgICAgICAgeyBuYW1lOiBcInJlbW92ZVJvd1RleHRcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmoucmVtb3ZlUm93VGV4dFZhbHVlOyB9IH1dLFxyXG4gICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uTWF0cml4RHluYW1pY01vZGVsKFwiXCIpOyB9LCBcIm1hdHJpeGRyb3Bkb3duYmFzZVwiKTtcclxuXHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwibWF0cml4ZHluYW1pY1wiLCAobmFtZSkgPT4geyB2YXIgcSA9IG5ldyBRdWVzdGlvbk1hdHJpeER5bmFtaWNNb2RlbChuYW1lKTsgcS5jaG9pY2VzID0gWzEsIDIsIDMsIDQsIDVdOyBxLmFkZENvbHVtbihcIkNvbHVtbiAxXCIpOyBxLmFkZENvbHVtbihcIkNvbHVtbiAyXCIpOyBxLmFkZENvbHVtbihcIkNvbHVtbiAzXCIpOyByZXR1cm4gcTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fbWF0cml4ZHluYW1pYy50c1xuICoqLyIsImltcG9ydCB7QmFzZSwgSXRlbVZhbHVlfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1N1cnZleUVycm9yfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tICcuL3N1cnZleVN0cmluZ3MnO1xyXG5pbXBvcnQge0N1c3RvbUVycm9yfSBmcm9tIFwiLi9lcnJvclwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNYXRyaXhEYXRhIHtcclxuICAgIG9uTWF0cml4Um93Q2hhbmdlZChyb3c6IE1hdHJpeFJvd01vZGVsKTtcclxufVxyXG5leHBvcnQgY2xhc3MgTWF0cml4Um93TW9kZWwgZXh0ZW5kcyBCYXNlIHtcclxuICAgIHByaXZhdGUgZGF0YTogSU1hdHJpeERhdGE7XHJcbiAgICBwcm90ZWN0ZWQgcm93VmFsdWU6IGFueTsgXHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IGFueSwgcHVibGljIHRleHQ6IHN0cmluZywgcHVibGljIGZ1bGxOYW1lOiBzdHJpbmcsIGRhdGE6IElNYXRyaXhEYXRhLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMucm93VmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLnJvd1ZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnJvd1ZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YSkgdGhpcy5kYXRhLm9uTWF0cml4Um93Q2hhbmdlZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VkKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25WYWx1ZUNoYW5nZWQoKSB7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTWF0cml4TW9kZWwgZXh0ZW5kcyBRdWVzdGlvbiBpbXBsZW1lbnRzIElNYXRyaXhEYXRhIHtcclxuICAgIHByaXZhdGUgY29sdW1uc1ZhbHVlOiBJdGVtVmFsdWVbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSByb3dzVmFsdWU6IEl0ZW1WYWx1ZVtdID0gW107XHJcbiAgICBwcml2YXRlIGlzUm93Q2hhbmdpbmcgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgZ2VuZXJhdGVkVmlzaWJsZVJvd3M6IEFycmF5PE1hdHJpeFJvd01vZGVsPjtcclxuICAgIHB1YmxpYyBpc0FsbFJvd1JlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIm1hdHJpeFwiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBoYXNSb3dzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvd3NWYWx1ZS5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG4gICAgZ2V0IGNvbHVtbnMoKTogQXJyYXk8YW55PiB7IHJldHVybiB0aGlzLmNvbHVtbnNWYWx1ZTsgfVxyXG4gICAgc2V0IGNvbHVtbnMobmV3VmFsdWU6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBJdGVtVmFsdWUuc2V0RGF0YSh0aGlzLmNvbHVtbnNWYWx1ZSwgbmV3VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHJvd3MoKTogQXJyYXk8YW55PiB7IHJldHVybiB0aGlzLnJvd3NWYWx1ZTsgfVxyXG4gICAgc2V0IHJvd3MobmV3VmFsdWU6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBJdGVtVmFsdWUuc2V0RGF0YSh0aGlzLnJvd3NWYWx1ZSwgbmV3VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCB2aXNpYmxlUm93cygpOiBBcnJheTxNYXRyaXhSb3dNb2RlbD4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXk8TWF0cml4Um93TW9kZWw+KCk7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgaWYgKCF2YWwpIHZhbCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5yb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5yb3dzW2ldLnZhbHVlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5jcmVhdGVNYXRyaXhSb3codGhpcy5yb3dzW2ldLnZhbHVlLCB0aGlzLnJvd3NbaV0udGV4dCwgdGhpcy5uYW1lICsgJ18nICsgdGhpcy5yb3dzW2ldLnZhbHVlLnRvU3RyaW5nKCksIHZhbFt0aGlzLnJvd3NbaV0udmFsdWVdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5jcmVhdGVNYXRyaXhSb3cobnVsbCwgXCJcIiwgdGhpcy5uYW1lLCB2YWwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cyA9IHJlc3VsdDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uQ2hlY2tGb3JFcnJvcnMoZXJyb3JzOiBBcnJheTxTdXJ2ZXlFcnJvcj4pIHtcclxuICAgICAgICBzdXBlci5vbkNoZWNrRm9yRXJyb3JzKGVycm9ycyk7XHJcbiAgICAgICAgaWYgKHRoaXMuaGFzRXJyb3JJblJvd3MoKSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9ycy5wdXNoKG5ldyBDdXN0b21FcnJvcihzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwicmVxdWlyZWRJbkFsbFJvd3NFcnJvclwiKSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgaGFzRXJyb3JJblJvd3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzQWxsUm93UmVxdWlyZWQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgcm93cyA9IHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3M7XHJcbiAgICAgICAgaWYgKCFyb3dzKSByb3dzID0gdGhpcy52aXNpYmxlUm93cztcclxuICAgICAgICBpZiAoIXJvd3MpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHZhbCA9IHJvd3NbaV0udmFsdWU7XHJcbiAgICAgICAgICAgIGlmICghdmFsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG5cclxuICAgIHByb3RlY3RlZCBjcmVhdGVNYXRyaXhSb3cobmFtZTogYW55LCB0ZXh0OiBzdHJpbmcsIGZ1bGxOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBNYXRyaXhSb3dNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXhSb3dNb2RlbChuYW1lLCB0ZXh0LCBmdWxsTmFtZSwgdGhpcywgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uVmFsdWVDaGFuZ2VkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUm93Q2hhbmdpbmcgfHwgISh0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzKSB8fCB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc1Jvd0NoYW5naW5nID0gdHJ1ZTtcclxuICAgICAgICB2YXIgdmFsID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBpZiAoIXZhbCkgdmFsID0ge307XHJcbiAgICAgICAgaWYgKHRoaXMucm93cy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzWzBdLnZhbHVlID0gdmFsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3NbaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93VmFsID0gdmFsW3Jvdy5uYW1lXSA/IHZhbFtyb3cubmFtZV0gOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93c1tpXS52YWx1ZSA9IHJvd1ZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzUm93Q2hhbmdpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vSU1hdHJpeERhdGFcclxuICAgIG9uTWF0cml4Um93Q2hhbmdlZChyb3c6IE1hdHJpeFJvd01vZGVsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSb3dDaGFuZ2luZykgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNSb3dDaGFuZ2luZyA9IHRydWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc1Jvd3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXROZXdWYWx1ZShyb3cudmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdWYWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgICAgIGlmICghbmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3VmFsdWVbcm93Lm5hbWVdID0gcm93LnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldE5ld1ZhbHVlKG5ld1ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc1Jvd0NoYW5naW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJtYXRyaXhcIiwgW3sgbmFtZTogXCJjb2x1bW5zOml0ZW12YWx1ZXNcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBJdGVtVmFsdWUuZ2V0RGF0YShvYmouY29sdW1ucyk7IH0sIG9uU2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSwgdmFsdWU6IGFueSkgeyBvYmouY29sdW1ucyA9IHZhbHVlOyB9fSxcclxuICAgICAgICB7IG5hbWU6IFwicm93czppdGVtdmFsdWVzXCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gSXRlbVZhbHVlLmdldERhdGEob2JqLnJvd3MpOyB9LCBvblNldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnksIHZhbHVlOiBhbnkpIHsgb2JqLnJvd3MgPSB2YWx1ZTsgfSB9XSxcclxuICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbk1hdHJpeE1vZGVsKFwiXCIpOyB9LCBcInF1ZXN0aW9uXCIpO1xyXG5cclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJtYXRyaXhcIiwgKG5hbWUpID0+IHsgdmFyIHEgPSBuZXcgUXVlc3Rpb25NYXRyaXhNb2RlbChuYW1lKTsgcS5yb3dzID0gW1wiUm93IDFcIiwgXCJSb3cgMlwiXTsgcS5jb2x1bW5zID0gW1wiQ29sdW1uIDFcIiwgXCJDb2x1bW4gMlwiLCBcIkNvbHVtbiAzXCJdOyByZXR1cm4gcTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fbWF0cml4LnRzXG4gKiovIiwiaW1wb3J0IHtCYXNlfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7U3VydmV5VmFsaWRhdG9yLCBJVmFsaWRhdG9yT3duZXIsIFZhbGlkYXRvclJ1bm5lcn0gZnJvbSBcIi4vdmFsaWRhdG9yXCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcbmltcG9ydCB7U3VydmV5RXJyb3J9IGZyb20gXCIuL2Jhc2VcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU11bHRpcGxlVGV4dERhdGEge1xyXG4gICAgZ2V0TXVsdGlwbGVUZXh0VmFsdWUobmFtZTogc3RyaW5nKTogYW55O1xyXG4gICAgc2V0TXVsdGlwbGVUZXh0VmFsdWUobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE11bHRpcGxlVGV4dEl0ZW1Nb2RlbCBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBJVmFsaWRhdG9yT3duZXIge1xyXG4gICAgcHJpdmF0ZSBkYXRhOiBJTXVsdGlwbGVUZXh0RGF0YTtcclxuICAgIHByaXZhdGUgdGl0bGVWYWx1ZTogc3RyaW5nO1xyXG4gICAgdmFsaWRhdG9yczogQXJyYXk8U3VydmV5VmFsaWRhdG9yPiA9IG5ldyBBcnJheTxTdXJ2ZXlWYWxpZGF0b3I+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IGFueSA9IG51bGwsIHRpdGxlOiBzdHJpbmcgPSBudWxsKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIm11bHRpcGxldGV4dGl0ZW1cIjtcclxuICAgIH1cclxuICAgIHNldERhdGEoZGF0YTogSU11bHRpcGxlVGV4dERhdGEpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCB0aXRsZSgpIHsgcmV0dXJuIHRoaXMudGl0bGVWYWx1ZSA/IHRoaXMudGl0bGVWYWx1ZSA6IHRoaXMubmFtZTsgfVxyXG4gICAgcHVibGljIHNldCB0aXRsZShuZXdUZXh0OiBzdHJpbmcpIHsgdGhpcy50aXRsZVZhbHVlID0gbmV3VGV4dDsgfVxyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhID8gdGhpcy5kYXRhLmdldE11bHRpcGxlVGV4dFZhbHVlKHRoaXMubmFtZSkgOiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZXRNdWx0aXBsZVRleHRWYWx1ZSh0aGlzLm5hbWUsIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblZhbHVlQ2hhbmdlZChuZXdWYWx1ZTogYW55KSB7XHJcbiAgICB9XHJcbiAgICAvL0lWYWxpZGF0b3JPd25lclxyXG4gICAgZ2V0VmFsaWRhdG9yVGl0bGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudGl0bGU7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTXVsdGlwbGVUZXh0TW9kZWwgZXh0ZW5kcyBRdWVzdGlvbiBpbXBsZW1lbnRzIElNdWx0aXBsZVRleHREYXRhIHtcclxuICAgIHByaXZhdGUgY29sQ291bnRWYWx1ZTogbnVtYmVyID0gMTtcclxuICAgIGNvbENvdW50Q2hhbmdlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgcHVibGljIGl0ZW1TaXplOiBudW1iZXIgPSAyNTtcclxuICAgIHByaXZhdGUgaXRlbXNWYWx1ZXM6IEFycmF5PE11bHRpcGxlVGV4dEl0ZW1Nb2RlbD4gPSBuZXcgQXJyYXk8TXVsdGlwbGVUZXh0SXRlbU1vZGVsPigpO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLml0ZW1zLnB1c2ggPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdmFsdWUuc2V0RGF0YShzZWxmKTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IEFycmF5LnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgICAgICAgICBzZWxmLmZpcmVDYWxsYmFjayhzZWxmLmNvbENvdW50Q2hhbmdlZENhbGxiYWNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJtdWx0aXBsZXRleHRcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXRlbXMoKTogQXJyYXk8TXVsdGlwbGVUZXh0SXRlbU1vZGVsPiB7IHJldHVybiB0aGlzLml0ZW1zVmFsdWVzOyB9XHJcbiAgICBwdWJsaWMgc2V0IGl0ZW1zKHZhbHVlOiBBcnJheTxNdWx0aXBsZVRleHRJdGVtTW9kZWw+KSB7XHJcbiAgICAgICAgdGhpcy5pdGVtc1ZhbHVlcyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMuY29sQ291bnRDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHVibGljIEFkZEl0ZW0obmFtZTogc3RyaW5nLCB0aXRsZTogc3RyaW5nID0gbnVsbCk6IE11bHRpcGxlVGV4dEl0ZW1Nb2RlbCB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmNyZWF0ZVRleHRJdGVtKG5hbWUsIHRpdGxlKTtcclxuICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbENvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNvbENvdW50VmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgY29sQ291bnQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8IDEgfHwgdmFsdWUgPiA0KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jb2xDb3VudFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy5jb2xDb3VudENoYW5nZWRDYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Um93cygpOiBBcnJheTxhbnk+IHtcclxuICAgICAgICB2YXIgY29sQ291bnQgPSB0aGlzLmNvbENvdW50O1xyXG4gICAgICAgIHZhciBpdGVtcyA9IHRoaXMuaXRlbXM7XHJcbiAgICAgICAgdmFyIHJvd3MgPSBbXTtcclxuICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID09IDApIHtcclxuICAgICAgICAgICAgICAgIHJvd3MucHVzaChbXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcm93c1tyb3dzLmxlbmd0aCAtIDFdLnB1c2goaXRlbXNbaV0pO1xyXG4gICAgICAgICAgICBpbmRleCsrO1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPj0gY29sQ291bnQpIHtcclxuICAgICAgICAgICAgICAgIGluZGV4ID0gMDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcm93cztcclxuICAgIH1cclxuICAgIHByaXZhdGUgaXNNdWx0aXBsZUl0ZW1WYWx1ZUNoYW5naW5nID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgb25WYWx1ZUNoYW5nZWQoKSB7XHJcbiAgICAgICAgc3VwZXIub25WYWx1ZUNoYW5nZWQoKTtcclxuICAgICAgICB0aGlzLm9uSXRlbVZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVRleHRJdGVtKG5hbWU6IHN0cmluZywgdGl0bGU6IHN0cmluZyk6IE11bHRpcGxlVGV4dEl0ZW1Nb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNdWx0aXBsZVRleHRJdGVtTW9kZWwobmFtZSwgdGl0bGUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uSXRlbVZhbHVlQ2hhbmdlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc011bHRpcGxlSXRlbVZhbHVlQ2hhbmdpbmcpIHJldHVybjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW1WYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnZhbHVlICYmICh0aGlzLml0ZW1zW2ldLm5hbWUgaW4gdGhpcy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgICAgIGl0ZW1WYWx1ZSA9IHRoaXMudmFsdWVbdGhpcy5pdGVtc1tpXS5uYW1lXTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLml0ZW1zW2ldLm9uVmFsdWVDaGFuZ2VkKGl0ZW1WYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJ1blZhbGlkYXRvcnMoKTogU3VydmV5RXJyb3Ige1xyXG4gICAgICAgIHZhciBlcnJvciA9IHN1cGVyLnJ1blZhbGlkYXRvcnMoKTtcclxuICAgICAgICBpZiAoZXJyb3IgIT0gbnVsbCkgcmV0dXJuIGVycm9yO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBlcnJvciA9IG5ldyBWYWxpZGF0b3JSdW5uZXIoKS5ydW4odGhpcy5pdGVtc1tpXSk7XHJcbiAgICAgICAgICAgIGlmIChlcnJvciAhPSBudWxsKSByZXR1cm4gZXJyb3I7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgLy9JTXVsdGlwbGVUZXh0RGF0YVxyXG4gICAgZ2V0TXVsdGlwbGVUZXh0VmFsdWUobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZhbHVlKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVtuYW1lXTtcclxuICAgIH1cclxuICAgIHNldE11bHRpcGxlVGV4dFZhbHVlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaXNNdWx0aXBsZUl0ZW1WYWx1ZUNoYW5naW5nID0gdHJ1ZTtcclxuICAgICAgICB2YXIgbmV3VmFsdWUgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIGlmICghbmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgbmV3VmFsdWUgPSB7fTtcclxuICAgICAgICB9XHJcbiAgICAgICAgbmV3VmFsdWVbbmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnNldE5ld1ZhbHVlKG5ld1ZhbHVlKTtcclxuICAgICAgICB0aGlzLmlzTXVsdGlwbGVJdGVtVmFsdWVDaGFuZ2luZyA9IGZhbHNlO1xyXG4gICAgfVxyXG59XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwibXVsdGlwbGV0ZXh0aXRlbVwiLCBbXCJuYW1lXCIsIHsgbmFtZTogXCJ0aXRsZVwiLCBvbkdldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnkpIHsgcmV0dXJuIG9iai50aXRsZVZhbHVlOyB9IH0sXHJcbiAgICB7IG5hbWU6IFwidmFsaWRhdG9yczp2YWxpZGF0b3JzXCIsIGJhc2VDbGFzc05hbWU6IFwic3VydmV5dmFsaWRhdG9yXCIsIGNsYXNzTmFtZVBhcnQ6IFwidmFsaWRhdG9yXCIgfV0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBNdWx0aXBsZVRleHRJdGVtTW9kZWwoXCJcIik7IH0pO1xyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcIm11bHRpcGxldGV4dFwiLCBbeyBuYW1lOiBcIiFpdGVtczp0ZXh0aXRlbXNcIiwgY2xhc3NOYW1lOiBcIm11bHRpcGxldGV4dGl0ZW1cIiB9LFxyXG4gICAgICAgIHsgbmFtZTogXCJpdGVtU2l6ZTpudW1iZXJcIiwgZGVmYXVsdDogMjUgfSwgeyBuYW1lOiBcImNvbENvdW50Om51bWJlclwiLCBkZWZhdWx0OiAxLCBjaG9pY2VzOiBbMSwgMiwgMywgNF0gfV0sXHJcbiAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUXVlc3Rpb25NdWx0aXBsZVRleHRNb2RlbChcIlwiKTsgfSwgXCJxdWVzdGlvblwiKTtcclxuXHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwibXVsdGlwbGV0ZXh0XCIsIChuYW1lKSA9PiB7IHZhciBxID0gbmV3IFF1ZXN0aW9uTXVsdGlwbGVUZXh0TW9kZWwobmFtZSk7IHEuQWRkSXRlbShcInRleHQxXCIpOyBxLkFkZEl0ZW0oXCJ0ZXh0MlwiKTsgcmV0dXJuIHE7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3F1ZXN0aW9uX211bHRpcGxldGV4dC50c1xuICoqLyIsImltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge0Jhc2UsIElQYWdlLCBJQ29uZGl0aW9uUnVubmVyLCBJU3VydmV5LCBJUXVlc3Rpb24sIEhhc2hUYWJsZX0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uQmFzZX0gZnJvbSBcIi4vcXVlc3Rpb25iYXNlXCI7XHJcbmltcG9ydCB7Q29uZGl0aW9uUnVubmVyfSBmcm9tIFwiLi9jb25kaXRpb25zXCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblJvd01vZGVsIHtcclxuICAgIHByaXZhdGUgdmlzaWJsZVZhbHVlOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICB2aXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHBhZ2U6IFBhZ2VNb2RlbCwgcHVibGljIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbi5yb3dWaXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLm9uUm93VmlzaWJpbGl0eUNoYW5nZWQoKTsgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHF1ZXN0aW9uczogQXJyYXk8UXVlc3Rpb25CYXNlPiA9IFtdO1xyXG4gICAgcHVibGljIGdldCB2aXNpYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy52aXNpYmxlVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgdmlzaWJsZSh2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodmFsID09IHRoaXMudmlzaWJsZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZVZhbHVlID0gdmFsO1xyXG4gICAgICAgIHRoaXMub25WaXNpYmxlQ2hhbmdlZCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHVwZGF0ZVZpc2libGUoKSB7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdGhpcy5jYWxjVmlzaWJsZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0V2lkdGgoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGRRdWVzdGlvbihxOiBRdWVzdGlvbkJhc2UpIHtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9ucy5wdXNoKHEpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmlzaWJsZSgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uVmlzaWJsZUNoYW5nZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjaykgdGhpcy52aXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0V2lkdGgoKSB7XHJcbiAgICAgICAgdmFyIHZpc0NvdW50ID0gdGhpcy5nZXRWaXNpYmxlQ291bnQoKTtcclxuICAgICAgICBpZiAodmlzQ291bnQgPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBjb3VudGVyID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aDsgaSsrKVxyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1F1ZXN0aW9uVmlzaWJsZSh0aGlzLnF1ZXN0aW9uc1tpXSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucXVlc3Rpb25zW2ldLnJlbmRlcldpZHRoID0gdGhpcy5xdWVzdGlvbi53aWR0aCA/IHRoaXMucXVlc3Rpb24ud2lkdGggOiBNYXRoLmZsb29yKDEwMCAvIHZpc0NvdW50KSArICclJztcclxuICAgICAgICAgICAgICAgIHRoaXMucXVlc3Rpb25zW2ldLnJpZ2h0SW5kZW50ID0gY291bnRlciA8IHZpc0NvdW50IC0gMSA/IDEgOiAwO1xyXG4gICAgICAgICAgICAgICAgY291bnRlcisrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uUm93VmlzaWJpbGl0eUNoYW5nZWQoKSB7XHJcbiAgICAgICAgdGhpcy5wYWdlLm9uUm93VmlzaWJpbGl0eUNoYW5nZWQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldFZpc2libGVDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHZhciByZXMgPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNRdWVzdGlvblZpc2libGUodGhpcy5xdWVzdGlvbnNbaV0pKSByZXMrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuICAgIHByaXZhdGUgaXNRdWVzdGlvblZpc2libGUocTogUXVlc3Rpb25CYXNlKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhZ2UuaXNRdWVzdGlvblZpc2libGUocSk7IH1cclxuICAgIHByaXZhdGUgY2FsY1Zpc2libGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmdldFZpc2libGVDb3VudCgpID4gMDsgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUGFnZU1vZGVsIGV4dGVuZHMgQmFzZSBpbXBsZW1lbnRzIElQYWdlLCBJQ29uZGl0aW9uUnVubmVyIHtcclxuICAgIHByaXZhdGUgcm93VmFsdWVzOiBBcnJheTxRdWVzdGlvblJvd01vZGVsPiA9IG51bGw7XHJcbiAgICBwcml2YXRlIGNvbmRpdGlvblJ1bm5lcjogQ29uZGl0aW9uUnVubmVyID0gbnVsbDtcclxuICAgIHF1ZXN0aW9uczogQXJyYXk8UXVlc3Rpb25CYXNlPiA9IG5ldyBBcnJheTxRdWVzdGlvbkJhc2U+KCk7XHJcbiAgICBwdWJsaWMgZGF0YTogSVN1cnZleSA9IG51bGw7XHJcbiAgICBwdWJsaWMgdmlzaWJsZUlmOiBzdHJpbmcgPSBcIlwiO1xyXG5cclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyB2aXNpYmxlSW5kZXg6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSBudW1WYWx1ZTogbnVtYmVyID0gLTE7XHJcbiAgICBwcml2YXRlIHZpc2libGVWYWx1ZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25zLnB1c2ggPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICB2YWx1ZS5zZXREYXRhKHNlbGYuZGF0YSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHJvd3MoKTogQXJyYXk8UXVlc3Rpb25Sb3dNb2RlbD4ge1xyXG4gICAgICAgIHRoaXMucm93VmFsdWVzID0gdGhpcy5idWlsZFJvd3MoKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3dWYWx1ZXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzQWN0aXZlKCkgeyByZXR1cm4gKCF0aGlzLmRhdGEpIHx8IHRoaXMuZGF0YS5jdXJyZW50UGFnZSA9PSB0aGlzOyB9XHJcbiAgICBwdWJsaWMgaXNRdWVzdGlvblZpc2libGUocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSk6IGJvb2xlYW4geyByZXR1cm4gcXVlc3Rpb24udmlzaWJsZSB8fCB0aGlzLmlzRGVzaWduTW9kZTsgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVJvdyhxdWVzdGlvbjogUXVlc3Rpb25CYXNlKTogUXVlc3Rpb25Sb3dNb2RlbCB7IHJldHVybiBuZXcgUXVlc3Rpb25Sb3dNb2RlbCh0aGlzLCBxdWVzdGlvbik7IH1cclxuICAgIHByaXZhdGUgZ2V0IGlzRGVzaWduTW9kZSgpIHsgcmV0dXJuIHRoaXMuZGF0YSAmJiB0aGlzLmRhdGEuaXNEZXNpZ25Nb2RlOyB9XHJcbiAgICBwcml2YXRlIGJ1aWxkUm93cygpOiBBcnJheTxRdWVzdGlvblJvd01vZGVsPiB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheTxRdWVzdGlvblJvd01vZGVsPigpO1xyXG4gICAgICAgIHZhciBsYXN0Um93VmlzaWJsZUluZGV4ID0gLTE7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHEgPSB0aGlzLnF1ZXN0aW9uc1tpXTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5jcmVhdGVSb3cocSkpO1xyXG4gICAgICAgICAgICBpZiAocS5zdGFydFdpdGhOZXdMaW5lKSB7XHJcbiAgICAgICAgICAgICAgICBsYXN0Um93VmlzaWJsZUluZGV4ID0gaTtcclxuICAgICAgICAgICAgICAgIHJlc3VsdFtpXS5hZGRRdWVzdGlvbihxKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmIChsYXN0Um93VmlzaWJsZUluZGV4IDwgMCkgbGFzdFJvd1Zpc2libGVJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbbGFzdFJvd1Zpc2libGVJbmRleF0uYWRkUXVlc3Rpb24ocSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXN1bHQubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0W2ldLnNldFdpZHRoKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBvblJvd1Zpc2liaWxpdHlDaGFuZ2VkKHJvdzogUXVlc3Rpb25Sb3dNb2RlbCkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0FjdGl2ZSB8fCAhdGhpcy5yb3dWYWx1ZXMpIHJldHVybjtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnJvd1ZhbHVlcy5pbmRleE9mKHJvdyk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGluZGV4OyBpID49IDA7IGktLSkge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5yb3dWYWx1ZXNbaV0ucXVlc3Rpb25zLmluZGV4T2Yocm93LnF1ZXN0aW9uKSA+IC0xKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnJvd1ZhbHVlc1tpXS51cGRhdGVWaXNpYmxlKCk7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcHJvY2Vzc2VkVGl0bGUoKSB7IHJldHVybiB0aGlzLmRhdGEgIT0gbnVsbCA/IHRoaXMuZGF0YS5wcm9jZXNzVGV4dCh0aGlzLnRpdGxlKSA6IHRoaXMudGl0bGU7IH1cclxuICAgIHB1YmxpYyBnZXQgbnVtKCkgeyByZXR1cm4gdGhpcy5udW1WYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBudW0odmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh0aGlzLm51bVZhbHVlID09IHZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5udW1WYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMub25OdW1DaGFuZ2VkKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMudmlzaWJsZVZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHZpc2libGUodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IHRoaXMudmlzaWJsZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZVZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5wYWdlVmlzaWJpbGl0eUNoYW5nZWQodGhpcywgdGhpcy52aXNpYmxlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJwYWdlXCI7IH1cclxuICAgIHB1YmxpYyBnZXQgaXNWaXNpYmxlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy52aXNpYmxlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5xdWVzdGlvbnNbaV0udmlzaWJsZSkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxuXHJcbiAgICBwdWJsaWMgYWRkUXVlc3Rpb24ocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSwgaW5kZXg6IG51bWJlciA9IC0xKSB7XHJcbiAgICAgICAgaWYgKHF1ZXN0aW9uID09IG51bGwpIHJldHVybjtcclxuICAgICAgICBpZiAoaW5kZXggPCAwIHx8IGluZGV4ID49IHRoaXMucXVlc3Rpb25zLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9ucy5wdXNoKHF1ZXN0aW9uKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9ucy5zcGxpY2UoaW5kZXgsIDAsIHF1ZXN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uLnNldERhdGEodGhpcy5kYXRhKTtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnF1ZXN0aW9uQWRkZWQocXVlc3Rpb24sIGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkTmV3UXVlc3Rpb24ocXVlc3Rpb25UeXBlOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IFF1ZXN0aW9uQmFzZSB7XHJcbiAgICAgICAgdmFyIHF1ZXN0aW9uID0gUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLmNyZWF0ZVF1ZXN0aW9uKHF1ZXN0aW9uVHlwZSwgbmFtZSk7XHJcbiAgICAgICAgdGhpcy5hZGRRdWVzdGlvbihxdWVzdGlvbik7XHJcbiAgICAgICAgcmV0dXJuIHF1ZXN0aW9uO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZVF1ZXN0aW9uKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnF1ZXN0aW9ucy5pbmRleE9mKHF1ZXN0aW9uKTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbnMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBpZiAodGhpcy5kYXRhICE9IG51bGwpIHRoaXMuZGF0YS5xdWVzdGlvblJlbW92ZWQocXVlc3Rpb24pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNjcm9sbFRvRmlyc3RRdWVzdGlvbigpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnF1ZXN0aW9uc1tpXS52aXNpYmxlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXN0aW9uc1tpXS5mb2N1cygpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgaGFzRXJyb3JzKGZpcmVDYWxsYmFjazogYm9vbGVhbiA9IHRydWUsIGZvY3VzZU9uRmlyc3RFcnJvcjogYm9vbGVhbiA9IGZhbHNlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBmaXJzdEVycm9yUXVlc3Rpb24gPSBudWxsO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucXVlc3Rpb25zW2ldLnZpc2libGUgJiYgdGhpcy5xdWVzdGlvbnNbaV0uaGFzRXJyb3JzKGZpcmVDYWxsYmFjaykpIHtcclxuICAgICAgICAgICAgICAgIGlmIChmb2N1c2VPbkZpcnN0RXJyb3IgJiYgZmlyc3RFcnJvclF1ZXN0aW9uID09IG51bGwpIHtcclxuICAgICAgICAgICAgICAgICAgICBmaXJzdEVycm9yUXVlc3Rpb24gPSB0aGlzLnF1ZXN0aW9uc1tpXTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGZpcnN0RXJyb3JRdWVzdGlvbikgZmlyc3RFcnJvclF1ZXN0aW9uLmZvY3VzKCk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGRRdWVzdGlvbnNUb0xpc3QobGlzdDogQXJyYXk8SVF1ZXN0aW9uPiwgdmlzaWJsZU9ubHk6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGlmICh2aXNpYmxlT25seSAmJiAhdGhpcy52aXNpYmxlKSByZXR1cm47XHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh2aXNpYmxlT25seSAmJiAhdGhpcy5xdWVzdGlvbnNbaV0udmlzaWJsZSkgY29udGludWU7XHJcbiAgICAgICAgICAgIGxpc3QucHVzaCh0aGlzLnF1ZXN0aW9uc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHJ1bkNvbmRpdGlvbih2YWx1ZXM6IEhhc2hUYWJsZTxhbnk+KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGVJZikgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5jb25kaXRpb25SdW5uZXIpIHRoaXMuY29uZGl0aW9uUnVubmVyID0gbmV3IENvbmRpdGlvblJ1bm5lcih0aGlzLnZpc2libGVJZik7XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25SdW5uZXIuZXhwcmVzc2lvbiA9IHRoaXMudmlzaWJsZUlmO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRoaXMuY29uZGl0aW9uUnVubmVyLnJ1bih2YWx1ZXMpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uTnVtQ2hhbmdlZCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICB9XHJcbn1cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcInBhZ2VcIiwgW1wibmFtZVwiLCB7IG5hbWU6IFwicXVlc3Rpb25zXCIsIGJhc2VDbGFzc05hbWU6IFwicXVlc3Rpb25cIiB9LCB7IG5hbWU6IFwidmlzaWJsZTpib29sZWFuXCIsIGRlZmF1bHQ6IHRydWUgfSwgXCJ2aXNpYmxlSWZcIiwgXCJ0aXRsZVwiXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBhZ2VNb2RlbCgpOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9wYWdlLnRzXG4gKiovIiwiaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkNoZWNrYm94QmFzZX0gZnJvbSBcIi4vcXVlc3Rpb25fYmFzZXNlbGVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ2hlY2tib3hNb2RlbCBleHRlbmRzIFF1ZXN0aW9uQ2hlY2tib3hCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXRIYXNPdGhlcih2YWw6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdmFsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIHZhbC5pbmRleE9mKHRoaXMub3RoZXJJdGVtLnZhbHVlKSA+PSAwO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHZhbHVlRnJvbURhdGFDb3JlKHZhbDogYW55KTogYW55IHtcclxuICAgICAgICBpZiAoIXZhbCB8fCAhdmFsLmxlbmd0aCkgcmV0dXJuIHZhbDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHZhbFtpXSA9PSB0aGlzLm90aGVySXRlbS52YWx1ZSkgcmV0dXJuIHZhbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVW5rbm93blZhbHVlKHZhbFtpXSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudCA9IHZhbFtpXTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdWYWwgPSB2YWwuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbFtpXSA9IHRoaXMub3RoZXJJdGVtLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHZhbHVlVG9EYXRhQ29yZSh2YWw6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKCF2YWwgfHwgIXZhbC5sZW5ndGgpIHJldHVybiB2YWw7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHZhbFtpXSA9PSB0aGlzLm90aGVySXRlbS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29tbWVudCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1ZhbCA9IHZhbC5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbFtpXSA9IHRoaXMuZ2V0Q29tbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdWYWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiY2hlY2tib3hcIjtcclxuICAgIH1cclxufVxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwiY2hlY2tib3hcIiwgW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbkNoZWNrYm94TW9kZWwoXCJcIik7IH0sIFwiY2hlY2tib3hiYXNlXCIpO1xyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcImNoZWNrYm94XCIsIChuYW1lKSA9PiB7IHZhciBxID0gbmV3IFF1ZXN0aW9uQ2hlY2tib3hNb2RlbChuYW1lKTsgcS5jaG9pY2VzID0gUXVlc3Rpb25GYWN0b3J5LkRlZmF1bHRDaG9pY2VzOyByZXR1cm4gcTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fY2hlY2tib3gudHNcbiAqKi8iLCJpbXBvcnQge1F1ZXN0aW9ufSBmcm9tIFwiLi9xdWVzdGlvblwiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ29tbWVudE1vZGVsIGV4dGVuZHMgUXVlc3Rpb24ge1xyXG4gICAgcHVibGljIHJvd3M6IG51bWJlciA9IDQ7XHJcbiAgICBwdWJsaWMgY29sczogbnVtYmVyID0gNTA7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcImNvbW1lbnRcIjtcclxuICAgIH1cclxuICAgIGlzRW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmlzRW1wdHkoKSB8fCB0aGlzLnZhbHVlID09IFwiXCI7XHJcbiAgICB9XHJcbn1cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcImNvbW1lbnRcIiwgW3sgbmFtZTogXCJjb2xzOm51bWJlclwiLCBkZWZhdWx0OiA1MCB9LCB7IG5hbWU6IFwicm93czpudW1iZXJcIiwgZGVmYXVsdDogNCB9XSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uQ29tbWVudE1vZGVsKFwiXCIpOyB9LCBcInF1ZXN0aW9uXCIpO1xyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcImNvbW1lbnRcIiwgKG5hbWUpID0+IHsgcmV0dXJuIG5ldyBRdWVzdGlvbkNvbW1lbnRNb2RlbChuYW1lKTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fY29tbWVudC50c1xuICoqLyIsImltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25TZWxlY3RCYXNlfSBmcm9tIFwiLi9xdWVzdGlvbl9iYXNlc2VsZWN0XCI7XHJcbmltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tIFwiLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Ecm9wZG93bk1vZGVsIGV4dGVuZHMgUXVlc3Rpb25TZWxlY3RCYXNlIHtcclxuICAgIHByaXZhdGUgb3B0aW9uc0NhcHRpb25WYWx1ZTogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBvcHRpb25zQ2FwdGlvbigpIHsgcmV0dXJuICh0aGlzLm9wdGlvbnNDYXB0aW9uVmFsdWUpID8gdGhpcy5vcHRpb25zQ2FwdGlvblZhbHVlIDogc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcIm9wdGlvbnNDYXB0aW9uXCIpOyB9XHJcbiAgICBwdWJsaWMgc2V0IG9wdGlvbnNDYXB0aW9uKG5ld1ZhbHVlOiBzdHJpbmcpIHsgdGhpcy5vcHRpb25zQ2FwdGlvblZhbHVlID0gbmV3VmFsdWU7IH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiZHJvcGRvd25cIjtcclxuICAgIH1cclxuICAgIHN1cHBvcnRHb05leHRQYWdlQXV0b21hdGljKCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG59XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJkcm9wZG93blwiLCBbeyBuYW1lOiBcIm9wdGlvbnNDYXB0aW9uXCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gb2JqLm9wdGlvbnNDYXB0aW9uVmFsdWU7IH19XSxcclxuICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbkRyb3Bkb3duTW9kZWwoXCJcIik7IH0sIFwic2VsZWN0YmFzZVwiKTtcclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJkcm9wZG93blwiLCAobmFtZSkgPT4geyB2YXIgcSA9IG5ldyBRdWVzdGlvbkRyb3Bkb3duTW9kZWwobmFtZSk7IHEuY2hvaWNlcyA9IFF1ZXN0aW9uRmFjdG9yeS5EZWZhdWx0Q2hvaWNlczsgcmV0dXJuIHE7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3F1ZXN0aW9uX2Ryb3Bkb3duLnRzXG4gKiovIiwiaW1wb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4vcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtTdXJ2ZXlFcnJvcn0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQge0N1c3RvbUVycm9yLCBFeGNlZWRTaXplRXJyb3J9IGZyb20gXCIuL2Vycm9yXCI7XHJcbmltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tIFwiLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25GaWxlTW9kZWwgZXh0ZW5kcyBRdWVzdGlvbiB7XHJcbiAgICBwcml2YXRlIHNob3dQcmV2aWV3VmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaXNVcGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByZXZpZXdWYWx1ZUxvYWRlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgcHVibGljIGltYWdlSGVpZ2h0OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgaW1hZ2VXaWR0aDogc3RyaW5nO1xyXG4gICAgcHVibGljIHN0b3JlRGF0YUFzVGV4dDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBtYXhTaXplOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcImZpbGVcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgc2hvd1ByZXZpZXcoKSB7IHJldHVybiB0aGlzLnNob3dQcmV2aWV3VmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgc2hvd1ByZXZpZXcodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5zaG93UHJldmlld1ZhbHVlID0gdmFsdWU7IH1cclxuICAgIHB1YmxpYyBsb2FkRmlsZShmaWxlOiBGaWxlKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLnN1cnZleSAmJiAhdGhpcy5zdXJ2ZXkudXBsb2FkRmlsZSh0aGlzLm5hbWUsIGZpbGUsIHRoaXMuc3RvcmVEYXRhQXNUZXh0LCBmdW5jdGlvbiAoc3RhdHVzOiBzdHJpbmcpIHsgc2VsZi5pc1VwbG9hZGluZyA9IHN0YXR1cyA9PSBcInVwbG9hZGluZ1wiOyAgfSkpIHJldHVybjtcclxuICAgICAgICB0aGlzLnNldEZpbGVWYWx1ZShmaWxlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBwcmV2aWV3VmFsdWU6IGFueTtcclxuICAgIHByb3RlY3RlZCBzZXRGaWxlVmFsdWUoZmlsZTogRmlsZSkge1xyXG4gICAgICAgIGlmICghRmlsZVJlYWRlcikgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5zaG93UHJldmlldyAmJiAhdGhpcy5zdG9yZURhdGFBc1RleHQpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5jaGVja0ZpbGVGb3JFcnJvcnMoZmlsZSkpIHJldHVybjtcclxuICAgICAgICB2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuc2hvd1ByZXZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYucHJldmlld1ZhbHVlID0gc2VsZi5pc0ZpbGVJbWFnZShmaWxlKSA/IGZpbGVSZWFkZXIucmVzdWx0IDogbnVsbDtcclxuICAgICAgICAgICAgICAgIHNlbGYuZmlyZUNhbGxiYWNrKHNlbGYucHJldmlld1ZhbHVlTG9hZGVkQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzZWxmLnN0b3JlRGF0YUFzVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi52YWx1ZSA9IGZpbGVSZWFkZXIucmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkNoZWNrRm9yRXJyb3JzKGVycm9yczogQXJyYXk8U3VydmV5RXJyb3I+KSB7XHJcbiAgICAgICAgc3VwZXIub25DaGVja0ZvckVycm9ycyhlcnJvcnMpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzVXBsb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzLnB1c2gobmV3IEN1c3RvbUVycm9yKHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJ1cGxvYWRpbmdGaWxlXCIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjaGVja0ZpbGVGb3JFcnJvcnMoZmlsZTogRmlsZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciBlcnJvckxlbmd0aCA9IHRoaXMuZXJyb3JzID8gdGhpcy5lcnJvcnMubGVuZ3RoIDogMDtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLm1heFNpemUgPiAwICYmIGZpbGUuc2l6ZSA+IHRoaXMubWF4U2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9ycy5wdXNoKG5ldyBFeGNlZWRTaXplRXJyb3IodGhpcy5tYXhTaXplKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlcnJvckxlbmd0aCAhPSB0aGlzLmVycm9ycy5sZW5ndGggfHwgdGhpcy5lcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmVycm9yc0NoYW5nZWRDYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmVycm9ycy5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc0ZpbGVJbWFnZShmaWxlOiBGaWxlKSB7XHJcbiAgICAgICAgaWYgKCFmaWxlIHx8ICFmaWxlLnR5cGUpIHJldHVybjtcclxuICAgICAgICB2YXIgc3RyID0gZmlsZS50eXBlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIHN0ci5pbmRleE9mKFwiaW1hZ2VcIikgPT0gMDtcclxuICAgIH1cclxufVxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwiZmlsZVwiLCBbXCJzaG93UHJldmlldzpib29sZWFuXCIsIFwiaW1hZ2VIZWlnaHRcIiwgXCJpbWFnZVdpZHRoXCIsIFwic3RvcmVEYXRhQXNUZXh0OmJvb2xlYW5cIiwgXCJtYXhTaXplOm51bWJlclwiXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uRmlsZU1vZGVsKFwiXCIpOyB9LCBcInF1ZXN0aW9uXCIpO1xyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcImZpbGVcIiwgKG5hbWUpID0+IHsgcmV0dXJuIG5ldyBRdWVzdGlvbkZpbGVNb2RlbChuYW1lKTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fZmlsZS50c1xuICoqLyIsImltcG9ydCB7UXVlc3Rpb25CYXNlfSBmcm9tIFwiLi9xdWVzdGlvbmJhc2VcIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkh0bWxNb2RlbCBleHRlbmRzIFF1ZXN0aW9uQmFzZSB7XHJcbiAgICBwcml2YXRlIGh0bWxWYWx1ZTogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJodG1sXCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGh0bWwoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuaHRtbFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGh0bWwodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaHRtbFZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHByb2Nlc3NlZEh0bWwoKSB7IHJldHVybiB0aGlzLnN1cnZleSA/IHRoaXMuc3VydmV5LnByb2Nlc3NIdG1sKHRoaXMuaHRtbCkgOiB0aGlzLmh0bWw7IH1cclxufVxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwiaHRtbFwiLCBbXCJodG1sOmh0bWxcIl0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbkh0bWxNb2RlbChcIlwiKTsgfSwgXCJxdWVzdGlvbmJhc2VcIik7XHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwiaHRtbFwiLCAobmFtZSkgPT4geyByZXR1cm4gbmV3IFF1ZXN0aW9uSHRtbE1vZGVsKG5hbWUpOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbl9odG1sLnRzXG4gKiovIiwiaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkNoZWNrYm94QmFzZX0gZnJvbSBcIi4vcXVlc3Rpb25fYmFzZXNlbGVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uUmFkaW9ncm91cE1vZGVsIGV4dGVuZHMgUXVlc3Rpb25DaGVja2JveEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJyYWRpb2dyb3VwXCI7XHJcbiAgICB9XHJcbiAgICBzdXBwb3J0R29OZXh0UGFnZUF1dG9tYXRpYygpIHsgcmV0dXJuIHRydWU7IH1cclxufVxyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcInJhZGlvZ3JvdXBcIiwgW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvblJhZGlvZ3JvdXBNb2RlbChcIlwiKTsgfSwgXCJjaGVja2JveGJhc2VcIik7XHJcblxyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcInJhZGlvZ3JvdXBcIiwgKG5hbWUpID0+IHsgdmFyIHEgPSBuZXcgUXVlc3Rpb25SYWRpb2dyb3VwTW9kZWwobmFtZSk7IHEuY2hvaWNlcyA9IFF1ZXN0aW9uRmFjdG9yeS5EZWZhdWx0Q2hvaWNlczsgcmV0dXJuIHE7fSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fcmFkaW9ncm91cC50c1xuICoqLyIsImltcG9ydCB7SXRlbVZhbHVlfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25SYXRpbmdNb2RlbCBleHRlbmRzIFF1ZXN0aW9uIHtcclxuICAgIHN0YXRpYyBkZWZhdWx0UmF0ZVZhbHVlczogSXRlbVZhbHVlW10gPSBbXTtcclxuICAgIHByaXZhdGUgcmF0ZXM6IEl0ZW1WYWx1ZVtdID0gW107XHJcbiAgICBwdWJsaWMgbWluaW51bVJhdGVEZXNjcmlwdGlvbjogc3RyaW5nID0gbnVsbDtcclxuICAgIHB1YmxpYyBtYXhpbXVtUmF0ZURlc2NyaXB0aW9uOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIHJhdGVWYWx1ZXNDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHJhdGVWYWx1ZXMoKTogQXJyYXk8YW55PiB7IHJldHVybiB0aGlzLnJhdGVzOyB9XHJcbiAgICBzZXQgcmF0ZVZhbHVlcyhuZXdWYWx1ZTogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIEl0ZW1WYWx1ZS5zZXREYXRhKHRoaXMucmF0ZXMsIG5ld1ZhbHVlKTtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLnJhdGVWYWx1ZXNDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgZ2V0IHZpc2libGVSYXRlVmFsdWVzKCk6IEl0ZW1WYWx1ZVtdIHtcclxuICAgICAgICBpZiAodGhpcy5yYXRlVmFsdWVzLmxlbmd0aCA+IDApIHJldHVybiB0aGlzLnJhdGVWYWx1ZXM7XHJcbiAgICAgICAgcmV0dXJuIFF1ZXN0aW9uUmF0aW5nTW9kZWwuZGVmYXVsdFJhdGVWYWx1ZXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcInJhdGluZ1wiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN1cHBvcnRDb21tZW50KCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgcHVibGljIHN1cHBvcnRPdGhlcigpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cclxuICAgIHN1cHBvcnRHb05leHRQYWdlQXV0b21hdGljKCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG59XHJcbkl0ZW1WYWx1ZS5zZXREYXRhKFF1ZXN0aW9uUmF0aW5nTW9kZWwuZGVmYXVsdFJhdGVWYWx1ZXMsIFsxLCAyLCAzLCA0LCA1XSk7XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJyYXRpbmdcIiwgW1wiaGFzQ29tbWVudDpib29sZWFuXCIsIHsgbmFtZTogXCJyYXRlVmFsdWVzOml0ZW12YWx1ZXNcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBJdGVtVmFsdWUuZ2V0RGF0YShvYmoucmF0ZVZhbHVlcyk7IH0sIG9uU2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSwgdmFsdWU6IGFueSkgeyBvYmoucmF0ZVZhbHVlcyA9IHZhbHVlOyB9fSxcclxuICAgIFwibWluaW51bVJhdGVEZXNjcmlwdGlvblwiLCBcIm1heGltdW1SYXRlRGVzY3JpcHRpb25cIl0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvblJhdGluZ01vZGVsKFwiXCIpOyB9LCBcInF1ZXN0aW9uXCIpO1xyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcInJhdGluZ1wiLCAobmFtZSkgPT4geyByZXR1cm4gbmV3IFF1ZXN0aW9uUmF0aW5nTW9kZWwobmFtZSk7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3F1ZXN0aW9uX3JhdGluZy50c1xuICoqLyIsImltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuL3F1ZXN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25UZXh0TW9kZWwgZXh0ZW5kcyBRdWVzdGlvbiB7XHJcbiAgICBwdWJsaWMgc2l6ZTogbnVtYmVyID0gMjU7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcInRleHRcIjtcclxuICAgIH1cclxuICAgIGlzRW1wdHkoKTogYm9vbGVhbiB7ICByZXR1cm4gc3VwZXIuaXNFbXB0eSgpIHx8IHRoaXMudmFsdWUgPT0gXCJcIjsgfVxyXG4gICAgc3VwcG9ydEdvTmV4dFBhZ2VBdXRvbWF0aWMoKSB7IHJldHVybiB0cnVlOyB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJ0ZXh0XCIsIFt7IG5hbWU6IFwic2l6ZTpudW1iZXJcIiwgZGVmYXVsdDogMjUgfV0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvblRleHRNb2RlbChcIlwiKTsgfSwgXCJxdWVzdGlvblwiKTtcclxuXHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwidGV4dFwiLCAobmFtZSkgPT4geyByZXR1cm4gbmV3IFF1ZXN0aW9uVGV4dE1vZGVsKG5hbWUpOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbl90ZXh0LnRzXG4gKiovIiwiaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7QmFzZSwgSVN1cnZleSwgSGFzaFRhYmxlLCBJUXVlc3Rpb24sIElDb25kaXRpb25SdW5uZXIsIElQYWdlLCBTdXJ2ZXlFcnJvciwgRXZlbnR9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtJU3VydmV5VHJpZ2dlck93bmVyLCBTdXJ2ZXlUcmlnZ2VyfSBmcm9tIFwiLi90cmlnZ2VyXCI7XHJcbmltcG9ydCB7UGFnZU1vZGVsfSBmcm9tIFwiLi9wYWdlXCI7XHJcbmltcG9ydCB7VGV4dFByZVByb2Nlc3Nvcn0gZnJvbSBcIi4vdGV4dFByZVByb2Nlc3NvclwiO1xyXG5pbXBvcnQge2R4U3VydmV5U2VydmljZX0gZnJvbSBcIi4vZHhTdXJ2ZXlTZXJ2aWNlXCI7XHJcbmltcG9ydCB7SnNvbkVycm9yfSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tIFwiLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcbmltcG9ydCB7UXVlc3Rpb25CYXNlfSBmcm9tIFwiLi9xdWVzdGlvbmJhc2VcIjtcclxuaW1wb3J0IHtDdXN0b21FcnJvcn0gZnJvbSBcIi4vZXJyb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlNb2RlbCBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBJU3VydmV5LCBJU3VydmV5VHJpZ2dlck93bmVyIHtcclxuICAgIHB1YmxpYyBzdXJ2ZXlJZDogc3RyaW5nID0gbnVsbDtcclxuICAgIHB1YmxpYyBzdXJ2ZXlQb3N0SWQ6IHN0cmluZyA9IG51bGw7XHJcbiAgICBwdWJsaWMgY2xpZW50SWQ6IHN0cmluZyA9IG51bGw7XHJcbiAgICBwdWJsaWMgY29va2llTmFtZTogc3RyaW5nID0gbnVsbDtcclxuICAgIHB1YmxpYyBzZW5kUmVzdWx0T25QYWdlTmV4dDogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBjb21tZW50UHJlZml4OiBzdHJpbmcgPSBcIi1Db21tZW50XCI7XHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgc2hvd05hdmlnYXRpb25CdXR0b25zOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBzaG93VGl0bGU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHNob3dQYWdlVGl0bGVzOiBib29sZWFuID0gdHJ1ZTtcclxuICAgIHB1YmxpYyBjb21wbGV0ZWRIdG1sOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIHJlcXVpcmVkVGV4dDogc3RyaW5nID0gXCIqXCI7XHJcbiAgICBwdWJsaWMgcXVlc3Rpb25TdGFydEluZGV4OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIHF1ZXN0aW9uVGl0bGVUZW1wbGF0ZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBzaG93UHJvZ3Jlc3NCYXI6IHN0cmluZyA9IFwib2ZmXCI7XHJcbiAgICBwdWJsaWMgc3RvcmVPdGhlcnNBc0NvbW1lbnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIGdvTmV4dFBhZ2VBdXRvbWF0aWM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBwYWdlczogQXJyYXk8UGFnZU1vZGVsPiA9IG5ldyBBcnJheTxQYWdlTW9kZWw+KCk7XHJcbiAgICBwdWJsaWMgdHJpZ2dlcnM6IEFycmF5PFN1cnZleVRyaWdnZXI+ID0gbmV3IEFycmF5PFN1cnZleVRyaWdnZXI+KCk7XHJcbiAgICBwdWJsaWMgY2xlYXJJbnZpc2libGVWYWx1ZXM6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgY3VycmVudFBhZ2VWYWx1ZTogUGFnZU1vZGVsID0gbnVsbDtcclxuICAgIHByaXZhdGUgdmFsdWVzSGFzaDogSGFzaFRhYmxlPGFueT4gPSB7fTtcclxuICAgIHByaXZhdGUgdmFyaWFibGVzSGFzaDogSGFzaFRhYmxlPGFueT4gPSB7fTtcclxuICAgIHByaXZhdGUgcGFnZVByZXZUZXh0VmFsdWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgcGFnZU5leHRUZXh0VmFsdWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgY29tcGxldGVUZXh0VmFsdWU6IHN0cmluZztcclxuICAgIHByaXZhdGUgc2hvd1BhZ2VOdW1iZXJzVmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgc2hvd1F1ZXN0aW9uTnVtYmVyc1ZhbHVlOiBzdHJpbmcgPSBcIm9uXCI7XHJcbiAgICBwcml2YXRlIHF1ZXN0aW9uVGl0bGVMb2NhdGlvblZhbHVlOiBzdHJpbmcgPSBcInRvcFwiO1xyXG4gICAgcHJpdmF0ZSBsb2NhbGVWYWx1ZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgaXNDb21wbGV0ZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaXNMb2FkaW5nOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcml2YXRlIHByb2Nlc3NlZFRleHRWYWx1ZXM6IEhhc2hUYWJsZTxhbnk+ID0ge307XHJcbiAgICBwcml2YXRlIHRleHRQcmVQcm9jZXNzb3I6IFRleHRQcmVQcm9jZXNzb3I7XHJcblxyXG4gICAgcHVibGljIG9uQ29tcGxldGU6IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsKSA9PiBhbnksIGFueT4gPSBuZXcgRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwpID0+IGFueSwgYW55PigpO1xyXG4gICAgcHVibGljIG9uQ3VycmVudFBhZ2VDaGFuZ2VkOiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4gPSBuZXcgRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+KCk7XHJcbiAgICBwdWJsaWMgb25WYWx1ZUNoYW5nZWQ6IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PiA9IG5ldyBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4oKTtcclxuICAgIHB1YmxpYyBvblZpc2libGVDaGFuZ2VkOiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4gPSBuZXcgRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+KCk7XHJcbiAgICBwdWJsaWMgb25QYWdlVmlzaWJsZUNoYW5nZWQ6IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PiA9IG5ldyBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4oKTtcclxuICAgIHB1YmxpYyBvblF1ZXN0aW9uQWRkZWQ6IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PiA9IG5ldyBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4oKTtcclxuICAgIHB1YmxpYyBvblF1ZXN0aW9uUmVtb3ZlZDogRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PigpO1xyXG4gICAgcHVibGljIG9uVmFsaWRhdGVRdWVzdGlvbjogRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PigpO1xyXG4gICAgcHVibGljIG9uUHJvY2Vzc0h0bWw6IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PiA9IG5ldyBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4oKTtcclxuICAgIHB1YmxpYyBvblNlbmRSZXN1bHQ6IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PiA9IG5ldyBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4oKTtcclxuICAgIHB1YmxpYyBvbkdldFJlc3VsdDogRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PigpO1xyXG4gICAgcHVibGljIG9uVXBsb2FkRmlsZTogRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PigpO1xyXG4gICAgcHVibGljIGpzb25FcnJvcnM6IEFycmF5PEpzb25FcnJvcj4gPSBudWxsO1xyXG5cclxuICAgIHB1YmxpYyBtb2RlOiBzdHJpbmcgPSBcIm5vcm1hbFwiO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihqc29uT2JqOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy50ZXh0UHJlUHJvY2Vzc29yID0gbmV3IFRleHRQcmVQcm9jZXNzb3IoKTtcclxuICAgICAgICB0aGlzLnRleHRQcmVQcm9jZXNzb3Iub25IYXNWYWx1ZSA9IGZ1bmN0aW9uIChuYW1lOiBzdHJpbmcpIHsgcmV0dXJuIHNlbGYucHJvY2Vzc2VkVGV4dFZhbHVlc1tuYW1lLnRvTG93ZXJDYXNlKCldOyB9O1xyXG4gICAgICAgIHRoaXMudGV4dFByZVByb2Nlc3Nvci5vblByb2Nlc3MgPSBmdW5jdGlvbiAobmFtZTogc3RyaW5nKSB7IHJldHVybiBzZWxmLmdldFByb2Nlc3NlZFRleHRWYWx1ZShuYW1lKTsgfTtcclxuICAgICAgICB0aGlzLnBhZ2VzLnB1c2ggPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdmFsdWUuZGF0YSA9IHNlbGY7XHJcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIHZhbHVlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudHJpZ2dlcnMucHVzaCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YWx1ZS5zZXRPd25lcihzZWxmKTtcclxuICAgICAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy51cGRhdGVQcm9jZXNzZWRUZXh0VmFsdWVzKCk7XHJcbiAgICAgICAgdGhpcy5vbkJlZm9yZUNyZWF0aW5nKCk7XHJcbiAgICAgICAgaWYgKGpzb25PYmopIHtcclxuICAgICAgICAgICAgdGhpcy5zZXRKc29uT2JqZWN0KGpzb25PYmopO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5zdXJ2ZXlJZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5sb2FkU3VydmV5RnJvbVNlcnZpY2UodGhpcy5zdXJ2ZXlJZCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vbkNyZWF0aW5nKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJzdXJ2ZXlcIjsgfVxyXG4gICAgcHVibGljIGdldCBsb2NhbGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMubG9jYWxlVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgbG9jYWxlKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmxvY2FsZVZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgc3VydmV5TG9jYWxpemF0aW9uLmN1cnJlbnRMb2NhbGUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRMb2NTdHJpbmcoc3RyOiBzdHJpbmcpIHsgcmV0dXJuIHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoc3RyKTsgfVxyXG4gICAgcHVibGljIGdldCBlbXB0eVN1cnZleVRleHQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZ2V0TG9jU3RyaW5nKFwiZW1wdHlTdXJ2ZXlcIik7IH1cclxuICAgIHB1YmxpYyBnZXQgcGFnZVByZXZUZXh0KCkgeyByZXR1cm4gKHRoaXMucGFnZVByZXZUZXh0VmFsdWUpID8gdGhpcy5wYWdlUHJldlRleHRWYWx1ZSA6IHRoaXMuZ2V0TG9jU3RyaW5nKFwicGFnZVByZXZUZXh0XCIpOyB9XHJcbiAgICBwdWJsaWMgc2V0IHBhZ2VQcmV2VGV4dChuZXdWYWx1ZTogc3RyaW5nKSB7IHRoaXMucGFnZVByZXZUZXh0VmFsdWUgPSBuZXdWYWx1ZTsgfVxyXG4gICAgcHVibGljIGdldCBwYWdlTmV4dFRleHQoKSB7IHJldHVybiAodGhpcy5wYWdlTmV4dFRleHRWYWx1ZSkgPyB0aGlzLnBhZ2VOZXh0VGV4dFZhbHVlIDogdGhpcy5nZXRMb2NTdHJpbmcoXCJwYWdlTmV4dFRleHRcIik7IH1cclxuICAgIHB1YmxpYyBzZXQgcGFnZU5leHRUZXh0KG5ld1ZhbHVlOiBzdHJpbmcpIHsgdGhpcy5wYWdlTmV4dFRleHRWYWx1ZSA9IG5ld1ZhbHVlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbXBsZXRlVGV4dCgpIHsgcmV0dXJuICh0aGlzLmNvbXBsZXRlVGV4dFZhbHVlKSA/IHRoaXMuY29tcGxldGVUZXh0VmFsdWUgOiB0aGlzLmdldExvY1N0cmluZyhcImNvbXBsZXRlVGV4dFwiKTsgfVxyXG4gICAgcHVibGljIHNldCBjb21wbGV0ZVRleHQobmV3VmFsdWU6IHN0cmluZykgeyB0aGlzLmNvbXBsZXRlVGV4dFZhbHVlID0gbmV3VmFsdWU7IH1cclxuICAgIHB1YmxpYyBnZXQgc2hvd1BhZ2VOdW1iZXJzKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5zaG93UGFnZU51bWJlcnNWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBzaG93UGFnZU51bWJlcnModmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IHRoaXMuc2hvd1BhZ2VOdW1iZXJzKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zaG93UGFnZU51bWJlcnNWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmlzaWJsZUluZGV4ZXMoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgc2hvd1F1ZXN0aW9uTnVtYmVycygpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5zaG93UXVlc3Rpb25OdW1iZXJzVmFsdWU7IH07XHJcbiAgICBwdWJsaWMgc2V0IHNob3dRdWVzdGlvbk51bWJlcnModmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5zaG93UXVlc3Rpb25OdW1iZXJzKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zaG93UXVlc3Rpb25OdW1iZXJzVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2libGVJbmRleGVzKCk7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIGdldCBxdWVzdGlvblRpdGxlTG9jYXRpb24oKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMucXVlc3Rpb25UaXRsZUxvY2F0aW9uVmFsdWU7IH07XHJcbiAgICBwdWJsaWMgc2V0IHF1ZXN0aW9uVGl0bGVMb2NhdGlvbih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLnF1ZXN0aW9uVGl0bGVMb2NhdGlvblZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvblRpdGxlTG9jYXRpb25WYWx1ZSA9IHZhbHVlO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBnZXQgZGF0YSgpOiBhbnkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy52YWx1ZXNIYXNoKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtrZXldID0gdGhpcy52YWx1ZXNIYXNoW2tleV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGRhdGEoZGF0YTogYW55KSB7XHJcbiAgICAgICAgdGhpcy52YWx1ZXNIYXNoID0ge307XHJcbiAgICAgICAgaWYgKGRhdGEpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudmFsdWVzSGFzaFtrZXldID0gZGF0YVtrZXldO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jaGVja1RyaWdnZXJzKGtleSwgZGF0YVtrZXldLCBmYWxzZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub3RpZnlBbGxRdWVzdGlvbnNPblZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgICAgIHRoaXMucnVuQ29uZGl0aW9ucygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBjb21tZW50cygpOiBhbnkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gdGhpcy52YWx1ZXNIYXNoKSB7XHJcbiAgICAgICAgICAgIGlmIChrZXkuaW5kZXhPZih0aGlzLmNvbW1lbnRQcmVmaXgpID4gMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLnZhbHVlc0hhc2hba2V5XTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgZ2V0IHZpc2libGVQYWdlcygpOiBBcnJheTxQYWdlTW9kZWw+IHtcclxuICAgICAgICBpZiAodGhpcy5pc0Rlc2lnbk1vZGUpIHJldHVybiB0aGlzLnBhZ2VzO1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXk8UGFnZU1vZGVsPigpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlc1tpXS5pc1Zpc2libGUpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMucGFnZXNbaV0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzRW1wdHkoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnBhZ2VzLmxlbmd0aCA9PSAwOyB9XHJcbiAgICBwdWJsaWMgZ2V0IFBhZ2VDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnBhZ2VzLmxlbmd0aDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgdmlzaWJsZVBhZ2VDb3VudCgpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVQYWdlcy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGN1cnJlbnRQYWdlKCk6IFBhZ2VNb2RlbCB7XHJcbiAgICAgICAgdmFyIHZQYWdlcyA9IHRoaXMudmlzaWJsZVBhZ2VzO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlVmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBpZiAodlBhZ2VzLmluZGV4T2YodGhpcy5jdXJyZW50UGFnZVZhbHVlKSA8IDApIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPT0gbnVsbCAmJiB2UGFnZXMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdlBhZ2VzWzBdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50UGFnZVZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBjdXJyZW50UGFnZSh2YWx1ZTogUGFnZU1vZGVsKSB7XHJcbiAgICAgICAgdmFyIHZQYWdlcyA9IHRoaXMudmlzaWJsZVBhZ2VzO1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPSBudWxsICYmIHZQYWdlcy5pbmRleE9mKHZhbHVlKSA8IDApIHJldHVybjtcclxuICAgICAgICBpZiAodmFsdWUgPT0gdGhpcy5jdXJyZW50UGFnZVZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy5jdXJyZW50UGFnZVZhbHVlO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2VDaGFuZ2VkKHZhbHVlLCBvbGRWYWx1ZSk7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2VWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUuc2Nyb2xsVG9GaXJzdFF1ZXN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBzdGF0ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLmlzTG9hZGluZykgcmV0dXJuIFwibG9hZGluZ1wiO1xyXG4gICAgICAgIGlmICh0aGlzLmlzQ29tcGxldGVkKSByZXR1cm4gXCJjb21wbGV0ZWRcIjtcclxuICAgICAgICByZXR1cm4gKHRoaXMuY3VycmVudFBhZ2UpID8gXCJydW5uaW5nXCIgOiBcImVtcHR5XCJcclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudmFyaWFibGVzSGFzaCA9IHt9O1xyXG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy52aXNpYmxlUGFnZUNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy52aXNpYmxlUGFnZXNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG1lcmdlVmFsdWVzKHNyYzogYW55LCBkZXN0OiBhbnkpIHtcclxuICAgICAgICBpZiAoIWRlc3QgfHwgIXNyYykgcmV0dXJuO1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzcmMpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gc3JjW2tleV07XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRlc3Rba2V5XSkgZGVzdFtrZXldID0ge307XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lcmdlVmFsdWVzKHZhbHVlLCBkZXN0W2tleV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVzdFtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3VycmVudFBhZ2VDaGFuZ2VkKG5ld1ZhbHVlOiBQYWdlTW9kZWwsIG9sZFZhbHVlOiBQYWdlTW9kZWwpIHtcclxuICAgICAgICB0aGlzLm9uQ3VycmVudFBhZ2VDaGFuZ2VkLmZpcmUodGhpcywgeyAnb2xkQ3VycmVudFBhZ2UnOiBvbGRWYWx1ZSwgJ25ld0N1cnJlbnRQYWdlJzogbmV3VmFsdWUgfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UHJvZ3Jlc3MoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZSA9PSBudWxsKSByZXR1cm4gMDtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnZpc2libGVQYWdlcy5pbmRleE9mKHRoaXMuY3VycmVudFBhZ2UpICsgMTtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKChpbmRleCAqIDEwMCAvIHRoaXMudmlzaWJsZVBhZ2VDb3VudCkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc0Rlc2lnbk1vZGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm1vZGUgPT0gXCJkZXNpZ25lclwiOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGhhc0Nvb2tpZSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMuY29va2llTmFtZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciBjb29raWVzID0gZG9jdW1lbnQuY29va2llO1xyXG4gICAgICAgIHJldHVybiBjb29raWVzICYmIGNvb2tpZXMuaW5kZXhPZih0aGlzLmNvb2tpZU5hbWUgKyBcIj10cnVlXCIpID4gLTE7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Q29va2llKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jb29raWVOYW1lKSByZXR1cm47XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gdGhpcy5jb29raWVOYW1lICsgXCI9dHJ1ZTsgZXhwaXJlcz1GcmksIDMxIERlYyA5OTk5IDA6MDowIEdNVFwiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlbGV0ZUNvb2tpZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY29va2llTmFtZSkgcmV0dXJuO1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IHRoaXMuY29va2llTmFtZSArIFwiPTtcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBuZXh0UGFnZSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5pc0xhc3RQYWdlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDdXJyZW50UGFnZUhhc0Vycm9ycykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHRoaXMuY2hlY2tPblBhZ2VUcmlnZ2VycygpO1xyXG4gICAgICAgIGlmICh0aGlzLnNlbmRSZXN1bHRPblBhZ2VOZXh0ICYmIHRoaXMuY2xpZW50SWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kUmVzdWx0KHRoaXMuc3VydmV5UG9zdElkLCB0aGlzLmNsaWVudElkLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHZQYWdlcyA9IHRoaXMudmlzaWJsZVBhZ2VzO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHZQYWdlcy5pbmRleE9mKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB2UGFnZXNbaW5kZXggKyAxXTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIGdldCBpc0N1cnJlbnRQYWdlSGFzRXJyb3JzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlID09IG51bGwpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRQYWdlLmhhc0Vycm9ycyh0cnVlLCB0cnVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBwcmV2UGFnZSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5pc0ZpcnN0UGFnZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciB2UGFnZXMgPSB0aGlzLnZpc2libGVQYWdlcztcclxuICAgICAgICB2YXIgaW5kZXggPSB2UGFnZXMuaW5kZXhPZih0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdlBhZ2VzW2luZGV4IC0gMV07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY29tcGxldGVMYXN0UGFnZSgpIDogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDdXJyZW50UGFnZUhhc0Vycm9ycykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZG9Db21wbGV0ZSgpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc0ZpcnN0UGFnZSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZSA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlUGFnZXMuaW5kZXhPZih0aGlzLmN1cnJlbnRQYWdlKSA9PSAwO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc0xhc3RQYWdlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlID09IG51bGwpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHZhciB2UGFnZXMgPSB0aGlzLnZpc2libGVQYWdlcztcclxuICAgICAgICByZXR1cm4gdlBhZ2VzLmluZGV4T2YodGhpcy5jdXJyZW50UGFnZSkgPT0gdlBhZ2VzLmxlbmd0aCAtIDE7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZG9Db21wbGV0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5jbGVhckludmlzaWJsZVZhbHVlcykge1xyXG4gICAgICAgICAgICB0aGlzLmNsZWFySW52aXNpYmxlUXVlc3Rpb25WYWx1ZXMoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRDb29raWUoKTtcclxuICAgICAgICB0aGlzLnNldENvbXBsZXRlZCgpO1xyXG4gICAgICAgIHRoaXMub25Db21wbGV0ZS5maXJlKHRoaXMsIG51bGwpO1xyXG4gICAgICAgIGlmICh0aGlzLnN1cnZleVBvc3RJZCkge1xyXG4gICAgICAgICAgICB0aGlzLnNlbmRSZXN1bHQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgc2V0Q29tcGxldGVkKCkge1xyXG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBwcm9jZXNzZWRDb21wbGV0ZWRIdG1sKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tcGxldGVkSHRtbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzSHRtbCh0aGlzLmNvbXBsZXRlZEh0bWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCI8aDM+XCIgKyB0aGlzLmdldExvY1N0cmluZyhcImNvbXBsZXRpbmdTdXJ2ZXlcIikgKyBcIjwvaDM+XCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHByb2Nlc3NlZExvYWRpbmdIdG1sKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiPGgzPlwiICsgdGhpcy5nZXRMb2NTdHJpbmcoXCJsb2FkaW5nU3VydmV5XCIpICsgXCI8L2gzPlwiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBwcm9ncmVzc1RleHQoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZSA9PSBudWxsKSByZXR1cm4gXCJcIjtcclxuICAgICAgICB2YXIgdlBhZ2VzID0gdGhpcy52aXNpYmxlUGFnZXM7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdlBhZ2VzLmluZGV4T2YodGhpcy5jdXJyZW50UGFnZSkgKyAxO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldExvY1N0cmluZyhcInByb2dyZXNzVGV4dFwiKVtcImZvcm1hdFwiXShpbmRleCwgdlBhZ2VzLmxlbmd0aCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdXBsb2FkRmlsZShuYW1lOiBzdHJpbmcsIGZpbGU6IEZpbGUsIHN0b3JlRGF0YUFzVGV4dDogYm9vbGVhbiwgdXBsb2FkaW5nQ2FsbGJhY2s6IChzdGF0dXM6IHN0cmluZyk9PmFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciBhY2NlcHQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25VcGxvYWRGaWxlLmZpcmUodGhpcywgeyBuYW1lOiBuYW1lLCBmaWxlOiBmaWxlLCBhY2NlcHQ6IGFjY2VwdCB9KTtcclxuICAgICAgICBpZiAoIWFjY2VwdCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICghc3RvcmVEYXRhQXNUZXh0ICYmIHRoaXMuc3VydmV5UG9zdElkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkRmlsZUNvcmUobmFtZSwgZmlsZSwgdXBsb2FkaW5nQ2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCB1cGxvYWRGaWxlQ29yZShuYW1lOiBzdHJpbmcsIGZpbGU6IEZpbGUsIHVwbG9hZGluZ0NhbGxiYWNrOiAoc3RhdHVzOiBzdHJpbmcpID0+IGFueSkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAodXBsb2FkaW5nQ2FsbGJhY2spIHVwbG9hZGluZ0NhbGxiYWNrKFwidXBsb2FkaW5nXCIpO1xyXG4gICAgICAgIG5ldyBkeFN1cnZleVNlcnZpY2UoKS5zZW5kRmlsZSh0aGlzLnN1cnZleVBvc3RJZCwgZmlsZSwgZnVuY3Rpb24gKHN1Y2Nlc3M6IGJvb2xlYW4sIHJlc3BvbnNlOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKHVwbG9hZGluZ0NhbGxiYWNrKSB1cGxvYWRpbmdDYWxsYmFjayhzdWNjZXNzID8gXCJzdWNjZXNzXCIgOiBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRWYWx1ZShuYW1lLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldFBhZ2UoaW5kZXg6IG51bWJlcik6IFBhZ2VNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZXNbaW5kZXhdO1xyXG4gICAgfVxyXG4gICAgYWRkUGFnZShwYWdlOiBQYWdlTW9kZWwpIHtcclxuICAgICAgICBpZiAocGFnZSA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5wYWdlcy5wdXNoKHBhZ2UpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmlzaWJsZUluZGV4ZXMoKTtcclxuICAgIH1cclxuICAgIGFkZE5ld1BhZ2UobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLmNyZWF0ZU5ld1BhZ2UobmFtZSk7XHJcbiAgICAgICAgdGhpcy5hZGRQYWdlKHBhZ2UpO1xyXG4gICAgICAgIHJldHVybiBwYWdlO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlUGFnZShwYWdlOiBQYWdlTW9kZWwpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnBhZ2VzLmluZGV4T2YocGFnZSk7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucGFnZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZVZhbHVlID09IHBhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMucGFnZXMubGVuZ3RoID4gMCA/IHRoaXMucGFnZXNbMF0gOiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2libGVJbmRleGVzKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UXVlc3Rpb25CeU5hbWUobmFtZTogc3RyaW5nLCBjYXNlSW5zZW5zaXRpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IElRdWVzdGlvbiB7XHJcbiAgICAgICAgdmFyIHF1ZXN0aW9ucyA9IHRoaXMuZ2V0QWxsUXVlc3Rpb25zKCk7XHJcbiAgICAgICAgaWYgKGNhc2VJbnNlbnNpdGl2ZSkgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgcXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBxdWVzdGlvbk5hbWUgPSBxdWVzdGlvbnNbaV0ubmFtZTtcclxuICAgICAgICAgICAgaWYgKGNhc2VJbnNlbnNpdGl2ZSkgcXVlc3Rpb25OYW1lID0gcXVlc3Rpb25OYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmKHF1ZXN0aW9uTmFtZSA9PSBuYW1lKSByZXR1cm4gcXVlc3Rpb25zW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRRdWVzdGlvbnNCeU5hbWVzKG5hbWVzOiBzdHJpbmdbXSwgY2FzZUluc2Vuc2l0aXZlOiBib29sZWFuID0gZmFsc2UpOiBJUXVlc3Rpb25bXSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGlmICghbmFtZXMpIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghbmFtZXNbaV0pIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB2YXIgcXVlc3Rpb24gPSB0aGlzLmdldFF1ZXN0aW9uQnlOYW1lKG5hbWVzW2ldLCBjYXNlSW5zZW5zaXRpdmUpO1xyXG4gICAgICAgICAgICBpZiAocXVlc3Rpb24pIHJlc3VsdC5wdXNoKHF1ZXN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRQYWdlQnlRdWVzdGlvbihxdWVzdGlvbjogSVF1ZXN0aW9uKTogUGFnZU1vZGVsIHtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcGFnZSA9IHRoaXMucGFnZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChwYWdlLnF1ZXN0aW9ucy5pbmRleE9mKDxRdWVzdGlvbkJhc2U+cXVlc3Rpb24pID4gLTEpIHJldHVybiBwYWdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRQYWdlQnlOYW1lKG5hbWU6IHN0cmluZyk6IFBhZ2VNb2RlbCB7XHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMucGFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZXNbaV0ubmFtZSA9PSBuYW1lKSByZXR1cm4gdGhpcy5wYWdlc1tpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UGFnZXNCeU5hbWVzKG5hbWVzOiBzdHJpbmdbXSk6IFBhZ2VNb2RlbFtde1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICBpZiAoIW5hbWVzKSByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIW5hbWVzW2ldKSBjb250aW51ZTtcclxuICAgICAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLmdldFBhZ2VCeU5hbWUobmFtZXNbaV0pO1xyXG4gICAgICAgICAgICBpZiAocGFnZSkgcmVzdWx0LnB1c2gocGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0QWxsUXVlc3Rpb25zKHZpc2libGVPbmx5OiBib29sZWFuID0gZmFsc2UpOiBBcnJheTxJUXVlc3Rpb24+IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5PElRdWVzdGlvbj4oKTtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VzW2ldLmFkZFF1ZXN0aW9uc1RvTGlzdChyZXN1bHQsIHZpc2libGVPbmx5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVOZXdQYWdlKG5hbWU6IHN0cmluZykgeyByZXR1cm4gbmV3IFBhZ2VNb2RlbChuYW1lKTsgfVxyXG4gICAgcHJpdmF0ZSBub3RpZnlRdWVzdGlvbk9uVmFsdWVDaGFuZ2VkKG5hbWU6IHN0cmluZywgbmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSB0aGlzLmdldEFsbFF1ZXN0aW9ucygpO1xyXG4gICAgICAgIHZhciBxdWVzdGlvbiA9IG51bGw7XHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IHF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocXVlc3Rpb25zW2ldLm5hbWUgIT0gbmFtZSkgY29udGludWU7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uID0gcXVlc3Rpb25zW2ldO1xyXG4gICAgICAgICAgICB0aGlzLmRvU3VydmV5VmFsdWVDaGFuZ2VkKHF1ZXN0aW9uLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZWQuZmlyZSh0aGlzLCB7ICduYW1lJzogbmFtZSwgJ3F1ZXN0aW9uJzogcXVlc3Rpb24sICd2YWx1ZSc6IG5ld1ZhbHVlIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBub3RpZnlBbGxRdWVzdGlvbnNPblZhbHVlQ2hhbmdlZCgpIHtcclxuICAgICAgICB2YXIgcXVlc3Rpb25zID0gdGhpcy5nZXRBbGxRdWVzdGlvbnMoKTtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgcXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9TdXJ2ZXlWYWx1ZUNoYW5nZWQocXVlc3Rpb25zW2ldLCB0aGlzLmdldFZhbHVlKHF1ZXN0aW9uc1tpXS5uYW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGRvU3VydmV5VmFsdWVDaGFuZ2VkKHF1ZXN0aW9uOiBJUXVlc3Rpb24sIG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgICAgICBxdWVzdGlvbi5vblN1cnZleVZhbHVlQ2hhbmdlZChuZXdWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNoZWNrT25QYWdlVHJpZ2dlcnMoKSB7XHJcbiAgICAgICAgdmFyIHF1ZXN0aW9ucyA9IHRoaXMuZ2V0Q3VycmVudFBhZ2VRdWVzdGlvbnMoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcXVlc3Rpb24gPSBxdWVzdGlvbnNbaV07XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUocXVlc3Rpb24ubmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tUcmlnZ2VycyhxdWVzdGlvbi5uYW1lLCB2YWx1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRDdXJyZW50UGFnZVF1ZXN0aW9ucygpOiBBcnJheTxRdWVzdGlvbkJhc2U+IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIGlmICghcGFnZSkgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhZ2UucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBxdWVzdGlvbiA9IHBhZ2UucXVlc3Rpb25zW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXF1ZXN0aW9uLnZpc2libGUgfHwgIXF1ZXN0aW9uLm5hbWUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChxdWVzdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNoZWNrVHJpZ2dlcnMobmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55LCBpc09uTmV4dFBhZ2U6IGJvb2xlYW4pIHtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy50cmlnZ2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgdHJpZ2dlciA9IHRoaXMudHJpZ2dlcnNbaV07XHJcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyLm5hbWUgPT0gbmFtZSAmJiB0cmlnZ2VyLmlzT25OZXh0UGFnZSA9PSBpc09uTmV4dFBhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXIuY2hlY2sobmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBkb1F1ZXN0aW9uc09uTG9hZCgpIHtcclxuICAgICAgICB2YXIgcXVlc3Rpb25zID0gdGhpcy5nZXRBbGxRdWVzdGlvbnMoZmFsc2UpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uc1tpXS5vblN1cnZleUxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJ1bkNvbmRpdGlvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5ydW5Db25kaXRpb25zRm9yTGlzdCh0aGlzLmdldEFsbFF1ZXN0aW9ucyhmYWxzZSkpO1xyXG4gICAgICAgIHRoaXMucnVuQ29uZGl0aW9uc0Zvckxpc3QodGhpcy5wYWdlcyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJ1bkNvbmRpdGlvbnNGb3JMaXN0KGxpc3Q6IEFycmF5PElDb25kaXRpb25SdW5uZXI+KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpc3RbaV0ucnVuQ29uZGl0aW9uKHRoaXMudmFsdWVzSGFzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNlbmRSZXN1bHQocG9zdElkOiBzdHJpbmcgPSBudWxsLCBjbGllbnRJZDogc3RyaW5nID0gbnVsbCwgaXNQYXJ0aWFsQ29tcGxldGVkOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoIXBvc3RJZCAmJiB0aGlzLnN1cnZleVBvc3RJZCkge1xyXG4gICAgICAgICAgICBwb3N0SWQgPSB0aGlzLnN1cnZleVBvc3RJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFwb3N0SWQpIHJldHVybjtcclxuICAgICAgICBpZiAoY2xpZW50SWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRJZCA9IGNsaWVudElkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbmV3IGR4U3VydmV5U2VydmljZSgpLnNlbmRSZXN1bHQocG9zdElkLCB0aGlzLmRhdGEsIGZ1bmN0aW9uIChzdWNjZXNzOiBib29sZWFuLCByZXNwb25zZTogYW55KSB7XHJcbiAgICAgICAgICAgIHNlbGYub25TZW5kUmVzdWx0LmZpcmUoc2VsZiwgeyBzdWNjZXNzOiBzdWNjZXNzLCByZXNwb25zZTogcmVzcG9uc2V9KTtcclxuICAgICAgICB9LCB0aGlzLmNsaWVudElkLCBpc1BhcnRpYWxDb21wbGV0ZWQpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFJlc3VsdChyZXN1bHRJZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbmV3IGR4U3VydmV5U2VydmljZSgpLmdldFJlc3VsdChyZXN1bHRJZCwgbmFtZSwgZnVuY3Rpb24gKHN1Y2Nlc3M6IGJvb2xlYW4sIGRhdGE6IGFueSwgZGF0YUxpc3Q6IGFueVtdLCByZXNwb25zZTogYW55KSB7XHJcbiAgICAgICAgICAgIHNlbGYub25HZXRSZXN1bHQuZmlyZShzZWxmLCB7IHN1Y2Nlc3M6IHN1Y2Nlc3MsIGRhdGE6IGRhdGEsIGRhdGFMaXN0OiBkYXRhTGlzdCwgcmVzcG9uc2U6IHJlc3BvbnNlIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxvYWRTdXJ2ZXlGcm9tU2VydmljZShzdXJ2ZXlJZDogc3RyaW5nID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChzdXJ2ZXlJZCkge1xyXG4gICAgICAgICAgICB0aGlzLnN1cnZleUlkID0gc3VydmV5SWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vbkxvYWRpbmdTdXJ2ZXlGcm9tU2VydmljZSgpO1xyXG4gICAgICAgIG5ldyBkeFN1cnZleVNlcnZpY2UoKS5sb2FkU3VydmV5KHRoaXMuc3VydmV5SWQsIGZ1bmN0aW9uIChzdWNjZXNzOiBib29sZWFuLCByZXN1bHQ6IHN0cmluZywgcmVzcG9uc2U6IGFueSkge1xyXG4gICAgICAgICAgICBzZWxmLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoc3VjY2VzcyAmJiByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0SnNvbk9iamVjdChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5ub3RpZnlBbGxRdWVzdGlvbnNPblZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5vbkxvYWRTdXJ2ZXlGcm9tU2VydmljZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkaW5nU3VydmV5RnJvbVNlcnZpY2UoKSB7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkU3VydmV5RnJvbVNlcnZpY2UoKSB7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHVwZGF0ZVZpc2libGVJbmRleGVzKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGFnZVZpc2libGVJbmRleGVzKHRoaXMuc2hvd1BhZ2VOdW1iZXJzKTtcclxuICAgICAgICBpZiAodGhpcy5zaG93UXVlc3Rpb25OdW1iZXJzID09IFwib25QYWdlXCIpIHtcclxuICAgICAgICAgICAgdmFyIHZpc1BhZ2VzID0gdGhpcy52aXNpYmxlUGFnZXM7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlzUGFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUXVlc3Rpb25WaXNpYmxlSW5kZXhlcyh2aXNQYWdlc1tpXS5xdWVzdGlvbnMsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVRdWVzdGlvblZpc2libGVJbmRleGVzKHRoaXMuZ2V0QWxsUXVlc3Rpb25zKGZhbHNlKSwgdGhpcy5zaG93UXVlc3Rpb25OdW1iZXJzID09IFwib25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVQYWdlVmlzaWJsZUluZGV4ZXMoc2hvd0luZGV4OiBib29sZWFuKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlc1tpXS52aXNpYmxlSW5kZXggPSB0aGlzLnBhZ2VzW2ldLnZpc2libGUgPyAoaW5kZXgrKykgOiAtMTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlc1tpXS5udW0gPSBzaG93SW5kZXggJiYgdGhpcy5wYWdlc1tpXS52aXNpYmxlID8gdGhpcy5wYWdlc1tpXS52aXNpYmxlSW5kZXggKyAxIDogLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVRdWVzdGlvblZpc2libGVJbmRleGVzKHF1ZXN0aW9uczogSVF1ZXN0aW9uW10sIHNob3dJbmRleDogYm9vbGVhbikge1xyXG4gICAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcXVlc3Rpb25zW2ldLnNldFZpc2libGVJbmRleChzaG93SW5kZXggJiYgcXVlc3Rpb25zW2ldLnZpc2libGUgJiYgcXVlc3Rpb25zW2ldLmhhc1RpdGxlID8gKGluZGV4KyspIDogLTEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgc2V0SnNvbk9iamVjdChqc29uT2JqOiBhbnkpIHtcclxuICAgICAgICBpZiAoIWpzb25PYmopIHJldHVybjtcclxuICAgICAgICB0aGlzLmpzb25FcnJvcnMgPSBudWxsO1xyXG4gICAgICAgIHZhciBqc29uQ29udmVydGVyID0gbmV3IEpzb25PYmplY3QoKTtcclxuICAgICAgICBqc29uQ29udmVydGVyLnRvT2JqZWN0KGpzb25PYmosIHRoaXMpO1xyXG4gICAgICAgIGlmIChqc29uQ29udmVydGVyLmVycm9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuanNvbkVycm9ycyA9IGpzb25Db252ZXJ0ZXIuZXJyb3JzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVByb2Nlc3NlZFRleHRWYWx1ZXMoKTtcclxuICAgICAgICBpZiAodGhpcy5oYXNDb29raWUpIHtcclxuICAgICAgICAgICAgdGhpcy5kb0NvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZG9RdWVzdGlvbnNPbkxvYWQoKTtcclxuICAgICAgICB0aGlzLnJ1bkNvbmRpdGlvbnMoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2libGVJbmRleGVzKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25CZWZvcmVDcmVhdGluZygpIHsgfVxyXG4gICAgcHJvdGVjdGVkIG9uQ3JlYXRpbmcoKSB7IH1cclxuICAgIHByaXZhdGUgdXBkYXRlUHJvY2Vzc2VkVGV4dFZhbHVlcygpIHtcclxuICAgICAgICB0aGlzLnByb2Nlc3NlZFRleHRWYWx1ZXMgPSB7fTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzZWRUZXh0VmFsdWVzW1wicGFnZW5vXCJdID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIHNlbGYuY3VycmVudFBhZ2UgIT0gbnVsbCA/IHNlbGYudmlzaWJsZVBhZ2VzLmluZGV4T2Yoc2VsZi5jdXJyZW50UGFnZSkgKyAxIDogMDsgfVxyXG4gICAgICAgIHRoaXMucHJvY2Vzc2VkVGV4dFZhbHVlc1tcInBhZ2Vjb3VudFwiXSA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBzZWxmLnZpc2libGVQYWdlQ291bnQ7IH1cclxuICAgICAgICB2YXIgcXVlc3Rpb25zID0gdGhpcy5nZXRBbGxRdWVzdGlvbnMoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFF1ZXN0aW9uVG9Qcm9jZXNzZWRUZXh0VmFsdWVzKHF1ZXN0aW9uc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBhZGRRdWVzdGlvblRvUHJvY2Vzc2VkVGV4dFZhbHVlcyhxdWVzdGlvbjogSVF1ZXN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzZWRUZXh0VmFsdWVzW3F1ZXN0aW9uLm5hbWUudG9Mb3dlckNhc2UoKV0gPSBcInF1ZXN0aW9uXCI7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldFByb2Nlc3NlZFRleHRWYWx1ZShuYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIHZhciBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLnByb2Nlc3NlZFRleHRWYWx1ZXNbbmFtZV07XHJcbiAgICAgICAgaWYgKCF2YWwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlmICh2YWwgPT0gXCJxdWVzdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHZhciBxdWVzdGlvbiA9IHRoaXMuZ2V0UXVlc3Rpb25CeU5hbWUobmFtZSwgdHJ1ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiBxdWVzdGlvbiAhPSBudWxsID8gdGhpcy5nZXRWYWx1ZShxdWVzdGlvbi5uYW1lKSA6IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWwgPT0gXCJ2YWx1ZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFZhbHVlKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsID09IFwidmFyaWFibGVcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRWYXJpYWJsZShuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbChuYW1lKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY2xlYXJJbnZpc2libGVRdWVzdGlvblZhbHVlcygpIHtcclxuICAgICAgICB2YXIgcXVlc3Rpb25zID0gdGhpcy5nZXRBbGxRdWVzdGlvbnMoKTtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgcXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbnNbaV0udmlzaWJsZSkgY29udGludWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUocXVlc3Rpb25zW2ldLm5hbWUsIG51bGwpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRWYXJpYWJsZShuYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIGlmICghbmFtZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFyaWFibGVzSGFzaFtuYW1lXTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRWYXJpYWJsZShuYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgICAgICBpZiAoIW5hbWUpIHJldHVybjtcclxuICAgICAgICB0aGlzLnZhcmlhYmxlc0hhc2hbbmFtZV0gPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLnByb2Nlc3NlZFRleHRWYWx1ZXNbbmFtZS50b0xvd2VyQ2FzZSgpXSA9IFwidmFyaWFibGVcIjtcclxuICAgIH1cclxuICAgIC8vSVN1cnZleSBkYXRhXHJcbiAgICBwcml2YXRlIGdldFVuYmluZFZhbHVlKHZhbHVlOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmICh2YWx1ZSAmJiB2YWx1ZSBpbnN0YW5jZW9mIE9iamVjdCkge1xyXG4gICAgICAgICAgICAvL2RvIG5vdCByZXR1cm4gdGhlIHNhbWUgb2JqZWN0IGluc3RhbmNlISEhXHJcbiAgICAgICAgICAgIHJldHVybiBKU09OLnBhcnNlKEpTT04uc3RyaW5naWZ5KHZhbHVlKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWx1ZTtcclxuICAgIH1cclxuICAgIGdldFZhbHVlKG5hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgaWYgKCFuYW1lIHx8IG5hbWUubGVuZ3RoID09IDApIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMudmFsdWVzSGFzaFtuYW1lXTtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRVbmJpbmRWYWx1ZSh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBzZXRWYWx1ZShuYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbHVlRXF1YWwobmFtZSwgbmV3VmFsdWUpKSByZXR1cm47XHJcbiAgICAgICAgaWYgKG5ld1ZhbHVlID09IFwiXCIgfHwgbmV3VmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy52YWx1ZXNIYXNoW25hbWVdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gdGhpcy5nZXRVbmJpbmRWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVzSGFzaFtuYW1lXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnByb2Nlc3NlZFRleHRWYWx1ZXNbbmFtZS50b0xvd2VyQ2FzZSgpXSA9IFwidmFsdWVcIjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5ub3RpZnlRdWVzdGlvbk9uVmFsdWVDaGFuZ2VkKG5hbWUsIG5ld1ZhbHVlKTtcclxuICAgICAgICB0aGlzLmNoZWNrVHJpZ2dlcnMobmFtZSwgbmV3VmFsdWUsIGZhbHNlKTtcclxuICAgICAgICB0aGlzLnJ1bkNvbmRpdGlvbnMoKTtcclxuICAgICAgICB0aGlzLnRyeUdvTmV4dFBhZ2VBdXRvbWF0aWMobmFtZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzVmFsdWVFcXVhbChuYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPT0gXCJcIikgbmV3VmFsdWUgPSBudWxsO1xyXG4gICAgICAgIHZhciBvbGRWYWx1ZSA9IHRoaXMuZ2V0VmFsdWUobmFtZSk7XHJcbiAgICAgICAgaWYgKG5ld1ZhbHVlID09PSBudWxsIHx8IG9sZFZhbHVlID09PSBudWxsKSByZXR1cm4gbmV3VmFsdWUgPT09IG9sZFZhbHVlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmlzVHdvVmFsdWVFcXVhbHMobmV3VmFsdWUsIG9sZFZhbHVlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaXNUd29WYWx1ZUVxdWFscyh4OiBhbnksIHk6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh4ID09PSB5KSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBpZiAoISh4IGluc3RhbmNlb2YgT2JqZWN0KSB8fCAhKHkgaW5zdGFuY2VvZiBPYmplY3QpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgZm9yICh2YXIgcCBpbiB4KSB7XHJcbiAgICAgICAgICAgIGlmICgheC5oYXNPd25Qcm9wZXJ0eShwKSkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmICgheS5oYXNPd25Qcm9wZXJ0eShwKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoeFtwXSA9PT0geVtwXSkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHhbcF0pICE9PSBcIm9iamVjdFwiKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1R3b1ZhbHVlRXF1YWxzKHhbcF0sIHlbcF0pKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAocCBpbiB5KSB7XHJcbiAgICAgICAgICAgIGlmICh5Lmhhc093blByb3BlcnR5KHApICYmICF4Lmhhc093blByb3BlcnR5KHApKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB0cnlHb05leHRQYWdlQXV0b21hdGljKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghdGhpcy5nb05leHRQYWdlQXV0b21hdGljIHx8ICF0aGlzLmN1cnJlbnRQYWdlKSByZXR1cm47XHJcbiAgICAgICAgdmFyIHF1ZXN0aW9uID0gdGhpcy5nZXRRdWVzdGlvbkJ5TmFtZShuYW1lKTtcclxuICAgICAgICBpZiAocXVlc3Rpb24gJiYgIXF1ZXN0aW9uLnN1cHBvcnRHb05leHRQYWdlQXV0b21hdGljKCkpIHJldHVybjtcclxuICAgICAgICB2YXIgcXVlc3Rpb25zID0gdGhpcy5nZXRDdXJyZW50UGFnZVF1ZXN0aW9ucygpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5nZXRWYWx1ZShxdWVzdGlvbnNbaV0ubmFtZSkpIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCF0aGlzLmN1cnJlbnRQYWdlLmhhc0Vycm9ycyhmYWxzZSwgZmFsc2UpKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc0xhc3RQYWdlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5leHRQYWdlKCk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRvQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGdldENvbW1lbnQobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gdGhpcy5kYXRhW25hbWUgKyB0aGlzLmNvbW1lbnRQcmVmaXhdO1xyXG4gICAgICAgIGlmIChyZXN1bHQgPT0gbnVsbCkgcmVzdWx0ID0gXCJcIjtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgc2V0Q29tbWVudChuYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBuYW1lID0gbmFtZSArIHRoaXMuY29tbWVudFByZWZpeDtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPT0gXCJcIiB8fCBuZXdWYWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnZhbHVlc0hhc2hbbmFtZV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZXNIYXNoW25hbWVdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMudHJ5R29OZXh0UGFnZUF1dG9tYXRpYyhuYW1lKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBxdWVzdGlvblZpc2liaWxpdHlDaGFuZ2VkKHF1ZXN0aW9uOiBJUXVlc3Rpb24sIG5ld1ZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVWaXNpYmxlSW5kZXhlcygpO1xyXG4gICAgICAgIHRoaXMub25WaXNpYmxlQ2hhbmdlZC5maXJlKHRoaXMsIHsgJ3F1ZXN0aW9uJzogcXVlc3Rpb24sICduYW1lJzogcXVlc3Rpb24ubmFtZSwgJ3Zpc2libGUnOiBuZXdWYWx1ZSB9KTtcclxuICAgIH1cclxuICAgIHBhZ2VWaXNpYmlsaXR5Q2hhbmdlZChwYWdlOiBJUGFnZSwgbmV3VmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2libGVJbmRleGVzKCk7XHJcbiAgICAgICAgdGhpcy5vblBhZ2VWaXNpYmxlQ2hhbmdlZC5maXJlKHRoaXMsIHsgJ3BhZ2UnOiBwYWdlLCAndmlzaWJsZSc6IG5ld1ZhbHVlIH0pO1xyXG4gICAgfVxyXG4gICAgcXVlc3Rpb25BZGRlZChxdWVzdGlvbjogSVF1ZXN0aW9uLCBpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVWaXNpYmxlSW5kZXhlcygpO1xyXG4gICAgICAgIHRoaXMuYWRkUXVlc3Rpb25Ub1Byb2Nlc3NlZFRleHRWYWx1ZXMocXVlc3Rpb24pO1xyXG4gICAgICAgIHRoaXMub25RdWVzdGlvbkFkZGVkLmZpcmUodGhpcywgeyAncXVlc3Rpb24nOiBxdWVzdGlvbiwgJ25hbWUnOiBxdWVzdGlvbi5uYW1lLCAnaW5kZXgnOiBpbmRleCB9KTtcclxuICAgIH1cclxuICAgIHF1ZXN0aW9uUmVtb3ZlZChxdWVzdGlvbjogSVF1ZXN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVWaXNpYmxlSW5kZXhlcygpO1xyXG4gICAgICAgIHRoaXMub25RdWVzdGlvblJlbW92ZWQuZmlyZSh0aGlzLCB7ICdxdWVzdGlvbic6IHF1ZXN0aW9uLCAnbmFtZSc6IHF1ZXN0aW9uLm5hbWUgfSk7XHJcbiAgICB9XHJcblxyXG4gICAgdmFsaWRhdGVRdWVzdGlvbihuYW1lOiBzdHJpbmcpOiBTdXJ2ZXlFcnJvciB7XHJcbiAgICAgICAgaWYgKHRoaXMub25WYWxpZGF0ZVF1ZXN0aW9uLmlzRW1wdHkpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciBvcHRpb25zID0geyBuYW1lOiBuYW1lLCB2YWx1ZTogdGhpcy5nZXRWYWx1ZShuYW1lKSwgZXJyb3I6IG51bGwgfTtcclxuICAgICAgICB0aGlzLm9uVmFsaWRhdGVRdWVzdGlvbi5maXJlKHRoaXMsIG9wdGlvbnMpO1xyXG4gICAgICAgIHJldHVybiBvcHRpb25zLmVycm9yID8gbmV3IEN1c3RvbUVycm9yKG9wdGlvbnMuZXJyb3IpIDogbnVsbDtcclxuICAgIH1cclxuICAgIHByb2Nlc3NIdG1sKGh0bWw6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIG9wdGlvbnMgPSB7IGh0bWw6IGh0bWwgfTtcclxuICAgICAgICB0aGlzLm9uUHJvY2Vzc0h0bWwuZmlyZSh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzVGV4dChvcHRpb25zLmh0bWwpO1xyXG4gICAgfVxyXG4gICAgcHJvY2Vzc1RleHQodGV4dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy50ZXh0UHJlUHJvY2Vzc29yLnByb2Nlc3ModGV4dCk7XHJcbiAgICB9XHJcbiAgICAvL0lTdXJ2ZXlUcmlnZ2VyT3duZXJcclxuICAgIGdldE9iamVjdHMocGFnZXM6IHN0cmluZ1tdLCBxdWVzdGlvbnM6IHN0cmluZ1tdKTogYW55W117XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIEFycmF5LnByb3RvdHlwZS5wdXNoLmFwcGx5KHJlc3VsdCwgdGhpcy5nZXRQYWdlc0J5TmFtZXMocGFnZXMpKTtcclxuICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShyZXN1bHQsIHRoaXMuZ2V0UXVlc3Rpb25zQnlOYW1lcyhxdWVzdGlvbnMpKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgc2V0VHJpZ2dlclZhbHVlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSwgaXNWYXJpYWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICghbmFtZSkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChpc1ZhcmlhYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFyaWFibGUobmFtZSwgdmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0VmFsdWUobmFtZSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcInN1cnZleVwiLCBbeyBuYW1lOiBcImxvY2FsZVwiLCBjaG9pY2VzOiAoKSA9PiB7IHJldHVybiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0TG9jYWxlcygpIH0gfSxcclxuICAgIFwidGl0bGVcIiwgXCJjb21wbGV0ZWRIdG1sOmh0bWxcIiwgeyBuYW1lOiBcInBhZ2VzXCIsIGNsYXNzTmFtZTogXCJwYWdlXCIgfSxcclxuICAgIHsgbmFtZTogXCJxdWVzdGlvbnNcIiwgYmFzZUNsYXNzTmFtZTogXCJxdWVzdGlvblwiLCBvbkdldFZhbHVlOiBmdW5jdGlvbiAob2JqKSB7IHJldHVybiBudWxsOyB9LCBvblNldFZhbHVlOiBmdW5jdGlvbiAob2JqLCB2YWx1ZSwganNvbkNvbnZlcnRlcikgeyB2YXIgcGFnZSA9IG9iai5hZGROZXdQYWdlKFwiXCIpOyBqc29uQ29udmVydGVyLnRvT2JqZWN0KHsgcXVlc3Rpb25zOiB2YWx1ZSB9LCBwYWdlKTsgfSB9LFxyXG4gICAgeyBuYW1lOiBcInRyaWdnZXJzOnRyaWdnZXJzXCIsIGJhc2VDbGFzc05hbWU6IFwic3VydmV5dHJpZ2dlclwiLCBjbGFzc05hbWVQYXJ0OiBcInRyaWdnZXJcIiB9LFxyXG4gICAgXCJzdXJ2ZXlJZFwiLCBcInN1cnZleVBvc3RJZFwiLCBcImNvb2tpZU5hbWVcIiwgXCJzZW5kUmVzdWx0T25QYWdlTmV4dDpib29sZWFuXCIsXHJcbiAgICB7IG5hbWU6IFwic2hvd05hdmlnYXRpb25CdXR0b25zOmJvb2xlYW5cIiwgZGVmYXVsdDogdHJ1ZSB9LCB7IG5hbWU6IFwic2hvd1RpdGxlOmJvb2xlYW5cIiwgZGVmYXVsdDogdHJ1ZSB9LCB7IG5hbWU6IFwic2hvd1BhZ2VUaXRsZXM6Ym9vbGVhblwiLCBkZWZhdWx0OiB0cnVlIH0sXHJcbiAgICBcInNob3dQYWdlTnVtYmVyczpib29sZWFuXCIsIHsgbmFtZTogXCJzaG93UXVlc3Rpb25OdW1iZXJzXCIsIGRlZmF1bHQ6IFwib25cIiwgY2hvaWNlczogW1wib25cIiwgXCJvblBhZ2VcIiwgXCJvZmZcIl0gfSxcclxuICAgIHsgbmFtZTogXCJxdWVzdGlvblRpdGxlTG9jYXRpb25cIiwgZGVmYXVsdDogXCJ0b3BcIiwgY2hvaWNlczogW1widG9wXCIsIFwiYm90dG9tXCJdIH0sXHJcbiAgICB7IG5hbWU6IFwic2hvd1Byb2dyZXNzQmFyXCIsIGRlZmF1bHQ6IFwib2ZmXCIsIGNob2ljZXM6IFtcIm9mZlwiLCBcInRvcFwiLCBcImJvdHRvbVwiXSB9LFxyXG4gICAgeyBuYW1lOiBcInN0b3JlT3RoZXJzQXNDb21tZW50OmJvb2xlYW5cIiwgZGVmYXVsdDogdHJ1ZSB9LCBcImdvTmV4dFBhZ2VBdXRvbWF0aWM6Ym9vbGVhblwiLCBcImNsZWFySW52aXNpYmxlVmFsdWVzOmJvb2xlYW5cIixcclxuICAgIHsgbmFtZTogXCJwYWdlUHJldlRleHRcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmoucGFnZVByZXZUZXh0VmFsdWU7IH0gfSxcclxuICAgIHsgbmFtZTogXCJwYWdlTmV4dFRleHRcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmoucGFnZU5leHRUZXh0VmFsdWU7IH0gfSxcclxuICAgIHsgbmFtZTogXCJjb21wbGV0ZVRleHRcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmouY29tcGxldGVUZXh0VmFsdWU7IH0gfSxcclxuICAgIHsgbmFtZTogXCJyZXF1aXJlZFRleHRcIiwgZGVmYXVsdDogXCIqXCIgfSwgXCJxdWVzdGlvblN0YXJ0SW5kZXhcIiwgXCJxdWVzdGlvblRpdGxlVGVtcGxhdGVcIl0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3N1cnZleS50c1xuICoqLyIsImV4cG9ydCBjbGFzcyBkeFN1cnZleVNlcnZpY2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBzZXJ2aWNlVXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vZHhzdXJ2ZXlhcGkuYXp1cmV3ZWJzaXRlcy5uZXQvYXBpL1N1cnZleVwiO1xyXG4gICAgLy9wdWJsaWMgc3RhdGljIHNlcnZpY2VVcmw6IHN0cmluZyA9IFwiaHR0cDovL2xvY2FsaG9zdDo1MDQ4OC9hcGkvU3VydmV5XCI7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsb2FkU3VydmV5KHN1cnZleUlkOiBzdHJpbmcsIG9uTG9hZDogKHN1Y2Nlc3M6IGJvb2xlYW4sIHJlc3VsdDogc3RyaW5nLCByZXNwb25zZTogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCBkeFN1cnZleVNlcnZpY2Uuc2VydmljZVVybCArICcvZ2V0U3VydmV5P3N1cnZleUlkPScgKyBzdXJ2ZXlJZCk7XHJcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBvbkxvYWQoeGhyLnN0YXR1cyA9PSAyMDAsIHJlc3VsdCwgeGhyLnJlc3BvbnNlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2VuZFJlc3VsdChwb3N0SWQ6IHN0cmluZywgcmVzdWx0OiBKU09OLCBvblNlbmRSZXN1bHQ6IChzdWNjZXNzOiBib29sZWFuLCByZXNwb25zZTogYW55KT0+IHZvaWQsIGNsaWVudElkOiBzdHJpbmcgPSBudWxsLCBpc1BhcnRpYWxDb21wbGV0ZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignUE9TVCcsIGR4U3VydmV5U2VydmljZS5zZXJ2aWNlVXJsICsgJy9wb3N0LycpO1xyXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xyXG4gICAgICAgIHZhciBkYXRhID0geyBwb3N0SWQ6IHBvc3RJZCwgc3VydmV5UmVzdWx0OiBKU09OLnN0cmluZ2lmeShyZXN1bHQpIH07XHJcbiAgICAgICAgaWYgKGNsaWVudElkKSBkYXRhWydjbGllbnRJZCddID0gY2xpZW50SWQ7XHJcbiAgICAgICAgaWYgKGlzUGFydGlhbENvbXBsZXRlZCkgZGF0YVsnaXNQYXJ0aWFsQ29tcGxldGVkJ10gPSB0cnVlO1xyXG4gICAgICAgIHZhciBkYXRhU3RyaW5naWZ5OiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIW9uU2VuZFJlc3VsdCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBvblNlbmRSZXN1bHQoeGhyLnN0YXR1cyA9PSAyMDAsIHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIuc2VuZChkYXRhU3RyaW5naWZ5KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZW5kRmlsZShwb3N0SWQ6IHN0cmluZywgZmlsZTogRmlsZSwgb25TZW5kRmlsZTogKHN1Y2Nlc3M6IGJvb2xlYW4sIHJlc3BvbnNlOiBhbnkpID0+IHZvaWQpIHtcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIW9uU2VuZEZpbGUpIHJldHVybjtcclxuICAgICAgICAgICAgb25TZW5kRmlsZSh4aHIuc3RhdHVzID09IDIwMCwgSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCBkeFN1cnZleVNlcnZpY2Uuc2VydmljZVVybCArICcvdXBsb2FkLycsIHRydWUpO1xyXG4gICAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChcImZpbGVcIiwgZmlsZSk7XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwicG9zdElkXCIsIHBvc3RJZCk7XHJcbiAgICAgICAgeGhyLnNlbmQoZm9ybURhdGEpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFJlc3VsdChyZXN1bHRJZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIG9uR2V0UmVzdWx0OiAoc3VjY2VzczogYm9vbGVhbiwgZGF0YTogYW55LCBkYXRhTGlzdDogQXJyYXk8YW55PiwgcmVzcG9uc2U6IGFueSkgPT4gdm9pZCkge1xyXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB2YXIgZGF0YSA9ICdyZXN1bHRJZD0nICsgcmVzdWx0SWQgKyAnJm5hbWU9JyArIG5hbWU7XHJcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIGR4U3VydmV5U2VydmljZS5zZXJ2aWNlVXJsICsgJy9nZXRSZXN1bHQ/JyArIGRhdGEpO1xyXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgbGlzdCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgbGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc3VsdC5RdWVzdGlvblJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IHsgbmFtZToga2V5LCB2YWx1ZTogcmVzdWx0LlF1ZXN0aW9uUmVzdWx0W2tleV0gfTtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2goZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9uR2V0UmVzdWx0KHhoci5zdGF0dXMgPT0gMjAwLCByZXN1bHQsIGxpc3QsIHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzQ29tcGxldGVkKHJlc3VsdElkOiBzdHJpbmcsIGNsaWVudElkOiBzdHJpbmcsIG9uSXNDb21wbGV0ZWQ6IChzdWNjZXNzOiBib29sZWFuLCByZXN1bHQ6IHN0cmluZywgcmVzcG9uc2U6IGFueSkgPT4gdm9pZCkge1xyXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB2YXIgZGF0YSA9ICdyZXN1bHRJZD0nICsgcmVzdWx0SWQgKyAnJmNsaWVudElkPScgKyBjbGllbnRJZDtcclxuICAgICAgICB4aHIub3BlbignR0VUJywgZHhTdXJ2ZXlTZXJ2aWNlLnNlcnZpY2VVcmwgKyAnL2lzQ29tcGxldGVkPycgKyBkYXRhKTtcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb25Jc0NvbXBsZXRlZCh4aHIuc3RhdHVzID09IDIwMCwgcmVzdWx0LCB4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2R4U3VydmV5U2VydmljZS50c1xuICoqLyIsImltcG9ydCB7QmFzZSwgSGFzaFRhYmxlfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4vanNvbm9iamVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyaWdnZXIgZXh0ZW5kcyBCYXNlIHtcclxuICAgIHN0YXRpYyBvcGVyYXRvcnNWYWx1ZTogSGFzaFRhYmxlPEZ1bmN0aW9uPiA9IG51bGw7XHJcbiAgICBzdGF0aWMgZ2V0IG9wZXJhdG9ycygpIHtcclxuICAgICAgICBpZiAoVHJpZ2dlci5vcGVyYXRvcnNWYWx1ZSAhPSBudWxsKSByZXR1cm4gVHJpZ2dlci5vcGVyYXRvcnNWYWx1ZTtcclxuICAgICAgICBUcmlnZ2VyLm9wZXJhdG9yc1ZhbHVlID0ge1xyXG4gICAgICAgICAgICBlbXB0eTogZnVuY3Rpb24gKHZhbHVlLCBleHBlY3RlZFZhbHVlKSB7IHJldHVybiAhdmFsdWU7IH0sXHJcbiAgICAgICAgICAgIG5vdGVtcHR5OiBmdW5jdGlvbiAodmFsdWUsIGV4cGVjdGVkVmFsdWUpIHsgcmV0dXJuICEoIXZhbHVlKTsgfSxcclxuICAgICAgICAgICAgZXF1YWw6IGZ1bmN0aW9uICh2YWx1ZSwgZXhwZWN0ZWRWYWx1ZSkgeyByZXR1cm4gdmFsdWUgPT0gZXhwZWN0ZWRWYWx1ZTsgfSxcclxuICAgICAgICAgICAgbm90ZXF1YWw6IGZ1bmN0aW9uICh2YWx1ZSwgZXhwZWN0ZWRWYWx1ZSkgeyByZXR1cm4gdmFsdWUgIT0gZXhwZWN0ZWRWYWx1ZTsgfSxcclxuICAgICAgICAgICAgY29udGFpbnM6IGZ1bmN0aW9uICh2YWx1ZSwgZXhwZWN0ZWRWYWx1ZSkgeyByZXR1cm4gdmFsdWUgJiYgdmFsdWVbXCJpbmRleE9mXCJdICYmIHZhbHVlLmluZGV4T2YoZXhwZWN0ZWRWYWx1ZSkgPiAtMTsgfSxcclxuICAgICAgICAgICAgbm90Y29udGFpbnM6IGZ1bmN0aW9uICh2YWx1ZSwgZXhwZWN0ZWRWYWx1ZSkgeyByZXR1cm4gIXZhbHVlIHx8ICF2YWx1ZVtcImluZGV4T2ZcIl0gfHwgdmFsdWUuaW5kZXhPZihleHBlY3RlZFZhbHVlKSA9PSAtMTsgfSxcclxuICAgICAgICAgICAgZ3JlYXRlcjogZnVuY3Rpb24gKHZhbHVlLCBleHBlY3RlZFZhbHVlKSB7IHJldHVybiB2YWx1ZSA+IGV4cGVjdGVkVmFsdWU7IH0sXHJcbiAgICAgICAgICAgIGxlc3M6IGZ1bmN0aW9uICh2YWx1ZSwgZXhwZWN0ZWRWYWx1ZSkgeyByZXR1cm4gdmFsdWUgPCBleHBlY3RlZFZhbHVlOyB9LFxyXG4gICAgICAgICAgICBncmVhdGVyb3JlcXVhbDogZnVuY3Rpb24gKHZhbHVlLCBleHBlY3RlZFZhbHVlKSB7IHJldHVybiB2YWx1ZSA+PSBleHBlY3RlZFZhbHVlOyB9LFxyXG4gICAgICAgICAgICBsZXNzb3JlcXVhbDogZnVuY3Rpb24gKHZhbHVlLCBleHBlY3RlZFZhbHVlKSB7IHJldHVybiB2YWx1ZSA8PSBleHBlY3RlZFZhbHVlOyB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gVHJpZ2dlci5vcGVyYXRvcnNWYWx1ZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb3BWYWx1ZTogc3RyaW5nID0gXCJlcXVhbFwiO1xyXG4gICAgcHVibGljIHZhbHVlOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBvcGVyYXRvcigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IG9wZXJhdG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmICghVHJpZ2dlci5vcGVyYXRvcnNbdmFsdWVdKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5vcFZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2hlY2sodmFsdWU6IGFueSkge1xyXG4gICAgICAgIGlmIChUcmlnZ2VyLm9wZXJhdG9yc1t0aGlzLm9wZXJhdG9yXSh2YWx1ZSwgdGhpcy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5vblN1Y2Nlc3MoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uRmFpbHVyZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblN1Y2Nlc3MoKSB7IH1cclxuICAgIHByb3RlY3RlZCBvbkZhaWx1cmUoKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3VydmV5VHJpZ2dlck93bmVyIHtcclxuICAgIGdldE9iamVjdHMocGFnZXM6IHN0cmluZ1tdLCBxdWVzdGlvbnM6IHN0cmluZ1tdKTogYW55W107XHJcbiAgICBkb0NvbXBsZXRlKCk7XHJcbiAgICBzZXRUcmlnZ2VyVmFsdWUobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55LCBpc1ZhcmlhYmxlOiBib29sZWFuKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN1cnZleVRyaWdnZXIgZXh0ZW5kcyBUcmlnZ2VyIHtcclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgb3duZXI6IElTdXJ2ZXlUcmlnZ2VyT3duZXIgPSBudWxsO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRPd25lcihvd25lcjogSVN1cnZleVRyaWdnZXJPd25lcikge1xyXG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXNPbk5leHRQYWdlKCkgeyByZXR1cm4gZmFsc2U7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN1cnZleVRyaWdnZXJWaXNpYmxlIGV4dGVuZHMgU3VydmV5VHJpZ2dlciB7XHJcbiAgICBwdWJsaWMgcGFnZXM6IHN0cmluZ1tdID0gW107XHJcbiAgICBwdWJsaWMgcXVlc3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7IHJldHVybiBcInZpc2libGV0cmlnZ2VyXCI7IH1cclxuICAgIHByb3RlY3RlZCBvblN1Y2Nlc3MoKSB7IHRoaXMub25UcmlnZ2VyKHRoaXMub25JdGVtU3VjY2Vzcyk7IH1cclxuICAgIHByb3RlY3RlZCBvbkZhaWx1cmUoKSB7IHRoaXMub25UcmlnZ2VyKHRoaXMub25JdGVtRmFpbHVyZSk7IH1cclxuICAgIHByaXZhdGUgb25UcmlnZ2VyKGZ1bmM6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm93bmVyKSByZXR1cm47XHJcbiAgICAgICAgdmFyIG9iamVjdHMgPSB0aGlzLm93bmVyLmdldE9iamVjdHModGhpcy5wYWdlcywgdGhpcy5xdWVzdGlvbnMpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmdW5jKG9iamVjdHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkl0ZW1TdWNjZXNzKGl0ZW06IGFueSkgeyBpdGVtLnZpc2libGUgPSB0cnVlOyB9XHJcbiAgICBwcm90ZWN0ZWQgb25JdGVtRmFpbHVyZShpdGVtOiBhbnkpIHsgaXRlbS52aXNpYmxlID0gZmFsc2U7IH1cclxufVxyXG5leHBvcnQgY2xhc3MgU3VydmV5VHJpZ2dlckNvbXBsZXRlIGV4dGVuZHMgU3VydmV5VHJpZ2dlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIFwiY29tcGxldGV0cmlnZ2VyXCI7IH1cclxuICAgIHB1YmxpYyBnZXQgaXNPbk5leHRQYWdlKCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgcHJvdGVjdGVkIG9uU3VjY2VzcygpIHsgaWYgKHRoaXMub3duZXIpIHRoaXMub3duZXIuZG9Db21wbGV0ZSgpOyB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFN1cnZleVRyaWdnZXJTZXRWYWx1ZSBleHRlbmRzIFN1cnZleVRyaWdnZXIge1xyXG4gICAgcHVibGljIHNldFRvTmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNldFZhbHVlOiBhbnk7XHJcbiAgICBwdWJsaWMgaXNWYXJpYWJsZTogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJzZXR2YWx1ZXRyaWdnZXJcIjsgfVxyXG4gICAgcHJvdGVjdGVkIG9uU3VjY2VzcygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2V0VG9OYW1lIHx8ICF0aGlzLm93bmVyKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5vd25lci5zZXRUcmlnZ2VyVmFsdWUodGhpcy5zZXRUb05hbWUsIHRoaXMuc2V0VmFsdWUsIHRoaXMuaXNWYXJpYWJsZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJ0cmlnZ2VyXCIsIFtcIm9wZXJhdG9yXCIsIFwiIXZhbHVlXCJdKTtcclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcInN1cnZleXRyaWdnZXJcIiwgW1wiIW5hbWVcIl0sIG51bGwsIFwidHJpZ2dlclwiKTtcclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcInZpc2libGV0cmlnZ2VyXCIsIFtcInBhZ2VzXCIsIFwicXVlc3Rpb25zXCJdLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU3VydmV5VHJpZ2dlclZpc2libGUoKTsgfSwgXCJzdXJ2ZXl0cmlnZ2VyXCIpO1xyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwiY29tcGxldGV0cmlnZ2VyXCIsIFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU3VydmV5VHJpZ2dlckNvbXBsZXRlKCk7IH0sIFwic3VydmV5dHJpZ2dlclwiKTtcclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcInNldHZhbHVldHJpZ2dlclwiLCBbXCIhc2V0VG9OYW1lXCIsIFwic2V0VmFsdWVcIiwgXCJpc1ZhcmlhYmxlOmJvb2xlYW5cIl0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTdXJ2ZXlUcmlnZ2VyU2V0VmFsdWUoKTsgfSwgXCJzdXJ2ZXl0cmlnZ2VyXCIpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RyaWdnZXIudHNcbiAqKi8iLCJpbXBvcnQge0Jhc2V9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtTdXJ2ZXlNb2RlbH0gZnJvbSBcIi4vc3VydmV5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3VydmV5V2luZG93TW9kZWwgZXh0ZW5kcyBCYXNlICB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHN1cnZleUVsZW1lbnROYW1lID0gXCJ3aW5kb3dTdXJ2ZXlKU1wiO1xyXG4gICAgc3VydmV5VmFsdWU6IFN1cnZleU1vZGVsO1xyXG4gICAgd2luZG93RWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBpc1Nob3dpbmdWYWx1ZTogYm9vbGVhbjtcclxuICAgIGlzRXhwYW5kZWRWYWx1ZTogYm9vbGVhbjtcclxuICAgIHRpdGxlVmFsdWU6IHN0cmluZztcclxuICAgIHRlbXBsYXRlVmFsdWU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihqc29uT2JqOiBhbnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc3VydmV5VmFsdWUgPSB0aGlzLmNyZWF0ZVN1cnZleShqc29uT2JqKTtcclxuICAgICAgICB0aGlzLnN1cnZleVZhbHVlLnNob3dUaXRsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMud2luZG93RWxlbWVudCA9IDxIVE1MRGl2RWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKSA6IHN0cmluZyB7IHJldHVybiBcIndpbmRvd1wiIH1cclxuICAgIHB1YmxpYyBnZXQgc3VydmV5KCk6IFN1cnZleU1vZGVsIHsgcmV0dXJuIHRoaXMuc3VydmV5VmFsdWU7IH1cclxuICAgIHB1YmxpYyBnZXQgaXNTaG93aW5nKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5pc1Nob3dpbmdWYWx1ZTsgfVxyXG4gICAgcHVibGljIGdldCBpc0V4cGFuZGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5pc0V4cGFuZGVkVmFsdWU7IH1cclxuICAgIHB1YmxpYyBnZXQgdGl0bGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudGl0bGVWYWx1ZSA/IHRoaXMudGl0bGVWYWx1ZSA6IHRoaXMuc3VydmV5LnRpdGxlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHsgdGhpcy50aXRsZVZhbHVlID0gdmFsdWU7IH1cclxuICAgIHB1YmxpYyBleHBhbmQoKSB7XHJcbiAgICAgICAgdGhpcy5leHBhbmRjb2xsYXBzZSh0cnVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjb2xsYXBzZSgpIHtcclxuICAgICAgICB0aGlzLmV4cGFuZGNvbGxhcHNlKGZhbHNlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVTdXJ2ZXkoanNvbk9iajogYW55KTogU3VydmV5TW9kZWwge1xyXG4gICAgICAgIHJldHVybiBuZXcgU3VydmV5TW9kZWwoanNvbk9iailcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBleHBhbmRjb2xsYXBzZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuaXNFeHBhbmRlZFZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zdXJ2ZXlXaW5kb3cudHNcbiAqKi8iLCJleHBvcnQgdmFyIHN1cnZleUNzcyA9IHtcclxuICAgIGN1cnJlbnRUeXBlOiBcIlwiLFxyXG4gICAgZ2V0Q3NzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGxvYyA9IHRoaXMuY3VycmVudFR5cGUgPyB0aGlzW3RoaXMuY3VycmVudFR5cGVdIDogZGVmYXVsdFN0YW5kYXJkQ3NzO1xyXG4gICAgICAgIGlmICghbG9jKSBsb2MgPSBkZWZhdWx0U3RhbmRhcmRDc3M7XHJcbiAgICAgICAgcmV0dXJuIGxvYztcclxuICAgIH0sXHJcbn07XHJcblxyXG5leHBvcnQgdmFyIGRlZmF1bHRTdGFuZGFyZENzcyA9IHtcclxuICAgIHJvb3Q6IFwic3ZfbWFpblwiLFxyXG4gICAgaGVhZGVyOiBcIlwiLFxyXG4gICAgYm9keTogXCJzdl9ib2R5XCIsXHJcbiAgICBmb290ZXI6IFwic3ZfbmF2XCIsXHJcbiAgICBuYXZpZ2F0aW9uQnV0dG9uOiBcIlwiLCBuYXZpZ2F0aW9uOiB7IGNvbXBsZXRlOiBcIlwiLCBwcmV2OlwiXCIsIG5leHQ6IFwiXCJ9LFxyXG4gICAgcHJvZ3Jlc3M6IFwic3ZfcHJvZ3Jlc3NcIiwgcHJvZ3Jlc3NCYXI6IFwiXCIsXHJcbiAgICBwYWdlVGl0bGU6IFwic3ZfcF90aXRsZVwiLFxyXG4gICAgcm93OiBcInN2X3Jvd1wiLFxyXG4gICAgcXVlc3Rpb246IHsgcm9vdDogXCJzdl9xXCIsIHRpdGxlOiBcInN2X3FfdGl0bGVcIiwgY29tbWVudDogXCJcIiwgaW5kZW50OiAyMCB9LFxyXG4gICAgZXJyb3I6IHsgcm9vdDogXCJzdl9xX2VyYm94XCIsIGljb246IFwiXCIsIGl0ZW06IFwiXCIgfSxcclxuXHJcbiAgICBjaGVja2JveDogeyByb290OiBcInN2X3FjYmNcIiwgaXRlbTogXCJzdl9xX2NoZWNrYm94XCIsIG90aGVyOiBcInN2X3Ffb3RoZXJcIiB9LFxyXG4gICAgY29tbWVudDogXCJcIixcclxuICAgIGRyb3Bkb3duOiBcIlwiLFxyXG4gICAgbWF0cml4OiB7IHJvb3Q6IFwic3ZfcV9tYXRyaXhcIiB9LFxyXG4gICAgbWF0cml4ZHJvcGRvd246IHsgcm9vdDogXCJzdl9xX21hdHJpeFwiIH0sXHJcbiAgICBtYXRyaXhkeW5hbWljOiB7IHJvb3Q6IFwidGFibGVcIiwgYnV0dG9uOiBcIlwiIH0sXHJcbiAgICBtdWx0aXBsZXRleHQ6IHsgcm9vdDogXCJcIiwgaXRlbVRpdGxlOiBcIlwiLCBpdGVtVmFsdWU6IFwiXCIgfSxcclxuICAgIHJhZGlvZ3JvdXA6IHsgcm9vdDogXCJzdl9xY2JjXCIsIGl0ZW06IFwic3ZfcV9yYWRpb2dyb3VwXCIsIG90aGVyOiBcInN2X3Ffb3RoZXJcIiB9LFxyXG4gICAgcmF0aW5nOiB7IHJvb3Q6IFwic3ZfcV9yYXRpbmdcIiwgaXRlbTogXCJzdl9xX3JhdGluZ19pdGVtXCIgfSxcclxuICAgIHRleHQ6IFwiXCIsXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgICByb290OiBcInN2X3dpbmRvd1wiLCBib2R5OiBcInN2X3dpbmRvd19jb250ZW50XCIsXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgIHJvb3Q6IFwic3Zfd2luZG93X3RpdGxlXCIsIHRpdGxlOiBcIlwiLCBidXR0b246IFwiXCIsIGJ1dHRvbkV4cGFuZGVkOiBcIlwiLCBidXR0b25Db2xsYXBzZWQ6IFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5zdXJ2ZXlDc3NbXCJzdGFuZGFyZFwiXSA9IGRlZmF1bHRTdGFuZGFyZENzcztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWZhdWx0Q3NzL2Nzc3N0YW5kYXJkLnRzXG4gKiovIiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XHJcbmltcG9ydCB7U3VydmV5TW9kZWx9IGZyb20gXCIuLi9zdXJ2ZXlcIjtcclxuaW1wb3J0IHtFdmVudH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHtQYWdlfSBmcm9tIFwiLi9rb3BhZ2VcIjtcclxuaW1wb3J0IHtQYWdlTW9kZWx9IGZyb20gXCIuLi9wYWdlXCI7XHJcbmltcG9ydCB7c3VydmV5Q3NzfSBmcm9tIFwiLi4vZGVmYXVsdENzcy9jc3NzdGFuZGFyZFwiO1xyXG5pbXBvcnQge2tvVGVtcGxhdGV9IGZyb20gXCIuL3RlbXBsYXRlLmtvLmh0bWxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXkgZXh0ZW5kcyBTdXJ2ZXlNb2RlbCB7XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldCBjc3NUeXBlKCk6IHN0cmluZyB7IHJldHVybiBzdXJ2ZXlDc3MuY3VycmVudFR5cGU7IH1cclxuICAgIHB1YmxpYyBzdGF0aWMgc2V0IGNzc1R5cGUodmFsdWU6IHN0cmluZykgeyBzdXJ2ZXlDc3MuY3VycmVudFR5cGUgPSB2YWx1ZTsgfVxyXG4gICAgcHJpdmF0ZSByZW5kZXJlZEVsZW1lbnQ6IEhUTUxFbGVtZW50O1xyXG4gICAgcHVibGljIG9uUmVuZGVyZWQ6IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsKSA9PiBhbnksIGFueT4gPSBuZXcgRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwpID0+IGFueSwgYW55PigpO1xyXG5cclxuICAgIGtvQ3VycmVudFBhZ2U6IGFueTsga29Jc0ZpcnN0UGFnZTogYW55OyBrb0lzTGFzdFBhZ2U6IGFueTsgZHVtbXlPYnNlcnZhYmxlOiBhbnk7IGtvU3RhdGU6IGFueTtcclxuICAgIGtvUHJvZ3Jlc3M6IGFueTsga29Qcm9ncmVzc1RleHQ6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihqc29uT2JqOiBhbnkgPSBudWxsLCByZW5kZXJlZEVsZW1lbnQ6IGFueSA9IG51bGwsIGNzczogYW55ID0gbnVsbCkge1xyXG4gICAgICAgIHN1cGVyKGpzb25PYmopO1xyXG4gICAgICAgIGlmIChjc3MpIHtcclxuICAgICAgICAgICAgdGhpcy5jc3MgPSBjc3M7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZW5kZXJlZEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlZEVsZW1lbnQgPSByZW5kZXJlZEVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2Yga28gPT09ICd1bmRlZmluZWQnKSB0aHJvdyBuZXcgRXJyb3IoJ2tub2Nrb3V0anMgbGlicmFyeSBpcyBub3QgbG9hZGVkLicpO1xyXG4gICAgICAgIHRoaXMucmVuZGVyKHJlbmRlcmVkRWxlbWVudCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNzc05hdmlnYXRpb25Db21wbGV0ZSgpIHsgcmV0dXJuIHRoaXMuZ2V0TmF2aWdhdGlvbkNzcyh0aGlzLmNzcy5uYXZpZ2F0aW9uQnV0dG9uLCB0aGlzLmNzcy5uYXZpZ2F0aW9uLmNvbXBsZXRlKTsgfVxyXG4gICAgcHVibGljIGdldCBjc3NOYXZpZ2F0aW9uUHJldigpIHsgcmV0dXJuIHRoaXMuZ2V0TmF2aWdhdGlvbkNzcyh0aGlzLmNzcy5uYXZpZ2F0aW9uQnV0dG9uLCB0aGlzLmNzcy5uYXZpZ2F0aW9uLnByZXYpOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGNzc05hdmlnYXRpb25OZXh0KCkgeyByZXR1cm4gdGhpcy5nZXROYXZpZ2F0aW9uQ3NzKHRoaXMuY3NzLm5hdmlnYXRpb25CdXR0b24sIHRoaXMuY3NzLm5hdmlnYXRpb24ubmV4dCk7IH1cclxuICAgIHByaXZhdGUgZ2V0TmF2aWdhdGlvbkNzcyhtYWluOiBzdHJpbmcsIGJ0bjogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIHJlcyA9IFwiXCI7XHJcbiAgICAgICAgaWYgKG1haW4pIHJlcyA9IG1haW47XHJcbiAgICAgICAgaWYgKGJ0bikgcmVzICs9ICcgJyArIGJ0bjtcclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBjc3MoKTogYW55IHsgcmV0dXJuIHN1cnZleUNzcy5nZXRDc3MoKTsgfVxyXG4gICAgcHVibGljIHNldCBjc3ModmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMubWVyZ2VWYWx1ZXModmFsdWUsIHRoaXMuY3NzKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW5kZXIoZWxlbWVudDogYW55ID0gbnVsbCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAoZWxlbWVudCAmJiB0eXBlb2YgZWxlbWVudCA9PSBcInN0cmluZ1wiKSB7XHJcbiAgICAgICAgICAgIGVsZW1lbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlZEVsZW1lbnQgPSBlbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBlbGVtZW50ID0gdGhpcy5yZW5kZXJlZEVsZW1lbnQ7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50KSByZXR1cm47XHJcbiAgICAgICAgZWxlbWVudC5pbm5lckhUTUwgPSB0aGlzLmdldFRlbXBsYXRlKCk7XHJcbiAgICAgICAgc2VsZi5hcHBseUJpbmRpbmcoKTtcclxuICAgICAgICBzZWxmLm9uUmVuZGVyZWQuZmlyZShzZWxmLCB7fSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbG9hZFN1cnZleUZyb21TZXJ2aWNlKHN1cnZleUlkOiBzdHJpbmcgPSBudWxsLCByZW5kZXJlZEVsZW1lbnQ6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBpZiAocmVuZGVyZWRFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVuZGVyZWRFbGVtZW50ID0gcmVuZGVyZWRFbGVtZW50O1xyXG4gICAgICAgIH1cclxuICAgICAgICBzdXBlci5sb2FkU3VydmV5RnJvbVNlcnZpY2Uoc3VydmV5SWQpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHNldENvbXBsZXRlZCgpIHtcclxuICAgICAgICBzdXBlci5zZXRDb21wbGV0ZWQoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUtvQ3VycmVudFBhZ2UoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVOZXdQYWdlKG5hbWU6IHN0cmluZykgeyByZXR1cm4gbmV3IFBhZ2UobmFtZSk7IH1cclxuICAgIHByb3RlY3RlZCBnZXRUZW1wbGF0ZSgpOiBzdHJpbmcgeyByZXR1cm4ga29UZW1wbGF0ZS5odG1sOyB9XHJcbiAgICBwcm90ZWN0ZWQgb25CZWZvcmVDcmVhdGluZygpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kdW1teU9ic2VydmFibGUgPSBrby5vYnNlcnZhYmxlKDApO1xyXG4gICAgICAgIHRoaXMua29DdXJyZW50UGFnZSA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uICgpIHsgc2VsZi5kdW1teU9ic2VydmFibGUoKTsgcmV0dXJuIHNlbGYuY3VycmVudFBhZ2U7IH0pO1xyXG4gICAgICAgIHRoaXMua29Jc0ZpcnN0UGFnZSA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uICgpIHsgc2VsZi5kdW1teU9ic2VydmFibGUoKTsgcmV0dXJuIHNlbGYuaXNGaXJzdFBhZ2U7IH0pO1xyXG4gICAgICAgIHRoaXMua29Jc0xhc3RQYWdlID0ga28uY29tcHV0ZWQoZnVuY3Rpb24gKCkgeyBzZWxmLmR1bW15T2JzZXJ2YWJsZSgpOyByZXR1cm4gc2VsZi5pc0xhc3RQYWdlOyB9KTtcclxuICAgICAgICB0aGlzLmtvUHJvZ3Jlc3NUZXh0ID0ga28uY29tcHV0ZWQoZnVuY3Rpb24gKCkgeyBzZWxmLmR1bW15T2JzZXJ2YWJsZSgpOyByZXR1cm4gc2VsZi5wcm9ncmVzc1RleHQ7IH0pO1xyXG4gICAgICAgIHRoaXMua29Qcm9ncmVzcyA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uICgpIHsgc2VsZi5kdW1teU9ic2VydmFibGUoKTsgcmV0dXJuIHNlbGYuZ2V0UHJvZ3Jlc3MoKTsgfSk7XHJcbiAgICAgICAgdGhpcy5rb1N0YXRlID0ga28uY29tcHV0ZWQoZnVuY3Rpb24gKCkgeyBzZWxmLmR1bW15T2JzZXJ2YWJsZSgpOyByZXR1cm4gc2VsZi5zdGF0ZTsgfSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3VycmVudFBhZ2VDaGFuZ2VkKG5ld1ZhbHVlOiBQYWdlTW9kZWwsIG9sZFZhbHVlOiBQYWdlTW9kZWwpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZUtvQ3VycmVudFBhZ2UoKTtcclxuICAgICAgICBzdXBlci5jdXJyZW50UGFnZUNoYW5nZWQobmV3VmFsdWUsIG9sZFZhbHVlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkxvYWRTdXJ2ZXlGcm9tU2VydmljZSgpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZGluZ1N1cnZleUZyb21TZXJ2aWNlKCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFwcGx5QmluZGluZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMucmVuZGVyZWRFbGVtZW50KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy51cGRhdGVLb0N1cnJlbnRQYWdlKCk7XHJcbiAgICAgICAga28uY2xlYW5Ob2RlKHRoaXMucmVuZGVyZWRFbGVtZW50KTtcclxuICAgICAgICBrby5hcHBseUJpbmRpbmdzKHRoaXMsIHRoaXMucmVuZGVyZWRFbGVtZW50KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgdXBkYXRlS29DdXJyZW50UGFnZSgpIHtcclxuICAgICAgICB0aGlzLmR1bW15T2JzZXJ2YWJsZSh0aGlzLmR1bW15T2JzZXJ2YWJsZSgpICsgMSk7XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rbm9ja291dC9rb3N1cnZleS50c1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zNl9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwia29cIixcImNvbW1vbmpzMlwiOlwia25vY2tvdXRcIixcImNvbW1vbmpzXCI6XCJrbm9ja291dFwiLFwiYW1kXCI6XCJrbm9ja291dFwifVxuICoqIG1vZHVsZSBpZCA9IDM2XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgKiBhcyBrbyBmcm9tIFwia25vY2tvdXRcIjtcclxuaW1wb3J0IHtQYWdlTW9kZWwsIFF1ZXN0aW9uUm93TW9kZWx9IGZyb20gXCIuLi9wYWdlXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4uL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkJhc2V9IGZyb20gXCIuLi9xdWVzdGlvbmJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblJvdyBleHRlbmRzIFF1ZXN0aW9uUm93TW9kZWwge1xyXG4gICAga29WaXNpYmxlOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFnZTogUGFnZU1vZGVsLCBwdWJsaWMgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSkge1xyXG4gICAgICAgIHN1cGVyKHBhZ2UsIHF1ZXN0aW9uKTtcclxuICAgICAgICB0aGlzLmtvVmlzaWJsZSA9IGtvLm9ic2VydmFibGUodGhpcy52aXNpYmxlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblZpc2libGVDaGFuZ2VkKCkge1xyXG4gICAgICAgIHRoaXMua29WaXNpYmxlKHRoaXMudmlzaWJsZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMga29BZnRlclJlbmRlcihlbCwgY29uKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgdEVsID0gZWxbaV07XHJcbiAgICAgICAgICAgIHZhciBuTmFtZSA9IHRFbC5ub2RlTmFtZTtcclxuICAgICAgICAgICAgaWYgKG5OYW1lID09IFwiI3RleHRcIikgdEVsLmRhdGEgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhZ2UgZXh0ZW5kcyBQYWdlTW9kZWwge1xyXG4gICAga29ObzogYW55O1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMua29ObyA9IGtvLm9ic2VydmFibGUoXCJcIik7XHJcbiAgICAgICAgdGhpcy5vbkNyZWF0aW5nKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlUm93KHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBRdWVzdGlvblJvd01vZGVsIHsgcmV0dXJuIG5ldyBRdWVzdGlvblJvdyh0aGlzLCBxdWVzdGlvbik7IH1cclxuICAgIHByb3RlY3RlZCBvbkNyZWF0aW5nKCkgeyB9XHJcbiAgICBwcm90ZWN0ZWQgb25OdW1DaGFuZ2VkKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmtvTm8odmFsdWUgPiAwID8gdmFsdWUgKyBcIi4gXCIgOiBcIlwiKTtcclxuICAgIH1cclxufVxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLm92ZXJyaWRlQ2xhc3NDcmVhdG9yZShcInBhZ2VcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBhZ2UoKTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMva25vY2tvdXQva29wYWdlLnRzXG4gKiovIiwiZXhwb3J0IHZhciBrb1RlbXBsYXRlID0geyBodG1sIDogXCJcIn07IGtvVGVtcGxhdGUuaHRtbCA9ICc8c2NyaXB0IHR5cGU9XCJ0ZXh0L2h0bWxcIiBpZD1cInN1cnZleS1jb21tZW50XCI+ICA8aW5wdXQgZGF0YS1iaW5kPVwidmFsdWU6JGRhdGEucXVlc3Rpb24ua29Db21tZW50LCB2aXNpYmxlOiRkYXRhLnZpc2libGUsIGNzczogJHJvb3QuY3NzLnF1ZXN0aW9uLmNvbW1lbnRcIiAvPjwvc2NyaXB0PjxkaXYgZGF0YS1iaW5kPVwiY3NzOiAkcm9vdC5jc3Mucm9vdFwiPiAgICA8ZGl2IGRhdGEtYmluZD1cInZpc2libGU6ICh0aXRsZS5sZW5ndGggPiAwKSAmJiBzaG93VGl0bGUgJiYga29TdGF0ZSgpICE9IFxcJ2NvbXBsZXRlZFxcJywgY3NzOiAkcm9vdC5jc3MuaGVhZGVyXCI+ICAgICAgICA8aDMgZGF0YS1iaW5kPVwidGV4dDp0aXRsZVwiPjwvaDM+ICAgIDwvZGl2PiAgICA8IS0tIGtvIGlmOiBrb1N0YXRlKCkgPT0gXCJydW5uaW5nXCIgLS0+ICAgIDxkaXYgZGF0YS1iaW5kPVwiY3NzOiAkcm9vdC5jc3MuYm9keVwiPiAgICAgICAgPGRpdiBkYXRhLWJpbmQ9XCJ2aXNpYmxlOiBzaG93UHJvZ3Jlc3NCYXIgPT1cXCd0b3BcXCcsIHRlbXBsYXRlOiB7IG5hbWU6IFxcJ3N1cnZleS1wcm9ncmVzc1xcJywgZGF0YTogJGRhdGEgfVwiPjwvZGl2PiAgICAgICAgPGRpdiBkYXRhLWJpbmQ9XCJ0ZW1wbGF0ZTogeyBuYW1lOiBcXCdzdXJ2ZXktcGFnZVxcJywgZGF0YToga29DdXJyZW50UGFnZSB9XCI+PC9kaXY+ICAgICAgICA8ZGl2IHN0eWxlPVwibWFyZ2luLXRvcDoxMHB4XCIgZGF0YS1iaW5kPVwidmlzaWJsZTogc2hvd1Byb2dyZXNzQmFyID09XFwnYm90dG9tXFwnLCB0ZW1wbGF0ZTogeyBuYW1lOiBcXCdzdXJ2ZXktcHJvZ3Jlc3NcXCcsIGRhdGE6ICRkYXRhIH1cIj48L2Rpdj4gICAgPC9kaXY+ICAgIDxkaXYgZGF0YS1iaW5kPVwidmlzaWJsZTogc2hvd05hdmlnYXRpb25CdXR0b25zICYmICFpc0Rlc2lnbk1vZGUsIGNzczogJHJvb3QuY3NzLmZvb3RlclwiPiAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogcGFnZVByZXZUZXh0LCBjbGljazogcHJldlBhZ2UsIHZpc2libGU6ICFrb0lzRmlyc3RQYWdlKCksIGNzczogJHJvb3QuY3NzTmF2aWdhdGlvblByZXZcIiAvPiAgICAgICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBkYXRhLWJpbmQ9XCJ2YWx1ZTogcGFnZU5leHRUZXh0LCBjbGljazogbmV4dFBhZ2UsIHZpc2libGU6ICFrb0lzTGFzdFBhZ2UoKSwgY3NzOiAkcm9vdC5jc3NOYXZpZ2F0aW9uTmV4dFwiIC8+ICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGRhdGEtYmluZD1cInZhbHVlOiBjb21wbGV0ZVRleHQsIGNsaWNrOiBjb21wbGV0ZUxhc3RQYWdlLCB2aXNpYmxlOiBrb0lzTGFzdFBhZ2UoKSwgY3NzOiAkcm9vdC5jc3NOYXZpZ2F0aW9uQ29tcGxldGVcIiAvPiAgICA8L2Rpdj4gICAgPCEtLSAva28gLS0+ICAgIDwhLS0ga28gaWY6IGtvU3RhdGUoKSA9PSBcImNvbXBsZXRlZFwiIC0tPiAgICA8ZGl2IGRhdGEtYmluZD1cImh0bWw6IHByb2Nlc3NlZENvbXBsZXRlZEh0bWxcIj48L2Rpdj4gICAgPCEtLSAva28gLS0+ICAgIDwhLS0ga28gaWY6IGtvU3RhdGUoKSA9PSBcImxvYWRpbmdcIiAtLT4gICAgPGRpdiBkYXRhLWJpbmQ9XCJodG1sOiBwcm9jZXNzZWRMb2FkaW5nSHRtbFwiPjwvZGl2PiAgICA8IS0tIC9rbyAtLT4gICAgPCEtLSBrbyBpZjoga29TdGF0ZSgpID09IFwiZW1wdHlcIiAtLT4gICAgPGRpdiBkYXRhLWJpbmQ9XCJ0ZXh0OmVtcHR5U3VydmV5VGV4dCwgY3NzOiAkcm9vdC5jc3MuYm9keVwiPjwvZGl2PiAgICA8IS0tIC9rbyAtLT48L2Rpdj48c2NyaXB0IHR5cGU9XCJ0ZXh0L2h0bWxcIiBpZD1cInN1cnZleS1wYWdlXCI+ICAgIDxoNCBkYXRhLWJpbmQ9XCJ2aXNpYmxlOiAodGl0bGUubGVuZ3RoID4gMCkgJiYgZGF0YS5zaG93UGFnZVRpdGxlcywgdGV4dDoga29ObygpICsgcHJvY2Vzc2VkVGl0bGUsIGNzczogJHJvb3QuY3NzLnBhZ2VUaXRsZVwiPjwvaDQ+ICAgIDwhLS0ga28gZm9yZWFjaDogeyBkYXRhOiByb3dzLCBhczogXFwncm93XFwnfSAtLT4gICAgPGRpdiBkYXRhLWJpbmQ9XCJ2aXNpYmxlOiByb3cua29WaXNpYmxlLCBjc3M6ICRyb290LmNzcy5yb3dcIj4gICAgICAgIDwhLS0ga28gZm9yZWFjaDogeyBkYXRhOiByb3cucXVlc3Rpb25zLCBhczogXFwncXVlc3Rpb25cXCcgLCBhZnRlclJlbmRlcjogcm93LmtvQWZ0ZXJSZW5kZXIgfSAtLT4gICAgICAgICAgICA8IS0tIGtvIHRlbXBsYXRlOiB7IG5hbWU6IFxcJ3N1cnZleS1xdWVzdGlvblxcJywgZGF0YTogcXVlc3Rpb24gfSAtLT48IS0tIC9rbyAtLT4gICAgICAgIDwhLS0gL2tvIC0tPiAgICA8L2Rpdj4gICAgPCEtLSAva28gLS0+PC9zY3JpcHQ+PHNjcmlwdCB0eXBlPVwidGV4dC9odG1sXCIgaWQ9XCJzdXJ2ZXktcHJvZ3Jlc3NcIj4gICAgPGRpdiBzdHlsZT1cIndpZHRoOjYwJTtcIiBkYXRhLWJpbmQ9XCJjc3M6ICRyb290LmNzcy5wcm9ncmVzc1wiPiAgICAgICAgPGRpdiBkYXRhLWJpbmQ9XCJjc3M6ICRyb290LmNzcy5wcm9ncmVzc0Jhciwgc3R5bGU6e3dpZHRoOiBrb1Byb2dyZXNzKCkgKyBcXCclXFwnfVwiICAgICAgICAgICAgIHJvbGU9XCJwcm9ncmVzc2JhclwiIGFyaWEtdmFsdWVtaW49XCIwXCIgICAgICAgICAgICAgYXJpYS12YWx1ZW1heD1cIjEwMFwiPiAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZD1cInRleHQ6a29Qcm9ncmVzc1RleHRcIj48L3NwYW4+ICAgICAgICA8L2Rpdj4gICAgPC9kaXY+PC9zY3JpcHQ+PHNjcmlwdCB0eXBlPVwidGV4dC9odG1sXCIgaWQ9XCJzdXJ2ZXktcXVlc3Rpb24tY2hlY2tib3hcIj4gICAgPGZvcm0gZGF0YS1iaW5kPVwiY3NzOiAkcm9vdC5jc3MuY2hlY2tib3gucm9vdFwiPiAgICAgICAgPCEtLSBrbyBmb3JlYWNoOiB7IGRhdGE6IHF1ZXN0aW9uLmtvVmlzaWJsZUNob2ljZXMsIGFzOiBcXCdpdGVtXFwnLCBhZnRlclJlbmRlcjogcXVlc3Rpb24ua29BZnRlclJlbmRlcn0gIC0tPiAgICAgICAgPGRpdiBkYXRhLWJpbmQ9XCJzdHlsZTp7d2lkdGg6IHF1ZXN0aW9uLmtvV2lkdGgsIFxcJ21hcmdpbi1yaWdodFxcJzogcXVlc3Rpb24uY29sQ291bnQgPT0gMCA/IFxcJzVweFxcJzogXFwnMHB4XFwnfSwgY3NzOiAkcm9vdC5jc3MuY2hlY2tib3guaXRlbVwiPiAgICAgICAgICAgIDxsYWJlbCBkYXRhLWJpbmQ9XCJjc3M6ICRyb290LmNzcy5jaGVja2JveC5pdGVtXCI+ICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBkYXRhLWJpbmQ9XCJhdHRyOiB7bmFtZTogcXVlc3Rpb24ubmFtZSwgdmFsdWU6IGl0ZW0udmFsdWV9LCBjaGVja2VkOiBxdWVzdGlvbi5rb1ZhbHVlXCIgLz4gICAgICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kPVwidGV4dDogaXRlbS50ZXh0XCI+PC9zcGFuPiAgICAgICAgICAgIDwvbGFiZWw+ICAgICAgICAgICAgPGRpdiBkYXRhLWJpbmQ9XCJ2aXNpYmxlOiBxdWVzdGlvbi5oYXNPdGhlciAmJiAoJGluZGV4KCkgPT0gcXVlc3Rpb24ua29WaXNpYmxlQ2hvaWNlcygpLmxlbmd0aC0xKVwiPiAgICAgICAgICAgICAgICA8ZGl2IGRhdGEtYmluZD1cInRlbXBsYXRlOiB7IG5hbWU6IFxcJ3N1cnZleS1jb21tZW50XFwnLCBkYXRhOiB7XFwncXVlc3Rpb25cXCc6IHF1ZXN0aW9uLCBcXCd2aXNpYmxlXFwnOiBxdWVzdGlvbi5rb090aGVyVmlzaWJsZSB9IH0sIGNzczogJHJvb3QuY3NzLmNoZWNrYm94Lm90aGVyXCI+PC9kaXY+ICAgICAgICAgICAgPC9kaXY+ICAgICAgICA8L2Rpdj4gICAgICAgIDwhLS0gL2tvIC0tPiAgICA8L2Zvcm0+PC9zY3JpcHQ+PHNjcmlwdCB0eXBlPVwidGV4dC9odG1sXCIgaWQ9XCJzdXJ2ZXktcXVlc3Rpb24tY29tbWVudFwiPiAgICA8dGV4dGFyZWEgdHlwZT1cInRleHRcIiBkYXRhLWJpbmQ9XCJhdHRyOiB7Y29sczogcXVlc3Rpb24uY29scywgcm93czogcXVlc3Rpb24ucm93c30sIHZhbHVlOnF1ZXN0aW9uLmtvVmFsdWUsIGNzczogJHJvb3QuY3NzLmNvbW1lbnRcIiAvPjwvc2NyaXB0PjxzY3JpcHQgdHlwZT1cInRleHQvaHRtbFwiIGlkPVwic3VydmV5LXF1ZXN0aW9uLWRyb3Bkb3duXCI+ICAgIDxzZWxlY3QgZGF0YS1iaW5kPVwib3B0aW9uczogcXVlc3Rpb24ua29WaXNpYmxlQ2hvaWNlcywgb3B0aW9uc1RleHQ6IFxcJ3RleHRcXCcsIG9wdGlvbnNWYWx1ZTogXFwndmFsdWVcXCcsIHZhbHVlOiBxdWVzdGlvbi5rb1ZhbHVlLCBvcHRpb25zQ2FwdGlvbjogcXVlc3Rpb24ub3B0aW9uc0NhcHRpb24sIGNzczogJHJvb3QuY3NzLmRyb3Bkb3duXCI+PC9zZWxlY3Q+ICAgIDxkaXYgZGF0YS1iaW5kPVwidmlzaWJsZTogcXVlc3Rpb24uaGFzT3RoZXJcIj4gICAgICAgIDxkaXYgZGF0YS1iaW5kPVwidGVtcGxhdGU6IHsgbmFtZTogXFwnc3VydmV5LWNvbW1lbnRcXCcsIGRhdGE6IHtcXCdxdWVzdGlvblxcJzogcXVlc3Rpb24sIFxcJ3Zpc2libGVcXCc6IHF1ZXN0aW9uLmtvT3RoZXJWaXNpYmxlIH0gfVwiPjwvZGl2PiAgICA8L2Rpdj48L3NjcmlwdD48c2NyaXB0IHR5cGU9XCJ0ZXh0L2h0bWxcIiBpZD1cInN1cnZleS1xdWVzdGlvbi1lcnJvcnNcIj4gICAgPGRpdiByb2xlPVwiYWxlcnRcIiBkYXRhLWJpbmQ9XCJ2aXNpYmxlOiBrb0Vycm9ycygpLmxlbmd0aCA+IDAsIGZvcmVhY2g6IHsgZGF0YToga29FcnJvcnMsIGFzOiBcXCdlcnJvclxcJ30sIGNzczogJHJvb3QuY3NzLmVycm9yLnJvb3RcIj4gICAgICAgIDxkaXY+ICAgICAgICAgICAgPHNwYW4gYXJpYS1oaWRkZW49XCJ0cnVlXCIgZGF0YS1iaW5kPVwiY3NzOiAkcm9vdC5jc3MuZXJyb3IuaWNvblwiPjwvc3Bhbj4gICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OmVycm9yLmdldFRleHQoKSwgY3NzOiAkcm9vdC5jc3MuZXJyb3IuaXRlbVwiPjwvc3Bhbj4gICAgICAgIDwvZGl2PiAgICA8L2Rpdj48L3NjcmlwdD48c2NyaXB0IHR5cGU9XCJ0ZXh0L2h0bWxcIiBpZD1cInN1cnZleS1xdWVzdGlvbi1maWxlXCI+ICAgIDxpbnB1dCB0eXBlPVwiZmlsZVwiIGRhdGEtYmluZD1cImV2ZW50OiB7Y2hhbmdlOiBkb2NoYW5nZX1cIj4gICAgPGRpdj4gICAgICAgIDxpbWcgZGF0YS1iaW5kPVwiYXR0cjogeyBzcmM6IHF1ZXN0aW9uLmtvRGF0YSwgaGVpZ2h0OiBxdWVzdGlvbi5pbWFnZUhlaWdodCwgd2lkdGg6IHF1ZXN0aW9uLmltYWdlV2lkdGggfSwgdmlzaWJsZTogcXVlc3Rpb24ua29IYXNWYWx1ZVwiPiAgICA8L2Rpdj48L3NjcmlwdD48c2NyaXB0IHR5cGU9XCJ0ZXh0L2h0bWxcIiBpZD1cInN1cnZleS1xdWVzdGlvbi1odG1sXCI+ICAgIDxkaXYgZGF0YS1iaW5kPVwiaHRtbDogcXVlc3Rpb24ucHJvY2Vzc2VkSHRtbFwiPjwvZGl2Pjwvc2NyaXB0PjxzY3JpcHQgdHlwZT1cInRleHQvaHRtbFwiIGlkPVwic3VydmV5LXF1ZXN0aW9uLW1hdHJpeFwiPiAgICA8dGFibGUgZGF0YS1iaW5kPVwiY3NzOiAkcm9vdC5jc3MubWF0cml4LnJvb3RcIj4gICAgICAgIDx0aGVhZD4gICAgICAgICAgICA8dHI+ICAgICAgICAgICAgICAgIDx0aCBkYXRhLWJpbmQ9XCJ2aXNpYmxlOiBxdWVzdGlvbi5oYXNSb3dzXCI+PC90aD4gICAgICAgICAgICAgICAgPCEtLSBrbyBmb3JlYWNoOiBxdWVzdGlvbi5jb2x1bW5zIC0tPiAgICAgICAgICAgICAgICA8dGggZGF0YS1iaW5kPVwidGV4dDokZGF0YS50ZXh0XCI+PC90aD4gICAgICAgICAgICAgICAgPCEtLSAva28gLS0+ICAgICAgICAgICAgPC90cj4gICAgICAgIDwvdGhlYWQ+ICAgICAgICA8dGJvZHk+ICAgICAgICAgICAgPCEtLSBrbyBmb3JlYWNoOiB7IGRhdGE6IHF1ZXN0aW9uLnZpc2libGVSb3dzLCBhczogXFwncm93XFwnIH0gLS0+ICAgICAgICAgICAgPHRyPiAgICAgICAgICAgICAgICA8dGQgZGF0YS1iaW5kPVwidmlzaWJsZTogcXVlc3Rpb24uaGFzUm93cywgdGV4dDpyb3cudGV4dFwiPjwvdGQ+ICAgICAgICAgICAgICAgIDwhLS0ga28gZm9yZWFjaDogcXVlc3Rpb24uY29sdW1ucyAtLT4gICAgICAgICAgICAgICAgPHRkPiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGRhdGEtYmluZD1cImF0dHI6IHtuYW1lOiByb3cuZnVsbE5hbWUsIHZhbHVlOiAkZGF0YS52YWx1ZX0sIGNoZWNrZWQ6IHJvdy5rb1ZhbHVlXCIvPiAgICAgICAgICAgICAgICA8L3RkPiAgICAgICAgICAgICAgICA8IS0tIC9rbyAtLT4gICAgICAgICAgICA8L3RyPiAgICAgICAgICAgIDwhLS0gL2tvIC0tPiAgICAgICAgPC90Ym9keT4gICAgPC90YWJsZT48L3NjcmlwdD48c2NyaXB0IHR5cGU9XCJ0ZXh0L2h0bWxcIiBpZD1cInN1cnZleS1xdWVzdGlvbi1tYXRyaXhkcm9wZG93blwiPiAgICA8ZGl2IGRhdGEtYmluZD1cInN0eWxlOiB7b3ZlcmZsb3dYOiBxdWVzdGlvbi5ob3Jpem9udGFsU2Nyb2xsPyBcXCdzY3JvbGxcXCc6IFxcJ1xcJ31cIj4gICAgICAgIDx0YWJsZSBkYXRhLWJpbmQ9XCJjc3M6ICRyb290LmNzcy5tYXRyaXhkcm9wZG93bi5yb290XCI+ICAgICAgICAgICAgPHRoZWFkPiAgICAgICAgICAgICAgICA8dHI+ICAgICAgICAgICAgICAgICAgICA8dGg+PC90aD4gICAgICAgICAgICAgICAgICAgIDwhLS0ga28gZm9yZWFjaDogcXVlc3Rpb24uY29sdW1ucyAtLT4gICAgICAgICAgICAgICAgICAgIDx0aCBkYXRhLWJpbmQ9XCJ0ZXh0OiBxdWVzdGlvbi5nZXRDb2x1bW5UaXRsZSgkZGF0YSksIHN0eWxlOiB7IG1pbldpZHRoOiBxdWVzdGlvbi5nZXRDb2x1bW5XaWR0aCgkZGF0YSkgfVwiPjwvdGg+ICAgICAgICAgICAgICAgICAgICA8IS0tIC9rbyAtLT4gICAgICAgICAgICAgICAgPC90cj4gICAgICAgICAgICA8L3RoZWFkPiAgICAgICAgICAgIDx0Ym9keT4gICAgICAgICAgICAgICAgPCEtLSBrbyBmb3JlYWNoOiB7IGRhdGE6IHF1ZXN0aW9uLnZpc2libGVSb3dzLCBhczogXFwncm93XFwnIH0gLS0+ICAgICAgICAgICAgICAgIDx0cj4gICAgICAgICAgICAgICAgICAgIDx0ZCBkYXRhLWJpbmQ9XCJ0ZXh0OnJvdy50ZXh0XCI+PC90ZD4gICAgICAgICAgICAgICAgICAgIDwhLS0ga28gZm9yZWFjaDogcm93LmNlbGxzLS0+ICAgICAgICAgICAgICAgICAgICA8dGQ+ICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBrbyB0ZW1wbGF0ZTogeyBuYW1lOiBcXCdzdXJ2ZXktcXVlc3Rpb24tXFwnICsgJGRhdGEucXVlc3Rpb24uZ2V0VHlwZSgpLCBkYXRhOiAkZGF0YS5xdWVzdGlvbiwgYXM6IFxcJ3F1ZXN0aW9uXFwnIH0gLS0+ICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAva28gLS0+ICAgICAgICAgICAgICAgICAgICA8L3RkPiAgICAgICAgICAgICAgICAgICAgPCEtLSAva28gLS0+ICAgICAgICAgICAgICAgIDwvdHI+ICAgICAgICAgICAgICAgIDwhLS0gL2tvIC0tPiAgICAgICAgICAgIDwvdGJvZHk+ICAgICAgICA8L3RhYmxlPiAgICA8L2Rpdj48L3NjcmlwdD48c2NyaXB0IHR5cGU9XCJ0ZXh0L2h0bWxcIiBpZD1cInN1cnZleS1xdWVzdGlvbi1tYXRyaXhkeW5hbWljXCI+ICAgIDxkaXYgZGF0YS1iaW5kPVwic3R5bGU6IHtvdmVyZmxvd1g6IHF1ZXN0aW9uLmhvcml6b250YWxTY3JvbGw/IFxcJ3Njcm9sbFxcJzogXFwnXFwnfVwiPiAgICAgICAgPHRhYmxlIGRhdGEtYmluZD1cImNzczogJHJvb3QuY3NzLm1hdHJpeGR5bmFtaWMucm9vdFwiPiAgICAgICAgICAgIDx0aGVhZD4gICAgICAgICAgICAgICAgPHRyPiAgICAgICAgICAgICAgICAgICAgPCEtLSBrbyBmb3JlYWNoOiBxdWVzdGlvbi5jb2x1bW5zIC0tPiAgICAgICAgICAgICAgICAgICAgPHRoIGRhdGEtYmluZD1cInRleHQ6IHF1ZXN0aW9uLmdldENvbHVtblRpdGxlKCRkYXRhKSwgc3R5bGU6IHsgbWluV2lkdGg6IHF1ZXN0aW9uLmdldENvbHVtbldpZHRoKCRkYXRhKSB9XCI+PC90aD4gICAgICAgICAgICAgICAgICAgIDwhLS0gL2tvIC0tPiAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+ICAgICAgICAgICAgICAgIDwvdHI+ICAgICAgICAgICAgPC90aGVhZD4gICAgICAgICAgICA8dGJvZHk+ICAgICAgICAgICAgICAgIDwhLS0ga28gZm9yZWFjaDogeyBkYXRhOiBxdWVzdGlvbi5rb1Jvd3MsIGFzOiBcXCdyb3dcXCcgfSAtLT4gICAgICAgICAgICAgICAgPHRyPiAgICAgICAgICAgICAgICAgICAgPCEtLSBrbyBmb3JlYWNoOiByb3cuY2VsbHMtLT4gICAgICAgICAgICAgICAgICAgIDx0ZD4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIGtvIHRlbXBsYXRlOiB7IG5hbWU6IFxcJ3N1cnZleS1xdWVzdGlvbi1lcnJvcnNcXCcsIGRhdGE6ICRkYXRhLnF1ZXN0aW9uIH0gLS0+ICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAva28gLS0+ICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSBrbyB0ZW1wbGF0ZTogeyBuYW1lOiBcXCdzdXJ2ZXktcXVlc3Rpb24tXFwnICsgJGRhdGEucXVlc3Rpb24uZ2V0VHlwZSgpLCBkYXRhOiAkZGF0YS5xdWVzdGlvbiwgYXM6IFxcJ3F1ZXN0aW9uXFwnIH0gLS0+ICAgICAgICAgICAgICAgICAgICAgICAgPCEtLSAva28gLS0+ICAgICAgICAgICAgICAgICAgICA8L3RkPiAgICAgICAgICAgICAgICAgICAgPCEtLSAva28gLS0+ICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IHR5cGU9XCJidXR0b25cIiBkYXRhLWJpbmQ9XCJjbGljazpxdWVzdGlvbi5rb1JlbW92ZVJvd0NsaWNrLCBjc3M6ICRyb290LmNzcy5tYXRyaXhkeW5hbWljLmJ1dHRvbiwgdmFsdWU6IHF1ZXN0aW9uLnJlbW92ZVJvd1RleHRcIiAvPjwvdGQ+ICAgICAgICAgICAgICAgIDwvdHI+ICAgICAgICAgICAgICAgIDwhLS0gL2tvIC0tPiAgICAgICAgICAgIDwvdGJvZHk+ICAgICAgICA8L3RhYmxlPiAgICA8L2Rpdj4gICAgPGlucHV0IHR5cGU9XCJidXR0b25cIiBkYXRhLWJpbmQ9XCJjbGljazpxdWVzdGlvbi5rb0FkZFJvd0NsaWNrLCBjc3M6ICRyb290LmNzcy5tYXRyaXhkeW5hbWljLmJ1dHRvbiwgdmFsdWU6IHF1ZXN0aW9uLmFkZFJvd1RleHRcIiAvPjwvc2NyaXB0PjxzY3JpcHQgdHlwZT1cInRleHQvaHRtbFwiIGlkPVwic3VydmV5LXF1ZXN0aW9uLW11bHRpcGxldGV4dFwiPiAgICA8dGFibGUgZGF0YS1iaW5kPVwiY3NzOiAkcm9vdC5jc3MubXVsdGlwbGV0ZXh0LnJvb3QsIGZvcmVhY2g6IHsgZGF0YTogIHF1ZXN0aW9uLmtvUm93cywgYXM6IFxcJ3Jvd1xcJyB9XCI+ICAgICAgICA8dHIgZGF0YS1iaW5kPVwiZm9yZWFjaDogeyBkYXRhOiByb3csIGFzOiBcXCdpdGVtXFwnIH1cIj4gICAgICAgICAgICA8dGQgZGF0YS1iaW5kPVwidGV4dDogaXRlbS50aXRsZSwgY3NzOiAkcm9vdC5jc3MubXVsdGlwbGV0ZXh0Lml0ZW1UaXRsZVwiPjwvdGQ+ICAgICAgICAgICAgPHRkPjxpbnB1dCB0eXBlPVwidGV4dFwiIHN0eWxlPVwiZmxvYXQ6bGVmdFwiIGRhdGEtYmluZD1cImF0dHI6IHtzaXplOiBxdWVzdGlvbi5pdGVtU2l6ZX0sIHZhbHVlOiBpdGVtLmtvVmFsdWUsIGNzczogJHJvb3QuY3NzLm11bHRpcGxldGV4dC5pdGVtVmFsdWVcIiAvPjwvdGQ+ICAgICAgICA8L3RyPiAgICA8L3RhYmxlPjwvc2NyaXB0PjxzY3JpcHQgdHlwZT1cInRleHQvaHRtbFwiIGlkPVwic3VydmV5LXF1ZXN0aW9uLXJhZGlvZ3JvdXBcIj4gICAgPGZvcm0gZGF0YS1iaW5kPVwiY3NzOiAkcm9vdC5jc3MucmFkaW9ncm91cC5yb290XCI+ICAgICAgICA8IS0tIGtvIGZvcmVhY2g6IHsgZGF0YTogcXVlc3Rpb24ua29WaXNpYmxlQ2hvaWNlcywgYXM6IFxcJ2l0ZW1cXCcsIGFmdGVyUmVuZGVyOiBxdWVzdGlvbi5rb0FmdGVyUmVuZGVyfSAgLS0+ICAgICAgICA8ZGl2ICBkYXRhLWJpbmQ9XCJzdHlsZTp7d2lkdGg6IHF1ZXN0aW9uLmtvV2lkdGgsIFxcJ21hcmdpbi1yaWdodFxcJzogcXVlc3Rpb24uY29sQ291bnQgPT0gMCA/IFxcJzVweFxcJzogXFwnMHB4XFwnfSwgY3NzOiAkcm9vdC5jc3MucmFkaW9ncm91cC5pdGVtXCI+ICAgICAgICAgICAgPGxhYmVsIGRhdGEtYmluZD1cImNzczogJHJvb3QuY3NzLnJhZGlvZ3JvdXAuaXRlbVwiPiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgZGF0YS1iaW5kPVwiYXR0cjoge25hbWU6IHF1ZXN0aW9uLm5hbWUsIHZhbHVlOiBpdGVtLnZhbHVlfSwgY2hlY2tlZDogcXVlc3Rpb24ua29WYWx1ZVwiIC8+ICAgICAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZD1cInRleHQ6IGl0ZW0udGV4dFwiPjwvc3Bhbj4gICAgICAgICAgICA8L2xhYmVsPiAgICAgICAgICAgIDxkaXYgZGF0YS1iaW5kPVwidmlzaWJsZTogcXVlc3Rpb24uaGFzT3RoZXIgJiYgKCRpbmRleCgpID09IHF1ZXN0aW9uLmtvVmlzaWJsZUNob2ljZXMoKS5sZW5ndGgtMSlcIj4gICAgICAgICAgICAgICAgPGRpdiBkYXRhLWJpbmQ9XCJ0ZW1wbGF0ZTogeyBuYW1lOiBcXCdzdXJ2ZXktY29tbWVudFxcJywgZGF0YToge1xcJ3F1ZXN0aW9uXFwnOiBxdWVzdGlvbiwgXFwndmlzaWJsZVxcJzogcXVlc3Rpb24ua29PdGhlclZpc2libGV9fSwgY3NzOiAkcm9vdC5jc3MucmFkaW9ncm91cC5vdGhlclwiPjwvZGl2PiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgPC9kaXY+ICAgICAgICA8IS0tIC9rbyAtLT4gICAgPC9mb3JtPjwvc2NyaXB0PjxzY3JpcHQgdHlwZT1cInRleHQvaHRtbFwiIGlkPVwic3VydmV5LXF1ZXN0aW9uLXJhdGluZ1wiPiAgICA8ZGl2IGRhdGEtdG9nZ2xlPVwiYnV0dG9uc1wiIGRhdGEtYmluZD1cImNzczogJHJvb3QuY3NzLnJhdGluZy5yb290XCI+ICAgICAgICA8IS0tIGtvIGZvcmVhY2g6IHF1ZXN0aW9uLmtvVmlzaWJsZVJhdGVWYWx1ZXMgLS0+ICAgICAgICA8bGFiZWwgZGF0YS1iaW5kPVwiY3NzOiBxdWVzdGlvbi5rb0dldENzcygkZGF0YSlcIj4gICAgICAgICAgICA8aW5wdXQgdHlwZT1cInJhZGlvXCIgICAgICAgICAgICAgICAgICAgIGRhdGEtYmluZD1cImF0dHI6IHtuYW1lOiBxdWVzdGlvbi5uYW1lLCBpZDogcXVlc3Rpb24ubmFtZSArICRpbmRleCgpLCB2YWx1ZTogJGRhdGEudmFsdWV9LCBldmVudDogeyBjaGFuZ2U6IHF1ZXN0aW9uLmtvQ2hhbmdlfVwiIC8+ICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kPVwidmlzaWJsZTogJGluZGV4KCkgPT0gMCwgdGV4dDogcXVlc3Rpb24ubWluaW51bVJhdGVEZXNjcmlwdGlvblwiPjwvc3Bhbj4gICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiAkZGF0YS50ZXh0XCI+PC9zcGFuPiAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZD1cInZpc2libGU6ICRpbmRleCgpID09IChxdWVzdGlvbi5rb1Zpc2libGVSYXRlVmFsdWVzKCkubGVuZ3RoLTEpLCB0ZXh0OiBxdWVzdGlvbi5tYXhpbXVtUmF0ZURlc2NyaXB0aW9uXCI+PC9zcGFuPiAgICAgICAgPC9sYWJlbD4gICAgICAgIDwhLS0gL2tvIC0tPiAgICA8L2Rpdj4gICAgPGRpdiBkYXRhLWJpbmQ9XCJ2aXNpYmxlOiBxdWVzdGlvbi5oYXNPdGhlclwiPiAgICAgICAgPGRpdiBkYXRhLWJpbmQ9XCJ0ZW1wbGF0ZTogeyBuYW1lOiBcXCdzdXJ2ZXktY29tbWVudFxcJywgZGF0YToge1xcJ3F1ZXN0aW9uXFwnOiBxdWVzdGlvbiB9IH1cIj48L2Rpdj4gICAgPC9kaXY+PC9zY3JpcHQ+PHNjcmlwdCB0eXBlPVwidGV4dC9odG1sXCIgaWQ9XCJzdXJ2ZXktcXVlc3Rpb24tdGV4dFwiPiAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBkYXRhLWJpbmQ9XCJhdHRyOiB7c2l6ZTogcXVlc3Rpb24uc2l6ZX0sIHZhbHVlOnF1ZXN0aW9uLmtvVmFsdWUsIGNzczogJHJvb3QuY3NzLnRleHRcIi8+PC9zY3JpcHQ+PHNjcmlwdCB0eXBlPVwidGV4dC9odG1sXCIgaWQ9XCJzdXJ2ZXktcXVlc3Rpb25cIj4gICAgPGRpdiBzdHlsZT1cInZlcnRpY2FsLWFsaWduOnRvcFwiIGRhdGEtYmluZD1cImNzczogJHJvb3QuY3NzLnF1ZXN0aW9uLnJvb3QsIHN0eWxlOiB7ZGlzcGxheTogcXVlc3Rpb24ua29WaXNpYmxlKCkgPyBcXCdpbmxpbmUtYmxvY2tcXCc6IFxcJ25vbmVcXCcsIG1hcmdpbkxlZnQ6IHF1ZXN0aW9uLmtvTWFyZ2luTGVmdCwgcGFkZGluZ1JpZ2h0OiBxdWVzdGlvbi5rb1BhZGRpbmdSaWdodCwgd2lkdGg6IHF1ZXN0aW9uLmtvUmVuZGVyV2lkdGggfSwgYXR0cjoge2lkOiBpZH1cIj4gICAgICAgIDwhLS0ga28gaWY6IHF1ZXN0aW9uLmhhc1RpdGxlIC0tPiAgICAgICAgPGg1IGRhdGEtYmluZD1cInZpc2libGU6ICRyb290LnF1ZXN0aW9uVGl0bGVMb2NhdGlvbiA9PSBcXCd0b3BcXCcsIHRleHQ6IHF1ZXN0aW9uLmtvVGl0bGUoKSwgY3NzOiAkcm9vdC5jc3MucXVlc3Rpb24udGl0bGVcIj48L2g1PiAgICAgICAgPCEtLSAva28gLS0+ICAgICAgICA8IS0tIGtvIHRlbXBsYXRlOiB7IG5hbWU6IFxcJ3N1cnZleS1xdWVzdGlvbi1lcnJvcnNcXCcsIGRhdGE6IHF1ZXN0aW9uIH0gLS0+ICAgICAgICA8IS0tIC9rbyAtLT4gICAgICAgIDwhLS0ga28gdGVtcGxhdGU6IHsgbmFtZTogXFwnc3VydmV5LXF1ZXN0aW9uLVxcJyArIHF1ZXN0aW9uLmdldFR5cGUoKSwgZGF0YTogcXVlc3Rpb24gfSAtLT4gICAgICAgIDwhLS0gL2tvIC0tPiAgICAgICAgPGRpdiBkYXRhLWJpbmQ9XCJ2aXNpYmxlOiBxdWVzdGlvbi5oYXNDb21tZW50XCI+ICAgICAgICAgICAgPGRpdiBkYXRhLWJpbmQ9XCJ0ZXh0OnF1ZXN0aW9uLmNvbW1lbnRUZXh0XCI+PC9kaXY+ICAgICAgICAgICAgPGRpdiBkYXRhLWJpbmQ9XCJ0ZW1wbGF0ZTogeyBuYW1lOiBcXCdzdXJ2ZXktY29tbWVudFxcJywgZGF0YToge1xcJ3F1ZXN0aW9uXFwnOiBxdWVzdGlvbiwgXFwndmlzaWJsZVxcJzogdHJ1ZSB9IH1cIj48L2Rpdj4gICAgICAgIDwvZGl2PiAgICAgICAgPCEtLSBrbyBpZjogcXVlc3Rpb24uaGFzVGl0bGUgLS0+ICAgICAgICA8aDUgZGF0YS1iaW5kPVwidmlzaWJsZTogJHJvb3QucXVlc3Rpb25UaXRsZUxvY2F0aW9uID09IFxcJ2JvdHRvbVxcJywgdGV4dDogcXVlc3Rpb24ua29UaXRsZSgpLCBjc3M6ICRyb290LmNzcy5xdWVzdGlvbi50aXRsZVwiPjwvaDU+ICAgICAgICA8IS0tIC9rbyAtLT4gICAgPC9kaXY+PC9zY3JpcHQ+JztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rbm9ja291dC90ZW1wbGF0ZS5rby5odG1sLnRzXG4gKiovIiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25CYXNlfSBmcm9tIFwiLi4vcXVlc3Rpb25iYXNlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25JbXBsZW1lbnRvckJhc2Uge1xyXG4gICAga29WaXNpYmxlOiBhbnk7IGtvRXJyb3JzOiBhbnk7IGtvTWFyZ2luTGVmdDogYW55OyBrb1BhZGRpbmdSaWdodDogYW55OyBrb1JlbmRlcldpZHRoOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBxdWVzdGlvbi52aXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLm9uVmlzaWJpbGl0eUNoYW5nZWQoKTsgfTtcclxuICAgICAgICBxdWVzdGlvbi5yZW5kZXJXaWR0aENoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgc2VsZi5vblJlbmRlcldpZHRoQ2hhbmdlZCgpOyB9O1xyXG4gICAgICAgIHRoaXMua29WaXNpYmxlID0ga28ub2JzZXJ2YWJsZSh0aGlzLnF1ZXN0aW9uLnZpc2libGUpO1xyXG4gICAgICAgIHRoaXMua29SZW5kZXJXaWR0aCA9IGtvLm9ic2VydmFibGUodGhpcy5xdWVzdGlvbi5yZW5kZXJXaWR0aCk7XHJcbiAgICAgICAgdGhpcy5rb0Vycm9ycyA9IGtvLm9ic2VydmFibGVBcnJheSgpO1xyXG4gICAgICAgIHRoaXMua29NYXJnaW5MZWZ0ID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHsgc2VsZi5rb1JlbmRlcldpZHRoKCk7IHJldHVybiBzZWxmLmdldEluZGVudFNpemUoc2VsZi5xdWVzdGlvbi5pbmRlbnQpOyB9KTtcclxuICAgICAgICB0aGlzLmtvUGFkZGluZ1JpZ2h0ID0ga28ub2JzZXJ2YWJsZShzZWxmLmdldEluZGVudFNpemUoc2VsZi5xdWVzdGlvbi5yaWdodEluZGVudCkpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb1Zpc2libGVcIl0gPSB0aGlzLmtvVmlzaWJsZTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29SZW5kZXJXaWR0aFwiXSA9IHRoaXMua29SZW5kZXJXaWR0aDtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29FcnJvcnNcIl0gPSB0aGlzLmtvRXJyb3JzO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb01hcmdpbkxlZnRcIl0gPSB0aGlzLmtvTWFyZ2luTGVmdDtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29QYWRkaW5nUmlnaHRcIl0gPSB0aGlzLmtvUGFkZGluZ1JpZ2h0O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uVmlzaWJpbGl0eUNoYW5nZWQoKSB7XHJcbiAgICAgICAgdGhpcy5rb1Zpc2libGUodGhpcy5xdWVzdGlvbi52aXNpYmxlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblJlbmRlcldpZHRoQ2hhbmdlZCgpIHtcclxuICAgICAgICB0aGlzLmtvUmVuZGVyV2lkdGgodGhpcy5xdWVzdGlvbi5yZW5kZXJXaWR0aCk7XHJcbiAgICAgICAgdGhpcy5rb1BhZGRpbmdSaWdodCh0aGlzLmdldEluZGVudFNpemUodGhpcy5xdWVzdGlvbi5yaWdodEluZGVudCkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRJbmRlbnRTaXplKGluZGVudDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoaW5kZW50IDwgMSkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXN0aW9uW1wiZGF0YVwiXSkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgdmFyIGNzcyA9IHRoaXMucXVlc3Rpb25bXCJkYXRhXCJdW1wiY3NzXCJdO1xyXG4gICAgICAgIGlmICghY3NzKSByZXR1cm4gXCJcIjtcclxuICAgICAgICByZXR1cm4gaW5kZW50ICogY3NzLnF1ZXN0aW9uLmluZGVudCArIFwicHhcIjtcclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25iYXNlLnRzXG4gKiovIiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25JbXBsZW1lbnRvckJhc2V9IGZyb20gXCIuL2tvcXVlc3Rpb25iYXNlXCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuLi9xdWVzdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uSW1wbGVtZW50b3IgZXh0ZW5kcyBRdWVzdGlvbkltcGxlbWVudG9yQmFzZSB7XHJcbiAgICBwcml2YXRlIGlzVXBkYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUga29EdW1teTogYW55O1xyXG4gICAga29WYWx1ZTogYW55OyBrb0NvbW1lbnQ6IGFueTsga29UaXRsZTogYW55O1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHF1ZXN0aW9uOiBRdWVzdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgcXVlc3Rpb24udmFsdWVDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IHNlbGYub25WYWx1ZUNoYW5nZWQoKTsgfTtcclxuICAgICAgICBxdWVzdGlvbi5jb21tZW50Q2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLm9uQ29tbWVudENoYW5nZWQoKTsgfTtcclxuICAgICAgICBxdWVzdGlvbi5lcnJvcnNDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IHNlbGYub25FcnJvcnNDaGFuZ2VkKCk7IH07XHJcbiAgICAgICAgcXVlc3Rpb24udGl0bGVDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IHNlbGYub25WaXNpYmxlSW5kZXhDaGFuZ2VkKCk7IH07XHJcbiAgICAgICAgcXVlc3Rpb24udmlzaWJsZUluZGV4Q2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLm9uVmlzaWJsZUluZGV4Q2hhbmdlZCgpOyB9O1xyXG4gICAgICAgIHRoaXMua29EdW1teSA9IGtvLm9ic2VydmFibGUoMCk7XHJcbiAgICAgICAgdGhpcy5rb1ZhbHVlID0gdGhpcy5jcmVhdGVrb1ZhbHVlKCk7XHJcbiAgICAgICAgdGhpcy5rb0NvbW1lbnQgPSBrby5vYnNlcnZhYmxlKHRoaXMucXVlc3Rpb24uY29tbWVudCk7XHJcbiAgICAgICAgdGhpcy5rb1RpdGxlID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHsgc2VsZi5rb0R1bW15KCk7IHJldHVybiBzZWxmLnF1ZXN0aW9uLmZ1bGxUaXRsZTsgfSk7XHJcbiAgICAgICAgdGhpcy5rb0Vycm9ycyh0aGlzLnF1ZXN0aW9uLmVycm9ycyk7XHJcbiAgICAgICAgdGhpcy5rb1ZhbHVlLnN1YnNjcmliZShmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgc2VsZi51cGRhdGVWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5rb0NvbW1lbnQuc3Vic2NyaWJlKGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUNvbW1lbnQobmV3VmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb1ZhbHVlXCJdID0gdGhpcy5rb1ZhbHVlO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb0NvbW1lbnRcIl0gPSB0aGlzLmtvQ29tbWVudDtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29UaXRsZVwiXSA9IHRoaXMua29UaXRsZTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblZhbHVlQ2hhbmdlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1VwZGF0aW5nKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zZXRrb1ZhbHVlKHRoaXMucXVlc3Rpb24udmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uQ29tbWVudENoYW5nZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNVcGRhdGluZykgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMua29Db21tZW50KHRoaXMucXVlc3Rpb24uY29tbWVudCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25WaXNpYmlsaXR5Q2hhbmdlZCgpIHtcclxuICAgICAgICB0aGlzLmtvVmlzaWJsZSh0aGlzLnF1ZXN0aW9uLnZpc2libGUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uVmlzaWJsZUluZGV4Q2hhbmdlZCgpIHtcclxuICAgICAgICB0aGlzLmtvRHVtbXkodGhpcy5rb0R1bW15KCkgKyAxKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkVycm9yc0NoYW5nZWQoKSB7XHJcbiAgICAgICAgdGhpcy5rb0Vycm9ycyh0aGlzLnF1ZXN0aW9uLmVycm9ycyk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRla29WYWx1ZSgpOiBhbnkgeyByZXR1cm4ga28ub2JzZXJ2YWJsZSh0aGlzLnF1ZXN0aW9uLnZhbHVlKTsgfVxyXG4gICAgcHJvdGVjdGVkIHNldGtvVmFsdWUobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMua29WYWx1ZShuZXdWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlVmFsdWUobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaXNVcGRhdGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbi52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMuaXNVcGRhdGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZUNvbW1lbnQobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaXNVcGRhdGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbi5jb21tZW50ID0gbmV3VmFsdWU7XHJcbiAgICAgICAgdGhpcy5pc1VwZGF0aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0Tm8oKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5xdWVzdGlvbi52aXNpYmxlSW5kZXggPiAtMSA/IHRoaXMucXVlc3Rpb24udmlzaWJsZUluZGV4ICsgMSArIFwiLiBcIiA6IFwiXCI7XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uLnRzXG4gKiovIiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25JbXBsZW1lbnRvcn0gZnJvbSBcIi4va29xdWVzdGlvblwiO1xyXG5pbXBvcnQge1F1ZXN0aW9ufSBmcm9tIFwiLi4vcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtRdWVzdGlvblNlbGVjdEJhc2UsIFF1ZXN0aW9uQ2hlY2tib3hCYXNlfSBmcm9tIFwiLi4vcXVlc3Rpb25fYmFzZXNlbGVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uU2VsZWN0QmFzZUltcGxlbWVudG9yIGV4dGVuZHMgUXVlc3Rpb25JbXBsZW1lbnRvcntcclxuICAgIGtvT3RoZXJWaXNpYmxlOiBhbnk7IGtvVmlzaWJsZUNob2ljZXM6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcblxyXG4gICAgICAgIHRoaXMua29PdGhlclZpc2libGUgPSBrby5jb21wdXRlZChmdW5jdGlvbiAoKSB7IHNlbGYua29WYWx1ZSgpOyByZXR1cm4gc2VsZi5pc090aGVyU2VsZWN0ZWQ7IH0pO1xyXG4gICAgICAgIHRoaXMua29WaXNpYmxlQ2hvaWNlcyA9IGtvLm9ic2VydmFibGVBcnJheSgoPFF1ZXN0aW9uQ2hlY2tib3hCYXNlPnNlbGYucXVlc3Rpb24pLnZpc2libGVDaG9pY2VzKTtcclxuICAgICAgICAoPFF1ZXN0aW9uQ2hlY2tib3hCYXNlPnF1ZXN0aW9uKS5jaG9pY2VzQ2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLmtvVmlzaWJsZUNob2ljZXMoKDxRdWVzdGlvbkNoZWNrYm94QmFzZT5zZWxmLnF1ZXN0aW9uKS52aXNpYmxlQ2hvaWNlcyk7IH07XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbltcImtvT3RoZXJWaXNpYmxlXCJdID0gdGhpcy5rb090aGVyVmlzaWJsZTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29WaXNpYmxlQ2hvaWNlc1wiXSA9IHRoaXMua29WaXNpYmxlQ2hvaWNlcztcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXQgaXNPdGhlclNlbGVjdGVkKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiAoPFF1ZXN0aW9uU2VsZWN0QmFzZT50aGlzLnF1ZXN0aW9uKS5pc090aGVyU2VsZWN0ZWQ7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ2hlY2tib3hCYXNlSW1wbGVtZW50b3IgZXh0ZW5kcyBRdWVzdGlvblNlbGVjdEJhc2VJbXBsZW1lbnRvciB7XHJcbiAgICBrb1dpZHRoOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihxdWVzdGlvbjogUXVlc3Rpb24pIHtcclxuICAgICAgICBzdXBlcihxdWVzdGlvbik7XHJcbiAgICAgICAgdGhpcy5rb1dpZHRoID0ga28ub2JzZXJ2YWJsZSh0aGlzLmNvbFdpZHRoKTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29XaWR0aFwiXSA9IHRoaXMua29XaWR0aDtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29BZnRlclJlbmRlclwiXSA9IHRoaXMua29BZnRlclJlbmRlcjtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgKDxRdWVzdGlvbkNoZWNrYm94QmFzZT50aGlzLnF1ZXN0aW9uKS5jb2xDb3VudENoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgc2VsZi5vbkNvbENvdW50Q2hhbmdlZCgpOyB9O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uQ29sQ291bnRDaGFuZ2VkKCkge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb1dpZHRoXCJdID0ga28ub2JzZXJ2YWJsZSh0aGlzLmNvbFdpZHRoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXQgY29sV2lkdGgoKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgY29sQ291bnQgPSAoPFF1ZXN0aW9uQ2hlY2tib3hCYXNlPnRoaXMucXVlc3Rpb24pLmNvbENvdW50O1xyXG4gICAgICAgIHJldHVybiBjb2xDb3VudCA+IDAgPyAoMTAwIC8gY29sQ291bnQpICsgJyUnIDogXCJcIjtcclxuICAgIH1cclxuICAgIHByaXZhdGUga29BZnRlclJlbmRlcihlbCwgY29uKSB7XHJcbiAgICAgICAgdmFyIHRFbCA9IGVsWzBdO1xyXG4gICAgICAgIGlmICh0RWwubm9kZU5hbWUgPT0gXCIjdGV4dFwiKSB0RWwuZGF0YSA9IFwiXCI7XHJcbiAgICAgICAgdEVsID0gZWxbZWwubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYgKHRFbC5ub2RlTmFtZSA9PSBcIiN0ZXh0XCIpIHRFbC5kYXRhID0gXCJcIjtcclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fYmFzZXNlbGVjdC50c1xuICoqLyIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uQ2hlY2tib3hCYXNlSW1wbGVtZW50b3J9IGZyb20gXCIuL2tvcXVlc3Rpb25fYmFzZXNlbGVjdFwiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25DaGVja2JveE1vZGVsfSBmcm9tIFwiLi4vcXVlc3Rpb25fY2hlY2tib3hcIjtcclxuaW1wb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4uL3F1ZXN0aW9uXCI7XHJcblxyXG5jbGFzcyBRdWVzdGlvbkNoZWNrYm94SW1wbGVtZW50b3IgZXh0ZW5kcyBRdWVzdGlvbkNoZWNrYm94QmFzZUltcGxlbWVudG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVrb1ZhbHVlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlc3Rpb24udmFsdWUgPyBrby5vYnNlcnZhYmxlQXJyYXkodGhpcy5xdWVzdGlvbi52YWx1ZSkgOiBrby5vYnNlcnZhYmxlQXJyYXkoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzZXRrb1ZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgICAgICBpZiAobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5rb1ZhbHVlKFtdLmNvbmNhdChuZXdWYWx1ZSkpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMua29WYWx1ZShbXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNoZWNrYm94IGV4dGVuZHMgUXVlc3Rpb25DaGVja2JveE1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICBuZXcgUXVlc3Rpb25DaGVja2JveEltcGxlbWVudG9yKHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLm92ZXJyaWRlQ2xhc3NDcmVhdG9yZShcImNoZWNrYm94XCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbkNoZWNrYm94KFwiXCIpOyB9KTtcclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJjaGVja2JveFwiLCAobmFtZSkgPT4geyB2YXIgcSA9IG5ldyBRdWVzdGlvbkNoZWNrYm94KG5hbWUpOyBxLmNob2ljZXMgPSBRdWVzdGlvbkZhY3RvcnkuRGVmYXVsdENob2ljZXM7IHJldHVybiBxOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX2NoZWNrYm94LnRzXG4gKiovIiwiaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4uL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uQ29tbWVudE1vZGVsfSBmcm9tIFwiLi4vcXVlc3Rpb25fY29tbWVudFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uSW1wbGVtZW50b3J9IGZyb20gXCIuL2tvcXVlc3Rpb25cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkNvbW1lbnQgZXh0ZW5kcyBRdWVzdGlvbkNvbW1lbnRNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgbmV3IFF1ZXN0aW9uSW1wbGVtZW50b3IodGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEub3ZlcnJpZGVDbGFzc0NyZWF0b3JlKFwiY29tbWVudFwiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUXVlc3Rpb25Db21tZW50KFwiXCIpOyB9KTtcclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJjb21tZW50XCIsIChuYW1lKSA9PiB7IHJldHVybiBuZXcgUXVlc3Rpb25Db21tZW50KG5hbWUpOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX2NvbW1lbnQudHNcbiAqKi8iLCJpbXBvcnQge1F1ZXN0aW9uRHJvcGRvd25Nb2RlbH0gZnJvbSBcIi4uL3F1ZXN0aW9uX2Ryb3Bkb3duXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4uL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtRdWVzdGlvblNlbGVjdEJhc2VJbXBsZW1lbnRvcn0gZnJvbSBcIi4va29xdWVzdGlvbl9iYXNlc2VsZWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Ecm9wZG93biBleHRlbmRzIFF1ZXN0aW9uRHJvcGRvd25Nb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgbmV3IFF1ZXN0aW9uU2VsZWN0QmFzZUltcGxlbWVudG9yKHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLm92ZXJyaWRlQ2xhc3NDcmVhdG9yZShcImRyb3Bkb3duXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbkRyb3Bkb3duKFwiXCIpOyB9KTtcclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJkcm9wZG93blwiLCAobmFtZSkgPT4geyB2YXIgcSA9IG5ldyBRdWVzdGlvbkRyb3Bkb3duKG5hbWUpOyBxLmNob2ljZXMgPSBRdWVzdGlvbkZhY3RvcnkuRGVmYXVsdENob2ljZXM7IHJldHVybiBxOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX2Ryb3Bkb3duLnRzXG4gKiovIiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4uL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZpbGVNb2RlbH0gZnJvbSBcIi4uL3F1ZXN0aW9uX2ZpbGVcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkltcGxlbWVudG9yfSBmcm9tIFwiLi9rb3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuLi9xdWVzdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uRmlsZUltcGxlbWVudG9yIGV4dGVuZHMgUXVlc3Rpb25JbXBsZW1lbnRvciB7XHJcbiAgICBrb0RhdGFVcGRhdGVyOiBhbnk7IGtvRGF0YTogYW55OyBrb0hhc1ZhbHVlOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihxdWVzdGlvbjogUXVlc3Rpb24pIHtcclxuICAgICAgICBzdXBlcihxdWVzdGlvbik7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMua29EYXRhVXBkYXRlciA9IGtvLm9ic2VydmFibGUoMCk7XHJcbiAgICAgICAgdGhpcy5rb0RhdGEgPSBrby5jb21wdXRlZChmdW5jdGlvbiAoKSB7IHNlbGYua29EYXRhVXBkYXRlcigpOyByZXR1cm4gKDxRdWVzdGlvbkZpbGVNb2RlbD5zZWxmLnF1ZXN0aW9uKS5wcmV2aWV3VmFsdWU7IH0pO1xyXG4gICAgICAgIHRoaXMua29IYXNWYWx1ZSA9IGtvLm9ic2VydmFibGUoZmFsc2UpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb0RhdGFcIl0gPSB0aGlzLmtvRGF0YTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29IYXNWYWx1ZVwiXSA9IHRoaXMua29IYXNWYWx1ZTtcclxuXHJcbiAgICAgICAgKDxRdWVzdGlvbkZpbGVNb2RlbD50aGlzLnF1ZXN0aW9uKS5wcmV2aWV3VmFsdWVMb2FkZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgc2VsZi5vbkxvYWRQcmV2aWV3KCk7IH07XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbltcImRvY2hhbmdlXCJdID0gZnVuY3Rpb24gKGRhdGEsIGV2ZW50KSB7IHZhciBzcmMgPSBldmVudC50YXJnZXQgfHwgZXZlbnQuc3JjRWxlbWVudDsgc2VsZi5vbkNoYW5nZShzcmMpOyB9O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkNoYW5nZShzcmM6IGFueSkge1xyXG4gICAgICAgIGlmICghd2luZG93W1wiRmlsZVJlYWRlclwiXSkgcmV0dXJuO1xyXG4gICAgICAgIGlmICghc3JjIHx8ICFzcmMuZmlsZXMgfHwgc3JjLmZpbGVzLmxlbmd0aCA8IDEpIHJldHVybjtcclxuICAgICAgICAoPFF1ZXN0aW9uRmlsZU1vZGVsPnRoaXMucXVlc3Rpb24pLmxvYWRGaWxlKHNyYy5maWxlc1swXSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uTG9hZFByZXZpZXcoKSB7XHJcbiAgICAgICAgdGhpcy5rb0RhdGFVcGRhdGVyKHRoaXMua29EYXRhVXBkYXRlcigpICsgMSk7XHJcbiAgICAgICAgdGhpcy5rb0hhc1ZhbHVlKHRydWUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkZpbGUgZXh0ZW5kcyBRdWVzdGlvbkZpbGVNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgbmV3IFF1ZXN0aW9uRmlsZUltcGxlbWVudG9yKHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLm92ZXJyaWRlQ2xhc3NDcmVhdG9yZShcImZpbGVcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uRmlsZShcIlwiKTsgfSk7XHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwiZmlsZVwiLCAobmFtZSkgPT4geyByZXR1cm4gbmV3IFF1ZXN0aW9uRmlsZShuYW1lKTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMva25vY2tvdXQva29xdWVzdGlvbl9maWxlLnRzXG4gKiovIiwiaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4uL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uSW1wbGVtZW50b3JCYXNlfSBmcm9tIFwiLi9rb3F1ZXN0aW9uYmFzZVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uSHRtbE1vZGVsfSBmcm9tIFwiLi4vcXVlc3Rpb25faHRtbFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uSHRtbCBleHRlbmRzIFF1ZXN0aW9uSHRtbE1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICBuZXcgUXVlc3Rpb25JbXBsZW1lbnRvckJhc2UodGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEub3ZlcnJpZGVDbGFzc0NyZWF0b3JlKFwiaHRtbFwiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUXVlc3Rpb25IdG1sKFwiXCIpOyB9KTtcclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJodG1sXCIsIChuYW1lKSA9PiB7IHJldHVybiBuZXcgUXVlc3Rpb25IdG1sKG5hbWUpOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX2h0bWwudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBrbyBmcm9tIFwia25vY2tvdXRcIjtcclxuaW1wb3J0IHtRdWVzdGlvbk1hdHJpeE1vZGVsLCBNYXRyaXhSb3dNb2RlbCwgSU1hdHJpeERhdGF9IGZyb20gXCIuLi9xdWVzdGlvbl9tYXRyaXhcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkltcGxlbWVudG9yfSBmcm9tIFwiLi9rb3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4uL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRyaXhSb3cgZXh0ZW5kcyBNYXRyaXhSb3dNb2RlbCB7XHJcbiAgICBwcml2YXRlIGlzVmFsdWVVcGRhdGluZyA9IGZhbHNlO1xyXG4gICAga29WYWx1ZTogYW55O1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IGFueSwgcHVibGljIHRleHQ6IHN0cmluZywgcHVibGljIGZ1bGxOYW1lOiBzdHJpbmcsIGRhdGE6IElNYXRyaXhEYXRhLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgdGV4dCwgZnVsbE5hbWUsIGRhdGEsIHZhbHVlKTtcclxuICAgICAgICB0aGlzLmtvVmFsdWUgPSBrby5vYnNlcnZhYmxlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmtvVmFsdWUuc3Vic2NyaWJlKGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5pc1ZhbHVlVXBkYXRpbmcpIHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYudmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblZhbHVlQ2hhbmdlZCgpIHtcclxuICAgICAgICB0aGlzLmlzVmFsdWVVcGRhdGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5rb1ZhbHVlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgIHRoaXMuaXNWYWx1ZVVwZGF0aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTWF0cml4IGV4dGVuZHMgUXVlc3Rpb25NYXRyaXhNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgbmV3IFF1ZXN0aW9uSW1wbGVtZW50b3IodGhpcyk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlTWF0cml4Um93KG5hbWU6IGFueSwgdGV4dDogc3RyaW5nLCBmdWxsTmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTogTWF0cml4Um93TW9kZWwge1xyXG4gICAgICAgIHJldHVybiBuZXcgTWF0cml4Um93KG5hbWUsIHRleHQsIGZ1bGxOYW1lLCB0aGlzLCB2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEub3ZlcnJpZGVDbGFzc0NyZWF0b3JlKFwibWF0cml4XCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbk1hdHJpeChcIlwiKTsgfSk7XHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwibWF0cml4XCIsIChuYW1lKSA9PiB7IHZhciBxID0gbmV3IFF1ZXN0aW9uTWF0cml4KG5hbWUpOyBxLnJvd3MgPSBbXCJSb3cgMVwiLCBcIlJvdyAyXCJdOyBxLmNvbHVtbnMgPSBbXCJDb2x1bW4gMVwiLCBcIkNvbHVtbiAyXCIsIFwiQ29sdW1uIDNcIl07IHJldHVybiBxOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX21hdHJpeC50c1xuICoqLyIsImltcG9ydCB7UXVlc3Rpb25NYXRyaXhEcm9wZG93bk1vZGVsfSBmcm9tIFwiLi4vcXVlc3Rpb25fbWF0cml4ZHJvcGRvd25cIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4uL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uSW1wbGVtZW50b3J9IGZyb20gXCIuL2tvcXVlc3Rpb25cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbk1hdHJpeERyb3Bkb3duIGV4dGVuZHMgUXVlc3Rpb25NYXRyaXhEcm9wZG93bk1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICBuZXcgUXVlc3Rpb25JbXBsZW1lbnRvcih0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5vdmVycmlkZUNsYXNzQ3JlYXRvcmUoXCJtYXRyaXhkcm9wZG93blwiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUXVlc3Rpb25NYXRyaXhEcm9wZG93bihcIlwiKTsgfSk7XHJcblxyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcIm1hdHJpeGRyb3Bkb3duXCIsIChuYW1lKSA9PiB7IHZhciBxID0gbmV3IFF1ZXN0aW9uTWF0cml4RHJvcGRvd24obmFtZSk7IHEuY2hvaWNlcyA9IFsxLCAyLCAzLCA0LCA1XTsgcS5yb3dzID0gW1wiUm93IDFcIiwgXCJSb3cgMlwiXTsgcS5hZGRDb2x1bW4oXCJDb2x1bW4gMVwiKTsgcS5hZGRDb2x1bW4oXCJDb2x1bW4gMlwiKTsgcS5hZGRDb2x1bW4oXCJDb2x1bW4gM1wiKTsgcmV0dXJuIHE7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fbWF0cml4ZHJvcGRvd24udHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBrbyBmcm9tIFwia25vY2tvdXRcIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4uL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uSW1wbGVtZW50b3J9IGZyb20gXCIuL2tvcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtRdWVzdGlvbk1hdHJpeER5bmFtaWNNb2RlbH0gZnJvbSBcIi4uL3F1ZXN0aW9uX21hdHJpeGR5bmFtaWNcIjtcclxuaW1wb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4uL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7UXVlc3Rpb25NYXRyaXhEcm9wZG93bk1vZGVsQmFzZX0gZnJvbSBcIi4uL3F1ZXN0aW9uX21hdHJpeGRyb3Bkb3duYmFzZVwiO1xyXG5pbXBvcnQge01hdHJpeER5bmFtaWNSb3dNb2RlbH0gZnJvbSBcIi4uL3F1ZXN0aW9uX21hdHJpeGR5bmFtaWNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbk1hdHJpeER5bmFtaWNJbXBsZW1lbnRvciBleHRlbmRzIFF1ZXN0aW9uSW1wbGVtZW50b3Ige1xyXG4gICAga29Sb3dzOiBhbnk7IGtvUmVjYWxjOiBhbnk7XHJcbiAgICBrb0FkZFJvd0NsaWNrOiBhbnk7IGtvUmVtb3ZlUm93Q2xpY2s6IGFueTsga29PdmVyZmxvd1g6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uKTtcclxuICAgICAgICB0aGlzLmtvUmVjYWxjID0ga28ub2JzZXJ2YWJsZSgwKTtcclxuICAgICAgICB0aGlzLmtvUm93cyA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHRoaXMua29SZWNhbGMoKTsgcmV0dXJuICg8UXVlc3Rpb25NYXRyaXhEeW5hbWljPnRoaXMucXVlc3Rpb24pLmNhY2hlZFZpc2libGVSb3dzO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMua29PdmVyZmxvd1ggPSBrby5wdXJlQ29tcHV0ZWQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICByZXR1cm4gKDxRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWxCYXNlPnRoaXMucXVlc3Rpb24pLmhvcml6b250YWxTY3JvbGwgPyBcInNjcm9sbFwiOiBcIm5vbmVcIjtcclxuICAgICAgICB9LCB0aGlzKTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29Sb3dzXCJdID0gdGhpcy5rb1Jvd3M7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMua29BZGRSb3dDbGljayA9IGZ1bmN0aW9uICgpIHsgc2VsZi5hZGRSb3coKTsgfVxyXG4gICAgICAgIHRoaXMua29SZW1vdmVSb3dDbGljayA9IGZ1bmN0aW9uIChkYXRhKSB7IHNlbGYucmVtb3ZlUm93KGRhdGEpOyB9XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbltcImtvQWRkUm93Q2xpY2tcIl0gPSB0aGlzLmtvQWRkUm93Q2xpY2s7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbltcImtvUmVtb3ZlUm93Q2xpY2tcIl0gPSB0aGlzLmtvUmVtb3ZlUm93Q2xpY2s7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbltcImtvT3ZlcmZsb3dYXCJdID0gdGhpcy5rb092ZXJmbG93WDtcclxuICAgICAgICAoPFF1ZXN0aW9uTWF0cml4RHluYW1pYz50aGlzLnF1ZXN0aW9uKS5yb3dDb3VudENoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgc2VsZi5vblJvd0NvdW50Q2hhbmdlZCgpOyB9O1xyXG4gICAgICAgICg8UXVlc3Rpb25NYXRyaXhEeW5hbWljPnRoaXMucXVlc3Rpb24pLmNvbHVtbnNDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IHNlbGYub25Db2x1bW5DaGFuZ2VkKCk7IH07XHJcbiAgICAgICAgKDxRdWVzdGlvbk1hdHJpeER5bmFtaWM+dGhpcy5xdWVzdGlvbikudXBkYXRlQ2VsbHNDYWxsYmFrID0gZnVuY3Rpb24gKCkgeyBzZWxmLm9uVXBkYXRlQ2VsbHMoKTsgfTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblVwZGF0ZUNlbGxzKCkge1xyXG4gICAgICAgIC8vR2VuZXJlYXRlIHJvd3MgYWdhaW4uXHJcbiAgICAgICAgdmFyIHJvd3MgPSAoPFF1ZXN0aW9uTWF0cml4RHluYW1pYz50aGlzLnF1ZXN0aW9uKVtcImdlbmVyYXRlZFZpc2libGVSb3dzXCJdO1xyXG4gICAgICAgIHZhciBjb2x1bW5zID0gKDxRdWVzdGlvbk1hdHJpeER5bmFtaWM+dGhpcy5xdWVzdGlvbikuY29sdW1ucztcclxuICAgICAgICBpZiAocm93cyAmJiByb3dzLmxlbmd0aCA+IDAgJiYgY29sdW1ucyAmJiBjb2x1bW5zLmxlbmd0aCA+IDApIHRoaXMub25Db2x1bW5DaGFuZ2VkKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25Db2x1bW5DaGFuZ2VkKCkge1xyXG4gICAgICAgIHZhciByb3dzID0gKDxRdWVzdGlvbk1hdHJpeER5bmFtaWM+dGhpcy5xdWVzdGlvbikudmlzaWJsZVJvd3M7XHJcbiAgICAgICAgdGhpcy5vblJvd0NvdW50Q2hhbmdlZCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uUm93Q291bnRDaGFuZ2VkKCkge1xyXG4gICAgICAgIHRoaXMua29SZWNhbGModGhpcy5rb1JlY2FsYygpICsgMSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgYWRkUm93KCkge1xyXG4gICAgICAgICg8UXVlc3Rpb25NYXRyaXhEeW5hbWljPnRoaXMucXVlc3Rpb24pLmFkZFJvdygpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJlbW92ZVJvdyhyb3c6IE1hdHJpeER5bmFtaWNSb3dNb2RlbCkge1xyXG4gICAgICAgIHZhciByb3dzID0gKDxRdWVzdGlvbk1hdHJpeER5bmFtaWM+dGhpcy5xdWVzdGlvbikuY2FjaGVkVmlzaWJsZVJvd3M7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gcm93cy5pbmRleE9mKHJvdyk7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgKDxRdWVzdGlvbk1hdHJpeER5bmFtaWM+dGhpcy5xdWVzdGlvbikucmVtb3ZlUm93KGluZGV4KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbk1hdHJpeER5bmFtaWMgZXh0ZW5kcyBRdWVzdGlvbk1hdHJpeER5bmFtaWNNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgbmV3IFF1ZXN0aW9uTWF0cml4RHluYW1pY0ltcGxlbWVudG9yKHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLm92ZXJyaWRlQ2xhc3NDcmVhdG9yZShcIm1hdHJpeGR5bmFtaWNcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uTWF0cml4RHluYW1pYyhcIlwiKTsgfSk7XHJcblxyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcIm1hdHJpeGR5bmFtaWNcIiwgKG5hbWUpID0+IHsgdmFyIHEgPSBuZXcgUXVlc3Rpb25NYXRyaXhEeW5hbWljKG5hbWUpOyBxLmNob2ljZXMgPSBbMSwgMiwgMywgNCwgNV07IHEucm93Q291bnQgPSAyOyBxLmFkZENvbHVtbihcIkNvbHVtbiAxXCIpOyBxLmFkZENvbHVtbihcIkNvbHVtbiAyXCIpOyBxLmFkZENvbHVtbihcIkNvbHVtbiAzXCIpOyByZXR1cm4gcTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMva25vY2tvdXQva29xdWVzdGlvbl9tYXRyaXhkeW5hbWljLnRzXG4gKiovIiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25NdWx0aXBsZVRleHRNb2RlbCwgTXVsdGlwbGVUZXh0SXRlbU1vZGVsfSBmcm9tIFwiLi4vcXVlc3Rpb25fbXVsdGlwbGV0ZXh0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25JbXBsZW1lbnRvcn0gZnJvbSBcIi4va29xdWVzdGlvblwiO1xyXG5pbXBvcnQge1F1ZXN0aW9ufSBmcm9tIFwiLi4vcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4uL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE11bHRpcGxlVGV4dEl0ZW0gZXh0ZW5kcyBNdWx0aXBsZVRleHRJdGVtTW9kZWwge1xyXG4gICAgcHJpdmF0ZSBpc0tPVmFsdWVVcGRhdGluZyA9IGZhbHNlO1xyXG4gICAga29WYWx1ZTogYW55O1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IGFueSA9IG51bGwsIHRpdGxlOiBzdHJpbmcgPSBudWxsKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSwgdGl0bGUpO1xyXG4gICAgICAgIHRoaXMua29WYWx1ZSA9IGtvLm9ic2VydmFibGUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMua29WYWx1ZS5zdWJzY3JpYmUoZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmICghc2VsZi5pc0tPVmFsdWVVcGRhdGluZykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBvblZhbHVlQ2hhbmdlZChuZXdWYWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5pc0tPVmFsdWVVcGRhdGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5rb1ZhbHVlKG5ld1ZhbHVlKTtcclxuICAgICAgICB0aGlzLmlzS09WYWx1ZVVwZGF0aW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbk11bHRpcGxlVGV4dEltcGxlbWVudG9yIGV4dGVuZHMgUXVlc3Rpb25JbXBsZW1lbnRvciB7XHJcbiAgICBrb1Jvd3M6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uKTtcclxuICAgICAgICB0aGlzLmtvUm93cyA9IGtvLm9ic2VydmFibGVBcnJheSgoPFF1ZXN0aW9uTXVsdGlwbGVUZXh0TW9kZWw+dGhpcy5xdWVzdGlvbikuZ2V0Um93cygpKTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29Sb3dzXCJdID0gdGhpcy5rb1Jvd3M7XHJcbiAgICAgICAgdGhpcy5vbkNvbENvdW50Q2hhbmdlZCgpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAoPFF1ZXN0aW9uTXVsdGlwbGVUZXh0TW9kZWw+dGhpcy5xdWVzdGlvbikuY29sQ291bnRDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IHNlbGYub25Db2xDb3VudENoYW5nZWQoKTsgfTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkNvbENvdW50Q2hhbmdlZCgpIHtcclxuICAgICAgICB0aGlzLmtvUm93cygoPFF1ZXN0aW9uTXVsdGlwbGVUZXh0TW9kZWw+dGhpcy5xdWVzdGlvbikuZ2V0Um93cygpKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTXVsdGlwbGVUZXh0IGV4dGVuZHMgUXVlc3Rpb25NdWx0aXBsZVRleHRNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgbmV3IFF1ZXN0aW9uTXVsdGlwbGVUZXh0SW1wbGVtZW50b3IodGhpcyk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVGV4dEl0ZW0obmFtZTogc3RyaW5nLCB0aXRsZTogc3RyaW5nKTogTXVsdGlwbGVUZXh0SXRlbU1vZGVsIHtcclxuICAgICAgICByZXR1cm4gbmV3IE11bHRpcGxlVGV4dEl0ZW0obmFtZSwgdGl0bGUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLm92ZXJyaWRlQ2xhc3NDcmVhdG9yZShcIm11bHRpcGxldGV4dGl0ZW1cIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE11bHRpcGxlVGV4dEl0ZW0oXCJcIik7IH0pO1xyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5vdmVycmlkZUNsYXNzQ3JlYXRvcmUoXCJtdWx0aXBsZXRleHRcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uTXVsdGlwbGVUZXh0KFwiXCIpOyB9KTtcclxuXHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwibXVsdGlwbGV0ZXh0XCIsIChuYW1lKSA9PiB7IHZhciBxID0gbmV3IFF1ZXN0aW9uTXVsdGlwbGVUZXh0KG5hbWUpOyBxLkFkZEl0ZW0oXCJ0ZXh0MVwiKTsgcS5BZGRJdGVtKFwidGV4dDJcIik7IHJldHVybiBxOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX211bHRpcGxldGV4dC50c1xuICoqLyIsImltcG9ydCB7UXVlc3Rpb25SYWRpb2dyb3VwTW9kZWx9IGZyb20gXCIuLi9xdWVzdGlvbl9yYWRpb2dyb3VwXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4uL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkNoZWNrYm94QmFzZUltcGxlbWVudG9yfSBmcm9tIFwiLi9rb3F1ZXN0aW9uX2Jhc2VzZWxlY3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblJhZGlvZ3JvdXAgZXh0ZW5kcyBRdWVzdGlvblJhZGlvZ3JvdXBNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgbmV3IFF1ZXN0aW9uQ2hlY2tib3hCYXNlSW1wbGVtZW50b3IodGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEub3ZlcnJpZGVDbGFzc0NyZWF0b3JlKFwicmFkaW9ncm91cFwiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUXVlc3Rpb25SYWRpb2dyb3VwKFwiXCIpOyB9KTtcclxuXHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwicmFkaW9ncm91cFwiLCAobmFtZSkgPT4geyB2YXIgcSA9IG5ldyBRdWVzdGlvblJhZGlvZ3JvdXAobmFtZSk7IHEuY2hvaWNlcyA9IFF1ZXN0aW9uRmFjdG9yeS5EZWZhdWx0Q2hvaWNlczsgcmV0dXJuIHE7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fcmFkaW9ncm91cC50c1xuICoqLyIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uSW1wbGVtZW50b3J9IGZyb20gXCIuL2tvcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtRdWVzdGlvblJhdGluZ01vZGVsfSBmcm9tIFwiLi4vcXVlc3Rpb25fcmF0aW5nXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4uL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4uL3F1ZXN0aW9uXCI7XHJcblxyXG5jbGFzcyBRdWVzdGlvblJhdGluZ0ltcGxlbWVudG9yIGV4dGVuZHMgUXVlc3Rpb25JbXBsZW1lbnRvciB7XHJcbiAgICBrb1Zpc2libGVSYXRlVmFsdWVzOiBhbnk7IGtvQ2hhbmdlOiBhbnk7IGtvQ3NzOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihxdWVzdGlvbjogUXVlc3Rpb24pIHtcclxuICAgICAgICBzdXBlcihxdWVzdGlvbik7XHJcbiAgICAgICAgdGhpcy5rb1Zpc2libGVSYXRlVmFsdWVzID0ga28ub2JzZXJ2YWJsZUFycmF5KHRoaXMuZ2V0VmFsdWVzKCkpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb1Zpc2libGVSYXRlVmFsdWVzXCJdID0gdGhpcy5rb1Zpc2libGVSYXRlVmFsdWVzO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmtvQ2hhbmdlID0gZnVuY3Rpb24gKHZhbCkgeyBzZWxmLmtvVmFsdWUodmFsLml0ZW1WYWx1ZSk7IH07XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbltcImtvQ2hhbmdlXCJdID0gdGhpcy5rb0NoYW5nZTtcclxuICAgICAgICAoPFF1ZXN0aW9uUmF0aW5nPnRoaXMucXVlc3Rpb24pLnJhdGVWYWx1ZXNDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IHNlbGYub25SYXRlVmFsdWVzQ2hhbmdlZCgpOyB9O1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb0dldENzc1wiXSA9IGZ1bmN0aW9uICh2YWwpIHtcclxuICAgICAgICAgICAgdmFyIGNzcyA9ICg8UXVlc3Rpb25SYXRpbmc+c2VsZi5xdWVzdGlvbikuaXRlbUNzcztcclxuICAgICAgICAgICAgcmV0dXJuIHNlbGYucXVlc3Rpb25bXCJrb1ZhbHVlXCJdKCkgPT0gdmFsLnZhbHVlID8gY3NzICsgXCIgYWN0aXZlXCIgOiBjc3M7IH07XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25SYXRlVmFsdWVzQ2hhbmdlZCgpIHtcclxuICAgICAgICB0aGlzLmtvVmlzaWJsZVJhdGVWYWx1ZXModGhpcy5nZXRWYWx1ZXMoKSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldFZhbHVlcygpOiBBcnJheTxhbnk+IHsgcmV0dXJuICg8UXVlc3Rpb25SYXRpbmc+dGhpcy5xdWVzdGlvbikudmlzaWJsZVJhdGVWYWx1ZXM7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uUmF0aW5nIGV4dGVuZHMgUXVlc3Rpb25SYXRpbmdNb2RlbCB7XHJcbiAgICBwdWJsaWMgaXRlbUNzczogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIG5ldyBRdWVzdGlvblJhdGluZ0ltcGxlbWVudG9yKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uU2V0RGF0YSgpIHtcclxuICAgICAgICB0aGlzLml0ZW1Dc3MgPSB0aGlzLmRhdGFbXCJjc3NcIl0ucmF0aW5nLml0ZW07XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEub3ZlcnJpZGVDbGFzc0NyZWF0b3JlKFwicmF0aW5nXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvblJhdGluZyhcIlwiKTsgfSk7XHJcblxyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcInJhdGluZ1wiLCAobmFtZSkgPT4geyByZXR1cm4gbmV3IFF1ZXN0aW9uUmF0aW5nKG5hbWUpOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX3JhdGluZy50c1xuICoqLyIsImltcG9ydCB7UXVlc3Rpb25UZXh0TW9kZWx9IGZyb20gXCIuLi9xdWVzdGlvbl90ZXh0XCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4uL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkltcGxlbWVudG9yfSBmcm9tIFwiLi9rb3F1ZXN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25UZXh0IGV4dGVuZHMgUXVlc3Rpb25UZXh0TW9kZWwge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIG5ldyBRdWVzdGlvbkltcGxlbWVudG9yKHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLm92ZXJyaWRlQ2xhc3NDcmVhdG9yZShcInRleHRcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uVGV4dChcIlwiKTsgfSk7XHJcblxyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcInRleHRcIiwgKG5hbWUpID0+IHsgcmV0dXJuIG5ldyBRdWVzdGlvblRleHQobmFtZSk7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fdGV4dC50c1xuICoqLyIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xyXG5pbXBvcnQge1N1cnZleVdpbmRvd01vZGVsfSBmcm9tIFwiLi4vc3VydmV5V2luZG93XCI7XHJcbmltcG9ydCB7U3VydmV5TW9kZWx9IGZyb20gXCIuLi9zdXJ2ZXlcIjtcclxuaW1wb3J0IHtTdXJ2ZXl9IGZyb20gXCIuL2tvc3VydmV5XCI7XHJcbmltcG9ydCB7a29UZW1wbGF0ZX0gZnJvbSAnLi90ZW1wbGF0ZS53aW5kb3cua28uaHRtbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlXaW5kb3cgZXh0ZW5kcyBTdXJ2ZXlXaW5kb3dNb2RlbCB7XHJcbiAgICBrb0V4cGFuZGVkOiBhbnk7XHJcbiAgICBrb0V4cGFuZGVkQ3NzOiBhbnk7XHJcbiAgICBkb0V4cGFuZDogYW55O1xyXG4gICAgY29uc3RydWN0b3IoanNvbk9iajogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoanNvbk9iaik7XHJcbiAgICAgICAgdGhpcy5rb0V4cGFuZGVkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5rb0V4cGFuZGVkQ3NzID0ga28ub2JzZXJ2YWJsZSh0aGlzLmdldEJ1dHRvbkNzcygpKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kb0V4cGFuZCA9IGZ1bmN0aW9uICgpIHsgc2VsZi5jaGFuZ2VFeHBhbmRlZCgpOyB9XHJcbiAgICAgICAgdGhpcy5zdXJ2ZXkub25Db21wbGV0ZS5hZGQoKHNlbmRlcjogU3VydmV5TW9kZWwpID0+IHsgc2VsZi5vbkNvbXBsZXRlKCk7IHNlbGYua29FeHBhbmRlZENzcyhzZWxmLmdldEJ1dHRvbkNzcygpKSB9KTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVTdXJ2ZXkoanNvbk9iajogYW55KTogU3VydmV5TW9kZWwge1xyXG4gICAgICAgIHJldHVybiBuZXcgU3VydmV5KGpzb25PYmopXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZXhwYW5kY29sbGFwc2UodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlci5leHBhbmRjb2xsYXBzZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5rb0V4cGFuZGVkKHRoaXMuaXNFeHBhbmRlZFZhbHVlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXQgdGVtcGxhdGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudGVtcGxhdGVWYWx1ZSA/IHRoaXMudGVtcGxhdGVWYWx1ZSA6IHRoaXMuZ2V0RGVmYXVsdFRlbXBsYXRlKCk7IH1cclxuICAgIHByb3RlY3RlZCBzZXQgdGVtcGxhdGUodmFsdWU6IHN0cmluZykgeyB0aGlzLnRlbXBsYXRlVmFsdWUgPSB2YWx1ZTsgfVxyXG4gICAgcHVibGljIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy53aW5kb3dFbGVtZW50LmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGU7XHJcbiAgICAgICAga28uY2xlYW5Ob2RlKHRoaXMud2luZG93RWxlbWVudCk7XHJcbiAgICAgICAga28uYXBwbHlCaW5kaW5ncyh0aGlzLCB0aGlzLndpbmRvd0VsZW1lbnQpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy53aW5kb3dFbGVtZW50KTtcclxuICAgICAgICAoPFN1cnZleT50aGlzLnN1cnZleSkucmVuZGVyKFN1cnZleVdpbmRvdy5zdXJ2ZXlFbGVtZW50TmFtZSk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dpbmdWYWx1ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdFRlbXBsYXRlKCk6IHN0cmluZyB7IHJldHVybiBrb1RlbXBsYXRlLmh0bWwgfVxyXG4gICAgcHVibGljIGhpZGUoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLndpbmRvd0VsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMud2luZG93RWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuaXNTaG93aW5nVmFsdWUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY3NzKCk6IGFueSB7IHJldHVybiB0aGlzLnN1cnZleVtcImNzc1wiXTsgfVxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VFeHBhbmRlZCgpIHtcclxuICAgICAgICB0aGlzLmV4cGFuZGNvbGxhcHNlKCF0aGlzLmlzRXhwYW5kZWQpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkNvbXBsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRCdXR0b25Dc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua29FeHBhbmRlZCgpID8gdGhpcy5jc3Mud2luZG93LmhlYWRlci5idXR0b25Db2xsYXBzZWQgOiB0aGlzLmNzcy53aW5kb3cuaGVhZGVyLmJ1dHRvbkV4cGFuZGVkO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMva25vY2tvdXQva29TdXJ2ZXlXaW5kb3cudHNcbiAqKi8iLCJleHBvcnQgdmFyIGtvVGVtcGxhdGUgPSB7IGh0bWwgOiBcIlwifTsga29UZW1wbGF0ZS5odG1sID0gJzxkaXYgc3R5bGU9XCJwb3NpdGlvbjogZml4ZWQ7IGJvdHRvbTogM3B4OyByaWdodDogMTBweDtcIiBkYXRhLWJpbmQ9XCJjc3M6ICRyb290LmNzcy53aW5kb3cucm9vdFwiPiAgICA8ZGl2IGRhdGEtYmluZD1cImNzczogJHJvb3QuY3NzLndpbmRvdy5oZWFkZXIucm9vdFwiPiAgICAgICAgPGEgaHJlZj1cIiNcIiBkYXRhLWJpbmQ9XCJjbGljazpkb0V4cGFuZFwiIHN0eWxlPVwid2lkdGg6MTAwJVwiPiAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwicGFkZGluZy1yaWdodDoxMHB4XCIgZGF0YS1iaW5kPVwidGV4dDp0aXRsZSwgY3NzOiAkcm9vdC5jc3Mud2luZG93LmhlYWRlci50aXRsZVwiPjwvc3Bhbj4gICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBkYXRhLWJpbmQ9XCJjc3M6IGtvRXhwYW5kZWRDc3NcIj48L3NwYW4+ICAgICAgICA8L2E+ICAgIDwvZGl2PiAgICA8ZGl2IGRhdGEtYmluZD1cInZpc2libGU6a29FeHBhbmRlZCwgY3NzOiAkcm9vdC5jc3Mud2luZG93LmJvZHlcIj4gICAgICAgIDxkaXYgaWQ9XCJ3aW5kb3dTdXJ2ZXlKU1wiPjwvZGl2PiAgICA8L2Rpdj48L2Rpdj4nO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L3RlbXBsYXRlLndpbmRvdy5rby5odG1sLnRzXG4gKiovIiwiaW1wb3J0IHtrb1RlbXBsYXRlfSBmcm9tIFwiLi90ZW1wbGF0ZS5rby5odG1sXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3VydmV5VGVtcGxhdGVUZXh0IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXBsYWNlVGV4dChyZXBsYWNlVGV4dDogc3RyaW5nLCBpZDogc3RyaW5nLCBxdWVzdGlvblR5cGU6IHN0cmluZyA9IG51bGwpIHtcclxuICAgICAgICBpZCA9IHRoaXMuZ2V0SWQoaWQsIHF1ZXN0aW9uVHlwZSk7XHJcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMudGV4dC5pbmRleE9mKGlkKTtcclxuICAgICAgICBpZiAocG9zIDwgMCkgcmV0dXJuO1xyXG4gICAgICAgIHBvcyA9IHRoaXMudGV4dC5pbmRleE9mKCc+JywgcG9zKTtcclxuICAgICAgICBpZiAocG9zIDwgMCkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBzdGFydFBvcyA9IHBvcyArIDE7XHJcbiAgICAgICAgdmFyIGVuZFN0cmluZyA9IFwiPC9zY3JpcHQ+XCI7XHJcbiAgICAgICAgcG9zID0gdGhpcy50ZXh0LmluZGV4T2YoZW5kU3RyaW5nLCBzdGFydFBvcyk7XHJcbiAgICAgICAgaWYgKHBvcyA8IDApIHJldHVybjtcclxuICAgICAgICB0aGlzLnRleHQgPSB0aGlzLnRleHQuc3Vic3RyKDAsIHN0YXJ0UG9zKSArIHJlcGxhY2VUZXh0ICsgdGhpcy50ZXh0LnN1YnN0cihwb3MpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldElkKGlkOiBzdHJpbmcsIHF1ZXN0aW9uVHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICdpZD1cInN1cnZleS0nICsgaWQ7XHJcbiAgICAgICAgaWYgKHF1ZXN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gXCItXCIgKyBxdWVzdGlvblR5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQgKyAnXCInO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldCB0ZXh0KCk6IHN0cmluZyB7IHJldHVybiBrb1RlbXBsYXRlLmh0bWw7IH1cclxuICAgIHByb3RlY3RlZCBzZXQgdGV4dCh2YWx1ZTogc3RyaW5nKSB7IGtvVGVtcGxhdGUuaHRtbCA9IHZhbHVlOyB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rbm9ja291dC90ZW1wbGF0ZVRleHQudHNcbiAqKi8iLCJpbXBvcnQgJy4uLy4uL2xvY2FsaXphdGlvbi9ydXNzaWFuJztcbmltcG9ydCAnLi4vLi4vbG9jYWxpemF0aW9uL2ZyZW5jaCc7XG5pbXBvcnQgJy4uLy4uL2xvY2FsaXphdGlvbi9maW5uaXNoJztcbmltcG9ydCAnLi4vLi4vbG9jYWxpemF0aW9uL2dlcm1hbic7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZW50cmllcy9jaHVua3MvbG9jYWxpemF0aW9uLnRzXG4gKiovIiwiaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcblxyXG5leHBvcnQgdmFyIHJ1c3NpYW5TdXJ2ZXlTdHJpbmdzID0ge1xyXG4gICAgcGFnZVByZXZUZXh0OiBcItCd0LDQt9Cw0LRcIixcclxuICAgIHBhZ2VOZXh0VGV4dDogXCLQlNCw0LvQtdC1XCIsXHJcbiAgICBjb21wbGV0ZVRleHQ6IFwi0JPQvtGC0L7QstC+XCIsXHJcbiAgICBwcm9ncmVzc1RleHQ6IFwi0KHRgtGA0LDQvdC40YbQsCB7MH0g0LjQtyB7MX1cIixcclxuICAgIGVtcHR5U3VydmV5OiBcItCd0LXRgiDQvdC4INC+0LTQvdC+0LPQviDQstC+0L/RgNC+0YHQsC5cIixcclxuICAgIGNvbXBsZXRpbmdTdXJ2ZXk6IFwi0JHQu9Cw0LPQvtC00LDRgNC40Lwg0JLQsNGBINC30LAg0LfQsNC/0L7Qu9C90LXQvdC40LUg0LDQvdC60LXRgtGLIVwiLFxyXG4gICAgbG9hZGluZ1N1cnZleTogXCLQl9Cw0LPRgNGD0LfQutCwINGBINGB0LXRgNCy0LXRgNCwLi4uXCIsXHJcbiAgICBvdGhlckl0ZW1UZXh0OiBcItCU0YDRg9Cz0L7QtSAo0L/QvtC20LDQu9GD0LnRgdGC0LAsINC+0L/QuNGI0LjRgtC1KVwiLFxyXG4gICAgb3B0aW9uc0NhcHRpb246IFwi0JLRi9Cx0YDQsNGC0YwuLi5cIixcclxuICAgIHJlcXVpcmVkRXJyb3I6IFwi0J/QvtC20LDQu9GD0LnRgdGC0LAsINC+0YLQstC10YLRjNGC0LUg0L3QsCDQstC+0L/RgNC+0YEuXCIsXHJcbiAgICBudW1lcmljRXJyb3I6IFwi0J7RgtCy0LXRgiDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YfQuNGB0LvQvtC8LlwiLFxyXG4gICAgdGV4dE1pbkxlbmd0aDogXCLQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0YXQvtGC0Y8g0LHRiyB7MH0g0YHQuNC80LLQvtC70L7Qsi5cIixcclxuICAgIG1pblNlbGVjdEVycm9yOiBcItCf0L7QttCw0LvRg9C50YHRgtCwLCDQstGL0LHQtdGA0LjRgtC1INGF0L7RgtGPINCx0YsgezB9INCy0LDRgNC40LDQvdGC0L7Qsi5cIixcclxuICAgIG1heFNlbGVjdEVycm9yOiBcItCf0L7QttCw0LvRg9C50YHRgtCwLCDQstGL0LHQtdGA0LjRgtC1INC90LUg0LHQvtC70LXQtSB7MH0g0LLQsNGA0LjQsNC90YLQvtCyLlwiLFxyXG4gICAgbnVtZXJpY01pbk1heDogXCInezB9JyDQtNC+0LvQttC90L4g0LHRi9GC0Ywg0YDQsNCy0L3Ri9C8INC40LvQuCDQsdC+0LvRjNGI0LUsINGH0LXQvCB7MX0sINC4INGA0LDQstC90YvQvCDQuNC70Lgg0LzQtdC90YzRiNC1LCDRh9C10LwgezJ9XCIsXHJcbiAgICBudW1lcmljTWluOiBcIid7MH0nINC00L7Qu9C20L3QviDQsdGL0YLRjCDRgNCw0LLQvdGL0Lwg0LjQu9C4INCx0L7Qu9GM0YjQtSwg0YfQtdC8IHsxfVwiLFxyXG4gICAgbnVtZXJpY01heDogXCInezB9JyDQtNC+0LvQttC90L4g0LHRi9GC0Ywg0YDQsNCy0L3Ri9C8INC40LvQuCDQvNC10L3RjNGI0LUsINGH0LXQvCB7MX1cIixcclxuICAgIGludmFsaWRFbWFpbDogXCLQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90YvQuSDQsNC00YDQtdGBINGN0LvQtdC60YLRgNC+0L3QvdC+0Lkg0L/QvtGH0YLRiy5cIixcclxuICAgIG90aGVyUmVxdWlyZWRFcnJvcjogXCLQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0LTQsNC90L3Ri9C1INCyINC/0L7Qu9C1IFxcXCLQlNGA0YPQs9C+0LVcXFwiXCJcclxufTtcclxuXHJcbnN1cnZleUxvY2FsaXphdGlvbi5sb2NhbGVzW1wicnVcIl0gPSBydXNzaWFuU3VydmV5U3RyaW5ncztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2NhbGl6YXRpb24vcnVzc2lhbi50c1xuICoqLyIsIi8vQ3JlYXRlZCBvbiBiZWhhbGYgaHR0cHM6Ly9naXRodWIuY29tL0ZyYW5rMTNcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcblxyXG5leHBvcnQgdmFyIGZyZW5jaFN1cnZleVN0cmluZ3MgPSB7XHJcbiAgICBwYWdlUHJldlRleHQ6IFwiUHJcXHUwMGU5Y1xcdTAwZTlkZW50XCIsXHJcbiAgICBwYWdlTmV4dFRleHQ6IFwiU3VpdmFudFwiLFxyXG4gICAgY29tcGxldGVUZXh0OiBcIlRlcm1pbmVyXCIsXHJcbiAgICBvdGhlckl0ZW1UZXh0OiBcIkF1dHJlIChwclxcdTAwZTljaXNlcilcIixcclxuICAgIHByb2dyZXNzVGV4dDogXCJQYWdlIHswfSBzdXIgezF9XCIsXHJcbiAgICBlbXB0eVN1cnZleTogXCJJbCBuJ3kgYSBuaSBwYWdlIHZpc2libGUgbmkgcXVlc3Rpb24gdmlzaWJsZSBkYW5zIGNlIHF1ZXN0aW9ubmFpcmVcIixcclxuICAgIGNvbXBsZXRpbmdTdXJ2ZXk6IFwiTWVyY2kgZCdhdm9pciByXFx1MDBlOXBvbmR1IGF1IHF1ZXN0aW9ubmFpcmUhXCIsXHJcbiAgICBsb2FkaW5nU3VydmV5OiBcIkxlIHF1ZXN0aW9ubmFpcmUgZXN0IGVuIGNvdXJzIGRlIGNoYXJnZW1lbnQuLi5cIixcclxuICAgIG9wdGlvbnNDYXB0aW9uOiBcIkNob2lzaXNzZXouLi5cIixcclxuICAgIHJlcXVpcmVkRXJyb3I6IFwiTGEgclxcdTAwZTlwb25zZSBcXHUwMGUwIGNldHRlIHF1ZXN0aW9uIGVzdCBvYmxpZ2F0b2lyZS5cIixcclxuICAgIG51bWVyaWNFcnJvcjogXCJMYSByXFx1MDBlOXBvbnNlIGRvaXQgXFx1MDBlYXRyZSB1biBub21icmUuXCIsXHJcbiAgICB0ZXh0TWluTGVuZ3RoOiBcIk1lcmNpIGQnZW50cmVyIGF1IG1vaW5zIHswfSBzeW1ib2xlcy5cIixcclxuICAgIG1pblNlbGVjdEVycm9yOiBcIk1lcmNpIGRlIHNcXHUwMGU5bGVjdGlvbm5lciBhdSBtb2lucyB7MH1yXFx1MDBlOXBvbnNlcy5cIixcclxuICAgIG1heFNlbGVjdEVycm9yOiBcIk1lcmNpIGRlIHNcXHUwMGU5bGVjdGlvbm5lciBhdSBwbHVzIHswfXJcXHUwMGU5cG9uc2VzLlwiLFxyXG4gICAgbnVtZXJpY01pbk1heDogXCJWb3RyZSByXFx1MDBlOXBvbnNlICd7MH0nIGRvaXQgXFx1MDBlYXRyZXN1cFxcdTAwZTlyaWV1cmUgb3UgXFx1MDBlOWdhbGUgXFx1MDBlMCB7MX0gZXQgaW5mXFx1MDBlOXJpZXVyZSBvdVxcdTAwZTlnYWxlIFxcdTAwZTAgezJ9XCIsXHJcbiAgICBudW1lcmljTWluOiBcIlZvdHJlIHJcXHUwMGU5cG9uc2UgJ3swfScgZG9pdCBcXHUwMGVhdHJlc3VwXFx1MDBlOXJpZXVyZSBvdSBcXHUwMGU5Z2FsZSBcXHUwMGUwIHsxfVwiLFxyXG4gICAgbnVtZXJpY01heDogXCJWb3RyZSByXFx1MDBlOXBvbnNlICd7MH0nIGRvaXQgXFx1MDBlYXRyZWluZlxcdTAwZTlyaWV1cmUgb3UgXFx1MDBlOWdhbGUgXFx1MDBlMCB7MX1cIixcclxuICAgIGludmFsaWRFbWFpbDogXCJNZXJjaSBkJ2VudHJlciB1bmUgYWRyZXNzZSBtYWlsIHZhbGlkZS5cIixcclxuICAgIGV4Y2VlZE1heFNpemU6IFwiTGEgdGFpbGxlIGR1IGZpY2hpZXIgbmUgZG9pdCBwYXMgZXhjXFx1MDBlOWRlciB7MH0uXCIsXHJcbiAgICBvdGhlclJlcXVpcmVkRXJyb3I6IFwiTWVyY2kgZGUgcHJcXHUwMGU5Y2lzZXIgbGUgY2hhbXAgJ0F1dHJlJy5cIlxyXG59O1xyXG5zdXJ2ZXlMb2NhbGl6YXRpb24ubG9jYWxlc1tcImZyXCJdID0gZnJlbmNoU3VydmV5U3RyaW5ncztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2NhbGl6YXRpb24vZnJlbmNoLnRzXG4gKiovIiwiaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcblxyXG5leHBvcnQgdmFyIGZpbm5pc2hTdXJ2ZXlTdHJpbmdzID0ge1xyXG4gICAgcGFnZVByZXZUZXh0OiBcIkVkZWxsaW5lblwiLFxyXG4gICAgcGFnZU5leHRUZXh0OiBcIlNldXJhYXZhXCIsXHJcbiAgICBjb21wbGV0ZVRleHQ6IFwiVmFsbWlzXCIsXHJcbiAgICBvdGhlckl0ZW1UZXh0OiBcIk11dSAoa3V2YWlsZSlcIixcclxuICAgIHByb2dyZXNzVGV4dDogXCJTaXZ1IHswfS97MX1cIixcclxuICAgIGVtcHR5U3VydmV5OiBcIlTDpHNzw6Qga3lzZWx5c3PDpCBlaSBvbGUgeWh0w6Rrw6TDpG4gbsOka3l2aWxsw6Qgb2xldmFhIHNpdnVhIHRhaSBreXN5bXlzdMOkLlwiLFxyXG4gICAgY29tcGxldGluZ1N1cnZleTogXCJLaWl0b3Mga3lzZWx5eW4gdmFzdGFhbWlzZXN0YSFcIixcclxuICAgIGxvYWRpbmdTdXJ2ZXk6IFwiS3lzZWx5w6QgbGFkYXRhYW4gcGFsdmVsaW1lbHRhLi4uXCIsXHJcbiAgICBvcHRpb25zQ2FwdGlvbjogXCJWYWxpdHNlLi4uXCIsXHJcbiAgICByZXF1aXJlZEVycm9yOiBcIlZhc3RhYSBreXN5bXlrc2Vlbiwga2lpdG9zLlwiLFxyXG4gICAgbnVtZXJpY0Vycm9yOiBcIkFydm9uIHR1bGVlIG9sbGEgbnVtZWVyaW5lbi5cIixcclxuICAgIHRleHRNaW5MZW5ndGg6IFwiT2xlIGh5dsOkIGphIHN5w7Z0w6QgdsOkaGludMOkw6RuIHswfSBtZXJra2nDpC5cIixcclxuICAgIG1pblNlbGVjdEVycm9yOiBcIk9sZSBoeXbDpCBqYSB2YWxpdHNlIHbDpGhpbnTDpMOkbiB7MH0gdmFpaHRvZWh0b2EuXCIsXHJcbiAgICBtYXhTZWxlY3RFcnJvcjogXCJPbGUgaHl2w6QgamEgdmFsaXRzZSBlbmludMOkw6RuIHswfSB2YWlodG9laHRvYS5cIixcclxuICAgIG51bWVyaWNNaW5NYXg6IFwiJ3swfScgdMOkeXR5eSBvbGxhIGVuZW1tw6RuIHRhaSB5aHTDpCBzdXVyaSBrdWluIHsxfSBqYSB2w6RoZW1tw6RuIHRhaSB5aHTDpCBzdXVyaSBrdWluIHsyfVwiLFxyXG4gICAgbnVtZXJpY01pbjogXCInezB9JyB0w6R5dHl5IG9sbGEgZW5lbW3DpG4gdGFpIHlodMOkIHN1dXJpIGt1aW4gezF9XCIsXHJcbiAgICBudW1lcmljTWF4OiBcIid7MH0nIHTDpHl0eXkgb2xsYSB2w6RoZW1tw6RuIHRhaSB5aHTDpCBzdXVyaSBrdWluIHsxfVwiLFxyXG4gICAgaW52YWxpZEVtYWlsOiBcIlN5w7Z0w6QgdmFsaWRpIHPDpGhrw7Zwb3N0aW9zb2l0ZS5cIixcclxuICAgIG90aGVyUmVxdWlyZWRFcnJvcjogXCJPbGUgaHl2w6QgamEgc3nDtnTDpCBcXFwiTXV1IChrdXZhaWxlKVxcXCJcIlxyXG59O1xyXG5cclxuc3VydmV5TG9jYWxpemF0aW9uLmxvY2FsZXNbXCJmaVwiXSA9IGZpbm5pc2hTdXJ2ZXlTdHJpbmdzO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2NhbGl6YXRpb24vZmlubmlzaC50c1xuICoqLyIsImltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tIFwiLi4vc3VydmV5U3RyaW5nc1wiO1xyXG5cclxuZXhwb3J0IHZhciBnZXJtYW5TdXJ2ZXlTdHJpbmdzID0ge1xyXG4gICAgcGFnZVByZXZUZXh0OiBcIlp1csO8Y2tcIixcclxuICAgIHBhZ2VOZXh0VGV4dDogXCJXZWl0ZXJcIixcclxuICAgIGNvbXBsZXRlVGV4dDogXCJGZXJ0aWdcIixcclxuICAgIHByb2dyZXNzVGV4dDogXCJTZWl0ZSB7MH0gdm9uIHsxfVwiLFxyXG4gICAgZW1wdHlTdXJ2ZXk6IFwiRXMgZ2lidCBrZWluZSBzaWNodGJhcmUgRnJhZ2UuXCIsXHJcbiAgICBjb21wbGV0aW5nU3VydmV5OiBcIlZpZWxlbiBEYW5rIGbDvHIgZGFzIEF1c2bDvGxsZW4gZGVzIEZyYWdlYm9nZW5zIVwiLFxyXG4gICAgbG9hZGluZ1N1cnZleTogXCJEZXIgRnJhZ2Vib2dlbiB3aXJkIHZvbSBTZXJ2ZXIgZ2VsYWRlbi4uLlwiLFxyXG4gICAgb3RoZXJJdGVtVGV4dDogXCJCZW51dHplcmRlZmluaWVydGUgQW50d29ydC4uLlwiLFxyXG4gICAgb3B0aW9uc0NhcHRpb246IFwiV8OkaGxlbi4uLlwiLFxyXG4gICAgcmVxdWlyZWRFcnJvcjogXCJCaXR0ZSBhbnR3b3J0ZW4gU2llIGF1ZiBkaWUgRnJhZ2UuXCIsXHJcbiAgICBudW1lcmljRXJyb3I6IFwiRGVyIFdlcnQgc29sbHRlIGVpbmUgWmFobCBzZWluLlwiLFxyXG4gICAgdGV4dE1pbkxlbmd0aDogXCJCaXR0ZSBnZWJlbiBTaWUgbWluZGVzdGVucyB7MH0gU3ltYm9sZS5cIixcclxuICAgIG1pblNlbGVjdEVycm9yOiBcIkJpdHRlIHfDpGhsZW4gU2llIG1pbmRlc3RlbnMgezB9IFZhcmlhbnRlbi5cIixcclxuICAgIG1heFNlbGVjdEVycm9yOiBcIkJpdHRlIHfDpGhsZW4gU2llIG5pY2h0IG1laHIgYWxzIHswfSBWYXJpYW50ZW4uXCIsXHJcbiAgICBudW1lcmljTWluTWF4OiBcIid7MH0nIHNvbHRlIGdsZWljaCBvZGVyIGdyw7bDn2VyIHNlaW4gYWxzIHsxfSB1bmQgZ2xlaWNoIG9kZXIga2xlaW5lciBhbHMgezJ9XCIsXHJcbiAgICBudW1lcmljTWluOiBcIid7MH0nIHNvbHRlIGdsZWljaCBvZGVyIGdyw7bDn2VyIHNlaW4gYWxzIHsxfVwiLFxyXG4gICAgbnVtZXJpY01heDogXCInezB9JyBzb2x0ZSBnbGVpY2ggb2RlciBrbGVpbmVyIGFscyB7MX1cIixcclxuICAgIGludmFsaWRFbWFpbDogXCJCaXR0ZSBnZWJlbiBTaWUgZWluZSBnw7xsdGlnZSBFbWFpbC1BZHJlc3NlIGVpbi5cIixcclxuICAgIGV4Y2VlZE1heFNpemU6IFwiRGllIERhdGVpZ3LDtsOfZSBzb2xsIG5pY2h0IG1laHIgYWxzIHswfS5cIixcclxuICAgIG90aGVyUmVxdWlyZWRFcnJvcjogXCJCaXR0ZSBnZWJlbiBTaWUgZWluZW4gV2VydCBmw7xyIElocmUgYmVudXR6ZXJkZWZpbmllcnRlIEFudHdvcnQgZWluLlwiXHJcbn07XHJcblxyXG5zdXJ2ZXlMb2NhbGl6YXRpb24ubG9jYWxlc1tcImRlXCJdID0gZ2VybWFuU3VydmV5U3RyaW5ncztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbG9jYWxpemF0aW9uL2dlcm1hbi50c1xuICoqLyIsImltcG9ydCAnLi4vLi4vZGVmYXVsdENzcy9jc3Nib290c3RyYXAnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2VudHJpZXMvY2h1bmtzL2Nzc0ZyYW1ld29ya3MudHNcbiAqKi8iLCJpbXBvcnQge3N1cnZleUNzc30gZnJvbSBcIi4vY3Nzc3RhbmRhcmRcIjtcclxuXHJcbmV4cG9ydCB2YXIgZGVmYXVsdEJvb3RzdHJhcENzcyA9IHtcclxuICAgIHJvb3Q6IFwiXCIsXHJcbiAgICBoZWFkZXI6IFwicGFuZWwtaGVhZGluZ1wiLFxyXG4gICAgYm9keTogXCJwYW5lbC1ib2R5XCIsXHJcbiAgICBmb290ZXI6IFwicGFuZWwtZm9vdGVyXCIsXHJcbiAgICBuYXZpZ2F0aW9uQnV0dG9uOiBcIlwiLCBuYXZpZ2F0aW9uOiB7IGNvbXBsZXRlOiBcIlwiLCBwcmV2OiBcIlwiLCBuZXh0OiBcIlwiIH0sXHJcbiAgICBwcm9ncmVzczogXCJwcm9ncmVzcyBjZW50ZXItYmxvY2tcIiwgcHJvZ3Jlc3NCYXI6IFwicHJvZ3Jlc3MtYmFyXCIsXHJcbiAgICBwYWdlVGl0bGU6IFwiXCIsXHJcbiAgICByb3c6IFwiXCIsXHJcbiAgICBxdWVzdGlvbjogeyByb290OiBcIlwiLCB0aXRsZTogXCJcIiwgY29tbWVudDogXCJmb3JtLWNvbnRyb2xcIiwgaW5kZW50OiAyMCB9LFxyXG4gICAgZXJyb3I6IHsgcm9vdDogXCJhbGVydCBhbGVydC1kYW5nZXJcIiwgaWNvbjogXCJnbHlwaGljb24gZ2x5cGhpY29uLWV4Y2xhbWF0aW9uLXNpZ25cIiwgaXRlbTogXCJcIiB9LFxyXG5cclxuICAgIGNoZWNrYm94OiB7IHJvb3Q6IFwiZm9ybS1pbmxpbmVcIiwgaXRlbTogXCJjaGVja2JveFwiLCBvdGhlcjogXCJcIiB9LFxyXG4gICAgY29tbWVudDogXCJmb3JtLWNvbnRyb2xcIixcclxuICAgIGRyb3Bkb3duOiBcImZvcm0tY29udHJvbFwiLFxyXG4gICAgbWF0cml4OiB7IHJvb3Q6IFwidGFibGVcIiB9LFxyXG4gICAgbWF0cml4ZHJvcGRvd246IHsgcm9vdDogXCJ0YWJsZVwiIH0sXHJcbiAgICBtYXRyaXhkeW5hbWljOiB7IHJvb3Q6IFwidGFibGVcIiwgYnV0dG9uOiBcImJ1dHRvblwiIH0sXHJcbiAgICBtdWx0aXBsZXRleHQ6IHsgcm9vdDogXCJ0YWJsZVwiLCBpdGVtVGl0bGU6IFwiXCIsIGl0ZW1WYWx1ZTogXCJmb3JtLWNvbnRyb2xcIiB9LFxyXG4gICAgcmFkaW9ncm91cDogeyByb290OiBcImZvcm0taW5saW5lXCIsIGl0ZW06IFwicmFkaW9cIiwgb3RoZXI6IFwiXCIgfSxcclxuICAgIHJhdGluZzogeyByb290OiBcImJ0bi1ncm91cFwiLCBpdGVtOiBcImJ0biBidG4tZGVmYXVsdFwiIH0sXHJcbiAgICB0ZXh0OiBcImZvcm0tY29udHJvbFwiLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgICAgcm9vdDogXCJtb2RhbC1jb250ZW50XCIsIGJvZHk6IFwibW9kYWwtYm9keVwiLFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICByb290OiBcIm1vZGFsLWhlYWRlciBwYW5lbC10aXRsZVwiLCB0aXRsZTogXCJwdWxsLWxlZnRcIiwgYnV0dG9uOiBcImdseXBoaWNvbiBwdWxsLXJpZ2h0XCIsXHJcbiAgICAgICAgICAgIGJ1dHRvbkV4cGFuZGVkOiBcImdseXBoaWNvbiBwdWxsLXJpZ2h0IGdseXBoaWNvbi1jaGV2cm9uLXVwXCIsIGJ1dHRvbkNvbGxhcHNlZDogXCJnbHlwaGljb24gcHVsbC1yaWdodCBnbHlwaGljb24tY2hldnJvbi1kb3duXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbnN1cnZleUNzc1tcImJvb3RzdHJhcFwiXSA9IGRlZmF1bHRCb290c3RyYXBDc3M7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVmYXVsdENzcy9jc3Nib290c3RyYXAudHNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9