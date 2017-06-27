/*!
 * angular-translate - v2.15.2 - 2017-06-22
 * 
 * Copyright (c) 2017 The angular-translate team, Pascal Precht; Licensed MIT
 */
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return b()}):"object"==typeof module&&module.exports?module.exports=b():b()}(0,function(){function a(a,b){"use strict";var c=function(){var b;return{get:function(c){return b||(b=a.localStorage.getItem(c)),b},set:function(c,d){b=d,a.localStorage.setItem(c,d)},put:function(c,d){b=d,a.localStorage.setItem(c,d)}}}(),d="localStorage"in a;if(d){var e="pascalprecht.translate.storageTest";try{null!==a.localStorage?(a.localStorage.setItem(e,"foo"),a.localStorage.removeItem(e),d=!0):d=!1}catch(a){d=!1}}return d?c:b}return a.$inject=["$window","$translateCookieStorage"],angular.module("pascalprecht.translate").factory("$translateLocalStorage",a),a.displayName="$translateLocalStorageFactory","pascalprecht.translate"});