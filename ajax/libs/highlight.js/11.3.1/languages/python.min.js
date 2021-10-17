/*! `python` grammar compiled for Highlight.js 11.3.1 */
(()=>{var e=(()=>{"use strict";return e=>{
const n=e.regex,a=/[\p{XID_Start}_]\p{XID_Continue}*/u,i={
$pattern:/[A-Za-z]\w+|__\w+__/,
keyword:["and","as","assert","async","await","break","class","continue","def","del","elif","else","except","finally","for","from","global","if","import","in","is","lambda","nonlocal|10","not","or","pass","raise","return","try","while","with","yield"],
built_in:["__import__","abs","all","any","ascii","bin","bool","breakpoint","bytearray","bytes","callable","chr","classmethod","compile","complex","delattr","dict","dir","divmod","enumerate","eval","exec","filter","float","format","frozenset","getattr","globals","hasattr","hash","help","hex","id","input","int","isinstance","issubclass","iter","len","list","locals","map","max","memoryview","min","next","object","oct","open","ord","pow","print","property","range","repr","reversed","round","set","setattr","slice","sorted","staticmethod","str","sum","super","tuple","type","vars","zip"],
literal:["__debug__","Ellipsis","False","None","NotImplemented","True"],
type:["Any","Callable","Coroutine","Dict","List","Literal","Generic","Optional","Sequence","Set","Tuple","Type","Union"]
},s={className:"meta",begin:/^(>>>|\.\.\.) /},t={className:"subst",begin:/\{/,
end:/\}/,keywords:i,illegal:/#/},r={begin:/\{\{/,relevance:0},l={
className:"string",contains:[e.BACKSLASH_ESCAPE],variants:[{
begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?'''/,end:/'''/,
contains:[e.BACKSLASH_ESCAPE,s],relevance:10},{
begin:/([uU]|[bB]|[rR]|[bB][rR]|[rR][bB])?"""/,end:/"""/,
contains:[e.BACKSLASH_ESCAPE,s],relevance:10},{
begin:/([fF][rR]|[rR][fF]|[fF])'''/,end:/'''/,
contains:[e.BACKSLASH_ESCAPE,s,r,t]},{begin:/([fF][rR]|[rR][fF]|[fF])"""/,
end:/"""/,contains:[e.BACKSLASH_ESCAPE,s,r,t]},{begin:/([uU]|[rR])'/,end:/'/,
relevance:10},{begin:/([uU]|[rR])"/,end:/"/,relevance:10},{
begin:/([bB]|[bB][rR]|[rR][bB])'/,end:/'/},{begin:/([bB]|[bB][rR]|[rR][bB])"/,
end:/"/},{begin:/([fF][rR]|[rR][fF]|[fF])'/,end:/'/,
contains:[e.BACKSLASH_ESCAPE,r,t]},{begin:/([fF][rR]|[rR][fF]|[fF])"/,end:/"/,
contains:[e.BACKSLASH_ESCAPE,r,t]},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]
},b="[0-9](_?[0-9])*",o=`(\\b(${b}))?\\.(${b})|\\b(${b})\\.`,c={
className:"number",relevance:0,variants:[{
begin:`(\\b(${b})|(${o}))[eE][+-]?(${b})[jJ]?\\b`},{begin:`(${o})[jJ]?`},{
begin:"\\b([1-9](_?[0-9])*|0+(_?0)*)[lLjJ]?\\b"},{
begin:"\\b0[bB](_?[01])+[lL]?\\b"},{begin:"\\b0[oO](_?[0-7])+[lL]?\\b"},{
begin:"\\b0[xX](_?[0-9a-fA-F])+[lL]?\\b"},{begin:`\\b(${b})[jJ]\\b`}]},d={
className:"comment",begin:n.lookahead(/# type:/),end:/$/,keywords:i,contains:[{
begin:/# type:/},{begin:/#/,end:/\b\B/,endsWithParent:!0}]},g={
className:"params",variants:[{className:"",begin:/\(\s*\)/,skip:!0},{begin:/\(/,
end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:i,
contains:["self",s,c,l,e.HASH_COMMENT_MODE]}]};return t.contains=[l,c,s],{
name:"Python",aliases:["py","gyp","ipython"],unicodeRegex:!0,keywords:i,
illegal:/(<\/|->|\?)|=>/,contains:[s,c,{begin:/\bself\b/},{beginKeywords:"if",
relevance:0},l,d,e.HASH_COMMENT_MODE,{match:[/def/,/\s+/,a],scope:{1:"keyword",
3:"title.function"},contains:[g]},{variants:[{
match:[/class/,/\s+/,a,/\s*/,/\(\s*/,a,/\s*\)/]},{match:[/class/,/\s+/,a]}],
scope:{1:"keyword",3:"title.class",6:"title.class.inherited"}},{
className:"meta",begin:/^[\t ]*@/,end:/(?=#)|$/,contains:[c,g,l]}]}}})()
;hljs.registerLanguage("python",e)})();