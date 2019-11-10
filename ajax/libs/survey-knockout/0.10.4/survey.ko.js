/*!
* surveyjs - Survey JavaScript library v0.10.4
* (c) Devsoft Baltic O� - http://surveyjs.io/
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
})(this, function(__WEBPACK_EXTERNAL_MODULE_38__) {
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
	exports.__extends = exports.SurveyTemplateText = exports.SurveyWindow = exports.QuestionText = exports.QuestionRating = exports.QuestionRadiogroup = exports.QuestionMultipleText = exports.QuestionMultipleTextImplementor = exports.MultipleTextItem = exports.QuestionMatrixDynamic = exports.QuestionMatrixDynamicImplementor = exports.QuestionMatrixDropdown = exports.QuestionMatrix = exports.MatrixRow = exports.QuestionHtml = exports.QuestionFile = exports.QuestionDropdown = exports.QuestionComment = exports.QuestionCheckbox = exports.QuestionCheckboxBaseImplementor = exports.QuestionSelectBaseImplementor = exports.QuestionImplementor = exports.QuestionImplementorBase = exports.Page = exports.QuestionRow = exports.Model = exports.Survey = exports.defaultBootstrapCss = exports.defaultStandardCss = undefined;
	
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
	
	var _cssstandard = __webpack_require__(35);
	
	Object.defineProperty(exports, "defaultStandardCss", {
	  enumerable: true,
	  get: function get() {
	    return _cssstandard.defaultStandardCss;
	  }
	});
	
	var _cssbootstrap = __webpack_require__(36);
	
	Object.defineProperty(exports, "defaultBootstrapCss", {
	  enumerable: true,
	  get: function get() {
	    return _cssbootstrap.defaultBootstrapCss;
	  }
	});
	
	var _kosurvey = __webpack_require__(37);
	
	Object.defineProperty(exports, "Survey", {
	  enumerable: true,
	  get: function get() {
	    return _kosurvey.Survey;
	  }
	});
	Object.defineProperty(exports, "Model", {
	  enumerable: true,
	  get: function get() {
	    return _kosurvey.Survey;
	  }
	});
	
	var _kopage = __webpack_require__(39);
	
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
	
	var _koquestionbase = __webpack_require__(41);
	
	Object.defineProperty(exports, "QuestionImplementorBase", {
	  enumerable: true,
	  get: function get() {
	    return _koquestionbase.QuestionImplementorBase;
	  }
	});
	
	var _koquestion = __webpack_require__(42);
	
	Object.defineProperty(exports, "QuestionImplementor", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion.QuestionImplementor;
	  }
	});
	
	var _koquestion_baseselect = __webpack_require__(43);
	
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
	
	var _koquestion_checkbox = __webpack_require__(44);
	
	Object.defineProperty(exports, "QuestionCheckbox", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_checkbox.QuestionCheckbox;
	  }
	});
	
	var _koquestion_comment = __webpack_require__(45);
	
	Object.defineProperty(exports, "QuestionComment", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_comment.QuestionComment;
	  }
	});
	
	var _koquestion_dropdown = __webpack_require__(46);
	
	Object.defineProperty(exports, "QuestionDropdown", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_dropdown.QuestionDropdown;
	  }
	});
	
	var _koquestion_file = __webpack_require__(47);
	
	Object.defineProperty(exports, "QuestionFile", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_file.QuestionFile;
	  }
	});
	
	var _koquestion_html = __webpack_require__(48);
	
	Object.defineProperty(exports, "QuestionHtml", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_html.QuestionHtml;
	  }
	});
	
	var _koquestion_matrix = __webpack_require__(49);
	
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
	
	var _koquestion_matrixdropdown = __webpack_require__(50);
	
	Object.defineProperty(exports, "QuestionMatrixDropdown", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_matrixdropdown.QuestionMatrixDropdown;
	  }
	});
	
	var _koquestion_matrixdynamic = __webpack_require__(51);
	
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
	
	var _koquestion_multipletext = __webpack_require__(52);
	
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
	
	var _koquestion_radiogroup = __webpack_require__(53);
	
	Object.defineProperty(exports, "QuestionRadiogroup", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_radiogroup.QuestionRadiogroup;
	  }
	});
	
	var _koquestion_rating = __webpack_require__(54);
	
	Object.defineProperty(exports, "QuestionRating", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_rating.QuestionRating;
	  }
	});
	
	var _koquestion_text = __webpack_require__(55);
	
	Object.defineProperty(exports, "QuestionText", {
	  enumerable: true,
	  get: function get() {
	    return _koquestion_text.QuestionText;
	  }
	});
	
	var _koSurveyWindow = __webpack_require__(56);
	
	Object.defineProperty(exports, "SurveyWindow", {
	  enumerable: true,
	  get: function get() {
	    return _koSurveyWindow.SurveyWindow;
	  }
	});
	
	var _templateText = __webpack_require__(58);
	
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
	
	__webpack_require__(59);

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
	
	var _conditionProcessValue = __webpack_require__(11);
	
	Object.defineProperty(exports, "ProcessValue", {
	  enumerable: true,
	  get: function get() {
	    return _conditionProcessValue.ProcessValue;
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
	
	var _question_matrixdropdownbase = __webpack_require__(12);
	
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
	
	var _question_matrixdropdown = __webpack_require__(18);
	
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
	
	var _question_matrixdynamic = __webpack_require__(19);
	
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
	
	var _question_matrix = __webpack_require__(20);
	
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
	
	var _question_multipletext = __webpack_require__(21);
	
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
	
	var _page = __webpack_require__(22);
	
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
	
	var _question = __webpack_require__(13);
	
	Object.defineProperty(exports, "Question", {
	  enumerable: true,
	  get: function get() {
	    return _question.Question;
	  }
	});
	
	var _questionbase = __webpack_require__(14);
	
	Object.defineProperty(exports, "QuestionBase", {
	  enumerable: true,
	  get: function get() {
	    return _questionbase.QuestionBase;
	  }
	});
	
	var _question_baseselect = __webpack_require__(16);
	
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
	
	var _question_checkbox = __webpack_require__(23);
	
	Object.defineProperty(exports, "QuestionCheckboxModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_checkbox.QuestionCheckboxModel;
	  }
	});
	
	var _question_comment = __webpack_require__(24);
	
	Object.defineProperty(exports, "QuestionCommentModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_comment.QuestionCommentModel;
	  }
	});
	
	var _question_dropdown = __webpack_require__(25);
	
	Object.defineProperty(exports, "QuestionDropdownModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_dropdown.QuestionDropdownModel;
	  }
	});
	
	var _questionfactory = __webpack_require__(17);
	
	Object.defineProperty(exports, "QuestionFactory", {
	  enumerable: true,
	  get: function get() {
	    return _questionfactory.QuestionFactory;
	  }
	});
	
	var _question_file = __webpack_require__(26);
	
	Object.defineProperty(exports, "QuestionFileModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_file.QuestionFileModel;
	  }
	});
	
	var _question_html = __webpack_require__(27);
	
	Object.defineProperty(exports, "QuestionHtmlModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_html.QuestionHtmlModel;
	  }
	});
	
	var _question_radiogroup = __webpack_require__(28);
	
	Object.defineProperty(exports, "QuestionRadiogroupModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_radiogroup.QuestionRadiogroupModel;
	  }
	});
	
	var _question_rating = __webpack_require__(29);
	
	Object.defineProperty(exports, "QuestionRatingModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_rating.QuestionRatingModel;
	  }
	});
	
	var _question_text = __webpack_require__(30);
	
	Object.defineProperty(exports, "QuestionTextModel", {
	  enumerable: true,
	  get: function get() {
	    return _question_text.QuestionTextModel;
	  }
	});
	
	var _survey = __webpack_require__(31);
	
	Object.defineProperty(exports, "SurveyModel", {
	  enumerable: true,
	  get: function get() {
	    return _survey.SurveyModel;
	  }
	});
	
	var _trigger = __webpack_require__(33);
	
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
	
	var _surveyWindow = __webpack_require__(34);
	
	Object.defineProperty(exports, "SurveyWindowModel", {
	  enumerable: true,
	  get: function get() {
	    return _surveyWindow.SurveyWindowModel;
	  }
	});
	
	var _textPreProcessor = __webpack_require__(15);
	
	Object.defineProperty(exports, "TextPreProcessor", {
	  enumerable: true,
	  get: function get() {
	    return _textPreProcessor.TextPreProcessor;
	  }
	});
	
	var _dxSurveyService = __webpack_require__(32);
	
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
	                var exception = null;
	                if (typeof value.getType !== 'undefined' && value.getType() == 'itemvalue') {
	                    value.itemValue = value.itemValue;
	                    item.itemText = value.itemText;
	                    exception = ItemValue.itemValueProp;
	                }
	                ItemValue.copyAttributes(value, item, exception);
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
	    ItemValue.getItemByValue = function (items, val) {
	        for (var i = 0; i < items.length; i++) {
	            if (items[i].value == val) return items[i];
	        }
	        return null;
	    };
	    ItemValue.copyAttributes = function (src, dest, exceptons) {
	        for (var key in src) {
	            if (typeof src[key] == 'function') continue;
	            if (exceptons && exceptons.indexOf(key) > -1) continue;
	            dest[key] = src[key];
	        }
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
	    ItemValue.itemValueProp = ["text", "value", "hasText"];
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
	var SurveyPageId = exports.SurveyPageId = "sq_page";
	var SurveyElement = exports.SurveyElement = function () {
	    function SurveyElement() {}
	    SurveyElement.ScrollElementToTop = function (elementId) {
	        if (!elementId) return false;
	        var el = document.getElementById(elementId);
	        if (!el || !el.scrollIntoView) return false;
	        var elemTop = el.getBoundingClientRect().top;
	        if (elemTop < 0) el.scrollIntoView();
	        return elemTop < 0;
	    };
	    SurveyElement.FocusElement = function (elementId) {
	        if (!elementId) return false;
	        var el = document.getElementById(elementId);
	        if (el) {
	            el.focus();
	            return true;
	        }
	        return false;
	    };
	    return SurveyElement;
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
	    emptySurvey: "There is no visible page or question in the survey.",
	    completingSurvey: "Thank you for completing the survey!",
	    loadingSurvey: "Survey is loading...",
	    optionsCaption: "Choose...",
	    requiredError: "Please answer the question.",
	    requiredInAllRowsError: "Please answer questions in all rows.",
	    numericError: "The value should be numeric.",
	    textMinLength: "Please enter at least {0} symbols.",
	    minRowCountError: "Please fill in at least {0} rows.",
	    minSelectError: "Please select at least {0} variants.",
	    maxSelectError: "Please select no more than {0} variants.",
	    numericMinMax: "The '{0}' should be equal or more than {1} and equal or less than {2}",
	    numericMin: "The '{0}' should be equal or more than {1}",
	    numericMax: "The '{0}' should be equal or less than {1}",
	    invalidEmail: "Please enter a valid e-mail address.",
	    urlRequestError: "The request returned error '{0}'. {1}",
	    urlGetChoicesError: "The request returned empty data or the 'path' property is incorrect",
	    exceedMaxSize: "The file size should not exceed {0}.",
	    otherRequiredError: "Please enter the other value.",
	    uploadingFile: "Your file is uploading. Please wait several seconds and try again.",
	    addRow: "Add row",
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
	    JsonMetadata.prototype.addProperty = function (className, propertyInfo) {
	        var metaDataClass = this.findClass(className);
	        if (!metaDataClass) return;
	        var property = metaDataClass.createProperty(propertyInfo);
	        if (property) {
	            this.addPropertyToClass(metaDataClass, property);
	            this.emptyClassPropertiesHash(metaDataClass);
	        }
	    };
	    JsonMetadata.prototype.removeProperty = function (className, propertyName) {
	        var metaDataClass = this.findClass(className);
	        if (!metaDataClass) return false;
	        var property = metaDataClass.find(propertyName);
	        if (property) {
	            this.removePropertyFromClass(metaDataClass, property);
	            this.emptyClassPropertiesHash(metaDataClass);
	        }
	    };
	    JsonMetadata.prototype.addPropertyToClass = function (metaDataClass, property) {
	        if (metaDataClass.find(property.name) != null) return;
	        metaDataClass.properties.push(property);
	    };
	    JsonMetadata.prototype.removePropertyFromClass = function (metaDataClass, property) {
	        var index = metaDataClass.properties.indexOf(property);
	        if (index < 0) return;
	        metaDataClass.properties.splice(index, 1);
	        if (metaDataClass.requiredProperties) {
	            index = metaDataClass.requiredProperties.indexOf(property.name);
	            if (index >= 0) {
	                metaDataClass.requiredProperties.splice(index, 1);
	            }
	        }
	    };
	    JsonMetadata.prototype.emptyClassPropertiesHash = function (metaDataClass) {
	        this.classProperties[metaDataClass.name] = null;
	        var childClasses = this.getChildrenClasses(metaDataClass.name);
	        for (var i = 0; i < childClasses.length; i++) {
	            this.classProperties[childClasses[i].name] = null;
	        }
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
	            this.addPropertyCore(metaDataClass.properties[i], list, list.length);
	        }
	    };
	    JsonMetadata.prototype.addPropertyCore = function (property, list, endIndex) {
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
	        if (value === undefined || value === null) return;
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
	        return value && value.constructor.toString().indexOf("Array") > -1;
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
	
	var _conditionProcessValue = __webpack_require__(11);
	
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
	        this.processValue = new _conditionProcessValue.ProcessValue();
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
	            if (!this.processValue.hasValue(name, this.values)) return false;
	            left = this.processValue.getValue(name, this.values);
	        }
	        var right = condition.right;
	        name = this.getValueName(right);
	        if (name) {
	            if (!this.processValue.hasValue(name, this.values)) return false;
	            right = this.processValue.getValue(name, this.values);
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
/***/ function(module, exports) {

	'use strict';
	
	exports.__esModule = true;
	var ProcessValue = exports.ProcessValue = function () {
	    function ProcessValue() {}
	    ProcessValue.prototype.getFirstName = function (text) {
	        if (!text) return text;
	        var res = "";
	        for (var i = 0; i < text.length; i++) {
	            var ch = text[i];
	            if (ch == '.' || ch == '[') break;
	            res += ch;
	        }
	        return res;
	    };
	    ProcessValue.prototype.hasValue = function (text, values) {
	        var res = this.getValueCore(text, values);
	        return res.hasValue;
	    };
	    ProcessValue.prototype.getValue = function (text, values) {
	        var res = this.getValueCore(text, values);
	        return res.value;
	    };
	    ProcessValue.prototype.getValueCore = function (text, values) {
	        var res = { hasValue: false, value: null };
	        var curValue = values;
	        if (!curValue) return res;
	        var isFirst = true;
	        while (text && text.length > 0) {
	            var isArray = !isFirst && text[0] == '[';
	            if (!isArray) {
	                if (!isFirst) text = text.substr(1);
	                var curName = this.getFirstName(text);
	                if (!curName) return res;
	                if (!curValue[curName]) return res;
	                curValue = curValue[curName];
	                text = text.substr(curName.length);
	            } else {
	                if (!Array.isArray(curValue)) return res;
	                var index = 1;
	                var str = "";
	                while (index < text.length && text[index] != ']') {
	                    str += text[index];
	                    index++;
	                }
	                text = index < text.length ? text.substr(index + 1) : "";
	                index = this.getIntValue(str);
	                if (index < 0 || index >= curValue.length) return res;
	                curValue = curValue[index];
	            }
	            isFirst = false;
	        }
	        res.value = curValue;
	        res.hasValue = true;
	        return res;
	    };
	    ProcessValue.prototype.getIntValue = function (str) {
	        if (str == "0" || (str | 0) > 0 && str % 1 == 0) return Number(str);
	        return -1;
	    };
	    return ProcessValue;
	}();

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMatrixDropdownModelBase = exports.MatrixDropdownRowModelBase = exports.MatrixDropdownCell = exports.MatrixDropdownColumn = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _question = __webpack_require__(13);
	
	var _base = __webpack_require__(4);
	
	var _surveyStrings = __webpack_require__(6);
	
	var _question_baseselect = __webpack_require__(16);
	
	var _questionfactory = __webpack_require__(17);
	
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
	        this.idValue = MatrixDropdownRowModelBase.getId();
	        this.buildCells();
	    }
	    MatrixDropdownRowModelBase.getId = function () {
	        return "srow_" + MatrixDropdownRowModelBase.idCounter++;
	    };
	    Object.defineProperty(MatrixDropdownRowModelBase.prototype, "id", {
	        get: function get() {
	            return this.idValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
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
	    MatrixDropdownRowModelBase.idCounter = 1;
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
	    QuestionMatrixDropdownModelBase.prototype.onBeforeValueChanged = function (val) {};
	    QuestionMatrixDropdownModelBase.prototype.onValueChanged = function () {
	        if (this.isRowChanging) return;
	        this.onBeforeValueChanged(this.value);
	        if (!this.generatedVisibleRows || this.generatedVisibleRows.length == 0) return;
	        this.isRowChanging = true;
	        var val = this.createNewValue(this.value);
	        for (var i = 0; i < this.generatedVisibleRows.length; i++) {
	            var row = this.generatedVisibleRows[i];
	            this.generatedVisibleRows[i].value = this.getRowValue(row, val);
	        }
	        this.isRowChanging = false;
	    };
	    QuestionMatrixDropdownModelBase.prototype.supportGoNextPageAutomatic = function () {
	        var rows = this.generatedVisibleRows;
	        if (!rows) rows = this.visibleRows;
	        if (!rows) return true;
	        for (var i = 0; i < rows.length; i++) {
	            var cells = this.generatedVisibleRows[i].cells;
	            if (!cells) continue;
	            for (var colIndex = 0; colIndex < cells.length; colIndex++) {
	                var question = cells[colIndex].question;
	                if (question && (!question.supportGoNextPageAutomatic() || !question.value)) return false;
	            }
	        }
	        return true;
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
	    QuestionMatrixDropdownModelBase.prototype.getFirstInputElementId = function () {
	        var question = this.getFirstCellQuestion(false);
	        return question ? question.inputId : _super.prototype.getFirstInputElementId.call(this);
	    };
	    QuestionMatrixDropdownModelBase.prototype.getFirstErrorInputElementId = function () {
	        var question = this.getFirstCellQuestion(true);
	        return question ? question.inputId : _super.prototype.getFirstErrorInputElementId.call(this);
	    };
	    QuestionMatrixDropdownModelBase.prototype.getFirstCellQuestion = function (onError) {
	        if (!this.generatedVisibleRows) return null;
	        for (var i = 0; i < this.generatedVisibleRows.length; i++) {
	            var cells = this.generatedVisibleRows[i].cells;
	            for (var colIndex = 0; colIndex < this.columns.length; colIndex++) {
	                if (!onError) return cells[colIndex].question;
	                if (cells[colIndex].question.currentErrorCount > 0) return cells[colIndex].question;
	            }
	        }
	        return null;
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
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {'use strict';
	
	exports.__esModule = true;
	exports.Question = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionbase = __webpack_require__(14);
	
	var _base = __webpack_require__(4);
	
	var _surveyStrings = __webpack_require__(6);
	
	var _error = __webpack_require__(5);
	
	var _validator = __webpack_require__(2);
	
	var _textPreProcessor = __webpack_require__(15);
	
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
	    Object.defineProperty(Question.prototype, "hasInput", {
	        get: function get() {
	            return true;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Question.prototype, "inputId", {
	        get: function get() {
	            return this.id + "i";
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
	    Question.prototype.focus = function (onError) {
	        if (onError === void 0) {
	            onError = false;
	        }
	        _base.SurveyElement.ScrollElementToTop(this.id);
	        var id = !onError ? this.getFirstInputElementId() : this.getFirstErrorInputElementId();
	        if (_base.SurveyElement.FocusElement(id)) {
	            this.fireCallback(this.focusCallback);
	        }
	    };
	    Question.prototype.getFirstInputElementId = function () {
	        return this.inputId;
	    };
	    Question.prototype.getFirstErrorInputElementId = function () {
	        return this.getFirstInputElementId();
	    };
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
	    Object.defineProperty(Question.prototype, "currentErrorCount", {
	        get: function get() {
	            return this.errors.length;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(Question.prototype, "requiredText", {
	        get: function get() {
	            return this.survey != null && this.isRequired ? this.survey.requiredText : "";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Question.prototype.addError = function (error) {
	        this.errors.push(error);
	        this.fireCallback(this.errorsChangedCallback);
	    };
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
/* 14 */
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
	    Object.defineProperty(QuestionBase.prototype, "currentErrorCount", {
	        get: function get() {
	            return 0;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionBase.prototype, "hasTitle", {
	        get: function get() {
	            return false;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(QuestionBase.prototype, "hasInput", {
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
	    QuestionBase.prototype.focus = function (onError) {
	        if (onError === void 0) {
	            onError = false;
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
/* 15 */
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
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionCheckboxBase = exports.QuestionSelectBase = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _question = __webpack_require__(13);
	
	var _base = __webpack_require__(4);
	
	var _surveyStrings = __webpack_require__(6);
	
	var _error = __webpack_require__(5);
	
	var _choicesRestfull = __webpack_require__(8);
	
	var QuestionSelectBase = exports.QuestionSelectBase = function (_super) {
	    __extends(QuestionSelectBase, _super);
	    function QuestionSelectBase(name) {
	        _super.call(this, name);
	        this.visibleChoicesCache = null;
	        this.otherItem = new _base.ItemValue("other", _surveyStrings.surveyLocalization.getString("otherItemText"));
	        this.choicesFromUrl = null;
	        this.cachedValueForUrlRequestion = null;
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
	    QuestionSelectBase.prototype.setNewValue = function (newValue) {
	        if (newValue) this.cachedValueForUrlRequestion = newValue;
	        _super.prototype.setNewValue.call(this, newValue);
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
	            this.onVisibleChoicesChanged();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    QuestionSelectBase.prototype.hasOtherChanged = function () {
	        this.onVisibleChoicesChanged();
	    };
	    Object.defineProperty(QuestionSelectBase.prototype, "choicesOrder", {
	        get: function get() {
	            return this.choicesOrderValue;
	        },
	        set: function set(newValue) {
	            if (newValue == this.choicesOrderValue) return;
	            this.choicesOrderValue = newValue;
	            this.onVisibleChoicesChanged();
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
	            if (!this.visibleChoicesCache) {
	                this.visibleChoicesCache = this.sortVisibleChoices(this.activeChoices.slice());
	                if (this.hasOther) {
	                    this.visibleChoicesCache.push(this.otherItem);
	                }
	            }
	            return this.visibleChoicesCache;
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
	        this.onVisibleChoicesChanged();
	        if (this.cachedValueForUrlRequestion) {
	            this.value = this.cachedValueForUrlRequestion;
	        }
	    };
	    QuestionSelectBase.prototype.onVisibleChoicesChanged = function () {
	        this.visibleChoicesCache = null;
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
/* 17 */
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
/* 18 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMatrixDropdownModel = exports.MatrixDropdownRowModel = undefined;
	
	var _question_matrixdropdownbase = __webpack_require__(12);
	
	var _jsonobject = __webpack_require__(7);
	
	var _base = __webpack_require__(4);
	
	var _questionfactory = __webpack_require__(17);
	
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
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMatrixDynamicModel = exports.MatrixDynamicRowModel = undefined;
	
	var _question_matrixdropdownbase = __webpack_require__(12);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
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
	    QuestionMatrixDynamicModel.prototype.supportGoNextPageAutomatic = function () {
	        return false;
	    };
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
	    QuestionMatrixDynamicModel.prototype.onBeforeValueChanged = function (val) {
	        var newRowCount = val && Array.isArray(val) ? val.length : 0;
	        if (newRowCount <= this.rowCount) return;
	        this.rowCountValue = newRowCount;
	        if (this.generatedVisibleRows) {
	            this.generatedVisibleRows = this.visibleRows;
	        }
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
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMatrixModel = exports.MatrixRowModel = undefined;
	
	var _base = __webpack_require__(4);
	
	var _question = __webpack_require__(13);
	
	var _jsonobject = __webpack_require__(7);
	
	var _surveyStrings = __webpack_require__(6);
	
	var _error = __webpack_require__(5);
	
	var _questionfactory = __webpack_require__(17);
	
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
	    QuestionMatrixModel.prototype.supportGoNextPageAutomatic = function () {
	        return this.hasValuesInAllRows();
	    };
	    QuestionMatrixModel.prototype.onCheckForErrors = function (errors) {
	        _super.prototype.onCheckForErrors.call(this, errors);
	        if (this.hasErrorInRows()) {
	            this.errors.push(new _error.CustomError(_surveyStrings.surveyLocalization.getString("requiredInAllRowsError")));
	        }
	    };
	    QuestionMatrixModel.prototype.hasErrorInRows = function () {
	        if (!this.isAllRowRequired) return false;
	        return !this.hasValuesInAllRows();
	    };
	    QuestionMatrixModel.prototype.hasValuesInAllRows = function () {
	        var rows = this.generatedVisibleRows;
	        if (!rows) rows = this.visibleRows;
	        if (!rows) return true;
	        for (var i = 0; i < rows.length; i++) {
	            var val = rows[i].value;
	            if (!val) return false;
	        }
	        return true;
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
	    } }, "isAllRowRequired:boolean"], function () {
	    return new QuestionMatrixModel("");
	}, "question");
	_questionfactory.QuestionFactory.Instance.registerQuestion("matrix", function (name) {
	    var q = new QuestionMatrixModel(name);q.rows = ["Row 1", "Row 2"];q.columns = ["Column 1", "Column 2", "Column 3"];return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMultipleTextModel = exports.MultipleTextItemModel = undefined;
	
	var _base = __webpack_require__(4);
	
	var _validator = __webpack_require__(2);
	
	var _question = __webpack_require__(13);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
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
	    QuestionMultipleTextModel.prototype.addItem = function (name, title) {
	        if (title === void 0) {
	            title = null;
	        }
	        var item = this.createTextItem(name, title);
	        this.items.push(item);
	        return item;
	    };
	    //TODO-remove later. Delay removing in case somebody use this function.
	    QuestionMultipleTextModel.prototype.AddItem = function (name, title) {
	        if (title === void 0) {
	            title = null;
	        }
	        return this.addItem(name, title);
	    };
	    QuestionMultipleTextModel.prototype.supportGoNextPageAutomatic = function () {
	        for (var i = 0; i < this.items.length; i++) {
	            if (!this.items[i].value) return false;
	        }
	        return true;
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
	    var q = new QuestionMultipleTextModel(name);q.addItem("text1");q.addItem("text2");return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.PageModel = exports.QuestionRowModel = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _base = __webpack_require__(4);
	
	var _conditions = __webpack_require__(9);
	
	var _questionfactory = __webpack_require__(17);
	
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
	        this.idValue = PageModel.getPageId();
	        var self = this;
	        this.questions.push = function (value) {
	            if (self.data != null) {
	                value.setData(self.data);
	            }
	            return Array.prototype.push.call(this, value);
	        };
	    }
	    PageModel.getPageId = function () {
	        return "sp_" + PageModel.pageCounter++;
	    };
	    Object.defineProperty(PageModel.prototype, "id", {
	        get: function get() {
	            return this.idValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
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
	            return this.getIsPageVisible(null);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    PageModel.prototype.getIsPageVisible = function (exceptionQuestion) {
	        if (!this.visible) return false;
	        for (var i = 0; i < this.questions.length; i++) {
	            if (this.questions[i] == exceptionQuestion) continue;
	            if (this.questions[i].visible) return true;
	        }
	        return false;
	    };
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
	    PageModel.prototype.focusFirstQuestion = function () {
	        for (var i = 0; i < this.questions.length; i++) {
	            var question = this.questions[i];
	            if (!question.visible || !question.hasInput) continue;
	            this.questions[i].focus();
	            break;
	        }
	    };
	    PageModel.prototype.focusFirstErrorQuestion = function () {
	        for (var i = 0; i < this.questions.length; i++) {
	            if (!this.questions[i].visible || this.questions[i].currentErrorCount == 0) continue;
	            this.questions[i].focus(true);
	            break;
	        }
	    };
	    PageModel.prototype.scrollToTop = function () {
	        _base.SurveyElement.ScrollElementToTop(_base.SurveyPageId);
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
	        if (firstErrorQuestion) firstErrorQuestion.focus(true);
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
	    PageModel.pageCounter = 100;
	    return PageModel;
	}(_base.Base);
	_jsonobject.JsonObject.metaData.addClass("page", ["name", { name: "questions", baseClassName: "question" }, { name: "visible:boolean", default: true }, "visibleIf", "title"], function () {
	    return new PageModel();
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionCheckboxModel = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
	var _question_baseselect = __webpack_require__(16);
	
	var QuestionCheckboxModel = exports.QuestionCheckboxModel = function (_super) {
	    __extends(QuestionCheckboxModel, _super);
	    function QuestionCheckboxModel(name) {
	        _super.call(this, name);
	        this.name = name;
	    }
	    QuestionCheckboxModel.prototype.getHasOther = function (val) {
	        if (!val || !Array.isArray(val)) return false;
	        return val.indexOf(this.otherItem.value) >= 0;
	    };
	    QuestionCheckboxModel.prototype.valueFromDataCore = function (val) {
	        if (!val || !Array.isArray(val)) return val;
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
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionCommentModel = undefined;
	
	var _question = __webpack_require__(13);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
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
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionDropdownModel = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
	var _question_baseselect = __webpack_require__(16);
	
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
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionFileModel = undefined;
	
	var _question = __webpack_require__(13);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
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
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionHtmlModel = undefined;
	
	var _questionbase = __webpack_require__(14);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
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
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionRadiogroupModel = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
	var _question_baseselect = __webpack_require__(16);
	
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
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionRatingModel = undefined;
	
	var _base = __webpack_require__(4);
	
	var _question = __webpack_require__(13);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
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
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionTextModel = undefined;
	
	var _questionfactory = __webpack_require__(17);
	
	var _jsonobject = __webpack_require__(7);
	
	var _question = __webpack_require__(13);
	
	var QuestionTextModel = exports.QuestionTextModel = function (_super) {
	    __extends(QuestionTextModel, _super);
	    function QuestionTextModel(name) {
	        _super.call(this, name);
	        this.name = name;
	        this.size = 25;
	        this.inputType = "text";
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
	    QuestionTextModel.prototype.setNewValue = function (newValue) {
	        newValue = this.correctValueType(newValue);
	        _super.prototype.setNewValue.call(this, newValue);
	    };
	    QuestionTextModel.prototype.correctValueType = function (newValue) {
	        if (!newValue) return newValue;
	        if (this.inputType == "number" || this.inputType == "range") {
	            return this.isNumber(newValue) ? parseFloat(newValue) : "";
	        }
	        return newValue;
	    };
	    QuestionTextModel.prototype.isNumber = function (value) {
	        return !isNaN(parseFloat(value)) && isFinite(value);
	    };
	    return QuestionTextModel;
	}(_question.Question);
	_jsonobject.JsonObject.metaData.addClass("text", [{ name: "inputType", default: "text", choices: ["color", "date", "datetime", "datetime-local", "email", "month", "number", "password", "range", "tel", "text", "time", "url", "week"] }, { name: "size:number", default: 25 }], function () {
	    return new QuestionTextModel("");
	}, "question");
	_questionfactory.QuestionFactory.Instance.registerQuestion("text", function (name) {
	    return new QuestionTextModel(name);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyModel = undefined;
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };
	
	var _jsonobject = __webpack_require__(7);
	
	var _base = __webpack_require__(4);
	
	var _page = __webpack_require__(22);
	
	var _textPreProcessor = __webpack_require__(15);
	
	var _conditionProcessValue = __webpack_require__(11);
	
	var _dxSurveyService = __webpack_require__(32);
	
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
	        this.isValidatingOnServerValue = false;
	        this.modeValue = "edit";
	        this.isDesignModeValue = false;
	        this.onComplete = new _base.Event();
	        this.onPartialSend = new _base.Event();
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
	        var self = this;
	        this.textPreProcessor = new _textPreProcessor.TextPreProcessor();
	        this.textPreProcessor.onHasValue = function (name) {
	            return self.hasProcessedTextValue(name);
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
	    Object.defineProperty(SurveyModel.prototype, "mode", {
	        get: function get() {
	            return this.modeValue;
	        },
	        set: function set(value) {
	            if (value == this.mode) return;
	            if (value != "edit" && value != "display") return;
	            this.modeValue = value;
	        },
	        enumerable: true,
	        configurable: true
	    });
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
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "currentPageNo", {
	        get: function get() {
	            return this.visiblePages.indexOf(this.currentPage);
	        },
	        set: function set(value) {
	            var vPages = this.visiblePages;
	            if (value < 0 || value >= this.visiblePages.length) return;
	            this.currentPage = this.visiblePages[value];
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyModel.prototype.focusFirstQuestion = function () {
	        if (this.currentPageValue) {
	            this.currentPageValue.scrollToTop();
	            this.currentPageValue.focusFirstQuestion();
	        }
	    };
	    Object.defineProperty(SurveyModel.prototype, "state", {
	        get: function get() {
	            if (this.isLoading) return "loading";
	            if (this.isCompleted) return "completed";
	            return this.currentPage ? "running" : "empty";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyModel.prototype.clear = function (clearData, gotoFirstPage) {
	        if (clearData === void 0) {
	            clearData = true;
	        }
	        if (gotoFirstPage === void 0) {
	            gotoFirstPage = true;
	        }
	        if (clearData) {
	            this.data = null;
	            this.variablesHash = {};
	        }
	        this.isCompleted = false;
	        if (gotoFirstPage && this.visiblePageCount > 0) {
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
	    Object.defineProperty(SurveyModel.prototype, "isEditMode", {
	        get: function get() {
	            return this.mode == "edit";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "isDisplayMode", {
	        get: function get() {
	            return this.mode == "display";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyModel.prototype, "isDesignMode", {
	        get: function get() {
	            return this.isDesignModeValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyModel.prototype.setDesignMode = function (value) {
	        this.isDesignModeValue = value;
	    };
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
	        if (this.isEditMode && this.isCurrentPageHasErrors) return false;
	        if (this.doServerValidation()) return false;
	        this.doNextPage();
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
	        if (this.isEditMode && this.isCurrentPageHasErrors) return false;
	        if (this.doServerValidation()) return false;
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
	    Object.defineProperty(SurveyModel.prototype, "isValidatingOnServer", {
	        get: function get() {
	            return this.isValidatingOnServerValue;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyModel.prototype.setIsValidatingOnServer = function (val) {
	        if (val == this.isValidatingOnServer) return;
	        this.isValidatingOnServerValue = val;
	        this.onIsValidatingOnServerChanged();
	    };
	    SurveyModel.prototype.onIsValidatingOnServerChanged = function () {};
	    SurveyModel.prototype.doServerValidation = function () {
	        if (!this.onServerValidateQuestions) return false;
	        var self = this;
	        var options = { data: {}, errors: {}, survey: this, complete: function complete() {
	                self.completeServerValidation(options);
	            } };
	        for (var i = 0; i < this.currentPage.questions.length; i++) {
	            var question = this.currentPage.questions[i];
	            if (!question.visible) continue;
	            var value = this.getValue(question.name);
	            if (value) options.data[question.name] = value;
	        }
	        this.setIsValidatingOnServer(true);
	        this.onServerValidateQuestions(this, options);
	        return true;
	    };
	    SurveyModel.prototype.completeServerValidation = function (options) {
	        this.setIsValidatingOnServer(false);
	        if (!options && !options.survey) return;
	        var self = options.survey;
	        var hasErrors = false;
	        if (options.errors) {
	            for (var name in options.errors) {
	                var question = self.getQuestionByName(name);
	                if (question && question["errors"]) {
	                    hasErrors = true;
	                    question["addError"](new _error.CustomError(options.errors[name]));
	                }
	            }
	        }
	        if (!hasErrors) {
	            if (self.isLastPage) self.doComplete();else self.doNextPage();
	        }
	    };
	    SurveyModel.prototype.doNextPage = function () {
	        this.checkOnPageTriggers();
	        if (this.sendResultOnPageNext) {
	            this.sendResult(this.surveyPostId, this.clientId, true);
	        }
	        var vPages = this.visiblePages;
	        var index = vPages.indexOf(this.currentPage);
	        this.currentPage = vPages[index + 1];
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
	        if (!this.isEditMode) return;
	        if (isPartialCompleted && this.onPartialSend) {
	            this.onPartialSend.fire(this, null);
	        }
	        if (!this.surveyPostId && postId) {
	            this.surveyPostId = postId;
	        }
	        if (!this.surveyPostId) return;
	        if (clientId) {
	            this.clientId = clientId;
	        }
	        if (isPartialCompleted && !this.clientId) return;
	        var self = this;
	        new _dxSurveyService.dxSurveyService().sendResult(this.surveyPostId, this.data, function (success, response) {
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
	    SurveyModel.prototype.checkPageVisibility = function (question, oldQuestionVisible) {
	        var page = this.getPageByQuestion(question);
	        if (!page) return;
	        var newValue = page.isVisible;
	        if (newValue != page.getIsPageVisible(question) || oldQuestionVisible) {
	            this.pageVisibilityChanged(page, newValue);
	        }
	    };
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
	    SurveyModel.prototype.hasProcessedTextValue = function (name) {
	        var firstName = new _conditionProcessValue.ProcessValue().getFirstName(name);
	        return this.processedTextValues[firstName.toLowerCase()];
	    };
	    SurveyModel.prototype.getProcessedTextValue = function (name) {
	        var firstName = new _conditionProcessValue.ProcessValue().getFirstName(name);
	        var val = this.processedTextValues[firstName.toLowerCase()];
	        if (!val) return null;
	        if (val == "variable") {
	            return this.getVariable(name.toLowerCase());
	        }
	        if (val == "question") {
	            var question = this.getQuestionByName(firstName, true);
	            if (!question) return null;
	            name = question.name + name.substr(firstName.length);
	            return new _conditionProcessValue.ProcessValue().getValue(name, this.valuesHash);
	        }
	        if (val == "value") {
	            return new _conditionProcessValue.ProcessValue().getValue(name, this.valuesHash);
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
	        if (!this.currentPage.hasErrors(true, false)) {
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
	        this.checkPageVisibility(question, !newValue);
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
	    } }, { name: "triggers:triggers", baseClassName: "surveytrigger", classNamePart: "trigger" }, "surveyId", "surveyPostId", "cookieName", "sendResultOnPageNext:boolean", { name: "showNavigationButtons:boolean", default: true }, { name: "showTitle:boolean", default: true }, { name: "showPageTitles:boolean", default: true }, "showPageNumbers:boolean", { name: "showQuestionNumbers", default: "on", choices: ["on", "onPage", "off"] }, { name: "questionTitleLocation", default: "top", choices: ["top", "bottom"] }, { name: "showProgressBar", default: "off", choices: ["off", "top", "bottom"] }, { name: "mode", default: "edit", choices: ["edit", "display"] }, { name: "storeOthersAsComment:boolean", default: true }, "goNextPageAutomatic:boolean", "clearInvisibleValues:boolean", { name: "pagePrevText", onGetValue: function onGetValue(obj) {
	        return obj.pagePrevTextValue;
	    } }, { name: "pageNextText", onGetValue: function onGetValue(obj) {
	        return obj.pageNextTextValue;
	    } }, { name: "completeText", onGetValue: function onGetValue(obj) {
	        return obj.completeTextValue;
	    } }, { name: "requiredText", default: "*" }, "questionStartIndex", "questionTitleTemplate"]);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 32 */
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
/* 33 */
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
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyWindowModel = undefined;
	
	var _base = __webpack_require__(4);
	
	var _survey = __webpack_require__(31);
	
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
/* 35 */
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
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.defaultBootstrapCss = undefined;
	
	var _cssstandard = __webpack_require__(35);
	
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

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.Survey = undefined;
	
	var _knockout = __webpack_require__(38);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _survey = __webpack_require__(31);
	
	var _base = __webpack_require__(4);
	
	var _kopage = __webpack_require__(39);
	
	var _cssstandard = __webpack_require__(35);
	
	var _templateKo = __webpack_require__(40);
	
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
	        this.isFirstRender = true;
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
	        if (!this.isDesignMode) this.focusFirstQuestion();
	    };
	    Survey.prototype.pageVisibilityChanged = function (page, newValue) {
	        _super.prototype.pageVisibilityChanged.call(this, page, newValue);
	        this.updateKoCurrentPage();
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
	        if (!this.isFirstRender) {
	            this.updateCurrentPageQuestions();
	        }
	        this.isFirstRender = false;
	        ko.applyBindings(this, this.renderedElement);
	    };
	    Survey.prototype.updateKoCurrentPage = function () {
	        this.dummyObservable(this.dummyObservable() + 1);
	    };
	    Survey.prototype.updateCurrentPageQuestions = function () {
	        var questions = this.currentPage ? this.currentPage.questions : [];
	        for (var i = 0; i < questions.length; i++) {
	            var q = questions[i];
	            if (q.visible) q["updateQuestion"]();
	        }
	    };
	    return Survey;
	}(_survey.SurveyModel);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 38 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_38__;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.Page = exports.QuestionRow = undefined;
	
	var _knockout = __webpack_require__(38);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _page = __webpack_require__(22);
	
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
/* 40 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var koTemplate = exports.koTemplate = { html: "" };
	koTemplate.html = '<script type="text/html" id="survey-comment">    <!-- ko if: $root.isEditMode -->    <input data-bind="value:$data.question.koComment, visible:$data.visible, css: $root.css.question.comment" />    <!-- /ko -->    <!-- ko if: $root.isDisplayMode -->    <div data-bind="text:$data.question.koComment, visible:$data.visible, css: $root.css.question.comment"></div>    <!-- /ko --></script><div data-bind="css: $root.css.root">    <div data-bind="visible: (title.length > 0) && showTitle && koState() != \'completed\', css: $root.css.header">        <h3 data-bind="text:title"></h3>    </div>    <!-- ko if: koState() == "running" -->    <div data-bind="css: $root.css.body">        <div data-bind="visible: showProgressBar ==\'top\', template: { name: \'survey-progress\', data: $data }"></div>        <div id="sq_page" data-bind="template: { name: \'survey-page\', data: koCurrentPage }"></div>        <div style="margin-top:10px" data-bind="visible: showProgressBar ==\'bottom\', template: { name: \'survey-progress\', data: $data }"></div>    </div>    <div data-bind="visible: showNavigationButtons && !isDesignMode, css: $root.css.footer">        <input type="button" data-bind="value: pagePrevText, click: prevPage, visible: !koIsFirstPage(), css: $root.cssNavigationPrev" />        <input type="button" data-bind="value: pageNextText, click: nextPage, visible: !koIsLastPage(), css: $root.cssNavigationNext" />        <input type="button" data-bind="value: completeText, click: completeLastPage, visible: koIsLastPage(), css: $root.cssNavigationComplete" />    </div>    <!-- /ko -->    <!-- ko if: koState() == "completed" -->    <div data-bind="html: processedCompletedHtml"></div>    <!-- /ko -->    <!-- ko if: koState() == "loading" -->    <div data-bind="html: processedLoadingHtml"></div>    <!-- /ko -->    <!-- ko if: koState() == "empty" -->    <div data-bind="text:emptySurveyText, css: $root.css.body"></div>    <!-- /ko --></div><script type="text/html" id="survey-page">    <h4 data-bind="visible: (title.length > 0) && data.showPageTitles, text: koNo() + processedTitle, css: $root.css.pageTitle"></h4>    <!-- ko foreach: { data: rows, as: \'row\'} -->    <div data-bind="visible: row.koVisible, css: $root.css.row">        <!-- ko foreach: { data: row.questions, as: \'question\' , afterRender: row.koAfterRender } -->            <!-- ko template: { name: \'survey-question\', data: question } --><!-- /ko -->        <!-- /ko -->    </div>    <!-- /ko --></script><script type="text/html" id="survey-progress">    <div style="width:60%;" data-bind="css: $root.css.progress">        <div data-bind="css: $root.css.progressBar, style:{width: koProgress() + \'%\'}"             role="progressbar" aria-valuemin="0"             aria-valuemax="100">            <span data-bind="text:koProgressText"></span>        </div>    </div></script><script type="text/html" id="survey-question-checkbox">    <form data-bind="css: $root.css.checkbox.root">        <!-- ko foreach: { data: question.koVisibleChoices, as: \'item\', afterRender: question.koAfterRender}  -->        <div data-bind="style:{width: question.koWidth, \'margin-right\': question.colCount == 0 ? \'5px\': \'0px\'}, css: $root.css.checkbox.item">            <label data-bind="css: $root.css.checkbox.item">                <input type="checkbox" data-bind="attr: {name: question.name, value: item.value, id: ($index() == 0) ? question.inputId : \'\'}, checked: question.koValue, enable: $root.isEditMode" />                <span data-bind="text: item.text"></span>            </label>            <div data-bind="visible: question.hasOther && ($index() == question.koVisibleChoices().length-1)">                <div data-bind="template: { name: \'survey-comment\', data: {\'question\': question, \'visible\': question.koOtherVisible } }, css: $root.css.checkbox.other"></div>            </div>        </div>        <!-- /ko -->    </form></script><script type="text/html" id="survey-question-comment">    <!-- ko if: $root.isEditMode -->    <textarea type="text" data-bind="attr: {cols: question.cols, rows: question.rows, id: question.inputId}, value:question.koValue, css: $root.css.comment"></textarea>    <!-- /ko -->    <!-- ko if: $root.isDisplayMode -->    <div data-bind="text:question.koValue, css: $root.css.text"></div>    <!-- /ko --></script><script type="text/html" id="survey-question-dropdown">    <!-- ko if: $root.isEditMode -->    <select data-bind="attr: {id: question.inputId}, options: question.koVisibleChoices, optionsText: \'text\', optionsValue: \'value\', value: question.koValue, optionsCaption: question.optionsCaption, css: $root.css.dropdown"></select>    <!-- /ko -->    <!-- ko if: $root.isDisplayMode -->    <div data-bind="text:question.koValue, css: $root.css.dropdown"></div>    <!-- /ko -->    <div data-bind="visible: question.hasOther">        <div data-bind="template: { name: \'survey-comment\', data: {\'question\': question, \'visible\': question.koOtherVisible } }"></div>    </div></script><script type="text/html" id="survey-question-errors">    <div role="alert" data-bind="visible: koErrors().length > 0, foreach: { data: koErrors, as: \'error\'}, css: $root.css.error.root">        <div>            <span aria-hidden="true" data-bind="css: $root.css.error.icon"></span>            <span data-bind="text:error.getText(), css: $root.css.error.item"></span>        </div>    </div></script><script type="text/html" id="survey-question-file">    <!-- ko if: $root.isEditMode -->    <input type="file" data-bind="attr: {id: question.inputId}, event: {change: dochange}">    <!-- /ko -->    <div>        <img data-bind="attr: { src: question.koData, height: question.imageHeight, width: question.imageWidth }, visible: question.koHasValue">    </div></script><script type="text/html" id="survey-question-html">    <div data-bind="html: question.processedHtml"></div></script><script type="text/html" id="survey-question-matrix">    <table data-bind="css: $root.css.matrix.root">        <thead>            <tr>                <th data-bind="visible: question.hasRows"></th>                <!-- ko foreach: question.columns -->                <th data-bind="text:$data.text"></th>                <!-- /ko -->            </tr>        </thead>        <tbody>            <!-- ko foreach: { data: question.visibleRows, as: \'row\' } -->            <tr>                <td data-bind="visible: question.hasRows, text:row.text"></td>                <!-- ko foreach: question.columns -->                <td>                    <input type="radio" data-bind="attr: {name: row.fullName, value: $data.value, id: ($index() == 0) && ($parentContext.$index() == 0) ? question.inputId : \'\'}, checked: row.koValue, enable: $root.isEditMode" "/>                </td>                <!-- /ko -->            </tr>            <!-- /ko -->        </tbody>    </table></script><script type="text/html" id="survey-question-matrixdropdown">    <div data-bind="style: {overflowX: question.horizontalScroll? \'scroll\': \'\'}">        <table data-bind="css: $root.css.matrixdropdown.root">            <thead>                <tr>                    <th></th>                    <!-- ko foreach: question.columns -->                    <th data-bind="text: question.getColumnTitle($data), style: { minWidth: question.getColumnWidth($data) }"></th>                    <!-- /ko -->                </tr>            </thead>            <tbody>                <!-- ko foreach: { data: question.visibleRows, as: \'row\' } -->                <tr>                    <td data-bind="text:row.text"></td>                    <!-- ko foreach: row.cells-->                    <td>                        <!-- ko template: { name: \'survey-question-errors\', data: $data.question } -->                        <!-- /ko -->                        <!-- ko template: { name: \'survey-question-\' + $data.question.getType(), data: $data.question, as: \'question\' } -->                        <!-- /ko -->                    </td>                    <!-- /ko -->                </tr>                <!-- /ko -->            </tbody>        </table>    </div></script><script type="text/html" id="survey-question-matrixdynamic">    <div data-bind="style: {overflowX: question.horizontalScroll? \'scroll\': \'\'}">        <table data-bind="css: $root.css.matrixdynamic.root">            <thead>                <tr>                    <!-- ko foreach: question.columns -->                    <th data-bind="text: question.getColumnTitle($data), style: { minWidth: question.getColumnWidth($data) }"></th>                    <!-- /ko -->                    <!-- ko if: $root.isEditMode -->                    <th></th>                    <!-- /ko -->                </tr>            </thead>            <tbody>                <!-- ko foreach: { data: question.koRows, as: \'row\' } -->                <tr>                    <!-- ko foreach: row.cells-->                    <td>                        <!-- ko template: { name: \'survey-question-errors\', data: $data.question } -->                        <!-- /ko -->                        <!-- ko template: { name: \'survey-question-\' + $data.question.getType(), data: $data.question, as: \'question\' } -->                        <!-- /ko -->                    </td>                    <!-- /ko -->                    <!-- ko if: $root.isEditMode -->                    <td><input type="button" data-bind="click:question.koRemoveRowClick, css: $root.css.matrixdynamic.button, value: question.removeRowText" /></td>                    <!-- /ko -->                </tr>                <!-- /ko -->            </tbody>        </table>    </div>    <!-- ko if: $root.isEditMode -->    <input type="button" data-bind="click:question.koAddRowClick, css: $root.css.matrixdynamic.button, value: question.addRowText" />    <!-- /ko --></script><script type="text/html" id="survey-question-multipletext">    <table data-bind="css: $root.css.multipletext.root, foreach: { data:  question.koRows, as: \'row\' }">        <tr data-bind="foreach: { data: row, as: \'item\' }">            <td data-bind="text: item.title, css: $root.css.multipletext.itemTitle"></td>            <td>                <!-- ko if: $root.isEditMode -->                <input type="text" style="float:left" data-bind="attr: {size: question.itemSize, id: ($index() == 0) ? question.inputId : \'\'}, value: item.koValue, css: $root.css.multipletext.itemValue" />                <!-- /ko -->                <!-- ko if: $root.isDisplayMode -->                <div style="float:left" data-bind="attr: {size: question.itemSize}, text: item.koValue, css: $root.css.multipletext.itemValue"></div>                <!-- /ko -->            </td>        </tr>    </table></script><script type="text/html" id="survey-question-radiogroup">    <form data-bind="css: $root.css.radiogroup.root">        <!-- ko foreach: { data: question.koVisibleChoices, as: \'item\', afterRender: question.koAfterRender}  -->        <div  data-bind="style:{width: question.koWidth, \'margin-right\': question.colCount == 0 ? \'5px\': \'0px\'}, css: $root.css.radiogroup.item">            <label data-bind="css: $root.css.radiogroup.item">                <input type="radio" data-bind="attr: {name: question.name, value: item.value, id: ($index() == 0) ? question.inputId : \'\'}, checked: question.koValue, enable: $root.isEditMode" />                <span data-bind="text: item.text"></span>            </label>            <div data-bind="visible: question.hasOther && ($index() == question.koVisibleChoices().length-1)">                <div data-bind="template: { name: \'survey-comment\', data: {\'question\': question, \'visible\': question.koOtherVisible}}, css: $root.css.radiogroup.other"></div>            </div>        </div>        <!-- /ko -->    </form></script><script type="text/html" id="survey-question-rating">    <div data-bind="css: $root.css.rating.root">        <!-- ko foreach: question.koVisibleRateValues -->        <label data-bind="css: question.koGetCss($data)">            <input type="radio" style="display: none;"                    data-bind="attr: {name: question.name, id: question.name + $index(), value: $data.value}, event: { change: question.koChange}, enable: $root.isEditMode" />            <span data-bind="visible: $index() == 0, text: question.mininumRateDescription"></span>            <span data-bind="text: $data.text"></span>            <span data-bind="visible: $index() == (question.koVisibleRateValues().length-1), text: question.maximumRateDescription"></span>        </label>        <!-- /ko -->    </div>    <div data-bind="visible: question.hasOther">        <div data-bind="template: { name: \'survey-comment\', data: {\'question\': question } }"></div>    </div></script><script type="text/html" id="survey-question-text">    <!-- ko if: $root.isEditMode -->    <input data-bind="attr: {type: question.inputType, size: question.size, id: question.inputId}, value:question.koValue, css: $root.css.text"/>    <!-- /ko -->    <!-- ko if: $root.isDisplayMode -->    <div data-bind="text:question.koValue, css: $root.css.text"></div>    <!-- /ko --></script><script type="text/html" id="survey-question">    <div style="vertical-align:top" data-bind="css: $root.css.question.root, style: {display: question.koVisible() ? \'inline-block\': \'none\', marginLeft: question.koMarginLeft, paddingRight: question.koPaddingRight, width: question.koRenderWidth }, attr: {id: id}">        <!-- ko if: question.hasTitle -->        <h5 data-bind="visible: $root.questionTitleLocation == \'top\', text: question.koTitle(), css: $root.css.question.title"></h5>        <!-- /ko -->        <!-- ko template: { name: \'survey-question-errors\', data: question } -->        <!-- /ko -->        <!-- ko template: { name: \'survey-question-\' + question.getType(), data: question, afterRender: question.koQuestionAfterRender } -->        <!-- /ko -->        <div data-bind="visible: question.hasComment">            <div data-bind="text:question.commentText"></div>            <div data-bind="template: { name: \'survey-comment\', data: {\'question\': question, \'visible\': true } }"></div>        </div>        <!-- ko if: question.hasTitle -->        <h5 data-bind="visible: $root.questionTitleLocation == \'bottom\', text: question.koTitle(), css: $root.css.question.title"></h5>        <!-- /ko -->    </div></script>';

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.QuestionImplementorBase = undefined;
	
	var _knockout = __webpack_require__(38);
	
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
	        this.question["updateQuestion"] = function () {
	            self.updateQuestion();
	        };
	    }
	    QuestionImplementorBase.prototype.updateQuestion = function () {};
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
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionImplementor = undefined;
	
	var _knockout = __webpack_require__(38);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _koquestionbase = __webpack_require__(41);
	
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
	        this.question["koQuestionAfterRender"] = this.koQuestionAfterRender;
	    }
	    QuestionImplementor.prototype.updateQuestion = function () {
	        this.koDummy(this.koDummy() + 1);
	    };
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
	    QuestionImplementor.prototype.koQuestionAfterRender = function (el, con) {
	        var tEl = el[0];
	        if (tEl.nodeName == "#text") tEl.data = "";
	        tEl = el[el.length - 1];
	        if (tEl.nodeName == "#text") tEl.data = "";
	    };
	    return QuestionImplementor;
	}(_koquestionbase.QuestionImplementorBase);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionCheckboxBaseImplementor = exports.QuestionSelectBaseImplementor = undefined;
	
	var _knockout = __webpack_require__(38);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _koquestion = __webpack_require__(42);
	
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
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionCheckbox = undefined;
	
	var _knockout = __webpack_require__(38);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _koquestion_baseselect = __webpack_require__(43);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
	var _question_checkbox = __webpack_require__(23);
	
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
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionComment = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
	var _question_comment = __webpack_require__(24);
	
	var _koquestion = __webpack_require__(42);
	
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
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionDropdown = undefined;
	
	var _question_dropdown = __webpack_require__(25);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
	var _koquestion_baseselect = __webpack_require__(43);
	
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
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionFile = exports.QuestionFileImplementor = undefined;
	
	var _knockout = __webpack_require__(38);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
	var _question_file = __webpack_require__(26);
	
	var _koquestion = __webpack_require__(42);
	
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
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionHtml = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
	var _koquestionbase = __webpack_require__(41);
	
	var _question_html = __webpack_require__(27);
	
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
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMatrix = exports.MatrixRow = undefined;
	
	var _knockout = __webpack_require__(38);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _question_matrix = __webpack_require__(20);
	
	var _koquestion = __webpack_require__(42);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
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
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMatrixDropdown = undefined;
	
	var _question_matrixdropdown = __webpack_require__(18);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
	var _koquestion = __webpack_require__(42);
	
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
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMatrixDynamic = exports.QuestionMatrixDynamicImplementor = undefined;
	
	var _knockout = __webpack_require__(38);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
	var _koquestion = __webpack_require__(42);
	
	var _question_matrixdynamic = __webpack_require__(19);
	
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
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionMultipleText = exports.QuestionMultipleTextImplementor = exports.MultipleTextItem = undefined;
	
	var _knockout = __webpack_require__(38);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _question_multipletext = __webpack_require__(21);
	
	var _koquestion = __webpack_require__(42);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
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
	    var q = new QuestionMultipleText(name);q.addItem("text1");q.addItem("text2");return q;
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionRadiogroup = undefined;
	
	var _question_radiogroup = __webpack_require__(28);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
	var _koquestion_baseselect = __webpack_require__(43);
	
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
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionRating = undefined;
	
	var _knockout = __webpack_require__(38);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _koquestion = __webpack_require__(42);
	
	var _question_rating = __webpack_require__(29);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
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
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.QuestionText = exports.QuestionTextImplementor = undefined;
	
	var _question_text = __webpack_require__(30);
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionfactory = __webpack_require__(17);
	
	var _koquestion = __webpack_require__(42);
	
	var QuestionTextImplementor = exports.QuestionTextImplementor = function (_super) {
	    __extends(QuestionTextImplementor, _super);
	    function QuestionTextImplementor(question) {
	        _super.call(this, question);
	        this.question = question;
	    }
	    QuestionTextImplementor.prototype.updateValue = function (newValue) {
	        _super.prototype.updateValue.call(this, newValue);
	        if (newValue !== this.question.value) {
	            this.koValue(this.question.value);
	        }
	    };
	    return QuestionTextImplementor;
	}(_koquestion.QuestionImplementor);
	var QuestionText = exports.QuestionText = function (_super) {
	    __extends(QuestionText, _super);
	    function QuestionText(name) {
	        _super.call(this, name);
	        this.name = name;
	        new QuestionTextImplementor(this);
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
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyWindow = undefined;
	
	var _knockout = __webpack_require__(38);
	
	var ko = _interopRequireWildcard(_knockout);
	
	var _surveyWindow = __webpack_require__(34);
	
	var _kosurvey = __webpack_require__(37);
	
	var _templateWindowKo = __webpack_require__(57);
	
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
/* 57 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var koTemplate = exports.koTemplate = { html: "" };
	koTemplate.html = '<div style="position: fixed; bottom: 3px; right: 10px;" data-bind="css: $root.css.window.root">    <div data-bind="css: $root.css.window.header.root">        <a href="#" data-bind="click:doExpand" style="width:100%">            <span style="padding-right:10px" data-bind="text:title, css: $root.css.window.header.title"></span>            <span aria-hidden="true" data-bind="css: koExpandedCss"></span>        </a>    </div>    <div data-bind="visible:koExpanded, css: $root.css.window.body">        <div id="windowSurveyJS"></div>    </div></div>';

/***/ },
/* 58 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.SurveyTemplateText = undefined;
	
	var _templateKo = __webpack_require__(40);
	
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
/* 59 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(60);
	
	__webpack_require__(61);
	
	__webpack_require__(62);
	
	__webpack_require__(63);
	
	__webpack_require__(64);
	
	__webpack_require__(65);
	
	__webpack_require__(66);
	
	__webpack_require__(67);
	
	__webpack_require__(68);

/***/ },
/* 60 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.danishSurveyStrings = undefined;
	
	var _surveyStrings = __webpack_require__(6);
	
	var danishSurveyStrings = exports.danishSurveyStrings = {
	    pagePrevText: "Tilbage",
	    pageNextText: "Videre",
	    completeText: "Færdig",
	    progressText: "Side {0} af {1}",
	    emptySurvey: "Der er ingen synlige spørgsmål.",
	    completingSurvey: "Mange tak for din besvarelse!",
	    loadingSurvey: "Spørgeskemaet hentes fra serveren...",
	    otherItemText: "Valgfrit svar...",
	    optionsCaption: "Vælg...",
	    requiredError: "Besvar venligst spørgsmålet.",
	    numericError: "Angiv et tal.",
	    textMinLength: "Angiv mindst {0} tegn.",
	    minSelectError: "Vælg venligst mindst  {0} svarmulighed(er).",
	    maxSelectError: "Vælg venligst færre {0} svarmuligheder(er).",
	    numericMinMax: "'{0}' skal være lig med eller større end {1} og lig med eller mindre end {2}",
	    numericMin: "'{0}' skal være lig med eller større end {1}",
	    numericMax: "'{0}' skal være lig med eller mindre end {1}",
	    invalidEmail: "Angiv venligst en gyldig e-mail adresse.",
	    exceedMaxSize: "Filstørrelsen må ikke overstige {0}.",
	    otherRequiredError: "Angiv en værdi for dit valgfrie svar."
	};
	_surveyStrings.surveyLocalization.locales["da"] = danishSurveyStrings;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.dutchSurveyStrings = undefined;
	
	var _surveyStrings = __webpack_require__(6);
	
	var dutchSurveyStrings = exports.dutchSurveyStrings = {
	    pagePrevText: "Vorige",
	    pageNextText: "Volgende",
	    completeText: "Afsluiten",
	    otherItemText: "Andere",
	    progressText: "Pagina {0} van {1}",
	    emptySurvey: "Er is geen zichtbare pagina of vraag in deze vragenlijst",
	    completingSurvey: "Bedankt om deze vragenlijst in te vullen",
	    loadingSurvey: "De vragenlijst is aan het laden...",
	    optionsCaption: "Kies...",
	    requiredError: "Gelieve een antwoord in te vullen",
	    numericError: "Het antwoord moet een getal zijn",
	    textMinLength: "Gelieve minsten {0} karakters in te vullen.",
	    minSelectError: "Gelieve minimum {0} antwoorden te selecteren.",
	    maxSelectError: "Gelieve niet meer dan {0} antwoorden te selecteren.",
	    numericMinMax: "Uw antwoord '{0}' moet groter of gelijk zijn aan {1} en kleiner of gelijk aan {2}",
	    numericMin: "Uw antwoord '{0}' moet groter of gelijk zijn aan {1}",
	    numericMax: "Uw antwoord '{0}' moet groter of gelijk zijn aan {1}",
	    invalidEmail: "Gelieve een geldig e-mailadres in te vullen.",
	    exceedMaxSize: "De grootte van het bestand mag niet groter zijn dan {0}.",
	    otherRequiredError: "Gelieve het veld 'Andere' in te vullen"
	};
	_surveyStrings.surveyLocalization.locales["nl"] = dutchSurveyStrings;

/***/ },
/* 62 */
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
/* 63 */
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
/* 64 */
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
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.greekSurveyStrings = undefined;
	
	var _surveyStrings = __webpack_require__(6);
	
	var greekSurveyStrings = exports.greekSurveyStrings = {
	    pagePrevText: "Προηγούμενο",
	    pageNextText: "Επόμενο",
	    completeText: "Ολοκλήρωση",
	    otherItemText: "Άλλο (παρακαλώ διευκρινίστε)",
	    progressText: "Σελίδα {0} από {1}",
	    emptySurvey: "Δεν υπάρχει καμία ορατή σελίδα ή ορατή ερώτηση σε αυτό το ερωτηματολόγιο.",
	    completingSurvey: "Ευχαριστούμε για την συμπλήρωση αυτου του ερωτηματολογίου!",
	    loadingSurvey: "Το ερωτηματολόγιο φορτώνεται απο το διακομιστή...",
	    optionsCaption: "Επιλέξτε...",
	    requiredError: "Παρακαλώ απαντήστε στην ερώτηση.",
	    requiredInAllRowsError: "Παρακαλώ απαντήστε στις ερωτήσεις σε όλες τις γραμμές.",
	    numericError: "Η τιμή πρέπει να είναι αριθμιτική.",
	    textMinLength: "Παρακαλώ συμπληρώστε τουλάχιστον {0} σύμβολα.",
	    minRowCountError: "Παρακαλώ συμπληρώστε τουλάχιστον {0} γραμμές.",
	    minSelectError: "Παρακαλώ επιλέξτε τουλάχιστον {0} παραλλαγές.",
	    maxSelectError: "Παρακαλώ επιλέξτε όχι παραπάνω απο {0} παραλλαγές.",
	    numericMinMax: "Το '{0}' θα πρέπει να είναι ίσο ή μεγαλύτερο απο το {1} και ίσο ή μικρότερο απο το {2}",
	    numericMin: "Το '{0}' πρέπει να είναι μεγαλύτερο ή ισο με το {1}",
	    numericMax: "Το '{0}' πρέπει να είναι μικρότερο ή ίσο απο το {1}",
	    invalidEmail: "Παρακαλώ δώστε μια αποδεκτή διεύθυνση e-mail.",
	    urlRequestError: "Η αίτηση επέστρεψε σφάλμα '{0}'. {1}",
	    urlGetChoicesError: "Η αίτηση επέστρεψε κενά δεδομένα ή η ιδότητα 'μονοπάτι/path' είναι εσφαλέμένη",
	    exceedMaxSize: "Το μέγεθος δεν μπορεί να υπερβένει τα {0}.",
	    otherRequiredError: "Παρακαλώ συμπληρώστε την τιμή για το πεδίο 'άλλο'.",
	    uploadingFile: "Το αρχείο σας ανεβαίνει. Παρακαλώ περιμένετε καποια δευτερόλεπτα και δοκιμάστε ξανά.",
	    addRow: "Προσθήκη γραμμής",
	    removeRow: "Αφαίρεση"
	};
	_surveyStrings.surveyLocalization.locales["gr"] = greekSurveyStrings;

/***/ },
/* 66 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.polishSurveyStrings = undefined;
	
	var _surveyStrings = __webpack_require__(6);
	
	var polishSurveyStrings = exports.polishSurveyStrings = {
	    pagePrevText: "Wstecz",
	    pageNextText: "Dalej",
	    completeText: "Gotowe",
	    progressText: "Strona {0} z {1}",
	    emptySurvey: "Nie ma widocznych pytań.",
	    completingSurvey: "Dziękujemy za wypełnienie ankiety!",
	    loadingSurvey: "Trwa wczytywanie ankiety...",
	    otherItemText: "Inna odpowiedź...",
	    optionsCaption: "Wybierz...",
	    requiredError: "Proszę odpowiedzieć na to pytanie.",
	    numericError: "W tym polu można wpisać tylko liczby.",
	    textMinLength: "Proszę wpisać co najmniej {0} znaków.",
	    minSelectError: "Proszę wybrać co najmniej {0} pozycji.",
	    maxSelectError: "Proszę wybrać nie więcej niż {0} pozycji.",
	    numericMinMax: "Odpowiedź '{0}' powinna być większa lub równa {1} oraz mniejsza lub równa {2}",
	    numericMin: "Odpowiedź '{0}' powinna być większa lub równa {1}",
	    numericMax: "Odpowiedź '{0}' powinna być mniejsza lub równa {1}",
	    invalidEmail: "Proszę podać prawidłowy adres email.",
	    exceedMaxSize: "Rozmiar przesłanego pliku nie może przekraczać {0}.",
	    otherRequiredError: "Proszę podać inną odpowiedź."
	};
	_surveyStrings.surveyLocalization.locales["pl"] = polishSurveyStrings;

/***/ },
/* 67 */
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
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	exports.__esModule = true;
	exports.turkishSurveyStrings = undefined;
	
	var _surveyStrings = __webpack_require__(6);
	
	var turkishSurveyStrings = exports.turkishSurveyStrings = {
	    pagePrevText: "Geri",
	    pageNextText: "İleri",
	    completeText: "Anketi Tamamla",
	    otherItemText: "Diğer (açıklayınız)",
	    progressText: "Sayfa {0} / {1}",
	    emptySurvey: "Ankette görüntülenecek sayfa ya da soru mevcut değil.",
	    completingSurvey: "Anketimizi tamamladığınız için teşekkür ederiz.",
	    loadingSurvey: "Anket sunucudan yükleniyor ...",
	    optionsCaption: "Seçiniz ...",
	    requiredError: "Lütfen soruya cevap veriniz",
	    numericError: "Girilen değer numerik olmalıdır",
	    textMinLength: "En az {0} sembol giriniz.",
	    minRowCountError: "Lütfen en az {0} satırı doldurun.",
	    minSelectError: "Lütfen en az {0} seçeneği seçiniz.",
	    maxSelectError: "Lütfen {0} adetten fazla seçmeyiniz.",
	    numericMinMax: "The '{0}' should be equal or more than {1} and equal or less than {2}",
	    numericMin: "'{0}' değeri {1} değerine eşit veya büyük olmalıdır",
	    numericMax: "'{0}' değeri {1} değerine eşit ya da küçük olmalıdır.",
	    invalidEmail: "Lütfen geçerli bir eposta adresi giriniz.",
	    urlRequestError: "Talebi şu hatayı döndü '{0}'. {1}",
	    urlGetChoicesError: "Talep herhangi bir veri dönmedi ya da 'path' özelliği hatalı.",
	    exceedMaxSize: "Dosya boyutu {0} değerini geçemez.",
	    otherRequiredError: "Lütfen diğer değerleri giriniz.",
	    uploadingFile: "Dosyanız yükleniyor. LÜtfen birkaç saniye bekleyin ve tekrar deneyin.",
	    addRow: "Satır Ekle",
	    removeRow: "Kaldır"
	};
	_surveyStrings.surveyLocalization.locales["tr"] = turkishSurveyStrings;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBlOWMzM2M1MTdkOWQwZjY0YmI5MCIsIndlYnBhY2s6Ly8vLi9zcmMvZW50cmllcy9rby50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50cmllcy9jaHVua3MvbW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0ZW5kcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1cnZleVN0cmluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzb25vYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nob2ljZXNSZXN0ZnVsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZGl0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZGl0aW9uc1BhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZGl0aW9uUHJvY2Vzc1ZhbHVlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9tYXRyaXhkcm9wZG93bmJhc2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbmJhc2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RleHRQcmVQcm9jZXNzb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX2Jhc2VzZWxlY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uZmFjdG9yeS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb25fbWF0cml4ZHJvcGRvd24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX21hdHJpeGR5bmFtaWMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX21hdHJpeC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb25fbXVsdGlwbGV0ZXh0LnRzIiwid2VicGFjazovLy8uL3NyYy9wYWdlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9jaGVja2JveC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb25fY29tbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb25fZHJvcGRvd24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX2ZpbGUudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX2h0bWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX3JhZGlvZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX3JhdGluZy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb25fdGV4dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvc3VydmV5LnRzIiwid2VicGFjazovLy8uL3NyYy9keFN1cnZleVNlcnZpY2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3RyaWdnZXIudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1cnZleVdpbmRvdy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVmYXVsdENzcy9jc3NzdGFuZGFyZC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZGVmYXVsdENzcy9jc3Nib290c3RyYXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvc3VydmV5LnRzIiwid2VicGFjazovLy9leHRlcm5hbCB7XCJyb290XCI6XCJrb1wiLFwiY29tbW9uanMyXCI6XCJrbm9ja291dFwiLFwiY29tbW9uanNcIjpcImtub2Nrb3V0XCIsXCJhbWRcIjpcImtub2Nrb3V0XCJ9Iiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3BhZ2UudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L3RlbXBsYXRlLmtvLmh0bWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25iYXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uLnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX2Jhc2VzZWxlY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fY2hlY2tib3gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fY29tbWVudC50cyIsIndlYnBhY2s6Ly8vLi9zcmMva25vY2tvdXQva29xdWVzdGlvbl9kcm9wZG93bi50cyIsIndlYnBhY2s6Ly8vLi9zcmMva25vY2tvdXQva29xdWVzdGlvbl9maWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX2h0bWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fbWF0cml4LnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX21hdHJpeGRyb3Bkb3duLnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX21hdHJpeGR5bmFtaWMudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fbXVsdGlwbGV0ZXh0LnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX3JhZGlvZ3JvdXAudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fcmF0aW5nLnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX3RleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2tub2Nrb3V0L2tvU3VydmV5V2luZG93LnRzIiwid2VicGFjazovLy8uL3NyYy9rbm9ja291dC90ZW1wbGF0ZS53aW5kb3cua28uaHRtbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMva25vY2tvdXQvdGVtcGxhdGVUZXh0LnRzIiwid2VicGFjazovLy8uL3NyYy9lbnRyaWVzL2NodW5rcy9sb2NhbGl6YXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvY2FsaXphdGlvbi9kYW5pc2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvY2FsaXphdGlvbi9kdXRjaC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9jYWxpemF0aW9uL2Zpbm5pc2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvY2FsaXphdGlvbi9mcmVuY2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvY2FsaXphdGlvbi9nZXJtYW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvY2FsaXphdGlvbi9ncmVlay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9jYWxpemF0aW9uL3BvbGlzaC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9jYWxpemF0aW9uL3J1c3NpYW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvY2FsaXphdGlvbi90dXJraXNoLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLENBQUM7QUFDRCxPO0FDVkE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsdUJBQWU7QUFDZjtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7Ozs7Ozs7QUNyQytCOzs7Ozs7Ozs7Ozs7Ozs7eUJBUS9COzs7Ozs7Ozs7MEJBR0E7Ozs7Ozs7OztzQkFDQTs7Ozs7O3NCQUNBOzs7Ozs7Ozs7b0JBQW1COzs7Ozs7b0JBQ25COzs7Ozs7Ozs7NEJBQ0E7Ozs7Ozs7Ozt3QkFDQTs7Ozs7Ozs7O21DQUNBOzs7Ozs7bUNBQ0E7Ozs7Ozs7OztpQ0FDQTs7Ozs7Ozs7O2dDQUNBOzs7Ozs7Ozs7aUNBQ0E7Ozs7Ozs7Ozs2QkFDQTs7Ozs7Ozs7OzZCQUNBOzs7Ozs7Ozs7K0JBQWlCOzs7Ozs7K0JBQ2pCOzs7Ozs7Ozs7dUNBQ0E7Ozs7Ozs7OztzQ0FDb0M7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LmtvLmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwia25vY2tvdXRcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJTdXJ2ZXlcIiwgW1wia25vY2tvdXRcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU3VydmV5XCJdID0gZmFjdG9yeShyZXF1aXJlKFwia25vY2tvdXRcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlN1cnZleVwiXSA9IGZhY3Rvcnkocm9vdFtcImtvXCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMzhfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZTljMzNjNTE3ZDlkMGY2NGJiOTBcbiAqKi8iLCIvLyBtb2RlbFxyXG5leHBvcnQgKiBmcm9tIFwiLi9jaHVua3MvbW9kZWxcIjtcclxuXHJcbi8vIGxvY2FsaXphdGlvblxyXG5pbXBvcnQgJy4vY2h1bmtzL2xvY2FsaXphdGlvbic7XHJcblxyXG4vLyBjc3Mgc3RhbmRhcmRcclxuZXhwb3J0IHtkZWZhdWx0U3RhbmRhcmRDc3N9IGZyb20gXCIuLi9kZWZhdWx0Q3NzL2Nzc3N0YW5kYXJkXCI7XHJcbi8vIGNzcyBib290c3RyYXBcclxuZXhwb3J0IHtkZWZhdWx0Qm9vdHN0cmFwQ3NzfSBmcm9tIFwiLi4vZGVmYXVsdENzcy9jc3Nib290c3RyYXBcIjtcclxuXHJcbi8vIGtub2Nrb3V0XHJcbmV4cG9ydCB7U3VydmV5fSBmcm9tIFwiLi4va25vY2tvdXQva29zdXJ2ZXlcIjsgLy8gVE9ETyBuZWVkIHRvIHJlbW92ZSBzb21lZGF5XHJcbmV4cG9ydCB7U3VydmV5IGFzIE1vZGVsfSBmcm9tIFwiLi4va25vY2tvdXQva29zdXJ2ZXlcIjtcclxuZXhwb3J0IHtRdWVzdGlvblJvdywgUGFnZX0gZnJvbSBcIi4uL2tub2Nrb3V0L2tvcGFnZVwiO1xyXG5leHBvcnQge1F1ZXN0aW9uSW1wbGVtZW50b3JCYXNlfSBmcm9tIFwiLi4va25vY2tvdXQva29xdWVzdGlvbmJhc2VcIjtcclxuZXhwb3J0IHtRdWVzdGlvbkltcGxlbWVudG9yfSBmcm9tIFwiLi4va25vY2tvdXQva29xdWVzdGlvblwiO1xyXG5leHBvcnQge1F1ZXN0aW9uU2VsZWN0QmFzZUltcGxlbWVudG9yfSBmcm9tIFwiLi4va25vY2tvdXQva29xdWVzdGlvbl9iYXNlc2VsZWN0XCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25DaGVja2JveEJhc2VJbXBsZW1lbnRvcn0gZnJvbSBcIi4uL2tub2Nrb3V0L2tvcXVlc3Rpb25fYmFzZXNlbGVjdFwiO1xyXG5leHBvcnQge1F1ZXN0aW9uQ2hlY2tib3h9IGZyb20gXCIuLi9rbm9ja291dC9rb3F1ZXN0aW9uX2NoZWNrYm94XCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25Db21tZW50fSBmcm9tIFwiLi4va25vY2tvdXQva29xdWVzdGlvbl9jb21tZW50XCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25Ecm9wZG93bn0gZnJvbSBcIi4uL2tub2Nrb3V0L2tvcXVlc3Rpb25fZHJvcGRvd25cIjtcclxuZXhwb3J0IHtRdWVzdGlvbkZpbGV9IGZyb20gXCIuLi9rbm9ja291dC9rb3F1ZXN0aW9uX2ZpbGVcIjtcclxuZXhwb3J0IHtRdWVzdGlvbkh0bWx9IGZyb20gXCIuLi9rbm9ja291dC9rb3F1ZXN0aW9uX2h0bWxcIjtcclxuZXhwb3J0IHtNYXRyaXhSb3csIFF1ZXN0aW9uTWF0cml4fSBmcm9tIFwiLi4va25vY2tvdXQva29xdWVzdGlvbl9tYXRyaXhcIjtcclxuZXhwb3J0IHtRdWVzdGlvbk1hdHJpeERyb3Bkb3dufSBmcm9tIFwiLi4va25vY2tvdXQva29xdWVzdGlvbl9tYXRyaXhkcm9wZG93blwiO1xyXG5leHBvcnQge1xyXG4gICAgUXVlc3Rpb25NYXRyaXhEeW5hbWljSW1wbGVtZW50b3IsXHJcbiAgICBRdWVzdGlvbk1hdHJpeER5bmFtaWNcclxufSBmcm9tIFwiLi4va25vY2tvdXQva29xdWVzdGlvbl9tYXRyaXhkeW5hbWljXCI7XHJcbmV4cG9ydCB7XHJcbiAgICBNdWx0aXBsZVRleHRJdGVtLCBRdWVzdGlvbk11bHRpcGxlVGV4dEltcGxlbWVudG9yLFxyXG4gICAgUXVlc3Rpb25NdWx0aXBsZVRleHRcclxufSBmcm9tIFwiLi4va25vY2tvdXQva29xdWVzdGlvbl9tdWx0aXBsZXRleHRcIjtcclxuZXhwb3J0IHtRdWVzdGlvblJhZGlvZ3JvdXB9IGZyb20gXCIuLi9rbm9ja291dC9rb3F1ZXN0aW9uX3JhZGlvZ3JvdXBcIjtcclxuZXhwb3J0IHtRdWVzdGlvblJhdGluZ30gZnJvbSBcIi4uL2tub2Nrb3V0L2tvcXVlc3Rpb25fcmF0aW5nXCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25UZXh0fSBmcm9tIFwiLi4va25vY2tvdXQva29xdWVzdGlvbl90ZXh0XCI7XHJcbmV4cG9ydCB7U3VydmV5V2luZG93fSBmcm9tIFwiLi4va25vY2tvdXQva29TdXJ2ZXlXaW5kb3dcIjtcclxuZXhwb3J0IHtTdXJ2ZXlUZW1wbGF0ZVRleHR9IGZyb20gXCIuLi9rbm9ja291dC90ZW1wbGF0ZVRleHRcIjtcclxuXHJcbmV4cG9ydCB7X19leHRlbmRzfSBmcm9tIFwiLi4vZXh0ZW5kc1wiO1xyXG5cclxuLy9VbmNvbW1lbnQgdG8gaW5jbHVkZSB0aGUgXCJkYXRlXCIgcXVlc3Rpb24gdHlwZS5cclxuLy9leHBvcnQge1F1ZXN0aW9uRGF0ZX0gZnJvbSBcIi4uL3BsdWdpbnMva25vY2tvdXQva29xdWVzdGlvbl9kYXRlXCI7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZW50cmllcy9rby50c1xuICoqLyIsImV4cG9ydCB7XHJcbiAgICBBbnN3ZXJDb3VudFZhbGlkYXRvciwgRW1haWxWYWxpZGF0b3IsIE51bWVyaWNWYWxpZGF0b3IsIFJlZ2V4VmFsaWRhdG9yLFxyXG4gICAgU3VydmV5VmFsaWRhdG9yLCBUZXh0VmFsaWRhdG9yLCBWYWxpZGF0b3JSZXN1bHQsIFZhbGlkYXRvclJ1bm5lclxyXG59IGZyb20gXCIuLi8uLi92YWxpZGF0b3JcIjtcclxuZXhwb3J0IHtCYXNlLCBFdmVudCwgSXRlbVZhbHVlLCBTdXJ2ZXlFcnJvciwgSVN1cnZleX0gZnJvbSBcIi4uLy4uL2Jhc2VcIjtcclxuZXhwb3J0IHtDaG9pY2VzUmVzdGZ1bGx9IGZyb20gXCIuLi8uLi9jaG9pY2VzUmVzdGZ1bGxcIjtcclxuZXhwb3J0IHtDb25kaXRpb24sIENvbmRpdGlvbk5vZGUsIENvbmRpdGlvblJ1bm5lcn0gZnJvbSBcIi4uLy4uL2NvbmRpdGlvbnNcIjtcclxuZXhwb3J0IHtDb25kaXRpb25zUGFyc2VyfSBmcm9tIFwiLi4vLi4vY29uZGl0aW9uc1BhcnNlclwiO1xyXG5leHBvcnQge1Byb2Nlc3NWYWx1ZX0gZnJvbSBcIi4uLy4uL2NvbmRpdGlvblByb2Nlc3NWYWx1ZVwiO1xyXG5leHBvcnQge0N1c3RvbUVycm9yLCBFeGNlZWRTaXplRXJyb3IsIFJlcXVyZU51bWVyaWNFcnJvcn0gZnJvbSBcIi4uLy4uL2Vycm9yXCI7XHJcbmV4cG9ydCB7XHJcbiAgICBKc29uRXJyb3IsIEpzb25JbmNvcnJlY3RUeXBlRXJyb3IsIEpzb25NZXRhZGF0YSwgSnNvbk1ldGFkYXRhQ2xhc3MsXHJcbiAgICBKc29uTWlzc2luZ1R5cGVFcnJvciwgSnNvbk1pc3NpbmdUeXBlRXJyb3JCYXNlLCBKc29uT2JqZWN0LCBKc29uT2JqZWN0UHJvcGVydHksXHJcbiAgICBKc29uUmVxdWlyZWRQcm9wZXJ0eUVycm9yLCBKc29uVW5rbm93blByb3BlcnR5RXJyb3JcclxufSBmcm9tIFwiLi4vLi4vanNvbm9iamVjdFwiO1xyXG5leHBvcnQge1xyXG4gICAgTWF0cml4RHJvcGRvd25DZWxsLCBNYXRyaXhEcm9wZG93bkNvbHVtbiwgTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UsXHJcbiAgICBRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWxCYXNlXHJcbn0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX21hdHJpeGRyb3Bkb3duYmFzZVwiO1xyXG5leHBvcnQge01hdHJpeERyb3Bkb3duUm93TW9kZWwsIFF1ZXN0aW9uTWF0cml4RHJvcGRvd25Nb2RlbH0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX21hdHJpeGRyb3Bkb3duXCI7XHJcbmV4cG9ydCB7TWF0cml4RHluYW1pY1Jvd01vZGVsLCBRdWVzdGlvbk1hdHJpeER5bmFtaWNNb2RlbH0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX21hdHJpeGR5bmFtaWNcIjtcclxuZXhwb3J0IHtNYXRyaXhSb3dNb2RlbCwgUXVlc3Rpb25NYXRyaXhNb2RlbH0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX21hdHJpeFwiO1xyXG5leHBvcnQge011bHRpcGxlVGV4dEl0ZW1Nb2RlbCwgUXVlc3Rpb25NdWx0aXBsZVRleHRNb2RlbH0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX211bHRpcGxldGV4dFwiO1xyXG5leHBvcnQge1BhZ2VNb2RlbCwgUXVlc3Rpb25Sb3dNb2RlbH0gZnJvbSBcIi4uLy4uL3BhZ2VcIjtcclxuZXhwb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uXCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25CYXNlfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25iYXNlXCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25DaGVja2JveEJhc2UsIFF1ZXN0aW9uU2VsZWN0QmFzZX0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX2Jhc2VzZWxlY3RcIjtcclxuZXhwb3J0IHtRdWVzdGlvbkNoZWNrYm94TW9kZWx9IGZyb20gXCIuLi8uLi9xdWVzdGlvbl9jaGVja2JveFwiO1xyXG5leHBvcnQge1F1ZXN0aW9uQ29tbWVudE1vZGVsfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25fY29tbWVudFwiO1xyXG5leHBvcnQgeyBRdWVzdGlvbkRyb3Bkb3duTW9kZWx9IGZyb20gXCIuLi8uLi9xdWVzdGlvbl9kcm9wZG93blwiO1xyXG5leHBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5leHBvcnQge1F1ZXN0aW9uRmlsZU1vZGVsfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25fZmlsZVwiO1xyXG5leHBvcnQge1F1ZXN0aW9uSHRtbE1vZGVsfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25faHRtbFwiO1xyXG5leHBvcnQge1F1ZXN0aW9uUmFkaW9ncm91cE1vZGVsfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25fcmFkaW9ncm91cFwiO1xyXG5leHBvcnQge1F1ZXN0aW9uUmF0aW5nTW9kZWx9IGZyb20gXCIuLi8uLi9xdWVzdGlvbl9yYXRpbmdcIjtcclxuZXhwb3J0IHtRdWVzdGlvblRleHRNb2RlbH0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX3RleHRcIjtcclxuZXhwb3J0IHtTdXJ2ZXlNb2RlbH0gZnJvbSBcIi4uLy4uL3N1cnZleVwiO1xyXG5leHBvcnQge1xyXG4gICAgU3VydmV5VHJpZ2dlciwgU3VydmV5VHJpZ2dlckNvbXBsZXRlLCBTdXJ2ZXlUcmlnZ2VyU2V0VmFsdWUsIFN1cnZleVRyaWdnZXJWaXNpYmxlLFxyXG4gICAgVHJpZ2dlclxyXG59IGZyb20gXCIuLi8uLi90cmlnZ2VyXCI7XHJcbmV4cG9ydCB7U3VydmV5V2luZG93TW9kZWx9IGZyb20gXCIuLi8uLi9zdXJ2ZXlXaW5kb3dcIjtcclxuZXhwb3J0IHtUZXh0UHJlUHJvY2Vzc29yfSBmcm9tIFwiLi4vLi4vdGV4dFByZVByb2Nlc3NvclwiO1xyXG5cclxuZXhwb3J0IHtkeFN1cnZleVNlcnZpY2V9IGZyb20gXCIuLi8uLi9keFN1cnZleVNlcnZpY2VcIjtcclxuZXhwb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb24sIHN1cnZleVN0cmluZ3N9IGZyb20gXCIuLi8uLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcblxyXG4vL1VuY29tbWVudCB0byBpbmNsdWRlIHRoZSBcImRhdGVcIiBxdWVzdGlvbiB0eXBlLlxyXG4vL2V4cG9ydCB7ZGVmYXVsdCBhcyBRdWVzdGlvbkRhdGVNb2RlbH0gZnJvbSBcIi4uLy4uL3BsdWdpbnMvcXVlc3Rpb25fZGF0ZVwiO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2VudHJpZXMvY2h1bmtzL21vZGVsLnRzXG4gKiovIiwiaW1wb3J0IHtCYXNlLCBTdXJ2ZXlFcnJvcn0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQge0N1c3RvbUVycm9yLCBSZXF1cmVOdW1lcmljRXJyb3J9IGZyb20gXCIuL2Vycm9yXCI7XHJcbmltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tIFwiLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSAnLi9qc29ub2JqZWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3JSZXN1bHQge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBhbnksIHB1YmxpYyBlcnJvcjogU3VydmV5RXJyb3IgPSBudWxsKSB7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlWYWxpZGF0b3IgZXh0ZW5kcyBCYXNlIHtcclxuICAgIHB1YmxpYyB0ZXh0OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXRFcnJvclRleHQobmFtZTogc3RyaW5nKSA6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMudGV4dCkgcmV0dXJuIHRoaXMudGV4dDtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0RXJyb3JUZXh0KG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldERlZmF1bHRFcnJvclRleHQobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyB2YWxpZGF0ZSh2YWx1ZTogYW55LCBuYW1lOiBzdHJpbmcgPSBudWxsKTogVmFsaWRhdG9yUmVzdWx0IHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0b3JPd25lciB7XHJcbiAgICB2YWxpZGF0b3JzOiBBcnJheTxTdXJ2ZXlWYWxpZGF0b3I+O1xyXG4gICAgdmFsdWU6IGFueTtcclxuICAgIGdldFZhbGlkYXRvclRpdGxlKCk6IHN0cmluZztcclxufVxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yUnVubmVyIHtcclxuICAgIHB1YmxpYyBydW4ob3duZXI6IElWYWxpZGF0b3JPd25lcik6IFN1cnZleUVycm9yIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG93bmVyLnZhbGlkYXRvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHZhbGlkYXRvclJlc3VsdCA9IG93bmVyLnZhbGlkYXRvcnNbaV0udmFsaWRhdGUob3duZXIudmFsdWUsIG93bmVyLmdldFZhbGlkYXRvclRpdGxlKCkpO1xyXG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yUmVzdWx0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0b3JSZXN1bHQuZXJyb3IpIHJldHVybiB2YWxpZGF0b3JSZXN1bHQuZXJyb3I7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRhdG9yUmVzdWx0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3duZXIudmFsdWUgPSB2YWxpZGF0b3JSZXN1bHQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOdW1lcmljVmFsaWRhdG9yIGV4dGVuZHMgU3VydmV5VmFsaWRhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtaW5WYWx1ZTogbnVtYmVyID0gbnVsbCwgcHVibGljIG1heFZhbHVlOiBudW1iZXIgPSBudWxsKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7IHJldHVybiBcIm51bWVyaWN2YWxpZGF0b3JcIjsgfVxyXG4gICAgcHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIG5hbWU6IHN0cmluZyA9IG51bGwpOiBWYWxpZGF0b3JSZXN1bHQge1xyXG4gICAgICAgIGlmICghdmFsdWUgfHwgIXRoaXMuaXNOdW1iZXIodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmFsaWRhdG9yUmVzdWx0KG51bGwsIG5ldyBSZXF1cmVOdW1lcmljRXJyb3IoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgVmFsaWRhdG9yUmVzdWx0KHBhcnNlRmxvYXQodmFsdWUpKTtcclxuICAgICAgICBpZiAodGhpcy5taW5WYWx1ZSAmJiB0aGlzLm1pblZhbHVlID4gcmVzdWx0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lcnJvciA9IG5ldyBDdXN0b21FcnJvcih0aGlzLmdldEVycm9yVGV4dChuYW1lKSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1heFZhbHVlICYmIHRoaXMubWF4VmFsdWUgPCByZXN1bHQudmFsdWUpIHtcclxuICAgICAgICAgICAgcmVzdWx0LmVycm9yID0gbmV3IEN1c3RvbUVycm9yKHRoaXMuZ2V0RXJyb3JUZXh0KG5hbWUpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSA/IG51bGwgOiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdEVycm9yVGV4dChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgdk5hbWUgPSBuYW1lID8gbmFtZSA6IFwidmFsdWVcIjtcclxuICAgICAgICBpZiAodGhpcy5taW5WYWx1ZSAmJiB0aGlzLm1heFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwibnVtZXJpY01pbk1heFwiKVtcImZvcm1hdFwiXSh2TmFtZSwgdGhpcy5taW5WYWx1ZSwgdGhpcy5tYXhWYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwibnVtZXJpY01pblwiKVtcImZvcm1hdFwiXSh2TmFtZSwgdGhpcy5taW5WYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJudW1lcmljTWF4XCIpW1wiZm9ybWF0XCJdKHZOYW1lLCB0aGlzLm1heFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzTnVtYmVyKHZhbHVlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KHZhbHVlKSkgJiYgaXNGaW5pdGUodmFsdWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dFZhbGlkYXRvciBleHRlbmRzIFN1cnZleVZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbWluTGVuZ3RoOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7IHJldHVybiBcInRleHR2YWxpZGF0b3JcIjsgfVxyXG4gICAgcHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIG5hbWU6IHN0cmluZyA9IG51bGwpOiBWYWxpZGF0b3JSZXN1bHQge1xyXG4gICAgICAgIGlmICh0aGlzLm1pbkxlbmd0aCA8PSAwKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA8IHRoaXMubWluTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmFsaWRhdG9yUmVzdWx0KG51bGwsIG5ldyBDdXN0b21FcnJvcih0aGlzLmdldEVycm9yVGV4dChuYW1lKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXREZWZhdWx0RXJyb3JUZXh0KG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwidGV4dE1pbkxlbmd0aFwiKVtcImZvcm1hdFwiXSh0aGlzLm1pbkxlbmd0aCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBbnN3ZXJDb3VudFZhbGlkYXRvciBleHRlbmRzIFN1cnZleVZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbWluQ291bnQ6IG51bWJlciA9IG51bGwsIHB1YmxpYyBtYXhDb3VudDogbnVtYmVyID0gbnVsbCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJhbnN3ZXJjb3VudHZhbGlkYXRvclwiOyB9XHJcbiAgICBwdWJsaWMgdmFsaWRhdGUodmFsdWU6IGFueSwgbmFtZTogc3RyaW5nID0gbnVsbCk6IFZhbGlkYXRvclJlc3VsdCB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUuY29uc3RydWN0b3IgIT0gQXJyYXkpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciBjb3VudCA9IHZhbHVlLmxlbmd0aDtcclxuICAgICAgICBpZiAodGhpcy5taW5Db3VudCAmJiBjb3VudCA8IHRoaXMubWluQ291bnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWYWxpZGF0b3JSZXN1bHQobnVsbCwgbmV3IEN1c3RvbUVycm9yKHRoaXMuZ2V0RXJyb3JUZXh0KHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJtaW5TZWxlY3RFcnJvclwiKVtcImZvcm1hdFwiXSh0aGlzLm1pbkNvdW50KSkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubWF4Q291bnQgJiYgY291bnQgPiB0aGlzLm1heENvdW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmFsaWRhdG9yUmVzdWx0KG51bGwsIG5ldyBDdXN0b21FcnJvcih0aGlzLmdldEVycm9yVGV4dChzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwibWF4U2VsZWN0RXJyb3JcIilbXCJmb3JtYXRcIl0odGhpcy5tYXhDb3VudCkpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldERlZmF1bHRFcnJvclRleHQobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZWdleFZhbGlkYXRvciBleHRlbmRzIFN1cnZleVZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVnZXg6IHN0cmluZyA9IG51bGwpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIFwicmVnZXh2YWxpZGF0b3JcIjsgfVxyXG4gICAgcHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIG5hbWU6IHN0cmluZyA9IG51bGwpOiBWYWxpZGF0b3JSZXN1bHQge1xyXG4gICAgICAgIGlmICghdGhpcy5yZWdleCB8fCAhdmFsdWUpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAodGhpcy5yZWdleCk7XHJcbiAgICAgICAgaWYgKHJlLnRlc3QodmFsdWUpKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gbmV3IFZhbGlkYXRvclJlc3VsdCh2YWx1ZSwgbmV3IEN1c3RvbUVycm9yKHRoaXMuZ2V0RXJyb3JUZXh0KG5hbWUpKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIEVtYWlsVmFsaWRhdG9yIGV4dGVuZHMgU3VydmV5VmFsaWRhdG9yIHtcclxuICAgIHByaXZhdGUgcmUgPSAvXigoW148PigpXFxbXFxdXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdK1xcLikrW148PigpW1xcXVxcLiw7Olxcc0BcXFwiXXsyLH0pJC9pO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7IHJldHVybiBcImVtYWlsdmFsaWRhdG9yXCI7IH1cclxuICAgIHB1YmxpYyB2YWxpZGF0ZSh2YWx1ZTogYW55LCBuYW1lOiBzdHJpbmcgPSBudWxsKTogVmFsaWRhdG9yUmVzdWx0IHtcclxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5yZS50ZXN0KHZhbHVlKSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWYWxpZGF0b3JSZXN1bHQodmFsdWUsIG5ldyBDdXN0b21FcnJvcih0aGlzLmdldEVycm9yVGV4dChuYW1lKSkpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldERlZmF1bHRFcnJvclRleHQobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJpbnZhbGlkRW1haWxcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJzdXJ2ZXl2YWxpZGF0b3JcIiwgW1widGV4dFwiXSk7XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJudW1lcmljdmFsaWRhdG9yXCIsIFtcIm1pblZhbHVlOm51bWJlclwiLCBcIm1heFZhbHVlOm51bWJlclwiXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE51bWVyaWNWYWxpZGF0b3IoKTsgfSwgXCJzdXJ2ZXl2YWxpZGF0b3JcIik7XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJ0ZXh0dmFsaWRhdG9yXCIsIFtcIm1pbkxlbmd0aDpudW1iZXJcIl0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUZXh0VmFsaWRhdG9yKCk7IH0sIFwic3VydmV5dmFsaWRhdG9yXCIpO1xyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwiYW5zd2VyY291bnR2YWxpZGF0b3JcIiwgW1wibWluQ291bnQ6bnVtYmVyXCIsIFwibWF4Q291bnQ6bnVtYmVyXCJdLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQW5zd2VyQ291bnRWYWxpZGF0b3IoKTsgfSwgXCJzdXJ2ZXl2YWxpZGF0b3JcIik7XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJyZWdleHZhbGlkYXRvclwiLCBbXCJyZWdleFwiXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFJlZ2V4VmFsaWRhdG9yKCk7IH0sIFwic3VydmV5dmFsaWRhdG9yXCIpO1xyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwiZW1haWx2YWxpZGF0b3JcIiwgW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBFbWFpbFZhbGlkYXRvcigpOyB9LCBcInN1cnZleXZhbGlkYXRvclwiKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92YWxpZGF0b3IudHNcbiAqKi8iLCJleHBvcnQgZnVuY3Rpb24gX19leHRlbmRzIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IF9fZXh0ZW5kcztcclxufVxyXG5cclxuZXhwb3J0cy5fX2V4dGVuZHMgPSBfX2V4dGVuZHM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZXh0ZW5kcy50c1xuICoqLyIsImV4cG9ydCBpbnRlcmZhY2UgSGFzaFRhYmxlPFQ+IHtcclxuICAgIFtrZXk6IHN0cmluZ106IFQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJU3VydmV5RGF0YSB7XHJcbiAgICBnZXRWYWx1ZShuYW1lOiBzdHJpbmcpOiBhbnk7XHJcbiAgICBzZXRWYWx1ZShuYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBhbnkpO1xyXG4gICAgZ2V0Q29tbWVudChuYW1lOiBzdHJpbmcpOiBzdHJpbmc7XHJcbiAgICBzZXRDb21tZW50KG5hbWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZyk7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJU3VydmV5IGV4dGVuZHMgSVN1cnZleURhdGEge1xyXG4gICAgY3VycmVudFBhZ2U6IElQYWdlO1xyXG4gICAgcGFnZVZpc2liaWxpdHlDaGFuZ2VkKHBhZ2U6IElQYWdlLCBuZXdWYWx1ZTogYm9vbGVhbik7XHJcbiAgICBxdWVzdGlvblZpc2liaWxpdHlDaGFuZ2VkKHF1ZXN0aW9uOiBJUXVlc3Rpb24sIG5ld1ZhbHVlOiBib29sZWFuKTtcclxuICAgIHF1ZXN0aW9uQWRkZWQocXVlc3Rpb246IElRdWVzdGlvbiwgaW5kZXg6IG51bWJlcik7XHJcbiAgICBxdWVzdGlvblJlbW92ZWQocXVlc3Rpb246IElRdWVzdGlvbik7XHJcbiAgICB2YWxpZGF0ZVF1ZXN0aW9uKG5hbWU6IHN0cmluZyk6IFN1cnZleUVycm9yO1xyXG4gICAgcHJvY2Vzc0h0bWwoaHRtbDogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgcHJvY2Vzc1RleHQodGV4dDogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgaXNEZXNpZ25Nb2RlOiBib29sZWFuO1xyXG4gICAgcmVxdWlyZWRUZXh0OiBzdHJpbmc7XHJcbiAgICBxdWVzdGlvblN0YXJ0SW5kZXg6IHN0cmluZztcclxuICAgIHF1ZXN0aW9uVGl0bGVUZW1wbGF0ZTogc3RyaW5nO1xyXG4gICAgc3RvcmVPdGhlcnNBc0NvbW1lbnQ6IGJvb2xlYW47XHJcbiAgICB1cGxvYWRGaWxlKG5hbWU6IHN0cmluZywgZmlsZTogRmlsZSwgc3RvcmVEYXRhQXNUZXh0OiBib29sZWFuLCB1cGxvYWRpbmdDYWxsYmFjazogKHN0YXR1czogc3RyaW5nKSA9PiBhbnkpOiBib29sZWFuO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmRpdGlvblJ1bm5lciB7XHJcbiAgICBydW5Db25kaXRpb24odmFsdWVzOiBIYXNoVGFibGU8YW55Pik7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJUXVlc3Rpb24gZXh0ZW5kcyBJQ29uZGl0aW9uUnVubmVyIHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHZpc2libGU6IGJvb2xlYW47XHJcbiAgICBoYXNUaXRsZTogYm9vbGVhbjtcclxuICAgIHNldFZpc2libGVJbmRleCh2YWx1ZTogbnVtYmVyKTtcclxuICAgIG9uU3VydmV5VmFsdWVDaGFuZ2VkKG5ld1ZhbHVlOiBhbnkpO1xyXG4gICAgb25TdXJ2ZXlMb2FkKCk7XHJcbiAgICBzdXBwb3J0R29OZXh0UGFnZUF1dG9tYXRpYygpOiBib29sZWFuO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhZ2UgZXh0ZW5kcyBJQ29uZGl0aW9uUnVubmVyIHtcclxuICAgIHZpc2libGU6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJdGVtVmFsdWUge1xyXG4gICAgcHVibGljIHN0YXRpYyBTZXBhcmF0b3IgPSAnfCc7XHJcbiAgICBwdWJsaWMgc3RhdGljIHNldERhdGEoaXRlbXM6IEFycmF5PEl0ZW1WYWx1ZT4sIHZhbHVlczogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIGl0ZW1zLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVzW2ldO1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IG5ldyBJdGVtVmFsdWUobnVsbCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHZhbHVlLnZhbHVlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBleGNlcHRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAodmFsdWUuZ2V0VHlwZSkgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlLmdldFR5cGUoKSA9PSAnaXRlbXZhbHVlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLml0ZW1WYWx1ZSA9IHZhbHVlLml0ZW1WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLml0ZW1UZXh0ID0gdmFsdWUuaXRlbVRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhjZXB0aW9uID0gSXRlbVZhbHVlLml0ZW1WYWx1ZVByb3A7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBJdGVtVmFsdWUuY29weUF0dHJpYnV0ZXModmFsdWUsIGl0ZW0sIGV4Y2VwdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldERhdGEoaXRlbXM6IEFycmF5PEl0ZW1WYWx1ZT4pOiBhbnkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gaXRlbXNbaV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmhhc1RleHQpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHsgdmFsdWU6IGl0ZW0udmFsdWUsIHRleHQ6IGl0ZW0udGV4dCB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0udmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEl0ZW1CeVZhbHVlKGl0ZW1zOiBBcnJheTxJdGVtVmFsdWU+LCB2YWw6IGFueSk6IEl0ZW1WYWx1ZSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkgKyspIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW1zW2ldLnZhbHVlID09IHZhbCkgcmV0dXJuIGl0ZW1zW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIGl0ZW1WYWx1ZVByb3AgPSBbIFwidGV4dFwiLCBcInZhbHVlXCIsIFwiaGFzVGV4dFwiXTtcclxuICAgIHByaXZhdGUgc3RhdGljIGNvcHlBdHRyaWJ1dGVzKHNyYzogYW55LCBkZXN0OiBhbnksIGV4Y2VwdG9uczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzcmMpIHtcclxuICAgICAgICAgICAgaWYgKCh0eXBlb2Ygc3JjW2tleV0gPT0gJ2Z1bmN0aW9uJykpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAoZXhjZXB0b25zICYmIGV4Y2VwdG9ucy5pbmRleE9mKGtleSkgPiAtMSkgY29udGludWU7XHJcbiAgICAgICAgICAgIGRlc3Rba2V5XSA9IHNyY1trZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgaXRlbVZhbHVlOiBhbnk7XHJcbiAgICBwcml2YXRlIGl0ZW1UZXh0OiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogYW55LCB0ZXh0OiBzdHJpbmcgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJpdGVtdmFsdWVcIjsgfVxyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5pdGVtVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgdmFsdWUobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaXRlbVZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1WYWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBzdHI6IHN0cmluZyA9IHRoaXMuaXRlbVZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gc3RyLmluZGV4T2YoSXRlbVZhbHVlLlNlcGFyYXRvcik7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtVmFsdWUgPSBzdHIuc2xpY2UoMCwgaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLnRleHQgPSBzdHIuc2xpY2UoaW5kZXggKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGhhc1RleHQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLml0ZW1UZXh0ID8gdHJ1ZSA6IGZhbHNlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IHRleHQoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNUZXh0KSByZXR1cm4gdGhpcy5pdGVtVGV4dDtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZSkgcmV0dXJuIHRoaXMudmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgdGV4dChuZXdUZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLml0ZW1UZXh0ID0gbmV3VGV4dDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2Uge1xyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgbWV0aG9kIGlzIGFic3RyYWN0Jyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFN1cnZleUVycm9yIHtcclxuICAgIHB1YmxpYyBnZXRUZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBhYnN0cmFjdCcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgU3VydmV5UGFnZUlkID0gXCJzcV9wYWdlXCI7XHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlFbGVtZW50IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgU2Nyb2xsRWxlbWVudFRvVG9wKGVsZW1lbnRJZDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50SWQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xyXG4gICAgICAgIGlmICghZWwgfHwgIWVsLnNjcm9sbEludG9WaWV3KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIGVsZW1Ub3AgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcbiAgICAgICAgaWYgKGVsZW1Ub3AgPCAwKSAgZWwuc2Nyb2xsSW50b1ZpZXcoKTtcclxuICAgICAgICByZXR1cm4gZWxlbVRvcCA8IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIEZvY3VzRWxlbWVudChlbGVtZW50SWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghZWxlbWVudElkKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcclxuICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgZWwuZm9jdXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50PFQgZXh0ZW5kcyBGdW5jdGlvbiwgT3B0aW9ucz4gIHtcclxuICAgIHByaXZhdGUgY2FsbGJhY2tzOiBBcnJheTxUPjtcclxuICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuY2FsbGJhY2tzID09IG51bGwgfHwgdGhpcy5jYWxsYmFja3MubGVuZ3RoID09IDA7IH1cclxuICAgIHB1YmxpYyBmaXJlKHNlbmRlcjogYW55LCBvcHRpb25zOiBPcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tzID09IG51bGwpIHJldHVybjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2FsbGJhY2tzLmxlbmd0aDsgaSArKykge1xyXG4gICAgICAgICAgICB2YXIgY2FsbFJlc3VsdCA9IHRoaXMuY2FsbGJhY2tzW2ldKHNlbmRlciwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGQoZnVuYzogVCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzID0gbmV3IEFycmF5PFQ+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goZnVuYyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVtb3ZlKGZ1bmM6IFQpIHtcclxuICAgICAgICBpZiAodGhpcy5jYWxsYmFja3MgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuY2FsbGJhY2tzLmluZGV4T2YoZnVuYywgMCk7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2Jhc2UudHNcbiAqKi8iLCJpbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSAnLi9zdXJ2ZXlTdHJpbmdzJztcclxuaW1wb3J0IHtTdXJ2ZXlFcnJvcn0gZnJvbSBcIi4vYmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFuc3dlclJlcXVpcmVkRXJyb3IgZXh0ZW5kcyBTdXJ2ZXlFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJyZXF1aXJlZEVycm9yXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBSZXF1cmVOdW1lcmljRXJyb3IgZXh0ZW5kcyBTdXJ2ZXlFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFRleHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcIm51bWVyaWNFcnJvclwiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgRXhjZWVkU2l6ZUVycm9yIGV4dGVuZHMgU3VydmV5RXJyb3Ige1xyXG4gICAgcHJpdmF0ZSBtYXhTaXplOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihtYXhTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubWF4U2l6ZSA9IG1heFNpemU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VGV4dCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwiZXhjZWVkTWF4U2l6ZVwiKVtcImZvcm1hdFwiXSh0aGlzLmdldFRleHRTaXplKCkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRUZXh0U2l6ZSgpIHtcclxuICAgICAgICB2YXIgc2l6ZXMgPSBbJ0J5dGVzJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJ107XHJcbiAgICAgICAgdmFyIGZpeGVkID0gWzAsIDAsIDIsIDMsIDNdO1xyXG4gICAgICAgIGlmICh0aGlzLm1heFNpemUgPT0gMCkgcmV0dXJuICcwIEJ5dGUnO1xyXG4gICAgICAgIHZhciBpID0gTWF0aC5mbG9vcihNYXRoLmxvZyh0aGlzLm1heFNpemUpIC8gTWF0aC5sb2coMTAyNCkpO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMubWF4U2l6ZSAvIE1hdGgucG93KDEwMjQsIGkpO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS50b0ZpeGVkKGZpeGVkW2ldKSArICcgJyArIHNpemVzW2ldO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tRXJyb3IgZXh0ZW5kcyBTdXJ2ZXlFcnJvciB7XHJcbiAgICBwcml2YXRlIHRleHQ6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dDtcclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2Vycm9yLnRzXG4gKiovIiwiZXhwb3J0IHZhciBzdXJ2ZXlMb2NhbGl6YXRpb24gPSB7XHJcbiAgICBjdXJyZW50TG9jYWxlOiBcIlwiLFxyXG4gICAgbG9jYWxlczoge30sXHJcbiAgICBnZXRTdHJpbmc6IGZ1bmN0aW9uIChzdHJOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgbG9jID0gdGhpcy5jdXJyZW50TG9jYWxlID8gdGhpcy5sb2NhbGVzW3RoaXMuY3VycmVudExvY2FsZV0gOiBzdXJ2ZXlTdHJpbmdzO1xyXG4gICAgICAgIGlmICghbG9jIHx8ICFsb2Nbc3RyTmFtZV0pIGxvYyA9IHN1cnZleVN0cmluZ3M7XHJcbiAgICAgICAgcmV0dXJuIGxvY1tzdHJOYW1lXTtcclxuICAgIH0sXHJcbiAgICBnZXRMb2NhbGVzOiBmdW5jdGlvbiAoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgdmFyIHJlcyA9IFtdO1xyXG4gICAgICAgIHJlcy5wdXNoKFwiXCIpO1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmxvY2FsZXMpIHtcclxuICAgICAgICAgICAgcmVzLnB1c2goa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzLnNvcnQoKTtcclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgdmFyIHN1cnZleVN0cmluZ3MgPSB7XHJcbiAgICBwYWdlUHJldlRleHQ6IFwiUHJldmlvdXNcIixcclxuICAgIHBhZ2VOZXh0VGV4dDogXCJOZXh0XCIsXHJcbiAgICBjb21wbGV0ZVRleHQ6IFwiQ29tcGxldGVcIixcclxuICAgIG90aGVySXRlbVRleHQ6IFwiT3RoZXIgKGRlc2NyaWJlKVwiLFxyXG4gICAgcHJvZ3Jlc3NUZXh0OiBcIlBhZ2UgezB9IG9mIHsxfVwiLFxyXG4gICAgZW1wdHlTdXJ2ZXk6IFwiVGhlcmUgaXMgbm8gdmlzaWJsZSBwYWdlIG9yIHF1ZXN0aW9uIGluIHRoZSBzdXJ2ZXkuXCIsXHJcbiAgICBjb21wbGV0aW5nU3VydmV5OiBcIlRoYW5rIHlvdSBmb3IgY29tcGxldGluZyB0aGUgc3VydmV5IVwiLFxyXG4gICAgbG9hZGluZ1N1cnZleTogXCJTdXJ2ZXkgaXMgbG9hZGluZy4uLlwiLFxyXG4gICAgb3B0aW9uc0NhcHRpb246IFwiQ2hvb3NlLi4uXCIsXHJcbiAgICByZXF1aXJlZEVycm9yOiBcIlBsZWFzZSBhbnN3ZXIgdGhlIHF1ZXN0aW9uLlwiLFxyXG4gICAgcmVxdWlyZWRJbkFsbFJvd3NFcnJvcjogXCJQbGVhc2UgYW5zd2VyIHF1ZXN0aW9ucyBpbiBhbGwgcm93cy5cIixcclxuICAgIG51bWVyaWNFcnJvcjogXCJUaGUgdmFsdWUgc2hvdWxkIGJlIG51bWVyaWMuXCIsXHJcbiAgICB0ZXh0TWluTGVuZ3RoOiBcIlBsZWFzZSBlbnRlciBhdCBsZWFzdCB7MH0gc3ltYm9scy5cIixcclxuICAgIG1pblJvd0NvdW50RXJyb3I6IFwiUGxlYXNlIGZpbGwgaW4gYXQgbGVhc3QgezB9IHJvd3MuXCIsXHJcbiAgICBtaW5TZWxlY3RFcnJvcjogXCJQbGVhc2Ugc2VsZWN0IGF0IGxlYXN0IHswfSB2YXJpYW50cy5cIixcclxuICAgIG1heFNlbGVjdEVycm9yOiBcIlBsZWFzZSBzZWxlY3Qgbm8gbW9yZSB0aGFuIHswfSB2YXJpYW50cy5cIixcclxuICAgIG51bWVyaWNNaW5NYXg6IFwiVGhlICd7MH0nIHNob3VsZCBiZSBlcXVhbCBvciBtb3JlIHRoYW4gezF9IGFuZCBlcXVhbCBvciBsZXNzIHRoYW4gezJ9XCIsXHJcbiAgICBudW1lcmljTWluOiBcIlRoZSAnezB9JyBzaG91bGQgYmUgZXF1YWwgb3IgbW9yZSB0aGFuIHsxfVwiLFxyXG4gICAgbnVtZXJpY01heDogXCJUaGUgJ3swfScgc2hvdWxkIGJlIGVxdWFsIG9yIGxlc3MgdGhhbiB7MX1cIixcclxuICAgIGludmFsaWRFbWFpbDogXCJQbGVhc2UgZW50ZXIgYSB2YWxpZCBlLW1haWwgYWRkcmVzcy5cIixcclxuICAgIHVybFJlcXVlc3RFcnJvcjogXCJUaGUgcmVxdWVzdCByZXR1cm5lZCBlcnJvciAnezB9Jy4gezF9XCIsXHJcbiAgICB1cmxHZXRDaG9pY2VzRXJyb3I6IFwiVGhlIHJlcXVlc3QgcmV0dXJuZWQgZW1wdHkgZGF0YSBvciB0aGUgJ3BhdGgnIHByb3BlcnR5IGlzIGluY29ycmVjdFwiLFxyXG4gICAgZXhjZWVkTWF4U2l6ZTogXCJUaGUgZmlsZSBzaXplIHNob3VsZCBub3QgZXhjZWVkIHswfS5cIixcclxuICAgIG90aGVyUmVxdWlyZWRFcnJvcjogXCJQbGVhc2UgZW50ZXIgdGhlIG90aGVyIHZhbHVlLlwiLFxyXG4gICAgdXBsb2FkaW5nRmlsZTogXCJZb3VyIGZpbGUgaXMgdXBsb2FkaW5nLiBQbGVhc2Ugd2FpdCBzZXZlcmFsIHNlY29uZHMgYW5kIHRyeSBhZ2Fpbi5cIixcclxuICAgIGFkZFJvdzogXCJBZGQgcm93XCIsXHJcbiAgICByZW1vdmVSb3c6IFwiUmVtb3ZlXCJcclxufTtcclxuc3VydmV5TG9jYWxpemF0aW9uLmxvY2FsZXNbXCJlblwiXSA9IHN1cnZleVN0cmluZ3M7XHJcblxyXG5pZiAoIVN0cmluZy5wcm90b3R5cGVbXCJmb3JtYXRcIl0pIHtcclxuICAgIFN0cmluZy5wcm90b3R5cGVbXCJmb3JtYXRcIl0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgveyhcXGQrKX0vZywgZnVuY3Rpb24gKG1hdGNoLCBudW1iZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBhcmdzW251bWJlcl0gIT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICAgICAgICAgID8gYXJnc1tudW1iZXJdXHJcbiAgICAgICAgICAgICAgICA6IG1hdGNoXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc3VydmV5U3RyaW5ncy50c1xuICoqLyIsImltcG9ydCB7SGFzaFRhYmxlfSBmcm9tICcuL2Jhc2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25PYmplY3RQcm9wZXJ0eSB7XHJcbiAgICBwcml2YXRlIHR5cGVWYWx1ZTogc3RyaW5nID0gbnVsbDtcclxuICAgIHByaXZhdGUgY2hvaWNlc1ZhbHVlOiBBcnJheTxhbnk+ID0gbnVsbDtcclxuICAgIHByaXZhdGUgY2hvaWNlc2Z1bmM6ICgpID0+IEFycmF5PGFueT4gPSBudWxsO1xyXG4gICAgcHVibGljIGNsYXNzTmFtZTogc3RyaW5nID0gbnVsbDtcclxuICAgIHB1YmxpYyBjbGFzc05hbWVQYXJ0OiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHVibGljIGJhc2VDbGFzc05hbWU6IHN0cmluZyA9IG51bGw7XHJcbiAgICBwdWJsaWMgZGVmYXVsdFZhbHVlOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIG9uR2V0VmFsdWU6IChvYmo6IGFueSkgPT4gYW55ID0gbnVsbDtcclxuICAgIHB1YmxpYyBvblNldFZhbHVlOiAob2JqOiBhbnksIHZhbHVlOiBhbnksIGpzb25Db252OiBKc29uT2JqZWN0KSA9PiBhbnlcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudHlwZVZhbHVlID8gdGhpcy50eXBlVmFsdWUgOiBcInN0cmluZ1wiOyB9XHJcbiAgICBwdWJsaWMgc2V0IHR5cGUodmFsdWU6IHN0cmluZykgeyB0aGlzLnR5cGVWYWx1ZSA9IHZhbHVlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGhhc1RvVXNlR2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLm9uR2V0VmFsdWU7IH1cclxuICAgIHB1YmxpYyBpc0RlZmF1bHRWYWx1ZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmRlZmF1bHRWYWx1ZSkgPyAodGhpcy5kZWZhdWx0VmFsdWUgPT0gdmFsdWUpIDogISh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VmFsdWUob2JqOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLm9uR2V0VmFsdWUpIHJldHVybiB0aGlzLm9uR2V0VmFsdWUob2JqKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaGFzVG9Vc2VTZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMub25TZXRWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldFZhbHVlKG9iajogYW55LCB2YWx1ZTogYW55LCBqc29uQ29udjogSnNvbk9iamVjdCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9uU2V0VmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5vblNldFZhbHVlKG9iaiwgdmFsdWUsIGpzb25Db252KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0T2JqVHlwZShvYmpUeXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2xhc3NOYW1lUGFydCkgcmV0dXJuIG9ialR5cGU7XHJcbiAgICAgICAgcmV0dXJuIG9ialR5cGUucmVwbGFjZSh0aGlzLmNsYXNzTmFtZVBhcnQsIFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldENsYXNzTmFtZShjbGFzc05hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmNsYXNzTmFtZVBhcnQgJiYgY2xhc3NOYW1lLmluZGV4T2YodGhpcy5jbGFzc05hbWVQYXJ0KSA8IDApID8gY2xhc3NOYW1lICsgdGhpcy5jbGFzc05hbWVQYXJ0IDogY2xhc3NOYW1lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBjaG9pY2VzKCk6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNob2ljZXNWYWx1ZSAhPSBudWxsKSByZXR1cm4gdGhpcy5jaG9pY2VzVmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hvaWNlc2Z1bmMgIT0gbnVsbCkgcmV0dXJuIHRoaXMuY2hvaWNlc2Z1bmMoKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRDaG9pY2VzKHZhbHVlOiBBcnJheTxhbnk+LCB2YWx1ZUZ1bmM6ICgpID0+IEFycmF5PGFueT4pIHtcclxuICAgICAgICB0aGlzLmNob2ljZXNWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuY2hvaWNlc2Z1bmMgPSB2YWx1ZUZ1bmM7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIEpzb25NZXRhZGF0YUNsYXNzIHtcclxuICAgIHN0YXRpYyByZXF1aXJlZFN5bWJvbCA9ICchJztcclxuICAgIHN0YXRpYyB0eXBlU3ltYm9sID0gJzonO1xyXG4gICAgcHJvcGVydGllczogQXJyYXk8SnNvbk9iamVjdFByb3BlcnR5PiA9IG51bGw7XHJcbiAgICByZXF1aXJlZFByb3BlcnRpZXM6IEFycmF5PHN0cmluZz4gPSBudWxsO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHJvcGVydGllczogQXJyYXk8YW55PiwgcHVibGljIGNyZWF0b3I6ICgpID0+IGFueSA9IG51bGwsIHB1YmxpYyBwYXJlbnROYW1lOiBzdHJpbmcgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gbmV3IEFycmF5PEpzb25PYmplY3RQcm9wZXJ0eT4oKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHByb3AgPSB0aGlzLmNyZWF0ZVByb3BlcnR5KHByb3BlcnRpZXNbaV0pO1xyXG4gICAgICAgICAgICBpZiAocHJvcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gocHJvcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZmluZChuYW1lOiBzdHJpbmcpOiBKc29uT2JqZWN0UHJvcGVydHkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXNbaV0ubmFtZSA9PSBuYW1lKSByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjcmVhdGVQcm9wZXJ0eShwcm9wSW5mbzogYW55KTogSnNvbk9iamVjdFByb3BlcnR5IHtcclxuICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gdHlwZW9mIHByb3BJbmZvID09PSBcInN0cmluZ1wiID8gcHJvcEluZm8gOiBwcm9wSW5mby5uYW1lO1xyXG4gICAgICAgIGlmICghcHJvcGVydHlOYW1lKSByZXR1cm47XHJcbiAgICAgICAgdmFyIHByb3BlcnR5VHlwZSA9IG51bGw7XHJcbiAgICAgICAgdmFyIHR5cGVJbmRleCA9IHByb3BlcnR5TmFtZS5pbmRleE9mKEpzb25NZXRhZGF0YUNsYXNzLnR5cGVTeW1ib2wpO1xyXG4gICAgICAgIGlmICh0eXBlSW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBwcm9wZXJ0eVR5cGUgPSBwcm9wZXJ0eU5hbWUuc3Vic3RyaW5nKHR5cGVJbmRleCArIDEpO1xyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWUuc3Vic3RyaW5nKDAsIHR5cGVJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3BlcnR5TmFtZSA9IHRoaXMuZ2V0UHJvcGVydHlOYW1lKHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgdmFyIHByb3AgPSBuZXcgSnNvbk9iamVjdFByb3BlcnR5KHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgaWYgKHByb3BlcnR5VHlwZSkge1xyXG4gICAgICAgICAgICBwcm9wLnR5cGUgPSBwcm9wZXJ0eVR5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcEluZm8gPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BJbmZvLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHByb3AudHlwZSA9IHByb3BJbmZvLnR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByb3BJbmZvLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgIHByb3AuZGVmYXVsdFZhbHVlID0gcHJvcEluZm8uZGVmYXVsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvcEluZm8uaXNSZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWtlUHJvcGVydHlSZXF1aXJlZChwcm9wLm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9wSW5mby5jaG9pY2VzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hvaWNlc0Z1bmMgPSB0eXBlb2YgcHJvcEluZm8uY2hvaWNlcyA9PT0gXCJmdW5jdGlvblwiID8gcHJvcEluZm8uY2hvaWNlcyA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hvaWNlc1ZhbHVlID0gdHlwZW9mIHByb3BJbmZvLmNob2ljZXMgIT09IFwiZnVuY3Rpb25cIiA/IHByb3BJbmZvLmNob2ljZXMgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgcHJvcC5zZXRDaG9pY2VzKGNob2ljZXNWYWx1ZSwgY2hvaWNlc0Z1bmMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9wSW5mby5vbkdldFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wLm9uR2V0VmFsdWUgPSBwcm9wSW5mby5vbkdldFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9wSW5mby5vblNldFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wLm9uU2V0VmFsdWUgPSBwcm9wSW5mby5vblNldFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9wSW5mby5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgIHByb3AuY2xhc3NOYW1lID0gcHJvcEluZm8uY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9wSW5mby5iYXNlQ2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wLmJhc2VDbGFzc05hbWUgPSBwcm9wSW5mby5iYXNlQ2xhc3NOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9wSW5mby5jbGFzc05hbWVQYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wLmNsYXNzTmFtZVBhcnQgPSBwcm9wSW5mby5jbGFzc05hbWVQYXJ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9wO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRQcm9wZXJ0eU5hbWUocHJvcGVydHlOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChwcm9wZXJ0eU5hbWUubGVuZ3RoID09IDAgfHwgcHJvcGVydHlOYW1lWzBdICE9IEpzb25NZXRhZGF0YUNsYXNzLnJlcXVpcmVkU3ltYm9sKSByZXR1cm4gcHJvcGVydHlOYW1lO1xyXG4gICAgICAgIHByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZS5zbGljZSgxKTtcclxuICAgICAgICB0aGlzLm1ha2VQcm9wZXJ0eVJlcXVpcmVkKHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHByb3BlcnR5TmFtZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbWFrZVByb3BlcnR5UmVxdWlyZWQocHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMucmVxdWlyZWRQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWlyZWRQcm9wZXJ0aWVzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXF1aXJlZFByb3BlcnRpZXMucHVzaChwcm9wZXJ0eU5hbWUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBKc29uTWV0YWRhdGEge1xyXG4gICAgcHJpdmF0ZSBjbGFzc2VzOiBIYXNoVGFibGU8SnNvbk1ldGFkYXRhQ2xhc3M+ID0ge307XHJcbiAgICBwcml2YXRlIGNoaWxkcmVuQ2xhc3NlczogSGFzaFRhYmxlPEFycmF5PEpzb25NZXRhZGF0YUNsYXNzPj4gPSB7fTtcclxuICAgIHByaXZhdGUgY2xhc3NQcm9wZXJ0aWVzOiBIYXNoVGFibGU8QXJyYXk8SnNvbk9iamVjdFByb3BlcnR5Pj4gPSB7fTtcclxuICAgIHByaXZhdGUgY2xhc3NSZXF1aXJlZFByb3BlcnRpZXM6IEhhc2hUYWJsZTxBcnJheTxzdHJpbmc+PiA9IHt9O1xyXG4gICAgcHVibGljIGFkZENsYXNzKG5hbWU6IHN0cmluZywgcHJvcGVydGllczogQXJyYXk8YW55PiwgY3JlYXRvcjogKCkgPT4gYW55ID0gbnVsbCwgcGFyZW50TmFtZTogc3RyaW5nID0gbnVsbCk6IEpzb25NZXRhZGF0YUNsYXNzIHtcclxuICAgICAgICB2YXIgbWV0YURhdGFDbGFzcyA9IG5ldyBKc29uTWV0YWRhdGFDbGFzcyhuYW1lLCBwcm9wZXJ0aWVzLCBjcmVhdG9yLCBwYXJlbnROYW1lKTtcclxuICAgICAgICB0aGlzLmNsYXNzZXNbbmFtZV0gPSBtZXRhRGF0YUNsYXNzO1xyXG4gICAgICAgIGlmIChwYXJlbnROYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW5DbGFzc2VzW3BhcmVudE5hbWVdO1xyXG4gICAgICAgICAgICBpZiAoIWNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuQ2xhc3Nlc1twYXJlbnROYW1lXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5DbGFzc2VzW3BhcmVudE5hbWVdLnB1c2gobWV0YURhdGFDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXRhRGF0YUNsYXNzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG92ZXJyaWRlQ2xhc3NDcmVhdG9yZShuYW1lOiBzdHJpbmcsIGNyZWF0b3I6ICgpID0+IGFueSkge1xyXG4gICAgICAgIHZhciBtZXRhRGF0YUNsYXNzID0gdGhpcy5maW5kQ2xhc3MobmFtZSk7XHJcbiAgICAgICAgaWYgKG1ldGFEYXRhQ2xhc3MpIHtcclxuICAgICAgICAgICAgbWV0YURhdGFDbGFzcy5jcmVhdG9yID0gY3JlYXRvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UHJvcGVydGllcyhuYW1lOiBzdHJpbmcpOiBBcnJheTxKc29uT2JqZWN0UHJvcGVydHk+IHtcclxuICAgICAgICB2YXIgcHJvcGVydGllcyA9IHRoaXMuY2xhc3NQcm9wZXJ0aWVzW25hbWVdO1xyXG4gICAgICAgIGlmICghcHJvcGVydGllcykge1xyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzID0gbmV3IEFycmF5PEpzb25PYmplY3RQcm9wZXJ0eT4oKTtcclxuICAgICAgICAgICAgdGhpcy5maWxsUHJvcGVydGllcyhuYW1lLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc1Byb3BlcnRpZXNbbmFtZV0gPSBwcm9wZXJ0aWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBjcmVhdGVDbGFzcyhuYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIHZhciBtZXRhRGF0YUNsYXNzID0gdGhpcy5maW5kQ2xhc3MobmFtZSk7XHJcbiAgICAgICAgaWYgKCFtZXRhRGF0YUNsYXNzKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gbWV0YURhdGFDbGFzcy5jcmVhdG9yKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Q2hpbGRyZW5DbGFzc2VzKG5hbWU6IHN0cmluZywgY2FuQmVDcmVhdGVkOiBib29sZWFuID0gZmFsc2UpOiBBcnJheTxKc29uTWV0YWRhdGFDbGFzcz4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICB0aGlzLmZpbGxDaGlsZHJlbkNsYXNzZXMobmFtZSwgY2FuQmVDcmVhdGVkLCByZXN1bHQpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UmVxdWlyZWRQcm9wZXJ0aWVzKG5hbWU6IHN0cmluZyk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0gdGhpcy5jbGFzc1JlcXVpcmVkUHJvcGVydGllc1tuYW1lXTtcclxuICAgICAgICBpZiAoIXByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgcHJvcGVydGllcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsbFJlcXVpcmVkUHJvcGVydGllcyhuYW1lLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc1JlcXVpcmVkUHJvcGVydGllc1tuYW1lXSA9IHByb3BlcnRpZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFByb3BlcnR5KGNsYXNzTmFtZTogc3RyaW5nLCBwcm9wZXJ0eUluZm86IGFueSkge1xyXG4gICAgICAgIHZhciBtZXRhRGF0YUNsYXNzID0gdGhpcy5maW5kQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICBpZiAoIW1ldGFEYXRhQ2xhc3MpIHJldHVybjtcclxuICAgICAgICB2YXIgcHJvcGVydHkgPSBtZXRhRGF0YUNsYXNzLmNyZWF0ZVByb3BlcnR5KHByb3BlcnR5SW5mbyk7XHJcbiAgICAgICAgaWYgKHByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUHJvcGVydHlUb0NsYXNzKG1ldGFEYXRhQ2xhc3MsIHByb3BlcnR5KTtcclxuICAgICAgICAgICAgdGhpcy5lbXB0eUNsYXNzUHJvcGVydGllc0hhc2gobWV0YURhdGFDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZVByb3BlcnR5KGNsYXNzTmFtZTogc3RyaW5nLCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBtZXRhRGF0YUNsYXNzID0gdGhpcy5maW5kQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICBpZiAoIW1ldGFEYXRhQ2xhc3MpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgcHJvcGVydHkgPSBtZXRhRGF0YUNsYXNzLmZpbmQocHJvcGVydHlOYW1lKTtcclxuICAgICAgICBpZiAocHJvcGVydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVQcm9wZXJ0eUZyb21DbGFzcyhtZXRhRGF0YUNsYXNzLCBwcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgIHRoaXMuZW1wdHlDbGFzc1Byb3BlcnRpZXNIYXNoKG1ldGFEYXRhQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgYWRkUHJvcGVydHlUb0NsYXNzKG1ldGFEYXRhQ2xhc3M6IEpzb25NZXRhZGF0YUNsYXNzLCBwcm9wZXJ0eTogSnNvbk9iamVjdFByb3BlcnR5KSB7XHJcbiAgICAgICAgaWYgKG1ldGFEYXRhQ2xhc3MuZmluZChwcm9wZXJ0eS5uYW1lKSAhPSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgbWV0YURhdGFDbGFzcy5wcm9wZXJ0aWVzLnB1c2gocHJvcGVydHkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSByZW1vdmVQcm9wZXJ0eUZyb21DbGFzcyhtZXRhRGF0YUNsYXNzOiBKc29uTWV0YWRhdGFDbGFzcywgcHJvcGVydHk6IEpzb25PYmplY3RQcm9wZXJ0eSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IG1ldGFEYXRhQ2xhc3MucHJvcGVydGllcy5pbmRleE9mKHByb3BlcnR5KTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSByZXR1cm47XHJcbiAgICAgICAgbWV0YURhdGFDbGFzcy5wcm9wZXJ0aWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgaWYgKG1ldGFEYXRhQ2xhc3MucmVxdWlyZWRQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gbWV0YURhdGFDbGFzcy5yZXF1aXJlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wZXJ0eS5uYW1lKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIG1ldGFEYXRhQ2xhc3MucmVxdWlyZWRQcm9wZXJ0aWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGVtcHR5Q2xhc3NQcm9wZXJ0aWVzSGFzaChtZXRhRGF0YUNsYXNzOiBKc29uTWV0YWRhdGFDbGFzcykge1xyXG4gICAgICAgIHRoaXMuY2xhc3NQcm9wZXJ0aWVzW21ldGFEYXRhQ2xhc3MubmFtZV0gPSBudWxsO1xyXG4gICAgICAgIHZhciBjaGlsZENsYXNzZXMgPSB0aGlzLmdldENoaWxkcmVuQ2xhc3NlcyhtZXRhRGF0YUNsYXNzLm5hbWUpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRDbGFzc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NQcm9wZXJ0aWVzW2NoaWxkQ2xhc3Nlc1tpXS5uYW1lXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBmaWxsQ2hpbGRyZW5DbGFzc2VzKG5hbWU6IHN0cmluZywgY2FuQmVDcmVhdGVkOiBib29sZWFuLCByZXN1bHQ6IEFycmF5PEpzb25NZXRhZGF0YUNsYXNzPikge1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW5DbGFzc2VzW25hbWVdO1xyXG4gICAgICAgIGlmICghY2hpbGRyZW4pIHJldHVybjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghY2FuQmVDcmVhdGVkIHx8IGNoaWxkcmVuW2ldLmNyZWF0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNoaWxkcmVuW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZpbGxDaGlsZHJlbkNsYXNzZXMoY2hpbGRyZW5baV0ubmFtZSwgY2FuQmVDcmVhdGVkLCByZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgZmluZENsYXNzKG5hbWU6IHN0cmluZyk6IEpzb25NZXRhZGF0YUNsYXNzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGFzc2VzW25hbWVdO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBmaWxsUHJvcGVydGllcyhuYW1lOiBzdHJpbmcsIGxpc3Q6IEFycmF5PEpzb25PYmplY3RQcm9wZXJ0eT4pIHtcclxuICAgICAgICB2YXIgbWV0YURhdGFDbGFzcyA9IHRoaXMuZmluZENsYXNzKG5hbWUpO1xyXG4gICAgICAgIGlmICghbWV0YURhdGFDbGFzcykgcmV0dXJuO1xyXG4gICAgICAgIGlmIChtZXRhRGF0YUNsYXNzLnBhcmVudE5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5maWxsUHJvcGVydGllcyhtZXRhRGF0YUNsYXNzLnBhcmVudE5hbWUsIGxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldGFEYXRhQ2xhc3MucHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFByb3BlcnR5Q29yZShtZXRhRGF0YUNsYXNzLnByb3BlcnRpZXNbaV0sIGxpc3QsIGxpc3QubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFkZFByb3BlcnR5Q29yZShwcm9wZXJ0eTogSnNvbk9iamVjdFByb3BlcnR5LCBsaXN0OiBBcnJheTxKc29uT2JqZWN0UHJvcGVydHk+LCBlbmRJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gLTE7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmRJbmRleDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0W2ldLm5hbWUgPT0gcHJvcGVydHkubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICBsaXN0LnB1c2gocHJvcGVydHkpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGlzdFtpbmRleF0gPSBwcm9wZXJ0eTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGZpbGxSZXF1aXJlZFByb3BlcnRpZXMobmFtZTogc3RyaW5nLCBsaXN0OiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgdmFyIG1ldGFEYXRhQ2xhc3MgPSB0aGlzLmZpbmRDbGFzcyhuYW1lKTtcclxuICAgICAgICBpZiAoIW1ldGFEYXRhQ2xhc3MpIHJldHVybjtcclxuICAgICAgICBpZiAobWV0YURhdGFDbGFzcy5yZXF1aXJlZFByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkobGlzdCwgbWV0YURhdGFDbGFzcy5yZXF1aXJlZFByb3BlcnRpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWV0YURhdGFDbGFzcy5wYXJlbnROYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsbFJlcXVpcmVkUHJvcGVydGllcyhtZXRhRGF0YUNsYXNzLnBhcmVudE5hbWUsIGxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgSnNvbkVycm9yIHtcclxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBhdDogTnVtYmVyID0gLTE7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZTogc3RyaW5nLCBwdWJsaWMgbWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0RnVsbERlc2NyaXB0aW9uKCkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2UgKyAodGhpcy5kZXNjcmlwdGlvbiA/IFwiXFxuXCIgKyB0aGlzLmRlc2NyaXB0aW9uIDogXCJcIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIEpzb25Vbmtub3duUHJvcGVydHlFcnJvciBleHRlbmRzIEpzb25FcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcGVydHlOYW1lOiBzdHJpbmcsIHB1YmxpYyBjbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKFwidW5rbm93bnByb3BlcnR5XCIsIFwiVGhlIHByb3BlcnR5ICdcIiArIHByb3BlcnR5TmFtZSArIFwiJyBpbiBjbGFzcyAnXCIgKyBjbGFzc05hbWUgKyBcIicgaXMgdW5rbm93bi5cIik7XHJcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBKc29uT2JqZWN0Lm1ldGFEYXRhLmdldFByb3BlcnRpZXMoY2xhc3NOYW1lKTtcclxuICAgICAgICBpZiAocHJvcGVydGllcykge1xyXG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJUaGUgbGlzdCBvZiBhdmFpbGFibGUgcHJvcGVydGllcyBhcmU6IFwiO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID4gMCkgdGhpcy5kZXNjcmlwdGlvbiArPSBcIiwgXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uICs9IHByb3BlcnRpZXNbaV0ubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uICs9ICcuJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIEpzb25NaXNzaW5nVHlwZUVycm9yQmFzZSBleHRlbmRzIEpzb25FcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgYmFzZUNsYXNzTmFtZTogc3RyaW5nLCBwdWJsaWMgdHlwZTogc3RyaW5nLCBwdWJsaWMgbWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIodHlwZSwgbWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiVGhlIGZvbGxvd2luZyB0eXBlcyBhcmUgYXZhaWxhYmxlOiBcIjtcclxuICAgICAgICB2YXIgdHlwZXMgPSBKc29uT2JqZWN0Lm1ldGFEYXRhLmdldENoaWxkcmVuQ2xhc3NlcyhiYXNlQ2xhc3NOYW1lLCB0cnVlKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID4gMCkgdGhpcy5kZXNjcmlwdGlvbiArPSBcIiwgXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gKz0gXCInXCIgKyB0eXBlc1tpXS5uYW1lICsgXCInXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gKz0gXCIuXCI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIEpzb25NaXNzaW5nVHlwZUVycm9yIGV4dGVuZHMgSnNvbk1pc3NpbmdUeXBlRXJyb3JCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHVibGljIGJhc2VDbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGJhc2VDbGFzc05hbWUsIFwibWlzc2luZ3R5cGVwcm9wZXJ0eVwiLCBcIlRoZSBwcm9wZXJ0eSB0eXBlIGlzIG1pc3NpbmcgaW4gdGhlIG9iamVjdC4gUGxlYXNlIHRha2UgYSBsb29rIGF0IHByb3BlcnR5OiAnXCIgKyBwcm9wZXJ0eU5hbWUgKyBcIicuXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBKc29uSW5jb3JyZWN0VHlwZUVycm9yIGV4dGVuZHMgSnNvbk1pc3NpbmdUeXBlRXJyb3JCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHVibGljIGJhc2VDbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGJhc2VDbGFzc05hbWUsIFwiaW5jb3JyZWN0dHlwZXByb3BlcnR5XCIsIFwiVGhlIHByb3BlcnR5IHR5cGUgaXMgaW5jb3JyZWN0IGluIHRoZSBvYmplY3QuIFBsZWFzZSB0YWtlIGEgbG9vayBhdCBwcm9wZXJ0eTogJ1wiICsgcHJvcGVydHlOYW1lICsgXCInLlwiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgSnNvblJlcXVpcmVkUHJvcGVydHlFcnJvciBleHRlbmRzIEpzb25FcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcGVydHlOYW1lOiBzdHJpbmcsIHB1YmxpYyBjbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKFwicmVxdWlyZWRwcm9wZXJ0eVwiLCBcIlRoZSBwcm9wZXJ0eSAnXCIgKyBwcm9wZXJ0eU5hbWUgKyBcIicgaXMgcmVxdWlyZWQgaW4gY2xhc3MgJ1wiICsgY2xhc3NOYW1lICsgXCInLlwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25PYmplY3Qge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdHlwZVByb3BlcnR5TmFtZSA9IFwidHlwZVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcG9zaXRpb25Qcm9wZXJ0eU5hbWUgPSBcInBvc1wiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbWV0YURhdGFWYWx1ZSA9IG5ldyBKc29uTWV0YWRhdGEoKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IG1ldGFEYXRhKCkgeyByZXR1cm4gSnNvbk9iamVjdC5tZXRhRGF0YVZhbHVlOyB9XHJcbiAgICBwdWJsaWMgZXJyb3JzID0gbmV3IEFycmF5PEpzb25FcnJvcj4oKTtcclxuICAgIHB1YmxpYyB0b0pzb25PYmplY3Qob2JqOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvSnNvbk9iamVjdENvcmUob2JqLCBudWxsKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB0b09iamVjdChqc29uT2JqOiBhbnksIG9iajogYW55KSB7XHJcbiAgICAgICAgaWYgKCFqc29uT2JqKSByZXR1cm47XHJcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBudWxsO1xyXG4gICAgICAgIGlmIChvYmouZ2V0VHlwZSkge1xyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzID0gSnNvbk9iamVjdC5tZXRhRGF0YS5nZXRQcm9wZXJ0aWVzKG9iai5nZXRUeXBlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXByb3BlcnRpZXMpIHJldHVybjtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4ganNvbk9iaikge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09IEpzb25PYmplY3QudHlwZVByb3BlcnR5TmFtZSkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gSnNvbk9iamVjdC5wb3NpdGlvblByb3BlcnR5TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSBqc29uT2JqW2tleV07XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcHJvcGVydHkgPSB0aGlzLmZpbmRQcm9wZXJ0eShwcm9wZXJ0aWVzLCBrZXkpO1xyXG4gICAgICAgICAgICBpZiAoIXByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE5ld0Vycm9yKG5ldyBKc29uVW5rbm93blByb3BlcnR5RXJyb3Ioa2V5LnRvU3RyaW5nKCksIG9iai5nZXRUeXBlKCkpLCBqc29uT2JqKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVUb09iaihqc29uT2JqW2tleV0sIG9iaiwga2V5LCBwcm9wZXJ0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHRvSnNvbk9iamVjdENvcmUob2JqOiBhbnksIHByb3BlcnR5OiBKc29uT2JqZWN0UHJvcGVydHkpOiBhbnkge1xyXG4gICAgICAgIGlmICghb2JqLmdldFR5cGUpIHJldHVybiBvYmo7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIGlmIChwcm9wZXJ0eSAhPSBudWxsICYmICghcHJvcGVydHkuY2xhc3NOYW1lKSkge1xyXG4gICAgICAgICAgICByZXN1bHRbSnNvbk9iamVjdC50eXBlUHJvcGVydHlOYW1lXSA9IHByb3BlcnR5LmdldE9ialR5cGUob2JqLmdldFR5cGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0gSnNvbk9iamVjdC5tZXRhRGF0YS5nZXRQcm9wZXJ0aWVzKG9iai5nZXRUeXBlKCkpO1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVUb0pzb24ob2JqLCByZXN1bHQsIHByb3BlcnRpZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHZhbHVlVG9Kc29uKG9iajogYW55LCByZXN1bHQ6IGFueSwgcHJvcGVydHk6IEpzb25PYmplY3RQcm9wZXJ0eSkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgaWYgKHByb3BlcnR5Lmhhc1RvVXNlR2V0VmFsdWUpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBwcm9wZXJ0eS5nZXRWYWx1ZShvYmopO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gb2JqW3Byb3BlcnR5Lm5hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChwcm9wZXJ0eS5pc0RlZmF1bHRWYWx1ZSh2YWx1ZSkpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbHVlQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnJWYWx1ZSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJWYWx1ZS5wdXNoKHRoaXMudG9Kc29uT2JqZWN0Q29yZSh2YWx1ZVtpXSwgcHJvcGVydHkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWx1ZSA9IGFyclZhbHVlLmxlbmd0aCA+IDAgPyBhcnJWYWx1ZSA6IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnRvSnNvbk9iamVjdENvcmUodmFsdWUsIHByb3BlcnR5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFwcm9wZXJ0eS5pc0RlZmF1bHRWYWx1ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0W3Byb3BlcnR5Lm5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHZhbHVlVG9PYmoodmFsdWU6IGFueSwgb2JqOiBhbnksIGtleTogYW55LCBwcm9wZXJ0eTogSnNvbk9iamVjdFByb3BlcnR5KSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybjtcclxuICAgICAgICBpZiAocHJvcGVydHkgIT0gbnVsbCAmJiBwcm9wZXJ0eS5oYXNUb1VzZVNldFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHByb3BlcnR5LnNldFZhbHVlKG9iaiwgdmFsdWUsIHRoaXMpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsdWVBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVRvQXJyYXkodmFsdWUsIG9iaiwga2V5LCBwcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld09iaiA9IHRoaXMuY3JlYXRlTmV3T2JqKHZhbHVlLCBwcm9wZXJ0eSk7XHJcbiAgICAgICAgaWYgKG5ld09iai5uZXdPYmopIHtcclxuICAgICAgICAgICAgdGhpcy50b09iamVjdCh2YWx1ZSwgbmV3T2JqLm5ld09iaik7XHJcbiAgICAgICAgICAgIHZhbHVlID0gbmV3T2JqLm5ld09iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFuZXdPYmouZXJyb3IpIHtcclxuICAgICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzVmFsdWVBcnJheSh2YWx1ZTogYW55KTogYm9vbGVhbiB7IHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci50b1N0cmluZygpLmluZGV4T2YoXCJBcnJheVwiKSA+IC0xOyB9XHJcbiAgICBwcml2YXRlIGNyZWF0ZU5ld09iaih2YWx1ZTogYW55LCBwcm9wZXJ0eTogSnNvbk9iamVjdFByb3BlcnR5KTogYW55IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0geyBuZXdPYmo6IG51bGwsIGVycm9yOiBudWxsIH07XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IHZhbHVlW0pzb25PYmplY3QudHlwZVByb3BlcnR5TmFtZV07XHJcbiAgICAgICAgaWYgKCFjbGFzc05hbWUgJiYgcHJvcGVydHkgIT0gbnVsbCAmJiBwcm9wZXJ0eS5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lID0gcHJvcGVydHkuY2xhc3NOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjbGFzc05hbWUgPSBwcm9wZXJ0eS5nZXRDbGFzc05hbWUoY2xhc3NOYW1lKTtcclxuICAgICAgICByZXN1bHQubmV3T2JqID0gKGNsYXNzTmFtZSkgPyBKc29uT2JqZWN0Lm1ldGFEYXRhLmNyZWF0ZUNsYXNzKGNsYXNzTmFtZSkgOiBudWxsO1xyXG4gICAgICAgIHJlc3VsdC5lcnJvciA9IHRoaXMuY2hlY2tOZXdPYmplY3RPbkVycm9ycyhyZXN1bHQubmV3T2JqLCB2YWx1ZSwgcHJvcGVydHksIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY2hlY2tOZXdPYmplY3RPbkVycm9ycyhuZXdPYmo6IGFueSwgdmFsdWU6IGFueSwgcHJvcGVydHk6IEpzb25PYmplY3RQcm9wZXJ0eSwgY2xhc3NOYW1lOiBzdHJpbmcpOiBKc29uRXJyb3Ige1xyXG4gICAgICAgIHZhciBlcnJvciA9IG51bGw7XHJcbiAgICAgICAgaWYgKG5ld09iaikge1xyXG4gICAgICAgICAgICB2YXIgcmVxdWlyZWRQcm9wZXJ0aWVzID0gSnNvbk9iamVjdC5tZXRhRGF0YS5nZXRSZXF1aXJlZFByb3BlcnRpZXMoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgaWYgKHJlcXVpcmVkUHJvcGVydGllcykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbHVlW3JlcXVpcmVkUHJvcGVydGllc1tpXV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgSnNvblJlcXVpcmVkUHJvcGVydHlFcnJvcihyZXF1aXJlZFByb3BlcnRpZXNbaV0sIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eS5iYXNlQ2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEpzb25NaXNzaW5nVHlwZUVycm9yKHByb3BlcnR5Lm5hbWUsIHByb3BlcnR5LmJhc2VDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IG5ldyBKc29uSW5jb3JyZWN0VHlwZUVycm9yKHByb3BlcnR5Lm5hbWUsIHByb3BlcnR5LmJhc2VDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLmFkZE5ld0Vycm9yKGVycm9yLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgYWRkTmV3RXJyb3IoZXJyb3I6IEpzb25FcnJvciwganNvbk9iajogYW55KSB7XHJcbiAgICAgICAgaWYgKGpzb25PYmogJiYganNvbk9ialtKc29uT2JqZWN0LnBvc2l0aW9uUHJvcGVydHlOYW1lXSkge1xyXG4gICAgICAgICAgICBlcnJvci5hdCA9IGpzb25PYmpbSnNvbk9iamVjdC5wb3NpdGlvblByb3BlcnR5TmFtZV0uc3RhcnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXJyb3JzLnB1c2goZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB2YWx1ZVRvQXJyYXkodmFsdWU6IEFycmF5PGFueT4sIG9iajogYW55LCBrZXk6IGFueSwgcHJvcGVydHk6IEpzb25PYmplY3RQcm9wZXJ0eSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbHVlQXJyYXkob2JqW2tleV0pKSB7XHJcbiAgICAgICAgICAgIG9ialtrZXldID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gdGhpcy5jcmVhdGVOZXdPYmoodmFsdWVbaV0sIHByb3BlcnR5KTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlLm5ld09iaikge1xyXG4gICAgICAgICAgICAgICAgb2JqW2tleV0ucHVzaChuZXdWYWx1ZS5uZXdPYmopO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b09iamVjdCh2YWx1ZVtpXSwgbmV3VmFsdWUubmV3T2JqKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghbmV3VmFsdWUuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpba2V5XS5wdXNoKHZhbHVlW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgZmluZFByb3BlcnR5KHByb3BlcnRpZXM6IEFycmF5PEpzb25PYmplY3RQcm9wZXJ0eT4sIGtleTogYW55KTogSnNvbk9iamVjdFByb3BlcnR5IHtcclxuICAgICAgICBpZiAoIXByb3BlcnRpZXMpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocHJvcGVydGllc1tpXS5uYW1lID09IGtleSkgcmV0dXJuIHByb3BlcnRpZXNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanNvbm9iamVjdC50c1xuICoqLyIsImltcG9ydCB7QmFzZSwgSXRlbVZhbHVlLCBTdXJ2ZXlFcnJvcn0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuL3N1cnZleVN0cmluZ3NcIjtcclxuaW1wb3J0IHtDdXN0b21FcnJvcn0gZnJvbSBcIi4vZXJyb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDaG9pY2VzUmVzdGZ1bGwgZXh0ZW5kcyBCYXNlIHtcclxuICAgIHB1YmxpYyB1cmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgcGF0aDogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyB2YWx1ZU5hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgdGl0bGVOYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIGdldFJlc3VsdENhbGxiYWNrOiAoaXRlbXM6IEFycmF5PEl0ZW1WYWx1ZT4pID0+IHZvaWQ7XHJcbiAgICBwdWJsaWMgZXJyb3I6IFN1cnZleUVycm9yID0gbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcnVuKCkge1xyXG4gICAgICAgIGlmICghdGhpcy51cmwgfHwgIXRoaXMuZ2V0UmVzdWx0Q2FsbGJhY2spIHJldHVybjtcclxuICAgICAgICB0aGlzLmVycm9yID0gbnVsbDtcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHRoaXMudXJsKTtcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYub25Mb2FkKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm9uRXJyb3IoeGhyLnN0YXR1c1RleHQsIHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIFwiY2hvaWNlc0J5VXJsXCI7IH1cclxuICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMudXJsICYmICF0aGlzLnBhdGggJiYgIXRoaXMudmFsdWVOYW1lICYmICF0aGlzLnRpdGxlTmFtZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXREYXRhKGpzb246IGFueSkge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICBpZiAoanNvbi51cmwpIHRoaXMudXJsID0ganNvbi51cmw7XHJcbiAgICAgICAgaWYgKGpzb24ucGF0aCkgdGhpcy5wYXRoID0ganNvbi5wYXRoO1xyXG4gICAgICAgIGlmIChqc29uLnZhbHVlTmFtZSkgdGhpcy52YWx1ZU5hbWUgPSBqc29uLnZhbHVlTmFtZTtcclxuICAgICAgICBpZiAoanNvbi50aXRsZU5hbWUpIHRoaXMudGl0bGVOYW1lID0ganNvbi50aXRsZU5hbWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMucGF0aCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy52YWx1ZU5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMudGl0bGVOYW1lID0gXCJcIjtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkxvYWQocmVzdWx0OiBhbnkpIHtcclxuICAgICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgICByZXN1bHQgPSB0aGlzLmdldFJlc3VsdEFmdGVyUGF0aChyZXN1bHQpO1xyXG4gICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0W1wibGVuZ3RoXCJdKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbVZhbHVlID0gcmVzdWx0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtVmFsdWUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5nZXRWYWx1ZShpdGVtVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gdGhpcy5nZXRUaXRsZShpdGVtVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaChuZXcgSXRlbVZhbHVlKHZhbHVlLCB0aXRsZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9IG5ldyBDdXN0b21FcnJvcihzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwidXJsR2V0Q2hvaWNlc0Vycm9yXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRSZXN1bHRDYWxsYmFjayhpdGVtcyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uRXJyb3Ioc3RhdHVzOiBzdHJpbmcsIHJlc3BvbnNlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmVycm9yID0gbmV3IEN1c3RvbUVycm9yKHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJ1cmxSZXF1ZXN0RXJyb3JcIilbXCJmb3JtYXRcIl0oc3RhdHVzLCByZXNwb25zZSkpO1xyXG4gICAgICAgIHRoaXMuZ2V0UmVzdWx0Q2FsbGJhY2soW10pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRSZXN1bHRBZnRlclBhdGgocmVzdWx0OiBhbnkpIHtcclxuICAgICAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICBpZiAoIXRoaXMucGF0aCkgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB2YXIgcGF0aGVzID0gdGhpcy5nZXRQYXRoZXMoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGhlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHRbcGF0aGVzW2ldXTtcclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRQYXRoZXMoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgdmFyIHBhdGhlcyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLnBhdGguaW5kZXhPZignOycpID4gLTEpIHtcclxuICAgICAgICAgICAgcGF0aGVzID0gdGhpcy5wYXRoLnNwbGl0KCc7Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGF0aGVzID0gdGhpcy5wYXRoLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXRoZXMubGVuZ3RoID09IDApIHBhdGhlcy5wdXNoKHRoaXMucGF0aCk7XHJcbiAgICAgICAgcmV0dXJuIHBhdGhlcztcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0VmFsdWUoaXRlbTogYW55KTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZU5hbWUpIHJldHVybiBpdGVtW3RoaXMudmFsdWVOYW1lXTtcclxuICAgICAgICB2YXIgbGVuID0gT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW4gPCAxKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gaXRlbVtPYmplY3Qua2V5cyhpdGVtKVswXV07XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldFRpdGxlKGl0ZW06IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRpdGxlTmFtZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1bdGhpcy50aXRsZU5hbWVdO1xyXG4gICAgfVxyXG59XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJjaG9pY2VzQnlVcmxcIiwgW1widXJsXCIsIFwicGF0aFwiLCBcInZhbHVlTmFtZVwiLCBcInRpdGxlTmFtZVwiXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENob2ljZXNSZXN0ZnVsbCgpOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jaG9pY2VzUmVzdGZ1bGwudHNcbiAqKi8iLCJpbXBvcnQge0hhc2hUYWJsZX0gZnJvbSAnLi9iYXNlJztcclxuaW1wb3J0IHtDb25kaXRpb25zUGFyc2VyfSBmcm9tICcuL2NvbmRpdGlvbnNQYXJzZXInO1xyXG5pbXBvcnQge1Byb2Nlc3NWYWx1ZX0gZnJvbSBcIi4vY29uZGl0aW9uUHJvY2Vzc1ZhbHVlXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uIHtcclxuICAgIHN0YXRpYyBvcGVyYXRvcnNWYWx1ZTogSGFzaFRhYmxlPEZ1bmN0aW9uPiA9IG51bGw7XHJcbiAgICBzdGF0aWMgZ2V0IG9wZXJhdG9ycygpIHtcclxuICAgICAgICBpZiAoQ29uZGl0aW9uLm9wZXJhdG9yc1ZhbHVlICE9IG51bGwpIHJldHVybiBDb25kaXRpb24ub3BlcmF0b3JzVmFsdWU7XHJcbiAgICAgICAgQ29uZGl0aW9uLm9wZXJhdG9yc1ZhbHVlID0ge1xyXG4gICAgICAgICAgICBlbXB0eTogZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiAhbGVmdDsgfSxcclxuICAgICAgICAgICAgbm90ZW1wdHk6IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gISghbGVmdCk7IH0sXHJcbiAgICAgICAgICAgIGVxdWFsOiBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHsgcmV0dXJuIGxlZnQgPT0gcmlnaHQ7IH0sXHJcbiAgICAgICAgICAgIG5vdGVxdWFsOiBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHsgcmV0dXJuIGxlZnQgIT0gcmlnaHQ7IH0sXHJcbiAgICAgICAgICAgIGNvbnRhaW5zOiBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHsgcmV0dXJuIGxlZnQgJiYgbGVmdFtcImluZGV4T2ZcIl0gJiYgbGVmdC5pbmRleE9mKHJpZ2h0KSA+IC0xOyB9LFxyXG4gICAgICAgICAgICBub3Rjb250YWluczogZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiAhbGVmdCB8fCAhbGVmdFtcImluZGV4T2ZcIl0gfHwgbGVmdC5pbmRleE9mKHJpZ2h0KSA9PSAtMTsgfSxcclxuICAgICAgICAgICAgZ3JlYXRlcjogZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiBsZWZ0ID4gcmlnaHQ7IH0sXHJcbiAgICAgICAgICAgIGxlc3M6IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gbGVmdCA8IHJpZ2h0OyB9LFxyXG4gICAgICAgICAgICBncmVhdGVyb3JlcXVhbDogZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiBsZWZ0ID49IHJpZ2h0OyB9LFxyXG4gICAgICAgICAgICBsZXNzb3JlcXVhbDogZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiBsZWZ0IDw9IHJpZ2h0OyB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gQ29uZGl0aW9uLm9wZXJhdG9yc1ZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvcFZhbHVlOiBzdHJpbmcgPSBcImVxdWFsXCI7XHJcbiAgICBwdWJsaWMgbGVmdDogYW55O1xyXG4gICAgcHVibGljIHJpZ2h0OiBhbnk7XHJcbiAgICBwdWJsaWMgZ2V0IG9wZXJhdG9yKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm9wVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgb3BlcmF0b3IodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybjtcclxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKCFDb25kaXRpb24ub3BlcmF0b3JzW3ZhbHVlXSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMub3BWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHBlcmZvcm0obGVmdDogYW55ID0gbnVsbCwgcmlnaHQ6IGFueSA9IG51bGwpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIWxlZnQpIGxlZnQgPSB0aGlzLmxlZnQ7XHJcbiAgICAgICAgaWYgKCFyaWdodCkgcmlnaHQgPSB0aGlzLnJpZ2h0O1xyXG5cclxuICAgICAgICByZXR1cm4gQ29uZGl0aW9uLm9wZXJhdG9yc1t0aGlzLm9wZXJhdG9yXSh0aGlzLmdldFB1cmVWYWx1ZShsZWZ0KSwgdGhpcy5nZXRQdXJlVmFsdWUocmlnaHQpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0UHVyZVZhbHVlKHZhbDogYW55KTogYW55IHtcclxuICAgICAgICBpZiAoIXZhbCB8fCAodHlwZW9mIHZhbCAhPSBcInN0cmluZ1wiKSkgcmV0dXJuIHZhbDtcclxuICAgICAgICB2YXIgc3RyID0gXCJcIjtcclxuICAgICAgICBpZiAodmFsLmxlbmd0aCA+IDAgJiYgKHZhbFswXSA9PSBcIidcIiB8fCB2YWxbMF0gPT0gJ1wiJykpICB2YWwgPSB2YWwuc3Vic3RyKDEpO1xyXG4gICAgICAgIHZhciBsZW4gPSB2YWwubGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW4gPiAwICYmICh2YWxbbGVuIC0gMV0gPT0gXCInXCIgfHwgdmFsW2xlbiAtIDFdID09ICdcIicpKSAgdmFsID0gdmFsLnN1YnN0cigwLCBsZW4gLSAxKTtcclxuICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBDb25kaXRpb25Ob2RlIHtcclxuICAgIHByaXZhdGUgY29ubmVjdGl2ZVZhbHVlOiBzdHJpbmcgPSBcImFuZFwiO1xyXG4gICAgcHVibGljIGNoaWxkcmVuOiBBcnJheTxhbnk+ID0gW107XHJcbiAgICBwdWJsaWMgY29uc3RydWN0b3IoKSB7IH1cclxuICAgIHB1YmxpYyBnZXQgY29ubmVjdGl2ZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5jb25uZWN0aXZlVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgY29ubmVjdGl2ZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAodmFsdWUgPT0gXCImXCIgfHwgdmFsdWUgPT0gXCImJlwiKSB2YWx1ZSA9IFwiYW5kXCI7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IFwifFwiIHx8IHZhbHVlID09IFwifHxcIikgdmFsdWUgPSBcIm9yXCI7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9IFwiYW5kXCIgJiYgdmFsdWUgIT0gXCJvclwiKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aXZlVmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpIHsgcmV0dXJuIHRoaXMuY2hpbGRyZW4ubGVuZ3RoID09IDA7IH1cclxuICAgIHB1YmxpYyBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLmNoaWxkcmVuID0gW107XHJcbiAgICAgICAgdGhpcy5jb25uZWN0aXZlID0gXCJhbmRcIjtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uUnVubmVyIHtcclxuICAgIHByaXZhdGUgZXhwcmVzc2lvblZhbHVlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHByb2Nlc3NWYWx1ZTogUHJvY2Vzc1ZhbHVlO1xyXG4gICAgcHJpdmF0ZSByb290OiBDb25kaXRpb25Ob2RlO1xyXG4gICAgcHJpdmF0ZSB2YWx1ZXM6IEhhc2hUYWJsZTxhbnk+O1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGV4cHJlc3Npb246IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucm9vdCA9IG5ldyBDb25kaXRpb25Ob2RlKCk7XHJcbiAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvbjtcclxuICAgICAgICB0aGlzLnByb2Nlc3NWYWx1ZSA9IG5ldyBQcm9jZXNzVmFsdWUoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgZXhwcmVzc2lvbigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5leHByZXNzaW9uVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgZXhwcmVzc2lvbih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXhwcmVzc2lvbiA9PSB2YWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuZXhwcmVzc2lvblZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgbmV3IENvbmRpdGlvbnNQYXJzZXIoKS5wYXJzZSh0aGlzLmV4cHJlc3Npb25WYWx1ZSwgdGhpcy5yb290KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBydW4odmFsdWVzOiBIYXNoVGFibGU8YW55Pik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJ1bk5vZGUodGhpcy5yb290KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcnVuTm9kZShub2RlOiBDb25kaXRpb25Ob2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIG9uRmlyc3RGYWlsID0gbm9kZS5jb25uZWN0aXZlID09IFwiYW5kXCI7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciByZXMgPSB0aGlzLnJ1bk5vZGVDb25kaXRpb24obm9kZS5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgIGlmICghcmVzICYmIG9uRmlyc3RGYWlsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgIW9uRmlyc3RGYWlsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9uRmlyc3RGYWlsO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBydW5Ob2RlQ29uZGl0aW9uKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHZhbHVlW1wiY2hpbGRyZW5cIl0pIHJldHVybiB0aGlzLnJ1bk5vZGUodmFsdWUpO1xyXG4gICAgICAgIGlmICh2YWx1ZVtcImxlZnRcIl0pIHJldHVybiB0aGlzLnJ1bkNvbmRpdGlvbih2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBydW5Db25kaXRpb24oY29uZGl0aW9uOiBDb25kaXRpb24pOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgbGVmdCA9IGNvbmRpdGlvbi5sZWZ0O1xyXG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5nZXRWYWx1ZU5hbWUobGVmdCk7XHJcbiAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnByb2Nlc3NWYWx1ZS5oYXNWYWx1ZShuYW1lLCB0aGlzLnZhbHVlcykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgbGVmdCA9IHRoaXMucHJvY2Vzc1ZhbHVlLmdldFZhbHVlKG5hbWUsIHRoaXMudmFsdWVzKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHJpZ2h0ID0gY29uZGl0aW9uLnJpZ2h0O1xyXG4gICAgICAgIG5hbWUgPSB0aGlzLmdldFZhbHVlTmFtZShyaWdodCk7XHJcbiAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnByb2Nlc3NWYWx1ZS5oYXNWYWx1ZShuYW1lLCB0aGlzLnZhbHVlcykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgcmlnaHQgPSB0aGlzLnByb2Nlc3NWYWx1ZS5nZXRWYWx1ZShuYW1lLCB0aGlzLnZhbHVlcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBjb25kaXRpb24ucGVyZm9ybShsZWZ0LCByaWdodCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldFZhbHVlTmFtZShub2RlVmFsdWU6IGFueSkge1xyXG4gICAgICAgIGlmICghbm9kZVZhbHVlKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBpZiAodHlwZW9mIG5vZGVWYWx1ZSAhPT0gJ3N0cmluZycpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlmIChub2RlVmFsdWUubGVuZ3RoIDwgMyB8fCBub2RlVmFsdWVbMF0gIT0gJ3snIHx8IG5vZGVWYWx1ZVtub2RlVmFsdWUubGVuZ3RoIC0gMV0gIT0gJ30nKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gbm9kZVZhbHVlLnN1YnN0cigxLCBub2RlVmFsdWUubGVuZ3RoIC0gMik7XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jb25kaXRpb25zLnRzXG4gKiovIiwiaW1wb3J0IHtDb25kaXRpb24sIENvbmRpdGlvbk5vZGV9IGZyb20gXCIuL2NvbmRpdGlvbnNcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDb25kaXRpb25zUGFyc2VyIHtcclxuICAgIHByaXZhdGUgdGV4dDogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByb290OiBDb25kaXRpb25Ob2RlO1xyXG4gICAgcHJpdmF0ZSBleHByZXNzaW9uTm9kZXM6IEFycmF5PENvbmRpdGlvbk5vZGU+O1xyXG4gICAgcHJpdmF0ZSBub2RlOiBDb25kaXRpb25Ob2RlO1xyXG4gICAgcHJpdmF0ZSBhdDogbnVtYmVyO1xyXG4gICAgcHJpdmF0ZSBsZW5ndGg6IG51bWJlcjtcclxuICAgIHB1YmxpYyBwYXJzZSh0ZXh0OiBzdHJpbmcsIHJvb3Q6IENvbmRpdGlvbk5vZGUpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLnRleHQgPSB0ZXh0O1xyXG4gICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XHJcbiAgICAgICAgdGhpcy5yb290LmNsZWFyKCk7XHJcbiAgICAgICAgdGhpcy5hdCA9IDA7XHJcbiAgICAgICAgdGhpcy5sZW5ndGggPSB0aGlzLnRleHQubGVuZ3RoO1xyXG4gICAgICAgIHZhciByZXMgPSB0aGlzLnBhcnNlVGV4dCgpO1xyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdG9TdHJpbmcocm9vdDogQ29uZGl0aW9uTm9kZSk6IHN0cmluZyB7XHJcbiAgICAgICAgdGhpcy5yb290ID0gcm9vdDtcclxuICAgICAgICByZXR1cm4gdGhpcy5ub2RlVG9TdHJpbmcocm9vdCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHRvU3RyaW5nQ29yZSh2YWx1ZTogYW55KTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gXCJcIjtcclxuICAgICAgICBpZiAodmFsdWVbXCJjaGlsZHJlblwiXSkgcmV0dXJuIHRoaXMubm9kZVRvU3RyaW5nKHZhbHVlKTtcclxuICAgICAgICBpZiAodmFsdWVbXCJsZWZ0XCJdKSByZXR1cm4gdGhpcy5jb25kaXRpb25Ub1N0cmluZyh2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIFwiXCI7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG5vZGVUb1N0cmluZyhub2RlOiBDb25kaXRpb25Ob2RlKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAobm9kZS5pc0VtcHR5KSByZXR1cm4gXCJcIjtcclxuICAgICAgICB2YXIgcmVzID0gXCJcIjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5vZGUuY2hpbGRyZW4ubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG5vZGVUZXh0ID0gdGhpcy50b1N0cmluZ0NvcmUobm9kZS5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgIGlmIChub2RlVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHJlcykgcmVzICs9ICcgJyArIG5vZGUuY29ubmVjdGl2ZSArICcgJztcclxuICAgICAgICAgICAgICAgIHJlcyArPSBub2RlVGV4dDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobm9kZSAhPSB0aGlzLnJvb3QgJiYgbm9kZS5jaGlsZHJlbi5sZW5ndGggPiAxKSB7XHJcbiAgICAgICAgICAgIHJlcyA9ICcoJyArIHJlcyArICcpJztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuICAgIHByaXZhdGUgY29uZGl0aW9uVG9TdHJpbmcoY29uZGl0aW9uOiBDb25kaXRpb24pOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghY29uZGl0aW9uLnJpZ2h0IHx8ICFjb25kaXRpb24ub3BlcmF0b3IpIHJldHVybiBcIlwiO1xyXG4gICAgICAgIHZhciBsZWZ0ID0gY29uZGl0aW9uLmxlZnQ7XHJcbiAgICAgICAgaWYgKGxlZnQgJiYgIXRoaXMuaXNOdW1lcmljKGxlZnQpKSBsZWZ0ID0gXCInXCIgKyBsZWZ0ICsgXCInXCI7XHJcbiAgICAgICAgdmFyIHJlcyA9IGxlZnQgKyAnICcgKyB0aGlzLm9wZXJhdGlvblRvU3RyaW5nKGNvbmRpdGlvbi5vcGVyYXRvcik7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNOb1JpZ2h0T3BlcmF0aW9uKGNvbmRpdGlvbi5vcGVyYXRvcikpIHJldHVybiByZXM7XHJcbiAgICAgICAgdmFyIHJpZ2h0ID0gY29uZGl0aW9uLnJpZ2h0O1xyXG4gICAgICAgIGlmIChyaWdodCAmJiAhdGhpcy5pc051bWVyaWMocmlnaHQpKSByaWdodCA9IFwiJ1wiICsgcmlnaHQgKyBcIidcIjtcclxuICAgICAgICByZXR1cm4gcmVzICsgJyAnICsgcmlnaHQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9wZXJhdGlvblRvU3RyaW5nKG9wOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChvcCA9PSBcImVxdWFsXCIpIHJldHVybiBcIj1cIjtcclxuICAgICAgICBpZiAob3AgPT0gXCJub3RlcXVhbFwiKSByZXR1cm4gXCIhPVwiO1xyXG4gICAgICAgIGlmIChvcCA9PSBcImdyZWF0ZXJcIikgcmV0dXJuIFwiPlwiO1xyXG4gICAgICAgIGlmIChvcCA9PSBcImxlc3NcIikgcmV0dXJuIFwiPFwiO1xyXG4gICAgICAgIGlmIChvcCA9PSBcImdyZWF0ZXJvcmVxdWFsXCIpIHJldHVybiBcIj49XCI7XHJcbiAgICAgICAgaWYgKG9wID09IFwibGVzc29yZXF1YWxcIikgcmV0dXJuIFwiPD1cIjtcclxuICAgICAgICByZXR1cm4gb3A7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzTnVtZXJpYyh2YWx1ZTogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIHZhbCA9IHBhcnNlRmxvYXQodmFsdWUpO1xyXG4gICAgICAgIGlmIChpc05hTih2YWwpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgcmV0dXJuIGlzRmluaXRlKHZhbCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHBhcnNlVGV4dCgpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLnJvb3Q7XHJcbiAgICAgICAgdGhpcy5leHByZXNzaW9uTm9kZXMgPSBbXTtcclxuICAgICAgICB0aGlzLmV4cHJlc3Npb25Ob2Rlcy5wdXNoKHRoaXMubm9kZSk7XHJcbiAgICAgICAgdmFyIHJlcyA9IHRoaXMucmVhZENvbmRpdGlvbnMoKTtcclxuICAgICAgICByZXR1cm4gcmVzICYmIHRoaXMuYXQgPj0gdGhpcy5sZW5ndGg7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJlYWRDb25kaXRpb25zKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciByZXMgPSB0aGlzLnJlYWRDb25kaXRpb24oKTtcclxuICAgICAgICBpZiAoIXJlcykgcmV0dXJuIHJlcztcclxuICAgICAgICB2YXIgY29ubmVjdGl2ZSA9IHRoaXMucmVhZENvbm5lY3RpdmUoKTtcclxuICAgICAgICBpZiAoY29ubmVjdGl2ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmFkZENvbm5lY3RpdmUoY29ubmVjdGl2ZSk7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnJlYWRDb25kaXRpb25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSByZWFkQ29uZGl0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5yZWFkRXhwcmVzc2lvbigpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIGxlZnQgPSB0aGlzLnJlYWRTdHJpbmcoKTtcclxuICAgICAgICBpZiAoIWxlZnQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgb3AgPSB0aGlzLnJlYWRPcGVyYXRvcigpO1xyXG4gICAgICAgIGlmICghb3ApIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgYyA9IG5ldyBDb25kaXRpb24oKTtcclxuICAgICAgICBjLmxlZnQgPSBsZWZ0OyBjLm9wZXJhdG9yID0gb3A7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzTm9SaWdodE9wZXJhdGlvbihvcCkpIHtcclxuICAgICAgICAgICAgdmFyIHJpZ2h0ID0gdGhpcy5yZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgICAgIGlmICghcmlnaHQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgYy5yaWdodCA9IHJpZ2h0O1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmFkZENvbmRpdGlvbihjKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcmVhZEV4cHJlc3Npb24oKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5za2lwKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuYXQgPj0gdGhpcy5sZW5ndGggfHwgdGhpcy5jaCAhPSAnKCcpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHRoaXMuYXQrKztcclxuICAgICAgICB0aGlzLnB1c2hFeHByZXNzaW9uKCk7XHJcbiAgICAgICAgdmFyIHJlcyA9IHRoaXMucmVhZENvbmRpdGlvbnMoKTtcclxuICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2tpcCgpO1xyXG4gICAgICAgICAgICByZXMgPSB0aGlzLmNoID09ICcpJztcclxuICAgICAgICAgICAgdGhpcy5hdCsrO1xyXG4gICAgICAgICAgICB0aGlzLnBvcEV4cHJlc3Npb24oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlcztcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0IGNoKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnRleHQuY2hhckF0KHRoaXMuYXQpOyB9XHJcbiAgICBwcml2YXRlIHNraXAoKSB7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuYXQgPCB0aGlzLmxlbmd0aCAmJiB0aGlzLmlzU3BhY2UodGhpcy5jaCkpIHRoaXMuYXQrKztcclxuICAgIH1cclxuICAgIHByaXZhdGUgaXNTcGFjZShjOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gYyA9PSAnICcgfHwgYyA9PSAnXFxuJyB8fCBjID09ICdcXHQnIHx8IGMgPT0gJ1xccic7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzUXVvdGVzKGM6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBjID09IFwiJ1wiIHx8IGMgPT0gJ1wiJ1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc09wZXJhdG9yQ2hhcihjOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gYyA9PSAnPicgfHwgYyA9PSAnPCcgfHwgYyA9PSAnPScgfHwgYyA9PSAnISc7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzQnJhY2tldHMoYzogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGMgPT0gJygnIHx8IGMgPT0gJyknO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSByZWFkU3RyaW5nKCk6IHN0cmluZyB7XHJcbiAgICAgICAgdGhpcy5za2lwKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuYXQgPj0gdGhpcy5sZW5ndGgpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciBzdGFydCA9IHRoaXMuYXQ7XHJcbiAgICAgICAgdmFyIGhhc1F1b3RlcyA9IHRoaXMuaXNRdW90ZXModGhpcy5jaCk7XHJcbiAgICAgICAgaWYgKGhhc1F1b3RlcykgdGhpcy5hdCsrO1xyXG4gICAgICAgIHZhciBpc0ZpcnN0T3BDaCA9IHRoaXMuaXNPcGVyYXRvckNoYXIodGhpcy5jaCk7XHJcbiAgICAgICAgd2hpbGUgKHRoaXMuYXQgPCB0aGlzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICBpZiAoIWhhc1F1b3RlcyAmJiB0aGlzLmlzU3BhY2UodGhpcy5jaCkpIGJyZWFrO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5pc1F1b3Rlcyh0aGlzLmNoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKGhhc1F1b3RlcykgdGhpcy5hdCsrO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKCFoYXNRdW90ZXMpIHtcclxuICAgICAgICAgICAgICAgIGlmIChpc0ZpcnN0T3BDaCAhPSB0aGlzLmlzT3BlcmF0b3JDaGFyKHRoaXMuY2gpKSBicmVhaztcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzQnJhY2tldHModGhpcy5jaCkpIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuYXQrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuYXQgPD0gc3RhcnQpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciByZXMgPSB0aGlzLnRleHQuc3Vic3RyKHN0YXJ0LCB0aGlzLmF0IC0gc3RhcnQpO1xyXG4gICAgICAgIGlmIChyZXMpIHtcclxuICAgICAgICAgICAgaWYgKHJlcy5sZW5ndGggPiAxICYmIHRoaXMuaXNRdW90ZXMocmVzWzBdKSkge1xyXG4gICAgICAgICAgICAgICAgdmFyIGxlbiA9IHJlcy5sZW5ndGggLSAxO1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuaXNRdW90ZXMocmVzW3Jlcy5sZW5ndGggLSAxXSkpIGxlbi0tO1xyXG4gICAgICAgICAgICAgICAgcmVzID0gcmVzLnN1YnN0cigxLCBsZW4pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzTm9SaWdodE9wZXJhdGlvbihvcDogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIG9wID09IFwiZW1wdHlcIiB8fCBvcCA9PSBcIm5vdGVtcHR5XCI7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJlYWRPcGVyYXRvcigpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBvcCA9IHRoaXMucmVhZFN0cmluZygpO1xyXG4gICAgICAgIGlmICghb3ApIHJldHVybiBudWxsO1xyXG4gICAgICAgIG9wID0gb3AudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAob3AgPT0gJz4nKSBvcCA9IFwiZ3JlYXRlclwiO1xyXG4gICAgICAgIGlmIChvcCA9PSAnPCcpIG9wID0gXCJsZXNzXCI7XHJcbiAgICAgICAgaWYgKG9wID09ICc+PScgfHwgb3AgPT0gJz0+Jykgb3AgPSBcImdyZWF0ZXJvcmVxdWFsXCI7XHJcbiAgICAgICAgaWYgKG9wID09ICc8PScgfHwgb3AgPT0gJz08Jykgb3AgPSBcImxlc3NvcmVxdWFsXCI7XHJcbiAgICAgICAgaWYgKG9wID09ICc9JyB8fCBvcCA9PSAnPT0nKSBvcCA9IFwiZXF1YWxcIjtcclxuICAgICAgICBpZiAob3AgPT0gJzw+JyB8fCBvcCA9PSAnIT0nKSBvcCA9IFwibm90ZXF1YWxcIjtcclxuICAgICAgICBpZiAob3AgPT0gJ2NvbnRhaW4nKSBvcCA9IFwiY29udGFpbnNcIjtcclxuICAgICAgICBpZiAob3AgPT0gJ25vdGNvbnRhaW4nKSBvcCA9IFwibm90Y29udGFpbnNcIjtcclxuICAgICAgICByZXR1cm4gb3A7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJlYWRDb25uZWN0aXZlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIGNvbiA9IHRoaXMucmVhZFN0cmluZygpO1xyXG4gICAgICAgIGlmICghY29uKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBjb24gPSBjb24udG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAoY29uID09IFwiJlwiIHx8IGNvbiA9PSBcIiYmXCIpIGNvbiA9IFwiYW5kXCI7XHJcbiAgICAgICAgaWYgKGNvbiA9PSBcInxcIiB8fCBjb24gPT0gXCJ8fFwiKSBjb24gPSBcIm9yXCI7XHJcbiAgICAgICAgaWYgKGNvbiAhPSBcImFuZFwiICYmIGNvbiAhPSBcIm9yXCIpIGNvbiA9IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGNvbjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcHVzaEV4cHJlc3Npb24oKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSBuZXcgQ29uZGl0aW9uTm9kZSgpO1xyXG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbk5vZGVzLnB1c2gobm9kZSk7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gbm9kZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcG9wRXhwcmVzc2lvbigpIHtcclxuICAgICAgICB2YXIgbm9kZSA9IHRoaXMuZXhwcmVzc2lvbk5vZGVzLnBvcCgpO1xyXG4gICAgICAgIHRoaXMubm9kZSA9IHRoaXMuZXhwcmVzc2lvbk5vZGVzW3RoaXMuZXhwcmVzc2lvbk5vZGVzLmxlbmd0aCAtIDFdO1xyXG4gICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbi5wdXNoKG5vZGUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBhZGRDb25kaXRpb24oYzogQ29uZGl0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuLnB1c2goYyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFkZENvbm5lY3RpdmUoY29uOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5ub2RlLmNoaWxkcmVuLmxlbmd0aCA8IDIpIHtcclxuICAgICAgICAgICAgdGhpcy5ub2RlLmNvbm5lY3RpdmUgPSBjb247XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubm9kZS5jb25uZWN0aXZlICE9IGNvbikge1xyXG4gICAgICAgICAgICAgICAgdmFyIG9sZENvbiA9IHRoaXMubm9kZS5jb25uZWN0aXZlO1xyXG4gICAgICAgICAgICAgICAgdmFyIG9sZENoaWxkcmVuID0gdGhpcy5ub2RlLmNoaWxkcmVuO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNsZWFyKCk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY29ubmVjdGl2ZSA9IGNvbjtcclxuICAgICAgICAgICAgICAgIHZhciBvbGROb2RlID0gbmV3IENvbmRpdGlvbk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIG9sZE5vZGUuY29ubmVjdGl2ZSA9IG9sZENvbjtcclxuICAgICAgICAgICAgICAgIG9sZE5vZGUuY2hpbGRyZW4gPSBvbGRDaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbi5wdXNoKG9sZE5vZGUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld05vZGUgPSBuZXcgQ29uZGl0aW9uTm9kZSgpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNoaWxkcmVuLnB1c2gobmV3Tm9kZSk7XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUgPSBuZXdOb2RlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29uZGl0aW9uc1BhcnNlci50c1xuICoqLyIsImltcG9ydCB7SGFzaFRhYmxlfSBmcm9tICcuL2Jhc2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFByb2Nlc3NWYWx1ZSB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG4gICAgcHVibGljIGdldEZpcnN0TmFtZSh0ZXh0OiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICghdGV4dCkgcmV0dXJuIHRleHQ7XHJcbiAgICAgICAgdmFyIHJlcyA9IFwiXCI7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0ZXh0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjaCA9IHRleHRbaV07XHJcbiAgICAgICAgICAgIGlmIChjaCA9PSAnLicgfHwgY2ggPT0gJ1snKSBicmVhaztcclxuICAgICAgICAgICAgcmVzICs9IGNoO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGhhc1ZhbHVlKHRleHQ6IHN0cmluZywgdmFsdWVzOiBIYXNoVGFibGU8YW55Pik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciByZXMgPSB0aGlzLmdldFZhbHVlQ29yZSh0ZXh0LCB2YWx1ZXMpO1xyXG4gICAgICAgIHJldHVybiByZXMuaGFzVmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VmFsdWUodGV4dDogc3RyaW5nLCB2YWx1ZXM6IEhhc2hUYWJsZTxhbnk+KTogYW55IHtcclxuICAgICAgICB2YXIgcmVzID0gdGhpcy5nZXRWYWx1ZUNvcmUodGV4dCwgdmFsdWVzKTtcclxuICAgICAgICByZXR1cm4gcmVzLnZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRWYWx1ZUNvcmUodGV4dDogc3RyaW5nLCB2YWx1ZXM6IGFueSk6IGFueSB7XHJcbiAgICAgICAgdmFyIHJlcyA9IHsgaGFzVmFsdWU6IGZhbHNlLCB2YWx1ZTogbnVsbCB9O1xyXG4gICAgICAgIHZhciBjdXJWYWx1ZSA9IHZhbHVlcztcclxuICAgICAgICBpZiAoIWN1clZhbHVlKSByZXR1cm4gcmVzO1xyXG4gICAgICAgIHZhciBpc0ZpcnN0ID0gdHJ1ZTtcclxuICAgICAgICB3aGlsZSAodGV4dCAmJiB0ZXh0Lmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdmFyIGlzQXJyYXkgPSAhaXNGaXJzdCAmJiB0ZXh0WzBdID09ICdbJztcclxuICAgICAgICAgICAgaWYgKCFpc0FycmF5KSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWlzRmlyc3QpIHRleHQgPSB0ZXh0LnN1YnN0cigxKTtcclxuICAgICAgICAgICAgICAgIHZhciBjdXJOYW1lID0gdGhpcy5nZXRGaXJzdE5hbWUodGV4dCk7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWN1ck5hbWUpIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWN1clZhbHVlW2N1ck5hbWVdKSByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgY3VyVmFsdWUgPSBjdXJWYWx1ZVtjdXJOYW1lXVxyXG4gICAgICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyKGN1ck5hbWUubGVuZ3RoKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghQXJyYXkuaXNBcnJheShjdXJWYWx1ZSkpIHJldHVybiByZXM7XHJcbiAgICAgICAgICAgICAgICB2YXIgaW5kZXggPSAxO1xyXG4gICAgICAgICAgICAgICAgdmFyIHN0ciA9IFwiXCI7XHJcbiAgICAgICAgICAgICAgICB3aGlsZSAoaW5kZXggPCB0ZXh0Lmxlbmd0aCAmJiB0ZXh0W2luZGV4XSAhPSAnXScpIHtcclxuICAgICAgICAgICAgICAgICAgICBzdHIgKz0gdGV4dFtpbmRleF07XHJcbiAgICAgICAgICAgICAgICAgICAgaW5kZXgrKztcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHRleHQgPSBpbmRleCA8IHRleHQubGVuZ3RoID8gdGV4dC5zdWJzdHIoaW5kZXggKyAxKSA6IFwiXCI7XHJcbiAgICAgICAgICAgICAgICBpbmRleCA9IHRoaXMuZ2V0SW50VmFsdWUoc3RyKTtcclxuICAgICAgICAgICAgICAgIGlmIChpbmRleCA8IDAgfHwgaW5kZXggPj0gY3VyVmFsdWUubGVuZ3RoKSByZXR1cm4gcmVzO1xyXG4gICAgICAgICAgICAgICAgY3VyVmFsdWUgPSBjdXJWYWx1ZVtpbmRleF07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXNGaXJzdCA9IGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXMudmFsdWUgPSBjdXJWYWx1ZTtcclxuICAgICAgICByZXMuaGFzVmFsdWUgPSB0cnVlO1xyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldEludFZhbHVlKHN0cjogYW55KSB7XHJcbiAgICAgICAgaWYgKHN0ciA9PSBcIjBcIiB8fCAoKHN0ciB8IDApID4gMCAmJiBzdHIgJSAxID09IDApKVxyXG4gICAgICAgICAgICByZXR1cm4gTnVtYmVyKHN0cik7XHJcbiAgICAgICAgcmV0dXJuIC0xO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29uZGl0aW9uUHJvY2Vzc1ZhbHVlLnRzXG4gKiovIiwiaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7QmFzZSwgSXRlbVZhbHVlLCBJU3VydmV5RGF0YSwgSGFzaFRhYmxlfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tIFwiLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcbmltcG9ydCB7UXVlc3Rpb25TZWxlY3RCYXNlfSBmcm9tIFwiLi9xdWVzdGlvbl9iYXNlc2VsZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25Ecm9wZG93bk1vZGVsfSBmcm9tIFwiLi9xdWVzdGlvbl9kcm9wZG93blwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uQ2hlY2tib3hNb2RlbH0gZnJvbSBcIi4vcXVlc3Rpb25fY2hlY2tib3hcIjtcclxuaW1wb3J0IHtRdWVzdGlvblJhZGlvZ3JvdXBNb2RlbH0gZnJvbSBcIi4vcXVlc3Rpb25fcmFkaW9ncm91cFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uVGV4dE1vZGVsfSBmcm9tIFwiLi9xdWVzdGlvbl90ZXh0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25Db21tZW50TW9kZWx9IGZyb20gXCIuL3F1ZXN0aW9uX2NvbW1lbnRcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTWF0cml4RHJvcGRvd25EYXRhIHtcclxuICAgIG9uUm93Q2hhbmdlZChjZWxsOiBNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZSwgbmV3Um93VmFsdWU6IGFueSk7XHJcbiAgICBjb2x1bW5zOiBBcnJheTxNYXRyaXhEcm9wZG93bkNvbHVtbj47XHJcbiAgICBjcmVhdGVRdWVzdGlvbihyb3c6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlLCBjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogUXVlc3Rpb247XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRyaXhEcm9wZG93bkNvbHVtbiBleHRlbmRzIEJhc2Uge1xyXG4gICAgcHJpdmF0ZSBjaG9pY2VzVmFsdWU6IEl0ZW1WYWx1ZVtdID0gW107XHJcbiAgICBwcml2YXRlIHRpdGxlVmFsdWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBvcHRpb25zQ2FwdGlvbjogc3RyaW5nO1xyXG4gICAgcHVibGljIGlzUmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHB1YmxpYyBoYXNPdGhlcjogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIG1pbldpZHRoOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIGNlbGxUeXBlOiBzdHJpbmcgPSBcImRlZmF1bHRcIjtcclxuICAgIHByaXZhdGUgY29sQ291bnRWYWx1ZTogbnVtYmVyID0gLTE7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nLCB0aXRsZTogc3RyaW5nID0gbnVsbCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpIHsgcmV0dXJuIFwibWF0cml4ZHJvcGRvd25jb2x1bW5cIiB9XHJcbiAgICBwdWJsaWMgZ2V0IHRpdGxlKCkgeyByZXR1cm4gdGhpcy50aXRsZVZhbHVlID8gdGhpcy50aXRsZVZhbHVlIDogdGhpcy5uYW1lOyB9XHJcbiAgICBwdWJsaWMgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHsgdGhpcy50aXRsZVZhbHVlID0gdmFsdWU7IH1cclxuICAgIHB1YmxpYyBnZXQgY2hvaWNlcygpOiBBcnJheTxhbnk+IHsgcmV0dXJuIHRoaXMuY2hvaWNlc1ZhbHVlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbENvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNvbENvdW50VmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgY29sQ291bnQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8IC0xIHx8IHZhbHVlID4gNCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY29sQ291bnRWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBjaG9pY2VzKG5ld1ZhbHVlOiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgSXRlbVZhbHVlLnNldERhdGEodGhpcy5jaG9pY2VzVmFsdWUsIG5ld1ZhbHVlKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hdHJpeERyb3Bkb3duQ2VsbCB7XHJcbiAgICBwcml2YXRlIHF1ZXN0aW9uVmFsdWU6IFF1ZXN0aW9uO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4sIHB1YmxpYyByb3c6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlLCBkYXRhOiBJTWF0cml4RHJvcGRvd25EYXRhKSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvblZhbHVlID0gZGF0YS5jcmVhdGVRdWVzdGlvbih0aGlzLnJvdywgdGhpcy5jb2x1bW4pO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25WYWx1ZS5zZXREYXRhKHJvdyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHF1ZXN0aW9uKCk6IFF1ZXN0aW9uIHsgcmV0dXJuIHRoaXMucXVlc3Rpb25WYWx1ZTsgfVxyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5xdWVzdGlvbi52YWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbi52YWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UgaW1wbGVtZW50cyBJU3VydmV5RGF0YSB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBpZENvdW50ZXI6IG51bWJlciA9IDE7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBnZXRJZCgpOiBzdHJpbmcgeyByZXR1cm4gXCJzcm93X1wiICsgTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UuaWRDb3VudGVyKys7IH1cclxuICAgIHByb3RlY3RlZCBkYXRhOiBJTWF0cml4RHJvcGRvd25EYXRhO1xyXG4gICAgcHJpdmF0ZSByb3dWYWx1ZXM6IEhhc2hUYWJsZTxhbnk+ID0ge307XHJcbiAgICBwcml2YXRlIHJvd0NvbW1lbnRzOiBIYXNoVGFibGU8YW55PiA9IHt9O1xyXG4gICAgcHJpdmF0ZSBpc1NldHRpbmdWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpZFZhbHVlOiBzdHJpbmc7XHJcblxyXG4gICAgcHVibGljIGNlbGxzOiBBcnJheTxNYXRyaXhEcm9wZG93bkNlbGw+ID0gW107XHJcblxyXG4gICAgY29uc3RydWN0b3IoZGF0YTogSU1hdHJpeERyb3Bkb3duRGF0YSwgdmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuaWRWYWx1ZSA9IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlLmdldElkKCk7XHJcbiAgICAgICAgdGhpcy5idWlsZENlbGxzKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGlkKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmlkVmFsdWU7IH1cclxuICAgIHB1YmxpYyBnZXQgcm93TmFtZSgpIHsgcmV0dXJuIG51bGw7IH1cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLnJvd1ZhbHVlczsgfVxyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5pc1NldHRpbmdWYWx1ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yb3dWYWx1ZXMgPSB7fTtcclxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm93VmFsdWVzW2tleV0gPSB2YWx1ZVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnF1ZXN0aW9uLm9uU3VydmV5VmFsdWVDaGFuZ2VkKHRoaXMuZ2V0VmFsdWUodGhpcy5jZWxsc1tpXS5jb2x1bW4ubmFtZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzU2V0dGluZ1ZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VmFsdWUobmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3dWYWx1ZXNbbmFtZV07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0VmFsdWUobmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTZXR0aW5nVmFsdWUpIHJldHVybjtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPT09IFwiXCIpIG5ld1ZhbHVlID0gbnVsbDtcclxuICAgICAgICBpZiAobmV3VmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnJvd1ZhbHVlc1tuYW1lXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnJvd1ZhbHVlc1tuYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhLm9uUm93Q2hhbmdlZCh0aGlzLCB0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRDb21tZW50KG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm93Q29tbWVudHNbbmFtZV07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Q29tbWVudChuYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJvd0NvbW1lbnRzW25hbWVdID0gbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzRW1wdHkoKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgaWYgKCF2YWwpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB2YWwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgYnVpbGRDZWxscygpIHtcclxuICAgICAgICB2YXIgY29sdW1ucyA9IHRoaXMuZGF0YS5jb2x1bW5zO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29sdW1ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY29sdW1uID0gY29sdW1uc1tpXTtcclxuICAgICAgICAgICAgdGhpcy5jZWxscy5wdXNoKHRoaXMuY3JlYXRlQ2VsbChjb2x1bW4pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlQ2VsbChjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogTWF0cml4RHJvcGRvd25DZWxsIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeERyb3Bkb3duQ2VsbChjb2x1bW4sIHRoaXMsIHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWxCYXNlIGV4dGVuZHMgUXVlc3Rpb24gaW1wbGVtZW50cyBJTWF0cml4RHJvcGRvd25EYXRhIHtcclxuICAgIHByaXZhdGUgY29sdW1uc1ZhbHVlOiBBcnJheTxNYXRyaXhEcm9wZG93bkNvbHVtbj4gPSBbXTtcclxuICAgIHByaXZhdGUgY2hvaWNlc1ZhbHVlOiBJdGVtVmFsdWVbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBvcHRpb25zQ2FwdGlvblZhbHVlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGlzUm93Q2hhbmdpbmcgPSBmYWxzZTtcclxuICAgIHByb3RlY3RlZCBnZW5lcmF0ZWRWaXNpYmxlUm93czogQXJyYXk8TWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2U+O1xyXG4gICAgcHJpdmF0ZSBjZWxsVHlwZVZhbHVlOiBzdHJpbmcgPSBcImRyb3Bkb3duXCI7XHJcbiAgICBwcml2YXRlIGNvbHVtbkNvbENvdW50VmFsdWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgY29sdW1uTWluV2lkdGg6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgaG9yaXpvbnRhbFNjcm9sbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGNvbHVtbnNDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcbiAgICBwdWJsaWMgdXBkYXRlQ2VsbHNDYWxsYmFrOiAoKSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwibWF0cml4ZHJvcGRvd25iYXNlXCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbHVtbnMoKTogQXJyYXk8TWF0cml4RHJvcGRvd25Db2x1bW4+IHsgcmV0dXJuIHRoaXMuY29sdW1uc1ZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGNvbHVtbnModmFsdWU6IEFycmF5PE1hdHJpeERyb3Bkb3duQ29sdW1uPikge1xyXG4gICAgICAgIHRoaXMuY29sdW1uc1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy5jb2x1bW5zQ2hhbmdlZENhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY2VsbFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuY2VsbFR5cGVWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBjZWxsVHlwZShuZXdWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2VsbFR5cGUgPT0gbmV3VmFsdWUpIHJldHVybjtcclxuICAgICAgICB0aGlzLmNlbGxUeXBlVmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLnVwZGF0ZUNlbGxzQ2FsbGJhayk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbHVtbkNvbENvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNvbHVtbkNvbENvdW50VmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgY29sdW1uQ29sQ291bnQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPiA0KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jb2x1bW5Db2xDb3VudFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy51cGRhdGVDZWxsc0NhbGxiYWspO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldENvbHVtblRpdGxlKGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBjb2x1bW4udGl0bGU7XHJcbiAgICAgICAgaWYgKGNvbHVtbi5pc1JlcXVpcmVkICYmIHRoaXMuc3VydmV5KSB7XHJcbiAgICAgICAgICAgIHZhciByZXF1aXJlVGV4dCA9IHRoaXMuc3VydmV5LnJlcXVpcmVkVGV4dDtcclxuICAgICAgICAgICAgaWYgKHJlcXVpcmVUZXh0KSByZXF1aXJlVGV4dCArPSBcIiBcIjtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVxdWlyZVRleHQgKyByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Q29sdW1uV2lkdGgoY29sdW1uOiBNYXRyaXhEcm9wZG93bkNvbHVtbik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGNvbHVtbi5taW5XaWR0aCA/IGNvbHVtbi5taW5XaWR0aCA6IHRoaXMuY29sdW1uTWluV2lkdGg7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNob2ljZXMoKTogQXJyYXk8YW55PiB7IHJldHVybiB0aGlzLmNob2ljZXNWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBjaG9pY2VzKG5ld1ZhbHVlOiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgSXRlbVZhbHVlLnNldERhdGEodGhpcy5jaG9pY2VzVmFsdWUsIG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgb3B0aW9uc0NhcHRpb24oKSB7IHJldHVybiAodGhpcy5vcHRpb25zQ2FwdGlvblZhbHVlKSA/IHRoaXMub3B0aW9uc0NhcHRpb25WYWx1ZSA6IHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJvcHRpb25zQ2FwdGlvblwiKTsgfVxyXG4gICAgcHVibGljIHNldCBvcHRpb25zQ2FwdGlvbihuZXdWYWx1ZTogc3RyaW5nKSB7IHRoaXMub3B0aW9uc0NhcHRpb25WYWx1ZSA9IG5ld1ZhbHVlOyB9XHJcbiAgICBwdWJsaWMgYWRkQ29sdW1uKG5hbWU6IHN0cmluZywgdGl0bGU6IHN0cmluZyA9IG51bGwpOiBNYXRyaXhEcm9wZG93bkNvbHVtbiB7XHJcbiAgICAgICAgdmFyIGNvbHVtbiA9IG5ldyBNYXRyaXhEcm9wZG93bkNvbHVtbihuYW1lLCB0aXRsZSk7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5zVmFsdWUucHVzaChjb2x1bW4pO1xyXG4gICAgICAgIHJldHVybiBjb2x1bW47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB2aXNpYmxlUm93cygpOiBBcnJheTxNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZT4ge1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MgPSB0aGlzLmdlbmVyYXRlUm93cygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdlbmVyYXRlUm93cygpOiBBcnJheTxNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZT4geyByZXR1cm4gbnVsbDsgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZU1hdHJpeFJvdyhuYW1lOiBhbnksIHRleHQ6IHN0cmluZywgdmFsdWU6IGFueSk6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVOZXdWYWx1ZShjdXJWYWx1ZTogYW55KTogYW55IHsgcmV0dXJuICFjdXJWYWx1ZSA/IHt9IDogY3VyVmFsdWU7IH1cclxuICAgIHByb3RlY3RlZCBnZXRSb3dWYWx1ZShyb3c6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlLCBxdWVzdGlvblZhbHVlOiBhbnksIGNyZWF0ZTogYm9vbGVhbiA9IGZhbHNlKTogYW55IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gcXVlc3Rpb25WYWx1ZVtyb3cucm93TmFtZV0gPyBxdWVzdGlvblZhbHVlW3Jvdy5yb3dOYW1lXSA6IG51bGw7XHJcbiAgICAgICAgaWYgKCFyZXN1bHQgJiYgY3JlYXRlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICBxdWVzdGlvblZhbHVlW3Jvdy5yb3dOYW1lXSA9IHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkJlZm9yZVZhbHVlQ2hhbmdlZCh2YWw6IGFueSkge1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uVmFsdWVDaGFuZ2VkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUm93Q2hhbmdpbmcpIHJldHVybjtcclxuICAgICAgICB0aGlzLm9uQmVmb3JlVmFsdWVDaGFuZ2VkKHRoaXMudmFsdWUpO1xyXG4gICAgICAgIGlmKCEodGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cykgfHwgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cy5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNSb3dDaGFuZ2luZyA9IHRydWU7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMuY3JlYXRlTmV3VmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzW2ldO1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzW2ldLnZhbHVlID0gdGhpcy5nZXRSb3dWYWx1ZShyb3csIHZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNSb3dDaGFuZ2luZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydEdvTmV4dFBhZ2VBdXRvbWF0aWMoKSB7XHJcbiAgICAgICAgdmFyIHJvd3MgPSB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzO1xyXG4gICAgICAgIGlmICghcm93cykgcm93cyA9IHRoaXMudmlzaWJsZVJvd3M7XHJcbiAgICAgICAgaWYgKCFyb3dzKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNlbGxzID0gdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93c1tpXS5jZWxscztcclxuICAgICAgICAgICAgaWYgKCFjZWxscykgY29udGludWU7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGNvbEluZGV4ID0gMDsgY29sSW5kZXggPCBjZWxscy5sZW5ndGg7IGNvbEluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIHZhciBxdWVzdGlvbiA9IGNlbGxzW2NvbEluZGV4XS5xdWVzdGlvbjtcclxuICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbiAmJiAoIXF1ZXN0aW9uLnN1cHBvcnRHb05leHRQYWdlQXV0b21hdGljKCkgfHwgIXF1ZXN0aW9uLnZhbHVlKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGhhc0Vycm9ycyhmaXJlQ2FsbGJhY2s6IGJvb2xlYW4gPSB0cnVlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIGVycm9zSW5Db2x1bW5zID0gdGhpcy5oYXNFcnJvckluQ29sdW1ucyhmaXJlQ2FsbGJhY2spO1xyXG4gICAgICAgIHJldHVybiBzdXBlci5oYXNFcnJvcnMoZmlyZUNhbGxiYWNrKSB8fCBlcnJvc0luQ29sdW1ucztcclxuICAgIH1cclxuICAgIHByaXZhdGUgaGFzRXJyb3JJbkNvbHVtbnMoZmlyZUNhbGxiYWNrOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIHJlcyA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAodmFyIGNvbEluZGV4ID0gMDsgY29sSW5kZXggPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyBjb2xJbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNlbGxzID0gdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93c1tpXS5jZWxscztcclxuICAgICAgICAgICAgICAgIHJlcyA9IGNlbGxzICYmIGNlbGxzW2NvbEluZGV4XSAmJiBjZWxsc1tjb2xJbmRleF0ucXVlc3Rpb24gJiYgY2VsbHNbY29sSW5kZXhdLnF1ZXN0aW9uLmhhc0Vycm9ycyhmaXJlQ2FsbGJhY2spIHx8IHJlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldEZpcnN0SW5wdXRFbGVtZW50SWQoKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgcXVlc3Rpb24gPSB0aGlzLmdldEZpcnN0Q2VsbFF1ZXN0aW9uKGZhbHNlKTtcclxuICAgICAgICByZXR1cm4gcXVlc3Rpb24gPyBxdWVzdGlvbi5pbnB1dElkIDogc3VwZXIuZ2V0Rmlyc3RJbnB1dEVsZW1lbnRJZCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldEZpcnN0RXJyb3JJbnB1dEVsZW1lbnRJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbiA9IHRoaXMuZ2V0Rmlyc3RDZWxsUXVlc3Rpb24odHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHF1ZXN0aW9uID8gcXVlc3Rpb24uaW5wdXRJZCA6IHN1cGVyLmdldEZpcnN0RXJyb3JJbnB1dEVsZW1lbnRJZCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldEZpcnN0Q2VsbFF1ZXN0aW9uKG9uRXJyb3I6IGJvb2xlYW4pOiBRdWVzdGlvbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNlbGxzID0gdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93c1tpXS5jZWxscztcclxuICAgICAgICAgICAgZm9yICh2YXIgY29sSW5kZXggPSAwOyBjb2xJbmRleCA8IHRoaXMuY29sdW1ucy5sZW5ndGg7IGNvbEluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghb25FcnJvcikgcmV0dXJuIGNlbGxzW2NvbEluZGV4XS5xdWVzdGlvbjtcclxuICAgICAgICAgICAgICAgIGlmIChjZWxsc1tjb2xJbmRleF0ucXVlc3Rpb24uY3VycmVudEVycm9yQ291bnQgPiAwKSByZXR1cm4gY2VsbHNbY29sSW5kZXhdLnF1ZXN0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICAvL0lNYXRyaXhEcm9wZG93bkRhdGFcclxuICAgIHB1YmxpYyBjcmVhdGVRdWVzdGlvbihyb3c6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlLCBjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogUXVlc3Rpb24ge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbiA9IHRoaXMuY3JlYXRlUXVlc3Rpb25Db3JlKHJvdywgY29sdW1uKTtcclxuICAgICAgICBxdWVzdGlvbi5uYW1lID0gY29sdW1uLm5hbWU7XHJcbiAgICAgICAgcXVlc3Rpb24uaXNSZXF1aXJlZCA9IGNvbHVtbi5pc1JlcXVpcmVkO1xyXG4gICAgICAgIHF1ZXN0aW9uLmhhc090aGVyID0gY29sdW1uLmhhc090aGVyO1xyXG4gICAgICAgIGlmIChjb2x1bW4uaGFzT3RoZXIpIHtcclxuICAgICAgICAgICAgaWYgKHF1ZXN0aW9uIGluc3RhbmNlb2YgUXVlc3Rpb25TZWxlY3RCYXNlKSB7XHJcbiAgICAgICAgICAgICAgICAoPFF1ZXN0aW9uU2VsZWN0QmFzZT5xdWVzdGlvbikuc3RvcmVPdGhlcnNBc0NvbW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcXVlc3Rpb247XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlUXVlc3Rpb25Db3JlKHJvdzogTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UsIGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBRdWVzdGlvbiB7XHJcbiAgICAgICAgdmFyIGNlbGxUeXBlID0gY29sdW1uLmNlbGxUeXBlID09IFwiZGVmYXVsdFwiID8gdGhpcy5jZWxsVHlwZSA6IGNvbHVtbi5jZWxsVHlwZTtcclxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0UXVlc3Rpb25OYW1lKHJvdywgY29sdW1uKTtcclxuICAgICAgICBpZiAoY2VsbFR5cGUgPT0gXCJjaGVja2JveFwiKSByZXR1cm4gdGhpcy5jcmVhdGVDaGVja2JveChuYW1lLCBjb2x1bW4pO1xyXG4gICAgICAgIGlmIChjZWxsVHlwZSA9PSBcInJhZGlvZ3JvdXBcIikgcmV0dXJuIHRoaXMuY3JlYXRlUmFkaW9ncm91cChuYW1lLCBjb2x1bW4pO1xyXG4gICAgICAgIGlmIChjZWxsVHlwZSA9PSBcInRleHRcIikgcmV0dXJuIHRoaXMuY3JlYXRlVGV4dChuYW1lLCBjb2x1bW4pO1xyXG4gICAgICAgIGlmIChjZWxsVHlwZSA9PSBcImNvbW1lbnRcIikgcmV0dXJuIHRoaXMuY3JlYXRlQ29tbWVudChuYW1lLCBjb2x1bW4pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZURyb3Bkb3duKG5hbWUsIGNvbHVtbik7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0UXVlc3Rpb25OYW1lKHJvdzogTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UsIGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBzdHJpbmcgeyByZXR1cm4gcm93LnJvd05hbWUgKyBcIl9cIiArIGNvbHVtbi5uYW1lOyB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29sdW1uQ2hvaWNlcyhjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGNvbHVtbi5jaG9pY2VzICYmIGNvbHVtbi5jaG9pY2VzLmxlbmd0aCA+IDAgPyBjb2x1bW4uY2hvaWNlcyA6IHRoaXMuY2hvaWNlcztcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXRDb2x1bW5PcHRpb25zQ2FwdGlvbihjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gY29sdW1uLm9wdGlvbnNDYXB0aW9uID8gY29sdW1uLm9wdGlvbnNDYXB0aW9uIDogdGhpcy5vcHRpb25zQ2FwdGlvbjtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVEcm9wZG93bihuYW1lOiBzdHJpbmcsIGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBRdWVzdGlvbkRyb3Bkb3duTW9kZWwge1xyXG4gICAgICAgIHZhciBxID0gPFF1ZXN0aW9uRHJvcGRvd25Nb2RlbD50aGlzLmNyZWF0ZUNlbGxRdWVzdGlvbihcImRyb3Bkb3duXCIsIG5hbWUpO1xyXG4gICAgICAgIHEuY2hvaWNlcyA9IHRoaXMuZ2V0Q29sdW1uQ2hvaWNlcyhjb2x1bW4pO1xyXG4gICAgICAgIHEub3B0aW9uc0NhcHRpb24gPSB0aGlzLmdldENvbHVtbk9wdGlvbnNDYXB0aW9uKGNvbHVtbik7XHJcbiAgICAgICAgcmV0dXJuIHE7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlQ2hlY2tib3gobmFtZTogc3RyaW5nLCBjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogUXVlc3Rpb25DaGVja2JveE1vZGVsIHtcclxuICAgICAgICB2YXIgcSA9IDxRdWVzdGlvbkNoZWNrYm94TW9kZWw+dGhpcy5jcmVhdGVDZWxsUXVlc3Rpb24oXCJjaGVja2JveFwiLCBuYW1lKTtcclxuICAgICAgICBxLmNob2ljZXMgPSB0aGlzLmdldENvbHVtbkNob2ljZXMoY29sdW1uKTtcclxuICAgICAgICBxLmNvbENvdW50ID0gY29sdW1uLmNvbENvdW50ID4gLSAxID8gY29sdW1uLmNvbENvdW50IDogdGhpcy5jb2x1bW5Db2xDb3VudDtcclxuICAgICAgICByZXR1cm4gcTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVSYWRpb2dyb3VwKG5hbWU6IHN0cmluZywgY29sdW1uOiBNYXRyaXhEcm9wZG93bkNvbHVtbik6IFF1ZXN0aW9uUmFkaW9ncm91cE1vZGVsIHtcclxuICAgICAgICB2YXIgcSA9IDxRdWVzdGlvblJhZGlvZ3JvdXBNb2RlbD50aGlzLmNyZWF0ZUNlbGxRdWVzdGlvbihcInJhZGlvZ3JvdXBcIiwgbmFtZSk7XHJcbiAgICAgICAgcS5jaG9pY2VzID0gdGhpcy5nZXRDb2x1bW5DaG9pY2VzKGNvbHVtbik7XHJcbiAgICAgICAgcS5jb2xDb3VudCA9IGNvbHVtbi5jb2xDb3VudCA+IC0gMSA/IGNvbHVtbi5jb2xDb3VudCA6IHRoaXMuY29sdW1uQ29sQ291bnQ7XHJcbiAgICAgICAgcmV0dXJuIHE7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVGV4dChuYW1lOiBzdHJpbmcsIGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBRdWVzdGlvblRleHRNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIDxRdWVzdGlvblRleHRNb2RlbD50aGlzLmNyZWF0ZUNlbGxRdWVzdGlvbihcInRleHRcIiwgbmFtZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlQ29tbWVudChuYW1lOiBzdHJpbmcsIGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBRdWVzdGlvbkNvbW1lbnRNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIDxRdWVzdGlvbkNvbW1lbnRNb2RlbD50aGlzLmNyZWF0ZUNlbGxRdWVzdGlvbihcImNvbW1lbnRcIiwgbmFtZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlQ2VsbFF1ZXN0aW9uKHF1ZXN0aW9uVHlwZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBRdWVzdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIDxRdWVzdGlvbj5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UuY3JlYXRlUXVlc3Rpb24ocXVlc3Rpb25UeXBlLCBuYW1lKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBkZWxldGVSb3dWYWx1ZShuZXdWYWx1ZTogYW55LCByb3c6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlKTogYW55IHtcclxuICAgICAgICBkZWxldGUgbmV3VmFsdWVbcm93LnJvd05hbWVdO1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhuZXdWYWx1ZSkubGVuZ3RoID09IDAgPyBudWxsIDogbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgICBvblJvd0NoYW5nZWQocm93OiBNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZSwgbmV3Um93VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHRoaXMuY3JlYXRlTmV3VmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgdmFyIHJvd1ZhbHVlID0gdGhpcy5nZXRSb3dWYWx1ZShyb3csIG5ld1ZhbHVlLCB0cnVlKTtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcm93VmFsdWUpIGRlbGV0ZSByb3dWYWx1ZVtrZXldO1xyXG4gICAgICAgIGlmIChuZXdSb3dWYWx1ZSkge1xyXG4gICAgICAgICAgICBuZXdSb3dWYWx1ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobmV3Um93VmFsdWUpKTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG5ld1Jvd1ZhbHVlKSByb3dWYWx1ZVtrZXldID0gbmV3Um93VmFsdWVba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJvd1ZhbHVlKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuZGVsZXRlUm93VmFsdWUobmV3VmFsdWUsIHJvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNSb3dDaGFuZ2luZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZXROZXdWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgICAgICAgdGhpcy5pc1Jvd0NoYW5naW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJtYXRyaXhkcm9wZG93bmNvbHVtblwiLCBbXCJuYW1lXCIsIHsgbmFtZTogXCJ0aXRsZVwiLCBvbkdldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnkpIHsgcmV0dXJuIG9iai50aXRsZVZhbHVlOyB9IH0sXHJcbiAgICAgICAgeyBuYW1lOiBcImNob2ljZXM6aXRlbXZhbHVlc1wiLCBvbkdldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnkpIHsgcmV0dXJuIEl0ZW1WYWx1ZS5nZXREYXRhKG9iai5jaG9pY2VzKTsgfSwgb25TZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55LCB2YWx1ZTogYW55KSB7IG9iai5jaG9pY2VzID0gdmFsdWU7IH19LFxyXG4gICAgICAgIFwib3B0aW9uc0NhcHRpb25cIiwgeyBuYW1lOiBcImNlbGxUeXBlXCIsIGRlZmF1bHQ6IFwiZGVmYXVsdFwiLCBjaG9pY2VzOiBbXCJkZWZhdWx0XCIsIFwiZHJvcGRvd25cIiwgXCJjaGVja2JveFwiLCBcInJhZGlvZ3JvdXBcIiwgXCJ0ZXh0XCIsIFwiY29tbWVudFwiXSB9LFxyXG4gICAgICAgIHsgbmFtZTogXCJjb2xDb3VudFwiLCBkZWZhdWx0OiAtMSwgY2hvaWNlczogWy0xLCAwLCAxLCAyLCAzLCA0XSB9LCBcImlzUmVxdWlyZWQ6Ym9vbGVhblwiLCBcImhhc090aGVyOmJvb2xlYW5cIiwgXCJtaW5XaWR0aFwiXSxcclxuICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBNYXRyaXhEcm9wZG93bkNvbHVtbihcIlwiKTsgfSk7XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwibWF0cml4ZHJvcGRvd25iYXNlXCIsIFt7IG5hbWU6IFwiY29sdW1uczptYXRyaXhkcm9wZG93bmNvbHVtbnNcIiwgY2xhc3NOYW1lOiBcIm1hdHJpeGRyb3Bkb3duY29sdW1uXCIgfSxcclxuICAgICAgICBcImhvcml6b250YWxTY3JvbGw6Ym9vbGVhblwiLFxyXG4gICAgICAgIHsgbmFtZTogXCJjaG9pY2VzOml0ZW12YWx1ZXNcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBJdGVtVmFsdWUuZ2V0RGF0YShvYmouY2hvaWNlcyk7IH0sIG9uU2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSwgdmFsdWU6IGFueSkgeyBvYmouY2hvaWNlcyA9IHZhbHVlOyB9fSxcclxuICAgICAgICB7IG5hbWU6IFwib3B0aW9uc0NhcHRpb25cIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmoub3B0aW9uc0NhcHRpb25WYWx1ZTsgfSB9LFxyXG4gICAgICAgIHsgbmFtZTogXCJjZWxsVHlwZVwiLCBkZWZhdWx0OiBcImRyb3Bkb3duXCIsIGNob2ljZXM6IFtcImRyb3Bkb3duXCIsIFwiY2hlY2tib3hcIiwgXCJyYWRpb2dyb3VwXCIsIFwidGV4dFwiLCBcImNvbW1lbnRcIl0gfSxcclxuICAgICAgICB7IG5hbWU6IFwiY29sdW1uQ29sQ291bnRcIiwgZGVmYXVsdDogMCwgY2hvaWNlczogWzAsIDEsIDIsIDMsIDRdIH0sIFwiY29sdW1uTWluV2lkdGhcIl0sXHJcbiAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUXVlc3Rpb25NYXRyaXhEcm9wZG93bk1vZGVsQmFzZShcIlwiKTsgfSwgXCJxdWVzdGlvblwiKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbl9tYXRyaXhkcm9wZG93bmJhc2UudHNcbiAqKi8iLCJpbXBvcnQge0pzb25PYmplY3R9IGZyb20gJy4vanNvbm9iamVjdCc7XHJcbmltcG9ydCB7UXVlc3Rpb25CYXNlfSBmcm9tICcuL3F1ZXN0aW9uYmFzZSc7XHJcbmltcG9ydCB7U3VydmV5RXJyb3IsIFN1cnZleUVsZW1lbnR9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuL3N1cnZleVN0cmluZ3NcIjtcclxuaW1wb3J0IHtBbnN3ZXJSZXF1aXJlZEVycm9yfSBmcm9tIFwiLi9lcnJvclwiO1xyXG5pbXBvcnQge1N1cnZleVZhbGlkYXRvciwgSVZhbGlkYXRvck93bmVyLCBWYWxpZGF0b3JSdW5uZXJ9IGZyb20gXCIuL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge1RleHRQcmVQcm9jZXNzb3J9IGZyb20gXCIuL3RleHRQcmVQcm9jZXNzb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbiBleHRlbmRzIFF1ZXN0aW9uQmFzZSBpbXBsZW1lbnRzIElWYWxpZGF0b3JPd25lciB7XHJcbiAgICBwcml2YXRlIHRpdGxlVmFsdWU6IHN0cmluZyA9IG51bGw7XHJcbiAgICBwcml2YXRlIHF1ZXN0aW9uVmFsdWU6IGFueTtcclxuICAgIHByaXZhdGUgcXVlc3Rpb25Db21tZW50OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGlzUmVxdWlyZWRWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBoYXNDb21tZW50VmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaGFzT3RoZXJWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBjb21tZW50VGV4dFZhbHVlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSB0ZXh0UHJlUHJvY2Vzc29yOiBUZXh0UHJlUHJvY2Vzc29yO1xyXG4gICAgZXJyb3JzOiBBcnJheTxTdXJ2ZXlFcnJvcj4gPSBbXTtcclxuICAgIHZhbGlkYXRvcnM6IEFycmF5PFN1cnZleVZhbGlkYXRvcj4gPSBuZXcgQXJyYXk8U3VydmV5VmFsaWRhdG9yPigpO1xyXG4gICAgdmFsdWVDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcbiAgICBjb21tZW50Q2hhbmdlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgZXJyb3JzQ2hhbmdlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgdGl0bGVDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBoYXNUaXRsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cclxuICAgIHB1YmxpYyBnZXQgaGFzSW5wdXQoKTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGlucHV0SWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuaWQgKyBcImlcIjsgfVxyXG4gICAgcHVibGljIGdldCB0aXRsZSgpOiBzdHJpbmcgeyByZXR1cm4gKHRoaXMudGl0bGVWYWx1ZSkgPyB0aGlzLnRpdGxlVmFsdWUgOiB0aGlzLm5hbWU7IH1cclxuICAgIHB1YmxpYyBzZXQgdGl0bGUobmV3VmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudGl0bGVWYWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMudGl0bGVDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBwcm9jZXNzZWRUaXRsZSgpIHsgcmV0dXJuIHRoaXMuc3VydmV5ICE9IG51bGwgPyB0aGlzLnN1cnZleS5wcm9jZXNzVGV4dCh0aGlzLnRpdGxlKSA6IHRoaXMudGl0bGU7IH1cclxuICAgIHB1YmxpYyBnZXQgZnVsbFRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3VydmV5ICYmIHRoaXMuc3VydmV5LnF1ZXN0aW9uVGl0bGVUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGV4dFByZVByb2Nlc3Nvcikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0UHJlUHJvY2Vzc29yID0gbmV3IFRleHRQcmVQcm9jZXNzb3IoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dFByZVByb2Nlc3Nvci5vbkhhc1ZhbHVlID0gZnVuY3Rpb24gKG5hbWU6IHN0cmluZykgeyByZXR1cm4gc2VsZi5jYW5Qcm9jZXNzZWRUZXh0VmFsdWVzKG5hbWUudG9Mb3dlckNhc2UoKSk7IH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRQcmVQcm9jZXNzb3Iub25Qcm9jZXNzID0gZnVuY3Rpb24gKG5hbWU6IHN0cmluZykgeyByZXR1cm4gc2VsZi5nZXRQcm9jZXNzZWRUZXh0VmFsdWUobmFtZSk7IH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGV4dFByZVByb2Nlc3Nvci5wcm9jZXNzKHRoaXMuc3VydmV5LnF1ZXN0aW9uVGl0bGVUZW1wbGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXF1aXJlVGV4dCA9IHRoaXMucmVxdWlyZWRUZXh0O1xyXG4gICAgICAgIGlmIChyZXF1aXJlVGV4dCkgcmVxdWlyZVRleHQgKz0gXCIgXCI7XHJcbiAgICAgICAgdmFyIG5vID0gdGhpcy5ubztcclxuICAgICAgICBpZiAobm8pIG5vICs9IFwiLiBcIjtcclxuICAgICAgICByZXR1cm4gbm8gKyByZXF1aXJlVGV4dCArIHRoaXMucHJvY2Vzc2VkVGl0bGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZm9jdXMob25FcnJvcjogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgU3VydmV5RWxlbWVudC5TY3JvbGxFbGVtZW50VG9Ub3AodGhpcy5pZCk7XHJcbiAgICAgICAgdmFyIGlkID0gIW9uRXJyb3IgPyB0aGlzLmdldEZpcnN0SW5wdXRFbGVtZW50SWQoKSA6IHRoaXMuZ2V0Rmlyc3RFcnJvcklucHV0RWxlbWVudElkKCk7XHJcbiAgICAgICAgaWYgKFN1cnZleUVsZW1lbnQuRm9jdXNFbGVtZW50KGlkKSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmZvY3VzQ2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXRGaXJzdElucHV0RWxlbWVudElkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRJZDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXRGaXJzdEVycm9ySW5wdXRFbGVtZW50SWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGaXJzdElucHV0RWxlbWVudElkKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY2FuUHJvY2Vzc2VkVGV4dFZhbHVlcyhuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gbmFtZSA9PSBcIm5vXCIgfHwgbmFtZSA9PSBcInRpdGxlXCIgfHwgbmFtZSA9PSBcInJlcXVpcmVcIjtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXRQcm9jZXNzZWRUZXh0VmFsdWUobmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBpZiAobmFtZSA9PSBcIm5vXCIpIHJldHVybiB0aGlzLm5vO1xyXG4gICAgICAgIGlmIChuYW1lID09IFwidGl0bGVcIikgcmV0dXJuIHRoaXMucHJvY2Vzc2VkVGl0bGU7XHJcbiAgICAgICAgaWYgKG5hbWUgPT0gXCJyZXF1aXJlXCIpIHJldHVybiB0aGlzLnJlcXVpcmVkVGV4dDtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdXBwb3J0Q29tbWVudCgpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICBwdWJsaWMgc3VwcG9ydE90aGVyKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cclxuICAgIHB1YmxpYyBnZXQgaXNSZXF1aXJlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaXNSZXF1aXJlZFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGlzUmVxdWlyZWQodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZXF1aXJlZCA9PSB2YWwpIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzUmVxdWlyZWRWYWx1ZSA9IHZhbDtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLnRpdGxlQ2hhbmdlZENhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaGFzQ29tbWVudCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaGFzQ29tbWVudFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGhhc0NvbW1lbnQodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRDb21tZW50KCkpIHJldHVybjtcclxuICAgICAgICB0aGlzLmhhc0NvbW1lbnRWYWx1ZSA9IHZhbDtcclxuICAgICAgICBpZiAodGhpcy5oYXNDb21tZW50KSB0aGlzLmhhc090aGVyID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1lbnRUZXh0KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmNvbW1lbnRUZXh0VmFsdWUgPyB0aGlzLmNvbW1lbnRUZXh0VmFsdWUgOiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwib3RoZXJJdGVtVGV4dFwiKTsgfVxyXG4gICAgcHVibGljIHNldCBjb21tZW50VGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jb21tZW50VGV4dFZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGhhc090aGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5oYXNPdGhlclZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGhhc090aGVyKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICghdGhpcy5zdXBwb3J0T3RoZXIoKSB8fCB0aGlzLmhhc090aGVyID09IHZhbCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaGFzT3RoZXJWYWx1ZSA9IHZhbDtcclxuICAgICAgICBpZiAodGhpcy5oYXNPdGhlcikgdGhpcy5oYXNDb21tZW50ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5oYXNPdGhlckNoYW5nZWQoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBoYXNPdGhlckNoYW5nZWQoKSB7IH1cclxuICAgIHByb3RlY3RlZCBnZXQgbm8oKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy52aXNpYmxlSW5kZXggPCAwKSByZXR1cm4gXCJcIjtcclxuICAgICAgICB2YXIgc3RhcnRJbmRleCA9IDE7XHJcbiAgICAgICAgdmFyIGlzTnVtZXJpYyA9IHRydWU7XHJcbiAgICAgICAgdmFyIHN0ciA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHRoaXMuc3VydmV5ICYmIHRoaXMuc3VydmV5LnF1ZXN0aW9uU3RhcnRJbmRleCkge1xyXG4gICAgICAgICAgICBzdHIgPSB0aGlzLnN1cnZleS5xdWVzdGlvblN0YXJ0SW5kZXg7XHJcbiAgICAgICAgICAgIGlmIChwYXJzZUludChzdHIpKSBzdGFydEluZGV4ID0gcGFyc2VJbnQoc3RyKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoc3RyLmxlbmd0aCA9PSAxKSBpc051bWVyaWMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzTnVtZXJpYykgcmV0dXJuICh0aGlzLnZpc2libGVJbmRleCArIHN0YXJ0SW5kZXgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoc3RyLmNoYXJDb2RlQXQoMCkgKyB0aGlzLnZpc2libGVJbmRleCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25TZXREYXRhKCkge1xyXG4gICAgICAgIHN1cGVyLm9uU2V0RGF0YSgpO1xyXG4gICAgICAgIHRoaXMub25TdXJ2ZXlWYWx1ZUNoYW5nZWQodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVGcm9tRGF0YSh0aGlzLmdldFZhbHVlQ29yZSgpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgdmFsdWUobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0TmV3VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMudmFsdWVDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBjb21tZW50KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmdldENvbW1lbnQoKTsgfVxyXG4gICAgcHVibGljIHNldCBjb21tZW50KG5ld1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5jb21tZW50ID09IG5ld1ZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zZXRDb21tZW50KG5ld1ZhbHVlKTtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmNvbW1lbnRDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldENvbW1lbnQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZGF0YSAhPSBudWxsID8gdGhpcy5kYXRhLmdldENvbW1lbnQodGhpcy5uYW1lKSA6IHRoaXMucXVlc3Rpb25Db21tZW50OyB9XHJcbiAgICBwcm90ZWN0ZWQgc2V0Q29tbWVudChuZXdWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zZXROZXdDb21tZW50KG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc0VtcHR5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy52YWx1ZSA9PSBudWxsOyB9XHJcbiAgICBwdWJsaWMgaGFzRXJyb3JzKGZpcmVDYWxsYmFjazogYm9vbGVhbiA9IHRydWUpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLmNoZWNrRm9yRXJyb3JzKGZpcmVDYWxsYmFjayk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JzLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGN1cnJlbnRFcnJvckNvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLmVycm9ycy5sZW5ndGg7IH1cclxuICAgIHB1YmxpYyBnZXQgcmVxdWlyZWRUZXh0KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnN1cnZleSAhPSBudWxsICYmIHRoaXMuaXNSZXF1aXJlZCA/IHRoaXMuc3VydmV5LnJlcXVpcmVkVGV4dCA6IFwiXCI7IH1cclxuICAgIHB1YmxpYyBhZGRFcnJvcihlcnJvcjogU3VydmV5RXJyb3IpIHtcclxuICAgICAgICB0aGlzLmVycm9ycy5wdXNoKGVycm9yKTtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmVycm9yc0NoYW5nZWRDYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNoZWNrRm9yRXJyb3JzKGZpcmVDYWxsYmFjazogYm9vbGVhbikge1xyXG4gICAgICAgIHZhciBlcnJvckxlbmd0aCA9IHRoaXMuZXJyb3JzID8gdGhpcy5lcnJvcnMubGVuZ3RoIDogMDtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgICAgIHRoaXMub25DaGVja0ZvckVycm9ycyh0aGlzLmVycm9ycyk7XHJcbiAgICAgICAgaWYgKHRoaXMuZXJyb3JzLmxlbmd0aCA9PSAwICYmIHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gdGhpcy5ydW5WYWxpZGF0b3JzKCk7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcnMucHVzaChlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VydmV5ICYmIHRoaXMuZXJyb3JzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IHRoaXMuc3VydmV5LnZhbGlkYXRlUXVlc3Rpb24odGhpcy5uYW1lKTtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9ycy5wdXNoKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZmlyZUNhbGxiYWNrICYmIChlcnJvckxlbmd0aCAhPSB0aGlzLmVycm9ycy5sZW5ndGggfHwgZXJyb3JMZW5ndGggPiAwKSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmVycm9yc0NoYW5nZWRDYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uQ2hlY2tGb3JFcnJvcnMoZXJyb3JzOiBBcnJheTxTdXJ2ZXlFcnJvcj4pIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNSZXF1aXJlZEVycm9yKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcnMucHVzaChuZXcgQW5zd2VyUmVxdWlyZWRFcnJvcigpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgaGFzUmVxdWlyZWRFcnJvcigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1JlcXVpcmVkICYmIHRoaXMuaXNFbXB0eSgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJ1blZhbGlkYXRvcnMoKTogU3VydmV5RXJyb3Ige1xyXG4gICAgICAgIHJldHVybiBuZXcgVmFsaWRhdG9yUnVubmVyKCkucnVuKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc1ZhbHVlQ2hhbmdlZEluU3VydmV5ID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgc2V0TmV3VmFsdWUobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0TmV3VmFsdWVJbkRhdGEobmV3VmFsdWUpO1xyXG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZWQoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzZXROZXdWYWx1ZUluRGF0YShuZXdWYWx1ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsdWVDaGFuZ2VkSW5TdXJ2ZXkpIHtcclxuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLnZhbHVlVG9EYXRhKG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUNvcmUobmV3VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0VmFsdWVDb3JlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEgIT0gbnVsbCA/IHRoaXMuZGF0YS5nZXRWYWx1ZSh0aGlzLm5hbWUpIDogdGhpcy5xdWVzdGlvblZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzZXRWYWx1ZUNvcmUobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2V0VmFsdWUodGhpcy5uYW1lLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvblZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHZhbHVlRnJvbURhdGEodmFsOiBhbnkpOiBhbnkgeyByZXR1cm4gdmFsOyB9XHJcbiAgICBwcm90ZWN0ZWQgdmFsdWVUb0RhdGEodmFsOiBhbnkpOiBhbnkgeyByZXR1cm4gdmFsOyB9XHJcbiAgICBwcm90ZWN0ZWQgb25WYWx1ZUNoYW5nZWQoKSB7IH1cclxuICAgIHByb3RlY3RlZCBzZXROZXdDb21tZW50KG5ld1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNldENvbW1lbnQodGhpcy5uYW1lLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHRoaXMucXVlc3Rpb25Db21tZW50ID0gbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgICAvL0lRdWVzdGlvblxyXG4gICAgb25TdXJ2ZXlWYWx1ZUNoYW5nZWQobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaXNWYWx1ZUNoYW5nZWRJblN1cnZleSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWVGcm9tRGF0YShuZXdWYWx1ZSk7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy5jb21tZW50Q2hhbmdlZENhbGxiYWNrKTtcclxuICAgICAgICB0aGlzLmlzVmFsdWVDaGFuZ2VkSW5TdXJ2ZXkgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vSVZhbGlkYXRvck93bmVyXHJcbiAgICBnZXRWYWxpZGF0b3JUaXRsZSgpOiBzdHJpbmcgeyByZXR1cm4gbnVsbDsgfVxyXG59XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJxdWVzdGlvblwiLCBbeyBuYW1lOiBcInRpdGxlOnRleHRcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmoudGl0bGVWYWx1ZTsgfSB9LFxyXG4gICAgeyBuYW1lOiBcImNvbW1lbnRUZXh0XCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gb2JqLmNvbW1lbnRUZXh0VmFsdWU7IH0gfSxcclxuICAgIFwiaXNSZXF1aXJlZDpib29sZWFuXCIsIHsgbmFtZTogXCJ2YWxpZGF0b3JzOnZhbGlkYXRvcnNcIiwgYmFzZUNsYXNzTmFtZTogXCJzdXJ2ZXl2YWxpZGF0b3JcIiwgY2xhc3NOYW1lUGFydDogXCJ2YWxpZGF0b3JcIn1dLCBudWxsLCBcInF1ZXN0aW9uYmFzZVwiKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbi50c1xuICoqLyIsImltcG9ydCB7QmFzZSwgSVF1ZXN0aW9uLCBJQ29uZGl0aW9uUnVubmVyLCBJU3VydmV5RGF0YSwgSVN1cnZleSwgSGFzaFRhYmxlfSBmcm9tICcuL2Jhc2UnO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gJy4vanNvbm9iamVjdCc7XHJcbmltcG9ydCB7Q29uZGl0aW9uUnVubmVyfSBmcm9tICcuL2NvbmRpdGlvbnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQmFzZSBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBJUXVlc3Rpb24sIElDb25kaXRpb25SdW5uZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcXVlc3Rpb25Db3VudGVyID0gMTAwO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0UXVlc3Rpb25JZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcInNxX1wiICsgUXVlc3Rpb25CYXNlLnF1ZXN0aW9uQ291bnRlcisrO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGRhdGE6IElTdXJ2ZXlEYXRhO1xyXG4gICAgcHJvdGVjdGVkIHN1cnZleTogSVN1cnZleTtcclxuICAgIHByaXZhdGUgY29uZGl0aW9uUnVubmVyOiBDb25kaXRpb25SdW5uZXIgPSBudWxsO1xyXG4gICAgcHVibGljIHZpc2libGVJZjogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgaWRWYWx1ZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSB2aXNpYmxlVmFsdWU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHN0YXJ0V2l0aE5ld0xpbmU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSB2aXNpYmxlSW5kZXhWYWx1ZTogbnVtYmVyID0gLTE7XHJcbiAgICBwdWJsaWMgd2lkdGg6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHJlbmRlcldpZHRoVmFsdWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHJpZ2h0SW5kZW50VmFsdWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgaW5kZW50OiBudW1iZXIgPSAwO1xyXG4gICAgZm9jdXNDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuICAgIHJlbmRlcldpZHRoQ2hhbmdlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgcm93VmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuICAgIHZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcbiAgICB2aXNpYmxlSW5kZXhDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5pZFZhbHVlID0gUXVlc3Rpb25CYXNlLmdldFF1ZXN0aW9uSWQoKTtcclxuICAgICAgICB0aGlzLm9uQ3JlYXRpbmcoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMudmlzaWJsZVZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHZpc2libGUodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PSB0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgICAgICB0aGlzLnZpc2libGVWYWx1ZSA9IHZhbDtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLnZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMucm93VmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjayk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3VydmV5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VydmV5LnF1ZXN0aW9uVmlzaWJpbGl0eUNoYW5nZWQoPElRdWVzdGlvbj50aGlzLCB0aGlzLnZpc2libGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgdmlzaWJsZUluZGV4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLnZpc2libGVJbmRleFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgaGFzRXJyb3JzKGZpcmVDYWxsYmFjazogYm9vbGVhbiA9IHRydWUpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGN1cnJlbnRFcnJvckNvdW50KCk6IG51bWJlciB7IHJldHVybiAwOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGhhc1RpdGxlKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cclxuICAgIHB1YmxpYyBnZXQgaGFzSW5wdXQoKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgcHVibGljIGdldCBoYXNDb21tZW50KCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuaWRWYWx1ZTsgfVxyXG4gICAgcHVibGljIGdldCByZW5kZXJXaWR0aCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5yZW5kZXJXaWR0aFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHJlbmRlcldpZHRoKHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PSB0aGlzLnJlbmRlcldpZHRoKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5yZW5kZXJXaWR0aFZhbHVlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMucmVuZGVyV2lkdGhDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCByaWdodEluZGVudCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5yaWdodEluZGVudFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHJpZ2h0SW5kZW50KHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PSB0aGlzLnJpZ2h0SW5kZW50KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5yaWdodEluZGVudFZhbHVlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMucmVuZGVyV2lkdGhDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGZvY3VzKG9uRXJyb3I6IGJvb2xlYW4gPSBmYWxzZSkgeyB9XHJcbiAgICBzZXREYXRhKG5ld1ZhbHVlOiBJU3VydmV5RGF0YSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMuc3VydmV5ID0gKG5ld1ZhbHVlICYmIG5ld1ZhbHVlW1wicXVlc3Rpb25BZGRlZFwiXSkgPyA8SVN1cnZleT5uZXdWYWx1ZSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5vblNldERhdGEoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBmaXJlQ2FsbGJhY2soY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25TZXREYXRhKCkgeyB9XHJcbiAgICBwcm90ZWN0ZWQgb25DcmVhdGluZygpIHsgfVxyXG4gICAgcHVibGljIHJ1bkNvbmRpdGlvbih2YWx1ZXM6IEhhc2hUYWJsZTxhbnk+KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGVJZikgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5jb25kaXRpb25SdW5uZXIpIHRoaXMuY29uZGl0aW9uUnVubmVyID0gbmV3IENvbmRpdGlvblJ1bm5lcih0aGlzLnZpc2libGVJZik7XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25SdW5uZXIuZXhwcmVzc2lvbiA9IHRoaXMudmlzaWJsZUlmO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRoaXMuY29uZGl0aW9uUnVubmVyLnJ1bih2YWx1ZXMpO1xyXG4gICAgfVxyXG4gICAgLy9JUXVlc3Rpb25cclxuICAgIG9uU3VydmV5VmFsdWVDaGFuZ2VkKG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgIH1cclxuICAgIG9uU3VydmV5TG9hZCgpIHtcclxuICAgIH1cclxuICAgIHNldFZpc2libGVJbmRleCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZUluZGV4VmFsdWUgPT0gdmFsdWUpIHJldHVybjtcclxuICAgICAgICB0aGlzLnZpc2libGVJbmRleFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy52aXNpYmxlSW5kZXhDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydEdvTmV4dFBhZ2VBdXRvbWF0aWMoKSB7IHJldHVybiBmYWxzZTsgfVxyXG59XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJxdWVzdGlvbmJhc2VcIiwgW1wiIW5hbWVcIiwgeyBuYW1lOiBcInZpc2libGU6Ym9vbGVhblwiLCBkZWZhdWx0OiB0cnVlIH0sIFwidmlzaWJsZUlmOnRleHRcIixcclxuICAgIHsgbmFtZTogXCJ3aWR0aFwiIH0sIHsgbmFtZTogXCJzdGFydFdpdGhOZXdMaW5lOmJvb2xlYW5cIiwgZGVmYXVsdDogdHJ1ZX0sIHtuYW1lOiBcImluZGVudDpudW1iZXJcIiwgZGVmYXVsdDogMCwgY2hvaWNlczogWzAsIDEsIDIsIDNdfV0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3F1ZXN0aW9uYmFzZS50c1xuICoqLyIsImV4cG9ydCBjbGFzcyBUZXh0UHJlUHJvY2Vzc29ySXRlbSB7XHJcbiAgICBwdWJsaWMgc3RhcnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBlbmQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRQcmVQcm9jZXNzb3Ige1xyXG4gICAgcHVibGljIG9uUHJvY2VzczogKG5hbWU6IHN0cmluZykgPT4gYW55O1xyXG4gICAgcHVibGljIG9uSGFzVmFsdWU6IChuYW1lOiBzdHJpbmcpID0+IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG4gICAgcHVibGljIHByb2Nlc3ModGV4dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIXRleHQpIHJldHVybiB0ZXh0O1xyXG4gICAgICAgIGlmICghdGhpcy5vblByb2Nlc3MpIHJldHVybiB0ZXh0O1xyXG4gICAgICAgIHZhciBpdGVtcyA9IHRoaXMuZ2V0SXRlbXModGV4dCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGl0ZW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gaXRlbXNbaV07XHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gdGhpcy5nZXROYW1lKHRleHQuc3Vic3RyaW5nKGl0ZW0uc3RhcnQgKyAxLCBpdGVtLmVuZCkpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2FuUHJvY2Vzc05hbWUobmFtZSkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vbkhhc1ZhbHVlICYmICF0aGlzLm9uSGFzVmFsdWUobmFtZSkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLm9uUHJvY2VzcyhuYW1lKTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyKDAsIGl0ZW0uc3RhcnQpICsgdmFsdWUgKyB0ZXh0LnN1YnN0cihpdGVtLmVuZCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0SXRlbXModGV4dDogc3RyaW5nKTogQXJyYXk8VGV4dFByZVByb2Nlc3Nvckl0ZW0+IHtcclxuICAgICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgICB2YXIgbGVuZ3RoID0gdGV4dC5sZW5ndGg7XHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gLTE7XHJcbiAgICAgICAgdmFyIGNoID0gJyc7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjaCA9IHRleHRbaV07XHJcbiAgICAgICAgICAgIGlmIChjaCA9PSAneycpIHN0YXJ0ID0gaTtcclxuICAgICAgICAgICAgaWYgKGNoID09ICd9Jykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IG5ldyBUZXh0UHJlUHJvY2Vzc29ySXRlbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3RhcnQgPSBzdGFydDtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmVuZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXROYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCFuYW1lKSByZXR1cm47XHJcbiAgICAgICAgcmV0dXJuIG5hbWUudHJpbSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjYW5Qcm9jZXNzTmFtZShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIW5hbWUpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoID0gbmFtZVtpXTtcclxuICAgICAgICAgICAgLy9UT0RPXHJcbiAgICAgICAgICAgIGlmIChjaCA9PSAnICcgfHwgY2ggPT0gJy0nIHx8IGNoID09ICcmJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RleHRQcmVQcm9jZXNzb3IudHNcbiAqKi8iLCJpbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4vcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtJdGVtVmFsdWUsIFN1cnZleUVycm9yfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tIFwiLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcbmltcG9ydCB7Q3VzdG9tRXJyb3J9IGZyb20gXCIuL2Vycm9yXCI7XHJcbmltcG9ydCB7Q2hvaWNlc1Jlc3RmdWxsfSBmcm9tIFwiLi9jaG9pY2VzUmVzdGZ1bGxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblNlbGVjdEJhc2UgZXh0ZW5kcyBRdWVzdGlvbiB7XHJcbiAgICBwcml2YXRlIHZpc2libGVDaG9pY2VzQ2FjaGU6IEFycmF5PEl0ZW1WYWx1ZT4gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBjb21tZW50VmFsdWU6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBjYWNoZWRWYWx1ZTogYW55O1xyXG4gICAgb3RoZXJJdGVtOiBJdGVtVmFsdWUgPSBuZXcgSXRlbVZhbHVlKFwib3RoZXJcIiwgc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcIm90aGVySXRlbVRleHRcIikpO1xyXG4gICAgcHJpdmF0ZSBjaG9pY2VzRnJvbVVybDogQXJyYXk8SXRlbVZhbHVlPiA9IG51bGw7XHJcbiAgICBwcml2YXRlIGNhY2hlZFZhbHVlRm9yVXJsUmVxdWVzdGlvbjogYW55ID0gbnVsbDtcclxuICAgIHByaXZhdGUgY2hvaWNlc1ZhbHVlczogQXJyYXk8SXRlbVZhbHVlPiA9IG5ldyBBcnJheTxJdGVtVmFsdWU+KCk7XHJcbiAgICBwdWJsaWMgY2hvaWNlc0J5VXJsOiBDaG9pY2VzUmVzdGZ1bGw7XHJcbiAgICBwdWJsaWMgb3RoZXJFcnJvclRleHQ6IHN0cmluZyA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RvcmVPdGhlcnNBc0NvbW1lbnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgY2hvaWNlc09yZGVyVmFsdWU6IHN0cmluZyA9IFwibm9uZVwiO1xyXG4gICAgY2hvaWNlc0NoYW5nZWRDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuY2hvaWNlc0J5VXJsID0gdGhpcy5jcmVhdGVSZXN0ZnVsbCgpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmNob2ljZXNCeVVybC5nZXRSZXN1bHRDYWxsYmFjayA9IGZ1bmN0aW9uIChpdGVtczogQXJyYXk8SXRlbVZhbHVlPikgeyBzZWxmLm9uTG9hZENob2ljZXNGcm9tVXJsKGl0ZW1zKSB9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc090aGVyU2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RvcmVPdGhlcnNBc0NvbW1lbnQoKSA/IHRoaXMuZ2V0SGFzT3RoZXIodGhpcy52YWx1ZSkgOiB0aGlzLmdldEhhc090aGVyKHRoaXMuY2FjaGVkVmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldEhhc090aGVyKHZhbDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHZhbCA9PSB0aGlzLm90aGVySXRlbS52YWx1ZTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVSZXN0ZnVsbCgpOiBDaG9pY2VzUmVzdGZ1bGwgeyByZXR1cm4gbmV3IENob2ljZXNSZXN0ZnVsbCgpOyB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29tbWVudCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLmdldFN0b3JlT3RoZXJzQXNDb21tZW50KCkpIHJldHVybiBzdXBlci5nZXRDb21tZW50KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbWVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc1NldHRpbmdDb21tZW50OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgc2V0Q29tbWVudChuZXdWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0U3RvcmVPdGhlcnNBc0NvbW1lbnQoKSlcclxuICAgICAgICAgICAgc3VwZXIuc2V0Q29tbWVudChuZXdWYWx1ZSk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1NldHRpbmdDb21tZW50ICYmIG5ld1ZhbHVlICE9IHRoaXMuY29tbWVudFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2V0dGluZ0NvbW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tZW50VmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3RoZXJTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TmV3VmFsdWVJbkRhdGEodGhpcy5jYWNoZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2V0dGluZ0NvbW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzZXROZXdWYWx1ZShuZXdWYWx1ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB0aGlzLmNhY2hlZFZhbHVlRm9yVXJsUmVxdWVzdGlvbiA9IG5ld1ZhbHVlOyAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuc2V0TmV3VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHZhbHVlRnJvbURhdGEodmFsOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLmdldFN0b3JlT3RoZXJzQXNDb21tZW50KCkpIHJldHVybiBzdXBlci52YWx1ZUZyb21EYXRhKHZhbCk7XHJcbiAgICAgICAgdGhpcy5jYWNoZWRWYWx1ZSA9IHRoaXMudmFsdWVGcm9tRGF0YUNvcmUodmFsKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZWRWYWx1ZTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCB2YWx1ZVRvRGF0YSh2YWw6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0U3RvcmVPdGhlcnNBc0NvbW1lbnQoKSkgcmV0dXJuIHN1cGVyLnZhbHVlVG9EYXRhKHZhbCk7XHJcbiAgICAgICAgdGhpcy5jYWNoZWRWYWx1ZSA9IHZhbDtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVRvRGF0YUNvcmUodmFsKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCB2YWx1ZUZyb21EYXRhQ29yZSh2YWw6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc1Vua25vd25WYWx1ZSh2YWwpKSByZXR1cm4gdmFsO1xyXG4gICAgICAgIGlmICh2YWwgPT0gdGhpcy5vdGhlckl0ZW0udmFsdWUpIHJldHVybiB2YWw7XHJcbiAgICAgICAgdGhpcy5jb21tZW50ID0gdmFsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm90aGVySXRlbS52YWx1ZTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCB2YWx1ZVRvRGF0YUNvcmUodmFsOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmICh2YWwgPT0gdGhpcy5vdGhlckl0ZW0udmFsdWUgJiYgdGhpcy5nZXRDb21tZW50KCkpIHtcclxuICAgICAgICAgICAgdmFsID0gdGhpcy5nZXRDb21tZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgaGFzVW5rbm93blZhbHVlKHZhbDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF2YWwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgaXRlbXMgPSB0aGlzLmFjdGl2ZUNob2ljZXM7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaXRlbXNbaV0udmFsdWUgPT0gdmFsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IGNob2ljZXMoKTogQXJyYXk8YW55PiB7IHJldHVybiB0aGlzLmNob2ljZXNWYWx1ZXM7IH1cclxuICAgIHNldCBjaG9pY2VzKG5ld1ZhbHVlOiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgSXRlbVZhbHVlLnNldERhdGEodGhpcy5jaG9pY2VzVmFsdWVzLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgdGhpcy5vblZpc2libGVDaG9pY2VzQ2hhbmdlZCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGhhc090aGVyQ2hhbmdlZCgpIHtcclxuICAgICAgICB0aGlzLm9uVmlzaWJsZUNob2ljZXNDaGFuZ2VkKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgY2hvaWNlc09yZGVyKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmNob2ljZXNPcmRlclZhbHVlOyB9XHJcbiAgICBzZXQgY2hvaWNlc09yZGVyKG5ld1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPT0gdGhpcy5jaG9pY2VzT3JkZXJWYWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY2hvaWNlc09yZGVyVmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLm9uVmlzaWJsZUNob2ljZXNDaGFuZ2VkKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgb3RoZXJUZXh0KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm90aGVySXRlbS50ZXh0OyB9XHJcbiAgICBzZXQgb3RoZXJUZXh0KHZhbHVlOiBzdHJpbmcpIHsgdGhpcy5vdGhlckl0ZW0udGV4dCA9IHZhbHVlOyB9XHJcbiAgICBnZXQgdmlzaWJsZUNob2ljZXMoKTogQXJyYXk8SXRlbVZhbHVlPiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc090aGVyICYmIHRoaXMuY2hvaWNlc09yZGVyID09IFwibm9uZVwiKSByZXR1cm4gdGhpcy5hY3RpdmVDaG9pY2VzO1xyXG4gICAgICAgIGlmKCF0aGlzLnZpc2libGVDaG9pY2VzQ2FjaGUpIHtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlQ2hvaWNlc0NhY2hlID0gdGhpcy5zb3J0VmlzaWJsZUNob2ljZXModGhpcy5hY3RpdmVDaG9pY2VzLnNsaWNlKCkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNPdGhlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlQ2hvaWNlc0NhY2hlLnB1c2godGhpcy5vdGhlckl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVDaG9pY2VzQ2FjaGU7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldCBhY3RpdmVDaG9pY2VzKCk6IEFycmF5PEl0ZW1WYWx1ZT4geyByZXR1cm4gdGhpcy5jaG9pY2VzRnJvbVVybCA/IHRoaXMuY2hvaWNlc0Zyb21VcmwgOiB0aGlzLmNob2ljZXM7IH1cclxuICAgIHB1YmxpYyBzdXBwb3J0Q29tbWVudCgpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cclxuICAgIHB1YmxpYyBzdXBwb3J0T3RoZXIoKTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XHJcbiAgICBwcm90ZWN0ZWQgb25DaGVja0ZvckVycm9ycyhlcnJvcnM6IEFycmF5PFN1cnZleUVycm9yPikge1xyXG4gICAgICAgIHN1cGVyLm9uQ2hlY2tGb3JFcnJvcnMoZXJyb3JzKTtcclxuICAgICAgICBpZiAoIXRoaXMuaXNPdGhlclNlbGVjdGVkIHx8IHRoaXMuY29tbWVudCkgcmV0dXJuO1xyXG4gICAgICAgIHZhciB0ZXh0ID0gdGhpcy5vdGhlckVycm9yVGV4dDtcclxuICAgICAgICBpZiAoIXRleHQpIHtcclxuICAgICAgICAgICAgdGV4dCA9IHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJvdGhlclJlcXVpcmVkRXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVycm9ycy5wdXNoKG5ldyBDdXN0b21FcnJvcih0ZXh0KSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0U3RvcmVPdGhlcnNBc0NvbW1lbnQoKSB7IHJldHVybiB0aGlzLnN0b3JlT3RoZXJzQXNDb21tZW50ICYmICh0aGlzLnN1cnZleSAhPSBudWxsID8gdGhpcy5zdXJ2ZXkuc3RvcmVPdGhlcnNBc0NvbW1lbnQgOiB0cnVlKTsgfVxyXG4gICAgb25TdXJ2ZXlMb2FkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNob2ljZXNCeVVybCkgdGhpcy5jaG9pY2VzQnlVcmwucnVuKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uTG9hZENob2ljZXNGcm9tVXJsKGFycmF5OiBBcnJheTxJdGVtVmFsdWU+KSB7XHJcbiAgICAgICAgdmFyIGVycm9yQ291bnQgPSB0aGlzLmVycm9ycy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5jaG9pY2VzQnlVcmwgJiYgdGhpcy5jaG9pY2VzQnlVcmwuZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcnMucHVzaCh0aGlzLmNob2ljZXNCeVVybC5lcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlcnJvckNvdW50ID4gMCB8fCB0aGlzLmVycm9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMuZXJyb3JzQ2hhbmdlZENhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld0Nob2ljZXMgPSBudWxsO1xyXG4gICAgICAgIGlmIChhcnJheSAmJiBhcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG5ld0Nob2ljZXMgPSBuZXcgQXJyYXk8SXRlbVZhbHVlPigpO1xyXG4gICAgICAgICAgICBJdGVtVmFsdWUuc2V0RGF0YShuZXdDaG9pY2VzLCBhcnJheSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hvaWNlc0Zyb21VcmwgPSBuZXdDaG9pY2VzO1xyXG4gICAgICAgIHRoaXMub25WaXNpYmxlQ2hvaWNlc0NoYW5nZWQoKTtcclxuICAgICAgICBpZiAodGhpcy5jYWNoZWRWYWx1ZUZvclVybFJlcXVlc3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuY2FjaGVkVmFsdWVGb3JVcmxSZXF1ZXN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgb25WaXNpYmxlQ2hvaWNlc0NoYW5nZWQoKSB7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlQ2hvaWNlc0NhY2hlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmNob2ljZXNDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzb3J0VmlzaWJsZUNob2ljZXMoYXJyYXk6IEFycmF5PEl0ZW1WYWx1ZT4pOiBBcnJheTxJdGVtVmFsdWU+IHtcclxuICAgICAgICB2YXIgb3JkZXIgPSB0aGlzLmNob2ljZXNPcmRlci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmIChvcmRlciA9PSBcImFzY1wiKSByZXR1cm4gdGhpcy5zb3J0QXJyYXkoYXJyYXksIDEpO1xyXG4gICAgICAgIGlmIChvcmRlciA9PSBcImRlc2NcIikgcmV0dXJuIHRoaXMuc29ydEFycmF5KGFycmF5LCAtMSk7XHJcbiAgICAgICAgaWYgKG9yZGVyID09IFwicmFuZG9tXCIpIHJldHVybiB0aGlzLnJhbmRvbWl6ZUFycmF5KGFycmF5KTtcclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNvcnRBcnJheShhcnJheTogQXJyYXk8SXRlbVZhbHVlPiwgbXVsdDogbnVtYmVyKTogQXJyYXk8SXRlbVZhbHVlPiB7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgaWYgKGEudGV4dCA8IGIudGV4dCkgcmV0dXJuIC0xICogbXVsdDtcclxuICAgICAgICAgICAgaWYgKGEudGV4dCA+IGIudGV4dCkgcmV0dXJuIDEgKiBtdWx0O1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcmFuZG9taXplQXJyYXkoYXJyYXk6IEFycmF5PEl0ZW1WYWx1ZT4pOiBBcnJheTxJdGVtVmFsdWU+IHtcclxuICAgICAgICBmb3IgKHZhciBpID0gYXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgICAgICB2YXIgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG4gICAgICAgICAgICB2YXIgdGVtcCA9IGFycmF5W2ldO1xyXG4gICAgICAgICAgICBhcnJheVtpXSA9IGFycmF5W2pdO1xyXG4gICAgICAgICAgICBhcnJheVtqXSA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ2hlY2tib3hCYXNlIGV4dGVuZHMgUXVlc3Rpb25TZWxlY3RCYXNlIHtcclxuICAgIHByaXZhdGUgY29sQ291bnRWYWx1ZTogbnVtYmVyID0gMTtcclxuICAgIGNvbENvdW50Q2hhbmdlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBjb2xDb3VudCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5jb2xDb3VudFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGNvbENvdW50KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gNCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY29sQ291bnRWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMuY29sQ291bnRDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG59XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJzZWxlY3RiYXNlXCIsIFtcImhhc0NvbW1lbnQ6Ym9vbGVhblwiLCBcImhhc090aGVyOmJvb2xlYW5cIixcclxuICAgIHsgbmFtZTogXCJjaG9pY2VzOml0ZW12YWx1ZXNcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBJdGVtVmFsdWUuZ2V0RGF0YShvYmouY2hvaWNlcyk7IH0sIG9uU2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSwgdmFsdWU6IGFueSkgeyBvYmouY2hvaWNlcyA9IHZhbHVlOyB9fSxcclxuICAgIHsgbmFtZTogXCJjaG9pY2VzT3JkZXJcIiwgZGVmYXVsdDogXCJub25lXCIsIGNob2ljZXM6IFtcIm5vbmVcIiwgXCJhc2NcIiwgXCJkZXNjXCIsIFwicmFuZG9tXCJdIH0sXHJcbiAgICB7IG5hbWU6IFwiY2hvaWNlc0J5VXJsOnJlc3RmdWxsXCIsIGNsYXNzTmFtZTogXCJDaG9pY2VzUmVzdGZ1bGxcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmouY2hvaWNlc0J5VXJsLmlzRW1wdHkgPyBudWxsIDogb2JqLmNob2ljZXNCeVVybDsgfSwgb25TZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55LCB2YWx1ZTogYW55KSB7IG9iai5jaG9pY2VzQnlVcmwuc2V0RGF0YSh2YWx1ZSk7IH0gfSxcclxuICAgIHsgbmFtZTogXCJvdGhlclRleHRcIiwgZGVmYXVsdDogc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcIm90aGVySXRlbVRleHRcIikgfSwgXCJvdGhlckVycm9yVGV4dFwiLFxyXG4gICAgeyBuYW1lOiBcInN0b3JlT3RoZXJzQXNDb21tZW50OmJvb2xlYW5cIiwgZGVmYXVsdDogdHJ1ZX1dLCBudWxsLCBcInF1ZXN0aW9uXCIpO1xyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcImNoZWNrYm94YmFzZVwiLCBbeyBuYW1lOiBcImNvbENvdW50Om51bWJlclwiLCBkZWZhdWx0OiAxLCBjaG9pY2VzOiBbMCwgMSwgMiwgMywgNF0gfV0sIG51bGwsIFwic2VsZWN0YmFzZVwiKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbl9iYXNlc2VsZWN0LnRzXG4gKiovIiwiaW1wb3J0IHtRdWVzdGlvbkJhc2V9IGZyb20gJy4vcXVlc3Rpb25iYXNlJztcclxuaW1wb3J0IHtIYXNoVGFibGV9IGZyb20gXCIuL2Jhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkZhY3Rvcnkge1xyXG4gICAgcHVibGljIHN0YXRpYyBJbnN0YW5jZTogUXVlc3Rpb25GYWN0b3J5ID0gbmV3IFF1ZXN0aW9uRmFjdG9yeSgpO1xyXG4gICAgcHVibGljIHN0YXRpYyBEZWZhdWx0Q2hvaWNlcyA9IFtcIm9uZVwiLCBcInR3b3xzZWNvbmQgdmFsdWVcIiwgXCJ0aHJlZXx0aGlyZCB2YWx1ZVwiXTtcclxuICAgIHByaXZhdGUgY3JlYXRvckhhc2g6IEhhc2hUYWJsZTwobmFtZTogc3RyaW5nKSA9PiBRdWVzdGlvbkJhc2U+ID0ge307XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyUXVlc3Rpb24ocXVlc3Rpb25UeXBlOiBzdHJpbmcsIHF1ZXN0aW9uQ3JlYXRvcjogKG5hbWU6IHN0cmluZykgPT4gUXVlc3Rpb25CYXNlKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdG9ySGFzaFtxdWVzdGlvblR5cGVdID0gcXVlc3Rpb25DcmVhdG9yO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEFsbFR5cGVzKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMuY3JlYXRvckhhc2gpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zb3J0KCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY3JlYXRlUXVlc3Rpb24ocXVlc3Rpb25UeXBlOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IFF1ZXN0aW9uQmFzZSB7XHJcbiAgICAgICAgdmFyIGNyZWF0b3IgPSB0aGlzLmNyZWF0b3JIYXNoW3F1ZXN0aW9uVHlwZV07XHJcbiAgICAgICAgaWYgKGNyZWF0b3IgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0b3IobmFtZSk7XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbmZhY3RvcnkudHNcbiAqKi8iLCJpbXBvcnQge1F1ZXN0aW9uTWF0cml4RHJvcGRvd25Nb2RlbEJhc2UsXHJcbiAgICBNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZSxcclxuICAgIElNYXRyaXhEcm9wZG93bkRhdGFcclxufSBmcm9tIFwiLi9xdWVzdGlvbl9tYXRyaXhkcm9wZG93bmJhc2VcIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7SXRlbVZhbHVlfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRyaXhEcm9wZG93blJvd01vZGVsIGV4dGVuZHMgTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IGFueSwgcHVibGljIHRleHQ6IHN0cmluZywgZGF0YTogSU1hdHJpeERyb3Bkb3duRGF0YSwgdmFsdWU6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKGRhdGEsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcm93TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZTsgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWwgZXh0ZW5kcyBRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWxCYXNlIGltcGxlbWVudHMgSU1hdHJpeERyb3Bkb3duRGF0YSB7XHJcbiAgICBwcml2YXRlIHJvd3NWYWx1ZTogSXRlbVZhbHVlW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIm1hdHJpeGRyb3Bkb3duXCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHJvd3MoKTogQXJyYXk8YW55PiB7IHJldHVybiB0aGlzLnJvd3NWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCByb3dzKG5ld1ZhbHVlOiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgSXRlbVZhbHVlLnNldERhdGEodGhpcy5yb3dzVmFsdWUsIG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZW5lcmF0ZVJvd3MoKTogQXJyYXk8TWF0cml4RHJvcGRvd25Sb3dNb2RlbD4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXk8TWF0cml4RHJvcGRvd25Sb3dNb2RlbD4oKTtcclxuICAgICAgICBpZiAoIXRoaXMucm93cyB8fCB0aGlzLnJvd3MubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIGlmICghdmFsKSB2YWwgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucm93c1tpXS52YWx1ZSkgY29udGludWU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuY3JlYXRlTWF0cml4Um93KHRoaXMucm93c1tpXS52YWx1ZSwgdGhpcy5yb3dzW2ldLnRleHQsIHZhbFt0aGlzLnJvd3NbaV0udmFsdWVdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlTWF0cml4Um93KG5hbWU6IGFueSwgdGV4dDogc3RyaW5nLCB2YWx1ZTogYW55KTogTWF0cml4RHJvcGRvd25Sb3dNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXhEcm9wZG93blJvd01vZGVsKG5hbWUsIHRleHQsIHRoaXMsIHZhbHVlKTtcclxuICAgIH1cclxufVxyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcIm1hdHJpeGRyb3Bkb3duXCIsIFt7IG5hbWU6IFwicm93czppdGVtdmFsdWVzXCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gSXRlbVZhbHVlLmdldERhdGEob2JqLnJvd3MpOyB9LCBvblNldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnksIHZhbHVlOiBhbnkpIHsgb2JqLnJvd3MgPSB2YWx1ZTsgfX1dLFxyXG4gICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uTWF0cml4RHJvcGRvd25Nb2RlbChcIlwiKTsgfSwgXCJtYXRyaXhkcm9wZG93bmJhc2VcIik7XHJcblxyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcIm1hdHJpeGRyb3Bkb3duXCIsIChuYW1lKSA9PiB7IHZhciBxID0gbmV3IFF1ZXN0aW9uTWF0cml4RHJvcGRvd25Nb2RlbChuYW1lKTsgcS5jaG9pY2VzID0gWzEsIDIsIDMsIDQsIDVdOyBxLnJvd3MgPSBbXCJSb3cgMVwiLCBcIlJvdyAyXCJdOyBxLmFkZENvbHVtbihcIkNvbHVtbiAxXCIpOyBxLmFkZENvbHVtbihcIkNvbHVtbiAyXCIpOyBxLmFkZENvbHVtbihcIkNvbHVtbiAzXCIpOyByZXR1cm4gcTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fbWF0cml4ZHJvcGRvd24udHNcbiAqKi8iLCJpbXBvcnQge1F1ZXN0aW9uTWF0cml4RHJvcGRvd25Nb2RlbEJhc2UsXHJcbiAgICBNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZSwgSU1hdHJpeERyb3Bkb3duRGF0YVxyXG59IGZyb20gXCIuL3F1ZXN0aW9uX21hdHJpeGRyb3Bkb3duYmFzZVwiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4vc3VydmV5U3RyaW5nc1wiO1xyXG5pbXBvcnQge1N1cnZleUVycm9yfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7Q3VzdG9tRXJyb3J9IGZyb20gXCIuL2Vycm9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWF0cml4RHluYW1pY1Jvd01vZGVsIGV4dGVuZHMgTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIGluZGV4OiBudW1iZXIsIGRhdGE6IElNYXRyaXhEcm9wZG93bkRhdGEsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihkYXRhLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHJvd05hbWUoKSB7IHJldHVybiBcInJvd1wiICsgdGhpcy5pbmRleDsgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25NYXRyaXhEeW5hbWljTW9kZWwgZXh0ZW5kcyBRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWxCYXNlIGltcGxlbWVudHMgSU1hdHJpeERyb3Bkb3duRGF0YSB7XHJcbiAgICBzdGF0aWMgTWF4Um93Q291bnQgPSAxMDA7XHJcbiAgICBwcml2YXRlIHJvd0NvdW50ZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSByb3dDb3VudFZhbHVlOiBudW1iZXIgPSAyO1xyXG4gICAgcHJpdmF0ZSBhZGRSb3dUZXh0VmFsdWU6IHN0cmluZyA9IG51bGw7XHJcbiAgICBwcml2YXRlIHJlbW92ZVJvd1RleHRWYWx1ZTogc3RyaW5nID0gbnVsbDtcclxuICAgIHB1YmxpYyBtaW5Sb3dDb3VudCA9IDA7XHJcbiAgICBwdWJsaWMgcm93Q291bnRDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIm1hdHJpeGR5bmFtaWNcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcm93Q291bnQoKSB7IHJldHVybiB0aGlzLnJvd0NvdW50VmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgcm93Q291bnQodmFsOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodmFsIDwgMCB8fCB2YWwgPiBRdWVzdGlvbk1hdHJpeER5bmFtaWNNb2RlbC5NYXhSb3dDb3VudCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucm93Q291bnRWYWx1ZSA9IHZhbDtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCA+IHZhbCkge1xyXG4gICAgICAgICAgICB2YXIgcVZhbCA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgICAgIHFWYWwuc3BsaWNlKHZhbCk7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBxVmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLnJvd0NvdW50Q2hhbmdlZENhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGRSb3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cy5wdXNoKHRoaXMuY3JlYXRlTWF0cml4Um93KG51bGwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb3dDb3VudCsrO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZVJvdyhpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLnJvd0NvdW50KSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MgJiYgaW5kZXggPCB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWwgPSB0aGlzLmNyZWF0ZU5ld1ZhbHVlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICB2YWwuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgdmFsID0gdGhpcy5kZWxldGVSb3dWYWx1ZSh2YWwsIG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvd0NvdW50LS07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGFkZFJvd1RleHQoKSB7IHJldHVybiB0aGlzLmFkZFJvd1RleHRWYWx1ZSA/IHRoaXMuYWRkUm93VGV4dFZhbHVlIDogc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcImFkZFJvd1wiKTsgfVxyXG4gICAgcHVibGljIHNldCBhZGRSb3dUZXh0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmFkZFJvd1RleHRWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCByZW1vdmVSb3dUZXh0KCkgeyByZXR1cm4gdGhpcy5yZW1vdmVSb3dUZXh0VmFsdWUgPyB0aGlzLnJlbW92ZVJvd1RleHRWYWx1ZSA6IHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJyZW1vdmVSb3dcIik7IH1cclxuICAgIHB1YmxpYyBzZXQgcmVtb3ZlUm93VGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVSb3dUZXh0VmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdXBwb3J0R29OZXh0UGFnZUF1dG9tYXRpYygpIHsgICByZXR1cm4gZmFsc2U7ICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNhY2hlZFZpc2libGVSb3dzKCk6IEFycmF5PE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlPiB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MgJiYgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cy5sZW5ndGggPT0gdGhpcy5yb3dDb3VudCkgcmV0dXJuIHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3M7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZVJvd3M7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25DaGVja0ZvckVycm9ycyhlcnJvcnM6IEFycmF5PFN1cnZleUVycm9yPikge1xyXG4gICAgICAgIHN1cGVyLm9uQ2hlY2tGb3JFcnJvcnMoZXJyb3JzKTtcclxuICAgICAgICBpZiAodGhpcy5oYXNFcnJvckluUm93cygpKSB7XHJcbiAgICAgICAgICAgIGVycm9ycy5wdXNoKG5ldyBDdXN0b21FcnJvcihzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwibWluUm93Q291bnRFcnJvclwiKVtcImZvcm1hdFwiXSh0aGlzLm1pblJvd0NvdW50KSkpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgaGFzRXJyb3JJblJvd3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMubWluUm93Q291bnQgPD0gMCB8fCAhdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciByZXMgPSBmYWxzZTtcclxuICAgICAgICB2YXIgc2V0Um93Q291bnQgPSAwO1xyXG4gICAgICAgIGZvciAodmFyIHJvd0luZGV4ID0gMDsgcm93SW5kZXggPCB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzLmxlbmd0aDsgcm93SW5kZXgrKykge1xyXG4gICAgICAgICAgICB2YXIgcm93ID0gdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93c1tyb3dJbmRleF07XHJcbiAgICAgICAgICAgIGlmICghcm93LmlzRW1wdHkpIHNldFJvd0NvdW50Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBzZXRSb3dDb3VudCA8IHRoaXMubWluUm93Q291bnQ7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2VuZXJhdGVSb3dzKCk6IEFycmF5PE1hdHJpeER5bmFtaWNSb3dNb2RlbD4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXk8TWF0cml4RHluYW1pY1Jvd01vZGVsPigpO1xyXG4gICAgICAgIGlmICh0aGlzLnJvd0NvdW50ID09PSAwKSByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLmNyZWF0ZU5ld1ZhbHVlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5yb3dDb3VudDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuY3JlYXRlTWF0cml4Um93KHRoaXMuZ2V0Um93VmFsdWVCeUluZGV4KHZhbCwgaSkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVNYXRyaXhSb3codmFsdWU6IGFueSk6IE1hdHJpeER5bmFtaWNSb3dNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXhEeW5hbWljUm93TW9kZWwodGhpcy5yb3dDb3VudGVyICsrLCB0aGlzLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25CZWZvcmVWYWx1ZUNoYW5nZWQodmFsOiBhbnkpIHtcclxuICAgICAgICB2YXIgbmV3Um93Q291bnQgPSB2YWwgJiYgQXJyYXkuaXNBcnJheSh2YWwpID8gdmFsLmxlbmd0aCA6IDA7XHJcbiAgICAgICAgaWYgKG5ld1Jvd0NvdW50IDw9IHRoaXMucm93Q291bnQpIHJldHVybjtcclxuICAgICAgICB0aGlzLnJvd0NvdW50VmFsdWUgPSBuZXdSb3dDb3VudDtcclxuICAgICAgICBpZiAodGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cykge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzID0gdGhpcy52aXNpYmxlUm93cztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlTmV3VmFsdWUoY3VyVmFsdWU6IGFueSk6IGFueSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IGN1clZhbHVlO1xyXG4gICAgICAgIGlmICghcmVzdWx0KSByZXN1bHQgPSBbXTtcclxuICAgICAgICB2YXIgciA9IFtdO1xyXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID4gdGhpcy5yb3dDb3VudCkgcmVzdWx0LnNwbGljZSh0aGlzLnJvd0NvdW50IC0gMSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IHJlc3VsdC5sZW5ndGg7IGkgPCB0aGlzLnJvd0NvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goe30pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGRlbGV0ZVJvd1ZhbHVlKG5ld1ZhbHVlOiBhbnksIHJvdzogTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UpOiBhbnkge1xyXG4gICAgICAgIHZhciBpc0VtcHR5ID0gdHJ1ZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5ld1ZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChPYmplY3Qua2V5cyhuZXdWYWx1ZVtpXSkubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICAgICAgaXNFbXB0eSA9IGZhbHNlO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGlzRW1wdHkgPyBudWxsIDogbmV3VmFsdWU7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBnZXRSb3dWYWx1ZUJ5SW5kZXgocXVlc3Rpb25WYWx1ZTogYW55LCBpbmRleDogbnVtYmVyKTogYW55IHtcclxuICAgICAgICByZXR1cm4gaW5kZXggPj0gMCAmJiBpbmRleCA8IHF1ZXN0aW9uVmFsdWUubGVuZ3RoID8gcXVlc3Rpb25WYWx1ZVtpbmRleF0gOiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldFJvd1ZhbHVlKHJvdzogTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UsIHF1ZXN0aW9uVmFsdWU6IGFueSwgY3JlYXRlOiBib29sZWFuID0gZmFsc2UpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFJvd1ZhbHVlQnlJbmRleChxdWVzdGlvblZhbHVlLCB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzLmluZGV4T2Yocm93KSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJtYXRyaXhkeW5hbWljXCIsIFt7IG5hbWU6IFwicm93Q291bnQ6bnVtYmVyXCIsIGRlZmF1bHQ6IDIgfSwgeyBuYW1lOiBcIm1pblJvd0NvdW50Om51bWJlclwiLCBkZWZhdWx0OiAwIH0sXHJcbiAgICAgICAgeyBuYW1lOiBcImFkZFJvd1RleHRcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmouYWRkUm93VGV4dFZhbHVlOyB9IH0sXHJcbiAgICAgICAgeyBuYW1lOiBcInJlbW92ZVJvd1RleHRcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmoucmVtb3ZlUm93VGV4dFZhbHVlOyB9IH1dLFxyXG4gICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uTWF0cml4RHluYW1pY01vZGVsKFwiXCIpOyB9LCBcIm1hdHJpeGRyb3Bkb3duYmFzZVwiKTtcclxuXHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwibWF0cml4ZHluYW1pY1wiLCAobmFtZSkgPT4geyB2YXIgcSA9IG5ldyBRdWVzdGlvbk1hdHJpeER5bmFtaWNNb2RlbChuYW1lKTsgcS5jaG9pY2VzID0gWzEsIDIsIDMsIDQsIDVdOyBxLmFkZENvbHVtbihcIkNvbHVtbiAxXCIpOyBxLmFkZENvbHVtbihcIkNvbHVtbiAyXCIpOyBxLmFkZENvbHVtbihcIkNvbHVtbiAzXCIpOyByZXR1cm4gcTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fbWF0cml4ZHluYW1pYy50c1xuICoqLyIsImltcG9ydCB7QmFzZSwgSXRlbVZhbHVlfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1N1cnZleUVycm9yfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tICcuL3N1cnZleVN0cmluZ3MnO1xyXG5pbXBvcnQge0N1c3RvbUVycm9yfSBmcm9tIFwiLi9lcnJvclwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNYXRyaXhEYXRhIHtcclxuICAgIG9uTWF0cml4Um93Q2hhbmdlZChyb3c6IE1hdHJpeFJvd01vZGVsKTtcclxufVxyXG5leHBvcnQgY2xhc3MgTWF0cml4Um93TW9kZWwgZXh0ZW5kcyBCYXNlIHtcclxuICAgIHByaXZhdGUgZGF0YTogSU1hdHJpeERhdGE7XHJcbiAgICBwcm90ZWN0ZWQgcm93VmFsdWU6IGFueTsgXHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IGFueSwgcHVibGljIHRleHQ6IHN0cmluZywgcHVibGljIGZ1bGxOYW1lOiBzdHJpbmcsIGRhdGE6IElNYXRyaXhEYXRhLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMucm93VmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLnJvd1ZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnJvd1ZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YSkgdGhpcy5kYXRhLm9uTWF0cml4Um93Q2hhbmdlZCh0aGlzKTtcclxuICAgICAgICB0aGlzLm9uVmFsdWVDaGFuZ2VkKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25WYWx1ZUNoYW5nZWQoKSB7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTWF0cml4TW9kZWwgZXh0ZW5kcyBRdWVzdGlvbiBpbXBsZW1lbnRzIElNYXRyaXhEYXRhIHtcclxuICAgIHByaXZhdGUgY29sdW1uc1ZhbHVlOiBJdGVtVmFsdWVbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSByb3dzVmFsdWU6IEl0ZW1WYWx1ZVtdID0gW107XHJcbiAgICBwcml2YXRlIGlzUm93Q2hhbmdpbmcgPSBmYWxzZTtcclxuICAgIHByaXZhdGUgZ2VuZXJhdGVkVmlzaWJsZVJvd3M6IEFycmF5PE1hdHJpeFJvd01vZGVsPjtcclxuICAgIHB1YmxpYyBpc0FsbFJvd1JlcXVpcmVkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIm1hdHJpeFwiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBoYXNSb3dzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJvd3NWYWx1ZS5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG4gICAgZ2V0IGNvbHVtbnMoKTogQXJyYXk8YW55PiB7IHJldHVybiB0aGlzLmNvbHVtbnNWYWx1ZTsgfVxyXG4gICAgc2V0IGNvbHVtbnMobmV3VmFsdWU6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBJdGVtVmFsdWUuc2V0RGF0YSh0aGlzLmNvbHVtbnNWYWx1ZSwgbmV3VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHJvd3MoKTogQXJyYXk8YW55PiB7IHJldHVybiB0aGlzLnJvd3NWYWx1ZTsgfVxyXG4gICAgc2V0IHJvd3MobmV3VmFsdWU6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBJdGVtVmFsdWUuc2V0RGF0YSh0aGlzLnJvd3NWYWx1ZSwgbmV3VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCB2aXNpYmxlUm93cygpOiBBcnJheTxNYXRyaXhSb3dNb2RlbD4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXk8TWF0cml4Um93TW9kZWw+KCk7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgaWYgKCF2YWwpIHZhbCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5yb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5yb3dzW2ldLnZhbHVlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5jcmVhdGVNYXRyaXhSb3codGhpcy5yb3dzW2ldLnZhbHVlLCB0aGlzLnJvd3NbaV0udGV4dCwgdGhpcy5uYW1lICsgJ18nICsgdGhpcy5yb3dzW2ldLnZhbHVlLnRvU3RyaW5nKCksIHZhbFt0aGlzLnJvd3NbaV0udmFsdWVdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChyZXN1bHQubGVuZ3RoID09IDApIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5jcmVhdGVNYXRyaXhSb3cobnVsbCwgXCJcIiwgdGhpcy5uYW1lLCB2YWwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cyA9IHJlc3VsdDtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydEdvTmV4dFBhZ2VBdXRvbWF0aWMoKSB7IHJldHVybiB0aGlzLmhhc1ZhbHVlc0luQWxsUm93cygpOyB9XHJcbiAgICBwcm90ZWN0ZWQgb25DaGVja0ZvckVycm9ycyhlcnJvcnM6IEFycmF5PFN1cnZleUVycm9yPikge1xyXG4gICAgICAgIHN1cGVyLm9uQ2hlY2tGb3JFcnJvcnMoZXJyb3JzKTtcclxuICAgICAgICBpZiAodGhpcy5oYXNFcnJvckluUm93cygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzLnB1c2gobmV3IEN1c3RvbUVycm9yKHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJyZXF1aXJlZEluQWxsUm93c0Vycm9yXCIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBoYXNFcnJvckluUm93cygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNBbGxSb3dSZXF1aXJlZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiAhdGhpcy5oYXNWYWx1ZXNJbkFsbFJvd3MoKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaGFzVmFsdWVzSW5BbGxSb3dzKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciByb3dzID0gdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cztcclxuICAgICAgICBpZiAoIXJvd3MpIHJvd3MgPSB0aGlzLnZpc2libGVSb3dzO1xyXG4gICAgICAgIGlmICghcm93cykgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWwgPSByb3dzW2ldLnZhbHVlO1xyXG4gICAgICAgICAgICBpZiAoIXZhbCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVNYXRyaXhSb3cobmFtZTogYW55LCB0ZXh0OiBzdHJpbmcsIGZ1bGxOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBNYXRyaXhSb3dNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXhSb3dNb2RlbChuYW1lLCB0ZXh0LCBmdWxsTmFtZSwgdGhpcywgdmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uVmFsdWVDaGFuZ2VkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzUm93Q2hhbmdpbmcgfHwgISh0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzKSB8fCB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzLmxlbmd0aCA9PSAwKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc1Jvd0NoYW5naW5nID0gdHJ1ZTtcclxuICAgICAgICB2YXIgdmFsID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBpZiAoIXZhbCkgdmFsID0ge307XHJcbiAgICAgICAgaWYgKHRoaXMucm93cy5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzWzBdLnZhbHVlID0gdmFsO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHJvdyA9IHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3NbaV07XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93VmFsID0gdmFsW3Jvdy5uYW1lXSA/IHZhbFtyb3cubmFtZV0gOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93c1tpXS52YWx1ZSA9IHJvd1ZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzUm93Q2hhbmdpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vSU1hdHJpeERhdGFcclxuICAgIG9uTWF0cml4Um93Q2hhbmdlZChyb3c6IE1hdHJpeFJvd01vZGVsKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSb3dDaGFuZ2luZykgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNSb3dDaGFuZ2luZyA9IHRydWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc1Jvd3MpIHtcclxuICAgICAgICAgICAgdGhpcy5zZXROZXdWYWx1ZShyb3cudmFsdWUpO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhciBuZXdWYWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgICAgIGlmICghbmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlID0ge307XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgbmV3VmFsdWVbcm93Lm5hbWVdID0gcm93LnZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnNldE5ld1ZhbHVlKG5ld1ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5pc1Jvd0NoYW5naW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJtYXRyaXhcIiwgW3sgbmFtZTogXCJjb2x1bW5zOml0ZW12YWx1ZXNcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBJdGVtVmFsdWUuZ2V0RGF0YShvYmouY29sdW1ucyk7IH0sIG9uU2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSwgdmFsdWU6IGFueSkgeyBvYmouY29sdW1ucyA9IHZhbHVlOyB9fSxcclxuICAgIHsgbmFtZTogXCJyb3dzOml0ZW12YWx1ZXNcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBJdGVtVmFsdWUuZ2V0RGF0YShvYmoucm93cyk7IH0sIG9uU2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSwgdmFsdWU6IGFueSkgeyBvYmoucm93cyA9IHZhbHVlOyB9IH0sXHJcbiAgICBcImlzQWxsUm93UmVxdWlyZWQ6Ym9vbGVhblwiXSwgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbk1hdHJpeE1vZGVsKFwiXCIpOyB9LCBcInF1ZXN0aW9uXCIpO1xyXG5cclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJtYXRyaXhcIiwgKG5hbWUpID0+IHsgdmFyIHEgPSBuZXcgUXVlc3Rpb25NYXRyaXhNb2RlbChuYW1lKTsgcS5yb3dzID0gW1wiUm93IDFcIiwgXCJSb3cgMlwiXTsgcS5jb2x1bW5zID0gW1wiQ29sdW1uIDFcIiwgXCJDb2x1bW4gMlwiLCBcIkNvbHVtbiAzXCJdOyByZXR1cm4gcTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fbWF0cml4LnRzXG4gKiovIiwiaW1wb3J0IHtCYXNlfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7U3VydmV5VmFsaWRhdG9yLCBJVmFsaWRhdG9yT3duZXIsIFZhbGlkYXRvclJ1bm5lcn0gZnJvbSBcIi4vdmFsaWRhdG9yXCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcbmltcG9ydCB7U3VydmV5RXJyb3J9IGZyb20gXCIuL2Jhc2VcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU11bHRpcGxlVGV4dERhdGEge1xyXG4gICAgZ2V0TXVsdGlwbGVUZXh0VmFsdWUobmFtZTogc3RyaW5nKTogYW55O1xyXG4gICAgc2V0TXVsdGlwbGVUZXh0VmFsdWUobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE11bHRpcGxlVGV4dEl0ZW1Nb2RlbCBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBJVmFsaWRhdG9yT3duZXIge1xyXG4gICAgcHJpdmF0ZSBkYXRhOiBJTXVsdGlwbGVUZXh0RGF0YTtcclxuICAgIHByaXZhdGUgdGl0bGVWYWx1ZTogc3RyaW5nO1xyXG4gICAgdmFsaWRhdG9yczogQXJyYXk8U3VydmV5VmFsaWRhdG9yPiA9IG5ldyBBcnJheTxTdXJ2ZXlWYWxpZGF0b3I+KCk7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IGFueSA9IG51bGwsIHRpdGxlOiBzdHJpbmcgPSBudWxsKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnRpdGxlID0gdGl0bGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIm11bHRpcGxldGV4dGl0ZW1cIjtcclxuICAgIH1cclxuICAgIHNldERhdGEoZGF0YTogSU11bHRpcGxlVGV4dERhdGEpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCB0aXRsZSgpIHsgcmV0dXJuIHRoaXMudGl0bGVWYWx1ZSA/IHRoaXMudGl0bGVWYWx1ZSA6IHRoaXMubmFtZTsgfVxyXG4gICAgcHVibGljIHNldCB0aXRsZShuZXdUZXh0OiBzdHJpbmcpIHsgdGhpcy50aXRsZVZhbHVlID0gbmV3VGV4dDsgfVxyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5kYXRhID8gdGhpcy5kYXRhLmdldE11bHRpcGxlVGV4dFZhbHVlKHRoaXMubmFtZSkgOiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5zZXRNdWx0aXBsZVRleHRWYWx1ZSh0aGlzLm5hbWUsIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBvblZhbHVlQ2hhbmdlZChuZXdWYWx1ZTogYW55KSB7XHJcbiAgICB9XHJcbiAgICAvL0lWYWxpZGF0b3JPd25lclxyXG4gICAgZ2V0VmFsaWRhdG9yVGl0bGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudGl0bGU7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTXVsdGlwbGVUZXh0TW9kZWwgZXh0ZW5kcyBRdWVzdGlvbiBpbXBsZW1lbnRzIElNdWx0aXBsZVRleHREYXRhIHtcclxuICAgIHByaXZhdGUgY29sQ291bnRWYWx1ZTogbnVtYmVyID0gMTtcclxuICAgIGNvbENvdW50Q2hhbmdlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgcHVibGljIGl0ZW1TaXplOiBudW1iZXIgPSAyNTtcclxuICAgIHByaXZhdGUgaXRlbXNWYWx1ZXM6IEFycmF5PE11bHRpcGxlVGV4dEl0ZW1Nb2RlbD4gPSBuZXcgQXJyYXk8TXVsdGlwbGVUZXh0SXRlbU1vZGVsPigpO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLml0ZW1zLnB1c2ggPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdmFsdWUuc2V0RGF0YShzZWxmKTtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IEFycmF5LnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgICAgICAgICBzZWxmLmZpcmVDYWxsYmFjayhzZWxmLmNvbENvdW50Q2hhbmdlZENhbGxiYWNrKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJtdWx0aXBsZXRleHRcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXRlbXMoKTogQXJyYXk8TXVsdGlwbGVUZXh0SXRlbU1vZGVsPiB7IHJldHVybiB0aGlzLml0ZW1zVmFsdWVzOyB9XHJcbiAgICBwdWJsaWMgc2V0IGl0ZW1zKHZhbHVlOiBBcnJheTxNdWx0aXBsZVRleHRJdGVtTW9kZWw+KSB7XHJcbiAgICAgICAgdGhpcy5pdGVtc1ZhbHVlcyA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMuY29sQ291bnRDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZEl0ZW0obmFtZTogc3RyaW5nLCB0aXRsZTogc3RyaW5nID0gbnVsbCk6IE11bHRpcGxlVGV4dEl0ZW1Nb2RlbCB7XHJcbiAgICAgICAgdmFyIGl0ZW0gPSB0aGlzLmNyZWF0ZVRleHRJdGVtKG5hbWUsIHRpdGxlKTtcclxuICAgICAgICB0aGlzLml0ZW1zLnB1c2goaXRlbSk7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW07XHJcbiAgICB9XHJcbiAgICAvL1RPRE8tcmVtb3ZlIGxhdGVyLiBEZWxheSByZW1vdmluZyBpbiBjYXNlIHNvbWVib2R5IHVzZSB0aGlzIGZ1bmN0aW9uLlxyXG4gICAgcHJpdmF0ZSBBZGRJdGVtKG5hbWU6IHN0cmluZywgdGl0bGU6IHN0cmluZyA9IG51bGwpOiBNdWx0aXBsZVRleHRJdGVtTW9kZWwgeyByZXR1cm4gdGhpcy5hZGRJdGVtKG5hbWUsIHRpdGxlKTsgfVxyXG4gICAgc3VwcG9ydEdvTmV4dFBhZ2VBdXRvbWF0aWMoKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pdGVtc1tpXS52YWx1ZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY29sQ291bnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY29sQ291bnRWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBjb2xDb3VudCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgMSB8fCB2YWx1ZSA+IDQpIHJldHVybjtcclxuICAgICAgICB0aGlzLmNvbENvdW50VmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmNvbENvdW50Q2hhbmdlZENhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRSb3dzKCk6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIHZhciBjb2xDb3VudCA9IHRoaXMuY29sQ291bnQ7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy5pdGVtcztcclxuICAgICAgICB2YXIgcm93cyA9IFtdO1xyXG4gICAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcm93cy5wdXNoKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3dzW3Jvd3MubGVuZ3RoIC0gMV0ucHVzaChpdGVtc1tpXSk7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSBjb2xDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByb3dzO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc011bHRpcGxlSXRlbVZhbHVlQ2hhbmdpbmcgPSBmYWxzZTtcclxuICAgIHByb3RlY3RlZCBvblZhbHVlQ2hhbmdlZCgpIHtcclxuICAgICAgICBzdXBlci5vblZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgICAgIHRoaXMub25JdGVtVmFsdWVDaGFuZ2VkKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVGV4dEl0ZW0obmFtZTogc3RyaW5nLCB0aXRsZTogc3RyaW5nKTogTXVsdGlwbGVUZXh0SXRlbU1vZGVsIHtcclxuICAgICAgICByZXR1cm4gbmV3IE11bHRpcGxlVGV4dEl0ZW1Nb2RlbChuYW1lLCB0aXRsZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25JdGVtVmFsdWVDaGFuZ2VkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVJdGVtVmFsdWVDaGFuZ2luZykgcmV0dXJuO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbVZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgJiYgKHRoaXMuaXRlbXNbaV0ubmFtZSBpbiB0aGlzLnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbVZhbHVlID0gdGhpcy52YWx1ZVt0aGlzLml0ZW1zW2ldLm5hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0ub25WYWx1ZUNoYW5nZWQoaXRlbVZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcnVuVmFsaWRhdG9ycygpOiBTdXJ2ZXlFcnJvciB7XHJcbiAgICAgICAgdmFyIGVycm9yID0gc3VwZXIucnVuVmFsaWRhdG9ycygpO1xyXG4gICAgICAgIGlmIChlcnJvciAhPSBudWxsKSByZXR1cm4gZXJyb3I7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGVycm9yID0gbmV3IFZhbGlkYXRvclJ1bm5lcigpLnJ1bih0aGlzLml0ZW1zW2ldKTtcclxuICAgICAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHJldHVybiBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICAvL0lNdWx0aXBsZVRleHREYXRhXHJcbiAgICBnZXRNdWx0aXBsZVRleHRWYWx1ZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMudmFsdWUpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlW25hbWVdO1xyXG4gICAgfVxyXG4gICAgc2V0TXVsdGlwbGVUZXh0VmFsdWUobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5pc011bHRpcGxlSXRlbVZhbHVlQ2hhbmdpbmcgPSB0cnVlO1xyXG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgaWYgKCFuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdWYWx1ZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0TmV3VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgICAgIHRoaXMuaXNNdWx0aXBsZUl0ZW1WYWx1ZUNoYW5naW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJtdWx0aXBsZXRleHRpdGVtXCIsIFtcIm5hbWVcIiwgeyBuYW1lOiBcInRpdGxlXCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gb2JqLnRpdGxlVmFsdWU7IH0gfSxcclxuICAgIHsgbmFtZTogXCJ2YWxpZGF0b3JzOnZhbGlkYXRvcnNcIiwgYmFzZUNsYXNzTmFtZTogXCJzdXJ2ZXl2YWxpZGF0b3JcIiwgY2xhc3NOYW1lUGFydDogXCJ2YWxpZGF0b3JcIiB9XSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE11bHRpcGxlVGV4dEl0ZW1Nb2RlbChcIlwiKTsgfSk7XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwibXVsdGlwbGV0ZXh0XCIsIFt7IG5hbWU6IFwiIWl0ZW1zOnRleHRpdGVtc1wiLCBjbGFzc05hbWU6IFwibXVsdGlwbGV0ZXh0aXRlbVwiIH0sXHJcbiAgICAgICAgeyBuYW1lOiBcIml0ZW1TaXplOm51bWJlclwiLCBkZWZhdWx0OiAyNSB9LCB7IG5hbWU6IFwiY29sQ291bnQ6bnVtYmVyXCIsIGRlZmF1bHQ6IDEsIGNob2ljZXM6IFsxLCAyLCAzLCA0XSB9XSxcclxuICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbk11bHRpcGxlVGV4dE1vZGVsKFwiXCIpOyB9LCBcInF1ZXN0aW9uXCIpO1xyXG5cclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJtdWx0aXBsZXRleHRcIiwgKG5hbWUpID0+IHsgdmFyIHEgPSBuZXcgUXVlc3Rpb25NdWx0aXBsZVRleHRNb2RlbChuYW1lKTsgcS5hZGRJdGVtKFwidGV4dDFcIik7IHEuYWRkSXRlbShcInRleHQyXCIpOyByZXR1cm4gcTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fbXVsdGlwbGV0ZXh0LnRzXG4gKiovIiwiaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7QmFzZSwgSVBhZ2UsIElDb25kaXRpb25SdW5uZXIsIElTdXJ2ZXksIElRdWVzdGlvbiwgSGFzaFRhYmxlLCBTdXJ2ZXlFbGVtZW50LCBTdXJ2ZXlQYWdlSWR9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkJhc2V9IGZyb20gXCIuL3F1ZXN0aW9uYmFzZVwiO1xyXG5pbXBvcnQge0NvbmRpdGlvblJ1bm5lcn0gZnJvbSBcIi4vY29uZGl0aW9uc1wiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Sb3dNb2RlbCB7XHJcbiAgICBwcml2YXRlIHZpc2libGVWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgdmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwYWdlOiBQYWdlTW9kZWwsIHB1YmxpYyBxdWVzdGlvbjogUXVlc3Rpb25CYXNlKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24ucm93VmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgc2VsZi5vblJvd1Zpc2liaWxpdHlDaGFuZ2VkKCk7IH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBxdWVzdGlvbnM6IEFycmF5PFF1ZXN0aW9uQmFzZT4gPSBbXTtcclxuICAgIHB1YmxpYyBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMudmlzaWJsZVZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHZpc2libGUodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PSB0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgICAgICB0aGlzLnZpc2libGVWYWx1ZSA9IHZhbDtcclxuICAgICAgICB0aGlzLm9uVmlzaWJsZUNoYW5nZWQoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1cGRhdGVWaXNpYmxlKCkge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRoaXMuY2FsY1Zpc2libGUoKTtcclxuICAgICAgICB0aGlzLnNldFdpZHRoKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkUXVlc3Rpb24ocTogUXVlc3Rpb25CYXNlKSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbnMucHVzaChxKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2libGUoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblZpc2libGVDaGFuZ2VkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2spIHRoaXMudmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldFdpZHRoKCkge1xyXG4gICAgICAgIHZhciB2aXNDb3VudCA9IHRoaXMuZ2V0VmlzaWJsZUNvdW50KCk7XHJcbiAgICAgICAgaWYgKHZpc0NvdW50ID09IDApIHJldHVybjtcclxuICAgICAgICB2YXIgY291bnRlciA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1ZXN0aW9ucy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNRdWVzdGlvblZpc2libGUodGhpcy5xdWVzdGlvbnNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXN0aW9uc1tpXS5yZW5kZXJXaWR0aCA9IHRoaXMucXVlc3Rpb24ud2lkdGggPyB0aGlzLnF1ZXN0aW9uLndpZHRoIDogTWF0aC5mbG9vcigxMDAgLyB2aXNDb3VudCkgKyAnJSc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXN0aW9uc1tpXS5yaWdodEluZGVudCA9IGNvdW50ZXIgPCB2aXNDb3VudCAtIDEgPyAxIDogMDtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblJvd1Zpc2liaWxpdHlDaGFuZ2VkKCkge1xyXG4gICAgICAgIHRoaXMucGFnZS5vblJvd1Zpc2liaWxpdHlDaGFuZ2VkKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRWaXNpYmxlQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgcmVzID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUXVlc3Rpb25WaXNpYmxlKHRoaXMucXVlc3Rpb25zW2ldKSkgcmVzKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzUXVlc3Rpb25WaXNpYmxlKHE6IFF1ZXN0aW9uQmFzZSk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5wYWdlLmlzUXVlc3Rpb25WaXNpYmxlKHEpOyB9XHJcbiAgICBwcml2YXRlIGNhbGNWaXNpYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5nZXRWaXNpYmxlQ291bnQoKSA+IDA7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhZ2VNb2RlbCBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBJUGFnZSwgSUNvbmRpdGlvblJ1bm5lciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwYWdlQ291bnRlciA9IDEwMDtcclxuICAgIHByaXZhdGUgc3RhdGljIGdldFBhZ2VJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcInNwX1wiICsgUGFnZU1vZGVsLnBhZ2VDb3VudGVyKys7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpZFZhbHVlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJvd1ZhbHVlczogQXJyYXk8UXVlc3Rpb25Sb3dNb2RlbD4gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBjb25kaXRpb25SdW5uZXI6IENvbmRpdGlvblJ1bm5lciA9IG51bGw7XHJcbiAgICBxdWVzdGlvbnM6IEFycmF5PFF1ZXN0aW9uQmFzZT4gPSBuZXcgQXJyYXk8UXVlc3Rpb25CYXNlPigpO1xyXG4gICAgcHVibGljIGRhdGE6IElTdXJ2ZXkgPSBudWxsO1xyXG4gICAgcHVibGljIHZpc2libGVJZjogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgdmlzaWJsZUluZGV4OiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgbnVtVmFsdWU6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSB2aXNpYmxlVmFsdWU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuaWRWYWx1ZSA9IFBhZ2VNb2RlbC5nZXRQYWdlSWQoKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbnMucHVzaCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnNldERhdGEoc2VsZi5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCB2YWx1ZSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuaWRWYWx1ZTsgfVxyXG4gICAgcHVibGljIGdldCByb3dzKCk6IEFycmF5PFF1ZXN0aW9uUm93TW9kZWw+IHtcclxuICAgICAgICB0aGlzLnJvd1ZhbHVlcyA9IHRoaXMuYnVpbGRSb3dzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm93VmFsdWVzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc0FjdGl2ZSgpIHsgcmV0dXJuICghdGhpcy5kYXRhKSB8fCB0aGlzLmRhdGEuY3VycmVudFBhZ2UgPT0gdGhpczsgfVxyXG4gICAgcHVibGljIGlzUXVlc3Rpb25WaXNpYmxlKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBib29sZWFuIHsgcmV0dXJuIHF1ZXN0aW9uLnZpc2libGUgfHwgdGhpcy5pc0Rlc2lnbk1vZGU7IH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVSb3cocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSk6IFF1ZXN0aW9uUm93TW9kZWwgeyByZXR1cm4gbmV3IFF1ZXN0aW9uUm93TW9kZWwodGhpcywgcXVlc3Rpb24pOyB9XHJcbiAgICBwcml2YXRlIGdldCBpc0Rlc2lnbk1vZGUoKSB7IHJldHVybiB0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmlzRGVzaWduTW9kZTsgfVxyXG4gICAgcHJpdmF0ZSBidWlsZFJvd3MoKTogQXJyYXk8UXVlc3Rpb25Sb3dNb2RlbD4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXk8UXVlc3Rpb25Sb3dNb2RlbD4oKTtcclxuICAgICAgICB2YXIgbGFzdFJvd1Zpc2libGVJbmRleCA9IC0xO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBxID0gdGhpcy5xdWVzdGlvbnNbaV07XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuY3JlYXRlUm93KHEpKTtcclxuICAgICAgICAgICAgaWYgKHEuc3RhcnRXaXRoTmV3TGluZSkge1xyXG4gICAgICAgICAgICAgICAgbGFzdFJvd1Zpc2libGVJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbaV0uYWRkUXVlc3Rpb24ocSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdFJvd1Zpc2libGVJbmRleCA8IDApIGxhc3RSb3dWaXNpYmxlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2xhc3RSb3dWaXNpYmxlSW5kZXhdLmFkZFF1ZXN0aW9uKHEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtpXS5zZXRXaWR0aCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgb25Sb3dWaXNpYmlsaXR5Q2hhbmdlZChyb3c6IFF1ZXN0aW9uUm93TW9kZWwpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNBY3RpdmUgfHwgIXRoaXMucm93VmFsdWVzKSByZXR1cm47XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5yb3dWYWx1ZXMuaW5kZXhPZihyb3cpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBpbmRleDsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucm93VmFsdWVzW2ldLnF1ZXN0aW9ucy5pbmRleE9mKHJvdy5xdWVzdGlvbikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dWYWx1ZXNbaV0udXBkYXRlVmlzaWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHByb2Nlc3NlZFRpdGxlKCkgeyByZXR1cm4gdGhpcy5kYXRhICE9IG51bGwgPyB0aGlzLmRhdGEucHJvY2Vzc1RleHQodGhpcy50aXRsZSkgOiB0aGlzLnRpdGxlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IG51bSgpIHsgcmV0dXJuIHRoaXMubnVtVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgbnVtKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5udW1WYWx1ZSA9PSB2YWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubnVtVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uTnVtQ2hhbmdlZCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnZpc2libGVWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCB2aXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgICAgICB0aGlzLnZpc2libGVWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEucGFnZVZpc2liaWxpdHlDaGFuZ2VkKHRoaXMsIHRoaXMudmlzaWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIFwicGFnZVwiOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzVmlzaWJsZSgpOiBib29sZWFuIHsgIHJldHVybiB0aGlzLmdldElzUGFnZVZpc2libGUobnVsbCk7IH1cclxuICAgIHB1YmxpYyBnZXRJc1BhZ2VWaXNpYmxlKGV4Y2VwdGlvblF1ZXN0aW9uOiBJUXVlc3Rpb24pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucXVlc3Rpb25zW2ldID09IGV4Y2VwdGlvblF1ZXN0aW9uKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucXVlc3Rpb25zW2ldLnZpc2libGUpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFF1ZXN0aW9uKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGluZGV4OiBudW1iZXIgPSAtMSkge1xyXG4gICAgICAgIGlmIChxdWVzdGlvbiA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLnF1ZXN0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbnMucHVzaChxdWVzdGlvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbnMuc3BsaWNlKGluZGV4LCAwLCBxdWVzdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBxdWVzdGlvbi5zZXREYXRhKHRoaXMuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5xdWVzdGlvbkFkZGVkKHF1ZXN0aW9uLCBpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZE5ld1F1ZXN0aW9uKHF1ZXN0aW9uVHlwZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBRdWVzdGlvbkJhc2Uge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbiA9IFF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5jcmVhdGVRdWVzdGlvbihxdWVzdGlvblR5cGUsIG5hbWUpO1xyXG4gICAgICAgIHRoaXMuYWRkUXVlc3Rpb24ocXVlc3Rpb24pO1xyXG4gICAgICAgIHJldHVybiBxdWVzdGlvbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW1vdmVRdWVzdGlvbihxdWVzdGlvbjogUXVlc3Rpb25CYXNlKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5xdWVzdGlvbnMuaW5kZXhPZihxdWVzdGlvbik7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YSAhPSBudWxsKSB0aGlzLmRhdGEucXVlc3Rpb25SZW1vdmVkKHF1ZXN0aW9uKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBmb2N1c0ZpcnN0UXVlc3Rpb24oKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcXVlc3Rpb24gPSB0aGlzLnF1ZXN0aW9uc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFxdWVzdGlvbi52aXNpYmxlIHx8ICFxdWVzdGlvbi5oYXNJbnB1dCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25zW2ldLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBmb2N1c0ZpcnN0RXJyb3JRdWVzdGlvbigpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5xdWVzdGlvbnNbaV0udmlzaWJsZSB8fCB0aGlzLnF1ZXN0aW9uc1tpXS5jdXJyZW50RXJyb3JDb3VudCA9PSAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbnNbaV0uZm9jdXModHJ1ZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzY3JvbGxUb1RvcCgpIHtcclxuICAgICAgICBTdXJ2ZXlFbGVtZW50LlNjcm9sbEVsZW1lbnRUb1RvcChTdXJ2ZXlQYWdlSWQpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGhhc0Vycm9ycyhmaXJlQ2FsbGJhY2s6IGJvb2xlYW4gPSB0cnVlLCBmb2N1c2VPbkZpcnN0RXJyb3I6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgZmlyc3RFcnJvclF1ZXN0aW9uID0gbnVsbDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnF1ZXN0aW9uc1tpXS52aXNpYmxlICYmIHRoaXMucXVlc3Rpb25zW2ldLmhhc0Vycm9ycyhmaXJlQ2FsbGJhY2spKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZm9jdXNlT25GaXJzdEVycm9yICYmIGZpcnN0RXJyb3JRdWVzdGlvbiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RFcnJvclF1ZXN0aW9uID0gdGhpcy5xdWVzdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmaXJzdEVycm9yUXVlc3Rpb24pIGZpcnN0RXJyb3JRdWVzdGlvbi5mb2N1cyh0cnVlKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFF1ZXN0aW9uc1RvTGlzdChsaXN0OiBBcnJheTxJUXVlc3Rpb24+LCB2aXNpYmxlT25seTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKHZpc2libGVPbmx5ICYmICF0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5xdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHZpc2libGVPbmx5ICYmICF0aGlzLnF1ZXN0aW9uc1tpXS52aXNpYmxlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMucXVlc3Rpb25zW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcnVuQ29uZGl0aW9uKHZhbHVlczogSGFzaFRhYmxlPGFueT4pIHtcclxuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZUlmKSByZXR1cm47XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbmRpdGlvblJ1bm5lcikgdGhpcy5jb25kaXRpb25SdW5uZXIgPSBuZXcgQ29uZGl0aW9uUnVubmVyKHRoaXMudmlzaWJsZUlmKTtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvblJ1bm5lci5leHByZXNzaW9uID0gdGhpcy52aXNpYmxlSWY7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdGhpcy5jb25kaXRpb25SdW5uZXIucnVuKHZhbHVlcyk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25OdW1DaGFuZ2VkKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIH1cclxufVxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwicGFnZVwiLCBbXCJuYW1lXCIsIHsgbmFtZTogXCJxdWVzdGlvbnNcIiwgYmFzZUNsYXNzTmFtZTogXCJxdWVzdGlvblwiIH0sIHsgbmFtZTogXCJ2aXNpYmxlOmJvb2xlYW5cIiwgZGVmYXVsdDogdHJ1ZSB9LCBcInZpc2libGVJZlwiLCBcInRpdGxlXCJdLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGFnZU1vZGVsKCk7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BhZ2UudHNcbiAqKi8iLCJpbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uQ2hlY2tib3hCYXNlfSBmcm9tIFwiLi9xdWVzdGlvbl9iYXNlc2VsZWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25DaGVja2JveE1vZGVsIGV4dGVuZHMgUXVlc3Rpb25DaGVja2JveEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldEhhc090aGVyKHZhbDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF2YWwgfHwgIUFycmF5LmlzQXJyYXkodmFsKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiB2YWwuaW5kZXhPZih0aGlzLm90aGVySXRlbS52YWx1ZSkgPj0gMDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCB2YWx1ZUZyb21EYXRhQ29yZSh2YWw6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKCF2YWwgfHwgIUFycmF5LmlzQXJyYXkodmFsKSkgcmV0dXJuIHZhbDtcclxuXHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHZhbFtpXSA9PSB0aGlzLm90aGVySXRlbS52YWx1ZSkgcmV0dXJuIHZhbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMuaGFzVW5rbm93blZhbHVlKHZhbFtpXSkpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMuY29tbWVudCA9IHZhbFtpXTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdWYWwgPSB2YWwuc2xpY2UoKTtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbFtpXSA9IHRoaXMub3RoZXJJdGVtLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHZhbHVlVG9EYXRhQ29yZSh2YWw6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKCF2YWwgfHwgIXZhbC5sZW5ndGgpIHJldHVybiB2YWw7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWwubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHZhbFtpXSA9PSB0aGlzLm90aGVySXRlbS52YWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZ2V0Q29tbWVudCgpKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdmFyIG5ld1ZhbCA9IHZhbC5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIG5ld1ZhbFtpXSA9IHRoaXMuZ2V0Q29tbWVudCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIHJldHVybiBuZXdWYWw7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiY2hlY2tib3hcIjtcclxuICAgIH1cclxufVxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwiY2hlY2tib3hcIiwgW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbkNoZWNrYm94TW9kZWwoXCJcIik7IH0sIFwiY2hlY2tib3hiYXNlXCIpO1xyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcImNoZWNrYm94XCIsIChuYW1lKSA9PiB7IHZhciBxID0gbmV3IFF1ZXN0aW9uQ2hlY2tib3hNb2RlbChuYW1lKTsgcS5jaG9pY2VzID0gUXVlc3Rpb25GYWN0b3J5LkRlZmF1bHRDaG9pY2VzOyByZXR1cm4gcTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fY2hlY2tib3gudHNcbiAqKi8iLCJpbXBvcnQge1F1ZXN0aW9ufSBmcm9tIFwiLi9xdWVzdGlvblwiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ29tbWVudE1vZGVsIGV4dGVuZHMgUXVlc3Rpb24ge1xyXG4gICAgcHVibGljIHJvd3M6IG51bWJlciA9IDQ7XHJcbiAgICBwdWJsaWMgY29sczogbnVtYmVyID0gNTA7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcImNvbW1lbnRcIjtcclxuICAgIH1cclxuICAgIGlzRW1wdHkoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHN1cGVyLmlzRW1wdHkoKSB8fCB0aGlzLnZhbHVlID09IFwiXCI7XHJcbiAgICB9XHJcbn1cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcImNvbW1lbnRcIiwgW3sgbmFtZTogXCJjb2xzOm51bWJlclwiLCBkZWZhdWx0OiA1MCB9LCB7IG5hbWU6IFwicm93czpudW1iZXJcIiwgZGVmYXVsdDogNCB9XSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uQ29tbWVudE1vZGVsKFwiXCIpOyB9LCBcInF1ZXN0aW9uXCIpO1xyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcImNvbW1lbnRcIiwgKG5hbWUpID0+IHsgcmV0dXJuIG5ldyBRdWVzdGlvbkNvbW1lbnRNb2RlbChuYW1lKTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fY29tbWVudC50c1xuICoqLyIsImltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25TZWxlY3RCYXNlfSBmcm9tIFwiLi9xdWVzdGlvbl9iYXNlc2VsZWN0XCI7XHJcbmltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tIFwiLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Ecm9wZG93bk1vZGVsIGV4dGVuZHMgUXVlc3Rpb25TZWxlY3RCYXNlIHtcclxuICAgIHByaXZhdGUgb3B0aW9uc0NhcHRpb25WYWx1ZTogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBvcHRpb25zQ2FwdGlvbigpIHsgcmV0dXJuICh0aGlzLm9wdGlvbnNDYXB0aW9uVmFsdWUpID8gdGhpcy5vcHRpb25zQ2FwdGlvblZhbHVlIDogc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcIm9wdGlvbnNDYXB0aW9uXCIpOyB9XHJcbiAgICBwdWJsaWMgc2V0IG9wdGlvbnNDYXB0aW9uKG5ld1ZhbHVlOiBzdHJpbmcpIHsgdGhpcy5vcHRpb25zQ2FwdGlvblZhbHVlID0gbmV3VmFsdWU7IH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiZHJvcGRvd25cIjtcclxuICAgIH1cclxuICAgIHN1cHBvcnRHb05leHRQYWdlQXV0b21hdGljKCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG59XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJkcm9wZG93blwiLCBbeyBuYW1lOiBcIm9wdGlvbnNDYXB0aW9uXCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gb2JqLm9wdGlvbnNDYXB0aW9uVmFsdWU7IH19XSxcclxuICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbkRyb3Bkb3duTW9kZWwoXCJcIik7IH0sIFwic2VsZWN0YmFzZVwiKTtcclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJkcm9wZG93blwiLCAobmFtZSkgPT4geyB2YXIgcSA9IG5ldyBRdWVzdGlvbkRyb3Bkb3duTW9kZWwobmFtZSk7IHEuY2hvaWNlcyA9IFF1ZXN0aW9uRmFjdG9yeS5EZWZhdWx0Q2hvaWNlczsgcmV0dXJuIHE7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3F1ZXN0aW9uX2Ryb3Bkb3duLnRzXG4gKiovIiwiaW1wb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4vcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtTdXJ2ZXlFcnJvcn0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQge0N1c3RvbUVycm9yLCBFeGNlZWRTaXplRXJyb3J9IGZyb20gXCIuL2Vycm9yXCI7XHJcbmltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tIFwiLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25GaWxlTW9kZWwgZXh0ZW5kcyBRdWVzdGlvbiB7XHJcbiAgICBwcml2YXRlIHNob3dQcmV2aWV3VmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaXNVcGxvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByZXZpZXdWYWx1ZUxvYWRlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgcHVibGljIGltYWdlSGVpZ2h0OiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgaW1hZ2VXaWR0aDogc3RyaW5nO1xyXG4gICAgcHVibGljIHN0b3JlRGF0YUFzVGV4dDogYm9vbGVhbjtcclxuICAgIHB1YmxpYyBtYXhTaXplOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcImZpbGVcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgc2hvd1ByZXZpZXcoKSB7IHJldHVybiB0aGlzLnNob3dQcmV2aWV3VmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgc2hvd1ByZXZpZXcodmFsdWU6IGJvb2xlYW4pIHsgdGhpcy5zaG93UHJldmlld1ZhbHVlID0gdmFsdWU7IH1cclxuICAgIHB1YmxpYyBsb2FkRmlsZShmaWxlOiBGaWxlKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmICh0aGlzLnN1cnZleSAmJiAhdGhpcy5zdXJ2ZXkudXBsb2FkRmlsZSh0aGlzLm5hbWUsIGZpbGUsIHRoaXMuc3RvcmVEYXRhQXNUZXh0LCBmdW5jdGlvbiAoc3RhdHVzOiBzdHJpbmcpIHsgc2VsZi5pc1VwbG9hZGluZyA9IHN0YXR1cyA9PSBcInVwbG9hZGluZ1wiOyAgfSkpIHJldHVybjtcclxuICAgICAgICB0aGlzLnNldEZpbGVWYWx1ZShmaWxlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBwcmV2aWV3VmFsdWU6IGFueTtcclxuICAgIHByb3RlY3RlZCBzZXRGaWxlVmFsdWUoZmlsZTogRmlsZSkge1xyXG4gICAgICAgIGlmICghRmlsZVJlYWRlcikgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5zaG93UHJldmlldyAmJiAhdGhpcy5zdG9yZURhdGFBc1RleHQpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5jaGVja0ZpbGVGb3JFcnJvcnMoZmlsZSkpIHJldHVybjtcclxuICAgICAgICB2YXIgZmlsZVJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGZpbGVSZWFkZXIub25sb2FkID0gZnVuY3Rpb24gKGUpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuc2hvd1ByZXZpZXcpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYucHJldmlld1ZhbHVlID0gc2VsZi5pc0ZpbGVJbWFnZShmaWxlKSA/IGZpbGVSZWFkZXIucmVzdWx0IDogbnVsbDtcclxuICAgICAgICAgICAgICAgIHNlbGYuZmlyZUNhbGxiYWNrKHNlbGYucHJldmlld1ZhbHVlTG9hZGVkQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChzZWxmLnN0b3JlRGF0YUFzVGV4dCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi52YWx1ZSA9IGZpbGVSZWFkZXIucmVzdWx0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZpbGVSZWFkZXIucmVhZEFzRGF0YVVSTChmaWxlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkNoZWNrRm9yRXJyb3JzKGVycm9yczogQXJyYXk8U3VydmV5RXJyb3I+KSB7XHJcbiAgICAgICAgc3VwZXIub25DaGVja0ZvckVycm9ycyhlcnJvcnMpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzVXBsb2FkaW5nKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzLnB1c2gobmV3IEN1c3RvbUVycm9yKHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJ1cGxvYWRpbmdGaWxlXCIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjaGVja0ZpbGVGb3JFcnJvcnMoZmlsZTogRmlsZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciBlcnJvckxlbmd0aCA9IHRoaXMuZXJyb3JzID8gdGhpcy5lcnJvcnMubGVuZ3RoIDogMDtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLm1heFNpemUgPiAwICYmIGZpbGUuc2l6ZSA+IHRoaXMubWF4U2l6ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmVycm9ycy5wdXNoKG5ldyBFeGNlZWRTaXplRXJyb3IodGhpcy5tYXhTaXplKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlcnJvckxlbmd0aCAhPSB0aGlzLmVycm9ycy5sZW5ndGggfHwgdGhpcy5lcnJvcnMubGVuZ3RoID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmVycm9yc0NoYW5nZWRDYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmVycm9ycy5sZW5ndGggPiAwO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc0ZpbGVJbWFnZShmaWxlOiBGaWxlKSB7XHJcbiAgICAgICAgaWYgKCFmaWxlIHx8ICFmaWxlLnR5cGUpIHJldHVybjtcclxuICAgICAgICB2YXIgc3RyID0gZmlsZS50eXBlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgcmV0dXJuIHN0ci5pbmRleE9mKFwiaW1hZ2VcIikgPT0gMDtcclxuICAgIH1cclxufVxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwiZmlsZVwiLCBbXCJzaG93UHJldmlldzpib29sZWFuXCIsIFwiaW1hZ2VIZWlnaHRcIiwgXCJpbWFnZVdpZHRoXCIsIFwic3RvcmVEYXRhQXNUZXh0OmJvb2xlYW5cIiwgXCJtYXhTaXplOm51bWJlclwiXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uRmlsZU1vZGVsKFwiXCIpOyB9LCBcInF1ZXN0aW9uXCIpO1xyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcImZpbGVcIiwgKG5hbWUpID0+IHsgcmV0dXJuIG5ldyBRdWVzdGlvbkZpbGVNb2RlbChuYW1lKTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fZmlsZS50c1xuICoqLyIsImltcG9ydCB7UXVlc3Rpb25CYXNlfSBmcm9tIFwiLi9xdWVzdGlvbmJhc2VcIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkh0bWxNb2RlbCBleHRlbmRzIFF1ZXN0aW9uQmFzZSB7XHJcbiAgICBwcml2YXRlIGh0bWxWYWx1ZTogc3RyaW5nO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJodG1sXCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGh0bWwoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuaHRtbFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGh0bWwodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMuaHRtbFZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHByb2Nlc3NlZEh0bWwoKSB7IHJldHVybiB0aGlzLnN1cnZleSA/IHRoaXMuc3VydmV5LnByb2Nlc3NIdG1sKHRoaXMuaHRtbCkgOiB0aGlzLmh0bWw7IH1cclxufVxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwiaHRtbFwiLCBbXCJodG1sOmh0bWxcIl0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbkh0bWxNb2RlbChcIlwiKTsgfSwgXCJxdWVzdGlvbmJhc2VcIik7XHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwiaHRtbFwiLCAobmFtZSkgPT4geyByZXR1cm4gbmV3IFF1ZXN0aW9uSHRtbE1vZGVsKG5hbWUpOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbl9odG1sLnRzXG4gKiovIiwiaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkNoZWNrYm94QmFzZX0gZnJvbSBcIi4vcXVlc3Rpb25fYmFzZXNlbGVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uUmFkaW9ncm91cE1vZGVsIGV4dGVuZHMgUXVlc3Rpb25DaGVja2JveEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJyYWRpb2dyb3VwXCI7XHJcbiAgICB9XHJcbiAgICBzdXBwb3J0R29OZXh0UGFnZUF1dG9tYXRpYygpIHsgcmV0dXJuIHRydWU7IH1cclxufVxyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcInJhZGlvZ3JvdXBcIiwgW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvblJhZGlvZ3JvdXBNb2RlbChcIlwiKTsgfSwgXCJjaGVja2JveGJhc2VcIik7XHJcblxyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcInJhZGlvZ3JvdXBcIiwgKG5hbWUpID0+IHsgdmFyIHEgPSBuZXcgUXVlc3Rpb25SYWRpb2dyb3VwTW9kZWwobmFtZSk7IHEuY2hvaWNlcyA9IFF1ZXN0aW9uRmFjdG9yeS5EZWZhdWx0Q2hvaWNlczsgcmV0dXJuIHE7fSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fcmFkaW9ncm91cC50c1xuICoqLyIsImltcG9ydCB7SXRlbVZhbHVlfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25SYXRpbmdNb2RlbCBleHRlbmRzIFF1ZXN0aW9uIHtcclxuICAgIHN0YXRpYyBkZWZhdWx0UmF0ZVZhbHVlczogSXRlbVZhbHVlW10gPSBbXTtcclxuICAgIHByaXZhdGUgcmF0ZXM6IEl0ZW1WYWx1ZVtdID0gW107XHJcbiAgICBwdWJsaWMgbWluaW51bVJhdGVEZXNjcmlwdGlvbjogc3RyaW5nID0gbnVsbDtcclxuICAgIHB1YmxpYyBtYXhpbXVtUmF0ZURlc2NyaXB0aW9uOiBzdHJpbmcgPSBudWxsO1xyXG5cclxuICAgIHJhdGVWYWx1ZXNDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgZ2V0IHJhdGVWYWx1ZXMoKTogQXJyYXk8YW55PiB7IHJldHVybiB0aGlzLnJhdGVzOyB9XHJcbiAgICBzZXQgcmF0ZVZhbHVlcyhuZXdWYWx1ZTogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIEl0ZW1WYWx1ZS5zZXREYXRhKHRoaXMucmF0ZXMsIG5ld1ZhbHVlKTtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLnJhdGVWYWx1ZXNDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgZ2V0IHZpc2libGVSYXRlVmFsdWVzKCk6IEl0ZW1WYWx1ZVtdIHtcclxuICAgICAgICBpZiAodGhpcy5yYXRlVmFsdWVzLmxlbmd0aCA+IDApIHJldHVybiB0aGlzLnJhdGVWYWx1ZXM7XHJcbiAgICAgICAgcmV0dXJuIFF1ZXN0aW9uUmF0aW5nTW9kZWwuZGVmYXVsdFJhdGVWYWx1ZXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcInJhdGluZ1wiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHN1cHBvcnRDb21tZW50KCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgcHVibGljIHN1cHBvcnRPdGhlcigpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cclxuICAgIHN1cHBvcnRHb05leHRQYWdlQXV0b21hdGljKCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG59XHJcbkl0ZW1WYWx1ZS5zZXREYXRhKFF1ZXN0aW9uUmF0aW5nTW9kZWwuZGVmYXVsdFJhdGVWYWx1ZXMsIFsxLCAyLCAzLCA0LCA1XSk7XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJyYXRpbmdcIiwgW1wiaGFzQ29tbWVudDpib29sZWFuXCIsIHsgbmFtZTogXCJyYXRlVmFsdWVzOml0ZW12YWx1ZXNcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBJdGVtVmFsdWUuZ2V0RGF0YShvYmoucmF0ZVZhbHVlcyk7IH0sIG9uU2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSwgdmFsdWU6IGFueSkgeyBvYmoucmF0ZVZhbHVlcyA9IHZhbHVlOyB9fSxcclxuICAgIFwibWluaW51bVJhdGVEZXNjcmlwdGlvblwiLCBcIm1heGltdW1SYXRlRGVzY3JpcHRpb25cIl0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvblJhdGluZ01vZGVsKFwiXCIpOyB9LCBcInF1ZXN0aW9uXCIpO1xyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcInJhdGluZ1wiLCAobmFtZSkgPT4geyByZXR1cm4gbmV3IFF1ZXN0aW9uUmF0aW5nTW9kZWwobmFtZSk7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3F1ZXN0aW9uX3JhdGluZy50c1xuICoqLyIsImltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuL3F1ZXN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25UZXh0TW9kZWwgZXh0ZW5kcyBRdWVzdGlvbiB7XHJcbiAgICBwdWJsaWMgc2l6ZTogbnVtYmVyID0gMjU7XHJcbiAgICBwdWJsaWMgaW5wdXRUeXBlOiBzdHJpbmcgPSBcInRleHRcIjtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwidGV4dFwiO1xyXG4gICAgfVxyXG4gICAgaXNFbXB0eSgpOiBib29sZWFuIHsgIHJldHVybiBzdXBlci5pc0VtcHR5KCkgfHwgdGhpcy52YWx1ZSA9PSBcIlwiOyB9XHJcbiAgICBzdXBwb3J0R29OZXh0UGFnZUF1dG9tYXRpYygpIHsgcmV0dXJuIHRydWU7IH1cclxuICAgIHByb3RlY3RlZCBzZXROZXdWYWx1ZShuZXdWYWx1ZTogYW55KSB7XHJcbiAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmNvcnJlY3RWYWx1ZVR5cGUobmV3VmFsdWUpO1xyXG4gICAgICAgIHN1cGVyLnNldE5ld1ZhbHVlKG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjb3JyZWN0VmFsdWVUeXBlKG5ld1ZhbHVlOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmICghbmV3VmFsdWUpIHJldHVybiBuZXdWYWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5pbnB1dFR5cGUgPT0gXCJudW1iZXJcIiB8fCB0aGlzLmlucHV0VHlwZSA9PSBcInJhbmdlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuaXNOdW1iZXIobmV3VmFsdWUpID8gcGFyc2VGbG9hdChuZXdWYWx1ZSkgOiBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzTnVtYmVyKHZhbHVlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KHZhbHVlKSkgJiYgaXNGaW5pdGUodmFsdWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwidGV4dFwiLCBbeyBuYW1lOiBcImlucHV0VHlwZVwiLCBkZWZhdWx0OiBcInRleHRcIiwgY2hvaWNlczogW1wiY29sb3JcIiwgXCJkYXRlXCIsIFwiZGF0ZXRpbWVcIiwgXCJkYXRldGltZS1sb2NhbFwiLCBcImVtYWlsXCIsIFwibW9udGhcIiwgXCJudW1iZXJcIiwgXCJwYXNzd29yZFwiLCBcInJhbmdlXCIsIFwidGVsXCIsIFwidGV4dFwiLCBcInRpbWVcIiwgXCJ1cmxcIiwgXCJ3ZWVrXCJdIH0sXHJcbiAgICB7IG5hbWU6IFwic2l6ZTpudW1iZXJcIiwgZGVmYXVsdDogMjUgfV0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvblRleHRNb2RlbChcIlwiKTsgfSwgXCJxdWVzdGlvblwiKTtcclxuXHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwidGV4dFwiLCAobmFtZSkgPT4geyByZXR1cm4gbmV3IFF1ZXN0aW9uVGV4dE1vZGVsKG5hbWUpOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbl90ZXh0LnRzXG4gKiovIiwiaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7QmFzZSwgSVN1cnZleSwgSGFzaFRhYmxlLCBJUXVlc3Rpb24sIElDb25kaXRpb25SdW5uZXIsIElQYWdlLCBTdXJ2ZXlFcnJvciwgRXZlbnR9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtJU3VydmV5VHJpZ2dlck93bmVyLCBTdXJ2ZXlUcmlnZ2VyfSBmcm9tIFwiLi90cmlnZ2VyXCI7XHJcbmltcG9ydCB7UGFnZU1vZGVsfSBmcm9tIFwiLi9wYWdlXCI7XHJcbmltcG9ydCB7VGV4dFByZVByb2Nlc3Nvcn0gZnJvbSBcIi4vdGV4dFByZVByb2Nlc3NvclwiO1xyXG5pbXBvcnQge1Byb2Nlc3NWYWx1ZX0gZnJvbSBcIi4vY29uZGl0aW9uUHJvY2Vzc1ZhbHVlXCI7XHJcbmltcG9ydCB7ZHhTdXJ2ZXlTZXJ2aWNlfSBmcm9tIFwiLi9keFN1cnZleVNlcnZpY2VcIjtcclxuaW1wb3J0IHtKc29uRXJyb3J9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuL3N1cnZleVN0cmluZ3NcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkJhc2V9IGZyb20gXCIuL3F1ZXN0aW9uYmFzZVwiO1xyXG5pbXBvcnQge0N1c3RvbUVycm9yfSBmcm9tIFwiLi9lcnJvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN1cnZleU1vZGVsIGV4dGVuZHMgQmFzZSBpbXBsZW1lbnRzIElTdXJ2ZXksIElTdXJ2ZXlUcmlnZ2VyT3duZXIge1xyXG4gICAgcHVibGljIHN1cnZleUlkOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHVibGljIHN1cnZleVBvc3RJZDogc3RyaW5nID0gbnVsbDtcclxuICAgIHB1YmxpYyBjbGllbnRJZDogc3RyaW5nID0gbnVsbDtcclxuICAgIHB1YmxpYyBjb29raWVOYW1lOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHVibGljIHNlbmRSZXN1bHRPblBhZ2VOZXh0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIGNvbW1lbnRQcmVmaXg6IHN0cmluZyA9IFwiLUNvbW1lbnRcIjtcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBzaG93TmF2aWdhdGlvbkJ1dHRvbnM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHNob3dUaXRsZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgc2hvd1BhZ2VUaXRsZXM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIGNvbXBsZXRlZEh0bWw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgcmVxdWlyZWRUZXh0OiBzdHJpbmcgPSBcIipcIjtcclxuICAgIHB1YmxpYyBxdWVzdGlvblN0YXJ0SW5kZXg6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgcXVlc3Rpb25UaXRsZVRlbXBsYXRlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIHNob3dQcm9ncmVzc0Jhcjogc3RyaW5nID0gXCJvZmZcIjtcclxuICAgIHB1YmxpYyBzdG9yZU90aGVyc0FzQ29tbWVudDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgZ29OZXh0UGFnZUF1dG9tYXRpYzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHBhZ2VzOiBBcnJheTxQYWdlTW9kZWw+ID0gbmV3IEFycmF5PFBhZ2VNb2RlbD4oKTtcclxuICAgIHB1YmxpYyB0cmlnZ2VyczogQXJyYXk8U3VydmV5VHJpZ2dlcj4gPSBuZXcgQXJyYXk8U3VydmV5VHJpZ2dlcj4oKTtcclxuICAgIHB1YmxpYyBjbGVhckludmlzaWJsZVZhbHVlczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50UGFnZVZhbHVlOiBQYWdlTW9kZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSB2YWx1ZXNIYXNoOiBIYXNoVGFibGU8YW55PiA9IHt9O1xyXG4gICAgcHJpdmF0ZSB2YXJpYWJsZXNIYXNoOiBIYXNoVGFibGU8YW55PiA9IHt9O1xyXG4gICAgcHJpdmF0ZSBwYWdlUHJldlRleHRWYWx1ZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwYWdlTmV4dFRleHRWYWx1ZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBjb21wbGV0ZVRleHRWYWx1ZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBzaG93UGFnZU51bWJlcnNWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBzaG93UXVlc3Rpb25OdW1iZXJzVmFsdWU6IHN0cmluZyA9IFwib25cIjtcclxuICAgIHByaXZhdGUgcXVlc3Rpb25UaXRsZUxvY2F0aW9uVmFsdWU6IHN0cmluZyA9IFwidG9wXCI7XHJcbiAgICBwcml2YXRlIGxvY2FsZVZhbHVlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBpc0NvbXBsZXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpc0xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgcHJvY2Vzc2VkVGV4dFZhbHVlczogSGFzaFRhYmxlPGFueT4gPSB7fTtcclxuICAgIHByaXZhdGUgdGV4dFByZVByb2Nlc3NvcjogVGV4dFByZVByb2Nlc3NvcjtcclxuICAgIHByaXZhdGUgaXNWYWxpZGF0aW5nT25TZXJ2ZXJWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBtb2RlVmFsdWU6IHN0cmluZyA9IFwiZWRpdFwiO1xyXG4gICAgcHJpdmF0ZSBpc0Rlc2lnbk1vZGVWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBvbkNvbXBsZXRlOiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsKSA9PiBhbnksIGFueT4oKTtcclxuICAgIHB1YmxpYyBvblBhcnRpYWxTZW5kOiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsKSA9PiBhbnksIGFueT4oKTtcclxuICAgIHB1YmxpYyBvbkN1cnJlbnRQYWdlQ2hhbmdlZDogRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PigpO1xyXG4gICAgcHVibGljIG9uVmFsdWVDaGFuZ2VkOiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4gPSBuZXcgRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+KCk7XHJcbiAgICBwdWJsaWMgb25WaXNpYmxlQ2hhbmdlZDogRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PigpO1xyXG4gICAgcHVibGljIG9uUGFnZVZpc2libGVDaGFuZ2VkOiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4gPSBuZXcgRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+KCk7XHJcbiAgICBwdWJsaWMgb25RdWVzdGlvbkFkZGVkOiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4gPSBuZXcgRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+KCk7XHJcbiAgICBwdWJsaWMgb25RdWVzdGlvblJlbW92ZWQ6IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PiA9IG5ldyBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4oKTtcclxuICAgIHB1YmxpYyBvblZhbGlkYXRlUXVlc3Rpb246IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PiA9IG5ldyBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4oKTtcclxuICAgIHB1YmxpYyBvblNlcnZlclZhbGlkYXRlUXVlc3Rpb25zOiAoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnk7XHJcbiAgICBwdWJsaWMgb25Qcm9jZXNzSHRtbDogRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PigpO1xyXG4gICAgcHVibGljIG9uU2VuZFJlc3VsdDogRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PigpO1xyXG4gICAgcHVibGljIG9uR2V0UmVzdWx0OiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4gPSBuZXcgRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+KCk7XHJcbiAgICBwdWJsaWMgb25VcGxvYWRGaWxlOiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4gPSBuZXcgRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+KCk7XHJcbiAgICBwdWJsaWMganNvbkVycm9yczogQXJyYXk8SnNvbkVycm9yPiA9IG51bGw7XHJcblxyXG4gICAgY29uc3RydWN0b3IoanNvbk9iajogYW55ID0gbnVsbCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMudGV4dFByZVByb2Nlc3NvciA9IG5ldyBUZXh0UHJlUHJvY2Vzc29yKCk7XHJcbiAgICAgICAgdGhpcy50ZXh0UHJlUHJvY2Vzc29yLm9uSGFzVmFsdWUgPSBmdW5jdGlvbiAobmFtZTogc3RyaW5nKSB7IHJldHVybiBzZWxmLmhhc1Byb2Nlc3NlZFRleHRWYWx1ZShuYW1lKTsgfTtcclxuICAgICAgICB0aGlzLnRleHRQcmVQcm9jZXNzb3Iub25Qcm9jZXNzID0gZnVuY3Rpb24gKG5hbWU6IHN0cmluZykgeyByZXR1cm4gc2VsZi5nZXRQcm9jZXNzZWRUZXh0VmFsdWUobmFtZSk7IH07XHJcbiAgICAgICAgdGhpcy5wYWdlcy5wdXNoID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhbHVlLmRhdGEgPSBzZWxmO1xyXG4gICAgICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCB2YWx1ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnRyaWdnZXJzLnB1c2ggPSBmdW5jdGlvbiAodmFsdWUpIHtcclxuICAgICAgICAgICAgdmFsdWUuc2V0T3duZXIoc2VsZik7XHJcbiAgICAgICAgICAgIHJldHVybiBBcnJheS5wcm90b3R5cGUucHVzaC5jYWxsKHRoaXMsIHZhbHVlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvY2Vzc2VkVGV4dFZhbHVlcygpO1xyXG4gICAgICAgIHRoaXMub25CZWZvcmVDcmVhdGluZygpO1xyXG4gICAgICAgIGlmIChqc29uT2JqKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0SnNvbk9iamVjdChqc29uT2JqKTtcclxuICAgICAgICAgICAgaWYgKHRoaXMuc3VydmV5SWQpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMubG9hZFN1cnZleUZyb21TZXJ2aWNlKHRoaXMuc3VydmV5SWQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25DcmVhdGluZygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIFwic3VydmV5XCI7IH1cclxuICAgIHB1YmxpYyBnZXQgbG9jYWxlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmxvY2FsZVZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGxvY2FsZSh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5sb2NhbGVWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHN1cnZleUxvY2FsaXphdGlvbi5jdXJyZW50TG9jYWxlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0TG9jU3RyaW5nKHN0cjogc3RyaW5nKSB7IHJldHVybiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKHN0cik7IH1cclxuICAgIHB1YmxpYyBnZXQgZW1wdHlTdXJ2ZXlUZXh0KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmdldExvY1N0cmluZyhcImVtcHR5U3VydmV5XCIpOyB9XHJcbiAgICBwdWJsaWMgZ2V0IHBhZ2VQcmV2VGV4dCgpIHsgcmV0dXJuICh0aGlzLnBhZ2VQcmV2VGV4dFZhbHVlKSA/IHRoaXMucGFnZVByZXZUZXh0VmFsdWUgOiB0aGlzLmdldExvY1N0cmluZyhcInBhZ2VQcmV2VGV4dFwiKTsgfVxyXG4gICAgcHVibGljIHNldCBwYWdlUHJldlRleHQobmV3VmFsdWU6IHN0cmluZykgeyB0aGlzLnBhZ2VQcmV2VGV4dFZhbHVlID0gbmV3VmFsdWU7IH1cclxuICAgIHB1YmxpYyBnZXQgcGFnZU5leHRUZXh0KCkgeyByZXR1cm4gKHRoaXMucGFnZU5leHRUZXh0VmFsdWUpID8gdGhpcy5wYWdlTmV4dFRleHRWYWx1ZSA6IHRoaXMuZ2V0TG9jU3RyaW5nKFwicGFnZU5leHRUZXh0XCIpOyB9XHJcbiAgICBwdWJsaWMgc2V0IHBhZ2VOZXh0VGV4dChuZXdWYWx1ZTogc3RyaW5nKSB7IHRoaXMucGFnZU5leHRUZXh0VmFsdWUgPSBuZXdWYWx1ZTsgfVxyXG4gICAgcHVibGljIGdldCBjb21wbGV0ZVRleHQoKSB7IHJldHVybiAodGhpcy5jb21wbGV0ZVRleHRWYWx1ZSkgPyB0aGlzLmNvbXBsZXRlVGV4dFZhbHVlIDogdGhpcy5nZXRMb2NTdHJpbmcoXCJjb21wbGV0ZVRleHRcIik7IH1cclxuICAgIHB1YmxpYyBzZXQgY29tcGxldGVUZXh0KG5ld1ZhbHVlOiBzdHJpbmcpIHsgdGhpcy5jb21wbGV0ZVRleHRWYWx1ZSA9IG5ld1ZhbHVlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IHNob3dQYWdlTnVtYmVycygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuc2hvd1BhZ2VOdW1iZXJzVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgc2hvd1BhZ2VOdW1iZXJzKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLnNob3dQYWdlTnVtYmVycykgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2hvd1BhZ2VOdW1iZXJzVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2libGVJbmRleGVzKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHNob3dRdWVzdGlvbk51bWJlcnMoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuc2hvd1F1ZXN0aW9uTnVtYmVyc1ZhbHVlOyB9O1xyXG4gICAgcHVibGljIHNldCBzaG93UXVlc3Rpb25OdW1iZXJzKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IHRoaXMuc2hvd1F1ZXN0aW9uTnVtYmVycykgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2hvd1F1ZXN0aW9uTnVtYmVyc1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVWaXNpYmxlSW5kZXhlcygpO1xyXG4gICAgfTtcclxuICAgIHB1YmxpYyBnZXQgcXVlc3Rpb25UaXRsZUxvY2F0aW9uKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnF1ZXN0aW9uVGl0bGVMb2NhdGlvblZhbHVlOyB9O1xyXG4gICAgcHVibGljIHNldCBxdWVzdGlvblRpdGxlTG9jYXRpb24odmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5xdWVzdGlvblRpdGxlTG9jYXRpb25WYWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25UaXRsZUxvY2F0aW9uVmFsdWUgPSB2YWx1ZTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgZ2V0IG1vZGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMubW9kZVZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IG1vZGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PSB0aGlzLm1vZGUpIHJldHVybjtcclxuICAgICAgICBpZiAodmFsdWUgIT0gXCJlZGl0XCIgJiYgdmFsdWUgIT0gXCJkaXNwbGF5XCIpIHJldHVybjtcclxuICAgICAgICB0aGlzLm1vZGVWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBkYXRhKCk6IGFueSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLnZhbHVlc0hhc2gpIHtcclxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLnZhbHVlc0hhc2hba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgZGF0YShkYXRhOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnZhbHVlc0hhc2ggPSB7fTtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNIYXNoW2tleV0gPSBkYXRhW2tleV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVHJpZ2dlcnMoa2V5LCBkYXRhW2tleV0sIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vdGlmeUFsbFF1ZXN0aW9uc09uVmFsdWVDaGFuZ2VkKCk7XHJcbiAgICAgICAgdGhpcy5ydW5Db25kaXRpb25zKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1lbnRzKCk6IGFueSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLnZhbHVlc0hhc2gpIHtcclxuICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKHRoaXMuY29tbWVudFByZWZpeCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXMudmFsdWVzSGFzaFtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBnZXQgdmlzaWJsZVBhZ2VzKCk6IEFycmF5PFBhZ2VNb2RlbD4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzaWduTW9kZSkgcmV0dXJuIHRoaXMucGFnZXM7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheTxQYWdlTW9kZWw+KCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2VzW2ldLmlzVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5wYWdlc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucGFnZXMubGVuZ3RoID09IDA7IH1cclxuICAgIHB1YmxpYyBnZXQgUGFnZUNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZXMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCB2aXNpYmxlUGFnZUNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZVBhZ2VzLmxlbmd0aDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY3VycmVudFBhZ2UoKTogUGFnZU1vZGVsIHtcclxuICAgICAgICB2YXIgdlBhZ2VzID0gdGhpcy52aXNpYmxlUGFnZXM7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2VWYWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh2UGFnZXMuaW5kZXhPZih0aGlzLmN1cnJlbnRQYWdlVmFsdWUpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9PSBudWxsICYmIHZQYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB2UGFnZXNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRQYWdlVmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGN1cnJlbnRQYWdlKHZhbHVlOiBQYWdlTW9kZWwpIHtcclxuICAgICAgICB2YXIgdlBhZ2VzID0gdGhpcy52aXNpYmxlUGFnZXM7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwgJiYgdlBhZ2VzLmluZGV4T2YodmFsdWUpIDwgMCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PSB0aGlzLmN1cnJlbnRQYWdlVmFsdWUpIHJldHVybjtcclxuICAgICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLmN1cnJlbnRQYWdlVmFsdWU7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZUNoYW5nZWQodmFsdWUsIG9sZFZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY3VycmVudFBhZ2VObygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVQYWdlcy5pbmRleE9mKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBjdXJyZW50UGFnZU5vKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgdlBhZ2VzID0gdGhpcy52aXNpYmxlUGFnZXM7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+PSB0aGlzLnZpc2libGVQYWdlcy5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy52aXNpYmxlUGFnZXNbdmFsdWVdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGZvY3VzRmlyc3RRdWVzdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZVZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZS5zY3JvbGxUb1RvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUuZm9jdXNGaXJzdFF1ZXN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBzdGF0ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLmlzTG9hZGluZykgcmV0dXJuIFwibG9hZGluZ1wiO1xyXG4gICAgICAgIGlmICh0aGlzLmlzQ29tcGxldGVkKSByZXR1cm4gXCJjb21wbGV0ZWRcIjtcclxuICAgICAgICByZXR1cm4gKHRoaXMuY3VycmVudFBhZ2UpID8gXCJydW5uaW5nXCIgOiBcImVtcHR5XCJcclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGVhcihjbGVhckRhdGE6IGJvb2xlYW4gPSB0cnVlLCBnb3RvRmlyc3RQYWdlOiBib29sZWFuID0gdHJ1ZSkge1xyXG4gICAgICAgIGlmIChjbGVhckRhdGEpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhID0gbnVsbDtcclxuICAgICAgICAgICAgdGhpcy52YXJpYWJsZXNIYXNoID0ge307XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAoZ290b0ZpcnN0UGFnZSAmJiB0aGlzLnZpc2libGVQYWdlQ291bnQgPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB0aGlzLnZpc2libGVQYWdlc1swXTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgbWVyZ2VWYWx1ZXMoc3JjOiBhbnksIGRlc3Q6IGFueSkge1xyXG4gICAgICAgIGlmICghZGVzdCB8fCAhc3JjKSByZXR1cm47XHJcbiAgICAgICAgZm9yICh2YXIga2V5IGluIHNyYykge1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSBzcmNba2V5XTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcpIHtcclxuICAgICAgICAgICAgICAgIGlmICghZGVzdFtrZXldKSBkZXN0W2tleV0gPSB7fTtcclxuICAgICAgICAgICAgICAgIHRoaXMubWVyZ2VWYWx1ZXModmFsdWUsIGRlc3Rba2V5XSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBkZXN0W2tleV0gPSB2YWx1ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjdXJyZW50UGFnZUNoYW5nZWQobmV3VmFsdWU6IFBhZ2VNb2RlbCwgb2xkVmFsdWU6IFBhZ2VNb2RlbCkge1xyXG4gICAgICAgIHRoaXMub25DdXJyZW50UGFnZUNoYW5nZWQuZmlyZSh0aGlzLCB7ICdvbGRDdXJyZW50UGFnZSc6IG9sZFZhbHVlLCAnbmV3Q3VycmVudFBhZ2UnOiBuZXdWYWx1ZSB9KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRQcm9ncmVzcygpOiBudW1iZXIge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlID09IG51bGwpIHJldHVybiAwO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMudmlzaWJsZVBhZ2VzLmluZGV4T2YodGhpcy5jdXJyZW50UGFnZSkgKyAxO1xyXG4gICAgICAgIHJldHVybiBNYXRoLmNlaWwoKGluZGV4ICogMTAwIC8gdGhpcy52aXNpYmxlUGFnZUNvdW50KSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzRWRpdE1vZGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm1vZGUgPT0gXCJlZGl0XCI7IH1cclxuICAgIHB1YmxpYyBnZXQgaXNEaXNwbGF5TW9kZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMubW9kZSA9PSBcImRpc3BsYXlcIjsgfVxyXG4gICAgcHVibGljIGdldCBpc0Rlc2lnbk1vZGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmlzRGVzaWduTW9kZVZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0RGVzaWduTW9kZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuaXNEZXNpZ25Nb2RlVmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaGFzQ29va2llKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5jb29raWVOYW1lKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIGNvb2tpZXMgPSBkb2N1bWVudC5jb29raWU7XHJcbiAgICAgICAgcmV0dXJuIGNvb2tpZXMgJiYgY29va2llcy5pbmRleE9mKHRoaXMuY29va2llTmFtZSArIFwiPXRydWVcIikgPiAtMTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRDb29raWUoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvb2tpZU5hbWUpIHJldHVybjtcclxuICAgICAgICBkb2N1bWVudC5jb29raWUgPSB0aGlzLmNvb2tpZU5hbWUgKyBcIj10cnVlOyBleHBpcmVzPUZyaSwgMzEgRGVjIDk5OTkgMDowOjAgR01UXCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZGVsZXRlQ29va2llKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jb29raWVOYW1lKSByZXR1cm47XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gdGhpcy5jb29raWVOYW1lICsgXCI9O1wiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG5leHRQYWdlKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzTGFzdFBhZ2UpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5pc0VkaXRNb2RlICYmIHRoaXMuaXNDdXJyZW50UGFnZUhhc0Vycm9ycykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmRvU2VydmVyVmFsaWRhdGlvbigpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kb05leHRQYWdlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBnZXQgaXNDdXJyZW50UGFnZUhhc0Vycm9ycygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZSA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50UGFnZS5oYXNFcnJvcnModHJ1ZSwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcHJldlBhZ2UoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGaXJzdFBhZ2UpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgdlBhZ2VzID0gdGhpcy52aXNpYmxlUGFnZXM7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdlBhZ2VzLmluZGV4T2YodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHZQYWdlc1tpbmRleCAtIDFdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNvbXBsZXRlTGFzdFBhZ2UoKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRWRpdE1vZGUgJiYgdGhpcy5pc0N1cnJlbnRQYWdlSGFzRXJyb3JzKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuZG9TZXJ2ZXJWYWxpZGF0aW9uKCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB0aGlzLmRvQ29tcGxldGUoKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXNGaXJzdFBhZ2UoKTogYm9vbGVhbiB7IFxyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlID09IG51bGwpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVQYWdlcy5pbmRleE9mKHRoaXMuY3VycmVudFBhZ2UpID09IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzTGFzdFBhZ2UoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2UgPT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgdmFyIHZQYWdlcyA9IHRoaXMudmlzaWJsZVBhZ2VzO1xyXG4gICAgICAgIHJldHVybiB2UGFnZXMuaW5kZXhPZih0aGlzLmN1cnJlbnRQYWdlKSA9PSB2UGFnZXMubGVuZ3RoIC0gMTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBkb0NvbXBsZXRlKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNsZWFySW52aXNpYmxlVmFsdWVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xlYXJJbnZpc2libGVRdWVzdGlvblZhbHVlcygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldENvb2tpZSgpO1xyXG4gICAgICAgIHRoaXMuc2V0Q29tcGxldGVkKCk7XHJcbiAgICAgICAgdGhpcy5vbkNvbXBsZXRlLmZpcmUodGhpcywgbnVsbCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3VydmV5UG9zdElkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZFJlc3VsdCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXNWYWxpZGF0aW5nT25TZXJ2ZXIoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLmlzVmFsaWRhdGluZ09uU2VydmVyVmFsdWU7IH1cclxuICAgIHByaXZhdGUgc2V0SXNWYWxpZGF0aW5nT25TZXJ2ZXIodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PSB0aGlzLmlzVmFsaWRhdGluZ09uU2VydmVyKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc1ZhbGlkYXRpbmdPblNlcnZlclZhbHVlID0gdmFsO1xyXG4gICAgICAgIHRoaXMub25Jc1ZhbGlkYXRpbmdPblNlcnZlckNoYW5nZWQoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbklzVmFsaWRhdGluZ09uU2VydmVyQ2hhbmdlZCgpIHsgfVxyXG4gICAgcHJvdGVjdGVkIGRvU2VydmVyVmFsaWRhdGlvbigpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMub25TZXJ2ZXJWYWxpZGF0ZVF1ZXN0aW9ucykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB2YXIgb3B0aW9ucyA9IHsgZGF0YToge30sIGVycm9yczoge30sIHN1cnZleTogdGhpcywgY29tcGxldGUgOiBmdW5jdGlvbiAoKSB7IHNlbGYuY29tcGxldGVTZXJ2ZXJWYWxpZGF0aW9uKG9wdGlvbnMpOyB9IH07XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmN1cnJlbnRQYWdlLnF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcXVlc3Rpb24gPSB0aGlzLmN1cnJlbnRQYWdlLnF1ZXN0aW9uc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFxdWVzdGlvbi52aXNpYmxlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5nZXRWYWx1ZShxdWVzdGlvbi5uYW1lKTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlKSBvcHRpb25zLmRhdGFbcXVlc3Rpb24ubmFtZV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5zZXRJc1ZhbGlkYXRpbmdPblNlcnZlcih0cnVlKTtcclxuICAgICAgICB0aGlzLm9uU2VydmVyVmFsaWRhdGVRdWVzdGlvbnModGhpcywgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNvbXBsZXRlU2VydmVyVmFsaWRhdGlvbihvcHRpb25zOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnNldElzVmFsaWRhdGluZ09uU2VydmVyKGZhbHNlKTtcclxuICAgICAgICBpZiAoIW9wdGlvbnMgJiYgIW9wdGlvbnMuc3VydmV5KSByZXR1cm47XHJcbiAgICAgICAgdmFyIHNlbGYgPSBvcHRpb25zLnN1cnZleTtcclxuICAgICAgICB2YXIgaGFzRXJyb3JzID0gZmFsc2U7XHJcbiAgICAgICAgaWYgKG9wdGlvbnMuZXJyb3JzKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIG5hbWUgaW4gb3B0aW9ucy5lcnJvcnMpIHtcclxuICAgICAgICAgICAgICAgIHZhciBxdWVzdGlvbiA9IHNlbGYuZ2V0UXVlc3Rpb25CeU5hbWUobmFtZSk7XHJcbiAgICAgICAgICAgICAgICBpZiAocXVlc3Rpb24gJiYgcXVlc3Rpb25bXCJlcnJvcnNcIl0pIHtcclxuICAgICAgICAgICAgICAgICAgICBoYXNFcnJvcnMgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgICAgIHF1ZXN0aW9uW1wiYWRkRXJyb3JcIl0obmV3IEN1c3RvbUVycm9yKG9wdGlvbnMuZXJyb3JzW25hbWVdKSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFoYXNFcnJvcnMpIHtcclxuICAgICAgICAgICAgaWYgKHNlbGYuaXNMYXN0UGFnZSkgc2VsZi5kb0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIGVsc2Ugc2VsZi5kb05leHRQYWdlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGRvTmV4dFBhZ2UoKSB7XHJcbiAgICAgICAgdGhpcy5jaGVja09uUGFnZVRyaWdnZXJzKCk7XHJcbiAgICAgICAgaWYgKHRoaXMuc2VuZFJlc3VsdE9uUGFnZU5leHQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kUmVzdWx0KHRoaXMuc3VydmV5UG9zdElkLCB0aGlzLmNsaWVudElkLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIHZQYWdlcyA9IHRoaXMudmlzaWJsZVBhZ2VzO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHZQYWdlcy5pbmRleE9mKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB2UGFnZXNbaW5kZXggKyAxXTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzZXRDb21wbGV0ZWQoKSB7XHJcbiAgICAgICAgdGhpcy5pc0NvbXBsZXRlZCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHByb2Nlc3NlZENvbXBsZXRlZEh0bWwoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5jb21wbGV0ZWRIdG1sKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnByb2Nlc3NIdG1sKHRoaXMuY29tcGxldGVkSHRtbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBcIjxoMz5cIiArIHRoaXMuZ2V0TG9jU3RyaW5nKFwiY29tcGxldGluZ1N1cnZleVwiKSArIFwiPC9oMz5cIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcHJvY2Vzc2VkTG9hZGluZ0h0bWwoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCI8aDM+XCIgKyB0aGlzLmdldExvY1N0cmluZyhcImxvYWRpbmdTdXJ2ZXlcIikgKyBcIjwvaDM+XCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHByb2dyZXNzVGV4dCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlID09IG51bGwpIHJldHVybiBcIlwiO1xyXG4gICAgICAgIHZhciB2UGFnZXMgPSB0aGlzLnZpc2libGVQYWdlcztcclxuICAgICAgICB2YXIgaW5kZXggPSB2UGFnZXMuaW5kZXhPZih0aGlzLmN1cnJlbnRQYWdlKSArIDE7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0TG9jU3RyaW5nKFwicHJvZ3Jlc3NUZXh0XCIpW1wiZm9ybWF0XCJdKGluZGV4LCB2UGFnZXMubGVuZ3RoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1cGxvYWRGaWxlKG5hbWU6IHN0cmluZywgZmlsZTogRmlsZSwgc3RvcmVEYXRhQXNUZXh0OiBib29sZWFuLCB1cGxvYWRpbmdDYWxsYmFjazogKHN0YXR1czogc3RyaW5nKT0+YW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIGFjY2VwdCA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vblVwbG9hZEZpbGUuZmlyZSh0aGlzLCB7IG5hbWU6IG5hbWUsIGZpbGU6IGZpbGUsIGFjY2VwdDogYWNjZXB0IH0pO1xyXG4gICAgICAgIGlmICghYWNjZXB0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKCFzdG9yZURhdGFBc1RleHQgJiYgdGhpcy5zdXJ2ZXlQb3N0SWQpIHtcclxuICAgICAgICAgICAgdGhpcy51cGxvYWRGaWxlQ29yZShuYW1lLCBmaWxlLCB1cGxvYWRpbmdDYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHVwbG9hZEZpbGVDb3JlKG5hbWU6IHN0cmluZywgZmlsZTogRmlsZSwgdXBsb2FkaW5nQ2FsbGJhY2s6IChzdGF0dXM6IHN0cmluZykgPT4gYW55KSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmICh1cGxvYWRpbmdDYWxsYmFjaykgdXBsb2FkaW5nQ2FsbGJhY2soXCJ1cGxvYWRpbmdcIik7XHJcbiAgICAgICAgbmV3IGR4U3VydmV5U2VydmljZSgpLnNlbmRGaWxlKHRoaXMuc3VydmV5UG9zdElkLCBmaWxlLCBmdW5jdGlvbiAoc3VjY2VzczogYm9vbGVhbiwgcmVzcG9uc2U6IGFueSkge1xyXG4gICAgICAgICAgICBpZiAodXBsb2FkaW5nQ2FsbGJhY2spIHVwbG9hZGluZ0NhbGxiYWNrKHN1Y2Nlc3MgPyBcInN1Y2Nlc3NcIiA6IFwiZXJyb3JcIik7XHJcbiAgICAgICAgICAgIGlmIChzdWNjZXNzKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFZhbHVlKG5hbWUsIHJlc3BvbnNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgZ2V0UGFnZShpbmRleDogbnVtYmVyKTogUGFnZU1vZGVsIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5wYWdlc1tpbmRleF07XHJcbiAgICB9XHJcbiAgICBhZGRQYWdlKHBhZ2U6IFBhZ2VNb2RlbCkge1xyXG4gICAgICAgIGlmIChwYWdlID09IG51bGwpIHJldHVybjtcclxuICAgICAgICB0aGlzLnBhZ2VzLnB1c2gocGFnZSk7XHJcbiAgICAgICAgdGhpcy51cGRhdGVWaXNpYmxlSW5kZXhlcygpO1xyXG4gICAgfVxyXG4gICAgYWRkTmV3UGFnZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgcGFnZSA9IHRoaXMuY3JlYXRlTmV3UGFnZShuYW1lKTtcclxuICAgICAgICB0aGlzLmFkZFBhZ2UocGFnZSk7XHJcbiAgICAgICAgcmV0dXJuIHBhZ2U7XHJcbiAgICB9XHJcbiAgICByZW1vdmVQYWdlKHBhZ2U6IFBhZ2VNb2RlbCkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMucGFnZXMuaW5kZXhPZihwYWdlKTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5wYWdlcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIGlmICh0aGlzLmN1cnJlbnRQYWdlVmFsdWUgPT0gcGFnZSkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy5wYWdlcy5sZW5ndGggPiAwID8gdGhpcy5wYWdlc1swXSA6IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlVmlzaWJsZUluZGV4ZXMoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRRdWVzdGlvbkJ5TmFtZShuYW1lOiBzdHJpbmcsIGNhc2VJbnNlbnNpdGl2ZTogYm9vbGVhbiA9IGZhbHNlKTogSVF1ZXN0aW9uIHtcclxuICAgICAgICB2YXIgcXVlc3Rpb25zID0gdGhpcy5nZXRBbGxRdWVzdGlvbnMoKTtcclxuICAgICAgICBpZiAoY2FzZUluc2Vuc2l0aXZlKSBuYW1lID0gbmFtZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBxdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHF1ZXN0aW9uTmFtZSA9IHF1ZXN0aW9uc1tpXS5uYW1lO1xyXG4gICAgICAgICAgICBpZiAoY2FzZUluc2Vuc2l0aXZlKSBxdWVzdGlvbk5hbWUgPSBxdWVzdGlvbk5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICAgICAgaWYocXVlc3Rpb25OYW1lID09IG5hbWUpIHJldHVybiBxdWVzdGlvbnNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFF1ZXN0aW9uc0J5TmFtZXMobmFtZXM6IHN0cmluZ1tdLCBjYXNlSW5zZW5zaXRpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IElRdWVzdGlvbltdIHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICAgICAgaWYgKCFuYW1lcykgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgbmFtZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCFuYW1lc1tpXSkgY29udGludWU7XHJcbiAgICAgICAgICAgIHZhciBxdWVzdGlvbiA9IHRoaXMuZ2V0UXVlc3Rpb25CeU5hbWUobmFtZXNbaV0sIGNhc2VJbnNlbnNpdGl2ZSk7XHJcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbikgcmVzdWx0LnB1c2gocXVlc3Rpb24pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFBhZ2VCeVF1ZXN0aW9uKHF1ZXN0aW9uOiBJUXVlc3Rpb24pOiBQYWdlTW9kZWwge1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBwYWdlID0gdGhpcy5wYWdlc1tpXTtcclxuICAgICAgICAgICAgaWYgKHBhZ2UucXVlc3Rpb25zLmluZGV4T2YoPFF1ZXN0aW9uQmFzZT5xdWVzdGlvbikgPiAtMSkgcmV0dXJuIHBhZ2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFBhZ2VCeU5hbWUobmFtZTogc3RyaW5nKTogUGFnZU1vZGVsIHtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodGhpcy5wYWdlc1tpXS5uYW1lID09IG5hbWUpIHJldHVybiB0aGlzLnBhZ2VzW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRQYWdlc0J5TmFtZXMobmFtZXM6IHN0cmluZ1tdKTogUGFnZU1vZGVsW117XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGlmICghbmFtZXMpIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghbmFtZXNbaV0pIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB2YXIgcGFnZSA9IHRoaXMuZ2V0UGFnZUJ5TmFtZShuYW1lc1tpXSk7XHJcbiAgICAgICAgICAgIGlmIChwYWdlKSByZXN1bHQucHVzaChwYWdlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBbGxRdWVzdGlvbnModmlzaWJsZU9ubHk6IGJvb2xlYW4gPSBmYWxzZSk6IEFycmF5PElRdWVzdGlvbj4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXk8SVF1ZXN0aW9uPigpO1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZXNbaV0uYWRkUXVlc3Rpb25zVG9MaXN0KHJlc3VsdCwgdmlzaWJsZU9ubHkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZU5ld1BhZ2UobmFtZTogc3RyaW5nKSB7IHJldHVybiBuZXcgUGFnZU1vZGVsKG5hbWUpOyB9XHJcbiAgICBwcml2YXRlIG5vdGlmeVF1ZXN0aW9uT25WYWx1ZUNoYW5nZWQobmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55KSB7XHJcbiAgICAgICAgdmFyIHF1ZXN0aW9ucyA9IHRoaXMuZ2V0QWxsUXVlc3Rpb25zKCk7XHJcbiAgICAgICAgdmFyIHF1ZXN0aW9uID0gbnVsbDtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgcXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChxdWVzdGlvbnNbaV0ubmFtZSAhPSBuYW1lKSBjb250aW51ZTtcclxuICAgICAgICAgICAgcXVlc3Rpb24gPSBxdWVzdGlvbnNbaV07XHJcbiAgICAgICAgICAgIHRoaXMuZG9TdXJ2ZXlWYWx1ZUNoYW5nZWQocXVlc3Rpb24sIG5ld1ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5vblZhbHVlQ2hhbmdlZC5maXJlKHRoaXMsIHsgJ25hbWUnOiBuYW1lLCAncXVlc3Rpb24nOiBxdWVzdGlvbiwgJ3ZhbHVlJzogbmV3VmFsdWUgfSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG5vdGlmeUFsbFF1ZXN0aW9uc09uVmFsdWVDaGFuZ2VkKCkge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSB0aGlzLmdldEFsbFF1ZXN0aW9ucygpO1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBxdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5kb1N1cnZleVZhbHVlQ2hhbmdlZChxdWVzdGlvbnNbaV0sIHRoaXMuZ2V0VmFsdWUocXVlc3Rpb25zW2ldLm5hbWUpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZG9TdXJ2ZXlWYWx1ZUNoYW5nZWQocXVlc3Rpb246IElRdWVzdGlvbiwgbmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHF1ZXN0aW9uLm9uU3VydmV5VmFsdWVDaGFuZ2VkKG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY2hlY2tPblBhZ2VUcmlnZ2VycygpIHtcclxuICAgICAgICB2YXIgcXVlc3Rpb25zID0gdGhpcy5nZXRDdXJyZW50UGFnZVF1ZXN0aW9ucygpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBxdWVzdGlvbiA9IHF1ZXN0aW9uc1tpXTtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5nZXRWYWx1ZShxdWVzdGlvbi5uYW1lKTtcclxuICAgICAgICAgICAgdGhpcy5jaGVja1RyaWdnZXJzKHF1ZXN0aW9uLm5hbWUsIHZhbHVlLCB0cnVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldEN1cnJlbnRQYWdlUXVlc3Rpb25zKCk6IEFycmF5PFF1ZXN0aW9uQmFzZT4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICB2YXIgcGFnZSA9IHRoaXMuY3VycmVudFBhZ2U7XHJcbiAgICAgICAgaWYgKCFwYWdlKSByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcGFnZS5xdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHF1ZXN0aW9uID0gcGFnZS5xdWVzdGlvbnNbaV07XHJcbiAgICAgICAgICAgIGlmICghcXVlc3Rpb24udmlzaWJsZSB8fCAhcXVlc3Rpb24ubmFtZSkgY29udGludWU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHF1ZXN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY2hlY2tUcmlnZ2VycyhuYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBhbnksIGlzT25OZXh0UGFnZTogYm9vbGVhbikge1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCB0aGlzLnRyaWdnZXJzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciB0cmlnZ2VyID0gdGhpcy50cmlnZ2Vyc1tpXTtcclxuICAgICAgICAgICAgaWYgKHRyaWdnZXIubmFtZSA9PSBuYW1lICYmIHRyaWdnZXIuaXNPbk5leHRQYWdlID09IGlzT25OZXh0UGFnZSkge1xyXG4gICAgICAgICAgICAgICAgdHJpZ2dlci5jaGVjayhuZXdWYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGRvUXVlc3Rpb25zT25Mb2FkKCkge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSB0aGlzLmdldEFsbFF1ZXN0aW9ucyhmYWxzZSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcXVlc3Rpb25zW2ldLm9uU3VydmV5TG9hZCgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgcnVuQ29uZGl0aW9ucygpIHtcclxuICAgICAgICB0aGlzLnJ1bkNvbmRpdGlvbnNGb3JMaXN0KHRoaXMuZ2V0QWxsUXVlc3Rpb25zKGZhbHNlKSk7XHJcbiAgICAgICAgdGhpcy5ydW5Db25kaXRpb25zRm9yTGlzdCh0aGlzLnBhZ2VzKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcnVuQ29uZGl0aW9uc0Zvckxpc3QobGlzdDogQXJyYXk8SUNvbmRpdGlvblJ1bm5lcj4pIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGxpc3QubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgbGlzdFtpXS5ydW5Db25kaXRpb24odGhpcy52YWx1ZXNIYXNoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2VuZFJlc3VsdChwb3N0SWQ6IHN0cmluZyA9IG51bGwsIGNsaWVudElkOiBzdHJpbmcgPSBudWxsLCBpc1BhcnRpYWxDb21wbGV0ZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc0VkaXRNb2RlKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGlzUGFydGlhbENvbXBsZXRlZCAmJiB0aGlzLm9uUGFydGlhbFNlbmQpIHtcclxuICAgICAgICAgICAgdGhpcy5vblBhcnRpYWxTZW5kLmZpcmUodGhpcywgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICghdGhpcy5zdXJ2ZXlQb3N0SWQgJiYgcG9zdElkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VydmV5UG9zdElkID0gcG9zdElkO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuc3VydmV5UG9zdElkKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGNsaWVudElkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xpZW50SWQgPSBjbGllbnRJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzUGFydGlhbENvbXBsZXRlZCAmJiAhdGhpcy5jbGllbnRJZCkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBuZXcgZHhTdXJ2ZXlTZXJ2aWNlKCkuc2VuZFJlc3VsdCh0aGlzLnN1cnZleVBvc3RJZCwgdGhpcy5kYXRhLCBmdW5jdGlvbiAoc3VjY2VzczogYm9vbGVhbiwgcmVzcG9uc2U6IGFueSkge1xyXG4gICAgICAgICAgICBzZWxmLm9uU2VuZFJlc3VsdC5maXJlKHNlbGYsIHsgc3VjY2Vzczogc3VjY2VzcywgcmVzcG9uc2U6IHJlc3BvbnNlfSk7XHJcbiAgICAgICAgfSwgdGhpcy5jbGllbnRJZCwgaXNQYXJ0aWFsQ29tcGxldGVkKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRSZXN1bHQocmVzdWx0SWQ6IHN0cmluZywgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIG5ldyBkeFN1cnZleVNlcnZpY2UoKS5nZXRSZXN1bHQocmVzdWx0SWQsIG5hbWUsIGZ1bmN0aW9uIChzdWNjZXNzOiBib29sZWFuLCBkYXRhOiBhbnksIGRhdGFMaXN0OiBhbnlbXSwgcmVzcG9uc2U6IGFueSkge1xyXG4gICAgICAgICAgICBzZWxmLm9uR2V0UmVzdWx0LmZpcmUoc2VsZiwgeyBzdWNjZXNzOiBzdWNjZXNzLCBkYXRhOiBkYXRhLCBkYXRhTGlzdDogZGF0YUxpc3QsIHJlc3BvbnNlOiByZXNwb25zZSB9KTtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsb2FkU3VydmV5RnJvbVNlcnZpY2Uoc3VydmV5SWQ6IHN0cmluZyA9IG51bGwpIHtcclxuICAgICAgICBpZiAoc3VydmV5SWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zdXJ2ZXlJZCA9IHN1cnZleUlkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5pc0xvYWRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25Mb2FkaW5nU3VydmV5RnJvbVNlcnZpY2UoKTtcclxuICAgICAgICBuZXcgZHhTdXJ2ZXlTZXJ2aWNlKCkubG9hZFN1cnZleSh0aGlzLnN1cnZleUlkLCBmdW5jdGlvbiAoc3VjY2VzczogYm9vbGVhbiwgcmVzdWx0OiBzdHJpbmcsIHJlc3BvbnNlOiBhbnkpIHtcclxuICAgICAgICAgICAgc2VsZi5pc0xvYWRpbmcgPSBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKHN1Y2Nlc3MgJiYgcmVzdWx0KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldEpzb25PYmplY3QocmVzdWx0KTtcclxuICAgICAgICAgICAgICAgIHNlbGYubm90aWZ5QWxsUXVlc3Rpb25zT25WYWx1ZUNoYW5nZWQoKTtcclxuICAgICAgICAgICAgICAgIHNlbGYub25Mb2FkU3VydmV5RnJvbVNlcnZpY2UoKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZGluZ1N1cnZleUZyb21TZXJ2aWNlKCkge1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZFN1cnZleUZyb21TZXJ2aWNlKCkge1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjaGVja1BhZ2VWaXNpYmlsaXR5KHF1ZXN0aW9uOiBJUXVlc3Rpb24sIG9sZFF1ZXN0aW9uVmlzaWJsZTogYm9vbGVhbikge1xyXG4gICAgICAgIHZhciBwYWdlID0gdGhpcy5nZXRQYWdlQnlRdWVzdGlvbihxdWVzdGlvbik7XHJcbiAgICAgICAgaWYgKCFwYWdlKSByZXR1cm47XHJcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gcGFnZS5pc1Zpc2libGU7XHJcbiAgICAgICAgaWYgKG5ld1ZhbHVlICE9IHBhZ2UuZ2V0SXNQYWdlVmlzaWJsZShxdWVzdGlvbikgfHwgb2xkUXVlc3Rpb25WaXNpYmxlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucGFnZVZpc2liaWxpdHlDaGFuZ2VkKHBhZ2UsIG5ld1ZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHVwZGF0ZVZpc2libGVJbmRleGVzKCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlUGFnZVZpc2libGVJbmRleGVzKHRoaXMuc2hvd1BhZ2VOdW1iZXJzKTtcclxuICAgICAgICBpZiAodGhpcy5zaG93UXVlc3Rpb25OdW1iZXJzID09IFwib25QYWdlXCIpIHtcclxuICAgICAgICAgICAgdmFyIHZpc1BhZ2VzID0gdGhpcy52aXNpYmxlUGFnZXM7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmlzUGFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIHRoaXMudXBkYXRlUXVlc3Rpb25WaXNpYmxlSW5kZXhlcyh2aXNQYWdlc1tpXS5xdWVzdGlvbnMsIHRydWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy51cGRhdGVRdWVzdGlvblZpc2libGVJbmRleGVzKHRoaXMuZ2V0QWxsUXVlc3Rpb25zKGZhbHNlKSwgdGhpcy5zaG93UXVlc3Rpb25OdW1iZXJzID09IFwib25cIik7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVQYWdlVmlzaWJsZUluZGV4ZXMoc2hvd0luZGV4OiBib29sZWFuKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucGFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlc1tpXS52aXNpYmxlSW5kZXggPSB0aGlzLnBhZ2VzW2ldLnZpc2libGUgPyAoaW5kZXgrKykgOiAtMTtcclxuICAgICAgICAgICAgdGhpcy5wYWdlc1tpXS5udW0gPSBzaG93SW5kZXggJiYgdGhpcy5wYWdlc1tpXS52aXNpYmxlID8gdGhpcy5wYWdlc1tpXS52aXNpYmxlSW5kZXggKyAxIDogLTE7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVRdWVzdGlvblZpc2libGVJbmRleGVzKHF1ZXN0aW9uczogSVF1ZXN0aW9uW10sIHNob3dJbmRleDogYm9vbGVhbikge1xyXG4gICAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgcXVlc3Rpb25zW2ldLnNldFZpc2libGVJbmRleChzaG93SW5kZXggJiYgcXVlc3Rpb25zW2ldLnZpc2libGUgJiYgcXVlc3Rpb25zW2ldLmhhc1RpdGxlID8gKGluZGV4KyspIDogLTEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgc2V0SnNvbk9iamVjdChqc29uT2JqOiBhbnkpIHtcclxuICAgICAgICBpZiAoIWpzb25PYmopIHJldHVybjtcclxuICAgICAgICB0aGlzLmpzb25FcnJvcnMgPSBudWxsO1xyXG4gICAgICAgIHZhciBqc29uQ29udmVydGVyID0gbmV3IEpzb25PYmplY3QoKTtcclxuICAgICAgICBqc29uQ29udmVydGVyLnRvT2JqZWN0KGpzb25PYmosIHRoaXMpO1xyXG4gICAgICAgIGlmIChqc29uQ29udmVydGVyLmVycm9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuanNvbkVycm9ycyA9IGpzb25Db252ZXJ0ZXIuZXJyb3JzO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVByb2Nlc3NlZFRleHRWYWx1ZXMoKTtcclxuICAgICAgICBpZiAodGhpcy5oYXNDb29raWUpIHtcclxuICAgICAgICAgICAgdGhpcy5kb0NvbXBsZXRlKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZG9RdWVzdGlvbnNPbkxvYWQoKTtcclxuICAgICAgICB0aGlzLnJ1bkNvbmRpdGlvbnMoKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2libGVJbmRleGVzKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25CZWZvcmVDcmVhdGluZygpIHsgfVxyXG4gICAgcHJvdGVjdGVkIG9uQ3JlYXRpbmcoKSB7IH1cclxuICAgIHByaXZhdGUgdXBkYXRlUHJvY2Vzc2VkVGV4dFZhbHVlcygpIHtcclxuICAgICAgICB0aGlzLnByb2Nlc3NlZFRleHRWYWx1ZXMgPSB7fTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzZWRUZXh0VmFsdWVzW1wicGFnZW5vXCJdID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIHNlbGYuY3VycmVudFBhZ2UgIT0gbnVsbCA/IHNlbGYudmlzaWJsZVBhZ2VzLmluZGV4T2Yoc2VsZi5jdXJyZW50UGFnZSkgKyAxIDogMDsgfVxyXG4gICAgICAgIHRoaXMucHJvY2Vzc2VkVGV4dFZhbHVlc1tcInBhZ2Vjb3VudFwiXSA9IGZ1bmN0aW9uIChuYW1lKSB7IHJldHVybiBzZWxmLnZpc2libGVQYWdlQ291bnQ7IH1cclxuICAgICAgICB2YXIgcXVlc3Rpb25zID0gdGhpcy5nZXRBbGxRdWVzdGlvbnMoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFF1ZXN0aW9uVG9Qcm9jZXNzZWRUZXh0VmFsdWVzKHF1ZXN0aW9uc1tpXSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBhZGRRdWVzdGlvblRvUHJvY2Vzc2VkVGV4dFZhbHVlcyhxdWVzdGlvbjogSVF1ZXN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzZWRUZXh0VmFsdWVzW3F1ZXN0aW9uLm5hbWUudG9Mb3dlckNhc2UoKV0gPSBcInF1ZXN0aW9uXCI7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGhhc1Byb2Nlc3NlZFRleHRWYWx1ZShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgZmlyc3ROYW1lID0gbmV3IFByb2Nlc3NWYWx1ZSgpLmdldEZpcnN0TmFtZShuYW1lKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzZWRUZXh0VmFsdWVzW2ZpcnN0TmFtZS50b0xvd2VyQ2FzZSgpXTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0UHJvY2Vzc2VkVGV4dFZhbHVlKG5hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgdmFyIGZpcnN0TmFtZSA9IG5ldyBQcm9jZXNzVmFsdWUoKS5nZXRGaXJzdE5hbWUobmFtZSk7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMucHJvY2Vzc2VkVGV4dFZhbHVlc1tmaXJzdE5hbWUudG9Mb3dlckNhc2UoKV07XHJcbiAgICAgICAgaWYgKCF2YWwpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlmICh2YWwgPT0gXCJ2YXJpYWJsZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFZhcmlhYmxlKG5hbWUudG9Mb3dlckNhc2UoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWwgPT0gXCJxdWVzdGlvblwiKSB7XHJcbiAgICAgICAgICAgIHZhciBxdWVzdGlvbiA9IHRoaXMuZ2V0UXVlc3Rpb25CeU5hbWUoZmlyc3ROYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgaWYgKCFxdWVzdGlvbikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgICAgIG5hbWUgPSBxdWVzdGlvbi5uYW1lICsgbmFtZS5zdWJzdHIoZmlyc3ROYW1lLmxlbmd0aCk7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvY2Vzc1ZhbHVlKCkuZ2V0VmFsdWUobmFtZSwgdGhpcy52YWx1ZXNIYXNoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbCA9PSBcInZhbHVlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm9jZXNzVmFsdWUoKS5nZXRWYWx1ZShuYW1lLCB0aGlzLnZhbHVlc0hhc2gpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjbGVhckludmlzaWJsZVF1ZXN0aW9uVmFsdWVzKCkge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSB0aGlzLmdldEFsbFF1ZXN0aW9ucygpO1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBxdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHF1ZXN0aW9uc1tpXS52aXNpYmxlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShxdWVzdGlvbnNbaV0ubmFtZSwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFZhcmlhYmxlKG5hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgaWYgKCFuYW1lKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gdGhpcy52YXJpYWJsZXNIYXNoW25hbWVdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldFZhcmlhYmxlKG5hbWU6IHN0cmluZywgbmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIGlmICghbmFtZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudmFyaWFibGVzSGFzaFtuYW1lXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc2VkVGV4dFZhbHVlc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gXCJ2YXJpYWJsZVwiO1xyXG4gICAgfVxyXG4gICAgLy9JU3VydmV5IGRhdGFcclxuICAgIHByaXZhdGUgZ2V0VW5iaW5kVmFsdWUodmFsdWU6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIC8vZG8gbm90IHJldHVybiB0aGUgc2FtZSBvYmplY3QgaW5zdGFuY2UhISFcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0VmFsdWUobmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBpZiAoIW5hbWUgfHwgbmFtZS5sZW5ndGggPT0gMCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52YWx1ZXNIYXNoW25hbWVdO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFVuYmluZFZhbHVlKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHNldFZhbHVlKG5hbWU6IHN0cmluZywgbmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsdWVFcXVhbChuYW1lLCBuZXdWYWx1ZSkpIHJldHVybjtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPT0gXCJcIiB8fCBuZXdWYWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnZhbHVlc0hhc2hbbmFtZV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmdldFVuYmluZFZhbHVlKG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZXNIYXNoW25hbWVdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc2VkVGV4dFZhbHVlc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gXCJ2YWx1ZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vdGlmeVF1ZXN0aW9uT25WYWx1ZUNoYW5nZWQobmFtZSwgbmV3VmFsdWUpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tUcmlnZ2VycyhuYW1lLCBuZXdWYWx1ZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMucnVuQ29uZGl0aW9ucygpO1xyXG4gICAgICAgIHRoaXMudHJ5R29OZXh0UGFnZUF1dG9tYXRpYyhuYW1lKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaXNWYWx1ZUVxdWFsKG5hbWU6IHN0cmluZywgbmV3VmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChuZXdWYWx1ZSA9PSBcIlwiKSBuZXdWYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy5nZXRWYWx1ZShuYW1lKTtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPT09IG51bGwgfHwgb2xkVmFsdWUgPT09IG51bGwpIHJldHVybiBuZXdWYWx1ZSA9PT0gb2xkVmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNUd29WYWx1ZUVxdWFscyhuZXdWYWx1ZSwgb2xkVmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc1R3b1ZhbHVlRXF1YWxzKHg6IGFueSwgeTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHggPT09IHkpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmICghKHggaW5zdGFuY2VvZiBPYmplY3QpIHx8ICEoeSBpbnN0YW5jZW9mIE9iamVjdCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHgpIHtcclxuICAgICAgICAgICAgaWYgKCF4Lmhhc093blByb3BlcnR5KHApKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKCF5Lmhhc093blByb3BlcnR5KHApKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh4W3BdID09PSB5W3BdKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoeFtwXSkgIT09IFwib2JqZWN0XCIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVHdvVmFsdWVFcXVhbHMoeFtwXSwgeVtwXSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChwIGluIHkpIHtcclxuICAgICAgICAgICAgaWYgKHkuaGFzT3duUHJvcGVydHkocCkgJiYgIXguaGFzT3duUHJvcGVydHkocCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHRyeUdvTmV4dFBhZ2VBdXRvbWF0aWMobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdvTmV4dFBhZ2VBdXRvbWF0aWMgfHwgIXRoaXMuY3VycmVudFBhZ2UpIHJldHVybjtcclxuICAgICAgICB2YXIgcXVlc3Rpb24gPSB0aGlzLmdldFF1ZXN0aW9uQnlOYW1lKG5hbWUpO1xyXG4gICAgICAgIGlmIChxdWVzdGlvbiAmJiAhcXVlc3Rpb24uc3VwcG9ydEdvTmV4dFBhZ2VBdXRvbWF0aWMoKSkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSB0aGlzLmdldEN1cnJlbnRQYWdlUXVlc3Rpb25zKCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldFZhbHVlKHF1ZXN0aW9uc1tpXS5uYW1lKSkgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuY3VycmVudFBhZ2UuaGFzRXJyb3JzKHRydWUsIGZhbHNlKSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNMYXN0UGFnZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0UGFnZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRDb21tZW50KG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuZGF0YVtuYW1lICsgdGhpcy5jb21tZW50UHJlZml4XTtcclxuICAgICAgICBpZiAocmVzdWx0ID09IG51bGwpIHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHNldENvbW1lbnQobmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbmFtZSA9IG5hbWUgKyB0aGlzLmNvbW1lbnRQcmVmaXg7XHJcbiAgICAgICAgaWYgKG5ld1ZhbHVlID09IFwiXCIgfHwgbmV3VmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy52YWx1ZXNIYXNoW25hbWVdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVzSGFzaFtuYW1lXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnRyeUdvTmV4dFBhZ2VBdXRvbWF0aWMobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcXVlc3Rpb25WaXNpYmlsaXR5Q2hhbmdlZChxdWVzdGlvbjogSVF1ZXN0aW9uLCBuZXdWYWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmlzaWJsZUluZGV4ZXMoKTtcclxuICAgICAgICB0aGlzLm9uVmlzaWJsZUNoYW5nZWQuZmlyZSh0aGlzLCB7ICdxdWVzdGlvbic6IHF1ZXN0aW9uLCAnbmFtZSc6IHF1ZXN0aW9uLm5hbWUsICd2aXNpYmxlJzogbmV3VmFsdWUgfSk7XHJcbiAgICAgICAgdGhpcy5jaGVja1BhZ2VWaXNpYmlsaXR5KHF1ZXN0aW9uLCAhbmV3VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcGFnZVZpc2liaWxpdHlDaGFuZ2VkKHBhZ2U6IElQYWdlLCBuZXdWYWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmlzaWJsZUluZGV4ZXMoKTtcclxuICAgICAgICB0aGlzLm9uUGFnZVZpc2libGVDaGFuZ2VkLmZpcmUodGhpcywgeyAncGFnZSc6IHBhZ2UsICd2aXNpYmxlJzogbmV3VmFsdWUgfSk7XHJcbiAgICB9XHJcbiAgICBxdWVzdGlvbkFkZGVkKHF1ZXN0aW9uOiBJUXVlc3Rpb24sIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2libGVJbmRleGVzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRRdWVzdGlvblRvUHJvY2Vzc2VkVGV4dFZhbHVlcyhxdWVzdGlvbik7XHJcbiAgICAgICAgdGhpcy5vblF1ZXN0aW9uQWRkZWQuZmlyZSh0aGlzLCB7ICdxdWVzdGlvbic6IHF1ZXN0aW9uLCAnbmFtZSc6IHF1ZXN0aW9uLm5hbWUsICdpbmRleCc6IGluZGV4IH0pO1xyXG4gICAgfVxyXG4gICAgcXVlc3Rpb25SZW1vdmVkKHF1ZXN0aW9uOiBJUXVlc3Rpb24pIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2libGVJbmRleGVzKCk7XHJcbiAgICAgICAgdGhpcy5vblF1ZXN0aW9uUmVtb3ZlZC5maXJlKHRoaXMsIHsgJ3F1ZXN0aW9uJzogcXVlc3Rpb24sICduYW1lJzogcXVlc3Rpb24ubmFtZSB9KTtcclxuICAgIH1cclxuICAgIHZhbGlkYXRlUXVlc3Rpb24obmFtZTogc3RyaW5nKTogU3VydmV5RXJyb3Ige1xyXG4gICAgICAgIGlmICh0aGlzLm9uVmFsaWRhdGVRdWVzdGlvbi5pc0VtcHR5KSByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgb3B0aW9ucyA9IHsgbmFtZTogbmFtZSwgdmFsdWU6IHRoaXMuZ2V0VmFsdWUobmFtZSksIGVycm9yOiBudWxsIH07XHJcbiAgICAgICAgdGhpcy5vblZhbGlkYXRlUXVlc3Rpb24uZmlyZSh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucy5lcnJvciA/IG5ldyBDdXN0b21FcnJvcihvcHRpb25zLmVycm9yKSA6IG51bGw7XHJcbiAgICB9XHJcbiAgICBwcm9jZXNzSHRtbChodG1sOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBvcHRpb25zID0geyBodG1sOiBodG1sIH07XHJcbiAgICAgICAgdGhpcy5vblByb2Nlc3NIdG1sLmZpcmUodGhpcywgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc1RleHQob3B0aW9ucy5odG1sKTtcclxuICAgIH1cclxuICAgIHByb2Nlc3NUZXh0KHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dFByZVByb2Nlc3Nvci5wcm9jZXNzKHRleHQpO1xyXG4gICAgfVxyXG4gICAgLy9JU3VydmV5VHJpZ2dlck93bmVyXHJcbiAgICBnZXRPYmplY3RzKHBhZ2VzOiBzdHJpbmdbXSwgcXVlc3Rpb25zOiBzdHJpbmdbXSk6IGFueVtde1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShyZXN1bHQsIHRoaXMuZ2V0UGFnZXNCeU5hbWVzKHBhZ2VzKSk7XHJcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkocmVzdWx0LCB0aGlzLmdldFF1ZXN0aW9uc0J5TmFtZXMocXVlc3Rpb25zKSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHNldFRyaWdnZXJWYWx1ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnksIGlzVmFyaWFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoIW5hbWUpIHJldHVybjtcclxuICAgICAgICBpZiAoaXNWYXJpYWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhcmlhYmxlKG5hbWUsIHZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKG5hbWUsIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJzdXJ2ZXlcIiwgW3sgbmFtZTogXCJsb2NhbGVcIiwgY2hvaWNlczogKCkgPT4geyByZXR1cm4gc3VydmV5TG9jYWxpemF0aW9uLmdldExvY2FsZXMoKSB9IH0sXHJcbiAgICBcInRpdGxlXCIsIFwiY29tcGxldGVkSHRtbDpodG1sXCIsIHsgbmFtZTogXCJwYWdlc1wiLCBjbGFzc05hbWU6IFwicGFnZVwiIH0sXHJcbiAgICB7IG5hbWU6IFwicXVlc3Rpb25zXCIsIGJhc2VDbGFzc05hbWU6IFwicXVlc3Rpb25cIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gbnVsbDsgfSwgb25TZXRWYWx1ZTogZnVuY3Rpb24gKG9iaiwgdmFsdWUsIGpzb25Db252ZXJ0ZXIpIHsgdmFyIHBhZ2UgPSBvYmouYWRkTmV3UGFnZShcIlwiKTsganNvbkNvbnZlcnRlci50b09iamVjdCh7IHF1ZXN0aW9uczogdmFsdWUgfSwgcGFnZSk7IH0gfSxcclxuICAgIHsgbmFtZTogXCJ0cmlnZ2Vyczp0cmlnZ2Vyc1wiLCBiYXNlQ2xhc3NOYW1lOiBcInN1cnZleXRyaWdnZXJcIiwgY2xhc3NOYW1lUGFydDogXCJ0cmlnZ2VyXCIgfSxcclxuICAgIFwic3VydmV5SWRcIiwgXCJzdXJ2ZXlQb3N0SWRcIiwgXCJjb29raWVOYW1lXCIsIFwic2VuZFJlc3VsdE9uUGFnZU5leHQ6Ym9vbGVhblwiLFxyXG4gICAgeyBuYW1lOiBcInNob3dOYXZpZ2F0aW9uQnV0dG9uczpib29sZWFuXCIsIGRlZmF1bHQ6IHRydWUgfSwgeyBuYW1lOiBcInNob3dUaXRsZTpib29sZWFuXCIsIGRlZmF1bHQ6IHRydWUgfSwgeyBuYW1lOiBcInNob3dQYWdlVGl0bGVzOmJvb2xlYW5cIiwgZGVmYXVsdDogdHJ1ZSB9LFxyXG4gICAgXCJzaG93UGFnZU51bWJlcnM6Ym9vbGVhblwiLCB7IG5hbWU6IFwic2hvd1F1ZXN0aW9uTnVtYmVyc1wiLCBkZWZhdWx0OiBcIm9uXCIsIGNob2ljZXM6IFtcIm9uXCIsIFwib25QYWdlXCIsIFwib2ZmXCJdIH0sXHJcbiAgICB7IG5hbWU6IFwicXVlc3Rpb25UaXRsZUxvY2F0aW9uXCIsIGRlZmF1bHQ6IFwidG9wXCIsIGNob2ljZXM6IFtcInRvcFwiLCBcImJvdHRvbVwiXSB9LFxyXG4gICAgeyBuYW1lOiBcInNob3dQcm9ncmVzc0JhclwiLCBkZWZhdWx0OiBcIm9mZlwiLCBjaG9pY2VzOiBbXCJvZmZcIiwgXCJ0b3BcIiwgXCJib3R0b21cIl0gfSxcclxuICAgIHsgbmFtZTogXCJtb2RlXCIsIGRlZmF1bHQ6IFwiZWRpdFwiLCBjaG9pY2VzOiBbXCJlZGl0XCIsIFwiZGlzcGxheVwiXSB9LFxyXG4gICAgeyBuYW1lOiBcInN0b3JlT3RoZXJzQXNDb21tZW50OmJvb2xlYW5cIiwgZGVmYXVsdDogdHJ1ZSB9LCBcImdvTmV4dFBhZ2VBdXRvbWF0aWM6Ym9vbGVhblwiLCBcImNsZWFySW52aXNpYmxlVmFsdWVzOmJvb2xlYW5cIixcclxuICAgIHsgbmFtZTogXCJwYWdlUHJldlRleHRcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmoucGFnZVByZXZUZXh0VmFsdWU7IH0gfSxcclxuICAgIHsgbmFtZTogXCJwYWdlTmV4dFRleHRcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmoucGFnZU5leHRUZXh0VmFsdWU7IH0gfSxcclxuICAgIHsgbmFtZTogXCJjb21wbGV0ZVRleHRcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmouY29tcGxldGVUZXh0VmFsdWU7IH0gfSxcclxuICAgIHsgbmFtZTogXCJyZXF1aXJlZFRleHRcIiwgZGVmYXVsdDogXCIqXCIgfSwgXCJxdWVzdGlvblN0YXJ0SW5kZXhcIiwgXCJxdWVzdGlvblRpdGxlVGVtcGxhdGVcIl0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3N1cnZleS50c1xuICoqLyIsImV4cG9ydCBjbGFzcyBkeFN1cnZleVNlcnZpY2Uge1xyXG4gICAgcHVibGljIHN0YXRpYyBzZXJ2aWNlVXJsOiBzdHJpbmcgPSBcImh0dHBzOi8vZHhzdXJ2ZXlhcGkuYXp1cmV3ZWJzaXRlcy5uZXQvYXBpL1N1cnZleVwiO1xyXG4gICAgLy9wdWJsaWMgc3RhdGljIHNlcnZpY2VVcmw6IHN0cmluZyA9IFwiaHR0cDovL2xvY2FsaG9zdDo1MDQ4OC9hcGkvU3VydmV5XCI7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsb2FkU3VydmV5KHN1cnZleUlkOiBzdHJpbmcsIG9uTG9hZDogKHN1Y2Nlc3M6IGJvb2xlYW4sIHJlc3VsdDogc3RyaW5nLCByZXNwb25zZTogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCBkeFN1cnZleVNlcnZpY2Uuc2VydmljZVVybCArICcvZ2V0U3VydmV5P3N1cnZleUlkPScgKyBzdXJ2ZXlJZCk7XHJcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICBvbkxvYWQoeGhyLnN0YXR1cyA9PSAyMDAsIHJlc3VsdCwgeGhyLnJlc3BvbnNlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2VuZFJlc3VsdChwb3N0SWQ6IHN0cmluZywgcmVzdWx0OiBKU09OLCBvblNlbmRSZXN1bHQ6IChzdWNjZXNzOiBib29sZWFuLCByZXNwb25zZTogYW55KT0+IHZvaWQsIGNsaWVudElkOiBzdHJpbmcgPSBudWxsLCBpc1BhcnRpYWxDb21wbGV0ZWQ6IGJvb2xlYW4gPSBmYWxzZSkge1xyXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignUE9TVCcsIGR4U3VydmV5U2VydmljZS5zZXJ2aWNlVXJsICsgJy9wb3N0LycpO1xyXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vanNvbjsgY2hhcnNldD11dGYtOCcpO1xyXG4gICAgICAgIHZhciBkYXRhID0geyBwb3N0SWQ6IHBvc3RJZCwgc3VydmV5UmVzdWx0OiBKU09OLnN0cmluZ2lmeShyZXN1bHQpIH07XHJcbiAgICAgICAgaWYgKGNsaWVudElkKSBkYXRhWydjbGllbnRJZCddID0gY2xpZW50SWQ7XHJcbiAgICAgICAgaWYgKGlzUGFydGlhbENvbXBsZXRlZCkgZGF0YVsnaXNQYXJ0aWFsQ29tcGxldGVkJ10gPSB0cnVlO1xyXG4gICAgICAgIHZhciBkYXRhU3RyaW5naWZ5OiBzdHJpbmcgPSBKU09OLnN0cmluZ2lmeShkYXRhKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIW9uU2VuZFJlc3VsdCkgcmV0dXJuO1xyXG4gICAgICAgICAgICBvblNlbmRSZXN1bHQoeGhyLnN0YXR1cyA9PSAyMDAsIHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIuc2VuZChkYXRhU3RyaW5naWZ5KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZW5kRmlsZShwb3N0SWQ6IHN0cmluZywgZmlsZTogRmlsZSwgb25TZW5kRmlsZTogKHN1Y2Nlc3M6IGJvb2xlYW4sIHJlc3BvbnNlOiBhbnkpID0+IHZvaWQpIHtcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IHhoci5vbmVycm9yID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoIW9uU2VuZEZpbGUpIHJldHVybjtcclxuICAgICAgICAgICAgb25TZW5kRmlsZSh4aHIuc3RhdHVzID09IDIwMCwgSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5vcGVuKFwiUE9TVFwiLCBkeFN1cnZleVNlcnZpY2Uuc2VydmljZVVybCArICcvdXBsb2FkLycsIHRydWUpO1xyXG4gICAgICAgIHZhciBmb3JtRGF0YSA9IG5ldyBGb3JtRGF0YSgpO1xyXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChcImZpbGVcIiwgZmlsZSk7XHJcbiAgICAgICAgZm9ybURhdGEuYXBwZW5kKFwicG9zdElkXCIsIHBvc3RJZCk7XHJcbiAgICAgICAgeGhyLnNlbmQoZm9ybURhdGEpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFJlc3VsdChyZXN1bHRJZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcsIG9uR2V0UmVzdWx0OiAoc3VjY2VzczogYm9vbGVhbiwgZGF0YTogYW55LCBkYXRhTGlzdDogQXJyYXk8YW55PiwgcmVzcG9uc2U6IGFueSkgPT4gdm9pZCkge1xyXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB2YXIgZGF0YSA9ICdyZXN1bHRJZD0nICsgcmVzdWx0SWQgKyAnJm5hbWU9JyArIG5hbWU7XHJcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIGR4U3VydmV5U2VydmljZS5zZXJ2aWNlVXJsICsgJy9nZXRSZXN1bHQ/JyArIGRhdGEpO1xyXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHZhciByZXN1bHQgPSBudWxsO1xyXG4gICAgICAgICAgICB2YXIgbGlzdCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICAgICAgbGlzdCA9IFtdO1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIHJlc3VsdC5RdWVzdGlvblJlc3VsdCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhciBlbCA9IHsgbmFtZToga2V5LCB2YWx1ZTogcmVzdWx0LlF1ZXN0aW9uUmVzdWx0W2tleV0gfTtcclxuICAgICAgICAgICAgICAgICAgICBsaXN0LnB1c2goZWwpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9uR2V0UmVzdWx0KHhoci5zdGF0dXMgPT0gMjAwLCByZXN1bHQsIGxpc3QsIHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGlzQ29tcGxldGVkKHJlc3VsdElkOiBzdHJpbmcsIGNsaWVudElkOiBzdHJpbmcsIG9uSXNDb21wbGV0ZWQ6IChzdWNjZXNzOiBib29sZWFuLCByZXN1bHQ6IHN0cmluZywgcmVzcG9uc2U6IGFueSkgPT4gdm9pZCkge1xyXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB2YXIgZGF0YSA9ICdyZXN1bHRJZD0nICsgcmVzdWx0SWQgKyAnJmNsaWVudElkPScgKyBjbGllbnRJZDtcclxuICAgICAgICB4aHIub3BlbignR0VUJywgZHhTdXJ2ZXlTZXJ2aWNlLnNlcnZpY2VVcmwgKyAnL2lzQ29tcGxldGVkPycgKyBkYXRhKTtcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHhoci5zdGF0dXMgPT0gMjAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSBKU09OLnBhcnNlKHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgb25Jc0NvbXBsZXRlZCh4aHIuc3RhdHVzID09IDIwMCwgcmVzdWx0LCB4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2R4U3VydmV5U2VydmljZS50c1xuICoqLyIsImltcG9ydCB7QmFzZSwgSGFzaFRhYmxlfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4vanNvbm9iamVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFRyaWdnZXIgZXh0ZW5kcyBCYXNlIHtcclxuICAgIHN0YXRpYyBvcGVyYXRvcnNWYWx1ZTogSGFzaFRhYmxlPEZ1bmN0aW9uPiA9IG51bGw7XHJcbiAgICBzdGF0aWMgZ2V0IG9wZXJhdG9ycygpIHtcclxuICAgICAgICBpZiAoVHJpZ2dlci5vcGVyYXRvcnNWYWx1ZSAhPSBudWxsKSByZXR1cm4gVHJpZ2dlci5vcGVyYXRvcnNWYWx1ZTtcclxuICAgICAgICBUcmlnZ2VyLm9wZXJhdG9yc1ZhbHVlID0ge1xyXG4gICAgICAgICAgICBlbXB0eTogZnVuY3Rpb24gKHZhbHVlLCBleHBlY3RlZFZhbHVlKSB7IHJldHVybiAhdmFsdWU7IH0sXHJcbiAgICAgICAgICAgIG5vdGVtcHR5OiBmdW5jdGlvbiAodmFsdWUsIGV4cGVjdGVkVmFsdWUpIHsgcmV0dXJuICEoIXZhbHVlKTsgfSxcclxuICAgICAgICAgICAgZXF1YWw6IGZ1bmN0aW9uICh2YWx1ZSwgZXhwZWN0ZWRWYWx1ZSkgeyByZXR1cm4gdmFsdWUgPT0gZXhwZWN0ZWRWYWx1ZTsgfSxcclxuICAgICAgICAgICAgbm90ZXF1YWw6IGZ1bmN0aW9uICh2YWx1ZSwgZXhwZWN0ZWRWYWx1ZSkgeyByZXR1cm4gdmFsdWUgIT0gZXhwZWN0ZWRWYWx1ZTsgfSxcclxuICAgICAgICAgICAgY29udGFpbnM6IGZ1bmN0aW9uICh2YWx1ZSwgZXhwZWN0ZWRWYWx1ZSkgeyByZXR1cm4gdmFsdWUgJiYgdmFsdWVbXCJpbmRleE9mXCJdICYmIHZhbHVlLmluZGV4T2YoZXhwZWN0ZWRWYWx1ZSkgPiAtMTsgfSxcclxuICAgICAgICAgICAgbm90Y29udGFpbnM6IGZ1bmN0aW9uICh2YWx1ZSwgZXhwZWN0ZWRWYWx1ZSkgeyByZXR1cm4gIXZhbHVlIHx8ICF2YWx1ZVtcImluZGV4T2ZcIl0gfHwgdmFsdWUuaW5kZXhPZihleHBlY3RlZFZhbHVlKSA9PSAtMTsgfSxcclxuICAgICAgICAgICAgZ3JlYXRlcjogZnVuY3Rpb24gKHZhbHVlLCBleHBlY3RlZFZhbHVlKSB7IHJldHVybiB2YWx1ZSA+IGV4cGVjdGVkVmFsdWU7IH0sXHJcbiAgICAgICAgICAgIGxlc3M6IGZ1bmN0aW9uICh2YWx1ZSwgZXhwZWN0ZWRWYWx1ZSkgeyByZXR1cm4gdmFsdWUgPCBleHBlY3RlZFZhbHVlOyB9LFxyXG4gICAgICAgICAgICBncmVhdGVyb3JlcXVhbDogZnVuY3Rpb24gKHZhbHVlLCBleHBlY3RlZFZhbHVlKSB7IHJldHVybiB2YWx1ZSA+PSBleHBlY3RlZFZhbHVlOyB9LFxyXG4gICAgICAgICAgICBsZXNzb3JlcXVhbDogZnVuY3Rpb24gKHZhbHVlLCBleHBlY3RlZFZhbHVlKSB7IHJldHVybiB2YWx1ZSA8PSBleHBlY3RlZFZhbHVlOyB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICByZXR1cm4gVHJpZ2dlci5vcGVyYXRvcnNWYWx1ZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb3BWYWx1ZTogc3RyaW5nID0gXCJlcXVhbFwiO1xyXG4gICAgcHVibGljIHZhbHVlOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBvcGVyYXRvcigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IG9wZXJhdG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmICghVHJpZ2dlci5vcGVyYXRvcnNbdmFsdWVdKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5vcFZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2hlY2sodmFsdWU6IGFueSkge1xyXG4gICAgICAgIGlmIChUcmlnZ2VyLm9wZXJhdG9yc1t0aGlzLm9wZXJhdG9yXSh2YWx1ZSwgdGhpcy52YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy5vblN1Y2Nlc3MoKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLm9uRmFpbHVyZSgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblN1Y2Nlc3MoKSB7IH1cclxuICAgIHByb3RlY3RlZCBvbkZhaWx1cmUoKSB7IH1cclxufVxyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJU3VydmV5VHJpZ2dlck93bmVyIHtcclxuICAgIGdldE9iamVjdHMocGFnZXM6IHN0cmluZ1tdLCBxdWVzdGlvbnM6IHN0cmluZ1tdKTogYW55W107XHJcbiAgICBkb0NvbXBsZXRlKCk7XHJcbiAgICBzZXRUcmlnZ2VyVmFsdWUobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55LCBpc1ZhcmlhYmxlOiBib29sZWFuKTtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN1cnZleVRyaWdnZXIgZXh0ZW5kcyBUcmlnZ2VyIHtcclxuICAgIHB1YmxpYyBuYW1lOiBzdHJpbmc7XHJcbiAgICBwcm90ZWN0ZWQgb3duZXI6IElTdXJ2ZXlUcmlnZ2VyT3duZXIgPSBudWxsO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRPd25lcihvd25lcjogSVN1cnZleVRyaWdnZXJPd25lcikge1xyXG4gICAgICAgIHRoaXMub3duZXIgPSBvd25lcjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXNPbk5leHRQYWdlKCkgeyByZXR1cm4gZmFsc2U7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN1cnZleVRyaWdnZXJWaXNpYmxlIGV4dGVuZHMgU3VydmV5VHJpZ2dlciB7XHJcbiAgICBwdWJsaWMgcGFnZXM6IHN0cmluZ1tdID0gW107XHJcbiAgICBwdWJsaWMgcXVlc3Rpb25zOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7IHJldHVybiBcInZpc2libGV0cmlnZ2VyXCI7IH1cclxuICAgIHByb3RlY3RlZCBvblN1Y2Nlc3MoKSB7IHRoaXMub25UcmlnZ2VyKHRoaXMub25JdGVtU3VjY2Vzcyk7IH1cclxuICAgIHByb3RlY3RlZCBvbkZhaWx1cmUoKSB7IHRoaXMub25UcmlnZ2VyKHRoaXMub25JdGVtRmFpbHVyZSk7IH1cclxuICAgIHByaXZhdGUgb25UcmlnZ2VyKGZ1bmM6IEZ1bmN0aW9uKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLm93bmVyKSByZXR1cm47XHJcbiAgICAgICAgdmFyIG9iamVjdHMgPSB0aGlzLm93bmVyLmdldE9iamVjdHModGhpcy5wYWdlcywgdGhpcy5xdWVzdGlvbnMpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgb2JqZWN0cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBmdW5jKG9iamVjdHNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkl0ZW1TdWNjZXNzKGl0ZW06IGFueSkgeyBpdGVtLnZpc2libGUgPSB0cnVlOyB9XHJcbiAgICBwcm90ZWN0ZWQgb25JdGVtRmFpbHVyZShpdGVtOiBhbnkpIHsgaXRlbS52aXNpYmxlID0gZmFsc2U7IH1cclxufVxyXG5leHBvcnQgY2xhc3MgU3VydmV5VHJpZ2dlckNvbXBsZXRlIGV4dGVuZHMgU3VydmV5VHJpZ2dlciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIFwiY29tcGxldGV0cmlnZ2VyXCI7IH1cclxuICAgIHB1YmxpYyBnZXQgaXNPbk5leHRQYWdlKCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgcHJvdGVjdGVkIG9uU3VjY2VzcygpIHsgaWYgKHRoaXMub3duZXIpIHRoaXMub3duZXIuZG9Db21wbGV0ZSgpOyB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFN1cnZleVRyaWdnZXJTZXRWYWx1ZSBleHRlbmRzIFN1cnZleVRyaWdnZXIge1xyXG4gICAgcHVibGljIHNldFRvTmFtZTogc3RyaW5nO1xyXG4gICAgcHVibGljIHNldFZhbHVlOiBhbnk7XHJcbiAgICBwdWJsaWMgaXNWYXJpYWJsZTogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJzZXR2YWx1ZXRyaWdnZXJcIjsgfVxyXG4gICAgcHJvdGVjdGVkIG9uU3VjY2VzcygpIHtcclxuICAgICAgICBpZiAoIXRoaXMuc2V0VG9OYW1lIHx8ICF0aGlzLm93bmVyKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5vd25lci5zZXRUcmlnZ2VyVmFsdWUodGhpcy5zZXRUb05hbWUsIHRoaXMuc2V0VmFsdWUsIHRoaXMuaXNWYXJpYWJsZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJ0cmlnZ2VyXCIsIFtcIm9wZXJhdG9yXCIsIFwiIXZhbHVlXCJdKTtcclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcInN1cnZleXRyaWdnZXJcIiwgW1wiIW5hbWVcIl0sIG51bGwsIFwidHJpZ2dlclwiKTtcclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcInZpc2libGV0cmlnZ2VyXCIsIFtcInBhZ2VzXCIsIFwicXVlc3Rpb25zXCJdLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU3VydmV5VHJpZ2dlclZpc2libGUoKTsgfSwgXCJzdXJ2ZXl0cmlnZ2VyXCIpO1xyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwiY29tcGxldGV0cmlnZ2VyXCIsIFtdLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU3VydmV5VHJpZ2dlckNvbXBsZXRlKCk7IH0sIFwic3VydmV5dHJpZ2dlclwiKTtcclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcInNldHZhbHVldHJpZ2dlclwiLCBbXCIhc2V0VG9OYW1lXCIsIFwic2V0VmFsdWVcIiwgXCJpc1ZhcmlhYmxlOmJvb2xlYW5cIl0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBTdXJ2ZXlUcmlnZ2VyU2V0VmFsdWUoKTsgfSwgXCJzdXJ2ZXl0cmlnZ2VyXCIpO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RyaWdnZXIudHNcbiAqKi8iLCJpbXBvcnQge0Jhc2V9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtTdXJ2ZXlNb2RlbH0gZnJvbSBcIi4vc3VydmV5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3VydmV5V2luZG93TW9kZWwgZXh0ZW5kcyBCYXNlICB7XHJcbiAgICBwdWJsaWMgc3RhdGljIHN1cnZleUVsZW1lbnROYW1lID0gXCJ3aW5kb3dTdXJ2ZXlKU1wiO1xyXG4gICAgc3VydmV5VmFsdWU6IFN1cnZleU1vZGVsO1xyXG4gICAgd2luZG93RWxlbWVudDogSFRNTERpdkVsZW1lbnQ7XHJcbiAgICBpc1Nob3dpbmdWYWx1ZTogYm9vbGVhbjtcclxuICAgIGlzRXhwYW5kZWRWYWx1ZTogYm9vbGVhbjtcclxuICAgIHRpdGxlVmFsdWU6IHN0cmluZztcclxuICAgIHRlbXBsYXRlVmFsdWU6IHN0cmluZztcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihqc29uT2JqOiBhbnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuc3VydmV5VmFsdWUgPSB0aGlzLmNyZWF0ZVN1cnZleShqc29uT2JqKTtcclxuICAgICAgICB0aGlzLnN1cnZleVZhbHVlLnNob3dUaXRsZSA9IGZhbHNlO1xyXG4gICAgICAgIHRoaXMud2luZG93RWxlbWVudCA9IDxIVE1MRGl2RWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKSA6IHN0cmluZyB7IHJldHVybiBcIndpbmRvd1wiIH1cclxuICAgIHB1YmxpYyBnZXQgc3VydmV5KCk6IFN1cnZleU1vZGVsIHsgcmV0dXJuIHRoaXMuc3VydmV5VmFsdWU7IH1cclxuICAgIHB1YmxpYyBnZXQgaXNTaG93aW5nKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5pc1Nob3dpbmdWYWx1ZTsgfVxyXG4gICAgcHVibGljIGdldCBpc0V4cGFuZGVkKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5pc0V4cGFuZGVkVmFsdWU7IH1cclxuICAgIHB1YmxpYyBnZXQgdGl0bGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudGl0bGVWYWx1ZSA/IHRoaXMudGl0bGVWYWx1ZSA6IHRoaXMuc3VydmV5LnRpdGxlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHRpdGxlKHZhbHVlOiBzdHJpbmcpIHsgdGhpcy50aXRsZVZhbHVlID0gdmFsdWU7IH1cclxuICAgIHB1YmxpYyBleHBhbmQoKSB7XHJcbiAgICAgICAgdGhpcy5leHBhbmRjb2xsYXBzZSh0cnVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjb2xsYXBzZSgpIHtcclxuICAgICAgICB0aGlzLmV4cGFuZGNvbGxhcHNlKGZhbHNlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVTdXJ2ZXkoanNvbk9iajogYW55KTogU3VydmV5TW9kZWwge1xyXG4gICAgICAgIHJldHVybiBuZXcgU3VydmV5TW9kZWwoanNvbk9iailcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBleHBhbmRjb2xsYXBzZSh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMuaXNFeHBhbmRlZFZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zdXJ2ZXlXaW5kb3cudHNcbiAqKi8iLCJleHBvcnQgdmFyIHN1cnZleUNzcyA9IHtcclxuICAgIGN1cnJlbnRUeXBlOiBcIlwiLFxyXG4gICAgZ2V0Q3NzOiBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGxvYyA9IHRoaXMuY3VycmVudFR5cGUgPyB0aGlzW3RoaXMuY3VycmVudFR5cGVdIDogZGVmYXVsdFN0YW5kYXJkQ3NzO1xyXG4gICAgICAgIGlmICghbG9jKSBsb2MgPSBkZWZhdWx0U3RhbmRhcmRDc3M7XHJcbiAgICAgICAgcmV0dXJuIGxvYztcclxuICAgIH0sXHJcbn07XHJcblxyXG5leHBvcnQgdmFyIGRlZmF1bHRTdGFuZGFyZENzcyA9IHtcclxuICAgIHJvb3Q6IFwic3ZfbWFpblwiLFxyXG4gICAgaGVhZGVyOiBcIlwiLFxyXG4gICAgYm9keTogXCJzdl9ib2R5XCIsXHJcbiAgICBmb290ZXI6IFwic3ZfbmF2XCIsXHJcbiAgICBuYXZpZ2F0aW9uQnV0dG9uOiBcIlwiLCBuYXZpZ2F0aW9uOiB7IGNvbXBsZXRlOiBcIlwiLCBwcmV2OlwiXCIsIG5leHQ6IFwiXCJ9LFxyXG4gICAgcHJvZ3Jlc3M6IFwic3ZfcHJvZ3Jlc3NcIiwgcHJvZ3Jlc3NCYXI6IFwiXCIsXHJcbiAgICBwYWdlVGl0bGU6IFwic3ZfcF90aXRsZVwiLFxyXG4gICAgcm93OiBcInN2X3Jvd1wiLFxyXG4gICAgcXVlc3Rpb246IHsgcm9vdDogXCJzdl9xXCIsIHRpdGxlOiBcInN2X3FfdGl0bGVcIiwgY29tbWVudDogXCJcIiwgaW5kZW50OiAyMCB9LFxyXG4gICAgZXJyb3I6IHsgcm9vdDogXCJzdl9xX2VyYm94XCIsIGljb246IFwiXCIsIGl0ZW06IFwiXCIgfSxcclxuXHJcbiAgICBjaGVja2JveDogeyByb290OiBcInN2X3FjYmNcIiwgaXRlbTogXCJzdl9xX2NoZWNrYm94XCIsIG90aGVyOiBcInN2X3Ffb3RoZXJcIiB9LFxyXG4gICAgY29tbWVudDogXCJcIixcclxuICAgIGRyb3Bkb3duOiBcIlwiLFxyXG4gICAgbWF0cml4OiB7IHJvb3Q6IFwic3ZfcV9tYXRyaXhcIiB9LFxyXG4gICAgbWF0cml4ZHJvcGRvd246IHsgcm9vdDogXCJzdl9xX21hdHJpeFwiIH0sXHJcbiAgICBtYXRyaXhkeW5hbWljOiB7IHJvb3Q6IFwidGFibGVcIiwgYnV0dG9uOiBcIlwiIH0sXHJcbiAgICBtdWx0aXBsZXRleHQ6IHsgcm9vdDogXCJcIiwgaXRlbVRpdGxlOiBcIlwiLCBpdGVtVmFsdWU6IFwiXCIgfSxcclxuICAgIHJhZGlvZ3JvdXA6IHsgcm9vdDogXCJzdl9xY2JjXCIsIGl0ZW06IFwic3ZfcV9yYWRpb2dyb3VwXCIsIG90aGVyOiBcInN2X3Ffb3RoZXJcIiB9LFxyXG4gICAgcmF0aW5nOiB7IHJvb3Q6IFwic3ZfcV9yYXRpbmdcIiwgaXRlbTogXCJzdl9xX3JhdGluZ19pdGVtXCIgfSxcclxuICAgIHRleHQ6IFwiXCIsXHJcbiAgICB3aW5kb3c6IHtcclxuICAgICAgICByb290OiBcInN2X3dpbmRvd1wiLCBib2R5OiBcInN2X3dpbmRvd19jb250ZW50XCIsXHJcbiAgICAgICAgaGVhZGVyOiB7XHJcbiAgICAgICAgICAgIHJvb3Q6IFwic3Zfd2luZG93X3RpdGxlXCIsIHRpdGxlOiBcIlwiLCBidXR0b246IFwiXCIsIGJ1dHRvbkV4cGFuZGVkOiBcIlwiLCBidXR0b25Db2xsYXBzZWQ6IFwiXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcblxyXG5zdXJ2ZXlDc3NbXCJzdGFuZGFyZFwiXSA9IGRlZmF1bHRTdGFuZGFyZENzcztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9kZWZhdWx0Q3NzL2Nzc3N0YW5kYXJkLnRzXG4gKiovIiwiaW1wb3J0IHtzdXJ2ZXlDc3N9IGZyb20gXCIuL2Nzc3N0YW5kYXJkXCI7XHJcblxyXG5leHBvcnQgdmFyIGRlZmF1bHRCb290c3RyYXBDc3MgPSB7XHJcbiAgICByb290OiBcIlwiLFxyXG4gICAgaGVhZGVyOiBcInBhbmVsLWhlYWRpbmdcIixcclxuICAgIGJvZHk6IFwicGFuZWwtYm9keVwiLFxyXG4gICAgZm9vdGVyOiBcInBhbmVsLWZvb3RlclwiLFxyXG4gICAgbmF2aWdhdGlvbkJ1dHRvbjogXCJcIiwgbmF2aWdhdGlvbjogeyBjb21wbGV0ZTogXCJcIiwgcHJldjogXCJcIiwgbmV4dDogXCJcIiB9LFxyXG4gICAgcHJvZ3Jlc3M6IFwicHJvZ3Jlc3MgY2VudGVyLWJsb2NrXCIsIHByb2dyZXNzQmFyOiBcInByb2dyZXNzLWJhclwiLFxyXG4gICAgcGFnZVRpdGxlOiBcIlwiLFxyXG4gICAgcm93OiBcIlwiLFxyXG4gICAgcXVlc3Rpb246IHsgcm9vdDogXCJcIiwgdGl0bGU6IFwiXCIsIGNvbW1lbnQ6IFwiZm9ybS1jb250cm9sXCIsIGluZGVudDogMjAgfSxcclxuICAgIGVycm9yOiB7IHJvb3Q6IFwiYWxlcnQgYWxlcnQtZGFuZ2VyXCIsIGljb246IFwiZ2x5cGhpY29uIGdseXBoaWNvbi1leGNsYW1hdGlvbi1zaWduXCIsIGl0ZW06IFwiXCIgfSxcclxuXHJcbiAgICBjaGVja2JveDogeyByb290OiBcImZvcm0taW5saW5lXCIsIGl0ZW06IFwiY2hlY2tib3hcIiwgb3RoZXI6IFwiXCIgfSxcclxuICAgIGNvbW1lbnQ6IFwiZm9ybS1jb250cm9sXCIsXHJcbiAgICBkcm9wZG93bjogXCJmb3JtLWNvbnRyb2xcIixcclxuICAgIG1hdHJpeDogeyByb290OiBcInRhYmxlXCIgfSxcclxuICAgIG1hdHJpeGRyb3Bkb3duOiB7IHJvb3Q6IFwidGFibGVcIiB9LFxyXG4gICAgbWF0cml4ZHluYW1pYzogeyByb290OiBcInRhYmxlXCIsIGJ1dHRvbjogXCJidXR0b25cIiB9LFxyXG4gICAgbXVsdGlwbGV0ZXh0OiB7IHJvb3Q6IFwidGFibGVcIiwgaXRlbVRpdGxlOiBcIlwiLCBpdGVtVmFsdWU6IFwiZm9ybS1jb250cm9sXCIgfSxcclxuICAgIHJhZGlvZ3JvdXA6IHsgcm9vdDogXCJmb3JtLWlubGluZVwiLCBpdGVtOiBcInJhZGlvXCIsIG90aGVyOiBcIlwiIH0sXHJcbiAgICByYXRpbmc6IHsgcm9vdDogXCJidG4tZ3JvdXBcIiwgaXRlbTogXCJidG4gYnRuLWRlZmF1bHRcIiB9LFxyXG4gICAgdGV4dDogXCJmb3JtLWNvbnRyb2xcIixcclxuICAgIHdpbmRvdzoge1xyXG4gICAgICAgIHJvb3Q6IFwibW9kYWwtY29udGVudFwiLCBib2R5OiBcIm1vZGFsLWJvZHlcIixcclxuICAgICAgICBoZWFkZXI6IHtcclxuICAgICAgICAgICAgcm9vdDogXCJtb2RhbC1oZWFkZXIgcGFuZWwtdGl0bGVcIiwgdGl0bGU6IFwicHVsbC1sZWZ0XCIsIGJ1dHRvbjogXCJnbHlwaGljb24gcHVsbC1yaWdodFwiLFxyXG4gICAgICAgICAgICBidXR0b25FeHBhbmRlZDogXCJnbHlwaGljb24gcHVsbC1yaWdodCBnbHlwaGljb24tY2hldnJvbi11cFwiLCBidXR0b25Db2xsYXBzZWQ6IFwiZ2x5cGhpY29uIHB1bGwtcmlnaHQgZ2x5cGhpY29uLWNoZXZyb24tZG93blwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5zdXJ2ZXlDc3NbXCJib290c3RyYXBcIl0gPSBkZWZhdWx0Qm9vdHN0cmFwQ3NzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2RlZmF1bHRDc3MvY3NzYm9vdHN0cmFwLnRzXG4gKiovIiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XHJcbmltcG9ydCB7U3VydmV5TW9kZWx9IGZyb20gXCIuLi9zdXJ2ZXlcIjtcclxuaW1wb3J0IHtJUGFnZSwgRXZlbnR9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7UGFnZX0gZnJvbSBcIi4va29wYWdlXCI7XHJcbmltcG9ydCB7UGFnZU1vZGVsfSBmcm9tIFwiLi4vcGFnZVwiO1xyXG5pbXBvcnQge3N1cnZleUNzc30gZnJvbSBcIi4uL2RlZmF1bHRDc3MvY3Nzc3RhbmRhcmRcIjtcclxuaW1wb3J0IHtrb1RlbXBsYXRlfSBmcm9tIFwiLi90ZW1wbGF0ZS5rby5odG1sXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3VydmV5IGV4dGVuZHMgU3VydmV5TW9kZWwge1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgY3NzVHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gc3VydmV5Q3NzLmN1cnJlbnRUeXBlOyB9XHJcbiAgICBwdWJsaWMgc3RhdGljIHNldCBjc3NUeXBlKHZhbHVlOiBzdHJpbmcpIHsgc3VydmV5Q3NzLmN1cnJlbnRUeXBlID0gdmFsdWU7IH1cclxuICAgIHByaXZhdGUgcmVuZGVyZWRFbGVtZW50OiBIVE1MRWxlbWVudDtcclxuICAgIHB1YmxpYyBvblJlbmRlcmVkOiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsKSA9PiBhbnksIGFueT4oKTtcclxuICAgIHByaXZhdGUgaXNGaXJzdFJlbmRlcjogYm9vbGVhbiA9IHRydWU7XHJcblxyXG4gICAga29DdXJyZW50UGFnZTogYW55OyBrb0lzRmlyc3RQYWdlOiBhbnk7IGtvSXNMYXN0UGFnZTogYW55OyBkdW1teU9ic2VydmFibGU6IGFueTsga29TdGF0ZTogYW55O1xyXG4gICAga29Qcm9ncmVzczogYW55OyBrb1Byb2dyZXNzVGV4dDogYW55O1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGpzb25PYmo6IGFueSA9IG51bGwsIHJlbmRlcmVkRWxlbWVudDogYW55ID0gbnVsbCwgY3NzOiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgc3VwZXIoanNvbk9iaik7XHJcbiAgICAgICAgaWYgKGNzcykge1xyXG4gICAgICAgICAgICB0aGlzLmNzcyA9IGNzcztcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlbmRlcmVkRWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVkRWxlbWVudCA9IHJlbmRlcmVkRWxlbWVudDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHR5cGVvZiBrbyA9PT0gJ3VuZGVmaW5lZCcpIHRocm93IG5ldyBFcnJvcigna25vY2tvdXRqcyBsaWJyYXJ5IGlzIG5vdCBsb2FkZWQuJyk7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIocmVuZGVyZWRFbGVtZW50KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY3NzTmF2aWdhdGlvbkNvbXBsZXRlKCkgeyByZXR1cm4gdGhpcy5nZXROYXZpZ2F0aW9uQ3NzKHRoaXMuY3NzLm5hdmlnYXRpb25CdXR0b24sIHRoaXMuY3NzLm5hdmlnYXRpb24uY29tcGxldGUpOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGNzc05hdmlnYXRpb25QcmV2KCkgeyByZXR1cm4gdGhpcy5nZXROYXZpZ2F0aW9uQ3NzKHRoaXMuY3NzLm5hdmlnYXRpb25CdXR0b24sIHRoaXMuY3NzLm5hdmlnYXRpb24ucHJldik7IH1cclxuICAgIHB1YmxpYyBnZXQgY3NzTmF2aWdhdGlvbk5leHQoKSB7IHJldHVybiB0aGlzLmdldE5hdmlnYXRpb25Dc3ModGhpcy5jc3MubmF2aWdhdGlvbkJ1dHRvbiwgdGhpcy5jc3MubmF2aWdhdGlvbi5uZXh0KTsgfVxyXG4gICAgcHJpdmF0ZSBnZXROYXZpZ2F0aW9uQ3NzKG1haW46IHN0cmluZywgYnRuOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgcmVzID0gXCJcIjtcclxuICAgICAgICBpZiAobWFpbikgcmVzID0gbWFpbjtcclxuICAgICAgICBpZiAoYnRuKSByZXMgKz0gJyAnICsgYnRuO1xyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNzcygpOiBhbnkgeyByZXR1cm4gc3VydmV5Q3NzLmdldENzcygpOyB9XHJcbiAgICBwdWJsaWMgc2V0IGNzcyh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5tZXJnZVZhbHVlcyh2YWx1ZSwgdGhpcy5jc3MpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbmRlcihlbGVtZW50OiBhbnkgPSBudWxsKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIGlmIChlbGVtZW50ICYmIHR5cGVvZiBlbGVtZW50ID09IFwic3RyaW5nXCIpIHtcclxuICAgICAgICAgICAgZWxlbWVudCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGVsZW1lbnQpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZWxlbWVudCkge1xyXG4gICAgICAgICAgICB0aGlzLnJlbmRlcmVkRWxlbWVudCA9IGVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsZW1lbnQgPSB0aGlzLnJlbmRlcmVkRWxlbWVudDtcclxuICAgICAgICBpZiAoIWVsZW1lbnQpIHJldHVybjtcclxuICAgICAgICBlbGVtZW50LmlubmVySFRNTCA9IHRoaXMuZ2V0VGVtcGxhdGUoKTtcclxuICAgICAgICBzZWxmLmFwcGx5QmluZGluZygpO1xyXG4gICAgICAgIHNlbGYub25SZW5kZXJlZC5maXJlKHNlbGYsIHt9KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBsb2FkU3VydmV5RnJvbVNlcnZpY2Uoc3VydmV5SWQ6IHN0cmluZyA9IG51bGwsIHJlbmRlcmVkRWxlbWVudDogYW55ID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChyZW5kZXJlZEVsZW1lbnQpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJlZEVsZW1lbnQgPSByZW5kZXJlZEVsZW1lbnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN1cGVyLmxvYWRTdXJ2ZXlGcm9tU2VydmljZShzdXJ2ZXlJZCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgc2V0Q29tcGxldGVkKCkge1xyXG4gICAgICAgIHN1cGVyLnNldENvbXBsZXRlZCgpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlS29DdXJyZW50UGFnZSgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZU5ld1BhZ2UobmFtZTogc3RyaW5nKSB7IHJldHVybiBuZXcgUGFnZShuYW1lKTsgfVxyXG4gICAgcHJvdGVjdGVkIGdldFRlbXBsYXRlKCk6IHN0cmluZyB7IHJldHVybiBrb1RlbXBsYXRlLmh0bWw7IH1cclxuICAgIHByb3RlY3RlZCBvbkJlZm9yZUNyZWF0aW5nKCkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmR1bW15T2JzZXJ2YWJsZSA9IGtvLm9ic2VydmFibGUoMCk7XHJcbiAgICAgICAgdGhpcy5rb0N1cnJlbnRQYWdlID0ga28uY29tcHV0ZWQoZnVuY3Rpb24gKCkgeyBzZWxmLmR1bW15T2JzZXJ2YWJsZSgpOyByZXR1cm4gc2VsZi5jdXJyZW50UGFnZTsgfSk7XHJcbiAgICAgICAgdGhpcy5rb0lzRmlyc3RQYWdlID0ga28uY29tcHV0ZWQoZnVuY3Rpb24gKCkgeyBzZWxmLmR1bW15T2JzZXJ2YWJsZSgpOyByZXR1cm4gc2VsZi5pc0ZpcnN0UGFnZTsgfSk7XHJcbiAgICAgICAgdGhpcy5rb0lzTGFzdFBhZ2UgPSBrby5jb21wdXRlZChmdW5jdGlvbiAoKSB7IHNlbGYuZHVtbXlPYnNlcnZhYmxlKCk7IHJldHVybiBzZWxmLmlzTGFzdFBhZ2U7IH0pO1xyXG4gICAgICAgIHRoaXMua29Qcm9ncmVzc1RleHQgPSBrby5jb21wdXRlZChmdW5jdGlvbiAoKSB7IHNlbGYuZHVtbXlPYnNlcnZhYmxlKCk7IHJldHVybiBzZWxmLnByb2dyZXNzVGV4dDsgfSk7XHJcbiAgICAgICAgdGhpcy5rb1Byb2dyZXNzID0ga28uY29tcHV0ZWQoZnVuY3Rpb24gKCkgeyBzZWxmLmR1bW15T2JzZXJ2YWJsZSgpOyByZXR1cm4gc2VsZi5nZXRQcm9ncmVzcygpOyB9KTtcclxuICAgICAgICB0aGlzLmtvU3RhdGUgPSBrby5jb21wdXRlZChmdW5jdGlvbiAoKSB7IHNlbGYuZHVtbXlPYnNlcnZhYmxlKCk7IHJldHVybiBzZWxmLnN0YXRlOyB9KTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjdXJyZW50UGFnZUNoYW5nZWQobmV3VmFsdWU6IFBhZ2VNb2RlbCwgb2xkVmFsdWU6IFBhZ2VNb2RlbCkge1xyXG4gICAgICAgIHRoaXMudXBkYXRlS29DdXJyZW50UGFnZSgpO1xyXG4gICAgICAgIHN1cGVyLmN1cnJlbnRQYWdlQ2hhbmdlZChuZXdWYWx1ZSwgb2xkVmFsdWUpO1xyXG4gICAgICAgIGlmICghdGhpcy5pc0Rlc2lnbk1vZGUpIHRoaXMuZm9jdXNGaXJzdFF1ZXN0aW9uKCk7XHJcbiAgICB9XHJcbiAgICBwYWdlVmlzaWJpbGl0eUNoYW5nZWQocGFnZTogSVBhZ2UsIG5ld1ZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgc3VwZXIucGFnZVZpc2liaWxpdHlDaGFuZ2VkKHBhZ2UsIG5ld1ZhbHVlKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZUtvQ3VycmVudFBhZ2UoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkxvYWRTdXJ2ZXlGcm9tU2VydmljZSgpIHtcclxuICAgICAgICB0aGlzLnJlbmRlcigpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZGluZ1N1cnZleUZyb21TZXJ2aWNlKCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFwcGx5QmluZGluZygpIHtcclxuICAgICAgICBpZiAoIXRoaXMucmVuZGVyZWRFbGVtZW50KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy51cGRhdGVLb0N1cnJlbnRQYWdlKCk7XHJcbiAgICAgICAga28uY2xlYW5Ob2RlKHRoaXMucmVuZGVyZWRFbGVtZW50KTtcclxuICAgICAgICBpZiAoIXRoaXMuaXNGaXJzdFJlbmRlcikge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZUN1cnJlbnRQYWdlUXVlc3Rpb25zKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNGaXJzdFJlbmRlciA9IGZhbHNlO1xyXG4gICAgICAgIGtvLmFwcGx5QmluZGluZ3ModGhpcywgdGhpcy5yZW5kZXJlZEVsZW1lbnQpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVLb0N1cnJlbnRQYWdlKCkge1xyXG4gICAgICAgIHRoaXMuZHVtbXlPYnNlcnZhYmxlKHRoaXMuZHVtbXlPYnNlcnZhYmxlKCkgKyAxKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgdXBkYXRlQ3VycmVudFBhZ2VRdWVzdGlvbnMoKSB7XHJcbiAgICAgICAgdmFyIHF1ZXN0aW9ucyA9IHRoaXMuY3VycmVudFBhZ2UgPyB0aGlzLmN1cnJlbnRQYWdlLnF1ZXN0aW9ucyA6IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBxID0gcXVlc3Rpb25zW2ldO1xyXG4gICAgICAgICAgICBpZiAocS52aXNpYmxlKSBxW1widXBkYXRlUXVlc3Rpb25cIl0oKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rbm9ja291dC9rb3N1cnZleS50c1xuICoqLyIsIm1vZHVsZS5leHBvcnRzID0gX19XRUJQQUNLX0VYVEVSTkFMX01PRFVMRV8zOF9fO1xuXG5cbi8qKioqKioqKioqKioqKioqKlxuICoqIFdFQlBBQ0sgRk9PVEVSXG4gKiogZXh0ZXJuYWwge1wicm9vdFwiOlwia29cIixcImNvbW1vbmpzMlwiOlwia25vY2tvdXRcIixcImNvbW1vbmpzXCI6XCJrbm9ja291dFwiLFwiYW1kXCI6XCJrbm9ja291dFwifVxuICoqIG1vZHVsZSBpZCA9IDM4XG4gKiogbW9kdWxlIGNodW5rcyA9IDBcbiAqKi8iLCJpbXBvcnQgKiBhcyBrbyBmcm9tIFwia25vY2tvdXRcIjtcclxuaW1wb3J0IHtQYWdlTW9kZWwsIFF1ZXN0aW9uUm93TW9kZWx9IGZyb20gXCIuLi9wYWdlXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4uL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkJhc2V9IGZyb20gXCIuLi9xdWVzdGlvbmJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblJvdyBleHRlbmRzIFF1ZXN0aW9uUm93TW9kZWwge1xyXG4gICAga29WaXNpYmxlOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcGFnZTogUGFnZU1vZGVsLCBwdWJsaWMgcXVlc3Rpb246IFF1ZXN0aW9uQmFzZSkge1xyXG4gICAgICAgIHN1cGVyKHBhZ2UsIHF1ZXN0aW9uKTtcclxuICAgICAgICB0aGlzLmtvVmlzaWJsZSA9IGtvLm9ic2VydmFibGUodGhpcy52aXNpYmxlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblZpc2libGVDaGFuZ2VkKCkge1xyXG4gICAgICAgIHRoaXMua29WaXNpYmxlKHRoaXMudmlzaWJsZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMga29BZnRlclJlbmRlcihlbCwgY29uKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgdEVsID0gZWxbaV07XHJcbiAgICAgICAgICAgIHZhciBuTmFtZSA9IHRFbC5ub2RlTmFtZTtcclxuICAgICAgICAgICAgaWYgKG5OYW1lID09IFwiI3RleHRcIikgdEVsLmRhdGEgPSBcIlwiO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhZ2UgZXh0ZW5kcyBQYWdlTW9kZWwge1xyXG4gICAga29ObzogYW55O1xyXG4gICAgY29uc3RydWN0b3IobmFtZTogc3RyaW5nID0gXCJcIikge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMua29ObyA9IGtvLm9ic2VydmFibGUoXCJcIik7XHJcbiAgICAgICAgdGhpcy5vbkNyZWF0aW5nKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlUm93KHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBRdWVzdGlvblJvd01vZGVsIHsgcmV0dXJuIG5ldyBRdWVzdGlvblJvdyh0aGlzLCBxdWVzdGlvbik7IH1cclxuICAgIHByb3RlY3RlZCBvbkNyZWF0aW5nKCkgeyB9XHJcbiAgICBwcm90ZWN0ZWQgb25OdW1DaGFuZ2VkKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLmtvTm8odmFsdWUgPiAwID8gdmFsdWUgKyBcIi4gXCIgOiBcIlwiKTtcclxuICAgIH1cclxufVxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLm92ZXJyaWRlQ2xhc3NDcmVhdG9yZShcInBhZ2VcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFBhZ2UoKTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMva25vY2tvdXQva29wYWdlLnRzXG4gKiovIiwiZXhwb3J0IHZhciBrb1RlbXBsYXRlID0geyBodG1sIDogXCJcIn07IGtvVGVtcGxhdGUuaHRtbCA9ICc8c2NyaXB0IHR5cGU9XCJ0ZXh0L2h0bWxcIiBpZD1cInN1cnZleS1jb21tZW50XCI+ICAgIDwhLS0ga28gaWY6ICRyb290LmlzRWRpdE1vZGUgLS0+ICAgIDxpbnB1dCBkYXRhLWJpbmQ9XCJ2YWx1ZTokZGF0YS5xdWVzdGlvbi5rb0NvbW1lbnQsIHZpc2libGU6JGRhdGEudmlzaWJsZSwgY3NzOiAkcm9vdC5jc3MucXVlc3Rpb24uY29tbWVudFwiIC8+ICAgIDwhLS0gL2tvIC0tPiAgICA8IS0tIGtvIGlmOiAkcm9vdC5pc0Rpc3BsYXlNb2RlIC0tPiAgICA8ZGl2IGRhdGEtYmluZD1cInRleHQ6JGRhdGEucXVlc3Rpb24ua29Db21tZW50LCB2aXNpYmxlOiRkYXRhLnZpc2libGUsIGNzczogJHJvb3QuY3NzLnF1ZXN0aW9uLmNvbW1lbnRcIj48L2Rpdj4gICAgPCEtLSAva28gLS0+PC9zY3JpcHQ+PGRpdiBkYXRhLWJpbmQ9XCJjc3M6ICRyb290LmNzcy5yb290XCI+ICAgIDxkaXYgZGF0YS1iaW5kPVwidmlzaWJsZTogKHRpdGxlLmxlbmd0aCA+IDApICYmIHNob3dUaXRsZSAmJiBrb1N0YXRlKCkgIT0gXFwnY29tcGxldGVkXFwnLCBjc3M6ICRyb290LmNzcy5oZWFkZXJcIj4gICAgICAgIDxoMyBkYXRhLWJpbmQ9XCJ0ZXh0OnRpdGxlXCI+PC9oMz4gICAgPC9kaXY+ICAgIDwhLS0ga28gaWY6IGtvU3RhdGUoKSA9PSBcInJ1bm5pbmdcIiAtLT4gICAgPGRpdiBkYXRhLWJpbmQ9XCJjc3M6ICRyb290LmNzcy5ib2R5XCI+ICAgICAgICA8ZGl2IGRhdGEtYmluZD1cInZpc2libGU6IHNob3dQcm9ncmVzc0JhciA9PVxcJ3RvcFxcJywgdGVtcGxhdGU6IHsgbmFtZTogXFwnc3VydmV5LXByb2dyZXNzXFwnLCBkYXRhOiAkZGF0YSB9XCI+PC9kaXY+ICAgICAgICA8ZGl2IGlkPVwic3FfcGFnZVwiIGRhdGEtYmluZD1cInRlbXBsYXRlOiB7IG5hbWU6IFxcJ3N1cnZleS1wYWdlXFwnLCBkYXRhOiBrb0N1cnJlbnRQYWdlIH1cIj48L2Rpdj4gICAgICAgIDxkaXYgc3R5bGU9XCJtYXJnaW4tdG9wOjEwcHhcIiBkYXRhLWJpbmQ9XCJ2aXNpYmxlOiBzaG93UHJvZ3Jlc3NCYXIgPT1cXCdib3R0b21cXCcsIHRlbXBsYXRlOiB7IG5hbWU6IFxcJ3N1cnZleS1wcm9ncmVzc1xcJywgZGF0YTogJGRhdGEgfVwiPjwvZGl2PiAgICA8L2Rpdj4gICAgPGRpdiBkYXRhLWJpbmQ9XCJ2aXNpYmxlOiBzaG93TmF2aWdhdGlvbkJ1dHRvbnMgJiYgIWlzRGVzaWduTW9kZSwgY3NzOiAkcm9vdC5jc3MuZm9vdGVyXCI+ICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGRhdGEtYmluZD1cInZhbHVlOiBwYWdlUHJldlRleHQsIGNsaWNrOiBwcmV2UGFnZSwgdmlzaWJsZTogIWtvSXNGaXJzdFBhZ2UoKSwgY3NzOiAkcm9vdC5jc3NOYXZpZ2F0aW9uUHJldlwiIC8+ICAgICAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGRhdGEtYmluZD1cInZhbHVlOiBwYWdlTmV4dFRleHQsIGNsaWNrOiBuZXh0UGFnZSwgdmlzaWJsZTogIWtvSXNMYXN0UGFnZSgpLCBjc3M6ICRyb290LmNzc05hdmlnYXRpb25OZXh0XCIgLz4gICAgICAgIDxpbnB1dCB0eXBlPVwiYnV0dG9uXCIgZGF0YS1iaW5kPVwidmFsdWU6IGNvbXBsZXRlVGV4dCwgY2xpY2s6IGNvbXBsZXRlTGFzdFBhZ2UsIHZpc2libGU6IGtvSXNMYXN0UGFnZSgpLCBjc3M6ICRyb290LmNzc05hdmlnYXRpb25Db21wbGV0ZVwiIC8+ICAgIDwvZGl2PiAgICA8IS0tIC9rbyAtLT4gICAgPCEtLSBrbyBpZjoga29TdGF0ZSgpID09IFwiY29tcGxldGVkXCIgLS0+ICAgIDxkaXYgZGF0YS1iaW5kPVwiaHRtbDogcHJvY2Vzc2VkQ29tcGxldGVkSHRtbFwiPjwvZGl2PiAgICA8IS0tIC9rbyAtLT4gICAgPCEtLSBrbyBpZjoga29TdGF0ZSgpID09IFwibG9hZGluZ1wiIC0tPiAgICA8ZGl2IGRhdGEtYmluZD1cImh0bWw6IHByb2Nlc3NlZExvYWRpbmdIdG1sXCI+PC9kaXY+ICAgIDwhLS0gL2tvIC0tPiAgICA8IS0tIGtvIGlmOiBrb1N0YXRlKCkgPT0gXCJlbXB0eVwiIC0tPiAgICA8ZGl2IGRhdGEtYmluZD1cInRleHQ6ZW1wdHlTdXJ2ZXlUZXh0LCBjc3M6ICRyb290LmNzcy5ib2R5XCI+PC9kaXY+ICAgIDwhLS0gL2tvIC0tPjwvZGl2PjxzY3JpcHQgdHlwZT1cInRleHQvaHRtbFwiIGlkPVwic3VydmV5LXBhZ2VcIj4gICAgPGg0IGRhdGEtYmluZD1cInZpc2libGU6ICh0aXRsZS5sZW5ndGggPiAwKSAmJiBkYXRhLnNob3dQYWdlVGl0bGVzLCB0ZXh0OiBrb05vKCkgKyBwcm9jZXNzZWRUaXRsZSwgY3NzOiAkcm9vdC5jc3MucGFnZVRpdGxlXCI+PC9oND4gICAgPCEtLSBrbyBmb3JlYWNoOiB7IGRhdGE6IHJvd3MsIGFzOiBcXCdyb3dcXCd9IC0tPiAgICA8ZGl2IGRhdGEtYmluZD1cInZpc2libGU6IHJvdy5rb1Zpc2libGUsIGNzczogJHJvb3QuY3NzLnJvd1wiPiAgICAgICAgPCEtLSBrbyBmb3JlYWNoOiB7IGRhdGE6IHJvdy5xdWVzdGlvbnMsIGFzOiBcXCdxdWVzdGlvblxcJyAsIGFmdGVyUmVuZGVyOiByb3cua29BZnRlclJlbmRlciB9IC0tPiAgICAgICAgICAgIDwhLS0ga28gdGVtcGxhdGU6IHsgbmFtZTogXFwnc3VydmV5LXF1ZXN0aW9uXFwnLCBkYXRhOiBxdWVzdGlvbiB9IC0tPjwhLS0gL2tvIC0tPiAgICAgICAgPCEtLSAva28gLS0+ICAgIDwvZGl2PiAgICA8IS0tIC9rbyAtLT48L3NjcmlwdD48c2NyaXB0IHR5cGU9XCJ0ZXh0L2h0bWxcIiBpZD1cInN1cnZleS1wcm9ncmVzc1wiPiAgICA8ZGl2IHN0eWxlPVwid2lkdGg6NjAlO1wiIGRhdGEtYmluZD1cImNzczogJHJvb3QuY3NzLnByb2dyZXNzXCI+ICAgICAgICA8ZGl2IGRhdGEtYmluZD1cImNzczogJHJvb3QuY3NzLnByb2dyZXNzQmFyLCBzdHlsZTp7d2lkdGg6IGtvUHJvZ3Jlc3MoKSArIFxcJyVcXCd9XCIgICAgICAgICAgICAgcm9sZT1cInByb2dyZXNzYmFyXCIgYXJpYS12YWx1ZW1pbj1cIjBcIiAgICAgICAgICAgICBhcmlhLXZhbHVlbWF4PVwiMTAwXCI+ICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kPVwidGV4dDprb1Byb2dyZXNzVGV4dFwiPjwvc3Bhbj4gICAgICAgIDwvZGl2PiAgICA8L2Rpdj48L3NjcmlwdD48c2NyaXB0IHR5cGU9XCJ0ZXh0L2h0bWxcIiBpZD1cInN1cnZleS1xdWVzdGlvbi1jaGVja2JveFwiPiAgICA8Zm9ybSBkYXRhLWJpbmQ9XCJjc3M6ICRyb290LmNzcy5jaGVja2JveC5yb290XCI+ICAgICAgICA8IS0tIGtvIGZvcmVhY2g6IHsgZGF0YTogcXVlc3Rpb24ua29WaXNpYmxlQ2hvaWNlcywgYXM6IFxcJ2l0ZW1cXCcsIGFmdGVyUmVuZGVyOiBxdWVzdGlvbi5rb0FmdGVyUmVuZGVyfSAgLS0+ICAgICAgICA8ZGl2IGRhdGEtYmluZD1cInN0eWxlOnt3aWR0aDogcXVlc3Rpb24ua29XaWR0aCwgXFwnbWFyZ2luLXJpZ2h0XFwnOiBxdWVzdGlvbi5jb2xDb3VudCA9PSAwID8gXFwnNXB4XFwnOiBcXCcwcHhcXCd9LCBjc3M6ICRyb290LmNzcy5jaGVja2JveC5pdGVtXCI+ICAgICAgICAgICAgPGxhYmVsIGRhdGEtYmluZD1cImNzczogJHJvb3QuY3NzLmNoZWNrYm94Lml0ZW1cIj4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIGRhdGEtYmluZD1cImF0dHI6IHtuYW1lOiBxdWVzdGlvbi5uYW1lLCB2YWx1ZTogaXRlbS52YWx1ZSwgaWQ6ICgkaW5kZXgoKSA9PSAwKSA/IHF1ZXN0aW9uLmlucHV0SWQgOiBcXCdcXCd9LCBjaGVja2VkOiBxdWVzdGlvbi5rb1ZhbHVlLCBlbmFibGU6ICRyb290LmlzRWRpdE1vZGVcIiAvPiAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiBpdGVtLnRleHRcIj48L3NwYW4+ICAgICAgICAgICAgPC9sYWJlbD4gICAgICAgICAgICA8ZGl2IGRhdGEtYmluZD1cInZpc2libGU6IHF1ZXN0aW9uLmhhc090aGVyICYmICgkaW5kZXgoKSA9PSBxdWVzdGlvbi5rb1Zpc2libGVDaG9pY2VzKCkubGVuZ3RoLTEpXCI+ICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1iaW5kPVwidGVtcGxhdGU6IHsgbmFtZTogXFwnc3VydmV5LWNvbW1lbnRcXCcsIGRhdGE6IHtcXCdxdWVzdGlvblxcJzogcXVlc3Rpb24sIFxcJ3Zpc2libGVcXCc6IHF1ZXN0aW9uLmtvT3RoZXJWaXNpYmxlIH0gfSwgY3NzOiAkcm9vdC5jc3MuY2hlY2tib3gub3RoZXJcIj48L2Rpdj4gICAgICAgICAgICA8L2Rpdj4gICAgICAgIDwvZGl2PiAgICAgICAgPCEtLSAva28gLS0+ICAgIDwvZm9ybT48L3NjcmlwdD48c2NyaXB0IHR5cGU9XCJ0ZXh0L2h0bWxcIiBpZD1cInN1cnZleS1xdWVzdGlvbi1jb21tZW50XCI+ICAgIDwhLS0ga28gaWY6ICRyb290LmlzRWRpdE1vZGUgLS0+ICAgIDx0ZXh0YXJlYSB0eXBlPVwidGV4dFwiIGRhdGEtYmluZD1cImF0dHI6IHtjb2xzOiBxdWVzdGlvbi5jb2xzLCByb3dzOiBxdWVzdGlvbi5yb3dzLCBpZDogcXVlc3Rpb24uaW5wdXRJZH0sIHZhbHVlOnF1ZXN0aW9uLmtvVmFsdWUsIGNzczogJHJvb3QuY3NzLmNvbW1lbnRcIj48L3RleHRhcmVhPiAgICA8IS0tIC9rbyAtLT4gICAgPCEtLSBrbyBpZjogJHJvb3QuaXNEaXNwbGF5TW9kZSAtLT4gICAgPGRpdiBkYXRhLWJpbmQ9XCJ0ZXh0OnF1ZXN0aW9uLmtvVmFsdWUsIGNzczogJHJvb3QuY3NzLnRleHRcIj48L2Rpdj4gICAgPCEtLSAva28gLS0+PC9zY3JpcHQ+PHNjcmlwdCB0eXBlPVwidGV4dC9odG1sXCIgaWQ9XCJzdXJ2ZXktcXVlc3Rpb24tZHJvcGRvd25cIj4gICAgPCEtLSBrbyBpZjogJHJvb3QuaXNFZGl0TW9kZSAtLT4gICAgPHNlbGVjdCBkYXRhLWJpbmQ9XCJhdHRyOiB7aWQ6IHF1ZXN0aW9uLmlucHV0SWR9LCBvcHRpb25zOiBxdWVzdGlvbi5rb1Zpc2libGVDaG9pY2VzLCBvcHRpb25zVGV4dDogXFwndGV4dFxcJywgb3B0aW9uc1ZhbHVlOiBcXCd2YWx1ZVxcJywgdmFsdWU6IHF1ZXN0aW9uLmtvVmFsdWUsIG9wdGlvbnNDYXB0aW9uOiBxdWVzdGlvbi5vcHRpb25zQ2FwdGlvbiwgY3NzOiAkcm9vdC5jc3MuZHJvcGRvd25cIj48L3NlbGVjdD4gICAgPCEtLSAva28gLS0+ICAgIDwhLS0ga28gaWY6ICRyb290LmlzRGlzcGxheU1vZGUgLS0+ICAgIDxkaXYgZGF0YS1iaW5kPVwidGV4dDpxdWVzdGlvbi5rb1ZhbHVlLCBjc3M6ICRyb290LmNzcy5kcm9wZG93blwiPjwvZGl2PiAgICA8IS0tIC9rbyAtLT4gICAgPGRpdiBkYXRhLWJpbmQ9XCJ2aXNpYmxlOiBxdWVzdGlvbi5oYXNPdGhlclwiPiAgICAgICAgPGRpdiBkYXRhLWJpbmQ9XCJ0ZW1wbGF0ZTogeyBuYW1lOiBcXCdzdXJ2ZXktY29tbWVudFxcJywgZGF0YToge1xcJ3F1ZXN0aW9uXFwnOiBxdWVzdGlvbiwgXFwndmlzaWJsZVxcJzogcXVlc3Rpb24ua29PdGhlclZpc2libGUgfSB9XCI+PC9kaXY+ICAgIDwvZGl2Pjwvc2NyaXB0PjxzY3JpcHQgdHlwZT1cInRleHQvaHRtbFwiIGlkPVwic3VydmV5LXF1ZXN0aW9uLWVycm9yc1wiPiAgICA8ZGl2IHJvbGU9XCJhbGVydFwiIGRhdGEtYmluZD1cInZpc2libGU6IGtvRXJyb3JzKCkubGVuZ3RoID4gMCwgZm9yZWFjaDogeyBkYXRhOiBrb0Vycm9ycywgYXM6IFxcJ2Vycm9yXFwnfSwgY3NzOiAkcm9vdC5jc3MuZXJyb3Iucm9vdFwiPiAgICAgICAgPGRpdj4gICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBkYXRhLWJpbmQ9XCJjc3M6ICRyb290LmNzcy5lcnJvci5pY29uXCI+PC9zcGFuPiAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZD1cInRleHQ6ZXJyb3IuZ2V0VGV4dCgpLCBjc3M6ICRyb290LmNzcy5lcnJvci5pdGVtXCI+PC9zcGFuPiAgICAgICAgPC9kaXY+ICAgIDwvZGl2Pjwvc2NyaXB0PjxzY3JpcHQgdHlwZT1cInRleHQvaHRtbFwiIGlkPVwic3VydmV5LXF1ZXN0aW9uLWZpbGVcIj4gICAgPCEtLSBrbyBpZjogJHJvb3QuaXNFZGl0TW9kZSAtLT4gICAgPGlucHV0IHR5cGU9XCJmaWxlXCIgZGF0YS1iaW5kPVwiYXR0cjoge2lkOiBxdWVzdGlvbi5pbnB1dElkfSwgZXZlbnQ6IHtjaGFuZ2U6IGRvY2hhbmdlfVwiPiAgICA8IS0tIC9rbyAtLT4gICAgPGRpdj4gICAgICAgIDxpbWcgZGF0YS1iaW5kPVwiYXR0cjogeyBzcmM6IHF1ZXN0aW9uLmtvRGF0YSwgaGVpZ2h0OiBxdWVzdGlvbi5pbWFnZUhlaWdodCwgd2lkdGg6IHF1ZXN0aW9uLmltYWdlV2lkdGggfSwgdmlzaWJsZTogcXVlc3Rpb24ua29IYXNWYWx1ZVwiPiAgICA8L2Rpdj48L3NjcmlwdD48c2NyaXB0IHR5cGU9XCJ0ZXh0L2h0bWxcIiBpZD1cInN1cnZleS1xdWVzdGlvbi1odG1sXCI+ICAgIDxkaXYgZGF0YS1iaW5kPVwiaHRtbDogcXVlc3Rpb24ucHJvY2Vzc2VkSHRtbFwiPjwvZGl2Pjwvc2NyaXB0PjxzY3JpcHQgdHlwZT1cInRleHQvaHRtbFwiIGlkPVwic3VydmV5LXF1ZXN0aW9uLW1hdHJpeFwiPiAgICA8dGFibGUgZGF0YS1iaW5kPVwiY3NzOiAkcm9vdC5jc3MubWF0cml4LnJvb3RcIj4gICAgICAgIDx0aGVhZD4gICAgICAgICAgICA8dHI+ICAgICAgICAgICAgICAgIDx0aCBkYXRhLWJpbmQ9XCJ2aXNpYmxlOiBxdWVzdGlvbi5oYXNSb3dzXCI+PC90aD4gICAgICAgICAgICAgICAgPCEtLSBrbyBmb3JlYWNoOiBxdWVzdGlvbi5jb2x1bW5zIC0tPiAgICAgICAgICAgICAgICA8dGggZGF0YS1iaW5kPVwidGV4dDokZGF0YS50ZXh0XCI+PC90aD4gICAgICAgICAgICAgICAgPCEtLSAva28gLS0+ICAgICAgICAgICAgPC90cj4gICAgICAgIDwvdGhlYWQ+ICAgICAgICA8dGJvZHk+ICAgICAgICAgICAgPCEtLSBrbyBmb3JlYWNoOiB7IGRhdGE6IHF1ZXN0aW9uLnZpc2libGVSb3dzLCBhczogXFwncm93XFwnIH0gLS0+ICAgICAgICAgICAgPHRyPiAgICAgICAgICAgICAgICA8dGQgZGF0YS1iaW5kPVwidmlzaWJsZTogcXVlc3Rpb24uaGFzUm93cywgdGV4dDpyb3cudGV4dFwiPjwvdGQ+ICAgICAgICAgICAgICAgIDwhLS0ga28gZm9yZWFjaDogcXVlc3Rpb24uY29sdW1ucyAtLT4gICAgICAgICAgICAgICAgPHRkPiAgICAgICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGRhdGEtYmluZD1cImF0dHI6IHtuYW1lOiByb3cuZnVsbE5hbWUsIHZhbHVlOiAkZGF0YS52YWx1ZSwgaWQ6ICgkaW5kZXgoKSA9PSAwKSAmJiAoJHBhcmVudENvbnRleHQuJGluZGV4KCkgPT0gMCkgPyBxdWVzdGlvbi5pbnB1dElkIDogXFwnXFwnfSwgY2hlY2tlZDogcm93LmtvVmFsdWUsIGVuYWJsZTogJHJvb3QuaXNFZGl0TW9kZVwiIFwiLz4gICAgICAgICAgICAgICAgPC90ZD4gICAgICAgICAgICAgICAgPCEtLSAva28gLS0+ICAgICAgICAgICAgPC90cj4gICAgICAgICAgICA8IS0tIC9rbyAtLT4gICAgICAgIDwvdGJvZHk+ICAgIDwvdGFibGU+PC9zY3JpcHQ+PHNjcmlwdCB0eXBlPVwidGV4dC9odG1sXCIgaWQ9XCJzdXJ2ZXktcXVlc3Rpb24tbWF0cml4ZHJvcGRvd25cIj4gICAgPGRpdiBkYXRhLWJpbmQ9XCJzdHlsZToge292ZXJmbG93WDogcXVlc3Rpb24uaG9yaXpvbnRhbFNjcm9sbD8gXFwnc2Nyb2xsXFwnOiBcXCdcXCd9XCI+ICAgICAgICA8dGFibGUgZGF0YS1iaW5kPVwiY3NzOiAkcm9vdC5jc3MubWF0cml4ZHJvcGRvd24ucm9vdFwiPiAgICAgICAgICAgIDx0aGVhZD4gICAgICAgICAgICAgICAgPHRyPiAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+ICAgICAgICAgICAgICAgICAgICA8IS0tIGtvIGZvcmVhY2g6IHF1ZXN0aW9uLmNvbHVtbnMgLS0+ICAgICAgICAgICAgICAgICAgICA8dGggZGF0YS1iaW5kPVwidGV4dDogcXVlc3Rpb24uZ2V0Q29sdW1uVGl0bGUoJGRhdGEpLCBzdHlsZTogeyBtaW5XaWR0aDogcXVlc3Rpb24uZ2V0Q29sdW1uV2lkdGgoJGRhdGEpIH1cIj48L3RoPiAgICAgICAgICAgICAgICAgICAgPCEtLSAva28gLS0+ICAgICAgICAgICAgICAgIDwvdHI+ICAgICAgICAgICAgPC90aGVhZD4gICAgICAgICAgICA8dGJvZHk+ICAgICAgICAgICAgICAgIDwhLS0ga28gZm9yZWFjaDogeyBkYXRhOiBxdWVzdGlvbi52aXNpYmxlUm93cywgYXM6IFxcJ3Jvd1xcJyB9IC0tPiAgICAgICAgICAgICAgICA8dHI+ICAgICAgICAgICAgICAgICAgICA8dGQgZGF0YS1iaW5kPVwidGV4dDpyb3cudGV4dFwiPjwvdGQ+ICAgICAgICAgICAgICAgICAgICA8IS0tIGtvIGZvcmVhY2g6IHJvdy5jZWxscy0tPiAgICAgICAgICAgICAgICAgICAgPHRkPiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0ga28gdGVtcGxhdGU6IHsgbmFtZTogXFwnc3VydmV5LXF1ZXN0aW9uLWVycm9yc1xcJywgZGF0YTogJGRhdGEucXVlc3Rpb24gfSAtLT4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIC9rbyAtLT4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIGtvIHRlbXBsYXRlOiB7IG5hbWU6IFxcJ3N1cnZleS1xdWVzdGlvbi1cXCcgKyAkZGF0YS5xdWVzdGlvbi5nZXRUeXBlKCksIGRhdGE6ICRkYXRhLnF1ZXN0aW9uLCBhczogXFwncXVlc3Rpb25cXCcgfSAtLT4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIC9rbyAtLT4gICAgICAgICAgICAgICAgICAgIDwvdGQ+ICAgICAgICAgICAgICAgICAgICA8IS0tIC9rbyAtLT4gICAgICAgICAgICAgICAgPC90cj4gICAgICAgICAgICAgICAgPCEtLSAva28gLS0+ICAgICAgICAgICAgPC90Ym9keT4gICAgICAgIDwvdGFibGU+ICAgIDwvZGl2Pjwvc2NyaXB0PjxzY3JpcHQgdHlwZT1cInRleHQvaHRtbFwiIGlkPVwic3VydmV5LXF1ZXN0aW9uLW1hdHJpeGR5bmFtaWNcIj4gICAgPGRpdiBkYXRhLWJpbmQ9XCJzdHlsZToge292ZXJmbG93WDogcXVlc3Rpb24uaG9yaXpvbnRhbFNjcm9sbD8gXFwnc2Nyb2xsXFwnOiBcXCdcXCd9XCI+ICAgICAgICA8dGFibGUgZGF0YS1iaW5kPVwiY3NzOiAkcm9vdC5jc3MubWF0cml4ZHluYW1pYy5yb290XCI+ICAgICAgICAgICAgPHRoZWFkPiAgICAgICAgICAgICAgICA8dHI+ICAgICAgICAgICAgICAgICAgICA8IS0tIGtvIGZvcmVhY2g6IHF1ZXN0aW9uLmNvbHVtbnMgLS0+ICAgICAgICAgICAgICAgICAgICA8dGggZGF0YS1iaW5kPVwidGV4dDogcXVlc3Rpb24uZ2V0Q29sdW1uVGl0bGUoJGRhdGEpLCBzdHlsZTogeyBtaW5XaWR0aDogcXVlc3Rpb24uZ2V0Q29sdW1uV2lkdGgoJGRhdGEpIH1cIj48L3RoPiAgICAgICAgICAgICAgICAgICAgPCEtLSAva28gLS0+ICAgICAgICAgICAgICAgICAgICA8IS0tIGtvIGlmOiAkcm9vdC5pc0VkaXRNb2RlIC0tPiAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+ICAgICAgICAgICAgICAgICAgICA8IS0tIC9rbyAtLT4gICAgICAgICAgICAgICAgPC90cj4gICAgICAgICAgICA8L3RoZWFkPiAgICAgICAgICAgIDx0Ym9keT4gICAgICAgICAgICAgICAgPCEtLSBrbyBmb3JlYWNoOiB7IGRhdGE6IHF1ZXN0aW9uLmtvUm93cywgYXM6IFxcJ3Jvd1xcJyB9IC0tPiAgICAgICAgICAgICAgICA8dHI+ICAgICAgICAgICAgICAgICAgICA8IS0tIGtvIGZvcmVhY2g6IHJvdy5jZWxscy0tPiAgICAgICAgICAgICAgICAgICAgPHRkPiAgICAgICAgICAgICAgICAgICAgICAgIDwhLS0ga28gdGVtcGxhdGU6IHsgbmFtZTogXFwnc3VydmV5LXF1ZXN0aW9uLWVycm9yc1xcJywgZGF0YTogJGRhdGEucXVlc3Rpb24gfSAtLT4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIC9rbyAtLT4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIGtvIHRlbXBsYXRlOiB7IG5hbWU6IFxcJ3N1cnZleS1xdWVzdGlvbi1cXCcgKyAkZGF0YS5xdWVzdGlvbi5nZXRUeXBlKCksIGRhdGE6ICRkYXRhLnF1ZXN0aW9uLCBhczogXFwncXVlc3Rpb25cXCcgfSAtLT4gICAgICAgICAgICAgICAgICAgICAgICA8IS0tIC9rbyAtLT4gICAgICAgICAgICAgICAgICAgIDwvdGQ+ICAgICAgICAgICAgICAgICAgICA8IS0tIC9rbyAtLT4gICAgICAgICAgICAgICAgICAgIDwhLS0ga28gaWY6ICRyb290LmlzRWRpdE1vZGUgLS0+ICAgICAgICAgICAgICAgICAgICA8dGQ+PGlucHV0IHR5cGU9XCJidXR0b25cIiBkYXRhLWJpbmQ9XCJjbGljazpxdWVzdGlvbi5rb1JlbW92ZVJvd0NsaWNrLCBjc3M6ICRyb290LmNzcy5tYXRyaXhkeW5hbWljLmJ1dHRvbiwgdmFsdWU6IHF1ZXN0aW9uLnJlbW92ZVJvd1RleHRcIiAvPjwvdGQ+ICAgICAgICAgICAgICAgICAgICA8IS0tIC9rbyAtLT4gICAgICAgICAgICAgICAgPC90cj4gICAgICAgICAgICAgICAgPCEtLSAva28gLS0+ICAgICAgICAgICAgPC90Ym9keT4gICAgICAgIDwvdGFibGU+ICAgIDwvZGl2PiAgICA8IS0tIGtvIGlmOiAkcm9vdC5pc0VkaXRNb2RlIC0tPiAgICA8aW5wdXQgdHlwZT1cImJ1dHRvblwiIGRhdGEtYmluZD1cImNsaWNrOnF1ZXN0aW9uLmtvQWRkUm93Q2xpY2ssIGNzczogJHJvb3QuY3NzLm1hdHJpeGR5bmFtaWMuYnV0dG9uLCB2YWx1ZTogcXVlc3Rpb24uYWRkUm93VGV4dFwiIC8+ICAgIDwhLS0gL2tvIC0tPjwvc2NyaXB0PjxzY3JpcHQgdHlwZT1cInRleHQvaHRtbFwiIGlkPVwic3VydmV5LXF1ZXN0aW9uLW11bHRpcGxldGV4dFwiPiAgICA8dGFibGUgZGF0YS1iaW5kPVwiY3NzOiAkcm9vdC5jc3MubXVsdGlwbGV0ZXh0LnJvb3QsIGZvcmVhY2g6IHsgZGF0YTogIHF1ZXN0aW9uLmtvUm93cywgYXM6IFxcJ3Jvd1xcJyB9XCI+ICAgICAgICA8dHIgZGF0YS1iaW5kPVwiZm9yZWFjaDogeyBkYXRhOiByb3csIGFzOiBcXCdpdGVtXFwnIH1cIj4gICAgICAgICAgICA8dGQgZGF0YS1iaW5kPVwidGV4dDogaXRlbS50aXRsZSwgY3NzOiAkcm9vdC5jc3MubXVsdGlwbGV0ZXh0Lml0ZW1UaXRsZVwiPjwvdGQ+ICAgICAgICAgICAgPHRkPiAgICAgICAgICAgICAgICA8IS0tIGtvIGlmOiAkcm9vdC5pc0VkaXRNb2RlIC0tPiAgICAgICAgICAgICAgICA8aW5wdXQgdHlwZT1cInRleHRcIiBzdHlsZT1cImZsb2F0OmxlZnRcIiBkYXRhLWJpbmQ9XCJhdHRyOiB7c2l6ZTogcXVlc3Rpb24uaXRlbVNpemUsIGlkOiAoJGluZGV4KCkgPT0gMCkgPyBxdWVzdGlvbi5pbnB1dElkIDogXFwnXFwnfSwgdmFsdWU6IGl0ZW0ua29WYWx1ZSwgY3NzOiAkcm9vdC5jc3MubXVsdGlwbGV0ZXh0Lml0ZW1WYWx1ZVwiIC8+ICAgICAgICAgICAgICAgIDwhLS0gL2tvIC0tPiAgICAgICAgICAgICAgICA8IS0tIGtvIGlmOiAkcm9vdC5pc0Rpc3BsYXlNb2RlIC0tPiAgICAgICAgICAgICAgICA8ZGl2IHN0eWxlPVwiZmxvYXQ6bGVmdFwiIGRhdGEtYmluZD1cImF0dHI6IHtzaXplOiBxdWVzdGlvbi5pdGVtU2l6ZX0sIHRleHQ6IGl0ZW0ua29WYWx1ZSwgY3NzOiAkcm9vdC5jc3MubXVsdGlwbGV0ZXh0Lml0ZW1WYWx1ZVwiPjwvZGl2PiAgICAgICAgICAgICAgICA8IS0tIC9rbyAtLT4gICAgICAgICAgICA8L3RkPiAgICAgICAgPC90cj4gICAgPC90YWJsZT48L3NjcmlwdD48c2NyaXB0IHR5cGU9XCJ0ZXh0L2h0bWxcIiBpZD1cInN1cnZleS1xdWVzdGlvbi1yYWRpb2dyb3VwXCI+ICAgIDxmb3JtIGRhdGEtYmluZD1cImNzczogJHJvb3QuY3NzLnJhZGlvZ3JvdXAucm9vdFwiPiAgICAgICAgPCEtLSBrbyBmb3JlYWNoOiB7IGRhdGE6IHF1ZXN0aW9uLmtvVmlzaWJsZUNob2ljZXMsIGFzOiBcXCdpdGVtXFwnLCBhZnRlclJlbmRlcjogcXVlc3Rpb24ua29BZnRlclJlbmRlcn0gIC0tPiAgICAgICAgPGRpdiAgZGF0YS1iaW5kPVwic3R5bGU6e3dpZHRoOiBxdWVzdGlvbi5rb1dpZHRoLCBcXCdtYXJnaW4tcmlnaHRcXCc6IHF1ZXN0aW9uLmNvbENvdW50ID09IDAgPyBcXCc1cHhcXCc6IFxcJzBweFxcJ30sIGNzczogJHJvb3QuY3NzLnJhZGlvZ3JvdXAuaXRlbVwiPiAgICAgICAgICAgIDxsYWJlbCBkYXRhLWJpbmQ9XCJjc3M6ICRyb290LmNzcy5yYWRpb2dyb3VwLml0ZW1cIj4gICAgICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIGRhdGEtYmluZD1cImF0dHI6IHtuYW1lOiBxdWVzdGlvbi5uYW1lLCB2YWx1ZTogaXRlbS52YWx1ZSwgaWQ6ICgkaW5kZXgoKSA9PSAwKSA/IHF1ZXN0aW9uLmlucHV0SWQgOiBcXCdcXCd9LCBjaGVja2VkOiBxdWVzdGlvbi5rb1ZhbHVlLCBlbmFibGU6ICRyb290LmlzRWRpdE1vZGVcIiAvPiAgICAgICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmQ9XCJ0ZXh0OiBpdGVtLnRleHRcIj48L3NwYW4+ICAgICAgICAgICAgPC9sYWJlbD4gICAgICAgICAgICA8ZGl2IGRhdGEtYmluZD1cInZpc2libGU6IHF1ZXN0aW9uLmhhc090aGVyICYmICgkaW5kZXgoKSA9PSBxdWVzdGlvbi5rb1Zpc2libGVDaG9pY2VzKCkubGVuZ3RoLTEpXCI+ICAgICAgICAgICAgICAgIDxkaXYgZGF0YS1iaW5kPVwidGVtcGxhdGU6IHsgbmFtZTogXFwnc3VydmV5LWNvbW1lbnRcXCcsIGRhdGE6IHtcXCdxdWVzdGlvblxcJzogcXVlc3Rpb24sIFxcJ3Zpc2libGVcXCc6IHF1ZXN0aW9uLmtvT3RoZXJWaXNpYmxlfX0sIGNzczogJHJvb3QuY3NzLnJhZGlvZ3JvdXAub3RoZXJcIj48L2Rpdj4gICAgICAgICAgICA8L2Rpdj4gICAgICAgIDwvZGl2PiAgICAgICAgPCEtLSAva28gLS0+ICAgIDwvZm9ybT48L3NjcmlwdD48c2NyaXB0IHR5cGU9XCJ0ZXh0L2h0bWxcIiBpZD1cInN1cnZleS1xdWVzdGlvbi1yYXRpbmdcIj4gICAgPGRpdiBkYXRhLWJpbmQ9XCJjc3M6ICRyb290LmNzcy5yYXRpbmcucm9vdFwiPiAgICAgICAgPCEtLSBrbyBmb3JlYWNoOiBxdWVzdGlvbi5rb1Zpc2libGVSYXRlVmFsdWVzIC0tPiAgICAgICAgPGxhYmVsIGRhdGEtYmluZD1cImNzczogcXVlc3Rpb24ua29HZXRDc3MoJGRhdGEpXCI+ICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIHN0eWxlPVwiZGlzcGxheTogbm9uZTtcIiAgICAgICAgICAgICAgICAgICAgZGF0YS1iaW5kPVwiYXR0cjoge25hbWU6IHF1ZXN0aW9uLm5hbWUsIGlkOiBxdWVzdGlvbi5uYW1lICsgJGluZGV4KCksIHZhbHVlOiAkZGF0YS52YWx1ZX0sIGV2ZW50OiB7IGNoYW5nZTogcXVlc3Rpb24ua29DaGFuZ2V9LCBlbmFibGU6ICRyb290LmlzRWRpdE1vZGVcIiAvPiAgICAgICAgICAgIDxzcGFuIGRhdGEtYmluZD1cInZpc2libGU6ICRpbmRleCgpID09IDAsIHRleHQ6IHF1ZXN0aW9uLm1pbmludW1SYXRlRGVzY3JpcHRpb25cIj48L3NwYW4+ICAgICAgICAgICAgPHNwYW4gZGF0YS1iaW5kPVwidGV4dDogJGRhdGEudGV4dFwiPjwvc3Bhbj4gICAgICAgICAgICA8c3BhbiBkYXRhLWJpbmQ9XCJ2aXNpYmxlOiAkaW5kZXgoKSA9PSAocXVlc3Rpb24ua29WaXNpYmxlUmF0ZVZhbHVlcygpLmxlbmd0aC0xKSwgdGV4dDogcXVlc3Rpb24ubWF4aW11bVJhdGVEZXNjcmlwdGlvblwiPjwvc3Bhbj4gICAgICAgIDwvbGFiZWw+ICAgICAgICA8IS0tIC9rbyAtLT4gICAgPC9kaXY+ICAgIDxkaXYgZGF0YS1iaW5kPVwidmlzaWJsZTogcXVlc3Rpb24uaGFzT3RoZXJcIj4gICAgICAgIDxkaXYgZGF0YS1iaW5kPVwidGVtcGxhdGU6IHsgbmFtZTogXFwnc3VydmV5LWNvbW1lbnRcXCcsIGRhdGE6IHtcXCdxdWVzdGlvblxcJzogcXVlc3Rpb24gfSB9XCI+PC9kaXY+ICAgIDwvZGl2Pjwvc2NyaXB0PjxzY3JpcHQgdHlwZT1cInRleHQvaHRtbFwiIGlkPVwic3VydmV5LXF1ZXN0aW9uLXRleHRcIj4gICAgPCEtLSBrbyBpZjogJHJvb3QuaXNFZGl0TW9kZSAtLT4gICAgPGlucHV0IGRhdGEtYmluZD1cImF0dHI6IHt0eXBlOiBxdWVzdGlvbi5pbnB1dFR5cGUsIHNpemU6IHF1ZXN0aW9uLnNpemUsIGlkOiBxdWVzdGlvbi5pbnB1dElkfSwgdmFsdWU6cXVlc3Rpb24ua29WYWx1ZSwgY3NzOiAkcm9vdC5jc3MudGV4dFwiLz4gICAgPCEtLSAva28gLS0+ICAgIDwhLS0ga28gaWY6ICRyb290LmlzRGlzcGxheU1vZGUgLS0+ICAgIDxkaXYgZGF0YS1iaW5kPVwidGV4dDpxdWVzdGlvbi5rb1ZhbHVlLCBjc3M6ICRyb290LmNzcy50ZXh0XCI+PC9kaXY+ICAgIDwhLS0gL2tvIC0tPjwvc2NyaXB0PjxzY3JpcHQgdHlwZT1cInRleHQvaHRtbFwiIGlkPVwic3VydmV5LXF1ZXN0aW9uXCI+ICAgIDxkaXYgc3R5bGU9XCJ2ZXJ0aWNhbC1hbGlnbjp0b3BcIiBkYXRhLWJpbmQ9XCJjc3M6ICRyb290LmNzcy5xdWVzdGlvbi5yb290LCBzdHlsZToge2Rpc3BsYXk6IHF1ZXN0aW9uLmtvVmlzaWJsZSgpID8gXFwnaW5saW5lLWJsb2NrXFwnOiBcXCdub25lXFwnLCBtYXJnaW5MZWZ0OiBxdWVzdGlvbi5rb01hcmdpbkxlZnQsIHBhZGRpbmdSaWdodDogcXVlc3Rpb24ua29QYWRkaW5nUmlnaHQsIHdpZHRoOiBxdWVzdGlvbi5rb1JlbmRlcldpZHRoIH0sIGF0dHI6IHtpZDogaWR9XCI+ICAgICAgICA8IS0tIGtvIGlmOiBxdWVzdGlvbi5oYXNUaXRsZSAtLT4gICAgICAgIDxoNSBkYXRhLWJpbmQ9XCJ2aXNpYmxlOiAkcm9vdC5xdWVzdGlvblRpdGxlTG9jYXRpb24gPT0gXFwndG9wXFwnLCB0ZXh0OiBxdWVzdGlvbi5rb1RpdGxlKCksIGNzczogJHJvb3QuY3NzLnF1ZXN0aW9uLnRpdGxlXCI+PC9oNT4gICAgICAgIDwhLS0gL2tvIC0tPiAgICAgICAgPCEtLSBrbyB0ZW1wbGF0ZTogeyBuYW1lOiBcXCdzdXJ2ZXktcXVlc3Rpb24tZXJyb3JzXFwnLCBkYXRhOiBxdWVzdGlvbiB9IC0tPiAgICAgICAgPCEtLSAva28gLS0+ICAgICAgICA8IS0tIGtvIHRlbXBsYXRlOiB7IG5hbWU6IFxcJ3N1cnZleS1xdWVzdGlvbi1cXCcgKyBxdWVzdGlvbi5nZXRUeXBlKCksIGRhdGE6IHF1ZXN0aW9uLCBhZnRlclJlbmRlcjogcXVlc3Rpb24ua29RdWVzdGlvbkFmdGVyUmVuZGVyIH0gLS0+ICAgICAgICA8IS0tIC9rbyAtLT4gICAgICAgIDxkaXYgZGF0YS1iaW5kPVwidmlzaWJsZTogcXVlc3Rpb24uaGFzQ29tbWVudFwiPiAgICAgICAgICAgIDxkaXYgZGF0YS1iaW5kPVwidGV4dDpxdWVzdGlvbi5jb21tZW50VGV4dFwiPjwvZGl2PiAgICAgICAgICAgIDxkaXYgZGF0YS1iaW5kPVwidGVtcGxhdGU6IHsgbmFtZTogXFwnc3VydmV5LWNvbW1lbnRcXCcsIGRhdGE6IHtcXCdxdWVzdGlvblxcJzogcXVlc3Rpb24sIFxcJ3Zpc2libGVcXCc6IHRydWUgfSB9XCI+PC9kaXY+ICAgICAgICA8L2Rpdj4gICAgICAgIDwhLS0ga28gaWY6IHF1ZXN0aW9uLmhhc1RpdGxlIC0tPiAgICAgICAgPGg1IGRhdGEtYmluZD1cInZpc2libGU6ICRyb290LnF1ZXN0aW9uVGl0bGVMb2NhdGlvbiA9PSBcXCdib3R0b21cXCcsIHRleHQ6IHF1ZXN0aW9uLmtvVGl0bGUoKSwgY3NzOiAkcm9vdC5jc3MucXVlc3Rpb24udGl0bGVcIj48L2g1PiAgICAgICAgPCEtLSAva28gLS0+ICAgIDwvZGl2Pjwvc2NyaXB0Pic7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMva25vY2tvdXQvdGVtcGxhdGUua28uaHRtbC50c1xuICoqLyIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uQmFzZX0gZnJvbSBcIi4uL3F1ZXN0aW9uYmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uSW1wbGVtZW50b3JCYXNlIHtcclxuICAgIGtvVmlzaWJsZTogYW55OyBrb0Vycm9yczogYW55OyBrb01hcmdpbkxlZnQ6IGFueTsga29QYWRkaW5nUmlnaHQ6IGFueTsga29SZW5kZXJXaWR0aDogYW55O1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgcXVlc3Rpb24udmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgc2VsZi5vblZpc2liaWxpdHlDaGFuZ2VkKCk7IH07XHJcbiAgICAgICAgcXVlc3Rpb24ucmVuZGVyV2lkdGhDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IHNlbGYub25SZW5kZXJXaWR0aENoYW5nZWQoKTsgfTtcclxuICAgICAgICB0aGlzLmtvVmlzaWJsZSA9IGtvLm9ic2VydmFibGUodGhpcy5xdWVzdGlvbi52aXNpYmxlKTtcclxuICAgICAgICB0aGlzLmtvUmVuZGVyV2lkdGggPSBrby5vYnNlcnZhYmxlKHRoaXMucXVlc3Rpb24ucmVuZGVyV2lkdGgpO1xyXG4gICAgICAgIHRoaXMua29FcnJvcnMgPSBrby5vYnNlcnZhYmxlQXJyYXkoKTtcclxuICAgICAgICB0aGlzLmtvTWFyZ2luTGVmdCA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7IHNlbGYua29SZW5kZXJXaWR0aCgpOyByZXR1cm4gc2VsZi5nZXRJbmRlbnRTaXplKHNlbGYucXVlc3Rpb24uaW5kZW50KTsgfSk7XHJcbiAgICAgICAgdGhpcy5rb1BhZGRpbmdSaWdodCA9IGtvLm9ic2VydmFibGUoc2VsZi5nZXRJbmRlbnRTaXplKHNlbGYucXVlc3Rpb24ucmlnaHRJbmRlbnQpKTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29WaXNpYmxlXCJdID0gdGhpcy5rb1Zpc2libGU7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbltcImtvUmVuZGVyV2lkdGhcIl0gPSB0aGlzLmtvUmVuZGVyV2lkdGg7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbltcImtvRXJyb3JzXCJdID0gdGhpcy5rb0Vycm9ycztcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29NYXJnaW5MZWZ0XCJdID0gdGhpcy5rb01hcmdpbkxlZnQ7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbltcImtvUGFkZGluZ1JpZ2h0XCJdID0gdGhpcy5rb1BhZGRpbmdSaWdodDtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1widXBkYXRlUXVlc3Rpb25cIl0gPSBmdW5jdGlvbiAoKSB7IHNlbGYudXBkYXRlUXVlc3Rpb24oKTsgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVF1ZXN0aW9uKCkgeyAgfVxyXG4gICAgcHJvdGVjdGVkIG9uVmlzaWJpbGl0eUNoYW5nZWQoKSB7XHJcbiAgICAgICAgdGhpcy5rb1Zpc2libGUodGhpcy5xdWVzdGlvbi52aXNpYmxlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblJlbmRlcldpZHRoQ2hhbmdlZCgpIHtcclxuICAgICAgICB0aGlzLmtvUmVuZGVyV2lkdGgodGhpcy5xdWVzdGlvbi5yZW5kZXJXaWR0aCk7XHJcbiAgICAgICAgdGhpcy5rb1BhZGRpbmdSaWdodCh0aGlzLmdldEluZGVudFNpemUodGhpcy5xdWVzdGlvbi5yaWdodEluZGVudCkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRJbmRlbnRTaXplKGluZGVudDogbnVtYmVyKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoaW5kZW50IDwgMSkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXN0aW9uW1wiZGF0YVwiXSkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgdmFyIGNzcyA9IHRoaXMucXVlc3Rpb25bXCJkYXRhXCJdW1wiY3NzXCJdO1xyXG4gICAgICAgIGlmICghY3NzKSByZXR1cm4gXCJcIjtcclxuICAgICAgICByZXR1cm4gaW5kZW50ICogY3NzLnF1ZXN0aW9uLmluZGVudCArIFwicHhcIjtcclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25iYXNlLnRzXG4gKiovIiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25JbXBsZW1lbnRvckJhc2V9IGZyb20gXCIuL2tvcXVlc3Rpb25iYXNlXCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuLi9xdWVzdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uSW1wbGVtZW50b3IgZXh0ZW5kcyBRdWVzdGlvbkltcGxlbWVudG9yQmFzZSB7XHJcbiAgICBwcml2YXRlIGlzVXBkYXRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUga29EdW1teTogYW55O1xyXG4gICAga29WYWx1ZTogYW55OyBrb0NvbW1lbnQ6IGFueTsga29UaXRsZTogYW55O1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHF1ZXN0aW9uOiBRdWVzdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgcXVlc3Rpb24udmFsdWVDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IHNlbGYub25WYWx1ZUNoYW5nZWQoKTsgfTtcclxuICAgICAgICBxdWVzdGlvbi5jb21tZW50Q2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLm9uQ29tbWVudENoYW5nZWQoKTsgfTtcclxuICAgICAgICBxdWVzdGlvbi5lcnJvcnNDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IHNlbGYub25FcnJvcnNDaGFuZ2VkKCk7IH07XHJcbiAgICAgICAgcXVlc3Rpb24udGl0bGVDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IHNlbGYub25WaXNpYmxlSW5kZXhDaGFuZ2VkKCk7IH07XHJcbiAgICAgICAgcXVlc3Rpb24udmlzaWJsZUluZGV4Q2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLm9uVmlzaWJsZUluZGV4Q2hhbmdlZCgpOyB9O1xyXG4gICAgICAgIHRoaXMua29EdW1teSA9IGtvLm9ic2VydmFibGUoMCk7XHJcbiAgICAgICAgdGhpcy5rb1ZhbHVlID0gdGhpcy5jcmVhdGVrb1ZhbHVlKCk7XHJcbiAgICAgICAgdGhpcy5rb0NvbW1lbnQgPSBrby5vYnNlcnZhYmxlKHRoaXMucXVlc3Rpb24uY29tbWVudCk7XHJcbiAgICAgICAgdGhpcy5rb1RpdGxlID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHsgc2VsZi5rb0R1bW15KCk7IHJldHVybiBzZWxmLnF1ZXN0aW9uLmZ1bGxUaXRsZTsgfSk7XHJcbiAgICAgICAgdGhpcy5rb0Vycm9ycyh0aGlzLnF1ZXN0aW9uLmVycm9ycyk7XHJcbiAgICAgICAgdGhpcy5rb1ZhbHVlLnN1YnNjcmliZShmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgc2VsZi51cGRhdGVWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICAgICAgdGhpcy5rb0NvbW1lbnQuc3Vic2NyaWJlKGZ1bmN0aW9uIChuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICBzZWxmLnVwZGF0ZUNvbW1lbnQobmV3VmFsdWUpO1xyXG4gICAgICAgIH0pO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb1ZhbHVlXCJdID0gdGhpcy5rb1ZhbHVlO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb0NvbW1lbnRcIl0gPSB0aGlzLmtvQ29tbWVudDtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29UaXRsZVwiXSA9IHRoaXMua29UaXRsZTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29RdWVzdGlvbkFmdGVyUmVuZGVyXCJdID0gdGhpcy5rb1F1ZXN0aW9uQWZ0ZXJSZW5kZXI7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlUXVlc3Rpb24oKSB7XHJcbiAgICAgICAgdGhpcy5rb0R1bW15KHRoaXMua29EdW1teSgpICsgMSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25WYWx1ZUNoYW5nZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNVcGRhdGluZykgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2V0a29WYWx1ZSh0aGlzLnF1ZXN0aW9uLnZhbHVlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkNvbW1lbnRDaGFuZ2VkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVXBkYXRpbmcpIHJldHVybjtcclxuICAgICAgICB0aGlzLmtvQ29tbWVudCh0aGlzLnF1ZXN0aW9uLmNvbW1lbnQpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uVmlzaWJpbGl0eUNoYW5nZWQoKSB7XHJcbiAgICAgICAgdGhpcy5rb1Zpc2libGUodGhpcy5xdWVzdGlvbi52aXNpYmxlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblZpc2libGVJbmRleENoYW5nZWQoKSB7XHJcbiAgICAgICAgdGhpcy5rb0R1bW15KHRoaXMua29EdW1teSgpICsgMSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25FcnJvcnNDaGFuZ2VkKCkge1xyXG4gICAgICAgIHRoaXMua29FcnJvcnModGhpcy5xdWVzdGlvbi5lcnJvcnMpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZWtvVmFsdWUoKTogYW55IHsgcmV0dXJuIGtvLm9ic2VydmFibGUodGhpcy5xdWVzdGlvbi52YWx1ZSk7IH1cclxuICAgIHByb3RlY3RlZCBzZXRrb1ZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmtvVmFsdWUobmV3VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHVwZGF0ZVZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmlzVXBkYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24udmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLmlzVXBkYXRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCB1cGRhdGVDb21tZW50KG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmlzVXBkYXRpbmcgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24uY29tbWVudCA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMuaXNVcGRhdGluZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldE5vKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucXVlc3Rpb24udmlzaWJsZUluZGV4ID4gLTEgPyB0aGlzLnF1ZXN0aW9uLnZpc2libGVJbmRleCArIDEgKyBcIi4gXCIgOiBcIlwiO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGtvUXVlc3Rpb25BZnRlclJlbmRlcihlbCwgY29uKSB7XHJcbiAgICAgICAgdmFyIHRFbCA9IGVsWzBdO1xyXG4gICAgICAgIGlmICh0RWwubm9kZU5hbWUgPT0gXCIjdGV4dFwiKSB0RWwuZGF0YSA9IFwiXCI7XHJcbiAgICAgICAgdEVsID0gZWxbZWwubGVuZ3RoIC0gMV07XHJcbiAgICAgICAgaWYgKHRFbC5ub2RlTmFtZSA9PSBcIiN0ZXh0XCIpIHRFbC5kYXRhID0gXCJcIjtcclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb24udHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBrbyBmcm9tIFwia25vY2tvdXRcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkltcGxlbWVudG9yfSBmcm9tIFwiLi9rb3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuLi9xdWVzdGlvblwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uU2VsZWN0QmFzZSwgUXVlc3Rpb25DaGVja2JveEJhc2V9IGZyb20gXCIuLi9xdWVzdGlvbl9iYXNlc2VsZWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25TZWxlY3RCYXNlSW1wbGVtZW50b3IgZXh0ZW5kcyBRdWVzdGlvbkltcGxlbWVudG9ye1xyXG4gICAga29PdGhlclZpc2libGU6IGFueTsga29WaXNpYmxlQ2hvaWNlczogYW55O1xyXG4gICAgY29uc3RydWN0b3IocXVlc3Rpb246IFF1ZXN0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIocXVlc3Rpb24pO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuXHJcbiAgICAgICAgdGhpcy5rb090aGVyVmlzaWJsZSA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uICgpIHsgc2VsZi5rb1ZhbHVlKCk7IHJldHVybiBzZWxmLmlzT3RoZXJTZWxlY3RlZDsgfSk7XHJcbiAgICAgICAgdGhpcy5rb1Zpc2libGVDaG9pY2VzID0ga28ub2JzZXJ2YWJsZUFycmF5KCg8UXVlc3Rpb25DaGVja2JveEJhc2U+c2VsZi5xdWVzdGlvbikudmlzaWJsZUNob2ljZXMpO1xyXG4gICAgICAgICg8UXVlc3Rpb25DaGVja2JveEJhc2U+cXVlc3Rpb24pLmNob2ljZXNDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7IHNlbGYua29WaXNpYmxlQ2hvaWNlcygoPFF1ZXN0aW9uQ2hlY2tib3hCYXNlPnNlbGYucXVlc3Rpb24pLnZpc2libGVDaG9pY2VzKTsgfTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29PdGhlclZpc2libGVcIl0gPSB0aGlzLmtvT3RoZXJWaXNpYmxlO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb1Zpc2libGVDaG9pY2VzXCJdID0gdGhpcy5rb1Zpc2libGVDaG9pY2VzO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldCBpc090aGVyU2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICg8UXVlc3Rpb25TZWxlY3RCYXNlPnRoaXMucXVlc3Rpb24pLmlzT3RoZXJTZWxlY3RlZDtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25DaGVja2JveEJhc2VJbXBsZW1lbnRvciBleHRlbmRzIFF1ZXN0aW9uU2VsZWN0QmFzZUltcGxlbWVudG9yIHtcclxuICAgIGtvV2lkdGg6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uKTtcclxuICAgICAgICB0aGlzLmtvV2lkdGggPSBrby5vYnNlcnZhYmxlKHRoaXMuY29sV2lkdGgpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb1dpZHRoXCJdID0gdGhpcy5rb1dpZHRoO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb0FmdGVyUmVuZGVyXCJdID0gdGhpcy5rb0FmdGVyUmVuZGVyO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAoPFF1ZXN0aW9uQ2hlY2tib3hCYXNlPnRoaXMucXVlc3Rpb24pLmNvbENvdW50Q2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLm9uQ29sQ291bnRDaGFuZ2VkKCk7IH07XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25Db2xDb3VudENoYW5nZWQoKSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbltcImtvV2lkdGhcIl0gPSBrby5vYnNlcnZhYmxlKHRoaXMuY29sV2lkdGgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldCBjb2xXaWR0aCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBjb2xDb3VudCA9ICg8UXVlc3Rpb25DaGVja2JveEJhc2U+dGhpcy5xdWVzdGlvbikuY29sQ291bnQ7XHJcbiAgICAgICAgcmV0dXJuIGNvbENvdW50ID4gMCA/ICgxMDAgLyBjb2xDb3VudCkgKyAnJScgOiBcIlwiO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBrb0FmdGVyUmVuZGVyKGVsLCBjb24pIHtcclxuICAgICAgICB2YXIgdEVsID0gZWxbMF07XHJcbiAgICAgICAgaWYgKHRFbC5ub2RlTmFtZSA9PSBcIiN0ZXh0XCIpIHRFbC5kYXRhID0gXCJcIjtcclxuICAgICAgICB0RWwgPSBlbFtlbC5sZW5ndGggLSAxXTtcclxuICAgICAgICBpZiAodEVsLm5vZGVOYW1lID09IFwiI3RleHRcIikgdEVsLmRhdGEgPSBcIlwiO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMva25vY2tvdXQva29xdWVzdGlvbl9iYXNlc2VsZWN0LnRzXG4gKiovIiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25DaGVja2JveEJhc2VJbXBsZW1lbnRvcn0gZnJvbSBcIi4va29xdWVzdGlvbl9iYXNlc2VsZWN0XCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4uL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkNoZWNrYm94TW9kZWx9IGZyb20gXCIuLi9xdWVzdGlvbl9jaGVja2JveFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9ufSBmcm9tIFwiLi4vcXVlc3Rpb25cIjtcclxuXHJcbmNsYXNzIFF1ZXN0aW9uQ2hlY2tib3hJbXBsZW1lbnRvciBleHRlbmRzIFF1ZXN0aW9uQ2hlY2tib3hCYXNlSW1wbGVtZW50b3Ige1xyXG4gICAgY29uc3RydWN0b3IocXVlc3Rpb246IFF1ZXN0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIocXVlc3Rpb24pO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZWtvVmFsdWUoKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5xdWVzdGlvbi52YWx1ZSA/IGtvLm9ic2VydmFibGVBcnJheSh0aGlzLnF1ZXN0aW9uLnZhbHVlKSA6IGtvLm9ic2VydmFibGVBcnJheSgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHNldGtvVmFsdWUobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIGlmIChuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICB0aGlzLmtvVmFsdWUoW10uY29uY2F0KG5ld1ZhbHVlKSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5rb1ZhbHVlKFtdKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ2hlY2tib3ggZXh0ZW5kcyBRdWVzdGlvbkNoZWNrYm94TW9kZWwge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIG5ldyBRdWVzdGlvbkNoZWNrYm94SW1wbGVtZW50b3IodGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEub3ZlcnJpZGVDbGFzc0NyZWF0b3JlKFwiY2hlY2tib3hcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uQ2hlY2tib3goXCJcIik7IH0pO1xyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcImNoZWNrYm94XCIsIChuYW1lKSA9PiB7IHZhciBxID0gbmV3IFF1ZXN0aW9uQ2hlY2tib3gobmFtZSk7IHEuY2hvaWNlcyA9IFF1ZXN0aW9uRmFjdG9yeS5EZWZhdWx0Q2hvaWNlczsgcmV0dXJuIHE7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fY2hlY2tib3gudHNcbiAqKi8iLCJpbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25Db21tZW50TW9kZWx9IGZyb20gXCIuLi9xdWVzdGlvbl9jb21tZW50XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25JbXBsZW1lbnRvcn0gZnJvbSBcIi4va29xdWVzdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ29tbWVudCBleHRlbmRzIFF1ZXN0aW9uQ29tbWVudE1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICBuZXcgUXVlc3Rpb25JbXBsZW1lbnRvcih0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5vdmVycmlkZUNsYXNzQ3JlYXRvcmUoXCJjb21tZW50XCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbkNvbW1lbnQoXCJcIik7IH0pO1xyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcImNvbW1lbnRcIiwgKG5hbWUpID0+IHsgcmV0dXJuIG5ldyBRdWVzdGlvbkNvbW1lbnQobmFtZSk7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fY29tbWVudC50c1xuICoqLyIsImltcG9ydCB7UXVlc3Rpb25Ecm9wZG93bk1vZGVsfSBmcm9tIFwiLi4vcXVlc3Rpb25fZHJvcGRvd25cIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4uL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uU2VsZWN0QmFzZUltcGxlbWVudG9yfSBmcm9tIFwiLi9rb3F1ZXN0aW9uX2Jhc2VzZWxlY3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkRyb3Bkb3duIGV4dGVuZHMgUXVlc3Rpb25Ecm9wZG93bk1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICBuZXcgUXVlc3Rpb25TZWxlY3RCYXNlSW1wbGVtZW50b3IodGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEub3ZlcnJpZGVDbGFzc0NyZWF0b3JlKFwiZHJvcGRvd25cIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uRHJvcGRvd24oXCJcIik7IH0pO1xyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcImRyb3Bkb3duXCIsIChuYW1lKSA9PiB7IHZhciBxID0gbmV3IFF1ZXN0aW9uRHJvcGRvd24obmFtZSk7IHEuY2hvaWNlcyA9IFF1ZXN0aW9uRmFjdG9yeS5EZWZhdWx0Q2hvaWNlczsgcmV0dXJuIHE7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fZHJvcGRvd24udHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBrbyBmcm9tIFwia25vY2tvdXRcIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4uL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmlsZU1vZGVsfSBmcm9tIFwiLi4vcXVlc3Rpb25fZmlsZVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uSW1wbGVtZW50b3J9IGZyb20gXCIuL2tvcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4uL3F1ZXN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25GaWxlSW1wbGVtZW50b3IgZXh0ZW5kcyBRdWVzdGlvbkltcGxlbWVudG9yIHtcclxuICAgIGtvRGF0YVVwZGF0ZXI6IGFueTsga29EYXRhOiBhbnk7IGtvSGFzVmFsdWU6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5rb0RhdGFVcGRhdGVyID0ga28ub2JzZXJ2YWJsZSgwKTtcclxuICAgICAgICB0aGlzLmtvRGF0YSA9IGtvLmNvbXB1dGVkKGZ1bmN0aW9uICgpIHsgc2VsZi5rb0RhdGFVcGRhdGVyKCk7IHJldHVybiAoPFF1ZXN0aW9uRmlsZU1vZGVsPnNlbGYucXVlc3Rpb24pLnByZXZpZXdWYWx1ZTsgfSk7XHJcbiAgICAgICAgdGhpcy5rb0hhc1ZhbHVlID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbltcImtvRGF0YVwiXSA9IHRoaXMua29EYXRhO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb0hhc1ZhbHVlXCJdID0gdGhpcy5rb0hhc1ZhbHVlO1xyXG5cclxuICAgICAgICAoPFF1ZXN0aW9uRmlsZU1vZGVsPnRoaXMucXVlc3Rpb24pLnByZXZpZXdWYWx1ZUxvYWRlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLm9uTG9hZFByZXZpZXcoKTsgfTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wiZG9jaGFuZ2VcIl0gPSBmdW5jdGlvbiAoZGF0YSwgZXZlbnQpIHsgdmFyIHNyYyA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50OyBzZWxmLm9uQ2hhbmdlKHNyYyk7IH07XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uQ2hhbmdlKHNyYzogYW55KSB7XHJcbiAgICAgICAgaWYgKCF3aW5kb3dbXCJGaWxlUmVhZGVyXCJdKSByZXR1cm47XHJcbiAgICAgICAgaWYgKCFzcmMgfHwgIXNyYy5maWxlcyB8fCBzcmMuZmlsZXMubGVuZ3RoIDwgMSkgcmV0dXJuO1xyXG4gICAgICAgICg8UXVlc3Rpb25GaWxlTW9kZWw+dGhpcy5xdWVzdGlvbikubG9hZEZpbGUoc3JjLmZpbGVzWzBdKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb25Mb2FkUHJldmlldygpIHtcclxuICAgICAgICB0aGlzLmtvRGF0YVVwZGF0ZXIodGhpcy5rb0RhdGFVcGRhdGVyKCkgKyAxKTtcclxuICAgICAgICB0aGlzLmtvSGFzVmFsdWUodHJ1ZSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uRmlsZSBleHRlbmRzIFF1ZXN0aW9uRmlsZU1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICBuZXcgUXVlc3Rpb25GaWxlSW1wbGVtZW50b3IodGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEub3ZlcnJpZGVDbGFzc0NyZWF0b3JlKFwiZmlsZVwiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUXVlc3Rpb25GaWxlKFwiXCIpOyB9KTtcclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJmaWxlXCIsIChuYW1lKSA9PiB7IHJldHVybiBuZXcgUXVlc3Rpb25GaWxlKG5hbWUpOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX2ZpbGUudHNcbiAqKi8iLCJpbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25JbXBsZW1lbnRvckJhc2V9IGZyb20gXCIuL2tvcXVlc3Rpb25iYXNlXCI7XHJcbmltcG9ydCB7UXVlc3Rpb25IdG1sTW9kZWx9IGZyb20gXCIuLi9xdWVzdGlvbl9odG1sXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25IdG1sIGV4dGVuZHMgUXVlc3Rpb25IdG1sTW9kZWwge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIG5ldyBRdWVzdGlvbkltcGxlbWVudG9yQmFzZSh0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5vdmVycmlkZUNsYXNzQ3JlYXRvcmUoXCJodG1sXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbkh0bWwoXCJcIik7IH0pO1xyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcImh0bWxcIiwgKG5hbWUpID0+IHsgcmV0dXJuIG5ldyBRdWVzdGlvbkh0bWwobmFtZSk7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25faHRtbC50c1xuICoqLyIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uTWF0cml4TW9kZWwsIE1hdHJpeFJvd01vZGVsLCBJTWF0cml4RGF0YX0gZnJvbSBcIi4uL3F1ZXN0aW9uX21hdHJpeFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uSW1wbGVtZW50b3J9IGZyb20gXCIuL2tvcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4uL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIE1hdHJpeFJvdyBleHRlbmRzIE1hdHJpeFJvd01vZGVsIHtcclxuICAgIHByaXZhdGUgaXNWYWx1ZVVwZGF0aW5nID0gZmFsc2U7XHJcbiAgICBrb1ZhbHVlOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogYW55LCBwdWJsaWMgdGV4dDogc3RyaW5nLCBwdWJsaWMgZnVsbE5hbWU6IHN0cmluZywgZGF0YTogSU1hdHJpeERhdGEsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihuYW1lLCB0ZXh0LCBmdWxsTmFtZSwgZGF0YSwgdmFsdWUpO1xyXG4gICAgICAgIHRoaXMua29WYWx1ZSA9IGtvLm9ic2VydmFibGUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMua29WYWx1ZS5zdWJzY3JpYmUoZnVuY3Rpb24gKG5ld1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIGlmIChzZWxmLmlzVmFsdWVVcGRhdGluZykgdHJ1ZTtcclxuICAgICAgICAgICAgc2VsZi52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uVmFsdWVDaGFuZ2VkKCkge1xyXG4gICAgICAgIHRoaXMuaXNWYWx1ZVVwZGF0aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmtvVmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5pc1ZhbHVlVXBkYXRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25NYXRyaXggZXh0ZW5kcyBRdWVzdGlvbk1hdHJpeE1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICBuZXcgUXVlc3Rpb25JbXBsZW1lbnRvcih0aGlzKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVNYXRyaXhSb3cobmFtZTogYW55LCB0ZXh0OiBzdHJpbmcsIGZ1bGxOYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpOiBNYXRyaXhSb3dNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXhSb3cobmFtZSwgdGV4dCwgZnVsbE5hbWUsIHRoaXMsIHZhbHVlKTtcclxuICAgIH1cclxufVxyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5vdmVycmlkZUNsYXNzQ3JlYXRvcmUoXCJtYXRyaXhcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uTWF0cml4KFwiXCIpOyB9KTtcclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJtYXRyaXhcIiwgKG5hbWUpID0+IHsgdmFyIHEgPSBuZXcgUXVlc3Rpb25NYXRyaXgobmFtZSk7IHEucm93cyA9IFtcIlJvdyAxXCIsIFwiUm93IDJcIl07IHEuY29sdW1ucyA9IFtcIkNvbHVtbiAxXCIsIFwiQ29sdW1uIDJcIiwgXCJDb2x1bW4gM1wiXTsgcmV0dXJuIHE7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fbWF0cml4LnRzXG4gKiovIiwiaW1wb3J0IHtRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWx9IGZyb20gXCIuLi9xdWVzdGlvbl9tYXRyaXhkcm9wZG93blwiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25JbXBsZW1lbnRvcn0gZnJvbSBcIi4va29xdWVzdGlvblwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTWF0cml4RHJvcGRvd24gZXh0ZW5kcyBRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWwge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIG5ldyBRdWVzdGlvbkltcGxlbWVudG9yKHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLm92ZXJyaWRlQ2xhc3NDcmVhdG9yZShcIm1hdHJpeGRyb3Bkb3duXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbk1hdHJpeERyb3Bkb3duKFwiXCIpOyB9KTtcclxuXHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwibWF0cml4ZHJvcGRvd25cIiwgKG5hbWUpID0+IHsgdmFyIHEgPSBuZXcgUXVlc3Rpb25NYXRyaXhEcm9wZG93bihuYW1lKTsgcS5jaG9pY2VzID0gWzEsIDIsIDMsIDQsIDVdOyBxLnJvd3MgPSBbXCJSb3cgMVwiLCBcIlJvdyAyXCJdOyBxLmFkZENvbHVtbihcIkNvbHVtbiAxXCIpOyBxLmFkZENvbHVtbihcIkNvbHVtbiAyXCIpOyBxLmFkZENvbHVtbihcIkNvbHVtbiAzXCIpOyByZXR1cm4gcTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMva25vY2tvdXQva29xdWVzdGlvbl9tYXRyaXhkcm9wZG93bi50c1xuICoqLyIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25JbXBsZW1lbnRvcn0gZnJvbSBcIi4va29xdWVzdGlvblwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uTWF0cml4RHluYW1pY01vZGVsfSBmcm9tIFwiLi4vcXVlc3Rpb25fbWF0cml4ZHluYW1pY1wiO1xyXG5pbXBvcnQge1F1ZXN0aW9ufSBmcm9tIFwiLi4vcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWxCYXNlfSBmcm9tIFwiLi4vcXVlc3Rpb25fbWF0cml4ZHJvcGRvd25iYXNlXCI7XHJcbmltcG9ydCB7TWF0cml4RHluYW1pY1Jvd01vZGVsfSBmcm9tIFwiLi4vcXVlc3Rpb25fbWF0cml4ZHluYW1pY1wiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTWF0cml4RHluYW1pY0ltcGxlbWVudG9yIGV4dGVuZHMgUXVlc3Rpb25JbXBsZW1lbnRvciB7XHJcbiAgICBrb1Jvd3M6IGFueTsga29SZWNhbGM6IGFueTtcclxuICAgIGtvQWRkUm93Q2xpY2s6IGFueTsga29SZW1vdmVSb3dDbGljazogYW55OyBrb092ZXJmbG93WDogYW55O1xyXG4gICAgY29uc3RydWN0b3IocXVlc3Rpb246IFF1ZXN0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIocXVlc3Rpb24pO1xyXG4gICAgICAgIHRoaXMua29SZWNhbGMgPSBrby5vYnNlcnZhYmxlKDApO1xyXG4gICAgICAgIHRoaXMua29Sb3dzID0ga28ucHVyZUNvbXB1dGVkKGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdGhpcy5rb1JlY2FsYygpOyByZXR1cm4gKDxRdWVzdGlvbk1hdHJpeER5bmFtaWM+dGhpcy5xdWVzdGlvbikuY2FjaGVkVmlzaWJsZVJvd3M7XHJcbiAgICAgICAgfSwgdGhpcyk7XHJcbiAgICAgICAgdGhpcy5rb092ZXJmbG93WCA9IGtvLnB1cmVDb21wdXRlZChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiAoPFF1ZXN0aW9uTWF0cml4RHJvcGRvd25Nb2RlbEJhc2U+dGhpcy5xdWVzdGlvbikuaG9yaXpvbnRhbFNjcm9sbCA/IFwic2Nyb2xsXCI6IFwibm9uZVwiO1xyXG4gICAgICAgIH0sIHRoaXMpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb1Jvd3NcIl0gPSB0aGlzLmtvUm93cztcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5rb0FkZFJvd0NsaWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLmFkZFJvdygpOyB9XHJcbiAgICAgICAgdGhpcy5rb1JlbW92ZVJvd0NsaWNrID0gZnVuY3Rpb24gKGRhdGEpIHsgc2VsZi5yZW1vdmVSb3coZGF0YSk7IH1cclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29BZGRSb3dDbGlja1wiXSA9IHRoaXMua29BZGRSb3dDbGljaztcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29SZW1vdmVSb3dDbGlja1wiXSA9IHRoaXMua29SZW1vdmVSb3dDbGljaztcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29PdmVyZmxvd1hcIl0gPSB0aGlzLmtvT3ZlcmZsb3dYO1xyXG4gICAgICAgICg8UXVlc3Rpb25NYXRyaXhEeW5hbWljPnRoaXMucXVlc3Rpb24pLnJvd0NvdW50Q2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLm9uUm93Q291bnRDaGFuZ2VkKCk7IH07XHJcbiAgICAgICAgKDxRdWVzdGlvbk1hdHJpeER5bmFtaWM+dGhpcy5xdWVzdGlvbikuY29sdW1uc0NoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgc2VsZi5vbkNvbHVtbkNoYW5nZWQoKTsgfTtcclxuICAgICAgICAoPFF1ZXN0aW9uTWF0cml4RHluYW1pYz50aGlzLnF1ZXN0aW9uKS51cGRhdGVDZWxsc0NhbGxiYWsgPSBmdW5jdGlvbiAoKSB7IHNlbGYub25VcGRhdGVDZWxscygpOyB9O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uVXBkYXRlQ2VsbHMoKSB7XHJcbiAgICAgICAgLy9HZW5lcmVhdGUgcm93cyBhZ2Fpbi5cclxuICAgICAgICB2YXIgcm93cyA9ICg8UXVlc3Rpb25NYXRyaXhEeW5hbWljPnRoaXMucXVlc3Rpb24pW1wiZ2VuZXJhdGVkVmlzaWJsZVJvd3NcIl07XHJcbiAgICAgICAgdmFyIGNvbHVtbnMgPSAoPFF1ZXN0aW9uTWF0cml4RHluYW1pYz50aGlzLnF1ZXN0aW9uKS5jb2x1bW5zO1xyXG4gICAgICAgIGlmIChyb3dzICYmIHJvd3MubGVuZ3RoID4gMCAmJiBjb2x1bW5zICYmIGNvbHVtbnMubGVuZ3RoID4gMCkgdGhpcy5vbkNvbHVtbkNoYW5nZWQoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkNvbHVtbkNoYW5nZWQoKSB7XHJcbiAgICAgICAgdmFyIHJvd3MgPSAoPFF1ZXN0aW9uTWF0cml4RHluYW1pYz50aGlzLnF1ZXN0aW9uKS52aXNpYmxlUm93cztcclxuICAgICAgICB0aGlzLm9uUm93Q291bnRDaGFuZ2VkKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25Sb3dDb3VudENoYW5nZWQoKSB7XHJcbiAgICAgICAgdGhpcy5rb1JlY2FsYyh0aGlzLmtvUmVjYWxjKCkgKyAxKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBhZGRSb3coKSB7XHJcbiAgICAgICAgKDxRdWVzdGlvbk1hdHJpeER5bmFtaWM+dGhpcy5xdWVzdGlvbikuYWRkUm93KCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVtb3ZlUm93KHJvdzogTWF0cml4RHluYW1pY1Jvd01vZGVsKSB7XHJcbiAgICAgICAgdmFyIHJvd3MgPSAoPFF1ZXN0aW9uTWF0cml4RHluYW1pYz50aGlzLnF1ZXN0aW9uKS5jYWNoZWRWaXNpYmxlUm93cztcclxuICAgICAgICB2YXIgaW5kZXggPSByb3dzLmluZGV4T2Yocm93KTtcclxuICAgICAgICBpZiAoaW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICAoPFF1ZXN0aW9uTWF0cml4RHluYW1pYz50aGlzLnF1ZXN0aW9uKS5yZW1vdmVSb3coaW5kZXgpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTWF0cml4RHluYW1pYyBleHRlbmRzIFF1ZXN0aW9uTWF0cml4RHluYW1pY01vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICBuZXcgUXVlc3Rpb25NYXRyaXhEeW5hbWljSW1wbGVtZW50b3IodGhpcyk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEub3ZlcnJpZGVDbGFzc0NyZWF0b3JlKFwibWF0cml4ZHluYW1pY1wiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUXVlc3Rpb25NYXRyaXhEeW5hbWljKFwiXCIpOyB9KTtcclxuXHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwibWF0cml4ZHluYW1pY1wiLCAobmFtZSkgPT4geyB2YXIgcSA9IG5ldyBRdWVzdGlvbk1hdHJpeER5bmFtaWMobmFtZSk7IHEuY2hvaWNlcyA9IFsxLCAyLCAzLCA0LCA1XTsgcS5yb3dDb3VudCA9IDI7IHEuYWRkQ29sdW1uKFwiQ29sdW1uIDFcIik7IHEuYWRkQ29sdW1uKFwiQ29sdW1uIDJcIik7IHEuYWRkQ29sdW1uKFwiQ29sdW1uIDNcIik7IHJldHVybiBxOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rbm9ja291dC9rb3F1ZXN0aW9uX21hdHJpeGR5bmFtaWMudHNcbiAqKi8iLCJpbXBvcnQgKiBhcyBrbyBmcm9tIFwia25vY2tvdXRcIjtcclxuaW1wb3J0IHtRdWVzdGlvbk11bHRpcGxlVGV4dE1vZGVsLCBNdWx0aXBsZVRleHRJdGVtTW9kZWx9IGZyb20gXCIuLi9xdWVzdGlvbl9tdWx0aXBsZXRleHRcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkltcGxlbWVudG9yfSBmcm9tIFwiLi9rb3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuLi9xdWVzdGlvblwiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVUZXh0SXRlbSBleHRlbmRzIE11bHRpcGxlVGV4dEl0ZW1Nb2RlbCB7XHJcbiAgICBwcml2YXRlIGlzS09WYWx1ZVVwZGF0aW5nID0gZmFsc2U7XHJcbiAgICBrb1ZhbHVlOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogYW55ID0gbnVsbCwgdGl0bGU6IHN0cmluZyA9IG51bGwpIHtcclxuICAgICAgICBzdXBlcihuYW1lLCB0aXRsZSk7XHJcbiAgICAgICAgdGhpcy5rb1ZhbHVlID0ga28ub2JzZXJ2YWJsZSh0aGlzLnZhbHVlKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5rb1ZhbHVlLnN1YnNjcmliZShmdW5jdGlvbiAobmV3VmFsdWUpIHtcclxuICAgICAgICAgICAgaWYgKCFzZWxmLmlzS09WYWx1ZVVwZGF0aW5nKSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIG9uVmFsdWVDaGFuZ2VkKG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmlzS09WYWx1ZVVwZGF0aW5nID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLmtvVmFsdWUobmV3VmFsdWUpO1xyXG4gICAgICAgIHRoaXMuaXNLT1ZhbHVlVXBkYXRpbmcgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uTXVsdGlwbGVUZXh0SW1wbGVtZW50b3IgZXh0ZW5kcyBRdWVzdGlvbkltcGxlbWVudG9yIHtcclxuICAgIGtvUm93czogYW55O1xyXG4gICAgY29uc3RydWN0b3IocXVlc3Rpb246IFF1ZXN0aW9uKSB7XHJcbiAgICAgICAgc3VwZXIocXVlc3Rpb24pO1xyXG4gICAgICAgIHRoaXMua29Sb3dzID0ga28ub2JzZXJ2YWJsZUFycmF5KCg8UXVlc3Rpb25NdWx0aXBsZVRleHRNb2RlbD50aGlzLnF1ZXN0aW9uKS5nZXRSb3dzKCkpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25bXCJrb1Jvd3NcIl0gPSB0aGlzLmtvUm93cztcclxuICAgICAgICB0aGlzLm9uQ29sQ291bnRDaGFuZ2VkKCk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICg8UXVlc3Rpb25NdWx0aXBsZVRleHRNb2RlbD50aGlzLnF1ZXN0aW9uKS5jb2xDb3VudENoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgc2VsZi5vbkNvbENvdW50Q2hhbmdlZCgpOyB9O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uQ29sQ291bnRDaGFuZ2VkKCkge1xyXG4gICAgICAgIHRoaXMua29Sb3dzKCg8UXVlc3Rpb25NdWx0aXBsZVRleHRNb2RlbD50aGlzLnF1ZXN0aW9uKS5nZXRSb3dzKCkpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25NdWx0aXBsZVRleHQgZXh0ZW5kcyBRdWVzdGlvbk11bHRpcGxlVGV4dE1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICBuZXcgUXVlc3Rpb25NdWx0aXBsZVRleHRJbXBsZW1lbnRvcih0aGlzKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVUZXh0SXRlbShuYW1lOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcpOiBNdWx0aXBsZVRleHRJdGVtTW9kZWwge1xyXG4gICAgICAgIHJldHVybiBuZXcgTXVsdGlwbGVUZXh0SXRlbShuYW1lLCB0aXRsZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEub3ZlcnJpZGVDbGFzc0NyZWF0b3JlKFwibXVsdGlwbGV0ZXh0aXRlbVwiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgTXVsdGlwbGVUZXh0SXRlbShcIlwiKTsgfSk7XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLm92ZXJyaWRlQ2xhc3NDcmVhdG9yZShcIm11bHRpcGxldGV4dFwiLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUXVlc3Rpb25NdWx0aXBsZVRleHQoXCJcIik7IH0pO1xyXG5cclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJtdWx0aXBsZXRleHRcIiwgKG5hbWUpID0+IHsgdmFyIHEgPSBuZXcgUXVlc3Rpb25NdWx0aXBsZVRleHQobmFtZSk7IHEuYWRkSXRlbShcInRleHQxXCIpOyBxLmFkZEl0ZW0oXCJ0ZXh0MlwiKTsgcmV0dXJuIHE7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fbXVsdGlwbGV0ZXh0LnRzXG4gKiovIiwiaW1wb3J0IHtRdWVzdGlvblJhZGlvZ3JvdXBNb2RlbH0gZnJvbSBcIi4uL3F1ZXN0aW9uX3JhZGlvZ3JvdXBcIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4uL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uQ2hlY2tib3hCYXNlSW1wbGVtZW50b3J9IGZyb20gXCIuL2tvcXVlc3Rpb25fYmFzZXNlbGVjdFwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uUmFkaW9ncm91cCBleHRlbmRzIFF1ZXN0aW9uUmFkaW9ncm91cE1vZGVsIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgICAgICBuZXcgUXVlc3Rpb25DaGVja2JveEJhc2VJbXBsZW1lbnRvcih0aGlzKTtcclxuICAgIH1cclxufVxyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5vdmVycmlkZUNsYXNzQ3JlYXRvcmUoXCJyYWRpb2dyb3VwXCIsIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvblJhZGlvZ3JvdXAoXCJcIik7IH0pO1xyXG5cclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJyYWRpb2dyb3VwXCIsIChuYW1lKSA9PiB7IHZhciBxID0gbmV3IFF1ZXN0aW9uUmFkaW9ncm91cChuYW1lKTsgcS5jaG9pY2VzID0gUXVlc3Rpb25GYWN0b3J5LkRlZmF1bHRDaG9pY2VzOyByZXR1cm4gcTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMva25vY2tvdXQva29xdWVzdGlvbl9yYWRpb2dyb3VwLnRzXG4gKiovIiwiaW1wb3J0ICogYXMga28gZnJvbSBcImtub2Nrb3V0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25JbXBsZW1lbnRvcn0gZnJvbSBcIi4va29xdWVzdGlvblwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uUmF0aW5nTW9kZWx9IGZyb20gXCIuLi9xdWVzdGlvbl9yYXRpbmdcIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4uL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9ufSBmcm9tIFwiLi4vcXVlc3Rpb25cIjtcclxuXHJcbmNsYXNzIFF1ZXN0aW9uUmF0aW5nSW1wbGVtZW50b3IgZXh0ZW5kcyBRdWVzdGlvbkltcGxlbWVudG9yIHtcclxuICAgIGtvVmlzaWJsZVJhdGVWYWx1ZXM6IGFueTsga29DaGFuZ2U6IGFueTsga29Dc3M6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHF1ZXN0aW9uOiBRdWVzdGlvbikge1xyXG4gICAgICAgIHN1cGVyKHF1ZXN0aW9uKTtcclxuICAgICAgICB0aGlzLmtvVmlzaWJsZVJhdGVWYWx1ZXMgPSBrby5vYnNlcnZhYmxlQXJyYXkodGhpcy5nZXRWYWx1ZXMoKSk7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbltcImtvVmlzaWJsZVJhdGVWYWx1ZXNcIl0gPSB0aGlzLmtvVmlzaWJsZVJhdGVWYWx1ZXM7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMua29DaGFuZ2UgPSBmdW5jdGlvbiAodmFsKSB7IHNlbGYua29WYWx1ZSh2YWwuaXRlbVZhbHVlKTsgfTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uW1wia29DaGFuZ2VcIl0gPSB0aGlzLmtvQ2hhbmdlO1xyXG4gICAgICAgICg8UXVlc3Rpb25SYXRpbmc+dGhpcy5xdWVzdGlvbikucmF0ZVZhbHVlc0NoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgc2VsZi5vblJhdGVWYWx1ZXNDaGFuZ2VkKCk7IH07XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbltcImtvR2V0Q3NzXCJdID0gZnVuY3Rpb24gKHZhbCkge1xyXG4gICAgICAgICAgICB2YXIgY3NzID0gKDxRdWVzdGlvblJhdGluZz5zZWxmLnF1ZXN0aW9uKS5pdGVtQ3NzO1xyXG4gICAgICAgICAgICByZXR1cm4gc2VsZi5xdWVzdGlvbltcImtvVmFsdWVcIl0oKSA9PSB2YWwudmFsdWUgPyBjc3MgKyBcIiBhY3RpdmVcIiA6IGNzczsgfTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblJhdGVWYWx1ZXNDaGFuZ2VkKCkge1xyXG4gICAgICAgIHRoaXMua29WaXNpYmxlUmF0ZVZhbHVlcyh0aGlzLmdldFZhbHVlcygpKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0VmFsdWVzKCk6IEFycmF5PGFueT4geyByZXR1cm4gKDxRdWVzdGlvblJhdGluZz50aGlzLnF1ZXN0aW9uKS52aXNpYmxlUmF0ZVZhbHVlczsgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25SYXRpbmcgZXh0ZW5kcyBRdWVzdGlvblJhdGluZ01vZGVsIHtcclxuICAgIHB1YmxpYyBpdGVtQ3NzOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgbmV3IFF1ZXN0aW9uUmF0aW5nSW1wbGVtZW50b3IodGhpcyk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25TZXREYXRhKCkge1xyXG4gICAgICAgIHRoaXMuaXRlbUNzcyA9IHRoaXMuZGF0YVtcImNzc1wiXS5yYXRpbmcuaXRlbTtcclxuICAgIH1cclxufVxyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5vdmVycmlkZUNsYXNzQ3JlYXRvcmUoXCJyYXRpbmdcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uUmF0aW5nKFwiXCIpOyB9KTtcclxuXHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwicmF0aW5nXCIsIChuYW1lKSA9PiB7IHJldHVybiBuZXcgUXVlc3Rpb25SYXRpbmcobmFtZSk7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fcmF0aW5nLnRzXG4gKiovIiwiaW1wb3J0IHtRdWVzdGlvblRleHRNb2RlbH0gZnJvbSBcIi4uL3F1ZXN0aW9uX3RleHRcIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4uL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uSW1wbGVtZW50b3J9IGZyb20gXCIuL2tvcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4uL3F1ZXN0aW9uXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25UZXh0SW1wbGVtZW50b3IgZXh0ZW5kcyBRdWVzdGlvbkltcGxlbWVudG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBxdWVzdGlvbjogUXVlc3Rpb24pIHtcclxuICAgICAgICBzdXBlcihxdWVzdGlvbik7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlVmFsdWUobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHN1cGVyLnVwZGF0ZVZhbHVlKG5ld1ZhbHVlKTtcclxuICAgICAgICBpZiAobmV3VmFsdWUgIT09IHRoaXMucXVlc3Rpb24udmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5rb1ZhbHVlKHRoaXMucXVlc3Rpb24udmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuXHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblRleHQgZXh0ZW5kcyBRdWVzdGlvblRleHRNb2RlbCB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgbmV3IFF1ZXN0aW9uVGV4dEltcGxlbWVudG9yKHRoaXMpO1xyXG4gICAgfVxyXG59XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLm92ZXJyaWRlQ2xhc3NDcmVhdG9yZShcInRleHRcIiwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uVGV4dChcIlwiKTsgfSk7XHJcblxyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcInRleHRcIiwgKG5hbWUpID0+IHsgcmV0dXJuIG5ldyBRdWVzdGlvblRleHQobmFtZSk7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L2tvcXVlc3Rpb25fdGV4dC50c1xuICoqLyIsImltcG9ydCAqIGFzIGtvIGZyb20gXCJrbm9ja291dFwiO1xyXG5pbXBvcnQge1N1cnZleVdpbmRvd01vZGVsfSBmcm9tIFwiLi4vc3VydmV5V2luZG93XCI7XHJcbmltcG9ydCB7U3VydmV5TW9kZWx9IGZyb20gXCIuLi9zdXJ2ZXlcIjtcclxuaW1wb3J0IHtTdXJ2ZXl9IGZyb20gXCIuL2tvc3VydmV5XCI7XHJcbmltcG9ydCB7a29UZW1wbGF0ZX0gZnJvbSAnLi90ZW1wbGF0ZS53aW5kb3cua28uaHRtbCdcclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlXaW5kb3cgZXh0ZW5kcyBTdXJ2ZXlXaW5kb3dNb2RlbCB7XHJcbiAgICBrb0V4cGFuZGVkOiBhbnk7XHJcbiAgICBrb0V4cGFuZGVkQ3NzOiBhbnk7XHJcbiAgICBkb0V4cGFuZDogYW55O1xyXG4gICAgY29uc3RydWN0b3IoanNvbk9iajogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoanNvbk9iaik7XHJcbiAgICAgICAgdGhpcy5rb0V4cGFuZGVkID0ga28ub2JzZXJ2YWJsZShmYWxzZSk7XHJcbiAgICAgICAgdGhpcy5rb0V4cGFuZGVkQ3NzID0ga28ub2JzZXJ2YWJsZSh0aGlzLmdldEJ1dHRvbkNzcygpKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5kb0V4cGFuZCA9IGZ1bmN0aW9uICgpIHsgc2VsZi5jaGFuZ2VFeHBhbmRlZCgpOyB9XHJcbiAgICAgICAgdGhpcy5zdXJ2ZXkub25Db21wbGV0ZS5hZGQoKHNlbmRlcjogU3VydmV5TW9kZWwpID0+IHsgc2VsZi5vbkNvbXBsZXRlKCk7IHNlbGYua29FeHBhbmRlZENzcyhzZWxmLmdldEJ1dHRvbkNzcygpKSB9KTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVTdXJ2ZXkoanNvbk9iajogYW55KTogU3VydmV5TW9kZWwge1xyXG4gICAgICAgIHJldHVybiBuZXcgU3VydmV5KGpzb25PYmopXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZXhwYW5kY29sbGFwc2UodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICBzdXBlci5leHBhbmRjb2xsYXBzZSh2YWx1ZSk7XHJcbiAgICAgICAgdGhpcy5rb0V4cGFuZGVkKHRoaXMuaXNFeHBhbmRlZFZhbHVlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXQgdGVtcGxhdGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudGVtcGxhdGVWYWx1ZSA/IHRoaXMudGVtcGxhdGVWYWx1ZSA6IHRoaXMuZ2V0RGVmYXVsdFRlbXBsYXRlKCk7IH1cclxuICAgIHByb3RlY3RlZCBzZXQgdGVtcGxhdGUodmFsdWU6IHN0cmluZykgeyB0aGlzLnRlbXBsYXRlVmFsdWUgPSB2YWx1ZTsgfVxyXG4gICAgcHVibGljIHNob3coKSB7XHJcbiAgICAgICAgdGhpcy53aW5kb3dFbGVtZW50LmlubmVySFRNTCA9IHRoaXMudGVtcGxhdGU7XHJcbiAgICAgICAga28uY2xlYW5Ob2RlKHRoaXMud2luZG93RWxlbWVudCk7XHJcbiAgICAgICAga28uYXBwbHlCaW5kaW5ncyh0aGlzLCB0aGlzLndpbmRvd0VsZW1lbnQpO1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQodGhpcy53aW5kb3dFbGVtZW50KTtcclxuICAgICAgICAoPFN1cnZleT50aGlzLnN1cnZleSkucmVuZGVyKFN1cnZleVdpbmRvdy5zdXJ2ZXlFbGVtZW50TmFtZSk7XHJcbiAgICAgICAgdGhpcy5pc1Nob3dpbmdWYWx1ZSA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdFRlbXBsYXRlKCk6IHN0cmluZyB7IHJldHVybiBrb1RlbXBsYXRlLmh0bWwgfVxyXG4gICAgcHVibGljIGhpZGUoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZCh0aGlzLndpbmRvd0VsZW1lbnQpO1xyXG4gICAgICAgIHRoaXMud2luZG93RWxlbWVudC5pbm5lckhUTUwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMuaXNTaG93aW5nVmFsdWUgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY3NzKCk6IGFueSB7IHJldHVybiB0aGlzLnN1cnZleVtcImNzc1wiXTsgfVxyXG4gICAgcHJpdmF0ZSBjaGFuZ2VFeHBhbmRlZCgpIHtcclxuICAgICAgICB0aGlzLmV4cGFuZGNvbGxhcHNlKCF0aGlzLmlzRXhwYW5kZWQpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvbkNvbXBsZXRlKCkge1xyXG4gICAgICAgIHRoaXMuaGlkZSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRCdXR0b25Dc3MoKSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMua29FeHBhbmRlZCgpID8gdGhpcy5jc3Mud2luZG93LmhlYWRlci5idXR0b25Db2xsYXBzZWQgOiB0aGlzLmNzcy53aW5kb3cuaGVhZGVyLmJ1dHRvbkV4cGFuZGVkO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMva25vY2tvdXQva29TdXJ2ZXlXaW5kb3cudHNcbiAqKi8iLCJleHBvcnQgdmFyIGtvVGVtcGxhdGUgPSB7IGh0bWwgOiBcIlwifTsga29UZW1wbGF0ZS5odG1sID0gJzxkaXYgc3R5bGU9XCJwb3NpdGlvbjogZml4ZWQ7IGJvdHRvbTogM3B4OyByaWdodDogMTBweDtcIiBkYXRhLWJpbmQ9XCJjc3M6ICRyb290LmNzcy53aW5kb3cucm9vdFwiPiAgICA8ZGl2IGRhdGEtYmluZD1cImNzczogJHJvb3QuY3NzLndpbmRvdy5oZWFkZXIucm9vdFwiPiAgICAgICAgPGEgaHJlZj1cIiNcIiBkYXRhLWJpbmQ9XCJjbGljazpkb0V4cGFuZFwiIHN0eWxlPVwid2lkdGg6MTAwJVwiPiAgICAgICAgICAgIDxzcGFuIHN0eWxlPVwicGFkZGluZy1yaWdodDoxMHB4XCIgZGF0YS1iaW5kPVwidGV4dDp0aXRsZSwgY3NzOiAkcm9vdC5jc3Mud2luZG93LmhlYWRlci50aXRsZVwiPjwvc3Bhbj4gICAgICAgICAgICA8c3BhbiBhcmlhLWhpZGRlbj1cInRydWVcIiBkYXRhLWJpbmQ9XCJjc3M6IGtvRXhwYW5kZWRDc3NcIj48L3NwYW4+ICAgICAgICA8L2E+ICAgIDwvZGl2PiAgICA8ZGl2IGRhdGEtYmluZD1cInZpc2libGU6a29FeHBhbmRlZCwgY3NzOiAkcm9vdC5jc3Mud2luZG93LmJvZHlcIj4gICAgICAgIDxkaXYgaWQ9XCJ3aW5kb3dTdXJ2ZXlKU1wiPjwvZGl2PiAgICA8L2Rpdj48L2Rpdj4nO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2tub2Nrb3V0L3RlbXBsYXRlLndpbmRvdy5rby5odG1sLnRzXG4gKiovIiwiaW1wb3J0IHtrb1RlbXBsYXRlfSBmcm9tIFwiLi90ZW1wbGF0ZS5rby5odG1sXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3VydmV5VGVtcGxhdGVUZXh0IHtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgfVxyXG5cclxuICAgIHB1YmxpYyByZXBsYWNlVGV4dChyZXBsYWNlVGV4dDogc3RyaW5nLCBpZDogc3RyaW5nLCBxdWVzdGlvblR5cGU6IHN0cmluZyA9IG51bGwpIHtcclxuICAgICAgICBpZCA9IHRoaXMuZ2V0SWQoaWQsIHF1ZXN0aW9uVHlwZSk7XHJcbiAgICAgICAgdmFyIHBvcyA9IHRoaXMudGV4dC5pbmRleE9mKGlkKTtcclxuICAgICAgICBpZiAocG9zIDwgMCkgcmV0dXJuO1xyXG4gICAgICAgIHBvcyA9IHRoaXMudGV4dC5pbmRleE9mKCc+JywgcG9zKTtcclxuICAgICAgICBpZiAocG9zIDwgMCkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBzdGFydFBvcyA9IHBvcyArIDE7XHJcbiAgICAgICAgdmFyIGVuZFN0cmluZyA9IFwiPC9zY3JpcHQ+XCI7XHJcbiAgICAgICAgcG9zID0gdGhpcy50ZXh0LmluZGV4T2YoZW5kU3RyaW5nLCBzdGFydFBvcyk7XHJcbiAgICAgICAgaWYgKHBvcyA8IDApIHJldHVybjtcclxuICAgICAgICB0aGlzLnRleHQgPSB0aGlzLnRleHQuc3Vic3RyKDAsIHN0YXJ0UG9zKSArIHJlcGxhY2VUZXh0ICsgdGhpcy50ZXh0LnN1YnN0cihwb3MpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldElkKGlkOiBzdHJpbmcsIHF1ZXN0aW9uVHlwZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9ICdpZD1cInN1cnZleS0nICsgaWQ7XHJcbiAgICAgICAgaWYgKHF1ZXN0aW9uVHlwZSkge1xyXG4gICAgICAgICAgICByZXN1bHQgKz0gXCItXCIgKyBxdWVzdGlvblR5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQgKyAnXCInO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldCB0ZXh0KCk6IHN0cmluZyB7IHJldHVybiBrb1RlbXBsYXRlLmh0bWw7IH1cclxuICAgIHByb3RlY3RlZCBzZXQgdGV4dCh2YWx1ZTogc3RyaW5nKSB7IGtvVGVtcGxhdGUuaHRtbCA9IHZhbHVlOyB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9rbm9ja291dC90ZW1wbGF0ZVRleHQudHNcbiAqKi8iLCJpbXBvcnQgJy4uLy4uL2xvY2FsaXphdGlvbi9kYW5pc2gnO1xyXG5pbXBvcnQgJy4uLy4uL2xvY2FsaXphdGlvbi9kdXRjaCc7XHJcbmltcG9ydCAnLi4vLi4vbG9jYWxpemF0aW9uL2Zpbm5pc2gnO1xyXG5pbXBvcnQgJy4uLy4uL2xvY2FsaXphdGlvbi9mcmVuY2gnO1xyXG5pbXBvcnQgJy4uLy4uL2xvY2FsaXphdGlvbi9nZXJtYW4nO1xyXG5pbXBvcnQgJy4uLy4uL2xvY2FsaXphdGlvbi9ncmVlayc7XHJcbmltcG9ydCAnLi4vLi4vbG9jYWxpemF0aW9uL3BvbGlzaCc7XHJcbmltcG9ydCAnLi4vLi4vbG9jYWxpemF0aW9uL3J1c3NpYW4nO1xyXG5pbXBvcnQgJy4uLy4uL2xvY2FsaXphdGlvbi90dXJraXNoJztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9lbnRyaWVzL2NodW5rcy9sb2NhbGl6YXRpb24udHNcbiAqKi8iLCJpbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4uL3N1cnZleVN0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCB2YXIgZGFuaXNoU3VydmV5U3RyaW5ncyA9IHtcclxuICAgIHBhZ2VQcmV2VGV4dDogXCJUaWxiYWdlXCIsXHJcbiAgICBwYWdlTmV4dFRleHQ6IFwiVmlkZXJlXCIsXHJcbiAgICBjb21wbGV0ZVRleHQ6IFwiRsOmcmRpZ1wiLFxyXG4gICAgcHJvZ3Jlc3NUZXh0OiBcIlNpZGUgezB9IGFmIHsxfVwiLFxyXG4gICAgZW1wdHlTdXJ2ZXk6IFwiRGVyIGVyIGluZ2VuIHN5bmxpZ2Ugc3DDuHJnc23DpWwuXCIsXHJcbiAgICBjb21wbGV0aW5nU3VydmV5OiBcIk1hbmdlIHRhayBmb3IgZGluIGJlc3ZhcmVsc2UhXCIsXHJcbiAgICBsb2FkaW5nU3VydmV5OiBcIlNww7hyZ2Vza2VtYWV0IGhlbnRlcyBmcmEgc2VydmVyZW4uLi5cIixcclxuICAgIG90aGVySXRlbVRleHQ6IFwiVmFsZ2ZyaXQgc3Zhci4uLlwiLFxyXG4gICAgb3B0aW9uc0NhcHRpb246IFwiVsOmbGcuLi5cIixcclxuICAgIHJlcXVpcmVkRXJyb3I6IFwiQmVzdmFyIHZlbmxpZ3N0IHNww7hyZ3Ntw6VsZXQuXCIsXHJcbiAgICBudW1lcmljRXJyb3I6IFwiQW5naXYgZXQgdGFsLlwiLFxyXG4gICAgdGV4dE1pbkxlbmd0aDogXCJBbmdpdiBtaW5kc3QgezB9IHRlZ24uXCIsXHJcbiAgICBtaW5TZWxlY3RFcnJvcjogXCJWw6ZsZyB2ZW5saWdzdCBtaW5kc3QgIHswfSBzdmFybXVsaWdoZWQoZXIpLlwiLFxyXG4gICAgbWF4U2VsZWN0RXJyb3I6IFwiVsOmbGcgdmVubGlnc3QgZsOmcnJlIHswfSBzdmFybXVsaWdoZWRlcihlcikuXCIsXHJcbiAgICBudW1lcmljTWluTWF4OiBcIid7MH0nIHNrYWwgdsOmcmUgbGlnIG1lZCBlbGxlciBzdMO4cnJlIGVuZCB7MX0gb2cgbGlnIG1lZCBlbGxlciBtaW5kcmUgZW5kIHsyfVwiLFxyXG4gICAgbnVtZXJpY01pbjogXCInezB9JyBza2FsIHbDpnJlIGxpZyBtZWQgZWxsZXIgc3TDuHJyZSBlbmQgezF9XCIsXHJcbiAgICBudW1lcmljTWF4OiBcIid7MH0nIHNrYWwgdsOmcmUgbGlnIG1lZCBlbGxlciBtaW5kcmUgZW5kIHsxfVwiLFxyXG4gICAgaW52YWxpZEVtYWlsOiBcIkFuZ2l2IHZlbmxpZ3N0IGVuIGd5bGRpZyBlLW1haWwgYWRyZXNzZS5cIixcclxuICAgIGV4Y2VlZE1heFNpemU6IFwiRmlsc3TDuHJyZWxzZW4gbcOlIGlra2Ugb3ZlcnN0aWdlIHswfS5cIixcclxuICAgIG90aGVyUmVxdWlyZWRFcnJvcjogXCJBbmdpdiBlbiB2w6ZyZGkgZm9yIGRpdCB2YWxnZnJpZSBzdmFyLlwiXHJcbn07XHJcblxyXG5zdXJ2ZXlMb2NhbGl6YXRpb24ubG9jYWxlc1tcImRhXCJdID0gZGFuaXNoU3VydmV5U3RyaW5ncztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbG9jYWxpemF0aW9uL2RhbmlzaC50c1xuICoqLyIsIi8vQ3JlYXRlZCBvbiBiZWhhbGYgaHR0cHM6Ly9naXRodWIuY29tL0ZyYW5rMTNcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcblxyXG5leHBvcnQgdmFyIGR1dGNoU3VydmV5U3RyaW5ncyA9IHtcclxuICAgIHBhZ2VQcmV2VGV4dDogXCJWb3JpZ2VcIixcclxuICAgIHBhZ2VOZXh0VGV4dDogXCJWb2xnZW5kZVwiLFxyXG4gICAgY29tcGxldGVUZXh0OiBcIkFmc2x1aXRlblwiLFxyXG4gICAgb3RoZXJJdGVtVGV4dDogXCJBbmRlcmVcIixcclxuICAgIHByb2dyZXNzVGV4dDogXCJQYWdpbmEgezB9IHZhbiB7MX1cIixcclxuICAgIGVtcHR5U3VydmV5OiBcIkVyIGlzIGdlZW4gemljaHRiYXJlIHBhZ2luYSBvZiB2cmFhZyBpbiBkZXplIHZyYWdlbmxpanN0XCIsXHJcbiAgICBjb21wbGV0aW5nU3VydmV5OiBcIkJlZGFua3Qgb20gZGV6ZSB2cmFnZW5saWpzdCBpbiB0ZSB2dWxsZW5cIixcclxuICAgIGxvYWRpbmdTdXJ2ZXk6IFwiRGUgdnJhZ2VubGlqc3QgaXMgYWFuIGhldCBsYWRlbi4uLlwiLFxyXG4gICAgb3B0aW9uc0NhcHRpb246IFwiS2llcy4uLlwiLFxyXG4gICAgcmVxdWlyZWRFcnJvcjogXCJHZWxpZXZlIGVlbiBhbnR3b29yZCBpbiB0ZSB2dWxsZW5cIixcclxuICAgIG51bWVyaWNFcnJvcjogXCJIZXQgYW50d29vcmQgbW9ldCBlZW4gZ2V0YWwgemlqblwiLFxyXG4gICAgdGV4dE1pbkxlbmd0aDogXCJHZWxpZXZlIG1pbnN0ZW4gezB9IGthcmFrdGVycyBpbiB0ZSB2dWxsZW4uXCIsXHJcbiAgICBtaW5TZWxlY3RFcnJvcjogXCJHZWxpZXZlIG1pbmltdW0gezB9IGFudHdvb3JkZW4gdGUgc2VsZWN0ZXJlbi5cIixcclxuICAgIG1heFNlbGVjdEVycm9yOiBcIkdlbGlldmUgbmlldCBtZWVyIGRhbiB7MH0gYW50d29vcmRlbiB0ZSBzZWxlY3RlcmVuLlwiLFxyXG4gICAgbnVtZXJpY01pbk1heDogXCJVdyBhbnR3b29yZCAnezB9JyBtb2V0IGdyb3RlciBvZiBnZWxpamsgemlqbiBhYW4gezF9IGVuIGtsZWluZXIgb2YgZ2VsaWprIGFhbiB7Mn1cIixcclxuICAgIG51bWVyaWNNaW46IFwiVXcgYW50d29vcmQgJ3swfScgbW9ldCBncm90ZXIgb2YgZ2VsaWprIHppam4gYWFuIHsxfVwiLFxyXG4gICAgbnVtZXJpY01heDogXCJVdyBhbnR3b29yZCAnezB9JyBtb2V0IGdyb3RlciBvZiBnZWxpamsgemlqbiBhYW4gezF9XCIsXHJcbiAgICBpbnZhbGlkRW1haWw6IFwiR2VsaWV2ZSBlZW4gZ2VsZGlnIGUtbWFpbGFkcmVzIGluIHRlIHZ1bGxlbi5cIixcclxuICAgIGV4Y2VlZE1heFNpemU6IFwiRGUgZ3Jvb3R0ZSB2YW4gaGV0IGJlc3RhbmQgbWFnIG5pZXQgZ3JvdGVyIHppam4gZGFuIHswfS5cIixcclxuICAgIG90aGVyUmVxdWlyZWRFcnJvcjogXCJHZWxpZXZlIGhldCB2ZWxkICdBbmRlcmUnIGluIHRlIHZ1bGxlblwiXHJcbn07XHJcblxyXG5zdXJ2ZXlMb2NhbGl6YXRpb24ubG9jYWxlc1tcIm5sXCJdID0gZHV0Y2hTdXJ2ZXlTdHJpbmdzO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2NhbGl6YXRpb24vZHV0Y2gudHNcbiAqKi8iLCJpbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4uL3N1cnZleVN0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCB2YXIgZmlubmlzaFN1cnZleVN0cmluZ3MgPSB7XHJcbiAgICBwYWdlUHJldlRleHQ6IFwiRWRlbGxpbmVuXCIsXHJcbiAgICBwYWdlTmV4dFRleHQ6IFwiU2V1cmFhdmFcIixcclxuICAgIGNvbXBsZXRlVGV4dDogXCJWYWxtaXNcIixcclxuICAgIG90aGVySXRlbVRleHQ6IFwiTXV1IChrdXZhaWxlKVwiLFxyXG4gICAgcHJvZ3Jlc3NUZXh0OiBcIlNpdnUgezB9L3sxfVwiLFxyXG4gICAgZW1wdHlTdXJ2ZXk6IFwiVMOkc3PDpCBreXNlbHlzc8OkIGVpIG9sZSB5aHTDpGvDpMOkbiBuw6RreXZpbGzDpCBvbGV2YWEgc2l2dWEgdGFpIGt5c3lteXN0w6QuXCIsXHJcbiAgICBjb21wbGV0aW5nU3VydmV5OiBcIktpaXRvcyBreXNlbHl5biB2YXN0YWFtaXNlc3RhIVwiLFxyXG4gICAgbG9hZGluZ1N1cnZleTogXCJLeXNlbHnDpCBsYWRhdGFhbiBwYWx2ZWxpbWVsdGEuLi5cIixcclxuICAgIG9wdGlvbnNDYXB0aW9uOiBcIlZhbGl0c2UuLi5cIixcclxuICAgIHJlcXVpcmVkRXJyb3I6IFwiVmFzdGFhIGt5c3lteWtzZWVuLCBraWl0b3MuXCIsXHJcbiAgICBudW1lcmljRXJyb3I6IFwiQXJ2b24gdHVsZWUgb2xsYSBudW1lZXJpbmVuLlwiLFxyXG4gICAgdGV4dE1pbkxlbmd0aDogXCJPbGUgaHl2w6QgamEgc3nDtnTDpCB2w6RoaW50w6TDpG4gezB9IG1lcmtracOkLlwiLFxyXG4gICAgbWluU2VsZWN0RXJyb3I6IFwiT2xlIGh5dsOkIGphIHZhbGl0c2UgdsOkaGludMOkw6RuIHswfSB2YWlodG9laHRvYS5cIixcclxuICAgIG1heFNlbGVjdEVycm9yOiBcIk9sZSBoeXbDpCBqYSB2YWxpdHNlIGVuaW50w6TDpG4gezB9IHZhaWh0b2VodG9hLlwiLFxyXG4gICAgbnVtZXJpY01pbk1heDogXCInezB9JyB0w6R5dHl5IG9sbGEgZW5lbW3DpG4gdGFpIHlodMOkIHN1dXJpIGt1aW4gezF9IGphIHbDpGhlbW3DpG4gdGFpIHlodMOkIHN1dXJpIGt1aW4gezJ9XCIsXHJcbiAgICBudW1lcmljTWluOiBcIid7MH0nIHTDpHl0eXkgb2xsYSBlbmVtbcOkbiB0YWkgeWh0w6Qgc3V1cmkga3VpbiB7MX1cIixcclxuICAgIG51bWVyaWNNYXg6IFwiJ3swfScgdMOkeXR5eSBvbGxhIHbDpGhlbW3DpG4gdGFpIHlodMOkIHN1dXJpIGt1aW4gezF9XCIsXHJcbiAgICBpbnZhbGlkRW1haWw6IFwiU3nDtnTDpCB2YWxpZGkgc8OkaGvDtnBvc3Rpb3NvaXRlLlwiLFxyXG4gICAgb3RoZXJSZXF1aXJlZEVycm9yOiBcIk9sZSBoeXbDpCBqYSBzecO2dMOkIFxcXCJNdXUgKGt1dmFpbGUpXFxcIlwiXHJcbn07XHJcblxyXG5zdXJ2ZXlMb2NhbGl6YXRpb24ubG9jYWxlc1tcImZpXCJdID0gZmlubmlzaFN1cnZleVN0cmluZ3M7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2xvY2FsaXphdGlvbi9maW5uaXNoLnRzXG4gKiovIiwiLy9DcmVhdGVkIG9uIGJlaGFsZiBodHRwczovL2dpdGh1Yi5jb20vRnJhbmsxM1xyXG5pbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4uL3N1cnZleVN0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCB2YXIgZnJlbmNoU3VydmV5U3RyaW5ncyA9IHtcclxuICAgIHBhZ2VQcmV2VGV4dDogXCJQclxcdTAwZTljXFx1MDBlOWRlbnRcIixcclxuICAgIHBhZ2VOZXh0VGV4dDogXCJTdWl2YW50XCIsXHJcbiAgICBjb21wbGV0ZVRleHQ6IFwiVGVybWluZXJcIixcclxuICAgIG90aGVySXRlbVRleHQ6IFwiQXV0cmUgKHByXFx1MDBlOWNpc2VyKVwiLFxyXG4gICAgcHJvZ3Jlc3NUZXh0OiBcIlBhZ2UgezB9IHN1ciB7MX1cIixcclxuICAgIGVtcHR5U3VydmV5OiBcIklsIG4neSBhIG5pIHBhZ2UgdmlzaWJsZSBuaSBxdWVzdGlvbiB2aXNpYmxlIGRhbnMgY2UgcXVlc3Rpb25uYWlyZVwiLFxyXG4gICAgY29tcGxldGluZ1N1cnZleTogXCJNZXJjaSBkJ2F2b2lyIHJcXHUwMGU5cG9uZHUgYXUgcXVlc3Rpb25uYWlyZSFcIixcclxuICAgIGxvYWRpbmdTdXJ2ZXk6IFwiTGUgcXVlc3Rpb25uYWlyZSBlc3QgZW4gY291cnMgZGUgY2hhcmdlbWVudC4uLlwiLFxyXG4gICAgb3B0aW9uc0NhcHRpb246IFwiQ2hvaXNpc3Nlei4uLlwiLFxyXG4gICAgcmVxdWlyZWRFcnJvcjogXCJMYSByXFx1MDBlOXBvbnNlIFxcdTAwZTAgY2V0dGUgcXVlc3Rpb24gZXN0IG9ibGlnYXRvaXJlLlwiLFxyXG4gICAgbnVtZXJpY0Vycm9yOiBcIkxhIHJcXHUwMGU5cG9uc2UgZG9pdCBcXHUwMGVhdHJlIHVuIG5vbWJyZS5cIixcclxuICAgIHRleHRNaW5MZW5ndGg6IFwiTWVyY2kgZCdlbnRyZXIgYXUgbW9pbnMgezB9IHN5bWJvbGVzLlwiLFxyXG4gICAgbWluU2VsZWN0RXJyb3I6IFwiTWVyY2kgZGUgc1xcdTAwZTlsZWN0aW9ubmVyIGF1IG1vaW5zIHswfXJcXHUwMGU5cG9uc2VzLlwiLFxyXG4gICAgbWF4U2VsZWN0RXJyb3I6IFwiTWVyY2kgZGUgc1xcdTAwZTlsZWN0aW9ubmVyIGF1IHBsdXMgezB9clxcdTAwZTlwb25zZXMuXCIsXHJcbiAgICBudW1lcmljTWluTWF4OiBcIlZvdHJlIHJcXHUwMGU5cG9uc2UgJ3swfScgZG9pdCBcXHUwMGVhdHJlc3VwXFx1MDBlOXJpZXVyZSBvdSBcXHUwMGU5Z2FsZSBcXHUwMGUwIHsxfSBldCBpbmZcXHUwMGU5cmlldXJlIG91XFx1MDBlOWdhbGUgXFx1MDBlMCB7Mn1cIixcclxuICAgIG51bWVyaWNNaW46IFwiVm90cmUgclxcdTAwZTlwb25zZSAnezB9JyBkb2l0IFxcdTAwZWF0cmVzdXBcXHUwMGU5cmlldXJlIG91IFxcdTAwZTlnYWxlIFxcdTAwZTAgezF9XCIsXHJcbiAgICBudW1lcmljTWF4OiBcIlZvdHJlIHJcXHUwMGU5cG9uc2UgJ3swfScgZG9pdCBcXHUwMGVhdHJlaW5mXFx1MDBlOXJpZXVyZSBvdSBcXHUwMGU5Z2FsZSBcXHUwMGUwIHsxfVwiLFxyXG4gICAgaW52YWxpZEVtYWlsOiBcIk1lcmNpIGQnZW50cmVyIHVuZSBhZHJlc3NlIG1haWwgdmFsaWRlLlwiLFxyXG4gICAgZXhjZWVkTWF4U2l6ZTogXCJMYSB0YWlsbGUgZHUgZmljaGllciBuZSBkb2l0IHBhcyBleGNcXHUwMGU5ZGVyIHswfS5cIixcclxuICAgIG90aGVyUmVxdWlyZWRFcnJvcjogXCJNZXJjaSBkZSBwclxcdTAwZTljaXNlciBsZSBjaGFtcCAnQXV0cmUnLlwiXHJcbn07XHJcbnN1cnZleUxvY2FsaXphdGlvbi5sb2NhbGVzW1wiZnJcIl0gPSBmcmVuY2hTdXJ2ZXlTdHJpbmdzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2xvY2FsaXphdGlvbi9mcmVuY2gudHNcbiAqKi8iLCJpbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4uL3N1cnZleVN0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCB2YXIgZ2VybWFuU3VydmV5U3RyaW5ncyA9IHtcclxuICAgIHBhZ2VQcmV2VGV4dDogXCJadXLDvGNrXCIsXHJcbiAgICBwYWdlTmV4dFRleHQ6IFwiV2VpdGVyXCIsXHJcbiAgICBjb21wbGV0ZVRleHQ6IFwiRmVydGlnXCIsXHJcbiAgICBwcm9ncmVzc1RleHQ6IFwiU2VpdGUgezB9IHZvbiB7MX1cIixcclxuICAgIGVtcHR5U3VydmV5OiBcIkVzIGdpYnQga2VpbmUgc2ljaHRiYXJlIEZyYWdlLlwiLFxyXG4gICAgY29tcGxldGluZ1N1cnZleTogXCJWaWVsZW4gRGFuayBmw7xyIGRhcyBBdXNmw7xsbGVuIGRlcyBGcmFnZWJvZ2VucyFcIixcclxuICAgIGxvYWRpbmdTdXJ2ZXk6IFwiRGVyIEZyYWdlYm9nZW4gd2lyZCB2b20gU2VydmVyIGdlbGFkZW4uLi5cIixcclxuICAgIG90aGVySXRlbVRleHQ6IFwiQmVudXR6ZXJkZWZpbmllcnRlIEFudHdvcnQuLi5cIixcclxuICAgIG9wdGlvbnNDYXB0aW9uOiBcIlfDpGhsZW4uLi5cIixcclxuICAgIHJlcXVpcmVkRXJyb3I6IFwiQml0dGUgYW50d29ydGVuIFNpZSBhdWYgZGllIEZyYWdlLlwiLFxyXG4gICAgbnVtZXJpY0Vycm9yOiBcIkRlciBXZXJ0IHNvbGx0ZSBlaW5lIFphaGwgc2Vpbi5cIixcclxuICAgIHRleHRNaW5MZW5ndGg6IFwiQml0dGUgZ2ViZW4gU2llIG1pbmRlc3RlbnMgezB9IFN5bWJvbGUuXCIsXHJcbiAgICBtaW5TZWxlY3RFcnJvcjogXCJCaXR0ZSB3w6RobGVuIFNpZSBtaW5kZXN0ZW5zIHswfSBWYXJpYW50ZW4uXCIsXHJcbiAgICBtYXhTZWxlY3RFcnJvcjogXCJCaXR0ZSB3w6RobGVuIFNpZSBuaWNodCBtZWhyIGFscyB7MH0gVmFyaWFudGVuLlwiLFxyXG4gICAgbnVtZXJpY01pbk1heDogXCInezB9JyBzb2x0ZSBnbGVpY2ggb2RlciBncsO2w59lciBzZWluIGFscyB7MX0gdW5kIGdsZWljaCBvZGVyIGtsZWluZXIgYWxzIHsyfVwiLFxyXG4gICAgbnVtZXJpY01pbjogXCInezB9JyBzb2x0ZSBnbGVpY2ggb2RlciBncsO2w59lciBzZWluIGFscyB7MX1cIixcclxuICAgIG51bWVyaWNNYXg6IFwiJ3swfScgc29sdGUgZ2xlaWNoIG9kZXIga2xlaW5lciBhbHMgezF9XCIsXHJcbiAgICBpbnZhbGlkRW1haWw6IFwiQml0dGUgZ2ViZW4gU2llIGVpbmUgZ8O8bHRpZ2UgRW1haWwtQWRyZXNzZSBlaW4uXCIsXHJcbiAgICBleGNlZWRNYXhTaXplOiBcIkRpZSBEYXRlaWdyw7bDn2Ugc29sbCBuaWNodCBtZWhyIGFscyB7MH0uXCIsXHJcbiAgICBvdGhlclJlcXVpcmVkRXJyb3I6IFwiQml0dGUgZ2ViZW4gU2llIGVpbmVuIFdlcnQgZsO8ciBJaHJlIGJlbnV0emVyZGVmaW5pZXJ0ZSBBbnR3b3J0IGVpbi5cIlxyXG59O1xyXG5cclxuc3VydmV5TG9jYWxpemF0aW9uLmxvY2FsZXNbXCJkZVwiXSA9IGdlcm1hblN1cnZleVN0cmluZ3M7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2xvY2FsaXphdGlvbi9nZXJtYW4udHNcbiAqKi8iLCIvL0NyZWF0ZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2FnZWxvc3BhbmFnaW90YWtpc1xyXG5pbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4uL3N1cnZleVN0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCB2YXIgZ3JlZWtTdXJ2ZXlTdHJpbmdzID0ge1xyXG4gICAgcGFnZVByZXZUZXh0OiBcIs6gz4HOv863zrPOv8+NzrzOtc69zr9cIixcclxuICAgIHBhZ2VOZXh0VGV4dDogXCLOlc+Az4zOvM61zr3Ov1wiLFxyXG4gICAgY29tcGxldGVUZXh0OiBcIs6fzrvOv866zrvOrs+Bz4nPg863XCIsXHJcbiAgICBvdGhlckl0ZW1UZXh0OiBcIs6GzrvOu86/ICjPgM6xz4HOsc66zrHOu8+OIM60zrnOtc+FzrrPgc65zr3Or8+Dz4TOtSlcIixcclxuICAgIHByb2dyZXNzVGV4dDogXCLOo861zrvOr860zrEgezB9IM6xz4DPjCB7MX1cIixcclxuICAgIGVtcHR5U3VydmV5OiBcIs6UzrXOvSDPhc+AzqzPgc+HzrXOuSDOus6xzrzOr86xIM6/z4HOsc+Ezq4gz4POtc67zq/OtM6xIM6uIM6/z4HOsc+Ezq4gzrXPgc+Oz4TOt8+Dzrcgz4POtSDOsc+Fz4TPjCDPhM6/IM61z4HPic+EzrfOvM6xz4TOv867z4zOs865zr8uXCIsXHJcbiAgICBjb21wbGV0aW5nU3VydmV5OiBcIs6Vz4XPh86xz4HOuc+Dz4TOv8+NzrzOtSDOs865zrEgz4TOt869IM+Dz4XOvM+AzrvOrs+Bz4nPg863IM6xz4XPhM6/z4Ugz4TOv8+FIM61z4HPic+EzrfOvM6xz4TOv867zr/Os86vzr/PhSFcIixcclxuICAgIGxvYWRpbmdTdXJ2ZXk6IFwizqTOvyDOtc+Bz4nPhM63zrzOsc+Ezr/Ou8+MzrPOuc6/IM+Gzr/Pgc+Ez47Ovc61z4TOsc65IM6xz4DOvyDPhM6/IM60zrnOsc66zr/OvM65z4PPhM6uLi4uXCIsXHJcbiAgICBvcHRpb25zQ2FwdGlvbjogXCLOlc+AzrnOu86tzr7PhM61Li4uXCIsXHJcbiAgICByZXF1aXJlZEVycm9yOiBcIs6gzrHPgc6xzrrOsc67z44gzrHPgM6xzr3PhM6uz4PPhM61IM+Dz4TOt869IM61z4HPjs+EzrfPg863LlwiLFxyXG4gICAgcmVxdWlyZWRJbkFsbFJvd3NFcnJvcjogXCLOoM6xz4HOsc66zrHOu8+OIM6xz4DOsc69z4TOrs+Dz4TOtSDPg8+EzrnPgiDOtc+Bz4nPhM6uz4POtc65z4Igz4POtSDPjM67zrXPgiDPhM65z4IgzrPPgc6xzrzOvM6tz4IuXCIsXHJcbiAgICBudW1lcmljRXJyb3I6IFwizpcgz4TOuc68zq4gz4DPgc6tz4DOtc65IM69zrEgzrXOr869zrHOuSDOsc+BzrnOuM68zrnPhM65zrrOri5cIixcclxuICAgIHRleHRNaW5MZW5ndGg6IFwizqDOsc+BzrHOus6xzrvPjiDPg8+FzrzPgM67zrfPgc+Oz4PPhM61IM+Ezr/Phc67zqzPh865z4PPhM6/zr0gezB9IM+Dz43OvM6yzr/Ou86xLlwiLFxyXG4gICAgbWluUm93Q291bnRFcnJvcjogXCLOoM6xz4HOsc66zrHOu8+OIM+Dz4XOvM+AzrvOt8+Bz47Pg8+EzrUgz4TOv8+FzrvOrM+HzrnPg8+Ezr/OvSB7MH0gzrPPgc6xzrzOvM6tz4IuXCIsXHJcbiAgICBtaW5TZWxlY3RFcnJvcjogXCLOoM6xz4HOsc66zrHOu8+OIM61z4DOuc67zq3Ovs+EzrUgz4TOv8+FzrvOrM+HzrnPg8+Ezr/OvSB7MH0gz4DOsc+BzrHOu867zrHOs86tz4IuXCIsXHJcbiAgICBtYXhTZWxlY3RFcnJvcjogXCLOoM6xz4HOsc66zrHOu8+OIM61z4DOuc67zq3Ovs+EzrUgz4zPh865IM+AzrHPgc6xz4DOrM69z4kgzrHPgM6/IHswfSDPgM6xz4HOsc67zrvOsc6zzq3Pgi5cIixcclxuICAgIG51bWVyaWNNaW5NYXg6IFwizqTOvyAnezB9JyDOuM6xIM+Az4HOrc+AzrXOuSDOvc6xIM61zq/Ovc6xzrkgzq/Pg86/IM6uIM68zrXOs86xzrvPjc+EzrXPgc6/IM6xz4DOvyDPhM6/IHsxfSDOus6xzrkgzq/Pg86/IM6uIM68zrnOus+Bz4zPhM61z4HOvyDOsc+Azr8gz4TOvyB7Mn1cIixcclxuICAgIG51bWVyaWNNaW46IFwizqTOvyAnezB9JyDPgM+Bzq3PgM61zrkgzr3OsSDOtc6vzr3Osc65IM68zrXOs86xzrvPjc+EzrXPgc6/IM6uIM65z4POvyDOvM61IM+Ezr8gezF9XCIsXHJcbiAgICBudW1lcmljTWF4OiBcIs6kzr8gJ3swfScgz4DPgc6tz4DOtc65IM69zrEgzrXOr869zrHOuSDOvM65zrrPgc+Mz4TOtc+Bzr8gzq4gzq/Pg86/IM6xz4DOvyDPhM6/IHsxfVwiLFxyXG4gICAgaW52YWxpZEVtYWlsOiBcIs6gzrHPgc6xzrrOsc67z44gzrTPjs+Dz4TOtSDOvM65zrEgzrHPgM6/zrTOtc66z4TOriDOtM65zrXPjc64z4XOvc+DzrcgZS1tYWlsLlwiLFxyXG4gICAgdXJsUmVxdWVzdEVycm9yOiBcIs6XIM6xzq/PhM63z4POtyDOtc+Azq3Pg8+Ez4HOtc+IzrUgz4PPhs6szrvOvM6xICd7MH0nLiB7MX1cIixcclxuICAgIHVybEdldENob2ljZXNFcnJvcjogXCLOlyDOsc6vz4TOt8+DzrcgzrXPgM6tz4PPhM+BzrXPiM61IM66zrXOvc6sIM60zrXOtM6/zrzOrc69zrEgzq4gzrcgzrnOtM+Mz4TOt8+EzrEgJ868zr/Ovc6/z4DOrM+EzrkvcGF0aCcgzrXOr869zrHOuSDOtc+Dz4bOsc67zq3OvM6tzr3Ot1wiLFxyXG4gICAgZXhjZWVkTWF4U2l6ZTogXCLOpM6/IM68zq3Os861zrjOv8+CIM60zrXOvSDOvM+Azr/Pgc61zq8gzr3OsSDPhc+AzrXPgc6yzq3Ovc61zrkgz4TOsSB7MH0uXCIsXHJcbiAgICBvdGhlclJlcXVpcmVkRXJyb3I6IFwizqDOsc+BzrHOus6xzrvPjiDPg8+FzrzPgM67zrfPgc+Oz4PPhM61IM+EzrfOvSDPhM65zrzOriDOs865zrEgz4TOvyDPgM61zrTOr86/ICfOrM67zrvOvycuXCIsXHJcbiAgICB1cGxvYWRpbmdGaWxlOiBcIs6kzr8gzrHPgc+HzrXOr86/IM+DzrHPgiDOsc69zrXOss6xzq/Ovc61zrkuIM6gzrHPgc6xzrrOsc67z44gz4DOtc+BzrnOvM6tzr3Otc+EzrUgzrrOsc+Azr/Ouc6xIM60zrXPhc+EzrXPgc+MzrvOtc+Az4TOsSDOus6xzrkgzrTOv866zrnOvM6sz4PPhM61IM6+zrHOvc6sLlwiLFxyXG4gICAgYWRkUm93OiBcIs6gz4HOv8+DzrjOrs66zrcgzrPPgc6xzrzOvM6uz4JcIixcclxuICAgIHJlbW92ZVJvdzogXCLOkc+GzrHOr8+BzrXPg863XCJcclxufTtcclxuc3VydmV5TG9jYWxpemF0aW9uLmxvY2FsZXNbXCJnclwiXSA9IGdyZWVrU3VydmV5U3RyaW5ncztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2NhbGl6YXRpb24vZ3JlZWsudHNcbiAqKi8iLCJpbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4uL3N1cnZleVN0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCB2YXIgcG9saXNoU3VydmV5U3RyaW5ncyA9IHtcclxuICAgIHBhZ2VQcmV2VGV4dDogXCJXc3RlY3pcIixcclxuICAgIHBhZ2VOZXh0VGV4dDogXCJEYWxlalwiLFxyXG4gICAgY29tcGxldGVUZXh0OiBcIkdvdG93ZVwiLFxyXG4gICAgcHJvZ3Jlc3NUZXh0OiBcIlN0cm9uYSB7MH0geiB7MX1cIixcclxuICAgIGVtcHR5U3VydmV5OiBcIk5pZSBtYSB3aWRvY3pueWNoIHB5dGHFhC5cIixcclxuICAgIGNvbXBsZXRpbmdTdXJ2ZXk6IFwiRHppxJlrdWplbXkgemEgd3lwZcWCbmllbmllIGFua2lldHkhXCIsXHJcbiAgICBsb2FkaW5nU3VydmV5OiBcIlRyd2Egd2N6eXR5d2FuaWUgYW5raWV0eS4uLlwiLFxyXG4gICAgb3RoZXJJdGVtVGV4dDogXCJJbm5hIG9kcG93aWVkxbouLi5cIixcclxuICAgIG9wdGlvbnNDYXB0aW9uOiBcIld5YmllcnouLi5cIixcclxuICAgIHJlcXVpcmVkRXJyb3I6IFwiUHJvc3rEmSBvZHBvd2llZHppZcSHIG5hIHRvIHB5dGFuaWUuXCIsXHJcbiAgICBudW1lcmljRXJyb3I6IFwiVyB0eW0gcG9sdSBtb8W8bmEgd3Bpc2HEhyB0eWxrbyBsaWN6YnkuXCIsXHJcbiAgICB0ZXh0TWluTGVuZ3RoOiBcIlByb3N6xJkgd3Bpc2HEhyBjbyBuYWptbmllaiB7MH0gem5ha8Ozdy5cIixcclxuICAgIG1pblNlbGVjdEVycm9yOiBcIlByb3N6xJkgd3licmHEhyBjbyBuYWptbmllaiB7MH0gcG96eWNqaS5cIixcclxuICAgIG1heFNlbGVjdEVycm9yOiBcIlByb3N6xJkgd3licmHEhyBuaWUgd2nEmWNlaiBuacW8IHswfSBwb3p5Y2ppLlwiLFxyXG4gICAgbnVtZXJpY01pbk1heDogXCJPZHBvd2llZMW6ICd7MH0nIHBvd2lubmEgYnnEhyB3acSZa3N6YSBsdWIgcsOzd25hIHsxfSBvcmF6IG1uaWVqc3phIGx1YiByw7N3bmEgezJ9XCIsXHJcbiAgICBudW1lcmljTWluOiBcIk9kcG93aWVkxbogJ3swfScgcG93aW5uYSBiecSHIHdpxJlrc3phIGx1YiByw7N3bmEgezF9XCIsXHJcbiAgICBudW1lcmljTWF4OiBcIk9kcG93aWVkxbogJ3swfScgcG93aW5uYSBiecSHIG1uaWVqc3phIGx1YiByw7N3bmEgezF9XCIsXHJcbiAgICBpbnZhbGlkRW1haWw6IFwiUHJvc3rEmSBwb2RhxIcgcHJhd2lkxYJvd3kgYWRyZXMgZW1haWwuXCIsXHJcbiAgICBleGNlZWRNYXhTaXplOiBcIlJvem1pYXIgcHJ6ZXPFgmFuZWdvIHBsaWt1IG5pZSBtb8W8ZSBwcnpla3JhY3phxIcgezB9LlwiLFxyXG4gICAgb3RoZXJSZXF1aXJlZEVycm9yOiBcIlByb3N6xJkgcG9kYcSHIGlubsSFIG9kcG93aWVkxbouXCJcclxufTtcclxuXHJcbnN1cnZleUxvY2FsaXphdGlvbi5sb2NhbGVzW1wicGxcIl0gPSBwb2xpc2hTdXJ2ZXlTdHJpbmdzO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2NhbGl6YXRpb24vcG9saXNoLnRzXG4gKiovIiwiaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcblxyXG5leHBvcnQgdmFyIHJ1c3NpYW5TdXJ2ZXlTdHJpbmdzID0ge1xyXG4gICAgcGFnZVByZXZUZXh0OiBcItCd0LDQt9Cw0LRcIixcclxuICAgIHBhZ2VOZXh0VGV4dDogXCLQlNCw0LvQtdC1XCIsXHJcbiAgICBjb21wbGV0ZVRleHQ6IFwi0JPQvtGC0L7QstC+XCIsXHJcbiAgICBwcm9ncmVzc1RleHQ6IFwi0KHRgtGA0LDQvdC40YbQsCB7MH0g0LjQtyB7MX1cIixcclxuICAgIGVtcHR5U3VydmV5OiBcItCd0LXRgiDQvdC4INC+0LTQvdC+0LPQviDQstC+0L/RgNC+0YHQsC5cIixcclxuICAgIGNvbXBsZXRpbmdTdXJ2ZXk6IFwi0JHQu9Cw0LPQvtC00LDRgNC40Lwg0JLQsNGBINC30LAg0LfQsNC/0L7Qu9C90LXQvdC40LUg0LDQvdC60LXRgtGLIVwiLFxyXG4gICAgbG9hZGluZ1N1cnZleTogXCLQl9Cw0LPRgNGD0LfQutCwINGBINGB0LXRgNCy0LXRgNCwLi4uXCIsXHJcbiAgICBvdGhlckl0ZW1UZXh0OiBcItCU0YDRg9Cz0L7QtSAo0L/QvtC20LDQu9GD0LnRgdGC0LAsINC+0L/QuNGI0LjRgtC1KVwiLFxyXG4gICAgb3B0aW9uc0NhcHRpb246IFwi0JLRi9Cx0YDQsNGC0YwuLi5cIixcclxuICAgIHJlcXVpcmVkRXJyb3I6IFwi0J/QvtC20LDQu9GD0LnRgdGC0LAsINC+0YLQstC10YLRjNGC0LUg0L3QsCDQstC+0L/RgNC+0YEuXCIsXHJcbiAgICBudW1lcmljRXJyb3I6IFwi0J7RgtCy0LXRgiDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YfQuNGB0LvQvtC8LlwiLFxyXG4gICAgdGV4dE1pbkxlbmd0aDogXCLQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0YXQvtGC0Y8g0LHRiyB7MH0g0YHQuNC80LLQvtC70L7Qsi5cIixcclxuICAgIG1pblNlbGVjdEVycm9yOiBcItCf0L7QttCw0LvRg9C50YHRgtCwLCDQstGL0LHQtdGA0LjRgtC1INGF0L7RgtGPINCx0YsgezB9INCy0LDRgNC40LDQvdGC0L7Qsi5cIixcclxuICAgIG1heFNlbGVjdEVycm9yOiBcItCf0L7QttCw0LvRg9C50YHRgtCwLCDQstGL0LHQtdGA0LjRgtC1INC90LUg0LHQvtC70LXQtSB7MH0g0LLQsNGA0LjQsNC90YLQvtCyLlwiLFxyXG4gICAgbnVtZXJpY01pbk1heDogXCInezB9JyDQtNC+0LvQttC90L4g0LHRi9GC0Ywg0YDQsNCy0L3Ri9C8INC40LvQuCDQsdC+0LvRjNGI0LUsINGH0LXQvCB7MX0sINC4INGA0LDQstC90YvQvCDQuNC70Lgg0LzQtdC90YzRiNC1LCDRh9C10LwgezJ9XCIsXHJcbiAgICBudW1lcmljTWluOiBcIid7MH0nINC00L7Qu9C20L3QviDQsdGL0YLRjCDRgNCw0LLQvdGL0Lwg0LjQu9C4INCx0L7Qu9GM0YjQtSwg0YfQtdC8IHsxfVwiLFxyXG4gICAgbnVtZXJpY01heDogXCInezB9JyDQtNC+0LvQttC90L4g0LHRi9GC0Ywg0YDQsNCy0L3Ri9C8INC40LvQuCDQvNC10L3RjNGI0LUsINGH0LXQvCB7MX1cIixcclxuICAgIGludmFsaWRFbWFpbDogXCLQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90YvQuSDQsNC00YDQtdGBINGN0LvQtdC60YLRgNC+0L3QvdC+0Lkg0L/QvtGH0YLRiy5cIixcclxuICAgIG90aGVyUmVxdWlyZWRFcnJvcjogXCLQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0LTQsNC90L3Ri9C1INCyINC/0L7Qu9C1IFxcXCLQlNGA0YPQs9C+0LVcXFwiXCJcclxufTtcclxuXHJcbnN1cnZleUxvY2FsaXphdGlvbi5sb2NhbGVzW1wicnVcIl0gPSBydXNzaWFuU3VydmV5U3RyaW5ncztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2NhbGl6YXRpb24vcnVzc2lhbi50c1xuICoqLyIsImltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tIFwiLi4vc3VydmV5U3RyaW5nc1wiO1xyXG5cclxuZXhwb3J0IHZhciB0dXJraXNoU3VydmV5U3RyaW5ncyA9IHtcclxuICAgICAgICBwYWdlUHJldlRleHQ6IFwiR2VyaVwiLFxyXG4gICAgICAgIHBhZ2VOZXh0VGV4dDogXCLEsGxlcmlcIixcclxuICAgICAgICBjb21wbGV0ZVRleHQ6IFwiQW5rZXRpIFRhbWFtbGFcIixcclxuICAgICAgICBvdGhlckl0ZW1UZXh0OiBcIkRpxJ9lciAoYcOnxLFrbGF5xLFuxLF6KVwiLFxyXG4gICAgICAgIHByb2dyZXNzVGV4dDogXCJTYXlmYSB7MH0gLyB7MX1cIixcclxuICAgICAgICBlbXB0eVN1cnZleTogXCJBbmtldHRlIGfDtnLDvG50w7xsZW5lY2VrIHNheWZhIHlhIGRhIHNvcnUgbWV2Y3V0IGRlxJ9pbC5cIixcclxuICAgICAgICBjb21wbGV0aW5nU3VydmV5OiBcIkFua2V0aW1pemkgdGFtYW1sYWTEscSfxLFuxLF6IGnDp2luIHRlxZ9la2vDvHIgZWRlcml6LlwiLFxyXG4gICAgICAgIGxvYWRpbmdTdXJ2ZXk6IFwiQW5rZXQgc3VudWN1ZGFuIHnDvGtsZW5peW9yIC4uLlwiLFxyXG4gICAgICAgIG9wdGlvbnNDYXB0aW9uOiBcIlNlw6dpbml6IC4uLlwiLFxyXG4gICAgICAgIHJlcXVpcmVkRXJyb3I6IFwiTMO8dGZlbiBzb3J1eWEgY2V2YXAgdmVyaW5pelwiLFxyXG4gICAgICAgIG51bWVyaWNFcnJvcjogXCJHaXJpbGVuIGRlxJ9lciBudW1lcmlrIG9sbWFsxLFkxLFyXCIsXHJcbiAgICAgICAgdGV4dE1pbkxlbmd0aDogXCJFbiBheiB7MH0gc2VtYm9sIGdpcmluaXouXCIsXHJcbiAgICAgICAgbWluUm93Q291bnRFcnJvcjogXCJMw7x0ZmVuIGVuIGF6IHswfSBzYXTEsXLEsSBkb2xkdXJ1bi5cIixcclxuICAgICAgICBtaW5TZWxlY3RFcnJvcjogXCJMw7x0ZmVuIGVuIGF6IHswfSBzZcOnZW5lxJ9pIHNlw6dpbml6LlwiLFxyXG4gICAgICAgIG1heFNlbGVjdEVycm9yOiBcIkzDvHRmZW4gezB9IGFkZXR0ZW4gZmF6bGEgc2XDp21leWluaXouXCIsXHJcbiAgICAgICAgbnVtZXJpY01pbk1heDogXCJUaGUgJ3swfScgc2hvdWxkIGJlIGVxdWFsIG9yIG1vcmUgdGhhbiB7MX0gYW5kIGVxdWFsIG9yIGxlc3MgdGhhbiB7Mn1cIixcclxuICAgICAgICBudW1lcmljTWluOiBcIid7MH0nIGRlxJ9lcmkgezF9IGRlxJ9lcmluZSBlxZ9pdCB2ZXlhIGLDvHnDvGsgb2xtYWzEsWTEsXJcIixcclxuICAgICAgICBudW1lcmljTWF4OiBcIid7MH0nIGRlxJ9lcmkgezF9IGRlxJ9lcmluZSBlxZ9pdCB5YSBkYSBrw7zDp8O8ayBvbG1hbMSxZMSxci5cIixcclxuICAgICAgICBpbnZhbGlkRW1haWw6IFwiTMO8dGZlbiBnZcOnZXJsaSBiaXIgZXBvc3RhIGFkcmVzaSBnaXJpbml6LlwiLFxyXG4gICAgICAgIHVybFJlcXVlc3RFcnJvcjogXCJUYWxlYmkgxZ91IGhhdGF5xLEgZMO2bmTDvCAnezB9Jy4gezF9XCIsXHJcbiAgICAgICAgdXJsR2V0Q2hvaWNlc0Vycm9yOiBcIlRhbGVwIGhlcmhhbmdpIGJpciB2ZXJpIGTDtm5tZWRpIHlhIGRhICdwYXRoJyDDtnplbGxpxJ9pIGhhdGFsxLEuXCIsXHJcbiAgICAgICAgZXhjZWVkTWF4U2l6ZTogXCJEb3N5YSBib3l1dHUgezB9IGRlxJ9lcmluaSBnZcOnZW1lei5cIixcclxuICAgICAgICBvdGhlclJlcXVpcmVkRXJyb3I6IFwiTMO8dGZlbiBkacSfZXIgZGXEn2VybGVyaSBnaXJpbml6LlwiLFxyXG4gICAgICAgIHVwbG9hZGluZ0ZpbGU6IFwiRG9zeWFuxLF6IHnDvGtsZW5peW9yLiBMw5x0ZmVuIGJpcmthw6cgc2FuaXllIGJla2xleWluIHZlIHRla3JhciBkZW5leWluLlwiLFxyXG4gICAgICAgIGFkZFJvdzogXCJTYXTEsXIgRWtsZVwiLFxyXG4gICAgICAgIHJlbW92ZVJvdzogXCJLYWxkxLFyXCJcclxufTtcclxuXHJcbnN1cnZleUxvY2FsaXphdGlvbi5sb2NhbGVzW1widHJcIl0gPSB0dXJraXNoU3VydmV5U3RyaW5ncztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2NhbGl6YXRpb24vdHVya2lzaC50c1xuICoqLyJdLCJzb3VyY2VSb290IjoiIn0=