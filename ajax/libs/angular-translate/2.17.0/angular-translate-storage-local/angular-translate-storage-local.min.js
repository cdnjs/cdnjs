/*!
 * angular-translate - v2.17.0 - 2017-12-21
 * 
 * Copyright (c) 2017 The angular-translate team, Pascal Precht; Licensed MIT
 */
!function(t,e){"function"==typeof define&&define.amd?define([],function(){return e()}):"object"==typeof module&&module.exports?module.exports=e():e()}(0,function(){function t(t,e){"use strict";var a=function(){var e;return{get:function(a){return e||(e=t.localStorage.getItem(a)),e},set:function(a,o){e=o,t.localStorage.setItem(a,o)},put:function(a,o){e=o,t.localStorage.setItem(a,o)}}}(),o="localStorage"in t;if(o){var r="pascalprecht.translate.storageTest";try{null!==t.localStorage?(t.localStorage.setItem(r,"foo"),t.localStorage.removeItem(r),o=!0):o=!1}catch(t){o=!1}}return o?a:e}return t.$inject=["$window","$translateCookieStorage"],angular.module("pascalprecht.translate").factory("$translateLocalStorage",t),t.displayName="$translateLocalStorageFactory","pascalprecht.translate"});