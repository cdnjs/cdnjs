/**
 * Copyright (c) 2012, Jason Mulligan <jason.mulligan@avoidwork.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of filesize.js nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL JASON MULLIGAN BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * filesize.js
 *
 * Transforms a file size Number into a readable String
 * 
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @module filesize
 * @version 1.6.3
 * 
 * @param  {Mixed}   arg   String, Int or Float to transform
 * @param  {Number}  pos   [Optional] Position to round to, defaults to 2 if short is ommitted
 * @param  {Boolean} short [Optional] Shorthand output, similar to "ls -lh", overrides pos to 1
 * @return {String} Readable file size String
 */
(function(a){"use strict";var b=function(a){var b,c,d,e,f,g,h,i,j,k,l;typeof arguments[2]!="undefined"?(b=arguments[1],c=arguments[2]):typeof arguments[1]=="boolean"?c=arguments[1]:b=arguments[1];if(isNaN(a)||typeof b!="undefined"&&isNaN(b))throw Error("Invalid arguments");c=c===!0,b=c?1:typeof b=="undefined"?2:parseInt(b),d=String(a).indexOf(".")>-1?parseFloat(a):parseInt(a),e=[{B:0},{KB:1024},{MB:1048576},{GB:1073741824},{TB:1099511627776}],i=e.length,g="";while(i--){k=e[i];for(j in k)if(k.hasOwnProperty(j)){f=k[j],h=j;break}if(d>=f){g=(h==="B"?d:d/f).toFixed(b),c&&(h=h.slice(0,1),l=/\.(.*)/.exec(g),l!==null&&typeof l[1]!="undefined"&&l[1]==="0"&&(g=parseInt(g))),g+=h;break}}return g};switch(!0){case typeof exports!="undefined":module.exports=b;break;case typeof define=="function":define("filesize",function(){return b});break;default:a.filesize=b}})(this)