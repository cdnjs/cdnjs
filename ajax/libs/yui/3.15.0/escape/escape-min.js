/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("escape",function(e,t){var n={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#x27;","/":"&#x2F;","`":"&#x60;"},r={html:function(e){return(e+"").replace(/[&<>"'\/`]/g,r._htmlReplacer)},regex:function(e){return(e+"").replace(/[\-$\^*()+\[\]{}|\\,.?\s]/g,"\\$&")},_htmlReplacer:function(e){return n[e]}};r.regexp=r.regex,e.Escape=r},"3.15.0",{requires:["yui-base"]});
