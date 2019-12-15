/*!
 * angular-translate - v2.16.0 - 2017-11-01
 * 
 * Copyright (c) 2017 The angular-translate team, Pascal Precht; Licensed MIT
 */
!function(t,e){"function"==typeof define&&define.amd?define([],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():e()}(0,function(){function t(t){"use strict";var e;if(1===angular.version.major&&angular.version.minor>=4){var n=t.get("$cookies");e={get:function(t){return n.get(t)},put:function(t,e){n.put(t,e)}}}else{var o=t.get("$cookieStore");e={get:function(t){return o.get(t)},put:function(t,e){o.put(t,e)}}}return{get:function(t){return e.get(t)},set:function(t,n){e.put(t,n)},put:function(t,n){e.put(t,n)}}}return t.$inject=["$injector"],angular.module("pascalprecht.translate").factory("$translateCookieStorage",t),t.displayName="$translateCookieStorage","pascalprecht.translate"});