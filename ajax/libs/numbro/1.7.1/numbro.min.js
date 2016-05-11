/*!
 * numbro.js
 * version : 1.7.1
 * author : Företagsplatsen AB
 * license : MIT
 * http://www.foretagsplatsen.se
 */
(function(){"use strict";/************************************
        Constructors
    ************************************/
// Numbro prototype object
function a(a){this._value=a}function b(a){var b,c="";for(b=0;a>b;b++)c+="0";return c}/**
     * Implementation of toFixed() for numbers with exponents
     * This function may return negative representations for zero values e.g. "-0.0"
     */
function c(a,c){var d,e,f,g,h,i,j,k;
// exponent is positive - add zeros after the numbers
// exponent is negative
// tack on the decimal point if needed
// substring off the end to satisfy the precision
// only add percision 0's if the exponent is positive
return k=a.toString(),d=k.split("e")[0],g=k.split("e")[1],e=d.split(".")[0],f=d.split(".")[1]||"",+g>0?k=e+f+b(g-f.length):(h=0>+e?"-0":"0",c>0&&(h+="."),j=b(-1*g-1),i=(j+Math.abs(e)+f).substr(0,c),k=h+i),+g>0&&c>0&&(k+="."+b(c)),k}/**
     * Implementation of toFixed() that treats floats more like decimals
     *
     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
     * problems for accounting- and finance-related software.
     *
     * Also removes negative signs for zero-formatted numbers. e.g. -0.01 w/ precision 1 -> 0.0
     */
function d(a,b,d,e){var f,g,h=Math.pow(10,b);
// toFixed returns scientific notation for numbers above 1e21 and below 1e-7
// remove the leading negative sign if it exists and should not be present (e.g. -0.00)
// Multiply up by precision, round accurately, then divide and use native toFixed():
return a.toString().indexOf("e")>-1?(g=c(a,b),"-"===g.charAt(0)&&+g>=0&&(g=g.substr(1))):g=(d(a+"e+"+b)/h).toFixed(b),e&&(f=new RegExp("0{1,"+e+"}$"),g=g.replace(f,"")),g}/************************************
        Formatting
    ************************************/
// determine what type of formatting we need to do
function e(a,b,c){var d,e=b.replace(/\{[^\{\}]*\}/g,"");
// return string
// figure out what kind of format we are dealing with
// currency!!!!!
return d=e.indexOf("$")>-1?g(a,b,c):e.indexOf("%")>-1?h(a,b,c):e.indexOf(":")>-1?i(a,b):k(a._value,b,c)}
// revert to number
function f(a,b){var c,d,e,f,g,h=b,i=["KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],k=["KB","MB","GB","TB","PB","EB","ZB","YB"],l=!1;if(b.indexOf(":")>-1)a._value=j(b);else if(b===v)a._value=0;else{
// see if bytes are there so that we can multiply to the correct number
for("."!==s[u].delimiters.decimal&&(b=b.replace(/\./g,"").replace(s[u].delimiters.decimal,".")),c=new RegExp("[^a-zA-Z]"+s[u].abbreviations.thousand+"(?:\\)|(\\"+s[u].currency.symbol+")?(?:\\))?)?$"),d=new RegExp("[^a-zA-Z]"+s[u].abbreviations.million+"(?:\\)|(\\"+s[u].currency.symbol+")?(?:\\))?)?$"),e=new RegExp("[^a-zA-Z]"+s[u].abbreviations.billion+"(?:\\)|(\\"+s[u].currency.symbol+")?(?:\\))?)?$"),f=new RegExp("[^a-zA-Z]"+s[u].abbreviations.trillion+"(?:\\)|(\\"+s[u].currency.symbol+")?(?:\\))?)?$"),g=0;g<=i.length&&!l;g++)b.indexOf(i[g])>-1?l=Math.pow(1024,g+1):b.indexOf(k[g])>-1&&(l=Math.pow(1e3,g+1));
// do some math to create our number
a._value=(l?l:1)*(h.match(c)?Math.pow(10,3):1)*(h.match(d)?Math.pow(10,6):1)*(h.match(e)?Math.pow(10,9):1)*(h.match(f)?Math.pow(10,12):1)*(b.indexOf("%")>-1?.01:1)*((b.split("-").length+Math.min(b.split("(").length-1,b.split(")").length-1))%2?1:-1)*Number(b.replace(/[^0-9\.]+/g,"")),
// round if we are talking about bytes
a._value=l?Math.ceil(a._value):a._value}return a._value}function g(a,b,c){var d,e,f=b,g=f.indexOf("$"),h=f.indexOf("("),i=f.indexOf("+"),j=f.indexOf("-"),l="",m="";if(-1===f.indexOf("$")?
// Use defaults instead of the format provided
"infix"===s[u].currency.position?(m=s[u].currency.symbol,s[u].currency.spaceSeparated&&(m=" "+m+" ")):s[u].currency.spaceSeparated&&(l=" "):f.indexOf(" $")>-1?(l=" ",f=f.replace(" $","")):f.indexOf("$ ")>-1?(l=" ",f=f.replace("$ ","")):f=f.replace("$",""),e=k(a._value,f,c,m),-1===b.indexOf("$"))
// Use defaults instead of the format provided
switch(s[u].currency.position){case"postfix":e.indexOf(")")>-1?(e=e.split(""),e.splice(-1,0,l+s[u].currency.symbol),e=e.join("")):e=e+l+s[u].currency.symbol;break;case"infix":break;case"prefix":e.indexOf("(")>-1||e.indexOf("-")>-1?(e=e.split(""),d=Math.max(h,j)+1,e.splice(d,0,s[u].currency.symbol+l),e=e.join("")):e=s[u].currency.symbol+l+e;break;default:throw Error('Currency position should be among ["prefix", "infix", "postfix"]')}else
// position the symbol
1>=g?e.indexOf("(")>-1||e.indexOf("+")>-1||e.indexOf("-")>-1?(e=e.split(""),d=1,(h>g||i>g||j>g)&&(d=0),e.splice(d,0,s[u].currency.symbol+l),e=e.join("")):e=s[u].currency.symbol+l+e:e.indexOf(")")>-1?(e=e.split(""),e.splice(-1,0,l+s[u].currency.symbol),e=e.join("")):e=e+l+s[u].currency.symbol;return e}function h(a,b,c){var d,e="",f=100*a._value;
// check for space before %
return b.indexOf(" %")>-1?(e=" ",b=b.replace(" %","")):b=b.replace("%",""),d=k(f,b,c),d.indexOf(")")>-1?(d=d.split(""),d.splice(-1,0,e+"%"),d=d.join("")):d=d+e+"%",d}function i(a){var b=Math.floor(a._value/60/60),c=Math.floor((a._value-60*b*60)/60),d=Math.round(a._value-60*b*60-60*c);return b+":"+(10>c?"0"+c:c)+":"+(10>d?"0"+d:d)}function j(a){var b=a.split(":"),c=0;
// turn hours and minutes into seconds and add them all up
// hours
// minutes
// seconds
// minutes
// seconds
return 3===b.length?(c+=60*Number(b[0])*60,c+=60*Number(b[1]),c+=Number(b[2])):2===b.length&&(c+=60*Number(b[0]),c+=Number(b[1])),Number(c)}function k(a,b,c,e){var f,g,h,i,j,k,l,m,n,o,p,q,r,t,w,x,y,z,A=!1,B=!1,C=!1,D="",E=!1,// force abbreviation to thousands
F=!1,// force abbreviation to millions
G=!1,// force abbreviation to billions
H=!1,// force abbreviation to trillions
I=!1,// force abbreviation
J="",K="",L=Math.abs(a),M=["B","KiB","MiB","GiB","TiB","PiB","EiB","ZiB","YiB"],N=["B","KB","MB","GB","TB","PB","EB","ZB","YB"],O="",P=!1,Q=!1,R="";
// check if number is zero and a custom zero format has been set
if(0===a&&null!==v)return v;if(!isFinite(a))return""+a;if(0===b.indexOf("{")){var S=b.indexOf("}");if(-1===S)throw Error('Format should also contain a "}"');q=b.slice(1,S),b=b.slice(S+1)}else q="";if(b.indexOf("}")===b.length-1){var T=b.indexOf("{");if(-1===T)throw Error('Format should also contain a "{"');r=b.slice(T+1,-1),b=b.slice(0,T+1)}else r="";
// check for min length
var U;
// see if abbreviation is wanted
if(U=-1===b.indexOf(".")?b.match(/([0-9]+).*/):b.match(/([0-9]+)\..*/),z=null===U?-1:U[1].length,-1!==b.indexOf("-")&&(P=!0),b.indexOf("(")>-1?(A=!0,b=b.slice(1,-1)):b.indexOf("+")>-1&&(B=!0,b=b.replace(/\+/g,"")),b.indexOf("a")>-1){if(o=b.split(".")[0].match(/[0-9]+/g)||["0"],o=parseInt(o[0],10),E=b.indexOf("aK")>=0,F=b.indexOf("aM")>=0,G=b.indexOf("aB")>=0,H=b.indexOf("aT")>=0,I=E||F||G||H,b.indexOf(" a")>-1?(D=" ",b=b.replace(" a","")):b=b.replace("a",""),j=Math.floor(Math.log(L)/Math.LN10)+1,l=j%3,l=0===l?3:l,o&&0!==L&&(k=Math.floor(Math.log(L)/Math.LN10)+1-o,m=3*~~((Math.min(o,j)-l)/3),L/=Math.pow(10,m),-1===b.indexOf(".")&&o>3))for(b+="[.]",x=0===k?0:3*~~(k/3)-k,x=0>x?x+3:x,f=0;x>f;f++)b+="0";Math.floor(Math.log(Math.abs(a))/Math.LN10)+1!==o&&(L>=Math.pow(10,12)&&!I||H?(D+=s[u].abbreviations.trillion,a/=Math.pow(10,12)):L<Math.pow(10,12)&&L>=Math.pow(10,9)&&!I||G?(D+=s[u].abbreviations.billion,a/=Math.pow(10,9)):L<Math.pow(10,9)&&L>=Math.pow(10,6)&&!I||F?(D+=s[u].abbreviations.million,a/=Math.pow(10,6)):(L<Math.pow(10,6)&&L>=Math.pow(10,3)&&!I||E)&&(D+=s[u].abbreviations.thousand,a/=Math.pow(10,3)))}
// see if we are formatting binary bytes
if(b.indexOf("b")>-1)for(
// check for space before
b.indexOf(" b")>-1?(J=" ",b=b.replace(" b","")):b=b.replace("b",""),i=0;i<=M.length;i++)if(g=Math.pow(1024,i),h=Math.pow(1024,i+1),a>=g&&h>a){J+=M[i],g>0&&(a/=g);break}
// see if we are formatting decimal bytes
if(b.indexOf("d")>-1)for(
// check for space before
b.indexOf(" d")>-1?(J=" ",b=b.replace(" d","")):b=b.replace("d",""),i=0;i<=N.length;i++)if(g=Math.pow(1e3,i),h=Math.pow(1e3,i+1),a>=g&&h>a){J+=N[i],g>0&&(a/=g);break}if(
// see if ordinal is wanted
b.indexOf("o")>-1&&(
// check for space before
b.indexOf(" o")>-1?(K=" ",b=b.replace(" o","")):b=b.replace("o",""),s[u].ordinal&&(K+=s[u].ordinal(a))),b.indexOf("[.]")>-1&&(C=!0,b=b.replace("[.]",".")),n=a.toString().split(".")[0],p=b.split(".")[1],t=b.indexOf(","),p){if(-1!==p.indexOf("*")?O=d(a,a.toString().split(".")[1].length,c):p.indexOf("[")>-1?(p=p.replace("]",""),p=p.split("["),O=d(a,p[0].length+p[1].length,c,p[1].length)):O=d(a,p.length,c),n=O.split(".")[0],O.split(".")[1].length){var V=e?D+e:s[u].delimiters.decimal;O=V+O.split(".")[1]}else O="";C&&0===Number(O.slice(1))&&(O="")}else n=d(a,0,c);
// format number
return n.indexOf("-")>-1&&(n=n.slice(1),Q=!0),n.length<z&&(n=new Array(z-n.length+1).join("0")+n),t>-1&&(n=n.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g,"$1"+s[u].delimiters.thousands)),0===b.indexOf(".")&&(n=""),w=b.indexOf("("),y=b.indexOf("-"),R=y>w?(A&&Q?"(":"")+(P&&Q||!A&&Q?"-":""):(P&&Q||!A&&Q?"-":"")+(A&&Q?"(":""),q+R+(!Q&&B&&0!==a?"+":"")+n+O+(K?K:"")+(D&&!e?D:"")+(J?J:"")+(A&&Q?")":"")+r}/************************************
        Helpers
    ************************************/
function l(a,b){s[a]=b}function m(a){u=a;var b=s[a].defaults;b&&b.format&&q.defaultFormat(b.format),b&&b.currencyFormat&&q.defaultCurrencyFormat(b.currencyFormat)}function n(){return"undefined"!=typeof process&&void 0===process.browser&&("node"===process.title||"grunt"===process.title||"gulp"===process.title)&&"undefined"!=typeof require}/**
     * Computes the multiplier necessary to make x >= 1,
     * effectively eliminating miscalculations caused by
     * finite precision.
     */
function o(a){var b=a.toString().split(".");return b.length<2?1:Math.pow(10,b[1].length)}/**
     * Given a variable number of arguments, returns the maximum
     * multiplier that must be used to normalize an operation involving
     * all of them.
     */
function p(){var a=Array.prototype.slice.call(arguments);return a.reduce(function(a,b){var c=o(a),d=o(b);return c>d?c:d},-(1/0))}/************************************
        Constants
    ************************************/
var q,r="1.7.1",
// internal storage for culture config files
s={},
// Todo: Remove in 2.0.0
t=s,u="en-US",v=null,w="0,0",x="0$",
// check for nodeJS
y="undefined"!=typeof module&&module.exports,
// default culture
z={delimiters:{thousands:",",decimal:"."},abbreviations:{thousand:"k",million:"m",billion:"b",trillion:"t"},ordinal:function(a){var b=a%10;return 1===~~(a%100/10)?"th":1===b?"st":2===b?"nd":3===b?"rd":"th"},currency:{symbol:"$",position:"prefix"},defaults:{currencyFormat:",0000 a"},formats:{fourDigits:"0000 a",fullWithTwoDecimals:"$ ,0.00",fullWithTwoDecimalsNoCurrency:",0.00"}};q=function(b){return q.isNumbro(b)?b=b.value():0===b||"undefined"==typeof b?b=0:Number(b)||(b=q.fn.unformat(b)),new a(Number(b))},q.version=r,q.isNumbro=function(b){return b instanceof a},q.setLanguage=function(a,b){console.warn("`setLanguage` is deprecated since version 1.6.0. Use `setCulture` instead");var c=a,d=a.split("-")[0],e=null;t[c]||(Object.keys(t).forEach(function(a){e||a.split("-")[0]!==d||(e=a)}),c=e||b||"en-US"),m(c)},q.setCulture=function(a,b){var c=a,d=a.split("-")[1],e=null;s[c]||(d&&Object.keys(s).forEach(function(a){e||a.split("-")[1]!==d||(e=a)}),c=e||b||"en-US"),m(c)},q.language=function(a,b){if(console.warn("`language` is deprecated since version 1.6.0. Use `culture` instead"),!a)return u;if(a&&!b){if(!t[a])throw new Error("Unknown language : "+a);m(a)}return!b&&t[a]||l(a,b),q},q.culture=function(a,b){if(!a)return u;if(a&&!b){if(!s[a])throw new Error("Unknown culture : "+a);m(a)}return!b&&s[a]||l(a,b),q},q.languageData=function(a){if(console.warn("`languageData` is deprecated since version 1.6.0. Use `cultureData` instead"),!a)return t[u];if(!t[a])throw new Error("Unknown language : "+a);return t[a]},q.cultureData=function(a){if(!a)return s[u];if(!s[a])throw new Error("Unknown culture : "+a);return s[a]},q.culture("en-US",z),q.languages=function(){return console.warn("`languages` is deprecated since version 1.6.0. Use `cultures` instead"),t},q.cultures=function(){return s},q.zeroFormat=function(a){v="string"==typeof a?a:null},q.defaultFormat=function(a){w="string"==typeof a?a:"0.0"},q.defaultCurrencyFormat=function(a){x="string"==typeof a?a:"0$"},q.validate=function(a,b){var c,d,e,f,g,h,i,j;if("string"!=typeof a&&(a+="",console.warn&&console.warn("Numbro.js: Value is not string. It has been co-erced to: ",a)),a=a.trim(),a.match(/^\d+$/))return!0;if(""===a)return!1;try{i=q.cultureData(b)}catch(k){i=q.cultureData(q.culture())}return e=i.currency.symbol,g=i.abbreviations,c=i.delimiters.decimal,d="."===i.delimiters.thousands?"\\.":i.delimiters.thousands,j=a.match(/^[^\d]+/),null!==j&&(a=a.substr(1),j[0]!==e)?!1:(j=a.match(/[^\d]+$/),null!==j&&(a=a.slice(0,-1),j[0]!==g.thousand&&j[0]!==g.million&&j[0]!==g.billion&&j[0]!==g.trillion)?!1:(h=new RegExp(d+"{2}"),a.match(/[^\d.,]/g)?!1:(f=a.split(c),f.length>2?!1:f.length<2?!!f[0].match(/^\d+.*\d$/)&&!f[0].match(h):1===f[0].length?!!f[0].match(/^\d+$/)&&!f[0].match(h)&&!!f[1].match(/^\d+$/):!!f[0].match(/^\d+.*\d$/)&&!f[0].match(h)&&!!f[1].match(/^\d+$/))))},q.loadLanguagesInNode=function(){console.warn("`loadLanguagesInNode` is deprecated since version 1.6.0. Use `loadCulturesInNode` instead"),q.loadCulturesInNode()},q.loadCulturesInNode=function(){var a=require("./languages");for(var b in a)b&&q.culture(b,a[b])},"function"!=typeof Array.prototype.reduce&&(Array.prototype.reduce=function(a,b){if(null===this||"undefined"==typeof this)throw new TypeError("Array.prototype.reduce called on null or undefined");if("function"!=typeof a)throw new TypeError(a+" is not a function");var c,d,e=this.length>>>0,f=!1;for(1<arguments.length&&(d=b,f=!0),c=0;e>c;++c)this.hasOwnProperty(c)&&(f?d=a(d,this[c],c,this):(d=this[c],f=!0));if(!f)throw new TypeError("Reduce of empty array with no initial value");return d}),q.fn=a.prototype={clone:function(){return q(this)},format:function(a,b){return e(this,a?a:w,void 0!==b?b:Math.round)},formatCurrency:function(a,b){return g(this,a?a:x,void 0!==b?b:Math.round)},unformat:function(a){return"[object Number]"===Object.prototype.toString.call(a)?a:f(this,a?a:w)},value:function(){return this._value},valueOf:function(){return this._value},set:function(a){return this._value=Number(a),this},add:function(a){function b(a,b){return a+c*b}var c=p.call(null,this._value,a);return this._value=[this._value,a].reduce(b,0)/c,this},subtract:function(a){function b(a,b){return a-c*b}var c=p.call(null,this._value,a);return this._value=[a].reduce(b,this._value*c)/c,this},multiply:function(a){function b(a,b){var c=p(a,b),d=a*c;return d*=b*c,d/=c*c}return this._value=[this._value,a].reduce(b,1),this},divide:function(a){function b(a,b){var c=p(a,b);return a*c/(b*c)}return this._value=[this._value,a].reduce(b),this},difference:function(a){return Math.abs(q(this._value).subtract(a).value())}},n()&&q.loadCulturesInNode(),y?module.exports=q:("undefined"==typeof ender&&(this.numbro=q),"function"==typeof define&&define.amd&&define([],function(){return q}))}).call("undefined"==typeof window?this:window);