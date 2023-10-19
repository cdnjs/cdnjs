/*! `leaf` grammar compiled for Highlight.js 11.9.0 */
(()=>{var a=(()=>{"use strict";return a=>{
const e=/([A-Za-z_][A-Za-z_0-9]*)?/,n={scope:"params",begin:/\(/,
end:/\)(?=\:?)/,endsParent:!0,relevance:7,contains:[{scope:"string",begin:'"',
end:'"'},{scope:"keyword",match:"true|false|in"},{scope:"variable",
match:/[A-Za-z_][A-Za-z_0-9]*/},{scope:"operator",
match:/\+|\-|\*|\/|\%|\=\=|\=|\!|\>|\<|\&\&|\|\|/}]},t={match:[e,/(?=\()/],
scope:{1:"keyword"},contains:[n]};return n.contains.unshift(t),{name:"Leaf",
contains:[{match:[/#+/,e,/(?=\()/],scope:{1:"punctuation",2:"keyword"},starts:{
contains:[{match:/\:/,scope:"punctuation"}]},contains:[n]},{match:[/#+/,e,/:?/],
scope:{1:"punctuation",2:"keyword",3:"punctuation"}}]}}})()
;hljs.registerLanguage("leaf",a)})();