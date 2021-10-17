/*! `elixir` grammar compiled for Highlight.js 11.3.1 */
(()=>{var e=(()=>{"use strict";return e=>{
const n=e.regex,i="[a-zA-Z_][a-zA-Z0-9_.]*(!|\\?)?",a={$pattern:i,
keyword:["after","alias","and","case","catch","cond","defstruct","do","else","end","fn","for","if","import","in","not","or","quote","raise","receive","require","reraise","rescue","try","unless","unquote","unquote_splicing","use","when","with|0"],
literal:["false","nil","true"]},s={className:"subst",begin:/#\{/,end:/\}/,
keywords:a},c={match:/\\[\s\S]/,scope:"char.escape",relevance:0},r=[{begin:/"/,
end:/"/},{begin:/'/,end:/'/},{begin:/\//,end:/\//},{begin:/\|/,end:/\|/},{
begin:/\(/,end:/\)/},{begin:/\[/,end:/\]/},{begin:/\{/,end:/\}/},{begin:/</,
end:/>/}],t=e=>({scope:"char.escape",begin:n.concat(/\\/,e),relevance:0}),d={
className:"string",begin:"~[a-z](?=[/|([{<\"'])",
contains:r.map((n=>e.inherit(n,{contains:[t(n.end),c,s]})))},o={
className:"string",begin:"~[A-Z](?=[/|([{<\"'])",
contains:r.map((n=>e.inherit(n,{contains:[t(n.end)]})))},b={className:"regex",
variants:[{begin:"~r(?=[/|([{<\"'])",contains:r.map((i=>e.inherit(i,{
end:n.concat(i.end,/[uismxfU]{0,7}/),contains:[t(i.end),c,s]})))},{
begin:"~R(?=[/|([{<\"'])",contains:r.map((i=>e.inherit(i,{
end:n.concat(i.end,/[uismxfU]{0,7}/),contains:[t(i.end)]})))}]},g={
className:"string",contains:[e.BACKSLASH_ESCAPE,s],variants:[{begin:/"""/,
end:/"""/},{begin:/'''/,end:/'''/},{begin:/~S"""/,end:/"""/,contains:[]},{
begin:/~S"/,end:/"/,contains:[]},{begin:/~S'''/,end:/'''/,contains:[]},{
begin:/~S'/,end:/'/,contains:[]},{begin:/'/,end:/'/},{begin:/"/,end:/"/}]},l={
className:"function",beginKeywords:"def defp defmacro defmacrop",end:/\B\b/,
contains:[e.inherit(e.TITLE_MODE,{begin:i,endsParent:!0})]},m=e.inherit(l,{
className:"class",beginKeywords:"defimpl defmodule defprotocol defrecord",
end:/\bdo\b|$|;/}),u=[g,b,o,d,e.HASH_COMMENT_MODE,m,l,{begin:"::"},{
className:"symbol",begin:":(?![\\s:])",contains:[g,{
begin:"[a-zA-Z_]\\w*[!?=]?|[-+~]@|<<|>>|=~|===?|<=>|[<>]=?|\\*\\*|[-/+%^&*~`|]|\\[\\]=?"
}],relevance:0},{className:"symbol",begin:i+":(?!:)",relevance:0},{
className:"number",
begin:"(\\b0o[0-7_]+)|(\\b0b[01_]+)|(\\b0x[0-9a-fA-F_]+)|(-?\\b[0-9][0-9_]*(\\.[0-9_]+([eE][-+]?[0-9]+)?)?)",
relevance:0},{className:"variable",begin:"(\\$\\W)|((\\$|@@?)(\\w+))"},{
begin:"->"}];return s.contains=u,{name:"Elixir",aliases:["ex","exs"],keywords:a,
contains:u}}})();hljs.registerLanguage("elixir",e)})();