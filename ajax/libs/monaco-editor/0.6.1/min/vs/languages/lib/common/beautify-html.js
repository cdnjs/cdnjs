/*!-----------------------------------------------------------
 * Copyright (c) Microsoft Corporation. All rights reserved.
 * Version: 0.6.1(8f43cf5d0d3d233c9ba1c9085f2bb529f834c841)
 * Released under the MIT license
 * https://github.com/Microsoft/vscode/blob/master/LICENSE.txt
 *-----------------------------------------------------------*/
(function(){var t=["vs/languages/lib/common/beautify","require","exports","vs/languages/lib/common/beautify-html","vs/languages/lib/common/beautify-css"],e=function(e){for(var n=[],i=0,s=e.length;i<s;i++)n[i]=t[e[i]];return n};define(t[0],e([1,2]),function(t,e){"use strict";function n(t,e){return t}e.js_beautify=n}),/*

  The MIT License (MIT)

  Copyright (c) 2007-2013 Einar Lielmanis and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 CSS Beautifier
---------------

    Written by Harutyun Amirjanyan, (amirjanyan@gmail.com)

    Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
        http://jsbeautifier.org/

    Usage:
        css_beautify(source_text);
        css_beautify(source_text, options);

    The options are (default in brackets):
        indent_size (4)                   — indentation size,
        indent_char (space)               — character to indent with,
        selector_separator_newline (true) - separate selectors with newline or
                                            not (e.g. "a,\nbr" or "a, br")
        end_with_newline (false)          - end with a newline
        newline_between_rules (true)      - add a new line after every css rule

    e.g

    css_beautify(css_source_text, {
      'indent_size': 1,
      'indent_char': '\t',
      'selector_separator': ' ',
      'end_with_newline': false,
      'newline_between_rules': true
    });
*/
function(){function t(e,n){function i(){return m=e.charAt(++T),m||""}function s(t){var n="",s=T;return t&&h(),n=e.charAt(T+1)||"",T=s-1,i(),n}function r(t){for(var n=T;i();)if("\\"===m)i();else{if(t.indexOf(m)!==-1)break;if("\n"===m)break}return e.substring(n,T+1)}function a(t){var e=T,n=r(t);return T=e-1,i(),n}function h(){for(var t="";y.test(s());)i(),t+=m;return t}function o(){var t="";for(m&&y.test(m)&&(t=m);y.test(i());)t+=m;return t}function u(t){var n=T;for(t="/"===s(),i();i();){if(!t&&"*"===m&&"/"===s()){i();break}if(t&&"\n"===m)return e.substring(n,T)}return e.substring(n,T)+m}function _(t){return e.substring(T-t.length,T).toLowerCase()===t}function p(){for(var t=0,n=T+1;n<e.length;n++){var i=e.charAt(n);if("{"===i)return!0;if("("===i)t+=1;else if(")"===i){if(0==t)return!1;t-=1}else if(";"===i||"}"===i)return!1}return!1}function l(){S++,x+=A}function c(){S--,x=x.slice(0,-f)}n=n||{},e=e||"",e=e.replace(/\r\n|[\r\u2028\u2029]/g,"\n");var f=n.indent_size||4,g=n.indent_char||" ",d=void 0===n.selector_separator_newline||n.selector_separator_newline,w=void 0!==n.end_with_newline&&n.end_with_newline,v=void 0===n.newline_between_rules||n.newline_between_rules,b=n.eol?n.eol:"\n";"string"==typeof f&&(f=parseInt(f,10)),n.indent_with_tabs&&(g="\t",f=1),b=b.replace(/\\r/,"\r").replace(/\\n/,"\n");var m,y=/^\s+$/,T=-1,k=0,x=e.match(/^[\t ]*/)[0],A=new Array(f+1).join(g),S=0,E=0,N={};N["{"]=function(t){N.singleSpace(),L.push(t),N.newLine()},N["}"]=function(t){N.newLine(),L.push(t),N.newLine()},N._lastCharWhitespace=function(){return y.test(L[L.length-1])},N.newLine=function(t){L.length&&(t||"\n"===L[L.length-1]||N.trim(),L.push("\n"),x&&L.push(x))},N.singleSpace=function(){L.length&&!N._lastCharWhitespace()&&L.push(" ")},N.preserveSingleSpace=function(){G&&N.singleSpace()},N.trim=function(){for(;N._lastCharWhitespace();)L.pop()};for(var L=[],O=!1,C=!1,U=!1,I="",K="";;){var j=o(),G=""!==j,R=j.indexOf("\n")!==-1;if(K=I,I=m,!m)break;if("/"===m&&"*"===s()){var D=0===S;(R||D)&&N.newLine(),L.push(u()),N.newLine(),D&&N.newLine(!0)}else if("/"===m&&"/"===s())R||"{"===K||N.trim(),N.singleSpace(),L.push(u()),N.newLine();else if("@"===m){N.preserveSingleSpace(),L.push(m);var $=a(": ,;{}()[]/='\"");$.match(/[ :]$/)&&(i(),$=r(": ").replace(/\s$/,""),L.push($),N.singleSpace()),$=$.replace(/\s$/,""),$ in t.NESTED_AT_RULE&&(E+=1,$ in t.CONDITIONAL_GROUP_RULE&&(U=!0))}else"#"===m&&"{"===s()?(N.preserveSingleSpace(),L.push(r("}"))):"{"===m?"}"===s(!0)?(h(),i(),N.singleSpace(),L.push("{}"),N.newLine(),v&&0===S&&N.newLine(!0)):(l(),N["{"](m),U?(U=!1,O=S>E):O=S>=E):"}"===m?(c(),N["}"](m),O=!1,C=!1,E&&E--,v&&0===S&&N.newLine(!0)):":"===m?(h(),!O&&!U||_("&")||p()?":"===s()?(i(),L.push("::")):L.push(":"):(C=!0,L.push(":"),N.singleSpace())):'"'===m||"'"===m?(N.preserveSingleSpace(),L.push(r(m))):";"===m?(C=!1,L.push(m),N.newLine()):"("===m?_("url")?(L.push(m),h(),i()&&(")"!==m&&'"'!==m&&"'"!==m?L.push(r(")")):T--)):(k++,N.preserveSingleSpace(),L.push(m),h()):")"===m?(L.push(m),k--):","===m?(L.push(m),h(),d&&!C&&k<1?N.newLine():N.singleSpace()):"]"===m?L.push(m):"["===m?(N.preserveSingleSpace(),L.push(m)):"="===m?(h(),m="=",L.push(m)):(N.preserveSingleSpace(),L.push(m))}var z="";return x&&(z+=x),z+=L.join("").replace(/[\r\n\t ]+$/,""),w&&(z+="\n"),"\n"!=b&&(z=z.replace(/[\n]/g,b)),z}t.NESTED_AT_RULE={"@page":!0,"@font-face":!0,"@keyframes":!0,"@media":!0,"@supports":!0,"@document":!0},t.CONDITIONAL_GROUP_RULE={"@media":!0,"@supports":!0,"@document":!0},"function"==typeof define&&define.amd?define("vs/languages/lib/common/beautify-css",[],function(){return{css_beautify:t}}):"undefined"!=typeof exports?exports.css_beautify=t:"undefined"!=typeof window?window.css_beautify=t:"undefined"!=typeof global&&(global.css_beautify=t)}(),/*

  The MIT License (MIT)

  Copyright (c) 2007-2013 Einar Lielmanis and contributors.

  Permission is hereby granted, free of charge, to any person
  obtaining a copy of this software and associated documentation files
  (the "Software"), to deal in the Software without restriction,
  including without limitation the rights to use, copy, modify, merge,
  publish, distribute, sublicense, and/or sell copies of the Software,
  and to permit persons to whom the Software is furnished to do so,
  subject to the following conditions:

  The above copyright notice and this permission notice shall be
  included in all copies or substantial portions of the Software.

  THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
  EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
  MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
  NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS
  BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN
  ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN
  CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
  SOFTWARE.


 Style HTML
---------------

  Written by Nochum Sossonko, (nsossonko@hotmail.com)

  Based on code initially developed by: Einar Lielmanis, <einar@jsbeautifier.org>
    http://jsbeautifier.org/

  Usage:
    style_html(html_source);

    style_html(html_source, options);

  The options are:
    indent_inner_html (default false)  — indent <head> and <body> sections,
    indent_size (default 4)          — indentation size,
    indent_char (default space)      — character to indent with,
    wrap_line_length (default 250)            -  maximum amount of characters per line (0 = disable)
    brace_style (default "collapse") - "collapse" | "expand" | "end-expand" | "none"
            put braces on the same line as control statements (default), or put braces on own line (Allman / ANSI style), or just put end braces on own line, or attempt to keep them where they are.
    unformatted (defaults to inline tags) - list of tags, that shouldn't be reformatted
    indent_scripts (default normal)  - "keep"|"separate"|"normal"
    preserve_newlines (default true) - whether existing line breaks before elements should be preserved
                                        Only works before elements, not inside tags or for text.
    max_preserve_newlines (default unlimited) - maximum number of line breaks to be preserved in one chunk
    indent_handlebars (default false) - format and indent {{#foo}} and {{/foo}}
    end_with_newline (false)          - end with a newline
    extra_liners (default [head,body,/html]) -List of tags that should have an extra newline before them.

    e.g.

    style_html(html_source, {
      'indent_inner_html': false,
      'indent_size': 2,
      'indent_char': ' ',
      'wrap_line_length': 78,
      'brace_style': 'expand',
      'preserve_newlines': true,
      'max_preserve_newlines': 5,
      'indent_handlebars': false,
      'extra_liners': ['/html']
    });
*/
function(){function n(t){return t.replace(/^\s+/g,"")}function i(t){return t.replace(/\s+$/g,"")}function s(t,e,s,r){function a(){function t(t){var e="",n=function(n){var i=e+n.toLowerCase();e=i.length<=t.length?i:i.substr(i.length-t.length,t.length)},i=function(){return e.indexOf(t)===-1};return{add:n,doesNotMatch:i}}return this.pos=0,this.token="",this.current_mode="CONTENT",this.tags={parent:"parent1",parentcount:1,parent1:""},this.tag_type="",this.token_text=this.last_token=this.last_text=this.token_type="",this.newlines=0,this.indent_content=o,this.Utils={whitespace:"\n\r\t ".split(""),single_token:["area","base","br","col","embed","hr","img","input","keygen","link","menuitem","meta","param","source","track","wbr","!doctype","?xml","?php","basefont","isindex"],extra_liners:m,in_array:function(t,e){for(var n=0;n<e.length;n++)if(t===e[n])return!0;return!1}},this.is_whitespace=function(t){for(var e=0;e<t.length;e++)if(!this.Utils.in_array(t.charAt(e),this.Utils.whitespace))return!1;return!0},this.traverse_whitespace=function(){var t="";if(t=this.input.charAt(this.pos),this.Utils.in_array(t,this.Utils.whitespace)){for(this.newlines=0;this.Utils.in_array(t,this.Utils.whitespace);)f&&"\n"===t&&this.newlines<=g&&(this.newlines+=1),this.pos++,t=this.input.charAt(this.pos);return!0}return!1},this.space_or_wrap=function(t){return this.line_char_count>=this.wrap_line_length?(this.print_newline(!1,t),this.print_indentation(t),!0):(this.line_char_count++,t.push(" "),!1)},this.get_content=function(){for(var t="",e=[];"<"!==this.input.charAt(this.pos);){if(this.pos>=this.input.length)return e.length?e.join(""):["","TK_EOF"];if(this.traverse_whitespace())this.space_or_wrap(e);else{if(d){var n=this.input.substr(this.pos,3);if("{{#"===n||"{{/"===n)break;if("{{!"===n)return[this.get_tag(),"TK_TAG_HANDLEBARS_COMMENT"];if("{{"===this.input.substr(this.pos,2)&&"{{else}}"===this.get_tag(!0))break}t=this.input.charAt(this.pos),this.pos++,this.line_char_count++,e.push(t)}}return e.length?e.join(""):""},this.get_contents_to=function(t){if(this.pos===this.input.length)return["","TK_EOF"];var e="",n=new RegExp("</"+t+"\\s*>","igm");n.lastIndex=this.pos;var i=n.exec(this.input),s=i?i.index:this.input.length;return this.pos<s&&(e=this.input.substring(this.pos,s),this.pos=s),e},this.record_tag=function(t){this.tags[t+"count"]?(this.tags[t+"count"]++,this.tags[t+this.tags[t+"count"]]=this.indent_level):(this.tags[t+"count"]=1,this.tags[t+this.tags[t+"count"]]=this.indent_level),this.tags[t+this.tags[t+"count"]+"parent"]=this.tags.parent,this.tags.parent=t+this.tags[t+"count"]},this.retrieve_tag=function(t){if(this.tags[t+"count"]){for(var e=this.tags.parent;e&&t+this.tags[t+"count"]!==e;)e=this.tags[e+"parent"];e&&(this.indent_level=this.tags[t+this.tags[t+"count"]],this.tags.parent=this.tags[e+"parent"]),delete this.tags[t+this.tags[t+"count"]+"parent"],delete this.tags[t+this.tags[t+"count"]],1===this.tags[t+"count"]?delete this.tags[t+"count"]:this.tags[t+"count"]--}},this.indent_to_tag=function(t){if(this.tags[t+"count"]){for(var e=this.tags.parent;e&&t+this.tags[t+"count"]!==e;)e=this.tags[e+"parent"];e&&(this.indent_level=this.tags[t+this.tags[t+"count"]])}},this.get_tag=function(t){var e,n,i,s="",r=[],a="",h=!1,o=!0,u=this.pos,p=this.line_char_count;t=void 0!==t&&t;do{if(this.pos>=this.input.length)return t&&(this.pos=u,this.line_char_count=p),r.length?r.join(""):["","TK_EOF"];if(s=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(s,this.Utils.whitespace))h=!0;else{if("'"!==s&&'"'!==s||(s+=this.get_unformatted(s),h=!0),"="===s&&(h=!1),r.length&&"="!==r[r.length-1]&&">"!==s&&h){var l=this.space_or_wrap(r),f=l&&"/"!==s&&"force"!==w;if(h=!1,o||"force"!==w||"/"===s||(this.print_newline(!1,r),this.print_indentation(r),f=!0),f)for(var g=0;g<v;g++)r.push(_);for(var b=0;b<r.length;b++)if(" "===r[b]){o=!1;break}}if(d&&"<"===i&&s+this.input.charAt(this.pos)==="{{"&&(s+=this.get_unformatted("}}"),r.length&&" "!==r[r.length-1]&&"<"!==r[r.length-1]&&(s=" "+s),h=!0),"<"!==s||i||(e=this.pos-1,i="<"),d&&!i&&r.length>=2&&"{"===r[r.length-1]&&"{"===r[r.length-2]&&(e="#"===s||"/"===s||"!"===s?this.pos-3:this.pos-2,i="{"),this.line_char_count++,r.push(s),r[1]&&("!"===r[1]||"?"===r[1]||"%"===r[1])){r=[this.get_comment(e)];break}if(d&&r[1]&&"{"===r[1]&&r[2]&&"!"===r[2]){r=[this.get_comment(e)];break}if(d&&"{"===i&&r.length>2&&"}"===r[r.length-2]&&"}"===r[r.length-1])break}}while(">"!==s);var m,y,T=r.join("");m=T.indexOf(" ")!==-1?T.indexOf(" "):"{"===T.charAt(0)?T.indexOf("}"):T.indexOf(">"),y="<"!==T.charAt(0)&&d?"#"===T.charAt(2)?3:2:1;var k=T.substring(y,m).toLowerCase();return"/"===T.charAt(T.length-2)||this.Utils.in_array(k,this.Utils.single_token)?t||(this.tag_type="SINGLE"):d&&"{"===T.charAt(0)&&"else"===k?t||(this.indent_to_tag("if"),this.tag_type="HANDLEBARS_ELSE",this.indent_content=!0,this.traverse_whitespace()):this.is_unformatted(k,c)?(a=this.get_unformatted("</"+k+">",T),r.push(a),n=this.pos-1,this.tag_type="SINGLE"):"script"===k&&(T.search("type")===-1||T.search("type")>-1&&T.search(/\b(text|application)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json)/)>-1)?t||(this.record_tag(k),this.tag_type="SCRIPT"):"style"===k&&(T.search("type")===-1||T.search("type")>-1&&T.search("text/css")>-1)?t||(this.record_tag(k),this.tag_type="STYLE"):"!"===k.charAt(0)?t||(this.tag_type="SINGLE",this.traverse_whitespace()):t||("/"===k.charAt(0)?(this.retrieve_tag(k.substring(1)),this.tag_type="END"):(this.record_tag(k),"html"!==k.toLowerCase()&&(this.indent_content=!0),this.tag_type="START"),this.traverse_whitespace()&&this.space_or_wrap(r),this.Utils.in_array(k,this.Utils.extra_liners)&&(this.print_newline(!1,this.output),this.output.length&&"\n"!==this.output[this.output.length-2]&&this.print_newline(!0,this.output))),t&&(this.pos=u,this.line_char_count=p),r.join("")},this.get_comment=function(t){var e="",n=">",i=!1;this.pos=t;var s=this.input.charAt(this.pos);for(this.pos++;this.pos<=this.input.length&&(e+=s,e.charAt(e.length-1)!==n.charAt(n.length-1)||e.indexOf(n)===-1);)!i&&e.length<10&&(0===e.indexOf("<![if")?(n="<![endif]>",i=!0):0===e.indexOf("<![cdata[")?(n="]]>",i=!0):0===e.indexOf("<![")?(n="]>",i=!0):0===e.indexOf("<!--")?(n="-->",i=!0):0===e.indexOf("{{!")?(n="}}",i=!0):0===e.indexOf("<?")?(n="?>",i=!0):0===e.indexOf("<%")&&(n="%>",i=!0)),s=this.input.charAt(this.pos),this.pos++;return e},this.get_unformatted=function(e,n){if(n&&n.toLowerCase().indexOf(e)!==-1)return"";var i="",s="",r=!0,a=t(e);do{if(this.pos>=this.input.length)return s;if(i=this.input.charAt(this.pos),this.pos++,this.Utils.in_array(i,this.Utils.whitespace)){if(!r){this.line_char_count--;continue}if("\n"===i||"\r"===i){s+="\n",this.line_char_count=0;continue}}s+=i,a.add(i),this.line_char_count++,r=!0,d&&"{"===i&&s.length&&"{"===s.charAt(s.length-2)&&(s+=this.get_unformatted("}}"))}while(a.doesNotMatch());return s},this.get_token=function(){var t;if("TK_TAG_SCRIPT"===this.last_token||"TK_TAG_STYLE"===this.last_token){var e=this.last_token.substr(7);return t=this.get_contents_to(e),"string"!=typeof t?t:[t,"TK_"+e]}if("CONTENT"===this.current_mode)return t=this.get_content(),"string"!=typeof t?t:[t,"TK_CONTENT"];if("TAG"===this.current_mode){if(t=this.get_tag(),"string"!=typeof t)return t;var n="TK_TAG_"+this.tag_type;return[t,n]}},this.get_full_indent=function(t){return t=this.indent_level+t||0,t<1?"":Array(t+1).join(this.indent_string)},this.is_unformatted=function(t,e){if(!this.Utils.in_array(t,e))return!1;if("a"!==t.toLowerCase()||!this.Utils.in_array("a",e))return!0;var n=this.get_tag(!0),i=(n||"").match(/^\s*<\s*\/?([a-z]*)\s*[^>]*>\s*$/);return!(i&&!this.Utils.in_array(i,e))},this.printer=function(t,e,s,r,a){this.input=t||"",this.input=this.input.replace(/\r\n|[\r\u2028\u2029]/g,"\n"),this.output=[],this.indent_character=e,this.indent_string="",this.indent_size=s,this.brace_style=a,this.indent_level=0,this.wrap_line_length=r,this.line_char_count=0;for(var h=0;h<this.indent_size;h++)this.indent_string+=this.indent_character;this.print_newline=function(t,e){this.line_char_count=0,e&&e.length&&(t||"\n"!==e[e.length-1])&&("\n"!==e[e.length-1]&&(e[e.length-1]=i(e[e.length-1])),e.push("\n"))},this.print_indentation=function(t){for(var e=0;e<this.indent_level;e++)t.push(this.indent_string),this.line_char_count+=this.indent_string.length},this.print_token=function(t){this.is_whitespace(t)&&!this.output.length||((t||""!==t)&&this.output.length&&"\n"===this.output[this.output.length-1]&&(this.print_indentation(this.output),t=n(t)),this.print_token_raw(t))},this.print_token_raw=function(t){this.newlines>0&&(t=i(t)),t&&""!==t&&(t.length>1&&"\n"===t.charAt(t.length-1)?(this.output.push(t.slice(0,-1)),this.print_newline(!1,this.output)):this.output.push(t));for(var e=0;e<this.newlines;e++)this.print_newline(e>0,this.output);this.newlines=0},this.indent=function(){this.indent_level++},this.unindent=function(){this.indent_level>0&&this.indent_level--}},this}var h,o,u,_,p,l,c,f,g,d,w,v,b,m,y;for(e=e||{},void 0!==e.wrap_line_length&&0!==parseInt(e.wrap_line_length,10)||void 0===e.max_char||0===parseInt(e.max_char,10)||(e.wrap_line_length=e.max_char),o=void 0!==e.indent_inner_html&&e.indent_inner_html,u=void 0===e.indent_size?4:parseInt(e.indent_size,10),_=void 0===e.indent_char?" ":e.indent_char,l=void 0===e.brace_style?"collapse":e.brace_style,p=0===parseInt(e.wrap_line_length,10)?32786:parseInt(e.wrap_line_length||250,10),c=e.unformatted||["a","abbr","area","audio","b","bdi","bdo","br","button","canvas","cite","code","data","datalist","del","dfn","em","embed","i","iframe","img","input","ins","kbd","keygen","label","map","mark","math","meter","noscript","object","output","progress","q","ruby","s","samp","select","small","span","strong","sub","sup","svg","template","textarea","time","u","var","video","wbr","text","acronym","address","big","dt","ins","small","strike","tt","pre","h1","h2","h3","h4","h5","h6"],f=void 0===e.preserve_newlines||e.preserve_newlines,g=f?isNaN(parseInt(e.max_preserve_newlines,10))?32786:parseInt(e.max_preserve_newlines,10):0,d=void 0!==e.indent_handlebars&&e.indent_handlebars,w=void 0===e.wrap_attributes?"auto":e.wrap_attributes,v=isNaN(parseInt(e.wrap_attributes_indent_size,10))?u:parseInt(e.wrap_attributes_indent_size,10),b=void 0!==e.end_with_newline&&e.end_with_newline,m="object"==typeof e.extra_liners&&e.extra_liners?e.extra_liners.concat():"string"==typeof e.extra_liners?e.extra_liners.split(","):"head,body,/html".split(","),y=e.eol?e.eol:"\n",e.indent_with_tabs&&(_="\t",u=1),y=y.replace(/\\r/,"\r").replace(/\\n/,"\n"),h=new a,h.printer(t,_,u,p,l);;){var T=h.get_token();if(h.token_text=T[0],h.token_type=T[1],"TK_EOF"===h.token_type)break;switch(h.token_type){case"TK_TAG_START":h.print_newline(!1,h.output),h.print_token(h.token_text),h.indent_content&&(h.indent(),h.indent_content=!1),h.current_mode="CONTENT";break;case"TK_TAG_STYLE":case"TK_TAG_SCRIPT":h.print_newline(!1,h.output),h.print_token(h.token_text),h.current_mode="CONTENT";break;case"TK_TAG_END":if("TK_CONTENT"===h.last_token&&""===h.last_text){var k=h.token_text.match(/\w+/)[0],x=null;h.output.length&&(x=h.output[h.output.length-1].match(/(?:<|{{#)\s*(\w+)/)),(null===x||x[1]!==k&&!h.Utils.in_array(x[1],c))&&h.print_newline(!1,h.output)}h.print_token(h.token_text),h.current_mode="CONTENT";break;case"TK_TAG_SINGLE":var A=h.token_text.match(/^\s*<([a-z-]+)/i);A&&h.Utils.in_array(A[1],c)||h.print_newline(!1,h.output),h.print_token(h.token_text),h.current_mode="CONTENT";break;case"TK_TAG_HANDLEBARS_ELSE":for(var S=!1,E=h.output.length-1;E>=0&&"\n"!==h.output[E];E--)if(h.output[E].match(/{{#if/)){S=!0;break}S||h.print_newline(!1,h.output),h.print_token(h.token_text),h.indent_content&&(h.indent(),h.indent_content=!1),h.current_mode="CONTENT";break;case"TK_TAG_HANDLEBARS_COMMENT":h.print_token(h.token_text),h.current_mode="TAG";break;case"TK_CONTENT":h.print_token(h.token_text),h.current_mode="TAG";break;case"TK_STYLE":case"TK_SCRIPT":if(""!==h.token_text){h.print_newline(!1,h.output);var N,L=h.token_text,O=1;"TK_SCRIPT"===h.token_type?N="function"==typeof s&&s:"TK_STYLE"===h.token_type&&(N="function"==typeof r&&r),"keep"===e.indent_scripts?O=0:"separate"===e.indent_scripts&&(O=-h.indent_level);var C=h.get_full_indent(O);if(N){var U=function(){this.eol="\n"};U.prototype=e;var I=new U;L=N(L.replace(/^\s*/,C),I)}else{var K=L.match(/^\s*/)[0],j=K.match(/[^\n\r]*$/)[0].split(h.indent_string).length-1,G=h.get_full_indent(O-j);L=L.replace(/^\s*/,C).replace(/\r\n|\r|\n/g,"\n"+G).replace(/\s+$/,"")}L&&(h.print_token_raw(L),h.print_newline(!0,h.output))}h.current_mode="TAG";break;default:""!==h.token_text&&h.print_token(h.token_text)}h.last_token=h.token_type,h.last_text=h.token_text}var R=h.output.join("").replace(/[\r\n\t ]+$/,"");return b&&(R+="\n"),"\n"!=y&&(R=R.replace(/[\n]/g,y)),R}if("function"==typeof define&&define.amd)define(t[3],e([1,0,4]),function(t){var e=t("./beautify"),n=t("./beautify-css");return{html_beautify:function(t,i){return s(t,i,e.js_beautify,n.css_beautify)}}});else if("undefined"!=typeof exports){var r=require("./beautify.js"),a=require("./beautify-css.js");exports.html_beautify=function(t,e){return s(t,e,r.js_beautify,a.css_beautify)}}else"undefined"!=typeof window?window.html_beautify=function(t,e){return s(t,e,window.js_beautify,window.css_beautify)}:"undefined"!=typeof global&&(global.html_beautify=function(t,e){return s(t,e,global.js_beautify,global.css_beautify)})}()}).call(this);
//# sourceMappingURL=../../../../../min-maps/vs/languages/lib/common/beautify-html.js.map