;/*!node_modules/office-viewer/lib/OpenXML.js*/
amis.define("dd1dc63",(function(t,e,r,n){"use strict";function u(t){return t.getAttribute("w:val")||t.getAttribute("w14:val")||t.getAttribute("val")||""}function i(t,e){if(void 0===e&&(e=!1),"boolean"==typeof t)return t;if("string"==typeof t){switch(t){case"1":case"on":case"true":return!0;case"0":case"off":case"false":return!1}if("number"==typeof t)return 0!==t}return e}Object.defineProperty(e,"__esModule",{value:!0}),e.getAttrBoolean=function(t,e,r){return void 0===r&&(r=!0),i(t.getAttribute(e),r)},e.getAttrNumber=function(t,e,r){void 0===r&&(r=0);var n=t.getAttribute(e);return n?parseInt(n,10):r},e.getAttrPercent=function(t,e){var r=t.getAttribute(e);return r?r.endsWith("%")?parseInt(r,10)/100:parseInt(r,10)/1e5:1},e.getVal=u,e.getValBoolean=function(t,e){return void 0===e&&(e=!0),i(u(t),e)},e.getValHex=function(t){return parseInt(u(t)||"0",16)},e.getValNumber=function(t){return parseInt(u(t),10)},e.normalizeBoolean=i}));
;/*!node_modules/office-viewer/lib/openxml/word/Font.js*/
amis.define("2d81260",(function(e,a,t,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("c1138ba"),c=e("dd1dc63");var o=function(){function e(){}return e.fromXML=function(a,t){var r,o,s=new e;s.name=t.getAttribute("w:name")||"";try{for(var l=n.__values(t.children),i=l.next();!i.done;i=l.next()){var u=i.value,d=u.tagName;switch(d){case"w:family":s.family=c.getVal(u);break;case"w:altName":s.altName=c.getVal(u);break;case"w:panose1":case"w:charset":case"w:sig":case"w:pitch":break;case"w:embedRegular":case"w:embedBold":case"w:embedItalic":case"w:embedBoldItalic":case"w:embedSystemFonts":case"w:embedTrueTypeFonts":var w=u.getAttribute("r:id")||"",f=u.getAttribute("w:fontKey")||"",b=a.loadFont(w,f);b&&(s.url=b);break;default:console.warn("parse Font: Unknown key",d,u)}}}catch(e){r={error:e}}finally{try{i&&!i.done&&(o=l.return)&&o.call(l)}finally{if(r)throw r.error}}return s},e}();a.Font=o,a.deobfuscate=function(e,a){for(var t=a.replace(/{|}|-/g,""),r=new Array(16),n=0;n<16;n++)r[16-n-1]=parseInt(t.substr(2*n,2),16);for(n=0;n<32;n++)e[n]=e[n]^r[n%16];return e}}));
;/*!node_modules/office-viewer/lib/openxml/word/FontTable.js*/
amis.define("cb021f4",(function(r,e,n,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var o=r("c1138ba"),a=r("2d81260"),f=function(){function r(){this.fonts=[]}return r.fromXML=function(e,n){var t,f,u=Array.from(n.getElementsByTagName("w:font")),i=new r;try{for(var l=o.__values(u),c=l.next();!c.done;c=l.next()){var s=c.value,v=a.Font.fromXML(e,s);i.fonts.push(v)}}catch(r){t={error:r}}finally{try{c&&!c.done&&(f=l.return)&&f.call(l)}finally{if(t)throw t.error}}return i},r}();e.FontTable=f}));
;/*!node_modules/office-viewer/lib/parse/parseRelationship.js*/
amis.define("724ba4d",(function(e,t,r,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("c1138ba");function n(e,t){return{id:e.getAttribute("Id")||"",type:e.getAttribute("Type")||"",target:e.getAttribute("Target")||"",targetMode:e.getAttribute("TargetMode")||"",part:t}}t.parseRelationship=n,t.parseRelationships=function(e,t){var r,a,o={},u=e.getElementsByTagName("Relationship");try{for(var l=i.__values(u),s=l.next();!s.done;s=l.next()){var d=n(s.value,t);o[d.id]=d}}catch(e){r={error:e}}finally{try{s&&!s.done&&(a=l.return)&&a.call(l)}finally{if(r)throw r.error}}return o}}));
;/*!node_modules/office-viewer/lib/openxml/ContentType.js*/
amis.define("96ad35b",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("c1138ba");r.parseContentType=function(e){var r,t,a={overrides:[]},i=[].slice.call(e.getElementsByTagName("Override"));try{for(var o=n.__values(i),l=o.next();!l.done;l=o.next()){var u=l.value;a.overrides.push({partName:u.getAttribute("PartName"),contentType:u.getAttribute("ContentType")})}}catch(e){r={error:e}}finally{try{l&&!l.done&&(t=o.return)&&t.call(o)}finally{if(r)throw r.error}}return a}}));
;/*!node_modules/office-viewer/lib/parse/parseSize.js*/
amis.define("da61922",(function(t,n,e,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i={Dxa:{mul:.066665,unit:"px"},Emu:{mul:1.3333/12700,unit:"px"},FontSize:{mul:.66665,unit:"px"},Border:{mul:.1666625,unit:"px"},Point:{mul:1.3333,unit:"px"},Percent:{mul:.02,unit:"%"},LineHeight:{mul:1/240,unit:""},VmlEmu:{mul:1/12700,unit:""}};function r(t,n){return void 0===n&&(n=i.Dxa),null==t||/.+(p[xt]|[%])$/.test(t)?t:"".concat((parseInt(t)*n.mul).toFixed(2)).concat(n.unit)}n.LengthUsage=i,n.convertAngle=function(t){return t?parseInt(t)/6e4:0},n.convertLength=r,n.parseSize=function(t,n,e){void 0===e&&(e=i.Dxa);var u=t.getAttribute(n);return u?r(String(u),e):""}}));
;/*!node_modules/office-viewer/lib/parse/parseCellMargin.js*/
amis.define("8e17e56",(function(e,a,r,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=e("c1138ba"),n=e("da61922");a.parseCellMargin=function(e,a){var r,t;try{for(var s=i.__values(e.children),c=s.next();!c.done;c=s.next()){var d=c.value;switch(d.tagName){case"w:left":case"w:start":a["padding-left"]=n.parseSize(d,"w:w");break;case"w:right":case"w:end":a["padding-right"]=n.parseSize(d,"w:w");break;case"w:top":a["padding-top"]=n.parseSize(d,"w:w");break;case"w:bottom":a["padding-bottom"]=n.parseSize(d,"w:w")}}}catch(e){r={error:e}}finally{try{c&&!c.done&&(t=s.return)&&t.call(s)}finally{if(r)throw r.error}}}}));
;/*!node_modules/office-viewer/lib/parse/colorNameMap.js*/
amis.define("8a56582",(function(e,f,a,d){"use strict";Object.defineProperty(f,"__esModule",{value:!0});f.PresetColorMap={aliceBlue:"#f0f8ff",antiqueWhite:"#faebd7",aqua:"#00ffff",aquamarine:"#7fffd4",azure:"#f0ffff",beige:"#f5f5dc",bisque:"#ffe4c4",black:"#000000",blanchedAlmond:"#ffebcd",blue:"#0000ff",blueViolet:"#8a2be2",brown:"#a52a2a",burlyWood:"#deb887",cadetBlue:"#5f9ea0",chartreuse:"#7fff00",chocolate:"#d2691e",coral:"#ff7f50",cornflowerBlue:"#6495ed",cornsilk:"#fff8dc",crimson:"#dc143c",cyan:"#00FFFF",darkBlue:"#00008B",dkBlue:"#00008B",darkCyan:"#008B8B",dkCyan:"#008B8B",darkGoldenrod:"#b8860b",dkGoldenrod:"#b8860b",darkGray:"#A9A9A9",dkGray:"#A9A9A9",darkGreen:"#006400",dkGreen:"#006400",darkGrey:"#a9a9a9",dkGrey:"#a9a9a9",darkKhaki:"#bdb76b",dkKhaki:"#bdb76b",darkMagenta:"#800080",dkMagenta:"#800080",darkOliveGreen:"#556b2f",dkOliveGreen:"#556b2f",darkOrange:"#ff8c00",dkOrange:"#ff8c00",darkOrchid:"#9932cc",dkOrchid:"#9932cc",darkRed:"#8B0000",dkRed:"#8B0000",darkSalmon:"#e9967a",dkSalmon:"#e9967a",darkSeaGreen:"#8fbc8f",dkSeaGreen:"#8fbc8f",darkSlateBlue:"#483d8b",dkSlateBlue:"#483d8b",darkSlateGray:"#2f4f4f",dkSlateGray:"#2f4f4f",darkSlateGrey:"#2f4f4f",dkSlateGrey:"#2f4f4f",darkTurquoise:"#00ced1",dkTurquoise:"#00ced1",darkViolet:"#9400d3",dkViolet:"#9400d3",darkYellow:"#808000",deepPink:"#ff1493",deepSkyBlue:"#00bfff",dimGray:"#696969",dimGrey:"#696969",dodgerBlue:"#1e90ff",firebrick:"#b22222",floralWhite:"#fffaf0",forestGreen:"#228b22",fuchsia:"#ff00ff",gainsboro:"#dcdcdc",ghostWhite:"#f8f8ff",gold:"#ffd700",goldenrod:"#daa520",gray:"#808080",green:"#008000",greenYellow:"#adff2f",grey:"#808080",honeydew:"#f0fff0",hotPink:"#ff69b4",indianRed:"#cd5c5c",indigo:"#4b0082",ivory:"#fffff0",khaki:"#f0e68c",lavender:"#e6e6fa",lavenderBlush:"#fff0f5",lawnGreen:"#7cfc00",lemonChiffon:"#fffacd",lightBlue:"#add8e6",ltBlue:"#add8e6",lightCoral:"#f08080",ltCoral:"#f08080",lightCyan:"#e0ffff",ltCyan:"#e0ffff",lightGoldenrodYellow:"#fafad2",ltGoldenrodYellow:"#fafad2",lightGray:"#D3D3D3",ltGray:"#D3D3D3",lightGreen:"#90ee90",ltGreen:"#90ee90",lightGrey:"#d3d3d3",ltGrey:"#d3d3d3",lightPink:"#ffb6c1",ltPink:"#ffb6c1",lightSalmon:"#ffa07a",ltSalmon:"#ffa07a",lightSeaGreen:"#20b2aa",ltSeaGreen:"#20b2aa",lightSkyBlue:"#87cefa",ltSkyBlue:"#87cefa",lightSlateGray:"#778899",ltSlateGray:"#778899",lightSlateGrey:"#778899",ltSlateGrey:"#778899",lightSteelBlue:"#b0c4de",ltSteelBlue:"#b0c4de",lightYellow:"#ffffe0",ltYellow:"#ffffe0",lime:"#00ff00",limeGreen:"#32cd32",linen:"#faf0e6",magenta:"#FF00FF",maroon:"#800000",mediumAquamarine:"#66cdaa",medAquamarine:"#66cdaa",mediumBlue:"#0000cd",medBlue:"#0000cd",mediumOrchid:"#ba55d3",medOrchid:"#ba55d3",mediumPurple:"#9370db",medPurple:"#9370db",mediumSeaGreen:"#3cb371",medSeaGreen:"#3cb371",mediumSlateBlue:"#7b68ee",medSlateBlue:"#7b68ee",mediumSpringGreen:"#00fa9a",medSpringGreen:"#00fa9a",mediumTurquoise:"#48d1cc",medTurquoise:"#48d1cc",mediumVioletRed:"#c71585",medVioletRed:"#c71585",midnightBlue:"#191970",mintCream:"#f5fffa",mistyRose:"#ffe4e1",moccasin:"#ffe4b5",navajoWhite:"#ffdead",navy:"#000080",none:"transparent",oldLace:"#fdf5e6",olive:"#808000",oliveDrab:"#6b8e23",orange:"#ffa500",orangeRed:"#ff4500",orchid:"#da70d6",paleGoldenrod:"#eee8aa",paleGreen:"#98fb98",paleTurquoise:"#afeeee",paleVioletRed:"#db7093",papayaWhip:"#ffefd5",peachPuff:"#ffdab9",peru:"#cd853f",pink:"#ffc0cb",plum:"#dda0dd",powderBlue:"#b0e0e6",purple:"#800080",rebeccaPurple:"#663399",red:"#ff0000",rosyBrown:"#bc8f8f",royalBlue:"#4169e1",saddleBrown:"#8b4513",salmon:"#fa8072",sandyBrown:"#f4a460",seaGreen:"#2e8b57",seaShell:"#fff5ee",sienna:"#a0522d",silver:"#c0c0c0",skyBlue:"#87ceeb",slateBlue:"#6a5acd",slateGray:"#708090",slateGrey:"#708090",snow:"#fffafa",springGreen:"#00ff7f",steelBlue:"#4682b4",tan:"#d2b48c",teal:"#008080",thistle:"#d8bfd8",tomato:"#ff6347",turquoise:"#40e0d0",violet:"#ee82ee",wheat:"#f5deb3",white:"#ffffff",whiteSmoke:"#f5f5f5",yellow:"#ffff00",yellowGreen:"#9acd32"}}));
;/*!node_modules/office-viewer/lib/parse/parseColor.js*/
amis.define("09c12c7",(function(t,r,e,c){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=t("dd1dc63"),a=t("8a56582"),u=["black","blue","green","red","white","yellow"];function s(t,r,e,c){void 0===e&&(e="w:color"),void 0===c&&(c="black");var n=r.getAttribute(e);if(n)return"auto"==n?c:u.includes(n)?n:n in a.PresetColorMap?a.PresetColorMap[n]:"#".concat(n);var s=r.getAttribute("w:themeColor");return s?t.getThemeColor(s):""}function o(t,r){"FFFFFF"===t&&(t="000000");var e=parseInt(t.substring(0,2),16),c=parseInt(t.substring(2,4),16),n=parseInt(t.substring(4,6),16);return"rgba(".concat(e,", ").concat(c,", ").concat(n,", ").concat(r,")")}r.cssColors=u,r.parseColor=function(t,r){return s(t,r,"w:val")},r.parseColorAttr=s,r.parseShdColor=function(t,r){var e=r.getAttribute("w:fill")||"",c=n.getVal(r);if("auto"===e&&(e="FFFFFF"),6===e.length)switch(c){case"clear":return"#".concat(e);case"pct10":return o(e,.1);case"pct12":return o(e,.125);case"pct15":return o(e,.15);case"pct20":return o(e,.2);case"pct25":return o(e,.25);case"pct30":return o(e,.3);case"pct35":return o(e,.35);case"pct37":return o(e,.375);case"pct40":return o(e,.4);case"pct45":return o(e,.45);case"pct5":return o(e,.05);case"pct50":return o(e,.5);case"pct55":return o(e,.55);case"pct60":return o(e,.6);case"pct65":return o(e,.65);case"pct70":return o(e,.7);case"pct75":return o(e,.75);case"pct80":return o(e,.8);case"pct85":return o(e,.85);case"pct87":return o(e,.87);case"pct90":return o(e,.9);case"pct95":return o(e,.95);default:return console.warn("unsupport shd val",c),"#".concat(e)}return""}}));
;/*!node_modules/office-viewer/lib/parse/parseBorder.js*/
amis.define("0e6de16",(function(e,r,a,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("c1138ba"),n=e("dd1dc63"),c=e("09c12c7"),s=e("da61922");function d(e,r){var a=n.getVal(r);if("nil"===a||"none"===a)return"none";var t=c.parseColorAttr(e,r),o=s.parseSize(r,"w:sz",s.LengthUsage.Border);return"".concat(o," solid ").concat("auto"==t?"black":t)}r.parseBorder=d,r.parseBorders=function(e,r,a){var t,n;try{for(var c=o.__values(r.children),s=c.next();!s.done;s=c.next()){var i=s.value;switch(i.tagName){case"w:start":case"w:left":a["border-left"]=d(e,i);break;case"w:end":case"w:right":a["border-right"]=d(e,i);break;case"w:top":a["border-top"]=d(e,i);break;case"w:bottom":a["border-bottom"]=d(e,i)}}}catch(e){t={error:e}}finally{try{s&&!s.done&&(n=c.return)&&n.call(c)}finally{if(t)throw t.error}}}}));
;/*!node_modules/office-viewer/lib/parse/parseTextDirection.js*/
amis.define("310a687",(function(e,t,r,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.parseTextDirection=function(e,t){switch(e.getAttribute("w:val")){case"lr":case"lrV":case"btLr":case"lrTb":case"lrTbV":case"tbLrV":t.direction="ltr";break;case"rl":case"rlV":case"tbRl":case"tbRlV":t.direction="rtl"}}}));
;/*!node_modules/office-viewer/lib/parse/parseTblWidth.js*/
amis.define("9e1385f",(function(e,t,r,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("da61922");t.parseTblWidth=function(e){var t=e.getAttribute("w:type");return t&&"dxa"!==t?"pct"===t?i.parseSize(e,"w:w",i.LengthUsage.Percent):"auto"===t?"auto":(console.warn("parseTblWidth: ignore type",t,e),""):i.parseSize(e,"w:w")}}));
;/*!node_modules/office-viewer/lib/parse/parseInsideBorders.js*/
amis.define("65149c7",(function(e,r,i,s){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("0e6de16");r.parseInsideBorders=function(e,r){var i,s,a=r.getElementsByTagName("w:insideH").item(0);a&&(i=t.parseBorder(e,a));var n=r.getElementsByTagName("w:insideV").item(0);return n&&(s=t.parseBorder(e,n)),{H:i,V:s}}}));
;/*!node_modules/office-viewer/lib/parse/parseTcPr.js*/
amis.define("fb63347",(function(e,a,r,c){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var t=e("c1138ba"),n=e("8e17e56"),i=e("09c12c7"),s=e("dd1dc63"),l=e("0e6de16"),o=e("310a687"),d=e("9e1385f"),b=e("65149c7");function p(e,a){switch(s.getVal(e)){case"bottom":a["vertical-align"]="bottom";break;case"center":a["vertical-align"]="middle";break;case"top":a["vertical-align"]="top"}}function g(e,a){var r=d.parseTblWidth(e);r&&(a.width=r)}a.parseTblCellSpacing=function(e,a){var r=d.parseTblWidth(e);r&&(a["cell-spacing"]=r)},a.parseTcPr=function(e,a){var r,c,d={},w={};d.cssStyle=w;try{for(var k=t.__values(a.children),u=k.next();!u.done;u=k.next()){var f=u.value,v=f.tagName;switch(v){case"w:tcMar":n.parseCellMargin(f,w);break;case"w:shd":w["background-color"]=i.parseShdColor(e,f);break;case"w:tcW":g(f,w);break;case"w:noWrap":s.getValBoolean(f)&&(w["white-space"]="nowrap");break;case"w:vAlign":p(f,w);break;case"w:tcBorders":l.parseBorders(e,f,w),d.insideBorder=b.parseInsideBorders(e,f);break;case"w:gridSpan":d.gridSpan=s.getValNumber(f);break;case"w:vMerge":d.vMerge=s.getVal(f)||"continue";break;case"w:textDirection":o.parseTextDirection(f,w);break;case"w:cnfStyle":break;case"w:hideMark":d.hideMark=s.getValBoolean(f,!0);break;default:console.warn("parseTcPr: ignore",v,f)}}}catch(e){r={error:e}}finally{try{u&&!u.done&&(c=k.return)&&c.call(k)}finally{if(r)throw r.error}}return d}}));
;/*!node_modules/office-viewer/lib/util/color.js*/
amis.define("20058a0",(function(t,n,r,i){"use strict";function s(t,n,r){t/=255,n/=255,r/=255;var i,s=Math.max(t,n,r),o=Math.min(t,n,r),h=0,e=(s+o)/2;if(s==o)h=i=0;else{var u=s-o;switch(i=e>.5?u/(2-s-o):u/(s+o),s){case t:h=(n-r)/u+(n<r?6:0);break;case n:h=(r-t)/u+2;break;case r:h=(t-n)/u+4}h/=6}return{h:h,s:i,l:e}}function o(t,n,r){return r<0&&(r+=1),r>1&&(r-=1),r<1/6?t+6*(n-t)*r:r<.5?n:r<2/3?t+(n-t)*(2/3-r)*6:t}function h(t,n,r){var i,s,h;if(t>1&&(t/=360),0==n)i=s=h=r;else{var e=r<.5?r*(1+n):r+n-r*n,u=2*r-e;i=o(u,e,t+1/3),s=o(u,e,t),h=o(u,e,t-1/3)}return{r:255*i,g:255*s,b:255*h}}function e(t){return 1==t.length?"0"+t:""+t}function u(t,n,r){return[e(Math.round(t).toString(16)),e(Math.round(n).toString(16)),e(Math.round(r).toString(16))].join("").toUpperCase()}function a(t){return Math.min(Math.max(t,0),255)}Object.defineProperty(n,"__esModule",{value:!0});var c=function(){function t(t){var n=t.match(/^#?([0-9a-f]{6})$/i);n&&(this.r=parseInt(n[1].substring(0,2),16),this.g=parseInt(n[1].substring(2,4),16),this.b=parseInt(n[1].substring(4,6),16),this.isValid=!0)}return t.fromHSL=function(n,r,i){var s=h(n,r,i);return new t("#".concat(u(s.r,s.g,s.b)))},t.fromRGB=function(n,r,i){var s=u(n,r,i);return new t("#".concat(s))},t.prototype.lum=function(t){return this.changeHsl(t,"l","set")},t.prototype.lumMod=function(t){return this.changeHsl(t,"l","mod")},t.prototype.lumOff=function(t){return this.changeHsl(t,"l","off")},t.prototype.hue=function(t){return this.changeHsl(t,"h","set")},t.prototype.hueMod=function(t){return this.changeHsl(t,"h","mod")},t.prototype.hueOff=function(t){return this.changeHsl(t,"h","off")},t.prototype.sat=function(t){return this.changeHsl(t,"s","set")},t.prototype.satMod=function(t){return this.changeHsl(t,"s","mod")},t.prototype.satOff=function(t){return this.changeHsl(t,"s","off")},t.prototype.changeHsl=function(t,n,r){var i=s(this.r,this.g,this.b);"set"===r?i[n]=t:"mod"===r?i[n]=i[n]*t:"off"===r&&(i[n]+=i[n]*t);var o=h(i.h,i.s,i.l);return this.r=o.r,this.g=o.g,this.b=o.b,this},t.prototype.comp=function(){var t=s(this.r,this.g,this.b);t.h=t.h+.5,t.h>1&&(t.h-=1);var n=h(t.h,t.s,t.l);return this.r=n.r,this.g=n.g,this.b=n.b,this},t.prototype.shade=function(t){this.r=a(this.r-256*t),this.g=a(this.g-256*t),this.b=a(this.b-256*t)},t.prototype.tint=function(t){this.r=a(this.r+256*t),this.g=a(this.g+256*t),this.b=a(this.b+256*t)},t.prototype.inv=function(){return this.r=255-this.r,this.g=255-this.g,this.b=255-this.b,this},t.prototype.toHex=function(){return"#"+u(this.r,this.g,this.b)},t.prototype.toRgba=function(t){return"rgba(".concat(this.r,", ").concat(this.g,", ").concat(this.b,", ").concat(t,")")},t}();n.Color=c}));
;/*!node_modules/office-viewer/lib/parse/modifyColor.js*/
amis.define("c0d5429",(function(e,a,t,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var c=e("c1138ba"),l=e("dd1dc63"),n=e("20058a0"),s=e("da61922");a.modifyColor=function(e,a){var t,r,o=new n.Color(a);if(o.isValid){var b=1;try{for(var g=c.__values(e.children),f=g.next();!f.done;f=g.next()){var d=f.value;switch(d.tagName){case"a:alpha":case"w14:alpha":b=l.getAttrPercent(d,"val");break;case"a:blue":o.b=256*l.getAttrPercent(d,"val");break;case"a:blueMod":o.b=o.b*l.getAttrPercent(d,"val");break;case"a:blueOff":o.b+=o.b*l.getAttrPercent(d,"val");break;case"a:comp":o.comp();break;case"a:green":o.g=256*l.getAttrPercent(d,"val");break;case"a:greenMod":o.g=o.g*l.getAttrPercent(d,"val");break;case"a:greenOff":o.g+=o.g*l.getAttrPercent(d,"val");break;case"a:red":o.r=256*l.getAttrPercent(d,"val");break;case"a:redMod":o.r=o.r*l.getAttrPercent(d,"val");break;case"a:redOff":o.r+=o.r*l.getAttrPercent(d,"val");break;case"a:lum":o.lum(l.getAttrPercent(d,"val"));break;case"a:lumMod":o.lumMod(l.getAttrPercent(d,"val"));break;case"a:lumOff":o.lumOff(l.getAttrPercent(d,"val"));break;case"a:hue":o.hue(s.convertAngle(d.getAttribute("hue"))/360);break;case"a:hueMod":o.hueMod(l.getAttrPercent(d,"val"));break;case"a:hueOff":o.hueOff(l.getAttrPercent(d,"val"));break;case"a:sat":o.sat(l.getAttrPercent(d,"val"));break;case"a:satMod":o.satMod(l.getAttrPercent(d,"val"));break;case"a:satOff":o.satOff(l.getAttrPercent(d,"val"));break;case"a:shade":o.shade(l.getAttrPercent(d,"val"));break;case"a:tint":o.tint(l.getAttrPercent(d,"val"));break;default:console.log("unknown color modify",d)}}}catch(e){t={error:e}}finally{try{f&&!f.done&&(r=g.return)&&r.call(g)}finally{if(t)throw t.error}}return 1!==b?o.toRgba(b):o.toHex()}return a}}));
;/*!node_modules/office-viewer/lib/parse/parseChildColor.js*/
amis.define("1476454",(function(r,e,t,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var a=r("dd1dc63"),l=r("20058a0"),n=r("8a56582"),s=r("c0d5429");e.parseChildColor=function(r,e){var t=e.firstElementChild;if(t){var o=t.tagName;switch(o){case"a:prstClr":var c=a.getVal(t)||"";if(c in n.PresetColorMap)return s.modifyColor(t,n.PresetColorMap[c]);console.warn("parseOutline: Unknown color ",c,t);break;case"a:srgbClr":case"a:scrgbClr":case"w14:srgbClr":var i=a.getVal(t);if(i)return s.modifyColor(t,"#"+i);var C=a.getAttrPercent(t,"r"),f=a.getAttrPercent(t,"g"),g=a.getAttrPercent(t,"b"),u=l.Color.fromRGB(C,f,g);return s.modifyColor(t,u.toHex());case"a:hslClr":var d=a.getAttrPercent(t,"r"),m=a.getAttrPercent(t,"g"),v=a.getAttrPercent(t,"b"),p=a.getVal(t);if(p)return s.modifyColor(t,"#"+p);var w=l.Color.fromHSL(d,m,v);return s.modifyColor(t,w.toHex());case"a:schemeClr":case"w14:schemeClr":var y=a.getVal(t);if(y)return s.modifyColor(t,r.getThemeColor(y));console.warn("parseOutline: Unknown schemeClr ",t);break;case"a:sysClr":return a.getVal(t);default:console.warn("parseOutline: Unknown color type ",o,t)}}return""}}));
;/*!node_modules/office-viewer/lib/parse/parseInd.js*/
amis.define("199eab0",(function(e,i,t,a){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var n=e("da61922");i.parseInd=function(e,i){var t=n.parseSize(e,"w:firstLine"),a=n.parseSize(e,"w:hanging"),r=n.parseSize(e,"w:left"),s=n.parseSize(e,"w:start"),d=n.parseSize(e,"w:right"),p=n.parseSize(e,"w:end");t&&(i["text-indent"]=t),a&&(i["text-indent"]="-".concat(a)),(r||s)&&(i["margin-left"]=r||s),(d||p)&&(i["margin-right"]=d||p)}}));
;/*!node_modules/office-viewer/lib/parse/parseSpacing.js*/
amis.define("0441d85",(function(e,t,i,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("da61922");t.parseSpacing=function(e,t,i){var a=r.parseSize(t,"w:before"),n=r.parseSize(t,"w:after"),o=t.getAttribute("w:lineRule");a&&(i["margin-top"]=a),n&&(i["margin-bottom"]=n);var s=t.getAttribute("w:line");if(s){if(e.renderOptions.forceLineHeight)return void(i["line-height"]=e.renderOptions.forceLineHeight);var c=parseInt(s,10),h=e.renderOptions.minLineHeight||1;switch(o){case"auto":var d=Math.max(h,c/240);i["line-height"]="".concat(d.toFixed(2));break;case"atLeast":break;default:var f=Math.max(h,c/20);i["line-height"]="".concat(f,"pt")}}}}));
;/*!node_modules/office-viewer/lib/parse/parseFont.js*/
amis.define("b3cb80d",(function(e,a,r,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("c1138ba");a.parseFont=function(e,a,r){var t,s,c=[],i=e.renderOptions.fontMapping;try{for(var o=n.__values(a.attributes),f=o.next();!f.done;f=o.next()){var l=f.value,u=l.name,h=l.value;switch(u){case"w:ascii":case"w:cs":case"w:eastAsia":i&&h in i&&(h=i[h]),-1===h.indexOf(" ")?c.push(h):c.push('"'+h+'"');break;case"w:asciiTheme":case"w:csTheme":case"w:eastAsiaTheme":c.push("var(--docx-theme-font-".concat(h,")"))}}}catch(e){t={error:e}}finally{try{f&&!f.done&&(s=o.return)&&s.call(o)}finally{if(t)throw t.error}}c.length&&(r["font-family"]=Array.from(new Set(c)).join(", "))}}));
;/*!node_modules/office-viewer/lib/parse/parseTrHeight.js*/
amis.define("94c49ba",(function(e,t,i,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("da61922");t.parseTrHeight=function(e,t){var i=r.parseSize(e,"w:val"),a=e.getAttribute("w:hRule");"exact"===a?t.height=i:"atLeast"===a&&(t.height=i,t["min-height"]=i)}}));
;/*!node_modules/office-viewer/lib/parse/jcToTextAlign.js*/
amis.define("fa8283c",(function(e,t,r,c){"use strict";Object.defineProperty(t,"__esModule",{value:!0}),t.jcToTextAlign=function(e){switch(e){case"start":case"left":return"left";case"center":return"center";case"end":case"right":return"right";case"both":case"distribute":return"justify"}return e}}));
;/*!node_modules/office-viewer/lib/parse/parsePr.js*/
amis.define("aa13aed",(function(e,a,r,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var s=e("c1138ba"),o=e("da61922"),c=e("dd1dc63"),n=e("0e6de16"),l=e("09c12c7"),i=e("1476454"),w=e("199eab0"),d=e("0441d85"),p=e("b3cb80d"),b=e("94c49ba"),k=e("fa8283c"),g=e("310a687");function h(e,a,r){var t=c.getVal(a);if(null!=t){switch(t){case"dash":case"dashDotDotHeavy":case"dashDotHeavy":case"dashedHeavy":case"dashLong":case"dashLongHeavy":case"dotDash":case"dotDotDash":r["text-decoration-style"]="dashed";break;case"dotted":case"dottedHeavy":r["text-decoration-style"]="dotted";break;case"double":r["text-decoration-style"]="double";break;case"single":case"thick":case"words":r["text-decoration"]="underline";break;case"wave":case"wavyDouble":case"wavyHeavy":r["text-decoration-style"]="wavy";break;case"none":r["text-decoration"]="none"}var s=l.parseColorAttr(e,a);s&&(r["text-decoration-color"]=s)}}function u(e,a){var r,t;try{for(var c=s.__values(e.attributes),n=c.next();!n.done;n=c.next()){var l=n.value,i=l.name,w=l.value;switch(i){case"w:dropCap":"drop"===w&&(a.float="left");break;case"w:h":"object"!=typeof w||Array.isArray(w)||(a.height=o.parseSize(w,"w:h"));break;case"w:w":"object"!=typeof w||Array.isArray(w)||(a.width=o.parseSize(w,"w:w"));break;case"w:hAnchor":case"w:vAnchor":case"w:lines":break;case"w:wrap":"around"!==w&&console.warn("parseFrame: w:wrap not support "+w);break;default:console.warn("parseFrame: unknown attribute "+i,l)}}}catch(e){r={error:e}}finally{try{n&&!n.done&&(t=c.return)&&t.call(c)}finally{if(r)throw r.error}}}function x(e,a){switch(e){case"dot":case"underDot":a["text-emphasis"]="filled",a["text-emphasis-position"]="under right";break;case"comma":a["text-emphasis"]="filled sesame";break;case"circle":a["text-emphasis"]="open"}}a.parsePr=function(e,a,r){var t,v,f={};try{for(var y=s.__values(a.children),m=y.next();!m.done;m=y.next()){var A=m.value,S=A.tagName;switch(S){case"w:sz":case"w:szCs":f["font-size"]=o.parseSize(A,"w:val",o.LengthUsage.FontSize);break;case"w:jc":f["text-align"]=k.jcToTextAlign(c.getVal(A));break;case"w:framePr":u(A,f);break;case"w:pBdr":n.parseBorders(e,A,f);break;case"w:ind":w.parseInd(A,f);break;case"w:color":f.color=l.parseColor(e,A);break;case"w:shd":"background-color"in f||(f["background-color"]=l.parseShdColor(e,A));break;case"w:spacing":d.parseSpacing(e,A,f);break;case"w:highlight":f["background-color"]=l.parseColorAttr(e,A,"w:val","yellow");break;case"w:vertAlign":var B=c.getVal(A);"superscript"===B?f["vertical-align"]="super":"subscript"===B&&(f["vertical-align"]="sub");break;case"w:position":f["vertical-align"]=o.parseSize(A,"w:val",o.LengthUsage.FontSize);break;case"w:trHeight":b.parseTrHeight(A,f);break;case"w:strike":case"w:dstrike":f["text-decoration"]=c.getValBoolean(A)?"line-through":"none";break;case"w:b":f["font-weight"]=c.getValBoolean(A)?"bold":"normal";break;case"w:adjustRightInd":case"w:bCs":case"w:iCs":case"w:kern":case"w:pStyle":case"w:lang":case"w:noProof":case"w:keepLines":case"w:keepNext":case"w:widowControl":case"w:pageBreakBefore":case"w:outlineLvl":case"w:contextualSpacing":case"w:numPr":case"w:rStyle":case"w:tabs":case"w:snapToGrid":case"w:topLinePunct":case"w:cnfStyle":case"w:autoSpaceDE":case"w:autoSpaceDN":case"w:kinsoku":case"w:overflowPunct":case"w14:reflection":case"w14:textFill":case"w14:ligatures":break;case"w:i":f["font-style"]=c.getValBoolean(A)?"italic":"normal";break;case"w:caps":f["text-transform"]=c.getValBoolean(A)?"uppercase":"normal";break;case"w:smallCaps":f["text-transform"]=c.getValBoolean(A)?"lowercase":"normal";break;case"w:u":h(e,A,f);break;case"w:rFonts":p.parseFont(e,A,f);break;case"w:tblCellSpacing":f["border-spacing"]=o.parseSize(A,"w:w"),f["border-collapse"]="separate";break;case"w:bdr":f.border=n.parseBorder(e,A);break;case"w:vanish":c.getValBoolean(A)&&(f.display="none");break;case"w:rPr":var C=A.getElementsByTagName("w14:reflection").item(0);if(C){var V=o.parseSize(C,"w4:dist",o.LengthUsage.Emu)||"0px";f["-webkit-box-reflect"]="below ".concat(V," linear-gradient(transparent, white)")}break;case"w:webHidden":f.display="none";break;case"w:wordWrap":c.getValBoolean(A)&&(f["word-break"]="break-all");break;case"w:textAlignment":var z=c.getVal(A);"center"===z?f["vertical-align"]="middle":"auto"!==z&&(f["vertical-align"]=z);break;case"w:textDirection":g.parseTextDirection(A,f);break;case"w:bidi":c.getValBoolean(A,!0)&&console.warn("w:bidi is not supported.");break;case"w:em":x(c.getVal(A),f);break;case"w:w":var D=c.getValNumber(A);f.transform="scaleX(".concat(D/100,")"),f.display="inline-block";break;case"w:outline":f["text-shadow"]="-1px -1px 0 #AAA, 1px -1px 0 #AAA, -1px 1px 0 #AAA, 1px 1px 0 #AAA";break;case"w:shadown":case"w:imprint":c.getValBoolean(A,!0)&&(f["text-shadow"]="1px 1px 2px rgba(0, 0, 0, 0.6)");break;case"w14:shadow":var L=o.parseSize(A,"w14:blurRad",o.LengthUsage.Emu)||"4px",H="rgba(0, 0, 0, 0.6)",P=i.parseChildColor(e,A);P&&(H=P),f["text-shadow"]="1px 1px ".concat(L," ").concat(H);break;case"w14:textOutline":var F=o.parseSize(A,"w14:w",o.LengthUsage.Emu)||"1px";f["-webkit-text-stroke-width"]=F;var N="white",T=A.getElementsByTagName("w14:solidFill");T.length>0&&(N=i.parseChildColor(e,T.item(0))||"white"),f["-webkit-text-stroke-color"]=N;break;default:console.warn("parsePr Unknown tagName",S,A)}}}catch(e){t={error:e}}finally{try{m&&!m.done&&(v=y.return)&&v.call(y)}finally{if(t)throw t.error}}return f}}));
;/*!node_modules/office-viewer/lib/openxml/word/Bookmark.js*/
amis.define("cb10616",(function(n,e,t,o){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=function(){function n(n){this.name=n}return n.fromXML=function(e,t){var o=t.getAttribute("w:name");return o?new n(o):(console.warn("Bookmark without name"),new n("unknown"))},n}();e.BookmarkStart=r}));
;/*!node_modules/office-viewer/lib/openxml/word/Break.js*/
amis.define("91e0c88",(function(e,n,t,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(){function e(){this.type="textWrapping"}return e.fromXML=function(n,t){return new e},e}();n.Break=i}));
;/*!node_modules/office-viewer/lib/openxml/drawing/Blip.js*/
amis.define("075cb58",(function(e,t,n,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var u=function(){function e(){}return e.fromXML=function(t,n){var r=new e,u=n.getAttribute("r:embed")||"",i=t.getDocumentRels(u);return i&&(r.embled=i,r.src=t.loadImage(r.embled)),r},e}();t.Blip=u}));
;/*!node_modules/office-viewer/lib/openxml/drawing/BlipFill.js*/
amis.define("a9dff1f",(function(e,i,n,t){"use strict";Object.defineProperty(i,"__esModule",{value:!0});var f=e("075cb58"),l=function(){function e(){}return e.fromXML=function(i,n){var t=new e,l=null==n?void 0:n.getElementsByTagName("a:blip").item(0);return l&&(t.blip=f.Blip.fromXML(i,l)),t},e}();i.BlipFill=l}));
;/*!node_modules/office-viewer/lib/openxml/drawing/Transform.js*/
amis.define("e0988b8",(function(e,a,r,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("c1138ba"),c=e("da61922"),s=function(){function e(){}return e.fromXML=function(a,r){var t,s,o=new e;try{for(var f=n.__values(r.children),i=f.next();!i.done;i=f.next()){var u=i.value,g=u.tagName;switch(g){case"a:off":o.off={x:c.parseSize(u,"x",c.LengthUsage.Emu),y:c.parseSize(u,"y",c.LengthUsage.Emu)};break;case"a:ext":o.ext={cx:c.parseSize(u,"cx",c.LengthUsage.Emu),cy:c.parseSize(u,"cy",c.LengthUsage.Emu)};break;case"a:chOff":o.chOff={x:c.parseSize(u,"x",c.LengthUsage.Emu),y:c.parseSize(u,"y",c.LengthUsage.Emu)};break;case"a:chExt":o.chExt={cx:c.parseSize(u,"cx",c.LengthUsage.Emu),cy:c.parseSize(u,"cy",c.LengthUsage.Emu)};break;default:console.warn("Transform: Unknown tag ",g,u)}}}catch(e){t={error:e}}finally{try{i&&!i.done&&(s=f.return)&&s.call(f)}finally{if(t)throw t.error}}var h=r.getAttribute("rot");return h&&(o.rot=c.convertAngle(h)),o},e}();a.Transform=s}));
;/*!node_modules/office-viewer/lib/parse/parseShape.js*/
amis.define("f8bd8af",(function(e,t,a,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("c1138ba"),s=e("dd1dc63");function c(e){var t,a,r=[];try{for(var s=n.__values(e.children),c=s.next();!c.done;c=s.next()){var o=c.value,l=o.tagName;if("a:pt"===l||"pt"===l){var i=o.getAttribute("x"),u=o.getAttribute("y");i&&u&&r.push({x:i,y:u})}else console.warn("unknown pt",l,o)}}catch(e){t={error:e}}finally{try{c&&!c.done&&(a=s.return)&&a.call(s)}finally{if(t)throw t.error}}return r}function o(e){var t,a,r=[];try{for(var o=n.__values(e.children),l=o.next();!l.done;l=o.next()){var i=l.value,u=i.tagName;switch(u){case"a:moveTo":case"moveTo":var v=c(i);if(v.length){var h={type:"moveTo",pt:v[0]};r.push(h)}break;case"a:lnTo":case"lnTo":var f=c(i);if(f.length){var p={type:"lnTo",pt:f[0]};r.push(p)}break;case"a:quadBezTo":case"quadBezTo":var g=c(i);if(g.length){var d={type:"quadBezTo",pts:g};r.push(d)}break;case"a:cubicBezTo":case"cubicBezTo":var b=c(i);if(b.length){var y={type:"cubicBezTo",pts:b};r.push(y)}break;case"a:arcTo":case"arcTo":var A=i.getAttribute("wR"),w=i.getAttribute("hR"),k=i.getAttribute("stAng"),T=i.getAttribute("swAng");if(A&&w&&k&&T){var x={type:"arcTo",wR:A,hR:w,stAng:k,swAng:T};r.push(x)}break;case"a:close":case"close":r.push({type:"close"});break;default:console.warn("parsePath: unknown tag",u,i)}}}catch(e){t={error:e}}finally{try{l&&!l.done&&(a=o.return)&&a.call(o)}finally{if(t)throw t.error}}var _={defines:r},m=e.getAttribute("fill");m&&(_.fill=m),_.extrusionOk=s.getAttrBoolean(e,"extrusionOk",!1),_.stroke=s.getAttrBoolean(e,"stroke",!0);var L=e.getAttribute("w");L&&(_.w=parseInt(L,10));var B=e.getAttribute("h");return B&&(_.h=parseInt(B,10)),_}function l(e){var t,a,r=[];try{for(var s=n.__values(e.children),c=s.next();!c.done;c=s.next()){var l=c.value;switch(l.tagName){case"a:path":case"path":r.push(o(l))}}}catch(e){t={error:e}}finally{try{c&&!c.done&&(a=s.return)&&a.call(s)}finally{if(t)throw t.error}}return r}function i(e){var t,a,r=[];try{for(var s=n.__values(e.children),c=s.next();!c.done;c=s.next()){var o=c.value;switch(o.tagName){case"a:gd":case"gd":var l=o.getAttribute("name"),i=o.getAttribute("fmla");if(l&&i){var u={n:l,f:i};r.push(u)}}}}catch(e){t={error:e}}finally{try{c&&!c.done&&(a=s.return)&&a.call(s)}finally{if(t)throw t.error}}return r}t.parsePath=o,t.parsePathLst=l,t.parsePts=c,t.parseShape=function(e){var t,a,r={};try{for(var s=n.__values(e.children),c=s.next();!c.done;c=s.next()){var o=c.value;switch(o.tagName){case"a:avLst":case"avLst":r.avLst=i(o);break;case"a:gdLst":case"gdLst":r.gdLst=i(o);break;case"a:rect":case"react":var u={b:o.getAttribute("b")||"",l:o.getAttribute("l")||"",r:o.getAttribute("r")||"",t:o.getAttribute("t")||""};r.rect=u;break;case"a:pathLst":case"pathLst":r.pathLst=l(o)}}}catch(e){t={error:e}}finally{try{c&&!c.done&&(a=s.return)&&a.call(s)}finally{if(t)throw t.error}}return r},t.parseShapeGuide=i}));
;/*!node_modules/office-viewer/lib/openxml/drawing/Geom.js*/
amis.define("84b9af9",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("c1138ba"),f=e("f8bd8af"),i=function(){function e(){}return e.fromXML=function(r,t){var a,i,o=new e;o.prst=t.getAttribute("prst");try{for(var u=n.__values(t.children),c=u.next();!c.done;c=u.next()){var l=c.value;if("a:avLst"===l.tagName)o.avLst=f.parseShapeGuide(l)}}catch(e){a={error:e}}finally{try{c&&!c.done&&(i=u.return)&&i.call(u)}finally{if(a)throw a.error}}return o},e}();r.Geom=i}));
;/*!node_modules/office-viewer/lib/openxml/drawing/CustomGeom.js*/
amis.define("942f44c",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var f=e("f8bd8af"),u=function(){function e(){}return e.fromXML=function(n,r){var t=new e;return t.shape=f.parseShape(r),t},e}();n.CustomGeom=u}));
;/*!node_modules/office-viewer/lib/openxml/drawing/ShapeProperties.js*/
amis.define("3494d88",(function(e,a,r,s){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=e("c1138ba"),t=e("e0988b8"),l=e("da61922"),n=e("84b9af9"),c=e("1476454"),i=e("942f44c");function u(e){var a="solid";switch(e){case"dash":case"dashDot":case"lgDash":case"lgDashDot":case"lgDashDotDot":case"sysDash":case"sysDashDot":case"sysDashDotDot":a="dashed";break;case"dot":case"sysDot":a="dotted"}return a}function d(e,a){var r,s,t={width:l.parseSize(a,"w",l.LengthUsage.Emu),style:"solid"};try{for(var n=o.__values(a.children),i=n.next();!i.done;i=n.next()){var d=i.value,f=d.tagName;switch(f){case"a:solidFill":t.color=c.parseChildColor(e,d);break;case"a:noFill":t.style="none";break;case"a:round":t.radius="8%";break;case"a:prstDash":t.style=u(d.getAttribute("val"));break;default:console.warn("parseOutline: Unknown tag ",f,d)}}}catch(e){r={error:e}}finally{try{i&&!i.done&&(s=n.return)&&s.call(n)}finally{if(r)throw r.error}}return t}var f=function(){function e(){}return e.fromXML=function(a,r){var s,l,u=new e;if(r)try{for(var f=o.__values(r.children),h=f.next();!h.done;h=f.next()){var m=h.value,b=m.tagName;switch(b){case"a:xfrm":u.xfrm=t.Transform.fromXML(a,m);break;case"a:prstGeom":u.geom=n.Geom.fromXML(a,m);break;case"a:custGeom":u.custGeom=i.CustomGeom.fromXML(a,m);break;case"a:ln":u.outline=d(a,m);break;case"a:noFill":u.noFill=!0;break;case"a:solidFill":u.fillColor=c.parseChildColor(a,m);break;default:console.warn("ShapePr: Unknown tag ",b,m)}}}catch(e){s={error:e}}finally{try{h&&!h.done&&(l=f.return)&&l.call(f)}finally{if(s)throw s.error}}return u},e}();a.ShapePr=f}));
;/*!node_modules/office-viewer/lib/openxml/drawing/Pic.js*/
amis.define("4c2701f",(function(e,t,i,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=e("dd1dc63"),n=e("a9dff1f"),a=e("3494d88"),c=function(){function e(){}return e.fromXML=function(t,i){var r=new e,c=null==i?void 0:i.getElementsByTagName("pic:cNvPr").item(0);if(c&&(r.alt=c.getAttribute("descr")||"",r.altVar=c.getAttribute("descrVar")||"",l.getAttrBoolean(c,"hidden",!1)))return r;return r.blipFill=n.BlipFill.fromXML(t,null==i?void 0:i.getElementsByTagName("pic:blipFill").item(0)),r.spPr=a.ShapePr.fromXML(t,null==i?void 0:i.getElementsByTagName("pic:spPr").item(0)),r},e}();t.Pic=c}));
;/*!node_modules/office-viewer/lib/openxml/word/Table.js*/
amis.define("2858914",(function(e,t,i,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){this.properties={},this.tblGrid=[],this.trs=[]};t.Table=r}));
;/*!node_modules/office-viewer/lib/openxml/word/table/Tr.js*/
amis.define("9e28b7e",(function(e,t,i,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){this.properties={},this.tcs=[]};t.Tr=r}));
;/*!node_modules/office-viewer/lib/openxml/word/table/Tc.js*/
amis.define("34e3cdf",(function(e,t,i,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){this.properties={},this.children=[]}return e.prototype.add=function(e){e&&this.children.push(e)},e}();t.Tc=r}));
;/*!node_modules/office-viewer/lib/parse/parseTc.js*/
amis.define("748485b",(function(e,r,a,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("c1138ba"),i=e("34e3cdf"),o=e("fb63347"),p=e("a607958"),s=e("49ee2ea");r.parseTc=function(e,r,a,n){var c,d,l=new i.Tc;try{for(var f=t.__values(r.children),u=f.next();!u.done;u=f.next()){var v=u.value;switch(v.tagName){case"w:tcPr":l.properties=o.parseTcPr(e,v);break;case"w:p":l.add(p.Paragraph.fromXML(e,v));break;case"w:tbl":l.add(s.parseTable(e,v))}}}catch(e){c={error:e}}finally{try{u&&!u.done&&(d=f.return)&&d.call(f)}finally{if(c)throw c.error}}var w=n[a.index];if(l.properties.vMerge){if("restart"===l.properties.vMerge)l.properties.rowSpan=1,n[a.index]=l;else if(w){if(w.properties&&w.properties.rowSpan){w.properties.rowSpan=w.properties.rowSpan+1;var b=l.properties.gridSpan||1;return a.index+=b,null}console.warn("Tc.fromXML: continue but not found lastCol",a.index,l,n)}}else delete n[a.index];var x=l.properties.gridSpan||1;return a.index+=x,l}}));
;/*!node_modules/office-viewer/lib/parse/parseTablePr.js*/
amis.define("069cea6",(function(e,a,t,r){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=e("c1138ba"),o=e("dd1dc63"),n=e("0e6de16"),s=e("65149c7"),c=e("9e1385f"),i=e("09c12c7"),b=e("da61922"),d=e("fb63347"),w=e("8e17e56");function f(e,a){switch(o.getVal(e)){case"left":case"start":break;case"right":case"end":a.float="right"}}function u(e,a){var t=c.parseTblWidth(e);t&&(a["margin-left"]=t)}function p(e,a){var t=c.parseTblWidth(e);t&&(a.width=t)}function g(e){var a={},t=o.getValHex(e);return(o.getAttrBoolean(e,"firstRow",!1)||32&t)&&(a.firstRow=!0),(o.getAttrBoolean(e,"lastRow",!1)||64&t)&&(a.lastRow=!0),(o.getAttrBoolean(e,"firstColumn",!1)||128&t)&&(a.firstColumn=!0),(o.getAttrBoolean(e,"lastColumn",!1)||256&t)&&(a.lastColumn=!0),o.getAttrBoolean(e,"noHBand",!1)||512&t?a.noHBand=!0:a.noHBand=!1,o.getAttrBoolean(e,"noVBand",!1)||1024&t?a.noVBand=!0:a.noVBand=!1,a}function B(e,a,t){if(void 0===e.renderOptions.padding){var r=b.parseSize(a,"w:tblpX"),l=b.parseSize(a,"w:tblpY");t.top=l,t.left=r}}function k(e,a){"fixed"===e.getAttribute("w:type")&&(a["table-layout"]="fixed")}a.parseTablePr=function(e,a){var t,r,c={},b={},S={};c.tblLook={},c.cssStyle=b,c.tcCSSStyle=S;try{for(var y=l.__values(a.children),C=y.next();!C.done;C=y.next()){var h=C.value,v=h.tagName;switch(v){case"w:tblBorders":n.parseBorders(e,h,b),c.insideBorder=s.parseInsideBorders(e,h);break;case"w:tcBorders":n.parseBorders(e,h,b);break;case"w:tblInd":u(h,b);break;case"w:jc":f(h,b);break;case"w:tblCellMar":case"w:tcMar":w.parseCellMargin(h,S);break;case"w:tblStyle":c.pStyle=o.getVal(h);break;case"w:tblW":p(h,b);break;case"w:shd":b["background-color"]=i.parseShdColor(e,h);break;case"w:tblCaption":c.tblCaption=o.getVal(h);break;case"w:tblCellSpacing":d.parseTblCellSpacing(h,b);break;case"w:tblLayout":k(h,b);break;case"w:tblLook":c.tblLook=g(h);break;case"w:tblStyleRowBandSize":c.rowBandSize=o.getValNumber(h);break;case"w:tblStyleColBandSize":c.colBandSize=o.getValNumber(h);break;case"w:tblpPr":B(e,h,b);break;default:console.warn("parseTableProperties unknown tag",v,h)}}}catch(e){t={error:e}}finally{try{C&&!C.done&&(r=y.return)&&r.call(y)}finally{if(t)throw t.error}}return c}}));
;/*!node_modules/office-viewer/lib/parse/parseTrPr.js*/
amis.define("3193fe2",(function(e,a,r,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var c=e("c1138ba"),l=e("dd1dc63"),n=e("fa8283c"),s=e("069cea6"),i=e("fb63347"),o=e("94c49ba");a.parseTrPr=function(e,a){var r,t,b={},d={};try{for(var f=c.__values(a.children),g=f.next();!g.done;g=f.next()){var w=g.value,u=w.tagName;switch(u){case"w:hidden":l.getValBoolean(w)&&(b.display="none");break;case"w:trHeight":o.parseTrHeight(w,b);break;case"w:jc":b["text-align"]=n.jcToTextAlign(l.getVal(w));break;case"w:cantSplit":case"w:cnfStyle":break;case"w:tblPrEx":var p=s.parseTablePr(e,w);Object.assign(b,p.cssStyle);break;case"w:tblCellSpacing":i.parseTblCellSpacing(w,d);break;default:console.warn("Tr: Unknown tag ",u,w)}}}catch(e){r={error:e}}finally{try{g&&!g.done&&(t=f.return)&&t.call(f)}finally{if(r)throw r.error}}return{cssStyle:b}}}));
;/*!node_modules/office-viewer/lib/parse/mergeSdt.js*/
amis.define("3226692",(function(e,r,a,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("c1138ba");function n(e){var r,a,t=e.slice(),c=0,i=!1;try{for(var s=l.__values(e),d=s.next();!d.done;d=s.next()){var o=d.value;switch(o.tagName){case"w:smartTag":case"w:customXml":var u=[].slice.call(o.children);t.splice.apply(t,l.__spreadArray([c,1],l.__read(u),!1)),c+=u.length;continue;case"w:sdt":var m=o.getElementsByTagName("w:sdtContent").item(0);if(o.getElementsByTagName("w:sdt").item(0)&&(i=!0),m){var _=[].slice.call(m.children);t.splice.apply(t,l.__spreadArray([c,1],l.__read(_),!1)),c+=_.length;continue}}c+=1}}catch(e){r={error:e}}finally{try{d&&!d.done&&(a=s.return)&&a.call(s)}finally{if(r)throw r.error}}return i?n(t):t}r.mergeSdt=function(e){return n([].slice.call(e.children))}}));
;/*!node_modules/office-viewer/lib/parse/parseTr.js*/
amis.define("95b162b",(function(e,r,a,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var s=e("c1138ba"),n=e("9e28b7e"),c=e("748485b"),l=e("069cea6"),o=e("3193fe2"),i=e("3226692");r.parseTr=function(e,r,a){var t,b,u=new n.Tr,f={index:0};try{for(var p=s.__values(i.mergeSdt(r)),v=p.next();!v.done;v=p.next()){var d=v.value,w=d.tagName;switch(w){case"w:tc":var y=c.parseTc(e,d,f,a);y&&u.tcs.push(y);break;case"w:trPr":u.properties=o.parseTrPr(e,d);break;case"w:tblPrEx":var T=l.parseTablePr(e,d);Object.assign(u.properties.cssStyle||{},T.cssStyle);break;default:console.warn("Tr: Unknown tag ",w,d)}}}catch(e){t={error:e}}finally{try{v&&!v.done&&(b=p.return)&&b.call(p)}finally{if(t)throw t.error}}return u}}));
;/*!node_modules/office-viewer/lib/parse/parseTable.js*/
amis.define("49ee2ea",(function(e,r,a,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("c1138ba"),l=e("2858914"),o=e("95b162b"),s=e("069cea6"),i=e("da61922"),c=e("3226692");function u(e){var r,a,t=[],l=e.getElementsByTagName("w:gridCol");try{for(var o=n.__values(l),s=o.next();!s.done;s=o.next()){var c=s.value,u=i.parseSize(c,"w:w");t.push({w:u})}}catch(e){r={error:e}}finally{try{s&&!s.done&&(a=o.return)&&a.call(o)}finally{if(r)throw r.error}}return t}r.parseTable=function(e,r){var a,t,i=new l.Table,f={};try{for(var b=n.__values(c.mergeSdt(r)),d=b.next();!d.done;d=b.next()){var w=d.value,v=w.tagName;switch(v){case"w:tblPr":i.properties=s.parseTablePr(e,w);break;case"w:tr":i.trs.push(o.parseTr(e,w,f));break;case"w:tblGrid":i.tblGrid=u(w);break;default:console.warn("Table.fromXML unknown tag",v,w)}}}catch(e){a={error:e}}finally{try{d&&!d.done&&(t=b.return)&&t.call(b)}finally{if(a)throw a.error}}return i}}));
;/*!node_modules/office-viewer/lib/openxml/word/wps/WPSStyle.js*/
amis.define("ea32dd9",(function(e,r,a,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("c1138ba"),n=e("1476454"),t=function(){function e(){}return e.fromXML=function(r,a){var l,t,i=new e;try{for(var f=o.__values(a.children),c=f.next();!c.done;c=f.next()){var s=c.value;switch(s.tagName){case"a:fillRef":i.fillColor=n.parseChildColor(r,s);break;case"a:lnRef":i.lineColor=n.parseChildColor(r,s);break;case"a:fontRef":i.fontColor=n.parseChildColor(r,s)}}}catch(e){l={error:e}}finally{try{c&&!c.done&&(t=f.return)&&t.call(f)}finally{if(l)throw l.error}}return i},e}();r.WPSStyle=t}));
;/*!node_modules/office-viewer/lib/openxml/word/wps/WPS.js*/
amis.define("0656c4e",(function(e,r,a,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("c1138ba"),c=e("a607958"),o=e("3494d88"),l=e("49ee2ea"),s=e("da61922"),i=e("ea32dd9");function v(e,r){var a,t;try{for(var c=n.__values(e.attributes),o=c.next();!o.done;o=c.next()){var l=o.value,i=l.name,v=l.value;switch(i){case"numCol":"1"!==v&&(r["column-count"]=v);break;case"vert":switch(v){case"vert":r["writing-mode"]="vertical-rl",r["text-orientation"]="sideways";break;case"vert270":case"eaVert":r["writing-mode"]="vertical-rl",r["text-orientation"]="mixed"}break;case"anchor":switch(v){case"b":r["vertical-align"]="bottom";break;case"t":r["vertical-align"]="top";break;case"ctr":r["vertical-align"]="middle"}break;case"rot":var u=s.convertAngle(v);u&&(r.transform="rotate(".concat(u,"deg)"))}}}catch(e){a={error:e}}finally{try{o&&!o.done&&(t=c.return)&&t.call(c)}finally{if(a)throw a.error}}}var u=function(){function e(){this.style={}}return e.fromXML=function(r,a){var t,s,u,f,d=new e;d.txbxContent=[];try{for(var w=n.__values(a.children),b=w.next();!b.done;b=w.next()){var h=b.value,y=h.tagName;switch(y){case"wps:cNvSpPr":case"wps:cNvPr":break;case"wps:spPr":d.spPr=o.ShapePr.fromXML(r,h);break;case"wps:txbx":var p=h.firstElementChild;if(p)try{for(var x=(u=void 0,n.__values(p.children)),m=x.next();!m.done;m=x.next()){var k=m.value;switch(k.tagName){case"w:p":d.txbxContent.push(c.Paragraph.fromXML(r,k));break;case"w:tbl":d.txbxContent.push(l.parseTable(r,k))}}}catch(e){u={error:e}}finally{try{m&&!m.done&&(f=x.return)&&f.call(x)}finally{if(u)throw u.error}}else console.warn("unknown wps:txbx",h);break;case"wps:style":d.wpsStyle=i.WPSStyle.fromXML(r,h);break;case"wps:bodyPr":v(h,d.style);break;default:console.warn("WPS: Unknown tag ",y,h)}}}catch(e){t={error:e}}finally{try{b&&!b.done&&(s=w.return)&&s.call(w)}finally{if(t)throw t.error}}return d},e}();r.WPS=u}));
;/*!node_modules/office-viewer/lib/openxml/drawing/diagram/Diagram.js*/
amis.define("f5dc0bf",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=function(){function e(){}return e.fromXML=function(r,t){var n=new e,o=t.getAttribute("r:dm");if(o){var i=r.getDocumentRels(o);if(i){var f=r.loadWordRelXML(i);console.log(f)}}return n},e}();r.Diagram=o}));
;/*!node_modules/office-viewer/lib/openxml/word/wps/WPG.js*/
amis.define("88372cf",(function(r,e,a,c){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=r("c1138ba"),p=r("0656c4e"),t=r("3494d88"),o=r("4c2701f"),f=function(){function r(){}return r.fromXML=function(e,a){var c,f,s=new r,i=[];s.wps=i,s.wpg=[];try{for(var u=n.__values(a.children),l=u.next();!l.done;l=u.next()){var w=l.value,g=w.tagName;switch(g){case"wpg:cNvGrpSpPr":break;case"wpg:grpSpPr":s.spPr=t.ShapePr.fromXML(e,w);break;case"wps:wsp":i.push(p.WPS.fromXML(e,w));break;case"pic:pic":s.pic=o.Pic.fromXML(e,w);break;case"wpg:grpSp":s.wpg.push(r.fromXML(e,w));break;default:console.warn("WPS: Unknown tag ",g,w)}}}catch(r){c={error:r}}finally{try{l&&!l.done&&(f=u.return)&&f.call(u)}finally{if(c)throw c.error}}return s},r}();e.WPG=f}));
;/*!node_modules/office-viewer/lib/openxml/drawing/Drawing.js*/
amis.define("a055a48",(function(e,t,i,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n,r=e("c1138ba"),o=e("da61922"),s=e("dd1dc63"),c=e("4c2701f"),p=e("0656c4e"),l=e("f5dc0bf"),g=e("88372cf");t.Position=void 0,(n=t.Position||(t.Position={})).inline="inline",n.anchor="anchor";var u=function(){function e(){this.position=t.Position.inline}return e.fromXML=function(i,a){var n,u,f,d=new e,m={};d.containerStyle=m;var h=a.firstElementChild;if(h){if("wp:anchor"===h.tagName){d.position=t.Position.anchor,d.anchor=function(e){return{simplePos:s.getAttrBoolean(e,"simplePos",!1),hidden:s.getAttrBoolean(e,"hidden",!1),behindDoc:s.getAttrBoolean(e,"behindDoc",!1)}}(h);var w=s.getAttrNumber(h,"relativeHeight",1);m["z-index"]=w}try{for(var v=r.__values(h.children),b=v.next();!b.done;b=v.next()){var L=b.value,P=L.tagName;switch(P){case"wp:simplePos":(null===(f=d.anchor)||void 0===f?void 0:f.simplePos)&&(m.position="absolute",m.x=o.parseSize(L,"x",o.LengthUsage.Emu),m.y=o.parseSize(L,"y",o.LengthUsage.Emu));break;case"wp:positionH":var k=L.getAttribute("relativeFrom");if("column"===k||"page"===k||"margin"===k){if(y=L.firstElementChild){var E=y.tagName;m.position="absolute","wp:posOffset"===E?m.left=o.convertLength(y.innerHTML,o.LengthUsage.Emu):(m.left="0",console.warn("unsupport positionType",E))}}else console.warn("unsupport positionH relativeFrom",k);break;case"wp:positionV":var y,x=L.getAttribute("relativeFrom");if("paragraph"===x||"page"===x){if(d.relativeFromV=x,y=L.firstElementChild){E=y.tagName;m.position="absolute","wp:posOffset"===E?m.top=o.convertLength(y.innerHTML,o.LengthUsage.Emu):(m.top="0",console.warn("unsupport positionType",E))}}else console.warn("unsupport positionV relativeFrom",x);break;case"wp:docPr":d.id=L.getAttribute("id")||void 0,d.name=L.getAttribute("name")||void 0;break;case"wp:cNvGraphicFramePr":case"wp:effectExtent":case"wp:wrapNone":case"wp14:sizeRelH":case"wp14:sizeRelV":break;case"a:graphic":var A=L.firstElementChild,M=null==A?void 0:A.firstElementChild;if(M)switch(M.tagName){case"pic:pic":d.pic=c.Pic.fromXML(i,M);break;case"wps:wsp":d.wps=p.WPS.fromXML(i,M);break;case"wpg:wgp":d.wpg=g.WPG.fromXML(i,M);break;case"dgm:relIds":d.diagram=l.Diagram.fromXML(i,M);break;default:console.warn("unknown graphicData child tag",M)}break;case"wp:extent":m.width=o.parseSize(L,"cx",o.LengthUsage.Emu),m.height=o.parseSize(L,"cy",o.LengthUsage.Emu);break;default:console.warn("drawing unknown tag",P)}}}catch(e){n={error:e}}finally{try{b&&!b.done&&(u=v.return)&&u.call(v)}finally{if(n)throw n.error}}}return d},e}();t.Drawing=u}));
;/*!node_modules/office-viewer/lib/openxml/word/InstrText.js*/
amis.define("f0f42de",(function(e,t,i,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var f=function(e){this.text=e};t.InstrText=f}));
;/*!node_modules/office-viewer/lib/openxml/word/NoBreakHyphen.js*/
amis.define("228896e",(function(e,n,i,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var o=function(){};n.NoBreakHyphen=o}));
;/*!node_modules/office-viewer/lib/openxml/word/Pict.js*/
amis.define("4800018",(function(e,t,n,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){function e(){}return e.fromXML=function(t,n){var i=new e,r=n.getElementsByTagName("v:imagedata").item(0);if(r){var a=r.getAttribute("r:id")||"",u=t.getDocumentRels(a);u&&(i.src=t.loadImage(u))}return i},e}();t.Pict=r}));
;/*!node_modules/office-viewer/lib/openxml/word/Ruby.js*/
amis.define("4fcf599",(function(r,e,n,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var t=r("c1138ba"),o=r("2360183"),u=function(){function r(){}return r.fromXML=function(e,n){var a,u,c=new r;c.children=[];try{for(var l=t.__values(n.children),f=l.next();!f.done;f=l.next()){var i=f.value,s=i.tagName;if("w:r"===s){var y=o.Run.fromXML(e,i);y&&c.children.push(y)}else console.warn("parse Ruby: Unknown key",s,i)}}catch(r){a={error:r}}finally{try{f&&!f.done&&(u=l.return)&&u.call(l)}finally{if(a)throw a.error}}return c},r}();!function(r){function e(){return null!==r&&r.apply(this,arguments)||this}t.__extends(e,r)}(u);var c=function(){function r(){}return r.fromXML=function(e,n){var a,o,c=new r;try{for(var l=t.__values(n.children),f=l.next();!f.done;f=l.next()){var i=f.value,s=i.tagName;switch(s){case"w:rubyPr":break;case"w:rt":c.rt=u.fromXML(e,i);break;case"w:rubyBase":c.rubyBase=u.fromXML(e,i);break;default:console.warn("parse Ruby: Unknown key",s,i)}}}catch(r){a={error:r}}finally{try{f&&!f.done&&(o=l.return)&&o.call(l)}finally{if(a)throw a.error}}return c},r}();e.Ruby=c}));
;/*!node_modules/office-viewer/lib/openxml/word/Separator.js*/
amis.define("d8bc79e",(function(e,t,i,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=function(){};t.Separator=r}));
;/*!node_modules/office-viewer/lib/openxml/word/SoftHyphen.js*/
amis.define("9f81360",(function(e,n,t,f){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=function(){};n.SoftHyphen=i}));
;/*!node_modules/office-viewer/lib/openxml/word/Sym.js*/
amis.define("b364d89",(function(t,e,n,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=function(){function t(){}return t.parseXML=function(e){var n=new t;return n.font=e.getAttribute("w:font")||"",n.char=e.getAttribute("w:char")||"",n},t}();e.Sym=u}));
;/*!node_modules/office-viewer/lib/openxml/word/Tab.js*/
amis.define("6044a48",(function(e,t,r,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("dd1dc63"),i=e("da61922"),u=function(){function e(){}return e.fromXML=function(t,r){var n=new e;return n.pos=i.parseSize(r,"w:pos"),n.type=a.getVal(r),n.leader=r.getAttribute("w:leader"),n},e}();t.Tab=u}));
;/*!node_modules/office-viewer/lib/openxml/word/Run.js*/
amis.define("2360183",(function(e,a,r,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var n=e("c1138ba"),d=e("dd1dc63"),i=e("aa13aed"),s=e("91e0c88"),c=e("a055a48"),o=e("f0f42de"),l=e("228896e"),w=e("4800018"),h=e("4fcf599"),f=e("d8bc79e"),b=e("9f81360"),p=e("b364d89"),u=e("6044a48"),k=function(e){this.preserveSpace=!1,this.text=String(e)},y=function(){function e(){this.properties={},this.children=[]}return e.prototype.addChild=function(e){e&&this.children.push(e)},e.parseRunPr=function(e,a){var r,t=i.parsePr(e,a),n=a.getElementsByTagName("w:rStyle").item(0);return n&&(r=d.getVal(n)),{cssStyle:t,rStyle:r}},e.fromXML=function(a,r){var t,d,i=new e;try{for(var y=n.__values(r.children),C=y.next();!C.done;C=y.next()){var m=C.value,g=m.tagName;switch(g){case"w:t":var v=m.textContent||"",M=new k(v);i.addChild(M);break;case"w:rPr":i.properties=e.parseRunPr(a,m);break;case"w:br":case"w:cr":i.addChild(s.Break.fromXML(a,m));break;case"w:drawing":i.addChild(c.Drawing.fromXML(a,m));break;case"w:tab":i.addChild(u.Tab.fromXML(a,m));break;case"w:fldChar":i.fldChar=m.getAttribute("w:fldCharType");break;case"w:instrText":i.addChild(new o.InstrText(m.textContent||""));break;case"w:lastRenderedPageBreak":var S=new s.Break;S.type="page",i.addChild(S);break;case"w:pict":i.addChild(w.Pict.fromXML(a,m));break;case"w:ruby":i.addChild(h.Ruby.fromXML(a,m));break;case"w:sym":i.addChild(p.Sym.parseXML(m));break;case"mc:AlternateContent":var x=m.getElementsByTagName("w:drawing").item(0);x&&i.addChild(c.Drawing.fromXML(a,x));break;case"w:softHyphen":i.addChild(new b.SoftHyphen);break;case"w:noBreakHyphen":i.addChild(new l.NoBreakHyphen);break;case"w:separator":i.addChild(new f.Separator);break;case"w:continuationSeparator":break;default:console.warn("parse Run: Unknown key",g,m)}}}catch(e){t={error:e}}finally{try{C&&!C.done&&(d=y.return)&&d.call(y)}finally{if(t)throw t.error}}return i},e}();a.Run=y,a.Text=k}));
;/*!node_modules/office-viewer/lib/openxml/word/Hyperlink.js*/
amis.define("2fde99a",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=e("c1138ba"),o=e("2360183"),a=function(){function e(){this.children=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.fromXML=function(r,t){var n,a,l=new e,u=t.getAttribute("r:id");if(u){var c=r.getDocumentRels(u);c&&(l.relation=c)}var d=t.getAttribute("w:anchor");d&&(l.anchor=d);var f=t.getAttribute("w:tooltip");f&&(l.tooltip=f);try{for(var h=i.__values(t.children),s=h.next();!s.done;s=h.next()){var v=s.value,p=v.tagName;if("w:r"===p)l.addChild(o.Run.fromXML(r,v));else console.warn("parse Hyperlink: Unknown key",p,v)}}catch(e){n={error:e}}finally{try{s&&!s.done&&(a=h.return)&&a.call(h)}finally{if(n)throw n.error}}return l},e}();r.Hyperlink=a}));
;/*!node_modules/office-viewer/lib/openxml/word/numbering/NumberProperties.js*/
amis.define("48dbff2",(function(e,t,n,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=e("dd1dc63"),u=function(){function e(){}return e.fromXML=function(t,n){var r=new e,u=n.getElementsByTagName("w:ilvl").item(0);u&&(r.ilvl=i.getVal(u));var a=n.getElementsByTagName("w:numId").item(0);return a&&(r.numId=i.getVal(a)),r},e}();t.NumberPr=u}));
;/*!node_modules/office-viewer/lib/openxml/word/InlineText.js*/
amis.define("29ec292",(function(e,r,a,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("c1138ba"),t=e("cb10616"),c=e("2fde99a"),i=e("2360183"),d=function(){function e(){this.children=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.fromXML=function(r,a){var n,d,l=new e;try{for(var s=o.__values(a.children),f=s.next();!f.done;f=s.next()){var u=f.value,h=u.tagName;switch(h){case"w:r":l.addChild(i.Run.fromXML(r,u));break;case"w:hyperlink":l.addChild(c.Hyperlink.fromXML(r,u));break;case"w:bookmarkStart":l.addChild(t.BookmarkStart.fromXML(r,u));case"w:bookmarkEnd":case"w:proofErr":case"w:noProof":case"w:smartTagPr":case"w:del":break;default:console.warn("parse Inline: Unknown key",h,u)}}}catch(e){n={error:e}}finally{try{f&&!f.done&&(d=s.return)&&d.call(s)}finally{if(n)throw n.error}}return l},e}();r.InlineText=d}));
;/*!node_modules/office-viewer/lib/openxml/word/FldSimple.js*/
amis.define("63bbd04",(function(e,n,t,i){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e("29ec292"),u=function(){function e(){}return e.fromXML=function(n,t){var i=new e;return i.inlineText=r.InlineText.fromXML(n,t),i.instr=t.getAttribute("w:instr")||"",i},e}();n.FldSimple=u}));
;/*!node_modules/office-viewer/lib/openxml/math/OMath.js*/
amis.define("08d164f",(function(e,n,t,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var u=function(){function e(){}return e.fromXML=function(n,t){var r=new e;return r.element=t,r},e}();n.OMath=u}));
;/*!node_modules/office-viewer/lib/openxml/word/Paragraph.js*/
amis.define("a607958",(function(e,a,r,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var o=e("c1138ba"),n=e("dd1dc63"),l=e("aa13aed"),s=e("cb10616"),d=e("2fde99a"),i=e("48dbff2"),m=e("2360183"),c=e("6044a48"),f=e("63bbd04"),p=e("08d164f"),u=e("3226692");var h=function(){function e(){this.properties={},this.children=[],this.fldSimples=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.parseParagraphPr=function(e,a){var r,t,s,d,m=l.parsePr(e,a),f=a.getElementsByTagName("w:pStyle").item(0);f&&(s=n.getVal(f));var p=a.getElementsByTagName("w:numPr").item(0);p&&(d=i.NumberPr.fromXML(e,p));var u=[],h=a.getElementsByTagName("w:tab");try{for(var w=o.__values(h),y=w.next();!y.done;y=w.next()){var b=y.value;u.push(c.Tab.fromXML(e,b))}}catch(e){r={error:e}}finally{try{y&&!y.done&&(t=w.return)&&t.call(w)}finally{if(r)throw r.error}}var v=function(e){var a=e.getElementsByTagName("w:autoSpaceDE").item(0),r=e.getElementsByTagName("w:autoSpaceDN").item(0);return!!a||!!r}(a);return{cssStyle:m,pStyle:s,numPr:d,tabs:u,autoSpace:v}},e.fromXML=function(a,r){var t,n,l=new e;l.fldSimples=[],l.paraId=r.getAttribute("w14:paraId")||"";try{for(var i=o.__values(u.mergeSdt(r)),c=i.next();!c.done;c=i.next()){var h=c.value,w=h.tagName;switch(w){case"w:pPr":l.properties=e.parseParagraphPr(a,h);break;case"w:r":l.addChild(m.Run.fromXML(a,h));break;case"w:hyperlink":l.addChild(d.Hyperlink.fromXML(a,h));break;case"w:bookmarkStart":l.addChild(s.BookmarkStart.fromXML(a,h));case"w:bookmarkEnd":case"w:proofErr":case"w:noProof":case"w:del":case"w:moveTo":case"w:moveFrom":break;case"w:fldSimple":l.fldSimples.push(f.FldSimple.fromXML(a,h));break;case"m:oMathPara":case"m:oMath":l.addChild(p.OMath.fromXML(a,h));break;default:console.warn("parse Paragraph: Unknown key",w,h)}}}catch(e){t={error:e}}finally{try{c&&!c.done&&(n=i.return)&&n.call(i)}finally{if(t)throw t.error}}return l},e}();a.Paragraph=h}));
;/*!node_modules/office-viewer/lib/openxml/Style.js*/
amis.define("5d775b7",(function(e,r,a,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("c1138ba"),l=e("fb63347"),s=e("dd1dc63"),c=e("a607958"),i=e("2360183"),u=e("069cea6"),w=e("3193fe2");function P(e,r){var a,t,s={};try{for(var P=n.__values(r.children),y=P.next();!y.done;y=P.next()){var o=y.value;switch(o.tagName){case"w:rPr":s.rPr=i.Run.parseRunPr(e,o);break;case"w:pPr":s.pPr=c.Paragraph.parseParagraphPr(e,o);break;case"w:tblPr":s.tblPr=u.parseTablePr(e,o);break;case"w:tcPr":s.tcPr=l.parseTcPr(e,o);break;case"w:trPr":s.trPr=w.parseTrPr(e,o)}}}catch(e){a={error:e}}finally{try{y&&!y.done&&(t=P.return)&&t.call(P)}finally{if(a)throw a.error}}return s}function y(e,r){var a,t,l={};l.id=r.getAttribute("w:styleId")||"",l.type=r.getAttribute("w:type"),l.tblStylePr={},Object.assign(l,P(e,r));try{for(var c=n.__values(r.children),i=c.next();!i.done;i=c.next()){var u=i.value,w=u.tagName;switch(w){case"w:name":l.name=s.getVal(u);break;case"w:basedOn":l.basedOn=s.getVal(u);break;case"w:rPr":case"w:pPr":case"w:tblPr":case"w:tcPr":case"w:trPr":case"w:next":case"w:link":case"w:unhideWhenUsed":case"w:qFormat":case"w:rsid":case"w:uiPriority":case"w:semiHidden":case"w:autoRedefine":break;case"w:tblStylePr":var y=u.getAttribute("w:type");l.tblStylePr[y]=P(e,u);break;default:console.warn("parseStyle Unknown tag",w,u)}}}catch(e){a={error:e}}finally{try{i&&!i.done&&(t=c.return)&&t.call(c)}finally{if(a)throw a.error}}return l}r.parseStyles=function(e,r){var a,t,l={styleMap:{}},s=Array.from(r.getElementsByTagName("w:style"));try{for(var u=n.__values(s),w=u.next();!w.done;w=u.next()){var P=y(e,w.value);P.id&&(l.styleMap[P.id]=P)}}catch(e){a={error:e}}finally{try{w&&!w.done&&(t=u.return)&&t.call(u)}finally{if(a)throw a.error}}return l.defaultStyle=function(e,r){var a={};if(!r)return a;var t=r.getElementsByTagName("w:rPrDefault").item(0);if(t){var n=t.getElementsByTagName("w:rPr").item(0);n&&(a.rPr=i.Run.parseRunPr(e,n))}var l=r.getElementsByTagName("w:pPrDefault").item(0);if(l){var s=l.getElementsByTagName("w:pPr").item(0);s&&(a.pPr=c.Paragraph.parseParagraphPr(e,s))}return a}(e,r.getElementsByTagName("w:docDefaults").item(0)),l}}));
;/*!node_modules/office-viewer/lib/openxml/Theme.js*/
amis.define("adb5739",(function(e,t,r,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("c1138ba"),c=e("da61922"),l=e("dd1dc63"),o=function(){this.colors={}};function s(e){var t={};return e&&(t.clrScheme=function(e){var t,r,n=new o;if(!e)return n;n.name=e.getAttribute("name")||"";try{for(var s=a.__values(e.children),m=s.next();!m.done;m=s.next()){var i=m.value,g=i.tagName.replace("a:",""),f=i.firstElementChild;if(f){var u=f.nodeName.replace("a:","");if("sysClr"===u)n.colors[g]=f.getAttribute("lastClr")||"";else if("srgbClr"===u)n.colors[g]="#"+f.getAttribute("val")||"";else if("scrgbClr"===u){var h=256*l.getAttrPercent(i,"r"),v=256*l.getAttrPercent(i,"g"),d=256*l.getAttrPercent(i,"b");n.colors[g]="rgb(".concat(h,", ").concat(v,", ").concat(d,")")}else if("hslClr"===u){var b=c.convertAngle(i.getAttribute("hue")),y=100*l.getAttrPercent(i,"sat"),A=100*l.getAttrPercent(i,"lum");n.colors[g]="hsl(".concat(b,", ").concat(y,"%, ").concat(A,"%)")}else"prstClr"===u?n.colors[g]=l.getVal(i):console.error("unknown clr name",u)}}}catch(e){t={error:e}}finally{try{m&&!m.done&&(r=s.return)&&r.call(s)}finally{if(t)throw t.error}}return n}(e.getElementsByTagName("a:clrScheme").item(0)),t.fontScheme=(e.getElementsByTagName("a:fontScheme").item(0),{}),t.fmtScheme=(e.getElementsByTagName("a:fmtScheme").item(0),{})),t}t.parseTheme=function(e){var t={};return t.themeElements=s(e.getElementsByTagName("a:themeElements").item(0)),t}}));
;/*!node_modules/office-viewer/lib/util/dom.js*/
amis.define("0c75dbf",(function(e,n,t,a){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var r=e("c1138ba");n.addClassName=function(e,n){e&&n&&e.classList.add(n)},n.addClassNames=function(e,n){var t;e&&n&&(t=e.classList).add.apply(t,r.__spreadArray([],r.__read(n),!1))},n.appendChild=function(e,n){e&&n&&e.appendChild(n)},n.applyStyle=function(e,n){if(n)for(var t in n){var a=n[t];null!=a&&""!==a&&e.style.setProperty(t,String(a))}},n.createElement=function(e){return document.createElement(e)},n.createSVGElement=function(e){return document.createElementNS("http://www.w3.org/2000/svg",e)},n.removeChild=function(e,n){e&&n&&e.removeChild(n)},n.styleToText=function(e){void 0===e&&(e={});var n="";for(var t in e){var a=e[t];null!=a&&""!==a&&(n+="".concat(t,": ").concat(a,";\n"))}return n}}));
;/*!node_modules/office-viewer/lib/render/renderBr.js*/
amis.define("bc137cb",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var c=e("0c75dbf");r.renderBr=function(e,r){return"page"===r.type&&(e.breakPage=!0),c.createElement("br")}}));
;/*!node_modules/office-viewer/lib/render/renderStyle.js*/
amis.define("83b91ea",(function(n,t,c,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=n("c1138ba"),e=n("0c75dbf");function r(n,t,c){var o="",a=c.tblPr,r=c.tcPr;if(a){var l=e.styleToText(a.cssStyle),i=e.styleToText(a.tcCSSStyle);if(o+="\n .".concat(n," .").concat(t," {\n  border-collapse: collapse;\n  ").concat(l,"\n }\n\n .").concat(n," .").concat(t," > tbody > tr > td {\n  ").concat(i,"\n }\n "),a.insideBorder){var s=a.insideBorder;s.H&&(o+="\n      .".concat(n," .").concat(t," > tbody > tr > td {\n        border-top: ").concat(s.H,";\n      }")),s.V&&(o+="\n      .".concat(n," .").concat(t," > tbody > tr > td {\n        border-left: ").concat(s.V,";\n      }"))}}if(r){var d=e.styleToText(r.cssStyle);o+="\n    .".concat(n," .").concat(t," > tbody > tr > td {\n     ").concat(d,"\n    }\n    ")}return o}function l(n,t,c,o){var a,r,l,i,s,d,y="",b=e.styleToText(null===(a=o.trPr)||void 0===a?void 0:a.cssStyle),v="";switch(c){case"firstCol":v="enable-firstColumn";break;case"lastCol":v="enable-lastColumn";break;case"firstRow":v="enable-firstRow";break;case"lastRow":v="enable-lastRow";break;case"band1Horz":case"band2Horz":v="enable-hBand";break;case"band1Vert":case"band2Vert":v="enable-vBand"}b&&(y+="\n    ".concat(n,".").concat(v," > tbody > tr.").concat(c,"{\n       ").concat(b,"\n    }\n    "));var f=e.styleToText(null===(r=o.tcPr)||void 0===r?void 0:r.cssStyle);if(f&&(y+="\n    ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n       ").concat(f,"\n    }\n    "),null===(l=o.tcPr)||void 0===l?void 0:l.insideBorder)){var u=null===(i=o.tcPr)||void 0===i?void 0:i.insideBorder;u.H&&(y+="\n          ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n            border-top: ").concat(u.H,";\n          }")),u.V&&("none"===u.V?y+="\n          ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n            border-left: none;\n            border-right: none;\n          }"):y+="\n          ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," {\n            border-left: ").concat(u.V,";\n          }"))}var T=e.styleToText(null===(s=o.pPr)||void 0===s?void 0:s.cssStyle);T&&(y+="\n    ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," > .").concat(t,"-p {\n       ").concat(T,"\n    }\n    "));var S=e.styleToText(null===(d=o.rPr)||void 0===d?void 0:d.cssStyle);return S&&(y+="\n    ".concat(n,".").concat(v," > tbody > tr > td.").concat(c," > .").concat(t,"-p > .").concat(t,"-r {\n       ").concat(S,"\n    }\n    ")),y}var i=new Set(["wholeTable","band1Horz","band2Horz","band1Vert","band2Vert","firstCol","firstRow","lastCol","lastRow","neCell","nwCell","seCell","swCell"]);function s(n,t,c){var o,e;if(!c)return"";var r="",s=".".concat(n," .").concat(t);try{for(var d=a.__values(i),y=d.next();!y.done;y=d.next()){var b=y.value;if(b in c)r+=l(s,n,b,c[b])}}catch(n){o={error:n}}finally{try{y&&!y.done&&(e=d.return)&&e.call(d)}finally{if(o)throw o.error}}return r}t.generateTableStyle=r,t.renderStyle=function(n){var t=e.createElement("style"),c=function(n){var t,c=n.styles.defaultStyle,o="";(null==c?void 0:c.pPr)&&(o=e.styleToText(c.pPr.cssStyle));var a="";(null==c?void 0:c.rPr)&&(a=e.styleToText(c.rPr.cssStyle));var r=(null===(t=n.settings)||void 0===t?void 0:t.autoHyphenation)?"hyphens: auto;":"",l=n.getClassPrefix();return"\n\n\n  /** docDefaults **/\n  .".concat(l," {\n    --docx-theme-font-minorHAnsi: Calibri,  Helvetica, Arial, 'Helvetica Neue';\n    --docx-theme-font-minorEastAsia: 'PingFang SC', 'Microsoft YaHei', 'Hiragino Sans GB', 'STHeiti',\n    'Microsoft YaHei';\n  }\n\n  .").concat(l," p {\n    margin: 0;\n    padding: 0;\n    line-height: 1.5;\n    ").concat(r,"\n  }\n\n  .").concat(l,' .justify:after {\n    content: "";\n    display: inline-block;\n    width: 100%;\n  }\n\n  .').concat(l," table {\n    border-spacing: 0;\n  }\n\n  .").concat(l," .").concat(l,"-p {\n    ").concat(o,"\n  }\n\n  .").concat(l," .").concat(l,"-r {\n    overflow-wrap: break-word;\n    ").concat(a,"\n  }\n  ")}(n),o=function(n){var t=n.styles.styleMap,c=n.getClassPrefix(),o="";for(var a in t){var l=n.getStyleIdDisplayName(a),i=t[a],d=i.pPr,y="";if(d){var b=e.styleToText(d.cssStyle);y="\n      .".concat(c," .").concat(l," {\n        ").concat(b,"\n      }\n      ")}var v="";if(i.rPr){var f=e.styleToText(i.rPr.cssStyle);v="\n      .".concat(c," .").concat(l," > .").concat(c,"-r {\n        ").concat(f,"\n      }\n      ")}var u=r(c,l,i),T=s(c,l,i.tblStylePr);o+="\n    ".concat(y,"\n    ").concat(v,"\n    ").concat(u,"\n    ").concat(T,"\n    ")}return o}(n);return t.textContent="\n  ".concat(c,"\n\n  ").concat(o,"\n  "),t}}));
;/*!node_modules/office-viewer/lib/render/setElementStyle.js*/
amis.define("4ddb57e",(function(e,s,t,l){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("0c75dbf");s.setElementStyle=function(e,s,t){t&&(t.cssStyle&&(a.applyStyle(s,t.cssStyle),"justify"===t.cssStyle["text-align"]&&a.addClassName(s,"justify")),t.pStyle&&a.addClassNames(s,e.getStyleClassName(t.pStyle)),t.rStyle&&a.addClassNames(s,e.getStyleClassName(t.rStyle)))}}));
;/*!node_modules/office-viewer/lib/render/renderTable.js*/
amis.define("30065f0",(function(e,a,t,l){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var r=e("c1138ba"),n=e("a607958"),d=e("2858914"),s=e("0c75dbf"),o=e("61e0815"),i=e("83b91ea"),c=e("4ddb57e");function p(e,a,t,l,r,n,d){0===e&&0===a&&r.classList.add("nwCell"),0===e&&a===l-1&&r.classList.add("neCell"),e===t-1&&0===a&&r.classList.add("swCell"),e===t-1&&a===l-1&&r.classList.add("seCell"),0===e&&r.classList.add("firstRow"),e===t-1&&r.classList.add("lastRow"),0===a&&r.classList.add("firstCol"),a===l-1&&r.classList.add("lastCol"),f(e+1)&&r.classList.add("band1Horz"),f(e+1)||r.classList.add("band2Horz"),f(a+1)&&r.classList.add("band1Vert"),f(a+1)||r.classList.add("band2Vert")}function f(e,a){return!(e%2)}a.default=function e(a,t){var l,f,v,u,b,y,C=document.createElement("table"),h=t.properties;if(h.tblCaption){var L=document.createElement("caption");L.textContent=h.tblCaption,C.appendChild(L)}if(h.tblLook)for(var m in h.tblLook)"noHBand"===m?h.tblLook[m]||s.addClassName(C,"enable-hBand"):"noVBand"===m?h.tblLook[m]||s.addClassName(C,"enable-vBand"):h.tblLook[m]&&s.addClassName(C,"enable-"+m);c.setElementStyle(a,C,h);var S=a.genClassName();C.classList.add(S),a.appendStyle(i.generateTableStyle(a.getClassPrefix(),S,{tblPr:h}));var w=document.createElement("tbody");C.appendChild(w);var g=0;try{for(var x=r.__values(t.trs),_=x.next();!_.done;_=x.next()){var k=_.value,E=document.createElement("tr");w.appendChild(E);var B=0;try{for(var z=(v=void 0,r.__values(k.tcs)),N=z.next();!N.done;N=z.next()){var P=N.value,H=document.createElement("td");E.appendChild(H),p(g,B,t.trs.length,k.tcs.length,H,h.rowBandSize,h.colBandSize),k.properties.tcStyle&&s.applyStyle(H,k.properties.tcStyle);var V=P.properties;c.setElementStyle(a,H,V),V.gridSpan&&(H.colSpan=V.gridSpan),V.rowSpan&&(H.rowSpan=V.rowSpan);var M=!0;V.hideMark&&(M=!1);try{for(var R=(b=void 0,r.__values(P.children)),T=R.next();!T.done;T=R.next()){var j=T.value;if(j instanceof n.Paragraph){var O=o.default(a,j,M);s.appendChild(H,O)}else j instanceof d.Table?(M=!1,s.appendChild(H,e(a,j))):console.warn("unknown child type: "+j)}}catch(e){b={error:e}}finally{try{T&&!T.done&&(y=R.return)&&y.call(R)}finally{if(b)throw b.error}}V.rowSpan?B+=V.rowSpan:B++}}catch(e){v={error:e}}finally{try{N&&!N.done&&(u=z.return)&&u.call(z)}finally{if(v)throw v.error}}g++}}catch(e){l={error:e}}finally{try{_&&!_.done&&(f=x.return)&&f.call(x)}finally{if(l)throw l.error}}return C}}));
;/*!node_modules/office-viewer/lib/openxml/drawing/presetShape.js*/
amis.define("966fe9f",(function(n,t,y,x){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.presetShape={accentBorderCallout1:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 112500"},{n:"adj4",f:"val -38333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"close"},{type:"lnTo",pt:{x:"x1",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}}],fill:"none",extrusionOk:!1,stroke:!0}]},accentBorderCallout2:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 112500"},{n:"adj6",f:"val -46667"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"close"},{type:"lnTo",pt:{x:"x1",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}}],fill:"none",extrusionOk:!1,stroke:!0}]},accentBorderCallout3:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 100000"},{n:"adj6",f:"val -16667"},{n:"adj7",f:"val 112963"},{n:"adj8",f:"val -8333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"},{n:"y4",f:"*/ h adj7 100000"},{n:"x4",f:"*/ w adj8 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"close"},{type:"lnTo",pt:{x:"x1",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x4",y:"y4"}}],fill:"none",extrusionOk:!1,stroke:!0}]},accentCallout1:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 112500"},{n:"adj4",f:"val -38333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"close"},{type:"lnTo",pt:{x:"x1",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}}],fill:"none",extrusionOk:!1,stroke:!0}]},accentCallout2:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 112500"},{n:"adj6",f:"val -46667"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"close"},{type:"lnTo",pt:{x:"x1",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}}],fill:"none",extrusionOk:!1,stroke:!0}]},accentCallout3:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 100000"},{n:"adj6",f:"val -16667"},{n:"adj7",f:"val 112963"},{n:"adj8",f:"val -8333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"},{n:"y4",f:"*/ h adj7 100000"},{n:"x4",f:"*/ w adj8 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"close"},{type:"lnTo",pt:{x:"x1",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x4",y:"y4"}}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonBackPrevious:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g11",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonBeginning:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 1 8"},{n:"g15",f:"*/ g13 1 4"},{n:"g16",f:"+- g11 g14 0"},{n:"g17",f:"+- g11 g15 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g17",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"close"},{type:"moveTo",pt:{x:"g16",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"lnTo",pt:{x:"g16",y:"g10"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g17",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"close"},{type:"moveTo",pt:{x:"g16",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"lnTo",pt:{x:"g16",y:"g10"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g17",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"close"},{type:"moveTo",pt:{x:"g16",y:"g9"}},{type:"lnTo",pt:{x:"g16",y:"g10"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonBlank:{pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},actionButtonDocument:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"dx1",f:"*/ ss 9 32"},{n:"g11",f:"+- hc 0 dx1"},{n:"g12",f:"+- hc dx1 0"},{n:"g13",f:"*/ ss 3 16"},{n:"g14",f:"+- g12 0 g13"},{n:"g15",f:"+- g9 g13 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g14",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g15"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g14",y:"g9"}},{type:"lnTo",pt:{x:"g14",y:"g15"}},{type:"lnTo",pt:{x:"g12",y:"g15"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g14",y:"g9"}},{type:"lnTo",pt:{x:"g14",y:"g15"}},{type:"lnTo",pt:{x:"g12",y:"g15"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g14",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g15"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"close"},{type:"moveTo",pt:{x:"g12",y:"g15"}},{type:"lnTo",pt:{x:"g14",y:"g15"}},{type:"lnTo",pt:{x:"g14",y:"g9"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonEnd:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 3 4"},{n:"g15",f:"*/ g13 7 8"},{n:"g16",f:"+- g11 g14 0"},{n:"g17",f:"+- g11 g15 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g16",y:"vc"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"close"},{type:"moveTo",pt:{x:"g17",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"lnTo",pt:{x:"g17",y:"g10"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g16",y:"vc"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"close"},{type:"moveTo",pt:{x:"g17",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"lnTo",pt:{x:"g17",y:"g10"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g16",y:"vc"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"close"},{type:"moveTo",pt:{x:"g17",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g9"}},{type:"lnTo",pt:{x:"g12",y:"g10"}},{type:"lnTo",pt:{x:"g17",y:"g10"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonForwardNext:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g12",y:"vc"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g12",y:"vc"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g12",y:"vc"}},{type:"lnTo",pt:{x:"g11",y:"g10"}},{type:"lnTo",pt:{x:"g11",y:"g9"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonHelp:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g11",f:"+- hc 0 dx2"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 1 7"},{n:"g15",f:"*/ g13 3 14"},{n:"g16",f:"*/ g13 2 7"},{n:"g19",f:"*/ g13 3 7"},{n:"g20",f:"*/ g13 4 7"},{n:"g21",f:"*/ g13 17 28"},{n:"g23",f:"*/ g13 21 28"},{n:"g24",f:"*/ g13 11 14"},{n:"g27",f:"+- g9 g16 0"},{n:"g29",f:"+- g9 g21 0"},{n:"g30",f:"+- g9 g23 0"},{n:"g31",f:"+- g9 g24 0"},{n:"g33",f:"+- g11 g15 0"},{n:"g36",f:"+- g11 g19 0"},{n:"g37",f:"+- g11 g20 0"},{n:"g41",f:"*/ g13 1 14"},{n:"g42",f:"*/ g13 3 28"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g33",y:"g27"}},{type:"arcTo",wR:"g16",hR:"g16",stAng:"cd2",swAng:"cd2"},{type:"arcTo",wR:"g14",hR:"g15",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"g41",hR:"g42",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"g37",y:"g30"}},{type:"lnTo",pt:{x:"g36",y:"g30"}},{type:"lnTo",pt:{x:"g36",y:"g29"}},{type:"arcTo",wR:"g14",hR:"g15",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"g41",hR:"g42",stAng:"cd4",swAng:"-5400000"},{type:"arcTo",wR:"g14",hR:"g14",stAng:"0",swAng:"-10800000"},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"g31"}},{type:"arcTo",wR:"g42",hR:"g42",stAng:"3cd4",swAng:"21600000"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g33",y:"g27"}},{type:"arcTo",wR:"g16",hR:"g16",stAng:"cd2",swAng:"cd2"},{type:"arcTo",wR:"g14",hR:"g15",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"g41",hR:"g42",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"g37",y:"g30"}},{type:"lnTo",pt:{x:"g36",y:"g30"}},{type:"lnTo",pt:{x:"g36",y:"g29"}},{type:"arcTo",wR:"g14",hR:"g15",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"g41",hR:"g42",stAng:"cd4",swAng:"-5400000"},{type:"arcTo",wR:"g14",hR:"g14",stAng:"0",swAng:"-10800000"},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"g31"}},{type:"arcTo",wR:"g42",hR:"g42",stAng:"3cd4",swAng:"21600000"},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g33",y:"g27"}},{type:"arcTo",wR:"g16",hR:"g16",stAng:"cd2",swAng:"cd2"},{type:"arcTo",wR:"g14",hR:"g15",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"g41",hR:"g42",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"g37",y:"g30"}},{type:"lnTo",pt:{x:"g36",y:"g30"}},{type:"lnTo",pt:{x:"g36",y:"g29"}},{type:"arcTo",wR:"g14",hR:"g15",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"g41",hR:"g42",stAng:"cd4",swAng:"-5400000"},{type:"arcTo",wR:"g14",hR:"g14",stAng:"0",swAng:"-10800000"},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"g31"}},{type:"arcTo",wR:"g42",hR:"g42",stAng:"3cd4",swAng:"21600000"},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonHome:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 1 16"},{n:"g15",f:"*/ g13 1 8"},{n:"g16",f:"*/ g13 3 16"},{n:"g17",f:"*/ g13 5 16"},{n:"g18",f:"*/ g13 7 16"},{n:"g19",f:"*/ g13 9 16"},{n:"g20",f:"*/ g13 11 16"},{n:"g21",f:"*/ g13 3 4"},{n:"g22",f:"*/ g13 13 16"},{n:"g23",f:"*/ g13 7 8"},{n:"g24",f:"+- g9 g14 0"},{n:"g25",f:"+- g9 g16 0"},{n:"g26",f:"+- g9 g17 0"},{n:"g27",f:"+- g9 g21 0"},{n:"g28",f:"+- g11 g15 0"},{n:"g29",f:"+- g11 g18 0"},{n:"g30",f:"+- g11 g19 0"},{n:"g31",f:"+- g11 g20 0"},{n:"g32",f:"+- g11 g22 0"},{n:"g33",f:"+- g11 g23 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"vc"}},{type:"lnTo",pt:{x:"g28",y:"vc"}},{type:"lnTo",pt:{x:"g28",y:"g10"}},{type:"lnTo",pt:{x:"g33",y:"g10"}},{type:"lnTo",pt:{x:"g33",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"vc"}},{type:"lnTo",pt:{x:"g32",y:"g26"}},{type:"lnTo",pt:{x:"g32",y:"g24"}},{type:"lnTo",pt:{x:"g31",y:"g24"}},{type:"lnTo",pt:{x:"g31",y:"g25"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g32",y:"g26"}},{type:"lnTo",pt:{x:"g32",y:"g24"}},{type:"lnTo",pt:{x:"g31",y:"g24"}},{type:"lnTo",pt:{x:"g31",y:"g25"}},{type:"close"},{type:"moveTo",pt:{x:"g28",y:"vc"}},{type:"lnTo",pt:{x:"g28",y:"g10"}},{type:"lnTo",pt:{x:"g29",y:"g10"}},{type:"lnTo",pt:{x:"g29",y:"g27"}},{type:"lnTo",pt:{x:"g30",y:"g27"}},{type:"lnTo",pt:{x:"g30",y:"g10"}},{type:"lnTo",pt:{x:"g33",y:"g10"}},{type:"lnTo",pt:{x:"g33",y:"vc"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"hc",y:"g9"}},{type:"lnTo",pt:{x:"g11",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"vc"}},{type:"close"},{type:"moveTo",pt:{x:"g29",y:"g27"}},{type:"lnTo",pt:{x:"g30",y:"g27"}},{type:"lnTo",pt:{x:"g30",y:"g10"}},{type:"lnTo",pt:{x:"g29",y:"g10"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"hc",y:"g9"}},{type:"lnTo",pt:{x:"g31",y:"g25"}},{type:"lnTo",pt:{x:"g31",y:"g24"}},{type:"lnTo",pt:{x:"g32",y:"g24"}},{type:"lnTo",pt:{x:"g32",y:"g26"}},{type:"lnTo",pt:{x:"g12",y:"vc"}},{type:"lnTo",pt:{x:"g33",y:"vc"}},{type:"lnTo",pt:{x:"g33",y:"g10"}},{type:"lnTo",pt:{x:"g28",y:"g10"}},{type:"lnTo",pt:{x:"g28",y:"vc"}},{type:"lnTo",pt:{x:"g11",y:"vc"}},{type:"close"},{type:"moveTo",pt:{x:"g31",y:"g25"}},{type:"lnTo",pt:{x:"g32",y:"g26"}},{type:"moveTo",pt:{x:"g33",y:"vc"}},{type:"lnTo",pt:{x:"g28",y:"vc"}},{type:"moveTo",pt:{x:"g29",y:"g10"}},{type:"lnTo",pt:{x:"g29",y:"g27"}},{type:"lnTo",pt:{x:"g30",y:"g27"}},{type:"lnTo",pt:{x:"g30",y:"g10"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonInformation:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g11",f:"+- hc 0 dx2"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 1 32"},{n:"g17",f:"*/ g13 5 16"},{n:"g18",f:"*/ g13 3 8"},{n:"g19",f:"*/ g13 13 32"},{n:"g20",f:"*/ g13 19 32"},{n:"g22",f:"*/ g13 11 16"},{n:"g23",f:"*/ g13 13 16"},{n:"g24",f:"*/ g13 7 8"},{n:"g25",f:"+- g9 g14 0"},{n:"g28",f:"+- g9 g17 0"},{n:"g29",f:"+- g9 g18 0"},{n:"g30",f:"+- g9 g23 0"},{n:"g31",f:"+- g9 g24 0"},{n:"g32",f:"+- g11 g17 0"},{n:"g34",f:"+- g11 g19 0"},{n:"g35",f:"+- g11 g20 0"},{n:"g37",f:"+- g11 g22 0"},{n:"g38",f:"*/ g13 3 32"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"g9"}},{type:"arcTo",wR:"dx2",hR:"dx2",stAng:"3cd4",swAng:"21600000"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"hc",y:"g9"}},{type:"arcTo",wR:"dx2",hR:"dx2",stAng:"3cd4",swAng:"21600000"},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"g25"}},{type:"arcTo",wR:"g38",hR:"g38",stAng:"3cd4",swAng:"21600000"},{type:"moveTo",pt:{x:"g32",y:"g28"}},{type:"lnTo",pt:{x:"g32",y:"g29"}},{type:"lnTo",pt:{x:"g34",y:"g29"}},{type:"lnTo",pt:{x:"g34",y:"g30"}},{type:"lnTo",pt:{x:"g32",y:"g30"}},{type:"lnTo",pt:{x:"g32",y:"g31"}},{type:"lnTo",pt:{x:"g37",y:"g31"}},{type:"lnTo",pt:{x:"g37",y:"g30"}},{type:"lnTo",pt:{x:"g35",y:"g30"}},{type:"lnTo",pt:{x:"g35",y:"g28"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"hc",y:"g25"}},{type:"arcTo",wR:"g38",hR:"g38",stAng:"3cd4",swAng:"21600000"},{type:"moveTo",pt:{x:"g32",y:"g28"}},{type:"lnTo",pt:{x:"g35",y:"g28"}},{type:"lnTo",pt:{x:"g35",y:"g30"}},{type:"lnTo",pt:{x:"g37",y:"g30"}},{type:"lnTo",pt:{x:"g37",y:"g31"}},{type:"lnTo",pt:{x:"g32",y:"g31"}},{type:"lnTo",pt:{x:"g32",y:"g30"}},{type:"lnTo",pt:{x:"g34",y:"g30"}},{type:"lnTo",pt:{x:"g34",y:"g29"}},{type:"lnTo",pt:{x:"g32",y:"g29"}},{type:"close"}],fill:"lighten",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"hc",y:"g9"}},{type:"arcTo",wR:"dx2",hR:"dx2",stAng:"3cd4",swAng:"21600000"},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"g25"}},{type:"arcTo",wR:"g38",hR:"g38",stAng:"3cd4",swAng:"21600000"},{type:"moveTo",pt:{x:"g32",y:"g28"}},{type:"lnTo",pt:{x:"g35",y:"g28"}},{type:"lnTo",pt:{x:"g35",y:"g30"}},{type:"lnTo",pt:{x:"g37",y:"g30"}},{type:"lnTo",pt:{x:"g37",y:"g31"}},{type:"lnTo",pt:{x:"g32",y:"g31"}},{type:"lnTo",pt:{x:"g32",y:"g30"}},{type:"lnTo",pt:{x:"g34",y:"g30"}},{type:"lnTo",pt:{x:"g34",y:"g29"}},{type:"lnTo",pt:{x:"g32",y:"g29"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonMovie:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 1455 21600"},{n:"g15",f:"*/ g13 1905 21600"},{n:"g16",f:"*/ g13 2325 21600"},{n:"g17",f:"*/ g13 16155 21600"},{n:"g18",f:"*/ g13 17010 21600"},{n:"g19",f:"*/ g13 19335 21600"},{n:"g20",f:"*/ g13 19725 21600"},{n:"g21",f:"*/ g13 20595 21600"},{n:"g22",f:"*/ g13 5280 21600"},{n:"g23",f:"*/ g13 5730 21600"},{n:"g24",f:"*/ g13 6630 21600"},{n:"g25",f:"*/ g13 7492 21600"},{n:"g26",f:"*/ g13 9067 21600"},{n:"g27",f:"*/ g13 9555 21600"},{n:"g28",f:"*/ g13 13342 21600"},{n:"g29",f:"*/ g13 14580 21600"},{n:"g30",f:"*/ g13 15592 21600"},{n:"g31",f:"+- g11 g14 0"},{n:"g32",f:"+- g11 g15 0"},{n:"g33",f:"+- g11 g16 0"},{n:"g34",f:"+- g11 g17 0"},{n:"g35",f:"+- g11 g18 0"},{n:"g36",f:"+- g11 g19 0"},{n:"g37",f:"+- g11 g20 0"},{n:"g38",f:"+- g11 g21 0"},{n:"g39",f:"+- g9 g22 0"},{n:"g40",f:"+- g9 g23 0"},{n:"g41",f:"+- g9 g24 0"},{n:"g42",f:"+- g9 g25 0"},{n:"g43",f:"+- g9 g26 0"},{n:"g44",f:"+- g9 g27 0"},{n:"g45",f:"+- g9 g28 0"},{n:"g46",f:"+- g9 g29 0"},{n:"g47",f:"+- g9 g30 0"},{n:"g48",f:"+- g9 g31 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g11",y:"g39"}},{type:"lnTo",pt:{x:"g11",y:"g44"}},{type:"lnTo",pt:{x:"g31",y:"g44"}},{type:"lnTo",pt:{x:"g32",y:"g43"}},{type:"lnTo",pt:{x:"g33",y:"g43"}},{type:"lnTo",pt:{x:"g33",y:"g47"}},{type:"lnTo",pt:{x:"g35",y:"g47"}},{type:"lnTo",pt:{x:"g35",y:"g45"}},{type:"lnTo",pt:{x:"g36",y:"g45"}},{type:"lnTo",pt:{x:"g38",y:"g46"}},{type:"lnTo",pt:{x:"g12",y:"g46"}},{type:"lnTo",pt:{x:"g12",y:"g41"}},{type:"lnTo",pt:{x:"g38",y:"g41"}},{type:"lnTo",pt:{x:"g37",y:"g42"}},{type:"lnTo",pt:{x:"g35",y:"g42"}},{type:"lnTo",pt:{x:"g35",y:"g41"}},{type:"lnTo",pt:{x:"g34",y:"g40"}},{type:"lnTo",pt:{x:"g32",y:"g40"}},{type:"lnTo",pt:{x:"g31",y:"g39"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"g39"}},{type:"lnTo",pt:{x:"g11",y:"g44"}},{type:"lnTo",pt:{x:"g31",y:"g44"}},{type:"lnTo",pt:{x:"g32",y:"g43"}},{type:"lnTo",pt:{x:"g33",y:"g43"}},{type:"lnTo",pt:{x:"g33",y:"g47"}},{type:"lnTo",pt:{x:"g35",y:"g47"}},{type:"lnTo",pt:{x:"g35",y:"g45"}},{type:"lnTo",pt:{x:"g36",y:"g45"}},{type:"lnTo",pt:{x:"g38",y:"g46"}},{type:"lnTo",pt:{x:"g12",y:"g46"}},{type:"lnTo",pt:{x:"g12",y:"g41"}},{type:"lnTo",pt:{x:"g38",y:"g41"}},{type:"lnTo",pt:{x:"g37",y:"g42"}},{type:"lnTo",pt:{x:"g35",y:"g42"}},{type:"lnTo",pt:{x:"g35",y:"g41"}},{type:"lnTo",pt:{x:"g34",y:"g40"}},{type:"lnTo",pt:{x:"g32",y:"g40"}},{type:"lnTo",pt:{x:"g31",y:"g39"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"g39"}},{type:"lnTo",pt:{x:"g31",y:"g39"}},{type:"lnTo",pt:{x:"g32",y:"g40"}},{type:"lnTo",pt:{x:"g34",y:"g40"}},{type:"lnTo",pt:{x:"g35",y:"g41"}},{type:"lnTo",pt:{x:"g35",y:"g42"}},{type:"lnTo",pt:{x:"g37",y:"g42"}},{type:"lnTo",pt:{x:"g38",y:"g41"}},{type:"lnTo",pt:{x:"g12",y:"g41"}},{type:"lnTo",pt:{x:"g12",y:"g46"}},{type:"lnTo",pt:{x:"g38",y:"g46"}},{type:"lnTo",pt:{x:"g36",y:"g45"}},{type:"lnTo",pt:{x:"g35",y:"g45"}},{type:"lnTo",pt:{x:"g35",y:"g47"}},{type:"lnTo",pt:{x:"g33",y:"g47"}},{type:"lnTo",pt:{x:"g33",y:"g43"}},{type:"lnTo",pt:{x:"g32",y:"g43"}},{type:"lnTo",pt:{x:"g31",y:"g44"}},{type:"lnTo",pt:{x:"g11",y:"g44"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonReturn:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 7 8"},{n:"g15",f:"*/ g13 3 4"},{n:"g16",f:"*/ g13 5 8"},{n:"g17",f:"*/ g13 3 8"},{n:"g18",f:"*/ g13 1 4"},{n:"g19",f:"+- g9 g15 0"},{n:"g20",f:"+- g9 g16 0"},{n:"g21",f:"+- g9 g18 0"},{n:"g22",f:"+- g11 g14 0"},{n:"g23",f:"+- g11 g15 0"},{n:"g24",f:"+- g11 g16 0"},{n:"g25",f:"+- g11 g17 0"},{n:"g26",f:"+- g11 g18 0"},{n:"g27",f:"*/ g13 1 8"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g12",y:"g21"}},{type:"lnTo",pt:{x:"g23",y:"g9"}},{type:"lnTo",pt:{x:"hc",y:"g21"}},{type:"lnTo",pt:{x:"g24",y:"g21"}},{type:"lnTo",pt:{x:"g24",y:"g20"}},{type:"arcTo",wR:"g27",hR:"g27",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"g25",y:"g19"}},{type:"arcTo",wR:"g27",hR:"g27",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"g26",y:"g21"}},{type:"lnTo",pt:{x:"g11",y:"g21"}},{type:"lnTo",pt:{x:"g11",y:"g20"}},{type:"arcTo",wR:"g17",hR:"g17",stAng:"cd2",swAng:"-5400000"},{type:"lnTo",pt:{x:"hc",y:"g10"}},{type:"arcTo",wR:"g17",hR:"g17",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"g22",y:"g21"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g12",y:"g21"}},{type:"lnTo",pt:{x:"g23",y:"g9"}},{type:"lnTo",pt:{x:"hc",y:"g21"}},{type:"lnTo",pt:{x:"g24",y:"g21"}},{type:"lnTo",pt:{x:"g24",y:"g20"}},{type:"arcTo",wR:"g27",hR:"g27",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"g25",y:"g19"}},{type:"arcTo",wR:"g27",hR:"g27",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"g26",y:"g21"}},{type:"lnTo",pt:{x:"g11",y:"g21"}},{type:"lnTo",pt:{x:"g11",y:"g20"}},{type:"arcTo",wR:"g17",hR:"g17",stAng:"cd2",swAng:"-5400000"},{type:"lnTo",pt:{x:"hc",y:"g10"}},{type:"arcTo",wR:"g17",hR:"g17",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"g22",y:"g21"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g12",y:"g21"}},{type:"lnTo",pt:{x:"g22",y:"g21"}},{type:"lnTo",pt:{x:"g22",y:"g20"}},{type:"arcTo",wR:"g17",hR:"g17",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"g25",y:"g10"}},{type:"arcTo",wR:"g17",hR:"g17",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"g11",y:"g21"}},{type:"lnTo",pt:{x:"g26",y:"g21"}},{type:"lnTo",pt:{x:"g26",y:"g20"}},{type:"arcTo",wR:"g27",hR:"g27",stAng:"cd2",swAng:"-5400000"},{type:"lnTo",pt:{x:"hc",y:"g19"}},{type:"arcTo",wR:"g27",hR:"g27",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"g24",y:"g21"}},{type:"lnTo",pt:{x:"hc",y:"g21"}},{type:"lnTo",pt:{x:"g23",y:"g9"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},actionButtonSound:{gdLst:[{n:"dx2",f:"*/ ss 3 8"},{n:"g9",f:"+- vc 0 dx2"},{n:"g10",f:"+- vc dx2 0"},{n:"g11",f:"+- hc 0 dx2"},{n:"g12",f:"+- hc dx2 0"},{n:"g13",f:"*/ ss 3 4"},{n:"g14",f:"*/ g13 1 8"},{n:"g15",f:"*/ g13 5 16"},{n:"g16",f:"*/ g13 5 8"},{n:"g17",f:"*/ g13 11 16"},{n:"g18",f:"*/ g13 3 4"},{n:"g19",f:"*/ g13 7 8"},{n:"g20",f:"+- g9 g14 0"},{n:"g21",f:"+- g9 g15 0"},{n:"g22",f:"+- g9 g17 0"},{n:"g23",f:"+- g9 g19 0"},{n:"g24",f:"+- g11 g15 0"},{n:"g25",f:"+- g11 g16 0"},{n:"g26",f:"+- g11 g18 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"g11",y:"g21"}},{type:"lnTo",pt:{x:"g11",y:"g22"}},{type:"lnTo",pt:{x:"g24",y:"g22"}},{type:"lnTo",pt:{x:"g25",y:"g10"}},{type:"lnTo",pt:{x:"g25",y:"g9"}},{type:"lnTo",pt:{x:"g24",y:"g21"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"g21"}},{type:"lnTo",pt:{x:"g11",y:"g22"}},{type:"lnTo",pt:{x:"g24",y:"g22"}},{type:"lnTo",pt:{x:"g25",y:"g10"}},{type:"lnTo",pt:{x:"g25",y:"g9"}},{type:"lnTo",pt:{x:"g24",y:"g21"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"g11",y:"g21"}},{type:"lnTo",pt:{x:"g24",y:"g21"}},{type:"lnTo",pt:{x:"g25",y:"g9"}},{type:"lnTo",pt:{x:"g25",y:"g10"}},{type:"lnTo",pt:{x:"g24",y:"g22"}},{type:"lnTo",pt:{x:"g11",y:"g22"}},{type:"close"},{type:"moveTo",pt:{x:"g26",y:"g21"}},{type:"lnTo",pt:{x:"g12",y:"g20"}},{type:"moveTo",pt:{x:"g26",y:"vc"}},{type:"lnTo",pt:{x:"g12",y:"vc"}},{type:"moveTo",pt:{x:"g26",y:"g22"}},{type:"lnTo",pt:{x:"g12",y:"g23"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},arc:{avLst:[{n:"adj1",f:"val 16200000"},{n:"adj2",f:"val 0"}],gdLst:[{n:"stAng",f:"pin 0 adj1 21599999"},{n:"enAng",f:"pin 0 adj2 21599999"},{n:"sw11",f:"+- enAng 0 stAng"},{n:"sw12",f:"+- sw11 21600000 0"},{n:"swAng",f:"?: sw11 sw11 sw12"},{n:"wt1",f:"sin wd2 stAng"},{n:"ht1",f:"cos hd2 stAng"},{n:"dx1",f:"cat2 wd2 ht1 wt1"},{n:"dy1",f:"sat2 hd2 ht1 wt1"},{n:"wt2",f:"sin wd2 enAng"},{n:"ht2",f:"cos hd2 enAng"},{n:"dx2",f:"cat2 wd2 ht2 wt2"},{n:"dy2",f:"sat2 hd2 ht2 wt2"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- vc dy1 0"},{n:"x2",f:"+- hc dx2 0"},{n:"y2",f:"+- vc dy2 0"},{n:"sw0",f:"+- 21600000 0 stAng"},{n:"da1",f:"+- swAng 0 sw0"},{n:"g1",f:"max x1 x2"},{n:"ir",f:"?: da1 r g1"},{n:"sw1",f:"+- cd4 0 stAng"},{n:"sw2",f:"+- 27000000 0 stAng"},{n:"sw3",f:"?: sw1 sw1 sw2"},{n:"da2",f:"+- swAng 0 sw3"},{n:"g5",f:"max y1 y2"},{n:"ib",f:"?: da2 b g5"},{n:"sw4",f:"+- cd2 0 stAng"},{n:"sw5",f:"+- 32400000 0 stAng"},{n:"sw6",f:"?: sw4 sw4 sw5"},{n:"da3",f:"+- swAng 0 sw6"},{n:"g9",f:"min x1 x2"},{n:"il",f:"?: da3 l g9"},{n:"sw7",f:"+- 3cd4 0 stAng"},{n:"sw8",f:"+- 37800000 0 stAng"},{n:"sw9",f:"?: sw7 sw7 sw8"},{n:"da4",f:"+- swAng 0 sw9"},{n:"g13",f:"min y1 y2"},{n:"it",f:"?: da4 t g13"},{n:"cang1",f:"+- stAng 0 cd4"},{n:"cang2",f:"+- enAng cd4 0"},{n:"cang3",f:"+/ cang1 cang2 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"stAng",swAng:"swAng"},{type:"lnTo",pt:{x:"hc",y:"vc"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"stAng",swAng:"swAng"}],fill:"none",extrusionOk:!1,stroke:!0}]},bentArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 43750"}],gdLst:[{n:"a2",f:"pin 0 adj2 50000"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"a3",f:"pin 0 adj3 50000"},{n:"th",f:"*/ ss a1 100000"},{n:"aw2",f:"*/ ss a2 100000"},{n:"th2",f:"*/ th 1 2"},{n:"dh2",f:"+- aw2 0 th2"},{n:"ah",f:"*/ ss a3 100000"},{n:"bw",f:"+- r 0 ah"},{n:"bh",f:"+- b 0 dh2"},{n:"bs",f:"min bw bh"},{n:"maxAdj4",f:"*/ 100000 bs ss"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"bd",f:"*/ ss a4 100000"},{n:"bd3",f:"+- bd 0 th"},{n:"bd2",f:"max bd3 0"},{n:"x3",f:"+- th bd2 0"},{n:"x4",f:"+- r 0 ah"},{n:"y3",f:"+- dh2 th 0"},{n:"y4",f:"+- y3 dh2 0"},{n:"y5",f:"+- dh2 bd 0"},{n:"y6",f:"+- y3 bd2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"l",y:"y5"}},{type:"arcTo",wR:"bd",hR:"bd",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x4",y:"dh2"}},{type:"lnTo",pt:{x:"x4",y:"t"}},{type:"lnTo",pt:{x:"r",y:"aw2"}},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"arcTo",wR:"bd2",hR:"bd2",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"th",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},bentConnector2:{pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0}]},bentConnector3:{avLst:[{n:"adj1",f:"val 50000"}],gdLst:[{n:"x1",f:"*/ w adj1 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"r",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0}]},bentConnector4:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"x1",f:"*/ w adj1 100000"},{n:"x2",f:"+/ x1 r 2"},{n:"y2",f:"*/ h adj2 100000"},{n:"y1",f:"+/ t y2 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0}]},bentConnector5:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 50000"}],gdLst:[{n:"x1",f:"*/ w adj1 100000"},{n:"x3",f:"*/ w adj3 100000"},{n:"x2",f:"+/ x1 x3 2"},{n:"y2",f:"*/ h adj2 100000"},{n:"y1",f:"+/ t y2 2"},{n:"y3",f:"+/ b y2 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"b"}},{type:"lnTo",pt:{x:"r",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0}]},bentUpArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"a2",f:"pin 0 adj2 50000"},{n:"a3",f:"pin 0 adj3 50000"},{n:"y1",f:"*/ ss a3 100000"},{n:"dx1",f:"*/ ss a2 50000"},{n:"x1",f:"+- r 0 dx1"},{n:"dx3",f:"*/ ss a2 100000"},{n:"x3",f:"+- r 0 dx3"},{n:"dx2",f:"*/ ss a1 200000"},{n:"x2",f:"+- x3 0 dx2"},{n:"x4",f:"+- x3 dx2 0"},{n:"dy2",f:"*/ ss a1 100000"},{n:"y2",f:"+- b 0 dy2"},{n:"x0",f:"*/ x4 1 2"},{n:"y3",f:"+/ y2 b 2"},{n:"y15",f:"+/ y1 b 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},bevel:{avLst:[{n:"adj",f:"val 12500"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"y2",f:"+- b 0 x1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"x1"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"lnTo",pt:{x:"x1",y:"x1"}},{type:"close"}],fill:"lightenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"x1"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],fill:"lighten",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"close"}],fill:"darken",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"x1",y:"x1"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"},{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"x1"}},{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"moveTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"moveTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y2"}}],fill:"none",extrusionOk:!1,stroke:!0}]},blockArc:{avLst:[{n:"adj1",f:"val 10800000"},{n:"adj2",f:"val 0"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"stAng",f:"pin 0 adj1 21599999"},{n:"istAng",f:"pin 0 adj2 21599999"},{n:"a3",f:"pin 0 adj3 50000"},{n:"sw11",f:"+- istAng 0 stAng"},{n:"sw12",f:"+- sw11 21600000 0"},{n:"swAng",f:"?: sw11 sw11 sw12"},{n:"iswAng",f:"+- 0 0 swAng"},{n:"wt1",f:"sin wd2 stAng"},{n:"ht1",f:"cos hd2 stAng"},{n:"wt3",f:"sin wd2 istAng"},{n:"ht3",f:"cos hd2 istAng"},{n:"dx1",f:"cat2 wd2 ht1 wt1"},{n:"dy1",f:"sat2 hd2 ht1 wt1"},{n:"dx3",f:"cat2 wd2 ht3 wt3"},{n:"dy3",f:"sat2 hd2 ht3 wt3"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- vc dy1 0"},{n:"x3",f:"+- hc dx3 0"},{n:"y3",f:"+- vc dy3 0"},{n:"dr",f:"*/ ss a3 100000"},{n:"iwd2",f:"+- wd2 0 dr"},{n:"ihd2",f:"+- hd2 0 dr"},{n:"wt2",f:"sin iwd2 istAng"},{n:"ht2",f:"cos ihd2 istAng"},{n:"wt4",f:"sin iwd2 stAng"},{n:"ht4",f:"cos ihd2 stAng"},{n:"dx2",f:"cat2 iwd2 ht2 wt2"},{n:"dy2",f:"sat2 ihd2 ht2 wt2"},{n:"dx4",f:"cat2 iwd2 ht4 wt4"},{n:"dy4",f:"sat2 ihd2 ht4 wt4"},{n:"x2",f:"+- hc dx2 0"},{n:"y2",f:"+- vc dy2 0"},{n:"x4",f:"+- hc dx4 0"},{n:"y4",f:"+- vc dy4 0"},{n:"sw0",f:"+- 21600000 0 stAng"},{n:"da1",f:"+- swAng 0 sw0"},{n:"g1",f:"max x1 x2"},{n:"g2",f:"max x3 x4"},{n:"g3",f:"max g1 g2"},{n:"ir",f:"?: da1 r g3"},{n:"sw1",f:"+- cd4 0 stAng"},{n:"sw2",f:"+- 27000000 0 stAng"},{n:"sw3",f:"?: sw1 sw1 sw2"},{n:"da2",f:"+- swAng 0 sw3"},{n:"g5",f:"max y1 y2"},{n:"g6",f:"max y3 y4"},{n:"g7",f:"max g5 g6"},{n:"ib",f:"?: da2 b g7"},{n:"sw4",f:"+- cd2 0 stAng"},{n:"sw5",f:"+- 32400000 0 stAng"},{n:"sw6",f:"?: sw4 sw4 sw5"},{n:"da3",f:"+- swAng 0 sw6"},{n:"g9",f:"min x1 x2"},{n:"g10",f:"min x3 x4"},{n:"g11",f:"min g9 g10"},{n:"il",f:"?: da3 l g11"},{n:"sw7",f:"+- 3cd4 0 stAng"},{n:"sw8",f:"+- 37800000 0 stAng"},{n:"sw9",f:"?: sw7 sw7 sw8"},{n:"da4",f:"+- swAng 0 sw9"},{n:"g13",f:"min y1 y2"},{n:"g14",f:"min y3 y4"},{n:"g15",f:"min g13 g14"},{n:"it",f:"?: da4 t g15"},{n:"x5",f:"+/ x1 x4 2"},{n:"y5",f:"+/ y1 y4 2"},{n:"x6",f:"+/ x3 x2 2"},{n:"y6",f:"+/ y3 y2 2"},{n:"cang1",f:"+- stAng 0 cd4"},{n:"cang2",f:"+- istAng cd4 0"},{n:"cang3",f:"+/ cang1 cang2 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"stAng",swAng:"swAng"},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"arcTo",wR:"iwd2",hR:"ihd2",stAng:"istAng",swAng:"iswAng"},{type:"close"}],extrusionOk:!1,stroke:!0}]},borderCallout1:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 112500"},{n:"adj4",f:"val -38333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}}],fill:"none",extrusionOk:!1,stroke:!0}]},borderCallout2:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 112500"},{n:"adj6",f:"val -46667"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}}],fill:"none",extrusionOk:!1,stroke:!0}]},borderCallout3:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 100000"},{n:"adj6",f:"val -16667"},{n:"adj7",f:"val 112963"},{n:"adj8",f:"val -8333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"},{n:"y4",f:"*/ h adj7 100000"},{n:"x4",f:"*/ w adj8 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x4",y:"y4"}}],fill:"none",extrusionOk:!1,stroke:!0}]},bracePair:{avLst:[{n:"adj",f:"val 8333"}],gdLst:[{n:"a",f:"pin 0 adj 25000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"*/ ss a 50000"},{n:"x3",f:"+- r 0 x2"},{n:"x4",f:"+- r 0 x1"},{n:"y2",f:"+- vc 0 x1"},{n:"y3",f:"+- vc x1 0"},{n:"y4",f:"+- b 0 x1"},{n:"it",f:"*/ x1 29289 100000"},{n:"il",f:"+- x1 it 0"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 it"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x2",y:"b"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"-5400000"},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"x1",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"-5400000"},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x2",y:"b"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"-5400000"},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"x1",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"cd4"},{type:"moveTo",pt:{x:"x3",y:"t"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"-5400000"},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"cd4"}],fill:"none",extrusionOk:!1,stroke:!0}]},bracketPair:{avLst:[{n:"adj",f:"val 16667"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"y2",f:"+- b 0 x1"},{n:"il",f:"*/ x1 29289 100000"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"b"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"l",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"cd4"},{type:"moveTo",pt:{x:"x2",y:"t"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"cd4"}],fill:"none",extrusionOk:!1,stroke:!0}]},callout1:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 112500"},{n:"adj4",f:"val -38333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}}],fill:"none",extrusionOk:!1,stroke:!0}]},callout2:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 112500"},{n:"adj6",f:"val -46667"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}}],fill:"none",extrusionOk:!1,stroke:!0}]},callout3:{avLst:[{n:"adj1",f:"val 18750"},{n:"adj2",f:"val -8333"},{n:"adj3",f:"val 18750"},{n:"adj4",f:"val -16667"},{n:"adj5",f:"val 100000"},{n:"adj6",f:"val -16667"},{n:"adj7",f:"val 112963"},{n:"adj8",f:"val -8333"}],gdLst:[{n:"y1",f:"*/ h adj1 100000"},{n:"x1",f:"*/ w adj2 100000"},{n:"y2",f:"*/ h adj3 100000"},{n:"x2",f:"*/ w adj4 100000"},{n:"y3",f:"*/ h adj5 100000"},{n:"x3",f:"*/ w adj6 100000"},{n:"y4",f:"*/ h adj7 100000"},{n:"x4",f:"*/ w adj8 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x4",y:"y4"}}],fill:"none",extrusionOk:!1,stroke:!0}]},can:{avLst:[{n:"adj",f:"val 25000"}],gdLst:[{n:"maxAdj",f:"*/ 50000 h ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"y1",f:"*/ ss a 200000"},{n:"y2",f:"+- y1 y1 0"},{n:"y3",f:"+- b 0 y1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd2",swAng:"-10800000"},{type:"lnTo",pt:{x:"r",y:"y3"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"cd2"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd2",swAng:"cd2"},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"cd2"},{type:"close"}],fill:"lighten",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"r",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"cd2"},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd2",swAng:"cd2"},{type:"lnTo",pt:{x:"r",y:"y3"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"cd2"},{type:"lnTo",pt:{x:"l",y:"y1"}}],fill:"none",extrusionOk:!1,stroke:!0}]},chartPlus:{pathLst:[{defines:[{type:"moveTo",pt:{x:"5",y:"0"}},{type:"lnTo",pt:{x:"5",y:"10"}},{type:"moveTo",pt:{x:"0",y:"5"}},{type:"lnTo",pt:{x:"10",y:"5"}}],fill:"none",extrusionOk:!1,stroke:!0,w:10,h:10},{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"0",y:"10"}},{type:"lnTo",pt:{x:"10",y:"10"}},{type:"lnTo",pt:{x:"10",y:"0"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:10,h:10}]},chartStar:{pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"10",y:"10"}},{type:"moveTo",pt:{x:"0",y:"10"}},{type:"lnTo",pt:{x:"10",y:"0"}},{type:"moveTo",pt:{x:"5",y:"0"}},{type:"lnTo",pt:{x:"5",y:"10"}}],fill:"none",extrusionOk:!1,stroke:!0,w:10,h:10},{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"0",y:"10"}},{type:"lnTo",pt:{x:"10",y:"10"}},{type:"lnTo",pt:{x:"10",y:"0"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:10,h:10}]},chartX:{pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"10",y:"10"}},{type:"moveTo",pt:{x:"0",y:"10"}},{type:"lnTo",pt:{x:"10",y:"0"}}],fill:"none",extrusionOk:!1,stroke:!0,w:10,h:10},{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"0",y:"10"}},{type:"lnTo",pt:{x:"10",y:"10"}},{type:"lnTo",pt:{x:"10",y:"0"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:10,h:10}]},chevron:{avLst:[{n:"adj",f:"val 50000"}],gdLst:[{n:"maxAdj",f:"*/ 100000 w ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"x3",f:"*/ x2 1 2"},{n:"dx",f:"+- x2 0 x1"},{n:"il",f:"?: dx x1 l"},{n:"ir",f:"?: dx x2 r"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"vc"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},chord:{avLst:[{n:"adj1",f:"val 2700000"},{n:"adj2",f:"val 16200000"}],gdLst:[{n:"stAng",f:"pin 0 adj1 21599999"},{n:"enAng",f:"pin 0 adj2 21599999"},{n:"sw1",f:"+- enAng 0 stAng"},{n:"sw2",f:"+- sw1 21600000 0"},{n:"swAng",f:"?: sw1 sw1 sw2"},{n:"wt1",f:"sin wd2 stAng"},{n:"ht1",f:"cos hd2 stAng"},{n:"dx1",f:"cat2 wd2 ht1 wt1"},{n:"dy1",f:"sat2 hd2 ht1 wt1"},{n:"wt2",f:"sin wd2 enAng"},{n:"ht2",f:"cos hd2 enAng"},{n:"dx2",f:"cat2 wd2 ht2 wt2"},{n:"dy2",f:"sat2 hd2 ht2 wt2"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- vc dy1 0"},{n:"x2",f:"+- hc dx2 0"},{n:"y2",f:"+- vc dy2 0"},{n:"x3",f:"+/ x1 x2 2"},{n:"y3",f:"+/ y1 y2 2"},{n:"midAng0",f:"*/ swAng 1 2"},{n:"midAng",f:"+- stAng midAng0 cd2"},{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"stAng",swAng:"swAng"},{type:"close"}],extrusionOk:!1,stroke:!0}]},circularArrow:{avLst:[{n:"adj1",f:"val 12500"},{n:"adj2",f:"val 1142319"},{n:"adj3",f:"val 20457681"},{n:"adj4",f:"val 10800000"},{n:"adj5",f:"val 12500"}],gdLst:[{n:"a5",f:"pin 0 adj5 25000"},{n:"maxAdj1",f:"*/ a5 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"enAng",f:"pin 1 adj3 21599999"},{n:"stAng",f:"pin 0 adj4 21599999"},{n:"th",f:"*/ ss a1 100000"},{n:"thh",f:"*/ ss a5 100000"},{n:"th2",f:"*/ th 1 2"},{n:"rw1",f:"+- wd2 th2 thh"},{n:"rh1",f:"+- hd2 th2 thh"},{n:"rw2",f:"+- rw1 0 th"},{n:"rh2",f:"+- rh1 0 th"},{n:"rw3",f:"+- rw2 th2 0"},{n:"rh3",f:"+- rh2 th2 0"},{n:"wtH",f:"sin rw3 enAng"},{n:"htH",f:"cos rh3 enAng"},{n:"dxH",f:"cat2 rw3 htH wtH"},{n:"dyH",f:"sat2 rh3 htH wtH"},{n:"xH",f:"+- hc dxH 0"},{n:"yH",f:"+- vc dyH 0"},{n:"rI",f:"min rw2 rh2"},{n:"u1",f:"*/ dxH dxH 1"},{n:"u2",f:"*/ dyH dyH 1"},{n:"u3",f:"*/ rI rI 1"},{n:"u4",f:"+- u1 0 u3"},{n:"u5",f:"+- u2 0 u3"},{n:"u6",f:"*/ u4 u5 u1"},{n:"u7",f:"*/ u6 1 u2"},{n:"u8",f:"+- 1 0 u7"},{n:"u9",f:"sqrt u8"},{n:"u10",f:"*/ u4 1 dxH"},{n:"u11",f:"*/ u10 1 dyH"},{n:"u12",f:"+/ 1 u9 u11"},{n:"u13",f:"at2 1 u12"},{n:"u14",f:"+- u13 21600000 0"},{n:"u15",f:"?: u13 u13 u14"},{n:"u16",f:"+- u15 0 enAng"},{n:"u17",f:"+- u16 21600000 0"},{n:"u18",f:"?: u16 u16 u17"},{n:"u19",f:"+- u18 0 cd2"},{n:"u20",f:"+- u18 0 21600000"},{n:"u21",f:"?: u19 u20 u18"},{n:"maxAng",f:"abs u21"},{n:"aAng",f:"pin 0 adj2 maxAng"},{n:"ptAng",f:"+- enAng aAng 0"},{n:"wtA",f:"sin rw3 ptAng"},{n:"htA",f:"cos rh3 ptAng"},{n:"dxA",f:"cat2 rw3 htA wtA"},{n:"dyA",f:"sat2 rh3 htA wtA"},{n:"xA",f:"+- hc dxA 0"},{n:"yA",f:"+- vc dyA 0"},{n:"wtE",f:"sin rw1 stAng"},{n:"htE",f:"cos rh1 stAng"},{n:"dxE",f:"cat2 rw1 htE wtE"},{n:"dyE",f:"sat2 rh1 htE wtE"},{n:"xE",f:"+- hc dxE 0"},{n:"yE",f:"+- vc dyE 0"},{n:"dxG",f:"cos thh ptAng"},{n:"dyG",f:"sin thh ptAng"},{n:"xG",f:"+- xH dxG 0"},{n:"yG",f:"+- yH dyG 0"},{n:"dxB",f:"cos thh ptAng"},{n:"dyB",f:"sin thh ptAng"},{n:"xB",f:"+- xH 0 dxB 0"},{n:"yB",f:"+- yH 0 dyB 0"},{n:"sx1",f:"+- xB 0 hc"},{n:"sy1",f:"+- yB 0 vc"},{n:"sx2",f:"+- xG 0 hc"},{n:"sy2",f:"+- yG 0 vc"},{n:"rO",f:"min rw1 rh1"},{n:"x1O",f:"*/ sx1 rO rw1"},{n:"y1O",f:"*/ sy1 rO rh1"},{n:"x2O",f:"*/ sx2 rO rw1"},{n:"y2O",f:"*/ sy2 rO rh1"},{n:"dxO",f:"+- x2O 0 x1O"},{n:"dyO",f:"+- y2O 0 y1O"},{n:"dO",f:"mod dxO dyO 0"},{n:"q1",f:"*/ x1O y2O 1"},{n:"q2",f:"*/ x2O y1O 1"},{n:"DO",f:"+- q1 0 q2"},{n:"q3",f:"*/ rO rO 1"},{n:"q4",f:"*/ dO dO 1"},{n:"q5",f:"*/ q3 q4 1"},{n:"q6",f:"*/ DO DO 1"},{n:"q7",f:"+- q5 0 q6"},{n:"q8",f:"max q7 0"},{n:"sdelO",f:"sqrt q8"},{n:"ndyO",f:"*/ dyO -1 1"},{n:"sdyO",f:"?: ndyO -1 1"},{n:"q9",f:"*/ sdyO dxO 1"},{n:"q10",f:"*/ q9 sdelO 1"},{n:"q11",f:"*/ DO dyO 1"},{n:"dxF1",f:"+/ q11 q10 q4"},{n:"q12",f:"+- q11 0 q10"},{n:"dxF2",f:"*/ q12 1 q4"},{n:"adyO",f:"abs dyO"},{n:"q13",f:"*/ adyO sdelO 1"},{n:"q14",f:"*/ DO dxO -1"},{n:"dyF1",f:"+/ q14 q13 q4"},{n:"q15",f:"+- q14 0 q13"},{n:"dyF2",f:"*/ q15 1 q4"},{n:"q16",f:"+- x2O 0 dxF1"},{n:"q17",f:"+- x2O 0 dxF2"},{n:"q18",f:"+- y2O 0 dyF1"},{n:"q19",f:"+- y2O 0 dyF2"},{n:"q20",f:"mod q16 q18 0"},{n:"q21",f:"mod q17 q19 0"},{n:"q22",f:"+- q21 0 q20"},{n:"dxF",f:"?: q22 dxF1 dxF2"},{n:"dyF",f:"?: q22 dyF1 dyF2"},{n:"sdxF",f:"*/ dxF rw1 rO"},{n:"sdyF",f:"*/ dyF rh1 rO"},{n:"xF",f:"+- hc sdxF 0"},{n:"yF",f:"+- vc sdyF 0"},{n:"x1I",f:"*/ sx1 rI rw2"},{n:"y1I",f:"*/ sy1 rI rh2"},{n:"x2I",f:"*/ sx2 rI rw2"},{n:"y2I",f:"*/ sy2 rI rh2"},{n:"dxI",f:"+- x2I 0 x1I"},{n:"dyI",f:"+- y2I 0 y1I"},{n:"dI",f:"mod dxI dyI 0"},{n:"v1",f:"*/ x1I y2I 1"},{n:"v2",f:"*/ x2I y1I 1"},{n:"DI",f:"+- v1 0 v2"},{n:"v3",f:"*/ rI rI 1"},{n:"v4",f:"*/ dI dI 1"},{n:"v5",f:"*/ v3 v4 1"},{n:"v6",f:"*/ DI DI 1"},{n:"v7",f:"+- v5 0 v6"},{n:"v8",f:"max v7 0"},{n:"sdelI",f:"sqrt v8"},{n:"v9",f:"*/ sdyO dxI 1"},{n:"v10",f:"*/ v9 sdelI 1"},{n:"v11",f:"*/ DI dyI 1"},{n:"dxC1",f:"+/ v11 v10 v4"},{n:"v12",f:"+- v11 0 v10"},{n:"dxC2",f:"*/ v12 1 v4"},{n:"adyI",f:"abs dyI"},{n:"v13",f:"*/ adyI sdelI 1"},{n:"v14",f:"*/ DI dxI -1"},{n:"dyC1",f:"+/ v14 v13 v4"},{n:"v15",f:"+- v14 0 v13"},{n:"dyC2",f:"*/ v15 1 v4"},{n:"v16",f:"+- x1I 0 dxC1"},{n:"v17",f:"+- x1I 0 dxC2"},{n:"v18",f:"+- y1I 0 dyC1"},{n:"v19",f:"+- y1I 0 dyC2"},{n:"v20",f:"mod v16 v18 0"},{n:"v21",f:"mod v17 v19 0"},{n:"v22",f:"+- v21 0 v20"},{n:"dxC",f:"?: v22 dxC1 dxC2"},{n:"dyC",f:"?: v22 dyC1 dyC2"},{n:"sdxC",f:"*/ dxC rw2 rI"},{n:"sdyC",f:"*/ dyC rh2 rI"},{n:"xC",f:"+- hc sdxC 0"},{n:"yC",f:"+- vc sdyC 0"},{n:"ist0",f:"at2 sdxC sdyC"},{n:"ist1",f:"+- ist0 21600000 0"},{n:"istAng",f:"?: ist0 ist0 ist1"},{n:"isw1",f:"+- stAng 0 istAng"},{n:"isw2",f:"+- isw1 0 21600000"},{n:"iswAng",f:"?: isw1 isw2 isw1"},{n:"p1",f:"+- xF 0 xC"},{n:"p2",f:"+- yF 0 yC"},{n:"p3",f:"mod p1 p2 0"},{n:"p4",f:"*/ p3 1 2"},{n:"p5",f:"+- p4 0 thh"},{n:"xGp",f:"?: p5 xF xG"},{n:"yGp",f:"?: p5 yF yG"},{n:"xBp",f:"?: p5 xC xB"},{n:"yBp",f:"?: p5 yC yB"},{n:"en0",f:"at2 sdxF sdyF"},{n:"en1",f:"+- en0 21600000 0"},{n:"en2",f:"?: en0 en0 en1"},{n:"sw0",f:"+- en2 0 stAng"},{n:"sw1",f:"+- sw0 21600000 0"},{n:"swAng",f:"?: sw0 sw0 sw1"},{n:"wtI",f:"sin rw3 stAng"},{n:"htI",f:"cos rh3 stAng"},{n:"dxI",f:"cat2 rw3 htI wtI"},{n:"dyI",f:"sat2 rh3 htI wtI"},{n:"xI",f:"+- hc dxI 0"},{n:"yI",f:"+- vc dyI 0"},{n:"aI",f:"+- stAng 0 cd4"},{n:"aA",f:"+- ptAng cd4 0"},{n:"aB",f:"+- ptAng cd2 0"},{n:"idx",f:"cos rw1 2700000"},{n:"idy",f:"sin rh1 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"xE",y:"yE"}},{type:"arcTo",wR:"rw1",hR:"rh1",stAng:"stAng",swAng:"swAng"},{type:"lnTo",pt:{x:"xGp",y:"yGp"}},{type:"lnTo",pt:{x:"xA",y:"yA"}},{type:"lnTo",pt:{x:"xBp",y:"yBp"}},{type:"lnTo",pt:{x:"xC",y:"yC"}},{type:"arcTo",wR:"rw2",hR:"rh2",stAng:"istAng",swAng:"iswAng"},{type:"close"}],extrusionOk:!1,stroke:!0}]},cloud:{gdLst:[{n:"il",f:"*/ w 2977 21600"},{n:"it",f:"*/ h 3262 21600"},{n:"ir",f:"*/ w 17087 21600"},{n:"ib",f:"*/ h 17337 21600"},{n:"g27",f:"*/ w 67 21600"},{n:"g28",f:"*/ h 21577 21600"},{n:"g29",f:"*/ w 21582 21600"},{n:"g30",f:"*/ h 1235 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"3900",y:"14370"}},{type:"arcTo",wR:"6753",hR:"9190",stAng:"-11429249",swAng:"7426832"},{type:"arcTo",wR:"5333",hR:"7267",stAng:"-8646143",swAng:"5396714"},{type:"arcTo",wR:"4365",hR:"5945",stAng:"-8748475",swAng:"5983381"},{type:"arcTo",wR:"4857",hR:"6595",stAng:"-7859164",swAng:"7034504"},{type:"arcTo",wR:"5333",hR:"7273",stAng:"-4722533",swAng:"6541615"},{type:"arcTo",wR:"6775",hR:"9220",stAng:"-2776035",swAng:"7816140"},{type:"arcTo",wR:"5785",hR:"7867",stAng:"37501",swAng:"6842000"},{type:"arcTo",wR:"6752",hR:"9215",stAng:"1347096",swAng:"6910353"},{type:"arcTo",wR:"7720",hR:"10543",stAng:"3974558",swAng:"4542661"},{type:"arcTo",wR:"4360",hR:"5918",stAng:"-16496525",swAng:"8804134"},{type:"arcTo",wR:"4345",hR:"5945",stAng:"-14809710",swAng:"9151131"},{type:"close"}],extrusionOk:!1,stroke:!0,w:43200,h:43200},{defines:[{type:"moveTo",pt:{x:"4693",y:"26177"}},{type:"arcTo",wR:"4345",hR:"5945",stAng:"5204520",swAng:"1585770"},{type:"moveTo",pt:{x:"6928",y:"34899"}},{type:"arcTo",wR:"4360",hR:"5918",stAng:"4416628",swAng:"686848"},{type:"moveTo",pt:{x:"16478",y:"39090"}},{type:"arcTo",wR:"6752",hR:"9215",stAng:"8257449",swAng:"844866"},{type:"moveTo",pt:{x:"28827",y:"34751"}},{type:"arcTo",wR:"6752",hR:"9215",stAng:"387196",swAng:"959901"},{type:"moveTo",pt:{x:"34129",y:"22954"}},{type:"arcTo",wR:"5785",hR:"7867",stAng:"-4217541",swAng:"4255042"},{type:"moveTo",pt:{x:"41798",y:"15354"}},{type:"arcTo",wR:"5333",hR:"7273",stAng:"1819082",swAng:"1665090"},{type:"moveTo",pt:{x:"38324",y:"5426"}},{type:"arcTo",wR:"4857",hR:"6595",stAng:"-824660",swAng:"891534"},{type:"moveTo",pt:{x:"29078",y:"3952"}},{type:"arcTo",wR:"4857",hR:"6595",stAng:"-8950887",swAng:"1091722"},{type:"moveTo",pt:{x:"22141",y:"4720"}},{type:"arcTo",wR:"4365",hR:"5945",stAng:"-9809656",swAng:"1061181"},{type:"moveTo",pt:{x:"14000",y:"5192"}},{type:"arcTo",wR:"6753",hR:"9190",stAng:"-4002417",swAng:"739161"},{type:"moveTo",pt:{x:"4127",y:"15789"}},{type:"arcTo",wR:"6753",hR:"9190",stAng:"9459261",swAng:"711490"}],fill:"none",extrusionOk:!1,stroke:!0,w:43200,h:43200}]},cloudCallout:{avLst:[{n:"adj1",f:"val -20833"},{n:"adj2",f:"val 62500"}],gdLst:[{n:"dxPos",f:"*/ w adj1 100000"},{n:"dyPos",f:"*/ h adj2 100000"},{n:"xPos",f:"+- hc dxPos 0"},{n:"yPos",f:"+- vc dyPos 0"},{n:"ht",f:"cat2 hd2 dxPos dyPos"},{n:"wt",f:"sat2 wd2 dxPos dyPos"},{n:"g2",f:"cat2 wd2 ht wt"},{n:"g3",f:"sat2 hd2 ht wt"},{n:"g4",f:"+- hc g2 0"},{n:"g5",f:"+- vc g3 0"},{n:"g6",f:"+- g4 0 xPos"},{n:"g7",f:"+- g5 0 yPos"},{n:"g8",f:"mod g6 g7 0"},{n:"g9",f:"*/ ss 6600 21600"},{n:"g10",f:"+- g8 0 g9"},{n:"g11",f:"*/ g10 1 3"},{n:"g12",f:"*/ ss 1800 21600"},{n:"g13",f:"+- g11 g12 0"},{n:"g14",f:"*/ g13 g6 g8"},{n:"g15",f:"*/ g13 g7 g8"},{n:"g16",f:"+- g14 xPos 0"},{n:"g17",f:"+- g15 yPos 0"},{n:"g18",f:"*/ ss 4800 21600"},{n:"g19",f:"*/ g11 2 1"},{n:"g20",f:"+- g18 g19 0"},{n:"g21",f:"*/ g20 g6 g8"},{n:"g22",f:"*/ g20 g7 g8"},{n:"g23",f:"+- g21 xPos 0"},{n:"g24",f:"+- g22 yPos 0"},{n:"g25",f:"*/ ss 1200 21600"},{n:"g26",f:"*/ ss 600 21600"},{n:"x23",f:"+- xPos g26 0"},{n:"x24",f:"+- g16 g25 0"},{n:"x25",f:"+- g23 g12 0"},{n:"il",f:"*/ w 2977 21600"},{n:"it",f:"*/ h 3262 21600"},{n:"ir",f:"*/ w 17087 21600"},{n:"ib",f:"*/ h 17337 21600"},{n:"g27",f:"*/ w 67 21600"},{n:"g28",f:"*/ h 21577 21600"},{n:"g29",f:"*/ w 21582 21600"},{n:"g30",f:"*/ h 1235 21600"},{n:"pang",f:"at2 dxPos dyPos"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"3900",y:"14370"}},{type:"arcTo",wR:"6753",hR:"9190",stAng:"-11429249",swAng:"7426832"},{type:"arcTo",wR:"5333",hR:"7267",stAng:"-8646143",swAng:"5396714"},{type:"arcTo",wR:"4365",hR:"5945",stAng:"-8748475",swAng:"5983381"},{type:"arcTo",wR:"4857",hR:"6595",stAng:"-7859164",swAng:"7034504"},{type:"arcTo",wR:"5333",hR:"7273",stAng:"-4722533",swAng:"6541615"},{type:"arcTo",wR:"6775",hR:"9220",stAng:"-2776035",swAng:"7816140"},{type:"arcTo",wR:"5785",hR:"7867",stAng:"37501",swAng:"6842000"},{type:"arcTo",wR:"6752",hR:"9215",stAng:"1347096",swAng:"6910353"},{type:"arcTo",wR:"7720",hR:"10543",stAng:"3974558",swAng:"4542661"},{type:"arcTo",wR:"4360",hR:"5918",stAng:"-16496525",swAng:"8804134"},{type:"arcTo",wR:"4345",hR:"5945",stAng:"-14809710",swAng:"9151131"},{type:"close"}],extrusionOk:!1,stroke:!0,w:43200,h:43200},{defines:[{type:"moveTo",pt:{x:"x23",y:"yPos"}},{type:"arcTo",wR:"g26",hR:"g26",stAng:"0",swAng:"21600000"},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x24",y:"g17"}},{type:"arcTo",wR:"g25",hR:"g25",stAng:"0",swAng:"21600000"},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x25",y:"g24"}},{type:"arcTo",wR:"g12",hR:"g12",stAng:"0",swAng:"21600000"},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"4693",y:"26177"}},{type:"arcTo",wR:"4345",hR:"5945",stAng:"5204520",swAng:"1585770"},{type:"moveTo",pt:{x:"6928",y:"34899"}},{type:"arcTo",wR:"4360",hR:"5918",stAng:"4416628",swAng:"686848"},{type:"moveTo",pt:{x:"16478",y:"39090"}},{type:"arcTo",wR:"6752",hR:"9215",stAng:"8257449",swAng:"844866"},{type:"moveTo",pt:{x:"28827",y:"34751"}},{type:"arcTo",wR:"6752",hR:"9215",stAng:"387196",swAng:"959901"},{type:"moveTo",pt:{x:"34129",y:"22954"}},{type:"arcTo",wR:"5785",hR:"7867",stAng:"-4217541",swAng:"4255042"},{type:"moveTo",pt:{x:"41798",y:"15354"}},{type:"arcTo",wR:"5333",hR:"7273",stAng:"1819082",swAng:"1665090"},{type:"moveTo",pt:{x:"38324",y:"5426"}},{type:"arcTo",wR:"4857",hR:"6595",stAng:"-824660",swAng:"891534"},{type:"moveTo",pt:{x:"29078",y:"3952"}},{type:"arcTo",wR:"4857",hR:"6595",stAng:"-8950887",swAng:"1091722"},{type:"moveTo",pt:{x:"22141",y:"4720"}},{type:"arcTo",wR:"4365",hR:"5945",stAng:"-9809656",swAng:"1061181"},{type:"moveTo",pt:{x:"14000",y:"5192"}},{type:"arcTo",wR:"6753",hR:"9190",stAng:"-4002417",swAng:"739161"},{type:"moveTo",pt:{x:"4127",y:"15789"}},{type:"arcTo",wR:"6753",hR:"9190",stAng:"9459261",swAng:"711490"}],fill:"none",extrusionOk:!1,stroke:!0,w:43200,h:43200}]},corner:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj1",f:"*/ 100000 h ss"},{n:"maxAdj2",f:"*/ 100000 w ss"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"x1",f:"*/ ss a2 100000"},{n:"dy1",f:"*/ ss a1 100000"},{n:"y1",f:"+- b 0 dy1"},{n:"cx1",f:"*/ x1 1 2"},{n:"cy1",f:"+/ y1 b 2"},{n:"d",f:"+- w 0 h"},{n:"it",f:"?: d y1 t"},{n:"ir",f:"?: d r x1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},cornerTabs:{gdLst:[{n:"md",f:"mod w h 0"},{n:"dx",f:"*/ 1 md 20"},{n:"y1",f:"+- 0 b dx"},{n:"x1",f:"+- 0 r dx"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"dx",y:"t"}},{type:"lnTo",pt:{x:"l",y:"dx"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"dx",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"dx"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},cube:{avLst:[{n:"adj",f:"val 25000"}],gdLst:[{n:"a",f:"pin 0 adj 100000"},{n:"y1",f:"*/ ss a 100000"},{n:"y4",f:"+- b 0 y1"},{n:"y2",f:"*/ y4 1 2"},{n:"y3",f:"+/ y1 b 2"},{n:"x4",f:"+- r 0 y1"},{n:"x2",f:"*/ x4 1 2"},{n:"x3",f:"+/ y1 r 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"b"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"y1",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"close"}],fill:"lightenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"y1",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"moveTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedConnector2:{pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"cubicBezTo",pts:[{x:"wd2",y:"t"},{x:"r",y:"hd2"},{x:"r",y:"b"}]}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedConnector3:{avLst:[{n:"adj1",f:"val 50000"}],gdLst:[{n:"x2",f:"*/ w adj1 100000"},{n:"x1",f:"+/ l x2 2"},{n:"x3",f:"+/ r x2 2"},{n:"y3",f:"*/ h 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"cubicBezTo",pts:[{x:"x1",y:"t"},{x:"x2",y:"hd4"},{x:"x2",y:"vc"}]},{type:"cubicBezTo",pts:[{x:"x2",y:"y3"},{x:"x3",y:"b"},{x:"r",y:"b"}]}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedConnector4:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"x2",f:"*/ w adj1 100000"},{n:"x1",f:"+/ l x2 2"},{n:"x3",f:"+/ r x2 2"},{n:"x4",f:"+/ x2 x3 2"},{n:"x5",f:"+/ x3 r 2"},{n:"y4",f:"*/ h adj2 100000"},{n:"y1",f:"+/ t y4 2"},{n:"y2",f:"+/ t y1 2"},{n:"y3",f:"+/ y1 y4 2"},{n:"y5",f:"+/ b y4 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"cubicBezTo",pts:[{x:"x1",y:"t"},{x:"x2",y:"y2"},{x:"x2",y:"y1"}]},{type:"cubicBezTo",pts:[{x:"x2",y:"y3"},{x:"x4",y:"y4"},{x:"x3",y:"y4"}]},{type:"cubicBezTo",pts:[{x:"x5",y:"y4"},{x:"r",y:"y5"},{x:"r",y:"b"}]}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedConnector5:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 50000"}],gdLst:[{n:"x3",f:"*/ w adj1 100000"},{n:"x6",f:"*/ w adj3 100000"},{n:"x1",f:"+/ x3 x6 2"},{n:"x2",f:"+/ l x3 2"},{n:"x4",f:"+/ x3 x1 2"},{n:"x5",f:"+/ x6 x1 2"},{n:"x7",f:"+/ x6 r 2"},{n:"y4",f:"*/ h adj2 100000"},{n:"y1",f:"+/ t y4 2"},{n:"y2",f:"+/ t y1 2"},{n:"y3",f:"+/ y1 y4 2"},{n:"y5",f:"+/ b y4 2"},{n:"y6",f:"+/ y5 y4 2"},{n:"y7",f:"+/ y5 b 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"cubicBezTo",pts:[{x:"x2",y:"t"},{x:"x3",y:"y2"},{x:"x3",y:"y1"}]},{type:"cubicBezTo",pts:[{x:"x3",y:"y3"},{x:"x4",y:"y4"},{x:"x1",y:"y4"}]},{type:"cubicBezTo",pts:[{x:"x5",y:"y4"},{x:"x6",y:"y6"},{x:"x6",y:"y5"}]},{type:"cubicBezTo",pts:[{x:"x6",y:"y7"},{x:"x7",y:"b"},{x:"r",y:"b"}]}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedDownArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 w ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"a1",f:"pin 0 adj1 100000"},{n:"th",f:"*/ ss a1 100000"},{n:"aw",f:"*/ ss a2 100000"},{n:"q1",f:"+/ th aw 4"},{n:"wR",f:"+- wd2 0 q1"},{n:"q7",f:"*/ wR 2 1"},{n:"q8",f:"*/ q7 q7 1"},{n:"q9",f:"*/ th th 1"},{n:"q10",f:"+- q8 0 q9"},{n:"q11",f:"sqrt q10"},{n:"idy",f:"*/ q11 h q7"},{n:"maxAdj3",f:"*/ 100000 idy ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"ah",f:"*/ ss adj3 100000"},{n:"x3",f:"+- wR th 0"},{n:"q2",f:"*/ h h 1"},{n:"q3",f:"*/ ah ah 1"},{n:"q4",f:"+- q2 0 q3"},{n:"q5",f:"sqrt q4"},{n:"dx",f:"*/ q5 wR h"},{n:"x5",f:"+- wR dx 0"},{n:"x7",f:"+- x3 dx 0"},{n:"q6",f:"+- aw 0 th"},{n:"dh",f:"*/ q6 1 2"},{n:"x4",f:"+- x5 0 dh"},{n:"x8",f:"+- x7 dh 0"},{n:"aw2",f:"*/ aw 1 2"},{n:"x6",f:"+- r 0 aw2"},{n:"y1",f:"+- b 0 ah"},{n:"swAng",f:"at2 ah dx"},{n:"mswAng",f:"+- 0 0 swAng"},{n:"iy",f:"+- b 0 idy"},{n:"ix",f:"+/ wR x3 2"},{n:"q12",f:"*/ th 1 2"},{n:"dang2",f:"at2 idy q12"},{n:"stAng",f:"+- 3cd4 swAng 0"},{n:"stAng2",f:"+- 3cd4 0 dang2"},{n:"swAng2",f:"+- dang2 0 cd4"},{n:"swAng3",f:"+- cd4 dang2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x6",y:"b"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x5",y:"y1"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng",swAng:"mswAng"},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"3cd4",swAng:"swAng"},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"ix",y:"iy"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng2",swAng:"swAng2"},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"cd2",swAng:"swAng3"},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"ix",y:"iy"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng2",swAng:"swAng2"},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"3cd4",swAng:"swAng"},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"lnTo",pt:{x:"x6",y:"b"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x5",y:"y1"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng",swAng:"mswAng"}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedLeftArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 h ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"a1",f:"pin 0 adj1 a2"},{n:"th",f:"*/ ss a1 100000"},{n:"aw",f:"*/ ss a2 100000"},{n:"q1",f:"+/ th aw 4"},{n:"hR",f:"+- hd2 0 q1"},{n:"q7",f:"*/ hR 2 1"},{n:"q8",f:"*/ q7 q7 1"},{n:"q9",f:"*/ th th 1"},{n:"q10",f:"+- q8 0 q9"},{n:"q11",f:"sqrt q10"},{n:"idx",f:"*/ q11 w q7"},{n:"maxAdj3",f:"*/ 100000 idx ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"ah",f:"*/ ss a3 100000"},{n:"y3",f:"+- hR th 0"},{n:"q2",f:"*/ w w 1"},{n:"q3",f:"*/ ah ah 1"},{n:"q4",f:"+- q2 0 q3"},{n:"q5",f:"sqrt q4"},{n:"dy",f:"*/ q5 hR w"},{n:"y5",f:"+- hR dy 0"},{n:"y7",f:"+- y3 dy 0"},{n:"q6",f:"+- aw 0 th"},{n:"dh",f:"*/ q6 1 2"},{n:"y4",f:"+- y5 0 dh"},{n:"y8",f:"+- y7 dh 0"},{n:"aw2",f:"*/ aw 1 2"},{n:"y6",f:"+- b 0 aw2"},{n:"x1",f:"+- l ah 0"},{n:"swAng",f:"at2 ah dy"},{n:"mswAng",f:"+- 0 0 swAng"},{n:"ix",f:"+- l idx 0"},{n:"iy",f:"+/ hR y3 2"},{n:"q12",f:"*/ th 1 2"},{n:"dang2",f:"at2 idx q12"},{n:"swAng2",f:"+- dang2 0 swAng"},{n:"swAng3",f:"+- swAng dang2 0"},{n:"stAng3",f:"+- 0 0 dang2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y6"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y5"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"swAng",swAng:"swAng2"},{type:"arcTo",wR:"w",hR:"hR",stAng:"stAng3",swAng:"swAng3"},{type:"lnTo",pt:{x:"x1",y:"y8"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"r",y:"y3"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"0",swAng:"-5400000"},{type:"lnTo",pt:{x:"l",y:"t"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"3cd4",swAng:"cd4"},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"r",y:"y3"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"0",swAng:"-5400000"},{type:"lnTo",pt:{x:"l",y:"t"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y3"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"0",swAng:"swAng"},{type:"lnTo",pt:{x:"x1",y:"y8"}},{type:"lnTo",pt:{x:"l",y:"y6"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y5"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"swAng",swAng:"swAng2"}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedRightArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 h ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"a1",f:"pin 0 adj1 a2"},{n:"th",f:"*/ ss a1 100000"},{n:"aw",f:"*/ ss a2 100000"},{n:"q1",f:"+/ th aw 4"},{n:"hR",f:"+- hd2 0 q1"},{n:"q7",f:"*/ hR 2 1"},{n:"q8",f:"*/ q7 q7 1"},{n:"q9",f:"*/ th th 1"},{n:"q10",f:"+- q8 0 q9"},{n:"q11",f:"sqrt q10"},{n:"idx",f:"*/ q11 w q7"},{n:"maxAdj3",f:"*/ 100000 idx ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"ah",f:"*/ ss a3 100000"},{n:"y3",f:"+- hR th 0"},{n:"q2",f:"*/ w w 1"},{n:"q3",f:"*/ ah ah 1"},{n:"q4",f:"+- q2 0 q3"},{n:"q5",f:"sqrt q4"},{n:"dy",f:"*/ q5 hR w"},{n:"y5",f:"+- hR dy 0"},{n:"y7",f:"+- y3 dy 0"},{n:"q6",f:"+- aw 0 th"},{n:"dh",f:"*/ q6 1 2"},{n:"y4",f:"+- y5 0 dh"},{n:"y8",f:"+- y7 dh 0"},{n:"aw2",f:"*/ aw 1 2"},{n:"y6",f:"+- b 0 aw2"},{n:"x1",f:"+- r 0 ah"},{n:"swAng",f:"at2 ah dy"},{n:"stAng",f:"+- cd2 0 swAng"},{n:"mswAng",f:"+- 0 0 swAng"},{n:"ix",f:"+- r 0 idx"},{n:"iy",f:"+/ hR y3 2"},{n:"q12",f:"*/ th 1 2"},{n:"dang2",f:"at2 idx q12"},{n:"swAng2",f:"+- dang2 0 cd4"},{n:"swAng3",f:"+- cd4 dang2 0"},{n:"stAng3",f:"+- cd2 0 dang2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"hR"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"cd2",swAng:"mswAng"},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"r",y:"y6"}},{type:"lnTo",pt:{x:"x1",y:"y8"}},{type:"lnTo",pt:{x:"x1",y:"y7"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"stAng",swAng:"swAng"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"r",y:"th"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"3cd4",swAng:"swAng2"},{type:"arcTo",wR:"w",hR:"hR",stAng:"stAng3",swAng:"swAng3"},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"hR"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"cd2",swAng:"mswAng"},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"r",y:"y6"}},{type:"lnTo",pt:{x:"x1",y:"y8"}},{type:"lnTo",pt:{x:"x1",y:"y7"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"stAng",swAng:"swAng"},{type:"lnTo",pt:{x:"l",y:"hR"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"th"}},{type:"arcTo",wR:"w",hR:"hR",stAng:"3cd4",swAng:"swAng2"}],fill:"none",extrusionOk:!1,stroke:!0}]},curvedUpArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 w ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"a1",f:"pin 0 adj1 100000"},{n:"th",f:"*/ ss a1 100000"},{n:"aw",f:"*/ ss a2 100000"},{n:"q1",f:"+/ th aw 4"},{n:"wR",f:"+- wd2 0 q1"},{n:"q7",f:"*/ wR 2 1"},{n:"q8",f:"*/ q7 q7 1"},{n:"q9",f:"*/ th th 1"},{n:"q10",f:"+- q8 0 q9"},{n:"q11",f:"sqrt q10"},{n:"idy",f:"*/ q11 h q7"},{n:"maxAdj3",f:"*/ 100000 idy ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"ah",f:"*/ ss adj3 100000"},{n:"x3",f:"+- wR th 0"},{n:"q2",f:"*/ h h 1"},{n:"q3",f:"*/ ah ah 1"},{n:"q4",f:"+- q2 0 q3"},{n:"q5",f:"sqrt q4"},{n:"dx",f:"*/ q5 wR h"},{n:"x5",f:"+- wR dx 0"},{n:"x7",f:"+- x3 dx 0"},{n:"q6",f:"+- aw 0 th"},{n:"dh",f:"*/ q6 1 2"},{n:"x4",f:"+- x5 0 dh"},{n:"x8",f:"+- x7 dh 0"},{n:"aw2",f:"*/ aw 1 2"},{n:"x6",f:"+- r 0 aw2"},{n:"y1",f:"+- t ah 0"},{n:"swAng",f:"at2 ah dx"},{n:"mswAng",f:"+- 0 0 swAng"},{n:"iy",f:"+- t idy 0"},{n:"ix",f:"+/ wR x3 2"},{n:"q12",f:"*/ th 1 2"},{n:"dang2",f:"at2 idy q12"},{n:"swAng2",f:"+- dang2 0 swAng"},{n:"mswAng2",f:"+- 0 0 swAng2"},{n:"stAng3",f:"+- cd4 0 swAng"},{n:"swAng3",f:"+- swAng dang2 0"},{n:"stAng2",f:"+- cd4 0 dang2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x6",y:"t"}},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"lnTo",pt:{x:"x7",y:"y1"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng3",swAng:"swAng3"},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng2",swAng:"swAng2"},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"wR",y:"b"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"th",y:"t"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"cd2",swAng:"-5400000"},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"ix",y:"iy"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng2",swAng:"swAng2"},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x6",y:"t"}},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"lnTo",pt:{x:"x7",y:"y1"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"stAng3",swAng:"swAng"},{type:"lnTo",pt:{x:"wR",y:"b"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"th",y:"t"}},{type:"arcTo",wR:"wR",hR:"h",stAng:"cd2",swAng:"-5400000"}],fill:"none",extrusionOk:!1,stroke:!0}]},decagon:{avLst:[{n:"vf",f:"val 105146"}],gdLst:[{n:"shd2",f:"*/ hd2 vf 100000"},{n:"dx1",f:"cos wd2 2160000"},{n:"dx2",f:"cos wd2 4320000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"dy1",f:"sin shd2 4320000"},{n:"dy2",f:"sin shd2 2160000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"},{n:"y4",f:"+- vc dy1 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},diagStripe:{avLst:[{n:"adj",f:"val 50000"}],gdLst:[{n:"a",f:"pin 0 adj 100000"},{n:"x2",f:"*/ w a 100000"},{n:"x1",f:"*/ x2 1 2"},{n:"x3",f:"+/ x2 r 2"},{n:"y2",f:"*/ h a 100000"},{n:"y1",f:"*/ y2 1 2"},{n:"y3",f:"+/ y2 b 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},diamond:{gdLst:[{n:"ir",f:"*/ w 3 4"},{n:"ib",f:"*/ h 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},dodecagon:{gdLst:[{n:"x1",f:"*/ w 2894 21600"},{n:"x2",f:"*/ w 7906 21600"},{n:"x3",f:"*/ w 13694 21600"},{n:"x4",f:"*/ w 18706 21600"},{n:"y1",f:"*/ h 2894 21600"},{n:"y2",f:"*/ h 7906 21600"},{n:"y3",f:"*/ h 13694 21600"},{n:"y4",f:"*/ h 18706 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"y3"}},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"lnTo",pt:{x:"x3",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"l",y:"y3"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},donut:{avLst:[{n:"adj",f:"val 25000"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dr",f:"*/ ss a 100000"},{n:"iwd2",f:"+- wd2 0 dr"},{n:"ihd2",f:"+- hd2 0 dr"},{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"},{type:"moveTo",pt:{x:"dr",y:"vc"}},{type:"arcTo",wR:"iwd2",hR:"ihd2",stAng:"cd2",swAng:"-5400000"},{type:"arcTo",wR:"iwd2",hR:"ihd2",stAng:"cd4",swAng:"-5400000"},{type:"arcTo",wR:"iwd2",hR:"ihd2",stAng:"0",swAng:"-5400000"},{type:"arcTo",wR:"iwd2",hR:"ihd2",stAng:"3cd4",swAng:"-5400000"},{type:"close"}],extrusionOk:!1,stroke:!0}]},doubleWave:{avLst:[{n:"adj1",f:"val 6250"},{n:"adj2",f:"val 0"}],gdLst:[{n:"a1",f:"pin 0 adj1 12500"},{n:"a2",f:"pin -10000 adj2 10000"},{n:"y1",f:"*/ h a1 100000"},{n:"dy2",f:"*/ y1 10 3"},{n:"y2",f:"+- y1 0 dy2"},{n:"y3",f:"+- y1 dy2 0"},{n:"y4",f:"+- b 0 y1"},{n:"y5",f:"+- y4 0 dy2"},{n:"y6",f:"+- y4 dy2 0"},{n:"dx1",f:"*/ w a2 100000"},{n:"of2",f:"*/ w a2 50000"},{n:"x1",f:"abs dx1"},{n:"dx2",f:"?: of2 0 of2"},{n:"x2",f:"+- l 0 dx2"},{n:"dx8",f:"?: of2 of2 0"},{n:"x8",f:"+- r 0 dx8"},{n:"dx3",f:"+/ dx2 x8 6"},{n:"x3",f:"+- x2 dx3 0"},{n:"dx4",f:"+/ dx2 x8 3"},{n:"x4",f:"+- x2 dx4 0"},{n:"x5",f:"+/ x2 x8 2"},{n:"x6",f:"+- x5 dx3 0"},{n:"x7",f:"+/ x6 x8 2"},{n:"x9",f:"+- l dx8 0"},{n:"x15",f:"+- r dx2 0"},{n:"x10",f:"+- x9 dx3 0"},{n:"x11",f:"+- x9 dx4 0"},{n:"x12",f:"+/ x9 x15 2"},{n:"x13",f:"+- x12 dx3 0"},{n:"x14",f:"+/ x13 x15 2"},{n:"x16",f:"+- r 0 x1"},{n:"xAdj",f:"+- hc dx1 0"},{n:"il",f:"max x2 x9"},{n:"ir",f:"min x8 x15"},{n:"it",f:"*/ h a1 50000"},{n:"ib",f:"+- b 0 it"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x2",y:"y1"}},{type:"cubicBezTo",pts:[{x:"x3",y:"y2"},{x:"x4",y:"y3"},{x:"x5",y:"y1"}]},{type:"cubicBezTo",pts:[{x:"x6",y:"y2"},{x:"x7",y:"y3"},{x:"x8",y:"y1"}]},{type:"lnTo",pt:{x:"x15",y:"y4"}},{type:"cubicBezTo",pts:[{x:"x14",y:"y6"},{x:"x13",y:"y5"},{x:"x12",y:"y4"}]},{type:"cubicBezTo",pts:[{x:"x11",y:"y6"},{x:"x10",y:"y5"},{x:"x9",y:"y4"}]},{type:"close"}],extrusionOk:!1,stroke:!0}]},downArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 100000 h ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"dy1",f:"*/ ss a2 100000"},{n:"y1",f:"+- b 0 dy1"},{n:"dx1",f:"*/ w a1 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc dx1 0"},{n:"dy2",f:"*/ x1 dy1 wd2"},{n:"y2",f:"+- y1 dy2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},downArrowCallout:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 64977"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 w ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"*/ 100000 h ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q2",f:"*/ a3 ss h"},{n:"maxAdj4",f:"+- 100000 0 q2"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"dx1",f:"*/ ss a2 100000"},{n:"dx2",f:"*/ ss a1 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"dy3",f:"*/ ss a3 100000"},{n:"y3",f:"+- b 0 dy3"},{n:"y2",f:"*/ h a4 100000"},{n:"y1",f:"*/ y2 1 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},ellipse:{gdLst:[{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},ellipseRibbon:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 12500"}],gdLst:[{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 25000 adj2 75000"},{n:"q10",f:"+- 100000 0 a1"},{n:"q11",f:"*/ q10 1 2"},{n:"q12",f:"+- a1 0 q11"},{n:"minAdj3",f:"max 0 q12"},{n:"a3",f:"pin minAdj3 adj3 a1"},{n:"dx2",f:"*/ w a2 200000"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- x2 wd8 0"},{n:"x4",f:"+- r 0 x3"},{n:"x5",f:"+- r 0 x2"},{n:"x6",f:"+- r 0 wd8"},{n:"dy1",f:"*/ h a3 100000"},{n:"f1",f:"*/ 4 dy1 w"},{n:"q1",f:"*/ x3 x3 w"},{n:"q2",f:"+- x3 0 q1"},{n:"y1",f:"*/ f1 q2 1"},{n:"cx1",f:"*/ x3 1 2"},{n:"cy1",f:"*/ f1 cx1 1"},{n:"cx2",f:"+- r 0 cx1"},{n:"q1",f:"*/ h a1 100000"},{n:"dy3",f:"+- q1 0 dy1"},{n:"q3",f:"*/ x2 x2 w"},{n:"q4",f:"+- x2 0 q3"},{n:"q5",f:"*/ f1 q4 1"},{n:"y3",f:"+- q5 dy3 0"},{n:"q6",f:"+- dy1 dy3 y3"},{n:"q7",f:"+- q6 dy1 0"},{n:"cy3",f:"+- q7 dy3 0"},{n:"rh",f:"+- b 0 q1"},{n:"q8",f:"*/ dy1 14 16"},{n:"y2",f:"+/ q8 rh 2"},{n:"y5",f:"+- q5 rh 0"},{n:"y6",f:"+- y3 rh 0"},{n:"cx4",f:"*/ x2 1 2"},{n:"q9",f:"*/ f1 cx4 1"},{n:"cy4",f:"+- q9 rh 0"},{n:"cx5",f:"+- r 0 cx4"},{n:"cy6",f:"+- cy3 rh 0"},{n:"y7",f:"+- y1 dy3 0"},{n:"cy7",f:"+- q1 q1 y7"},{n:"y8",f:"+- b 0 dy1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"quadBezTo",pts:[{x:"cx1",y:"cy1"},{x:"x3",y:"y1"}]},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy3"},{x:"x5",y:"y3"}]},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"quadBezTo",pts:[{x:"cx2",y:"cy1"},{x:"r",y:"t"}]},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"rh"}},{type:"quadBezTo",pts:[{x:"cx5",y:"cy4"},{x:"x5",y:"y5"}]},{type:"lnTo",pt:{x:"x5",y:"y6"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy6"},{x:"x2",y:"y6"}]},{type:"lnTo",pt:{x:"x2",y:"y5"}},{type:"quadBezTo",pts:[{x:"cx4",y:"cy4"},{x:"l",y:"rh"}]},{type:"lnTo",pt:{x:"wd8",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x3",y:"y7"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy3"},{x:"x5",y:"y3"}]},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"y7"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy7"},{x:"x3",y:"y7"}]},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"quadBezTo",pts:[{x:"cx1",y:"cy1"},{x:"x3",y:"y1"}]},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy3"},{x:"x5",y:"y3"}]},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"quadBezTo",pts:[{x:"cx2",y:"cy1"},{x:"r",y:"t"}]},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"rh"}},{type:"quadBezTo",pts:[{x:"cx5",y:"cy4"},{x:"x5",y:"y5"}]},{type:"lnTo",pt:{x:"x5",y:"y6"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy6"},{x:"x2",y:"y6"}]},{type:"lnTo",pt:{x:"x2",y:"y5"}},{type:"quadBezTo",pts:[{x:"cx4",y:"cy4"},{x:"l",y:"rh"}]},{type:"lnTo",pt:{x:"wd8",y:"y2"}},{type:"close"},{type:"moveTo",pt:{x:"x2",y:"y5"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"moveTo",pt:{x:"x5",y:"y3"}},{type:"lnTo",pt:{x:"x5",y:"y5"}},{type:"moveTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y7"}},{type:"moveTo",pt:{x:"x4",y:"y7"}},{type:"lnTo",pt:{x:"x4",y:"y1"}}],fill:"none",extrusionOk:!1,stroke:!0}]},ellipseRibbon2:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 12500"}],gdLst:[{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 25000 adj2 75000"},{n:"q10",f:"+- 100000 0 a1"},{n:"q11",f:"*/ q10 1 2"},{n:"q12",f:"+- a1 0 q11"},{n:"minAdj3",f:"max 0 q12"},{n:"a3",f:"pin minAdj3 adj3 a1"},{n:"dx2",f:"*/ w a2 200000"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- x2 wd8 0"},{n:"x4",f:"+- r 0 x3"},{n:"x5",f:"+- r 0 x2"},{n:"x6",f:"+- r 0 wd8"},{n:"dy1",f:"*/ h a3 100000"},{n:"f1",f:"*/ 4 dy1 w"},{n:"q1",f:"*/ x3 x3 w"},{n:"q2",f:"+- x3 0 q1"},{n:"u1",f:"*/ f1 q2 1"},{n:"y1",f:"+- b 0 u1"},{n:"cx1",f:"*/ x3 1 2"},{n:"cu1",f:"*/ f1 cx1 1"},{n:"cy1",f:"+- b 0 cu1"},{n:"cx2",f:"+- r 0 cx1"},{n:"q1",f:"*/ h a1 100000"},{n:"dy3",f:"+- q1 0 dy1"},{n:"q3",f:"*/ x2 x2 w"},{n:"q4",f:"+- x2 0 q3"},{n:"q5",f:"*/ f1 q4 1"},{n:"u3",f:"+- q5 dy3 0"},{n:"y3",f:"+- b 0 u3"},{n:"q6",f:"+- dy1 dy3 u3"},{n:"q7",f:"+- q6 dy1 0"},{n:"cu3",f:"+- q7 dy3 0"},{n:"cy3",f:"+- b 0 cu3"},{n:"rh",f:"+- b 0 q1"},{n:"q8",f:"*/ dy1 14 16"},{n:"u2",f:"+/ q8 rh 2"},{n:"y2",f:"+- b 0 u2"},{n:"u5",f:"+- q5 rh 0"},{n:"y5",f:"+- b 0 u5"},{n:"u6",f:"+- u3 rh 0"},{n:"y6",f:"+- b 0 u6"},{n:"cx4",f:"*/ x2 1 2"},{n:"q9",f:"*/ f1 cx4 1"},{n:"cu4",f:"+- q9 rh 0"},{n:"cy4",f:"+- b 0 cu4"},{n:"cx5",f:"+- r 0 cx4"},{n:"cu6",f:"+- cu3 rh 0"},{n:"cy6",f:"+- b 0 cu6"},{n:"u7",f:"+- u1 dy3 0"},{n:"y7",f:"+- b 0 u7"},{n:"cu7",f:"+- q1 q1 u7"},{n:"cy7",f:"+- b 0 cu7"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"quadBezTo",pts:[{x:"cx1",y:"cy1"},{x:"x3",y:"y1"}]},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy3"},{x:"x5",y:"y3"}]},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"quadBezTo",pts:[{x:"cx2",y:"cy1"},{x:"r",y:"b"}]},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"q1"}},{type:"quadBezTo",pts:[{x:"cx5",y:"cy4"},{x:"x5",y:"y5"}]},{type:"lnTo",pt:{x:"x5",y:"y6"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy6"},{x:"x2",y:"y6"}]},{type:"lnTo",pt:{x:"x2",y:"y5"}},{type:"quadBezTo",pts:[{x:"cx4",y:"cy4"},{x:"l",y:"q1"}]},{type:"lnTo",pt:{x:"wd8",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x3",y:"y7"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy3"},{x:"x5",y:"y3"}]},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"y7"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy7"},{x:"x3",y:"y7"}]},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"wd8",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"q1"}},{type:"quadBezTo",pts:[{x:"cx4",y:"cy4"},{x:"x2",y:"y5"}]},{type:"lnTo",pt:{x:"x2",y:"y6"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy6"},{x:"x5",y:"y6"}]},{type:"lnTo",pt:{x:"x5",y:"y5"}},{type:"quadBezTo",pts:[{x:"cx5",y:"cy4"},{x:"r",y:"q1"}]},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"quadBezTo",pts:[{x:"cx2",y:"cy1"},{x:"x4",y:"y1"}]},{type:"lnTo",pt:{x:"x5",y:"y3"}},{type:"quadBezTo",pts:[{x:"hc",y:"cy3"},{x:"x2",y:"y3"}]},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"quadBezTo",pts:[{x:"cx1",y:"cy1"},{x:"l",y:"b"}]},{type:"close"},{type:"moveTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"x2",y:"y5"}},{type:"moveTo",pt:{x:"x5",y:"y5"}},{type:"lnTo",pt:{x:"x5",y:"y3"}},{type:"moveTo",pt:{x:"x3",y:"y7"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"moveTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x4",y:"y7"}}],fill:"none",extrusionOk:!1,stroke:!0}]},flowChartAlternateProcess:{gdLst:[{n:"x2",f:"+- r 0 ssd6"},{n:"y2",f:"+- b 0 ssd6"},{n:"il",f:"*/ ssd6 29289 100000"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"ssd6"}},{type:"arcTo",wR:"ssd6",hR:"ssd6",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"arcTo",wR:"ssd6",hR:"ssd6",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"arcTo",wR:"ssd6",hR:"ssd6",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"ssd6",y:"b"}},{type:"arcTo",wR:"ssd6",hR:"ssd6",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},flowChartCollate:{gdLst:[{n:"ir",f:"*/ w 3 4"},{n:"ib",f:"*/ h 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"2",y:"0"}},{type:"lnTo",pt:{x:"1",y:"1"}},{type:"lnTo",pt:{x:"2",y:"2"}},{type:"lnTo",pt:{x:"0",y:"2"}},{type:"lnTo",pt:{x:"1",y:"1"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:2,h:2}]},flowChartConnector:{gdLst:[{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},flowChartDecision:{gdLst:[{n:"ir",f:"*/ w 3 4"},{n:"ib",f:"*/ h 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"2",y:"1"}},{type:"lnTo",pt:{x:"1",y:"2"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:2,h:2}]},flowChartDelay:{gdLst:[{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},flowChartDisplay:{gdLst:[{n:"x2",f:"*/ w 5 6"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"3"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"5",y:"0"}},{type:"arcTo",wR:"1",hR:"3",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"1",y:"6"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:6,h:6}]},flowChartDocument:{gdLst:[{n:"y1",f:"*/ h 17322 21600"},{n:"y2",f:"*/ h 20172 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"21600",y:"0"}},{type:"lnTo",pt:{x:"21600",y:"17322"}},{type:"cubicBezTo",pts:[{x:"10800",y:"17322"},{x:"10800",y:"23922"},{x:"0",y:"20172"}]},{type:"close"}],extrusionOk:!1,stroke:!0,w:21600,h:21600}]},flowChartExtract:{gdLst:[{n:"x2",f:"*/ w 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"2"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"2",y:"2"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:2,h:2}]},flowChartInputOutput:{gdLst:[{n:"x3",f:"*/ w 2 5"},{n:"x4",f:"*/ w 3 5"},{n:"x5",f:"*/ w 4 5"},{n:"x6",f:"*/ w 9 10"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"5"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"5",y:"0"}},{type:"lnTo",pt:{x:"4",y:"5"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:5,h:5}]},flowChartInternalStorage:{pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"1",y:"1"}},{type:"lnTo",pt:{x:"0",y:"1"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:1,h:1},{defines:[{type:"moveTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"1",y:"8"}},{type:"moveTo",pt:{x:"0",y:"1"}},{type:"lnTo",pt:{x:"8",y:"1"}}],fill:"none",extrusionOk:!1,stroke:!0,w:8,h:8},{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"1",y:"1"}},{type:"lnTo",pt:{x:"0",y:"1"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0,w:1,h:1}]},flowChartMagneticDisk:{gdLst:[{n:"y3",f:"*/ h 5 6"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"arcTo",wR:"3",hR:"1",stAng:"cd2",swAng:"cd2"},{type:"lnTo",pt:{x:"6",y:"5"}},{type:"arcTo",wR:"3",hR:"1",stAng:"0",swAng:"cd2"},{type:"close"}],extrusionOk:!1,stroke:!1,w:6,h:6},{defines:[{type:"moveTo",pt:{x:"6",y:"1"}},{type:"arcTo",wR:"3",hR:"1",stAng:"0",swAng:"cd2"}],fill:"none",extrusionOk:!1,stroke:!0,w:6,h:6},{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"arcTo",wR:"3",hR:"1",stAng:"cd2",swAng:"cd2"},{type:"lnTo",pt:{x:"6",y:"5"}},{type:"arcTo",wR:"3",hR:"1",stAng:"0",swAng:"cd2"},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0,w:6,h:6}]},flowChartMagneticDrum:{gdLst:[{n:"x2",f:"*/ w 2 3"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"5",y:"0"}},{type:"arcTo",wR:"1",hR:"3",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"1",y:"6"}},{type:"arcTo",wR:"1",hR:"3",stAng:"cd4",swAng:"cd2"},{type:"close"}],extrusionOk:!1,stroke:!1,w:6,h:6},{defines:[{type:"moveTo",pt:{x:"5",y:"6"}},{type:"arcTo",wR:"1",hR:"3",stAng:"cd4",swAng:"cd2"}],fill:"none",extrusionOk:!1,stroke:!0,w:6,h:6},{defines:[{type:"moveTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"5",y:"0"}},{type:"arcTo",wR:"1",hR:"3",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"1",y:"6"}},{type:"arcTo",wR:"1",hR:"3",stAng:"cd4",swAng:"cd2"},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0,w:6,h:6}]},flowChartMagneticTape:{gdLst:[{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"},{n:"ang1",f:"at2 w h"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"hc",y:"b"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"ang1"},{type:"lnTo",pt:{x:"r",y:"ib"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},flowChartManualInput:{pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"lnTo",pt:{x:"5",y:"0"}},{type:"lnTo",pt:{x:"5",y:"5"}},{type:"lnTo",pt:{x:"0",y:"5"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:5,h:5}]},flowChartManualOperation:{gdLst:[{n:"x3",f:"*/ w 4 5"},{n:"x4",f:"*/ w 9 10"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"5",y:"0"}},{type:"lnTo",pt:{x:"4",y:"5"}},{type:"lnTo",pt:{x:"1",y:"5"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:5,h:5}]},flowChartMerge:{gdLst:[{n:"x2",f:"*/ w 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"2",y:"0"}},{type:"lnTo",pt:{x:"1",y:"2"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:2,h:2}]},flowChartMultidocument:{gdLst:[{n:"y2",f:"*/ h 3675 21600"},{n:"y8",f:"*/ h 20782 21600"},{n:"x3",f:"*/ w 9298 21600"},{n:"x4",f:"*/ w 12286 21600"},{n:"x5",f:"*/ w 18595 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"20782"}},{type:"cubicBezTo",pts:[{x:"9298",y:"23542"},{x:"9298",y:"18022"},{x:"18595",y:"18022"}]},{type:"lnTo",pt:{x:"18595",y:"3675"}},{type:"lnTo",pt:{x:"0",y:"3675"}},{type:"close"},{type:"moveTo",pt:{x:"1532",y:"3675"}},{type:"lnTo",pt:{x:"1532",y:"1815"}},{type:"lnTo",pt:{x:"20000",y:"1815"}},{type:"lnTo",pt:{x:"20000",y:"16252"}},{type:"cubicBezTo",pts:[{x:"19298",y:"16252"},{x:"18595",y:"16352"},{x:"18595",y:"16352"}]},{type:"lnTo",pt:{x:"18595",y:"3675"}},{type:"close"},{type:"moveTo",pt:{x:"2972",y:"1815"}},{type:"lnTo",pt:{x:"2972",y:"0"}},{type:"lnTo",pt:{x:"21600",y:"0"}},{type:"lnTo",pt:{x:"21600",y:"14392"}},{type:"cubicBezTo",pts:[{x:"20800",y:"14392"},{x:"20000",y:"14467"},{x:"20000",y:"14467"}]},{type:"lnTo",pt:{x:"20000",y:"1815"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:21600,h:21600},{defines:[{type:"moveTo",pt:{x:"0",y:"3675"}},{type:"lnTo",pt:{x:"18595",y:"3675"}},{type:"lnTo",pt:{x:"18595",y:"18022"}},{type:"cubicBezTo",pts:[{x:"9298",y:"18022"},{x:"9298",y:"23542"},{x:"0",y:"20782"}]},{type:"close"},{type:"moveTo",pt:{x:"1532",y:"3675"}},{type:"lnTo",pt:{x:"1532",y:"1815"}},{type:"lnTo",pt:{x:"20000",y:"1815"}},{type:"lnTo",pt:{x:"20000",y:"16252"}},{type:"cubicBezTo",pts:[{x:"19298",y:"16252"},{x:"18595",y:"16352"},{x:"18595",y:"16352"}]},{type:"moveTo",pt:{x:"2972",y:"1815"}},{type:"lnTo",pt:{x:"2972",y:"0"}},{type:"lnTo",pt:{x:"21600",y:"0"}},{type:"lnTo",pt:{x:"21600",y:"14392"}},{type:"cubicBezTo",pts:[{x:"20800",y:"14392"},{x:"20000",y:"14467"},{x:"20000",y:"14467"}]}],fill:"none",extrusionOk:!1,stroke:!0,w:21600,h:21600},{defines:[{type:"moveTo",pt:{x:"0",y:"20782"}},{type:"cubicBezTo",pts:[{x:"9298",y:"23542"},{x:"9298",y:"18022"},{x:"18595",y:"18022"}]},{type:"lnTo",pt:{x:"18595",y:"16352"}},{type:"cubicBezTo",pts:[{x:"18595",y:"16352"},{x:"19298",y:"16252"},{x:"20000",y:"16252"}]},{type:"lnTo",pt:{x:"20000",y:"14467"}},{type:"cubicBezTo",pts:[{x:"20000",y:"14467"},{x:"20800",y:"14392"},{x:"21600",y:"14392"}]},{type:"lnTo",pt:{x:"21600",y:"0"}},{type:"lnTo",pt:{x:"2972",y:"0"}},{type:"lnTo",pt:{x:"2972",y:"1815"}},{type:"lnTo",pt:{x:"1532",y:"1815"}},{type:"lnTo",pt:{x:"1532",y:"3675"}},{type:"lnTo",pt:{x:"0",y:"3675"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!1,w:21600,h:21600}]},flowChartOfflineStorage:{gdLst:[{n:"x4",f:"*/ w 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"2",y:"0"}},{type:"lnTo",pt:{x:"1",y:"2"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:2,h:2},{defines:[{type:"moveTo",pt:{x:"2",y:"4"}},{type:"lnTo",pt:{x:"3",y:"4"}}],fill:"none",extrusionOk:!1,stroke:!0,w:5,h:5},{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"2",y:"0"}},{type:"lnTo",pt:{x:"1",y:"2"}},{type:"close"}],fill:"none",extrusionOk:!0,stroke:!0,w:2,h:2}]},flowChartOffpageConnector:{gdLst:[{n:"y1",f:"*/ h 4 5"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"10",y:"0"}},{type:"lnTo",pt:{x:"10",y:"8"}},{type:"lnTo",pt:{x:"5",y:"10"}},{type:"lnTo",pt:{x:"0",y:"8"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:10,h:10}]},flowChartOnlineStorage:{gdLst:[{n:"x2",f:"*/ w 5 6"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"6",y:"0"}},{type:"arcTo",wR:"1",hR:"3",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"1",y:"6"}},{type:"arcTo",wR:"1",hR:"3",stAng:"cd4",swAng:"cd2"},{type:"close"}],extrusionOk:!1,stroke:!0,w:6,h:6}]},flowChartOr:{gdLst:[{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"r",y:"vc"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},flowChartPredefinedProcess:{gdLst:[{n:"x2",f:"*/ w 7 8"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"1",y:"1"}},{type:"lnTo",pt:{x:"0",y:"1"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:1,h:1},{defines:[{type:"moveTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"1",y:"8"}},{type:"moveTo",pt:{x:"7",y:"0"}},{type:"lnTo",pt:{x:"7",y:"8"}}],fill:"none",extrusionOk:!1,stroke:!0,w:8,h:8},{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"1",y:"1"}},{type:"lnTo",pt:{x:"0",y:"1"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0,w:1,h:1}]},flowChartPreparation:{gdLst:[{n:"x2",f:"*/ w 4 5"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"5"}},{type:"lnTo",pt:{x:"2",y:"0"}},{type:"lnTo",pt:{x:"8",y:"0"}},{type:"lnTo",pt:{x:"10",y:"5"}},{type:"lnTo",pt:{x:"8",y:"10"}},{type:"lnTo",pt:{x:"2",y:"10"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:10,h:10}]},flowChartProcess:{pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"0"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"1",y:"1"}},{type:"lnTo",pt:{x:"0",y:"1"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:1,h:1}]},flowChartPunchedCard:{pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"5",y:"0"}},{type:"lnTo",pt:{x:"5",y:"5"}},{type:"lnTo",pt:{x:"0",y:"5"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:5,h:5}]},flowChartPunchedTape:{gdLst:[{n:"y2",f:"*/ h 9 10"},{n:"ib",f:"*/ h 4 5"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"2"}},{type:"arcTo",wR:"5",hR:"2",stAng:"cd2",swAng:"-10800000"},{type:"arcTo",wR:"5",hR:"2",stAng:"cd2",swAng:"cd2"},{type:"lnTo",pt:{x:"20",y:"18"}},{type:"arcTo",wR:"5",hR:"2",stAng:"0",swAng:"-10800000"},{type:"arcTo",wR:"5",hR:"2",stAng:"0",swAng:"cd2"},{type:"close"}],extrusionOk:!1,stroke:!0,w:20,h:20}]},flowChartSort:{gdLst:[{n:"ir",f:"*/ w 3 4"},{n:"ib",f:"*/ h 3 4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"2",y:"1"}},{type:"lnTo",pt:{x:"1",y:"2"}},{type:"close"}],extrusionOk:!1,stroke:!1,w:2,h:2},{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"lnTo",pt:{x:"2",y:"1"}}],fill:"none",extrusionOk:!1,stroke:!0,w:2,h:2},{defines:[{type:"moveTo",pt:{x:"0",y:"1"}},{type:"lnTo",pt:{x:"1",y:"0"}},{type:"lnTo",pt:{x:"2",y:"1"}},{type:"lnTo",pt:{x:"1",y:"2"}},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0,w:2,h:2}]},flowChartSummingJunction:{gdLst:[{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"il",y:"it"}},{type:"lnTo",pt:{x:"ir",y:"ib"}},{type:"moveTo",pt:{x:"ir",y:"it"}},{type:"lnTo",pt:{x:"il",y:"ib"}}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},flowChartTerminator:{gdLst:[{n:"il",f:"*/ w 1018 21600"},{n:"ir",f:"*/ w 20582 21600"},{n:"it",f:"*/ h 3163 21600"},{n:"ib",f:"*/ h 18437 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"3475",y:"0"}},{type:"lnTo",pt:{x:"18125",y:"0"}},{type:"arcTo",wR:"3475",hR:"10800",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"3475",y:"21600"}},{type:"arcTo",wR:"3475",hR:"10800",stAng:"cd4",swAng:"cd2"},{type:"close"}],extrusionOk:!1,stroke:!0,w:21600,h:21600}]},foldedCorner:{avLst:[{n:"adj",f:"val 16667"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dy2",f:"*/ ss a 100000"},{n:"dy1",f:"*/ dy2 1 5"},{n:"x1",f:"+- r 0 dy2"},{n:"x2",f:"+- x1 dy1 0"},{n:"y2",f:"+- b 0 dy2"},{n:"y1",f:"+- y2 dy1 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y2"}}],fill:"none",extrusionOk:!1,stroke:!0}]},frame:{avLst:[{n:"adj1",f:"val 12500"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"x1",f:"*/ ss a1 100000"},{n:"x4",f:"+- r 0 x1"},{n:"y4",f:"+- b 0 x1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"},{type:"moveTo",pt:{x:"x1",y:"x1"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"x1"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},funnel:{gdLst:[{n:"d",f:"*/ ss 1 20"},{n:"rw2",f:"+- wd2 0 d"},{n:"rh2",f:"+- hd4 0 d"},{n:"t1",f:"cos wd2 480000"},{n:"t2",f:"sin hd4 480000"},{n:"da",f:"at2 t1 t2"},{n:"2da",f:"*/ da 2 1"},{n:"stAng1",f:"+- cd2 0 da"},{n:"swAng1",f:"+- cd2 2da 0"},{n:"swAng3",f:"+- cd2 0 2da"},{n:"rw3",f:"*/ wd2 1 4"},{n:"rh3",f:"*/ hd4 1 4"},{n:"ct1",f:"cos hd4 stAng1"},{n:"st1",f:"sin wd2 stAng1"},{n:"m1",f:"mod ct1 st1 0"},{n:"n1",f:"*/ wd2 hd4 m1"},{n:"dx1",f:"cos n1 stAng1"},{n:"dy1",f:"sin n1 stAng1"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- hd4 dy1 0"},{n:"ct3",f:"cos rh3 da"},{n:"st3",f:"sin rw3 da"},{n:"m3",f:"mod ct3 st3 0"},{n:"n3",f:"*/ rw3 rh3 m3"},{n:"dx3",f:"cos n3 da"},{n:"dy3",f:"sin n3 da"},{n:"x3",f:"+- hc dx3 0"},{n:"vc3",f:"+- b 0 rh3"},{n:"y2",f:"+- vc3 dy3 0"},{n:"x2",f:"+- wd2 0 rw2"},{n:"cd",f:"*/ cd2 2 1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"hd4",stAng:"stAng1",swAng:"swAng1"},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"arcTo",wR:"rw3",hR:"rh3",stAng:"da",swAng:"swAng3"},{type:"close"},{type:"moveTo",pt:{x:"x2",y:"hd4"}},{type:"arcTo",wR:"rw2",hR:"rh2",stAng:"cd2",swAng:"-21600000"},{type:"close"}],extrusionOk:!1,stroke:!0}]},gear6:{avLst:[{n:"adj1",f:"val 15000"},{n:"adj2",f:"val 3526"}],gdLst:[{n:"a1",f:"pin 0 adj1 20000"},{n:"a2",f:"pin 0 adj2 5358"},{n:"th",f:"*/ ss a1 100000"},{n:"lFD",f:"*/ ss a2 100000"},{n:"th2",f:"*/ th 1 2"},{n:"l2",f:"*/ lFD 1 2"},{n:"l3",f:"+- th2 l2 0"},{n:"rh",f:"+- hd2 0 th"},{n:"rw",f:"+- wd2 0 th"},{n:"dr",f:"+- rw 0 rh"},{n:"maxr",f:"?: dr rh rw"},{n:"ha",f:"at2 maxr l3"},{n:"aA1",f:"+- 19800000 0 ha"},{n:"aD1",f:"+- 19800000 ha 0"},{n:"ta11",f:"cos rw aA1"},{n:"ta12",f:"sin rh aA1"},{n:"bA1",f:"at2 ta11 ta12"},{n:"cta1",f:"cos rh bA1"},{n:"sta1",f:"sin rw bA1"},{n:"ma1",f:"mod cta1 sta1 0"},{n:"na1",f:"*/ rw rh ma1"},{n:"dxa1",f:"cos na1 bA1"},{n:"dya1",f:"sin na1 bA1"},{n:"xA1",f:"+- hc dxa1 0"},{n:"yA1",f:"+- vc dya1 0"},{n:"td11",f:"cos rw aD1"},{n:"td12",f:"sin rh aD1"},{n:"bD1",f:"at2 td11 td12"},{n:"ctd1",f:"cos rh bD1"},{n:"std1",f:"sin rw bD1"},{n:"md1",f:"mod ctd1 std1 0"},{n:"nd1",f:"*/ rw rh md1"},{n:"dxd1",f:"cos nd1 bD1"},{n:"dyd1",f:"sin nd1 bD1"},{n:"xD1",f:"+- hc dxd1 0"},{n:"yD1",f:"+- vc dyd1 0"},{n:"xAD1",f:"+- xA1 0 xD1"},{n:"yAD1",f:"+- yA1 0 yD1"},{n:"lAD1",f:"mod xAD1 yAD1 0"},{n:"a1",f:"at2 yAD1 xAD1"},{n:"dxF1",f:"sin lFD a1"},{n:"dyF1",f:"cos lFD a1"},{n:"xF1",f:"+- xD1 dxF1 0"},{n:"yF1",f:"+- yD1 dyF1 0"},{n:"xE1",f:"+- xA1 0 dxF1"},{n:"yE1",f:"+- yA1 0 dyF1"},{n:"yC1t",f:"sin th a1"},{n:"xC1t",f:"cos th a1"},{n:"yC1",f:"+- yF1 yC1t 0"},{n:"xC1",f:"+- xF1 0 xC1t"},{n:"yB1",f:"+- yE1 yC1t 0"},{n:"xB1",f:"+- xE1 0 xC1t"},{n:"aD6",f:"+- 3cd4 ha 0"},{n:"td61",f:"cos rw aD6"},{n:"td62",f:"sin rh aD6"},{n:"bD6",f:"at2 td61 td62"},{n:"ctd6",f:"cos rh bD6"},{n:"std6",f:"sin rw bD6"},{n:"md6",f:"mod ctd6 std6 0"},{n:"nd6",f:"*/ rw rh md6"},{n:"dxd6",f:"cos nd6 bD6"},{n:"dyd6",f:"sin nd6 bD6"},{n:"xD6",f:"+- hc dxd6 0"},{n:"yD6",f:"+- vc dyd6 0"},{n:"xA6",f:"+- hc 0 dxd6"},{n:"xF6",f:"+- xD6 0 lFD"},{n:"xE6",f:"+- xA6 lFD 0"},{n:"yC6",f:"+- yD6 0 th"},{n:"swAng1",f:"+- bA1 0 bD6"},{n:"aA2",f:"+- 1800000 0 ha"},{n:"aD2",f:"+- 1800000 ha 0"},{n:"ta21",f:"cos rw aA2"},{n:"ta22",f:"sin rh aA2"},{n:"bA2",f:"at2 ta21 ta22"},{n:"yA2",f:"+- h 0 yD1"},{n:"td21",f:"cos rw aD2"},{n:"td22",f:"sin rh aD2"},{n:"bD2",f:"at2 td21 td22"},{n:"yD2",f:"+- h 0 yA1"},{n:"yC2",f:"+- h 0 yB1"},{n:"yB2",f:"+- h 0 yC1"},{n:"xB2",f:"val xC1"},{n:"swAng2",f:"+- bA2 0 bD1"},{n:"aD3",f:"+- cd4 ha 0"},{n:"td31",f:"cos rw aD3"},{n:"td32",f:"sin rh aD3"},{n:"bD3",f:"at2 td31 td32"},{n:"yD3",f:"+- h 0 yD6"},{n:"yB3",f:"+- h 0 yC6"},{n:"aD4",f:"+- 9000000 ha 0"},{n:"td41",f:"cos rw aD4"},{n:"td42",f:"sin rh aD4"},{n:"bD4",f:"at2 td41 td42"},{n:"xD4",f:"+- w 0 xD1"},{n:"xC4",f:"+- w 0 xC1"},{n:"xB4",f:"+- w 0 xB1"},{n:"aD5",f:"+- 12600000 ha 0"},{n:"td51",f:"cos rw aD5"},{n:"td52",f:"sin rh aD5"},{n:"bD5",f:"at2 td51 td52"},{n:"xD5",f:"+- w 0 xA1"},{n:"xC5",f:"+- w 0 xB1"},{n:"xB5",f:"+- w 0 xC1"},{n:"xCxn1",f:"+/ xB1 xC1 2"},{n:"yCxn1",f:"+/ yB1 yC1 2"},{n:"yCxn2",f:"+- b 0 yCxn1"},{n:"xCxn4",f:"+/ r 0 xCxn1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"xA1",y:"yA1"}},{type:"lnTo",pt:{x:"xB1",y:"yB1"}},{type:"lnTo",pt:{x:"xC1",y:"yC1"}},{type:"lnTo",pt:{x:"xD1",y:"yD1"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD1",swAng:"swAng2"},{type:"lnTo",pt:{x:"xC1",y:"yB2"}},{type:"lnTo",pt:{x:"xB1",y:"yC2"}},{type:"lnTo",pt:{x:"xA1",y:"yD2"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD2",swAng:"swAng1"},{type:"lnTo",pt:{x:"xF6",y:"yB3"}},{type:"lnTo",pt:{x:"xE6",y:"yB3"}},{type:"lnTo",pt:{x:"xA6",y:"yD3"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD3",swAng:"swAng1"},{type:"lnTo",pt:{x:"xB4",y:"yC2"}},{type:"lnTo",pt:{x:"xC4",y:"yB2"}},{type:"lnTo",pt:{x:"xD4",y:"yA2"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD4",swAng:"swAng2"},{type:"lnTo",pt:{x:"xB5",y:"yC1"}},{type:"lnTo",pt:{x:"xC5",y:"yB1"}},{type:"lnTo",pt:{x:"xD5",y:"yA1"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD5",swAng:"swAng1"},{type:"lnTo",pt:{x:"xE6",y:"yC6"}},{type:"lnTo",pt:{x:"xF6",y:"yC6"}},{type:"lnTo",pt:{x:"xD6",y:"yD6"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD6",swAng:"swAng1"},{type:"close"}],extrusionOk:!1,stroke:!0}]},gear9:{avLst:[{n:"adj1",f:"val 10000"},{n:"adj2",f:"val 1763"}],gdLst:[{n:"a1",f:"pin 0 adj1 20000"},{n:"a2",f:"pin 0 adj2 2679"},{n:"th",f:"*/ ss a1 100000"},{n:"lFD",f:"*/ ss a2 100000"},{n:"th2",f:"*/ th 1 2"},{n:"l2",f:"*/ lFD 1 2"},{n:"l3",f:"+- th2 l2 0"},{n:"rh",f:"+- hd2 0 th"},{n:"rw",f:"+- wd2 0 th"},{n:"dr",f:"+- rw 0 rh"},{n:"maxr",f:"?: dr rh rw"},{n:"ha",f:"at2 maxr l3"},{n:"aA1",f:"+- 18600000 0 ha"},{n:"aD1",f:"+- 18600000 ha 0"},{n:"ta11",f:"cos rw aA1"},{n:"ta12",f:"sin rh aA1"},{n:"bA1",f:"at2 ta11 ta12"},{n:"cta1",f:"cos rh bA1"},{n:"sta1",f:"sin rw bA1"},{n:"ma1",f:"mod cta1 sta1 0"},{n:"na1",f:"*/ rw rh ma1"},{n:"dxa1",f:"cos na1 bA1"},{n:"dya1",f:"sin na1 bA1"},{n:"xA1",f:"+- hc dxa1 0"},{n:"yA1",f:"+- vc dya1 0"},{n:"td11",f:"cos rw aD1"},{n:"td12",f:"sin rh aD1"},{n:"bD1",f:"at2 td11 td12"},{n:"ctd1",f:"cos rh bD1"},{n:"std1",f:"sin rw bD1"},{n:"md1",f:"mod ctd1 std1 0"},{n:"nd1",f:"*/ rw rh md1"},{n:"dxd1",f:"cos nd1 bD1"},{n:"dyd1",f:"sin nd1 bD1"},{n:"xD1",f:"+- hc dxd1 0"},{n:"yD1",f:"+- vc dyd1 0"},{n:"xAD1",f:"+- xA1 0 xD1"},{n:"yAD1",f:"+- yA1 0 yD1"},{n:"lAD1",f:"mod xAD1 yAD1 0"},{n:"a1",f:"at2 yAD1 xAD1"},{n:"dxF1",f:"sin lFD a1"},{n:"dyF1",f:"cos lFD a1"},{n:"xF1",f:"+- xD1 dxF1 0"},{n:"yF1",f:"+- yD1 dyF1 0"},{n:"xE1",f:"+- xA1 0 dxF1"},{n:"yE1",f:"+- yA1 0 dyF1"},{n:"yC1t",f:"sin th a1"},{n:"xC1t",f:"cos th a1"},{n:"yC1",f:"+- yF1 yC1t 0"},{n:"xC1",f:"+- xF1 0 xC1t"},{n:"yB1",f:"+- yE1 yC1t 0"},{n:"xB1",f:"+- xE1 0 xC1t"},{n:"aA2",f:"+- 21000000 0 ha"},{n:"aD2",f:"+- 21000000 ha 0"},{n:"ta21",f:"cos rw aA2"},{n:"ta22",f:"sin rh aA2"},{n:"bA2",f:"at2 ta21 ta22"},{n:"cta2",f:"cos rh bA2"},{n:"sta2",f:"sin rw bA2"},{n:"ma2",f:"mod cta2 sta2 0"},{n:"na2",f:"*/ rw rh ma2"},{n:"dxa2",f:"cos na2 bA2"},{n:"dya2",f:"sin na2 bA2"},{n:"xA2",f:"+- hc dxa2 0"},{n:"yA2",f:"+- vc dya2 0"},{n:"td21",f:"cos rw aD2"},{n:"td22",f:"sin rh aD2"},{n:"bD2",f:"at2 td21 td22"},{n:"ctd2",f:"cos rh bD2"},{n:"std2",f:"sin rw bD2"},{n:"md2",f:"mod ctd2 std2 0"},{n:"nd2",f:"*/ rw rh md2"},{n:"dxd2",f:"cos nd2 bD2"},{n:"dyd2",f:"sin nd2 bD2"},{n:"xD2",f:"+- hc dxd2 0"},{n:"yD2",f:"+- vc dyd2 0"},{n:"xAD2",f:"+- xA2 0 xD2"},{n:"yAD2",f:"+- yA2 0 yD2"},{n:"lAD2",f:"mod xAD2 yAD2 0"},{n:"a2",f:"at2 yAD2 xAD2"},{n:"dxF2",f:"sin lFD a2"},{n:"dyF2",f:"cos lFD a2"},{n:"xF2",f:"+- xD2 dxF2 0"},{n:"yF2",f:"+- yD2 dyF2 0"},{n:"xE2",f:"+- xA2 0 dxF2"},{n:"yE2",f:"+- yA2 0 dyF2"},{n:"yC2t",f:"sin th a2"},{n:"xC2t",f:"cos th a2"},{n:"yC2",f:"+- yF2 yC2t 0"},{n:"xC2",f:"+- xF2 0 xC2t"},{n:"yB2",f:"+- yE2 yC2t 0"},{n:"xB2",f:"+- xE2 0 xC2t"},{n:"swAng1",f:"+- bA2 0 bD1"},{n:"aA3",f:"+- 1800000 0 ha"},{n:"aD3",f:"+- 1800000 ha 0"},{n:"ta31",f:"cos rw aA3"},{n:"ta32",f:"sin rh aA3"},{n:"bA3",f:"at2 ta31 ta32"},{n:"cta3",f:"cos rh bA3"},{n:"sta3",f:"sin rw bA3"},{n:"ma3",f:"mod cta3 sta3 0"},{n:"na3",f:"*/ rw rh ma3"},{n:"dxa3",f:"cos na3 bA3"},{n:"dya3",f:"sin na3 bA3"},{n:"xA3",f:"+- hc dxa3 0"},{n:"yA3",f:"+- vc dya3 0"},{n:"td31",f:"cos rw aD3"},{n:"td32",f:"sin rh aD3"},{n:"bD3",f:"at2 td31 td32"},{n:"ctd3",f:"cos rh bD3"},{n:"std3",f:"sin rw bD3"},{n:"md3",f:"mod ctd3 std3 0"},{n:"nd3",f:"*/ rw rh md3"},{n:"dxd3",f:"cos nd3 bD3"},{n:"dyd3",f:"sin nd3 bD3"},{n:"xD3",f:"+- hc dxd3 0"},{n:"yD3",f:"+- vc dyd3 0"},{n:"xAD3",f:"+- xA3 0 xD3"},{n:"yAD3",f:"+- yA3 0 yD3"},{n:"lAD3",f:"mod xAD3 yAD3 0"},{n:"a3",f:"at2 yAD3 xAD3"},{n:"dxF3",f:"sin lFD a3"},{n:"dyF3",f:"cos lFD a3"},{n:"xF3",f:"+- xD3 dxF3 0"},{n:"yF3",f:"+- yD3 dyF3 0"},{n:"xE3",f:"+- xA3 0 dxF3"},{n:"yE3",f:"+- yA3 0 dyF3"},{n:"yC3t",f:"sin th a3"},{n:"xC3t",f:"cos th a3"},{n:"yC3",f:"+- yF3 yC3t 0"},{n:"xC3",f:"+- xF3 0 xC3t"},{n:"yB3",f:"+- yE3 yC3t 0"},{n:"xB3",f:"+- xE3 0 xC3t"},{n:"swAng2",f:"+- bA3 0 bD2"},{n:"aA4",f:"+- 4200000 0 ha"},{n:"aD4",f:"+- 4200000 ha 0"},{n:"ta41",f:"cos rw aA4"},{n:"ta42",f:"sin rh aA4"},{n:"bA4",f:"at2 ta41 ta42"},{n:"cta4",f:"cos rh bA4"},{n:"sta4",f:"sin rw bA4"},{n:"ma4",f:"mod cta4 sta4 0"},{n:"na4",f:"*/ rw rh ma4"},{n:"dxa4",f:"cos na4 bA4"},{n:"dya4",f:"sin na4 bA4"},{n:"xA4",f:"+- hc dxa4 0"},{n:"yA4",f:"+- vc dya4 0"},{n:"td41",f:"cos rw aD4"},{n:"td42",f:"sin rh aD4"},{n:"bD4",f:"at2 td41 td42"},{n:"ctd4",f:"cos rh bD4"},{n:"std4",f:"sin rw bD4"},{n:"md4",f:"mod ctd4 std4 0"},{n:"nd4",f:"*/ rw rh md4"},{n:"dxd4",f:"cos nd4 bD4"},{n:"dyd4",f:"sin nd4 bD4"},{n:"xD4",f:"+- hc dxd4 0"},{n:"yD4",f:"+- vc dyd4 0"},{n:"xAD4",f:"+- xA4 0 xD4"},{n:"yAD4",f:"+- yA4 0 yD4"},{n:"lAD4",f:"mod xAD4 yAD4 0"},{n:"a4",f:"at2 yAD4 xAD4"},{n:"dxF4",f:"sin lFD a4"},{n:"dyF4",f:"cos lFD a4"},{n:"xF4",f:"+- xD4 dxF4 0"},{n:"yF4",f:"+- yD4 dyF4 0"},{n:"xE4",f:"+- xA4 0 dxF4"},{n:"yE4",f:"+- yA4 0 dyF4"},{n:"yC4t",f:"sin th a4"},{n:"xC4t",f:"cos th a4"},{n:"yC4",f:"+- yF4 yC4t 0"},{n:"xC4",f:"+- xF4 0 xC4t"},{n:"yB4",f:"+- yE4 yC4t 0"},{n:"xB4",f:"+- xE4 0 xC4t"},{n:"swAng3",f:"+- bA4 0 bD3"},{n:"aA5",f:"+- 6600000 0 ha"},{n:"aD5",f:"+- 6600000 ha 0"},{n:"ta51",f:"cos rw aA5"},{n:"ta52",f:"sin rh aA5"},{n:"bA5",f:"at2 ta51 ta52"},{n:"td51",f:"cos rw aD5"},{n:"td52",f:"sin rh aD5"},{n:"bD5",f:"at2 td51 td52"},{n:"xD5",f:"+- w 0 xA4"},{n:"xC5",f:"+- w 0 xB4"},{n:"xB5",f:"+- w 0 xC4"},{n:"swAng4",f:"+- bA5 0 bD4"},{n:"aD6",f:"+- 9000000 ha 0"},{n:"td61",f:"cos rw aD6"},{n:"td62",f:"sin rh aD6"},{n:"bD6",f:"at2 td61 td62"},{n:"xD6",f:"+- w 0 xA3"},{n:"xC6",f:"+- w 0 xB3"},{n:"xB6",f:"+- w 0 xC3"},{n:"aD7",f:"+- 11400000 ha 0"},{n:"td71",f:"cos rw aD7"},{n:"td72",f:"sin rh aD7"},{n:"bD7",f:"at2 td71 td72"},{n:"xD7",f:"+- w 0 xA2"},{n:"xC7",f:"+- w 0 xB2"},{n:"xB7",f:"+- w 0 xC2"},{n:"aD8",f:"+- 13800000 ha 0"},{n:"td81",f:"cos rw aD8"},{n:"td82",f:"sin rh aD8"},{n:"bD8",f:"at2 td81 td82"},{n:"xA8",f:"+- w 0 xD1"},{n:"xD8",f:"+- w 0 xA1"},{n:"xC8",f:"+- w 0 xB1"},{n:"xB8",f:"+- w 0 xC1"},{n:"aA9",f:"+- 3cd4 0 ha"},{n:"aD9",f:"+- 3cd4 ha 0"},{n:"td91",f:"cos rw aD9"},{n:"td92",f:"sin rh aD9"},{n:"bD9",f:"at2 td91 td92"},{n:"ctd9",f:"cos rh bD9"},{n:"std9",f:"sin rw bD9"},{n:"md9",f:"mod ctd9 std9 0"},{n:"nd9",f:"*/ rw rh md9"},{n:"dxd9",f:"cos nd9 bD9"},{n:"dyd9",f:"sin nd9 bD9"},{n:"xD9",f:"+- hc dxd9 0"},{n:"yD9",f:"+- vc dyd9 0"},{n:"ta91",f:"cos rw aA9"},{n:"ta92",f:"sin rh aA9"},{n:"bA9",f:"at2 ta91 ta92"},{n:"xA9",f:"+- hc 0 dxd9"},{n:"xF9",f:"+- xD9 0 lFD"},{n:"xE9",f:"+- xA9 lFD 0"},{n:"yC9",f:"+- yD9 0 th"},{n:"swAng5",f:"+- bA9 0 bD8"},{n:"xCxn1",f:"+/ xB1 xC1 2"},{n:"yCxn1",f:"+/ yB1 yC1 2"},{n:"xCxn2",f:"+/ xB2 xC2 2"},{n:"yCxn2",f:"+/ yB2 yC2 2"},{n:"xCxn3",f:"+/ xB3 xC3 2"},{n:"yCxn3",f:"+/ yB3 yC3 2"},{n:"xCxn4",f:"+/ xB4 xC4 2"},{n:"yCxn4",f:"+/ yB4 yC4 2"},{n:"xCxn5",f:"+/ r 0 xCxn4"},{n:"xCxn6",f:"+/ r 0 xCxn3"},{n:"xCxn7",f:"+/ r 0 xCxn2"},{n:"xCxn8",f:"+/ r 0 xCxn1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"xA1",y:"yA1"}},{type:"lnTo",pt:{x:"xB1",y:"yB1"}},{type:"lnTo",pt:{x:"xC1",y:"yC1"}},{type:"lnTo",pt:{x:"xD1",y:"yD1"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD1",swAng:"swAng1"},{type:"lnTo",pt:{x:"xB2",y:"yB2"}},{type:"lnTo",pt:{x:"xC2",y:"yC2"}},{type:"lnTo",pt:{x:"xD2",y:"yD2"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD2",swAng:"swAng2"},{type:"lnTo",pt:{x:"xB3",y:"yB3"}},{type:"lnTo",pt:{x:"xC3",y:"yC3"}},{type:"lnTo",pt:{x:"xD3",y:"yD3"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD3",swAng:"swAng3"},{type:"lnTo",pt:{x:"xB4",y:"yB4"}},{type:"lnTo",pt:{x:"xC4",y:"yC4"}},{type:"lnTo",pt:{x:"xD4",y:"yD4"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD4",swAng:"swAng4"},{type:"lnTo",pt:{x:"xB5",y:"yC4"}},{type:"lnTo",pt:{x:"xC5",y:"yB4"}},{type:"lnTo",pt:{x:"xD5",y:"yA4"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD5",swAng:"swAng3"},{type:"lnTo",pt:{x:"xB6",y:"yC3"}},{type:"lnTo",pt:{x:"xC6",y:"yB3"}},{type:"lnTo",pt:{x:"xD6",y:"yA3"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD6",swAng:"swAng2"},{type:"lnTo",pt:{x:"xB7",y:"yC2"}},{type:"lnTo",pt:{x:"xC7",y:"yB2"}},{type:"lnTo",pt:{x:"xD7",y:"yA2"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD7",swAng:"swAng1"},{type:"lnTo",pt:{x:"xB8",y:"yC1"}},{type:"lnTo",pt:{x:"xC8",y:"yB1"}},{type:"lnTo",pt:{x:"xD8",y:"yA1"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD8",swAng:"swAng5"},{type:"lnTo",pt:{x:"xE9",y:"yC9"}},{type:"lnTo",pt:{x:"xF9",y:"yC9"}},{type:"lnTo",pt:{x:"xD9",y:"yD9"}},{type:"arcTo",wR:"rw",hR:"rh",stAng:"bD9",swAng:"swAng5"},{type:"close"}],extrusionOk:!1,stroke:!0}]},halfFrame:{avLst:[{n:"adj1",f:"val 33333"},{n:"adj2",f:"val 33333"}],gdLst:[{n:"maxAdj2",f:"*/ 100000 w ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"x1",f:"*/ ss a2 100000"},{n:"g1",f:"*/ h x1 w"},{n:"g2",f:"+- h 0 g1"},{n:"maxAdj1",f:"*/ 100000 g2 ss"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"y1",f:"*/ ss a1 100000"},{n:"dx2",f:"*/ y1 w h"},{n:"x2",f:"+- r 0 dx2"},{n:"dy2",f:"*/ x1 h w"},{n:"y2",f:"+- b 0 dy2"},{n:"cx1",f:"*/ x1 1 2"},{n:"cy1",f:"+/ y2 b 2"},{n:"cx2",f:"+/ x2 r 2"},{n:"cy2",f:"*/ y1 1 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},heart:{gdLst:[{n:"dx1",f:"*/ w 49 48"},{n:"dx2",f:"*/ w 10 48"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"y1",f:"+- t 0 hd3"},{n:"il",f:"*/ w 1 6"},{n:"ir",f:"*/ w 5 6"},{n:"ib",f:"*/ h 2 3"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"hc",y:"hd4"}},{type:"cubicBezTo",pts:[{x:"x3",y:"y1"},{x:"x4",y:"hd4"},{x:"hc",y:"b"}]},{type:"cubicBezTo",pts:[{x:"x1",y:"hd4"},{x:"x2",y:"y1"},{x:"hc",y:"hd4"}]},{type:"close"}],extrusionOk:!1,stroke:!0}]},heptagon:{avLst:[{n:"hf",f:"val 102572"},{n:"vf",f:"val 105210"}],gdLst:[{n:"swd2",f:"*/ wd2 hf 100000"},{n:"shd2",f:"*/ hd2 vf 100000"},{n:"svc",f:"*/ vc  vf 100000"},{n:"dx1",f:"*/ swd2 97493 100000"},{n:"dx2",f:"*/ swd2 78183 100000"},{n:"dx3",f:"*/ swd2 43388 100000"},{n:"dy1",f:"*/ shd2 62349 100000"},{n:"dy2",f:"*/ shd2 22252 100000"},{n:"dy3",f:"*/ shd2 90097 100000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc 0 dx3"},{n:"x4",f:"+- hc dx3 0"},{n:"x5",f:"+- hc dx2 0"},{n:"x6",f:"+- hc dx1 0"},{n:"y1",f:"+- svc 0 dy1"},{n:"y2",f:"+- svc dy2 0"},{n:"y3",f:"+- svc dy3 0"},{n:"ib",f:"+- b 0 y1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x5",y:"y1"}},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},hexagon:{avLst:[{n:"adj",f:"val 25000"},{n:"vf",f:"val 115470"}],gdLst:[{n:"maxAdj",f:"*/ 50000 w ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"shd2",f:"*/ hd2 vf 100000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"dy1",f:"sin shd2 3600000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc dy1 0"},{n:"q1",f:"*/ maxAdj -1 2"},{n:"q2",f:"+- a q1 0"},{n:"q3",f:"?: q2 4 2"},{n:"q4",f:"?: q2 3 2"},{n:"q5",f:"?: q2 q1 0"},{n:"q6",f:"+/ a q5 q1"},{n:"q7",f:"*/ q6 q4 -1"},{n:"q8",f:"+- q3 q7 0"},{n:"il",f:"*/ w q8 24"},{n:"it",f:"*/ h q8 24"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 it"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},homePlate:{avLst:[{n:"adj",f:"val 50000"}],gdLst:[{n:"maxAdj",f:"*/ 100000 w ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"dx1",f:"*/ ss a 100000"},{n:"x1",f:"+- r 0 dx1"},{n:"ir",f:"+/ x1 r 2"},{n:"x2",f:"*/ x1 1 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},horizontalScroll:{avLst:[{n:"adj",f:"val 12500"}],gdLst:[{n:"a",f:"pin 0 adj 25000"},{n:"ch",f:"*/ ss a 100000"},{n:"ch2",f:"*/ ch 1 2"},{n:"ch4",f:"*/ ch 1 4"},{n:"y3",f:"+- ch ch2 0"},{n:"y4",f:"+- ch ch 0"},{n:"y6",f:"+- b 0 ch"},{n:"y7",f:"+- b 0 ch2"},{n:"y5",f:"+- y6 0 ch2"},{n:"x3",f:"+- r 0 ch"},{n:"x4",f:"+- r 0 ch2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"r",y:"ch2"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"x4",y:"ch2"}},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"0",swAng:"cd2"},{type:"lnTo",pt:{x:"x3",y:"ch"}},{type:"lnTo",pt:{x:"ch2",y:"ch"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"l",y:"y7"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd2",swAng:"-10800000"},{type:"lnTo",pt:{x:"ch",y:"y6"}},{type:"lnTo",pt:{x:"x4",y:"y6"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"-5400000"},{type:"close"},{type:"moveTo",pt:{x:"ch2",y:"y4"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"-5400000"},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"0",swAng:"-10800000"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"ch2",y:"y4"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"-5400000"},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"0",swAng:"-10800000"},{type:"close"},{type:"moveTo",pt:{x:"x4",y:"ch"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"-16200000"},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"cd2",swAng:"-10800000"},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"y3"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x3",y:"ch"}},{type:"lnTo",pt:{x:"x3",y:"ch2"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd2",swAng:"cd2"},{type:"lnTo",pt:{x:"r",y:"y5"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"ch",y:"y6"}},{type:"lnTo",pt:{x:"ch",y:"y7"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd2"},{type:"close"},{type:"moveTo",pt:{x:"x3",y:"ch"}},{type:"lnTo",pt:{x:"x4",y:"ch"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"-5400000"},{type:"moveTo",pt:{x:"x4",y:"ch"}},{type:"lnTo",pt:{x:"x4",y:"ch2"}},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"0",swAng:"cd2"},{type:"moveTo",pt:{x:"ch2",y:"y4"}},{type:"lnTo",pt:{x:"ch2",y:"y3"}},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"cd2",swAng:"cd2"},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd2"},{type:"moveTo",pt:{x:"ch",y:"y3"}},{type:"lnTo",pt:{x:"ch",y:"y6"}}],fill:"none",extrusionOk:!1,stroke:!0}]},irregularSeal1:{gdLst:[{n:"x5",f:"*/ w 4627 21600"},{n:"x12",f:"*/ w 8485 21600"},{n:"x21",f:"*/ w 16702 21600"},{n:"x24",f:"*/ w 14522 21600"},{n:"y3",f:"*/ h 6320 21600"},{n:"y6",f:"*/ h 8615 21600"},{n:"y9",f:"*/ h 13937 21600"},{n:"y18",f:"*/ h 13290 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"10800",y:"5800"}},{type:"lnTo",pt:{x:"14522",y:"0"}},{type:"lnTo",pt:{x:"14155",y:"5325"}},{type:"lnTo",pt:{x:"18380",y:"4457"}},{type:"lnTo",pt:{x:"16702",y:"7315"}},{type:"lnTo",pt:{x:"21097",y:"8137"}},{type:"lnTo",pt:{x:"17607",y:"10475"}},{type:"lnTo",pt:{x:"21600",y:"13290"}},{type:"lnTo",pt:{x:"16837",y:"12942"}},{type:"lnTo",pt:{x:"18145",y:"18095"}},{type:"lnTo",pt:{x:"14020",y:"14457"}},{type:"lnTo",pt:{x:"13247",y:"19737"}},{type:"lnTo",pt:{x:"10532",y:"14935"}},{type:"lnTo",pt:{x:"8485",y:"21600"}},{type:"lnTo",pt:{x:"7715",y:"15627"}},{type:"lnTo",pt:{x:"4762",y:"17617"}},{type:"lnTo",pt:{x:"5667",y:"13937"}},{type:"lnTo",pt:{x:"135",y:"14587"}},{type:"lnTo",pt:{x:"3722",y:"11775"}},{type:"lnTo",pt:{x:"0",y:"8615"}},{type:"lnTo",pt:{x:"4627",y:"7617"}},{type:"lnTo",pt:{x:"370",y:"2295"}},{type:"lnTo",pt:{x:"7312",y:"6320"}},{type:"lnTo",pt:{x:"8352",y:"2295"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:21600,h:21600}]},irregularSeal2:{gdLst:[{n:"x2",f:"*/ w 9722 21600"},{n:"x5",f:"*/ w 5372 21600"},{n:"x16",f:"*/ w 11612 21600"},{n:"x19",f:"*/ w 14640 21600"},{n:"y2",f:"*/ h 1887 21600"},{n:"y3",f:"*/ h 6382 21600"},{n:"y8",f:"*/ h 12877 21600"},{n:"y14",f:"*/ h 19712 21600"},{n:"y16",f:"*/ h 18842 21600"},{n:"y17",f:"*/ h 15935 21600"},{n:"y24",f:"*/ h 6645 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"11462",y:"4342"}},{type:"lnTo",pt:{x:"14790",y:"0"}},{type:"lnTo",pt:{x:"14525",y:"5777"}},{type:"lnTo",pt:{x:"18007",y:"3172"}},{type:"lnTo",pt:{x:"16380",y:"6532"}},{type:"lnTo",pt:{x:"21600",y:"6645"}},{type:"lnTo",pt:{x:"16985",y:"9402"}},{type:"lnTo",pt:{x:"18270",y:"11290"}},{type:"lnTo",pt:{x:"16380",y:"12310"}},{type:"lnTo",pt:{x:"18877",y:"15632"}},{type:"lnTo",pt:{x:"14640",y:"14350"}},{type:"lnTo",pt:{x:"14942",y:"17370"}},{type:"lnTo",pt:{x:"12180",y:"15935"}},{type:"lnTo",pt:{x:"11612",y:"18842"}},{type:"lnTo",pt:{x:"9872",y:"17370"}},{type:"lnTo",pt:{x:"8700",y:"19712"}},{type:"lnTo",pt:{x:"7527",y:"18125"}},{type:"lnTo",pt:{x:"4917",y:"21600"}},{type:"lnTo",pt:{x:"4805",y:"18240"}},{type:"lnTo",pt:{x:"1285",y:"17825"}},{type:"lnTo",pt:{x:"3330",y:"15370"}},{type:"lnTo",pt:{x:"0",y:"12877"}},{type:"lnTo",pt:{x:"3935",y:"11592"}},{type:"lnTo",pt:{x:"1172",y:"8270"}},{type:"lnTo",pt:{x:"5372",y:"7817"}},{type:"lnTo",pt:{x:"4502",y:"3625"}},{type:"lnTo",pt:{x:"8550",y:"6382"}},{type:"lnTo",pt:{x:"9722",y:"1887"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:21600,h:21600}]},leftArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 100000 w ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"dx2",f:"*/ ss a2 100000"},{n:"x2",f:"+- l dx2 0"},{n:"dy1",f:"*/ h a1 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc dy1 0"},{n:"dx1",f:"*/ y1 dx2 hd2"},{n:"x1",f:"+- x2  0 dx1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},leftArrowCallout:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 64977"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 h ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"*/ 100000 w ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q2",f:"*/ a3 ss w"},{n:"maxAdj4",f:"+- 100000 0 q2"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"dy1",f:"*/ ss a2 100000"},{n:"dy2",f:"*/ ss a1 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"},{n:"y4",f:"+- vc dy1 0"},{n:"x1",f:"*/ ss a3 100000"},{n:"dx2",f:"*/ w a4 100000"},{n:"x2",f:"+- r 0 dx2"},{n:"x3",f:"+/ x2 r 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},leftBrace:{avLst:[{n:"adj1",f:"val 8333"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"a2",f:"pin 0 adj2 100000"},{n:"q1",f:"+- 100000 0 a2"},{n:"q2",f:"min q1 a2"},{n:"q3",f:"*/ q2 1 2"},{n:"maxAdj1",f:"*/ q3 h ss"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"y1",f:"*/ ss a1 100000"},{n:"y3",f:"*/ h a2 100000"},{n:"y4",f:"+- y3 y1 0"},{n:"dx1",f:"cos wd2 2700000"},{n:"dy1",f:"sin y1 2700000"},{n:"il",f:"+- r 0 dx1"},{n:"it",f:"+- y1 0 dy1"},{n:"ib",f:"+- b dy1 y1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"r",y:"b"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"hc",y:"y4"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"-5400000"},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"hc",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd2",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"r",y:"b"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"hc",y:"y4"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"-5400000"},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"hc",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd2",swAng:"cd4"}],fill:"none",extrusionOk:!1,stroke:!0}]},leftBracket:{avLst:[{n:"adj",f:"val 8333"}],gdLst:[{n:"maxAdj",f:"*/ 50000 h ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"y1",f:"*/ ss a 100000"},{n:"y2",f:"+- b 0 y1"},{n:"dx1",f:"cos w 2700000"},{n:"dy1",f:"sin y1 2700000"},{n:"il",f:"+- r 0 dx1"},{n:"it",f:"+- y1 0 dy1"},{n:"ib",f:"+- b dy1 y1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"r",y:"b"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"l",y:"y1"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"cd2",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"r",y:"b"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"l",y:"y1"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"cd2",swAng:"cd4"}],fill:"none",extrusionOk:!1,stroke:!0}]},leftCircularArrow:{avLst:[{n:"adj1",f:"val 12500"},{n:"adj2",f:"val -1142319"},{n:"adj3",f:"val 1142319"},{n:"adj4",f:"val 10800000"},{n:"adj5",f:"val 12500"}],gdLst:[{n:"a5",f:"pin 0 adj5 25000"},{n:"maxAdj1",f:"*/ a5 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"enAng",f:"pin 1 adj3 21599999"},{n:"stAng",f:"pin 0 adj4 21599999"},{n:"th",f:"*/ ss a1 100000"},{n:"thh",f:"*/ ss a5 100000"},{n:"th2",f:"*/ th 1 2"},{n:"rw1",f:"+- wd2 th2 thh"},{n:"rh1",f:"+- hd2 th2 thh"},{n:"rw2",f:"+- rw1 0 th"},{n:"rh2",f:"+- rh1 0 th"},{n:"rw3",f:"+- rw2 th2 0"},{n:"rh3",f:"+- rh2 th2 0"},{n:"wtH",f:"sin rw3 enAng"},{n:"htH",f:"cos rh3 enAng"},{n:"dxH",f:"cat2 rw3 htH wtH"},{n:"dyH",f:"sat2 rh3 htH wtH"},{n:"xH",f:"+- hc dxH 0"},{n:"yH",f:"+- vc dyH 0"},{n:"rI",f:"min rw2 rh2"},{n:"u1",f:"*/ dxH dxH 1"},{n:"u2",f:"*/ dyH dyH 1"},{n:"u3",f:"*/ rI rI 1"},{n:"u4",f:"+- u1 0 u3"},{n:"u5",f:"+- u2 0 u3"},{n:"u6",f:"*/ u4 u5 u1"},{n:"u7",f:"*/ u6 1 u2"},{n:"u8",f:"+- 1 0 u7"},{n:"u9",f:"sqrt u8"},{n:"u10",f:"*/ u4 1 dxH"},{n:"u11",f:"*/ u10 1 dyH"},{n:"u12",f:"+/ 1 u9 u11"},{n:"u13",f:"at2 1 u12"},{n:"u14",f:"+- u13 21600000 0"},{n:"u15",f:"?: u13 u13 u14"},{n:"u16",f:"+- u15 0 enAng"},{n:"u17",f:"+- u16 21600000 0"},{n:"u18",f:"?: u16 u16 u17"},{n:"u19",f:"+- u18 0 cd2"},{n:"u20",f:"+- u18 0 21600000"},{n:"u21",f:"?: u19 u20 u18"},{n:"u22",f:"abs u21"},{n:"minAng",f:"*/ u22 -1 1"},{n:"u23",f:"abs adj2"},{n:"a2",f:"*/ u23 -1 1"},{n:"aAng",f:"pin minAng a2 0"},{n:"ptAng",f:"+- enAng aAng 0"},{n:"wtA",f:"sin rw3 ptAng"},{n:"htA",f:"cos rh3 ptAng"},{n:"dxA",f:"cat2 rw3 htA wtA"},{n:"dyA",f:"sat2 rh3 htA wtA"},{n:"xA",f:"+- hc dxA 0"},{n:"yA",f:"+- vc dyA 0"},{n:"wtE",f:"sin rw1 stAng"},{n:"htE",f:"cos rh1 stAng"},{n:"dxE",f:"cat2 rw1 htE wtE"},{n:"dyE",f:"sat2 rh1 htE wtE"},{n:"xE",f:"+- hc dxE 0"},{n:"yE",f:"+- vc dyE 0"},{n:"wtD",f:"sin rw2 stAng"},{n:"htD",f:"cos rh2 stAng"},{n:"dxD",f:"cat2 rw2 htD wtD"},{n:"dyD",f:"sat2 rh2 htD wtD"},{n:"xD",f:"+- hc dxD 0"},{n:"yD",f:"+- vc dyD 0"},{n:"dxG",f:"cos thh ptAng"},{n:"dyG",f:"sin thh ptAng"},{n:"xG",f:"+- xH dxG 0"},{n:"yG",f:"+- yH dyG 0"},{n:"dxB",f:"cos thh ptAng"},{n:"dyB",f:"sin thh ptAng"},{n:"xB",f:"+- xH 0 dxB 0"},{n:"yB",f:"+- yH 0 dyB 0"},{n:"sx1",f:"+- xB 0 hc"},{n:"sy1",f:"+- yB 0 vc"},{n:"sx2",f:"+- xG 0 hc"},{n:"sy2",f:"+- yG 0 vc"},{n:"rO",f:"min rw1 rh1"},{n:"x1O",f:"*/ sx1 rO rw1"},{n:"y1O",f:"*/ sy1 rO rh1"},{n:"x2O",f:"*/ sx2 rO rw1"},{n:"y2O",f:"*/ sy2 rO rh1"},{n:"dxO",f:"+- x2O 0 x1O"},{n:"dyO",f:"+- y2O 0 y1O"},{n:"dO",f:"mod dxO dyO 0"},{n:"q1",f:"*/ x1O y2O 1"},{n:"q2",f:"*/ x2O y1O 1"},{n:"DO",f:"+- q1 0 q2"},{n:"q3",f:"*/ rO rO 1"},{n:"q4",f:"*/ dO dO 1"},{n:"q5",f:"*/ q3 q4 1"},{n:"q6",f:"*/ DO DO 1"},{n:"q7",f:"+- q5 0 q6"},{n:"q8",f:"max q7 0"},{n:"sdelO",f:"sqrt q8"},{n:"ndyO",f:"*/ dyO -1 1"},{n:"sdyO",f:"?: ndyO -1 1"},{n:"q9",f:"*/ sdyO dxO 1"},{n:"q10",f:"*/ q9 sdelO 1"},{n:"q11",f:"*/ DO dyO 1"},{n:"dxF1",f:"+/ q11 q10 q4"},{n:"q12",f:"+- q11 0 q10"},{n:"dxF2",f:"*/ q12 1 q4"},{n:"adyO",f:"abs dyO"},{n:"q13",f:"*/ adyO sdelO 1"},{n:"q14",f:"*/ DO dxO -1"},{n:"dyF1",f:"+/ q14 q13 q4"},{n:"q15",f:"+- q14 0 q13"},{n:"dyF2",f:"*/ q15 1 q4"},{n:"q16",f:"+- x2O 0 dxF1"},{n:"q17",f:"+- x2O 0 dxF2"},{n:"q18",f:"+- y2O 0 dyF1"},{n:"q19",f:"+- y2O 0 dyF2"},{n:"q20",f:"mod q16 q18 0"},{n:"q21",f:"mod q17 q19 0"},{n:"q22",f:"+- q21 0 q20"},{n:"dxF",f:"?: q22 dxF1 dxF2"},{n:"dyF",f:"?: q22 dyF1 dyF2"},{n:"sdxF",f:"*/ dxF rw1 rO"},{n:"sdyF",f:"*/ dyF rh1 rO"},{n:"xF",f:"+- hc sdxF 0"},{n:"yF",f:"+- vc sdyF 0"},{n:"x1I",f:"*/ sx1 rI rw2"},{n:"y1I",f:"*/ sy1 rI rh2"},{n:"x2I",f:"*/ sx2 rI rw2"},{n:"y2I",f:"*/ sy2 rI rh2"},{n:"dxI",f:"+- x2I 0 x1I"},{n:"dyI",f:"+- y2I 0 y1I"},{n:"dI",f:"mod dxI dyI 0"},{n:"v1",f:"*/ x1I y2I 1"},{n:"v2",f:"*/ x2I y1I 1"},{n:"DI",f:"+- v1 0 v2"},{n:"v3",f:"*/ rI rI 1"},{n:"v4",f:"*/ dI dI 1"},{n:"v5",f:"*/ v3 v4 1"},{n:"v6",f:"*/ DI DI 1"},{n:"v7",f:"+- v5 0 v6"},{n:"v8",f:"max v7 0"},{n:"sdelI",f:"sqrt v8"},{n:"v9",f:"*/ sdyO dxI 1"},{n:"v10",f:"*/ v9 sdelI 1"},{n:"v11",f:"*/ DI dyI 1"},{n:"dxC1",f:"+/ v11 v10 v4"},{n:"v12",f:"+- v11 0 v10"},{n:"dxC2",f:"*/ v12 1 v4"},{n:"adyI",f:"abs dyI"},{n:"v13",f:"*/ adyI sdelI 1"},{n:"v14",f:"*/ DI dxI -1"},{n:"dyC1",f:"+/ v14 v13 v4"},{n:"v15",f:"+- v14 0 v13"},{n:"dyC2",f:"*/ v15 1 v4"},{n:"v16",f:"+- x1I 0 dxC1"},{n:"v17",f:"+- x1I 0 dxC2"},{n:"v18",f:"+- y1I 0 dyC1"},{n:"v19",f:"+- y1I 0 dyC2"},{n:"v20",f:"mod v16 v18 0"},{n:"v21",f:"mod v17 v19 0"},{n:"v22",f:"+- v21 0 v20"},{n:"dxC",f:"?: v22 dxC1 dxC2"},{n:"dyC",f:"?: v22 dyC1 dyC2"},{n:"sdxC",f:"*/ dxC rw2 rI"},{n:"sdyC",f:"*/ dyC rh2 rI"},{n:"xC",f:"+- hc sdxC 0"},{n:"yC",f:"+- vc sdyC 0"},{n:"ist0",f:"at2 sdxC sdyC"},{n:"ist1",f:"+- ist0 21600000 0"},{n:"istAng0",f:"?: ist0 ist0 ist1"},{n:"isw1",f:"+- stAng 0 istAng0"},{n:"isw2",f:"+- isw1 21600000 0"},{n:"iswAng0",f:"?: isw1 isw1 isw2"},{n:"istAng",f:"+- istAng0 iswAng0 0"},{n:"iswAng",f:"+- 0 0 iswAng0"},{n:"p1",f:"+- xF 0 xC"},{n:"p2",f:"+- yF 0 yC"},{n:"p3",f:"mod p1 p2 0"},{n:"p4",f:"*/ p3 1 2"},{n:"p5",f:"+- p4 0 thh"},{n:"xGp",f:"?: p5 xF xG"},{n:"yGp",f:"?: p5 yF yG"},{n:"xBp",f:"?: p5 xC xB"},{n:"yBp",f:"?: p5 yC yB"},{n:"en0",f:"at2 sdxF sdyF"},{n:"en1",f:"+- en0 21600000 0"},{n:"en2",f:"?: en0 en0 en1"},{n:"sw0",f:"+- en2 0 stAng"},{n:"sw1",f:"+- sw0 0 21600000"},{n:"swAng",f:"?: sw0 sw1 sw0"},{n:"stAng0",f:"+- stAng swAng 0"},{n:"swAng0",f:"+- 0 0 swAng"},{n:"wtI",f:"sin rw3 stAng"},{n:"htI",f:"cos rh3 stAng"},{n:"dxI",f:"cat2 rw3 htI wtI"},{n:"dyI",f:"sat2 rh3 htI wtI"},{n:"xI",f:"+- hc dxI 0"},{n:"yI",f:"+- vc dyI 0"},{n:"aI",f:"+- stAng cd4 0"},{n:"aA",f:"+- ptAng 0 cd4"},{n:"aB",f:"+- ptAng cd2 0"},{n:"idx",f:"cos rw1 2700000"},{n:"idy",f:"sin rh1 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"xE",y:"yE"}},{type:"lnTo",pt:{x:"xD",y:"yD"}},{type:"arcTo",wR:"rw2",hR:"rh2",stAng:"istAng",swAng:"iswAng"},{type:"lnTo",pt:{x:"xBp",y:"yBp"}},{type:"lnTo",pt:{x:"xA",y:"yA"}},{type:"lnTo",pt:{x:"xGp",y:"yGp"}},{type:"lnTo",pt:{x:"xF",y:"yF"}},{type:"arcTo",wR:"rw1",hR:"rh1",stAng:"stAng0",swAng:"swAng0"},{type:"close"}],extrusionOk:!1,stroke:!0}]},leftRightArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 w ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"x2",f:"*/ ss a2 100000"},{n:"x3",f:"+- r 0 x2"},{n:"dy",f:"*/ h a1 200000"},{n:"y1",f:"+- vc 0 dy"},{n:"y2",f:"+- vc dy 0"},{n:"dx1",f:"*/ y1 x2 hd2"},{n:"x1",f:"+- x2 0 dx1"},{n:"x4",f:"+- x3 dx1 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x3",y:"b"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},leftRightArrowCallout:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 48123"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 h ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"*/ 50000 w ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q2",f:"*/ a3 ss wd2"},{n:"maxAdj4",f:"+- 100000 0 q2"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"dy1",f:"*/ ss a2 100000"},{n:"dy2",f:"*/ ss a1 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"},{n:"y4",f:"+- vc dy1 0"},{n:"x1",f:"*/ ss a3 100000"},{n:"x4",f:"+- r 0 x1"},{n:"dx2",f:"*/ w a4 200000"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},leftRightCircularArrow:{avLst:[{n:"adj1",f:"val 12500"},{n:"adj2",f:"val 1142319"},{n:"adj3",f:"val 20457681"},{n:"adj4",f:"val 11942319"},{n:"adj5",f:"val 12500"}],gdLst:[{n:"a5",f:"pin 0 adj5 25000"},{n:"maxAdj1",f:"*/ a5 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"enAng",f:"pin 1 adj3 21599999"},{n:"stAng",f:"pin 0 adj4 21599999"},{n:"th",f:"*/ ss a1 100000"},{n:"thh",f:"*/ ss a5 100000"},{n:"th2",f:"*/ th 1 2"},{n:"rw1",f:"+- wd2 th2 thh"},{n:"rh1",f:"+- hd2 th2 thh"},{n:"rw2",f:"+- rw1 0 th"},{n:"rh2",f:"+- rh1 0 th"},{n:"rw3",f:"+- rw2 th2 0"},{n:"rh3",f:"+- rh2 th2 0"},{n:"wtH",f:"sin rw3 enAng"},{n:"htH",f:"cos rh3 enAng"},{n:"dxH",f:"cat2 rw3 htH wtH"},{n:"dyH",f:"sat2 rh3 htH wtH"},{n:"xH",f:"+- hc dxH 0"},{n:"yH",f:"+- vc dyH 0"},{n:"rI",f:"min rw2 rh2"},{n:"u1",f:"*/ dxH dxH 1"},{n:"u2",f:"*/ dyH dyH 1"},{n:"u3",f:"*/ rI rI 1"},{n:"u4",f:"+- u1 0 u3"},{n:"u5",f:"+- u2 0 u3"},{n:"u6",f:"*/ u4 u5 u1"},{n:"u7",f:"*/ u6 1 u2"},{n:"u8",f:"+- 1 0 u7"},{n:"u9",f:"sqrt u8"},{n:"u10",f:"*/ u4 1 dxH"},{n:"u11",f:"*/ u10 1 dyH"},{n:"u12",f:"+/ 1 u9 u11"},{n:"u13",f:"at2 1 u12"},{n:"u14",f:"+- u13 21600000 0"},{n:"u15",f:"?: u13 u13 u14"},{n:"u16",f:"+- u15 0 enAng"},{n:"u17",f:"+- u16 21600000 0"},{n:"u18",f:"?: u16 u16 u17"},{n:"u19",f:"+- u18 0 cd2"},{n:"u20",f:"+- u18 0 21600000"},{n:"u21",f:"?: u19 u20 u18"},{n:"maxAng",f:"abs u21"},{n:"aAng",f:"pin 0 adj2 maxAng"},{n:"ptAng",f:"+- enAng aAng 0"},{n:"wtA",f:"sin rw3 ptAng"},{n:"htA",f:"cos rh3 ptAng"},{n:"dxA",f:"cat2 rw3 htA wtA"},{n:"dyA",f:"sat2 rh3 htA wtA"},{n:"xA",f:"+- hc dxA 0"},{n:"yA",f:"+- vc dyA 0"},{n:"dxG",f:"cos thh ptAng"},{n:"dyG",f:"sin thh ptAng"},{n:"xG",f:"+- xH dxG 0"},{n:"yG",f:"+- yH dyG 0"},{n:"dxB",f:"cos thh ptAng"},{n:"dyB",f:"sin thh ptAng"},{n:"xB",f:"+- xH 0 dxB 0"},{n:"yB",f:"+- yH 0 dyB 0"},{n:"sx1",f:"+- xB 0 hc"},{n:"sy1",f:"+- yB 0 vc"},{n:"sx2",f:"+- xG 0 hc"},{n:"sy2",f:"+- yG 0 vc"},{n:"rO",f:"min rw1 rh1"},{n:"x1O",f:"*/ sx1 rO rw1"},{n:"y1O",f:"*/ sy1 rO rh1"},{n:"x2O",f:"*/ sx2 rO rw1"},{n:"y2O",f:"*/ sy2 rO rh1"},{n:"dxO",f:"+- x2O 0 x1O"},{n:"dyO",f:"+- y2O 0 y1O"},{n:"dO",f:"mod dxO dyO 0"},{n:"q1",f:"*/ x1O y2O 1"},{n:"q2",f:"*/ x2O y1O 1"},{n:"DO",f:"+- q1 0 q2"},{n:"q3",f:"*/ rO rO 1"},{n:"q4",f:"*/ dO dO 1"},{n:"q5",f:"*/ q3 q4 1"},{n:"q6",f:"*/ DO DO 1"},{n:"q7",f:"+- q5 0 q6"},{n:"q8",f:"max q7 0"},{n:"sdelO",f:"sqrt q8"},{n:"ndyO",f:"*/ dyO -1 1"},{n:"sdyO",f:"?: ndyO -1 1"},{n:"q9",f:"*/ sdyO dxO 1"},{n:"q10",f:"*/ q9 sdelO 1"},{n:"q11",f:"*/ DO dyO 1"},{n:"dxF1",f:"+/ q11 q10 q4"},{n:"q12",f:"+- q11 0 q10"},{n:"dxF2",f:"*/ q12 1 q4"},{n:"adyO",f:"abs dyO"},{n:"q13",f:"*/ adyO sdelO 1"},{n:"q14",f:"*/ DO dxO -1"},{n:"dyF1",f:"+/ q14 q13 q4"},{n:"q15",f:"+- q14 0 q13"},{n:"dyF2",f:"*/ q15 1 q4"},{n:"q16",f:"+- x2O 0 dxF1"},{n:"q17",f:"+- x2O 0 dxF2"},{n:"q18",f:"+- y2O 0 dyF1"},{n:"q19",f:"+- y2O 0 dyF2"},{n:"q20",f:"mod q16 q18 0"},{n:"q21",f:"mod q17 q19 0"},{n:"q22",f:"+- q21 0 q20"},{n:"dxF",f:"?: q22 dxF1 dxF2"},{n:"dyF",f:"?: q22 dyF1 dyF2"},{n:"sdxF",f:"*/ dxF rw1 rO"},{n:"sdyF",f:"*/ dyF rh1 rO"},{n:"xF",f:"+- hc sdxF 0"},{n:"yF",f:"+- vc sdyF 0"},{n:"x1I",f:"*/ sx1 rI rw2"},{n:"y1I",f:"*/ sy1 rI rh2"},{n:"x2I",f:"*/ sx2 rI rw2"},{n:"y2I",f:"*/ sy2 rI rh2"},{n:"dxI",f:"+- x2I 0 x1I"},{n:"dyI",f:"+- y2I 0 y1I"},{n:"dI",f:"mod dxI dyI 0"},{n:"v1",f:"*/ x1I y2I 1"},{n:"v2",f:"*/ x2I y1I 1"},{n:"DI",f:"+- v1 0 v2"},{n:"v3",f:"*/ rI rI 1"},{n:"v4",f:"*/ dI dI 1"},{n:"v5",f:"*/ v3 v4 1"},{n:"v6",f:"*/ DI DI 1"},{n:"v7",f:"+- v5 0 v6"},{n:"v8",f:"max v7 0"},{n:"sdelI",f:"sqrt v8"},{n:"v9",f:"*/ sdyO dxI 1"},{n:"v10",f:"*/ v9 sdelI 1"},{n:"v11",f:"*/ DI dyI 1"},{n:"dxC1",f:"+/ v11 v10 v4"},{n:"v12",f:"+- v11 0 v10"},{n:"dxC2",f:"*/ v12 1 v4"},{n:"adyI",f:"abs dyI"},{n:"v13",f:"*/ adyI sdelI 1"},{n:"v14",f:"*/ DI dxI -1"},{n:"dyC1",f:"+/ v14 v13 v4"},{n:"v15",f:"+- v14 0 v13"},{n:"dyC2",f:"*/ v15 1 v4"},{n:"v16",f:"+- x1I 0 dxC1"},{n:"v17",f:"+- x1I 0 dxC2"},{n:"v18",f:"+- y1I 0 dyC1"},{n:"v19",f:"+- y1I 0 dyC2"},{n:"v20",f:"mod v16 v18 0"},{n:"v21",f:"mod v17 v19 0"},{n:"v22",f:"+- v21 0 v20"},{n:"dxC",f:"?: v22 dxC1 dxC2"},{n:"dyC",f:"?: v22 dyC1 dyC2"},{n:"sdxC",f:"*/ dxC rw2 rI"},{n:"sdyC",f:"*/ dyC rh2 rI"},{n:"xC",f:"+- hc sdxC 0"},{n:"yC",f:"+- vc sdyC 0"},{n:"wtI",f:"sin rw3 stAng"},{n:"htI",f:"cos rh3 stAng"},{n:"dxI",f:"cat2 rw3 htI wtI"},{n:"dyI",f:"sat2 rh3 htI wtI"},{n:"xI",f:"+- hc dxI 0"},{n:"yI",f:"+- vc dyI 0"},{n:"lptAng",f:"+- stAng 0 aAng"},{n:"wtL",f:"sin rw3 lptAng"},{n:"htL",f:"cos rh3 lptAng"},{n:"dxL",f:"cat2 rw3 htL wtL"},{n:"dyL",f:"sat2 rh3 htL wtL"},{n:"xL",f:"+- hc dxL 0"},{n:"yL",f:"+- vc dyL 0"},{n:"dxK",f:"cos thh lptAng"},{n:"dyK",f:"sin thh lptAng"},{n:"xK",f:"+- xI dxK 0"},{n:"yK",f:"+- yI dyK 0"},{n:"dxJ",f:"cos thh lptAng"},{n:"dyJ",f:"sin thh lptAng"},{n:"xJ",f:"+- xI 0 dxJ 0"},{n:"yJ",f:"+- yI 0 dyJ 0"},{n:"p1",f:"+- xF 0 xC"},{n:"p2",f:"+- yF 0 yC"},{n:"p3",f:"mod p1 p2 0"},{n:"p4",f:"*/ p3 1 2"},{n:"p5",f:"+- p4 0 thh"},{n:"xGp",f:"?: p5 xF xG"},{n:"yGp",f:"?: p5 yF yG"},{n:"xBp",f:"?: p5 xC xB"},{n:"yBp",f:"?: p5 yC yB"},{n:"en0",f:"at2 sdxF sdyF"},{n:"en1",f:"+- en0 21600000 0"},{n:"en2",f:"?: en0 en0 en1"},{n:"od0",f:"+- en2 0 enAng"},{n:"od1",f:"+- od0 21600000 0"},{n:"od2",f:"?: od0 od0 od1"},{n:"st0",f:"+- stAng 0 od2"},{n:"st1",f:"+- st0 21600000 0"},{n:"st2",f:"?: st0 st0 st1"},{n:"sw0",f:"+- en2 0 st2"},{n:"sw1",f:"+- sw0 21600000 0"},{n:"swAng",f:"?: sw0 sw0 sw1"},{n:"ist0",f:"at2 sdxC sdyC"},{n:"ist1",f:"+- ist0 21600000 0"},{n:"istAng",f:"?: ist0 ist0 ist1"},{n:"id0",f:"+- istAng 0 enAng"},{n:"id1",f:"+- id0 0 21600000"},{n:"id2",f:"?: id0 id1 id0"},{n:"ien0",f:"+- stAng 0 id2"},{n:"ien1",f:"+- ien0 0 21600000"},{n:"ien2",f:"?: ien1 ien1 ien0"},{n:"isw1",f:"+- ien2 0 istAng"},{n:"isw2",f:"+- isw1 0 21600000"},{n:"iswAng",f:"?: isw1 isw2 isw1"},{n:"wtE",f:"sin rw1 st2"},{n:"htE",f:"cos rh1 st2"},{n:"dxE",f:"cat2 rw1 htE wtE"},{n:"dyE",f:"sat2 rh1 htE wtE"},{n:"xE",f:"+- hc dxE 0"},{n:"yE",f:"+- vc dyE 0"},{n:"wtD",f:"sin rw2 ien2"},{n:"htD",f:"cos rh2 ien2"},{n:"dxD",f:"cat2 rw2 htD wtD"},{n:"dyD",f:"sat2 rh2 htD wtD"},{n:"xD",f:"+- hc dxD 0"},{n:"yD",f:"+- vc dyD 0"},{n:"xKp",f:"?: p5 xE xK"},{n:"yKp",f:"?: p5 yE yK"},{n:"xJp",f:"?: p5 xD xJ"},{n:"yJp",f:"?: p5 yD yJ"},{n:"aL",f:"+- lptAng 0 cd4"},{n:"aA",f:"+- ptAng cd4 0"},{n:"aB",f:"+- ptAng cd2 0"},{n:"aJ",f:"+- lptAng cd2 0"},{n:"idx",f:"cos rw1 2700000"},{n:"idy",f:"sin rh1 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"xL",y:"yL"}},{type:"lnTo",pt:{x:"xKp",y:"yKp"}},{type:"lnTo",pt:{x:"xE",y:"yE"}},{type:"arcTo",wR:"rw1",hR:"rh1",stAng:"st2",swAng:"swAng"},{type:"lnTo",pt:{x:"xGp",y:"yGp"}},{type:"lnTo",pt:{x:"xA",y:"yA"}},{type:"lnTo",pt:{x:"xBp",y:"yBp"}},{type:"lnTo",pt:{x:"xC",y:"yC"}},{type:"arcTo",wR:"rw2",hR:"rh2",stAng:"istAng",swAng:"iswAng"},{type:"lnTo",pt:{x:"xJp",y:"yJp"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},leftRightRibbon:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"},{n:"adj3",f:"val 16667"}],gdLst:[{n:"a3",f:"pin 0 adj3 33333"},{n:"maxAdj1",f:"+- 100000 0 a3"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"w1",f:"+- wd2 0 wd32"},{n:"maxAdj2",f:"*/ 100000 w1 ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"x1",f:"*/ ss a2 100000"},{n:"x4",f:"+- r 0 x1"},{n:"dy1",f:"*/ h a1 200000"},{n:"dy2",f:"*/ h a3 -200000"},{n:"ly1",f:"+- vc dy2 dy1"},{n:"ry4",f:"+- vc dy1 dy2"},{n:"ly2",f:"+- ly1 dy1 0"},{n:"ry3",f:"+- b 0 ly2"},{n:"ly4",f:"*/ ly2 2 1"},{n:"ry1",f:"+- b 0 ly4"},{n:"ly3",f:"+- ly4 0 ly1"},{n:"ry2",f:"+- b 0 ly3"},{n:"hR",f:"*/ a3 ss 400000"},{n:"x2",f:"+- hc 0 wd32"},{n:"x3",f:"+- hc wd32 0"},{n:"y1",f:"+- ly1 hR 0"},{n:"y2",f:"+- ry2 0 hR"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"ly2"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"ly1"}},{type:"lnTo",pt:{x:"hc",y:"ly1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd2"},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x4",y:"ry2"}},{type:"lnTo",pt:{x:"x4",y:"ry1"}},{type:"lnTo",pt:{x:"r",y:"ry3"}},{type:"lnTo",pt:{x:"x4",y:"b"}},{type:"lnTo",pt:{x:"x4",y:"ry4"}},{type:"lnTo",pt:{x:"hc",y:"ry4"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"ly3"}},{type:"lnTo",pt:{x:"x1",y:"ly3"}},{type:"lnTo",pt:{x:"x1",y:"ly4"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x3",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x3",y:"ry2"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"ly2"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"ly1"}},{type:"lnTo",pt:{x:"hc",y:"ly1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd2"},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x4",y:"ry2"}},{type:"lnTo",pt:{x:"x4",y:"ry1"}},{type:"lnTo",pt:{x:"r",y:"ry3"}},{type:"lnTo",pt:{x:"x4",y:"b"}},{type:"lnTo",pt:{x:"x4",y:"ry4"}},{type:"lnTo",pt:{x:"hc",y:"ry4"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"ly3"}},{type:"lnTo",pt:{x:"x1",y:"ly3"}},{type:"lnTo",pt:{x:"x1",y:"ly4"}},{type:"close"},{type:"moveTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"ry2"}},{type:"moveTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"ly3"}}],fill:"none",extrusionOk:!1,stroke:!0}]},leftRightUpArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"a2",f:"pin 0 adj2 50000"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"q1",f:"+- 100000 0 maxAdj1"},{n:"maxAdj3",f:"*/ q1 1 2"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"x1",f:"*/ ss a3 100000"},{n:"dx2",f:"*/ ss a2 100000"},{n:"x2",f:"+- hc 0 dx2"},{n:"x5",f:"+- hc dx2 0"},{n:"dx3",f:"*/ ss a1 200000"},{n:"x3",f:"+- hc 0 dx3"},{n:"x4",f:"+- hc dx3 0"},{n:"x6",f:"+- r 0 x1"},{n:"dy2",f:"*/ ss a2 50000"},{n:"y2",f:"+- b 0 dy2"},{n:"y4",f:"+- b 0 dx2"},{n:"y3",f:"+- y4 0 dx3"},{n:"y5",f:"+- y4 dx3 0"},{n:"il",f:"*/ dx3 x1 dx2"},{n:"ir",f:"+- r 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"x1"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x5",y:"x1"}},{type:"lnTo",pt:{x:"x4",y:"x1"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x6",y:"y3"}},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x6",y:"b"}},{type:"lnTo",pt:{x:"x6",y:"y5"}},{type:"lnTo",pt:{x:"x1",y:"y5"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},leftUpArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"}],gdLst:[{n:"a2",f:"pin 0 adj2 50000"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"+- 100000 0 maxAdj1"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"x1",f:"*/ ss a3 100000"},{n:"dx2",f:"*/ ss a2 50000"},{n:"x2",f:"+- r 0 dx2"},{n:"y2",f:"+- b 0 dx2"},{n:"dx4",f:"*/ ss a2 100000"},{n:"x4",f:"+- r 0 dx4"},{n:"y4",f:"+- b 0 dx4"},{n:"dx3",f:"*/ ss a1 200000"},{n:"x3",f:"+- x4 0 dx3"},{n:"x5",f:"+- x4 dx3 0"},{n:"y3",f:"+- y4 0 dx3"},{n:"y5",f:"+- y4 dx3 0"},{n:"il",f:"*/ dx3 x1 dx4"},{n:"cx1",f:"+/ x1 x5 2"},{n:"cy1",f:"+/ x1 y5 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"x1"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"lnTo",pt:{x:"x4",y:"t"}},{type:"lnTo",pt:{x:"r",y:"x1"}},{type:"lnTo",pt:{x:"x5",y:"x1"}},{type:"lnTo",pt:{x:"x5",y:"y5"}},{type:"lnTo",pt:{x:"x1",y:"y5"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},lightningBolt:{gdLst:[{n:"x1",f:"*/ w 5022 21600"},{n:"x3",f:"*/ w 8472 21600"},{n:"x4",f:"*/ w 8757 21600"},{n:"x5",f:"*/ w 10012 21600"},{n:"x8",f:"*/ w 12860 21600"},{n:"x9",f:"*/ w 13917 21600"},{n:"x11",f:"*/ w 16577 21600"},{n:"y1",f:"*/ h 3890 21600"},{n:"y2",f:"*/ h 6080 21600"},{n:"y4",f:"*/ h 7437 21600"},{n:"y6",f:"*/ h 9705 21600"},{n:"y7",f:"*/ h 12007 21600"},{n:"y10",f:"*/ h 14277 21600"},{n:"y11",f:"*/ h 14915 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"8472",y:"0"}},{type:"lnTo",pt:{x:"12860",y:"6080"}},{type:"lnTo",pt:{x:"11050",y:"6797"}},{type:"lnTo",pt:{x:"16577",y:"12007"}},{type:"lnTo",pt:{x:"14767",y:"12877"}},{type:"lnTo",pt:{x:"21600",y:"21600"}},{type:"lnTo",pt:{x:"10012",y:"14915"}},{type:"lnTo",pt:{x:"12222",y:"13987"}},{type:"lnTo",pt:{x:"5022",y:"9705"}},{type:"lnTo",pt:{x:"7602",y:"8382"}},{type:"lnTo",pt:{x:"0",y:"3890"}},{type:"close"}],extrusionOk:!1,stroke:!0,w:21600,h:21600}]},line:{pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}}],extrusionOk:!1,stroke:!0}]},lineInv:{pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"r",y:"t"}}],extrusionOk:!1,stroke:!0}]},mathDivide:{avLst:[{n:"adj1",f:"val 23520"},{n:"adj2",f:"val 5880"},{n:"adj3",f:"val 11760"}],gdLst:[{n:"a1",f:"pin 1000 adj1 36745"},{n:"ma1",f:"+- 0 0 a1"},{n:"ma3h",f:"+/ 73490 ma1 4"},{n:"ma3w",f:"*/ 36745 w h"},{n:"maxAdj3",f:"min ma3h ma3w"},{n:"a3",f:"pin 1000 adj3 maxAdj3"},{n:"m4a3",f:"*/ -4 a3 1"},{n:"maxAdj2",f:"+- 73490 m4a3 a1"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"dy1",f:"*/ h a1 200000"},{n:"yg",f:"*/ h a2 100000"},{n:"rad",f:"*/ h a3 100000"},{n:"dx1",f:"*/ w 73490 200000"},{n:"y3",f:"+- vc 0 dy1"},{n:"y4",f:"+- vc dy1 0"},{n:"a",f:"+- yg rad 0"},{n:"y2",f:"+- y3 0 a"},{n:"y1",f:"+- y2 0 rad"},{n:"y5",f:"+- b 0 y1"},{n:"x1",f:"+- hc 0 dx1"},{n:"x3",f:"+- hc dx1 0"},{n:"x2",f:"+- hc 0 rad"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"hc",y:"y1"}},{type:"arcTo",wR:"rad",hR:"rad",stAng:"3cd4",swAng:"21600000"},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"y5"}},{type:"arcTo",wR:"rad",hR:"rad",stAng:"cd4",swAng:"21600000"},{type:"close"},{type:"moveTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},mathEqual:{avLst:[{n:"adj1",f:"val 23520"},{n:"adj2",f:"val 11760"}],gdLst:[{n:"a1",f:"pin 0 adj1 36745"},{n:"2a1",f:"*/ a1 2 1"},{n:"mAdj2",f:"+- 100000 0 2a1"},{n:"a2",f:"pin 0 adj2 mAdj2"},{n:"dy1",f:"*/ h a1 100000"},{n:"dy2",f:"*/ h a2 200000"},{n:"dx1",f:"*/ w 73490 200000"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"},{n:"y1",f:"+- y2 0 dy1"},{n:"y4",f:"+- y3 dy1 0"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc dx1 0"},{n:"yC1",f:"+/ y1 y2 2"},{n:"yC2",f:"+/ y3 y4 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"},{type:"moveTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},mathMinus:{avLst:[{n:"adj1",f:"val 23520"}],gdLst:[{n:"a1",f:"pin 0 adj1 100000"},{n:"dy1",f:"*/ h a1 200000"},{n:"dx1",f:"*/ w 73490 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc dy1 0"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc dx1 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},mathMultiply:{avLst:[{n:"adj1",f:"val 23520"}],gdLst:[{n:"a1",f:"pin 0 adj1 51965"},{n:"th",f:"*/ ss a1 100000"},{n:"a",f:"at2 w h"},{n:"sa",f:"sin 1 a"},{n:"ca",f:"cos 1 a"},{n:"ta",f:"tan 1 a"},{n:"dl",f:"mod w h 0"},{n:"rw",f:"*/ dl 51965 100000"},{n:"lM",f:"+- dl 0 rw"},{n:"xM",f:"*/ ca lM 2"},{n:"yM",f:"*/ sa lM 2"},{n:"dxAM",f:"*/ sa th 2"},{n:"dyAM",f:"*/ ca th 2"},{n:"xA",f:"+- xM 0 dxAM"},{n:"yA",f:"+- yM dyAM 0"},{n:"xB",f:"+- xM dxAM 0"},{n:"yB",f:"+- yM 0 dyAM"},{n:"xBC",f:"+- hc 0 xB"},{n:"yBC",f:"*/ xBC ta 1"},{n:"yC",f:"+- yBC yB 0"},{n:"xD",f:"+- r 0 xB"},{n:"xE",f:"+- r 0 xA"},{n:"yFE",f:"+- vc 0 yA"},{n:"xFE",f:"*/ yFE 1 ta"},{n:"xF",f:"+- xE 0 xFE"},{n:"xL",f:"+- xA xFE 0"},{n:"yG",f:"+- b 0 yA"},{n:"yH",f:"+- b 0 yB"},{n:"yI",f:"+- b 0 yC"},{n:"xC2",f:"+- r 0 xM"},{n:"yC3",f:"+- b 0 yM"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"xA",y:"yA"}},{type:"lnTo",pt:{x:"xB",y:"yB"}},{type:"lnTo",pt:{x:"hc",y:"yC"}},{type:"lnTo",pt:{x:"xD",y:"yB"}},{type:"lnTo",pt:{x:"xE",y:"yA"}},{type:"lnTo",pt:{x:"xF",y:"vc"}},{type:"lnTo",pt:{x:"xE",y:"yG"}},{type:"lnTo",pt:{x:"xD",y:"yH"}},{type:"lnTo",pt:{x:"hc",y:"yI"}},{type:"lnTo",pt:{x:"xB",y:"yH"}},{type:"lnTo",pt:{x:"xA",y:"yG"}},{type:"lnTo",pt:{x:"xL",y:"vc"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},mathNotEqual:{avLst:[{n:"adj1",f:"val 23520"},{n:"adj2",f:"val 6600000"},{n:"adj3",f:"val 11760"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"crAng",f:"pin 4200000 adj2 6600000"},{n:"2a1",f:"*/ a1 2 1"},{n:"maxAdj3",f:"+- 100000 0 2a1"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"dy1",f:"*/ h a1 100000"},{n:"dy2",f:"*/ h a3 200000"},{n:"dx1",f:"*/ w 73490 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x8",f:"+- hc dx1 0"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"},{n:"y1",f:"+- y2 0 dy1"},{n:"y4",f:"+- y3 dy1 0"},{n:"cadj2",f:"+- crAng 0 cd4"},{n:"xadj2",f:"tan hd2 cadj2"},{n:"len",f:"mod xadj2 hd2 0"},{n:"bhw",f:"*/ len dy1 hd2"},{n:"bhw2",f:"*/ bhw 1 2"},{n:"x7",f:"+- hc xadj2 bhw2"},{n:"dx67",f:"*/ xadj2 y1 hd2"},{n:"x6",f:"+- x7 0 dx67"},{n:"dx57",f:"*/ xadj2 y2 hd2"},{n:"x5",f:"+- x7 0 dx57"},{n:"dx47",f:"*/ xadj2 y3 hd2"},{n:"x4",f:"+- x7 0 dx47"},{n:"dx37",f:"*/ xadj2 y4 hd2"},{n:"x3",f:"+- x7 0 dx37"},{n:"dx27",f:"*/ xadj2 2 1"},{n:"x2",f:"+- x7 0 dx27"},{n:"rx7",f:"+- x7 bhw 0"},{n:"rx6",f:"+- x6 bhw 0"},{n:"rx5",f:"+- x5 bhw 0"},{n:"rx4",f:"+- x4 bhw 0"},{n:"rx3",f:"+- x3 bhw 0"},{n:"rx2",f:"+- x2 bhw 0"},{n:"dx7",f:"*/ dy1 hd2 len"},{n:"rxt",f:"+- x7 dx7 0"},{n:"lxt",f:"+- rx7 0 dx7"},{n:"rx",f:"?: cadj2 rxt rx7"},{n:"lx",f:"?: cadj2 x7 lxt"},{n:"dy3",f:"*/ dy1 xadj2 len"},{n:"dy4",f:"+- 0 0 dy3"},{n:"ry",f:"?: cadj2 dy3 t"},{n:"ly",f:"?: cadj2 t dy4"},{n:"dlx",f:"+- w 0 rx"},{n:"drx",f:"+- w 0 lx"},{n:"dly",f:"+- h 0 ry"},{n:"dry",f:"+- h 0 ly"},{n:"xC1",f:"+/ rx lx 2"},{n:"xC2",f:"+/ drx dlx 2"},{n:"yC1",f:"+/ ry ly 2"},{n:"yC2",f:"+/ y1 y2 2"},{n:"yC3",f:"+/ y3 y4 2"},{n:"yC4",f:"+/ dry dly 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x6",y:"y1"}},{type:"lnTo",pt:{x:"lx",y:"ly"}},{type:"lnTo",pt:{x:"rx",y:"ry"}},{type:"lnTo",pt:{x:"rx6",y:"y1"}},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"lnTo",pt:{x:"x8",y:"y2"}},{type:"lnTo",pt:{x:"rx5",y:"y2"}},{type:"lnTo",pt:{x:"rx4",y:"y3"}},{type:"lnTo",pt:{x:"x8",y:"y3"}},{type:"lnTo",pt:{x:"x8",y:"y4"}},{type:"lnTo",pt:{x:"rx3",y:"y4"}},{type:"lnTo",pt:{x:"drx",y:"dry"}},{type:"lnTo",pt:{x:"dlx",y:"dly"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x5",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},mathPlus:{avLst:[{n:"adj1",f:"val 23520"}],gdLst:[{n:"a1",f:"pin 0 adj1 73490"},{n:"dx1",f:"*/ w 73490 200000"},{n:"dy1",f:"*/ h 73490 200000"},{n:"dx2",f:"*/ ss a1 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dx2"},{n:"y3",f:"+- vc dx2 0"},{n:"y4",f:"+- vc dy1 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},moon:{avLst:[{n:"adj",f:"val 50000"}],gdLst:[{n:"a",f:"pin 0 adj 87500"},{n:"g0",f:"*/ ss a 100000"},{n:"g0w",f:"*/ g0 w ss"},{n:"g1",f:"+- ss 0 g0"},{n:"g2",f:"*/ g0 g0 g1"},{n:"g3",f:"*/ ss ss g1"},{n:"g4",f:"*/ g3 2 1"},{n:"g5",f:"+- g4 0 g2"},{n:"g6",f:"+- g5 0 g0"},{n:"g6w",f:"*/ g6 w ss"},{n:"g7",f:"*/ g5 1 2"},{n:"g8",f:"+- g7 0 g0"},{n:"dy1",f:"*/ g8 hd2 ss"},{n:"g10h",f:"+- vc 0 dy1"},{n:"g11h",f:"+- vc dy1 0"},{n:"g12",f:"*/ g0 9598 32768"},{n:"g12w",f:"*/ g12 w ss"},{n:"g13",f:"+- ss 0 g12"},{n:"q1",f:"*/ ss ss 1"},{n:"q2",f:"*/ g13 g13 1"},{n:"q3",f:"+- q1 0 q2"},{n:"q4",f:"sqrt q3"},{n:"dy4",f:"*/ q4 hd2 ss"},{n:"g15h",f:"+- vc 0 dy4"},{n:"g16h",f:"+- vc dy4 0"},{n:"g17w",f:"+- g6w 0 g0w"},{n:"g18w",f:"*/ g17w 1 2"},{n:"dx2p",f:"+- g0w g18w w"},{n:"dx2",f:"*/ dx2p -1 1"},{n:"dy2",f:"*/ hd2 -1 1"},{n:"stAng1",f:"at2 dx2 dy2"},{n:"enAngp1",f:"at2 dx2 hd2"},{n:"enAng1",f:"+- enAngp1 0 21600000"},{n:"swAng1",f:"+- enAng1 0 stAng1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"r",y:"b"}},{type:"arcTo",wR:"w",hR:"hd2",stAng:"cd4",swAng:"cd2"},{type:"arcTo",wR:"g18w",hR:"dy1",stAng:"stAng1",swAng:"swAng1"},{type:"close"}],extrusionOk:!1,stroke:!0}]},nonIsoscelesTrapezoid:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"}],gdLst:[{n:"maxAdj",f:"*/ 50000 w ss"},{n:"a1",f:"pin 0 adj1 maxAdj"},{n:"a2",f:"pin 0 adj2 maxAdj"},{n:"x1",f:"*/ ss a1 200000"},{n:"x2",f:"*/ ss a1 100000"},{n:"dx3",f:"*/ ss a2 100000"},{n:"x3",f:"+- r 0 dx3"},{n:"x4",f:"+/ r x3 2"},{n:"il",f:"*/ wd3 a1 maxAdj"},{n:"adjm",f:"max a1 a2"},{n:"it",f:"*/ hd3 adjm maxAdj"},{n:"irt",f:"*/ wd3 a2 maxAdj"},{n:"ir",f:"+- r 0 irt"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},noSmoking:{avLst:[{n:"adj",f:"val 18750"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dr",f:"*/ ss a 100000"},{n:"iwd2",f:"+- wd2 0 dr"},{n:"ihd2",f:"+- hd2 0 dr"},{n:"ang",f:"at2 w h"},{n:"ct",f:"cos ihd2 ang"},{n:"st",f:"sin iwd2 ang"},{n:"m",f:"mod ct st 0"},{n:"n",f:"*/ iwd2 ihd2 m"},{n:"drd2",f:"*/ dr 1 2"},{n:"dang",f:"at2 n drd2"},{n:"dang2",f:"*/ dang 2 1"},{n:"swAng",f:"+- -10800000 dang2 0"},{n:"t3",f:"at2 w h"},{n:"stAng1",f:"+- t3 0 dang"},{n:"stAng2",f:"+- stAng1 0 cd2"},{n:"ct1",f:"cos ihd2 stAng1"},{n:"st1",f:"sin iwd2 stAng1"},{n:"m1",f:"mod ct1 st1 0"},{n:"n1",f:"*/ iwd2 ihd2 m1"},{n:"dx1",f:"cos n1 stAng1"},{n:"dy1",f:"sin n1 stAng1"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- vc dy1 0"},{n:"x2",f:"+- hc 0 dx1"},{n:"y2",f:"+- vc 0 dy1"},{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"3cd4",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"},{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"iwd2",hR:"ihd2",stAng:"stAng1",swAng:"swAng"},{type:"close"},{type:"moveTo",pt:{x:"x2",y:"y2"}},{type:"arcTo",wR:"iwd2",hR:"ihd2",stAng:"stAng2",swAng:"swAng"},{type:"close"}],extrusionOk:!1,stroke:!0}]},notchedRightArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 100000 w ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"dx2",f:"*/ ss a2 100000"},{n:"x2",f:"+- r 0 dx2"},{n:"dy1",f:"*/ h a1 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc dy1 0"},{n:"x1",f:"*/ dy1 dx2 hd2"},{n:"x3",f:"+- r 0 x1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"vc"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},octagon:{avLst:[{n:"adj",f:"val 29289"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"y2",f:"+- b 0 x1"},{n:"il",f:"*/ x1 1 2"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"x1"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"x1"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},parallelogram:{avLst:[{n:"adj",f:"val 25000"}],gdLst:[{n:"maxAdj",f:"*/ 100000 w ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"x1",f:"*/ ss a 200000"},{n:"x2",f:"*/ ss a 100000"},{n:"x6",f:"+- r 0 x1"},{n:"x5",f:"+- r 0 x2"},{n:"x3",f:"*/ x5 1 2"},{n:"x4",f:"+- r 0 x3"},{n:"il",f:"*/ wd2 a maxAdj"},{n:"q1",f:"*/ 5 a maxAdj"},{n:"q2",f:"+/ 1 q1 12"},{n:"il",f:"*/ q2 w 1"},{n:"it",f:"*/ q2 h 1"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 it"},{n:"q3",f:"*/ h hc x2"},{n:"y1",f:"pin 0 q3 h"},{n:"y2",f:"+- b 0 y1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"x5",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},pentagon:{avLst:[{n:"hf",f:"val 105146"},{n:"vf",f:"val 110557"}],gdLst:[{n:"swd2",f:"*/ wd2 hf 100000"},{n:"shd2",f:"*/ hd2 vf 100000"},{n:"svc",f:"*/ vc  vf 100000"},{n:"dx1",f:"cos swd2 1080000"},{n:"dx2",f:"cos swd2 18360000"},{n:"dy1",f:"sin shd2 1080000"},{n:"dy2",f:"sin shd2 18360000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"y1",f:"+- svc 0 dy1"},{n:"y2",f:"+- svc 0 dy2"},{n:"it",f:"*/ y1 dx2 dx1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},pie:{avLst:[{n:"adj1",f:"val 0"},{n:"adj2",f:"val 16200000"}],gdLst:[{n:"stAng",f:"pin 0 adj1 21599999"},{n:"enAng",f:"pin 0 adj2 21599999"},{n:"sw1",f:"+- enAng 0 stAng"},{n:"sw2",f:"+- sw1 21600000 0"},{n:"swAng",f:"?: sw1 sw1 sw2"},{n:"wt1",f:"sin wd2 stAng"},{n:"ht1",f:"cos hd2 stAng"},{n:"dx1",f:"cat2 wd2 ht1 wt1"},{n:"dy1",f:"sat2 hd2 ht1 wt1"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- vc dy1 0"},{n:"wt2",f:"sin wd2 enAng"},{n:"ht2",f:"cos hd2 enAng"},{n:"dx2",f:"cat2 wd2 ht2 wt2"},{n:"dy2",f:"sat2 hd2 ht2 wt2"},{n:"x2",f:"+- hc dx2 0"},{n:"y2",f:"+- vc dy2 0"},{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"stAng",swAng:"swAng"},{type:"lnTo",pt:{x:"hc",y:"vc"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},pieWedge:{gdLst:[{n:"g1",f:"cos w 13500000"},{n:"g2",f:"sin h 13500000"},{n:"x1",f:"+- r g1 0"},{n:"y1",f:"+- b g2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"arcTo",wR:"w",hR:"h",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},plaque:{avLst:[{n:"adj",f:"val 16667"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"y2",f:"+- b 0 x1"},{n:"il",f:"*/ x1 70711 100000"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"-5400000"},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"-5400000"},{type:"close"}],extrusionOk:!1,stroke:!0}]},plaqueTabs:{gdLst:[{n:"md",f:"mod w h 0"},{n:"dx",f:"*/ 1 md 20"},{n:"y1",f:"+- 0 b dx"},{n:"x1",f:"+- 0 r dx"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"dx",y:"t"}},{type:"arcTo",wR:"dx",hR:"dx",stAng:"0",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"arcTo",wR:"dx",hR:"dx",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"dx"}},{type:"arcTo",wR:"dx",hR:"dx",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"b"}},{type:"arcTo",wR:"dx",hR:"dx",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},plus:{avLst:[{n:"adj",f:"val 25000"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"y2",f:"+- b 0 x1"},{n:"d",f:"+- w 0 h"},{n:"il",f:"?: d l x1"},{n:"ir",f:"?: d r x2"},{n:"it",f:"?: d x1 t"},{n:"ib",f:"?: d y2 b"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"x1"}},{type:"lnTo",pt:{x:"x1",y:"x1"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"lnTo",pt:{x:"r",y:"x1"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},quadArrow:{avLst:[{n:"adj1",f:"val 22500"},{n:"adj2",f:"val 22500"},{n:"adj3",f:"val 22500"}],gdLst:[{n:"a2",f:"pin 0 adj2 50000"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"q1",f:"+- 100000 0 maxAdj1"},{n:"maxAdj3",f:"*/ q1 1 2"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"x1",f:"*/ ss a3 100000"},{n:"dx2",f:"*/ ss a2 100000"},{n:"x2",f:"+- hc 0 dx2"},{n:"x5",f:"+- hc dx2 0"},{n:"dx3",f:"*/ ss a1 200000"},{n:"x3",f:"+- hc 0 dx3"},{n:"x4",f:"+- hc dx3 0"},{n:"x6",f:"+- r 0 x1"},{n:"y2",f:"+- vc 0 dx2"},{n:"y5",f:"+- vc dx2 0"},{n:"y3",f:"+- vc 0 dx3"},{n:"y4",f:"+- vc dx3 0"},{n:"y6",f:"+- b 0 x1"},{n:"il",f:"*/ dx3 x1 dx2"},{n:"ir",f:"+- r 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"x1"}},{type:"lnTo",pt:{x:"x2",y:"x1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x5",y:"x1"}},{type:"lnTo",pt:{x:"x4",y:"x1"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"x6",y:"y3"}},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x6",y:"y5"}},{type:"lnTo",pt:{x:"x6",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"y6"}},{type:"lnTo",pt:{x:"x5",y:"y6"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"y6"}},{type:"lnTo",pt:{x:"x3",y:"y6"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"x1",y:"y5"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},quadArrowCallout:{avLst:[{n:"adj1",f:"val 18515"},{n:"adj2",f:"val 18515"},{n:"adj3",f:"val 18515"},{n:"adj4",f:"val 48123"}],gdLst:[{n:"a2",f:"pin 0 adj2 50000"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"+- 50000 0 a2"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q2",f:"*/ a3 2 1"},{n:"maxAdj4",f:"+- 100000 0 q2"},{n:"a4",f:"pin a1 adj4 maxAdj4"},{n:"dx2",f:"*/ ss a2 100000"},{n:"dx3",f:"*/ ss a1 200000"},{n:"ah",f:"*/ ss a3 100000"},{n:"dx1",f:"*/ w a4 200000"},{n:"dy1",f:"*/ h a4 200000"},{n:"x8",f:"+- r 0 ah"},{n:"x2",f:"+- hc 0 dx1"},{n:"x7",f:"+- hc dx1 0"},{n:"x3",f:"+- hc 0 dx2"},{n:"x6",f:"+- hc dx2 0"},{n:"x4",f:"+- hc 0 dx3"},{n:"x5",f:"+- hc dx3 0"},{n:"y8",f:"+- b 0 ah"},{n:"y2",f:"+- vc 0 dy1"},{n:"y7",f:"+- vc dy1 0"},{n:"y3",f:"+- vc 0 dx2"},{n:"y6",f:"+- vc dx2 0"},{n:"y4",f:"+- vc 0 dx3"},{n:"y5",f:"+- vc dx3 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"ah",y:"y3"}},{type:"lnTo",pt:{x:"ah",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"ah"}},{type:"lnTo",pt:{x:"x3",y:"ah"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x6",y:"ah"}},{type:"lnTo",pt:{x:"x5",y:"ah"}},{type:"lnTo",pt:{x:"x5",y:"y2"}},{type:"lnTo",pt:{x:"x7",y:"y2"}},{type:"lnTo",pt:{x:"x7",y:"y4"}},{type:"lnTo",pt:{x:"x8",y:"y4"}},{type:"lnTo",pt:{x:"x8",y:"y3"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x8",y:"y6"}},{type:"lnTo",pt:{x:"x8",y:"y5"}},{type:"lnTo",pt:{x:"x7",y:"y5"}},{type:"lnTo",pt:{x:"x7",y:"y7"}},{type:"lnTo",pt:{x:"x5",y:"y7"}},{type:"lnTo",pt:{x:"x5",y:"y8"}},{type:"lnTo",pt:{x:"x6",y:"y8"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"x3",y:"y8"}},{type:"lnTo",pt:{x:"x4",y:"y8"}},{type:"lnTo",pt:{x:"x4",y:"y7"}},{type:"lnTo",pt:{x:"x2",y:"y7"}},{type:"lnTo",pt:{x:"x2",y:"y5"}},{type:"lnTo",pt:{x:"ah",y:"y5"}},{type:"lnTo",pt:{x:"ah",y:"y6"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},rect:{pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},ribbon:{avLst:[{n:"adj1",f:"val 16667"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"a1",f:"pin 0 adj1 33333"},{n:"a2",f:"pin 25000 adj2 75000"},{n:"x10",f:"+- r 0 wd8"},{n:"dx2",f:"*/ w a2 200000"},{n:"x2",f:"+- hc 0 dx2"},{n:"x9",f:"+- hc dx2 0"},{n:"x3",f:"+- x2 wd32 0"},{n:"x8",f:"+- x9 0 wd32"},{n:"x5",f:"+- x2 wd8 0"},{n:"x6",f:"+- x9 0 wd8"},{n:"x4",f:"+- x5 0 wd32"},{n:"x7",f:"+- x6 wd32 0"},{n:"y1",f:"*/ h a1 200000"},{n:"y2",f:"*/ h a1 100000"},{n:"y4",f:"+- b 0 y2"},{n:"y3",f:"*/ y4 1 2"},{n:"hR",f:"*/ h a1 400000"},{n:"y5",f:"+- b 0 hR"},{n:"y6",f:"+- y2 0 hR"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x4",y:"t"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x8",y:"y2"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x7",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"x10",y:"y3"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"y5"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"x3",y:"b"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"l",y:"y4"}},{type:"lnTo",pt:{x:"wd8",y:"y3"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x5",y:"hR"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x5",y:"y2"}},{type:"close"},{type:"moveTo",pt:{x:"x6",y:"hR"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd2",swAng:"-5400000"},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x4",y:"t"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x8",y:"y2"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x7",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"x10",y:"y3"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"y5"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"x3",y:"b"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"l",y:"y4"}},{type:"lnTo",pt:{x:"wd8",y:"y3"}},{type:"close"},{type:"moveTo",pt:{x:"x5",y:"hR"}},{type:"lnTo",pt:{x:"x5",y:"y2"}},{type:"moveTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"x6",y:"hR"}},{type:"moveTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y6"}},{type:"moveTo",pt:{x:"x9",y:"y6"}},{type:"lnTo",pt:{x:"x9",y:"y4"}}],fill:"none",extrusionOk:!1,stroke:!0}]},ribbon2:{avLst:[{n:"adj1",f:"val 16667"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"a1",f:"pin 0 adj1 33333"},{n:"a2",f:"pin 25000 adj2 75000"},{n:"x10",f:"+- r 0 wd8"},{n:"dx2",f:"*/ w a2 200000"},{n:"x2",f:"+- hc 0 dx2"},{n:"x9",f:"+- hc dx2 0"},{n:"x3",f:"+- x2 wd32 0"},{n:"x8",f:"+- x9 0 wd32"},{n:"x5",f:"+- x2 wd8 0"},{n:"x6",f:"+- x9 0 wd8"},{n:"x4",f:"+- x5 0 wd32"},{n:"x7",f:"+- x6 wd32 0"},{n:"dy1",f:"*/ h a1 200000"},{n:"y1",f:"+- b 0 dy1"},{n:"dy2",f:"*/ h a1 100000"},{n:"y2",f:"+- b 0 dy2"},{n:"y4",f:"+- t dy2 0"},{n:"y3",f:"+/ y4 b 2"},{n:"hR",f:"*/ h a1 400000"},{n:"y6",f:"+- b 0 hR"},{n:"y7",f:"+- y1 0 hR"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x4",y:"b"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x8",y:"y2"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x7",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x10",y:"y3"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"hR"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"0",swAng:"-5400000"},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"l",y:"y4"}},{type:"lnTo",pt:{x:"wd8",y:"y3"}},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x5",y:"y6"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"0",swAng:"-5400000"},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x5",y:"y2"}},{type:"close"},{type:"moveTo",pt:{x:"x6",y:"y6"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"wd8",y:"y3"}},{type:"lnTo",pt:{x:"l",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"hR"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x8",y:"t"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x10",y:"y3"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x7",y:"b"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"arcTo",wR:"wd32",hR:"hR",stAng:"3cd4",swAng:"cd2"},{type:"close"},{type:"moveTo",pt:{x:"x5",y:"y2"}},{type:"lnTo",pt:{x:"x5",y:"y6"}},{type:"moveTo",pt:{x:"x6",y:"y6"}},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"moveTo",pt:{x:"x2",y:"y7"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"moveTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"x9",y:"y7"}}],fill:"none",extrusionOk:!1,stroke:!0}]},rightArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 100000 w ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"dx1",f:"*/ ss a2 100000"},{n:"x1",f:"+- r 0 dx1"},{n:"dy1",f:"*/ h a1 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc dy1 0"},{n:"dx2",f:"*/ y1 dx1 hd2"},{n:"x2",f:"+- x1 dx2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},rightArrowCallout:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 64977"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 h ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"*/ 100000 w ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q2",f:"*/ a3 ss w"},{n:"maxAdj4",f:"+- 100000 0 q2"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"dy1",f:"*/ ss a2 100000"},{n:"dy2",f:"*/ ss a1 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"},{n:"y4",f:"+- vc dy1 0"},{n:"dx3",f:"*/ ss a3 100000"},{n:"x3",f:"+- r 0 dx3"},{n:"x2",f:"*/ w a4 100000"},{n:"x1",f:"*/ x2 1 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},rightBrace:{avLst:[{n:"adj1",f:"val 8333"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"a2",f:"pin 0 adj2 100000"},{n:"q1",f:"+- 100000 0 a2"},{n:"q2",f:"min q1 a2"},{n:"q3",f:"*/ q2 1 2"},{n:"maxAdj1",f:"*/ q3 h ss"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"y1",f:"*/ ss a1 100000"},{n:"y3",f:"*/ h a2 100000"},{n:"y2",f:"+- y3 0 y1"},{n:"y4",f:"+- b 0 y1"},{n:"dx1",f:"cos wd2 2700000"},{n:"dy1",f:"sin y1 2700000"},{n:"ir",f:"+- l dx1 0"},{n:"it",f:"+- y1 0 dy1"},{n:"ib",f:"+- b dy1 y1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"hc",y:"y2"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd2",swAng:"-5400000"},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"hc",y:"y4"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"hc",y:"y2"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"cd2",swAng:"-5400000"},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"hc",y:"y4"}},{type:"arcTo",wR:"wd2",hR:"y1",stAng:"0",swAng:"cd4"}],fill:"none",extrusionOk:!1,stroke:!0}]},rightBracket:{avLst:[{n:"adj",f:"val 8333"}],gdLst:[{n:"maxAdj",f:"*/ 50000 h ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"y1",f:"*/ ss a 100000"},{n:"y2",f:"+- b 0 y1"},{n:"dx1",f:"cos w 2700000"},{n:"dy1",f:"sin y1 2700000"},{n:"ir",f:"+- l dx1 0"},{n:"it",f:"+- y1 0 dy1"},{n:"ib",f:"+- b dy1 y1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"0",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"arcTo",wR:"w",hR:"y1",stAng:"0",swAng:"cd4"}],fill:"none",extrusionOk:!1,stroke:!0}]},round1Rect:{avLst:[{n:"adj",f:"val 16667"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dx1",f:"*/ ss a 100000"},{n:"x1",f:"+- r 0 dx1"},{n:"idx",f:"*/ dx1 29289 100000"},{n:"ir",f:"+- r 0 idx"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"arcTo",wR:"dx1",hR:"dx1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},round2DiagRect:{avLst:[{n:"adj1",f:"val 16667"},{n:"adj2",f:"val 0"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"a2",f:"pin 0 adj2 50000"},{n:"x1",f:"*/ ss a1 100000"},{n:"y1",f:"+- b 0 x1"},{n:"a",f:"*/ ss a2 100000"},{n:"x2",f:"+- r 0 a"},{n:"y2",f:"+- b 0 a"},{n:"dx1",f:"*/ x1 29289 100000"},{n:"dx2",f:"*/ a 29289 100000"},{n:"d",f:"+- dx1 0 dx2"},{n:"dx",f:"?: d dx1 dx2"},{n:"ir",f:"+- r 0 dx"},{n:"ib",f:"+- b 0 dx"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"arcTo",wR:"a",hR:"a",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"a",y:"b"}},{type:"arcTo",wR:"a",hR:"a",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"l",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},round2SameRect:{avLst:[{n:"adj1",f:"val 16667"},{n:"adj2",f:"val 0"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"a2",f:"pin 0 adj2 50000"},{n:"tx1",f:"*/ ss a1 100000"},{n:"tx2",f:"+- r 0 tx1"},{n:"bx1",f:"*/ ss a2 100000"},{n:"bx2",f:"+- r 0 bx1"},{n:"by1",f:"+- b 0 bx1"},{n:"d",f:"+- tx1 0 bx1"},{n:"tdx",f:"*/ tx1 29289 100000"},{n:"bdx",f:"*/ bx1 29289 100000"},{n:"il",f:"?: d tdx bdx"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 bdx"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"tx1",y:"t"}},{type:"lnTo",pt:{x:"tx2",y:"t"}},{type:"arcTo",wR:"tx1",hR:"tx1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"by1"}},{type:"arcTo",wR:"bx1",hR:"bx1",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"bx1",y:"b"}},{type:"arcTo",wR:"bx1",hR:"bx1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"l",y:"tx1"}},{type:"arcTo",wR:"tx1",hR:"tx1",stAng:"cd2",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},roundRect:{avLst:[{n:"adj",f:"val 16667"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"x1",f:"*/ ss a 100000"},{n:"x2",f:"+- r 0 x1"},{n:"y2",f:"+- b 0 x1"},{n:"il",f:"*/ x1 29289 100000"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},rtTriangle:{gdLst:[{n:"it",f:"*/ h 7 12"},{n:"ir",f:"*/ w 7 12"},{n:"ib",f:"*/ h 11 12"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},smileyFace:{avLst:[{n:"adj",f:"val 4653"}],gdLst:[{n:"a",f:"pin -4653 adj 4653"},{n:"x1",f:"*/ w 4969 21699"},{n:"x2",f:"*/ w 6215 21600"},{n:"x3",f:"*/ w 13135 21600"},{n:"x4",f:"*/ w 16640 21600"},{n:"y1",f:"*/ h 7570 21600"},{n:"y3",f:"*/ h 16515 21600"},{n:"dy2",f:"*/ h a 100000"},{n:"y2",f:"+- y3 0 dy2"},{n:"y4",f:"+- y3 dy2 0"},{n:"dy3",f:"*/ h a 50000"},{n:"y5",f:"+- y4 dy3 0"},{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"},{n:"wR",f:"*/ w 1125 21600"},{n:"hR",f:"*/ h 1125 21600"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"21600000"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x2",y:"y1"}},{type:"arcTo",wR:"wR",hR:"hR",stAng:"cd2",swAng:"21600000"},{type:"moveTo",pt:{x:"x3",y:"y1"}},{type:"arcTo",wR:"wR",hR:"hR",stAng:"cd2",swAng:"21600000"}],fill:"darkenLess",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y2"}},{type:"quadBezTo",pts:[{x:"hc",y:"y5"},{x:"x4",y:"y2"}]}],fill:"none",extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"21600000"},{type:"close"}],fill:"none",extrusionOk:!1,stroke:!0}]},snip1Rect:{avLst:[{n:"adj",f:"val 16667"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dx1",f:"*/ ss a 100000"},{n:"x1",f:"+- r 0 dx1"},{n:"it",f:"*/ dx1 1 2"},{n:"ir",f:"+/ x1 r 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"r",y:"dx1"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},snip2DiagRect:{avLst:[{n:"adj1",f:"val 0"},{n:"adj2",f:"val 16667"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"a2",f:"pin 0 adj2 50000"},{n:"lx1",f:"*/ ss a1 100000"},{n:"lx2",f:"+- r 0 lx1"},{n:"ly1",f:"+- b 0 lx1"},{n:"rx1",f:"*/ ss a2 100000"},{n:"rx2",f:"+- r 0 rx1"},{n:"ry1",f:"+- b 0 rx1"},{n:"d",f:"+- lx1 0 rx1"},{n:"dx",f:"?: d lx1 rx1"},{n:"il",f:"*/ dx 1 2"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"lx1",y:"t"}},{type:"lnTo",pt:{x:"rx2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"rx1"}},{type:"lnTo",pt:{x:"r",y:"ly1"}},{type:"lnTo",pt:{x:"lx2",y:"b"}},{type:"lnTo",pt:{x:"rx1",y:"b"}},{type:"lnTo",pt:{x:"l",y:"ry1"}},{type:"lnTo",pt:{x:"l",y:"lx1"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},snip2SameRect:{avLst:[{n:"adj1",f:"val 16667"},{n:"adj2",f:"val 0"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"a2",f:"pin 0 adj2 50000"},{n:"tx1",f:"*/ ss a1 100000"},{n:"tx2",f:"+- r 0 tx1"},{n:"bx1",f:"*/ ss a2 100000"},{n:"bx2",f:"+- r 0 bx1"},{n:"by1",f:"+- b 0 bx1"},{n:"d",f:"+- tx1 0 bx1"},{n:"dx",f:"?: d tx1 bx1"},{n:"il",f:"*/ dx 1 2"},{n:"ir",f:"+- r 0 il"},{n:"it",f:"*/ tx1 1 2"},{n:"ib",f:"+/ by1 b 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"tx1",y:"t"}},{type:"lnTo",pt:{x:"tx2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"tx1"}},{type:"lnTo",pt:{x:"r",y:"by1"}},{type:"lnTo",pt:{x:"bx2",y:"b"}},{type:"lnTo",pt:{x:"bx1",y:"b"}},{type:"lnTo",pt:{x:"l",y:"by1"}},{type:"lnTo",pt:{x:"l",y:"tx1"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},snipRoundRect:{avLst:[{n:"adj1",f:"val 16667"},{n:"adj2",f:"val 16667"}],gdLst:[{n:"a1",f:"pin 0 adj1 50000"},{n:"a2",f:"pin 0 adj2 50000"},{n:"x1",f:"*/ ss a1 100000"},{n:"dx2",f:"*/ ss a2 100000"},{n:"x2",f:"+- r 0 dx2"},{n:"il",f:"*/ x1 29289 100000"},{n:"ir",f:"+/ x2 r 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"dx2"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"l",y:"x1"}},{type:"arcTo",wR:"x1",hR:"x1",stAng:"cd2",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},squareTabs:{gdLst:[{n:"md",f:"mod w h 0"},{n:"dx",f:"*/ 1 md 20"},{n:"y1",f:"+- 0 b dx"},{n:"x1",f:"+- 0 r dx"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"dx",y:"t"}},{type:"lnTo",pt:{x:"dx",y:"dx"}},{type:"lnTo",pt:{x:"l",y:"dx"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"dx",y:"y1"}},{type:"lnTo",pt:{x:"dx",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"dx"}},{type:"lnTo",pt:{x:"x1",y:"dx"}},{type:"close"}],extrusionOk:!1,stroke:!0},{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star10:{avLst:[{n:"adj",f:"val 42533"},{n:"hf",f:"val 105146"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"swd2",f:"*/ wd2 hf 100000"},{n:"dx1",f:"*/ swd2 95106 100000"},{n:"dx2",f:"*/ swd2 58779 100000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"dy1",f:"*/ hd2 80902 100000"},{n:"dy2",f:"*/ hd2 30902 100000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"},{n:"y4",f:"+- vc dy1 0"},{n:"iwd2",f:"*/ swd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx1",f:"*/ iwd2 80902 100000"},{n:"sdx2",f:"*/ iwd2 30902 100000"},{n:"sdy1",f:"*/ ihd2 95106 100000"},{n:"sdy2",f:"*/ ihd2 58779 100000"},{n:"sx1",f:"+- hc 0 iwd2"},{n:"sx2",f:"+- hc 0 sdx1"},{n:"sx3",f:"+- hc 0 sdx2"},{n:"sx4",f:"+- hc sdx2 0"},{n:"sx5",f:"+- hc sdx1 0"},{n:"sx6",f:"+- hc iwd2 0"},{n:"sy1",f:"+- vc 0 sdy1"},{n:"sy2",f:"+- vc 0 sdy2"},{n:"sy3",f:"+- vc sdy2 0"},{n:"sy4",f:"+- vc sdy1 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"sx2",y:"sy2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"sx3",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx4",y:"sy1"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"sx5",y:"sy2"}},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"lnTo",pt:{x:"sx6",y:"vc"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"sx5",y:"sy3"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"sx4",y:"sy4"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx3",y:"sy4"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"sx2",y:"sy3"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"sx1",y:"vc"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star12:{avLst:[{n:"adj",f:"val 37500"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dx1",f:"cos wd2 1800000"},{n:"dy1",f:"sin hd2 3600000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x3",f:"*/ w 3 4"},{n:"x4",f:"+- hc dx1 0"},{n:"y1",f:"+- vc 0 dy1"},{n:"y3",f:"*/ h 3 4"},{n:"y4",f:"+- vc dy1 0"},{n:"iwd2",f:"*/ wd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx1",f:"cos iwd2 900000"},{n:"sdx2",f:"cos iwd2 2700000"},{n:"sdx3",f:"cos iwd2 4500000"},{n:"sdy1",f:"sin ihd2 4500000"},{n:"sdy2",f:"sin ihd2 2700000"},{n:"sdy3",f:"sin ihd2 900000"},{n:"sx1",f:"+- hc 0 sdx1"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc 0 sdx3"},{n:"sx4",f:"+- hc sdx3 0"},{n:"sx5",f:"+- hc sdx2 0"},{n:"sx6",f:"+- hc sdx1 0"},{n:"sy1",f:"+- vc 0 sdy1"},{n:"sy2",f:"+- vc 0 sdy2"},{n:"sy3",f:"+- vc 0 sdy3"},{n:"sy4",f:"+- vc sdy3 0"},{n:"sy5",f:"+- vc sdy2 0"},{n:"sy6",f:"+- vc sdy1 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"sx1",y:"sy3"}},{type:"lnTo",pt:{x:"x1",y:"hd4"}},{type:"lnTo",pt:{x:"sx2",y:"sy2"}},{type:"lnTo",pt:{x:"wd4",y:"y1"}},{type:"lnTo",pt:{x:"sx3",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx4",y:"sy1"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"sx5",y:"sy2"}},{type:"lnTo",pt:{x:"x4",y:"hd4"}},{type:"lnTo",pt:{x:"sx6",y:"sy3"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"sx6",y:"sy4"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"sx5",y:"sy5"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"sx4",y:"sy6"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx3",y:"sy6"}},{type:"lnTo",pt:{x:"wd4",y:"y4"}},{type:"lnTo",pt:{x:"sx2",y:"sy5"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"sx1",y:"sy4"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star16:{avLst:[{n:"adj",f:"val 37500"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dx1",f:"*/ wd2 92388 100000"},{n:"dx2",f:"*/ wd2 70711 100000"},{n:"dx3",f:"*/ wd2 38268 100000"},{n:"dy1",f:"*/ hd2 92388 100000"},{n:"dy2",f:"*/ hd2 70711 100000"},{n:"dy3",f:"*/ hd2 38268 100000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc 0 dx3"},{n:"x4",f:"+- hc dx3 0"},{n:"x5",f:"+- hc dx2 0"},{n:"x6",f:"+- hc dx1 0"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc 0 dy3"},{n:"y4",f:"+- vc dy3 0"},{n:"y5",f:"+- vc dy2 0"},{n:"y6",f:"+- vc dy1 0"},{n:"iwd2",f:"*/ wd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx1",f:"*/ iwd2 98079 100000"},{n:"sdx2",f:"*/ iwd2 83147 100000"},{n:"sdx3",f:"*/ iwd2 55557 100000"},{n:"sdx4",f:"*/ iwd2 19509 100000"},{n:"sdy1",f:"*/ ihd2 98079 100000"},{n:"sdy2",f:"*/ ihd2 83147 100000"},{n:"sdy3",f:"*/ ihd2 55557 100000"},{n:"sdy4",f:"*/ ihd2 19509 100000"},{n:"sx1",f:"+- hc 0 sdx1"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc 0 sdx3"},{n:"sx4",f:"+- hc 0 sdx4"},{n:"sx5",f:"+- hc sdx4 0"},{n:"sx6",f:"+- hc sdx3 0"},{n:"sx7",f:"+- hc sdx2 0"},{n:"sx8",f:"+- hc sdx1 0"},{n:"sy1",f:"+- vc 0 sdy1"},{n:"sy2",f:"+- vc 0 sdy2"},{n:"sy3",f:"+- vc 0 sdy3"},{n:"sy4",f:"+- vc 0 sdy4"},{n:"sy5",f:"+- vc sdy4 0"},{n:"sy6",f:"+- vc sdy3 0"},{n:"sy7",f:"+- vc sdy2 0"},{n:"sy8",f:"+- vc sdy1 0"},{n:"idx",f:"cos iwd2 2700000"},{n:"idy",f:"sin ihd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"it",f:"+- vc 0 idy"},{n:"ir",f:"+- hc idx 0"},{n:"ib",f:"+- vc idy 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"sx1",y:"sy4"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"sx2",y:"sy3"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"sx3",y:"sy2"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"sx4",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx5",y:"sy1"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"sx6",y:"sy2"}},{type:"lnTo",pt:{x:"x5",y:"y2"}},{type:"lnTo",pt:{x:"sx7",y:"sy3"}},{type:"lnTo",pt:{x:"x6",y:"y3"}},{type:"lnTo",pt:{x:"sx8",y:"sy4"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"sx8",y:"sy5"}},{type:"lnTo",pt:{x:"x6",y:"y4"}},{type:"lnTo",pt:{x:"sx7",y:"sy6"}},{type:"lnTo",pt:{x:"x5",y:"y5"}},{type:"lnTo",pt:{x:"sx6",y:"sy7"}},{type:"lnTo",pt:{x:"x4",y:"y6"}},{type:"lnTo",pt:{x:"sx5",y:"sy8"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx4",y:"sy8"}},{type:"lnTo",pt:{x:"x3",y:"y6"}},{type:"lnTo",pt:{x:"sx3",y:"sy7"}},{type:"lnTo",pt:{x:"x2",y:"y5"}},{type:"lnTo",pt:{x:"sx2",y:"sy6"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"sx1",y:"sy5"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star24:{avLst:[{n:"adj",f:"val 37500"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dx1",f:"cos wd2 900000"},{n:"dx2",f:"cos wd2 1800000"},{n:"dx3",f:"cos wd2 2700000"},{n:"dx4",f:"val wd4"},{n:"dx5",f:"cos wd2 4500000"},{n:"dy1",f:"sin hd2 4500000"},{n:"dy2",f:"sin hd2 3600000"},{n:"dy3",f:"sin hd2 2700000"},{n:"dy4",f:"val hd4"},{n:"dy5",f:"sin hd2 900000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc 0 dx3"},{n:"x4",f:"+- hc 0 dx4"},{n:"x5",f:"+- hc 0 dx5"},{n:"x6",f:"+- hc dx5 0"},{n:"x7",f:"+- hc dx4 0"},{n:"x8",f:"+- hc dx3 0"},{n:"x9",f:"+- hc dx2 0"},{n:"x10",f:"+- hc dx1 0"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc 0 dy3"},{n:"y4",f:"+- vc 0 dy4"},{n:"y5",f:"+- vc 0 dy5"},{n:"y6",f:"+- vc dy5 0"},{n:"y7",f:"+- vc dy4 0"},{n:"y8",f:"+- vc dy3 0"},{n:"y9",f:"+- vc dy2 0"},{n:"y10",f:"+- vc dy1 0"},{n:"iwd2",f:"*/ wd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx1",f:"*/ iwd2 99144 100000"},{n:"sdx2",f:"*/ iwd2 92388 100000"},{n:"sdx3",f:"*/ iwd2 79335 100000"},{n:"sdx4",f:"*/ iwd2 60876 100000"},{n:"sdx5",f:"*/ iwd2 38268 100000"},{n:"sdx6",f:"*/ iwd2 13053 100000"},{n:"sdy1",f:"*/ ihd2 99144 100000"},{n:"sdy2",f:"*/ ihd2 92388 100000"},{n:"sdy3",f:"*/ ihd2 79335 100000"},{n:"sdy4",f:"*/ ihd2 60876 100000"},{n:"sdy5",f:"*/ ihd2 38268 100000"},{n:"sdy6",f:"*/ ihd2 13053 100000"},{n:"sx1",f:"+- hc 0 sdx1"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc 0 sdx3"},{n:"sx4",f:"+- hc 0 sdx4"},{n:"sx5",f:"+- hc 0 sdx5"},{n:"sx6",f:"+- hc 0 sdx6"},{n:"sx7",f:"+- hc sdx6 0"},{n:"sx8",f:"+- hc sdx5 0"},{n:"sx9",f:"+- hc sdx4 0"},{n:"sx10",f:"+- hc sdx3 0"},{n:"sx11",f:"+- hc sdx2 0"},{n:"sx12",f:"+- hc sdx1 0"},{n:"sy1",f:"+- vc 0 sdy1"},{n:"sy2",f:"+- vc 0 sdy2"},{n:"sy3",f:"+- vc 0 sdy3"},{n:"sy4",f:"+- vc 0 sdy4"},{n:"sy5",f:"+- vc 0 sdy5"},{n:"sy6",f:"+- vc 0 sdy6"},{n:"sy7",f:"+- vc sdy6 0"},{n:"sy8",f:"+- vc sdy5 0"},{n:"sy9",f:"+- vc sdy4 0"},{n:"sy10",f:"+- vc sdy3 0"},{n:"sy11",f:"+- vc sdy2 0"},{n:"sy12",f:"+- vc sdy1 0"},{n:"idx",f:"cos iwd2 2700000"},{n:"idy",f:"sin ihd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"it",f:"+- vc 0 idy"},{n:"ir",f:"+- hc idx 0"},{n:"ib",f:"+- vc idy 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"sx1",y:"sy6"}},{type:"lnTo",pt:{x:"x1",y:"y5"}},{type:"lnTo",pt:{x:"sx2",y:"sy5"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"sx3",y:"sy4"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"sx4",y:"sy3"}},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"lnTo",pt:{x:"sx5",y:"sy2"}},{type:"lnTo",pt:{x:"x5",y:"y1"}},{type:"lnTo",pt:{x:"sx6",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx7",y:"sy1"}},{type:"lnTo",pt:{x:"x6",y:"y1"}},{type:"lnTo",pt:{x:"sx8",y:"sy2"}},{type:"lnTo",pt:{x:"x7",y:"y2"}},{type:"lnTo",pt:{x:"sx9",y:"sy3"}},{type:"lnTo",pt:{x:"x8",y:"y3"}},{type:"lnTo",pt:{x:"sx10",y:"sy4"}},{type:"lnTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"sx11",y:"sy5"}},{type:"lnTo",pt:{x:"x10",y:"y5"}},{type:"lnTo",pt:{x:"sx12",y:"sy6"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"sx12",y:"sy7"}},{type:"lnTo",pt:{x:"x10",y:"y6"}},{type:"lnTo",pt:{x:"sx11",y:"sy8"}},{type:"lnTo",pt:{x:"x9",y:"y7"}},{type:"lnTo",pt:{x:"sx10",y:"sy9"}},{type:"lnTo",pt:{x:"x8",y:"y8"}},{type:"lnTo",pt:{x:"sx9",y:"sy10"}},{type:"lnTo",pt:{x:"x7",y:"y9"}},{type:"lnTo",pt:{x:"sx8",y:"sy11"}},{type:"lnTo",pt:{x:"x6",y:"y10"}},{type:"lnTo",pt:{x:"sx7",y:"sy12"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx6",y:"sy12"}},{type:"lnTo",pt:{x:"x5",y:"y10"}},{type:"lnTo",pt:{x:"sx5",y:"sy11"}},{type:"lnTo",pt:{x:"x4",y:"y9"}},{type:"lnTo",pt:{x:"sx4",y:"sy10"}},{type:"lnTo",pt:{x:"x3",y:"y8"}},{type:"lnTo",pt:{x:"sx3",y:"sy9"}},{type:"lnTo",pt:{x:"x2",y:"y7"}},{type:"lnTo",pt:{x:"sx2",y:"sy8"}},{type:"lnTo",pt:{x:"x1",y:"y6"}},{type:"lnTo",pt:{x:"sx1",y:"sy7"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star32:{avLst:[{n:"adj",f:"val 37500"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dx1",f:"*/ wd2 98079 100000"},{n:"dx2",f:"*/ wd2 92388 100000"},{n:"dx3",f:"*/ wd2 83147 100000"},{n:"dx4",f:"cos wd2 2700000"},{n:"dx5",f:"*/ wd2 55557 100000"},{n:"dx6",f:"*/ wd2 38268 100000"},{n:"dx7",f:"*/ wd2 19509 100000"},{n:"dy1",f:"*/ hd2 98079 100000"},{n:"dy2",f:"*/ hd2 92388 100000"},{n:"dy3",f:"*/ hd2 83147 100000"},{n:"dy4",f:"sin hd2 2700000"},{n:"dy5",f:"*/ hd2 55557 100000"},{n:"dy6",f:"*/ hd2 38268 100000"},{n:"dy7",f:"*/ hd2 19509 100000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc 0 dx3"},{n:"x4",f:"+- hc 0 dx4"},{n:"x5",f:"+- hc 0 dx5"},{n:"x6",f:"+- hc 0 dx6"},{n:"x7",f:"+- hc 0 dx7"},{n:"x8",f:"+- hc dx7 0"},{n:"x9",f:"+- hc dx6 0"},{n:"x10",f:"+- hc dx5 0"},{n:"x11",f:"+- hc dx4 0"},{n:"x12",f:"+- hc dx3 0"},{n:"x13",f:"+- hc dx2 0"},{n:"x14",f:"+- hc dx1 0"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc 0 dy3"},{n:"y4",f:"+- vc 0 dy4"},{n:"y5",f:"+- vc 0 dy5"},{n:"y6",f:"+- vc 0 dy6"},{n:"y7",f:"+- vc 0 dy7"},{n:"y8",f:"+- vc dy7 0"},{n:"y9",f:"+- vc dy6 0"},{n:"y10",f:"+- vc dy5 0"},{n:"y11",f:"+- vc dy4 0"},{n:"y12",f:"+- vc dy3 0"},{n:"y13",f:"+- vc dy2 0"},{n:"y14",f:"+- vc dy1 0"},{n:"iwd2",f:"*/ wd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx1",f:"*/ iwd2 99518 100000"},{n:"sdx2",f:"*/ iwd2 95694 100000"},{n:"sdx3",f:"*/ iwd2 88192 100000"},{n:"sdx4",f:"*/ iwd2 77301 100000"},{n:"sdx5",f:"*/ iwd2 63439 100000"},{n:"sdx6",f:"*/ iwd2 47140 100000"},{n:"sdx7",f:"*/ iwd2 29028 100000"},{n:"sdx8",f:"*/ iwd2 9802 100000"},{n:"sdy1",f:"*/ ihd2 99518 100000"},{n:"sdy2",f:"*/ ihd2 95694 100000"},{n:"sdy3",f:"*/ ihd2 88192 100000"},{n:"sdy4",f:"*/ ihd2 77301 100000"},{n:"sdy5",f:"*/ ihd2 63439 100000"},{n:"sdy6",f:"*/ ihd2 47140 100000"},{n:"sdy7",f:"*/ ihd2 29028 100000"},{n:"sdy8",f:"*/ ihd2 9802 100000"},{n:"sx1",f:"+- hc 0 sdx1"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc 0 sdx3"},{n:"sx4",f:"+- hc 0 sdx4"},{n:"sx5",f:"+- hc 0 sdx5"},{n:"sx6",f:"+- hc 0 sdx6"},{n:"sx7",f:"+- hc 0 sdx7"},{n:"sx8",f:"+- hc 0 sdx8"},{n:"sx9",f:"+- hc sdx8 0"},{n:"sx10",f:"+- hc sdx7 0"},{n:"sx11",f:"+- hc sdx6 0"},{n:"sx12",f:"+- hc sdx5 0"},{n:"sx13",f:"+- hc sdx4 0"},{n:"sx14",f:"+- hc sdx3 0"},{n:"sx15",f:"+- hc sdx2 0"},{n:"sx16",f:"+- hc sdx1 0"},{n:"sy1",f:"+- vc 0 sdy1"},{n:"sy2",f:"+- vc 0 sdy2"},{n:"sy3",f:"+- vc 0 sdy3"},{n:"sy4",f:"+- vc 0 sdy4"},{n:"sy5",f:"+- vc 0 sdy5"},{n:"sy6",f:"+- vc 0 sdy6"},{n:"sy7",f:"+- vc 0 sdy7"},{n:"sy8",f:"+- vc 0 sdy8"},{n:"sy9",f:"+- vc sdy8 0"},{n:"sy10",f:"+- vc sdy7 0"},{n:"sy11",f:"+- vc sdy6 0"},{n:"sy12",f:"+- vc sdy5 0"},{n:"sy13",f:"+- vc sdy4 0"},{n:"sy14",f:"+- vc sdy3 0"},{n:"sy15",f:"+- vc sdy2 0"},{n:"sy16",f:"+- vc sdy1 0"},{n:"idx",f:"cos iwd2 2700000"},{n:"idy",f:"sin ihd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"it",f:"+- vc 0 idy"},{n:"ir",f:"+- hc idx 0"},{n:"ib",f:"+- vc idy 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"sx1",y:"sy8"}},{type:"lnTo",pt:{x:"x1",y:"y7"}},{type:"lnTo",pt:{x:"sx2",y:"sy7"}},{type:"lnTo",pt:{x:"x2",y:"y6"}},{type:"lnTo",pt:{x:"sx3",y:"sy6"}},{type:"lnTo",pt:{x:"x3",y:"y5"}},{type:"lnTo",pt:{x:"sx4",y:"sy5"}},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"lnTo",pt:{x:"sx5",y:"sy4"}},{type:"lnTo",pt:{x:"x5",y:"y3"}},{type:"lnTo",pt:{x:"sx6",y:"sy3"}},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"sx7",y:"sy2"}},{type:"lnTo",pt:{x:"x7",y:"y1"}},{type:"lnTo",pt:{x:"sx8",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx9",y:"sy1"}},{type:"lnTo",pt:{x:"x8",y:"y1"}},{type:"lnTo",pt:{x:"sx10",y:"sy2"}},{type:"lnTo",pt:{x:"x9",y:"y2"}},{type:"lnTo",pt:{x:"sx11",y:"sy3"}},{type:"lnTo",pt:{x:"x10",y:"y3"}},{type:"lnTo",pt:{x:"sx12",y:"sy4"}},{type:"lnTo",pt:{x:"x11",y:"y4"}},{type:"lnTo",pt:{x:"sx13",y:"sy5"}},{type:"lnTo",pt:{x:"x12",y:"y5"}},{type:"lnTo",pt:{x:"sx14",y:"sy6"}},{type:"lnTo",pt:{x:"x13",y:"y6"}},{type:"lnTo",pt:{x:"sx15",y:"sy7"}},{type:"lnTo",pt:{x:"x14",y:"y7"}},{type:"lnTo",pt:{x:"sx16",y:"sy8"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"sx16",y:"sy9"}},{type:"lnTo",pt:{x:"x14",y:"y8"}},{type:"lnTo",pt:{x:"sx15",y:"sy10"}},{type:"lnTo",pt:{x:"x13",y:"y9"}},{type:"lnTo",pt:{x:"sx14",y:"sy11"}},{type:"lnTo",pt:{x:"x12",y:"y10"}},{type:"lnTo",pt:{x:"sx13",y:"sy12"}},{type:"lnTo",pt:{x:"x11",y:"y11"}},{type:"lnTo",pt:{x:"sx12",y:"sy13"}},{type:"lnTo",pt:{x:"x10",y:"y12"}},{type:"lnTo",pt:{x:"sx11",y:"sy14"}},{type:"lnTo",pt:{x:"x9",y:"y13"}},{type:"lnTo",pt:{x:"sx10",y:"sy15"}},{type:"lnTo",pt:{x:"x8",y:"y14"}},{type:"lnTo",pt:{x:"sx9",y:"sy16"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx8",y:"sy16"}},{type:"lnTo",pt:{x:"x7",y:"y14"}},{type:"lnTo",pt:{x:"sx7",y:"sy15"}},{type:"lnTo",pt:{x:"x6",y:"y13"}},{type:"lnTo",pt:{x:"sx6",y:"sy14"}},{type:"lnTo",pt:{x:"x5",y:"y12"}},{type:"lnTo",pt:{x:"sx5",y:"sy13"}},{type:"lnTo",pt:{x:"x4",y:"y11"}},{type:"lnTo",pt:{x:"sx4",y:"sy12"}},{type:"lnTo",pt:{x:"x3",y:"y10"}},{type:"lnTo",pt:{x:"sx3",y:"sy11"}},{type:"lnTo",pt:{x:"x2",y:"y9"}},{type:"lnTo",pt:{x:"sx2",y:"sy10"}},{type:"lnTo",pt:{x:"x1",y:"y8"}},{type:"lnTo",pt:{x:"sx1",y:"sy9"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star4:{avLst:[{n:"adj",f:"val 12500"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"iwd2",f:"*/ wd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx",f:"cos iwd2 2700000"},{n:"sdy",f:"sin ihd2 2700000"},{n:"sx1",f:"+- hc 0 sdx"},{n:"sx2",f:"+- hc sdx 0"},{n:"sy1",f:"+- vc 0 sdy"},{n:"sy2",f:"+- vc sdy 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"sx1",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx2",y:"sy1"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"sx2",y:"sy2"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx1",y:"sy2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star5:{avLst:[{n:"adj",f:"val 19098"},{n:"hf",f:"val 105146"},{n:"vf",f:"val 110557"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"swd2",f:"*/ wd2 hf 100000"},{n:"shd2",f:"*/ hd2 vf 100000"},{n:"svc",f:"*/ vc  vf 100000"},{n:"dx1",f:"cos swd2 1080000"},{n:"dx2",f:"cos swd2 18360000"},{n:"dy1",f:"sin shd2 1080000"},{n:"dy2",f:"sin shd2 18360000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"y1",f:"+- svc 0 dy1"},{n:"y2",f:"+- svc 0 dy2"},{n:"iwd2",f:"*/ swd2 a 50000"},{n:"ihd2",f:"*/ shd2 a 50000"},{n:"sdx1",f:"cos iwd2 20520000"},{n:"sdx2",f:"cos iwd2 3240000"},{n:"sdy1",f:"sin ihd2 3240000"},{n:"sdy2",f:"sin ihd2 20520000"},{n:"sx1",f:"+- hc 0 sdx1"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc sdx2 0"},{n:"sx4",f:"+- hc sdx1 0"},{n:"sy1",f:"+- svc 0 sdy1"},{n:"sy2",f:"+- svc 0 sdy2"},{n:"sy3",f:"+- svc ihd2 0"},{n:"yAdj",f:"+- svc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"sx2",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx3",y:"sy1"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"sx4",y:"sy2"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"hc",y:"sy3"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"sx1",y:"sy2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star6:{avLst:[{n:"adj",f:"val 28868"},{n:"hf",f:"val 115470"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"swd2",f:"*/ wd2 hf 100000"},{n:"dx1",f:"cos swd2 1800000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc dx1 0"},{n:"y2",f:"+- vc hd4 0"},{n:"iwd2",f:"*/ swd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx2",f:"*/ iwd2 1 2"},{n:"sx1",f:"+- hc 0 iwd2"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc sdx2 0"},{n:"sx4",f:"+- hc iwd2 0"},{n:"sdy1",f:"sin ihd2 3600000"},{n:"sy1",f:"+- vc 0 sdy1"},{n:"sy2",f:"+- vc sdy1 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"hd4"}},{type:"lnTo",pt:{x:"sx2",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx3",y:"sy1"}},{type:"lnTo",pt:{x:"x2",y:"hd4"}},{type:"lnTo",pt:{x:"sx4",y:"vc"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"sx3",y:"sy2"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx2",y:"sy2"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"sx1",y:"vc"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star7:{avLst:[{n:"adj",f:"val 34601"},{n:"hf",f:"val 102572"},{n:"vf",f:"val 105210"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"swd2",f:"*/ wd2 hf 100000"},{n:"shd2",f:"*/ hd2 vf 100000"},{n:"svc",f:"*/ vc  vf 100000"},{n:"dx1",f:"*/ swd2 97493 100000"},{n:"dx2",f:"*/ swd2 78183 100000"},{n:"dx3",f:"*/ swd2 43388 100000"},{n:"dy1",f:"*/ shd2 62349 100000"},{n:"dy2",f:"*/ shd2 22252 100000"},{n:"dy3",f:"*/ shd2 90097 100000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc 0 dx3"},{n:"x4",f:"+- hc dx3 0"},{n:"x5",f:"+- hc dx2 0"},{n:"x6",f:"+- hc dx1 0"},{n:"y1",f:"+- svc 0 dy1"},{n:"y2",f:"+- svc dy2 0"},{n:"y3",f:"+- svc dy3 0"},{n:"iwd2",f:"*/ swd2 a 50000"},{n:"ihd2",f:"*/ shd2 a 50000"},{n:"sdx1",f:"*/ iwd2 97493 100000"},{n:"sdx2",f:"*/ iwd2 78183 100000"},{n:"sdx3",f:"*/ iwd2 43388 100000"},{n:"sx1",f:"+- hc 0 sdx1"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc 0 sdx3"},{n:"sx4",f:"+- hc sdx3 0"},{n:"sx5",f:"+- hc sdx2 0"},{n:"sx6",f:"+- hc sdx1 0"},{n:"sdy1",f:"*/ ihd2 90097 100000"},{n:"sdy2",f:"*/ ihd2 22252 100000"},{n:"sdy3",f:"*/ ihd2 62349 100000"},{n:"sy1",f:"+- svc 0 sdy1"},{n:"sy2",f:"+- svc 0 sdy2"},{n:"sy3",f:"+- svc sdy3 0"},{n:"sy4",f:"+- svc ihd2 0"},{n:"yAdj",f:"+- svc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"sx1",y:"sy2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"sx3",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx4",y:"sy1"}},{type:"lnTo",pt:{x:"x5",y:"y1"}},{type:"lnTo",pt:{x:"sx6",y:"sy2"}},{type:"lnTo",pt:{x:"x6",y:"y2"}},{type:"lnTo",pt:{x:"sx5",y:"sy3"}},{type:"lnTo",pt:{x:"x4",y:"y3"}},{type:"lnTo",pt:{x:"hc",y:"sy4"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"sx2",y:"sy3"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},star8:{avLst:[{n:"adj",f:"val 37500"}],gdLst:[{n:"a",f:"pin 0 adj 50000"},{n:"dx1",f:"cos wd2 2700000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc dx1 0"},{n:"dy1",f:"sin hd2 2700000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc dy1 0"},{n:"iwd2",f:"*/ wd2 a 50000"},{n:"ihd2",f:"*/ hd2 a 50000"},{n:"sdx1",f:"*/ iwd2 92388 100000"},{n:"sdx2",f:"*/ iwd2 38268 100000"},{n:"sdy1",f:"*/ ihd2 92388 100000"},{n:"sdy2",f:"*/ ihd2 38268 100000"},{n:"sx1",f:"+- hc 0 sdx1"},{n:"sx2",f:"+- hc 0 sdx2"},{n:"sx3",f:"+- hc sdx2 0"},{n:"sx4",f:"+- hc sdx1 0"},{n:"sy1",f:"+- vc 0 sdy1"},{n:"sy2",f:"+- vc 0 sdy2"},{n:"sy3",f:"+- vc sdy2 0"},{n:"sy4",f:"+- vc sdy1 0"},{n:"yAdj",f:"+- vc 0 ihd2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"sx1",y:"sy2"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"sx2",y:"sy1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"sx3",y:"sy1"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"sx4",y:"sy2"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"sx4",y:"sy3"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"sx3",y:"sy4"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"sx2",y:"sy4"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"lnTo",pt:{x:"sx1",y:"sy3"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},straightConnector1:{pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}}],fill:"none",extrusionOk:!1,stroke:!0}]},stripedRightArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 84375 w ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"x4",f:"*/ ss 5 32"},{n:"dx5",f:"*/ ss a2 100000"},{n:"x5",f:"+- r 0 dx5"},{n:"dy1",f:"*/ h a1 200000"},{n:"y1",f:"+- vc 0 dy1"},{n:"y2",f:"+- vc dy1 0"},{n:"dx6",f:"*/ dy1 dx5 hd2"},{n:"x6",f:"+- r 0 dx6"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y1"}},{type:"lnTo",pt:{x:"ssd32",y:"y1"}},{type:"lnTo",pt:{x:"ssd32",y:"y2"}},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"close"},{type:"moveTo",pt:{x:"ssd16",y:"y1"}},{type:"lnTo",pt:{x:"ssd8",y:"y1"}},{type:"lnTo",pt:{x:"ssd8",y:"y2"}},{type:"lnTo",pt:{x:"ssd16",y:"y2"}},{type:"close"},{type:"moveTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x5",y:"y1"}},{type:"lnTo",pt:{x:"x5",y:"t"}},{type:"lnTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x5",y:"b"}},{type:"lnTo",pt:{x:"x5",y:"y2"}},{type:"lnTo",pt:{x:"x4",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},sun:{avLst:[{n:"adj",f:"val 25000"}],gdLst:[{n:"a",f:"pin 12500 adj 46875"},{n:"g0",f:"+- 50000 0 a"},{n:"g1",f:"*/ g0 30274 32768"},{n:"g2",f:"*/ g0 12540 32768"},{n:"g3",f:"+- g1 50000 0"},{n:"g4",f:"+- g2 50000 0"},{n:"g5",f:"+- 50000 0 g1"},{n:"g6",f:"+- 50000 0 g2"},{n:"g7",f:"*/ g0 23170 32768"},{n:"g8",f:"+- 50000 g7 0"},{n:"g9",f:"+- 50000 0 g7"},{n:"g10",f:"*/ g5 3 4"},{n:"g11",f:"*/ g6 3 4"},{n:"g12",f:"+- g10 3662 0"},{n:"g13",f:"+- g11 3662 0"},{n:"g14",f:"+- g11 12500 0"},{n:"g15",f:"+- 100000 0 g10"},{n:"g16",f:"+- 100000 0 g12"},{n:"g17",f:"+- 100000 0 g13"},{n:"g18",f:"+- 100000 0 g14"},{n:"ox1",f:"*/ w 18436 21600"},{n:"oy1",f:"*/ h 3163 21600"},{n:"ox2",f:"*/ w 3163 21600"},{n:"oy2",f:"*/ h 18436 21600"},{n:"x8",f:"*/ w g8 100000"},{n:"x9",f:"*/ w g9 100000"},{n:"x10",f:"*/ w g10 100000"},{n:"x12",f:"*/ w g12 100000"},{n:"x13",f:"*/ w g13 100000"},{n:"x14",f:"*/ w g14 100000"},{n:"x15",f:"*/ w g15 100000"},{n:"x16",f:"*/ w g16 100000"},{n:"x17",f:"*/ w g17 100000"},{n:"x18",f:"*/ w g18 100000"},{n:"x19",f:"*/ w a 100000"},{n:"wR",f:"*/ w g0 100000"},{n:"hR",f:"*/ h g0 100000"},{n:"y8",f:"*/ h g8 100000"},{n:"y9",f:"*/ h g9 100000"},{n:"y10",f:"*/ h g10 100000"},{n:"y12",f:"*/ h g12 100000"},{n:"y13",f:"*/ h g13 100000"},{n:"y14",f:"*/ h g14 100000"},{n:"y15",f:"*/ h g15 100000"},{n:"y16",f:"*/ h g16 100000"},{n:"y17",f:"*/ h g17 100000"},{n:"y18",f:"*/ h g18 100000"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"r",y:"vc"}},{type:"lnTo",pt:{x:"x15",y:"y18"}},{type:"lnTo",pt:{x:"x15",y:"y14"}},{type:"close"},{type:"moveTo",pt:{x:"ox1",y:"oy1"}},{type:"lnTo",pt:{x:"x16",y:"y13"}},{type:"lnTo",pt:{x:"x17",y:"y12"}},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x18",y:"y10"}},{type:"lnTo",pt:{x:"x14",y:"y10"}},{type:"close"},{type:"moveTo",pt:{x:"ox2",y:"oy1"}},{type:"lnTo",pt:{x:"x13",y:"y12"}},{type:"lnTo",pt:{x:"x12",y:"y13"}},{type:"close"},{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"lnTo",pt:{x:"x10",y:"y14"}},{type:"lnTo",pt:{x:"x10",y:"y18"}},{type:"close"},{type:"moveTo",pt:{x:"ox2",y:"oy2"}},{type:"lnTo",pt:{x:"x12",y:"y17"}},{type:"lnTo",pt:{x:"x13",y:"y16"}},{type:"close"},{type:"moveTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"x14",y:"y15"}},{type:"lnTo",pt:{x:"x18",y:"y15"}},{type:"close"},{type:"moveTo",pt:{x:"ox1",y:"oy2"}},{type:"lnTo",pt:{x:"x17",y:"y16"}},{type:"lnTo",pt:{x:"x16",y:"y17"}},{type:"close"},{type:"moveTo",pt:{x:"x19",y:"vc"}},{type:"arcTo",wR:"wR",hR:"hR",stAng:"cd2",swAng:"21600000"},{type:"close"}],extrusionOk:!1,stroke:!0}]},swooshArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 16667"}],gdLst:[{n:"a1",f:"pin 1 adj1 75000"},{n:"maxAdj2",f:"*/ 70000 w ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"ad1",f:"*/ h a1 100000"},{n:"ad2",f:"*/ ss a2 100000"},{n:"xB",f:"+- r 0 ad2"},{n:"yB",f:"+- t ssd8 0"},{n:"alfa",f:"*/ cd4 1 14"},{n:"dx0",f:"tan ssd8 alfa"},{n:"xC",f:"+- xB 0 dx0"},{n:"dx1",f:"tan ad1 alfa"},{n:"yF",f:"+- yB ad1 0"},{n:"xF",f:"+- xB dx1 0"},{n:"xE",f:"+- xF dx0 0"},{n:"yE",f:"+- yF ssd8 0"},{n:"dy2",f:"+- yE 0 t"},{n:"dy22",f:"*/ dy2 1 2"},{n:"dy3",f:"*/ h 1 20"},{n:"yD",f:"+- t dy22 dy3"},{n:"dy4",f:"*/ hd6 1 1"},{n:"yP1",f:"+- hd6 dy4 0"},{n:"xP1",f:"val wd6"},{n:"dy5",f:"*/ hd6 1 2"},{n:"yP2",f:"+- yF dy5 0"},{n:"xP2",f:"val wd4"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"quadBezTo",pts:[{x:"xP1",y:"yP1"},{x:"xB",y:"yB"}]},{type:"lnTo",pt:{x:"xC",y:"t"}},{type:"lnTo",pt:{x:"r",y:"yD"}},{type:"lnTo",pt:{x:"xE",y:"yE"}},{type:"lnTo",pt:{x:"xF",y:"yF"}},{type:"quadBezTo",pts:[{x:"xP2",y:"yP2"},{x:"l",y:"b"}]},{type:"close"}],extrusionOk:!1,stroke:!0}]},teardrop:{avLst:[{n:"adj",f:"val 100000"}],gdLst:[{n:"a",f:"pin 0 adj 200000"},{n:"r2",f:"sqrt 2"},{n:"tw",f:"*/ wd2 r2 1"},{n:"th",f:"*/ hd2 r2 1"},{n:"sw",f:"*/ tw a 100000"},{n:"sh",f:"*/ th a 100000"},{n:"dx1",f:"cos sw 2700000"},{n:"dy1",f:"sin sh 2700000"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- vc 0 dy1"},{n:"x2",f:"+/ hc x1 2"},{n:"y2",f:"+/ vc y1 2"},{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"vc"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd2",swAng:"cd4"},{type:"quadBezTo",pts:[{x:"x2",y:"t"},{x:"x1",y:"y1"}]},{type:"quadBezTo",pts:[{x:"r",y:"y2"},{x:"r",y:"vc"}]},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"cd4",swAng:"cd4"},{type:"close"}],extrusionOk:!1,stroke:!0}]},trapezoid:{avLst:[{n:"adj",f:"val 25000"}],gdLst:[{n:"maxAdj",f:"*/ 50000 w ss"},{n:"a",f:"pin 0 adj maxAdj"},{n:"x1",f:"*/ ss a 200000"},{n:"x2",f:"*/ ss a 100000"},{n:"x3",f:"+- r 0 x2"},{n:"x4",f:"+- r 0 x1"},{n:"il",f:"*/ wd3 a maxAdj"},{n:"it",f:"*/ hd3 a maxAdj"},{n:"ir",f:"+- r 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"x3",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},triangle:{avLst:[{n:"adj",f:"val 50000"}],gdLst:[{n:"a",f:"pin 0 adj 100000"},{n:"x1",f:"*/ w a 200000"},{n:"x2",f:"*/ w a 100000"},{n:"x3",f:"+- x1 wd2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},upArrowCallout:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 64977"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 w ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"*/ 100000 h ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q2",f:"*/ a3 ss h"},{n:"maxAdj4",f:"+- 100000 0 q2"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"dx1",f:"*/ ss a2 100000"},{n:"dx2",f:"*/ ss a1 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"y1",f:"*/ ss a3 100000"},{n:"dy2",f:"*/ h a4 100000"},{n:"y2",f:"+- b 0 dy2"},{n:"y3",f:"+/ y2 b 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},upDownArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 h ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"y2",f:"*/ ss a2 100000"},{n:"y3",f:"+- b 0 y2"},{n:"dx1",f:"*/ w a1 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc dx1 0"},{n:"dy1",f:"*/ x1 y2 wd2"},{n:"y1",f:"+- y2 0 dy1"},{n:"y4",f:"+- y3 dy1 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"r",y:"y3"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"l",y:"y3"}},{type:"lnTo",pt:{x:"x1",y:"y3"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},upArrow:{avLst:[{n:"adj1",f:"val 50000"},{n:"adj2",f:"val 50000"}],gdLst:[{n:"maxAdj2",f:"*/ 100000 h ss"},{n:"a1",f:"pin 0 adj1 100000"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"dy2",f:"*/ ss a2 100000"},{n:"y2",f:"+- t dy2 0"},{n:"dx1",f:"*/ w a1 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc dx1 0"},{n:"dy1",f:"*/ x1 dy2 wd2"},{n:"y1",f:"+- y2  0 dy1"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y2"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},upDownArrowCallout:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 48123"}],gdLst:[{n:"maxAdj2",f:"*/ 50000 w ss"},{n:"a2",f:"pin 0 adj2 maxAdj2"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"maxAdj3",f:"*/ 50000 h ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q2",f:"*/ a3 ss hd2"},{n:"maxAdj4",f:"+- 100000 0 q2"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"dx1",f:"*/ ss a2 100000"},{n:"dx2",f:"*/ ss a1 200000"},{n:"x1",f:"+- hc 0 dx1"},{n:"x2",f:"+- hc 0 dx2"},{n:"x3",f:"+- hc dx2 0"},{n:"x4",f:"+- hc dx1 0"},{n:"y1",f:"*/ ss a3 100000"},{n:"y4",f:"+- b 0 y1"},{n:"dy2",f:"*/ h a4 200000"},{n:"y2",f:"+- vc 0 dy2"},{n:"y3",f:"+- vc dy2 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y2"}},{type:"lnTo",pt:{x:"x2",y:"y1"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"lnTo",pt:{x:"hc",y:"t"}},{type:"lnTo",pt:{x:"x4",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y1"}},{type:"lnTo",pt:{x:"x3",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y3"}},{type:"lnTo",pt:{x:"x3",y:"y4"}},{type:"lnTo",pt:{x:"x4",y:"y4"}},{type:"lnTo",pt:{x:"hc",y:"b"}},{type:"lnTo",pt:{x:"x1",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y4"}},{type:"lnTo",pt:{x:"x2",y:"y3"}},{type:"lnTo",pt:{x:"l",y:"y3"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},uturnArrow:{avLst:[{n:"adj1",f:"val 25000"},{n:"adj2",f:"val 25000"},{n:"adj3",f:"val 25000"},{n:"adj4",f:"val 43750"},{n:"adj5",f:"val 75000"}],gdLst:[{n:"a2",f:"pin 0 adj2 25000"},{n:"maxAdj1",f:"*/ a2 2 1"},{n:"a1",f:"pin 0 adj1 maxAdj1"},{n:"q2",f:"*/ a1 ss h"},{n:"q3",f:"+- 100000 0 q2"},{n:"maxAdj3",f:"*/ q3 h ss"},{n:"a3",f:"pin 0 adj3 maxAdj3"},{n:"q1",f:"+- a3 a1 0"},{n:"minAdj5",f:"*/ q1 ss h"},{n:"a5",f:"pin minAdj5 adj5 100000"},{n:"th",f:"*/ ss a1 100000"},{n:"aw2",f:"*/ ss a2 100000"},{n:"th2",f:"*/ th 1 2"},{n:"dh2",f:"+- aw2 0 th2"},{n:"y5",f:"*/ h a5 100000"},{n:"ah",f:"*/ ss a3 100000"},{n:"y4",f:"+- y5 0 ah"},{n:"x9",f:"+- r 0 dh2"},{n:"bw",f:"*/ x9 1 2"},{n:"bs",f:"min bw y4"},{n:"maxAdj4",f:"*/ bs 100000 ss"},{n:"a4",f:"pin 0 adj4 maxAdj4"},{n:"bd",f:"*/ ss a4 100000"},{n:"bd3",f:"+- bd 0 th"},{n:"bd2",f:"max bd3 0"},{n:"x3",f:"+- th bd2 0"},{n:"x8",f:"+- r 0 aw2"},{n:"x6",f:"+- x8 0 aw2"},{n:"x7",f:"+- x6 dh2 0"},{n:"x4",f:"+- x9 0 bd"},{n:"x5",f:"+- x7 0 bd2"},{n:"cx",f:"+/ th x7 2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"l",y:"bd"}},{type:"arcTo",wR:"bd",hR:"bd",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x4",y:"t"}},{type:"arcTo",wR:"bd",hR:"bd",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"x9",y:"y4"}},{type:"lnTo",pt:{x:"r",y:"y4"}},{type:"lnTo",pt:{x:"x8",y:"y5"}},{type:"lnTo",pt:{x:"x6",y:"y4"}},{type:"lnTo",pt:{x:"x7",y:"y4"}},{type:"lnTo",pt:{x:"x7",y:"x3"}},{type:"arcTo",wR:"bd2",hR:"bd2",stAng:"0",swAng:"-5400000"},{type:"lnTo",pt:{x:"x3",y:"th"}},{type:"arcTo",wR:"bd2",hR:"bd2",stAng:"3cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"th",y:"b"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},verticalScroll:{avLst:[{n:"adj",f:"val 12500"}],gdLst:[{n:"a",f:"pin 0 adj 25000"},{n:"ch",f:"*/ ss a 100000"},{n:"ch2",f:"*/ ch 1 2"},{n:"ch4",f:"*/ ch 1 4"},{n:"x3",f:"+- ch ch2 0"},{n:"x4",f:"+- ch ch 0"},{n:"x6",f:"+- r 0 ch"},{n:"x7",f:"+- r 0 ch2"},{n:"x5",f:"+- x6 0 ch2"},{n:"y3",f:"+- b 0 ch"},{n:"y4",f:"+- b 0 ch2"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"ch2",y:"b"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"ch2",y:"y4"}},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"cd4",swAng:"-10800000"},{type:"lnTo",pt:{x:"ch",y:"y3"}},{type:"lnTo",pt:{x:"ch",y:"ch2"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x7",y:"t"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x6",y:"ch"}},{type:"lnTo",pt:{x:"x6",y:"y4"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd4"},{type:"close"},{type:"moveTo",pt:{x:"x4",y:"ch2"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"cd4",swAng:"cd2"},{type:"close"}],extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"x4",y:"ch2"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd4"},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"cd4",swAng:"cd2"},{type:"close"},{type:"moveTo",pt:{x:"ch",y:"y4"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"3cd4"},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"3cd4",swAng:"cd2"},{type:"close"}],fill:"darkenLess",extrusionOk:!1,stroke:!1},{defines:[{type:"moveTo",pt:{x:"ch",y:"y3"}},{type:"lnTo",pt:{x:"ch",y:"ch2"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x7",y:"t"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x6",y:"ch"}},{type:"lnTo",pt:{x:"x6",y:"y4"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"ch2",y:"b"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"cd2"},{type:"close"},{type:"moveTo",pt:{x:"x3",y:"t"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"3cd4",swAng:"cd2"},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"x4",y:"ch2"}},{type:"moveTo",pt:{x:"x6",y:"ch"}},{type:"lnTo",pt:{x:"x3",y:"ch"}},{type:"moveTo",pt:{x:"ch2",y:"y3"}},{type:"arcTo",wR:"ch4",hR:"ch4",stAng:"3cd4",swAng:"cd2"},{type:"lnTo",pt:{x:"ch",y:"y4"}},{type:"moveTo",pt:{x:"ch2",y:"b"}},{type:"arcTo",wR:"ch2",hR:"ch2",stAng:"cd4",swAng:"-5400000"},{type:"lnTo",pt:{x:"ch",y:"y3"}}],fill:"none",extrusionOk:!1,stroke:!0}]},wave:{avLst:[{n:"adj1",f:"val 12500"},{n:"adj2",f:"val 0"}],gdLst:[{n:"a1",f:"pin 0 adj1 20000"},{n:"a2",f:"pin -10000 adj2 10000"},{n:"y1",f:"*/ h a1 100000"},{n:"dy2",f:"*/ y1 10 3"},{n:"y2",f:"+- y1 0 dy2"},{n:"y3",f:"+- y1 dy2 0"},{n:"y4",f:"+- b 0 y1"},{n:"y5",f:"+- y4 0 dy2"},{n:"y6",f:"+- y4 dy2 0"},{n:"dx1",f:"*/ w a2 100000"},{n:"of2",f:"*/ w a2 50000"},{n:"x1",f:"abs dx1"},{n:"dx2",f:"?: of2 0 of2"},{n:"x2",f:"+- l 0 dx2"},{n:"dx5",f:"?: of2 of2 0"},{n:"x5",f:"+- r 0 dx5"},{n:"dx3",f:"+/ dx2 x5 3"},{n:"x3",f:"+- x2 dx3 0"},{n:"x4",f:"+/ x3 x5 2"},{n:"x6",f:"+- l dx5 0"},{n:"x10",f:"+- r dx2 0"},{n:"x7",f:"+- x6 dx3 0"},{n:"x8",f:"+/ x7 x10 2"},{n:"x9",f:"+- r 0 x1"},{n:"xAdj",f:"+- hc dx1 0"},{n:"xAdj2",f:"+- hc 0 dx1"},{n:"il",f:"max x2 x6"},{n:"ir",f:"min x5 x10"},{n:"it",f:"*/ h a1 50000"},{n:"ib",f:"+- b 0 it"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"x2",y:"y1"}},{type:"cubicBezTo",pts:[{x:"x3",y:"y2"},{x:"x4",y:"y3"},{x:"x5",y:"y1"}]},{type:"lnTo",pt:{x:"x10",y:"y4"}},{type:"cubicBezTo",pts:[{x:"x8",y:"y6"},{x:"x7",y:"y5"},{x:"x6",y:"y4"}]},{type:"close"}],extrusionOk:!1,stroke:!0}]},wedgeEllipseCallout:{avLst:[{n:"adj1",f:"val -20833"},{n:"adj2",f:"val 62500"}],gdLst:[{n:"dxPos",f:"*/ w adj1 100000"},{n:"dyPos",f:"*/ h adj2 100000"},{n:"xPos",f:"+- hc dxPos 0"},{n:"yPos",f:"+- vc dyPos 0"},{n:"sdx",f:"*/ dxPos h 1"},{n:"sdy",f:"*/ dyPos w 1"},{n:"pang",f:"at2 sdx sdy"},{n:"stAng",f:"+- pang 660000 0"},{n:"enAng",f:"+- pang 0 660000"},{n:"dx1",f:"cos wd2 stAng"},{n:"dy1",f:"sin hd2 stAng"},{n:"x1",f:"+- hc dx1 0"},{n:"y1",f:"+- vc dy1 0"},{n:"dx2",f:"cos wd2 enAng"},{n:"dy2",f:"sin hd2 enAng"},{n:"x2",f:"+- hc dx2 0"},{n:"y2",f:"+- vc dy2 0"},{n:"stAng1",f:"at2 dx1 dy1"},{n:"enAng1",f:"at2 dx2 dy2"},{n:"swAng1",f:"+- enAng1 0 stAng1"},{n:"swAng2",f:"+- swAng1 21600000 0"},{n:"swAng",f:"?: swAng1 swAng1 swAng2"},{n:"idx",f:"cos wd2 2700000"},{n:"idy",f:"sin hd2 2700000"},{n:"il",f:"+- hc 0 idx"},{n:"ir",f:"+- hc idx 0"},{n:"it",f:"+- vc 0 idy"},{n:"ib",f:"+- vc idy 0"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"xPos",y:"yPos"}},{type:"lnTo",pt:{x:"x1",y:"y1"}},{type:"arcTo",wR:"wd2",hR:"hd2",stAng:"stAng1",swAng:"swAng"},{type:"close"}],extrusionOk:!1,stroke:!0}]},wedgeRectCallout:{avLst:[{n:"adj1",f:"val -20833"},{n:"adj2",f:"val 62500"}],gdLst:[{n:"dxPos",f:"*/ w adj1 100000"},{n:"dyPos",f:"*/ h adj2 100000"},{n:"xPos",f:"+- hc dxPos 0"},{n:"yPos",f:"+- vc dyPos 0"},{n:"dx",f:"+- xPos 0 hc"},{n:"dy",f:"+- yPos 0 vc"},{n:"dq",f:"*/ dxPos h w"},{n:"ady",f:"abs dyPos"},{n:"adq",f:"abs dq"},{n:"dz",f:"+- ady 0 adq"},{n:"xg1",f:"?: dxPos 7 2"},{n:"xg2",f:"?: dxPos 10 5"},{n:"x1",f:"*/ w xg1 12"},{n:"x2",f:"*/ w xg2 12"},{n:"yg1",f:"?: dyPos 7 2"},{n:"yg2",f:"?: dyPos 10 5"},{n:"y1",f:"*/ h yg1 12"},{n:"y2",f:"*/ h yg2 12"},{n:"t1",f:"?: dxPos l xPos"},{n:"xl",f:"?: dz l t1"},{n:"t2",f:"?: dyPos x1 xPos"},{n:"xt",f:"?: dz t2 x1"},{n:"t3",f:"?: dxPos xPos r"},{n:"xr",f:"?: dz r t3"},{n:"t4",f:"?: dyPos xPos x1"},{n:"xb",f:"?: dz t4 x1"},{n:"t5",f:"?: dxPos y1 yPos"},{n:"yl",f:"?: dz y1 t5"},{n:"t6",f:"?: dyPos t yPos"},{n:"yt",f:"?: dz t6 t"},{n:"t7",f:"?: dxPos yPos y1"},{n:"yr",f:"?: dz y1 t7"},{n:"t8",f:"?: dyPos yPos b"},{n:"yb",f:"?: dz t8 b"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"t"}},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"xt",y:"yt"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"r",y:"t"}},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"xr",y:"yr"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"b"}},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"xb",y:"yb"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"l",y:"b"}},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"xl",y:"yl"}},{type:"lnTo",pt:{x:"l",y:"y1"}},{type:"close"}],extrusionOk:!1,stroke:!0}]},wedgeRoundRectCallout:{avLst:[{n:"adj1",f:"val -20833"},{n:"adj2",f:"val 62500"},{n:"adj3",f:"val 16667"}],gdLst:[{n:"dxPos",f:"*/ w adj1 100000"},{n:"dyPos",f:"*/ h adj2 100000"},{n:"xPos",f:"+- hc dxPos 0"},{n:"yPos",f:"+- vc dyPos 0"},{n:"dq",f:"*/ dxPos h w"},{n:"ady",f:"abs dyPos"},{n:"adq",f:"abs dq"},{n:"dz",f:"+- ady 0 adq"},{n:"xg1",f:"?: dxPos 7 2"},{n:"xg2",f:"?: dxPos 10 5"},{n:"x1",f:"*/ w xg1 12"},{n:"x2",f:"*/ w xg2 12"},{n:"yg1",f:"?: dyPos 7 2"},{n:"yg2",f:"?: dyPos 10 5"},{n:"y1",f:"*/ h yg1 12"},{n:"y2",f:"*/ h yg2 12"},{n:"t1",f:"?: dxPos l xPos"},{n:"xl",f:"?: dz l t1"},{n:"t2",f:"?: dyPos x1 xPos"},{n:"xt",f:"?: dz t2 x1"},{n:"t3",f:"?: dxPos xPos r"},{n:"xr",f:"?: dz r t3"},{n:"t4",f:"?: dyPos xPos x1"},{n:"xb",f:"?: dz t4 x1"},{n:"t5",f:"?: dxPos y1 yPos"},{n:"yl",f:"?: dz y1 t5"},{n:"t6",f:"?: dyPos t yPos"},{n:"yt",f:"?: dz t6 t"},{n:"t7",f:"?: dxPos yPos y1"},{n:"yr",f:"?: dz y1 t7"},{n:"t8",f:"?: dyPos yPos b"},{n:"yb",f:"?: dz t8 b"},{n:"u1",f:"*/ ss adj3 100000"},{n:"u2",f:"+- r 0 u1"},{n:"v2",f:"+- b 0 u1"},{n:"il",f:"*/ u1 29289 100000"},{n:"ir",f:"+- r 0 il"},{n:"ib",f:"+- b 0 il"}],pathLst:[{defines:[{type:"moveTo",pt:{x:"l",y:"u1"}},{type:"arcTo",wR:"u1",hR:"u1",stAng:"cd2",swAng:"cd4"},{type:"lnTo",pt:{x:"x1",y:"t"}},{type:"lnTo",pt:{x:"xt",y:"yt"}},{type:"lnTo",pt:{x:"x2",y:"t"}},{type:"lnTo",pt:{x:"u2",y:"t"}},{type:"arcTo",wR:"u1",hR:"u1",stAng:"3cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"r",y:"y1"}},{type:"lnTo",pt:{x:"xr",y:"yr"}},{type:"lnTo",pt:{x:"r",y:"y2"}},{type:"lnTo",pt:{x:"r",y:"v2"}},{type:"arcTo",wR:"u1",hR:"u1",stAng:"0",swAng:"cd4"},{type:"lnTo",pt:{x:"x2",y:"b"}},{type:"lnTo",pt:{x:"xb",y:"yb"}},{type:"lnTo",pt:{x:"x1",y:"b"}},{type:"lnTo",pt:{x:"u1",y:"b"}},{type:"arcTo",wR:"u1",hR:"u1",stAng:"cd4",swAng:"cd4"},{type:"lnTo",pt:{x:"l",y:"y2"}},{type:"lnTo",pt:{x:"xl",y:"yl"}},{type:"lnTo",pt:{x:"l",y:"y1"}},{type:"close"}],extrusionOk:!1,stroke:!0}]}}}));
;/*!node_modules/office-viewer/lib/openxml/drawing/svg/formulas.js*/
amis.define("e63fc9a",(function(n,t,r,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var e=1/6e4/180*Math.PI,u={"*/":function(n,t,r){return n*t/r},"+-":function(n,t,r){return n+t-r},"+/":function(n,t,r){return(n+t)/r},"?:":function(n,t,r){return n>0?t:r},abs:function(n){return Math.abs(n)},at2:function(n,t){return 180*Math.atan2(t,n)*6e4/Math.PI},cat2:function(n,t,r){return n*Math.cos(Math.atan2(r,t))},cos:function(n,t){return n*Math.cos(t*e)},max:function(n,t){return Math.max(n,t)},min:function(n,t){return Math.min(n,t)},mod:function(n,t,r){return Math.sqrt(Math.pow(n,2)+Math.pow(t,2)+Math.pow(r,2))},pin:function(n,t,r){return t<n?n:t>r?r:t},sat2:function(n,t,r){return n*Math.sin(Math.atan2(r,t))},sin:function(n,t){return n*Math.sin(t*e)},sqrt:function(n){return Math.sqrt(n)},tan:function(n,t){return n*Math.tan(t*e)},val:function(n){var t=parseInt(n,10);return isNaN(t),t}};t.evalFmla=function(n,t,r){var a=t.split(/[ ]+/);a.length<=1&&console.warn("fmla format error",t);var e=a[0],i=a.slice(1).map((function(n){if(n in r)return r[n];var a=parseInt(n,10);return isNaN(a)?(console.warn("fmla arg error",n,t),0):a}));if(e in u){var o=u[e].apply(null,i);if(isNaN(o))return console.warn("fmla eval error",t,n),0;r[n]=o}return 0},t.formulas=u}));
;/*!node_modules/office-viewer/lib/openxml/drawing/svg/arcToA.js*/
amis.define("4eff962",(function(t,a,n,c){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var e=function(t){return Math.PI*(t/6e4/180)};function r(t,a){return[t[0][0]*a[0]+t[0][1]*a[1],t[1][0]*a[0]+t[1][1]*a[1]]}a.default=function(t,a,n,c,o,u){var h=e(n),i=e(c),s=e(n+c);(function(t,a){if(t===a)return!0;var n=Math.abs(t-a);return n<Number.EPSILON||n<=Number.EPSILON*Math.min(Math.abs(t),Math.abs(a))})(c,216e5)&&(s-=1e-4);var M=function(t,a,n,c,e,o,u){var h=n,i=c,s=[o,u],M=[[Math.cos(e),-Math.sin(e)],[Math.sin(e),Math.cos(e)]],f=[t*Math.cos(h),a*Math.sin(h)],b=r(M,f),v=[s[0]-b[0],s[1]-b[1]],d=[t*Math.cos(i),a*Math.sin(i)],P=r(M,d),m=[v[0]+P[0],v[1]+P[1]];return{x:m[0],y:m[1]}}(t,a,h,s,0,o,u),f=Math.abs(i)>Math.PI?1:0,b=c>0?1:0;return{path:"A ".concat(t," ").concat(a," 0 ").concat(f," ").concat(b," ").concat(M.x,",").concat(M.y),end:M}}}));
;/*!node_modules/office-viewer/lib/openxml/drawing/svg/generateDefines.js*/
amis.define("3efda54",(function(e,a,t,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var c=e("c1138ba"),s=e("4eff962");function r(e,a,t){var n=0;if(e in a)n=a[e];else if(n=parseInt(e,10),isNaN(n))return console.warn("var not found",e),0;return t?n*t:n}a.generateDefines=function(e,a,t){var n,o,u=e.defines,p=[],h=e.w,l=e.h,i=1,y=1;h&&(i=a.w/h),l&&(y=a.h/l);try{for(var f=c.__values(u),v=f.next();!v.done;v=f.next()){var x=v.value;switch(x.type){case"moveTo":var d=r((b=x.pt).x,a,i),g=r(b.y,a,y);p.push("M ".concat(d," ").concat(g)),t.push({x:d,y:g});break;case"lnTo":var b;d=r((b=x.pt).x,a,i),g=r(b.y,a,y);p.push("L ".concat(d," ").concat(g)),t.push({x:d,y:g});break;case"arcTo":var w=x,T=r(w.wR,a,i),k=r(w.hR,a,y),m=r(w.stAng,a),z=r(w.swAng,a),B={x:0,y:0};t.length>0&&(B=t[t.length-1]);var _=s.default(T,k,m,z,B.x,B.y);p.push(_.path),t.push({x:_.end.x,y:_.end.y});break;case"quadBezTo":var j=x;if(j.pts.length>=2){var q=j.pts[0],A=j.pts[1],M=r(q.x,a,i),N=r(q.y,a,y),R=r(A.x,a,i),C=r(A.y,a,y);if(p.push("Q ".concat(M,",").concat(N," ").concat(R,",").concat(C)),j.pts.length>2){var D=r((O=j.pts[2]).x,a,i),I=r(O.y,a,y);p.push("T ".concat(D,",").concat(I)),t.push({x:D,y:I})}else t.push({x:R,y:C})}else console.warn("quadBezTo pts length must large than 2",x);break;case"cubicBezTo":var L=x;if(3===L.pts.length){q=L.pts[0],A=L.pts[1];var O=L.pts[2];M=r(q.x,a,i),N=r(q.y,a,y),R=r(A.x,a,i),C=r(A.y,a,y),D=r(O.x,a,i),I=r(O.y,a,y);p.push("C ".concat(M,",").concat(N," ").concat(R,",").concat(C," ").concat(D,",").concat(I)),t.push({x:D,y:I})}else console.warn("cubicBezTo pts length must be 3",x);break;case"close":p.push("Z")}}}catch(e){n={error:e}}finally{try{v&&!v.done&&(o=f.return)&&o.call(f)}finally{if(n)throw n.error}}return p.join(" ")}}));
;/*!node_modules/office-viewer/lib/openxml/drawing/svg/presetVal.js*/
amis.define("f245d0e",(function(d,e,s,c){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.presetVal=function(d,e){var s=Math.min(d,e),c=s/6,t=s/6,h=s/8,w=s/32,n=s/16;return{t:0,"3cd4":162e5,"3cd8":81e5,"5cd8":135e5,"7cd8":189e5,b:e,cd2:108e5,cd4:54e5,cd8:27e5,h:e,hd2:e/2,hd3:e/3,hd4:e/4,hd6:e/6,hd8:e/8,l:0,ls:Math.max(d,e),r:d,ss:s,ssd2:c,ssd6:t,ssd8:h,ssd16:n,ssd32:w,hc:d/2,vc:e/2,w:d,wd2:d/2,wd3:d/3,wd4:d/4,wd6:d/6,wd8:d/8,wd10:d/10,wd16:d/16,wd32:d/32}}}));
;/*!node_modules/office-viewer/lib/openxml/drawing/svg/shapeToSVG.js*/
amis.define("67ae72e",(function(e,t,r,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("c1138ba"),n=e("20058a0"),i=e("0c75dbf"),a=e("e63fc9a"),s=e("3efda54"),f=e("f245d0e");t.shapeToSVG=function(e,t,r,l,u,c){var b,v,d,y,h,A,x,k,p=i.createSVGElement("svg");p.style.display="block",p.setAttribute("style","display: block; overflow: visible; position: absolute; z-index: -1"),p.setAttribute("width",l.toString()+"px"),p.setAttribute("height",u.toString()+"px");var w=f.presetVal(l,u);try{for(var m=o.__values(e.avLst||[]),_=m.next();!_.done;_=m.next()){var g=_.value;a.evalFmla(g.n,g.f,w)}}catch(e){b={error:e}}finally{try{_&&!_.done&&(v=m.return)&&v.call(m)}finally{if(b)throw b.error}}try{for(var C=o.__values(t),L=C.next();!L.done;L=C.next()){g=L.value;a.evalFmla(g.n,g.f,w)}}catch(e){d={error:e}}finally{try{L&&!L.done&&(y=C.return)&&y.call(C)}finally{if(d)throw d.error}}try{for(var O=o.__values(e.gdLst||[]),S=O.next();!S.done;S=O.next()){g=S.value;a.evalFmla(g.n,g.f,w)}}catch(e){h={error:e}}finally{try{S&&!S.done&&(A=O.return)&&A.call(O)}finally{if(h)throw h.error}}var F=r.outline,H=[];try{for(var V=o.__values(e.pathLst||[]),G=V.next();!G.done;G=V.next()){var E=G.value,j=i.createSVGElement("path"),z=s.generateDefines(E,w,H);j.setAttribute("d",z),r.fillColor?j.setAttribute("fill",r.fillColor):c&&c.fillColor?j.setAttribute("fill",c.fillColor):j.setAttribute("fill","none"),F?(F.color&&j.setAttribute("stroke",F.color),F.width&&j.setAttribute("stroke-width",F.width),"none"===F.style&&j.setAttribute("stroke","none")):c&&c.lineColor?j.setAttribute("stroke",c.lineColor):j.setAttribute("stroke","none");var D=j.getAttribute("fill");if(D&&"none"!==D){var M=new n.Color(D),P=E.fill,T="";switch(P){case"darken":T=M.lumOff(-.5).toHex();break;case"darkenLess":T=M.lumOff(-.2).toHex();break;case"lighten":T=M.lumOff(.5).toHex();break;case"lightenLess":T=M.lumOff(.2).toHex()}T&&j.setAttribute("fill",T)}"none"===E.fill&&j.setAttribute("fill","none"),!1===E.stroke&&(j.setAttribute("stroke","none"),E.fill||j.setAttribute("fill","none")),r.noFill&&j.setAttribute("fill","none"),p.appendChild(j)}}catch(e){x={error:e}}finally{try{G&&!G.done&&(k=V.return)&&k.call(V)}finally{if(x)throw x.error}}return p}}));
;/*!node_modules/office-viewer/lib/render/renderGeom.js*/
amis.define("50a473b",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("966fe9f"),s=e("67ae72e");r.renderGeom=function(e,r,t,n,f){if(e.prst){var i=a.presetShape[e.prst];if(i)return s.shapeToSVG(i,e.avLst||[],r,t,n,f)}return null}}));
;/*!node_modules/office-viewer/lib/render/renderCustGeom.js*/
amis.define("ccc9d46",(function(e,n,r,s){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=e("67ae72e");n.renderCustGeom=function(e,n,r,s,u){return e.shape?t.shapeToSVG(e.shape,[],n,r,s,u):null}}));
;/*!node_modules/office-viewer/lib/render/renderDrawing.js*/
amis.define("d27e9db",(function(e,t,l,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("c1138ba"),i=e("a607958"),n=e("0c75dbf"),o=e("61e0815"),p=e("30065f0"),c=e("2858914"),d=e("50a473b"),s=e("ccc9d46");function f(e,t,l){var r,a,i;void 0===l&&(l=null);var n=null===(r=e.blipFill)||void 0===r?void 0:r.blip;if(n&&n.src){var o=document.createElement("img");if(o.style.position="relative",o.alt=e.alt||"",o.src=n.src,e.alt&&t.renderOptions.enableVar)if(e.altVar)o.src=e.altVar;else if(e.alt.startsWith("{{")){var p=t.replaceText(e.alt);p&&(o.src=p)}var c=null===(a=e.spPr)||void 0===a?void 0:a.xfrm;if(c){if(l){var d=v(c,null===(i=l.spPr)||void 0===i?void 0:i.xfrm);d&&(o.style.position="absolute",o.style.left=d.left+"px",o.style.top=d.top+"px",o.style.width=d.width+"px",o.style.height=d.height+"px")}else{var s=c.off;s&&(o.style.left=s.x,o.style.top=s.y);var f=c.ext;f&&(o.style.width=f.cx,o.style.height=f.cy)}c.rot&&(o.style.transform="rotate(".concat(c.rot,"deg)"))}return o}return null}function v(e,t){var l=e.off,r=parseFloat(e.ext.cx.replace("px","")),a=parseFloat(e.ext.cy.replace("px",""));if(l&&t.chOff&&t.ext&&t.chExt){var i=parseFloat(t.ext.cx.replace("px",""))/parseFloat(t.chExt.cx.replace("px","")),n=parseFloat(t.ext.cy.replace("px",""))/parseFloat(t.chExt.cy.replace("px","")),o=parseFloat(t.chOff.x.replace("px","")),p=parseFloat(t.chOff.y.replace("px",""));return{left:i*(parseFloat(l.x.replace("px",""))-o),top:n*(parseFloat(l.y.replace("px",""))-p),width:i*r,height:n*a}}return null}function y(e,t,l,r){var f,y,x;void 0===r&&(r=null);var u=l.wpsStyle,h=l.spPr;if(n.applyStyle(t,l.style),(null==u?void 0:u.fontColor)&&(t.style.color=u.fontColor),null==h?void 0:h.xfrm){var m=h.xfrm.ext;if(m){var g=parseFloat(m.cx.replace("px","")),w=parseFloat(m.cy.replace("px",""));if(r){t.style.position="absolute";var C=v(h.xfrm,null===(x=r.spPr)||void 0===x?void 0:x.xfrm);C&&(t.style.left=C.left+"px",t.style.top=C.top+"px",g=C.width,w=C.height)}t.style.width=g+"px",t.style.height=w+"px",h.geom&&n.appendChild(t,d.renderGeom(h.geom,h,g,w,l.wpsStyle)),h.custGeom&&n.appendChild(t,s.renderCustGeom(h.custGeom,h,g,w,l.wpsStyle))}h.xfrm.rot&&(t.style.transform="rotate(".concat(h.xfrm.rot,"deg)"))}var b=l.txbxContent;if(b.length){var F=document.createElement("div");F.dataset.name="textContainer",t.style.display="table",F.style.display="table-cell",F.style.verticalAlign="middle",l.style&&l.style["vertical-align"]&&(F.style.verticalAlign=l.style["vertical-align"],t.style.verticalAlign=""),n.appendChild(t,F);try{for(var E=a.__values(b),_=E.next();!_.done;_=E.next()){var P=_.value;P instanceof i.Paragraph?n.appendChild(F,o.default(e,P)):P instanceof c.Table&&n.appendChild(F,p.default(e,P))}}catch(e){f={error:e}}finally{try{_&&!_.done&&(y=E.return)&&y.call(E)}finally{if(f)throw f.error}}}}function x(e,t){var l,r,i,o,p,c,d=document.createElement("div"),s=document.createElement("div"),v=t.spPr;if(null==v?void 0:v.xfrm){var u=null===(p=null==v?void 0:v.xfrm)||void 0===p?void 0:p.ext;u&&(s.style.width=u.cx,s.style.height=u.cy);var h=null===(c=null==v?void 0:v.xfrm)||void 0===c?void 0:c.rot;h&&(s.style.transform="rotate(".concat(h,"deg)"))}try{for(var m=a.__values(t.wps),g=m.next();!g.done;g=m.next()){var w=g.value,C=document.createElement("div");y(e,C,w,t),n.appendChild(s,C)}}catch(e){l={error:e}}finally{try{g&&!g.done&&(r=m.return)&&r.call(m)}finally{if(l)throw l.error}}try{for(var b=a.__values(t.wpg),F=b.next();!F.done;F=b.next()){var E=F.value;n.appendChild(d,x(e,E))}}catch(e){i={error:e}}finally{try{F&&!F.done&&(o=b.return)&&o.call(b)}finally{if(i)throw i.error}}return t.pic&&n.appendChild(s,f(t.pic,e,t)),n.appendChild(d,s),d}t.renderDrawing=function(e,t,l){var r=document.createElement("div");return"inline"===t.position?r.style.display="inline-block":t.position,t.pic&&n.appendChild(r,f(t.pic,e)),"page"===t.relativeFromV&&console.warn('暂不支持 drawing.relativeFromV === "page"'),n.applyStyle(r,t.containerStyle),r.dataset.id=t.id||"",r.dataset.name=t.name||"",t.wps&&y(e,r,t.wps),t.wpg&&n.appendChild(r,x(e,t.wpg)),0===r.children.length?null:r}}));
;/*!node_modules/office-viewer/lib/render/renderTab.js*/
amis.define("6251082",(function(e,t,r,d){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("0c75dbf");t.renderTab=function(e,t,r){void 0===r&&(r=!1);var d=n.createElement("span");return d.style.display="inline-block",d.style.width="2em",d.innerHTML="&emsp;","dot"===t.leader&&(d.style.borderBottom="1pt dotted"),r&&t.pos&&("start"===t.type||"left"==t.type)&&(d.style.width=t.pos),d}}));
;/*!node_modules/office-viewer/lib/render/renderPict.js*/
amis.define("7881268",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.renderPict=function(e,r){if(r.src){var t=document.createElement("img");return t.style.position="relative",t.src=r.src,t}return null}}));
;/*!node_modules/office-viewer/lib/render/renderRuby.js*/
amis.define("330156f",(function(e,r,n,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("c1138ba"),l=e("0c75dbf"),d=e("11d5fc3");r.renderRuby=function(e,r){var n,a,i,c,f=l.createElement("ruby");if(r.rubyBase){try{for(var u=t.__values(r.rubyBase.children),o=u.next();!o.done;o=u.next()){var p=o.value;f.appendChild(d.default(e,p))}}catch(e){n={error:e}}finally{try{o&&!o.done&&(a=u.return)&&a.call(u)}finally{if(n)throw n.error}}if(r.rt){var v=l.createElement("rp");v.innerText="(",f.appendChild(v);var y=l.createElement("rt");try{for(var h=t.__values(r.rt.children),s=h.next();!s.done;s=h.next()){p=s.value;y.appendChild(d.default(e,p))}}catch(e){i={error:e}}finally{try{s&&!s.done&&(c=h.return)&&c.call(h)}finally{if(i)throw i.error}}f.appendChild(y);var b=l.createElement("rp");b.innerText=")",f.appendChild(b)}}return f}}));
;/*!node_modules/office-viewer/lib/render/renderHyperLink.js*/
amis.define("5879be6",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("c1138ba"),l=e("0c75dbf"),i=e("2360183"),o=e("11d5fc3");r.renderHyperLink=function(e,r,t){var a,f,c=l.createElement("a");if(r.relation){var d=r.relation;d&&"External"===d.targetMode&&(c.href=d.target,c.target="_blank")}r.anchor&&(c.href="#"+r.anchor),r.tooltip&&(c.title=r.tooltip);try{for(var u=n.__values(r.children),v=u.next();!v.done;v=u.next()){var h=v.value;if(h instanceof i.Run){var p=o.default(e,h,t);l.appendChild(c,p)}}}catch(e){a={error:e}}finally{try{v&&!v.done&&(f=u.return)&&f.call(u)}finally{if(a)throw a.error}}return c}}));
;/*!node_modules/office-viewer/lib/render/renderBookmark.js*/
amis.define("a644e47",(function(e,r,n,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("0c75dbf");r.renderBookmarkStart=function(e,r){var n=r.name;if(n){var a=t.createElement("a");return a.name=n,a.id=n,a}return null}}));
;/*!node_modules/office-viewer/lib/render/renderInlineText.js*/
amis.define("6f2d0bc",(function(e,r,a,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("c1138ba"),i=e("0c75dbf"),d=e("2360183"),f=e("cb10616"),l=e("2fde99a"),o=e("11d5fc3"),c=e("5879be6"),u=e("a644e47");r.default=function(e,r,a){var n,s;try{for(var p=t.__values(r.children),v=p.next();!v.done;v=p.next()){var y=v.value;if(y instanceof d.Run)i.appendChild(a,o.default(e,y));else if(y instanceof f.BookmarkStart)i.appendChild(a,u.renderBookmarkStart(e,y));else if(y instanceof l.Hyperlink){var b=c.renderHyperLink(e,y);i.appendChild(a,b)}}}catch(e){n={error:e}}finally{try{v&&!v.done&&(s=p.return)&&s.call(p)}finally{if(n)throw n.error}}}}));
;/*!node_modules/office-viewer/lib/render/renderInstrText.js*/
amis.define("e7573e2",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("c1138ba"),i=e("0c75dbf"),l=e("6f2d0bc");r.renderInstrText=function(e,r){var t,n,f,c=r.text,d=i.createElement("span"),o=null===(f=e.currentParagraph)||void 0===f?void 0:f.fldSimples;if(o)try{for(var s=a.__values(o),u=s.next();!u.done;u=s.next()){var v=u.value;if(v.instr===c.trim()||c.startsWith(v.instr+" ")){l.default(e,v.inlineText,d);break}}}catch(e){t={error:e}}finally{try{u&&!u.done&&(n=s.return)&&n.call(s)}finally{if(t)throw t.error}}return d}}));
;/*!node_modules/office-viewer/lib/render/renderSym.js*/
amis.define("35c6a3a",(function(e,n,t,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("0c75dbf");n.renderSym=function(e,n){var t=a.createElement("span");return t.style.fontFamily=n.font,t.innerHTML="&#x".concat(n.char,";"),t}}));
;/*!node_modules/office-viewer/lib/util/autoSpace.js*/
amis.define("5774688",(function(t,e,n,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var u=/\p{Punctuation}/u,i=/\p{Separator}/u,a=/\p{Script=Han}|\p{Script=Katakana}|\p{Script=Hiragana}|\p{Script=Hangul}/u;e.cjkspace=function(t){var e,n,r=t.filter((function(t){return void 0!==t&&""!==t}));return n=function(t,e){return function(t,e){return a.test(t)?!(u.test(e)||i.test(e)||a.test(e)):a.test(e)&&!u.test(t)&&!i.test(t)}(t,e)?" ":""},(e=r).reduce((function(t,r,u){return t+(0!==u?n(r,e[u-1]):"")+r}),"")}}));
;/*!node_modules/office-viewer/lib/render/renderSoftHyphen.js*/
amis.define("558d5ae",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("0c75dbf");n.renderSoftHyphen=function(){var e=a.createElement("span");return e.innerHTML="&shy;",e}}));
;/*!node_modules/office-viewer/lib/render/renderNoBreakHyphen.js*/
amis.define("2071838",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("0c75dbf");n.renderNoBreakHyphen=function(){var e=a.createElement("span");return e.innerHTML="&ndash;",e}}));
;/*!node_modules/office-viewer/lib/render/renderSeparator.js*/
amis.define("0ed4931",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var d=e("0c75dbf");r.renderSeparator=function(){var e=d.createElement("hr");return e.style.borderTop="1pt solid #bbb",e}}));
;/*!node_modules/office-viewer/lib/render/renderRun.js*/
amis.define("11d5fc3",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("c1138ba"),i=e("bc137cb"),d=e("0c75dbf"),l=e("2360183"),o=e("91e0c88"),c=e("a055a48"),p=e("d27e9db"),s=e("4ddb57e"),f=e("6044a48"),v=e("6251082"),h=e("7881268"),u=e("4800018"),y=e("4fcf599"),b=e("330156f"),x=e("f0f42de"),C=e("e7573e2"),S=e("b364d89"),T=e("35c6a3a"),g=e("5774688"),m=e("558d5ae"),H=e("9f81360"),k=e("228896e"),w=e("2071838"),P=e("d8bc79e"),B=e("0ed4931"),E="variable";function _(e,n,r,t){var a;if(-1===r.indexOf("{{")){var i=void 0;i=(null===(a=null==t?void 0:t.properties)||void 0===a?void 0:a.autoSpace)?g.cjkspace(r.split("")):r,e.textContent=i}else e.dataset.originText=r,e.classList.add(E),e.textContent=n.replaceText(r);var d=e.innerHTML.split("  ").join("&nbsp;&nbsp;");e.innerHTML=d}n.default=function(e,n,r,t,g){var E,j,L,M,D=d.createElement("span");if(e.addClass(D,"r"),s.setElementStyle(e,D,n.properties),null===(L=n.properties)||void 0===L?void 0:L.rStyle){var I=e.getStyle(n.properties.rStyle);(null===(M=null==I?void 0:I.rPr)||void 0===M?void 0:M.cssStyle)&&d.applyStyle(D,I.rPr.cssStyle)}if(1===n.children.length&&n.children[0]instanceof l.Text)_(D,e,n.children[0].text,r);else try{for(var N=a.__values(n.children),O=N.next();!O.done;O=N.next()){var R=O.value;if(R instanceof l.Text){var q=d.createElement("span");_(q,e,R.text,r),d.appendChild(D,q)}else if(R instanceof o.Break){var A=i.renderBr(e,R);d.appendChild(D,A)}else R instanceof c.Drawing?d.appendChild(D,p.renderDrawing(e,R,g)):R instanceof f.Tab?d.appendChild(D,v.renderTab(e,R)):R instanceof u.Pict?d.appendChild(D,h.renderPict(e,R)):R instanceof y.Ruby?d.appendChild(D,b.renderRuby(e,R)):R instanceof x.InstrText?d.appendChild(D,C.renderInstrText(e,R)):R instanceof S.Sym?d.appendChild(D,T.renderSym(e,R)):R instanceof H.SoftHyphen?d.appendChild(D,m.renderSoftHyphen()):R instanceof k.NoBreakHyphen?d.appendChild(D,w.renderNoBreakHyphen()):R instanceof P.Separator?d.appendChild(D,B.renderSeparator()):console.warn("unknown child",R)}}catch(e){E={error:e}}finally{try{O&&!O.done&&(j=N.return)&&j.call(N)}finally{if(E)throw E.error}}return D},n.updateVariableText=function(e){for(var n=e.rootElement.querySelectorAll(".".concat(E)),r=0;r<n.length;r++){var t=n[r],a=t.dataset.originText||"";t.textContent=e.replaceText(a)}}}));
;/*!node_modules/office-viewer/lib/render/renderNumbering.js*/
amis.define("d749888",(function(e,r,n,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("c1138ba"),l=e("0c75dbf"),u=e("4ddb57e");function s(e){var r={M:1e3,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},n="";for(var t in r)for(;e>=r[t];)n+=t,e-=r[t];return n}function i(e,r){switch(e){case"decimal":default:return r.toString();case"lowerLetter":return String.fromCharCode(96+r);case"upperLetter":return String.fromCharCode(64+r);case"lowerRoman":return s(r).toLowerCase();case"upperRoman":return s(r).toUpperCase();case"bullet":return"&bull;"}}r.renderNumbering=function(e,r,n){var t=r.numbering,s=n.numId;if(!s)return console.warn("renderNumbering: numId is empty"),null;if(!t)return console.warn("renderNumbering: numbering is empty"),null;var o=t.nums[s];if(!o)return console.warn("renderNumbering: num is empty"),null;var m=t.abstractNums[o.abstractNumId].lvls;o.lvlOverride&&(m=a.__assign(a.__assign({},m),o.lvlOverride.lvls));var f=m[n.ilvl];if(!f)return console.warn("renderNumbering: lvl is empty"),null;var c=n.ilvl,d=t.numData[s];if(d[c])for(var v in d[c]+=1,d)parseInt(v)>parseInt(c)&&(d[v]=0);else d[c]=f.start;for(var p=l.createElement("span"),b=f.lvlText,g=parseInt(c),C=[],I=0;I<=g;I++){var L=d[I];if(L){var w=i(m[I].numFmt,L);f.isLgl&&(w=String(L)),C.push(w)}}for(I=0;I<C.length;I++){var S=C[I];b=b.replace("%".concat(I+1),S)}if(u.setElementStyle(r,e,f.pPr),u.setElementStyle(r,p,f.rPr),"bullet"!==f.numFmt||r.renderOptions.bulletUseFont)p.innerText=b;else{var y="&bull;",N=b.charCodeAt(0).toString(16).padStart(4,"0");"f06e"===N?y="&#9632;":"f075"===N?y="&#9670;":"f0d8"===N&&(y="&#9658;"),p.innerHTML=y}return"space"===f.suff?p.innerHTML+=" ":"tab"===f.suff&&(p.innerHTML+="&emsp;"),p}}));
;/*!node_modules/office-viewer/lib/util/xml.js*/
amis.define("3a0c5a7",(function(e,r,i,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r.buildXML=function(e){return(new XMLSerializer).serializeToString(e)},r.parseXML=function(e){return(new DOMParser).parseFromString(e,"application/xml")}}));
;/*!node_modules/office-viewer/lib/openxml/math/xsl.js*/
amis.define("120120e",(function(e,t,n,s){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var l=e("3a0c5a7").parseXML('\n<?xml version="1.0" encoding="UTF-8" ?>\n<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:mml="http://www.w3.org/1998/Math/MathML"\n\txmlns:m="http://schemas.openxmlformats.org/officeDocument/2006/math">\n  <xsl:output method="xml" encoding="UTF-16" />\n\n  \x3c!-- %% Global Definitions --\x3e\n\n  \x3c!-- Every single unicode character that is recognized by OMML as an operator --\x3e\n  <xsl:variable name="sOperators"\n\t\tselect="concat(\n          \'&#x00A8;&#x0021;&#x0022;&#x0023;&#x0026;&#x0028;&#x0029;&#x002B;&#x002C;&#x002D;&#x002E;&#x002F;&#x003A;\',\n          \'&#x003B;&#x003C;&#x003D;&#x003E;&#x003F;&#x0040;&#x005B;&#x005C;&#x005D;&#x005E;&#x005F;&#x0060;&#x007B;\',\n          \'&#x007C;&#x007D;&#x007E;&#x00A1;&#x00A6;&#x00AC;&#x00AF;&#x00B0;&#x00B1;&#x00B2;&#x00B3;&#x00B4;&#x00B7;&#x00B9;&#x00BF;\',\n          \'&#x00D7;&#x007E;&#x00F7;&#x02C7;&#x02D8;&#x02D9;&#x02DC;&#x02DD;&#x0300;&#x0301;&#x0302;&#x0303;&#x0304;&#x0305;&#x0306;&#x0307;&#x0308;&#x0309;\',\n          \'&#x030A;&#x030B;&#x030C;&#x030D;&#x030E;&#x030F;&#x0310;&#x0311;&#x0312;&#x0313;&#x0314;&#x0315;\',\n          \'&#x0316;&#x0317;&#x0318;&#x0319;&#x031A;&#x031B;&#x031C;&#x031D;&#x031E;&#x031F;&#x0320;&#x0321;\',\n          \'&#x0322;&#x0323;&#x0324;&#x0325;&#x0326;&#x0327;&#x0328;&#x0329;&#x032A;&#x032B;&#x032C;&#x032D;\',\n          \'&#x032E;&#x032F;&#x0330;&#x0331;&#x0332;&#x0333;&#x0334;&#x0335;&#x0336;&#x0337;&#x0338;&#x033F;\',\n          \'&#x2000;&#x2001;&#x2002;&#x2003;&#x2004;&#x2005;&#x2006;&#x2009;&#x200A;&#x2010;&#x2012;&#x2013;\',\n          \'&#x2014;&#x2016;&#x2020;&#x2021;&#x2022;&#x2024;&#x2025;&#x2026;&#x2032;&#x2033;&#x2034;&#x203C;\',\n          \'&#x2040;&#x2044;&#x204E;&#x204F;&#x2050;&#x2057;&#x2061;&#x2062;&#x2063;&#x2070;&#x2074;&#x2075;\',\n          \'&#x2076;&#x2077;&#x2078;&#x2079;&#x207A;&#x207B;&#x207C;&#x207D;&#x207E;&#x2080;&#x2081;&#x2082;\',\n          \'&#x2083;&#x2084;&#x2085;&#x2086;&#x2087;&#x2088;&#x2089;&#x208A;&#x208B;&#x208C;&#x208D;&#x208E;\',\n          \'&#x20D0;&#x20D1;&#x20D2;&#x20D3;&#x20D4;&#x20D5;&#x20D6;&#x20D7;&#x20D8;&#x20D9;&#x20DA;&#x20DB;\',\n          \'&#x20DC;&#x20DD;&#x20DE;&#x20DF;&#x20E0;&#x20E1;&#x20E4;&#x20E5;&#x20E6;&#x20E7;&#x20E8;&#x20E9;\',\n          \'&#x20EA;&#x2140;&#x2146;&#x2190;&#x2191;&#x2192;&#x2193;&#x2194;&#x2195;&#x2196;&#x2197;&#x2198;&#x2199;\',\n          \'&#x219A;&#x219B;&#x219C;&#x219D;&#x219E;&#x219F;&#x21A0;&#x21A1;&#x21A2;&#x21A3;&#x21A4;&#x21A5;\',\n          \'&#x21A6;&#x21A7;&#x21A8;&#x21A9;&#x21AA;&#x21AB;&#x21AC;&#x21AD;&#x21AE;&#x21AF;&#x21B0;&#x21B1;\',\n          \'&#x21B2;&#x21B3;&#x21B6;&#x21B7;&#x21BA;&#x21BB;&#x21BC;&#x21BD;&#x21BE;&#x21BF;&#x21C0;&#x21C1;\',\n          \'&#x21C2;&#x21C3;&#x21C4;&#x21C5;&#x21C6;&#x21C7;&#x21C8;&#x21C9;&#x21CA;&#x21CB;&#x21CC;&#x21CD;\',\n          \'&#x21CE;&#x21CF;&#x21D0;&#x21D1;&#x21D2;&#x21D3;&#x21D4;&#x21D5;&#x21D6;&#x21D7;&#x21D8;&#x21D9;\',\n          \'&#x21DA;&#x21DB;&#x21DC;&#x21DD;&#x21DE;&#x21DF;&#x21E0;&#x21E1;&#x21E2;&#x21E3;&#x21E4;&#x21E5;\',\n          \'&#x21E6;&#x21E7;&#x21E8;&#x21E9;&#x21F3;&#x21F4;&#x21F5;&#x21F6;&#x21F7;&#x21F8;&#x21F9;&#x21FA;\',\n          \'&#x21FB;&#x21FC;&#x21FD;&#x21FE;&#x21FF;&#x2200;&#x2201;&#x2202;&#x2203;&#x2204;&#x2206;&#x2207;\',\n          \'&#x2208;&#x2209;&#x220A;&#x220B;&#x220C;&#x220D;&#x220F;&#x2210;&#x2211;&#x2212;&#x2213;&#x2214;\',\n          \'&#x2215;&#x2216;&#x2217;&#x2218;&#x2219;&#x221A;&#x221B;&#x221C;&#x221D;&#x2223;&#x2224;&#x2225;\',\n          \'&#x2226;&#x2227;&#x2228;&#x2229;&#x222A;&#x222B;&#x222C;&#x222D;&#x222E;&#x222F;&#x2230;&#x2231;\',\n          \'&#x2232;&#x2233;&#x2234;&#x2235;&#x2236;&#x2237;&#x2238;&#x2239;&#x223A;&#x223B;&#x223C;&#x223D;\',\n          \'&#x223E;&#x2240;&#x2241;&#x2242;&#x2243;&#x2244;&#x2245;&#x2246;&#x2247;&#x2248;&#x2249;&#x224A;\',\n          \'&#x224B;&#x224C;&#x224D;&#x224E;&#x224F;&#x2250;&#x2251;&#x2252;&#x2253;&#x2254;&#x2255;&#x2256;\',\n          \'&#x2257;&#x2258;&#x2259;&#x225A;&#x225B;&#x225C;&#x225D;&#x225E;&#x225F;&#x2260;&#x2261;&#x2262;\',\n          \'&#x2263;&#x2264;&#x2265;&#x2266;&#x2267;&#x2268;&#x2269;&#x226A;&#x226B;&#x226C;&#x226D;&#x226E;\',\n          \'&#x226F;&#x2270;&#x2271;&#x2272;&#x2273;&#x2274;&#x2275;&#x2276;&#x2277;&#x2278;&#x2279;&#x227A;\',\n          \'&#x227B;&#x227C;&#x227D;&#x227E;&#x227F;&#x2280;&#x2281;&#x2282;&#x2283;&#x2284;&#x2285;&#x2286;\',\n          \'&#x2287;&#x2288;&#x2289;&#x228A;&#x228B;&#x228C;&#x228D;&#x228E;&#x228F;&#x2290;&#x2291;&#x2292;\',\n          \'&#x2293;&#x2294;&#x2295;&#x2296;&#x2297;&#x2298;&#x2299;&#x229A;&#x229B;&#x229C;&#x229D;&#x229E;\',\n          \'&#x229F;&#x22A0;&#x22A1;&#x22A2;&#x22A3;&#x22A5;&#x22A6;&#x22A7;&#x22A8;&#x22A9;&#x22AA;&#x22AB;\',\n          \'&#x22AC;&#x22AD;&#x22AE;&#x22AF;&#x22B0;&#x22B1;&#x22B2;&#x22B3;&#x22B4;&#x22B5;&#x22B6;&#x22B7;\',\n          \'&#x22B8;&#x22B9;&#x22BA;&#x22BB;&#x22BC;&#x22BD;&#x22C0;&#x22C1;&#x22C2;&#x22C3;&#x22C4;&#x22C5;\',\n          \'&#x22C6;&#x22C7;&#x22C8;&#x22C9;&#x22CA;&#x22CB;&#x22CC;&#x22CD;&#x22CE;&#x22CF;&#x22D0;&#x22D1;\',\n          \'&#x22D2;&#x22D3;&#x22D4;&#x22D5;&#x22D6;&#x22D7;&#x22D8;&#x22D9;&#x22DA;&#x22DB;&#x22DC;&#x22DD;\',\n          \'&#x22DE;&#x22DF;&#x22E0;&#x22E1;&#x22E2;&#x22E3;&#x22E4;&#x22E5;&#x22E6;&#x22E7;&#x22E8;&#x22E9;\',\n          \'&#x22EA;&#x22EB;&#x22EC;&#x22ED;&#x22EE;&#x22EF;&#x22F0;&#x22F1;&#x22F2;&#x22F3;&#x22F4;&#x22F5;\',\n          \'&#x22F6;&#x22F7;&#x22F8;&#x22F9;&#x22FA;&#x22FB;&#x22FC;&#x22FD;&#x22FE;&#x22FF;&#x2305;&#x2306;\',\n          \'&#x2308;&#x2309;&#x230A;&#x230B;&#x231C;&#x231D;&#x231E;&#x231F;&#x2322;&#x2323;&#x2329;&#x232A;\',\n          \'&#x233D;&#x233F;&#x23B0;&#x23B1;&#x23DC;&#x23DD;&#x23DE;&#x23DF;&#x23E0;&#x2502;&#x251C;&#x2524;\',\n          \'&#x252C;&#x2534;&#x2581;&#x2588;&#x2592;&#x25A0;&#x25A1;&#x25AD;&#x25B2;&#x25B3;&#x25B4;&#x25B5;\',\n          \'&#x25B6;&#x25B7;&#x25B8;&#x25B9;&#x25BC;&#x25BD;&#x25BE;&#x25BF;&#x25C0;&#x25C1;&#x25C2;&#x25C3;\',\n          \'&#x25C4;&#x25C5;&#x25CA;&#x25CB;&#x25E6;&#x25EB;&#x25EC;&#x25F8;&#x25F9;&#x25FA;&#x25FB;&#x25FC;\',\n          \'&#x25FD;&#x25FE;&#x25FF;&#x2605;&#x2606;&#x2772;&#x2773;&#x27D1;&#x27D2;&#x27D3;&#x27D4;&#x27D5;\',\n          \'&#x27D6;&#x27D7;&#x27D8;&#x27D9;&#x27DA;&#x27DB;&#x27DC;&#x27DD;&#x27DE;&#x27DF;&#x27E0;&#x27E1;\',\n          \'&#x27E2;&#x27E3;&#x27E4;&#x27E5;&#x27E6;&#x27E7;&#x27E8;&#x27E9;&#x27EA;&#x27EB;&#x27F0;&#x27F1;\',\n          \'&#x27F2;&#x27F3;&#x27F4;&#x27F5;&#x27F6;&#x27F7;&#x27F8;&#x27F9;&#x27FA;&#x27FB;&#x27FC;&#x27FD;\',\n          \'&#x27FE;&#x27FF;&#x2900;&#x2901;&#x2902;&#x2903;&#x2904;&#x2905;&#x2906;&#x2907;&#x2908;&#x2909;\',\n          \'&#x290A;&#x290B;&#x290C;&#x290D;&#x290E;&#x290F;&#x2910;&#x2911;&#x2912;&#x2913;&#x2914;&#x2915;\',\n          \'&#x2916;&#x2917;&#x2918;&#x2919;&#x291A;&#x291B;&#x291C;&#x291D;&#x291E;&#x291F;&#x2920;&#x2921;\',\n          \'&#x2922;&#x2923;&#x2924;&#x2925;&#x2926;&#x2927;&#x2928;&#x2929;&#x292A;&#x292B;&#x292C;&#x292D;\',\n          \'&#x292E;&#x292F;&#x2930;&#x2931;&#x2932;&#x2933;&#x2934;&#x2935;&#x2936;&#x2937;&#x2938;&#x2939;\',\n          \'&#x293A;&#x293B;&#x293C;&#x293D;&#x293E;&#x293F;&#x2940;&#x2941;&#x2942;&#x2943;&#x2944;&#x2945;\',\n          \'&#x2946;&#x2947;&#x2948;&#x2949;&#x294A;&#x294B;&#x294C;&#x294D;&#x294E;&#x294F;&#x2950;&#x2951;\',\n          \'&#x2952;&#x2953;&#x2954;&#x2955;&#x2956;&#x2957;&#x2958;&#x2959;&#x295A;&#x295B;&#x295C;&#x295D;\',\n          \'&#x295E;&#x295F;&#x2960;&#x2961;&#x2962;&#x2963;&#x2964;&#x2965;&#x2966;&#x2967;&#x2968;&#x2969;\',\n          \'&#x296A;&#x296B;&#x296C;&#x296D;&#x296E;&#x296F;&#x2970;&#x2971;&#x2972;&#x2973;&#x2974;&#x2975;\',\n          \'&#x2976;&#x2977;&#x2978;&#x2979;&#x297A;&#x297B;&#x297C;&#x297D;&#x297E;&#x297F;&#x2980;&#x2982;\',\n          \'&#x2983;&#x2984;&#x2985;&#x2986;&#x2987;&#x2988;&#x2989;&#x298A;&#x298B;&#x298C;&#x298D;&#x298E;\',\n          \'&#x298F;&#x2990;&#x2991;&#x2992;&#x2993;&#x2994;&#x2995;&#x2996;&#x2997;&#x2998;&#x2999;&#x299A;\',\n          \'&#x29B6;&#x29B7;&#x29B8;&#x29B9;&#x29C0;&#x29C1;&#x29C4;&#x29C5;&#x29C6;&#x29C7;&#x29C8;&#x29CE;\',\n          \'&#x29CF;&#x29D0;&#x29D1;&#x29D2;&#x29D3;&#x29D4;&#x29D5;&#x29D6;&#x29D7;&#x29D8;&#x29D9;&#x29DA;\',\n          \'&#x29DB;&#x29DF;&#x29E1;&#x29E2;&#x29E3;&#x29E4;&#x29E5;&#x29E6;&#x29EB;&#x29F4;&#x29F5;&#x29F6;\',\n          \'&#x29F7;&#x29F8;&#x29F9;&#x29FA;&#x29FB;&#x29FC;&#x29FD;&#x29FE;&#x29FF;&#x2A00;&#x2A01;&#x2A02;\',\n          \'&#x2A03;&#x2A04;&#x2A05;&#x2A06;&#x2A07;&#x2A08;&#x2A09;&#x2A0A;&#x2A0B;&#x2A0C;&#x2A0D;&#x2A0E;\',\n          \'&#x2A0F;&#x2A10;&#x2A11;&#x2A12;&#x2A13;&#x2A14;&#x2A15;&#x2A16;&#x2A17;&#x2A18;&#x2A19;&#x2A1A;\',\n          \'&#x2A1B;&#x2A1C;&#x2A1D;&#x2A1E;&#x2A1F;&#x2A20;&#x2A21;&#x2A22;&#x2A23;&#x2A24;&#x2A25;&#x2A26;\',\n          \'&#x2A27;&#x2A28;&#x2A29;&#x2A2A;&#x2A2B;&#x2A2C;&#x2A2D;&#x2A2E;&#x2A2F;&#x2A30;&#x2A31;&#x2A32;\',\n          \'&#x2A33;&#x2A34;&#x2A35;&#x2A36;&#x2A37;&#x2A38;&#x2A39;&#x2A3A;&#x2A3B;&#x2A3C;&#x2A3D;&#x2A3E;\',\n          \'&#x2A3F;&#x2A40;&#x2A41;&#x2A42;&#x2A43;&#x2A44;&#x2A45;&#x2A46;&#x2A47;&#x2A48;&#x2A49;&#x2A4A;\',\n          \'&#x2A4B;&#x2A4C;&#x2A4D;&#x2A4E;&#x2A4F;&#x2A50;&#x2A51;&#x2A52;&#x2A53;&#x2A54;&#x2A55;&#x2A56;\',\n          \'&#x2A57;&#x2A58;&#x2A59;&#x2A5A;&#x2A5B;&#x2A5C;&#x2A5D;&#x2A5E;&#x2A5F;&#x2A60;&#x2A61;&#x2A62;\',\n          \'&#x2A63;&#x2A64;&#x2A65;&#x2A66;&#x2A67;&#x2A68;&#x2A69;&#x2A6A;&#x2A6B;&#x2A6C;&#x2A6D;&#x2A6E;\',\n          \'&#x2A6F;&#x2A70;&#x2A71;&#x2A72;&#x2A73;&#x2A74;&#x2A75;&#x2A76;&#x2A77;&#x2A78;&#x2A79;&#x2A7A;\',\n          \'&#x2A7B;&#x2A7C;&#x2A7D;&#x2A7E;&#x2A7F;&#x2A80;&#x2A81;&#x2A82;&#x2A83;&#x2A84;&#x2A85;&#x2A86;\',\n          \'&#x2A87;&#x2A88;&#x2A89;&#x2A8A;&#x2A8B;&#x2A8C;&#x2A8D;&#x2A8E;&#x2A8F;&#x2A90;&#x2A91;&#x2A92;\',\n          \'&#x2A93;&#x2A94;&#x2A95;&#x2A96;&#x2A97;&#x2A98;&#x2A99;&#x2A9A;&#x2A9B;&#x2A9C;&#x2A9D;&#x2A9E;\',\n          \'&#x2A9F;&#x2AA0;&#x2AA1;&#x2AA2;&#x2AA3;&#x2AA4;&#x2AA5;&#x2AA6;&#x2AA7;&#x2AA8;&#x2AA9;&#x2AAA;\',\n          \'&#x2AAB;&#x2AAC;&#x2AAD;&#x2AAE;&#x2AAF;&#x2AB0;&#x2AB1;&#x2AB2;&#x2AB3;&#x2AB4;&#x2AB5;&#x2AB6;\',\n          \'&#x2AB7;&#x2AB8;&#x2AB9;&#x2ABA;&#x2ABB;&#x2ABC;&#x2ABD;&#x2ABE;&#x2ABF;&#x2AC0;&#x2AC1;&#x2AC2;\',\n          \'&#x2AC3;&#x2AC4;&#x2AC5;&#x2AC6;&#x2AC7;&#x2AC8;&#x2AC9;&#x2ACA;&#x2ACB;&#x2ACC;&#x2ACD;&#x2ACE;\',\n          \'&#x2ACF;&#x2AD0;&#x2AD1;&#x2AD2;&#x2AD3;&#x2AD4;&#x2AD5;&#x2AD6;&#x2AD7;&#x2AD8;&#x2AD9;&#x2ADA;\',\n          \'&#x2ADB;&#x2ADC;&#x2ADD;&#x2ADE;&#x2ADF;&#x2AE0;&#x2AE2;&#x2AE3;&#x2AE4;&#x2AE5;&#x2AE6;&#x2AE7;\',\n          \'&#x2AE8;&#x2AE9;&#x2AEA;&#x2AEB;&#x2AEC;&#x2AED;&#x2AEE;&#x2AEF;&#x2AF0;&#x2AF2;&#x2AF3;&#x2AF4;\',\n          \'&#x2AF5;&#x2AF6;&#x2AF7;&#x2AF8;&#x2AF9;&#x2AFA;&#x2AFB;&#x2AFC;&#x2AFD;&#x2AFE;&#x2AFF;&#x2B04;\',\n          \'&#x2B06;&#x2B07;&#x2B0C;&#x2B0D;&#x3014;&#x3015;&#x3016;&#x3017;&#x3018;&#x3019;&#xFF01;&#xFF06;\',\n          \'&#xFF08;&#xFF09;&#xFF0B;&#xFF0C;&#xFF0D;&#xFF0E;&#xFF0F;&#xFF1A;&#xFF1B;&#xFF1C;&#xFF1D;&#xFF1E;\',\n          \'&#xFF1F;&#xFF20;&#xFF3B;&#xFF3C;&#xFF3D;&#xFF3E;&#xFF3F;&#xFF5B;&#xFF5C;&#xFF5D;\')" />\n\n  \x3c!-- A string of \'-\'s repeated exactly as many times as the operators above --\x3e\n  <xsl:variable name="sMinuses">\n    <xsl:call-template name="SRepeatChar">\n      <xsl:with-param name="cchRequired" select="string-length($sOperators)" />\n      <xsl:with-param name="ch" select="\'-\'" />\n    </xsl:call-template>\n  </xsl:variable>\n\n  \x3c!-- Every single unicode character that is recognized by OMML as a number --\x3e\n  <xsl:variable name="sNumbers" select="\'0123456789\'" />\n\n  \x3c!-- A string of \'0\'s repeated exactly as many times as the list of numbers above --\x3e\n  <xsl:variable name="sZeros">\n    <xsl:call-template name="SRepeatChar">\n      <xsl:with-param name="cchRequired" select="string-length($sNumbers)" />\n      <xsl:with-param name="ch" select="\'0\'" />\n    </xsl:call-template>\n  </xsl:variable>\n\n  \x3c!-- %%Template: SReplace\n\n\t\tReplace all occurences of sOrig in sInput with sReplacement\n\t\tand return the resulting string. --\x3e\n  <xsl:template name="SReplace">\n    <xsl:param name="sInput" />\n    <xsl:param name="sOrig" />\n    <xsl:param name="sReplacement" />\n\n    <xsl:choose>\n      <xsl:when test="not(contains($sInput, $sOrig))">\n        <xsl:value-of select="$sInput" />\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:variable name="sBefore" select="substring-before($sInput, $sOrig)" />\n        <xsl:variable name="sAfter" select="substring-after($sInput, $sOrig)" />\n        <xsl:variable name="sAfterProcessed">\n          <xsl:call-template name="SReplace">\n            <xsl:with-param name="sInput" select="$sAfter" />\n            <xsl:with-param name="sOrig" select="$sOrig" />\n            <xsl:with-param name="sReplacement" select="$sReplacement" />\n          </xsl:call-template>\n        </xsl:variable>\n\n        <xsl:value-of select="concat($sBefore, concat($sReplacement, $sAfterProcessed))" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Templates --\x3e\n  <xsl:template match="/">\n    <mml:math>\n      <xsl:apply-templates select="*" />\n    </mml:math>\n  </xsl:template>\n\n  <xsl:template match="m:borderBox">\n\n    \x3c!-- Get Lowercase versions of properties --\x3e\n    <xsl:variable name="sLowerCaseHideTop" select="translate(m:borderBoxPr[last()]/m:hideTop[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseHideBot" select="translate(m:borderBoxPr[last()]/m:hideBot[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseHideLeft" select="translate(m:borderBoxPr[last()]/m:hideLeft[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseHideRight" select="translate(m:borderBoxPr[last()]/m:hideRight[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeH" select="translate(m:borderBoxPr[last()]/m:strikeH[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeV" select="translate(m:borderBoxPr[last()]/m:strikeV[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeBLTR" select="translate(m:borderBoxPr[last()]/m:strikeBLTR[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseStrikeTLBR" select="translate(m:borderBoxPr[last()]/m:strikeTLBR[last()]/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="fHideTop">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideTop" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fHideBot">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideBot" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fHideLeft">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideLeft" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fHideRight">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseHideRight" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeH">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeH" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeV">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeV" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeBLTR">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeBLTR" />\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:variable name="fStrikeTLBR">\n      <xsl:call-template name="ForceTrueStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseStrikeTLBR" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:choose>\n      <xsl:when test="$fHideTop=1\n                      and $fHideBot=1\n                      and $fHideLeft=1\n                      and $fHideRight=1\n                      and $fStrikeH=0\n                      and $fStrikeV=0\n                      and $fStrikeBLTR=0\n                      and $fStrikeTLBR=0">\n        <mml:mrow>\n          <xsl:apply-templates select="m:e[1]" />\n        </mml:mrow>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:menclose>\n          <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n            <xsl:with-param name="fHideTop" select="$fHideTop" />\n            <xsl:with-param name="fHideBot" select="$fHideBot" />\n            <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n            <xsl:with-param name="fHideRight" select="$fHideRight" />\n            <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n            <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n            <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n            <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n          </xsl:call-template>\n          <xsl:apply-templates select="m:e[1]" />\n        </mml:menclose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="*">\n    <xsl:apply-templates select="*" />\n  </xsl:template>\n\n  \x3c!--\n      { Non-combining, Upper-combining, Lower-combining }\n      {U+02D8, U+0306, U+032E}, // BREVE\n      {U+00B8, U+0312, U+0327}, // CEDILLA\n      {U+0060, U+0300, U+0316}, // GRAVE ACCENT\n      {U+002D, U+0305, U+0332}, // HYPHEN-MINUS/OVERLINE\n      {U+2212, U+0305, U+0332}, // MINUS SIGN/OVERLINE\n      {U+002E, U+0305, U+0323}, // FULL STOP/DOT ABOVE\n      {U+02D9, U+0307, U+0323}, // DOT ABOVE\n      {U+02DD, U+030B, U+02DD}, // DOUBLE ACUTE ACCENT\n      {U+00B4, U+0301, U+0317}, // ACUTE ACCENT\n      {U+007E, U+0303, U+0330}, // TILDE\n      {U+02DC, U+0303, U+0330}, // SMALL TILDE\n      {U+00A8, U+0308, U+0324}, // DIAERESIS\n      {U+02C7, U+030C, U+032C}, // CARON\n      {U+005E, U+0302, U+032D}, // CIRCUMFLEX ACCENT\n      {U+00AF, U+0305, ::::::}, // MACRON\n      {U+005F, ::::::, U+0332}, // LOW LINE\n      {U+2192, U+20D7, U+20EF}, // RIGHTWARDS ARROW\n      {U+27F6, U+20D7, U+20EF}, // LONG RIGHTWARDS ARROW\n      {U+2190, U+20D6, U+20EE}, // LEFT ARROW\n  --\x3e\n  <xsl:template name="ToNonCombining">\n    <xsl:param name="ch" />\n    <xsl:choose>\n      \x3c!-- BREVE --\x3e\n      <xsl:when test="$ch=\'&#x0306;\' or $ch=\'&#x032e;\'">&#x02D8;</xsl:when>\n      \x3c!-- CEDILLA --\x3e\n      <xsl:when test="$ch=\'&#x0312;\' or $ch=\'&#x0327;\'">&#x00B8;</xsl:when>\n      \x3c!-- GRAVE ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x0300;\' or $ch=\'&#x0316;\'">&#x0060;</xsl:when>\n      \x3c!-- HYPHEN-MINUS/OVERLINE --\x3e\n      <xsl:when test="$ch=\'&#x0305;\' or $ch=\'&#x0332;\'">&#x002D;</xsl:when>\n      \x3c!-- MINUS SIGN/OVERLINE --\x3e\n      <xsl:when test="$ch=\'&#x0305;\' or $ch=\'&#x0332;\'">&#x2212;</xsl:when>\n      \x3c!-- FULL STOP/DOT ABOVE --\x3e\n      <xsl:when test="$ch=\'&#x0305;\' or $ch=\'&#x0323;\'">&#x002E;</xsl:when>\n      \x3c!-- DOT ABOVE --\x3e\n      <xsl:when test="$ch=\'&#x0307;\' or $ch=\'&#x0323;\'">&#x02D9;</xsl:when>\n      \x3c!-- DOUBLE ACUTE ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x030B;\' or $ch=\'&#x02DD;\'">&#x02DD;</xsl:when>\n      \x3c!-- ACUTE ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x0301;\' or $ch=\'&#x0317;\'">&#x00B4;</xsl:when>\n      \x3c!-- TILDE --\x3e\n      <xsl:when test="$ch=\'&#x0303;\' or $ch=\'&#x0330;\'">&#x007E;</xsl:when>\n      \x3c!-- SMALL TILDE --\x3e\n      <xsl:when test="$ch=\'&#x0303;\' or $ch=\'&#x0330;\'">&#x02DC;</xsl:when>\n      \x3c!-- DIAERESIS --\x3e\n      <xsl:when test="$ch=\'&#x0308;\' or $ch=\'&#x0324;\'">&#x00A8;</xsl:when>\n      \x3c!-- CARON --\x3e\n      <xsl:when test="$ch=\'&#x030C;\' or $ch=\'&#x032C;\'">&#x02C7;</xsl:when>\n      \x3c!-- CIRCUMFLEX ACCENT --\x3e\n      <xsl:when test="$ch=\'&#x0302;\' or $ch=\'&#x032D;\'">&#x005E;</xsl:when>\n      \x3c!-- MACRON --\x3e\n      <xsl:when test="$ch=\'&#x0305;\'                   ">&#x00AF;</xsl:when>\n      \x3c!-- LOW LINE --\x3e\n      <xsl:when test="                   $ch=\'&#x0332;\'">&#x005F;</xsl:when>\n      \x3c!-- RIGHTWARDS ARROW --\x3e\n      <xsl:when test="$ch=\'&#x20D7;\' or $ch=\'&#x20EF;\'">&#x2192;</xsl:when>\n      \x3c!-- LONG RIGHTWARDS ARROW --\x3e\n      <xsl:when test="$ch=\'&#x20D7;\' or $ch=\'&#x20EF;\'">&#x27F6;</xsl:when>\n      \x3c!-- LEFT ARROW --\x3e\n      <xsl:when test="$ch=\'&#x20D6;\' or $ch=\'&#x20EE;\'">&#x2190;</xsl:when>\n      <xsl:otherwise>\n        <xsl:value-of select="$ch"/>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:acc">\n    <mml:mover>\n      <xsl:attribute name="accent">true</xsl:attribute>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <xsl:variable name="chAcc">\n        <xsl:choose>\n          <xsl:when test="not(m:accPr[last()]/m:chr)">\n            <xsl:value-of select="\'&#x0302;\'" />\n          </xsl:when>\n          <xsl:otherwise>\n            <xsl:value-of select="substring(m:accPr/m:chr/@m:val,1,1)" />\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:variable>\n      <xsl:variable name="chNonComb">\n        <xsl:call-template name="ToNonCombining">\n          <xsl:with-param name="ch" select="$chAcc" />\n        </xsl:call-template>\n      </xsl:variable>\n      <xsl:choose>\n        <xsl:when test="string-length($chAcc)=0">\n          <mml:mo/>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="$chNonComb" />\n            <xsl:with-param name="scr" select="m:e[1]/*/m:rPr[last()]/m:scr/@m:val" />\n            <xsl:with-param name="sty" select="m:e[1]/*/m:rPr[last()]/m:sty/@m:val" />\n            <xsl:with-param name="nor">\n              <xsl:choose>\n                <xsl:when test="count(m:e[1]/*/m:rPr[last()]/m:nor) = 0">0</xsl:when>\n                <xsl:otherwise>\n                  <xsl:call-template name="ForceFalseStrVal">\n                    <xsl:with-param name="str" select="translate(m:e[1]/*/m:rPr[last()]/m:nor/@m:val,\n                                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                 \'abcdefghijklmnopqrstuvwxyz\')" />\n                  </xsl:call-template>\n                </xsl:otherwise>\n              </xsl:choose>\n            </xsl:with-param>\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </mml:mover>\n  </xsl:template>\n\n  <xsl:template name="OutputScript">\n    <xsl:param name="ndCur" select="." />\n    <xsl:choose>\n      \x3c!-- Only output contents of $ndCur if $ndCur exists\n           and $ndCur has children --\x3e\n      <xsl:when test="count($ndCur/*) &gt; 0">\n        <mml:mrow>\n          <xsl:apply-templates select="$ndCur" />\n        </mml:mrow>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:none />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:sPre">\n    <mml:mmultiscripts>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mprescripts />\n      <xsl:call-template name="OutputScript">\n        <xsl:with-param name="ndCur" select="m:sub[1]"/>\n      </xsl:call-template>\n      <xsl:call-template name="OutputScript">\n        <xsl:with-param name="ndCur" select="m:sup[1]" />\n      </xsl:call-template>\n    </mml:mmultiscripts>\n  </xsl:template>\n\n  <xsl:template match="m:m">\n    <mml:mtable>\n      <xsl:call-template name="CreateMathMLMatrixAttr">\n        <xsl:with-param name="mcJc" select="m:mPr[last()]/m:mcs/m:mc/m:mcPr[last()]/m:mcJc/@m:val" />\n      </xsl:call-template>\n      <xsl:for-each select="m:mr">\n        <mml:mtr>\n          <xsl:for-each select="m:e">\n            <mml:mtd>\n              <xsl:apply-templates select="." />\n            </mml:mtd>\n          </xsl:for-each>\n        </mml:mtr>\n      </xsl:for-each>\n    </mml:mtable>\n  </xsl:template>\n\n  <xsl:template name="CreateMathMLMatrixAttr">\n    <xsl:param name="mcJc" />\n    <xsl:variable name="sLowerCaseMcjc" select="translate($mcJc, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                             \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:choose>\n      <xsl:when test="$sLowerCaseMcjc=\'left\'">\n        <xsl:attribute name="columnalign">left</xsl:attribute>\n      </xsl:when>\n      <xsl:when test="$sLowerCaseMcjc=\'right\'">\n        <xsl:attribute name="columnalign">right</xsl:attribute>\n      </xsl:when>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:phant">\n    <xsl:variable name="sLowerCaseZeroWidVal" select="translate(m:phantPr[last()]/m:zeroWid[last()]/@m:val,\n\t\t                                                       \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                       \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseZeroAscVal" select="translate(m:phantPr[last()]/m:zeroAsc[last()]/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseZeroDescVal" select="translate(m:phantPr[last()]/m:zeroDesc[last()]/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="sLowerCaseShowVal" select="translate(m:phantPr[last()]/m:show[last()]/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n\n\n    \x3c!-- The following properties default to \'yes\' unless the last value equals \'no\' or there isn\'t any node for\n         the property --\x3e\n\n    <xsl:variable name="fZeroWid">\n      <xsl:choose>\n        <xsl:when test="count(m:phantPr[last()]/m:zeroWid[last()]) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="$sLowerCaseZeroWidVal" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:variable name="fZeroAsc">\n      <xsl:choose>\n        <xsl:when test="count(m:phantPr[last()]/m:zeroAsc[last()]) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="$sLowerCaseZeroAscVal" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:variable name="fZeroDesc">\n      <xsl:choose>\n        <xsl:when test="count(m:phantPr[last()]/m:zeroDesc[last()]) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="$sLowerCaseZeroDescVal" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    \x3c!-- The show property defaults to \'on\' unless there exists a show property and its value is \'off\' --\x3e\n\n    <xsl:variable name="fShow">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseShowVal" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:choose>\n      \x3c!-- Show the phantom contents, therefore, just use mpadded. --\x3e\n      <xsl:when test="$fShow = 1">\n        <xsl:element name="mml:mpadded">\n          <xsl:call-template name="CreateMpaddedAttributes">\n            <xsl:with-param name="fZeroWid" select="$fZeroWid" />\n            <xsl:with-param name="fZeroAsc" select="$fZeroAsc" />\n            <xsl:with-param name="fZeroDesc" select="$fZeroDesc" />\n          </xsl:call-template>\n          <mml:mrow>\n            <xsl:apply-templates select="m:e" />\n          </mml:mrow>\n        </xsl:element>\n      </xsl:when>\n      \x3c!-- Don\'t show phantom contents, but don\'t smash anything, therefore, just\n           use mphantom --\x3e\n      <xsl:when test="$fZeroWid=0 and $fZeroAsc=0 and $fZeroDesc=0">\n        <xsl:element name="mml:mphantom">\n          <mml:mrow>\n            <xsl:apply-templates select="m:e" />\n          </mml:mrow>\n        </xsl:element>\n      </xsl:when>\n      \x3c!-- Combination --\x3e\n      <xsl:otherwise>\n        <xsl:element name="mml:mphantom">\n          <xsl:element name="mml:mpadded">\n            <xsl:call-template name="CreateMpaddedAttributes">\n              <xsl:with-param name="fZeroWid" select="$fZeroWid" />\n              <xsl:with-param name="fZeroAsc" select="$fZeroAsc" />\n              <xsl:with-param name="fZeroDesc" select="$fZeroDesc" />\n            </xsl:call-template>\n            <mml:mrow>\n              <xsl:apply-templates select="m:e" />\n            </mml:mrow>\n          </xsl:element>\n        </xsl:element>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template name="CreateMpaddedAttributes">\n    <xsl:param name="fZeroWid" />\n    <xsl:param name="fZeroAsc" />\n    <xsl:param name="fZeroDesc" />\n\n    <xsl:if test="$fZeroWid=1">\n      <xsl:attribute name="width">0in</xsl:attribute>\n    </xsl:if>\n    <xsl:if test="$fZeroAsc=1">\n      <xsl:attribute name="height">0in</xsl:attribute>\n    </xsl:if>\n    <xsl:if test="$fZeroDesc=1">\n      <xsl:attribute name="depth">0in</xsl:attribute>\n    </xsl:if>\n  </xsl:template>\n\n\n\n  <xsl:template match="m:rad">\n    <xsl:variable name="fDegHide">\n      <xsl:choose>\n        <xsl:when test="count(m:radPr[last()]/m:degHide)=0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="translate(m:radPr[last()]/m:degHide/@m:val,\n\t\t                                                          \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                          \'abcdefghijklmnopqrstuvwxyz\')" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$fDegHide=1">\n        <mml:msqrt>\n          <xsl:apply-templates select="m:e[1]" />\n        </mml:msqrt>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:mroot>\n          <mml:mrow>\n            <xsl:apply-templates select="m:e[1]" />\n          </mml:mrow>\n          <mml:mrow>\n            <xsl:apply-templates select="m:deg[1]" />\n          </mml:mrow>\n        </mml:mroot>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template name="OutputNaryMo">\n    <xsl:param name="ndCur" select="." />\n    <xsl:param name="fGrow" select="0" />\n    <mml:mo>\n      <xsl:choose>\n        <xsl:when test="$fGrow=1">\n          <xsl:attribute name="stretchy">true</xsl:attribute>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:attribute name="stretchy">false</xsl:attribute>\n        </xsl:otherwise>\n      </xsl:choose>\n      <xsl:choose>\n        <xsl:when test="not($ndCur/m:naryPr[last()]/m:chr/@m:val) or\n\t\t\t                            $ndCur/m:naryPr[last()]/m:chr/@m:val=\'\'">\n          <xsl:text>&#x222b;</xsl:text>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="$ndCur/m:naryPr[last()]/m:chr/@m:val" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </mml:mo>\n  </xsl:template>\n\n  \x3c!-- %%Template match m:nary\n\t\tProcess an n-ary.\n\n\t\tDecides, based on which arguments are supplied, between\n\t\tusing an mo, msup, msub, or msubsup for the n-ary operator\n\t--\x3e\n  <xsl:template match="m:nary">\n    <xsl:variable name="sLowerCaseSubHide">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:subHide) = 0">\n          <xsl:text>off</xsl:text>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="translate(m:naryPr[last()]/m:subHide/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="sLowerCaseSupHide">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:supHide) = 0">\n          <xsl:text>off</xsl:text>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="translate(m:naryPr[last()]/m:supHide/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="sLowerCaseLimLoc">\n      <xsl:value-of select="translate(m:naryPr[last()]/m:limLoc/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n    </xsl:variable>\n\n    <xsl:variable name="sLowerGrow">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:grow)=0">off</xsl:when>\n        <xsl:otherwise>\n          <xsl:value-of select="translate(m:naryPr[last()]/m:grow/@m:val,\n\t                                  \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t                                  \'abcdefghijklmnopqrstuvwxyz\')" />\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="fLimLocSubSup">\n      <xsl:choose>\n        <xsl:when test="count(m:naryPr[last()]/m:limLoc)=0 or $sLowerCaseLimLoc=\'subsup\'">1</xsl:when>\n        <xsl:otherwise>0</xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:variable name="fGrow">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerGrow" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:variable name="fSupHide">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseSupHide" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <xsl:variable name="fSubHide">\n      <xsl:call-template name="ForceFalseStrVal">\n        <xsl:with-param name="str" select="$sLowerCaseSubHide" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    <mml:mrow>\n      <xsl:choose>\n        <xsl:when test="$fSupHide=1 and $fSubHide=1">\n          <xsl:call-template name="OutputNaryMo">\n            <xsl:with-param name="ndCur" select="." />\n            <xsl:with-param name="fGrow" select="$fGrow" />\n          </xsl:call-template>\n        </xsl:when>\n        <xsl:when test="$fSubHide=1">\n          <xsl:choose>\n            <xsl:when test="$fLimLocSubSup=1">\n              <mml:msup>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:msup>\n            </xsl:when>\n            <xsl:otherwise>\n              <mml:mover>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:mover>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:when>\n        <xsl:when test="$fSupHide=1">\n          <xsl:choose>\n            <xsl:when test="$fLimLocSubSup=1">\n              <mml:msub>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n              </mml:msub>\n            </xsl:when>\n            <xsl:otherwise>\n              <mml:munder>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n              </mml:munder>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:choose>\n            <xsl:when test="$fLimLocSubSup=1">\n              <mml:msubsup>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:msubsup>\n            </xsl:when>\n            <xsl:otherwise>\n              <mml:munderover>\n                <xsl:call-template name="OutputNaryMo">\n                  <xsl:with-param name="ndCur" select="." />\n                  <xsl:with-param name="fGrow" select="$fGrow" />\n                </xsl:call-template>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sub[1]" />\n                </mml:mrow>\n                <mml:mrow>\n                  <xsl:apply-templates select="m:sup[1]" />\n                </mml:mrow>\n              </mml:munderover>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:otherwise>\n      </xsl:choose>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n    </mml:mrow>\n  </xsl:template>\n\n  <xsl:template match="m:limLow">\n    <mml:munder>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:lim[1]" />\n      </mml:mrow>\n    </mml:munder>\n  </xsl:template>\n\n  <xsl:template match="m:limUpp">\n    <mml:mover>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:lim[1]" />\n      </mml:mrow>\n    </mml:mover>\n  </xsl:template>\n\n  <xsl:template match="m:sSub">\n    <mml:msub>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sub[1]" />\n      </mml:mrow>\n    </mml:msub>\n  </xsl:template>\n\n  <xsl:template match="m:sSup">\n    <mml:msup>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sup[1]" />\n      </mml:mrow>\n    </mml:msup>\n  </xsl:template>\n\n  <xsl:template match="m:sSubSup">\n    <mml:msubsup>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sub[1]" />\n      </mml:mrow>\n      <mml:mrow>\n        <xsl:apply-templates select="m:sup[1]" />\n      </mml:mrow>\n    </mml:msubsup>\n  </xsl:template>\n\n  <xsl:template match="m:groupChr">\n    <xsl:variable name="ndLastGroupChrPr" select="m:groupChrPr[last()]" />\n    <xsl:variable name="sLowerCasePos" select="translate($ndLastGroupChrPr/m:pos/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n\n    <xsl:variable name="sLowerCaseVertJc" select="translate($ndLastGroupChrPr/m:vertJc/@m:val,\n\t\t                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                     \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:variable name="ndLastChr" select="$ndLastGroupChrPr/m:chr" />\n\n    <xsl:variable name="chr">\n      <xsl:choose>\n        <xsl:when test="$ndLastChr and (not($ndLastChr/@m:val) or string-length($ndLastChr/@m:val) = 0)"></xsl:when>\n        <xsl:when test="string-length($ndLastChr/@m:val) &gt;= 1">\n          <xsl:value-of select="substring($ndLastChr/@m:val,1,1)" />\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:text>&#x023DF;</xsl:text>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$sLowerCasePos = \'top\'">\n        <xsl:choose>\n          <xsl:when test="$sLowerCaseVertJc = \'bot\'">\n            <mml:mover accent="false">\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n            </mml:mover>\n          </xsl:when>\n          <xsl:otherwise>\n            <mml:munder accentunder="false">\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n            </mml:munder>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:choose>\n          <xsl:when test="$sLowerCaseVertJc = \'bot\'">\n            <mml:mover accent="false">\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n            </mml:mover>\n          </xsl:when>\n          <xsl:otherwise>\n            <mml:munder accentunder="false">\n              <mml:mrow>\n                <xsl:apply-templates select="m:e[1]" />\n              </mml:mrow>\n              <mml:mo>\n                <xsl:value-of select="$chr" />\n              </mml:mo>\n            </mml:munder>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template name="fName">\n    <xsl:for-each select="m:fName/*">\n      <xsl:apply-templates select="." />\n    </xsl:for-each>\n  </xsl:template>\n\n  <xsl:template match="m:func">\n    <mml:mrow>\n      <mml:mrow>\n        <xsl:call-template name="fName" />\n      </mml:mrow>\n      <mml:mo>&#x02061;</mml:mo>\n      <mml:mrow>\n        <xsl:apply-templates select="m:e" />\n      </mml:mrow>\n    </mml:mrow>\n  </xsl:template>\n\n  \x3c!-- %%Template: match m:f\n\n\t\tm:f maps directly to mfrac.\n\t--\x3e\n  <xsl:template match="m:f">\n    <xsl:variable name="sLowerCaseType" select="translate(m:fPr[last()]/m:type/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\', \'abcdefghijklmnopqrstuvwxyz\')" />\n    <xsl:choose>\n      <xsl:when test="$sLowerCaseType=\'lin\'">\n        <mml:mrow>\n          <mml:mrow>\n            <xsl:apply-templates select="m:num[1]" />\n          </mml:mrow>\n          <mml:mo>/</mml:mo>\n          <mml:mrow>\n            <xsl:apply-templates select="m:den[1]" />\n          </mml:mrow>\n        </mml:mrow>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:mfrac>\n          <xsl:call-template name="CreateMathMLFracProp">\n            <xsl:with-param name="type" select="$sLowerCaseType" />\n          </xsl:call-template>\n          <mml:mrow>\n            <xsl:apply-templates select="m:num[1]" />\n          </mml:mrow>\n          <mml:mrow>\n            <xsl:apply-templates select="m:den[1]" />\n          </mml:mrow>\n        </mml:mfrac>\n      </xsl:otherwise>\n    </xsl:choose>\n\n  </xsl:template>\n\n\n  \x3c!-- %%Template: CreateMathMLFracProp\n\n\t\t\tMake fraction properties based on supplied parameters.\n\t\t\tOMML differentiates between a linear fraction and a skewed\n\t\t\tone. For MathML, we write both as bevelled.\n\t--\x3e\n  <xsl:template name="CreateMathMLFracProp">\n    <xsl:param name="type" />\n    <xsl:variable name="sLowerCaseType" select="translate($type, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\', \'abcdefghijklmnopqrstuvwxyz\')" />\n\n    <xsl:if test="$sLowerCaseType=\'skw\' or $sLowerCaseType=\'lin\'">\n      <xsl:attribute name="bevelled">true</xsl:attribute>\n    </xsl:if>\n    <xsl:if test="$sLowerCaseType=\'nobar\'">\n      <xsl:attribute name="linethickness">0pt</xsl:attribute>\n    </xsl:if>\n    <xsl:choose>\n      <xsl:when test="sLowerCaseNumJc=\'right\'">\n        <xsl:attribute name="numalign">right</xsl:attribute>\n      </xsl:when>\n      <xsl:when test="sLowerCaseNumJc=\'left\'">\n        <xsl:attribute name="numalign">left</xsl:attribute>\n      </xsl:when>\n    </xsl:choose>\n    <xsl:choose>\n      <xsl:when test="sLowerCaseDenJc=\'right\'">\n        <xsl:attribute name="numalign">right</xsl:attribute>\n      </xsl:when>\n      <xsl:when test="sLowerCaseDenJc=\'left\'">\n        <xsl:attribute name="numalign">left</xsl:attribute>\n      </xsl:when>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template: match m:e | m:den | m:num | m:lim | m:sup | m:sub\n\n\t\tThese element delinate parts of an expression (like the numerator).  --\x3e\n  <xsl:template match="m:e | m:den | m:num | m:lim | m:sup | m:sub">\n    <xsl:choose>\n\n      \x3c!-- If there is no scriptLevel specified, just call through --\x3e\n      <xsl:when test="not(m:argPr[last()]/m:scrLvl/@m:val)">\n        <xsl:apply-templates select="*" />\n      </xsl:when>\n\n      \x3c!-- Otherwise, create an mstyle and set the script level --\x3e\n      <xsl:otherwise>\n        <mml:mstyle>\n          <xsl:attribute name="scriptlevel">\n            <xsl:value-of select="m:argPr[last()]/m:scrLvl/@m:val" />\n          </xsl:attribute>\n          <xsl:apply-templates select="*" />\n        </mml:mstyle>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:bar">\n    <xsl:variable name="sLowerCasePos" select="translate(m:barPr/m:pos/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                       \'abcdefghijklmnopqrstuvwxyz\')" />\n\n    <xsl:variable name="fTop">\n\n      <xsl:choose>\n        <xsl:when test="$sLowerCasePos=\'top\'">1</xsl:when>\n        <xsl:otherwise>0</xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$fTop=1">\n        <mml:mover accent="false">\n          <mml:mrow>\n            <xsl:apply-templates select="m:e[1]" />\n          </mml:mrow>\n          <mml:mo>\n            <xsl:text>&#x00AF;</xsl:text>\n          </mml:mo>\n        </mml:mover>\n      </xsl:when>\n      <xsl:otherwise>\n        <mml:munder underaccent="false">\n          <mml:mrow>\n            <xsl:apply-templates select="m:e[1]" />\n          </mml:mrow>\n          <mml:mo>\n            <xsl:text>&#x005F;</xsl:text>\n          </mml:mo>\n        </mml:munder>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template match m:d\n\n\t\tProcess a delimiter.\n\t--\x3e\n  <xsl:template match="m:d">\n    <mml:mfenced>\n      \x3c!-- open: default is \'(\' for both OMML and MathML --\x3e\n      <xsl:if test="m:dPr[1]/m:begChr/@m:val and not(m:dPr[1]/m:begChr/@m:val =\'(\')">\n        <xsl:attribute name="open">\n          <xsl:value-of select="m:dPr[1]/m:begChr/@m:val" />\n        </xsl:attribute>\n      </xsl:if>\n\n      \x3c!-- close: default is \')\' for both OMML and MathML --\x3e\n      <xsl:if test="m:dPr[1]/m:endChr/@m:val and not(m:dPr[1]/m:endChr/@m:val =\')\')">\n        <xsl:attribute name="close">\n          <xsl:value-of select="m:dPr[1]/m:endChr/@m:val" />\n        </xsl:attribute>\n      </xsl:if>\n\n      \x3c!-- separator: the default is \',\' for MathML, and \'|\' for OMML --\x3e\n      <xsl:choose>\n        \x3c!-- Matches MathML default. Write nothing --\x3e\n        <xsl:when test="m:dPr[1]/m:sepChr/@m:val = \',\'" />\n\n        \x3c!-- OMML default: | --\x3e\n        <xsl:when test="not(m:dPr[1]/m:sepChr/@m:val)">\n          <xsl:attribute name="separators">\n            <xsl:value-of select="\'|\'" />\n          </xsl:attribute>\n        </xsl:when>\n\n        <xsl:otherwise>\n          <xsl:attribute name="separators">\n            <xsl:value-of select="m:dPr[1]/m:sepChr/@m:val" />\n          </xsl:attribute>\n        </xsl:otherwise>\n      </xsl:choose>\n\n      \x3c!-- now write all the children. Put each one into an mrow\n\t\t\tjust in case it produces multiple runs, etc --\x3e\n      <xsl:for-each select="m:e">\n        <mml:mrow>\n          <xsl:apply-templates select="." />\n        </mml:mrow>\n      </xsl:for-each>\n    </mml:mfenced>\n  </xsl:template>\n\n  <xsl:template match="m:r">\n    <xsl:variable name="fNor">\n      <xsl:choose>\n        <xsl:when test="count(child::m:rPr[last()]/m:nor) = 0">0</xsl:when>\n        <xsl:otherwise>\n          <xsl:call-template name="ForceFalseStrVal">\n            <xsl:with-param name="str" select="translate(child::m:rPr[last()]/m:nor/@m:val, \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                       \'abcdefghijklmnopqrstuvwxyz\')" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:variable>\n\n    <xsl:choose>\n      <xsl:when test="$fNor=1">\n        <mml:mtext>\n          <xsl:variable name="sOutput" select="translate(.//m:t, \' \', \'&#xa0;\')" />\n          <xsl:value-of select="$sOutput" />\n        </mml:mtext>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:for-each select=".//m:t">\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="text()" />\n            <xsl:with-param name="scr" select="../m:rPr[last()]/m:scr/@m:val" />\n            <xsl:with-param name="sty" select="../m:rPr[last()]/m:sty/@m:val" />\n            <xsl:with-param name="nor">0</xsl:with-param>\n          </xsl:call-template>\n        </xsl:for-each>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n\n  <xsl:template name="CreateTokenAttributes">\n    <xsl:param name="scr" />\n    <xsl:param name="sty" />\n    <xsl:param name="nor" />\n    <xsl:param name="nCharToPrint" />\n    <xsl:param name="sTokenType" />\n\n    <xsl:choose>\n      <xsl:when test="$nor=1">\n        <xsl:attribute name="mathvariant">normal</xsl:attribute>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:variable name="mathvariant">\n          <xsl:choose>\n            \x3c!-- numbers don\'t care --\x3e\n            <xsl:when test="$sTokenType=\'mn\'" />\n\n            <xsl:when test="$scr=\'monospace\'">monospace</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\' and $sty=\'i\'">sans-serif-italic</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\' and $sty=\'b\'">bold-sans-serif</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\' and $sty=\'bi\'">sans-serif-bold-italic</xsl:when>\n            <xsl:when test="$scr=\'sans-serif\'">sans-serif</xsl:when>\n            <xsl:when test="$scr=\'fraktur\' and ($sty=\'b\' or $sty=\'bi\')">bold-fraktur</xsl:when>\n            <xsl:when test="$scr=\'fraktur\'">fraktur</xsl:when>\n            <xsl:when test="$scr=\'double-struck\'">double-struck</xsl:when>\n            <xsl:when test="$scr=\'script\' and ($sty=\'b\' or $sty=\'bi\')">bold-script</xsl:when>\n            <xsl:when test="$scr=\'script\'">script</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'b\'">bold</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'i\'">italic</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'p\'">normal</xsl:when>\n            <xsl:when test="($scr=\'roman\' or not($scr) or $scr=\'\') and $sty=\'bi\'">bold-italic</xsl:when>\n            <xsl:otherwise />\n          </xsl:choose>\n        </xsl:variable>\n        <xsl:variable name="fontweight">\n          <xsl:choose>\n            <xsl:when test="$sty=\'b\' or $sty=\'bi\'">bold</xsl:when>\n            <xsl:otherwise>normal</xsl:otherwise>\n          </xsl:choose>\n        </xsl:variable>\n        <xsl:variable name="fontstyle">\n          <xsl:choose>\n            <xsl:when test="$sty=\'p\' or $sty=\'b\'">normal</xsl:when>\n            <xsl:otherwise>italic</xsl:otherwise>\n          </xsl:choose>\n        </xsl:variable>\n\n        \x3c!-- Writing of attributes begins here --\x3e\n        <xsl:choose>\n          \x3c!-- Don\'t write mathvariant for operators unless they want to be normal --\x3e\n          <xsl:when test="$sTokenType=\'mo\' and $mathvariant!=\'normal\'" />\n\n          \x3c!-- A single character within an mi is already italics, don\'t write --\x3e\n          <xsl:when test="$sTokenType=\'mi\' and $nCharToPrint=1 and ($mathvariant=\'\' or $mathvariant=\'italic\')" />\n\n          <xsl:when test="$sTokenType=\'mi\' and $nCharToPrint &gt; 1 and ($mathvariant=\'\' or $mathvariant=\'italic\')">\n            <xsl:attribute name="mathvariant">\n              <xsl:value-of select="\'italic\'" />\n            </xsl:attribute>\n          </xsl:when>\n          <xsl:when test="$mathvariant!=\'italic\' and $mathvariant!=\'\'">\n            <xsl:attribute name="mathvariant">\n              <xsl:value-of select="$mathvariant" />\n            </xsl:attribute>\n          </xsl:when>\n          <xsl:otherwise>\n            <xsl:if test="not($sTokenType=\'mi\' and $nCharToPrint=1) and $fontstyle=\'italic\'">\n              <xsl:attribute name="fontstyle">italic</xsl:attribute>\n            </xsl:if>\n            <xsl:if test="$fontweight=\'bold\'">\n              <xsl:attribute name="fontweight">bold</xsl:attribute>\n            </xsl:if>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  <xsl:template match="m:eqArr">\n    <mml:mtable>\n      <xsl:for-each select="m:e">\n        <mml:mtr>\n          <mml:mtd>\n            <xsl:choose>\n              <xsl:when test="m:argPr[last()]/m:scrLvl/@m:val!=\'0\' or\n\t\t\t\t\t            not(m:argPr[last()]/m:scrLvl/@m:val)  or\n\t\t\t\t\t            m:argPr[last()]/m:scrLvl/@m:val=\'\'">\n                <mml:mrow>\n                  <mml:maligngroup />\n                  <xsl:call-template name="CreateEqArrRow">\n                    <xsl:with-param name="align" select="1" />\n                    <xsl:with-param name="ndCur" select="*[1]" />\n                  </xsl:call-template>\n                </mml:mrow>\n              </xsl:when>\n              <xsl:otherwise>\n                <mml:mstyle>\n                  <xsl:attribute name="scriptlevel">\n                    <xsl:value-of select="m:argPr[last()]/m:scrLvl/@m:val" />\n                  </xsl:attribute>\n                  <mml:maligngroup />\n                  <xsl:call-template name="CreateEqArrRow">\n                    <xsl:with-param name="align" select="1" />\n                    <xsl:with-param name="ndCur" select="*[1]" />\n                  </xsl:call-template>\n                </mml:mstyle>\n              </xsl:otherwise>\n            </xsl:choose>\n          </mml:mtd>\n        </mml:mtr>\n      </xsl:for-each>\n    </mml:mtable>\n  </xsl:template>\n\n  <xsl:template name="CreateEqArrRow">\n    <xsl:param name="align" />\n    <xsl:param name="ndCur" />\n    <xsl:variable name="sAllMt">\n      <xsl:for-each select="$ndCur/m:t">\n        <xsl:value-of select="." />\n      </xsl:for-each>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$ndCur/self::m:r">\n        <xsl:call-template name="ParseEqArrMr">\n          <xsl:with-param name="sToParse" select="$sAllMt" />\n          <xsl:with-param name="scr" select="../m:rPr[last()]/m:scr/@m:val" />\n          <xsl:with-param name="sty" select="../m:rPr[last()]/m:sty/@m:val" />\n          <xsl:with-param name="nor">\n            <xsl:choose>\n              <xsl:when test="count($ndCur/m:rPr[last()]/m:nor) = 0">0</xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="ForceFalseStrVal">\n                  <xsl:with-param name="str" select="translate($ndCur/m:rPr[last()]/m:nor/@m:val,\n                                                                     \'ABCDEFGHIJKLMNOPQRSTUVWXYZ\',\n\t\t                                                                 \'abcdefghijklmnopqrstuvwxyz\')" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:with-param>\n          <xsl:with-param name="align" select="$align" />\n        </xsl:call-template>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:apply-templates select="$ndCur" />\n      </xsl:otherwise>\n    </xsl:choose>\n    <xsl:if test="count($ndCur/following-sibling::*) &gt; 0">\n      <xsl:variable name="cAmp">\n        <xsl:call-template name="CountAmp">\n          <xsl:with-param name="sAllMt" select="$sAllMt" />\n          <xsl:with-param name="cAmp" select="0" />\n        </xsl:call-template>\n      </xsl:variable>\n      <xsl:call-template name="CreateEqArrRow">\n        <xsl:with-param name="align" select="($align+($cAmp mod 2)) mod 2" />\n        <xsl:with-param name="ndCur" select="$ndCur/following-sibling::*[1]" />\n      </xsl:call-template>\n    </xsl:if>\n  </xsl:template>\n\n  <xsl:template name="CountAmp">\n    <xsl:param name="sAllMt" />\n    <xsl:param name="cAmp" />\n    <xsl:choose>\n      <xsl:when test="string-length(substring-after($sAllMt, \'&amp;\')) &gt; 0 or\n\t\t\t                substring($sAllMt, string-length($sAllMt))=\'&#x0026;\'">\n        <xsl:call-template name="CountAmp">\n          <xsl:with-param name="sAllMt" select="substring-after($sAllMt, \'&#x0026;\')" />\n          <xsl:with-param name="cAmp" select="$cAmp+1" />\n        </xsl:call-template>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:value-of select="$cAmp" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template: ParseEqArrMr\n\n\t\t\tSimilar to ParseMt, but this one has to do more for an equation array.\n      In equation arrays &amp; is a special character which denotes alignment.\n\n      The &amp; in an equation works by alternating between meaning insert alignment spacing\n      and insert alignment mark.  For each equation in the equation array\n      there is an implied align space at the beginning of the equation.  Within each equation,\n      the first &amp; means alignmark, the second, align space, the third, alignmark, etc.\n\n      For this reason when parsing m:r\'s in equation arrays it is important to keep track of what\n      the next ampersand will mean.\n\n      $align=0 => Omml\'s align space, which is similar to MathML\'s maligngroup.\n      $align=1 => Omml\'s alignment mark, which is similar to MathML\'s malignmark.\n\t--\x3e\n  <xsl:template name="ParseEqArrMr">\n    <xsl:param name="sToParse" />\n    <xsl:param name="sty" />\n    <xsl:param name="scr" />\n    <xsl:param name="nor" />\n    <xsl:param name="align" />\n\n    <xsl:if test="string-length($sToParse) &gt; 0">\n      <xsl:choose>\n        <xsl:when test="substring($sToParse,1,1) = \'&amp;\'">\n          <xsl:choose>\n            <xsl:when test="$align=\'0\'">\n              <mml:maligngroup />\n            </xsl:when>\n            <xsl:when test="$align=\'1\'">\n              <mml:malignmark />\n            </xsl:when>\n          </xsl:choose>\n          <xsl:call-template name="ParseEqArrMr">\n            <xsl:with-param name="sToParse" select="substring($sToParse,2)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n            <xsl:with-param name="align">\n              <xsl:choose>\n                <xsl:when test="$align=\'1\'">0</xsl:when>\n                <xsl:otherwise>1</xsl:otherwise>\n              </xsl:choose>\n            </xsl:with-param>\n          </xsl:call-template>\n        </xsl:when>\n        <xsl:otherwise>\n          <xsl:variable name="sRepNumWith0">\n            <xsl:call-template name="SReplaceNumWithZero">\n              <xsl:with-param name="sToParse" select="$sToParse" />\n            </xsl:call-template>\n          </xsl:variable>\n          <xsl:variable name="sRepOperWith-">\n            <xsl:call-template name="SReplaceOperWithMinus">\n              <xsl:with-param name="sToParse" select="$sRepNumWith0" />\n            </xsl:call-template>\n          </xsl:variable>\n\n          <xsl:variable name="iFirstOper" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'-\'))" />\n          <xsl:variable name="iFirstNum" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'0\'))" />\n          <xsl:variable name="iFirstAmp" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'&#x0026;\'))" />\n          <xsl:variable name="fNumAtPos1">\n            <xsl:choose>\n              <xsl:when test="substring($sRepOperWith-,1,1)=\'0\'">1</xsl:when>\n              <xsl:otherwise>0</xsl:otherwise>\n            </xsl:choose>\n          </xsl:variable>\n          <xsl:variable name="fOperAtPos1">\n            <xsl:choose>\n              <xsl:when test="substring($sRepOperWith-,1,1)=\'-\'">1</xsl:when>\n              <xsl:otherwise>0</xsl:otherwise>\n            </xsl:choose>\n          </xsl:variable>\n          <xsl:choose>\n\n            \x3c!-- Case I: The string begins with neither a number, nor an operator --\x3e\n            <xsl:when test="$fNumAtPos1=\'0\' and $fOperAtPos1=\'0\'">\n              <xsl:choose>\n                <xsl:when test="$nor = 0">\n                  <mml:mi>\n                    <xsl:call-template name="CreateTokenAttributes">\n                      <xsl:with-param name="scr" select="$scr" />\n                      <xsl:with-param name="sty" select="$sty" />\n                      <xsl:with-param name="nor" select="$nor" />\n                      <xsl:with-param name="nCharToPrint" select="1" />\n                      <xsl:with-param name="sTokenType" select="\'mi\'" />\n                    </xsl:call-template>\n                    <xsl:variable name="sOutput" select="translate(substring($sToParse, 1, 1), \' \', \'&#xa0;\')" />\n                    <xsl:value-of select="$sOutput" />\n                  </mml:mi>\n                </xsl:when>\n                <xsl:otherwise>\n                  <mml:mtext>\n                    <xsl:variable name="sOutput" select="translate(substring($sToParse, 1, 1), \' \', \'&#xa0;\')" />\n                    <xsl:value-of select="$sOutput" />\n                  </mml:mtext>\n                </xsl:otherwise>\n              </xsl:choose>\n              <xsl:call-template name="ParseEqArrMr">\n                <xsl:with-param name="sToParse" select="substring($sToParse, 2)" />\n                <xsl:with-param name="scr" select="$scr" />\n                <xsl:with-param name="sty" select="$sty" />\n                <xsl:with-param name="nor" select="$nor" />\n                <xsl:with-param name="align" select="$align" />\n              </xsl:call-template>\n            </xsl:when>\n\n            \x3c!-- Case II: There is an operator at position 1 --\x3e\n            <xsl:when test="$fOperAtPos1=\'1\'">\n              <xsl:choose>\n                <xsl:when test="$nor = 0">\n                  <mml:mo>\n                    <xsl:call-template name="CreateTokenAttributes">\n                      <xsl:with-param name="scr" />\n                      <xsl:with-param name="sty" />\n                      <xsl:with-param name="nor" select="$nor" />\n                      <xsl:with-param name="sTokenType" select="\'mo\'" />\n                    </xsl:call-template>\n                    <xsl:value-of select="substring($sToParse,1,1)" />\n                  </mml:mo>\n                </xsl:when>\n                <xsl:otherwise>\n                  <mml:mtext>\n                    <xsl:value-of select="substring($sToParse,1,1)" />\n                  </mml:mtext>\n                </xsl:otherwise>\n              </xsl:choose>\n              <xsl:call-template name="ParseEqArrMr">\n                <xsl:with-param name="sToParse" select="substring($sToParse, 2)" />\n                <xsl:with-param name="scr" select="$scr" />\n                <xsl:with-param name="sty" select="$sty" />\n                <xsl:with-param name="nor" select="$nor" />\n                <xsl:with-param name="align" select="$align" />\n              </xsl:call-template>\n            </xsl:when>\n\n            \x3c!-- Case III: There is a number at position 1 --\x3e\n            <xsl:otherwise>\n              <xsl:variable name="sConsecNum">\n                <xsl:call-template name="SNumStart">\n                  <xsl:with-param name="sToParse" select="$sToParse" />\n                  <xsl:with-param name="sPattern" select="$sRepNumWith0" />\n                </xsl:call-template>\n              </xsl:variable>\n              <xsl:choose>\n                <xsl:when test="$nor = 0">\n                  <mml:mn>\n                    <xsl:call-template name="CreateTokenAttributes">\n                      <xsl:with-param name="scr" />\n                      <xsl:with-param name="sty" select="\'p\'"/>\n                      <xsl:with-param name="nor" select="$nor" />\n                      <xsl:with-param name="sTokenType" select="\'mn\'" />\n                    </xsl:call-template>\n                    <xsl:value-of select="$sConsecNum" />\n                  </mml:mn>\n                </xsl:when>\n                <xsl:otherwise>\n                  <mml:mtext>\n                    <xsl:value-of select="$sConsecNum" />\n                  </mml:mtext>\n                </xsl:otherwise>\n              </xsl:choose>\n              <xsl:call-template name="ParseEqArrMr">\n                <xsl:with-param name="sToParse" select="substring-after($sToParse, $sConsecNum)" />\n                <xsl:with-param name="scr" select="$scr" />\n                <xsl:with-param name="sty" select="$sty" />\n                <xsl:with-param name="nor" select="$nor" />\n                <xsl:with-param name="align" select="$align" />\n              </xsl:call-template>\n            </xsl:otherwise>\n          </xsl:choose>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:if>\n  </xsl:template>\n\n  \x3c!-- %%Template: ParseMt\n\n\t\t\tProduce a run of text. Technically, OMML makes no distinction\n\t\t\tbetween numbers, operators, and other characters in a run. For\n\t\t\tMathML we need to break these into mi, mn, or mo elements.\n\n\t\t\tSee also ParseEqArrMr\n\t--\x3e\n  <xsl:template name="ParseMt">\n    <xsl:param name="sToParse" />\n    <xsl:param name="sty" />\n    <xsl:param name="scr" />\n    <xsl:param name="nor" />\n    <xsl:if test="string-length($sToParse) &gt; 0">\n      <xsl:variable name="sRepNumWith0">\n        <xsl:call-template name="SReplaceNumWithZero">\n          <xsl:with-param name="sToParse" select="$sToParse" />\n        </xsl:call-template>\n      </xsl:variable>\n      <xsl:variable name="sRepOperWith-">\n        <xsl:call-template name="SReplaceOperWithMinus">\n          <xsl:with-param name="sToParse" select="$sRepNumWith0" />\n        </xsl:call-template>\n      </xsl:variable>\n\n      <xsl:variable name="iFirstOper" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'-\'))" />\n      <xsl:variable name="iFirstNum" select="string-length($sRepOperWith-) - string-length(substring-after($sRepOperWith-, \'0\'))" />\n      <xsl:variable name="fNumAtPos1">\n        <xsl:choose>\n          <xsl:when test="substring($sRepOperWith-,1,1)=\'0\'">1</xsl:when>\n          <xsl:otherwise>0</xsl:otherwise>\n        </xsl:choose>\n      </xsl:variable>\n      <xsl:variable name="fOperAtPos1">\n        <xsl:choose>\n          <xsl:when test="substring($sRepOperWith-,1,1)=\'-\'">1</xsl:when>\n          <xsl:otherwise>0</xsl:otherwise>\n        </xsl:choose>\n      </xsl:variable>\n\n      <xsl:choose>\n\n        \x3c!-- Case I: The string begins with neither a number, nor an operator --\x3e\n        <xsl:when test="$fOperAtPos1=\'0\' and $fNumAtPos1=\'0\'">\n          <xsl:variable name="nCharToPrint">\n            <xsl:choose>\n              <xsl:when test="ancestor::m:fName">\n                <xsl:choose>\n                  <xsl:when test="($iFirstOper=$iFirstNum) and\n\t\t\t\t\t\t\t\t\t\t\t($iFirstOper=string-length($sToParse)) and\n\t\t\t\t\t\t\t                (substring($sRepOperWith-, string-length($sRepOperWith-))!=\'0\') and\n\t\t\t\t\t\t\t                (substring($sRepOperWith-, string-length($sRepOperWith-))!=\'-\')">\n                    <xsl:value-of select="string-length($sToParse)" />\n                  </xsl:when>\n                  <xsl:when test="$iFirstOper &lt; $iFirstNum">\n                    <xsl:value-of select="$iFirstOper - 1" />\n                  </xsl:when>\n                  <xsl:otherwise>\n                    <xsl:value-of select="$iFirstNum - 1" />\n                  </xsl:otherwise>\n                </xsl:choose>\n              </xsl:when>\n              <xsl:otherwise>1</xsl:otherwise>\n            </xsl:choose>\n          </xsl:variable>\n\n          <mml:mi>\n            <xsl:call-template name="CreateTokenAttributes">\n              <xsl:with-param name="scr" select="$scr" />\n              <xsl:with-param name="sty" select="$sty" />\n              <xsl:with-param name="nor" select="$nor" />\n              <xsl:with-param name="nCharToPrint" select="$nCharToPrint" />\n              <xsl:with-param name="sTokenType" select="\'mi\'" />\n            </xsl:call-template>\n            <xsl:variable name="sWrite" select="translate(substring($sToParse, 1, $nCharToPrint), \' \', \'&#xa0;\')" />\n            <xsl:value-of select="$sWrite" />\n          </mml:mi>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="substring($sToParse, $nCharToPrint+1)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n          </xsl:call-template>\n        </xsl:when>\n\n        \x3c!-- Case II: There is an operator at position 1 --\x3e\n        <xsl:when test="$fOperAtPos1=\'1\'">\n          <mml:mo>\n            <xsl:call-template name="CreateTokenAttributes">\n              <xsl:with-param name="scr" />\n              <xsl:with-param name="sty" />\n              <xsl:with-param name="nor" select="$nor" />\n              <xsl:with-param name="sTokenType" select="\'mo\'" />\n            </xsl:call-template>\n            <xsl:value-of select="substring($sToParse,1,1)" />\n          </mml:mo>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="substring($sToParse, 2)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n          </xsl:call-template>\n        </xsl:when>\n\n        \x3c!-- Case III: There is a number at position 1 --\x3e\n        <xsl:otherwise>\n          <xsl:variable name="sConsecNum">\n            <xsl:call-template name="SNumStart">\n              <xsl:with-param name="sToParse" select="$sToParse" />\n              <xsl:with-param name="sPattern" select="$sRepNumWith0" />\n            </xsl:call-template>\n          </xsl:variable>\n          <mml:mn>\n            <xsl:call-template name="CreateTokenAttributes">\n              <xsl:with-param name="scr" select="$scr" />\n              <xsl:with-param name="sty" select="\'p\'" />\n              <xsl:with-param name="nor" select="$nor" />\n              <xsl:with-param name="sTokenType" select="\'mn\'" />\n            </xsl:call-template>\n            <xsl:value-of select="$sConsecNum" />\n          </mml:mn>\n          <xsl:call-template name="ParseMt">\n            <xsl:with-param name="sToParse" select="substring-after($sToParse, $sConsecNum)" />\n            <xsl:with-param name="scr" select="$scr" />\n            <xsl:with-param name="sty" select="$sty" />\n            <xsl:with-param name="nor" select="$nor" />\n          </xsl:call-template>\n        </xsl:otherwise>\n      </xsl:choose>\n    </xsl:if>\n  </xsl:template>\n\n  \x3c!-- %%Template: SNumStart\n\n\t\tReturn the longest substring of sToParse starting from the\n\t\tstart of sToParse that is a number. In addition, it takes the\n\t\tpattern string, which is sToParse with all of its numbers\n\t\treplaced with a 0. sPattern should be the same length\n\t\tas sToParse\n\t--\x3e\n  <xsl:template name="SNumStart">\n    <xsl:param name="sToParse" select="\'\'" />\n    \x3c!-- if we don\'t get anything, take the string itself --\x3e\n    <xsl:param name="sPattern" select="\'$sToParse\'" />\n\n\n    <xsl:choose>\n      \x3c!-- the pattern says this is a number, recurse with the rest --\x3e\n      <xsl:when test="substring($sPattern, 1, 1) = \'0\'">\n        <xsl:call-template name="SNumStart">\n          <xsl:with-param name="sToParse" select="$sToParse" />\n          <xsl:with-param name="sPattern" select="substring($sPattern, 2)" />\n        </xsl:call-template>\n      </xsl:when>\n\n      \x3c!-- the pattern says we\'ve run out of numbers. Take as many\n\t\t\t\tcharacters from sToParse as we shaved off sPattern --\x3e\n      <xsl:otherwise>\n        <xsl:value-of select="substring($sToParse, 1, string-length($sToParse) - string-length($sPattern))" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- %%Template SRepeatCharAcc\n\n\t\t\tThe core of SRepeatChar with an accumulator. The current\n\t\t\tstring is in param $acc, and we will double and recurse,\n\t\t\tif we\'re less than half of the required length or else just\n\t\t\tadd the right amount of characters to the accumulator and\n\t\t\treturn\n\t--\x3e\n  <xsl:template name="SRepeatCharAcc">\n    <xsl:param name="cchRequired" select="1" />\n    <xsl:param name="ch" select="\'-\'" />\n    <xsl:param name="acc" select="$ch" />\n\n    <xsl:variable name="cchAcc" select="string-length($acc)" />\n    <xsl:choose>\n      <xsl:when test="(2 * $cchAcc) &lt; $cchRequired">\n        <xsl:call-template name="SRepeatCharAcc">\n          <xsl:with-param name="cchRequired" select="$cchRequired" />\n          <xsl:with-param name="ch" select="$ch" />\n          <xsl:with-param name="acc" select="concat($acc, $acc)" />\n        </xsl:call-template>\n      </xsl:when>\n\n      <xsl:otherwise>\n        <xsl:value-of select="concat($acc, substring($acc, 1, $cchRequired - $cchAcc))" />\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n\n  \x3c!-- %%Template SRepeatChar\n\n\t\t\tGenerates a string nchRequired long by repeating the given character ch\n\t--\x3e\n  <xsl:template name="SRepeatChar">\n    <xsl:param name="cchRequired" select="1" />\n    <xsl:param name="ch" select="\'-\'" />\n\n    <xsl:call-template name="SRepeatCharAcc">\n      <xsl:with-param name="cchRequired" select="$cchRequired" />\n      <xsl:with-param name="ch" select="$ch" />\n      <xsl:with-param name="acc" select="$ch" />\n    </xsl:call-template>\n  </xsl:template>\n\n  \x3c!-- %%Template SReplaceOperWithMinus\n\n\t\tGo through the given string and replace every instance\n\t\tof an operator with a minus \'-\'. This helps quickly identify\n\t\tthe first instance of an operator.\n\t--\x3e\n  <xsl:template name="SReplaceOperWithMinus">\n    <xsl:param name="sToParse" select="\'\'" />\n\n    <xsl:value-of select="translate($sToParse, $sOperators, $sMinuses)" />\n  </xsl:template>\n\n  \x3c!-- %%Template SReplaceNumWithZero\n\n\t\tGo through the given string and replace every instance\n\t\tof an number with a zero \'0\'. This helps quickly identify\n\t\tthe first occurence of a number.\n\n\t\tConsiders the \'.\' and \',\' part of a number iff they are sandwiched\n\t\tbetween two other numbers. 0.3 will be recognized as a number,\n\t\tx.3 will not be. Since these characters can also be an operator, this\n\t\tshould be called before SReplaceOperWithMinus.\n\t--\x3e\n  <xsl:template name="SReplaceNumWithZero">\n    <xsl:param name="sToParse" select="\'\'" />\n\n    \x3c!-- First do a simple replace. Numbers will all be come 0\'s.\n\t\t\tAfter this point, the pattern involving the . or , that\n\t\t\twe are looking for will become 0.0 or 0,0 --\x3e\n    <xsl:variable name="sSimpleReplace" select="translate($sToParse, $sNumbers, $sZeros)" />\n\n    \x3c!-- And then, replace 0.0 with just 000. This means that the . will\n\t\t\tbecome part of the number --\x3e\n    <xsl:variable name="sReplacePeriod">\n      <xsl:call-template name="SReplace">\n        <xsl:with-param name="sInput" select="$sSimpleReplace" />\n        <xsl:with-param name="sOrig" select="\'0.0\'" />\n        <xsl:with-param name="sReplacement" select="\'000\'" />\n      </xsl:call-template>\n    </xsl:variable>\n\n    \x3c!-- And then, replace 0,0 with just 000. This means that the , will\n\t\t\tbecome part of the number --\x3e\n    <xsl:call-template name="SReplace">\n      <xsl:with-param name="sInput" select="$sReplacePeriod" />\n      <xsl:with-param name="sOrig" select="\'0,0\'" />\n      <xsl:with-param name="sReplacement" select="\'000\'" />\n    </xsl:call-template>\n  </xsl:template>\n\n  \x3c!-- Template to translate Word\'s borderBox properties into the menclose notation attribute\n       The initial call to this SHOULD NOT pass an sAttribute.  Subsequent calls to\n       CreateMencloseNotationAttrFromBorderBoxAttr by CreateMencloseNotationAttrFromBorderBoxAttr will\n       update the sAttribute as appropriate.\n\n       CreateMencloseNotationAttrFromBorderBoxAttr looks at each attribute (fHideTop, fHideBot, etc.) one at a time\n       in the order they are listed and passes a modified sAttribute to CreateMencloseNotationAttrFromBorderBoxAttr.\n       Each successive call to CreateMencloseNotationAttrFromBorderBoxAttr knows which attribute to look at because\n       the previous call should have omitted passing the attribute it just analyzed.  This is why as you read lower\n       and lower in the template that each call to CreateMencloseNotationAttrFromBorderBoxAttr has fewer and fewer attributes.\n       --\x3e\n  <xsl:template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n    <xsl:param name="fHideTop" />\n    <xsl:param name="fHideBot" />\n    <xsl:param name="fHideLeft" />\n    <xsl:param name="fHideRight" />\n    <xsl:param name="fStrikeH" />\n    <xsl:param name="fStrikeV" />\n    <xsl:param name="fStrikeBLTR" />\n    <xsl:param name="fStrikeTLBR" />\n    <xsl:param name="sAttribute" />\n\n    <xsl:choose>\n      <xsl:when test="string-length($sAttribute) = 0">\n        <xsl:choose>\n          <xsl:when test="string-length($fHideTop) &gt; 0\n                      and string-length($fHideBot) &gt; 0\n                      and string-length($fHideLeft) &gt; 0\n                      and string-length($fHideRight) &gt; 0">\n\n            <xsl:choose>\n              <xsl:when test="$fHideTop = 0\n                              and $fHideBot = 0\n                              and $fHideLeft = 0\n                              and $fHideRight = 0">\n                \x3c!-- We can use \'box\' instead of top, bot, left, and right.  Therefore,\n                  replace sAttribute with \'box\' and begin analyzing params fStrikeH\n                  and below. --\x3e\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:text>box</xsl:text>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                \x3c!-- Can\'t use \'box\', theremore, must analyze all attributes --\x3e\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideTop" select="$fHideTop" />\n                  <xsl:with-param name="fHideBot" select="$fHideBot" />\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    \x3c!-- Assume using all four (left right top bottom).  Subsequent calls\n                         will remove the sides which aren\'t to be includes. --\x3e\n                    <xsl:text>left right top bottom</xsl:text>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n        </xsl:choose>\n      </xsl:when>\n      <xsl:otherwise>\n        <xsl:choose>\n          <xsl:when test="string-length($fHideTop) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideTop=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideBot" select="$fHideBot" />\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'top\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideBot" select="$fHideBot" />\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fHideBot) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideBot=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'bottom\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideLeft" select="$fHideLeft" />\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fHideLeft) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideLeft=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'left\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fHideRight" select="$fHideRight" />\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fHideRight) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fHideRight=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute">\n                    <xsl:call-template name="SReplace">\n                      <xsl:with-param name="sInput" select="$sAttribute" />\n                      <xsl:with-param name="sOrig" select="\'right\'" />\n                      <xsl:with-param name="sReplacement" select="\'\'" />\n                    </xsl:call-template>\n                  </xsl:with-param>\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeH" select="$fStrikeH" />\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeH) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeH=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' horizontalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeV" select="$fStrikeV" />\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeV) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeV=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' verticalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeBLTR" select="$fStrikeBLTR" />\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeBLTR) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeBLTR=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' updiagonalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="fStrikeTLBR" select="$fStrikeTLBR" />\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:when test="string-length($fStrikeTLBR) &gt; 0">\n            <xsl:choose>\n              <xsl:when test="$fStrikeTLBR=1">\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="sAttribute" select="concat($sAttribute, \' downdiagonalstrike\')" />\n                </xsl:call-template>\n              </xsl:when>\n              <xsl:otherwise>\n                <xsl:call-template name="CreateMencloseNotationAttrFromBorderBoxAttr">\n                  <xsl:with-param name="sAttribute" select="$sAttribute" />\n                </xsl:call-template>\n              </xsl:otherwise>\n            </xsl:choose>\n          </xsl:when>\n          <xsl:otherwise>\n            <xsl:attribute name="notation">\n              <xsl:value-of select="normalize-space($sAttribute)" />\n            </xsl:attribute>\n          </xsl:otherwise>\n        </xsl:choose>\n      </xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Tristate (true, false, neither) from string value --\x3e\n  <xsl:template name="TFromStrVal">\n    <xsl:param name="str" />\n    <xsl:choose>\n      <xsl:when test="$str = \'on\' or $str = \'1\' or $str = \'true\'">1</xsl:when>\n      <xsl:when test="$str = \'off\' or $str = \'0\' or $str = \'false\'">0</xsl:when>\n      <xsl:otherwise>-1</xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Return 0 iff $str is explicitly set to a false value.\n       Return true otherwise --\x3e\n  <xsl:template name="ForceFalseStrVal">\n    <xsl:param name="str" />\n    <xsl:variable name="tValue">\n      <xsl:call-template name="TFromStrVal">\n        <xsl:with-param name="str" select="$str"/>\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$tValue = \'0\'">0</xsl:when>\n      <xsl:otherwise>1</xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n\n  \x3c!-- Return 1 iff $str is explicitly set to a true value.\n       Return false otherwise --\x3e\n  <xsl:template name="ForceTrueStrVal">\n    <xsl:param name="str" />\n    <xsl:variable name="tValue">\n      <xsl:call-template name="TFromStrVal">\n        <xsl:with-param name="str" select="$str"/>\n      </xsl:call-template>\n    </xsl:variable>\n    <xsl:choose>\n      <xsl:when test="$tValue = \'1\'">1</xsl:when>\n      <xsl:otherwise>0</xsl:otherwise>\n    </xsl:choose>\n  </xsl:template>\n</xsl:stylesheet>\n'.trim());t.xsl=l}));
;/*!node_modules/office-viewer/lib/openxml/math/convertOOML.js*/
amis.define("4ce1194",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var o=e("120120e");r.convertOOXML=function(e){var r=new XSLTProcessor;return r.importStylesheet(o.xsl),r.transformToFragment(e,document)}}));
;/*!node_modules/office-viewer/lib/render/renderMath.js*/
amis.define("246e991",(function(e,n,t,r){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var c=e("4ce1194");n.renderOMath=function(e,n){return c.convertOOXML(n.element)}}));
;/*!node_modules/office-viewer/lib/render/renderParagraph.js*/
amis.define("61e0815",(function(e,r,n,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("c1138ba"),d=e("0c75dbf"),i=e("2360183"),l=e("cb10616"),o=e("2fde99a"),p=e("11d5fc3"),s=e("5879be6"),f=e("a644e47"),c=e("d749888"),u=e("4ddb57e"),h=e("6251082"),v=e("08d164f"),b=e("246e991");r.default=function(e,r,n,a){var y,m;void 0===n&&(n=!0),void 0===a&&(a=!1),e.currentParagraph=r;var C=d.createElement("p");e.addClass(C,"p");var k=r.properties;u.setElementStyle(e,C,k),C.style.position="relative",k.numPr&&d.appendChild(C,c.renderNumbering(C,e,k.numPr));var g=!1;k.tabs&&k.tabs.length&&d.appendChild(C,h.renderTab(e,k.tabs[0],!0));try{for(var M=t.__values(r.children),H=M.next();!H.done;H=M.next()){var P=H.value;if(P instanceof i.Run)"begin"===P.fldChar?g=!0:P&&(g=!1),d.appendChild(C,p.default(e,P,r,g,a));else if(P instanceof l.BookmarkStart)d.appendChild(C,f.renderBookmarkStart(e,P));else if(P instanceof o.Hyperlink){var _=s.renderHyperLink(e,P,r);d.appendChild(C,_)}else P instanceof v.OMath?d.appendChild(C,b.renderOMath(e,P)):console.warn("unknow pargraph type",P)}}catch(e){y={error:e}}finally{try{H&&!H.done&&(m=M.return)&&m.call(M)}finally{if(y)throw y.error}}return""===C.innerHTML&&n&&(C.innerHTML="&nbsp;"),C}}));
;/*!node_modules/office-viewer/lib/render/renderHeader.js*/
amis.define("814df2e",(function(e,r,a,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var l=e("c1138ba"),t=e("a607958"),d=e("61e0815"),i=e("0c75dbf"),f=e("30065f0"),c=e("2858914");r.renderHeader=function(e,r){var a,n,o=i.createElement("div");try{for(var u=l.__values(r.children),s=u.next();!s.done;s=u.next()){var v=s.value;if(v instanceof t.Paragraph){var h=d.default(e,v,!0,!0);i.appendChild(o,h)}else if(v instanceof c.Table){var p=f.default(e,v);i.appendChild(o,p)}else console.warn("unknown child",v)}}catch(e){a={error:e}}finally{try{s&&!s.done&&(n=u.return)&&n.call(u)}finally{if(a)throw a.error}}return o}}));
;/*!node_modules/office-viewer/lib/render/renderSection.js*/
amis.define("5cb986a",(function(e,t,a,r){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("0c75dbf"),n=e("814df2e");t.renderSection=function(e,t,a,r){var d=o.createElement("section");d.style.position="relative",t.backgroundColor&&(d.style.background=t.backgroundColor),r.page&&(r.pageMarginBottom&&(d.style.marginBottom=r.pageMarginBottom+"px"),r.pageShadow&&(d.style.boxShadow="0 0 8px rgba(0, 0, 0, 0.5)"),r.pageBackground&&(d.style.background=r.pageBackground));var i=a.properties,l=i.pageSize;l&&(r.ignoreWidth||(d.style.width=l.width),r.ignoreHeight||(d.style.height=l.height)),r.padding?d.style.padding=r.padding:(c=i.pageMargin)&&(d.style.paddingLeft=c.left||"0",d.style.paddingRight=c.right||"0",d.style.paddingTop=c.top||"0",d.style.paddingBottom=c.bottom||"0"),i.cols&&i.cols.num&&i.cols.num>1&&(d.style.columnCount=""+i.cols.num,i.cols.space&&(d.style.columnGap=i.cols.space)),e.currentPage++;var g="auto";if(i.pageSize&&i.pageSize.width&&(g=i.pageSize.width),i.headers&&r.page&&r.renderHeader){var s=i.headers,p=null;if(s.even&&e.currentPage%2==0?p=n.renderHeader(e,s.even):s.default?p=n.renderHeader(e,s.default):console.warn("can not find header",e.currentPage,i.headers),p)p.style.position="absolute",(c=i.pageMargin)&&c.header&&(p.style.top=c.header,p.style.width=g),d.appendChild(p)}if(i.footers&&r.page&&r.renderFooter){var c,u=i.footers,f=null;if(u.even&&e.currentPage%2==0?f=n.renderHeader(e,u.even):u.default?f=n.renderHeader(e,u.default):console.warn("can not find footer",e.currentPage,i.footers),f)f.style.position="absolute",(c=i.pageMargin)&&c.footer&&(f.style.bottom=c.footer,f.style.width=g),d.appendChild(f)}return d}}));
;/*!node_modules/office-viewer/lib/render/renderBody.js*/
amis.define("0f4fefd",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("c1138ba"),i=e("0c75dbf"),o=e("a607958"),l=e("2858914"),c=e("61e0815"),d=e("5cb986a"),f=e("30065f0");function s(e,r,t,n,a,o,l,c){var f=0===a.children.length;if(i.appendChild(a,c),!f&&function(e,r,t){if(e.breakPage)return e.breakPage=!1,!0;var n=t.getBoundingClientRect();return n.top+n.height>r.bottom||n.left>r.right}(e,o,c)){var s=c.cloneNode(!0);i.removeChild(a,c);var u=d.renderSection(e,r,l,t);return i.appendChild(n,u),i.appendChild(u,s),{sectionEl:u,sectionEnd:o=p(l,u)}}return{sectionEl:a,sectionEnd:o}}function p(e,r){var t=r.getBoundingClientRect(),n=e.properties.pageMargin,a=t.top+t.height;(null==n?void 0:n.bottom)&&(a-=parseInt(n.bottom.replace("px",""),10));var i=t.left+t.width;return(null==n?void 0:n.right)&&(i-=parseInt(n.right.replace("px",""),10)),{bottom:a,right:i}}function u(e,r,t){var n=r.properties,a=n.pageSize;if(t.zoomFitWidth&&!t.ignoreWidth){var i=null==a?void 0:a.width;if(e&&i){var o=parseInt(i.replace("px",""),10);if(n.pageMargin){var l=n.pageMargin;o+=l.left?parseInt(l.left.replace("px",""),10):0,o+=l.right?parseInt(l.right.replace("px",""),10):0}return e/o}}return 1}function h(e,r,t,n,i,d,u){setTimeout((function(){var h,v,g=p(d,i);try{for(var y=a.__values(d.children),m=y.next();!m.done;m=y.next()){var b=m.value;if(b instanceof o.Paragraph){var _=c.default(e,b),x=s(e,r,n,t,i,g,d,_);i=x.sectionEl,g=x.sectionEnd}else if(b instanceof l.Table){var w=f.default(e,b);x=s(e,r,n,t,i,g,d,w);i=x.sectionEl,g=x.sectionEnd}else console.warn("unknown child",b)}}catch(e){h={error:e}}finally{try{m&&!m.done&&(v=y.return)&&v.call(y)}finally{if(h)throw h.error}}u&&(i.style.marginBottom="0")}),0)}r.default=function(e,r,t,n,s,p){var v,g,y,m,b=p.page||!1,_=e.getBoundingClientRect().width-2*(p.pageWrapPadding||0),x=[],w=0,C=s.sections,E=C.length,M=!1;try{for(var P=a.__values(C),z=P.next();!z.done;z=P.next()){var I=z.value;x.push(u(_,I,p)),r.currentSection=I;var W=d.renderSection(r,n,I,p);if(i.appendChild(t,W),(w+=1)===E&&(M=!0),b)h(r,n,t,p,W,I,M);else try{for(var k=(y=void 0,a.__values(I.children)),B=k.next();!B.done;B=k.next()){var S=B.value;if(S instanceof o.Paragraph){var T=c.default(r,S);i.appendChild(W,T)}else if(S instanceof l.Table){var O=f.default(r,S);i.appendChild(W,O)}else console.warn("unknown child",S)}}catch(e){y={error:e}}finally{try{B&&!B.done&&(m=k.return)&&m.call(k)}finally{if(y)throw y.error}}}}catch(e){v={error:e}}finally{try{z&&!z.done&&(g=P.return)&&g.call(P)}finally{if(v)throw v.error}}setTimeout((function(){if(p.zoom)t.style.transformOrigin="0 0",t.style.transform="scale(".concat(p.zoom,")");else if(p.page&&p.zoomFitWidth&&!p.ignoreWidth){var e=Math.min.apply(Math,a.__spreadArray([],a.__read(x),!1));t.style.transformOrigin="0 0",t.style.transform="scale(".concat(e,")")}}),0)}}));
;/*!node_modules/office-viewer/lib/render/renderDocument.js*/
amis.define("bcb6d07",(function(e,t,f,d){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=e("0c75dbf"),a=e("0f4fefd");t.default=function(e,t,f,d){var c=r.createElement("article");return a.default(e,t,c,f,f.body,d),c}}));
;/*!node_modules/office-viewer/lib/util/blob.js*/
amis.define("2268331",(function(e,d,n,o){"use strict";Object.defineProperty(d,"__esModule",{value:!0}),d.downloadBlob=function(e,d){void 0===d&&(d="file.txt");var n=URL.createObjectURL(e),o=document.createElement("a");o.href=n,o.download=d,document.body.appendChild(o),o.dispatchEvent(new MouseEvent("click",{bubbles:!0,cancelable:!0,view:window})),document.body.removeChild(o)}}));
;/*!node_modules/office-viewer/lib/openxml/word/numbering/Lvl.js*/
amis.define("062dc8a",(function(e,a,r,t){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var l=e("c1138ba"),s=e("2360183"),n=e("dd1dc63"),c=e("a607958"),i=function(){function e(){this.start=1,this.lvlText="%1.",this.isLgl=!1,this.lvlJc="start",this.suff="space"}return e.fromXML=function(a,r){var t,i,u=new e;u.ilvl=r.getAttribute("w:ilvl");try{for(var o=l.__values(r.children),v=o.next();!v.done;v=o.next()){var w=v.value,f=w.tagName;switch(f){case"w:start":u.start=n.getValNumber(w);break;case"w:numFmt":u.numFmt=n.getVal(w);break;case"w:lvlText":u.lvlText=n.getVal(w);break;case"w:lvlJc":u.lvlJc=n.getVal(w);break;case"w:legacy":case"w:pStyle":break;case"w:pPr":u.pPr=c.Paragraph.parseParagraphPr(a,w);break;case"w:rPr":u.rPr=s.Run.parseRunPr(a,w);break;case"w:isLgl":u.isLgl=n.getValBoolean(w);break;default:console.warn("Lvl: Unknown tag ",f,w)}}}catch(e){t={error:e}}finally{try{v&&!v.done&&(i=o.return)&&i.call(o)}finally{if(t)throw t.error}}return u},e}();a.Lvl=i}));
;/*!node_modules/office-viewer/lib/openxml/word/numbering/AbstractNum.js*/
amis.define("94201b2",(function(e,t,r,l){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var a=e("c1138ba"),n=e("062dc8a"),u=e("dd1dc63"),i=function(){function e(){this.lvls={}}return e.fromXML=function(t,r){var l,i,v=new e;v.abstractNumId=r.getAttribute("w:abstractNumId")||"",v.multiLevelType=r.getAttribute("w:multiLevelType");var c=r.getElementsByTagName("w:lvl");try{for(var m=a.__values(c),o=m.next();!o.done;o=m.next()){var s=o.value,f=s.getAttribute("w:ilvl")||"";v.lvls[f]=n.Lvl.fromXML(t,s)}}catch(e){l={error:e}}finally{try{o&&!o.done&&(i=m.return)&&i.call(m)}finally{if(l)throw l.error}}var d=r.getElementsByTagName("w:multiLevelType").item(0);return d&&(v.multiLevelType=u.getVal(d)),v},e}();t.AbstractNum=i}));
;/*!node_modules/office-viewer/lib/openxml/word/numbering/Num.js*/
amis.define("ef94d51",(function(e,r,t,l){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("c1138ba"),n=e("dd1dc63"),v=e("062dc8a"),i=function(){function e(){this.lvlOverride={lvls:{}}}return e.fromXML=function(r,t){var l,i,d=new e;d.numId=t.getAttribute("w:numId")||"";var u=t.getElementsByTagName("w:abstractNumId").item(0);u&&(d.abstractNumId=n.getVal(u));var s=t.getElementsByTagName("w:lvlOverride").item(0);if(s)try{for(var c=a.__values(s.children),m=c.next();!m.done;m=c.next()){var o=m.value,f=o.tagName;switch(f){case"w:lvl":var w=o.getAttribute("w:lvlId")||"";d.lvlOverride.lvls[w]=v.Lvl.fromXML(r,o);break;case"w:startOverride":var g=o.getAttribute("w:lvlId")||"";d.lvlOverride.lvls[g]&&(d.lvlOverride.lvls[g].start=n.getValNumber(o));break;default:console.warn("Num: Unknown tag ",f,o)}}}catch(e){l={error:e}}finally{try{m&&!m.done&&(i=c.return)&&i.call(c)}finally{if(l)throw l.error}}return d},e}();r.Num=i}));
;/*!node_modules/office-viewer/lib/openxml/word/numbering/Numbering.js*/
amis.define("8a16805",(function(r,t,e,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=r("c1138ba"),u=r("94201b2"),m=r("ef94d51"),o=function(){function r(){this.abstractNums={},this.nums={},this.numData={}}return r.fromXML=function(t,e){var a,o,l,s,c=new r;try{for(var f=n.__values(e.getElementsByTagName("w:abstractNum")),i=f.next();!i.done;i=f.next()){var d=i.value,v=u.AbstractNum.fromXML(t,d);c.abstractNums[v.abstractNumId]=v}}catch(r){a={error:r}}finally{try{i&&!i.done&&(o=f.return)&&o.call(f)}finally{if(a)throw a.error}}try{for(var y=n.__values(e.getElementsByTagName("w:num")),b=y.next();!b.done;b=y.next()){var N=b.value,h=m.Num.fromXML(t,N);c.nums[h.numId]=h,c.numData[h.numId]={}}}catch(r){l={error:r}}finally{try{b&&!b.done&&(s=y.return)&&s.call(y)}finally{if(l)throw l.error}}return c},r}();t.Numbering=o}));
;/*!node_modules/office-viewer/lib/util/mergeRun.js*/
amis.define("ed3bef3",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("c1138ba"),l=e("aa13aed");function i(e,r,t){var a=r?l.parsePr(e,r):{},n=t?l.parsePr(e,t):{};return JSON.stringify(a)===JSON.stringify(n)}function o(e,r){var t=e.getElementsByTagName("w:t")[0],a=r.getElementsByTagName("w:t")[0];if(t&&a){var n=a.textContent||"";t.textContent+=n||""}}function f(e){var r,t,a=e.tagName,l=e.children,i=!1,o=!1;try{for(var f=n.__values(l),u=f.next();!u.done;u=f.next()){var c=u.value;if("w:t"===c.tagName&&(i=!0,o="preserve"===c.getAttribute("xml:space")))break;if("w:tab"===c.tagName)return!1}}catch(e){r={error:e}}finally{try{u&&!u.done&&(t=f.return)&&t.call(f)}finally{if(r)throw r.error}}return"w:r"===a&&i&&!o}function u(e,r){var t,a,l,u,c=[],s=null;try{for(var v=n.__values(r.children),y=v.next();!y.done;y=v.next()){var g=y.value,m=g.tagName;if(f(g))if(s)i(e,s.getElementsByTagName("w:rPr")[0],g.getElementsByTagName("w:rPr")[0])?o(s,g):(s=g,c.push(g));else s=g,c.push(g);else"w:proofErr"!==m&&(s=null,c.push(g))}}catch(e){t={error:e}}finally{try{y&&!y.done&&(a=v.return)&&a.call(v)}finally{if(t)throw t.error}}r.innerHTML="";try{for(var d=n.__values(c),h=d.next();!h.done;h=d.next()){var w=h.value;r.appendChild(w)}}catch(e){l={error:e}}finally{try{h&&!h.done&&(u=d.return)&&u.call(d)}finally{if(l)throw l.error}}}r.canMerge=f,r.mergeRun=function(e,r){var t,a,l=r.getElementsByTagName("w:p");try{for(var i=n.__values(l),o=i.next();!o.done;o=i.next()){u(e,o.value)}}catch(e){t={error:e}}finally{try{o&&!o.done&&(a=i.return)&&a.call(i)}finally{if(t)throw t.error}}},r.mergeRunInP=u}));
;/*!node_modules/office-viewer/lib/openxml/word/Header.js*/
amis.define("17a0f32",(function(e,r,a,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("c1138ba"),l=e("3226692"),o=e("49ee2ea"),f=e("a607958"),i=function(){function e(){this.children=[]}return e.fromXML=function(r,a){var n,i,c=new e,u=[];c.children=u;var s=a,d=a.firstElementChild;!d||"w:hdr"!==d.tagName&&"w:ftr"!==d.tagName||(s=d);try{for(var h=t.__values(l.mergeSdt(s)),v=h.next();!v.done;v=h.next()){var m=v.value,w=m.tagName;switch(w){case"w:p":var b=f.Paragraph.fromXML(r,m);u.push(b);break;case"w:tbl":var p=o.parseTable(r,m);u.push(p);break;default:console.warn("Header.fromXML Unknown key",w,m)}}}catch(e){n={error:e}}finally{try{v&&!v.done&&(i=h.return)&&i.call(h)}finally{if(n)throw n.error}}return c},e}();r.Header=i}));
;/*!node_modules/office-viewer/lib/openxml/word/Section.js*/
amis.define("0482f29",(function(e,r,t,a){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var i=e("c1138ba"),o=e("da61922"),n=e("dd1dc63"),s=e("17a0f32");function c(e,r,t){var a=r.getAttribute("w:type"),i=r.getAttribute("r:id");if(a&&i){var o=e.getDocumentRels(i);if(o){var n=e.getXML("/word/"+o.target);if(n)return{headerType:a,header:s.Header.fromXML(e,n)}}}return null}var d=function(){function e(){this.properties={},this.children=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.parsePr=function(e,r,t){var a,s,d={headers:{},footers:{}};try{for(var p=i.__values(r.children),h=p.next();!h.done;h=p.next()){var f=h.value;switch(f.tagName){case"w:pgSz":d.pageSize={width:o.parseSize(f,"w:w"),height:o.parseSize(f,"w:h")};break;case"w:pgMar":d.pageMargin={left:o.parseSize(f,"w:left"),right:o.parseSize(f,"w:right"),top:o.parseSize(f,"w:top"),bottom:o.parseSize(f,"w:bottom"),header:o.parseSize(f,"w:header"),footer:o.parseSize(f,"w:footer"),gutter:o.parseSize(f,"w:gutter")};break;case"w:headerReference":var u=c(e,f);u&&(d.headers[u.headerType]=u.header);break;case"w:footerReference":var w=c(e,f);w&&(d.footers[w.headerType]=w.header);break;case"w:cols":var l={},g=n.getAttrNumber(f,"w:num",1);l.num=g;var v=o.parseSize(f,"w:space");v&&(l.space=v),d.cols=l}}}catch(e){a={error:e}}finally{try{h&&!h.done&&(s=p.return)&&s.call(p)}finally{if(a)throw a.error}}return d},e}();r.Section=d}));
;/*!node_modules/office-viewer/lib/openxml/word/Body.js*/
amis.define("ad50150",(function(e,t,r,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("c1138ba"),i=e("3226692"),a=e("49ee2ea"),c=e("a607958"),s=e("0482f29"),d=function(){function e(){this.sections=[],this.currentSection=new s.Section,this.sections.push(this.currentSection)}return e.prototype.addChild=function(e){this.currentSection.addChild(e)},e.prototype.addSection=function(e){this.currentSection.properties=e,this.currentSection=new s.Section,this.sections.push(this.currentSection)},e.fromXML=function(t,r){var n,d,u=new e;try{for(var h=o.__values(i.mergeSdt(r)),l=h.next();!l.done;l=h.next()){var f=l.value,p=f.tagName;switch(p){case"w:p":var S=c.Paragraph.fromXML(t,f);u.addChild(S);break;case"w:tbl":var w=a.parseTable(t,f);u.addChild(w);break;case"w:bookmarkStart":case"w:bookmarkEnd":break;case"w:sectPr":u.addSection(s.Section.parsePr(t,f,u));break;default:console.warn("Body.fromXML Unknown key",p,f)}}}catch(e){n={error:e}}finally{try{l&&!l.done&&(d=h.return)&&d.call(h)}finally{if(n)throw n.error}}return u.sections=u.sections.filter((function(e){return e.children.length>0})),u},e}();t.Body=d}));
;/*!node_modules/office-viewer/lib/openxml/word/WDocument.js*/
amis.define("1ae34c0",(function(e,r,o,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("c1138ba"),n=e("20058a0"),l=e("09c12c7"),c=e("ad50150");var i=function(){function e(){}return e.fromXML=function(r,o){var t,i,u,m,h=new e,d=o.getElementsByTagName("w:body").item(0);d&&(h.body=c.Body.fromXML(r,d));var s=o.getElementsByTagName("w:background").item(0);if(s){var f={};try{for(var w=a.__values(s.attributes),v=w.next();!v.done;v=w.next()){switch(v.value.name){case"w:color":f.color=l.parseColorAttr(r,s,"w:color");break;case"w:themeColor":f.themeColor=l.parseColorAttr(r,s,"w:themeColor");break;case"w:themeShade":f.themeShade=l.parseColorAttr(r,s,"w:themeShade");break;case"w:themeTint":f.themeTint=l.parseColorAttr(r,s,"w:themeTint");break;default:console.log("unknown background",s)}}}catch(e){t={error:e}}finally{try{v&&!v.done&&(i=w.return)&&i.call(w)}finally{if(t)throw t.error}}try{for(var b=a.__values(s.children),y=b.next();!y.done;y=b.next()){if("v:background"===y.value.tagName);else console.log("unknown background",s)}}catch(e){u={error:e}}finally{try{y&&!y.done&&(m=b.return)&&m.call(b)}finally{if(u)throw u.error}}h.backgroundColor=function(e){if(e.color)return e.color;if(e.themeColor){var r=e.themeColor;if(e.themeTint){var o=new n.Color(r),t=parseInt(e.themeTint,16);o.tint(t/256)}else e.themeShade&&(o=new n.Color(r),t=parseInt(e.themeShade,16),o.lumMod(t/256))}return"#FFFFF"}(f)}return h},e}();r.WDocument=i}));
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
amis.define("d149e0a",(function(t,e,r,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=t("node_modules/fflate/lib/index.cjs"),o=function(){function t(){}return t.prototype.load=function(t){this.zip=i.unzipSync(new Uint8Array(t))},t.prototype.getXML=function(t){var e=this.getFileByType(t,"string"),r=(new DOMParser).parseFromString(e,"application/xml"),n=r.getElementsByTagName("parsererror").item(0);if(n)throw new Error(n.textContent||"can't parse xml");return r},t.prototype.getFileByType=function(t,e){t=t.startsWith("/")?t.slice(1):t;var r=this.zip[t];if(r){if("string"===e)return i.strFromU8(r);if("blob"===e)return new Blob([r]);if("uint8array"===e)return r}return console.warn("getFileByType",t,"not found"),null},t.prototype.saveFile=function(t,e){"string"==typeof e&&(e=i.strToU8(e)),this.zip[t]=e},t.prototype.fileExists=function(t){return(t=t.startsWith("/")?t.slice(1):t)in this.zip},t.prototype.generateZip=function(t){return this.zip["word/document.xml"]=i.strToU8(t),new Blob([i.zipSync(this.zip)])},t}();e.default=o}));
;/*!node_modules/office-viewer/lib/render/renderFont.js*/
amis.define("19f1966",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("c1138ba"),l=e("0c75dbf");n.renderFont=function(e){var n,r;if(!e)return null;var t=e.fonts;if(!t||!t.length)return null;var f=l.createElement("style"),o="/** embedded fonts **/";try{for(var c=a.__values(e.fonts),u=c.next();!u.done;u=c.next()){var i=u.value,d=i.name.replace(/['\\]/g,""),s=i.url;d&&s&&(o+="\n      @font-face {\n        font-family: '".concat(d,"';\n        src: url('").concat(s,"');\n      }\n      "))}}catch(e){n={error:e}}finally{try{u&&!u.done&&(r=c.return)&&r.call(c)}finally{if(n)throw n.error}}return f.innerHTML=o,f}}));
;/*!node_modules/office-viewer/lib/util/createObject.js*/
amis.define("d148ac9",(function(e,r,t,c){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("c1138ba");function a(e,r){void 0===r&&(r=!0);var t=e&&e.__super?Object.create(e.__super,{__super:{value:e.__super,writable:!1,enumerable:!1}}):Object.create(Object.prototype);return r&&e&&Object.keys(e).forEach((function(r){return t[r]=e[r]})),t}function u(e){var r=typeof e;return e&&"string"!==r&&"number"!==r&&"boolean"!==r&&"function"!==r&&!Array.isArray(e)}r.cloneObject=a,r.createObject=function(e,r,t){e&&Object.isFrozen(e)&&(e=a(e));var c=e?Object.create(e,n.__assign(n.__assign({},t),{__super:{value:e,writable:!1,enumerable:!1}})):Object.create(Object.prototype,t);return r&&u(r)&&Object.keys(r).forEach((function(e){return c[e]=r[e]})),c},r.isObject=u}));
;/*!node_modules/office-viewer/lib/util/replaceVar.js*/
amis.define("8f06585",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("c1138ba"),l=e("4c2701f"),o=e("d148ac9");function i(e,r,t){var n=r.textContent||"";r.textContent=c(e,n,t)}function c(e,r,t){var n=e.renderOptions.evalVar;if(r.startsWith("{{")){var a=n(r=r.replace(/^{{/g,"").replace(/}}$/g,""),t);return null!=a?String(a):(console.warn("var error: [",r,"] not found in data"),"")}return r}var s=1;function u(e,r,t,n){return void 0===n&&(n=!1),a.__awaiter(this,void 0,void 0,(function(){var o,i,u,d,f,v,y;return a.__generator(this,(function(a){switch(a.label){case 0:return r.getAttribute("downloaded")?[2]:(o=r.getAttribute("descr")||"",i=c(e,o,t),r.setAttribute("descrVar",i),n&&i?(u=r.parentElement.parentElement,(d=u.getElementsByTagName("a:blip").item(0))?(f="rIdn".concat(s),d.setAttribute("r:embed",f),[4,fetch(i)]):[3,3]):[3,4]);case 1:return[4,a.sent().arrayBuffer()];case 2:v=a.sent(),e.saveNewImage(f,new Uint8Array(v)),r.setAttribute("downloaded","true"),s++,a.label=3;case 3:(y=l.Pic.fromXML(e,u))&&y.blipFill&&y.blipFill.blip&&y.blipFill.blip.embled,a.label=4;case 4:return[2]}}))}))}function d(e,r,t){return void 0===t&&(t=!1),a.__awaiter(this,void 0,void 0,(function(){var n,l,c,s,d,v,y,h,_,b,g,m,w,p,x,N,E,B,T,A,C,O,P,V,F,j,I,M,S,W,L,U,X,$,k,q,z,D,G;return a.__generator(this,(function(H){switch(H.label){case 0:n=e.renderOptions.evalVar,l=e.renderOptions.data,c=r.parentNode,s=r.getElementsByTagName("w:tc"),d=!1,v=[];try{for(y=a.__values(s),h=y.next();!h.done;h=y.next()){_=h.value,A=_.getElementsByTagName("w:t");try{for(U=void 0,b=a.__values(A),g=b.next();!g.done;g=b.next())V=g.value,(m=V.textContent||"").startsWith("{{#")&&(w=/{{#([^\}]+)}}/.exec(m))&&w.length>0&&(d=!0,p=w[1],x=n(p,l),Array.isArray(x)&&(v=x),V.textContent=V.textContent.replace("{{#".concat(p,"}}"),"")),-1!==m.indexOf("{{/}}")&&(V.textContent=V.textContent.replace("{{/}}",""))}catch(e){U={error:e}}finally{try{g&&!g.done&&(X=b.return)&&X.call(b)}finally{if(U)throw U.error}}}}catch(e){W={error:e}}finally{try{h&&!h.done&&(L=y.return)&&L.call(y)}finally{if(W)throw W.error}}if(!d)return[3,16];H.label=1;case 1:H.trys.push([1,13,14,15]),N=a.__values(v),E=N.next(),H.label=2;case 2:if(E.done)return[3,12];B=E.value,T=function(e){var r,t,n,l,o,i=e.cloneNode(!0);f(i);var c=[].slice.call(i.getElementsByTagName("w:p"));try{for(var s=a.__values(c),u=s.next();!u.done;u=s.next()){f(u.value)}}catch(e){r={error:e}}finally{try{u&&!u.done&&(t=s.return)&&t.call(s)}finally{if(r)throw r.error}}var d=[].slice.call(i.getElementsByTagName("w:cnfStyle"));try{for(var v=a.__values(d),y=v.next();!y.done;y=v.next()){var h=y.value;null===(o=h.parentElement)||void 0===o||o.removeChild(h)}}catch(e){n={error:e}}finally{try{y&&!y.done&&(l=v.return)&&l.call(v)}finally{if(n)throw n.error}}return i}(r),A=T.getElementsByTagName("w:t"),C=o.createObject(l,B);try{for(q=void 0,O=a.__values(A),P=O.next();!P.done;P=O.next())V=P.value,i(e,V,C)}catch(e){q={error:e}}finally{try{P&&!P.done&&(z=O.return)&&z.call(O)}finally{if(q)throw q.error}}H.label=3;case 3:H.trys.push([3,8,9,10]),D=void 0,F=a.__values(T.getElementsByTagName("pic:cNvPr")),j=F.next(),H.label=4;case 4:return j.done?[3,7]:(I=j.value,[4,u(e,I,C,t)]);case 5:H.sent(),H.label=6;case 6:return j=F.next(),[3,4];case 7:return[3,10];case 8:return M=H.sent(),D={error:M},[3,10];case 9:try{j&&!j.done&&(G=F.return)&&G.call(F)}finally{if(D)throw D.error}return[7];case 10:c.insertBefore(T,r),H.label=11;case 11:return E=N.next(),[3,2];case 12:return[3,15];case 13:return S=H.sent(),$={error:S},[3,15];case 14:try{E&&!E.done&&(k=N.return)&&k.call(N)}finally{if($)throw $.error}return[7];case 15:c.removeChild(r),H.label=16;case 16:return[2]}}))}))}function f(e){for(;e.attributes.length>0;)e.removeAttributeNode(e.attributes[0])}function v(e,r,t){return void 0===t&&(t=!1),a.__awaiter(this,void 0,void 0,(function(){var n,l,o,i,c,s,u;return a.__generator(this,(function(f){switch(f.label){case 0:n=[].slice.call(r.getElementsByTagName("w:tr")),f.label=1;case 1:f.trys.push([1,6,7,8]),l=a.__values(n),o=l.next(),f.label=2;case 2:return o.done?[3,5]:(i=o.value,[4,d(e,i,t)]);case 3:f.sent(),f.label=4;case 4:return o=l.next(),[3,2];case 5:return[3,8];case 6:return c=f.sent(),s={error:c},[3,8];case 7:try{o&&!o.done&&(u=l.return)&&u.call(l)}finally{if(s)throw s.error}return[7];case 8:return[2]}}))}))}function y(e,r){return a.__awaiter(this,void 0,void 0,(function(){var t,n,l,o,i,c;return a.__generator(this,(function(s){switch(s.label){case 0:s.trys.push([0,5,6,7]),t=a.__values(r.getElementsByTagName("pic:cNvPr")),n=t.next(),s.label=1;case 1:return n.done?[3,4]:(l=n.value,[4,u(e,l,e.renderOptions.data,!0)]);case 2:s.sent(),s.label=3;case 3:return n=t.next(),[3,1];case 4:return[3,7];case 5:return o=s.sent(),i={error:o},[3,7];case 6:try{n&&!n.done&&(c=t.return)&&c.call(t)}finally{if(i)throw i.error}return[7];case 7:return[2]}}))}))}r.replaceT=i,r.replaceVar=function(e,r,t){return void 0===t&&(t=!1),a.__awaiter(this,void 0,void 0,(function(){return a.__generator(this,(function(n){switch(n.label){case 0:return[4,v(e,r,t)];case 1:return n.sent(),t?[4,y(e,r)]:[3,3];case 2:n.sent(),n.label=3;case 3:return[2]}}))}))}}));
;/*!node_modules/office-viewer/lib/openxml/word/Note.js*/
amis.define("d35a139",(function(e,r,a,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var t=e("c1138ba"),o=e("49ee2ea"),i=e("a607958"),l=function(){function e(){this.children=[]}return e.prototype.addChild=function(e){this.children.push(e)},e.fromXML=function(r,a){var n,l,d=new e;try{for(var c=t.__values(a.children),u=c.next();!u.done;u=c.next()){var f=u.value,h=f.tagName;switch(h){case"w:p":var s=i.Paragraph.fromXML(r,f);d.addChild(s);break;case"w:tbl":var v=o.parseTable(r,f);d.addChild(v);break;default:console.warn("Note.fromXML unknown tag",h,f)}}}catch(e){n={error:e}}finally{try{u&&!u.done&&(l=c.return)&&l.call(c)}finally{if(n)throw n.error}}return d},e}();r.Note=l}));
;/*!node_modules/office-viewer/lib/parse/Footnotes.js*/
amis.define("2bf8f92",(function(e,t,r,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o=e("c1138ba"),n=e("d35a139");t.parseFootnotes=function(e,t){var r,a,l={},f=[].slice.call(t.getElementsByTagName("w:footnote"));try{for(var i=o.__values(f),c=i.next();!c.done;c=i.next()){var u=c.value,s=n.Note.fromXML(e,u);l[u.getAttribute("w:id")]=s}}catch(e){r={error:e}}finally{try{c&&!c.done&&(a=i.return)&&a.call(i)}finally{if(r)throw r.error}}return l}}));
;/*!node_modules/office-viewer/lib/parse/parseEndnotes.js*/
amis.define("db67803",(function(e,r,t,n){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var a=e("c1138ba"),l=e("d35a139");r.parseEndnotes=function(e,r){var t,n,o={},i=[].slice.call(r.getElementsByTagName("w:endnote"));try{for(var c=a.__values(i),d=c.next();!d.done;d=c.next()){var u=d.value,f=l.Note.fromXML(e,u);o[u.getAttribute("w:id")]=f}}catch(e){t={error:e}}finally{try{d&&!d.done&&(n=c.return)&&n.call(c)}finally{if(t)throw t.error}}return o}}));
;/*!node_modules/office-viewer/lib/render/renderNotes.js*/
amis.define("952f0a7",(function(e,n,r,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var a=e("c1138ba"),o=e("a607958"),i=e("2858914"),f=e("0c75dbf"),l=e("61e0815"),d=e("30065f0");function c(e,n,r,t,c){var u,s,v=c.children,h=f.createElement("div"),p=f.createElement("a"),N=r+"-"+t;p.name=N,p.id=N,n.appendChild(h);try{for(var m=a.__values(v),y=m.next();!y.done;y=m.next()){var b=y.value;if(b instanceof o.Paragraph){var _=l.default(e,b);f.appendChild(h,_)}else b instanceof i.Table?f.appendChild(h,d.default(e,b)):console.warn("unknown child",b)}}catch(e){u={error:e}}finally{try{y&&!y.done&&(s=m.return)&&s.call(m)}finally{if(u)throw u.error}}}function u(e){if(!e)return!1;for(var n in e)if("0"!==n&&"-1"!==n)return!0;return!1}n.renderNotes=function(e){var n=f.createElement("div");if(u(e.footNotes))for(var r in e.footNotes)c(e,n,"footnote",r,e.footNotes[r]);if(u(e.endNotes))for(var r in e.endNotes||{})c(e,n,"endnote",r,e.endNotes[r]);return n.children.length?n:null}}));
;/*!node_modules/office-viewer/lib/util/print.js*/
amis.define("4e19274",(function(n,e,t,r){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("c1138ba");function o(n){return new Promise((function(e){var t=function(){n&&void 0!==n.naturalWidth&&0!==n.naturalWidth&&n.complete?e():setTimeout(t,500)};t()}))}function a(n){var e,t;null===(e=n.contentWindow)||void 0===e||e.print(),null===(t=n.parentNode)||void 0===t||t.removeChild(n)}e.printIframe=function(n){var e=n.contentDocument.getElementsByTagName("img");e.length>0?function(n){var e=this,t=n.map((function(n){return i.__awaiter(e,void 0,void 0,(function(){return i.__generator(this,(function(e){switch(e.label){case 0:return n.src&&n.src!==window.location.href?[4,o(n)]:[3,2];case 1:e.sent(),e.label=2;case 2:return[2]}}))}))}));return Promise.all(t)}(Array.from(e)).then((function(){return a(n)})):a(n)}}));
;/*!node_modules/office-viewer/lib/openxml/Settings.js*/
amis.define("8965cd8",(function(e,t,r,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=e("c1138ba"),l=e("dd1dc63");function i(e){var t,r,a={};try{for(var l=n.__values(e.attributes),i=l.next();!i.done;i=l.next()){var o=i.value,c=o.name.replace("w:",""),u=o.value;"light1"===u?u="lt1":"light2"===u?u="lt2":"dark1"===u?u="dk1":"dark2"===u&&(u="dk2"),a[c]=u}}catch(e){t={error:e}}finally{try{i&&!i.done&&(r=l.return)&&r.call(l)}finally{if(t)throw t.error}}return a.bg1||(a.bg1="lt1"),a.bg2||(a.bg2="lt2"),a.tx1||(a.tx1="dk1"),a}var o=function(){function e(){this.clrSchemeMapping={},this.autoHyphenation=!1}return e.parse=function(t,r){var a,o,c=new e,u=r;r.firstElementChild&&"w:settings"===r.firstElementChild.tagName&&(u=r.getElementsByTagName("w:settings").item(0));try{for(var s=n.__values(Array.from(u.children)),d=s.next();!d.done;d=s.next()){var f=d.value;switch(f.tagName){case"w:clrSchemeMapping":c.clrSchemeMapping=i(f);break;case"w:autoHyphenation":c.autoHyphenation=l.getValBoolean(f,!1)}}}catch(e){a={error:e}}finally{try{d&&!d.done&&(o=s.return)&&o.call(s)}finally{if(a)throw a.error}}return c},e}();t.Settings=o}));
;/*!node_modules/office-viewer/lib/util/get.js*/
amis.define("63ff688",(function(e,t,n,i){"use strict";Object.defineProperty(t,"__esModule",{value:!0});t.get=function(e,t,n){void 0===n&&(n=void 0);var i=function(n){return String.prototype.split.call(t,n).filter(Boolean).reduce((function(e,t){return null!=e?e[t]:e}),e)},r=i(/[,[\]]+?/)||i(/[,[\].]+?/);return void 0===r||r===e?n:r}}));
;/*!node_modules/office-viewer/lib/util/fileType.js*/
amis.define("74e6364",(function(e,r,i,t){"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n=e("c1138ba");function a(e,r,i){var t,a;void 0===i&&(i={});var m=i.offset||0;try{for(var o=n.__values(r.entries()),f=o.next();!f.done;f=o.next()){var p=n.__read(f.value,2),u=p[0],d=p[1];if(i.mask){if(d!==(i.mask[u]&e[u+m]))return!1}else if(d!==e[u+m])return!1}}catch(e){t={error:e}}finally{try{f&&!f.done&&(a=o.return)&&a.call(o)}finally{if(t)throw t.error}}return!0}function m(e,r,i){return void 0===i&&(i={}),a(e,function(e){return n.__spreadArray([],n.__read(e),!1).map((function(e){return e.charCodeAt(0)}))}(r),i)}r.fileTypeFromBuffer=function(e){return a(e,[137,80,78,71,13,10,26,10])?{ext:"png",mime:"image/png"}:a(e,[255,216,255])?{ext:"jpg",mime:"image/jpeg"}:a(e,[71,73,70])?{ext:"gif",mime:"image/gif"}:a(e,[66,77])?{ext:"bmp",mime:"image/bmp"}:a(e,[197,208,211,198])?{ext:"eps",mime:"application/eps"}:m(e,"8BPS")?{ext:"psd",mime:"image/vnd.adobe.photoshop"}:m(e,"%PDF")?{ext:"pdf",mime:"application/pdf"}:null}}));
;/*!node_modules/office-viewer/lib/Word.js*/
amis.define("cff2aa3",(function(t,e,r,i){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=t("c1138ba"),s=t("cb021f4"),a=t("724ba4d"),o=t("96ad35b"),l=t("5d775b7"),p=t("adb5739"),d=t("bcb6d07"),h=t("2268331"),c=t("8a16805"),u=t("0c75dbf"),f=t("83b91ea"),g=t("ed3bef3"),m=t("1ae34c0"),y=t("11d5fc3"),v=t("d149e0a"),b=t("3a0c5a7"),w=t("2d81260"),T=t("19f1966"),_=t("8f06585"),x=t("2bf8f92"),N=t("db67803"),M=t("952f0a7"),L=t("4e19274"),C=t("8965cd8"),E=t("63ff688"),R=t("74e6364"),S={classPrefix:"docx-viewer",page:!1,pageWrap:!0,bulletUseFont:!0,ignoreHeight:!0,ignoreWidth:!1,minLineHeight:1,enableVar:!1,debug:!1,pageWrapPadding:20,pageMarginBottom:20,pageShadow:!0,pageBackground:"#FFFFFF",pageWrapBackground:"#ECECEC",printWaitTime:100,zoomFitWidth:!1,renderHeader:!0,renderFooter:!0,data:{},evalVar:function(t,e){return E.get(e,t)}},O=function(){function t(e,r,i){void 0===i&&(i=new v.default),this.themes=[],this.styleIdMap={},this.styleIdNum=0,this.wrapClassName="docx-viewer-wrapper",this.footNotes={},this.endNotes={},this.inited=!1,this.breakPage=!1,this.DOCUMENT_RELS="/word/_rels/document.xml.rels",i.load(e),this.id=t.globalId++,this.parser=i,this.renderOptions=n.__assign(n.__assign({},S),r),this.renderOptions.page&&(this.renderOptions.ignoreHeight=!1,this.renderOptions.ignoreWidth=!1)}return t.prototype.init=function(){this.inited||(this.initContentType(),this.initRelation(),this.initSettings(),this.initTheme(),this.initFontTable(),this.initStyle(),this.initNumbering(),this.initNotes(),this.inited=!0)},t.prototype.initTheme=function(){var t,e;try{for(var r=n.__values(this.conentTypes.overrides),i=r.next();!i.done;i=r.next()){var s=i.value;if(s.partName.startsWith("/word/theme")){var a=this.parser.getXML(s.partName);this.themes.push(p.parseTheme(a))}}}catch(e){t={error:e}}finally{try{i&&!i.done&&(e=r.return)&&e.call(r)}finally{if(t)throw t.error}}},t.prototype.initStyle=function(){var t,e;try{for(var r=n.__values(this.conentTypes.overrides),i=r.next();!i.done;i=r.next()){i.value.partName.startsWith("/word/styles.xml")&&(this.styles=l.parseStyles(this,this.parser.getXML("/word/styles.xml")))}}catch(e){t={error:e}}finally{try{i&&!i.done&&(e=r.return)&&e.call(r)}finally{if(t)throw t.error}}},t.prototype.initSettings=function(){var t,e;try{for(var r=n.__values(this.conentTypes.overrides),i=r.next();!i.done;i=r.next()){i.value.partName.startsWith("/word/settings.xml")&&(this.settings=C.Settings.parse(this,this.parser.getXML("/word/settings.xml")))}}catch(e){t={error:e}}finally{try{i&&!i.done&&(e=r.return)&&e.call(r)}finally{if(t)throw t.error}}},t.prototype.initFontTable=function(){var t,e;try{for(var r=n.__values(this.conentTypes.overrides),i=r.next();!i.done;i=r.next()){i.value.partName.startsWith("/word/fontTable.xml")&&(this.fontTable=s.FontTable.fromXML(this,this.parser.getXML("/word/fontTable.xml")))}}catch(e){t={error:e}}finally{try{i&&!i.done&&(e=r.return)&&e.call(r)}finally{if(t)throw t.error}}},t.prototype.initRelation=function(){var t={};this.parser.fileExists("/_rels/.rels")&&(t=a.parseRelationships(this.parser.getXML("/_rels/.rels"),"root")),this.relationships=t;var e={};this.parser.fileExists(this.DOCUMENT_RELS)&&(e=a.parseRelationships(this.parser.getXML(this.DOCUMENT_RELS),"word")),this.documentRels=e;var r={};this.parser.fileExists("/word/_rels/fontTable.xml.rels")&&(r=a.parseRelationships(this.parser.getXML("/word/_rels/fontTable.xml.rels"),"word")),this.fontTableRels=r},t.prototype.initContentType=function(){var t=this.parser.getXML("[Content_Types].xml");this.conentTypes=o.parseContentType(t)},t.prototype.initNumbering=function(){var t,e;try{for(var r=n.__values(this.conentTypes.overrides),i=r.next();!i.done;i=r.next()){var s=i.value;if(s.partName.startsWith("/word/numbering")){var a=this.parser.getXML(s.partName);this.numbering=c.Numbering.fromXML(this,a)}}}catch(e){t={error:e}}finally{try{i&&!i.done&&(e=r.return)&&e.call(r)}finally{if(t)throw t.error}}},t.prototype.initNotes=function(){var t,e;try{for(var r=n.__values(this.conentTypes.overrides),i=r.next();!i.done;i=r.next()){var s=i.value;if(s.partName.startsWith("/word/footnotes.xml")){var a=this.parser.getXML(s.partName);this.footNotes=x.parseFootnotes(this,a)}if(s.partName.startsWith("/word/endnotes.xml")){a=this.parser.getXML(s.partName);this.endNotes=N.parseEndnotes(this,a)}}}catch(e){t={error:e}}finally{try{i&&!i.done&&(e=r.return)&&e.call(r)}finally{if(t)throw t.error}}},t.prototype.getRelationship=function(t){return t&&this.relationships?this.relationships[t]:null},t.prototype.getDocumentRels=function(t){return t&&this.documentRels?this.documentRels[t]:null},t.prototype.getFontTableRels=function(t){return t&&this.fontTableRels?this.fontTableRels[t]:null},t.prototype.replaceText=function(t){var e=this;if(!1===this.renderOptions.enableVar)return t;var r=this.renderOptions.data;return-1!==t.indexOf("{{")&&(t=t.replace(/{{([^{}]+)}}/g,(function(t,i){var n=e.renderOptions.evalVar(i,r);return void 0===n?"":String(n)}))),t},t.prototype.loadWordRelXML=function(t){var e=t.target;return"word"===t.part&&(e="word/"+e),this.getXML(e)},t.prototype.loadImage=function(t){var e=t.target;"word"===t.part&&(e="word/"+e);var r=this.parser.getFileByType(e,"blob");return r?URL.createObjectURL(r):null},t.prototype.saveNewImage=function(t,e){if(this.parser.fileExists(this.DOCUMENT_RELS)){var r=this.parser.getXML(this.DOCUMENT_RELS),i=r.getElementsByTagName("Relationship").item(0).cloneNode(!0);i.setAttributeNS(null,"Id",t),i.setAttributeNS(null,"Type","http://schemas.openxmlformats.org/officeDocument/2006/relationships/image");var n="",s=R.fileTypeFromBuffer(e);s&&(n="."+s.ext);var a="media/image"+t+n;i.setAttributeNS(null,"Target",a),r.getElementsByTagName("Relationships")[0].appendChild(i),this.parser.saveFile(this.DOCUMENT_RELS.replace(/^\//,""),b.buildXML(r)),this.parser.saveFile("word/"+a,e)}},t.prototype.loadFont=function(t,e){var r=this.getFontTableRels(t);if(!r)return null;var i=r.target;"word"===r.part&&(i="word/"+i);var n=this.parser.getFileByType(i,"uint8array");return n?URL.createObjectURL(new Blob([w.deobfuscate(n,e)])):null},t.prototype.getXML=function(t){return this.parser.getXML(t)},t.prototype.getStyleIdDisplayName=function(t){return t.match(/^[a-zA-Z]+[a-zA-Z0-9\-\_]*$/)?this.getClassPrefix()+"-"+t:(t in this.styleIdMap||(this.styleIdMap[t]=this.genClassName()),this.styleIdMap[t])},t.prototype.genClassName=function(){return"docx-classname-"+this.styleIdNum++},t.prototype.appendStyle=function(t){void 0===t&&(t="");var e=u.createElement("style");e.textContent=t,this.rootElement.appendChild(e)},t.prototype.getStyleClassName=function(t){var e=this.styles.styleMap[t];if(!e)return[];var r=[this.getStyleIdDisplayName(t)];return e.basedOn&&r.unshift(this.getStyleIdDisplayName(e.basedOn)),r},t.prototype.getStyle=function(t){return this.styles.styleMap[t]},t.prototype.getClassPrefix=function(){return"".concat(this.renderOptions.classPrefix,"-").concat(this.id)},t.prototype.getThemeColor=function(t){var e,r;if(this.settings.clrSchemeMapping&&(t=this.settings.clrSchemeMapping[t]||t),this.themes&&this.themes.length>0){var i=null===(r=null===(e=this.themes[0].themeElements)||void 0===e?void 0:e.clrScheme)||void 0===r?void 0:r.colors,n=null==i?void 0:i[t];return n||(console.warn("unknown theme color: "+t),(null==i?void 0:i.accent1)||"")}return""},t.prototype.addClass=function(t,e){t.classList.add("".concat(this.getClassPrefix(),"-").concat(e))},t.prototype.updateVariable=function(){this.rootElement&&!1!==this.renderOptions.enableVar&&y.updateVariableText(this)},t.prototype.download=function(t){return void 0===t&&(t="document.docx"),n.__awaiter(this,void 0,void 0,(function(){var e,r,i,s;return n.__generator(this,(function(n){switch(n.label){case 0:return e=this.getXML("word/document.xml"),this.renderOptions.enableVar?(g.mergeRun(this,e),[4,_.replaceVar(this,e,!0)]):[3,2];case 1:for(n.sent(),r=e.getElementsByTagName("w:t"),i=0;i<r.length;i++)_.replaceT(this,r[i],this.renderOptions.data);n.label=2;case 2:return s=this.parser.generateZip(b.buildXML(e)),h.downloadBlob(s,t),[2]}}))}))},t.prototype.print=function(){return n.__awaiter(this,void 0,void 0,(function(){var t,e;return n.__generator(this,(function(r){switch(r.label){case 0:return(t=document.createElement("iframe")).style.position="absolute",t.style.top="-10000px",document.body.appendChild(t),(e=t.contentDocument)?(e.write('<style>\n      html, body { margin:0; padding:0 }\n      @page { size: auto; margin: 0mm; }\n      </style>\n      <div id="print"></div>'),[4,this.render(e.getElementById("print"),n.__assign({page:!0,pageWrap:!1,pageShadow:!1,pageMarginBottom:0,pageWrapPadding:void 0,zoom:1},this.renderOptions.printOptions))]):(console.warn("printDocument is null"),[2,null]);case 1:return r.sent(),setTimeout((function(){t.focus(),L.printIframe(t)}),this.renderOptions.printWaitTime||100),window.focus(),[2]}}))}))},t.prototype.render=function(t,e){return void 0===e&&(e={}),n.__awaiter(this,void 0,void 0,(function(){var r,i,s,a,o;return n.__generator(this,(function(l){switch(l.label){case 0:return this.init(),this.currentPage=0,r=n.__assign(n.__assign({},this.renderOptions),e),(i=r.debug)&&console.log("init",this),this.rootElement=t,t.innerHTML="",s=this.getXML("word/document.xml"),i&&console.log("documentData",s),r.enableVar?(g.mergeRun(this,s),[4,_.replaceVar(this,s)]):[3,2];case 1:l.sent(),l.label=2;case 2:return a=m.WDocument.fromXML(this,s),i&&console.log("document",a),o=d.default(t,this,a,r),t.classList.add(this.getClassPrefix()),r.page&&r.pageWrap&&(t.classList.add(this.wrapClassName),t.style.padding="".concat(r.pageWrapPadding||0,"pt"),t.style.background=r.pageWrapBackground||"#ECECEC"),u.appendChild(t,f.renderStyle(this)),u.appendChild(t,T.renderFont(this.fontTable)),u.appendChild(t,o),u.appendChild(t,M.renderNotes(this)),[2]}}))}))},t.globalId=0,t}();e.default=O}));
;/*!node_modules/office-viewer/lib/index.js*/
amis.define("ddb48e1",(function(e,d,a,f){"use strict";Object.defineProperty(d,"__esModule",{value:!0});var t=e("cff2aa3"),u={Word:t.default};d.Word=t.default,d.default=u}));