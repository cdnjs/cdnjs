/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("classnamemanager",function(e,t){var n="classNamePrefix",r="classNameDelimiter",i=e.config;i[n]=i[n]||"yui3",i[r]=i[r]||"-",e.ClassNameManager=function(){var t=i[n],s=i[r];return{getClassName:e.cached(function(){var n=e.Array(arguments);return n[n.length-1]!==!0?n.unshift(t):n.pop(),n.join(s)})}}()},"3.17.2",{requires:["yui-base"]});
