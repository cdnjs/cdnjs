/*!
* surveyjs - Survey JavaScript library v0.10.3
* (c) Andrew Telnov - http://surveyjs.org/
* License: MIT (http://www.opensource.org/licenses/mit-license.php)
*/

(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define("Survey", ["react"], factory);
	else if(typeof exports === 'object')
		exports["Survey"] = factory(require("react"));
	else
		root["Survey"] = factory(root["React"]);
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
	exports.__extends = exports.QuestionFactory = exports.ReactQuestionFactory = exports.SurveyWindow = exports.SurveyQuestionRating = exports.SurveyProgress = exports.SurveyQuestionMatrixDynamicRow = exports.SurveyQuestionMatrixDynamic = exports.SurveyQuestionText = exports.SurveyQuestionRadiogroup = exports.SurveyQuestionMultipleTextItem = exports.SurveyQuestionMultipleText = exports.SurveyQuestionFile = exports.SurveyQuestionHtml = exports.SurveyQuestionMatrixRow = exports.SurveyQuestionMatrix = exports.SurveyQuestionMatrixDropdownRow = exports.SurveyQuestionMatrixDropdown = exports.SurveyQuestionDropdown = exports.SurveyQuestionCheckboxItem = exports.SurveyQuestionCheckbox = exports.SurveyQuestionComment = exports.SurveyQuestionCommentItem = exports.SurveyQuestionErrors = exports.SurveyQuestion = exports.SurveyRow = exports.SurveyPage = exports.SurveyNavigation = exports.SurveyNavigationBase = exports.Model = exports.ReactSurveyModel = exports.Survey = exports.defaultStandardCss = undefined;
	
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
	
	var _reactSurvey = __webpack_require__(35);
	
	Object.defineProperty(exports, "Survey", {
	  enumerable: true,
	  get: function get() {
	    return _reactSurvey.Survey;
	  }
	});
	
	var _reactsurveymodel = __webpack_require__(37);
	
	Object.defineProperty(exports, "ReactSurveyModel", {
	  enumerable: true,
	  get: function get() {
	    return _reactsurveymodel.ReactSurveyModel;
	  }
	});
	Object.defineProperty(exports, "Model", {
	  enumerable: true,
	  get: function get() {
	    return _reactsurveymodel.ReactSurveyModel;
	  }
	});
	
	var _reactSurveyNavigationBase = __webpack_require__(43);
	
	Object.defineProperty(exports, "SurveyNavigationBase", {
	  enumerable: true,
	  get: function get() {
	    return _reactSurveyNavigationBase.SurveyNavigationBase;
	  }
	});
	
	var _reactSurveyNavigation = __webpack_require__(42);
	
	Object.defineProperty(exports, "SurveyNavigation", {
	  enumerable: true,
	  get: function get() {
	    return _reactSurveyNavigation.SurveyNavigation;
	  }
	});
	
	var _reactpage = __webpack_require__(38);
	
	Object.defineProperty(exports, "SurveyPage", {
	  enumerable: true,
	  get: function get() {
	    return _reactpage.SurveyPage;
	  }
	});
	Object.defineProperty(exports, "SurveyRow", {
	  enumerable: true,
	  get: function get() {
	    return _reactpage.SurveyRow;
	  }
	});
	
	var _reactquestion = __webpack_require__(39);
	
	Object.defineProperty(exports, "SurveyQuestion", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestion.SurveyQuestion;
	  }
	});
	Object.defineProperty(exports, "SurveyQuestionErrors", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestion.SurveyQuestionErrors;
	  }
	});
	
	var _reactquestioncomment = __webpack_require__(40);
	
	Object.defineProperty(exports, "SurveyQuestionCommentItem", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestioncomment.SurveyQuestionCommentItem;
	  }
	});
	Object.defineProperty(exports, "SurveyQuestionComment", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestioncomment.SurveyQuestionComment;
	  }
	});
	
	var _reactquestioncheckbox = __webpack_require__(45);
	
	Object.defineProperty(exports, "SurveyQuestionCheckbox", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestioncheckbox.SurveyQuestionCheckbox;
	  }
	});
	Object.defineProperty(exports, "SurveyQuestionCheckboxItem", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestioncheckbox.SurveyQuestionCheckboxItem;
	  }
	});
	
	var _reactquestiondropdown = __webpack_require__(46);
	
	Object.defineProperty(exports, "SurveyQuestionDropdown", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestiondropdown.SurveyQuestionDropdown;
	  }
	});
	
	var _reactquestionmatrixdropdown = __webpack_require__(47);
	
	Object.defineProperty(exports, "SurveyQuestionMatrixDropdown", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestionmatrixdropdown.SurveyQuestionMatrixDropdown;
	  }
	});
	Object.defineProperty(exports, "SurveyQuestionMatrixDropdownRow", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestionmatrixdropdown.SurveyQuestionMatrixDropdownRow;
	  }
	});
	
	var _reactquestionmatrix = __webpack_require__(48);
	
	Object.defineProperty(exports, "SurveyQuestionMatrix", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestionmatrix.SurveyQuestionMatrix;
	  }
	});
	Object.defineProperty(exports, "SurveyQuestionMatrixRow", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestionmatrix.SurveyQuestionMatrixRow;
	  }
	});
	
	var _reactquestionhtml = __webpack_require__(49);
	
	Object.defineProperty(exports, "SurveyQuestionHtml", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestionhtml.SurveyQuestionHtml;
	  }
	});
	
	var _reactquestionfile = __webpack_require__(50);
	
	Object.defineProperty(exports, "SurveyQuestionFile", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestionfile.SurveyQuestionFile;
	  }
	});
	
	var _reactquestionmultipletext = __webpack_require__(51);
	
	Object.defineProperty(exports, "SurveyQuestionMultipleText", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestionmultipletext.SurveyQuestionMultipleText;
	  }
	});
	Object.defineProperty(exports, "SurveyQuestionMultipleTextItem", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestionmultipletext.SurveyQuestionMultipleTextItem;
	  }
	});
	
	var _reactquestionradiogroup = __webpack_require__(52);
	
	Object.defineProperty(exports, "SurveyQuestionRadiogroup", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestionradiogroup.SurveyQuestionRadiogroup;
	  }
	});
	
	var _reactquestiontext = __webpack_require__(53);
	
	Object.defineProperty(exports, "SurveyQuestionText", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestiontext.SurveyQuestionText;
	  }
	});
	
	var _reactquestionmatrixdynamic = __webpack_require__(54);
	
	Object.defineProperty(exports, "SurveyQuestionMatrixDynamic", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestionmatrixdynamic.SurveyQuestionMatrixDynamic;
	  }
	});
	Object.defineProperty(exports, "SurveyQuestionMatrixDynamicRow", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestionmatrixdynamic.SurveyQuestionMatrixDynamicRow;
	  }
	});
	
	var _reactSurveyProgress = __webpack_require__(44);
	
	Object.defineProperty(exports, "SurveyProgress", {
	  enumerable: true,
	  get: function get() {
	    return _reactSurveyProgress.SurveyProgress;
	  }
	});
	
	var _reactquestionrating = __webpack_require__(55);
	
	Object.defineProperty(exports, "SurveyQuestionRating", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestionrating.SurveyQuestionRating;
	  }
	});
	
	var _reactSurveyWindow = __webpack_require__(56);
	
	Object.defineProperty(exports, "SurveyWindow", {
	  enumerable: true,
	  get: function get() {
	    return _reactSurveyWindow.SurveyWindow;
	  }
	});
	
	var _reactquestionfactory = __webpack_require__(41);
	
	Object.defineProperty(exports, "ReactQuestionFactory", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestionfactory.ReactQuestionFactory;
	  }
	});
	Object.defineProperty(exports, "QuestionFactory", {
	  enumerable: true,
	  get: function get() {
	    return _reactquestionfactory.ReactQuestionFactory;
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
	
	__webpack_require__(67);

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
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {'use strict';
	
	exports.__esModule = true;
	exports.Question = undefined;
	
	var _jsonobject = __webpack_require__(7);
	
	var _questionbase = __webpack_require__(13);
	
	var _base = __webpack_require__(4);
	
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
	    } }, "isAllRowRequired:boolean"], function () {
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
	        this.isValidatingOnServerValue = false;
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
	        if (this.isCurrentPageHasErrors) return false;
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
	        if (this.sendResultOnPageNext && this.clientId) {
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
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactsurveymodel = __webpack_require__(37);
	
	var _reactpage = __webpack_require__(38);
	
	var _reactSurveyNavigation = __webpack_require__(42);
	
	var _reactquestionfactory = __webpack_require__(41);
	
	var _cssstandard = __webpack_require__(34);
	
	var _reactSurveyProgress = __webpack_require__(44);
	
	var _base = __webpack_require__(4);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var Survey = exports.Survey = function (_super) {
	    __extends(Survey, _super);
	    function Survey(props) {
	        _super.call(this, props);
	        this.isCurrentPageChanged = false;
	        this.updateSurvey(props);
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
	    Survey.prototype.componentWillReceiveProps = function (nextProps) {
	        this.updateSurvey(nextProps);
	    };
	    Survey.prototype.componentDidUpdate = function () {
	        if (this.isCurrentPageChanged) {
	            this.isCurrentPageChanged = false;
	            this.survey.focusFirstQuestion();
	        }
	    };
	    Survey.prototype.render = function () {
	        if (this.survey.state == "completed") return this.renderCompleted();
	        if (this.survey.state == "loading") return this.renderLoading();
	        return this.renderSurvey();
	    };
	    Object.defineProperty(Survey.prototype, "css", {
	        get: function get() {
	            return _cssstandard.surveyCss.getCss();
	        },
	        set: function set(value) {
	            this.survey.mergeCss(value, this.css);
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Survey.prototype.renderCompleted = function () {
	        var htmlValue = { __html: this.survey.processedCompletedHtml };
	        return React.createElement("div", { dangerouslySetInnerHTML: htmlValue });
	    };
	    Survey.prototype.renderLoading = function () {
	        var htmlValue = { __html: this.survey.processedLoadingHtml };
	        return React.createElement("div", { dangerouslySetInnerHTML: htmlValue });
	    };
	    Survey.prototype.renderSurvey = function () {
	        var title = this.survey.title && this.survey.showTitle ? this.renderTitle() : null;
	        var currentPage = this.survey.currentPage ? this.renderPage() : null;
	        var topProgress = this.survey.showProgressBar == "top" ? this.renderProgress(true) : null;
	        var bottomProgress = this.survey.showProgressBar == "bottom" ? this.renderProgress(false) : null;
	        var buttons = currentPage && this.survey.showNavigationButtons ? this.renderNavigation() : null;
	        if (!currentPage) {
	            currentPage = this.renderEmptySurvey();
	        }
	        return React.createElement("div", { className: this.css.root }, title, React.createElement("div", { id: _base.SurveyPageId, className: this.css.body }, topProgress, currentPage, bottomProgress), buttons);
	    };
	    Survey.prototype.renderTitle = function () {
	        return React.createElement("div", { className: this.css.header }, React.createElement("h3", null, this.survey.title));
	    };
	    Survey.prototype.renderPage = function () {
	        return React.createElement(_reactpage.SurveyPage, { survey: this.survey, page: this.survey.currentPage, css: this.css, creator: this });
	    };
	    Survey.prototype.renderProgress = function (isTop) {
	        return React.createElement(_reactSurveyProgress.SurveyProgress, { survey: this.survey, css: this.css, isTop: isTop });
	    };
	    Survey.prototype.renderNavigation = function () {
	        return React.createElement(_reactSurveyNavigation.SurveyNavigation, { survey: this.survey, css: this.css });
	    };
	    Survey.prototype.renderEmptySurvey = function () {
	        return React.createElement("span", null, this.survey.emptySurveyText);
	    };
	    Survey.prototype.updateSurvey = function (newProps) {
	        if (newProps) {
	            if (newProps.model) {
	                this.survey = newProps.model;
	            } else {
	                if (newProps.json) {
	                    this.survey = new _reactsurveymodel.ReactSurveyModel(newProps.json);
	                }
	            }
	        } else {
	            this.survey = new _reactsurveymodel.ReactSurveyModel();
	        }
	        if (newProps) {
	            if (newProps.clientId) this.survey.clientId = newProps.clientId;
	            if (newProps.data) this.survey.data = newProps.data;
	            if (newProps.css) this.survey.mergeCss(newProps.css, this.css);
	        }
	        //set the first page
	        var dummy = this.survey.currentPage;
	        this.state = { pageIndexChange: 0, isCompleted: false, modelChanged: 0 };
	        this.setSurveyEvents(newProps);
	    };
	    Survey.prototype.setSurveyEvents = function (newProps) {
	        var self = this;
	        this.survey.renderCallback = function () {
	            self.state.modelChanged = self.state.modelChanged + 1;
	            self.setState(self.state);
	        };
	        this.survey.onComplete.add(function (sender) {
	            self.state.isCompleted = true;self.setState(self.state);
	        });
	        this.survey.onCurrentPageChanged.add(function (sender, options) {
	            self.isCurrentPageChanged = true;
	            self.state.pageIndexChange = self.state.pageIndexChange + 1;
	            self.setState(self.state);
	            if (newProps && newProps.onCurrentPageChanged) newProps.onCurrentPageChanged(sender, options);
	        });
	        this.survey.onVisibleChanged.add(function (sender, options) {
	            if (options.question && options.question.react) {
	                var state = options.question.react.state;
	                state.visible = options.question.visible;
	                options.question.react.setState(state);
	            }
	        });
	        this.survey.onValueChanged.add(function (sender, options) {
	            if (options.question && options.question.react) {
	                var state = options.question.react.state;
	                state.value = options.value;
	                options.question.react.setState(state);
	            }
	        });
	        if (!newProps) return;
	        this.survey.onValueChanged.add(function (sender, options) {
	            if (newProps.data) newProps.data[options.name] = options.value;
	            if (newProps.onValueChanged) newProps.onValueChanged(sender, options);
	        });
	        if (newProps.onComplete) {
	            this.survey.onComplete.add(function (sender) {
	                newProps.onComplete(sender);
	            });
	        }
	        this.survey.onPageVisibleChanged.add(function (sender, options) {
	            if (newProps.onPageVisibleChanged) newProps.onPageVisibleChanged(sender, options);
	        });
	        if (newProps.onQuestionAdded) {
	            this.survey.onQuestionAdded.add(function (sender, options) {
	                newProps.onQuestionAdded(sender, options);
	            });
	        }
	        if (newProps.onQuestionRemoved) {
	            this.survey.onQuestionRemoved.add(function (sender, options) {
	                newProps.onQuestionRemoved(sender, options);
	            });
	        }
	        if (newProps.onValidateQuestion) {
	            this.survey.onValidateQuestion.add(function (sender, options) {
	                newProps.onValidateQuestion(sender, options);
	            });
	        }
	        if (newProps.onServerValidateQuestions) {
	            this.survey.onServerValidateQuestions = newProps.onServerValidateQuestions;
	        }
	        if (newProps.onSendResult) {
	            this.survey.onSendResult.add(function (sender, options) {
	                newProps.onSendResult(sender, options);
	            });
	        }
	        if (newProps.onGetResult) {
	            this.survey.onGetResult.add(function (sender, options) {
	                newProps.onGetResult(sender, options);
	            });
	        }
	        if (newProps.onProcessHtml) {
	            this.survey.onProcessHtml.add(function (sender, options) {
	                newProps.onProcessHtml(sender, options);
	            });
	        }
	    };
	    //ISurveyCreator
	    Survey.prototype.createQuestionElement = function (question) {
	        var questionCss = this.css[question.getType()];
	        return _reactquestionfactory.ReactQuestionFactory.Instance.createQuestion(question.getType(), {
	            question: question, css: questionCss, rootCss: this.css, creator: this
	        });
	    };
	    Survey.prototype.renderError = function (key, errorText) {
	        return React.createElement("div", { key: key, className: this.css.error.item }, errorText);
	    };
	    Survey.prototype.questionTitleLocation = function () {
	        return this.survey.questionTitleLocation;
	    };
	    return Survey;
	}(React.Component);
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
	exports.ReactSurveyModel = undefined;
	
	var _survey = __webpack_require__(30);
	
	var ReactSurveyModel = exports.ReactSurveyModel = function (_super) {
	    __extends(ReactSurveyModel, _super);
	    function ReactSurveyModel(jsonObj) {
	        if (jsonObj === void 0) {
	            jsonObj = null;
	        }
	        _super.call(this, jsonObj);
	    }
	    ReactSurveyModel.prototype.render = function () {
	        if (this.renderCallback) {
	            this.renderCallback();
	        }
	    };
	    ReactSurveyModel.prototype.mergeCss = function (src, dest) {
	        this.mergeValues(src, dest);
	    };
	    ReactSurveyModel.prototype.onLoadSurveyFromService = function () {
	        this.render();
	    };
	    ReactSurveyModel.prototype.onLoadingSurveyFromService = function () {
	        this.render();
	    };
	    return ReactSurveyModel;
	}(_survey.SurveyModel);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {'use strict';
	
	exports.__esModule = true;
	exports.SurveyRow = exports.SurveyPage = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactquestion = __webpack_require__(39);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyPage = exports.SurveyPage = function (_super) {
	    __extends(SurveyPage, _super);
	    function SurveyPage(props) {
	        _super.call(this, props);
	        this.page = props.page;
	        this.survey = props.survey;
	        this.creator = props.creator;
	        this.css = props.css;
	    }
	    SurveyPage.prototype.componentWillReceiveProps = function (nextProps) {
	        this.page = nextProps.page;
	        this.survey = nextProps.survey;
	        this.creator = nextProps.creator;
	        this.css = nextProps.css;
	    };
	    SurveyPage.prototype.render = function () {
	        if (this.page == null || this.survey == null || this.creator == null) return null;
	        var title = this.renderTitle();
	        var rows = [];
	        var questionRows = this.page.rows;
	        for (var i = 0; i < questionRows.length; i++) {
	            rows.push(this.createRow(questionRows[i], i));
	        }
	        return React.createElement("div", null, title, rows);
	    };
	    SurveyPage.prototype.createRow = function (row, index) {
	        var rowName = "row" + (index + 1);
	        return React.createElement(SurveyRow, { key: rowName, row: row, survey: this.survey, creator: this.creator, css: this.css });
	    };
	    SurveyPage.prototype.renderTitle = function () {
	        if (!this.page.title || !this.survey.showPageTitles) return null;
	        var text = this.page.processedTitle;
	        if (this.page.num > 0) {
	            text = this.page.num + ". " + text;
	        }
	        return React.createElement("h4", { className: this.css.pageTitle }, text);
	    };
	    return SurveyPage;
	}(React.Component);
	var SurveyRow = exports.SurveyRow = function (_super) {
	    __extends(SurveyRow, _super);
	    function SurveyRow(props) {
	        _super.call(this, props);
	        this.setProperties(props);
	    }
	    SurveyRow.prototype.componentWillReceiveProps = function (nextProps) {
	        this.setProperties(nextProps);
	    };
	    SurveyRow.prototype.setProperties = function (props) {
	        this.row = props.row;
	        if (this.row) {
	            var self = this;
	            this.row.visibilityChangedCallback = function () {
	                self.setState({ visible: self.row.visible });
	            };
	        }
	        this.survey = props.survey;
	        this.creator = props.creator;
	        this.css = props.css;
	    };
	    SurveyRow.prototype.render = function () {
	        if (this.row == null || this.survey == null || this.creator == null) return null;
	        if (!this.row.visible) return null;
	        var questions = [];
	        for (var i = 0; i < this.row.questions.length; i++) {
	            var question = this.row.questions[i];
	            questions.push(this.createQuestion(question));
	        }
	        return React.createElement("div", { className: this.css.row }, questions);
	    };
	    SurveyRow.prototype.createQuestion = function (question) {
	        return React.createElement(_reactquestion.SurveyQuestion, { key: question.name, question: question, creator: this.creator, css: this.css });
	    };
	    return SurveyRow;
	}(React.Component);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {'use strict';
	
	exports.__esModule = true;
	exports.SurveyQuestionErrors = exports.SurveyQuestion = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _question = __webpack_require__(12);
	
	var _reactquestioncomment = __webpack_require__(40);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyQuestion = exports.SurveyQuestion = function (_super) {
	    __extends(SurveyQuestion, _super);
	    function SurveyQuestion(props) {
	        _super.call(this, props);
	        this.setQuestion(props.question);
	        this.creator = props.creator;
	        this.css = props.css;
	    }
	    SurveyQuestion.prototype.componentWillReceiveProps = function (nextProps) {
	        this.creator = nextProps.creator;
	        this.css = nextProps.css;
	        this.setQuestion(nextProps.question);
	    };
	    SurveyQuestion.prototype.setQuestion = function (question) {
	        this.questionBase = question;
	        this.question = question instanceof _question.Question ? question : null;
	        var value = this.question ? this.question.value : null;
	        this.state = {
	            visible: this.questionBase.visible, value: value, error: 0, renderWidth: 0,
	            visibleIndexValue: -1
	        };
	    };
	    SurveyQuestion.prototype.componentDidMount = function () {
	        if (this.questionBase) {
	            var self = this;
	            this.questionBase["react"] = self;
	            this.questionBase.renderWidthChangedCallback = function () {
	                self.state.renderWidth = self.state.renderWidth + 1;
	                self.setState(self.state);
	            };
	            this.questionBase.visibleIndexChangedCallback = function () {
	                self.state.visibleIndexValue = self.questionBase.visibleIndex;
	                self.setState(self.state);
	            };
	        }
	    };
	    SurveyQuestion.prototype.componentWillUnmount = function () {
	        if (this.questionBase) {
	            this.questionBase["react"] = null;
	            this.questionBase.renderWidthChangedCallback = null;
	            this.questionBase.visibleIndexChangedCallback = null;
	        }
	    };
	    SurveyQuestion.prototype.render = function () {
	        if (!this.questionBase || !this.creator) return null;
	        if (!this.questionBase.visible) return null;
	        var questionRender = this.creator.createQuestionElement(this.questionBase);
	        var title = this.questionBase.hasTitle ? this.renderTitle() : null;
	        var titleTop = this.creator.questionTitleLocation() == "top" ? title : null;
	        var titleBottom = this.creator.questionTitleLocation() == "bottom" ? title : null;
	        var comment = this.question && this.question.hasComment ? this.renderComment() : null;
	        var errors = this.renderErrors();
	        var marginLeft = this.questionBase.indent > 0 ? this.questionBase.indent * this.css.question.indent + "px" : null;
	        var paddingRight = this.questionBase.rightIndent > 0 ? this.questionBase.rightIndent * this.css.question.indent + "px" : null;
	        var rootStyle = { display: 'inline-block', verticalAlign: 'top' };
	        if (this.questionBase.renderWidth) rootStyle["width"] = this.questionBase.renderWidth;
	        if (marginLeft) rootStyle["marginLeft"] = marginLeft;
	        if (paddingRight) rootStyle["paddingRight"] = paddingRight;
	        return React.createElement("div", { id: this.questionBase.id, className: this.css.question.root, style: rootStyle }, titleTop, errors, questionRender, comment, titleBottom);
	    };
	    SurveyQuestion.prototype.renderTitle = function () {
	        var titleText = this.question.fullTitle;
	        return React.createElement("h5", { className: this.css.question.title }, titleText);
	    };
	    SurveyQuestion.prototype.renderComment = function () {
	        return React.createElement("div", null, React.createElement("div", null, this.question.commentText), React.createElement("div", { className: this.css.question.comment }, React.createElement(_reactquestioncomment.SurveyQuestionCommentItem, { question: this.question })));
	    };
	    SurveyQuestion.prototype.renderErrors = function () {
	        return React.createElement(SurveyQuestionErrors, { question: this.question, css: this.css, creator: this.creator });
	    };
	    return SurveyQuestion;
	}(React.Component);
	var SurveyQuestionErrors = exports.SurveyQuestionErrors = function (_super) {
	    __extends(SurveyQuestionErrors, _super);
	    function SurveyQuestionErrors(props) {
	        _super.call(this, props);
	        this.setQuestion(props.question);
	        this.creator = props.creator;
	        this.css = props.css;
	    }
	    SurveyQuestionErrors.prototype.componentWillReceiveProps = function (nextProps) {
	        this.setQuestion(nextProps.question);
	        this.creator = nextProps.creator;
	        this.css = nextProps.css;
	    };
	    SurveyQuestionErrors.prototype.setQuestion = function (question) {
	        this.question = question instanceof _question.Question ? question : null;
	        if (this.question) {
	            var self = this;
	            this.question.errorsChangedCallback = function () {
	                self.state.error = self.state.error + 1;
	                self.setState(self.state);
	            };
	        }
	        this.state = { error: 0 };
	    };
	    SurveyQuestionErrors.prototype.render = function () {
	        if (!this.question || this.question.errors.length == 0) return null;
	        var errors = [];
	        for (var i = 0; i < this.question.errors.length; i++) {
	            var errorText = this.question.errors[i].getText();
	            var key = "error" + i;
	            errors.push(this.creator.renderError(key, errorText));
	        }
	        return React.createElement("div", { className: this.css.error.root }, errors);
	    };
	    return SurveyQuestionErrors;
	}(React.Component);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyQuestionCommentItem = exports.SurveyQuestionComment = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactquestionfactory = __webpack_require__(41);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyQuestionComment = exports.SurveyQuestionComment = function (_super) {
	    __extends(SurveyQuestionComment, _super);
	    function SurveyQuestionComment(props) {
	        _super.call(this, props);
	        this.question = props.question;
	        this.css = props.css;
	        this.state = { value: this.question.value };
	        this.handleOnChange = this.handleOnChange.bind(this);
	    }
	    SurveyQuestionComment.prototype.handleOnChange = function (event) {
	        this.question.value = event.target.value;
	        this.setState({ value: this.question.value });
	    };
	    SurveyQuestionComment.prototype.componentWillReceiveProps = function (nextProps) {
	        this.question = nextProps.question;
	    };
	    SurveyQuestionComment.prototype.render = function () {
	        if (!this.question) return null;
	        return React.createElement("textarea", { id: this.question.inputId, className: this.css, type: "text", value: this.state.value, onChange: this.handleOnChange, cols: this.question.cols, rows: this.question.rows });
	    };
	    return SurveyQuestionComment;
	}(React.Component);
	var SurveyQuestionCommentItem = exports.SurveyQuestionCommentItem = function (_super) {
	    __extends(SurveyQuestionCommentItem, _super);
	    function SurveyQuestionCommentItem(props) {
	        _super.call(this, props);
	        this.question = props.question;
	        this.css = props.css;
	        this.comment = this.question.comment;
	        this.state = { value: this.comment };
	        this.handleOnChange = this.handleOnChange.bind(this);
	        this.handleOnBlur = this.handleOnBlur.bind(this);
	    }
	    SurveyQuestionCommentItem.prototype.handleOnChange = function (event) {
	        this.comment = event.target.value;
	        this.setState({ value: this.comment });
	    };
	    SurveyQuestionCommentItem.prototype.handleOnBlur = function (event) {
	        this.question.comment = this.comment;
	    };
	    SurveyQuestionCommentItem.prototype.componentWillReceiveProps = function (nextProps) {
	        this.question = nextProps.question;
	    };
	    SurveyQuestionCommentItem.prototype.render = function () {
	        if (!this.question) return null;
	        return React.createElement("input", { type: "text", className: this.css.question.comment, value: this.state.value, onChange: this.handleOnChange, onBlur: this.handleOnBlur });
	    };
	    return SurveyQuestionCommentItem;
	}(React.Component);
	_reactquestionfactory.ReactQuestionFactory.Instance.registerQuestion("comment", function (props) {
	    return React.createElement(SurveyQuestionComment, props);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 41 */
/***/ function(module, exports) {

	"use strict";
	
	exports.__esModule = true;
	var ReactQuestionFactory = exports.ReactQuestionFactory = function () {
	    function ReactQuestionFactory() {
	        this.creatorHash = {};
	    }
	    ReactQuestionFactory.prototype.registerQuestion = function (questionType, questionCreator) {
	        this.creatorHash[questionType] = questionCreator;
	    };
	    ReactQuestionFactory.prototype.getAllTypes = function () {
	        var result = new Array();
	        for (var key in this.creatorHash) {
	            result.push(key);
	        }
	        return result.sort();
	    };
	    ReactQuestionFactory.prototype.createQuestion = function (questionType, params) {
	        var creator = this.creatorHash[questionType];
	        if (creator == null) return null;
	        return creator(params);
	    };
	    ReactQuestionFactory.Instance = new ReactQuestionFactory();
	    ReactQuestionFactory.DefaultChoices = ["one", "two|second value", "three|third value"];
	    return ReactQuestionFactory;
	}();

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyNavigation = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactSurveyNavigationBase = __webpack_require__(43);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyNavigation = exports.SurveyNavigation = function (_super) {
	    __extends(SurveyNavigation, _super);
	    function SurveyNavigation(props) {
	        _super.call(this, props);
	        this.handlePrevClick = this.handlePrevClick.bind(this);
	        this.handleNextClick = this.handleNextClick.bind(this);
	        this.handleCompleteClick = this.handleCompleteClick.bind(this);
	    }
	    SurveyNavigation.prototype.handlePrevClick = function (event) {
	        this.survey.prevPage();
	    };
	    SurveyNavigation.prototype.handleNextClick = function (event) {
	        this.survey.nextPage();
	    };
	    SurveyNavigation.prototype.handleCompleteClick = function (event) {
	        this.survey.completeLastPage();
	    };
	    SurveyNavigation.prototype.render = function () {
	        if (!this.survey) return null;
	        var prevButton = !this.survey.isFirstPage ? this.renderButton(this.handlePrevClick, this.survey.pagePrevText, this.css.navigation.prev) : null;
	        var nextButton = !this.survey.isLastPage ? this.renderButton(this.handleNextClick, this.survey.pageNextText, this.css.navigation.next) : null;
	        var completeButton = this.survey.isLastPage ? this.renderButton(this.handleCompleteClick, this.survey.completeText, this.css.navigation.complete) : null;
	        return React.createElement("div", { className: this.css.footer }, prevButton, nextButton, completeButton);
	    };
	    SurveyNavigation.prototype.renderButton = function (click, text, btnClassName) {
	        var style = { marginRight: "5px" };
	        var className = this.css.navigationButton + (btnClassName ? ' ' + btnClassName : "");
	        return React.createElement("input", { className: className, style: style, type: "button", onClick: click, value: text });
	    };
	    return SurveyNavigation;
	}(_reactSurveyNavigationBase.SurveyNavigationBase);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {'use strict';
	
	exports.__esModule = true;
	exports.SurveyNavigationBase = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyNavigationBase = exports.SurveyNavigationBase = function (_super) {
	    __extends(SurveyNavigationBase, _super);
	    function SurveyNavigationBase(props) {
	        _super.call(this, props);
	        this.updateStateFunction = null;
	        this.survey = props.survey;
	        this.css = props.css;
	        this.state = { update: 0 };
	    }
	    SurveyNavigationBase.prototype.componentWillReceiveProps = function (nextProps) {
	        this.survey = nextProps.survey;
	        this.css = nextProps.css;
	    };
	    SurveyNavigationBase.prototype.componentDidMount = function () {
	        if (this.survey) {
	            var self = this;
	            this.updateStateFunction = function () {
	                self.state.update = self.state.update + 1;
	                self.setState(self.state);
	            };
	            this.survey.onPageVisibleChanged.add(this.updateStateFunction);
	        }
	    };
	    SurveyNavigationBase.prototype.componentWillUnmount = function () {
	        if (this.survey && this.updateStateFunction) {
	            this.survey.onPageVisibleChanged.remove(this.updateStateFunction);
	            this.updateStateFunction = null;
	        }
	    };
	    return SurveyNavigationBase;
	}(React.Component);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyProgress = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactSurveyNavigationBase = __webpack_require__(43);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyProgress = exports.SurveyProgress = function (_super) {
	    __extends(SurveyProgress, _super);
	    function SurveyProgress(props) {
	        _super.call(this, props);
	        this.isTop = props.isTop;
	    }
	    SurveyProgress.prototype.componentWillReceiveProps = function (nextProps) {
	        _super.prototype.componentWillReceiveProps.call(this, nextProps);
	        this.isTop = nextProps.isTop;
	    };
	    Object.defineProperty(SurveyProgress.prototype, "progress", {
	        get: function get() {
	            return this.survey.getProgress();
	        },
	        enumerable: true,
	        configurable: true
	    });
	    Object.defineProperty(SurveyProgress.prototype, "progressText", {
	        get: function get() {
	            return this.survey.progressText;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyProgress.prototype.render = function () {
	        var style = this.isTop ? { width: "60%" } : { width: "60%", marginTop: "10px" };
	        var progressStyle = { width: this.progress + "%" };
	        return React.createElement("div", { className: this.css.progress, style: style }, React.createElement("div", { style: progressStyle, className: this.css.progressBar, role: "progressbar", "aria-valuemin": "0", "aria-valuemax": "100" }, React.createElement("span", null, this.progressText)));
	    };
	    return SurveyProgress;
	}(_reactSurveyNavigationBase.SurveyNavigationBase);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyQuestionCheckboxItem = exports.SurveyQuestionCheckbox = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactquestioncomment = __webpack_require__(40);
	
	var _reactquestionfactory = __webpack_require__(41);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyQuestionCheckbox = exports.SurveyQuestionCheckbox = function (_super) {
	    __extends(SurveyQuestionCheckbox, _super);
	    function SurveyQuestionCheckbox(props) {
	        _super.call(this, props);
	        this.question = props.question;
	        this.css = props.css;
	        this.rootCss = props.rootCss;
	        this.state = { choicesChanged: 0 };
	        var self = this;
	        this.question.choicesChangedCallback = function () {
	            self.state.choicesChanged = self.state.choicesChanged + 1;
	            self.setState(self.state);
	        };
	    }
	    SurveyQuestionCheckbox.prototype.componentWillReceiveProps = function (nextProps) {
	        this.question = nextProps.question;
	        this.css = nextProps.css;
	        this.rootCss = nextProps.rootCss;
	    };
	    SurveyQuestionCheckbox.prototype.render = function () {
	        if (!this.question) return null;
	        return React.createElement("form", { className: this.css.root }, this.getItems());
	    };
	    SurveyQuestionCheckbox.prototype.getItems = function () {
	        var items = [];
	        for (var i = 0; i < this.question.visibleChoices.length; i++) {
	            var item = this.question.visibleChoices[i];
	            var key = "item" + i;
	            items.push(this.renderItem(key, item, i == 0));
	        }
	        return items;
	    };
	    Object.defineProperty(SurveyQuestionCheckbox.prototype, "textStyle", {
	        get: function get() {
	            return null;
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyQuestionCheckbox.prototype.renderItem = function (key, item, isFirst) {
	        return React.createElement(SurveyQuestionCheckboxItem, { key: key, question: this.question, css: this.css, rootCss: this.rootCss, item: item, textStyle: this.textStyle, isFirst: isFirst });
	    };
	    return SurveyQuestionCheckbox;
	}(React.Component);
	var SurveyQuestionCheckboxItem = exports.SurveyQuestionCheckboxItem = function (_super) {
	    __extends(SurveyQuestionCheckboxItem, _super);
	    function SurveyQuestionCheckboxItem(props) {
	        _super.call(this, props);
	        this.item = props.item;
	        this.question = props.question;
	        this.css = props.css;
	        this.rootCss = props.rootCss;
	        this.textStyle = props.textStyle;
	        this.isFirst = props.isFirst;
	        this.handleOnChange = this.handleOnChange.bind(this);
	    }
	    SurveyQuestionCheckboxItem.prototype.componentWillReceiveProps = function (nextProps) {
	        this.item = nextProps.item;
	        this.css = nextProps.css;
	        this.rootCss = nextProps.rootCss;
	        this.textStyle = nextProps.textStyle;
	        this.question = nextProps.question;
	        this.isFirst = nextProps.isFirst;
	    };
	    SurveyQuestionCheckboxItem.prototype.handleOnChange = function (event) {
	        var newValue = this.question.value;
	        if (!newValue) {
	            newValue = [];
	        }
	        var index = newValue.indexOf(this.item.value);
	        if (event.target.checked) {
	            if (index < 0) {
	                newValue.push(this.item.value);
	            }
	        } else {
	            if (index > -1) {
	                newValue.splice(index, 1);
	            }
	        }
	        this.question.value = newValue;
	        this.setState({ value: this.question.value });
	    };
	    SurveyQuestionCheckboxItem.prototype.render = function () {
	        if (!this.item || !this.question) return null;
	        var itemWidth = this.question.colCount > 0 ? 100 / this.question.colCount + "%" : "";
	        var marginRight = this.question.colCount == 0 ? "5px" : "0px";
	        var divStyle = { marginRight: marginRight };
	        if (itemWidth) {
	            divStyle["width"] = itemWidth;
	        }
	        var isChecked = this.question.value && this.question.value.indexOf(this.item.value) > -1 || false;
	        var otherItem = this.item.value === this.question.otherItem.value && isChecked ? this.renderOther() : null;
	        return this.renderCheckbox(isChecked, divStyle, otherItem);
	    };
	    Object.defineProperty(SurveyQuestionCheckboxItem.prototype, "inputStyle", {
	        get: function get() {
	            return { marginRight: "3px" };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyQuestionCheckboxItem.prototype.renderCheckbox = function (isChecked, divStyle, otherItem) {
	        var id = this.isFirst ? this.question.inputId : null;
	        return React.createElement("div", { className: this.css.item, style: divStyle }, React.createElement("label", { className: this.css.item }, React.createElement("input", { type: "checkbox", id: id, style: this.inputStyle, checked: isChecked, onChange: this.handleOnChange }), React.createElement("span", null, this.item.text)), otherItem);
	    };
	    SurveyQuestionCheckboxItem.prototype.renderOther = function () {
	        return React.createElement("div", { className: this.css.other }, React.createElement(_reactquestioncomment.SurveyQuestionCommentItem, { question: this.question, css: this.rootCss }));
	    };
	    return SurveyQuestionCheckboxItem;
	}(React.Component);
	_reactquestionfactory.ReactQuestionFactory.Instance.registerQuestion("checkbox", function (props) {
	    return React.createElement(SurveyQuestionCheckbox, props);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyQuestionDropdown = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactquestioncomment = __webpack_require__(40);
	
	var _reactquestionfactory = __webpack_require__(41);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyQuestionDropdown = exports.SurveyQuestionDropdown = function (_super) {
	    __extends(SurveyQuestionDropdown, _super);
	    function SurveyQuestionDropdown(props) {
	        _super.call(this, props);
	        this.question = props.question;
	        this.css = props.css;
	        this.rootCss = props.rootCss;
	        this.state = { value: this.question.value, choicesChanged: 0 };
	        var self = this;
	        this.question.choicesChangedCallback = function () {
	            self.state.choicesChanged = self.state.choicesChanged + 1;
	            self.setState(self.state);
	        };
	        this.handleOnChange = this.handleOnChange.bind(this);
	    }
	    SurveyQuestionDropdown.prototype.handleOnChange = function (event) {
	        this.question.value = event.target.value;
	        this.setState({ value: this.question.value });
	    };
	    SurveyQuestionDropdown.prototype.componentWillReceiveProps = function (nextProps) {
	        this.question = nextProps.question;
	        this.css = nextProps.css;
	        this.rootCss = nextProps.rootCss;
	    };
	    SurveyQuestionDropdown.prototype.render = function () {
	        if (!this.question) return null;
	        var options = [];
	        for (var i = 0; i < this.question.visibleChoices.length; i++) {
	            var item = this.question.visibleChoices[i];
	            var key = "item" + i;
	            var option = React.createElement("option", { key: key, value: item.value }, item.text);
	            options.push(option);
	        }
	        var comment = this.question.value === this.question.otherItem.value ? this.renderOther() : null;
	        return React.createElement("div", null, React.createElement("select", { id: this.question.inputId, className: this.css, value: this.state.value, onChange: this.handleOnChange }, React.createElement("option", { value: "" }, this.question.optionsCaption), options), comment);
	    };
	    SurveyQuestionDropdown.prototype.renderOther = function () {
	        var style = { marginTop: "3px" };
	        return React.createElement("div", { style: style }, React.createElement(_reactquestioncomment.SurveyQuestionCommentItem, { question: this.question, css: this.rootCss }));
	    };
	    return SurveyQuestionDropdown;
	}(React.Component);
	_reactquestionfactory.ReactQuestionFactory.Instance.registerQuestion("dropdown", function (props) {
	    return React.createElement(SurveyQuestionDropdown, props);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyQuestionMatrixDropdownRow = exports.SurveyQuestionMatrixDropdown = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactquestion = __webpack_require__(39);
	
	var _reactquestionfactory = __webpack_require__(41);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyQuestionMatrixDropdown = exports.SurveyQuestionMatrixDropdown = function (_super) {
	    __extends(SurveyQuestionMatrixDropdown, _super);
	    function SurveyQuestionMatrixDropdown(props) {
	        _super.call(this, props);
	        this.setProperties(props);
	    }
	    SurveyQuestionMatrixDropdown.prototype.componentWillReceiveProps = function (nextProps) {
	        this.setProperties(nextProps);
	    };
	    SurveyQuestionMatrixDropdown.prototype.setProperties = function (nextProps) {
	        this.question = nextProps.question;
	        this.css = nextProps.css;
	        this.rootCss = nextProps.rootCss;
	        this.creator = nextProps.creator;
	    };
	    SurveyQuestionMatrixDropdown.prototype.render = function () {
	        if (!this.question) return null;
	        var headers = [];
	        for (var i = 0; i < this.question.columns.length; i++) {
	            var column = this.question.columns[i];
	            var key = "column" + i;
	            var minWidth = this.question.getColumnWidth(column);
	            var columnStyle = minWidth ? { minWidth: minWidth } : {};
	            headers.push(React.createElement("th", { key: key, style: columnStyle }, this.question.getColumnTitle(column)));
	        }
	        var rows = [];
	        var visibleRows = this.question.visibleRows;
	        for (var i = 0; i < visibleRows.length; i++) {
	            var row = visibleRows[i];
	            var key = "row" + i;
	            rows.push(React.createElement(SurveyQuestionMatrixDropdownRow, { key: key, row: row, css: this.css, rootCss: this.rootCss, creator: this.creator }));
	        }
	        var divStyle = this.question.horizontalScroll ? { overflowX: 'scroll' } : {};
	        return React.createElement("div", { style: divStyle }, React.createElement("table", { className: this.css.root }, React.createElement("thead", null, React.createElement("tr", null, React.createElement("th", null), headers)), React.createElement("tbody", null, rows)));
	    };
	    return SurveyQuestionMatrixDropdown;
	}(React.Component);
	var SurveyQuestionMatrixDropdownRow = exports.SurveyQuestionMatrixDropdownRow = function (_super) {
	    __extends(SurveyQuestionMatrixDropdownRow, _super);
	    function SurveyQuestionMatrixDropdownRow(props) {
	        _super.call(this, props);
	        this.setProperties(props);
	    }
	    SurveyQuestionMatrixDropdownRow.prototype.componentWillReceiveProps = function (nextProps) {
	        this.setProperties(nextProps);
	    };
	    SurveyQuestionMatrixDropdownRow.prototype.setProperties = function (nextProps) {
	        this.row = nextProps.row;
	        this.css = nextProps.css;
	        this.rootCss = nextProps.rootCss;
	        this.creator = nextProps.creator;
	    };
	    SurveyQuestionMatrixDropdownRow.prototype.render = function () {
	        if (!this.row) return null;
	        var tds = [];
	        for (var i = 0; i < this.row.cells.length; i++) {
	            var cell = this.row.cells[i];
	            var errors = React.createElement(_reactquestion.SurveyQuestionErrors, { question: cell.question, css: this.rootCss, creator: this.creator });
	            var select = this.renderSelect(cell);
	            tds.push(React.createElement("td", { key: "row" + i }, errors, select));
	        }
	        return React.createElement("tr", null, React.createElement("td", null, this.row.text), tds);
	    };
	    SurveyQuestionMatrixDropdownRow.prototype.renderSelect = function (cell) {
	        return this.creator.createQuestionElement(cell.question);
	    };
	    return SurveyQuestionMatrixDropdownRow;
	}(React.Component);
	_reactquestionfactory.ReactQuestionFactory.Instance.registerQuestion("matrixdropdown", function (props) {
	    return React.createElement(SurveyQuestionMatrixDropdown, props);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyQuestionMatrixRow = exports.SurveyQuestionMatrix = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactquestionfactory = __webpack_require__(41);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyQuestionMatrix = exports.SurveyQuestionMatrix = function (_super) {
	    __extends(SurveyQuestionMatrix, _super);
	    function SurveyQuestionMatrix(props) {
	        _super.call(this, props);
	        this.question = props.question;
	        this.css = props.css;
	    }
	    SurveyQuestionMatrix.prototype.componentWillReceiveProps = function (nextProps) {
	        this.question = nextProps.question;
	        this.css = nextProps.css;
	    };
	    SurveyQuestionMatrix.prototype.render = function () {
	        if (!this.question) return null;
	        var firstTH = this.question.hasRows ? React.createElement("th", null) : null;
	        var headers = [];
	        for (var i = 0; i < this.question.columns.length; i++) {
	            var column = this.question.columns[i];
	            var key = "column" + i;
	            headers.push(React.createElement("th", { key: key }, column.text));
	        }
	        var rows = [];
	        var visibleRows = this.question.visibleRows;
	        for (var i = 0; i < visibleRows.length; i++) {
	            var row = visibleRows[i];
	            var key = "row" + i;
	            rows.push(React.createElement(SurveyQuestionMatrixRow, { key: key, question: this.question, row: row, isFirst: i == 0 }));
	        }
	        return React.createElement("table", { className: this.css.root }, React.createElement("thead", null, React.createElement("tr", null, firstTH, headers)), React.createElement("tbody", null, rows));
	    };
	    return SurveyQuestionMatrix;
	}(React.Component);
	var SurveyQuestionMatrixRow = exports.SurveyQuestionMatrixRow = function (_super) {
	    __extends(SurveyQuestionMatrixRow, _super);
	    function SurveyQuestionMatrixRow(props) {
	        _super.call(this, props);
	        this.question = props.question;
	        this.row = props.row;
	        this.isFirst = props.isFirst;
	        this.handleOnChange = this.handleOnChange.bind(this);
	    }
	    SurveyQuestionMatrixRow.prototype.handleOnChange = function (event) {
	        this.row.value = event.target.value;
	        this.setState({ value: this.row.value });
	    };
	    SurveyQuestionMatrixRow.prototype.componentWillReceiveProps = function (nextProps) {
	        this.question = nextProps.question;
	        this.row = nextProps.row;
	        this.isFirst = nextProps.isFirst;
	    };
	    SurveyQuestionMatrixRow.prototype.render = function () {
	        if (!this.row) return null;
	        var firstTD = this.question.hasRows ? React.createElement("td", null, this.row.text) : null;
	        var tds = [];
	        for (var i = 0; i < this.question.columns.length; i++) {
	            var column = this.question.columns[i];
	            var key = "value" + i;
	            var isChecked = this.row.value == column.value;
	            var inputId = this.isFirst && i == 0 ? this.question.inputId : null;
	            var td = React.createElement("td", { key: key }, React.createElement("input", { id: inputId, type: "radio", name: this.row.fullName, value: column.value, checked: isChecked, onChange: this.handleOnChange }));
	            tds.push(td);
	        }
	        return React.createElement("tr", null, firstTD, tds);
	    };
	    return SurveyQuestionMatrixRow;
	}(React.Component);
	_reactquestionfactory.ReactQuestionFactory.Instance.registerQuestion("matrix", function (props) {
	    return React.createElement(SurveyQuestionMatrix, props);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyQuestionHtml = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactquestionfactory = __webpack_require__(41);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyQuestionHtml = exports.SurveyQuestionHtml = function (_super) {
	    __extends(SurveyQuestionHtml, _super);
	    function SurveyQuestionHtml(props) {
	        _super.call(this, props);
	        this.question = props.question;
	    }
	    SurveyQuestionHtml.prototype.componentWillReceiveProps = function (nextProps) {
	        this.question = nextProps.question;
	    };
	    SurveyQuestionHtml.prototype.render = function () {
	        if (!this.question || !this.question.html) return null;
	        var htmlValue = { __html: this.question.processedHtml };
	        return React.createElement("div", { dangerouslySetInnerHTML: htmlValue });
	    };
	    return SurveyQuestionHtml;
	}(React.Component);
	_reactquestionfactory.ReactQuestionFactory.Instance.registerQuestion("html", function (props) {
	    return React.createElement(SurveyQuestionHtml, props);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyQuestionFile = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactquestionfactory = __webpack_require__(41);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyQuestionFile = exports.SurveyQuestionFile = function (_super) {
	    __extends(SurveyQuestionFile, _super);
	    function SurveyQuestionFile(props) {
	        _super.call(this, props);
	        this.question = props.question;
	        this.css = props.css;
	        this.state = { fileLoaded: 0 };
	        this.handleOnChange = this.handleOnChange.bind(this);
	    }
	    SurveyQuestionFile.prototype.handleOnChange = function (event) {
	        var src = event.target || event.srcElement;
	        if (!window["FileReader"]) return;
	        if (!src || !src.files || src.files.length < 1) return;
	        this.question.loadFile(src.files[0]);
	        this.setState({ fileLoaded: this.state.fileLoaded + 1 });
	    };
	    SurveyQuestionFile.prototype.componentWillReceiveProps = function (nextProps) {
	        this.question = nextProps.question;
	    };
	    SurveyQuestionFile.prototype.render = function () {
	        if (!this.question) return null;
	        var img = this.renderImage();
	        return React.createElement("div", null, React.createElement("input", { id: this.question.inputId, type: "file", onChange: this.handleOnChange }), img);
	    };
	    SurveyQuestionFile.prototype.renderImage = function () {
	        if (!this.question.previewValue) return null;
	        return React.createElement("div", null, "  ", React.createElement("img", { src: this.question.previewValue, height: this.question.imageHeight, width: this.question.imageWidth }));
	    };
	    return SurveyQuestionFile;
	}(React.Component);
	_reactquestionfactory.ReactQuestionFactory.Instance.registerQuestion("file", function (props) {
	    return React.createElement(SurveyQuestionFile, props);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyQuestionMultipleTextItem = exports.SurveyQuestionMultipleText = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactquestionfactory = __webpack_require__(41);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyQuestionMultipleText = exports.SurveyQuestionMultipleText = function (_super) {
	    __extends(SurveyQuestionMultipleText, _super);
	    function SurveyQuestionMultipleText(props) {
	        _super.call(this, props);
	        this.question = props.question;
	        this.css = props.css;
	    }
	    SurveyQuestionMultipleText.prototype.componentWillReceiveProps = function (nextProps) {
	        this.question = nextProps.question;
	        this.css = nextProps.css;
	    };
	    SurveyQuestionMultipleText.prototype.render = function () {
	        if (!this.question) return null;
	        var tableRows = this.question.getRows();
	        var rows = [];
	        for (var i = 0; i < tableRows.length; i++) {
	            rows.push(this.renderRow("item" + i, tableRows[i]));
	        }
	        return React.createElement("table", { className: this.css.root }, React.createElement("tbody", null, rows));
	    };
	    SurveyQuestionMultipleText.prototype.renderRow = function (key, items) {
	        var tds = [];
	        for (var i = 0; i < items.length; i++) {
	            var item = items[i];
	            tds.push(React.createElement("td", { key: "label" + i }, React.createElement("span", { className: this.css.itemTitle }, item.title)));
	            tds.push(React.createElement("td", { key: "value" + i }, this.renderItem(item, i == 0)));
	        }
	        return React.createElement("tr", { key: key }, tds);
	    };
	    SurveyQuestionMultipleText.prototype.renderItem = function (item, isFirst) {
	        var inputId = isFirst ? this.question.inputId : null;
	        return React.createElement(SurveyQuestionMultipleTextItem, { item: item, css: this.css, inputId: inputId });
	    };
	    return SurveyQuestionMultipleText;
	}(React.Component);
	var SurveyQuestionMultipleTextItem = exports.SurveyQuestionMultipleTextItem = function (_super) {
	    __extends(SurveyQuestionMultipleTextItem, _super);
	    function SurveyQuestionMultipleTextItem(props) {
	        _super.call(this, props);
	        this.item = props.item;
	        this.css = props.css;
	        this.inputId = props.inputId;
	        this.state = { value: this.item.value };
	        this.handleOnChange = this.handleOnChange.bind(this);
	    }
	    SurveyQuestionMultipleTextItem.prototype.handleOnChange = function (event) {
	        this.item.value = event.target.value;
	        this.setState({ value: this.item.value });
	    };
	    SurveyQuestionMultipleTextItem.prototype.componentWillReceiveProps = function (nextProps) {
	        this.item = nextProps.item;
	        this.css = nextProps.css;
	    };
	    SurveyQuestionMultipleTextItem.prototype.render = function () {
	        if (!this.item) return null;
	        var style = { float: "left" };
	        return React.createElement("input", { id: this.inputId, className: this.css.itemValue, style: style, type: "text", value: this.state.value, onChange: this.handleOnChange });
	    };
	    Object.defineProperty(SurveyQuestionMultipleTextItem.prototype, "mainClassName", {
	        get: function get() {
	            return "";
	        },
	        enumerable: true,
	        configurable: true
	    });
	    return SurveyQuestionMultipleTextItem;
	}(React.Component);
	_reactquestionfactory.ReactQuestionFactory.Instance.registerQuestion("multipletext", function (props) {
	    return React.createElement(SurveyQuestionMultipleText, props);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyQuestionRadiogroup = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactquestioncomment = __webpack_require__(40);
	
	var _reactquestionfactory = __webpack_require__(41);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyQuestionRadiogroup = exports.SurveyQuestionRadiogroup = function (_super) {
	    __extends(SurveyQuestionRadiogroup, _super);
	    function SurveyQuestionRadiogroup(props) {
	        _super.call(this, props);
	        this.question = props.question;
	        this.css = props.css;
	        this.rootCss = props.rootCss;
	        this.state = { choicesChanged: 0 };
	        var self = this;
	        this.question.choicesChangedCallback = function () {
	            self.state.choicesChanged = self.state.choicesChanged + 1;
	            self.setState(self.state);
	        };
	        this.handleOnChange = this.handleOnChange.bind(this);
	    }
	    SurveyQuestionRadiogroup.prototype.componentWillReceiveProps = function (nextProps) {
	        this.question = nextProps.question;
	        this.css = nextProps.css;
	        this.rootCss = nextProps.rootCss;
	        this.handleOnChange = this.handleOnChange.bind(this);
	    };
	    SurveyQuestionRadiogroup.prototype.handleOnChange = function (event) {
	        this.question.value = event.target.value;
	        this.setState({ value: this.question.value });
	    };
	    SurveyQuestionRadiogroup.prototype.render = function () {
	        if (!this.question) return null;
	        return React.createElement("form", { className: this.css.root }, this.getItems());
	    };
	    SurveyQuestionRadiogroup.prototype.getItems = function () {
	        var items = [];
	        for (var i = 0; i < this.question.visibleChoices.length; i++) {
	            var item = this.question.visibleChoices[i];
	            var key = "item" + i;
	            items.push(this.renderItem(key, item, i == 0));
	        }
	        return items;
	    };
	    Object.defineProperty(SurveyQuestionRadiogroup.prototype, "textStyle", {
	        get: function get() {
	            return { marginLeft: "3px" };
	        },
	        enumerable: true,
	        configurable: true
	    });
	    SurveyQuestionRadiogroup.prototype.renderItem = function (key, item, isFirst) {
	        var itemWidth = this.question.colCount > 0 ? 100 / this.question.colCount + "%" : "";
	        var marginRight = this.question.colCount == 0 ? "5px" : "0px";
	        var divStyle = { marginRight: marginRight };
	        if (itemWidth) {
	            divStyle["width"] = itemWidth;
	        }
	        var isChecked = this.question.value == item.value;
	        var otherItem = isChecked && item.value === this.question.otherItem.value ? this.renderOther() : null;
	        return this.renderRadio(key, item, isChecked, divStyle, otherItem, isFirst);
	    };
	    SurveyQuestionRadiogroup.prototype.renderRadio = function (key, item, isChecked, divStyle, otherItem, isFirst) {
	        var id = isFirst ? this.question.inputId : null;
	        return React.createElement("div", { key: key, className: this.css.item, style: divStyle }, React.createElement("label", { className: this.css.item }, React.createElement("input", { id: id, type: "radio", checked: isChecked, value: item.value, onChange: this.handleOnChange }), React.createElement("span", { style: this.textStyle }, item.text)), otherItem);
	    };
	    SurveyQuestionRadiogroup.prototype.renderOther = function () {
	        return React.createElement("div", { className: this.css.other }, React.createElement(_reactquestioncomment.SurveyQuestionCommentItem, { question: this.question, css: this.rootCss }));
	    };
	    return SurveyQuestionRadiogroup;
	}(React.Component);
	_reactquestionfactory.ReactQuestionFactory.Instance.registerQuestion("radiogroup", function (props) {
	    return React.createElement(SurveyQuestionRadiogroup, props);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyQuestionText = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactquestionfactory = __webpack_require__(41);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyQuestionText = exports.SurveyQuestionText = function (_super) {
	    __extends(SurveyQuestionText, _super);
	    function SurveyQuestionText(props) {
	        _super.call(this, props);
	        this.question = props.question;
	        this.css = props.css;
	        this.state = { value: this.question.value };
	        this.handleOnChange = this.handleOnChange.bind(this);
	    }
	    SurveyQuestionText.prototype.handleOnChange = function (event) {
	        this.question.value = event.target.value;
	        this.setState({ value: this.question.value });
	    };
	    SurveyQuestionText.prototype.componentWillReceiveProps = function (nextProps) {
	        this.question = nextProps.question;
	        this.css = nextProps.css;
	    };
	    SurveyQuestionText.prototype.render = function () {
	        if (!this.question) return null;
	        return React.createElement("input", { id: this.question.inputId, className: this.css, type: this.question.inputType, value: this.question.value || '', size: this.question.size, onChange: this.handleOnChange });
	    };
	    return SurveyQuestionText;
	}(React.Component);
	_reactquestionfactory.ReactQuestionFactory.Instance.registerQuestion("text", function (props) {
	    return React.createElement(SurveyQuestionText, props);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 54 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyQuestionMatrixDynamicRow = exports.SurveyQuestionMatrixDynamic = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactquestion = __webpack_require__(39);
	
	var _reactquestionfactory = __webpack_require__(41);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyQuestionMatrixDynamic = exports.SurveyQuestionMatrixDynamic = function (_super) {
	    __extends(SurveyQuestionMatrixDynamic, _super);
	    function SurveyQuestionMatrixDynamic(props) {
	        _super.call(this, props);
	        this.setProperties(props);
	    }
	    SurveyQuestionMatrixDynamic.prototype.componentWillReceiveProps = function (nextProps) {
	        this.setProperties(nextProps);
	    };
	    SurveyQuestionMatrixDynamic.prototype.setProperties = function (nextProps) {
	        this.question = nextProps.question;
	        this.css = nextProps.css;
	        this.rootCss = nextProps.rootCss;
	        this.creator = nextProps.creator;
	        var self = this;
	        this.state = { rowCounter: 0 };
	        this.question.rowCountChangedCallback = function () {
	            self.state.rowCounter = self.state.rowCounter + 1;
	            self.setState(self.state);
	        };
	        this.handleOnRowAddClick = this.handleOnRowAddClick.bind(this);
	    };
	    SurveyQuestionMatrixDynamic.prototype.handleOnRowAddClick = function (event) {
	        this.question.addRow();
	    };
	    SurveyQuestionMatrixDynamic.prototype.render = function () {
	        if (!this.question) return null;
	        var headers = [];
	        for (var i = 0; i < this.question.columns.length; i++) {
	            var column = this.question.columns[i];
	            var key = "column" + i;
	            var minWidth = this.question.getColumnWidth(column);
	            var columnStyle = minWidth ? { minWidth: minWidth } : {};
	            headers.push(React.createElement("th", { key: key, style: columnStyle }, this.question.getColumnTitle(column)));
	        }
	        var rows = [];
	        var visibleRows = this.question.visibleRows;
	        for (var i = 0; i < visibleRows.length; i++) {
	            var row = visibleRows[i];
	            var key = "row" + i;
	            rows.push(React.createElement(SurveyQuestionMatrixDynamicRow, { key: key, row: row, question: this.question, index: i, css: this.css, rootCss: this.rootCss, creator: this.creator }));
	        }
	        var divStyle = this.question.horizontalScroll ? { overflowX: 'scroll' } : {};
	        return React.createElement("div", null, React.createElement("div", { style: divStyle }, React.createElement("table", { className: this.css.root }, React.createElement("thead", null, React.createElement("tr", null, headers, React.createElement("th", null))), React.createElement("tbody", null, rows))), this.renderAddRowButton());
	    };
	    SurveyQuestionMatrixDynamic.prototype.renderAddRowButton = function () {
	        return React.createElement("input", { className: this.css.button, type: "button", onClick: this.handleOnRowAddClick, value: this.question.addRowText });
	    };
	    return SurveyQuestionMatrixDynamic;
	}(React.Component);
	var SurveyQuestionMatrixDynamicRow = exports.SurveyQuestionMatrixDynamicRow = function (_super) {
	    __extends(SurveyQuestionMatrixDynamicRow, _super);
	    function SurveyQuestionMatrixDynamicRow(props) {
	        _super.call(this, props);
	        this.setProperties(props);
	    }
	    SurveyQuestionMatrixDynamicRow.prototype.componentWillReceiveProps = function (nextProps) {
	        this.setProperties(nextProps);
	    };
	    SurveyQuestionMatrixDynamicRow.prototype.setProperties = function (nextProps) {
	        this.row = nextProps.row;
	        this.question = nextProps.question;
	        this.index = nextProps.index;
	        this.css = nextProps.css;
	        this.rootCss = nextProps.rootCss;
	        this.creator = nextProps.creator;
	        this.handleOnRowRemoveClick = this.handleOnRowRemoveClick.bind(this);
	    };
	    SurveyQuestionMatrixDynamicRow.prototype.handleOnRowRemoveClick = function (event) {
	        this.question.removeRow(this.index);
	    };
	    SurveyQuestionMatrixDynamicRow.prototype.render = function () {
	        if (!this.row) return null;
	        var tds = [];
	        for (var i = 0; i < this.row.cells.length; i++) {
	            var cell = this.row.cells[i];
	            var errors = React.createElement(_reactquestion.SurveyQuestionErrors, { question: cell.question, css: this.rootCss, creator: this.creator });
	            var select = this.renderQuestion(cell);
	            tds.push(React.createElement("td", { key: "row" + i }, errors, select));
	        }
	        var removeButton = this.renderButton();
	        tds.push(React.createElement("td", { key: "row" + this.row.cells.length + 1 }, removeButton));
	        return React.createElement("tr", null, tds);
	    };
	    SurveyQuestionMatrixDynamicRow.prototype.renderQuestion = function (cell) {
	        return this.creator.createQuestionElement(cell.question);
	    };
	    SurveyQuestionMatrixDynamicRow.prototype.renderButton = function () {
	        return React.createElement("input", { className: this.css.button, type: "button", onClick: this.handleOnRowRemoveClick, value: this.question.removeRowText });
	    };
	    return SurveyQuestionMatrixDynamicRow;
	}(React.Component);
	_reactquestionfactory.ReactQuestionFactory.Instance.registerQuestion("matrixdynamic", function (props) {
	    return React.createElement(SurveyQuestionMatrixDynamic, props);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyQuestionRating = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactquestioncomment = __webpack_require__(40);
	
	var _reactquestionfactory = __webpack_require__(41);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyQuestionRating = exports.SurveyQuestionRating = function (_super) {
	    __extends(SurveyQuestionRating, _super);
	    function SurveyQuestionRating(props) {
	        _super.call(this, props);
	        this.question = props.question;
	        this.css = props.css;
	        this.rootCss = props.rootCss;
	        this.handleOnChange = this.handleOnChange.bind(this);
	    }
	    SurveyQuestionRating.prototype.handleOnChange = function (event) {
	        this.question.value = event.target.value;
	        this.setState({ value: this.question.value });
	    };
	    SurveyQuestionRating.prototype.componentWillReceiveProps = function (nextProps) {
	        this.question = nextProps.question;
	        this.css = nextProps.css;
	        this.rootCss = nextProps.rootCss;
	    };
	    SurveyQuestionRating.prototype.render = function () {
	        if (!this.question) return null;
	        var values = [];
	        for (var i = 0; i < this.question.visibleRateValues.length; i++) {
	            var minText = i == 0 ? this.question.mininumRateDescription + " " : null;
	            var maxText = i == this.question.visibleRateValues.length - 1 ? " " + this.question.maximumRateDescription : null;
	            values.push(this.renderItem("value" + i, this.question.visibleRateValues[i], minText, maxText));
	        }
	        var comment = this.question.hasOther ? this.renderOther() : null;
	        return React.createElement("div", { className: this.css.root }, values, comment);
	    };
	    SurveyQuestionRating.prototype.renderItem = function (key, item, minText, maxText) {
	        var isChecked = this.question.value == item.value;
	        var className = this.css.item;
	        if (isChecked) className += " active";
	        var min = minText ? React.createElement("span", null, minText) : null;
	        var max = maxText ? React.createElement("span", null, maxText) : null;
	        return React.createElement("label", { key: key, className: className }, React.createElement("input", { type: "radio", style: { display: "none" }, name: this.question.name, value: item.value, checked: this.question.value == item.value, onChange: this.handleOnChange }), min, React.createElement("span", null, item.text), max);
	    };
	    SurveyQuestionRating.prototype.renderOther = function () {
	        return React.createElement("div", { className: this.css.other }, React.createElement(_reactquestioncomment.SurveyQuestionCommentItem, { question: this.question, css: this.rootCss }));
	    };
	    return SurveyQuestionRating;
	}(React.Component);
	_reactquestionfactory.ReactQuestionFactory.Instance.registerQuestion("rating", function (props) {
	    return React.createElement(SurveyQuestionRating, props);
	});
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 56 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(__extends) {"use strict";
	
	exports.__esModule = true;
	exports.SurveyWindow = undefined;
	
	var _react = __webpack_require__(36);
	
	var React = _interopRequireWildcard(_react);
	
	var _reactSurvey = __webpack_require__(35);
	
	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }
	
	var SurveyWindow = exports.SurveyWindow = function (_super) {
	    __extends(SurveyWindow, _super);
	    function SurveyWindow(props) {
	        _super.call(this, props);
	        this.handleOnExpanded = this.handleOnExpanded.bind(this);
	    }
	    SurveyWindow.prototype.handleOnExpanded = function (event) {
	        this.state.expanded = !this.state.expanded;
	        this.setState(this.state);
	    };
	    SurveyWindow.prototype.render = function () {
	        if (this.state.hidden) return null;
	        var header = this.renderHeader();
	        var body = this.state.expanded ? this.renderBody() : null;
	        var style = { position: "fixed", bottom: "3px", right: "10px" };
	        return React.createElement("div", { className: this.css.window.root, style: style }, header, body);
	    };
	    SurveyWindow.prototype.renderHeader = function () {
	        var styleA = { width: "100%" };
	        var styleTitle = { paddingRight: "10px" };
	        var glyphClassName = this.state.expanded ? this.css.window.header.buttonCollapsed : this.css.window.header.buttonExpanded;
	        glyphClassName = "glyphicon pull-right " + glyphClassName;
	        return React.createElement("div", { className: this.css.window.header.root }, React.createElement("a", { href: "#", onClick: this.handleOnExpanded, style: styleA }, React.createElement("span", { className: this.css.window.header.title, style: styleTitle }, this.title), React.createElement("span", { className: glyphClassName, "aria-hidden": "true" })));
	    };
	    SurveyWindow.prototype.renderBody = function () {
	        return React.createElement("div", { class: this.css.window.body }, this.renderSurvey());
	    };
	    SurveyWindow.prototype.updateSurvey = function (newProps) {
	        _super.prototype.updateSurvey.call(this, newProps);
	        this.title = newProps.title ? newProps.title : this.survey.title;
	        var hasExpanded = newProps["expanded"] ? newProps.expanded : false;
	        this.state = { expanded: hasExpanded, hidden: false };
	        var self = this;
	        this.survey.onComplete.add(function (s) {
	            self.state.hidden = true;
	            self.setState(self.state);
	        });
	    };
	    return SurveyWindow;
	}(_reactSurvey.Survey);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 57 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(58);
	
	__webpack_require__(59);
	
	__webpack_require__(60);
	
	__webpack_require__(61);
	
	__webpack_require__(62);
	
	__webpack_require__(63);
	
	__webpack_require__(64);
	
	__webpack_require__(65);
	
	__webpack_require__(66);

/***/ },
/* 58 */
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
/* 59 */
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
/* 62 */
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
/* 63 */
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
/* 64 */
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
/* 65 */
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
/* 66 */
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

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	__webpack_require__(68);

/***/ },
/* 68 */
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay91bml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uIiwid2VicGFjazovLy93ZWJwYWNrL2Jvb3RzdHJhcCBmNzVkYWY1ZTY5NmMzMzk3YWYxMSIsIndlYnBhY2s6Ly8vLi9zcmMvZW50cmllcy9yZWFjdC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZW50cmllcy9jaHVua3MvbW9kZWwudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3ZhbGlkYXRvci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXh0ZW5kcy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvYmFzZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZXJyb3IudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1cnZleVN0cmluZ3MudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2pzb25vYmplY3QudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Nob2ljZXNSZXN0ZnVsbC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZGl0aW9ucy50cyIsIndlYnBhY2s6Ly8vLi9zcmMvY29uZGl0aW9uc1BhcnNlci50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb25fbWF0cml4ZHJvcGRvd25iYXNlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbi50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb25iYXNlLnRzIiwid2VicGFjazovLy8uL3NyYy90ZXh0UHJlUHJvY2Vzc29yLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9iYXNlc2VsZWN0LnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbmZhY3RvcnkudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX21hdHJpeGRyb3Bkb3duLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9tYXRyaXhkeW5hbWljLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9tYXRyaXgudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX211bHRpcGxldGV4dC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcGFnZS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvcXVlc3Rpb25fY2hlY2tib3gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX2NvbW1lbnQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX2Ryb3Bkb3duLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9maWxlLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9odG1sLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9yYWRpb2dyb3VwLnRzIiwid2VicGFjazovLy8uL3NyYy9xdWVzdGlvbl9yYXRpbmcudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3F1ZXN0aW9uX3RleHQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3N1cnZleS50cyIsIndlYnBhY2s6Ly8vLi9zcmMvZHhTdXJ2ZXlTZXJ2aWNlLnRzIiwid2VicGFjazovLy8uL3NyYy90cmlnZ2VyLnRzIiwid2VicGFjazovLy8uL3NyYy9zdXJ2ZXlXaW5kb3cudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2RlZmF1bHRDc3MvY3Nzc3RhbmRhcmQudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0L3JlYWN0U3VydmV5LnRzeCIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwge1wicm9vdFwiOlwiUmVhY3RcIixcImNvbW1vbmpzMlwiOlwicmVhY3RcIixcImNvbW1vbmpzXCI6XCJyZWFjdFwiLFwiYW1kXCI6XCJyZWFjdFwifSIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QvcmVhY3RzdXJ2ZXltb2RlbC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0L3JlYWN0cGFnZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0L3JlYWN0cXVlc3Rpb24udHN4Iiwid2VicGFjazovLy8uL3NyYy9yZWFjdC9yZWFjdHF1ZXN0aW9uY29tbWVudC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0L3JlYWN0cXVlc3Rpb25mYWN0b3J5LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QvcmVhY3RTdXJ2ZXlOYXZpZ2F0aW9uLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QvcmVhY3RTdXJ2ZXlOYXZpZ2F0aW9uQmFzZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0L3JlYWN0U3VydmV5UHJvZ3Jlc3MudHN4Iiwid2VicGFjazovLy8uL3NyYy9yZWFjdC9yZWFjdHF1ZXN0aW9uY2hlY2tib3gudHN4Iiwid2VicGFjazovLy8uL3NyYy9yZWFjdC9yZWFjdHF1ZXN0aW9uZHJvcGRvd24udHN4Iiwid2VicGFjazovLy8uL3NyYy9yZWFjdC9yZWFjdHF1ZXN0aW9ubWF0cml4ZHJvcGRvd24udHN4Iiwid2VicGFjazovLy8uL3NyYy9yZWFjdC9yZWFjdHF1ZXN0aW9ubWF0cml4LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QvcmVhY3RxdWVzdGlvbmh0bWwudHN4Iiwid2VicGFjazovLy8uL3NyYy9yZWFjdC9yZWFjdHF1ZXN0aW9uZmlsZS50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0L3JlYWN0cXVlc3Rpb25tdWx0aXBsZXRleHQudHN4Iiwid2VicGFjazovLy8uL3NyYy9yZWFjdC9yZWFjdHF1ZXN0aW9ucmFkaW9ncm91cC50c3giLCJ3ZWJwYWNrOi8vLy4vc3JjL3JlYWN0L3JlYWN0cXVlc3Rpb250ZXh0LnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QvcmVhY3RxdWVzdGlvbm1hdHJpeGR5bmFtaWMudHN4Iiwid2VicGFjazovLy8uL3NyYy9yZWFjdC9yZWFjdHF1ZXN0aW9ucmF0aW5nLnRzeCIsIndlYnBhY2s6Ly8vLi9zcmMvcmVhY3QvcmVhY3RTdXJ2ZXlXaW5kb3cudHN4Iiwid2VicGFjazovLy8uL3NyYy9lbnRyaWVzL2NodW5rcy9sb2NhbGl6YXRpb24udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvY2FsaXphdGlvbi9kYW5pc2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvY2FsaXphdGlvbi9kdXRjaC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9jYWxpemF0aW9uL2Zpbm5pc2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvY2FsaXphdGlvbi9mcmVuY2gudHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvY2FsaXphdGlvbi9nZXJtYW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvY2FsaXphdGlvbi9ncmVlay50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9jYWxpemF0aW9uL3BvbGlzaC50cyIsIndlYnBhY2s6Ly8vLi9zcmMvbG9jYWxpemF0aW9uL3J1c3NpYW4udHMiLCJ3ZWJwYWNrOi8vLy4vc3JjL2xvY2FsaXphdGlvbi90dXJraXNoLnRzIiwid2VicGFjazovLy8uL3NyYy9lbnRyaWVzL2NodW5rcy9jc3NGcmFtZXdvcmtzLnRzIiwid2VicGFjazovLy8uL3NyYy9kZWZhdWx0Q3NzL2Nzc2Jvb3RzdHJhcC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxDQUFDO0FBQ0QsTztBQ1ZBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLHVCQUFlO0FBQ2Y7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7O0FDckMrQjs7Ozs7Ozs7Ozs7Ozs7O3lCQU04Qjs7Ozs7Ozs7O3lCQU03RDs7Ozs7Ozs7OzhCQUNBOzs7Ozs7OEJBQ0E7Ozs7Ozs7Ozt1Q0FDQTs7Ozs7Ozs7O21DQUNBOzs7Ozs7Ozs7dUJBQWtCOzs7Ozs7dUJBQ2xCOzs7Ozs7Ozs7MkJBQXNCOzs7Ozs7MkJBQ3RCOzs7Ozs7Ozs7a0NBQWlDOzs7Ozs7a0NBQ2pDOzs7Ozs7Ozs7bUNBQThCOzs7Ozs7bUNBQzlCOzs7Ozs7Ozs7bUNBQ0E7Ozs7Ozs7Ozt5Q0FBb0M7Ozs7Ozt5Q0FDcEM7Ozs7Ozs7OztpQ0FBNEI7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dUIsb0IiLCJmaWxlIjoic3VydmV5LnJlYWN0LmpzIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIHdlYnBhY2tVbml2ZXJzYWxNb2R1bGVEZWZpbml0aW9uKHJvb3QsIGZhY3RvcnkpIHtcblx0aWYodHlwZW9mIGV4cG9ydHMgPT09ICdvYmplY3QnICYmIHR5cGVvZiBtb2R1bGUgPT09ICdvYmplY3QnKVxuXHRcdG1vZHVsZS5leHBvcnRzID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlIGlmKHR5cGVvZiBkZWZpbmUgPT09ICdmdW5jdGlvbicgJiYgZGVmaW5lLmFtZClcblx0XHRkZWZpbmUoXCJTdXJ2ZXlcIiwgW1wicmVhY3RcIl0sIGZhY3RvcnkpO1xuXHRlbHNlIGlmKHR5cGVvZiBleHBvcnRzID09PSAnb2JqZWN0Jylcblx0XHRleHBvcnRzW1wiU3VydmV5XCJdID0gZmFjdG9yeShyZXF1aXJlKFwicmVhY3RcIikpO1xuXHRlbHNlXG5cdFx0cm9vdFtcIlN1cnZleVwiXSA9IGZhY3Rvcnkocm9vdFtcIlJlYWN0XCJdKTtcbn0pKHRoaXMsIGZ1bmN0aW9uKF9fV0VCUEFDS19FWFRFUk5BTF9NT0RVTEVfMzZfXykge1xucmV0dXJuIFxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIHdlYnBhY2svdW5pdmVyc2FsTW9kdWxlRGVmaW5pdGlvblxuICoqLyIsIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKVxuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuXG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRleHBvcnRzOiB7fSxcbiBcdFx0XHRpZDogbW9kdWxlSWQsXG4gXHRcdFx0bG9hZGVkOiBmYWxzZVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sb2FkZWQgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKDApO1xuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogd2VicGFjay9ib290c3RyYXAgZjc1ZGFmNWU2OTZjMzM5N2FmMTFcbiAqKi8iLCIvLyBtb2RlbFxyXG5leHBvcnQgKiBmcm9tIFwiLi9jaHVua3MvbW9kZWxcIjtcclxuXHJcbi8vIGxvY2FsaXphdGlvblxyXG5pbXBvcnQgJy4vY2h1bmtzL2xvY2FsaXphdGlvbic7XHJcblxyXG4vLyBjc3Mgc3RhbmRhcmRcclxuZXhwb3J0IHtkZWZhdWx0U3RhbmRhcmRDc3N9IGZyb20gXCIuLi9kZWZhdWx0Q3NzL2Nzc3N0YW5kYXJkXCI7XHJcbi8vY3NzIGZyYW1ld29ya3NcclxuaW1wb3J0ICcuL2NodW5rcy9jc3NGcmFtZXdvcmtzJztcclxuXHJcbi8vIHJlYWN0XHJcbmV4cG9ydCB7U3VydmV5fSBmcm9tIFwiLi4vcmVhY3QvcmVhY3RTdXJ2ZXlcIjtcclxuZXhwb3J0IHtSZWFjdFN1cnZleU1vZGVsfSBmcm9tIFwiLi4vcmVhY3QvcmVhY3RzdXJ2ZXltb2RlbFwiOyAvLyBUT0RPIG5lZWQgdG8gcmVtb3ZlIHNvbWVkYXlcclxuZXhwb3J0IHtSZWFjdFN1cnZleU1vZGVsIGFzIE1vZGVsfSBmcm9tIFwiLi4vcmVhY3QvcmVhY3RzdXJ2ZXltb2RlbFwiO1xyXG5leHBvcnQge1N1cnZleU5hdmlnYXRpb25CYXNlfSBmcm9tIFwiLi4vcmVhY3QvcmVhY3RTdXJ2ZXlOYXZpZ2F0aW9uQmFzZVwiO1xyXG5leHBvcnQge1N1cnZleU5hdmlnYXRpb259IGZyb20gXCIuLi9yZWFjdC9yZWFjdFN1cnZleU5hdmlnYXRpb25cIjtcclxuZXhwb3J0IHtTdXJ2ZXlQYWdlLCBTdXJ2ZXlSb3d9IGZyb20gXCIuLi9yZWFjdC9yZWFjdHBhZ2VcIjtcclxuZXhwb3J0IHtTdXJ2ZXlRdWVzdGlvbiwgIFN1cnZleVF1ZXN0aW9uRXJyb3JzfSBmcm9tIFwiLi4vcmVhY3QvcmVhY3RxdWVzdGlvblwiO1xyXG5leHBvcnQge1N1cnZleVF1ZXN0aW9uQ29tbWVudEl0ZW0sIFN1cnZleVF1ZXN0aW9uQ29tbWVudH0gZnJvbSBcIi4uL3JlYWN0L3JlYWN0cXVlc3Rpb25jb21tZW50XCI7XHJcbmV4cG9ydCB7U3VydmV5UXVlc3Rpb25DaGVja2JveCwgU3VydmV5UXVlc3Rpb25DaGVja2JveEl0ZW19IGZyb20gXCIuLi9yZWFjdC9yZWFjdHF1ZXN0aW9uY2hlY2tib3hcIjtcclxuZXhwb3J0IHtTdXJ2ZXlRdWVzdGlvbkRyb3Bkb3dufSBmcm9tIFwiLi4vcmVhY3QvcmVhY3RxdWVzdGlvbmRyb3Bkb3duXCI7XHJcbmV4cG9ydCB7U3VydmV5UXVlc3Rpb25NYXRyaXhEcm9wZG93biwgU3VydmV5UXVlc3Rpb25NYXRyaXhEcm9wZG93blJvd30gZnJvbSBcIi4uL3JlYWN0L3JlYWN0cXVlc3Rpb25tYXRyaXhkcm9wZG93blwiO1xyXG5leHBvcnQge1N1cnZleVF1ZXN0aW9uTWF0cml4LCBTdXJ2ZXlRdWVzdGlvbk1hdHJpeFJvd30gZnJvbSBcIi4uL3JlYWN0L3JlYWN0cXVlc3Rpb25tYXRyaXhcIjtcclxuZXhwb3J0IHtTdXJ2ZXlRdWVzdGlvbkh0bWx9IGZyb20gXCIuLi9yZWFjdC9yZWFjdHF1ZXN0aW9uaHRtbFwiO1xyXG5leHBvcnQge1N1cnZleVF1ZXN0aW9uRmlsZX0gZnJvbSBcIi4uL3JlYWN0L3JlYWN0cXVlc3Rpb25maWxlXCI7XHJcbmV4cG9ydCB7U3VydmV5UXVlc3Rpb25NdWx0aXBsZVRleHQsIFN1cnZleVF1ZXN0aW9uTXVsdGlwbGVUZXh0SXRlbX0gZnJvbSBcIi4uL3JlYWN0L3JlYWN0cXVlc3Rpb25tdWx0aXBsZXRleHRcIjtcclxuZXhwb3J0IHtTdXJ2ZXlRdWVzdGlvblJhZGlvZ3JvdXB9IGZyb20gXCIuLi9yZWFjdC9yZWFjdHF1ZXN0aW9ucmFkaW9ncm91cFwiO1xyXG5leHBvcnQge1N1cnZleVF1ZXN0aW9uVGV4dH0gZnJvbSBcIi4uL3JlYWN0L3JlYWN0cXVlc3Rpb250ZXh0XCI7XHJcbmV4cG9ydCB7U3VydmV5UXVlc3Rpb25NYXRyaXhEeW5hbWljLCBTdXJ2ZXlRdWVzdGlvbk1hdHJpeER5bmFtaWNSb3d9IGZyb20gXCIuLi9yZWFjdC9yZWFjdHF1ZXN0aW9ubWF0cml4ZHluYW1pY1wiO1xyXG5leHBvcnQge1N1cnZleVByb2dyZXNzfSBmcm9tIFwiLi4vcmVhY3QvcmVhY3RTdXJ2ZXlQcm9ncmVzc1wiO1xyXG5leHBvcnQge1N1cnZleVF1ZXN0aW9uUmF0aW5nfSBmcm9tIFwiLi4vcmVhY3QvcmVhY3RxdWVzdGlvbnJhdGluZ1wiO1xyXG5leHBvcnQge1N1cnZleVdpbmRvd30gZnJvbSBcIi4uL3JlYWN0L3JlYWN0U3VydmV5V2luZG93XCI7XHJcbmV4cG9ydCB7UmVhY3RRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuLi9yZWFjdC9yZWFjdHF1ZXN0aW9uZmFjdG9yeVwiOyAvLyBUT0RPIG5lZWQgdG8gcmVtb3ZlIHNvbWVkYXlcclxuZXhwb3J0IHtSZWFjdFF1ZXN0aW9uRmFjdG9yeSBhcyBRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuLi9yZWFjdC9yZWFjdHF1ZXN0aW9uZmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IHtfX2V4dGVuZHN9IGZyb20gXCIuLi9leHRlbmRzXCI7XHJcblxyXG4vL1VuY29tbWVudCB0byBpbmNsdWRlIHRoZSBcImRhdGVcIiBxdWVzdGlvbiB0eXBlLlxyXG4vL2V4cG9ydCB7ZGVmYXVsdCBhcyBTdXJ2ZXlRdWVzdGlvbkRhdGV9IGZyb20gXCIuLi9wbHVnaW5zL3JlYWN0L3JlYWN0cXVlc3Rpb25kYXRlXCI7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZW50cmllcy9yZWFjdC50c1xuICoqLyIsImV4cG9ydCB7XHJcbiAgICBBbnN3ZXJDb3VudFZhbGlkYXRvciwgRW1haWxWYWxpZGF0b3IsIE51bWVyaWNWYWxpZGF0b3IsIFJlZ2V4VmFsaWRhdG9yLFxyXG4gICAgU3VydmV5VmFsaWRhdG9yLCBUZXh0VmFsaWRhdG9yLCBWYWxpZGF0b3JSZXN1bHQsIFZhbGlkYXRvclJ1bm5lclxyXG59IGZyb20gXCIuLi8uLi92YWxpZGF0b3JcIjtcclxuZXhwb3J0IHtCYXNlLCBFdmVudCwgSXRlbVZhbHVlLCBTdXJ2ZXlFcnJvciwgSVN1cnZleX0gZnJvbSBcIi4uLy4uL2Jhc2VcIjtcclxuZXhwb3J0IHtDaG9pY2VzUmVzdGZ1bGx9IGZyb20gXCIuLi8uLi9jaG9pY2VzUmVzdGZ1bGxcIjtcclxuZXhwb3J0IHtDb25kaXRpb24sIENvbmRpdGlvbk5vZGUsIENvbmRpdGlvblJ1bm5lcn0gZnJvbSBcIi4uLy4uL2NvbmRpdGlvbnNcIjtcclxuZXhwb3J0IHtDb25kaXRpb25zUGFyc2VyfSBmcm9tIFwiLi4vLi4vY29uZGl0aW9uc1BhcnNlclwiO1xyXG5leHBvcnQge0N1c3RvbUVycm9yLCBFeGNlZWRTaXplRXJyb3IsIFJlcXVyZU51bWVyaWNFcnJvcn0gZnJvbSBcIi4uLy4uL2Vycm9yXCI7XHJcbmV4cG9ydCB7XHJcbiAgICBKc29uRXJyb3IsIEpzb25JbmNvcnJlY3RUeXBlRXJyb3IsIEpzb25NZXRhZGF0YSwgSnNvbk1ldGFkYXRhQ2xhc3MsXHJcbiAgICBKc29uTWlzc2luZ1R5cGVFcnJvciwgSnNvbk1pc3NpbmdUeXBlRXJyb3JCYXNlLCBKc29uT2JqZWN0LCBKc29uT2JqZWN0UHJvcGVydHksXHJcbiAgICBKc29uUmVxdWlyZWRQcm9wZXJ0eUVycm9yLCBKc29uVW5rbm93blByb3BlcnR5RXJyb3JcclxufSBmcm9tIFwiLi4vLi4vanNvbm9iamVjdFwiO1xyXG5leHBvcnQge1xyXG4gICAgTWF0cml4RHJvcGRvd25DZWxsLCBNYXRyaXhEcm9wZG93bkNvbHVtbiwgTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UsXHJcbiAgICBRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWxCYXNlXHJcbn0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX21hdHJpeGRyb3Bkb3duYmFzZVwiO1xyXG5leHBvcnQge01hdHJpeERyb3Bkb3duUm93TW9kZWwsIFF1ZXN0aW9uTWF0cml4RHJvcGRvd25Nb2RlbH0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX21hdHJpeGRyb3Bkb3duXCI7XHJcbmV4cG9ydCB7TWF0cml4RHluYW1pY1Jvd01vZGVsLCBRdWVzdGlvbk1hdHJpeER5bmFtaWNNb2RlbH0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX21hdHJpeGR5bmFtaWNcIjtcclxuZXhwb3J0IHtNYXRyaXhSb3dNb2RlbCwgUXVlc3Rpb25NYXRyaXhNb2RlbH0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX21hdHJpeFwiO1xyXG5leHBvcnQge011bHRpcGxlVGV4dEl0ZW1Nb2RlbCwgUXVlc3Rpb25NdWx0aXBsZVRleHRNb2RlbH0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX211bHRpcGxldGV4dFwiO1xyXG5leHBvcnQge1BhZ2VNb2RlbCwgUXVlc3Rpb25Sb3dNb2RlbH0gZnJvbSBcIi4uLy4uL3BhZ2VcIjtcclxuZXhwb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uXCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25CYXNlfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25iYXNlXCI7XHJcbmV4cG9ydCB7UXVlc3Rpb25DaGVja2JveEJhc2UsIFF1ZXN0aW9uU2VsZWN0QmFzZX0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX2Jhc2VzZWxlY3RcIjtcclxuZXhwb3J0IHtRdWVzdGlvbkNoZWNrYm94TW9kZWx9IGZyb20gXCIuLi8uLi9xdWVzdGlvbl9jaGVja2JveFwiO1xyXG5leHBvcnQge1F1ZXN0aW9uQ29tbWVudE1vZGVsfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25fY29tbWVudFwiO1xyXG5leHBvcnQgeyBRdWVzdGlvbkRyb3Bkb3duTW9kZWx9IGZyb20gXCIuLi8uLi9xdWVzdGlvbl9kcm9wZG93blwiO1xyXG5leHBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5leHBvcnQge1F1ZXN0aW9uRmlsZU1vZGVsfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25fZmlsZVwiO1xyXG5leHBvcnQge1F1ZXN0aW9uSHRtbE1vZGVsfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25faHRtbFwiO1xyXG5leHBvcnQge1F1ZXN0aW9uUmFkaW9ncm91cE1vZGVsfSBmcm9tIFwiLi4vLi4vcXVlc3Rpb25fcmFkaW9ncm91cFwiO1xyXG5leHBvcnQge1F1ZXN0aW9uUmF0aW5nTW9kZWx9IGZyb20gXCIuLi8uLi9xdWVzdGlvbl9yYXRpbmdcIjtcclxuZXhwb3J0IHtRdWVzdGlvblRleHRNb2RlbH0gZnJvbSBcIi4uLy4uL3F1ZXN0aW9uX3RleHRcIjtcclxuZXhwb3J0IHtTdXJ2ZXlNb2RlbH0gZnJvbSBcIi4uLy4uL3N1cnZleVwiO1xyXG5leHBvcnQge1xyXG4gICAgU3VydmV5VHJpZ2dlciwgU3VydmV5VHJpZ2dlckNvbXBsZXRlLCBTdXJ2ZXlUcmlnZ2VyU2V0VmFsdWUsIFN1cnZleVRyaWdnZXJWaXNpYmxlLFxyXG4gICAgVHJpZ2dlclxyXG59IGZyb20gXCIuLi8uLi90cmlnZ2VyXCI7XHJcbmV4cG9ydCB7U3VydmV5V2luZG93TW9kZWx9IGZyb20gXCIuLi8uLi9zdXJ2ZXlXaW5kb3dcIjtcclxuZXhwb3J0IHtUZXh0UHJlUHJvY2Vzc29yfSBmcm9tIFwiLi4vLi4vdGV4dFByZVByb2Nlc3NvclwiO1xyXG5cclxuZXhwb3J0IHtkeFN1cnZleVNlcnZpY2V9IGZyb20gXCIuLi8uLi9keFN1cnZleVNlcnZpY2VcIjtcclxuZXhwb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb24sIHN1cnZleVN0cmluZ3N9IGZyb20gXCIuLi8uLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcblxyXG4vL1VuY29tbWVudCB0byBpbmNsdWRlIHRoZSBcImRhdGVcIiBxdWVzdGlvbiB0eXBlLlxyXG4vL2V4cG9ydCB7ZGVmYXVsdCBhcyBRdWVzdGlvbkRhdGVNb2RlbH0gZnJvbSBcIi4uLy4uL3BsdWdpbnMvcXVlc3Rpb25fZGF0ZVwiO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2VudHJpZXMvY2h1bmtzL21vZGVsLnRzXG4gKiovIiwiaW1wb3J0IHtCYXNlLCBTdXJ2ZXlFcnJvcn0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQge0N1c3RvbUVycm9yLCBSZXF1cmVOdW1lcmljRXJyb3J9IGZyb20gXCIuL2Vycm9yXCI7XHJcbmltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tIFwiLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSAnLi9qc29ub2JqZWN0JztcclxuXHJcbmV4cG9ydCBjbGFzcyBWYWxpZGF0b3JSZXN1bHQge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIHZhbHVlOiBhbnksIHB1YmxpYyBlcnJvcjogU3VydmV5RXJyb3IgPSBudWxsKSB7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlWYWxpZGF0b3IgZXh0ZW5kcyBCYXNlIHtcclxuICAgIHB1YmxpYyB0ZXh0OiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXRFcnJvclRleHQobmFtZTogc3RyaW5nKSA6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMudGV4dCkgcmV0dXJuIHRoaXMudGV4dDtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXREZWZhdWx0RXJyb3JUZXh0KG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldERlZmF1bHRFcnJvclRleHQobmFtZTogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyB2YWxpZGF0ZSh2YWx1ZTogYW55LCBuYW1lOiBzdHJpbmcgPSBudWxsKTogVmFsaWRhdG9yUmVzdWx0IHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxufVxyXG5leHBvcnQgaW50ZXJmYWNlIElWYWxpZGF0b3JPd25lciB7XHJcbiAgICB2YWxpZGF0b3JzOiBBcnJheTxTdXJ2ZXlWYWxpZGF0b3I+O1xyXG4gICAgdmFsdWU6IGFueTtcclxuICAgIGdldFZhbGlkYXRvclRpdGxlKCk6IHN0cmluZztcclxufVxyXG5leHBvcnQgY2xhc3MgVmFsaWRhdG9yUnVubmVyIHtcclxuICAgIHB1YmxpYyBydW4ob3duZXI6IElWYWxpZGF0b3JPd25lcik6IFN1cnZleUVycm9yIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG93bmVyLnZhbGlkYXRvcnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHZhbGlkYXRvclJlc3VsdCA9IG93bmVyLnZhbGlkYXRvcnNbaV0udmFsaWRhdGUob3duZXIudmFsdWUsIG93bmVyLmdldFZhbGlkYXRvclRpdGxlKCkpO1xyXG4gICAgICAgICAgICBpZiAodmFsaWRhdG9yUmVzdWx0ICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIGlmICh2YWxpZGF0b3JSZXN1bHQuZXJyb3IpIHJldHVybiB2YWxpZGF0b3JSZXN1bHQuZXJyb3I7XHJcbiAgICAgICAgICAgICAgICBpZiAodmFsaWRhdG9yUmVzdWx0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgb3duZXIudmFsdWUgPSB2YWxpZGF0b3JSZXN1bHQudmFsdWU7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBOdW1lcmljVmFsaWRhdG9yIGV4dGVuZHMgU3VydmV5VmFsaWRhdG9yIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBtaW5WYWx1ZTogbnVtYmVyID0gbnVsbCwgcHVibGljIG1heFZhbHVlOiBudW1iZXIgPSBudWxsKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7IHJldHVybiBcIm51bWVyaWN2YWxpZGF0b3JcIjsgfVxyXG4gICAgcHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIG5hbWU6IHN0cmluZyA9IG51bGwpOiBWYWxpZGF0b3JSZXN1bHQge1xyXG4gICAgICAgIGlmICghdmFsdWUgfHwgIXRoaXMuaXNOdW1iZXIodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmFsaWRhdG9yUmVzdWx0KG51bGwsIG5ldyBSZXF1cmVOdW1lcmljRXJyb3IoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgVmFsaWRhdG9yUmVzdWx0KHBhcnNlRmxvYXQodmFsdWUpKTtcclxuICAgICAgICBpZiAodGhpcy5taW5WYWx1ZSAmJiB0aGlzLm1pblZhbHVlID4gcmVzdWx0LnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5lcnJvciA9IG5ldyBDdXN0b21FcnJvcih0aGlzLmdldEVycm9yVGV4dChuYW1lKSk7XHJcbiAgICAgICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLm1heFZhbHVlICYmIHRoaXMubWF4VmFsdWUgPCByZXN1bHQudmFsdWUpIHtcclxuICAgICAgICAgICAgcmVzdWx0LmVycm9yID0gbmV3IEN1c3RvbUVycm9yKHRoaXMuZ2V0RXJyb3JUZXh0KG5hbWUpKTtcclxuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICh0eXBlb2YgdmFsdWUgPT09ICdudW1iZXInKSA/IG51bGwgOiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0RGVmYXVsdEVycm9yVGV4dChuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgdk5hbWUgPSBuYW1lID8gbmFtZSA6IFwidmFsdWVcIjtcclxuICAgICAgICBpZiAodGhpcy5taW5WYWx1ZSAmJiB0aGlzLm1heFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwibnVtZXJpY01pbk1heFwiKVtcImZvcm1hdFwiXSh2TmFtZSwgdGhpcy5taW5WYWx1ZSwgdGhpcy5tYXhWYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMubWluVmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHJldHVybiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwibnVtZXJpY01pblwiKVtcImZvcm1hdFwiXSh2TmFtZSwgdGhpcy5taW5WYWx1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJudW1lcmljTWF4XCIpW1wiZm9ybWF0XCJdKHZOYW1lLCB0aGlzLm1heFZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzTnVtYmVyKHZhbHVlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICFpc05hTihwYXJzZUZsb2F0KHZhbHVlKSkgJiYgaXNGaW5pdGUodmFsdWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgVGV4dFZhbGlkYXRvciBleHRlbmRzIFN1cnZleVZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbWluTGVuZ3RoOiBudW1iZXIgPSAwKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7IHJldHVybiBcInRleHR2YWxpZGF0b3JcIjsgfVxyXG4gICAgcHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIG5hbWU6IHN0cmluZyA9IG51bGwpOiBWYWxpZGF0b3JSZXN1bHQge1xyXG4gICAgICAgIGlmICh0aGlzLm1pbkxlbmd0aCA8PSAwKSByZXR1cm47XHJcbiAgICAgICAgaWYgKHZhbHVlLmxlbmd0aCA8IHRoaXMubWluTGVuZ3RoKSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmFsaWRhdG9yUmVzdWx0KG51bGwsIG5ldyBDdXN0b21FcnJvcih0aGlzLmdldEVycm9yVGV4dChuYW1lKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXREZWZhdWx0RXJyb3JUZXh0KG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwidGV4dE1pbkxlbmd0aFwiKVtcImZvcm1hdFwiXSh0aGlzLm1pbkxlbmd0aCk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBBbnN3ZXJDb3VudFZhbGlkYXRvciBleHRlbmRzIFN1cnZleVZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbWluQ291bnQ6IG51bWJlciA9IG51bGwsIHB1YmxpYyBtYXhDb3VudDogbnVtYmVyID0gbnVsbCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJhbnN3ZXJjb3VudHZhbGlkYXRvclwiOyB9XHJcbiAgICBwdWJsaWMgdmFsaWRhdGUodmFsdWU6IGFueSwgbmFtZTogc3RyaW5nID0gbnVsbCk6IFZhbGlkYXRvclJlc3VsdCB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwgfHwgdmFsdWUuY29uc3RydWN0b3IgIT0gQXJyYXkpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciBjb3VudCA9IHZhbHVlLmxlbmd0aDtcclxuICAgICAgICBpZiAodGhpcy5taW5Db3VudCAmJiBjb3VudCA8IHRoaXMubWluQ291bnQpIHtcclxuICAgICAgICAgICAgcmV0dXJuIG5ldyBWYWxpZGF0b3JSZXN1bHQobnVsbCwgbmV3IEN1c3RvbUVycm9yKHRoaXMuZ2V0RXJyb3JUZXh0KHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJtaW5TZWxlY3RFcnJvclwiKVtcImZvcm1hdFwiXSh0aGlzLm1pbkNvdW50KSkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMubWF4Q291bnQgJiYgY291bnQgPiB0aGlzLm1heENvdW50KSB7XHJcbiAgICAgICAgICAgIHJldHVybiBuZXcgVmFsaWRhdG9yUmVzdWx0KG51bGwsIG5ldyBDdXN0b21FcnJvcih0aGlzLmdldEVycm9yVGV4dChzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwibWF4U2VsZWN0RXJyb3JcIilbXCJmb3JtYXRcIl0odGhpcy5tYXhDb3VudCkpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldERlZmF1bHRFcnJvclRleHQobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIG5hbWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBSZWdleFZhbGlkYXRvciBleHRlbmRzIFN1cnZleVZhbGlkYXRvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcmVnZXg6IHN0cmluZyA9IG51bGwpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIFwicmVnZXh2YWxpZGF0b3JcIjsgfVxyXG4gICAgcHVibGljIHZhbGlkYXRlKHZhbHVlOiBhbnksIG5hbWU6IHN0cmluZyA9IG51bGwpOiBWYWxpZGF0b3JSZXN1bHQge1xyXG4gICAgICAgIGlmICghdGhpcy5yZWdleCB8fCAhdmFsdWUpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciByZSA9IG5ldyBSZWdFeHAodGhpcy5yZWdleCk7XHJcbiAgICAgICAgaWYgKHJlLnRlc3QodmFsdWUpKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gbmV3IFZhbGlkYXRvclJlc3VsdCh2YWx1ZSwgbmV3IEN1c3RvbUVycm9yKHRoaXMuZ2V0RXJyb3JUZXh0KG5hbWUpKSk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIEVtYWlsVmFsaWRhdG9yIGV4dGVuZHMgU3VydmV5VmFsaWRhdG9yIHtcclxuICAgIHByaXZhdGUgcmUgPSAvXigoW148PigpXFxbXFxdXFwuLDs6XFxzQFxcXCJdKyhcXC5bXjw+KClcXFtcXF1cXC4sOzpcXHNAXFxcIl0rKSopfChcXFwiLitcXFwiKSlAKChbXjw+KClbXFxdXFwuLDs6XFxzQFxcXCJdK1xcLikrW148PigpW1xcXVxcLiw7Olxcc0BcXFwiXXsyLH0pJC9pO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7IHJldHVybiBcImVtYWlsdmFsaWRhdG9yXCI7IH1cclxuICAgIHB1YmxpYyB2YWxpZGF0ZSh2YWx1ZTogYW55LCBuYW1lOiBzdHJpbmcgPSBudWxsKTogVmFsaWRhdG9yUmVzdWx0IHtcclxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5yZS50ZXN0KHZhbHVlKSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBWYWxpZGF0b3JSZXN1bHQodmFsdWUsIG5ldyBDdXN0b21FcnJvcih0aGlzLmdldEVycm9yVGV4dChuYW1lKSkpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldERlZmF1bHRFcnJvclRleHQobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgcmV0dXJuIHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJpbnZhbGlkRW1haWxcIik7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJzdXJ2ZXl2YWxpZGF0b3JcIiwgW1widGV4dFwiXSk7XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJudW1lcmljdmFsaWRhdG9yXCIsIFtcIm1pblZhbHVlOm51bWJlclwiLCBcIm1heFZhbHVlOm51bWJlclwiXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE51bWVyaWNWYWxpZGF0b3IoKTsgfSwgXCJzdXJ2ZXl2YWxpZGF0b3JcIik7XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJ0ZXh0dmFsaWRhdG9yXCIsIFtcIm1pbkxlbmd0aDpudW1iZXJcIl0sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBUZXh0VmFsaWRhdG9yKCk7IH0sIFwic3VydmV5dmFsaWRhdG9yXCIpO1xyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwiYW5zd2VyY291bnR2YWxpZGF0b3JcIiwgW1wibWluQ291bnQ6bnVtYmVyXCIsIFwibWF4Q291bnQ6bnVtYmVyXCJdLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgQW5zd2VyQ291bnRWYWxpZGF0b3IoKTsgfSwgXCJzdXJ2ZXl2YWxpZGF0b3JcIik7XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJyZWdleHZhbGlkYXRvclwiLCBbXCJyZWdleFwiXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFJlZ2V4VmFsaWRhdG9yKCk7IH0sIFwic3VydmV5dmFsaWRhdG9yXCIpO1xyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwiZW1haWx2YWxpZGF0b3JcIiwgW10sIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBFbWFpbFZhbGlkYXRvcigpOyB9LCBcInN1cnZleXZhbGlkYXRvclwiKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy92YWxpZGF0b3IudHNcbiAqKi8iLCJleHBvcnQgZnVuY3Rpb24gX19leHRlbmRzIChkLCBiKSB7XHJcbiAgICBmb3IgKHZhciBwIGluIGIpIGlmIChiLmhhc093blByb3BlcnR5KHApKSBkW3BdID0gYltwXTtcclxuICAgIGZ1bmN0aW9uIF9fKCkgeyB0aGlzLmNvbnN0cnVjdG9yID0gZDsgfVxyXG4gICAgZC5wcm90b3R5cGUgPSBiID09PSBudWxsID8gT2JqZWN0LmNyZWF0ZShiKSA6IChfXy5wcm90b3R5cGUgPSBiLnByb3RvdHlwZSwgbmV3IF9fKCkpO1xyXG59XHJcblxyXG5pZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcclxuICAgIGV4cG9ydHMgPSBtb2R1bGUuZXhwb3J0cyA9IF9fZXh0ZW5kcztcclxufVxyXG5cclxuZXhwb3J0cy5fX2V4dGVuZHMgPSBfX2V4dGVuZHM7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZXh0ZW5kcy50c1xuICoqLyIsImV4cG9ydCBpbnRlcmZhY2UgSGFzaFRhYmxlPFQ+IHtcclxuICAgIFtrZXk6IHN0cmluZ106IFQ7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJU3VydmV5RGF0YSB7XHJcbiAgICBnZXRWYWx1ZShuYW1lOiBzdHJpbmcpOiBhbnk7XHJcbiAgICBzZXRWYWx1ZShuYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBhbnkpO1xyXG4gICAgZ2V0Q29tbWVudChuYW1lOiBzdHJpbmcpOiBzdHJpbmc7XHJcbiAgICBzZXRDb21tZW50KG5hbWU6IHN0cmluZywgbmV3VmFsdWU6IHN0cmluZyk7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJU3VydmV5IGV4dGVuZHMgSVN1cnZleURhdGEge1xyXG4gICAgY3VycmVudFBhZ2U6IElQYWdlO1xyXG4gICAgcGFnZVZpc2liaWxpdHlDaGFuZ2VkKHBhZ2U6IElQYWdlLCBuZXdWYWx1ZTogYm9vbGVhbik7XHJcbiAgICBxdWVzdGlvblZpc2liaWxpdHlDaGFuZ2VkKHF1ZXN0aW9uOiBJUXVlc3Rpb24sIG5ld1ZhbHVlOiBib29sZWFuKTtcclxuICAgIHF1ZXN0aW9uQWRkZWQocXVlc3Rpb246IElRdWVzdGlvbiwgaW5kZXg6IG51bWJlcik7XHJcbiAgICBxdWVzdGlvblJlbW92ZWQocXVlc3Rpb246IElRdWVzdGlvbik7XHJcbiAgICB2YWxpZGF0ZVF1ZXN0aW9uKG5hbWU6IHN0cmluZyk6IFN1cnZleUVycm9yO1xyXG4gICAgcHJvY2Vzc0h0bWwoaHRtbDogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgcHJvY2Vzc1RleHQodGV4dDogc3RyaW5nKTogc3RyaW5nO1xyXG4gICAgaXNEZXNpZ25Nb2RlOiBib29sZWFuO1xyXG4gICAgcmVxdWlyZWRUZXh0OiBzdHJpbmc7XHJcbiAgICBxdWVzdGlvblN0YXJ0SW5kZXg6IHN0cmluZztcclxuICAgIHF1ZXN0aW9uVGl0bGVUZW1wbGF0ZTogc3RyaW5nO1xyXG4gICAgc3RvcmVPdGhlcnNBc0NvbW1lbnQ6IGJvb2xlYW47XHJcbiAgICB1cGxvYWRGaWxlKG5hbWU6IHN0cmluZywgZmlsZTogRmlsZSwgc3RvcmVEYXRhQXNUZXh0OiBib29sZWFuLCB1cGxvYWRpbmdDYWxsYmFjazogKHN0YXR1czogc3RyaW5nKSA9PiBhbnkpOiBib29sZWFuO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSUNvbmRpdGlvblJ1bm5lciB7XHJcbiAgICBydW5Db25kaXRpb24odmFsdWVzOiBIYXNoVGFibGU8YW55Pik7XHJcbn1cclxuZXhwb3J0IGludGVyZmFjZSBJUXVlc3Rpb24gZXh0ZW5kcyBJQ29uZGl0aW9uUnVubmVyIHtcclxuICAgIG5hbWU6IHN0cmluZztcclxuICAgIHZpc2libGU6IGJvb2xlYW47XHJcbiAgICBoYXNUaXRsZTogYm9vbGVhbjtcclxuICAgIHNldFZpc2libGVJbmRleCh2YWx1ZTogbnVtYmVyKTtcclxuICAgIG9uU3VydmV5VmFsdWVDaGFuZ2VkKG5ld1ZhbHVlOiBhbnkpO1xyXG4gICAgb25TdXJ2ZXlMb2FkKCk7XHJcbiAgICBzdXBwb3J0R29OZXh0UGFnZUF1dG9tYXRpYygpOiBib29sZWFuO1xyXG59XHJcbmV4cG9ydCBpbnRlcmZhY2UgSVBhZ2UgZXh0ZW5kcyBJQ29uZGl0aW9uUnVubmVyIHtcclxuICAgIHZpc2libGU6IGJvb2xlYW47XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBJdGVtVmFsdWUge1xyXG4gICAgcHVibGljIHN0YXRpYyBTZXBhcmF0b3IgPSAnfCc7XHJcbiAgICBwdWJsaWMgc3RhdGljIHNldERhdGEoaXRlbXM6IEFycmF5PEl0ZW1WYWx1ZT4sIHZhbHVlczogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIGl0ZW1zLmxlbmd0aCA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2YWx1ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gdmFsdWVzW2ldO1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IG5ldyBJdGVtVmFsdWUobnVsbCk7XHJcbiAgICAgICAgICAgIGlmICh0eXBlb2YgKHZhbHVlLnZhbHVlKSAhPT0gJ3VuZGVmaW5lZCcpIHtcclxuICAgICAgICAgICAgICAgIHZhciBleGNlcHRpb24gPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgaWYgKHR5cGVvZiAodmFsdWUuZ2V0VHlwZSkgIT09ICd1bmRlZmluZWQnICYmIHZhbHVlLmdldFR5cGUoKSA9PSAnaXRlbXZhbHVlJykge1xyXG4gICAgICAgICAgICAgICAgICAgIHZhbHVlLml0ZW1WYWx1ZSA9IHZhbHVlLml0ZW1WYWx1ZTtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLml0ZW1UZXh0ID0gdmFsdWUuaXRlbVRleHQ7XHJcbiAgICAgICAgICAgICAgICAgICAgZXhjZXB0aW9uID0gSXRlbVZhbHVlLml0ZW1WYWx1ZVByb3A7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICBJdGVtVmFsdWUuY29weUF0dHJpYnV0ZXModmFsdWUsIGl0ZW0sIGV4Y2VwdGlvbik7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpdGVtLnZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldERhdGEoaXRlbXM6IEFycmF5PEl0ZW1WYWx1ZT4pOiBhbnkge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXkoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gaXRlbXNbaV07XHJcbiAgICAgICAgICAgIGlmIChpdGVtLmhhc1RleHQpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKHsgdmFsdWU6IGl0ZW0udmFsdWUsIHRleHQ6IGl0ZW0udGV4dCB9KTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGl0ZW0udmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIGdldEl0ZW1CeVZhbHVlKGl0ZW1zOiBBcnJheTxJdGVtVmFsdWU+LCB2YWw6IGFueSk6IEl0ZW1WYWx1ZSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkgKyspIHtcclxuICAgICAgICAgICAgaWYgKGl0ZW1zW2ldLnZhbHVlID09IHZhbCkgcmV0dXJuIGl0ZW1zW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgc3RhdGljIGl0ZW1WYWx1ZVByb3AgPSBbIFwidGV4dFwiLCBcInZhbHVlXCIsIFwiaGFzVGV4dFwiXTtcclxuICAgIHByaXZhdGUgc3RhdGljIGNvcHlBdHRyaWJ1dGVzKHNyYzogYW55LCBkZXN0OiBhbnksIGV4Y2VwdG9uczogQXJyYXk8c3RyaW5nPikge1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzcmMpIHtcclxuICAgICAgICAgICAgaWYgKCh0eXBlb2Ygc3JjW2tleV0gPT0gJ2Z1bmN0aW9uJykpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAoZXhjZXB0b25zICYmIGV4Y2VwdG9ucy5pbmRleE9mKGtleSkgPiAtMSkgY29udGludWU7XHJcbiAgICAgICAgICAgIGRlc3Rba2V5XSA9IHNyY1trZXldO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgaXRlbVZhbHVlOiBhbnk7XHJcbiAgICBwcml2YXRlIGl0ZW1UZXh0OiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcih2YWx1ZTogYW55LCB0ZXh0OiBzdHJpbmcgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICB0aGlzLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJpdGVtdmFsdWVcIjsgfVxyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpOiBhbnkgeyByZXR1cm4gdGhpcy5pdGVtVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgdmFsdWUobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaXRlbVZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgaWYgKCF0aGlzLml0ZW1WYWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBzdHI6IHN0cmluZyA9IHRoaXMuaXRlbVZhbHVlLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gc3RyLmluZGV4T2YoSXRlbVZhbHVlLlNlcGFyYXRvcik7XHJcbiAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgdGhpcy5pdGVtVmFsdWUgPSBzdHIuc2xpY2UoMCwgaW5kZXgpO1xyXG4gICAgICAgICAgICB0aGlzLnRleHQgPSBzdHIuc2xpY2UoaW5kZXggKyAxKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGhhc1RleHQoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLml0ZW1UZXh0ID8gdHJ1ZSA6IGZhbHNlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IHRleHQoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNUZXh0KSByZXR1cm4gdGhpcy5pdGVtVGV4dDtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZSkgcmV0dXJuIHRoaXMudmFsdWUudG9TdHJpbmcoKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgdGV4dChuZXdUZXh0OiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLml0ZW1UZXh0ID0gbmV3VGV4dDtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEJhc2Uge1xyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgbWV0aG9kIGlzIGFic3RyYWN0Jyk7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFN1cnZleUVycm9yIHtcclxuICAgIHB1YmxpYyBnZXRUZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdUaGlzIG1ldGhvZCBpcyBhYnN0cmFjdCcpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY29uc3QgU3VydmV5UGFnZUlkID0gXCJzcV9wYWdlXCI7XHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlFbGVtZW50IHtcclxuICAgIHB1YmxpYyBzdGF0aWMgU2Nyb2xsRWxlbWVudFRvVG9wKGVsZW1lbnRJZDogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCFlbGVtZW50SWQpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgZWwgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChlbGVtZW50SWQpO1xyXG4gICAgICAgIGlmICghZWwgfHwgIWVsLnNjcm9sbEludG9WaWV3KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIGVsZW1Ub3AgPSBlbC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKS50b3A7XHJcbiAgICAgICAgaWYgKGVsZW1Ub3AgPCAwKSAgZWwuc2Nyb2xsSW50b1ZpZXcoKTtcclxuICAgICAgICByZXR1cm4gZWxlbVRvcCA8IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3RhdGljIEZvY3VzRWxlbWVudChlbGVtZW50SWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghZWxlbWVudElkKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIGVsID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoZWxlbWVudElkKTtcclxuICAgICAgICBpZiAoZWwpIHtcclxuICAgICAgICAgICAgZWwuZm9jdXMoKTtcclxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEV2ZW50PFQgZXh0ZW5kcyBGdW5jdGlvbiwgT3B0aW9ucz4gIHtcclxuICAgIHByaXZhdGUgY2FsbGJhY2tzOiBBcnJheTxUPjtcclxuICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuY2FsbGJhY2tzID09IG51bGwgfHwgdGhpcy5jYWxsYmFja3MubGVuZ3RoID09IDA7IH1cclxuICAgIHB1YmxpYyBmaXJlKHNlbmRlcjogYW55LCBvcHRpb25zOiBPcHRpb25zKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2FsbGJhY2tzID09IG51bGwpIHJldHVybjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY2FsbGJhY2tzLmxlbmd0aDsgaSArKykge1xyXG4gICAgICAgICAgICB2YXIgY2FsbFJlc3VsdCA9IHRoaXMuY2FsbGJhY2tzW2ldKHNlbmRlciwgb3B0aW9ucyk7XHJcblxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGQoZnVuYzogVCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNhbGxiYWNrcyA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2FsbGJhY2tzID0gbmV3IEFycmF5PFQ+KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2FsbGJhY2tzLnB1c2goZnVuYyk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcmVtb3ZlKGZ1bmM6IFQpIHtcclxuICAgICAgICBpZiAodGhpcy5jYWxsYmFja3MgPT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBpbmRleCA9IHRoaXMuY2FsbGJhY2tzLmluZGV4T2YoZnVuYywgMCk7XHJcbiAgICAgICAgaWYgKGluZGV4ICE9IHVuZGVmaW5lZCkge1xyXG4gICAgICAgICAgICB0aGlzLmNhbGxiYWNrcy5zcGxpY2UoaW5kZXgsIDEpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2Jhc2UudHNcbiAqKi8iLCJpbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSAnLi9zdXJ2ZXlTdHJpbmdzJztcclxuaW1wb3J0IHtTdXJ2ZXlFcnJvcn0gZnJvbSBcIi4vYmFzZVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIEFuc3dlclJlcXVpcmVkRXJyb3IgZXh0ZW5kcyBTdXJ2ZXlFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpICB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJyZXF1aXJlZEVycm9yXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBSZXF1cmVOdW1lcmljRXJyb3IgZXh0ZW5kcyBTdXJ2ZXlFcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFRleHQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcIm51bWVyaWNFcnJvclwiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgRXhjZWVkU2l6ZUVycm9yIGV4dGVuZHMgU3VydmV5RXJyb3Ige1xyXG4gICAgcHJpdmF0ZSBtYXhTaXplOiBudW1iZXI7XHJcbiAgICBjb25zdHJ1Y3RvcihtYXhTaXplOiBudW1iZXIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMubWF4U2l6ZSA9IG1heFNpemU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VGV4dCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwiZXhjZWVkTWF4U2l6ZVwiKVtcImZvcm1hdFwiXSh0aGlzLmdldFRleHRTaXplKCkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRUZXh0U2l6ZSgpIHtcclxuICAgICAgICB2YXIgc2l6ZXMgPSBbJ0J5dGVzJywgJ0tCJywgJ01CJywgJ0dCJywgJ1RCJ107XHJcbiAgICAgICAgdmFyIGZpeGVkID0gWzAsIDAsIDIsIDMsIDNdO1xyXG4gICAgICAgIGlmICh0aGlzLm1heFNpemUgPT0gMCkgcmV0dXJuICcwIEJ5dGUnO1xyXG4gICAgICAgIHZhciBpID0gTWF0aC5mbG9vcihNYXRoLmxvZyh0aGlzLm1heFNpemUpIC8gTWF0aC5sb2coMTAyNCkpO1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IHRoaXMubWF4U2l6ZSAvIE1hdGgucG93KDEwMjQsIGkpO1xyXG4gICAgICAgIHJldHVybiB2YWx1ZS50b0ZpeGVkKGZpeGVkW2ldKSArICcgJyArIHNpemVzW2ldO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgQ3VzdG9tRXJyb3IgZXh0ZW5kcyBTdXJ2ZXlFcnJvciB7XHJcbiAgICBwcml2YXRlIHRleHQ6IHN0cmluZztcclxuICAgIGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUZXh0KCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dDtcclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2Vycm9yLnRzXG4gKiovIiwiZXhwb3J0IHZhciBzdXJ2ZXlMb2NhbGl6YXRpb24gPSB7XHJcbiAgICBjdXJyZW50TG9jYWxlOiBcIlwiLFxyXG4gICAgbG9jYWxlczoge30sXHJcbiAgICBnZXRTdHJpbmc6IGZ1bmN0aW9uIChzdHJOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgbG9jID0gdGhpcy5jdXJyZW50TG9jYWxlID8gdGhpcy5sb2NhbGVzW3RoaXMuY3VycmVudExvY2FsZV0gOiBzdXJ2ZXlTdHJpbmdzO1xyXG4gICAgICAgIGlmICghbG9jIHx8ICFsb2Nbc3RyTmFtZV0pIGxvYyA9IHN1cnZleVN0cmluZ3M7XHJcbiAgICAgICAgcmV0dXJuIGxvY1tzdHJOYW1lXTtcclxuICAgIH0sXHJcbiAgICBnZXRMb2NhbGVzOiBmdW5jdGlvbiAoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgdmFyIHJlcyA9IFtdO1xyXG4gICAgICAgIHJlcy5wdXNoKFwiXCIpO1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLmxvY2FsZXMpIHtcclxuICAgICAgICAgICAgcmVzLnB1c2goa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmVzLnNvcnQoKTtcclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG59O1xyXG5leHBvcnQgdmFyIHN1cnZleVN0cmluZ3MgPSB7XHJcbiAgICBwYWdlUHJldlRleHQ6IFwiUHJldmlvdXNcIixcclxuICAgIHBhZ2VOZXh0VGV4dDogXCJOZXh0XCIsXHJcbiAgICBjb21wbGV0ZVRleHQ6IFwiQ29tcGxldGVcIixcclxuICAgIG90aGVySXRlbVRleHQ6IFwiT3RoZXIgKGRlc2NyaWJlKVwiLFxyXG4gICAgcHJvZ3Jlc3NUZXh0OiBcIlBhZ2UgezB9IG9mIHsxfVwiLFxyXG4gICAgZW1wdHlTdXJ2ZXk6IFwiVGhlcmUgaXMgbm8gYW55IHZpc2libGUgcGFnZSBvciB2aXNpYmxlIHF1ZXN0aW9uIGluIHRoZSBzdXJ2ZXkuXCIsXHJcbiAgICBjb21wbGV0aW5nU3VydmV5OiBcIlRoYW5rIFlvdSBmb3IgQ29tcGxldGluZyB0aGUgU3VydmV5IVwiLFxyXG4gICAgbG9hZGluZ1N1cnZleTogXCJTdXJ2ZXkgaXMgbG9hZGluZyBmcm9tIHRoZSBzZXJ2ZXIuLi5cIixcclxuICAgIG9wdGlvbnNDYXB0aW9uOiBcIkNob29zZS4uLlwiLFxyXG4gICAgcmVxdWlyZWRFcnJvcjogXCJQbGVhc2UgYW5zd2VyIHRoZSBxdWVzdGlvbi5cIixcclxuICAgIHJlcXVpcmVkSW5BbGxSb3dzRXJyb3I6IFwiUGxlYXNlIGFuc3dlciBxdWVzdGlvbnMgaW4gYWxsIHJvd3MuXCIsXHJcbiAgICBudW1lcmljRXJyb3I6IFwiVGhlIHZhbHVlIHNob3VsZCBiZSBhIG51bWVyaWMuXCIsXHJcbiAgICB0ZXh0TWluTGVuZ3RoOiBcIlBsZWFzZSBlbnRlciBhdCBsZWFzdCB7MH0gc3ltYm9scy5cIixcclxuICAgIG1pblJvd0NvdW50RXJyb3I6IFwiUGxlYXNlIGZpbGwgYXQgbGVhc3QgezB9IHJvd3MuXCIsXHJcbiAgICBtaW5TZWxlY3RFcnJvcjogXCJQbGVhc2Ugc2VsZWN0IGF0IGxlYXN0IHswfSB2YXJpYW50cy5cIixcclxuICAgIG1heFNlbGVjdEVycm9yOiBcIlBsZWFzZSBzZWxlY3Qgbm90IG1vcmUgdGhhbiB7MH0gdmFyaWFudHMuXCIsXHJcbiAgICBudW1lcmljTWluTWF4OiBcIlRoZSAnezB9JyBzaG91bGQgYmUgZXF1YWwgb3IgbW9yZSB0aGFuIHsxfSBhbmQgZXF1YWwgb3IgbGVzcyB0aGFuIHsyfVwiLFxyXG4gICAgbnVtZXJpY01pbjogXCJUaGUgJ3swfScgc2hvdWxkIGJlIGVxdWFsIG9yIG1vcmUgdGhhbiB7MX1cIixcclxuICAgIG51bWVyaWNNYXg6IFwiVGhlICd7MH0nIHNob3VsZCBiZSBlcXVhbCBvciBsZXNzIHRoYW4gezF9XCIsXHJcbiAgICBpbnZhbGlkRW1haWw6IFwiUGxlYXNlIGVudGVyIGEgdmFsaWQgZS1tYWlsLlwiLFxyXG4gICAgdXJsUmVxdWVzdEVycm9yOiBcIlRoZSByZXF1ZXN0IHJldHVybiBlcnJvciAnezB9Jy4gezF9XCIsXHJcbiAgICB1cmxHZXRDaG9pY2VzRXJyb3I6IFwiVGhlIHJlcXVlc3QgcmV0dXJucyBlbXB0eSBkYXRhIG9yIHRoZSAncGF0aCcgcHJvcGVydHkgaXMgaW5jb3JyZWN0XCIsXHJcbiAgICBleGNlZWRNYXhTaXplOiBcIlRoZSBmaWxlIHNpemUgc2hvdWxkIG5vdCBleGNlZWQgezB9LlwiLFxyXG4gICAgb3RoZXJSZXF1aXJlZEVycm9yOiBcIlBsZWFzZSBlbnRlciB0aGUgb3RoZXJzIHZhbHVlLlwiLFxyXG4gICAgdXBsb2FkaW5nRmlsZTogXCJZb3VyIGZpbGUgaXMgdXBsb2FkaW5nLiBQbGVhc2Ugd2FpdCBzZXZlcmFsIHNlY29uZHMgYW5kIHRyeSBhZ2Fpbi5cIixcclxuICAgIGFkZFJvdzogXCJBZGQgUm93XCIsXHJcbiAgICByZW1vdmVSb3c6IFwiUmVtb3ZlXCJcclxufTtcclxuc3VydmV5TG9jYWxpemF0aW9uLmxvY2FsZXNbXCJlblwiXSA9IHN1cnZleVN0cmluZ3M7XHJcblxyXG5pZiAoIVN0cmluZy5wcm90b3R5cGVbXCJmb3JtYXRcIl0pIHtcclxuICAgIFN0cmluZy5wcm90b3R5cGVbXCJmb3JtYXRcIl0gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgdmFyIGFyZ3MgPSBhcmd1bWVudHM7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVwbGFjZSgveyhcXGQrKX0vZywgZnVuY3Rpb24gKG1hdGNoLCBudW1iZXIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHR5cGVvZiBhcmdzW251bWJlcl0gIT0gJ3VuZGVmaW5lZCdcclxuICAgICAgICAgICAgICAgID8gYXJnc1tudW1iZXJdXHJcbiAgICAgICAgICAgICAgICA6IG1hdGNoXHJcbiAgICAgICAgICAgICAgICA7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9O1xyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc3VydmV5U3RyaW5ncy50c1xuICoqLyIsImltcG9ydCB7SGFzaFRhYmxlfSBmcm9tICcuL2Jhc2UnO1xyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25PYmplY3RQcm9wZXJ0eSB7XHJcbiAgICBwcml2YXRlIHR5cGVWYWx1ZTogc3RyaW5nID0gbnVsbDtcclxuICAgIHByaXZhdGUgY2hvaWNlc1ZhbHVlOiBBcnJheTxhbnk+ID0gbnVsbDtcclxuICAgIHByaXZhdGUgY2hvaWNlc2Z1bmM6ICgpID0+IEFycmF5PGFueT4gPSBudWxsO1xyXG4gICAgcHVibGljIGNsYXNzTmFtZTogc3RyaW5nID0gbnVsbDtcclxuICAgIHB1YmxpYyBjbGFzc05hbWVQYXJ0OiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHVibGljIGJhc2VDbGFzc05hbWU6IHN0cmluZyA9IG51bGw7XHJcbiAgICBwdWJsaWMgZGVmYXVsdFZhbHVlOiBhbnkgPSBudWxsO1xyXG4gICAgcHVibGljIG9uR2V0VmFsdWU6IChvYmo6IGFueSkgPT4gYW55ID0gbnVsbDtcclxuICAgIHB1YmxpYyBvblNldFZhbHVlOiAob2JqOiBhbnksIHZhbHVlOiBhbnksIGpzb25Db252OiBKc29uT2JqZWN0KSA9PiBhbnlcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMudHlwZVZhbHVlID8gdGhpcy50eXBlVmFsdWUgOiBcInN0cmluZ1wiOyB9XHJcbiAgICBwdWJsaWMgc2V0IHR5cGUodmFsdWU6IHN0cmluZykgeyB0aGlzLnR5cGVWYWx1ZSA9IHZhbHVlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGhhc1RvVXNlR2V0VmFsdWUoKSB7IHJldHVybiB0aGlzLm9uR2V0VmFsdWU7IH1cclxuICAgIHB1YmxpYyBpc0RlZmF1bHRWYWx1ZSh2YWx1ZTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmRlZmF1bHRWYWx1ZSkgPyAodGhpcy5kZWZhdWx0VmFsdWUgPT0gdmFsdWUpIDogISh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VmFsdWUob2JqOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLm9uR2V0VmFsdWUpIHJldHVybiB0aGlzLm9uR2V0VmFsdWUob2JqKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaGFzVG9Vc2VTZXRWYWx1ZSgpIHsgcmV0dXJuIHRoaXMub25TZXRWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldFZhbHVlKG9iajogYW55LCB2YWx1ZTogYW55LCBqc29uQ29udjogSnNvbk9iamVjdCkge1xyXG4gICAgICAgIGlmICh0aGlzLm9uU2V0VmFsdWUpIHtcclxuICAgICAgICAgICAgdGhpcy5vblNldFZhbHVlKG9iaiwgdmFsdWUsIGpzb25Db252KTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0T2JqVHlwZShvYmpUeXBlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY2xhc3NOYW1lUGFydCkgcmV0dXJuIG9ialR5cGU7XHJcbiAgICAgICAgcmV0dXJuIG9ialR5cGUucmVwbGFjZSh0aGlzLmNsYXNzTmFtZVBhcnQsIFwiXCIpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldENsYXNzTmFtZShjbGFzc05hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuICh0aGlzLmNsYXNzTmFtZVBhcnQgJiYgY2xhc3NOYW1lLmluZGV4T2YodGhpcy5jbGFzc05hbWVQYXJ0KSA8IDApID8gY2xhc3NOYW1lICsgdGhpcy5jbGFzc05hbWVQYXJ0IDogY2xhc3NOYW1lO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBjaG9pY2VzKCk6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIGlmICh0aGlzLmNob2ljZXNWYWx1ZSAhPSBudWxsKSByZXR1cm4gdGhpcy5jaG9pY2VzVmFsdWU7XHJcbiAgICAgICAgaWYgKHRoaXMuY2hvaWNlc2Z1bmMgIT0gbnVsbCkgcmV0dXJuIHRoaXMuY2hvaWNlc2Z1bmMoKTtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXRDaG9pY2VzKHZhbHVlOiBBcnJheTxhbnk+LCB2YWx1ZUZ1bmM6ICgpID0+IEFycmF5PGFueT4pIHtcclxuICAgICAgICB0aGlzLmNob2ljZXNWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuY2hvaWNlc2Z1bmMgPSB2YWx1ZUZ1bmM7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIEpzb25NZXRhZGF0YUNsYXNzIHtcclxuICAgIHN0YXRpYyByZXF1aXJlZFN5bWJvbCA9ICchJztcclxuICAgIHN0YXRpYyB0eXBlU3ltYm9sID0gJzonO1xyXG4gICAgcHJvcGVydGllczogQXJyYXk8SnNvbk9iamVjdFByb3BlcnR5PiA9IG51bGw7XHJcbiAgICByZXF1aXJlZFByb3BlcnRpZXM6IEFycmF5PHN0cmluZz4gPSBudWxsO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZywgcHJvcGVydGllczogQXJyYXk8YW55PiwgcHVibGljIGNyZWF0b3I6ICgpID0+IGFueSA9IG51bGwsIHB1YmxpYyBwYXJlbnROYW1lOiBzdHJpbmcgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5wcm9wZXJ0aWVzID0gbmV3IEFycmF5PEpzb25PYmplY3RQcm9wZXJ0eT4oKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIHByb3AgPSB0aGlzLmNyZWF0ZVByb3BlcnR5KHByb3BlcnRpZXNbaV0pO1xyXG4gICAgICAgICAgICBpZiAocHJvcCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5wcm9wZXJ0aWVzLnB1c2gocHJvcCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZmluZChuYW1lOiBzdHJpbmcpOiBKc29uT2JqZWN0UHJvcGVydHkge1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnByb3BlcnRpZXNbaV0ubmFtZSA9PSBuYW1lKSByZXR1cm4gdGhpcy5wcm9wZXJ0aWVzW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBjcmVhdGVQcm9wZXJ0eShwcm9wSW5mbzogYW55KTogSnNvbk9iamVjdFByb3BlcnR5IHtcclxuICAgICAgICB2YXIgcHJvcGVydHlOYW1lID0gdHlwZW9mIHByb3BJbmZvID09PSBcInN0cmluZ1wiID8gcHJvcEluZm8gOiBwcm9wSW5mby5uYW1lO1xyXG4gICAgICAgIGlmICghcHJvcGVydHlOYW1lKSByZXR1cm47XHJcbiAgICAgICAgdmFyIHByb3BlcnR5VHlwZSA9IG51bGw7XHJcbiAgICAgICAgdmFyIHR5cGVJbmRleCA9IHByb3BlcnR5TmFtZS5pbmRleE9mKEpzb25NZXRhZGF0YUNsYXNzLnR5cGVTeW1ib2wpO1xyXG4gICAgICAgIGlmICh0eXBlSW5kZXggPiAtMSkge1xyXG4gICAgICAgICAgICBwcm9wZXJ0eVR5cGUgPSBwcm9wZXJ0eU5hbWUuc3Vic3RyaW5nKHR5cGVJbmRleCArIDEpO1xyXG4gICAgICAgICAgICBwcm9wZXJ0eU5hbWUgPSBwcm9wZXJ0eU5hbWUuc3Vic3RyaW5nKDAsIHR5cGVJbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHByb3BlcnR5TmFtZSA9IHRoaXMuZ2V0UHJvcGVydHlOYW1lKHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgdmFyIHByb3AgPSBuZXcgSnNvbk9iamVjdFByb3BlcnR5KHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgaWYgKHByb3BlcnR5VHlwZSkge1xyXG4gICAgICAgICAgICBwcm9wLnR5cGUgPSBwcm9wZXJ0eVR5cGU7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0eXBlb2YgcHJvcEluZm8gPT09IFwib2JqZWN0XCIpIHtcclxuICAgICAgICAgICAgaWYgKHByb3BJbmZvLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIHByb3AudHlwZSA9IHByb3BJbmZvLnR5cGU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHByb3BJbmZvLmRlZmF1bHQpIHtcclxuICAgICAgICAgICAgICAgIHByb3AuZGVmYXVsdFZhbHVlID0gcHJvcEluZm8uZGVmYXVsdDtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBpZiAocHJvcEluZm8uaXNSZXF1aXJlZCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5tYWtlUHJvcGVydHlSZXF1aXJlZChwcm9wLm5hbWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9wSW5mby5jaG9pY2VzKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hvaWNlc0Z1bmMgPSB0eXBlb2YgcHJvcEluZm8uY2hvaWNlcyA9PT0gXCJmdW5jdGlvblwiID8gcHJvcEluZm8uY2hvaWNlcyA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICB2YXIgY2hvaWNlc1ZhbHVlID0gdHlwZW9mIHByb3BJbmZvLmNob2ljZXMgIT09IFwiZnVuY3Rpb25cIiA/IHByb3BJbmZvLmNob2ljZXMgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgcHJvcC5zZXRDaG9pY2VzKGNob2ljZXNWYWx1ZSwgY2hvaWNlc0Z1bmMpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9wSW5mby5vbkdldFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wLm9uR2V0VmFsdWUgPSBwcm9wSW5mby5vbkdldFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9wSW5mby5vblNldFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wLm9uU2V0VmFsdWUgPSBwcm9wSW5mby5vblNldFZhbHVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9wSW5mby5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgICAgIHByb3AuY2xhc3NOYW1lID0gcHJvcEluZm8uY2xhc3NOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9wSW5mby5iYXNlQ2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wLmJhc2VDbGFzc05hbWUgPSBwcm9wSW5mby5iYXNlQ2xhc3NOYW1lO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmIChwcm9wSW5mby5jbGFzc05hbWVQYXJ0KSB7XHJcbiAgICAgICAgICAgICAgICBwcm9wLmNsYXNzTmFtZVBhcnQgPSBwcm9wSW5mby5jbGFzc05hbWVQYXJ0O1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9wO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRQcm9wZXJ0eU5hbWUocHJvcGVydHlOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmIChwcm9wZXJ0eU5hbWUubGVuZ3RoID09IDAgfHwgcHJvcGVydHlOYW1lWzBdICE9IEpzb25NZXRhZGF0YUNsYXNzLnJlcXVpcmVkU3ltYm9sKSByZXR1cm4gcHJvcGVydHlOYW1lO1xyXG4gICAgICAgIHByb3BlcnR5TmFtZSA9IHByb3BlcnR5TmFtZS5zbGljZSgxKTtcclxuICAgICAgICB0aGlzLm1ha2VQcm9wZXJ0eVJlcXVpcmVkKHByb3BlcnR5TmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHByb3BlcnR5TmFtZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgbWFrZVByb3BlcnR5UmVxdWlyZWQocHJvcGVydHlOYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMucmVxdWlyZWRQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIHRoaXMucmVxdWlyZWRQcm9wZXJ0aWVzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yZXF1aXJlZFByb3BlcnRpZXMucHVzaChwcm9wZXJ0eU5hbWUpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBKc29uTWV0YWRhdGEge1xyXG4gICAgcHJpdmF0ZSBjbGFzc2VzOiBIYXNoVGFibGU8SnNvbk1ldGFkYXRhQ2xhc3M+ID0ge307XHJcbiAgICBwcml2YXRlIGNoaWxkcmVuQ2xhc3NlczogSGFzaFRhYmxlPEFycmF5PEpzb25NZXRhZGF0YUNsYXNzPj4gPSB7fTtcclxuICAgIHByaXZhdGUgY2xhc3NQcm9wZXJ0aWVzOiBIYXNoVGFibGU8QXJyYXk8SnNvbk9iamVjdFByb3BlcnR5Pj4gPSB7fTtcclxuICAgIHByaXZhdGUgY2xhc3NSZXF1aXJlZFByb3BlcnRpZXM6IEhhc2hUYWJsZTxBcnJheTxzdHJpbmc+PiA9IHt9O1xyXG4gICAgcHVibGljIGFkZENsYXNzKG5hbWU6IHN0cmluZywgcHJvcGVydGllczogQXJyYXk8YW55PiwgY3JlYXRvcjogKCkgPT4gYW55ID0gbnVsbCwgcGFyZW50TmFtZTogc3RyaW5nID0gbnVsbCk6IEpzb25NZXRhZGF0YUNsYXNzIHtcclxuICAgICAgICB2YXIgbWV0YURhdGFDbGFzcyA9IG5ldyBKc29uTWV0YWRhdGFDbGFzcyhuYW1lLCBwcm9wZXJ0aWVzLCBjcmVhdG9yLCBwYXJlbnROYW1lKTtcclxuICAgICAgICB0aGlzLmNsYXNzZXNbbmFtZV0gPSBtZXRhRGF0YUNsYXNzO1xyXG4gICAgICAgIGlmIChwYXJlbnROYW1lKSB7XHJcbiAgICAgICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW5DbGFzc2VzW3BhcmVudE5hbWVdO1xyXG4gICAgICAgICAgICBpZiAoIWNoaWxkcmVuKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoaWxkcmVuQ2xhc3Nlc1twYXJlbnROYW1lXSA9IFtdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuY2hpbGRyZW5DbGFzc2VzW3BhcmVudE5hbWVdLnB1c2gobWV0YURhdGFDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBtZXRhRGF0YUNsYXNzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIG92ZXJyaWRlQ2xhc3NDcmVhdG9yZShuYW1lOiBzdHJpbmcsIGNyZWF0b3I6ICgpID0+IGFueSkge1xyXG4gICAgICAgIHZhciBtZXRhRGF0YUNsYXNzID0gdGhpcy5maW5kQ2xhc3MobmFtZSk7XHJcbiAgICAgICAgaWYgKG1ldGFEYXRhQ2xhc3MpIHtcclxuICAgICAgICAgICAgbWV0YURhdGFDbGFzcy5jcmVhdG9yID0gY3JlYXRvcjtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UHJvcGVydGllcyhuYW1lOiBzdHJpbmcpOiBBcnJheTxKc29uT2JqZWN0UHJvcGVydHk+IHtcclxuICAgICAgICB2YXIgcHJvcGVydGllcyA9IHRoaXMuY2xhc3NQcm9wZXJ0aWVzW25hbWVdO1xyXG4gICAgICAgIGlmICghcHJvcGVydGllcykge1xyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzID0gbmV3IEFycmF5PEpzb25PYmplY3RQcm9wZXJ0eT4oKTtcclxuICAgICAgICAgICAgdGhpcy5maWxsUHJvcGVydGllcyhuYW1lLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc1Byb3BlcnRpZXNbbmFtZV0gPSBwcm9wZXJ0aWVzO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcHJvcGVydGllcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBjcmVhdGVDbGFzcyhuYW1lOiBzdHJpbmcpOiBhbnkge1xyXG4gICAgICAgIHZhciBtZXRhRGF0YUNsYXNzID0gdGhpcy5maW5kQ2xhc3MobmFtZSk7XHJcbiAgICAgICAgaWYgKCFtZXRhRGF0YUNsYXNzKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gbWV0YURhdGFDbGFzcy5jcmVhdG9yKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Q2hpbGRyZW5DbGFzc2VzKG5hbWU6IHN0cmluZywgY2FuQmVDcmVhdGVkOiBib29sZWFuID0gZmFsc2UpOiBBcnJheTxKc29uTWV0YWRhdGFDbGFzcz4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICB0aGlzLmZpbGxDaGlsZHJlbkNsYXNzZXMobmFtZSwgY2FuQmVDcmVhdGVkLCByZXN1bHQpO1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UmVxdWlyZWRQcm9wZXJ0aWVzKG5hbWU6IHN0cmluZyk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0gdGhpcy5jbGFzc1JlcXVpcmVkUHJvcGVydGllc1tuYW1lXTtcclxuICAgICAgICBpZiAoIXByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgcHJvcGVydGllcyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsbFJlcXVpcmVkUHJvcGVydGllcyhuYW1lLCBwcm9wZXJ0aWVzKTtcclxuICAgICAgICAgICAgdGhpcy5jbGFzc1JlcXVpcmVkUHJvcGVydGllc1tuYW1lXSA9IHByb3BlcnRpZXM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBwcm9wZXJ0aWVzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFByb3BlcnR5KGNsYXNzTmFtZTogc3RyaW5nLCBwcm9wZXJ0eUluZm86IGFueSkge1xyXG4gICAgICAgIHZhciBtZXRhRGF0YUNsYXNzID0gdGhpcy5maW5kQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICBpZiAoIW1ldGFEYXRhQ2xhc3MpIHJldHVybjtcclxuICAgICAgICB2YXIgcHJvcGVydHkgPSBtZXRhRGF0YUNsYXNzLmNyZWF0ZVByb3BlcnR5KHByb3BlcnR5SW5mbyk7XHJcbiAgICAgICAgaWYgKHByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUHJvcGVydHlUb0NsYXNzKG1ldGFEYXRhQ2xhc3MsIHByb3BlcnR5KTtcclxuICAgICAgICAgICAgdGhpcy5lbXB0eUNsYXNzUHJvcGVydGllc0hhc2gobWV0YURhdGFDbGFzcyk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZVByb3BlcnR5KGNsYXNzTmFtZTogc3RyaW5nLCBwcm9wZXJ0eU5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHZhciBtZXRhRGF0YUNsYXNzID0gdGhpcy5maW5kQ2xhc3MoY2xhc3NOYW1lKTtcclxuICAgICAgICBpZiAoIW1ldGFEYXRhQ2xhc3MpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgcHJvcGVydHkgPSBtZXRhRGF0YUNsYXNzLmZpbmQocHJvcGVydHlOYW1lKTtcclxuICAgICAgICBpZiAocHJvcGVydHkpIHtcclxuICAgICAgICAgICAgdGhpcy5yZW1vdmVQcm9wZXJ0eUZyb21DbGFzcyhtZXRhRGF0YUNsYXNzLCBwcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgIHRoaXMuZW1wdHlDbGFzc1Byb3BlcnRpZXNIYXNoKG1ldGFEYXRhQ2xhc3MpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgYWRkUHJvcGVydHlUb0NsYXNzKG1ldGFEYXRhQ2xhc3M6IEpzb25NZXRhZGF0YUNsYXNzLCBwcm9wZXJ0eTogSnNvbk9iamVjdFByb3BlcnR5KSB7XHJcbiAgICAgICAgaWYgKG1ldGFEYXRhQ2xhc3MuZmluZChwcm9wZXJ0eS5uYW1lKSAhPSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgbWV0YURhdGFDbGFzcy5wcm9wZXJ0aWVzLnB1c2gocHJvcGVydHkpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSByZW1vdmVQcm9wZXJ0eUZyb21DbGFzcyhtZXRhRGF0YUNsYXNzOiBKc29uTWV0YWRhdGFDbGFzcywgcHJvcGVydHk6IEpzb25PYmplY3RQcm9wZXJ0eSkge1xyXG4gICAgICAgIHZhciBpbmRleCA9IG1ldGFEYXRhQ2xhc3MucHJvcGVydGllcy5pbmRleE9mKHByb3BlcnR5KTtcclxuICAgICAgICBpZiAoaW5kZXggPCAwKSByZXR1cm47XHJcbiAgICAgICAgbWV0YURhdGFDbGFzcy5wcm9wZXJ0aWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgaWYgKG1ldGFEYXRhQ2xhc3MucmVxdWlyZWRQcm9wZXJ0aWVzKSB7XHJcbiAgICAgICAgICAgIGluZGV4ID0gbWV0YURhdGFDbGFzcy5yZXF1aXJlZFByb3BlcnRpZXMuaW5kZXhPZihwcm9wZXJ0eS5uYW1lKTtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID49IDApIHtcclxuICAgICAgICAgICAgICAgIG1ldGFEYXRhQ2xhc3MucmVxdWlyZWRQcm9wZXJ0aWVzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGVtcHR5Q2xhc3NQcm9wZXJ0aWVzSGFzaChtZXRhRGF0YUNsYXNzOiBKc29uTWV0YWRhdGFDbGFzcykge1xyXG4gICAgICAgIHRoaXMuY2xhc3NQcm9wZXJ0aWVzW21ldGFEYXRhQ2xhc3MubmFtZV0gPSBudWxsO1xyXG4gICAgICAgIHZhciBjaGlsZENsYXNzZXMgPSB0aGlzLmdldENoaWxkcmVuQ2xhc3NlcyhtZXRhRGF0YUNsYXNzLm5hbWUpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY2hpbGRDbGFzc2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY2xhc3NQcm9wZXJ0aWVzW2NoaWxkQ2xhc3Nlc1tpXS5uYW1lXSA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBmaWxsQ2hpbGRyZW5DbGFzc2VzKG5hbWU6IHN0cmluZywgY2FuQmVDcmVhdGVkOiBib29sZWFuLCByZXN1bHQ6IEFycmF5PEpzb25NZXRhZGF0YUNsYXNzPikge1xyXG4gICAgICAgIHZhciBjaGlsZHJlbiA9IHRoaXMuY2hpbGRyZW5DbGFzc2VzW25hbWVdO1xyXG4gICAgICAgIGlmICghY2hpbGRyZW4pIHJldHVybjtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IGNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghY2FuQmVDcmVhdGVkIHx8IGNoaWxkcmVuW2ldLmNyZWF0b3IpIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdC5wdXNoKGNoaWxkcmVuW2ldKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmZpbGxDaGlsZHJlbkNsYXNzZXMoY2hpbGRyZW5baV0ubmFtZSwgY2FuQmVDcmVhdGVkLCByZXN1bHQpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgZmluZENsYXNzKG5hbWU6IHN0cmluZyk6IEpzb25NZXRhZGF0YUNsYXNzIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5jbGFzc2VzW25hbWVdO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBmaWxsUHJvcGVydGllcyhuYW1lOiBzdHJpbmcsIGxpc3Q6IEFycmF5PEpzb25PYmplY3RQcm9wZXJ0eT4pIHtcclxuICAgICAgICB2YXIgbWV0YURhdGFDbGFzcyA9IHRoaXMuZmluZENsYXNzKG5hbWUpO1xyXG4gICAgICAgIGlmICghbWV0YURhdGFDbGFzcykgcmV0dXJuO1xyXG4gICAgICAgIGlmIChtZXRhRGF0YUNsYXNzLnBhcmVudE5hbWUpIHtcclxuICAgICAgICAgICAgdGhpcy5maWxsUHJvcGVydGllcyhtZXRhRGF0YUNsYXNzLnBhcmVudE5hbWUsIGxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG1ldGFEYXRhQ2xhc3MucHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmFkZFByb3BlcnR5Q29yZShtZXRhRGF0YUNsYXNzLnByb3BlcnRpZXNbaV0sIGxpc3QsIGxpc3QubGVuZ3RoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFkZFByb3BlcnR5Q29yZShwcm9wZXJ0eTogSnNvbk9iamVjdFByb3BlcnR5LCBsaXN0OiBBcnJheTxKc29uT2JqZWN0UHJvcGVydHk+LCBlbmRJbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gLTE7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBlbmRJbmRleDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChsaXN0W2ldLm5hbWUgPT0gcHJvcGVydHkubmFtZSkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICBsaXN0LnB1c2gocHJvcGVydHkpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbGlzdFtpbmRleF0gPSBwcm9wZXJ0eTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGZpbGxSZXF1aXJlZFByb3BlcnRpZXMobmFtZTogc3RyaW5nLCBsaXN0OiBBcnJheTxzdHJpbmc+KSB7XHJcbiAgICAgICAgdmFyIG1ldGFEYXRhQ2xhc3MgPSB0aGlzLmZpbmRDbGFzcyhuYW1lKTtcclxuICAgICAgICBpZiAoIW1ldGFEYXRhQ2xhc3MpIHJldHVybjtcclxuICAgICAgICBpZiAobWV0YURhdGFDbGFzcy5yZXF1aXJlZFByb3BlcnRpZXMpIHtcclxuICAgICAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkobGlzdCwgbWV0YURhdGFDbGFzcy5yZXF1aXJlZFByb3BlcnRpZXMpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobWV0YURhdGFDbGFzcy5wYXJlbnROYW1lKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlsbFJlcXVpcmVkUHJvcGVydGllcyhtZXRhRGF0YUNsYXNzLnBhcmVudE5hbWUsIGxpc3QpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgSnNvbkVycm9yIHtcclxuICAgIHB1YmxpYyBkZXNjcmlwdGlvbjogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBhdDogTnVtYmVyID0gLTE7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgdHlwZTogc3RyaW5nLCBwdWJsaWMgbWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0RnVsbERlc2NyaXB0aW9uKCkgOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiB0aGlzLm1lc3NhZ2UgKyAodGhpcy5kZXNjcmlwdGlvbiA/IFwiXFxuXCIgKyB0aGlzLmRlc2NyaXB0aW9uIDogXCJcIik7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIEpzb25Vbmtub3duUHJvcGVydHlFcnJvciBleHRlbmRzIEpzb25FcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcGVydHlOYW1lOiBzdHJpbmcsIHB1YmxpYyBjbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKFwidW5rbm93bnByb3BlcnR5XCIsIFwiVGhlIHByb3BlcnR5ICdcIiArIHByb3BlcnR5TmFtZSArIFwiJyBpbiBjbGFzcyAnXCIgKyBjbGFzc05hbWUgKyBcIicgaXMgdW5rbm93bi5cIik7XHJcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBKc29uT2JqZWN0Lm1ldGFEYXRhLmdldFByb3BlcnRpZXMoY2xhc3NOYW1lKTtcclxuICAgICAgICBpZiAocHJvcGVydGllcykge1xyXG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uID0gXCJUaGUgbGlzdCBvZiBhdmFpbGFibGUgcHJvcGVydGllcyBhcmU6IFwiO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgIGlmIChpID4gMCkgdGhpcy5kZXNjcmlwdGlvbiArPSBcIiwgXCI7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uICs9IHByb3BlcnRpZXNbaV0ubmFtZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmRlc2NyaXB0aW9uICs9ICcuJztcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIEpzb25NaXNzaW5nVHlwZUVycm9yQmFzZSBleHRlbmRzIEpzb25FcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgYmFzZUNsYXNzTmFtZTogc3RyaW5nLCBwdWJsaWMgdHlwZTogc3RyaW5nLCBwdWJsaWMgbWVzc2FnZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIodHlwZSwgbWVzc2FnZSk7XHJcbiAgICAgICAgdGhpcy5kZXNjcmlwdGlvbiA9IFwiVGhlIGZvbGxvd2luZyB0eXBlcyBhcmUgYXZhaWxhYmxlOiBcIjtcclxuICAgICAgICB2YXIgdHlwZXMgPSBKc29uT2JqZWN0Lm1ldGFEYXRhLmdldENoaWxkcmVuQ2xhc3NlcyhiYXNlQ2xhc3NOYW1lLCB0cnVlKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmIChpID4gMCkgdGhpcy5kZXNjcmlwdGlvbiArPSBcIiwgXCI7XHJcbiAgICAgICAgICAgIHRoaXMuZGVzY3JpcHRpb24gKz0gXCInXCIgKyB0eXBlc1tpXS5uYW1lICsgXCInXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZGVzY3JpcHRpb24gKz0gXCIuXCI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIEpzb25NaXNzaW5nVHlwZUVycm9yIGV4dGVuZHMgSnNvbk1pc3NpbmdUeXBlRXJyb3JCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHVibGljIGJhc2VDbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGJhc2VDbGFzc05hbWUsIFwibWlzc2luZ3R5cGVwcm9wZXJ0eVwiLCBcIlRoZSBwcm9wZXJ0eSB0eXBlIGlzIG1pc3NpbmcgaW4gdGhlIG9iamVjdC4gUGxlYXNlIHRha2UgYSBsb29rIGF0IHByb3BlcnR5OiAnXCIgKyBwcm9wZXJ0eU5hbWUgKyBcIicuXCIpO1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBKc29uSW5jb3JyZWN0VHlwZUVycm9yIGV4dGVuZHMgSnNvbk1pc3NpbmdUeXBlRXJyb3JCYXNlIHtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwcm9wZXJ0eU5hbWU6IHN0cmluZywgcHVibGljIGJhc2VDbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKGJhc2VDbGFzc05hbWUsIFwiaW5jb3JyZWN0dHlwZXByb3BlcnR5XCIsIFwiVGhlIHByb3BlcnR5IHR5cGUgaXMgaW5jb3JyZWN0IGluIHRoZSBvYmplY3QuIFBsZWFzZSB0YWtlIGEgbG9vayBhdCBwcm9wZXJ0eTogJ1wiICsgcHJvcGVydHlOYW1lICsgXCInLlwiKTtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgSnNvblJlcXVpcmVkUHJvcGVydHlFcnJvciBleHRlbmRzIEpzb25FcnJvciB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgcHJvcGVydHlOYW1lOiBzdHJpbmcsIHB1YmxpYyBjbGFzc05hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKFwicmVxdWlyZWRwcm9wZXJ0eVwiLCBcIlRoZSBwcm9wZXJ0eSAnXCIgKyBwcm9wZXJ0eU5hbWUgKyBcIicgaXMgcmVxdWlyZWQgaW4gY2xhc3MgJ1wiICsgY2xhc3NOYW1lICsgXCInLlwiKTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIEpzb25PYmplY3Qge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgdHlwZVByb3BlcnR5TmFtZSA9IFwidHlwZVwiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcG9zaXRpb25Qcm9wZXJ0eU5hbWUgPSBcInBvc1wiO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgbWV0YURhdGFWYWx1ZSA9IG5ldyBKc29uTWV0YWRhdGEoKTtcclxuICAgIHB1YmxpYyBzdGF0aWMgZ2V0IG1ldGFEYXRhKCkgeyByZXR1cm4gSnNvbk9iamVjdC5tZXRhRGF0YVZhbHVlOyB9XHJcbiAgICBwdWJsaWMgZXJyb3JzID0gbmV3IEFycmF5PEpzb25FcnJvcj4oKTtcclxuICAgIHB1YmxpYyB0b0pzb25PYmplY3Qob2JqOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnRvSnNvbk9iamVjdENvcmUob2JqLCBudWxsKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB0b09iamVjdChqc29uT2JqOiBhbnksIG9iajogYW55KSB7XHJcbiAgICAgICAgaWYgKCFqc29uT2JqKSByZXR1cm47XHJcbiAgICAgICAgdmFyIHByb3BlcnRpZXMgPSBudWxsO1xyXG4gICAgICAgIGlmIChvYmouZ2V0VHlwZSkge1xyXG4gICAgICAgICAgICBwcm9wZXJ0aWVzID0gSnNvbk9iamVjdC5tZXRhRGF0YS5nZXRQcm9wZXJ0aWVzKG9iai5nZXRUeXBlKCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXByb3BlcnRpZXMpIHJldHVybjtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4ganNvbk9iaikge1xyXG4gICAgICAgICAgICBpZiAoa2V5ID09IEpzb25PYmplY3QudHlwZVByb3BlcnR5TmFtZSkgY29udGludWU7XHJcbiAgICAgICAgICAgIGlmIChrZXkgPT0gSnNvbk9iamVjdC5wb3NpdGlvblByb3BlcnR5TmFtZSkge1xyXG4gICAgICAgICAgICAgICAgb2JqW2tleV0gPSBqc29uT2JqW2tleV07XHJcbiAgICAgICAgICAgICAgICBjb250aW51ZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YXIgcHJvcGVydHkgPSB0aGlzLmZpbmRQcm9wZXJ0eShwcm9wZXJ0aWVzLCBrZXkpO1xyXG4gICAgICAgICAgICBpZiAoIXByb3BlcnR5KSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmFkZE5ld0Vycm9yKG5ldyBKc29uVW5rbm93blByb3BlcnR5RXJyb3Ioa2V5LnRvU3RyaW5nKCksIG9iai5nZXRUeXBlKCkpLCBqc29uT2JqKTtcclxuICAgICAgICAgICAgICAgIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVUb09iaihqc29uT2JqW2tleV0sIG9iaiwga2V5LCBwcm9wZXJ0eSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHRvSnNvbk9iamVjdENvcmUob2JqOiBhbnksIHByb3BlcnR5OiBKc29uT2JqZWN0UHJvcGVydHkpOiBhbnkge1xyXG4gICAgICAgIGlmICghb2JqLmdldFR5cGUpIHJldHVybiBvYmo7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIGlmIChwcm9wZXJ0eSAhPSBudWxsICYmICghcHJvcGVydHkuY2xhc3NOYW1lKSkge1xyXG4gICAgICAgICAgICByZXN1bHRbSnNvbk9iamVjdC50eXBlUHJvcGVydHlOYW1lXSA9IHByb3BlcnR5LmdldE9ialR5cGUob2JqLmdldFR5cGUoKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBwcm9wZXJ0aWVzID0gSnNvbk9iamVjdC5tZXRhRGF0YS5nZXRQcm9wZXJ0aWVzKG9iai5nZXRUeXBlKCkpO1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBwcm9wZXJ0aWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVUb0pzb24ob2JqLCByZXN1bHQsIHByb3BlcnRpZXNbaV0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHZhbHVlVG9Kc29uKG9iajogYW55LCByZXN1bHQ6IGFueSwgcHJvcGVydHk6IEpzb25PYmplY3RQcm9wZXJ0eSkge1xyXG4gICAgICAgIHZhciB2YWx1ZSA9IG51bGw7XHJcbiAgICAgICAgaWYgKHByb3BlcnR5Lmhhc1RvVXNlR2V0VmFsdWUpIHtcclxuICAgICAgICAgICAgdmFsdWUgPSBwcm9wZXJ0eS5nZXRWYWx1ZShvYmopO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHZhbHVlID0gb2JqW3Byb3BlcnR5Lm5hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCB8fCB2YWx1ZSA9PT0gbnVsbCkgcmV0dXJuO1xyXG4gICAgICAgIGlmIChwcm9wZXJ0eS5pc0RlZmF1bHRWYWx1ZSh2YWx1ZSkpIHJldHVybjtcclxuICAgICAgICBpZiAodGhpcy5pc1ZhbHVlQXJyYXkodmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHZhciBhcnJWYWx1ZSA9IFtdO1xyXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbHVlLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICBhcnJWYWx1ZS5wdXNoKHRoaXMudG9Kc29uT2JqZWN0Q29yZSh2YWx1ZVtpXSwgcHJvcGVydHkpKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB2YWx1ZSA9IGFyclZhbHVlLmxlbmd0aCA+IDAgPyBhcnJWYWx1ZSA6IG51bGw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFsdWUgPSB0aGlzLnRvSnNvbk9iamVjdENvcmUodmFsdWUsIHByb3BlcnR5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFwcm9wZXJ0eS5pc0RlZmF1bHRWYWx1ZSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgcmVzdWx0W3Byb3BlcnR5Lm5hbWVdID0gdmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHZhbHVlVG9PYmoodmFsdWU6IGFueSwgb2JqOiBhbnksIGtleTogYW55LCBwcm9wZXJ0eTogSnNvbk9iamVjdFByb3BlcnR5KSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHJldHVybjtcclxuICAgICAgICBpZiAocHJvcGVydHkgIT0gbnVsbCAmJiBwcm9wZXJ0eS5oYXNUb1VzZVNldFZhbHVlKSB7XHJcbiAgICAgICAgICAgIHByb3BlcnR5LnNldFZhbHVlKG9iaiwgdmFsdWUsIHRoaXMpO1xyXG4gICAgICAgICAgICByZXR1cm47XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsdWVBcnJheSh2YWx1ZSkpIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZVRvQXJyYXkodmFsdWUsIG9iaiwga2V5LCBwcm9wZXJ0eSk7XHJcbiAgICAgICAgICAgIHJldHVybjtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld09iaiA9IHRoaXMuY3JlYXRlTmV3T2JqKHZhbHVlLCBwcm9wZXJ0eSk7XHJcbiAgICAgICAgaWYgKG5ld09iai5uZXdPYmopIHtcclxuICAgICAgICAgICAgdGhpcy50b09iamVjdCh2YWx1ZSwgbmV3T2JqLm5ld09iaik7XHJcbiAgICAgICAgICAgIHZhbHVlID0gbmV3T2JqLm5ld09iajtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFuZXdPYmouZXJyb3IpIHtcclxuICAgICAgICAgICAgb2JqW2tleV0gPSB2YWx1ZTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzVmFsdWVBcnJheSh2YWx1ZTogYW55KTogYm9vbGVhbiB7IHJldHVybiB2YWx1ZSAmJiB2YWx1ZS5jb25zdHJ1Y3Rvci50b1N0cmluZygpLmluZGV4T2YoXCJBcnJheVwiKSA+IC0xOyB9XHJcbiAgICBwcml2YXRlIGNyZWF0ZU5ld09iaih2YWx1ZTogYW55LCBwcm9wZXJ0eTogSnNvbk9iamVjdFByb3BlcnR5KTogYW55IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0geyBuZXdPYmo6IG51bGwsIGVycm9yOiBudWxsIH07XHJcbiAgICAgICAgdmFyIGNsYXNzTmFtZSA9IHZhbHVlW0pzb25PYmplY3QudHlwZVByb3BlcnR5TmFtZV07XHJcbiAgICAgICAgaWYgKCFjbGFzc05hbWUgJiYgcHJvcGVydHkgIT0gbnVsbCAmJiBwcm9wZXJ0eS5jbGFzc05hbWUpIHtcclxuICAgICAgICAgICAgY2xhc3NOYW1lID0gcHJvcGVydHkuY2xhc3NOYW1lO1xyXG4gICAgICAgIH1cclxuICAgICAgICBjbGFzc05hbWUgPSBwcm9wZXJ0eS5nZXRDbGFzc05hbWUoY2xhc3NOYW1lKTtcclxuICAgICAgICByZXN1bHQubmV3T2JqID0gKGNsYXNzTmFtZSkgPyBKc29uT2JqZWN0Lm1ldGFEYXRhLmNyZWF0ZUNsYXNzKGNsYXNzTmFtZSkgOiBudWxsO1xyXG4gICAgICAgIHJlc3VsdC5lcnJvciA9IHRoaXMuY2hlY2tOZXdPYmplY3RPbkVycm9ycyhyZXN1bHQubmV3T2JqLCB2YWx1ZSwgcHJvcGVydHksIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY2hlY2tOZXdPYmplY3RPbkVycm9ycyhuZXdPYmo6IGFueSwgdmFsdWU6IGFueSwgcHJvcGVydHk6IEpzb25PYmplY3RQcm9wZXJ0eSwgY2xhc3NOYW1lOiBzdHJpbmcpOiBKc29uRXJyb3Ige1xyXG4gICAgICAgIHZhciBlcnJvciA9IG51bGw7XHJcbiAgICAgICAgaWYgKG5ld09iaikge1xyXG4gICAgICAgICAgICB2YXIgcmVxdWlyZWRQcm9wZXJ0aWVzID0gSnNvbk9iamVjdC5tZXRhRGF0YS5nZXRSZXF1aXJlZFByb3BlcnRpZXMoY2xhc3NOYW1lKTtcclxuICAgICAgICAgICAgaWYgKHJlcXVpcmVkUHJvcGVydGllcykge1xyXG4gICAgICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCByZXF1aXJlZFByb3BlcnRpZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgICAgICAgICBpZiAoIXZhbHVlW3JlcXVpcmVkUHJvcGVydGllc1tpXV0pIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgZXJyb3IgPSBuZXcgSnNvblJlcXVpcmVkUHJvcGVydHlFcnJvcihyZXF1aXJlZFByb3BlcnRpZXNbaV0sIGNsYXNzTmFtZSk7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmIChwcm9wZXJ0eS5iYXNlQ2xhc3NOYW1lKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWNsYXNzTmFtZSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGVycm9yID0gbmV3IEpzb25NaXNzaW5nVHlwZUVycm9yKHByb3BlcnR5Lm5hbWUsIHByb3BlcnR5LmJhc2VDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICAgICBlcnJvciA9IG5ldyBKc29uSW5jb3JyZWN0VHlwZUVycm9yKHByb3BlcnR5Lm5hbWUsIHByb3BlcnR5LmJhc2VDbGFzc05hbWUpO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICB0aGlzLmFkZE5ld0Vycm9yKGVycm9yLCB2YWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBlcnJvcjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgYWRkTmV3RXJyb3IoZXJyb3I6IEpzb25FcnJvciwganNvbk9iajogYW55KSB7XHJcbiAgICAgICAgaWYgKGpzb25PYmogJiYganNvbk9ialtKc29uT2JqZWN0LnBvc2l0aW9uUHJvcGVydHlOYW1lXSkge1xyXG4gICAgICAgICAgICBlcnJvci5hdCA9IGpzb25PYmpbSnNvbk9iamVjdC5wb3NpdGlvblByb3BlcnR5TmFtZV0uc3RhcnQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuZXJyb3JzLnB1c2goZXJyb3IpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB2YWx1ZVRvQXJyYXkodmFsdWU6IEFycmF5PGFueT4sIG9iajogYW55LCBrZXk6IGFueSwgcHJvcGVydHk6IEpzb25PYmplY3RQcm9wZXJ0eSkge1xyXG4gICAgICAgIGlmICghdGhpcy5pc1ZhbHVlQXJyYXkob2JqW2tleV0pKSB7XHJcbiAgICAgICAgICAgIG9ialtrZXldID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdmFsdWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gdGhpcy5jcmVhdGVOZXdPYmoodmFsdWVbaV0sIHByb3BlcnR5KTtcclxuICAgICAgICAgICAgaWYgKG5ld1ZhbHVlLm5ld09iaikge1xyXG4gICAgICAgICAgICAgICAgb2JqW2tleV0ucHVzaChuZXdWYWx1ZS5uZXdPYmopO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50b09iamVjdCh2YWx1ZVtpXSwgbmV3VmFsdWUubmV3T2JqKTtcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIGlmICghbmV3VmFsdWUuZXJyb3IpIHtcclxuICAgICAgICAgICAgICAgICAgICBvYmpba2V5XS5wdXNoKHZhbHVlW2ldKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgZmluZFByb3BlcnR5KHByb3BlcnRpZXM6IEFycmF5PEpzb25PYmplY3RQcm9wZXJ0eT4sIGtleTogYW55KTogSnNvbk9iamVjdFByb3BlcnR5IHtcclxuICAgICAgICBpZiAoIXByb3BlcnRpZXMpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcHJvcGVydGllcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocHJvcGVydGllc1tpXS5uYW1lID09IGtleSkgcmV0dXJuIHByb3BlcnRpZXNbaV07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBudWxsO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvanNvbm9iamVjdC50c1xuICoqLyIsImltcG9ydCB7QmFzZSwgSXRlbVZhbHVlLCBTdXJ2ZXlFcnJvcn0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuL3N1cnZleVN0cmluZ3NcIjtcclxuaW1wb3J0IHtDdXN0b21FcnJvcn0gZnJvbSBcIi4vZXJyb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBDaG9pY2VzUmVzdGZ1bGwgZXh0ZW5kcyBCYXNlIHtcclxuICAgIHB1YmxpYyB1cmw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgcGF0aDogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyB2YWx1ZU5hbWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgdGl0bGVOYW1lOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIGdldFJlc3VsdENhbGxiYWNrOiAoaXRlbXM6IEFycmF5PEl0ZW1WYWx1ZT4pID0+IHZvaWQ7XHJcbiAgICBwdWJsaWMgZXJyb3I6IFN1cnZleUVycm9yID0gbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcnVuKCkge1xyXG4gICAgICAgIGlmICghdGhpcy51cmwgfHwgIXRoaXMuZ2V0UmVzdWx0Q2FsbGJhY2spIHJldHVybjtcclxuICAgICAgICB0aGlzLmVycm9yID0gbnVsbDtcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIHRoaXMudXJsKTtcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHNlbGYub25Mb2FkKEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLm9uRXJyb3IoeGhyLnN0YXR1c1RleHQsIHhoci5yZXNwb25zZVRleHQpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIFwiY2hvaWNlc0J5VXJsXCI7IH1cclxuICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIXRoaXMudXJsICYmICF0aGlzLnBhdGggJiYgIXRoaXMudmFsdWVOYW1lICYmICF0aGlzLnRpdGxlTmFtZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXREYXRhKGpzb246IGFueSkge1xyXG4gICAgICAgIHRoaXMuY2xlYXIoKTtcclxuICAgICAgICBpZiAoanNvbi51cmwpIHRoaXMudXJsID0ganNvbi51cmw7XHJcbiAgICAgICAgaWYgKGpzb24ucGF0aCkgdGhpcy5wYXRoID0ganNvbi5wYXRoO1xyXG4gICAgICAgIGlmIChqc29uLnZhbHVlTmFtZSkgdGhpcy52YWx1ZU5hbWUgPSBqc29uLnZhbHVlTmFtZTtcclxuICAgICAgICBpZiAoanNvbi50aXRsZU5hbWUpIHRoaXMudGl0bGVOYW1lID0ganNvbi50aXRsZU5hbWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy51cmwgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMucGF0aCA9IFwiXCI7XHJcbiAgICAgICAgdGhpcy52YWx1ZU5hbWUgPSBcIlwiO1xyXG4gICAgICAgIHRoaXMudGl0bGVOYW1lID0gXCJcIjtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkxvYWQocmVzdWx0OiBhbnkpIHtcclxuICAgICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgICByZXN1bHQgPSB0aGlzLmdldFJlc3VsdEFmdGVyUGF0aChyZXN1bHQpO1xyXG4gICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0W1wibGVuZ3RoXCJdKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgaXRlbVZhbHVlID0gcmVzdWx0W2ldO1xyXG4gICAgICAgICAgICAgICAgaWYgKCFpdGVtVmFsdWUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICAgICAgdmFyIHZhbHVlID0gdGhpcy5nZXRWYWx1ZShpdGVtVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgdmFyIHRpdGxlID0gdGhpcy5nZXRUaXRsZShpdGVtVmFsdWUpO1xyXG4gICAgICAgICAgICAgICAgaXRlbXMucHVzaChuZXcgSXRlbVZhbHVlKHZhbHVlLCB0aXRsZSkpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvciA9IG5ldyBDdXN0b21FcnJvcihzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwidXJsR2V0Q2hvaWNlc0Vycm9yXCIpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5nZXRSZXN1bHRDYWxsYmFjayhpdGVtcyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uRXJyb3Ioc3RhdHVzOiBzdHJpbmcsIHJlc3BvbnNlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmVycm9yID0gbmV3IEN1c3RvbUVycm9yKHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJ1cmxSZXF1ZXN0RXJyb3JcIilbXCJmb3JtYXRcIl0oc3RhdHVzLCByZXNwb25zZSkpO1xyXG4gICAgICAgIHRoaXMuZ2V0UmVzdWx0Q2FsbGJhY2soW10pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRSZXN1bHRBZnRlclBhdGgocmVzdWx0OiBhbnkpIHtcclxuICAgICAgICBpZiAoIXJlc3VsdCkgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICBpZiAoIXRoaXMucGF0aCkgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICB2YXIgcGF0aGVzID0gdGhpcy5nZXRQYXRoZXMoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhdGhlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHQgPSByZXN1bHRbcGF0aGVzW2ldXTtcclxuICAgICAgICAgICAgaWYgKCFyZXN1bHQpIHJldHVybiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRQYXRoZXMoKTogQXJyYXk8c3RyaW5nPiB7XHJcbiAgICAgICAgdmFyIHBhdGhlcyA9IFtdO1xyXG4gICAgICAgIGlmICh0aGlzLnBhdGguaW5kZXhPZignOycpID4gLTEpIHtcclxuICAgICAgICAgICAgcGF0aGVzID0gdGhpcy5wYXRoLnNwbGl0KCc7Jyk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgcGF0aGVzID0gdGhpcy5wYXRoLnNwbGl0KCcsJyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChwYXRoZXMubGVuZ3RoID09IDApIHBhdGhlcy5wdXNoKHRoaXMucGF0aCk7XHJcbiAgICAgICAgcmV0dXJuIHBhdGhlcztcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0VmFsdWUoaXRlbTogYW55KTogYW55IHtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZU5hbWUpIHJldHVybiBpdGVtW3RoaXMudmFsdWVOYW1lXTtcclxuICAgICAgICB2YXIgbGVuID0gT2JqZWN0LmtleXMoaXRlbSkubGVuZ3RoO1xyXG4gICAgICAgIGlmIChsZW4gPCAxKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gaXRlbVtPYmplY3Qua2V5cyhpdGVtKVswXV07XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldFRpdGxlKGl0ZW06IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnRpdGxlTmFtZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1bdGhpcy50aXRsZU5hbWVdO1xyXG4gICAgfVxyXG59XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJjaG9pY2VzQnlVcmxcIiwgW1widXJsXCIsIFwicGF0aFwiLCBcInZhbHVlTmFtZVwiLCBcInRpdGxlTmFtZVwiXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IENob2ljZXNSZXN0ZnVsbCgpOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9jaG9pY2VzUmVzdGZ1bGwudHNcbiAqKi8iLCJpbXBvcnQge0hhc2hUYWJsZX0gZnJvbSAnLi9iYXNlJztcclxuaW1wb3J0IHtDb25kaXRpb25zUGFyc2VyfSBmcm9tICcuL2NvbmRpdGlvbnNQYXJzZXInO1xyXG5cclxuZXhwb3J0IGNsYXNzIENvbmRpdGlvbiB7XHJcbiAgICBzdGF0aWMgb3BlcmF0b3JzVmFsdWU6IEhhc2hUYWJsZTxGdW5jdGlvbj4gPSBudWxsO1xyXG4gICAgc3RhdGljIGdldCBvcGVyYXRvcnMoKSB7XHJcbiAgICAgICAgaWYgKENvbmRpdGlvbi5vcGVyYXRvcnNWYWx1ZSAhPSBudWxsKSByZXR1cm4gQ29uZGl0aW9uLm9wZXJhdG9yc1ZhbHVlO1xyXG4gICAgICAgIENvbmRpdGlvbi5vcGVyYXRvcnNWYWx1ZSA9IHtcclxuICAgICAgICAgICAgZW1wdHk6IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gIWxlZnQ7IH0sXHJcbiAgICAgICAgICAgIG5vdGVtcHR5OiBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHsgcmV0dXJuICEoIWxlZnQpOyB9LFxyXG4gICAgICAgICAgICBlcXVhbDogZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiBsZWZ0ID09IHJpZ2h0OyB9LFxyXG4gICAgICAgICAgICBub3RlcXVhbDogZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiBsZWZ0ICE9IHJpZ2h0OyB9LFxyXG4gICAgICAgICAgICBjb250YWluczogZnVuY3Rpb24gKGxlZnQsIHJpZ2h0KSB7IHJldHVybiBsZWZ0ICYmIGxlZnRbXCJpbmRleE9mXCJdICYmIGxlZnQuaW5kZXhPZihyaWdodCkgPiAtMTsgfSxcclxuICAgICAgICAgICAgbm90Y29udGFpbnM6IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gIWxlZnQgfHwgIWxlZnRbXCJpbmRleE9mXCJdIHx8IGxlZnQuaW5kZXhPZihyaWdodCkgPT0gLTE7IH0sXHJcbiAgICAgICAgICAgIGdyZWF0ZXI6IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gbGVmdCA+IHJpZ2h0OyB9LFxyXG4gICAgICAgICAgICBsZXNzOiBmdW5jdGlvbiAobGVmdCwgcmlnaHQpIHsgcmV0dXJuIGxlZnQgPCByaWdodDsgfSxcclxuICAgICAgICAgICAgZ3JlYXRlcm9yZXF1YWw6IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gbGVmdCA+PSByaWdodDsgfSxcclxuICAgICAgICAgICAgbGVzc29yZXF1YWw6IGZ1bmN0aW9uIChsZWZ0LCByaWdodCkgeyByZXR1cm4gbGVmdCA8PSByaWdodDsgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIENvbmRpdGlvbi5vcGVyYXRvcnNWYWx1ZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgb3BWYWx1ZTogc3RyaW5nID0gXCJlcXVhbFwiO1xyXG4gICAgcHVibGljIGxlZnQ6IGFueTtcclxuICAgIHB1YmxpYyByaWdodDogYW55O1xyXG4gICAgcHVibGljIGdldCBvcGVyYXRvcigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5vcFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IG9wZXJhdG9yKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgdmFsdWUgPSB2YWx1ZS50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmICghQ29uZGl0aW9uLm9wZXJhdG9yc1t2YWx1ZV0pIHJldHVybjtcclxuICAgICAgICB0aGlzLm9wVmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBwZXJmb3JtKGxlZnQ6IGFueSA9IG51bGwsIHJpZ2h0OiBhbnkgPSBudWxsKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCFsZWZ0KSBsZWZ0ID0gdGhpcy5sZWZ0O1xyXG4gICAgICAgIGlmICghcmlnaHQpIHJpZ2h0ID0gdGhpcy5yaWdodDtcclxuXHJcbiAgICAgICAgcmV0dXJuIENvbmRpdGlvbi5vcGVyYXRvcnNbdGhpcy5vcGVyYXRvcl0odGhpcy5nZXRQdXJlVmFsdWUobGVmdCksIHRoaXMuZ2V0UHVyZVZhbHVlKHJpZ2h0KSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldFB1cmVWYWx1ZSh2YWw6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKCF2YWwgfHwgKHR5cGVvZiB2YWwgIT0gXCJzdHJpbmdcIikpIHJldHVybiB2YWw7XHJcbiAgICAgICAgdmFyIHN0ciA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHZhbC5sZW5ndGggPiAwICYmICh2YWxbMF0gPT0gXCInXCIgfHwgdmFsWzBdID09ICdcIicpKSAgdmFsID0gdmFsLnN1YnN0cigxKTtcclxuICAgICAgICB2YXIgbGVuID0gdmFsLmxlbmd0aDtcclxuICAgICAgICBpZiAobGVuID4gMCAmJiAodmFsW2xlbiAtIDFdID09IFwiJ1wiIHx8IHZhbFtsZW4gLSAxXSA9PSAnXCInKSkgIHZhbCA9IHZhbC5zdWJzdHIoMCwgbGVuIC0gMSk7XHJcbiAgICAgICAgcmV0dXJuIHZhbDtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uTm9kZSB7XHJcbiAgICBwcml2YXRlIGNvbm5lY3RpdmVWYWx1ZTogc3RyaW5nID0gXCJhbmRcIjtcclxuICAgIHB1YmxpYyBjaGlsZHJlbjogQXJyYXk8YW55PiA9IFtdO1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKCkgeyB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbm5lY3RpdmUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuY29ubmVjdGl2ZVZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGNvbm5lY3RpdmUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIGlmICghdmFsdWUpIHJldHVybjtcclxuICAgICAgICB2YWx1ZSA9IHZhbHVlLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKHZhbHVlID09IFwiJlwiIHx8IHZhbHVlID09IFwiJiZcIikgdmFsdWUgPSBcImFuZFwiO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PSBcInxcIiB8fCB2YWx1ZSA9PSBcInx8XCIpIHZhbHVlID0gXCJvclwiO1xyXG4gICAgICAgIGlmICh2YWx1ZSAhPSBcImFuZFwiICYmIHZhbHVlICE9IFwib3JcIikgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGl2ZVZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzRW1wdHkoKSB7IHJldHVybiB0aGlzLmNoaWxkcmVuLmxlbmd0aCA9PSAwOyB9XHJcbiAgICBwdWJsaWMgY2xlYXIoKSB7XHJcbiAgICAgICAgdGhpcy5jaGlsZHJlbiA9IFtdO1xyXG4gICAgICAgIHRoaXMuY29ubmVjdGl2ZSA9IFwiYW5kXCI7XHJcbiAgICB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIENvbmRpdGlvblJ1bm5lciB7XHJcbiAgICBwcml2YXRlIGV4cHJlc3Npb25WYWx1ZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSByb290OiBDb25kaXRpb25Ob2RlO1xyXG4gICAgcHJpdmF0ZSB2YWx1ZXM6IEhhc2hUYWJsZTxhbnk+O1xyXG4gICAgcHVibGljIGNvbnN0cnVjdG9yKGV4cHJlc3Npb246IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMucm9vdCA9IG5ldyBDb25kaXRpb25Ob2RlKCk7XHJcbiAgICAgICAgdGhpcy5leHByZXNzaW9uID0gZXhwcmVzc2lvbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgZXhwcmVzc2lvbigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5leHByZXNzaW9uVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgZXhwcmVzc2lvbih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZXhwcmVzc2lvbiA9PSB2YWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuZXhwcmVzc2lvblZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgbmV3IENvbmRpdGlvbnNQYXJzZXIoKS5wYXJzZSh0aGlzLmV4cHJlc3Npb25WYWx1ZSwgdGhpcy5yb290KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBydW4odmFsdWVzOiBIYXNoVGFibGU8YW55Pik6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMudmFsdWVzID0gdmFsdWVzO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJ1bk5vZGUodGhpcy5yb290KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcnVuTm9kZShub2RlOiBDb25kaXRpb25Ob2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIG9uRmlyc3RGYWlsID0gbm9kZS5jb25uZWN0aXZlID09IFwiYW5kXCI7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciByZXMgPSB0aGlzLnJ1bk5vZGVDb25kaXRpb24obm9kZS5jaGlsZHJlbltpXSk7XHJcbiAgICAgICAgICAgIGlmICghcmVzICYmIG9uRmlyc3RGYWlsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmIChyZXMgJiYgIW9uRmlyc3RGYWlsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG9uRmlyc3RGYWlsO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBydW5Ob2RlQ29uZGl0aW9uKHZhbHVlOiBhbnkpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXZhbHVlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHZhbHVlW1wiY2hpbGRyZW5cIl0pIHJldHVybiB0aGlzLnJ1bk5vZGUodmFsdWUpO1xyXG4gICAgICAgIGlmICh2YWx1ZVtcImxlZnRcIl0pIHJldHVybiB0aGlzLnJ1bkNvbmRpdGlvbih2YWx1ZSk7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBydW5Db25kaXRpb24oY29uZGl0aW9uOiBDb25kaXRpb24pOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgbGVmdCA9IGNvbmRpdGlvbi5sZWZ0O1xyXG4gICAgICAgIHZhciBuYW1lID0gdGhpcy5nZXRWYWx1ZU5hbWUobGVmdCk7XHJcbiAgICAgICAgaWYgKG5hbWUpIHtcclxuICAgICAgICAgICAgaWYgKCEobmFtZSBpbiB0aGlzLnZhbHVlcykpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgbGVmdCA9IHRoaXMudmFsdWVzW25hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgcmlnaHQgPSBjb25kaXRpb24ucmlnaHQ7XHJcbiAgICAgICAgbmFtZSA9IHRoaXMuZ2V0VmFsdWVOYW1lKHJpZ2h0KTtcclxuICAgICAgICBpZiAobmFtZSkge1xyXG4gICAgICAgICAgICBpZiAoIShuYW1lIGluIHRoaXMudmFsdWVzKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgICAgICByaWdodCA9IHRoaXMudmFsdWVzW25hbWVdO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gY29uZGl0aW9uLnBlcmZvcm0obGVmdCwgcmlnaHQpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRWYWx1ZU5hbWUobm9kZVZhbHVlOiBhbnkpIHtcclxuICAgICAgICBpZiAoIW5vZGVWYWx1ZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgaWYgKHR5cGVvZiBub2RlVmFsdWUgIT09ICdzdHJpbmcnKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBpZiAobm9kZVZhbHVlLmxlbmd0aCA8IDMgfHwgbm9kZVZhbHVlWzBdICE9ICd7JyB8fCBub2RlVmFsdWVbbm9kZVZhbHVlLmxlbmd0aCAtIDFdICE9ICd9JykgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIG5vZGVWYWx1ZS5zdWJzdHIoMSwgbm9kZVZhbHVlLmxlbmd0aCAtIDIpO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvY29uZGl0aW9ucy50c1xuICoqLyIsImltcG9ydCB7Q29uZGl0aW9uLCBDb25kaXRpb25Ob2RlfSBmcm9tIFwiLi9jb25kaXRpb25zXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgQ29uZGl0aW9uc1BhcnNlciB7XHJcbiAgICBwcml2YXRlIHRleHQ6IHN0cmluZztcclxuICAgIHByaXZhdGUgcm9vdDogQ29uZGl0aW9uTm9kZTtcclxuICAgIHByaXZhdGUgZXhwcmVzc2lvbk5vZGVzOiBBcnJheTxDb25kaXRpb25Ob2RlPjtcclxuICAgIHByaXZhdGUgbm9kZTogQ29uZGl0aW9uTm9kZTtcclxuICAgIHByaXZhdGUgYXQ6IG51bWJlcjtcclxuICAgIHByaXZhdGUgbGVuZ3RoOiBudW1iZXI7XHJcbiAgICBwdWJsaWMgcGFyc2UodGV4dDogc3RyaW5nLCByb290OiBDb25kaXRpb25Ob2RlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy50ZXh0ID0gdGV4dDtcclxuICAgICAgICB0aGlzLnJvb3QgPSByb290O1xyXG4gICAgICAgIHRoaXMucm9vdC5jbGVhcigpO1xyXG4gICAgICAgIHRoaXMuYXQgPSAwO1xyXG4gICAgICAgIHRoaXMubGVuZ3RoID0gdGhpcy50ZXh0Lmxlbmd0aDtcclxuICAgICAgICB2YXIgcmVzID0gdGhpcy5wYXJzZVRleHQoKTtcclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHRvU3RyaW5nKHJvb3Q6IENvbmRpdGlvbk5vZGUpOiBzdHJpbmcge1xyXG4gICAgICAgIHRoaXMucm9vdCA9IHJvb3Q7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMubm9kZVRvU3RyaW5nKHJvb3QpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSB0b1N0cmluZ0NvcmUodmFsdWU6IGFueSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgaWYgKHZhbHVlW1wiY2hpbGRyZW5cIl0pIHJldHVybiB0aGlzLm5vZGVUb1N0cmluZyh2YWx1ZSk7XHJcbiAgICAgICAgaWYgKHZhbHVlW1wibGVmdFwiXSkgcmV0dXJuIHRoaXMuY29uZGl0aW9uVG9TdHJpbmcodmFsdWUpO1xyXG4gICAgICAgIHJldHVybiBcIlwiO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBub2RlVG9TdHJpbmcobm9kZTogQ29uZGl0aW9uTm9kZSk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKG5vZGUuaXNFbXB0eSkgcmV0dXJuIFwiXCI7XHJcbiAgICAgICAgdmFyIHJlcyA9IFwiXCI7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBub2RlLmNoaWxkcmVuLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBub2RlVGV4dCA9IHRoaXMudG9TdHJpbmdDb3JlKG5vZGUuY2hpbGRyZW5baV0pO1xyXG4gICAgICAgICAgICBpZiAobm9kZVRleHQpIHtcclxuICAgICAgICAgICAgICAgIGlmIChyZXMpIHJlcyArPSAnICcgKyBub2RlLmNvbm5lY3RpdmUgKyAnICc7XHJcbiAgICAgICAgICAgICAgICByZXMgKz0gbm9kZVRleHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5vZGUgIT0gdGhpcy5yb290ICYmIG5vZGUuY2hpbGRyZW4ubGVuZ3RoID4gMSkge1xyXG4gICAgICAgICAgICByZXMgPSAnKCcgKyByZXMgKyAnKSc7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNvbmRpdGlvblRvU3RyaW5nKGNvbmRpdGlvbjogQ29uZGl0aW9uKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIWNvbmRpdGlvbi5yaWdodCB8fCAhY29uZGl0aW9uLm9wZXJhdG9yKSByZXR1cm4gXCJcIjtcclxuICAgICAgICB2YXIgbGVmdCA9IGNvbmRpdGlvbi5sZWZ0O1xyXG4gICAgICAgIGlmIChsZWZ0ICYmICF0aGlzLmlzTnVtZXJpYyhsZWZ0KSkgbGVmdCA9IFwiJ1wiICsgbGVmdCArIFwiJ1wiO1xyXG4gICAgICAgIHZhciByZXMgPSBsZWZ0ICsgJyAnICsgdGhpcy5vcGVyYXRpb25Ub1N0cmluZyhjb25kaXRpb24ub3BlcmF0b3IpO1xyXG4gICAgICAgIGlmICh0aGlzLmlzTm9SaWdodE9wZXJhdGlvbihjb25kaXRpb24ub3BlcmF0b3IpKSByZXR1cm4gcmVzO1xyXG4gICAgICAgIHZhciByaWdodCA9IGNvbmRpdGlvbi5yaWdodDtcclxuICAgICAgICBpZiAocmlnaHQgJiYgIXRoaXMuaXNOdW1lcmljKHJpZ2h0KSkgcmlnaHQgPSBcIidcIiArIHJpZ2h0ICsgXCInXCI7XHJcbiAgICAgICAgcmV0dXJuIHJlcyArICcgJyArIHJpZ2h0O1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvcGVyYXRpb25Ub1N0cmluZyhvcDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAob3AgPT0gXCJlcXVhbFwiKSByZXR1cm4gXCI9XCI7XHJcbiAgICAgICAgaWYgKG9wID09IFwibm90ZXF1YWxcIikgcmV0dXJuIFwiIT1cIjtcclxuICAgICAgICBpZiAob3AgPT0gXCJncmVhdGVyXCIpIHJldHVybiBcIj5cIjtcclxuICAgICAgICBpZiAob3AgPT0gXCJsZXNzXCIpIHJldHVybiBcIjxcIjtcclxuICAgICAgICBpZiAob3AgPT0gXCJncmVhdGVyb3JlcXVhbFwiKSByZXR1cm4gXCI+PVwiO1xyXG4gICAgICAgIGlmIChvcCA9PSBcImxlc3NvcmVxdWFsXCIpIHJldHVybiBcIjw9XCI7XHJcbiAgICAgICAgcmV0dXJuIG9wO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc051bWVyaWModmFsdWU6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciB2YWwgPSBwYXJzZUZsb2F0KHZhbHVlKTtcclxuICAgICAgICBpZiAoaXNOYU4odmFsKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHJldHVybiBpc0Zpbml0ZSh2YWwpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBwYXJzZVRleHQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdGhpcy5ub2RlID0gdGhpcy5yb290O1xyXG4gICAgICAgIHRoaXMuZXhwcmVzc2lvbk5vZGVzID0gW107XHJcbiAgICAgICAgdGhpcy5leHByZXNzaW9uTm9kZXMucHVzaCh0aGlzLm5vZGUpO1xyXG4gICAgICAgIHZhciByZXMgPSB0aGlzLnJlYWRDb25kaXRpb25zKCk7XHJcbiAgICAgICAgcmV0dXJuIHJlcyAmJiB0aGlzLmF0ID49IHRoaXMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSByZWFkQ29uZGl0aW9ucygpOiBib29sZWFuIHtcclxuICAgICAgICB2YXIgcmVzID0gdGhpcy5yZWFkQ29uZGl0aW9uKCk7XHJcbiAgICAgICAgaWYgKCFyZXMpIHJldHVybiByZXM7XHJcbiAgICAgICAgdmFyIGNvbm5lY3RpdmUgPSB0aGlzLnJlYWRDb25uZWN0aXZlKCk7XHJcbiAgICAgICAgaWYgKGNvbm5lY3RpdmUpIHtcclxuICAgICAgICAgICAgdGhpcy5hZGRDb25uZWN0aXZlKGNvbm5lY3RpdmUpO1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5yZWFkQ29uZGl0aW9ucygpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcmVhZENvbmRpdGlvbigpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMucmVhZEV4cHJlc3Npb24oKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciBsZWZ0ID0gdGhpcy5yZWFkU3RyaW5nKCk7XHJcbiAgICAgICAgaWYgKCFsZWZ0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIG9wID0gdGhpcy5yZWFkT3BlcmF0b3IoKTtcclxuICAgICAgICBpZiAoIW9wKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIGMgPSBuZXcgQ29uZGl0aW9uKCk7XHJcbiAgICAgICAgYy5sZWZ0ID0gbGVmdDsgYy5vcGVyYXRvciA9IG9wO1xyXG4gICAgICAgIGlmICghdGhpcy5pc05vUmlnaHRPcGVyYXRpb24ob3ApKSB7XHJcbiAgICAgICAgICAgIHZhciByaWdodCA9IHRoaXMucmVhZFN0cmluZygpO1xyXG4gICAgICAgICAgICBpZiAoIXJpZ2h0KSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGMucmlnaHQgPSByaWdodDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5hZGRDb25kaXRpb24oYyk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJlYWRFeHByZXNzaW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHRoaXMuc2tpcCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmF0ID49IHRoaXMubGVuZ3RoIHx8IHRoaXMuY2ggIT0gJygnKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB0aGlzLmF0Kys7XHJcbiAgICAgICAgdGhpcy5wdXNoRXhwcmVzc2lvbigpO1xyXG4gICAgICAgIHZhciByZXMgPSB0aGlzLnJlYWRDb25kaXRpb25zKCk7XHJcbiAgICAgICAgaWYgKHJlcykge1xyXG4gICAgICAgICAgICB0aGlzLnNraXAoKTtcclxuICAgICAgICAgICAgcmVzID0gdGhpcy5jaCA9PSAnKSc7XHJcbiAgICAgICAgICAgIHRoaXMuYXQrKztcclxuICAgICAgICAgICAgdGhpcy5wb3BFeHByZXNzaW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldCBjaCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy50ZXh0LmNoYXJBdCh0aGlzLmF0KTsgfVxyXG4gICAgcHJpdmF0ZSBza2lwKCkge1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmF0IDwgdGhpcy5sZW5ndGggJiYgdGhpcy5pc1NwYWNlKHRoaXMuY2gpKSB0aGlzLmF0Kys7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzU3BhY2UoYzogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGMgPT0gJyAnIHx8IGMgPT0gJ1xcbicgfHwgYyA9PSAnXFx0JyB8fCBjID09ICdcXHInO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc1F1b3RlcyhjOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gYyA9PSBcIidcIiB8fCBjID09ICdcIidcclxuICAgIH1cclxuICAgIHByaXZhdGUgaXNPcGVyYXRvckNoYXIoYzogc3RyaW5nKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIGMgPT0gJz4nIHx8IGMgPT0gJzwnIHx8IGMgPT0gJz0nIHx8IGMgPT0gJyEnO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc0JyYWNrZXRzKGM6IHN0cmluZyk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHJldHVybiBjID09ICcoJyB8fCBjID09ICcpJztcclxuICAgIH1cclxuICAgIHByaXZhdGUgcmVhZFN0cmluZygpOiBzdHJpbmcge1xyXG4gICAgICAgIHRoaXMuc2tpcCgpO1xyXG4gICAgICAgIGlmICh0aGlzLmF0ID49IHRoaXMubGVuZ3RoKSByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgc3RhcnQgPSB0aGlzLmF0O1xyXG4gICAgICAgIHZhciBoYXNRdW90ZXMgPSB0aGlzLmlzUXVvdGVzKHRoaXMuY2gpO1xyXG4gICAgICAgIGlmIChoYXNRdW90ZXMpIHRoaXMuYXQrKztcclxuICAgICAgICB2YXIgaXNGaXJzdE9wQ2ggPSB0aGlzLmlzT3BlcmF0b3JDaGFyKHRoaXMuY2gpO1xyXG4gICAgICAgIHdoaWxlICh0aGlzLmF0IDwgdGhpcy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgaWYgKCFoYXNRdW90ZXMgJiYgdGhpcy5pc1NwYWNlKHRoaXMuY2gpKSBicmVhaztcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNRdW90ZXModGhpcy5jaCkpIHtcclxuICAgICAgICAgICAgICAgIGlmIChoYXNRdW90ZXMpIHRoaXMuYXQrKztcclxuICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIGlmICghaGFzUXVvdGVzKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoaXNGaXJzdE9wQ2ggIT0gdGhpcy5pc09wZXJhdG9yQ2hhcih0aGlzLmNoKSkgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5pc0JyYWNrZXRzKHRoaXMuY2gpKSBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLmF0Kys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmF0IDw9IHN0YXJ0KSByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgcmVzID0gdGhpcy50ZXh0LnN1YnN0cihzdGFydCwgdGhpcy5hdCAtIHN0YXJ0KTtcclxuICAgICAgICBpZiAocmVzKSB7XHJcbiAgICAgICAgICAgIGlmIChyZXMubGVuZ3RoID4gMSAmJiB0aGlzLmlzUXVvdGVzKHJlc1swXSkpIHtcclxuICAgICAgICAgICAgICAgIHZhciBsZW4gPSByZXMubGVuZ3RoIC0gMTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzUXVvdGVzKHJlc1tyZXMubGVuZ3RoIC0gMV0pKSBsZW4tLTtcclxuICAgICAgICAgICAgICAgIHJlcyA9IHJlcy5zdWJzdHIoMSwgbGVuKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc05vUmlnaHRPcGVyYXRpb24ob3A6IHN0cmluZykge1xyXG4gICAgICAgIHJldHVybiBvcCA9PSBcImVtcHR5XCIgfHwgb3AgPT0gXCJub3RlbXB0eVwiO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSByZWFkT3BlcmF0b3IoKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgb3AgPSB0aGlzLnJlYWRTdHJpbmcoKTtcclxuICAgICAgICBpZiAoIW9wKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBvcCA9IG9wLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKG9wID09ICc+Jykgb3AgPSBcImdyZWF0ZXJcIjtcclxuICAgICAgICBpZiAob3AgPT0gJzwnKSBvcCA9IFwibGVzc1wiO1xyXG4gICAgICAgIGlmIChvcCA9PSAnPj0nIHx8IG9wID09ICc9PicpIG9wID0gXCJncmVhdGVyb3JlcXVhbFwiO1xyXG4gICAgICAgIGlmIChvcCA9PSAnPD0nIHx8IG9wID09ICc9PCcpIG9wID0gXCJsZXNzb3JlcXVhbFwiO1xyXG4gICAgICAgIGlmIChvcCA9PSAnPScgfHwgb3AgPT0gJz09Jykgb3AgPSBcImVxdWFsXCI7XHJcbiAgICAgICAgaWYgKG9wID09ICc8PicgfHwgb3AgPT0gJyE9Jykgb3AgPSBcIm5vdGVxdWFsXCI7XHJcbiAgICAgICAgaWYgKG9wID09ICdjb250YWluJykgb3AgPSBcImNvbnRhaW5zXCI7XHJcbiAgICAgICAgaWYgKG9wID09ICdub3Rjb250YWluJykgb3AgPSBcIm5vdGNvbnRhaW5zXCI7XHJcbiAgICAgICAgcmV0dXJuIG9wO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSByZWFkQ29ubmVjdGl2ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBjb24gPSB0aGlzLnJlYWRTdHJpbmcoKTtcclxuICAgICAgICBpZiAoIWNvbikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgY29uID0gY29uLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgaWYgKGNvbiA9PSBcIiZcIiB8fCBjb24gPT0gXCImJlwiKSBjb24gPSBcImFuZFwiO1xyXG4gICAgICAgIGlmIChjb24gPT0gXCJ8XCIgfHwgY29uID09IFwifHxcIikgY29uID0gXCJvclwiO1xyXG4gICAgICAgIGlmIChjb24gIT0gXCJhbmRcIiAmJiBjb24gIT0gXCJvclwiKSBjb24gPSBudWxsO1xyXG4gICAgICAgIHJldHVybiBjb247XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHB1c2hFeHByZXNzaW9uKCkge1xyXG4gICAgICAgIHZhciBub2RlID0gbmV3IENvbmRpdGlvbk5vZGUoKTtcclxuICAgICAgICB0aGlzLmV4cHJlc3Npb25Ob2Rlcy5wdXNoKG5vZGUpO1xyXG4gICAgICAgIHRoaXMubm9kZSA9IG5vZGU7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHBvcEV4cHJlc3Npb24oKSB7XHJcbiAgICAgICAgdmFyIG5vZGUgPSB0aGlzLmV4cHJlc3Npb25Ob2Rlcy5wb3AoKTtcclxuICAgICAgICB0aGlzLm5vZGUgPSB0aGlzLmV4cHJlc3Npb25Ob2Rlc1t0aGlzLmV4cHJlc3Npb25Ob2Rlcy5sZW5ndGggLSAxXTtcclxuICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW4ucHVzaChub2RlKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgYWRkQ29uZGl0aW9uKGM6IENvbmRpdGlvbikge1xyXG4gICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbi5wdXNoKGMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBhZGRDb25uZWN0aXZlKGNvbjogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMubm9kZS5jaGlsZHJlbi5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgIHRoaXMubm9kZS5jb25uZWN0aXZlID0gY29uO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLm5vZGUuY29ubmVjdGl2ZSAhPSBjb24pIHtcclxuICAgICAgICAgICAgICAgIHZhciBvbGRDb24gPSB0aGlzLm5vZGUuY29ubmVjdGl2ZTtcclxuICAgICAgICAgICAgICAgIHZhciBvbGRDaGlsZHJlbiA9IHRoaXMubm9kZS5jaGlsZHJlbjtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jbGVhcigpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlLmNvbm5lY3RpdmUgPSBjb247XHJcbiAgICAgICAgICAgICAgICB2YXIgb2xkTm9kZSA9IG5ldyBDb25kaXRpb25Ob2RlKCk7XHJcbiAgICAgICAgICAgICAgICBvbGROb2RlLmNvbm5lY3RpdmUgPSBvbGRDb247XHJcbiAgICAgICAgICAgICAgICBvbGROb2RlLmNoaWxkcmVuID0gb2xkQ2hpbGRyZW47XHJcbiAgICAgICAgICAgICAgICB0aGlzLm5vZGUuY2hpbGRyZW4ucHVzaChvbGROb2RlKTtcclxuICAgICAgICAgICAgICAgIHZhciBuZXdOb2RlID0gbmV3IENvbmRpdGlvbk5vZGUoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMubm9kZS5jaGlsZHJlbi5wdXNoKG5ld05vZGUpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5ub2RlID0gbmV3Tm9kZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2NvbmRpdGlvbnNQYXJzZXIudHNcbiAqKi8iLCJpbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4vcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtCYXNlLCBJdGVtVmFsdWUsIElTdXJ2ZXlEYXRhLCBIYXNoVGFibGV9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuL3N1cnZleVN0cmluZ3NcIjtcclxuaW1wb3J0IHtRdWVzdGlvblNlbGVjdEJhc2V9IGZyb20gXCIuL3F1ZXN0aW9uX2Jhc2VzZWxlY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkRyb3Bkb3duTW9kZWx9IGZyb20gXCIuL3F1ZXN0aW9uX2Ryb3Bkb3duXCI7XHJcbmltcG9ydCB7UXVlc3Rpb25DaGVja2JveE1vZGVsfSBmcm9tIFwiLi9xdWVzdGlvbl9jaGVja2JveFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uUmFkaW9ncm91cE1vZGVsfSBmcm9tIFwiLi9xdWVzdGlvbl9yYWRpb2dyb3VwXCI7XHJcbmltcG9ydCB7UXVlc3Rpb25UZXh0TW9kZWx9IGZyb20gXCIuL3F1ZXN0aW9uX3RleHRcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkNvbW1lbnRNb2RlbH0gZnJvbSBcIi4vcXVlc3Rpb25fY29tbWVudFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElNYXRyaXhEcm9wZG93bkRhdGEge1xyXG4gICAgb25Sb3dDaGFuZ2VkKGNlbGw6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlLCBuZXdSb3dWYWx1ZTogYW55KTtcclxuICAgIGNvbHVtbnM6IEFycmF5PE1hdHJpeERyb3Bkb3duQ29sdW1uPjtcclxuICAgIGNyZWF0ZVF1ZXN0aW9uKHJvdzogTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UsIGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBRdWVzdGlvbjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIE1hdHJpeERyb3Bkb3duQ29sdW1uIGV4dGVuZHMgQmFzZSB7XHJcbiAgICBwcml2YXRlIGNob2ljZXNWYWx1ZTogSXRlbVZhbHVlW10gPSBbXTtcclxuICAgIHByaXZhdGUgdGl0bGVWYWx1ZTogc3RyaW5nO1xyXG4gICAgcHVibGljIG9wdGlvbnNDYXB0aW9uOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgaXNSZXF1aXJlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGhhc090aGVyOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwdWJsaWMgbWluV2lkdGg6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgY2VsbFR5cGU6IHN0cmluZyA9IFwiZGVmYXVsdFwiO1xyXG4gICAgcHJpdmF0ZSBjb2xDb3VudFZhbHVlOiBudW1iZXIgPSAtMTtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcgPSBudWxsKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCkgeyByZXR1cm4gXCJtYXRyaXhkcm9wZG93bmNvbHVtblwiIH1cclxuICAgIHB1YmxpYyBnZXQgdGl0bGUoKSB7IHJldHVybiB0aGlzLnRpdGxlVmFsdWUgPyB0aGlzLnRpdGxlVmFsdWUgOiB0aGlzLm5hbWU7IH1cclxuICAgIHB1YmxpYyBzZXQgdGl0bGUodmFsdWU6IHN0cmluZykgeyB0aGlzLnRpdGxlVmFsdWUgPSB2YWx1ZTsgfVxyXG4gICAgcHVibGljIGdldCBjaG9pY2VzKCk6IEFycmF5PGFueT4geyByZXR1cm4gdGhpcy5jaG9pY2VzVmFsdWU7IH1cclxuICAgIHB1YmxpYyBnZXQgY29sQ291bnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY29sQ291bnRWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBjb2xDb3VudCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgLTEgfHwgdmFsdWUgPiA0KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jb2xDb3VudFZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGNob2ljZXMobmV3VmFsdWU6IEFycmF5PGFueT4pIHtcclxuICAgICAgICBJdGVtVmFsdWUuc2V0RGF0YSh0aGlzLmNob2ljZXNWYWx1ZSwgbmV3VmFsdWUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTWF0cml4RHJvcGRvd25DZWxsIHtcclxuICAgIHByaXZhdGUgcXVlc3Rpb25WYWx1ZTogUXVlc3Rpb247XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgY29sdW1uOiBNYXRyaXhEcm9wZG93bkNvbHVtbiwgcHVibGljIHJvdzogTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UsIGRhdGE6IElNYXRyaXhEcm9wZG93bkRhdGEpIHtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uVmFsdWUgPSBkYXRhLmNyZWF0ZVF1ZXN0aW9uKHRoaXMucm93LCB0aGlzLmNvbHVtbik7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvblZhbHVlLnNldERhdGEocm93KTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcXVlc3Rpb24oKTogUXVlc3Rpb24geyByZXR1cm4gdGhpcy5xdWVzdGlvblZhbHVlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IGFueSB7IHJldHVybiB0aGlzLnF1ZXN0aW9uLnZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uLnZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZSBpbXBsZW1lbnRzIElTdXJ2ZXlEYXRhIHtcclxuICAgIHByb3RlY3RlZCBkYXRhOiBJTWF0cml4RHJvcGRvd25EYXRhO1xyXG4gICAgcHJpdmF0ZSByb3dWYWx1ZXM6IEhhc2hUYWJsZTxhbnk+ID0ge307XHJcbiAgICBwcml2YXRlIHJvd0NvbW1lbnRzOiBIYXNoVGFibGU8YW55PiA9IHt9O1xyXG4gICAgcHJpdmF0ZSBpc1NldHRpbmdWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBjZWxsczogQXJyYXk8TWF0cml4RHJvcGRvd25DZWxsPiA9IFtdO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKGRhdGE6IElNYXRyaXhEcm9wZG93bkRhdGEsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBkYXRhO1xyXG4gICAgICAgIHRoaXMudmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmJ1aWxkQ2VsbHMoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcm93TmFtZSgpIHsgcmV0dXJuIG51bGw7IH1cclxuICAgIHB1YmxpYyBnZXQgdmFsdWUoKSB7IHJldHVybiB0aGlzLnJvd1ZhbHVlczsgfVxyXG4gICAgcHVibGljIHNldCB2YWx1ZSh2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5pc1NldHRpbmdWYWx1ZSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5yb3dWYWx1ZXMgPSB7fTtcclxuICAgICAgICBpZiAodmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gdmFsdWUpIHtcclxuICAgICAgICAgICAgICAgIHRoaXMucm93VmFsdWVzW2tleV0gPSB2YWx1ZVtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLmNlbGxzW2ldLnF1ZXN0aW9uLm9uU3VydmV5VmFsdWVDaGFuZ2VkKHRoaXMuZ2V0VmFsdWUodGhpcy5jZWxsc1tpXS5jb2x1bW4ubmFtZSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzU2V0dGluZ1ZhbHVlID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VmFsdWUobmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICByZXR1cm4gdGhpcy5yb3dWYWx1ZXNbbmFtZV07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0VmFsdWUobmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNTZXR0aW5nVmFsdWUpIHJldHVybjtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPT09IFwiXCIpIG5ld1ZhbHVlID0gbnVsbDtcclxuICAgICAgICBpZiAobmV3VmFsdWUgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLnJvd1ZhbHVlc1tuYW1lXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnJvd1ZhbHVlc1tuYW1lXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kYXRhLm9uUm93Q2hhbmdlZCh0aGlzLCB0aGlzLnZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRDb21tZW50KG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm93Q29tbWVudHNbbmFtZV07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Q29tbWVudChuYW1lOiBzdHJpbmcsIG5ld1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLnJvd0NvbW1lbnRzW25hbWVdID0gbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzRW1wdHkoKSB7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgaWYgKCF2YWwpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB2YWwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgYnVpbGRDZWxscygpIHtcclxuICAgICAgICB2YXIgY29sdW1ucyA9IHRoaXMuZGF0YS5jb2x1bW5zO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgY29sdW1ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY29sdW1uID0gY29sdW1uc1tpXTtcclxuICAgICAgICAgICAgdGhpcy5jZWxscy5wdXNoKHRoaXMuY3JlYXRlQ2VsbChjb2x1bW4pKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlQ2VsbChjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogTWF0cml4RHJvcGRvd25DZWxsIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeERyb3Bkb3duQ2VsbChjb2x1bW4sIHRoaXMsIHRoaXMuZGF0YSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWxCYXNlIGV4dGVuZHMgUXVlc3Rpb24gaW1wbGVtZW50cyBJTWF0cml4RHJvcGRvd25EYXRhIHtcclxuICAgIHByaXZhdGUgY29sdW1uc1ZhbHVlOiBBcnJheTxNYXRyaXhEcm9wZG93bkNvbHVtbj4gPSBbXTtcclxuICAgIHByaXZhdGUgY2hvaWNlc1ZhbHVlOiBJdGVtVmFsdWVbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSBvcHRpb25zQ2FwdGlvblZhbHVlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGlzUm93Q2hhbmdpbmcgPSBmYWxzZTtcclxuICAgIHByb3RlY3RlZCBnZW5lcmF0ZWRWaXNpYmxlUm93czogQXJyYXk8TWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2U+O1xyXG4gICAgcHJpdmF0ZSBjZWxsVHlwZVZhbHVlOiBzdHJpbmcgPSBcImRyb3Bkb3duXCI7XHJcbiAgICBwcml2YXRlIGNvbHVtbkNvbENvdW50VmFsdWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgY29sdW1uTWluV2lkdGg6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgaG9yaXpvbnRhbFNjcm9sbDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIGNvbHVtbnNDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcbiAgICBwdWJsaWMgdXBkYXRlQ2VsbHNDYWxsYmFrOiAoKSA9PiB2b2lkO1xyXG5cclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwibWF0cml4ZHJvcGRvd25iYXNlXCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbHVtbnMoKTogQXJyYXk8TWF0cml4RHJvcGRvd25Db2x1bW4+IHsgcmV0dXJuIHRoaXMuY29sdW1uc1ZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGNvbHVtbnModmFsdWU6IEFycmF5PE1hdHJpeERyb3Bkb3duQ29sdW1uPikge1xyXG4gICAgICAgIHRoaXMuY29sdW1uc1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy5jb2x1bW5zQ2hhbmdlZENhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY2VsbFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuY2VsbFR5cGVWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBjZWxsVHlwZShuZXdWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2VsbFR5cGUgPT0gbmV3VmFsdWUpIHJldHVybjtcclxuICAgICAgICB0aGlzLmNlbGxUeXBlVmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLnVwZGF0ZUNlbGxzQ2FsbGJhayk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbHVtbkNvbENvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLmNvbHVtbkNvbENvdW50VmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgY29sdW1uQ29sQ291bnQodmFsdWU6IG51bWJlcikge1xyXG4gICAgICAgIGlmICh2YWx1ZSA8IDAgfHwgdmFsdWUgPiA0KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5jb2x1bW5Db2xDb3VudFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy51cGRhdGVDZWxsc0NhbGxiYWspO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldENvbHVtblRpdGxlKGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBjb2x1bW4udGl0bGU7XHJcbiAgICAgICAgaWYgKGNvbHVtbi5pc1JlcXVpcmVkICYmIHRoaXMuc3VydmV5KSB7XHJcbiAgICAgICAgICAgIHZhciByZXF1aXJlVGV4dCA9IHRoaXMuc3VydmV5LnJlcXVpcmVkVGV4dDtcclxuICAgICAgICAgICAgaWYgKHJlcXVpcmVUZXh0KSByZXF1aXJlVGV4dCArPSBcIiBcIjtcclxuICAgICAgICAgICAgcmVzdWx0ID0gcmVxdWlyZVRleHQgKyByZXN1bHQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0Q29sdW1uV2lkdGgoY29sdW1uOiBNYXRyaXhEcm9wZG93bkNvbHVtbik6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIGNvbHVtbi5taW5XaWR0aCA/IGNvbHVtbi5taW5XaWR0aCA6IHRoaXMuY29sdW1uTWluV2lkdGg7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNob2ljZXMoKTogQXJyYXk8YW55PiB7IHJldHVybiB0aGlzLmNob2ljZXNWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBjaG9pY2VzKG5ld1ZhbHVlOiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgSXRlbVZhbHVlLnNldERhdGEodGhpcy5jaG9pY2VzVmFsdWUsIG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgb3B0aW9uc0NhcHRpb24oKSB7IHJldHVybiAodGhpcy5vcHRpb25zQ2FwdGlvblZhbHVlKSA/IHRoaXMub3B0aW9uc0NhcHRpb25WYWx1ZSA6IHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJvcHRpb25zQ2FwdGlvblwiKTsgfVxyXG4gICAgcHVibGljIHNldCBvcHRpb25zQ2FwdGlvbihuZXdWYWx1ZTogc3RyaW5nKSB7IHRoaXMub3B0aW9uc0NhcHRpb25WYWx1ZSA9IG5ld1ZhbHVlOyB9XHJcbiAgICBwdWJsaWMgYWRkQ29sdW1uKG5hbWU6IHN0cmluZywgdGl0bGU6IHN0cmluZyA9IG51bGwpOiBNYXRyaXhEcm9wZG93bkNvbHVtbiB7XHJcbiAgICAgICAgdmFyIGNvbHVtbiA9IG5ldyBNYXRyaXhEcm9wZG93bkNvbHVtbihuYW1lLCB0aXRsZSk7XHJcbiAgICAgICAgdGhpcy5jb2x1bW5zVmFsdWUucHVzaChjb2x1bW4pO1xyXG4gICAgICAgIHJldHVybiBjb2x1bW47XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGdldCB2aXNpYmxlUm93cygpOiBBcnJheTxNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZT4ge1xyXG4gICAgICAgIHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MgPSB0aGlzLmdlbmVyYXRlUm93cygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdlbmVyYXRlUm93cygpOiBBcnJheTxNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZT4geyByZXR1cm4gbnVsbDsgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZU1hdHJpeFJvdyhuYW1lOiBhbnksIHRleHQ6IHN0cmluZywgdmFsdWU6IGFueSk6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlIHtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVOZXdWYWx1ZShjdXJWYWx1ZTogYW55KTogYW55IHsgcmV0dXJuICFjdXJWYWx1ZSA/IHt9IDogY3VyVmFsdWU7IH1cclxuICAgIHByb3RlY3RlZCBnZXRSb3dWYWx1ZShyb3c6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlLCBxdWVzdGlvblZhbHVlOiBhbnksIGNyZWF0ZTogYm9vbGVhbiA9IGZhbHNlKTogYW55IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gcXVlc3Rpb25WYWx1ZVtyb3cucm93TmFtZV0gPyBxdWVzdGlvblZhbHVlW3Jvdy5yb3dOYW1lXSA6IG51bGw7XHJcbiAgICAgICAgaWYgKCFyZXN1bHQgJiYgY3JlYXRlKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdCA9IHt9O1xyXG4gICAgICAgICAgICBxdWVzdGlvblZhbHVlW3Jvdy5yb3dOYW1lXSA9IHJlc3VsdDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblZhbHVlQ2hhbmdlZCgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1Jvd0NoYW5naW5nIHx8ICEodGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cykgfHwgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cy5sZW5ndGggPT0gMCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaXNSb3dDaGFuZ2luZyA9IHRydWU7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMuY3JlYXRlTmV3VmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzW2ldO1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzW2ldLnZhbHVlID0gdGhpcy5nZXRSb3dWYWx1ZShyb3csIHZhbCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNSb3dDaGFuZ2luZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGhhc0Vycm9ycyhmaXJlQ2FsbGJhY2s6IGJvb2xlYW4gPSB0cnVlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIGVycm9zSW5Db2x1bW5zID0gdGhpcy5oYXNFcnJvckluQ29sdW1ucyhmaXJlQ2FsbGJhY2spO1xyXG4gICAgICAgIHJldHVybiBzdXBlci5oYXNFcnJvcnMoZmlyZUNhbGxiYWNrKSB8fCBlcnJvc0luQ29sdW1ucztcclxuICAgIH1cclxuICAgIHByaXZhdGUgaGFzRXJyb3JJbkNvbHVtbnMoZmlyZUNhbGxiYWNrOiBib29sZWFuKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIHJlcyA9IGZhbHNlO1xyXG4gICAgICAgIGZvciAodmFyIGNvbEluZGV4ID0gMDsgY29sSW5kZXggPCB0aGlzLmNvbHVtbnMubGVuZ3RoOyBjb2xJbmRleCsrKSB7XHJcbiAgICAgICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdmFyIGNlbGxzID0gdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93c1tpXS5jZWxscztcclxuICAgICAgICAgICAgICAgIHJlcyA9IGNlbGxzICYmIGNlbGxzW2NvbEluZGV4XSAmJiBjZWxsc1tjb2xJbmRleF0ucXVlc3Rpb24gJiYgY2VsbHNbY29sSW5kZXhdLnF1ZXN0aW9uLmhhc0Vycm9ycyhmaXJlQ2FsbGJhY2spIHx8IHJlcztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldEZpcnN0SW5wdXRFbGVtZW50SWQoKTogc3RyaW5nIHtcclxuICAgICAgICB2YXIgcXVlc3Rpb24gPSB0aGlzLmdldEZpcnN0Q2VsbFF1ZXN0aW9uKGZhbHNlKTtcclxuICAgICAgICByZXR1cm4gcXVlc3Rpb24gPyBxdWVzdGlvbi5pbnB1dElkIDogc3VwZXIuZ2V0Rmlyc3RJbnB1dEVsZW1lbnRJZCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldEZpcnN0RXJyb3JJbnB1dEVsZW1lbnRJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbiA9IHRoaXMuZ2V0Rmlyc3RDZWxsUXVlc3Rpb24odHJ1ZSk7XHJcbiAgICAgICAgcmV0dXJuIHF1ZXN0aW9uID8gcXVlc3Rpb24uaW5wdXRJZCA6IHN1cGVyLmdldEZpcnN0RXJyb3JJbnB1dEVsZW1lbnRJZCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldEZpcnN0Q2VsbFF1ZXN0aW9uKG9uRXJyb3I6IGJvb2xlYW4pOiBRdWVzdGlvbiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNlbGxzID0gdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93c1tpXS5jZWxscztcclxuICAgICAgICAgICAgZm9yICh2YXIgY29sSW5kZXggPSAwOyBjb2xJbmRleCA8IHRoaXMuY29sdW1ucy5sZW5ndGg7IGNvbEluZGV4KyspIHtcclxuICAgICAgICAgICAgICAgIGlmICghb25FcnJvcikgcmV0dXJuIGNlbGxzW2NvbEluZGV4XS5xdWVzdGlvbjtcclxuICAgICAgICAgICAgICAgIGlmIChjZWxsc1tjb2xJbmRleF0ucXVlc3Rpb24uY3VycmVudEVycm9yQ291bnQgPiAwKSByZXR1cm4gY2VsbHNbY29sSW5kZXhdLnF1ZXN0aW9uXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICAvL0lNYXRyaXhEcm9wZG93bkRhdGFcclxuICAgIHB1YmxpYyBjcmVhdGVRdWVzdGlvbihyb3c6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlLCBjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogUXVlc3Rpb24ge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbiA9IHRoaXMuY3JlYXRlUXVlc3Rpb25Db3JlKHJvdywgY29sdW1uKTtcclxuICAgICAgICBxdWVzdGlvbi5uYW1lID0gY29sdW1uLm5hbWU7XHJcbiAgICAgICAgcXVlc3Rpb24uaXNSZXF1aXJlZCA9IGNvbHVtbi5pc1JlcXVpcmVkO1xyXG4gICAgICAgIHF1ZXN0aW9uLmhhc090aGVyID0gY29sdW1uLmhhc090aGVyO1xyXG4gICAgICAgIGlmIChjb2x1bW4uaGFzT3RoZXIpIHtcclxuICAgICAgICAgICAgaWYgKHF1ZXN0aW9uIGluc3RhbmNlb2YgUXVlc3Rpb25TZWxlY3RCYXNlKSB7XHJcbiAgICAgICAgICAgICAgICAoPFF1ZXN0aW9uU2VsZWN0QmFzZT5xdWVzdGlvbikuc3RvcmVPdGhlcnNBc0NvbW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcXVlc3Rpb247XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlUXVlc3Rpb25Db3JlKHJvdzogTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UsIGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBRdWVzdGlvbiB7XHJcbiAgICAgICAgdmFyIGNlbGxUeXBlID0gY29sdW1uLmNlbGxUeXBlID09IFwiZGVmYXVsdFwiID8gdGhpcy5jZWxsVHlwZSA6IGNvbHVtbi5jZWxsVHlwZTtcclxuICAgICAgICB2YXIgbmFtZSA9IHRoaXMuZ2V0UXVlc3Rpb25OYW1lKHJvdywgY29sdW1uKTtcclxuICAgICAgICBpZiAoY2VsbFR5cGUgPT0gXCJjaGVja2JveFwiKSByZXR1cm4gdGhpcy5jcmVhdGVDaGVja2JveChuYW1lLCBjb2x1bW4pO1xyXG4gICAgICAgIGlmIChjZWxsVHlwZSA9PSBcInJhZGlvZ3JvdXBcIikgcmV0dXJuIHRoaXMuY3JlYXRlUmFkaW9ncm91cChuYW1lLCBjb2x1bW4pO1xyXG4gICAgICAgIGlmIChjZWxsVHlwZSA9PSBcInRleHRcIikgcmV0dXJuIHRoaXMuY3JlYXRlVGV4dChuYW1lLCBjb2x1bW4pO1xyXG4gICAgICAgIGlmIChjZWxsVHlwZSA9PSBcImNvbW1lbnRcIikgcmV0dXJuIHRoaXMuY3JlYXRlQ29tbWVudChuYW1lLCBjb2x1bW4pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0ZURyb3Bkb3duKG5hbWUsIGNvbHVtbik7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0UXVlc3Rpb25OYW1lKHJvdzogTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2UsIGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBzdHJpbmcgeyByZXR1cm4gcm93LnJvd05hbWUgKyBcIl9cIiArIGNvbHVtbi5uYW1lOyB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29sdW1uQ2hvaWNlcyhjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogQXJyYXk8YW55PiB7XHJcbiAgICAgICAgcmV0dXJuIGNvbHVtbi5jaG9pY2VzICYmIGNvbHVtbi5jaG9pY2VzLmxlbmd0aCA+IDAgPyBjb2x1bW4uY2hvaWNlcyA6IHRoaXMuY2hvaWNlcztcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXRDb2x1bW5PcHRpb25zQ2FwdGlvbihjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gY29sdW1uLm9wdGlvbnNDYXB0aW9uID8gY29sdW1uLm9wdGlvbnNDYXB0aW9uIDogdGhpcy5vcHRpb25zQ2FwdGlvbjtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVEcm9wZG93bihuYW1lOiBzdHJpbmcsIGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBRdWVzdGlvbkRyb3Bkb3duTW9kZWwge1xyXG4gICAgICAgIHZhciBxID0gPFF1ZXN0aW9uRHJvcGRvd25Nb2RlbD50aGlzLmNyZWF0ZUNlbGxRdWVzdGlvbihcImRyb3Bkb3duXCIsIG5hbWUpO1xyXG4gICAgICAgIHEuY2hvaWNlcyA9IHRoaXMuZ2V0Q29sdW1uQ2hvaWNlcyhjb2x1bW4pO1xyXG4gICAgICAgIHEub3B0aW9uc0NhcHRpb24gPSB0aGlzLmdldENvbHVtbk9wdGlvbnNDYXB0aW9uKGNvbHVtbik7XHJcbiAgICAgICAgcmV0dXJuIHE7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlQ2hlY2tib3gobmFtZTogc3RyaW5nLCBjb2x1bW46IE1hdHJpeERyb3Bkb3duQ29sdW1uKTogUXVlc3Rpb25DaGVja2JveE1vZGVsIHtcclxuICAgICAgICB2YXIgcSA9IDxRdWVzdGlvbkNoZWNrYm94TW9kZWw+dGhpcy5jcmVhdGVDZWxsUXVlc3Rpb24oXCJjaGVja2JveFwiLCBuYW1lKTtcclxuICAgICAgICBxLmNob2ljZXMgPSB0aGlzLmdldENvbHVtbkNob2ljZXMoY29sdW1uKTtcclxuICAgICAgICBxLmNvbENvdW50ID0gY29sdW1uLmNvbENvdW50ID4gLSAxID8gY29sdW1uLmNvbENvdW50IDogdGhpcy5jb2x1bW5Db2xDb3VudDtcclxuICAgICAgICByZXR1cm4gcTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVSYWRpb2dyb3VwKG5hbWU6IHN0cmluZywgY29sdW1uOiBNYXRyaXhEcm9wZG93bkNvbHVtbik6IFF1ZXN0aW9uUmFkaW9ncm91cE1vZGVsIHtcclxuICAgICAgICB2YXIgcSA9IDxRdWVzdGlvblJhZGlvZ3JvdXBNb2RlbD50aGlzLmNyZWF0ZUNlbGxRdWVzdGlvbihcInJhZGlvZ3JvdXBcIiwgbmFtZSk7XHJcbiAgICAgICAgcS5jaG9pY2VzID0gdGhpcy5nZXRDb2x1bW5DaG9pY2VzKGNvbHVtbik7XHJcbiAgICAgICAgcS5jb2xDb3VudCA9IGNvbHVtbi5jb2xDb3VudCA+IC0gMSA/IGNvbHVtbi5jb2xDb3VudCA6IHRoaXMuY29sdW1uQ29sQ291bnQ7XHJcbiAgICAgICAgcmV0dXJuIHE7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVGV4dChuYW1lOiBzdHJpbmcsIGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBRdWVzdGlvblRleHRNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIDxRdWVzdGlvblRleHRNb2RlbD50aGlzLmNyZWF0ZUNlbGxRdWVzdGlvbihcInRleHRcIiwgbmFtZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlQ29tbWVudChuYW1lOiBzdHJpbmcsIGNvbHVtbjogTWF0cml4RHJvcGRvd25Db2x1bW4pOiBRdWVzdGlvbkNvbW1lbnRNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIDxRdWVzdGlvbkNvbW1lbnRNb2RlbD50aGlzLmNyZWF0ZUNlbGxRdWVzdGlvbihcImNvbW1lbnRcIiwgbmFtZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlQ2VsbFF1ZXN0aW9uKHF1ZXN0aW9uVHlwZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBRdWVzdGlvbiB7XHJcbiAgICAgICAgcmV0dXJuIDxRdWVzdGlvbj5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UuY3JlYXRlUXVlc3Rpb24ocXVlc3Rpb25UeXBlLCBuYW1lKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBkZWxldGVSb3dWYWx1ZShuZXdWYWx1ZTogYW55LCByb3c6IE1hdHJpeERyb3Bkb3duUm93TW9kZWxCYXNlKTogYW55IHtcclxuICAgICAgICBkZWxldGUgbmV3VmFsdWVbcm93LnJvd05hbWVdO1xyXG4gICAgICAgIHJldHVybiBPYmplY3Qua2V5cyhuZXdWYWx1ZSkubGVuZ3RoID09IDAgPyBudWxsIDogbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgICBvblJvd0NoYW5nZWQocm93OiBNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZSwgbmV3Um93VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHRoaXMuY3JlYXRlTmV3VmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgdmFyIHJvd1ZhbHVlID0gdGhpcy5nZXRSb3dWYWx1ZShyb3csIG5ld1ZhbHVlLCB0cnVlKTtcclxuICAgICAgICBmb3IgKHZhciBrZXkgaW4gcm93VmFsdWUpIGRlbGV0ZSByb3dWYWx1ZVtrZXldO1xyXG4gICAgICAgIGlmIChuZXdSb3dWYWx1ZSkge1xyXG4gICAgICAgICAgICBuZXdSb3dWYWx1ZSA9IEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkobmV3Um93VmFsdWUpKTtcclxuICAgICAgICAgICAgZm9yICh2YXIga2V5IGluIG5ld1Jvd1ZhbHVlKSByb3dWYWx1ZVtrZXldID0gbmV3Um93VmFsdWVba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKE9iamVjdC5rZXlzKHJvd1ZhbHVlKS5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuZGVsZXRlUm93VmFsdWUobmV3VmFsdWUsIHJvdyk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNSb3dDaGFuZ2luZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5zZXROZXdWYWx1ZShuZXdWYWx1ZSk7XHJcbiAgICAgICAgdGhpcy5pc1Jvd0NoYW5naW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJtYXRyaXhkcm9wZG93bmNvbHVtblwiLCBbXCJuYW1lXCIsIHsgbmFtZTogXCJ0aXRsZVwiLCBvbkdldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnkpIHsgcmV0dXJuIG9iai50aXRsZVZhbHVlOyB9IH0sXHJcbiAgICAgICAgeyBuYW1lOiBcImNob2ljZXM6aXRlbXZhbHVlc1wiLCBvbkdldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnkpIHsgcmV0dXJuIEl0ZW1WYWx1ZS5nZXREYXRhKG9iai5jaG9pY2VzKTsgfSwgb25TZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55LCB2YWx1ZTogYW55KSB7IG9iai5jaG9pY2VzID0gdmFsdWU7IH19LFxyXG4gICAgICAgIFwib3B0aW9uc0NhcHRpb25cIiwgeyBuYW1lOiBcImNlbGxUeXBlXCIsIGRlZmF1bHQ6IFwiZGVmYXVsdFwiLCBjaG9pY2VzOiBbXCJkZWZhdWx0XCIsIFwiZHJvcGRvd25cIiwgXCJjaGVja2JveFwiLCBcInJhZGlvZ3JvdXBcIiwgXCJ0ZXh0XCIsIFwiY29tbWVudFwiXSB9LFxyXG4gICAgICAgIHsgbmFtZTogXCJjb2xDb3VudFwiLCBkZWZhdWx0OiAtMSwgY2hvaWNlczogWy0xLCAwLCAxLCAyLCAzLCA0XSB9LCBcImlzUmVxdWlyZWQ6Ym9vbGVhblwiLCBcImhhc090aGVyOmJvb2xlYW5cIiwgXCJtaW5XaWR0aFwiXSxcclxuICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBNYXRyaXhEcm9wZG93bkNvbHVtbihcIlwiKTsgfSk7XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwibWF0cml4ZHJvcGRvd25iYXNlXCIsIFt7IG5hbWU6IFwiY29sdW1uczptYXRyaXhkcm9wZG93bmNvbHVtbnNcIiwgY2xhc3NOYW1lOiBcIm1hdHJpeGRyb3Bkb3duY29sdW1uXCIgfSxcclxuICAgICAgICBcImhvcml6b250YWxTY3JvbGw6Ym9vbGVhblwiLFxyXG4gICAgICAgIHsgbmFtZTogXCJjaG9pY2VzOml0ZW12YWx1ZXNcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBJdGVtVmFsdWUuZ2V0RGF0YShvYmouY2hvaWNlcyk7IH0sIG9uU2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSwgdmFsdWU6IGFueSkgeyBvYmouY2hvaWNlcyA9IHZhbHVlOyB9fSxcclxuICAgICAgICB7IG5hbWU6IFwib3B0aW9uc0NhcHRpb25cIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmoub3B0aW9uc0NhcHRpb25WYWx1ZTsgfSB9LFxyXG4gICAgICAgIHsgbmFtZTogXCJjZWxsVHlwZVwiLCBkZWZhdWx0OiBcImRyb3Bkb3duXCIsIGNob2ljZXM6IFtcImRyb3Bkb3duXCIsIFwiY2hlY2tib3hcIiwgXCJyYWRpb2dyb3VwXCIsIFwidGV4dFwiLCBcImNvbW1lbnRcIl0gfSxcclxuICAgICAgICB7IG5hbWU6IFwiY29sdW1uQ29sQ291bnRcIiwgZGVmYXVsdDogMCwgY2hvaWNlczogWzAsIDEsIDIsIDMsIDRdIH0sIFwiY29sdW1uTWluV2lkdGhcIl0sXHJcbiAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUXVlc3Rpb25NYXRyaXhEcm9wZG93bk1vZGVsQmFzZShcIlwiKTsgfSwgXCJxdWVzdGlvblwiKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbl9tYXRyaXhkcm9wZG93bmJhc2UudHNcbiAqKi8iLCJpbXBvcnQge0pzb25PYmplY3R9IGZyb20gJy4vanNvbm9iamVjdCc7XHJcbmltcG9ydCB7UXVlc3Rpb25CYXNlfSBmcm9tICcuL3F1ZXN0aW9uYmFzZSc7XHJcbmltcG9ydCB7U3VydmV5RXJyb3IsIFN1cnZleUVsZW1lbnR9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuL3N1cnZleVN0cmluZ3NcIjtcclxuaW1wb3J0IHtBbnN3ZXJSZXF1aXJlZEVycm9yfSBmcm9tIFwiLi9lcnJvclwiO1xyXG5pbXBvcnQge1N1cnZleVZhbGlkYXRvciwgSVZhbGlkYXRvck93bmVyLCBWYWxpZGF0b3JSdW5uZXJ9IGZyb20gXCIuL3ZhbGlkYXRvclwiO1xyXG5pbXBvcnQge1RleHRQcmVQcm9jZXNzb3J9IGZyb20gXCIuL3RleHRQcmVQcm9jZXNzb3JcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbiBleHRlbmRzIFF1ZXN0aW9uQmFzZSBpbXBsZW1lbnRzIElWYWxpZGF0b3JPd25lciB7XHJcbiAgICBwcml2YXRlIHRpdGxlVmFsdWU6IHN0cmluZyA9IG51bGw7XHJcbiAgICBwcml2YXRlIHF1ZXN0aW9uVmFsdWU6IGFueTtcclxuICAgIHByaXZhdGUgcXVlc3Rpb25Db21tZW50OiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIGlzUmVxdWlyZWRWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBoYXNDb21tZW50VmFsdWU6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgaGFzT3RoZXJWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBjb21tZW50VGV4dFZhbHVlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSB0ZXh0UHJlUHJvY2Vzc29yOiBUZXh0UHJlUHJvY2Vzc29yO1xyXG4gICAgZXJyb3JzOiBBcnJheTxTdXJ2ZXlFcnJvcj4gPSBbXTtcclxuICAgIHZhbGlkYXRvcnM6IEFycmF5PFN1cnZleVZhbGlkYXRvcj4gPSBuZXcgQXJyYXk8U3VydmV5VmFsaWRhdG9yPigpO1xyXG4gICAgdmFsdWVDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcbiAgICBjb21tZW50Q2hhbmdlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgZXJyb3JzQ2hhbmdlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgdGl0bGVDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBoYXNUaXRsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cclxuICAgIHB1YmxpYyBnZXQgaGFzSW5wdXQoKTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGlucHV0SWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuaWQgKyBcImlcIjsgfVxyXG4gICAgcHVibGljIGdldCB0aXRsZSgpOiBzdHJpbmcgeyByZXR1cm4gKHRoaXMudGl0bGVWYWx1ZSkgPyB0aGlzLnRpdGxlVmFsdWUgOiB0aGlzLm5hbWU7IH1cclxuICAgIHB1YmxpYyBzZXQgdGl0bGUobmV3VmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMudGl0bGVWYWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMudGl0bGVDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBwcm9jZXNzZWRUaXRsZSgpIHsgcmV0dXJuIHRoaXMuc3VydmV5ICE9IG51bGwgPyB0aGlzLnN1cnZleS5wcm9jZXNzVGV4dCh0aGlzLnRpdGxlKSA6IHRoaXMudGl0bGU7IH1cclxuICAgIHB1YmxpYyBnZXQgZnVsbFRpdGxlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3VydmV5ICYmIHRoaXMuc3VydmV5LnF1ZXN0aW9uVGl0bGVUZW1wbGF0ZSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMudGV4dFByZVByb2Nlc3Nvcikge1xyXG4gICAgICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy50ZXh0UHJlUHJvY2Vzc29yID0gbmV3IFRleHRQcmVQcm9jZXNzb3IoKTtcclxuICAgICAgICAgICAgICAgIHRoaXMudGV4dFByZVByb2Nlc3Nvci5vbkhhc1ZhbHVlID0gZnVuY3Rpb24gKG5hbWU6IHN0cmluZykgeyByZXR1cm4gc2VsZi5jYW5Qcm9jZXNzZWRUZXh0VmFsdWVzKG5hbWUudG9Mb3dlckNhc2UoKSk7IH07XHJcbiAgICAgICAgICAgICAgICB0aGlzLnRleHRQcmVQcm9jZXNzb3Iub25Qcm9jZXNzID0gZnVuY3Rpb24gKG5hbWU6IHN0cmluZykgeyByZXR1cm4gc2VsZi5nZXRQcm9jZXNzZWRUZXh0VmFsdWUobmFtZSk7IH07XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMudGV4dFByZVByb2Nlc3Nvci5wcm9jZXNzKHRoaXMuc3VydmV5LnF1ZXN0aW9uVGl0bGVUZW1wbGF0ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZXF1aXJlVGV4dCA9IHRoaXMucmVxdWlyZWRUZXh0O1xyXG4gICAgICAgIGlmIChyZXF1aXJlVGV4dCkgcmVxdWlyZVRleHQgKz0gXCIgXCI7XHJcbiAgICAgICAgdmFyIG5vID0gdGhpcy5ubztcclxuICAgICAgICBpZiAobm8pIG5vICs9IFwiLiBcIjtcclxuICAgICAgICByZXR1cm4gbm8gKyByZXF1aXJlVGV4dCArIHRoaXMucHJvY2Vzc2VkVGl0bGU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZm9jdXMob25FcnJvcjogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgU3VydmV5RWxlbWVudC5TY3JvbGxFbGVtZW50VG9Ub3AodGhpcy5pZCk7XHJcbiAgICAgICAgdmFyIGlkID0gIW9uRXJyb3IgPyB0aGlzLmdldEZpcnN0SW5wdXRFbGVtZW50SWQoKSA6IHRoaXMuZ2V0Rmlyc3RFcnJvcklucHV0RWxlbWVudElkKCk7XHJcbiAgICAgICAgaWYgKFN1cnZleUVsZW1lbnQuRm9jdXNFbGVtZW50KGlkKSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmZvY3VzQ2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXRGaXJzdElucHV0RWxlbWVudElkKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaW5wdXRJZDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXRGaXJzdEVycm9ySW5wdXRFbGVtZW50SWQoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5nZXRGaXJzdElucHV0RWxlbWVudElkKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY2FuUHJvY2Vzc2VkVGV4dFZhbHVlcyhuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gbmFtZSA9PSBcIm5vXCIgfHwgbmFtZSA9PSBcInRpdGxlXCIgfHwgbmFtZSA9PSBcInJlcXVpcmVcIjtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXRQcm9jZXNzZWRUZXh0VmFsdWUobmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBpZiAobmFtZSA9PSBcIm5vXCIpIHJldHVybiB0aGlzLm5vO1xyXG4gICAgICAgIGlmIChuYW1lID09IFwidGl0bGVcIikgcmV0dXJuIHRoaXMucHJvY2Vzc2VkVGl0bGU7XHJcbiAgICAgICAgaWYgKG5hbWUgPT0gXCJyZXF1aXJlXCIpIHJldHVybiB0aGlzLnJlcXVpcmVkVGV4dDtcclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzdXBwb3J0Q29tbWVudCgpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICBwdWJsaWMgc3VwcG9ydE90aGVyKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cclxuICAgIHB1YmxpYyBnZXQgaXNSZXF1aXJlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaXNSZXF1aXJlZFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGlzUmVxdWlyZWQodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSZXF1aXJlZCA9PSB2YWwpIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzUmVxdWlyZWRWYWx1ZSA9IHZhbDtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLnRpdGxlQ2hhbmdlZENhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaGFzQ29tbWVudCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaGFzQ29tbWVudFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGhhc0NvbW1lbnQodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnN1cHBvcnRDb21tZW50KCkpIHJldHVybjtcclxuICAgICAgICB0aGlzLmhhc0NvbW1lbnRWYWx1ZSA9IHZhbDtcclxuICAgICAgICBpZiAodGhpcy5oYXNDb21tZW50KSB0aGlzLmhhc090aGVyID0gZmFsc2U7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1lbnRUZXh0KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmNvbW1lbnRUZXh0VmFsdWUgPyB0aGlzLmNvbW1lbnRUZXh0VmFsdWUgOiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwib3RoZXJJdGVtVGV4dFwiKTsgfVxyXG4gICAgcHVibGljIHNldCBjb21tZW50VGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5jb21tZW50VGV4dFZhbHVlID0gdmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGhhc090aGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5oYXNPdGhlclZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGhhc090aGVyKHZhbDogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICghdGhpcy5zdXBwb3J0T3RoZXIoKSB8fCB0aGlzLmhhc090aGVyID09IHZhbCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuaGFzT3RoZXJWYWx1ZSA9IHZhbDtcclxuICAgICAgICBpZiAodGhpcy5oYXNPdGhlcikgdGhpcy5oYXNDb21tZW50ID0gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5oYXNPdGhlckNoYW5nZWQoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBoYXNPdGhlckNoYW5nZWQoKSB7IH1cclxuICAgIHByb3RlY3RlZCBnZXQgbm8oKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy52aXNpYmxlSW5kZXggPCAwKSByZXR1cm4gXCJcIjtcclxuICAgICAgICB2YXIgc3RhcnRJbmRleCA9IDE7XHJcbiAgICAgICAgdmFyIGlzTnVtZXJpYyA9IHRydWU7XHJcbiAgICAgICAgdmFyIHN0ciA9IFwiXCI7XHJcbiAgICAgICAgaWYgKHRoaXMuc3VydmV5ICYmIHRoaXMuc3VydmV5LnF1ZXN0aW9uU3RhcnRJbmRleCkge1xyXG4gICAgICAgICAgICBzdHIgPSB0aGlzLnN1cnZleS5xdWVzdGlvblN0YXJ0SW5kZXg7XHJcbiAgICAgICAgICAgIGlmIChwYXJzZUludChzdHIpKSBzdGFydEluZGV4ID0gcGFyc2VJbnQoc3RyKTtcclxuICAgICAgICAgICAgZWxzZSBpZiAoc3RyLmxlbmd0aCA9PSAxKSBpc051bWVyaWMgPSBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGlzTnVtZXJpYykgcmV0dXJuICh0aGlzLnZpc2libGVJbmRleCArIHN0YXJ0SW5kZXgpLnRvU3RyaW5nKCk7XHJcbiAgICAgICAgcmV0dXJuIFN0cmluZy5mcm9tQ2hhckNvZGUoc3RyLmNoYXJDb2RlQXQoMCkgKyB0aGlzLnZpc2libGVJbmRleCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25TZXREYXRhKCkge1xyXG4gICAgICAgIHN1cGVyLm9uU2V0RGF0YSgpO1xyXG4gICAgICAgIHRoaXMub25TdXJ2ZXlWYWx1ZUNoYW5nZWQodGhpcy52YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmFsdWVGcm9tRGF0YSh0aGlzLmdldFZhbHVlQ29yZSgpKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgdmFsdWUobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0TmV3VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMudmFsdWVDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBjb21tZW50KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmdldENvbW1lbnQoKTsgfVxyXG4gICAgcHVibGljIHNldCBjb21tZW50KG5ld1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5jb21tZW50ID09IG5ld1ZhbHVlKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zZXRDb21tZW50KG5ld1ZhbHVlKTtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmNvbW1lbnRDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldENvbW1lbnQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuZGF0YSAhPSBudWxsID8gdGhpcy5kYXRhLmdldENvbW1lbnQodGhpcy5uYW1lKSA6IHRoaXMucXVlc3Rpb25Db21tZW50OyB9XHJcbiAgICBwcm90ZWN0ZWQgc2V0Q29tbWVudChuZXdWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5zZXROZXdDb21tZW50KG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc0VtcHR5KCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy52YWx1ZSA9PSBudWxsOyB9XHJcbiAgICBwdWJsaWMgaGFzRXJyb3JzKGZpcmVDYWxsYmFjazogYm9vbGVhbiA9IHRydWUpOiBib29sZWFuIHtcclxuICAgICAgICB0aGlzLmNoZWNrRm9yRXJyb3JzKGZpcmVDYWxsYmFjayk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JzLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGN1cnJlbnRFcnJvckNvdW50KCk6IG51bWJlciB7IHJldHVybiB0aGlzLmVycm9ycy5sZW5ndGg7IH1cclxuICAgIHB1YmxpYyBnZXQgcmVxdWlyZWRUZXh0KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnN1cnZleSAhPSBudWxsICYmIHRoaXMuaXNSZXF1aXJlZCA/IHRoaXMuc3VydmV5LnJlcXVpcmVkVGV4dCA6IFwiXCI7IH1cclxuICAgIHB1YmxpYyBhZGRFcnJvcihlcnJvcjogU3VydmV5RXJyb3IpIHtcclxuICAgICAgICB0aGlzLmVycm9ycy5wdXNoKGVycm9yKTtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmVycm9yc0NoYW5nZWRDYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNoZWNrRm9yRXJyb3JzKGZpcmVDYWxsYmFjazogYm9vbGVhbikge1xyXG4gICAgICAgIHZhciBlcnJvckxlbmd0aCA9IHRoaXMuZXJyb3JzID8gdGhpcy5lcnJvcnMubGVuZ3RoIDogMDtcclxuICAgICAgICB0aGlzLmVycm9ycyA9IFtdO1xyXG4gICAgICAgIHRoaXMub25DaGVja0ZvckVycm9ycyh0aGlzLmVycm9ycyk7XHJcbiAgICAgICAgaWYgKHRoaXMuZXJyb3JzLmxlbmd0aCA9PSAwICYmIHRoaXMudmFsdWUpIHtcclxuICAgICAgICAgICAgdmFyIGVycm9yID0gdGhpcy5ydW5WYWxpZGF0b3JzKCk7XHJcbiAgICAgICAgICAgIGlmIChlcnJvcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5lcnJvcnMucHVzaChlcnJvcik7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuc3VydmV5ICYmIHRoaXMuZXJyb3JzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHZhciBlcnJvciA9IHRoaXMuc3VydmV5LnZhbGlkYXRlUXVlc3Rpb24odGhpcy5uYW1lKTtcclxuICAgICAgICAgICAgaWYgKGVycm9yKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmVycm9ycy5wdXNoKGVycm9yKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoZmlyZUNhbGxiYWNrICYmIChlcnJvckxlbmd0aCAhPSB0aGlzLmVycm9ycy5sZW5ndGggfHwgZXJyb3JMZW5ndGggPiAwKSkge1xyXG4gICAgICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmVycm9yc0NoYW5nZWRDYWxsYmFjayk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uQ2hlY2tGb3JFcnJvcnMoZXJyb3JzOiBBcnJheTxTdXJ2ZXlFcnJvcj4pIHtcclxuICAgICAgICBpZiAodGhpcy5oYXNSZXF1aXJlZEVycm9yKCkpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcnMucHVzaChuZXcgQW5zd2VyUmVxdWlyZWRFcnJvcigpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgaGFzUmVxdWlyZWRFcnJvcigpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gdGhpcy5pc1JlcXVpcmVkICYmIHRoaXMuaXNFbXB0eSgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJ1blZhbGlkYXRvcnMoKTogU3VydmV5RXJyb3Ige1xyXG4gICAgICAgIHJldHVybiBuZXcgVmFsaWRhdG9yUnVubmVyKCkucnVuKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc1ZhbHVlQ2hhbmdlZEluU3VydmV5ID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgc2V0TmV3VmFsdWUobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0TmV3VmFsdWVJbkRhdGEobmV3VmFsdWUpO1xyXG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZWQoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzZXROZXdWYWx1ZUluRGF0YShuZXdWYWx1ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmlzVmFsdWVDaGFuZ2VkSW5TdXJ2ZXkpIHtcclxuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLnZhbHVlVG9EYXRhKG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZUNvcmUobmV3VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0VmFsdWVDb3JlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEgIT0gbnVsbCA/IHRoaXMuZGF0YS5nZXRWYWx1ZSh0aGlzLm5hbWUpIDogdGhpcy5xdWVzdGlvblZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzZXRWYWx1ZUNvcmUobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEuc2V0VmFsdWUodGhpcy5uYW1lLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvblZhbHVlID0gbmV3VmFsdWU7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHZhbHVlRnJvbURhdGEodmFsOiBhbnkpOiBhbnkgeyByZXR1cm4gdmFsOyB9XHJcbiAgICBwcm90ZWN0ZWQgdmFsdWVUb0RhdGEodmFsOiBhbnkpOiBhbnkgeyByZXR1cm4gdmFsOyB9XHJcbiAgICBwcm90ZWN0ZWQgb25WYWx1ZUNoYW5nZWQoKSB7IH1cclxuICAgIHByb3RlY3RlZCBzZXROZXdDb21tZW50KG5ld1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNldENvbW1lbnQodGhpcy5uYW1lLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHRoaXMucXVlc3Rpb25Db21tZW50ID0gbmV3VmFsdWU7XHJcbiAgICB9XHJcbiAgICAvL0lRdWVzdGlvblxyXG4gICAgb25TdXJ2ZXlWYWx1ZUNoYW5nZWQobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaXNWYWx1ZUNoYW5nZWRJblN1cnZleSA9IHRydWU7XHJcbiAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMudmFsdWVGcm9tRGF0YShuZXdWYWx1ZSk7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy5jb21tZW50Q2hhbmdlZENhbGxiYWNrKTtcclxuICAgICAgICB0aGlzLmlzVmFsdWVDaGFuZ2VkSW5TdXJ2ZXkgPSBmYWxzZTtcclxuICAgIH1cclxuICAgIC8vSVZhbGlkYXRvck93bmVyXHJcbiAgICBnZXRWYWxpZGF0b3JUaXRsZSgpOiBzdHJpbmcgeyByZXR1cm4gbnVsbDsgfVxyXG59XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJxdWVzdGlvblwiLCBbeyBuYW1lOiBcInRpdGxlOnRleHRcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmoudGl0bGVWYWx1ZTsgfSB9LFxyXG4gICAgeyBuYW1lOiBcImNvbW1lbnRUZXh0XCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gb2JqLmNvbW1lbnRUZXh0VmFsdWU7IH0gfSxcclxuICAgIFwiaXNSZXF1aXJlZDpib29sZWFuXCIsIHsgbmFtZTogXCJ2YWxpZGF0b3JzOnZhbGlkYXRvcnNcIiwgYmFzZUNsYXNzTmFtZTogXCJzdXJ2ZXl2YWxpZGF0b3JcIiwgY2xhc3NOYW1lUGFydDogXCJ2YWxpZGF0b3JcIn1dLCBudWxsLCBcInF1ZXN0aW9uYmFzZVwiKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbi50c1xuICoqLyIsImltcG9ydCB7QmFzZSwgSVF1ZXN0aW9uLCBJQ29uZGl0aW9uUnVubmVyLCBJU3VydmV5RGF0YSwgSVN1cnZleSwgSGFzaFRhYmxlfSBmcm9tICcuL2Jhc2UnO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gJy4vanNvbm9iamVjdCc7XHJcbmltcG9ydCB7Q29uZGl0aW9uUnVubmVyfSBmcm9tICcuL2NvbmRpdGlvbnMnO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQmFzZSBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBJUXVlc3Rpb24sIElDb25kaXRpb25SdW5uZXIge1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgcXVlc3Rpb25Db3VudGVyID0gMTAwO1xyXG4gICAgcHJpdmF0ZSBzdGF0aWMgZ2V0UXVlc3Rpb25JZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcInNxX1wiICsgUXVlc3Rpb25CYXNlLnF1ZXN0aW9uQ291bnRlcisrO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGRhdGE6IElTdXJ2ZXlEYXRhO1xyXG4gICAgcHJvdGVjdGVkIHN1cnZleTogSVN1cnZleTtcclxuICAgIHByaXZhdGUgY29uZGl0aW9uUnVubmVyOiBDb25kaXRpb25SdW5uZXIgPSBudWxsO1xyXG4gICAgcHVibGljIHZpc2libGVJZjogc3RyaW5nID0gXCJcIjtcclxuICAgIHByaXZhdGUgaWRWYWx1ZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSB2aXNpYmxlVmFsdWU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHN0YXJ0V2l0aE5ld0xpbmU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHJpdmF0ZSB2aXNpYmxlSW5kZXhWYWx1ZTogbnVtYmVyID0gLTE7XHJcbiAgICBwdWJsaWMgd2lkdGg6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHJlbmRlcldpZHRoVmFsdWU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwcml2YXRlIHJpZ2h0SW5kZW50VmFsdWU6IG51bWJlciA9IDA7XHJcbiAgICBwdWJsaWMgaW5kZW50OiBudW1iZXIgPSAwO1xyXG4gICAgZm9jdXNDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuICAgIHJlbmRlcldpZHRoQ2hhbmdlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgcm93VmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuICAgIHZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcbiAgICB2aXNpYmxlSW5kZXhDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcblxyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICAgICAgdGhpcy5pZFZhbHVlID0gUXVlc3Rpb25CYXNlLmdldFF1ZXN0aW9uSWQoKTtcclxuICAgICAgICB0aGlzLm9uQ3JlYXRpbmcoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMudmlzaWJsZVZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHZpc2libGUodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PSB0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgICAgICB0aGlzLnZpc2libGVWYWx1ZSA9IHZhbDtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLnZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMucm93VmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjayk7XHJcbiAgICAgICAgaWYgKHRoaXMuc3VydmV5KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VydmV5LnF1ZXN0aW9uVmlzaWJpbGl0eUNoYW5nZWQoPElRdWVzdGlvbj50aGlzLCB0aGlzLnZpc2libGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgdmlzaWJsZUluZGV4KCk6IG51bWJlciB7IHJldHVybiB0aGlzLnZpc2libGVJbmRleFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgaGFzRXJyb3JzKGZpcmVDYWxsYmFjazogYm9vbGVhbiA9IHRydWUpOiBib29sZWFuIHsgcmV0dXJuIGZhbHNlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGN1cnJlbnRFcnJvckNvdW50KCk6IG51bWJlciB7IHJldHVybiAwOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGhhc1RpdGxlKCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cclxuICAgIHB1YmxpYyBnZXQgaGFzSW5wdXQoKTogYm9vbGVhbiB7IHJldHVybiBmYWxzZTsgfVxyXG4gICAgcHVibGljIGdldCBoYXNDb21tZW50KCk6IGJvb2xlYW4geyByZXR1cm4gZmFsc2U7IH1cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuaWRWYWx1ZTsgfVxyXG4gICAgcHVibGljIGdldCByZW5kZXJXaWR0aCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5yZW5kZXJXaWR0aFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHJlbmRlcldpZHRoKHZhbDogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PSB0aGlzLnJlbmRlcldpZHRoKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5yZW5kZXJXaWR0aFZhbHVlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMucmVuZGVyV2lkdGhDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCByaWdodEluZGVudCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5yaWdodEluZGVudFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHJpZ2h0SW5kZW50KHZhbDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PSB0aGlzLnJpZ2h0SW5kZW50KSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5yaWdodEluZGVudFZhbHVlID0gdmFsO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMucmVuZGVyV2lkdGhDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGZvY3VzKG9uRXJyb3I6IGJvb2xlYW4gPSBmYWxzZSkgeyB9XHJcbiAgICBzZXREYXRhKG5ld1ZhbHVlOiBJU3VydmV5RGF0YSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMuc3VydmV5ID0gKG5ld1ZhbHVlICYmIG5ld1ZhbHVlW1wicXVlc3Rpb25BZGRlZFwiXSkgPyA8SVN1cnZleT5uZXdWYWx1ZSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5vblNldERhdGEoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBmaXJlQ2FsbGJhY2soY2FsbGJhY2s6ICgpID0+IHZvaWQpIHtcclxuICAgICAgICBpZiAoY2FsbGJhY2spIGNhbGxiYWNrKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25TZXREYXRhKCkgeyB9XHJcbiAgICBwcm90ZWN0ZWQgb25DcmVhdGluZygpIHsgfVxyXG4gICAgcHVibGljIHJ1bkNvbmRpdGlvbih2YWx1ZXM6IEhhc2hUYWJsZTxhbnk+KSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnZpc2libGVJZikgcmV0dXJuO1xyXG4gICAgICAgIGlmICghdGhpcy5jb25kaXRpb25SdW5uZXIpIHRoaXMuY29uZGl0aW9uUnVubmVyID0gbmV3IENvbmRpdGlvblJ1bm5lcih0aGlzLnZpc2libGVJZik7XHJcbiAgICAgICAgdGhpcy5jb25kaXRpb25SdW5uZXIuZXhwcmVzc2lvbiA9IHRoaXMudmlzaWJsZUlmO1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRoaXMuY29uZGl0aW9uUnVubmVyLnJ1bih2YWx1ZXMpO1xyXG4gICAgfVxyXG4gICAgLy9JUXVlc3Rpb25cclxuICAgIG9uU3VydmV5VmFsdWVDaGFuZ2VkKG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgIH1cclxuICAgIG9uU3VydmV5TG9hZCgpIHtcclxuICAgIH1cclxuICAgIHNldFZpc2libGVJbmRleCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHRoaXMudmlzaWJsZUluZGV4VmFsdWUgPT0gdmFsdWUpIHJldHVybjtcclxuICAgICAgICB0aGlzLnZpc2libGVJbmRleFZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy52aXNpYmxlSW5kZXhDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydEdvTmV4dFBhZ2VBdXRvbWF0aWMoKSB7IHJldHVybiBmYWxzZTsgfVxyXG59XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJxdWVzdGlvbmJhc2VcIiwgW1wiIW5hbWVcIiwgeyBuYW1lOiBcInZpc2libGU6Ym9vbGVhblwiLCBkZWZhdWx0OiB0cnVlIH0sIFwidmlzaWJsZUlmOnRleHRcIixcclxuICAgIHsgbmFtZTogXCJ3aWR0aFwiIH0sIHsgbmFtZTogXCJzdGFydFdpdGhOZXdMaW5lOmJvb2xlYW5cIiwgZGVmYXVsdDogdHJ1ZX0sIHtuYW1lOiBcImluZGVudDpudW1iZXJcIiwgZGVmYXVsdDogMCwgY2hvaWNlczogWzAsIDEsIDIsIDNdfV0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3F1ZXN0aW9uYmFzZS50c1xuICoqLyIsImV4cG9ydCBjbGFzcyBUZXh0UHJlUHJvY2Vzc29ySXRlbSB7XHJcbiAgICBwdWJsaWMgc3RhcnQ6IG51bWJlcjtcclxuICAgIHB1YmxpYyBlbmQ6IG51bWJlcjtcclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFRleHRQcmVQcm9jZXNzb3Ige1xyXG4gICAgcHVibGljIG9uUHJvY2VzczogKG5hbWU6IHN0cmluZykgPT4gYW55O1xyXG4gICAgcHVibGljIG9uSGFzVmFsdWU6IChuYW1lOiBzdHJpbmcpID0+IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcigpIHsgfVxyXG4gICAgcHVibGljIHByb2Nlc3ModGV4dDogc3RyaW5nKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAoIXRleHQpIHJldHVybiB0ZXh0O1xyXG4gICAgICAgIGlmICghdGhpcy5vblByb2Nlc3MpIHJldHVybiB0ZXh0O1xyXG4gICAgICAgIHZhciBpdGVtcyA9IHRoaXMuZ2V0SXRlbXModGV4dCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IGl0ZW1zLmxlbmd0aCAtIDE7IGkgPj0gMDsgaS0tKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gaXRlbXNbaV07XHJcbiAgICAgICAgICAgIHZhciBuYW1lID0gdGhpcy5nZXROYW1lKHRleHQuc3Vic3RyaW5nKGl0ZW0uc3RhcnQgKyAxLCBpdGVtLmVuZCkpO1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuY2FuUHJvY2Vzc05hbWUobmFtZSkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5vbkhhc1ZhbHVlICYmICF0aGlzLm9uSGFzVmFsdWUobmFtZSkpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLm9uUHJvY2VzcyhuYW1lKTtcclxuICAgICAgICAgICAgaWYgKHZhbHVlID09IG51bGwpIHZhbHVlID0gXCJcIjtcclxuICAgICAgICAgICAgdGV4dCA9IHRleHQuc3Vic3RyKDAsIGl0ZW0uc3RhcnQpICsgdmFsdWUgKyB0ZXh0LnN1YnN0cihpdGVtLmVuZCArIDEpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdGV4dDtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0SXRlbXModGV4dDogc3RyaW5nKTogQXJyYXk8VGV4dFByZVByb2Nlc3Nvckl0ZW0+IHtcclxuICAgICAgICB2YXIgaXRlbXMgPSBbXTtcclxuICAgICAgICB2YXIgbGVuZ3RoID0gdGV4dC5sZW5ndGg7XHJcbiAgICAgICAgdmFyIHN0YXJ0ID0gLTE7XHJcbiAgICAgICAgdmFyIGNoID0gJyc7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBjaCA9IHRleHRbaV07XHJcbiAgICAgICAgICAgIGlmIChjaCA9PSAneycpIHN0YXJ0ID0gaTtcclxuICAgICAgICAgICAgaWYgKGNoID09ICd9Jykge1xyXG4gICAgICAgICAgICAgICAgaWYgKHN0YXJ0ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgaXRlbSA9IG5ldyBUZXh0UHJlUHJvY2Vzc29ySXRlbSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0uc3RhcnQgPSBzdGFydDtcclxuICAgICAgICAgICAgICAgICAgICBpdGVtLmVuZCA9IGk7XHJcbiAgICAgICAgICAgICAgICAgICAgaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIHN0YXJ0ID0gLTE7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGl0ZW1zO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXROYW1lKG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKCFuYW1lKSByZXR1cm47XHJcbiAgICAgICAgcmV0dXJuIG5hbWUudHJpbSgpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjYW5Qcm9jZXNzTmFtZShuYW1lOiBzdHJpbmcpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIW5hbWUpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG5hbWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNoID0gbmFtZVtpXTtcclxuICAgICAgICAgICAgLy9UT0RPXHJcbiAgICAgICAgICAgIGlmIChjaCA9PSAnICcgfHwgY2ggPT0gJy0nIHx8IGNoID09ICcmJykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3RleHRQcmVQcm9jZXNzb3IudHNcbiAqKi8iLCJpbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4vcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtJdGVtVmFsdWUsIFN1cnZleUVycm9yfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tIFwiLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcbmltcG9ydCB7Q3VzdG9tRXJyb3J9IGZyb20gXCIuL2Vycm9yXCI7XHJcbmltcG9ydCB7Q2hvaWNlc1Jlc3RmdWxsfSBmcm9tIFwiLi9jaG9pY2VzUmVzdGZ1bGxcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblNlbGVjdEJhc2UgZXh0ZW5kcyBRdWVzdGlvbiB7XHJcbiAgICBwcml2YXRlIHZpc2libGVDaG9pY2VzQ2FjaGU6IEFycmF5PEl0ZW1WYWx1ZT4gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBjb21tZW50VmFsdWU6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBjYWNoZWRWYWx1ZTogYW55O1xyXG4gICAgb3RoZXJJdGVtOiBJdGVtVmFsdWUgPSBuZXcgSXRlbVZhbHVlKFwib3RoZXJcIiwgc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcIm90aGVySXRlbVRleHRcIikpO1xyXG4gICAgcHJpdmF0ZSBjaG9pY2VzRnJvbVVybDogQXJyYXk8SXRlbVZhbHVlPiA9IG51bGw7XHJcbiAgICBwcml2YXRlIGNhY2hlZFZhbHVlRm9yVXJsUmVxdWVzdGlvbjogYW55ID0gbnVsbDtcclxuICAgIHByaXZhdGUgY2hvaWNlc1ZhbHVlczogQXJyYXk8SXRlbVZhbHVlPiA9IG5ldyBBcnJheTxJdGVtVmFsdWU+KCk7XHJcbiAgICBwdWJsaWMgY2hvaWNlc0J5VXJsOiBDaG9pY2VzUmVzdGZ1bGw7XHJcbiAgICBwdWJsaWMgb3RoZXJFcnJvclRleHQ6IHN0cmluZyA9IG51bGw7XHJcbiAgICBwdWJsaWMgc3RvcmVPdGhlcnNBc0NvbW1lbnQ6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgY2hvaWNlc09yZGVyVmFsdWU6IHN0cmluZyA9IFwibm9uZVwiO1xyXG4gICAgY2hvaWNlc0NoYW5nZWRDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgICAgIHRoaXMuY2hvaWNlc0J5VXJsID0gdGhpcy5jcmVhdGVSZXN0ZnVsbCgpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmNob2ljZXNCeVVybC5nZXRSZXN1bHRDYWxsYmFjayA9IGZ1bmN0aW9uIChpdGVtczogQXJyYXk8SXRlbVZhbHVlPikgeyBzZWxmLm9uTG9hZENob2ljZXNGcm9tVXJsKGl0ZW1zKSB9O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc090aGVyU2VsZWN0ZWQoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0U3RvcmVPdGhlcnNBc0NvbW1lbnQoKSA/IHRoaXMuZ2V0SGFzT3RoZXIodGhpcy52YWx1ZSkgOiB0aGlzLmdldEhhc090aGVyKHRoaXMuY2FjaGVkVmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldEhhc090aGVyKHZhbDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHZhbCA9PSB0aGlzLm90aGVySXRlbS52YWx1ZTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVSZXN0ZnVsbCgpOiBDaG9pY2VzUmVzdGZ1bGwgeyByZXR1cm4gbmV3IENob2ljZXNSZXN0ZnVsbCgpOyB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0Q29tbWVudCgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLmdldFN0b3JlT3RoZXJzQXNDb21tZW50KCkpIHJldHVybiBzdXBlci5nZXRDb21tZW50KCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY29tbWVudFZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc1NldHRpbmdDb21tZW50OiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBwcm90ZWN0ZWQgc2V0Q29tbWVudChuZXdWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0U3RvcmVPdGhlcnNBc0NvbW1lbnQoKSlcclxuICAgICAgICAgICAgc3VwZXIuc2V0Q29tbWVudChuZXdWYWx1ZSk7XHJcbiAgICAgICAgZWxzZSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5pc1NldHRpbmdDb21tZW50ICYmIG5ld1ZhbHVlICE9IHRoaXMuY29tbWVudFZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2V0dGluZ0NvbW1lbnQgPSB0cnVlO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tZW50VmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICAgICAgICAgIGlmICh0aGlzLmlzT3RoZXJTZWxlY3RlZCkge1xyXG4gICAgICAgICAgICAgICAgICAgIHRoaXMuc2V0TmV3VmFsdWVJbkRhdGEodGhpcy5jYWNoZWRWYWx1ZSk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB0aGlzLmlzU2V0dGluZ0NvbW1lbnQgPSBmYWxzZTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzZXROZXdWYWx1ZShuZXdWYWx1ZTogYW55KSB7XHJcbiAgICAgICAgaWYgKG5ld1ZhbHVlKSB0aGlzLmNhY2hlZFZhbHVlRm9yVXJsUmVxdWVzdGlvbiA9IG5ld1ZhbHVlOyAgICAgICAgXHJcbiAgICAgICAgc3VwZXIuc2V0TmV3VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHZhbHVlRnJvbURhdGEodmFsOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmICh0aGlzLmdldFN0b3JlT3RoZXJzQXNDb21tZW50KCkpIHJldHVybiBzdXBlci52YWx1ZUZyb21EYXRhKHZhbCk7XHJcbiAgICAgICAgdGhpcy5jYWNoZWRWYWx1ZSA9IHRoaXMudmFsdWVGcm9tRGF0YUNvcmUodmFsKTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jYWNoZWRWYWx1ZTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCB2YWx1ZVRvRGF0YSh2YWw6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2V0U3RvcmVPdGhlcnNBc0NvbW1lbnQoKSkgcmV0dXJuIHN1cGVyLnZhbHVlVG9EYXRhKHZhbCk7XHJcbiAgICAgICAgdGhpcy5jYWNoZWRWYWx1ZSA9IHZhbDtcclxuICAgICAgICByZXR1cm4gdGhpcy52YWx1ZVRvRGF0YUNvcmUodmFsKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCB2YWx1ZUZyb21EYXRhQ29yZSh2YWw6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc1Vua25vd25WYWx1ZSh2YWwpKSByZXR1cm4gdmFsO1xyXG4gICAgICAgIGlmICh2YWwgPT0gdGhpcy5vdGhlckl0ZW0udmFsdWUpIHJldHVybiB2YWw7XHJcbiAgICAgICAgdGhpcy5jb21tZW50ID0gdmFsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLm90aGVySXRlbS52YWx1ZTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCB2YWx1ZVRvRGF0YUNvcmUodmFsOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmICh2YWwgPT0gdGhpcy5vdGhlckl0ZW0udmFsdWUgJiYgdGhpcy5nZXRDb21tZW50KCkpIHtcclxuICAgICAgICAgICAgdmFsID0gdGhpcy5nZXRDb21tZW50KCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgaGFzVW5rbm93blZhbHVlKHZhbDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF2YWwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgaXRlbXMgPSB0aGlzLmFjdGl2ZUNob2ljZXM7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaXRlbXNbaV0udmFsdWUgPT0gdmFsKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgZ2V0IGNob2ljZXMoKTogQXJyYXk8YW55PiB7IHJldHVybiB0aGlzLmNob2ljZXNWYWx1ZXM7IH1cclxuICAgIHNldCBjaG9pY2VzKG5ld1ZhbHVlOiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgSXRlbVZhbHVlLnNldERhdGEodGhpcy5jaG9pY2VzVmFsdWVzLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgdGhpcy5vblZpc2libGVDaG9pY2VzQ2hhbmdlZCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGhhc090aGVyQ2hhbmdlZCgpIHtcclxuICAgICAgICB0aGlzLm9uVmlzaWJsZUNob2ljZXNDaGFuZ2VkKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgY2hvaWNlc09yZGVyKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLmNob2ljZXNPcmRlclZhbHVlOyB9XHJcbiAgICBzZXQgY2hvaWNlc09yZGVyKG5ld1ZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPT0gdGhpcy5jaG9pY2VzT3JkZXJWYWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY2hvaWNlc09yZGVyVmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICB0aGlzLm9uVmlzaWJsZUNob2ljZXNDaGFuZ2VkKCk7XHJcbiAgICB9XHJcbiAgICBnZXQgb3RoZXJUZXh0KCk6IHN0cmluZyB7IHJldHVybiB0aGlzLm90aGVySXRlbS50ZXh0OyB9XHJcbiAgICBzZXQgb3RoZXJUZXh0KHZhbHVlOiBzdHJpbmcpIHsgdGhpcy5vdGhlckl0ZW0udGV4dCA9IHZhbHVlOyB9XHJcbiAgICBnZXQgdmlzaWJsZUNob2ljZXMoKTogQXJyYXk8SXRlbVZhbHVlPiB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmhhc090aGVyICYmIHRoaXMuY2hvaWNlc09yZGVyID09IFwibm9uZVwiKSByZXR1cm4gdGhpcy5hY3RpdmVDaG9pY2VzO1xyXG4gICAgICAgIGlmKCF0aGlzLnZpc2libGVDaG9pY2VzQ2FjaGUpIHtcclxuICAgICAgICAgICAgdGhpcy52aXNpYmxlQ2hvaWNlc0NhY2hlID0gdGhpcy5zb3J0VmlzaWJsZUNob2ljZXModGhpcy5hY3RpdmVDaG9pY2VzLnNsaWNlKCkpO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNPdGhlcikge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52aXNpYmxlQ2hvaWNlc0NhY2hlLnB1c2godGhpcy5vdGhlckl0ZW0pO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVDaG9pY2VzQ2FjaGU7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGdldCBhY3RpdmVDaG9pY2VzKCk6IEFycmF5PEl0ZW1WYWx1ZT4geyByZXR1cm4gdGhpcy5jaG9pY2VzRnJvbVVybCA/IHRoaXMuY2hvaWNlc0Zyb21VcmwgOiB0aGlzLmNob2ljZXM7IH1cclxuICAgIHB1YmxpYyBzdXBwb3J0Q29tbWVudCgpOiBib29sZWFuIHsgcmV0dXJuIHRydWU7IH1cclxuICAgIHB1YmxpYyBzdXBwb3J0T3RoZXIoKTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XHJcbiAgICBwcm90ZWN0ZWQgb25DaGVja0ZvckVycm9ycyhlcnJvcnM6IEFycmF5PFN1cnZleUVycm9yPikge1xyXG4gICAgICAgIHN1cGVyLm9uQ2hlY2tGb3JFcnJvcnMoZXJyb3JzKTtcclxuICAgICAgICBpZiAoIXRoaXMuaXNPdGhlclNlbGVjdGVkIHx8IHRoaXMuY29tbWVudCkgcmV0dXJuO1xyXG4gICAgICAgIHZhciB0ZXh0ID0gdGhpcy5vdGhlckVycm9yVGV4dDtcclxuICAgICAgICBpZiAoIXRleHQpIHtcclxuICAgICAgICAgICAgdGV4dCA9IHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJvdGhlclJlcXVpcmVkRXJyb3JcIik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVycm9ycy5wdXNoKG5ldyBDdXN0b21FcnJvcih0ZXh0KSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0U3RvcmVPdGhlcnNBc0NvbW1lbnQoKSB7IHJldHVybiB0aGlzLnN0b3JlT3RoZXJzQXNDb21tZW50ICYmICh0aGlzLnN1cnZleSAhPSBudWxsID8gdGhpcy5zdXJ2ZXkuc3RvcmVPdGhlcnNBc0NvbW1lbnQgOiB0cnVlKTsgfVxyXG4gICAgb25TdXJ2ZXlMb2FkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmNob2ljZXNCeVVybCkgdGhpcy5jaG9pY2VzQnlVcmwucnVuKCk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9uTG9hZENob2ljZXNGcm9tVXJsKGFycmF5OiBBcnJheTxJdGVtVmFsdWU+KSB7XHJcbiAgICAgICAgdmFyIGVycm9yQ291bnQgPSB0aGlzLmVycm9ycy5sZW5ndGg7XHJcbiAgICAgICAgdGhpcy5lcnJvcnMgPSBbXTtcclxuICAgICAgICBpZiAodGhpcy5jaG9pY2VzQnlVcmwgJiYgdGhpcy5jaG9pY2VzQnlVcmwuZXJyb3IpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcnMucHVzaCh0aGlzLmNob2ljZXNCeVVybC5lcnJvcik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChlcnJvckNvdW50ID4gMCB8fCB0aGlzLmVycm9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMuZXJyb3JzQ2hhbmdlZENhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIG5ld0Nob2ljZXMgPSBudWxsO1xyXG4gICAgICAgIGlmIChhcnJheSAmJiBhcnJheS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIG5ld0Nob2ljZXMgPSBuZXcgQXJyYXk8SXRlbVZhbHVlPigpO1xyXG4gICAgICAgICAgICBJdGVtVmFsdWUuc2V0RGF0YShuZXdDaG9pY2VzLCBhcnJheSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuY2hvaWNlc0Zyb21VcmwgPSBuZXdDaG9pY2VzO1xyXG4gICAgICAgIHRoaXMub25WaXNpYmxlQ2hvaWNlc0NoYW5nZWQoKTtcclxuICAgICAgICBpZiAodGhpcy5jYWNoZWRWYWx1ZUZvclVybFJlcXVlc3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZSA9IHRoaXMuY2FjaGVkVmFsdWVGb3JVcmxSZXF1ZXN0aW9uO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgb25WaXNpYmxlQ2hvaWNlc0NoYW5nZWQoKSB7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlQ2hvaWNlc0NhY2hlID0gbnVsbDtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmNob2ljZXNDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzb3J0VmlzaWJsZUNob2ljZXMoYXJyYXk6IEFycmF5PEl0ZW1WYWx1ZT4pOiBBcnJheTxJdGVtVmFsdWU+IHtcclxuICAgICAgICB2YXIgb3JkZXIgPSB0aGlzLmNob2ljZXNPcmRlci50b0xvd2VyQ2FzZSgpO1xyXG4gICAgICAgIGlmIChvcmRlciA9PSBcImFzY1wiKSByZXR1cm4gdGhpcy5zb3J0QXJyYXkoYXJyYXksIDEpO1xyXG4gICAgICAgIGlmIChvcmRlciA9PSBcImRlc2NcIikgcmV0dXJuIHRoaXMuc29ydEFycmF5KGFycmF5LCAtMSk7XHJcbiAgICAgICAgaWYgKG9yZGVyID09IFwicmFuZG9tXCIpIHJldHVybiB0aGlzLnJhbmRvbWl6ZUFycmF5KGFycmF5KTtcclxuICAgICAgICByZXR1cm4gYXJyYXk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNvcnRBcnJheShhcnJheTogQXJyYXk8SXRlbVZhbHVlPiwgbXVsdDogbnVtYmVyKTogQXJyYXk8SXRlbVZhbHVlPiB7XHJcbiAgICAgICAgcmV0dXJuIGFycmF5LnNvcnQoZnVuY3Rpb24gKGEsIGIpIHtcclxuICAgICAgICAgICAgaWYgKGEudGV4dCA8IGIudGV4dCkgcmV0dXJuIC0xICogbXVsdDtcclxuICAgICAgICAgICAgaWYgKGEudGV4dCA+IGIudGV4dCkgcmV0dXJuIDEgKiBtdWx0O1xyXG4gICAgICAgICAgICByZXR1cm4gMDtcclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgcmFuZG9taXplQXJyYXkoYXJyYXk6IEFycmF5PEl0ZW1WYWx1ZT4pOiBBcnJheTxJdGVtVmFsdWU+IHtcclxuICAgICAgICBmb3IgKHZhciBpID0gYXJyYXkubGVuZ3RoIC0gMTsgaSA+IDA7IGktLSkge1xyXG4gICAgICAgICAgICB2YXIgaiA9IE1hdGguZmxvb3IoTWF0aC5yYW5kb20oKSAqIChpICsgMSkpO1xyXG4gICAgICAgICAgICB2YXIgdGVtcCA9IGFycmF5W2ldO1xyXG4gICAgICAgICAgICBhcnJheVtpXSA9IGFycmF5W2pdO1xyXG4gICAgICAgICAgICBhcnJheVtqXSA9IHRlbXA7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBhcnJheTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uQ2hlY2tib3hCYXNlIGV4dGVuZHMgUXVlc3Rpb25TZWxlY3RCYXNlIHtcclxuICAgIHByaXZhdGUgY29sQ291bnRWYWx1ZTogbnVtYmVyID0gMTtcclxuICAgIGNvbENvdW50Q2hhbmdlZENhbGxiYWNrOiAoKSA9PiB2b2lkO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBjb2xDb3VudCgpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5jb2xDb3VudFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IGNvbENvdW50KHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodmFsdWUgPCAwIHx8IHZhbHVlID4gNCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuY29sQ291bnRWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMuY29sQ291bnRDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgfVxyXG59XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJzZWxlY3RiYXNlXCIsIFtcImhhc0NvbW1lbnQ6Ym9vbGVhblwiLCBcImhhc090aGVyOmJvb2xlYW5cIixcclxuICAgIHsgbmFtZTogXCJjaG9pY2VzOml0ZW12YWx1ZXNcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBJdGVtVmFsdWUuZ2V0RGF0YShvYmouY2hvaWNlcyk7IH0sIG9uU2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSwgdmFsdWU6IGFueSkgeyBvYmouY2hvaWNlcyA9IHZhbHVlOyB9fSxcclxuICAgIHsgbmFtZTogXCJjaG9pY2VzT3JkZXJcIiwgZGVmYXVsdDogXCJub25lXCIsIGNob2ljZXM6IFtcIm5vbmVcIiwgXCJhc2NcIiwgXCJkZXNjXCIsIFwicmFuZG9tXCJdIH0sXHJcbiAgICB7IG5hbWU6IFwiY2hvaWNlc0J5VXJsOnJlc3RmdWxsXCIsIGNsYXNzTmFtZTogXCJDaG9pY2VzUmVzdGZ1bGxcIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmouY2hvaWNlc0J5VXJsLmlzRW1wdHkgPyBudWxsIDogb2JqLmNob2ljZXNCeVVybDsgfSwgb25TZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55LCB2YWx1ZTogYW55KSB7IG9iai5jaG9pY2VzQnlVcmwuc2V0RGF0YSh2YWx1ZSk7IH0gfSxcclxuICAgIHsgbmFtZTogXCJvdGhlclRleHRcIiwgZGVmYXVsdDogc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcIm90aGVySXRlbVRleHRcIikgfSwgXCJvdGhlckVycm9yVGV4dFwiLFxyXG4gICAgeyBuYW1lOiBcInN0b3JlT3RoZXJzQXNDb21tZW50OmJvb2xlYW5cIiwgZGVmYXVsdDogdHJ1ZX1dLCBudWxsLCBcInF1ZXN0aW9uXCIpO1xyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcImNoZWNrYm94YmFzZVwiLCBbeyBuYW1lOiBcImNvbENvdW50Om51bWJlclwiLCBkZWZhdWx0OiAxLCBjaG9pY2VzOiBbMCwgMSwgMiwgMywgNF0gfV0sIG51bGwsIFwic2VsZWN0YmFzZVwiKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbl9iYXNlc2VsZWN0LnRzXG4gKiovIiwiaW1wb3J0IHtRdWVzdGlvbkJhc2V9IGZyb20gJy4vcXVlc3Rpb25iYXNlJztcclxuaW1wb3J0IHtIYXNoVGFibGV9IGZyb20gXCIuL2Jhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkZhY3Rvcnkge1xyXG4gICAgcHVibGljIHN0YXRpYyBJbnN0YW5jZTogUXVlc3Rpb25GYWN0b3J5ID0gbmV3IFF1ZXN0aW9uRmFjdG9yeSgpO1xyXG4gICAgcHVibGljIHN0YXRpYyBEZWZhdWx0Q2hvaWNlcyA9IFtcIm9uZVwiLCBcInR3b3xzZWNvbmQgdmFsdWVcIiwgXCJ0aHJlZXx0aGlyZCB2YWx1ZVwiXTtcclxuICAgIHByaXZhdGUgY3JlYXRvckhhc2g6IEhhc2hUYWJsZTwobmFtZTogc3RyaW5nKSA9PiBRdWVzdGlvbkJhc2U+ID0ge307XHJcblxyXG4gICAgcHVibGljIHJlZ2lzdGVyUXVlc3Rpb24ocXVlc3Rpb25UeXBlOiBzdHJpbmcsIHF1ZXN0aW9uQ3JlYXRvcjogKG5hbWU6IHN0cmluZykgPT4gUXVlc3Rpb25CYXNlKSB7XHJcbiAgICAgICAgdGhpcy5jcmVhdG9ySGFzaFtxdWVzdGlvblR5cGVdID0gcXVlc3Rpb25DcmVhdG9yO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldEFsbFR5cGVzKCk6IEFycmF5PHN0cmluZz4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xyXG4gICAgICAgIGZvcih2YXIga2V5IGluIHRoaXMuY3JlYXRvckhhc2gpIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2goa2V5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdC5zb3J0KCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY3JlYXRlUXVlc3Rpb24ocXVlc3Rpb25UeXBlOiBzdHJpbmcsIG5hbWU6IHN0cmluZyk6IFF1ZXN0aW9uQmFzZSB7XHJcbiAgICAgICAgdmFyIGNyZWF0b3IgPSB0aGlzLmNyZWF0b3JIYXNoW3F1ZXN0aW9uVHlwZV07XHJcbiAgICAgICAgaWYgKGNyZWF0b3IgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIGNyZWF0b3IobmFtZSk7XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbmZhY3RvcnkudHNcbiAqKi8iLCJpbXBvcnQge1F1ZXN0aW9uTWF0cml4RHJvcGRvd25Nb2RlbEJhc2UsXHJcbiAgICBNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZSxcclxuICAgIElNYXRyaXhEcm9wZG93bkRhdGFcclxufSBmcm9tIFwiLi9xdWVzdGlvbl9tYXRyaXhkcm9wZG93bmJhc2VcIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7SXRlbVZhbHVlfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBNYXRyaXhEcm9wZG93blJvd01vZGVsIGV4dGVuZHMgTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IGFueSwgcHVibGljIHRleHQ6IHN0cmluZywgZGF0YTogSU1hdHJpeERyb3Bkb3duRGF0YSwgdmFsdWU6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKGRhdGEsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcm93TmFtZSgpIHsgcmV0dXJuIHRoaXMubmFtZTsgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWwgZXh0ZW5kcyBRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWxCYXNlIGltcGxlbWVudHMgSU1hdHJpeERyb3Bkb3duRGF0YSB7XHJcbiAgICBwcml2YXRlIHJvd3NWYWx1ZTogSXRlbVZhbHVlW10gPSBbXTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIm1hdHJpeGRyb3Bkb3duXCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHJvd3MoKTogQXJyYXk8YW55PiB7IHJldHVybiB0aGlzLnJvd3NWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCByb3dzKG5ld1ZhbHVlOiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgSXRlbVZhbHVlLnNldERhdGEodGhpcy5yb3dzVmFsdWUsIG5ld1ZhbHVlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZW5lcmF0ZVJvd3MoKTogQXJyYXk8TWF0cml4RHJvcGRvd25Sb3dNb2RlbD4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXk8TWF0cml4RHJvcGRvd25Sb3dNb2RlbD4oKTtcclxuICAgICAgICBpZiAoIXRoaXMucm93cyB8fCB0aGlzLnJvd3MubGVuZ3RoID09PSAwKSByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIGlmICghdmFsKSB2YWwgPSB7fTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMucm93c1tpXS52YWx1ZSkgY29udGludWU7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuY3JlYXRlTWF0cml4Um93KHRoaXMucm93c1tpXS52YWx1ZSwgdGhpcy5yb3dzW2ldLnRleHQsIHZhbFt0aGlzLnJvd3NbaV0udmFsdWVdKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlTWF0cml4Um93KG5hbWU6IGFueSwgdGV4dDogc3RyaW5nLCB2YWx1ZTogYW55KTogTWF0cml4RHJvcGRvd25Sb3dNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIG5ldyBNYXRyaXhEcm9wZG93blJvd01vZGVsKG5hbWUsIHRleHQsIHRoaXMsIHZhbHVlKTtcclxuICAgIH1cclxufVxyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcIm1hdHJpeGRyb3Bkb3duXCIsIFt7IG5hbWU6IFwicm93czppdGVtdmFsdWVzXCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gSXRlbVZhbHVlLmdldERhdGEob2JqLnJvd3MpOyB9LCBvblNldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnksIHZhbHVlOiBhbnkpIHsgb2JqLnJvd3MgPSB2YWx1ZTsgfX1dLFxyXG4gICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uTWF0cml4RHJvcGRvd25Nb2RlbChcIlwiKTsgfSwgXCJtYXRyaXhkcm9wZG93bmJhc2VcIik7XHJcblxyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcIm1hdHJpeGRyb3Bkb3duXCIsIChuYW1lKSA9PiB7IHZhciBxID0gbmV3IFF1ZXN0aW9uTWF0cml4RHJvcGRvd25Nb2RlbChuYW1lKTsgcS5jaG9pY2VzID0gWzEsIDIsIDMsIDQsIDVdOyBxLnJvd3MgPSBbXCJSb3cgMVwiLCBcIlJvdyAyXCJdOyBxLmFkZENvbHVtbihcIkNvbHVtbiAxXCIpOyBxLmFkZENvbHVtbihcIkNvbHVtbiAyXCIpOyBxLmFkZENvbHVtbihcIkNvbHVtbiAzXCIpOyByZXR1cm4gcTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fbWF0cml4ZHJvcGRvd24udHNcbiAqKi8iLCJpbXBvcnQge1F1ZXN0aW9uTWF0cml4RHJvcGRvd25Nb2RlbEJhc2UsXHJcbiAgICBNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZSwgSU1hdHJpeERyb3Bkb3duRGF0YVxyXG59IGZyb20gXCIuL3F1ZXN0aW9uX21hdHJpeGRyb3Bkb3duYmFzZVwiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4vc3VydmV5U3RyaW5nc1wiO1xyXG5pbXBvcnQge1N1cnZleUVycm9yfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7Q3VzdG9tRXJyb3J9IGZyb20gXCIuL2Vycm9yXCI7XHJcblxyXG5leHBvcnQgY2xhc3MgTWF0cml4RHluYW1pY1Jvd01vZGVsIGV4dGVuZHMgTWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIGluZGV4OiBudW1iZXIsIGRhdGE6IElNYXRyaXhEcm9wZG93bkRhdGEsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihkYXRhLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHJvd05hbWUoKSB7IHJldHVybiBcInJvd1wiICsgdGhpcy5pbmRleDsgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25NYXRyaXhEeW5hbWljTW9kZWwgZXh0ZW5kcyBRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWxCYXNlIGltcGxlbWVudHMgSU1hdHJpeERyb3Bkb3duRGF0YSB7XHJcbiAgICBzdGF0aWMgTWF4Um93Q291bnQgPSAxMDA7XHJcbiAgICBwcml2YXRlIHJvd0NvdW50ZXIgPSAwO1xyXG4gICAgcHJpdmF0ZSByb3dDb3VudFZhbHVlOiBudW1iZXIgPSAyO1xyXG4gICAgcHJpdmF0ZSBhZGRSb3dUZXh0VmFsdWU6IHN0cmluZyA9IG51bGw7XHJcbiAgICBwcml2YXRlIHJlbW92ZVJvd1RleHRWYWx1ZTogc3RyaW5nID0gbnVsbDtcclxuICAgIHB1YmxpYyBtaW5Sb3dDb3VudCA9IDA7XHJcbiAgICBwdWJsaWMgcm93Q291bnRDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIm1hdHJpeGR5bmFtaWNcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcm93Q291bnQoKSB7IHJldHVybiB0aGlzLnJvd0NvdW50VmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgcm93Q291bnQodmFsOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodmFsIDwgMCB8fCB2YWwgPiBRdWVzdGlvbk1hdHJpeER5bmFtaWNNb2RlbC5NYXhSb3dDb3VudCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucm93Q291bnRWYWx1ZSA9IHZhbDtcclxuICAgICAgICBpZiAodGhpcy52YWx1ZSAmJiB0aGlzLnZhbHVlLmxlbmd0aCA+IHZhbCkge1xyXG4gICAgICAgICAgICB2YXIgcVZhbCA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgICAgIHFWYWwuc3BsaWNlKHZhbCk7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWUgPSBxVmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLnJvd0NvdW50Q2hhbmdlZENhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBhZGRSb3coKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MpIHtcclxuICAgICAgICAgICAgdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cy5wdXNoKHRoaXMuY3JlYXRlTWF0cml4Um93KG51bGwpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5yb3dDb3VudCsrO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbW92ZVJvdyhpbmRleDogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLnJvd0NvdW50KSByZXR1cm47XHJcbiAgICAgICAgaWYgKHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MgJiYgaW5kZXggPCB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzLmxlbmd0aCkge1xyXG4gICAgICAgICAgICB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLnZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhciB2YWwgPSB0aGlzLmNyZWF0ZU5ld1ZhbHVlKHRoaXMudmFsdWUpO1xyXG4gICAgICAgICAgICB2YWwuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICAgICAgdmFsID0gdGhpcy5kZWxldGVSb3dWYWx1ZSh2YWwsIG51bGwpO1xyXG4gICAgICAgICAgICB0aGlzLnZhbHVlID0gdmFsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnJvd0NvdW50LS07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGFkZFJvd1RleHQoKSB7IHJldHVybiB0aGlzLmFkZFJvd1RleHRWYWx1ZSA/IHRoaXMuYWRkUm93VGV4dFZhbHVlIDogc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcImFkZFJvd1wiKTsgfVxyXG4gICAgcHVibGljIHNldCBhZGRSb3dUZXh0KHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICB0aGlzLmFkZFJvd1RleHRWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCByZW1vdmVSb3dUZXh0KCkgeyByZXR1cm4gdGhpcy5yZW1vdmVSb3dUZXh0VmFsdWUgPyB0aGlzLnJlbW92ZVJvd1RleHRWYWx1ZSA6IHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJyZW1vdmVSb3dcIik7IH1cclxuICAgIHB1YmxpYyBzZXQgcmVtb3ZlUm93VGV4dCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5yZW1vdmVSb3dUZXh0VmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY2FjaGVkVmlzaWJsZVJvd3MoKTogQXJyYXk8TWF0cml4RHJvcGRvd25Sb3dNb2RlbEJhc2U+IHtcclxuICAgICAgICBpZiAodGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cyAmJiB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzLmxlbmd0aCA9PSB0aGlzLnJvd0NvdW50KSByZXR1cm4gdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cztcclxuICAgICAgICByZXR1cm4gdGhpcy52aXNpYmxlUm93cztcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkNoZWNrRm9yRXJyb3JzKGVycm9yczogQXJyYXk8U3VydmV5RXJyb3I+KSB7XHJcbiAgICAgICAgc3VwZXIub25DaGVja0ZvckVycm9ycyhlcnJvcnMpO1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0Vycm9ySW5Sb3dzKCkpIHtcclxuICAgICAgICAgICAgZXJyb3JzLnB1c2gobmV3IEN1c3RvbUVycm9yKHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJtaW5Sb3dDb3VudEVycm9yXCIpW1wiZm9ybWF0XCJdKHRoaXMubWluUm93Q291bnQpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBoYXNFcnJvckluUm93cygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5taW5Sb3dDb3VudCA8PSAwIHx8ICF0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIHJlcyA9IGZhbHNlO1xyXG4gICAgICAgIHZhciBzZXRSb3dDb3VudCA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgcm93SW5kZXggPSAwOyByb3dJbmRleCA8IHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MubGVuZ3RoOyByb3dJbmRleCsrKSB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzW3Jvd0luZGV4XTtcclxuICAgICAgICAgICAgaWYgKCFyb3cuaXNFbXB0eSkgc2V0Um93Q291bnQrKztcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHNldFJvd0NvdW50IDwgdGhpcy5taW5Sb3dDb3VudDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZW5lcmF0ZVJvd3MoKTogQXJyYXk8TWF0cml4RHluYW1pY1Jvd01vZGVsPiB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheTxNYXRyaXhEeW5hbWljUm93TW9kZWw+KCk7XHJcbiAgICAgICAgaWYgKHRoaXMucm93Q291bnQgPT09IDApIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMuY3JlYXRlTmV3VmFsdWUodGhpcy52YWx1ZSk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJvd0NvdW50OyBpKyspIHtcclxuICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5jcmVhdGVNYXRyaXhSb3codGhpcy5nZXRSb3dWYWx1ZUJ5SW5kZXgodmFsLCBpKSkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZU1hdHJpeFJvdyh2YWx1ZTogYW55KTogTWF0cml4RHluYW1pY1Jvd01vZGVsIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeER5bmFtaWNSb3dNb2RlbCh0aGlzLnJvd0NvdW50ZXIgKyssIHRoaXMsIHZhbHVlKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVOZXdWYWx1ZShjdXJWYWx1ZTogYW55KTogYW55IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gY3VyVmFsdWU7XHJcbiAgICAgICAgaWYgKCFyZXN1bHQpIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIHZhciByID0gW107XHJcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPiB0aGlzLnJvd0NvdW50KSByZXN1bHQuc3BsaWNlKHRoaXMucm93Q291bnQgLSAxKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gcmVzdWx0Lmxlbmd0aDsgaSA8IHRoaXMucm93Q291bnQ7IGkrKykge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh7fSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZGVsZXRlUm93VmFsdWUobmV3VmFsdWU6IGFueSwgcm93OiBNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZSk6IGFueSB7XHJcbiAgICAgICAgdmFyIGlzRW1wdHkgPSB0cnVlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgbmV3VmFsdWUubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKE9iamVjdC5rZXlzKG5ld1ZhbHVlW2ldKS5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgICAgICBpc0VtcHR5ID0gZmFsc2U7XHJcbiAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gaXNFbXB0eSA/IG51bGwgOiBuZXdWYWx1ZTtcclxuICAgIH1cclxuXHJcbiAgICBwcml2YXRlIGdldFJvd1ZhbHVlQnlJbmRleChxdWVzdGlvblZhbHVlOiBhbnksIGluZGV4OiBudW1iZXIpOiBhbnkge1xyXG4gICAgICAgIHJldHVybiBpbmRleCA+PSAwICYmIGluZGV4IDwgcXVlc3Rpb25WYWx1ZS5sZW5ndGggPyBxdWVzdGlvblZhbHVlW2luZGV4XSA6IG51bGw7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZ2V0Um93VmFsdWUocm93OiBNYXRyaXhEcm9wZG93blJvd01vZGVsQmFzZSwgcXVlc3Rpb25WYWx1ZTogYW55LCBjcmVhdGU6IGJvb2xlYW4gPSBmYWxzZSk6IGFueSB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZ2V0Um93VmFsdWVCeUluZGV4KHF1ZXN0aW9uVmFsdWUsIHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MuaW5kZXhPZihyb3cpKTtcclxuICAgIH1cclxufVxyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcIm1hdHJpeGR5bmFtaWNcIiwgW3sgbmFtZTogXCJyb3dDb3VudDpudW1iZXJcIiwgZGVmYXVsdDogMiB9LCB7IG5hbWU6IFwibWluUm93Q291bnQ6bnVtYmVyXCIsIGRlZmF1bHQ6IDAgfSxcclxuICAgICAgICB7IG5hbWU6IFwiYWRkUm93VGV4dFwiLCBvbkdldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnkpIHsgcmV0dXJuIG9iai5hZGRSb3dUZXh0VmFsdWU7IH0gfSxcclxuICAgICAgICB7IG5hbWU6IFwicmVtb3ZlUm93VGV4dFwiLCBvbkdldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnkpIHsgcmV0dXJuIG9iai5yZW1vdmVSb3dUZXh0VmFsdWU7IH0gfV0sXHJcbiAgICBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUXVlc3Rpb25NYXRyaXhEeW5hbWljTW9kZWwoXCJcIik7IH0sIFwibWF0cml4ZHJvcGRvd25iYXNlXCIpO1xyXG5cclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJtYXRyaXhkeW5hbWljXCIsIChuYW1lKSA9PiB7IHZhciBxID0gbmV3IFF1ZXN0aW9uTWF0cml4RHluYW1pY01vZGVsKG5hbWUpOyBxLmNob2ljZXMgPSBbMSwgMiwgMywgNCwgNV07IHEuYWRkQ29sdW1uKFwiQ29sdW1uIDFcIik7IHEuYWRkQ29sdW1uKFwiQ29sdW1uIDJcIik7IHEuYWRkQ29sdW1uKFwiQ29sdW1uIDNcIik7IHJldHVybiBxOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbl9tYXRyaXhkeW5hbWljLnRzXG4gKiovIiwiaW1wb3J0IHtCYXNlLCBJdGVtVmFsdWV9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4vcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7U3VydmV5RXJyb3J9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gJy4vc3VydmV5U3RyaW5ncyc7XHJcbmltcG9ydCB7Q3VzdG9tRXJyb3J9IGZyb20gXCIuL2Vycm9yXCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSU1hdHJpeERhdGEge1xyXG4gICAgb25NYXRyaXhSb3dDaGFuZ2VkKHJvdzogTWF0cml4Um93TW9kZWwpO1xyXG59XHJcbmV4cG9ydCBjbGFzcyBNYXRyaXhSb3dNb2RlbCBleHRlbmRzIEJhc2Uge1xyXG4gICAgcHJpdmF0ZSBkYXRhOiBJTWF0cml4RGF0YTtcclxuICAgIHByb3RlY3RlZCByb3dWYWx1ZTogYW55OyBcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogYW55LCBwdWJsaWMgdGV4dDogc3RyaW5nLCBwdWJsaWMgZnVsbE5hbWU6IHN0cmluZywgZGF0YTogSU1hdHJpeERhdGEsIHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICAgICAgdGhpcy5yb3dWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCB2YWx1ZSgpIHsgcmV0dXJuIHRoaXMucm93VmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgdmFsdWUobmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMucm93VmFsdWUgPSBuZXdWYWx1ZTtcclxuICAgICAgICBpZiAodGhpcy5kYXRhKSB0aGlzLmRhdGEub25NYXRyaXhSb3dDaGFuZ2VkKHRoaXMpO1xyXG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZWQoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblZhbHVlQ2hhbmdlZCgpIHtcclxuICAgIH1cclxufVxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25NYXRyaXhNb2RlbCBleHRlbmRzIFF1ZXN0aW9uIGltcGxlbWVudHMgSU1hdHJpeERhdGEge1xyXG4gICAgcHJpdmF0ZSBjb2x1bW5zVmFsdWU6IEl0ZW1WYWx1ZVtdID0gW107XHJcbiAgICBwcml2YXRlIHJvd3NWYWx1ZTogSXRlbVZhbHVlW10gPSBbXTtcclxuICAgIHByaXZhdGUgaXNSb3dDaGFuZ2luZyA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBnZW5lcmF0ZWRWaXNpYmxlUm93czogQXJyYXk8TWF0cml4Um93TW9kZWw+O1xyXG4gICAgcHVibGljIGlzQWxsUm93UmVxdWlyZWQ6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwibWF0cml4XCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGhhc1Jvd3MoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm93c1ZhbHVlLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcbiAgICBnZXQgY29sdW1ucygpOiBBcnJheTxhbnk+IHsgcmV0dXJuIHRoaXMuY29sdW1uc1ZhbHVlOyB9XHJcbiAgICBzZXQgY29sdW1ucyhuZXdWYWx1ZTogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIEl0ZW1WYWx1ZS5zZXREYXRhKHRoaXMuY29sdW1uc1ZhbHVlLCBuZXdWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBnZXQgcm93cygpOiBBcnJheTxhbnk+IHsgcmV0dXJuIHRoaXMucm93c1ZhbHVlOyB9XHJcbiAgICBzZXQgcm93cyhuZXdWYWx1ZTogQXJyYXk8YW55Pikge1xyXG4gICAgICAgIEl0ZW1WYWx1ZS5zZXREYXRhKHRoaXMucm93c1ZhbHVlLCBuZXdWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHZpc2libGVSb3dzKCk6IEFycmF5PE1hdHJpeFJvd01vZGVsPiB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheTxNYXRyaXhSb3dNb2RlbD4oKTtcclxuICAgICAgICB2YXIgdmFsID0gdGhpcy52YWx1ZTtcclxuICAgICAgICBpZiAoIXZhbCkgdmFsID0ge307XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJvd3MubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLnJvd3NbaV0udmFsdWUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmNyZWF0ZU1hdHJpeFJvdyh0aGlzLnJvd3NbaV0udmFsdWUsIHRoaXMucm93c1tpXS50ZXh0LCB0aGlzLm5hbWUgKyAnXycgKyB0aGlzLnJvd3NbaV0udmFsdWUudG9TdHJpbmcoKSwgdmFsW3RoaXMucm93c1tpXS52YWx1ZV0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHJlc3VsdC5sZW5ndGggPT0gMCkge1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaCh0aGlzLmNyZWF0ZU1hdHJpeFJvdyhudWxsLCBcIlwiLCB0aGlzLm5hbWUsIHZhbCkpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzID0gcmVzdWx0O1xyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25DaGVja0ZvckVycm9ycyhlcnJvcnM6IEFycmF5PFN1cnZleUVycm9yPikge1xyXG4gICAgICAgIHN1cGVyLm9uQ2hlY2tGb3JFcnJvcnMoZXJyb3JzKTtcclxuICAgICAgICBpZiAodGhpcy5oYXNFcnJvckluUm93cygpKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzLnB1c2gobmV3IEN1c3RvbUVycm9yKHN1cnZleUxvY2FsaXphdGlvbi5nZXRTdHJpbmcoXCJyZXF1aXJlZEluQWxsUm93c0Vycm9yXCIpKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBoYXNFcnJvckluUm93cygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNBbGxSb3dSZXF1aXJlZCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciByb3dzID0gdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93cztcclxuICAgICAgICBpZiAoIXJvd3MpIHJvd3MgPSB0aGlzLnZpc2libGVSb3dzO1xyXG4gICAgICAgIGlmICghcm93cykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgdmFsID0gcm93c1tpXS52YWx1ZTtcclxuICAgICAgICAgICAgaWYgKCF2YWwpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZU1hdHJpeFJvdyhuYW1lOiBhbnksIHRleHQ6IHN0cmluZywgZnVsbE5hbWU6IHN0cmluZywgdmFsdWU6IGFueSk6IE1hdHJpeFJvd01vZGVsIHtcclxuICAgICAgICByZXR1cm4gbmV3IE1hdHJpeFJvd01vZGVsKG5hbWUsIHRleHQsIGZ1bGxOYW1lLCB0aGlzLCB2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25WYWx1ZUNoYW5nZWQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNSb3dDaGFuZ2luZyB8fCAhKHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MpIHx8IHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3MubGVuZ3RoID09IDApIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzUm93Q2hhbmdpbmcgPSB0cnVlO1xyXG4gICAgICAgIHZhciB2YWwgPSB0aGlzLnZhbHVlO1xyXG4gICAgICAgIGlmICghdmFsKSB2YWwgPSB7fTtcclxuICAgICAgICBpZiAodGhpcy5yb3dzLmxlbmd0aCA9PSAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZ2VuZXJhdGVkVmlzaWJsZVJvd3NbMF0udmFsdWUgPSB2YWw7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgcm93ID0gdGhpcy5nZW5lcmF0ZWRWaXNpYmxlUm93c1tpXTtcclxuICAgICAgICAgICAgICAgIHZhciByb3dWYWwgPSB2YWxbcm93Lm5hbWVdID8gdmFsW3Jvdy5uYW1lXSA6IG51bGw7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmdlbmVyYXRlZFZpc2libGVSb3dzW2ldLnZhbHVlID0gcm93VmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuaXNSb3dDaGFuZ2luZyA9IGZhbHNlO1xyXG4gICAgfVxyXG4gICAgLy9JTWF0cml4RGF0YVxyXG4gICAgb25NYXRyaXhSb3dDaGFuZ2VkKHJvdzogTWF0cml4Um93TW9kZWwpIHtcclxuICAgICAgICBpZiAodGhpcy5pc1Jvd0NoYW5naW5nKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5pc1Jvd0NoYW5naW5nID0gdHJ1ZTtcclxuICAgICAgICBpZiAoIXRoaXMuaGFzUm93cykge1xyXG4gICAgICAgICAgICB0aGlzLnNldE5ld1ZhbHVlKHJvdy52YWx1ZSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdmFyIG5ld1ZhbHVlID0gdGhpcy52YWx1ZTtcclxuICAgICAgICAgICAgaWYgKCFuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICAgICAgbmV3VmFsdWUgPSB7fTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBuZXdWYWx1ZVtyb3cubmFtZV0gPSByb3cudmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMuc2V0TmV3VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLmlzUm93Q2hhbmdpbmcgPSBmYWxzZTtcclxuICAgIH1cclxufVxyXG5cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcIm1hdHJpeFwiLCBbeyBuYW1lOiBcImNvbHVtbnM6aXRlbXZhbHVlc1wiLCBvbkdldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnkpIHsgcmV0dXJuIEl0ZW1WYWx1ZS5nZXREYXRhKG9iai5jb2x1bW5zKTsgfSwgb25TZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55LCB2YWx1ZTogYW55KSB7IG9iai5jb2x1bW5zID0gdmFsdWU7IH19LFxyXG4gICAgeyBuYW1lOiBcInJvd3M6aXRlbXZhbHVlc1wiLCBvbkdldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnkpIHsgcmV0dXJuIEl0ZW1WYWx1ZS5nZXREYXRhKG9iai5yb3dzKTsgfSwgb25TZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55LCB2YWx1ZTogYW55KSB7IG9iai5yb3dzID0gdmFsdWU7IH0gfSxcclxuICAgIFwiaXNBbGxSb3dSZXF1aXJlZDpib29sZWFuXCJdLCAgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uTWF0cml4TW9kZWwoXCJcIik7IH0sIFwicXVlc3Rpb25cIik7XHJcblxyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcIm1hdHJpeFwiLCAobmFtZSkgPT4geyB2YXIgcSA9IG5ldyBRdWVzdGlvbk1hdHJpeE1vZGVsKG5hbWUpOyBxLnJvd3MgPSBbXCJSb3cgMVwiLCBcIlJvdyAyXCJdOyBxLmNvbHVtbnMgPSBbXCJDb2x1bW4gMVwiLCBcIkNvbHVtbiAyXCIsIFwiQ29sdW1uIDNcIl07IHJldHVybiBxOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbl9tYXRyaXgudHNcbiAqKi8iLCJpbXBvcnQge0Jhc2V9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtTdXJ2ZXlWYWxpZGF0b3IsIElWYWxpZGF0b3JPd25lciwgVmFsaWRhdG9yUnVubmVyfSBmcm9tIFwiLi92YWxpZGF0b3JcIjtcclxuaW1wb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4vcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtTdXJ2ZXlFcnJvcn0gZnJvbSBcIi4vYmFzZVwiO1xyXG5cclxuZXhwb3J0IGludGVyZmFjZSBJTXVsdGlwbGVUZXh0RGF0YSB7XHJcbiAgICBnZXRNdWx0aXBsZVRleHRWYWx1ZShuYW1lOiBzdHJpbmcpOiBhbnk7XHJcbiAgICBzZXRNdWx0aXBsZVRleHRWYWx1ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnkpO1xyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgTXVsdGlwbGVUZXh0SXRlbU1vZGVsIGV4dGVuZHMgQmFzZSBpbXBsZW1lbnRzIElWYWxpZGF0b3JPd25lciB7XHJcbiAgICBwcml2YXRlIGRhdGE6IElNdWx0aXBsZVRleHREYXRhO1xyXG4gICAgcHJpdmF0ZSB0aXRsZVZhbHVlOiBzdHJpbmc7XHJcbiAgICB2YWxpZGF0b3JzOiBBcnJheTxTdXJ2ZXlWYWxpZGF0b3I+ID0gbmV3IEFycmF5PFN1cnZleVZhbGlkYXRvcj4oKTtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogYW55ID0gbnVsbCwgdGl0bGU6IHN0cmluZyA9IG51bGwpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSB0aXRsZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwibXVsdGlwbGV0ZXh0aXRlbVwiO1xyXG4gICAgfVxyXG4gICAgc2V0RGF0YShkYXRhOiBJTXVsdGlwbGVUZXh0RGF0YSkge1xyXG4gICAgICAgIHRoaXMuZGF0YSA9IGRhdGE7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHRpdGxlKCkgeyByZXR1cm4gdGhpcy50aXRsZVZhbHVlID8gdGhpcy50aXRsZVZhbHVlIDogdGhpcy5uYW1lOyB9XHJcbiAgICBwdWJsaWMgc2V0IHRpdGxlKG5ld1RleHQ6IHN0cmluZykgeyB0aGlzLnRpdGxlVmFsdWUgPSBuZXdUZXh0OyB9XHJcbiAgICBwdWJsaWMgZ2V0IHZhbHVlKCkge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmRhdGEgPyB0aGlzLmRhdGEuZ2V0TXVsdGlwbGVUZXh0VmFsdWUodGhpcy5uYW1lKSA6IG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IHZhbHVlKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBpZiAodGhpcy5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgdGhpcy5kYXRhLnNldE11bHRpcGxlVGV4dFZhbHVlKHRoaXMubmFtZSwgdmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIG9uVmFsdWVDaGFuZ2VkKG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgIH1cclxuICAgIC8vSVZhbGlkYXRvck93bmVyXHJcbiAgICBnZXRWYWxpZGF0b3JUaXRsZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy50aXRsZTsgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25NdWx0aXBsZVRleHRNb2RlbCBleHRlbmRzIFF1ZXN0aW9uIGltcGxlbWVudHMgSU11bHRpcGxlVGV4dERhdGEge1xyXG4gICAgcHJpdmF0ZSBjb2xDb3VudFZhbHVlOiBudW1iZXIgPSAxO1xyXG4gICAgY29sQ291bnRDaGFuZ2VkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcbiAgICBwdWJsaWMgaXRlbVNpemU6IG51bWJlciA9IDI1O1xyXG4gICAgcHJpdmF0ZSBpdGVtc1ZhbHVlczogQXJyYXk8TXVsdGlwbGVUZXh0SXRlbU1vZGVsPiA9IG5ldyBBcnJheTxNdWx0aXBsZVRleHRJdGVtTW9kZWw+KCk7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuaXRlbXMucHVzaCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YWx1ZS5zZXREYXRhKHNlbGYpO1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gQXJyYXkucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCB2YWx1ZSk7XHJcbiAgICAgICAgICAgIHNlbGYuZmlyZUNhbGxiYWNrKHNlbGYuY29sQ291bnRDaGFuZ2VkQ2FsbGJhY2spO1xyXG4gICAgICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIH07XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcIm11bHRpcGxldGV4dFwiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpdGVtcygpOiBBcnJheTxNdWx0aXBsZVRleHRJdGVtTW9kZWw+IHsgcmV0dXJuIHRoaXMuaXRlbXNWYWx1ZXM7IH1cclxuICAgIHB1YmxpYyBzZXQgaXRlbXModmFsdWU6IEFycmF5PE11bHRpcGxlVGV4dEl0ZW1Nb2RlbD4pIHtcclxuICAgICAgICB0aGlzLml0ZW1zVmFsdWVzID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5maXJlQ2FsbGJhY2sodGhpcy5jb2xDb3VudENoYW5nZWRDYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgQWRkSXRlbShuYW1lOiBzdHJpbmcsIHRpdGxlOiBzdHJpbmcgPSBudWxsKTogTXVsdGlwbGVUZXh0SXRlbU1vZGVsIHtcclxuICAgICAgICB2YXIgaXRlbSA9IHRoaXMuY3JlYXRlVGV4dEl0ZW0obmFtZSwgdGl0bGUpO1xyXG4gICAgICAgIHRoaXMuaXRlbXMucHVzaChpdGVtKTtcclxuICAgICAgICByZXR1cm4gaXRlbTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY29sQ291bnQoKTogbnVtYmVyIHsgcmV0dXJuIHRoaXMuY29sQ291bnRWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBjb2xDb3VudCh2YWx1ZTogbnVtYmVyKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgMSB8fCB2YWx1ZSA+IDQpIHJldHVybjtcclxuICAgICAgICB0aGlzLmNvbENvdW50VmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLmZpcmVDYWxsYmFjayh0aGlzLmNvbENvdW50Q2hhbmdlZENhbGxiYWNrKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRSb3dzKCk6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIHZhciBjb2xDb3VudCA9IHRoaXMuY29sQ291bnQ7XHJcbiAgICAgICAgdmFyIGl0ZW1zID0gdGhpcy5pdGVtcztcclxuICAgICAgICB2YXIgcm93cyA9IFtdO1xyXG4gICAgICAgIHZhciBpbmRleCA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBpdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoaW5kZXggPT0gMCkge1xyXG4gICAgICAgICAgICAgICAgcm93cy5wdXNoKFtdKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByb3dzW3Jvd3MubGVuZ3RoIC0gMV0ucHVzaChpdGVtc1tpXSk7XHJcbiAgICAgICAgICAgIGluZGV4Kys7XHJcbiAgICAgICAgICAgIGlmIChpbmRleCA+PSBjb2xDb3VudCkge1xyXG4gICAgICAgICAgICAgICAgaW5kZXggPSAwO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByb3dzO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc011bHRpcGxlSXRlbVZhbHVlQ2hhbmdpbmcgPSBmYWxzZTtcclxuICAgIHByb3RlY3RlZCBvblZhbHVlQ2hhbmdlZCgpIHtcclxuICAgICAgICBzdXBlci5vblZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgICAgIHRoaXMub25JdGVtVmFsdWVDaGFuZ2VkKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlVGV4dEl0ZW0obmFtZTogc3RyaW5nLCB0aXRsZTogc3RyaW5nKTogTXVsdGlwbGVUZXh0SXRlbU1vZGVsIHtcclxuICAgICAgICByZXR1cm4gbmV3IE11bHRpcGxlVGV4dEl0ZW1Nb2RlbChuYW1lLCB0aXRsZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25JdGVtVmFsdWVDaGFuZ2VkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzTXVsdGlwbGVJdGVtVmFsdWVDaGFuZ2luZykgcmV0dXJuO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5pdGVtcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbVZhbHVlID0gbnVsbDtcclxuICAgICAgICAgICAgaWYgKHRoaXMudmFsdWUgJiYgKHRoaXMuaXRlbXNbaV0ubmFtZSBpbiB0aGlzLnZhbHVlKSkge1xyXG4gICAgICAgICAgICAgICAgaXRlbVZhbHVlID0gdGhpcy52YWx1ZVt0aGlzLml0ZW1zW2ldLm5hbWVdO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIHRoaXMuaXRlbXNbaV0ub25WYWx1ZUNoYW5nZWQoaXRlbVZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcnVuVmFsaWRhdG9ycygpOiBTdXJ2ZXlFcnJvciB7XHJcbiAgICAgICAgdmFyIGVycm9yID0gc3VwZXIucnVuVmFsaWRhdG9ycygpO1xyXG4gICAgICAgIGlmIChlcnJvciAhPSBudWxsKSByZXR1cm4gZXJyb3I7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLml0ZW1zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGVycm9yID0gbmV3IFZhbGlkYXRvclJ1bm5lcigpLnJ1bih0aGlzLml0ZW1zW2ldKTtcclxuICAgICAgICAgICAgaWYgKGVycm9yICE9IG51bGwpIHJldHVybiBlcnJvcjtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICAvL0lNdWx0aXBsZVRleHREYXRhXHJcbiAgICBnZXRNdWx0aXBsZVRleHRWYWx1ZShuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAoIXRoaXMudmFsdWUpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZhbHVlW25hbWVdO1xyXG4gICAgfVxyXG4gICAgc2V0TXVsdGlwbGVUZXh0VmFsdWUobmFtZTogc3RyaW5nLCB2YWx1ZTogYW55KSB7XHJcbiAgICAgICAgdGhpcy5pc011bHRpcGxlSXRlbVZhbHVlQ2hhbmdpbmcgPSB0cnVlO1xyXG4gICAgICAgIHZhciBuZXdWYWx1ZSA9IHRoaXMudmFsdWU7XHJcbiAgICAgICAgaWYgKCFuZXdWYWx1ZSkge1xyXG4gICAgICAgICAgICBuZXdWYWx1ZSA9IHt9O1xyXG4gICAgICAgIH1cclxuICAgICAgICBuZXdWYWx1ZVtuYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0TmV3VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgICAgIHRoaXMuaXNNdWx0aXBsZUl0ZW1WYWx1ZUNoYW5naW5nID0gZmFsc2U7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJtdWx0aXBsZXRleHRpdGVtXCIsIFtcIm5hbWVcIiwgeyBuYW1lOiBcInRpdGxlXCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gb2JqLnRpdGxlVmFsdWU7IH0gfSxcclxuICAgIHsgbmFtZTogXCJ2YWxpZGF0b3JzOnZhbGlkYXRvcnNcIiwgYmFzZUNsYXNzTmFtZTogXCJzdXJ2ZXl2YWxpZGF0b3JcIiwgY2xhc3NOYW1lUGFydDogXCJ2YWxpZGF0b3JcIiB9XSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IE11bHRpcGxlVGV4dEl0ZW1Nb2RlbChcIlwiKTsgfSk7XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwibXVsdGlwbGV0ZXh0XCIsIFt7IG5hbWU6IFwiIWl0ZW1zOnRleHRpdGVtc1wiLCBjbGFzc05hbWU6IFwibXVsdGlwbGV0ZXh0aXRlbVwiIH0sXHJcbiAgICAgICAgeyBuYW1lOiBcIml0ZW1TaXplOm51bWJlclwiLCBkZWZhdWx0OiAyNSB9LCB7IG5hbWU6IFwiY29sQ291bnQ6bnVtYmVyXCIsIGRlZmF1bHQ6IDEsIGNob2ljZXM6IFsxLCAyLCAzLCA0XSB9XSxcclxuICAgIGZ1bmN0aW9uICgpIHsgcmV0dXJuIG5ldyBRdWVzdGlvbk11bHRpcGxlVGV4dE1vZGVsKFwiXCIpOyB9LCBcInF1ZXN0aW9uXCIpO1xyXG5cclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJtdWx0aXBsZXRleHRcIiwgKG5hbWUpID0+IHsgdmFyIHEgPSBuZXcgUXVlc3Rpb25NdWx0aXBsZVRleHRNb2RlbChuYW1lKTsgcS5BZGRJdGVtKFwidGV4dDFcIik7IHEuQWRkSXRlbShcInRleHQyXCIpOyByZXR1cm4gcTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fbXVsdGlwbGV0ZXh0LnRzXG4gKiovIiwiaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7QmFzZSwgSVBhZ2UsIElDb25kaXRpb25SdW5uZXIsIElTdXJ2ZXksIElRdWVzdGlvbiwgSGFzaFRhYmxlLCBTdXJ2ZXlFbGVtZW50LCBTdXJ2ZXlQYWdlSWR9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkJhc2V9IGZyb20gXCIuL3F1ZXN0aW9uYmFzZVwiO1xyXG5pbXBvcnQge0NvbmRpdGlvblJ1bm5lcn0gZnJvbSBcIi4vY29uZGl0aW9uc1wiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Sb3dNb2RlbCB7XHJcbiAgICBwcml2YXRlIHZpc2libGVWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgdmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBwYWdlOiBQYWdlTW9kZWwsIHB1YmxpYyBxdWVzdGlvbjogUXVlc3Rpb25CYXNlKSB7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24ucm93VmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHsgc2VsZi5vblJvd1Zpc2liaWxpdHlDaGFuZ2VkKCk7IH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBxdWVzdGlvbnM6IEFycmF5PFF1ZXN0aW9uQmFzZT4gPSBbXTtcclxuICAgIHB1YmxpYyBnZXQgdmlzaWJsZSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMudmlzaWJsZVZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHZpc2libGUodmFsOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHZhbCA9PSB0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgICAgICB0aGlzLnZpc2libGVWYWx1ZSA9IHZhbDtcclxuICAgICAgICB0aGlzLm9uVmlzaWJsZUNoYW5nZWQoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyB1cGRhdGVWaXNpYmxlKCkge1xyXG4gICAgICAgIHRoaXMudmlzaWJsZSA9IHRoaXMuY2FsY1Zpc2libGUoKTtcclxuICAgICAgICB0aGlzLnNldFdpZHRoKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgYWRkUXVlc3Rpb24ocTogUXVlc3Rpb25CYXNlKSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbnMucHVzaChxKTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2libGUoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvblZpc2libGVDaGFuZ2VkKCkge1xyXG4gICAgICAgIGlmICh0aGlzLnZpc2liaWxpdHlDaGFuZ2VkQ2FsbGJhY2spIHRoaXMudmlzaWJpbGl0eUNoYW5nZWRDYWxsYmFjaygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldFdpZHRoKCkge1xyXG4gICAgICAgIHZhciB2aXNDb3VudCA9IHRoaXMuZ2V0VmlzaWJsZUNvdW50KCk7XHJcbiAgICAgICAgaWYgKHZpc0NvdW50ID09IDApIHJldHVybjtcclxuICAgICAgICB2YXIgY291bnRlciA9IDA7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1ZXN0aW9ucy5sZW5ndGg7IGkrKylcclxuICAgICAgICAgICAgaWYgKHRoaXMuaXNRdWVzdGlvblZpc2libGUodGhpcy5xdWVzdGlvbnNbaV0pKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXN0aW9uc1tpXS5yZW5kZXJXaWR0aCA9IHRoaXMucXVlc3Rpb24ud2lkdGggPyB0aGlzLnF1ZXN0aW9uLndpZHRoIDogTWF0aC5mbG9vcigxMDAgLyB2aXNDb3VudCkgKyAnJSc7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnF1ZXN0aW9uc1tpXS5yaWdodEluZGVudCA9IGNvdW50ZXIgPCB2aXNDb3VudCAtIDEgPyAxIDogMDtcclxuICAgICAgICAgICAgICAgIGNvdW50ZXIrKztcclxuICAgICAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBvblJvd1Zpc2liaWxpdHlDaGFuZ2VkKCkge1xyXG4gICAgICAgIHRoaXMucGFnZS5vblJvd1Zpc2liaWxpdHlDaGFuZ2VkKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRWaXNpYmxlQ291bnQoKTogbnVtYmVyIHtcclxuICAgICAgICB2YXIgcmVzID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLmlzUXVlc3Rpb25WaXNpYmxlKHRoaXMucXVlc3Rpb25zW2ldKSkgcmVzKys7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXM7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzUXVlc3Rpb25WaXNpYmxlKHE6IFF1ZXN0aW9uQmFzZSk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5wYWdlLmlzUXVlc3Rpb25WaXNpYmxlKHEpOyB9XHJcbiAgICBwcml2YXRlIGNhbGNWaXNpYmxlKCk6IGJvb2xlYW4geyByZXR1cm4gdGhpcy5nZXRWaXNpYmxlQ291bnQoKSA+IDA7IH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFBhZ2VNb2RlbCBleHRlbmRzIEJhc2UgaW1wbGVtZW50cyBJUGFnZSwgSUNvbmRpdGlvblJ1bm5lciB7XHJcbiAgICBwcml2YXRlIHN0YXRpYyBwYWdlQ291bnRlciA9IDEwMDtcclxuICAgIHByaXZhdGUgc3RhdGljIGdldFBhZ2VJZCgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcInNwX1wiICsgUGFnZU1vZGVsLnBhZ2VDb3VudGVyKys7XHJcbiAgICB9XHJcblxyXG4gICAgcHJpdmF0ZSBpZFZhbHVlOiBzdHJpbmc7XHJcbiAgICBwcml2YXRlIHJvd1ZhbHVlczogQXJyYXk8UXVlc3Rpb25Sb3dNb2RlbD4gPSBudWxsO1xyXG4gICAgcHJpdmF0ZSBjb25kaXRpb25SdW5uZXI6IENvbmRpdGlvblJ1bm5lciA9IG51bGw7XHJcbiAgICBxdWVzdGlvbnM6IEFycmF5PFF1ZXN0aW9uQmFzZT4gPSBuZXcgQXJyYXk8UXVlc3Rpb25CYXNlPigpO1xyXG4gICAgcHVibGljIGRhdGE6IElTdXJ2ZXkgPSBudWxsO1xyXG4gICAgcHVibGljIHZpc2libGVJZjogc3RyaW5nID0gXCJcIjtcclxuXHJcbiAgICBwdWJsaWMgdGl0bGU6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgdmlzaWJsZUluZGV4OiBudW1iZXIgPSAtMTtcclxuICAgIHByaXZhdGUgbnVtVmFsdWU6IG51bWJlciA9IC0xO1xyXG4gICAgcHJpdmF0ZSB2aXNpYmxlVmFsdWU6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZyA9IFwiXCIpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHRoaXMuaWRWYWx1ZSA9IFBhZ2VNb2RlbC5nZXRQYWdlSWQoKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbnMucHVzaCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5kYXRhICE9IG51bGwpIHtcclxuICAgICAgICAgICAgICAgIHZhbHVlLnNldERhdGEoc2VsZi5kYXRhKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCB2YWx1ZSk7XHJcbiAgICAgICAgfTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuaWRWYWx1ZTsgfVxyXG4gICAgcHVibGljIGdldCByb3dzKCk6IEFycmF5PFF1ZXN0aW9uUm93TW9kZWw+IHtcclxuICAgICAgICB0aGlzLnJvd1ZhbHVlcyA9IHRoaXMuYnVpbGRSb3dzKCk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucm93VmFsdWVzO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc0FjdGl2ZSgpIHsgcmV0dXJuICghdGhpcy5kYXRhKSB8fCB0aGlzLmRhdGEuY3VycmVudFBhZ2UgPT0gdGhpczsgfVxyXG4gICAgcHVibGljIGlzUXVlc3Rpb25WaXNpYmxlKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBib29sZWFuIHsgcmV0dXJuIHF1ZXN0aW9uLnZpc2libGUgfHwgdGhpcy5pc0Rlc2lnbk1vZGU7IH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVSb3cocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSk6IFF1ZXN0aW9uUm93TW9kZWwgeyByZXR1cm4gbmV3IFF1ZXN0aW9uUm93TW9kZWwodGhpcywgcXVlc3Rpb24pOyB9XHJcbiAgICBwcml2YXRlIGdldCBpc0Rlc2lnbk1vZGUoKSB7IHJldHVybiB0aGlzLmRhdGEgJiYgdGhpcy5kYXRhLmlzRGVzaWduTW9kZTsgfVxyXG4gICAgcHJpdmF0ZSBidWlsZFJvd3MoKTogQXJyYXk8UXVlc3Rpb25Sb3dNb2RlbD4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBuZXcgQXJyYXk8UXVlc3Rpb25Sb3dNb2RlbD4oKTtcclxuICAgICAgICB2YXIgbGFzdFJvd1Zpc2libGVJbmRleCA9IC0xO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBxID0gdGhpcy5xdWVzdGlvbnNbaV07XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHRoaXMuY3JlYXRlUm93KHEpKTtcclxuICAgICAgICAgICAgaWYgKHEuc3RhcnRXaXRoTmV3TGluZSkge1xyXG4gICAgICAgICAgICAgICAgbGFzdFJvd1Zpc2libGVJbmRleCA9IGk7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRbaV0uYWRkUXVlc3Rpb24ocSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICBpZiAobGFzdFJvd1Zpc2libGVJbmRleCA8IDApIGxhc3RSb3dWaXNpYmxlSW5kZXggPSBpO1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0W2xhc3RSb3dWaXNpYmxlSW5kZXhdLmFkZFF1ZXN0aW9uKHEpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcmVzdWx0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdFtpXS5zZXRXaWR0aCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgb25Sb3dWaXNpYmlsaXR5Q2hhbmdlZChyb3c6IFF1ZXN0aW9uUm93TW9kZWwpIHtcclxuICAgICAgICBpZiAoIXRoaXMuaXNBY3RpdmUgfHwgIXRoaXMucm93VmFsdWVzKSByZXR1cm47XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5yb3dWYWx1ZXMuaW5kZXhPZihyb3cpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSBpbmRleDsgaSA+PSAwOyBpLS0pIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucm93VmFsdWVzW2ldLnF1ZXN0aW9ucy5pbmRleE9mKHJvdy5xdWVzdGlvbikgPiAtMSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5yb3dWYWx1ZXNbaV0udXBkYXRlVmlzaWJsZSgpO1xyXG4gICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHByb2Nlc3NlZFRpdGxlKCkgeyByZXR1cm4gdGhpcy5kYXRhICE9IG51bGwgPyB0aGlzLmRhdGEucHJvY2Vzc1RleHQodGhpcy50aXRsZSkgOiB0aGlzLnRpdGxlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IG51bSgpIHsgcmV0dXJuIHRoaXMubnVtVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgbnVtKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICBpZiAodGhpcy5udW1WYWx1ZSA9PSB2YWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMubnVtVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICB0aGlzLm9uTnVtQ2hhbmdlZCh2YWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHZpc2libGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnZpc2libGVWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCB2aXNpYmxlKHZhbHVlOiBib29sZWFuKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgICAgICB0aGlzLnZpc2libGVWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICB0aGlzLmRhdGEucGFnZVZpc2liaWxpdHlDaGFuZ2VkKHRoaXMsIHRoaXMudmlzaWJsZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIFwicGFnZVwiOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzVmlzaWJsZSgpOiBib29sZWFuIHsgIHJldHVybiB0aGlzLmdldElzUGFnZVZpc2libGUobnVsbCk7IH1cclxuICAgIHB1YmxpYyBnZXRJc1BhZ2VWaXNpYmxlKGV4Y2VwdGlvblF1ZXN0aW9uOiBJUXVlc3Rpb24pOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucXVlc3Rpb25zW2ldID09IGV4Y2VwdGlvblF1ZXN0aW9uKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHRoaXMucXVlc3Rpb25zW2ldLnZpc2libGUpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2U7XHJcbiAgICB9XHJcblxyXG4gICAgcHVibGljIGFkZFF1ZXN0aW9uKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UsIGluZGV4OiBudW1iZXIgPSAtMSkge1xyXG4gICAgICAgIGlmIChxdWVzdGlvbiA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCB8fCBpbmRleCA+PSB0aGlzLnF1ZXN0aW9ucy5sZW5ndGgpIHtcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbnMucHVzaChxdWVzdGlvbik7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbnMuc3BsaWNlKGluZGV4LCAwLCBxdWVzdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh0aGlzLmRhdGEgIT0gbnVsbCkge1xyXG4gICAgICAgICAgICBxdWVzdGlvbi5zZXREYXRhKHRoaXMuZGF0YSk7XHJcbiAgICAgICAgICAgIHRoaXMuZGF0YS5xdWVzdGlvbkFkZGVkKHF1ZXN0aW9uLCBpbmRleCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZE5ld1F1ZXN0aW9uKHF1ZXN0aW9uVHlwZTogc3RyaW5nLCBuYW1lOiBzdHJpbmcpOiBRdWVzdGlvbkJhc2Uge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbiA9IFF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5jcmVhdGVRdWVzdGlvbihxdWVzdGlvblR5cGUsIG5hbWUpO1xyXG4gICAgICAgIHRoaXMuYWRkUXVlc3Rpb24ocXVlc3Rpb24pO1xyXG4gICAgICAgIHJldHVybiBxdWVzdGlvbjtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW1vdmVRdWVzdGlvbihxdWVzdGlvbjogUXVlc3Rpb25CYXNlKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdGhpcy5xdWVzdGlvbnMuaW5kZXhPZihxdWVzdGlvbik7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb25zLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgaWYgKHRoaXMuZGF0YSAhPSBudWxsKSB0aGlzLmRhdGEucXVlc3Rpb25SZW1vdmVkKHF1ZXN0aW9uKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBmb2N1c0ZpcnN0UXVlc3Rpb24oKSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcXVlc3Rpb24gPSB0aGlzLnF1ZXN0aW9uc1tpXTtcclxuICAgICAgICAgICAgaWYgKCFxdWVzdGlvbi52aXNpYmxlIHx8ICFxdWVzdGlvbi5oYXNJbnB1dCkgY29udGludWU7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25zW2ldLmZvY3VzKCk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBmb2N1c0ZpcnN0RXJyb3JRdWVzdGlvbigpIHtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghdGhpcy5xdWVzdGlvbnNbaV0udmlzaWJsZSB8fCB0aGlzLnF1ZXN0aW9uc1tpXS5jdXJyZW50RXJyb3JDb3VudCA9PSAwKSBjb250aW51ZTtcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbnNbaV0uZm9jdXModHJ1ZSk7XHJcbiAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBzY3JvbGxUb1RvcCgpIHtcclxuICAgICAgICBTdXJ2ZXlFbGVtZW50LlNjcm9sbEVsZW1lbnRUb1RvcChTdXJ2ZXlQYWdlSWQpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGhhc0Vycm9ycyhmaXJlQ2FsbGJhY2s6IGJvb2xlYW4gPSB0cnVlLCBmb2N1c2VPbkZpcnN0RXJyb3I6IGJvb2xlYW4gPSBmYWxzZSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBmYWxzZTtcclxuICAgICAgICB2YXIgZmlyc3RFcnJvclF1ZXN0aW9uID0gbnVsbDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnF1ZXN0aW9uc1tpXS52aXNpYmxlICYmIHRoaXMucXVlc3Rpb25zW2ldLmhhc0Vycm9ycyhmaXJlQ2FsbGJhY2spKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoZm9jdXNlT25GaXJzdEVycm9yICYmIGZpcnN0RXJyb3JRdWVzdGlvbiA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgZmlyc3RFcnJvclF1ZXN0aW9uID0gdGhpcy5xdWVzdGlvbnNbaV07XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICByZXN1bHQgPSB0cnVlO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChmaXJzdEVycm9yUXVlc3Rpb24pIGZpcnN0RXJyb3JRdWVzdGlvbi5mb2N1cyh0cnVlKTtcclxuICAgICAgICByZXR1cm4gcmVzdWx0O1xyXG4gICAgfVxyXG4gICAgcHVibGljIGFkZFF1ZXN0aW9uc1RvTGlzdChsaXN0OiBBcnJheTxJUXVlc3Rpb24+LCB2aXNpYmxlT25seTogYm9vbGVhbiA9IGZhbHNlKSB7XHJcbiAgICAgICAgaWYgKHZpc2libGVPbmx5ICYmICF0aGlzLnZpc2libGUpIHJldHVybjtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5xdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHZpc2libGVPbmx5ICYmICF0aGlzLnF1ZXN0aW9uc1tpXS52aXNpYmxlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgbGlzdC5wdXNoKHRoaXMucXVlc3Rpb25zW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcnVuQ29uZGl0aW9uKHZhbHVlczogSGFzaFRhYmxlPGFueT4pIHtcclxuICAgICAgICBpZiAoIXRoaXMudmlzaWJsZUlmKSByZXR1cm47XHJcbiAgICAgICAgaWYgKCF0aGlzLmNvbmRpdGlvblJ1bm5lcikgdGhpcy5jb25kaXRpb25SdW5uZXIgPSBuZXcgQ29uZGl0aW9uUnVubmVyKHRoaXMudmlzaWJsZUlmKTtcclxuICAgICAgICB0aGlzLmNvbmRpdGlvblJ1bm5lci5leHByZXNzaW9uID0gdGhpcy52aXNpYmxlSWY7XHJcbiAgICAgICAgdGhpcy52aXNpYmxlID0gdGhpcy5jb25kaXRpb25SdW5uZXIucnVuKHZhbHVlcyk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25OdW1DaGFuZ2VkKHZhbHVlOiBudW1iZXIpIHtcclxuICAgIH1cclxufVxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwicGFnZVwiLCBbXCJuYW1lXCIsIHsgbmFtZTogXCJxdWVzdGlvbnNcIiwgYmFzZUNsYXNzTmFtZTogXCJxdWVzdGlvblwiIH0sIHsgbmFtZTogXCJ2aXNpYmxlOmJvb2xlYW5cIiwgZGVmYXVsdDogdHJ1ZSB9LCBcInZpc2libGVJZlwiLCBcInRpdGxlXCJdLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUGFnZU1vZGVsKCk7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3BhZ2UudHNcbiAqKi8iLCJpbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uQ2hlY2tib3hCYXNlfSBmcm9tIFwiLi9xdWVzdGlvbl9iYXNlc2VsZWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25DaGVja2JveE1vZGVsIGV4dGVuZHMgUXVlc3Rpb25DaGVja2JveEJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldEhhc090aGVyKHZhbDogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKCF2YWwpIHJldHVybiBmYWxzZTtcclxuICAgICAgICByZXR1cm4gdmFsLmluZGV4T2YodGhpcy5vdGhlckl0ZW0udmFsdWUpID49IDA7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdmFsdWVGcm9tRGF0YUNvcmUodmFsOiBhbnkpOiBhbnkge1xyXG4gICAgICAgIGlmICghdmFsIHx8ICF2YWwubGVuZ3RoKSByZXR1cm4gdmFsO1xyXG5cclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodmFsW2ldID09IHRoaXMub3RoZXJJdGVtLnZhbHVlKSByZXR1cm4gdmFsO1xyXG4gICAgICAgICAgICBpZiAodGhpcy5oYXNVbmtub3duVmFsdWUodmFsW2ldKSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jb21tZW50ID0gdmFsW2ldO1xyXG4gICAgICAgICAgICAgICAgdmFyIG5ld1ZhbCA9IHZhbC5zbGljZSgpO1xyXG4gICAgICAgICAgICAgICAgbmV3VmFsW2ldID0gdGhpcy5vdGhlckl0ZW0udmFsdWU7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gbmV3VmFsO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB2YWw7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdmFsdWVUb0RhdGFDb3JlKHZhbDogYW55KTogYW55IHtcclxuICAgICAgICBpZiAoIXZhbCB8fCAhdmFsLmxlbmd0aCkgcmV0dXJuIHZhbDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZhbC5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAodmFsW2ldID09IHRoaXMub3RoZXJJdGVtLnZhbHVlKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAodGhpcy5nZXRDb21tZW50KCkpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgbmV3VmFsID0gdmFsLnNsaWNlKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgbmV3VmFsW2ldID0gdGhpcy5nZXRDb21tZW50KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgcmV0dXJuIG5ld1ZhbDtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJjaGVja2JveFwiO1xyXG4gICAgfVxyXG59XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJjaGVja2JveFwiLCBbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uQ2hlY2tib3hNb2RlbChcIlwiKTsgfSwgXCJjaGVja2JveGJhc2VcIik7XHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwiY2hlY2tib3hcIiwgKG5hbWUpID0+IHsgdmFyIHEgPSBuZXcgUXVlc3Rpb25DaGVja2JveE1vZGVsKG5hbWUpOyBxLmNob2ljZXMgPSBRdWVzdGlvbkZhY3RvcnkuRGVmYXVsdENob2ljZXM7IHJldHVybiBxOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbl9jaGVja2JveC50c1xuICoqLyIsImltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuL3F1ZXN0aW9uXCI7XHJcbmltcG9ydCB7SnNvbk9iamVjdH0gZnJvbSBcIi4vanNvbm9iamVjdFwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcXVlc3Rpb25mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25Db21tZW50TW9kZWwgZXh0ZW5kcyBRdWVzdGlvbiB7XHJcbiAgICBwdWJsaWMgcm93czogbnVtYmVyID0gNDtcclxuICAgIHB1YmxpYyBjb2xzOiBudW1iZXIgPSA1MDtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiY29tbWVudFwiO1xyXG4gICAgfVxyXG4gICAgaXNFbXB0eSgpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gc3VwZXIuaXNFbXB0eSgpIHx8IHRoaXMudmFsdWUgPT0gXCJcIjtcclxuICAgIH1cclxufVxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwiY29tbWVudFwiLCBbeyBuYW1lOiBcImNvbHM6bnVtYmVyXCIsIGRlZmF1bHQ6IDUwIH0sIHsgbmFtZTogXCJyb3dzOm51bWJlclwiLCBkZWZhdWx0OiA0IH1dLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUXVlc3Rpb25Db21tZW50TW9kZWwoXCJcIik7IH0sIFwicXVlc3Rpb25cIik7XHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwiY29tbWVudFwiLCAobmFtZSkgPT4geyByZXR1cm4gbmV3IFF1ZXN0aW9uQ29tbWVudE1vZGVsKG5hbWUpOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbl9jb21tZW50LnRzXG4gKiovIiwiaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuaW1wb3J0IHtRdWVzdGlvblNlbGVjdEJhc2V9IGZyb20gXCIuL3F1ZXN0aW9uX2Jhc2VzZWxlY3RcIjtcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuL3N1cnZleVN0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkRyb3Bkb3duTW9kZWwgZXh0ZW5kcyBRdWVzdGlvblNlbGVjdEJhc2Uge1xyXG4gICAgcHJpdmF0ZSBvcHRpb25zQ2FwdGlvblZhbHVlOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IG9wdGlvbnNDYXB0aW9uKCkgeyByZXR1cm4gKHRoaXMub3B0aW9uc0NhcHRpb25WYWx1ZSkgPyB0aGlzLm9wdGlvbnNDYXB0aW9uVmFsdWUgOiBzdXJ2ZXlMb2NhbGl6YXRpb24uZ2V0U3RyaW5nKFwib3B0aW9uc0NhcHRpb25cIik7IH1cclxuICAgIHB1YmxpYyBzZXQgb3B0aW9uc0NhcHRpb24obmV3VmFsdWU6IHN0cmluZykgeyB0aGlzLm9wdGlvbnNDYXB0aW9uVmFsdWUgPSBuZXdWYWx1ZTsgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJkcm9wZG93blwiO1xyXG4gICAgfVxyXG4gICAgc3VwcG9ydEdvTmV4dFBhZ2VBdXRvbWF0aWMoKSB7IHJldHVybiB0cnVlOyB9XHJcbn1cclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcImRyb3Bkb3duXCIsIFt7IG5hbWU6IFwib3B0aW9uc0NhcHRpb25cIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55KSB7IHJldHVybiBvYmoub3B0aW9uc0NhcHRpb25WYWx1ZTsgfX1dLFxyXG4gICAgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uRHJvcGRvd25Nb2RlbChcIlwiKTsgfSwgXCJzZWxlY3RiYXNlXCIpO1xyXG5RdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcImRyb3Bkb3duXCIsIChuYW1lKSA9PiB7IHZhciBxID0gbmV3IFF1ZXN0aW9uRHJvcGRvd25Nb2RlbChuYW1lKTsgcS5jaG9pY2VzID0gUXVlc3Rpb25GYWN0b3J5LkRlZmF1bHRDaG9pY2VzOyByZXR1cm4gcTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fZHJvcGRvd24udHNcbiAqKi8iLCJpbXBvcnQge1F1ZXN0aW9ufSBmcm9tIFwiLi9xdWVzdGlvblwiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge1N1cnZleUVycm9yfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7Q3VzdG9tRXJyb3IsIEV4Y2VlZFNpemVFcnJvcn0gZnJvbSBcIi4vZXJyb3JcIjtcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuL3N1cnZleVN0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvbkZpbGVNb2RlbCBleHRlbmRzIFF1ZXN0aW9uIHtcclxuICAgIHByaXZhdGUgc2hvd1ByZXZpZXdWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpc1VwbG9hZGluZzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJldmlld1ZhbHVlTG9hZGVkQ2FsbGJhY2s6ICgpID0+IHZvaWQ7XHJcbiAgICBwdWJsaWMgaW1hZ2VIZWlnaHQ6IHN0cmluZztcclxuICAgIHB1YmxpYyBpbWFnZVdpZHRoOiBzdHJpbmc7XHJcbiAgICBwdWJsaWMgc3RvcmVEYXRhQXNUZXh0OiBib29sZWFuO1xyXG4gICAgcHVibGljIG1heFNpemU6IG51bWJlcjtcclxuICAgIGNvbnN0cnVjdG9yKHB1YmxpYyBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICBzdXBlcihuYW1lKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiZmlsZVwiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBzaG93UHJldmlldygpIHsgcmV0dXJuIHRoaXMuc2hvd1ByZXZpZXdWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBzaG93UHJldmlldyh2YWx1ZTogYm9vbGVhbikgeyB0aGlzLnNob3dQcmV2aWV3VmFsdWUgPSB2YWx1ZTsgfVxyXG4gICAgcHVibGljIGxvYWRGaWxlKGZpbGU6IEZpbGUpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgaWYgKHRoaXMuc3VydmV5ICYmICF0aGlzLnN1cnZleS51cGxvYWRGaWxlKHRoaXMubmFtZSwgZmlsZSwgdGhpcy5zdG9yZURhdGFBc1RleHQsIGZ1bmN0aW9uIChzdGF0dXM6IHN0cmluZykgeyBzZWxmLmlzVXBsb2FkaW5nID0gc3RhdHVzID09IFwidXBsb2FkaW5nXCI7ICB9KSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuc2V0RmlsZVZhbHVlKGZpbGUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHByZXZpZXdWYWx1ZTogYW55O1xyXG4gICAgcHJvdGVjdGVkIHNldEZpbGVWYWx1ZShmaWxlOiBGaWxlKSB7XHJcbiAgICAgICAgaWYgKCFGaWxlUmVhZGVyKSByZXR1cm47XHJcbiAgICAgICAgaWYgKCF0aGlzLnNob3dQcmV2aWV3ICYmICF0aGlzLnN0b3JlRGF0YUFzVGV4dCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh0aGlzLmNoZWNrRmlsZUZvckVycm9ycyhmaWxlKSkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBmaWxlUmVhZGVyID0gbmV3IEZpbGVSZWFkZXIoKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgZmlsZVJlYWRlci5vbmxvYWQgPSBmdW5jdGlvbiAoZSkge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5zaG93UHJldmlldykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5wcmV2aWV3VmFsdWUgPSBzZWxmLmlzRmlsZUltYWdlKGZpbGUpID8gZmlsZVJlYWRlci5yZXN1bHQgOiBudWxsO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5maXJlQ2FsbGJhY2soc2VsZi5wcmV2aWV3VmFsdWVMb2FkZWRDYWxsYmFjayk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgaWYgKHNlbGYuc3RvcmVEYXRhQXNUZXh0KSB7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnZhbHVlID0gZmlsZVJlYWRlci5yZXN1bHQ7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZmlsZVJlYWRlci5yZWFkQXNEYXRhVVJMKGZpbGUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uQ2hlY2tGb3JFcnJvcnMoZXJyb3JzOiBBcnJheTxTdXJ2ZXlFcnJvcj4pIHtcclxuICAgICAgICBzdXBlci5vbkNoZWNrRm9yRXJyb3JzKGVycm9ycyk7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNVcGxvYWRpbmcpIHtcclxuICAgICAgICAgICAgdGhpcy5lcnJvcnMucHVzaChuZXcgQ3VzdG9tRXJyb3Ioc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhcInVwbG9hZGluZ0ZpbGVcIikpKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNoZWNrRmlsZUZvckVycm9ycyhmaWxlOiBGaWxlKTogYm9vbGVhbiB7XHJcbiAgICAgICAgdmFyIGVycm9yTGVuZ3RoID0gdGhpcy5lcnJvcnMgPyB0aGlzLmVycm9ycy5sZW5ndGggOiAwO1xyXG4gICAgICAgIHRoaXMuZXJyb3JzID0gW107XHJcbiAgICAgICAgaWYgKHRoaXMubWF4U2l6ZSA+IDAgJiYgZmlsZS5zaXplID4gdGhpcy5tYXhTaXplKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZXJyb3JzLnB1c2gobmV3IEV4Y2VlZFNpemVFcnJvcih0aGlzLm1heFNpemUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKGVycm9yTGVuZ3RoICE9IHRoaXMuZXJyb3JzLmxlbmd0aCB8fCB0aGlzLmVycm9ycy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMuZXJyb3JzQ2hhbmdlZENhbGxiYWNrKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuZXJyb3JzLmxlbmd0aCA+IDA7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGlzRmlsZUltYWdlKGZpbGU6IEZpbGUpIHtcclxuICAgICAgICBpZiAoIWZpbGUgfHwgIWZpbGUudHlwZSkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBzdHIgPSBmaWxlLnR5cGUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICByZXR1cm4gc3RyLmluZGV4T2YoXCJpbWFnZVwiKSA9PSAwO1xyXG4gICAgfVxyXG59XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJmaWxlXCIsIFtcInNob3dQcmV2aWV3OmJvb2xlYW5cIiwgXCJpbWFnZUhlaWdodFwiLCBcImltYWdlV2lkdGhcIiwgXCJzdG9yZURhdGFBc1RleHQ6Ym9vbGVhblwiLCBcIm1heFNpemU6bnVtYmVyXCJdLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgUXVlc3Rpb25GaWxlTW9kZWwoXCJcIik7IH0sIFwicXVlc3Rpb25cIik7XHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwiZmlsZVwiLCAobmFtZSkgPT4geyByZXR1cm4gbmV3IFF1ZXN0aW9uRmlsZU1vZGVsKG5hbWUpOyB9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbl9maWxlLnRzXG4gKiovIiwiaW1wb3J0IHtRdWVzdGlvbkJhc2V9IGZyb20gXCIuL3F1ZXN0aW9uYmFzZVwiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFF1ZXN0aW9uSHRtbE1vZGVsIGV4dGVuZHMgUXVlc3Rpb25CYXNlIHtcclxuICAgIHByaXZhdGUgaHRtbFZhbHVlOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcImh0bWxcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaHRtbCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5odG1sVmFsdWU7IH1cclxuICAgIHB1YmxpYyBzZXQgaHRtbCh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdGhpcy5odG1sVmFsdWUgPSB2YWx1ZTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgcHJvY2Vzc2VkSHRtbCgpIHsgcmV0dXJuIHRoaXMuc3VydmV5ID8gdGhpcy5zdXJ2ZXkucHJvY2Vzc0h0bWwodGhpcy5odG1sKSA6IHRoaXMuaHRtbDsgfVxyXG59XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJodG1sXCIsIFtcImh0bWw6aHRtbFwiXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uSHRtbE1vZGVsKFwiXCIpOyB9LCBcInF1ZXN0aW9uYmFzZVwiKTtcclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJodG1sXCIsIChuYW1lKSA9PiB7IHJldHVybiBuZXcgUXVlc3Rpb25IdG1sTW9kZWwobmFtZSk7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3F1ZXN0aW9uX2h0bWwudHNcbiAqKi8iLCJpbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge1F1ZXN0aW9uQ2hlY2tib3hCYXNlfSBmcm9tIFwiLi9xdWVzdGlvbl9iYXNlc2VsZWN0XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgUXVlc3Rpb25SYWRpb2dyb3VwTW9kZWwgZXh0ZW5kcyBRdWVzdGlvbkNoZWNrYm94QmFzZSB7XHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIHJldHVybiBcInJhZGlvZ3JvdXBcIjtcclxuICAgIH1cclxuICAgIHN1cHBvcnRHb05leHRQYWdlQXV0b21hdGljKCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG59XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwicmFkaW9ncm91cFwiLCBbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uUmFkaW9ncm91cE1vZGVsKFwiXCIpOyB9LCBcImNoZWNrYm94YmFzZVwiKTtcclxuXHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwicmFkaW9ncm91cFwiLCAobmFtZSkgPT4geyB2YXIgcSA9IG5ldyBRdWVzdGlvblJhZGlvZ3JvdXBNb2RlbChuYW1lKTsgcS5jaG9pY2VzID0gUXVlc3Rpb25GYWN0b3J5LkRlZmF1bHRDaG9pY2VzOyByZXR1cm4gcTt9KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9xdWVzdGlvbl9yYWRpb2dyb3VwLnRzXG4gKiovIiwiaW1wb3J0IHtJdGVtVmFsdWV9IGZyb20gXCIuL2Jhc2VcIjtcclxuaW1wb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4vcXVlc3Rpb25cIjtcclxuaW1wb3J0IHtKc29uT2JqZWN0fSBmcm9tIFwiLi9qc29ub2JqZWN0XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9xdWVzdGlvbmZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblJhdGluZ01vZGVsIGV4dGVuZHMgUXVlc3Rpb24ge1xyXG4gICAgc3RhdGljIGRlZmF1bHRSYXRlVmFsdWVzOiBJdGVtVmFsdWVbXSA9IFtdO1xyXG4gICAgcHJpdmF0ZSByYXRlczogSXRlbVZhbHVlW10gPSBbXTtcclxuICAgIHB1YmxpYyBtaW5pbnVtUmF0ZURlc2NyaXB0aW9uOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHVibGljIG1heGltdW1SYXRlRGVzY3JpcHRpb246IHN0cmluZyA9IG51bGw7XHJcblxyXG4gICAgcmF0ZVZhbHVlc0NoYW5nZWRDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuXHJcbiAgICBjb25zdHJ1Y3RvcihwdWJsaWMgbmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgc3VwZXIobmFtZSk7XHJcbiAgICB9XHJcbiAgICBnZXQgcmF0ZVZhbHVlcygpOiBBcnJheTxhbnk+IHsgcmV0dXJuIHRoaXMucmF0ZXM7IH1cclxuICAgIHNldCByYXRlVmFsdWVzKG5ld1ZhbHVlOiBBcnJheTxhbnk+KSB7XHJcbiAgICAgICAgSXRlbVZhbHVlLnNldERhdGEodGhpcy5yYXRlcywgbmV3VmFsdWUpO1xyXG4gICAgICAgIHRoaXMuZmlyZUNhbGxiYWNrKHRoaXMucmF0ZVZhbHVlc0NoYW5nZWRDYWxsYmFjayk7XHJcbiAgICB9XHJcbiAgICBnZXQgdmlzaWJsZVJhdGVWYWx1ZXMoKTogSXRlbVZhbHVlW10ge1xyXG4gICAgICAgIGlmICh0aGlzLnJhdGVWYWx1ZXMubGVuZ3RoID4gMCkgcmV0dXJuIHRoaXMucmF0ZVZhbHVlcztcclxuICAgICAgICByZXR1cm4gUXVlc3Rpb25SYXRpbmdNb2RlbC5kZWZhdWx0UmF0ZVZhbHVlcztcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwicmF0aW5nXCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc3VwcG9ydENvbW1lbnQoKTogYm9vbGVhbiB7IHJldHVybiB0cnVlOyB9XHJcbiAgICBwdWJsaWMgc3VwcG9ydE90aGVyKCk6IGJvb2xlYW4geyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgc3VwcG9ydEdvTmV4dFBhZ2VBdXRvbWF0aWMoKSB7IHJldHVybiB0cnVlOyB9XHJcbn1cclxuSXRlbVZhbHVlLnNldERhdGEoUXVlc3Rpb25SYXRpbmdNb2RlbC5kZWZhdWx0UmF0ZVZhbHVlcywgWzEsIDIsIDMsIDQsIDVdKTtcclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcInJhdGluZ1wiLCBbXCJoYXNDb21tZW50OmJvb2xlYW5cIiwgeyBuYW1lOiBcInJhdGVWYWx1ZXM6aXRlbXZhbHVlc1wiLCBvbkdldFZhbHVlOiBmdW5jdGlvbiAob2JqOiBhbnkpIHsgcmV0dXJuIEl0ZW1WYWx1ZS5nZXREYXRhKG9iai5yYXRlVmFsdWVzKTsgfSwgb25TZXRWYWx1ZTogZnVuY3Rpb24gKG9iajogYW55LCB2YWx1ZTogYW55KSB7IG9iai5yYXRlVmFsdWVzID0gdmFsdWU7IH19LFxyXG4gICAgXCJtaW5pbnVtUmF0ZURlc2NyaXB0aW9uXCIsIFwibWF4aW11bVJhdGVEZXNjcmlwdGlvblwiXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uUmF0aW5nTW9kZWwoXCJcIik7IH0sIFwicXVlc3Rpb25cIik7XHJcblF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwicmF0aW5nXCIsIChuYW1lKSA9PiB7IHJldHVybiBuZXcgUXVlc3Rpb25SYXRpbmdNb2RlbChuYW1lKTsgfSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcXVlc3Rpb25fcmF0aW5nLnRzXG4gKiovIiwiaW1wb3J0IHtRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuL3F1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtRdWVzdGlvbn0gZnJvbSBcIi4vcXVlc3Rpb25cIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBRdWVzdGlvblRleHRNb2RlbCBleHRlbmRzIFF1ZXN0aW9uIHtcclxuICAgIHB1YmxpYyBzaXplOiBudW1iZXIgPSAyNTtcclxuICAgIHB1YmxpYyBpbnB1dFR5cGU6IHN0cmluZyA9IFwidGV4dFwiO1xyXG4gICAgY29uc3RydWN0b3IocHVibGljIG5hbWU6IHN0cmluZykge1xyXG4gICAgICAgIHN1cGVyKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHtcclxuICAgICAgICByZXR1cm4gXCJ0ZXh0XCI7XHJcbiAgICB9XHJcbiAgICBpc0VtcHR5KCk6IGJvb2xlYW4geyAgcmV0dXJuIHN1cGVyLmlzRW1wdHkoKSB8fCB0aGlzLnZhbHVlID09IFwiXCI7IH1cclxuICAgIHN1cHBvcnRHb05leHRQYWdlQXV0b21hdGljKCkgeyByZXR1cm4gdHJ1ZTsgfVxyXG4gICAgcHJvdGVjdGVkIHNldE5ld1ZhbHVlKG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgICAgICBuZXdWYWx1ZSA9IHRoaXMuY29ycmVjdFZhbHVlVHlwZShuZXdWYWx1ZSk7XHJcbiAgICAgICAgc3VwZXIuc2V0TmV3VmFsdWUobmV3VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNvcnJlY3RWYWx1ZVR5cGUobmV3VmFsdWU6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKCFuZXdWYWx1ZSkgcmV0dXJuIG5ld1ZhbHVlO1xyXG4gICAgICAgIGlmICh0aGlzLmlucHV0VHlwZSA9PSBcIm51bWJlclwiIHx8IHRoaXMuaW5wdXRUeXBlID09IFwicmFuZ2VcIikge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5pc051bWJlcihuZXdWYWx1ZSkgPyBwYXJzZUZsb2F0KG5ld1ZhbHVlKSA6IFwiXCI7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBuZXdWYWx1ZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaXNOdW1iZXIodmFsdWUpOiBib29sZWFuIHtcclxuICAgICAgICByZXR1cm4gIWlzTmFOKHBhcnNlRmxvYXQodmFsdWUpKSAmJiBpc0Zpbml0ZSh2YWx1ZSk7XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJ0ZXh0XCIsIFt7IG5hbWU6IFwiaW5wdXRUeXBlXCIsIGRlZmF1bHQ6IFwidGV4dFwiLCBjaG9pY2VzOiBbXCJjb2xvclwiLCBcImRhdGVcIiwgXCJkYXRldGltZVwiLCBcImRhdGV0aW1lLWxvY2FsXCIsIFwiZW1haWxcIiwgXCJtb250aFwiLCBcIm51bWJlclwiLCBcInBhc3N3b3JkXCIsIFwicmFuZ2VcIiwgXCJ0ZWxcIiwgXCJ0ZXh0XCIsIFwidGltZVwiLCBcInVybFwiLCBcIndlZWtcIl0gfSxcclxuICAgIHsgbmFtZTogXCJzaXplOm51bWJlclwiLCBkZWZhdWx0OiAyNSB9XSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFF1ZXN0aW9uVGV4dE1vZGVsKFwiXCIpOyB9LCBcInF1ZXN0aW9uXCIpO1xyXG5cclxuUXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJ0ZXh0XCIsIChuYW1lKSA9PiB7IHJldHVybiBuZXcgUXVlc3Rpb25UZXh0TW9kZWwobmFtZSk7IH0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3F1ZXN0aW9uX3RleHQudHNcbiAqKi8iLCJpbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtCYXNlLCBJU3VydmV5LCBIYXNoVGFibGUsIElRdWVzdGlvbiwgSUNvbmRpdGlvblJ1bm5lciwgSVBhZ2UsIFN1cnZleUVycm9yLCBFdmVudH0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQge0lTdXJ2ZXlUcmlnZ2VyT3duZXIsIFN1cnZleVRyaWdnZXJ9IGZyb20gXCIuL3RyaWdnZXJcIjtcclxuaW1wb3J0IHtQYWdlTW9kZWx9IGZyb20gXCIuL3BhZ2VcIjtcclxuaW1wb3J0IHtUZXh0UHJlUHJvY2Vzc29yfSBmcm9tIFwiLi90ZXh0UHJlUHJvY2Vzc29yXCI7XHJcbmltcG9ydCB7ZHhTdXJ2ZXlTZXJ2aWNlfSBmcm9tIFwiLi9keFN1cnZleVNlcnZpY2VcIjtcclxuaW1wb3J0IHtKc29uRXJyb3J9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuL3N1cnZleVN0cmluZ3NcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkJhc2V9IGZyb20gXCIuL3F1ZXN0aW9uYmFzZVwiO1xyXG5pbXBvcnQge0N1c3RvbUVycm9yfSBmcm9tIFwiLi9lcnJvclwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN1cnZleU1vZGVsIGV4dGVuZHMgQmFzZSBpbXBsZW1lbnRzIElTdXJ2ZXksIElTdXJ2ZXlUcmlnZ2VyT3duZXIge1xyXG4gICAgcHVibGljIHN1cnZleUlkOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHVibGljIHN1cnZleVBvc3RJZDogc3RyaW5nID0gbnVsbDtcclxuICAgIHB1YmxpYyBjbGllbnRJZDogc3RyaW5nID0gbnVsbDtcclxuICAgIHB1YmxpYyBjb29raWVOYW1lOiBzdHJpbmcgPSBudWxsO1xyXG4gICAgcHVibGljIHNlbmRSZXN1bHRPblBhZ2VOZXh0OiBib29sZWFuID0gZmFsc2U7XHJcblxyXG4gICAgcHVibGljIGNvbW1lbnRQcmVmaXg6IHN0cmluZyA9IFwiLUNvbW1lbnRcIjtcclxuICAgIHB1YmxpYyB0aXRsZTogc3RyaW5nID0gXCJcIjtcclxuICAgIHB1YmxpYyBzaG93TmF2aWdhdGlvbkJ1dHRvbnM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIHNob3dUaXRsZTogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgc2hvd1BhZ2VUaXRsZXM6IGJvb2xlYW4gPSB0cnVlO1xyXG4gICAgcHVibGljIGNvbXBsZXRlZEh0bWw6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgcmVxdWlyZWRUZXh0OiBzdHJpbmcgPSBcIipcIjtcclxuICAgIHB1YmxpYyBxdWVzdGlvblN0YXJ0SW5kZXg6IHN0cmluZyA9IFwiXCI7XHJcbiAgICBwdWJsaWMgcXVlc3Rpb25UaXRsZVRlbXBsYXRlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHVibGljIHNob3dQcm9ncmVzc0Jhcjogc3RyaW5nID0gXCJvZmZcIjtcclxuICAgIHB1YmxpYyBzdG9yZU90aGVyc0FzQ29tbWVudDogYm9vbGVhbiA9IHRydWU7XHJcbiAgICBwdWJsaWMgZ29OZXh0UGFnZUF1dG9tYXRpYzogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHVibGljIHBhZ2VzOiBBcnJheTxQYWdlTW9kZWw+ID0gbmV3IEFycmF5PFBhZ2VNb2RlbD4oKTtcclxuICAgIHB1YmxpYyB0cmlnZ2VyczogQXJyYXk8U3VydmV5VHJpZ2dlcj4gPSBuZXcgQXJyYXk8U3VydmV5VHJpZ2dlcj4oKTtcclxuICAgIHB1YmxpYyBjbGVhckludmlzaWJsZVZhbHVlczogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBjdXJyZW50UGFnZVZhbHVlOiBQYWdlTW9kZWwgPSBudWxsO1xyXG4gICAgcHJpdmF0ZSB2YWx1ZXNIYXNoOiBIYXNoVGFibGU8YW55PiA9IHt9O1xyXG4gICAgcHJpdmF0ZSB2YXJpYWJsZXNIYXNoOiBIYXNoVGFibGU8YW55PiA9IHt9O1xyXG4gICAgcHJpdmF0ZSBwYWdlUHJldlRleHRWYWx1ZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBwYWdlTmV4dFRleHRWYWx1ZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBjb21wbGV0ZVRleHRWYWx1ZTogc3RyaW5nO1xyXG4gICAgcHJpdmF0ZSBzaG93UGFnZU51bWJlcnNWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBzaG93UXVlc3Rpb25OdW1iZXJzVmFsdWU6IHN0cmluZyA9IFwib25cIjtcclxuICAgIHByaXZhdGUgcXVlc3Rpb25UaXRsZUxvY2F0aW9uVmFsdWU6IHN0cmluZyA9IFwidG9wXCI7XHJcbiAgICBwcml2YXRlIGxvY2FsZVZhbHVlOiBzdHJpbmcgPSBcIlwiO1xyXG4gICAgcHJpdmF0ZSBpc0NvbXBsZXRlZDogYm9vbGVhbiA9IGZhbHNlO1xyXG4gICAgcHJpdmF0ZSBpc0xvYWRpbmc6IGJvb2xlYW4gPSBmYWxzZTtcclxuICAgIHByaXZhdGUgcHJvY2Vzc2VkVGV4dFZhbHVlczogSGFzaFRhYmxlPGFueT4gPSB7fTtcclxuICAgIHByaXZhdGUgdGV4dFByZVByb2Nlc3NvcjogVGV4dFByZVByb2Nlc3NvcjtcclxuICAgIHByaXZhdGUgaXNWYWxpZGF0aW5nT25TZXJ2ZXJWYWx1ZTogYm9vbGVhbiA9IGZhbHNlO1xyXG5cclxuICAgIHB1YmxpYyBvbkNvbXBsZXRlOiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsKSA9PiBhbnksIGFueT4oKTtcclxuICAgIHB1YmxpYyBvbkN1cnJlbnRQYWdlQ2hhbmdlZDogRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PigpO1xyXG4gICAgcHVibGljIG9uVmFsdWVDaGFuZ2VkOiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4gPSBuZXcgRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+KCk7XHJcbiAgICBwdWJsaWMgb25WaXNpYmxlQ2hhbmdlZDogRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PigpO1xyXG4gICAgcHVibGljIG9uUGFnZVZpc2libGVDaGFuZ2VkOiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4gPSBuZXcgRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+KCk7XHJcbiAgICBwdWJsaWMgb25RdWVzdGlvbkFkZGVkOiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4gPSBuZXcgRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+KCk7XHJcbiAgICBwdWJsaWMgb25RdWVzdGlvblJlbW92ZWQ6IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PiA9IG5ldyBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4oKTtcclxuICAgIHB1YmxpYyBvblZhbGlkYXRlUXVlc3Rpb246IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PiA9IG5ldyBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4oKTtcclxuICAgIHB1YmxpYyBvblNlcnZlclZhbGlkYXRlUXVlc3Rpb25zOiAoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnk7XHJcbiAgICBwdWJsaWMgb25Qcm9jZXNzSHRtbDogRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PigpO1xyXG4gICAgcHVibGljIG9uU2VuZFJlc3VsdDogRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+ID0gbmV3IEV2ZW50PChzZW5kZXI6IFN1cnZleU1vZGVsLCBvcHRpb25zOiBhbnkpID0+IGFueSwgYW55PigpO1xyXG4gICAgcHVibGljIG9uR2V0UmVzdWx0OiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4gPSBuZXcgRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+KCk7XHJcbiAgICBwdWJsaWMgb25VcGxvYWRGaWxlOiBFdmVudDwoc2VuZGVyOiBTdXJ2ZXlNb2RlbCwgb3B0aW9uczogYW55KSA9PiBhbnksIGFueT4gPSBuZXcgRXZlbnQ8KHNlbmRlcjogU3VydmV5TW9kZWwsIG9wdGlvbnM6IGFueSkgPT4gYW55LCBhbnk+KCk7XHJcbiAgICBwdWJsaWMganNvbkVycm9yczogQXJyYXk8SnNvbkVycm9yPiA9IG51bGw7XHJcblxyXG4gICAgcHVibGljIG1vZGU6IHN0cmluZyA9IFwibm9ybWFsXCI7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKGpzb25PYmo6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLnRleHRQcmVQcm9jZXNzb3IgPSBuZXcgVGV4dFByZVByb2Nlc3NvcigpO1xyXG4gICAgICAgIHRoaXMudGV4dFByZVByb2Nlc3Nvci5vbkhhc1ZhbHVlID0gZnVuY3Rpb24gKG5hbWU6IHN0cmluZykgeyByZXR1cm4gc2VsZi5wcm9jZXNzZWRUZXh0VmFsdWVzW25hbWUudG9Mb3dlckNhc2UoKV07IH07XHJcbiAgICAgICAgdGhpcy50ZXh0UHJlUHJvY2Vzc29yLm9uUHJvY2VzcyA9IGZ1bmN0aW9uIChuYW1lOiBzdHJpbmcpIHsgcmV0dXJuIHNlbGYuZ2V0UHJvY2Vzc2VkVGV4dFZhbHVlKG5hbWUpOyB9O1xyXG4gICAgICAgIHRoaXMucGFnZXMucHVzaCA9IGZ1bmN0aW9uICh2YWx1ZSkge1xyXG4gICAgICAgICAgICB2YWx1ZS5kYXRhID0gc2VsZjtcclxuICAgICAgICAgICAgcmV0dXJuIEFycmF5LnByb3RvdHlwZS5wdXNoLmNhbGwodGhpcywgdmFsdWUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy50cmlnZ2Vycy5wdXNoID0gZnVuY3Rpb24gKHZhbHVlKSB7XHJcbiAgICAgICAgICAgIHZhbHVlLnNldE93bmVyKHNlbGYpO1xyXG4gICAgICAgICAgICByZXR1cm4gQXJyYXkucHJvdG90eXBlLnB1c2guY2FsbCh0aGlzLCB2YWx1ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnVwZGF0ZVByb2Nlc3NlZFRleHRWYWx1ZXMoKTtcclxuICAgICAgICB0aGlzLm9uQmVmb3JlQ3JlYXRpbmcoKTtcclxuICAgICAgICBpZiAoanNvbk9iaikge1xyXG4gICAgICAgICAgICB0aGlzLnNldEpzb25PYmplY3QoanNvbk9iaik7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnN1cnZleUlkKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLmxvYWRTdXJ2ZXlGcm9tU2VydmljZSh0aGlzLnN1cnZleUlkKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm9uQ3JlYXRpbmcoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7IHJldHVybiBcInN1cnZleVwiOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGxvY2FsZSgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5sb2NhbGVWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBsb2NhbGUodmFsdWU6IHN0cmluZykge1xyXG4gICAgICAgIHRoaXMubG9jYWxlVmFsdWUgPSB2YWx1ZTtcclxuICAgICAgICBzdXJ2ZXlMb2NhbGl6YXRpb24uY3VycmVudExvY2FsZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldExvY1N0cmluZyhzdHI6IHN0cmluZykgeyByZXR1cm4gc3VydmV5TG9jYWxpemF0aW9uLmdldFN0cmluZyhzdHIpOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGVtcHR5U3VydmV5VGV4dCgpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5nZXRMb2NTdHJpbmcoXCJlbXB0eVN1cnZleVwiKTsgfVxyXG4gICAgcHVibGljIGdldCBwYWdlUHJldlRleHQoKSB7IHJldHVybiAodGhpcy5wYWdlUHJldlRleHRWYWx1ZSkgPyB0aGlzLnBhZ2VQcmV2VGV4dFZhbHVlIDogdGhpcy5nZXRMb2NTdHJpbmcoXCJwYWdlUHJldlRleHRcIik7IH1cclxuICAgIHB1YmxpYyBzZXQgcGFnZVByZXZUZXh0KG5ld1ZhbHVlOiBzdHJpbmcpIHsgdGhpcy5wYWdlUHJldlRleHRWYWx1ZSA9IG5ld1ZhbHVlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IHBhZ2VOZXh0VGV4dCgpIHsgcmV0dXJuICh0aGlzLnBhZ2VOZXh0VGV4dFZhbHVlKSA/IHRoaXMucGFnZU5leHRUZXh0VmFsdWUgOiB0aGlzLmdldExvY1N0cmluZyhcInBhZ2VOZXh0VGV4dFwiKTsgfVxyXG4gICAgcHVibGljIHNldCBwYWdlTmV4dFRleHQobmV3VmFsdWU6IHN0cmluZykgeyB0aGlzLnBhZ2VOZXh0VGV4dFZhbHVlID0gbmV3VmFsdWU7IH1cclxuICAgIHB1YmxpYyBnZXQgY29tcGxldGVUZXh0KCkgeyByZXR1cm4gKHRoaXMuY29tcGxldGVUZXh0VmFsdWUpID8gdGhpcy5jb21wbGV0ZVRleHRWYWx1ZSA6IHRoaXMuZ2V0TG9jU3RyaW5nKFwiY29tcGxldGVUZXh0XCIpOyB9XHJcbiAgICBwdWJsaWMgc2V0IGNvbXBsZXRlVGV4dChuZXdWYWx1ZTogc3RyaW5nKSB7IHRoaXMuY29tcGxldGVUZXh0VmFsdWUgPSBuZXdWYWx1ZTsgfVxyXG4gICAgcHVibGljIGdldCBzaG93UGFnZU51bWJlcnMoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLnNob3dQYWdlTnVtYmVyc1ZhbHVlOyB9XHJcbiAgICBwdWJsaWMgc2V0IHNob3dQYWdlTnVtYmVycyh2YWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdGhpcy5zaG93UGFnZU51bWJlcnMpIHJldHVybjtcclxuICAgICAgICB0aGlzLnNob3dQYWdlTnVtYmVyc1ZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy51cGRhdGVWaXNpYmxlSW5kZXhlcygpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBzaG93UXVlc3Rpb25OdW1iZXJzKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnNob3dRdWVzdGlvbk51bWJlcnNWYWx1ZTsgfTtcclxuICAgIHB1YmxpYyBzZXQgc2hvd1F1ZXN0aW9uTnVtYmVycyh2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKHZhbHVlID09PSB0aGlzLnNob3dRdWVzdGlvbk51bWJlcnMpIHJldHVybjtcclxuICAgICAgICB0aGlzLnNob3dRdWVzdGlvbk51bWJlcnNWYWx1ZSA9IHZhbHVlO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmlzaWJsZUluZGV4ZXMoKTtcclxuICAgIH07XHJcbiAgICBwdWJsaWMgZ2V0IHF1ZXN0aW9uVGl0bGVMb2NhdGlvbigpOiBzdHJpbmcgeyByZXR1cm4gdGhpcy5xdWVzdGlvblRpdGxlTG9jYXRpb25WYWx1ZTsgfTtcclxuICAgIHB1YmxpYyBzZXQgcXVlc3Rpb25UaXRsZUxvY2F0aW9uKHZhbHVlOiBzdHJpbmcpIHtcclxuICAgICAgICBpZiAodmFsdWUgPT09IHRoaXMucXVlc3Rpb25UaXRsZUxvY2F0aW9uVmFsdWUpIHJldHVybjtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uVGl0bGVMb2NhdGlvblZhbHVlID0gdmFsdWU7XHJcbiAgICB9O1xyXG4gICAgcHVibGljIGdldCBkYXRhKCk6IGFueSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLnZhbHVlc0hhc2gpIHtcclxuICAgICAgICAgICAgcmVzdWx0W2tleV0gPSB0aGlzLnZhbHVlc0hhc2hba2V5XTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBzZXQgZGF0YShkYXRhOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnZhbHVlc0hhc2ggPSB7fTtcclxuICAgICAgICBpZiAoZGF0YSkge1xyXG4gICAgICAgICAgICBmb3IgKHZhciBrZXkgaW4gZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy52YWx1ZXNIYXNoW2tleV0gPSBkYXRhW2tleV07XHJcbiAgICAgICAgICAgICAgICB0aGlzLmNoZWNrVHJpZ2dlcnMoa2V5LCBkYXRhW2tleV0sIGZhbHNlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vdGlmeUFsbFF1ZXN0aW9uc09uVmFsdWVDaGFuZ2VkKCk7XHJcbiAgICAgICAgdGhpcy5ydW5Db25kaXRpb25zKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGNvbW1lbnRzKCk6IGFueSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHt9O1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiB0aGlzLnZhbHVlc0hhc2gpIHtcclxuICAgICAgICAgICAgaWYgKGtleS5pbmRleE9mKHRoaXMuY29tbWVudFByZWZpeCkgPiAwKSB7XHJcbiAgICAgICAgICAgICAgICByZXN1bHRba2V5XSA9IHRoaXMudmFsdWVzSGFzaFtrZXldO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBnZXQgdmlzaWJsZVBhZ2VzKCk6IEFycmF5PFBhZ2VNb2RlbD4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzRGVzaWduTW9kZSkgcmV0dXJuIHRoaXMucGFnZXM7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IG5ldyBBcnJheTxQYWdlTW9kZWw+KCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnBhZ2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICh0aGlzLnBhZ2VzW2ldLmlzVmlzaWJsZSkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2godGhpcy5wYWdlc1tpXSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXNFbXB0eSgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMucGFnZXMubGVuZ3RoID09IDA7IH1cclxuICAgIHB1YmxpYyBnZXQgUGFnZUNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZXMubGVuZ3RoO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCB2aXNpYmxlUGFnZUNvdW50KCk6IG51bWJlciB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZVBhZ2VzLmxlbmd0aDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY3VycmVudFBhZ2UoKTogUGFnZU1vZGVsIHtcclxuICAgICAgICB2YXIgdlBhZ2VzID0gdGhpcy52aXNpYmxlUGFnZXM7XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2VWYWx1ZSAhPSBudWxsKSB7XHJcbiAgICAgICAgICAgIGlmICh2UGFnZXMuaW5kZXhPZih0aGlzLmN1cnJlbnRQYWdlVmFsdWUpIDwgMCkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IG51bGw7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2VWYWx1ZSA9PSBudWxsICYmIHZQYWdlcy5sZW5ndGggPiAwKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2UgPSB2UGFnZXNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiB0aGlzLmN1cnJlbnRQYWdlVmFsdWU7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0IGN1cnJlbnRQYWdlKHZhbHVlOiBQYWdlTW9kZWwpIHtcclxuICAgICAgICB2YXIgdlBhZ2VzID0gdGhpcy52aXNpYmxlUGFnZXM7XHJcbiAgICAgICAgaWYgKHZhbHVlICE9IG51bGwgJiYgdlBhZ2VzLmluZGV4T2YodmFsdWUpIDwgMCkgcmV0dXJuO1xyXG4gICAgICAgIGlmICh2YWx1ZSA9PSB0aGlzLmN1cnJlbnRQYWdlVmFsdWUpIHJldHVybjtcclxuICAgICAgICB2YXIgb2xkVmFsdWUgPSB0aGlzLmN1cnJlbnRQYWdlVmFsdWU7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZVZhbHVlID0gdmFsdWU7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZUNoYW5nZWQodmFsdWUsIG9sZFZhbHVlKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgY3VycmVudFBhZ2VObygpOiBudW1iZXIge1xyXG4gICAgICAgIHJldHVybiB0aGlzLnZpc2libGVQYWdlcy5pbmRleE9mKHRoaXMuY3VycmVudFBhZ2UpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldCBjdXJyZW50UGFnZU5vKHZhbHVlOiBudW1iZXIpIHtcclxuICAgICAgICB2YXIgdlBhZ2VzID0gdGhpcy52aXNpYmxlUGFnZXM7XHJcbiAgICAgICAgaWYgKHZhbHVlIDwgMCB8fCB2YWx1ZSA+PSB0aGlzLnZpc2libGVQYWdlcy5sZW5ndGgpIHJldHVybjtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy52aXNpYmxlUGFnZXNbdmFsdWVdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGZvY3VzRmlyc3RRdWVzdGlvbigpIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZVZhbHVlKSB7XHJcbiAgICAgICAgICAgIHRoaXMuY3VycmVudFBhZ2VWYWx1ZS5zY3JvbGxUb1RvcCgpO1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlVmFsdWUuZm9jdXNGaXJzdFF1ZXN0aW9uKCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBzdGF0ZSgpOiBzdHJpbmcge1xyXG4gICAgICAgIGlmICh0aGlzLmlzTG9hZGluZykgcmV0dXJuIFwibG9hZGluZ1wiO1xyXG4gICAgICAgIGlmICh0aGlzLmlzQ29tcGxldGVkKSByZXR1cm4gXCJjb21wbGV0ZWRcIjtcclxuICAgICAgICByZXR1cm4gKHRoaXMuY3VycmVudFBhZ2UpID8gXCJydW5uaW5nXCIgOiBcImVtcHR5XCJcclxuICAgIH1cclxuICAgIHB1YmxpYyBjbGVhcigpIHtcclxuICAgICAgICB0aGlzLmRhdGEgPSBudWxsO1xyXG4gICAgICAgIHRoaXMudmFyaWFibGVzSGFzaCA9IHt9O1xyXG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZWQgPSBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy52aXNpYmxlUGFnZUNvdW50ID4gMCkge1xyXG4gICAgICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdGhpcy52aXNpYmxlUGFnZXNbMF07XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG1lcmdlVmFsdWVzKHNyYzogYW55LCBkZXN0OiBhbnkpIHtcclxuICAgICAgICBpZiAoIWRlc3QgfHwgIXNyYykgcmV0dXJuO1xyXG4gICAgICAgIGZvciAodmFyIGtleSBpbiBzcmMpIHtcclxuICAgICAgICAgICAgdmFyIHZhbHVlID0gc3JjW2tleV07XHJcbiAgICAgICAgICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XHJcbiAgICAgICAgICAgICAgICBpZiAoIWRlc3Rba2V5XSkgZGVzdFtrZXldID0ge307XHJcbiAgICAgICAgICAgICAgICB0aGlzLm1lcmdlVmFsdWVzKHZhbHVlLCBkZXN0W2tleV0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgZGVzdFtrZXldID0gdmFsdWU7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3VycmVudFBhZ2VDaGFuZ2VkKG5ld1ZhbHVlOiBQYWdlTW9kZWwsIG9sZFZhbHVlOiBQYWdlTW9kZWwpIHtcclxuICAgICAgICB0aGlzLm9uQ3VycmVudFBhZ2VDaGFuZ2VkLmZpcmUodGhpcywgeyAnb2xkQ3VycmVudFBhZ2UnOiBvbGRWYWx1ZSwgJ25ld0N1cnJlbnRQYWdlJzogbmV3VmFsdWUgfSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UHJvZ3Jlc3MoKTogbnVtYmVyIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZSA9PSBudWxsKSByZXR1cm4gMDtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnZpc2libGVQYWdlcy5pbmRleE9mKHRoaXMuY3VycmVudFBhZ2UpICsgMTtcclxuICAgICAgICByZXR1cm4gTWF0aC5jZWlsKChpbmRleCAqIDEwMCAvIHRoaXMudmlzaWJsZVBhZ2VDb3VudCkpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc0Rlc2lnbk1vZGUoKTogYm9vbGVhbiB7IHJldHVybiB0aGlzLm1vZGUgPT0gXCJkZXNpZ25lclwiOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGhhc0Nvb2tpZSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAoIXRoaXMuY29va2llTmFtZSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHZhciBjb29raWVzID0gZG9jdW1lbnQuY29va2llO1xyXG4gICAgICAgIHJldHVybiBjb29raWVzICYmIGNvb2tpZXMuaW5kZXhPZih0aGlzLmNvb2tpZU5hbWUgKyBcIj10cnVlXCIpID4gLTE7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0Q29va2llKCkge1xyXG4gICAgICAgIGlmICghdGhpcy5jb29raWVOYW1lKSByZXR1cm47XHJcbiAgICAgICAgZG9jdW1lbnQuY29va2llID0gdGhpcy5jb29raWVOYW1lICsgXCI9dHJ1ZTsgZXhwaXJlcz1GcmksIDMxIERlYyA5OTk5IDA6MDowIEdNVFwiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRlbGV0ZUNvb2tpZSgpIHtcclxuICAgICAgICBpZiAoIXRoaXMuY29va2llTmFtZSkgcmV0dXJuO1xyXG4gICAgICAgIGRvY3VtZW50LmNvb2tpZSA9IHRoaXMuY29va2llTmFtZSArIFwiPTtcIjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBuZXh0UGFnZSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5pc0xhc3RQYWdlKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNDdXJyZW50UGFnZUhhc0Vycm9ycykgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICh0aGlzLmRvU2VydmVyVmFsaWRhdGlvbigpKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdGhpcy5kb05leHRQYWdlKCk7XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBnZXQgaXNDdXJyZW50UGFnZUhhc0Vycm9ycygpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZSA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICByZXR1cm4gdGhpcy5jdXJyZW50UGFnZS5oYXNFcnJvcnModHJ1ZSwgdHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgcHJldlBhZ2UoKTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHRoaXMuaXNGaXJzdFBhZ2UpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB2YXIgdlBhZ2VzID0gdGhpcy52aXNpYmxlUGFnZXM7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdlBhZ2VzLmluZGV4T2YodGhpcy5jdXJyZW50UGFnZSk7XHJcbiAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHZQYWdlc1tpbmRleCAtIDFdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNvbXBsZXRlTGFzdFBhZ2UoKSA6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICh0aGlzLmlzQ3VycmVudFBhZ2VIYXNFcnJvcnMpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBpZiAodGhpcy5kb1NlcnZlclZhbGlkYXRpb24oKSkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIHRoaXMuZG9Db21wbGV0ZSgpO1xyXG4gICAgICAgIHJldHVybiB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc0ZpcnN0UGFnZSgpOiBib29sZWFuIHsgXHJcbiAgICAgICAgaWYgKHRoaXMuY3VycmVudFBhZ2UgPT0gbnVsbCkgcmV0dXJuIHRydWU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudmlzaWJsZVBhZ2VzLmluZGV4T2YodGhpcy5jdXJyZW50UGFnZSkgPT0gMDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgaXNMYXN0UGFnZSgpOiBib29sZWFuIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZSA9PSBudWxsKSByZXR1cm4gdHJ1ZTtcclxuICAgICAgICB2YXIgdlBhZ2VzID0gdGhpcy52aXNpYmxlUGFnZXM7XHJcbiAgICAgICAgcmV0dXJuIHZQYWdlcy5pbmRleE9mKHRoaXMuY3VycmVudFBhZ2UpID09IHZQYWdlcy5sZW5ndGggLSAxO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGRvQ29tcGxldGUoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMuY2xlYXJJbnZpc2libGVWYWx1ZXMpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGVhckludmlzaWJsZVF1ZXN0aW9uVmFsdWVzKCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc2V0Q29va2llKCk7XHJcbiAgICAgICAgdGhpcy5zZXRDb21wbGV0ZWQoKTtcclxuICAgICAgICB0aGlzLm9uQ29tcGxldGUuZmlyZSh0aGlzLCBudWxsKTtcclxuICAgICAgICBpZiAodGhpcy5zdXJ2ZXlQb3N0SWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zZW5kUmVzdWx0KCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBpc1ZhbGlkYXRpbmdPblNlcnZlcigpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaXNWYWxpZGF0aW5nT25TZXJ2ZXJWYWx1ZTsgfVxyXG4gICAgcHJpdmF0ZSBzZXRJc1ZhbGlkYXRpbmdPblNlcnZlcih2YWw6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAodmFsID09IHRoaXMuaXNWYWxpZGF0aW5nT25TZXJ2ZXIpIHJldHVybjtcclxuICAgICAgICB0aGlzLmlzVmFsaWRhdGluZ09uU2VydmVyVmFsdWUgPSB2YWw7XHJcbiAgICAgICAgdGhpcy5vbklzVmFsaWRhdGluZ09uU2VydmVyQ2hhbmdlZCgpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uSXNWYWxpZGF0aW5nT25TZXJ2ZXJDaGFuZ2VkKCkgeyB9XHJcbiAgICBwcm90ZWN0ZWQgZG9TZXJ2ZXJWYWxpZGF0aW9uKCk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmICghdGhpcy5vblNlcnZlclZhbGlkYXRlUXVlc3Rpb25zKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHZhciBvcHRpb25zID0geyBkYXRhOiB7fSwgZXJyb3JzOiB7fSwgc3VydmV5OiB0aGlzLCBjb21wbGV0ZSA6IGZ1bmN0aW9uICgpIHsgc2VsZi5jb21wbGV0ZVNlcnZlclZhbGlkYXRpb24ob3B0aW9ucyk7IH0gfTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMuY3VycmVudFBhZ2UucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBxdWVzdGlvbiA9IHRoaXMuY3VycmVudFBhZ2UucXVlc3Rpb25zW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXF1ZXN0aW9uLnZpc2libGUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLmdldFZhbHVlKHF1ZXN0aW9uLm5hbWUpO1xyXG4gICAgICAgICAgICBpZiAodmFsdWUpIG9wdGlvbnMuZGF0YVtxdWVzdGlvbi5uYW1lXSA9IHZhbHVlO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnNldElzVmFsaWRhdGluZ09uU2VydmVyKHRydWUpO1xyXG4gICAgICAgIHRoaXMub25TZXJ2ZXJWYWxpZGF0ZVF1ZXN0aW9ucyh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgY29tcGxldGVTZXJ2ZXJWYWxpZGF0aW9uKG9wdGlvbnM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0SXNWYWxpZGF0aW5nT25TZXJ2ZXIoZmFsc2UpO1xyXG4gICAgICAgIGlmICghb3B0aW9ucyAmJiAhb3B0aW9ucy5zdXJ2ZXkpIHJldHVybjtcclxuICAgICAgICB2YXIgc2VsZiA9IG9wdGlvbnMuc3VydmV5O1xyXG4gICAgICAgIHZhciBoYXNFcnJvcnMgPSBmYWxzZTtcclxuICAgICAgICBpZiAob3B0aW9ucy5lcnJvcnMpIHtcclxuICAgICAgICAgICAgZm9yICh2YXIgbmFtZSBpbiBvcHRpb25zLmVycm9ycykge1xyXG4gICAgICAgICAgICAgICAgdmFyIHF1ZXN0aW9uID0gc2VsZi5nZXRRdWVzdGlvbkJ5TmFtZShuYW1lKTtcclxuICAgICAgICAgICAgICAgIGlmIChxdWVzdGlvbiAmJiBxdWVzdGlvbltcImVycm9yc1wiXSkge1xyXG4gICAgICAgICAgICAgICAgICAgIGhhc0Vycm9ycyA9IHRydWU7XHJcbiAgICAgICAgICAgICAgICAgICAgcXVlc3Rpb25bXCJhZGRFcnJvclwiXShuZXcgQ3VzdG9tRXJyb3Iob3B0aW9ucy5lcnJvcnNbbmFtZV0pKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIWhhc0Vycm9ycykge1xyXG4gICAgICAgICAgICBpZiAoc2VsZi5pc0xhc3RQYWdlKSBzZWxmLmRvQ29tcGxldGUoKTtcclxuICAgICAgICAgICAgZWxzZSBzZWxmLmRvTmV4dFBhZ2UoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZG9OZXh0UGFnZSgpIHtcclxuICAgICAgICB0aGlzLmNoZWNrT25QYWdlVHJpZ2dlcnMoKTtcclxuICAgICAgICBpZiAodGhpcy5zZW5kUmVzdWx0T25QYWdlTmV4dCAmJiB0aGlzLmNsaWVudElkKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc2VuZFJlc3VsdCh0aGlzLnN1cnZleVBvc3RJZCwgdGhpcy5jbGllbnRJZCwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciB2UGFnZXMgPSB0aGlzLnZpc2libGVQYWdlcztcclxuICAgICAgICB2YXIgaW5kZXggPSB2UGFnZXMuaW5kZXhPZih0aGlzLmN1cnJlbnRQYWdlKTtcclxuICAgICAgICB0aGlzLmN1cnJlbnRQYWdlID0gdlBhZ2VzW2luZGV4ICsgMV07XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgc2V0Q29tcGxldGVkKCkge1xyXG4gICAgICAgIHRoaXMuaXNDb21wbGV0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBwcm9jZXNzZWRDb21wbGV0ZWRIdG1sKCk6IHN0cmluZyB7XHJcbiAgICAgICAgaWYgKHRoaXMuY29tcGxldGVkSHRtbCkge1xyXG4gICAgICAgICAgICByZXR1cm4gdGhpcy5wcm9jZXNzSHRtbCh0aGlzLmNvbXBsZXRlZEh0bWwpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gXCI8aDM+XCIgKyB0aGlzLmdldExvY1N0cmluZyhcImNvbXBsZXRpbmdTdXJ2ZXlcIikgKyBcIjwvaDM+XCI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IHByb2Nlc3NlZExvYWRpbmdIdG1sKCk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIFwiPGgzPlwiICsgdGhpcy5nZXRMb2NTdHJpbmcoXCJsb2FkaW5nU3VydmV5XCIpICsgXCI8L2gzPlwiO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBwcm9ncmVzc1RleHQoKTogc3RyaW5nIHtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZSA9PSBudWxsKSByZXR1cm4gXCJcIjtcclxuICAgICAgICB2YXIgdlBhZ2VzID0gdGhpcy52aXNpYmxlUGFnZXM7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gdlBhZ2VzLmluZGV4T2YodGhpcy5jdXJyZW50UGFnZSkgKyAxO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldExvY1N0cmluZyhcInByb2dyZXNzVGV4dFwiKVtcImZvcm1hdFwiXShpbmRleCwgdlBhZ2VzLmxlbmd0aCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgdXBsb2FkRmlsZShuYW1lOiBzdHJpbmcsIGZpbGU6IEZpbGUsIHN0b3JlRGF0YUFzVGV4dDogYm9vbGVhbiwgdXBsb2FkaW5nQ2FsbGJhY2s6IChzdGF0dXM6IHN0cmluZyk9PmFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIHZhciBhY2NlcHQgPSB0cnVlO1xyXG4gICAgICAgIHRoaXMub25VcGxvYWRGaWxlLmZpcmUodGhpcywgeyBuYW1lOiBuYW1lLCBmaWxlOiBmaWxlLCBhY2NlcHQ6IGFjY2VwdCB9KTtcclxuICAgICAgICBpZiAoIWFjY2VwdCkgcmV0dXJuIGZhbHNlO1xyXG4gICAgICAgIGlmICghc3RvcmVEYXRhQXNUZXh0ICYmIHRoaXMuc3VydmV5UG9zdElkKSB7XHJcbiAgICAgICAgICAgIHRoaXMudXBsb2FkRmlsZUNvcmUobmFtZSwgZmlsZSwgdXBsb2FkaW5nQ2FsbGJhY2spO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdHJ1ZTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCB1cGxvYWRGaWxlQ29yZShuYW1lOiBzdHJpbmcsIGZpbGU6IEZpbGUsIHVwbG9hZGluZ0NhbGxiYWNrOiAoc3RhdHVzOiBzdHJpbmcpID0+IGFueSkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICBpZiAodXBsb2FkaW5nQ2FsbGJhY2spIHVwbG9hZGluZ0NhbGxiYWNrKFwidXBsb2FkaW5nXCIpO1xyXG4gICAgICAgIG5ldyBkeFN1cnZleVNlcnZpY2UoKS5zZW5kRmlsZSh0aGlzLnN1cnZleVBvc3RJZCwgZmlsZSwgZnVuY3Rpb24gKHN1Y2Nlc3M6IGJvb2xlYW4sIHJlc3BvbnNlOiBhbnkpIHtcclxuICAgICAgICAgICAgaWYgKHVwbG9hZGluZ0NhbGxiYWNrKSB1cGxvYWRpbmdDYWxsYmFjayhzdWNjZXNzID8gXCJzdWNjZXNzXCIgOiBcImVycm9yXCIpO1xyXG4gICAgICAgICAgICBpZiAoc3VjY2Vzcykge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRWYWx1ZShuYW1lLCByZXNwb25zZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgIH1cclxuICAgIGdldFBhZ2UoaW5kZXg6IG51bWJlcik6IFBhZ2VNb2RlbCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucGFnZXNbaW5kZXhdO1xyXG4gICAgfVxyXG4gICAgYWRkUGFnZShwYWdlOiBQYWdlTW9kZWwpIHtcclxuICAgICAgICBpZiAocGFnZSA9PSBudWxsKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5wYWdlcy5wdXNoKHBhZ2UpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmlzaWJsZUluZGV4ZXMoKTtcclxuICAgIH1cclxuICAgIGFkZE5ld1BhZ2UobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLmNyZWF0ZU5ld1BhZ2UobmFtZSk7XHJcbiAgICAgICAgdGhpcy5hZGRQYWdlKHBhZ2UpO1xyXG4gICAgICAgIHJldHVybiBwYWdlO1xyXG4gICAgfVxyXG4gICAgcmVtb3ZlUGFnZShwYWdlOiBQYWdlTW9kZWwpIHtcclxuICAgICAgICB2YXIgaW5kZXggPSB0aGlzLnBhZ2VzLmluZGV4T2YocGFnZSk7XHJcbiAgICAgICAgaWYgKGluZGV4IDwgMCkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMucGFnZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgICBpZiAodGhpcy5jdXJyZW50UGFnZVZhbHVlID09IHBhZ2UpIHtcclxuICAgICAgICAgICAgdGhpcy5jdXJyZW50UGFnZSA9IHRoaXMucGFnZXMubGVuZ3RoID4gMCA/IHRoaXMucGFnZXNbMF0gOiBudWxsO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2libGVJbmRleGVzKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UXVlc3Rpb25CeU5hbWUobmFtZTogc3RyaW5nLCBjYXNlSW5zZW5zaXRpdmU6IGJvb2xlYW4gPSBmYWxzZSk6IElRdWVzdGlvbiB7XHJcbiAgICAgICAgdmFyIHF1ZXN0aW9ucyA9IHRoaXMuZ2V0QWxsUXVlc3Rpb25zKCk7XHJcbiAgICAgICAgaWYgKGNhc2VJbnNlbnNpdGl2ZSkgbmFtZSA9IG5hbWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgcXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBxdWVzdGlvbk5hbWUgPSBxdWVzdGlvbnNbaV0ubmFtZTtcclxuICAgICAgICAgICAgaWYgKGNhc2VJbnNlbnNpdGl2ZSkgcXVlc3Rpb25OYW1lID0gcXVlc3Rpb25OYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgICAgIGlmKHF1ZXN0aW9uTmFtZSA9PSBuYW1lKSByZXR1cm4gcXVlc3Rpb25zW2ldO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRRdWVzdGlvbnNCeU5hbWVzKG5hbWVzOiBzdHJpbmdbXSwgY2FzZUluc2Vuc2l0aXZlOiBib29sZWFuID0gZmFsc2UpOiBJUXVlc3Rpb25bXSB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IFtdO1xyXG4gICAgICAgIGlmICghbmFtZXMpIHJldHVybiByZXN1bHQ7XHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IG5hbWVzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGlmICghbmFtZXNbaV0pIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICB2YXIgcXVlc3Rpb24gPSB0aGlzLmdldFF1ZXN0aW9uQnlOYW1lKG5hbWVzW2ldLCBjYXNlSW5zZW5zaXRpdmUpO1xyXG4gICAgICAgICAgICBpZiAocXVlc3Rpb24pIHJlc3VsdC5wdXNoKHF1ZXN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRQYWdlQnlRdWVzdGlvbihxdWVzdGlvbjogSVF1ZXN0aW9uKTogUGFnZU1vZGVsIHtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcGFnZSA9IHRoaXMucGFnZXNbaV07XHJcbiAgICAgICAgICAgIGlmIChwYWdlLnF1ZXN0aW9ucy5pbmRleE9mKDxRdWVzdGlvbkJhc2U+cXVlc3Rpb24pID4gLTEpIHJldHVybiBwYWdlO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gbnVsbDtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRQYWdlQnlOYW1lKG5hbWU6IHN0cmluZyk6IFBhZ2VNb2RlbCB7XHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IHRoaXMucGFnZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHRoaXMucGFnZXNbaV0ubmFtZSA9PSBuYW1lKSByZXR1cm4gdGhpcy5wYWdlc1tpXTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIG51bGw7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0UGFnZXNCeU5hbWVzKG5hbWVzOiBzdHJpbmdbXSk6IFBhZ2VNb2RlbFtde1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICBpZiAoIW5hbWVzKSByZXR1cm4gcmVzdWx0O1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBuYW1lcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAoIW5hbWVzW2ldKSBjb250aW51ZTtcclxuICAgICAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLmdldFBhZ2VCeU5hbWUobmFtZXNbaV0pO1xyXG4gICAgICAgICAgICBpZiAocGFnZSkgcmVzdWx0LnB1c2gocGFnZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0QWxsUXVlc3Rpb25zKHZpc2libGVPbmx5OiBib29sZWFuID0gZmFsc2UpOiBBcnJheTxJUXVlc3Rpb24+IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5PElRdWVzdGlvbj4oKTtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VzW2ldLmFkZFF1ZXN0aW9uc1RvTGlzdChyZXN1bHQsIHZpc2libGVPbmx5KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVOZXdQYWdlKG5hbWU6IHN0cmluZykgeyByZXR1cm4gbmV3IFBhZ2VNb2RlbChuYW1lKTsgfVxyXG4gICAgcHJpdmF0ZSBub3RpZnlRdWVzdGlvbk9uVmFsdWVDaGFuZ2VkKG5hbWU6IHN0cmluZywgbmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSB0aGlzLmdldEFsbFF1ZXN0aW9ucygpO1xyXG4gICAgICAgIHZhciBxdWVzdGlvbiA9IG51bGw7XHJcbiAgICAgICAgZm9yICh2YXIgaTogbnVtYmVyID0gMDsgaSA8IHF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBpZiAocXVlc3Rpb25zW2ldLm5hbWUgIT0gbmFtZSkgY29udGludWU7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uID0gcXVlc3Rpb25zW2ldO1xyXG4gICAgICAgICAgICB0aGlzLmRvU3VydmV5VmFsdWVDaGFuZ2VkKHF1ZXN0aW9uLCBuZXdWYWx1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMub25WYWx1ZUNoYW5nZWQuZmlyZSh0aGlzLCB7ICduYW1lJzogbmFtZSwgJ3F1ZXN0aW9uJzogcXVlc3Rpb24sICd2YWx1ZSc6IG5ld1ZhbHVlIH0pO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBub3RpZnlBbGxRdWVzdGlvbnNPblZhbHVlQ2hhbmdlZCgpIHtcclxuICAgICAgICB2YXIgcXVlc3Rpb25zID0gdGhpcy5nZXRBbGxRdWVzdGlvbnMoKTtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgcXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuZG9TdXJ2ZXlWYWx1ZUNoYW5nZWQocXVlc3Rpb25zW2ldLCB0aGlzLmdldFZhbHVlKHF1ZXN0aW9uc1tpXS5uYW1lKSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGRvU3VydmV5VmFsdWVDaGFuZ2VkKHF1ZXN0aW9uOiBJUXVlc3Rpb24sIG5ld1ZhbHVlOiBhbnkpIHtcclxuICAgICAgICBxdWVzdGlvbi5vblN1cnZleVZhbHVlQ2hhbmdlZChuZXdWYWx1ZSk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNoZWNrT25QYWdlVHJpZ2dlcnMoKSB7XHJcbiAgICAgICAgdmFyIHF1ZXN0aW9ucyA9IHRoaXMuZ2V0Q3VycmVudFBhZ2VRdWVzdGlvbnMoKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcXVlc3Rpb24gPSBxdWVzdGlvbnNbaV07XHJcbiAgICAgICAgICAgIHZhciB2YWx1ZSA9IHRoaXMuZ2V0VmFsdWUocXVlc3Rpb24ubmFtZSk7XHJcbiAgICAgICAgICAgIHRoaXMuY2hlY2tUcmlnZ2VycyhxdWVzdGlvbi5uYW1lLCB2YWx1ZSwgdHJ1ZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBnZXRDdXJyZW50UGFnZVF1ZXN0aW9ucygpOiBBcnJheTxRdWVzdGlvbkJhc2U+IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gW107XHJcbiAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLmN1cnJlbnRQYWdlO1xyXG4gICAgICAgIGlmICghcGFnZSkgcmV0dXJuIHJlc3VsdDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBhZ2UucXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBxdWVzdGlvbiA9IHBhZ2UucXVlc3Rpb25zW2ldO1xyXG4gICAgICAgICAgICBpZiAoIXF1ZXN0aW9uLnZpc2libGUgfHwgIXF1ZXN0aW9uLm5hbWUpIGNvbnRpbnVlO1xyXG4gICAgICAgICAgICByZXN1bHQucHVzaChxdWVzdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQ7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNoZWNrVHJpZ2dlcnMobmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogYW55LCBpc09uTmV4dFBhZ2U6IGJvb2xlYW4pIHtcclxuICAgICAgICBmb3IgKHZhciBpOiBudW1iZXIgPSAwOyBpIDwgdGhpcy50cmlnZ2Vycy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgdHJpZ2dlciA9IHRoaXMudHJpZ2dlcnNbaV07XHJcbiAgICAgICAgICAgIGlmICh0cmlnZ2VyLm5hbWUgPT0gbmFtZSAmJiB0cmlnZ2VyLmlzT25OZXh0UGFnZSA9PSBpc09uTmV4dFBhZ2UpIHtcclxuICAgICAgICAgICAgICAgIHRyaWdnZXIuY2hlY2sobmV3VmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBkb1F1ZXN0aW9uc09uTG9hZCgpIHtcclxuICAgICAgICB2YXIgcXVlc3Rpb25zID0gdGhpcy5nZXRBbGxRdWVzdGlvbnMoZmFsc2UpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHF1ZXN0aW9uc1tpXS5vblN1cnZleUxvYWQoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJ1bkNvbmRpdGlvbnMoKSB7XHJcbiAgICAgICAgdGhpcy5ydW5Db25kaXRpb25zRm9yTGlzdCh0aGlzLmdldEFsbFF1ZXN0aW9ucyhmYWxzZSkpO1xyXG4gICAgICAgIHRoaXMucnVuQ29uZGl0aW9uc0Zvckxpc3QodGhpcy5wYWdlcyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHJ1bkNvbmRpdGlvbnNGb3JMaXN0KGxpc3Q6IEFycmF5PElDb25kaXRpb25SdW5uZXI+KSB7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBsaXN0Lmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIGxpc3RbaV0ucnVuQ29uZGl0aW9uKHRoaXMudmFsdWVzSGFzaCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIHNlbmRSZXN1bHQocG9zdElkOiBzdHJpbmcgPSBudWxsLCBjbGllbnRJZDogc3RyaW5nID0gbnVsbCwgaXNQYXJ0aWFsQ29tcGxldGVkOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICBpZiAoIXBvc3RJZCAmJiB0aGlzLnN1cnZleVBvc3RJZCkge1xyXG4gICAgICAgICAgICBwb3N0SWQgPSB0aGlzLnN1cnZleVBvc3RJZDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKCFwb3N0SWQpIHJldHVybjtcclxuICAgICAgICBpZiAoY2xpZW50SWQpIHtcclxuICAgICAgICAgICAgdGhpcy5jbGllbnRJZCA9IGNsaWVudElkO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbmV3IGR4U3VydmV5U2VydmljZSgpLnNlbmRSZXN1bHQocG9zdElkLCB0aGlzLmRhdGEsIGZ1bmN0aW9uIChzdWNjZXNzOiBib29sZWFuLCByZXNwb25zZTogYW55KSB7XHJcbiAgICAgICAgICAgIHNlbGYub25TZW5kUmVzdWx0LmZpcmUoc2VsZiwgeyBzdWNjZXNzOiBzdWNjZXNzLCByZXNwb25zZTogcmVzcG9uc2V9KTtcclxuICAgICAgICB9LCB0aGlzLmNsaWVudElkLCBpc1BhcnRpYWxDb21wbGV0ZWQpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFJlc3VsdChyZXN1bHRJZDogc3RyaW5nLCBuYW1lOiBzdHJpbmcpIHtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgbmV3IGR4U3VydmV5U2VydmljZSgpLmdldFJlc3VsdChyZXN1bHRJZCwgbmFtZSwgZnVuY3Rpb24gKHN1Y2Nlc3M6IGJvb2xlYW4sIGRhdGE6IGFueSwgZGF0YUxpc3Q6IGFueVtdLCByZXNwb25zZTogYW55KSB7XHJcbiAgICAgICAgICAgIHNlbGYub25HZXRSZXN1bHQuZmlyZShzZWxmLCB7IHN1Y2Nlc3M6IHN1Y2Nlc3MsIGRhdGE6IGRhdGEsIGRhdGFMaXN0OiBkYXRhTGlzdCwgcmVzcG9uc2U6IHJlc3BvbnNlIH0pO1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGxvYWRTdXJ2ZXlGcm9tU2VydmljZShzdXJ2ZXlJZDogc3RyaW5nID0gbnVsbCkge1xyXG4gICAgICAgIGlmIChzdXJ2ZXlJZCkge1xyXG4gICAgICAgICAgICB0aGlzLnN1cnZleUlkID0gc3VydmV5SWQ7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLmlzTG9hZGluZyA9IHRydWU7XHJcbiAgICAgICAgdGhpcy5vbkxvYWRpbmdTdXJ2ZXlGcm9tU2VydmljZSgpO1xyXG4gICAgICAgIG5ldyBkeFN1cnZleVNlcnZpY2UoKS5sb2FkU3VydmV5KHRoaXMuc3VydmV5SWQsIGZ1bmN0aW9uIChzdWNjZXNzOiBib29sZWFuLCByZXN1bHQ6IHN0cmluZywgcmVzcG9uc2U6IGFueSkge1xyXG4gICAgICAgICAgICBzZWxmLmlzTG9hZGluZyA9IGZhbHNlO1xyXG4gICAgICAgICAgICBpZiAoc3VjY2VzcyAmJiByZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc2V0SnNvbk9iamVjdChyZXN1bHQpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5ub3RpZnlBbGxRdWVzdGlvbnNPblZhbHVlQ2hhbmdlZCgpO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5vbkxvYWRTdXJ2ZXlGcm9tU2VydmljZSgpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkaW5nU3VydmV5RnJvbVNlcnZpY2UoKSB7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkU3VydmV5RnJvbVNlcnZpY2UoKSB7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGNoZWNrUGFnZVZpc2liaWxpdHkocXVlc3Rpb246IElRdWVzdGlvbiwgb2xkUXVlc3Rpb25WaXNpYmxlOiBib29sZWFuKSB7XHJcbiAgICAgICAgdmFyIHBhZ2UgPSB0aGlzLmdldFBhZ2VCeVF1ZXN0aW9uKHF1ZXN0aW9uKTtcclxuICAgICAgICBpZiAoIXBhZ2UpIHJldHVybjtcclxuICAgICAgICB2YXIgbmV3VmFsdWUgPSBwYWdlLmlzVmlzaWJsZTtcclxuICAgICAgICBpZiAobmV3VmFsdWUgIT0gcGFnZS5nZXRJc1BhZ2VWaXNpYmxlKHF1ZXN0aW9uKSB8fCBvbGRRdWVzdGlvblZpc2libGUpIHtcclxuICAgICAgICAgICAgdGhpcy5wYWdlVmlzaWJpbGl0eUNoYW5nZWQocGFnZSwgbmV3VmFsdWUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHByaXZhdGUgdXBkYXRlVmlzaWJsZUluZGV4ZXMoKSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVQYWdlVmlzaWJsZUluZGV4ZXModGhpcy5zaG93UGFnZU51bWJlcnMpO1xyXG4gICAgICAgIGlmICh0aGlzLnNob3dRdWVzdGlvbk51bWJlcnMgPT0gXCJvblBhZ2VcIikge1xyXG4gICAgICAgICAgICB2YXIgdmlzUGFnZXMgPSB0aGlzLnZpc2libGVQYWdlcztcclxuICAgICAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB2aXNQYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICAgICAgdGhpcy51cGRhdGVRdWVzdGlvblZpc2libGVJbmRleGVzKHZpc1BhZ2VzW2ldLnF1ZXN0aW9ucywgdHJ1ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVF1ZXN0aW9uVmlzaWJsZUluZGV4ZXModGhpcy5nZXRBbGxRdWVzdGlvbnMoZmFsc2UpLCB0aGlzLnNob3dRdWVzdGlvbk51bWJlcnMgPT0gXCJvblwiKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHVwZGF0ZVBhZ2VWaXNpYmxlSW5kZXhlcyhzaG93SW5kZXg6IGJvb2xlYW4pIHtcclxuICAgICAgICB2YXIgaW5kZXggPSAwO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5wYWdlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VzW2ldLnZpc2libGVJbmRleCA9IHRoaXMucGFnZXNbaV0udmlzaWJsZSA/IChpbmRleCsrKSA6IC0xO1xyXG4gICAgICAgICAgICB0aGlzLnBhZ2VzW2ldLm51bSA9IHNob3dJbmRleCAmJiB0aGlzLnBhZ2VzW2ldLnZpc2libGUgPyB0aGlzLnBhZ2VzW2ldLnZpc2libGVJbmRleCArIDEgOiAtMTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHVwZGF0ZVF1ZXN0aW9uVmlzaWJsZUluZGV4ZXMocXVlc3Rpb25zOiBJUXVlc3Rpb25bXSwgc2hvd0luZGV4OiBib29sZWFuKSB7XHJcbiAgICAgICAgdmFyIGluZGV4ID0gMDtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICBxdWVzdGlvbnNbaV0uc2V0VmlzaWJsZUluZGV4KHNob3dJbmRleCAmJiBxdWVzdGlvbnNbaV0udmlzaWJsZSAmJiBxdWVzdGlvbnNbaV0uaGFzVGl0bGUgPyAoaW5kZXgrKykgOiAtMSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzZXRKc29uT2JqZWN0KGpzb25PYmo6IGFueSkge1xyXG4gICAgICAgIGlmICghanNvbk9iaikgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMuanNvbkVycm9ycyA9IG51bGw7XHJcbiAgICAgICAgdmFyIGpzb25Db252ZXJ0ZXIgPSBuZXcgSnNvbk9iamVjdCgpO1xyXG4gICAgICAgIGpzb25Db252ZXJ0ZXIudG9PYmplY3QoanNvbk9iaiwgdGhpcyk7XHJcbiAgICAgICAgaWYgKGpzb25Db252ZXJ0ZXIuZXJyb3JzLmxlbmd0aCA+IDApIHtcclxuICAgICAgICAgICAgdGhpcy5qc29uRXJyb3JzID0ganNvbkNvbnZlcnRlci5lcnJvcnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMudXBkYXRlUHJvY2Vzc2VkVGV4dFZhbHVlcygpO1xyXG4gICAgICAgIGlmICh0aGlzLmhhc0Nvb2tpZSkge1xyXG4gICAgICAgICAgICB0aGlzLmRvQ29tcGxldGUoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5kb1F1ZXN0aW9uc09uTG9hZCgpO1xyXG4gICAgICAgIHRoaXMucnVuQ29uZGl0aW9ucygpO1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmlzaWJsZUluZGV4ZXMoKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBvbkJlZm9yZUNyZWF0aW5nKCkgeyB9XHJcbiAgICBwcm90ZWN0ZWQgb25DcmVhdGluZygpIHsgfVxyXG4gICAgcHJpdmF0ZSB1cGRhdGVQcm9jZXNzZWRUZXh0VmFsdWVzKCkge1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc2VkVGV4dFZhbHVlcyA9IHt9O1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLnByb2Nlc3NlZFRleHRWYWx1ZXNbXCJwYWdlbm9cIl0gPSBmdW5jdGlvbiAobmFtZSkgeyByZXR1cm4gc2VsZi5jdXJyZW50UGFnZSAhPSBudWxsID8gc2VsZi52aXNpYmxlUGFnZXMuaW5kZXhPZihzZWxmLmN1cnJlbnRQYWdlKSArIDEgOiAwOyB9XHJcbiAgICAgICAgdGhpcy5wcm9jZXNzZWRUZXh0VmFsdWVzW1wicGFnZWNvdW50XCJdID0gZnVuY3Rpb24gKG5hbWUpIHsgcmV0dXJuIHNlbGYudmlzaWJsZVBhZ2VDb3VudDsgfVxyXG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSB0aGlzLmdldEFsbFF1ZXN0aW9ucygpO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVlc3Rpb25zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHRoaXMuYWRkUXVlc3Rpb25Ub1Byb2Nlc3NlZFRleHRWYWx1ZXMocXVlc3Rpb25zW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIGFkZFF1ZXN0aW9uVG9Qcm9jZXNzZWRUZXh0VmFsdWVzKHF1ZXN0aW9uOiBJUXVlc3Rpb24pIHtcclxuICAgICAgICB0aGlzLnByb2Nlc3NlZFRleHRWYWx1ZXNbcXVlc3Rpb24ubmFtZS50b0xvd2VyQ2FzZSgpXSA9IFwicXVlc3Rpb25cIjtcclxuICAgIH1cclxuICAgIHByaXZhdGUgZ2V0UHJvY2Vzc2VkVGV4dFZhbHVlKG5hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgdmFyIG5hbWUgPSBuYW1lLnRvTG93ZXJDYXNlKCk7XHJcbiAgICAgICAgdmFyIHZhbCA9IHRoaXMucHJvY2Vzc2VkVGV4dFZhbHVlc1tuYW1lXTtcclxuICAgICAgICBpZiAoIXZhbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgaWYgKHZhbCA9PSBcInF1ZXN0aW9uXCIpIHtcclxuICAgICAgICAgICAgdmFyIHF1ZXN0aW9uID0gdGhpcy5nZXRRdWVzdGlvbkJ5TmFtZShuYW1lLCB0cnVlKTtcclxuICAgICAgICAgICAgcmV0dXJuIHF1ZXN0aW9uICE9IG51bGwgPyB0aGlzLmdldFZhbHVlKHF1ZXN0aW9uLm5hbWUpIDogbnVsbDtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKHZhbCA9PSBcInZhbHVlXCIpIHtcclxuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0VmFsdWUobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmICh2YWwgPT0gXCJ2YXJpYWJsZVwiKSB7XHJcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFZhcmlhYmxlKG5hbWUpO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gdmFsKG5hbWUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBjbGVhckludmlzaWJsZVF1ZXN0aW9uVmFsdWVzKCkge1xyXG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSB0aGlzLmdldEFsbFF1ZXN0aW9ucygpO1xyXG4gICAgICAgIGZvciAodmFyIGk6IG51bWJlciA9IDA7IGkgPCBxdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKHF1ZXN0aW9uc1tpXS52aXNpYmxlKSBjb250aW51ZTtcclxuICAgICAgICAgICAgdGhpcy5zZXRWYWx1ZShxdWVzdGlvbnNbaV0ubmFtZSwgbnVsbCk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFZhcmlhYmxlKG5hbWU6IHN0cmluZyk6IGFueSB7XHJcbiAgICAgICAgaWYgKCFuYW1lKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gdGhpcy52YXJpYWJsZXNIYXNoW25hbWVdO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNldFZhcmlhYmxlKG5hbWU6IHN0cmluZywgbmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIGlmICghbmFtZSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMudmFyaWFibGVzSGFzaFtuYW1lXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMucHJvY2Vzc2VkVGV4dFZhbHVlc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gXCJ2YXJpYWJsZVwiO1xyXG4gICAgfVxyXG4gICAgLy9JU3VydmV5IGRhdGFcclxuICAgIHByaXZhdGUgZ2V0VW5iaW5kVmFsdWUodmFsdWU6IGFueSk6IGFueSB7XHJcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlIGluc3RhbmNlb2YgT2JqZWN0KSB7XHJcbiAgICAgICAgICAgIC8vZG8gbm90IHJldHVybiB0aGUgc2FtZSBvYmplY3QgaW5zdGFuY2UhISFcclxuICAgICAgICAgICAgcmV0dXJuIEpTT04ucGFyc2UoSlNPTi5zdHJpbmdpZnkodmFsdWUpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHZhbHVlO1xyXG4gICAgfVxyXG4gICAgZ2V0VmFsdWUobmFtZTogc3RyaW5nKTogYW55IHtcclxuICAgICAgICBpZiAoIW5hbWUgfHwgbmFtZS5sZW5ndGggPT0gMCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgdmFyIHZhbHVlID0gdGhpcy52YWx1ZXNIYXNoW25hbWVdO1xyXG4gICAgICAgIHJldHVybiB0aGlzLmdldFVuYmluZFZhbHVlKHZhbHVlKTtcclxuICAgIH1cclxuICAgIHNldFZhbHVlKG5hbWU6IHN0cmluZywgbmV3VmFsdWU6IGFueSkge1xyXG4gICAgICAgIGlmICh0aGlzLmlzVmFsdWVFcXVhbChuYW1lLCBuZXdWYWx1ZSkpIHJldHVybjtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPT0gXCJcIiB8fCBuZXdWYWx1ZSA9PSBudWxsKSB7XHJcbiAgICAgICAgICAgIGRlbGV0ZSB0aGlzLnZhbHVlc0hhc2hbbmFtZV07XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgbmV3VmFsdWUgPSB0aGlzLmdldFVuYmluZFZhbHVlKG5ld1ZhbHVlKTtcclxuICAgICAgICAgICAgdGhpcy52YWx1ZXNIYXNoW25hbWVdID0gbmV3VmFsdWU7XHJcbiAgICAgICAgICAgIHRoaXMucHJvY2Vzc2VkVGV4dFZhbHVlc1tuYW1lLnRvTG93ZXJDYXNlKCldID0gXCJ2YWx1ZVwiO1xyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLm5vdGlmeVF1ZXN0aW9uT25WYWx1ZUNoYW5nZWQobmFtZSwgbmV3VmFsdWUpO1xyXG4gICAgICAgIHRoaXMuY2hlY2tUcmlnZ2VycyhuYW1lLCBuZXdWYWx1ZSwgZmFsc2UpO1xyXG4gICAgICAgIHRoaXMucnVuQ29uZGl0aW9ucygpO1xyXG4gICAgICAgIHRoaXMudHJ5R29OZXh0UGFnZUF1dG9tYXRpYyhuYW1lKTtcclxuICAgIH1cclxuICAgIHByaXZhdGUgaXNWYWx1ZUVxdWFsKG5hbWU6IHN0cmluZywgbmV3VmFsdWU6IGFueSk6IGJvb2xlYW4ge1xyXG4gICAgICAgIGlmIChuZXdWYWx1ZSA9PSBcIlwiKSBuZXdWYWx1ZSA9IG51bGw7XHJcbiAgICAgICAgdmFyIG9sZFZhbHVlID0gdGhpcy5nZXRWYWx1ZShuYW1lKTtcclxuICAgICAgICBpZiAobmV3VmFsdWUgPT09IG51bGwgfHwgb2xkVmFsdWUgPT09IG51bGwpIHJldHVybiBuZXdWYWx1ZSA9PT0gb2xkVmFsdWU7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuaXNUd29WYWx1ZUVxdWFscyhuZXdWYWx1ZSwgb2xkVmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBpc1R3b1ZhbHVlRXF1YWxzKHg6IGFueSwgeTogYW55KTogYm9vbGVhbiB7XHJcbiAgICAgICAgaWYgKHggPT09IHkpIHJldHVybiB0cnVlO1xyXG4gICAgICAgIGlmICghKHggaW5zdGFuY2VvZiBPYmplY3QpIHx8ICEoeSBpbnN0YW5jZW9mIE9iamVjdCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICBmb3IgKHZhciBwIGluIHgpIHtcclxuICAgICAgICAgICAgaWYgKCF4Lmhhc093blByb3BlcnR5KHApKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKCF5Lmhhc093blByb3BlcnR5KHApKSByZXR1cm4gZmFsc2U7XHJcbiAgICAgICAgICAgIGlmICh4W3BdID09PSB5W3BdKSBjb250aW51ZTtcclxuICAgICAgICAgICAgaWYgKHR5cGVvZiAoeFtwXSkgIT09IFwib2JqZWN0XCIpIHJldHVybiBmYWxzZTtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmlzVHdvVmFsdWVFcXVhbHMoeFtwXSwgeVtwXSkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgZm9yIChwIGluIHkpIHtcclxuICAgICAgICAgICAgaWYgKHkuaGFzT3duUHJvcGVydHkocCkgJiYgIXguaGFzT3duUHJvcGVydHkocCkpIHJldHVybiBmYWxzZTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIHRydWU7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHRyeUdvTmV4dFBhZ2VBdXRvbWF0aWMobmFtZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLmdvTmV4dFBhZ2VBdXRvbWF0aWMgfHwgIXRoaXMuY3VycmVudFBhZ2UpIHJldHVybjtcclxuICAgICAgICB2YXIgcXVlc3Rpb24gPSB0aGlzLmdldFF1ZXN0aW9uQnlOYW1lKG5hbWUpO1xyXG4gICAgICAgIGlmIChxdWVzdGlvbiAmJiAhcXVlc3Rpb24uc3VwcG9ydEdvTmV4dFBhZ2VBdXRvbWF0aWMoKSkgcmV0dXJuO1xyXG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSB0aGlzLmdldEN1cnJlbnRQYWdlUXVlc3Rpb25zKCk7XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVzdGlvbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgaWYgKCF0aGlzLmdldFZhbHVlKHF1ZXN0aW9uc1tpXS5uYW1lKSkgcmV0dXJuO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAoIXRoaXMuY3VycmVudFBhZ2UuaGFzRXJyb3JzKHRydWUsIGZhbHNlKSkge1xyXG4gICAgICAgICAgICBpZiAoIXRoaXMuaXNMYXN0UGFnZSkge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5uZXh0UGFnZSgpO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgdGhpcy5kb0NvbXBsZXRlKCk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBnZXRDb21tZW50KG5hbWU6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgdmFyIHJlc3VsdCA9IHRoaXMuZGF0YVtuYW1lICsgdGhpcy5jb21tZW50UHJlZml4XTtcclxuICAgICAgICBpZiAocmVzdWx0ID09IG51bGwpIHJlc3VsdCA9IFwiXCI7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHNldENvbW1lbnQobmFtZTogc3RyaW5nLCBuZXdWYWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgbmFtZSA9IG5hbWUgKyB0aGlzLmNvbW1lbnRQcmVmaXg7XHJcbiAgICAgICAgaWYgKG5ld1ZhbHVlID09IFwiXCIgfHwgbmV3VmFsdWUgPT0gbnVsbCkge1xyXG4gICAgICAgICAgICBkZWxldGUgdGhpcy52YWx1ZXNIYXNoW25hbWVdO1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHRoaXMudmFsdWVzSGFzaFtuYW1lXSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgICAgICB0aGlzLnRyeUdvTmV4dFBhZ2VBdXRvbWF0aWMobmFtZSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcXVlc3Rpb25WaXNpYmlsaXR5Q2hhbmdlZChxdWVzdGlvbjogSVF1ZXN0aW9uLCBuZXdWYWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmlzaWJsZUluZGV4ZXMoKTtcclxuICAgICAgICB0aGlzLm9uVmlzaWJsZUNoYW5nZWQuZmlyZSh0aGlzLCB7ICdxdWVzdGlvbic6IHF1ZXN0aW9uLCAnbmFtZSc6IHF1ZXN0aW9uLm5hbWUsICd2aXNpYmxlJzogbmV3VmFsdWUgfSk7XHJcbiAgICAgICAgdGhpcy5jaGVja1BhZ2VWaXNpYmlsaXR5KHF1ZXN0aW9uLCAhbmV3VmFsdWUpO1xyXG4gICAgfVxyXG4gICAgcGFnZVZpc2liaWxpdHlDaGFuZ2VkKHBhZ2U6IElQYWdlLCBuZXdWYWx1ZTogYm9vbGVhbikge1xyXG4gICAgICAgIHRoaXMudXBkYXRlVmlzaWJsZUluZGV4ZXMoKTtcclxuICAgICAgICB0aGlzLm9uUGFnZVZpc2libGVDaGFuZ2VkLmZpcmUodGhpcywgeyAncGFnZSc6IHBhZ2UsICd2aXNpYmxlJzogbmV3VmFsdWUgfSk7XHJcbiAgICB9XHJcbiAgICBxdWVzdGlvbkFkZGVkKHF1ZXN0aW9uOiBJUXVlc3Rpb24sIGluZGV4OiBudW1iZXIpIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2libGVJbmRleGVzKCk7XHJcbiAgICAgICAgdGhpcy5hZGRRdWVzdGlvblRvUHJvY2Vzc2VkVGV4dFZhbHVlcyhxdWVzdGlvbik7XHJcbiAgICAgICAgdGhpcy5vblF1ZXN0aW9uQWRkZWQuZmlyZSh0aGlzLCB7ICdxdWVzdGlvbic6IHF1ZXN0aW9uLCAnbmFtZSc6IHF1ZXN0aW9uLm5hbWUsICdpbmRleCc6IGluZGV4IH0pO1xyXG4gICAgfVxyXG4gICAgcXVlc3Rpb25SZW1vdmVkKHF1ZXN0aW9uOiBJUXVlc3Rpb24pIHtcclxuICAgICAgICB0aGlzLnVwZGF0ZVZpc2libGVJbmRleGVzKCk7XHJcbiAgICAgICAgdGhpcy5vblF1ZXN0aW9uUmVtb3ZlZC5maXJlKHRoaXMsIHsgJ3F1ZXN0aW9uJzogcXVlc3Rpb24sICduYW1lJzogcXVlc3Rpb24ubmFtZSB9KTtcclxuICAgIH1cclxuICAgIHZhbGlkYXRlUXVlc3Rpb24obmFtZTogc3RyaW5nKTogU3VydmV5RXJyb3Ige1xyXG4gICAgICAgIGlmICh0aGlzLm9uVmFsaWRhdGVRdWVzdGlvbi5pc0VtcHR5KSByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgb3B0aW9ucyA9IHsgbmFtZTogbmFtZSwgdmFsdWU6IHRoaXMuZ2V0VmFsdWUobmFtZSksIGVycm9yOiBudWxsIH07XHJcbiAgICAgICAgdGhpcy5vblZhbGlkYXRlUXVlc3Rpb24uZmlyZSh0aGlzLCBvcHRpb25zKTtcclxuICAgICAgICByZXR1cm4gb3B0aW9ucy5lcnJvciA/IG5ldyBDdXN0b21FcnJvcihvcHRpb25zLmVycm9yKSA6IG51bGw7XHJcbiAgICB9XHJcbiAgICBwcm9jZXNzSHRtbChodG1sOiBzdHJpbmcpOiBzdHJpbmcge1xyXG4gICAgICAgIHZhciBvcHRpb25zID0geyBodG1sOiBodG1sIH07XHJcbiAgICAgICAgdGhpcy5vblByb2Nlc3NIdG1sLmZpcmUodGhpcywgb3B0aW9ucyk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucHJvY2Vzc1RleHQob3B0aW9ucy5odG1sKTtcclxuICAgIH1cclxuICAgIHByb2Nlc3NUZXh0KHRleHQ6IHN0cmluZyk6IHN0cmluZyB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMudGV4dFByZVByb2Nlc3Nvci5wcm9jZXNzKHRleHQpO1xyXG4gICAgfVxyXG4gICAgLy9JU3VydmV5VHJpZ2dlck93bmVyXHJcbiAgICBnZXRPYmplY3RzKHBhZ2VzOiBzdHJpbmdbXSwgcXVlc3Rpb25zOiBzdHJpbmdbXSk6IGFueVtde1xyXG4gICAgICAgIHZhciByZXN1bHQgPSBbXTtcclxuICAgICAgICBBcnJheS5wcm90b3R5cGUucHVzaC5hcHBseShyZXN1bHQsIHRoaXMuZ2V0UGFnZXNCeU5hbWVzKHBhZ2VzKSk7XHJcbiAgICAgICAgQXJyYXkucHJvdG90eXBlLnB1c2guYXBwbHkocmVzdWx0LCB0aGlzLmdldFF1ZXN0aW9uc0J5TmFtZXMocXVlc3Rpb25zKSk7XHJcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcclxuICAgIH1cclxuICAgIHNldFRyaWdnZXJWYWx1ZShuYW1lOiBzdHJpbmcsIHZhbHVlOiBhbnksIGlzVmFyaWFibGU6IGJvb2xlYW4pIHtcclxuICAgICAgICBpZiAoIW5hbWUpIHJldHVybjtcclxuICAgICAgICBpZiAoaXNWYXJpYWJsZSkge1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhcmlhYmxlKG5hbWUsIHZhbHVlKTtcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB0aGlzLnNldFZhbHVlKG5hbWUsIHZhbHVlKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJzdXJ2ZXlcIiwgW3sgbmFtZTogXCJsb2NhbGVcIiwgY2hvaWNlczogKCkgPT4geyByZXR1cm4gc3VydmV5TG9jYWxpemF0aW9uLmdldExvY2FsZXMoKSB9IH0sXHJcbiAgICBcInRpdGxlXCIsIFwiY29tcGxldGVkSHRtbDpodG1sXCIsIHsgbmFtZTogXCJwYWdlc1wiLCBjbGFzc05hbWU6IFwicGFnZVwiIH0sXHJcbiAgICB7IG5hbWU6IFwicXVlc3Rpb25zXCIsIGJhc2VDbGFzc05hbWU6IFwicXVlc3Rpb25cIiwgb25HZXRWYWx1ZTogZnVuY3Rpb24gKG9iaikgeyByZXR1cm4gbnVsbDsgfSwgb25TZXRWYWx1ZTogZnVuY3Rpb24gKG9iaiwgdmFsdWUsIGpzb25Db252ZXJ0ZXIpIHsgdmFyIHBhZ2UgPSBvYmouYWRkTmV3UGFnZShcIlwiKTsganNvbkNvbnZlcnRlci50b09iamVjdCh7IHF1ZXN0aW9uczogdmFsdWUgfSwgcGFnZSk7IH0gfSxcclxuICAgIHsgbmFtZTogXCJ0cmlnZ2Vyczp0cmlnZ2Vyc1wiLCBiYXNlQ2xhc3NOYW1lOiBcInN1cnZleXRyaWdnZXJcIiwgY2xhc3NOYW1lUGFydDogXCJ0cmlnZ2VyXCIgfSxcclxuICAgIFwic3VydmV5SWRcIiwgXCJzdXJ2ZXlQb3N0SWRcIiwgXCJjb29raWVOYW1lXCIsIFwic2VuZFJlc3VsdE9uUGFnZU5leHQ6Ym9vbGVhblwiLFxyXG4gICAgeyBuYW1lOiBcInNob3dOYXZpZ2F0aW9uQnV0dG9uczpib29sZWFuXCIsIGRlZmF1bHQ6IHRydWUgfSwgeyBuYW1lOiBcInNob3dUaXRsZTpib29sZWFuXCIsIGRlZmF1bHQ6IHRydWUgfSwgeyBuYW1lOiBcInNob3dQYWdlVGl0bGVzOmJvb2xlYW5cIiwgZGVmYXVsdDogdHJ1ZSB9LFxyXG4gICAgXCJzaG93UGFnZU51bWJlcnM6Ym9vbGVhblwiLCB7IG5hbWU6IFwic2hvd1F1ZXN0aW9uTnVtYmVyc1wiLCBkZWZhdWx0OiBcIm9uXCIsIGNob2ljZXM6IFtcIm9uXCIsIFwib25QYWdlXCIsIFwib2ZmXCJdIH0sXHJcbiAgICB7IG5hbWU6IFwicXVlc3Rpb25UaXRsZUxvY2F0aW9uXCIsIGRlZmF1bHQ6IFwidG9wXCIsIGNob2ljZXM6IFtcInRvcFwiLCBcImJvdHRvbVwiXSB9LFxyXG4gICAgeyBuYW1lOiBcInNob3dQcm9ncmVzc0JhclwiLCBkZWZhdWx0OiBcIm9mZlwiLCBjaG9pY2VzOiBbXCJvZmZcIiwgXCJ0b3BcIiwgXCJib3R0b21cIl0gfSxcclxuICAgIHsgbmFtZTogXCJzdG9yZU90aGVyc0FzQ29tbWVudDpib29sZWFuXCIsIGRlZmF1bHQ6IHRydWUgfSwgXCJnb05leHRQYWdlQXV0b21hdGljOmJvb2xlYW5cIiwgXCJjbGVhckludmlzaWJsZVZhbHVlczpib29sZWFuXCIsXHJcbiAgICB7IG5hbWU6IFwicGFnZVByZXZUZXh0XCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gb2JqLnBhZ2VQcmV2VGV4dFZhbHVlOyB9IH0sXHJcbiAgICB7IG5hbWU6IFwicGFnZU5leHRUZXh0XCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gb2JqLnBhZ2VOZXh0VGV4dFZhbHVlOyB9IH0sXHJcbiAgICB7IG5hbWU6IFwiY29tcGxldGVUZXh0XCIsIG9uR2V0VmFsdWU6IGZ1bmN0aW9uIChvYmo6IGFueSkgeyByZXR1cm4gb2JqLmNvbXBsZXRlVGV4dFZhbHVlOyB9IH0sXHJcbiAgICB7IG5hbWU6IFwicmVxdWlyZWRUZXh0XCIsIGRlZmF1bHQ6IFwiKlwiIH0sIFwicXVlc3Rpb25TdGFydEluZGV4XCIsIFwicXVlc3Rpb25UaXRsZVRlbXBsYXRlXCJdKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9zdXJ2ZXkudHNcbiAqKi8iLCJleHBvcnQgY2xhc3MgZHhTdXJ2ZXlTZXJ2aWNlIHtcclxuICAgIHB1YmxpYyBzdGF0aWMgc2VydmljZVVybDogc3RyaW5nID0gXCJodHRwczovL2R4c3VydmV5YXBpLmF6dXJld2Vic2l0ZXMubmV0L2FwaS9TdXJ2ZXlcIjtcclxuICAgIC8vcHVibGljIHN0YXRpYyBzZXJ2aWNlVXJsOiBzdHJpbmcgPSBcImh0dHA6Ly9sb2NhbGhvc3Q6NTA0ODgvYXBpL1N1cnZleVwiO1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgbG9hZFN1cnZleShzdXJ2ZXlJZDogc3RyaW5nLCBvbkxvYWQ6IChzdWNjZXNzOiBib29sZWFuLCByZXN1bHQ6IHN0cmluZywgcmVzcG9uc2U6IGFueSkgPT4gdm9pZCkge1xyXG4gICAgICAgIHZhciB4aHIgPSBuZXcgWE1MSHR0cFJlcXVlc3QoKTtcclxuICAgICAgICB4aHIub3BlbignR0VUJywgZHhTdXJ2ZXlTZXJ2aWNlLnNlcnZpY2VVcmwgKyAnL2dldFN1cnZleT9zdXJ2ZXlJZD0nICsgc3VydmV5SWQpO1xyXG4gICAgICAgIHhoci5zZXRSZXF1ZXN0SGVhZGVyKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24veC13d3ctZm9ybS11cmxlbmNvZGVkJyk7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgb25Mb2FkKHhoci5zdGF0dXMgPT0gMjAwLCByZXN1bHQsIHhoci5yZXNwb25zZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIuc2VuZCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHNlbmRSZXN1bHQocG9zdElkOiBzdHJpbmcsIHJlc3VsdDogSlNPTiwgb25TZW5kUmVzdWx0OiAoc3VjY2VzczogYm9vbGVhbiwgcmVzcG9uc2U6IGFueSk9PiB2b2lkLCBjbGllbnRJZDogc3RyaW5nID0gbnVsbCwgaXNQYXJ0aWFsQ29tcGxldGVkOiBib29sZWFuID0gZmFsc2UpIHtcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgeGhyLm9wZW4oJ1BPU1QnLCBkeFN1cnZleVNlcnZpY2Uuc2VydmljZVVybCArICcvcG9zdC8nKTtcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnKTtcclxuICAgICAgICB2YXIgZGF0YSA9IHsgcG9zdElkOiBwb3N0SWQsIHN1cnZleVJlc3VsdDogSlNPTi5zdHJpbmdpZnkocmVzdWx0KSB9O1xyXG4gICAgICAgIGlmIChjbGllbnRJZCkgZGF0YVsnY2xpZW50SWQnXSA9IGNsaWVudElkO1xyXG4gICAgICAgIGlmIChpc1BhcnRpYWxDb21wbGV0ZWQpIGRhdGFbJ2lzUGFydGlhbENvbXBsZXRlZCddID0gdHJ1ZTtcclxuICAgICAgICB2YXIgZGF0YVN0cmluZ2lmeTogc3RyaW5nID0gSlNPTi5zdHJpbmdpZnkoZGF0YSk7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFvblNlbmRSZXN1bHQpIHJldHVybjtcclxuICAgICAgICAgICAgb25TZW5kUmVzdWx0KHhoci5zdGF0dXMgPT0gMjAwLCB4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLnNlbmQoZGF0YVN0cmluZ2lmeSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2VuZEZpbGUocG9zdElkOiBzdHJpbmcsIGZpbGU6IEZpbGUsIG9uU2VuZEZpbGU6IChzdWNjZXNzOiBib29sZWFuLCByZXNwb25zZTogYW55KSA9PiB2b2lkKSB7XHJcbiAgICAgICAgdmFyIHhociA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpO1xyXG4gICAgICAgIHhoci5vbmxvYWQgPSB4aHIub25lcnJvciA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgaWYgKCFvblNlbmRGaWxlKSByZXR1cm47XHJcbiAgICAgICAgICAgIG9uU2VuZEZpbGUoeGhyLnN0YXR1cyA9PSAyMDAsIEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB4aHIub3BlbihcIlBPU1RcIiwgZHhTdXJ2ZXlTZXJ2aWNlLnNlcnZpY2VVcmwgKyAnL3VwbG9hZC8nLCB0cnVlKTtcclxuICAgICAgICB2YXIgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcclxuICAgICAgICBmb3JtRGF0YS5hcHBlbmQoXCJmaWxlXCIsIGZpbGUpO1xyXG4gICAgICAgIGZvcm1EYXRhLmFwcGVuZChcInBvc3RJZFwiLCBwb3N0SWQpO1xyXG4gICAgICAgIHhoci5zZW5kKGZvcm1EYXRhKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRSZXN1bHQocmVzdWx0SWQ6IHN0cmluZywgbmFtZTogc3RyaW5nLCBvbkdldFJlc3VsdDogKHN1Y2Nlc3M6IGJvb2xlYW4sIGRhdGE6IGFueSwgZGF0YUxpc3Q6IEFycmF5PGFueT4sIHJlc3BvbnNlOiBhbnkpID0+IHZvaWQpIHtcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgdmFyIGRhdGEgPSAncmVzdWx0SWQ9JyArIHJlc3VsdElkICsgJyZuYW1lPScgKyBuYW1lO1xyXG4gICAgICAgIHhoci5vcGVuKCdHRVQnLCBkeFN1cnZleVNlcnZpY2Uuc2VydmljZVVybCArICcvZ2V0UmVzdWx0PycgKyBkYXRhKTtcclxuICAgICAgICB4aHIuc2V0UmVxdWVzdEhlYWRlcignQ29udGVudC1UeXBlJywgJ2FwcGxpY2F0aW9uL3gtd3d3LWZvcm0tdXJsZW5jb2RlZCcpO1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB4aHIub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICB2YXIgcmVzdWx0ID0gbnVsbDtcclxuICAgICAgICAgICAgdmFyIGxpc3QgPSBudWxsO1xyXG4gICAgICAgICAgICBpZiAoeGhyLnN0YXR1cyA9PSAyMDApIHtcclxuICAgICAgICAgICAgICAgIHJlc3VsdCA9IEpTT04ucGFyc2UoeGhyLnJlc3BvbnNlKTtcclxuICAgICAgICAgICAgICAgIGxpc3QgPSBbXTtcclxuICAgICAgICAgICAgICAgIGZvciAodmFyIGtleSBpbiByZXN1bHQuUXVlc3Rpb25SZXN1bHQpIHtcclxuICAgICAgICAgICAgICAgICAgICB2YXIgZWwgPSB7IG5hbWU6IGtleSwgdmFsdWU6IHJlc3VsdC5RdWVzdGlvblJlc3VsdFtrZXldIH07XHJcbiAgICAgICAgICAgICAgICAgICAgbGlzdC5wdXNoKGVsKTtcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBvbkdldFJlc3VsdCh4aHIuc3RhdHVzID09IDIwMCwgcmVzdWx0LCBsaXN0LCB4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgeGhyLnNlbmQoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBpc0NvbXBsZXRlZChyZXN1bHRJZDogc3RyaW5nLCBjbGllbnRJZDogc3RyaW5nLCBvbklzQ29tcGxldGVkOiAoc3VjY2VzczogYm9vbGVhbiwgcmVzdWx0OiBzdHJpbmcsIHJlc3BvbnNlOiBhbnkpID0+IHZvaWQpIHtcclxuICAgICAgICB2YXIgeGhyID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCk7XHJcbiAgICAgICAgdmFyIGRhdGEgPSAncmVzdWx0SWQ9JyArIHJlc3VsdElkICsgJyZjbGllbnRJZD0nICsgY2xpZW50SWQ7XHJcbiAgICAgICAgeGhyLm9wZW4oJ0dFVCcsIGR4U3VydmV5U2VydmljZS5zZXJ2aWNlVXJsICsgJy9pc0NvbXBsZXRlZD8nICsgZGF0YSk7XHJcbiAgICAgICAgeGhyLnNldFJlcXVlc3RIZWFkZXIoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi94LXd3dy1mb3JtLXVybGVuY29kZWQnKTtcclxuICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgeGhyLm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgdmFyIHJlc3VsdCA9IG51bGw7XHJcbiAgICAgICAgICAgIGlmICh4aHIuc3RhdHVzID09IDIwMCkge1xyXG4gICAgICAgICAgICAgICAgcmVzdWx0ID0gSlNPTi5wYXJzZSh4aHIucmVzcG9uc2UpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIG9uSXNDb21wbGV0ZWQoeGhyLnN0YXR1cyA9PSAyMDAsIHJlc3VsdCwgeGhyLnJlc3BvbnNlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHhoci5zZW5kKCk7XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9keFN1cnZleVNlcnZpY2UudHNcbiAqKi8iLCJpbXBvcnQge0Jhc2UsIEhhc2hUYWJsZX0gZnJvbSBcIi4vYmFzZVwiO1xyXG5pbXBvcnQge0pzb25PYmplY3R9IGZyb20gXCIuL2pzb25vYmplY3RcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBUcmlnZ2VyIGV4dGVuZHMgQmFzZSB7XHJcbiAgICBzdGF0aWMgb3BlcmF0b3JzVmFsdWU6IEhhc2hUYWJsZTxGdW5jdGlvbj4gPSBudWxsO1xyXG4gICAgc3RhdGljIGdldCBvcGVyYXRvcnMoKSB7XHJcbiAgICAgICAgaWYgKFRyaWdnZXIub3BlcmF0b3JzVmFsdWUgIT0gbnVsbCkgcmV0dXJuIFRyaWdnZXIub3BlcmF0b3JzVmFsdWU7XHJcbiAgICAgICAgVHJpZ2dlci5vcGVyYXRvcnNWYWx1ZSA9IHtcclxuICAgICAgICAgICAgZW1wdHk6IGZ1bmN0aW9uICh2YWx1ZSwgZXhwZWN0ZWRWYWx1ZSkgeyByZXR1cm4gIXZhbHVlOyB9LFxyXG4gICAgICAgICAgICBub3RlbXB0eTogZnVuY3Rpb24gKHZhbHVlLCBleHBlY3RlZFZhbHVlKSB7IHJldHVybiAhKCF2YWx1ZSk7IH0sXHJcbiAgICAgICAgICAgIGVxdWFsOiBmdW5jdGlvbiAodmFsdWUsIGV4cGVjdGVkVmFsdWUpIHsgcmV0dXJuIHZhbHVlID09IGV4cGVjdGVkVmFsdWU7IH0sXHJcbiAgICAgICAgICAgIG5vdGVxdWFsOiBmdW5jdGlvbiAodmFsdWUsIGV4cGVjdGVkVmFsdWUpIHsgcmV0dXJuIHZhbHVlICE9IGV4cGVjdGVkVmFsdWU7IH0sXHJcbiAgICAgICAgICAgIGNvbnRhaW5zOiBmdW5jdGlvbiAodmFsdWUsIGV4cGVjdGVkVmFsdWUpIHsgcmV0dXJuIHZhbHVlICYmIHZhbHVlW1wiaW5kZXhPZlwiXSAmJiB2YWx1ZS5pbmRleE9mKGV4cGVjdGVkVmFsdWUpID4gLTE7IH0sXHJcbiAgICAgICAgICAgIG5vdGNvbnRhaW5zOiBmdW5jdGlvbiAodmFsdWUsIGV4cGVjdGVkVmFsdWUpIHsgcmV0dXJuICF2YWx1ZSB8fCAhdmFsdWVbXCJpbmRleE9mXCJdIHx8IHZhbHVlLmluZGV4T2YoZXhwZWN0ZWRWYWx1ZSkgPT0gLTE7IH0sXHJcbiAgICAgICAgICAgIGdyZWF0ZXI6IGZ1bmN0aW9uICh2YWx1ZSwgZXhwZWN0ZWRWYWx1ZSkgeyByZXR1cm4gdmFsdWUgPiBleHBlY3RlZFZhbHVlOyB9LFxyXG4gICAgICAgICAgICBsZXNzOiBmdW5jdGlvbiAodmFsdWUsIGV4cGVjdGVkVmFsdWUpIHsgcmV0dXJuIHZhbHVlIDwgZXhwZWN0ZWRWYWx1ZTsgfSxcclxuICAgICAgICAgICAgZ3JlYXRlcm9yZXF1YWw6IGZ1bmN0aW9uICh2YWx1ZSwgZXhwZWN0ZWRWYWx1ZSkgeyByZXR1cm4gdmFsdWUgPj0gZXhwZWN0ZWRWYWx1ZTsgfSxcclxuICAgICAgICAgICAgbGVzc29yZXF1YWw6IGZ1bmN0aW9uICh2YWx1ZSwgZXhwZWN0ZWRWYWx1ZSkgeyByZXR1cm4gdmFsdWUgPD0gZXhwZWN0ZWRWYWx1ZTsgfVxyXG4gICAgICAgIH07XHJcbiAgICAgICAgcmV0dXJuIFRyaWdnZXIub3BlcmF0b3JzVmFsdWU7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIG9wVmFsdWU6IHN0cmluZyA9IFwiZXF1YWxcIjtcclxuICAgIHB1YmxpYyB2YWx1ZTogYW55O1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXQgb3BlcmF0b3IoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMub3BWYWx1ZTsgfVxyXG4gICAgcHVibGljIHNldCBvcGVyYXRvcih2YWx1ZTogc3RyaW5nKSB7XHJcbiAgICAgICAgaWYgKCF2YWx1ZSkgcmV0dXJuO1xyXG4gICAgICAgIHZhbHVlID0gdmFsdWUudG9Mb3dlckNhc2UoKTtcclxuICAgICAgICBpZiAoIVRyaWdnZXIub3BlcmF0b3JzW3ZhbHVlXSkgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMub3BWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNoZWNrKHZhbHVlOiBhbnkpIHtcclxuICAgICAgICBpZiAoVHJpZ2dlci5vcGVyYXRvcnNbdGhpcy5vcGVyYXRvcl0odmFsdWUsIHRoaXMudmFsdWUpKSB7XHJcbiAgICAgICAgICAgIHRoaXMub25TdWNjZXNzKCk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5vbkZhaWx1cmUoKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25TdWNjZXNzKCkgeyB9XHJcbiAgICBwcm90ZWN0ZWQgb25GYWlsdXJlKCkgeyB9XHJcbn1cclxuXHJcbmV4cG9ydCBpbnRlcmZhY2UgSVN1cnZleVRyaWdnZXJPd25lciB7XHJcbiAgICBnZXRPYmplY3RzKHBhZ2VzOiBzdHJpbmdbXSwgcXVlc3Rpb25zOiBzdHJpbmdbXSk6IGFueVtdO1xyXG4gICAgZG9Db21wbGV0ZSgpO1xyXG4gICAgc2V0VHJpZ2dlclZhbHVlKG5hbWU6IHN0cmluZywgdmFsdWU6IGFueSwgaXNWYXJpYWJsZTogYm9vbGVhbik7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlUcmlnZ2VyIGV4dGVuZHMgVHJpZ2dlciB7XHJcbiAgICBwdWJsaWMgbmFtZTogc3RyaW5nO1xyXG4gICAgcHJvdGVjdGVkIG93bmVyOiBJU3VydmV5VHJpZ2dlck93bmVyID0gbnVsbDtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgc2V0T3duZXIob3duZXI6IElTdXJ2ZXlUcmlnZ2VyT3duZXIpIHtcclxuICAgICAgICB0aGlzLm93bmVyID0gb3duZXI7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzT25OZXh0UGFnZSgpIHsgcmV0dXJuIGZhbHNlOyB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlUcmlnZ2VyVmlzaWJsZSBleHRlbmRzIFN1cnZleVRyaWdnZXIge1xyXG4gICAgcHVibGljIHBhZ2VzOiBzdHJpbmdbXSA9IFtdO1xyXG4gICAgcHVibGljIHF1ZXN0aW9uczogc3RyaW5nW10gPSBbXTtcclxuICAgIGNvbnN0cnVjdG9yKCkge1xyXG4gICAgICAgIHN1cGVyKCk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgZ2V0VHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gXCJ2aXNpYmxldHJpZ2dlclwiOyB9XHJcbiAgICBwcm90ZWN0ZWQgb25TdWNjZXNzKCkgeyB0aGlzLm9uVHJpZ2dlcih0aGlzLm9uSXRlbVN1Y2Nlc3MpOyB9XHJcbiAgICBwcm90ZWN0ZWQgb25GYWlsdXJlKCkgeyB0aGlzLm9uVHJpZ2dlcih0aGlzLm9uSXRlbUZhaWx1cmUpOyB9XHJcbiAgICBwcml2YXRlIG9uVHJpZ2dlcihmdW5jOiBGdW5jdGlvbikge1xyXG4gICAgICAgIGlmICghdGhpcy5vd25lcikgcmV0dXJuO1xyXG4gICAgICAgIHZhciBvYmplY3RzID0gdGhpcy5vd25lci5nZXRPYmplY3RzKHRoaXMucGFnZXMsIHRoaXMucXVlc3Rpb25zKTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG9iamVjdHMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgZnVuYyhvYmplY3RzW2ldKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25JdGVtU3VjY2VzcyhpdGVtOiBhbnkpIHsgaXRlbS52aXNpYmxlID0gdHJ1ZTsgfVxyXG4gICAgcHJvdGVjdGVkIG9uSXRlbUZhaWx1cmUoaXRlbTogYW55KSB7IGl0ZW0udmlzaWJsZSA9IGZhbHNlOyB9XHJcbn1cclxuZXhwb3J0IGNsYXNzIFN1cnZleVRyaWdnZXJDb21wbGV0ZSBleHRlbmRzIFN1cnZleVRyaWdnZXIge1xyXG4gICAgY29uc3RydWN0b3IoKSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCk6IHN0cmluZyB7IHJldHVybiBcImNvbXBsZXRldHJpZ2dlclwiOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzT25OZXh0UGFnZSgpIHsgcmV0dXJuIHRydWU7IH1cclxuICAgIHByb3RlY3RlZCBvblN1Y2Nlc3MoKSB7IGlmICh0aGlzLm93bmVyKSB0aGlzLm93bmVyLmRvQ29tcGxldGUoKTsgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlUcmlnZ2VyU2V0VmFsdWUgZXh0ZW5kcyBTdXJ2ZXlUcmlnZ2VyIHtcclxuICAgIHB1YmxpYyBzZXRUb05hbWU6IHN0cmluZztcclxuICAgIHB1YmxpYyBzZXRWYWx1ZTogYW55O1xyXG4gICAgcHVibGljIGlzVmFyaWFibGU6IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3RvcigpIHtcclxuICAgICAgICBzdXBlcigpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldFR5cGUoKTogc3RyaW5nIHsgcmV0dXJuIFwic2V0dmFsdWV0cmlnZ2VyXCI7IH1cclxuICAgIHByb3RlY3RlZCBvblN1Y2Nlc3MoKSB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnNldFRvTmFtZSB8fCAhdGhpcy5vd25lcikgcmV0dXJuO1xyXG4gICAgICAgIHRoaXMub3duZXIuc2V0VHJpZ2dlclZhbHVlKHRoaXMuc2V0VG9OYW1lLCB0aGlzLnNldFZhbHVlLCB0aGlzLmlzVmFyaWFibGUpO1xyXG4gICAgfVxyXG59XHJcblxyXG5Kc29uT2JqZWN0Lm1ldGFEYXRhLmFkZENsYXNzKFwidHJpZ2dlclwiLCBbXCJvcGVyYXRvclwiLCBcIiF2YWx1ZVwiXSk7XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJzdXJ2ZXl0cmlnZ2VyXCIsIFtcIiFuYW1lXCJdLCBudWxsLCBcInRyaWdnZXJcIik7XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJ2aXNpYmxldHJpZ2dlclwiLCBbXCJwYWdlc1wiLCBcInF1ZXN0aW9uc1wiXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFN1cnZleVRyaWdnZXJWaXNpYmxlKCk7IH0sIFwic3VydmV5dHJpZ2dlclwiKTtcclxuSnNvbk9iamVjdC5tZXRhRGF0YS5hZGRDbGFzcyhcImNvbXBsZXRldHJpZ2dlclwiLCBbXSwgZnVuY3Rpb24gKCkgeyByZXR1cm4gbmV3IFN1cnZleVRyaWdnZXJDb21wbGV0ZSgpOyB9LCBcInN1cnZleXRyaWdnZXJcIik7XHJcbkpzb25PYmplY3QubWV0YURhdGEuYWRkQ2xhc3MoXCJzZXR2YWx1ZXRyaWdnZXJcIiwgW1wiIXNldFRvTmFtZVwiLCBcInNldFZhbHVlXCIsIFwiaXNWYXJpYWJsZTpib29sZWFuXCJdLCBmdW5jdGlvbiAoKSB7IHJldHVybiBuZXcgU3VydmV5VHJpZ2dlclNldFZhbHVlKCk7IH0sIFwic3VydmV5dHJpZ2dlclwiKTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy90cmlnZ2VyLnRzXG4gKiovIiwiaW1wb3J0IHtCYXNlfSBmcm9tIFwiLi9iYXNlXCI7XHJcbmltcG9ydCB7U3VydmV5TW9kZWx9IGZyb20gXCIuL3N1cnZleVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN1cnZleVdpbmRvd01vZGVsIGV4dGVuZHMgQmFzZSAge1xyXG4gICAgcHVibGljIHN0YXRpYyBzdXJ2ZXlFbGVtZW50TmFtZSA9IFwid2luZG93U3VydmV5SlNcIjtcclxuICAgIHN1cnZleVZhbHVlOiBTdXJ2ZXlNb2RlbDtcclxuICAgIHdpbmRvd0VsZW1lbnQ6IEhUTUxEaXZFbGVtZW50O1xyXG4gICAgaXNTaG93aW5nVmFsdWU6IGJvb2xlYW47XHJcbiAgICBpc0V4cGFuZGVkVmFsdWU6IGJvb2xlYW47XHJcbiAgICB0aXRsZVZhbHVlOiBzdHJpbmc7XHJcbiAgICB0ZW1wbGF0ZVZhbHVlOiBzdHJpbmc7XHJcblxyXG4gICAgY29uc3RydWN0b3IoanNvbk9iajogYW55KSB7XHJcbiAgICAgICAgc3VwZXIoKTtcclxuICAgICAgICB0aGlzLnN1cnZleVZhbHVlID0gdGhpcy5jcmVhdGVTdXJ2ZXkoanNvbk9iaik7XHJcbiAgICAgICAgdGhpcy5zdXJ2ZXlWYWx1ZS5zaG93VGl0bGUgPSBmYWxzZTtcclxuICAgICAgICB0aGlzLndpbmRvd0VsZW1lbnQgPSA8SFRNTERpdkVsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRUeXBlKCkgOiBzdHJpbmcgeyByZXR1cm4gXCJ3aW5kb3dcIiB9XHJcbiAgICBwdWJsaWMgZ2V0IHN1cnZleSgpOiBTdXJ2ZXlNb2RlbCB7IHJldHVybiB0aGlzLnN1cnZleVZhbHVlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IGlzU2hvd2luZygpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaXNTaG93aW5nVmFsdWU7IH1cclxuICAgIHB1YmxpYyBnZXQgaXNFeHBhbmRlZCgpOiBib29sZWFuIHsgcmV0dXJuIHRoaXMuaXNFeHBhbmRlZFZhbHVlOyB9XHJcbiAgICBwdWJsaWMgZ2V0IHRpdGxlKCk6IHN0cmluZyB7IHJldHVybiB0aGlzLnRpdGxlVmFsdWUgPyB0aGlzLnRpdGxlVmFsdWUgOiB0aGlzLnN1cnZleS50aXRsZTsgfVxyXG4gICAgcHVibGljIHNldCB0aXRsZSh2YWx1ZTogc3RyaW5nKSB7IHRoaXMudGl0bGVWYWx1ZSA9IHZhbHVlOyB9XHJcbiAgICBwdWJsaWMgZXhwYW5kKCkge1xyXG4gICAgICAgIHRoaXMuZXhwYW5kY29sbGFwc2UodHJ1ZSk7XHJcbiAgICB9XHJcbiAgICBwdWJsaWMgY29sbGFwc2UoKSB7XHJcbiAgICAgICAgdGhpcy5leHBhbmRjb2xsYXBzZShmYWxzZSk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRlU3VydmV5KGpzb25PYmo6IGFueSk6IFN1cnZleU1vZGVsIHtcclxuICAgICAgICByZXR1cm4gbmV3IFN1cnZleU1vZGVsKGpzb25PYmopXHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgZXhwYW5kY29sbGFwc2UodmFsdWU6IGJvb2xlYW4pIHtcclxuICAgICAgICB0aGlzLmlzRXhwYW5kZWRWYWx1ZSA9IHZhbHVlO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvc3VydmV5V2luZG93LnRzXG4gKiovIiwiZXhwb3J0IHZhciBzdXJ2ZXlDc3MgPSB7XHJcbiAgICBjdXJyZW50VHlwZTogXCJcIixcclxuICAgIGdldENzczogZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIHZhciBsb2MgPSB0aGlzLmN1cnJlbnRUeXBlID8gdGhpc1t0aGlzLmN1cnJlbnRUeXBlXSA6IGRlZmF1bHRTdGFuZGFyZENzcztcclxuICAgICAgICBpZiAoIWxvYykgbG9jID0gZGVmYXVsdFN0YW5kYXJkQ3NzO1xyXG4gICAgICAgIHJldHVybiBsb2M7XHJcbiAgICB9LFxyXG59O1xyXG5cclxuZXhwb3J0IHZhciBkZWZhdWx0U3RhbmRhcmRDc3MgPSB7XHJcbiAgICByb290OiBcInN2X21haW5cIixcclxuICAgIGhlYWRlcjogXCJcIixcclxuICAgIGJvZHk6IFwic3ZfYm9keVwiLFxyXG4gICAgZm9vdGVyOiBcInN2X25hdlwiLFxyXG4gICAgbmF2aWdhdGlvbkJ1dHRvbjogXCJcIiwgbmF2aWdhdGlvbjogeyBjb21wbGV0ZTogXCJcIiwgcHJldjpcIlwiLCBuZXh0OiBcIlwifSxcclxuICAgIHByb2dyZXNzOiBcInN2X3Byb2dyZXNzXCIsIHByb2dyZXNzQmFyOiBcIlwiLFxyXG4gICAgcGFnZVRpdGxlOiBcInN2X3BfdGl0bGVcIixcclxuICAgIHJvdzogXCJzdl9yb3dcIixcclxuICAgIHF1ZXN0aW9uOiB7IHJvb3Q6IFwic3ZfcVwiLCB0aXRsZTogXCJzdl9xX3RpdGxlXCIsIGNvbW1lbnQ6IFwiXCIsIGluZGVudDogMjAgfSxcclxuICAgIGVycm9yOiB7IHJvb3Q6IFwic3ZfcV9lcmJveFwiLCBpY29uOiBcIlwiLCBpdGVtOiBcIlwiIH0sXHJcblxyXG4gICAgY2hlY2tib3g6IHsgcm9vdDogXCJzdl9xY2JjXCIsIGl0ZW06IFwic3ZfcV9jaGVja2JveFwiLCBvdGhlcjogXCJzdl9xX290aGVyXCIgfSxcclxuICAgIGNvbW1lbnQ6IFwiXCIsXHJcbiAgICBkcm9wZG93bjogXCJcIixcclxuICAgIG1hdHJpeDogeyByb290OiBcInN2X3FfbWF0cml4XCIgfSxcclxuICAgIG1hdHJpeGRyb3Bkb3duOiB7IHJvb3Q6IFwic3ZfcV9tYXRyaXhcIiB9LFxyXG4gICAgbWF0cml4ZHluYW1pYzogeyByb290OiBcInRhYmxlXCIsIGJ1dHRvbjogXCJcIiB9LFxyXG4gICAgbXVsdGlwbGV0ZXh0OiB7IHJvb3Q6IFwiXCIsIGl0ZW1UaXRsZTogXCJcIiwgaXRlbVZhbHVlOiBcIlwiIH0sXHJcbiAgICByYWRpb2dyb3VwOiB7IHJvb3Q6IFwic3ZfcWNiY1wiLCBpdGVtOiBcInN2X3FfcmFkaW9ncm91cFwiLCBvdGhlcjogXCJzdl9xX290aGVyXCIgfSxcclxuICAgIHJhdGluZzogeyByb290OiBcInN2X3FfcmF0aW5nXCIsIGl0ZW06IFwic3ZfcV9yYXRpbmdfaXRlbVwiIH0sXHJcbiAgICB0ZXh0OiBcIlwiLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgICAgcm9vdDogXCJzdl93aW5kb3dcIiwgYm9keTogXCJzdl93aW5kb3dfY29udGVudFwiLFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICByb290OiBcInN2X3dpbmRvd190aXRsZVwiLCB0aXRsZTogXCJcIiwgYnV0dG9uOiBcIlwiLCBidXR0b25FeHBhbmRlZDogXCJcIiwgYnV0dG9uQ29sbGFwc2VkOiBcIlwiXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59O1xyXG5cclxuc3VydmV5Q3NzW1wic3RhbmRhcmRcIl0gPSBkZWZhdWx0U3RhbmRhcmRDc3M7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVmYXVsdENzcy9jc3NzdGFuZGFyZC50c1xuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gXCJyZWFjdFwiO1xyXG5pbXBvcnQge1JlYWN0U3VydmV5TW9kZWx9IGZyb20gXCIuL3JlYWN0c3VydmV5bW9kZWxcIjtcclxuaW1wb3J0IHtTdXJ2ZXlQYWdlfSBmcm9tIFwiLi9yZWFjdHBhZ2VcIjtcclxuaW1wb3J0IHtTdXJ2ZXlOYXZpZ2F0aW9ufSBmcm9tIFwiLi9yZWFjdFN1cnZleU5hdmlnYXRpb25cIjtcclxuaW1wb3J0IHtRdWVzdGlvbkJhc2V9IGZyb20gXCIuLi9xdWVzdGlvbmJhc2VcIjtcclxuaW1wb3J0IHtJU3VydmV5Q3JlYXRvcn0gZnJvbSBcIi4vcmVhY3RxdWVzdGlvblwiO1xyXG5pbXBvcnQge1JlYWN0UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9yZWFjdHF1ZXN0aW9uZmFjdG9yeVwiO1xyXG5pbXBvcnQge3N1cnZleUNzc30gZnJvbSBcIi4uL2RlZmF1bHRDc3MvY3Nzc3RhbmRhcmRcIjtcclxuaW1wb3J0IHtTdXJ2ZXlQcm9ncmVzc30gZnJvbSBcIi4vcmVhY3RTdXJ2ZXlQcm9ncmVzc1wiO1xyXG5pbXBvcnQge1N1cnZleVBhZ2VJZH0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXkgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8YW55LCBhbnk+IGltcGxlbWVudHMgSVN1cnZleUNyZWF0b3Ige1xyXG4gICAgcHVibGljIHN0YXRpYyBnZXQgY3NzVHlwZSgpOiBzdHJpbmcgeyByZXR1cm4gc3VydmV5Q3NzLmN1cnJlbnRUeXBlOyB9XHJcbiAgICBwdWJsaWMgc3RhdGljIHNldCBjc3NUeXBlKHZhbHVlOiBzdHJpbmcpIHsgc3VydmV5Q3NzLmN1cnJlbnRUeXBlID0gdmFsdWU7IH1cclxuICAgIHByb3RlY3RlZCBzdXJ2ZXk6IFJlYWN0U3VydmV5TW9kZWw7XHJcbiAgICBwcml2YXRlIGlzQ3VycmVudFBhZ2VDaGFuZ2VkOiBib29sZWFuID0gZmFsc2U7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG5cclxuICAgICAgICB0aGlzLnVwZGF0ZVN1cnZleShwcm9wcyk7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogYW55KSB7XHJcbiAgICAgICAgdGhpcy51cGRhdGVTdXJ2ZXkobmV4dFByb3BzKTtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudERpZFVwZGF0ZSgpIHtcclxuICAgICAgICBpZiAodGhpcy5pc0N1cnJlbnRQYWdlQ2hhbmdlZCkge1xyXG4gICAgICAgICAgICB0aGlzLmlzQ3VycmVudFBhZ2VDaGFuZ2VkID0gZmFsc2U7XHJcbiAgICAgICAgICAgIHRoaXMuc3VydmV5LmZvY3VzRmlyc3RRdWVzdGlvbigpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgaWYgKHRoaXMuc3VydmV5LnN0YXRlID09IFwiY29tcGxldGVkXCIpIHJldHVybiB0aGlzLnJlbmRlckNvbXBsZXRlZCgpO1xyXG4gICAgICAgIGlmICh0aGlzLnN1cnZleS5zdGF0ZSA9PSBcImxvYWRpbmdcIikgcmV0dXJuIHRoaXMucmVuZGVyTG9hZGluZygpO1xyXG4gICAgICAgIHJldHVybiB0aGlzLnJlbmRlclN1cnZleSgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGdldCBjc3MoKTogYW55IHsgcmV0dXJuIHN1cnZleUNzcy5nZXRDc3MoKTsgfVxyXG4gICAgcHVibGljIHNldCBjc3ModmFsdWU6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc3VydmV5Lm1lcmdlQ3NzKHZhbHVlLCB0aGlzLmNzcyk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVuZGVyQ29tcGxldGVkKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICB2YXIgaHRtbFZhbHVlID0geyBfX2h0bWw6IHRoaXMuc3VydmV5LnByb2Nlc3NlZENvbXBsZXRlZEh0bWwgfTtcclxuICAgICAgICByZXR1cm4gKDxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2h0bWxWYWx1ZX0gLz4pO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJlbmRlckxvYWRpbmcoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIHZhciBodG1sVmFsdWUgPSB7IF9faHRtbDogdGhpcy5zdXJ2ZXkucHJvY2Vzc2VkTG9hZGluZ0h0bWwgfTtcclxuICAgICAgICByZXR1cm4gKDxkaXYgZGFuZ2Vyb3VzbHlTZXRJbm5lckhUTUw9e2h0bWxWYWx1ZX0gLz4pO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJlbmRlclN1cnZleSgpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgdmFyIHRpdGxlID0gdGhpcy5zdXJ2ZXkudGl0bGUgJiYgdGhpcy5zdXJ2ZXkuc2hvd1RpdGxlID8gdGhpcy5yZW5kZXJUaXRsZSgpIDogbnVsbDtcclxuICAgICAgICB2YXIgY3VycmVudFBhZ2UgPSB0aGlzLnN1cnZleS5jdXJyZW50UGFnZSA/IHRoaXMucmVuZGVyUGFnZSgpIDogbnVsbDtcclxuICAgICAgICB2YXIgdG9wUHJvZ3Jlc3MgPSB0aGlzLnN1cnZleS5zaG93UHJvZ3Jlc3NCYXIgPT0gXCJ0b3BcIiA/IHRoaXMucmVuZGVyUHJvZ3Jlc3ModHJ1ZSkgOiBudWxsO1xyXG4gICAgICAgIHZhciBib3R0b21Qcm9ncmVzcyA9IHRoaXMuc3VydmV5LnNob3dQcm9ncmVzc0JhciA9PSBcImJvdHRvbVwiID8gdGhpcy5yZW5kZXJQcm9ncmVzcyhmYWxzZSkgOiBudWxsO1xyXG4gICAgICAgIHZhciBidXR0b25zID0gKGN1cnJlbnRQYWdlICYmIHRoaXMuc3VydmV5LnNob3dOYXZpZ2F0aW9uQnV0dG9ucykgPyB0aGlzLnJlbmRlck5hdmlnYXRpb24oKSA6IG51bGw7XHJcbiAgICAgICAgaWYgKCFjdXJyZW50UGFnZSkge1xyXG4gICAgICAgICAgICBjdXJyZW50UGFnZSA9IHRoaXMucmVuZGVyRW1wdHlTdXJ2ZXkoKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuY3NzLnJvb3R9PlxyXG4gICAgICAgICAgICAgICAge3RpdGxlfVxyXG4gICAgICAgICAgICAgICAgPGRpdiBpZD17U3VydmV5UGFnZUlkfSBjbGFzc05hbWU9e3RoaXMuY3NzLmJvZHl9PlxyXG4gICAgICAgICAgICAgICAgICAgIHt0b3BQcm9ncmVzc31cclxuICAgICAgICAgICAgICAgICAgICB7Y3VycmVudFBhZ2V9XHJcbiAgICAgICAgICAgICAgICAgICAge2JvdHRvbVByb2dyZXNzfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgICAgICB7YnV0dG9uc31cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCByZW5kZXJUaXRsZSgpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmNzcy5oZWFkZXJ9PjxoMz57dGhpcy5zdXJ2ZXkudGl0bGV9PC9oMz48L2Rpdj47XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVuZGVyUGFnZSgpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIDxTdXJ2ZXlQYWdlIHN1cnZleT17dGhpcy5zdXJ2ZXl9IHBhZ2U9e3RoaXMuc3VydmV5LmN1cnJlbnRQYWdlfSBjc3M9e3RoaXMuY3NzfSBjcmVhdG9yPXt0aGlzfSAvPjtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCByZW5kZXJQcm9ncmVzcyhpc1RvcDogYm9vbGVhbik6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gPFN1cnZleVByb2dyZXNzIHN1cnZleT17dGhpcy5zdXJ2ZXl9IGNzcz17dGhpcy5jc3N9IGlzVG9wPXtpc1RvcH0gIC8+O1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJlbmRlck5hdmlnYXRpb24oKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiA8U3VydmV5TmF2aWdhdGlvbiBzdXJ2ZXkgPSB7dGhpcy5zdXJ2ZXl9IGNzcz17dGhpcy5jc3N9Lz47XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVuZGVyRW1wdHlTdXJ2ZXkoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiAoPHNwYW4+e3RoaXMuc3VydmV5LmVtcHR5U3VydmV5VGV4dH08L3NwYW4+KTtcclxuICAgIH1cclxuXHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlU3VydmV5KG5ld1Byb3BzOiBhbnkpIHtcclxuICAgICAgICBpZiAobmV3UHJvcHMpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1Byb3BzLm1vZGVsKSB7XHJcbiAgICAgICAgICAgICAgICB0aGlzLnN1cnZleSA9IG5ld1Byb3BzLm1vZGVsO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgaWYgKG5ld1Byb3BzLmpzb24pIHtcclxuICAgICAgICAgICAgICAgICAgICB0aGlzLnN1cnZleSA9IG5ldyBSZWFjdFN1cnZleU1vZGVsKG5ld1Byb3BzLmpzb24pO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgdGhpcy5zdXJ2ZXkgPSBuZXcgUmVhY3RTdXJ2ZXlNb2RlbCgpO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV3UHJvcHMpIHtcclxuICAgICAgICAgICAgaWYgKG5ld1Byb3BzLmNsaWVudElkKSB0aGlzLnN1cnZleS5jbGllbnRJZCA9IG5ld1Byb3BzLmNsaWVudElkO1xyXG4gICAgICAgICAgICBpZiAobmV3UHJvcHMuZGF0YSkgdGhpcy5zdXJ2ZXkuZGF0YSA9IG5ld1Byb3BzLmRhdGE7XHJcbiAgICAgICAgICAgIGlmIChuZXdQcm9wcy5jc3MpIHRoaXMuc3VydmV5Lm1lcmdlQ3NzKG5ld1Byb3BzLmNzcywgdGhpcy5jc3MpO1xyXG4gICAgICAgIH1cclxuXHJcbiAgICAgICAgLy9zZXQgdGhlIGZpcnN0IHBhZ2VcclxuICAgICAgICB2YXIgZHVtbXkgPSB0aGlzLnN1cnZleS5jdXJyZW50UGFnZTtcclxuXHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgcGFnZUluZGV4Q2hhbmdlOiAwLCBpc0NvbXBsZXRlZDogZmFsc2UsIG1vZGVsQ2hhbmdlZDogMCB9O1xyXG4gICAgICAgIHRoaXMuc2V0U3VydmV5RXZlbnRzKG5ld1Byb3BzKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBzZXRTdXJ2ZXlFdmVudHMobmV3UHJvcHM6IGFueSkge1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLnN1cnZleS5yZW5kZXJDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5zdGF0ZS5tb2RlbENoYW5nZWQgPSBzZWxmLnN0YXRlLm1vZGVsQ2hhbmdlZCArIDE7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoc2VsZi5zdGF0ZSk7XHJcbiAgICAgICAgfTtcclxuICAgICAgICB0aGlzLnN1cnZleS5vbkNvbXBsZXRlLmFkZCgoc2VuZGVyKSA9PiB7IHNlbGYuc3RhdGUuaXNDb21wbGV0ZWQgPSB0cnVlOyBzZWxmLnNldFN0YXRlKHNlbGYuc3RhdGUpOyB9KTtcclxuICAgICAgICB0aGlzLnN1cnZleS5vbkN1cnJlbnRQYWdlQ2hhbmdlZC5hZGQoKHNlbmRlciwgb3B0aW9ucykgPT4ge1xyXG4gICAgICAgICAgICBzZWxmLmlzQ3VycmVudFBhZ2VDaGFuZ2VkID0gdHJ1ZTtcclxuICAgICAgICAgICAgc2VsZi5zdGF0ZS5wYWdlSW5kZXhDaGFuZ2UgPSBzZWxmLnN0YXRlLnBhZ2VJbmRleENoYW5nZSArIDE7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoc2VsZi5zdGF0ZSk7XHJcbiAgICAgICAgICAgIGlmIChuZXdQcm9wcyAmJiBuZXdQcm9wcy5vbkN1cnJlbnRQYWdlQ2hhbmdlZCkgbmV3UHJvcHMub25DdXJyZW50UGFnZUNoYW5nZWQoc2VuZGVyLCBvcHRpb25zKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnN1cnZleS5vblZpc2libGVDaGFuZ2VkLmFkZCgoc2VuZGVyLCBvcHRpb25zKSA9PiB7XHJcbiAgICAgICAgICAgIGlmIChvcHRpb25zLnF1ZXN0aW9uICYmIG9wdGlvbnMucXVlc3Rpb24ucmVhY3QpIHtcclxuICAgICAgICAgICAgICAgIHZhciBzdGF0ZSA9IG9wdGlvbnMucXVlc3Rpb24ucmVhY3Quc3RhdGU7XHJcbiAgICAgICAgICAgICAgICBzdGF0ZS52aXNpYmxlID0gb3B0aW9ucy5xdWVzdGlvbi52aXNpYmxlO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5xdWVzdGlvbi5yZWFjdC5zZXRTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICB0aGlzLnN1cnZleS5vblZhbHVlQ2hhbmdlZC5hZGQoKHNlbmRlciwgb3B0aW9ucykgPT4ge1xyXG4gICAgICAgICAgICBpZiAob3B0aW9ucy5xdWVzdGlvbiAmJiBvcHRpb25zLnF1ZXN0aW9uLnJlYWN0KSB7XHJcbiAgICAgICAgICAgICAgICB2YXIgc3RhdGUgPSBvcHRpb25zLnF1ZXN0aW9uLnJlYWN0LnN0YXRlO1xyXG4gICAgICAgICAgICAgICAgc3RhdGUudmFsdWUgPSBvcHRpb25zLnZhbHVlO1xyXG4gICAgICAgICAgICAgICAgb3B0aW9ucy5xdWVzdGlvbi5yZWFjdC5zZXRTdGF0ZShzdGF0ZSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAoIW5ld1Byb3BzKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5zdXJ2ZXkub25WYWx1ZUNoYW5nZWQuYWRkKChzZW5kZXIsIG9wdGlvbnMpID0+IHtcclxuICAgICAgICAgICAgaWYgKG5ld1Byb3BzLmRhdGEpIG5ld1Byb3BzLmRhdGFbb3B0aW9ucy5uYW1lXSA9IG9wdGlvbnMudmFsdWU7XHJcbiAgICAgICAgICAgIGlmIChuZXdQcm9wcy5vblZhbHVlQ2hhbmdlZCkgbmV3UHJvcHMub25WYWx1ZUNoYW5nZWQoc2VuZGVyLCBvcHRpb25zKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICBpZiAobmV3UHJvcHMub25Db21wbGV0ZSkge1xyXG4gICAgICAgICAgICB0aGlzLnN1cnZleS5vbkNvbXBsZXRlLmFkZCgoc2VuZGVyKSA9PiB7IG5ld1Byb3BzLm9uQ29tcGxldGUoc2VuZGVyKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHRoaXMuc3VydmV5Lm9uUGFnZVZpc2libGVDaGFuZ2VkLmFkZCgoc2VuZGVyLCBvcHRpb25zKSA9PiB7IGlmIChuZXdQcm9wcy5vblBhZ2VWaXNpYmxlQ2hhbmdlZCkgbmV3UHJvcHMub25QYWdlVmlzaWJsZUNoYW5nZWQoc2VuZGVyLCBvcHRpb25zKTsgfSk7XHJcbiAgICAgICAgaWYgKG5ld1Byb3BzLm9uUXVlc3Rpb25BZGRlZCkge1xyXG4gICAgICAgICAgICB0aGlzLnN1cnZleS5vblF1ZXN0aW9uQWRkZWQuYWRkKChzZW5kZXIsIG9wdGlvbnMpID0+IHsgbmV3UHJvcHMub25RdWVzdGlvbkFkZGVkKHNlbmRlciwgb3B0aW9ucyk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV3UHJvcHMub25RdWVzdGlvblJlbW92ZWQpIHtcclxuICAgICAgICAgICAgdGhpcy5zdXJ2ZXkub25RdWVzdGlvblJlbW92ZWQuYWRkKChzZW5kZXIsIG9wdGlvbnMpID0+IHsgbmV3UHJvcHMub25RdWVzdGlvblJlbW92ZWQoc2VuZGVyLCBvcHRpb25zKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXdQcm9wcy5vblZhbGlkYXRlUXVlc3Rpb24pIHtcclxuICAgICAgICAgICAgdGhpcy5zdXJ2ZXkub25WYWxpZGF0ZVF1ZXN0aW9uLmFkZCgoc2VuZGVyLCBvcHRpb25zKSA9PiB7IG5ld1Byb3BzLm9uVmFsaWRhdGVRdWVzdGlvbihzZW5kZXIsIG9wdGlvbnMpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5ld1Byb3BzLm9uU2VydmVyVmFsaWRhdGVRdWVzdGlvbnMpIHtcclxuICAgICAgICAgICAgdGhpcy5zdXJ2ZXkub25TZXJ2ZXJWYWxpZGF0ZVF1ZXN0aW9ucyA9IG5ld1Byb3BzLm9uU2VydmVyVmFsaWRhdGVRdWVzdGlvbnM7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmIChuZXdQcm9wcy5vblNlbmRSZXN1bHQpIHtcclxuICAgICAgICAgICAgdGhpcy5zdXJ2ZXkub25TZW5kUmVzdWx0LmFkZCgoc2VuZGVyLCBvcHRpb25zKSA9PiB7IG5ld1Byb3BzLm9uU2VuZFJlc3VsdChzZW5kZXIsIG9wdGlvbnMpOyB9KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYgKG5ld1Byb3BzLm9uR2V0UmVzdWx0KSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VydmV5Lm9uR2V0UmVzdWx0LmFkZCgoc2VuZGVyLCBvcHRpb25zKSA9PiB7IG5ld1Byb3BzLm9uR2V0UmVzdWx0KHNlbmRlciwgb3B0aW9ucyk7IH0pO1xyXG4gICAgICAgIH1cclxuICAgICAgICBpZiAobmV3UHJvcHMub25Qcm9jZXNzSHRtbCkge1xyXG4gICAgICAgICAgICB0aGlzLnN1cnZleS5vblByb2Nlc3NIdG1sLmFkZCgoc2VuZGVyLCBvcHRpb25zKSA9PiB7IG5ld1Byb3BzLm9uUHJvY2Vzc0h0bWwoc2VuZGVyLCBvcHRpb25zKTsgfSk7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIC8vSVN1cnZleUNyZWF0b3JcclxuICAgIHB1YmxpYyBjcmVhdGVRdWVzdGlvbkVsZW1lbnQocXVlc3Rpb246IFF1ZXN0aW9uQmFzZSk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICB2YXIgcXVlc3Rpb25Dc3MgPSB0aGlzLmNzc1txdWVzdGlvbi5nZXRUeXBlKCldO1xyXG4gICAgICAgIHJldHVybiBSZWFjdFF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5jcmVhdGVRdWVzdGlvbihxdWVzdGlvbi5nZXRUeXBlKCksIHtcclxuICAgICAgICAgICAgcXVlc3Rpb246IHF1ZXN0aW9uLCBjc3M6IHF1ZXN0aW9uQ3NzLCByb290Q3NzOiB0aGlzLmNzcywgY3JlYXRvcjogdGhpc1xyXG4gICAgICAgIH0pO1xyXG4gICAgfVxyXG4gICAgcHVibGljIHJlbmRlckVycm9yKGtleTogc3RyaW5nLCBlcnJvclRleHQ6IHN0cmluZyk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gPGRpdiBrZXk9e2tleX0gY2xhc3NOYW1lPXt0aGlzLmNzcy5lcnJvci5pdGVtfT57ZXJyb3JUZXh0fTwvZGl2PjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBxdWVzdGlvblRpdGxlTG9jYXRpb24oKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuc3VydmV5LnF1ZXN0aW9uVGl0bGVMb2NhdGlvbjsgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVhY3QvcmVhY3RTdXJ2ZXkudHN4XG4gKiovIiwibW9kdWxlLmV4cG9ydHMgPSBfX1dFQlBBQ0tfRVhURVJOQUxfTU9EVUxFXzM2X187XG5cblxuLyoqKioqKioqKioqKioqKioqXG4gKiogV0VCUEFDSyBGT09URVJcbiAqKiBleHRlcm5hbCB7XCJyb290XCI6XCJSZWFjdFwiLFwiY29tbW9uanMyXCI6XCJyZWFjdFwiLFwiY29tbW9uanNcIjpcInJlYWN0XCIsXCJhbWRcIjpcInJlYWN0XCJ9XG4gKiogbW9kdWxlIGlkID0gMzZcbiAqKiBtb2R1bGUgY2h1bmtzID0gMFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtTdXJ2ZXlNb2RlbH0gZnJvbSBcIi4uL3N1cnZleVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFJlYWN0U3VydmV5TW9kZWwgZXh0ZW5kcyBTdXJ2ZXlNb2RlbCB7XHJcbiAgICByZW5kZXJDYWxsYmFjazogKCkgPT4gdm9pZDtcclxuICAgIGNvbnN0cnVjdG9yKGpzb25PYmo6IGFueSA9IG51bGwpIHtcclxuICAgICAgICBzdXBlcihqc29uT2JqKTtcclxuICAgIH1cclxuICAgIHB1YmxpYyByZW5kZXIoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucmVuZGVyQ2FsbGJhY2spIHtcclxuICAgICAgICAgICAgdGhpcy5yZW5kZXJDYWxsYmFjaygpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHB1YmxpYyBtZXJnZUNzcyhzcmM6IGFueSwgZGVzdDogYW55KSB7XHJcbiAgICAgICAgdGhpcy5tZXJnZVZhbHVlcyhzcmMsIGRlc3QpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIG9uTG9hZFN1cnZleUZyb21TZXJ2aWNlKCkge1xyXG4gICAgICAgIHRoaXMucmVuZGVyKCk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgb25Mb2FkaW5nU3VydmV5RnJvbVNlcnZpY2UoKSB7XHJcbiAgICAgICAgdGhpcy5yZW5kZXIoKTtcclxuICAgIH1cclxufVxyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZWFjdC9yZWFjdHN1cnZleW1vZGVsLnRzeFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtTdXJ2ZXlRdWVzdGlvbn0gZnJvbSAnLi9yZWFjdHF1ZXN0aW9uJ1xyXG5pbXBvcnQge1BhZ2VNb2RlbH0gZnJvbSBcIi4uL3BhZ2VcIjtcclxuaW1wb3J0IHtTdXJ2ZXlNb2RlbH0gZnJvbSBcIi4uL3N1cnZleVwiO1xyXG5pbXBvcnQge0lTdXJ2ZXlDcmVhdG9yfSBmcm9tIFwiLi9yZWFjdHF1ZXN0aW9uXCI7XHJcbmltcG9ydCB7UXVlc3Rpb25Sb3dNb2RlbH0gZnJvbSBcIi4uL3BhZ2VcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkJhc2V9IGZyb20gXCIuLi9xdWVzdGlvbmJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlQYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PGFueSwgYW55PiB7XHJcbiAgICBwcml2YXRlIHBhZ2U6IFBhZ2VNb2RlbDtcclxuICAgIHByaXZhdGUgc3VydmV5OiBTdXJ2ZXlNb2RlbDtcclxuICAgIHByaXZhdGUgY3JlYXRvcjogSVN1cnZleUNyZWF0b3I7XHJcbiAgICBwcm90ZWN0ZWQgY3NzOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMucGFnZSA9IHByb3BzLnBhZ2U7XHJcbiAgICAgICAgdGhpcy5zdXJ2ZXkgPSBwcm9wcy5zdXJ2ZXk7XHJcbiAgICAgICAgdGhpcy5jcmVhdG9yID0gcHJvcHMuY3JlYXRvcjtcclxuICAgICAgICB0aGlzLmNzcyA9IHByb3BzLmNzcztcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnBhZ2UgPSBuZXh0UHJvcHMucGFnZTtcclxuICAgICAgICB0aGlzLnN1cnZleSA9IG5leHRQcm9wcy5zdXJ2ZXk7XHJcbiAgICAgICAgdGhpcy5jcmVhdG9yID0gbmV4dFByb3BzLmNyZWF0b3I7XHJcbiAgICAgICAgdGhpcy5jc3MgPSBuZXh0UHJvcHMuY3NzO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICBpZiAodGhpcy5wYWdlID09IG51bGwgfHwgdGhpcy5zdXJ2ZXkgPT0gbnVsbCB8fCB0aGlzLmNyZWF0b3IgPT0gbnVsbCkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgdmFyIHRpdGxlID0gdGhpcy5yZW5kZXJUaXRsZSgpO1xyXG4gICAgICAgIHZhciByb3dzID0gW107XHJcbiAgICAgICAgdmFyIHF1ZXN0aW9uUm93cyA9IHRoaXMucGFnZS5yb3dzO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgcXVlc3Rpb25Sb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHJvd3MucHVzaCh0aGlzLmNyZWF0ZVJvdyhxdWVzdGlvblJvd3NbaV0sIGkpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdj5cclxuICAgICAgICAgICAgICAgIHt0aXRsZX1cclxuICAgICAgICAgICAgICAgIHtyb3dzfVxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBjcmVhdGVSb3cocm93OiBRdWVzdGlvblJvd01vZGVsLCBpbmRleDogbnVtYmVyKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIHZhciByb3dOYW1lID0gXCJyb3dcIiArIChpbmRleCArIDEpO1xyXG4gICAgICAgIHJldHVybiA8U3VydmV5Um93IGtleT17cm93TmFtZX0gcm93PXtyb3d9IHN1cnZleT17dGhpcy5zdXJ2ZXl9IGNyZWF0b3I9e3RoaXMuY3JlYXRvcn0gY3NzPXt0aGlzLmNzc30gLz47XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVuZGVyVGl0bGUoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIGlmICghdGhpcy5wYWdlLnRpdGxlIHx8ICF0aGlzLnN1cnZleS5zaG93UGFnZVRpdGxlcykgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgdmFyIHRleHQgPSB0aGlzLnBhZ2UucHJvY2Vzc2VkVGl0bGU7XHJcbiAgICAgICAgaWYgKHRoaXMucGFnZS5udW0gPiAwKSB7XHJcbiAgICAgICAgICAgIHRleHQgPSB0aGlzLnBhZ2UubnVtICsgXCIuIFwiICsgdGV4dDtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICg8aDQgY2xhc3NOYW1lPXt0aGlzLmNzcy5wYWdlVGl0bGV9Pnt0ZXh0fTwvaDQ+KTtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN1cnZleVJvdyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIGFueT4ge1xyXG4gICAgcHJpdmF0ZSByb3c6IFF1ZXN0aW9uUm93TW9kZWw7XHJcbiAgICBwcml2YXRlIHN1cnZleTogU3VydmV5TW9kZWw7XHJcbiAgICBwcml2YXRlIGNyZWF0b3I6IElTdXJ2ZXlDcmVhdG9yO1xyXG4gICAgcHJvdGVjdGVkIGNzczogYW55O1xyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMocHJvcHMpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhuZXh0UHJvcHMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzZXRQcm9wZXJ0aWVzKHByb3BzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnJvdyA9IHByb3BzLnJvdztcclxuICAgICAgICBpZiAodGhpcy5yb3cpIHtcclxuICAgICAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgICAgICB0aGlzLnJvdy52aXNpYmlsaXR5Q2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkgeyBzZWxmLnNldFN0YXRlKHsgdmlzaWJsZTogc2VsZi5yb3cudmlzaWJsZSB9KTsgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN1cnZleSA9IHByb3BzLnN1cnZleTtcclxuICAgICAgICB0aGlzLmNyZWF0b3IgPSBwcm9wcy5jcmVhdG9yO1xyXG4gICAgICAgIHRoaXMuY3NzID0gcHJvcHMuY3NzO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICBpZiAodGhpcy5yb3cgPT0gbnVsbCB8fCB0aGlzLnN1cnZleSA9PSBudWxsIHx8IHRoaXMuY3JlYXRvciA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICBpZiAoIXRoaXMucm93LnZpc2libGUpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciBxdWVzdGlvbnMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucm93LnF1ZXN0aW9ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgcXVlc3Rpb24gPSB0aGlzLnJvdy5xdWVzdGlvbnNbaV07XHJcbiAgICAgICAgICAgIHF1ZXN0aW9ucy5wdXNoKHRoaXMuY3JlYXRlUXVlc3Rpb24ocXVlc3Rpb24pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuY3NzLnJvd30+XHJcbiAgICAgICAgICAgICAgICB7cXVlc3Rpb25zfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGNyZWF0ZVF1ZXN0aW9uKHF1ZXN0aW9uOiBRdWVzdGlvbkJhc2UpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIDxTdXJ2ZXlRdWVzdGlvbiBrZXk9e3F1ZXN0aW9uLm5hbWV9IHF1ZXN0aW9uPXtxdWVzdGlvbn0gY3JlYXRvcj17dGhpcy5jcmVhdG9yfSBjc3M9e3RoaXMuY3NzfSAvPjtcclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JlYWN0L3JlYWN0cGFnZS50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7UXVlc3Rpb25CYXNlfSBmcm9tICcuLi9xdWVzdGlvbmJhc2UnO1xyXG5pbXBvcnQge1F1ZXN0aW9ufSBmcm9tICcuLi9xdWVzdGlvbic7XHJcbmltcG9ydCB7U3VydmV5UXVlc3Rpb25Db21tZW50SXRlbX0gZnJvbSAnLi9yZWFjdHF1ZXN0aW9uY29tbWVudCc7XHJcblxyXG5leHBvcnQgaW50ZXJmYWNlIElTdXJ2ZXlDcmVhdG9yIHtcclxuICAgIGNyZWF0ZVF1ZXN0aW9uRWxlbWVudChxdWVzdGlvbjogUXVlc3Rpb25CYXNlKTogSlNYLkVsZW1lbnQ7XHJcbiAgICByZW5kZXJFcnJvcihrZXk6IHN0cmluZywgZXJyb3JUZXh0OiBzdHJpbmcpOiBKU1guRWxlbWVudDtcclxuICAgIHF1ZXN0aW9uVGl0bGVMb2NhdGlvbigpOiBzdHJpbmc7XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlRdWVzdGlvbiBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIGFueT4ge1xyXG4gICAgcHJpdmF0ZSBxdWVzdGlvbkJhc2U6IFF1ZXN0aW9uQmFzZTtcclxuICAgIHByb3RlY3RlZCBxdWVzdGlvbjogUXVlc3Rpb247XHJcbiAgICBwcml2YXRlIGNyZWF0b3I6IElTdXJ2ZXlDcmVhdG9yO1xyXG4gICAgcHJvdGVjdGVkIGNzczogYW55O1xyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnNldFF1ZXN0aW9uKHByb3BzLnF1ZXN0aW9uKTtcclxuICAgICAgICB0aGlzLmNyZWF0b3IgPSBwcm9wcy5jcmVhdG9yO1xyXG4gICAgICAgIHRoaXMuY3NzID0gcHJvcHMuY3NzO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRvciA9IG5leHRQcm9wcy5jcmVhdG9yO1xyXG4gICAgICAgIHRoaXMuY3NzID0gbmV4dFByb3BzLmNzcztcclxuICAgICAgICB0aGlzLnNldFF1ZXN0aW9uKG5leHRQcm9wcy5xdWVzdGlvbik7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNldFF1ZXN0aW9uKHF1ZXN0aW9uKSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbkJhc2UgPSBxdWVzdGlvbjtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uID0gcXVlc3Rpb24gaW5zdGFuY2VvZiBRdWVzdGlvbiA/IHF1ZXN0aW9uIDogbnVsbDtcclxuICAgICAgICB2YXIgdmFsdWUgPSB0aGlzLnF1ZXN0aW9uID8gdGhpcy5xdWVzdGlvbi52YWx1ZSA6IG51bGw7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgXHJcbiAgICAgICAgICAgIHZpc2libGU6IHRoaXMucXVlc3Rpb25CYXNlLnZpc2libGUsIHZhbHVlOiB2YWx1ZSwgZXJyb3I6IDAsIHJlbmRlcldpZHRoOiAwLFxyXG4gICAgICAgICAgICB2aXNpYmxlSW5kZXhWYWx1ZTogLTFcclxuICAgICAgICB9O1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50RGlkTW91bnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucXVlc3Rpb25CYXNlKSB7XHJcbiAgICAgICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICAgICAgdGhpcy5xdWVzdGlvbkJhc2VbXCJyZWFjdFwiXSA9IHNlbGY7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25CYXNlLnJlbmRlcldpZHRoQ2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zdGF0ZS5yZW5kZXJXaWR0aCA9IHNlbGYuc3RhdGUucmVuZGVyV2lkdGggKyAxO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZShzZWxmLnN0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uQmFzZS52aXNpYmxlSW5kZXhDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUudmlzaWJsZUluZGV4VmFsdWUgPSBzZWxmLnF1ZXN0aW9uQmFzZS52aXNpYmxlSW5kZXg7XHJcbiAgICAgICAgICAgICAgICBzZWxmLnNldFN0YXRlKHNlbGYuc3RhdGUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFVubW91bnQoKSB7XHJcbiAgICAgICAgaWYgKHRoaXMucXVlc3Rpb25CYXNlKSB7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25CYXNlW1wicmVhY3RcIl0gPSBudWxsO1xyXG4gICAgICAgICAgICB0aGlzLnF1ZXN0aW9uQmFzZS5yZW5kZXJXaWR0aENoYW5nZWRDYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb25CYXNlLnZpc2libGVJbmRleENoYW5nZWRDYWxsYmFjayA9IG51bGw7XHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICBpZiAoIXRoaXMucXVlc3Rpb25CYXNlIHx8ICF0aGlzLmNyZWF0b3IpIHJldHVybiBudWxsO1xyXG4gICAgICAgIGlmICghdGhpcy5xdWVzdGlvbkJhc2UudmlzaWJsZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgdmFyIHF1ZXN0aW9uUmVuZGVyID0gdGhpcy5jcmVhdG9yLmNyZWF0ZVF1ZXN0aW9uRWxlbWVudCh0aGlzLnF1ZXN0aW9uQmFzZSk7XHJcbiAgICAgICAgdmFyIHRpdGxlID0gdGhpcy5xdWVzdGlvbkJhc2UuaGFzVGl0bGUgPyB0aGlzLnJlbmRlclRpdGxlKCkgOiBudWxsO1xyXG4gICAgICAgIHZhciB0aXRsZVRvcCA9IHRoaXMuY3JlYXRvci5xdWVzdGlvblRpdGxlTG9jYXRpb24oKSA9PSBcInRvcFwiID8gdGl0bGUgOiBudWxsO1xyXG4gICAgICAgIHZhciB0aXRsZUJvdHRvbSA9IHRoaXMuY3JlYXRvci5xdWVzdGlvblRpdGxlTG9jYXRpb24oKSA9PSBcImJvdHRvbVwiID8gdGl0bGUgOiBudWxsO1xyXG4gICAgICAgIHZhciBjb21tZW50ID0gKHRoaXMucXVlc3Rpb24gJiYgdGhpcy5xdWVzdGlvbi5oYXNDb21tZW50KSA/IHRoaXMucmVuZGVyQ29tbWVudCgpIDogbnVsbDtcclxuICAgICAgICB2YXIgZXJyb3JzID0gdGhpcy5yZW5kZXJFcnJvcnMoKTtcclxuICAgICAgICB2YXIgbWFyZ2luTGVmdCA9ICh0aGlzLnF1ZXN0aW9uQmFzZS5pbmRlbnQgPiAwKSA/IHRoaXMucXVlc3Rpb25CYXNlLmluZGVudCAqIHRoaXMuY3NzLnF1ZXN0aW9uLmluZGVudCArIFwicHhcIiA6IG51bGw7XHJcbiAgICAgICAgdmFyIHBhZGRpbmdSaWdodCA9ICh0aGlzLnF1ZXN0aW9uQmFzZS5yaWdodEluZGVudCA+IDApID8gdGhpcy5xdWVzdGlvbkJhc2UucmlnaHRJbmRlbnQgKiB0aGlzLmNzcy5xdWVzdGlvbi5pbmRlbnQgKyBcInB4XCIgOiBudWxsO1xyXG4gICAgICAgIHZhciByb290U3R5bGUgPSB7IGRpc3BsYXk6ICdpbmxpbmUtYmxvY2snLCB2ZXJ0aWNhbEFsaWduOiAndG9wJyB9O1xyXG4gICAgICAgIGlmICh0aGlzLnF1ZXN0aW9uQmFzZS5yZW5kZXJXaWR0aCkgcm9vdFN0eWxlW1wid2lkdGhcIl0gPSB0aGlzLnF1ZXN0aW9uQmFzZS5yZW5kZXJXaWR0aDtcclxuICAgICAgICBpZiAobWFyZ2luTGVmdCkgcm9vdFN0eWxlW1wibWFyZ2luTGVmdFwiXSA9IG1hcmdpbkxlZnQ7XHJcbiAgICAgICAgaWYgKHBhZGRpbmdSaWdodCkgcm9vdFN0eWxlW1wicGFkZGluZ1JpZ2h0XCJdID0gcGFkZGluZ1JpZ2h0O1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXYgaWQ9e3RoaXMucXVlc3Rpb25CYXNlLmlkfSBjbGFzc05hbWU9e3RoaXMuY3NzLnF1ZXN0aW9uLnJvb3R9IHN0eWxlPXtyb290U3R5bGV9PlxyXG4gICAgICAgICAgICAgICAge3RpdGxlVG9wfVxyXG4gICAgICAgICAgICAgICAge2Vycm9yc31cclxuICAgICAgICAgICAgICAgIHtxdWVzdGlvblJlbmRlcn1cclxuICAgICAgICAgICAgICAgIHtjb21tZW50fVxyXG4gICAgICAgICAgICAgICAge3RpdGxlQm90dG9tfVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJlbmRlclRpdGxlKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICB2YXIgdGl0bGVUZXh0ID0gdGhpcy5xdWVzdGlvbi5mdWxsVGl0bGU7XHJcbiAgICAgICAgcmV0dXJuICg8aDUgY2xhc3NOYW1lPXt0aGlzLmNzcy5xdWVzdGlvbi50aXRsZX0+e3RpdGxlVGV4dH08L2g1Pik7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVuZGVyQ29tbWVudCgpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuICg8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdj57dGhpcy5xdWVzdGlvbi5jb21tZW50VGV4dH08L2Rpdj5cclxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmNzcy5xdWVzdGlvbi5jb21tZW50fT5cclxuICAgICAgICAgICAgICAgIDxTdXJ2ZXlRdWVzdGlvbkNvbW1lbnRJdGVtICBxdWVzdGlvbj17dGhpcy5xdWVzdGlvbn0vPlxyXG4gICAgICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgICAgIDwvZGl2Pik7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVuZGVyRXJyb3JzKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gPFN1cnZleVF1ZXN0aW9uRXJyb3JzIHF1ZXN0aW9uPXt0aGlzLnF1ZXN0aW9ufSBjc3M9e3RoaXMuY3NzfSBjcmVhdG9yPXt0aGlzLmNyZWF0b3J9IC8+XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlRdWVzdGlvbkVycm9ycyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIGFueT4ge1xyXG4gICAgcHJvdGVjdGVkIHF1ZXN0aW9uOiBRdWVzdGlvbjtcclxuICAgIHByaXZhdGUgY3JlYXRvcjogSVN1cnZleUNyZWF0b3I7XHJcbiAgICBwcm90ZWN0ZWQgY3NzOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc2V0UXVlc3Rpb24ocHJvcHMucXVlc3Rpb24pO1xyXG4gICAgICAgIHRoaXMuY3JlYXRvciA9IHByb3BzLmNyZWF0b3I7XHJcbiAgICAgICAgdGhpcy5jc3MgPSBwcm9wcy5jc3M7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXRRdWVzdGlvbihuZXh0UHJvcHMucXVlc3Rpb24pO1xyXG4gICAgICAgIHRoaXMuY3JlYXRvciA9IG5leHRQcm9wcy5jcmVhdG9yO1xyXG4gICAgICAgIHRoaXMuY3NzID0gbmV4dFByb3BzLmNzcztcclxuICAgIH1cclxuICAgIHByaXZhdGUgc2V0UXVlc3Rpb24ocXVlc3Rpb24pIHtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uID0gcXVlc3Rpb24gaW5zdGFuY2VvZiBRdWVzdGlvbiA/IHF1ZXN0aW9uIDogbnVsbDtcclxuICAgICAgICBpZiAodGhpcy5xdWVzdGlvbikge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMucXVlc3Rpb24uZXJyb3JzQ2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zdGF0ZS5lcnJvciA9IHNlbGYuc3RhdGUuZXJyb3IgKyAxO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZShzZWxmLnN0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICB0aGlzLnN0YXRlID0geyBlcnJvcjogMCB9O1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICBpZiAoIXRoaXMucXVlc3Rpb24gfHwgdGhpcy5xdWVzdGlvbi5lcnJvcnMubGVuZ3RoID09IDApIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciBlcnJvcnMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlc3Rpb24uZXJyb3JzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBlcnJvclRleHQgPSB0aGlzLnF1ZXN0aW9uLmVycm9yc1tpXS5nZXRUZXh0KCk7XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBcImVycm9yXCIgKyBpO1xyXG4gICAgICAgICAgICBlcnJvcnMucHVzaCh0aGlzLmNyZWF0b3IucmVuZGVyRXJyb3Ioa2V5LCBlcnJvclRleHQpKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT17dGhpcy5jc3MuZXJyb3Iucm9vdH0+e2Vycm9yc308L2Rpdj4pO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVhY3QvcmVhY3RxdWVzdGlvbi50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7UXVlc3Rpb25Db21tZW50TW9kZWx9IGZyb20gXCIuLi9xdWVzdGlvbl9jb21tZW50XCI7XHJcbmltcG9ydCB7UXVlc3Rpb259IGZyb20gXCIuLi9xdWVzdGlvblwiO1xyXG5pbXBvcnQge1JlYWN0UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9yZWFjdHF1ZXN0aW9uZmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN1cnZleVF1ZXN0aW9uQ29tbWVudCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIGFueT4ge1xyXG4gICAgcHJpdmF0ZSBxdWVzdGlvbjogUXVlc3Rpb25Db21tZW50TW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgY3NzOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSBwcm9wcy5xdWVzdGlvbjtcclxuICAgICAgICB0aGlzLmNzcyA9IHByb3BzLmNzcztcclxuICAgICAgICB0aGlzLnN0YXRlID0geyB2YWx1ZTogdGhpcy5xdWVzdGlvbi52YWx1ZSB9O1xyXG4gICAgICAgIHRoaXMuaGFuZGxlT25DaGFuZ2UgPSB0aGlzLmhhbmRsZU9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVPbkNoYW5nZShldmVudCkge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24udmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiB0aGlzLnF1ZXN0aW9uLnZhbHVlIH0pO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IGFueSkge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSBuZXh0UHJvcHMucXVlc3Rpb247XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIGlmICghdGhpcy5xdWVzdGlvbikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRleHRhcmVhIGlkPXt0aGlzLnF1ZXN0aW9uLmlucHV0SWR9IGNsYXNzTmFtZT17dGhpcy5jc3N9IHR5cGU9XCJ0ZXh0XCIgdmFsdWU9e3RoaXMuc3RhdGUudmFsdWV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZU9uQ2hhbmdlfSBjb2xzPXt0aGlzLnF1ZXN0aW9uLmNvbHN9IHJvd3M9e3RoaXMucXVlc3Rpb24ucm93c30gLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3VydmV5UXVlc3Rpb25Db21tZW50SXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIGFueT4ge1xyXG4gICAgcHJpdmF0ZSBxdWVzdGlvbjogUXVlc3Rpb247XHJcbiAgICBwcml2YXRlIGNvbW1lbnQ6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBjc3M6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbiA9IHByb3BzLnF1ZXN0aW9uO1xyXG4gICAgICAgIHRoaXMuY3NzID0gcHJvcHMuY3NzO1xyXG4gICAgICAgIHRoaXMuY29tbWVudCA9IHRoaXMucXVlc3Rpb24uY29tbWVudDtcclxuICAgICAgICB0aGlzLnN0YXRlID0geyB2YWx1ZTogdGhpcy5jb21tZW50IH07XHJcbiAgICAgICAgdGhpcy5oYW5kbGVPbkNoYW5nZSA9IHRoaXMuaGFuZGxlT25DaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZU9uQmx1ciA9IHRoaXMuaGFuZGxlT25CbHVyLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVPbkNoYW5nZShldmVudCkge1xyXG4gICAgICAgIHRoaXMuY29tbWVudCA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IHRoaXMuY29tbWVudCB9KTtcclxuICAgIH1cclxuICAgIGhhbmRsZU9uQmx1cihldmVudCkge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24uY29tbWVudCA9IHRoaXMuY29tbWVudDtcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uID0gbmV4dFByb3BzLnF1ZXN0aW9uO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICBpZiAoIXRoaXMucXVlc3Rpb24pIHJldHVybiBudWxsO1xyXG4gICAgICAgIHJldHVybiAoPGlucHV0IHR5cGU9XCJ0ZXh0XCIgY2xhc3NOYW1lPXt0aGlzLmNzcy5xdWVzdGlvbi5jb21tZW50fSB2YWx1ZT17dGhpcy5zdGF0ZS52YWx1ZX0gb25DaGFuZ2U9e3RoaXMuaGFuZGxlT25DaGFuZ2V9IG9uQmx1cj17dGhpcy5oYW5kbGVPbkJsdXJ9IC8+KTtcclxuICAgIH1cclxufVxyXG5cclxuUmVhY3RRdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcImNvbW1lbnRcIiwgKHByb3BzKSA9PiB7XHJcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTdXJ2ZXlRdWVzdGlvbkNvbW1lbnQsIHByb3BzKTtcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVhY3QvcmVhY3RxdWVzdGlvbmNvbW1lbnQudHN4XG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge0hhc2hUYWJsZX0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBSZWFjdFF1ZXN0aW9uRmFjdG9yeSB7XHJcbiAgICBwdWJsaWMgc3RhdGljIEluc3RhbmNlOiBSZWFjdFF1ZXN0aW9uRmFjdG9yeSA9IG5ldyBSZWFjdFF1ZXN0aW9uRmFjdG9yeSgpO1xyXG4gICAgcHVibGljIHN0YXRpYyBEZWZhdWx0Q2hvaWNlcyA9IFtcIm9uZVwiLCBcInR3b3xzZWNvbmQgdmFsdWVcIiwgXCJ0aHJlZXx0aGlyZCB2YWx1ZVwiXTtcclxuICAgIHByaXZhdGUgY3JlYXRvckhhc2g6IEhhc2hUYWJsZTwobmFtZTogc3RyaW5nKSA9PiBKU1guRWxlbWVudD4gPSB7fTtcclxuXHJcbiAgICBwdWJsaWMgcmVnaXN0ZXJRdWVzdGlvbihxdWVzdGlvblR5cGU6IHN0cmluZywgcXVlc3Rpb25DcmVhdG9yOiAobmFtZTogc3RyaW5nKSA9PiBKU1guRWxlbWVudCkge1xyXG4gICAgICAgIHRoaXMuY3JlYXRvckhhc2hbcXVlc3Rpb25UeXBlXSA9IHF1ZXN0aW9uQ3JlYXRvcjtcclxuICAgIH1cclxuICAgIHB1YmxpYyBnZXRBbGxUeXBlcygpOiBBcnJheTxzdHJpbmc+IHtcclxuICAgICAgICB2YXIgcmVzdWx0ID0gbmV3IEFycmF5PHN0cmluZz4oKTtcclxuICAgICAgICBmb3IodmFyIGtleSBpbiB0aGlzLmNyZWF0b3JIYXNoKSB7XHJcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKGtleSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiByZXN1bHQuc29ydCgpO1xyXG4gICAgfVxyXG4gICAgcHVibGljIGNyZWF0ZVF1ZXN0aW9uKHF1ZXN0aW9uVHlwZTogc3RyaW5nLCBwYXJhbXM6IGFueSk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICB2YXIgY3JlYXRvciA9IHRoaXMuY3JlYXRvckhhc2hbcXVlc3Rpb25UeXBlXTtcclxuICAgICAgICBpZiAoY3JlYXRvciA9PSBudWxsKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gY3JlYXRvcihwYXJhbXMpO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVhY3QvcmVhY3RxdWVzdGlvbmZhY3RvcnkudHN4XG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1N1cnZleU1vZGVsfSBmcm9tIFwiLi4vc3VydmV5XCI7XHJcbmltcG9ydCB7U3VydmV5TmF2aWdhdGlvbkJhc2V9IGZyb20gXCIuL3JlYWN0U3VydmV5TmF2aWdhdGlvbkJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlOYXZpZ2F0aW9uIGV4dGVuZHMgU3VydmV5TmF2aWdhdGlvbkJhc2Uge1xyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLmhhbmRsZVByZXZDbGljayA9IHRoaXMuaGFuZGxlUHJldkNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVOZXh0Q2xpY2sgPSB0aGlzLmhhbmRsZU5leHRDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlQ29tcGxldGVDbGljayA9IHRoaXMuaGFuZGxlQ29tcGxldGVDbGljay5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlUHJldkNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zdXJ2ZXkucHJldlBhZ2UoKTtcclxuICAgIH1cclxuICAgIGhhbmRsZU5leHRDbGljayhldmVudCkge1xyXG4gICAgICAgIHRoaXMuc3VydmV5Lm5leHRQYWdlKCk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVDb21wbGV0ZUNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5zdXJ2ZXkuY29tcGxldGVMYXN0UGFnZSgpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICBpZiAoIXRoaXMuc3VydmV5KSByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgcHJldkJ1dHRvbiA9ICF0aGlzLnN1cnZleS5pc0ZpcnN0UGFnZSA/IHRoaXMucmVuZGVyQnV0dG9uKHRoaXMuaGFuZGxlUHJldkNsaWNrLCB0aGlzLnN1cnZleS5wYWdlUHJldlRleHQsIHRoaXMuY3NzLm5hdmlnYXRpb24ucHJldikgOiBudWxsO1xyXG4gICAgICAgIHZhciBuZXh0QnV0dG9uID0gIXRoaXMuc3VydmV5LmlzTGFzdFBhZ2UgPyB0aGlzLnJlbmRlckJ1dHRvbih0aGlzLmhhbmRsZU5leHRDbGljaywgdGhpcy5zdXJ2ZXkucGFnZU5leHRUZXh0LCB0aGlzLmNzcy5uYXZpZ2F0aW9uLm5leHQpIDogbnVsbDtcclxuICAgICAgICB2YXIgY29tcGxldGVCdXR0b24gPSB0aGlzLnN1cnZleS5pc0xhc3RQYWdlID8gdGhpcy5yZW5kZXJCdXR0b24odGhpcy5oYW5kbGVDb21wbGV0ZUNsaWNrLCB0aGlzLnN1cnZleS5jb21wbGV0ZVRleHQsIHRoaXMuY3NzLm5hdmlnYXRpb24uY29tcGxldGUpIDogbnVsbDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5jc3MuZm9vdGVyfT5cclxuICAgICAgICAgICAgICAgIHtwcmV2QnV0dG9ufVxyXG4gICAgICAgICAgICAgICAge25leHRCdXR0b259XHJcbiAgICAgICAgICAgICAgICB7Y29tcGxldGVCdXR0b259XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJlbmRlckJ1dHRvbihjbGljazogYW55LCB0ZXh0OiBzdHJpbmcsIGJ0bkNsYXNzTmFtZTogc3RyaW5nKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIHZhciBzdHlsZSA9IHsgbWFyZ2luUmlnaHQ6IFwiNXB4XCIgfTtcclxuICAgICAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5jc3MubmF2aWdhdGlvbkJ1dHRvbiArIChidG5DbGFzc05hbWUgPyAnICcgKyBidG5DbGFzc05hbWUgOiBcIlwiKTtcclxuICAgICAgICByZXR1cm4gPGlucHV0IGNsYXNzTmFtZT17Y2xhc3NOYW1lfSBzdHlsZT17c3R5bGV9IHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXtjbGlja30gdmFsdWU9e3RleHR9IC8+O1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVhY3QvcmVhY3RTdXJ2ZXlOYXZpZ2F0aW9uLnRzeFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtTdXJ2ZXlNb2RlbH0gZnJvbSBcIi4uL3N1cnZleVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN1cnZleU5hdmlnYXRpb25CYXNlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PGFueSwgYW55PiB7XHJcbiAgICBwcm90ZWN0ZWQgc3VydmV5OiBTdXJ2ZXlNb2RlbDtcclxuICAgIHByb3RlY3RlZCBjc3M6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5zdXJ2ZXkgPSBwcm9wcy5zdXJ2ZXk7XHJcbiAgICAgICAgdGhpcy5jc3MgPSBwcm9wcy5jc3M7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgdXBkYXRlOiAwIH07XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zdXJ2ZXkgPSBuZXh0UHJvcHMuc3VydmV5O1xyXG4gICAgICAgIHRoaXMuY3NzID0gbmV4dFByb3BzLmNzcztcclxuICAgIH1cclxuICAgIHByaXZhdGUgdXBkYXRlU3RhdGVGdW5jdGlvbjogYW55ID0gbnVsbDtcclxuICAgIGNvbXBvbmVudERpZE1vdW50KCkge1xyXG4gICAgICAgIGlmICh0aGlzLnN1cnZleSkge1xyXG4gICAgICAgICAgICB2YXIgc2VsZiA9IHRoaXM7XHJcbiAgICAgICAgICAgIHRoaXMudXBkYXRlU3RhdGVGdW5jdGlvbiA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgIHNlbGYuc3RhdGUudXBkYXRlID0gc2VsZi5zdGF0ZS51cGRhdGUgKyAxO1xyXG4gICAgICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZShzZWxmLnN0YXRlKTtcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB0aGlzLnN1cnZleS5vblBhZ2VWaXNpYmxlQ2hhbmdlZC5hZGQodGhpcy51cGRhdGVTdGF0ZUZ1bmN0aW9uKTtcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsVW5tb3VudCgpIHtcclxuICAgICAgICBpZiAodGhpcy5zdXJ2ZXkgJiYgdGhpcy51cGRhdGVTdGF0ZUZ1bmN0aW9uKSB7XHJcbiAgICAgICAgICAgIHRoaXMuc3VydmV5Lm9uUGFnZVZpc2libGVDaGFuZ2VkLnJlbW92ZSh0aGlzLnVwZGF0ZVN0YXRlRnVuY3Rpb24pO1xyXG4gICAgICAgICAgICB0aGlzLnVwZGF0ZVN0YXRlRnVuY3Rpb24gPSBudWxsO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JlYWN0L3JlYWN0U3VydmV5TmF2aWdhdGlvbkJhc2UudHN4XG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1N1cnZleU1vZGVsfSBmcm9tIFwiLi4vc3VydmV5XCI7XHJcbmltcG9ydCB7U3VydmV5TmF2aWdhdGlvbkJhc2V9IGZyb20gXCIuL3JlYWN0U3VydmV5TmF2aWdhdGlvbkJhc2VcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlQcm9ncmVzcyBleHRlbmRzIFN1cnZleU5hdmlnYXRpb25CYXNlIHtcclxuICAgIHByb3RlY3RlZCBpc1RvcDogYm9vbGVhbjtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5pc1RvcCA9IHByb3BzLmlzVG9wO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IGFueSkge1xyXG4gICAgICAgIHN1cGVyLmNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzKTtcclxuICAgICAgICB0aGlzLmlzVG9wID0gbmV4dFByb3BzLmlzVG9wO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldCBwcm9ncmVzcygpOiBudW1iZXIgeyByZXR1cm4gdGhpcy5zdXJ2ZXkuZ2V0UHJvZ3Jlc3MoKTsgfVxyXG4gICAgcHJvdGVjdGVkIGdldCBwcm9ncmVzc1RleHQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuc3VydmV5LnByb2dyZXNzVGV4dDsgfVxyXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICB2YXIgc3R5bGUgPSB0aGlzLmlzVG9wID8geyB3aWR0aDogXCI2MCVcIiB9IDogeyB3aWR0aDogXCI2MCVcIiwgbWFyZ2luVG9wOiBcIjEwcHhcIiB9O1xyXG4gICAgICAgIHZhciBwcm9ncmVzc1N0eWxlID0geyB3aWR0aDogdGhpcy5wcm9ncmVzcyArIFwiJVwiIH07XHJcbiAgICAgICAgcmV0dXJuICg8ZGl2IGNsYXNzTmFtZT17dGhpcy5jc3MucHJvZ3Jlc3N9IHN0eWxlPXtzdHlsZX0+XHJcbiAgICAgICAgICAgIDxkaXYgc3R5bGU9e3Byb2dyZXNzU3R5bGV9IGNsYXNzTmFtZT17dGhpcy5jc3MucHJvZ3Jlc3NCYXJ9IHJvbGU9XCJwcm9ncmVzc2JhclwiIGFyaWEtdmFsdWVtaW49XCIwXCIgYXJpYS12YWx1ZW1heD1cIjEwMFwiPlxyXG4gICAgICAgICAgICAgICAgPHNwYW4+e3RoaXMucHJvZ3Jlc3NUZXh0fTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICAgICA8L2Rpdj4pO1xyXG4gICAgfVxyXG59XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVhY3QvcmVhY3RTdXJ2ZXlQcm9ncmVzcy50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7U3VydmV5UXVlc3Rpb25Db21tZW50SXRlbX0gZnJvbSBcIi4vcmVhY3RxdWVzdGlvbmNvbW1lbnRcIjtcclxuaW1wb3J0IHtRdWVzdGlvbkNoZWNrYm94TW9kZWx9IGZyb20gXCIuLi9xdWVzdGlvbl9jaGVja2JveFwiO1xyXG5pbXBvcnQge0l0ZW1WYWx1ZX0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHtSZWFjdFF1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcmVhY3RxdWVzdGlvbmZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlRdWVzdGlvbkNoZWNrYm94IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PGFueSwgYW55PiB7XHJcbiAgICBwcm90ZWN0ZWQgcXVlc3Rpb246IFF1ZXN0aW9uQ2hlY2tib3hNb2RlbDtcclxuICAgIHByb3RlY3RlZCBjc3M6IGFueTtcclxuICAgIHByb3RlY3RlZCByb290Q3NzOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSBwcm9wcy5xdWVzdGlvbjtcclxuICAgICAgICB0aGlzLmNzcyA9IHByb3BzLmNzcztcclxuICAgICAgICB0aGlzLnJvb3RDc3MgPSBwcm9wcy5yb290Q3NzO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IGNob2ljZXNDaGFuZ2VkOiAwIH07XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24uY2hvaWNlc0NoYW5nZWRDYWxsYmFjayA9IGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgc2VsZi5zdGF0ZS5jaG9pY2VzQ2hhbmdlZCA9IHNlbGYuc3RhdGUuY2hvaWNlc0NoYW5nZWQgKyAxO1xyXG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHNlbGYuc3RhdGUpO1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uID0gbmV4dFByb3BzLnF1ZXN0aW9uO1xyXG4gICAgICAgIHRoaXMuY3NzID0gbmV4dFByb3BzLmNzcztcclxuICAgICAgICB0aGlzLnJvb3RDc3MgPSBuZXh0UHJvcHMucm9vdENzcztcclxuICAgIH1cclxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXN0aW9uKSByZXR1cm4gbnVsbDtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8Zm9ybSBjbGFzc05hbWU9e3RoaXMuY3NzLnJvb3R9PlxyXG4gICAgICAgICAgICB7dGhpcy5nZXRJdGVtcygpIH1cclxuICAgICAgICAgICAgICAgIDwvZm9ybT4pO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldEl0ZW1zKCk6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIHZhciBpdGVtcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xdWVzdGlvbi52aXNpYmxlQ2hvaWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMucXVlc3Rpb24udmlzaWJsZUNob2ljZXNbaV07XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBcIml0ZW1cIiArIGk7XHJcbiAgICAgICAgICAgIGl0ZW1zLnB1c2godGhpcy5yZW5kZXJJdGVtKGtleSwgaXRlbSwgaSA9PSAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpdGVtcztcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXQgdGV4dFN0eWxlKCk6IGFueSB7IHJldHVybiBudWxsOyB9XHJcbiAgICBwcm90ZWN0ZWQgcmVuZGVySXRlbShrZXk6IHN0cmluZywgaXRlbTogYW55LCBpc0ZpcnN0OiBib29sZWFuKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiA8U3VydmV5UXVlc3Rpb25DaGVja2JveEl0ZW0ga2V5PXtrZXl9IHF1ZXN0aW9uPXt0aGlzLnF1ZXN0aW9ufSBjc3M9e3RoaXMuY3NzfSByb290Q3NzPXt0aGlzLnJvb3RDc3N9IGl0ZW09e2l0ZW19IHRleHRTdHlsZT17dGhpcy50ZXh0U3R5bGV9IGlzRmlyc3Q9e2lzRmlyc3R9IC8+O1xyXG4gICAgfVxyXG59XHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlRdWVzdGlvbkNoZWNrYm94SXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIGFueT4ge1xyXG4gICAgcHJvdGVjdGVkIHF1ZXN0aW9uOiBRdWVzdGlvbkNoZWNrYm94TW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgaXRlbTogSXRlbVZhbHVlO1xyXG4gICAgcHJvdGVjdGVkIGNzczogYW55O1xyXG4gICAgcHJvdGVjdGVkIHJvb3RDc3M6IGFueTtcclxuICAgIHByb3RlY3RlZCB0ZXh0U3R5bGU6IGFueTtcclxuICAgIHByb3RlY3RlZCBpc0ZpcnN0OiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuaXRlbSA9IHByb3BzLml0ZW07XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbiA9IHByb3BzLnF1ZXN0aW9uO1xyXG4gICAgICAgIHRoaXMuY3NzID0gcHJvcHMuY3NzO1xyXG4gICAgICAgIHRoaXMucm9vdENzcyA9IHByb3BzLnJvb3RDc3M7XHJcbiAgICAgICAgdGhpcy50ZXh0U3R5bGUgPSBwcm9wcy50ZXh0U3R5bGU7XHJcbiAgICAgICAgdGhpcy5pc0ZpcnN0ID0gcHJvcHMuaXNGaXJzdDtcclxuICAgICAgICB0aGlzLmhhbmRsZU9uQ2hhbmdlID0gdGhpcy5oYW5kbGVPbkNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuaXRlbSA9IG5leHRQcm9wcy5pdGVtO1xyXG4gICAgICAgIHRoaXMuY3NzID0gbmV4dFByb3BzLmNzcztcclxuICAgICAgICB0aGlzLnJvb3RDc3MgPSBuZXh0UHJvcHMucm9vdENzcztcclxuICAgICAgICB0aGlzLnRleHRTdHlsZSA9IG5leHRQcm9wcy50ZXh0U3R5bGU7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbiA9IG5leHRQcm9wcy5xdWVzdGlvbjtcclxuICAgICAgICB0aGlzLmlzRmlyc3QgPSBuZXh0UHJvcHMuaXNGaXJzdDtcclxuICAgIH1cclxuICAgIGhhbmRsZU9uQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIG5ld1ZhbHVlID0gdGhpcy5xdWVzdGlvbi52YWx1ZTtcclxuICAgICAgICBpZiAoIW5ld1ZhbHVlKSB7XHJcbiAgICAgICAgICAgIG5ld1ZhbHVlID0gW107XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBpbmRleCA9IG5ld1ZhbHVlLmluZGV4T2YodGhpcy5pdGVtLnZhbHVlKTtcclxuICAgICAgICBpZiAoZXZlbnQudGFyZ2V0LmNoZWNrZWQpIHtcclxuICAgICAgICAgICAgaWYgKGluZGV4IDwgMCkge1xyXG4gICAgICAgICAgICAgICAgbmV3VmFsdWUucHVzaCh0aGlzLml0ZW0udmFsdWUpO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaWYgKGluZGV4ID4gLTEpIHtcclxuICAgICAgICAgICAgICAgIG5ld1ZhbHVlLnNwbGljZShpbmRleCwgMSk7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbi52YWx1ZSA9IG5ld1ZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogdGhpcy5xdWVzdGlvbi52YWx1ZSB9KTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLml0ZW0gfHwgIXRoaXMucXVlc3Rpb24pIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciBpdGVtV2lkdGggPSB0aGlzLnF1ZXN0aW9uLmNvbENvdW50ID4gMCA/ICgxMDAgLyB0aGlzLnF1ZXN0aW9uLmNvbENvdW50KSArIFwiJVwiIDogXCJcIjtcclxuICAgICAgICB2YXIgbWFyZ2luUmlnaHQgPSB0aGlzLnF1ZXN0aW9uLmNvbENvdW50ID09IDAgPyBcIjVweFwiIDogXCIwcHhcIjtcclxuICAgICAgICB2YXIgZGl2U3R5bGUgPSB7IG1hcmdpblJpZ2h0OiBtYXJnaW5SaWdodCB9O1xyXG4gICAgICAgIGlmIChpdGVtV2lkdGgpIHtcclxuICAgICAgICAgICAgZGl2U3R5bGVbXCJ3aWR0aFwiXSA9IGl0ZW1XaWR0aDtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGlzQ2hlY2tlZCA9ICh0aGlzLnF1ZXN0aW9uLnZhbHVlICYmIHRoaXMucXVlc3Rpb24udmFsdWUuaW5kZXhPZih0aGlzLml0ZW0udmFsdWUpID4gLTEpIHx8IGZhbHNlO1xyXG4gICAgICAgIHZhciBvdGhlckl0ZW0gPSAodGhpcy5pdGVtLnZhbHVlID09PSB0aGlzLnF1ZXN0aW9uLm90aGVySXRlbS52YWx1ZSAmJiBpc0NoZWNrZWQpID8gdGhpcy5yZW5kZXJPdGhlcigpIDogbnVsbDtcclxuICAgICAgICByZXR1cm4gdGhpcy5yZW5kZXJDaGVja2JveChpc0NoZWNrZWQsIGRpdlN0eWxlLCBvdGhlckl0ZW0pO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldCBpbnB1dFN0eWxlKCk6IGFueSB7IHJldHVybiB7IG1hcmdpblJpZ2h0OiBcIjNweFwiIH07IH1cclxuICAgIHByb3RlY3RlZCByZW5kZXJDaGVja2JveChpc0NoZWNrZWQ6IGJvb2xlYW4sIGRpdlN0eWxlOiBhbnksIG90aGVySXRlbTogSlNYLkVsZW1lbnQpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgdmFyIGlkID0gdGhpcy5pc0ZpcnN0ID8gdGhpcy5xdWVzdGlvbi5pbnB1dElkIDogbnVsbDtcclxuICAgICAgICByZXR1cm4gKDxkaXYgY2xhc3NOYW1lPXt0aGlzLmNzcy5pdGVtfSBzdHlsZT17ZGl2U3R5bGV9PlxyXG4gICAgICAgICAgICA8bGFiZWwgY2xhc3NOYW1lPXt0aGlzLmNzcy5pdGVtfT5cclxuICAgICAgICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiBpZD17aWR9IHN0eWxlPXt0aGlzLmlucHV0U3R5bGV9ICBjaGVja2VkPXtpc0NoZWNrZWR9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZU9uQ2hhbmdlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuPnt0aGlzLml0ZW0udGV4dH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIHtvdGhlckl0ZW19XHJcbiAgICAgICAgICAgIDwvZGl2Pik7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVuZGVyT3RoZXIoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9e3RoaXMuY3NzLm90aGVyfT48U3VydmV5UXVlc3Rpb25Db21tZW50SXRlbSAgcXVlc3Rpb249e3RoaXMucXVlc3Rpb259IGNzcz17dGhpcy5yb290Q3NzfSAvPjwvZGl2Pik7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlYWN0UXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJjaGVja2JveFwiLCAocHJvcHMpID0+IHtcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFN1cnZleVF1ZXN0aW9uQ2hlY2tib3gsIHByb3BzKTtcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVhY3QvcmVhY3RxdWVzdGlvbmNoZWNrYm94LnRzeFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtRdWVzdGlvbkRyb3Bkb3duTW9kZWx9IGZyb20gXCIuLi9xdWVzdGlvbl9kcm9wZG93blwiO1xyXG5pbXBvcnQge1N1cnZleVF1ZXN0aW9uQ29tbWVudEl0ZW19IGZyb20gXCIuL3JlYWN0cXVlc3Rpb25jb21tZW50XCI7XHJcbmltcG9ydCB7UmVhY3RRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuL3JlYWN0cXVlc3Rpb25mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3VydmV5UXVlc3Rpb25Ecm9wZG93biBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIGFueT4ge1xyXG4gICAgcHJpdmF0ZSBxdWVzdGlvbjogUXVlc3Rpb25Ecm9wZG93bk1vZGVsO1xyXG4gICAgcHJvdGVjdGVkIGNzczogYW55O1xyXG4gICAgcHJvdGVjdGVkIHJvb3RDc3M6IGFueTtcclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSBwcm9wcy5xdWVzdGlvbjtcclxuICAgICAgICB0aGlzLmNzcyA9IHByb3BzLmNzcztcclxuICAgICAgICB0aGlzLnJvb3RDc3MgPSBwcm9wcy5yb290Q3NzO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IHZhbHVlOiB0aGlzLnF1ZXN0aW9uLnZhbHVlLCBjaG9pY2VzQ2hhbmdlZDogMCB9O1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uLmNob2ljZXNDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc3RhdGUuY2hvaWNlc0NoYW5nZWQgPSBzZWxmLnN0YXRlLmNob2ljZXNDaGFuZ2VkICsgMTtcclxuICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZShzZWxmLnN0YXRlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaGFuZGxlT25DaGFuZ2UgPSB0aGlzLmhhbmRsZU9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVPbkNoYW5nZShldmVudCkge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24udmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiB0aGlzLnF1ZXN0aW9uLnZhbHVlIH0pO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IGFueSkge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSBuZXh0UHJvcHMucXVlc3Rpb247XHJcbiAgICAgICAgdGhpcy5jc3MgPSBuZXh0UHJvcHMuY3NzO1xyXG4gICAgICAgIHRoaXMucm9vdENzcyA9IG5leHRQcm9wcy5yb290Q3NzO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICBpZiAoIXRoaXMucXVlc3Rpb24pIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciBvcHRpb25zID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1ZXN0aW9uLnZpc2libGVDaG9pY2VzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBpdGVtID0gdGhpcy5xdWVzdGlvbi52aXNpYmxlQ2hvaWNlc1tpXTtcclxuICAgICAgICAgICAgdmFyIGtleSA9IFwiaXRlbVwiICsgaTtcclxuICAgICAgICAgICAgdmFyIG9wdGlvbiA9IDxvcHRpb24ga2V5PXtrZXl9IHZhbHVlPXtpdGVtLnZhbHVlfT57aXRlbS50ZXh0fTwvb3B0aW9uPjtcclxuICAgICAgICAgICAgb3B0aW9ucy5wdXNoKG9wdGlvbik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb21tZW50ID0gdGhpcy5xdWVzdGlvbi52YWx1ZSA9PT0gdGhpcy5xdWVzdGlvbi5vdGhlckl0ZW0udmFsdWUgPyB0aGlzLnJlbmRlck90aGVyKCkgOiBudWxsO1xyXG4gICAgICAgIHJldHVybiAoXHJcbiAgICAgICAgICAgIDxkaXY+XHJcbiAgICAgICAgICAgICAgICA8c2VsZWN0IGlkPXt0aGlzLnF1ZXN0aW9uLmlucHV0SWR9IGNsYXNzTmFtZT17dGhpcy5jc3N9IHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX0+XHJcbiAgICAgICAgICAgICAgPG9wdGlvbiB2YWx1ZT1cIlwiPnt0aGlzLnF1ZXN0aW9uLm9wdGlvbnNDYXB0aW9ufTwvb3B0aW9uPlxyXG4gICAgICAgICAgICAgIHtvcHRpb25zfVxyXG4gICAgICAgICAgICA8L3NlbGVjdD5cclxuICAgICAgICAgICAge2NvbW1lbnR9XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVuZGVyT3RoZXIoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIHZhciBzdHlsZSA9IHsgbWFyZ2luVG9wOiBcIjNweFwiIH07XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgc3R5bGU9e3N0eWxlfT48U3VydmV5UXVlc3Rpb25Db21tZW50SXRlbSBxdWVzdGlvbj17dGhpcy5xdWVzdGlvbn0gY3NzPXt0aGlzLnJvb3RDc3N9Lz48L2Rpdj47XHJcbiAgICB9XHJcbn1cclxuXHJcblJlYWN0UXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJkcm9wZG93blwiLCAocHJvcHMpID0+IHtcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFN1cnZleVF1ZXN0aW9uRHJvcGRvd24sIHByb3BzKTtcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVhY3QvcmVhY3RxdWVzdGlvbmRyb3Bkb3duLnRzeFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtRdWVzdGlvbk1hdHJpeERyb3Bkb3duTW9kZWx9IGZyb20gXCIuLi9xdWVzdGlvbl9tYXRyaXhkcm9wZG93blwiO1xyXG5pbXBvcnQge0lTdXJ2ZXlDcmVhdG9yLCBTdXJ2ZXlRdWVzdGlvbkVycm9yc30gZnJvbSBcIi4vcmVhY3RxdWVzdGlvblwiO1xyXG5pbXBvcnQge01hdHJpeERyb3Bkb3duUm93TW9kZWx9IGZyb20gXCIuLi9xdWVzdGlvbl9tYXRyaXhkcm9wZG93blwiO1xyXG5pbXBvcnQge01hdHJpeERyb3Bkb3duQ2VsbH0gZnJvbSBcIi4uL3F1ZXN0aW9uX21hdHJpeGRyb3Bkb3duYmFzZVwiO1xyXG5pbXBvcnQge1JlYWN0UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9yZWFjdHF1ZXN0aW9uZmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN1cnZleVF1ZXN0aW9uTWF0cml4RHJvcGRvd24gZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8YW55LCBhbnk+IHtcclxuICAgIHByaXZhdGUgcXVlc3Rpb246IFF1ZXN0aW9uTWF0cml4RHJvcGRvd25Nb2RlbDtcclxuICAgIHByb3RlY3RlZCBjc3M6IGFueTtcclxuICAgIHByb3RlY3RlZCByb290Q3NzOiBhbnk7XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRvcjogSVN1cnZleUNyZWF0b3I7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhwcm9wcyk7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKG5leHRQcm9wcyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNldFByb3BlcnRpZXMobmV4dFByb3BzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uID0gbmV4dFByb3BzLnF1ZXN0aW9uO1xyXG4gICAgICAgIHRoaXMuY3NzID0gbmV4dFByb3BzLmNzcztcclxuICAgICAgICB0aGlzLnJvb3RDc3MgPSBuZXh0UHJvcHMucm9vdENzcztcclxuICAgICAgICB0aGlzLmNyZWF0b3IgPSBuZXh0UHJvcHMuY3JlYXRvcjtcclxuICAgIH1cclxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXN0aW9uKSByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgaGVhZGVycyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xdWVzdGlvbi5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjb2x1bW4gPSB0aGlzLnF1ZXN0aW9uLmNvbHVtbnNbaV07XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBcImNvbHVtblwiICsgaTtcclxuICAgICAgICAgICAgdmFyIG1pbldpZHRoID0gdGhpcy5xdWVzdGlvbi5nZXRDb2x1bW5XaWR0aChjb2x1bW4pO1xyXG4gICAgICAgICAgICB2YXIgY29sdW1uU3R5bGUgPSBtaW5XaWR0aCA/IHsgbWluV2lkdGg6IG1pbldpZHRoIH0gOiB7fTtcclxuICAgICAgICAgICAgaGVhZGVycy5wdXNoKDx0aCBrZXk9e2tleX0gc3R5bGU9e2NvbHVtblN0eWxlfT57dGhpcy5xdWVzdGlvbi5nZXRDb2x1bW5UaXRsZShjb2x1bW4pIH08L3RoPik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByb3dzID0gW107XHJcbiAgICAgICAgdmFyIHZpc2libGVSb3dzID0gdGhpcy5xdWVzdGlvbi52aXNpYmxlUm93cztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpc2libGVSb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSB2aXNpYmxlUm93c1tpXTtcclxuICAgICAgICAgICAgdmFyIGtleSA9IFwicm93XCIgKyBpO1xyXG4gICAgICAgICAgICByb3dzLnB1c2goPFN1cnZleVF1ZXN0aW9uTWF0cml4RHJvcGRvd25Sb3cga2V5PXtrZXl9IHJvdz17cm93fSBjc3M9e3RoaXMuY3NzfSByb290Q3NzPXt0aGlzLnJvb3RDc3N9IGNyZWF0b3I9e3RoaXMuY3JlYXRvcn0gLz4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgZGl2U3R5bGUgPSB0aGlzLnF1ZXN0aW9uLmhvcml6b250YWxTY3JvbGwgPyB7IG92ZXJmbG93WDogJ3Njcm9sbCd9IDoge307XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiAgc3R5bGU9e2RpdlN0eWxlfT5cclxuICAgICAgICAgICAgICAgIDx0YWJsZSBjbGFzc05hbWU9e3RoaXMuY3NzLnJvb3R9PlxyXG4gICAgICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRoPjwvdGg+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB7aGVhZGVyc31cclxuICAgICAgICAgICAgICAgICAgICAgICAgPC90cj5cclxuICAgICAgICAgICAgICAgICAgICA8L3RoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAge3Jvd3N9XHJcbiAgICAgICAgICAgICAgICAgICAgPC90Ym9keT5cclxuICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgIDwvZGl2PlxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcbn1cclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlRdWVzdGlvbk1hdHJpeERyb3Bkb3duUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PGFueSwgYW55PiB7XHJcbiAgICBwcml2YXRlIHJvdzogTWF0cml4RHJvcGRvd25Sb3dNb2RlbDtcclxuICAgIHByb3RlY3RlZCBjc3M6IGFueTtcclxuICAgIHByb3RlY3RlZCByb290Q3NzOiBhbnk7XHJcbiAgICBwcm90ZWN0ZWQgY3JlYXRvcjogSVN1cnZleUNyZWF0b3I7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhwcm9wcyk7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5zZXRQcm9wZXJ0aWVzKG5leHRQcm9wcyk7XHJcbiAgICB9XHJcbiAgICBwcml2YXRlIHNldFByb3BlcnRpZXMobmV4dFByb3BzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnJvdyA9IG5leHRQcm9wcy5yb3c7XHJcbiAgICAgICAgdGhpcy5jc3MgPSBuZXh0UHJvcHMuY3NzO1xyXG4gICAgICAgIHRoaXMucm9vdENzcyA9IG5leHRQcm9wcy5yb290Q3NzO1xyXG4gICAgICAgIHRoaXMuY3JlYXRvciA9IG5leHRQcm9wcy5jcmVhdG9yO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICBpZiAoIXRoaXMucm93KSByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgdGRzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnJvdy5jZWxscy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY2VsbCA9IHRoaXMucm93LmNlbGxzW2ldO1xyXG4gICAgICAgICAgICB2YXIgZXJyb3JzID0gPFN1cnZleVF1ZXN0aW9uRXJyb3JzIHF1ZXN0aW9uPXtjZWxsLnF1ZXN0aW9ufSBjc3M9e3RoaXMucm9vdENzc30gY3JlYXRvcj17dGhpcy5jcmVhdG9yfSAvPlxyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ID0gdGhpcy5yZW5kZXJTZWxlY3QoY2VsbCk7XHJcbiAgICAgICAgICAgIHRkcy5wdXNoKDx0ZCBrZXk9e1wicm93XCIgKyBpfT57ZXJyb3JzfXtzZWxlY3R9PC90ZD4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKDx0cj48dGQ+e3RoaXMucm93LnRleHR9PC90ZD57dGRzfTwvdHI+KTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCByZW5kZXJTZWxlY3QoY2VsbDogTWF0cml4RHJvcGRvd25DZWxsKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiB0aGlzLmNyZWF0b3IuY3JlYXRlUXVlc3Rpb25FbGVtZW50KGNlbGwucXVlc3Rpb24pO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZWFjdFF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwibWF0cml4ZHJvcGRvd25cIiwgKHByb3BzKSA9PiB7XHJcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTdXJ2ZXlRdWVzdGlvbk1hdHJpeERyb3Bkb3duLCBwcm9wcyk7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JlYWN0L3JlYWN0cXVlc3Rpb25tYXRyaXhkcm9wZG93bi50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7UXVlc3Rpb25NYXRyaXhNb2RlbH0gZnJvbSBcIi4uL3F1ZXN0aW9uX21hdHJpeFwiO1xyXG5pbXBvcnQge01hdHJpeFJvd01vZGVsfSBmcm9tIFwiLi4vcXVlc3Rpb25fbWF0cml4XCI7XHJcbmltcG9ydCB7UmVhY3RRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuL3JlYWN0cXVlc3Rpb25mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3VydmV5UXVlc3Rpb25NYXRyaXggZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8YW55LCBhbnk+IHtcclxuICAgIHByaXZhdGUgcXVlc3Rpb246IFF1ZXN0aW9uTWF0cml4TW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgY3NzOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSBwcm9wcy5xdWVzdGlvbjtcclxuICAgICAgICB0aGlzLmNzcyA9IHByb3BzLmNzcztcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uID0gbmV4dFByb3BzLnF1ZXN0aW9uO1xyXG4gICAgICAgIHRoaXMuY3NzID0gbmV4dFByb3BzLmNzcztcclxuICAgIH1cclxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXN0aW9uKSByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgZmlyc3RUSCA9IHRoaXMucXVlc3Rpb24uaGFzUm93cyA/IDx0aD48L3RoPiA6IG51bGw7XHJcbiAgICAgICAgdmFyIGhlYWRlcnMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlc3Rpb24uY29sdW1ucy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgY29sdW1uID0gdGhpcy5xdWVzdGlvbi5jb2x1bW5zW2ldO1xyXG4gICAgICAgICAgICB2YXIga2V5ID0gXCJjb2x1bW5cIiArIGk7XHJcbiAgICAgICAgICAgIGhlYWRlcnMucHVzaCg8dGgga2V5PXtrZXl9Pntjb2x1bW4udGV4dH08L3RoPik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByb3dzID0gW107XHJcbiAgICAgICAgdmFyIHZpc2libGVSb3dzID0gdGhpcy5xdWVzdGlvbi52aXNpYmxlUm93cztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpc2libGVSb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSB2aXNpYmxlUm93c1tpXTtcclxuICAgICAgICAgICAgdmFyIGtleSA9IFwicm93XCIgKyBpO1xyXG4gICAgICAgICAgICByb3dzLnB1c2goPFN1cnZleVF1ZXN0aW9uTWF0cml4Um93IGtleT17a2V5fSBxdWVzdGlvbj17dGhpcy5xdWVzdGlvbn0gcm93PXtyb3d9IGlzRmlyc3Q9e2kgPT0gMH0gLz4pO1xyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPXt0aGlzLmNzcy5yb290fT5cclxuICAgICAgICAgICAgICAgIDx0aGVhZD5cclxuICAgICAgICAgICAgICAgICAgICA8dHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHtmaXJzdFRIfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB7aGVhZGVyc31cclxuICAgICAgICAgICAgICAgICAgICA8L3RyPlxyXG4gICAgICAgICAgICAgICAgPC90aGVhZD5cclxuICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICB7cm93c31cclxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgPC90YWJsZT5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3VydmV5UXVlc3Rpb25NYXRyaXhSb3cgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8YW55LCBhbnk+IHtcclxuICAgIHByaXZhdGUgcXVlc3Rpb246IFF1ZXN0aW9uTWF0cml4TW9kZWw7XHJcbiAgICBwcml2YXRlIHJvdzogTWF0cml4Um93TW9kZWw7XHJcbiAgICBwcml2YXRlIGlzRmlyc3Q6IGJvb2xlYW47XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSBwcm9wcy5xdWVzdGlvbjtcclxuICAgICAgICB0aGlzLnJvdyA9IHByb3BzLnJvdztcclxuICAgICAgICB0aGlzLmlzRmlyc3QgPSBwcm9wcy5pc0ZpcnN0O1xyXG4gICAgICAgIHRoaXMuaGFuZGxlT25DaGFuZ2UgPSB0aGlzLmhhbmRsZU9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVPbkNoYW5nZShldmVudCkge1xyXG4gICAgICAgIHRoaXMucm93LnZhbHVlID0gZXZlbnQudGFyZ2V0LnZhbHVlO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyB2YWx1ZTogdGhpcy5yb3cudmFsdWUgfSk7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbiA9IG5leHRQcm9wcy5xdWVzdGlvbjtcclxuICAgICAgICB0aGlzLnJvdyA9IG5leHRQcm9wcy5yb3c7XHJcbiAgICAgICAgdGhpcy5pc0ZpcnN0ID0gbmV4dFByb3BzLmlzRmlyc3Q7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIGlmICghdGhpcy5yb3cpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciBmaXJzdFREID0gdGhpcy5xdWVzdGlvbi5oYXNSb3dzID8gPHRkPnt0aGlzLnJvdy50ZXh0fTwvdGQ+IDogbnVsbDtcclxuICAgICAgICB2YXIgdGRzID0gW107XHJcbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCB0aGlzLnF1ZXN0aW9uLmNvbHVtbnMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGNvbHVtbiA9IHRoaXMucXVlc3Rpb24uY29sdW1uc1tpXTtcclxuICAgICAgICAgICAgdmFyIGtleSA9IFwidmFsdWVcIiArIGk7XHJcbiAgICAgICAgICAgIHZhciBpc0NoZWNrZWQgPSB0aGlzLnJvdy52YWx1ZSA9PSBjb2x1bW4udmFsdWU7XHJcbiAgICAgICAgICAgIHZhciBpbnB1dElkID0gdGhpcy5pc0ZpcnN0ICYmIGkgPT0gMCA/IHRoaXMucXVlc3Rpb24uaW5wdXRJZCA6IG51bGw7XHJcbiAgICAgICAgICAgIHZhciB0ZCA9IDx0ZCBrZXk9e2tleX0+PGlucHV0IGlkPXtpbnB1dElkfSB0eXBlPVwicmFkaW9cIiBuYW1lPXt0aGlzLnJvdy5mdWxsTmFtZX0gdmFsdWU9e2NvbHVtbi52YWx1ZX0gY2hlY2tlZD17aXNDaGVja2VkfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX0vPjwvdGQ+O1xyXG4gICAgICAgICAgICB0ZHMucHVzaCh0ZCk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiAoPHRyPntmaXJzdFREfXt0ZHN9PC90cj4pO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZWFjdFF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwibWF0cml4XCIsIChwcm9wcykgPT4ge1xyXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3VydmV5UXVlc3Rpb25NYXRyaXgsIHByb3BzKTtcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVhY3QvcmVhY3RxdWVzdGlvbm1hdHJpeC50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7UXVlc3Rpb25IdG1sTW9kZWx9IGZyb20gXCIuLi9xdWVzdGlvbl9odG1sXCI7XHJcbmltcG9ydCB7UmVhY3RRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuL3JlYWN0cXVlc3Rpb25mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3VydmV5UXVlc3Rpb25IdG1sIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PGFueSwgYW55PiB7XHJcbiAgICBwcml2YXRlIHF1ZXN0aW9uOiBRdWVzdGlvbkh0bWxNb2RlbDtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbiA9IHByb3BzLnF1ZXN0aW9uO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IGFueSkge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSBuZXh0UHJvcHMucXVlc3Rpb247XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIGlmICghdGhpcy5xdWVzdGlvbiB8fCAhdGhpcy5xdWVzdGlvbi5odG1sKSByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgaHRtbFZhbHVlID0geyBfX2h0bWw6IHRoaXMucXVlc3Rpb24ucHJvY2Vzc2VkSHRtbCB9O1xyXG4gICAgICAgIHJldHVybiAoPGRpdiBkYW5nZXJvdXNseVNldElubmVySFRNTD17aHRtbFZhbHVlfSAvPiApO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZWFjdFF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwiaHRtbFwiLCAocHJvcHMpID0+IHtcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFN1cnZleVF1ZXN0aW9uSHRtbCwgcHJvcHMpO1xyXG59KTtcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVhY3QvcmVhY3RxdWVzdGlvbmh0bWwudHN4XG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1F1ZXN0aW9uRmlsZU1vZGVsfSBmcm9tIFwiLi4vcXVlc3Rpb25fZmlsZVwiO1xyXG5pbXBvcnQge1JlYWN0UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9yZWFjdHF1ZXN0aW9uZmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN1cnZleVF1ZXN0aW9uRmlsZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIGFueT4ge1xyXG4gICAgcHJpdmF0ZSBxdWVzdGlvbjogUXVlc3Rpb25GaWxlTW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgY3NzOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSBwcm9wcy5xdWVzdGlvbjtcclxuICAgICAgICB0aGlzLmNzcyA9IHByb3BzLmNzcztcclxuICAgICAgICB0aGlzLnN0YXRlID0geyBmaWxlTG9hZGVkOiAwIH07XHJcbiAgICAgICAgdGhpcy5oYW5kbGVPbkNoYW5nZSA9IHRoaXMuaGFuZGxlT25DaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIGhhbmRsZU9uQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgdmFyIHNyYyA9IGV2ZW50LnRhcmdldCB8fCBldmVudC5zcmNFbGVtZW50OyBcclxuICAgICAgICBpZiAoIXdpbmRvd1tcIkZpbGVSZWFkZXJcIl0pIHJldHVybjtcclxuICAgICAgICBpZiAoIXNyYyB8fCAhc3JjLmZpbGVzIHx8IHNyYy5maWxlcy5sZW5ndGggPCAxKSByZXR1cm47XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbi5sb2FkRmlsZShzcmMuZmlsZXNbMF0pO1xyXG4gICAgICAgIHRoaXMuc2V0U3RhdGUoeyBmaWxlTG9hZGVkOiB0aGlzLnN0YXRlLmZpbGVMb2FkZWQgKyAxIH0pO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IGFueSkge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSBuZXh0UHJvcHMucXVlc3Rpb247XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIGlmICghdGhpcy5xdWVzdGlvbikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgdmFyIGltZyA9IHRoaXMucmVuZGVySW1hZ2UoKTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPXt0aGlzLnF1ZXN0aW9uLmlucHV0SWR9IHR5cGU9XCJmaWxlXCIgb25DaGFuZ2U9e3RoaXMuaGFuZGxlT25DaGFuZ2V9Lz5cclxuICAgICAgICAgICAgICAgIHtpbWd9XHJcbiAgICAgICAgICAgIDwvZGl2PiAgICAgICAgICAgXHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCByZW5kZXJJbWFnZSgpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXN0aW9uLnByZXZpZXdWYWx1ZSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuICg8ZGl2PiAgPGltZyBzcmM9e3RoaXMucXVlc3Rpb24ucHJldmlld1ZhbHVlfSBoZWlnaHQ9e3RoaXMucXVlc3Rpb24uaW1hZ2VIZWlnaHR9IHdpZHRoPXt0aGlzLnF1ZXN0aW9uLmltYWdlV2lkdGh9IC8+PC9kaXY+KTtcclxuICAgIH1cclxufVxyXG5cclxuUmVhY3RRdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcImZpbGVcIiwgKHByb3BzKSA9PiB7XHJcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTdXJ2ZXlRdWVzdGlvbkZpbGUsIHByb3BzKTtcclxufSk7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JlYWN0L3JlYWN0cXVlc3Rpb25maWxlLnRzeFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtRdWVzdGlvbk11bHRpcGxlVGV4dE1vZGVsfSBmcm9tIFwiLi4vcXVlc3Rpb25fbXVsdGlwbGV0ZXh0XCI7XHJcbmltcG9ydCB7TXVsdGlwbGVUZXh0SXRlbU1vZGVsfSBmcm9tIFwiLi4vcXVlc3Rpb25fbXVsdGlwbGV0ZXh0XCI7XHJcbmltcG9ydCB7UmVhY3RRdWVzdGlvbkZhY3Rvcnl9IGZyb20gXCIuL3JlYWN0cXVlc3Rpb25mYWN0b3J5XCI7XHJcblxyXG5leHBvcnQgY2xhc3MgU3VydmV5UXVlc3Rpb25NdWx0aXBsZVRleHQgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8YW55LCBhbnk+IHtcclxuICAgIHByaXZhdGUgcXVlc3Rpb246IFF1ZXN0aW9uTXVsdGlwbGVUZXh0TW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgY3NzOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSBwcm9wcy5xdWVzdGlvbjtcclxuICAgICAgICB0aGlzLmNzcyA9IHByb3BzLmNzcztcclxuICAgIH1cclxuICAgIGNvbXBvbmVudFdpbGxSZWNlaXZlUHJvcHMobmV4dFByb3BzOiBhbnkpIHtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uID0gbmV4dFByb3BzLnF1ZXN0aW9uO1xyXG4gICAgICAgIHRoaXMuY3NzID0gbmV4dFByb3BzLmNzcztcclxuICAgIH1cclxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXN0aW9uKSByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgdGFibGVSb3dzID0gdGhpcy5xdWVzdGlvbi5nZXRSb3dzKCk7XHJcbiAgICAgICAgdmFyIHJvd3MgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRhYmxlUm93cy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICByb3dzLnB1c2godGhpcy5yZW5kZXJSb3coXCJpdGVtXCIgKyBpLCB0YWJsZVJvd3NbaV0pKTtcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPHRhYmxlIGNsYXNzTmFtZT17dGhpcy5jc3Mucm9vdH0+XHJcbiAgICAgICAgICAgICAgICA8dGJvZHk+XHJcbiAgICAgICAgICAgICAgICB7cm93c31cclxuICAgICAgICAgICAgICAgIDwvdGJvZHk+XHJcbiAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCByZW5kZXJSb3coa2V5OiBzdHJpbmcsIGl0ZW1zOiBBcnJheTxNdWx0aXBsZVRleHRJdGVtTW9kZWw+KSB7XHJcbiAgICAgICAgdmFyIHRkcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgaXRlbXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIGl0ZW0gPSBpdGVtc1tpXTtcclxuICAgICAgICAgICAgdGRzLnB1c2goPHRkIGtleT17XCJsYWJlbFwiICsgaX0+PHNwYW4gY2xhc3NOYW1lPXt0aGlzLmNzcy5pdGVtVGl0bGV9PntpdGVtLnRpdGxlfTwvc3Bhbj48L3RkPik7XHJcbiAgICAgICAgICAgIHRkcy5wdXNoKDx0ZCBrZXk9e1widmFsdWVcIiArIGl9Pnt0aGlzLnJlbmRlckl0ZW0oaXRlbSwgaSA9PSAwKX08L3RkPik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiA8dHIga2V5PXtrZXl9Pnt0ZHN9PC90cj47XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVuZGVySXRlbShpdGVtOiBNdWx0aXBsZVRleHRJdGVtTW9kZWwsIGlzRmlyc3Q6IGJvb2xlYW4pOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgdmFyIGlucHV0SWQgPSBpc0ZpcnN0ID8gdGhpcy5xdWVzdGlvbi5pbnB1dElkIDogbnVsbDtcclxuICAgICAgICByZXR1cm4gPFN1cnZleVF1ZXN0aW9uTXVsdGlwbGVUZXh0SXRlbSBpdGVtPXtpdGVtfSBjc3M9e3RoaXMuY3NzfSBpbnB1dElkPXtpbnB1dElkfSAvPjtcclxuICAgIH1cclxufVxyXG5cclxuZXhwb3J0IGNsYXNzIFN1cnZleVF1ZXN0aW9uTXVsdGlwbGVUZXh0SXRlbSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIGFueT4ge1xyXG4gICAgcHJpdmF0ZSBpdGVtOiBNdWx0aXBsZVRleHRJdGVtTW9kZWw7XHJcbiAgICBwcml2YXRlIGlucHV0SWQ6IHN0cmluZztcclxuICAgIHByb3RlY3RlZCBjc3M6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5pdGVtID0gcHJvcHMuaXRlbTtcclxuICAgICAgICB0aGlzLmNzcyA9IHByb3BzLmNzcztcclxuICAgICAgICB0aGlzLmlucHV0SWQgPSBwcm9wcy5pbnB1dElkO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IHZhbHVlOiB0aGlzLml0ZW0udmFsdWUgfTtcclxuICAgICAgICB0aGlzLmhhbmRsZU9uQ2hhbmdlID0gdGhpcy5oYW5kbGVPbkNoYW5nZS5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlT25DaGFuZ2UoZXZlbnQpIHtcclxuICAgICAgICB0aGlzLml0ZW0udmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiB0aGlzLml0ZW0udmFsdWUgfSk7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5pdGVtID0gbmV4dFByb3BzLml0ZW07XHJcbiAgICAgICAgdGhpcy5jc3MgPSBuZXh0UHJvcHMuY3NzO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICBpZiAoIXRoaXMuaXRlbSkgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgdmFyIHN0eWxlID0geyBmbG9hdDogXCJsZWZ0XCIgfTtcclxuICAgICAgICByZXR1cm4gKDxpbnB1dCBpZD17dGhpcy5pbnB1dElkfSBjbGFzc05hbWU9e3RoaXMuY3NzLml0ZW1WYWx1ZX0gc3R5bGU9e3N0eWxlfSB0eXBlPVwidGV4dFwiIHZhbHVlPXt0aGlzLnN0YXRlLnZhbHVlfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX0gLz4pO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldCBtYWluQ2xhc3NOYW1lKCk6IHN0cmluZyB7IHJldHVybiBcIlwiOyB9XHJcbn1cclxuXHJcblJlYWN0UXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJtdWx0aXBsZXRleHRcIiwgKHByb3BzKSA9PiB7XHJcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTdXJ2ZXlRdWVzdGlvbk11bHRpcGxlVGV4dCwgcHJvcHMpO1xyXG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZWFjdC9yZWFjdHF1ZXN0aW9ubXVsdGlwbGV0ZXh0LnRzeFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtRdWVzdGlvblJhZGlvZ3JvdXBNb2RlbH0gZnJvbSBcIi4uL3F1ZXN0aW9uX3JhZGlvZ3JvdXBcIjtcclxuaW1wb3J0IHtJdGVtVmFsdWV9IGZyb20gXCIuLi9iYXNlXCI7XHJcbmltcG9ydCB7U3VydmV5UXVlc3Rpb25Db21tZW50SXRlbX0gZnJvbSBcIi4vcmVhY3RxdWVzdGlvbmNvbW1lbnRcIjtcclxuaW1wb3J0IHtSZWFjdFF1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcmVhY3RxdWVzdGlvbmZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlRdWVzdGlvblJhZGlvZ3JvdXAgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8YW55LCBhbnk+IHtcclxuICAgIHByb3RlY3RlZCBxdWVzdGlvbjogUXVlc3Rpb25SYWRpb2dyb3VwTW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgY3NzOiBhbnk7XHJcbiAgICBwcm90ZWN0ZWQgcm9vdENzczogYW55O1xyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uID0gcHJvcHMucXVlc3Rpb247XHJcbiAgICAgICAgdGhpcy5jc3MgPSBwcm9wcy5jc3M7XHJcbiAgICAgICAgdGhpcy5yb290Q3NzID0gcHJvcHMucm9vdENzcztcclxuICAgICAgICB0aGlzLnN0YXRlID0geyBjaG9pY2VzQ2hhbmdlZDogMCB9O1xyXG4gICAgICAgIHZhciBzZWxmID0gdGhpcztcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uLmNob2ljZXNDaGFuZ2VkQ2FsbGJhY2sgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICAgIHNlbGYuc3RhdGUuY2hvaWNlc0NoYW5nZWQgPSBzZWxmLnN0YXRlLmNob2ljZXNDaGFuZ2VkICsgMTtcclxuICAgICAgICAgICAgc2VsZi5zZXRTdGF0ZShzZWxmLnN0YXRlKTtcclxuICAgICAgICB9O1xyXG4gICAgICAgIHRoaXMuaGFuZGxlT25DaGFuZ2UgPSB0aGlzLmhhbmRsZU9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbiA9IG5leHRQcm9wcy5xdWVzdGlvbjtcclxuICAgICAgICB0aGlzLmNzcyA9IG5leHRQcm9wcy5jc3M7XHJcbiAgICAgICAgdGhpcy5yb290Q3NzID0gbmV4dFByb3BzLnJvb3RDc3M7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVPbkNoYW5nZSA9IHRoaXMuaGFuZGxlT25DaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIGhhbmRsZU9uQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbi52YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IHRoaXMucXVlc3Rpb24udmFsdWUgfSk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIGlmICghdGhpcy5xdWVzdGlvbikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGZvcm0gY2xhc3NOYW1lPXt0aGlzLmNzcy5yb290fT5cclxuICAgICAgICAgICAge3RoaXMuZ2V0SXRlbXMoKSB9XHJcbiAgICAgICAgICAgIDwvZm9ybT4pO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIGdldEl0ZW1zKCk6IEFycmF5PGFueT4ge1xyXG4gICAgICAgIHZhciBpdGVtcyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xdWVzdGlvbi52aXNpYmxlQ2hvaWNlcy5sZW5ndGg7IGkrKykge1xyXG4gICAgICAgICAgICB2YXIgaXRlbSA9IHRoaXMucXVlc3Rpb24udmlzaWJsZUNob2ljZXNbaV07XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBcIml0ZW1cIiArIGk7XHJcbiAgICAgICAgICAgIGl0ZW1zLnB1c2godGhpcy5yZW5kZXJJdGVtKGtleSwgaXRlbSwgaSA9PSAwKSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBpdGVtcztcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCBnZXQgdGV4dFN0eWxlKCk6IGFueSB7IHJldHVybiB7IG1hcmdpbkxlZnQ6IFwiM3B4XCIgfTsgfVxyXG4gICAgcHJpdmF0ZSByZW5kZXJJdGVtKGtleTogc3RyaW5nLCBpdGVtOiBJdGVtVmFsdWUsIGlzRmlyc3Q6IGJvb2xlYW4pOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgdmFyIGl0ZW1XaWR0aCA9IHRoaXMucXVlc3Rpb24uY29sQ291bnQgPiAwID8gKDEwMCAvIHRoaXMucXVlc3Rpb24uY29sQ291bnQpICsgXCIlXCIgOiBcIlwiO1xyXG4gICAgICAgIHZhciBtYXJnaW5SaWdodCA9IHRoaXMucXVlc3Rpb24uY29sQ291bnQgPT0gMCA/IFwiNXB4XCIgOiBcIjBweFwiO1xyXG4gICAgICAgIHZhciBkaXZTdHlsZSA9IHsgbWFyZ2luUmlnaHQ6IG1hcmdpblJpZ2h0IH07XHJcbiAgICAgICAgaWYgKGl0ZW1XaWR0aCkge1xyXG4gICAgICAgICAgICBkaXZTdHlsZVtcIndpZHRoXCJdID0gaXRlbVdpZHRoO1xyXG4gICAgICAgIH1cclxuICAgICAgICB2YXIgaXNDaGVja2VkID0gdGhpcy5xdWVzdGlvbi52YWx1ZSA9PSBpdGVtLnZhbHVlO1xyXG4gICAgICAgIHZhciBvdGhlckl0ZW0gPSAoaXNDaGVja2VkICYmIGl0ZW0udmFsdWUgPT09IHRoaXMucXVlc3Rpb24ub3RoZXJJdGVtLnZhbHVlKSA/IHRoaXMucmVuZGVyT3RoZXIoKSA6IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMucmVuZGVyUmFkaW8oa2V5LCBpdGVtLCBpc0NoZWNrZWQsIGRpdlN0eWxlLCBvdGhlckl0ZW0sIGlzRmlyc3QpO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJlbmRlclJhZGlvKGtleTogc3RyaW5nLCBpdGVtOiBJdGVtVmFsdWUsIGlzQ2hlY2tlZDogYm9vbGVhbiwgZGl2U3R5bGU6IGFueSwgb3RoZXJJdGVtOiBKU1guRWxlbWVudCwgaXNGaXJzdDogYm9vbGVhbik6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICB2YXIgaWQgPSBpc0ZpcnN0ID8gdGhpcy5xdWVzdGlvbi5pbnB1dElkIDogbnVsbDtcclxuICAgICAgICByZXR1cm4gKDxkaXYga2V5PXtrZXl9IGNsYXNzTmFtZT17dGhpcy5jc3MuaXRlbX0gc3R5bGU9e2RpdlN0eWxlfT5cclxuICAgICAgICAgICAgICAgIDxsYWJlbCBjbGFzc05hbWU9e3RoaXMuY3NzLml0ZW19PlxyXG4gICAgICAgICAgICAgICAgPGlucHV0IGlkPXtpZH0gdHlwZT1cInJhZGlvXCIgIGNoZWNrZWQ9e2lzQ2hlY2tlZH0gdmFsdWU9e2l0ZW0udmFsdWV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZU9uQ2hhbmdlfSAvPlxyXG4gICAgICAgICAgICAgICAgICAgIDxzcGFuIHN0eWxlPXt0aGlzLnRleHRTdHlsZX0+e2l0ZW0udGV4dH08L3NwYW4+XHJcbiAgICAgICAgICAgICAgICAgICAgPC9sYWJlbD5cclxuICAgICAgICAgICAgICAgIHtvdGhlckl0ZW19XHJcbiAgICAgICAgICAgIDwvZGl2Pik7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVuZGVyT3RoZXIoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9e3RoaXMuY3NzLm90aGVyfT48U3VydmV5UXVlc3Rpb25Db21tZW50SXRlbSAgcXVlc3Rpb249e3RoaXMucXVlc3Rpb259IGNzcz17dGhpcy5yb290Q3NzfSAvPjwvZGl2Pik7XHJcbiAgICB9XHJcbn1cclxuXHJcblJlYWN0UXVlc3Rpb25GYWN0b3J5Lkluc3RhbmNlLnJlZ2lzdGVyUXVlc3Rpb24oXCJyYWRpb2dyb3VwXCIsIChwcm9wcykgPT4ge1xyXG4gICAgcmV0dXJuIFJlYWN0LmNyZWF0ZUVsZW1lbnQoU3VydmV5UXVlc3Rpb25SYWRpb2dyb3VwLCBwcm9wcyk7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JlYWN0L3JlYWN0cXVlc3Rpb25yYWRpb2dyb3VwLnRzeFxuICoqLyIsImltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcclxuaW1wb3J0IHtRdWVzdGlvblRleHRNb2RlbH0gZnJvbSBcIi4uL3F1ZXN0aW9uX3RleHRcIjtcclxuaW1wb3J0IHtSZWFjdFF1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcmVhY3RxdWVzdGlvbmZhY3RvcnlcIjtcclxuXHJcblxyXG5leHBvcnQgY2xhc3MgU3VydmV5UXVlc3Rpb25UZXh0IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PGFueSwgYW55PiB7XHJcbiAgICBwcml2YXRlIHF1ZXN0aW9uOiBRdWVzdGlvblRleHRNb2RlbDtcclxuICAgIHByb3RlY3RlZCBjc3M6IGFueTtcclxuICAgIGNvbnN0cnVjdG9yKHByb3BzOiBhbnkpIHtcclxuICAgICAgICBzdXBlcihwcm9wcyk7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbiA9IHByb3BzLnF1ZXN0aW9uO1xyXG4gICAgICAgIHRoaXMuY3NzID0gcHJvcHMuY3NzO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IHZhbHVlOiB0aGlzLnF1ZXN0aW9uLnZhbHVlIH07XHJcbiAgICAgICAgdGhpcy5oYW5kbGVPbkNoYW5nZSA9IHRoaXMuaGFuZGxlT25DaGFuZ2UuYmluZCh0aGlzKTtcclxuICAgIH1cclxuICAgIGhhbmRsZU9uQ2hhbmdlKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbi52YWx1ZSA9IGV2ZW50LnRhcmdldC52YWx1ZTtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHsgdmFsdWU6IHRoaXMucXVlc3Rpb24udmFsdWUgfSk7XHJcbiAgICB9XHJcbiAgICBjb21wb25lbnRXaWxsUmVjZWl2ZVByb3BzKG5leHRQcm9wczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbiA9IG5leHRQcm9wcy5xdWVzdGlvbjtcclxuICAgICAgICB0aGlzLmNzcyA9IG5leHRQcm9wcy5jc3M7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIGlmICghdGhpcy5xdWVzdGlvbikgcmV0dXJuIG51bGw7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGlucHV0IGlkPXt0aGlzLnF1ZXN0aW9uLmlucHV0SWR9IGNsYXNzTmFtZT17dGhpcy5jc3N9IHR5cGU9e3RoaXMucXVlc3Rpb24uaW5wdXRUeXBlfSB2YWx1ZT17dGhpcy5xdWVzdGlvbi52YWx1ZSB8fCAnJ30gc2l6ZT17dGhpcy5xdWVzdGlvbi5zaXplfSBvbkNoYW5nZT17dGhpcy5oYW5kbGVPbkNoYW5nZX0gLz5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG59XHJcblxyXG5SZWFjdFF1ZXN0aW9uRmFjdG9yeS5JbnN0YW5jZS5yZWdpc3RlclF1ZXN0aW9uKFwidGV4dFwiLCAocHJvcHMpID0+IHtcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFN1cnZleVF1ZXN0aW9uVGV4dCwgcHJvcHMpO1xyXG59KTtcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZWFjdC9yZWFjdHF1ZXN0aW9udGV4dC50c3hcbiAqKi8iLCJpbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XHJcbmltcG9ydCB7UXVlc3Rpb25NYXRyaXhEeW5hbWljTW9kZWx9IGZyb20gXCIuLi9xdWVzdGlvbl9tYXRyaXhkeW5hbWljXCI7XHJcbmltcG9ydCB7SVN1cnZleUNyZWF0b3IsIFN1cnZleVF1ZXN0aW9uRXJyb3JzfSBmcm9tIFwiLi9yZWFjdHF1ZXN0aW9uXCI7XHJcbmltcG9ydCB7TWF0cml4RHluYW1pY1Jvd01vZGVsfSBmcm9tIFwiLi4vcXVlc3Rpb25fbWF0cml4ZHluYW1pY1wiO1xyXG5pbXBvcnQge01hdHJpeERyb3Bkb3duQ2VsbH0gZnJvbSBcIi4uL3F1ZXN0aW9uX21hdHJpeGRyb3Bkb3duYmFzZVwiO1xyXG5pbXBvcnQge1JlYWN0UXVlc3Rpb25GYWN0b3J5fSBmcm9tIFwiLi9yZWFjdHF1ZXN0aW9uZmFjdG9yeVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN1cnZleVF1ZXN0aW9uTWF0cml4RHluYW1pYyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIGFueT4ge1xyXG4gICAgcHJpdmF0ZSBxdWVzdGlvbjogUXVlc3Rpb25NYXRyaXhEeW5hbWljTW9kZWw7XHJcbiAgICBwcm90ZWN0ZWQgY3NzOiBhbnk7XHJcbiAgICBwcm90ZWN0ZWQgcm9vdENzczogYW55O1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0b3I6IElTdXJ2ZXlDcmVhdG9yO1xyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMocHJvcHMpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhuZXh0UHJvcHMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzZXRQcm9wZXJ0aWVzKG5leHRQcm9wczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbiA9IG5leHRQcm9wcy5xdWVzdGlvbjtcclxuICAgICAgICB0aGlzLmNzcyA9IG5leHRQcm9wcy5jc3M7XHJcbiAgICAgICAgdGhpcy5yb290Q3NzID0gbmV4dFByb3BzLnJvb3RDc3M7XHJcbiAgICAgICAgdGhpcy5jcmVhdG9yID0gbmV4dFByb3BzLmNyZWF0b3I7XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuc3RhdGUgPSB7IHJvd0NvdW50ZXI6IDAgfTtcclxuICAgICAgICB0aGlzLnF1ZXN0aW9uLnJvd0NvdW50Q2hhbmdlZENhbGxiYWNrID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICAgICAgICBzZWxmLnN0YXRlLnJvd0NvdW50ZXIgPSBzZWxmLnN0YXRlLnJvd0NvdW50ZXIgKyAxO1xyXG4gICAgICAgICAgICBzZWxmLnNldFN0YXRlKHNlbGYuc3RhdGUpO1xyXG4gICAgICAgIH07XHJcbiAgICAgICAgdGhpcy5oYW5kbGVPblJvd0FkZENsaWNrID0gdGhpcy5oYW5kbGVPblJvd0FkZENsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVPblJvd0FkZENsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbi5hZGRSb3coKTtcclxuICAgIH1cclxuICAgIHJlbmRlcigpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgaWYgKCF0aGlzLnF1ZXN0aW9uKSByZXR1cm4gbnVsbDtcclxuICAgICAgICB2YXIgaGVhZGVycyA9IFtdO1xyXG4gICAgICAgIGZvciAodmFyIGkgPSAwOyBpIDwgdGhpcy5xdWVzdGlvbi5jb2x1bW5zLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjb2x1bW4gPSB0aGlzLnF1ZXN0aW9uLmNvbHVtbnNbaV07XHJcbiAgICAgICAgICAgIHZhciBrZXkgPSBcImNvbHVtblwiICsgaTtcclxuICAgICAgICAgICAgdmFyIG1pbldpZHRoID0gdGhpcy5xdWVzdGlvbi5nZXRDb2x1bW5XaWR0aChjb2x1bW4pO1xyXG4gICAgICAgICAgICB2YXIgY29sdW1uU3R5bGUgPSBtaW5XaWR0aCA/IHsgbWluV2lkdGg6IG1pbldpZHRoIH0gOiB7fTtcclxuICAgICAgICAgICAgaGVhZGVycy5wdXNoKDx0aCBrZXk9e2tleX0gc3R5bGU9e2NvbHVtblN0eWxlfT57dGhpcy5xdWVzdGlvbi5nZXRDb2x1bW5UaXRsZShjb2x1bW4pIH08L3RoPik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByb3dzID0gW107XHJcbiAgICAgICAgdmFyIHZpc2libGVSb3dzID0gdGhpcy5xdWVzdGlvbi52aXNpYmxlUm93cztcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHZpc2libGVSb3dzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciByb3cgPSB2aXNpYmxlUm93c1tpXTtcclxuICAgICAgICAgICAgdmFyIGtleSA9IFwicm93XCIgKyBpO1xyXG4gICAgICAgICAgICByb3dzLnB1c2goPFN1cnZleVF1ZXN0aW9uTWF0cml4RHluYW1pY1JvdyBrZXk9e2tleX0gcm93PXtyb3d9IHF1ZXN0aW9uPXt0aGlzLnF1ZXN0aW9ufSBpbmRleD17aX0gY3NzPXt0aGlzLmNzc30gcm9vdENzcz17dGhpcy5yb290Q3NzfSBjcmVhdG9yPXt0aGlzLmNyZWF0b3J9IC8+KTtcclxuICAgICAgICB9XHJcbiAgICAgICAgdmFyIGRpdlN0eWxlID0gdGhpcy5xdWVzdGlvbi5ob3Jpem9udGFsU2Nyb2xsID8geyBvdmVyZmxvd1g6ICdzY3JvbGwnIH0gOiB7fTtcclxuICAgICAgICByZXR1cm4gKFxyXG4gICAgICAgICAgICA8ZGl2PlxyXG4gICAgICAgICAgICAgICAgPGRpdiAgc3R5bGU9e2RpdlN0eWxlfT5cclxuICAgICAgICAgICAgICAgICAgICA8dGFibGUgY2xhc3NOYW1lPXt0aGlzLmNzcy5yb290fT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgPHRoZWFkPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHRyPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtoZWFkZXJzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDx0aD48L3RoPlxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdHI+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvdGhlYWQ+XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIDx0Ym9keT5cclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHtyb3dzfVxyXG4gICAgICAgICAgICAgICAgICAgICAgICA8L3Rib2R5PlxyXG4gICAgICAgICAgICAgICAgICAgIDwvdGFibGU+XHJcbiAgICAgICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICAgICAgICAgIHt0aGlzLnJlbmRlckFkZFJvd0J1dHRvbigpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCByZW5kZXJBZGRSb3dCdXR0b24oKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiA8aW5wdXQgY2xhc3NOYW1lPXt0aGlzLmNzcy5idXR0b259IHR5cGU9XCJidXR0b25cIiBvbkNsaWNrPXt0aGlzLmhhbmRsZU9uUm93QWRkQ2xpY2t9IHZhbHVlPXt0aGlzLnF1ZXN0aW9uLmFkZFJvd1RleHR9IC8+O1xyXG4gICAgfVxyXG59XHJcblxyXG5leHBvcnQgY2xhc3MgU3VydmV5UXVlc3Rpb25NYXRyaXhEeW5hbWljUm93IGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PGFueSwgYW55PiB7XHJcbiAgICBwcml2YXRlIHJvdzogTWF0cml4RHluYW1pY1Jvd01vZGVsO1xyXG4gICAgcHJpdmF0ZSBxdWVzdGlvbjogUXVlc3Rpb25NYXRyaXhEeW5hbWljTW9kZWw7XHJcbiAgICBwcml2YXRlIGluZGV4OiBudW1iZXI7XHJcbiAgICBwcm90ZWN0ZWQgY3NzOiBhbnk7XHJcbiAgICBwcm90ZWN0ZWQgcm9vdENzczogYW55O1xyXG4gICAgcHJvdGVjdGVkIGNyZWF0b3I6IElTdXJ2ZXlDcmVhdG9yO1xyXG4gICAgY29uc3RydWN0b3IocHJvcHM6IGFueSkge1xyXG4gICAgICAgIHN1cGVyKHByb3BzKTtcclxuICAgICAgICB0aGlzLnNldFByb3BlcnRpZXMocHJvcHMpO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IGFueSkge1xyXG4gICAgICAgIHRoaXMuc2V0UHJvcGVydGllcyhuZXh0UHJvcHMpO1xyXG4gICAgfVxyXG4gICAgcHJpdmF0ZSBzZXRQcm9wZXJ0aWVzKG5leHRQcm9wczogYW55KSB7XHJcbiAgICAgICAgdGhpcy5yb3cgPSBuZXh0UHJvcHMucm93O1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSBuZXh0UHJvcHMucXVlc3Rpb247XHJcbiAgICAgICAgdGhpcy5pbmRleCA9IG5leHRQcm9wcy5pbmRleDtcclxuICAgICAgICB0aGlzLmNzcyA9IG5leHRQcm9wcy5jc3M7XHJcbiAgICAgICAgdGhpcy5yb290Q3NzID0gbmV4dFByb3BzLnJvb3RDc3M7XHJcbiAgICAgICAgdGhpcy5jcmVhdG9yID0gbmV4dFByb3BzLmNyZWF0b3I7XHJcbiAgICAgICAgdGhpcy5oYW5kbGVPblJvd1JlbW92ZUNsaWNrID0gdGhpcy5oYW5kbGVPblJvd1JlbW92ZUNsaWNrLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVPblJvd1JlbW92ZUNsaWNrKGV2ZW50KSB7XHJcbiAgICAgICAgdGhpcy5xdWVzdGlvbi5yZW1vdmVSb3codGhpcy5pbmRleCk7XHJcbiAgICB9XHJcbiAgICByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIGlmICghdGhpcy5yb3cpIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciB0ZHMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucm93LmNlbGxzLmxlbmd0aDsgaSsrKSB7XHJcbiAgICAgICAgICAgIHZhciBjZWxsID0gdGhpcy5yb3cuY2VsbHNbaV07XHJcbiAgICAgICAgICAgIHZhciBlcnJvcnMgPSA8U3VydmV5UXVlc3Rpb25FcnJvcnMgcXVlc3Rpb249e2NlbGwucXVlc3Rpb259IGNzcz17dGhpcy5yb290Q3NzfSBjcmVhdG9yPXt0aGlzLmNyZWF0b3J9IC8+O1xyXG4gICAgICAgICAgICB2YXIgc2VsZWN0ID0gdGhpcy5yZW5kZXJRdWVzdGlvbihjZWxsKTtcclxuICAgICAgICAgICAgdGRzLnB1c2goPHRkIGtleT17XCJyb3dcIiArIGl9PntlcnJvcnN9e3NlbGVjdH08L3RkPik7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciByZW1vdmVCdXR0b24gPSB0aGlzLnJlbmRlckJ1dHRvbigpO1xyXG4gICAgICAgIHRkcy5wdXNoKDx0ZCBrZXk9e1wicm93XCIgKyB0aGlzLnJvdy5jZWxscy5sZW5ndGggKyAxfT57cmVtb3ZlQnV0dG9ufTwvdGQ+KTtcclxuICAgICAgICByZXR1cm4gKDx0cj57dGRzfTwvdHI+KTtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCByZW5kZXJRdWVzdGlvbihjZWxsOiBNYXRyaXhEcm9wZG93bkNlbGwpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuY3JlYXRvci5jcmVhdGVRdWVzdGlvbkVsZW1lbnQoY2VsbC5xdWVzdGlvbik7XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVuZGVyQnV0dG9uKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gPGlucHV0IGNsYXNzTmFtZT17dGhpcy5jc3MuYnV0dG9ufSB0eXBlPVwiYnV0dG9uXCIgb25DbGljaz17dGhpcy5oYW5kbGVPblJvd1JlbW92ZUNsaWNrfSB2YWx1ZT17dGhpcy5xdWVzdGlvbi5yZW1vdmVSb3dUZXh0fSAvPjtcclxuICAgIH1cclxufVxyXG5cclxuUmVhY3RRdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcIm1hdHJpeGR5bmFtaWNcIiwgKHByb3BzKSA9PiB7XHJcbiAgICByZXR1cm4gUmVhY3QuY3JlYXRlRWxlbWVudChTdXJ2ZXlRdWVzdGlvbk1hdHJpeER5bmFtaWMsIHByb3BzKTtcclxufSk7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvcmVhY3QvcmVhY3RxdWVzdGlvbm1hdHJpeGR5bmFtaWMudHN4XG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1N1cnZleVF1ZXN0aW9uQ29tbWVudEl0ZW19IGZyb20gXCIuL3JlYWN0cXVlc3Rpb25jb21tZW50XCI7XHJcbmltcG9ydCB7UXVlc3Rpb25SYXRpbmdNb2RlbH0gZnJvbSBcIi4uL3F1ZXN0aW9uX3JhdGluZ1wiO1xyXG5pbXBvcnQge0l0ZW1WYWx1ZX0gZnJvbSBcIi4uL2Jhc2VcIjtcclxuaW1wb3J0IHtSZWFjdFF1ZXN0aW9uRmFjdG9yeX0gZnJvbSBcIi4vcmVhY3RxdWVzdGlvbmZhY3RvcnlcIjtcclxuXHJcbmV4cG9ydCBjbGFzcyBTdXJ2ZXlRdWVzdGlvblJhdGluZyBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxhbnksIGFueT4ge1xyXG4gICAgcHJpdmF0ZSBxdWVzdGlvbjogUXVlc3Rpb25SYXRpbmdNb2RlbDtcclxuICAgIHByb3RlY3RlZCBjc3M6IGFueTtcclxuICAgIHByb3RlY3RlZCByb290Q3NzOiBhbnk7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSBwcm9wcy5xdWVzdGlvbjtcclxuICAgICAgICB0aGlzLmNzcyA9IHByb3BzLmNzcztcclxuICAgICAgICB0aGlzLnJvb3RDc3MgPSBwcm9wcy5yb290Q3NzO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlT25DaGFuZ2UgPSB0aGlzLmhhbmRsZU9uQ2hhbmdlLmJpbmQodGhpcyk7XHJcbiAgICB9XHJcbiAgICBoYW5kbGVPbkNoYW5nZShldmVudCkge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24udmFsdWUgPSBldmVudC50YXJnZXQudmFsdWU7XHJcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHZhbHVlOiB0aGlzLnF1ZXN0aW9uLnZhbHVlIH0pO1xyXG4gICAgfVxyXG4gICAgY29tcG9uZW50V2lsbFJlY2VpdmVQcm9wcyhuZXh0UHJvcHM6IGFueSkge1xyXG4gICAgICAgIHRoaXMucXVlc3Rpb24gPSBuZXh0UHJvcHMucXVlc3Rpb247XHJcbiAgICAgICAgdGhpcy5jc3MgPSBuZXh0UHJvcHMuY3NzO1xyXG4gICAgICAgIHRoaXMucm9vdENzcyA9IG5leHRQcm9wcy5yb290Q3NzO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICBpZiAoIXRoaXMucXVlc3Rpb24pIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciB2YWx1ZXMgPSBbXTtcclxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHRoaXMucXVlc3Rpb24udmlzaWJsZVJhdGVWYWx1ZXMubGVuZ3RoOyBpKyspIHtcclxuICAgICAgICAgICAgdmFyIG1pblRleHQgPSBpID09IDAgPyB0aGlzLnF1ZXN0aW9uLm1pbmludW1SYXRlRGVzY3JpcHRpb24gKyBcIiBcIiA6IG51bGw7XHJcbiAgICAgICAgICAgIHZhciBtYXhUZXh0ID0gaSA9PSB0aGlzLnF1ZXN0aW9uLnZpc2libGVSYXRlVmFsdWVzLmxlbmd0aCAtIDEgPyBcIiBcIiArIHRoaXMucXVlc3Rpb24ubWF4aW11bVJhdGVEZXNjcmlwdGlvbiA6IG51bGw7XHJcbiAgICAgICAgICAgIHZhbHVlcy5wdXNoKHRoaXMucmVuZGVySXRlbShcInZhbHVlXCIgKyBpLCB0aGlzLnF1ZXN0aW9uLnZpc2libGVSYXRlVmFsdWVzW2ldLCBtaW5UZXh0LCBtYXhUZXh0KSk7XHJcbiAgICAgICAgfVxyXG4gICAgICAgIHZhciBjb21tZW50ID0gdGhpcy5xdWVzdGlvbi5oYXNPdGhlciA/IHRoaXMucmVuZGVyT3RoZXIoKSA6IG51bGw7XHJcbiAgICAgICAgcmV0dXJuIChcclxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuY3NzLnJvb3R9PlxyXG4gICAgICAgICAgICAgICAge3ZhbHVlc31cclxuICAgICAgICAgICAgICAgIHtjb21tZW50fVxyXG4gICAgICAgICAgICA8L2Rpdj5cclxuICAgICAgICApO1xyXG4gICAgfVxyXG4gICAgcHJvdGVjdGVkIHJlbmRlckl0ZW0oa2V5OiBzdHJpbmcsIGl0ZW06IEl0ZW1WYWx1ZSwgbWluVGV4dDogc3RyaW5nLCBtYXhUZXh0OiBzdHJpbmcpOiBKU1guRWxlbWVudCB7XHJcbiAgICAgICAgdmFyIGlzQ2hlY2tlZCA9IHRoaXMucXVlc3Rpb24udmFsdWUgPT0gaXRlbS52YWx1ZTtcclxuICAgICAgICB2YXIgY2xhc3NOYW1lID0gdGhpcy5jc3MuaXRlbTtcclxuICAgICAgICBpZiAoaXNDaGVja2VkKSBjbGFzc05hbWUgKz0gXCIgYWN0aXZlXCI7XHJcbiAgICAgICAgdmFyIG1pbiA9IG1pblRleHQgPyA8c3Bhbj57bWluVGV4dH08L3NwYW4+IDogbnVsbDtcclxuICAgICAgICB2YXIgbWF4ID0gbWF4VGV4dCA/IDxzcGFuPnttYXhUZXh0fTwvc3Bhbj4gOiBudWxsO1xyXG4gICAgICAgIHJldHVybiA8bGFiZWwga2V5PXtrZXl9IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cclxuICAgICAgICAgICAgPGlucHV0IHR5cGU9XCJyYWRpb1wiIHN0eWxlPXt7ZGlzcGxheTogXCJub25lXCJ9fSBuYW1lPXt0aGlzLnF1ZXN0aW9uLm5hbWV9IHZhbHVlPXtpdGVtLnZhbHVlfSBjaGVja2VkPXt0aGlzLnF1ZXN0aW9uLnZhbHVlID09IGl0ZW0udmFsdWV9IG9uQ2hhbmdlPXt0aGlzLmhhbmRsZU9uQ2hhbmdlfSAvPlxyXG4gICAgICAgICAgICB7bWlufVxyXG4gICAgICAgICAgICA8c3Bhbj57aXRlbS50ZXh0fTwvc3Bhbj5cclxuICAgICAgICAgICAge21heH1cclxuICAgICAgICAgICAgPC9sYWJlbD47XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgcmVuZGVyT3RoZXIoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIHJldHVybiAoPGRpdiBjbGFzc05hbWU9e3RoaXMuY3NzLm90aGVyfT48U3VydmV5UXVlc3Rpb25Db21tZW50SXRlbSAgcXVlc3Rpb249e3RoaXMucXVlc3Rpb259IGNzcz17dGhpcy5yb290Q3NzfSAvPjwvZGl2Pik7XHJcbiAgICB9XHJcbn1cclxuUmVhY3RRdWVzdGlvbkZhY3RvcnkuSW5zdGFuY2UucmVnaXN0ZXJRdWVzdGlvbihcInJhdGluZ1wiLCAocHJvcHMpID0+IHtcclxuICAgIHJldHVybiBSZWFjdC5jcmVhdGVFbGVtZW50KFN1cnZleVF1ZXN0aW9uUmF0aW5nLCBwcm9wcyk7XHJcbn0pO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL3JlYWN0L3JlYWN0cXVlc3Rpb25yYXRpbmcudHN4XG4gKiovIiwiaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xyXG5pbXBvcnQge1N1cnZleX0gZnJvbSBcIi4vcmVhY3RTdXJ2ZXlcIjtcclxuaW1wb3J0IHtTdXJ2ZXlNb2RlbH0gZnJvbSBcIi4uL3N1cnZleVwiO1xyXG5cclxuZXhwb3J0IGNsYXNzIFN1cnZleVdpbmRvdyBleHRlbmRzIFN1cnZleSB7XHJcbiAgICBwcml2YXRlIHRpdGxlOiBzdHJpbmc7XHJcbiAgICBjb25zdHJ1Y3Rvcihwcm9wczogYW55KSB7XHJcbiAgICAgICAgc3VwZXIocHJvcHMpO1xyXG4gICAgICAgIHRoaXMuaGFuZGxlT25FeHBhbmRlZCA9IHRoaXMuaGFuZGxlT25FeHBhbmRlZC5iaW5kKHRoaXMpO1xyXG4gICAgfVxyXG4gICAgaGFuZGxlT25FeHBhbmRlZChldmVudCkge1xyXG4gICAgICAgIHRoaXMuc3RhdGUuZXhwYW5kZWQgPSAhdGhpcy5zdGF0ZS5leHBhbmRlZDtcclxuICAgICAgICB0aGlzLnNldFN0YXRlKHRoaXMuc3RhdGUpO1xyXG4gICAgfVxyXG4gICAgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICBpZiAodGhpcy5zdGF0ZS5oaWRkZW4pIHJldHVybiBudWxsO1xyXG4gICAgICAgIHZhciBoZWFkZXIgPSB0aGlzLnJlbmRlckhlYWRlcigpO1xyXG4gICAgICAgIHZhciBib2R5ID0gdGhpcy5zdGF0ZS5leHBhbmRlZCA/IHRoaXMucmVuZGVyQm9keSgpIDogbnVsbDtcclxuICAgICAgICB2YXIgc3R5bGUgPSB7IHBvc2l0aW9uOiBcImZpeGVkXCIsIGJvdHRvbTogXCIzcHhcIiwgcmlnaHQ6IFwiMTBweFwiIH07XHJcbiAgICAgICAgcmV0dXJuIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmNzcy53aW5kb3cucm9vdH0gc3R5bGU9e3N0eWxlfT5cclxuICAgICAgICAgICAge2hlYWRlcn1cclxuICAgICAgICAgICAge2JvZHl9XHJcbiAgICAgICAgICAgIDwvZGl2PjtcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCByZW5kZXJIZWFkZXIoKTogSlNYLkVsZW1lbnQge1xyXG4gICAgICAgIHZhciBzdHlsZUEgPSB7IHdpZHRoOiBcIjEwMCVcIiB9O1xyXG4gICAgICAgIHZhciBzdHlsZVRpdGxlID0geyBwYWRkaW5nUmlnaHQ6IFwiMTBweFwiIH07XHJcbiAgICAgICAgdmFyIGdseXBoQ2xhc3NOYW1lID0gdGhpcy5zdGF0ZS5leHBhbmRlZCA/IHRoaXMuY3NzLndpbmRvdy5oZWFkZXIuYnV0dG9uQ29sbGFwc2VkIDogdGhpcy5jc3Mud2luZG93LmhlYWRlci5idXR0b25FeHBhbmRlZDtcclxuICAgICAgICBnbHlwaENsYXNzTmFtZSA9IFwiZ2x5cGhpY29uIHB1bGwtcmlnaHQgXCIgKyBnbHlwaENsYXNzTmFtZTtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzc05hbWU9e3RoaXMuY3NzLndpbmRvdy5oZWFkZXIucm9vdH0+XHJcbiAgICAgICAgICAgIDxhIGhyZWY9XCIjXCIgb25DbGljaz17dGhpcy5oYW5kbGVPbkV4cGFuZGVkfSBzdHlsZT17c3R5bGVBfT5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17dGhpcy5jc3Mud2luZG93LmhlYWRlci50aXRsZX0gc3R5bGU9e3N0eWxlVGl0bGV9Pnt0aGlzLnRpdGxlfTwvc3Bhbj5cclxuICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17Z2x5cGhDbGFzc05hbWV9IGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjwvc3Bhbj5cclxuICAgICAgICAgICAgPC9hPlxyXG4gICAgICAgIDwvZGl2PjtcclxuICAgIH1cclxuICAgIHByb3RlY3RlZCByZW5kZXJCb2R5KCk6IEpTWC5FbGVtZW50IHtcclxuICAgICAgICByZXR1cm4gPGRpdiBjbGFzcz17dGhpcy5jc3Mud2luZG93LmJvZHl9PlxyXG4gICAgICAgIHt0aGlzLnJlbmRlclN1cnZleSgpIH1cclxuICAgICAgICAgICAgPC9kaXY+XHJcbiAgICB9XHJcbiAgICBwcm90ZWN0ZWQgdXBkYXRlU3VydmV5KG5ld1Byb3BzOiBhbnkpIHtcclxuICAgICAgICBzdXBlci51cGRhdGVTdXJ2ZXkobmV3UHJvcHMpO1xyXG4gICAgICAgIHRoaXMudGl0bGUgPSBuZXdQcm9wcy50aXRsZSA/IG5ld1Byb3BzLnRpdGxlIDogdGhpcy5zdXJ2ZXkudGl0bGU7XHJcbiAgICAgICAgdmFyIGhhc0V4cGFuZGVkID0gbmV3UHJvcHNbXCJleHBhbmRlZFwiXSA/IG5ld1Byb3BzLmV4cGFuZGVkIDogZmFsc2U7XHJcbiAgICAgICAgdGhpcy5zdGF0ZSA9IHsgZXhwYW5kZWQ6IGhhc0V4cGFuZGVkLCBoaWRkZW46IGZhbHNlIH07XHJcbiAgICAgICAgdmFyIHNlbGYgPSB0aGlzO1xyXG4gICAgICAgIHRoaXMuc3VydmV5Lm9uQ29tcGxldGUuYWRkKGZ1bmN0aW9uIChzOiBTdXJ2ZXlNb2RlbCkge1xyXG4gICAgICAgICAgICBzZWxmLnN0YXRlLmhpZGRlbiA9IHRydWU7XHJcbiAgICAgICAgICAgIHNlbGYuc2V0U3RhdGUoc2VsZi5zdGF0ZSk7XHJcbiAgICAgICAgfSk7XHJcbiAgICB9XHJcbn1cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9yZWFjdC9yZWFjdFN1cnZleVdpbmRvdy50c3hcbiAqKi8iLCJpbXBvcnQgJy4uLy4uL2xvY2FsaXphdGlvbi9kYW5pc2gnO1xyXG5pbXBvcnQgJy4uLy4uL2xvY2FsaXphdGlvbi9kdXRjaCc7XHJcbmltcG9ydCAnLi4vLi4vbG9jYWxpemF0aW9uL2Zpbm5pc2gnO1xyXG5pbXBvcnQgJy4uLy4uL2xvY2FsaXphdGlvbi9mcmVuY2gnO1xyXG5pbXBvcnQgJy4uLy4uL2xvY2FsaXphdGlvbi9nZXJtYW4nO1xyXG5pbXBvcnQgJy4uLy4uL2xvY2FsaXphdGlvbi9ncmVlayc7XHJcbmltcG9ydCAnLi4vLi4vbG9jYWxpemF0aW9uL3BvbGlzaCc7XHJcbmltcG9ydCAnLi4vLi4vbG9jYWxpemF0aW9uL3J1c3NpYW4nO1xyXG5pbXBvcnQgJy4uLy4uL2xvY2FsaXphdGlvbi90dXJraXNoJztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9lbnRyaWVzL2NodW5rcy9sb2NhbGl6YXRpb24udHNcbiAqKi8iLCJpbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4uL3N1cnZleVN0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCB2YXIgZGFuaXNoU3VydmV5U3RyaW5ncyA9IHtcclxuICAgIHBhZ2VQcmV2VGV4dDogXCJUaWxiYWdlXCIsXHJcbiAgICBwYWdlTmV4dFRleHQ6IFwiVmlkZXJlXCIsXHJcbiAgICBjb21wbGV0ZVRleHQ6IFwiRsOmcmRpZ1wiLFxyXG4gICAgcHJvZ3Jlc3NUZXh0OiBcIlNpZGUgezB9IGFmIHsxfVwiLFxyXG4gICAgZW1wdHlTdXJ2ZXk6IFwiRGVyIGVyIGluZ2VuIHN5bmxpZ2Ugc3DDuHJnc23DpWwuXCIsXHJcbiAgICBjb21wbGV0aW5nU3VydmV5OiBcIk1hbmdlIHRhayBmb3IgZGluIGJlc3ZhcmVsc2UhXCIsXHJcbiAgICBsb2FkaW5nU3VydmV5OiBcIlNww7hyZ2Vza2VtYWV0IGhlbnRlcyBmcmEgc2VydmVyZW4uLi5cIixcclxuICAgIG90aGVySXRlbVRleHQ6IFwiVmFsZ2ZyaXQgc3Zhci4uLlwiLFxyXG4gICAgb3B0aW9uc0NhcHRpb246IFwiVsOmbGcuLi5cIixcclxuICAgIHJlcXVpcmVkRXJyb3I6IFwiQmVzdmFyIHZlbmxpZ3N0IHNww7hyZ3Ntw6VsZXQuXCIsXHJcbiAgICBudW1lcmljRXJyb3I6IFwiQW5naXYgZXQgdGFsLlwiLFxyXG4gICAgdGV4dE1pbkxlbmd0aDogXCJBbmdpdiBtaW5kc3QgezB9IHRlZ24uXCIsXHJcbiAgICBtaW5TZWxlY3RFcnJvcjogXCJWw6ZsZyB2ZW5saWdzdCBtaW5kc3QgIHswfSBzdmFybXVsaWdoZWQoZXIpLlwiLFxyXG4gICAgbWF4U2VsZWN0RXJyb3I6IFwiVsOmbGcgdmVubGlnc3QgZsOmcnJlIHswfSBzdmFybXVsaWdoZWRlcihlcikuXCIsXHJcbiAgICBudW1lcmljTWluTWF4OiBcIid7MH0nIHNrYWwgdsOmcmUgbGlnIG1lZCBlbGxlciBzdMO4cnJlIGVuZCB7MX0gb2cgbGlnIG1lZCBlbGxlciBtaW5kcmUgZW5kIHsyfVwiLFxyXG4gICAgbnVtZXJpY01pbjogXCInezB9JyBza2FsIHbDpnJlIGxpZyBtZWQgZWxsZXIgc3TDuHJyZSBlbmQgezF9XCIsXHJcbiAgICBudW1lcmljTWF4OiBcIid7MH0nIHNrYWwgdsOmcmUgbGlnIG1lZCBlbGxlciBtaW5kcmUgZW5kIHsxfVwiLFxyXG4gICAgaW52YWxpZEVtYWlsOiBcIkFuZ2l2IHZlbmxpZ3N0IGVuIGd5bGRpZyBlLW1haWwgYWRyZXNzZS5cIixcclxuICAgIGV4Y2VlZE1heFNpemU6IFwiRmlsc3TDuHJyZWxzZW4gbcOlIGlra2Ugb3ZlcnN0aWdlIHswfS5cIixcclxuICAgIG90aGVyUmVxdWlyZWRFcnJvcjogXCJBbmdpdiBlbiB2w6ZyZGkgZm9yIGRpdCB2YWxnZnJpZSBzdmFyLlwiXHJcbn07XHJcblxyXG5zdXJ2ZXlMb2NhbGl6YXRpb24ubG9jYWxlc1tcImRhXCJdID0gZGFuaXNoU3VydmV5U3RyaW5ncztcclxuXG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvbG9jYWxpemF0aW9uL2RhbmlzaC50c1xuICoqLyIsIi8vQ3JlYXRlZCBvbiBiZWhhbGYgaHR0cHM6Ly9naXRodWIuY29tL0ZyYW5rMTNcclxuaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcblxyXG5leHBvcnQgdmFyIGR1dGNoU3VydmV5U3RyaW5ncyA9IHtcclxuICAgIHBhZ2VQcmV2VGV4dDogXCJWb3JpZ2VcIixcclxuICAgIHBhZ2VOZXh0VGV4dDogXCJWb2xnZW5kZVwiLFxyXG4gICAgY29tcGxldGVUZXh0OiBcIkFmc2x1aXRlblwiLFxyXG4gICAgb3RoZXJJdGVtVGV4dDogXCJBbmRlcmVcIixcclxuICAgIHByb2dyZXNzVGV4dDogXCJQYWdpbmEgezB9IHZhbiB7MX1cIixcclxuICAgIGVtcHR5U3VydmV5OiBcIkVyIGlzIGdlZW4gemljaHRiYXJlIHBhZ2luYSBvZiB2cmFhZyBpbiBkZXplIHZyYWdlbmxpanN0XCIsXHJcbiAgICBjb21wbGV0aW5nU3VydmV5OiBcIkJlZGFua3Qgb20gZGV6ZSB2cmFnZW5saWpzdCBpbiB0ZSB2dWxsZW5cIixcclxuICAgIGxvYWRpbmdTdXJ2ZXk6IFwiRGUgdnJhZ2VubGlqc3QgaXMgYWFuIGhldCBsYWRlbi4uLlwiLFxyXG4gICAgb3B0aW9uc0NhcHRpb246IFwiS2llcy4uLlwiLFxyXG4gICAgcmVxdWlyZWRFcnJvcjogXCJHZWxpZXZlIGVlbiBhbnR3b29yZCBpbiB0ZSB2dWxsZW5cIixcclxuICAgIG51bWVyaWNFcnJvcjogXCJIZXQgYW50d29vcmQgbW9ldCBlZW4gZ2V0YWwgemlqblwiLFxyXG4gICAgdGV4dE1pbkxlbmd0aDogXCJHZWxpZXZlIG1pbnN0ZW4gezB9IGthcmFrdGVycyBpbiB0ZSB2dWxsZW4uXCIsXHJcbiAgICBtaW5TZWxlY3RFcnJvcjogXCJHZWxpZXZlIG1pbmltdW0gezB9IGFudHdvb3JkZW4gdGUgc2VsZWN0ZXJlbi5cIixcclxuICAgIG1heFNlbGVjdEVycm9yOiBcIkdlbGlldmUgbmlldCBtZWVyIGRhbiB7MH0gYW50d29vcmRlbiB0ZSBzZWxlY3RlcmVuLlwiLFxyXG4gICAgbnVtZXJpY01pbk1heDogXCJVdyBhbnR3b29yZCAnezB9JyBtb2V0IGdyb3RlciBvZiBnZWxpamsgemlqbiBhYW4gezF9IGVuIGtsZWluZXIgb2YgZ2VsaWprIGFhbiB7Mn1cIixcclxuICAgIG51bWVyaWNNaW46IFwiVXcgYW50d29vcmQgJ3swfScgbW9ldCBncm90ZXIgb2YgZ2VsaWprIHppam4gYWFuIHsxfVwiLFxyXG4gICAgbnVtZXJpY01heDogXCJVdyBhbnR3b29yZCAnezB9JyBtb2V0IGdyb3RlciBvZiBnZWxpamsgemlqbiBhYW4gezF9XCIsXHJcbiAgICBpbnZhbGlkRW1haWw6IFwiR2VsaWV2ZSBlZW4gZ2VsZGlnIGUtbWFpbGFkcmVzIGluIHRlIHZ1bGxlbi5cIixcclxuICAgIGV4Y2VlZE1heFNpemU6IFwiRGUgZ3Jvb3R0ZSB2YW4gaGV0IGJlc3RhbmQgbWFnIG5pZXQgZ3JvdGVyIHppam4gZGFuIHswfS5cIixcclxuICAgIG90aGVyUmVxdWlyZWRFcnJvcjogXCJHZWxpZXZlIGhldCB2ZWxkICdBbmRlcmUnIGluIHRlIHZ1bGxlblwiXHJcbn07XHJcblxyXG5zdXJ2ZXlMb2NhbGl6YXRpb24ubG9jYWxlc1tcIm5sXCJdID0gZHV0Y2hTdXJ2ZXlTdHJpbmdzO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2NhbGl6YXRpb24vZHV0Y2gudHNcbiAqKi8iLCJpbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4uL3N1cnZleVN0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCB2YXIgZmlubmlzaFN1cnZleVN0cmluZ3MgPSB7XHJcbiAgICBwYWdlUHJldlRleHQ6IFwiRWRlbGxpbmVuXCIsXHJcbiAgICBwYWdlTmV4dFRleHQ6IFwiU2V1cmFhdmFcIixcclxuICAgIGNvbXBsZXRlVGV4dDogXCJWYWxtaXNcIixcclxuICAgIG90aGVySXRlbVRleHQ6IFwiTXV1IChrdXZhaWxlKVwiLFxyXG4gICAgcHJvZ3Jlc3NUZXh0OiBcIlNpdnUgezB9L3sxfVwiLFxyXG4gICAgZW1wdHlTdXJ2ZXk6IFwiVMOkc3PDpCBreXNlbHlzc8OkIGVpIG9sZSB5aHTDpGvDpMOkbiBuw6RreXZpbGzDpCBvbGV2YWEgc2l2dWEgdGFpIGt5c3lteXN0w6QuXCIsXHJcbiAgICBjb21wbGV0aW5nU3VydmV5OiBcIktpaXRvcyBreXNlbHl5biB2YXN0YWFtaXNlc3RhIVwiLFxyXG4gICAgbG9hZGluZ1N1cnZleTogXCJLeXNlbHnDpCBsYWRhdGFhbiBwYWx2ZWxpbWVsdGEuLi5cIixcclxuICAgIG9wdGlvbnNDYXB0aW9uOiBcIlZhbGl0c2UuLi5cIixcclxuICAgIHJlcXVpcmVkRXJyb3I6IFwiVmFzdGFhIGt5c3lteWtzZWVuLCBraWl0b3MuXCIsXHJcbiAgICBudW1lcmljRXJyb3I6IFwiQXJ2b24gdHVsZWUgb2xsYSBudW1lZXJpbmVuLlwiLFxyXG4gICAgdGV4dE1pbkxlbmd0aDogXCJPbGUgaHl2w6QgamEgc3nDtnTDpCB2w6RoaW50w6TDpG4gezB9IG1lcmtracOkLlwiLFxyXG4gICAgbWluU2VsZWN0RXJyb3I6IFwiT2xlIGh5dsOkIGphIHZhbGl0c2UgdsOkaGludMOkw6RuIHswfSB2YWlodG9laHRvYS5cIixcclxuICAgIG1heFNlbGVjdEVycm9yOiBcIk9sZSBoeXbDpCBqYSB2YWxpdHNlIGVuaW50w6TDpG4gezB9IHZhaWh0b2VodG9hLlwiLFxyXG4gICAgbnVtZXJpY01pbk1heDogXCInezB9JyB0w6R5dHl5IG9sbGEgZW5lbW3DpG4gdGFpIHlodMOkIHN1dXJpIGt1aW4gezF9IGphIHbDpGhlbW3DpG4gdGFpIHlodMOkIHN1dXJpIGt1aW4gezJ9XCIsXHJcbiAgICBudW1lcmljTWluOiBcIid7MH0nIHTDpHl0eXkgb2xsYSBlbmVtbcOkbiB0YWkgeWh0w6Qgc3V1cmkga3VpbiB7MX1cIixcclxuICAgIG51bWVyaWNNYXg6IFwiJ3swfScgdMOkeXR5eSBvbGxhIHbDpGhlbW3DpG4gdGFpIHlodMOkIHN1dXJpIGt1aW4gezF9XCIsXHJcbiAgICBpbnZhbGlkRW1haWw6IFwiU3nDtnTDpCB2YWxpZGkgc8OkaGvDtnBvc3Rpb3NvaXRlLlwiLFxyXG4gICAgb3RoZXJSZXF1aXJlZEVycm9yOiBcIk9sZSBoeXbDpCBqYSBzecO2dMOkIFxcXCJNdXUgKGt1dmFpbGUpXFxcIlwiXHJcbn07XHJcblxyXG5zdXJ2ZXlMb2NhbGl6YXRpb24ubG9jYWxlc1tcImZpXCJdID0gZmlubmlzaFN1cnZleVN0cmluZ3M7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2xvY2FsaXphdGlvbi9maW5uaXNoLnRzXG4gKiovIiwiLy9DcmVhdGVkIG9uIGJlaGFsZiBodHRwczovL2dpdGh1Yi5jb20vRnJhbmsxM1xyXG5pbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4uL3N1cnZleVN0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCB2YXIgZnJlbmNoU3VydmV5U3RyaW5ncyA9IHtcclxuICAgIHBhZ2VQcmV2VGV4dDogXCJQclxcdTAwZTljXFx1MDBlOWRlbnRcIixcclxuICAgIHBhZ2VOZXh0VGV4dDogXCJTdWl2YW50XCIsXHJcbiAgICBjb21wbGV0ZVRleHQ6IFwiVGVybWluZXJcIixcclxuICAgIG90aGVySXRlbVRleHQ6IFwiQXV0cmUgKHByXFx1MDBlOWNpc2VyKVwiLFxyXG4gICAgcHJvZ3Jlc3NUZXh0OiBcIlBhZ2UgezB9IHN1ciB7MX1cIixcclxuICAgIGVtcHR5U3VydmV5OiBcIklsIG4neSBhIG5pIHBhZ2UgdmlzaWJsZSBuaSBxdWVzdGlvbiB2aXNpYmxlIGRhbnMgY2UgcXVlc3Rpb25uYWlyZVwiLFxyXG4gICAgY29tcGxldGluZ1N1cnZleTogXCJNZXJjaSBkJ2F2b2lyIHJcXHUwMGU5cG9uZHUgYXUgcXVlc3Rpb25uYWlyZSFcIixcclxuICAgIGxvYWRpbmdTdXJ2ZXk6IFwiTGUgcXVlc3Rpb25uYWlyZSBlc3QgZW4gY291cnMgZGUgY2hhcmdlbWVudC4uLlwiLFxyXG4gICAgb3B0aW9uc0NhcHRpb246IFwiQ2hvaXNpc3Nlei4uLlwiLFxyXG4gICAgcmVxdWlyZWRFcnJvcjogXCJMYSByXFx1MDBlOXBvbnNlIFxcdTAwZTAgY2V0dGUgcXVlc3Rpb24gZXN0IG9ibGlnYXRvaXJlLlwiLFxyXG4gICAgbnVtZXJpY0Vycm9yOiBcIkxhIHJcXHUwMGU5cG9uc2UgZG9pdCBcXHUwMGVhdHJlIHVuIG5vbWJyZS5cIixcclxuICAgIHRleHRNaW5MZW5ndGg6IFwiTWVyY2kgZCdlbnRyZXIgYXUgbW9pbnMgezB9IHN5bWJvbGVzLlwiLFxyXG4gICAgbWluU2VsZWN0RXJyb3I6IFwiTWVyY2kgZGUgc1xcdTAwZTlsZWN0aW9ubmVyIGF1IG1vaW5zIHswfXJcXHUwMGU5cG9uc2VzLlwiLFxyXG4gICAgbWF4U2VsZWN0RXJyb3I6IFwiTWVyY2kgZGUgc1xcdTAwZTlsZWN0aW9ubmVyIGF1IHBsdXMgezB9clxcdTAwZTlwb25zZXMuXCIsXHJcbiAgICBudW1lcmljTWluTWF4OiBcIlZvdHJlIHJcXHUwMGU5cG9uc2UgJ3swfScgZG9pdCBcXHUwMGVhdHJlc3VwXFx1MDBlOXJpZXVyZSBvdSBcXHUwMGU5Z2FsZSBcXHUwMGUwIHsxfSBldCBpbmZcXHUwMGU5cmlldXJlIG91XFx1MDBlOWdhbGUgXFx1MDBlMCB7Mn1cIixcclxuICAgIG51bWVyaWNNaW46IFwiVm90cmUgclxcdTAwZTlwb25zZSAnezB9JyBkb2l0IFxcdTAwZWF0cmVzdXBcXHUwMGU5cmlldXJlIG91IFxcdTAwZTlnYWxlIFxcdTAwZTAgezF9XCIsXHJcbiAgICBudW1lcmljTWF4OiBcIlZvdHJlIHJcXHUwMGU5cG9uc2UgJ3swfScgZG9pdCBcXHUwMGVhdHJlaW5mXFx1MDBlOXJpZXVyZSBvdSBcXHUwMGU5Z2FsZSBcXHUwMGUwIHsxfVwiLFxyXG4gICAgaW52YWxpZEVtYWlsOiBcIk1lcmNpIGQnZW50cmVyIHVuZSBhZHJlc3NlIG1haWwgdmFsaWRlLlwiLFxyXG4gICAgZXhjZWVkTWF4U2l6ZTogXCJMYSB0YWlsbGUgZHUgZmljaGllciBuZSBkb2l0IHBhcyBleGNcXHUwMGU5ZGVyIHswfS5cIixcclxuICAgIG90aGVyUmVxdWlyZWRFcnJvcjogXCJNZXJjaSBkZSBwclxcdTAwZTljaXNlciBsZSBjaGFtcCAnQXV0cmUnLlwiXHJcbn07XHJcbnN1cnZleUxvY2FsaXphdGlvbi5sb2NhbGVzW1wiZnJcIl0gPSBmcmVuY2hTdXJ2ZXlTdHJpbmdzO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2xvY2FsaXphdGlvbi9mcmVuY2gudHNcbiAqKi8iLCJpbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4uL3N1cnZleVN0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCB2YXIgZ2VybWFuU3VydmV5U3RyaW5ncyA9IHtcclxuICAgIHBhZ2VQcmV2VGV4dDogXCJadXLDvGNrXCIsXHJcbiAgICBwYWdlTmV4dFRleHQ6IFwiV2VpdGVyXCIsXHJcbiAgICBjb21wbGV0ZVRleHQ6IFwiRmVydGlnXCIsXHJcbiAgICBwcm9ncmVzc1RleHQ6IFwiU2VpdGUgezB9IHZvbiB7MX1cIixcclxuICAgIGVtcHR5U3VydmV5OiBcIkVzIGdpYnQga2VpbmUgc2ljaHRiYXJlIEZyYWdlLlwiLFxyXG4gICAgY29tcGxldGluZ1N1cnZleTogXCJWaWVsZW4gRGFuayBmw7xyIGRhcyBBdXNmw7xsbGVuIGRlcyBGcmFnZWJvZ2VucyFcIixcclxuICAgIGxvYWRpbmdTdXJ2ZXk6IFwiRGVyIEZyYWdlYm9nZW4gd2lyZCB2b20gU2VydmVyIGdlbGFkZW4uLi5cIixcclxuICAgIG90aGVySXRlbVRleHQ6IFwiQmVudXR6ZXJkZWZpbmllcnRlIEFudHdvcnQuLi5cIixcclxuICAgIG9wdGlvbnNDYXB0aW9uOiBcIlfDpGhsZW4uLi5cIixcclxuICAgIHJlcXVpcmVkRXJyb3I6IFwiQml0dGUgYW50d29ydGVuIFNpZSBhdWYgZGllIEZyYWdlLlwiLFxyXG4gICAgbnVtZXJpY0Vycm9yOiBcIkRlciBXZXJ0IHNvbGx0ZSBlaW5lIFphaGwgc2Vpbi5cIixcclxuICAgIHRleHRNaW5MZW5ndGg6IFwiQml0dGUgZ2ViZW4gU2llIG1pbmRlc3RlbnMgezB9IFN5bWJvbGUuXCIsXHJcbiAgICBtaW5TZWxlY3RFcnJvcjogXCJCaXR0ZSB3w6RobGVuIFNpZSBtaW5kZXN0ZW5zIHswfSBWYXJpYW50ZW4uXCIsXHJcbiAgICBtYXhTZWxlY3RFcnJvcjogXCJCaXR0ZSB3w6RobGVuIFNpZSBuaWNodCBtZWhyIGFscyB7MH0gVmFyaWFudGVuLlwiLFxyXG4gICAgbnVtZXJpY01pbk1heDogXCInezB9JyBzb2x0ZSBnbGVpY2ggb2RlciBncsO2w59lciBzZWluIGFscyB7MX0gdW5kIGdsZWljaCBvZGVyIGtsZWluZXIgYWxzIHsyfVwiLFxyXG4gICAgbnVtZXJpY01pbjogXCInezB9JyBzb2x0ZSBnbGVpY2ggb2RlciBncsO2w59lciBzZWluIGFscyB7MX1cIixcclxuICAgIG51bWVyaWNNYXg6IFwiJ3swfScgc29sdGUgZ2xlaWNoIG9kZXIga2xlaW5lciBhbHMgezF9XCIsXHJcbiAgICBpbnZhbGlkRW1haWw6IFwiQml0dGUgZ2ViZW4gU2llIGVpbmUgZ8O8bHRpZ2UgRW1haWwtQWRyZXNzZSBlaW4uXCIsXHJcbiAgICBleGNlZWRNYXhTaXplOiBcIkRpZSBEYXRlaWdyw7bDn2Ugc29sbCBuaWNodCBtZWhyIGFscyB7MH0uXCIsXHJcbiAgICBvdGhlclJlcXVpcmVkRXJyb3I6IFwiQml0dGUgZ2ViZW4gU2llIGVpbmVuIFdlcnQgZsO8ciBJaHJlIGJlbnV0emVyZGVmaW5pZXJ0ZSBBbnR3b3J0IGVpbi5cIlxyXG59O1xyXG5cclxuc3VydmV5TG9jYWxpemF0aW9uLmxvY2FsZXNbXCJkZVwiXSA9IGdlcm1hblN1cnZleVN0cmluZ3M7XHJcblxuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2xvY2FsaXphdGlvbi9nZXJtYW4udHNcbiAqKi8iLCIvL0NyZWF0ZWQgYnkgaHR0cHM6Ly9naXRodWIuY29tL2FnZWxvc3BhbmFnaW90YWtpc1xyXG5pbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4uL3N1cnZleVN0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCB2YXIgZ3JlZWtTdXJ2ZXlTdHJpbmdzID0ge1xyXG4gICAgcGFnZVByZXZUZXh0OiBcIs6gz4HOv863zrPOv8+NzrzOtc69zr9cIixcclxuICAgIHBhZ2VOZXh0VGV4dDogXCLOlc+Az4zOvM61zr3Ov1wiLFxyXG4gICAgY29tcGxldGVUZXh0OiBcIs6fzrvOv866zrvOrs+Bz4nPg863XCIsXHJcbiAgICBvdGhlckl0ZW1UZXh0OiBcIs6GzrvOu86/ICjPgM6xz4HOsc66zrHOu8+OIM60zrnOtc+FzrrPgc65zr3Or8+Dz4TOtSlcIixcclxuICAgIHByb2dyZXNzVGV4dDogXCLOo861zrvOr860zrEgezB9IM6xz4DPjCB7MX1cIixcclxuICAgIGVtcHR5U3VydmV5OiBcIs6UzrXOvSDPhc+AzqzPgc+HzrXOuSDOus6xzrzOr86xIM6/z4HOsc+Ezq4gz4POtc67zq/OtM6xIM6uIM6/z4HOsc+Ezq4gzrXPgc+Oz4TOt8+Dzrcgz4POtSDOsc+Fz4TPjCDPhM6/IM61z4HPic+EzrfOvM6xz4TOv867z4zOs865zr8uXCIsXHJcbiAgICBjb21wbGV0aW5nU3VydmV5OiBcIs6Vz4XPh86xz4HOuc+Dz4TOv8+NzrzOtSDOs865zrEgz4TOt869IM+Dz4XOvM+AzrvOrs+Bz4nPg863IM6xz4XPhM6/z4Ugz4TOv8+FIM61z4HPic+EzrfOvM6xz4TOv867zr/Os86vzr/PhSFcIixcclxuICAgIGxvYWRpbmdTdXJ2ZXk6IFwizqTOvyDOtc+Bz4nPhM63zrzOsc+Ezr/Ou8+MzrPOuc6/IM+Gzr/Pgc+Ez47Ovc61z4TOsc65IM6xz4DOvyDPhM6/IM60zrnOsc66zr/OvM65z4PPhM6uLi4uXCIsXHJcbiAgICBvcHRpb25zQ2FwdGlvbjogXCLOlc+AzrnOu86tzr7PhM61Li4uXCIsXHJcbiAgICByZXF1aXJlZEVycm9yOiBcIs6gzrHPgc6xzrrOsc67z44gzrHPgM6xzr3PhM6uz4PPhM61IM+Dz4TOt869IM61z4HPjs+EzrfPg863LlwiLFxyXG4gICAgcmVxdWlyZWRJbkFsbFJvd3NFcnJvcjogXCLOoM6xz4HOsc66zrHOu8+OIM6xz4DOsc69z4TOrs+Dz4TOtSDPg8+EzrnPgiDOtc+Bz4nPhM6uz4POtc65z4Igz4POtSDPjM67zrXPgiDPhM65z4IgzrPPgc6xzrzOvM6tz4IuXCIsXHJcbiAgICBudW1lcmljRXJyb3I6IFwizpcgz4TOuc68zq4gz4DPgc6tz4DOtc65IM69zrEgzrXOr869zrHOuSDOsc+BzrnOuM68zrnPhM65zrrOri5cIixcclxuICAgIHRleHRNaW5MZW5ndGg6IFwizqDOsc+BzrHOus6xzrvPjiDPg8+FzrzPgM67zrfPgc+Oz4PPhM61IM+Ezr/Phc67zqzPh865z4PPhM6/zr0gezB9IM+Dz43OvM6yzr/Ou86xLlwiLFxyXG4gICAgbWluUm93Q291bnRFcnJvcjogXCLOoM6xz4HOsc66zrHOu8+OIM+Dz4XOvM+AzrvOt8+Bz47Pg8+EzrUgz4TOv8+FzrvOrM+HzrnPg8+Ezr/OvSB7MH0gzrPPgc6xzrzOvM6tz4IuXCIsXHJcbiAgICBtaW5TZWxlY3RFcnJvcjogXCLOoM6xz4HOsc66zrHOu8+OIM61z4DOuc67zq3Ovs+EzrUgz4TOv8+FzrvOrM+HzrnPg8+Ezr/OvSB7MH0gz4DOsc+BzrHOu867zrHOs86tz4IuXCIsXHJcbiAgICBtYXhTZWxlY3RFcnJvcjogXCLOoM6xz4HOsc66zrHOu8+OIM61z4DOuc67zq3Ovs+EzrUgz4zPh865IM+AzrHPgc6xz4DOrM69z4kgzrHPgM6/IHswfSDPgM6xz4HOsc67zrvOsc6zzq3Pgi5cIixcclxuICAgIG51bWVyaWNNaW5NYXg6IFwizqTOvyAnezB9JyDOuM6xIM+Az4HOrc+AzrXOuSDOvc6xIM61zq/Ovc6xzrkgzq/Pg86/IM6uIM68zrXOs86xzrvPjc+EzrXPgc6/IM6xz4DOvyDPhM6/IHsxfSDOus6xzrkgzq/Pg86/IM6uIM68zrnOus+Bz4zPhM61z4HOvyDOsc+Azr8gz4TOvyB7Mn1cIixcclxuICAgIG51bWVyaWNNaW46IFwizqTOvyAnezB9JyDPgM+Bzq3PgM61zrkgzr3OsSDOtc6vzr3Osc65IM68zrXOs86xzrvPjc+EzrXPgc6/IM6uIM65z4POvyDOvM61IM+Ezr8gezF9XCIsXHJcbiAgICBudW1lcmljTWF4OiBcIs6kzr8gJ3swfScgz4DPgc6tz4DOtc65IM69zrEgzrXOr869zrHOuSDOvM65zrrPgc+Mz4TOtc+Bzr8gzq4gzq/Pg86/IM6xz4DOvyDPhM6/IHsxfVwiLFxyXG4gICAgaW52YWxpZEVtYWlsOiBcIs6gzrHPgc6xzrrOsc67z44gzrTPjs+Dz4TOtSDOvM65zrEgzrHPgM6/zrTOtc66z4TOriDOtM65zrXPjc64z4XOvc+DzrcgZS1tYWlsLlwiLFxyXG4gICAgdXJsUmVxdWVzdEVycm9yOiBcIs6XIM6xzq/PhM63z4POtyDOtc+Azq3Pg8+Ez4HOtc+IzrUgz4PPhs6szrvOvM6xICd7MH0nLiB7MX1cIixcclxuICAgIHVybEdldENob2ljZXNFcnJvcjogXCLOlyDOsc6vz4TOt8+DzrcgzrXPgM6tz4PPhM+BzrXPiM61IM66zrXOvc6sIM60zrXOtM6/zrzOrc69zrEgzq4gzrcgzrnOtM+Mz4TOt8+EzrEgJ868zr/Ovc6/z4DOrM+EzrkvcGF0aCcgzrXOr869zrHOuSDOtc+Dz4bOsc67zq3OvM6tzr3Ot1wiLFxyXG4gICAgZXhjZWVkTWF4U2l6ZTogXCLOpM6/IM68zq3Os861zrjOv8+CIM60zrXOvSDOvM+Azr/Pgc61zq8gzr3OsSDPhc+AzrXPgc6yzq3Ovc61zrkgz4TOsSB7MH0uXCIsXHJcbiAgICBvdGhlclJlcXVpcmVkRXJyb3I6IFwizqDOsc+BzrHOus6xzrvPjiDPg8+FzrzPgM67zrfPgc+Oz4PPhM61IM+EzrfOvSDPhM65zrzOriDOs865zrEgz4TOvyDPgM61zrTOr86/ICfOrM67zrvOvycuXCIsXHJcbiAgICB1cGxvYWRpbmdGaWxlOiBcIs6kzr8gzrHPgc+HzrXOr86/IM+DzrHPgiDOsc69zrXOss6xzq/Ovc61zrkuIM6gzrHPgc6xzrrOsc67z44gz4DOtc+BzrnOvM6tzr3Otc+EzrUgzrrOsc+Azr/Ouc6xIM60zrXPhc+EzrXPgc+MzrvOtc+Az4TOsSDOus6xzrkgzrTOv866zrnOvM6sz4PPhM61IM6+zrHOvc6sLlwiLFxyXG4gICAgYWRkUm93OiBcIs6gz4HOv8+DzrjOrs66zrcgzrPPgc6xzrzOvM6uz4JcIixcclxuICAgIHJlbW92ZVJvdzogXCLOkc+GzrHOr8+BzrXPg863XCJcclxufTtcclxuc3VydmV5TG9jYWxpemF0aW9uLmxvY2FsZXNbXCJnclwiXSA9IGdyZWVrU3VydmV5U3RyaW5ncztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2NhbGl6YXRpb24vZ3JlZWsudHNcbiAqKi8iLCJpbXBvcnQge3N1cnZleUxvY2FsaXphdGlvbn0gZnJvbSBcIi4uL3N1cnZleVN0cmluZ3NcIjtcclxuXHJcbmV4cG9ydCB2YXIgcG9saXNoU3VydmV5U3RyaW5ncyA9IHtcclxuICAgIHBhZ2VQcmV2VGV4dDogXCJXc3RlY3pcIixcclxuICAgIHBhZ2VOZXh0VGV4dDogXCJEYWxlalwiLFxyXG4gICAgY29tcGxldGVUZXh0OiBcIkdvdG93ZVwiLFxyXG4gICAgcHJvZ3Jlc3NUZXh0OiBcIlN0cm9uYSB7MH0geiB7MX1cIixcclxuICAgIGVtcHR5U3VydmV5OiBcIk5pZSBtYSB3aWRvY3pueWNoIHB5dGHFhC5cIixcclxuICAgIGNvbXBsZXRpbmdTdXJ2ZXk6IFwiRHppxJlrdWplbXkgemEgd3lwZcWCbmllbmllIGFua2lldHkhXCIsXHJcbiAgICBsb2FkaW5nU3VydmV5OiBcIlRyd2Egd2N6eXR5d2FuaWUgYW5raWV0eS4uLlwiLFxyXG4gICAgb3RoZXJJdGVtVGV4dDogXCJJbm5hIG9kcG93aWVkxbouLi5cIixcclxuICAgIG9wdGlvbnNDYXB0aW9uOiBcIld5YmllcnouLi5cIixcclxuICAgIHJlcXVpcmVkRXJyb3I6IFwiUHJvc3rEmSBvZHBvd2llZHppZcSHIG5hIHRvIHB5dGFuaWUuXCIsXHJcbiAgICBudW1lcmljRXJyb3I6IFwiVyB0eW0gcG9sdSBtb8W8bmEgd3Bpc2HEhyB0eWxrbyBsaWN6YnkuXCIsXHJcbiAgICB0ZXh0TWluTGVuZ3RoOiBcIlByb3N6xJkgd3Bpc2HEhyBjbyBuYWptbmllaiB7MH0gem5ha8Ozdy5cIixcclxuICAgIG1pblNlbGVjdEVycm9yOiBcIlByb3N6xJkgd3licmHEhyBjbyBuYWptbmllaiB7MH0gcG96eWNqaS5cIixcclxuICAgIG1heFNlbGVjdEVycm9yOiBcIlByb3N6xJkgd3licmHEhyBuaWUgd2nEmWNlaiBuacW8IHswfSBwb3p5Y2ppLlwiLFxyXG4gICAgbnVtZXJpY01pbk1heDogXCJPZHBvd2llZMW6ICd7MH0nIHBvd2lubmEgYnnEhyB3acSZa3N6YSBsdWIgcsOzd25hIHsxfSBvcmF6IG1uaWVqc3phIGx1YiByw7N3bmEgezJ9XCIsXHJcbiAgICBudW1lcmljTWluOiBcIk9kcG93aWVkxbogJ3swfScgcG93aW5uYSBiecSHIHdpxJlrc3phIGx1YiByw7N3bmEgezF9XCIsXHJcbiAgICBudW1lcmljTWF4OiBcIk9kcG93aWVkxbogJ3swfScgcG93aW5uYSBiecSHIG1uaWVqc3phIGx1YiByw7N3bmEgezF9XCIsXHJcbiAgICBpbnZhbGlkRW1haWw6IFwiUHJvc3rEmSBwb2RhxIcgcHJhd2lkxYJvd3kgYWRyZXMgZW1haWwuXCIsXHJcbiAgICBleGNlZWRNYXhTaXplOiBcIlJvem1pYXIgcHJ6ZXPFgmFuZWdvIHBsaWt1IG5pZSBtb8W8ZSBwcnpla3JhY3phxIcgezB9LlwiLFxyXG4gICAgb3RoZXJSZXF1aXJlZEVycm9yOiBcIlByb3N6xJkgcG9kYcSHIGlubsSFIG9kcG93aWVkxbouXCJcclxufTtcclxuXHJcbnN1cnZleUxvY2FsaXphdGlvbi5sb2NhbGVzW1wicGxcIl0gPSBwb2xpc2hTdXJ2ZXlTdHJpbmdzO1xyXG5cblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2NhbGl6YXRpb24vcG9saXNoLnRzXG4gKiovIiwiaW1wb3J0IHtzdXJ2ZXlMb2NhbGl6YXRpb259IGZyb20gXCIuLi9zdXJ2ZXlTdHJpbmdzXCI7XHJcblxyXG5leHBvcnQgdmFyIHJ1c3NpYW5TdXJ2ZXlTdHJpbmdzID0ge1xyXG4gICAgcGFnZVByZXZUZXh0OiBcItCd0LDQt9Cw0LRcIixcclxuICAgIHBhZ2VOZXh0VGV4dDogXCLQlNCw0LvQtdC1XCIsXHJcbiAgICBjb21wbGV0ZVRleHQ6IFwi0JPQvtGC0L7QstC+XCIsXHJcbiAgICBwcm9ncmVzc1RleHQ6IFwi0KHRgtGA0LDQvdC40YbQsCB7MH0g0LjQtyB7MX1cIixcclxuICAgIGVtcHR5U3VydmV5OiBcItCd0LXRgiDQvdC4INC+0LTQvdC+0LPQviDQstC+0L/RgNC+0YHQsC5cIixcclxuICAgIGNvbXBsZXRpbmdTdXJ2ZXk6IFwi0JHQu9Cw0LPQvtC00LDRgNC40Lwg0JLQsNGBINC30LAg0LfQsNC/0L7Qu9C90LXQvdC40LUg0LDQvdC60LXRgtGLIVwiLFxyXG4gICAgbG9hZGluZ1N1cnZleTogXCLQl9Cw0LPRgNGD0LfQutCwINGBINGB0LXRgNCy0LXRgNCwLi4uXCIsXHJcbiAgICBvdGhlckl0ZW1UZXh0OiBcItCU0YDRg9Cz0L7QtSAo0L/QvtC20LDQu9GD0LnRgdGC0LAsINC+0L/QuNGI0LjRgtC1KVwiLFxyXG4gICAgb3B0aW9uc0NhcHRpb246IFwi0JLRi9Cx0YDQsNGC0YwuLi5cIixcclxuICAgIHJlcXVpcmVkRXJyb3I6IFwi0J/QvtC20LDQu9GD0LnRgdGC0LAsINC+0YLQstC10YLRjNGC0LUg0L3QsCDQstC+0L/RgNC+0YEuXCIsXHJcbiAgICBudW1lcmljRXJyb3I6IFwi0J7RgtCy0LXRgiDQtNC+0LvQttC10L0g0LHRi9GC0Ywg0YfQuNGB0LvQvtC8LlwiLFxyXG4gICAgdGV4dE1pbkxlbmd0aDogXCLQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0YXQvtGC0Y8g0LHRiyB7MH0g0YHQuNC80LLQvtC70L7Qsi5cIixcclxuICAgIG1pblNlbGVjdEVycm9yOiBcItCf0L7QttCw0LvRg9C50YHRgtCwLCDQstGL0LHQtdGA0LjRgtC1INGF0L7RgtGPINCx0YsgezB9INCy0LDRgNC40LDQvdGC0L7Qsi5cIixcclxuICAgIG1heFNlbGVjdEVycm9yOiBcItCf0L7QttCw0LvRg9C50YHRgtCwLCDQstGL0LHQtdGA0LjRgtC1INC90LUg0LHQvtC70LXQtSB7MH0g0LLQsNGA0LjQsNC90YLQvtCyLlwiLFxyXG4gICAgbnVtZXJpY01pbk1heDogXCInezB9JyDQtNC+0LvQttC90L4g0LHRi9GC0Ywg0YDQsNCy0L3Ri9C8INC40LvQuCDQsdC+0LvRjNGI0LUsINGH0LXQvCB7MX0sINC4INGA0LDQstC90YvQvCDQuNC70Lgg0LzQtdC90YzRiNC1LCDRh9C10LwgezJ9XCIsXHJcbiAgICBudW1lcmljTWluOiBcIid7MH0nINC00L7Qu9C20L3QviDQsdGL0YLRjCDRgNCw0LLQvdGL0Lwg0LjQu9C4INCx0L7Qu9GM0YjQtSwg0YfQtdC8IHsxfVwiLFxyXG4gICAgbnVtZXJpY01heDogXCInezB9JyDQtNC+0LvQttC90L4g0LHRi9GC0Ywg0YDQsNCy0L3Ri9C8INC40LvQuCDQvNC10L3RjNGI0LUsINGH0LXQvCB7MX1cIixcclxuICAgIGludmFsaWRFbWFpbDogXCLQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0LTQtdC50YHRgtCy0LjRgtC10LvRjNC90YvQuSDQsNC00YDQtdGBINGN0LvQtdC60YLRgNC+0L3QvdC+0Lkg0L/QvtGH0YLRiy5cIixcclxuICAgIG90aGVyUmVxdWlyZWRFcnJvcjogXCLQn9C+0LbQsNC70YPQudGB0YLQsCwg0LLQstC10LTQuNGC0LUg0LTQsNC90L3Ri9C1INCyINC/0L7Qu9C1IFxcXCLQlNGA0YPQs9C+0LVcXFwiXCJcclxufTtcclxuXHJcbnN1cnZleUxvY2FsaXphdGlvbi5sb2NhbGVzW1wicnVcIl0gPSBydXNzaWFuU3VydmV5U3RyaW5ncztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2NhbGl6YXRpb24vcnVzc2lhbi50c1xuICoqLyIsImltcG9ydCB7c3VydmV5TG9jYWxpemF0aW9ufSBmcm9tIFwiLi4vc3VydmV5U3RyaW5nc1wiO1xyXG5cclxuZXhwb3J0IHZhciB0dXJraXNoU3VydmV5U3RyaW5ncyA9IHtcclxuICAgICAgICBwYWdlUHJldlRleHQ6IFwiR2VyaVwiLFxyXG4gICAgICAgIHBhZ2VOZXh0VGV4dDogXCLEsGxlcmlcIixcclxuICAgICAgICBjb21wbGV0ZVRleHQ6IFwiQW5rZXRpIFRhbWFtbGFcIixcclxuICAgICAgICBvdGhlckl0ZW1UZXh0OiBcIkRpxJ9lciAoYcOnxLFrbGF5xLFuxLF6KVwiLFxyXG4gICAgICAgIHByb2dyZXNzVGV4dDogXCJTYXlmYSB7MH0gLyB7MX1cIixcclxuICAgICAgICBlbXB0eVN1cnZleTogXCJBbmtldHRlIGfDtnLDvG50w7xsZW5lY2VrIHNheWZhIHlhIGRhIHNvcnUgbWV2Y3V0IGRlxJ9pbC5cIixcclxuICAgICAgICBjb21wbGV0aW5nU3VydmV5OiBcIkFua2V0aW1pemkgdGFtYW1sYWTEscSfxLFuxLF6IGnDp2luIHRlxZ9la2vDvHIgZWRlcml6LlwiLFxyXG4gICAgICAgIGxvYWRpbmdTdXJ2ZXk6IFwiQW5rZXQgc3VudWN1ZGFuIHnDvGtsZW5peW9yIC4uLlwiLFxyXG4gICAgICAgIG9wdGlvbnNDYXB0aW9uOiBcIlNlw6dpbml6IC4uLlwiLFxyXG4gICAgICAgIHJlcXVpcmVkRXJyb3I6IFwiTMO8dGZlbiBzb3J1eWEgY2V2YXAgdmVyaW5pelwiLFxyXG4gICAgICAgIG51bWVyaWNFcnJvcjogXCJHaXJpbGVuIGRlxJ9lciBudW1lcmlrIG9sbWFsxLFkxLFyXCIsXHJcbiAgICAgICAgdGV4dE1pbkxlbmd0aDogXCJFbiBheiB7MH0gc2VtYm9sIGdpcmluaXouXCIsXHJcbiAgICAgICAgbWluUm93Q291bnRFcnJvcjogXCJMw7x0ZmVuIGVuIGF6IHswfSBzYXTEsXLEsSBkb2xkdXJ1bi5cIixcclxuICAgICAgICBtaW5TZWxlY3RFcnJvcjogXCJMw7x0ZmVuIGVuIGF6IHswfSBzZcOnZW5lxJ9pIHNlw6dpbml6LlwiLFxyXG4gICAgICAgIG1heFNlbGVjdEVycm9yOiBcIkzDvHRmZW4gezB9IGFkZXR0ZW4gZmF6bGEgc2XDp21leWluaXouXCIsXHJcbiAgICAgICAgbnVtZXJpY01pbk1heDogXCJUaGUgJ3swfScgc2hvdWxkIGJlIGVxdWFsIG9yIG1vcmUgdGhhbiB7MX0gYW5kIGVxdWFsIG9yIGxlc3MgdGhhbiB7Mn1cIixcclxuICAgICAgICBudW1lcmljTWluOiBcIid7MH0nIGRlxJ9lcmkgezF9IGRlxJ9lcmluZSBlxZ9pdCB2ZXlhIGLDvHnDvGsgb2xtYWzEsWTEsXJcIixcclxuICAgICAgICBudW1lcmljTWF4OiBcIid7MH0nIGRlxJ9lcmkgezF9IGRlxJ9lcmluZSBlxZ9pdCB5YSBkYSBrw7zDp8O8ayBvbG1hbMSxZMSxci5cIixcclxuICAgICAgICBpbnZhbGlkRW1haWw6IFwiTMO8dGZlbiBnZcOnZXJsaSBiaXIgZXBvc3RhIGFkcmVzaSBnaXJpbml6LlwiLFxyXG4gICAgICAgIHVybFJlcXVlc3RFcnJvcjogXCJUYWxlYmkgxZ91IGhhdGF5xLEgZMO2bmTDvCAnezB9Jy4gezF9XCIsXHJcbiAgICAgICAgdXJsR2V0Q2hvaWNlc0Vycm9yOiBcIlRhbGVwIGhlcmhhbmdpIGJpciB2ZXJpIGTDtm5tZWRpIHlhIGRhICdwYXRoJyDDtnplbGxpxJ9pIGhhdGFsxLEuXCIsXHJcbiAgICAgICAgZXhjZWVkTWF4U2l6ZTogXCJEb3N5YSBib3l1dHUgezB9IGRlxJ9lcmluaSBnZcOnZW1lei5cIixcclxuICAgICAgICBvdGhlclJlcXVpcmVkRXJyb3I6IFwiTMO8dGZlbiBkacSfZXIgZGXEn2VybGVyaSBnaXJpbml6LlwiLFxyXG4gICAgICAgIHVwbG9hZGluZ0ZpbGU6IFwiRG9zeWFuxLF6IHnDvGtsZW5peW9yLiBMw5x0ZmVuIGJpcmthw6cgc2FuaXllIGJla2xleWluIHZlIHRla3JhciBkZW5leWluLlwiLFxyXG4gICAgICAgIGFkZFJvdzogXCJTYXTEsXIgRWtsZVwiLFxyXG4gICAgICAgIHJlbW92ZVJvdzogXCJLYWxkxLFyXCJcclxufTtcclxuXHJcbnN1cnZleUxvY2FsaXphdGlvbi5sb2NhbGVzW1widHJcIl0gPSB0dXJraXNoU3VydmV5U3RyaW5ncztcblxuXG4vKiogV0VCUEFDSyBGT09URVIgKipcbiAqKiAuL3NyYy9sb2NhbGl6YXRpb24vdHVya2lzaC50c1xuICoqLyIsImltcG9ydCAnLi4vLi4vZGVmYXVsdENzcy9jc3Nib290c3RyYXAnO1xuXG5cbi8qKiBXRUJQQUNLIEZPT1RFUiAqKlxuICoqIC4vc3JjL2VudHJpZXMvY2h1bmtzL2Nzc0ZyYW1ld29ya3MudHNcbiAqKi8iLCJpbXBvcnQge3N1cnZleUNzc30gZnJvbSBcIi4vY3Nzc3RhbmRhcmRcIjtcclxuXHJcbmV4cG9ydCB2YXIgZGVmYXVsdEJvb3RzdHJhcENzcyA9IHtcclxuICAgIHJvb3Q6IFwiXCIsXHJcbiAgICBoZWFkZXI6IFwicGFuZWwtaGVhZGluZ1wiLFxyXG4gICAgYm9keTogXCJwYW5lbC1ib2R5XCIsXHJcbiAgICBmb290ZXI6IFwicGFuZWwtZm9vdGVyXCIsXHJcbiAgICBuYXZpZ2F0aW9uQnV0dG9uOiBcIlwiLCBuYXZpZ2F0aW9uOiB7IGNvbXBsZXRlOiBcIlwiLCBwcmV2OiBcIlwiLCBuZXh0OiBcIlwiIH0sXHJcbiAgICBwcm9ncmVzczogXCJwcm9ncmVzcyBjZW50ZXItYmxvY2tcIiwgcHJvZ3Jlc3NCYXI6IFwicHJvZ3Jlc3MtYmFyXCIsXHJcbiAgICBwYWdlVGl0bGU6IFwiXCIsXHJcbiAgICByb3c6IFwiXCIsXHJcbiAgICBxdWVzdGlvbjogeyByb290OiBcIlwiLCB0aXRsZTogXCJcIiwgY29tbWVudDogXCJmb3JtLWNvbnRyb2xcIiwgaW5kZW50OiAyMCB9LFxyXG4gICAgZXJyb3I6IHsgcm9vdDogXCJhbGVydCBhbGVydC1kYW5nZXJcIiwgaWNvbjogXCJnbHlwaGljb24gZ2x5cGhpY29uLWV4Y2xhbWF0aW9uLXNpZ25cIiwgaXRlbTogXCJcIiB9LFxyXG5cclxuICAgIGNoZWNrYm94OiB7IHJvb3Q6IFwiZm9ybS1pbmxpbmVcIiwgaXRlbTogXCJjaGVja2JveFwiLCBvdGhlcjogXCJcIiB9LFxyXG4gICAgY29tbWVudDogXCJmb3JtLWNvbnRyb2xcIixcclxuICAgIGRyb3Bkb3duOiBcImZvcm0tY29udHJvbFwiLFxyXG4gICAgbWF0cml4OiB7IHJvb3Q6IFwidGFibGVcIiB9LFxyXG4gICAgbWF0cml4ZHJvcGRvd246IHsgcm9vdDogXCJ0YWJsZVwiIH0sXHJcbiAgICBtYXRyaXhkeW5hbWljOiB7IHJvb3Q6IFwidGFibGVcIiwgYnV0dG9uOiBcImJ1dHRvblwiIH0sXHJcbiAgICBtdWx0aXBsZXRleHQ6IHsgcm9vdDogXCJ0YWJsZVwiLCBpdGVtVGl0bGU6IFwiXCIsIGl0ZW1WYWx1ZTogXCJmb3JtLWNvbnRyb2xcIiB9LFxyXG4gICAgcmFkaW9ncm91cDogeyByb290OiBcImZvcm0taW5saW5lXCIsIGl0ZW06IFwicmFkaW9cIiwgb3RoZXI6IFwiXCIgfSxcclxuICAgIHJhdGluZzogeyByb290OiBcImJ0bi1ncm91cFwiLCBpdGVtOiBcImJ0biBidG4tZGVmYXVsdFwiIH0sXHJcbiAgICB0ZXh0OiBcImZvcm0tY29udHJvbFwiLFxyXG4gICAgd2luZG93OiB7XHJcbiAgICAgICAgcm9vdDogXCJtb2RhbC1jb250ZW50XCIsIGJvZHk6IFwibW9kYWwtYm9keVwiLFxyXG4gICAgICAgIGhlYWRlcjoge1xyXG4gICAgICAgICAgICByb290OiBcIm1vZGFsLWhlYWRlciBwYW5lbC10aXRsZVwiLCB0aXRsZTogXCJwdWxsLWxlZnRcIiwgYnV0dG9uOiBcImdseXBoaWNvbiBwdWxsLXJpZ2h0XCIsXHJcbiAgICAgICAgICAgIGJ1dHRvbkV4cGFuZGVkOiBcImdseXBoaWNvbiBwdWxsLXJpZ2h0IGdseXBoaWNvbi1jaGV2cm9uLXVwXCIsIGJ1dHRvbkNvbGxhcHNlZDogXCJnbHlwaGljb24gcHVsbC1yaWdodCBnbHlwaGljb24tY2hldnJvbi1kb3duXCJcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn07XHJcbnN1cnZleUNzc1tcImJvb3RzdHJhcFwiXSA9IGRlZmF1bHRCb290c3RyYXBDc3M7XG5cblxuLyoqIFdFQlBBQ0sgRk9PVEVSICoqXG4gKiogLi9zcmMvZGVmYXVsdENzcy9jc3Nib290c3RyYXAudHNcbiAqKi8iXSwic291cmNlUm9vdCI6IiJ9