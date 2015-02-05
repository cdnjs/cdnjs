/*
YUI 3.17.2 (build 9c3c78e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("template-micro",function(e,t){var n=e.namespace("Template.Micro");n.options={code:/<%([\s\S]+?)%>/g,escapedOutput:/<%=([\s\S]+?)%>/g,rawOutput:/<%==([\s\S]+?)%>/g,stringEscape:/\\|'|\r|\n|\t|\u2028|\u2029/g,stringReplace:{"\\":"\\\\","'":"\\'","\r":"\\r","\n":"\\n","	":"\\t","\u2028":"\\u2028","\u2029":"\\u2029"}},n.compile=function(t,r){var i=[],s="\uffff",o="\ufffe",u;return r=e.merge(n.options,r),u="var $b='', $v=function (v){return v || v === 0 ? v : $b;}, $t='"+t.replace(/\ufffe|\uffff/g,"").replace(r.rawOutput,function(e,t){return o+(i.push("'+\n$v("+t+")+\n'")-1)+s}).replace(r.escapedOutput,function(e,t){return o+(i.push("'+\n$e($v("+t+"))+\n'")-1)+s}).replace(r.code,function(e,t){return o+(i.push("';\n"+t+"\n$t+='")-1)+s}).replace(r.stringEscape,function(e){return r.stringReplace[e]||""}).replace(/\ufffe(\d+)\uffff/g,function(e,t){return i[parseInt(t,10)]}).replace(/\n\$t\+='';\n/g,"\n")+"';\nreturn $t;",r.precompile?"function (Y, $e, data) {\n"+u+"\n}":this.revive(new Function("Y","$e","data",u))},n.precompile=function(e,t){return t||(t={}),t.precompile=!0,this.compile(e,t)},n.render=function(e,t,n){return this.compile(e,n)(t)},n.revive=function(t){return function(n){return n||(n={}),t.call(n,e,e.Escape.html,n)}}},"3.17.2",{requires:["escape"]});
