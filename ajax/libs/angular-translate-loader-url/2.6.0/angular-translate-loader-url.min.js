/*!
 * angular-translate - v2.6.0 - 2015-02-08
 * http://github.com/angular-translate/angular-translate
 * Copyright (c) 2015 ; Licensed MIT
 */
angular.module("pascalprecht.translate").factory("$translateUrlLoader",["$q","$http",function(a,b){return function(c){if(!c||!c.url)throw new Error("Couldn't use urlLoader since no url is given!");var d=a.defer(),e={};return e[c.queryParameter||"lang"]=c.key,b(angular.extend({url:c.url,params:e,method:"GET"},c.$http)).success(function(a){d.resolve(a)}).error(function(){d.reject(c.key)}),d.promise}}]);