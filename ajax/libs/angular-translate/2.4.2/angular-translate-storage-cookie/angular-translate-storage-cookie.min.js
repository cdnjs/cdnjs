/*!
 * angular-translate - v2.4.2 - 2014-10-21
 * http://github.com/angular-translate/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module("pascalprecht.translate").factory("$translateCookieStorage",["$cookieStore",function(a){var b={get:function(b){return a.get(b)},set:function(b,c){a.put(b,c)}};return b}]);