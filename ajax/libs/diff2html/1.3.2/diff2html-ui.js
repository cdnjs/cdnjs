/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/*
	 *
	 * Diff to HTML (diff2html-ui.js)
	 * Author: rtfpessoa
	 *
	 * Depends on: [ jQuery ]
	 * Optional dependencies on: [ highlight.js ]
	 *
	 */

	/*global $, hljs*/

	(function() {

	  var diffJson = null;
	  var defaultTarget = "body";

	  function Diff2HtmlUI(config) {
	    var cfg = config || {};

	    if (cfg.diff) {
	      diffJson = Diff2Html.getJsonFromDiff(cfg.diff);
	    } else if (cfg.json) {
	      diffJson = cfg.json;
	    }
	  }

	  Diff2HtmlUI.prototype.draw = function(targetId, config) {
	    var cfg = config || {};
	    var $target = this._getTarget(targetId);
	    $target.html(Diff2Html.getPrettyHtml(diffJson, cfg));
	  };

	  Diff2HtmlUI.prototype.fileListCloseable = function(targetId, startVisible) {
	    var $target = this._getTarget(targetId);

	    var hashTag = this._getHashTag();

	    var $showBtn = $target.find(".d2h-show");
	    var $hideBtn = $target.find(".d2h-hide");
	    var $fileList = $target.find(".d2h-file-list");

	    if (hashTag === 'files-summary-show') show();
	    else if (hashTag === 'files-summary-hide') hide();
	    else if (startVisible) show();
	    else hide();

	    $showBtn.click(show);
	    $hideBtn.click(hide);

	    function show() {
	      $showBtn.hide();
	      $hideBtn.show();
	      $fileList.show();
	    }

	    function hide() {
	      $hideBtn.hide();
	      $showBtn.show();
	      $fileList.hide();
	    }
	  };

	  Diff2HtmlUI.prototype.highlightCode = function(targetId) {
	    var that = this;

	    var $target = that._getTarget(targetId);

	    var languages = that._getLanguages($target);

	    console.log(languages);

	    // pass the languages to the highlightjs plugin
	    hljs.configure({languages: languages});

	    // collect all the code lines and execute the highlight on them
	    var $codeLines = $target.find(".d2h-code-line-ctn");
	    $codeLines.map(function(i, line) {
	      hljs.highlightBlock(line);
	    });
	  };

	  Diff2HtmlUI.prototype._getTarget = function(targetId) {
	    var $target;
	    if (targetId) {
	      $target = $(targetId);
	    } else {
	      $target = $(defaultTarget);
	    }

	    return $target;
	  };

	  Diff2HtmlUI.prototype._getLanguages = function($target) {
	    var allFileLanguages = [];

	    if (diffJson) {
	      // collect all the file extensions in the json
	      allFileLanguages = diffJson.map(function(line) {
	        return line.language;
	      });
	    } else {
	      console.log($target.find(".d2h-file-wrapper"));
	      $target.find(".d2h-file-wrapper").map(function(i, file) {
	        allFileLanguages.push($(file).data("lang"));
	      });
	    }

	    // remove duplicated languages
	    var distinctLanguages = allFileLanguages.filter(function(v, i) {
	      return allFileLanguages.indexOf(v) === i;
	    });

	    return distinctLanguages;
	  };

	  Diff2HtmlUI.prototype._getHashTag = function() {
	    var docUrl = document.URL;
	    var hashTagIndex = docUrl.indexOf('#');

	    var hashTag = null;
	    if (hashTagIndex != -1) {
	      hashTag = docUrl.substr(hashTagIndex + 1);
	    }

	    return hashTag;
	  };

	  module.exports.Diff2HtmlUI = Diff2HtmlUI;

	  // Expose diff2html in the browser
	  global.Diff2HtmlUI = Diff2HtmlUI;

	})();

	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ }
/******/ ]);