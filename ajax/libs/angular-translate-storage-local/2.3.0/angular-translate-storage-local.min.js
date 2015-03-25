/*!
 * angular-translate - v2.3.0 - 2014-09-16
 * http://github.com/PascalPrecht/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module("pascalprecht.translate").factory("$translateLocalStorage",["$window","$translateCookieStorage",function(a,b){var c=function(){var b;return{get:function(c){return b||(b=a.localStorage.getItem(c)),b},set:function(c,d){b=d,a.localStorage.setItem(c,d)}}}(),d="localStorage"in a;if(d){var e="pascalprecht.translate.storageTest";try{null!==a.localStorage?(a.localStorage.setItem(e,"foo"),a.localStorage.removeItem(e),d=!0):d=!1}catch(f){d=!1}}var g=d?c:b;return g}]);