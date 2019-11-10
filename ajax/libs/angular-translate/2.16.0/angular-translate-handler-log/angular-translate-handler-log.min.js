/*!
 * angular-translate - v2.16.0 - 2017-11-01
 * 
 * Copyright (c) 2017 The angular-translate team, Pascal Precht; Licensed MIT
 */
!function(n,t){"function"==typeof define&&define.amd?define([],function(){return t()}):"object"==typeof module&&module.exports?module.exports=t():t()}(0,function(){function n(n){"use strict";return function(t){n.warn("Translation for "+t+" doesn't exist")}}return n.$inject=["$log"],angular.module("pascalprecht.translate").factory("$translateMissingTranslationHandlerLog",n),n.displayName="$translateMissingTranslationHandlerLog","pascalprecht.translate"});