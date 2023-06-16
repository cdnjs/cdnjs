;/*!node_modules/office-viewer/lib/node_modules/tslib/tslib.es6.js*/
amis.define("8701f02",(function(t,n,e,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=function(t,n){return o=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(t,n){t.__proto__=n}||function(t,n){for(var e in n)Object.prototype.hasOwnProperty.call(n,e)&&(t[e]=n[e])},o(t,n)};n.__assign=function(){return n.__assign=Object.assign||function(t){for(var n,e=1,r=arguments.length;e<r;e++)for(var o in n=arguments[e])Object.prototype.hasOwnProperty.call(n,o)&&(t[o]=n[o]);return t},n.__assign.apply(this,arguments)},n.__awaiter=function(t,n,e,r){return new(e||(e=Promise))((function(o,a){function i(t){try{c(r.next(t))}catch(t){a(t)}}function l(t){try{c(r.throw(t))}catch(t){a(t)}}function c(t){var n;t.done?o(t.value):(n=t.value,n instanceof e?n:new e((function(t){t(n)}))).then(i,l)}c((r=r.apply(t,n||[])).next())}))},n.__extends=function(t,n){if("function"!=typeof n&&null!==n)throw new TypeError("Class extends value "+String(n)+" is not a constructor or null");function e(){this.constructor=t}o(t,n),t.prototype=null===n?Object.create(n):(e.prototype=n.prototype,new e)},n.__generator=function(t,n){var e,r,o,a,i={label:0,sent:function(){if(1&o[0])throw o[1];return o[1]},trys:[],ops:[]};return a={next:l(0),throw:l(1),return:l(2)},"function"==typeof Symbol&&(a[Symbol.iterator]=function(){return this}),a;function l(l){return function(c){return function(l){if(e)throw new TypeError("Generator is already executing.");for(;a&&(a=0,l[0]&&(i=0)),i;)try{if(e=1,r&&(o=2&l[0]?r.return:l[0]?r.throw||((o=r.return)&&o.call(r),0):r.next)&&!(o=o.call(r,l[1])).done)return o;switch(r=0,o&&(l=[2&l[0],o.value]),l[0]){case 0:case 1:o=l;break;case 4:return i.label++,{value:l[1],done:!1};case 5:i.label++,r=l[1],l=[0];continue;case 7:l=i.ops.pop(),i.trys.pop();continue;default:if(!(o=i.trys,(o=o.length>0&&o[o.length-1])||6!==l[0]&&2!==l[0])){i=0;continue}if(3===l[0]&&(!o||l[1]>o[0]&&l[1]<o[3])){i.label=l[1];break}if(6===l[0]&&i.label<o[1]){i.label=o[1],o=l;break}if(o&&i.label<o[2]){i.label=o[2],i.ops.push(l);break}o[2]&&i.ops.pop(),i.trys.pop();continue}l=n.call(t,i)}catch(t){l=[6,t],r=0}finally{e=o=0}if(5&l[0])throw l[1];return{value:l[0]?l[1]:void 0,done:!0}}([l,c])}}},n.__read=function(t,n){var e="function"==typeof Symbol&&t[Symbol.iterator];if(!e)return t;var r,o,a=e.call(t),i=[];try{for(;(void 0===n||n-- >0)&&!(r=a.next()).done;)i.push(r.value)}catch(t){o={error:t}}finally{try{r&&!r.done&&(e=a.return)&&e.call(a)}finally{if(o)throw o.error}}return i},n.__spreadArray=function(t,n,e){if(e||2===arguments.length)for(var r,o=0,a=n.length;o<a;o++)!r&&o in n||(r||(r=Array.prototype.slice.call(n,0,o)),r[o]=n[o]);return t.concat(r||Array.prototype.slice.call(n))},n.__values=function(t){var n="function"==typeof Symbol&&Symbol.iterator,e=n&&t[n],r=0;if(e)return e.call(t);if(t&&"number"==typeof t.length)return{next:function(){return t&&r>=t.length&&(t=void 0),{value:t&&t[r++],done:!t}}};throw new TypeError(n?"Object is not iterable.":"Symbol.iterator is not defined.")}}));
;/*!node_modules/office-viewer/lib/OpenXML.js*/
amis.define("f838841",(function(t,e,r,n){"use strict";function u(t){return t.getAttribute("w:val")||t.getAttribute("w14:val")||""}function i(t,e){if(void 0===e&&(e=!1),"boolean"==typeof t)return t;if("string"==typeof t){switch(t){case"1":case"on":case"true":return!0;case"0":case"off":case"false":return!1}if("number"==typeof t)return 0!==t}return e}Object.defineProperty(e,"__esModule",{value:!0}),e.getAttrBoolean=function(t,e,r){return void 0===r&&(r=!0),i(t.getAttribute(e),r)},e.getAttrNumber=function(t,e,r){void 0===r&&(r=0);var n=t.getAttribute(e);return n?parseInt(n,10):r},e.getAttrPercentage=function(t,e){var r=t.getAttribute(e);return r?r.endsWith("%")?parseInt(r,10)/100:parseInt(r,10)/1e5:1},e.getVal=u,e.getValBoolean=function(t,e){return void 0===e&&(e=!0),i(u(t),e)},e.getValHex=function(t){return parseInt(u(t)||"0",16)},e.getValNumber=function(t){return parseInt(u(t),10)},e.normalizeBoolean=i}));
;/*!node_modules/office-viewer/lib/openxml/word/Font.js*/
amis.define("8b96ab3",(function(e,a,t,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("8701f02"),c=e("f838841");var o=function(){function e(){}return e.fromXML=function(a,t){var r,o,s=new e;s.name=t.getAttribute("w:name")||"";try{for(var l=n.__values(t.children),i=l.next();!i.done;i=l.next()){var u=i.value,f=u.tagName;switch(f){case"w:family":s.family=c.getVal(u);break;case"w:altName":s.altName=c.getVal(u);break;case"w:panose1":case"w:charset":case"w:sig":case"w:pitch":break;case"w:embedRegular":case"w:embedBold":case"w:embedItalic":case"w:embedBoldItalic":case"w:embedSystemFonts":case"w:embedTrueTypeFonts":var w=u.getAttribute("r:id")||"",b=u.getAttribute("w:fontKey")||"",d=a.loadFont(w,b);d&&(s.url=d);break;default:console.warn("parse Font: Unknown key",f,u)}}}catch(e){r={error:e}}finally{try{i&&!i.done&&(o=l.return)&&o.call(l)}finally{if(r)throw r.error}}return s},e}();a.Font=o,a.deobfuscate=function(e,a){for(var t=a.replace(/{|}|-/g,""),r=new Array(16),n=0;n<16;n++)r[16-n-1]=parseInt(t.substr(2*n,2),16);for(n=0;n<32;n++)e[n]=e[n]^r[n%16];return e}}));
;/*!node_modules/office-viewer/lib/openxml/word/FontTable.js*/
amis.define("23e79ad",(function(e,r,n,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("8701f02"),a=e("8b96ab3"),f=function(){function e(){this.fonts=[]}return e.fromXML=function(r,n){var t,f,u=Array.from(n.getElementsByTagName("w:font")),i=new e;try{for(var l=o.__values(u),s=l.next();!s.done;s=l.next()){var c=s.value,v=a.Font.fromXML(r,c);i.fonts.push(v)}}catch(e){t={error:e}}finally{try{s&&!s.done&&(f=l.return)&&f.call(l)}finally{if(t)throw t.error}}return i},e}();r.FontTable=f}));
;/*!node_modules/office-viewer/lib/parse/parseRelationship.js*/
amis.define("06bce7a",(function(e,t,r,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("8701f02");function n(e,t){return{id:e.getAttribute("Id")||"",type:e.getAttribute("Type")||"",target:e.getAttribute("Target")||"",targetMode:e.getAttribute("TargetMode")||"",part:t}}t.parseRelationship=n,t.parseRelationships=function(e,t){var r,a,o={},u=e.getElementsByTagName("Relationship");try{for(var l=i.__values(u),s=l.next();!s.done;s=l.next()){var d=n(s.value,t);o[d.id]=d}}catch(e){r={error:e}}finally{try{s&&!s.done&&(a=l.return)&&a.call(l)}finally{if(r)throw r.error}}return o}}));
;/*!node_modules/office-viewer/lib/openxml/ContentType.js*/
amis.define("fa6ad08",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("8701f02");r.parseContentType=function(e){var r,t,a={overrides:[]},i=[].slice.call(e.getElementsByTagName("Override"));try{for(var o=n.__values(i),l=o.next();!l.done;l=o.next()){var u=l.value;a.overrides.push({partName:u.getAttribute("PartName"),contentType:u.getAttribute("ContentType")})}}catch(e){r={error:e}}finally{try{l&&!l.done&&(t=o.return)&&t.call(o)}finally{if(r)throw r.error}}return a}}));
;/*!node_modules/office-viewer/lib/parse/parseSize.js*/
amis.define("b8eb51e",(function(t,n,e,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i={Dxa:{mul:.066665,unit:"px"},Emu:{mul:1.3333/12700,unit:"px"},FontSize:{mul:.66665,unit:"px"},Border:{mul:.1666625,unit:"px"},Point:{mul:1.3333,unit:"px"},Percent:{mul:.02,unit:"%"},LineHeight:{mul:1/240,unit:""},VmlEmu:{mul:1/12700,unit:""}};function r(t,n){return void 0===n&&(n=i.Dxa),null==t||/.+(p[xt]|[%])$/.test(t)?t:"".concat((parseInt(t)*n.mul).toFixed(2)).concat(n.unit)}n.LengthUsage=i,n.convertAngle=function(t){return t?parseInt(t)/6e4:0},n.convertLength=r,n.parseSize=function(t,n,e){void 0===e&&(e=i.Dxa);var u=t.getAttribute(n);return u?r(String(u),e):""}}));
;/*!node_modules/office-viewer/lib/parse/parseCellMargin.js*/
amis.define("ddcc71b",(function(e,a,r,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("8701f02"),n=e("b8eb51e");a.parseCellMargin=function(e,a){var r,t;try{for(var s=i.__values(e.children),c=s.next();!c.done;c=s.next()){var d=c.value;switch(d.tagName){case"w:left":case"w:start":a["padding-left"]=n.parseSize(d,"w:w");break;case"w:right":case"w:end":a["padding-right"]=n.parseSize(d,"w:w");break;case"w:top":a["padding-top"]=n.parseSize(d,"w:w");break;case"w:bottom":a["padding-bottom"]=n.parseSize(d,"w:w")}}}catch(e){r={error:e}}finally{try{c&&!c.done&&(t=s.return)&&t.call(s)}finally{if(r)throw r.error}}}}));
;/*!node_modules/office-viewer/lib/parse/parseColor.js*/
amis.define("428d4e6",(function(r,e,t,c){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("f838841"),n=["black","blue","green","red","white","yellow"],u={cyan:"#00FFFF",magenta:"#FF00FF",darkBlue:"#00008B",darkCyan:"#008B8B",darkGray:"#A9A9A9",darkGreen:"#006400",darkMagenta:"#800080",darkRed:"#8B0000",darkYellow:"#808000",lightGray:"#D3D3D3",none:"transparent"};function s(r,e,t,c){void 0===t&&(t="w:color"),void 0===c&&(c="black");var a=e.getAttribute(t);if(a)return"auto"==a?c:n.includes(a)?a:a in u?u[a]:"#".concat(a);var s=e.getAttribute("w:themeColor");return s?r.getThemeColor(s):""}function o(r,e){var t=parseInt(r.substring(0,2),16),c=parseInt(r.substring(2,4),16),a=parseInt(r.substring(4,6),16);return"rgba(".concat(t,", ").concat(c,", ").concat(a,", ").concat(e,")")}e.colorNameMap=u,e.cssColors=n,e.parseColor=function(r,e){return s(r,e,"w:val")},e.parseColorAttr=s,e.parseShdColor=function(r,e){var t=e.getAttribute("w:fill")||"",c=a.getVal(e);if("auto"===t&&(t="inherit"),6===t.length)switch(c){case"clear":return"#".concat(t);case"pct10":return o(t,.1);case"pct12":return o(t,.125);case"pct15":return o(t,.15);case"pct20":return o(t,.2);case"pct25":return o(t,.25);case"pct30":return o(t,.3);case"pct35":return o(t,.35);case"pct37":return o(t,.375);case"pct40":return o(t,.4);case"pct45":return o(t,.45);case"pct5":return o(t,.05);case"pct50":return o(t,.5);case"pct55":return o(t,.55);case"pct60":return o(t,.6);case"pct65":return o(t,.65);case"pct70":return o(t,.7);case"pct75":return o(t,.75);case"pct80":return o(t,.8);case"pct85":return o(t,.85);case"pct87":return o(t,.87);case"pct90":return o(t,.9);case"pct95":return o(t,.95);default:return console.warn("unsupport shd val",c),"#".concat(t)}return""}}));
;/*!node_modules/office-viewer/lib/parse/parseBorder.js*/
amis.define("9c664ef",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("8701f02"),n=e("f838841"),c=e("428d4e6"),s=e("b8eb51e");function i(e,r){var t=n.getVal(r);if("nil"===t||"none"===t)return"none";var a=c.parseColorAttr(e,r),o=s.parseSize(r,"w:sz",s.LengthUsage.Border);return"".concat(o," solid ").concat("auto"==a?"black":a)}r.parseBorder=i,r.parseBorders=function(e,r,t){var a,n;try{for(var c=o.__values(r.children),s=c.next();!s.done;s=c.next()){var l=s.value;switch(l.tagName){case"w:start":case"w:left":t["border-left"]=i(e,l);break;case"w:end":case"w:right":t["border-right"]=i(e,l);break;case"w:top":t["border-top"]=i(e,l);break;case"w:bottom":t["border-bottom"]=i(e,l)}}}catch(e){a={error:e}}finally{try{s&&!s.done&&(n=c.return)&&n.call(c)}finally{if(a)throw a.error}}}}));
;/*!node_modules/office-viewer/lib/parse/parseTextDirection.js*/
amis.define("8bd6045",(function(e,t,r,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.parseTextDirection=function(e,t){switch(e.getAttribute("w:val")){case"lr":case"lrV":case"btLr":case"lrTb":case"lrTbV":case"tbLrV":t.direction="ltr";break;case"rl":case"rlV":case"tbRl":case"tbRlV":t.direction="rtl"}}}));
;/*!node_modules/office-viewer/lib/parse/parseTblWidth.js*/
amis.define("e956c2e",(function(e,t,r,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("b8eb51e");t.parseTblWidth=function(e){var t=e.getAttribute("w:type");return t&&"dxa"!==t?"pct"===t?i.parseSize(e,"w:w",i.LengthUsage.Percent):"auto"===t?"auto":(console.warn("parseTblWidth: ignore type",t,e),""):i.parseSize(e,"w:w")}}));
;/*!node_modules/office-viewer/lib/parse/parseInsideBorders.js*/
amis.define("31210bc",(function(e,r,i,s){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("9c664ef");r.parseInsideBorders=function(e,r){var i,s,a=r.getElementsByTagName("w:insideH").item(0);a&&(i=t.parseBorder(e,a));var n=r.getElementsByTagName("w:insideV").item(0);return n&&(s=t.parseBorder(e,n)),{H:i,V:s}}}));
;/*!node_modules/office-viewer/lib/parse/parseTcPr.js*/
amis.define("354b058",(function(e,a,r,c){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("8701f02"),n=e("ddcc71b"),i=e("428d4e6"),s=e("f838841"),l=e("9c664ef"),o=e("8bd6045"),d=e("e956c2e"),b=e("31210bc");function p(e,a){switch(s.getVal(e)){case"bottom":a["vertical-align"]="bottom";break;case"center":a["vertical-align"]="middle";break;case"top":a["vertical-align"]="top"}}function g(e,a){var r=d.parseTblWidth(e);r&&(a.width=r)}a.parseTblCellSpacing=function(e,a){var r=d.parseTblWidth(e);r&&(a["cell-spacing"]=r)},a.parseTcPr=function(e,a){var r,c,d={},w={};d.cssStyle=w;try{for(var f=t.__values(a.children),k=f.next();!k.done;k=f.next()){var u=k.value,v=u.tagName;switch(v){case"w:tcMar":n.parseCellMargin(u,w);break;case"w:shd":w["background-color"]=i.parseShdColor(e,u);break;case"w:tcW":g(u,w);break;case"w:noWrap":s.getValBoolean(u)&&(w["white-space"]="nowrap");break;case"w:vAlign":p(u,w);break;case"w:tcBorders":l.parseBorders(e,u,w),d.insideBorder=b.parseInsideBorders(e,u);break;case"w:gridSpan":d.gridSpan=s.getValNumber(u);break;case"w:vMerge":d.vMerge=s.getVal(u)||"continue";break;case"w:textDirection":o.parseTextDirection(u,w);break;case"w:cnfStyle":break;case"w:hideMark":d.hideMark=s.getValBoolean(u,!0);break;default:console.warn("parseTcPr: ignore",v,u)}}}catch(e){r={error:e}}finally{try{k&&!k.done&&(c=f.return)&&c.call(f)}finally{if(r)throw r.error}}return d}}));
;/*!node_modules/office-viewer/lib/util/color.js*/
amis.define("fb3dae1",(function(t,r,i,n){"use strict";function s(t,r,i){t/=255,r/=255,i/=255;var n,s=Math.max(t,r,i),a=Math.min(t,r,i),e=0,h=(s+a)/2;if(s==a)e=n=0;else{var o=s-a;switch(n=h>.5?o/(2-s-a):o/(s+a),s){case t:e=(r-i)/o+(r<i?6:0);break;case r:e=(i-t)/o+2;break;case i:e=(t-r)/o+4}e/=6}return{h:e,s:n,l:h}}function a(t,r,i){return i<0&&(i+=1),i>1&&(i-=1),i<1/6?t+6*(r-t)*i:i<.5?r:i<2/3?t+(r-t)*(2/3-i)*6:t}function e(t,r,i){var n,s,e;if(0==r)n=s=e=i;else{var h=i<.5?i*(1+r):i+r-i*r,o=2*i-h;n=a(o,h,t+1/3),s=a(o,h,t),e=a(o,h,t-1/3)}return{r:255*n,g:255*s,b:255*e}}function h(t){return 1==t.length?"0"+t:""+t}Object.defineProperty(r,"__esModule",{value:!0});var o=function(){function t(t){var r=t.match(/^#?([0-9a-f]{6})$/i);r&&(this.r=parseInt(r[1].substring(0,2),16),this.g=parseInt(r[1].substring(2,4),16),this.b=parseInt(r[1].substring(4,6),16),this.isValid=!0)}return t.prototype.lumMod=function(t){var r=s(this.r,this.g,this.b);r.l=r.l*t,r.l=Math.min(1,Math.max(0,r.l));var i=e(r.h,r.s,r.l);this.r=i.r,this.g=i.g,this.b=i.b},t.prototype.lumOff=function(t){var r=s(this.r,this.g,this.b);r.l+=r.l*t,r.l=Math.min(1,Math.max(0,r.l));var i=e(r.h,r.s,r.l);this.r=i.r,this.g=i.g,this.b=i.b},t.prototype.toHex=function(){return"#"+(t=this.r,r=this.g,i=this.b,[h(Math.round(t).toString(16)),h(Math.round(r).toString(16)),h(Math.round(i).toString(16))].join("").toUpperCase());var t,r,i},t}();r.Color=o}));
;/*!node_modules/office-viewer/lib/parse/parseChildColor.js*/
amis.define("14cd5cc",(function(r,e,a,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("8701f02"),l=r("f838841"),o=r("fb3dae1");function c(r,e){var a,t,c=new o.Color(e);if(c.isValid){try{for(var i=n.__values(r.children),f=i.next();!f.done;f=i.next()){var u=f.value;switch(u.tagName){case"a:lumMod":c.lumMod(l.getAttrPercentage(u,"val"));break;case"a:lumOff":c.lumOff(l.getAttrPercentage(u,"val"))}}}catch(r){a={error:r}}finally{try{f&&!f.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return c.toHex()}return e}function i(r,e){var a,t,c=new o.Color(e);if(c.isValid){try{for(var i=n.__values(r.children),f=i.next();!f.done;f=i.next()){var u=f.value;if("w14:alpha"===u.tagName){var s=l.getVal(u);if(s)return"rgba(".concat(c.r,", ").concat(c.g,", ").concat(c.b,", ").concat(parseInt(s,10)/1e5,")")}}}catch(r){a={error:r}}finally{try{f&&!f.done&&(t=i.return)&&t.call(i)}finally{if(a)throw a.error}}return c.toHex()}return e}e.parseChildColor=function(r,e){var a=e.firstElementChild;if(a){var t=a.tagName;switch(t){case"a:prstClr":return c(a,l.getVal(a)||"");case"a:srgbClr":case"w14:srgbClr":var n=c(a,"#"+l.getVal(a));return n=i(a,n);case"a:schemeClr":var o=a.getAttribute("val")||"";if(o)return c(a,r.getThemeColor(o));default:console.warn("parseOutline: Unknown color type ",t,a)}}return""}}));
;/*!node_modules/office-viewer/lib/parse/parseInd.js*/
amis.define("16061c9",(function(e,i,t,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var r=e("b8eb51e");i.parseInd=function(e,i){var t=r.parseSize(e,"w:firstLine"),n=r.parseSize(e,"w:hanging"),a=r.parseSize(e,"w:left"),s=r.parseSize(e,"w:start"),p=r.parseSize(e,"w:right"),c=r.parseSize(e,"w:end");t&&(i["text-indent"]=t),n&&(i["text-indent"]="-".concat(n)),(a||s)&&(i["margin-left"]=a||s),(p||c)&&(i["margin-right"]=p||c)}}));
;/*!node_modules/office-viewer/lib/parse/parseSpacing.js*/
amis.define("3446e0a",(function(e,t,i,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("b8eb51e");t.parseSpacing=function(e,t,i){var a=r.parseSize(t,"w:before"),n=r.parseSize(t,"w:after"),o=t.getAttribute("w:lineRule");a&&(i["margin-top"]=a),n&&(i["margin-bottom"]=n);var s=t.getAttribute("w:line");if(s){if(e.renderOptions.forceLineHeight)return void(i["line-height"]=e.renderOptions.forceLineHeight);var c=parseInt(s,10),h=e.renderOptions.minLineHeight||1;switch(o){case"auto":var g=Math.max(h,c/240);i["line-height"]="".concat(g.toFixed(2));break;case"atLeast":break;default:var f=Math.max(h,c/20);i["line-height"]=i["min-height"]="".concat(f,"pt")}}}}));
;/*!node_modules/office-viewer/lib/parse/parseFont.js*/
amis.define("f626135",(function(e,a,r,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("8701f02");a.parseFont=function(e,a,r){var t,s,i=[],c=e.renderOptions.fontMapping;try{for(var o=n.__values(a.attributes),f=o.next();!f.done;f=o.next()){var l=f.value,u=l.name,h=l.value;switch(u){case"w:ascii":case"w:cs":case"w:eastAsia":c&&h in c&&(h=c[h]),-1===h.indexOf(" ")?i.push(h):i.push('"'+h+'"');break;case"w:asciiTheme":case"w:csTheme":case"w:eastAsiaTheme":i.push("var(--docx-theme-font-".concat(h,")"))}}}catch(e){t={error:e}}finally{try{f&&!f.done&&(s=o.return)&&s.call(o)}finally{if(t)throw t.error}}i.length&&(r["font-family"]=Array.from(new Set(i)).join(", "))}}));
;/*!node_modules/office-viewer/lib/parse/parseTrHeight.js*/
amis.define("fabde11",(function(e,t,i,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("b8eb51e");t.parseTrHeight=function(e,t){var i=r.parseSize(e,"w:val"),a=e.getAttribute("w:hRule");"exact"===a?t.height=i:"atLeast"===a&&(t.height=i,t["min-height"]=i)}}));
;/*!node_modules/office-viewer/lib/parse/jcToTextAlign.js*/
amis.define("99eb4a0",(function(e,t,r,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.jcToTextAlign=function(e){switch(e){case"start":case"left":return"left";case"center":return"center";case"end":case"right":return"right";case"both":return"justify"}return e}}));
;/*!node_modules/office-viewer/lib/parse/parsePr.js*/
amis.define("2807318",(function(e,a,r,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("8701f02"),o=e("b8eb51e"),c=e("f838841"),n=e("9c664ef"),l=e("428d4e6"),i=e("14cd5cc"),w=e("16061c9"),d=e("3446e0a"),p=e("f626135"),b=e("fabde11"),k=e("99eb4a0"),g=e("8bd6045");function u(e,a,r){var s=c.getVal(a);if(null!=s){switch(s){case"dash":case"dashDotDotHeavy":case"dashDotHeavy":case"dashedHeavy":case"dashLong":case"dashLongHeavy":case"dotDash":case"dotDotDash":r["text-decoration-style"]="dashed";break;case"dotted":case"dottedHeavy":r["text-decoration-style"]="dotted";break;case"double":r["text-decoration-style"]="double";break;case"single":case"thick":case"words":r["text-decoration"]="underline";break;case"wave":case"wavyDouble":case"wavyHeavy":r["text-decoration-style"]="wavy";break;case"none":r["text-decoration"]="none"}var t=l.parseColorAttr(e,a);t&&(r["text-decoration-color"]=t)}}function h(e,a){var r,s;try{for(var c=t.__values(e.attributes),n=c.next();!n.done;n=c.next()){var l=n.value,i=l.name,w=l.value;switch(i){case"w:dropCap":"drop"===w&&(a.float="left");break;case"w:h":"object"!=typeof w||Array.isArray(w)||(a.height=o.parseSize(w,"w:h"));break;case"w:w":"object"!=typeof w||Array.isArray(w)||(a.width=o.parseSize(w,"w:w"));break;case"w:hAnchor":case"w:vAnchor":case"w:lines":break;case"w:wrap":"around"!==w&&console.warn("parseFrame: w:wrap not support "+w);break;default:console.warn("parseFrame: unknown attribute "+i,l)}}}catch(e){r={error:e}}finally{try{n&&!n.done&&(s=c.return)&&s.call(c)}finally{if(r)throw r.error}}}function v(e,a){switch(e){case"dot":case"underDot":a["text-emphasis"]="filled",a["text-emphasis-position"]="under right";break;case"comma":a["text-emphasis"]="filled sesame";break;case"circle":a["text-emphasis"]="open"}}a.parsePr=function(e,a,r){var s,x,f={};try{for(var y=t.__values(a.children),m=y.next();!m.done;m=y.next()){var A=m.value,S=A.tagName;switch(S){case"w:sz":case"w:szCs":f["font-size"]=o.parseSize(A,"w:val",o.LengthUsage.FontSize);break;case"w:jc":f["text-align"]=k.jcToTextAlign(c.getVal(A));break;case"w:framePr":h(A,f);break;case"w:pBdr":n.parseBorders(e,A,f);break;case"w:ind":w.parseInd(A,f);break;case"w:color":f.color=l.parseColor(e,A);break;case"w:shd":"background-color"in f||(f["background-color"]=l.parseShdColor(e,A));break;case"w:spacing":d.parseSpacing(e,A,f);break;case"w:highlight":f["background-color"]=l.parseColorAttr(e,A,"w:val","yellow");break;case"w:vertAlign":var V=c.getVal(A);"superscript"===V?f["vertical-align"]="super":"subscript"===V&&(f["vertical-align"]="sub");break;case"w:position":f["vertical-align"]=o.parseSize(A,"w:val",o.LengthUsage.FontSize);break;case"w:trHeight":b.parseTrHeight(A,f);break;case"w:strike":case"w:dstrike":f["text-decoration"]=c.getValBoolean(A)?"line-through":"none";break;case"w:b":f["font-weight"]=c.getValBoolean(A)?"bold":"normal";break;case"w:adjustRightInd":case"w:bCs":case"w:iCs":case"w:kern":case"w:pStyle":case"w:lang":case"w:noProof":case"w:keepLines":case"w:keepNext":case"w:widowControl":case"w:pageBreakBefore":case"w:outlineLvl":case"w:contextualSpacing":case"w:numPr":case"w:rPr":case"w:rStyle":case"w:tabs":case"w:snapToGrid":case"w:cnfStyle":case"w:autoSpaceDE":case"w:autoSpaceDN":case"w:kinsoku":case"w:overflowPunct":break;case"w:i":f["font-style"]=c.getValBoolean(A)?"italic":"normal";break;case"w:caps":f["text-transform"]=c.getValBoolean(A)?"uppercase":"normal";break;case"w:smallCaps":f["text-transform"]=c.getValBoolean(A)?"lowercase":"normal";break;case"w:u":u(e,A,f);break;case"w:rFonts":p.parseFont(e,A,f);break;case"w:tblCellSpacing":f["border-spacing"]=o.parseSize(A,"w:w"),f["border-collapse"]="separate";break;case"w:bdr":f.border=n.parseBorder(e,A);break;case"w:vanish":c.getValBoolean(A)&&(f.display="none");break;case"w:webHidden":f.display="none";break;case"w:wordWrap":c.getValBoolean(A)&&(f["word-break"]="break-all");break;case"w:textAlignment":var B=c.getVal(A);"center"===B?f["vertical-align"]="middle":"auto"!==B&&(f["vertical-align"]=B);break;case"w:textDirection":g.parseTextDirection(A,f);break;case"w:bidi":c.getValBoolean(A,!0)&&console.warn("w:bidi is not supported.");break;case"w:em":v(c.getVal(A),f);break;case"w:w":var C=c.getValNumber(A);f.transform="scaleX(".concat(C/100,")"),f.display="inline-block";break;case"w:outline":f["text-shadow"]="-1px -1px 0 #AAA, 1px -1px 0 #AAA, -1px 1px 0 #AAA, 1px 1px 0 #AAA";break;case"w:shadown":case"w:imprint":c.getValBoolean(A,!0)&&(f["text-shadow"]="1px 1px 2px rgba(0, 0, 0, 0.6)");break;case"w14:shadow":var D=o.parseSize(A,"w14:blurRad",o.LengthUsage.Emu)||"2px",z="rgba(0, 0, 0, 0.6)",H=i.parseChildColor(e,A);H&&(z=H),f["text-shadow"]="1px 1px ".concat(D," ").concat(z);break;default:console.warn("parsePr Unknown tagName",S,A)}}}catch(e){s={error:e}}finally{try{m&&!m.done&&(x=y.return)&&x.call(y)}finally{if(s)throw s.error}}return f}}));
;/*!node_modules/office-viewer/lib/openxml/word/Bookmark.js*/
amis.define("fb3f8dd",(function(n,e,t,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function n(n){this.name=n}return n.fromXML=function(e,t){var o=t.getAttribute("w:name");return o?new n(o):(console.warn("Bookmark without name"),new n("unknown"))},n}();e.BookmarkStart=r}));
;/*!node_modules/office-viewer/lib/openxml/word/Break.js*/
amis.define("1f15f0a",(function(e,n,t,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(){this.type="textWrapping"}return e.fromXML=function(n,t){return new e},e}();n.Break=i}));
;/*!node_modules/office-viewer/lib/openxml/word/drawing/Blip.js*/
amis.define("f08c035",(function(e,t,n,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(){}return e.fromXML=function(t,n){var r=new e,u=n.getAttribute("r:embed")||"",i=t.getDocumentRels(u);return i&&(r.embled=i,r.src=t.loadImage(r.embled)),r},e}();t.Blip=u}));
;/*!node_modules/office-viewer/lib/openxml/word/drawing/BlipFill.js*/
amis.define("a2824a7",(function(e,i,n,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var l=e("f08c035"),r=function(){function e(){}return e.fromXML=function(i,n){var t=new e,r=null==n?void 0:n.getElementsByTagName("a:blip").item(0);return r&&(t.blip=l.Blip.fromXML(i,r)),t},e}();i.BlipFill=r}));
;/*!node_modules/office-viewer/lib/openxml/word/drawing/Transform.js*/
amis.define("a23c450",(function(e,t,a,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("b8eb51e"),i=function(){function e(){}return e.fromXML=function(t,a){var n=new e,i=a.getElementsByTagName("a:off").item(0);i&&(n.off={x:r.parseSize(i,"x",r.LengthUsage.Emu),y:r.parseSize(i,"y",r.LengthUsage.Emu)});var s=a.getElementsByTagName("a:ext").item(0);s&&(n.ext={cx:r.parseSize(s,"cx",r.LengthUsage.Emu),cy:r.parseSize(s,"cy",r.LengthUsage.Emu)});var g=a.getAttribute("rot");return g&&(n.rot=r.convertAngle(g)),n},e}();t.Transform=i}));
;/*!node_modules/office-viewer/lib/openxml/word/drawing/Geom.js*/
amis.define("ce016ed",(function(e,t,n,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(){}return e.fromXML=function(t,n,r){var u=new e;return u.type=n.getAttribute("prst"),u},e}();t.Geom=u}));
;/*!node_modules/office-viewer/lib/openxml/word/drawing/ShapeProperties.js*/
amis.define("680b62d",(function(e,a,r,o){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("8701f02"),t=e("a23c450"),n=e("b8eb51e"),l=e("ce016ed"),c=e("14cd5cc");function d(e){var a="solid";switch(e){case"dash":case"dashDot":case"lgDash":case"lgDashDot":case"lgDashDotDot":case"sysDash":case"sysDashDot":case"sysDashDotDot":a="dashed";break;case"dot":case"sysDot":a="dotted"}return a}function i(e,a,r){var o,t,l=n.parseSize(a,"w",n.LengthUsage.Emu);r["border-width"]=l,r["border-style"]="solid";try{for(var i=s.__values(a.children),f=i.next();!f.done;f=i.next()){var u=f.value,h=u.tagName;switch(h){case"a:solidFill":r["border-color"]=c.parseChildColor(e,u);break;case"a:noFill":r.border="none";break;case"a:round":r["border-radius"]="8%";break;case"a:prstDash":r["border-style"]=d(u.getAttribute("val"));break;default:console.warn("parseOutline: Unknown tag ",h,u)}}}catch(e){o={error:e}}finally{try{f&&!f.done&&(t=i.return)&&t.call(i)}finally{if(o)throw o.error}}}var f=function(){function e(){}return e.fromXML=function(a,r){var o,n,d=new e,f={};if(d.style=f,r)try{for(var u=s.__values(r.children),h=u.next();!h.done;h=u.next()){var b=h.value,y=b.tagName;switch(y){case"a:xfrm":d.xfrm=t.Transform.fromXML(a,b);break;case"a:prstGeom":d.prstGeom=l.Geom.fromXML(a,b,f);break;case"a:ln":i(a,b,f);break;case"a:noFill":break;case"a:solidFill":f["background-color"]=c.parseChildColor(a,b);break;default:console.warn("ShapePr: Unknown tag ",y,b)}}}catch(e){o={error:e}}finally{try{h&&!h.done&&(n=u.return)&&n.call(u)}finally{if(o)throw o.error}}return d},e}();a.ShapePr=f}));
;/*!node_modules/office-viewer/lib/openxml/word/drawing/Pic.js*/
amis.define("83a0146",(function(e,i,l,n){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var t=e("a2824a7"),r=e("680b62d"),a=function(){function e(){}return e.fromXML=function(i,l){var n=new e;return n.blipFill=t.BlipFill.fromXML(i,null==l?void 0:l.getElementsByTagName("pic:blipFill").item(0)),n.spPr=r.ShapePr.fromXML(i,null==l?void 0:l.getElementsByTagName("pic:spPr").item(0)),n},e}();i.Pic=a}));
;/*!node_modules/office-viewer/lib/openxml/word/Table.js*/
amis.define("1f7df3d",(function(e,t,i,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){this.properties={},this.tblGrid=[],this.trs=[]};t.Table=r}));
;/*!node_modules/office-viewer/lib/openxml/word/table/Tr.js*/
amis.define("7bdd7d2",(function(e,t,i,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){this.properties={},this.tcs=[]};t.Tr=r}));
;/*!node_modules/office-viewer/lib/openxml/word/table/Tc.js*/
amis.define("c52967e",(function(e,t,i,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){this.properties={},this.children=[]}return e.prototype.add=function(e){e&&this.children.push(e)},e}();t.Tc=r}));
;/*!node_modules/office-viewer/lib/parse/parseTc.js*/
amis.define("5e4f6e1",(function(e,r,a,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("8701f02"),i=e("c52967e"),o=e("354b058"),p=e("3e37c25"),s=e("dc5cbe5");r.parseTc=function(e,r,a,n){var c,d,l=new i.Tc;try{for(var f=t.__values(r.children),u=f.next();!u.done;u=f.next()){var v=u.value;switch(v.tagName){case"w:tcPr":l.properties=o.parseTcPr(e,v);break;case"w:p":l.add(p.Paragraph.fromXML(e,v));break;case"w:tbl":l.add(s.parseTable(e,v))}}}catch(e){c={error:e}}finally{try{u&&!u.done&&(d=f.return)&&d.call(f)}finally{if(c)throw c.error}}var w=n[a.index];if(l.properties.vMerge){if("restart"===l.properties.vMerge)l.properties.rowSpan=1,n[a.index]=l;else if(w){if(w.properties&&w.properties.rowSpan){w.properties.rowSpan=w.properties.rowSpan+1;var b=l.properties.gridSpan||1;return a.index+=b,null}console.warn("Tc.fromXML: continue but not found lastCol",a.index,l,n)}}else delete n[a.index];var x=l.properties.gridSpan||1;return a.index+=x,l}}));
;/*!node_modules/office-viewer/lib/parse/parseTablePr.js*/
amis.define("014c576",(function(e,a,t,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=e("8701f02"),o=e("f838841"),n=e("9c664ef"),s=e("31210bc"),c=e("e956c2e"),i=e("428d4e6"),b=e("b8eb51e"),d=e("354b058"),w=e("ddcc71b");function f(e,a){switch(o.getVal(e)){case"left":case"start":break;case"right":case"end":a.float="right"}}function u(e,a){var t=c.parseTblWidth(e);t&&(a["margin-left"]=t)}function p(e,a){var t=c.parseTblWidth(e);t&&(a.width=t)}function g(e){var a={},t=o.getValHex(e);return(o.getAttrBoolean(e,"firstRow",!1)||32&t)&&(a.firstRow=!0),(o.getAttrBoolean(e,"lastRow",!1)||64&t)&&(a.lastRow=!0),(o.getAttrBoolean(e,"firstColumn",!1)||128&t)&&(a.firstColumn=!0),(o.getAttrBoolean(e,"lastColumn",!1)||256&t)&&(a.lastColumn=!0),o.getAttrBoolean(e,"noHBand",!1)||512&t?a.noHBand=!0:a.noHBand=!1,o.getAttrBoolean(e,"noVBand",!1)||1024&t?a.noVBand=!0:a.noVBand=!1,a}function B(e,a,t){if(void 0===e.renderOptions.padding){var r=b.parseSize(a,"w:tblpX"),l=b.parseSize(a,"w:tblpY");t.top=l,t.left=r}}function k(e,a){"fixed"===e.getAttribute("w:type")&&(a["table-layout"]="fixed")}a.parseTablePr=function(e,a){var t,r,c={},b={},S={};c.tblLook={},c.cssStyle=b,c.tcCSSStyle=S;try{for(var y=l.__values(a.children),C=y.next();!C.done;C=y.next()){var h=C.value,v=h.tagName;switch(v){case"w:tblBorders":n.parseBorders(e,h,b),c.insideBorder=s.parseInsideBorders(e,h);break;case"w:tcBorders":n.parseBorders(e,h,b);break;case"w:tblInd":u(h,b);break;case"w:jc":f(h,b);break;case"w:tblCellMar":case"w:tcMar":w.parseCellMargin(h,S);break;case"w:tblStyle":c.pStyle=o.getVal(h);break;case"w:tblW":p(h,b);break;case"w:shd":b["background-color"]=i.parseShdColor(e,h);break;case"w:tblCaption":c.tblCaption=o.getVal(h);break;case"w:tblCellSpacing":d.parseTblCellSpacing(h,b);break;case"w:tblLayout":k(h,b);break;case"w:tblLook":c.tblLook=g(h);break;case"w:tblStyleRowBandSize":c.rowBandSize=o.getValNumber(h);break;case"w:tblStyleColBandSize":c.colBandSize=o.getValNumber(h);break;case"w:tblpPr":B(e,h,b);break;default:console.warn("parseTableProperties unknown tag",v,h)}}}catch(e){t={error:e}}finally{try{C&&!C.done&&(r=y.return)&&r.call(y)}finally{if(t)throw t.error}}return c}}));
;/*!node_modules/office-viewer/lib/parse/parseTrPr.js*/
amis.define("715786c",(function(e,a,r,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=e("8701f02"),n=e("f838841"),c=e("99eb4a0"),s=e("014c576"),i=e("354b058"),o=e("fabde11");a.parseTrPr=function(e,a){var r,t,b={},f={};try{for(var d=l.__values(a.children),g=d.next();!g.done;g=d.next()){var w=g.value,u=w.tagName;switch(u){case"w:hidden":n.getValBoolean(w)&&(b.display="none");break;case"w:trHeight":o.parseTrHeight(w,b);break;case"w:jc":b["text-align"]=c.jcToTextAlign(n.getVal(w));break;case"w:cantSplit":case"w:cnfStyle":break;case"w:tblPrEx":var p=s.parseTablePr(e,w);Object.assign(b,p.cssStyle);break;case"w:tblCellSpacing":i.parseTblCellSpacing(w,f);break;default:console.warn("Tr: Unknown tag ",u,w)}}}catch(e){r={error:e}}finally{try{g&&!g.done&&(t=d.return)&&t.call(d)}finally{if(r)throw r.error}}return{cssStyle:b}}}));
;/*!node_modules/office-viewer/lib/parse/parseSdt.js*/
amis.define("9876859",(function(e,t,a,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("8701f02");t.parseSdt=function(e,t){var a=e.getElementsByTagName("w:sdtContent").item(0);a&&t.push.apply(t,n.__spreadArray([],n.__read([].slice.call(a.children)),!1))}}));
;/*!node_modules/office-viewer/lib/parse/parseTr.js*/
amis.define("30f28f5",(function(e,r,a,s){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("8701f02"),c=e("7bdd7d2"),l=e("5e4f6e1"),n=e("014c576"),i=e("715786c"),d=e("9876859");r.parseTr=function(e,r,a){var s,o,p=new c.Tr,f={index:0},u=[].slice.call(r.children);try{for(var b=t.__values(u),w=b.next();!w.done;w=b.next()){var v=w.value,y=v.tagName;switch(y){case"w:tc":var _=l.parseTc(e,v,f,a);_&&p.tcs.push(_);break;case"w:trPr":p.properties=i.parseTrPr(e,v);break;case"w:tblPrEx":var h=n.parseTablePr(e,v);Object.assign(p.properties.cssStyle||{},h.cssStyle);break;case"w:customXml":u.push.apply(u,t.__spreadArray([],t.__read([].slice.call(v.children)),!1));break;case"w:sdt":d.parseSdt(v,u);break;default:console.warn("Tr: Unknown tag ",y,v)}}}catch(e){s={error:e}}finally{try{w&&!w.done&&(o=b.return)&&o.call(b)}finally{if(s)throw s.error}}return p}}));
;/*!node_modules/office-viewer/lib/parse/parseTable.js*/
amis.define("dc5cbe5",(function(e,r,a,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("8701f02"),n=e("1f7df3d"),c=e("30f28f5"),s=e("014c576"),i=e("b8eb51e"),o=e("9876859");function d(e){var r,a,l=[],n=e.getElementsByTagName("w:gridCol");try{for(var c=t.__values(n),s=c.next();!s.done;s=c.next()){var o=s.value,d=i.parseSize(o,"w:w");l.push({w:d})}}catch(e){r={error:e}}finally{try{s&&!s.done&&(a=c.return)&&a.call(c)}finally{if(r)throw r.error}}return l}r.parseTable=function(e,r){var a,l,i=new n.Table,f={},u=[].slice.call(r.children);try{for(var b=t.__values(r.children),w=b.next();!w.done;w=b.next()){var p=w.value,v=p.tagName;switch(v){case"w:tblPr":i.properties=s.parseTablePr(e,p);break;case"w:tr":i.trs.push(c.parseTr(e,p,f));break;case"w:tblGrid":i.tblGrid=d(p);break;case"w:customXml":u.push.apply(u,t.__spreadArray([],t.__read([].slice.call(p.children)),!1));break;case"w:sdt":o.parseSdt(p,u);break;default:console.warn("Table.fromXML unknown tag",v,p)}}}catch(e){a={error:e}}finally{try{w&&!w.done&&(l=b.return)&&l.call(b)}finally{if(a)throw a.error}}return i}}));
;/*!node_modules/office-viewer/lib/openxml/word/wps/WPS.js*/
amis.define("a12f91f",(function(e,r,a,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("8701f02"),o=e("3e37c25"),l=e("680b62d"),c=e("dc5cbe5"),i=e("b8eb51e"),s=e("14cd5cc");function f(e,r){var a,t;try{for(var o=n.__values(e.attributes),l=o.next();!l.done;l=o.next()){var c=l.value,s=c.name,f=c.value;switch(s){case"numCol":r["column-count"]=f;break;case"vert":switch(f){case"vert":r["writing-mode"]="vertical-rl",r["text-orientation"]="sideways";break;case"vert270":case"eaVert":r["writing-mode"]="vertical-rl",r["text-orientation"]="mixed"}break;case"rot":var u=i.convertAngle(f);u&&(r.transform="rotate(".concat(u,"deg)"))}}}catch(e){a={error:e}}finally{try{l&&!l.done&&(t=o.return)&&t.call(o)}finally{if(a)throw a.error}}}function u(e,r,a){var t,o;try{for(var l=n.__values(r.children),c=l.next();!c.done;c=l.next()){var i=c.value;if("a:fillRef"===i.tagName)a["background-color"]=s.parseChildColor(e,i)}}catch(e){t={error:e}}finally{try{c&&!c.done&&(o=l.return)&&o.call(l)}finally{if(t)throw t.error}}}var v=function(){function e(){this.style={}}return e.fromXML=function(r,a){var t,i,s,v,d=new e;d.txbxContent=[];try{for(var b=n.__values(a.children),w=b.next();!w.done;w=b.next()){var y=w.value,h=y.tagName;switch(h){case"wps:cNvSpPr":break;case"wps:spPr":d.spPr=l.ShapePr.fromXML(r,y);break;case"wps:txbx":var x=y.firstElementChild;if(x)try{for(var p=(s=void 0,n.__values(x.children)),m=p.next();!m.done;m=p.next()){var k=m.value;switch(k.tagName){case"w:p":d.txbxContent.push(o.Paragraph.fromXML(r,k));break;case"w:tbl":d.txbxContent.push(c.parseTable(r,k))}}}catch(e){s={error:e}}finally{try{m&&!m.done&&(v=p.return)&&v.call(p)}finally{if(s)throw s.error}}else console.warn("unknown wps:txbx",y);break;case"wps:style":u(r,y,d.style);break;case"wps:bodyPr":f(y,d.style);break;default:console.warn("WPS: Unknown tag ",h,y)}}}catch(e){t={error:e}}finally{try{w&&!w.done&&(i=b.return)&&i.call(b)}finally{if(t)throw t.error}}return d},e}();r.WPS=v}));
;/*!node_modules/office-viewer/lib/openxml/word/drawing/Drawing.js*/
amis.define("dc63411",(function(e,t,a,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r=e("8701f02"),o=e("b8eb51e"),s=e("f838841"),p=e("83a0146"),l=e("a12f91f");t.Position=void 0,(n=t.Position||(t.Position={})).inline="inline",n.anchor="anchor";var c=function(){function e(){this.position=t.Position.inline}return e.fromXML=function(a,i){var n,c,u,h=new e,f={};h.containerStyle=f;var g=i.firstElementChild;if(g){if("wp:anchor"===g.tagName){h.position=t.Position.anchor,h.anchor=function(e){return{simplePos:s.getAttrBoolean(e,"simplePos",!1),hidden:s.getAttrBoolean(e,"hidden",!1),behindDoc:s.getAttrBoolean(e,"behindDoc",!1)}}(g);var m=s.getAttrNumber(g,"relativeHeight",1);f["z-index"]=m}try{for(var w=r.__values(g.children),d=w.next();!d.done;d=w.next()){var v=d.value,b=v.tagName;switch(b){case"wp:simplePos":(null===(u=h.anchor)||void 0===u?void 0:u.simplePos)&&(f.position="absolute",f.x=o.parseSize(v,"x",o.LengthUsage.Emu),f.y=o.parseSize(v,"y",o.LengthUsage.Emu));break;case"wp:positionH":var P=v.getAttribute("relativeFrom");if("column"===P||"page"===P){if(L=v.firstElementChild)"wp:posOffset"===(E=L.tagName)?(f.position="absolute",f.left=o.convertLength(L.innerHTML,o.LengthUsage.Emu)):console.warn("unsupport positionType",E)}else console.warn("unsupport relativeFrom",P);break;case"wp:positionV":var L,E,y=v.getAttribute("relativeFrom");if("paragraph"===y||"page"===y){if("paragraph"===y&&(h.relativeFromParagraph=!0),L=v.firstElementChild)"wp:posOffset"===(E=L.tagName)?(f.position="absolute",f.top=o.convertLength(L.innerHTML,o.LengthUsage.Emu)):console.warn("unsupport positionType",E)}else console.warn("unsupport relativeFrom",y);break;case"wp:docPr":case"wp:cNvGraphicFramePr":case"wp:effectExtent":case"wp:wrapNone":case"wp14:sizeRelH":case"wp14:sizeRelV":break;case"a:graphic":var k=v.firstElementChild,x=null==k?void 0:k.firstElementChild;if(x)switch(x.tagName){case"pic:pic":h.pic=p.Pic.fromXML(a,x);break;case"wps:wsp":h.wps=l.WPS.fromXML(a,x);break;default:console.warn("unknown graphicData child tag",x)}break;case"wp:extent":f.width=o.parseSize(v,"cx",o.LengthUsage.Emu),f.height=o.parseSize(v,"cy",o.LengthUsage.Emu);break;default:console.warn("drawing unknown tag",b)}}}catch(e){n={error:e}}finally{try{d&&!d.done&&(c=w.return)&&c.call(w)}finally{if(n)throw n.error}}}return h},e}();t.Drawing=c}));
;/*!node_modules/office-viewer/lib/openxml/word/InstrText.js*/
amis.define("da0e9b2",(function(e,t,i,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var s=function(e){this.text=e};t.InstrText=s}));
;/*!node_modules/office-viewer/lib/openxml/word/NoBreakHyphen.js*/
amis.define("db15eab",(function(e,n,i,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=function(){};n.NoBreakHyphen=a}));
;/*!node_modules/office-viewer/lib/openxml/word/Pict.js*/
amis.define("ac43ed0",(function(e,t,n,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){}return e.fromXML=function(t,n){var i=new e,r=n.getElementsByTagName("v:imagedata").item(0);if(r){var a=r.getAttribute("r:id")||"",u=t.getDocumentRels(a);u&&(i.src=t.loadImage(u))}return i},e}();t.Pict=r}));
;/*!node_modules/office-viewer/lib/openxml/word/Ruby.js*/
amis.define("4b98400",(function(r,e,n,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r("8701f02"),o=r("1050750"),u=function(){function r(){}return r.fromXML=function(e,n){var a,u,l=new r;l.children=[];try{for(var c=t.__values(n.children),f=c.next();!f.done;f=c.next()){var i=f.value,s=i.tagName;if("w:r"===s){var y=o.Run.fromXML(e,i);y&&l.children.push(y)}else console.warn("parse Ruby: Unknown key",s,i)}}catch(r){a={error:r}}finally{try{f&&!f.done&&(u=c.return)&&u.call(c)}finally{if(a)throw a.error}}return l},r}();!function(r){function e(){return null!==r&&r.apply(this,arguments)||this}t.__extends(e,r)}(u);var l=function(){function r(){}return r.fromXML=function(e,n){var a,o,l=new r;try{for(var c=t.__values(n.children),f=c.next();!f.done;f=c.next()){var i=f.value,s=i.tagName;switch(s){case"w:rubyPr":break;case"w:rt":l.rt=u.fromXML(e,i);break;case"w:rubyBase":l.rubyBase=u.fromXML(e,i);break;default:console.warn("parse Ruby: Unknown key",s,i)}}}catch(r){a={error:r}}finally{try{f&&!f.done&&(o=c.return)&&o.call(c)}finally{if(a)throw a.error}}return l},r}();e.Ruby=l}));
;/*!node_modules/office-viewer/lib/openxml/word/SoftHyphen.js*/
amis.define("6cc74f5",(function(e,n,t,c){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var f=function(){};n.SoftHyphen=f}));
;/*!node_modules/office-viewer/lib/openxml/word/Sym.js*/
amis.define("cca189c",(function(t,e,n,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var c=function(){function t(){}return t.parseXML=function(e){var n=new t;return n.font=e.getAttribute("w:font")||"",n.char=e.getAttribute("w:char")||"",n},t}();e.Sym=c}));
;/*!node_modules/office-viewer/lib/openxml/word/Tab.js*/
amis.define("5cc64d3",(function(e,t,r,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("f838841"),u=e("b8eb51e"),a=function(){function e(){}return e.fromXML=function(t,r){var n=new e;return n.pos=u.parseSize(r,"w:pos"),n.type=i.getVal(r),n.leader=r.getAttribute("w:leader"),n},e}();t.Tab=a}));
;/*!node_modules/office-viewer/lib/openxml/word/Run.js*/
amis.define("1050750",(function(e,a,r,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("8701f02"),d=e("f838841"),i=e("2807318"),c=e("1f15f0a"),s=e("dc63411"),l=e("da0e9b2"),o=e("db15eab"),f=e("ac43ed0"),h=e("4b98400"),w=e("6cc74f5"),b=e("cca189c"),u=e("5cc64d3"),p=function(e){this.preserveSpace=!1,this.text=String(e)},y=function(){function e(){this.properties={},this.children=[]}return e.prototype.addChild=function(e){e&&this.children.push(e)},e.parseRunPr=function(e,a){var r,t=i.parsePr(e,a),n=a.getElementsByTagName("w:rStyle").item(0);return n&&(r=d.getVal(n)),{cssStyle:t,rStyle:r}},e.fromXML=function(a,r){var t,d,i=new e;try{for(var y=n.__values(r.children),k=y.next();!k.done;k=y.next()){var m=k.value,C=m.tagName;switch(C){case"w:t":var g=m.textContent||"",v=new p(g);i.addChild(v);break;case"w:rPr":i.properties=e.parseRunPr(a,m);break;case"w:br":case"w:cr":i.addChild(c.Break.fromXML(a,m));break;case"w:drawing":i.addChild(s.Drawing.fromXML(a,m));break;case"w:tab":i.addChild(u.Tab.fromXML(a,m));break;case"w:fldChar":i.fldChar=m.getAttribute("w:fldCharType");break;case"w:instrText":i.addChild(new l.InstrText(m.textContent||""));break;case"w:lastRenderedPageBreak":break;case"w:pict":i.addChild(f.Pict.fromXML(a,m));break;case"w:ruby":i.addChild(h.Ruby.fromXML(a,m));break;case"w:sym":i.addChild(b.Sym.parseXML(m));break;case"mc:AlternateContent":var M=m.getElementsByTagName("w:drawing").item(0);M&&i.addChild(s.Drawing.fromXML(a,M));break;case"w:softHyphen":i.addChild(new w.SoftHyphen);break;case"w:noBreakHyphen":i.addChild(new o.NoBreakHyphen);break;default:console.warn("parse Run: Unknown key",C,m)}}}catch(e){t={error:e}}finally{try{k&&!k.done&&(d=y.return)&&d.call(y)}finally{if(t)throw t.error}}return i},e}();a.Run=y,a.Text=p}));
;/*!node_modules/office-viewer/lib/openxml/word/Hyperlink.js*/
amis.define("7d2ef84",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=e("8701f02"),o=e("1050750"),a=function(){function e(){this.children=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.fromXML=function(r,t){var n,a,l=new e,u=t.getAttribute("r:id");if(u){var c=r.getDocumentRels(u);c&&(l.relation=c)}var f=t.getAttribute("w:anchor");f&&(l.anchor=f);var d=t.getAttribute("w:tooltip");d&&(l.tooltip=d);try{for(var h=i.__values(t.children),s=h.next();!s.done;s=h.next()){var v=s.value,p=v.tagName;if("w:r"===p)l.addChild(o.Run.fromXML(r,v));else console.warn("parse Hyperlink: Unknown key",p,v)}}catch(e){n={error:e}}finally{try{s&&!s.done&&(a=h.return)&&a.call(h)}finally{if(n)throw n.error}}return l},e}();r.Hyperlink=a}));
;/*!node_modules/office-viewer/lib/openxml/word/numbering/NumberProperties.js*/
amis.define("452b003",(function(e,t,n,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("f838841"),u=function(){function e(){}return e.fromXML=function(t,n){var r=new e,u=n.getElementsByTagName("w:ilvl").item(0);u&&(r.ilvl=i.getVal(u));var a=n.getElementsByTagName("w:numId").item(0);return a&&(r.numId=i.getVal(a)),r},e}();t.NumberPr=u}));
;/*!node_modules/office-viewer/lib/openxml/word/InlineText.js*/
amis.define("50c1571",(function(r,e,a,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r("8701f02"),t=r("fb3f8dd"),d=r("7d2ef84"),i=r("1050750"),c=function(){function r(){this.children=[]}return r.prototype.addChild=function(r){this.children.push(r)},r.fromXML=function(e,a){var n,c,l=new r;try{for(var f=o.__values(a.children),s=f.next();!s.done;s=f.next()){var u=s.value,h=u.tagName;switch(h){case"w:r":l.addChild(i.Run.fromXML(e,u));break;case"w:hyperlink":l.addChild(d.Hyperlink.fromXML(e,u));break;case"w:bookmarkStart":l.addChild(t.BookmarkStart.fromXML(e,u));case"w:bookmarkEnd":case"w:proofErr":case"w:noProof":case"w:smartTagPr":case"w:del":break;default:console.warn("parse Inline: Unknown key",h,u)}}}catch(r){n={error:r}}finally{try{s&&!s.done&&(c=f.return)&&c.call(f)}finally{if(n)throw n.error}}return l},r}();e.InlineText=c}));
;/*!node_modules/office-viewer/lib/openxml/word/FldSimple.js*/
amis.define("636b505",(function(e,n,t,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e("50c1571"),u=function(){function e(){}return e.fromXML=function(n,t){var i=new e;return i.inlineText=r.InlineText.fromXML(n,t),i.instr=t.getAttribute("w:instr")||"",i},e}();n.FldSimple=u}));
;/*!node_modules/office-viewer/lib/openxml/math/OMath.js*/
amis.define("51af8f7",(function(e,n,t,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var f=function(){function e(){}return e.fromXML=function(n,t){var r=new e;return r.element=t,r},e}();n.OMath=f}));
;/*!node_modules/office-viewer/lib/openxml/word/Paragraph.js*/
amis.define("3e37c25",(function(e,a,r,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=e("8701f02"),o=e("f838841"),n=e("2807318"),s=e("fb3f8dd"),c=e("7d2ef84"),i=e("452b003"),d=e("1050750"),m=e("5cc64d3"),f=e("636b505"),p=e("51af8f7"),u=e("9876859");var h=function(){function e(){this.properties={},this.children=[],this.fldSimples=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.parseParagraphPr=function(e,a){var r,t,s,c,d=n.parsePr(e,a),f=a.getElementsByTagName("w:pStyle").item(0);f&&(s=o.getVal(f));var p=a.getElementsByTagName("w:numPr").item(0);p&&(c=i.NumberPr.fromXML(e,p));var u=[],h=a.getElementsByTagName("w:tab");try{for(var w=l.__values(h),y=w.next();!y.done;y=w.next()){var v=y.value;u.push(m.Tab.fromXML(e,v))}}catch(e){r={error:e}}finally{try{y&&!y.done&&(t=w.return)&&t.call(w)}finally{if(r)throw r.error}}var b=function(e){var a=e.getElementsByTagName("w:autoSpaceDE").item(0),r=e.getElementsByTagName("w:autoSpaceDN").item(0);return!!a||!!r}(a);return{cssStyle:d,pStyle:s,numPr:c,tabs:u,autoSpace:b}},e.fromXML=function(a,r){var t,o,n=new e;n.fldSimples=[],n.paraId=r.getAttribute("w14:paraId")||"";var i=[].slice.call(r.children);try{for(var m=l.__values(i),h=m.next();!h.done;h=m.next()){var w=h.value,y=w.tagName;switch(y){case"w:pPr":n.properties=e.parseParagraphPr(a,w);break;case"w:r":n.addChild(d.Run.fromXML(a,w));break;case"w:smartTag":case"w:customXml":i.push.apply(i,l.__spreadArray([],l.__read([].slice.call(w.children)),!1));break;case"w:hyperlink":n.addChild(c.Hyperlink.fromXML(a,w));break;case"w:bookmarkStart":n.addChild(s.BookmarkStart.fromXML(a,w));case"w:bookmarkEnd":case"w:proofErr":case"w:noProof":case"w:del":case"w:moveTo":case"w:moveFrom":break;case"w:fldSimple":n.fldSimples.push(f.FldSimple.fromXML(a,w));break;case"m:oMathPara":case"m:oMath":n.addChild(p.OMath.fromXML(a,w));break;case"w:sdt":u.parseSdt(w,i);break;default:console.warn("parse Paragraph: Unknown key",y,w)}}}catch(e){t={error:e}}finally{try{h&&!h.done&&(o=m.return)&&o.call(m)}finally{if(t)throw t.error}}return n},e}();a.Paragraph=h}));
;/*!node_modules/office-viewer/lib/openxml/Style.js*/
amis.define("975b67c",(function(e,r,a,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("8701f02"),l=e("354b058"),s=e("f838841"),c=e("3e37c25"),i=e("1050750"),u=e("014c576"),w=e("715786c");function P(e,r){var a,t,s={};try{for(var P=n.__values(r.children),y=P.next();!y.done;y=P.next()){var o=y.value;switch(o.tagName){case"w:rPr":s.rPr=i.Run.parseRunPr(e,o);break;case"w:pPr":s.pPr=c.Paragraph.parseParagraphPr(e,o);break;case"w:tblPr":s.tblPr=u.parseTablePr(e,o);break;case"w:tcPr":s.tcPr=l.parseTcPr(e,o);break;case"w:trPr":s.trPr=w.parseTrPr(e,o)}}}catch(e){a={error:e}}finally{try{y&&!y.done&&(t=P.return)&&t.call(P)}finally{if(a)throw a.error}}return s}function y(e,r){var a,t,l={};l.id=r.getAttribute("w:styleId")||"",l.type=r.getAttribute("w:type"),l.tblStylePr={},Object.assign(l,P(e,r));try{for(var c=n.__values(r.children),i=c.next();!i.done;i=c.next()){var u=i.value,w=u.tagName;switch(w){case"w:name":l.name=s.getVal(u);break;case"w:basedOn":l.basedOn=s.getVal(u);break;case"w:rPr":case"w:pPr":case"w:tblPr":case"w:tcPr":case"w:trPr":case"w:next":case"w:link":case"w:unhideWhenUsed":case"w:qFormat":case"w:rsid":case"w:uiPriority":case"w:semiHidden":case"w:autoRedefine":break;case"w:tblStylePr":var y=u.getAttribute("w:type");l.tblStylePr[y]=P(e,u);break;default:console.warn("parseStyle Unknown tag",w,u)}}}catch(e){a={error:e}}finally{try{i&&!i.done&&(t=c.return)&&t.call(c)}finally{if(a)throw a.error}}return l}r.parseStyles=function(e,r){var a,t,l={styleMap:{}},s=Array.from(r.getElementsByTagName("w:style"));try{for(var u=n.__values(s),w=u.next();!w.done;w=u.next()){var P=y(e,w.value);P.id&&(l.styleMap[P.id]=P)}}catch(e){a={error:e}}finally{try{w&&!w.done&&(t=u.return)&&t.call(u)}finally{if(a)throw a.error}}return l.defaultStyle=function(e,r){var a={};if(!r)return a;var t=r.getElementsByTagName("w:rPrDefault").item(0);if(t){var n=t.getElementsByTagName("w:rPr").item(0);n&&(a.rPr=i.Run.parseRunPr(e,n))}var l=r.getElementsByTagName("w:pPrDefault").item(0);if(l){var s=l.getElementsByTagName("w:pPr").item(0);s&&(a.pPr=c.Paragraph.parseParagraphPr(e,s))}return a}(e,r.getElementsByTagName("w:docDefaults").item(0)),l}}));
;/*!node_modules/office-viewer/lib/openxml/Theme.js*/
amis.define("08d6bdd",(function(e,t,r,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("8701f02"),c=e("b8eb51e"),l=e("f838841"),o=function(){this.colors={}};function s(e){var t={};return e&&(t.clrScheme=function(e){var t,r,a=new o;if(!e)return a;a.name=e.getAttribute("name")||"";try{for(var s=n.__values(e.children),m=s.next();!m.done;m=s.next()){var i=m.value,g=i.tagName.replace("a:",""),f=i.firstElementChild;if(f){var u=f.nodeName.replace("a:","");if("sysClr"===u)a.colors[g]=f.getAttribute("lastClr")||"";else if("srgbClr"===u)a.colors[g]="#"+f.getAttribute("val")||"";else if("scrgbClr"===u){var h=256*l.getAttrPercentage(i,"r"),v=256*l.getAttrPercentage(i,"g"),b=256*l.getAttrPercentage(i,"b");a.colors[g]="rgb(".concat(h,", ").concat(v,", ").concat(b,")")}else if("hslClr"===u){var d=c.convertAngle(i.getAttribute("hue")),y=100*l.getAttrPercentage(i,"sat"),A=100*l.getAttrPercentage(i,"lum");a.colors[g]="hsl(".concat(d,", ").concat(y,"%, ").concat(A,"%)")}else"prstClr"===u?a.colors[g]=l.getVal(i):console.error("unknown clr name",u)}}}catch(e){t={error:e}}finally{try{m&&!m.done&&(r=s.return)&&r.call(s)}finally{if(t)throw t.error}}return a}(e.getElementsByTagName("a:clrScheme").item(0)),t.fontScheme=(e.getElementsByTagName("a:fontScheme").item(0),{}),t.fmtScheme=(e.getElementsByTagName("a:fmtScheme").item(0),{})),t}t.parseTheme=function(e){var t={};return t.themeElements=s(e.getElementsByTagName("a:themeElements").item(0)),t}}));
;/*!node_modules/office-viewer/lib/util/dom.js*/
amis.define("8d43ec5",(function(e,n,a,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e("8701f02");n.addClassName=function(e,n){e&&n&&e.classList.add(n)},n.addClassNames=function(e,n){var a;e&&n&&(a=e.classList).add.apply(a,r.__spreadArray([],r.__read(n),!1))},n.appendChild=function(e,n){e&&n&&e.appendChild(n)},n.applyStyle=function(e,n){if(n)for(var a in n){var t=n[a];null!=t&&""!==t&&e.style.setProperty(a,String(t))}},n.createElement=function(e){return document.createElement(e)},n.styleToText=function(e){void 0===e&&(e={});var n="";for(var a in e){var t=e[a];null!=t&&""!==t&&(n+="".concat(a,": ").concat(t,";\n"))}return n}}));
;/*!node_modules/office-viewer/lib/render/renderBr.js*/
amis.define("99de4a3",(function(e,r,n,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var c=e("8d43ec5");r.renderBr=function(e){return c.createElement("br")}}));
;/*!node_modules/office-viewer/lib/render/renderStyle.js*/
amis.define("43be307",(function(n,t,c,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=n("8701f02"),o=n("8d43ec5");function r(n,t,c){var a="",e=c.tblPr,r=c.tcPr;if(e){var l=o.styleToText(e.cssStyle),s=o.styleToText(e.tcCSSStyle);if(a+="\n .".concat(n," .").concat(t," {\n  border-collapse: collapse;\n  ").concat(l,"\n }\n\n .").concat(n," .").concat(t," > tbody > tr > td {\n  ").concat(s,"\n }\n "),e.insideBorder){var d=e.insideBorder;d.H&&(a+="\n      .".concat(n," .").concat(t," > tbody > tr > td {\n        border-top: ").concat(d.H,";\n      }")),d.V&&(a+="\n      .".concat(n," .").concat(t," > tbody > tr > td {\n        border-left: ").concat(d.V,";\n      }"))}}if(r){var i=o.styleToText(r.cssStyle);a+="\n    .".concat(n," .").concat(t," > tbody > tr > td {\n     ").concat(i,"\n    }\n    ")}return a}function l(n,t,c,a){var e,r,l,s,d,i,y="",b=o.styleToText(null===(e=a.trPr)||void 0===e?void 0:e.cssStyle),v="";switch(c){case"firstCol":v="enable-firstColumn";break;case"lastCol":v="enable-lastColumn";break;case"firstRow":v="enable-firstRow";break;case"lastRow":v="enable-lastRow";break;case"band1Horz":case"band2Horz":v="enable-hBand";break;case"band1Vert":case"band2Vert":v="enable-vBand"}b&&(y+="\n    ".concat(n,".").concat(v," > tbody > tr.").concat(c,"{\n       ").concat(b,"\n    }\n    "));var f=o.styleToText(null===(r=a.tcPr)||void 0===r?void 0:r.cssStyle);if(f&&(y+="\n    ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n       ").concat(f,"\n    }\n    "),null===(l=a.tcPr)||void 0===l?void 0:l.insideBorder)){var u=null===(s=a.tcPr)||void 0===s?void 0:s.insideBorder;u.H&&(y+="\n          ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n            border-top: ").concat(u.H,";\n          }")),u.V&&("none"===u.V?y+="\n          ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n            border-left: none;\n            border-right: none;\n          }"):y+="\n          ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n            border-left: ").concat(u.V,";\n          }"))}var T=o.styleToText(null===(d=a.pPr)||void 0===d?void 0:d.cssStyle);T&&(y+="\n    ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," > .").concat(t,"-p {\n       ").concat(T,"\n    }\n    "));var p=o.styleToText(null===(i=a.rPr)||void 0===i?void 0:i.cssStyle);return p&&(y+="\n    ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," > .").concat(t,"-p > .").concat(t,"-r {\n       ").concat(p,"\n    }\n    ")),y}var s=new Set(["wholeTable","band1Horz","band2Horz","band1Vert","band2Vert","firstCol","firstRow","lastCol","lastRow","neCell","nwCell","seCell","swCell"]);function d(n,t,c){var a,o;if(!c)return"";var r="",d=".".concat(n," .").concat(t);try{for(var i=e.__values(s),y=i.next();!y.done;y=i.next()){var b=y.value;if(b in c)r+=l(d,n,b,c[b])}}catch(n){a={error:n}}finally{try{y&&!y.done&&(o=i.return)&&o.call(i)}finally{if(a)throw a.error}}return r}t.generateTableStyle=r,t.renderStyle=function(n){var t=o.createElement("style"),c=function(n){var t=n.styles.defaultStyle,c="";(null==t?void 0:t.pPr)&&(c=o.styleToText(t.pPr.cssStyle));var a="";(null==t?void 0:t.rPr)&&(a=o.styleToText(t.rPr.cssStyle));var e=n.getClassPrefix();return"\n  .".concat(n.wrapClassName," {\n\n  }\n\n  .").concat(n.wrapClassName," > article > section {\n    background: white;\n  }\n\n  /** docDefaults **/\n\n  .").concat(e," p {\n    margin: 0;\n    padding: 0;\n    line-height: 1.5;\n  }\n\n  .").concat(e," table {\n    border-spacing: 0;\n  }\n\n  .").concat(e," .").concat(e,"-p {\n    ").concat(c,"\n  }\n\n  .").concat(e," .").concat(e,"-r {\n    white-space: pre-wrap;\n    overflow-wrap: break-word;\n    ").concat(a,"\n  }\n  ")}(n),a=function(n){var t=n.styles.styleMap,c=n.getClassPrefix(),a="";for(var e in t){var l=n.getStyleIdDisplayName(e),s=t[e],i=s.pPr,y="";if(i){var b=o.styleToText(i.cssStyle);y="\n      .".concat(c," .").concat(l," {\n        ").concat(b,"\n      }\n      ")}var v="";if(s.rPr){var f=o.styleToText(s.rPr.cssStyle);v="\n      .".concat(c," .").concat(l," > .").concat(c,"-r {\n        ").concat(f,"\n      }\n      ")}var u=r(c,l,s),T=d(c,l,s.tblStylePr);a+="\n    ".concat(y,"\n    ").concat(v,"\n    ").concat(u,"\n    ").concat(T,"\n    ")}return a}(n);return t.textContent="\n  ".concat(c,"\n\n  ").concat(a,"\n  "),t}}));
;/*!node_modules/office-viewer/lib/render/setElementStyle.js*/
amis.define("3ce3f91",(function(e,t,s,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("8d43ec5");t.setElementStyle=function(e,t,s){s&&(s.cssStyle&&a.applyStyle(t,s.cssStyle),s.pStyle&&a.addClassNames(t,e.getStyleClassName(s.pStyle)),s.rStyle&&a.addClassNames(t,e.getStyleClassName(s.rStyle)))}}));
;/*!node_modules/office-viewer/lib/render/renderTable.js*/
amis.define("a31f93c",(function(e,a,t,l){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=e("8701f02"),n=e("3e37c25"),d=e("1f7df3d"),s=e("8d43ec5"),o=e("a4504ab"),i=e("43be307"),c=e("3ce3f91");function p(e,a,t,l,r,n,d){0===e&&0===a&&r.classList.add("nwCell"),0===e&&a===l-1&&r.classList.add("neCell"),e===t-1&&0===a&&r.classList.add("swCell"),e===t-1&&a===l-1&&r.classList.add("seCell"),0===e&&r.classList.add("firstRow"),e===t-1&&r.classList.add("lastRow"),0===a&&r.classList.add("firstCol"),a===l-1&&r.classList.add("lastCol"),f(e+1)&&r.classList.add("band1Horz"),f(e+1)||r.classList.add("band2Horz"),f(a+1)&&r.classList.add("band1Vert"),f(a+1)||r.classList.add("band2Vert")}function f(e,a){return!(e%2)}a.default=function e(a,t){var l,f,v,u,y,b,C=document.createElement("table"),h=t.properties;if(h.tblCaption){var L=document.createElement("caption");L.textContent=h.tblCaption,C.appendChild(L)}if(h.tblLook)for(var m in h.tblLook)"noHBand"===m?h.tblLook[m]||s.addClassName(C,"enable-hBand"):"noVBand"===m?h.tblLook[m]||s.addClassName(C,"enable-vBand"):h.tblLook[m]&&s.addClassName(C,"enable-"+m);c.setElementStyle(a,C,h);var S=a.genClassName();C.classList.add(S),a.appendStyle(i.generateTableStyle(a.getClassPrefix(),S,{tblPr:h}));var w=document.createElement("tbody");C.appendChild(w);var g=0;try{for(var x=r.__values(t.trs),_=x.next();!_.done;_=x.next()){var k=_.value,E=document.createElement("tr");w.appendChild(E);var B=0;try{for(var z=(v=void 0,r.__values(k.tcs)),N=z.next();!N.done;N=z.next()){var P=N.value,H=document.createElement("td");E.appendChild(H),p(g,B,t.trs.length,k.tcs.length,H,h.rowBandSize,h.colBandSize),k.properties.tcStyle&&s.applyStyle(H,k.properties.tcStyle);var V=P.properties;c.setElementStyle(a,H,V),V.gridSpan&&(H.colSpan=V.gridSpan),V.rowSpan&&(H.rowSpan=V.rowSpan);var M=!0;V.hideMark&&(M=!1);try{for(var R=(y=void 0,r.__values(P.children)),T=R.next();!T.done;T=R.next()){var j=T.value;if(j instanceof n.Paragraph){var O=o.default(a,j,M);s.appendChild(H,O)}else j instanceof d.Table?(M=!1,s.appendChild(H,e(a,j))):console.warn("unknown child type: "+j)}}catch(e){y={error:e}}finally{try{T&&!T.done&&(b=R.return)&&b.call(R)}finally{if(y)throw y.error}}V.rowSpan?B+=V.rowSpan:B++}}catch(e){v={error:e}}finally{try{N&&!N.done&&(u=z.return)&&u.call(z)}finally{if(v)throw v.error}}g++}}catch(e){l={error:e}}finally{try{_&&!_.done&&(f=x.return)&&f.call(x)}finally{if(l)throw l.error}}return C}}));
;/*!node_modules/office-viewer/lib/render/renderDrawing.js*/
amis.define("a72af5f",(function(e,t,r,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("8701f02"),n=e("3e37c25"),i=e("8d43ec5"),o=e("a4504ab"),f=e("a31f93c"),c=e("1f7df3d");t.renderDrawing=function(e,t){var r,l,s=document.createElement("div");if("inline"===t.position?s.style.display="inline-block":t.position,t.pic&&i.appendChild(s,function(e,t,r){var l,a,n=null===(l=e.blipFill)||void 0===l?void 0:l.blip;if(n&&n.src){var i=document.createElement("img");i.style.position="relative",i.src=n.src;var o=null===(a=e.spPr)||void 0===a?void 0:a.xfrm;if(o){var f=o.off;f&&(i.style.left=f.x,i.style.top=f.y);var c=o.ext;c&&(i.style.width=c.cx,i.style.height=c.cy),o.rot&&(i.style.transform="rotate(".concat(o.rot,"deg)"))}return i}return null}(t.pic)),i.applyStyle(s,t.containerStyle),t.wps){var d=t.wps,y=d.spPr;if(i.applyStyle(s,d.style),i.applyStyle(s,null==y?void 0:y.style),null==y?void 0:y.xfrm){var p=y.xfrm.ext;p&&(s.style.width=p.cx,s.style.height=p.cy),y.xfrm.rot&&(s.style.transform="rotate(".concat(y.xfrm.rot,"deg)"))}var v=d.txbxContent;try{for(var u=a.__values(v),x=u.next();!x.done;x=u.next()){var m=x.value;m instanceof n.Paragraph?i.appendChild(s,o.default(e,m)):m instanceof c.Table&&i.appendChild(s,f.default(e,m))}}catch(e){r={error:e}}finally{try{x&&!x.done&&(l=u.return)&&l.call(u)}finally{if(r)throw r.error}}}return s}}));
;/*!node_modules/office-viewer/lib/render/renderTab.js*/
amis.define("3598160",(function(e,t,n,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var d=e("8d43ec5");t.renderTab=function(e,t){var n=d.createElement("span");return n.style.display="inline-block",n.style.width=t.pos,n.innerHTML="&nbsp;","dot"===t.leader&&(n.style.borderBottom="1px dotted"),n}}));
;/*!node_modules/office-viewer/lib/render/renderPict.js*/
amis.define("3869e2c",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.renderPict=function(e,r){if(r.src){var t=document.createElement("img");return t.style.position="relative",t.src=r.src,t}return null}}));
;/*!node_modules/office-viewer/lib/render/renderRuby.js*/
amis.define("99a9ecd",(function(e,r,n,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("8701f02"),l=e("8d43ec5"),d=e("1bf9315");r.renderRuby=function(e,r){var n,a,i,c,f=l.createElement("ruby");if(r.rubyBase){try{for(var u=t.__values(r.rubyBase.children),o=u.next();!o.done;o=u.next()){var p=o.value;f.appendChild(d.default(e,p))}}catch(e){n={error:e}}finally{try{o&&!o.done&&(a=u.return)&&a.call(u)}finally{if(n)throw n.error}}if(r.rt){var v=l.createElement("rp");v.innerText="(",f.appendChild(v);var y=l.createElement("rt");try{for(var h=t.__values(r.rt.children),s=h.next();!s.done;s=h.next()){p=s.value;y.appendChild(d.default(e,p))}}catch(e){i={error:e}}finally{try{s&&!s.done&&(c=h.return)&&c.call(h)}finally{if(i)throw i.error}}f.appendChild(y);var b=l.createElement("rp");b.innerText=")",f.appendChild(b)}}return f}}));
;/*!node_modules/office-viewer/lib/render/renderHyperLink.js*/
amis.define("c81446a",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("8701f02"),l=e("8d43ec5"),i=e("1050750"),o=e("1bf9315");r.renderHyperLink=function(e,r,t){var a,f,c=l.createElement("a");if(r.relation){var d=r.relation;d&&"External"===d.targetMode&&(c.href=d.target,c.target="_blank")}r.anchor&&(c.href="#"+r.anchor),r.tooltip&&(c.title=r.tooltip);try{for(var u=n.__values(r.children),v=u.next();!v.done;v=u.next()){var h=v.value;if(h instanceof i.Run){var p=o.default(e,h,t);l.appendChild(c,p)}}}catch(e){a={error:e}}finally{try{v&&!v.done&&(f=u.return)&&f.call(u)}finally{if(a)throw a.error}}return c}}));
;/*!node_modules/office-viewer/lib/render/renderBookmark.js*/
amis.define("277aa0a",(function(e,r,a,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("8d43ec5");r.renderBookmarkStart=function(e,r){var a=r.name;if(a){var n=t.createElement("a");return n.name=a,n.id=a,n}return null}}));
;/*!node_modules/office-viewer/lib/render/renderInlineText.js*/
amis.define("813afa6",(function(e,a,r,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var f=e("8701f02"),t=e("8d43ec5"),i=e("1050750"),d=e("fb3f8dd"),l=e("7d2ef84"),o=e("1bf9315"),c=e("c81446a"),u=e("277aa0a");a.default=function(e,a,r){var n,s;try{for(var p=f.__values(a.children),v=p.next();!v.done;v=p.next()){var y=v.value;if(y instanceof i.Run)t.appendChild(r,o.default(e,y));else if(y instanceof d.BookmarkStart)t.appendChild(r,u.renderBookmarkStart(e,y));else if(y instanceof l.Hyperlink){var h=c.renderHyperLink(e,y);t.appendChild(r,h)}}}catch(e){n={error:e}}finally{try{v&&!v.done&&(s=p.return)&&s.call(p)}finally{if(n)throw n.error}}}}));
;/*!node_modules/office-viewer/lib/render/renderInstrText.js*/
amis.define("7f8e977",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("8701f02"),i=e("8d43ec5"),l=e("813afa6");r.renderInstrText=function(e,r){var t,n,f,o=r.text,s=i.createElement("span"),u=null===(f=e.currentParagraph)||void 0===f?void 0:f.fldSimples;if(u)try{for(var d=a.__values(u),c=d.next();!c.done;c=d.next()){var v=c.value;if(v.instr===o.trim()||o.startsWith(v.instr+" ")){l.default(e,v.inlineText,s);break}}}catch(e){t={error:e}}finally{try{c&&!c.done&&(n=d.return)&&n.call(d)}finally{if(t)throw t.error}}return s}}));
;/*!node_modules/office-viewer/lib/render/renderSym.js*/
amis.define("a3ee4bb",(function(e,n,t,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("8d43ec5");n.renderSym=function(e,n){var t=a.createElement("span");return t.style.fontFamily=n.font,t.innerHTML="&#x".concat(n.char,";"),t}}));
;/*!node_modules/office-viewer/lib/util/autoSpace.js*/
amis.define("3238a9e",(function(t,e,n,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=/\p{Punctuation}/u,a=/\p{Separator}/u,i=/\p{Script=Han}|\p{Script=Katakana}|\p{Script=Hiragana}|\p{Script=Hangul}/u;e.cjkspace=function(t){var e,n,r=t.filter((function(t){return void 0!==t&&""!==t}));return n=function(t,e){return function(t,e){return i.test(t)?!(u.test(e)||a.test(e)||i.test(e)):i.test(e)&&!u.test(t)&&!a.test(t)}(t,e)?" ":""},(e=r).reduce((function(t,r,u){return t+(0!==u?n(r,e[u-1]):"")+r}),"")}}));
;/*!node_modules/office-viewer/lib/render/renderSoftHyphen.js*/
amis.define("e6cfc5a",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var c=e("8d43ec5");n.renderSoftHyphen=function(){var e=c.createElement("span");return e.innerHTML="&shy;",e}}));
;/*!node_modules/office-viewer/lib/render/renderNoBreakHyphen.js*/
amis.define("0da9263",(function(e,n,r,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=e("8d43ec5");n.renderNoBreakHyphen=function(){var e=t.createElement("span");return e.innerHTML="&ndash;",e}}));
;/*!node_modules/office-viewer/lib/render/renderRun.js*/
amis.define("1bf9315",(function(e,n,t,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e("8701f02"),d=e("99de4a3"),i=e("8d43ec5"),c=e("1050750"),l=e("1f15f0a"),o=e("dc63411"),f=e("a72af5f"),p=e("3ce3f91"),s=e("5cc64d3"),h=e("3598160"),u=e("3869e2c"),x=e("ac43ed0"),v=e("4b98400"),y=e("99a9ecd"),C=e("da0e9b2"),b=e("7f8e977"),T=e("cca189c"),m=e("a3ee4bb"),S=e("3238a9e"),g=e("e6cfc5a"),k=e("6cc74f5"),w=e("db15eab"),B=e("0da9263"),E="variable";function H(e,n,t,a){var r;-1===t.indexOf("{{")?(null===(r=null==a?void 0:a.properties)||void 0===r?void 0:r.autoSpace)?e.textContent=S.cjkspace(t.split("")):e.textContent=t:(e.dataset.originText=t,e.classList.add(E),e.textContent=n.replaceText(t))}n.default=function(e,n,t,a){var S,E,_=i.createElement("span");if(e.addClass(_,"r"),p.setElementStyle(e,_,n.properties),1===n.children.length&&n.children[0]instanceof c.Text)H(_,e,n.children[0].text,t);else try{for(var P=r.__values(n.children),j=P.next();!j.done;j=P.next()){var D=j.value;if(D instanceof c.Text){var I=i.createElement("span");H(I,e,D.text,t),i.appendChild(_,I)}else if(D instanceof l.Break){var N=d.renderBr(D);i.appendChild(_,N)}else D instanceof o.Drawing?i.appendChild(_,f.renderDrawing(e,D)):D instanceof s.Tab?i.appendChild(_,h.renderTab(e,D)):D instanceof x.Pict?i.appendChild(_,u.renderPict(e,D)):D instanceof v.Ruby?i.appendChild(_,y.renderRuby(e,D)):D instanceof C.InstrText?i.appendChild(_,b.renderInstrText(e,D)):D instanceof T.Sym?i.appendChild(_,m.renderSym(e,D)):D instanceof k.SoftHyphen?i.appendChild(_,g.renderSoftHyphen()):D instanceof w.NoBreakHyphen?i.appendChild(_,B.renderNoBreakHyphen()):console.warn("unknown child",D)}}catch(e){S={error:e}}finally{try{j&&!j.done&&(E=P.return)&&E.call(P)}finally{if(S)throw S.error}}return _},n.updateVariableText=function(e){for(var n=e.rootElement.querySelectorAll(".".concat(E)),t=0;t<n.length;t++){var a=n[t],r=a.dataset.originText||"";a.textContent=e.replaceText(r)}}}));
;/*!node_modules/office-viewer/lib/render/renderNumbering.js*/
amis.define("f4a3418",(function(e,r,n,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("8701f02"),l=e("8d43ec5"),u=e("3ce3f91");function s(e){var r={M:1e3,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},n="";for(var t in r)for(;e>=r[t];)n+=t,e-=r[t];return n}function i(e,r){switch(e){case"decimal":default:return r.toString();case"lowerLetter":return String.fromCharCode(96+r);case"upperLetter":return String.fromCharCode(64+r);case"lowerRoman":return s(r).toLowerCase();case"upperRoman":return s(r).toUpperCase();case"bullet":return"&bull;"}}r.renderNumbering=function(e,r,n){var t=r.numbering,s=n.numId;if(!s)return console.warn("renderNumbering: numId is empty"),null;if(!t)return console.warn("renderNumbering: numbering is empty"),null;var o=t.nums[s];if(!o)return console.warn("renderNumbering: num is empty"),null;var m=t.abstractNums[o.abstractNumId].lvls;o.lvlOverride&&(m=a.__assign(a.__assign({},m),o.lvlOverride.lvls));var f=m[n.ilvl];if(!f)return console.warn("renderNumbering: lvl is empty"),null;var c=n.ilvl,v=t.numData[s];if(v[c])for(var d in v[c]+=1,v)parseInt(d)>parseInt(c)&&(v[d]=0);else v[c]=f.start;for(var p=l.createElement("span"),b=f.lvlText,g=parseInt(c),C=[],I=0;I<=g;I++){var L=v[I];if(L){var w=i(m[I].numFmt,L);f.isLgl&&(w=String(L)),C.push(w)}}for(I=0;I<C.length;I++){var S=C[I];b=b.replace("%".concat(I+1),S)}if(u.setElementStyle(r,e,f.pPr),u.setElementStyle(r,p,f.rPr),"bullet"!==f.numFmt||r.renderOptions.bulletUseFont)p.innerText=b;else{var y="&bull;",N=b.charCodeAt(0).toString(16).padStart(4,"0");"f06e"===N?y="&#9632;":"f075"===N?y="&#9670;":"f0d8"===N&&(y="&#9658;"),p.innerHTML=y}return"space"===f.suff?p.innerHTML+=" ":"tab"===f.suff&&(p.innerHTML+="&emsp;"),p}}));
;/*!node_modules/office-viewer/lib/util/xml.js*/
amis.define("ae95200",(function(e,r,i,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.buildXML=function(e){return(new XMLSerializer).serializeToString(e)},r.parseXML=function(e){return(new DOMParser).parseFromString(e,"application/xml")}}));
;/*!node_modules/office-viewer/lib/openxml/math/xsl.js*/
amis.define("c82928d",(function(e,t,n,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=e("ae95200").parseXML('\n<?xml version="1.0" encoding="UTF-8" ?>\n<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:mml="http://www.w3.org/1998/Math/MathML"\n\txmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math">\n  <xsl:output method="xml" encoding="UTF-16" />\n\n  \x3c!-- %% Global Definitions --\x3e\n\n  \x3c!-- Every single unicode character that is recognized by OMML as an operator --\x3e\n  <xsl:variable name="sOperators"\n\t\tselect="concat(\n          \'&#x00A8;&#x0021;&#x0022;&#x0023;&#x0026;&#x0028;&#x0029;&#x002B;&#x002C;&#x002D;&#x002E;&#x002F;&#x003A;\',\n          \'&#x003B;&#x003C;&#x003D;&#x003E;&#x003F;&#x0040;&#x005B;&#x005C;&#x005D;&#x005E;&#x005F;&#x0060;&#x007B;\',\n          \'&#x007C;&#x007D;&#x007E;&#x00A1;&#x00A6;&#x00AC;&#x00AF;&#x00B0;&#x00B1;&#x00B2;&#x00B3;&#x00B4;&#x00B7;&#x00B9;&#x00BF;\',\n          \'&#x00D7;&#x007E;&#x00F7;&#x02C7;&#x02D8;&#x02D9;&#x02DC;&#x02DD;&#x0300;&#x0301;&#x0302;&#x0303;&#x0304;&#x0305;&#x0306;&#x0307;&#x0308;&#x0309;\',\n          \'&#x030A;&#x030B;&#x030C;&#x030D;&#x030E;&#x030F;&#x0310;&#x0311;&#x0312;&#x0313;&#x0314;&#x0315;\',\n          \'&#x0316;&#x0317;&#x0318;&#x0319;&#x031A;&#x031B;&#x031C;&#x031D;&#x031E;&#x031F;&#x0320;&#x0321;\',\n          \'&#x0322;&#x0323;&#x0324;&#x0325;&#x0326;&#x0327;&#x0328;&#x0329;&#x032A;&#x032B;&#x032C;&#x032D;\',\n          \'&#x032E;&#x032F;&#x0330;&#x0331;&#x0332;&#x0333;&#x0334;&#x0335;&#x0336;&#x0337;&#x0338;&#x033F;\',\n          \'&#x2000;&#x2001;&#x2002;&#x2003;&#x2004;&#x2005;&#x2006;&#x2009;&#x200A;&#x2010;&#x2012;&#x2013;\',\n          \'&#x2014;&#x2016;&#x2020;&#x2021;&#x2022;&#x2024;&#x2025;&#x2026;&#x2032;&#x2033;&#x2034;&#x203C;\',\n          \'&#x2040;&#x2044;&#x204E;&#x204F;&#x2050;&#x2057;&#x2061;&#x2062;&#x2063;&#x2070;&#x2074;&#x2075;\',\n          \'&#x2076;&#x2077;&#x2078;&#x2079;&#x207A;&#x207B;&#x207C;&#x207D;&#x207E;&#x2080;&#x2081;&#x2082;\',\n          \'&#x2083;&#x2084;&#x2085;&#x2086;&#x2087;&#x2088;&#x2089;&#x208A;&#x208B;&#x208C;&#x208D;&#x208E;\',\n          \'&#x20D0;&#x20D1;&#x20D2;&#x20D3;&#x20D4;&#x20D5;&#x20D6;&#x20D7;&#x20D8;&#x20D9;&#x20DA;&#x20DB;\',\n          \'&#x20DC;&#x20DD;&#x20DE;&#x20DF;&#x20E0;&#x20E1;&#x20E4;&#x20E5;&#x20E6;&#x20E7;&#x20E8;&#x20E9;\',\n          \'&#x20EA;&#x2140;&#x2146;&#x2190;&#x2191;&#x2192;&#x2193;&#x2194;&#x2195;&#x2196;&#x2197;&#x2198;&#x2199;\',\n          \'&#x219A;&#x219B;&#x219C;&#x219D;&#x219E;&#x219F;&#x21A0;&#x21A1;&#x21A2;&#x21A3;&#x21A4;&#x21A5;\',\n          \'&#x21A6;&#x21A7;&#x21A8;&#x21A9;&#x21AA;&#x21AB;&#x21AC;&#x21AD;&#x21AE;&#x21AF;&#x21B0;&#x21B1;\',\n          \'&#x21B2;&#x21B3;&#x21B6;&#x21B7;&#x21BA;&#x21BB;&#x21BC;&#x21BD;&#x21BE;&#x21BF;&#x21C0;&#x21C1;\',\n          \'&#x21C2;&#x21C3;&#x21C4;&#x21C5;&#x21C6;&#x21C7;&#x21C8;&#x21C9;&#x21CA;&#x21CB;&#x21CC;&#x21CD;\',\n          \'&#x21CE;&#x21CF;&#x21D0;&#x21D1;&#x21D2;&#x21D3;&#x21D4;&#x21D5;&#x21D6;&#x21D7;&#x21D8;&#x21D9;\',\n          \'&#x21DA;&#x21DB;&#x21DC;&#x21DD;&#x21DE;&#x21DF;&#x21E0;&#x21E1;&#x21E2;&#x21E3;&#x21E4;&#x21E5;\',\n          \'&#x21E6;&#x21E7;&#x21E8;&#x21E9;&#x21F3;&#x21F4;&#x21F5;&#x21F6;&#x21F7;&#x21F8;&#x21F9;&#x21FA;\',\n          \'&#x21FB;&#x21FC;&#x21FD;&#x21FE;&#x21FF;&#x2200;&#x2201;&#x2202;&#x2203;&#x2204;&#x2206;&#x2207;\',\n          \'&#x2208;&#x2209;&#x220A;&#x220B;&#x220C;&#x220D;&#x220F;&#x2210;&#x2211;&#x2212;&#x2213;&#x2214;\',\n          \'&#x2215;&#x2216;&#x2217;&#x2218;&#x2219;&#x221A;&#x221B;&#x221C;&#x221D;&#x2223;&#x2224;&#x2225;\',\n          \'&#x2226;&#x2227;&#x2228;&#x2229;&#x222A;&#x222B;&#x222C;&#x222D;&#x222E;&#x222F;&#x2230;&#x2231;\',\n          \'&#x2232;&#x2233;&#x2234;&#x2235;&#x2236;&#x2237;&#x2238;&#x2239;&#x223A;&#x223B;&#x223C;&#x223D;\',\n          \'&#x223E;&#x2240;&#x2241;&#x2242;&#x2243;&#x2244;&#x2245;&#x2246;&#x2247;&#x2248;&#x2249;&#x224A;\',\n          \'&#x224B;&#x224C;&#x224D;&#x224E;&#x224F;&#x2250;&#x2251;&#x2252;&#x2253;&#x2254;&#x2255;&#x2256;\',\n          \'&#x2257;&#x2258;&#x2259;&#x225A;&#x225B;&#x225C;&#x225D;&#x225E;&#x225F;&#x2260;&#x2261;&#x2262;\',\n          \'&#x2263;&#x2264;&#x2265;&#x2266;&#x2267;&#x2268;&#x2269;&#x226A;&#x226B;&#x226C;&#x226D;&#x226E;\',\n          \'&#x226F;&#x2270;&#x2271;&#x2272;&#x2273;&#x2274;&#x2275;&#x2276;&#x2277;&#x2278;&#x2279;&#x227A;\',\n          \'&#x227B;&#x227C;&#x227D;&#x227E;&#x227F;&#x2280;&#x2281;&#x2282;&#x2283;&#x2284;&#x2285;&#x2286;\',\n          \'&#x2287;&#x2288;&#x2289;&#x228A;&#x228B;&#x228C;&#x228D;&#x228E;&#x228F;&#x2290;&#x2291;&#x2292;\',\n          \'&#x2293;&#x2294;&#x2295;&#x2296;&#x2297;&#x2298;&#x2299;&#x229A;&#x229B;&#x229C;&#x229D;&#x229E;\',\n          \'&#x229F;&#x22A0;&#x22A1;&#x22A2;&#x22A3;&#x22A5;&#x22A6;&#x22A7;&#x22A8;&#x22A9;&#x22AA;&#x22AB;\',\n          \'&#x22AC;&#x22AD;&#x22AE;&#x22AF;&#x22B0;&#x22B1;&#x22B2;&#x22B3;&#x22B4;&#x22B5;&#x22B6;&#x22B7;\',\n          \'&#x22B8;&#x22B9;&#x22BA;&#x22BB;&#x22BC;&#x22BD;&#x22C0;&#x22C1;&#x22C2;&#x22C3;&#x22C4;&#x22C5;\',\n          \'&#x22C6;&#x22C7;&#x22C8;&#x22C9;&#x22CA;&#x22CB;&#x22CC;&#x22CD;&#x22CE;&#x22CF;&#x22D0;&#x22D1;\',\n          \'&#x22D2;&#x22D3;&#x22D4;&#x22D5;&#x22D6;&#x22D7;&#x22D8;&#x22D9;&#x22DA;&#x22DB;&#x22DC;&#x22DD;\',\n          \'&#x22DE;&#x22DF;&#x22E0;&#x22E1;&#x22E2;&#x22E3;&#x22E4;&#x22E5;&#x22E6;&#x22E7;&#x22E8;&#x22E9;\',\n          \'&#x22EA;&#x22EB;&#x22EC;&#x22ED;&#x22EE;&#x22EF;&#x22F0;&#x22F1;&#x22F2;&#x22F3;&#x22F4;&#x22F5;\',\n          \'&#x22F6;&#x22F7;&#x22F8;&#x22F9;&#x22FA;&#x22FB;&#x22FC;&#x22FD;&#x22FE;&#x22FF;&#x2305;&#x2306;\',\n          \'&#x2308;&#x2309;&#x230A;&#x230B;&#x231C;&#x231D;&#x231E;&#x231F;&#x2322;&#x2323;&#x2329;&#x232A;\',\n          \'&#x233D;&#x233F;&#x23B0;&#x23B1;&#x23DC;&#x23DD;&#x23DE;&#x23DF;&#x23E0;&#x2502;&#x251C;&#x2524;\',\n          \'&#x252C;&#x2534;&#x2581;&#x2588;&#x2592;&#x25A0;&#x25A1;&#x25AD;&#x25B2;&#x25B3;&#x25B4;&#x25B5;\',\n          \'&#x25B6;&#x25B7;&#x25B8;&#x25B9;&#x25BC;&#x25BD;&#x25BE;&#x25BF;&#x25C0;&#x25C1;&#x25C2;&#x25C3;\',\n          \'&#x25C4;&#x25C5;&#x25CA;&#x25CB;&#x25E6;&#x25EB;&#x25EC;&#x25F8;&#x25F9;&#x25FA;&#x25FB;&#x25FC;\',\n          \'&#x25FD;&#x25FE;&#x25FF;&#x2605;&#x2606;&#x2772;&#x2773;&#x27D1;&#x27D2;&#x27D3;&#x27D4;&#x27D5;\',\n          \'&#x27D6;&#x27D7;&#x27D8;&#x27D9;&#x27DA;&#x27DB;&#x27DC;&#x27DD;&#x27DE;&#x27DF;&#x27E0;&#x27E1;\',\n          \'&#x27E2;&#x27E3;&#x27E4;&#x27E5;&#x27E6;&#x27E7;&#x27E8;&#x27E9;&#x27EA;&#x27EB;&#x27F0;&#x27F1;\',\n          \'&#x27F2;&#x27F3;&#x27F4;&#x27F5;&#x27F6;&#x27F7;&#x27F8;&#x27F9;&#x27FA;&#x27FB;&#x27FC;&#x27FD;\',\n          \'&#x27FE;&#x27FF;&#x2900;&#x2901;&#x2902;&#x2903;&#x2904;&#x2905;&#x2906;&#x2907;&#x2908;&#x2909;\',\n          \'&#x290A;&#x290B;&#x290C;&#x290D;&#x290E;&#x290F;&#x2910;&#x2911;&#x2912;&#x2913;&#x2914;&#x2915;\',\n          \'&#x2916;&#x2917;&#x2918;&#x2919;&#x291A;&#x291B;&#x291C;&#x291D;&#x291E;&#x291F;&#x2920;&#x2921;\',\n          \'&#x2922;&#x2923;&#x2924;&#x2925;&#x2926;&#x2927;&#x2928;&#x2929;&#x292A;&#x292B;&#x292C;&#x292D;\',\n          \'&#x292E;&#x292F;&#x2930;&#x2931;&#x2932;&#x2933;&#x2934;&#x2935;&#x2936;&#x2937;&#x2938;&#x2939;\',\n          \'&#x293A;&#x293B;&#x293C;&#x293D;&#x293E;&#x293F;&#x2940;&#x2941;&#x2942;&#x2943;&#x2944;&#x2945;\',\n          \'&#x2946;&#x2947;&#x2948;&#x2949;&#x294A;&#x294B;&#x294C;&#x294D;&#x294E;&#x294F;&#x2950;&#x2951;\',\n          \'&#x2952;&#x2953;&#x2954;&#x2955;&#x2956;&#x2957;&#x2958;&#x2959;&#x295A;&#x295B;&#x295C;&#x295D;\',\n          \'&#x295E;&#x295F;&#x2960;&#x2961;&#x2962;&#x2963;&#x2964;&#x2965;&#x2966;&#x2967;&#x2968;&#x2969;\',\n          \'&#x296A;&#x296B;&#x296C;&#x296D;&#x296E;&#x296F;&#x2970;&#x2971;&#x2972;&#x2973;&#x2974;&#x2975;\',\n          \'&#x2976;&#x2977;&#x2978;&#x2979;&#x297A;&#x297B;&#x297C;&#x297D;&#x297E;&#x297F;&#x2980;&#x2982;\',\n          \'&#x2983;&#x2984;&#x2985;&#x2986;&#x2987;&#x2988;&#x2989;&#x298A;&#x298B;&#x298C;&#x298D;&#x298E;\',\n          \'&#x298F;&#x2990;&#x2991;&#x2992;&#x2993;&#x2994;&#x2995;&#x2996;&#x2997;&#x2998;&#x2999;&#x299A;\',\n          \'&#x29B6;&#x29B7;&#x29B8;&#x29B9;&#x29C0;&#x29C1;&#x29C4;&#x29C5;&#x29C6;&#x29C7;&#x29C8;&#x29CE;\',\n          \'&#x29CF;&#x29D0;&#x29D1;&#x29D2;&#x29D3;&#x29D4;&#x29D5;&#x29D6;&#x29D7;&#x29D8;&#x29D9;&#x29DA;\',\n          \'&#x29DB;&#x29DF;&#x29E1;&#x29E2;&#x29E3;&#x29E4;&#x29E5;&#x29E6;&#x29EB;&#x29F4;&#x29F5;&#x29F6;\',\n          \'&#x29F7;&#x29F8;&#x29F9;&#x29FA;&#x29FB;&#x29FC;&#x29FD;&#x29FE;&#x29FF;&#x2A00;&#x2A01;&#x2A02;\',\n          \'&#x2A03;&#x2A04;&#x2A05;&#x2A06;&#x2A07;&#x2A08;&#x2A09;&#x2A0A;&#x2A0B;&#x2A0C;&#x2A0D;&#x2A0E;\',\n          \'&#x2A0F;&#x2A10;&#x2A11;&#x2A12;&#x2A13;&#x2A14;&#x2A15;&#x2A16;&#x2A17;&#x2A18;&#x2A19;&#x2A1A;\',\n          \'&#x2A1B;&#x2A1C;&#x2A1D;&#x2A1E;&#x2A1F;&#x2A20;&#x2A21;&#x2A22;&#x2A23;&#x2A24;&#x2A25;&#x2A26;\',\n          \'&#x2A27;&#x2A28;&#x2A29;&#x2A2A;&#x2A2B;&#x2A2C;&#x2A2D;&#x2A2E;&#x2A2F;&#x2A30;&#x2A31;&#x2A32;\',\n          \'&#x2A33;&#x2A34;&#x2A35;&#x2A36;&#x2A37;&#x2A38;&#x2A39;&#x2A3A;&#x2A3B;&#x2A3C;&#x2A3D;&#x2A3E;\',\n          \'&#x2A3F;&#x2A40;&#x2A41;&#x2A42;&#x2A43;&#x2A44;&#x2A45;&#x2A46;&#x2A47;&#x2A48;&#x2A49;&#x2A4A;\',\n          \'&#x2A4B;&#x2A4C;&#x2A4D;&#x2A4E;&#x2A4F;&#x2A50;&#x2A51;&#x2A52;&#x2A53;&#x2A54;&#x2A55;&#x2A56;\',\n          \'&#x2A57;&#x2A58;&#x2A59;&#x2A5A;&#x2A5B;&#x2A5C;&#x2A5D;&#x2A5E;&#x2A5F;&#x2A60;&#x2A61;&#x2A62;\',\n          \'&#x2A63;&#x2A64;&#x2A65;&#x2A66;&#x2A67;&#x2A68;&#x2A69;&#x2A6A;&#x2A6B;&#x2A6C;&#x2A6D;&#x2A6E;\',\n          \'&#x2A6F;&#x2A70;&#x2A71;&#x2A72;&#x2A73;&#x2A74;&#x2A75;&#x2A76;&#x2A77;&#x2A78;&#x2A79;&#x2A7A;\',\n          \'&#x2A7B;&#x2A7C;&#x2A7D;&#x2A7E;&#x2A7F;&#x2A80;&#x2A81;&#x2A82;&#x2A83;&#x2A84;&#x2A85;&#x2A86;\',\n          \'&#x2A87;&#x2A88;&#x2A89;&#x2A8A;&#x2A8B;&#x2A8C;&#x2A8D;&#x2A8E;&#x2A8F;&#x2A90;&#x2A91;&#x2A92;\',\n          \'&#x2A93;&#x2A94;&#x2A95;&#x2A96;&#x2A97;&#x2A98;&#x2A99;&#x2A9A;&#x2A9B;&#x2A9C;&#x2A9D;&#x2A9E;\',\n          \'&#x2A9F;&#x2AA0;&#x2AA1;&#x2AA2;&#x2AA3;&#x2AA4;&#x2AA5;&#x2AA6;&#x2AA7;&#x2AA8;&#x2AA9;&#x2AAA;\',\n          \'&#x2AAB;&#x2AAC;&#x2AAD;&#x2AAE;&#x2AAF;&#x2AB0;&#x2AB1;&#x2AB2;&#x2AB3;&#x2AB4;&#x2AB5;&#x2AB6;\',\n          \'&#x2AB7;&#x2AB8;&#x2AB9;&#x2ABA;&#x2ABB;&#x2ABC;&#x2ABD;&#x2ABE;&#x2ABF;&#x2AC0;&#x2AC1;&#x2AC2;\',\n          \'&#x2AC3;&#x2AC4;&#x2AC5;&#x2AC6;&#x2AC7;&#x2AC8;&#x2AC9;&#x2ACA;&#x2ACB;&#x2ACC;&#x2ACD;&#x2ACE;\',\n          \'&#x2ACF;&#x2AD0;&#x2AD1;&#x2AD2;&#x2AD3;&#x2AD4;&#x2AD5;&#x2AD6;&#x2AD7;&#x2AD8;&#x2AD9;&#x2ADA;\',\n          \'&#x2ADB;&#x2ADC;&#x2ADD;&#x2ADE;&#x2ADF;&#x2AE0;&#x2AE2;&#x2AE3;&#x2AE4;&#x2AE5;&#x2AE6;&#x2AE7;\',\n          \'&#x2AE8;&#x2AE9;&#x2AEA;&#x2AEB;&#x2AEC;&#x2AED;&#x2AEE;&#x2AEF;&#x2AF0;&#x2AF2;&#x2AF3;&#x2AF4;\',\n          \'&#x2AF5;&#x2AF6;&#x2AF7;&#x2AF8;&#x2AF9;&#x2AFA;&#x2AFB;&#x2AFC;&#x2AFD;&#x2AFE;&#x2AFF;&#x2B04;\',\n          \'&#x2B06;&#x2B07;&#x2B0C;&#x2B0D;&#x3014;&#x3015;&#x3016;&#x3017;&#x3018;&#x3019;&#xFF01;&#xFF06;\',\n          \'&#xFF08;&#xFF09;&#xFF0B;&#xFF0C;&#xFF0D;&#xFF0E;&#xFF0F;&#xFF1A;&#xFF1B;&#xFF1C;&#xFF1D;&#xFF1E;\',\n          \'&#xFF1F;&#xFF20;&#xFF3B;&#xFF3C;&#xFF3D;&#xFF3E;&#xFF3F;&#xFF5B;&#xFF5C;&#xFF5D;\')" />\n\n  \x3c!-- A string of \'-\'s repeated exactly as many times as the operators above --\x3e\n  <xsl:variable name="sMinuses">\n    <xsl:call-template name="SRepeatChar">\n      <xsl:with-param name="cchRequired" select="string-length($sOperators)" />\n      <xsl:with-param name="ch" select="\'-\'" />\n    </xsl:call-template>\n  </xsl:variable>\n\n  \x3c!-- Every single unicode character that is recognized by OMML as a number --\x3e\n  <xsl:variable name="sNumbers" select="\'0123456789\'" />\n\n  \x3c!-- A string of \'0\'s repeated exactly as many times as the list of numbers above --\x3e\n  <xsl:variable name="sZeros">\n    <xsl:call-template name="SRepeatChar">\n      <xsl:with-param name="cchRequired" select="string-length($sNumbers)" />\n      <xsl:with-param name="ch" select="\'0\'" />\n    </xsl:call-template>\n  </xsl:variable>\n\n  \x3c!-- %%Template: SReplace\n\n\t\tReplace all occurences of sOrig in sInput with sReplacement\n\t\tand return the resulting string. --\x3e\n  <xsl:template name="SReplace">\n    <xsl:param name="sInput" />\n    <xsl:param name="sOrig" />\n    <xsl:param name="sReplacement" />\n\n    <xsl:choose>\n      <xsl:when test="not(contains($sInput, $sOrig))">\n        <xsl:value-of select="$sInput" />\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:variable name="sBefore" select="substring-before($sInput, $sOrig)" />\n        <xsl:variable name="sAfter" select="substring-after($sInput, $sOrig)" />\n        <xsl:variable name="sAfterProcessed">\n          <xsl:call-template name="SReplace">\n            <xsl:with-param name="sInput" select="$sAfter" />\n            <xsl:with-param name="sOrig" select="$sOrig" />\n            <xsl:with-param name="sReplacement" select="$sReplacement" />\n          </xsl:call-template>\n        </xsl:variable>\n\n        <xsl:value-of select="concat($sBefore, concat($sReplacement, $sAfterProcessed))" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Templates --\x3e\n  <xsl:template match="/">\n    <mml:math>\n      <xsl:apply-templates select="*" />\n    </mml:math>\n  </xsl:template>\n\n  <xsl:template match="m:borderBox">\n\n    \x3c!-- Get Lowercase versions of properties --\x3e\n    <xsl:variable name="sLowerCaseHideTop" select="translate(m:borderBoxPr[last()]/m:hideTop[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseHideBot" select="translate(m:borderBoxPr[last()]/m:hideBot[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseHideLeft" select="translate(m:borderBoxPr[last()]/m:hideLeft[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseHideRight" select="translate(m:borderBoxPr[last()]/m:hideRight[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeH" select="translate(m:borderBoxPr[last()]/m:strikeH[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeV" select="translate(m:borderBoxPr[last()]/m:strikeV[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeBLTR" select="translate(m:borderBoxPr[last()]/m:strikeBLTR[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeTLBR" select="translate(m:borderBoxPr[last()]/m:strikeTLBR[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="fHideTop">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideTop" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fHideBot">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideBot" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fHideLeft">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideLeft" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fHideRight">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideRight" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeH">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeH" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeV">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeV" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeBLTR">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeBLTR" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeTLBR">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeTLBR" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:choose>\n      <xsl:when test="$fHideTop=1\n                      and $fHideBot=1\n                      and $fHideLeft=1\n                      and $fHideRight=1\n                      and $fStrikeH=0\n                      and $fStrikeV=0\n                      and $fStrikeBLTR=0\n                      and $fStrikeTLBR=0">\n        <mml:mrow>\n          <xsl:apply-templates select="m:e[1]" />\n        </mml:mrow>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:menclose>\n          <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n            <xsl:with-param name="fHideTop" select="$fHideTop" />\n            <xsl:with-param name="fHideBot" select="$fHideBot" />\n            <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n            <xsl:with-param name="fHideRight" select="$fHideRight" />\n            <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n            <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n            <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n            <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n          </xsl:call-template>\n          <xsl:apply-templates select="m:e[1]" />\n        </mml:menclose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="*">\n    <xsl:apply-templates select="*" />\n  </xsl:template>\n\n  \x3c!--\n      { Non-combining, Upper-combining, Lower-combining }\n      {U+02D8, U+0306, U+032E}, // BREVE\n      {U+00B8, U+0312, U+0327}, // CEDILLA\n      {U+0060, U+0300, U+0316}, // GRAVE ACCENT\n      {U+002D, U+0305, U+0332}, // HYPHEN-MINUS/OVERLINE\n      {U+2212, U+0305, U+0332}, // MINUS SIGN/OVERLINE\n      {U+002E, U+0305, U+0323}, // FULL STOP/DOT ABOVE\n      {U+02D9, U+0307, U+0323}, // DOT ABOVE\n      {U+02DD, U+030B, U+02DD}, // DOUBLE ACUTE ACCENT\n      {U+00B4, U+0301, U+0317}, // ACUTE ACCENT\n      {U+007E, U+0303, U+0330}, // TILDE\n      {U+02DC, U+0303, U+0330}, // SMALL TILDE\n      {U+00A8, U+0308, U+0324}, // DIAERESIS\n      {U+02C7, U+030C, U+032C}, // CARON\n      {U+005E, U+0302, U+032D}, // CIRCUMFLEX ACCENT\n      {U+00AF, U+0305, ::::::}, // MACRON\n      {U+005F, ::::::, U+0332}, // LOW LINE\n      {U+2192, U+20D7, U+20EF}, // RIGHTWARDS ARROW\n      {U+27F6, U+20D7, U+20EF}, // LONG RIGHTWARDS ARROW\n      {U+2190, U+20D6, U+20EE}, // LEFT ARROW\n  --\x3e\n  <xsl:template name="ToNonCombining">\n    <xsl:param name="ch" />\n    <xsl:choose>\n      \x3c!-- BREVE --\x3e\n      <xsl:when test="$ch=\'&#x0306;\' or $ch=\'&#x032e;\'">&#x02D8;</xsl:when>\n      \x3c!-- CEDILLA --\x3e\n      <xsl:when test="$ch=\'&#x0312;\' or $ch=\'&#x0327;\'">&#x00B8;</xsl:when>\n      \x3c!-- GRAVE ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x0300;\' or $ch=\'&#x0316;\'">&#x0060;</xsl:when>\n      \x3c!-- HYPHEN-MINUS/OVERLINE --\x3e\n      <xsl:when test="$ch=\'&#x0305;\' or $ch=\'&#x0332;\'">&#x002D;</xsl:when>\n      \x3c!-- MINUS SIGN/OVERLINE --\x3e\n      <xsl:when test="$ch=\'&#x0305;\' or $ch=\'&#x0332;\'">&#x2212;</xsl:when>\n      \x3c!-- FULL STOP/DOT ABOVE --\x3e\n      <xsl:when test="$ch=\'&#x0305;\' or $ch=\'&#x0323;\'">&#x002E;</xsl:when>\n      \x3c!-- DOT ABOVE --\x3e\n      <xsl:when test="$ch=\'&#x0307;\' or $ch=\'&#x0323;\'">&#x02D9;</xsl:when>\n      \x3c!-- DOUBLE ACUTE ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x030B;\' or $ch=\'&#x02DD;\'">&#x02DD;</xsl:when>\n      \x3c!-- ACUTE ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x0301;\' or $ch=\'&#x0317;\'">&#x00B4;</xsl:when>\n      \x3c!-- TILDE --\x3e\n      <xsl:when test="$ch=\'&#x0303;\' or $ch=\'&#x0330;\'">&#x007E;</xsl:when>\n      \x3c!-- SMALL TILDE --\x3e\n      <xsl:when test="$ch=\'&#x0303;\' or $ch=\'&#x0330;\'">&#x02DC;</xsl:when>\n      \x3c!-- DIAERESIS --\x3e\n      <xsl:when test="$ch=\'&#x0308;\' or $ch=\'&#x0324;\'">&#x00A8;</xsl:when>\n      \x3c!-- CARON --\x3e\n      <xsl:when test="$ch=\'&#x030C;\' or $ch=\'&#x032C;\'">&#x02C7;</xsl:when>\n      \x3c!-- CIRCUMFLEX ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x0302;\' or $ch=\'&#x032D;\'">&#x005E;</xsl:when>\n      \x3c!-- MACRON --\x3e\n      <xsl:when test="$ch=\'&#x0305;\'                   ">&#x00AF;</xsl:when>\n      \x3c!-- LOW LINE --\x3e\n      <xsl:when test="                   $ch=\'&#x0332;\'">&#x005F;</xsl:when>\n      \x3c!-- RIGHTWARDS ARROW --\x3e\n      <xsl:when test="$ch=\'&#x20D7;\' or $ch=\'&#x20EF;\'">&#x2192;</xsl:when>\n      \x3c!-- LONG RIGHTWARDS ARROW --\x3e\n      <xsl:when test="$ch=\'&#x20D7;\' or $ch=\'&#x20EF;\'">&#x27F6;</xsl:when>\n      \x3c!-- LEFT ARROW --\x3e\n      <xsl:when test="$ch=\'&#x20D6;\' or $ch=\'&#x20EE;\'">&#x2190;</xsl:when>\n      <xsl:otherwise>\n        <xsl:value-of select="$ch"/>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:acc">\n    <mml:mover>\n      <xsl:attribute name="accent">true</xsl:attribute>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <xsl:variable name="chAcc">\n        <xsl:choose>\n          <xsl:when test="not(m:accPr[last()]/m:chr)">\n            <xsl:value-of select="\'&#x0302;\'" />\n          </xsl:when>\n          <xsl:otherwise>\n            <xsl:value-of select="substring(m:accPr/m:chr/@m:val,1,1)" />\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:variable>\n      <xsl:variable name="chNonComb">\n        <xsl:call-template name="ToNonCombining">\n          <xsl:with-param name="ch" select="$chAcc" />\n        </xsl:call-template>\n      </xsl:variable>\n      <xsl:choose>\n        <xsl:when test="string-length($chAcc)=0">\n          <mml:mo/>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="$chNonComb" />\n            <xsl:with-param name="scr" select="m:e[1]/*/m:rPr[last()]/m:scr/@m:val" />\n            <xsl:with-param name="sty" select="m:e[1]/*/m:rPr[last()]/m:sty/@m:val" />\n            <xsl:with-param name="nor">\n              <xsl:choose>\n                <xsl:when test="count(m:e[1]/*/m:rPr[last()]/m:nor) = 0">0</xsl:when>\n                <xsl:otherwise>\n                  <xsl:call-template name="ForceFalseStrVal">\n                    <xsl:with-param name="str" select="translate(m:e[1]/*/m:rPr[last()]/m:nor/@m:val,\n                                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                 \'abcdefghijklmnopqrstuvwxyz\')" />\n                  </xsl:call-template>\n                </xsl:otherwise>\n              </xsl:choose>\n            </xsl:with-param>\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </mml:mover>\n  </xsl:template>\n\n  <xsl:template name="OutputScript">\n    <xsl:param name="ndCur" select="." />\n    <xsl:choose>\n      \x3c!-- Only output contents of $ndCur if $ndCur exists\n           and $ndCur has children --\x3e\n      <xsl:when test="count($ndCur/*) &gt; 0">\n        <mml:mrow>\n          <xsl:apply-templates select="$ndCur" />\n        </mml:mrow>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:none />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:sPre">\n    <mml:mmultiscripts>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mprescripts />\n      <xsl:call-template name="OutputScript">\n        <xsl:with-param name="ndCur" select="m:sub[1]"/>\n      </xsl:call-template>\n      <xsl:call-template name="OutputScript">\n        <xsl:with-param name="ndCur" select="m:sup[1]" />\n      </xsl:call-template>\n    </mml:mmultiscripts>\n  </xsl:template>\n\n  <xsl:template match="m:m">\n    <mml:mtable>\n      <xsl:call-template name="CreateMathMLMatrixAttr">\n        <xsl:with-param name="mcJc" select="m:mPr[last()]/m:mcs/m:mc/m:mcPr[last()]/m:mcJc/@m:val" />\n      </xsl:call-template>\n      <xsl:for-each select="m:mr">\n        <mml:mtr>\n          <xsl:for-each select="m:e">\n            <mml:mtd>\n              <xsl:apply-templates select="." />\n            </mml:mtd>\n          </xsl:for-each>\n        </mml:mtr>\n      </xsl:for-each>\n    </mml:mtable>\n  </xsl:template>\n\n  <xsl:template name="CreateMathMLMatrixAttr">\n    <xsl:param name="mcJc" />\n    <xsl:variable name="sLowerCaseMcjc" select="translate($mcJc, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:choose>\n      <xsl:when test="$sLowerCaseMcjc=\'left\'">\n        <xsl:attribute name="columnalign">left</xsl:attribute>\n      </xsl:when>\n      <xsl:when test="$sLowerCaseMcjc=\'right\'">\n        <xsl:attribute name="columnalign">right</xsl:attribute>\n      </xsl:when>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:phant">\n    <xsl:variable name="sLowerCaseZeroWidVal" select="translate(m:phantPr[last()]/m:zeroWid[last()]/@m:val,\n\t\t                                                       \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                       \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseZeroAscVal" select="translate(m:phantPr[last()]/m:zeroAsc[last()]/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseZeroDescVal" select="translate(m:phantPr[last()]/m:zeroDesc[last()]/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseShowVal" select="translate(m:phantPr[last()]/m:show[last()]/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n\n\n    \x3c!-- The following properties default to \'yes\' unless the last value equals \'no\' or there isn\'t any node for\n         the property --\x3e\n\n    <xsl:variable name="fZeroWid">\n      <xsl:choose>\n        <xsl:when test="count(m:phantPr[last()]/m:zeroWid[last()]) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="$sLowerCaseZeroWidVal" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:variable name="fZeroAsc">\n      <xsl:choose>\n        <xsl:when test="count(m:phantPr[last()]/m:zeroAsc[last()]) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="$sLowerCaseZeroAscVal" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:variable name="fZeroDesc">\n      <xsl:choose>\n        <xsl:when test="count(m:phantPr[last()]/m:zeroDesc[last()]) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="$sLowerCaseZeroDescVal" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    \x3c!-- The show property defaults to \'on\' unless there exists a show property and its value is \'off\' --\x3e\n\n    <xsl:variable name="fShow">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseShowVal" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:choose>\n      \x3c!-- Show the phantom contents, therefore, just use mpadded. --\x3e\n      <xsl:when test="$fShow = 1">\n        <xsl:element name="mml:mpadded">\n          <xsl:call-template name="CreateMpaddedAttributes">\n            <xsl:with-param name="fZeroWid" select="$fZeroWid" />\n            <xsl:with-param name="fZeroAsc" select="$fZeroAsc" />\n            <xsl:with-param name="fZeroDesc" select="$fZeroDesc" />\n          </xsl:call-template>\n          <mml:mrow>\n            <xsl:apply-templates select="m:e" />\n          </mml:mrow>\n        </xsl:element>\n      </xsl:when>\n      \x3c!-- Don\'t show phantom contents, but don\'t smash anything, therefore, just\n           use mphantom --\x3e\n      <xsl:when test="$fZeroWid=0 and $fZeroAsc=0 and $fZeroDesc=0">\n        <xsl:element name="mml:mphantom">\n          <mml:mrow>\n            <xsl:apply-templates select="m:e" />\n          </mml:mrow>\n        </xsl:element>\n      </xsl:when>\n      \x3c!-- Combination --\x3e\n      <xsl:otherwise>\n        <xsl:element name="mml:mphantom">\n          <xsl:element name="mml:mpadded">\n            <xsl:call-template name="CreateMpaddedAttributes">\n              <xsl:with-param name="fZeroWid" select="$fZeroWid" />\n              <xsl:with-param name="fZeroAsc" select="$fZeroAsc" />\n              <xsl:with-param name="fZeroDesc" select="$fZeroDesc" />\n            </xsl:call-template>\n            <mml:mrow>\n              <xsl:apply-templates select="m:e" />\n            </mml:mrow>\n          </xsl:element>\n        </xsl:element>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template name="CreateMpaddedAttributes">\n    <xsl:param name="fZeroWid" />\n    <xsl:param name="fZeroAsc" />\n    <xsl:param name="fZeroDesc" />\n\n    <xsl:if test="$fZeroWid=1">\n      <xsl:attribute name="width">0in</xsl:attribute>\n    </xsl:if>\n    <xsl:if test="$fZeroAsc=1">\n      <xsl:attribute name="height">0in</xsl:attribute>\n    </xsl:if>\n    <xsl:if test="$fZeroDesc=1">\n      <xsl:attribute name="depth">0in</xsl:attribute>\n    </xsl:if>\n  </xsl:template>\n\n\n\n  <xsl:template match="m:rad">\n    <xsl:variable name="fDegHide">\n      <xsl:choose>\n        <xsl:when test="count(m:radPr[last()]/m:degHide)=0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="translate(m:radPr[last()]/m:degHide/@m:val,\n\t\t                                                          \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                          \'abcdefghijklmnopqrstuvwxyz\')" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$fDegHide=1">\n        <mml:msqrt>\n          <xsl:apply-templates select="m:e[1]" />\n        </mml:msqrt>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:mroot>\n          <mml:mrow>\n            <xsl:apply-templates select="m:e[1]" />\n          </mml:mrow>\n          <mml:mrow>\n            <xsl:apply-templates select="m:deg[1]" />\n          </mml:mrow>\n        </mml:mroot>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template name="OutputNaryMo">\n    <xsl:param name="ndCur" select="." />\n    <xsl:param name="fGrow" select="0" />\n    <mml:mo>\n      <xsl:choose>\n        <xsl:when test="$fGrow=1">\n          <xsl:attribute name="stretchy">true</xsl:attribute>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:attribute name="stretchy">false</xsl:attribute>\n        </xsl:otherwise>\n      </xsl:choose>\n      <xsl:choose>\n        <xsl:when test="not($ndCur/m:naryPr[last()]/m:chr/@m:val) or\n\t\t\t                            $ndCur/m:naryPr[last()]/m:chr/@m:val=\'\'">\n          <xsl:text>&#x222b;</xsl:text>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="$ndCur/m:naryPr[last()]/m:chr/@m:val" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </mml:mo>\n  </xsl:template>\n\n  \x3c!-- %%Template match m:nary\n\t\tProcess an n-ary.\n\n\t\tDecides, based on which arguments are supplied, between\n\t\tusing an mo, msup, msub, or msubsup for the n-ary operator\n\t--\x3e\n  <xsl:template match="m:nary">\n    <xsl:variable name="sLowerCaseSubHide">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:subHide) = 0">\n          <xsl:text>off</xsl:text>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="translate(m:naryPr[last()]/m:subHide/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="sLowerCaseSupHide">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:supHide) = 0">\n          <xsl:text>off</xsl:text>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="translate(m:naryPr[last()]/m:supHide/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="sLowerCaseLimLoc">\n      <xsl:value-of select="translate(m:naryPr[last()]/m:limLoc/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n    </xsl:variable>\n\n    <xsl:variable name="sLowerGrow">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:grow)=0">off</xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="translate(m:naryPr[last()]/m:grow/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="fLimLocSubSup">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:limLoc)=0 or $sLowerCaseLimLoc=\'subsup\'">1</xsl:when>\n        <xsl:otherwise>0</xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="fGrow">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerGrow" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:variable name="fSupHide">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseSupHide" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:variable name="fSubHide">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseSubHide" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <mml:mrow>\n      <xsl:choose>\n        <xsl:when test="$fSupHide=1 and $fSubHide=1">\n          <xsl:call-template name="OutputNaryMo">\n            <xsl:with-param name="ndCur" select="." />\n            <xsl:with-param name="fGrow" select="$fGrow" />\n          </xsl:call-template>\n        </xsl:when>\n        <xsl:when test="$fSubHide=1">\n          <xsl:choose>\n            <xsl:when test="$fLimLocSubSup=1">\n              <mml:msup>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:msup>\n            </xsl:when>\n            <xsl:otherwise>\n              <mml:mover>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:mover>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:when>\n        <xsl:when test="$fSupHide=1">\n          <xsl:choose>\n            <xsl:when test="$fLimLocSubSup=1">\n              <mml:msub>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n              </mml:msub>\n            </xsl:when>\n            <xsl:otherwise>\n              <mml:munder>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n              </mml:munder>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:choose>\n            <xsl:when test="$fLimLocSubSup=1">\n              <mml:msubsup>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:msubsup>\n            </xsl:when>\n            <xsl:otherwise>\n              <mml:munderover>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:munderover>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:otherwise>\n      </xsl:choose>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n    </mml:mrow>\n  </xsl:template>\n\n  <xsl:template match="m:limLow">\n    <mml:munder>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:lim[1]" />\n      </mml:mrow>\n    </mml:munder>\n  </xsl:template>\n\n  <xsl:template match="m:limUpp">\n    <mml:mover>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:lim[1]" />\n      </mml:mrow>\n    </mml:mover>\n  </xsl:template>\n\n  <xsl:template match="m:sSub">\n    <mml:msub>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sub[1]" />\n      </mml:mrow>\n    </mml:msub>\n  </xsl:template>\n\n  <xsl:template match="m:sSup">\n    <mml:msup>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sup[1]" />\n      </mml:mrow>\n    </mml:msup>\n  </xsl:template>\n\n  <xsl:template match="m:sSubSup">\n    <mml:msubsup>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sub[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sup[1]" />\n      </mml:mrow>\n    </mml:msubsup>\n  </xsl:template>\n\n  <xsl:template match="m:groupChr">\n    <xsl:variable name="ndLastGroupChrPr" select="m:groupChrPr[last()]" />\n    <xsl:variable name="sLowerCasePos" select="translate($ndLastGroupChrPr/m:pos/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n\n    <xsl:variable name="sLowerCaseVertJc" select="translate($ndLastGroupChrPr/m:vertJc/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="ndLastChr" select="$ndLastGroupChrPr/m:chr" />\n\n    <xsl:variable name="chr">\n      <xsl:choose>\n        <xsl:when test="$ndLastChr and (not($ndLastChr/@m:val) or string-length($ndLastChr/@m:val) = 0)"></xsl:when>\n        <xsl:when test="string-length($ndLastChr/@m:val) &gt;= 1">\n          <xsl:value-of select="substring($ndLastChr/@m:val,1,1)" />\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:text>&#x023DF;</xsl:text>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$sLowerCasePos = \'top\'">\n        <xsl:choose>\n          <xsl:when test="$sLowerCaseVertJc = \'bot\'">\n            <mml:mover accent="false">\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n            </mml:mover>\n          </xsl:when>\n          <xsl:otherwise>\n            <mml:munder accentunder="false">\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n            </mml:munder>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:choose>\n          <xsl:when test="$sLowerCaseVertJc = \'bot\'">\n            <mml:mover accent="false">\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n            </mml:mover>\n          </xsl:when>\n          <xsl:otherwise>\n            <mml:munder accentunder="false">\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n            </mml:munder>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template name="fName">\n    <xsl:for-each select="m:fName/*">\n      <xsl:apply-templates select="." />\n    </xsl:for-each>\n  </xsl:template>\n\n  <xsl:template match="m:func">\n    <mml:mrow>\n      <mml:mrow>\n        <xsl:call-template name="fName" />\n      </mml:mrow>\n      <mml:mo>&#x02061;</mml:mo>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e" />\n      </mml:mrow>\n    </mml:mrow>\n  </xsl:template>\n\n  \x3c!-- %%Template: match m:f\n\n\t\tm:f maps directly to mfrac.\n\t--\x3e\n  <xsl:template match="m:f">\n    <xsl:variable name="sLowerCaseType" select="translate(m:fPr[last()]/m:type/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\', \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:choose>\n      <xsl:when test="$sLowerCaseType=\'lin\'">\n        <mml:mrow>\n          <mml:mrow>\n            <xsl:apply-templates select="m:num[1]" />\n          </mml:mrow>\n          <mml:mo>/</mml:mo>\n          <mml:mrow>\n            <xsl:apply-templates select="m:den[1]" />\n          </mml:mrow>\n        </mml:mrow>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:mfrac>\n          <xsl:call-template name="CreateMathMLFracProp">\n            <xsl:with-param name="type" select="$sLowerCaseType" />\n          </xsl:call-template>\n          <mml:mrow>\n            <xsl:apply-templates select="m:num[1]" />\n          </mml:mrow>\n          <mml:mrow>\n            <xsl:apply-templates select="m:den[1]" />\n          </mml:mrow>\n        </mml:mfrac>\n      </xsl:otherwise>\n    </xsl:choose>\n\n  </xsl:template>\n\n\n  \x3c!-- %%Template: CreateMathMLFracProp\n\n\t\t\tMake fraction properties based on supplied parameters.\n\t\t\tOMML differentiates between a linear fraction and a skewed\n\t\t\tone. For MathML, we write both as bevelled.\n\t--\x3e\n  <xsl:template name="CreateMathMLFracProp">\n    <xsl:param name="type" />\n    <xsl:variable name="sLowerCaseType" select="translate($type, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\', \'abcdefghijklmnopqrstuvwxyz\')" />\n\n    <xsl:if test="$sLowerCaseType=\'skw\' or $sLowerCaseType=\'lin\'">\n      <xsl:attribute name="bevelled">true</xsl:attribute>\n    </xsl:if>\n    <xsl:if test="$sLowerCaseType=\'nobar\'">\n      <xsl:attribute name="linethickness">0pt</xsl:attribute>\n    </xsl:if>\n    <xsl:choose>\n      <xsl:when test="sLowerCaseNumJc=\'right\'">\n        <xsl:attribute name="numalign">right</xsl:attribute>\n      </xsl:when>\n      <xsl:when test="sLowerCaseNumJc=\'left\'">\n        <xsl:attribute name="numalign">left</xsl:attribute>\n      </xsl:when>\n    </xsl:choose>\n    <xsl:choose>\n      <xsl:when test="sLowerCaseDenJc=\'right\'">\n        <xsl:attribute name="numalign">right</xsl:attribute>\n      </xsl:when>\n      <xsl:when test="sLowerCaseDenJc=\'left\'">\n        <xsl:attribute name="numalign">left</xsl:attribute>\n      </xsl:when>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template: match m:e | m:den | m:num | m:lim | m:sup | m:sub\n\n\t\tThese element delinate parts of an expression (like the numerator).  --\x3e\n  <xsl:template match="m:e | m:den | m:num | m:lim | m:sup | m:sub">\n    <xsl:choose>\n\n      \x3c!-- If there is no scriptLevel specified, just call through --\x3e\n      <xsl:when test="not(m:argPr[last()]/m:scrLvl/@m:val)">\n        <xsl:apply-templates select="*" />\n      </xsl:when>\n\n      \x3c!-- Otherwise, create an mstyle and set the script level --\x3e\n      <xsl:otherwise>\n        <mml:mstyle>\n          <xsl:attribute name="scriptlevel">\n            <xsl:value-of select="m:argPr[last()]/m:scrLvl/@m:val" />\n          </xsl:attribute>\n          <xsl:apply-templates select="*" />\n        </mml:mstyle>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:bar">\n    <xsl:variable name="sLowerCasePos" select="translate(m:barPr/m:pos/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                       \'abcdefghijklmnopqrstuvwxyz\')" />\n\n    <xsl:variable name="fTop">\n\n      <xsl:choose>\n        <xsl:when test="$sLowerCasePos=\'top\'">1</xsl:when>\n        <xsl:otherwise>0</xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$fTop=1">\n        <mml:mover accent="false">\n          <mml:mrow>\n            <xsl:apply-templates select="m:e[1]" />\n          </mml:mrow>\n          <mml:mo>\n            <xsl:text>&#x00AF;</xsl:text>\n          </mml:mo>\n        </mml:mover>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:munder underaccent="false">\n          <mml:mrow>\n            <xsl:apply-templates select="m:e[1]" />\n          </mml:mrow>\n          <mml:mo>\n            <xsl:text>&#x005F;</xsl:text>\n          </mml:mo>\n        </mml:munder>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template match m:d\n\n\t\tProcess a delimiter.\n\t--\x3e\n  <xsl:template match="m:d">\n    <mml:mfenced>\n      \x3c!-- open: default is \'(\' for both OMML and MathML --\x3e\n      <xsl:if test="m:dPr[1]/m:begChr/@m:val and not(m:dPr[1]/m:begChr/@m:val =\'(\')">\n        <xsl:attribute name="open">\n          <xsl:value-of select="m:dPr[1]/m:begChr/@m:val" />\n        </xsl:attribute>\n      </xsl:if>\n\n      \x3c!-- close: default is \')\' for both OMML and MathML --\x3e\n      <xsl:if test="m:dPr[1]/m:endChr/@m:val and not(m:dPr[1]/m:endChr/@m:val =\')\')">\n        <xsl:attribute name="close">\n          <xsl:value-of select="m:dPr[1]/m:endChr/@m:val" />\n        </xsl:attribute>\n      </xsl:if>\n\n      \x3c!-- separator: the default is \',\' for MathML, and \'|\' for OMML --\x3e\n      <xsl:choose>\n        \x3c!-- Matches MathML default. Write nothing --\x3e\n        <xsl:when test="m:dPr[1]/m:sepChr/@m:val = \',\'" />\n\n        \x3c!-- OMML default: | --\x3e\n        <xsl:when test="not(m:dPr[1]/m:sepChr/@m:val)">\n          <xsl:attribute name="separators">\n            <xsl:value-of select="\'|\'" />\n          </xsl:attribute>\n        </xsl:when>\n\n        <xsl:otherwise>\n          <xsl:attribute name="separators">\n            <xsl:value-of select="m:dPr[1]/m:sepChr/@m:val" />\n          </xsl:attribute>\n        </xsl:otherwise>\n      </xsl:choose>\n\n      \x3c!-- now write all the children. Put each one into an mrow\n\t\t\tjust in case it produces multiple runs, etc --\x3e\n      <xsl:for-each select="m:e">\n        <mml:mrow>\n          <xsl:apply-templates select="." />\n        </mml:mrow>\n      </xsl:for-each>\n    </mml:mfenced>\n  </xsl:template>\n\n  <xsl:template match="m:r">\n    <xsl:variable name="fNor">\n      <xsl:choose>\n        <xsl:when test="count(child::m:rPr[last()]/m:nor) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="translate(child::m:rPr[last()]/m:nor/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                       \'abcdefghijklmnopqrstuvwxyz\')" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:choose>\n      <xsl:when test="$fNor=1">\n        <mml:mtext>\n          <xsl:variable name="sOutput" select="translate(.//m:t, \' \', \'&#xa0;\')" />\n          <xsl:value-of select="$sOutput" />\n        </mml:mtext>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:for-each select=".//m:t">\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="text()" />\n            <xsl:with-param name="scr" select="../m:rPr[last()]/m:scr/@m:val" />\n            <xsl:with-param name="sty" select="../m:rPr[last()]/m:sty/@m:val" />\n            <xsl:with-param name="nor">0</xsl:with-param>\n          </xsl:call-template>\n        </xsl:for-each>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n\n  <xsl:template name="CreateTokenAttributes">\n    <xsl:param name="scr" />\n    <xsl:param name="sty" />\n    <xsl:param name="nor" />\n    <xsl:param name="nCharToPrint" />\n    <xsl:param name="sTokenType" />\n\n    <xsl:choose>\n      <xsl:when test="$nor=1">\n        <xsl:attribute name="mathvariant">normal</xsl:attribute>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:variable name="mathvariant">\n          <xsl:choose>\n            \x3c!-- numbers don\'t care --\x3e\n            <xsl:when test="$sTokenType=\'mn\'" />\n\n            <xsl:when test="$scr=\'monospace\'">monospace</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\' and $sty=\'i\'">sans-serif-italic</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\' and $sty=\'b\'">bold-sans-serif</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\' and $sty=\'bi\'">sans-serif-bold-italic</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\'">sans-serif</xsl:when>\n            <xsl:when test="$scr=\'fraktur\' and ($sty=\'b\' or $sty=\'bi\')">bold-fraktur</xsl:when>\n            <xsl:when test="$scr=\'fraktur\'">fraktur</xsl:when>\n            <xsl:when test="$scr=\'double-struck\'">double-struck</xsl:when>\n            <xsl:when test="$scr=\'script\' and ($sty=\'b\' or $sty=\'bi\')">bold-script</xsl:when>\n            <xsl:when test="$scr=\'script\'">script</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'b\'">bold</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'i\'">italic</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'p\'">normal</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'bi\'">bold-italic</xsl:when>\n            <xsl:otherwise />\n          </xsl:choose>\n        </xsl:variable>\n        <xsl:variable name="fontweight">\n          <xsl:choose>\n            <xsl:when test="$sty=\'b\' or $sty=\'bi\'">bold</xsl:when>\n            <xsl:otherwise>normal</xsl:otherwise>\n          </xsl:choose>\n        </xsl:variable>\n        <xsl:variable name="fontstyle">\n          <xsl:choose>\n            <xsl:when test="$sty=\'p\' or $sty=\'b\'">normal</xsl:when>\n            <xsl:otherwise>italic</xsl:otherwise>\n          </xsl:choose>\n        </xsl:variable>\n\n        \x3c!-- Writing of attributes begins here --\x3e\n        <xsl:choose>\n          \x3c!-- Don\'t write mathvariant for operators unless they want to be normal --\x3e\n          <xsl:when test="$sTokenType=\'mo\' and $mathvariant!=\'normal\'" />\n\n          \x3c!-- A single character within an mi is already italics, don\'t write --\x3e\n          <xsl:when test="$sTokenType=\'mi\' and $nCharToPrint=1 and ($mathvariant=\'\' or $mathvariant=\'italic\')" />\n\n          <xsl:when test="$sTokenType=\'mi\' and $nCharToPrint &gt; 1 and ($mathvariant=\'\' or $mathvariant=\'italic\')">\n            <xsl:attribute name="mathvariant">\n              <xsl:value-of select="\'italic\'" />\n            </xsl:attribute>\n          </xsl:when>\n          <xsl:when test="$mathvariant!=\'italic\' and $mathvariant!=\'\'">\n            <xsl:attribute name="mathvariant">\n              <xsl:value-of select="$mathvariant" />\n            </xsl:attribute>\n          </xsl:when>\n          <xsl:otherwise>\n            <xsl:if test="not($sTokenType=\'mi\' and $nCharToPrint=1) and $fontstyle=\'italic\'">\n              <xsl:attribute name="fontstyle">italic</xsl:attribute>\n            </xsl:if>\n            <xsl:if test="$fontweight=\'bold\'">\n              <xsl:attribute name="fontweight">bold</xsl:attribute>\n            </xsl:if>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:eqArr">\n    <mml:mtable>\n      <xsl:for-each select="m:e">\n        <mml:mtr>\n          <mml:mtd>\n            <xsl:choose>\n              <xsl:when test="m:argPr[last()]/m:scrLvl/@m:val!=\'0\' or\n\t\t\t\t\t            not(m:argPr[last()]/m:scrLvl/@m:val)  or\n\t\t\t\t\t            m:argPr[last()]/m:scrLvl/@m:val=\'\'">\n                <mml:mrow>\n                  <mml:maligngroup />\n                  <xsl:call-template name="CreateEqArrRow">\n                    <xsl:with-param name="align" select="1" />\n                    <xsl:with-param name="ndCur" select="*[1]" />\n                  </xsl:call-template>\n                </mml:mrow>\n              </xsl:when>\n              <xsl:otherwise>\n                <mml:mstyle>\n                  <xsl:attribute name="scriptlevel">\n                    <xsl:value-of select="m:argPr[last()]/m:scrLvl/@m:val" />\n                  </xsl:attribute>\n                  <mml:maligngroup />\n                  <xsl:call-template name="CreateEqArrRow">\n                    <xsl:with-param name="align" select="1" />\n                    <xsl:with-param name="ndCur" select="*[1]" />\n                  </xsl:call-template>\n                </mml:mstyle>\n              </xsl:otherwise>\n            </xsl:choose>\n          </mml:mtd>\n        </mml:mtr>\n      </xsl:for-each>\n    </mml:mtable>\n  </xsl:template>\n\n  <xsl:template name="CreateEqArrRow">\n    <xsl:param name="align" />\n    <xsl:param name="ndCur" />\n    <xsl:variable name="sAllMt">\n      <xsl:for-each select="$ndCur/m:t">\n        <xsl:value-of select="." />\n      </xsl:for-each>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$ndCur/self::m:r">\n        <xsl:call-template name="ParseEqArrMr">\n          <xsl:with-param name="sToParse" select="$sAllMt" />\n          <xsl:with-param name="scr" select="../m:rPr[last()]/m:scr/@m:val" />\n          <xsl:with-param name="sty" select="../m:rPr[last()]/m:sty/@m:val" />\n          <xsl:with-param name="nor">\n            <xsl:choose>\n              <xsl:when test="count($ndCur/m:rPr[last()]/m:nor) = 0">0</xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="ForceFalseStrVal">\n                  <xsl:with-param name="str" select="translate($ndCur/m:rPr[last()]/m:nor/@m:val,\n                                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                 \'abcdefghijklmnopqrstuvwxyz\')" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:with-param>\n          <xsl:with-param name="align" select="$align" />\n        </xsl:call-template>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:apply-templates select="$ndCur" />\n      </xsl:otherwise>\n    </xsl:choose>\n    <xsl:if test="count($ndCur/following-sibling::*) &gt; 0">\n      <xsl:variable name="cAmp">\n        <xsl:call-template name="CountAmp">\n          <xsl:with-param name="sAllMt" select="$sAllMt" />\n          <xsl:with-param name="cAmp" select="0" />\n        </xsl:call-template>\n      </xsl:variable>\n      <xsl:call-template name="CreateEqArrRow">\n        <xsl:with-param name="align" select="($align+($cAmp mod 2)) mod 2" />\n        <xsl:with-param name="ndCur" select="$ndCur/following-sibling::*[1]" />\n      </xsl:call-template>\n    </xsl:if>\n  </xsl:template>\n\n  <xsl:template name="CountAmp">\n    <xsl:param name="sAllMt" />\n    <xsl:param name="cAmp" />\n    <xsl:choose>\n      <xsl:when test="string-length(substring-after($sAllMt, \'&amp;\')) &gt; 0 or\n\t\t\t                substring($sAllMt, string-length($sAllMt))=\'&#x0026;\'">\n        <xsl:call-template name="CountAmp">\n          <xsl:with-param name="sAllMt" select="substring-after($sAllMt, \'&#x0026;\')" />\n          <xsl:with-param name="cAmp" select="$cAmp+1" />\n        </xsl:call-template>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:value-of select="$cAmp" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template: ParseEqArrMr\n\n\t\t\tSimilar to ParseMt, but this one has to do more for an equation array.\n      In equation arrays &amp; is a special character which denotes alignment.\n\n      The &amp; in an equation works by alternating between meaning insert alignment spacing\n      and insert alignment mark.  For each equation in the equation array\n      there is an implied align space at the beginning of the equation.  Within each equation,\n      the first &amp; means alignmark, the second, align space, the third, alignmark, etc.\n\n      For this reason when parsing m:r\'s in equation arrays it is important to keep track of what\n      the next ampersand will mean.\n\n      $align=0 => Omml\'s align space, which is similar to MathML\'s maligngroup.\n      $align=1 => Omml\'s alignment mark, which is similar to MathML\'s malignmark.\n\t--\x3e\n  <xsl:template name="ParseEqArrMr">\n    <xsl:param name="sToParse" />\n    <xsl:param name="sty" />\n    <xsl:param name="scr" />\n    <xsl:param name="nor" />\n    <xsl:param name="align" />\n\n    <xsl:if test="string-length($sToParse) &gt; 0">\n      <xsl:choose>\n        <xsl:when test="substring($sToParse,1,1) = \'&amp;\'">\n          <xsl:choose>\n            <xsl:when test="$align=\'0\'">\n              <mml:maligngroup />\n            </xsl:when>\n            <xsl:when test="$align=\'1\'">\n              <mml:malignmark />\n            </xsl:when>\n          </xsl:choose>\n          <xsl:call-template name="ParseEqArrMr">\n            <xsl:with-param name="sToParse" select="substring($sToParse,2)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n            <xsl:with-param name="align">\n              <xsl:choose>\n                <xsl:when test="$align=\'1\'">0</xsl:when>\n                <xsl:otherwise>1</xsl:otherwise>\n              </xsl:choose>\n            </xsl:with-param>\n          </xsl:call-template>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:variable name="sRepNumWith0">\n            <xsl:call-template name="SReplaceNumWithZero">\n              <xsl:with-param name="sToParse" select="$sToParse" />\n            </xsl:call-template>\n          </xsl:variable>\n          <xsl:variable name="sRepOperWith-">\n            <xsl:call-template name="SReplaceOperWithMinus">\n              <xsl:with-param name="sToParse" select="$sRepNumWith0" />\n            </xsl:call-template>\n          </xsl:variable>\n\n          <xsl:variable name="iFirstOper" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'-\'))" />\n          <xsl:variable name="iFirstNum" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'0\'))" />\n          <xsl:variable name="iFirstAmp" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'&#x0026;\'))" />\n          <xsl:variable name="fNumAtPos1">\n            <xsl:choose>\n              <xsl:when test="substring($sRepOperWith-,1,1)=\'0\'">1</xsl:when>\n              <xsl:otherwise>0</xsl:otherwise>\n            </xsl:choose>\n          </xsl:variable>\n          <xsl:variable name="fOperAtPos1">\n            <xsl:choose>\n              <xsl:when test="substring($sRepOperWith-,1,1)=\'-\'">1</xsl:when>\n              <xsl:otherwise>0</xsl:otherwise>\n            </xsl:choose>\n          </xsl:variable>\n          <xsl:choose>\n\n            \x3c!-- Case I: The string begins with neither a number, nor an operator --\x3e\n            <xsl:when test="$fNumAtPos1=\'0\' and $fOperAtPos1=\'0\'">\n              <xsl:choose>\n                <xsl:when test="$nor = 0">\n                  <mml:mi>\n                    <xsl:call-template name="CreateTokenAttributes">\n                      <xsl:with-param name="scr" select="$scr" />\n                      <xsl:with-param name="sty" select="$sty" />\n                      <xsl:with-param name="nor" select="$nor" />\n                      <xsl:with-param name="nCharToPrint" select="1" />\n                      <xsl:with-param name="sTokenType" select="\'mi\'" />\n                    </xsl:call-template>\n                    <xsl:variable name="sOutput" select="translate(substring($sToParse, 1, 1), \' \', \'&#xa0;\')" />\n                    <xsl:value-of select="$sOutput" />\n                  </mml:mi>\n                </xsl:when>\n                <xsl:otherwise>\n                  <mml:mtext>\n                    <xsl:variable name="sOutput" select="translate(substring($sToParse, 1, 1), \' \', \'&#xa0;\')" />\n                    <xsl:value-of select="$sOutput" />\n                  </mml:mtext>\n                </xsl:otherwise>\n              </xsl:choose>\n              <xsl:call-template name="ParseEqArrMr">\n                <xsl:with-param name="sToParse" select="substring($sToParse, 2)" />\n                <xsl:with-param name="scr" select="$scr" />\n                <xsl:with-param name="sty" select="$sty" />\n                <xsl:with-param name="nor" select="$nor" />\n                <xsl:with-param name="align" select="$align" />\n              </xsl:call-template>\n            </xsl:when>\n\n            \x3c!-- Case II: There is an operator at position 1 --\x3e\n            <xsl:when test="$fOperAtPos1=\'1\'">\n              <xsl:choose>\n                <xsl:when test="$nor = 0">\n                  <mml:mo>\n                    <xsl:call-template name="CreateTokenAttributes">\n                      <xsl:with-param name="scr" />\n                      <xsl:with-param name="sty" />\n                      <xsl:with-param name="nor" select="$nor" />\n                      <xsl:with-param name="sTokenType" select="\'mo\'" />\n                    </xsl:call-template>\n                    <xsl:value-of select="substring($sToParse,1,1)" />\n                  </mml:mo>\n                </xsl:when>\n                <xsl:otherwise>\n                  <mml:mtext>\n                    <xsl:value-of select="substring($sToParse,1,1)" />\n                  </mml:mtext>\n                </xsl:otherwise>\n              </xsl:choose>\n              <xsl:call-template name="ParseEqArrMr">\n                <xsl:with-param name="sToParse" select="substring($sToParse, 2)" />\n                <xsl:with-param name="scr" select="$scr" />\n                <xsl:with-param name="sty" select="$sty" />\n                <xsl:with-param name="nor" select="$nor" />\n                <xsl:with-param name="align" select="$align" />\n              </xsl:call-template>\n            </xsl:when>\n\n            \x3c!-- Case III: There is a number at position 1 --\x3e\n            <xsl:otherwise>\n              <xsl:variable name="sConsecNum">\n                <xsl:call-template name="SNumStart">\n                  <xsl:with-param name="sToParse" select="$sToParse" />\n                  <xsl:with-param name="sPattern" select="$sRepNumWith0" />\n                </xsl:call-template>\n              </xsl:variable>\n              <xsl:choose>\n                <xsl:when test="$nor = 0">\n                  <mml:mn>\n                    <xsl:call-template name="CreateTokenAttributes">\n                      <xsl:with-param name="scr" />\n                      <xsl:with-param name="sty" select="\'p\'"/>\n                      <xsl:with-param name="nor" select="$nor" />\n                      <xsl:with-param name="sTokenType" select="\'mn\'" />\n                    </xsl:call-template>\n                    <xsl:value-of select="$sConsecNum" />\n                  </mml:mn>\n                </xsl:when>\n                <xsl:otherwise>\n                  <mml:mtext>\n                    <xsl:value-of select="$sConsecNum" />\n                  </mml:mtext>\n                </xsl:otherwise>\n              </xsl:choose>\n              <xsl:call-template name="ParseEqArrMr">\n                <xsl:with-param name="sToParse" select="substring-after($sToParse, $sConsecNum)" />\n                <xsl:with-param name="scr" select="$scr" />\n                <xsl:with-param name="sty" select="$sty" />\n                <xsl:with-param name="nor" select="$nor" />\n                <xsl:with-param name="align" select="$align" />\n              </xsl:call-template>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:if>\n  </xsl:template>\n\n  \x3c!-- %%Template: ParseMt\n\n\t\t\tProduce a run of text. Technically, OMML makes no distinction\n\t\t\tbetween numbers, operators, and other characters in a run. For\n\t\t\tMathML we need to break these into mi, mn, or mo elements.\n\n\t\t\tSee also ParseEqArrMr\n\t--\x3e\n  <xsl:template name="ParseMt">\n    <xsl:param name="sToParse" />\n    <xsl:param name="sty" />\n    <xsl:param name="scr" />\n    <xsl:param name="nor" />\n    <xsl:if test="string-length($sToParse) &gt; 0">\n      <xsl:variable name="sRepNumWith0">\n        <xsl:call-template name="SReplaceNumWithZero">\n          <xsl:with-param name="sToParse" select="$sToParse" />\n        </xsl:call-template>\n      </xsl:variable>\n      <xsl:variable name="sRepOperWith-">\n        <xsl:call-template name="SReplaceOperWithMinus">\n          <xsl:with-param name="sToParse" select="$sRepNumWith0" />\n        </xsl:call-template>\n      </xsl:variable>\n\n      <xsl:variable name="iFirstOper" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'-\'))" />\n      <xsl:variable name="iFirstNum" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'0\'))" />\n      <xsl:variable name="fNumAtPos1">\n        <xsl:choose>\n          <xsl:when test="substring($sRepOperWith-,1,1)=\'0\'">1</xsl:when>\n          <xsl:otherwise>0</xsl:otherwise>\n        </xsl:choose>\n      </xsl:variable>\n      <xsl:variable name="fOperAtPos1">\n        <xsl:choose>\n          <xsl:when test="substring($sRepOperWith-,1,1)=\'-\'">1</xsl:when>\n          <xsl:otherwise>0</xsl:otherwise>\n        </xsl:choose>\n      </xsl:variable>\n\n      <xsl:choose>\n\n        \x3c!-- Case I: The string begins with neither a number, nor an operator --\x3e\n        <xsl:when test="$fOperAtPos1=\'0\' and $fNumAtPos1=\'0\'">\n          <xsl:variable name="nCharToPrint">\n            <xsl:choose>\n              <xsl:when test="ancestor::m:fName">\n                <xsl:choose>\n                  <xsl:when test="($iFirstOper=$iFirstNum) and\n\t\t\t\t\t\t\t\t\t\t\t($iFirstOper=string-length($sToParse)) and\n\t\t\t\t\t\t\t                (substring($sRepOperWith-, string-length($sRepOperWith-))!=\'0\') and\n\t\t\t\t\t\t\t                (substring($sRepOperWith-, string-length($sRepOperWith-))!=\'-\')">\n                    <xsl:value-of select="string-length($sToParse)" />\n                  </xsl:when>\n                  <xsl:when test="$iFirstOper &lt; $iFirstNum">\n                    <xsl:value-of select="$iFirstOper - 1" />\n                  </xsl:when>\n                  <xsl:otherwise>\n                    <xsl:value-of select="$iFirstNum - 1" />\n                  </xsl:otherwise>\n                </xsl:choose>\n              </xsl:when>\n              <xsl:otherwise>1</xsl:otherwise>\n            </xsl:choose>\n          </xsl:variable>\n\n          <mml:mi>\n            <xsl:call-template name="CreateTokenAttributes">\n              <xsl:with-param name="scr" select="$scr" />\n              <xsl:with-param name="sty" select="$sty" />\n              <xsl:with-param name="nor" select="$nor" />\n              <xsl:with-param name="nCharToPrint" select="$nCharToPrint" />\n              <xsl:with-param name="sTokenType" select="\'mi\'" />\n            </xsl:call-template>\n            <xsl:variable name="sWrite" select="translate(substring($sToParse, 1, $nCharToPrint), \' \', \'&#xa0;\')" />\n            <xsl:value-of select="$sWrite" />\n          </mml:mi>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="substring($sToParse, $nCharToPrint+1)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n          </xsl:call-template>\n        </xsl:when>\n\n        \x3c!-- Case II: There is an operator at position 1 --\x3e\n        <xsl:when test="$fOperAtPos1=\'1\'">\n          <mml:mo>\n            <xsl:call-template name="CreateTokenAttributes">\n              <xsl:with-param name="scr" />\n              <xsl:with-param name="sty" />\n              <xsl:with-param name="nor" select="$nor" />\n              <xsl:with-param name="sTokenType" select="\'mo\'" />\n            </xsl:call-template>\n            <xsl:value-of select="substring($sToParse,1,1)" />\n          </mml:mo>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="substring($sToParse, 2)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n          </xsl:call-template>\n        </xsl:when>\n\n        \x3c!-- Case III: There is a number at position 1 --\x3e\n        <xsl:otherwise>\n          <xsl:variable name="sConsecNum">\n            <xsl:call-template name="SNumStart">\n              <xsl:with-param name="sToParse" select="$sToParse" />\n              <xsl:with-param name="sPattern" select="$sRepNumWith0" />\n            </xsl:call-template>\n          </xsl:variable>\n          <mml:mn>\n            <xsl:call-template name="CreateTokenAttributes">\n              <xsl:with-param name="scr" select="$scr" />\n              <xsl:with-param name="sty" select="\'p\'" />\n              <xsl:with-param name="nor" select="$nor" />\n              <xsl:with-param name="sTokenType" select="\'mn\'" />\n            </xsl:call-template>\n            <xsl:value-of select="$sConsecNum" />\n          </mml:mn>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="substring-after($sToParse, $sConsecNum)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:if>\n  </xsl:template>\n\n  \x3c!-- %%Template: SNumStart\n\n\t\tReturn the longest substring of sToParse starting from the\n\t\tstart of sToParse that is a number. In addition, it takes the\n\t\tpattern string, which is sToParse with all of its numbers\n\t\treplaced with a 0. sPattern should be the same length\n\t\tas sToParse\n\t--\x3e\n  <xsl:template name="SNumStart">\n    <xsl:param name="sToParse" select="\'\'" />\n    \x3c!-- if we don\'t get anything, take the string itself --\x3e\n    <xsl:param name="sPattern" select="\'$sToParse\'" />\n\n\n    <xsl:choose>\n      \x3c!-- the pattern says this is a number, recurse with the rest --\x3e\n      <xsl:when test="substring($sPattern, 1, 1) = \'0\'">\n        <xsl:call-template name="SNumStart">\n          <xsl:with-param name="sToParse" select="$sToParse" />\n          <xsl:with-param name="sPattern" select="substring($sPattern, 2)" />\n        </xsl:call-template>\n      </xsl:when>\n\n      \x3c!-- the pattern says we\'ve run out of numbers. Take as many\n\t\t\t\tcharacters from sToParse as we shaved off sPattern --\x3e\n      <xsl:otherwise>\n        <xsl:value-of select="substring($sToParse, 1, string-length($sToParse) - string-length($sPattern))" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template SRepeatCharAcc\n\n\t\t\tThe core of SRepeatChar with an accumulator. The current\n\t\t\tstring is in param $acc, and we will double and recurse,\n\t\t\tif we\'re less than half of the required length or else just\n\t\t\tadd the right amount of characters to the accumulator and\n\t\t\treturn\n\t--\x3e\n  <xsl:template name="SRepeatCharAcc">\n    <xsl:param name="cchRequired" select="1" />\n    <xsl:param name="ch" select="\'-\'" />\n    <xsl:param name="acc" select="$ch" />\n\n    <xsl:variable name="cchAcc" select="string-length($acc)" />\n    <xsl:choose>\n      <xsl:when test="(2 * $cchAcc) &lt; $cchRequired">\n        <xsl:call-template name="SRepeatCharAcc">\n          <xsl:with-param name="cchRequired" select="$cchRequired" />\n          <xsl:with-param name="ch" select="$ch" />\n          <xsl:with-param name="acc" select="concat($acc, $acc)" />\n        </xsl:call-template>\n      </xsl:when>\n\n      <xsl:otherwise>\n        <xsl:value-of select="concat($acc, substring($acc, 1, $cchRequired - $cchAcc))" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n\n  \x3c!-- %%Template SRepeatChar\n\n\t\t\tGenerates a string nchRequired long by repeating the given character ch\n\t--\x3e\n  <xsl:template name="SRepeatChar">\n    <xsl:param name="cchRequired" select="1" />\n    <xsl:param name="ch" select="\'-\'" />\n\n    <xsl:call-template name="SRepeatCharAcc">\n      <xsl:with-param name="cchRequired" select="$cchRequired" />\n      <xsl:with-param name="ch" select="$ch" />\n      <xsl:with-param name="acc" select="$ch" />\n    </xsl:call-template>\n  </xsl:template>\n\n  \x3c!-- %%Template SReplaceOperWithMinus\n\n\t\tGo through the given string and replace every instance\n\t\tof an operator with a minus \'-\'. This helps quickly identify\n\t\tthe first instance of an operator.\n\t--\x3e\n  <xsl:template name="SReplaceOperWithMinus">\n    <xsl:param name="sToParse" select="\'\'" />\n\n    <xsl:value-of select="translate($sToParse, $sOperators, $sMinuses)" />\n  </xsl:template>\n\n  \x3c!-- %%Template SReplaceNumWithZero\n\n\t\tGo through the given string and replace every instance\n\t\tof an number with a zero \'0\'. This helps quickly identify\n\t\tthe first occurence of a number.\n\n\t\tConsiders the \'.\' and \',\' part of a number iff they are sandwiched\n\t\tbetween two other numbers. 0.3 will be recognized as a number,\n\t\tx.3 will not be. Since these characters can also be an operator, this\n\t\tshould be called before SReplaceOperWithMinus.\n\t--\x3e\n  <xsl:template name="SReplaceNumWithZero">\n    <xsl:param name="sToParse" select="\'\'" />\n\n    \x3c!-- First do a simple replace. Numbers will all be come 0\'s.\n\t\t\tAfter this point, the pattern involving the . or , that\n\t\t\twe are looking for will become 0.0 or 0,0 --\x3e\n    <xsl:variable name="sSimpleReplace" select="translate($sToParse, $sNumbers, $sZeros)" />\n\n    \x3c!-- And then, replace 0.0 with just 000. This means that the . will\n\t\t\tbecome part of the number --\x3e\n    <xsl:variable name="sReplacePeriod">\n      <xsl:call-template name="SReplace">\n        <xsl:with-param name="sInput" select="$sSimpleReplace" />\n        <xsl:with-param name="sOrig" select="\'0.0\'" />\n        <xsl:with-param name="sReplacement" select="\'000\'" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    \x3c!-- And then, replace 0,0 with just 000. This means that the , will\n\t\t\tbecome part of the number --\x3e\n    <xsl:call-template name="SReplace">\n      <xsl:with-param name="sInput" select="$sReplacePeriod" />\n      <xsl:with-param name="sOrig" select="\'0,0\'" />\n      <xsl:with-param name="sReplacement" select="\'000\'" />\n    </xsl:call-template>\n  </xsl:template>\n\n  \x3c!-- Template to translate Word\'s borderBox properties into the menclose notation attribute\n       The initial call to this SHOULD NOT pass an sAttribute.  Subsequent calls to\n       CreateMencloseNotationAttrFromBorderBoxAttr by CreateMencloseNotationAttrFromBorderBoxAttr will\n       update the sAttribute as appropriate.\n\n       CreateMencloseNotationAttrFromBorderBoxAttr looks at each attribute (fHideTop, fHideBot, etc.) one at a time\n       in the order they are listed and passes a modified sAttribute to CreateMencloseNotationAttrFromBorderBoxAttr.\n       Each successive call to CreateMencloseNotationAttrFromBorderBoxAttr knows which attribute to look at because\n       the previous call should have omitted passing the attribute it just analyzed.  This is why as you read lower\n       and lower in the template that each call to CreateMencloseNotationAttrFromBorderBoxAttr has fewer and fewer attributes.\n       --\x3e\n  <xsl:template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n    <xsl:param name="fHideTop" />\n    <xsl:param name="fHideBot" />\n    <xsl:param name="fHideLeft" />\n    <xsl:param name="fHideRight" />\n    <xsl:param name="fStrikeH" />\n    <xsl:param name="fStrikeV" />\n    <xsl:param name="fStrikeBLTR" />\n    <xsl:param name="fStrikeTLBR" />\n    <xsl:param name="sAttribute" />\n\n    <xsl:choose>\n      <xsl:when test="string-length($sAttribute) = 0">\n        <xsl:choose>\n          <xsl:when test="string-length($fHideTop) &gt; 0\n                      and string-length($fHideBot) &gt; 0\n                      and string-length($fHideLeft) &gt; 0\n                      and string-length($fHideRight) &gt; 0">\n\n            <xsl:choose>\n              <xsl:when test="$fHideTop = 0\n                              and $fHideBot = 0\n                              and $fHideLeft = 0\n                              and $fHideRight = 0">\n                \x3c!-- We can use \'box\' instead of top, bot, left, and right.  Therefore,\n                  replace sAttribute with \'box\' and begin analyzing params fStrikeH\n                  and below. --\x3e\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:text>box</xsl:text>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                \x3c!-- Can\'t use \'box\', theremore, must analyze all attributes --\x3e\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideTop" select="$fHideTop" />\n                  <xsl:with-param name="fHideBot" select="$fHideBot" />\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    \x3c!-- Assume using all four (left right top bottom).  Subsequent calls\n                         will remove the sides which aren\'t to be includes. --\x3e\n                    <xsl:text>left right top bottom</xsl:text>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n        </xsl:choose>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:choose>\n          <xsl:when test="string-length($fHideTop) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideTop=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideBot" select="$fHideBot" />\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'top\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideBot" select="$fHideBot" />\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fHideBot) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideBot=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'bottom\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fHideLeft) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideLeft=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'left\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fHideRight) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideRight=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'right\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeH) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeH=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' horizontalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeV) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeV=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' verticalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeBLTR) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeBLTR=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' updiagonalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeTLBR) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeTLBR=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' downdiagonalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:otherwise>\n            <xsl:attribute name="notation">\n              <xsl:value-of select="normalize-space($sAttribute)" />\n            </xsl:attribute>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Tristate (true, false, neither) from string value --\x3e\n  <xsl:template name="TFromStrVal">\n    <xsl:param name="str" />\n    <xsl:choose>\n      <xsl:when test="$str = \'on\' or $str = \'1\' or $str = \'true\'">1</xsl:when>\n      <xsl:when test="$str = \'off\' or $str = \'0\' or $str = \'false\'">0</xsl:when>\n      <xsl:otherwise>-1</xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Return 0 iff $str is explicitly set to a false value.\n       Return true otherwise --\x3e\n  <xsl:template name="ForceFalseStrVal">\n    <xsl:param name="str" />\n    <xsl:variable name="tValue">\n      <xsl:call-template name="TFromStrVal">\n        <xsl:with-param name="str" select="$str"/>\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$tValue = \'0\'">0</xsl:when>\n      <xsl:otherwise>1</xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Return 1 iff $str is explicitly set to a true value.\n       Return false otherwise --\x3e\n  <xsl:template name="ForceTrueStrVal">\n    <xsl:param name="str" />\n    <xsl:variable name="tValue">\n      <xsl:call-template name="TFromStrVal">\n        <xsl:with-param name="str" select="$str"/>\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$tValue = \'1\'">1</xsl:when>\n      <xsl:otherwise>0</xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n</xsl:stylesheet>\n'.trim());t.xsl=l}));
;/*!node_modules/office-viewer/lib/openxml/math/convertOOML.js*/
amis.define("2a0f22e",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("c82928d");r.convertOOXML=function(e){var r=new XSLTProcessor;return r.importStylesheet(o.xsl),r.transformToFragment(e,document)}}));
;/*!node_modules/office-viewer/lib/render/renderMath.js*/
amis.define("3c75237",(function(e,n,t,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var c=e("2a0f22e");n.renderOMath=function(e,n){return c.convertOOXML(n.element)}}));
;/*!node_modules/office-viewer/lib/render/renderParagraph.js*/
amis.define("a4504ab",(function(e,r,a,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("8701f02"),l=e("8d43ec5"),d=e("1050750"),i=e("fb3f8dd"),f=e("7d2ef84"),o=e("1bf9315"),p=e("c81446a"),c=e("277aa0a"),s=e("f4a3418"),u=e("3ce3f91"),h=e("3598160"),v=e("51af8f7"),y=e("3c75237");r.default=function(e,r,a){var n,b,m,C;void 0===a&&(a=!0),e.currentParagraph=r;var k=l.createElement("p");e.addClass(k,"p");var _=r.properties;if(u.setElementStyle(e,k,_),_.numPr&&l.appendChild(k,s.renderNumbering(k,e,_.numPr)),_.tabs)try{for(var M=t.__values(_.tabs),g=M.next();!g.done;g=M.next()){var w=g.value;l.appendChild(k,h.renderTab(e,w))}}catch(e){n={error:e}}finally{try{g&&!g.done&&(b=M.return)&&b.call(M)}finally{if(n)throw n.error}}var x=!1;try{for(var H=t.__values(r.children),P=H.next();!P.done;P=H.next()){var L=P.value;if(L instanceof d.Run)"begin"===L.fldChar?x=!0:L&&(x=!1),l.appendChild(k,o.default(e,L,r,x));else if(L instanceof i.BookmarkStart)l.appendChild(k,c.renderBookmarkStart(e,L));else if(L instanceof f.Hyperlink){var O=p.renderHyperLink(e,L,r);l.appendChild(k,O)}else L instanceof v.OMath?l.appendChild(k,y.renderOMath(e,L)):console.warn("unknow pargraph type",L)}}catch(e){m={error:e}}finally{try{P&&!P.done&&(C=H.return)&&C.call(H)}finally{if(m)throw m.error}}return""===k.innerHTML&&a&&(k.innerHTML="&nbsp;"),k}}));
;/*!node_modules/office-viewer/lib/render/renderSection.js*/
amis.define("260dd27",(function(e,t,i,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var d=e("8d43ec5");t.renderSection=function(e,t){var i=d.createElement("section");i.style.position="relative";var n=t.properties,r=n.pageSize;if(r&&(e.renderOptions.ignoreWidth||(i.style.width=r.width),e.renderOptions.ignoreHeight||(i.style.height=r.height)),e.renderOptions.padding)i.style.padding=e.renderOptions.padding;else{var o=n.pageMargin;o&&(i.style.paddingLeft=o.left||"0",i.style.paddingRight=o.right||"0",i.style.paddingTop=o.top||"0",i.style.paddingBottom=o.bottom||"0")}return i}}));
;/*!node_modules/office-viewer/lib/render/renderBody.js*/
amis.define("984efdc",(function(e,r,a,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("8701f02"),d=e("8d43ec5"),t=e("3e37c25"),f=e("1f7df3d"),i=e("7d2ef84"),o=e("a4504ab"),c=e("260dd27"),u=e("a31f93c");r.default=function(e,r,a){var n,v,p,s;try{for(var h=l.__values(a.sections),y=h.next();!y.done;y=h.next()){var _=y.value,x=c.renderSection(e,_);d.appendChild(r,x);try{for(var C=(p=void 0,l.__values(_.children)),b=C.next();!b.done;b=C.next()){var w=b.value;if(w instanceof t.Paragraph){var P=o.default(e,w);d.appendChild(x,P)}else w instanceof f.Table?d.appendChild(x,u.default(e,w)):i.Hyperlink}}catch(e){p={error:e}}finally{try{b&&!b.done&&(s=C.return)&&s.call(C)}finally{if(p)throw p.error}}d.appendChild(r,x)}}catch(e){n={error:e}}finally{try{y&&!y.done&&(v=h.return)&&v.call(h)}finally{if(n)throw n.error}}}}));
;/*!node_modules/office-viewer/lib/render/renderDocument.js*/
amis.define("1b805fe",(function(e,t,r,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var c=e("8d43ec5"),d=e("984efdc");t.default=function(e,t){var r=c.createElement("article");return d.default(e,r,t.body),r}}));
;/*!node_modules/office-viewer/lib/util/blob.js*/
amis.define("5c71425",(function(e,d,n,o){"use strict";Object.defineProperty(d,"__esModule",{value:!0}),d.downloadBlob=function(e,d){void 0===d&&(d="file.txt");var n=URL.createObjectURL(e),o=document.createElement("a");o.href=n,o.download=d,document.body.appendChild(o),o.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window})),document.body.removeChild(o)}}));
;/*!node_modules/office-viewer/lib/openxml/word/numbering/Lvl.js*/
amis.define("eb681b5",(function(e,a,r,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=e("8701f02"),s=e("1050750"),n=e("f838841"),c=e("3e37c25"),i=function(){function e(){this.start=1,this.lvlText="%1.",this.isLgl=!1,this.lvlJc="start",this.suff="space"}return e.fromXML=function(a,r){var t,i,u=new e;u.ilvl=r.getAttribute("w:ilvl");try{for(var o=l.__values(r.children),v=o.next();!v.done;v=o.next()){var f=v.value,w=f.tagName;switch(w){case"w:start":u.start=n.getValNumber(f);break;case"w:numFmt":u.numFmt=n.getVal(f);break;case"w:lvlText":u.lvlText=n.getVal(f);break;case"w:lvlJc":u.lvlJc=n.getVal(f);break;case"w:legacy":case"w:pStyle":break;case"w:pPr":u.pPr=c.Paragraph.parseParagraphPr(a,f);break;case"w:rPr":u.rPr=s.Run.parseRunPr(a,f);break;case"w:isLgl":u.isLgl=n.getValBoolean(f);break;default:console.warn("Lvl: Unknown tag ",w,f)}}}catch(e){t={error:e}}finally{try{v&&!v.done&&(i=o.return)&&i.call(o)}finally{if(t)throw t.error}}return u},e}();a.Lvl=i}));
;/*!node_modules/office-viewer/lib/openxml/word/numbering/AbstractNum.js*/
amis.define("f4d7208",(function(e,t,r,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("8701f02"),n=e("eb681b5"),u=e("f838841"),i=function(){function e(){this.lvls={}}return e.fromXML=function(t,r){var l,i,v=new e;v.abstractNumId=r.getAttribute("w:abstractNumId")||"",v.multiLevelType=r.getAttribute("w:multiLevelType");var f=r.getElementsByTagName("w:lvl");try{for(var m=a.__values(f),o=m.next();!o.done;o=m.next()){var s=o.value,c=s.getAttribute("w:ilvl")||"";v.lvls[c]=n.Lvl.fromXML(t,s)}}catch(e){l={error:e}}finally{try{o&&!o.done&&(i=m.return)&&i.call(m)}finally{if(l)throw l.error}}var y=r.getElementsByTagName("w:multiLevelType").item(0);return y&&(v.multiLevelType=u.getVal(y)),v},e}();t.AbstractNum=i}));
;/*!node_modules/office-viewer/lib/openxml/word/numbering/Num.js*/
amis.define("8faf628",(function(e,r,t,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("8701f02"),n=e("f838841"),v=e("eb681b5"),i=function(){function e(){this.lvlOverride={lvls:{}}}return e.fromXML=function(r,t){var l,i,u=new e;u.numId=t.getAttribute("w:numId")||"";var s=t.getElementsByTagName("w:abstractNumId").item(0);s&&(u.abstractNumId=n.getVal(s));var d=t.getElementsByTagName("w:lvlOverride").item(0);if(d)try{for(var f=a.__values(d.children),m=f.next();!m.done;m=f.next()){var o=m.value,c=o.tagName;switch(c){case"w:lvl":var w=o.getAttribute("w:lvlId")||"";u.lvlOverride.lvls[w]=v.Lvl.fromXML(r,o);break;case"w:startOverride":var b=o.getAttribute("w:lvlId")||"";u.lvlOverride.lvls[b]&&(u.lvlOverride.lvls[b].start=n.getValNumber(o));break;default:console.warn("Num: Unknown tag ",c,o)}}}catch(e){l={error:e}}finally{try{m&&!m.done&&(i=f.return)&&i.call(f)}finally{if(l)throw l.error}}return u},e}();r.Num=i}));
;/*!node_modules/office-viewer/lib/openxml/word/numbering/Numbering.js*/
amis.define("b712a63",(function(r,t,e,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("8701f02"),u=r("f4d7208"),m=r("8faf628"),f=function(){function r(){this.abstractNums={},this.nums={},this.numData={}}return r.fromXML=function(t,e){var a,f,o,l,s=new r;try{for(var i=n.__values(e.getElementsByTagName("w:abstractNum")),c=i.next();!c.done;c=i.next()){var d=c.value,v=u.AbstractNum.fromXML(t,d);s.abstractNums[v.abstractNumId]=v}}catch(r){a={error:r}}finally{try{c&&!c.done&&(f=i.return)&&f.call(i)}finally{if(a)throw a.error}}try{for(var y=n.__values(e.getElementsByTagName("w:num")),N=y.next();!N.done;N=y.next()){var b=N.value,h=m.Num.fromXML(t,b);s.nums[h.numId]=h,s.numData[h.numId]={}}}catch(r){o={error:r}}finally{try{N&&!N.done&&(l=y.return)&&l.call(y)}finally{if(o)throw o.error}}return s},r}();t.Numbering=f}));
;/*!node_modules/office-viewer/lib/util/mergeRun.js*/
amis.define("239415c",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("8701f02"),l=e("2807318");function o(e,r,t){var n=r?l.parsePr(e,r):{},a=t?l.parsePr(e,t):{};return JSON.stringify(n)===JSON.stringify(a)}function i(e,r){var t=e.getElementsByTagName("w:t")[0],n=r.getElementsByTagName("w:t")[0];if(t&&n){var a=n.textContent||"";t.textContent+=a||""}}function f(e){var r,t,n=e.tagName,l=e.children,o=!1,i=!1;try{for(var f=a.__values(l),u=f.next();!u.done;u=f.next()){var c=u.value;if("w:t"===c.tagName){o=!0,i="preserve"===c.getAttribute("xml:space");break}}}catch(e){r={error:e}}finally{try{u&&!u.done&&(t=f.return)&&t.call(f)}finally{if(r)throw r.error}}return"w:r"===n&&o&&!i}function u(e,r){var t,n,l,u,c=[],s=null;try{for(var v=a.__values(r.children),y=v.next();!y.done;y=v.next()){var g=y.value,m=g.tagName;if(f(g))if(s)o(e,s.getElementsByTagName("w:rPr")[0],g.getElementsByTagName("w:rPr")[0])?i(s,g):(s=g,c.push(g));else s=g,c.push(g);else"w:proofErr"!==m&&(s=null,c.push(g))}}catch(e){t={error:e}}finally{try{y&&!y.done&&(n=v.return)&&n.call(v)}finally{if(t)throw t.error}}r.innerHTML="";try{for(var d=a.__values(c),h=d.next();!h.done;h=d.next()){var p=h.value;r.appendChild(p)}}catch(e){l={error:e}}finally{try{h&&!h.done&&(u=d.return)&&u.call(d)}finally{if(l)throw l.error}}}r.canMerge=f,r.mergeRun=function(e,r){var t,n,l=r.getElementsByTagName("w:p");try{for(var o=a.__values(l),i=o.next();!i.done;i=o.next()){u(e,i.value)}}catch(e){t={error:e}}finally{try{i&&!i.done&&(n=o.return)&&n.call(o)}finally{if(t)throw t.error}}},r.mergeRunInP=u}));
;/*!node_modules/office-viewer/lib/openxml/word/Section.js*/
amis.define("4c3b66a",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=e("8701f02"),o=e("b8eb51e"),n=e("3e37c25"),s=function(){function e(){this.properties={},this.children=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.parsePr=function(e,r,t){var a,s,p={};try{for(var c=i.__values(r.children),f=c.next();!f.done;f=c.next()){var h=f.value;switch(h.tagName){case"w:pgSz":p.pageSize={width:o.parseSize(h,"w:w"),height:o.parseSize(h,"w:h")};break;case"w:pgMar":p.pageMargin={left:o.parseSize(h,"w:left"),right:o.parseSize(h,"w:right"),top:o.parseSize(h,"w:top"),bottom:o.parseSize(h,"w:bottom"),header:o.parseSize(h,"w:header"),footer:o.parseSize(h,"w:footer"),gutter:o.parseSize(h,"w:gutter")};break;case"w:headerReference":var d=h.getAttribute("w:type"),l=h.getAttribute("r:id");if("default"===d&&l){var u=e.getDocumentRels(l);if(u){var g=e.getXML("/word/"+u.target).getElementsByTagName("w:p").item(0);if(g){var w=n.Paragraph.fromXML(e,g);t.addChild(w)}}}}}}catch(e){a={error:e}}finally{try{f&&!f.done&&(s=c.return)&&s.call(c)}finally{if(a)throw a.error}}return p},e}();r.Section=s}));
;/*!node_modules/office-viewer/lib/openxml/word/Body.js*/
amis.define("268c068",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("8701f02"),c=e("9876859"),i=e("dc5cbe5"),o=e("3e37c25"),s=e("4c3b66a"),d=function(){function e(){this.sections=[],this.currentSection=new s.Section,this.sections.push(this.currentSection)}return e.prototype.addChild=function(e){this.currentSection.addChild(e)},e.prototype.addSection=function(e){this.currentSection.properties=e,this.currentSection=new s.Section,this.sections.push(this.currentSection)},e.fromXML=function(r,t){var a,d,l=new e,u=[].slice.call(t.children);try{for(var h=n.__values(u),p=h.next();!p.done;p=h.next()){var f=p.value,w=f.tagName;switch(w){case"w:p":var b=o.Paragraph.fromXML(r,f);l.addChild(b);break;case"w:sectPr":l.addSection(s.Section.parsePr(r,f,l));break;case"w:tbl":var S=i.parseTable(r,f);l.addChild(S);break;case"w:bookmarkStart":case"w:bookmarkEnd":break;case"w:sdt":c.parseSdt(f,u);break;case"w:customXml":u.push.apply(u,n.__spreadArray([],n.__read([].slice.call(f.children)),!1));break;default:console.warn("Body.fromXML Unknown key",w,f)}}}catch(e){a={error:e}}finally{try{p&&!p.done&&(d=h.return)&&d.call(h)}finally{if(a)throw a.error}}return l},e}();r.Body=d}));
;/*!node_modules/office-viewer/lib/openxml/word/WDocument.js*/
amis.define("e23579e",(function(e,r,t,o){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("8701f02"),n=e("428d4e6"),l=e("268c068"),c=function(){function e(){}return e.fromXML=function(r,t){var o,c,m=new e,i=t.getElementsByTagName("w:body").item(0);i&&(m.body=l.Body.fromXML(r,i));var s=t.getElementsByTagName("w:background").item(0);if(s){var h={};try{for(var u=a.__values(s.attributes),f=u.next();!f.done;f=u.next()){switch(f.value.name){case"w:color":h.color=n.parseColorAttr(r,s,"w:color");break;case"w:themeColor":h.themeColor=n.parseColorAttr(r,s,"w:themeColor");break;case"w:themeShade":h.themeShade=n.parseColorAttr(r,s,"w:themeShade");break;case"w:themeTint":h.themeTint=n.parseColorAttr(r,s,"w:themeTint")}}}catch(e){o={error:e}}finally{try{f&&!f.done&&(c=u.return)&&c.call(u)}finally{if(o)throw o.error}}}return m},e}();r.WDocument=c}));
;/*!node_modules/fflate/lib/worker.cjs*/
amis.define('node_modules/fflate/lib/worker.cjs', function(require, exports, module, define) {

  "use strict";
  var ch2 = {};
  exports["default"] = (function (c, id, msg, transfer, cb) {
      var w = new Worker(ch2[id] || (ch2[id] = URL.createObjectURL(new Blob([
          c + ';addEventListener("error",function(e){e=e.error;postMessage({$e$:[e.message,e.code,e.stack]})})'
      ], { type: 'text/javascript' }))));
      w.onmessage = function (e) {
          var d = e.data, ed = d.$e$;
          if (ed) {
              var err = new Error(ed[0]);
              err['code'] = ed[1];
              err.stack = ed[2];
              cb(err, null);
          }
          else
              cb(null, d);
      };
      w.postMessage(msg, transfer);
      return w;
  });
  

});

;/*!node_modules/fflate/lib/index.cjs*/
amis.define('node_modules/fflate/lib/index.cjs', function(require, exports, module, define) {

  "use strict";
  // DEFLATE is a complex format; to read this code, you should probably check the RFC first:
  // https://tools.ietf.org/html/rfc1951
  // You may also wish to take a look at the guide I made about this program:
  // https://gist.github.com/101arrowz/253f31eb5abc3d9275ab943003ffecad
  // Some of the following code is similar to that of UZIP.js:
  // https://github.com/photopea/UZIP.js
  // However, the vast majority of the codebase has diverged from UZIP.js to increase performance and reduce bundle size.
  // Sometimes 0 will appear where -1 would be more appropriate. This is because using a uint
  // is better for memory in most engines (I *think*).
  var node_worker_1 = require("node_modules/fflate/lib/worker.cjs");
  // aliases for shorter compressed code (most minifers don't do this)
  var u8 = Uint8Array, u16 = Uint16Array, u32 = Uint32Array;
  // fixed length extra bits
  var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, /* unused */ 0, 0, /* impossible */ 0]);
  // fixed distance extra bits
  // see fleb note
  var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, /* unused */ 0, 0]);
  // code length index map
  var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
  // get base, reverse index map from extra bits
  var freb = function (eb, start) {
      var b = new u16(31);
      for (var i = 0; i < 31; ++i) {
          b[i] = start += 1 << eb[i - 1];
      }
      // numbers here are at max 18 bits
      var r = new u32(b[30]);
      for (var i = 1; i < 30; ++i) {
          for (var j = b[i]; j < b[i + 1]; ++j) {
              r[j] = ((j - b[i]) << 5) | i;
          }
      }
      return [b, r];
  };
  var _a = freb(fleb, 2), fl = _a[0], revfl = _a[1];
  // we can ignore the fact that the other numbers are wrong; they never happen anyway
  fl[28] = 258, revfl[258] = 28;
  var _b = freb(fdeb, 0), fd = _b[0], revfd = _b[1];
  // map of value to reverse (assuming 16 bits)
  var rev = new u16(32768);
  for (var i = 0; i < 32768; ++i) {
      // reverse table algorithm from SO
      var x = ((i & 0xAAAA) >>> 1) | ((i & 0x5555) << 1);
      x = ((x & 0xCCCC) >>> 2) | ((x & 0x3333) << 2);
      x = ((x & 0xF0F0) >>> 4) | ((x & 0x0F0F) << 4);
      rev[i] = (((x & 0xFF00) >>> 8) | ((x & 0x00FF) << 8)) >>> 1;
  }
  // create huffman tree from u8 "map": index -> code length for code index
  // mb (max bits) must be at most 15
  // TODO: optimize/split up?
  var hMap = (function (cd, mb, r) {
      var s = cd.length;
      // index
      var i = 0;
      // u16 "map": index -> # of codes with bit length = index
      var l = new u16(mb);
      // length of cd must be 288 (total # of codes)
      for (; i < s; ++i) {
          if (cd[i])
              ++l[cd[i] - 1];
      }
      // u16 "map": index -> minimum code for bit length = index
      var le = new u16(mb);
      for (i = 0; i < mb; ++i) {
          le[i] = (le[i - 1] + l[i - 1]) << 1;
      }
      var co;
      if (r) {
          // u16 "map": index -> number of actual bits, symbol for code
          co = new u16(1 << mb);
          // bits to remove for reverser
          var rvb = 15 - mb;
          for (i = 0; i < s; ++i) {
              // ignore 0 lengths
              if (cd[i]) {
                  // num encoding both symbol and bits read
                  var sv = (i << 4) | cd[i];
                  // free bits
                  var r_1 = mb - cd[i];
                  // start value
                  var v = le[cd[i] - 1]++ << r_1;
                  // m is end value
                  for (var m = v | ((1 << r_1) - 1); v <= m; ++v) {
                      // every 16 bit value starting with the code yields the same result
                      co[rev[v] >>> rvb] = sv;
                  }
              }
          }
      }
      else {
          co = new u16(s);
          for (i = 0; i < s; ++i) {
              if (cd[i]) {
                  co[i] = rev[le[cd[i] - 1]++] >>> (15 - cd[i]);
              }
          }
      }
      return co;
  });
  // fixed length tree
  var flt = new u8(288);
  for (var i = 0; i < 144; ++i)
      flt[i] = 8;
  for (var i = 144; i < 256; ++i)
      flt[i] = 9;
  for (var i = 256; i < 280; ++i)
      flt[i] = 7;
  for (var i = 280; i < 288; ++i)
      flt[i] = 8;
  // fixed distance tree
  var fdt = new u8(32);
  for (var i = 0; i < 32; ++i)
      fdt[i] = 5;
  // fixed length map
  var flm = /*#__PURE__*/ hMap(flt, 9, 0), flrm = /*#__PURE__*/ hMap(flt, 9, 1);
  // fixed distance map
  var fdm = /*#__PURE__*/ hMap(fdt, 5, 0), fdrm = /*#__PURE__*/ hMap(fdt, 5, 1);
  // find max of array
  var max = function (a) {
      var m = a[0];
      for (var i = 1; i < a.length; ++i) {
          if (a[i] > m)
              m = a[i];
      }
      return m;
  };
  // read d, starting at bit p and mask with m
  var bits = function (d, p, m) {
      var o = (p / 8) | 0;
      return ((d[o] | (d[o + 1] << 8)) >> (p & 7)) & m;
  };
  // read d, starting at bit p continuing for at least 16 bits
  var bits16 = function (d, p) {
      var o = (p / 8) | 0;
      return ((d[o] | (d[o + 1] << 8) | (d[o + 2] << 16)) >> (p & 7));
  };
  // get end of byte
  var shft = function (p) { return ((p + 7) / 8) | 0; };
  // typed array slice - allows garbage collector to free original reference,
  // while being more compatible than .slice
  var slc = function (v, s, e) {
      if (s == null || s < 0)
          s = 0;
      if (e == null || e > v.length)
          e = v.length;
      // can't use .constructor in case user-supplied
      var n = new (v.BYTES_PER_ELEMENT == 2 ? u16 : v.BYTES_PER_ELEMENT == 4 ? u32 : u8)(e - s);
      n.set(v.subarray(s, e));
      return n;
  };
  /**
   * Codes for errors generated within this library
   */
  exports.FlateErrorCode = {
      UnexpectedEOF: 0,
      InvalidBlockType: 1,
      InvalidLengthLiteral: 2,
      InvalidDistance: 3,
      StreamFinished: 4,
      NoStreamHandler: 5,
      InvalidHeader: 6,
      NoCallback: 7,
      InvalidUTF8: 8,
      ExtraFieldTooLong: 9,
      InvalidDate: 10,
      FilenameTooLong: 11,
      StreamFinishing: 12,
      InvalidZipData: 13,
      UnknownCompressionMethod: 14
  };
  // error codes
  var ec = [
      'unexpected EOF',
      'invalid block type',
      'invalid length/literal',
      'invalid distance',
      'stream finished',
      'no stream handler',
      ,
      'no callback',
      'invalid UTF-8 data',
      'extra field too long',
      'date not in range 1980-2099',
      'filename too long',
      'stream finishing',
      'invalid zip data'
      // determined by unknown compression method
  ];
  ;
  var err = function (ind, msg, nt) {
      var e = new Error(msg || ec[ind]);
      e.code = ind;
      if (Error.captureStackTrace)
          Error.captureStackTrace(e, err);
      if (!nt)
          throw e;
      return e;
  };
  // expands raw DEFLATE data
  var inflt = function (dat, buf, st) {
      // source length
      var sl = dat.length;
      if (!sl || (st && st.f && !st.l))
          return buf || new u8(0);
      // have to estimate size
      var noBuf = !buf || st;
      // no state
      var noSt = !st || st.i;
      if (!st)
          st = {};
      // Assumes roughly 33% compression ratio average
      if (!buf)
          buf = new u8(sl * 3);
      // ensure buffer can fit at least l elements
      var cbuf = function (l) {
          var bl = buf.length;
          // need to increase size to fit
          if (l > bl) {
              // Double or set to necessary, whichever is greater
              var nbuf = new u8(Math.max(bl * 2, l));
              nbuf.set(buf);
              buf = nbuf;
          }
      };
      //  last chunk         bitpos           bytes
      var final = st.f || 0, pos = st.p || 0, bt = st.b || 0, lm = st.l, dm = st.d, lbt = st.m, dbt = st.n;
      // total bits
      var tbts = sl * 8;
      do {
          if (!lm) {
              // BFINAL - this is only 1 when last chunk is next
              final = bits(dat, pos, 1);
              // type: 0 = no compression, 1 = fixed huffman, 2 = dynamic huffman
              var type = bits(dat, pos + 1, 3);
              pos += 3;
              if (!type) {
                  // go to end of byte boundary
                  var s = shft(pos) + 4, l = dat[s - 4] | (dat[s - 3] << 8), t = s + l;
                  if (t > sl) {
                      if (noSt)
                          err(0);
                      break;
                  }
                  // ensure size
                  if (noBuf)
                      cbuf(bt + l);
                  // Copy over uncompressed data
                  buf.set(dat.subarray(s, t), bt);
                  // Get new bitpos, update byte count
                  st.b = bt += l, st.p = pos = t * 8, st.f = final;
                  continue;
              }
              else if (type == 1)
                  lm = flrm, dm = fdrm, lbt = 9, dbt = 5;
              else if (type == 2) {
                  //  literal                            lengths
                  var hLit = bits(dat, pos, 31) + 257, hcLen = bits(dat, pos + 10, 15) + 4;
                  var tl = hLit + bits(dat, pos + 5, 31) + 1;
                  pos += 14;
                  // length+distance tree
                  var ldt = new u8(tl);
                  // code length tree
                  var clt = new u8(19);
                  for (var i = 0; i < hcLen; ++i) {
                      // use index map to get real code
                      clt[clim[i]] = bits(dat, pos + i * 3, 7);
                  }
                  pos += hcLen * 3;
                  // code lengths bits
                  var clb = max(clt), clbmsk = (1 << clb) - 1;
                  // code lengths map
                  var clm = hMap(clt, clb, 1);
                  for (var i = 0; i < tl;) {
                      var r = clm[bits(dat, pos, clbmsk)];
                      // bits read
                      pos += r & 15;
                      // symbol
                      var s = r >>> 4;
                      // code length to copy
                      if (s < 16) {
                          ldt[i++] = s;
                      }
                      else {
                          //  copy   count
                          var c = 0, n = 0;
                          if (s == 16)
                              n = 3 + bits(dat, pos, 3), pos += 2, c = ldt[i - 1];
                          else if (s == 17)
                              n = 3 + bits(dat, pos, 7), pos += 3;
                          else if (s == 18)
                              n = 11 + bits(dat, pos, 127), pos += 7;
                          while (n--)
                              ldt[i++] = c;
                      }
                  }
                  //    length tree                 distance tree
                  var lt = ldt.subarray(0, hLit), dt = ldt.subarray(hLit);
                  // max length bits
                  lbt = max(lt);
                  // max dist bits
                  dbt = max(dt);
                  lm = hMap(lt, lbt, 1);
                  dm = hMap(dt, dbt, 1);
              }
              else
                  err(1);
              if (pos > tbts) {
                  if (noSt)
                      err(0);
                  break;
              }
          }
          // Make sure the buffer can hold this + the largest possible addition
          // Maximum chunk size (practically, theoretically infinite) is 2^17;
          if (noBuf)
              cbuf(bt + 131072);
          var lms = (1 << lbt) - 1, dms = (1 << dbt) - 1;
          var lpos = pos;
          for (;; lpos = pos) {
              // bits read, code
              var c = lm[bits16(dat, pos) & lms], sym = c >>> 4;
              pos += c & 15;
              if (pos > tbts) {
                  if (noSt)
                      err(0);
                  break;
              }
              if (!c)
                  err(2);
              if (sym < 256)
                  buf[bt++] = sym;
              else if (sym == 256) {
                  lpos = pos, lm = null;
                  break;
              }
              else {
                  var add = sym - 254;
                  // no extra bits needed if less
                  if (sym > 264) {
                      // index
                      var i = sym - 257, b = fleb[i];
                      add = bits(dat, pos, (1 << b) - 1) + fl[i];
                      pos += b;
                  }
                  // dist
                  var d = dm[bits16(dat, pos) & dms], dsym = d >>> 4;
                  if (!d)
                      err(3);
                  pos += d & 15;
                  var dt = fd[dsym];
                  if (dsym > 3) {
                      var b = fdeb[dsym];
                      dt += bits16(dat, pos) & ((1 << b) - 1), pos += b;
                  }
                  if (pos > tbts) {
                      if (noSt)
                          err(0);
                      break;
                  }
                  if (noBuf)
                      cbuf(bt + 131072);
                  var end = bt + add;
                  for (; bt < end; bt += 4) {
                      buf[bt] = buf[bt - dt];
                      buf[bt + 1] = buf[bt + 1 - dt];
                      buf[bt + 2] = buf[bt + 2 - dt];
                      buf[bt + 3] = buf[bt + 3 - dt];
                  }
                  bt = end;
              }
          }
          st.l = lm, st.p = lpos, st.b = bt, st.f = final;
          if (lm)
              final = 1, st.m = lbt, st.d = dm, st.n = dbt;
      } while (!final);
      return bt == buf.length ? buf : slc(buf, 0, bt);
  };
  // starting at p, write the minimum number of bits that can hold v to d
  var wbits = function (d, p, v) {
      v <<= p & 7;
      var o = (p / 8) | 0;
      d[o] |= v;
      d[o + 1] |= v >>> 8;
  };
  // starting at p, write the minimum number of bits (>8) that can hold v to d
  var wbits16 = function (d, p, v) {
      v <<= p & 7;
      var o = (p / 8) | 0;
      d[o] |= v;
      d[o + 1] |= v >>> 8;
      d[o + 2] |= v >>> 16;
  };
  // creates code lengths from a frequency table
  var hTree = function (d, mb) {
      // Need extra info to make a tree
      var t = [];
      for (var i = 0; i < d.length; ++i) {
          if (d[i])
              t.push({ s: i, f: d[i] });
      }
      var s = t.length;
      var t2 = t.slice();
      if (!s)
          return [et, 0];
      if (s == 1) {
          var v = new u8(t[0].s + 1);
          v[t[0].s] = 1;
          return [v, 1];
      }
      t.sort(function (a, b) { return a.f - b.f; });
      // after i2 reaches last ind, will be stopped
      // freq must be greater than largest possible number of symbols
      t.push({ s: -1, f: 25001 });
      var l = t[0], r = t[1], i0 = 0, i1 = 1, i2 = 2;
      t[0] = { s: -1, f: l.f + r.f, l: l, r: r };
      // efficient algorithm from UZIP.js
      // i0 is lookbehind, i2 is lookahead - after processing two low-freq
      // symbols that combined have high freq, will start processing i2 (high-freq,
      // non-composite) symbols instead
      // see https://reddit.com/r/photopea/comments/ikekht/uzipjs_questions/
      while (i1 != s - 1) {
          l = t[t[i0].f < t[i2].f ? i0++ : i2++];
          r = t[i0 != i1 && t[i0].f < t[i2].f ? i0++ : i2++];
          t[i1++] = { s: -1, f: l.f + r.f, l: l, r: r };
      }
      var maxSym = t2[0].s;
      for (var i = 1; i < s; ++i) {
          if (t2[i].s > maxSym)
              maxSym = t2[i].s;
      }
      // code lengths
      var tr = new u16(maxSym + 1);
      // max bits in tree
      var mbt = ln(t[i1 - 1], tr, 0);
      if (mbt > mb) {
          // more algorithms from UZIP.js
          // TODO: find out how this code works (debt)
          //  ind    debt
          var i = 0, dt = 0;
          //    left            cost
          var lft = mbt - mb, cst = 1 << lft;
          t2.sort(function (a, b) { return tr[b.s] - tr[a.s] || a.f - b.f; });
          for (; i < s; ++i) {
              var i2_1 = t2[i].s;
              if (tr[i2_1] > mb) {
                  dt += cst - (1 << (mbt - tr[i2_1]));
                  tr[i2_1] = mb;
              }
              else
                  break;
          }
          dt >>>= lft;
          while (dt > 0) {
              var i2_2 = t2[i].s;
              if (tr[i2_2] < mb)
                  dt -= 1 << (mb - tr[i2_2]++ - 1);
              else
                  ++i;
          }
          for (; i >= 0 && dt; --i) {
              var i2_3 = t2[i].s;
              if (tr[i2_3] == mb) {
                  --tr[i2_3];
                  ++dt;
              }
          }
          mbt = mb;
      }
      return [new u8(tr), mbt];
  };
  // get the max length and assign length codes
  var ln = function (n, l, d) {
      return n.s == -1
          ? Math.max(ln(n.l, l, d + 1), ln(n.r, l, d + 1))
          : (l[n.s] = d);
  };
  // length codes generation
  var lc = function (c) {
      var s = c.length;
      // Note that the semicolon was intentional
      while (s && !c[--s])
          ;
      var cl = new u16(++s);
      //  ind      num         streak
      var cli = 0, cln = c[0], cls = 1;
      var w = function (v) { cl[cli++] = v; };
      for (var i = 1; i <= s; ++i) {
          if (c[i] == cln && i != s)
              ++cls;
          else {
              if (!cln && cls > 2) {
                  for (; cls > 138; cls -= 138)
                      w(32754);
                  if (cls > 2) {
                      w(cls > 10 ? ((cls - 11) << 5) | 28690 : ((cls - 3) << 5) | 12305);
                      cls = 0;
                  }
              }
              else if (cls > 3) {
                  w(cln), --cls;
                  for (; cls > 6; cls -= 6)
                      w(8304);
                  if (cls > 2)
                      w(((cls - 3) << 5) | 8208), cls = 0;
              }
              while (cls--)
                  w(cln);
              cls = 1;
              cln = c[i];
          }
      }
      return [cl.subarray(0, cli), s];
  };
  // calculate the length of output from tree, code lengths
  var clen = function (cf, cl) {
      var l = 0;
      for (var i = 0; i < cl.length; ++i)
          l += cf[i] * cl[i];
      return l;
  };
  // writes a fixed block
  // returns the new bit pos
  var wfblk = function (out, pos, dat) {
      // no need to write 00 as type: TypedArray defaults to 0
      var s = dat.length;
      var o = shft(pos + 2);
      out[o] = s & 255;
      out[o + 1] = s >>> 8;
      out[o + 2] = out[o] ^ 255;
      out[o + 3] = out[o + 1] ^ 255;
      for (var i = 0; i < s; ++i)
          out[o + i + 4] = dat[i];
      return (o + 4 + s) * 8;
  };
  // writes a block
  var wblk = function (dat, out, final, syms, lf, df, eb, li, bs, bl, p) {
      wbits(out, p++, final);
      ++lf[256];
      var _a = hTree(lf, 15), dlt = _a[0], mlb = _a[1];
      var _b = hTree(df, 15), ddt = _b[0], mdb = _b[1];
      var _c = lc(dlt), lclt = _c[0], nlc = _c[1];
      var _d = lc(ddt), lcdt = _d[0], ndc = _d[1];
      var lcfreq = new u16(19);
      for (var i = 0; i < lclt.length; ++i)
          lcfreq[lclt[i] & 31]++;
      for (var i = 0; i < lcdt.length; ++i)
          lcfreq[lcdt[i] & 31]++;
      var _e = hTree(lcfreq, 7), lct = _e[0], mlcb = _e[1];
      var nlcc = 19;
      for (; nlcc > 4 && !lct[clim[nlcc - 1]]; --nlcc)
          ;
      var flen = (bl + 5) << 3;
      var ftlen = clen(lf, flt) + clen(df, fdt) + eb;
      var dtlen = clen(lf, dlt) + clen(df, ddt) + eb + 14 + 3 * nlcc + clen(lcfreq, lct) + (2 * lcfreq[16] + 3 * lcfreq[17] + 7 * lcfreq[18]);
      if (flen <= ftlen && flen <= dtlen)
          return wfblk(out, p, dat.subarray(bs, bs + bl));
      var lm, ll, dm, dl;
      wbits(out, p, 1 + (dtlen < ftlen)), p += 2;
      if (dtlen < ftlen) {
          lm = hMap(dlt, mlb, 0), ll = dlt, dm = hMap(ddt, mdb, 0), dl = ddt;
          var llm = hMap(lct, mlcb, 0);
          wbits(out, p, nlc - 257);
          wbits(out, p + 5, ndc - 1);
          wbits(out, p + 10, nlcc - 4);
          p += 14;
          for (var i = 0; i < nlcc; ++i)
              wbits(out, p + 3 * i, lct[clim[i]]);
          p += 3 * nlcc;
          var lcts = [lclt, lcdt];
          for (var it = 0; it < 2; ++it) {
              var clct = lcts[it];
              for (var i = 0; i < clct.length; ++i) {
                  var len = clct[i] & 31;
                  wbits(out, p, llm[len]), p += lct[len];
                  if (len > 15)
                      wbits(out, p, (clct[i] >>> 5) & 127), p += clct[i] >>> 12;
              }
          }
      }
      else {
          lm = flm, ll = flt, dm = fdm, dl = fdt;
      }
      for (var i = 0; i < li; ++i) {
          if (syms[i] > 255) {
              var len = (syms[i] >>> 18) & 31;
              wbits16(out, p, lm[len + 257]), p += ll[len + 257];
              if (len > 7)
                  wbits(out, p, (syms[i] >>> 23) & 31), p += fleb[len];
              var dst = syms[i] & 31;
              wbits16(out, p, dm[dst]), p += dl[dst];
              if (dst > 3)
                  wbits16(out, p, (syms[i] >>> 5) & 8191), p += fdeb[dst];
          }
          else {
              wbits16(out, p, lm[syms[i]]), p += ll[syms[i]];
          }
      }
      wbits16(out, p, lm[256]);
      return p + ll[256];
  };
  // deflate options (nice << 13) | chain
  var deo = /*#__PURE__*/ new u32([65540, 131080, 131088, 131104, 262176, 1048704, 1048832, 2114560, 2117632]);
  // empty
  var et = /*#__PURE__*/ new u8(0);
  // compresses data into a raw DEFLATE buffer
  var dflt = function (dat, lvl, plvl, pre, post, lst) {
      var s = dat.length;
      var o = new u8(pre + s + 5 * (1 + Math.ceil(s / 7000)) + post);
      // writing to this writes to the output buffer
      var w = o.subarray(pre, o.length - post);
      var pos = 0;
      if (!lvl || s < 8) {
          for (var i = 0; i <= s; i += 65535) {
              // end
              var e = i + 65535;
              if (e >= s) {
                  // write final block
                  w[pos >> 3] = lst;
              }
              pos = wfblk(w, pos + 1, dat.subarray(i, e));
          }
      }
      else {
          var opt = deo[lvl - 1];
          var n = opt >>> 13, c = opt & 8191;
          var msk_1 = (1 << plvl) - 1;
          //    prev 2-byte val map    curr 2-byte val map
          var prev = new u16(32768), head = new u16(msk_1 + 1);
          var bs1_1 = Math.ceil(plvl / 3), bs2_1 = 2 * bs1_1;
          var hsh = function (i) { return (dat[i] ^ (dat[i + 1] << bs1_1) ^ (dat[i + 2] << bs2_1)) & msk_1; };
          // 24576 is an arbitrary number of maximum symbols per block
          // 424 buffer for last block
          var syms = new u32(25000);
          // length/literal freq   distance freq
          var lf = new u16(288), df = new u16(32);
          //  l/lcnt  exbits  index  l/lind  waitdx  bitpos
          var lc_1 = 0, eb = 0, i = 0, li = 0, wi = 0, bs = 0;
          for (; i < s; ++i) {
              // hash value
              // deopt when i > s - 3 - at end, deopt acceptable
              var hv = hsh(i);
              // index mod 32768    previous index mod
              var imod = i & 32767, pimod = head[hv];
              prev[imod] = pimod;
              head[hv] = imod;
              // We always should modify head and prev, but only add symbols if
              // this data is not yet processed ("wait" for wait index)
              if (wi <= i) {
                  // bytes remaining
                  var rem = s - i;
                  if ((lc_1 > 7000 || li > 24576) && rem > 423) {
                      pos = wblk(dat, w, 0, syms, lf, df, eb, li, bs, i - bs, pos);
                      li = lc_1 = eb = 0, bs = i;
                      for (var j = 0; j < 286; ++j)
                          lf[j] = 0;
                      for (var j = 0; j < 30; ++j)
                          df[j] = 0;
                  }
                  //  len    dist   chain
                  var l = 2, d = 0, ch_1 = c, dif = (imod - pimod) & 32767;
                  if (rem > 2 && hv == hsh(i - dif)) {
                      var maxn = Math.min(n, rem) - 1;
                      var maxd = Math.min(32767, i);
                      // max possible length
                      // not capped at dif because decompressors implement "rolling" index population
                      var ml = Math.min(258, rem);
                      while (dif <= maxd && --ch_1 && imod != pimod) {
                          if (dat[i + l] == dat[i + l - dif]) {
                              var nl = 0;
                              for (; nl < ml && dat[i + nl] == dat[i + nl - dif]; ++nl)
                                  ;
                              if (nl > l) {
                                  l = nl, d = dif;
                                  // break out early when we reach "nice" (we are satisfied enough)
                                  if (nl > maxn)
                                      break;
                                  // now, find the rarest 2-byte sequence within this
                                  // length of literals and search for that instead.
                                  // Much faster than just using the start
                                  var mmd = Math.min(dif, nl - 2);
                                  var md = 0;
                                  for (var j = 0; j < mmd; ++j) {
                                      var ti = (i - dif + j + 32768) & 32767;
                                      var pti = prev[ti];
                                      var cd = (ti - pti + 32768) & 32767;
                                      if (cd > md)
                                          md = cd, pimod = ti;
                                  }
                              }
                          }
                          // check the previous match
                          imod = pimod, pimod = prev[imod];
                          dif += (imod - pimod + 32768) & 32767;
                      }
                  }
                  // d will be nonzero only when a match was found
                  if (d) {
                      // store both dist and len data in one Uint32
                      // Make sure this is recognized as a len/dist with 28th bit (2^28)
                      syms[li++] = 268435456 | (revfl[l] << 18) | revfd[d];
                      var lin = revfl[l] & 31, din = revfd[d] & 31;
                      eb += fleb[lin] + fdeb[din];
                      ++lf[257 + lin];
                      ++df[din];
                      wi = i + l;
                      ++lc_1;
                  }
                  else {
                      syms[li++] = dat[i];
                      ++lf[dat[i]];
                  }
              }
          }
          pos = wblk(dat, w, lst, syms, lf, df, eb, li, bs, i - bs, pos);
          // this is the easiest way to avoid needing to maintain state
          if (!lst && pos & 7)
              pos = wfblk(w, pos + 1, et);
      }
      return slc(o, 0, pre + shft(pos) + post);
  };
  // CRC32 table
  var crct = /*#__PURE__*/ (function () {
      var t = new Int32Array(256);
      for (var i = 0; i < 256; ++i) {
          var c = i, k = 9;
          while (--k)
              c = ((c & 1) && -306674912) ^ (c >>> 1);
          t[i] = c;
      }
      return t;
  })();
  // CRC32
  var crc = function () {
      var c = -1;
      return {
          p: function (d) {
              // closures have awful performance
              var cr = c;
              for (var i = 0; i < d.length; ++i)
                  cr = crct[(cr & 255) ^ d[i]] ^ (cr >>> 8);
              c = cr;
          },
          d: function () { return ~c; }
      };
  };
  // Alder32
  var adler = function () {
      var a = 1, b = 0;
      return {
          p: function (d) {
              // closures have awful performance
              var n = a, m = b;
              var l = d.length | 0;
              for (var i = 0; i != l;) {
                  var e = Math.min(i + 2655, l);
                  for (; i < e; ++i)
                      m += n += d[i];
                  n = (n & 65535) + 15 * (n >> 16), m = (m & 65535) + 15 * (m >> 16);
              }
              a = n, b = m;
          },
          d: function () {
              a %= 65521, b %= 65521;
              return (a & 255) << 24 | (a >>> 8) << 16 | (b & 255) << 8 | (b >>> 8);
          }
      };
  };
  ;
  // deflate with opts
  var dopt = function (dat, opt, pre, post, st) {
      return dflt(dat, opt.level == null ? 6 : opt.level, opt.mem == null ? Math.ceil(Math.max(8, Math.min(13, Math.log(dat.length))) * 1.5) : (12 + opt.mem), pre, post, !st);
  };
  // Walmart object spread
  var mrg = function (a, b) {
      var o = {};
      for (var k in a)
          o[k] = a[k];
      for (var k in b)
          o[k] = b[k];
      return o;
  };
  // worker clone
  // This is possibly the craziest part of the entire codebase, despite how simple it may seem.
  // The only parameter to this function is a closure that returns an array of variables outside of the function scope.
  // We're going to try to figure out the variable names used in the closure as strings because that is crucial for workerization.
  // We will return an object mapping of true variable name to value (basically, the current scope as a JS object).
  // The reason we can't just use the original variable names is minifiers mangling the toplevel scope.
  // This took me three weeks to figure out how to do.
  var wcln = function (fn, fnStr, td) {
      var dt = fn();
      var st = fn.toString();
      var ks = st.slice(st.indexOf('[') + 1, st.lastIndexOf(']')).replace(/\s+/g, '').split(',');
      for (var i = 0; i < dt.length; ++i) {
          var v = dt[i], k = ks[i];
          if (typeof v == 'function') {
              fnStr += ';' + k + '=';
              var st_1 = v.toString();
              if (v.prototype) {
                  // for global objects
                  if (st_1.indexOf('[native code]') != -1) {
                      var spInd = st_1.indexOf(' ', 8) + 1;
                      fnStr += st_1.slice(spInd, st_1.indexOf('(', spInd));
                  }
                  else {
                      fnStr += st_1;
                      for (var t in v.prototype)
                          fnStr += ';' + k + '.prototype.' + t + '=' + v.prototype[t].toString();
                  }
              }
              else
                  fnStr += st_1;
          }
          else
              td[k] = v;
      }
      return [fnStr, td];
  };
  var ch = [];
  // clone bufs
  var cbfs = function (v) {
      var tl = [];
      for (var k in v) {
          if (v[k].buffer) {
              tl.push((v[k] = new v[k].constructor(v[k])).buffer);
          }
      }
      return tl;
  };
  // use a worker to execute code
  var wrkr = function (fns, init, id, cb) {
      var _a;
      if (!ch[id]) {
          var fnStr = '', td_1 = {}, m = fns.length - 1;
          for (var i = 0; i < m; ++i)
              _a = wcln(fns[i], fnStr, td_1), fnStr = _a[0], td_1 = _a[1];
          ch[id] = wcln(fns[m], fnStr, td_1);
      }
      var td = mrg({}, ch[id][1]);
      return node_worker_1["default"](ch[id][0] + ';onmessage=function(e){for(var k in e.data)self[k]=e.data[k];onmessage=' + init.toString() + '}', id, td, cbfs(td), cb);
  };
  // base async inflate fn
  var bInflt = function () { return [u8, u16, u32, fleb, fdeb, clim, fl, fd, flrm, fdrm, rev, ec, hMap, max, bits, bits16, shft, slc, err, inflt, inflateSync, pbf, gu8]; };
  var bDflt = function () { return [u8, u16, u32, fleb, fdeb, clim, revfl, revfd, flm, flt, fdm, fdt, rev, deo, et, hMap, wbits, wbits16, hTree, ln, lc, clen, wfblk, wblk, shft, slc, dflt, dopt, deflateSync, pbf]; };
  // gzip extra
  var gze = function () { return [gzh, gzhl, wbytes, crc, crct]; };
  // gunzip extra
  var guze = function () { return [gzs, gzl]; };
  // zlib extra
  var zle = function () { return [zlh, wbytes, adler]; };
  // unzlib extra
  var zule = function () { return [zlv]; };
  // post buf
  var pbf = function (msg) { return postMessage(msg, [msg.buffer]); };
  // get u8
  var gu8 = function (o) { return o && o.size && new u8(o.size); };
  // async helper
  var cbify = function (dat, opts, fns, init, id, cb) {
      var w = wrkr(fns, init, id, function (err, dat) {
          w.terminate();
          cb(err, dat);
      });
      w.postMessage([dat, opts], opts.consume ? [dat.buffer] : []);
      return function () { w.terminate(); };
  };
  // auto stream
  var astrm = function (strm) {
      strm.ondata = function (dat, final) { return postMessage([dat, final], [dat.buffer]); };
      return function (ev) { return strm.push(ev.data[0], ev.data[1]); };
  };
  // async stream attach
  var astrmify = function (fns, strm, opts, init, id) {
      var t;
      var w = wrkr(fns, init, id, function (err, dat) {
          if (err)
              w.terminate(), strm.ondata.call(strm, err);
          else {
              if (dat[1])
                  w.terminate();
              strm.ondata.call(strm, err, dat[0], dat[1]);
          }
      });
      w.postMessage(opts);
      strm.push = function (d, f) {
          if (!strm.ondata)
              err(5);
          if (t)
              strm.ondata(err(4, 0, 1), null, !!f);
          w.postMessage([d, t = f], [d.buffer]);
      };
      strm.terminate = function () { w.terminate(); };
  };
  // read 2 bytes
  var b2 = function (d, b) { return d[b] | (d[b + 1] << 8); };
  // read 4 bytes
  var b4 = function (d, b) { return (d[b] | (d[b + 1] << 8) | (d[b + 2] << 16) | (d[b + 3] << 24)) >>> 0; };
  var b8 = function (d, b) { return b4(d, b) + (b4(d, b + 4) * 4294967296); };
  // write bytes
  var wbytes = function (d, b, v) {
      for (; v; ++b)
          d[b] = v, v >>>= 8;
  };
  // gzip header
  var gzh = function (c, o) {
      var fn = o.filename;
      c[0] = 31, c[1] = 139, c[2] = 8, c[8] = o.level < 2 ? 4 : o.level == 9 ? 2 : 0, c[9] = 3; // assume Unix
      if (o.mtime != 0)
          wbytes(c, 4, Math.floor(new Date(o.mtime || Date.now()) / 1000));
      if (fn) {
          c[3] = 8;
          for (var i = 0; i <= fn.length; ++i)
              c[i + 10] = fn.charCodeAt(i);
      }
  };
  // gzip footer: -8 to -4 = CRC, -4 to -0 is length
  // gzip start
  var gzs = function (d) {
      if (d[0] != 31 || d[1] != 139 || d[2] != 8)
          err(6, 'invalid gzip data');
      var flg = d[3];
      var st = 10;
      if (flg & 4)
          st += d[10] | (d[11] << 8) + 2;
      for (var zs = (flg >> 3 & 1) + (flg >> 4 & 1); zs > 0; zs -= !d[st++])
          ;
      return st + (flg & 2);
  };
  // gzip length
  var gzl = function (d) {
      var l = d.length;
      return ((d[l - 4] | d[l - 3] << 8 | d[l - 2] << 16) | (d[l - 1] << 24)) >>> 0;
  };
  // gzip header length
  var gzhl = function (o) { return 10 + ((o.filename && (o.filename.length + 1)) || 0); };
  // zlib header
  var zlh = function (c, o) {
      var lv = o.level, fl = lv == 0 ? 0 : lv < 6 ? 1 : lv == 9 ? 3 : 2;
      c[0] = 120, c[1] = (fl << 6) | (fl ? (32 - 2 * fl) : 1);
  };
  // zlib valid
  var zlv = function (d) {
      if ((d[0] & 15) != 8 || (d[0] >>> 4) > 7 || ((d[0] << 8 | d[1]) % 31))
          err(6, 'invalid zlib data');
      if (d[1] & 32)
          err(6, 'invalid zlib data: preset dictionaries not supported');
  };
  function AsyncCmpStrm(opts, cb) {
      if (!cb && typeof opts == 'function')
          cb = opts, opts = {};
      this.ondata = cb;
      return opts;
  }
  // zlib footer: -4 to -0 is Adler32
  /**
   * Streaming DEFLATE compression
   */
  var Deflate = /*#__PURE__*/ (function () {
      function Deflate(opts, cb) {
          if (!cb && typeof opts == 'function')
              cb = opts, opts = {};
          this.ondata = cb;
          this.o = opts || {};
      }
      Deflate.prototype.p = function (c, f) {
          this.ondata(dopt(c, this.o, 0, 0, !f), f);
      };
      /**
       * Pushes a chunk to be deflated
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Deflate.prototype.push = function (chunk, final) {
          if (!this.ondata)
              err(5);
          if (this.d)
              err(4);
          this.d = final;
          this.p(chunk, final || false);
      };
      return Deflate;
  }());
  exports.Deflate = Deflate;
  /**
   * Asynchronous streaming DEFLATE compression
   */
  var AsyncDeflate = /*#__PURE__*/ (function () {
      function AsyncDeflate(opts, cb) {
          astrmify([
              bDflt,
              function () { return [astrm, Deflate]; }
          ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
              var strm = new Deflate(ev.data);
              onmessage = astrm(strm);
          }, 6);
      }
      return AsyncDeflate;
  }());
  exports.AsyncDeflate = AsyncDeflate;
  function deflate(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bDflt,
      ], function (ev) { return pbf(deflateSync(ev.data[0], ev.data[1])); }, 0, cb);
  }
  exports.deflate = deflate;
  /**
   * Compresses data with DEFLATE without any wrapper
   * @param data The data to compress
   * @param opts The compression options
   * @returns The deflated version of the data
   */
  function deflateSync(data, opts) {
      return dopt(data, opts || {}, 0, 0);
  }
  exports.deflateSync = deflateSync;
  /**
   * Streaming DEFLATE decompression
   */
  var Inflate = /*#__PURE__*/ (function () {
      /**
       * Creates an inflation stream
       * @param cb The callback to call whenever data is inflated
       */
      function Inflate(cb) {
          this.s = {};
          this.p = new u8(0);
          this.ondata = cb;
      }
      Inflate.prototype.e = function (c) {
          if (!this.ondata)
              err(5);
          if (this.d)
              err(4);
          var l = this.p.length;
          var n = new u8(l + c.length);
          n.set(this.p), n.set(c, l), this.p = n;
      };
      Inflate.prototype.c = function (final) {
          this.d = this.s.i = final || false;
          var bts = this.s.b;
          var dt = inflt(this.p, this.o, this.s);
          this.ondata(slc(dt, bts, this.s.b), this.d);
          this.o = slc(dt, this.s.b - 32768), this.s.b = this.o.length;
          this.p = slc(this.p, (this.s.p / 8) | 0), this.s.p &= 7;
      };
      /**
       * Pushes a chunk to be inflated
       * @param chunk The chunk to push
       * @param final Whether this is the final chunk
       */
      Inflate.prototype.push = function (chunk, final) {
          this.e(chunk), this.c(final);
      };
      return Inflate;
  }());
  exports.Inflate = Inflate;
  /**
   * Asynchronous streaming DEFLATE decompression
   */
  var AsyncInflate = /*#__PURE__*/ (function () {
      /**
       * Creates an asynchronous inflation stream
       * @param cb The callback to call whenever data is deflated
       */
      function AsyncInflate(cb) {
          this.ondata = cb;
          astrmify([
              bInflt,
              function () { return [astrm, Inflate]; }
          ], this, 0, function () {
              var strm = new Inflate();
              onmessage = astrm(strm);
          }, 7);
      }
      return AsyncInflate;
  }());
  exports.AsyncInflate = AsyncInflate;
  function inflate(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bInflt
      ], function (ev) { return pbf(inflateSync(ev.data[0], gu8(ev.data[1]))); }, 1, cb);
  }
  exports.inflate = inflate;
  /**
   * Expands DEFLATE data with no wrapper
   * @param data The data to decompress
   * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
   * @returns The decompressed version of the data
   */
  function inflateSync(data, out) {
      return inflt(data, out);
  }
  exports.inflateSync = inflateSync;
  // before you yell at me for not just using extends, my reason is that TS inheritance is hard to workerize.
  /**
   * Streaming GZIP compression
   */
  var Gzip = /*#__PURE__*/ (function () {
      function Gzip(opts, cb) {
          this.c = crc();
          this.l = 0;
          this.v = 1;
          Deflate.call(this, opts, cb);
      }
      /**
       * Pushes a chunk to be GZIPped
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Gzip.prototype.push = function (chunk, final) {
          Deflate.prototype.push.call(this, chunk, final);
      };
      Gzip.prototype.p = function (c, f) {
          this.c.p(c);
          this.l += c.length;
          var raw = dopt(c, this.o, this.v && gzhl(this.o), f && 8, !f);
          if (this.v)
              gzh(raw, this.o), this.v = 0;
          if (f)
              wbytes(raw, raw.length - 8, this.c.d()), wbytes(raw, raw.length - 4, this.l);
          this.ondata(raw, f);
      };
      return Gzip;
  }());
  exports.Gzip = Gzip;
  exports.Compress = Gzip;
  /**
   * Asynchronous streaming GZIP compression
   */
  var AsyncGzip = /*#__PURE__*/ (function () {
      function AsyncGzip(opts, cb) {
          astrmify([
              bDflt,
              gze,
              function () { return [astrm, Deflate, Gzip]; }
          ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
              var strm = new Gzip(ev.data);
              onmessage = astrm(strm);
          }, 8);
      }
      return AsyncGzip;
  }());
  exports.AsyncGzip = AsyncGzip;
  exports.AsyncCompress = AsyncGzip;
  function gzip(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bDflt,
          gze,
          function () { return [gzipSync]; }
      ], function (ev) { return pbf(gzipSync(ev.data[0], ev.data[1])); }, 2, cb);
  }
  exports.gzip = gzip;
  exports.compress = gzip;
  /**
   * Compresses data with GZIP
   * @param data The data to compress
   * @param opts The compression options
   * @returns The gzipped version of the data
   */
  function gzipSync(data, opts) {
      if (!opts)
          opts = {};
      var c = crc(), l = data.length;
      c.p(data);
      var d = dopt(data, opts, gzhl(opts), 8), s = d.length;
      return gzh(d, opts), wbytes(d, s - 8, c.d()), wbytes(d, s - 4, l), d;
  }
  exports.gzipSync = gzipSync;
  exports.compressSync = gzipSync;
  /**
   * Streaming GZIP decompression
   */
  var Gunzip = /*#__PURE__*/ (function () {
      /**
       * Creates a GUNZIP stream
       * @param cb The callback to call whenever data is inflated
       */
      function Gunzip(cb) {
          this.v = 1;
          Inflate.call(this, cb);
      }
      /**
       * Pushes a chunk to be GUNZIPped
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Gunzip.prototype.push = function (chunk, final) {
          Inflate.prototype.e.call(this, chunk);
          if (this.v) {
              var s = this.p.length > 3 ? gzs(this.p) : 4;
              if (s >= this.p.length && !final)
                  return;
              this.p = this.p.subarray(s), this.v = 0;
          }
          if (final) {
              if (this.p.length < 8)
                  err(6, 'invalid gzip data');
              this.p = this.p.subarray(0, -8);
          }
          // necessary to prevent TS from using the closure value
          // This allows for workerization to function correctly
          Inflate.prototype.c.call(this, final);
      };
      return Gunzip;
  }());
  exports.Gunzip = Gunzip;
  /**
   * Asynchronous streaming GZIP decompression
   */
  var AsyncGunzip = /*#__PURE__*/ (function () {
      /**
       * Creates an asynchronous GUNZIP stream
       * @param cb The callback to call whenever data is deflated
       */
      function AsyncGunzip(cb) {
          this.ondata = cb;
          astrmify([
              bInflt,
              guze,
              function () { return [astrm, Inflate, Gunzip]; }
          ], this, 0, function () {
              var strm = new Gunzip();
              onmessage = astrm(strm);
          }, 9);
      }
      return AsyncGunzip;
  }());
  exports.AsyncGunzip = AsyncGunzip;
  function gunzip(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bInflt,
          guze,
          function () { return [gunzipSync]; }
      ], function (ev) { return pbf(gunzipSync(ev.data[0])); }, 3, cb);
  }
  exports.gunzip = gunzip;
  /**
   * Expands GZIP data
   * @param data The data to decompress
   * @param out Where to write the data. GZIP already encodes the output size, so providing this doesn't save memory.
   * @returns The decompressed version of the data
   */
  function gunzipSync(data, out) {
      return inflt(data.subarray(gzs(data), -8), out || new u8(gzl(data)));
  }
  exports.gunzipSync = gunzipSync;
  /**
   * Streaming Zlib compression
   */
  var Zlib = /*#__PURE__*/ (function () {
      function Zlib(opts, cb) {
          this.c = adler();
          this.v = 1;
          Deflate.call(this, opts, cb);
      }
      /**
       * Pushes a chunk to be zlibbed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Zlib.prototype.push = function (chunk, final) {
          Deflate.prototype.push.call(this, chunk, final);
      };
      Zlib.prototype.p = function (c, f) {
          this.c.p(c);
          var raw = dopt(c, this.o, this.v && 2, f && 4, !f);
          if (this.v)
              zlh(raw, this.o), this.v = 0;
          if (f)
              wbytes(raw, raw.length - 4, this.c.d());
          this.ondata(raw, f);
      };
      return Zlib;
  }());
  exports.Zlib = Zlib;
  /**
   * Asynchronous streaming Zlib compression
   */
  var AsyncZlib = /*#__PURE__*/ (function () {
      function AsyncZlib(opts, cb) {
          astrmify([
              bDflt,
              zle,
              function () { return [astrm, Deflate, Zlib]; }
          ], this, AsyncCmpStrm.call(this, opts, cb), function (ev) {
              var strm = new Zlib(ev.data);
              onmessage = astrm(strm);
          }, 10);
      }
      return AsyncZlib;
  }());
  exports.AsyncZlib = AsyncZlib;
  function zlib(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bDflt,
          zle,
          function () { return [zlibSync]; }
      ], function (ev) { return pbf(zlibSync(ev.data[0], ev.data[1])); }, 4, cb);
  }
  exports.zlib = zlib;
  /**
   * Compress data with Zlib
   * @param data The data to compress
   * @param opts The compression options
   * @returns The zlib-compressed version of the data
   */
  function zlibSync(data, opts) {
      if (!opts)
          opts = {};
      var a = adler();
      a.p(data);
      var d = dopt(data, opts, 2, 4);
      return zlh(d, opts), wbytes(d, d.length - 4, a.d()), d;
  }
  exports.zlibSync = zlibSync;
  /**
   * Streaming Zlib decompression
   */
  var Unzlib = /*#__PURE__*/ (function () {
      /**
       * Creates a Zlib decompression stream
       * @param cb The callback to call whenever data is inflated
       */
      function Unzlib(cb) {
          this.v = 1;
          Inflate.call(this, cb);
      }
      /**
       * Pushes a chunk to be unzlibbed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Unzlib.prototype.push = function (chunk, final) {
          Inflate.prototype.e.call(this, chunk);
          if (this.v) {
              if (this.p.length < 2 && !final)
                  return;
              this.p = this.p.subarray(2), this.v = 0;
          }
          if (final) {
              if (this.p.length < 4)
                  err(6, 'invalid zlib data');
              this.p = this.p.subarray(0, -4);
          }
          // necessary to prevent TS from using the closure value
          // This allows for workerization to function correctly
          Inflate.prototype.c.call(this, final);
      };
      return Unzlib;
  }());
  exports.Unzlib = Unzlib;
  /**
   * Asynchronous streaming Zlib decompression
   */
  var AsyncUnzlib = /*#__PURE__*/ (function () {
      /**
       * Creates an asynchronous Zlib decompression stream
       * @param cb The callback to call whenever data is deflated
       */
      function AsyncUnzlib(cb) {
          this.ondata = cb;
          astrmify([
              bInflt,
              zule,
              function () { return [astrm, Inflate, Unzlib]; }
          ], this, 0, function () {
              var strm = new Unzlib();
              onmessage = astrm(strm);
          }, 11);
      }
      return AsyncUnzlib;
  }());
  exports.AsyncUnzlib = AsyncUnzlib;
  function unzlib(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return cbify(data, opts, [
          bInflt,
          zule,
          function () { return [unzlibSync]; }
      ], function (ev) { return pbf(unzlibSync(ev.data[0], gu8(ev.data[1]))); }, 5, cb);
  }
  exports.unzlib = unzlib;
  /**
   * Expands Zlib data
   * @param data The data to decompress
   * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
   * @returns The decompressed version of the data
   */
  function unzlibSync(data, out) {
      return inflt((zlv(data), data.subarray(2, -4)), out);
  }
  exports.unzlibSync = unzlibSync;
  /**
   * Streaming GZIP, Zlib, or raw DEFLATE decompression
   */
  var Decompress = /*#__PURE__*/ (function () {
      /**
       * Creates a decompression stream
       * @param cb The callback to call whenever data is decompressed
       */
      function Decompress(cb) {
          this.G = Gunzip;
          this.I = Inflate;
          this.Z = Unzlib;
          this.ondata = cb;
      }
      /**
       * Pushes a chunk to be decompressed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Decompress.prototype.push = function (chunk, final) {
          if (!this.ondata)
              err(5);
          if (!this.s) {
              if (this.p && this.p.length) {
                  var n = new u8(this.p.length + chunk.length);
                  n.set(this.p), n.set(chunk, this.p.length);
              }
              else
                  this.p = chunk;
              if (this.p.length > 2) {
                  var _this_1 = this;
                  var cb = function () { _this_1.ondata.apply(_this_1, arguments); };
                  this.s = (this.p[0] == 31 && this.p[1] == 139 && this.p[2] == 8)
                      ? new this.G(cb)
                      : ((this.p[0] & 15) != 8 || (this.p[0] >> 4) > 7 || ((this.p[0] << 8 | this.p[1]) % 31))
                          ? new this.I(cb)
                          : new this.Z(cb);
                  this.s.push(this.p, final);
                  this.p = null;
              }
          }
          else
              this.s.push(chunk, final);
      };
      return Decompress;
  }());
  exports.Decompress = Decompress;
  /**
   * Asynchronous streaming GZIP, Zlib, or raw DEFLATE decompression
   */
  var AsyncDecompress = /*#__PURE__*/ (function () {
      /**
     * Creates an asynchronous decompression stream
     * @param cb The callback to call whenever data is decompressed
     */
      function AsyncDecompress(cb) {
          this.G = AsyncGunzip;
          this.I = AsyncInflate;
          this.Z = AsyncUnzlib;
          this.ondata = cb;
      }
      /**
       * Pushes a chunk to be decompressed
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      AsyncDecompress.prototype.push = function (chunk, final) {
          Decompress.prototype.push.call(this, chunk, final);
      };
      return AsyncDecompress;
  }());
  exports.AsyncDecompress = AsyncDecompress;
  function decompress(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      return (data[0] == 31 && data[1] == 139 && data[2] == 8)
          ? gunzip(data, opts, cb)
          : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
              ? inflate(data, opts, cb)
              : unzlib(data, opts, cb);
  }
  exports.decompress = decompress;
  /**
   * Expands compressed GZIP, Zlib, or raw DEFLATE data, automatically detecting the format
   * @param data The data to decompress
   * @param out Where to write the data. Saves memory if you know the decompressed size and provide an output buffer of that length.
   * @returns The decompressed version of the data
   */
  function decompressSync(data, out) {
      return (data[0] == 31 && data[1] == 139 && data[2] == 8)
          ? gunzipSync(data, out)
          : ((data[0] & 15) != 8 || (data[0] >> 4) > 7 || ((data[0] << 8 | data[1]) % 31))
              ? inflateSync(data, out)
              : unzlibSync(data, out);
  }
  exports.decompressSync = decompressSync;
  // flatten a directory structure
  var fltn = function (d, p, t, o) {
      for (var k in d) {
          var val = d[k], n = p + k, op = o;
          if (Array.isArray(val))
              op = mrg(o, val[1]), val = val[0];
          if (val instanceof u8)
              t[n] = [val, op];
          else {
              t[n += '/'] = [new u8(0), op];
              fltn(val, n, t, o);
          }
      }
  };
  // text encoder
  var te = typeof TextEncoder != 'undefined' && /*#__PURE__*/ new TextEncoder();
  // text decoder
  var td = typeof TextDecoder != 'undefined' && /*#__PURE__*/ new TextDecoder();
  // text decoder stream
  var tds = 0;
  try {
      td.decode(et, { stream: true });
      tds = 1;
  }
  catch (e) { }
  // decode UTF8
  var dutf8 = function (d) {
      for (var r = '', i = 0;;) {
          var c = d[i++];
          var eb = (c > 127) + (c > 223) + (c > 239);
          if (i + eb > d.length)
              return [r, slc(d, i - 1)];
          if (!eb)
              r += String.fromCharCode(c);
          else if (eb == 3) {
              c = ((c & 15) << 18 | (d[i++] & 63) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63)) - 65536,
                  r += String.fromCharCode(55296 | (c >> 10), 56320 | (c & 1023));
          }
          else if (eb & 1)
              r += String.fromCharCode((c & 31) << 6 | (d[i++] & 63));
          else
              r += String.fromCharCode((c & 15) << 12 | (d[i++] & 63) << 6 | (d[i++] & 63));
      }
  };
  /**
   * Streaming UTF-8 decoding
   */
  var DecodeUTF8 = /*#__PURE__*/ (function () {
      /**
       * Creates a UTF-8 decoding stream
       * @param cb The callback to call whenever data is decoded
       */
      function DecodeUTF8(cb) {
          this.ondata = cb;
          if (tds)
              this.t = new TextDecoder();
          else
              this.p = et;
      }
      /**
       * Pushes a chunk to be decoded from UTF-8 binary
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      DecodeUTF8.prototype.push = function (chunk, final) {
          if (!this.ondata)
              err(5);
          final = !!final;
          if (this.t) {
              this.ondata(this.t.decode(chunk, { stream: true }), final);
              if (final) {
                  if (this.t.decode().length)
                      err(8);
                  this.t = null;
              }
              return;
          }
          if (!this.p)
              err(4);
          var dat = new u8(this.p.length + chunk.length);
          dat.set(this.p);
          dat.set(chunk, this.p.length);
          var _a = dutf8(dat), ch = _a[0], np = _a[1];
          if (final) {
              if (np.length)
                  err(8);
              this.p = null;
          }
          else
              this.p = np;
          this.ondata(ch, final);
      };
      return DecodeUTF8;
  }());
  exports.DecodeUTF8 = DecodeUTF8;
  /**
   * Streaming UTF-8 encoding
   */
  var EncodeUTF8 = /*#__PURE__*/ (function () {
      /**
       * Creates a UTF-8 decoding stream
       * @param cb The callback to call whenever data is encoded
       */
      function EncodeUTF8(cb) {
          this.ondata = cb;
      }
      /**
       * Pushes a chunk to be encoded to UTF-8
       * @param chunk The string data to push
       * @param final Whether this is the last chunk
       */
      EncodeUTF8.prototype.push = function (chunk, final) {
          if (!this.ondata)
              err(5);
          if (this.d)
              err(4);
          this.ondata(strToU8(chunk), this.d = final || false);
      };
      return EncodeUTF8;
  }());
  exports.EncodeUTF8 = EncodeUTF8;
  /**
   * Converts a string into a Uint8Array for use with compression/decompression methods
   * @param str The string to encode
   * @param latin1 Whether or not to interpret the data as Latin-1. This should
   *               not need to be true unless decoding a binary string.
   * @returns The string encoded in UTF-8/Latin-1 binary
   */
  function strToU8(str, latin1) {
      if (latin1) {
          var ar_1 = new u8(str.length);
          for (var i = 0; i < str.length; ++i)
              ar_1[i] = str.charCodeAt(i);
          return ar_1;
      }
      if (te)
          return te.encode(str);
      var l = str.length;
      var ar = new u8(str.length + (str.length >> 1));
      var ai = 0;
      var w = function (v) { ar[ai++] = v; };
      for (var i = 0; i < l; ++i) {
          if (ai + 5 > ar.length) {
              var n = new u8(ai + 8 + ((l - i) << 1));
              n.set(ar);
              ar = n;
          }
          var c = str.charCodeAt(i);
          if (c < 128 || latin1)
              w(c);
          else if (c < 2048)
              w(192 | (c >> 6)), w(128 | (c & 63));
          else if (c > 55295 && c < 57344)
              c = 65536 + (c & 1023 << 10) | (str.charCodeAt(++i) & 1023),
                  w(240 | (c >> 18)), w(128 | ((c >> 12) & 63)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
          else
              w(224 | (c >> 12)), w(128 | ((c >> 6) & 63)), w(128 | (c & 63));
      }
      return slc(ar, 0, ai);
  }
  exports.strToU8 = strToU8;
  /**
   * Converts a Uint8Array to a string
   * @param dat The data to decode to string
   * @param latin1 Whether or not to interpret the data as Latin-1. This should
   *               not need to be true unless encoding to binary string.
   * @returns The original UTF-8/Latin-1 string
   */
  function strFromU8(dat, latin1) {
      if (latin1) {
          var r = '';
          for (var i = 0; i < dat.length; i += 16384)
              r += String.fromCharCode.apply(null, dat.subarray(i, i + 16384));
          return r;
      }
      else if (td)
          return td.decode(dat);
      else {
          var _a = dutf8(dat), out = _a[0], ext = _a[1];
          if (ext.length)
              err(8);
          return out;
      }
  }
  exports.strFromU8 = strFromU8;
  ;
  // deflate bit flag
  var dbf = function (l) { return l == 1 ? 3 : l < 6 ? 2 : l == 9 ? 1 : 0; };
  // skip local zip header
  var slzh = function (d, b) { return b + 30 + b2(d, b + 26) + b2(d, b + 28); };
  // read zip header
  var zh = function (d, b, z) {
      var fnl = b2(d, b + 28), fn = strFromU8(d.subarray(b + 46, b + 46 + fnl), !(b2(d, b + 8) & 2048)), es = b + 46 + fnl, bs = b4(d, b + 20);
      var _a = z && bs == 4294967295 ? z64e(d, es) : [bs, b4(d, b + 24), b4(d, b + 42)], sc = _a[0], su = _a[1], off = _a[2];
      return [b2(d, b + 10), sc, su, fn, es + b2(d, b + 30) + b2(d, b + 32), off];
  };
  // read zip64 extra field
  var z64e = function (d, b) {
      for (; b2(d, b) != 1; b += 4 + b2(d, b + 2))
          ;
      return [b8(d, b + 12), b8(d, b + 4), b8(d, b + 20)];
  };
  // extra field length
  var exfl = function (ex) {
      var le = 0;
      if (ex) {
          for (var k in ex) {
              var l = ex[k].length;
              if (l > 65535)
                  err(9);
              le += l + 4;
          }
      }
      return le;
  };
  // write zip header
  var wzh = function (d, b, f, fn, u, c, ce, co) {
      var fl = fn.length, ex = f.extra, col = co && co.length;
      var exl = exfl(ex);
      wbytes(d, b, ce != null ? 0x2014B50 : 0x4034B50), b += 4;
      if (ce != null)
          d[b++] = 20, d[b++] = f.os;
      d[b] = 20, b += 2; // spec compliance? what's that?
      d[b++] = (f.flag << 1) | (c < 0 && 8), d[b++] = u && 8;
      d[b++] = f.compression & 255, d[b++] = f.compression >> 8;
      var dt = new Date(f.mtime == null ? Date.now() : f.mtime), y = dt.getFullYear() - 1980;
      if (y < 0 || y > 119)
          err(10);
      wbytes(d, b, (y << 25) | ((dt.getMonth() + 1) << 21) | (dt.getDate() << 16) | (dt.getHours() << 11) | (dt.getMinutes() << 5) | (dt.getSeconds() >>> 1)), b += 4;
      if (c != -1) {
          wbytes(d, b, f.crc);
          wbytes(d, b + 4, c < 0 ? -c - 2 : c);
          wbytes(d, b + 8, f.size);
      }
      wbytes(d, b + 12, fl);
      wbytes(d, b + 14, exl), b += 16;
      if (ce != null) {
          wbytes(d, b, col);
          wbytes(d, b + 6, f.attrs);
          wbytes(d, b + 10, ce), b += 14;
      }
      d.set(fn, b);
      b += fl;
      if (exl) {
          for (var k in ex) {
              var exf = ex[k], l = exf.length;
              wbytes(d, b, +k);
              wbytes(d, b + 2, l);
              d.set(exf, b + 4), b += 4 + l;
          }
      }
      if (col)
          d.set(co, b), b += col;
      return b;
  };
  // write zip footer (end of central directory)
  var wzf = function (o, b, c, d, e) {
      wbytes(o, b, 0x6054B50); // skip disk
      wbytes(o, b + 8, c);
      wbytes(o, b + 10, c);
      wbytes(o, b + 12, d);
      wbytes(o, b + 16, e);
  };
  /**
   * A pass-through stream to keep data uncompressed in a ZIP archive.
   */
  var ZipPassThrough = /*#__PURE__*/ (function () {
      /**
       * Creates a pass-through stream that can be added to ZIP archives
       * @param filename The filename to associate with this data stream
       */
      function ZipPassThrough(filename) {
          this.filename = filename;
          this.c = crc();
          this.size = 0;
          this.compression = 0;
      }
      /**
       * Processes a chunk and pushes to the output stream. You can override this
       * method in a subclass for custom behavior, but by default this passes
       * the data through. You must call this.ondata(err, chunk, final) at some
       * point in this method.
       * @param chunk The chunk to process
       * @param final Whether this is the last chunk
       */
      ZipPassThrough.prototype.process = function (chunk, final) {
          this.ondata(null, chunk, final);
      };
      /**
       * Pushes a chunk to be added. If you are subclassing this with a custom
       * compression algorithm, note that you must push data from the source
       * file only, pre-compression.
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      ZipPassThrough.prototype.push = function (chunk, final) {
          if (!this.ondata)
              err(5);
          this.c.p(chunk);
          this.size += chunk.length;
          if (final)
              this.crc = this.c.d();
          this.process(chunk, final || false);
      };
      return ZipPassThrough;
  }());
  exports.ZipPassThrough = ZipPassThrough;
  // I don't extend because TypeScript extension adds 1kB of runtime bloat
  /**
   * Streaming DEFLATE compression for ZIP archives. Prefer using AsyncZipDeflate
   * for better performance
   */
  var ZipDeflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE stream that can be added to ZIP archives
       * @param filename The filename to associate with this data stream
       * @param opts The compression options
       */
      function ZipDeflate(filename, opts) {
          var _this_1 = this;
          if (!opts)
              opts = {};
          ZipPassThrough.call(this, filename);
          this.d = new Deflate(opts, function (dat, final) {
              _this_1.ondata(null, dat, final);
          });
          this.compression = 8;
          this.flag = dbf(opts.level);
      }
      ZipDeflate.prototype.process = function (chunk, final) {
          try {
              this.d.push(chunk, final);
          }
          catch (e) {
              this.ondata(e, null, final);
          }
      };
      /**
       * Pushes a chunk to be deflated
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      ZipDeflate.prototype.push = function (chunk, final) {
          ZipPassThrough.prototype.push.call(this, chunk, final);
      };
      return ZipDeflate;
  }());
  exports.ZipDeflate = ZipDeflate;
  /**
   * Asynchronous streaming DEFLATE compression for ZIP archives
   */
  var AsyncZipDeflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE stream that can be added to ZIP archives
       * @param filename The filename to associate with this data stream
       * @param opts The compression options
       */
      function AsyncZipDeflate(filename, opts) {
          var _this_1 = this;
          if (!opts)
              opts = {};
          ZipPassThrough.call(this, filename);
          this.d = new AsyncDeflate(opts, function (err, dat, final) {
              _this_1.ondata(err, dat, final);
          });
          this.compression = 8;
          this.flag = dbf(opts.level);
          this.terminate = this.d.terminate;
      }
      AsyncZipDeflate.prototype.process = function (chunk, final) {
          this.d.push(chunk, final);
      };
      /**
       * Pushes a chunk to be deflated
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      AsyncZipDeflate.prototype.push = function (chunk, final) {
          ZipPassThrough.prototype.push.call(this, chunk, final);
      };
      return AsyncZipDeflate;
  }());
  exports.AsyncZipDeflate = AsyncZipDeflate;
  // TODO: Better tree shaking
  /**
   * A zippable archive to which files can incrementally be added
   */
  var Zip = /*#__PURE__*/ (function () {
      /**
       * Creates an empty ZIP archive to which files can be added
       * @param cb The callback to call whenever data for the generated ZIP archive
       *           is available
       */
      function Zip(cb) {
          this.ondata = cb;
          this.u = [];
          this.d = 1;
      }
      /**
       * Adds a file to the ZIP archive
       * @param file The file stream to add
       */
      Zip.prototype.add = function (file) {
          var _this_1 = this;
          if (!this.ondata)
              err(5);
          // finishing or finished
          if (this.d & 2)
              this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, false);
          else {
              var f = strToU8(file.filename), fl_1 = f.length;
              var com = file.comment, o = com && strToU8(com);
              var u = fl_1 != file.filename.length || (o && (com.length != o.length));
              var hl_1 = fl_1 + exfl(file.extra) + 30;
              if (fl_1 > 65535)
                  this.ondata(err(11, 0, 1), null, false);
              var header = new u8(hl_1);
              wzh(header, 0, file, f, u, -1);
              var chks_1 = [header];
              var pAll_1 = function () {
                  for (var _i = 0, chks_2 = chks_1; _i < chks_2.length; _i++) {
                      var chk = chks_2[_i];
                      _this_1.ondata(null, chk, false);
                  }
                  chks_1 = [];
              };
              var tr_1 = this.d;
              this.d = 0;
              var ind_1 = this.u.length;
              var uf_1 = mrg(file, {
                  f: f,
                  u: u,
                  o: o,
                  t: function () {
                      if (file.terminate)
                          file.terminate();
                  },
                  r: function () {
                      pAll_1();
                      if (tr_1) {
                          var nxt = _this_1.u[ind_1 + 1];
                          if (nxt)
                              nxt.r();
                          else
                              _this_1.d = 1;
                      }
                      tr_1 = 1;
                  }
              });
              var cl_1 = 0;
              file.ondata = function (err, dat, final) {
                  if (err) {
                      _this_1.ondata(err, dat, final);
                      _this_1.terminate();
                  }
                  else {
                      cl_1 += dat.length;
                      chks_1.push(dat);
                      if (final) {
                          var dd = new u8(16);
                          wbytes(dd, 0, 0x8074B50);
                          wbytes(dd, 4, file.crc);
                          wbytes(dd, 8, cl_1);
                          wbytes(dd, 12, file.size);
                          chks_1.push(dd);
                          uf_1.c = cl_1, uf_1.b = hl_1 + cl_1 + 16, uf_1.crc = file.crc, uf_1.size = file.size;
                          if (tr_1)
                              uf_1.r();
                          tr_1 = 1;
                      }
                      else if (tr_1)
                          pAll_1();
                  }
              };
              this.u.push(uf_1);
          }
      };
      /**
       * Ends the process of adding files and prepares to emit the final chunks.
       * This *must* be called after adding all desired files for the resulting
       * ZIP file to work properly.
       */
      Zip.prototype.end = function () {
          var _this_1 = this;
          if (this.d & 2) {
              this.ondata(err(4 + (this.d & 1) * 8, 0, 1), null, true);
              return;
          }
          if (this.d)
              this.e();
          else
              this.u.push({
                  r: function () {
                      if (!(_this_1.d & 1))
                          return;
                      _this_1.u.splice(-1, 1);
                      _this_1.e();
                  },
                  t: function () { }
              });
          this.d = 3;
      };
      Zip.prototype.e = function () {
          var bt = 0, l = 0, tl = 0;
          for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
              var f = _a[_i];
              tl += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0);
          }
          var out = new u8(tl + 22);
          for (var _b = 0, _c = this.u; _b < _c.length; _b++) {
              var f = _c[_b];
              wzh(out, bt, f, f.f, f.u, -f.c - 2, l, f.o);
              bt += 46 + f.f.length + exfl(f.extra) + (f.o ? f.o.length : 0), l += f.b;
          }
          wzf(out, bt, this.u.length, tl, l);
          this.ondata(null, out, true);
          this.d = 2;
      };
      /**
       * A method to terminate any internal workers used by the stream. Subsequent
       * calls to add() will fail.
       */
      Zip.prototype.terminate = function () {
          for (var _i = 0, _a = this.u; _i < _a.length; _i++) {
              var f = _a[_i];
              f.t();
          }
          this.d = 2;
      };
      return Zip;
  }());
  exports.Zip = Zip;
  function zip(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      var r = {};
      fltn(data, '', r, opts);
      var k = Object.keys(r);
      var lft = k.length, o = 0, tot = 0;
      var slft = lft, files = new Array(lft);
      var term = [];
      var tAll = function () {
          for (var i = 0; i < term.length; ++i)
              term[i]();
      };
      var cbd = function (a, b) {
          mt(function () { cb(a, b); });
      };
      mt(function () { cbd = cb; });
      var cbf = function () {
          var out = new u8(tot + 22), oe = o, cdl = tot - o;
          tot = 0;
          for (var i = 0; i < slft; ++i) {
              var f = files[i];
              try {
                  var l = f.c.length;
                  wzh(out, tot, f, f.f, f.u, l);
                  var badd = 30 + f.f.length + exfl(f.extra);
                  var loc = tot + badd;
                  out.set(f.c, loc);
                  wzh(out, o, f, f.f, f.u, l, tot, f.m), o += 16 + badd + (f.m ? f.m.length : 0), tot = loc + l;
              }
              catch (e) {
                  return cbd(e, null);
              }
          }
          wzf(out, o, files.length, cdl, oe);
          cbd(null, out);
      };
      if (!lft)
          cbf();
      var _loop_1 = function (i) {
          var fn = k[i];
          var _a = r[fn], file = _a[0], p = _a[1];
          var c = crc(), size = file.length;
          c.p(file);
          var f = strToU8(fn), s = f.length;
          var com = p.comment, m = com && strToU8(com), ms = m && m.length;
          var exl = exfl(p.extra);
          var compression = p.level == 0 ? 0 : 8;
          var cbl = function (e, d) {
              if (e) {
                  tAll();
                  cbd(e, null);
              }
              else {
                  var l = d.length;
                  files[i] = mrg(p, {
                      size: size,
                      crc: c.d(),
                      c: d,
                      f: f,
                      m: m,
                      u: s != fn.length || (m && (com.length != ms)),
                      compression: compression
                  });
                  o += 30 + s + exl + l;
                  tot += 76 + 2 * (s + exl) + (ms || 0) + l;
                  if (!--lft)
                      cbf();
              }
          };
          if (s > 65535)
              cbl(err(11, 0, 1), null);
          if (!compression)
              cbl(null, file);
          else if (size < 160000) {
              try {
                  cbl(null, deflateSync(file, p));
              }
              catch (e) {
                  cbl(e, null);
              }
          }
          else
              term.push(deflate(file, p, cbl));
      };
      // Cannot use lft because it can decrease
      for (var i = 0; i < slft; ++i) {
          _loop_1(i);
      }
      return tAll;
  }
  exports.zip = zip;
  /**
   * Synchronously creates a ZIP file. Prefer using `zip` for better performance
   * with more than one file.
   * @param data The directory structure for the ZIP archive
   * @param opts The main options, merged with per-file options
   * @returns The generated ZIP archive
   */
  function zipSync(data, opts) {
      if (!opts)
          opts = {};
      var r = {};
      var files = [];
      fltn(data, '', r, opts);
      var o = 0;
      var tot = 0;
      for (var fn in r) {
          var _a = r[fn], file = _a[0], p = _a[1];
          var compression = p.level == 0 ? 0 : 8;
          var f = strToU8(fn), s = f.length;
          var com = p.comment, m = com && strToU8(com), ms = m && m.length;
          var exl = exfl(p.extra);
          if (s > 65535)
              err(11);
          var d = compression ? deflateSync(file, p) : file, l = d.length;
          var c = crc();
          c.p(file);
          files.push(mrg(p, {
              size: file.length,
              crc: c.d(),
              c: d,
              f: f,
              m: m,
              u: s != fn.length || (m && (com.length != ms)),
              o: o,
              compression: compression
          }));
          o += 30 + s + exl + l;
          tot += 76 + 2 * (s + exl) + (ms || 0) + l;
      }
      var out = new u8(tot + 22), oe = o, cdl = tot - o;
      for (var i = 0; i < files.length; ++i) {
          var f = files[i];
          wzh(out, f.o, f, f.f, f.u, f.c.length);
          var badd = 30 + f.f.length + exfl(f.extra);
          out.set(f.c, f.o + badd);
          wzh(out, o, f, f.f, f.u, f.c.length, f.o, f.m), o += 16 + badd + (f.m ? f.m.length : 0);
      }
      wzf(out, o, files.length, cdl, oe);
      return out;
  }
  exports.zipSync = zipSync;
  /**
   * Streaming pass-through decompression for ZIP archives
   */
  var UnzipPassThrough = /*#__PURE__*/ (function () {
      function UnzipPassThrough() {
      }
      UnzipPassThrough.prototype.push = function (data, final) {
          this.ondata(null, data, final);
      };
      UnzipPassThrough.compression = 0;
      return UnzipPassThrough;
  }());
  exports.UnzipPassThrough = UnzipPassThrough;
  /**
   * Streaming DEFLATE decompression for ZIP archives. Prefer AsyncZipInflate for
   * better performance.
   */
  var UnzipInflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE decompression that can be used in ZIP archives
       */
      function UnzipInflate() {
          var _this_1 = this;
          this.i = new Inflate(function (dat, final) {
              _this_1.ondata(null, dat, final);
          });
      }
      UnzipInflate.prototype.push = function (data, final) {
          try {
              this.i.push(data, final);
          }
          catch (e) {
              this.ondata(e, null, final);
          }
      };
      UnzipInflate.compression = 8;
      return UnzipInflate;
  }());
  exports.UnzipInflate = UnzipInflate;
  /**
   * Asynchronous streaming DEFLATE decompression for ZIP archives
   */
  var AsyncUnzipInflate = /*#__PURE__*/ (function () {
      /**
       * Creates a DEFLATE decompression that can be used in ZIP archives
       */
      function AsyncUnzipInflate(_, sz) {
          var _this_1 = this;
          if (sz < 320000) {
              this.i = new Inflate(function (dat, final) {
                  _this_1.ondata(null, dat, final);
              });
          }
          else {
              this.i = new AsyncInflate(function (err, dat, final) {
                  _this_1.ondata(err, dat, final);
              });
              this.terminate = this.i.terminate;
          }
      }
      AsyncUnzipInflate.prototype.push = function (data, final) {
          if (this.i.terminate)
              data = slc(data, 0);
          this.i.push(data, final);
      };
      AsyncUnzipInflate.compression = 8;
      return AsyncUnzipInflate;
  }());
  exports.AsyncUnzipInflate = AsyncUnzipInflate;
  /**
   * A ZIP archive decompression stream that emits files as they are discovered
   */
  var Unzip = /*#__PURE__*/ (function () {
      /**
       * Creates a ZIP decompression stream
       * @param cb The callback to call whenever a file in the ZIP archive is found
       */
      function Unzip(cb) {
          this.onfile = cb;
          this.k = [];
          this.o = {
              0: UnzipPassThrough
          };
          this.p = et;
      }
      /**
       * Pushes a chunk to be unzipped
       * @param chunk The chunk to push
       * @param final Whether this is the last chunk
       */
      Unzip.prototype.push = function (chunk, final) {
          var _this_1 = this;
          if (!this.onfile)
              err(5);
          if (!this.p)
              err(4);
          if (this.c > 0) {
              var len = Math.min(this.c, chunk.length);
              var toAdd = chunk.subarray(0, len);
              this.c -= len;
              if (this.d)
                  this.d.push(toAdd, !this.c);
              else
                  this.k[0].push(toAdd);
              chunk = chunk.subarray(len);
              if (chunk.length)
                  return this.push(chunk, final);
          }
          else {
              var f = 0, i = 0, is = void 0, buf = void 0;
              if (!this.p.length)
                  buf = chunk;
              else if (!chunk.length)
                  buf = this.p;
              else {
                  buf = new u8(this.p.length + chunk.length);
                  buf.set(this.p), buf.set(chunk, this.p.length);
              }
              var l = buf.length, oc = this.c, add = oc && this.d;
              var _loop_2 = function () {
                  var _a;
                  var sig = b4(buf, i);
                  if (sig == 0x4034B50) {
                      f = 1, is = i;
                      this_1.d = null;
                      this_1.c = 0;
                      var bf = b2(buf, i + 6), cmp_1 = b2(buf, i + 8), u = bf & 2048, dd = bf & 8, fnl = b2(buf, i + 26), es = b2(buf, i + 28);
                      if (l > i + 30 + fnl + es) {
                          var chks_3 = [];
                          this_1.k.unshift(chks_3);
                          f = 2;
                          var sc_1 = b4(buf, i + 18), su_1 = b4(buf, i + 22);
                          var fn_1 = strFromU8(buf.subarray(i + 30, i += 30 + fnl), !u);
                          if (sc_1 == 4294967295) {
                              _a = dd ? [-2] : z64e(buf, i), sc_1 = _a[0], su_1 = _a[1];
                          }
                          else if (dd)
                              sc_1 = -1;
                          i += es;
                          this_1.c = sc_1;
                          var d_1;
                          var file_1 = {
                              name: fn_1,
                              compression: cmp_1,
                              start: function () {
                                  if (!file_1.ondata)
                                      err(5);
                                  if (!sc_1)
                                      file_1.ondata(null, et, true);
                                  else {
                                      var ctr = _this_1.o[cmp_1];
                                      if (!ctr)
                                          file_1.ondata(err(14, 'unknown compression type ' + cmp_1, 1), null, false);
                                      d_1 = sc_1 < 0 ? new ctr(fn_1) : new ctr(fn_1, sc_1, su_1);
                                      d_1.ondata = function (err, dat, final) { file_1.ondata(err, dat, final); };
                                      for (var _i = 0, chks_4 = chks_3; _i < chks_4.length; _i++) {
                                          var dat = chks_4[_i];
                                          d_1.push(dat, false);
                                      }
                                      if (_this_1.k[0] == chks_3 && _this_1.c)
                                          _this_1.d = d_1;
                                      else
                                          d_1.push(et, true);
                                  }
                              },
                              terminate: function () {
                                  if (d_1 && d_1.terminate)
                                      d_1.terminate();
                              }
                          };
                          if (sc_1 >= 0)
                              file_1.size = sc_1, file_1.originalSize = su_1;
                          this_1.onfile(file_1);
                      }
                      return "break";
                  }
                  else if (oc) {
                      if (sig == 0x8074B50) {
                          is = i += 12 + (oc == -2 && 8), f = 3, this_1.c = 0;
                          return "break";
                      }
                      else if (sig == 0x2014B50) {
                          is = i -= 4, f = 3, this_1.c = 0;
                          return "break";
                      }
                  }
              };
              var this_1 = this;
              for (; i < l - 4; ++i) {
                  var state_1 = _loop_2();
                  if (state_1 === "break")
                      break;
              }
              this.p = et;
              if (oc < 0) {
                  var dat = f ? buf.subarray(0, is - 12 - (oc == -2 && 8) - (b4(buf, is - 16) == 0x8074B50 && 4)) : buf.subarray(0, i);
                  if (add)
                      add.push(dat, !!f);
                  else
                      this.k[+(f == 2)].push(dat);
              }
              if (f & 2)
                  return this.push(buf.subarray(i), final);
              this.p = buf.subarray(i);
          }
          if (final) {
              if (this.c)
                  err(13);
              this.p = null;
          }
      };
      /**
       * Registers a decoder with the stream, allowing for files compressed with
       * the compression type provided to be expanded correctly
       * @param decoder The decoder constructor
       */
      Unzip.prototype.register = function (decoder) {
          this.o[decoder.compression] = decoder;
      };
      return Unzip;
  }());
  exports.Unzip = Unzip;
  var mt = typeof queueMicrotask == 'function' ? queueMicrotask : typeof setTimeout == 'function' ? setTimeout : function (fn) { fn(); };
  function unzip(data, opts, cb) {
      if (!cb)
          cb = opts, opts = {};
      if (typeof cb != 'function')
          err(7);
      var term = [];
      var tAll = function () {
          for (var i = 0; i < term.length; ++i)
              term[i]();
      };
      var files = {};
      var cbd = function (a, b) {
          mt(function () { cb(a, b); });
      };
      mt(function () { cbd = cb; });
      var e = data.length - 22;
      for (; b4(data, e) != 0x6054B50; --e) {
          if (!e || data.length - e > 65558) {
              cbd(err(13, 0, 1), null);
              return tAll;
          }
      }
      ;
      var lft = b2(data, e + 8);
      if (lft) {
          var c = lft;
          var o = b4(data, e + 16);
          var z = o == 4294967295 || c == 65535;
          if (z) {
              var ze = b4(data, e - 12);
              z = b4(data, ze) == 0x6064B50;
              if (z) {
                  c = lft = b4(data, ze + 32);
                  o = b4(data, ze + 48);
              }
          }
          var fltr = opts && opts.filter;
          var _loop_3 = function (i) {
              var _a = zh(data, o, z), c_1 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
              o = no;
              var cbl = function (e, d) {
                  if (e) {
                      tAll();
                      cbd(e, null);
                  }
                  else {
                      if (d)
                          files[fn] = d;
                      if (!--lft)
                          cbd(null, files);
                  }
              };
              if (!fltr || fltr({
                  name: fn,
                  size: sc,
                  originalSize: su,
                  compression: c_1
              })) {
                  if (!c_1)
                      cbl(null, slc(data, b, b + sc));
                  else if (c_1 == 8) {
                      var infl = data.subarray(b, b + sc);
                      if (sc < 320000) {
                          try {
                              cbl(null, inflateSync(infl, new u8(su)));
                          }
                          catch (e) {
                              cbl(e, null);
                          }
                      }
                      else
                          term.push(inflate(infl, { size: su }, cbl));
                  }
                  else
                      cbl(err(14, 'unknown compression type ' + c_1, 1), null);
              }
              else
                  cbl(null, null);
          };
          for (var i = 0; i < c; ++i) {
              _loop_3(i);
          }
      }
      else
          cbd(null, {});
      return tAll;
  }
  exports.unzip = unzip;
  /**
   * Synchronously decompresses a ZIP archive. Prefer using `unzip` for better
   * performance with more than one file.
   * @param data The raw compressed ZIP file
   * @param opts The ZIP extraction options
   * @returns The decompressed files
   */
  function unzipSync(data, opts) {
      var files = {};
      var e = data.length - 22;
      for (; b4(data, e) != 0x6054B50; --e) {
          if (!e || data.length - e > 65558)
              err(13);
      }
      ;
      var c = b2(data, e + 8);
      if (!c)
          return {};
      var o = b4(data, e + 16);
      var z = o == 4294967295 || c == 65535;
      if (z) {
          var ze = b4(data, e - 12);
          z = b4(data, ze) == 0x6064B50;
          if (z) {
              c = b4(data, ze + 32);
              o = b4(data, ze + 48);
          }
      }
      var fltr = opts && opts.filter;
      for (var i = 0; i < c; ++i) {
          var _a = zh(data, o, z), c_2 = _a[0], sc = _a[1], su = _a[2], fn = _a[3], no = _a[4], off = _a[5], b = slzh(data, off);
          o = no;
          if (!fltr || fltr({
              name: fn,
              size: sc,
              originalSize: su,
              compression: c_2
          })) {
              if (!c_2)
                  files[fn] = slc(data, b, b + sc);
              else if (c_2 == 8)
                  files[fn] = inflateSync(data.subarray(b, b + sc), new u8(su));
              else
                  err(14, 'unknown compression type ' + c_2);
          }
      }
      return files;
  }
  exports.unzipSync = unzipSync;
  

});

;/*!node_modules/office-viewer/lib/package/ZipPackageParser.js*/
amis.define("26a08cb",(function(t,e,r,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("node_modules/fflate/lib/index.cjs"),o=function(){function t(){}return t.prototype.load=function(t){this.zip=i.unzipSync(new Uint8Array(t))},t.prototype.getXML=function(t){var e=this.getFileByType(t,"string"),r=(new DOMParser).parseFromString(e,"application/xml"),n=r.getElementsByTagName("parsererror").item(0);if(n)throw new Error(n.textContent||"can't parse xml");return r},t.prototype.getFileByType=function(t,e){t=t.startsWith("/")?t.slice(1):t;var r=this.zip[t];if(r){if("string"===e)return i.strFromU8(r);if("blob"===e)return new Blob([r]);if("uint8array"===e)return r}return console.warn("getFileByType",t,"not found"),null},t.prototype.fileExists=function(t){return(t=t.startsWith("/")?t.slice(1):t)in this.zip},t.prototype.generateZip=function(t){return this.zip["word/document.xml"]=i.strToU8(t),new Blob([i.zipSync(this.zip)])},t}();e.default=o}));
;/*!node_modules/office-viewer/lib/render/renderFont.js*/
amis.define("d3e304e",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("8701f02"),l=e("8d43ec5");n.renderFont=function(e){var n,r;if(!e)return null;var t=e.fonts;if(!t||!t.length)return null;var f=l.createElement("style"),o="/** embedded fonts **/";try{for(var c=a.__values(e.fonts),u=c.next();!u.done;u=c.next()){var i=u.value,d=i.name.replace(/['\\]/g,""),s=i.url;d&&s&&(o+="\n      @font-face {\n        font-family: '".concat(d,"';\n        src: url('").concat(s,"');\n      }\n      "))}}catch(e){n={error:e}}finally{try{u&&!u.done&&(r=c.return)&&r.call(c)}finally{if(n)throw n.error}}return f.innerHTML=o,f}}));
;/*!node_modules/office-viewer/lib/util/createObject.js*/
amis.define("bc7c676",(function(e,r,t,c){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("8701f02");function u(e,r){void 0===r&&(r=!0);var t=e&&e.__super?Object.create(e.__super,{__super:{value:e.__super,writable:!1,enumerable:!1}}):Object.create(Object.prototype);return r&&e&&Object.keys(e).forEach((function(r){return t[r]=e[r]})),t}function a(e){var r=typeof e;return e&&"string"!==r&&"number"!==r&&"boolean"!==r&&"function"!==r&&!Array.isArray(e)}r.cloneObject=u,r.createObject=function(e,r,t){e&&Object.isFrozen(e)&&(e=u(e));var c=e?Object.create(e,n.__assign(n.__assign({},t),{__super:{value:e,writable:!1,enumerable:!1}})):Object.create(Object.prototype,t);return r&&a(r)&&Object.keys(r).forEach((function(e){return c[e]=r[e]})),c},r.isObject=a}));
;/*!node_modules/office-viewer/lib/util/replaceVar.js*/
amis.define("741e9df",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("8701f02"),l=e("bc7c676");function o(e,r,t){var a=r.textContent||"",n=e.renderOptions.evalVar;if(a.startsWith("{{")){a=a.replace(/^{{/g,"").replace(/}}$/g,"");var l=String(n(a,t))||"";r.textContent=l}}function i(e,r){var t,a,i,v,f,y,u,d,s=e.renderOptions.evalVar,x=e.renderOptions.data,h=r.parentNode,g=r.getElementsByTagName("w:tc"),m=!1,p=[];try{for(var _=n.__values(g),w=_.next();!w.done;w=_.next()){var C=w.value.getElementsByTagName("w:t");try{for(var N=(i=void 0,n.__values(C)),E=N.next();!E.done;E=N.next()){var O=($=E.value).textContent||"";if(O.startsWith("{{#")){var T=/{{#([^\}]+)}}/.exec(O);if(T&&T.length>0){m=!0;var b=T[1],B=s(b,x);Array.isArray(B)&&(p=B),$.textContent=$.textContent.replace("{{#".concat(b,"}}"),"")}}O.indexOf("{{/}}")&&($.textContent=$.textContent.replace("{{/}}",""))}}catch(e){i={error:e}}finally{try{E&&!E.done&&(v=N.return)&&v.call(N)}finally{if(i)throw i.error}}}}catch(e){t={error:e}}finally{try{w&&!w.done&&(a=_.return)&&a.call(_)}finally{if(t)throw t.error}}if(m){try{for(var V=n.__values(p),A=V.next();!A.done;A=V.next()){var j=A.value,S=c(r),W=(C=S.getElementsByTagName("w:t"),l.createObject(x,j));try{for(var M=(u=void 0,n.__values(C)),P=M.next();!P.done;P=M.next()){var $;o(e,$=P.value,W)}}catch(e){u={error:e}}finally{try{P&&!P.done&&(d=M.return)&&d.call(M)}finally{if(u)throw u.error}}h.appendChild(S)}}catch(e){f={error:e}}finally{try{A&&!A.done&&(y=V.return)&&y.call(V)}finally{if(f)throw f.error}}h.removeChild(r)}}function c(e){var r,t,a,l,o,i=e.cloneNode(!0);v(i);var c=[].slice.call(i.getElementsByTagName("w:p"));try{for(var f=n.__values(c),y=f.next();!y.done;y=f.next()){v(y.value)}}catch(e){r={error:e}}finally{try{y&&!y.done&&(t=f.return)&&t.call(f)}finally{if(r)throw r.error}}var u=[].slice.call(i.getElementsByTagName("w:cnfStyle"));try{for(var d=n.__values(u),s=d.next();!s.done;s=d.next()){var x=s.value;null===(o=x.parentElement)||void 0===o||o.removeChild(x)}}catch(e){a={error:e}}finally{try{s&&!s.done&&(l=d.return)&&l.call(d)}finally{if(a)throw a.error}}return i}function v(e){for(;e.attributes.length>0;)e.removeAttributeNode(e.attributes[0])}r.replaceT=o,r.replaceVar=function(e,r){!function(e,r){var t,a;e.renderOptions.evalVar;var l=[].slice.call(r.getElementsByTagName("w:tr"));try{for(var o=n.__values(l),c=o.next();!c.done;c=o.next())i(e,c.value)}catch(e){t={error:e}}finally{try{c&&!c.done&&(a=o.return)&&a.call(o)}finally{if(t)throw t.error}}}(e,r)}}));
;/*!node_modules/office-viewer/lib/Word.js*/
amis.define("f7af913",(function(t,e,r,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t("8701f02"),s=t("23e79ad"),o=t("06bce7a"),a=t("fa6ad08"),l=t("975b67c"),d=t("08d6bdd"),p=t("1b805fe"),h=t("5c71425"),u=t("b712a63"),c=t("8d43ec5"),f=t("43be307"),m=t("239415c"),y=t("e23579e"),v=t("1bf9315"),g=t("26a08cb"),b=t("ae95200"),w=t("8b96ab3"),x=t("d3e304e"),T=t("741e9df"),_={classPrefix:"docx-viewer",inWrap:!0,bulletUseFont:!0,ignoreHeight:!0,ignoreWidth:!1,minLineHeight:1,enableVar:!1,debug:!1,printWaitTime:100,data:{},evalVar:function(t){return t}},L=function(){function t(e,r,i){void 0===i&&(i=new g.default),this.themes=[],this.styleIdMap={},this.styleIdNum=0,this.wrapClassName="docx-viewer-wrapper",this.inited=!1,i.load(e),this.id=t.globalId++,this.parser=i,this.renderOptions=n.__assign(n.__assign({},_),r)}return t.prototype.init=function(){this.inited||(this.initContentType(),this.initRelation(),this.initTheme(),this.initFontTable(),this.initStyle(),this.initNumbering(),this.inited=!0)},t.prototype.initTheme=function(){var t,e;try{for(var r=n.__values(this.conentTypes.overrides),i=r.next();!i.done;i=r.next()){var s=i.value;if(s.partName.startsWith("/word/theme")){var o=this.parser.getXML(s.partName);this.themes.push(d.parseTheme(o))}}}catch(e){t={error:e}}finally{try{i&&!i.done&&(e=r.return)&&e.call(r)}finally{if(t)throw t.error}}},t.prototype.initStyle=function(){var t,e;try{for(var r=n.__values(this.conentTypes.overrides),i=r.next();!i.done;i=r.next()){i.value.partName.startsWith("/word/styles.xml")&&(this.styles=l.parseStyles(this,this.parser.getXML("/word/styles.xml")))}}catch(e){t={error:e}}finally{try{i&&!i.done&&(e=r.return)&&e.call(r)}finally{if(t)throw t.error}}},t.prototype.initFontTable=function(){var t,e;try{for(var r=n.__values(this.conentTypes.overrides),i=r.next();!i.done;i=r.next()){i.value.partName.startsWith("/word/fontTable.xml")&&(this.fontTable=s.FontTable.fromXML(this,this.parser.getXML("/word/fontTable.xml")))}}catch(e){t={error:e}}finally{try{i&&!i.done&&(e=r.return)&&e.call(r)}finally{if(t)throw t.error}}},t.prototype.initRelation=function(){var t={};this.parser.fileExists("/_rels/.rels")&&(t=o.parseRelationships(this.parser.getXML("/_rels/.rels"),"root")),this.relationships=t;var e={};this.parser.fileExists("/word/_rels/document.xml.rels")&&(e=o.parseRelationships(this.parser.getXML("/word/_rels/document.xml.rels"),"word")),this.documentRels=e;var r={};this.parser.fileExists("/word/_rels/fontTable.xml.rels")&&(r=o.parseRelationships(this.parser.getXML("/word/_rels/fontTable.xml.rels"),"word")),this.fontTableRels=r},t.prototype.initContentType=function(){var t=this.parser.getXML("[Content_Types].xml");this.conentTypes=a.parseContentType(t)},t.prototype.initNumbering=function(){var t,e;try{for(var r=n.__values(this.conentTypes.overrides),i=r.next();!i.done;i=r.next()){var s=i.value;if(s.partName.startsWith("/word/numbering")){var o=this.parser.getXML(s.partName);this.numbering=u.Numbering.fromXML(this,o)}}}catch(e){t={error:e}}finally{try{i&&!i.done&&(e=r.return)&&e.call(r)}finally{if(t)throw t.error}}},t.prototype.getRelationship=function(t){return t&&this.relationships?this.relationships[t]:null},t.prototype.getDocumentRels=function(t){return t&&this.documentRels?this.documentRels[t]:null},t.prototype.getFontTableRels=function(t){return t&&this.fontTableRels?this.fontTableRels[t]:null},t.prototype.replaceText=function(t){if(!1===this.renderOptions.enableVar)return t;var e=this.renderOptions.data;if(-1!==t.indexOf("{{")){t=t.replace(/^{{/g,"").replace(/}}$/g,"");var r=this.renderOptions.evalVar(t,e);return void 0===r?"":String(r)}return t},t.prototype.loadImage=function(t){var e=t.target;"word"===t.part&&(e="word/"+e);var r=this.parser.getFileByType(e,"blob");return r?URL.createObjectURL(r):null},t.prototype.loadFont=function(t,e){var r=this.getFontTableRels(t);if(!r)return null;var i=r.target;"word"===r.part&&(i="word/"+i);var n=this.parser.getFileByType(i,"uint8array");return n?URL.createObjectURL(new Blob([w.deobfuscate(n,e)])):null},t.prototype.getXML=function(t){return this.parser.getXML(t)},t.prototype.getStyleIdDisplayName=function(t){return t.match(/^[a-zA-Z]+[a-zA-Z0-9\-\_]*$/)?this.getClassPrefix()+"-"+t:(t in this.styleIdMap||(this.styleIdMap[t]=this.genClassName()),this.styleIdMap[t])},t.prototype.genClassName=function(){return"docx-classname-"+this.styleIdNum++},t.prototype.appendStyle=function(t){void 0===t&&(t="");var e=c.createElement("style");e.textContent=t,this.rootElement.appendChild(e)},t.prototype.getStyleClassName=function(t){var e=this.styles.styleMap[t];if(!e)return[];var r=[this.getStyleIdDisplayName(t)];return e.basedOn&&r.unshift(this.getStyleIdDisplayName(e.basedOn)),r},t.prototype.getClassPrefix=function(){return"".concat(this.renderOptions.classPrefix,"-").concat(this.id)},t.prototype.getThemeColor=function(t){var e,r,i;if(this.themes&&this.themes.length>0){var n=null===(i=null===(r=null===(e=this.themes[0].themeElements)||void 0===e?void 0:e.clrScheme)||void 0===r?void 0:r.colors)||void 0===i?void 0:i[t];if(n)return n;console.warn("unknown theme color: "+t)}return""},t.prototype.addClass=function(t,e){t.classList.add("".concat(this.getClassPrefix(),"-").concat(e))},t.prototype.updateVariable=function(){this.rootElement&&!1!==this.renderOptions.enableVar&&v.updateVariableText(this)},t.prototype.download=function(t){void 0===t&&(t="document.docx");var e=this.getXML("word/document.xml");if(this.renderOptions.enableVar){m.mergeRun(this,e),T.replaceVar(this,e);for(var r=e.getElementsByTagName("w:t"),i=0;i<r.length;i++)T.replaceT(this,r[i],this.renderOptions.data)}var n=this.parser.generateZip(b.buildXML(e));h.downloadBlob(n,t)},t.prototype.print=function(){var t,e;return n.__awaiter(this,void 0,void 0,(function(){var r;return n.__generator(this,(function(i){switch(i.label){case 0:return(r=document.createElement("iframe")).style.position="absolute",r.style.top="-10000px",document.body.appendChild(r),null===(t=r.contentDocument)||void 0===t||t.write('<div id="print"></div>'),[4,this.render(null===(e=r.contentDocument)||void 0===e?void 0:e.getElementById("print"))];case 1:return i.sent(),setTimeout((function(){var t,e;r.focus(),null===(t=r.contentWindow)||void 0===t||t.print(),null===(e=r.parentNode)||void 0===e||e.removeChild(r)}),this.renderOptions.printWaitTime||100),window.focus(),[2]}}))}))},t.prototype.render=function(t){return n.__awaiter(this,void 0,void 0,(function(){var e,r,i,s,o;return n.__generator(this,(function(n){return this.init(),e=this.renderOptions,(r=e.debug)&&console.log("init",this),this.rootElement=t,t.innerHTML="",i=this.getXML("word/document.xml"),r&&console.log("documentData",i),e.enableVar&&(m.mergeRun(this,i),T.replaceVar(this,i)),s=y.WDocument.fromXML(this,i),r&&console.log("document",s),o=p.default(this,s),t.classList.add(this.getClassPrefix()),e.inWrap&&t.classList.add(this.wrapClassName),c.appendChild(t,f.renderStyle(this)),c.appendChild(t,x.renderFont(this.fontTable)),c.appendChild(t,o),[2]}))}))},t.globalId=0,t}();e.default=L}));
;/*!node_modules/office-viewer/lib/index.js*/
amis.define("472c691",(function(e,d,f,t){"use strict";Object.defineProperty(d,"__esModule",{value:!0});var a=e("f7af913"),u={Word:a.default};d.Word=a.default,d.default=u}));