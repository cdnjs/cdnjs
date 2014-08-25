/*!
 * jQuery.selection - jQuery Plugin
 *
 * Copyright (c) 2010-2014 IWASAKI Koji (@madapaja).
 * http://blog.madapaja.net/
 * Under The MIT License
 *
 * Permission is hereby granted, free of charge, to any person obtaining
 * a copy of this software and associated documentation files (the
 * "Software"), to deal in the Software without restriction, including
 * without limitation the rights to use, copy, modify, merge, publish,
 * distribute, sublicense, and/or sell copies of the Software, and to
 * permit persons to whom the Software is furnished to do so, subject to
 * the following conditions:
 *
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
 */
 
!function(a,b,c){var d=function(a){var d={text:"",start:0,end:0};if(!a.value)return d;try{if(b.getSelection)d.start=a.selectionStart,d.end=a.selectionEnd,d.text=a.value.slice(d.start,d.end);else if(c.selection){a.focus();var e=c.selection.createRange(),f=c.body.createTextRange();d.text=e.text;try{f.moveToElementText(a),f.setEndPoint("StartToStart",e)}catch(h){f=a.createTextRange(),f.setEndPoint("StartToStart",e)}d.start=a.value.length-f.text.length,d.end=d.start+e.text.length}}catch(h){}return d},e={getPos:function(a){var b=d(a);return{start:b.start,end:b.end}},setPos:function(a,c,d){d=this._caretMode(d),"start"==d?c.end=c.start:"end"==d&&(c.start=c.end),a.focus();try{if(a.createTextRange){var e=a.createTextRange();b.navigator.userAgent.toLowerCase().indexOf("msie")>=0&&(c.start=a.value.substr(0,c.start).replace(/\r/g,"").length,c.end=a.value.substr(0,c.end).replace(/\r/g,"").length),e.collapse(!0),e.moveStart("character",c.start),e.moveEnd("character",c.end-c.start),e.select()}else a.setSelectionRange&&a.setSelectionRange(c.start,c.end)}catch(f){}},getText:function(a){return d(a).text},_caretMode:function(a){switch(a=a||"keep",a===!1&&(a="end"),a){case"keep":case"start":case"end":break;default:a="keep"}return a},replace:function(b,c,e){var f=d(b),g=b.value,h=a(b).scrollTop(),i={start:f.start,end:f.start+c.length};b.value=g.substr(0,f.start)+c+g.substr(f.end),a(b).scrollTop(h),this.setPos(b,i,e)},insertBefore:function(b,c,e){var f=d(b),g=b.value,h=a(b).scrollTop(),i={start:f.start+c.length,end:f.end+c.length};b.value=g.substr(0,f.start)+c+g.substr(f.start),a(b).scrollTop(h),this.setPos(b,i,e)},insertAfter:function(b,c,e){var f=d(b),g=b.value,h=a(b).scrollTop(),i={start:f.start,end:f.end};b.value=g.substr(0,f.end)+c+g.substr(f.end),a(b).scrollTop(h),this.setPos(b,i,e)}};a.extend({selection:function(d){var e="text"==(d||"text").toLowerCase();try{if(b.getSelection){if(e)return b.getSelection().toString();var g,f=b.getSelection();return f.getRangeAt?g=f.getRangeAt(0):(g=c.createRange(),g.setStart(f.anchorNode,f.anchorOffset),g.setEnd(f.focusNode,f.focusOffset)),a("<div></div>").append(g.cloneContents()).html()}if(c.selection)return e?c.selection.createRange().text:c.selection.createRange().htmlText}catch(h){}return""}}),a.fn.extend({selection:function(a,b){switch(b=b||{},a){case"getPos":return e.getPos(this[0]);case"setPos":return this.each(function(){e.setPos(this,b)});case"replace":return this.each(function(){e.replace(this,b.text,b.caret)});case"insert":return this.each(function(){"before"==b.mode?e.insertBefore(this,b.text,b.caret):e.insertAfter(this,b.text,b.caret)});case"get":default:return e.getText(this[0])}return this}})}(jQuery,window,window.document);