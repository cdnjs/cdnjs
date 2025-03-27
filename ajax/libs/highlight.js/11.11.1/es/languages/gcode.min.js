/*! `gcode` grammar compiled for Highlight.js 11.11.1 */
var hljsGrammar=(()=>{"use strict";return n=>{const t=n.regex,e=/\b/
;function a(n,t){if(0===n.index)return;const e=n.input[n.index-1]
;e>="0"&&e<="9"||"_"!==e&&t.ignoreMatch()}
const c=/[+-]?((\.\d+)|(\d+)(\.\d*)?)/,o=/[GM]\s*\d+(\.\d+)?/,s=/T\s*\d+/,i=/O\s*\d+/,r=/O<.+>/,E=/[ABCUVWXYZ]\s*/,d=/[FHIJKPQRS]\s*/
;return{name:"G-code (ISO 6983)",aliases:["nc"],case_insensitive:!0,
disableAutodetect:!0,keywords:{$pattern:/[A-Z]+|%/,
keyword:["THEN","ELSE","ENDIF","IF","GOTO","DO","WHILE","WH","END","CALL","SUB","ENDSUB","EQ","NE","LT","GT","LE","GE","AND","OR","XOR","%"],
built_in:["ATAN","ABS","ACOS","ASIN","COS","EXP","FIX","FUP","ROUND","LN","SIN","SQRT","TAN","EXISTS"]
},
contains:[n.COMMENT(/\(/,/\)/),n.COMMENT(/;/,/$/),n.APOS_STRING_MODE,n.QUOTE_STRING_MODE,n.C_NUMBER_MODE,{
scope:"title.function",variants:[{match:t.concat(e,o)},{begin:o,"on:begin":a},{
match:t.concat(e,s)},{begin:s,"on:begin":a}]},{scope:"symbol",variants:[{
match:t.concat(e,i)},{begin:i,"on:begin":a},{match:t.concat(e,r)},{begin:r,
"on:begin":a},{match:/\*\s*\d+\s*$/}]},{scope:"operator",match:/^N\s*\d+/},{
scope:"variable",match:/-?#\s*\d+/},{scope:"property",variants:[{
match:t.concat(e,E,c)},{begin:t.concat(E,c),"on:begin":a}]},{scope:"params",
variants:[{match:t.concat(e,d,c)},{begin:t.concat(d,c),"on:begin":a}]}]}}})()
;export default hljsGrammar;