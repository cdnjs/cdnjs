(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.zmodem = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var zmodem;
function zmodemAttach(term, ws, opts) {
    if (opts === void 0) { opts = {}; }
    var senderFunc = function (octets) { return ws.send(new Uint8Array(octets)); };
    var zsentry;
    function _shouldWrite() {
        return !!zsentry.get_confirmed_session() || !opts.noTerminalWriteOutsideSession;
    }
    zsentry = new zmodem.Sentry({
        to_terminal: function (octets) {
            if (_shouldWrite()) {
                term.write(String.fromCharCode.apply(String, octets));
            }
        },
        sender: senderFunc,
        on_retract: function () { return term.emit('zmodemRetract'); },
        on_detect: function (detection) { return term.emit('zmodemDetect', detection); }
    });
    function handleWSMessage(evt) {
        if (typeof evt.data === 'string') {
            if (_shouldWrite()) {
                term.write(evt.data);
            }
        }
        else {
            zsentry.consume(evt.data);
        }
    }
    ws.binaryType = 'arraybuffer';
    ws.addEventListener('message', handleWSMessage);
}
exports.zmodemAttach = zmodemAttach;
function apply(terminalConstructor) {
    zmodem = (typeof window === 'object') ? window.ZModem : { Browser: null };
    terminalConstructor.prototype.zmodemAttach = zmodemAttach.bind(this, this);
    terminalConstructor.prototype.zmodemBrowser = zmodem.Browser;
}
exports.apply = apply;



},{}]},{},[1])(1)
});
//# sourceMappingURL=zmodem.js.map
