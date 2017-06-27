/*!
 * angular-translate - v2.7.2 - 2015-06-01
 * http://github.com/angular-translate/angular-translate
 * Copyright (c) 2015 ; Licensed MIT
 */
!function(a,b){"function"==typeof define&&define.amd?define([],function(){return b()}):"object"==typeof exports?module.exports=b():b()}(this,function(){function a(a,b){"use strict";return function(c){if(!c||!c.url)throw new Error("Couldn't use urlLoader since no url is given!");var d=a.defer(),e={};return e[c.queryParameter||"lang"]=c.key,b(angular.extend({url:c.url,params:e,method:"GET"},c.$http)).success(function(a){d.resolve(a)}).error(function(){d.reject(c.key)}),d.promise}}return angular.module("pascalprecht.translate").factory("$translateUrlLoader",a),a.$inject=["$q","$http"],a.displayName="$translateUrlLoader","pascalprecht.translate"});