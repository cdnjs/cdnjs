/*!
 * angular-translate - v2.3.0 - 2014-09-16
 * http://github.com/PascalPrecht/angular-translate
 * Copyright (c) 2014 ; Licensed MIT
 */
angular.module("pascalprecht.translate").factory("$translateCookieStorage",["$cookieStore",function(a){var b={get:function(b){return a.get(b)},set:function(b,c){a.put(b,c)}};return b}]);