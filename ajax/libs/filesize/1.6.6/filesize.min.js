/**
 * filesize
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright Jason Mulligan 2012
 * @license BSD-3 <http://opensource.org/licenses/BSD-3-Clause>
 * @link https://github.com/avoidwork/filesize.js
 * @module filesize
 * @version 1.6.6
 */
(function(a){"use strict";var b=function(a){var b,c,d,e,f,g,h,i,j,k;typeof arguments[2]!="undefined"?(b=arguments[1],c=arguments[2]):typeof arguments[1]=="boolean"?c=arguments[1]:b=arguments[1];if(isNaN(a)||typeof b!="undefined"&&isNaN(b))throw Error("Invalid arguments");c=c===!0,b=c?1:typeof b=="undefined"?2:parseInt(b),d=String(a).indexOf(".")>-1?parseFloat(a):parseInt(a),e=[["B",0],["KB",1024],["MB",1048576],["GB",1073741824],["TB",1099511627776]],j=e.length,g="",h=/\.(.*)/;while(j--){f=e[j][1],i=e[j][0];if(d>=f){g=(i==="B"?d:d/f).toFixed(b),c&&(i=i.slice(0,1),k=h.exec(g),k!==null&&typeof k[1]!="undefined"&&k[1]==="0"&&(g=parseInt(g))),g+=i;break}}return g};switch(!0){case typeof exports!="undefined":module.exports=b;break;case typeof define=="function":define(function(){return b});break;default:a.filesize=b}})(this);