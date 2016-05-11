/*!
 * angular-translate - v2.8.1 - 2015-10-01
 * 
 * Copyright (c) 2015 The angular-translate team, Pascal Precht; Licensed MIT
 */
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return b()}):"object"==typeof exports?module.exports=b():b()}(this,function(){function a(a){"use strict";return function(b){a.warn("Translation for "+b+" doesn't exist")}}return angular.module("pascalprecht.translate").factory("$translateMissingTranslationHandlerLog",a),a.$inject=["$log"],a.displayName="$translateMissingTranslationHandlerLog","pascalprecht.translate"});