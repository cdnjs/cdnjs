/**
 * filesize
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright Jason Mulligan 2012
 * @license BSD-3 <http://opensource.org/licenses/BSD-3-Clause>
 * @link https://github.com/avoidwork/filesize.js
 * @module filesize
 * @version 1.7.2
 */
(function(e){"use strict";var t=function(e){var t=10,n,r,i,s,o,u,a,f,l,c,h,p,d;typeof arguments[2]!="undefined"?(o=arguments[1],f=arguments[2]):typeof arguments[1]=="boolean"?f=arguments[1]:o=arguments[1];if(isNaN(e)||typeof o!="undefined"&&isNaN(o))throw Error("Invalid arguments");f=f===!0,o=f?1:typeof o=="undefined"?2:parseInt(o,t),s=Number(e),c=[["B",0],["Kb",128],["KB",1024],["Mb",131072],["MB","1.049e+6"],["Gb","1.342e+8"],["GB","1.074e+9"],["Tb","1.374e+11"],["TB","1.1e+12"],["Pb","1.407e+14"],["PB","1.126e+15"]],i=c.length,a="",u=/\.(.*)/,n=/b$/,r=/^B$/,d=/^0$/;while(i--){l=c[i][1],h=c[i][0],i>3&&(l=Number(l));if(s>=l){a=(r.test(h)?s:s/l).toFixed(o),f&&(n.test(h)&&(h=h.toLowerCase()),h=h.slice(0,1),p=u.exec(a),p!==null&&typeof p[1]!="undefined"&&d.test(p[1])&&(a=parseInt(a,t))),a+=h;break}}return a};switch(!0){case typeof exports!="undefined":module.exports=t;break;case typeof define=="function":define(function(){return t});break;default:e.filesize=t}})(this);