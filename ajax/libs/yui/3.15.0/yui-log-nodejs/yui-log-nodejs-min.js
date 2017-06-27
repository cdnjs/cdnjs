/*
YUI 3.15.0 (build 834026e)
Copyright 2014 Yahoo! Inc. All rights reserved.
Licensed under the BSD License.
http://yuilibrary.com/license/
*/

YUI.add("yui-log-nodejs",function(e,t){var n=require(process.binding("natives").util?"util":"sys"),r=!1;try{var i=require("stdio");r=i.isStderrATTY()}catch(s){r=!0}e.config.useColor=r,e.consoleColor=function(e,t){return this.config.useColor?(t||(t="32"),"["+t+"m"+e+"[0m"):e};var o=function(e,t,r){var i="",s,o;this.id&&(i="["+this.id+"]:"),t=t||"info",r=r?this.consoleColor(" ("+r.toLowerCase()+"):",35):"",e===null&&(e="null");if(typeof e=="object"||e instanceof Array)try{e.tagName||e._yuid||e._query?e=e.toString():e=n.inspect(e)}catch(u){}s="37;40",o=e?"":31,t+="";switch(t.toLowerCase()){case"error":s=o=31;break;case"warn":s=33;break;case"debug":s=34}typeof e=="string"&&e&&e.indexOf("\n")!==-1&&(e="\n"+e),n.error(this.consoleColor(t.toLowerCase()+":",s)+r+" "+this.consoleColor(e,o))};e.config.logFn||(e.config.logFn=o)},"3.15.0");
