/*
 AngularJS v1.6.1
 (c) 2010-2016 Google, Inc. http://angularjs.org
 License: MIT
*/
(function(){'use strict';function g(a,c){c=c||Error;return function(){var d=arguments[0],e;e="["+(a?a+":":"")+d+"] http://errors.angularjs.org/1.6.1/"+(a?a+"/":"")+d;for(d=1;d<arguments.length;d++){e=e+(1==d?"?":"&")+"p"+(d-1)+"=";var n=encodeURIComponent,b;b=arguments[d];b="function"==typeof b?b.toString().replace(/ \{[\s\S]*$/,""):"undefined"==typeof b?"undefined":"string"!=typeof b?JSON.stringify(b):b;e+=n(b)}return new c(e)}}(function(a){function c(a,b,d){return a[b]||(a[b]=d())}var d=g("$injector"),
e=g("ng");a=c(a,"angular",Object);a.$$minErr=a.$$minErr||g;return c(a,"module",function(){var a={};return function(b,g,k){if("hasOwnProperty"===b)throw e("badname","module");g&&a.hasOwnProperty(b)&&(a[b]=null);return c(a,b,function(){function a(b,d,c,f){f||(f=e);return function(){f[c||"push"]([b,d,arguments]);return h}}function f(a,d,c){c||(c=e);return function(f,e){e&&"function"===typeof e&&(e.$$moduleName=b);c.push([a,d,arguments]);return h}}if(!g)throw d("nomod",b);var e=[],c=[],l=[],m=a("$injector",
"invoke","push",c),h={_invokeQueue:e,_configBlocks:c,_runBlocks:l,requires:g,name:b,provider:f("$provide","provider"),factory:f("$provide","factory"),service:f("$provide","service"),value:a("$provide","value"),constant:a("$provide","constant","unshift"),decorator:f("$provide","decorator",c),animation:f("$animateProvider","register"),filter:f("$filterProvider","register"),controller:f("$controllerProvider","register"),directive:f("$compileProvider","directive"),component:f("$compileProvider","component"),
config:m,run:function(a){l.push(a);return this}};k&&m(k);return h})}})})(window)})(window);
//# sourceMappingURL=angular-loader.min.js.map
