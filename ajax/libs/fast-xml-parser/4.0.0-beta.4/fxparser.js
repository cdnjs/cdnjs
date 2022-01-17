var fxparser =
/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/fxp.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/os-browserify/browser.js":
/*!***********************************************!*\
  !*** ./node_modules/os-browserify/browser.js ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

exports.endianness = function () {
  return 'LE';
};

exports.hostname = function () {
  if (typeof location !== 'undefined') {
    return location.hostname;
  } else return '';
};

exports.loadavg = function () {
  return [];
};

exports.uptime = function () {
  return 0;
};

exports.freemem = function () {
  return Number.MAX_VALUE;
};

exports.totalmem = function () {
  return Number.MAX_VALUE;
};

exports.cpus = function () {
  return [];
};

exports.type = function () {
  return 'Browser';
};

exports.release = function () {
  if (typeof navigator !== 'undefined') {
    return navigator.appVersion;
  }

  return '';
};

exports.networkInterfaces = exports.getNetworkInterfaces = function () {
  return {};
};

exports.arch = function () {
  return 'javascript';
};

exports.platform = function () {
  return 'browser';
};

exports.tmpdir = exports.tmpDir = function () {
  return '/tmp';
};

exports.EOL = '\n';

exports.homedir = function () {
  return '/';
};

/***/ }),

/***/ "./node_modules/strnum/strnum.js":
/*!***************************************!*\
  !*** ./node_modules/strnum/strnum.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

const hexRegex = /^[-+]?0x[a-fA-F0-9]+$/;
const numRegex = /^([\-\+])?(0*)(\.[0-9]+([eE]\-?[0-9]+)?|[0-9]+(\.[0-9]+([eE]\-?[0-9]+)?)?)$/; // const octRegex = /0x[a-z0-9]+/;
// const binRegex = /0x[a-z0-9]+/;

const consider = {
  hex: true,
  leadingZeros: true,
  decimalPoint: "\." //skipLike: /regex/

};

function toNumber(str, options = {}) {
  // const options = Object.assign({}, consider);
  // if(opt.leadingZeros === false){
  //     options.leadingZeros = false;
  // }else if(opt.hex === false){
  //     options.hex = false;
  // }
  options = Object.assign({}, consider, options);
  if (!str || typeof str !== "string") return str;
  let trimmedStr = str.trim();
  if (options.skipLike !== undefined && options.skipLike.test(trimmedStr)) return str;else if (options.hex && hexRegex.test(trimmedStr)) {
    return Number.parseInt(trimmedStr, 16); // } else if (options.parseOct && octRegex.test(str)) {
    //     return Number.parseInt(val, 8);
    // }else if (options.parseBin && binRegex.test(str)) {
    //     return Number.parseInt(val, 2);
  } else {
    //separate negative sign, leading zeros, and rest number
    const match = numRegex.exec(trimmedStr);

    if (match) {
      const negative = match[1];
      const leadingZeros = match[2];
      const num = match[3]; //complete num

      const eNotation = match[4] || match[6];
      if (leadingZeros.length === 1 && num[0] === ".") return Number(str);else if (!options.leadingZeros && leadingZeros.length > 0) return str;else return Number(trimmedStr);
    } else {
      //non-numeric string
      return str;
    }
  }
}

module.exports = toNumber;

/***/ }),

/***/ "./src/fxp.js":
/*!********************!*\
  !*** ./src/fxp.js ***!
  \********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var validator=__webpack_require__(/*! ./validator */ "./src/validator.js");var XMLParser=__webpack_require__(/*! ./xmlparser/XMLParser */ "./src/xmlparser/XMLParser.js");var XMLBuilder=__webpack_require__(/*! ./xmlbuilder/json2xml */ "./src/xmlbuilder/json2xml.js");module.exports={XMLParser:XMLParser,XMLValidator:validator,XMLBuilder:XMLBuilder};

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var nameStartChar=":A-Za-z_\\u00C0-\\u00D6\\u00D8-\\u00F6\\u00F8-\\u02FF\\u0370-\\u037D\\u037F-\\u1FFF\\u200C-\\u200D\\u2070-\\u218F\\u2C00-\\u2FEF\\u3001-\\uD7FF\\uF900-\\uFDCF\\uFDF0-\\uFFFD";var nameChar=nameStartChar+"\\-.\\d\\u00B7\\u0300-\\u036F\\u203F-\\u2040";var nameRegexp='['+nameStartChar+']['+nameChar+']*';var regexName=new RegExp('^'+nameRegexp+'$');var getAllMatches=function getAllMatches(string,regex){var matches=[];var match=regex.exec(string);while(match){var allmatches=[];allmatches.startIndex=regex.lastIndex-match[0].length;var len=match.length;for(var index=0;index<len;index++){allmatches.push(match[index]);}matches.push(allmatches);match=regex.exec(string);}return matches;};var isName=function isName(string){var match=regexName.exec(string);return!(match===null||typeof match==='undefined');};exports.isExist=function(v){return typeof v!=='undefined';};exports.isEmptyObject=function(obj){return Object.keys(obj).length===0;};/**
 * Copy all the properties of a into b.
 * @param {*} target
 * @param {*} a
 */exports.merge=function(target,a,arrayMode){if(a){var keys=Object.keys(a);// will return an array of own properties
var len=keys.length;//don't make it inline
for(var i=0;i<len;i++){if(arrayMode==='strict'){target[keys[i]]=[a[keys[i]]];}else{target[keys[i]]=a[keys[i]];}}}};/* exports.merge =function (b,a){
  return Object.assign(b,a);
} */exports.getValue=function(v){if(exports.isExist(v)){return v;}else{return'';}};// const fakeCall = function(a) {return a;};
// const fakeCallNoReturn = function() {};
var buildOptions=function buildOptions(options,defaultOptions,props){var newOptions={};if(!options){return defaultOptions;//if there are not options
}for(var i=0;i<props.length;i++){if(options[props[i]]!==undefined){newOptions[props[i]]=options[props[i]];}else{newOptions[props[i]]=defaultOptions[props[i]];}}return newOptions;};exports.buildOptions=buildOptions;exports.isName=isName;exports.getAllMatches=getAllMatches;exports.nameRegexp=nameRegexp;

/***/ }),

/***/ "./src/validator.js":
/*!**************************!*\
  !*** ./src/validator.js ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var util=__webpack_require__(/*! ./util */ "./src/util.js");var defaultOptions={allowBooleanAttributes:false,//A tag can have attributes without any value
unpairedTags:[]};var props=['allowBooleanAttributes','unpairedTags'];//const tagsPattern = new RegExp("<\\/?([\\w:\\-_\.]+)\\s*\/?>","g");
exports.validate=function(xmlData,options){options=util.buildOptions(options,defaultOptions,props);//xmlData = xmlData.replace(/(\r\n|\n|\r)/gm,"");//make it single line
//xmlData = xmlData.replace(/(^\s*<\?xml.*?\?>)/g,"");//Remove XML starting tag
//xmlData = xmlData.replace(/(<!DOCTYPE[\s\w\"\.\/\-\:]+(\[.*\])*\s*>)/g,"");//Remove DOCTYPE
var tags=[];var tagFound=false;//indicates that the root tag has been closed (aka. depth 0 has been reached)
var reachedRoot=false;if(xmlData[0]==="\uFEFF"){// check for byte order mark (BOM)
xmlData=xmlData.substr(1);}for(var i=0;i<xmlData.length;i++){if(xmlData[i]==='<'&&xmlData[i+1]==='?'){i+=2;i=readPI(xmlData,i);if(i.err)return i;}else if(xmlData[i]==='<'){//starting of tag
//read until you reach to '>' avoiding any '>' in attribute value
var tagStartPos=i;i++;if(xmlData[i]==='!'){i=readCommentAndCDATA(xmlData,i);continue;}else{var closingTag=false;if(xmlData[i]==='/'){//closing tag
closingTag=true;i++;}//read tagname
var tagName='';for(;i<xmlData.length&&xmlData[i]!=='>'&&xmlData[i]!==' '&&xmlData[i]!=='\t'&&xmlData[i]!=='\n'&&xmlData[i]!=='\r';i++){tagName+=xmlData[i];}tagName=tagName.trim();//console.log(tagName);
if(tagName[tagName.length-1]==='/'){//self closing tag without attributes
tagName=tagName.substring(0,tagName.length-1);//continue;
i--;}if(!validateTagName(tagName)){var msg=void 0;if(tagName.trim().length===0){msg="Invalid space after '<'.";}else{msg="Tag '"+tagName+"' is an invalid name.";}return getErrorObject('InvalidTag',msg,getLineNumberForPosition(xmlData,i));}var result=readAttributeStr(xmlData,i);if(result===false){return getErrorObject('InvalidAttr',"Attributes for '"+tagName+"' have open quote.",getLineNumberForPosition(xmlData,i));}var attrStr=result.value;i=result.index;if(attrStr[attrStr.length-1]==='/'){//self closing tag
var attrStrStart=i-attrStr.length;attrStr=attrStr.substring(0,attrStr.length-1);var isValid=validateAttributeString(attrStr,options);if(isValid===true){tagFound=true;//continue; //text may presents after self closing tag
}else{//the result from the nested function returns the position of the error within the attribute
//in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
//this gives us the absolute index in the entire xml, which we can use to find the line at last
return getErrorObject(isValid.err.code,isValid.err.msg,getLineNumberForPosition(xmlData,attrStrStart+isValid.err.line));}}else if(closingTag){if(!result.tagClosed){return getErrorObject('InvalidTag',"Closing tag '"+tagName+"' doesn't have proper closing.",getLineNumberForPosition(xmlData,i));}else if(attrStr.trim().length>0){return getErrorObject('InvalidTag',"Closing tag '"+tagName+"' can't have attributes or invalid starting.",getLineNumberForPosition(xmlData,tagStartPos));}else{var otg=tags.pop();if(tagName!==otg.tagName){var openPos=getLineNumberForPosition(xmlData,otg.tagStartPos);return getErrorObject('InvalidTag',"Expected closing tag '"+otg.tagName+"' (opened in line "+openPos.line+", col "+openPos.col+") instead of closing tag '"+tagName+"'.",getLineNumberForPosition(xmlData,tagStartPos));}//when there are no more tags, we reached the root level.
if(tags.length==0){reachedRoot=true;}}}else{var _isValid=validateAttributeString(attrStr,options);if(_isValid!==true){//the result from the nested function returns the position of the error within the attribute
//in order to get the 'true' error line, we need to calculate the position where the attribute begins (i - attrStr.length) and then add the position within the attribute
//this gives us the absolute index in the entire xml, which we can use to find the line at last
return getErrorObject(_isValid.err.code,_isValid.err.msg,getLineNumberForPosition(xmlData,i-attrStr.length+_isValid.err.line));}//if the root level has been reached before ...
if(reachedRoot===true){return getErrorObject('InvalidXml','Multiple possible root nodes found.',getLineNumberForPosition(xmlData,i));}else if(options.unpairedTags.indexOf(tagName)!==-1){//don't push into stack
}else{tags.push({tagName:tagName,tagStartPos:tagStartPos});}tagFound=true;}//skip tag text value
//It may include comments and CDATA value
for(i++;i<xmlData.length;i++){if(xmlData[i]==='<'){if(xmlData[i+1]==='!'){//comment or CADATA
i++;i=readCommentAndCDATA(xmlData,i);continue;}else if(xmlData[i+1]==='?'){i=readPI(xmlData,++i);if(i.err)return i;}else{break;}}else if(xmlData[i]==='&'){var afterAmp=validateAmpersand(xmlData,i);if(afterAmp==-1)return getErrorObject('InvalidChar',"char '&' is not expected.",getLineNumberForPosition(xmlData,i));i=afterAmp;}else{if(reachedRoot===true&&!isWhiteSpace(xmlData[i])){return getErrorObject('InvalidXml',"Extra text at the end",getLineNumberForPosition(xmlData,i));}}}//end of reading tag text value
if(xmlData[i]==='<'){i--;}}}else{if(isWhiteSpace(xmlData[i])){continue;}return getErrorObject('InvalidChar',"char '"+xmlData[i]+"' is not expected.",getLineNumberForPosition(xmlData,i));}}if(!tagFound){return getErrorObject('InvalidXml','Start tag expected.',1);}else if(tags.length==1){return getErrorObject('InvalidTag',"Unclosed tag '"+tags[0].tagName+"'.",getLineNumberForPosition(xmlData,tags[0].tagStartPos));}else if(tags.length>0){return getErrorObject('InvalidXml',"Invalid '"+JSON.stringify(tags.map(function(t){return t.tagName;}),null,4).replace(/\r?\n/g,'')+"' found.",{line:1,col:1});}return true;};function isWhiteSpace(_char){return _char===' '||_char==='\t'||_char==='\n'||_char==='\r';}/**
 * Read Processing insstructions and skip
 * @param {*} xmlData
 * @param {*} i
 */function readPI(xmlData,i){var start=i;for(;i<xmlData.length;i++){if(xmlData[i]=='?'||xmlData[i]==' '){//tagname
var tagname=xmlData.substr(start,i-start);if(i>5&&tagname==='xml'){return getErrorObject('InvalidXml','XML declaration allowed only at the start of the document.',getLineNumberForPosition(xmlData,i));}else if(xmlData[i]=='?'&&xmlData[i+1]=='>'){//check if valid attribut string
i++;break;}else{continue;}}}return i;}function readCommentAndCDATA(xmlData,i){if(xmlData.length>i+5&&xmlData[i+1]==='-'&&xmlData[i+2]==='-'){//comment
for(i+=3;i<xmlData.length;i++){if(xmlData[i]==='-'&&xmlData[i+1]==='-'&&xmlData[i+2]==='>'){i+=2;break;}}}else if(xmlData.length>i+8&&xmlData[i+1]==='D'&&xmlData[i+2]==='O'&&xmlData[i+3]==='C'&&xmlData[i+4]==='T'&&xmlData[i+5]==='Y'&&xmlData[i+6]==='P'&&xmlData[i+7]==='E'){var angleBracketsCount=1;for(i+=8;i<xmlData.length;i++){if(xmlData[i]==='<'){angleBracketsCount++;}else if(xmlData[i]==='>'){angleBracketsCount--;if(angleBracketsCount===0){break;}}}}else if(xmlData.length>i+9&&xmlData[i+1]==='['&&xmlData[i+2]==='C'&&xmlData[i+3]==='D'&&xmlData[i+4]==='A'&&xmlData[i+5]==='T'&&xmlData[i+6]==='A'&&xmlData[i+7]==='['){for(i+=8;i<xmlData.length;i++){if(xmlData[i]===']'&&xmlData[i+1]===']'&&xmlData[i+2]==='>'){i+=2;break;}}}return i;}var doubleQuote='"';var singleQuote="'";/**
 * Keep reading xmlData until '<' is found outside the attribute value.
 * @param {string} xmlData
 * @param {number} i
 */function readAttributeStr(xmlData,i){var attrStr='';var startChar='';var tagClosed=false;for(;i<xmlData.length;i++){if(xmlData[i]===doubleQuote||xmlData[i]===singleQuote){if(startChar===''){startChar=xmlData[i];}else if(startChar!==xmlData[i]){//if vaue is enclosed with double quote then single quotes are allowed inside the value and vice versa
}else{startChar='';}}else if(xmlData[i]==='>'){if(startChar===''){tagClosed=true;break;}}attrStr+=xmlData[i];}if(startChar!==''){return false;}return{value:attrStr,index:i,tagClosed:tagClosed};}/**
 * Select all the attributes whether valid or invalid.
 */var validAttrStrRegxp=new RegExp('(\\s*)([^\\s=]+)(\\s*=)?(\\s*([\'"])(([\\s\\S])*?)\\5)?','g');//attr, ="sd", a="amit's", a="sd"b="saf", ab  cd=""
function validateAttributeString(attrStr,options){//console.log("start:"+attrStr+":end");
//if(attrStr.trim().length === 0) return true; //empty string
var matches=util.getAllMatches(attrStr,validAttrStrRegxp);var attrNames={};for(var i=0;i<matches.length;i++){if(matches[i][1].length===0){//nospace before attribute name: a="sd"b="saf"
return getErrorObject('InvalidAttr',"Attribute '"+matches[i][2]+"' has no space in starting.",getPositionFromMatch(matches[i]));}else if(matches[i][3]===undefined&&!options.allowBooleanAttributes){//independent attribute: ab
return getErrorObject('InvalidAttr',"boolean attribute '"+matches[i][2]+"' is not allowed.",getPositionFromMatch(matches[i]));}/* else if(matches[i][6] === undefined){//attribute without value: ab=
                    return { err: { code:"InvalidAttr",msg:"attribute " + matches[i][2] + " has no value assigned."}};
                } */var attrName=matches[i][2];if(!validateAttrName(attrName)){return getErrorObject('InvalidAttr',"Attribute '"+attrName+"' is an invalid name.",getPositionFromMatch(matches[i]));}if(!attrNames.hasOwnProperty(attrName)){//check for duplicate attribute.
attrNames[attrName]=1;}else{return getErrorObject('InvalidAttr',"Attribute '"+attrName+"' is repeated.",getPositionFromMatch(matches[i]));}}return true;}function validateNumberAmpersand(xmlData,i){var re=/\d/;if(xmlData[i]==='x'){i++;re=/[\da-fA-F]/;}for(;i<xmlData.length;i++){if(xmlData[i]===';')return i;if(!xmlData[i].match(re))break;}return-1;}function validateAmpersand(xmlData,i){// https://www.w3.org/TR/xml/#dt-charref
i++;if(xmlData[i]===';')return-1;if(xmlData[i]==='#'){i++;return validateNumberAmpersand(xmlData,i);}var count=0;for(;i<xmlData.length;i++,count++){if(xmlData[i].match(/\w/)&&count<20)continue;if(xmlData[i]===';')break;return-1;}return i;}function getErrorObject(code,message,lineNumber){return{err:{code:code,msg:message,line:lineNumber.line||lineNumber,col:lineNumber.col}};}function validateAttrName(attrName){return util.isName(attrName);}// const startsWithXML = /^xml/i;
function validateTagName(tagname){return util.isName(tagname)/* && !tagname.match(startsWithXML) */;}//this function returns the line number for the character at the given index
function getLineNumberForPosition(xmlData,index){var lines=xmlData.substring(0,index).split(/\r?\n/);return{line:lines.length,// column number is last line's length + 1, because column numbering starts at 1:
col:lines[lines.length-1].length+1};}//this function returns the position of the first character of match within attrStr
function getPositionFromMatch(match){return match.startIndex+match[1].length;}

/***/ }),

/***/ "./src/xmlbuilder/json2xml.js":
/*!************************************!*\
  !*** ./src/xmlbuilder/json2xml.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
//parse Empty Node as self closing node
var buildOptions=__webpack_require__(/*! ../util */ "./src/util.js").buildOptions;var buildFromOrderedJs=__webpack_require__(/*! ./orderedJs2Xml */ "./src/xmlbuilder/orderedJs2Xml.js");var defaultOptions={attributeNamePrefix:'@_',attributesGroupName:false,textNodeName:'#text',ignoreAttributes:true,cdataPropName:false,format:false,indentBy:'  ',suppressEmptyNode:false,tagValueProcessor:function tagValueProcessor(key,a){return a;},attributeValueProcessor:function attributeValueProcessor(attrName,a){return a;},preserveOrder:false,commentPropName:false,unpairedTags:[],entities:{">":{regex:new RegExp(">","g"),val:"&gt;"},"<":{regex:new RegExp("<","g"),val:"&lt;"},"sQuot":{regex:new RegExp("\'","g"),val:"&apos;"},"dQuot":{regex:new RegExp("\"","g"),val:"&quot;"}},processEntities:true,stopNodes:[]};var props=['attributeNamePrefix','attributesGroupName','textNodeName','ignoreAttributes','cdataPropName','format','indentBy','suppressEmptyNode','tagValueProcessor','attributeValueProcessor','arrayNodeName',//when array as root
'preserveOrder',"commentPropName","unpairedTags","entities","processEntities","stopNodes"// 'rootNodeName', //when jsObject have multiple properties on root level
];function Builder(options){this.options=buildOptions(options,defaultOptions,props);if(this.options.ignoreAttributes||this.options.attributesGroupName){this.isAttribute=function()/*a*/{return false;};}else{this.attrPrefixLen=this.options.attributeNamePrefix.length;this.isAttribute=isAttribute;}this.processTextOrObjNode=processTextOrObjNode;if(this.options.format){this.indentate=indentate;this.tagEndChar='>\n';this.newLine='\n';}else{this.indentate=function(){return'';};this.tagEndChar='>';this.newLine='';}if(this.options.suppressEmptyNode){this.buildTextNode=buildEmptyTextNode;this.buildObjNode=buildEmptyObjNode;}else{this.buildTextNode=buildTextValNode;this.buildObjNode=buildObjectNode;}this.buildTextValNode=buildTextValNode;this.buildObjectNode=buildObjectNode;this.replaceEntitiesValue=replaceEntitiesValue;}Builder.prototype.build=function(jObj){if(this.options.preserveOrder){return buildFromOrderedJs(jObj,this.options);}else{if(Array.isArray(jObj)&&this.options.arrayNodeName&&this.options.arrayNodeName.length>1){var _jObj;jObj=(_jObj={},_jObj[this.options.arrayNodeName]=jObj,_jObj);}return this.j2x(jObj,0).val;}};Builder.prototype.j2x=function(jObj,level){var attrStr='';var val='';for(var key in jObj){if(typeof jObj[key]==='undefined'){// supress undefined node
}else if(jObj[key]===null){val+=this.indentate(level)+'<'+key+'/'+this.tagEndChar;}else if(jObj[key]instanceof Date){val+=this.buildTextNode(jObj[key],key,'',level);}else if(typeof jObj[key]!=='object'){//premitive type
var attr=this.isAttribute(key);if(attr){var _val=this.options.attributeValueProcessor(attr,''+jObj[key]);_val=this.replaceEntitiesValue(_val);attrStr+=' '+attr+'="'+_val+'"';}else{//tag value
if(key===this.options.textNodeName){var newval=this.options.tagValueProcessor(key,''+jObj[key]);val+=this.replaceEntitiesValue(newval);}else{val+=this.buildTextNode(jObj[key],key,'',level);}}}else if(Array.isArray(jObj[key])){//repeated nodes
var arrLen=jObj[key].length;for(var j=0;j<arrLen;j++){var item=jObj[key][j];if(typeof item==='undefined'){// supress undefined node
}else if(item===null){val+=this.indentate(level)+'<'+key+'/'+this.tagEndChar;}else if(typeof item==='object'){val+=this.processTextOrObjNode(item,key,level);}else{val+=this.buildTextNode(item,key,'',level);}}}else{//nested node
if(this.options.attributesGroupName&&key===this.options.attributesGroupName){var Ks=Object.keys(jObj[key]);var L=Ks.length;for(var _j=0;_j<L;_j++){var _val2=this.options.attributeValueProcessor(Ks[_j],''+jObj[key][Ks[_j]]);_val2=this.replaceEntitiesValue(_val2);attrStr+=' '+Ks[_j]+'="'+_val2+'"';}}else{val+=this.processTextOrObjNode(jObj[key],key,level);}}}return{attrStr:attrStr,val:val};};function processTextOrObjNode(object,key,level){var result=this.j2x(object,level+1);if(object[this.options.textNodeName]!==undefined&&Object.keys(object).length===1){return this.buildTextNode(result.val,key,result.attrStr,level);}else{return this.buildObjNode(result.val,key,result.attrStr,level);}}function buildObjectNode(val,key,attrStr,level){if(attrStr&&val.indexOf('<')===-1){return this.indentate(level)+'<'+key+attrStr+'>'+val+//+ this.newLine
// + this.indentate(level)
'</'+key+this.tagEndChar;}else{return this.indentate(level)+'<'+key+attrStr+this.tagEndChar+val+//+ this.newLine
this.indentate(level)+'</'+key+this.tagEndChar;}}function buildEmptyObjNode(val,key,attrStr,level){if(val!==''){return this.buildObjectNode(val,key,attrStr,level);}else{return this.indentate(level)+'<'+key+attrStr+'/'+this.tagEndChar;//+ this.newLine
}}function buildTextValNode(val,key,attrStr,level){var textValue=this.options.tagValueProcessor(key,val);textValue=this.replaceEntitiesValue(textValue);return this.indentate(level)+'<'+key+attrStr+'>'+textValue+'</'+key+this.tagEndChar;}function replaceEntitiesValue(textValue){if(textValue&&textValue.length>0&&this.options.processEntities){for(var entityName in this.options.entities){var entity=this.options.entities[entityName];textValue=textValue.replace(entity.regex,entity.val);}}return textValue;}function buildEmptyTextNode(val,key,attrStr,level){if(val===''&&this.options.unpairedTags.indexOf(key)!==-1){return this.indentate(level)+'<'+key+attrStr+this.tagEndChar;}else if(val!==''){return this.buildTextValNode(val,key,attrStr,level);}else{return this.indentate(level)+'<'+key+attrStr+'/'+this.tagEndChar;}}function indentate(level){return this.options.indentBy.repeat(level);}function isAttribute(name/*, options*/){if(name.startsWith(this.options.attributeNamePrefix)){return name.substr(this.attrPrefixLen);}else{return false;}}module.exports=Builder;

/***/ }),

/***/ "./src/xmlbuilder/orderedJs2Xml.js":
/*!*****************************************!*\
  !*** ./src/xmlbuilder/orderedJs2Xml.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require=__webpack_require__(/*! os */ "./node_modules/os-browserify/browser.js"),EOL=_require.EOL;/**
 * 
 * @param {array} jArray 
 * @param {any} options 
 * @returns 
 */function toXml(jArray,options){return arrToStr(jArray,options,"",0);}function arrToStr(arr,options,jPath,level){var xmlStr="";var indentation="";if(options.format&&options.indentBy.length>0){//TODO: this logic can be avoided for each call
indentation=EOL+""+options.indentBy.repeat(level);}for(var i=0;i<arr.length;i++){var tagObj=arr[i];var tagName=propName(tagObj);var newJPath="";if(jPath.length===0)newJPath=tagName;else newJPath=jPath+"."+tagName;if(tagName===options.textNodeName){var tagText=tagObj[tagName];if(!isStopNode(newJPath,options)){tagText=options.tagValueProcessor(tagName,tagText);tagText=replaceEntitiesValue(tagText,options);}xmlStr+=indentation+tagText;continue;}else if(tagName===options.cdataPropName){xmlStr+=indentation+("<![CDATA["+tagObj[tagName][0][options.textNodeName]+"]]>");continue;}else if(tagName===options.commentPropName){xmlStr+=indentation+("<!--"+tagObj[tagName][0][options.textNodeName]+"-->");continue;}var attStr=attr_to_str(tagObj.attributes,options);var tagStart=indentation+("<"+tagName+attStr);var tagValue=arrToStr(tagObj[tagName],options,newJPath,level+1);if((!tagValue||tagValue.length===0)&&options.suppressEmptyNode){if(options.unpairedTags.indexOf(tagName)!==-1){xmlStr+=tagStart+">";}else{xmlStr+=tagStart+"/>";}}else{//TODO: node with only text value should not parse the text value in next line
xmlStr+=tagStart+(">"+tagValue+indentation+"</"+tagName+">");}}return xmlStr;}function propName(obj){var keys=Object.keys(obj);for(var i=0;i<keys.length;i++){var key=keys[i];if(key!=="attributes")return key;}}function attr_to_str(attrMap,options){var attrStr="";if(attrMap&&!options.ignoreAttributes){for(attr in attrMap){var attrVal=options.attributeValueProcessor(attr,attrMap[attr]);attrVal=replaceEntitiesValue(attrVal,options);attrStr+=" "+attr.substr(options.attributeNamePrefix.length)+"=\""+attrVal+"\"";}}return attrStr;}function isStopNode(jPath,options){jPath=jPath.substr(0,jPath.length-options.textNodeName.length-1);var tagName=jPath.substr(jPath.lastIndexOf(".")+1);for(var index in options.stopNodes){if(options.stopNodes[index]===jPath||options.stopNodes[index]==="*."+tagName)return true;}return false;}function replaceEntitiesValue(textValue,options){if(textValue&&textValue.length>0&&options.processEntities){for(var entityName in options.entities){var entity=options.entities[entityName];textValue=textValue.replace(entity.regex,entity.val);}}return textValue;}module.exports=toXml;

/***/ }),

/***/ "./src/xmlparser/DocTypeReader.js":
/*!****************************************!*\
  !*** ./src/xmlparser/DocTypeReader.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

//TODO: handle comments
function readDocType(xmlData,i){var entities={};if(xmlData[i+3]==='O'&&xmlData[i+4]==='C'&&xmlData[i+5]==='T'&&xmlData[i+6]==='Y'&&xmlData[i+7]==='P'&&xmlData[i+8]==='E'){i=i+9;var angleBracketsCount=1;var hasBody=false,entity=false,comment=false;var exp="";for(;i<xmlData.length;i++){if(xmlData[i]==='<'){if(hasBody&&xmlData[i+1]==='!'&&xmlData[i+2]==='E'&&xmlData[i+3]==='N'&&xmlData[i+4]==='T'&&xmlData[i+5]==='I'&&xmlData[i+6]==='T'&&xmlData[i+7]==='Y'){i+=7;entity=true;}else if(hasBody&&xmlData[i+1]==='!'&&xmlData[i+2]==='E'&&xmlData[i+3]==='L'&&xmlData[i+4]==='E'&&xmlData[i+5]==='M'&&xmlData[i+6]==='E'&&xmlData[i+7]==='N'&&xmlData[i+8]==='T'){//Not supported
i+=8;}else if(//comment
xmlData[i+1]==='!'&&xmlData[i+2]==='-'&&xmlData[i+3]==='-'){comment=true;}else{throw new Error("Invalid DOCTYPE");}angleBracketsCount++;exp="";}else if(xmlData[i]==='>'){if(comment){if(xmlData[i-1]==="-"&&xmlData[i-2]==="-"){comment=false;}else{throw new Error("Invalid XML comment in DOCTYPE");}}else if(entity){parseEntityExp(exp,entities);entity=false;}angleBracketsCount--;if(angleBracketsCount===0){break;}}else if(xmlData[i]==='['){hasBody=true;}else{exp+=xmlData[i];}}if(angleBracketsCount!==0){throw new Error("Unclosed DOCTYPE");}}else{throw new Error("Invalid Tag instead of DOCTYPE");}return{entities:entities,i:i};}var entityRegex=RegExp("^\\s([a-zA-z0-0]+)[ \t](['\"])([^&]+)\\2");function parseEntityExp(exp,entities){var match=entityRegex.exec(exp);if(match){entities[match[1]]={regx:RegExp("&"+match[1]+";","g"),val:match[3]};}}module.exports=readDocType;

/***/ }),

/***/ "./src/xmlparser/OptionsBuilder.js":
/*!*****************************************!*\
  !*** ./src/xmlparser/OptionsBuilder.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var defaultOptions={preserveOrder:false,attributeNamePrefix:'@_',attributesGroupName:false,textNodeName:'#text',ignoreAttributes:true,removeNSPrefix:false,// remove NS from tag name or attribute name if true
allowBooleanAttributes:false,//a tag can have attributes without any value
//ignoreRootElement : false,
parseTagValue:true,parseAttributeValue:false,trimValues:true,//Trim string values of tag and attributes
cdataPropName:false,numberParseOptions:{hex:true,leadingZeros:true},tagValueProcessor:function tagValueProcessor(tagName,val){return val;},attributeValueProcessor:function attributeValueProcessor(attrName,val){return val;},stopNodes:[],//nested tags will not be parsed even for errors
alwaysCreateTextNode:false,isArray:function isArray(){return false;},commentPropName:false,unpairedTags:[],processEntities:true,htmlEntities:false};var props=['preserveOrder','attributeNamePrefix','attributesGroupName','textNodeName','ignoreAttributes','removeNSPrefix','allowBooleanAttributes','parseTagValue','parseAttributeValue','trimValues','cdataPropName','tagValueProcessor','attributeValueProcessor','numberParseOptions','stopNodes','alwaysCreateTextNode','isArray','commentPropName','unpairedTags','processEntities','htmlEntities'];var util=__webpack_require__(/*! ../util */ "./src/util.js");var buildOptions=function buildOptions(options){return util.buildOptions(options,defaultOptions,props);};exports.buildOptions=buildOptions;exports.defaultOptions=defaultOptions;exports.props=props;

/***/ }),

/***/ "./src/xmlparser/OrderedObjParser.js":
/*!*******************************************!*\
  !*** ./src/xmlparser/OrderedObjParser.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var util=__webpack_require__(/*! ../util */ "./src/util.js");var xmlNode=__webpack_require__(/*! ./xmlNode */ "./src/xmlparser/xmlNode.js");var readDocType=__webpack_require__(/*! ./DocTypeReader */ "./src/xmlparser/DocTypeReader.js");var toNumber=__webpack_require__(/*! strnum */ "./node_modules/strnum/strnum.js");var regx='<((!\\[CDATA\\[([\\s\\S]*?)(]]>))|((NAME:)?(NAME))([^>]*)>|((\\/)(NAME)\\s*>))([^<]*)'.replace(/NAME/g,util.nameRegexp);//const tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>(\\s*"+cdataRegx+")*([^<]+)?","g");
//const tagsRegx = new RegExp("<(\\/?)((\\w*:)?([\\w:\\-\._]+))([^>]*)>([^<]*)("+cdataRegx+"([^<]*))*([^<]+)?","g");
var OrderedObjParser=function OrderedObjParser(options){this.options=options;this.currentNode=null;this.tagsNodeStack=[];this.docTypeEntities={};this.lastEntities={"amp":{regex:/&(amp|#38|#x26);/g,val:"&"},"apos":{regex:/&(apos|#39|#x27);/g,val:"'"},"gt":{regex:/&(gt|#62|#x3E);/g,val:">"},"lt":{regex:/&(lt|#60|#x3C);/g,val:"<"},"quot":{regex:/&(quot|#34|#x22);/g,val:"\""}};this.htmlEntities={"space":{regex:/&(nbsp|#160);/g,val:" "},// "lt" : { regex: /&(lt|#60);/g, val: "<" },
// "gt" : { regex: /&(gt|#62);/g, val: ">" },
// "amp" : { regex: /&(amp|#38);/g, val: "&" },
// "quot" : { regex: /&(quot|#34);/g, val: "\"" },
// "apos" : { regex: /&(apos|#39);/g, val: "'" },
"cent":{regex:/&(cent|#162);/g,val:"¢"},"pound":{regex:/&(pound|#163);/g,val:"£"},"yen":{regex:/&(yen|#165);/g,val:"¥"},"euro":{regex:/&(euro|#8364);/g,val:"€"},"copyright":{regex:/&(copy|#169);/g,val:"©"},"reg":{regex:/&(reg|#174);/g,val:"®"},"inr":{regex:/&(inr|#8377);/g,val:"₹"}};this.addExternalEntities=addExternalEntities;this.parseXml=parseXml;this.parseTextData=parseTextData;this.resolveNameSpace=resolveNameSpace;this.buildAttributesMap=buildAttributesMap;this.isItStopNode=isItStopNode;this.replaceEntitiesValue=replaceEntitiesValue;this.readTagExp=readTagExp;this.readStopNodeData=readStopNodeData;};function addExternalEntities(externalEntities){var entKeys=Object.keys(externalEntities);for(var i=0;i<entKeys.length;i++){var ent=entKeys[i];this.lastEntities[ent]={regex:new RegExp("&"+ent+";","g"),val:externalEntities[ent]};}}/**
 * @param {string} val
 * @param {string} tagName
 * @param {string} jPath
 * @param {boolean} dontTrim
 * @param {boolean} hasAttributes
 * @param {boolean} isLeafNode
 */function parseTextData(val,tagName,jPath,dontTrim,hasAttributes,isLeafNode){if(val!==undefined){if(this.options.trimValues&&!dontTrim){val=val.trim();}if(val.length>0){val=this.replaceEntitiesValue(val);var newval=this.options.tagValueProcessor(tagName,val,jPath,hasAttributes,isLeafNode);if(newval===null||newval===undefined){//don't parse
return val;}else if(typeof newval!==typeof val||newval!==val){//overwrite
return newval;}else if(this.options.trimValues){return parseValue(val,this.options.parseTagValue,this.options.numberParseOptions);}else{var trimmedVal=val.trim();if(trimmedVal===val){return parseValue(val,this.options.parseTagValue,this.options.numberParseOptions);}else{return val;}}}}}function resolveNameSpace(tagname){if(this.options.removeNSPrefix){var tags=tagname.split(':');var prefix=tagname.charAt(0)==='/'?'/':'';if(tags[0]==='xmlns'){return'';}if(tags.length===2){tagname=prefix+tags[1];}}return tagname;}//TODO: change regex to capture NS
//const attrsRegx = new RegExp("([\\w\\-\\.\\:]+)\\s*=\\s*(['\"])((.|\n)*?)\\2","gm");
var attrsRegx=new RegExp('([^\\s=]+)\\s*(=\\s*([\'"])([\\s\\S]*?)\\3)?','gm');function buildAttributesMap(attrStr,jPath){if(!this.options.ignoreAttributes&&typeof attrStr==='string'){// attrStr = attrStr.replace(/\r?\n/g, ' ');
//attrStr = attrStr || attrStr.trim();
var matches=util.getAllMatches(attrStr,attrsRegx);var len=matches.length;//don't make it inline
var attrs={};for(var i=0;i<len;i++){var attrName=this.resolveNameSpace(matches[i][1]);var oldVal=matches[i][4];var aName=this.options.attributeNamePrefix+attrName;if(attrName.length){if(oldVal!==undefined){if(this.options.trimValues){oldVal=oldVal.trim();}oldVal=this.replaceEntitiesValue(oldVal);var newVal=this.options.attributeValueProcessor(attrName,oldVal,jPath);if(newVal===null||newVal===undefined){//don't parse
attrs[aName]=oldVal;}else if(typeof newVal!==typeof oldVal||newVal!==oldVal){//overwrite
attrs[aName]=newVal;}else{//parse
attrs[aName]=parseValue(oldVal,this.options.parseAttributeValue,this.options.numberParseOptions);}}else if(this.options.allowBooleanAttributes){attrs[aName]=true;}}}if(!Object.keys(attrs).length){return;}if(this.options.attributesGroupName){var attrCollection={};attrCollection[this.options.attributesGroupName]=attrs;return attrCollection;}return attrs;}}var parseXml=function parseXml(xmlData){xmlData=xmlData.replace(/\r\n?/g,"\n");//TODO: remove this line
var xmlObj=new xmlNode('!xml');var currentNode=xmlObj;var textData="";var jPath="";for(var i=0;i<xmlData.length;i++){//for each char in XML data
var ch=xmlData[i];if(ch==='<'){// const nextIndex = i+1;
// const _2ndChar = xmlData[nextIndex];
if(xmlData[i+1]==='/'){//Closing Tag
var closeIndex=findClosingIndex(xmlData,">",i,"Closing Tag is not closed.");var tagName=xmlData.substring(i+2,closeIndex).trim();if(this.options.removeNSPrefix){var colonIndex=tagName.indexOf(":");if(colonIndex!==-1){tagName=tagName.substr(colonIndex+1);}}if(currentNode){textData=this.parseTextData(textData,currentNode.tagname,jPath,false,currentNode.attributes?Object.keys(currentNode.attributes).length!==0:false,Object.keys(currentNode.child).length===0);if(textData!==undefined&&textData!=="")currentNode.add(this.options.textNodeName,textData);textData="";}jPath=jPath.substr(0,jPath.lastIndexOf("."));currentNode=this.tagsNodeStack.pop();//avoid recurssion, set the parent tag scope
textData="";i=closeIndex;}else if(xmlData[i+1]==='?'){i=findClosingIndex(xmlData,"?>",i,"Pi Tag is not closed.");}else if(xmlData.substr(i+1,3)==='!--'){var endIndex=findClosingIndex(xmlData,"-->",i,"Comment is not closed.");if(this.options.commentPropName){var _ref;var comment=xmlData.substring(i+4,endIndex-2);//TODO: remove repeated code
if(textData){//store previously collected data as textNode
textData=this.parseTextData(textData,currentNode.tagname,jPath,false,currentNode.attributes?Object.keys(currentNode.attributes).length!==0:false,Object.keys(currentNode.child).length===0);if(textData!==undefined&&textData!=="")currentNode.add(this.options.textNodeName,textData);textData="";}currentNode.add(this.options.commentPropName,[(_ref={},_ref[this.options.textNodeName]=comment,_ref)]);}i=endIndex;}else if(xmlData.substr(i+1,2)==='!D'){var result=readDocType(xmlData,i);this.docTypeEntities=result.entities;i=result.i;}else if(xmlData.substr(i+1,2)==='!['){var _closeIndex=findClosingIndex(xmlData,"]]>",i,"CDATA is not closed.")-2;var tagExp=xmlData.substring(i+9,_closeIndex);if(textData){//store previously collected data as textNode
textData=this.parseTextData(textData,currentNode.tagname,jPath,false,currentNode.attributes?Object.keys(currentNode.attributes).length!==0:false,Object.keys(currentNode.child).length===0);if(textData!==undefined&&textData!=="")currentNode.add(this.options.textNodeName,textData);textData="";}//cdata should be set even if it is 0 length string
if(this.options.cdataPropName){var _ref2;// let val = this.parseTextData(tagExp, this.options.cdataPropName, jPath + "." + this.options.cdataPropName, true, false, true);
// if(!val) val = "";
currentNode.add(this.options.cdataPropName,[(_ref2={},_ref2[this.options.textNodeName]=tagExp,_ref2)]);}else{var val=this.parseTextData(tagExp,currentNode.tagname,jPath,true,false,true);if(!val)val="";currentNode.add(this.options.textNodeName,val);}i=_closeIndex+2;}else{//Opening tag
var _result=this.readTagExp(xmlData,i);var _tagName=_result.tagName;var _tagExp=_result.tagExp;var attrExpPresent=_result.attrExpPresent;var _closeIndex2=_result.closeIndex;//save text as child node
if(currentNode&&textData){if(currentNode.tagname!=='!xml'){//when nested tag is found
textData=this.parseTextData(textData,currentNode.tagname,jPath,false,currentNode.attributes?Object.keys(currentNode.attributes).length!==0:false,false);if(textData!==undefined&&textData!=="")currentNode.add(this.options.textNodeName,textData);textData="";}}if(_tagName!==xmlObj.tagname){jPath+=jPath?"."+_tagName:_tagName;}//check if last tag was unpaired tag
var lastTag=currentNode;if(lastTag&&this.options.unpairedTags.indexOf(lastTag.tagname)!==-1){currentNode=this.tagsNodeStack.pop();}if(this.isItStopNode(this.options.stopNodes,jPath,_tagName)){//TODO: namespace
var tagContent="";//self-closing tag
if(_tagExp.length>0&&_tagExp.lastIndexOf("/")===_tagExp.length-1){}//boolean tag
else if(this.options.unpairedTags.indexOf(_tagName)!==-1){}//normal tag
else{//read until closing tag is found
var _result2=this.readStopNodeData(xmlData,_tagName,_closeIndex2+1);if(!_result2)throw new Error("Unexpected end of "+_tagName);i=_result2.i;tagContent=_result2.tagContent;}var childNode=new xmlNode(_tagName);if(_tagName!==_tagExp&&attrExpPresent){childNode.attributes=this.buildAttributesMap(_tagExp,jPath);}jPath=jPath.substr(0,jPath.lastIndexOf("."));childNode.add(this.options.textNodeName,tagContent);currentNode.addChild(childNode);}else{//selfClosing tag
if(_tagExp.length>0&&_tagExp.lastIndexOf("/")===_tagExp.length-1){if(_tagName[_tagName.length-1]==="/"){//remove trailing '/'
_tagName=_tagName.substr(0,_tagName.length-1);_tagExp=_tagName;}else{_tagExp=_tagExp.substr(0,_tagExp.length-1);}var _childNode=new xmlNode(_tagName);if(_tagName!==_tagExp&&attrExpPresent){_childNode.attributes=this.buildAttributesMap(_tagExp,jPath);}jPath=jPath.substr(0,jPath.lastIndexOf("."));currentNode.addChild(_childNode);}//opening tag
else{var _childNode2=new xmlNode(_tagName);this.tagsNodeStack.push(currentNode);if(_tagName!==_tagExp&&attrExpPresent){_childNode2.attributes=this.buildAttributesMap(_tagExp,jPath);}currentNode.addChild(_childNode2);currentNode=_childNode2;}textData="";i=_closeIndex2;}}}else{textData+=xmlData[i];}}return xmlObj.child;};var replaceEntitiesValue=function replaceEntitiesValue(val){if(this.options.processEntities){for(var entityName in this.docTypeEntities){var entity=this.docTypeEntities[entityName];val=val.replace(entity.regx,entity.val);}for(var _entityName in this.lastEntities){var _entity=this.lastEntities[_entityName];val=val.replace(_entity.regex,_entity.val);}if(this.options.htmlEntities){for(var _entityName2 in this.htmlEntities){var _entity2=this.htmlEntities[_entityName2];val=val.replace(_entity2.regex,_entity2.val);}}}return val;};//TODO: use jPath to simplify the logic
/**
 * 
 * @param {string[]} stopNodes 
 * @param {string} jPath
 * @param {string} currentTagName 
 */function isItStopNode(stopNodes,jPath,currentTagName){var allNodesExp="*."+currentTagName;for(var stopNodePath in stopNodes){var stopNodeExp=stopNodes[stopNodePath];if(allNodesExp===stopNodeExp||jPath===stopNodeExp)return true;}return false;}/**
 * Returns the tag Expression and where it is ending handling single-dobule quotes situation
 * @param {string} xmlData 
 * @param {number} i starting index
 * @returns 
 */function tagExpWithClosingIndex(xmlData,i){var attrBoundary;var tagExp="";for(var index=i;index<xmlData.length;index++){var ch=xmlData[index];if(attrBoundary){if(ch===attrBoundary)attrBoundary="";//reset
}else if(ch==='"'||ch==="'"){attrBoundary=ch;}else if(ch==='>'){return{data:tagExp,index:index};}else if(ch==='\t'){ch=" ";}tagExp+=ch;}}function findClosingIndex(xmlData,str,i,errMsg){var closingIndex=xmlData.indexOf(str,i);if(closingIndex===-1){throw new Error(errMsg);}else{return closingIndex+str.length-1;}}function readTagExp(xmlData,i){var result=tagExpWithClosingIndex(xmlData,i+1);var tagExp=result.data;var closeIndex=result.index;var separatorIndex=tagExp.search(/\s/);var tagName=tagExp;var attrExpPresent=true;if(separatorIndex!==-1){//separate tag name and attributes expression
tagName=tagExp.substr(0,separatorIndex).replace(/\s\s*$/,'');tagExp=tagExp.substr(separatorIndex+1);}if(this.options.removeNSPrefix){var colonIndex=tagName.indexOf(":");if(colonIndex!==-1){tagName=tagName.substr(colonIndex+1);attrExpPresent=tagName!==result.data.substr(colonIndex+1);}}return{tagName:tagName,tagExp:tagExp,closeIndex:closeIndex,attrExpPresent:attrExpPresent};}/**
 * find paired tag for a stop node
 * @param {string} xmlData 
 * @param {string} tagName 
 * @param {number} i 
 */function readStopNodeData(xmlData,tagName,i){var startIndex=i;for(;i<xmlData.length;i++){if(xmlData[i]==="<"&&xmlData[i+1]==="/"){var closeIndex=findClosingIndex(xmlData,">",i,tagName+" is not closed");var closeTagName=xmlData.substring(i+2,closeIndex).trim();if(closeTagName===tagName){return{tagContent:xmlData.substring(startIndex,i),i:closeIndex};}i=closeIndex;}}//end for loop
}function parseValue(val,shouldParse,options){if(shouldParse&&typeof val==='string'){//console.log(options)
var newval=val.trim();if(newval==='true')return true;else if(newval==='false')return false;else return toNumber(val,options);}else{if(util.isExist(val)){return val;}else{return'';}}}module.exports=OrderedObjParser;

/***/ }),

/***/ "./src/xmlparser/XMLParser.js":
/*!************************************!*\
  !*** ./src/xmlparser/XMLParser.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var _require=__webpack_require__(/*! ./OptionsBuilder */ "./src/xmlparser/OptionsBuilder.js"),buildOptions=_require.buildOptions;var OrderedObjParser=__webpack_require__(/*! ./OrderedObjParser */ "./src/xmlparser/OrderedObjParser.js");var _require2=__webpack_require__(/*! ./node2json */ "./src/xmlparser/node2json.js"),prettify=_require2.prettify;var validator=__webpack_require__(/*! ../validator */ "./src/validator.js");var XMLParser=/*#__PURE__*/function(){function XMLParser(options){this.externalEntities={};this.options=buildOptions(options);}/**
     * Parse XML dats to JS object 
     * @param {string|Buffer} xmlData 
     * @param {boolean|Object} validationOption 
     */var _proto=XMLParser.prototype;_proto.parse=function parse(xmlData,validationOption){if(typeof xmlData==="string"){}else if(xmlData.toString){xmlData=xmlData.toString();}else{throw new Error("XML data is accepted in String or Bytes[] form.");}if(validationOption){if(validationOption===true)validationOption={};//validate with default options
var result=validator.validate(xmlData,validationOption);if(result!==true){throw Error(result.err.msg+":"+result.err.line+":"+result.err.col);}}var orderedObjParser=new OrderedObjParser(this.options);orderedObjParser.addExternalEntities(this.externalEntities);var orderedResult=orderedObjParser.parseXml(xmlData);if(this.options.preserveOrder||orderedResult===undefined)return orderedResult;else return prettify(orderedResult,this.options);}/**
     * Add Entity which is not by default supported by this library
     * @param {string} key 
     * @param {string} value 
     */;_proto.addEntity=function addEntity(key,value){if(value.indexOf("&")!==-1){throw new Error("Entity value can't have '&'");}else if(key.indexOf("&")!==-1||key.indexOf(";")!==-1){throw new Error("An entity must be set without '&' and ';'. Eg. use '#xD' for '&#xD;'");}else{this.externalEntities[key]=value;}};return XMLParser;}();module.exports=XMLParser;

/***/ }),

/***/ "./src/xmlparser/node2json.js":
/*!************************************!*\
  !*** ./src/xmlparser/node2json.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/**
 * 
 * @param {array} node 
 * @param {any} options 
 * @returns 
 */function prettify(node,options){return compress(node,options);}/**
 * 
 * @param {array} arr 
 * @param {object} options 
 * @param {string} jPath 
 * @returns object
 */function compress(arr,options,jPath){var text;var compressedObj={};for(var i=0;i<arr.length;i++){var tagObj=arr[i];var property=propName(tagObj);var newJpath="";if(jPath===undefined)newJpath=property;else newJpath=jPath+"."+property;if(property===options.textNodeName){if(text===undefined)text=tagObj[property];else text+=""+tagObj[property];}else if(property===undefined){continue;}else if(tagObj[property]){var val=compress(tagObj[property],options,newJpath);var isLeaf=isLeafTag(val,options);if(tagObj.attributes){assignAttributes(val,tagObj.attributes,newJpath,options);}else if(Object.keys(val).length===1&&val[options.textNodeName]!==undefined&&!options.alwaysCreateTextNode){val=val[options.textNodeName];}else if(Object.keys(val).length===0){if(options.alwaysCreateTextNode)val[options.textNodeName]="";else val="";}if(compressedObj[property]!==undefined){if(!Array.isArray(compressedObj[property])){compressedObj[property]=[compressedObj[property]];}compressedObj[property].push(val);}else{//TODO: if a node is not an array, then check if it should be an array
//also determine if it is a leaf node
if(options.isArray(property,newJpath,isLeaf)){compressedObj[property]=[val];}else{compressedObj[property]=val;}}}}// if(text && text.length > 0) compressedObj[options.textNodeName] = text;
if(typeof text==="string"){if(text.length>0)compressedObj[options.textNodeName]=text;}else if(text!==undefined)compressedObj[options.textNodeName]=text;return compressedObj;}function propName(obj){var keys=Object.keys(obj);for(var i=0;i<keys.length;i++){var key=keys[i];if(key!=="attributes")return key;}}function assignAttributes(obj,attrMap,jpath,options){if(attrMap){var keys=Object.keys(attrMap);var len=keys.length;//don't make it inline
for(var i=0;i<len;i++){var atrrName=keys[i];if(options.isArray(atrrName,jpath+"."+atrrName,true,true)){obj[atrrName]=[attrMap[atrrName]];}else{obj[atrrName]=attrMap[atrrName];}}}}function isLeafTag(obj,options){var propCount=Object.keys(obj).length;if(propCount===0||propCount===1&&obj[options.textNodeName])return true;return false;}exports.prettify=prettify;

/***/ }),

/***/ "./src/xmlparser/xmlNode.js":
/*!**********************************!*\
  !*** ./src/xmlparser/xmlNode.js ***!
  \**********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var XmlNode=/*#__PURE__*/function(){function XmlNode(tagname){this.tagname=tagname;this.child=[];//nested tags, text, cdata, comments in order
this.attributes={};//attributes map
}var _proto=XmlNode.prototype;_proto.add=function add(key,val){var _this$child$push;// this.child.push( {name : key, val: val, isCdata: isCdata });
this.child.push((_this$child$push={},_this$child$push[key]=val,_this$child$push));};_proto.addChild=function addChild(node){if(node.attributes&&Object.keys(node.attributes).length>0){var _this$child$push2;this.child.push((_this$child$push2={},_this$child$push2[node.tagname]=node.child,_this$child$push2.attributes=node.attributes,_this$child$push2));}else{var _this$child$push3;this.child.push((_this$child$push3={},_this$child$push3[node.tagname]=node.child,_this$child$push3));}};return XmlNode;}();;module.exports=XmlNode;

/***/ })

/******/ });
//# sourceMappingURL=fxparser.js.map