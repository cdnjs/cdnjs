(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.winptyCompat = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function winptyCompatInit(terminal) {
    var addonTerminal = terminal;
    var isWindows = ['Windows', 'Win16', 'Win32', 'WinCE'].indexOf(navigator.platform) >= 0;
    if (!isWindows) {
        return;
    }
    addonTerminal.on('linefeed', function () {
        var line = addonTerminal.buffer.lines.get(addonTerminal.buffer.ybase + addonTerminal.buffer.y - 1);
        var lastChar = line[addonTerminal.cols - 1];
        if (lastChar[3] !== 32) {
            var nextLine = addonTerminal.buffer.lines.get(addonTerminal.buffer.ybase + addonTerminal.buffer.y);
            nextLine.isWrapped = true;
        }
    });
}
exports.winptyCompatInit = winptyCompatInit;
function apply(terminalConstructor) {
    terminalConstructor.prototype.winptyCompatInit = function () {
        winptyCompatInit(this);
    };
}
exports.apply = apply;



},{}]},{},[1])(1)
});
//# sourceMappingURL=winptyCompat.js.map
