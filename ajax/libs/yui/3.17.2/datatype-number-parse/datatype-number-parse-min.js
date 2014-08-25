/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("datatype-number-parse",function(e,t){var n=e.Escape.regex,r="\\s*";e.mix(e.namespace("Number"),{_buildParser:e.cached(function(e,t,i,s){var o=[],u;return e&&o.push("^"+r+n(e)+r),t&&o.push(r+n(t)+r+"$"),i&&o.push(n(i)+"(?=\\d)"),u=new RegExp("(?:"+o.join("|")+")","g"),s==="."&&(s=null),function(e){return e=e.replace(u,""),s?e.replace(s,"."):e}}),parse:function(t,n){var r;n&&typeof t=="string"&&(r=this._buildParser(n.prefix,n.suffix,n.thousandsSeparator,n.decimalSeparator),t=r(t)),typeof t=="string"&&e.Lang.trim(t)!==""&&(t=+t);if(typeof t!="number"||!isFinite(t))t=null;return t}}),e.namespace("Parsers").number=e.Number.parse,e.namespace("DataType"),e.DataType.Number=e.Number},"3.17.2",{requires:["escape"]});
