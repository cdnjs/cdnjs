(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.parser = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var getAllMatches = require("./util").getAllMatches;

var xmlNode = function(tagname,parent,val){
    this.tagname = tagname;
    this.parent = parent;
    this.child = [];
    this.val = val;
    this.addChild = function (child){
        this.child.push(child);
    };
};

//var tagsRegx = new RegExp("<(\\/?[a-zA-Z0-9_:]+)([^>\\/]*)(\\/?)>([^<]+)?","g");
//var tagsRegx = new RegExp("<(\\/?[\\w:-]+)([^>]*)>([^<]+)?","g");
//var cdataRegx = "<!\\[CDATA\\[([^\\]\\]]*)\\]\\]>";
var cdataRegx = "<!\\[CDATA\\[(.*?)(\\]\\]>)";
var tagsRegx = new RegExp("<(\\/?[\\w:\\-\._]+)([^>]*)>("+cdataRegx+")*([^<]+)?","g");

var defaultOptions = {
    attrPrefix : "@_",
    attrNodeName: false,
    textNodeName : "#text",
    ignoreNonTextNodeAttr : true,
    ignoreTextNodeAttr : true,
    ignoreNameSpace : false,
    ignoreRootElement : false,
    textNodeConversion : true,
    textAttrConversion : false,
    arrayMode : false
};

var buildOptions = function (options){
    if(!options) options = {};
    var props = ["attrPrefix","attrNodeName","ignoreNonTextNodeAttr","ignoreTextNodeAttr","ignoreNameSpace","ignoreRootElement","textNodeName","textNodeConversion","textAttrConversion","arrayMode"];
    for (var i = 0; i < props.length; i++) {
        if(options[props[i]] === undefined){
            options[props[i]] = defaultOptions[props[i]];
        }
    }
    return options;
};

var getTraversalObj =function (xmlData,options){
    options = buildOptions(options);
    //xmlData = xmlData.replace(/>(\s+)/g, ">");//Remove spaces and make it single line.
    var tags = getAllMatches(xmlData,tagsRegx);
    var xmlObj = new xmlNode('!xml');
    var currentNode = xmlObj;

    for (var i = 0; i < tags.length ; i++) {
        var tag = resolveNameSpace(tags[i][1],options.ignoreNameSpace),
            nexttag = i+1 < tags.length ? resolveNameSpace(tags[i+1][1],options.ignoreNameSpace) : undefined,
            attrsStr = tags[i][2], attrs,
            val = tags[i][4] ===  undefined ? tags[i][6] :  simplifyCDATA(tags[i][0]);
        if(tag.indexOf("/") === 0){//ending tag
            currentNode = currentNode.parent;
            continue;
        }

        var selfClosingTag = attrsStr.charAt(attrsStr.length-1) === '/';
        var childNode = new xmlNode(tag,currentNode);

        if(selfClosingTag){
            attrs = buildAttributesArr(attrsStr,options.ignoreTextNodeAttr,options.attrPrefix,options.attrNodeName,options.ignoreNameSpace,options.textAttrConversion);
            childNode.val = attrs || "";
            currentNode.addChild(childNode);
        }else if( ("/" + tag) === nexttag){ //Text node
            attrs = buildAttributesArr(attrsStr,options.ignoreTextNodeAttr,options.attrPrefix,options.attrNodeName,options.ignoreNameSpace,options.textAttrConversion);
            val = parseValue(val,options.textNodeConversion);
            if(attrs){
                attrs[options.textNodeName] = val;
                childNode.val = attrs;
            }else{
                if(val !== undefined && val != null){
                    childNode.val = val;    
                }else{
                    childNode.val = "";
                }
            }
            currentNode.addChild(childNode);
            i++;
        }else{//starting tag
            attrs = buildAttributesArr(attrsStr,options.ignoreNonTextNodeAttr,options.attrPrefix,options.attrNodeName,options.ignoreNameSpace,options.textAttrConversion);
            if(attrs){
                for (var prop in attrs) {
                  if(attrs.hasOwnProperty(prop)){
                    childNode.addChild(new xmlNode(prop,childNode,attrs[prop]));
                  }
                }
            }
            currentNode.addChild(childNode);
            currentNode = childNode;
        }
    }
    return xmlObj;
};

var xml2json = function (xmlData,options){
    return convertToJson(getTraversalObj(xmlData,options), buildOptions(options).arrayMode);
};

var cdRegx = new RegExp(cdataRegx,"g");

function simplifyCDATA(cdata){
    var result = getAllMatches(cdata,cdRegx);
    var val = "";
    for (var i = 0; i < result.length ; i++) {
        val+=result[i][1];
    }
    return val;
}

function resolveNameSpace(tagname,ignore){
    if(ignore){
        var tags = tagname.split(":");
        var prefix = tagname.charAt(0) === "/" ? "/" : "";
        if(tags.length === 2) {
            tagname = prefix + tags[1];
        }
    }
    return tagname;
}

function parseValue(val,conversion){
    if(val){
        if(!conversion || isNaN(val)){
            val = "" + val ;
        }else{
            if(val.indexOf(".") !== -1){
                val = Number.parseFloat(val);
            }else{
                val = Number.parseInt(val,10);
            }
        }
    }else{
        val = "";
    }
    return val;
}

//var attrsRegx = new RegExp("(\\S+)=\\s*[\"']?((?:.(?![\"']?\\s+(?:\\S+)=|[>\"']))+.)[\"']?","g");
//var attrsRegx = new RegExp("(\\S+)=\\s*(['\"])((?:.(?!\\2))*.)","g");
var attrsRegx = new RegExp("(\\S+)\\s*=\\s*(['\"])(.*?)\\2","g");
function buildAttributesArr(attrStr,ignore,prefix,attrNodeName,ignoreNS,conversion){
    attrStr = attrStr || attrStr.trim();
    
    if(!ignore && attrStr.length > 3){

        var matches = getAllMatches(attrStr,attrsRegx);
        var attrs = {};
        var attrsCollection = attrs;
        if(attrNodeName && matches.length){
            attrsCollection = attrs[attrNodeName] = {};
        }
        for (var i = 0; i < matches.length; i++) {
            var attrName = prefix + resolveNameSpace( matches[i][1],ignoreNS);
            attrsCollection[attrName] = parseValue(matches[i][3],conversion);
        }
        return attrs;
    }
}

var convertToJson = function (node, arrayMode){
    var jObj = {};
    if(node.val !== undefined && node.val != null || node.val === "") {
        return node.val;
    }else{
        for (var index = 0; index < node.child.length; index++) {
            var prop = node.child[index].tagname;
            var obj = convertToJson(node.child[index], arrayMode);
            if(jObj[prop] !== undefined){
                if(!Array.isArray(jObj[prop])){
                    var swap = jObj[prop];
                    jObj[prop] = [];
                    jObj[prop].push(swap);
                }
                jObj[prop].push(obj);
            }else{
                jObj[prop] = arrayMode ? [obj] : obj;
            }
        }
    }
    return jObj;
};

exports.parse = xml2json;
exports.getTraversalObj = getTraversalObj;
exports.convertToJson = convertToJson;
exports.validate = require("./validator").validate;

},{"./util":2,"./validator":3}],2:[function(require,module,exports){
var getAllMatches = function(string, regex) {
  var matches = [];
  var match = regex.exec(string);
  while (match) {
  	var allmatches = [];
    for (var index = 0; index < match.length; index++) {
  		allmatches.push(match[index]);
  	}
    matches.push(allmatches);
    match = regex.exec(string);
  }
  return matches;
};


var doesMatch = function(string,regex){
  var match = regex.exec(string);
  if(match === null || match === undefined) return false;
  else return true;
}

var doesNotMatch = function(string,regex){
  return !doesMatch(string,regex);
}

exports.doesMatch = doesMatch
exports.doesNotMatch = doesNotMatch
exports.getAllMatches = getAllMatches;
},{}],3:[function(require,module,exports){
var util = require("./util");


var tagsPattern = new RegExp("<\\/?([\\w:\\-_\.]+)\\s*\/?>","g");
exports.validate = function(xmlData){
    xmlData = xmlData.replace(/\n/g,"");//make it single line
    xmlData = xmlData.replace(/(<!\[CDATA\[.*?\]\]>)/g,"");//Remove all CDATA
    xmlData = xmlData.replace(/(<!--.*?(?:-->))/g,"");//Remove all comments
    if(validateAttributes(xmlData) !== true) return false;
    xmlData = xmlData.replace(/(\s+(?:[\w:\-]+)\s*=\s*(['\"]).*?\2)/g,"");//Remove all attributes
    xmlData = xmlData.replace(/(^\s*<\?xml\s*\?>)/g,"");//Remove XML starting tag
    if(xmlData.indexOf("<![CDATA[") > 0 || xmlData.indexOf("<!--") > 0 ) return false;
    var tags = util.getAllMatches(xmlData,tagsPattern);
    if(tags.length === 0) return false; //non xml string
    
    var result = checkForMatchingTag(tags,0);
    

    if(result !== true) return false; else return true; 
    
}


var startsWithXML = new RegExp("^[Xx][Mm][Ll]");
var startsWith = new RegExp("^([a-zA-Z]|_)[\\w\.\\-_:]*");

function validateTagName(tagname){
    if(util.doesMatch(tagname,startsWithXML)) return false;
    else if(util.doesNotMatch(tagname,startsWith)) return false;
    else return true;
}

var attrStringPattern = new RegExp("<[\\w:\\-_\.]+(.*?)\/?>","g");
var attrPattern = new RegExp("\\s+([\\w:\-]+)\\s*=\\s*(['\"])(.*?)\\2","g");
function validateAttributes(xmlData){
    var attrStrings = util.getAllMatches(xmlData,attrStringPattern);
    for (i=0;i<attrStrings.length;i++){
        if(attrStrings[i][1].trim().length > 0 && attrStrings[i][1].trim().length < 4){ //invalid attributes 
            return false;
        }else if(attrStrings[i][1].trim().length !== 0){
            var attrsList = util.getAllMatches(attrStrings[i][1],attrPattern);
            var attrNames=[];
            for (j=0;j<attrsList.length;j++){
                if(attrNames.hasOwnProperty(attrsList[j][1])){//duplicate attributes
                    return false;
                }else{
                    attrNames[attrsList[j][1]]=1;
                    //validate attribute value
                    //if(!validateAttrValue(attrsList[3])) return false;
                }
            }
        }
    }
    return true;
}

function checkForMatchingTag(tags,i){
    if(tags.length === i) {
        return true;
    }else if(tags[i][0].indexOf("</") === 0) {//closing tag
        return i;
    }else if(tags[i][0].indexOf("/>") === tags[i][0].length-2){//Self closing tag
        if(validateTagName(tags[i][0].substring(1)) === false) return -1;
        return checkForMatchingTag(tags,i+1);

    }else if(tags.length > i+1){
        if(tags[i+1][0].indexOf("</") === 0){//next tag
            if(validateTagName(tags[i][1]) === false) return -1;
            if(tags[i][1] === tags[i+1][1]) {//matching with next closing tag
                return checkForMatchingTag(tags,i+2);
            }else {
                return -1;//not matching
            }
        }else
            var nextIndex = checkForMatchingTag(tags,i+1);
            if(nextIndex !== -1 && tags[nextIndex][0].indexOf("</") === 0){
                if(validateTagName(tags[i][1]) === false) return -1;
                if(tags[i][1] === tags[nextIndex][1]) {
                    return checkForMatchingTag(tags,nextIndex+1);
                }else {
                    return -1;//not matching
                }
            }
    }
    return -1;
}


},{"./util":2}]},{},[1])(1)
});