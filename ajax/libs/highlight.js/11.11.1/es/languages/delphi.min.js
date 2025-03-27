/*! `delphi` grammar compiled for Highlight.js 11.11.1 */
var hljsGrammar=(()=>{"use strict";return e=>{
const a=["exports","register","file","shl","array","record","property","for","mod","while","set","ally","label","uses","raise","not","stored","class","safecall","var","interface","or","private","static","exit","index","inherited","to","else","stdcall","override","shr","asm","far","resourcestring","finalization","packed","virtual","out","and","protected","library","do","xorwrite","goto","near","function","end","div","overload","object","unit","begin","string","on","inline","repeat","until","destructor","write","message","program","with","read","initialization","except","default","nil","if","case","cdecl","in","downto","threadvar","of","try","pascal","const","external","constructor","type","public","then","implementation","finally","published","procedure","absolute","reintroduce","operator","as","is","abstract","alias","assembler","bitpacked","break","continue","cppdecl","cvar","enumerator","experimental","platform","deprecated","unimplemented","dynamic","export","far16","forward","generic","helper","implements","interrupt","iochecks","local","name","nodefault","noreturn","nostackframe","oldfpccall","otherwise","saveregisters","softfloat","specialize","strict","unaligned","varargs"],r=[e.C_LINE_COMMENT_MODE,e.COMMENT(/\{/,/\}/,{
relevance:0}),e.COMMENT(/\(\*/,/\*\)/,{relevance:10})],t={className:"meta",
variants:[{begin:/\{\$/,end:/\}/},{begin:/\(\*\$/,end:/\*\)/}]},n={
className:"string",begin:/'/,end:/'/,contains:[{begin:/''/}]},s={
className:"string",variants:[{match:/#\d[\d_]*/},{
match:/#\$[\dA-Fa-f][\dA-Fa-f_]*/},{match:/#&[0-7][0-7_]*/},{
match:/#%[01][01_]*/}]},c={begin:e.IDENT_RE+"\\s*=\\s*class\\s*\\(",
returnBegin:!0,contains:[e.TITLE_MODE]},i={className:"function",
beginKeywords:"function constructor destructor procedure",end:/[:;]/,
keywords:"function constructor|10 destructor|10 procedure|10",
contains:[e.TITLE_MODE,{className:"params",begin:/\(/,end:/\)/,keywords:a,
contains:[n,s,t].concat(r)},t].concat(r)};return{name:"Delphi",
aliases:["dpr","dfm","pas","pascal"],case_insensitive:!0,keywords:a,
illegal:/"|\$[G-Zg-z]|\/\*|<\/|\|/,contains:[n,s,{className:"number",
relevance:0,variants:[{match:/\b\d[\d_]*(\.\d[\d_]*)?/},{match:/\$[\dA-Fa-f_]+/
},{match:/\$/,relevance:0},{match:/&[0-7][0-7_]*/},{match:/%[01_]+/},{match:/%/,
relevance:0}]},c,i,t].concat(r)}}})();export default hljsGrammar;