/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("json-parse-shim",function(Y,NAME){var _UNICODE_EXCEPTIONS=/[\u0000\u00ad\u0600-\u0604\u070f\u17b4\u17b5\u200c-\u200f\u2028-\u202f\u2060-\u206f\ufeff\ufff0-\uffff]/g,_ESCAPES=/\\(?:["\\\/bfnrt]|u[0-9a-fA-F]{4})/g,_VALUES=/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?/g,_BRACKETS=/(?:^|:|,)(?:\s*\[)+/g,_UNSAFE=/[^\],:{}\s]/,_escapeException=function(e){return"\\u"+("0000"+(+e.charCodeAt(0)).toString(16)).slice(-4)},_revive=function(e,t){var n=function(e,r){var i,s,o=e[r];if(o&&typeof o=="object")for(i in o)o.hasOwnProperty(i)&&(s=n(o,i),s===undefined?delete o[i]:o[i]=s);return t.call(e,r,o)};return typeof t=="function"?n({"":e},""):e};Y.JSON.parse=function(s,reviver){typeof s!="string"&&(s+=""),s=s.replace(_UNICODE_EXCEPTIONS,_escapeException);if(!_UNSAFE.test(s.replace(_ESCAPES,"@").replace(_VALUES,"]").replace(_BRACKETS,"")))return _revive(eval("("+s+")"),reviver);throw new SyntaxError("JSON.parse")},Y.JSON.parse.isShim=!0},"3.15.0",{requires:["json-parse"]});
