(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.search = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchHelper = (function () {
    function SearchHelper(_terminal) {
        this._terminal = _terminal;
    }
    SearchHelper.prototype.findNext = function (term) {
        if (!term || term.length === 0) {
            return false;
        }
        var result;
        var startRow = this._terminal.buffer.ydisp;
        if (this._terminal.selectionManager.selectionEnd) {
            startRow = this._terminal.selectionManager.selectionEnd[1];
        }
        for (var y = startRow + 1; y < this._terminal.buffer.ybase + this._terminal.rows; y++) {
            result = this._findInLine(term, y);
            if (result) {
                break;
            }
        }
        if (!result) {
            for (var y = 0; y < startRow; y++) {
                result = this._findInLine(term, y);
                if (result) {
                    break;
                }
            }
        }
        return this._selectResult(result);
    };
    SearchHelper.prototype.findPrevious = function (term) {
        if (!term || term.length === 0) {
            return false;
        }
        var result;
        var startRow = this._terminal.buffer.ydisp;
        if (this._terminal.selectionManager.selectionStart) {
            startRow = this._terminal.selectionManager.selectionStart[1];
        }
        for (var y = startRow - 1; y >= 0; y--) {
            result = this._findInLine(term, y);
            if (result) {
                break;
            }
        }
        if (!result) {
            for (var y = this._terminal.buffer.ybase + this._terminal.rows - 1; y > startRow; y--) {
                result = this._findInLine(term, y);
                if (result) {
                    break;
                }
            }
        }
        return this._selectResult(result);
    };
    SearchHelper.prototype._findInLine = function (term, y) {
        var lowerStringLine = this._terminal.buffer.translateBufferLineToString(y, true).toLowerCase();
        var lowerTerm = term.toLowerCase();
        var searchIndex = lowerStringLine.indexOf(lowerTerm);
        if (searchIndex >= 0) {
            var line = this._terminal.buffer.lines.get(y);
            for (var i = 0; i < searchIndex; i++) {
                var charData = line[i];
                var char = charData[1];
                if (char.length > 1) {
                    searchIndex -= char.length - 1;
                }
                var charWidth = charData[2];
                if (charWidth === 0) {
                    searchIndex++;
                }
            }
            return {
                term: term,
                col: searchIndex,
                row: y
            };
        }
    };
    SearchHelper.prototype._selectResult = function (result) {
        if (!result) {
            return false;
        }
        this._terminal.selectionManager.setSelection(result.col, result.row, result.term.length);
        this._terminal.scrollLines(result.row - this._terminal.buffer.ydisp);
        return true;
    };
    return SearchHelper;
}());
exports.SearchHelper = SearchHelper;



},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var SearchHelper_1 = require("./SearchHelper");
function findNext(terminal, term) {
    var addonTerminal = terminal;
    if (!addonTerminal.__searchHelper) {
        addonTerminal.__searchHelper = new SearchHelper_1.SearchHelper(addonTerminal);
    }
    return addonTerminal.__searchHelper.findNext(term);
}
exports.findNext = findNext;
function findPrevious(terminal, term) {
    var addonTerminal = terminal;
    if (!addonTerminal.__searchHelper) {
        addonTerminal.__searchHelper = new SearchHelper_1.SearchHelper(addonTerminal);
    }
    return addonTerminal.__searchHelper.findPrevious(term);
}
exports.findPrevious = findPrevious;
function apply(terminalConstructor) {
    terminalConstructor.prototype.findNext = function (term) {
        return findNext(this, term);
    };
    terminalConstructor.prototype.findPrevious = function (term) {
        return findPrevious(this, term);
    };
}
exports.apply = apply;



},{"./SearchHelper":1}]},{},[2])(2)
});
//# sourceMappingURL=search.js.map
