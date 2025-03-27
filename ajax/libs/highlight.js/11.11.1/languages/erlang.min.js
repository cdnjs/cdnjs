/*! `erlang` grammar compiled for Highlight.js 11.11.1 */
(()=>{var e=(()=>{"use strict";return e=>{
const n="[a-z'][a-zA-Z0-9_']*",i="("+n+":"+n+"|"+n+")",a={
keyword:"after and andalso|10 band begin bnot bor bsl bzr bxor case catch cond div end fun if let not of orelse|10 query receive rem try when xor maybe else",
literal:"false true"},r=e.COMMENT("%","$"),s={className:"number",
begin:"\\b(\\d+(_\\d+)*#[a-fA-F0-9]+(_[a-fA-F0-9]+)*|\\d+(_\\d+)*(\\.\\d+(_\\d+)*)?([eE][-+]?\\d+)?)",
relevance:0},d={begin:"fun\\s+"+n+"/\\d+"},c={begin:i+"\\(",end:"\\)",
returnBegin:!0,relevance:0,contains:[{begin:i,relevance:0},{begin:"\\(",
end:"\\)",endsWithParent:!0,returnEnd:!0,relevance:0}]},t={begin:/\{/,end:/\}/,
relevance:0},o={begin:"\\b_([A-Z][A-Za-z0-9_]*)?",relevance:0},l={
begin:"[A-Z][a-zA-Z0-9_]*",relevance:0},g={begin:"#"+e.UNDERSCORE_IDENT_RE,
relevance:0,returnBegin:!0,contains:[{begin:"#"+e.UNDERSCORE_IDENT_RE,
relevance:0},{begin:/\{/,end:/\}/,relevance:0}]},b={scope:"string",
match:/\$(\\([^0-9]|[0-9]{1,3}|)|.)/},E={scope:"string",
match:/"""("*)(?!")[\s\S]*?"""\1/},_={scope:"string",
contains:[e.BACKSLASH_ESCAPE],variants:[{match:/~\w?"""("*)(?!")[\s\S]*?"""\1/
},{begin:/~\w?\(/,end:/\)/},{begin:/~\w?\[/,end:/\]/},{begin:/~\w?{/,end:/}/},{
begin:/~\w?</,end:/>/},{begin:/~\w?\//,end:/\//},{begin:/~\w?\|/,end:/\|/},{
begin:/~\w?'/,end:/'/},{begin:/~\w?"/,end:/"/},{begin:/~\w?`/,end:/`/},{
begin:/~\w?#/,end:/#/}]},u={beginKeywords:"fun receive if try case maybe",
end:"end",keywords:a};u.contains=[r,d,e.inherit(e.APOS_STRING_MODE,{className:""
}),u,c,_,E,e.QUOTE_STRING_MODE,s,t,o,l,g,b]
;const f=[r,d,u,c,_,E,e.QUOTE_STRING_MODE,s,t,o,l,g,b];c.contains[1].contains=f,
t.contains=f,g.contains[1].contains=f;const v={className:"params",begin:"\\(",
end:"\\)",contains:f};return{name:"Erlang",aliases:["erl"],keywords:a,
illegal:"(</|\\*=|\\+=|-=|/\\*|\\*/|\\(\\*|\\*\\))",contains:[{
className:"function",begin:"^"+n+"\\s*\\(",end:"->",returnBegin:!0,
illegal:"\\(|#|//|/\\*|\\\\|:|;",contains:[v,e.inherit(e.TITLE_MODE,{begin:n})],
starts:{end:";|\\.",keywords:a,contains:f}},r,{begin:"^-",end:"\\.",relevance:0,
excludeEnd:!0,returnBegin:!0,keywords:{$pattern:"-"+e.IDENT_RE,
keyword:["-module","-record","-undef","-export","-ifdef","-ifndef","-author","-copyright","-doc","-moduledoc","-vsn","-import","-include","-include_lib","-compile","-define","-else","-endif","-file","-behaviour","-behavior","-spec","-on_load","-nifs"].map((e=>e+"|1.5")).join(" ")
},contains:[v,_,E,e.QUOTE_STRING_MODE]},s,_,E,e.QUOTE_STRING_MODE,g,o,l,t,b,{
begin:/\.$/}]}}})();hljs.registerLanguage("erlang",e)})();