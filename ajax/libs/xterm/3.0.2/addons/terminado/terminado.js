(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.terminado = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function terminadoAttach(term, socket, bidirectional, buffered) {
    bidirectional = (typeof bidirectional == 'undefined') ? true : bidirectional;
    term.socket = socket;
    term._flushBuffer = function () {
        term.write(term._attachSocketBuffer);
        term._attachSocketBuffer = null;
    };
    term._pushToBuffer = function (data) {
        if (term._attachSocketBuffer) {
            term._attachSocketBuffer += data;
        }
        else {
            term._attachSocketBuffer = data;
            setTimeout(term._flushBuffer, 10);
        }
    };
    term._getMessage = function (ev) {
        var data = JSON.parse(ev.data);
        if (data[0] == "stdout") {
            if (buffered) {
                term._pushToBuffer(data[1]);
            }
            else {
                term.write(data[1]);
            }
        }
    };
    term._sendData = function (data) {
        socket.send(JSON.stringify(['stdin', data]));
    };
    term._setSize = function (size) {
        socket.send(JSON.stringify(['set_size', size.rows, size.cols]));
    };
    socket.addEventListener('message', term._getMessage);
    if (bidirectional) {
        term.on('data', term._sendData);
    }
    term.on('resize', term._setSize);
    socket.addEventListener('close', term.terminadoDetach.bind(term, socket));
    socket.addEventListener('error', term.terminadoDetach.bind(term, socket));
}
exports.terminadoAttach = terminadoAttach;
;
function terminadoDetach(term, socket) {
    term.off('data', term._sendData);
    socket = (typeof socket == 'undefined') ? term.socket : socket;
    if (socket) {
        socket.removeEventListener('message', term._getMessage);
    }
    delete term.socket;
}
exports.terminadoDetach = terminadoDetach;
;
function apply(terminalConstructor) {
    terminalConstructor.prototype.terminadoAttach = function (socket, bidirectional, buffered) {
        return terminadoAttach(this, socket, bidirectional, buffered);
    };
    terminalConstructor.prototype.terminadoDetach = function (socket) {
        return terminadoDetach(this, socket);
    };
}
exports.apply = apply;



},{}]},{},[1])(1)
});
//# sourceMappingURL=terminado.js.map
