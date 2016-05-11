/*!
 * angular-translate - v2.7.0 - 2015-05-02
 * http://github.com/angular-translate/angular-translate
 * Copyright (c) 2015 ; Licensed MIT
 */
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return b()}):"object"==typeof exports?module.exports=b():b()}(this,function(){function a(a){"use strict";var b={get:function(b){return a.get(b)},set:function(b,c){a.put(b,c)},put:function(b,c){a.put(b,c)}};return b}return angular.module("pascalprecht.translate").factory("$translateCookieStorage",a),a.$inject=["$cookieStore"],a.displayName="$translateCookieStorage","pascalprecht.translate"});