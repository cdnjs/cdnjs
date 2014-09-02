/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("querystring-parse-simple",function(e,t){var n=e.namespace("QueryString");n.parse=function(e,t,r){t=t||"&",r=r||"=";for(var i={},s=0,o=e.split(t),u=o.length,a;s<u;s++)a=o[s].split(r),a.length>0&&(i[n.unescape(a.shift())]=n.unescape(a.join(r)));return i},n.unescape=function(e){return decodeURIComponent(e.replace(/\+/g," "))}},"3.15.0",{requires:["yui-base"]});
