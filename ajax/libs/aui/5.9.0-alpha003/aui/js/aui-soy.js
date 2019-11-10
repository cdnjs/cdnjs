// .tmp/compiled-soy/atlassian-deps.js
__ac032cd9bd44bd325a92b3f34059b73f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
      window.atl_soy = window.atl_soy || {};
  
      atl_soy.concat = function (a, b) {
          // handle arrays
          if (a.concat) {
              return a.concat(b);
          }
  
          //handle object
          var ret = {};
          for (var key in a) if (a.hasOwnProperty(key)) ret[key] = a[key];
          for (var key in b) if (b.hasOwnProperty(key)) ret[key] = b[key];
          return ret;
      };
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/soyutils.js
__86a08fd76fd83f1d85ad01739e598161 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function(){goog = window.goog = window.goog || {};var goog=goog || {};goog.DEBUG = false;goog.inherits = function(childCtor,parentCtor){function tempCtor(){};tempCtor.prototype = parentCtor.prototype;childCtor.superClass_ = parentCtor.prototype;childCtor.prototype = new tempCtor();childCtor.prototype.constructor = childCtor;childCtor.base = function(me,methodName,var_args){var args=Array.prototype.slice.call(arguments,2);return parentCtor.prototype[methodName].apply(me,args);};};if(!goog.userAgent){goog.userAgent = (function(){var userAgent="";if("undefined" !== typeof navigator && navigator && "string" == typeof navigator.userAgent){userAgent = navigator.userAgent;}var isOpera=userAgent.indexOf("Opera") == 0;return {jscript:{HAS_JSCRIPT:"ScriptEngine" in this},OPERA:isOpera,IE:!isOpera && userAgent.indexOf("MSIE") != -1,WEBKIT:!isOpera && userAgent.indexOf("WebKit") != -1};})();}if(!goog.asserts){goog.asserts = {assert:function assert(condition){if(!condition){throw Error("Assertion error");}},fail:function fail(var_args){}};}if(!goog.dom){goog.dom = {};goog.dom.DomHelper = function(d){this.document_ = d || document;};goog.dom.DomHelper.prototype.getDocument = function(){return this.document_;};goog.dom.DomHelper.prototype.createElement = function(name){return this.document_.createElement(name);};goog.dom.DomHelper.prototype.createDocumentFragment = function(){return this.document_.createDocumentFragment();};}if(!goog.format){goog.format = {insertWordBreaks:function insertWordBreaks(str,maxCharsBetweenWordBreaks){str = String(str);var resultArr=[];var resultArrLen=0;var isInTag=false;var isMaybeInEntity=false;var numCharsWithoutBreak=0;var flushIndex=0;for(var i=0,n=str.length;i < n;++i) {var charCode=str.charCodeAt(i);if(numCharsWithoutBreak >= maxCharsBetweenWordBreaks && charCode != 32){resultArr[resultArrLen++] = str.substring(flushIndex,i);flushIndex = i;resultArr[resultArrLen++] = goog.format.WORD_BREAK;numCharsWithoutBreak = 0;}if(isInTag){if(charCode == 62){isInTag = false;}}else if(isMaybeInEntity){switch(charCode){case 59:isMaybeInEntity = false;++numCharsWithoutBreak;break;case 60:isMaybeInEntity = false;isInTag = true;break;case 32:isMaybeInEntity = false;numCharsWithoutBreak = 0;break;}}else {switch(charCode){case 60:isInTag = true;break;case 38:isMaybeInEntity = true;break;case 32:numCharsWithoutBreak = 0;break;default:++numCharsWithoutBreak;break;}}}resultArr[resultArrLen++] = str.substring(flushIndex);return resultArr.join("");},WORD_BREAK:goog.userAgent.WEBKIT?"<wbr></wbr>":goog.userAgent.OPERA?"&shy;":goog.userAgent.IE?"&#8203;":"<wbr>"};}if(!goog.i18n){goog.i18n = {bidi:{}};}goog.i18n.bidi.IS_RTL = false;goog.i18n.bidi.Dir = {LTR:1,RTL:-1,NEUTRAL:0,UNKNOWN:0};goog.i18n.bidi.toDir = function(givenDir,opt_noNeutral){if(typeof givenDir == "number"){return givenDir > 0?goog.i18n.bidi.Dir.LTR:givenDir < 0?goog.i18n.bidi.Dir.RTL:opt_noNeutral?null:goog.i18n.bidi.Dir.NEUTRAL;}else if(givenDir == null){return null;}else {return givenDir?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.LTR;}};goog.i18n.bidi.estimateDirection = function(str,opt_isHtml){var rtlCount=0;var totalCount=0;var hasWeaklyLtr=false;var tokens=soyshim.$$bidiStripHtmlIfNecessary_(str,opt_isHtml).split(soyshim.$$bidiWordSeparatorRe_);for(var i=0;i < tokens.length;i++) {var token=tokens[i];if(soyshim.$$bidiRtlDirCheckRe_.test(token)){rtlCount++;totalCount++;}else if(soyshim.$$bidiIsRequiredLtrRe_.test(token)){hasWeaklyLtr = true;}else if(soyshim.$$bidiLtrCharRe_.test(token)){totalCount++;}else if(soyshim.$$bidiHasNumeralsRe_.test(token)){hasWeaklyLtr = true;}}return totalCount == 0?hasWeaklyLtr?goog.i18n.bidi.Dir.LTR:goog.i18n.bidi.Dir.NEUTRAL:rtlCount / totalCount > soyshim.$$bidiRtlDetectionThreshold_?goog.i18n.bidi.Dir.RTL:goog.i18n.bidi.Dir.LTR;};goog.i18n.BidiFormatter = function(dir){this.dir_ = goog.i18n.bidi.toDir(dir,true);};goog.i18n.BidiFormatter.prototype.getContextDir = function(){return this.dir_;};goog.i18n.BidiFormatter.prototype.knownDirAttr = function(dir){return !dir || dir == this.dir_?"":dir < 0?"dir=\"rtl\"":"dir=\"ltr\"";};goog.i18n.BidiFormatter.prototype.endEdge = function(){return this.dir_ < 0?"left":"right";};goog.i18n.BidiFormatter.prototype.mark = function(){return this.dir_ > 0?"‎":this.dir_ < 0?"‏":"";};goog.i18n.BidiFormatter.prototype.markAfterKnownDir = function(textDir,text,opt_isHtml){if(textDir == null){textDir = goog.i18n.bidi.estimateDirection(text,opt_isHtml);}return this.dir_ > 0 && (textDir < 0 || soyshim.$$bidiIsRtlExitText_(text,opt_isHtml))?"‎":this.dir_ < 0 && (textDir > 0 || soyshim.$$bidiIsLtrExitText_(text,opt_isHtml))?"‏":"";};goog.i18n.BidiFormatter.prototype.spanWrapWithKnownDir = function(textDir,str,placeholder){if(textDir == null){textDir = goog.i18n.bidi.estimateDirection(str,true);}var reset=this.markAfterKnownDir(textDir,str,true);if(textDir > 0 && this.dir_ <= 0){str = "<span dir=\"ltr\">" + str + "</span>";}else if(textDir < 0 && this.dir_ >= 0){str = "<span dir=\"rtl\">" + str + "</span>";}return str + reset;};goog.i18n.BidiFormatter.prototype.startEdge = function(){return this.dir_ < 0?"right":"left";};goog.i18n.BidiFormatter.prototype.unicodeWrapWithKnownDir = function(textDir,str,opt_isHtml){if(textDir == null){textDir = goog.i18n.bidi.estimateDirection(str,opt_isHtml);}var reset=this.markAfterKnownDir(textDir,str,opt_isHtml);if(textDir > 0 && this.dir_ <= 0){str = "‪" + str + "‬";}else if(textDir < 0 && this.dir_ >= 0){str = "‫" + str + "‬";}return str + reset;};if(!goog.string){goog.string = {newLineToBr:function newLineToBr(str,opt_xml){str = String(str);if(!goog.string.NEWLINE_TO_BR_RE_.test(str)){return str;}return str.replace(/(\r\n|\r|\n)/g,opt_xml?"<br />":"<br>");},urlEncode:encodeURIComponent,NEWLINE_TO_BR_RE_:/[\r\n]/};}goog.string.StringBuffer = function(opt_a1,var_args){this.buffer_ = goog.userAgent.jscript.HAS_JSCRIPT?[]:"";if(opt_a1 != null){this.append.apply(this,arguments);}};goog.string.StringBuffer.prototype.bufferLength_ = 0;goog.string.StringBuffer.prototype.append = function(a1,opt_a2,var_args){if(goog.userAgent.jscript.HAS_JSCRIPT){if(opt_a2 == null){this.buffer_[this.bufferLength_++] = a1;}else {var arr=this.buffer_;arr.push.apply(arr,arguments);this.bufferLength_ = this.buffer_.length;}}else {this.buffer_ += a1;if(opt_a2 != null){for(var i=1;i < arguments.length;i++) {this.buffer_ += arguments[i];}}}return this;};goog.string.StringBuffer.prototype.clear = function(){if(goog.userAgent.jscript.HAS_JSCRIPT){this.buffer_.length = 0;this.bufferLength_ = 0;}else {this.buffer_ = "";}};goog.string.StringBuffer.prototype.toString = function(){if(goog.userAgent.jscript.HAS_JSCRIPT){var str=this.buffer_.join("");this.clear();if(str){this.append(str);}return str;}else {return this.buffer_;}};if(!goog.soy)goog.soy = {renderAsElement:function renderAsElement(template,opt_templateData,opt_injectedData,opt_dom){return soyshim.$$renderWithWrapper_(template,opt_templateData,opt_dom,true,opt_injectedData);},renderAsFragment:function renderAsFragment(template,opt_templateData,opt_injectedData,opt_dom){return soyshim.$$renderWithWrapper_(template,opt_templateData,opt_dom,false,opt_injectedData);},renderElement:function renderElement(element,template,opt_templateData,opt_injectedData){element.innerHTML = template(opt_templateData,null,opt_injectedData);},data:{}};goog.soy.data.SanitizedContentKind = {HTML:goog.DEBUG?{sanitizedContentKindHtml:true}:{},JS:goog.DEBUG?{sanitizedContentJsChars:true}:{},JS_STR_CHARS:goog.DEBUG?{sanitizedContentJsStrChars:true}:{},URI:goog.DEBUG?{sanitizedContentUri:true}:{},ATTRIBUTES:goog.DEBUG?{sanitizedContentHtmlAttribute:true}:{},CSS:goog.DEBUG?{sanitizedContentCss:true}:{},TEXT:goog.DEBUG?{sanitizedContentKindText:true}:{}};goog.soy.data.SanitizedContent = function(){throw Error("Do not instantiate directly");};goog.soy.data.SanitizedContent.prototype.contentKind;goog.soy.data.SanitizedContent.prototype.contentDir = null;goog.soy.data.SanitizedContent.prototype.content;goog.soy.data.SanitizedContent.prototype.toString = function(){return this.content;};var soy={esc:{}};var soydata={};soydata.VERY_UNSAFE = {};var soyshim={$$DEFAULT_TEMPLATE_DATA_:{}};soyshim.$$renderWithWrapper_ = function(template,opt_templateData,opt_dom,opt_asElement,opt_injectedData){var dom=opt_dom || document;var wrapper=dom.createElement("div");wrapper.innerHTML = template(opt_templateData || soyshim.$$DEFAULT_TEMPLATE_DATA_,undefined,opt_injectedData);if(wrapper.childNodes.length == 1){var firstChild=wrapper.firstChild;if(!opt_asElement || firstChild.nodeType == 1){return firstChild;}}if(opt_asElement){return wrapper;}var fragment=dom.createDocumentFragment();while(wrapper.firstChild) {fragment.appendChild(wrapper.firstChild);}return fragment;};soyshim.$$bidiStripHtmlIfNecessary_ = function(str,opt_isHtml){return opt_isHtml?str.replace(soyshim.$$BIDI_HTML_SKIP_RE_,""):str;};soyshim.$$BIDI_HTML_SKIP_RE_ = /<[^>]*>|&[^;]+;/g;soyshim.$$bidiLtrChars_ = "A-Za-zÀ-ÖØ-öø-ʸ̀-֐ࠀ-῿" + "‎Ⰰ-﬜︀-﹯﻽-￿";soyshim.$$bidiRtlChars_ = "֑-߿‏יִ-﷿ﹰ-ﻼ";soyshim.$$bidiRtlDirCheckRe_ = new RegExp("^[^" + soyshim.$$bidiLtrChars_ + "]*[" + soyshim.$$bidiRtlChars_ + "]");soyshim.$$bidiLtrCharRe_ = new RegExp("[" + soyshim.$$bidiLtrChars_ + "]");soyshim.$$bidiIsRequiredLtrRe_ = /^http:\/\/.*/;soyshim.$$bidiHasNumeralsRe_ = /\d/;soyshim.$$bidiWordSeparatorRe_ = /\s+/;soyshim.$$bidiRtlDetectionThreshold_ = 0.40;soyshim.$$bidiLtrExitDirCheckRe_ = new RegExp("[" + soyshim.$$bidiLtrChars_ + "][^" + soyshim.$$bidiRtlChars_ + "]*$");soyshim.$$bidiRtlExitDirCheckRe_ = new RegExp("[" + soyshim.$$bidiRtlChars_ + "][^" + soyshim.$$bidiLtrChars_ + "]*$");soyshim.$$bidiIsLtrExitText_ = function(str,opt_isHtml){str = soyshim.$$bidiStripHtmlIfNecessary_(str,opt_isHtml);return soyshim.$$bidiLtrExitDirCheckRe_.test(str);};soyshim.$$bidiIsRtlExitText_ = function(str,opt_isHtml){str = soyshim.$$bidiStripHtmlIfNecessary_(str,opt_isHtml);return soyshim.$$bidiRtlExitDirCheckRe_.test(str);};soy.StringBuilder = goog.string.StringBuffer;soydata.SanitizedContentKind = goog.soy.data.SanitizedContentKind;soydata.isContentKind = function(value,contentKind){return value != null && value.contentKind === contentKind;};soydata.getContentDir = function(value){if(value != null){switch(value.contentDir){case goog.i18n.bidi.Dir.LTR:return goog.i18n.bidi.Dir.LTR;case goog.i18n.bidi.Dir.RTL:return goog.i18n.bidi.Dir.RTL;case goog.i18n.bidi.Dir.NEUTRAL:return goog.i18n.bidi.Dir.NEUTRAL;}}return null;};soydata.SanitizedHtml = function(){goog.soy.data.SanitizedContent.call(this);};goog.inherits(soydata.SanitizedHtml,goog.soy.data.SanitizedContent);soydata.SanitizedHtml.prototype.contentKind = soydata.SanitizedContentKind.HTML;soydata.SanitizedHtml.from = function(value){if(value != null && value.contentKind === soydata.SanitizedContentKind.HTML){goog.asserts.assert(value.constructor === soydata.SanitizedHtml);return value;}return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.esc.$$escapeHtmlHelper(String(value)),soydata.getContentDir(value));};soydata.SanitizedJs = function(){goog.soy.data.SanitizedContent.call(this);};goog.inherits(soydata.SanitizedJs,goog.soy.data.SanitizedContent);soydata.SanitizedJs.prototype.contentKind = soydata.SanitizedContentKind.JS;soydata.SanitizedJs.prototype.contentDir = goog.i18n.bidi.Dir.LTR;soydata.SanitizedJsStrChars = function(){goog.soy.data.SanitizedContent.call(this);};goog.inherits(soydata.SanitizedJsStrChars,goog.soy.data.SanitizedContent);soydata.SanitizedJsStrChars.prototype.contentKind = soydata.SanitizedContentKind.JS_STR_CHARS;soydata.SanitizedUri = function(){goog.soy.data.SanitizedContent.call(this);};goog.inherits(soydata.SanitizedUri,goog.soy.data.SanitizedContent);soydata.SanitizedUri.prototype.contentKind = soydata.SanitizedContentKind.URI;soydata.SanitizedUri.prototype.contentDir = goog.i18n.bidi.Dir.LTR;soydata.SanitizedHtmlAttribute = function(){goog.soy.data.SanitizedContent.call(this);};goog.inherits(soydata.SanitizedHtmlAttribute,goog.soy.data.SanitizedContent);soydata.SanitizedHtmlAttribute.prototype.contentKind = soydata.SanitizedContentKind.ATTRIBUTES;soydata.SanitizedHtmlAttribute.prototype.contentDir = goog.i18n.bidi.Dir.LTR;soydata.SanitizedCss = function(){goog.soy.data.SanitizedContent.call(this);};goog.inherits(soydata.SanitizedCss,goog.soy.data.SanitizedContent);soydata.SanitizedCss.prototype.contentKind = soydata.SanitizedContentKind.CSS;soydata.SanitizedCss.prototype.contentDir = goog.i18n.bidi.Dir.LTR;soydata.UnsanitizedText = function(content,opt_contentDir){this.content = String(content);this.contentDir = opt_contentDir != null?opt_contentDir:null;};goog.inherits(soydata.UnsanitizedText,goog.soy.data.SanitizedContent);soydata.UnsanitizedText.prototype.contentKind = soydata.SanitizedContentKind.TEXT;soydata.$$EMPTY_STRING_ = {VALUE:""};soydata.$$makeSanitizedContentFactory_ = function(ctor){function InstantiableCtor(){}InstantiableCtor.prototype = ctor.prototype;function sanitizedContentFactory(content,opt_contentDir){var result=new InstantiableCtor();result.content = String(content);if(opt_contentDir !== undefined){result.contentDir = opt_contentDir;}return result;}return sanitizedContentFactory;};soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_ = function(ctor){function InstantiableCtor(){}InstantiableCtor.prototype = ctor.prototype;function sanitizedContentFactory(content){var result=new InstantiableCtor();result.content = String(content);return result;}return sanitizedContentFactory;};soydata.markUnsanitizedText = function(content,opt_contentDir){return new soydata.UnsanitizedText(content,opt_contentDir);};soydata.VERY_UNSAFE.ordainSanitizedHtml = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedHtml);soydata.VERY_UNSAFE.ordainSanitizedJs = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_(soydata.SanitizedJs);soydata.VERY_UNSAFE.ordainSanitizedJsStrChars = soydata.$$makeSanitizedContentFactory_(soydata.SanitizedJsStrChars);soydata.VERY_UNSAFE.ordainSanitizedUri = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_(soydata.SanitizedUri);soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_(soydata.SanitizedHtmlAttribute);soydata.VERY_UNSAFE.ordainSanitizedCss = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnly_(soydata.SanitizedCss);soy.renderElement = goog.soy.renderElement;soy.renderAsFragment = function(template,opt_templateData,opt_document,opt_injectedData){return goog.soy.renderAsFragment(template,opt_templateData,opt_injectedData,new goog.dom.DomHelper(opt_document));};soy.renderAsElement = function(template,opt_templateData,opt_document,opt_injectedData){return goog.soy.renderAsElement(template,opt_templateData,opt_injectedData,new goog.dom.DomHelper(opt_document));};soy.$$IS_LOCALE_RTL = goog.i18n.bidi.IS_RTL;soy.$$augmentMap = function(baseMap,additionalMap){function TempCtor(){}TempCtor.prototype = baseMap;var augmentedMap=new TempCtor();for(var key in additionalMap) {augmentedMap[key] = additionalMap[key];}return augmentedMap;};soy.$$checkMapKey = function(key){if(typeof key != "string"){throw Error("Map literal's key expression must evaluate to string" + " (encountered type \"" + typeof key + "\").");}return key;};soy.$$getMapKeys = function(map){var mapKeys=[];for(var key in map) {mapKeys.push(key);}return mapKeys;};soy.$$getDelTemplateId = function(delTemplateName){return delTemplateName;};soy.$$DELEGATE_REGISTRY_PRIORITIES_ = {};soy.$$DELEGATE_REGISTRY_FUNCTIONS_ = {};soy.$$registerDelegateFn = function(delTemplateId,delTemplateVariant,delPriority,delFn){var mapKey="key_" + delTemplateId + ":" + delTemplateVariant;var currPriority=soy.$$DELEGATE_REGISTRY_PRIORITIES_[mapKey];if(currPriority === undefined || delPriority > currPriority){soy.$$DELEGATE_REGISTRY_PRIORITIES_[mapKey] = delPriority;soy.$$DELEGATE_REGISTRY_FUNCTIONS_[mapKey] = delFn;}else if(delPriority == currPriority){throw Error("Encountered two active delegates with the same priority (\"" + delTemplateId + ":" + delTemplateVariant + "\").");}else {}};soy.$$getDelegateFn = function(delTemplateId,delTemplateVariant,allowsEmptyDefault){var delFn=soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_" + delTemplateId + ":" + delTemplateVariant];if(!delFn && delTemplateVariant != ""){delFn = soy.$$DELEGATE_REGISTRY_FUNCTIONS_["key_" + delTemplateId + ":"];}if(delFn){return delFn;}else if(allowsEmptyDefault){return soy.$$EMPTY_TEMPLATE_FN_;}else {throw Error("Found no active impl for delegate call to \"" + delTemplateId + ":" + delTemplateVariant + "\" (and not allowemptydefault=\"true\").");}};soy.$$EMPTY_TEMPLATE_FN_ = function(opt_data,opt_sb,opt_ijData){return "";};soydata.$$makeSanitizedContentFactoryForInternalBlocks_ = function(ctor){function InstantiableCtor(){}InstantiableCtor.prototype = ctor.prototype;function sanitizedContentFactory(content,opt_contentDir){var contentString=String(content);if(!contentString){return soydata.$$EMPTY_STRING_.VALUE;}var result=new InstantiableCtor();result.content = String(content);if(opt_contentDir !== undefined){result.contentDir = opt_contentDir;}return result;}return sanitizedContentFactory;};soydata.$$makeSanitizedContentFactoryWithDefaultDirOnlyForInternalBlocks_ = function(ctor){function InstantiableCtor(){}InstantiableCtor.prototype = ctor.prototype;function sanitizedContentFactory(content){var contentString=String(content);if(!contentString){return soydata.$$EMPTY_STRING_.VALUE;}var result=new InstantiableCtor();result.content = String(content);return result;}return sanitizedContentFactory;};soydata.$$markUnsanitizedTextForInternalBlocks = function(content,opt_contentDir){var contentString=String(content);if(!contentString){return soydata.$$EMPTY_STRING_.VALUE;}return new soydata.UnsanitizedText(contentString,opt_contentDir);};soydata.VERY_UNSAFE.$$ordainSanitizedHtmlForInternalBlocks = soydata.$$makeSanitizedContentFactoryForInternalBlocks_(soydata.SanitizedHtml);soydata.VERY_UNSAFE.$$ordainSanitizedJsForInternalBlocks = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnlyForInternalBlocks_(soydata.SanitizedJs);soydata.VERY_UNSAFE.$$ordainSanitizedUriForInternalBlocks = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnlyForInternalBlocks_(soydata.SanitizedUri);soydata.VERY_UNSAFE.$$ordainSanitizedAttributesForInternalBlocks = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnlyForInternalBlocks_(soydata.SanitizedHtmlAttribute);soydata.VERY_UNSAFE.$$ordainSanitizedCssForInternalBlocks = soydata.$$makeSanitizedContentFactoryWithDefaultDirOnlyForInternalBlocks_(soydata.SanitizedCss);soy.$$escapeHtml = function(value){return soydata.SanitizedHtml.from(value);};soy.$$cleanHtml = function(value){if(soydata.isContentKind(value,soydata.SanitizedContentKind.HTML)){goog.asserts.assert(value.constructor === soydata.SanitizedHtml);return value;}return soydata.VERY_UNSAFE.ordainSanitizedHtml(soy.$$stripHtmlTags(value,soy.esc.$$SAFE_TAG_WHITELIST_),soydata.getContentDir(value));};soy.$$escapeHtmlRcdata = function(value){if(soydata.isContentKind(value,soydata.SanitizedContentKind.HTML)){goog.asserts.assert(value.constructor === soydata.SanitizedHtml);return soy.esc.$$normalizeHtmlHelper(value.content);}return soy.esc.$$escapeHtmlHelper(value);};soy.$$HTML5_VOID_ELEMENTS_ = new RegExp("^<(?:area|base|br|col|command|embed|hr|img|input" + "|keygen|link|meta|param|source|track|wbr)\\b");soy.$$stripHtmlTags = function(value,opt_tagWhitelist){if(!opt_tagWhitelist){return String(value).replace(soy.esc.$$HTML_TAG_REGEX_,"").replace(soy.esc.$$LT_REGEX_,"&lt;");}var html=String(value).replace(/\[/g,"&#91;");var tags=[];html = html.replace(soy.esc.$$HTML_TAG_REGEX_,function(tok,tagName){if(tagName){tagName = tagName.toLowerCase();if(opt_tagWhitelist.hasOwnProperty(tagName) && opt_tagWhitelist[tagName]){var start=tok.charAt(1) === "/"?"</":"<";var index=tags.length;tags[index] = start + tagName + ">";return "[" + index + "]";}}return "";});html = soy.esc.$$normalizeHtmlHelper(html);var finalCloseTags=soy.$$balanceTags_(tags);html = html.replace(/\[(\d+)\]/g,function(_,index){return tags[index];});return html + finalCloseTags;};soy.$$balanceTags_ = function(tags){var open=[];for(var i=0,n=tags.length;i < n;++i) {var tag=tags[i];if(tag.charAt(1) === "/"){var openTagIndex=open.length - 1;while(openTagIndex >= 0 && open[openTagIndex] != tag) {openTagIndex--;}if(openTagIndex < 0){tags[i] = "";}else {tags[i] = open.slice(openTagIndex).reverse().join("");open.length = openTagIndex;}}else if(!soy.$$HTML5_VOID_ELEMENTS_.test(tag)){open.push("</" + tag.substring(1));}}return open.reverse().join("");};soy.$$escapeHtmlAttribute = function(value){if(soydata.isContentKind(value,soydata.SanitizedContentKind.HTML)){goog.asserts.assert(value.constructor === soydata.SanitizedHtml);return soy.esc.$$normalizeHtmlHelper(soy.$$stripHtmlTags(value.content));}return soy.esc.$$escapeHtmlHelper(value);};soy.$$escapeHtmlAttributeNospace = function(value){if(soydata.isContentKind(value,soydata.SanitizedContentKind.HTML)){goog.asserts.assert(value.constructor === soydata.SanitizedHtml);return soy.esc.$$normalizeHtmlNospaceHelper(soy.$$stripHtmlTags(value.content));}return soy.esc.$$escapeHtmlNospaceHelper(value);};soy.$$filterHtmlAttributes = function(value){if(soydata.isContentKind(value,soydata.SanitizedContentKind.ATTRIBUTES)){goog.asserts.assert(value.constructor === soydata.SanitizedHtmlAttribute);return value.content.replace(/([^"'\s])$/,"$1 ");}return soy.esc.$$filterHtmlAttributesHelper(value);};soy.$$filterHtmlElementName = function(value){return soy.esc.$$filterHtmlElementNameHelper(value);};soy.$$escapeJs = function(value){return soy.$$escapeJsString(value);};soy.$$escapeJsString = function(value){if(soydata.isContentKind(value,soydata.SanitizedContentKind.JS_STR_CHARS)){goog.asserts.assert(value.constructor === soydata.SanitizedJsStrChars);return value.content;}return soy.esc.$$escapeJsStringHelper(value);};soy.$$escapeJsValue = function(value){if(value == null){return " null ";}if(soydata.isContentKind(value,soydata.SanitizedContentKind.JS)){goog.asserts.assert(value.constructor === soydata.SanitizedJs);return value.content;}switch(typeof value){case "boolean":case "number":return " " + value + " ";default:return "'" + soy.esc.$$escapeJsStringHelper(String(value)) + "'";}};soy.$$escapeJsRegex = function(value){return soy.esc.$$escapeJsRegexHelper(value);};soy.$$problematicUriMarks_ = /['()]/g;soy.$$pctEncode_ = function(ch){return "%" + ch.charCodeAt(0).toString(16);};soy.$$escapeUri = function(value){if(soydata.isContentKind(value,soydata.SanitizedContentKind.URI)){goog.asserts.assert(value.constructor === soydata.SanitizedUri);return soy.$$normalizeUri(value);}var encoded=soy.esc.$$escapeUriHelper(value);soy.$$problematicUriMarks_.lastIndex = 0;if(soy.$$problematicUriMarks_.test(encoded)){return encoded.replace(soy.$$problematicUriMarks_,soy.$$pctEncode_);}return encoded;};soy.$$normalizeUri = function(value){return soy.esc.$$normalizeUriHelper(value);};soy.$$filterNormalizeUri = function(value){if(soydata.isContentKind(value,soydata.SanitizedContentKind.URI)){goog.asserts.assert(value.constructor === soydata.SanitizedUri);return soy.$$normalizeUri(value);}return soy.esc.$$filterNormalizeUriHelper(value);};soy.$$filterImageDataUri = function(value){return soydata.VERY_UNSAFE.ordainSanitizedUri(soy.esc.$$filterImageDataUriHelper(value));};soy.$$escapeCssString = function(value){return soy.esc.$$escapeCssStringHelper(value);};soy.$$filterCssValue = function(value){if(soydata.isContentKind(value,soydata.SanitizedContentKind.CSS)){goog.asserts.assert(value.constructor === soydata.SanitizedCss);return value.content;}if(value == null){return "";}return soy.esc.$$filterCssValueHelper(value);};soy.$$filterNoAutoescape = function(value){if(soydata.isContentKind(value,soydata.SanitizedContentKind.TEXT)){goog.asserts.fail("Tainted SanitizedContentKind.TEXT for |noAutoescape: `%s`",[value.content]);return "zSoyz";}return value;};soy.$$changeNewlineToBr = function(value){var result=goog.string.newLineToBr(String(value),false);if(soydata.isContentKind(value,soydata.SanitizedContentKind.HTML)){return soydata.VERY_UNSAFE.ordainSanitizedHtml(result,soydata.getContentDir(value));}return result;};soy.$$insertWordBreaks = function(value,maxCharsBetweenWordBreaks){var result=goog.format.insertWordBreaks(String(value),maxCharsBetweenWordBreaks);if(soydata.isContentKind(value,soydata.SanitizedContentKind.HTML)){return soydata.VERY_UNSAFE.ordainSanitizedHtml(result,soydata.getContentDir(value));}return result;};soy.$$truncate = function(str,maxLen,doAddEllipsis){str = String(str);if(str.length <= maxLen){return str;}if(doAddEllipsis){if(maxLen > 3){maxLen -= 3;}else {doAddEllipsis = false;}}if(soy.$$isHighSurrogate_(str.charAt(maxLen - 1)) && soy.$$isLowSurrogate_(str.charAt(maxLen))){maxLen -= 1;}str = str.substring(0,maxLen);if(doAddEllipsis){str += "...";}return str;};soy.$$isHighSurrogate_ = function(ch){return 0xD800 <= ch && ch <= 0xDBFF;};soy.$$isLowSurrogate_ = function(ch){return 0xDC00 <= ch && ch <= 0xDFFF;};soy.$$bidiFormatterCache_ = {};soy.$$getBidiFormatterInstance_ = function(bidiGlobalDir){return soy.$$bidiFormatterCache_[bidiGlobalDir] || (soy.$$bidiFormatterCache_[bidiGlobalDir] = new goog.i18n.BidiFormatter(bidiGlobalDir));};soy.$$bidiTextDir = function(text,opt_isHtml){var contentDir=soydata.getContentDir(text);if(contentDir != null){return contentDir;}var isHtml=opt_isHtml || soydata.isContentKind(text,soydata.SanitizedContentKind.HTML);return goog.i18n.bidi.estimateDirection(text + "",isHtml);};soy.$$bidiDirAttr = function(bidiGlobalDir,text,opt_isHtml){var formatter=soy.$$getBidiFormatterInstance_(bidiGlobalDir);var contentDir=soydata.getContentDir(text);if(contentDir == null){var isHtml=opt_isHtml || soydata.isContentKind(text,soydata.SanitizedContentKind.HTML);contentDir = goog.i18n.bidi.estimateDirection(text + "",isHtml);}return soydata.VERY_UNSAFE.ordainSanitizedHtmlAttribute(formatter.knownDirAttr(contentDir));};soy.$$bidiMarkAfter = function(bidiGlobalDir,text,opt_isHtml){var formatter=soy.$$getBidiFormatterInstance_(bidiGlobalDir);var isHtml=opt_isHtml || soydata.isContentKind(text,soydata.SanitizedContentKind.HTML);return formatter.markAfterKnownDir(soydata.getContentDir(text),text + "",isHtml);};soy.$$bidiSpanWrap = function(bidiGlobalDir,text){var formatter=soy.$$getBidiFormatterInstance_(bidiGlobalDir);var wrappedText=formatter.spanWrapWithKnownDir(soydata.getContentDir(text),text + "",true);return wrappedText;};soy.$$bidiUnicodeWrap = function(bidiGlobalDir,text){var formatter=soy.$$getBidiFormatterInstance_(bidiGlobalDir);var isHtml=soydata.isContentKind(text,soydata.SanitizedContentKind.HTML);var wrappedText=formatter.unicodeWrapWithKnownDir(soydata.getContentDir(text),text + "",isHtml);var wrappedTextDir=formatter.getContextDir();if(soydata.isContentKind(text,soydata.SanitizedContentKind.TEXT)){return new soydata.UnsanitizedText(wrappedText,wrappedTextDir);}if(isHtml){return soydata.VERY_UNSAFE.ordainSanitizedHtml(wrappedText,wrappedTextDir);}if(soydata.isContentKind(text,soydata.SanitizedContentKind.JS_STR_CHARS)){return soydata.VERY_UNSAFE.ordainSanitizedJsStrChars(wrappedText,wrappedTextDir);}return wrappedText;};soy.esc.$$escapeUriHelper = function(v){return encodeURIComponent(String(v));};soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = {"\u0000":"&#0;","\"":"&quot;","&":"&amp;","'":"&#39;","<":"&lt;",">":"&gt;","\t":"&#9;","\n":"&#10;","\u000b":"&#11;","\f":"&#12;","\r":"&#13;"," ":"&#32;","-":"&#45;","/":"&#47;","=":"&#61;","`":"&#96;","":"&#133;"," ":"&#160;","\u2028":"&#8232;","\u2029":"&#8233;"};soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_ = function(ch){return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_[ch];};soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = {"\u0000":"\\x00","\b":"\\x08","\t":"\\t","\n":"\\n","\u000b":"\\x0b","\f":"\\f","\r":"\\r","\"":"\\x22","&":"\\x26","'":"\\x27","/":"\\/","<":"\\x3c","=":"\\x3d",">":"\\x3e","\\":"\\\\","":"\\x85","\u2028":"\\u2028","\u2029":"\\u2029","$":"\\x24","(":"\\x28",")":"\\x29","*":"\\x2a","+":"\\x2b",",":"\\x2c","-":"\\x2d",".":"\\x2e",":":"\\x3a","?":"\\x3f","[":"\\x5b","]":"\\x5d","^":"\\x5e","{":"\\x7b","|":"\\x7c","}":"\\x7d"};soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_ = function(ch){return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_[ch];};soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_ = {"\u0000":"\\0 ","\b":"\\8 ","\t":"\\9 ","\n":"\\a ","\u000b":"\\b ","\f":"\\c ","\r":"\\d ","\"":"\\22 ","&":"\\26 ","'":"\\27 ","(":"\\28 ",")":"\\29 ","*":"\\2a ","/":"\\2f ",":":"\\3a ",";":"\\3b ","<":"\\3c ","=":"\\3d ",">":"\\3e ","@":"\\40 ","\\":"\\5c ","{":"\\7b ","}":"\\7d ","":"\\85 "," ":"\\a0 ","\u2028":"\\2028 ","\u2029":"\\2029 "};soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_ = function(ch){return soy.esc.$$ESCAPE_MAP_FOR_ESCAPE_CSS_STRING_[ch];};soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = {"\u0000":"%00","\u0001":"%01","\u0002":"%02","\u0003":"%03","\u0004":"%04","\u0005":"%05","\u0006":"%06","\u0007":"%07","\b":"%08","\t":"%09","\n":"%0A","\u000b":"%0B","\f":"%0C","\r":"%0D","\u000e":"%0E","\u000f":"%0F","\u0010":"%10","\u0011":"%11","\u0012":"%12","\u0013":"%13","\u0014":"%14","\u0015":"%15","\u0016":"%16","\u0017":"%17","\u0018":"%18","\u0019":"%19","\u001a":"%1A","\u001b":"%1B","\u001c":"%1C","\u001d":"%1D","\u001e":"%1E","\u001f":"%1F"," ":"%20","\"":"%22","'":"%27","(":"%28",")":"%29","<":"%3C",">":"%3E","\\":"%5C","{":"%7B","}":"%7D","":"%7F","":"%C2%85"," ":"%C2%A0","\u2028":"%E2%80%A8","\u2029":"%E2%80%A9","！":"%EF%BC%81","＃":"%EF%BC%83","＄":"%EF%BC%84","＆":"%EF%BC%86","＇":"%EF%BC%87","（":"%EF%BC%88","）":"%EF%BC%89","＊":"%EF%BC%8A","＋":"%EF%BC%8B","，":"%EF%BC%8C","／":"%EF%BC%8F","：":"%EF%BC%9A","；":"%EF%BC%9B","＝":"%EF%BC%9D","？":"%EF%BC%9F","＠":"%EF%BC%A0","［":"%EF%BC%BB","］":"%EF%BC%BD"};soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = function(ch){return soy.esc.$$ESCAPE_MAP_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_[ch];};soy.esc.$$MATCHER_FOR_ESCAPE_HTML_ = /[\x00\x22\x26\x27\x3c\x3e]/g;soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_ = /[\x00\x22\x27\x3c\x3e]/g;soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x26\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_ = /[\x00\x09-\x0d \x22\x27\x2d\/\x3c-\x3e`\x85\xa0\u2028\u2029]/g;soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_ = /[\x00\x08-\x0d\x22\x26\x27\/\x3c-\x3e\\\x85\u2028\u2029]/g;soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_ = /[\x00\x08-\x0d\x22\x24\x26-\/\x3a\x3c-\x3f\x5b-\x5e\x7b-\x7d\x85\u2028\u2029]/g;soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_ = /[\x00\x08-\x0d\x22\x26-\x2a\/\x3a-\x3e@\\\x7b\x7d\x85\xa0\u2028\u2029]/g;soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_ = /[\x00- \x22\x27-\x29\x3c\x3e\\\x7b\x7d\x7f\x85\xa0\u2028\u2029\uff01\uff03\uff04\uff06-\uff0c\uff0f\uff1a\uff1b\uff1d\uff1f\uff20\uff3b\uff3d]/g;soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_ = /^(?!-*(?:expression|(?:moz-)?binding))(?:[.#]?-?(?:[_a-z0-9-]+)(?:-[_a-z0-9-]+)*-?|-?(?:[0-9]+(?:\.[0-9]*)?|\.[0-9]+)(?:[a-z]{1,2}|%)?|!important|)$/i;soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_ = /^(?:(?:https?|mailto):|[^&:\/?#]*(?:[\/?#]|$))/i;soy.esc.$$FILTER_FOR_FILTER_IMAGE_DATA_URI_ = /^data:image\/(?:bmp|gif|jpe?g|png|tiff|webp);base64,[a-z0-9+\/]+=*$/i;soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTES_ = /^(?!style|on|action|archive|background|cite|classid|codebase|data|dsync|href|longdesc|src|usemap)(?:[a-z0-9_$:-]*)$/i;soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_ = /^(?!script|style|title|textarea|xmp|no)[a-z0-9_$:-]*$/i;soy.esc.$$escapeHtmlHelper = function(value){var str=String(value);return str.replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_,soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);};soy.esc.$$normalizeHtmlHelper = function(value){var str=String(value);return str.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_,soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);};soy.esc.$$escapeHtmlNospaceHelper = function(value){var str=String(value);return str.replace(soy.esc.$$MATCHER_FOR_ESCAPE_HTML_NOSPACE_,soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);};soy.esc.$$normalizeHtmlNospaceHelper = function(value){var str=String(value);return str.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_HTML_NOSPACE_,soy.esc.$$REPLACER_FOR_ESCAPE_HTML__AND__NORMALIZE_HTML__AND__ESCAPE_HTML_NOSPACE__AND__NORMALIZE_HTML_NOSPACE_);};soy.esc.$$escapeJsStringHelper = function(value){var str=String(value);return str.replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_STRING_,soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_);};soy.esc.$$escapeJsRegexHelper = function(value){var str=String(value);return str.replace(soy.esc.$$MATCHER_FOR_ESCAPE_JS_REGEX_,soy.esc.$$REPLACER_FOR_ESCAPE_JS_STRING__AND__ESCAPE_JS_REGEX_);};soy.esc.$$escapeCssStringHelper = function(value){var str=String(value);return str.replace(soy.esc.$$MATCHER_FOR_ESCAPE_CSS_STRING_,soy.esc.$$REPLACER_FOR_ESCAPE_CSS_STRING_);};soy.esc.$$filterCssValueHelper = function(value){var str=String(value);if(!soy.esc.$$FILTER_FOR_FILTER_CSS_VALUE_.test(str)){return "zSoyz";}return str;};soy.esc.$$normalizeUriHelper = function(value){var str=String(value);return str.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_,soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_);};soy.esc.$$filterNormalizeUriHelper = function(value){var str=String(value);if(!soy.esc.$$FILTER_FOR_FILTER_NORMALIZE_URI_.test(str)){return "#zSoyz";}return str.replace(soy.esc.$$MATCHER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_,soy.esc.$$REPLACER_FOR_NORMALIZE_URI__AND__FILTER_NORMALIZE_URI_);};soy.esc.$$filterImageDataUriHelper = function(value){var str=String(value);if(!soy.esc.$$FILTER_FOR_FILTER_IMAGE_DATA_URI_.test(str)){return "data:image/gif;base64,zSoyz";}return str;};soy.esc.$$filterHtmlAttributesHelper = function(value){var str=String(value);if(!soy.esc.$$FILTER_FOR_FILTER_HTML_ATTRIBUTES_.test(str)){return "zSoyz";}return str;};soy.esc.$$filterHtmlElementNameHelper = function(value){var str=String(value);if(!soy.esc.$$FILTER_FOR_FILTER_HTML_ELEMENT_NAME_.test(str)){return "zSoyz";}return str;};soy.esc.$$HTML_TAG_REGEX_ = /<(?:!|\/?([a-zA-Z][a-zA-Z0-9:\-]*))(?:[^>'"]|"[^"]*"|'[^']*')*>/g;soy.esc.$$LT_REGEX_ = /</g;soy.esc.$$SAFE_TAG_WHITELIST_ = {"b":1,"br":1,"em":1,"i":1,"s":1,"sub":1,"sup":1,"u":1};window.soy = soy;})();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/aui.js
__8068caa4da7075ef513014428347589f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from aui.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
  
    aui.renderExtraAttributes = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      if (opt_data.extraAttributes) {
        if (Object.prototype.toString.call(opt_data.extraAttributes) === '[object Object]') {
          var attrList7 = soy.$$getMapKeys(opt_data.extraAttributes);
          var attrListLen7 = attrList7.length;
          for (var attrIndex7 = 0; attrIndex7 < attrListLen7; attrIndex7++) {
            var attrData7 = attrList7[attrIndex7];
            output.append(' ', soy.$$escapeHtml(attrData7), '="', soy.$$escapeHtml(opt_data.extraAttributes[attrData7]), '"');
          }
        } else {
          output.append(' ', soy.$$filterNoAutoescape(opt_data.extraAttributes));
        }
      }
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.renderExtraAttributes.soyTemplateName = 'aui.renderExtraAttributes';
    }
  
    aui.renderExtraClasses = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      if (opt_data.extraClasses) {
        if (opt_data.extraClasses instanceof Array) {
          var classList23 = opt_data.extraClasses;
          var classListLen23 = classList23.length;
          for (var classIndex23 = 0; classIndex23 < classListLen23; classIndex23++) {
            var classData23 = classList23[classIndex23];
            output.append(' ', soy.$$escapeHtml(classData23));
          }
        } else {
          output.append(' ', soy.$$escapeHtml(opt_data.extraClasses));
        }
      }
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.renderExtraClasses.soyTemplateName = 'aui.renderExtraClasses';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/avatar.js
__1891ade1d3c0e295569bd579f13b0f63 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from avatar.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.avatar.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.avatar == 'undefined') {
      aui.avatar = {};
    }
  
    aui.avatar.avatar = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-avatar aui-avatar-', soy.$$escapeHtml(opt_data.size), soy.$$escapeHtml(opt_data.isProject ? ' aui-avatar-project' : ''), soy.$$escapeHtml(opt_data.badgeContent ? ' aui-avatar-badged' : ''));
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('><span class="aui-avatar-inner"><img src="', soy.$$escapeHtml(opt_data.avatarImageUrl), '"', opt_data.accessibilityText ? ' alt="' + soy.$$escapeHtml(opt_data.accessibilityText) + '"' : '', opt_data.title ? ' title="' + soy.$$escapeHtml(opt_data.title) + '"' : '', opt_data.imageClasses ? ' class="' + soy.$$escapeHtml(opt_data.imageClasses) + '"' : '', ' /></span>', opt_data.badgeContent ? soy.$$filterNoAutoescape(opt_data.badgeContent) : '', '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.avatar.avatar.soyTemplateName = 'aui.avatar.avatar';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/badges.js
__0254872b522bc9e00d02589f509bb8f5 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from badges.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.badges.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.badges == 'undefined') {
      aui.badges = {};
    }
  
    aui.badges.badge = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-badge');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$escapeHtml(opt_data.text), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.badges.badge.soyTemplateName = 'aui.badges.badge';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/buttons.js
__f6141f2f65f74971f091c822cbd840f1 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from buttons.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.buttons.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.buttons == 'undefined') {
      aui.buttons = {};
    }
  
    aui.buttons.button = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      if (opt_data.href) {
        output.append('<a href="', soy.$$escapeHtml(opt_data.href), '"');
        aui.buttons.buttonAttributes(soy.$$augmentMap(opt_data, { tagName: 'a' }), output);
        output.append('>');
        aui.buttons.buttonIcon(opt_data, output);
        output.append(opt_data.hasLabel ? '<span class="aui-button-label">' : '', soy.$$escapeHtml(opt_data.text), opt_data.hasLabel ? '</span>' : '', '</a>');
      } else if (opt_data.tagName == 'input') {
        output.append('<input type="', soy.$$escapeHtml(opt_data.inputType ? opt_data.inputType : 'button'), '" ');
        aui.buttons.buttonAttributes(opt_data, output);
        output.append(' value="', soy.$$escapeHtml(opt_data.text), '" />');
      } else {
        var theTagName__soy29 = opt_data.tagName ? opt_data.tagName : 'button';
        output.append('<', soy.$$escapeHtml(theTagName__soy29));
        aui.buttons.buttonAttributes(soy.$$augmentMap(opt_data, { tagName: theTagName__soy29 }), output);
        output.append('>');
        aui.buttons.buttonIcon(opt_data, output);
        output.append(opt_data.hasLabel ? '<span class="aui-button-label">' : '', soy.$$escapeHtml(opt_data.text), opt_data.hasLabel ? '</span>' : '', '</', soy.$$escapeHtml(theTagName__soy29), '>');
      }
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.buttons.button.soyTemplateName = 'aui.buttons.button';
    }
  
    aui.buttons.buttons = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-buttons');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</div>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.buttons.buttons.soyTemplateName = 'aui.buttons.buttons';
    }
  
    aui.buttons.buttonAttributes = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      output.append(opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-button', opt_data.splitButtonType == 'main' ? ' aui-button-split-main' : '', opt_data.dropdown2Target ? ' aui-dropdown2-trigger' + (opt_data.splitButtonType == 'more' ? ' aui-button-split-more' : '') : '');
      switch (opt_data.type) {
        case 'primary':
          output.append(' aui-button-primary');
          break;
        case 'link':
          output.append(' aui-button-link');
          break;
        case 'subtle':
          output.append(' aui-button-subtle');
          break;
        case 'text':
          output.append(' aui-button-text');
          break;
      }
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append(opt_data.isPressed ? ' aria-pressed="' + soy.$$escapeHtml(opt_data.isPressed) + '"' : '', opt_data.isDisabled ? ' aria-disabled="' + soy.$$escapeHtml(opt_data.isDisabled) + '"' + (opt_data.isDisabled == true ? opt_data.tagName == 'button' || opt_data.tagName == 'input' ? ' disabled="disabled" ' : '' : '') : '', opt_data.dropdown2Target ? ' aria-owns="' + soy.$$escapeHtml(opt_data.dropdown2Target) + '" aria-haspopup="true"' : '', opt_data.tagName == 'a' ? ' tabindex="0"' : '');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.buttons.buttonAttributes.soyTemplateName = 'aui.buttons.buttonAttributes';
    }
  
    aui.buttons.buttonIcon = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      output.append(opt_data.iconType ? '<span class="' + (opt_data.iconType == 'aui' ? 'aui-icon' : '') + (opt_data.iconClass ? ' ' + soy.$$escapeHtml(opt_data.iconClass) : '') + '">' + (opt_data.iconText ? soy.$$escapeHtml(opt_data.iconText) + ' ' : '') + '</span>' : '');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.buttons.buttonIcon.soyTemplateName = 'aui.buttons.buttonIcon';
    }
  
    aui.buttons.splitButton = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.buttons.button(soy.$$augmentMap(opt_data.splitButtonMain, { splitButtonType: 'main' }), output);
      aui.buttons.button(soy.$$augmentMap(opt_data.splitButtonMore, { splitButtonType: 'more' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.buttons.splitButton.soyTemplateName = 'aui.buttons.splitButton';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/dialog2.js
__178aaef77c2e3fe44e30e25be73b9a09 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from dialog2.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.dialog.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.dialog == 'undefined') {
      aui.dialog = {};
    }
  
    aui.dialog.dialog2 = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      var param12 = new soy.StringBuilder();
      aui.dialog.dialog2Content({ id: null, titleText: opt_data.titleText, titleContent: opt_data.titleContent, headerActionContent: opt_data.headerActionContent, headerSecondaryContent: opt_data.headerSecondaryContent, modal: opt_data.modal, content: opt_data.content, footerHintText: opt_data.footerHintText, footerHintContent: opt_data.footerHintContent, footerActionContent: opt_data.footerActionContent }, param12);
      aui.dialog.dialog2Chrome({ id: opt_data.id, titleId: opt_data.id ? opt_data.id + '-dialog-title' : null, modal: opt_data.modal, tagName: opt_data.tagName, removeOnHide: opt_data.removeOnHide, visible: opt_data.visible, size: opt_data.size, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, content: param12.toString() }, output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dialog.dialog2.soyTemplateName = 'aui.dialog.dialog2';
    }
  
    aui.dialog.dialog2Chrome = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', opt_data.titleId ? ' aria-labelledby="' + soy.$$escapeHtml(opt_data.titleId) + '"' : '', ' role="dialog" class=" aui-layer aui-dialog2 aui-dialog2-', soy.$$escapeHtml(opt_data.size ? opt_data.size : 'medium'));
      aui.renderExtraClasses(opt_data, output);
      output.append('"', opt_data.modal ? 'data-aui-modal="true"' : '', opt_data.removeOnHide ? 'data-aui-remove-on-hide="true"' : '', opt_data.visible != true ? 'aria-hidden="true"' : '');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', opt_data.content ? soy.$$filterNoAutoescape(opt_data.content) : '', '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dialog.dialog2Chrome.soyTemplateName = 'aui.dialog.dialog2Chrome';
    }
  
    aui.dialog.dialog2Content = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      aui.dialog.dialog2Header({ titleId: opt_data.id ? opt_data.id + '-dialog-title' : null, titleText: opt_data.titleText, titleContent: opt_data.titleContent, actionContent: opt_data.headerActionContent, secondaryContent: opt_data.headerSecondaryContent, modal: opt_data.modal }, output);
      aui.dialog.dialog2Panel(opt_data, output);
      aui.dialog.dialog2Footer({ hintText: opt_data.footerHintText, hintContent: opt_data.footerHintContent, actionContent: opt_data.footerActionContent }, output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dialog.dialog2Content.soyTemplateName = 'aui.dialog.dialog2Content';
    }
  
    aui.dialog.dialog2Header = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      output.append('<header', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-dialog2-header');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('><h2 ', opt_data.titleId ? ' id="' + soy.$$escapeHtml(opt_data.titleId) + '"' : '', ' class="aui-dialog2-header-main">', opt_data.titleText ? soy.$$escapeHtml(opt_data.titleText) : '', opt_data.titleContent ? soy.$$filterNoAutoescape(opt_data.titleContent) : '', '</h2>', opt_data.actionContent ? '<div class="aui-dialog2-header-actions">' + soy.$$filterNoAutoescape(opt_data.actionContent) + '</div>' : '', opt_data.secondaryContent ? '<div class="aui-dialog2-header-secondary">' + soy.$$filterNoAutoescape(opt_data.secondaryContent) + '</div>' : '', opt_data.modal != true ? '<a class="aui-dialog2-header-close"><span class="aui-icon aui-icon-small aui-iconfont-close-dialog">' + soy.$$escapeHtml('aui.words.close') + '</span></a>' : '', '</header>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dialog.dialog2Header.soyTemplateName = 'aui.dialog.dialog2Header';
    }
  
    aui.dialog.dialog2Footer = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      output.append('<footer', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-dialog2-footer');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', opt_data.actionContent ? '<div class="aui-dialog2-footer-actions">' + soy.$$filterNoAutoescape(opt_data.actionContent) + '</div>' : '', opt_data.hintText || opt_data.hintContent ? '<div class="aui-dialog2-footer-hint">' + (opt_data.hintText ? soy.$$escapeHtml(opt_data.hintText) : '') + (opt_data.hintContent ? soy.$$filterNoAutoescape(opt_data.hintContent) : '') + '</div>' : '', '</footer>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dialog.dialog2Footer.soyTemplateName = 'aui.dialog.dialog2Footer';
    }
  
    aui.dialog.dialog2Panel = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-dialog2-content');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', opt_data.content ? soy.$$filterNoAutoescape(opt_data.content) : '', '</div>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dialog.dialog2Panel.soyTemplateName = 'aui.dialog.dialog2Panel';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/dropdown.js
__b65d69032912985f7c7807d799de727f = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from dropdown.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.dropdown.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.dropdown == 'undefined') {
      aui.dropdown = {};
    }
  
    aui.dropdown.trigger = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      output.append('<a', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-dd-trigger');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('><span class="dropdown-text">', opt_data.accessibilityText ? soy.$$escapeHtml(opt_data.accessibilityText) : '', '</span>', !(opt_data.showIcon == false) ? '<span class="icon icon-dropdown"></span>' : '', '</a>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dropdown.trigger.soyTemplateName = 'aui.dropdown.trigger';
    }
  
    aui.dropdown.menu = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'ul'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-dropdown hidden');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'ul'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dropdown.menu.soyTemplateName = 'aui.dropdown.menu';
    }
  
    aui.dropdown.parent = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-dd-parent');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dropdown.parent.soyTemplateName = 'aui.dropdown.parent';
    }
  
    aui.dropdown.item = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'li'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="dropdown-item');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('><a href="', soy.$$escapeHtml(opt_data.url ? opt_data.url : '#'), '">', soy.$$escapeHtml(opt_data.text), '</a></', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'li'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dropdown.item.soyTemplateName = 'aui.dropdown.item';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/dropdown2.js
__2f44d460b81252ad07580e7bfe99c655 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from dropdown2.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.dropdown2.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.dropdown2 == 'undefined') {
      aui.dropdown2 = {};
    }
  
    aui.dropdown2.dropdown2 = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.dropdown2.trigger(soy.$$augmentMap(opt_data.trigger, { menu: opt_data.menu }), output);
      aui.dropdown2.contents(opt_data.menu, output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dropdown2.dropdown2.soyTemplateName = 'aui.dropdown2.dropdown2';
    }
  
    aui.dropdown2.trigger = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      var param7 = new soy.StringBuilder('aui-dropdown2-trigger');
      aui.renderExtraClasses(opt_data, param7);
      aui.trigger.trigger(soy.$$augmentMap(opt_data, { extraClasses: param7.toString() }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dropdown2.trigger.soyTemplateName = 'aui.dropdown2.trigger';
    }
  
    aui.dropdown2.contents = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="aui-dropdown2');
      aui.renderExtraClasses(opt_data, output);
      output.append('" role="menu" aria-hidden="true"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('><div role="application">', opt_data.content ? soy.$$filterNoAutoescape(opt_data.content) : '', '</div></div>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dropdown2.contents.soyTemplateName = 'aui.dropdown2.contents';
    }
  
    aui.dropdown2.section = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-dropdown2-section');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', opt_data.label ? '<strong role="presentation" class="aui-dropdown2-heading">' + soy.$$escapeHtml(opt_data.label) + '</strong>' : '', soy.$$filterNoAutoescape(opt_data.content), '</div>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dropdown2.section.soyTemplateName = 'aui.dropdown2.section';
    }
  
    aui.dropdown2.itemGroup = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div ', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' role="presentation" class="aui-dropdown2-section');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', opt_data.label ? '<strong role="presentation" class="aui-dropdown2-heading">' + soy.$$escapeHtml(opt_data.label) + '</strong>' : '', '<div role="group"', opt_data.label ? ' aria-label="' + soy.$$escapeHtml(opt_data.label) + '"' : '', '>');
      aui.dropdown2.itemList(opt_data, output);
      output.append('</div></div>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dropdown2.itemGroup.soyTemplateName = 'aui.dropdown2.itemGroup';
    }
  
    aui.dropdown2.itemList = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<ul', opt_data.isTruncated ? ' class="aui-list-truncate"' : '', ' role="presentation">');
      var itemList76 = opt_data.items;
      var itemListLen76 = itemList76.length;
      for (var itemIndex76 = 0; itemIndex76 < itemListLen76; itemIndex76++) {
        var itemData76 = itemList76[itemIndex76];
        output.append('<li ', itemData76.isHidden ? 'class="aui-dropdown2-hidden" aria-hidden="true"' : '', ' role="presentation">');
        switch (itemData76.itemType) {
          case 'checkbox':
            aui.dropdown2.menuCheckbox(itemData76, output);
            break;
          case 'radio':
            aui.dropdown2.menuRadio(itemData76, output);
            break;
          default:
            aui.dropdown2.menuLink(itemData76, output);
        }
        output.append('</li>');
      }
      output.append('</ul>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dropdown2.itemList.soyTemplateName = 'aui.dropdown2.itemList';
    }
  
    aui.dropdown2.menuLink = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<a role="menuitem" tabindex="-1" class="');
      aui.renderExtraClasses(opt_data, output);
      output.append(opt_data.submenuTarget ? ' aui-dropdown2-sub-trigger' : '', opt_data.isDisabled ? ' aui-dropdown2-disabled' : '', '"', opt_data.href ? ' href="' + soy.$$escapeHtml(opt_data.href) + '"' : '', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', opt_data.isDisabled ? ' aria-disabled="' + soy.$$escapeHtml(opt_data.isDisabled) + '"' : '', opt_data.submenuTarget ? ' aria-controls="' + soy.$$escapeHtml(opt_data.submenuTarget) + '"' : '');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$escapeHtml(opt_data.text), '</a>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dropdown2.menuLink.soyTemplateName = 'aui.dropdown2.menuLink';
    }
  
    aui.dropdown2.menuCheckbox = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<span role="menuitemcheckbox" tabindex="-1" class="aui-dropdown2-checkbox', opt_data.isInteractive ? ' aui-dropdown2-interactive' : '', opt_data.isDisabled ? ' aui-dropdown2-disabled' : '', opt_data.isChecked ? ' aui-dropdown2-checked' : '');
      aui.renderExtraClasses(opt_data, output);
      output.append('"', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', opt_data.isChecked ? ' aria-checked="' + soy.$$escapeHtml(opt_data.isChecked) + '"' : ' aria-checked="false"', opt_data.isDisabled ? ' aria-disabled="' + soy.$$escapeHtml(opt_data.isDisabled) + '"' : '');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$escapeHtml(opt_data.text), '</span>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dropdown2.menuCheckbox.soyTemplateName = 'aui.dropdown2.menuCheckbox';
    }
  
    aui.dropdown2.menuRadio = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<span role="menuitemradio" tabindex="-1" class="aui-dropdown2-radio', opt_data.isInteractive ? ' aui-dropdown2-interactive' : '', opt_data.isDisabled ? ' aui-dropdown2-disabled' : '', opt_data.isChecked ? ' aui-dropdown2-checked' : '');
      aui.renderExtraClasses(opt_data, output);
      output.append('"', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', opt_data.isChecked ? ' aria-checked="' + soy.$$escapeHtml(opt_data.isChecked) + '"' : ' aria-checked="false"', opt_data.isDisabled ? ' aria-disabled="' + soy.$$escapeHtml(opt_data.isDisabled) + '"' : '');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$escapeHtml(opt_data.text), '</span>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.dropdown2.menuRadio.soyTemplateName = 'aui.dropdown2.menuRadio';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/expander.js
__d61e62de6ea2af775c8ad31ee31d613d = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from expander.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.expander.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.expander == 'undefined') {
      aui.expander = {};
    }
  
    aui.expander.content = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div id="', soy.$$escapeHtml(opt_data.id), '" class="aui-expander-content');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append(opt_data.initiallyExpanded ? ' aria-expanded="' + soy.$$escapeHtml(opt_data.initiallyExpanded) + '"' : '', '>', opt_data.content ? soy.$$filterNoAutoescape(opt_data.content) : '', '</div>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.expander.content.soyTemplateName = 'aui.expander.content';
    }
  
    aui.expander.trigger = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tag ? opt_data.tag : 'div'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', opt_data.replaceText ? ' data-replace-text="' + soy.$$escapeHtml(opt_data.replaceText) + '"' : '', opt_data.replaceSelector ? ' data-replace-selector="' + soy.$$escapeHtml(opt_data.replaceSelector) + '"' : '', ' class="aui-expander-trigger');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append(' aria-controls="', soy.$$escapeHtml(opt_data.contentId), '"', opt_data.collapsible ? ' data-collapsible="' + soy.$$escapeHtml(opt_data.collapsible) + '"' : '', '>', opt_data.content ? soy.$$filterNoAutoescape(opt_data.content) : '', '</', soy.$$escapeHtml(opt_data.tag ? opt_data.tag : 'div'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.expander.trigger.soyTemplateName = 'aui.expander.trigger';
    }
  
    aui.expander.revealText = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      var param60 = new soy.StringBuilder(soy.$$escapeHtml(opt_data.contentContent));
      aui.expander.trigger({ id: opt_data.triggerId, contentId: opt_data.contentId, tag: 'a', content: '<span class=\'reveal-text-trigger-text\'>Show more</span>', replaceSelector: '.reveal-text-trigger-text', replaceText: 'Show less', extraAttributes: opt_data.triggerExtraAttributes, extraClasses: (opt_data.triggerExtraClasses ? soy.$$escapeHtml(opt_data.triggerExtraClasses) + '  ' : '') + ' aui-expander-reveal-text' }, param60);
      aui.expander.content({ id: opt_data.contentId, content: param60.toString(), extraAttributes: opt_data.contentExtraAttributes, extraClasses: opt_data.contentExtraClasses }, output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.expander.revealText.soyTemplateName = 'aui.expander.revealText';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/form.js
__2c0440b4084d98ff7a978e653a23a004 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from form.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.form.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.form == 'undefined') {
      aui.form = {};
    }
  
    aui.form.form = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<form', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui', opt_data.isUnsectioned ? ' unsectioned' : '', opt_data.isLongLabels ? ' long-label' : '', opt_data.isTopLabels ? ' top-label' : '');
      aui.renderExtraClasses(opt_data, output);
      output.append('" action="', soy.$$escapeHtml(opt_data.action), '" method="', soy.$$escapeHtml(opt_data.method ? opt_data.method : 'post'), '"', opt_data.enctype ? ' enctype="' + soy.$$escapeHtml(opt_data.enctype) + '"' : '');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</form>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.form.soyTemplateName = 'aui.form.form';
    }
  
    aui.form.formDescription = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="field-group');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</div>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.formDescription.soyTemplateName = 'aui.form.formDescription';
    }
  
    aui.form.fieldset = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      var hasClass__soy51 = opt_data.isInline || opt_data.isDateSelect || opt_data.isGroup || opt_data.extraClasses;
      output.append('<fieldset', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
      if (hasClass__soy51) {
        output.append(' class="', soy.$$escapeHtml(opt_data.isInline ? 'inline' : opt_data.isDateSelect ? 'date-select' : opt_data.isGroup ? 'group' : ''));
        aui.renderExtraClasses(opt_data, output);
        output.append('"');
      }
      aui.renderExtraAttributes(opt_data, output);
      output.append('><legend><span>', soy.$$filterNoAutoescape(opt_data.legendContent), '</span></legend>', soy.$$filterNoAutoescape(opt_data.content), '</fieldset>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.fieldset.soyTemplateName = 'aui.form.fieldset';
    }
  
    aui.form.fieldGroup = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="field-group');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</div>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.fieldGroup.soyTemplateName = 'aui.form.fieldGroup';
    }
  
    aui.form.buttons = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div class="buttons-container', opt_data.alignment ? ' ' + soy.$$escapeHtml(opt_data.alignment) : '');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('><div class="buttons">', soy.$$filterNoAutoescape(opt_data.content), '</div></div>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.buttons.soyTemplateName = 'aui.form.buttons';
    }
  
    aui.form.label = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<label', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', opt_data.forField ? ' for="' + soy.$$escapeHtml(opt_data.forField) + '"' : '');
      if (opt_data.extraClasses) {
        output.append(' class="');
        aui.renderExtraClasses(opt_data, output);
        output.append('"');
      }
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), opt_data.isRequired ? '<span class="aui-icon icon-required"></span>' : '', '</label>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.label.soyTemplateName = 'aui.form.label';
    }
  
    aui.form.input = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      var baseType__soy126 = new soy.StringBuilder();
      switch (opt_data.type) {
        case 'password':
        case 'email':
        case 'url':
        case 'tel':
        case 'search':
          baseType__soy126.append('text');
          break;
        case 'submit':
        case 'reset':
          baseType__soy126.append('button');
          break;
        default:
          baseType__soy126.append(soy.$$escapeHtml(opt_data.type));
      }
      baseType__soy126 = baseType__soy126.toString();
      output.append('<input class="', soy.$$escapeHtml(baseType__soy126));
      aui.renderExtraClasses(opt_data, output);
      output.append(opt_data.icon && baseType__soy126 == 'text' ? ' aui-field-has-icon' : '', '" type="', soy.$$escapeHtml(opt_data.type), '" name="', opt_data.name ? soy.$$escapeHtml(opt_data.name) : soy.$$escapeHtml(opt_data.id), '"', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', opt_data.value ? ' value="' + soy.$$escapeHtml(opt_data.value) + '"' : '', (opt_data.type == 'checkbox' || opt_data.type == 'radio') && opt_data.isChecked ? ' checked="checked"' : '', baseType__soy126 == 'text' && opt_data.type != 'password' && opt_data.maxLength ? ' maxlength="' + soy.$$escapeHtml(opt_data.maxLength) + '"' : '', baseType__soy126 == 'text' && opt_data.type != 'password' && opt_data.size ? ' size="' + soy.$$escapeHtml(opt_data.size) + '"' : '', baseType__soy126 == 'text' && opt_data.placeholderText ? ' placeholder="' + soy.$$escapeHtml(opt_data.placeholderText) + '"' : '', baseType__soy126 == 'text' && opt_data.autocomplete ? ' autocomplete="' + soy.$$escapeHtml(opt_data.autocomplete) + '"' : '', opt_data.isDisabled ? ' disabled' : '', opt_data.isAutofocus ? ' autofocus' : '');
      aui.renderExtraAttributes(opt_data, output);
      aui.form.renderValidationArguments(opt_data, output);
      aui.form.renderInfoMessage(opt_data, output);
      aui.form.renderFieldComponentAttribute(opt_data, output);
      aui.form.renderTooltipArguments(opt_data, output);
      output.append('/>');
      if (opt_data.icon && baseType__soy126 == 'text') {
        aui.icons.icon({ icon: opt_data.icon, useIconFont: true, size: 'small' }, output);
      }
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.input.soyTemplateName = 'aui.form.input';
    }
  
    aui.form.renderValidationArguments = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      if (opt_data.validationArguments) {
        var argumentList203 = soy.$$getMapKeys(opt_data.validationArguments);
        var argumentListLen203 = argumentList203.length;
        for (var argumentIndex203 = 0; argumentIndex203 < argumentListLen203; argumentIndex203++) {
          var argumentData203 = argumentList203[argumentIndex203];
          output.append(argumentData203 == 'required' || argumentData203 == 'pattern' || argumentData203 == 'min' || argumentData203 == 'max' || argumentData203 == 'minlength' || argumentData203 == 'maxlength' ? ' ' + soy.$$escapeHtml(argumentData203) + '="' + soy.$$escapeHtml(opt_data.validationArguments[argumentData203]) + '"' : ' ' + soy.$$escapeHtml('data-aui-validation-' + argumentData203) + '="' + soy.$$escapeHtml(opt_data.validationArguments[argumentData203]) + '"');
        }
      }
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.renderValidationArguments.soyTemplateName = 'aui.form.renderValidationArguments';
    }
  
    aui.form.renderTooltipArguments = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      if (opt_data.tooltipArguments) {
        var argumentList221 = soy.$$getMapKeys(opt_data.tooltipArguments);
        var argumentListLen221 = argumentList221.length;
        for (var argumentIndex221 = 0; argumentIndex221 < argumentListLen221; argumentIndex221++) {
          var argumentData221 = argumentList221[argumentIndex221];
          output.append(' ', soy.$$escapeHtml('data-aui-notification-' + argumentData221), '="', soy.$$escapeHtml(opt_data.tooltipArguments[argumentData221]), '"');
        }
      }
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.renderTooltipArguments.soyTemplateName = 'aui.form.renderTooltipArguments';
    }
  
    aui.form.renderInfoMessage = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      output.append(opt_data.infoMessage ? ' data-aui-notification-info="' + soy.$$escapeHtml(opt_data.infoMessage) + '"' : '');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.renderInfoMessage.soyTemplateName = 'aui.form.renderInfoMessage';
    }
  
    aui.form.renderFieldComponentAttribute = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      output.append(opt_data.infoMessage ? ' data-aui-notification-field' : '', opt_data.validationArguments ? ' data-aui-validation-field' : '');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.renderFieldComponentAttribute.soyTemplateName = 'aui.form.renderFieldComponentAttribute';
    }
  
    aui.form.submit = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.form.button(soy.$$augmentMap(opt_data, { tagName: 'input', inputType: 'submit' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.submit.soyTemplateName = 'aui.form.submit';
    }
  
    aui.form.button = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      var param251 = new soy.StringBuilder(opt_data.name ? 'name="' + soy.$$escapeHtml(opt_data.name) + '"' : '');
      aui.renderExtraAttributes(opt_data, param251);
      aui.buttons.button(soy.$$augmentMap(opt_data, { extraClasses: opt_data.extraClasses, extraAttributes: param251.toString() }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.button.soyTemplateName = 'aui.form.button';
    }
  
    aui.form.linkButton = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      var param264 = new soy.StringBuilder('cancel');
      aui.renderExtraClasses(opt_data, param264);
      var param268 = new soy.StringBuilder(opt_data.name ? 'name="' + soy.$$escapeHtml(opt_data.name) + '"' : '');
      aui.renderExtraAttributes(opt_data, param268);
      aui.buttons.button(soy.$$augmentMap(opt_data, { tagName: 'a', type: 'link', href: opt_data.href ? opt_data.href : opt_data.url, extraClasses: param264.toString(), extraAttributes: param268.toString() }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.linkButton.soyTemplateName = 'aui.form.linkButton';
    }
  
    aui.form.textarea = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      output.append('<textarea name="', opt_data.name ? soy.$$escapeHtml(opt_data.name) : soy.$$escapeHtml(opt_data.id), '" class="textarea');
      aui.renderExtraClasses(opt_data, output);
      output.append(' ', opt_data.icon ? 'aui-field-has-icon' : '', '"', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', opt_data.rows ? ' rows="' + soy.$$escapeHtml(opt_data.rows) + '"' : '', opt_data.cols ? ' cols="' + soy.$$escapeHtml(opt_data.cols) + '"' : '', opt_data.autocomplete ? ' autocomplete="' + soy.$$escapeHtml(opt_data.autocomplete) + '"' : '', opt_data.isDisabled ? ' disabled' : '', opt_data.isAutofocus ? ' autofocus' : '', opt_data.placeholderText ? ' placeholder="' + soy.$$escapeHtml(opt_data.placeholderText) + '"' : '');
      aui.renderExtraAttributes(opt_data, output);
      aui.form.renderValidationArguments(opt_data, output);
      aui.form.renderInfoMessage(opt_data, output);
      aui.form.renderFieldComponentAttribute(opt_data, output);
      aui.form.renderTooltipArguments(opt_data, output);
      output.append('>', opt_data.value ? soy.$$escapeHtml(opt_data.value) : '', '</textarea>');
      if (opt_data.icon) {
        aui.icons.icon({ icon: opt_data.icon, useIconFont: true, size: 'small' }, output);
      }
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.textarea.soyTemplateName = 'aui.form.textarea';
    }
  
    aui.form.select = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<select', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' name="', opt_data.name ? soy.$$escapeHtml(opt_data.name) : soy.$$escapeHtml(opt_data.id), '" class="', soy.$$escapeHtml(opt_data.isMultiple ? 'multi-select' : 'select'));
      aui.renderExtraClasses(opt_data, output);
      output.append('"', opt_data.size ? ' size="' + soy.$$escapeHtml(opt_data.size) + '"' : '', opt_data.isDisabled ? ' disabled' : '', opt_data.isAutofocus ? ' autofocus' : '', opt_data.isMultiple ? ' multiple' : '');
      aui.renderExtraAttributes(opt_data, output);
      aui.form.renderValidationArguments(opt_data, output);
      aui.form.renderInfoMessage(opt_data, output);
      aui.form.renderFieldComponentAttribute(opt_data, output);
      aui.form.renderTooltipArguments(opt_data, output);
      output.append('>');
      var optionList375 = opt_data.options;
      var optionListLen375 = optionList375.length;
      for (var optionIndex375 = 0; optionIndex375 < optionListLen375; optionIndex375++) {
        var optionData375 = optionList375[optionIndex375];
        aui.form.optionOrOptgroup(soy.$$augmentMap(optionData375, { defaultValue: opt_data.value }), output);
      }
      output.append('</select>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.select.soyTemplateName = 'aui.form.select';
    }
  
    aui.form.optionOrOptgroup = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      if (opt_data.options) {
        output.append('<optgroup label="', soy.$$escapeHtml(opt_data.text), '"', opt_data.disabled ? ' disabled' : '', '>');
        var optionList390 = opt_data.options;
        var optionListLen390 = optionList390.length;
        for (var optionIndex390 = 0; optionIndex390 < optionListLen390; optionIndex390++) {
          var optionData390 = optionList390[optionIndex390];
          aui.form.optionOrOptgroup(soy.$$augmentMap(optionData390, { defaultValue: opt_data.defaultValue }), output);
        }
        output.append('</optgroup>');
      } else {
        output.append('<option value="', soy.$$escapeHtml(opt_data.value), '"', opt_data.selected || opt_data.defaultValue == opt_data.value ? ' selected' : '', opt_data.disabled ? ' disabled' : '', '>', soy.$$escapeHtml(opt_data.text), '</option>');
      }
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.optionOrOptgroup.soyTemplateName = 'aui.form.optionOrOptgroup';
    }
  
    aui.form.value = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<span', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="field-value');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</span>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.value.soyTemplateName = 'aui.form.value';
    }
  
    aui.form.field = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      var isCheckboxOrRadio__soy424 = opt_data.type == 'checkbox' || opt_data.type == 'radio';
      var fieldWidthClass__soy425 = opt_data.fieldWidth ? opt_data.fieldWidth + '-field' : '';
      output.append('<div class="', isCheckboxOrRadio__soy424 ? soy.$$escapeHtml(opt_data.type) : 'field-group');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>');
      if (opt_data.labelContent && !isCheckboxOrRadio__soy424) {
        aui.form.label({ forField: opt_data.id, isRequired: opt_data.isRequired, content: opt_data.labelContent }, output);
      }
      switch (opt_data.type) {
        case 'textarea':
          aui.form.textarea({ id: opt_data.id, name: opt_data.name, value: opt_data.value, rows: opt_data.rows, cols: opt_data.cols, autocomplete: opt_data.autocomplete, placeholderText: opt_data.placeholderText, isDisabled: opt_data.isDisabled ? true : false, isAutofocus: opt_data.isAutofocus, extraClasses: fieldWidthClass__soy425, icon: opt_data.icon, validationArguments: opt_data.validationArguments, infoMessage: opt_data.infoMessage, tooltipArguments: opt_data.tooltipArguments }, output);
          break;
        case 'select':
          aui.form.select({ id: opt_data.id, name: opt_data.name, value: opt_data.value, options: opt_data.options, isMultiple: opt_data.isMultiple, size: opt_data.size, isDisabled: opt_data.isDisabled ? true : false, isAutofocus: opt_data.isAutofocus, extraClasses: fieldWidthClass__soy425, validationArguments: opt_data.validationArguments, infoMessage: opt_data.infoMessage, tooltipArguments: opt_data.tooltipArguments }, output);
          break;
        case 'value':
          aui.form.value({ id: opt_data.id, content: '' + soy.$$escapeHtml(opt_data.value) }, output);
          break;
        case 'text':
        case 'password':
        case 'email':
        case 'url':
        case 'tel':
        case 'search':
        case 'file':
        case 'radio':
        case 'checkbox':
        case 'button':
        case 'submit':
        case 'reset':
          aui.form.input({ id: opt_data.id, name: opt_data.name, type: opt_data.type, value: opt_data.value, maxLength: opt_data.maxLength, size: opt_data.size, autocomplete: opt_data.autocomplete, placeholderText: opt_data.placeholderText, isChecked: opt_data.isChecked, isDisabled: opt_data.isDisabled ? true : false, isAutofocus: opt_data.isAutofocus, extraClasses: fieldWidthClass__soy425, icon: opt_data.icon, validationArguments: opt_data.validationArguments, infoMessage: opt_data.infoMessage, tooltipArguments: opt_data.tooltipArguments }, output);
          break;
      }
      if (opt_data.labelContent && isCheckboxOrRadio__soy424) {
        aui.form.label({ forField: opt_data.id, isRequired: opt_data.isRequired, content: opt_data.labelContent }, output);
      }
      if (opt_data.descriptionText || opt_data.descriptionContent) {
        aui.form.fieldDescription({ text: opt_data.descriptionText, content: opt_data.descriptionContent }, output);
      }
      if (opt_data.errorTexts) {
        var errorList510 = opt_data.errorTexts;
        var errorListLen510 = errorList510.length;
        for (var errorIndex510 = 0; errorIndex510 < errorListLen510; errorIndex510++) {
          var errorData510 = errorList510[errorIndex510];
          aui.form.fieldError({ message: errorData510 }, output);
        }
      }
      output.append('</div>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.field.soyTemplateName = 'aui.form.field';
    }
  
    aui.form.fieldError = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div class="error');
      aui.renderExtraClasses(opt_data, output);
      output.append('">', soy.$$escapeHtml(opt_data.message), '</div>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.fieldError.soyTemplateName = 'aui.form.fieldError';
    }
  
    aui.form.fieldDescription = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div class="description');
      aui.renderExtraClasses(opt_data, output);
      output.append('">', opt_data.text ? soy.$$escapeHtml(opt_data.text) : opt_data.message ? soy.$$escapeHtml(opt_data.message) : soy.$$filterNoAutoescape(opt_data.content), '</div>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.fieldDescription.soyTemplateName = 'aui.form.fieldDescription';
    }
  
    aui.form.textField = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.form.field(soy.$$augmentMap(opt_data, { type: 'text' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.textField.soyTemplateName = 'aui.form.textField';
    }
  
    aui.form.textareaField = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.form.field(soy.$$augmentMap(opt_data, { type: 'textarea' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.textareaField.soyTemplateName = 'aui.form.textareaField';
    }
  
    aui.form.passwordField = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.form.field(soy.$$augmentMap(opt_data, { type: 'password' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.passwordField.soyTemplateName = 'aui.form.passwordField';
    }
  
    aui.form.fileField = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.form.field(soy.$$augmentMap(opt_data, { type: 'file' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.fileField.soyTemplateName = 'aui.form.fileField';
    }
  
    aui.form.selectField = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.form.field(soy.$$augmentMap(opt_data, { type: 'select' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.selectField.soyTemplateName = 'aui.form.selectField';
    }
  
    aui.form.checkboxField = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      var param555 = new soy.StringBuilder(opt_data.isMatrix ? '<div class="matrix">' : '');
      var fieldList559 = opt_data.fields;
      var fieldListLen559 = fieldList559.length;
      for (var fieldIndex559 = 0; fieldIndex559 < fieldListLen559; fieldIndex559++) {
        var fieldData559 = fieldList559[fieldIndex559];
        aui.form.field(soy.$$augmentMap(fieldData559, { type: 'checkbox', labelContent: '' + soy.$$escapeHtml(fieldData559.labelText) }), param555);
      }
      param555.append(opt_data.isMatrix ? '</div>' : '');
      if (opt_data.descriptionText || opt_data.descriptionContent || opt_data.errorTexts && opt_data.errorTexts.length) {
        aui.form.field({ descriptionText: opt_data.descriptionText, descriptionContent: opt_data.descriptionContent, errorTexts: opt_data.errorTexts, isDisabled: false }, param555);
      }
      aui.form.fieldset({ legendContent: opt_data.legendContent + (opt_data.isRequired ? '<span class="aui-icon icon-required"></span>' : ''), isGroup: true, id: opt_data.id, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, content: param555.toString() }, output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.checkboxField.soyTemplateName = 'aui.form.checkboxField';
    }
  
    aui.form.radioField = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      var param582 = new soy.StringBuilder(opt_data.isMatrix ? '<div class="matrix">' : '');
      var fieldList586 = opt_data.fields;
      var fieldListLen586 = fieldList586.length;
      for (var fieldIndex586 = 0; fieldIndex586 < fieldListLen586; fieldIndex586++) {
        var fieldData586 = fieldList586[fieldIndex586];
        aui.form.field(soy.$$augmentMap(fieldData586, { type: 'radio', name: opt_data.name ? opt_data.name : opt_data.id, labelContent: '' + soy.$$escapeHtml(fieldData586.labelText) }), param582);
      }
      param582.append(opt_data.isMatrix ? '</div>' : '');
      if (opt_data.descriptionText || opt_data.descriptionContent || opt_data.errorTexts && opt_data.errorTexts.length) {
        aui.form.field({ descriptionText: opt_data.descriptionText, descriptionContent: opt_data.descriptionContent, errorTexts: opt_data.errorTexts, isDisabled: false }, param582);
      }
      aui.form.fieldset({ legendContent: opt_data.legendContent + (opt_data.isRequired ? '<span class="aui-icon icon-required"></span>' : ''), isGroup: true, id: opt_data.id, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, content: param582.toString() }, output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.radioField.soyTemplateName = 'aui.form.radioField';
    }
  
    aui.form.valueField = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.form.field(soy.$$augmentMap(opt_data, { type: 'value' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.valueField.soyTemplateName = 'aui.form.valueField';
    }
  
    aui.form.emailField = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.form.field(soy.$$augmentMap(opt_data, { type: 'email' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.emailField.soyTemplateName = 'aui.form.emailField';
    }
  
    aui.form.urlField = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.form.field(soy.$$augmentMap(opt_data, { type: 'url' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.urlField.soyTemplateName = 'aui.form.urlField';
    }
  
    aui.form.telephoneField = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.form.field(soy.$$augmentMap(opt_data, { type: 'tel' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.telephoneField.soyTemplateName = 'aui.form.telephoneField';
    }
  
    aui.form.searchField = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.form.field(soy.$$augmentMap(opt_data, { type: 'search' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.form.searchField.soyTemplateName = 'aui.form.searchField';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/group.js
__f5250e4119ec9b2ac6762f8d365a63cf = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from group.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.group.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.group == 'undefined') {
      aui.group = {};
    }
  
    aui.group.group = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-group', opt_data.isSplit ? ' aui-group-split' : '');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.group.group.soyTemplateName = 'aui.group.group';
    }
  
    aui.group.item = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-item');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.group.item.soyTemplateName = 'aui.group.item';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/icons.js
__7e2229eab30d9eaf5f17f6ba06cccf5c = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from icons.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.icons.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.icons == 'undefined') {
      aui.icons = {};
    }
  
    aui.icons.icon = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-icon', opt_data.useIconFont ? ' aui-icon-' + soy.$$escapeHtml(opt_data.size ? opt_data.size : 'small') : '', ' aui', soy.$$escapeHtml(opt_data.useIconFont ? '-iconfont' : '-icon'), soy.$$escapeHtml(opt_data.iconFontSet ? '-' + opt_data.iconFontSet : ''), '-', soy.$$escapeHtml(opt_data.icon));
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', opt_data.accessibilityText ? soy.$$escapeHtml(opt_data.accessibilityText) : '', '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.icons.icon.soyTemplateName = 'aui.icons.icon';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/inline-dialog2.js
__865e5bcee83658888ba45f05f135b02a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from inline-dialog2.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.inlineDialog2.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.inlineDialog2 == 'undefined') {
      aui.inlineDialog2 = {};
    }
  
    aui.inlineDialog2.inlineDialog2 = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<aui-inline-dialog ', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', '  class="');
      aui.renderExtraClasses(opt_data, output);
      output.append('"', opt_data.alignment ? 'alignment="' + soy.$$escapeHtml(opt_data.alignment) + '"' : '', opt_data.respondsTo ? 'responds-to="' + soy.$$escapeHtml(opt_data.respondsTo) + '"' : '');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', opt_data.content ? soy.$$filterNoAutoescape(opt_data.content) : '', '</aui-inline-dialog>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.inlineDialog2.inlineDialog2.soyTemplateName = 'aui.inlineDialog2.inlineDialog2';
    }
  
    aui.inlineDialog2.trigger = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.trigger.trigger(soy.$$augmentMap(opt_data, { showIcon: opt_data.showIcon ? opt_data.showIcon : false }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.inlineDialog2.trigger.soyTemplateName = 'aui.inlineDialog2.trigger';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/labels.js
__9c940e6da939333c698993d78782970a = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from labels.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.labels.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.labels == 'undefined') {
      aui.labels = {};
    }
  
    aui.labels.label = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      if (opt_data.url && opt_data.isCloseable == true) {
        output.append('<span', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-label aui-label-closeable aui-label-split');
        aui.renderExtraClasses(opt_data, output);
        output.append('"');
        aui.renderExtraAttributes(opt_data, output);
        output.append('><a class="aui-label-split-main" href="', soy.$$escapeHtml(opt_data.url), '">', soy.$$escapeHtml(opt_data.text), '</a><span class="aui-label-split-close" >');
        aui.labels.closeIcon(opt_data, output);
        output.append('</span></span>');
      } else {
        output.append('<', soy.$$escapeHtml(opt_data.url ? 'a' : 'span'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-label', opt_data.isCloseable ? ' aui-label-closeable' : '');
        aui.renderExtraClasses(opt_data, output);
        output.append('"');
        aui.renderExtraAttributes(opt_data, output);
        output.append(opt_data.url ? ' href="' + soy.$$escapeHtml(opt_data.url) + '"' : '', '>', soy.$$escapeHtml(opt_data.text));
        if (opt_data.isCloseable) {
          aui.labels.closeIcon(opt_data, output);
        }
        output.append('</', soy.$$escapeHtml(opt_data.url ? 'a' : 'span'), '>');
      }
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.labels.label.soyTemplateName = 'aui.labels.label';
    }
  
    aui.labels.closeIcon = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<span tabindex="0" class="aui-icon aui-icon-close"');
      if (opt_data.hasTitle != false) {
        output.append(' title="');
        aui.labels.closeIconText(opt_data, output);
        output.append('"');
      }
      output.append('>');
      aui.labels.closeIconText(opt_data, output);
      output.append('</span>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.labels.closeIcon.soyTemplateName = 'aui.labels.closeIcon';
    }
  
    aui.labels.closeIconText = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append(opt_data.closeIconText ? soy.$$escapeHtml(opt_data.closeIconText) : '(' + soy.$$escapeHtml('aui.words.remove') + ' ' + soy.$$escapeHtml(opt_data.text) + ')');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.labels.closeIconText.soyTemplateName = 'aui.labels.closeIconText';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/lozenges.js
__32b01fb92537ac89b5e40496e454215c = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from lozenges.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.lozenges.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.lozenges == 'undefined') {
      aui.lozenges = {};
    }
  
    aui.lozenges.lozenge = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', opt_data.title ? ' title="' + soy.$$escapeHtml(opt_data.title) + '"' : '', ' class="aui-lozenge', soy.$$escapeHtml(opt_data.type ? ' aui-lozenge-' + opt_data.type : ''), soy.$$escapeHtml(opt_data.isSubtle ? ' aui-lozenge-subtle' : ''));
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', opt_data.maxLength ? soy.$$truncate(soy.$$escapeHtml(opt_data.text), opt_data.maxLength, true) : soy.$$escapeHtml(opt_data.text), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'span'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.lozenges.lozenge.soyTemplateName = 'aui.lozenges.lozenge';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/message.js
__3242d211fcb0bdb2563ade78db19a5dc = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from message.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.message.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.message == 'undefined') {
      aui.message = {};
    }
  
    aui.message.info = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.message.message(soy.$$augmentMap(opt_data, { type: 'info' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.message.info.soyTemplateName = 'aui.message.info';
    }
  
    aui.message.warning = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.message.message(soy.$$augmentMap(opt_data, { type: 'warning' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.message.warning.soyTemplateName = 'aui.message.warning';
    }
  
    aui.message.error = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.message.message(soy.$$augmentMap(opt_data, { type: 'error' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.message.error.soyTemplateName = 'aui.message.error';
    }
  
    aui.message.success = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.message.message(soy.$$augmentMap(opt_data, { type: 'success' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.message.success.soyTemplateName = 'aui.message.success';
    }
  
    aui.message.hint = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.message.message(soy.$$augmentMap(opt_data, { type: 'hint' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.message.hint.soyTemplateName = 'aui.message.hint';
    }
  
    aui.message.generic = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.message.message(soy.$$augmentMap(opt_data, { type: 'generic' }), output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.message.generic.soyTemplateName = 'aui.message.generic';
    }
  
    aui.message.message = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      var theTagName__soy21 = opt_data.tagName ? opt_data.tagName : 'div';
      var theType__soy22 = opt_data.type ? opt_data.type : 'generic';
      output.append('<', soy.$$escapeHtml(theTagName__soy21), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-message aui-message-', soy.$$escapeHtml(theType__soy22), ' ', soy.$$escapeHtml(theType__soy22), opt_data.isCloseable ? ' closeable' : '', opt_data.isShadowed ? ' shadowed' : '');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', opt_data.titleContent ? '<p class="title"><strong>' + soy.$$filterNoAutoescape(opt_data.titleContent) + '</strong></p>' : '', soy.$$filterNoAutoescape(opt_data.content), opt_data.isCloseable ? '<span class="aui-icon icon-close" role="button" tabindex="0"></span>' : '', '</', soy.$$escapeHtml(theTagName__soy21), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.message.message.soyTemplateName = 'aui.message.message';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/navigation.js
__373fc8243f302a9b580d77bff56aad6b = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from navigation.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.navigation.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.navigation == 'undefined') {
      aui.navigation = {};
    }
  
    aui.navigation.item = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<li class="', opt_data.isSelected || opt_data.key && opt_data.selectedItemKey == opt_data.key ? 'aui-nav-selected' : '');
      aui.renderExtraClasses(opt_data, output);
      output.append('"', opt_data.isCollapsible && opt_data.children && opt_data.children.length > 0 ? 'aria-expanded="' + (opt_data.isCollapsed ? 'false' : 'true') + '"' : '');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>');
      if (opt_data.children && opt_data.children.length > 0 && opt_data.isCollapsible) {
        output.append('<a href="#" class="aui-nav-subtree-toggle">');
        aui.icons.icon({ icon: opt_data.isCollapsed ? 'collapsed' : 'expanded', size: 'small', useIconFont: true }, output);
        output.append('</a>');
      }
      output.append('<a class="aui-nav-item" href="', soy.$$escapeHtml(opt_data.href), '">');
      if (opt_data.iconClass && !opt_data.isChild) {
        aui.icons.icon({ icon: opt_data.iconClass, size: 'small', useIconFont: true }, output);
      }
      output.append(opt_data.count == 0 || opt_data.count ? '<span class="aui-badge">' + soy.$$escapeHtml(opt_data.count) + '</span>' : '', '<span class="aui-nav-item-label">', soy.$$escapeHtml(opt_data.label), '</span></a>');
      if (opt_data.children && opt_data.children.length > 0) {
        aui.navigation.nav({ items: opt_data.children, selectedItemKey: opt_data.selectedItemKey, isChild: true }, output);
      }
      output.append('</li>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.navigation.item.soyTemplateName = 'aui.navigation.item';
    }
  
    aui.navigation.nav = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<ul class="aui-nav');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>');
      var itemList58 = opt_data.items;
      var itemListLen58 = itemList58.length;
      for (var itemIndex58 = 0; itemIndex58 < itemListLen58; itemIndex58++) {
        var itemData58 = itemList58[itemIndex58];
        aui.navigation.item(soy.$$augmentMap(itemData58, { isChild: opt_data.isChild, selectedItemKey: opt_data.selectedItemKey }), output);
      }
      output.append('</ul>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.navigation.nav.soyTemplateName = 'aui.navigation.nav';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/page.js
__913913859fa0c27ac72fb848024994ba = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from page.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.page.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.page == 'undefined') {
      aui.page = {};
    }
  
    aui.page.document = function (opt_data, opt_sb, opt_ijData) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<!DOCTYPE html><html lang="', soy.$$escapeHtml(opt_ijData.language ? opt_ijData.language : 'en'), '">');
      aui.page.documentHTMLContent(opt_data, output, opt_ijData);
      output.append('</html>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.page.document.soyTemplateName = 'aui.page.document';
    }
  
    aui.page.documentHTMLContent = function (opt_data, opt_sb, opt_ijData) {
      var output = opt_sb || new soy.StringBuilder();
      var thePageSize__soy9 = opt_data.pageSize ? opt_data.pageSize : opt_data.focusedPageSize ? opt_data.focusedPageSize : 'xlarge';
      output.append('<head><meta charset="utf-8"><meta http-equiv="X-UA-Compatible" content="IE=edge"><title>', soy.$$escapeHtml(opt_data.windowTitle), '</title>', opt_data.headContent ? soy.$$filterNoAutoescape(opt_data.headContent) : '', '</head><body');
      if (opt_data.pageType) {
        if (opt_data.pageType == 'generic') {
          if (opt_data.extraClasses) {
            output.append(' class="');
            aui.renderExtraClasses(opt_data, output, opt_ijData);
            output.append('"');
          }
        } else if (opt_data.pageType == 'focused') {
          output.append(' class="aui-page-focused aui-page-focused-', soy.$$escapeHtml(thePageSize__soy9), ' aui-page-size-', soy.$$escapeHtml(thePageSize__soy9));
          aui.renderExtraClasses(opt_data, output, opt_ijData);
          output.append('"');
        } else if (opt_data.pageType == 'notification') {
          output.append(' class="aui-page-notification aui-page-size-', soy.$$escapeHtml(thePageSize__soy9));
          aui.renderExtraClasses(opt_data, output, opt_ijData);
          output.append('"');
        } else if (opt_data.pageType == 'sidebar') {
          output.append(' class="aui-page-sidebar', soy.$$escapeHtml(opt_data.sidebarState ? ' aui-sidebar-' + opt_data.sidebarState : ''));
          aui.renderExtraClasses(opt_data, output, opt_ijData);
          output.append('"');
        } else {
          output.append(' class="aui-page-', soy.$$escapeHtml(opt_data.pageType));
          aui.renderExtraClasses(opt_data, output, opt_ijData);
          output.append('"');
        }
      } else {
        output.append(' class="');
        aui.renderExtraClasses(opt_data, output, opt_ijData);
        output.append('"');
      }
      aui.renderExtraAttributes(opt_data, output, opt_ijData);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</body>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.page.documentHTMLContent.soyTemplateName = 'aui.page.documentHTMLContent';
    }
  
    aui.page.page = function (opt_data, opt_sb, opt_ijData) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div id="page"><header id="header" role="banner">', soy.$$filterNoAutoescape(opt_data.headerContent), '</header><!-- #header --><section id="content" role="main">', soy.$$filterNoAutoescape(opt_data.contentContent), '</section><!-- #content --><footer id="footer" role="contentinfo">', soy.$$filterNoAutoescape(opt_data.footerContent), '</footer><!-- #footer --></div><!-- #page -->');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.page.page.soyTemplateName = 'aui.page.page';
    }
  
    aui.page.header = function (opt_data, opt_sb, opt_ijData) {
      var output = opt_sb || new soy.StringBuilder();
      output.append(opt_data.bannerContent ? '<div class="aui-banner aui-banner-error" role="banner">' + soy.$$filterNoAutoescape(opt_data.bannerContent) + '</div>' : '', '<nav', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-header aui-dropdown2-trigger-group');
      aui.renderExtraClasses(opt_data, output, opt_ijData);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output, opt_ijData);
      output.append(' role="navigation"><div class="aui-header-inner">', opt_data.headerBeforeContent ? '<div class="aui-header-before">' + soy.$$filterNoAutoescape(opt_data.headerBeforeContent) + '</div>' : '', '<div class="aui-header-primary"><h1 id="logo" class="aui-header-logo', opt_data.headerLogoImageUrl ? ' aui-header-logo-custom' : opt_data.logo ? ' aui-header-logo-' + soy.$$escapeHtml(opt_data.logo) : '', '"><a href="', soy.$$escapeHtml(opt_data.headerLink ? opt_data.headerLink : '/'), '">', opt_data.headerLogoImageUrl ? '<img src="' + soy.$$escapeHtml(opt_data.headerLogoImageUrl) + '" alt="' + soy.$$escapeHtml(opt_data.headerLogoText) + '" />' : '<span class="aui-header-logo-device">' + soy.$$escapeHtml(opt_data.headerLogoText ? opt_data.headerLogoText : '') + '</span>', opt_data.headerText ? '<span class="aui-header-logo-text">' + soy.$$escapeHtml(opt_data.headerText) + '</span>' : '', '</a></h1>', opt_data.primaryNavContent ? soy.$$filterNoAutoescape(opt_data.primaryNavContent) : '', '</div>', opt_data.secondaryNavContent ? '<div class="aui-header-secondary">' + soy.$$filterNoAutoescape(opt_data.secondaryNavContent) + '</div>' : '', opt_data.headerAfterContent ? '<div class="aui-header-after">' + soy.$$filterNoAutoescape(opt_data.headerAfterContent) + '</div>' : '', '</div><!-- .aui-header-inner--></nav><!-- .aui-header -->');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.page.header.soyTemplateName = 'aui.page.header';
    }
  
    aui.page.pagePanel = function (opt_data, opt_sb, opt_ijData) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), ' class="aui-page-panel');
      aui.renderExtraClasses(opt_data, output, opt_ijData);
      output.append('"', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
      aui.renderExtraAttributes(opt_data, output, opt_ijData);
      output.append('><div class="aui-page-panel-inner">', soy.$$filterNoAutoescape(opt_data.content), '</div><!-- .aui-page-panel-inner --></', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '><!-- .aui-page-panel -->');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.page.pagePanel.soyTemplateName = 'aui.page.pagePanel';
    }
  
    aui.page.pagePanelNav = function (opt_data, opt_sb, opt_ijData) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), ' class="aui-page-panel-nav');
      aui.renderExtraClasses(opt_data, output, opt_ijData);
      output.append('"', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
      aui.renderExtraAttributes(opt_data, output, opt_ijData);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '><!-- .aui-page-panel-nav -->');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.page.pagePanelNav.soyTemplateName = 'aui.page.pagePanelNav';
    }
  
    aui.page.pagePanelContent = function (opt_data, opt_sb, opt_ijData) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section'), ' class="aui-page-panel-content');
      aui.renderExtraClasses(opt_data, output, opt_ijData);
      output.append('"', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
      aui.renderExtraAttributes(opt_data, output, opt_ijData);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section'), '><!-- .aui-page-panel-content -->');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.page.pagePanelContent.soyTemplateName = 'aui.page.pagePanelContent';
    }
  
    aui.page.pagePanelSidebar = function (opt_data, opt_sb, opt_ijData) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'aside'), ' class="aui-page-panel-sidebar');
      aui.renderExtraClasses(opt_data, output, opt_ijData);
      output.append('"', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
      aui.renderExtraAttributes(opt_data, output, opt_ijData);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'aside'), '><!-- .aui-page-panel-sidebar -->');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.page.pagePanelSidebar.soyTemplateName = 'aui.page.pagePanelSidebar';
    }
  
    aui.page.pagePanelItem = function (opt_data, opt_sb, opt_ijData) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section'), ' class="aui-page-panel-item');
      aui.renderExtraClasses(opt_data, output, opt_ijData);
      output.append('"', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
      aui.renderExtraAttributes(opt_data, output, opt_ijData);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'section'), '><!-- .aui-page-panel-item -->');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.page.pagePanelItem.soyTemplateName = 'aui.page.pagePanelItem';
    }
  
    aui.page.pageHeader = function (opt_data, opt_sb, opt_ijData) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<header class="aui-page-header');
      aui.renderExtraClasses(opt_data, output, opt_ijData);
      output.append('"', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
      aui.renderExtraAttributes(opt_data, output, opt_ijData);
      output.append('><div class="aui-page-header-inner">', soy.$$filterNoAutoescape(opt_data.content), '</div><!-- .aui-page-header-inner --></header><!-- .aui-page-header -->');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.page.pageHeader.soyTemplateName = 'aui.page.pageHeader';
    }
  
    aui.page.pageHeaderImage = function (opt_data, opt_sb, opt_ijData) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div class="aui-page-header-image');
      aui.renderExtraClasses(opt_data, output, opt_ijData);
      output.append('"', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
      aui.renderExtraAttributes(opt_data, output, opt_ijData);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</div><!-- .aui-page-header-image -->');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.page.pageHeaderImage.soyTemplateName = 'aui.page.pageHeaderImage';
    }
  
    aui.page.pageHeaderMain = function (opt_data, opt_sb, opt_ijData) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div class="aui-page-header-main');
      aui.renderExtraClasses(opt_data, output, opt_ijData);
      output.append('"', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
      aui.renderExtraAttributes(opt_data, output, opt_ijData);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</div><!-- .aui-page-header-main -->');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.page.pageHeaderMain.soyTemplateName = 'aui.page.pageHeaderMain';
    }
  
    aui.page.pageHeaderActions = function (opt_data, opt_sb, opt_ijData) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div class="aui-page-header-actions');
      aui.renderExtraClasses(opt_data, output, opt_ijData);
      output.append('"', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '');
      aui.renderExtraAttributes(opt_data, output, opt_ijData);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</div><!-- .aui-page-header-actions -->');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.page.pageHeaderActions.soyTemplateName = 'aui.page.pageHeaderActions';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/panel.js
__eea14c2c68f43fbee0123ef9adb03cb8 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from panel.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
  
    aui.panel = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-panel');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.panel.soyTemplateName = 'aui.panel';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/progress-tracker.js
__cf6359adf3362392d2ffa1309eceae7b = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from progress-tracker.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.progressTracker.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.progressTracker == 'undefined') {
      aui.progressTracker = {};
    }
  
    aui.progressTracker.progressTracker = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<ol', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-progress-tracker', opt_data.isInverted ? ' aui-progress-tracker-inverted' : '');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>');
      var param18 = new soy.StringBuilder();
      var currentStepList19 = opt_data.steps;
      var currentStepListLen19 = currentStepList19.length;
      for (var currentStepIndex19 = 0; currentStepIndex19 < currentStepListLen19; currentStepIndex19++) {
        var currentStepData19 = currentStepList19[currentStepIndex19];
        if (currentStepData19['isCurrent']) {
          var stepList22 = opt_data.steps;
          var stepListLen22 = stepList22.length;
          for (var stepIndex22 = 0; stepIndex22 < stepListLen22; stepIndex22++) {
            var stepData22 = stepList22[stepIndex22];
            aui.progressTracker.step(soy.$$augmentMap(stepData22, { width: Math.round(100 / opt_data.steps.length * 10000) / 10000, href: stepIndex22 < currentStepIndex19 ? stepData22['href'] : null }), param18);
          }
        }
      }
      aui.progressTracker.content({ steps: opt_data.steps, content: param18.toString() }, output);
      output.append('</ol>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.progressTracker.progressTracker.soyTemplateName = 'aui.progressTracker.progressTracker';
    }
  
    aui.progressTracker.content = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      if (opt_data.content != '') {
        output.append(soy.$$filterNoAutoescape(opt_data.content));
      } else {
        var stepList36 = opt_data.steps;
        var stepListLen36 = stepList36.length;
        for (var stepIndex36 = 0; stepIndex36 < stepListLen36; stepIndex36++) {
          var stepData36 = stepList36[stepIndex36];
          aui.progressTracker.step(soy.$$augmentMap(stepData36, { isCurrent: stepIndex36 == 0, width: Math.round(100 / opt_data.steps.length * 10000) / 10000, href: null }), output);
        }
      }
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.progressTracker.content.soyTemplateName = 'aui.progressTracker.content';
    }
  
    aui.progressTracker.step = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<li', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-progress-tracker-step', opt_data.isCurrent ? ' aui-progress-tracker-step-current' : '');
      aui.renderExtraClasses(opt_data, output);
      output.append('" style="width: ', soy.$$escapeHtml(opt_data.width), '%;"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('><', soy.$$escapeHtml(opt_data.href ? 'a' : 'span'), opt_data.href ? ' href="' + soy.$$escapeHtml(opt_data.href) + '"' : '', '>', soy.$$escapeHtml(opt_data.text), '</', soy.$$escapeHtml(opt_data.href ? 'a' : 'span'), '></li>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.progressTracker.step.soyTemplateName = 'aui.progressTracker.step';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/sidebar.js
__8245ebb5dc16c48c0b1b56d8956f208e = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from sidebar.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.sidebar.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.sidebar == 'undefined') {
      aui.sidebar = {};
    }
  
    aui.sidebar.sidebar = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', opt_data.state ? ' aria-expanded="' + (opt_data.state == 'collapsed' ? 'false' : 'true') + '"' : '', ' class="aui-sidebar ', opt_data.isAnimated ? 'aui-is-animated' : '');
      aui.renderExtraClasses(opt_data, output);
      output.append('" ', opt_data.isResponsive == false ? 'data-aui-responsive="false"' : '');
      aui.renderExtraAttributes(opt_data, output);
      output.append('><div class="aui-sidebar-wrapper"><div class="aui-sidebar-body">', soy.$$filterNoAutoescape(opt_data.headerContent), soy.$$filterNoAutoescape(opt_data.content), '</div><div class="aui-sidebar-footer">', opt_data.footerContent ? soy.$$filterNoAutoescape(opt_data.footerContent) : opt_data.settingsButtonUrl && opt_data.settingsText ? '<a href="' + soy.$$escapeHtml(opt_data.settingsButtonUrl) + '" class="aui-button aui-button-subtle aui-sidebar-settings-button' + (opt_data.isSettingsButtonSelected ? ' aui-sidebar-settings-selected' : '') + '" data-tooltip="' + soy.$$escapeHtml(opt_data.settingsTooltip ? opt_data.settingsTooltip : opt_data.settingsText) + '"><span class="aui-icon aui-icon-small aui-iconfont-configure"></span><span class="aui-button-label">' + soy.$$escapeHtml(opt_data.settingsText) + '</span></a>' : '', '<a class="aui-button aui-button-subtle aui-sidebar-toggle aui-sidebar-footer-tipsy" data-tooltip="', soy.$$escapeHtml('aui.sidebar.expand.tooltip'), '" href="#"><span class="aui-icon aui-icon-small"></span></a></div>', opt_data.isResizable ? '<div class="aui-sidebar-handle"></div>' : '', '</div></', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.sidebar.sidebar.soyTemplateName = 'aui.sidebar.sidebar';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/table.js
__13222f91706995ac525bbb774a86297b = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from table.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
  
    aui.table = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<table', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', opt_data.columnsContent ? soy.$$filterNoAutoescape(opt_data.columnsContent) : '', opt_data.captionContent ? '<caption>' + soy.$$filterNoAutoescape(opt_data.captionContent) + '</caption>' : '', opt_data.theadContent ? '<thead>' + soy.$$filterNoAutoescape(opt_data.theadContent) + '</thead>' : '', opt_data.tfootContent ? '<tfoot>' + soy.$$filterNoAutoescape(opt_data.tfootContent) + '</tfoot>' : '', !opt_data.contentIncludesTbody ? '<tbody>' : '', soy.$$filterNoAutoescape(opt_data.content), !opt_data.contentIncludesTbody ? '</tbody>' : '', '</table>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.table.soyTemplateName = 'aui.table';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/tabs.js
__dc5680e4127f4c638e99e5bb08f25e0d = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from tabs.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
  
    aui.tabs = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-tabs ', soy.$$escapeHtml(opt_data.isVertical ? 'vertical-tabs' : 'horizontal-tabs'), opt_data.isDisabled ? ' aui-tabs-disabled' : '');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('><ul class="tabs-menu">');
      var itemList19 = opt_data.menuItems;
      var itemListLen19 = itemList19.length;
      for (var itemIndex19 = 0; itemIndex19 < itemListLen19; itemIndex19++) {
        var itemData19 = itemList19[itemIndex19];
        aui.tabMenuItem(itemData19, output);
      }
      output.append('</ul>', soy.$$filterNoAutoescape(opt_data.paneContent), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.tabs.soyTemplateName = 'aui.tabs';
    }
  
    aui.tabMenuItem = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<li', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="menu-item', opt_data.isActive ? ' active-tab' : '');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('><a href="', soy.$$escapeHtml(opt_data.url), '">', soy.$$escapeHtml(opt_data.text), '</a></li>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.tabMenuItem.soyTemplateName = 'aui.tabMenuItem';
    }
  
    aui.tabPane = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="tabs-pane', opt_data.isActive ? ' active-pane' : '');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.tabPane.soyTemplateName = 'aui.tabPane';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/toolbar.js
__8eed7b0fb45b7d5f91c771e71dfb99dd = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from toolbar.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.toolbar.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.toolbar == 'undefined') {
      aui.toolbar = {};
    }
  
    aui.toolbar.toolbar = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-toolbar');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.toolbar.toolbar.soyTemplateName = 'aui.toolbar.toolbar';
    }
  
    aui.toolbar.split = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="toolbar-split toolbar-split-', soy.$$escapeHtml(opt_data.split));
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'div'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.toolbar.split.soyTemplateName = 'aui.toolbar.split';
    }
  
    aui.toolbar.group = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<ul', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="toolbar-group');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</ul>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.toolbar.group.soyTemplateName = 'aui.toolbar.group';
    }
  
    aui.toolbar.item = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<li ', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="toolbar-item', opt_data.isPrimary ? ' primary' : '', opt_data.isActive ? ' active' : '');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</li>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.toolbar.item.soyTemplateName = 'aui.toolbar.item';
    }
  
    aui.toolbar.trigger = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<a', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="toolbar-trigger');
      aui.renderExtraClasses(opt_data, output);
      output.append('" href="', soy.$$escapeHtml(opt_data.url ? opt_data.url : '#'), '"', opt_data.title ? ' title="' + soy.$$escapeHtml(opt_data.title) + '"' : '');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</a>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.toolbar.trigger.soyTemplateName = 'aui.toolbar.trigger';
    }
  
    aui.toolbar.button = function (opt_data, opt_sb) {
      opt_data = opt_data || {};
      var output = opt_sb || new soy.StringBuilder();
      var param107 = new soy.StringBuilder();
      aui.toolbar.trigger({ url: opt_data.url, title: opt_data.title, content: '' + (opt_data.iconClass ? '<span class="icon ' + soy.$$escapeHtml(opt_data.iconClass) + '"></span>' : '') + (opt_data.text ? '<span class="trigger-text">' + soy.$$escapeHtml(opt_data.text) + '</span>' : '') }, param107);
      aui.toolbar.item({ isActive: opt_data.isActive, isPrimary: opt_data.isPrimary, id: opt_data.id, extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, content: param107.toString() }, output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.toolbar.button.soyTemplateName = 'aui.toolbar.button';
    }
  
    aui.toolbar.link = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      var param125 = new soy.StringBuilder('toolbar-item-link');
      aui.renderExtraClasses(opt_data, param125);
      var param129 = new soy.StringBuilder();
      aui.toolbar.trigger({ url: opt_data.url, content: '' + soy.$$escapeHtml(opt_data.text) }, param129);
      aui.toolbar.item({ id: opt_data.id, extraClasses: param125.toString(), extraAttributes: opt_data.extraAttributes, content: param129.toString() }, output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.toolbar.link.soyTemplateName = 'aui.toolbar.link';
    }
  
    aui.toolbar.dropdownInternal = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      var param138 = new soy.StringBuilder(soy.$$filterNoAutoescape(opt_data.itemClass));
      aui.renderExtraClasses(opt_data, param138);
      var param143 = new soy.StringBuilder(opt_data.splitButtonContent ? soy.$$filterNoAutoescape(opt_data.splitButtonContent) : '');
      var param148 = new soy.StringBuilder();
      aui.dropdown.trigger({ extraClasses: 'toolbar-trigger', accessibilityText: opt_data.text }, param148);
      aui.dropdown.menu({ content: opt_data.dropdownItemsContent }, param148);
      aui.dropdown.parent({ content: param148.toString() }, param143);
      aui.toolbar.item({ isPrimary: opt_data.isPrimary, id: opt_data.id, extraClasses: param138.toString(), extraAttributes: opt_data.extraAttributes, content: param143.toString() }, output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.toolbar.dropdownInternal.soyTemplateName = 'aui.toolbar.dropdownInternal';
    }
  
    aui.toolbar.dropdown = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      aui.toolbar.dropdownInternal({ isPrimary: opt_data.isPrimary, id: opt_data.id, itemClass: 'toolbar-dropdown', extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, text: opt_data.text, dropdownItemsContent: opt_data.dropdownItemsContent }, output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.toolbar.dropdown.soyTemplateName = 'aui.toolbar.dropdown';
    }
  
    aui.toolbar.splitButton = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      var param172 = new soy.StringBuilder();
      aui.toolbar.trigger({ url: opt_data.url, content: '' + soy.$$escapeHtml(opt_data.text) }, param172);
      aui.toolbar.dropdownInternal({ isPrimary: opt_data.isPrimary, id: opt_data.id, itemClass: 'toolbar-splitbutton', extraClasses: opt_data.extraClasses, extraAttributes: opt_data.extraAttributes, dropdownItemsContent: opt_data.dropdownItemsContent, splitButtonContent: param172.toString() }, output);
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.toolbar.splitButton.soyTemplateName = 'aui.toolbar.splitButton';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/toolbar2.js
__54ba4b633ccf4ab5be52700a7a08c976 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from toolbar2.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.toolbar2.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.toolbar2 == 'undefined') {
      aui.toolbar2 = {};
    }
  
    aui.toolbar2.toolbar2 = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-toolbar2');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append(' role="toolbar"><div class="aui-toolbar2-inner">', soy.$$filterNoAutoescape(opt_data.content), '</div></div>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.toolbar2.toolbar2.soyTemplateName = 'aui.toolbar2.toolbar2';
    }
  
    aui.toolbar2.item = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-toolbar2-', soy.$$escapeHtml(opt_data.item));
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</div>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.toolbar2.item.soyTemplateName = 'aui.toolbar2.item';
    }
  
    aui.toolbar2.group = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<div', opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '"' : '', ' class="aui-toolbar2-group');
      aui.renderExtraClasses(opt_data, output);
      output.append('"');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', soy.$$filterNoAutoescape(opt_data.content), '</div>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.toolbar2.group.soyTemplateName = 'aui.toolbar2.group';
    }
  })();
  
  return module.exports;
}).call(this);

// .tmp/compiled-soy/trigger.js
__95933db50ee80178db4639fc7b2b3b71 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  (function () {
    aui = window.aui = window.aui || {};
    // This file was automatically generated from trigger.soy.
    // Please don't edit this file by hand.
  
    /**
     * @fileoverview Templates in namespace aui.trigger.
     */
  
    if (typeof aui == 'undefined') {
      var aui = {};
    }
    if (typeof aui.trigger == 'undefined') {
      aui.trigger = {};
    }
  
    aui.trigger.trigger = function (opt_data, opt_sb) {
      var output = opt_sb || new soy.StringBuilder();
      output.append('<', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'a'), opt_data.id ? ' id="' + soy.$$escapeHtml(opt_data.id) + '" ' : '', ' class="');
      aui.renderExtraClasses(opt_data, output);
      output.append('" aria-controls="', soy.$$escapeHtml(opt_data.menu.id), '" aria-haspopup="true" role="button"', opt_data.title ? ' title="' + soy.$$escapeHtml(opt_data.title) + '"' : '', opt_data.container ? ' data-container="' + soy.$$escapeHtml(opt_data.container) + '"' : '', (!opt_data.tagName || opt_data.tagName == 'a') && (!opt_data.extraAttributes || Object.prototype.toString.call(opt_data.extraAttributes) === '[object Object]' && !opt_data.extraAttributes.href && !opt_data.extraAttributes.tabindex || (!opt_data.extraAttributes.href || !opt_data.extraAttributes.tabindex)) ? ' tabindex="0"' : '', ' data-aui-trigger');
      aui.renderExtraAttributes(opt_data, output);
      output.append('>', opt_data.content ? soy.$$filterNoAutoescape(opt_data.content) : '', opt_data.text ? soy.$$escapeHtml(opt_data.text) : '', !(opt_data.showIcon == false) ? '<span class="icon ' + soy.$$escapeHtml(opt_data.iconClasses ? opt_data.iconClasses : 'aui-icon-dropdown') + '">' + (opt_data.iconText ? soy.$$escapeHtml(opt_data.iconText) : '') + '</span>' : '', '</', soy.$$escapeHtml(opt_data.tagName ? opt_data.tagName : 'a'), '>');
      return opt_sb ? '' : output.toString();
    };
    if (goog.DEBUG) {
      aui.trigger.trigger.soyTemplateName = 'aui.trigger.trigger';
    }
  })();
  
  return module.exports;
}).call(this);

// src/js/aui-soy.js
__5936331c44c5499230e3703fe6517975 = (function () {
  var module = {
    exports: {}
  };
  var exports = module.exports;
  
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
  
  __ac032cd9bd44bd325a92b3f34059b73f;
  
  __86a08fd76fd83f1d85ad01739e598161;
  
  __8068caa4da7075ef513014428347589f;
  
  __1891ade1d3c0e295569bd579f13b0f63;
  
  __0254872b522bc9e00d02589f509bb8f5;
  
  __f6141f2f65f74971f091c822cbd840f1;
  
  __178aaef77c2e3fe44e30e25be73b9a09;
  
  __b65d69032912985f7c7807d799de727f;
  
  __2f44d460b81252ad07580e7bfe99c655;
  
  __d61e62de6ea2af775c8ad31ee31d613d;
  
  __2c0440b4084d98ff7a978e653a23a004;
  
  __f5250e4119ec9b2ac6762f8d365a63cf;
  
  __7e2229eab30d9eaf5f17f6ba06cccf5c;
  
  __865e5bcee83658888ba45f05f135b02a;
  
  __9c940e6da939333c698993d78782970a;
  
  __32b01fb92537ac89b5e40496e454215c;
  
  __3242d211fcb0bdb2563ade78db19a5dc;
  
  __373fc8243f302a9b580d77bff56aad6b;
  
  __913913859fa0c27ac72fb848024994ba;
  
  __eea14c2c68f43fbee0123ef9adb03cb8;
  
  __cf6359adf3362392d2ffa1309eceae7b;
  
  __8245ebb5dc16c48c0b1b56d8956f208e;
  
  __13222f91706995ac525bbb774a86297b;
  
  __dc5680e4127f4c638e99e5bb08f25e0d;
  
  __8eed7b0fb45b7d5f91c771e71dfb99dd;
  
  __54ba4b633ccf4ab5be52700a7a08c976;
  
  __95933db50ee80178db4639fc7b2b3b71;
  
  exports['default'] = window.aui;
  module.exports = exports['default'];
  
  return module.exports;
}).call(this);