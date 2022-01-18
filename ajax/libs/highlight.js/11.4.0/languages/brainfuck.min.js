/*! `brainfuck` grammar compiled for Highlight.js 11.4.0 */
(()=>{var e=(()=>{"use strict";return e=>{const n={className:"literal",
begin:/[+-]/,relevance:0};return{name:"Brainfuck",aliases:["bf"],
contains:[e.COMMENT("[^\\[\\]\\.,\\+\\-<> \r\n]","[\\[\\]\\.,\\+\\-<> \r\n]",{
returnEnd:!0,relevance:0}),{className:"title",begin:"[\\[\\]]",relevance:0},{
className:"string",begin:"[\\.,]",relevance:0},{begin:/(?:\+\+|--)/,contains:[n]
},n]}}})();hljs.registerLanguage("brainfuck",e)})();