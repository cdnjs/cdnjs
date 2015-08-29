/*!
 * URI.js - Mutating URLs
 * IPv6 Support
 *
 * Version: 1.16.0
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *   GPL v3 http://opensource.org/licenses/GPL-3.0
 *
 */
(function(a,b){if(typeof exports==="object"){module.exports=b()}else{if(typeof define==="function"&&define.amd){define(b)}else{a.IPv6=b(a)}}}(this,function(b){var c=b&&b.IPv6;function d(t){var q=t.toLowerCase();var l=q.split(":");var f=l.length;var r=8;if(l[0]===""&&l[1]===""&&l[2]===""){l.shift();l.shift()}else{if(l[0]===""&&l[1]===""){l.shift()}else{if(l[f-1]===""&&l[f-2]===""){l.pop()}}}f=l.length;if(l[f-1].indexOf(".")!==-1){r=7}var p;for(p=0;p<f;p++){if(l[p]===""){break}}if(p<r){l.splice(p,1,"0000");while(l.length<r){l.splice(p,0,"0000")}f=l.length}var n;for(var k=0;k<r;k++){n=l[k].split("");for(var h=0;h<3;h++){if(n[0]==="0"&&n.length>1){n.splice(0,1)}else{break}}l[k]=n.join("")}var g=-1;var e=0;var m=0;var o=-1;var s=false;for(k=0;k<r;k++){if(s){if(l[k]==="0"){m+=1}else{s=false;if(m>e){g=o;e=m}}}else{if(l[k]==="0"){s=true;o=k;m=1}}}if(m>e){g=o;e=m}if(e>1){l.splice(g,e,"")}f=l.length;var u="";if(l[0]===""){u=":"}for(k=0;k<f;k++){u+=l[k];if(k===f-1){break}u+=":"}if(l[f-1]===""){u+=":"}return u}function a(){if(b.IPv6===this){b.IPv6=c}return this}return{best:d,noConflict:a}}));