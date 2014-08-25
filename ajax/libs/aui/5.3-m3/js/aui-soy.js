/*! AUI Flat Pack - version 5.3-m3 - generated 2013-09-11 12:41:05 +1000 */


/*
 * Copyright 2008 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
var goog=goog||{};
goog.inherits=function(B,A){function C(){}C.prototype=A.prototype;
B.superClass_=A.prototype;
B.prototype=new C();
B.prototype.constructor=B
};
if(!goog.userAgent){goog.userAgent=(function(){var B="";
if("undefined"!==typeof navigator&&navigator&&"string"==typeof navigator.userAgent){B=navigator.userAgent
}var A=B.indexOf("Opera")==0;
return{HAS_JSCRIPT:typeof "ScriptEngine" in this,IS_OPERA:A,IS_IE:!A&&B.indexOf("MSIE")!=-1,IS_WEBKIT:!A&&B.indexOf("WebKit")!=-1}
})()
}if(!goog.asserts){goog.asserts={fail:function(A){}}
}if(!goog.dom){goog.dom={};
goog.dom.DomHelper=function(A){this.document_=A||document
};
goog.dom.DomHelper.prototype.getDocument=function(){return this.document_
};
goog.dom.DomHelper.prototype.createElement=function(A){return this.document_.createElement(A)
};
goog.dom.DomHelper.prototype.createDocumentFragment=function(){return this.document_.createDocumentFragment()
}
}if(!goog.format){goog.format={insertWordBreaks:function(I,A){I=String(I);
var F=[];
var H=0;
var B=false;
var J=false;
var G=0;
var D=0;
for(var E=0,C=I.length;
E<C;
++E){var K=I.charCodeAt(E);
if(G>=A&&K!=32){F[H++]=I.substring(D,E);
D=E;
F[H++]=goog.format.WORD_BREAK;
G=0
}if(B){if(K==62){B=false
}}else{if(J){switch(K){case 59:J=false;
++G;
break;
case 60:J=false;
B=true;
break;
case 32:J=false;
G=0;
break
}}else{switch(K){case 60:B=true;
break;
case 38:J=true;
break;
case 32:G=0;
break;
default:++G;
break
}}}}F[H++]=I.substring(D);
return F.join("")
},WORD_BREAK:goog.userAgent.IS_WEBKIT?"<wbr></wbr>":goog.userAgent.IS_OPERA?"&shy;":"<wbr>"}
}if(!goog.i18n){goog.i18n={bidi:{detectRtlDirectionality:function(B,A){B=soyshim.$$bidiStripHtmlIfNecessary_(B,A);
return soyshim.$$bidiRtlWordRatio_(B)>soyshim.$$bidiRtlDetectionThreshold_
}}}
}goog.i18n.bidi.Dir={RTL:-1,UNKNOWN:0,LTR:1};
goog.i18n.bidi.toDir=function(A){if(typeof A=="number"){return A>0?goog.i18n.bidi.Dir.LTR:A<0?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.UNKNOWN
}else{return A?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.LTR
}};
goog.i18n.BidiFormatter=function(A){this.dir_=goog.i18n.bidi.toDir(A)
};
goog.i18n.BidiFormatter.prototype.dirAttr=function(C,A){var B=soy.$$bidiTextDir(C,A);
return B&&B!=this.dir_?B<0?"dir=rtl":"dir=ltr":""
};
goog.i18n.BidiFormatter.prototype.endEdge=function(){return this.dir_<0?"left":"right"
};
goog.i18n.BidiFormatter.prototype.mark=function(){return((this.dir_>0)?"\u200E":(this.dir_<0)?"\u200F":"")
};
goog.i18n.BidiFormatter.prototype.markAfter=function(C,A){var B=soy.$$bidiTextDir(C,A);
return soyshim.$$bidiMarkAfterKnownDir_(this.dir_,B,C,A)
};
goog.i18n.BidiFormatter.prototype.spanWrap=function(D,C){D=String(D);
var B=soy.$$bidiTextDir(D,true);
var A=soyshim.$$bidiMarkAfterKnownDir_(this.dir_,B,D,true);
if(B>0&&this.dir_<=0){D="<span dir=ltr>"+D+"</span>"
}else{if(B<0&&this.dir_>=0){D="<span dir=rtl>"+D+"</span>"
}}return D+A
};
goog.i18n.BidiFormatter.prototype.startEdge=function(){return this.dir_<0?"right":"left"
};
goog.i18n.BidiFormatter.prototype.unicodeWrap=function(D,C){D=String(D);
var B=soy.$$bidiTextDir(D,true);
var A=soyshim.$$bidiMarkAfterKnownDir_(this.dir_,B,D,true);
if(B>0&&this.dir_<=0){D="\u202A"+D+"\u202C"
}else{if(B<0&&this.dir_>=0){D="\u202B"+D+"\u202C"
}}return D+A
};
goog.string={newLineToBr:function(B,A){B=String(B);
if(!goog.string.NEWLINE_TO_BR_RE_.test(B)){return B
}return B.replace(/(\r\n|\r|\n)/g,A?"<br />":"<br>")
},urlEncode:encodeURIComponent,NEWLINE_TO_BR_RE_:/[\r\n]/};
goog.string.StringBuffer=function(A,B){this.buffer_=goog.userAgent.HAS_JSCRIPT?[]:"";
if(A!=null){this.append.apply(this,arguments)
}};
goog.string.StringBuffer.prototype.bufferLength_=0;
goog.string.StringBuffer.prototype.append=function(C,B,E){if(goog.userAgent.HAS_JSCRIPT){if(B==null){this.buffer_[this.bufferLength_++]=C
}else{var A=this.buffer_;
A.push.apply(A,arguments);
this.bufferLength_=this.buffer_.length
}}else{this.buffer_+=C;
if(B!=null){for(var D=1;
D<arguments.length;
D++){this.buffer_+=arguments[D]
}}}return this
};
goog.string.StringBuffer.prototype.clear=function(){if(goog.userAgent.HAS_JSCRIPT){this.buffer_.length=0;
this.bufferLength_=0
}else{this.buffer_=""
}};
goog.string.StringBuffer.prototype.toString=function(){if(goog.userAgent.HAS_JSCRIPT){var A=this.buffer_.join("");
this.clear();
if(A){this.append(A)
}return A
}else{return(this.buffer_)
}};
if(!goog.soy){goog.soy={renderAsElement:function(C,A,B,D){return(soyshim.$$renderWithWrapper_(C,A,D,true,B))
},renderAsFragment:function(C,A,B,D){return soyshim.$$renderWithWrapper_(C,A,D,false,B)
},renderElement:function(C,D,A,B){C.innerHTML=D(A,null,B)
}}
}var soy={esc:{}};
var soydata={};
var soyshim={$$DEFAULT_TEMPLATE_DATA_:{}};
soyshim.$$renderWithWrapper_=function(H,F,B,C,I){var D=B||document;
var A=D.createElement("div");
A.innerHTML=H(F||soyshim.$$DEFAULT_TEMPLATE_DATA_,undefined,I);
if(A.childNodes.length==1){var G=A.firstChild;
if(!C||G.nodeType==1){return(G)
}}if(C){return A
}var E=D.createDocumentFragment();
while(A.firstChild){E.appendChild(A.firstChild)
}return E
};
soyshim.$$bidiMarkAfterKnownDir_=function(C,B,D,A){return(C>0&&(B<0||soyshim.$$bidiIsRtlExitText_(D,A))?"\u200E":C<0&&(B>0||soyshim.$$bidiIsLtrExitText_(D,A))?"\u200F":"")
};
soyshim.$$bidiStripHtmlIfNecessary_=function(B,A){return A?B.replace(soyshim.$$BIDI_HTML_SKIP_RE_," "):B
};
soyshim.$$BIDI_HTML_SKIP_RE_=/<[^>]*>|&[^;]+;/g;
soyshim.$$bidiLtrChars_="A-Za-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u02B8\u0300-\u0590\u0800-\u1FFF\u2C00-\uFB1C\uFDFE-\uFE6F\uFEFD-\uFFFF";
soyshim.$$bidiNeutralChars_="\u0000-\u0020!-@[-`{-\u00BF\u00D7\u00F7\u02B9-\u02FF\u2000-\u2BFF";
soyshim.$$bidiRtlChars_="\u0591-\u07FF\uFB1D-\uFDFD\uFE70-\uFEFC";
soyshim.$$bidiRtlDirCheckRe_=new RegExp("^[^"+soyshim.$$bidiLtrChars_+"]*["+soyshim.$$bidiRtlChars_+"]");
soyshim.$$bidiNeutralDirCheckRe_=new RegExp("^["+soyshim.$$bidiNeutralChars_+"]*$|^http://");
soyshim.$$bidiIsRtlText_=function(A){return soyshim.$$bidiRtlDirCheckRe_.test(A)
};
soyshim.$$bidiIsNeutralText_=function(A){return soyshim.$$bidiNeutralDirCheckRe_.test(A)
};
soyshim.$$bidiRtlDetectionThreshold_=0.4;
soyshim.$$bidiRtlWordRatio_=function(E){var B=0;
var A=0;
var D=E.split(" ");
for(var C=0;
C<D.length;
C++){if(soyshim.$$bidiIsRtlText_(D[C])){B++;
A++
}else{if(!soyshim.$$bidiIsNeutralText_(D[C])){A++
}}}return A==0?0:B/A
};
soyshim.$$bidiLtrExitDirCheckRe_=new RegExp("["+soyshim.$$bidiLtrChars_+"][^"+soyshim.$$bidiRtlChars_+"]*$");
soyshim.$$bidiRtlExitDirCheckRe_=new RegExp("["+soyshim.$$bidiRtlChars_+"][^"+soyshim.$$bidiLtrChars_+"]*$");
soyshim.$$bidiIsLtrExitText_=function(B,A){B=soyshim.$$bidiStripHtmlIfNecessary_(B,A);
return soyshim.$$bidiLtrExitDirCheckRe_.test(B)
};
soyshim.$$bidiIsRtlExitText_=function(B,A){B=soyshim.$$bidiStripHtmlIfNecessary_(B,A);
return soyshim.$$bidiRtlExitDirCheckRe_.test(B)
};
soy.StringBuilder=goog.string.StringBuffer;
soydata.SanitizedContentKind={HTML:0,JS_STR_CHARS:1,URI:2,HTML_ATTRIBUTE:3};
soydata.SanitizedContent=function(A){this.content=A
};
soydata.SanitizedContent.prototype.contentKind;
soydata.SanitizedContent.prototype.toString=function(){return this.content
};
soydata.SanitizedHtml=function(A){soydata.SanitizedContent.call(this,A)
};
goog.inherits(soydata.SanitizedHtml,soydata.SanitizedContent);
soydata.SanitizedHtml.prototype.contentKind=soydata.SanitizedContentKind.HTML;
soydata.SanitizedJsStrChars=function(A){soydata.SanitizedContent.call(this,A)
};
goog.inherits(soydata.SanitizedJsStrChars,soydata.SanitizedContent);
soydata.SanitizedJsStrChars.prototype.contentKind=soydata.SanitizedContentKind.JS_STR_CHARS;
soydata.SanitizedUri=function(A){soydata.SanitizedContent.call(this,A)
};
goog.inherits(soydata.SanitizedUri,soydata.SanitizedContent);
soydata.SanitizedUri.prototype.contentKind=soydata.SanitizedContentKind.URI;
soydata.SanitizedHtmlAttribute=function(A){soydata.SanitizedContent.call(this,A)
};
goog.inherits(soydata.SanitizedHtmlAttribute,soydata.SanitizedContent);
soydata.SanitizedHtmlAttribute.prototype.contentKind=soydata.SanitizedContentKind.HTML_ATTRIBUTE;
soy.renderElement=goog.soy.renderElement;
soy.renderAsFragment=function(D,B,A,C){return goog.soy.renderAsFragment(D,B,C,new goog.dom.DomHelper(A))
};
soy.renderAsElement=function(D,B,A,C){return goog.soy.renderAsElement(D,B,C,new goog.dom.DomHelper(A))
};
soy.$$augmentData=function(D,A){function E(){}E.prototype=D;
var C=new E();
for(var B in A){C[B]=A[B]
}return C
};
soy.$$getMapKeys=function(C){var B=[];
for(var A in C){B.push(A)
}return B
};
soy.$$getDelegateId=function(A){return A
};
soy.$$DELEGATE_REGISTRY_PRIORITIES_={};
soy.$$DELEGATE_REGISTRY_FUNCTIONS_={};
soy.$$registerDelegateFn=function(E,C,B){var D="key_"+E;
var A=soy.$$DELEGATE_REGISTRY_PRIORITIES_[D];
if(A===undefined||C>A){soy.$$DELEGATE_REGISTRY_PRIORITIES_[D]=C;
soy.$$DELEGATE_REGISTRY_FUNCTIONS_[D]=B
}else{if(C==A){throw Error('Encountered two active delegates with same priority (id/name "'+E+'").')
}else{}}};
soy.$$getDelegateFn=function(B){var A=soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_"+B];
return A?A:soy.$$EMPTY_TEMPLATE_FN_
};
soy.$$EMPTY_TEMPLATE_FN_=function(A,C,B){return""
};
soy.$$escapeHtml=function(A){if(typeof A==="object"&&A&&A.contentKind===soydata.SanitizedContentKind.HTML){return A.content
}return soy.esc.$$escapeHtmlHelper(A)
};
soy.$$escapeHtmlRcdata=function(A){if(typeof A==="object"&&A&&A.contentKind===soydata.SanitizedContentKind.HTML){return soy.esc.$$normalizeHtmlHelper(A.content)
}return soy.esc.$$escapeHtmlHelper(A)
};
soy.$$stripHtmlTags=function(A){return String(A).replace(soy.esc.$$HTML_TAG_REGEX_,"")
};
soy.$$escapeHtmlAttribute=function(A){if(typeof A==="object"&&A&&A.contentKind===soydata.SanitizedContentKind.HTML){return soy.esc.$$normalizeHtmlHelper(soy.$$stripHtmlTags(A.content))
}return soy.esc.$$escapeHtmlHelper(A)
};
soy.$$escapeHtmlAttributeNospace=function(A){if(typeof A==="object"&&A&&A.contentKind===soydata.SanitizedContentKind.HTML){return soy.esc.$$normalizeHtmlNospaceHelper(soy.$$stripHtmlTags(A.content))
}return soy.esc.$$escapeHtmlNospaceHelper(A)
};
soy.$$filterHtmlAttribute=function(A){if(typeof A==="object"&&A&&A.contentKind===soydata.SanitizedContentKind.HTML_ATTRIBUTE){return A.content.replace(/=([^"']*)$/,'="$1"')
}return soy.esc.$$filterHtmlAttributeHelper(A)
};
soy.$$filterHtmlElementName=function(A){return soy.esc.$$filterHtmlElementNameHelper(A)
};
soy.$$escapeJs=function(A){return soy.$$escapeJsString(A)
};
soy.$$escapeJsString=function(A){if(typeof A==="object"&&A.contentKind===soydata.SanitizedContentKind.JS_STR_CHARS){return A.content
}return soy.esc.$$escapeJsStringHelper(A)
};
soy.$$escapeJsValue=function(A){if(A==null){return" null "
}switch(typeof A){case"boolean":case"number":return" "+A+" ";
default:return"'"+soy.esc.$$escapeJsStringHelper(String(A))+"'"
}};
soy.$$escapeJsRegex=function(A){return soy.esc.$$escapeJsRegexHelper(A)
};
soy.$$problematicUriMarks_=/['()]/g;
soy.$$pctEncode_=function(A){return"%"+A.charCodeAt(0).toString(16)
};
soy.$$escapeUri=function(A){if(typeof A==="object"&&A.contentKind===soydata.SanitizedContentKind.URI){return soy.$$normalizeUri(A)
}var B=soy.esc.$$escapeUriHelper(A);
soy.$$problematicUriMarks_.lastIndex=0;
if(soy.$$problematicUriMarks_.test(B)){return B.replace(soy.$$problematicUriMarks_,soy.$$pctEncode_)
}return B
};
soy.$$normalizeUri=function(A){return soy.esc.$$normalizeUriHelper(A)
};
soy.$$filterNormalizeUri=function(A){return soy.esc.$$filterNormalizeUriHelper(A)
};
soy.$$escapeCssString=function(A){return soy.esc.$$escapeCssStringHelper(A)
};
soy.$$filterCssValue=function(A){if(A==null){return""
}return soy.esc.$$filterCssValueHelper(A)
};
soy.$$changeNewlineToBr=function(A){return goog.string.newLineToBr(String(A),false)
};
soy.$$insertWordBreaks=function(B,A){return goog.format.insertWordBreaks(String(B),A)
};
soy.$$truncate=function(C,A,B){C=String(C);
if(C.length<=A){return C
}if(B){if(A>3){A-=3
}else{B=false
}}if(soy.$$isHighSurrogate_(C.charAt(A-1))&&soy.$$isLowSurrogate_(C.charAt(A))){A-=1
}C=C.substring(0,A);
if(B){C+="..."
}return C
};
soy.$$isHighSurrogate_=function(A){return 55296<=A&&A<=56319
};
soy.$$isLowSurrogate_=function(A){return 56320<=A&&A<=57343
};
soy.$$bidiFormatterCache_={};
soy.$$getBidiFormatterInstance_=function(A){return soy.$$bidiFormatterCache_[A]||(soy.$$bidiFormatterCache_[A]=new goog.i18n.BidiFormatter(A))
};
soy.$$bidiTextDir=function(B,A){if(!B){return 0
}return goog.i18n.bidi.detectRtlDirectionality(B,A)?-1:1
};
soy.$$bidiDirAttr=function(B,C,A){return new soydata.SanitizedHtmlAttribute(soy.$$getBidiFormatterInstance_(B).dirAttr(C,A))
};
soy.$$bidiMarkAfter=function(B,D,A){var C=soy.$$getBidiFormatterInstance_(B);
return C.markAfter(D,A)
};
soy.$$bidiSpanWrap=function(A,C){var B=soy.$$getBidiFormatterInstance_(A);
return B.spanWrap(C+"",true)
};
soy.$$bidiUnicodeWrap=function(A,C){var B=soy.$$getBidiFormatterInstance_(A);
return B.unicodeWrap(C+"",true)
};
soy.esc.$$escapeUriHelper=function(A){return encodeURIComponent(String(A))
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_={"\x00":"\x26#0;","\x22":"\x26quot;","\x26":"\x26amp;","\x27":"\x26#39;","\x3c":"\x26lt;","\x3e":"\x26gt;","\x09":"\x26#9;","\x0a":"\x26#10;","\x0b":"\x26#11;","\x0c":"\x26#12;","\x0d":"\x26#13;"," ":"\x26#32;","-":"\x26#45;","/":"\x26#47;","\x3d":"\x26#61;","`":"\x26#96;","\x85":"\x26#133;","\xa0":"\x26#160;","\u2028":"\x26#8232;","\u2029":"\x26#8233;"};
soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_=function(A){return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_[A]
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_={"\x00":"\\x00","\x08":"\\x08","\x09":"\\t","\x0a":"\\n","\x0b":"\\x0b","\x0c":"\\f","\x0d":"\\r","\x22":"\\x22","\x26":"\\x26","\x27":"\\x27","/":"\\/","\x3c":"\\x3c","\x3d":"\\x3d","\x3e":"\\x3e","\\":"\\\\","\x85":"\\x85","\u2028":"\\u2028","\u2029":"\\u2029","$":"\\x24","(":"\\x28",")":"\\x29","*":"\\x2a","+":"\\x2b",",":"\\x2c","-":"\\x2d",".":"\\x2e",":":"\\x3a","?":"\\x3f","[":"\\x5b","]":"\\x5d","^":"\\x5e","{":"\\x7b","|":"\\x7c","}":"\\x7d"};
soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_=function(A){return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_[A]
};
soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_={"\x00":"\\0 ","\x08":"\\8 ","\x09":"\\9 ","\x0a":"\\a ","\x0b":"\\b ","\x0c":"\\c ","\x0d":"\\d ","\x22":"\\22 ","\x26":"\\26 ","\x27":"\\27 ","(":"\\28 ",")":"\\29 ","*":"\\2a ","/":"\\2f ",":":"\\3a ",";":"\\3b ","\x3c":"\\3c ","\x3d":"\\3d ","\x3e":"\\3e ","@":"\\40 ","\\":"\\5c ","{":"\\7b ","}":"\\7d ","\x85":"\\85 ","\xa0":"\\a0 ","\u2028":"\\2028 ","\u2029":"\\2029 "};
soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_=function(A){return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_[A]
};
soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_={"\x00":"%00","\x01":"%01","\x02":"%02","\x03":"%03","\x04":"%04","\x05":"%05","\x06":"%06","\x07":"%07","\x08":"%08","\x09":"%09","\x0a":"%0A","\x0b":"%0B","\x0c":"%0C","\x0d":"%0D","\x0e":"%0E","\x0f":"%0F","\x10":"%10","\x11":"%11","\x12":"%12","\x13":"%13","\x14":"%14","\x15":"%15","\x16":"%16","\x17":"%17","\x18":"%18","\x19":"%19","\x1a":"%1A","\x1b":"%1B","\x1c":"%1C","\x1d":"%1D","\x1e":"%1E","\x1f":"%1F"," ":"%20","\x22":"%22","\x27":"%27","(":"%28",")":"%29","\x3c":"%3C","\x3e":"%3E","\\":"%5C","{":"%7B","}":"%7D","\x7f":"%7F","\x85":"%C2%85","\xa0":"%C2%A0","\u2028":"%E2%80%A8","\u2029":"%E2%80%A9","\uff01":"%EF%BC%81","\uff03":"%EF%BC%83","\uff04":"%EF%BC%84","\uff06":"%EF%BC%86","\uff07":"%EF%BC%87","\uff08":"%EF%BC%88","\uff09":"%EF%BC%89","\uff0a":"%EF%BC%8A","\uff0b":"%EF%BC%8B","\uff0c":"%EF%BC%8C","\uff0f":"%EF%BC%8F","\uff1a":"%EF%BC%9A","\uff1b":"%EF%BC%9B","\uff1d":"%EF%BC%9D","\uff1f":"%EF%BC%9F","\uff20":"%EF%BC%A0","\uff3b":"%EF%BC%BB","\uff3d":"%EF%BC%BD"};
soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_=function(A){return soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_[A]
};
soy.esc.$$MATCHER_FOR_ESCAPE_HTML_=/[\x00\x22\x26\x27\x3c\x3e]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_=/[\x00\x22\x27\x3c\x3e]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_=/[\x00\x09-\x0d \x22\x26\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_=/[\x00\x09-\x0d \x22\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_=/[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_=/[\x00\x08-\x0d\x22\x24\x26-\/\x3a\x3c-\x3f\x5b-\x5e\x7b-\x7d\x85\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_=/[\x00\x08-\x0d\x22\x26-\x2a\/\x3a-\x3e@\\\x7b\x7d\x85\xa0\u2028\u2029]/g;
soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_=/[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g;
soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_=/^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i;
soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_=/^(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i;
soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTE_=/^(?!style|on|action|archive|background|cite|classid|codebase|data|dsync|href|longdesc|src|usemap)(?:[a-z0-9_$:-]*)$/i;
soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_=/^(?!script|style|title|textarea|xmp|no)[a-z0-9_$:-]*$/i;
soy.esc.$$escapeHtmlHelper=function(A){var B=String(A);
return B.replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_,soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$normalizeHtmlHelper=function(A){var B=String(A);
return B.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_,soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$escapeHtmlNospaceHelper=function(A){var B=String(A);
return B.replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_,soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$normalizeHtmlNospaceHelper=function(A){var B=String(A);
return B.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_,soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_)
};
soy.esc.$$escapeJsStringHelper=function(A){var B=String(A);
return B.replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_,soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_)
};
soy.esc.$$escapeJsRegexHelper=function(A){var B=String(A);
return B.replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_,soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_)
};
soy.esc.$$escapeCssStringHelper=function(A){var B=String(A);
return B.replace(soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_,soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_)
};
soy.esc.$$filterCssValueHelper=function(A){var B=String(A);
if(!soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_.test(B)){return"zSoyz"
}return B
};
soy.esc.$$normalizeUriHelper=function(A){var B=String(A);
return B.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_,soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_)
};
soy.esc.$$filterNormalizeUriHelper=function(A){var B=String(A);
if(!soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_.test(B)){return"zSoyz"
}return B.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_,soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_)
};
soy.esc.$$filterHtmlAttributeHelper=function(A){var B=String(A);
if(!soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTE_.test(B)){return"zSoyz"
}return B
};
soy.esc.$$filterHtmlElementNameHelper=function(A){var B=String(A);
if(!soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_.test(B)){return"zSoyz"
}return B
};
soy.esc.$$HTML_TAG_REGEX_=/<(?:!|\/?[a-zA-Z])(?:[^>'"]|"[^"]*"|'[^']*')*>/g;
if(typeof aui=="undefined"){var aui={}}aui.renderExtraAttributes=function(a,h,f){var b=h||new soy.StringBuilder();if(a!=null&&a.extraAttributes){if(Object.prototype.toString.call(a.extraAttributes)==="[object Object]"){var e=soy.$$getMapKeys(a.extraAttributes);var g=e.length;for(var c=0;c<g;c++){var d=e[c];b.append(" ",soy.$$escapeHtml(d),'="',soy.$$escapeHtml(a.extraAttributes[d]),'"')}}else{b.append(" ",a.extraAttributes)}}return h?"":b.toString()};aui.renderExtraClasses=function(h,f,i){var c=f||new soy.StringBuilder();if(h!=null&&h.extraClasses){if(h.isFullAttr){c.append(' class="');if((h.extraClasses) instanceof Array){var k=h.extraClasses;var g=k.length;for(var l=0;l<g;l++){var j=k[l];c.append((!(l==0))?" ":"",soy.$$escapeHtml(j))}}else{c.append(soy.$$escapeHtml(h.extraClasses))}c.append('"')}else{if((h.extraClasses) instanceof Array){var d=h.extraClasses;var a=d.length;for(var e=0;e<a;e++){var b=d[e];c.append(" ",soy.$$escapeHtml(b))}}else{c.append(" ",soy.$$escapeHtml(h.extraClasses))}}}return f?"":c.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.avatar=="undefined"){aui.avatar={}}aui.avatar.avatar=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"span"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-avatar aui-avatar-',soy.$$escapeHtml(a.size),soy.$$escapeHtml(a.isProject?" aui-avatar-project":""),soy.$$escapeHtml(a.badgeContent?" aui-avatar-badged":""));aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append('><span class="aui-avatar-inner"><img src="',soy.$$escapeHtml(a.avatarImageUrl),'"',(a.accessibilityText)?' alt="'+soy.$$escapeHtml(a.accessibilityText)+'"':"",(a.title)?' title="'+soy.$$escapeHtml(a.title)+'"':"",(a.imageClasses)?' class="'+soy.$$escapeHtml(a.imageClasses)+'"':""," /></span>",(a.badgeContent)?a.badgeContent:"","</",soy.$$escapeHtml(a.tagName?a.tagName:"span"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.badges=="undefined"){aui.badges={}}aui.badges.badge=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"span"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-badge');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",soy.$$escapeHtml(a.text),"</",soy.$$escapeHtml(a.tagName?a.tagName:"span"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.buttons=="undefined"){aui.buttons={}}aui.buttons.button=function(a,d,c){var b=d||new soy.StringBuilder();if(a.href){b.append('<a href="',soy.$$escapeHtml(a.href),'"');aui.buttons.buttonAttributes(a,b,c);b.append(">");aui.buttons.buttonIcon(a,b,c);b.append(soy.$$escapeHtml(a.text),"</a>")}else{if(a.tagName=="input"){b.append('<input type="',soy.$$escapeHtml(a.inputType?a.inputType:"button"),'" ');aui.buttons.buttonAttributes(a,b,c);b.append(' value="',soy.$$escapeHtml(a.text),'" />')}else{b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"button"));aui.buttons.buttonAttributes(a,b,c);b.append(">");aui.buttons.buttonIcon(a,b,c);b.append(soy.$$escapeHtml(a.text),"</",soy.$$escapeHtml(a.tagName?a.tagName:"button"),">")}}return d?"":b.toString()};aui.buttons.buttons=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-buttons');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div>");return d?"":b.toString()};aui.buttons.buttonAttributes=function(a,d,c){var b=d||new soy.StringBuilder();b.append((a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-button',(a.splitButtonType=="main")?" aui-button-split-main":"",(a.dropdown2Target)?" aui-dropdown2-trigger"+((a.splitButtonType=="more")?" aui-button-split-more":""):"");switch(a.type){case"primary":b.append(" aui-button-primary");break;case"link":b.append(" aui-button-link");break;case"subtle":b.append(" aui-button-subtle");break}aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append((a.isPressed)?' aria-pressed="'+soy.$$escapeHtml(a.isPressed)+'"':"",(a.isDisabled)?' aria-disabled="'+soy.$$escapeHtml(a.isDisabled)+'"'+((a.isDisabled==true)?(a.tagName=="button"||a.tagName=="input")?' disabled="disabled" ':"":""):"",(a.dropdown2Target)?' aria-owns="'+soy.$$escapeHtml(a.dropdown2Target)+'" aria-haspopup="true"':"",(a.tagName=="a")?' tabindex="0"':"");return d?"":b.toString()};aui.buttons.buttonIcon=function(a,d,c){var b=d||new soy.StringBuilder();b.append((a.iconType)?'<span class="'+((a.iconType=="aui")?"aui-icon":"")+((a.iconClass)?" "+soy.$$escapeHtml(a.iconClass):"")+'">'+((a.iconText)?soy.$$escapeHtml(a.iconText)+" ":"")+"</span>":"");return d?"":b.toString()};aui.buttons.splitButton=function(a,d,c){var b=d||new soy.StringBuilder();aui.buttons.button(soy.$$augmentData(a.splitButtonMain,{splitButtonType:"main"}),b,c);aui.buttons.button(soy.$$augmentData(a.splitButtonMore,{splitButtonType:"more"}),b,c);return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.dialog=="undefined"){aui.dialog={}}aui.dialog.dialog2=function(a,e,c){var b=e||new soy.StringBuilder();var d=new soy.StringBuilder();aui.dialog.dialog2Content(a,d,c);aui.dialog.dialog2Chrome({id:a.id,titleId:a.id?a.id+"-dialog-title":null,modal:a.modal,visible:a.visible,size:a.size,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes,content:d.toString()},b,c);return e?"":b.toString()};aui.dialog.dialog2Chrome=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<section",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",(a.titleId)?' aria-labelledby="'+soy.$$escapeHtml(a.titleId)+'"':"",' role="dialog" class=" aui-layer aui-dialog2 aui-dialog2-',soy.$$escapeHtml(a.size?a.size:"medium"));aui.renderExtraClasses(a,b,c);b.append('"',(a.modal)?'data-aui-modal="true"':"",(a.visible!=true)?'aria-hidden="true"':"");aui.renderExtraAttributes(a,b,c);b.append(">",(a.content)?a.content:"","</section>");return d?"":b.toString()};aui.dialog.dialog2Content=function(a,d,c){var b=d||new soy.StringBuilder();aui.dialog.dialog2Header({titleId:a.id?a.id+"-dialog-title":null,titleText:a.titleText,titleContent:a.titleContent,actionContent:a.headerActionContent,secondaryContent:a.headerSecondaryContent,modal:a.modal},b,c);aui.dialog.dialog2Panel(a,b,c);aui.dialog.dialog2Footer({hintText:a.footerHintText,hintContent:a.footerHintContent,actionContent:a.footerActionContent},b,c);return d?"":b.toString()};aui.dialog.dialog2Header=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<header",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-dialog2-header');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append("><h1 ",(a.titleId)?' id="'+soy.$$escapeHtml(a.titleId)+'"':"",' class="aui-dialog2-header-main">',(a.titleText)?soy.$$escapeHtml(a.titleText):"",(a.titleContent)?a.titleContent:"","</h1>",(a.actionContent)?'<div class="aui-dialog2-header-actions">'+a.actionContent+"</div>":"",(a.secondaryContent)?'<div class="aui-dialog2-header-secondary">'+a.secondaryContent+"</div>":"",(a.modal!=true)?'<a class="aui-dialog2-header-close"><span class="aui-icon aui-icon-small aui-iconfont-close-dialog">'+soy.$$escapeHtml("Close")+"</span></a>":"","</header>");return d?"":b.toString()};aui.dialog.dialog2Footer=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<footer",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-dialog2-footer');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",(a.actionContent)?'<div class="aui-dialog2-footer-actions">'+a.actionContent+"</div>":"",(a.hintText||a.hintContent)?'<div class="aui-dialog2-footer-hint">'+((a.hintText)?soy.$$escapeHtml(a.hintText):"")+((a.hintContent)?a.hintContent:"")+"</div>":"","</footer>");return d?"":b.toString()};aui.dialog.dialog2Panel=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-dialog2-content');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",(a.content)?a.content:"","</div>");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.dropdown=="undefined"){aui.dropdown={}}aui.dropdown.trigger=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<a",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-dd-trigger');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append('><span class="dropdown-text">',(a.accessibilityText)?soy.$$escapeHtml(a.accessibilityText):"","</span>",(!(a.showIcon==false))?'<span class="icon icon-dropdown"></span>':"","</a>");return d?"":b.toString()};aui.dropdown.menu=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"ul"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-dropdown hidden');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"ul"),">");return d?"":b.toString()};aui.dropdown.parent=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-dd-parent');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};aui.dropdown.item=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"li"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="dropdown-item');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append('><a href="',soy.$$escapeHtml(a.url?a.url:"#"),'">',soy.$$escapeHtml(a.text),"</a></",soy.$$escapeHtml(a.tagName?a.tagName:"li"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.dropdown2=="undefined"){aui.dropdown2={}}aui.dropdown2.dropdown2=function(a,d,c){var b=d||new soy.StringBuilder();aui.dropdown2.trigger(soy.$$augmentData(a.trigger,{menu:a.menu}),b,c);aui.dropdown2.contents(a.menu,b,c);return d?"":b.toString()};aui.dropdown2.trigger=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"a"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-dropdown2-trigger');aui.renderExtraClasses(a,b,c);b.append('" aria-owns="',soy.$$escapeHtml(a.menu.id),'" aria-haspopup="true"',(a.title)?' title="'+soy.$$escapeHtml(a.title)+'"':"",(a.container)?' data-container="'+soy.$$escapeHtml(a.container)+'"':"",((!a.tagName||a.tagName=="a")&&(!a.extraAttributes||Object.prototype.toString.call(a.extraAttributes)==="[object Object]"&&!a.extraAttributes.href&&!a.extraAttributes.tabindex))?' tabindex="0"':"");aui.renderExtraAttributes(a,b,c);b.append(">",(a.content)?a.content:"",(a.text)?soy.$$escapeHtml(a.text):"",(!(a.showIcon==false))?'<span class="icon aui-icon-dropdown"></span>':"","</",soy.$$escapeHtml(a.tagName?a.tagName:"a"),">");return d?"":b.toString()};aui.dropdown2.contents=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div id="',soy.$$escapeHtml(a.id),'" class="aui-dropdown2');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",(a.content)?a.content:"","</div>");return d?"":b.toString()};aui.dropdown2.section=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-dropdown2-section');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",(a.label)?"<strong>"+soy.$$escapeHtml(a.label)+"</strong>":"",a.content,"</div>");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.expander=="undefined"){aui.expander={}}aui.expander.content=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-expander-content');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append((a.initiallyExpanded)?' aria-expanded="'+soy.$$escapeHtml(a.initiallyExpanded)+'"':"",">",(a.content)?a.content:"","</div>");return d?"":b.toString()};aui.expander.trigger=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tag?a.tag:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",(a.replaceText)?' data-replace-text="'+soy.$$escapeHtml(a.replaceText)+'"':"",(a.replaceSelector)?' data-replace-selector="'+soy.$$escapeHtml(a.replaceSelector)+'"':"",' class="aui-expander-trigger');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(' aria-controls="',soy.$$escapeHtml(a.contentId),'"',(a.collapsible)?' data-collapsible="'+soy.$$escapeHtml(a.collapsible)+'"':"",">",(a.content)?a.content:"","</",soy.$$escapeHtml(a.tag?a.tag:"div"),">");return d?"":b.toString()};aui.expander.revealText=function(a,e,d){var b=e||new soy.StringBuilder();var c=new soy.StringBuilder(soy.$$escapeHtml(a.contentContent));aui.expander.trigger({id:a.triggerId,contentId:a.contentId,tag:"a",content:"<span class='reveal-text-trigger-text'>Show more</span>",replaceSelector:".reveal-text-trigger-text",replaceText:"Show less",extraAttributes:a.triggerExtraAttributes,extraClasses:((a.triggerExtraClasses)?soy.$$escapeHtml(a.triggerExtraClasses)+"  ":"")+" aui-expander-reveal-text"},c,d);aui.expander.content({id:a.contentId,content:c.toString(),extraAttributes:a.contentExtraAttributes,extraClasses:a.contentExtraClasses},b,d);return e?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.form=="undefined"){aui.form={}}aui.form.form=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<form",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui',(a.isUnsectioned)?" unsectioned":"",(a.isLongLabels)?" long-label":"",(a.isTopLabels)?" top-label":"");aui.renderExtraClasses(a,b,c);b.append('" action="',soy.$$escapeHtml(a.action),'" method="',soy.$$escapeHtml(a.method?a.method:"post"),'"',(a.enctype)?'enctype="'+soy.$$escapeHtml(a.enctype)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</form>");return d?"":b.toString()};aui.form.formDescription=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="field-group');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div>");return d?"":b.toString()};aui.form.fieldset=function(a,e,d){var b=e||new soy.StringBuilder();var c=a.isInline||a.isDateSelect||a.isGroup||a.extraClasses;b.append("<fieldset",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");if(c){b.append(' class="',soy.$$escapeHtml(a.isInline?"inline":a.isDateSelect?"date-select":a.isGroup?"group":""));aui.renderExtraClasses(a,b,d);b.append('"')}aui.renderExtraAttributes(a,b,d);b.append("><legend><span>",a.legendContent,"</span></legend>",a.content,"</fieldset>");return e?"":b.toString()};aui.form.fieldGroup=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="field-group');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div>");return d?"":b.toString()};aui.form.buttons=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div class="buttons-container',(a.alignment)?" "+soy.$$escapeHtml(a.alignment):"",'"><div class="buttons">',a.content,"</div></div>");return d?"":b.toString()};aui.form.label=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<label",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' for="',soy.$$escapeHtml(a.forField),'"');aui.renderExtraClasses(soy.$$augmentData(a,{isFullAttr:true}),b,c);aui.renderExtraAttributes(a,b,c);b.append(">",a.content,(a.isRequired)?'<span class="aui-icon icon-required"></span>':"","</label>");return d?"":b.toString()};aui.form.input=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<input",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="',soy.$$escapeHtml(a.type=="password"?"text":a.type=="submit"?"button":a.type));aui.renderExtraClasses(a,b,c);b.append('" type="',soy.$$escapeHtml(a.type),'" name="',(a.name)?soy.$$escapeHtml(a.name):soy.$$escapeHtml(a.id),'"',(a.value)?' value="'+soy.$$escapeHtml(a.value)+'"':"",((a.type=="checkbox"||a.type=="radio")&&a.isChecked)?' checked="checked"':"",(a.type=="text"&&a.maxLength)?' maxlength="'+soy.$$escapeHtml(a.maxLength)+'"':"",(a.type=="text"&&a.size)?' size="'+soy.$$escapeHtml(a.size)+'"':"",(a.isDisabled)?" disabled":"");aui.renderExtraAttributes(a,b,c);b.append("/>");return d?"":b.toString()};aui.form.submit=function(a,e,d){var c=e||new soy.StringBuilder();var b=new soy.StringBuilder((a.name)?'name="'+soy.$$escapeHtml(a.name)+'"':"");aui.renderExtraAttributes(a,b,d);aui.buttons.button({id:a.id,tagName:"input",inputType:"submit",text:a.text,type:a.type,href:a.href,isDisabled:a.isDisabled,isPressed:a.isPressed,iconType:a.iconType,iconText:a.iconText,iconClass:a.iconClass,dropdown2Target:a.dropdown2Target,splitButtonType:a.splitButtonType,extraClasses:a.extraClasses,extraAttributes:b.toString()},c,d);return e?"":c.toString()};aui.form.button=function(b,e,d){var c=e||new soy.StringBuilder();var a=new soy.StringBuilder((b.name)?'name="'+soy.$$escapeHtml(b.name)+'"':"");aui.renderExtraAttributes(b,a,d);aui.buttons.button({id:b.id,tagName:b.tagName,inputType:b.inputType,text:b.text,type:b.type,href:b.href,isDisabled:b.isDisabled,isPressed:b.isPressed,iconType:b.iconType,iconText:b.iconText,iconClass:b.iconClass,dropdown2Target:b.dropdown2Target,splitButtonType:b.splitButtonType,extraClasses:b.extraClasses,extraAttributes:a.toString()},c,d);return e?"":c.toString()};aui.form.linkButton=function(a,f,d){var c=f||new soy.StringBuilder();var b=new soy.StringBuilder("cancel");aui.renderExtraClasses(a,b,d);var e=new soy.StringBuilder((a.name)?'name="'+soy.$$escapeHtml(a.name)+'"':"");aui.renderExtraAttributes(a,e,d);aui.buttons.button({id:a.id,tagName:"a",inputType:a.inputType,text:a.text,type:"link",href:a.href?a.href:a.url,isDisabled:a.isDisabled,isPressed:a.isPressed,iconType:a.iconType,iconText:a.iconText,iconClass:a.iconClass,dropdown2Target:a.dropdown2Target,splitButtonType:a.splitButtonType,extraClasses:b.toString(),extraAttributes:e.toString()},c,d);return f?"":c.toString()};aui.form.textarea=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<textarea",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' name="',(a.name)?soy.$$escapeHtml(a.name):soy.$$escapeHtml(a.id),'" class="textarea');aui.renderExtraClasses(a,b,c);b.append('"',(a.rows)?' rows="'+soy.$$escapeHtml(a.rows)+'"':"",(a.cols)?' cols="'+soy.$$escapeHtml(a.cols)+'"':"",(a.isDisabled)?" disabled":"");aui.renderExtraAttributes(a,b,c);b.append(">",(a.value)?soy.$$escapeHtml(a.value):"","</textarea>");return d?"":b.toString()};aui.form.select=function(a,h,f){var d=h||new soy.StringBuilder();d.append("<select",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' name="',(a.name)?soy.$$escapeHtml(a.name):soy.$$escapeHtml(a.id),'" class="',soy.$$escapeHtml(a.isMultiple?"multi-select":"select"));aui.renderExtraClasses(a,d,f);d.append('"',(a.size)?' size="'+soy.$$escapeHtml(a.size)+'"':"",(a.isDisabled)?" disabled":"",(a.isMultiple)?" multiple":"");aui.renderExtraAttributes(a,d,f);d.append(">");var g=a.options;var e=g.length;for(var b=0;b<e;b++){var c=g[b];aui.form.optionOrOptgroup(c,d,f)}d.append("</select>");return h?"":d.toString()};aui.form.optionOrOptgroup=function(a,h,f){var b=h||new soy.StringBuilder();if(a.options){b.append('<optgroup label="',soy.$$escapeHtml(a.text),'">');var g=a.options;var e=g.length;for(var c=0;c<e;c++){var d=g[c];aui.form.optionOrOptgroup(d,b,f)}b.append("</optgroup>")}else{b.append('<option value="',soy.$$escapeHtml(a.value),'" ',(a.selected)?"selected":"",">",soy.$$escapeHtml(a.text),"</option>")}return h?"":b.toString()};aui.form.value=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<span",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="field-value');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</span>");return d?"":b.toString()};aui.form.field=function(e,c,g){var a=c||new soy.StringBuilder();var j=e.type=="checkbox"||e.type=="radio";var f=e.fieldWidth?e.fieldWidth+"-field":"";a.append('<div class="',(j)?soy.$$escapeHtml(e.type):"field-group");aui.renderExtraClasses(e,a,g);a.append('"');aui.renderExtraAttributes(e,a,g);a.append(">");if(e.labelContent&&!j){aui.form.label({forField:e.id,isRequired:e.isRequired,content:e.labelContent},a,g)}switch(e.type){case"textarea":aui.form.textarea({id:e.id,name:e.name,value:e.value,rows:e.rows,cols:e.cols,isDisabled:e.isDisabled?true:false,extraClasses:f},a,g);break;case"select":aui.form.select({id:e.id,name:e.name,options:e.options,isMultiple:e.isMultiple,size:e.size,isDisabled:e.isDisabled?true:false,extraClasses:f},a,g);break;case"value":aui.form.value({id:e.id,content:soy.$$escapeHtml(e.value)},a,g);break;case"text":case"password":case"file":case"radio":case"checkbox":case"button":case"submit":case"reset":aui.form.input({id:e.id,name:e.name,type:e.type,value:e.value,maxLength:e.maxLength,size:e.size,isChecked:e.isChecked,isDisabled:e.isDisabled?true:false,extraClasses:f},a,g);break}if(e.labelContent&&j){aui.form.label({forField:e.id,isRequired:e.isRequired,content:e.labelContent},a,g)}if(e.descriptionText){aui.form.fieldDescription({message:e.descriptionText},a,g)}if(e.errorTexts){var d=e.errorTexts;var i=d.length;for(var h=0;h<i;h++){var b=d[h];aui.form.fieldError({message:b},a,g)}}a.append("</div>");return c?"":a.toString()};aui.form.fieldError=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div class="error');aui.renderExtraClasses(a,b,c);b.append('">',soy.$$escapeHtml(a.message),"</div>");return d?"":b.toString()};aui.form.fieldDescription=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div class="description');aui.renderExtraClasses(a,b,c);b.append('">',soy.$$escapeHtml(a.message),"</div>");return d?"":b.toString()};aui.form.textField=function(a,d,c){var b=d||new soy.StringBuilder();aui.form.field({id:a.id,name:a.name,type:"text",labelContent:a.labelContent,value:a.value,maxLength:a.maxLength,size:a.size,isRequired:a.isRequired,isDisabled:a.isDisabled,descriptionText:a.descriptionText,errorTexts:a.errorTexts,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes,fieldWidth:a.fieldWidth},b,c);return d?"":b.toString()};aui.form.textareaField=function(a,d,c){var b=d||new soy.StringBuilder();aui.form.field({id:a.id,name:a.name,type:"textarea",labelContent:a.labelContent,value:a.value,rows:a.rows,cols:a.cols,isRequired:a.isRequired,isDisabled:a.isDisabled,descriptionText:a.descriptionText,errorTexts:a.errorTexts,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes,fieldWidth:a.fieldWidth},b,c);return d?"":b.toString()};aui.form.passwordField=function(a,d,c){var b=d||new soy.StringBuilder();aui.form.field({id:a.id,name:a.name,type:"password",labelContent:a.labelContent,value:a.value,isRequired:a.isRequired,isDisabled:a.isDisabled,descriptionText:a.descriptionText,errorTexts:a.errorTexts,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes,fieldWidth:a.fieldWidth},b,c);return d?"":b.toString()};aui.form.fileField=function(a,d,c){var b=d||new soy.StringBuilder();aui.form.field({id:a.id,name:a.name,type:"file",labelContent:a.labelContent,value:a.value,isRequired:a.isRequired,isDisabled:a.isDisabled,descriptionText:a.descriptionText,errorTexts:a.errorTexts,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes},b,c);return d?"":b.toString()};aui.form.selectField=function(a,d,c){var b=d||new soy.StringBuilder();aui.form.field({id:a.id,name:a.name,type:"select",labelContent:a.labelContent,options:a.options,isMultiple:a.isMultiple,size:a.size,isRequired:a.isRequired,isDisabled:a.isDisabled,descriptionText:a.descriptionText,errorTexts:a.errorTexts,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes,fieldWidth:a.fieldWidth},b,c);return d?"":b.toString()};aui.form.checkboxField=function(g,e,h){var d=e||new soy.StringBuilder();var f=new soy.StringBuilder((g.isMatrix)?'<div class="matrix">':"");var c=g.fields;var i=c.length;for(var b=0;b<i;b++){var a=c[b];aui.form.field(soy.$$augmentData(a,{type:"checkbox",id:a.id,name:a.name,labelContent:soy.$$escapeHtml(a.labelText),isChecked:a.isChecked,isDisabled:a.isDisabled,descriptionText:a.descriptionText,errorTexts:a.errorTexts,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes}),f,h)}f.append((g.isMatrix)?"</div>":"");if(g.descriptionText||g.errorTexts&&g.errorTexts.length){aui.form.field({descriptionText:g.descriptionText,errorTexts:g.errorTexts,isDisabled:false},f,h)}aui.form.fieldset({legendContent:g.legendContent+(g.isRequired?'<span class="aui-icon icon-required"></span>':""),isGroup:true,id:g.id,extraClasses:g.extraClasses,extraAttributes:g.extraAttributes,content:f.toString()},d,h);return e?"":d.toString()};aui.form.radioField=function(e,c,f){var a=c||new soy.StringBuilder();var b=new soy.StringBuilder((e.isMatrix)?'<div class="matrix">':"");var i=e.fields;var d=i.length;for(var h=0;h<d;h++){var g=i[h];aui.form.field(soy.$$augmentData(g,{type:"radio",name:e.name?e.name:e.id,value:g.value,id:g.id,labelContent:soy.$$escapeHtml(g.labelText),isChecked:g.isChecked,isDisabled:g.isDisabled,descriptionText:g.descriptionText,errorTexts:g.errorTexts,extraClasses:g.extraClasses,extraAttributes:g.extraAttributes}),b,f)}b.append((e.isMatrix)?"</div>":"");if(e.descriptionText||e.errorTexts&&e.errorTexts.length){aui.form.field({descriptionText:e.descriptionText,errorTexts:e.errorTexts,isDisabled:false},b,f)}aui.form.fieldset({legendContent:e.legendContent+(e.isRequired?'<span class="aui-icon icon-required"></span>':""),isGroup:true,id:e.id,extraClasses:e.extraClasses,extraAttributes:e.extraAttributes,content:b.toString()},a,f);return c?"":a.toString()};aui.form.valueField=function(a,d,c){var b=d||new soy.StringBuilder();aui.form.field({id:a.id,type:"value",value:a.value,labelContent:a.labelContent,isRequired:a.isRequired,descriptionText:a.descriptionText,errorTexts:a.errorTexts,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes},b,c);return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.group=="undefined"){aui.group={}}aui.group.group=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-group',(a.isSplit)?" aui-group-split":"");aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};aui.group.item=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-item');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.icons=="undefined"){aui.icons={}}aui.icons.icon=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"span"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-icon',(a.useIconFont)?" aui-icon-"+soy.$$escapeHtml(a.size?a.size:"small"):""," aui",soy.$$escapeHtml(a.useIconFont?"-iconfont":"-icon"),soy.$$escapeHtml(a.iconFontSet?"-"+a.iconFontSet:""),"-",soy.$$escapeHtml(a.icon));aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",(a.accessibilityText)?soy.$$escapeHtml(a.accessibilityText):"","</",soy.$$escapeHtml(a.tagName?a.tagName:"span"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.labels=="undefined"){aui.labels={}}aui.labels.label=function(a,d,c){var b=d||new soy.StringBuilder();if(a.url&&a.isCloseable==true){b.append("<span",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-label aui-label-closeable aui-label-split');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append('><a class="aui-label-split-main" href="',soy.$$escapeHtml(a.url),'">',soy.$$escapeHtml(a.text),'</a><span class="aui-label-split-close" >');aui.labels.closeIcon(a,b,c);b.append("</span></span>")}else{b.append("<",soy.$$escapeHtml(a.url?"a":"span"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-label',(a.isCloseable)?" aui-label-closeable":"");aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append((a.url)?' href="'+soy.$$escapeHtml(a.url)+'"':"",">",soy.$$escapeHtml(a.text));if(a.isCloseable){aui.labels.closeIcon(a,b,c)}b.append("</",soy.$$escapeHtml(a.url?"a":"span"),">")}return d?"":b.toString()};aui.labels.closeIcon=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<span tabindex="0" class="aui-icon aui-icon-close"');if(a.hasTitle!=false){b.append(' title="');aui.labels.closeIconText(a,b,c);b.append('"')}b.append(">");aui.labels.closeIconText(a,b,c);b.append("</span>");return d?"":b.toString()};aui.labels.closeIconText=function(a,d,c){var b=d||new soy.StringBuilder();b.append((a.closeIconText)?soy.$$escapeHtml(a.closeIconText):"("+soy.$$escapeHtml("Remove")+" "+soy.$$escapeHtml(a.text)+")");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.message=="undefined"){aui.message={}}aui.message.info=function(a,d,c){var b=d||new soy.StringBuilder();aui.message.message(soy.$$augmentData(a,{type:"info"}),b,c);return d?"":b.toString()};aui.message.warning=function(a,d,c){var b=d||new soy.StringBuilder();aui.message.message(soy.$$augmentData(a,{type:"warning"}),b,c);return d?"":b.toString()};aui.message.error=function(a,d,c){var b=d||new soy.StringBuilder();aui.message.message(soy.$$augmentData(a,{type:"error"}),b,c);return d?"":b.toString()};aui.message.success=function(a,d,c){var b=d||new soy.StringBuilder();aui.message.message(soy.$$augmentData(a,{type:"success"}),b,c);return d?"":b.toString()};aui.message.hint=function(a,d,c){var b=d||new soy.StringBuilder();aui.message.message(soy.$$augmentData(a,{type:"hint"}),b,c);return d?"":b.toString()};aui.message.generic=function(a,d,c){var b=d||new soy.StringBuilder();aui.message.message(soy.$$augmentData(a,{type:"generic"}),b,c);return d?"":b.toString()};aui.message.message=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-message ',soy.$$escapeHtml(a.type?a.type:"generic"),(a.isCloseable)?" closeable":"",(a.isShadowed)?" shadowed":"");aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",(a.titleContent)?'<p class="title"><strong>'+a.titleContent+"</strong></p>":"",a.content,'<span class="aui-icon icon-',soy.$$escapeHtml(a.type?a.type:"generic"),'"></span>',(a.isCloseable)?'<span class="aui-icon icon-close" role="button" tabindex="0"></span>':"","</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.page=="undefined"){aui.page={}}aui.page.document=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<!DOCTYPE html><html lang="',soy.$$escapeHtml(c.language?c.language:"en"),'"><head><meta charset="utf-8" /><meta http-equiv="X-UA-Compatible" content="IE=EDGE"><title>',soy.$$escapeHtml(a.windowTitle),"</title>",(a.headContent)?a.headContent:"","</head><body");if(a.pageType){if(a.pageType=="generic"){b.append(" ");aui.renderExtraClasses(soy.$$augmentData(a,{isFullAttr:true}),b,c)}else{if(a.pageType=="focused"){b.append(' class="aui-page-focused aui-page-focused-',soy.$$escapeHtml(a.focusedPageSize?a.focusedPageSize:"xlarge"));aui.renderExtraClasses(a,b,c);b.append('"')}else{b.append(' class="aui-page-',soy.$$escapeHtml(a.pageType));aui.renderExtraClasses(a,b,c);b.append('"')}}}else{b.append(' class="');aui.renderExtraClasses(a,b,c);b.append('"')}aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</body></html>");return d?"":b.toString()};aui.page.page=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div id="page"><header id="header" role="banner">',a.headerContent,'</header><!-- #header --><section id="content" role="main">',a.contentContent,'</section><!-- #content --><footer id="footer" role="contentinfo">',a.footerContent,"</footer><!-- #footer --></div><!-- #page -->");return d?"":b.toString()};aui.page.header=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<nav",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-header aui-dropdown2-trigger-group');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(' role="navigation"><div class="aui-header-inner">',(a.headerBeforeContent)?'<div class="aui-header-before">'+a.headerBeforeContent+"</div>":"",'<div class="aui-header-primary"><h1 id="logo" class="aui-header-logo',(a.headerLogoImageUrl)?" aui-header-logo-custom":(a.logo)?" aui-header-logo-"+soy.$$escapeHtml(a.logo):"",'"><a href="',soy.$$escapeHtml(a.headerLink?a.headerLink:"/"),'">',(a.headerLogoImageUrl)?'<img src="'+soy.$$escapeHtml(a.headerLogoImageUrl)+'" alt="'+soy.$$escapeHtml(a.headerLogoText)+'" />':'<span class="aui-header-logo-device">'+soy.$$escapeHtml(a.headerLogoText?a.headerLogoText:"")+"</span>",(a.headerText)?'<span class="aui-header-logo-text">'+soy.$$escapeHtml(a.headerText)+"</span>":"","</a></h1>",(a.primaryNavContent)?a.primaryNavContent:"","</div>",(a.secondaryNavContent)?'<div class="aui-header-secondary">'+a.secondaryNavContent+"</div>":"",(a.headerAfterContent)?'<div class="aui-header-after">'+a.headerAfterContent+"</div>":"","</div><!-- .aui-header-inner--></nav><!-- .aui-header -->");return d?"":b.toString()};aui.page.pagePanel=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),' class="aui-page-panel');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append('><div class="aui-page-panel-inner">',a.content,"</div><!-- .aui-page-panel-inner --></",soy.$$escapeHtml(a.tagName?a.tagName:"div"),"><!-- .aui-page-panel -->");return d?"":b.toString()};aui.page.pagePanelNav=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),' class="aui-page-panel-nav');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),"><!-- .aui-page-panel-nav -->");return d?"":b.toString()};aui.page.pagePanelContent=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"section"),' class="aui-page-panel-content');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"section"),"><!-- .aui-page-panel-content -->");return d?"":b.toString()};aui.page.pagePanelSidebar=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"aside"),' class="aui-page-panel-sidebar');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"aside"),"><!-- .aui-page-panel-sidebar -->");return d?"":b.toString()};aui.page.pagePanelItem=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"section"),' class="aui-page-panel-item');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"section"),"><!-- .aui-page-panel-item -->");return d?"":b.toString()};aui.page.pageHeader=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<header class="aui-page-header');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append('><div class="aui-page-header-inner">',a.content,"</div><!-- .aui-page-header-inner --></header><!-- .aui-page-header -->");return d?"":b.toString()};aui.page.pageHeaderImage=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div class="aui-page-header-image');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div><!-- .aui-page-header-image -->");return d?"":b.toString()};aui.page.pageHeaderMain=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div class="aui-page-header-main');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div><!-- .aui-page-header-main -->");return d?"":b.toString()};aui.page.pageHeaderActions=function(a,d,c){var b=d||new soy.StringBuilder();b.append('<div class="aui-page-header-actions');aui.renderExtraClasses(a,b,c);b.append('"',(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div><!-- .aui-page-header-actions -->");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}aui.panel=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-panel');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.progressTracker=="undefined"){aui.progressTracker={}}aui.progressTracker.progressTracker=function(h,g,i){var c=g||new soy.StringBuilder();c.append("<ol",(h.id)?' id="'+soy.$$escapeHtml(h.id)+'"':"",' class="aui-progress-tracker',(h.isInverted)?" aui-progress-tracker-inverted":"");aui.renderExtraClasses(h,c,i);c.append('"');aui.renderExtraAttributes(h,c,i);c.append(">");var f=new soy.StringBuilder();var l=h.steps;var e=l.length;for(var m=0;m<e;m++){var k=l[m];if(k.isCurrent){var a=h.steps;var j=a.length;for(var b=0;b<j;b++){var d=a[b];aui.progressTracker.step(soy.$$augmentData(d,{width:Math.round(100/h.steps.length*10000)/10000,href:b<m?d.href:null}),f,i)}}}aui.progressTracker.content({steps:h.steps,content:f.toString()},c,i);c.append("</ol>");return g?"":c.toString()};aui.progressTracker.content=function(a,h,e){var c=h||new soy.StringBuilder();if(a.content!=""){c.append(a.content)}else{var d=a.steps;var f=d.length;for(var g=0;g<f;g++){var b=d[g];aui.progressTracker.step(soy.$$augmentData(b,{isCurrent:g==0,width:Math.round(100/a.steps.length*10000)/10000,href:null}),c,e)}}return h?"":c.toString()};aui.progressTracker.step=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<li",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-progress-tracker-step',(a.isCurrent)?" aui-progress-tracker-step-current":"");aui.renderExtraClasses(a,b,c);b.append('" style="width: ',soy.$$escapeHtml(a.width),'%;"');aui.renderExtraAttributes(a,b,c);b.append("><",soy.$$escapeHtml(a.href?"a":"span"),(a.href)?' href="'+soy.$$escapeHtml(a.href)+'"':"",">",soy.$$escapeHtml(a.text),"</",soy.$$escapeHtml(a.href?"a":"span"),"></li>");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}aui.table=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<table",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",(a.columnsContent)?a.columnsContent:"",(a.captionContent)?"<caption>"+a.captionContent+"</caption>":"",(a.theadContent)?"<thead>"+a.theadContent+"</thead>":"",(a.tfootContent)?"<tfoot>"+a.tfootContent+"</tfoot>":"",(!a.contentIncludesTbody)?"<tbody>":"",a.content,(!a.contentIncludesTbody)?"</tbody>":"","</table>");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}aui.tabs=function(a,h,d){var b=h||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-tabs ',soy.$$escapeHtml(a.isVertical?"vertical-tabs":"horizontal-tabs"),(a.isDisabled)?" aui-tabs-disabled":"");aui.renderExtraClasses(a,b,d);b.append('"');aui.renderExtraAttributes(a,b,d);b.append('><ul class="tabs-menu">');var f=a.menuItems;var g=f.length;for(var c=0;c<g;c++){var e=f[c];aui.tabMenuItem(e,b,d)}b.append("</ul>",a.paneContent,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return h?"":b.toString()};aui.tabMenuItem=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<li",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="menu-item',(a.isActive)?" active-tab":"");aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append('><a href="',soy.$$escapeHtml(a.url),'"><strong>',soy.$$escapeHtml(a.text),"</strong></a></li>");return d?"":b.toString()};aui.tabPane=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="tabs-pane',(a.isActive)?" active-pane":"");aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.toolbar=="undefined"){aui.toolbar={}}aui.toolbar.toolbar=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-toolbar');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};aui.toolbar.split=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<",soy.$$escapeHtml(a.tagName?a.tagName:"div"),(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="toolbar-split toolbar-split-',soy.$$escapeHtml(a.split));aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</",soy.$$escapeHtml(a.tagName?a.tagName:"div"),">");return d?"":b.toString()};aui.toolbar.group=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<ul",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="toolbar-group');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</ul>");return d?"":b.toString()};aui.toolbar.item=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<li ",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="toolbar-item',(a.isPrimary)?" primary":"",(a.isActive)?" active":"");aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</li>");return d?"":b.toString()};aui.toolbar.trigger=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<a",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="toolbar-trigger');aui.renderExtraClasses(a,b,c);b.append('" href="',soy.$$escapeHtml(a.url?a.url:"#"),'"',(a.title)?' title="'+soy.$$escapeHtml(a.title)+'"':"");aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</a>");return d?"":b.toString()};aui.toolbar.button=function(a,e,c){var b=e||new soy.StringBuilder();if(!(a!=null)){b.append("Either $text or both $title and $iconClass must be provided.")}else{var d=new soy.StringBuilder();aui.toolbar.trigger({url:a.url,title:a.title,content:((a.iconClass)?'<span class="icon '+soy.$$escapeHtml(a.iconClass)+'"></span>':"")+((a.text)?'<span class="trigger-text">'+soy.$$escapeHtml(a.text)+"</span>":"")},d,c);aui.toolbar.item({isActive:a.isActive,isPrimary:a.isPrimary,id:a.id,extraClasses:a.extraClasses,extraAttributes:a.extraAttributes,content:d.toString()},b,c)}return e?"":b.toString()};aui.toolbar.link=function(a,f,e){var c=f||new soy.StringBuilder();var d=new soy.StringBuilder("toolbar-item-link");aui.renderExtraClasses(a,d,e);var b=new soy.StringBuilder();aui.toolbar.trigger({url:a.url,content:soy.$$escapeHtml(a.text)},b,e);aui.toolbar.item({id:a.id,extraClasses:d.toString(),extraAttributes:a.extraAttributes,content:b.toString()},c,e);return f?"":c.toString()};aui.toolbar.dropdownInternal=function(b,g,f){var c=g||new soy.StringBuilder();var d=new soy.StringBuilder(b.itemClass);aui.renderExtraClasses(b,d,f);var a=new soy.StringBuilder((b.splitButtonContent)?b.splitButtonContent:"");var e=new soy.StringBuilder();aui.dropdown.trigger({extraClasses:"toolbar-trigger",accessibilityText:b.text},e,f);aui.dropdown.menu({content:b.dropdownItemsContent},e,f);aui.dropdown.parent({content:e.toString()},a,f);aui.toolbar.item({isPrimary:b.isPrimary,id:b.id,extraClasses:d.toString(),extraAttributes:b.extraAttributes,content:a.toString()},c,f);return g?"":c.toString()};aui.toolbar.dropdown=function(a,d,c){var b=d||new soy.StringBuilder();aui.toolbar.dropdownInternal({isPrimary:a.isPrimary,id:a.id,itemClass:"toolbar-dropdown",extraClasses:a.extraClasses,extraAttributes:a.extraAttributes,text:a.text,dropdownItemsContent:a.dropdownItemsContent},b,c);return d?"":b.toString()};aui.toolbar.splitButton=function(a,e,c){var b=e||new soy.StringBuilder();var d=new soy.StringBuilder();aui.toolbar.trigger({url:a.url,content:soy.$$escapeHtml(a.text)},d,c);aui.toolbar.dropdownInternal({isPrimary:a.isPrimary,id:a.id,itemClass:"toolbar-splitbutton",extraClasses:a.extraClasses,extraAttributes:a.extraAttributes,dropdownItemsContent:a.dropdownItemsContent,splitButtonContent:d.toString()},b,c);return e?"":b.toString()};
if(typeof aui=="undefined"){var aui={}}if(typeof aui.toolbar2=="undefined"){aui.toolbar2={}}aui.toolbar2.toolbar2=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-toolbar2');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(' role="toolbar"><div class="aui-toolbar2-inner">',a.content,"</div></div>");return d?"":b.toString()};aui.toolbar2.item=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-toolbar2-',soy.$$escapeHtml(a.item));aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div>");return d?"":b.toString()};aui.toolbar2.group=function(a,d,c){var b=d||new soy.StringBuilder();b.append("<div",(a.id)?' id="'+soy.$$escapeHtml(a.id)+'"':"",' class="aui-toolbar2-group');aui.renderExtraClasses(a,b,c);b.append('"');aui.renderExtraAttributes(a,b,c);b.append(">",a.content,"</div>");return d?"":b.toString()};

