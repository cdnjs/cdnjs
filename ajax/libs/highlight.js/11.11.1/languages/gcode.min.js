/*! `gcode` grammar compiled for Highlight.js 11.11.1 */
(()=>{var n=(()=>{"use strict";return n=>{const e=n.regex,t=/\b/
;function c(n,e){if(0===n.index)return;const t=n.input[n.index-1]
;t>="0"&&t<="9"||"_"!==t&&e.ignoreMatch()}
const a=/[+-]?((\.\d+)|(\d+)(\.\d*)?)/,o=/[GM]\s*\d+(\.\d+)?/,s=/T\s*\d+/,i=/O\s*\d+/,r=/O<.+>/,E=/[ABCUVWXYZ]\s*/,d=/[FHIJKPQRS]\s*/
;return{name:"G-code (ISO 6983)",aliases:["nc"],case_insensitive:!0,
disableAutodetect:!0,keywords:{$pattern:/[A-Z]+|%/,
keyword:["THEN","ELSE","ENDIF","IF","GOTO","DO","WHILE","WH","END","CALL","SUB","ENDSUB","EQ","NE","LT","GT","LE","GE","AND","OR","XOR","%"],
built_in:["ATAN","ABS","ACOS","ASIN","COS","EXP","FIX","FUP","ROUND","LN","SIN","SQRT","TAN","EXISTS"]
},
contains:[n.COMMENT(/\(/,/\)/),n.COMMENT(/;/,/$/),n.APOS_STRING_MODE,n.QUOTE_STRING_MODE,n.C_NUMBER_MODE,{
scope:"title.function",variants:[{match:e.concat(t,o)},{begin:o,"on:begin":c},{
match:e.concat(t,s)},{begin:s,"on:begin":c}]},{scope:"symbol",variants:[{
match:e.concat(t,i)},{begin:i,"on:begin":c},{match:e.concat(t,r)},{begin:r,
"on:begin":c},{match:/\*\s*\d+\s*$/}]},{scope:"operator",match:/^N\s*\d+/},{
scope:"variable",match:/-?#\s*\d+/},{scope:"property",variants:[{
match:e.concat(t,E,a)},{begin:e.concat(E,a),"on:begin":c}]},{scope:"params",
variants:[{match:e.concat(t,d,a)},{begin:e.concat(d,a),"on:begin":c}]}]}}})()
;hljs.registerLanguage("gcode",n)})();