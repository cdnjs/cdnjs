!function(e,n){"use strict";"function"==typeof define&&define.amd?define("stackframe",[],n):"object"==typeof exports?module.exports=n():e.StackFrame=n()}(this,function(){"use strict";function e(e){return!isNaN(parseFloat(e))&&isFinite(e)}function n(e,n,r,t,o,i){void 0!==e&&this.setFunctionName(e),void 0!==n&&this.setArgs(n),void 0!==r&&this.setFileName(r),void 0!==t&&this.setLineNumber(t),void 0!==o&&this.setColumnNumber(o),void 0!==i&&this.setSource(i)}return n.prototype={getFunctionName:function(){return this.functionName},setFunctionName:function(e){this.functionName=String(e)},getArgs:function(){return this.args},setArgs:function(e){if("[object Array]"!==Object.prototype.toString.call(e))throw new TypeError("Args must be an Array");this.args=e},getFileName:function(){return this.fileName},setFileName:function(e){this.fileName=String(e)},getLineNumber:function(){return this.lineNumber},setLineNumber:function(n){if(!e(n))throw new TypeError("Line Number must be a Number");this.lineNumber=Number(n)},getColumnNumber:function(){return this.columnNumber},setColumnNumber:function(n){if(!e(n))throw new TypeError("Column Number must be a Number");this.columnNumber=Number(n)},getSource:function(){return this.source},setSource:function(e){this.source=String(e)},toString:function(){var n=this.getFunctionName()||"{anonymous}",r="("+(this.getArgs()||[]).join(",")+")",t=this.getFileName()?"@"+this.getFileName():"",o=e(this.getLineNumber())?":"+this.getLineNumber():"",i=e(this.getColumnNumber())?":"+this.getColumnNumber():"";return n+r+t+o+i}},n});var SourceMap=function(e){function n(t){if(r[t])return r[t].exports;var o=r[t]={exports:{},id:t,loaded:!1};return e[t].call(o.exports,o,o.exports,n),o.loaded=!0,o.exports}var r={};return n.m=e,n.c=r,n.p="",n(0)}([function(e,n,r){function t(e){var n=e;return"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,""))),null!=n.sections?new s(n):new o(n)}function o(e){var n=e;"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,"")));var r=a.getArg(n,"version"),t=a.getArg(n,"sources"),o=a.getArg(n,"names",[]),i=a.getArg(n,"sourceRoot",null),s=a.getArg(n,"sourcesContent",null),u=a.getArg(n,"mappings"),c=a.getArg(n,"file",null);if(r!=this._version)throw new Error("Unsupported version: "+r);t=t.map(String).map(a.normalize).map(function(e){return i&&a.isAbsolute(i)&&a.isAbsolute(e)?a.relative(i,e):e}),this._names=l.fromArray(o.map(String),!0),this._sources=l.fromArray(t,!0),this.sourceRoot=i,this.sourcesContent=s,this._mappings=u,this.file=c}function i(){this.generatedLine=0,this.generatedColumn=0,this.source=null,this.originalLine=null,this.originalColumn=null,this.name=null}function s(e){var n=e;"string"==typeof e&&(n=JSON.parse(e.replace(/^\)\]\}'/,"")));var r=a.getArg(n,"version"),o=a.getArg(n,"sections");if(r!=this._version)throw new Error("Unsupported version: "+r);this._sources=new l,this._names=new l;var i={line:-1,column:0};this._sections=o.map(function(e){if(e.url)throw new Error("Support for url field in sections not implemented.");var n=a.getArg(e,"offset"),r=a.getArg(n,"line"),o=a.getArg(n,"column");if(r<i.line||r===i.line&&o<i.column)throw new Error("Section offsets must be ordered and non-overlapping.");return i=n,{generatedOffset:{generatedLine:r+1,generatedColumn:o+1},consumer:new t(a.getArg(e,"map"))}})}var a=r(1),u=r(2),l=r(3).ArraySet,c=r(4),g=r(6).quickSort;t.fromSourceMap=function(e){return o.fromSourceMap(e)},t.prototype._version=3,t.prototype.__generatedMappings=null,Object.defineProperty(t.prototype,"_generatedMappings",{get:function(){return this.__generatedMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__generatedMappings}}),t.prototype.__originalMappings=null,Object.defineProperty(t.prototype,"_originalMappings",{get:function(){return this.__originalMappings||this._parseMappings(this._mappings,this.sourceRoot),this.__originalMappings}}),t.prototype._charIsMappingSeparator=function(e,n){var r=e.charAt(n);return";"===r||","===r},t.prototype._parseMappings=function(e,n){throw new Error("Subclasses must implement _parseMappings")},t.GENERATED_ORDER=1,t.ORIGINAL_ORDER=2,t.GREATEST_LOWER_BOUND=1,t.LEAST_UPPER_BOUND=2,t.prototype.eachMapping=function(e,n,r){var o,i=n||null,s=r||t.GENERATED_ORDER;switch(s){case t.GENERATED_ORDER:o=this._generatedMappings;break;case t.ORIGINAL_ORDER:o=this._originalMappings;break;default:throw new Error("Unknown order of iteration.")}var u=this.sourceRoot;o.map(function(e){var n=null===e.source?null:this._sources.at(e.source);return null!=n&&null!=u&&(n=a.join(u,n)),{source:n,generatedLine:e.generatedLine,generatedColumn:e.generatedColumn,originalLine:e.originalLine,originalColumn:e.originalColumn,name:null===e.name?null:this._names.at(e.name)}},this).forEach(e,i)},t.prototype.allGeneratedPositionsFor=function(e){var n=a.getArg(e,"line"),r={source:a.getArg(e,"source"),originalLine:n,originalColumn:a.getArg(e,"column",0)};if(null!=this.sourceRoot&&(r.source=a.relative(this.sourceRoot,r.source)),!this._sources.has(r.source))return[];r.source=this._sources.indexOf(r.source);var t=[],o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",a.compareByOriginalPositions,u.LEAST_UPPER_BOUND);if(o>=0){var i=this._originalMappings[o];if(void 0===e.column)for(var s=i.originalLine;i&&i.originalLine===s;)t.push({line:a.getArg(i,"generatedLine",null),column:a.getArg(i,"generatedColumn",null),lastColumn:a.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o];else for(var l=i.originalColumn;i&&i.originalLine===n&&i.originalColumn==l;)t.push({line:a.getArg(i,"generatedLine",null),column:a.getArg(i,"generatedColumn",null),lastColumn:a.getArg(i,"lastGeneratedColumn",null)}),i=this._originalMappings[++o]}return t},n.SourceMapConsumer=t,o.prototype=Object.create(t.prototype),o.prototype.consumer=t,o.fromSourceMap=function(e){var n=Object.create(o.prototype),r=n._names=l.fromArray(e._names.toArray(),!0),t=n._sources=l.fromArray(e._sources.toArray(),!0);n.sourceRoot=e._sourceRoot,n.sourcesContent=e._generateSourcesContent(n._sources.toArray(),n.sourceRoot),n.file=e._file;for(var s=e._mappings.toArray().slice(),u=n.__generatedMappings=[],c=n.__originalMappings=[],p=0,f=s.length;f>p;p++){var h=s[p],m=new i;m.generatedLine=h.generatedLine,m.generatedColumn=h.generatedColumn,h.source&&(m.source=t.indexOf(h.source),m.originalLine=h.originalLine,m.originalColumn=h.originalColumn,h.name&&(m.name=r.indexOf(h.name)),c.push(m)),u.push(m)}return g(n.__originalMappings,a.compareByOriginalPositions),n},o.prototype._version=3,Object.defineProperty(o.prototype,"sources",{get:function(){return this._sources.toArray().map(function(e){return null!=this.sourceRoot?a.join(this.sourceRoot,e):e},this)}}),o.prototype._parseMappings=function(e,n){for(var r,t,o,s,u,l=1,p=0,f=0,h=0,m=0,d=0,_=e.length,v=0,y={},C={},b=[],A=[];_>v;)if(";"===e.charAt(v))l++,v++,p=0;else if(","===e.charAt(v))v++;else{for(r=new i,r.generatedLine=l,s=v;_>s&&!this._charIsMappingSeparator(e,s);s++);if(t=e.slice(v,s),o=y[t])v+=t.length;else{for(o=[];s>v;)c.decode(e,v,C),u=C.value,v=C.rest,o.push(u);if(2===o.length)throw new Error("Found a source, but no line and column");if(3===o.length)throw new Error("Found a source and line, but no column");y[t]=o}r.generatedColumn=p+o[0],p=r.generatedColumn,o.length>1&&(r.source=m+o[1],m+=o[1],r.originalLine=f+o[2],f=r.originalLine,r.originalLine+=1,r.originalColumn=h+o[3],h=r.originalColumn,o.length>4&&(r.name=d+o[4],d+=o[4])),A.push(r),"number"==typeof r.originalLine&&b.push(r)}g(A,a.compareByGeneratedPositionsDeflated),this.__generatedMappings=A,g(b,a.compareByOriginalPositions),this.__originalMappings=b},o.prototype._findMapping=function(e,n,r,t,o,i){if(e[r]<=0)throw new TypeError("Line must be greater than or equal to 1, got "+e[r]);if(e[t]<0)throw new TypeError("Column must be greater than or equal to 0, got "+e[t]);return u.search(e,n,o,i)},o.prototype.computeColumnSpans=function(){for(var e=0;e<this._generatedMappings.length;++e){var n=this._generatedMappings[e];if(e+1<this._generatedMappings.length){var r=this._generatedMappings[e+1];if(n.generatedLine===r.generatedLine){n.lastGeneratedColumn=r.generatedColumn-1;continue}}n.lastGeneratedColumn=1/0}},o.prototype.originalPositionFor=function(e){var n={generatedLine:a.getArg(e,"line"),generatedColumn:a.getArg(e,"column")},r=this._findMapping(n,this._generatedMappings,"generatedLine","generatedColumn",a.compareByGeneratedPositionsDeflated,a.getArg(e,"bias",t.GREATEST_LOWER_BOUND));if(r>=0){var o=this._generatedMappings[r];if(o.generatedLine===n.generatedLine){var i=a.getArg(o,"source",null);null!==i&&(i=this._sources.at(i),null!=this.sourceRoot&&(i=a.join(this.sourceRoot,i)));var s=a.getArg(o,"name",null);return null!==s&&(s=this._names.at(s)),{source:i,line:a.getArg(o,"originalLine",null),column:a.getArg(o,"originalColumn",null),name:s}}}return{source:null,line:null,column:null,name:null}},o.prototype.hasContentsOfAllSources=function(){return this.sourcesContent?this.sourcesContent.length>=this._sources.size()&&!this.sourcesContent.some(function(e){return null==e}):!1},o.prototype.sourceContentFor=function(e,n){if(!this.sourcesContent)return null;if(null!=this.sourceRoot&&(e=a.relative(this.sourceRoot,e)),this._sources.has(e))return this.sourcesContent[this._sources.indexOf(e)];var r;if(null!=this.sourceRoot&&(r=a.urlParse(this.sourceRoot))){var t=e.replace(/^file:\/\//,"");if("file"==r.scheme&&this._sources.has(t))return this.sourcesContent[this._sources.indexOf(t)];if((!r.path||"/"==r.path)&&this._sources.has("/"+e))return this.sourcesContent[this._sources.indexOf("/"+e)]}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},o.prototype.generatedPositionFor=function(e){var n=a.getArg(e,"source");if(null!=this.sourceRoot&&(n=a.relative(this.sourceRoot,n)),!this._sources.has(n))return{line:null,column:null,lastColumn:null};n=this._sources.indexOf(n);var r={source:n,originalLine:a.getArg(e,"line"),originalColumn:a.getArg(e,"column")},o=this._findMapping(r,this._originalMappings,"originalLine","originalColumn",a.compareByOriginalPositions,a.getArg(e,"bias",t.GREATEST_LOWER_BOUND));if(o>=0){var i=this._originalMappings[o];if(i.source===r.source)return{line:a.getArg(i,"generatedLine",null),column:a.getArg(i,"generatedColumn",null),lastColumn:a.getArg(i,"lastGeneratedColumn",null)}}return{line:null,column:null,lastColumn:null}},n.BasicSourceMapConsumer=o,s.prototype=Object.create(t.prototype),s.prototype.constructor=t,s.prototype._version=3,Object.defineProperty(s.prototype,"sources",{get:function(){for(var e=[],n=0;n<this._sections.length;n++)for(var r=0;r<this._sections[n].consumer.sources.length;r++)e.push(this._sections[n].consumer.sources[r]);return e}}),s.prototype.originalPositionFor=function(e){var n={generatedLine:a.getArg(e,"line"),generatedColumn:a.getArg(e,"column")},r=u.search(n,this._sections,function(e,n){var r=e.generatedLine-n.generatedOffset.generatedLine;return r?r:e.generatedColumn-n.generatedOffset.generatedColumn}),t=this._sections[r];return t?t.consumer.originalPositionFor({line:n.generatedLine-(t.generatedOffset.generatedLine-1),column:n.generatedColumn-(t.generatedOffset.generatedLine===n.generatedLine?t.generatedOffset.generatedColumn-1:0),bias:e.bias}):{source:null,line:null,column:null,name:null}},s.prototype.hasContentsOfAllSources=function(){return this._sections.every(function(e){return e.consumer.hasContentsOfAllSources()})},s.prototype.sourceContentFor=function(e,n){for(var r=0;r<this._sections.length;r++){var t=this._sections[r],o=t.consumer.sourceContentFor(e,!0);if(o)return o}if(n)return null;throw new Error('"'+e+'" is not in the SourceMap.')},s.prototype.generatedPositionFor=function(e){for(var n=0;n<this._sections.length;n++){var r=this._sections[n];if(-1!==r.consumer.sources.indexOf(a.getArg(e,"source"))){var t=r.consumer.generatedPositionFor(e);if(t){var o={line:t.line+(r.generatedOffset.generatedLine-1),column:t.column+(r.generatedOffset.generatedLine===t.line?r.generatedOffset.generatedColumn-1:0)};return o}}}return{line:null,column:null}},s.prototype._parseMappings=function(e,n){this.__generatedMappings=[],this.__originalMappings=[];for(var r=0;r<this._sections.length;r++)for(var t=this._sections[r],o=t.consumer._generatedMappings,i=0;i<o.length;i++){var s=o[i],u=t.consumer._sources.at(s.source);null!==t.consumer.sourceRoot&&(u=a.join(t.consumer.sourceRoot,u)),this._sources.add(u),u=this._sources.indexOf(u);var l=t.consumer._names.at(s.name);this._names.add(l),l=this._names.indexOf(l);var c={source:u,generatedLine:s.generatedLine+(t.generatedOffset.generatedLine-1),generatedColumn:s.generatedColumn+(t.generatedOffset.generatedLine===s.generatedLine?t.generatedOffset.generatedColumn-1:0),originalLine:s.originalLine,originalColumn:s.originalColumn,name:l};this.__generatedMappings.push(c),"number"==typeof c.originalLine&&this.__originalMappings.push(c)}g(this.__generatedMappings,a.compareByGeneratedPositionsDeflated),g(this.__originalMappings,a.compareByOriginalPositions)},n.IndexedSourceMapConsumer=s},function(e,n){function r(e,n,r){if(n in e)return e[n];if(3===arguments.length)return r;throw new Error('"'+n+'" is a required argument.')}function t(e){var n=e.match(d);return n?{scheme:n[1],auth:n[2],host:n[3],port:n[4],path:n[5]}:null}function o(e){var n="";return e.scheme&&(n+=e.scheme+":"),n+="//",e.auth&&(n+=e.auth+"@"),e.host&&(n+=e.host),e.port&&(n+=":"+e.port),e.path&&(n+=e.path),n}function i(e){var r=e,i=t(e);if(i){if(!i.path)return e;r=i.path}for(var s,a=n.isAbsolute(r),u=r.split(/\/+/),l=0,c=u.length-1;c>=0;c--)s=u[c],"."===s?u.splice(c,1):".."===s?l++:l>0&&(""===s?(u.splice(c+1,l),l=0):(u.splice(c,2),l--));return r=u.join("/"),""===r&&(r=a?"/":"."),i?(i.path=r,o(i)):r}function s(e,n){""===e&&(e="."),""===n&&(n=".");var r=t(n),s=t(e);if(s&&(e=s.path||"/"),r&&!r.scheme)return s&&(r.scheme=s.scheme),o(r);if(r||n.match(_))return n;if(s&&!s.host&&!s.path)return s.host=n,o(s);var a="/"===n.charAt(0)?n:i(e.replace(/\/+$/,"")+"/"+n);return s?(s.path=a,o(s)):a}function a(e,n){""===e&&(e="."),e=e.replace(/\/$/,"");for(var r=0;0!==n.indexOf(e+"/");){var t=e.lastIndexOf("/");if(0>t)return n;if(e=e.slice(0,t),e.match(/^([^\/]+:\/)?\/*$/))return n;++r}return Array(r+1).join("../")+n.substr(e.length+1)}function u(e){return e}function l(e){return g(e)?"$"+e:e}function c(e){return g(e)?e.slice(1):e}function g(e){if(!e)return!1;var n=e.length;if(9>n)return!1;if(95!==e.charCodeAt(n-1)||95!==e.charCodeAt(n-2)||111!==e.charCodeAt(n-3)||116!==e.charCodeAt(n-4)||111!==e.charCodeAt(n-5)||114!==e.charCodeAt(n-6)||112!==e.charCodeAt(n-7)||95!==e.charCodeAt(n-8)||95!==e.charCodeAt(n-9))return!1;for(var r=n-10;r>=0;r--)if(36!==e.charCodeAt(r))return!1;return!0}function p(e,n,r){var t=e.source-n.source;return 0!==t?t:(t=e.originalLine-n.originalLine,0!==t?t:(t=e.originalColumn-n.originalColumn,0!==t||r?t:(t=e.generatedColumn-n.generatedColumn,0!==t?t:(t=e.generatedLine-n.generatedLine,0!==t?t:e.name-n.name))))}function f(e,n,r){var t=e.generatedLine-n.generatedLine;return 0!==t?t:(t=e.generatedColumn-n.generatedColumn,0!==t||r?t:(t=e.source-n.source,0!==t?t:(t=e.originalLine-n.originalLine,0!==t?t:(t=e.originalColumn-n.originalColumn,0!==t?t:e.name-n.name))))}function h(e,n){return e===n?0:e>n?1:-1}function m(e,n){var r=e.generatedLine-n.generatedLine;return 0!==r?r:(r=e.generatedColumn-n.generatedColumn,0!==r?r:(r=h(e.source,n.source),0!==r?r:(r=e.originalLine-n.originalLine,0!==r?r:(r=e.originalColumn-n.originalColumn,0!==r?r:h(e.name,n.name)))))}n.getArg=r;var d=/^(?:([\w+\-.]+):)?\/\/(?:(\w+:\w+)@)?([\w.]*)(?::(\d+))?(\S*)$/,_=/^data:.+\,.+$/;n.urlParse=t,n.urlGenerate=o,n.normalize=i,n.join=s,n.isAbsolute=function(e){return"/"===e.charAt(0)||!!e.match(d)},n.relative=a;var v=function(){var e=Object.create(null);return!("__proto__"in e)}();n.toSetString=v?u:l,n.fromSetString=v?u:c,n.compareByOriginalPositions=p,n.compareByGeneratedPositionsDeflated=f,n.compareByGeneratedPositionsInflated=m},function(e,n){function r(e,t,o,i,s,a){var u=Math.floor((t-e)/2)+e,l=s(o,i[u],!0);return 0===l?u:l>0?t-u>1?r(u,t,o,i,s,a):a==n.LEAST_UPPER_BOUND?t<i.length?t:-1:u:u-e>1?r(e,u,o,i,s,a):a==n.LEAST_UPPER_BOUND?u:0>e?-1:e}n.GREATEST_LOWER_BOUND=1,n.LEAST_UPPER_BOUND=2,n.search=function(e,t,o,i){if(0===t.length)return-1;var s=r(-1,t.length,e,t,o,i||n.GREATEST_LOWER_BOUND);if(0>s)return-1;for(;s-1>=0&&0===o(t[s],t[s-1],!0);)--s;return s}},function(e,n,r){function t(){this._array=[],this._set=Object.create(null)}var o=r(1),i=Object.prototype.hasOwnProperty;t.fromArray=function(e,n){for(var r=new t,o=0,i=e.length;i>o;o++)r.add(e[o],n);return r},t.prototype.size=function(){return Object.getOwnPropertyNames(this._set).length},t.prototype.add=function(e,n){var r=o.toSetString(e),t=i.call(this._set,r),s=this._array.length;(!t||n)&&this._array.push(e),t||(this._set[r]=s)},t.prototype.has=function(e){var n=o.toSetString(e);return i.call(this._set,n)},t.prototype.indexOf=function(e){var n=o.toSetString(e);if(i.call(this._set,n))return this._set[n];throw new Error('"'+e+'" is not in the set.')},t.prototype.at=function(e){if(e>=0&&e<this._array.length)return this._array[e];throw new Error("No element indexed by "+e)},t.prototype.toArray=function(){return this._array.slice()},n.ArraySet=t},function(e,n,r){function t(e){return 0>e?(-e<<1)+1:(e<<1)+0}function o(e){var n=1===(1&e),r=e>>1;return n?-r:r}var i=r(5),s=5,a=1<<s,u=a-1,l=a;n.encode=function(e){var n,r="",o=t(e);do n=o&u,o>>>=s,o>0&&(n|=l),r+=i.encode(n);while(o>0);return r},n.decode=function(e,n,r){var t,a,c=e.length,g=0,p=0;do{if(n>=c)throw new Error("Expected more digits in base 64 VLQ value.");if(a=i.decode(e.charCodeAt(n++)),-1===a)throw new Error("Invalid base64 digit: "+e.charAt(n-1));t=!!(a&l),a&=u,g+=a<<p,p+=s}while(t);r.value=o(g),r.rest=n}},function(e,n){var r="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/".split("");n.encode=function(e){if(e>=0&&e<r.length)return r[e];throw new TypeError("Must be between 0 and 63: "+e)},n.decode=function(e){var n=65,r=90,t=97,o=122,i=48,s=57,a=43,u=47,l=26,c=52;return e>=n&&r>=e?e-n:e>=t&&o>=e?e-t+l:e>=i&&s>=e?e-i+c:e==a?62:e==u?63:-1}},function(e,n){function r(e,n,r){var t=e[n];e[n]=e[r],e[r]=t}function t(e,n){return Math.round(e+Math.random()*(n-e))}function o(e,n,i,s){if(s>i){var a=t(i,s),u=i-1;r(e,a,s);for(var l=e[s],c=i;s>c;c++)n(e[c],l)<=0&&(u+=1,r(e,u,c));r(e,u+1,c);var g=u+1;o(e,n,i,g-1),o(e,n,g+1,s)}}n.quickSort=function(e,n){o(e,n,0,e.length-1)}}]);!function(e,n){"use strict";"function"==typeof define&&define.amd?define("stacktrace-gps",["source-map","stackframe"],n):"object"==typeof exports?module.exports=n(require("source-map/lib/source-map-consumer"),require("stackframe")):e.StackTraceGPS=n(e.SourceMap||e.sourceMap,e.StackFrame)}(this,function(e,n){"use strict";function r(e){return new Promise(function(n,r){var t=new XMLHttpRequest;t.open("get",e),t.onerror=r,t.onreadystatechange=function(){4===t.readyState&&(t.status>=200&&t.status<300?n(t.responseText):r(new Error("HTTP status: "+t.status+" retrieving "+e)))},t.send()})}function t(e){if("undefined"!=typeof window&&window.atob)return window.atob(e);throw new Error("You must supply a polyfill for window.atob in this environment")}function o(e){if("undefined"!=typeof JSON&&JSON.parse)return JSON.parse(e);throw new Error("You must supply a polyfill for JSON.parse in this environment")}function i(e,n){for(var r,t=/function\s+([^(]*?)\s*\(([^)]*)\)/,o=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/,i=/['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/,s=e.split("\n"),a="",u=Math.min(n,20),l=0;u>l;++l){var c=s[n-l-1],g=c.indexOf("//");if(g>=0&&(c=c.substr(0,g)),c){if(a=c+a,r=o.exec(a),r&&r[1])return r[1];if(r=t.exec(a),r&&r[1])return r[1];if(r=i.exec(a),r&&r[1])return r[1]}}}function s(){if("function"!=typeof Object.defineProperty||"function"!=typeof Object.create)throw new Error("Unable to consume source maps in older browsers")}function a(e){if("object"!=typeof e)throw new TypeError("Given StackFrame is not an object");if("string"!=typeof e.fileName)throw new TypeError("Given file name is not a String");if("number"!=typeof e.lineNumber||e.lineNumber%1!==0||e.lineNumber<1)throw new TypeError("Given line number must be a positive integer");if("number"!=typeof e.columnNumber||e.columnNumber%1!==0||e.columnNumber<0)throw new TypeError("Given column number must be a non-negative integer");return!0}function u(e){var n=/\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/.exec(e);if(n&&n[1])return n[1];throw new Error("sourceMappingURL not found")}function l(r,t,o,i,s){var a=new e.SourceMapConsumer(r),u=a.originalPositionFor({line:o,column:i}),l=a.sourceContentFor(u.source);return l&&(s[u.source]=l),new n(u.name,t,u.source,u.line,u.column)}return function c(e){return this instanceof c?(e=e||{},this.sourceCache=e.sourceCache||{},this.ajax=e.ajax||r,this._atob=e.atob||t,this._get=function(n){return new Promise(function(r,t){var o="data:"===n.substr(0,5);if(this.sourceCache[n])r(this.sourceCache[n]);else if(e.offline&&!o)t(new Error("Cannot make network requests in offline mode"));else if(o){var i=/^data:application\/json;([\w=:"-]+;)*base64,/,s=n.match(i);if(s){var a=s[0].length,u=n.substr(a),l=this._atob(u);this.sourceCache[n]=l,r(l)}else t(new Error("The encoding of the inline sourcemap is not supported"))}else{var c=this.ajax(n,{method:"get"});this.sourceCache[n]=c,c.then(r,t)}}.bind(this))},this.pinpoint=function(e){return new Promise(function(n,r){this.getMappedLocation(e).then(function(e){function r(){n(e)}this.findFunctionName(e).then(n,r)["catch"](r)}.bind(this),r)}.bind(this))},this.findFunctionName=function(e){return new Promise(function(r,t){a(e),this._get(e.fileName).then(function(t){var o=i(t,e.lineNumber,e.columnNumber);r(new n(o,e.args,e.fileName,e.lineNumber,e.columnNumber))},t)["catch"](t)}.bind(this))},void(this.getMappedLocation=function(e){return new Promise(function(n,r){s(),a(e);var t=this.sourceCache,i=e.fileName;this._get(i).then(function(s){var a=u(s),c="data:"===a.substr(0,5),g=i.substring(0,i.lastIndexOf("/")+1);"/"===a[0]||c||/^https?:\/\/|^\/\//i.test(a)||(a=g+a),this._get(a).then(function(r){var i=e.lineNumber,s=e.columnNumber;"string"==typeof r&&(r=o(r.replace(/^\)\]\}'/,""))),"undefined"==typeof r.sourceRoot&&(r.sourceRoot=g),n(l(r,e.args,i,s,t))},r)["catch"](r)}.bind(this),r)["catch"](r)}.bind(this))})):new c(e)}});
//# sourceMappingURL=stacktrace-gps.min.js.map

(function (root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define('stack-generator', ['stackframe'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('stackframe'));
    } else {
        root.StackGenerator = factory(root.StackFrame);
    }
}(this, function (StackFrame) {
    return {
        backtrace: function StackGenerator$$backtrace(opts) {
            var stack = [];
            var maxStackSize = 10;

            if (typeof opts === 'object' && typeof opts.maxStackSize === 'number') {
                maxStackSize = opts.maxStackSize;
            }

            var curr = arguments.callee;
            while (curr && stack.length < maxStackSize) {
                // Allow V8 optimizations
                var args = new Array(curr['arguments'].length);
                for(var i = 0; i < args.length; ++i) {
                    args[i] = curr['arguments'][i];
                }
                if (/function(?:\s+([\w$]+))+\s*\(/.test(curr.toString())) {
                    stack.push(new StackFrame(RegExp.$1 || undefined, args));
                } else {
                    stack.push(new StackFrame(undefined, args));
                }

                try {
                    curr = curr.caller;
                } catch (e) {
                    break;
                }
            }
            return stack;
        }
    };
}));

(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define('error-stack-parser', ['stackframe'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('stackframe'));
    } else {
        root.ErrorStackParser = factory(root.StackFrame);
    }
}(this, function ErrorStackParser(StackFrame) {
    'use strict';

    var FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+\:\d+/;
    var CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+\:\d+|\(native\))/m;
    var SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code\])?$/;

    function _map(array, fn, thisArg) {
        if (typeof Array.prototype.map === 'function') {
            return array.map(fn, thisArg);
        } else {
            var output = new Array(array.length);
            for (var i = 0; i < array.length; i++) {
                output[i] = fn.call(thisArg, array[i]);
            }
            return output;
        }
    }

    function _filter(array, fn, thisArg) {
        if (typeof Array.prototype.filter === 'function') {
            return array.filter(fn, thisArg);
        } else {
            var output = [];
            for (var i = 0; i < array.length; i++) {
                if (fn.call(thisArg, array[i])) {
                    output.push(array[i]);
                }
            }
            return output;
        }
    }

    function _indexOf(array, target) {
        if (typeof Array.prototype.indexOf === 'function') {
            return array.indexOf(target);
        } else {
            for (var i = 0; i < array.length; i++) {
                if (array[i] === target) {
                    return i;
                }
            }
            return -1;
        }
    }

    return {
        /**
         * Given an Error object, extract the most information from it.
         *
         * @param {Error} error object
         * @return {Array} of StackFrames
         */
        parse: function ErrorStackParser$$parse(error) {
            if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
                return this.parseOpera(error);
            } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
                return this.parseV8OrIE(error);
            } else if (error.stack) {
                return this.parseFFOrSafari(error);
            } else {
                throw new Error('Cannot parse given Error object');
            }
        },

        // Separate line and column numbers from a string of the form: (URI:Line:Column)
        extractLocation: function ErrorStackParser$$extractLocation(urlLike) {
            // Fail-fast but return locations like "(native)"
            if (urlLike.indexOf(':') === -1) {
                return [urlLike];
            }

            var regExp = /(.+?)(?:\:(\d+))?(?:\:(\d+))?$/;
            var parts = regExp.exec(urlLike.replace(/[\(\)]/g, ''));
            return [parts[1], parts[2] || undefined, parts[3] || undefined];
        },

        parseV8OrIE: function ErrorStackParser$$parseV8OrIE(error) {
            var filtered = _filter(error.stack.split('\n'), function(line) {
                return !!line.match(CHROME_IE_STACK_REGEXP);
            }, this);

            return _map(filtered, function(line) {
                if (line.indexOf('(eval ') > -1) {
                    // Throw away eval information until we implement stacktrace.js/stackframe#8
                    line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^\()]*)|(\)\,.*$)/g, '');
                }
                var tokens = line.replace(/^\s+/, '').replace(/\(eval code/g, '(').split(/\s+/).slice(1);
                var locationParts = this.extractLocation(tokens.pop());
                var functionName = tokens.join(' ') || undefined;
                var fileName = _indexOf(['eval', '<anonymous>'], locationParts[0]) > -1 ? undefined : locationParts[0];

                return new StackFrame(functionName, undefined, fileName, locationParts[1], locationParts[2], line);
            }, this);
        },

        parseFFOrSafari: function ErrorStackParser$$parseFFOrSafari(error) {
            var filtered = _filter(error.stack.split('\n'), function(line) {
                return !line.match(SAFARI_NATIVE_CODE_REGEXP);
            }, this);

            return _map(filtered, function(line) {
                // Throw away eval information until we implement stacktrace.js/stackframe#8
                if (line.indexOf(' > eval') > -1) {
                    line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval\:\d+\:\d+/g, ':$1');
                }

                if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                    // Safari eval frames only have function names and nothing else
                    return new StackFrame(line);
                } else {
                    var tokens = line.split('@');
                    var locationParts = this.extractLocation(tokens.pop());
                    var functionName = tokens.join('@') || undefined;
                    return new StackFrame(functionName,
                        undefined,
                        locationParts[0],
                        locationParts[1],
                        locationParts[2],
                        line);
                }
            }, this);
        },

        parseOpera: function ErrorStackParser$$parseOpera(e) {
            if (!e.stacktrace || (e.message.indexOf('\n') > -1 &&
                e.message.split('\n').length > e.stacktrace.split('\n').length)) {
                return this.parseOpera9(e);
            } else if (!e.stack) {
                return this.parseOpera10(e);
            } else {
                return this.parseOpera11(e);
            }
        },

        parseOpera9: function ErrorStackParser$$parseOpera9(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
            var lines = e.message.split('\n');
            var result = [];

            for (var i = 2, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(new StackFrame(undefined, undefined, match[2], match[1], undefined, lines[i]));
                }
            }

            return result;
        },

        parseOpera10: function ErrorStackParser$$parseOpera10(e) {
            var lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
            var lines = e.stacktrace.split('\n');
            var result = [];

            for (var i = 0, len = lines.length; i < len; i += 2) {
                var match = lineRE.exec(lines[i]);
                if (match) {
                    result.push(
                        new StackFrame(
                            match[3] || undefined,
                            undefined,
                            match[2],
                            match[1],
                            undefined,
                            lines[i]
                        )
                    );
                }
            }

            return result;
        },

        // Opera 10.65+ Error.stack very similar to FF/Safari
        parseOpera11: function ErrorStackParser$$parseOpera11(error) {
            var filtered = _filter(error.stack.split('\n'), function(line) {
                return !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/);
            }, this);

            return _map(filtered, function(line) {
                var tokens = line.split('@');
                var locationParts = this.extractLocation(tokens.pop());
                var functionCall = (tokens.shift() || '');
                var functionName = functionCall
                        .replace(/<anonymous function(: (\w+))?>/, '$2')
                        .replace(/\([^\)]*\)/g, '') || undefined;
                var argsRaw;
                if (functionCall.match(/\(([^\)]*)\)/)) {
                    argsRaw = functionCall.replace(/^[^\(]+\(([^\)]*)\)$/, '$1');
                }
                var args = (argsRaw === undefined || argsRaw === '[arguments not available]') ?
                    undefined : argsRaw.split(',');
                return new StackFrame(
                    functionName,
                    args,
                    locationParts[0],
                    locationParts[1],
                    locationParts[2],
                    line);
            }, this);
        }
    };
}));


(function(root, factory) {
    'use strict';
    // Universal Module Definition (UMD) to support AMD, CommonJS/Node.js, Rhino, and browsers.

    /* istanbul ignore next */
    if (typeof define === 'function' && define.amd) {
        define('stacktrace', ['error-stack-parser', 'stack-generator', 'stacktrace-gps'], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory(require('error-stack-parser'), require('stack-generator'), require('stacktrace-gps'));
    } else {
        root.StackTrace = factory(root.ErrorStackParser, root.StackGenerator, root.StackTraceGPS);
    }
}(this, function StackTrace(ErrorStackParser, StackGenerator, StackTraceGPS) {
    var _options = {
        filter: function(stackframe) {
            // Filter out stackframes for this library by default
            return (stackframe.functionName || '').indexOf('StackTrace$$') === -1 &&
                (stackframe.functionName || '').indexOf('ErrorStackParser$$') === -1 &&
                (stackframe.functionName || '').indexOf('StackTraceGPS$$') === -1 &&
                (stackframe.functionName || '').indexOf('StackGenerator$$') === -1;
        },
        sourceCache: {}
    };

    var _generateError = function StackTrace$$GenerateError() {
        try {
            // Error must be thrown to get stack in IE
            throw new Error();
        } catch (err) {
            return err;
        }
    };

    /**
     * Merge 2 given Objects. If a conflict occurs the second object wins.
     * Does not do deep merges.
     *
     * @param {Object} first base object
     * @param {Object} second overrides
     * @returns {Object} merged first and second
     * @private
     */
    function _merge(first, second) {
        var target = {};

        [first, second].forEach(function(obj) {
            for (var prop in obj) {
                if (obj.hasOwnProperty(prop)) {
                    target[prop] = obj[prop];
                }
            }
            return target;
        });

        return target;
    }

    function _isShapedLikeParsableError(err) {
        return err.stack || err['opera#sourceloc'];
    }

    function _filtered(stackframes, filter) {
        if (typeof filter === 'function') {
            return stackframes.filter(filter);
        }
        return stackframes;
    }

    return {
        /**
         * Get a backtrace from invocation point.
         *
         * @param {Object} opts
         * @returns {Array} of StackFrame
         */
        get: function StackTrace$$get(opts) {
            var err = _generateError();
            return _isShapedLikeParsableError(err) ? this.fromError(err, opts) : this.generateArtificially(opts);
        },

        /**
         * Get a backtrace from invocation point.
         * IMPORTANT: Does not handle source maps or guess function names!
         *
         * @param {Object} opts
         * @returns {Array} of StackFrame
         */
        getSync: function StackTrace$$getSync(opts) {
            opts = _merge(_options, opts);
            var err = _generateError();
            var stack = _isShapedLikeParsableError(err) ? ErrorStackParser.parse(err) : StackGenerator.backtrace(opts);
            return _filtered(stack, opts.filter);
        },

        /**
         * Given an error object, parse it.
         *
         * @param {Error} error object
         * @param {Object} opts
         * @returns {Promise} for Array[StackFrame}
         */
        fromError: function StackTrace$$fromError(error, opts) {
            opts = _merge(_options, opts);
            var gps = new StackTraceGPS(opts);
            return new Promise(function(resolve) {
                var stackframes = _filtered(ErrorStackParser.parse(error), opts.filter);
                resolve(Promise.all(stackframes.map(function(sf) {
                    return new Promise(function(resolve) {
                        function resolveOriginal() {
                            resolve(sf);
                        }

                        gps.pinpoint(sf).then(resolve, resolveOriginal)['catch'](resolveOriginal);
                    });
                })));
            }.bind(this));
        },

        /**
         * Use StackGenerator to generate a backtrace.
         *
         * @param {Object} opts
         * @returns {Promise} of Array[StackFrame]
         */
        generateArtificially: function StackTrace$$generateArtificially(opts) {
            opts = _merge(_options, opts);
            var stackFrames = StackGenerator.backtrace(opts);
            if (typeof opts.filter === 'function') {
                stackFrames = stackFrames.filter(opts.filter);
            }
            return Promise.resolve(stackFrames);
        },

        /**
         * Given a function, wrap it such that invocations trigger a callback that
         * is called with a stack trace.
         *
         * @param {Function} fn to be instrumented
         * @param {Function} callback function to call with a stack trace on invocation
         * @param {Function} errback optional function to call with error if unable to get stack trace.
         * @param {Object} thisArg optional context object (e.g. window)
         */
        instrument: function StackTrace$$instrument(fn, callback, errback, thisArg) {
            if (typeof fn !== 'function') {
                throw new Error('Cannot instrument non-function object');
            } else if (typeof fn.__stacktraceOriginalFn === 'function') {
                // Already instrumented, return given Function
                return fn;
            }

            var instrumented = function StackTrace$$instrumented() {
                try {
                    this.get().then(callback, errback)['catch'](errback);
                    return fn.apply(thisArg || this, arguments);
                } catch (e) {
                    if (_isShapedLikeParsableError(e)) {
                        this.fromError(e).then(callback, errback)['catch'](errback);
                    }
                    throw e;
                }
            }.bind(this);
            instrumented.__stacktraceOriginalFn = fn;

            return instrumented;
        },

        /**
         * Given a function that has been instrumented,
         * revert the function to it's original (non-instrumented) state.
         *
         * @param {Function} fn to de-instrument
         */
        deinstrument: function StackTrace$$deinstrument(fn) {
            if (typeof fn !== 'function') {
                throw new Error('Cannot de-instrument non-function object');
            } else if (typeof fn.__stacktraceOriginalFn === 'function') {
                return fn.__stacktraceOriginalFn;
            } else {
                // Function not instrumented, return original
                return fn;
            }
        },

        /**
         * Given an error message and Array of StackFrames, serialize and POST to given URL.
         *
         * @param {Array} stackframes
         * @param {String} url
         * @param {String} errorMsg
         */
        report: function StackTrace$$report(stackframes, url, errorMsg) {
            return new Promise(function(resolve, reject) {
                var req = new XMLHttpRequest();
                req.onerror = reject;
                req.onreadystatechange = function onreadystatechange() {
                    if (req.readyState === 4) {
                        if (req.status >= 200 && req.status < 400) {
                            resolve(req.responseText);
                        } else {
                            reject(new Error('POST to ' + url + ' failed with status: ' + req.status));
                        }
                    }
                };
                req.open('post', url);
                req.setRequestHeader('Content-Type', 'application/json');

                var reportPayload = {stack: stackframes};
                if (errorMsg !== undefined) {
                    reportPayload.message = errorMsg;
                }

                req.send(JSON.stringify(reportPayload));
            });
        }
    };
}));
