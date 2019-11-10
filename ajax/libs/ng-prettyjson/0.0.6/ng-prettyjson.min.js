/** 
* @license ng-prettyjson - v0.0.6
* (c) 2013 Julien VALERY https://github.com/darul75/ng-prettyjson
* License: MIT 
**/
!function(a){"use strict";a.module("ngPrettyJson",[]).directive("prettyJson",function(){var b=function(a){return"string"!=typeof a&&(a=JSON.stringify(a,void 0,2)),a=a.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"),a.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g,function(a){var b="number";return/^"/.test(a)?b=/:$/.test(a)?"key":"string":/true|false/.test(a)?b="boolean":/null/.test(a)&&(b="null"),'<span class="'+b+'">'+a+"</span>"})};return{restrict:"AE",scope:{json:"="},link:function(c,d){c.$watch("json",function(c){c&&c.json&&a.toJson(c.json)?d.html(b(c.json)):d.html("value is not a valid json object {}")},!0)}}})}(angular);