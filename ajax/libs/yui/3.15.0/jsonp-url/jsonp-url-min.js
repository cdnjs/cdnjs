/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("jsonp-url",function(e,t){var n=e.JSONPRequest,r=e.Object.getValue,i=function(){};e.mix(n.prototype,{_pattern:/\bcallback=(.*?)(?=&|$)/i,_template:"callback={callback}",_defaultCallback:function(t){var n=t.match(this._pattern),s=[],o=0,u,a,f;if(n){u=n[1].replace(/\[(['"])(.*?)\1\]/g,function(e,t,n){return s[o]=n,".@"+o++}).replace(/\[(\d+)\]/g,function(e,t){return s[o]=parseInt(t,10)|0,".@"+o++}).replace(/^\./,"");if(!/[^\w\.\$@]/.test(u)){a=u.split(".");for(o=a.length-1;o>=0;--o)a[o].charAt(0)==="@"&&(a[o]=s[parseInt(a[o].substr(1),10)]);f=r(e.config.win,a)||r(e,a)||r(e,a.slice(1))}}return f||i},_format:function(e,t){var n=/\{callback\}/,r,i;return n.test(e)?e.replace(n,t):(r=this._template.replace(n,t),this._pattern.test(e)?e.replace(this._pattern,r):(i=e.slice(-1),i!=="&"&&i!=="?"&&(e+=e.indexOf("?")>-1?"&":"?"),e+r))}},!0)},"3.15.0",{requires:["jsonp"]});
