/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("arraysort",function(e,t){var n=e.Lang,r=n.isValue,i=n.isString,s=e.ArraySort={compare:function(e,t,n){return r(e)?r(t)?(i(e)&&(e=e.toLowerCase()),i(t)&&(t=t.toLowerCase()),e<t?n?1:-1:e>t?n?-1:1:0):-1:r(t)?1:0},naturalCompare:function(e,t,n){e+="",t+="";if(!n||!n.caseSensitive)e=e.toLowerCase(),t=t.toLowerCase();var r=s._splitAlphaNum(e),i=s._splitAlphaNum(t),o=Math.min(r.length,i.length),u=0,a,f,l;for(l=0;l<o;l++){a=r[l],f=i[l];if(a!==f){u=a-f,u||(u=a>f?1:-1);break}}return u||(u=e.length-t.length),n&&n.descending?-u:u},_splitAlphaNum:function(e){var t=[],n=/(\d+|\D+)/g,r;while(r=n.exec(e))t.push(r[1]);return t}}},"3.17.2",{requires:["yui-base"]});
