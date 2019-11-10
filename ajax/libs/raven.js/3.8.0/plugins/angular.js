/*! Raven.js 3.8.0 (d78f15c) | github.com/getsentry/raven-js */

/*
 * Includes TraceKit
 * https://github.com/getsentry/TraceKit
 *
 * Copyright 2016 Matt Robenolt and other contributors
 * Released under the BSD license
 * https://github.com/getsentry/raven-js/blob/master/LICENSE
 *
 */

(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g=(g.Raven||(g.Raven = {}));g=(g.Plugins||(g.Plugins = {}));g.Angular = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(_dereq_,module,exports){
/**
 * Angular.js plugin
 *
 * Provides an $exceptionHandler for Angular.js
 */
'use strict';

// See https://github.com/angular/angular.js/blob/v1.4.7/src/minErr.js
var angularPattern = /^\[((?:[$a-zA-Z0-9]+:)?(?:[$a-zA-Z0-9]+))\] (.*?)\n?(\S+)$/;


function angularPlugin(Raven, angular) {
    angular = angular || window.angular;

    if (!angular) return;

    function RavenProvider() {
        this.$get = ['$window', function($window) {
            return Raven;
        }];
    }

    function ExceptionHandlerProvider($provide) {
        $provide.decorator('$exceptionHandler',
            ['Raven', '$delegate', exceptionHandler]);
    }

    function exceptionHandler(R, $delegate) {
        return function (ex, cause) {
            R.captureException(ex, {
                extra: { cause: cause }
            });
            $delegate(ex, cause);
        };
    }

    angular.module('ngRaven', [])
        .provider('Raven',  RavenProvider)
        .config(['$provide', ExceptionHandlerProvider]);

    Raven.setDataCallback(function(data, original) {
        angularPlugin._normalizeData(data);

        original && original(data);
    });
}

angularPlugin._normalizeData = function (data) {
    // We only care about mutating an exception
    var exception = data.exception;
    if (exception) {
        exception = exception.values[0];
        var matches = angularPattern.exec(exception.value);

        if (matches) {
            // This type now becomes something like: $rootScope:inprog
            exception.type = matches[1];
            exception.value = matches[2];

            data.message = exception.type + ': ' + exception.value;
            // auto set a new tag specifically for the angular error url
            data.extra.angularDocs = matches[3].substr(0, 250);
        }
    }
};

module.exports = angularPlugin;

},{}]},{},[1])(1)
});