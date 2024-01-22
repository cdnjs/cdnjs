/*!
 * angular-translate - v2.19.1 - 2024-01-21
 * 
 * Copyright (c) 2024 The angular-translate team, Pascal Precht; Licensed MIT
 */
!function(n,t){"function"==typeof define&&define.amd?define([],function(){return t()}):"object"==typeof module&&module.exports?module.exports=t():t()}(0,function(){function n(t){"use strict";return function(n){t.warn("Translation for "+n+" doesn't exist")}}return n.$inject=["$log"],angular.module("pascalprecht.translate").factory("$translateMissingTranslationHandlerLog",n),n.displayName="$translateMissingTranslationHandlerLog","pascalprecht.translate"});