/*!
 * angular-translate - v2.15.2 - 2017-06-22
 * 
 * Copyright (c) 2017 The angular-translate team, Pascal Precht; Licensed MIT
 */
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return b()}):"object"==typeof module&&module.exports?module.exports=b():b()}(0,function(){function a(a){"use strict";var b;if(1===angular.version.major&&angular.version.minor>=4){var c=a.get("$cookies");b={get:function(a){return c.get(a)},put:function(a,b){c.put(a,b)}}}else{var d=a.get("$cookieStore");b={get:function(a){return d.get(a)},put:function(a,b){d.put(a,b)}}}return{get:function(a){return b.get(a)},set:function(a,c){b.put(a,c)},put:function(a,c){b.put(a,c)}}}return a.$inject=["$injector"],angular.module("pascalprecht.translate").factory("$translateCookieStorage",a),a.displayName="$translateCookieStorage","pascalprecht.translate"});