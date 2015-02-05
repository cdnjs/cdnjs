/*global jQuery */
/*!
 * Kerning.js
 * Version: 0.2
 * Copyright 2011 Joshua Gross
 * MIT license
 *
 * Usage:
 *  Include this file anywhere in your HTML
 *    <script src="kerning.js"></script>
 *
 *  Then, add any of the attributes following to your CSS, under any
 *  selectors you want modified:
 *    -letter-kern, -letter-size, -letter-weight, -letter-color, -letter-transform
 *    -word-kern, -word-size, -word-weight, -word-color, -word-transform
 *
 *  To use pairings (e.g., modify 'a' if 'ab' is paired):
 *    -letter-pairs('xy': [value], …)
 *    -word-pairs('cat mouse': [value], …)
 *
 *  To use multiple transforms, you need to use transform "groups":
 *    -transform-group([transform] [transform] …)
 *
 *  Sometimes you need to want to use a different size or weight, depending on what
 *  font has loaded:
 *    font-size: [default size];
 *    font-size: if-font('font name': [size], 'font name': [size], …);
 *  (The first line is a fallback should Kerning.js not load. This is recommended.)
 *
 *  That's it! Attributes will be applied automagically.
 *
 * Examples:
 *  Alter first 3 letters:
 *    -letter-size: 100px 20px 30px;
 *
 *  Modify letter pairs:
 *    -letter-kern: -letter-pairs('ab': 1px,
 *                                'bc': 300px,
 *                                's ': 100px);
 *
 *  Transform the first two letters:
 *    -letter-transform: -transform-group(rotate3d(0,0,1,10deg) translate3d(0,10px,0))
 *                       -transform-group(translate3d(0,-10px,0) rotate3d(0,0,1,-10deg));
 *
 *  Modify word pairs:
 *    -word-size: -word-pairs('this is': 10em);
 *
 *  Modify the first 3 words:
 *    -word-size: 10em 0.1em 0.2em;
 *
 *  Using repeat rules:
 *    -letter-color: -letter-repeat(even: #f0f0f0, odd: #cccccc);
 *    -letter-color: -letter-repeat(2n+1: #f0f0f0);
 *
 *  Using conditionals:
 *    -letter-kern: if-font('Helvetica Neue': 0 1px 1px, 'Helvetica': 0 -1px 0);
 *
 *  Using conditionals on existing properties for weight or size:
 *    font-size: 9.5em;
 *    font-size: if-font('Helvetica Neue': 10em, 'Helvetica': 9em);
 */
(function($){(function(){function styleAttributes(a,b){var c="",d,e={};a=a.replace(RESGMLcomment,"").replace(REnotATag,"$1"),munge(a).replace(REtag,function(a,b,f){b=b.toLowerCase(),e[b]?++e[b]:e[b]=1;if(d=/\bstyle\s*=\s*(%s`\d+`s%)/i.exec(f)){var g=/\bid\s*=\s*(\S+)/i.exec(f);g?g="#"+restore(g[1]).replace(/^['"]|['"]$/g,""):g=b+":eq("+(e[b]-1)+")",c+=[g,"{",restore(d[1]).replace(/^['"]|['"]$/g,""),"}"].join("")}}),$.parsecss(c,b)}function processAtRule(a,b){var c=a.split(/\s+/),d=c.shift();if(d=="media"){var e=restore(c.pop()).slice(1,-1);$.parsecss.mediumApplies(c.join(" "))&&$.parsecss(e,b)}else if(d="import"){var f=restore(c.shift());$.parsecss.mediumApplies(c.join(" "))&&(f=f.replace(/^url\(|\)$/gi,"").replace(/^["']|["']$/g,""),$.get(f,function(a){$.parsecss(a,b)}))}}function restore(a){if(a===undefined)return a;while(match=REmunged.exec(a))a=a.replace(REmunged,munged[match[1]]);return $.trim(a)}function munge(a,b){a=a.replace(REatcomment,"$1").replace(REcomment_string,function(a,b){if(!b)return"";var c="%s`"+ ++uid+"`s%";munged[uid]=b.replace(/^\\/,"");return c});var c=b?REfull:REbraces;while(match=c.exec(a))replacement="%b`"+ ++uid+"`b%",munged[uid]=match[0],a=a.replace(c,replacement);return a}function parsedeclarations(a){var b=munged[a].replace(/^{|}$/g,"");b=munge(b);var c={};$.each(b.split(";"),function(a,b){b=b.split(":");b.length<2||(c[restore(b[0])]=restore(b.slice(1).join(":")))});return c}$.fn.findandfilter=function(a){var b=this.filter(a).add(this.find(a));b.prevObject=b.prevObject.prevObject;return b},$.fn.parsecss=function(a,b){var c=function(b){$.parsecss(b,a)};this.findandfilter("style").each(function(){c(this.innerHTML)}).end().findandfilter('link[type="text/css"],link[rel="stylesheet"]').each(function(){!this.disabled&&!/^\w+:/.test($(this).attr("href"))&&$.parsecss.mediumApplies(this.media)&&$.get(this.href,c)}).end(),b&&$.get(location.pathname+location.search,"text",function(b){styleAttributes(b,a)});return this},$.parsecss=function(a,b){var c={};a=munge(a).replace(/@(([^;`]|`[^b]|`b[^%])*(`b%)?);?/g,function(a,c){processAtRule($.trim(c),b);return""}),$.each(a.split("`b%"),function(a,b){b=b.split("%b`");b.length<2||(b[0]=restore(b[0]),c[b[0]]=$.extend(c[b[0]]||{},parsedeclarations(b[1])))}),b(c)},$.parsecss.mediumApplies=window.media&&window.media.query||function(a){if(!a)return!0;if(a in media)return media[a];var b=$('<style media="'+a+'">body {position: relative; z-index: 1;}</style>').appendTo("head");return media[a]=[$("body").css("z-index")==1,b.remove()][0]},$.parsecss.isValidSelector=function(a){var b=$("<style>"+a+"{}</style>").appendTo("head")[0];return[b.styleSheet?!/UNKNOWN/i.test(b.styleSheet.cssText):!!b.sheet.cssRules.length,$(b).remove()][0]},$.parsecss.parseArguments=function(str){if(!str)return[];var ret=[],mungedArguments=munge(str,!0).split(/\s+/);for(var i=0;i<mungedArguments.length;++i){var a=restore(mungedArguments[i]);try{ret.push(eval("("+a+")"))}catch(err){ret.push(a)}}return ret},$.parsecss.styleAttributes=styleAttributes;var media={},munged={},REbraces=/{[^{}]*}/,REfull=/\[[^\[\]]*\]|{[^{}]*}|\([^()]*\)|function(\s+\w+)?(\s*%b`\d+`b%){2}/,REatcomment=/\/\*@((?:[^\*]|\*[^\/])*)\*\//g,REcomment_string=/(?:\/\*(?:[^\*]|\*[^\/])*\*\/)|(\\.|"(?:[^\\\"]|\\.|\\\n)*"|'(?:[^\\\']|\\.|\\\n)*')/g,REmunged=/%\w`(\d+)`\w%/,uid=0,_show={show:$.fn.show,hide:$.fn.hide};$.each(["show","hide"],function(){var a=this,b=_show[a],c=a+"Default";$.fn[a]=function(){if(arguments.length>0)return b.apply(this,arguments);return this.each(function(){var a=$.data(this,c),d=$(this);a?($.removeData(this,c),a.call(d),d.queue(function(){d.data(c,a).dequeue()})):b.call(d)})},$.fn[c]=function(){var b=$.makeArray(arguments),d=b[0];if($.fn[d]){b.shift();var e=$.fn[d]}else $.effects&&$.effects[d]?(typeof b[1]!="object"&&b.splice(1,0,{}),e=_show[a]):e=_show[a];return this.data(c,function(){e.apply(this,b)})}});var RESGMLcomment=/<!--([^-]|-[^-])*-->/g,REnotATag=/(>)[^<]*/g,REtag=/<(\w+)([^>]*)>/g})(),function(){function a(a,b,c,d){var e=a.text().split(b),f="";e.length&&($(e).each(function(a,b){f+='<span class="'+c+(a+1)+'">'+b+"</span>"+d}),a.empty().append(f))}var b={init:function(){return this.each(function(){a($(this),"","char","")})},words:function(){return this.each(function(){a($(this)," ","word"," ")})},lines:function(){return this.each(function(){var b="eefec303079ad17405c889e092e105b0";a($(this).children("br").replaceWith(b).end(),b,"line","")})}};$.fn.lettering=function(a){if(a&&b[a])return b[a].apply(this,[].slice.call(arguments,1));if(a==="letters"||!a)return b.init.apply(this,[].slice.call(arguments,0));$.error("Method "+a+" does not exist on jQuery.lettering");return this}}();var unstack=function(){var a={init:function(a){var b=$(a).css("font-family").match(/[^'",;\s][^'",;]*/g)||[];return this.analyzeStack(b,a)},analyzeStack:function(b,c){var d=["monospace","sans-serif","serif","cursive","fantasy"],e=d[0],f=b.length,g=b[f-1];$.inArray(g,d)&&(b.push(e),f++),g==e&&(e=d[1]);for(var h=0;h<f-1;h++){font=b[h];if(a.testFont(font,e))return font}},testFont:function(a,b){var c=$('<span id="font_tester" style="font-family:'+b+'; font-size:144px;position:absolute;left:-10000px;top:-10000px;visibility:hidden;">mmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmmml</span>');$("body").prepend(c);var d=c.width();c.css("font-family",a+","+b);var e=c.width();c.remove();return e!=d}};return function(b){return a.init(b)}}();window.Kerning=new function(){var a=this,b=navigator.platform,c=["webkitTransform"in document.documentElement.style&&"webkit",$.browser.msie&&"ms","MozTransform"in document.documentElement.style&&"moz",window.opera&&"o"].reduce(function(a,b){return a+(b||"")}),d=[b.match(/Mac/)&&"mac",b.match(/Win/)&&"win",b.match(/Linux/)&&"linux"].reduce(function(a,b){return a+(b||"")}),e={_pairs:function(a,b,c){var d=c.match(/^-(letter|word)-pairs\(([\s\S]+)\)$/i);if(!d||d[1]!==a)return!1;var e=a==="word"?b.children("span"):b.find("span > span"),f=c.match(/translate|rotate|skew|perspective/i),g=$.trim(d[2].replace(/,\s+?'/g,",'").replace(/:\s+?(\d)/g,":$1")).split(f?"),":","),h,i,j,k=[];if(!!g){$.each(g,function(b,c){h=c.split(":"),h[0]=h[0].replace(/^['"](.+)['"]$/g,"$1"),a==="word"?i=h[0].split(" "):i=h[0],j=function(b){var c=$(this).text().match(new RegExp(i[0])),d,e;i[1]!==" "?e=($(this).next().html()||"").match(new RegExp(i[1])):(d=a=="word"?$(this).next('[class^="word"]'):$(this).parent().next('[class^="word"]'),e=!$(this).next().length&&d.length);return c&&e},k.push([h[1],e.filter(j)])});return k}},_repeats:function(a,b,c){var d=c.match(/^-(letter|word)-repeats\(([\s\S]+)\)$/i);if(!d||d[1]!==a)return!1;var e=a==="word"?b.children("span"):b.find("span > span"),f=c.match(/translate|rotate|skew|perspective/i),g=$.trim(d[2].replace(/,\s+?'/g,",'").replace(/:\s+?(\d)/g,":$1")).split(f?"),":","),h,i,j,k=[];if(!!g){$.each(g,function(a,b){h=b.split(":"),f&&h[1].substring(h[1].length-1)!==")"&&(h[1]+=")"),k.push([$.trim(h[1]),e.filter(":nth-child("+$.trim(h[0])+")")])});return k}},_conditional:function(a,b,c){var d=c.match(/^(?:-(letter|word)-)?if-font\(([\s\S]+)\)$/i);if(!!d){var e=a==="all"?b:a==="word"?b.children("span"):b.find("span > span"),f=c.match(/translate|rotate|skew|perspective/i),g=d[2].replace(/\n/g,"").match(/['"][^'"]+['"]:\s*.+?(\)|(?=\w),\s['"]|$)/g),h,i={},j=[];if(!g)return;b.each(function(a,b){var c=unstack(b).replace(/^['"](.+)['"]$/g,"$1");i[c]?i[c].push(b):i[c]=[b]}),$.each(g,function(a,b){h=b.match(/['"]([^'"]+)['"]:\s*(.+)$/);if(!h)return!0;h=h.splice(1),h[0]in i&&j.push([$.trim(h[1]),$(i[h[0]])])});return j}},_applyAttribute:function(a,b,c,d){var f=e._conditional(a,b,d);if(!f||!f.length)f=[[d,b]];$.each(f,function(b,d){var f=d[0],g=d[1],h=e._pairs(a,g,f)||e._repeats(a,g,f);if(h)$.each(h,function(a,b){if(typeof c!="string"){var d={};$.each(c,function(a,c){d[c]=b[0]}),b[1].css(d)}else b[1].css(c,b[0])});else{var i,j,k;(k=f.match(/-transform-group\(([\s\S]+?\([^)]+\))*?\)/g))?i=$.map(k,function(a,b){return a.replace(/-transform-group\(([\s\S]+)\)$/,"$1")}):i=f.replace(/[\n\s]+/g," ").split(" "),g.each(function(b,d){j=a==="all"?$(d):a==="word"?$(d).children("span"):$(d).find("span > span"),$.each(i,function(a,b){if(typeof c!="string"){var d={};$.each(c,function(a,c){d[c]=b}),j.eq(a).css(d)}else j.eq(a).css(c,b)})})}})},kern:function(a,b,c){e._applyAttribute(a,b,"margin-right",c)},size:function(a,b,c){e._applyAttribute(a,b,"font-size",c)},weight:function(a,b,c){e._applyAttribute(a,b,"font-weight",c)},color:function(a,b,c){e._applyAttribute(a,b,"color",c)},transform:function(a,b,c){var d=["-webkit-transform","-moz-transform","-ms-transform","-o-transform","transform"];e._applyAttribute(a,b,d,c)}};this._parse=function(b,f){a._parsedCSS||(a._parsedCSS=b);for(var g in b)for(var h in b[g]){var i,j,k=b[g][h];if(i=h.match(new RegExp("^(-"+c+"|-"+d+")?-(letter|word)-(kern|transform|size|color|weight)","i"))){var l=i[2].toLowerCase(),m=i[3].toLowerCase();j=$(g),f&&(j=j.not(".kerningjs")),j.not(".kerningjs").addClass("kerningjs").css("visibility","inherit").lettering("words").children("span").css("display","inline-block").lettering().children("span").css("display","inline-block"),e[m]&&e[m].call(this,l,j,k)}else if((i=h.match(/font-(size|weight)/i))&&k.match(/if-font/i)){var m=i[1].toLowerCase();j=$(g),f&&(j=j.not(".kerningjs")),j.not(".kerningjs").addClass("kerningjs").css("visibility","inherit"),e[m]&&e[m].call(this,"all",j,k)}}},this.live=function(){$(document).bind("DOMNodeInserted",function(b){b.target&&a.refresh(!0)})},this.refresh=function(b){a._parsedCSS&&a._parse(a._parsedCSS,b)},$(function(){$(document).parsecss(a._parse,!0)})}})(jQuery)
