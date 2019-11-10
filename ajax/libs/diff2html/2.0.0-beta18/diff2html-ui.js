(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
(function (global){
/*
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
  var currentSelectionColumnId = -1;

  function Diff2HtmlUI(config) {
    var cfg = config || {};

    if (cfg.diff) {
      diffJson = Diff2Html.getJsonFromDiff(cfg.diff);
    } else if (cfg.json) {
      diffJson = cfg.json;
    }

    this._initSelection();
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

    if (typeof targetId === 'object' && targetId instanceof jQuery) {
      $target = targetId;
    } else if (typeof targetId === 'string') {
      $target = $(targetId);
    } else {
      console.error("Wrong target provided! Falling back to default value 'body'.");
      console.log("Please provide a jQuery object or a valid DOM query string.");
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
      $target.find(".d2h-file-wrapper").map(function(i, file) {
        allFileLanguages.push($(file).data("lang"));
      });
    }

    // return only distinct languages
    return this._distinct(allFileLanguages);
  };

  Diff2HtmlUI.prototype._getHashTag = function() {
    var docUrl = document.URL;
    var hashTagIndex = docUrl.indexOf('#');

    var hashTag = null;
    if (hashTagIndex !== -1) {
      hashTag = docUrl.substr(hashTagIndex + 1);
    }

    return hashTag;
  };

  Diff2HtmlUI.prototype._distinct = function(collection) {
    return collection.filter(function(v, i) {
      return collection.indexOf(v) === i;
    });
  };

  Diff2HtmlUI.prototype._initSelection = function() {
    var body = $('body');
    var that = this;

    body.on('mousedown', '.d2h-diff-table', function(event) {
      var target = $(event.target);
      var table = target.closest('.d2h-diff-table');

      if (target.closest('.d2h-code-line,.d2h-code-side-line').length) {
        table.removeClass('selecting-left');
        table.addClass('selecting-right');
        currentSelectionColumnId = 1;
      } else if (target.closest('.d2h-code-linenumber,.d2h-code-side-linenumber').length) {
        table.removeClass('selecting-right');
        table.addClass('selecting-left');
        currentSelectionColumnId = 0;
      }
    });

    body.on('copy', '.d2h-diff-table', function(event) {
      var clipboardData = event.originalEvent.clipboardData;
      var text = that._getSelectedText();
      clipboardData.setData('text', text);
      event.preventDefault();
    });
  };


  Diff2HtmlUI.prototype._getSelectedText = function() {
    var sel = window.getSelection();
    var range = sel.getRangeAt(0);
    var doc = range.cloneContents();
    var nodes = doc.querySelectorAll('tr');
    var text = '';
    var idx = currentSelectionColumnId;

    if (nodes.length === 0) {
      text = doc.textContent;
    } else {
      [].forEach.call(nodes, function(tr, i) {
        var td = tr.cells[tr.cells.length === 1 ? 0 : idx];
        text += (i ? '\n' : '') + td.textContent.replace(/(?:\r\n|\r|\n)/g, '');
      });
    }

    return text;
  };

  module.exports.Diff2HtmlUI = Diff2HtmlUI;

  // Expose diff2html in the browser
  global.Diff2HtmlUI = Diff2HtmlUI;

})();

}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})
},{}]},{},[1]);
